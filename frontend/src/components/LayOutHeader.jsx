import { IoMdNotificationsOutline } from "react-icons/io";
import { useLoginContext } from "../contexts/LoginContext";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/userService";
import { Badge } from "@mantine/core";
import { Link } from "react-router-dom";

const LayOutHeader = () => {
  const { user } = useLoginContext();
  const [userInfo, setUserInfo] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await getCurrentUser();
      setUserInfo(response);
    };
    loadUserInfo();
  }, []);
  return (
    <div className="flex items-center justify-between header bg-white rounded-md shadow shadow-gray-400 mb-5 min-h-20 w-full pr-6">
      <span></span>
      <div className="flex items-center">
        <Link className="flex" to={"/notifications"}>
          <IoMdNotificationsOutline size={28} />
          <Badge size="xl" circle>
            <span>{userInfo?.unReadNotifications?.length}</span>
          </Badge>
        </Link>
        <p className="pl-2">{user?.username}</p>
      </div>
    </div>
  );
};

export default LayOutHeader;
