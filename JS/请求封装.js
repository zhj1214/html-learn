/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-13 10:30:47
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-11-22 09:49:12
 */


class Window { }

class Axiox {
    constructor() {
        this.a = 'a'
        this.b = 1234
        this.get = this.getinfo;
        this.userinfo = this.userinfos;
    }
    getinfo() {
        console.log('我是get方法,我返回一个promise')
        return new Promise.resolve('get')
    }
    userinfos() {
        console.log('userinfo   userinfo userinfo  userinfo')
        return Promise.resolve('userinfo')
    }
}
class ZhjRequest {
    constructor(beforHooks = {}, afterHooks = {}) {
        this.beforHooks = beforHooks;
        this.afterHooks = afterHooks;
        this.a = '123456';
        this.ZHJ = Axiox;
        this.init()
    }
    init() {
        let self = this;
        request.init = function () {
            // 此函数中的 this 代表window
            this.intance = new self.ZHJ()
            self.overwrite(this)
        }
    }

    overwrite(proxy) {
        for (const key in proxy.intance) {
            const element = proxy.intance[key];
            if (typeof element === 'function') {
                this.overwriteMethod(key, proxy)
                continue
            }
        }
    }

    overwriteMethod(key, proxy) {
        let afterHooks = this.afterHooks;
        let beforHooks = this.beforHooks;

        proxy[key] = (...args) => {
            // 拦截
            if (beforHooks[key]) {
                var res = beforHooks[key].call(proxy, args)
            } else {
                res = proxy.intance[key].apply(proxy.intance, args)
            }
            afterHooks[key] && afterHooks[key].call(proxy.intance, res)
            return res
        }
    }
}
// 这里把请求的方法注册到了window上，方便使用
var request = new Window()

function zhj_Get(val) {
    console.log('zhj_Get 执行了,接受的参数：', val)
    return Promise.resolve(false)
}
let beforHooks = {
    get: zhj_Get
}
// 初始化我的网络配置
let zhjRequest = new ZhjRequest(beforHooks) 
// 初始化请求实例
request.init()

console.log('Window:', request)
// 使用
request.userinfo().then(res => {
    console.log('我是回调0')
})
request.get('123456').then(res => {
    console.log('我是回调1', res)
})