import { Link } from "react-router-dom";
import flight from "../../elements/flightRegister.jpg";
import { useState, useEffect } from "react";
import { signup } from "../../redux/auth/authActions";
import { connect } from "react-redux";
import { userSignup } from "../../api/authenticationService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../user/Navbar";

const Register = () => {
  // var today = new Date().toISOString().split('T')[0];
  // console.log(today)

  const [values, setValues] = useState({
    firstName: "",

    lastName: "",

    emailId: "",

    dateOfBirth: "",

    password: "",

    contactNumber: "",

    gender: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    // e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    if (confirmPassword === values.password) {
      userSignup(values)
        .then((response) => {
          if (response.status === 200 && confirmPassword === values.password) {
            navigate("/login");
            toast.success("Successfully registered!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            console.log("something wrong");
          }
        })
        .catch((err) => {
          if (err && err.response) {
            switch (err.response.status) {
              case 404:
                toast.error("Email id already exists. Please login!", {
                  position: "bottom-left",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                break;
              default:
            }
          } else {
            console.log("sdss");
          }
        });
    } else if (confirmPassword !== values.password) {
      toast.error("Passwords donot match!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onShowPassword = () => {
    if (document.getElementById("showPassword").checked) {
      document.getElementById("password").type = "text";
      document.getElementById("confirm").type = "text";
    } else {
      document.getElementById("password").type = "password";
      document.getElementById("confirm").type = "password";
    }
  };

  const handlePrompt = () => {
    toast.info(
      "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  //   window.onload = function() {
  //   document.querySelector("#phone");
  //   intlTelInput({
  //     separateDialCode: true,
  //     preferredCountries: ["in"]
  //   });
  // }

  return (
    <>
      <div className="max-h-screen md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="hidden md:block h-screen lg:col-span-2 min-h-screen relative overflow-hidden bg-gray-800 shadow-2xl">
          <img className="h-screen w-full object-contain" src={flight} />
        </div>

        <div className="flex items-center justify-center px-6 pt-20 h- sm:h- overflow-y-scroll w-full">
          <div className="">
            <div className="w-full">
              {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <a className="flex justify-center font-bold text-4xl">
                  <img className="w-20 h-20" src={require('../../elements/brownfieldlogo.png')} />
                </a>



                <h2 className="mt-6 text-2xl font-extrabold text-center leading-9">Create a new account</h2>



                <p className="mt-2 text-sm text-center leading-5">

                  Or

                  <Link to={{ pathname: '/login' }}>

                    <a className="underline text-blue-600 underline-offset-1 font-medium transition ease-in-out duration-150s"> Login to your account </a>

                  </Link>



                </p>

              </div> */}
              <h2 className="text-2xl font-extrabold text-center leading-9">
                Create a new account
              </h2>

              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleSubmit}>
                  <div className="flex items-left justify-between mt-6">
                    <div className="mb-3">
                      <label
                        htmlFor="first"
                        className="block text-sm font-medium leading-5"
                      >
                        {" "}
                        First Name{" "}
                      </label>

                      <div className="rounded-md shadow-sm">
                        <input
                          id="first"
                          name="firstName"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          pattern="^[a-zA-Z ]*$"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3 ml-3">
                      <label
                        htmlFor="last"
                        className="block text-sm font-medium leading-5 ml-1"
                      >
                        {" "}
                        Last Name{" "}
                      </label>

                      <div className="rounded-md shadow-sm">
                        <input
                          id="last"
                          name="lastName"
                          type="text"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          pattern="^[a-zA-Z ]*$"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-5"
                    >
                      {" "}
                      Email address{" "}
                    </label>

                    <div className="rounded-md shadow-sm">
                      <input
                        id="email"
                        name="emailId"
                        type="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-5"
                    >
                      {" "}
                      Phone Number{" "}
                    </label>

                    <div className="rounded-md shadow-sm">
                      <input
                        id="phone"
                        name="contactNumber"
                        type="text"
                        minLength={10}
                        maxLength={10}
                        placeholder="Phone number"
                        required
                        // pattern="^[a-zA-Z ]*$"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            contactNumber: e.target.value.replace(
                              /[^0-9]/gi,
                              ""
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium leading-5 ml-1"
                    >
                      {" "}
                      DOB{" "}
                    </label>
                    <div className="rounded-md shadow-sm">
                      <input
                        id="dob"
                        name="dateOfBirth"
                        type="date"
                        max="2015-12-12"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="mb-3 xl:w-full w-full rounded-md shadow-sm">
                      <label
                        htmlFor="last"
                        className="block text-sm font-medium leading-5 ml-1"
                      >
                        Gender
                      </label>

                      <select
                        onChange={handleChange}
                        name="gender"
                        onSelect={handleChange}
                        required
                        value={values.gender}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="grid-state"
                      >
                        <option value="" disabled selected>
                          Select Gender
                        </option>
                        <option>MALE</option>
                        <option>FEMALE</option>
                        <option>OTHER</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-900">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 111.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 leading-5"
                    >
                      {" "}
                      Password{" "}
                    </label>

                    <div className="rounded-md shadow-sm">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onClick={handlePrompt}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="">
                    <label
                      htmlFor="confirm"
                      className="block text-sm font-medium text-gray-700 leading-5"
                    >
                      Confirm Password{" "}
                    </label>

                    <div className="rounded-md shadow-sm">
                      <input
                        id="confirm"
                        type="password"
                        name="confirmPassword"
                        required
                        minLength={8}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={onChangeConfirmPassword}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <input
                        id="showPassword"
                        type="checkbox"
                        className="form-checkbox w-4 h-4 transition duration-150 ease-in-out"
                        onClick={onShowPassword}
                      />

                      <label
                        htmlFor="showPassword"
                        className="block ml-2 text-sm text-gray-900 leading-5"
                      >
                        {" "}
                        Show Password{" "}
                      </label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-900 border border-transparent rounded-md hover:bg-#1F2937-500 focus:outline-none transition duration-150 ease-in-out"
                      >
                        Register
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (values) => dispatch(signup(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
