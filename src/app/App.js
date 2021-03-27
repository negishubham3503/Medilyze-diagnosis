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
import './App.css';


function App() { 
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute path="/patientSearch" component={LoginPatient} />
            <Route exact path="/" component={LoginDoctor} />
          </Switch>
        </AuthProvider>
      </Router> 
    </div>
  )
}

export default App;