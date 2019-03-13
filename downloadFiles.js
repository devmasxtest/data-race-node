var download = require("download-file");

const urls = {};
for (let index = 0; index <= 68; index++) {
  let number = index < 10 ? `0${index}` : `${index}`;
  urls[
    index
  ] = `https://storage.googleapis.com/securitas/natalidad0000000000${number}.csv`;
  var options = {
    directory: "./data/natalidad",
    filename: `natalidad0000000000${number}.csv`
  };
  download(urls[index], options, function(err) {
    if (err) throw err;
    console.log("finish donwload", urls[index]);
  });
}
