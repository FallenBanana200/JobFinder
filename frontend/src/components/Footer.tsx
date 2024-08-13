import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';
import PlaceIcon from '@mui/icons-material/Place';
import Slider from '@mui/material/Slider';
import MapIcon from '@mui/icons-material/Map';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AppsIcon from '@mui/icons-material/Apps';
import "../css/Footer.css";
import { Link } from 'react-router-dom';

function valuetext(value: number) {
    return `${value} km`;
}

function Footer() {
    const [filter, setFilter] = React.useState('');
    const [userType, setUserType] = React.useState<string>('');

    React.useEffect(() => {
        const type = localStorage.getItem("userType") || "employee";
        setUserType(type);
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

    return (
        <div className="footer">
            <Link to={"/types"}>
                <IconButton className='footer-item'>
                    <AppsIcon fontSize='large' />'
                </IconButton>
            </Link>
            <Box sx={{ minWidth: 120, paddingTop: 2, paddingBottom: 2 }} className="footer-item">
                <FormControl fullWidth variant="standard">
                    <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={filter}
                        label="Filter"
                        onChange={handleChange}
                        sx={{ height: 40 }}
                    >
                        <MenuItem value={""}>Reset</MenuItem>
                        {userType === "employee" ? (
                            <>
                                <MenuItem value={"Highest Salary"}>Highest Salary <AttachMoneyIcon fontSize='small' /></MenuItem>
                                <MenuItem value={"Closest Range"}>Closest Range <PlaceIcon fontSize='small' /></MenuItem>
                                <MenuItem value={"Highest rated"}>Highest rated <GradeIcon fontSize='small' /></MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem value={"Expected Salary"}>Expected Salary <AttachMoneyIcon fontSize='small' /></MenuItem>
                                <MenuItem value={"Closest Range"}>Closest Range <PlaceIcon fontSize='small' /></MenuItem>
                                <MenuItem value={"Highest rated"}>Highest rated <GradeIcon fontSize='small' /></MenuItem>
                            </>
                        )}
                    </Select>
                </FormControl>
            </Box>
            <Link to={"/map"} >
                <IconButton className='footer-item'>
                    <MapIcon fontSize='large' />
                </IconButton>
            </Link>
        </div>
    );
}

export default Footer;
