const Camera = require('../lib/camera');

const ts = Date.now();

let filePath = `./output/image-${ts}.jpg`;
let interval = false;


Camera.findFirst((err, activeCamera) => {

    Camera.takePhoto(activeCamera, filePath, interval, (err, result) => {

        console.log('photo done');

    });

});