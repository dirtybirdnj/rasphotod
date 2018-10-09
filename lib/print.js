var print = require('node-printer')

console.log('available printers:')
console.log(print.list())

let printers = print.printFile({
    data: './output/one_photo.jpg',
    printer: 'MITSUBISHI_CP9550D',
    type: 'JPEG',
    options: {
        media: '288x432',
        'fit-to-page': false
    },
    //On Success
    success: (jobID => {

        console.log(`successfully sent print job with ID ${jobID}`)

    }), 

    error: (err) => {

        console.log('error printing!')
        console.log(err)


    }
})

