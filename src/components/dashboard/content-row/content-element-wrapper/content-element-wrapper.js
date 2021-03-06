import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography, Divider, Link, IconButton, LinearProgress,
    Card, CardHeader, CardContent
} from '@material-ui/core';
import {
    MoreVert as MoreVertIcon
} from '@material-ui/icons';

import {fullURL} from '../../../../lib/api';
import ElementAvatar from './element-avatar';

import CEWState from './content-element-wrappers.state';
import {useMachine} from "@xstate/react/lib";
import CEWErrorBoundary from "./cew-error-boundary";

import useFEMManager from "../../../../lib/fem-manager/fem-manager";

function ContentElementWrapper({element: {component, name, path}}) {
    let FEMComponent;
    let innerContent;
    const {fems} = useFEMManager();

    const [current, send] = useMachine(CEWState.withContext({
        module: path,
        data: undefined,
        errorMessage: undefined
    }));

    if (!fems[component]) {
        send({type: 'ERROR', data: new Error('Component not found')});
    } else {
        FEMComponent = fems[component].component;
    }

    switch (current.value) {
        case 'loaded':
            innerContent =
                FEMComponent ? <FEMComponent data={current.context.data} minWidth={100}/> : 'undefined';
            break;
        case 'error':
            innerContent =
                <>
                    <Typography variant={'h5'} color={'error'}>
                        Error
                    </Typography>
                    <Typography variant={'body1'} color={'error'}>
                        {current.context.errorMessage}
                    </Typography>
                    <Link onClick={() => send('RELOAD')}>
                        Retry
                    </Link>
                </>;
            break;
        default:
            innerContent = <LinearProgress/>;
    }
    return (
        <Card style={{'height': '100%'}}>
            <CardHeader
                avatar={
                    <ElementAvatar name={name}/>
                }
                action={
                    <IconButton aria-label="expand">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={name}
                subheader={
                    <Link href={fullURL(path)} target={'_blank'} color={'inherit'}>
                        {path}
                    </Link>
                }/>

            <Divider light variant="middle"/>
            <CardContent>
                <CEWErrorBoundary onError={error => send({type: 'ERROR', data: error})}>
                    {innerContent}
                </CEWErrorBoundary>
            </CardContent>
        </Card>
    );
}

ContentElementWrapper.propTypes = {
    element: PropTypes.object.isRequired
};

export default ContentElementWrapper;
