import { initBaseTemplate } from './base/index.js';
import {getVersionHandle, formatData2Json, formatVersion} from './utils/utils.js';
function openApiTransform(data, targetVersion) {
    if (!data) {
        return data;
    }
    let baseTemplate = initBaseTemplate(data);
    // 如果当前版本和目标版本一致，不做处理

    let version = formatVersion(targetVersion);

    if (formatVersion(baseTemplate.version) === version) {
        return formatData2Json(data);
    }
    const versionHandle = getVersionHandle(version);
    try {
        return versionHandle(baseTemplate);
    } catch (e) {
        throw new Error(e);
    }
}

export {
    openApiTransform,
    initBaseTemplate
};
