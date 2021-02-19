import React, { useState, useEffect} from 'react';
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import { Link } from 'react-router-dom';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export default function Info(props){
    return(
        <Grid container>
            <Grid item xs={12}>
                <h4>Let Us Help You</h4>
            </Grid>
        </Grid>
    );
}