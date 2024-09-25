import { Card, Group, Text, Badge, Button } from "@mantine/core";
import { useLoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom/dist";

const Doctor = ({ doctor }) => {
  const { user } = useLoginContext();
  const navigate = useNavigate();
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>
            {doctor.firstName} {doctor.lastName}
          </Text>
          <Badge color="pink">{doctor.specialization}</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          {doctor.experience} Years of Experience
        </Text>

        <Text size="sm">
          <span className="font-medium">Contact</span> {doctor.contact}
        </Text>
        <Text size="sm">
          <span className="font-medium">Address</span> {doctor.address}
        </Text>
        <Text size="sm">
          <span className="font-medium">Consultation Fee</span> $
          {doctor.costPerConsult}
        </Text>
        <Text size="sm">
          <span className="font-medium">Consultation Hours</span>{" "}
          {doctor.schedule[0]} - {doctor.schedule[1]}
        </Text>
        {user.role === "user" && (
          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => navigate(`/book/${doctor._id}`)}
          >
            Book Appt
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Doctor;
