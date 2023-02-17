import Icon from "../adminComponents/Icon";

import IconButton from "../adminComponents/IconButton";

import NameCard from "../adminComponents/NameCard";

import Graph from "../adminComponents/Graph";

import FlightIcon from "@mui/icons-material/Flight";

import DashboardIcon from "@mui/icons-material/Dashboard";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";

import AdminHeader from "../adminComponents/AdminHeader";

import BookingTable from "../bookingManagement/BookingTable";

import { GetAllBookings } from "../../../redux/admin/adminActions";

import { useEffect, useState } from "react";

import {
  getAllBookings,
  getBookingsByID,
  getBookingsByDate,
  getAllUsers,
  getByAdminSearch,
} from "../../../api/BookingManagementService";
import { getAllAiriports } from "../../../api/FlightManagementService";

import { useDispatch, useSelector } from "react-redux";

const BookingManagement = ({ noOfUser }) => {
  const [tasksCompleted, setTasksCompleted] = useState();

  const [airPorts, setAirPorts] = useState(
    useSelector((state) => state.admin.airports)
  );

  const [bookings, setBookings] = useState([]);

  const [users, setUsers] = useState([]);

  const [clear, setClear] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllBookings().then((res) => {
      if (res.status === 200) {
        setBookings(
          res.data.sort(
            (
              { dateOfTravelling: a, flight: { departureTime: b } },
              { dateOfTravelling: c, flight: { departureTime: d } }
            ) =>
              new Date(`${c} ${d}`).getTime() - new Date(`${a} ${b}`).getTime()
          )
        );
        // console.log('inside get all users', res.data)
        dispatch(
          GetAllBookings(
            res.data.sort(
              (
                { dateOfTravelling: a, flight: { departureTime: b } },
                { dateOfTravelling: c, flight: { departureTime: d } }
              ) =>
                new Date(`${c} ${d}`).getTime() -
                new Date(`${a} ${b}`).getTime()
            )
          )
        );
        setTasksCompleted(res.data.length);
      } else {
        console.log("could not get data");
      }
    });

    // console.log("CAlled")
  }, []);

  // useEffect(() => {
  //   // adminSearch()

  //   getAllAiriports().then((res) => {
  //     setAirPorts(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getAllUsers().then((res) => {
  //     setUsers(res.data);
  //   });
  // }, []);

  const adminSearch = (obj) => {
    // console.log('inside adminSearch', obj)
    getByAdminSearch(obj).then((res) => {
      // console.log('this is the resp from booking', res.data)
      setBookings(
        res.data.sort(
          (
            { dateOfTravelling: a, flight: { departureTime: b } },
            { dateOfTravelling: c, flight: { departureTime: d } }
          ) => new Date(`${c} ${d}`).getTime() - new Date(`${a} ${b}`).getTime()
        )
      );
    });
  };

  // const insertFlightData = (obj) => {
  //   // e.preventDefault()

  //   postFlightData(obj).then((res) => {
  //     setAdd(false);
  //   });
  // };

  const employeeData = [
    {
      id: 1,

      name: "Bookings",

      position: "Total Users",

      transactions: tasksCompleted,

      rise: true,

      tasksCompleted: noOfUser.length,

      imgId: <FlightIcon />,
    },
  ];

  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>

      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <AdminHeader />

        {employeeData.map(
          ({
            id,

            name,

            position,

            transactions,

            rise,

            tasksCompleted,

            imgId,
          }) => (
            <NameCard
              key={id}
              id={id}
              name={name}
              position={position}
              transactionAmount={transactions}
              rise={rise}
              tasksCompleted={tasksCompleted}
              imgId={imgId}
            />
          )
        )}

        {/* <div className="mt-2">
          <div
            onClick={() => setAdd(!add)}
            className="button w-40 h-16 bg-gray-900 rounded-lg cursor-pointer select-none

    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1f2937,0_0px_0_0_#6b7280]

    active:border-b-[0px]

    transition-all duration-100 [box-shadow:0_10px_0_0_#1f2937,0_15px_0_0_#6b7280]

    border-b-[1px] border-gray-400

  "
          >
            <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
              {!add ? "Add Flights" : "View All Flights"}
            </span>
          </div>
        </div> */}

        <div className="p-2 w-screen justify-center align-center">
          <BookingTable
            clear={() => setClear(!clear)}
            searchBooking={adminSearch}
            users={users}
            bookings={bookings}
            airPorts={airPorts}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
