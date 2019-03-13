const fs = require("fs");
const raceCase = require("./race.json");
// fs.readFile("./natalidad000000000000.csv", "utf8", (err, data) => {
//   result.push(data);
//   console.log(data);
// });

// count by state
const countState = {
  "70": {},
  "80": {},
  "90": {},
  "2000": {}
};

// count by child_race
const countRace = {
  "70": {},
  "80": {},
  "90": {},
  "2000": {}
};

const addCount = (obj, key) => {
  obj[key] = obj[key] ? obj[key] + 1 : 1;
};

const setCountByQueryState = row => {
  const state = row[5];
  const year = parseInt(row[1], "10");
  const child_race = raceCase[row[7]] || row[7];

  if (year >= 1970 && year < 1980) {
    addCount(countState["70"], state);
    addCount(countRace["70"], child_race);
  } else if (year >= 1980 && year < 1990) {
    addCount(countState["80"], state);
    addCount(countRace["80"], child_race);
  } else if (year >= 1990 && year < 2000) {
    addCount(countState["90"], state);
    addCount(countRace["90"], child_race);
  } else if (year >= 2000 && year < 2010) {
    addCount(countState["2000"], state);
    addCount(countRace["2000"], child_race);
  }
};

async function readSpeed(file) {
  return new Promise(resolve => {
    let result;
    const stream = fs.createReadStream(file, { encoding: "utf8" });
    stream.on("data", data => {
      result = data.split(/\n/);
      result.forEach(line => {
        const row = line.split(",");
        setCountByQueryState(row);
      });
      stream.destroy();
    });
    stream.on("close", () => {
      resolve(result);
    });
  });
}

(async () => {
  const label = `readSpeed`;
  console.time(label);
  const files = fs.readdirSync("./data/natalidad");
  await Promise.all(files.map(name => readSpeed(`./data/natalidad/${name}`)));
  // const result = await readSpeed("./natalidad000000000000.csv");
  console.timeEnd(label);
  console.log(countRace);
})();
