import React, { useEffect, useState } from 'react';
import "../css/ProfileMenu.css"
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/github'
import 'react-social-icons/linkedin'
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import { useNavigate } from 'react-router-dom';

function ProfileMenu() {

    const navigate = useNavigate();

    const userType = localStorage.getItem('userType');

    const employeePicture = "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg";
    const employerPicture = "https://static.wixstatic.com/media/18db72_c70c0a1fbd094fda958a7d624b470eb1~mv2.png";


    const handleEditProfile = () => {
        navigate('/profile/edit');
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        navigate('/');
    };


    return (
        <div className="profile-menu">
            <h1>Profile Menu</h1>
            <img
                src={userType === 'employee' ? employeePicture : employerPicture}
                alt="Profile Picture"
                id="picture"
            />
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button id='logout' onClick={handleLogout}>Log Out</button>
            <div className="parent-container">
                <div className="linka">
                    <SocialIcon url='https://www.github.com' style={{ marginRight: 45 }} />
                    <SocialIcon url='https://www.linkedin.com' style={{ marginRight: 45 }} />
                    <SocialIcon url='https://www.facebook.com' style={{ marginRight: 45 }} />
                    <SocialIcon url='https://www.instagram.com' />
                </div>
            </div>
        </div>
    );
};

export default ProfileMenu;
