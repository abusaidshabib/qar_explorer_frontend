import SimpleMap from "../../component/Dashboard/SimpleMap";
import { StatisticsGrpah } from "../../component/Dashboard/StatisticsGraph";
import { useSelector } from "react-redux";
import Hero from "../../component/Hero";
import SimpleMapDark from "../../component/Dashboard/SimpleMapDark";
import SelectedTent from "../../component/SelectedTent";
import { Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import RegisterUser from "../settings/RegisterUser/RegisterUser";
import UserList from "../settings/UserList/UserList";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import FineTuningList from "../settings/FineTuningList/FineTuningList";
import RAGdata from "../settings/RAGdata/RAGdata";

const Dashboard = () => {
  const mode = useSelector((state) => state.global.mode);
  const { selectedTent } = useSelector((state) => state.tent);
  const {words, lang} = useSelector((state) => state.language);
  const [loading, setLoading] = useState(false);
  const interval = useRef(null);
  useEffect(() => {
    if (loading && interval.current) {
      console.log(interval.current);
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [loading]);
  // useEffect(() => {
  //   interval.current = setInterval(() => {
  //     console.log('hello');
  //     setLoading((prev) => true);
  //   }, 10000);
  // }, []);

  let tabs = [
    {
      id: "rag_data",
      label: words["RAG Data"][lang],
      content: <RAGdata></RAGdata>,
    },
    {
      id: "findtuning_qa",
      label: words["Finetuning QA"][lang],
      content: <FineTuningList/>
    },
  ];

  return (
    <div className={`px-5 pb-5 ${mode} text-text`}>
      <div className="">
        <Tabs
          variant="underlined"
          color="secondary"
          aria-label="Dynamic tabs"
          items={tabs}
        >
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card className="bg-bgalt text-text rounded-small outline-0 border-0 shadow-small min-h-[calc(100vh-12rem)]">
                <CardBody className="outline-0 border-0">
                  {item.content}
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
