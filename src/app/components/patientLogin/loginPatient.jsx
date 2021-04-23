import React, { useRef, useState, useEffect } from "react";
import './loginPatient.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Alert from '@material-ui/lab/Alert';
import logo from "../../../images/logo.png"
import containerImage from "../../../images/7882.png"
import { useAuth } from "../../contexts/AuthContext";
import { fetchDoctorName } from "../../contexts/FirestoreContext";
import { generateOTP, deleteOtp } from "../../contexts/FirebaseDatabaseContext";
import { getPrescription } from "../../contexts/FirebaseDatabaseContext"


import { useHistory } from "react-router-dom";


export default function LoginPatient() {
    const uidRef = useRef()
    const otpRef = useRef()
    const { login, logout, getUID } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [doctorName, setDoctorName] = useState("")
    const [otp, setOtp] = useState("");
    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            const UID = getUID();
            const name = await fetchDoctorName(UID);
            setDoctorName(name)
        }
        fetchData();
    }, [doctorName])

    async function handleOTPSend(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            const rand = Math.floor(100000 + Math.random() * 900000);
            generateOTP(uidRef.current.value, rand)
            setOtp(rand);
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            if (otp == otpRef.current.value && otp.length != 0 && otpRef.current.value.length != 0) {
                await deleteOtp(uidRef.current.value);
                var list = []
                async function fetchData() {
                    const tests = await getPrescription(uidRef.current.value);
                    for (var i = 0; i < tests.length; i++) {
                        list.push({ 'test': tests[i].split(" ").slice(0,tests[i].split(" ").length-1).join(" "), 'type':tests[i].split(" ")[tests[i].split(" ").length-1], 'file':"", 'prediction':"" })
                    }
                }
                fetchData();
                history.push({ pathname: "/patientProfile", state: { pid: uidRef.current.value, data:list } })
            }
            else {
                setError("Incorrect OTP");
            }
        } catch (e) {
            console.log(e);
            setError("Failed to log in")
        }

        setLoading(false)
    }



    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <div className="container-patient">
            <div className="navbar">
                <AccountCircleIcon />
                <Typography id="account-link">
                    {doctorName}
                </Typography>
                <Typography>
                    <Link onClick={handleLogout}>
                        Logout
                    </Link>
                </Typography>
            </div>
            <div className="content-patient">
                <img src={logo} alt="logo" className="logo-image-patient" />
                <div className="headings-patient">
                    <Typography className="heading" component="h2" variant="h3">
                        <strong>Welcome!</strong>
                    </Typography>
                    <Typography className="head-desc" component="h1" variant="h6">
                        Enter patient's information below
                    </Typography>
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <form className="otp-form-container-patient" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="uid"
                                label="UID Number"
                                name="phoneNumber"
                                color="primary"
                                inputRef={uidRef}
                                style={{ backgroundColor: "#bdd8f2" }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                type="button"
                                fullWidth="false"
                                variant="contained"
                                color="primary"
                                size="large"
                                id="send-otp"
                                onClick={handleOTPSend}
                            >
                                Send OTP
                            </Button>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="otp"
                                label="Enter OTP"
                                name="otp"
                                color="primary"
                                inputRef={otpRef}
                                style={{ backgroundColor: "#bdd8f2" }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                type="submit"
                                fullWidth="false"
                                variant="contained"
                                color="primary"
                                size="large"
                                id="submit-form"
                                disabled={loading}
                            >
                                Access Profile
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <img src={containerImage} alt="loginPage" className="container-image-patient" />
            </div>
        </div>
    )
}