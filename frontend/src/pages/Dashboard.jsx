import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { getDoctors } from "../services/doctorService";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const loadDoctors = async () => {
      const response = await getDoctors();
      setDoctors(response);
    };
    loadDoctors();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  );
};

export default Dashboard;
