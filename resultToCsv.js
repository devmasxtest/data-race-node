const result = require("./result.json");
const _ = require("lodash");
const obj = _.pick(result, ["B70", "B80", "B90", "B00"]);
const allStates = [];

// Object.entries(obj).map(([key, value]) => {
//   Object.entries(value).map(([_key, _value]) => {
//     const states = Object.keys(_key);
//     allStates = [...states];
//   });
// });
// let finalResult = [];

// Object.entries(obj).map(([key, value]) => {
//   Object.entries(value).map(([_key, _value]) => {
//     const row = finalResult.find(item => item.name == _key);
//     if (row) {
//       finalResult = { [key]: _value, ...row };
//     } else {
//       finalResult.push({ name: _key, [key]: _value });
//     }
//   });
// });

// console.log(finalResult);
