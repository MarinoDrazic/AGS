let expect = require("chai").expect;
let assert = require("chai").assert;

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
  let testConfig;
  
  before(function () {
    return axios.get("http://localhost:3000/api/config").then((res) => {
      testConfig = res.data;
    });
  });

  files.forEach((file) => {
    describe(`AGS student folder: ${file} `, function () {
      describe("Zadatak1", function () {
        let zadatak1Dir = `${defaultSourcePath}/${file}/jsKod/kod_00-staticka.js`;

        it("testConfig should be defined", function () {
          expect(testConfig).to.not.be.undefined;
        });

        it(`should have kod_00-staticka.js folder`, function () {
          expect(fs.existsSync(zadatak1Dir)).to.equal(true);
        });

        it('it should contain class named "Postavke"', function () {
          let kod = fs.readFileSync(zadatak1Dir).toString();
          expect(kod).to.contain("class Postavke");
        });

        it('it should contain class named "Postavke" with constructor', function () {
          let kod = fs.readFileSync(zadatak1Dir).toString();
          expect(kod).to.contain("constructor");
        });

        it("class postavke should contain static properties", function () {
          let kod = fs.readFileSync(zadatak1Dir).toString();
          expect(kod).to.contain("static coins");
          expect(kod).to.contain("static spikes");
          expect(kod).to.contain("static dinosaur");
          expect(kod).to.contain("static cilj");
        });
      });
    });
  });
});
