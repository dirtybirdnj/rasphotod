// Load the SDK for JavaScript
var AWS = require('aws-sdk');
var fs = require('fs');
var moment = require("moment");

// Set the region 
AWS.config.update({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

});

fs.readFile('./output/composite.jpg', (err, data) => {

	if (err) {
		throw err;
	}

	var base64data = new Buffer(data, 'binary');

	let dateString = moment().format("YYYY-MM-DD.HH:mm:SS")
	let fileName = `overlay-composite-${dateString}.jpg`

	var s3 = new AWS.S3();
	s3.putObject({
		Bucket: process.env.AWS_SECRET_ACCESS_KEY,
		Key: fileName,
		Body: base64data,
		ACL: 'public-read',
		ContentType: 'image/jpeg'
	}, function (resp) {
		console.log(arguments);
		console.log(`Successfully uploaded ${fileName}.`);
	});

})