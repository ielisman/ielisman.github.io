/*
Question 2: Write a javascript function that takes an array of numbers and a target number. 
The function should find two different numbers in the array that, when added together, give the target number. 
For example: answer([1,2,3], 4)should return [1,3]
*/

// store each number as hash with indexes as value, i.e. hash{2}=[0,12], hash{5}=[1,8,11], hash{3}=[2,10]...
// loop through each number and subtract it from target, i.e. 10-2=8, 10-5=5, 10-3=7. Find result in map above
// i.e. [2,5,3,4,1,9,6,7,5,8,3,5,2]; => number 2 is at index 0 and 12. Number 5 is at index 1, 8 and 11 and so on
function result(arr, target) {
    let m = new Map();
    // storing indexes of each number in a map: key=number value=list of indexes where that number occurs in array
    arr.forEach((n, i) => {
        let a = (m.has(n)) ? m.get(n) : [];
        a.push(i);
        m.set(n, a);
    });
    let result = [];
    let used = new Map();
    arr.forEach(n => {
        let find = target - n; // n + find = target. Searching for find in map

        // with target=10 and [3,7,5], 3 & 7 as well as 7 & 3 is the same, so checking if this combination of numbers was already used
        // however, correct approach should really check whether indexes of given numbers were already used (in map m, get values and remove index if used)
        if (!wereNumsUsed(used, n, find)) { 
            if (m.has(find)) {
                result.push([n, find]);
                let a = m.get(find);
                if (a.length > 1) {
                    a = a.shift();
                    m.set(n, a);
                } else {
                    a = null;
                    m.delete(find);
                }
            }
            setNums(used, n, find);
        }
    });

    return result;
}

function setNums(map, n1, n2) {
    if (n1 > n2) {
        let tmp = n1
        n1 = n2;
        n2 = tmp;
    }
    map.set(`${n1}:${n2}`, true);
}

function wereNumsUsed(map, n1, n2) {
    if (n1 > n2) {
        let tmp = n1
        n1 = n2;
        n2 = tmp;
    }
    return map.has(`${n1}:${n2}`);
}

const arr = [2,5,3,4,1,9,6,7,5,8,3,5,2];
const res = result(arr,10);
console.log(arr);
console.log(res);

// interesting solutions from others:

/*

const answer = (arr, target) => {
  return arr.filter((e, i) =>
    arr.find((e2, i2) => e2 === target - e && i !== i2)
  );
};

*/
