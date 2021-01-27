import React from "react";
import SideNav from "./components/SideNav";
import BodyInsertion from "./components/BodyInsertion";
import BodyBubble from "./components/BodyBubble";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";

function App() {
    return (
        <Router>
            <div className="App">
                <SideNav />
                <Toolbar />

                <Switch>
                    <Route path="/" exact component={BodyInsertion} />
                    <Route path="/bubble" exact component={BodyBubble} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
