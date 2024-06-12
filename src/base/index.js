import { formatData2Json } from '../utils/utils.js'
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


function initVersion(data) {
    return data.openapi || data.swagger;
}

function initPaths(data) {
    let paths = Object.keys(data.paths).map(path => {
        let pathInfo = data.paths[path];
        let obj = {
            path: path
        };
        Object.keys(pathInfo).forEach(method => {
            if (['$ref', 'servers', 'summary', 'description'].includes(method)) {
                obj[method] = pathInfo[method];
            } else if (method === 'parameters') {
                obj['parameters'] = initParameters(pathInfo[method]);
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
                                description: bodyObj.description,
                                content: {
                                    [mimTypes]: {
                                        schema: schema
                                    }
                                },
                                required: bodyObj.required
                            };
                        }
                        let parameters = [];
                        pathInfo[method][key].forEach(item => {
                            if (!item.schema && item.in !== 'body') {
                                // 2.0 数据结构有问题
                                let sch = {};
                                Object.keys(item).forEach(key => {
                                    if (!['name', 'in', 'description', 'required', 'deprecated', 'allowEmptyValue'].includes(key)) {
                                        sch[key] = item[key];
                                    }
                                });
                                let obj = {
                                    name: item.name,
                                    in: item.in || 'query',
                                    description: item.description,
                                    required: item.required,
                                    deprecated: item.deprecated,
                                    allowEmptyValue: item.allowEmptyValue,
                                    schema: sch
                                };
                                parameters.push(obj);
                            } else if (item.schema && item.in !== 'body') {
                                parameters.push(item);
                            } else if (item['$ref']) {
                                parameters.push(item);
                            }
                        });
                        methodInfo['parameters'] = parameters;
                    }

                    if (key === 'responses') {
                        let responseList = [];
                        Object.keys(pathInfo[method][key]).forEach((responseKey, index) => {
                            let mimTypes = '*/*';
                            if (!pathInfo[method][key][responseKey].content) {
                                mimTypes = getProduces(data, pathInfo[method]);
                                responseList.push({
                                    code: responseKey,
                                    description: pathInfo[method][key][responseKey].description,
                                    content: {
                                        [mimTypes]: {
                                            schema: pathInfo[method][key][responseKey].schema,
                                            examples: pathInfo[method][key][responseKey].examples
                                        }
                                    },
                                    headers: pathInfo[method][key][responseKey].headers,
                                })
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
    return paths;
}

function initParameters(parametersData) {
    let parameters = [];
    Object.keys(parametersData).forEach(item => {
        if (item['$ref']) {
            // 引用
            parameters.push(item);
        } else {
            if (item.in === 'body' || item.schema) {
                parameters.push(item);
            } else {
                // 2.0 数据结构有问题
                let schema = {};
                Object.keys(item).forEach(key => {
                    if (['name', 'in', 'description', 'required', 'deprecated', 'allowEmptyValue'].includes(key)) {
                        schema[key] = item[key];
                    }
                });
                let obj = {
                    name: item.name,
                    in: item.in || 'query',
                    description: item.description,
                    required: item.required,
                    deprecated: item.deprecated,
                    allowEmptyValue: item.allowEmptyValue,
                    schema: schema
                };
                parameters.push(obj);
            }
        }
    });
    return parameters;
};

function getConsumes(data, codeData) {
    if (codeData.consumes && codeData.consumes.length > 0) {
        return codeData.consumes[0];
    } else if (data.consumes && data.consumes.length > 0) {
        return data.consumes[0];
    }
    return '*/*';
}

function getProduces(data, codeData) {
    if (codeData.produces && codeData.produces.length > 0) {
        return codeData.produces[0];
    } else if (data.produces && data.produces.length > 0) {
        return data.produces[0];
    }
    return '*/*';
}

function initComponents(openApiDefinition) {
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

function initRef(obj) {
    let str = JSON.stringify(obj);
    str = str.replace(/#\/definitions/g,'#/components/schemas');
    str = str.replace(/#\/parameters/g,'#/components/parameters');
    str = str.replace(/#\/responses/g,'#/components/responses');
    str = str.replace(/#\/securityDefinitions/g,'#/components/securitySchemes');
    return JSON.parse(str);
}

function initServers(openApiDefinition) {
    if (openApiDefinition.servers) {
        return openApiDefinition.servers;
    }

    if(openApiDefinition.schemes && openApiDefinition.host && openApiDefinition.basePath) {
        return openApiDefinition.schemes.map(scheme => {
            return {
                url: `${scheme}://${openApiDefinition.host}${openApiDefinition.basePath}`,
                description: ''
            };
        });
    }
    return [];
}
