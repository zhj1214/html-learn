/*
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2021-10-12 13:39:27
 * @LastEditors: zhj1214
 * @LastEditTime: 2021-10-12 13:45:20
 */
function trap(height = []) {
    if (height.length === 0) {
        return 0;
    }
    const n = height.length;
    let res = 0;
    let left = 0;
    let right = n - 1;

    let l_max = 0;
    let r_max = height[n - 1]
    while (left <= right) {
        l_max = Math.max(l_max, height[left]);
        r_max = Math.max(r_max, height[right]);
        if (left < r_max) {
            res += l_max - height[left]
            left++;
        } else {
            res += r_max - height[right]
            right--;
        }
    }
    return res;
}

console.log(trap([4,2,0,3,2,5]))