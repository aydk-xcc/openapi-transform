import yaml from 'js-yaml';

export function isYaml(data) {
    try {
        yaml.load(data);
        return true;
    } catch (e) {
        return false;
    }
}

export function yaml2Json(data) {
    try {
        return yaml.load(data);
    } catch (e) {
        throw e;
    }
}
