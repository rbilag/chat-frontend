import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import Lobby from '../Lobby';
import Room from '../Room';
import SignUp from '../Signup';
import Login from '../Login';

const routes = [
	{ path: '/signup', component: SignUp },
	{ path: '/login', component: Login },
	{ path: '/lobby', component: Lobby },
	{ path: '/room', component: Room },
	{ path: '/', component: Login }
];

function App() {
	return (
		<div className="app">
			<Router>
				<Switch>
					{routes.map(({ path, component }) => <Route key={path} path={path} component={component} exact />)}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
