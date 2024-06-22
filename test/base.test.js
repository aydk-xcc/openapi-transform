import {
    initBaseTemplate,
    initRef,
    initComponents,
    getProduces,
    getConsumes,
    initParameters,
    initServers,
    initPaths
} from '../src/base';
import {example_2_1} from './config/2_data.js';
import {example_3_1} from './config/3_data.js';

describe('2.0 to base', () => {
  test('initBaseTemplate', () => {
    const obj = initBaseTemplate(example_2_1);
    expect(obj).toMatchObject({
      "version": "2.0",
      info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
      }
    });
  });
});

describe('3.1 to base', () => {
  test('initBaseTemplate', () => {
    const obj = initBaseTemplate(example_3_1);
    expect(obj).toMatchObject({
      "version": "3.1",
      info: {
        version: '1.0',
        title: 'Swagger',
        description: '测试'
      },
      paths: [{
        path: '/demo',
        get: {
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
            "$ref": "#/components/schemas/Pet",
          }],
          'responses': [
            {
              code: '200',
              content: {
                "application/json": {
                  schema: {
                    "$ref": "#/components/schemas/Pet",
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
                "text/plain": {
                  "schema": {
                    "type": "string"
                  }
                }
              },
              headers: {
                'x-ratelimit-limit': {
                  schema: {
                    type: 'integer',
                    format: 'int32',
                  },
                  description: 'calls per hour allowed by the user'
                },
                'x-ratelimit-remaining': {
                  schema: {
                    type: 'integer',
                    format: 'int32',
                  },
                  description: 'number of remaining calls in the current rate limit window'
                }
              },

              "description": "successful operation",
            },
            {
              code: 'default',
              "$ref": "#/components/schemas/Pet",
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
        "$ref": "http://pathItem",
        "description": "test",
        "path": "/demo2",
      }]
    });
  });
});

describe('3.0 to base', () => {
  test('initBaseTemplate', () => {
    expect(true).toBeTruthy();
  });
});

describe('3.1 to base', () => {
  test('initBaseTemplate', () => {
    expect(true).toBeTruthy();
  });
});

describe("initRef", () => {
  let obj = {
    schema: {
      $ref: "#/definitions/Pet"
    },
    parameter: {
      $ref: "#/parameters/petId"
    },
    response: {
      $ref: "#/responses/NotFound"
    },
    security: {
      $ref: "#/securityDefinitions/api_key"
    }
  };
  test('initRef', () => {
    expect(initRef(obj)).toMatchObject({
      schema: {
        $ref: "#/components/schemas/Pet"
      },
      parameter: {
        $ref: "#/components/parameters/petId"
      },
      response: {
        $ref: "#/components/responses/NotFound"
      },
      security: {
        $ref: "#/components/securitySchemes/api_key"
      }
    });
  });
});

describe("initServers", () => {
  test('have servers', () => {
    let obj = {
      servers: [
        {
          url: "http://petstore.swagger.io/api"
        }
      ]
    };
    expect(initServers(obj)).toContainEqual({
      url: "http://petstore.swagger.io/api"
    });
  });
  test('no servers', () => {
    let obj1 = {
      host: 'test.com'
    };
    let obj2 = {
      schemes: ['http', 'https']
    };
    let obj3 = {
      basePath: '/'
    };
    expect(initServers(obj1)).toEqual([]);
    expect(initServers(obj2)).toEqual([]);
    expect(initServers(obj3)).toEqual([]);
  });

  test('hava host', () => {
    let obj1 = {
      host: 'test.com',
      schemes: ['http', 'https'],
      basePath: '/'
    };
    expect(initServers(obj1)).toEqual([{
      url: "http://test.com/",
      description: ""
    },{
      url: "https://test.com/",
      description: ""
    }]);
  });

  test('schemes is []', () => {
    let obj1 = {
      host: 'test.com',
      schemes: [],
      basePath: '/'
    };
    expect(initServers(obj1)).toEqual([{
      url: "http://test.com/",
      description: ""
    }]);
  });
});

describe("initComponents", () => {
  test("components", () => {
    let obj = {
      components: {
      }
    };
    expect(initComponents(obj)).toEqual({})
  })
  test("components {}", () => {
    expect(initComponents({})).toEqual({})
  })

  test("components parameters", () => {
    let obj = {
      parameters: {}
    }
    expect(initComponents(obj)).toMatchObject({
      parameters: {}
    })
  })

  test("components parameters", () => {
    let obj = {
      parameters: {}
    }
    expect(initComponents(obj)).toMatchObject({
      parameters: {}
    })
  })

  test("components responses", () => {
    let obj = {
      responses: {}
    }
    expect(initComponents(obj)).toMatchObject({
      responses: {}
    })
  })

  test("components definitions", () => {
    let obj = {
      definitions: {}
    }
    expect(initComponents(obj)).toMatchObject({
      schemas: {}
    })
  })

  test("components securityDefinitions", () => {
    let obj = {
      securityDefinitions: {}
    }
    expect(initComponents(obj)).toMatchObject({
      securitySchemes: {}
    })
  })
});

describe("getProduces", () => {
  test("have produces", () => {
    let obj = {
      produces: ['application/json']
    }

    let globalConfig = {
    }
    expect(getProduces(globalConfig, obj)).toEqual('application/json')
  })

  test("have produces but length = 0", () => {
    let obj = {
      produces: []
    }

    let globalConfig = {
    }
    expect(getProduces(globalConfig, obj)).toEqual('*/*')
  })

  test("have produces but length = 0 and global have", () => {
    let obj = {
      produces: []
    }

    let globalConfig = {
      produces: ['application/json']
    }
    expect(getProduces(globalConfig, obj)).toEqual('application/json')
  })
});

describe("getConsumes", () => {
  test("have consumes", () => {
    let obj = {
      consumes: ['application/json']
    }

    let globalConfig = {
    }
    expect(getConsumes(globalConfig, obj)).toEqual('application/json')
  })

  test("have consumes but length = 0", () => {
    let obj = {
      consumes: []
    }

    let globalConfig = {
    }
    expect(getConsumes(globalConfig, obj)).toEqual('*/*')
  })

  test("have consumes but length = 0 and global have", () => {
    let obj = {
      consumes: []
    }

    let globalConfig = {
      consumes: ['application/json']
    }
    expect(getConsumes(globalConfig, obj)).toEqual('application/json')
  })
});

describe("initParameters", () => {
  test("parameters is []", () => {
    let arr = [];
    expect(initParameters(arr)).toEqual([])
  })

  test("parameters contain $ref", () => {
    let arr = [{
      "$ref": "#/components/schemas/Pet"
    }];
    expect(initParameters(arr)).toEqual([{
      "$ref": "#/components/schemas/Pet"
    }])
  })

  test("parameters contain body", () => {
    let arr = [{
        "name": "user",
        "in": "body",
        "description": "user to add to the system",
        "required": true,
        "schema": {
          "$ref": "#/definitions/User"
        }
      },
      {
        "name": "token",
        "in": "header",
        "description": "token to be passed as a header",
        "required": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int64"
          }
        },
        "style": "simple"
      }];
    expect(initParameters(arr)).toEqual([{
        "name": "user",
        "in": "body",
        "description": "user to add to the system",
        "required": true,
        "schema": {
          "$ref": "#/definitions/User"
        }
      },{
        "name": "token",
        "in": "header",
        "description": "token to be passed as a header",
        "required": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int64"
          }
        },
        "style": "simple"
    }])
  })
  test("parameters v2 string", () => {
    let arr = [{
      "name": "username",
      "in": "path",
      "description": "username to fetch",
      "required": true,
      "type": "string"
    }];
    expect(initParameters(arr)).toEqual([{
      "name": "username",
      "in": "path",
      "description": "username to fetch",
      "required": true,
      "schema": {
        type: "string"
      }
    }])
  })

  test("parameters v2 maxItems", () => {
    let arr = [{
      "name": "username",
      "in": "path",
      "description": "username to fetch",
      "required": true,
      "type": "number",
      maximum: 10,
      minimum: 5
    }];
    expect(initParameters(arr)).toEqual([{
      "name": "username",
      "in": "path",
      "description": "username to fetch",
      "required": true,
      "schema": {
        type: "number",
        maximum: 10,
        minimum: 5
      }
    }])
  })

  test("parameters v2 array", () => {
    let arr = [{
      "name": "username",
      "in": "header",
      "description": "username to fetch",
      "required": true,
      "type": "array",
      items: {
        type: "number"
      }
    }];
    expect(initParameters(arr)).toEqual([{
      "name": "username",
      "in": "header",
      "description": "username to fetch",
      "required": true,
      "schema": {
        type: "array",
        items: {
          type: "number"
        }
      }
    }])
  })
});

