import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { getDoctors } from "../services/doctorService";
import { Grid, GridCol } from "@mantine/core";
import Doctor from "../components/Doctor";

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
      <Grid>
        {doctors.map((doctor) => (
          <GridCol key={doctor._id} span={4}>
            <Doctor doctor={doctor} />
          </GridCol>
        ))}
      </Grid>
    </Layout>
  );
};

export default Dashboard;
