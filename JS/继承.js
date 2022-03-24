/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-03-24 16:37:40
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-24 16:40:40
 */
function User(name){
    this.name =name    
}

User.prototype.run=function(){
    return this.name+'1234567890'
}

// 1.对象冒充继承
// function Web(name){
//     User.call(this,name)
// }

// 2.原型链继承,无法在初始话的时候传值
// function Web(){}
// Web.prototype  = new User() 

// 3. 对象冒充继承+原型链继承
function Web(name){
    User.call(this,name) // 对象冒充继承
}
Web.prototype  = User.prototype


let b = new Web('你好')
// console.log(Web.prototype)
console.log(b.name)
console.log(b.run())

