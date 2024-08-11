import React from "react";
import "../css/Header.css";
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";

function Header({ backButton }: { backButton?: string }) {
    return (
        <div className="header">
            {backButton ? (
                <IconButton>
                    <Link to={backButton} className="header__link">
                        <ArrowBackIosIcon fontSize="large" className="header__icon" />
                    </Link>
                </IconButton>
            ) : (
                <IconButton>
                    <Link to="/profile" className="header__link">
                        <PersonIcon className="header__icon" fontSize="large" />
                    </Link>
                </IconButton>
            )}

            <Link to="/app" className="header__link">
                <img
                    className="header__logo"
                    src="https://s3u.tmimgcdn.com/u37752224/157d948818e506df9d322b29114d6dca.gif"
                    alt="JobFinder-logo"
                />
            </Link>
            <Link to="/chat" className="header__link">
                <IconButton>
                    <ForumIcon className="header__icon" fontSize="large" />
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;
