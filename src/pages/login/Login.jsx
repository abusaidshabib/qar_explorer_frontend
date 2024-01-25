import { Button, Input, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useLoginMutation } from "../../redux/apis/authApi";
import AvatarIcon from "../../../public/vite.svg";
import LoginIcon from '../../assets/logo/login.jpg';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [login, { data, error, isLoading, isError, isSuccess }] =
    useLoginMutation();
  const handleSubmit = () => {
    login({
      username: email,
      password: password,
    });
  };
  return (
    <div className={`w-full h-[100vh] flex flex-row text-text justify-center items-center bg-backInLogin bg-no-repeat bg-cover`}>
      <div className="max-w-[360px] min-h-[400px] flex flex-col justify-center items-center space-y-4 bg-white bg-opacity-5 shadow-md backdrop-blur-sm w-full rounded-2xl">
        <img src={AvatarIcon} alt="" className="w-[100px] rounded-full border-2 object-cover" />
        <div className="w-full flex flex-col items-center justify-center">
          <Input
            value={email}
            type="text"
            label="Username"
            isInvalid={error?.data}
            color={error?.data ? "danger" : "default"}
            errorMessage={error?.data && "Please enter a valid username"}
            onValueChange={setEmail}
            className="max-w-xs"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Input
            value={password}
            type={show ? "text" : "password"}
            label="Password"
            isInvalid={error?.data}
            color={error?.data ? "danger" : "default"}
            errorMessage={error?.data && "Please enter a valid password"}
            onValueChange={setPassword}
            className="max-w-xs"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? (
                  <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
        <Button
          color="warning"
          className="text-white shadow-lg"
          disabled={isLoading}
          onClick={() => handleSubmit()}
        >
          Login
        </Button>
        {isLoading && <Spinner color="success" />}
      </div>
    </div>
  );
};

export default Login;
