'use strict'

const fs = require('fs');

function pwd(args, done){
    done(process.cwd());
}

function date(args, done){
    done(Date());
}


// Issue here because of closure
function ls(args, done){
    console.log('got into commands.js')
    var output = [];
    fs.readdir('.', function(err, filenames){
        if(err) throw err;
        filenames.forEach(function (filename){
            console.log(filename);
            output.push(filename);
        });       
    });
    console.log("Here is the output: " + output);
    done(output.join('\n'));
}

function echo(args, done){
    var output = [];
    args.split(' ').forEach( function (arg){
        if (arg[0] === '$'){
            // this part doesn't seem to be working
            output.push(process.env[arg.slice(1)]);
        }
        else output.push(arg);
    });
    done(output.join(' '));
}

function cat (filenames, done){
    filenames.split(' ');
    const texts = [];
    var count = 0;
    filenames.forEach(function (filename){
        fs.readFile(filename, { encoding: 'utf8' }, function(err, text){
            if (err) throw err;
            texts[i] = text;
            count ++;
            if (count === filenames.length) output = texts.join(' ');
        });
    });
    done(output);
}

function head (filename, done){
    var output;
    fs.readFile(filename, { encoding: 'utf8'}, function(err, text){
        if (err) throw err;
        output = text.split('\n').slice(0, 5).join('\n');    
    });
    done(output);
}

function tail (filename, done){
    var output;
    fs.readFile(filename, { encoding: 'utf8'}, function(err, text){
        if (err) throw err;
        output = text.split('\n').slice(-5).join('\n');    
    });
    done(output);
}

function curl (url, done){
    if(url.slice(0, 7) !== 'http://') url = 'http://' + url;
    request(url, function(err, response, body){
        if (err) throw err;
        else if (respponse && (response.statusCode > 399)) 
            throw new Error(response.statusCode);
        if (body) done(body);
        else done(' ');
    });
}

module.exports = {
    pwd: pwd,
    date: date,
    ls: ls,
    echo: echo,
    cat: cat,
    head: head,
    tail: tail,
    curl: curl
}
