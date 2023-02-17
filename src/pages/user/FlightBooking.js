import axios from "axios";
import React, { useEffect, useState } from "react";
import { getFlightByID } from "../../api/FlightManagementService";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooking,
  getFlightById,
  getLoggedUser,
} from "../../redux/user/userActions";
import { useNavigate } from "react-router-dom";
import { userFlightBooking } from "../../redux/user/userActions";
import FlightDetails from "./FlightDetails";
import PassengerDetails from "./PassengerDetails";
import ContactDetails from "./ContactDetails";
import AllFareDetails from "./AllFareDetails";
import PrintPassengers from "./PrintPassengers";
import { getUser } from "../../api/UserDetailsService";
import Seats from "../user/Seats";
import { toast } from "react-toastify";

const FlightBooking = (res) => {
  const [passengers, setPassengers] = useState({
    firstName: "",
    lastName: "",
    gender: "",
  });
  const [totalFare, setTotalFare] = useState();
  const [travelCharges, setTravelCharges] = useState();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.user.flight);
  const [user, setUser] = useState(useSelector((state) => state.user.logged));

  const navigate = useNavigate();
  console.log(res.FlightBooking.data.dateOfTravelling);

  console.log(res);
  const [flightData, setFlightData] = useState({});
  const [passengerArray, setPassengerArray] = useState([]);
  const [tmp, setTmp] = useState(false);
  const numberOfPassenger = res.FlightBooking.numberOfPassenger;
  // const numberOfPassenger = 5
  const [count, setCount] = useState(1);
  const passengerHandler = (e) => {
    // e.preventDefault()
    setPassengers((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.replace(/[^a-z]/gi, ""),
      // event.target.value.replace(/[^a-z]/gi, '');
    }));
    console.log(passengers);
  };

  const addPassenger = (e) => {
    e.preventDefault();
    console.log(passengers.firstName);
    if (
      passengers.firstName != "" &&
      passengers.lastName != "" &&
      passengers.gender != ""
    ) {
      if (count <= numberOfPassenger) {
        setPassengerArray((old) => [...old, passengers]);
        if (count < numberOfPassenger) setCount(count + 1);

        setPassengers({
          firstName: "",
          lastName: "",
          gender: "",
          seatNo: "",
        });

        var ele = document.querySelectorAll("input[type=radio]");
        for (var i = 0; i < ele.length; i++) {
          ele[i].checked = false;
        }
      }
    } else {
      toast.error("Enter Details!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setTmp(true);
    console.log(
      "GENERATE COUNT",
      passengerArray.length,
      numberOfPassenger,
      count
    );
  };
  const [email, setEmail] = useState(user.emailId);
  const [mobileNo, setMobileNo] = useState(user.contactNumber);
  const data = {
    flightId: flightData.flightId,
    email: email,
    mobileNo: mobileNo,
    // dateOfTravelling: "2023-02-09",
    dateOfTravelling: res.FlightBooking.data.dateOfTravelling,
    passengerInfo: passengerArray,

    fare: {
      travelCharges: travelCharges,
      seatReserveCharges: 250,
      ancillaryCharges: 100,
      taxes: 0,
      totalFare: totalFare,
    },
  };

  const contactData = (e) => {
    e.preventDefault();
    console.log(data);
    if (data.mobileNo && data.email) {
      dispatch(userFlightBooking(data));
      // setTmp(data);
      navigate("/seats");
    } else {
      toast.error("Enter Details!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  console.log(data);
  const passenger = (e) => {
    e.preventDefault();
    console.log("qwertyuiop");
    console.log(data);
  };

  console.log(passengerArray);

  useEffect(() => {
    // const charge = () => {
    setTravelCharges(res.FlightBooking.fare * numberOfPassenger);
    setTotalFare(data.fare.seatReserveCharges + data.fare.ancillaryCharges);
    // console.log("akjdnk")
    // }

    getFlightByID(res.FlightBooking.id)
      .then((res) => {
        setFlightData(res.data);
        console.log(res.data);
        dispatch(getFlightById(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getMobileNo = (mob) => {
    setMobileNo(mob).replace(/[^a-z]/gi, "");
    console.log(mob);
  };

  const getEmail = (email) => {
    setEmail(email);
    console.log(email);
  };

  console.log(data);
  return (
    <>
      <div className="grid sm:grid-cols-11 gap-8 p-2">
        <div className="sm:col-span-8 grid grid-rows-1 gap-2">
          <FlightDetails res={res} />
          <PassengerDetails
            res={res}
            addPassenger={addPassenger}
            passengers={passengers}
            count={count}
            passengerHandler={passengerHandler}
            passengerArray={passengerArray}
            numberOfPassenger={numberOfPassenger}
          />
          <ContactDetails
            contactData={contactData}
            getMobileNo={getMobileNo}
            getEmail={getEmail}
            email={email}
            mobileNo={mobileNo}
          />
        </div>
        <div className="sm:col-span-3">
          <AllFareDetails
            numberOfPassenger={numberOfPassenger}
            res={res}
            data={data}
            totalFare={totalFare}
            travelCharges={travelCharges}
          />
          <PrintPassengers
            passengerArray={passengerArray}
            contactData={contactData}
            count={count}
          />
        </div>
      </div>
    </>
  );
};

export default FlightBooking;
