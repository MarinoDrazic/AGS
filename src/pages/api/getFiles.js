let fs = require("fs");

let defaultSourcePath = "./targets";

export default function handler(req, res) {
  const targetFiles = fs
    .readdirSync(defaultSourcePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  res.status(200).json({ files: targetFiles });
}
