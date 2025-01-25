import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/home/Home';
import About from '@/pages/about/About';
import Contact from '@/pages/contact/Contact';
import Login from '@/pages/login/Login';
import Layout from '@/components/layout/Layout';
import CreateAccount from '@/pages/create-account/CreateAccount';
import NotFound from '@/pages/not-found/NotFound';
import Account from '@/pages/account/Account';
import { AuthProvider } from '@/context/authContext';

function App() {
  return (
    // By wrapping the entire application with AuthProvider, 
    // this ensures that useAuthContext can be used in any component
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* the children of / path will be inside Layout as the Outlet */}
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='create-account' element={<CreateAccount />} />
            <Route path='create-account' element={<CreateAccount />} />
            <Route path='account' element={<Account />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
