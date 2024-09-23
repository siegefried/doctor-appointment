import { Link } from "react-router-dom";
import { FaHome, FaListAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const menu = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Appointments",
      link: "/appointments",
      icon: <FaListAlt />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <FaUser />,
    },
    {
      name: "Logout",
      link: "/logout",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <div className="p-2 sidebar rounded-md shadow shadow-gray-400 bg-blue-600 mr-5 min-h-screen min-w-40">
      <h1>D Appt</h1>
      <div className="menu">
        {menu.map((item) => (
          <Link to={item.link} key={item.name}>
            <div className="flex">
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-item">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
