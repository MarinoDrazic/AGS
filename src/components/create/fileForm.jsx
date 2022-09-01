import React, { useState, useEffect } from "react";

const FileForm = (props) => {
  const [fileData, setFileData] = useState(props.fileData);

  useEffect(() => {
    setFileData(props.fileData);
  }, [props.fileData]);

  const handleFileChange = (
    fileAllData,
    {
      file,
      checkSyntax,
      className,
      isStatic,
      constructor,
      properties,
      functions,
    }
  ) => {
    setFileData({
      ...fileAllData,
      ...(file && { file }),
      ...(checkSyntax && { checkSyntax }),
      ...(className && { className }),
      ...(isStatic && { isStatic }),
      ...(constructor && { constructor }),
      ...(properties && { properties }),
      ...(functions && { functions }),
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
      <div className=" rounded-t-lg border border-gray-300 p-8">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Class Name
        </label>
        <div className="flex flex-row gap-5 mb-4">
          <input
            type="text"
            id="text"
            placeholder="Postavke"
            className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={fileData.className}
            onChange={(e) => {
              handleFileChange(fileData, { className: e.target.value });
            }}
          />
          <div className="flex items-start mb-6 ">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
                checked={fileData.isStatic}
                onChange={(e) => {
                  handleFileChange(fileData, { isStatic: e.target.checked });
                }}
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Is Static
            </label>
            <div className="flex items-center h-5 ml-4">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
                checked={fileData.constructor}
                onChange={(e) => {
                  handleFileChange(fileData, { constructor: e.target.checked });
                }}
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Has Constructor
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-5 mb-4">
          <div className="flex-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Properties to Check
            </label>
            <div className="flex flex-row gap-5 mb-4">
              <input
                type="text"
                id="text"
                placeholder="Coins, Health, Level (Separated by commas)"
                className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={fileData.properties}
                onChange={(e) => {
                  handleFileChange(fileData, {
                    properties: e.target.value.split(","),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Functions to Check
            </label>
            <div className="flex flex-row gap-5">
              <input
                type="text"
                id="text"
                placeholder="Coins, Health, Level (Separated by commas)"
                className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={fileData.functions}
                onChange={(e) => {
                  handleFileChange(fileData, {
                    functions: e.target.value.split(","),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileForm;
