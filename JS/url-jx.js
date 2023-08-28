/*
 * @Description: 关于URL的工具类
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-04 09:35:16
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-11-01 17:52:30
 */

/** URL 解析 **/

// const URL = require('url')
// const urlFormat = require('querystring')

// export default {
//   /**
//    *  @description url 参数解析
//    */
//   getUrlParams(names, urlSearch = location.href) {
//     const URL = require('url')
//     const urlFormat = require('querystring')
//     const urlParam = URL.parse(urlSearch)
//     const urlObj = urlFormat.parse(urlParam.query)
//     if (!urlObj[names]) {
//       const hashObj = urlFormat.parse(urlParam.hash)
//       for (const idx in Object.keys(hashObj)) {
//         const key = Object.keys(hashObj)[idx]
//         if (typeof key === 'string') {
//           if (key.indexOf('?') !== -1) {
//             if (key.split('?')[1] === names) {
//               return hashObj[key]
//             }
//           }
//         }
//       }
//       return hashObj[names]
//     }
//     return urlObj[names]
//   },
// }
