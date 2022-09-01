let expect = require("chai").expect;
let assert = require("chai").assert;
const vm = require("vm");
const testConfigData = require("./testconfig.json");

const { default: axios } = require("axios");
let fs = require("fs");

let defaultSourcePath = "./targets";

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

describe("AGS Vj7", function () {
  let files = getDirectories(defaultSourcePath);

  describe(`Running test ${testConfigData.name}`, function () {
    files.forEach((file) => {
      describe(`AGS student folder: ${file} `, function () {
        testConfigData.testParams.forEach((testParam) => {
          let workDirectory = `${defaultSourcePath}/${file}/${testParam.file}`;

          it(`should have ${testParam.file} file`, function () {
            expect(fs.existsSync(workDirectory)).to.equal(true);
          });

          if (testParam.checkSyntax) {
            it("check file for syntax errors", function () {
              let code = fs.readFileSync(workDirectory, "utf8");
              let script = new vm.Script(code);
              expect(script.runInNewContext()).to.not.throw;
            });
          }

          it(`it should contain class named ${testParam.className}`, function () {
            let kod = fs.readFileSync(workDirectory).toString();
            expect(kod).to.contain(`class ${testParam.className}`);
          });

          if (testParam.constructor) {
            it(`class ${testParam.className} should contain constructor `, function () {
              let kod = fs.readFileSync(workDirectory).toString();
              expect(kod).to.contain(`constructor`);
            });
          }

          if (testParam.properties) {
            it(`class ${testParam.className} should contain static properties`, function () {
              let kod = fs.readFileSync(workDirectory).toString();
              testParam.properties.forEach((property) => {
                expect(kod).to.contain(
                  `${testParam.isStatic ? "static" : ""} ${property}`
                );
              });
            });
          }

          if (testParam.functions) {
            it(`class ${testParam.className} should contain static functions`, function () {
              let kod = fs.readFileSync(workDirectory).toString();
              testParam.functions.forEach((functions) => {
                expect(kod).to.contain(
                  `${testParam.isStatic ? "static" : ""} ${functions}`
                );
              });
            });
          }
        });
      });
    });
  });
});
