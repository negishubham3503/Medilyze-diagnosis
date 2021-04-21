import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from './components/privateRoute';
import LoginDoctor from './components/doctorLogin/loginDoctor';
import LoginPatient from './components/patientLogin/loginPatient';
import DashboardPatient from './components/patientDashboard/dashboardPatient';
import TestList from './components/testList/TestList';
import './App.css';


function App() { 
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/patientProfile" component={DashboardPatient} />
            <PrivateRoute path="/patientSearch" component={LoginPatient} />
            <Route exact path="/" component={LoginDoctor} />
            <Route path="/test" component={TestList} />
          </Switch>
        </AuthProvider>
      </Router> 
    </div>
  )
}

export default App;