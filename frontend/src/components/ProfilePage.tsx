import React, { useEffect, useState } from 'react';
import "../css/ProfilePage.css";
import { useNavigate } from 'react-router-dom';

type UserType = 'employee' | 'employer';

function ProfilePage() {
    const [userType, setUserType] = useState<UserType | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const userType = localStorage.getItem('userType') as UserType;

            if (!userId || !userType) {
                navigate('/');
                return;
            }

            setUserType(userType);

            try {
                const response = await fetch(
                    `https://jobfinder-latest.onrender.com/api/${userType}/${userId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userType') as UserType;

        if (!userId || !userType) {
            return;
        }

        try {
            const response = await fetch(
                `https://jobfinder-latest.onrender.com/api/${userType}/update/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (response.ok) {
                console.log('Profile updated successfully');
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            navigate('/profile');
        }
    };

    if (!userData) return <div>Loading...</div>;

    return (
        <div className="profile-page-container">
            <h1 className="profile-page-title">{isEditing ? 'Edit Profile' : 'Profile'}</h1>
            <form onSubmit={handleSubmit} className="profile-page-form">
                {userType === 'employee' && (
                    <>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    disabled
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={userData.age}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Competences</label>
                                <input
                                    type="text"
                                    name="competences"
                                    value={userData.competences}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Picture URL</label>
                                <input
                                    type="text"
                                    name="picture"
                                    value={userData.picture}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Bio</label>
                                <textarea
                                    name="bio"
                                    value={userData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-textarea"
                                />
                            </div>
                        </div>
                    </>
                )}

                {userType === 'employer' && (
                    <>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={userData.companyName || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Company Email</label>
                                <input
                                    type="email"
                                    name="companyEmail"
                                    value={userData.companyMail || ""}
                                    onChange={handleChange}
                                    disabled
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={userData.contactNumber || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={userData.location || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-row">
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Company Picture URL</label>
                                <input
                                    type="text"
                                    name="picture"
                                    value={userData.picture || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                            <div className="profile-page-form-group">
                                <label className="profile-page-form-label">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={userData.salary || ""}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="profile-page-form-input"
                                />
                            </div>
                        </div>
                        <div className="profile-page-form-group">
                            <label className="profile-page-form-label">Bio</label>
                            <textarea
                                name="bio"
                                value={userData.bio || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="profile-page-form-textarea"
                            />
                        </div>
                        <div className="profile-page-form-group">
                            <label className="profile-page-form-label">Expectations</label>
                            <textarea
                                name="expectations"
                                value={userData.expectations || ""}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="profile-page-form-textarea"
                            />
                        </div>
                    </>
                )}

                <div className="profile-page-form-actions">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className={`profile-page-form-button profile-page-edit-button ${isEditing ? 'edit-button' : ''}`}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    {isEditing && (
                        <button
                            type="submit"
                            className="profile-page-form-button"
                        >
                            Save
                        </button>
                    )}
                </div>
            </form>

        </div>
    );
}

export default ProfilePage;
