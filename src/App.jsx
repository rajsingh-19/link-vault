import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Landing from './pages/landing/Landing';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Category from './pages/category/Category';
import Links from './pages/links/Links';
import Appearance  from './pages/appearance/Appearance';
import Analytics from './pages/analytics/Analytics';
import Settings from './pages/settingpage/Settings';
import NotFound from "./pages/notfound/NotFound";
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category' element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path='/links' element={<ProtectedRoute><Links /></ProtectedRoute>} />
        <Route path='/appearance' element={<ProtectedRoute><Appearance /></ProtectedRoute>} />
        <Route path='/analytics' element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/profile/:userId/:token" element={<Profile />} />
        {/* Catch all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
