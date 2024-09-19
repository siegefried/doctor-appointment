import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import { Route, Routes } from 'react-router-dom/dist';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {

  return (
    <MantineProvider>
      <Notifications position='top-center'/>
      <h1>Placeholder</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
