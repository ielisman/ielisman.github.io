/* 
Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], 
make a function that organizes these into individual array that is ordered. 
For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 
Bonus: Make it so it organizes strings differently from number types. 
i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
*/

// 1. For each index element (i) look up next element (i+1) and swap when element at i+1 < element at i. 
//    Once done, compare i-1 with i and so on until i reaches 0
// 2. increment index i and repeat process above
//    check out implementation of bubble sort, mergesort, quicksort, etc.
function sortLinear (arr) {
    this.strArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < arr.length - 1) { // reached the end
            let j = i;
            while ((arr[j + 1] < arr[j]) && j > -1) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                j--;
            }
        }
    } 
  return arr;
}

function answer(arr) {
    let res = [];
    let subarr = [];
    for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
            if (arr[i] != arr[i-1]) { // current element != previous element
                if (subarr.length === 1) { // subarr has only 1 element, put that element as individual element into result, i.e. res = [...,subarr[x],...]
                    res = res.concat(subarr[0]);
                } else {                   // subarr has > 1 element, put subarr into results, i.e. [...,[subarr],...]
                    res = res.concat([subarr]);
                }
                subarr = [arr[i]]; // subarr is reinitialized with current element
                if (i === arr.length - 1) { // if this is the last element in array
                    if (subarr.length === 1) { // subarr has only 1 element, put that element as individual element into result, i.e. res = [...,subarr[x],...]
                        res = res.concat(subarr[0]);
                    } else {                   // subarr has > 1 element, put subarr into results, i.e. [...,[subarr],...]
                        res = res.concat([subarr]);
                    }
                }
            } else {
                subarr = subarr.concat(arr[i]);
                if (i === arr.length - 1) { 
                    if (subarr.length === 1) { // subarr has only 1 element, put that element as individual element into result, i.e. res = [...,subarr[x],...]
                        res = res.concat(subarr[0]);
                    } else {                   // subarr has > 1 element, put subarr into results, i.e. [...,[subarr],...]
                        res = res.concat([subarr]);
                    }
                }
            }
        } else {
            subarr[i] = arr[i]; // i=0: subarr = element at i=0
        }

        //console.log(`${arr[i-1]} ${arr[i]} : ${subarr} : ${res}`);
    }
    return res;
}

const arr1 = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
const arr2 = [1, "2", "3", 2, 5, "3", 3, 2];

const txtArr2 = arr2.filter( n => typeof n === "string" ); // arr2.reduce( (a,e) => (typeof e === 'string') ? a.concat(e) : a, []);
const numArr2 = arr2.filter( n => typeof n === "number" ); // arr2.reduce( (a,e) => (typeof e === 'number') ? a.concat(e) : a, []);

res1    = answer(sortLinear(arr1));
txtRes2 = answer(sortLinear(txtArr2));
numRes2 = answer(sortLinear(numArr2));

console.log(arr1, res1);
console.log(arr2, txtArr2, txtRes2);
console.log(arr2, numArr2, numRes2);

