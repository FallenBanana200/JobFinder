import React from "react";
import "../css/SwipeButtons.css"
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from "@mui/material";

interface SwipeButtonsProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
    return (
        <div className="swipeButtons">
            <IconButton className="swipeButtons__left" onClick={onSwipeLeft}>
                <CloseIcon fontSize="medium" />
            </IconButton>
            <IconButton className="swipeButtons__right" onClick={onSwipeRight}>
                <ThumbUpIcon fontSize="medium" />
            </IconButton>
        </div>
    )
}

export default SwipeButtons;