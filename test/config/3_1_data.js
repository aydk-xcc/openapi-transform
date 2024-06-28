export const example_3_1 = {
    openapi: '3.1',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    paths: {
        '/demo': {
            'get': {
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
                },{
                    $ref: '#/definitions/Pet'
                }],
                'responses': {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Pet'
                                },
                                examples: {
                                    'application/json': {
                                        value: {
                                            name: 'Puma',
                                            type: 1,
                                            weight: 99.9
                                        }
                                    }
                                }
                            },
                            'text/plain': {
                                schema: {
                                    type: 'string'
                                }
                            }
                        },
                        headers: {
                            'x-ratelimit-limit': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'calls per hour allowed by the user'
                            },
                            'x-ratelimit-remaining': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'number of remaining calls in the current rate limit window'
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
    jsonSchemaDialect: 'test',
    webhooks: {
        $ref: 'http://webhooks'
    }
};

export const example_3_1_base = {
    version: '3.1',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    paths: [{
        path: '/demo',
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
                $ref: "#/components/schemas/Pet"
            }],
            'responses': [{
                code: "200",
                description: 'successful operation',
                content: {
                    'application/json': {
                        schema: {
                            $ref: "#/components/schemas/Pet"
                        },
                        examples: {
                            'application/json': {
                                value: {
                                    name: 'Puma',
                                    type: 1,
                                    weight: 99.9
                                }
                            }
                        }
                    },
                    'text/plain': {
                        schema: {
                            type: 'string'
                        }
                    }
                },
                headers: {
                    'x-ratelimit-limit': {
                        schema: {
                            type: 'integer',
                            format: 'int32'
                        },
                        description: 'calls per hour allowed by the user'
                    },
                    'x-ratelimit-remaining': {
                        schema: {
                            type: 'integer',
                            format: 'int32'
                        },
                        description: 'number of remaining calls in the current rate limit window'
                    }
                }
            },{
                code: 'default',
                $ref: "#/components/schemas/Pet"
            }]
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
        }],
    },{
        path: '/demo2',
        '$ref': 'http://pathItem',
        description: 'test'
    }],
    servers: [],
    jsonSchemaDialect: 'test',
    webhooks: {
        $ref: 'http://webhooks'
    }
}

export const example_3_1_to_2 = {
    swagger: '2.0.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    paths: {
        '/demo': {
            'get': {
                parameters: [{
                    "name": "username",
                    "in": "path",
                    "description": "username to fetch",
                    "required": true,
                    type: "string"
                }, {
                    "name": "id",
                    "in": "header",
                    "description": "username to fetch",
                    "required": true,
                    type: "string"
                },{
                    $ref: '#/definitions/Pet'
                }],
                'responses': {
                    200: {
                        description: 'successful operation',
                        schema: {
                            $ref: '#/definitions/Pet'
                        },
                        examples: {
                            'application/json': {
                                value: {
                                    name: 'Puma',
                                    type: 1,
                                    weight: 99.9
                                }
                            }
                        },
                        headers: {
                            'x-ratelimit-limit': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'calls per hour allowed by the user'
                            },
                            'x-ratelimit-remaining': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'number of remaining calls in the current rate limit window'
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
                type: "string"
            }]
        },
        '/demo2': {
            '$ref': 'http://pathItem'
        }
    }
}

export const example_3_1_to_3 = {
    openapi: '3.0.0',
    info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
    },
    servers: [],
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
                    $ref: "#/components/schemas/Pet"
                }],
                'responses': {
                    200: {
                        description: 'successful operation',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Pet"
                                },
                                examples: {
                                    'application/json': {
                                        value: {
                                            name: 'Puma',
                                            type: 1,
                                            weight: 99.9
                                        }
                                    }
                                }
                            },
                            'text/plain': {
                                schema: {
                                    type: 'string'
                                }
                            }
                        },
                        headers: {
                            'x-ratelimit-limit': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'calls per hour allowed by the user'
                            },
                            'x-ratelimit-remaining': {
                                schema: {
                                    type: 'integer',
                                    format: 'int32'
                                },
                                description: 'number of remaining calls in the current rate limit window'
                            }
                        }
                    },
                    default: {
                        $ref: "#/components/schemas/Pet"
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
}
