import React, { useState } from "react";
import Insertion from "../algorithms/Insertion";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    primary: {
        backgroundColor: "#1de9b6",
    },
    secondary: {
        backgroundColor: "#2196f3",
    },
    sorted: {
        backgroundColor: "#f50057",
    },
}));

function Body() {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);

    const onChange = (event) => {
        setValue(event.target.value);
    };
    const inputArr = value
        ? value.split(",").map((item) => parseInt(item, 10))
        : [];

    const step = Insertion([...inputArr]);
    const viewStep = {};
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            viewStep[i] = step[i];
        }
    }
    const isEnable = value !== "";
    const isSorted =
        JSON.stringify(viewStep[count]) ===
        JSON.stringify([...inputArr].sort((a, b) => a - b));
    //console.log(viewStep);
    return (
        <>
            <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                    Input Ex: 5,3,2,4,1
                </InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={value}
                    onChange={onChange}
                    startAdornment={
                        <InputAdornment position="start">list</InputAdornment>
                    }
                    disabled={count > 0}
                />
            </FormControl>
            <div className={classes.root}>
                {inputArr.map((items, id) => (
                    <Avatar key={id} className={classes.secondary}>
                        {items}
                    </Avatar>
                ))}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setCount(count + 1)}
                    disabled={!isEnable || isSorted}
                >
                    Insertion Sort
                </Button>
            </div>
            <div>
                <h3> step {count} : </h3>
                {!isSorted ? (
                    <Timeline>
                        {Object.keys(viewStep).map((key, id) => (
                            <TimelineItem key={id}>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                {viewStep[key].map((item, index) => (
                                    <TimelineContent key={index}>
                                        <Avatar className={classes.secondary}>
                                            {item}
                                        </Avatar>
                                    </TimelineContent>
                                ))}
                            </TimelineItem>
                        ))}
                    </Timeline>
                ) : (
                    <div className={classes.root}>
                        <h3> SORTED List </h3>
                        {[...inputArr]
                            .sort((a, b) => a - b)
                            .map((items, id) => (
                                <Avatar key={id} className={classes.sorted}>
                                    {items}
                                </Avatar>
                            ))}
                    </div>
                )}
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setCount(count + 1)}
                        disabled={!isEnable || isSorted}
                    >
                        nextStep
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setCount(0);
                            setValue("");
                        }}
                    >
                        Reset
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Body;
