/* 

Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format 
it returns RGB and if you enter RGB color format it returns HEX.

*/

function convert(n) { 
    if (isHexRe(n)) {
        n = n.replace(/\#/g, "");
        let out = []; let index = 0; let l = n.length;
        while (index < l) {
            let v = n.substr(index, 2);            
            out.push(hexToDec(v));
            index += 2;
        }
        return out.join();

    } else if (isRgb(n)) { 
        let aRes = n.replace(/(rgb)|\s|\(|\)/gi,"").split(/[,\;\:\.]/);
        let out="#";
        for (let r of aRes) {
            if (Number(r) > 255 || Number(r) < 0) {
                out = "Incorrect format specified. Range is 0-255"
                break;
            }
            else {
  	            out += decToHex(r);
            }
        }
        return out;
    } else { 
        console.log("Cannot determine number format");
    }
}

function decToHex(n) { 
    const hexArr = [];
    while (n>0)  { 
        let r = n%16;
        n = Math.trunc(n/16);
        hexArr.unshift( ((r>9) ? String.fromCharCode (55+r) : r) ); // String.fromCharCode (55+r);       
    }
    return hexArr.join("");
}

function hexToDec(n) {
		// check if < 11 first
    let l = n.length-1;
    let sum=0;    
    for (let c of n) { 
        let v = /[0-9]/.test(c) ? Number(c) : c.toUpperCase().charCodeAt(0)-55;        
        sum += (16**l) * v;
        l--;
    }
    return sum;
}

function isHexRe(str) { 
	let patt = /^\s*[\#]{0,1}\s*[0-9A-Fa-f]{6}\s*$/i;
    return patt.test(str);
}

function isHex(str) {
	let res = false;
  if (str.length === 7 || str.length === 6) { // 2nd argument in case # is ommitted  	
 		for (let c of str) { 
      switch ( typeof parseInt(c) === "number" ? "" : c ) { 
      	case "#": 
        case "A" : case "B" : case "C" : case "D" : case "E" : case "F" :
        case "a" : case "b" : case "c" : case "d" : case "e" : case "f" :
					res = true;
          break;
        case "":        
        	res = true;
          break;
        default :
        	res = false;
          break;
      }
		}   
	}
  return res;
}

function isRgb(str) {

    //var patt = /[0..255]\s*(\,|\;|\.)\s*[0..255]\s*(\,|\;|\.)\s*[0..255]/;
    //patt.test(str);

    if (str.length < 5) return false;

    let lc = str.toLowerCase();
    let n = lc.indexOf("rgb");
    if (lc.indexOf("rgb") != -1) { // assume format is rgb(n1,n2,n3)
        let rgbSuf = lc.substring(n+3,str.length);
        let parStart=false, parEnd=false, cmCnt=0;
        for (let c of rgbSuf) { 
            if (c===",") cmCnt++;
            else if (c==="(") parStart=true;
            else if (c===")") parEnd=true;
        }
        if (parStart && cmCnt === 2 && parEnd)
            return true;
    } else { // assume format is n1,n2,n3
        let cmCnt=0;
        for (let c of lc) {
            if (c===",") cmCnt++;
        }
        if (cmCnt === 2)
            return true;
    }
    
    return false;
}

let n = "#1234AB";
let r = convert(n);
let b = convert(r);

console.log( n, r );
console.log( r, b );