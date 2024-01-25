import React, { useEffect, useState } from "react";
import { getToken } from "../utils/tokens";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/auth";

const useAuthCheck = () => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getToken();
    if (user) {
      dispatch(setUser(user));
    }
    setCheck(true);
  }, [dispatch]);

  return check;
};

export default useAuthCheck;
