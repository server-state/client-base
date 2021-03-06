import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import SecondaryTooltip from '../secondary-tooltip';

// given options
const options = [
    'Preferences',
    'Reload',
    'About'
];

const ITEM_HEIGHT = 48;

const paperProps = {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: 200
    }
};

function HeaderMenu({onMenuSelected}) {
    // simple react state for open/close behaviour
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // internal handle events
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClick = event => {
        handleClose();
        onMenuSelected(event.target.textContent);
    };

    return (
        <div>
            <SecondaryTooltip title="Menu">
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
            </SecondaryTooltip>
            <Menu
                id="header-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={paperProps}
            >
                {options.map(option => (
                    <MenuItem key={option} onClick={onClick}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

HeaderMenu.propTypes = {
    onMenuSelected: PropTypes.func.isRequired
};

export default HeaderMenu;
