import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import Header from './components/layout/header/Header';
import Courses from './components/courses/Courses';
import Footer from './components/layout/footer/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Contact from './components/auth/contact/contact';
import Request from './components/request/Request';
import About from './components/about/About';
import Subscribe from './components/payments/Subscribe';
import NotFound from './components/layout/notFound/NotFound';
import PaymentFail from './components/payments/PaymentFail';
import PaymentSuccess from './components/payments/PaymentSuccess';
import CoursePage from './components/Course/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import DashBoard from './components/Admin/Dashboard/DashBoard';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Users from './components/Admin/Users/Users';

function App() {

  // Used For not select the video using inspect
  // window.addEventListener('contextmenu',(e)=>{
  //   e.preventDefault();
  // })
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />



      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<DashBoard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/createcourse" element={<CreateCourse />} />
      <Route path="/admin/users" element={<Users />} />




      {/* Page Note Found Route */}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
} 

export default App;
