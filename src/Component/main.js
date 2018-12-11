import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignupPage from './signup';
import Todo from './Todo';


const Main = () => (
    <Router>
        <div>
            <Route exact path="/" component={SignupPage} />
            <Route exact path="/Todo" component={Todo} />
        </div>
    </Router>
);
export default Main;