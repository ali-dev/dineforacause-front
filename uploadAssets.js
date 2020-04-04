// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var fs = require('fs');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: 'cause-cuisine-site-assets', Key: '', Body: ''};

const directories = ['/build/assets/', '/build/static/css/', '/build/static/js/']
// var files = fs.readdirSync('./build/assets');


// console.log(files);
// console.log(__dirname);
// return;


for (let i = 0; i < directories.length; i++ ) {
    const directory = directories[i];
    const files = fs.readdirSync(__dirname+directory);
    for (let f = 0; f < files.length; f++) {
        const file = files[f];
        const fullPath = directory+file;
        // Configure the file stream and obtain the upload parameters
        var fs = require('fs');
        var fileStream = fs.createReadStream(__dirname+fullPath);
        fileStream.on('error', function(err) {
        console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        var path = require('path');
        uploadParams.Key = fullPath;

        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
        });


    }

}

// var file = './build/assets/coffee.jpg';

// // Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;
// var path = require('path');
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });