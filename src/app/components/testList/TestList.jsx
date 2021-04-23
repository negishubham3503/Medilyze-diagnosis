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
  
function createData(test, type, file, note) {
    return {
        test,
        type,
        file,
        note

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
                                    <img src={URL.createObjectURL(row.file)} style={{width: '90%', height: '90%'}}/>
                                </Grid>
                                <Grid container item xs={4} spacing={2}>
                                    <Grid container item xs={12}>
                                        <Typography variant="subtitle2">Priority set by AI</Typography>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Typography variant="h4"><b>0.88</b></Typography>
                                    </Grid>
                                    {/* <Grid container item xs={12} spacing={1}>
                                        <Grid container item xs={4}>
                                            <Button variant="contained" style={{backgroundColor: "#515151", color: "white"}}>
                                                Confirm
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={4}>
                                            <Button variant="contained" style={{backgroundColor: "#515151", color: "white"}}>
                                                Edit
                                            </Button>
                                        </Grid>
                                    </Grid> */}
                                    
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
        note: PropTypes.string
    }).isRequired,
};
  
    // createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 34, 'A. Sagachyo', 'N. Rao', ['C:\\fakepath\\output-onlinepngtools.png']),
    // createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 3, 'A. Sagachyo', 'N. Rao', ['https://www.ucsf.edu/sites/default/files/fields/field_insert_file/news/brain%20scan.jpg']),
    // createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 3, 'A. Sagachyo', 'N. Rao', ['https://www.ucsf.edu/sites/default/files/fields/field_insert_file/news/brain%20scan.jpg']),
  
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
                <Typography style={{marginRight: "2.5rem", marginLeft: "0.5rem"}}>
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
                            <Button variant="contained" style={{backgroundColor: "#515151", color: "white"}}>
                                Re-prioritize
                            </Button>
                        </Grid>
                    </Grid>
                    <ThemeProvider theme={darkTheme}>
                        <div className="table-test-list">
                            <TableContainer component={Paper} style={{backgroundColor: "#202427"}}>
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