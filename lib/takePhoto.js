
let PhotoD = require('./camera')

//Three seconds
const photoDelay = 3000

PhotoD.findFirst((err, camera) => {

    if(err){

        console.log('error trying to find camera')
        process.exit()

    } else {

        let filePath = __dirname + '/input/picture1.jpg'

        PhotoD.takePhoto(camera, filePath, photoDelay, (err, result) => {

            if(err){

                console.log('error trying to take photo')
                process.exit()

            } else {

                console.log(`photo written to : ${result}`)

            }
            

        })

    }


})