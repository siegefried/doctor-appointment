import { Card, Group, Text, Badge, Button } from "@mantine/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/en-sg.js";

dayjs.locale("en-sg");
dayjs.extend(customParseFormat);

const Appointment = ({ appointment, index, handleDelete }) => {
  let badgeColor = "";
  if (appointment.status === "pending") {
    badgeColor = "gray";
  }
  if (appointment.status === "approved") {
    badgeColor = "green";
  }
  if (appointment.status === "rejected") {
    badgeColor = "red";
  }

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>
            {appointment.doctorId.firstName} {appointment.doctorId.lastName}
          </Text>
          <Badge color="pink">{appointment.doctorId.specialization}</Badge>
        </Group>

        <Text size="sm">
          <span className="font-medium">Contact</span>{" "}
          {appointment.doctorId.contact}
        </Text>
        <Text size="sm">
          <span className="font-medium">Address</span>{" "}
          {appointment.doctorId.address}
        </Text>
        <Text size="sm">
          <span className="font-medium">Consultation Fee</span> $
          {appointment.doctorId.costPerConsult}
        </Text>
        <Text size="sm">
          <span className="font-medium">Appointment</span>
          {<br />}
          {dayjs(appointment.date).format("dddd, MMMM D, YYYY")} -{" "}
          {appointment.time}
        </Text>
        <div className="flex flex-col items-center justify-between">
          <Badge color={badgeColor} mt="md">
            {appointment.status}
          </Badge>
          <Button
            color="pink"
            mt="md"
            radius="md"
            onClick={() => handleDelete(index, appointment)}
          >
            Cancel Appt
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Appointment;
