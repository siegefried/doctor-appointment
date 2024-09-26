import { Card, Tabs } from "@mantine/core";
import Layout from "../layouts/Layout";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

const AlertNotifications = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await getCurrentUser();
      setUserInfo(response);
    };
    loadUserInfo();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl pl-4 pt-4">Notifications</h1>
      <Tabs defaultValue="unread">
        <Tabs.List>
          <Tabs.Tab value="unread">New</Tabs.Tab>
          <Tabs.Tab value="read">Seen</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="unread">
          <div className="flex justify-end">
            <h3 className="underline underline-offset-8 pr-4 pt-4 text-sm cursor-pointer">
              Mark All as Seen
            </h3>
          </div>

          {userInfo?.unReadNotifications?.map((notification, index) => (
              <div className="p-2" key={index} onClick={() => navigate(notification.link)}>
                <Card>{notification.message}</Card>
              </div>
          ))}
        </Tabs.Panel>

        <Tabs.Panel value="read">
          <div className="flex justify-end">
            <h3 className="underline underline-offset-8 pr-4 pt-4 text-sm cursor-pointer">
              Delete All
            </h3>
          </div>
        </Tabs.Panel>
      </Tabs>
    </Layout>
  );
};

export default AlertNotifications;
