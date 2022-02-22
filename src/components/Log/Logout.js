import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
const Logout = () => {

    const removeCookie = (key) =>{
        if(window != undefined){
            cookie.remove(key, {expires: 1});
        }
    }
    const logout = () =>{
         axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            removeCookie('jwt');
            // return true;
            
    })
    // .then((res) =>{
    //     console.log(res);
    //      window.location = "/"})
        .catch((err) => console.log(err));

        window.location = "/profil"   
    }
    return (
        <li onClick= {logout}>
            <img src="https://cutt.ly/MOGiskq" alt="" />
        </li>
    );
};

export default Logout;