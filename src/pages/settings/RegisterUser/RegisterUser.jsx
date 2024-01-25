import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EyeSlashFilledIcon } from "../../../component/Dashboard/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../component/Dashboard/EyeFilledIcon";
import { CustomCheckbox } from "../../../component/Dashboard/CustomCheckbox";
import { useRegisterUserMutation } from "../../../redux/apis/userApi";
import toast from "react-hot-toast";

const RegisterUser = () => {
  const mode = useSelector((state) => state.global.mode);
  const { tentList } = useSelector((state) => state.tent);
  const { words, lang } = useSelector((state) => state.language);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [sendOTPRadio, setSendOTPRadio] = useState("email");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState([]);
  const [assignedTent, setAssignedTent] = useState([]);
  const [registerUser, { data, isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();
  console.log(error);
  const handleRegisterUser = () => {
    const userData = { email, username, password, role, assignedTent };
    registerUser({
      email,
      username,
      password,
      verification: false,
      is_admin: role.indexOf("admin") !== -1 ? true : false,
      is_active: role.indexOf("active") !== -1 ? true : false,
      is_staff: role.indexOf("staff") !== -1 ? true : false,
      is_superuser: role.indexOf("superuser") !== -1 ? true : false,
      assigned_tent: assignedTent,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
      toast.success("New User Succcessfully added.");
    }
    if (isError && error?.data) {
      Object.keys(error?.data).map((data) => {
        return toast.error(`${data} Field: ${error?.data[data][0]}`);
      })
    }
  }, [isSuccess, isError, error]);

  const handleReset = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setRole([]);
    setAssignedTent([]);
  };

  return (
    <div>
      <form className={`grid grid-cols-2 gap-3 ${mode}`}>
        <Input
          dir="ltr"
          size="sm"
          type="email"
          label={words["email"][lang]}
          value={email}
          onValueChange={setEmail}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "text-right group-data-[has-value=true]:text-text px-2",
          }}
        />
        <Input
          dir="ltr"
          size="sm"
          type="text"
          label={words["username"][lang]}
          value={username}
          onValueChange={setUsername}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "text-right group-data-[has-value=true]:text-text px-2",
          }}
        />
        <Input
          dir="ltr"
          size="sm"
          type={isVisible ? "text" : "password"}
          label={words["password"][lang]}
          value={password}
          onValueChange={setPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "text-right group-data-[has-value=true]:text-text px-2",
          }}
        />
        <Input
          dir="ltr"
          size="sm"
          type={isVisible ? "text" : "password"}
          label={words["confirm password"][lang]}
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "text-right group-data-[has-value=true]:text-text px-2",
          }}
        />
        <CheckboxGroup
          label={words["User roles"][lang]}
          orientation="horizontal"
          color="secondary"
          value={role}
          onChange={setRole}
          className={`col-span-2 mt-3`}
          classNames={{
            label: "text-right mr-2",
            wrapper: "gap-x-8",
          }}
        >
          <Checkbox classNames={{ label: "text-text mr-2" }} value="active">
            Is Active
          </Checkbox>
          <Checkbox classNames={{ label: "text-text mr-2" }} value="admin">
            Is Admin
          </Checkbox>
          <Checkbox classNames={{ label: "text-text mr-2" }} value="staff">
            Is Staff
          </Checkbox>
          <Checkbox classNames={{ label: "text-text mr-2" }} value="superuser">
            Is Superuser
          </Checkbox>
        </CheckboxGroup>

        <CheckboxGroup
          className="col-span-2 mt-3"
          label={words["Assigned tent"][lang]}
          orientation="horizontal"
          value={assignedTent}
          onChange={setAssignedTent}
          classNames={{
            label: "text-right mr-2",
            wrapper: "gap-5",
          }}
        >
          {tentList &&
            tentList?.map((tent, i) => (
              <CustomCheckbox key={i} value={tent.id}>
                {`${tent.name}`}
              </CustomCheckbox>
            ))}
        </CheckboxGroup>

        {/* <div className="flex flex-col gap-3 col-span-2 mt-3">
          <RadioGroup
            classNames={{
              label: "text-right mr-2",
              wrapper: "gap-5",
            }}
            label="Send OTP On"
            orientation="horizontal"
            value={sendOTPRadio}
            onValueChange={setSendOTPRadio}
            isDisabled={true}
          >
            <Radio classNames={{ label: "text-text mr-2" }} value="email">
              Email
            </Radio>
            <Radio classNames={{ label: "text-text mr-2" }} value="phone">
              Phone
            </Radio>
          </RadioGroup>
          {sendOTPRadio && (
            <Input
              size="sm"
              type={sendOTPRadio === "email" ? "email" : "phone"}
              label={
                sendOTPRadio === "email"
                  ? "Type Your Email"
                  : "Type Your Phone Number"
              }
              disabled
              classNames={{
                inputWrapper: [
                  "bg-background",
                  "data-[hover=true]:bg-background/60",
                  "group-data-[focus=true]:bg-background/60",
                ],
                input: "text-right group-data-[has-value=true]:text-text",
              }}
            />
          )}
        </div> */}

        <div className="flex gap-3 mt-5">
          <Button onClick={handleRegisterUser} color="success">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
