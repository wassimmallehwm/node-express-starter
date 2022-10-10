const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const expressMiddelwares = (app, dir) => {
  app.use('/public', express.static(path.join(dir, 'public')));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'));


  const modulesPath = path.join(dir, 'modules');
  fs.readdir(modulesPath, function (err, modulesList) {
    if (err) {
      return console.log('Unable to scan modules directory: ' + err);
    }
    modulesList.forEach(function (mod) {
      app.use(`/api/${mod}`, require(`../modules/${mod}`).routes)
    });
  });

}

module.exports = expressMiddelwares;