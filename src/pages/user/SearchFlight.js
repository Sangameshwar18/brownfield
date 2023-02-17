import React from "react";

const SearchFlight = ({ airport, placeholder, name, onChange, value }) => {
  // console.log(airport)
  return (
    <div className="relative inline-block xl:mt-0 md:mt-0 lg:mt-0 sxl:mt-0 text-left text-gray-900 bg-gray-200 rounded-md  ">
      <select
        value={value}
        onChange={onChange}
        name={name}
        defaultValue=""
        placeholder="Select time"
        className="inline-flex px-2 w-48 py-2 pr-2 block focus:outline-none w-64 rounded-md text-gray-900 font-bold bg-gray-200"
        id="grid-state"
      >
        {/* <option value={value}></option> */}
        {airport.map((item) => {
          return (
            <option
              defaultValue={value}
              value={item.code}
              key={item.code}
              className="cursor-pointer rounded-lg text-gray-900 font-semibold block px-4 py-2 text-md"
            >
              {item.city}
              {", "}
              {item.state}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchFlight;
