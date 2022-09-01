import React, { useState, useEffect } from "react";
import LayoutSidebar from "../../components/layoutSidebar";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import TestListItem from "../../components/run/testListItem";
import axios from "axios";
import FlieListItem from "../../components/run/fileListItem";
function Run() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const files = await axios.get(window.location.origin + "/api/getFiles");
    setFiles(files.data.files);
  };

  const getTestsFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "tests"));
    setTests([]);
    querySnapshot.forEach((doc) => {
      setTests((tests) => [...tests, doc.data()]);
    });
  };

  useEffect(() => {
    getTestsFromFirebase();
    getFiles();
  }, []);

  const runTest = async () => {
    const { data } = await axios.post(window.location.origin + "/api/runtest", {
      ...selectedTest,
    });
    setTimeout(() => {
      const path = "mochawesome-report\\mochawesome.html";
      window.open(window.location.origin + "/" + path);
    }, 2000);
  };
  return (
    <LayoutSidebar>
      <div>
        <section>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none mt-16 ml-16 dark:text-white">
            Run Tests
          </h1>
        </section>
        <section className="max-w-screen-xl px-4 py-8 mx-auto text-center">
          <div className="flex flex-row gap-10">
            <div className="flex-1">
              <p className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none mt-16  dark:text-white">
                Tests
              </p>
              <div className="bg-gray-200 rounded-t-lg border-b border-gray-600">
                <ul className="mx-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {tests.map((test, index) => {
                    return (
                      <TestListItem
                        test={test}
                        index={index}
                        key={test.id}
                        setSelectedTest={setSelectedTest}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <p className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none mt-16  dark:text-white">
                Selected Test
              </p>
              <div className="bg-gray-200 rounded-t-lg border-b border-gray-600">
                <ul className="mx-3 text-sm font-medium  text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {selectedTest ? (
                    <TestListItem test={selectedTest} disabled />
                  ) : (
                    <div>
                      <h1 className="max-w-2xl mb-8 text-l  tracking-tight leading-none mt-8  dark:text-white">
                        Select a test...
                      </h1>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex-1">
              <p className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none mt-16  dark:text-white">
                Files Found
              </p>
              <div className="bg-gray-200 rounded-t-lg border-b border-gray-600 ">
                <ul className="mx-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {files.map((file, index) => {
                    return <FlieListItem file={file} key={index} />;
                  })}
                </ul>
              </div>
              <button
                onClick={() => {
                  getFiles();
                }}
                type="button"
                className="text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
              >
                Check again
              </button>
            </div>
          </div>
        </section>
        <div>
          <div className="flex space-x-2 justify-center">
            <div>
              <button
                onClick={() => {
                  runTest();
                }}
                type="button"
                className="inline-block px-6 pt-2.5 pb-2 bg-green-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="download"
                  className="w-3 mr-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                Run test
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutSidebar>
  );
}

export default Run;
