import React from "react";
import { useSelector } from "react-redux";

const Title = () => {
  const active = useSelector(state => state.global.active);
  const {words, lang} = useSelector((state) => state.language);
  return (
    <p className="font-bold lg:text-3xl md:text-xl text-lg">
      {words[active][lang]}
    </p>
  );
};

export default Title;
