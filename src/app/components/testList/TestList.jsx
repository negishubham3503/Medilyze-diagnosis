import React from 'react';
import { useEffect, useState } from 'react';
import './testList.css';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from "@material-ui/core/TableCell";
import { Button, Chip, Collapse, createMuiTheme, Grid, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, ThemeProvider, Typography, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';
import { fetchDoctorName } from "../../contexts/FirestoreContext";
import { addReportURL } from "../../contexts/FirebaseDatabaseContext";
import { storage } from "../../components/firebase.js";


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

function createData(test, type, file, note, prediction) {
    return {
        test,
        type,
        file,
        note,
        prediction

    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('#202427');
    const classes = useRowStyles();
    const reportRef = React.useRef();
    const [prediction, setPrediction] = React.useState("")


    function handleCollapse() {
        setOpen(!open);
        if (color === '#202427')
            setColor('#242527');
        else
            setColor('#202427');
    }

    function handleReport() {
        row.report = reportRef.current.value;
    }



    return (
        <React.Fragment>
            <TableRow className={classes.root} hover>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={handleCollapse}>
                        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.test}
                </TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: color }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {row.file != "" && row.test == "Chest Erect PA X Ray" ?
                                <Grid container spacing={2}>
                                    <Grid container item xs={8}>
                                        <img src={URL.createObjectURL(row.file)} style={{ width: '50%' }} />
                                        <img src={prediction} style={{ width: '50%' }} />
                                    </Grid>

                                    <Grid container item xs={4} spacing={2}>

                                        <Grid container item xs={12} spacing={1}>
                                            <Grid container item xs={10}>
                                                <Button variant="contained" color="primary" onClick={async () => {
                                                    if (row.test == "Chest Erect PA X Ray" && row.file != "") {
                                                        const formData = new FormData();
                                                        formData.append(
                                                            "file",
                                                            row.file,
                                                        );

                                                        axios.post(
                                                            "http://0.0.0.0:8080/predict", formData, {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data',
                                                                "Access-Control-Allow-Origin": "*",
                                                                'responseType': 'arraybuffer'
                                                            }
                                                        }).then(async (file) => {
                                                            await setPrediction("https://storage.googleapis.com/pathology-bucket/predicted_image.png")
                                                            await console.log(prediction)
                                                            // window.location.reload();

                                                        })
                                                    }
                                                    else {
                                                        console.log("Data")
                                                    }
                                                }}
                                                >
                                                    Get Prediction
                                            </Button>
                                            </Grid>
                                        </Grid>

                                        <Grid container item xs={20}>
                                            <TextField
                                                multiline
                                                rows={10}
                                                variant="outlined"
                                                fullWidth
                                                label="Report"
                                                size="small"
                                                inputRef={reportRef}
                                                onChange={handleReport}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid> :

                                row.file != "" && row.test != "Chest Erect PA X Ray" ?
                                    <Grid container spacing={2}>
                                        <Grid container item xs={8}>
                                            <img src={URL.createObjectURL(row.file)} style={{ width: '50%' }} />
                                        </Grid>

                                        <Grid container item xs={4} spacing={2}>

                                            <Grid container item xs={12} spacing={1}>
                                                <Grid container item xs={10}>
                                                    <Button variant="contained" color="primary" disabled>
                                                        Get Prediction
                                        </Button>
                                                </Grid>
                                            </Grid>

                                            <Grid container item xs={20}>
                                                <TextField
                                                    multiline
                                                    rows={10}
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Report"
                                                    size="small"
                                                    inputRef={reportRef}
                                                    onChange={handleReport}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid> :
                                    <Grid container spacing={2}>

                                        <Grid container item xs={20} spacing={2}>



                                            <Grid container item xs={12}>
                                                <TextField
                                                    multiline
                                                    rows={10}
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Report"
                                                    size="small"
                                                    inputRef={reportRef}
                                                    onChange={handleReport}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>


                            }

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        type: PropTypes.string.isRequired,
        file: PropTypes.arrayOf(PropTypes.string.isRequired),
        test: PropTypes.string.isRequired,
        note: PropTypes.string,
        prediction: PropTypes.string
    }).isRequired,
};

export default function TestList() {
    const location = useLocation();
    const rows = location.state.data;
    const { logout, getUID } = useAuth();
    const [doctorName, setDoctorName] = useState("")



    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const name = await fetchDoctorName(UID);
            setDoctorName(name)
        }
        fetchData();
    }, [doctorName])

    function handleLogout() {
        console.log(rows)
    }

    async function handleSubmit() {
        // TODO: Hella Submit
        
        for (var i = 0; i < rows.length; i++){
            if (rows[i].file.name) {
                var extension = rows[i].file.name.split('.').pop()
                var rnd = Math.floor(10000000000000000 + Math.random() * 90000000000000000)
                var fileName = rnd + "." +extension
                const uploadTask = await storage.ref(`/`).child(fileName).put(rows[i].file);
                await storage.ref('/').child(fileName).getDownloadURL().then((url) => {
                    rows[i].url = url
                })
            }
        }
        for (var i = 0; i < rows.length; i++){
            await addReportURL(location.state.uid, rows[i]['url'], rows[i]['report'])
        }
    }

    return (
        <div className="container-list">
            <div className="navbar-list">
                <AccountCircleIcon />
                <Typography style={{ marginRight: "2.5rem", marginLeft: "0.5rem" }}>
                    {doctorName}
                </Typography>
                <Typography>
                    <Link onClick={handleLogout}>
                        Logout
                    </Link>
                </Typography>
            </div>
            <div className="content-list">
                <div className="list-card">
                    <Grid container spacing={2}>
                        <Grid container item xs={7}>
                            <Typography variant="h5">
                                <strong>Radiology Queue</strong>
                            </Typography>
                        </Grid>
                        <Grid container item xs={3}>
                            <Typography variant="subtitle1">
                                % records have been prioritized
                            </Typography>
                        </Grid>
                        <Grid container item xs={2}>
                            <Button variant="contained" style={{ backgroundColor: "#515151", color: "white" }}>
                                Re-prioritize
                            </Button>
                        </Grid>
                    </Grid>
                    <ThemeProvider theme={darkTheme}>
                        <div className="table-test-list">
                            <TableContainer component={Paper} style={{ backgroundColor: "#202427" }}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell />
                                            <TableCell>Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            console.log(row.file),
                                            <Row key={row.test} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </ThemeProvider>

                </div>
                <div className="submit-button">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}
