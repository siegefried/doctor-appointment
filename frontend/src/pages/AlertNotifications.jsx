import { Tabs } from "@mantine/core";
import Layout from "../layouts/Layout";

const AlertNotifications = () => {
  return (
    <Layout>
      <h1 className="text-2xl pl-4 pt-4">Notifications</h1>
      <Tabs defaultValue="unread">
        <Tabs.List>
          <Tabs.Tab value="unread">New</Tabs.Tab>
          <Tabs.Tab value="read">Seen</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Layout>
  );
};

export default AlertNotifications;
