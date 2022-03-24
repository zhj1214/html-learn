/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-09 17:28:37
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-24 16:51:10
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