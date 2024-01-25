import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import RegisterTent from "./RegisterTent/RegisterTent";
import RegisterCamera from "./RegisterCamera/RegisterCamera";
import RegisterUser from "./RegisterUser/RegisterUser";
import { useSelector } from "react-redux";
import CameraSettings from "./CameraSettings.jsx/CameraSettings";
import TentList from "./TentList/TentList";
import CameraList from "./CameraList/CameraList";
import UserList from "./UserList/UserList";

const Settings = () => {
  const mode = useSelector((state) => state.global.mode);
  const {words, lang} = useSelector((state) => state.language);

  let tabs = [
    {
      id: "user",
      label: words["Register User"][lang],
      content: <RegisterUser></RegisterUser>,
    },
    {
      id: "userList",
      label: words["User List"][lang],
      content: <UserList></UserList>,
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

export default Settings;
