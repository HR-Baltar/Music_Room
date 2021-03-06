import React, { useState, useEffect} from 'react';
import {Grid, Button, ButtonGroup, Typography, IconButton} from "@material-ui/core";
import { Link } from 'react-router-dom';
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const pages = {
    JOIN: 'pages.join',
    HOST: 'pages.host',
};

export default function Info(props){
    const [page, setPage] = useState(pages.JOIN); //research later

    function joinName(){
        return "Join page";
    }
    function hostName(){
        return "Host page";
    }
    function joinInfo(){
        return (
            <p>
                This component allows you to join an existing room
                that is hosted by someone else. You will need to have
                to the that person's room code in order to have access
                as a guest and listen to his/her playlist. 
            </p>
        );
    }
    function hostInfo(){
        return (
            <p>
                This room allows you to Host a room.
            </p>
        );
    }

    useEffect(() => { //component mount operations equivalent
        console.log("ran");
        return () => console.log("cleanup");
    });

    return(
        <Grid container>
            {/* greet */}
            <Grid item xs={12} align= "center">
                <h2>Let Us Help You</h2>
            </Grid>
            {/* return home */}
            <Grid item xs={12} align="center">
                <Button to="/" component={Link}>
                    Back
                </Button>
            </Grid>
            {/* sub info title*/}
            <Grid item xs={12} align = "center">
                <h4>
                    {page ===  pages.JOIN ? joinName(): hostName()}
                </h4>
            {/* </Grid>
            {/* change sub info title }
            <Grid item xs = {12}> */}
                <IconButton
                    onClick={()=>{
                        page === pages.HOST ? setPage(pages.JOIN): setPage(pages.HOST);
                    }}
                >
                    {page === pages.HOST ? (
                        <NavigateBeforeIcon/>
                        ):(
                        <NavigateNextIcon/>
                    )}
                </IconButton>
            </Grid>
            {/* Show sub information */}
            <Grid item xs = {12}>
                <Typography variant = "body1">
                    {page === pages.HOST ? hostInfo(): joinInfo()}
                </Typography>
            </Grid>


        </Grid>
    );
}