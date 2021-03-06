import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';

import SystemdListItem from './systemd-list-item';


function Systemd(props) {
    let units = [];
    for (const unitName in props.data) {
        units.push(
            <SystemdListItem 
                key={unitName}
                unitName={unitName}
                unitInfos={props.data[unitName]} 
            />
        );
    }

    return (
        <List disablePadding>
            {units}
        </List>
    );
}

Systemd.propTypes = {
    data: PropTypes.object.isRequired
};

export default {
    component: Systemd,
    info: {
        name: 'systemd',
        version: 'v1.0.0'
    }
};
