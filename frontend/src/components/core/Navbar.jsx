import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import logo from '../../assests/logos/Studynotionlogo.svg';
import { NavbarLinks } from '../../components/core/HomePag/data/NavbarLink';
import {  useSelector } from 'react-redux';

const Navbar = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const {totalItems} = useSelector((state)=>state.cart);
 
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex flex-row w-11/12 max-w-maxContent items-center justify-between'>
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
      <div className='flex gap-x-4 items-center'>
        {
          ''
        }
        </div>

    </div>
  );
};

export default Navbar;
