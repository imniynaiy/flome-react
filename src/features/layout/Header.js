import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import { logout } from '../user/userSlice';
import { useNavigate } from "react-router-dom";

export function Header(props) {
    const { title } = props;

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                {props.isLogin ? <LogoutButton /> : <LoginButton />}
            </Toolbar>
        </React.Fragment>
    );
}


const LoginButton = () => {
    const navigate = useNavigate()
    return (
    <Button variant="outlined" size="small" onClick={() => navigate(`/login`)}>
    Login
</Button>)
}

const LogoutButton = () => {
    const dispatch = useDispatch()
    return (
    <Button variant="outlined" size="small" onClick={() => {
        dispatch(logout())
    }}>Logout
</Button>)
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    isLogin: PropTypes.bool.isRequired,
};