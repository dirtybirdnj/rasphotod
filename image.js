'use strict'

const fs = require("fs")
const createCollage = require("photo-collage")
var Jimp = require("jimp")
var async = require("async")
var moment = require("moment")

//Stitch multiple photos together into one image
function collage(){

    const options = {
        sources: [
          "./input/picture1.jpg", // relative source
          "./input/picture2.jpg",
          "./input/picture3.jpg",    
        ],
        width: 1, // number of images per row
        height: 3, // number of images per column
        imageWidth: 350, // width of each image
        imageHeight: 250, // height of each image
        backgroundColor: "#000000", // optional, defaults to black.
        spacing: 0, // optional: pixels between each image
      };
       
      createCollage(options).then((canvas) => {
          
          const filePath = './output/collage.jpg'
          const src = canvas.jpegStream();
          const dest = fs.createWriteStream(filePath);
          src.pipe(dest);
          console.log(`wrote new image to ${filePath}`)
      });

}

//1. Adds an overlay on the bottom of an image
//2. Duplicates the overlay strip to fill 3x5 image/paper    size
function composite(){

    async.auto({
    
        //Create a 250x900 image
        new_image: function(callback) {
        
        var image = new Jimp(350, 900, function (err, image) {
              callback(null, image);
          });
        },
    
        //Load composite image
        composite: function(callback) { 
          
          Jimp.read("./output/collage.jpg").then(function (collage) {
              callback(null, collage)
          }).catch(function (err) {
              // handle an exception
              callback(err)
          });
    
        },
    
        //Load overlay
        overlay: function(callback) {
          
          Jimp.read("./input/overlay.png").then(function (overlay) {
              callback(null, overlay)
          }).catch(function (err) {
              // handle an exception
              callback(err)
          });
    
    
        }
      
      }, (err, results) => {
    
        //1. insert composite into new image
        //2. add overlay on top of composite
    
        if(err){
            
            //handle yo shit
    
    
        } else {
    
            let dateString = moment().format("YYYY-MM-DD.HH:mm:SS")
            let fileName = `overlay-composite-${dateString}.jpg`
    
            let filePath = `${__dirname}/output/${fileName}`
            let compositePath = `${__dirname}/output/composite.jpg`
    
            results.new_image.composite(results.composite, 0,0)
            results.new_image.composite(results.overlay, 0,0)
    
            var doubleImage = new Jimp(700, 900, function (err, newDoubleImage) {
            
                newDoubleImage.composite(results.new_image, 0, 0)
                newDoubleImage.composite(results.new_image, 350, 0)
    
                newDoubleImage.write(compositePath)
                console.log('output/composite.jpg created')
    
                //results.new_image.write(composite)    
                //console.log('output/composite.jpg created')
    
            });
    
    
            
    
        }
    
    })    

}


module.exports = {
    collage: collage,
    composite: composite
}