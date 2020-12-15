import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css"
import axios from 'axios';
import Nav from './comp/Nav/Nav';
import Footer from './comp/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Weather from './pages/Weather/App';
import Checklist from './pages/Checklist/checklist'
import { useAuth, actions } from './utils/authState';
import UserPage from './pages/Userpage/UserPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

export default function App() {
  const [authState, authDispatch] = useAuth();
  useEffect(() => {
    axios.get("/api/user").then((response) => {
      authDispatch({
        type: actions.LOGIN,
        // displayName: response.data.displayName,
        // userId: response.data.id
      })
    }).catch(err => {
      authDispatch({
        type: actions.LOGOUT,
      })
    })
  }, []);
  return (
    <div>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/login">
              {
                !authState.isLoggedIn
                  ? <Login />
                  : <Redirect to="/user" />
              }
            </Route>
            <Route exact path="/">
              {
                !authState.isLoggedIn
                  ? <Register />
                  : <Redirect to="/login" />
              }
            </Route>
            <Route path="/logout">
              {
                !authState.isLoggedIn
                  ? <Redirect to="/login" />
                  : <p className="text-center">You are logged in</p>
              }
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/checklist">
              <Checklist />
            </Route>
            <Route path="/weather">
              <Weather />
            </Route>
            <Route path="/user">
              <UserPage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  )
}
