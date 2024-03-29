import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import validateInput from "../utils/loginInputValidation";
import useUserSlice from "../store/user/useUserSlice";
import usePollSlice from "../store/poll/usePollSlice";

const PresenterLogin = () => {
  const { userError, validateUser, resetUserSlice } = useUserSlice((state) => {
    return {
      userError: state.userError,
      validateUser: state.validateUser,
      resetUserSlice: state.resetUserSlice,
    };
  });

  const { handlePollReset } = usePollSlice();

  // function to reset all userError loading state in userSlice. so that the error from registration page does not appear on login page and vise versa
  useEffect(() => {
    resetUserSlice();
    handlePollReset();
  }, []);

  const navigate = useNavigate();

  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  // handle form input
  const handleInput = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInput(value);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const response = await validateUser(value);
    if (response) {
      navigate("/presenterResult", { replace: true });
    }
  };

  return (
    <div>
      {/* login form */}
      <div className="absolute top-0 left-0 min-h-screen hero bg-base-200">
        <div className="flex-col mt-20 lg:mt-20 hero-content lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Presenter Login</h1>
            <p className="py-6">
              Login to manage your live presentations and engage with your
              audience in real-time.
            </p>
          </div>
          &nbsp;
          <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="String"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={handleInput}
                    value={value.email}
                    autoFocus
                  />
                  {error.email && (
                    <span className="italic font-light text-red-500">
                      * {error.email}
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleInput}
                    value={value.password}
                    className="input input-bordered"
                  />
                  {error.password && (
                    <span className="italic font-light text-red-500">
                      * {error.password}
                    </span>
                  )}
                  <div className="flex flex-row justify-between mt-2">
                    {/* <Link to="" className="text-sm link link-hover">
                    Forgot password?
                  </Link> */}

                    <Link
                      to="/presenterRegistration"
                      className="text-sm link link-primary link-hover"
                    >
                      Create new account!!
                    </Link>
                  </div>
                </div>
                <div className="mt-6 form-control">
                  <button className="btn-warning btn" type="submit">
                    Login
                  </button>
                </div>
              </form>
              {userError ? (
                <div className="italic font-light text-red-500">
                  * {userError}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresenterLogin;
