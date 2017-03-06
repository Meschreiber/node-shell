'use strict'

const fs = require('fs');


function pwd(args, done){
    var output = process.cwd();
    done(output);
}

function date(args, done){
    var output = Date();
}

function ls(args, done){
    var output = [];
    fs.readdir('.', function(err, filenames){
        if(err) throw err;
        filenames.forEach(function (filename){
            output.push(filename);
        });       
    });
    done(output.join('\n'));
}


module.exports = {
    pwd: pwd,
    date: date,
    ls: ls
}
