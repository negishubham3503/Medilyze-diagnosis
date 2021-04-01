import React, { useRef, useState } from "react";
import './loginDoctor.css';
import { useAuth } from "../../contexts/AuthContext"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import logo from "../../../images/logo.png";
import topImage from "../../../images/navbarImage.png"
import middleImage from "../../../images/sidebarImage.png";
import bottomImage from "../../../images/2992779.png"
import { Link, useHistory } from "react-router-dom";

export default function LoginDoctor() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [reset, setReset] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/patientSearch")
        } catch (e) {
            if (e.code === 'auth/wrong-password') {
                console.log("Password is incorrect");
                setError("Password is incorrect");
            }
            else if (e.code === 'auth/invalid-email') {
                console.log("User does not exist");
                setError("User does not exist");
            }
        }

        setLoading(false)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setReset(false);
    };

    async function handleForgotPassword(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setReset(true)
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <div className="container-doctor">
            <div className="content-doctor">
                <div className="form-content-doctor">
                    <img src={logo} alt="logo" className="logo-image-doctor" />
                    <div className="headings-doctor">
                        <Typography className="heading" component="h2" variant="h3">
                            <strong>Welcome!</strong>
                        </Typography>
                        <Typography className="head-desc" component="h1" variant="h6">
                            Sign in by entering the information below
                        </Typography>
                    </div>
                    <form className="form-container-doctor" noValidate onSubmit={handleSubmit}>
                        {error && <Alert severity="error" style={{ marginBottom: "1rem", width: "29.5rem" }}>{error}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    color="secondary"
                                    inputRef={emailRef}
                                    style={{backgroundColor: "white", borderRadius: "0.5rem"}}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    color="secondary"
                                    inputRef={passwordRef}
                                    style={{backgroundColor: "white", borderRadius: "0.5rem"}}
                                />
                            </Grid>
                            <Grid container item xs={9}>
                                <Typography>
                                    <Link onClick={handleForgotPassword} style={{color: "#00bbff"}}>
                                        Forgot Password?
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Button
                                    type="submit"
                                    fullWidth="false"
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    disabled={loading}
                                    style={{backgroundColor: "#00bbff", padding: "0.7rem"}}
                                >
                                    Sign In
                                </Button>
                                <Snackbar open={reset} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" variant="filled">
                                        A reset password link has been sent to your mail
                                    </Alert>
                                </Snackbar>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div style={{width: "25rem", color: "#474747", padding: "2rem 0rem 4rem 0rem"}}>
                    <img src={topImage} style={{width: "15rem"}} />
                    <Typography variant="h2">
                        <strong>76</strong>
                    </Typography>
                    <Typography variant="h6">
                        Verified Doctors
                    </Typography>
                    <img src={middleImage} style={{width: "15rem"}} />
                    <Typography variant="h2">
                        <strong>3000+</strong>
                    </Typography>
                    <Typography variant="h6">
                        Diagnostics Tests
                    </Typography>
                    <img src={bottomImage} style={{width: "15rem"}} />
                    <Typography variant="h2">
                        <strong>97.8%</strong>
                    </Typography>
                    <Typography variant="h6">
                        Positive Feedback
                    </Typography>
                </div>
            </div>
        </div>
    )
}