import React, { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import amazonLogo from "../../assets/amazonLogo.png"; // We need this unless we use a direct url in the img's src.
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../utils/firebase";
import { Type } from "../../utils/action.type";

function Header() {
  // const [state,dispatch]=useContext(DataContext) // Destructuring "state" we can access basket as used below
  const [{ basket, user }, dispatch] = useContext(DataContext);
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img src={amazonLogo} alt="amazon logo" />
              </Link>
              {/* Logo image sourced from assets pngimg.com */}
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Deliver to</p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </div>
            {/* search section */}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" />
              <BsSearch size={38} />
            </div>
            {/* other section */}
            <div className={classes.order_container}>
              <Link to="" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                  alt=""
                />
                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              {/* <Link to={user ? "#" : "/auth"}> 
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link> */}
              {/* ************************************The block above worked fine but the Link to=...."#" needed improvement (code from lesson)*/}
              {/* {user ? (
                <div
                  className={classes.authSection} //******************Needed some additions on the Header.module.css file to add the hover effect
                  onClick={() => auth.signOut()}
                  style={{ cursor: "pointer" }}
                >
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span>Sign Out</span>
                </div>
              ) : (
                <Link to="/auth" className={classes.authSection}> 
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </Link> 
              )} */}
              {/* ************************************Link is only utilized when there isn't a logged in user. But this block of code still needs improvement to add functionality that clears off items in the cart when a user logs out. ((block of code not from lesson))*/}
              {user ? (
                <div
                  className={classes.authSection}
                  onClick={() => {
                    //****************************Does three things on SignOut, empties local storage, empties basket state and logs the user out  (block of code not from lesson)*/
                    // Clear cart in context state
                    dispatch({ type: Type.EMPTY_BASKET });

                    // Remove cart from localStorage
                    localStorage.removeItem("basket");

                    // Sign out
                    auth.signOut();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span>Sign Out</span>
                </div>
              ) : (
                <Link to="/auth" className={classes.authSection}>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </Link>
              )}

              <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span>
              </Link>
              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{basket.length}</span>
              </Link>
            </div>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
}

export default Header;
