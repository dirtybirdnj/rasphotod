var keypress = require('keypress')
let PhotoD = require('./camera')
var async = require("async")
const createCollage = require("photo-collage")
var fs = require('fs')

const photoDelay = 3000

function register() {

  console.log('registering keypress listeners')

  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin)

  PhotoD.findFirst((err, camera) => {

    if (err) {

      console.log('detection of camera failed')
      process.exit()

    } else {

      // listen for the "keypress" event
      process.stdin.on('keypress', function (ch, key) {

        if (key.name === 'up') {

          console.log('keyup pressed, begin photo sequence');

          async.waterfall([

              (callback) => {

                let filePath = process.cwd() + '/input/picture1.jpg'

                console.log(process.cwd());
                console.log(filePath);
                //process.exit();

                PhotoD.takePhoto(camera, filePath, false, (err, result) => {

                  if (err) {

                    console.log('error trying to take photo')
                    process.exit()

                  } else {

                    console.log(`photo written to : ${result}`)
                    callback(null, filePath)

                  }

                })

              },
              (err, callback) => {

                let filePath = process.cwd() + '/input/picture2.jpg'

                PhotoD.takePhoto(camera, filePath, false, (err, result) => {

                  if (err) {

                    console.log('error trying to take photo')
                    process.exit()

                  } else {

                    console.log(`photo written to : ${result}`)
                    callback(null, filePath)

                  }

                })


              },
              (err, callback) => {

                let filePath = process.cwd() + '/input/picture3.jpg'

                PhotoD.takePhoto(camera, filePath, false, (err, result) => {

                  if (err) {

                    console.log('error trying to take photo')
                    process.exit()

                  } else {

                    console.log(`photo written to : ${result}`)
                    callback(null, filePath)

                  }

                })
              }

            ], (err, result) => {

              console.log('done taking three photos!')

              //Create photo-collage 1 row 3 col image
              //Composite that image with a footer at the bottom
              //Repeat that image twice over a 3x5 image size

              // async.waterfall([

              //   (callback) => {
              //     //Create collage

              //     const options = {
              //       sources: [
              //         "./input/picture1.jpg", // relative source
              //         "./input/picture2.jpg",
              //         "./input/picture3.jpg",    
              //       ],
              //       width: 1, // number of images per row
              //       height: 3, // number of images per column
              //       imageWidth: 350, // width of each image
              //       imageHeight: 250, // height of each image
              //       backgroundColor: "#000000", // optional, defaults to black.
              //       spacing: 0, // optional: pixels between each image
              //     };

              //     createCollage(options).then((canvas) => {

              //         const filePath = './output/collage.jpg'
              //         const src = canvas.jpegStream();
              //         const dest = fs.createWriteStream(filePath);
              //         src.pipe(dest);
              //         console.log(`wrote new image to ${filePath}`)
              //         callback(null, true)
              //     });

              //   },
              //   (err, success, callback) => {

              //     if(!success){

              //       callback(err, false)
              //       console.log('bad stuff happened trying to compose collage')
              //       process.exit()
              //     }


              //     async.auto({

              //       //Create a 250x900 image
              //       new_image: function(callback) {

              //       var image = new Jimp(350, 900, function (err, image) {
              //             callback(null, image);
              //         });
              //       },

              //       //Load composite image
              //       composite: function(callback) { 

              //         Jimp.read("./output/collage.jpg").then(function (collage) {
              //             callback(null, collage)
              //         }).catch(function (err) {
              //             // handle an exception
              //             callback(err)
              //         });

              //       },

              //       //Load overlay
              //       overlay: function(callback) {

              //         Jimp.read("./input/overlay.png").then(function (overlay) {
              //             callback(null, overlay)
              //         }).catch(function (err) {
              //             // handle an exception
              //             callback(err)
              //         });


              //       }

              //     }, (err, results) => {

              //       //1. insert composite into new image
              //       //2. add overlay on top of composite

              //       if(err){

              //           //handle yo shit


              //       } else {

              //           let dateString = moment().format("YYYY-MM-DD.HH:mm:SS")
              //           let fileName = `overlay-composite-${dateString}.jpg`

              //           let filePath = `${__dirname}/output/${fileName}`
              //           let compositePath = `${__dirname}/output/composite.jpg`

              //           results.new_image.composite(results.composite, 0,0)
              //           results.new_image.composite(results.overlay, 0,0)

              //           var doubleImage = new Jimp(700, 900, function (err, newDoubleImage) {

              //               newDoubleImage.composite(results.new_image, 0, 0)
              //               newDoubleImage.composite(results.new_image, 350, 0)

              //               newDoubleImage.write(compositePath)
              //               console.log('output/composite.jpg created')

              //               //results.new_image.write(composite)    
              //               //console.log('output/composite.jpg created')

              //           });




              //       }

              //   })

              //     //Create overlay composite
              //     callback(null, true)

              //   }

              // ],(result) => {

              //   if(err){

              //     //OH NO!
              //     console.log('result error')

              //   } else {
              //     //PRINT IT!
              //     console.log('send image to printer!')
              //   }




              // })



            }

          )

        }

        if (key.name === 'down') {
          console.log('exit')
          process.exit()
        }

        if (key.name === '`') {
          console.log('Different Action!')
        }

        if (key && key.ctrl && key.name == 'c') {
          process.stdin.pause()
        }
      });

      process.stdin.setRawMode(true)
      process.stdin.resume()

    }

  })

}

module.exports = {
  register: register
}