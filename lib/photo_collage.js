
const fs = require("fs");
const createCollage = require("photo-collage");
 
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
 

//TODO WHY DOES THIS NOT WORK ANYMORE?!
createCollage(options).then((canvas) => {
    
    const filePath = './output/collage.jpg'
    const src = canvas.jpegStream();
    const dest = fs.createWriteStream(filePath);
    src.pipe(dest);
    console.log(`wrote new image to ${filePath}`)
});