import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions, createOrder } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addBooking } from "../../redux/user/userActions";
import { toast } from "react-toastify";
import { getUser } from "../../api/UserDetailsService";
import {
  getCreatedOrder,
  postBookFlight,
  postCheckIn,
} from "../../api/BookingManagementService";

const Payments = (seats) => {
  const [order, setOrder] = useState({});
  const location = useLocation();
  const [data, setData] = useState(useSelector((state) => state.user.booking));
  console.log(
    useSelector((state) => state.user.booking),
    location.state.data
  );
  const [flightData, setFlightData] = useState(
    useSelector((state) => state.user)
  );
  console.log(useSelector((state) => state.user));
  const total = data.fare.totalFare + data.fare.travelCharges;
  const [pending, setPending] = useState();
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector((state) => state.user.logged));

  console.log(useSelector((s) => s.user));
  useEffect(() => {
    if (flightData.booking.hasOwnProperty("bookingId")) {
      setPending(true);
    }
  }, []);

  useEffect(() => {
    getCreatedOrder(total).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const test = async () => {
    console.log(data);

    handlePayment();
    data.fare.totalFare = data.fare.totalFare + data.fare.travelCharges;
  };
  const Razorpay = useRazorpay();

  const [bookingId, setBookingId] = useState();
  const [checkin, setCheckIn] = useState(false);

  const handleCheckIn = (yourDate) => {
    var tmp = false;
    var date = new Date(
      `${data.dateOfTravelling} ${flightData.flight.departureTime}`
    );
    console.log(date.getTime());

    // console.log(milliseconds);
    // postCheckIn(bookingId).then((res) => {
    //   console.log(res);
    //   tmp = res.status;
    //   console.log(res.data);
    //   toast.success("Checked In Successfully!", {
    //     position: "bottom-left",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   setCheckIn(true);
    // });
    // if (!tmp) {
    //   toast.error("Cannot Check in For Given Date!", {
    //     position: "bottom-left",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  const handlePayment = () => {
    // console.log(JSON.stringify(order))

    const options = {
      key: "rzp_test_ugc5Yl6sH3uH5X",
      amount: order.amount,
      currency: order.currency,
      name: "BrownField Airlines",
      description: "Test Transaction",
      // image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async (res) => {
        console.log(res);
        data.paymentId = res.razorpay_payment_id;
        data.userName = user.emailId;
        toast.success("Payment Accepted!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        postBookFlight(data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log(res.data);
              setBookingId(res.data.bookingId);
              dispatch(addBooking(res.data));
              setPending(!pending);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        // navigate("/pdf")
      },
      prefill: {
        name: data.email,
        email: data.email,
        contact: data.mobileNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#111827",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
    rzpay.on("payment.failed", function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      // alert()
      console.log(response);
      alert("Failed");
    });
  };

  return (
    <center className="p-8 justify-center">
      <div class="w-full max-w-2xl bg-white border border-gray-900 bg-gray-900 rounded-lg shadow">
        {/* <div class="flex justify-end px-4 pt-4">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        <span class="sr-only">Open dropdown</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>
                </div> */}
        <div class="mt-4 flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={require("../../elements/brownfieldlogo.png")}
            alt="Bonnie image"
          />
          <p class="text-2xl font-extrabold uppercase tracking-wider text-gray-100 dark:text-white">
            {user.firstName} {user.lastName}
          </p>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {user.emailId}
          </span>
          <div className="flex space-x-6 mt-4">
            <p className="text-2xl font-medium text-gray-100 dark:text-white">
              {flightData.flight.source.code}
            </p>
            <p className="text-2xl font-thin text-gray-100 dark:text-white">
              -
            </p>
            <p className="text-2xl font-medium text-gray-100 dark:text-white">
              {flightData.flight.destination.code}
            </p>
          </div>
          <div className="flex space-x-8">
            <p className="mb-1 text-md font-thin text-gray-100 dark:text-white">
              {flightData.flight.departureTime}
            </p>
            {/* <p className="mb-1 text-md font-thin text-gray-100 dark:text-white">to</p> */}
            <p className="mb-1 text-md font-thin text-gray-100 dark:text-white">
              {flightData.flight.arrivalTime}
            </p>
          </div>
          <div className="flex space-x-1">
            <p className="text-md font-thin text-gray-100 dark:text-white">
              {data.flightId}
            </p>
            <p className="text-md font-thin text-gray-100 dark:text-white">:</p>
            <p className="text-md font-thin text-gray-100 dark:text-white">
              {data.dateOfTravelling}
            </p>
          </div>

          <p className="mt-3 text-md font-thin text-gray-100 dark:text-white">
            All Passenger Details
          </p>

          {data.passengerInfo.map((item, index) => {
            return (
              <div className="space-x-1">
                <h5 class="inline-flex mb-1 text-md uppercase text-gray-500 dark:text-white">
                  {index + 1}
                  {". "}
                </h5>
                <h5 class="inline-flex mb-1 text-md uppercase text-gray-500 dark:text-white">
                  {item.firstName} {item.lastName}
                  {"( "}
                  {item.gender[0]}
                  {" )"}
                  {" : "}
                </h5>
                {/* <span class="inline-flex text-md text-gray-500 dark:text-gray-400 ">}</span> */}
                <span class="inline-flex text-md text-gray-500 dark:text-gray-400">
                  {item.seatNo ? `${item.seatNo}` : `Auto Assign`}
                </span>
              </div>
            );
          })}
          <div class="flex mt-4 space-x-3 md:mt-6">
            {/* <p class={`inline-flex items-centertext-md ml-4 mt-3
               border-2 border-gray-800 py-2 px-4
               transition-colors ease-out
               duration-500 text-white
               ${!pending ? "bg-red-600" : "bg-green-600"
                            }
               bg-gradient-to-r
               rounded-lg
            `}>{!pending ? `Payment Pending` : `Paid ₹${flightData.booking.fare.travelCharges}/-`}</p> */}
            {!pending ? (
              <div>
                <button
                  className="text-md ml-4 mt-3
                                border-2 border-gray-800 py-2 px-4
                                transition-colors ease-out
                                duration-500 text-white
                                bg-blue-800
                                bg-gradient-to-r
                                from-blue-800 
                                rounded-lg
                                hover:from-white hover:to-gray-300 
                                hover:text-black hover:border-white"
                  onClick={test}
                >
                  Make Payment ₹{flightData.booking.fare.travelCharges}/-{" "}
                </button>
                <Link to={"/"}>
                  <button
                    className="text-md ml-4 mt-3
                                border-2 border-gray-800 py-2 px-4
                                transition-colors ease-out
                                duration-500 text-white
                                bg-red-600
                             
                                rounded-lg
                                hover:from-white hover:to-gray-300 
                                hover:text-black hover:border-white"
                  >
                    Cancel Booking
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to={"/pdf"}>
                  <button
                    className="text-md ml-4 mt-3
                                border-2 border-gray-800 py-2 px-4
                                transition-colors ease-out
                                duration-500 text-white
                                bg-blue-800
                                bg-gradient-to-r
                                from-blue-800 
                                rounded-lg
                                hover:from-white hover:to-gray-300 
                                hover:text-black hover:border-white"
                  >
                    View Ticket{" "}
                  </button>
                </Link>
                <button
                  onClick={handleCheckIn}
                  disabled={checkin ? true : false}
                  className={`text-md ml-4 mt-3
                                border-2 border-gray-800 py-2 px-4
                                transition-colors ease-out
                                duration-500 text-white
                                ${checkin ? "bg-green-800" : "bg-red-800"}
                                
                                
                                rounded-lg
                                hover:from-white hover:to-gray-300 
                                hover:text-black hover:border-white`}
                >
                  {!checkin ? "Check In Now" : "Checked In"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <button onClick={test}>Payment</button> */}

      {/* <button onClick={handlePayment}>Click</button> */}
    </center>
  );
};

export default Payments;
