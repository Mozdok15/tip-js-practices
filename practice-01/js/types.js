"use strict";

console.log('"8" + 2 =', "8" + 2, "| type:", typeof ("8" + 2));
console.log('"8" - 2 =', "8" - 2, "| type:", typeof ("8" - 2));
console.log('Number("8") + 2 =', Number("8") + 2, "| type:", typeof (Number("8") + 2));
console.log('"12" > "3" =', "12" > "3", "| type:", typeof ("12" > "3"));
console.log('12 === "12" =', 12 === "12", "| type:", typeof (12 === "12"));
console.log('Number("") =', Number(""), "| type:", typeof Number(""));
console.log('Number("text") =', Number("text"), "| type:", typeof Number("text"));
console.log('Boolean("false") =', Boolean("false"), "| type:", typeof Boolean("false"));
console.log("typeof null =", typeof null, "| type:", typeof (typeof null));
console.log("typeof NaN =", typeof NaN, "| type:", typeof (typeof NaN));