const robot = require('robotjs');
const keypress = require('keypress');
const figlet = require('figlet');
const colors = require('colors');

figlet("Choad's Custom Clicker!", function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data.green);
  console.log('Press Ctrl + F To Start Clicking'.green);
  console.log('Press Ctrl + C to Close Program'.red);
});

// Make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

function randomNum() {
  return Math.random() * 2000;
}

// Listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  let intervalId;
  console.log(key);

  // Detects if Ctrl + F is pressed, and starts the clicking
  if (key) {
    if (key.name === 'f' && key.ctrl === true) {
      intervalId = setInterval(() => {
        robot.mouseClick();
        console.log('Click!');
      }, 2000 + randomNum());
    }
  }

  // Detects if Ctrl + C is pressed, stops the clicking, and stops listening for keyboard inputs
  if (key) {
    if (key.name === 'c' && key.ctrl === true) {
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
