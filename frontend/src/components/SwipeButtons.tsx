import React from "react";
import "../css/SwipeButtons.css"
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { IconButton } from "@mui/material";

function SwipeButtons() {
    return (
        <>
            <div className="swipeButtons">
                {/* <IconButton className="swipeButtons__repeat">
                    <ReplayIcon fontSize="medium" />
                </IconButton> */}
                <IconButton className="swipeButtons__left">
                    <CloseIcon fontSize="medium" />
                </IconButton>
                {/* <IconButton className="swipeButtons__star">
                    <StarRateIcon fontSize="medium" />
                </IconButton> */}
                <IconButton className="swipeButtons__right">
                    <ThumbUpIcon fontSize="medium" />
                </IconButton>
                {/* <IconButton className="swipeButtons__lightning">
                    <FlashOnIcon fontSize="medium" />
                </IconButton> */}
            </div>

        </>
    )
}

export default SwipeButtons