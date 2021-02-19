import React, { useState} from 'react';
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import { Link } from 'react-router-dom';

export default function JoinRoom(props){
    return(
        
        <Grid container>
            <h1>Join a Room</h1>
            <Button to="/" component={Link}>
                Back
            </Button>
        </Grid>
    );
}