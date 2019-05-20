'use strict'
var fs = require ('fs');
const lineReader = require('readline');
const args = require('yargs').argv;

const acceptedCommands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
const boardLength = 5;
const boardWidth = 5;

const currentPosition = {
	x: null,
	y: null,
	f: -1
}

let placeCommandFired = false; 

const execReportCommand = () => {
	console.log('Current position: X: ' + currentPosition.x + ' Y: ' + currentPosition.y + ' Direction: ' + directions[currentPosition.f]);
};

const execPlaceCommand = (commandArr) => {
	if (commandArr.length === 2) {
		const position = commandArr[1].split(',');
		if (position[0] < boardLength && position[1] < boardWidth && directions.indexOf(position[2]) > -1 ) {
			placeCommandFired = true;
			currentPosition.x = position[0];
			currentPosition.y = position[1];
			currentPosition.f = parseInt(directions.indexOf(position[2]));
		} else {
			console.log('Place coordinates out of bounds');
		}
	} else {
		console.log('Invalid place command syntax');
	}
};

const execMoveCommand = (commandArr) => {
	if (commandArr.length === 1) {
		if (currentPosition.x && currentPosition.y && currentPosition.f >= 0) {
			switch (directions[currentPosition.f]) {
				case 'NORTH':
					if ((currentPosition.y + 1) === boardWidth ) {
						console.log('Invalid move');
					} else {
						currentPosition.y = parseInt(currentPosition.y) + 1;
					}
				break;
				case 'EAST':
					if ((currentPosition.x + 1) === boardLength) {
						console.log('Invalid move');
					} else {
						currentPosition.x = parseInt(currentPosition.x) + 1;
					}
				break;
				case 'SOUTH':
					if (currentPosition.y === 0) {
						console.log('Invalid move');
					} else {
						currentPosition.y = parseInt(currentPosition.y) - 1;
					}
				break;
				case 'WEST':
					if (currentPosition.x === 0) {
						console.log('Invalid move');
					} else {
						currentPosition.x = parseInt(currentPosition.x) - 1;
					}
				break;
			}
		} else {
			console.log(JSON.stringify(currentPosition));
		}
	} else {
		console.log('Invalid move command syntax');
	}
};

const processLeftAndRightCommand = (direction) => {
	if (direction) {
		if (currentPosition.x && currentPosition.y && currentPosition.f >= 0) {
			switch (direction) {
				case 'LEFT':
					if (currentPosition.f === 0) {
						currentPosition.f = parseInt(directions.length - 1);
					} else {
						currentPosition.f = parseInt(currentPosition.f - 1);
					}
				break;
				case 'RIGHT':
					if (currentPosition.f === (directions.length -1) ) {
						currentPosition.f = 0;
					} else {
						currentPosition.f = parseInt(currentPosition.f + 1);
					}
				break;
			}
		}
	} else {
		console.log('Invalid ' + direction + ' command');
	}
};


const processCommand = (line) => {
	const commandArr = line.split(' ');
	if (commandArr.length <= 2) {
		if (acceptedCommands.indexOf(commandArr[0]) > -1) {
			if (!placeCommandFired) {
				if (commandArr[0] === 'PLACE') {
					execPlaceCommand(commandArr);
				}
			} else {
				switch(commandArr[0]) {
					case 'PLACE': 
						execPlaceCommand(commandArr);
					break;
					case 'REPORT':
						execReportCommand();
					break;
					case 'MOVE':
						execMoveCommand(commandArr);
					break;
					case 'LEFT':
					case 'RIGHT':
						processLeftAndRightCommand(commandArr[0]);
					break;
					default: 
						console.log('Invalid command')

				}
			}
		} else {
			console.log('Invalid command');
		}
	} else {
		console.log('Invalid command syntax');
	}
};

try {
	if (args.commands) {
		console.log('Accessing commands from command file:: ' + args.commands);
		if (fs.existsSync(args.commands)) {
			const lr = lineReader.createInterface({
				input: fs.createReadStream(args.commands)
			});
			lr.on('line', (line) => processCommand(line));
		} else {
			console.log('Commandn file ' + args.commands + ' does not exist');
		}
	} else {
		console.log('Commandn file not found');
	}
} catch (err) {
	console.log(err);
}