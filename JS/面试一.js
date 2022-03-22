/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-03-01 09:34:14
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-01 09:35:18
 */
/**
 * 从右往左执行函数组合（右侧函数的输出作为左侧函数的输入）。
 * 最后一个函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。
 */
 function compose(...args) {
    console.log(args)
}

function classyGreeting(firstName, lastName) {
  return "The name's " + lastName + ', ' + firstName + ' ' + lastName;
}
function toUpperCase(string) {
  return string.toUpperCase();
}
var yellGreeting = compose(toUpperCase, classyGreeting);
console.log(yellGreeting)

console.log(124)

// var result = yellGreeting('James', 'Bond');
// console.log(result); // THE NAME'S BOND, JAMES BOND