import { Card, Group, Text, Badge, Button } from "@mantine/core";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "dayjs/locale/en-sg.js";

dayjs.locale("en-sg");
dayjs.extend(customParseFormat);
const AppointmentDoctor = ({ appointment, index, handleEdit }) => {
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

  const handleApprove = async (index, appointment) => {
    appointment.status = "approved";
    handleEdit(index, appointment);
  };

  const handleReject = async (index, appointment) => {
    appointment.status = "rejected";
    handleEdit(index, appointment);
  };

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>
            {appointment.userId.firstName} {appointment.userId.lastName}
          </Text>
        </Group>

        <Text size="sm">
          <span className="font-medium">Contact</span>{" "}
          {appointment.userId.contact}
        </Text>
        <Text size="sm">
          <span className="font-medium">Email</span> {appointment.userId.email}
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
          <div className="flex gap-2">
            {appointment.status === "pending" && (
              <Button color="red" mt="md" radius="md" onClick={()=>handleReject(index, appointment)}>
                Reject
              </Button>
            )}
            {appointment.status === "pending" && (
              <Button color="green" mt="md" radius="md" onClick={()=>handleApprove(index, appointment)}>
                Approve
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentDoctor;
