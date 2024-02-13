import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Loader/Loader';

function App() {
  // Used For not select the video using inspect
  // window.addEventListener('contextmenu',(e)=>{
  //   e.preventDefault();
  // })
  const { isAuthenticated, user, error, message, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route path="/forgetpassword" element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect={"/profile"}>
                <ForgotPassword />
              </ProtectedRoute>
            } />
            <Route path="/resetpassword/:token" element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                <ResetPassword />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe />
                </ProtectedRoute>
              }
            />
            <Route path="/paymentfail" element={<PaymentFail />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile  user={user?.user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  redirect="/profile"
                  isAdmin={user && user.role === 'admin'}
                >
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  isAdmin={user && user.role === 'admin'}
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  redirect="/profile"
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/createcourse" element={
              <ProtectedRoute
                isAdmin={user && user.role === "admin"}
                adminRoute={true}
                isAuthenticated={isAuthenticated}
                redirect="/profile"
              >
                <CreateCourse />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute
                isAdmin={user && user.role=== "admin"}
                adminRoute={true}
                isAuthenticated={isAuthenticated}
                redirect="/profile"
              >
                <Users />
              </ProtectedRoute>
            } />

            {/* Page Note Found Route */}

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
