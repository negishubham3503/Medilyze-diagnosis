import React from 'react';
import './testList.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from "@material-ui/core/TableCell";
import { Button, Chip, Collapse, createMuiTheme, Grid, IconButton, Table, TableBody, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@material-ui/core';
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
  
function createData(name, type, date, priority, doctor, radiologist, image, note) {
    return {
        name,
        type,
        date,
        priority,
        doctor,
        radiologist,
        image,
        note
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('#202427');
    const classes = useRowStyles();

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
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left"><Chip color="secondary" size="small" label={row.priority} /></TableCell>
                <TableCell align="left">{row.doctor}</TableCell>
                <TableCell align="left">{row.radiologist}</TableCell>
            </TableRow>
            <TableRow hover>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: color }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Grid container spacing={2}>
                                <Grid container item xs={8}>
                                    <img src={row.image} style={{width: '95%', height: '20rem'}}/>
                                </Grid>
                                <Grid container item xs={4} spacing={2}>
                                    <Grid container item xs={12}>
                                        <Typography variant="subtitle2">Priority set by AI</Typography>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Typography variant="h4"><b>0.88</b></Typography>
                                    </Grid>
                                    <Grid container item xs={12} spacing={1}>
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
                                    </Grid>
                                    <Grid container item xs={12}>
                                        <Button variant="contained" color="primary">Select for analysis</Button>
                                    </Grid>
                                    <Grid container item xs={12}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
                                    </Grid>
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
        doctor: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        image: PropTypes.arrayOf(PropTypes.string.isRequired),
        name: PropTypes.string.isRequired,
        radiologist: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
        note: PropTypes.string
    }).isRequired,
};
  
const rows = [
    createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 34, 'A. Sagachyo', 'N. Rao', ['https://www.ucsf.edu/sites/default/files/fields/field_insert_file/news/brain%20scan.jpg']),
    createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 3, 'A. Sagachyo', 'N. Rao', ['https://www.ucsf.edu/sites/default/files/fields/field_insert_file/news/brain%20scan.jpg']),
    createData('Blood Test', 'Monomgraphy', 'Jun 1 11:34 am', 3, 'A. Sagachyo', 'N. Rao', ['https://www.ucsf.edu/sites/default/files/fields/field_insert_file/news/brain%20scan.jpg']),
];
  
export default function TestList() {

    function handleLogout() {

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
                                        <TableCell align="left">Date</TableCell>
                                        <TableCell align="left">Priority</TableCell>
                                        <TableCell align="left">Medical Doctor</TableCell>
                                        <TableCell align="left">Radiologist</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {rows.map((row) => (
                                        <Row key={row.name} row={row} />
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