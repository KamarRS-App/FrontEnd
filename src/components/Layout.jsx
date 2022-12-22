import React, { Children } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className='bg-white'>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
