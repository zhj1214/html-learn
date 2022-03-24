/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-12 15:13:42
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-24 16:59:21
 */

/**
 * @description: 第一种
 * @author: zhj1214
 */
export function measureRunTime(target, name, descriptor) {
  const oldValue = descriptor.value;

  descriptor.value = async function () {
    console.time(name);
    const ret = await oldValue.apply(this, arguments);
    console.timeEnd(name);
    return ret;
  };
  return descriptor;
}
// 使用
class Measure {
  @measureRunTime
  create() {
    new Promise((reslove) => setTimeout(reslove, 3000));
  }
}

Measure.create();


/**
 * @description: 第二种
 * @author: zhj1214
 */
Function.prototype.before = function (beforefn) {
  var self = this; //保存原函数引用
  return function () {
    //返回包含了原函数和新函数的 '代理函数'
    const rtr = beforefn.apply(this, arguments) || {}; //执行新函数，修正this
    const args = Array.from(arguments);
    args.push(rtr);
    return self.apply(this, args); //执行原函数
  };
};

Function.prototype.after = function (afterfn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    const args = Array.from(arguments);
    args.push(ret);
    afterfn.apply(this, args);
    return ret;
  };
};
