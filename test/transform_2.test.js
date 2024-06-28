import {
    initHost,
    initConsumes,
    initProduces,
    initComponents,
    initRef,
    initParameters,
} from '../src/2.0/index.js'

describe('initHost', () => {
    test('initHost 1', () => {
        let obj = {
            servers: [
                {
                    url: 'http://localhost:8080/base',
                    description: ''

                }
            ]
        }
        let target = {};
        initHost(obj, target);
        expect(target).toEqual({
            "host": "localhost:8080",
            basePath: '/base',
            schemes: [
                'http'
            ]
        });
    })

    test('initHost 2', () => {
        let obj = {
            servers: [{
                url: '//localhost:8080'
            },{
                url: 'https://localhost:8080'
            },{
                url: 'ws://localhost:8080/'
            }]
        };
        let target = {};
        initHost(obj, target);
        expect(target).toEqual({
            "host": "localhost:8080",
            basePath: '/',
            schemes: [
                'https',
                'ws'
            ]
        });

    })

    test('initHost 2', () => {
        let obj = {
        };
        let target = {};
        initHost(obj, target);
        expect(target).toEqual({
        });

    })
});

describe('initConsumes', () => {
    test('initConsumes 1', () => {
        let obj = {};
        let target = {};
        initConsumes(obj, target);
        expect(target).toEqual({});
    });

    test('initConsumes 1', () => {
        let obj = {
            consumes: []
        };
        let target = {};
        initConsumes(obj, target);
        expect(target).toEqual({
            consumes: []
        });
    });
});

describe('initProduces', () => {
    test('initProduces {}', () => {
        let obj = {};
        let target = {};
        initProduces(obj, target);
        expect(target).toEqual({});
    });

    test('initProduces ', () => {
        let obj = {
            produces: []
        };
        let target = {};
        initProduces(obj, target);
        expect(target).toEqual({
            produces: []
        });
    });
});

describe('initComponents', () => {
    test('initComponents', () => {
        let obj = {};
        let target = {};
        initComponents(obj, target);
        expect(target).toEqual({});
    });

    test('initComponents schemas', () => {
        let obj = {
            components: {
                schemas: {},
                parameters: {},
                responses: {},
                securitySchemes: {}
            }
        };
        let target = {};
        initComponents(obj, target);
        expect(target).toEqual({
            definitions: {},
            parameters: {},
            responses: {},
            securityDefinitions: {}
        });
    });
})

describe('initRef', () => {
    test('initRef', () => {
        let obj = {
            a: {
                $ref: '#/components/schemas/a'
            },
            b: {
                $ref: '#/components/parameters/b'
            },
            c: {
                $ref: '#/components/responses/c'
            },
            d: {
                $ref: '#/components/securitySchemes/d'
            }
        };
        obj = initRef(obj);
        expect(obj).toEqual({
            a: {
                $ref: '#/definitions/a'
            },
            b: {
                $ref: '#/parameters/b'
            },
            c: {
                $ref: '#/responses/c'
            },
            d: {
                $ref: '#/securityDefinitions/d'
            }
        });
    });
    test('initRef error', () => {
        let obj = {};
        obj.a = obj;
        obj = initRef(obj);
        expect(obj).toEqual(obj);
    });
})

describe('initParameters', () => {
    test('initParameters', () => {
        let arr = [
            {
                $ref: '#/components/parameters/a'
            },
            {
                name: 'b',
                in: 'query',
                schema: {
                    type: 'string'
                }
            },
            {
                name: 'c',
                in: 'path',
                type: 'string'
            }
        ];
        expect(initParameters(arr)).toEqual([
            {
                $ref: '#/components/parameters/a'
            },
            {
                name: 'b',
                in: 'query',
                type: 'string'
            },
            {
                name: 'c',
                in: 'path',
                type: 'string'
            }
        ]);
    });
});
