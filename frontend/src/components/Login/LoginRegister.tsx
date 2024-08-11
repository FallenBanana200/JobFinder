import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/LoginRegister.css";

type UserType = 'employee' | 'employer' | null;
type FormMode = 'login' | 'signup';

const LoginSignUpForm: React.FC = () => {
    const [formMode, setFormMode] = useState<FormMode>('login');
    const [userType, setUserType] = useState<UserType>('employee');

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const [employeeData, setEmployeeData] = useState({
        name: '',
        lastName: '',
        age: '',
        bio: '',
        competences: '',
        picture: '',
        email: '',
        password: '',
    });

    const [employerData, setEmployerData] = useState({
        companyName: '',
        companyMail: '',
        contactNumber: '',
        location: '',
        bio: '',
        expectations: '',
        picture: '',
        salary: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleFormModeToggle = () => {
        setFormMode(prevMode => (prevMode === 'login' ? 'signup' : 'login'));
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeeData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployerData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formMode === 'login') {
            try {
                let userFound = false;
                let userId = '';

                let response = await fetch(`https://jobfinder-latest.onrender.com/api/employee/${loginData.email}`);

                if (response.ok) {
                    let data = await response.json();
                    if (data && data.password === loginData.password) {
                        userId = loginData.email;
                        localStorage.setItem('userType', 'employee');
                        userFound = true;
                    }
                }

                if (!userFound) {
                    response = await fetch(`https://jobfinder-latest.onrender.com/api/employer/${loginData.email}`);

                    if (response.ok) {
                        let data = await response.json();
                        if (data && data.password === loginData.password) {
                            userId = loginData.email;
                            localStorage.setItem('userType', 'employer');
                            userFound = true;
                        }
                    }
                }

                if (userFound) {
                    localStorage.setItem('userId', userId);
                    console.log('Login successful!');
                    navigate('/app');
                } else {
                    console.log('Invalid email or password.');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        } else if (formMode === 'signup') {
            try {
                let endpoint = userType === 'employee'
                    ? 'https://jobfinder-latest.onrender.com/api/employee/create'
                    : 'https://jobfinder-latest.onrender.com/api/employer/create';

                let response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userType === 'employee' ? employeeData : employerData),
                });

                let responseText = await response.text();

                if (response.ok) {
                    console.log('Signup successful:', responseText);

                    if (userType === 'employee') {
                        setEmployeeData({
                            name: '',
                            lastName: '',
                            age: '',
                            bio: '',
                            competences: '',
                            picture: '',
                            email: '',
                            password: '',
                        });
                    } else {
                        setEmployerData({
                            companyName: '',
                            companyMail: '',
                            contactNumber: '',
                            location: '',
                            bio: '',
                            expectations: '',
                            picture: '',
                            salary: '',
                            password: '',
                        });
                    }

                    setFormMode('login');
                } else {
                    console.error('Signup failed:', responseText);
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }
        }
    };




    return (
        <div className="login-register-page">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={handleSubmit} className={`auth-form ${formMode}-form`}>
                        <h3>{formMode === 'login' ? 'Sign In' : 'Sign Up'}</h3>
                        {formMode === 'login' ? (
                            <>
                                <div className="form-group full-width">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="form-group full-width d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group full-width">
                                    <select
                                        className="form-control"
                                        value={userType || 'employee'}
                                        onChange={(e) => setUserType(e.target.value as UserType)}
                                    >
                                        <option value="employee">Looking for a Job</option>
                                        <option value="employer">Offering a Job</option>
                                    </select>
                                </div>

                                {userType === 'employee' ? (
                                    <>
                                        <div className="form-row">
                                            <div className="form-group half-width">
                                                <label>First name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First name"
                                                    name="name"
                                                    value={employeeData.name}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Last name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Last name"
                                                    name="lastName"
                                                    value={employeeData.lastName}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group half-width">
                                                <label>Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={employeeData.email}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Enter password"
                                                    name="password"
                                                    value={employeeData.password}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group half-width">
                                                <label>Age</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Age"
                                                    name="age"
                                                    value={employeeData.age}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Competences</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Competences"
                                                    name="competences"
                                                    value={employeeData.competences}
                                                    onChange={handleEmployeeChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Bio</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Bio"
                                                name="bio"
                                                value={employeeData.bio}
                                                onChange={handleEmployeeChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Picture URL</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Picture URL"
                                                name="picture"
                                                value={employeeData.picture}
                                                onChange={handleEmployeeChange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="form-group full-width">
                                            <label>Company Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Company Name"
                                                name="companyName"
                                                value={employerData.companyName}
                                                onChange={handleEmployerChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group half-width">
                                                <label>Company Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Company Email"
                                                    name="companyMail"
                                                    value={employerData.companyMail}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Contact Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Contact Number"
                                                    name="contactNumber"
                                                    value={employerData.contactNumber}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group half-width">
                                                <label>Location</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Location"
                                                    name="location"
                                                    value={employerData.location}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                            <div className="form-group half-width">
                                                <label>Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Salary"
                                                    name="salary"
                                                    value={employerData.salary}
                                                    onChange={handleEmployerChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Bio</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Bio"
                                                name="bio"
                                                value={employerData.bio}
                                                onChange={handleEmployerChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Expectations</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Expectations"
                                                name="expectations"
                                                value={employerData.expectations}
                                                onChange={handleEmployerChange}
                                            />
                                        </div>
                                        <div className="form-group full-width">
                                            <label>Picture URL</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Picture URL"
                                                name="picture"
                                                value={employerData.picture}
                                                onChange={handleEmployerChange}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="form-group full-width d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Sign Up
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="form-toggle">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={formMode === 'signup'}
                                    onChange={handleFormModeToggle}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span className="toggle-label">
                                {formMode === 'login' ? 'Do not have an account yet?' : 'Already have an account'}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginSignUpForm;