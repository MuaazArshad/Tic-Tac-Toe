import { useState } from 'react';
import './App.css';

function Square() {
	const [value, setValue] = useState('');

	function handleClick() {
		setValue('X');
	}

	return (
		<button className='btn' onClick={handleClick}>
			{value}
		</button>
	);
}

export default function Board() {
	return (
		<>
			<div className='Row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='Row'>
				<Square />
				<Square />
				<Square />
			</div>
			<div className='Row'>
				<Square />
				<Square />
				<Square />
			</div>
		</>
	);
}
