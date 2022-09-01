const { exec } = require("node:child_process");
const fs = require("fs");

export default function handler(req, res) {
  fs.writeFileSync("./tests/testconfig.json", JSON.stringify(req.body));

  exec(
    "npx mocha tests/ags.spec.js --reporter mochawesome --reporter-options reportDir=public/mochawesome-report"
  );
  res.status(200).json("test ran successfully");
}