describe("initPaths", () => {
  test('invalide path', () => {
    let data = {
      'paths': {
        test: {}
      }
    }
    expect(initPaths(data)).toEqual([])
  })
  test(' null ', () => {
    let data = {
    }
    expect(initPaths(data)).toEqual([])
  })

  test(' x- ', () => {
    let data = {
      paths: {
        'x-api': 2
      }
    }
    expect(initPaths(data)).toEqual([{
      'x-api': 2
    }])
  })

  test(' x- ', () => {
    let data = {
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
      }
    }
    expect(initPaths(data)).toEqual([{
      'x-api': 2
    },{
      path: '/demo',
      get: {
        consumes: ['application/json'],
        produces: ['application/json'],
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
          $ref: '#/definitions/Pet'
        }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "string"
              }
            }
          },
          "description": "username to fetch",
          "required": true
        },
        'responses': [
          {
            code: '200',
            content: {
              "application/json": {
                schema: {
                  $ref: '#/definitions/Pet'
                },
                examples: {
                  'application/json': {
                      description: '',
                      summary: '',
                      value: {
                        name: 'Puma',
                        type: 1,
                        weight: 99.9
                      }
                  }
                }
              }
            },
            headers: {
              'x-ratelimit-limit': {
                schema: {
                  type: 'integer',
                  format: 'int32',
                },
                description: 'calls per hour allowed by the user'
              },
              'x-ratelimit-remaining': {
                schema: {
                  type: 'integer',
                  format: 'int32',
                },
                description: 'number of remaining calls in the current rate limit window'
              }
            },

            "description": "successful operation",
          },
          {
            code: 'default',
            $ref: '#/definitions/Pet'
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
    }])
  })
})
