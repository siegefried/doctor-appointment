import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom/dist';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {

  return (
    <MantineProvider>
      <h1>Placeholder</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
