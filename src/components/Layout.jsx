import React, { Children } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

const Layout = ({ children, isActive }) => {
    const user = useSelector((state) => state.users);

    return (
        <div className='bg-white'>
            <Navbar isAuth={user && true} nameUser={user.nama} isActive={isActive} />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
