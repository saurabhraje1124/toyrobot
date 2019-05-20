# Toy Robot
This toy robot application has been build as an interview submission. The application has been built using NodeJS v8.1.4.
The application accepts input in the form of a text file the name of which can be specified as a command line argument.

# Creating the command file
The command file follows a specific pattern for the commands as mentioned in the question statement. The commands file will have multiple commands 
separated by newlines. The file should be a utf-8 encoded file.

## Sample command file content
```
PLACE 2,3,NORTH
MOVE
RIGHT
MOVE
LEFT
MOVE
REPORT
```

# How to run

## Install dependencies
```
npm install
```

## Running the app
```
node main.js --command-file=<PATH_TO_COMMAND_FILE>
```

