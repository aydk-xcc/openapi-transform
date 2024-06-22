import yaml from 'js-yaml';

export function yaml2Json(data) {
    try {
        return yaml.load(data);
    } catch (e) {
        throw new Error('数据异常');
    }
}
