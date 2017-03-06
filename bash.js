// console.log(Object.keys(process));

const chalk = require('chalk');
const ourCommands = require('./command.js'); // commands is an object
const prompt = chalk.blue('\nprompt > ');
var cmd;

// Output a prompt
process.stdout.write(prompt);

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  const tokens = data.toString().trim().split(' '); // remove the newline
  const command = tokens[0];
  const args = tokens.slice(1).join(' ');
  //console.log('The command and args are ' + command + args);
  
  if(ourCommands[command]) {
    // console.log('got into the if');
    ourCommands[command](args, done);
  }
    
  else {
    process.stderr.write(chalk.red('command not found: ') + command);
    process.stdout.write('\nprompt > ');
  }
});

function done (output) {
  process.stdout.write(output + prompt);
}