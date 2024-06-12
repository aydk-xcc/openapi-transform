export function gen_3_code(baseTemplate) {
    let obj = Object.create(null);
    obj.openapi = '3.0.0';
    obj.info = baseTemplate.info;
    obj.tags = baseTemplate.tags;
    obj.servers = baseTemplate.servers;
    obj.paths = initPaths(baseTemplate.paths);
    obj.components = baseTemplate.components;
    obj.security = baseTemplate.security;
    obj.externalDocs = baseTemplate.externalDocs;
    return obj;
}

function initPaths(paths) {
    let pathsObj = {};
    paths.forEach(item => {
        let path = item.path;
        delete item.path;
        Object.keys(item).forEach(method => {
            if (!['$ref', 'servers', 'summary', 'description', 'parameters'].includes(method)) {
                let responses = {};
                item[method].responses.forEach(response => {
                    let code = response.code;
                    delete response.code;
                    responses[code] = response;
                })
                item[method].responses = responses;
            }
        })
        pathsObj[path] = item;
    })
    return pathsObj;
}
