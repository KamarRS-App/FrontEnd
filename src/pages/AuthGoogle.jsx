import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../components/Loading';
import { addUsers } from '../features/userSlice';
import api from '../services/api';

const AuthGoogle = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token')
    const userid = new URLSearchParams(search).get('userid')
    const dispatch = useDispatch();

    Cookies.set('token', token);
    Cookies.set('userId', userid);
    console.log(token)

    const getUser = async () => {
        await api.getUser(token)
            .then(response => {
                const data = response.data.data;
                dispatch(addUsers(data))
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        getUser();
        setTimeout(() => {
            navigate("/home");
        }, 2000);
    }, []);

    return (
        <Loading body={'Sedang Mengalihkan Halaman...'}/>
    );
}

export default AuthGoogle;
