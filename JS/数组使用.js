/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-09-15 17:36:17
 * @LastEditors: zhj1214
 * @LastEditTime: 2022-03-24 16:52:16
 */
let a = [1, 2, 3, 4, 5, 6];
// for of
for (let i of a) {
  console.log(i); // 1，2，3，4，5，6
}
// for in
for (let i in a) {
  console.log(i); // i 为字符串索引：0，1，2，3，4，5
}
// map
let b = a.map((e) => {
  console.log(e);
  return 1;
});
// filter
let b = a.filter((e) => {
  console.log(e);
  return true;
});
// some
let b = a.some((e) => {
  console.log(e);
  return e == 2;
}); // 输出：1，2
/**
 * every() 方法使用指定函数检测数组中的所有元素：
 * 如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。
 * 如果所有元素都满足条件，则返回 true。
 */
let b = a.every((e) => {
  console.log(e);
  return e < 4;
}); // 输出：1，2,3  b=false
/**
 * reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
 * reduce() 可以作为一个高阶函数，用于函数的 compose。
 * 注意: reduce() 对于空数组是不会执行回调函数的
 * reduceRight() 方法的功能和 reduce() 功能是一样的，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。
 * */
var numbers = [65, 44, 12, 4];
function getSum(total, num) {
  return total + num;
}
function myFunction(item) {
  document.getElementById("demo").innerHTML = numbers.reduceRight(getSum);
}
