import React from "react";
import "../css/SwipeButtons.css"
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { IconButton } from "@mui/material";

interface SwipeButtonsProps {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
    return (
        <div className="swipeButtons">
            <IconButton className="swipeButtons__repeat">
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__left" onClick={onSwipeLeft}>
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__star">
                <StarRateIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__right" onClick={onSwipeRight}>
                <ThumbUpIcon fontSize="large" />
            </IconButton>
            <IconButton className="swipeButtons__lightning">
                <WatchLaterIcon fontSize="large" />
            </IconButton>
        </div>
    )
}

export default SwipeButtons;