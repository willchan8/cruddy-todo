const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // I: text of the todo (string), callback (error-first pattern)
  // O: none
  // C: none
  // E: none

  // take the todo string
  // save it in a file in the data folder
  // the name of that file is that unique identifier (in counter.txt)

  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('error1');
      return;
    } else {
    var pathName = path.join(exports.dataDir, id + '.txt');
    fs.writeFile(pathName, text, (err) => {
      if (err) {
        throw ('error writing the todo');
      } else {
        callback(null, { id, text });
      }
    });
    } 
    
  });

  

  // var id = counter.getNextUniqueId(); // needs to pass in a callback to getNextUiqueId
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
// = './data'

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
