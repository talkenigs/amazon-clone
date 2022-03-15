import './App.css';
import React, { useEffect } from "react";
import Header from './Header';
import Checkout from './Checkout/Checkout';
import Home from './Home';
import Payment from './Payment';
import { BrowserRouter as Router, Routes , Route, Link } from "react-router-dom";
import Login from './Login/Login';
import { auth } from './firebase'
import { useStateValue } from './StateProvider/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders/Orders';

const promise = loadStripe('apikey');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('user', authUser)

      if(authUser) {

        dispatch({
          type: 'SET_USER',
          user: authUser
        })

      } else {

        dispatch({
          type: 'SET_USER',
          user: null
        })
      } 

    })
  }, [])

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/" element={<><Header /><Home /></>} />

        <Route path="/checkout" element={<><Header /><Checkout /></>} />

        <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />

      </Routes>
    </Router>
  );
}

export default App;
