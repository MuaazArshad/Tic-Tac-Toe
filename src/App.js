import { useEffect, useState } from 'react';
import './App.css';

const Square = ({ value, onSquareClick }) => {
	return (
		<button className='square' onClick={onSquareClick}>
			{value}
		</button>
	);
};

const victory = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < 8; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
};
const draw = (squares) => {
	for (let i = 0; i < 9; i++) {
		if (squares[i] === null) {
			return true;
		}
	}
	return false;
};

const Board = ({ value, squares, onPlay }) => {
	const handleClick = (i) => {
		const nextSquare = squares.slice();
		if (nextSquare[i] || victory(squares)) {
			return;
		} else if (!nextSquare[i] && !victory(squares)) {
			nextSquare[i] = value;
			//setValue((value) => (value === 'X' ? 'O' : 'X'));
			value === 'X' ? (value = 'O') : (value = 'X');
		}
		onPlay(nextSquare);
	};
	let status;
	if (victory(squares)) {
		status = victory(squares) + ' wins';
	} else if (!draw(squares)) {
		status = 'Draw';
	} else {
		status = value + "'s turn";
	}
	return (
		<>
			<div className='status'>{status}</div>
			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
};
const App = () => {
	let [value, setValue] = useState('X');
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];
	useEffect(() => {
		setValue((value) => (value === 'X' ? 'O' : 'X'));
	}, [history]);

	const handleHistory = (nextSquare) => {
		const newHistory = [...history.slice(0, currentMove + 1), nextSquare];
		setHistory(newHistory);
		setCurrentMove(newHistory.length - 1);
	};
	const jumpTo = async (move) => {
		setCurrentMove(move);
		console.log(currentMove, move);
		await setValue(() => (move % 2 === 0 ? (value = 'X') : (value = 'O')));
	};
	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = 'Go to move #' + move;
		} else {
			description = 'Go to game start';
		}
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<>
			<div className='board'>
				<Board value={value} squares={currentSquares} onPlay={handleHistory} />
			</div>
			<div className='history'>
				<ol>{moves}</ol>
			</div>
		</>
	);
};
export default App;
