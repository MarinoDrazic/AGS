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

          testParam.classes.forEach((classData) => {
            it(`it should contain class named ${classData.className}`, function () {
              let kod = fs.readFileSync(workDirectory).toString();
              expect(kod).to.contain(`class ${classData.className}`);
            });

            if (classData.constructor) {
              it(`class ${classData.className} should contain constructor `, function () {
                let kod = fs.readFileSync(workDirectory).toString();
                expect(kod).to.contain(`constructor`);
              });
            }

            if (classData.inherits && classData.inherits.length > 0) {
              it(`class ${classData.className} should extend class ${classData.inherits} `, function () {
                let kod = fs.readFileSync(workDirectory).toString();
                expect(kod).to.contain(
                  `class ${classData.className} extends ${classData.inherits}`
                );
              });
            }

            if (classData.properties) {
              it(`class ${classData.className} should contain static properties`, function () {
                let kod = fs.readFileSync(workDirectory).toString();
                classData.properties.forEach((property) => {
                  expect(kod).to.contain(
                    `${classData.isStatic ? "static" : ""} ${property}`
                  );
                });
              });
            }

            if (classData.functions) {
              it(`class ${classData.className} should contain ${
                classData.isStatic ? "static" : ""
              } function`, function () {
                let kod = fs.readFileSync(workDirectory).toString();
                classData.functions.forEach((functionData) => {
                  if (functionData.overload) {
                    let regex = new RegExp(`static ${functionData.name}`, "g");
                    const count = (kod.match(regex) || []).length;
                    expect(count).to.be.at.least(2);
                  } else {
                    expect(kod, `class ${classData.className}`).to.contain(
                      `${classData.isStatic ? "static" : ""} ${
                        functionData.name
                      }`
                    );
                  }
                });
              });
            }
          });
        });
      });
    });
  });
});
