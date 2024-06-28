import {openApiTransform} from '../src/index.js';
import {example_2, example_2_to_3, example_2_to_3_1} from './config/2_data.js';
import {example_3, example_3_to_2, example_3_to_3_1} from './config/3_data.js';
import {example_3_1, example_3_1_to_2, example_3_1_to_3} from './config/3_1_data.js';

describe('openApiTransform 2.0', () => {
    test('2 to 2.0', () => {
        let target = openApiTransform(example_2, "2.0");
        expect(target).toEqual(example_2)
    })

    test('2 to 3.0', () => {
        let target = openApiTransform(example_2, "3.0");
        expect(target).toEqual(example_2_to_3)
    })

    test('2 to 3.0', () => {
        let target = openApiTransform(example_2, "3.1");
        expect(target).toEqual(example_2_to_3_1)
    })
})

describe('openApiTransform 3', () => {
    test('3 to 2.0', () => {
        let target = openApiTransform(example_3, "2.0");
        expect(target).toEqual(example_3_to_2)
    })

    test('3 to 3.0', () => {
        let target = openApiTransform(example_3, "3.0");
        expect(target).toEqual(example_3)
    })

    test('3 to 3.1', () => {
        let target = openApiTransform(example_3, "3.1");
        expect(target).toEqual(example_3_to_3_1)
    })
})

describe('openApiTransform 3.1', () => {
    test('3.1 to 2.0', () => {
        let target = openApiTransform(example_3_1, "2.0");
        expect(target).toEqual(example_3_1_to_2)
    })

    test('3.1 to 3.0', () => {
        let target = openApiTransform(example_3_1, "3.0");
        expect(target).toEqual(example_3_1_to_3)
    })

    test('3.1 to 3.1', () => {
        let target = openApiTransform(example_3_1, "3.1");
        expect(target).toEqual(example_3_1)
    })
})

