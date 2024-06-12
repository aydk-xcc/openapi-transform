#openapi-transform

主要解决openapi [2.0](https://spec.openapis.org/oas/v2.0#openapi-object) 、
[3.0](https://spec.openapis.org/oas/v3.0.0#openapi-object) 、
[3.1](https://spec.openapis.org/oas/v3.1.0#openapi-object) 
之间互相转化的问题,使用起来也非常简单：

## 1.安装
```javascript
npm install openapi-transform
```

## 2.使用
```javascript
import { openApiTransform } from 'openapi-transform';

// let obj 任意版本(2.0 3.0 3.1)的openapi数据
let result = openApiTransform(obj, '2.0');

// 转换成3.0
// let result = openApiTransform(obj, '3.0');

// 转换成3.1
// let result = openApiTransform(obj, '3.1');

```
