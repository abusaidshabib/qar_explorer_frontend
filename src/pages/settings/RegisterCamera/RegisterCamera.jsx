import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useRegisterCameraMutation } from "../../../redux/apis/cameraApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RegisterCamera = () => {
  const mode = useSelector((state) => state.global.mode);
  const { words, lang } = useSelector((state) => state.language);
  const { tentList } = useSelector((state) => state.tent);

  const [selectedTent, setValue] = useState();
  const [sn, setSn] = useState("");

  console.log(selectedTent, sn);

  const [registerCamera, { data, error, isLoading, isSuccess, isError }] =
    useRegisterCameraMutation();
  console.log(selectedTent);
  const handleRegisterCamera = () => {
    console.log(selectedTent);
    registerCamera({
      sn,
      tent: selectedTent,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
      toast.success("New Camera Succcessfully added.");
    }if(isError) {
      toast.error(error?.message)
    }
  }, [error, isError, isSuccess]);

  const handleReset = () => {
    setSn("");
    setValue();
  };

  return (
    <div>
      <form className={`grid grid-cols-2 gap-3 ${mode}`}>
        <Input
          size="sm"
          type="text"
          label={words["Serial No."][lang]}
          value={sn}
          onValueChange={setSn}
          classNames={{
            inputWrapper: [
              "bg-background",
              "data-[hover=true]:bg-background/60",
              "group-data-[focus=true]:bg-background/60",
            ],
            input: "group-data-[has-value=true]:text-text",
          }}
        />
        <Select
          classNames={{
            popoverContent: `bg-background text-text ${mode}`,
            trigger: `text-text bg-background group-hover:bg-background/60`,
            mainWrapper: "group",
            innerWrapper: "w-auto",
            selectorIcon: "left-3 right-100",
            value: "group-data-[has-value=true]:text-text",
          }}
          className={`${mode}`}
          size="sm"
          label={words["Select a tent"][lang]}
          onChange={(e) => setValue(e.target.value)}
        >
          {tentList &&
            tentList.map((tent) => (
              <SelectItem key={tent.id} value={tent.id}>
                {`${tent.name}`}
              </SelectItem>
            ))}
        </Select>
        <div className="flex gap-3">
          <Button onClick={handleRegisterCamera} color="success" isLoading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCamera;
