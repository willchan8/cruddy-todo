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
      throw ('error1');
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

  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {

  // I - callback function (takes in err, todoList)
  // O - returns an array of todos to client app
  // C - none
  // E - should return an empty array when there are no todos


  // use fs.readdir to iterate over all files in the data folder
  // create an object with id and text both set to the id
  // push each object into an array
  // invoke the callback function passing in null and the array
  // return the array

  let todos = [];

  let regex = /\d+/i;

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('error');
      return;
    }
    todos = files.map(file => {
      let digits = file ? file.match(regex) ? file.match(regex)[0] : null : null;
      return {id: digits, text: digits};
    });
    callback(null, todos);
  });

  return todos;

  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {

  // I - id, and callback function that takes in error and an object with id and todo text
  // O - none
  // C - none
  // E - return error for non-existent todo

  // read content of that specific id
  // create an object with id and text corresponding to todo
  // respond the contents to the client

  let todoPath = path.join(exports.dataDir, `${id}.txt`)

  fs.readFile(todoPath, (err, todoText) => {
    if (err) {
      return callback(new Error(`No item with id: ${id}`));
    }
    callback(null, {id, text: String(todoText)});
  });


  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  // I - id the todo to change, updated text, callback (with inputs err and todo [todo is an obj { id, text }])
  // O - none, just side-effects
  // C - none
  // E - id doesn't exist

  // Access data directory
    // If the file for a given ID can be read
      // Then write the file
  // Find specific todo by ID
  // Rewrite text that is inside of that file
  // Invoke the callback
  
  var todoPath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile(todoPath, err => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(todoPath, text, err => {
        if (err) {
          return callback(new Error(`No item with id: ${id}`));
        }
          callback(null, { id, text });
      });
    };
  });
  
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  // I - the id, and some callback which takes in just an error
  // O - no output
  // C - none
  // E - non-existent ids

  // read the file
    // if it exists
      // delete the file
    // otherwise
      // throw an error

  var todoPath = path.join(exports.dataDir, `${id}.txt`);

  fs.readFile(todoPath, err => {
    if (err) {
      return callback(new Error(`No item with id: ${id}`));
    }
    fs.unlink(todoPath, err => {
      if (err) {
        return callback(new Error(`No item with id: ${id}`));
      }
      callback(null);
    })
  })
  
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
// = './data'

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
