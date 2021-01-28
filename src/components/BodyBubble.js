import Bubble from "../algorithms/Bubble";
import React, { useState } from "react";
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
import { Container, List, ListItem, ListItemText } from "@material-ui/core";
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
    selected: {
        backgroundColor: "#f44336",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
function BodyBubble() {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [count, setCount] = useState(1);
    const [preview, setPreview] = useState(2);
    const [sortStep, setSortStep] = useState([]);

    const viewStep = {};

    const onChange = (event) => {
        setValue(event.target.value);
    };
    const inputArr = value
        ? value.split(",").map((item) => parseInt(item, 10))
        : [];

    const step = Bubble([...inputArr]);

    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            viewStep[i] = step[0][i];
        }
    }
    //let x = viewStep[1];

    //setSortStep(viewStep[1]);
    console.log(sortStep);
    //console.log(x);
    //console.log(viewStep[1]);

    const isEnable = value !== "";
    const isSorted =
        JSON.stringify(viewStep[count]) ===
        JSON.stringify([...inputArr].sort((a, b) => a - b));

    return (
        <div>
            <Container className={classes.content} maxWidth="sm">
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">
                        Input Ex: 5,3,2,4,1
                    </InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={value}
                        onChange={onChange}
                        startAdornment={
                            <InputAdornment position="start">
                                list
                            </InputAdornment>
                        }
                        disabled={count > 1}
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
                        onClick={() => {
                            setCount(count + 1);
                            setPreview(preview + 1);
                            setSortStep(step[0][preview]);
                        }}
                        disabled={!isEnable || isSorted}
                    >
                        Bubble Sort
                    </Button>
                </div>
                <div>
                    <h3> step {count} : </h3>
                    {!isSorted ? (
                        <div>
                            <List>
                                <ListItemText primary="Current State and Target Swap :" />
                                <ListItem className={classes.root}>
                                    {sortStep.map((items, idx) => (
                                        <Avatar
                                            key={idx}
                                            className={
                                                idx === step[1][count + 1] ||
                                                idx === step[1][count + 1] + 1
                                                    ? classes.selected
                                                    : classes.secondary
                                            }
                                        >
                                            {items}
                                        </Avatar>
                                    ))}
                                </ListItem>
                            </List>
                            <Timeline>
                                <ListItemText primary="Tree view" />
                                {Object.keys(viewStep).map((key, id) => (
                                    <TimelineItem key={id}>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                color={
                                                    key % 2
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        {viewStep[key].map((item, index) => (
                                            <TimelineContent key={index}>
                                                <Avatar
                                                    className={
                                                        classes.secondary
                                                    }
                                                >
                                                    {item}
                                                </Avatar>
                                            </TimelineContent>
                                        ))}
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        </div>
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
                            onClick={() => {
                                setCount(count + 1);
                                setPreview(preview + 1);
                                setSortStep(step[0][preview]);
                            }}
                            disabled={!isEnable || isSorted}
                        >
                            nextStep
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setCount(1);
                                setValue("");
                                setPreview(2);
                                setSortStep([]);
                            }}
                        >
                            Reset
                        </Button>
                    </ButtonGroup>
                </div>
            </Container>
        </div>
    );
}

export default BodyBubble;
