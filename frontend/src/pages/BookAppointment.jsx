import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { getDoctorById } from "../services/doctorService";
import { useState, useEffect } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import {
  Paper,
  Text,
  Group,
  Badge,
  Card,
  Divider,
  Button,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import * as apiClient from "../services/appointmentService";

const BookAppointment = () => {
  const { user } = useLoginContext();
  const [doctor, setDoctor] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { doctorId } = useParams();
  useEffect(() => {
    const loadDoctor = async () => {
      const response = await getDoctorById(doctorId);
      setDoctor(response);
    };
    loadDoctor();
  }, [doctorId]);

  const checkAvailability = handleSubmit(async (data) => {
    console.log(data);
  });

  const onSubmit = handleSubmit(async (data) => {
    data.doctorId = doctor._id;
    data.userId = user.userId;
    apiClient.create(data);
  });

  return (
    <Layout>
      {doctor && (
        <div className="flex flex-col">
          <Paper shadow="xs" p="xl">
            <Group mt="md" mb="xs">
              <Text fw={700}>
                {doctor.firstName} {doctor.lastName}
              </Text>
              <Badge color="pink">{doctor.specialization}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {doctor.experience} Years of Experience
            </Text>
            <Text size="sm">
              Consultation Hours : {doctor.schedule[0]} - {doctor.schedule[1]}
            </Text>
          </Paper>
          <Divider my="sm" />
          <div className="flex justify-between">
            <form className="flex gap-5">
              <Group>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "This field is required." }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DatePickerInput
                      label="Appointment Date"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      p="xl"
                      placeholder="Select Date"
                      minDate={new Date()}
                      maxDate={dayjs(new Date()).add(3, "month").toDate()}
                      firstDayOfWeek={0}
                    />
                  )}
                />
                {errors.apptTime && (
                  <span className="text-red-500">
                    {errors.apptTime.message}
                  </span>
                )}
                <Controller
                  control={control}
                  name="time"
                  rules={{ required: "This field is required." }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TimeInput
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      p="xl"
                      label="Appointment Time"
                    />
                  )}
                />
                {errors.apptTime && (
                  <span className="text-red-500">
                    {errors.apptTime.message}
                  </span>
                )}
                <Button ml="xl" onClick={checkAvailability}>
                  Check Availability
                </Button>
                <Button ml="xl" onClick={onSubmit}>
                  Book Appt
                </Button>
              </Group>
            </form>
            <Card shadow="sm" p="lg" radius="md">
              <Text size="sm">
                <span className="font-medium">Contact</span> {doctor.contact}
              </Text>
              <Text size="sm">
                <span className="font-medium">Website</span>{" "}
                <a
                  className="text-blue-500"
                  rel="noopener noreferrer"
                  href={`https://${doctor.website}`}
                  target="_blank"
                >
                  Open in new tab
                </a>
              </Text>
              <Text size="sm">
                <span className="font-medium">Address</span> {doctor.address}
              </Text>
              <Text size="sm">
                <span className="font-medium">Consultation Fee</span> $
                {doctor.costPerConsult}
              </Text>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
