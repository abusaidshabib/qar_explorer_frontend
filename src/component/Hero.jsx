import { useSelector } from "react-redux";
import {
  useGetTentByIdQuery,
  useGetTentCounterQuery,
} from "../redux/apis/tentApi";
import { useEffect, useState, useRef } from "react";
import moment from "moment";

const Hero = () => {
  const mode = useSelector((state) => state.global.mode);
  const { words, lang } = useSelector((state) => state.language);
  const { selectedTent } = useSelector((state) => state.tent);
  const { data, isLoading } = useGetTentCounterQuery(selectedTent?.id, {
    pollingInterval: 60000,
  });
  const {
    data: cardData,
    isLoading: cardLoading,
    error,
  } = useGetTentByIdQuery(
    {
      tent_id: selectedTent?.id,
      date: moment(Date.now()).format("DD-MM-yyyy"),
    },
    { pollingInterval: 60000 }
  );
  console.log(data)
  console.log(cardData?.total_in[0])
  const [loading, setLoading] = useState(false);
  const interval = useRef(null);
  useEffect(() => {
    if (loading) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [loading]);
  useEffect(() => {
    interval.current = setInterval(() => {
      setLoading((prev) => true);
    }, 10000);
  }, []);
  return (
    <div>

    </div>
  );
};

export default Hero;
