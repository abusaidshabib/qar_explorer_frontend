/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { BiSolidDashboard } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { setActive } from "../../redux/slices/global";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Data Collection",
    key: "dashboard",
    icon: <BiSolidDashboard size={25} />,
  },
  {
    label: "Settings",
    key: "settings",
    icon: <FiSettings size={25} />,
  },
];

const Side = ({ side, setSide }) => {
  const { mode } = useSelector((state) => state.global);
  const {words, lang} = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigation = useNavigate();
  return (
    <div
      className={`${mode} bg-bgalt sticky flex-col items-center gap-[100px]  min-h-screen w-64 top-0  border-[rgba(0,0,0,0.2)] hidden sm:flex`}
    >
      <div className="w-full flex flex-row justify-start pr-2 pt-2">
        {
          <RxHamburgerMenu
            className="hidden  sm:block cursor-pointer"
            size={30}
            onClick={() => setSide((prev) => !prev)}
          />
        }
      </div>
      <ul className="space-y-1">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(setActive(item.key));
                navigation(`/${item.key}`);
              }}
              className={
                pathname.slice(1) == item.key
                  ? "hover:bg-background py-2 cursor-pointer mx-2 rounded-lg px-2 text-text bg-background"
                  : "hover:bg-background py-2 cursor-pointer mx-2 rounded-lg px-2 text-gray-600"
              }
            >
              <div
                className={
                  !side
                    ? `flex flex-row gap-2 items-center`
                    : `flex flex-row gap-2 items-center pl-10`
                }
              >
                {item.icon}
                {side && <p className="text-xl font-bold">{words[item.key][lang]}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Side;
