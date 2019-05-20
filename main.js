'use strict'
var fs = require ('fs');
const lineReader = require('readline');
const args = require('yargs').argv;

const acceptedCommands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT'];

const processCommand = (line) => {
	console.log(line);
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