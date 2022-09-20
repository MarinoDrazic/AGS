import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";

const ClassForm = (props) => {
  const [classData, setClassData] = useState(props.classData);

  useEffect(() => {
    setClassData(props.classData);
  }, [props.classData]);

  useEffect(() => {
    props.handleFileChange(classData);
  }, [classData]);

  const handleClassChange = (
    classAllData,
    { className, isStatic, hasConstructor, inherits, properties, functions }
  ) => {
    setClassData({
      ...classAllData,
      ...(className && { className }),
      ...(isStatic && { isStatic }),
      ...(inherits && { inherits }),
      ...(hasConstructor && { constructor: hasConstructor }),
      ...(properties && { properties }),
      ...(functions && { functions }),
    });
  };

  const handleFunctionChange = (id, { name, overload }) => {
    const functions = [...classData.functions];
    const functionToChange = functions.find((f) => f.id === id);
    functionToChange.overload = overload;
    functionToChange.name = name;
    handleClassChange(classData, { functions });
  };

  return (
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
          value={classData.className}
          onChange={(e) => {
            handleClassChange(classData, { className: e.target.value });
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
              checked={classData.isStatic}
              onChange={(e) => {
                handleClassChange(classData, { isStatic: e.target.checked });
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
              checked={classData.constructor}
              onChange={(e) => {
                console.log("Thisbitch", e.target.checked);
                handleClassChange(classData, { constructor: e.target.checked });
              }}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Has Constructor
          </label>
          <div className="flex items-center h-5  ml-4">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
              checked={classData.isStatic}
              onChange={(e) => {
                handleClassChange(classData, { isStatic: e.target.checked });
              }}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Inherits
          </label>
        </div>
      </div>
      {classData.inherits && (
        <>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Inherits from class named:
          </label>
          <div className="flex flex-row gap-5 mb-4">
            <input
              type="text"
              id="text"
              placeholder="Postavke"
              className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={classData.inherits}
              onChange={(e) => {
                handleClassChange(classData, { inherits: e.target.value });
              }}
            />
          </div>
        </>
      )}
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
            value={classData.properties}
            onChange={(e) => {
              handleClassChange(classData, {
                properties: e.target.value.split(","),
              });
            }}
          />
        </div>
      </div>
      {classData.functions.map((funct) => {
        return (
          <div className="flex-1" key={funct.name}>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Function to Check
            </label>
            <div className="flex flex-row gap-5">
              <input
                type="text"
                id="text"
                placeholder="setHealth, getHealth, setCoins..."
                className="bg-gray-50 border max-w-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={funct.name}
                onChange={(e) => {
                  handleFunctionChange(funct.id, {
                    name: e.target.value,
                    overload: funct.overload,
                  });
                }}
              />
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
                checked={funct.overload}
                onChange={(e) => {
                  console.log("Thisbitch", e.checked, e);
                  handleFunctionChange(funct.id, {
                    name: funct.name,
                    overload: e.target.checked,
                  });
                }}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Overloaded
              </label>
            </div>
          </div>
        );
      })}
      <div className="flex-1 w-1/2 mt-3">
        <div className=" rounded-lg border border-gray-300 bg-gray-200 p-2 flex justify-around">
          <div className="flex space-x-2 justify-center">
            <div>
              <button
                onClick={() => {
                  handleClassChange(classData, {
                    functions: [
                      ...classData.functions,
                      { name: "", overload: false, id: uuid() },
                    ],
                  });
                }}
                type="button"
                className="inline-block flex align-center px-3 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                Add Function
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassForm.propTypes = {};

export default ClassForm;
