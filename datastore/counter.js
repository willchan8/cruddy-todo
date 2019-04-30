const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

// var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

// Reads the counterFile
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

// Writes the counterFile
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
// Save the current state of the counter to the hard drive, 
// so it's persisted between server restarts. 
// Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.

exports.getNextUniqueId = (callback) => {
  // I: accept callback
  // O: padded number
  // C: none
  // E: nope

  // TODO: readCounter expects callback to follow error-first pattern
  // TODO: pass in input callback as 2nd argument to writeCounter

  // readCounter
  // Increment counter
  // writeCounter (save)

  // old code:
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  readCounter((err, count) => {
    if (err) {
      console.log('Error');
      return;
    }
    count++;
    writeCounter(count, callback);
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
// exports.counterFile = 'Desktop/Users/code/whateverProject/counter.txt';
