/*
 * @Description: 手写Promise A+
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-02-16 09:54:25
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-02-16 10:19:35
 */
const PENDING = "padding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(f) {
  this.status = PENDING;
  this.result = null;
  // 收集then函数依赖
  this.callbacks = [];

  let onFuliflled = (value) => transition(this, FULFILLED, value);
  let onRejected = (reason) => transition(this, REJECTED, reason);

  let ignore = false;
  let resolve = (value) => {
    if (ignore) return;
    ignore = true;
    resolvePromise(this, value, onFuliflled, onRejected);
  };

  let reject = (reason) => {
    if (ignore) return;
    ignore = true;
    onRejected(reason);
  };

  try {
    f(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
/**
 * @description: 1. 修改Promise状；2.执行注册的then回调函数
 */
function transition(promise, status, result) {
  if (promise.status !== PENDING) return;
  promise.status = status;
  promise.result = result;
  setTimeout(() => handleCallbacks(promise.callbacks, status, result), 0);
}

const handleCallbacks = (callbacks, status, result) => {
  while (callbacks.length) handleCallback(callbacks.shift(), status, result);
};

function handleCallback(callback, status, result) {
  let { onfuliflled, onRejected, resolve, reject } = callback;
  try {
    if (status === FULFILLED) {
      if (isFunction(onfuliflled)) {
        resolve(onfuliflled(result));
      } else {
        resolve(result);
      }
    } else if (status === REJECTED) {
      if (isFunction(onRejected)) {
        reject(onRejected(result));
      } else {
        reject(result);
      }
    }
  } catch (error) {
    reject(error);
  }
}

/**
 * @description: 校验结果的正确性，与特殊情况
 * @param {*} promise 当前promise实例
 * @param {*} result resolve 的结果
 * @param {*} resolve  onFuliflled 状态更新函数
 * @param {*} reject onRejected 状态更新函数
 * @author: zhj1214
 */
const resolvePromise = (promise, result, resolve, reject) => {
  // result 是不是 promise 本身，是就抛 TypeError 错误
  if (promise === result) return reject(new TypeError("不能是Promise本身"));
  // result 是不是 promise 类型，是就调用 then(resolve, reject) 取它的 value 或 reason。
  if (isPromise(result)) return result.then(resolve, reject);
  // result 是不是 thenable 对象，是就先取出 then，再用 new Promise 去进入 The Promise Resolution Procedure 过程。
  if (isThenable(result)) {
    try {
      let then = result.then;
      if (isFunction(then)) {
        return new MyPromise(then.bind(result)).then(resolve, reject);
      }
    } catch (error) {
      return reject(error);
    }
  }
  resolve(result);
};

// true 是thenable;  false; 非thenable
const isThenable = (p) => {
  return (
    p !== null &&
    (typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  );
};
function isPromise(obj) {
  return (
    !!obj && //有实际含义的变量才执行方法，变量null，undefined和''空串都为false
    (typeof obj === "object" || isFunction(obj)) && // 初始promise 或 promise.then返回的
    isFunction(obj.then)
  );
}
function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

/**
 * @description: 方法扩充
 */

MyPromise.prototype.then = (onfuliflled, onRejected) => {
  return new Promise((resolve, reject) => {
    let callback = { onfuliflled, onRejected, resolve, reject };
    // 依赖收集
    if (this.status === PENDING) {
      this.callbacks.push(callback);
    } else {
      setTimeout(() => {
        handleCallback(callback, this.status, this.result);
      }, 0);
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

MyPromise.resolve = (value) => new MyPromise((resolve) => resolve(value));

MyPromise.reject = (reason) => new MyPromise((_, reject) => reject(reason));
