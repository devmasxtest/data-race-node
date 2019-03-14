var download = require("download-file");
var _ = require("lodash");

const downloadAsync = (url, options) => {
  return new Promise((resolve, reject) => {
    download(url, options, function(err) {
      if (err) reject(err);
      console.log("finish donwload", url);
      resolve(url);
    });
  });
};

const promises = _.times(69).map(index => {
  const number = index < 10 ? `0${index}` : `${index}`;
  const url = `https://storage.googleapis.com/securitas/natalidad0000000000${number}.csv`;
  var options = {
    directory: "./data/natalidad",
    filename: `natalidad0000000000${number}.csv`
  };
  return downloadAsync(url, options);
});

Promise.all(promises).then(result => {
  console.log(`finish all`);
});
