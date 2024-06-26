import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Productdetail from './components/Product/Productdetail'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { useAuth } from './services/Auth_context'
import Loading from './GlobalComponents/Loading/Loading'
import Cart from './components/Cart/Cart'
import Profile from './components/Profile/Profile'

const RouterComp = () => {
  const {isloading} =useAuth();
  if(isloading){
    return <Loading/>;
  }
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/Product/:id' element={<Productdetail />} />
    <Route path='/signup' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/profile' element={<Profile />} />
  </Routes>
  )
}

export default RouterComp;
