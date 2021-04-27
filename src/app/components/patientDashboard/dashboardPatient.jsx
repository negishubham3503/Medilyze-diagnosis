import React, { useState, useEffect } from "react";
import './dashboardPatient.css';
import { loadCSS } from 'fg-loadcss';
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Box, Button, Grid, Input, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SidebarImage from '../../../images/sidebarImage.png';
import { fetchPatientData, fetchDoctorName, getDob } from "../../contexts/FirestoreContext";
import { Icon, InlineIcon } from '@iconify/react';
import genderMaleFemale from '@iconify-icons/mdi/gender-male-female';
import { AddCircle } from "@material-ui/icons";
import { getPrescription } from "../../contexts/FirebaseDatabaseContext"
import { storage } from "../../components/firebase.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DashboardPatient() {
    const [error, setError] = useState("");
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const { logout, getUID } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const [doctorName, setDoctorName] = useState("")
    const [patientData, setPatientData] = useState({})
    const [dob, setDob] = useState("")

    // assign testList here
    const [testList, setTestList] = useState(location.state.data)

    useEffect(() => {
        async function fetchData() {
            const name = await getDob(location.state.pid);
            setDob(name)
        }
        fetchData();
    }, [dob])


    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const name = await fetchDoctorName(UID);
            setDoctorName(name)
        }
        fetchData();
    }, [doctorName])

    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const name = await fetchPatientData(location.state.pid);
            setPatientData(name)
        }
        fetchData();
    }, [patientData])

    async function handleExit() {
        setError("")

        try {
            history.push("/patientSearch")
        } catch {
            setError("Failed to exit")
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function submitReports(e) {
        console.log(location.state.uid)
        history.push({ pathname: "/test", state: { data:testList , uid: location.state.uid}})
    }

    return (
        <div className="container-dashboard">
            <div className="navbar-right">
                <AccountCircleIcon style={{ marginRight: "0.3rem", marginLeft: "2rem" }} />
                <Typography style={{ marginRight: "1.3rem", }}>
                    {doctorName}
                </Typography>
                <Typography>
                    <Link to="/patientSearch" onClick={handleExit}>Exit</Link>
                </Typography>
            </div>
            <div className="content-dashboard">
                <div className="test-section-dashboard">
                    <div className="sidebar-dashboard">
                        <img src={SidebarImage} style={{ width: "25rem" }} />
                        <Typography variant="h6" style={{ color: "#4f4f4f" }}>
                            Let's Take Care of Your Health
                        </Typography>
                        <Button onClick={submitReports} variant="contained" color="primary" style={{ margin: "3rem", width: "10rem", borderRadius: "0.7rem" }} size="large">
                            Submit
                        </Button>
                    </div>
                    <div className="test-upload-container">
                        <Typography variant="h3" style={{ marginBottom: "2rem" }}>
                            Medical Tests
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid container item xs={8} className="medicine-table" style={{ borderRadius: "1rem", backgroundColor: "#292295", marginRight: "2rem", justifyContent:"center" }}>
                                    <Typography >
                                        Tests
                                        </Typography>
                                </Grid>
                                {/* <Grid container item xs={4} className="medicine-table" style={{ borderRadius: "1rem", backgroundColor: "#292295", justifyContent:"center"  }}>
                                    <Typography >
                                        Type of Tests
                                        </Typography>
                                </Grid> */}
                            </Grid>
                            <Grid container item xs={12} spacing={2}>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            {testList.map((medicalTest, index) =>
                                <Grid container item xs={12} spacing={2} >
                                    <Grid container item xs={8} className="medicine-table" style={{ borderRadius: "2rem", backgroundColor: "#7213be", marginRight: "2rem", justifyContent:"center"  }}>
                                        <Typography >
                                            {medicalTest.test}
                                        </Typography>
                                    </Grid>
                                    {/* <Grid container item xs={4} className="medicine-table" style={{ borderRadius: "2rem", backgroundColor: "#7213be", justifyContent:"center"  }}>
                                        <Typography >
                                            {medicalTest.type}
                                        </Typography>
                                    </Grid> */}

                                    <Grid container item xs={2} className="medicine-table">
                                        {medicalTest.test == "None" ? <div></div> :
                                            <Button variant="contained" component="label" style={{ borderRadius: "1rem", backgroundColor: "#6f00e0" }} size="medium">
                                                {medicalTest.file === "" ? "Add File" : "Uploaded"}
                                                <input accept="image/*" type="file" style={{ display: "none" }} onChange={(e) => { medicalTest.file = e.target.files[0]; console.log(e.target.files[0]) }} />
                                            </Button>
                                        }
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </div>
                <div className="personal-details">
                    <div className="patient-image">
                        <img alt=""
                            src={patientData.imageUrl} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    </div>
                    <Grid container spacing={1} style={{ width: "40rem", margin: "1.5rem", display: "inline-flex" }}>
                        <Grid container item xs={6}>
                            <AccountCircleIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.name}
                            </Typography>
                        </Grid>
                        <Grid container item xs={6}>
                            <CallIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.phone}
                            </Typography>
                        </Grid>
                        <Grid container item xs={6}>
                            <Icon icon={genderMaleFemale} style={{ fontSize: 25 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.gender}
                            </Typography>
                        </Grid>

                        <Grid container item xs={6}>
                            <MailIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.email}
                            </Typography>
                        </Grid>
                        <Grid container item xs={6}>
                            <PermContactCalendarIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {dob}
                            </Typography>
                        </Grid>
                        <Grid container item xs={6}>
                            <InvertColorsIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.blood_group}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12}>
                            <LocationOnIcon style={{ fontSize: 27 }} />
                            <Typography variant="subtitle2" align="left" style={{ margin: "0.25rem" }}>
                                {patientData.address}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button id="contact-button" onClick={handleClickOpen}>GET IN TOUCH</Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="contact" TransitionComponent={Transition} keepMounted>
                        <DialogTitle id="form-dialog-title">Contact Us</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To send us a message, type in the below form and we will reach out to you soon.
                        </DialogContentText>
                            <TextField
                                variant="outlined"
                                required
                                autoFocus
                                margin="dense"
                                id="subject"
                                label="Subject"
                                type="text"
                                color="secondary"
                                fullWidth
                            />
                            <TextField
                                variant="outlined"
                                required
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Message"
                                multiline="true"
                                type="text"
                                color="secondary"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="secondary">
                                Send
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}