import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";

// imports for stripe
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./Orders";


const promise = loadStripe("pk_test_51MZuuRSBtHjplQmupdVC7wunvEurYMfGGfjqitOA5tYHSjv3kKjxmMKg1zokfwJ24FWSSNniKRt1ESedo44JCZOv00rECa8tpA");
// loadstripe loads the stripe.js and initalizes a stripe object 
// the loadstripe is called with your publishable key
// The Stripe publishable key is used to identify your account with Stripe


function App() {

  const [{},dispatch] = useStateValue();

  useEffect(() => {
    // will run once when the app is loaded

    //  this is a listener
    auth.onAuthStateChanged ((authUser) => {
      console.log('The user is >> ',authUser);

      if(authUser){
        // then the user is already logged in or just logged in , even if u refresh the page u will be logged in
        
        //it will shoot the user into the data layer
        dispatch({
          type : 'SET_USER',
          user : authUser,
        })
      }else{
        // the user is logged out

        //it will eradicate the user in the data layer
        dispatch({
          type : 'SET_USER',
          user : null,
        })
      }
    });
    
  }, []);


  return (
    //BEM (Block, Element, Modifier) is a naming convention for classes in HTML and CSS
    
    /** Block - they should have only one name 
        Element - they should have the first name of the block and the second name should describe the element ex main__img
        Modifier - they should be added along with the element name in case they require a special class name ex main__img-special
     */

    <Router>
      <div className="app">
        <Routes>

          <Route
            path="/orders"
            element={[<Header></Header>,<Orders></Orders>]}
          />

          <Route
            path="/login"
            element={[<Login></Login>]}
          />

          <Route
            path="/checkout"
            element={[<Header></Header>,<Checkout></Checkout>]}
          />

          <Route
            path="/payment"
            element={[<Header></Header>,
               <Elements stripe={promise}> 
                  <Payment></Payment>
              </Elements>
          ]}
          />
           {/* The Elements allows you to use Element components and access the Stripe object */}
           {/* Element components provide a flexible way to securely collect payment information in your React app. */}
          
          <Route 
            path="/" 
            element={[<Header></Header>,<Home></Home>,]} 
          />

        </Routes>
      </div>

    </Router>
  );
}

export default App;
