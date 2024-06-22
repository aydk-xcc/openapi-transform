import {formatData2Json, isReferenceObject} from '../utils/utils.js';
export function initBaseTemplate(data) {
    let dataJson = formatData2Json(data)
    let obj = {
        version: initVersion(dataJson),
        info: dataJson.info,
        jsonSchemaDialect: dataJson.jsonSchemaDialect || null,
        security: dataJson.security || null,
        externalDocs: dataJson.externalDocs || null,
        tags: dataJson.tags || null,
        consumes: dataJson.consumes,
        produces: dataJson.produces,
        servers: initServers(dataJson),
        webhooks: dataJson.webhooks,
        paths: initPaths(dataJson),
        components: initComponents(dataJson),
    }
    obj = initRef(obj);
    return obj;
}


export function initVersion(data) {
    return data.openapi || data.swagger;
}

export function initPaths(data) {
    if (!data.paths) {
        return [];
    }
    let paths = Object.keys(data.paths).map(path => {
        if (path.startsWith('x-')) {
            // 2.0 版本支持x-
            return {
                [path]: data.paths[path]
            };
        }

        if (!path.startsWith('/')) {
            return null;
        }

        let pathInfo = data.paths[path];
        let obj = {
            path: path
        };
        Object.keys(pathInfo).forEach(method => {
            if (['$ref', 'servers', 'summary', 'description'].includes(method)) {
                obj[method] = pathInfo[method];
            } else if (method === 'parameters') {
                // v2.0
                obj['parameters'] = initParameters(pathInfo['parameters']);
            } else {
                // method
                let methodInfo = {};
                Object.keys(pathInfo[method]).forEach(key => {
                    if (!['parameters', 'responses'].includes(key)) {
                        methodInfo[key] = pathInfo[method][key];
                    }
                    if (key === 'parameters') {
                        let bodyObj = pathInfo[method][key].find(item => item.in === 'body');
                        if (bodyObj && !pathInfo[method].requestBody) {
                            let mimTypes = getConsumes(data, pathInfo[method]);
                            let schema = bodyObj['schema'] || {};
                            methodInfo['requestBody'] = {
                                description: bodyObj.description || '',
                                content: {
                                    [mimTypes]: {
                                        schema: schema
                                    }
                                },
                                required: !!bodyObj.required
                            };
                        }
                        let parameters = [];
                        pathInfo[method][key].forEach(item => {
                            if (item['$ref']) {
                                parameters.push(item);
                            } else if (!item.schema && item.in !== 'body') {
                                // 2.0 数据结构有问题
                                let schema = {};
                                let obj = {};
                                Object.keys(item).forEach(key => {
                                    if (['name', 'in', 'description', 'required', 'deprecated', 'allowEmptyValue'].includes(key)) {
                                        obj[key] = item[key];
                                    } else  if ([
                                        'type',
                                        'format',
                                        'items',
                                        'collectionFormat',
                                        'default',
                                        'maximum',
                                        'exclusiveMaximum',
                                        'minimum',
                                        'exclusiveMinimum',
                                        'maxLength',
                                        'minLength',
                                        'pattern',
                                        'maxItems',
                                        'minItems',
                                        'uniqueItems',
                                        'enum',
                                        'multipleOf'
                                    ].includes(key)) {
                                        schema[key] = item[key];
                                    }
                                });

                                obj['schema'] = schema;
                                parameters.push(obj);
                            } else if (item.schema && item.in !== 'body') {
                                parameters.push(item);
                            }
                        });
                        methodInfo['parameters'] = parameters;
                    }

                    if (key === 'responses') {
                        let responseList = [];
                        Object.keys(pathInfo[method][key]).forEach((responseKey, index) => {
                            if (pathInfo[method][key][responseKey].$ref) {
                                // 处理引用类型
                                responseList.push({
                                    code: responseKey,
                                    ...pathInfo[method][key][responseKey]
                                });
                                return;
                            }
                            let mimTypes = '*/*';
                            if (!pathInfo[method][key][responseKey].content) {
                                mimTypes = getProduces(data, pathInfo[method]);
                                let tempResponseObj = {
                                    code: responseKey,
                                    content: {
                                        [mimTypes]: {
                                            schema: pathInfo[method][key][responseKey].schema
                                        }
                                    },
                                    description: pathInfo[method][key][responseKey].description || ''
                                };
                                // example
                                if (pathInfo[method][key][responseKey].examples &&
                                    pathInfo[method][key][responseKey].examples[mimTypes]
                                ) {
                                    let tempExample = pathInfo[method][key][responseKey].examples[mimTypes];
                                    tempResponseObj.content[mimTypes]['examples'] = {
                                        [mimTypes]: {
                                            value: tempExample,
                                            summary: '',
                                            description: ''
                                        }
                                    };
                                }
                                if (pathInfo[method][key][responseKey].headers) {
                                    // 2.0 数据结构有问题
                                    let schema = {};
                                    let obj = {};
                                    let headers = pathInfo[method][key][responseKey].headers;
                                    Object.keys(headers).forEach(name => {
                                        obj[name] = {};
                                        Object.keys(headers[name]).forEach(key => {
                                            if ('description' === key) {
                                                obj[name][key] = headers[name][key];
                                            } else  if ([
                                                'type',
                                                'format',
                                                'items',
                                                'collectionFormat',
                                                'default',
                                                'maximum',
                                                'exclusiveMaximum',
                                                'minimum',
                                                'exclusiveMinimum',
                                                'maxLength',
                                                'minLength',
                                                'pattern',
                                                'maxItems',
                                                'minItems',
                                                'uniqueItems',
                                                'enum',
                                                'multipleOf'
                                            ].includes(key)) {
                                                schema[key] = headers[name][key];
                                            }
                                        });

                                        obj[name]['schema'] = schema;
                                    });
                                    tempResponseObj.headers = obj;
                                }
                                responseList.push(tempResponseObj)
                            } else {
                                let obj = {
                                    code: responseKey,
                                    ...pathInfo[method][key][responseKey]
                                }
                                responseList.push(obj);
                            }
                        });
                        methodInfo['responses'] = responseList;
                    }
                })
                obj[method] = methodInfo;
            }
        });
        return obj;
    });
    // 过滤非法数据
    return paths.filter(item => item);
}

