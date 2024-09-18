import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom/dist';
import Register from './pages/Register';


function App() {

  return (
    <MantineProvider>
      <h1>Placeholder</h1>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </MantineProvider>
  )
}

export default App
