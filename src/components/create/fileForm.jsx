import React, { useState, useEffect } from "react";
import ClassForm from "./classForm";
import { uuid } from "uuidv4";

const FileForm = (props) => {
  const [fileData, setFileData] = useState(props.fileData);

  useEffect(() => {
    setFileData(props.fileData);
  }, [props.fileData]);

  useEffect(() => {
    props.testBuilder(fileData);
  }, [fileData]);

  const handleFileChange = (fileAllData, { file, checkSyntax, classes }) => {
    setFileData({
      ...fileAllData,
      ...(file && { file }),
      ...(checkSyntax && { checkSyntax }),
      ...(classes && { classes }),
    });
  };
  return (
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        File path
      </label>
      <div className="flex flex-row gap-5 mb-4">
        <input
          type="text"
          id="text"
          placeholder="jsKod/kod_00-staticka.js"
          className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={fileData.file}
          onChange={(e) => {
            handleFileChange(fileData, { file: e.target.value });
          }}
        />
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
              checked={fileData.checkSyntax}
              onChange={(e) => {
                handleFileChange(fileData, { checkSyntax: e.target.checked });
              }}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Check syntax
          </label>
        </div>
      </div>

      {fileData.classes &&
        fileData.classes.map((classData, index) => (
          <ClassForm
            key={index}
            classData={classData}
            handleFileChange={(classData) => {
              const allOtherClasses = fileData.classes.filter(
                (c) => c.id !== classData.id
              );
              handleFileChange(fileData, {
                classes: [...allOtherClasses, classData],
              });
            }}
          />
        ))}
      <div className=" rounded-lg border border-gray-300 bg-gray-200 p-6 flex justify-around">
        <div className="flex space-x-2 justify-center">
          <div>
            <button
              onClick={() => {
                const classes = [...fileData.classes];
                classes.push({
                  id: uuid(),
                  properties: [],
                  constructor: false,
                  className: "",
                  isStatic: false,
                  inherits: "",
                  functions: [{ name: "", overload: false }],
                });
                handleFileChange(fileData, { classes });
              }}
              type="button"
              className="inline-block flex align-center px-3 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-code mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
              </svg>
              Add Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileForm;
