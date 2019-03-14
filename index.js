const fs = require("fs");
const raceCase = require("./race.json");

// count by state
const countResult = {};

const averageWeight = {
  count: 0,
  totalWeightPound: 0
};

const addCount = (obj, state, number) => {
  if (!obj[state]) {
    obj[state] = {};
  }
  obj[state][`B${number}`] = obj[state][`B${number}`]
    ? obj[state][`B${number}`] + 1
    : 1;
};

const addCountRace = (obj, state, number, race) => {
  if (!obj[state]) {
    obj[state] = {};
  }
  if (obj[state] && !obj[state][`Race${number}`]) {
    obj[state][`Race${number}`] = {};
  }
  obj[state][`Race${number}`][race] = obj[state][`Race${number}`][race]
    ? obj[state][`Race${number}`][race] + 1
    : 1;
};

const addCountGender = (obj, state, gender) => {
  if (!obj[state]) {
    obj[state] = {};
  }

  obj[state][gender] = obj[state][gender] ? obj[state][gender] + 1 : 1;
};

const addCountWeight = (obj, state, weight) => {
  if (!obj[state]) {
    obj[state] = {};
  }

  if (obj[state] && !obj[state].Weight) {
    obj[state].Weight = {};
  }

  obj[state].Weight.count = obj[state].Weight.count
    ? obj[state].Weight.count + 1
    : 1;
  obj[state].Weight.totalWeightPound = obj[state].Weight.totalWeightPound
    ? obj[state].Weight.totalWeightPound + weight
    : weight;
};

const setCountByQuery = row => {
  const state = row[5];
  const year = parseInt(row[1], "10");
  const child_race = raceCase[row[7]] || row[7];
  const gender = row[6] == "true" ? "male" : "female";
  const weight_pounds = parseFloat(row[8], "10") || 0;

  let number;
  if (year >= 1970 && year < 1980) {
    number = "70";
  } else if (year >= 1980 && year < 1990) {
    number = "80";
  } else if (year >= 1990 && year < 2000) {
    number = "90";
  } else if (year >= 2000 && year < 2010) {
    number = "00";
  }

  addCount(countResult, state, number);
  addCountRace(countResult, state, number, child_race);
  if (year >= 1970 && year < 2010) {
    addCountGender(countResult, state, gender);
    addCountWeight(countResult, state, weight_pounds);
  }
};

async function readSpeed(file) {
  return new Promise(resolve => {
    const label = `readSpeed-file${file}`;
    console.time(label);

    let result = [];
    const stream = fs.createReadStream(file, { encoding: "utf8" });
    stream.on("data", data => {
      result = data.split(/\n/);
      console.log("Size file", result.length);
      result.forEach(line => {
        const row = line.split(",");
        setCountByQuery(row);
      });
      stream.destroy();
    });
    stream.on("close", () => {
      console.timeEnd(label);
      resolve(result);
    });
  });
}

// async function readSlow(file) {
//   return new Promise(resolve => {
//     fs.readFile(file, "utf8", (err, data) => {
//       const result = data.split(/\n/);
//       result.forEach(line => {
//         const row = line.split(",");
//         setCountByQuery(row);
//       });
//       resolve();
//     });
//   });
// }

(async () => {
  const label = `readSpeed`;
  console.time(label);
  const files = fs.readdirSync("./data/natalidad");
  console.log("read n files", files.length);
  // pararell
  await Promise.all(files.map(name => readSpeed(`./data/natalidad/${name}`)));
  // await readSpeed(`./data/natalidad/natalidad000000000001.csv`);
  console.timeEnd(label);
  fs.writeFileSync("./result.json", JSON.stringify(countResult));
})();
