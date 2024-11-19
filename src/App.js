// import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddService from './admin/AddService';
import AddPackage from './admin/Addpackage';
import AdminRegister from './admin/AdminRegister';
import ALogin from './admin/ALogin';
import EditPackage from './admin/EditPackage';
import ViewPackage from './admin/ViewPackage';
import ViewService from './admin/ViewService';
import EditService from './admin/EditService';
import AddTeam from './admin/AddTeam';
import ViewTeam from './admin/ViewTeam';
import Dashboard from './admin/Dashboard';
import UserLogin from './website/pages/UserLogin';
import Signup from './website/pages/Signup';
import Index1 from './website/pages/Index1';
import About from './website/pages/About';
import Services from './website/pages/Services';
import Booking from './website/pages/Booking';
import TravelGuide from './website/pages/TravelGuide';
import Destination from './website/pages/Destination';
import Packages from './website/pages/Packages';
import Page404 from './website/common/Page404';
import Contact from './website/pages/Contact';
function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Routes>
        {/* Admin View */}
        
        <Route path='/adminLogin' element={<ALogin />} />
        <Route path='/adminSignup' element={<AdminRegister />} />
        
        <Route path='/add-package' element={<AddPackage />} />
        <Route path='/view-package' element={<ViewPackage />} />
        <Route path='/edit-package' element={<EditPackage />} />

        <Route path='/add-service' element={<AddService />} />
        <Route path='/view-service' element={<ViewService />} />
        <Route path='/edit-service' element={<EditService />} />

        <Route path='/add-team' element={<AddTeam />} />
        <Route path='/view-team' element={<ViewTeam />} />


        <Route path='/dashboard' element={<Dashboard />} />



        {/* User View */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/' element={<Index1 />} />
        <Route path='/about' element={<About />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/services' element={<Services />} />
        <Route path='/team' element={<TravelGuide />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/destination' element={<Destination />} />




        <Route path='/*' element={<Page404 />} />

      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
  );
}

export default App;
