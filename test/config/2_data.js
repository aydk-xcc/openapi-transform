export const example_2 = {
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
                    type: "string"
                }, {
                    "name": "body",
                    "in": "body",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "test": {
                                "type": "string"
                            }
                        },
                        "x-iapi-orders": [
                            "test"
                        ],
                        "required": [
                            "test"
                        ],
                        "x-apifox-ignore-properties": [],
                        "x-apifox-orders": [
                            "test"
                        ]
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
};

export const example_2_base = {
    version: '2.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    servers: [{
        url: 'http://petstore.swagger.io/v1'
    }],
    paths: [
        {
            "path": "x-api",
            'x-api': 2
        }, {
            path: '/demo',
            'get': {
                consumes: [
                    'application/json'
                ],
                produces: [
                    'application/json'
                ],
                parameters: [{
                    "name": "username",
                    "in": "path",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                }, {
                    "name": "id",
                    "in": "header",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                },{
                    "$ref": "#/components/schemas/Pet"
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "test": {
                                        "type": "string"
                                    }
                                },
                                "x-iapi-orders": [
                                    "test"
                                ],
                                "required": [
                                    "test"
                                ],
                                "x-apifox-ignore-properties": [],
                                "x-apifox-orders": [
                                    "test"
                                ]
                            }
                        }
                    }
                },
                "responses": [
                    {
                        code: "200",
                        "content": {
                            "application/json": {
                                "schema": {
                                    $ref: '#/components/schemas/Pet'
                                },
                                "examples": {
                                    "application/json": {
                                        "value": {
                                            "name": "Puma",
                                            "type": 1,
                                            "weight": 99.9
                                        },
                                        "summary": "",
                                        "description": ""
                                    }
                                }
                            }
                        },
                        "description": "successful operation",
                        "headers": {
                            "x-ratelimit-limit": {
                                "description": "calls per hour allowed by the user",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            },
                            "x-ratelimit-remaining": {
                                "description": "number of remaining calls in the current rate limit window",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            }
                        }
                    },
                    {
                        code: 'default',
                        "$ref": "#/components/schemas/Pet"
                    }
                ]
            },
            post: {
            },
            parameters: [{
                "name": "username",
                "in": "path",
                "description": "username to fetch",
                "required": true,
                schema: {
                    type: "string"
                }
            }]
        }, {
            path: '/demo2',
            '$ref': 'http://pathItem',
            description: 'test'
        }
    ],
    consumes: [
        'application/json'
    ],
    produces: [
        'application/json'
    ]
}

export const example_2_to_3 = {
    openapi: '3.0.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    servers: [{
        url: 'http://petstore.swagger.io/v1'
    }],
    paths: {
        '/demo': {
            'get': {
                parameters: [{
                    "name": "username",
                    "in": "path",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                }, {
                    "name": "id",
                    "in": "header",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                },{
                    "$ref": "#/components/schemas/Pet"
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "test": {
                                        "type": "string"
                                    }
                                },
                                "x-iapi-orders": [
                                    "test"
                                ],
                                "required": [
                                    "test"
                                ],
                                "x-apifox-ignore-properties": [],
                                "x-apifox-orders": [
                                    "test"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Pet"
                                },
                                "examples": {
                                    "application/json": {
                                        "value": {
                                            "name": "Puma",
                                            "type": 1,
                                            "weight": 99.9
                                        },
                                        "summary": "",
                                        "description": ""
                                    }
                                }
                            }
                        },
                        "description": "successful operation",
                        "headers": {
                            "x-ratelimit-limit": {
                                "description": "calls per hour allowed by the user",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            },
                            "x-ratelimit-remaining": {
                                "description": "number of remaining calls in the current rate limit window",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            }
                        }
                    },
                    "default": {
                        "$ref": "#/components/schemas/Pet"
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
                schema: {
                    type: "string"
                }
            }]
        },
        '/demo2': {
            '$ref': 'http://pathItem',
            description: 'test'
        }
    }
};

export const example_2_to_3_1 = {
    openapi: '3.1.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    servers: [{
        url: 'http://petstore.swagger.io/v1'
    }],
    paths: {
        '/demo': {
            'get': {
                parameters: [{
                    "name": "username",
                    "in": "path",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                }, {
                    "name": "id",
                    "in": "header",
                    "description": "username to fetch",
                    "required": true,
                    schema: {
                        type: "string"
                    }
                },{
                    "$ref": "#/components/schemas/Pet"
                }],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "test": {
                                        "type": "string"
                                    }
                                },
                                "x-iapi-orders": [
                                    "test"
                                ],
                                "required": [
                                    "test"
                                ],
                                "x-apifox-ignore-properties": [],
                                "x-apifox-orders": [
                                    "test"
                                ]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Pet"
                                },
                                "examples": {
                                    "application/json": {
                                        "value": {
                                            "name": "Puma",
                                            "type": 1,
                                            "weight": 99.9
                                        },
                                        "summary": "",
                                        "description": ""
                                    }
                                }
                            }
                        },
                        "description": "successful operation",
                        "headers": {
                            "x-ratelimit-limit": {
                                "description": "calls per hour allowed by the user",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            },
                            "x-ratelimit-remaining": {
                                "description": "number of remaining calls in the current rate limit window",
                                "schema": {
                                    "type": "integer",
                                    "format": "int32"
                                }
                            }
                        }
                    },
                    "default": {
                        "$ref": "#/components/schemas/Pet"
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
                schema: {
                    type: "string"
                }
            }]
        },
        '/demo2': {
            '$ref': 'http://pathItem',
            description: 'test'
        }
    }
};
