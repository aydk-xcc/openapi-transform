export function gen_3_code(baseTemplate) {
    let obj = Object.create(null);
    obj.openapi = '3.0.0';
    obj.paths = initPaths(baseTemplate.paths);
    ['info', 'tags', 'servers', 'components', 'security', 'externalDocs'].forEach(item => {
        if (baseTemplate[item]) {
            obj[item] = baseTemplate[item];
        }
    });
    return obj;
}

export function initPaths(paths) {
    let pathsObj = {};
    paths.forEach(item => {
        let path = item.path;
        if (path.startsWith('x-')) {
            // x-
            return;
        }
        delete item.path;
        pathsObj[path] = {};
        Object.keys(item).forEach(method => {
            if (!['$ref', 'servers', 'summary', 'description', 'parameters'].includes(method)) {
                pathsObj[path][method] = {};
                Object.keys(item[method]).forEach(key => {
                    if([
                        'tags',
                        'summary',
                        'description',
                        'externalDocs',
                        'operationId',
                        'parameters',
                        'requestBody',
                        'callbacks',
                        'deprecated',
                        'security',
                        'servers',
                    ].includes(key)) {
                        pathsObj[path][method][key] = item[method][key];
                    } else if (key === 'responses') {
                        let responses = {};
                        if (!item[method].responses) {
                            item[method]['responses'] = [];
                        }
                        (item[method].responses || []).forEach(response => {
                            let code = response.code;
                            delete response.code;
                            responses[code] = response;
                        });
                        pathsObj[path][method].responses = responses;
                    }
                });
            } else {
                pathsObj[path][method] = item[method];
            }
        });
    });
    return pathsObj;
}
