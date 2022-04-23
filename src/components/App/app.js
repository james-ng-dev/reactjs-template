import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
// import myClass from './app.css';

function App(props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen ? <h1 style={{
				color: 'red'
			}}>Show ne neu</h1> : null}
			<button onClick={() => setIsOpen((prev) => !prev)}>Toggle</button>
		</>
	);
}

export default hot(App);
