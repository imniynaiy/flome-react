import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import { validateUser, logout } from '../user/userSlice';
import { useNavigate } from "react-router-dom";

export function Header(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [didLogin, setDidLogin] = React.useState(false)

    React.useEffect(() => {
        setDidLogin(validateUser(user.username, user.expiredAt, user.token))
    }, [user]);

    const LoginButton = <Button variant="outlined" size="small" onClick={() => navigate(`/login`)}>
        Login
    </Button>

    const LogoutButton = <Button variant="outlined" size="small" onClick={() => {
        dispatch(logout())
    }}>Logout
    </Button>

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
                {didLogin ? LogoutButton : LoginButton}
            </Toolbar>
        </React.Fragment>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};