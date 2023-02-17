const BookingData = ({ bookings, view }) => {
  // console.log(bookings)

  return (
    <tbody>
      {bookings.map((booking, index) => {
        return (
          <tr key={booking.bookingId}>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {booking.bookingId}
              </p>
              {/* <p className="text-gray-400 text-sm whitespace-no-wrap ">USD</p> */}
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {new Date(booking.dateOfTravelling).toLocaleDateString(
                  "en-IN",
                  { year: "2-digit", month: "2-digit", day: "2-digit" }
                )}
              </p>
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {booking.flight.source.code}
              </p>
              <p className="text-gray-400 text-sm whitespace-no-wrap truncate w-56 ">
                {booking.flight.source.name}
              </p>
              <p className="text-gray-400 text-sm whitespace-no-wrap ">
                {booking.flight.source.city}
              </p>
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {booking.flight.departureTime}
              </p>
              {/* <p className="text-gray-400 text-sm whitespace-no-wrap ">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
            </td>
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {booking.flight.destination.code}
              </p>
              <p className="text-gray-400 text-sm whitespace-no-wrap truncate w-56">
                {booking.flight.destination.name}
              </p>
              <p className="text-gray-400 text-sm whitespace-no-wrap ">
                {booking.flight.destination.city}
              </p>
            </td>

            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <p className="text-gray-900 whitespace-no-wrap ">
                {booking.flight.arrivalTime}
              </p>
              {/* <p className="text-gray-400 text-sm whitespace-no-wrap ">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
            </td>
            {/* <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                                <p className="text-gray-900 whitespace-no-wrap ">{booking.destination.code}</p>
                                <p className="text-gray-400 text-sm whitespace-no-wrap ">{booking.destination.name}</p>
                                <p className="text-gray-400 text-sm whitespace-no-wrap ">{booking.destination.city}</p>

                            </td> */}
            {/* <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                            <p className="text-gray-400 text-sm whitespace-no-wrap ">$</p>
                                <p className="text-gray-900 whitespace-no-wrap ">{booking.fare}</p>
                            </td> */}
            {/* <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                                <p className="text-gray-900 whitespace-no-wrap ">₹8894</p>
                                <p className="text-gray-400 text-sm whitespace-no-wrap "></p>
                            </td> */}
            <td
              className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${
                index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <span className="relative inline-block cursor-pointer font-semibold text-red-900 leading-tight hover:scale-110 transform transition duration-200">
                {/* <span
                                        aria-hidden
                                        className="inset-0 "
                                    ></span> */}
                <span
                  onClick={() => view(booking.bookingId, true)}
                  className="px-2 py-1 bg-red-200 hover:bg-red-500 hover:text-white transform transition duration-200 rounded-xl"
                >
                  View
                </span>
              </span>
            </td>
          </tr>
        );
      })}

      {/* <tr>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">12</p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">IXB</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap ">Indira Gandhi International Airport</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap ">Delhi</p>

                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">10:00:00</p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">PUN</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap ">Pue International Airport</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap ">Pune</p>

                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">12:00:00</p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">1820</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap ">KM</p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
                    <p className="text-gray-900 whitespace-no-wrap ">₹8894</p>
                    <p className="text-gray-400 text-sm whitespace-no-wrap "></p>
                </td>
                <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm ${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}>
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

export default BookingData;
