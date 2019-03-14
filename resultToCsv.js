const _ = require("lodash");
const fs = require("fs");
const result = require("./result.json");
const finalResult = [];

const maxKey = obj => {
  if (!obj) {
    return "";
  }
  let race = "";
  let max = 0;
  Object.entries(obj).map(([raceName, value]) => {
    if (value > max) {
      max = value;
      race = raceName;
    }
  });
  return race;
};

Object.entries(result).map(([state, value]) => {
  finalResult.push({
    name: state,
    B70: value.B70,
    B80: value.B80,
    B90: value.B90,
    B00: value.B00,
    Race70: maxKey(value.Race70),
    Race80: maxKey(value.Race80),
    Race90: maxKey(value.Race90),
    Race00: maxKey(value.Race00),
    Male: value.Male,
    Female: value.Female
  });
});
fs.writeFileSync("./finalResult.json", JSON.stringify(finalResult));
