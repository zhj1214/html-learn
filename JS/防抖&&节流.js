/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-09 17:28:37
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-07-28 09:36:57
 */

/**
 * @description: 节流
 * @author: zhj1214
 */
function fn_jl(fn, interval) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last > interval) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}

/**
 * @description 函数防抖
 * @param {Function} func -需要函数防抖的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过防抖处理的函数
 * 配置项
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要额外触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 * */

function debounce(
  func,
  time = 1000,
  options = {
    leading: true,
    context: null,
  }
) {
  let timer;
  const _debounce = (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    // -开始是否需要触发一次
    if (options.leading) {
      const callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, time);
      if (callNow)
        typeof func === "function" && func.apply(options.context, args);
    } else {
      // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时time毫秒后执行func回调方法
      timer = setTimeout(function () {
        typeof func === "function" && func.apply(options.context, args);
      }, time);
    }
  };
  /**
   * @description 取消函数
   * @see https://juejin.im/post/5931561fa22b9d0058c5b87d
   * */
  _debounce.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
}

/**
 * @description: 节流和防抖结合使用
 * @author: zhj1214
 */
function fn_jl_fd(fn, delay) {
  let timer = null;
  let startTime = Date.now();

  return function () {
    let curTime = Date.now();
    let remainning = delay - (curTime - startTime);
    let context = this;
    let args = arguments;
    timer && clearTimeout(timer);
    if (remainning <= 0) {
      fn.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(fn, remainning);
    }
  };
}

/**
 * @description 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否即时响应
 * @return {*} 返回防抖后的函数
 */
export function getDebounce(func: any, wait: number, immediate: boolean) {
  let timeout: any, args: any, context: any, timestamp: number, result: any;
  if (null == wait) {
    wait = 100;
  }

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }

  const debounced = function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;

      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
