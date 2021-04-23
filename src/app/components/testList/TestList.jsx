import React from 'react';
import './testList.css';
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
    const middleNameRef = React.useRef();


    function handleCollapse() {
        setOpen(!open);
        if (color === '#202427')
            setColor('#242527');
        else
            setColor('#202427');
    }

    function predict11(value, data) {
        if (value == 'Lung X Ray') {
            console.log("Call API and get image")
        }
        else {
            console.log("Data")
        }
    }


    async function predict(value, data) {
        if (value == 'Lung X Ray') {
            const formData = new FormData();
            formData.append(
                "file",
                data,
            );

            axios.post(
                "http://0.0.0.0:8080/predict", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(async (file) => {
                return file
            })
        }
        else {
            console.log("Data")
        }

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
                <TableCell align="left">{row.type}</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: color }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Grid container spacing={2}>
                                <Grid container item xs={8}>
                                    <img src={URL.createObjectURL(row.file)} style={{ width: '50%' }} />
                                        <img id="predict" key={Date.now()} src="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=" style={{ width: '50%' }} />
                                </Grid>

                                <Grid container item xs={4} spacing={2}>
                                    <Grid container item xs={12}>
                                        <Typography variant="subtitle2">Priority set by AI</Typography>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Typography variant="h4"><b>0.88</b></Typography>
                                    </Grid>
                                    <Grid container item xs={12} spacing={1}>
                                        <Grid container item xs={6}>
                                            <Button variant="contained" color="primary" onClick={async () => {
                                                if (row.test == 'Lung X Ray') {
                                                    const formData = new FormData();
                                                    formData.append(
                                                        "file",
                                                        row.file,
                                                    );

                                                    axios.post(
                                                        "http://0.0.0.0:8080/predict", formData, {
                                                        headers: {
                                                            'Content-Type': 'multipart/form-data',
                                                            "Access-Control-Allow-Origin": "*"
                                                        }
                                                    }).then(async (file) => {
                                                        row.prediction = await file.data
                                                        await console.log(document.getElementById("predict").key)
                                                        document.getElementById("predict").src = await `data:image/png;base64, + ${file.data}`;
                                                        await console.log(document.getElementById("predict").key)

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
                                        {/* <Grid container item xs={6}>
                                            <Button variant="contained" color="primary">
                                                Veiw Prediction
                                            </Button>
                                        </Grid> */}
                                    </Grid>

                                    <Grid container item xs={12}>
                                        <TextField
                                            multiline
                                            rows={10}
                                            variant="outlined"
                                            fullWidth
                                            label="Report"
                                            size="small"
                                            inputRef={middleNameRef}
                                        />
                                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries */}
                                    </Grid>
                                    {/* <Grid container item xs={12}>
                                        <Button variant="contained" color="primary">Save</Button>
                                    </Grid> */}
                                </Grid>
                            </Grid>
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
    console.log(rows)

    function handleLogout() {
        console.log(rows)
    }

    return (
        <div className="container-list">
            <div className="navbar-list">
                <AccountCircleIcon />
                <Typography style={{ marginRight: "2.5rem", marginLeft: "0.5rem" }}>
                    Name
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
                                            <TableCell align="left">Type</TableCell>
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
            </div>
        </div>
    )
}
