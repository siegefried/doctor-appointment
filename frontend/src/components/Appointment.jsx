import { Card, Group, Text, Badge, Button } from "@mantine/core";

const Appointment = ({ appointment }) => {
    return (
        <div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={700}>
                {appointment.doctorId.firstName} {appointment.doctorId.lastName}
              </Text>
              <Badge color="pink">{appointment.doctorId.specialization}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {appointment.doctorId.experience} Years of Experience
            </Text>
    
            <Text size="sm">
              <span className="font-medium">Contact</span> {appointment.doctorId.contact}
            </Text>
            <Text size="sm">
              <span className="font-medium">Address</span> {appointment.doctorId.address}
            </Text>
            <Text size="sm">
              <span className="font-medium">Consultation Fee</span> $
              {appointment.doctorId.costPerConsult}
            </Text>
            <Text size="sm">
              <span className="font-medium">Consultation Hours</span>{" "}
              {appointment.doctorId.schedule[0]} - {appointment.doctorId.schedule[1]}
            </Text>
            {/* {user.role === "user" && (
              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                onClick={() => navigate(`/book/${appointment.doctorId._id}`)}
              >
                Book Appt
              </Button>
            )} */}
          </Card>
        </div>
      );
};

export default Appointment;