import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductAdmin from './components/ProductAdmin';
import Register from "./components/Register";
import Login from './components/Login';
import Customers from './components/Customers';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";
import Products from './components/Products';


library.add(faEdit);

const verifyTokenAPIURL =
  "https://s9tme76mge.execute-api.eu-central-1.amazonaws.com/BU2_Ecommerce/verify";

function App() {
  const [isAuthenicating, setAuthenicating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }
    const requestConfig = {
      headers: {
        "x-api-key": "O8vHCdfPJQ3kdEsvIEUZh4OSgfOgomIZ8beWa0uP",
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestConfig, requestBody)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenicating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenicating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenicating && token) {
    return <div className="content">Authenicating...</div>;
  }

  return (
        <div className="App">
        <Router>
          <div>
            <Navbar />
            <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/products" component={Products} />
            <PublicRoute exact path="/customers" component={Customers} />
            <PrivateRoute exact path="/admin" component={ProductAdmin}/>
           </Switch>
            <Footer />
          </div>
        </Router>
      </div>
  );
}

export default App;
