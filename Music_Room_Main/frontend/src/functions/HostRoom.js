import React, { useState, useEffect, useReducer} from 'react';
//import {render} from "react-dom";
import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link} from "react-router-dom";

const defaultVotes =  {votesToSkip: 2};
//const defaultPause = true;
const pause = {
    ON: true,
    OFF: false,
};



const reducer = (state, action, value) => {
    switch(action.type) {
        case "increase":
            return {votesToSkip: state.votesToSkip +1};
        case "decrease":
            if(state.votesToSkip < 1){
                return {votesToSkip: 0}
            }
            return {votesToSkip: state.votesToSkip -1}
        default:
            throw new Error();
    }
    //return {votesToSkip: state.votesToSkip};
};

const increaseVotesToSkip = () => ({ type: "increase"});
const decreaseVotesToSkip = () => ({ type: "decrease"});

export default function HostRoom(props){
    const [guest_pausible, setGuestPause]= useState(pause.ON);
    const [voteSkipState, setVotes] = useReducer(reducer, defaultVotes);
    //const [VotesToSkip, setVotes] = useState(votes.VAL);

    function handleGuestPause(){
        guest_pausible === pause.ON ? setGuestPause(pause.OFF): setGuestPause(pause.ON);
    }

    return(
        <Grid container>
            {/* Title of page */}
            <h1>Host A ROOM</h1>
            <Grid item xs = {12}>
                <Button to="/" component={Link}>
                    back
                </Button>
            </Grid>
            {/* Changable Variables */}
            <Grid item xs = {12}>
                {/* votes to skip */}
                {voteSkipState.votesToSkip.toString()}
                <Button onClick={()=>{
                    setVotes(increaseVotesToSkip());
                }}>
                    +
                </Button>
                <Button onClick={()=>{
                    setVotes(decreaseVotesToSkip());
                }}>
                    -
                </Button>
            </Grid>
            <Grid item xs = {12}>
                {/* guest can pause and play */}
                <FormControl component = "fieldset">
                    <div align = "center">
                        Guest Control of Music Player
                    </div>
                    <RadioGroup row 
                        defaultValue = {guest_pausible.toString()}
                        onChange = {() => {handleGuestPause()}}>
                        <FormControlLabel
                            value = "true"
                            control = {<Radio color = "primary"/>}
                            label= "Play/Pause"
                            labelPlacement ="bottom"
                        />
                        <FormControlLabel
                            value = "false"
                            control = {<Radio color = "secondary"/>}
                            label= "No Control"
                            labelPlacement ="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs = {12}>
                <h1>[#// DEBUGS //#]</h1>
                <p>{"Guest Play/Pause: " + guest_pausible.toString()}</p>
                <p>{"Votes To Skip: " + voteSkipState.votesToSkip.toString()}</p>
            </Grid>
            
        </Grid>
    );
}