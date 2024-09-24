import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../services/userService";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Logged Out.",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },

    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
      });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="flex items-center justify-between mt-8 rounded-md hover:bg-blue-400" onClick={handleClick}>
      <div className="menu-icon text-white">{<FaSignOutAlt />}</div>                                                                                                                                                                                                                                
      <div className="menu-item text-white">Logout</div>
    </div>
  );
};

export default LogoutButton;
