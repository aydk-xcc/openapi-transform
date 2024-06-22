import { yaml2Json} from '../src/utils/yamlUtils.js';

describe('yaml2Json', () => {
    test('should return true for YAML string', () => {
        expect(yaml2Json('---\nfoo: bar')).toMatchObject({
            foo: 'bar'
        });
    });

    test('json string', () => {
        expect(yaml2Json('{ foo: "bar" }')).toMatchObject({
            foo: 'bar'
        });
    });

    test('json string', () => {
        let str = '{"foo": "bar"，}';
        try {
            yaml2Json(str)
        } catch (e) {
            expect(e.message).toBe('数据异常');
        }
    });
})
