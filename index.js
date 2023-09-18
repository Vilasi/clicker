const robot = require('robotjs');
const keypress = require('keypress');
const colors = require('colors');
console.log("Welcome to Choad's Custom Clicker!".green);
console.log('Ctrl + F to Activate (Only press once!)'.green);
console.log('Ctrl + C To Quit'.red);

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

let intervalId;
// Listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  // Detects if Ctrl + F is pressed, and starts the clicking
  if (key) {
    if (key.name === 'f' && key.ctrl === true) {
      console.log('Clicking Started!'.yellow);
      intervalId = setInterval(() => {
        robot.mouseClick();
        console.log('Click!');
      }, 2000 + Math.random() * 1500);
    }
  }

  // Detects if Ctrl + C is pressed, stops the clicking, and stops listening for keyboard inputs
  if (key) {
    if (key.name === 'c' && key.ctrl === true) {
      console.log('Clicking Cancelled!'.red);
      clearInterval(intervalId);
      process.exit();
    }
  }
});

// Listen for Ctrl+C to exit the program
process.on('SIGINT', function () {
  process.exit();
});

// Start listening for keyboard inputs
process.stdin.setRawMode(true);
process.stdin.resume();
