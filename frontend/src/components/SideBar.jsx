import { Link } from "react-router-dom";
import { FaHome, FaListAlt, FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useLoginContext } from "../contexts/LoginContext";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const { user } = useLoginContext();
  const adminMenu = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Doctors",
      link: "/doctors",
      icon: <FaListAlt />,
    },
    {
        name: "Add Doctor",
        link: "/doctors/new",
        icon: <IoMdPersonAdd />,
    },
    {
      name: "Users",
      link: "/users",
      icon: <FaListAlt />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <FaUser />,
    },
  ];

  const doctorMenu = [
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
  ]

  const userMenu = [
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
  ];

  const menuToRender = user?.role === "admin" ? adminMenu : user?.role === "doctor" ? doctorMenu : userMenu

  return (
    <div className="p-2 sidebar rounded-md shadow shadow-gray-400 bg-blue-600 mr-5 min-h-screen min-w-40">
      <h1 className="text-white text-3xl mb-24">D Appt</h1>
      <div className="menu">
        {menuToRender.map((item) => (
          <Link to={item.link} key={item.name}>
            <div className="flex items-center justify-between mt-8 rounded-md hover:bg-blue-400">
              <div className="menu-icon text-white">{item.icon}</div>
              <div className="menu-item text-white">{item.name}</div>
            </div>
          </Link>
        ))}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
