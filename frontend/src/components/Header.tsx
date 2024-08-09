import React from "react"
import "../css/Header.css";
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from "react-router-dom";

function Header({ backButton }) {
    const history = useNavigate();
    return (
        <>
            <div className="header">
                {backButton ? (
                    <IconButton onClick={() => history(backButton)}>
                        <ArrowBackIosIcon fontSize="large" className="header__icon" />
                    </IconButton>
                ) : (
                    <IconButton>
                        <PersonIcon className="header__icon" fontSize="large" />
                    </IconButton>
                )}

                <Link to="/">
                    <img
                        className="header__logo"
                        src="https://s3u.tmimgcdn.com/u37752224/157d948818e506df9d322b29114d6dca.gif"
                        alt="JobFinder-logo" />
                </Link>
                <Link to="/chat">
                    <IconButton>
                        <ForumIcon className="header__icon" fontSize="large" />
                    </IconButton>
                </Link>
            </div>
        </>
    );
}

export default Header;