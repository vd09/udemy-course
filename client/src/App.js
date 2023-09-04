import React, { useEffect } from "react";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import "./App.css";
import store from "./store.js";

//dashboard components
import Dashboard from "./components/dashboard";
import Landing from "./components/landing";

//user components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// importing general components
import ProtectedRoute from "./components/general/ProtectedRoute";

if (localStorage.token) {
    console.log("here");
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(setCurrentUser());
    }, []);

    console.log("protected----", <ProtectedRoute />);

    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    VI
                    {/* <Route exact path="/" Component={NavBar} /> */}
                    {/* <Background/> */}
                    {/* VIK */}
                </div>

                {/* <NavBar /> */}
                {/* <Login/> */}
                <Routes>
                    {/* <Route exact path="/" Component={NavBar} /> */}
                    <Route exact path="/" Component={Landing} />
                    <Route exact path="/login" Component={Login} />


                    {/* <Route exact path="/register" element={<ProtectedRoute Component={Register} />} /> */}
                    {/* <Route exact path="/login" element={<ProtectedRoute component={Login} />} /> */}
                    <Route exact path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                    {/* <ProtectedRoute path="/login" component={Login} /> */}
                    {/* <ProtectedRoute /> */}
                    {/* <Route
                        path="/profile"
                        element={
                            <ProtectedRoute/> 
                        }
                    /> */}
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
