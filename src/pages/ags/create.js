import React, { useState, useEffect } from "react";
import LayoutSidebar from "../../components/layoutSidebar";
import { db } from "../../config/firebase";
import TestListItem from "../../components/run/testListItem";
import FileForm from "../../components/create/fileForm";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { uuid } from "uuidv4";

function Create() {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testChanges, setTestChanges] = useState({
    name: "",
    description: "",
    testParams: [
      {
        id: uuid(),

        file: "",
        checkSyntax: false,
        classes: [
          {
            id: uuid(),
            properties: [],
            constructor: false,
            className: "",
            isStatic: false,
            inherits: "",
            functions: [{ name: "", overload: false }],
          },
        ],
      },
    ],
  });

  const getTestsFromFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "tests"));
    setTests([]);
    querySnapshot.forEach((documnet) => {
      setTests((tests) => [...tests, { id: documnet.id, ...documnet.data() }]);
    });
  };

  useEffect(() => {
    getTestsFromFirebase();
  }, []);

  useEffect(() => {
    if (selectedTest) {
      setTestChanges(selectedTest);
    }
  }, [selectedTest]);

  const testBuilder = (test, { name, description, testParams }) => {
    const testObj = {
      ...test,
      ...(name && { name }),
      ...(description && { description }),
      ...(testParams && { testParams }),
    };
    setTestChanges(testObj);
  };

  const propagateChangesFromFileForm = (testParam) => {
    const otherTestParams = testChanges?.testParams?.filter(
      (tp) => tp.id !== testParam.id
    );
    testBuilder(testChanges, {
      testParams: [...otherTestParams, testParam],
    });
  };

  const commitChanges = async () => {
    if (selectedTest) {
      const ref = doc(db, "tests", selectedTest.id);
      await updateDoc(ref, { ...testChanges });
    } else {
      const cityRef = doc(collection(db, "tests"));
      await setDoc(cityRef, testChanges);
    }
    getTestsFromFirebase();
    setSelectedTest(null);
    setTestChanges({
      name: "",
      description: "",
      testParams: [
        {
          id: uuid(),

          file: "",
          checkSyntax: false,
          classes: [
            {
              id: uuid(),

              properties: [],
              constructor: false,
              className: "",
              isStatic: false,
              inherits: "",
              functions: [{ name: "", overload: false }],
            },
          ],
        },
      ],
    });
  };

  return (
    <LayoutSidebar>
      <div>
        <section>
          <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none mt-16 ml-16 dark:text-white">
            Create Tests
          </h1>
        </section>
        <section>
          <div className="flex flex-row gap-10 mx-16 my-16">
            <div className="flex-initial w-64">
              <div className="bg-gray-200 rounded-t-lg border-b border-gray-600 h-full">
                <ul className="mx-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="py-2 px-4 w-full border-b justify-center border-gray-200 dark:border-gray-600 flex flex-row items-center rounded-t-lg">
                    <div className="flex space-x-2 justify-center my-4 align-center">
                      <button
                        onClick={() =>
                          setSelectedTest({
                            name: "",
                            description: "",
                            testParams: [
                              {
                                id: uuid(),

                                file: "",
                                checkSyntax: false,
                                classes: [
                                  {
                                    id: uuid(),
                                    properties: [],
                                    constructor: false,
                                    className: "",
                                    isStatic: false,
                                    inherits: "",
                                    functions: [{ name: "", overload: false }],
                                  },
                                ],
                              },
                            ],
                          })
                        }
                        type="button"
                        className="inline-block flex align-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-file-earmark-plus mr-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                        </svg>
                        Add Test
                      </button>
                    </div>
                  </li>

                  {tests.map((test, index) => {
                    return (
                      <TestListItem
                        test={test}
                        index={index}
                        key={test.id}
                        setSelectedTest={setSelectedTest}
                        edit
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex-1 ">
              <div className=" rounded-t-lg border border-gray-300 p-16">
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Test Name
                    </label>
                    <input
                      type="text"
                      id="text"
                      className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Vjezba 1"
                      required
                      onChange={(e) => {
                        testBuilder(testChanges, { name: e.target.value });
                      }}
                      value={testChanges.name}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Test desctiption
                    </label>
                    <input
                      type="text"
                      id="text"
                      placeholder="Vjezba 1 iz OOP"
                      className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {
                        testBuilder(testChanges, {
                          description: e.target.value,
                        });
                      }}
                      value={testChanges.description}
                    />
                  </div>
                  <div className=" rounded-t-lg border border-gray-300 p-8">
                    {testChanges?.testParams?.map((param, index) => {
                      return (
                        <FileForm
                          key={index}
                          fileData={param}
                          testBuilder={(testParam) =>
                            propagateChangesFromFileForm(testParam)
                          }
                        />
                      );
                    })}
                    <div className=" rounded-lg border border-gray-300 bg-gray-200 p-8 flex justify-around">
                      <div className="flex space-x-2 justify-center">
                        <div>
                          <button
                            onClick={() => {
                              testBuilder(testChanges, {
                                testParams: [
                                  ...testChanges.testParams,
                                  {
                                    id: uuid(),

                                    file: "",
                                    checkSyntax: false,
                                    classes: [
                                      {
                                        id: uuid(),
                                        properties: [],
                                        constructor: false,
                                        className: "",
                                        isStatic: false,
                                        inherits: "",
                                        functions: [
                                          { name: "", overload: false },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              });
                            }}
                            type="button"
                            className="inline-block flex align-center px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-file-earmark-plus mr-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                            </svg>
                            Add file
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex space-x-2 justify-center mt-8">
                  <div>
                    <button
                      onClick={() => {
                        commitChanges();
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
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutSidebar>
  );
}

export default Create;
