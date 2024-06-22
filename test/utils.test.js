import { formatVersion, getVersionHandle, formatData2Json} from '../src/utils/utils.js';
import {yaml2Json} from '../src/utils/yamlUtils.js';

describe("formatVersion", () => {
    test("params null", () => {
        expect(formatVersion(null)).toBe("3.1.0");
    })

    test("params ''", () => {
        expect(formatVersion("")).toBe("3.1.0");
    })

    test("params undefined", () => {
        expect(formatVersion()).toBe("3.1.0");
    })

    test("params  ", () => {
        expect(formatVersion(' ')).toBe("3.1.0");
    })

    test("params 2", () => {
        expect(formatVersion("2")).toBe("2.0.0");
    })

    test("params 2.0", () => {
        expect(formatVersion("2.0")).toBe("2.0.0");
    })

    test("params 2.0.0", () => {
        expect(formatVersion("2.0.0")).toBe("2.0.0");
    })

    test("params 2.0.0.0", () => {
        expect(formatVersion("2.0.0.0")).toBe("2.0.0");
    })
});

describe("getVersionHandle", () => {
    test("params null", () => {
        try {
            getVersionHandle(null);
        } catch (e) {
            expect(e.message).toEqual('targetVersion is required');
        }
    })

    test("params 3.2", () => {
        try {
            getVersionHandle('3.2');
        } catch (e) {
            expect(e.message).toEqual('targetVersion is not supported');
        }
    })

    test("params 2.0.0", () => {
        expect(getVersionHandle('2.0.0').name).toEqual('gen_2_code');
    })

    test("params 3.0.0", () => {
        expect(getVersionHandle('3.0.0').name).toEqual('gen_3_code');
    })

    test("params 3.1.0", () => {
        expect(getVersionHandle('3.1.0').name).toEqual('gen_3_1_code');
    })
})

describe("formatData2Json", () => {
    test("params null", () => {
        expect(formatData2Json(null)).toEqual(null);
    })
    test("params {}", () => {
        expect(formatData2Json('{}')).toEqual({});
    })
    test("params undefined", () => {
        expect(formatData2Json()).toEqual('undefined');
    })

    test("params undefined", () => {
        let obj = {
            openapi: '3.1.0'
        };
        expect(formatData2Json(obj)).toMatchObject({
            openapi: '3.1.0'
        });
    })

    test('json string', () => {
        let str = '{"foo": "bar"，}';
        try {
            formatData2Json(str)
        } catch (e) {
            expect(e.message).toBe('data is not json or yaml');
        }
    });
});
