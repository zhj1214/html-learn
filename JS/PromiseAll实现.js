/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-11 17:13:28
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-10-11 17:21:49
 */


function PromiseAll(promiseArray){
    return new Promise((resolve,reject)=>{
        if(!Array.isArray(promiseArray)) return reject('传入的参数必须是一个数组类型')
        const res = [];
        let total = 0
        const promiseNums = promiseArray.length;
        for (let index = 0; index < promiseNums; index++) {
            const element = promiseArray[index];
            Promise.resolve(element).then(value=>{
                total++;
                res[index] = value
                if(total === promiseNums){
                    resolve(res)
                }
            }).catch(err=>reject(err))
        }
    })
}

const pro1 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res(3)
    },3000)
})

const pro2 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res(2)
    },2000)
})

const pro3 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res(1)
    },1000)
})

PromiseAll([pro1,pro2,pro3]).then(res => console.log(res))