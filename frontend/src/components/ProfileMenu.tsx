import React from 'react';
import "../css/ProfileMenu.css"
import { useNavigate } from 'react-router-dom';

function ProfileMenu() {
    const navigate = useNavigate();

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
            <button onClick={handleEditProfile}>Edit Profile</button>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default ProfileMenu;
