import {gen_2_code} from '../2.0/index.js';
import {gen_3_code} from '../3.0/index.js';
import {gen_3_1_code} from '../3.1/index.js';
import {yaml2Json} from './yamlUtils.js';
export function getVersionHandle(targetVersion) {
    if (!targetVersion) {
        throw new Error('targetVersion is required')
    }
    switch (targetVersion) {
        case '2.0.0':
            return gen_2_code;
        case '3.0.0':
            return gen_3_code;
        case '3.1.0':
            return gen_3_1_code;
        default:
            throw new Error('targetVersion is not supported')
    }
}

export function formatVersion(version) {
    if (!version) {
        return '3.1.0';
    } else {
        let arr = version.split('.').filter(item => item.trim() !== '');
        if (arr.length === 1) {
            return `${version}.0.0`;
        } else if (arr.length === 2) {
            return `${version}.0`;
        } else if (arr.length > 2) {
            return arr.slice(0, 3).join('.');
        } else {
            return '3.1.0';
        }
    }
}

export function formatData2Json(data) {
    try {
        if (typeof data === 'object') {
            return data;
        } else {
            return yaml2Json(data);
        }
    } catch (e) {
        throw new Error('data is not json or yaml');
    }
}

export function isReferenceObject(obj) {
    return obj && typeof obj === 'object' && '$ref' in obj;
}
