import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import changeIcon from "../../elements/exchangeWhite.png";
import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import Cards from "./Cards";
import { useDispatch } from "react-redux";
import { getAllAirport, getLoggedUser } from "../../redux/user/userActions";
import Navbar from "./Navbar";
import Cover from "./Cover";
import ImageCards from "./ImageCards";
import SectionOne from "./SectionOne";
import "../../styles/Home.css";
import axios from "axios";
import SearchResult from "./SearchResult";
import {
  getAllAiriports,
  getFlightBySearch,
} from "../../api/FlightManagementService";
import plane from "../../elements/plane.png";
import { getUser } from "../../api/UserDetailsService";
import { toast } from "react-toastify";

const Home = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchBarOn, setSearchBarOn] = useState(false);
  const [selectedFromCity, setSelectedFromCity] = useState("DEL");
  const [selectedToCity, setSelectedToCity] = useState("PNQ");
  const [searchByWay, setSearchByWay] = useState({
    value: "",
  });

  const dispatch = useDispatch();
  const [searchDetails, setSearchDetails] = useState([]);
  const [flightData, setFlightData] = useState([]);

  var today = new Date().toISOString().split("T")[0];
  // console.log(today)

  const Airports = () => {};

  const [filterData, setFilterdata] = useState([]);

  const [data, setData] = useState({
    source: selectedFromCity,
    destination: selectedToCity,
    dateOfTravelling: today,
    noOfPassenger: 1,
    dateOfReturn: "",
    way: "ONEWAY",
  });

  const noOfPassengerArray = [1, 2, 3, 4, 5];

  // console.log(data.wa)

  // console.log(data)

  useEffect(() => {
    getUser(localStorage.getItem("USER_KEY"))
      .then((res) => {
        console.log(res.data);
        // setUser(res.data);
        dispatch(getLoggedUser(res.data));
      })
      .catch((err) => {
        console.log("ff", err);
      });
  }, []);

  const dataHandler = (e) => {
    // console.log(e.target[0].value)
    // e.preventDefault()
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // console.log((data))
  };

  useEffect(() => {
    getAllAiriports()
      .then((res) => {
        // console.log(res)
        setFlightData(res.data);
        dispatch(getAllAirport(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    // console.log(data)
    if (selectedFromCity === selectedToCity)
      toast.error("Source and Destination Cannot be same", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    else {
      if (data.way === "ROUND TRIP" && data.dateOfReturn === "") {
        alert("Input return date");
      } else {
        // axios;
        getFlightBySearch(data)
          .then((res) => {
            // console.log(data)
            // console.log(res.data)
            {
              <SearchResult props={res.data} />;
            }
            setFilterdata(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        props.SetSearchDetails(data);
        navigate("/flights");
      }
    }
  };
  const handleFromCitySelect = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setSelectedFromCity(e.target.value);
    // setData({
    //   source: selectedFromCity
    // })
  };
  // console.log(selectedFromCity);
  const handleToCitySelect = (e) => {
    e.preventDefault();

    setSelectedToCity(e.target.value);
    // setData({
    //   destination: selectedToCity
    // })
  };

  const switchCity = (e) => {
    e.preventDefault();

    setSelectedToCity(selectedFromCity);
    setSelectedFromCity(selectedToCity);
  };

  // console.log(selectedFromCity);
  // console.log(selectedToCity);

  const searchBarOpen = () => {
    setSearchBarOn(true);
  };

  const returnHandler = (e) => {
    e.preventDefault(e);

    // console.log('khdksdlsmdl')
    // console.log(document.getElementsByName('way')[1])
    // console.log()
    // document.querySelector('input[name="way"]:checked').value = "ROUND TRIP"
    // console.log(document.querySelector('input[name="way"]:checked').value)
  };

  // console.log(element);
  return (
    <div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 1440 230"><path fill="#0F172A" fill-opacity="1" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,90.7C672,75,768,85,864,112C960,139,1056,181,1152,170.7C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
      <div className="homePage">
        {/* <div className='h-screen absolu0'>
        </div> */}
        <div className="mt-0 md:col-span-2 md:mt-0 md:pt-2 md:pb-24 md:ml-20 md:mr-20 ml-6 mr-6 ">
          <form onSubmit={searchHandler}>
            <img
              className="flightImage hidden sm:block  w-50 h-36 absolute top-12 right-2 mt-20 mr-10"
              src={plane}
            />
            <div className="sm:rounded-md rounded-md  ">
              <div className="flightSearchBox pt-10">
                <div
                  className="flightsearch px-4 py-5 sm:px-32 sm:py-10 md:px-32 md:py-10 xs:px-32 xs:py-10"
                  style={{
                    backgroundImage:
                      "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
                  }}
                >
                  <div className="grid grid-cols-9 mt-3">
                    <div className="hidden col-span-12 sm:col-span-12 md:mr-3">
                      <label
                        name="way"
                        className="block text-base text-white font-bold"
                      >
                        TRIP TYPE
                      </label>
                      <div className="inline-flex flex gap-2">
                        <div
                          className={`${
                            data.way === "ONEWAY" ? "bg-white" : ""
                          } flex items-center px-4 border border-gray-200 rounded dark:border-gray-700`}
                        >
                          <input
                            id="ONEWAY"
                            checked={data.way === "ONEWAY" ? true : false}
                            type="radio"
                            value="ONEWAY"
                            name="way"
                            onChange={dataHandler}
                            className={`${
                              data.way === "ONEWAY"
                                ? "text-gray-800"
                                : "text-white"
                            }  w-8 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                          />
                          <label
                            for="ONEWAY"
                            className={`${
                              data.way === "ONEWAY"
                                ? "text-gray-900 dark:text-gray-900"
                                : "text-white"
                            } radio w-full py-2 px-3 text-sm font-medium`}
                          >
                            ONE WAY
                          </label>
                        </div>
                        <div
                          className={`${
                            data.way === "ROUND TRIP" ? "bg-white" : ""
                          } flex items-center px-4 border border-gray-200 rounded dark:border-gray-700`}
                        >
                          <input
                            id="ROUND TRIP"
                            checked={data.way === "ROUND TRIP" ? true : false}
                            type="radio"
                            value="ROUND TRIP"
                            name="way"
                            onChange={dataHandler}
                            className={`${
                              data.way === "ROUND TRIP"
                                ? "text-gray-800"
                                : "text-white"
                            }  w-8 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                          />
                          <label
                            for="ROUND TRIP"
                            className={`${
                              data.way === "ROUND TRIP"
                                ? "text-gray-900 dark:text-gray-900"
                                : "text-white"
                            } radio w-full py-2 px-3 text-sm font-medium`}
                          >
                            ROUND TRIP
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-9 gap-3 relative mt-5 mb-6">
                    <div className="col-span-12 sm:col-span-4 md:mr-3 relative">
                      <label
                        name="source"
                        className="block text-base   text-white font-bold"
                      >
                        From
                      </label>
                      <div className="dropdown-container text-base ">
                        <select
                          name="source"
                          value={selectedFromCity}
                          id="source"
                          onChange={(e) => {
                            handleFromCitySelect(e);
                            dataHandler(e);
                          }}
                          onSelect={(e) => {
                            handleFromCitySelect(e);
                            dataHandler(e);
                          }}
                          required
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-zinc-900 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option selected>Source City...</option>
                          {flightData.map((item, index) => {
                            return (
                              <option key={item.code} value={item.code}>
                                {item.city}
                                {", "}
                                {item.state}
                              </option>
                            );
                          })}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 mt-4 right-0 flex items-center px-2 text-zinc-900">
                          {/* SAjal */}
                        </div>
                      </div>
                    </div>
                    <div className="col-span- sm:col-span-1 md:mr-6 ml-11 mt-6 relative">
                      <img
                        className="changeIcon hidden"
                        src={changeIcon}
                        onClick={switchCity}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 md:mr-3 mb-4 ">
                      <label
                        name="destination"
                        className="block text-base   text-white font-bold"
                      >
                        To
                      </label>
                      <div className="dropdown-container text-base ">
                        <select
                          name="destination"
                          value={selectedToCity}
                          id="destination"
                          onChange={(e) => {
                            handleToCitySelect(e);
                            dataHandler(e);
                          }}
                          onSelect={(e) => {
                            handleToCitySelect(e);
                            dataHandler(e);
                          }}
                          required
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-zinc-900 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option selected>Destination City...</option>
                          {flightData.map((item, index) => {
                            return (
                              <option key={item.code} value={item.code}>
                                {item.city}
                                {", "}
                                {item.state}
                              </option>
                            );
                          })}
                        </select>
                        {/* <div className="pointer-events-none absolute inset-y-0 mt-4 right-0 flex items-center px-2 text-zinc-900">
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-9 gap-3 relative mt-5 mb-6">
                    <div className="col-span-12 sm:col-span-4 md:mr-3 relative ">
                      <label
                        name="dateOfTravelling"
                        className="block text-base   text-white font-bold"
                      >
                        Travelling Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={data.dateOfTravelling}
                        name="dateOfTravelling"
                        id="dateOfTravelling"
                        autoComplete="given-name"
                        className="pl-3 dateInput h-10 block w-full rounded-md border-black sm:text-sm"
                        onChange={dataHandler}
                      />
                    </div>
                    {/* {

                      <div className={`col-span-12 sm:col-span-3 md:mr-3 ${data.way === "ROUND TRIP" ? "block" : "hidden"} `}>
                        <label className="block text-base text-white font-bold">
                          Return
                        </label>
                        <input
                          type="date"
                          min={today}
                          value={data.dateOfReturn}
                          // placeholder="Return Date..."
                          name="dateOfReturn"
                          id="return"
                          autoComplete="given-name"
                          className="pl-3 dateInput h-10 block w-full rounded-md border-black sm:text-sm"
                          onChange={(e) => { dataHandler(e); returnHandler(e) }}
                        />
                      </div>
                    } */}
                    <div className="col-span- sm:col-span-1 md:mr-6 ml-11 mt-6 relative">
                      <img
                        className="hidden changeIcon"
                        src={changeIcon}
                        onClick={switchCity}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-4 md:mr-3 relative">
                      <label
                        name="noOfPassenger"
                        className="block text-base text-white font-bold"
                      >
                        Number of Passengers
                      </label>

                      <select
                        id="noOfPassenger"
                        name="noOfPassenger"
                        className="pl-3 h-10 block w-full rounded-md border-black sm:text-sm"
                        onChange={dataHandler}
                      >
                        {/* <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option> */}
                        {noOfPassengerArray.map((item, index) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="search-button justify-center">
                    {/* <button
                      
                      className="w-40 inline-flex tracking-widest uppercase flex items-center justify-center px-4 py-2.5 text-sm font-bold text-zinc-100 hover:text-white bg-gradient-to-r from-red-900 to-sky-600 hover:bg-gradient-to-r hover:from-sky-900 hover:to-red-700 hover:scale-110 rounded-md focus:outline-none transition ease-out hover:ease-in duration-250 ">
                      Search
                    </button> */}
                    <button
                      type="submit"
                      className="text-md
               border-2 border-gray-800 py-2 px-8
               transition-colors ease-out
               duration-500 text-white
               bg-blue-800
               bg-gradient-to-r
               from-blue-800 
               rounded-lg
               hover:from-white hover:to-gray-300 
               hover:text-black hover:border-white
               "
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* <ImageCards /> */}
                {/* <Cards /> */}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <SectionOne /> */}

      <Cover />
      <Cards />
    </div>
  );
};

export default Home;
