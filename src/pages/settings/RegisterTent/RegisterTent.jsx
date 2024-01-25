import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EyeSlashFilledIcon } from "../../../component/Dashboard/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../component/Dashboard/EyeFilledIcon";
import { useRegisterTentMutation } from "../../../redux/apis/tentApi";
import toast from "react-hot-toast";

const RegisterTent = () => {
  const mode = useSelector((state) => state.global.mode);
  const { words, lang } = useSelector((state) => state.language);
  const {user} = useSelector(state => state.auth);
  const [registerTent, {data, error, isLoading, isSuccess, isError}] =  useRegisterTentMutation();
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [long, setLong] = useState(''); 
  const [lat, setLat] = useState(''); 
  const handleSubmit =  (e) => {
    e.preventDefault();
    registerTent({
      name,
      lat,
      long,
      location,
      created_by: user.user_id,
    })
  }
  useEffect(() => {
    if(isSuccess){
      handleReset();
      toast.success("New Tent Succcessfully added.")
    }
    if (isError && error?.data) {
      Object.keys(error?.data).map((data) => {
        return toast.error(`${data} Field: ${error?.data[data][0]}`);
      })
    }
  }, [error, isError, isSuccess]);

  const handleReset = () => {
    setName('');
    setLocation('');
    setLat('');
    setLong('');
  }
  return (
    <div>
      <form className={`grid grid-cols-2 gap-3 ${mode}`} onSubmit={handleSubmit} onReset={handleReset}>
        {/* <Input
          size="sm"
          type="text"
          label="Tent Id"
          value={id}
          onValueChange={setId}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        /> */}
        <Input
          size="sm"
          type="text"
          label={words["Tent Name"][lang]}
          value={name}
          onValueChange={setName}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        />
        <Input
          size="sm"
          type="text"
          label={words["Location"][lang]}
          value={location}
          onValueChange={setLocation}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        />
        <Input
          size="sm"
          type="text"
          label={words["lat"][lang]}
          value={lat}
          onValueChange={setLat}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        />
        <Input
          size="sm"
          type="text"
          label={words["long"][lang]}
          value={long}
          onValueChange={setLong}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        />
        {/* <Textarea
          label="Enter your description"
          className="col-span-2"
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        /> */}
        {/* <Select
          classNames={{
            popoverContent: `bg-background text-text ${mode}`,
            trigger: `text-text bg-background group-hover:bg-background/60`,
            mainWrapper: "group",
            innerWrapper: "w-auto",
            selectorIcon: "left-3 right-100",
            value: "group-data-[has-value=true]:text-text",
          }}
          className={`col-span-2 ${mode}`}
          size="sm"
          label="Select tent"
          onChange={(e) => setTentId(e.target.value)}
        >
          {tentList && tentList.map((tent) => (
            <SelectItem key={tent.id} value={tent.id}>
              {`${tent.name}`}
            </SelectItem>
          ))}
        </Select> */}
        <div className="flex gap-3">
          <Button color="success" type="submit" isLoading={isLoading}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterTent;
