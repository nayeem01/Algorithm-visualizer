import React, { useState } from "react";
import Insertion from "../algorithms/Insertion";
import Input from "@material-ui/core/Input";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
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
    console.log(isNaN(value));
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
        JSON.stringify(viewStep[count]) !==
        JSON.stringify([...inputArr].sort((a, b) => a - b));
    console.log(viewStep);
    return (
        <>
            5,3,2,4,1
            <form noValidate autoComplete="off">
                <Input
                    placeholder="input array Example: 1,4,5,3,2"
                    value={value}
                    onChange={onChange}
                    inputProps={{ "aria-label": "description" }}
                />
            </form>
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
                    disabled={!isEnable || !isSorted}
                >
                    Insertion Sort
                </Button>
            </div>
            <div>
                <h3> step {count} : </h3>
                {isSorted ? (
                    Object.keys(viewStep).map((key, id) => (
                        <List key={id} className={classes.root}>
                            {viewStep[key].map((items, index) => (
                                <Avatar
                                    key={index}
                                    className={classes.secondary}
                                >
                                    {items}
                                </Avatar>
                            ))}
                        </List>
                    ))
                ) : (
                    <div className={classes.root}>
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
                        disabled={!isEnable || !isSorted}
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
