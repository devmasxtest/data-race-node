const fs = require("fs");
const raceCase = require("./race.json");

// count by state
const countState = {
  "70": {},
  "80": {},
  "90": {},
  "2000": {}
};

// count by child_race
const countRace = {};

const countGender = {};

const averageWeight = {
  count: 0,
  totalWeightPound: 0
};

const addCount = (obj, key) => {
  obj[key] = obj[key] ? obj[key] + 1 : 1;
};

const addCountState = (obj, state, number, key) => {
  if (!obj[state]) {
    obj[state] = {};
  }
  if (obj[state] && !obj[state][number]) {
    obj[state][number] = {};
  }
  obj[state][number][key] = obj[state][number][key]
    ? obj[state][number][key] + 1
    : 1;
};

const setCountByQuery = row => {
  const state = row[5];
  const year = parseInt(row[1], "10");
  const child_race = raceCase[row[7]] || row[7];
  const gender = row[6] == "true" ? "male" : "female";
  const weight_pounds = parseFloat(row[8], "10") || 0;

  if (year >= 1970 && year < 1980) {
    addCount(countState["70"], state);
    addCountState(countRace, state, "70", child_race);
  } else if (year >= 1980 && year < 1990) {
    addCount(countState["80"], state);
    addCountState(countRace, state, "80", child_race);
  } else if (year >= 1990 && year < 2000) {
    addCount(countState["90"], state);
    addCountState(countRace, state, "90", child_race);
  } else if (year >= 2000 && year < 2010) {
    addCount(countState["2000"], state);
    addCountState(countRace, state, "2000", child_race);
  }
  if (year >= 1970 && year < 2010) {
    addCount(countGender, gender);
    averageWeight.count = averageWeight.count + 1;
    averageWeight.totalWeightPound =
      averageWeight.totalWeightPound + weight_pounds;
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
  fs.writeFileSync(
    "./result.json",
    JSON.stringify({
      B70: countState["70"],
      B80: countState["80"],
      B90: countState["90"],
      B00: countState["2000"],
      Race70: countRace["70"],
      Race80: countRace["80"],
      Race90: countRace["90"],
      Race00: countRace["00"],
      Male: countGender["male"],
      Female: countGender["female"],
      Weight: averageWeight
    })
  );
})();
