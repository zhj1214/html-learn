/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-12 17:11:44
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-10-12 17:13:40
 */
const urls = [{
    info:"第   1   个",
    time: 2000
},{
    info:"第   2   个",
    time: 1000
},{
    info:"第   3   个",
    time: 3000
},{
    info:"第   4   个",
    time: 9000
},{
    info:"第   5   个",
    time: 4000
},{
    info:"第   6   个",
    time: 7000
},{
    info:"第   7   个",
    time: 8000
},{
    info:"第   8   个",
    time: 5000
},{
    info:"第   9   个",
    time: 4000
}]


function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log("----" + url.info + "         start!")
        setTimeout(() => {
            console.log(url.info + "  OK!!!")
            resolve()
        }, url.time)
    })
}


function limitload(urls, handler, limit) {
    const sequence = [].concat(urls);
    let promiss = [];
    promiss = sequence.splice(0, limit).map((u, index) => {
        return handler(u).then(() => {
            return index
        })
    })
    let p = Promise.race(promiss);
    for (let i = 0; i < sequence.length; i++) {
        p = p.then((j) => {
            promiss[j] = handler(sequence[i]).then(() => {
                return j
            })
            return Promise.race(promiss);
        })
    }
}

limitload(urls,loadImg,3);
