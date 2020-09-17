import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Shifts from "./components/shifts";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid border">
          <Switch>
            <Route path="/peliculas" component={Movies} />
            <Route path="/turnos" component={Shifts} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/peliculas" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
