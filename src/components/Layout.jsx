import React, { Children } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';

const Layout = ({ children, isActive }) => {
    const name = Cookies.get('name');

    return (
        <div className='bg-white'>
            <Navbar isAuth={name && true} nameUser={name} isActive={isActive} />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
