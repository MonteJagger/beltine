import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/home/Home';
import About from '@/pages/about/About';
import Contact from '@/pages/contact/Contact';
import Login from '@/pages/login/Login';
import Layout from '@/components/layout/Layout';
import CreateAccount from '@/pages/create-account/CreateAccount';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='create-account' element={<CreateAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
