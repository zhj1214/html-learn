/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-09 17:28:37
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-09-06 13:52:56
 */

/**
 * @description: 节流
 * @author: zhj1214
 */
function fn_jl(fn, interval) {
    let last = 0;
    return function () {
        let now = Date.now()
        if (now - last > interval) {
            fn.apply(this, arguments)
            last = now
        }
    }
}

/**
 * @description: 防抖
 * @author: zhj1214
 */
function fn_fd(fn, interval) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                fn.apply(context, args); timer = null
            }, interval)
        }
    }
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
        timer && clearTimeout(timer)
        if (remainning <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remainning)
        }
    }
}



/**
 * @description 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否即时响应
 * @return {*} 返回防抖后的函数
 */
 export function getDebounce(func: any, wait: number, immediate: boolean) {
    let timeout: any, args: any, context: any, timestamp: number, result: any
    if (null == wait) {
      wait = 100
    }
  
    function later() {
      const last = Date.now() - timestamp
  
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          context = args = null
        }
      }
    }
  
    const debounced = function () {
      context = this
      args = arguments
      timestamp = Date.now()
      const callNow = immediate && !timeout
      if (!timeout) {
        timeout = setTimeout(later, wait)
      }
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  
    debounced.clear = function () {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    }
  
    debounced.flush = function () {
      if (timeout) {
        result = func.apply(context, args)
        context = args = null
  
        clearTimeout(timeout)
        timeout = null
      }
    }
  
    return debounced
  }
  