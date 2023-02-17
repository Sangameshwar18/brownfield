import { useEffect } from "react";
import { postUpdateFlightStatus } from "../../../api/FlightManagementService";
import "../../../styles/FlightData.css";

const FlightData = ({ flights, update, toggleFlightStatus }) => {
  return (
    <tbody>
      {flights.map((flight, index) => {
        return (
          <tr key={flight.flightId}>
            <td
              className={`px-5 py-5 w-28 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {flight.flightId}
              </p>
              {/* <p className="text-gray-400 txet-sm whitespace-no-wrap ">USD</p> */}
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {flight.source.code}
              </p>
              <p className="text-gray-400 txet-sm whitespace-no-wrap truncate w-56 ">
                {flight.source.name}
              </p>
              <p className="text-gray-400 txet-sm whitespace-no-wrap ">
                {flight.source.city}
              </p>
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {flight.departureTime}
              </p>
              {/* <p className="text-gray-400 txet-sm whitespace-no-wrap ">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {flight.destination.code}
              </p>
              <p className="text-gray-400 txet-sm whitespace-no-wrap truncate w-56">
                {flight.destination.name}
              </p>
              <p className="text-gray-400 txet-sm whitespace-no-wrap ">
                {flight.destination.city}
              </p>
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {flight.arrivalTime}
              </p>
              {/* <p className="text-gray-400 txet-sm whitespace-no-wrap ">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {Math.round(flight.distance)}
                {" KM"}
              </p>
              {/* <p className="text-gray-400 txet-sm whitespace-no-wrap "></p> */}
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              {/* <p className={`${flight.flightStatus ? "text-green-400" : "text-red-400"} text-extrabold whitespace-no-wrap `}></p> */}
              {/* <p className="text-gray-400 txet-sm whitespace-no-wrap "></p> */}
              <label class="flex items-center mb-2 relative w-8 cursor-pointer select-none">
                <input
                  onChange={() => toggleFlightStatus(flight.flightId)}
                  checked={flight.flightStatus}
                  value={flight.flightStatus}
                  type="checkbox"
                  className="appearance-none outline-none ring-gray-800 ring- ring-offset-gray-800 transition-colors cursor-pointer w-11 h-4 rounded-full focus:outline-none bg-red-500"
                />
                {/* <span class="absolute font-medium text-xs uppercase right-1 text-white"> OFF </span>
                                    <span class="absolute font-medium text-xs uppercase right-8 text-white"> ON </span> */}
                <span className="w-4 h-4 ring-1 ring-gray-500 absolute rounded-full transform transition-transform bg-gray-200" />
              </label>
              <span class="text-gray-400 txet-sm whitespace-no-wrap ">
                {flight.flightStatus ? "Active" : "Disabled"}
              </span>
              {/* <label className="relative items-center cursor-pointer">
                                    <input type="checkbox"
                                        onChange={() => toggleFlightStatus(flight.flightId)}
                                        checked={flight.flightStatus}
                                        value={flight.flightStatus} className="sr-only peer" />
                                    <div className={`w-8 h-4 ${flight.flightStatus ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
                                    <span className="text-sm font-medium -ml-1 text-gray-900 dark:text-gray-300">{flight.flightStatus ? "Active" : "Disabled"}</span>
                                </label> */}
              {/* <span
                                    className={`relative inline-block px-3 py-1 cursor-pointer hover:scale-110 transition duration-150 font-semibold ${!flight.flighStatus ? "text-green-900" : "text-red-900"} leading-tight`}
                                >
                                    <span
                                        aria-hidden
                                        className="inset-0 "
                                    ></span>
                                    <span className={`px-2 py-0.5 ${!flight.flighStatus ? "bg-green-400" : "bg-red-400"} rounded-xl transition duration-150 ease-out`}>{flight.flightStatus ? "Active" : "Disabled"}</span>
                                </span> */}
            </td>
            <td
              className={`px-5 py-5 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <span className="relative inline-block cursor-pointer font-semibold text-red-900 leading-tight hover:scale-110 transform transition duration-200">
                {/* <span
                                        aria-hidden
                                        className="inset-0 "
                                    ></span> */}
                <span
                  onClick={() =>
                    update(
                      flight.flightId,
                      flight.source.code,
                      flight.destination.code,
                      flight.departureTime,
                      flight.arrivalTime,
                      flight.flightStatus,
                      true
                    )
                  }
                  className="px-2 py-1 bg-red-200 hover:bg-red-500 hover:text-white transform transition duration-200 rounded-xl"
                >
                  Update
                </span>
              </span>
            </td>
          </tr>
        );
      })}

      {/* <tr>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">12</p>
                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">IXB</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap ">Indira Gandhi International Airport</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap ">Delhi</p>

                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">10:00:00</p>
                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">PUN</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap ">Pue International Airport</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap ">Pune</p>

                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">12:00:00</p>
                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">1820</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap ">KM</p>
                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">₹8894</p>
                    <p className="text-gray-400 txet-sm whitespace-no-wrap "></p>
                </td>
                <td className={`px-5 py-5 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <span
                        className="relative inline-block px-3 py-1 cursor-pointer hover:scale-110 transition duration-150 font-semibold text-red-900 leading-tight"
                    >
                        <span className="px-2 py-0.5 bg-red-200 rounded-xl transition duration-150 ease-out">Edit</span>
                    </span>
                </td>
            </tr> */}
    </tbody>
  );
};

export default FlightData;
