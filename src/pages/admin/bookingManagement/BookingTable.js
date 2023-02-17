import { useEffect, useState } from "react";
import BookingData from "./BookingData";
import SearchByText from "../flightManagement/SearchByText";
import SearchByTime from "../flightManagement/SearchByTime";
import SearchIcon from "@mui/icons-material/Search";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AllAirports from "../flightManagement/AllAirports";
import ViewBooking from "./ViewBooking";

const BookingTable = ({ bookings, searchBooking, airPorts }) => {
  const [view, setView] = useState({
    bookingId: "",
    state: false,
  });

  const [input, setInput] = useState({
    bookingId: "",
    time: "",
    sourceCode: "",
    destinationCode: "",
    date: "",
  });

  useEffect(() => {}, [input, view]);

  const menuItems = [
    {
      value: "Morning",
      code: "Morning",
    },
    {
      value: "Afternoon",
      code: "Afternoon",
    },
    {
      value: "Night",
      code: "Night",
    },
  ];

  const handleOnChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    searchBooking(input);
  };

  const viewBooking = (id, state) => {
    // console.log(id)
    setView({
      bookingId: id,
      state: state,
    });
  };

  const goBack = () => {
    setView({
      state: false,
    });
  };

  return (
    <div className="p-2 mt-6">
      {view.state ? (
        <ViewBooking view={view} viewBooking={viewBooking} goBack={goBack} />
      ) : (
        <div className="">
          <div className="flex flex-wrap justify-start gap-2">
            <div className="flex flex-wrap gap-2">
              <SearchByText
                name="bookingId"
                value={input.bookingId}
                onChange={handleOnChange}
                gap="pl-4"
                // icon={
                //   <SearchIcon className="w-5 h-5 search-icon left-3 absolute" />
                // }
                placeholderText="B-BF-"
              />
              <SearchByTime
                name="time"
                value={input.time}
                onChange={handleOnChange}
                menuItems={menuItems}
                placeholder="Select Time..."
              />
              <div className="rounded-md shadow-sm">
                <input
                  id="date"
                  // placeholder="Input time..."
                  style={{ colorScheme: "dark", color: "#71717a" }}
                  name="date"
                  type="date"
                  required
                  value={input.date}
                  className="appearance-none pl-3 placeholder-zinc-900 block w-36 py-2 pr-2 border border-gray-300 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-gray-200 placeholder-zinc-500 font-bold block focus:outline-none rounded-md bg-gray-900"
                  onChange={handleOnChange}
                />
              </div>
              {/* <div className="rounded-md shadow-sm">

<input id="dob" name="date" type="date" required className="py-2 pr-2 text-gray-200 placeholder-zinc-500 font-bold block focus:outline-none w-full rounded-md bg-gray-900" onChange={handleOnChange} />


</div> */}
            </div>
            <div className="flex flex-wrap gap-1">
              <AllAirports
                name="sourceCode"
                value={input.sourceCode}
                gap="inline-flex px-2 py-2 pr-2 block focus:outline-none w-48 rounded-md text-zinc-500 font-bold bg-gray-900"
                onChange={handleOnChange}
                menuItems={airPorts}
                placeholder="Source Code..."
              />
              <SwapHorizIcon className="mt-2 sm:max-md:mt-4 md:max-lg:mt-2 lg:max-xl:mt-2 xl:max-2xl:mt-2 2xl:mt-2" />
              <AllAirports
                name="destinationCode"
                value={input.destinationCode}
                gap="inline-flex px-2 py-2 pr-2 block focus:outline-none w-48 rounded-md text-zinc-500 font-bold bg-gray-900"
                onChange={handleOnChange}
                menuItems={airPorts}
                placeholder="Destination Code..."
              />
              {/* <SearchIcon className="hover:scale-110 w-4 h-4 search-icon mt-9 sm:max-md:mt-8 md:max-lg:mt-5 lg:max-xl:mt-5 xl:max-2xl:mt-5 2xl:mt-5" /> */}
            </div>
            <div className="flex flex-nowrap gap-1">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="text-md
                  border-2 border-gray-100 py-2 px-4
                  transition-colors ease-out
                  duration-500 text-white
                  bg-blue-900
                  bg-gradient-to-r
                  from-blue-900 
                  rounded-lg
                  hover:from-gray-900 hover:to-gray-900 
                  hover:text-white hover:border-gray-900 "
                >
                  Search
                </button>
              </span>
            </div>
            <div className="flex flex-nowrap gap-1">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  onClick={() => {
                    setInput({
                      bookingId: "",
                      date: "",
                      time: "",
                      sourceCode: "",
                      destinationCode: "",
                    });
                  }}
                  // type="submit"
                  className="text-md
                  border-2 border-gray-100 py-2 px-4
                  transition-colors ease-out
                  duration-500 text-white
                  bg-blue-900
                  bg-gradient-to-r
                  from-blue-900 
                  rounded-lg
                  hover:from-gray-900 hover:to-gray-900 
                  hover:text-white hover:border-gray-900"
                >
                  Clear
                </button>
              </span>
            </div>
          </div>
          <div className="py-4 overflow-auto">
            <div className="container mx-auto shadow-md rounded-lg overflow-auto">
              <table className="w-full">
                <thead className="w-full">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Travelling date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Departure
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      Arrival
                    </th>
                    {/* <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider"
                                    >
                                        Fare
                                    </th> */}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-900 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                      View
                    </th>
                  </tr>
                </thead>
                <BookingData view={viewBooking} bookings={bookings} />
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
