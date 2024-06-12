export function gen_2_code(baseTemplate) {
    let obj = Object.create(null);
    obj.swagger = '2.0.0';
    obj.info = baseTemplate.info;
    obj.tags = baseTemplate.tags;
    initHost(baseTemplate, obj);
    initConsumes(baseTemplate, obj);
    initProduces(baseTemplate, obj);
    initPaths(baseTemplate, obj);
    initComponents(baseTemplate, obj);
    obj.security = baseTemplate.security;
    obj.externalDocs = baseTemplate.externalDocs;
    obj = initRef(obj);
    return obj;
}

function initHost(baseTemplate, obj) {
    if (baseTemplate.servers && baseTemplate.servers.length) {
        let url = baseTemplate.servers[0].url;
        let arr = /(https?):\/\/([^/]*)(\/.*)?/.exec(url);
        if (arr && arr.length >= 4) {
            obj.host = arr[2];
            obj.basePath = arr[3] || '/';
            obj.schemes = arr[1];
        }
        baseTemplate.servers.map(server => {
            let arr = /(https?):\/\/([^/]*)(\/.*)?/.exec(server.url);
            if (arr && arr.length >= 4) {
                if (!obj.schemes) {
                    obj.schemes = [arr[1]];
                } else if (!obj.schemes.includes(arr[1])) {
                    obj.schemes.push(arr[1]);
                }
            }
        });
    }
}

function initConsumes(baseTemplate, obj) {
    if (baseTemplate.consumes) {
        obj.consumes = baseTemplate.consumes;
    }
}

function initProduces(baseTemplate, obj) {
    if (baseTemplate.produces) {
        obj.produces = baseTemplate.produces;
    }
}

function initComponents(baseTemplate, obj) {
    // v3.0.1 版本中，definitions 属性被移除
    // 替换成了components.schemas
    if (baseTemplate.components && baseTemplate.components.schemas) {
        obj.definitions = baseTemplate.components.schemas;
    }
    if (baseTemplate.components && baseTemplate.components.parameters) {
        obj.parameters = baseTemplate.components.parameters;
    }
    if (baseTemplate.components && baseTemplate.components.responses) {
        obj.responses = baseTemplate.components.responses;
    }

    if (baseTemplate.components && baseTemplate.components.securitySchemes) {
        obj.securityDefinitions = baseTemplate.components.securitySchemes;
    }
}

function initPaths(baseTemplate, obj) {
    let tempPaths = {};
    baseTemplate.paths.forEach((pathItem, pathName) => {
        tempPaths[pathItem.path] = {};
        Object.keys(pathItem).forEach((method) => {

            if (!['$ref', 'servers', 'parameters', 'summary', 'description', 'path'].includes(method)) {
                // method
                let operation = pathItem[method];
                let tempMethod = {};
                Object.keys(operation).forEach((key) => {
                    if (['tags', 'summary', 'description', 'externalDocs', 'operationId', 'consumes', 'produces', 'schemes', 'deprecated', 'security'].includes(key)) {
                        tempMethod[key] = operation[key];
                    }
                    if (key == 'parameters') {
                        tempMethod.parameters = [];
                        operation[key].forEach(parametersItem => {
                            if (parametersItem.schema) {
                                let obj =  {
                                    ...parametersItem,
                                    ...parametersItem.schema
                                }
                                delete obj.schema;
                                tempMethod.parameters.push(obj);
                            }
                        });
                    }
                    if (key == 'requestBody' && operation[key]) {
                        let mimType = Object.keys(operation[key].content)[0];
                        tempMethod.parameters.push({
                            in: 'body',
                            name: 'body',
                            description: operation[key].description,
                            required: operation[key].required,
                            schema: {
                                ...operation[key].content[mimType].schema
                            }
                        });
                    }

                    if (key == 'responses') {
                        let responseObj = {};
                        operation[key].forEach((responseItem, statusCode) => {
                            if (responseItem['$ref']) {
                                responseObj[responseItem.code] = responseItem;
                            } else {
                                let responseMimType = Object.keys(responseItem.content)[0];
                                let tempResponseContent = {
                                    description: responseItem.description,
                                    schema: responseItem.content[responseMimType].schema,
                                    headers: responseItem.headers
                                }
                                if (responseItem.content[responseMimType].examples) {
                                    tempResponseContent['examples'] = responseItem.content[responseMimType].examples;
                                }
                                responseObj[responseItem.code] = tempResponseContent;
                            }
                        });
                        tempMethod[key] = responseObj;
                    }
                });
                tempPaths[pathItem.path][method] = tempMethod;
            }

            if (method === '$ref') {
                tempPaths[pathItem.path][method] = pathItem[method];
            }

            if (method === 'parameters') {
                tempPaths[pathItem.path][method] = initParameters(pathItem[method]);;
            }
        });
    });
    obj.paths = tempPaths;
}

function initParameters(parameters) {
    return parameters.map(item => {
        if (item['$ref']) {
            return item;
        }

        if (item.in !== 'body' && item.schema) {
            let obj =  {
                ...item,
                ...item.schema
            }
            delete obj.schema;
            return obj;
        }
        return item;
    })
}

function initRef(obj) {
    let str = JSON.stringify(obj);
    str = str.replace(/#\/components\/schemas/g,'#/definitions');
    str = str.replace(/#\/components\/parameters/g,'#/parameters');
    str = str.replace(/#\/components\/responses/g,'#/responses');
    str = str.replace(/#\/components\/securitySchemes/g,'#/securityDefinitions');
    return JSON.parse(str);
}
