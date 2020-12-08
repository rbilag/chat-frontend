import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import Lobby from '../Lobby';
import Room from '../Room';

const routes = [ { path: '/room', component: Room }, { path: '/', component: Lobby } ];

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
