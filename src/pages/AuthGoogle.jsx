import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const AuthGoogle = () => {

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token')
    const userid = new URLSearchParams(search).get('userid')

    Cookies.set('token', token);
    Cookies.set('userId', userid);
    useEffect(() => {
        setTimeout(() => {
            navigate("/home");
        }, 3000);
    }, []);

    return (
        <div>
            Mengalihkan ke halaman Beranda
        </div>
    );
}

export default AuthGoogle;
