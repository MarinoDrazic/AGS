const { exec } = require("node:child_process");

export default function handler(req, res) {
  exec(
    "npx mocha tests/ags.spec.js --reporter mochawesome --reporter-options reportDir=public/mochawesome-report"
  );
  res.status(200).json("test ran successfully");
}
