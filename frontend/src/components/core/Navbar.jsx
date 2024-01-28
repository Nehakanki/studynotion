import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import logo from '../../assests/logos/Studynotionlogo.svg';
import { NavbarLinks } from '../../components/core/HomePag/data/NavbarLink';
import {  useSelector } from 'react-redux';
import { IoCart, IoNutrition } from "react-icons/io5";
import ProfileDropdown from './Auth/ProfileDropdown';

const Navbar = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {totalItems} = useSelector((state)=>state.cart);
 
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className='flex h-14 items-center justify-evenly border-b-[1px] border-b-richblack-700'>
      <div className='flex flex-row w-11/12 max-w-maxContent items-center justify-evenly'>
        {/* Logo Added */}
        <Link to='/'>
          <img src={logo} alt="Main logo" />
        </Link>
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === 'Catalog' ? (
                  <div></div>
                ) : (
                  <Link to={link.path}>
                    <p className={`${matchRoute(link.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
     
      
      {/* login/ SIgnup/Dashboard */}

      {/*  1 . if the user is Student the show the cart and no. of courses bought by him */}
      <div className='flex gap-x-4 items-center'>
      
        {
          user && user?.accountType != 'Instructor' && (
            <Link to='/dashboard/cart' className='relative' >
                <IoCart />
                {/* placing number above the cart */}
                {
                  totalItems >0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
            </Link>
          )
        }
        {/* signup and login button*/}
        {
          token === null && (
            <Link to ="/login">
              <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-25 rounded-md'>
                Login
              </button>
            </Link>
          )
        }
        {/*  */}
        {
            token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-50 rounded-md' >
                  Sign up
                </button>
              </Link>
            )
        }
        {/* login user */}
        {
          token !=null &&  <ProfileDropdown/>
        }
      </div>

    </div>
  );
};

export default Navbar;
