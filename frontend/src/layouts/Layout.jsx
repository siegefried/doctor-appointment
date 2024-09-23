import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "../components/SideBar";

const Layout = ({ children }) => {
    const [opened, { toggle }] = useDisclosure();
  return (
    <div className="p-5">
      <div className="flex">
        <Sidebar />
        <div className="content w-full">
          <div className="header bg-white rounded-md shadow shadow-gray-400 mb-5 min-h-20 w-full">header</div>
          <div className="body bg-white rounded-md shadow shadow-gray-400 min-h-80 w-full">{children}</div>
        </div>
      </div>
    </div>
  );

// return (
//     <AppShell
//       header={{ height: 60 }}
//       navbar={{
//         width: 300,
//         breakpoint: 'sm',
//         collapsed: { mobile: !opened },
//       }}
//       padding="md"
//     >
//       <AppShell.Header>
//         <Burger
//           opened={opened}
//           onClick={toggle}
//           hiddenFrom="sm"
//           size="sm"
//         />
//         <div>Doc Appt</div>
//       </AppShell.Header>

//       <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

//       <AppShell.Main>Main</AppShell.Main>
//     </AppShell>
//   );
};

export default Layout;
