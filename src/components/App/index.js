import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import Room from '../Room';
import SignUp from '../Signup';
import Login from '../Login';
import NotFound from '../NotFound';

const routes = [
	{ path: '/signup', component: SignUp },
	{ path: '/login', component: Login },
	{ path: '/room', component: Room },
	{ path: '/', component: Login }
];

function App() {
	return (
		<div className="app">
			<Router>
				<Switch>
					{routes.map(({ path, component }) => <Route key={path} path={path} component={component} exact />)}
					<Route component={NotFound} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
