import { Select, SelectItem } from "@nextui-org/react";
import { SelectorIcon } from "./Dashboard/SelectorIcon";
import { useDispatch, useSelector } from "react-redux";
import { setTent } from "../redux/slices/tent";

const SelectedTent = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);
  const { words, lang } = useSelector((state) => state.language);
  const { selectedTent } = useSelector((state) => state.tent);
  const { tentList } = useSelector((state) => state.tent);
  return (
    <Select
      radius="full"
      placeholder={words["Select a tent"][lang]}
      labelPlacement="outside"
      className="max-w-xs"
      disableSelectorIconRotation
      defaultSelectedKeys={[selectedTent?.id.toString()]}
      onChange={(e) => dispatch(setTent(e.target.value))}
      classNames={{
        popoverContent: `${mode} text-text bg-bgalt`,
        trigger: `${mode} text-text bg-bgalt group-hover:bg-bgalt/60`,
        mainWrapper: "group",
        value: "group-data-[has-value=true]:text-text",
      }}
      selectorIcon={<SelectorIcon />}
    >
      {tentList &&
        tentList.map((tent) => (
          <SelectItem
            className={`${mode} bg-bgalt text-text`}
            key={tent.id}
            value={tent.id}
            dir={lang == "arabic" ? "rtl" : "ltr"}
          >
            {`${tent.name}`}
          </SelectItem>
        ))}
    </Select>
  );
};

export default SelectedTent;
