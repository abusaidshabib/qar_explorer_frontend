import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  AvatarIcon,
} from "@nextui-org/react";
import { BiSolidDashboard } from "react-icons/bi";
import { GiCctvCamera } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdGTranslate } from "react-icons/md"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setActive, setMode } from "../../redux/slices/global";
import Title from "../Title";
import { useNavigate } from "react-router-dom";
import { setLanguage } from "../../redux/slices/language";
// import AvatarIcon from "../../assets/logo/logo-light.jpg";
import { deleteUser } from "../../redux/slices/auth";

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
  }
];

export default function Top() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mobile, setMobile] = useState(window.innerWidth);
  const {mode, active} = useSelector((state) => state.global);
  const {words, lang} = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Navbar
      isBlurred={true}
      maxWidth="full"
      className=" backdrop-blur-md py-4 text-text"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      classNames={{
        toggleIcon: ["w-[10px]"],
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="hidden sm:block">
          <Title />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent
        justify={mobile >= 768 ? "end" : "center"}
        className="cursor-pointer text-text w-full sm:ml-0 ml-5"
      >
        <NavbarItem className="bg-bgalt flex items-center p-2 sm:gap-4 gap-2 rounded-full">
          <h3 className="h-10 text-sm sm:text-lg bg-background rounded-full grid place-items-center md:px-16 px-4 hover:scale-[1.02] transition-all hover:shadow-md">
            LLM Data Collection
          </h3>
          <RxHamburgerMenu
            size={20}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-text sm:hidden block"
          />
          <IoIosNotificationsOutline className={`text-text`} size={20} />
          <MdGTranslate size={20} onClick={() => dispatch(setLanguage())} />
          {/* <AiOutlineInfoCircle size={20} /> */}
          {mode == "hajj" ? (
            <MdOutlineDarkMode onClick={() => dispatch(setMode())} size={20} />
          ) : (
            <MdOutlineLightMode onClick={() => dispatch(setMode())} size={20} />
          )}
          <Dropdown
            className={`w-[100px] ${mode} bg-bgalt text-text`}
            dir="rtl"
          >
            <DropdownTrigger>
              {/* <NavbarBrand>
                <Avatar
                  icon={AvatarIcon}
                  classNames={{
                    base: "bg-gradient-to-br from-[#846EFF] to-[#441AFF]",
                    icon: "text-white/80",
                  }}
                />
              </NavbarBrand> */}
              <Avatar
                icon={<AvatarIcon />}
                classNames={{
                  base: "bg-gradient-to-br from-[#846EFF] to-[#441AFF]",
                  icon: "text-white/80",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => dispatch(deleteUser())}>
                {words["Logout"][lang]}
              </DropdownItem>
              <DropdownItem>{words["Admin Panel"][lang]}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className={`pt-24 ${mode} bg-background text-text`}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            className={
              active != item.key
                ? "flex flex-row items-center gap-2 z-10 p-2"
                : "flex flex-row items-center gap-2 z-10 bg-bgalt p-2 rounded-lg"
            }
            dir="rtl"
            key={`${item}-${index}`}
            onClick={() => {
              dispatch(setActive(item.key));
              navigate(`/${item.key}`);
            }}
          >
            {item.icon}
            <div>{item.label}</div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