// 处理外层的Parameters
export function initParameters(parametersData) {
    let parameters = [];
    parametersData.forEach(item => {
        if (isReferenceObject(item)) {
            // 引用
            parameters.push(item);
        } else {
            if (item.in === 'body' || item.schema) {
                // 2.0 只有body有schema 可以了3.* 对等
                // 3.* 直接使用
                parameters.push(item);
            } else {
                // 2.0 数据结构有问题
                // 需要构造schema
                let schema = {};
                let obj = {};
                Object.keys(item).forEach(key => {
                    if (['name', 'in', 'description', 'required', 'deprecated', 'allowEmptyValue'].includes(key)) {
                        obj[key] = item[key];
                    } else  if ([
                        'type',
                        'format',
                        'items',
                        'collectionFormat',
                        'default',
                        'maximum',
                        'exclusiveMaximum',
                        'minimum',
                        'exclusiveMinimum',
                        'maxLength',
                        'minLength',
                        'pattern',
                        'maxItems',
                        'minItems',
                        'uniqueItems',
                        'enum',
                        'multipleOf'
                    ].includes(key)) {
                        schema[key] = item[key];
                    }
                });

                obj['schema'] = schema;
                parameters.push(obj);
            }
        }
    });
    return parameters;
};

export function getConsumes(data, codeData) {
    if (codeData.consumes && codeData.consumes.length > 0) {
        return codeData.consumes[0];
    } else if (data.consumes && data.consumes.length > 0) {
        return data.consumes[0];
    }
    return '*/*';
}

export function getProduces(data, codeData) {
    if (codeData.produces && codeData.produces.length > 0) {
        return codeData.produces[0];
    } else if (data.produces && data.produces.length > 0) {
        return data.produces[0];
    }
    return '*/*';
}

export function initComponents(openApiDefinition) {
    // 获取components
    if (openApiDefinition.components) {
        return openApiDefinition.components;
    } else {
        let obj = {};
        if (openApiDefinition.parameters) {
            obj.parameters = openApiDefinition.parameters;
        }
        if (openApiDefinition.responses) {
            obj.responses = openApiDefinition.responses;
        }
        if (openApiDefinition.definitions) {
            obj.schemas = openApiDefinition.definitions;
        }
        if (openApiDefinition.securityDefinitions) {
            obj.securitySchemes = openApiDefinition.securityDefinitions;
        }
        return obj;
    }
}

export function initRef(obj) {
    let str = JSON.stringify(obj);
    str = str.replace(/#\/definitions/g,'#/components/schemas');
    str = str.replace(/#\/parameters/g,'#/components/parameters');
    str = str.replace(/#\/responses/g,'#/components/responses');
    str = str.replace(/#\/securityDefinitions/g,'#/components/securitySchemes');
    return JSON.parse(str);
}

export function initServers(openApiDefinition) {
    if (openApiDefinition.servers) {
        return openApiDefinition.servers;
    }

    if(openApiDefinition.schemes && openApiDefinition.host && openApiDefinition.basePath) {
        let arr = openApiDefinition.schemes;
        if (arr.length === 0) {
            arr.push('http');
        }
        return arr.map(scheme => {
            return {
                url: `${scheme}://${openApiDefinition.host}${openApiDefinition.basePath}`,
                description: ''
            };
        });
    }
    return [];
}
