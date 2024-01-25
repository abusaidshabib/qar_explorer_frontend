/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Top from "../../component/Navbar/Top";
import Side from "../../component/Navbar/Side";
import { useEffect, useState } from "react";
import Title from "../../component/Title";
import { useGetAllTentQuery } from "../../redux/apis/tentApi";
import { Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "../../redux/apis/userApi";

const Layout = () => {
  const [side, setSide] = useState(true);
  const { tentList } = useSelector((state) => state.tent);
  const { data, isLoading } = useGetAllTentQuery();
  const { data: userData, isLoading: isUserLoading } = useGetAllUserQuery(undefined, {
    pollingInterval: 60000,
  });

  // const { data: cameraData, isLoading: isCameraLoading } = useGetAllCameraListQuery(undefined, {
  //   pollingInterval: 60000,
  // });
  return (
    <div className="block sm:flex">
      <div>
        <Side setSide={setSide} side={side} />
      </div>
      <div className="flex-1">
        <div className="sm:hidden block px-6 pt-6">
          <Title />
        </div>
        <Top setSide={setSide} side={side} />
        {(!isLoading && !isUserLoading) ? (
          <Outlet />
        ) : (
          <div className="w-full h-[90vh] flex flex-col gap-2 justify-center items-center text-text">
            <Spinner color="success" />
            <p>Please Wait</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
