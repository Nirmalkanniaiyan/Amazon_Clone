import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {

  const [{basket, user}] = useStateValue();

  const handleAuthentication = () => {
    if(user){
      auth.signOut();
    }
  }

  return (
    <div className="header">
      <Link to = "/">
      <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        ></img>
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header__searchIcon" />
      </div>

      {/* The following situation is taken care .... if the user is already logged in it will just sign out and remain in the home page
          if the user is not logged in on clicking this it will redirect to the login page */}

       <div className="header__nav">            {/* a better explanation of the below comment is given by the above comment*/}
         <Link to={ !user && '/Login'}> {/* this means if user is not there means redirect it to login page*/}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne"> Hello {user ? user?.email : 'Guest'} </span>
            <span className="header__optionLineTwo">
            <b> {user ? 'SignOut' : 'Sign In'}</b>
            </span>
          </div>
        </Link>

        <Link to ='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne"> Return </span>
            <span className="header__optionLineTwo">
              <b>& Orders</b>
            </span>
          </div>
        </Link> 

        <div className="header__option">
          <span className="header__optionLineOne"> Your </span>
          <span className="header__optionLineTwo">
            <b> Prime </b>
          </span>
        </div>

        <Link to ="/checkout">
          <div className="header__optionBasket">
          <ShoppingBasketIcon></ShoppingBasketIcon>
          <span className="headerbasketCount">{basket?.length}</span>
          {/* ? is called optional chaining , if the basket becomes undefined due to an error it will handle the error and  it will just terminate */}
          </div>
        </Link>
        
      </div>
    </div>
  );
}

export default Header;
