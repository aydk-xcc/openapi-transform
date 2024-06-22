export const example_2_1 = {
    swagger: '2.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    host: 'petstore.swagger.io',
    paths: {
        'x-api': 2,
        '/demo': {
            'get': {
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [{
                    "name": "username",
                    "in": "path",
                    "description": "username to fetch",
                    "required": true,
                    "type": "string"
                }, {
                    "name": "id",
                    "in": "header",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                }, {
                    "name": "password",
                    "in": "body",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                },{
                    $ref: '#/definitions/Pet'
                }],
                'responses': {
                    200: {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/Pet'
                        },
                        headers: {
                            'x-ratelimit-limit': {
                                type: 'integer',
                                format: 'int32',
                                description: 'calls per hour allowed by the user'
                            },
                            'x-ratelimit-remaining': {
                                type: 'integer',
                                format: 'int32',
                                description: 'number of remaining calls in the current rate limit window'
                            }
                        },
                        examples: {
                            'application/json': {
                                name: 'Puma',
                                type: 1,
                                weight: 99.9
                            }
                        }
                    },
                    default: {
                        $ref: '#/definitions/Pet'
                    }
                }
            },
            post: {

            },
            parameters: [{
                "name": "username",
                "in": "path",
                "description": "username to fetch",
                "required": true,
                "type": "string"
            }]
        },
        '/demo2': {
            '$ref': 'http://pathItem',
            description: 'test'
        }
    },
    basePath: '/v1',
    schemes: [
        'http'
    ],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ]
}
