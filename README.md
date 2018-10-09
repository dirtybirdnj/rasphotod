# rasphotod
Rasphoto D - Raspberry Pi + DSLR Photobooth Software

Hook a DSLR up to a Raspberry Pi. Optionally add a monitor for video output.

Things that work:
* Capturing input from a USB presentation device
* Getting a DSLR to take photos via gphoto2
* Uploading photos to S3
* Stitching multiple images together via photo-collage
* Layering an overlay on top of a 3 image collage

Things to do:
* Read configuration values from a JSON file on a USB drive
* Crop the images taken by the camera before they are collage'd
* Laptop Mode (make use of laptop screen + webcam)
* JIMP generated overlay text (to remove need for photoshop / bitmap editing)
* Create a seperate repo/website to hook up to rasphotod.com
* DOCUMENTATION - Should be easy for non-tech folks to get set up
* MARKETING - Need a (simple) logo, some HTML/CSS web layout work

Reach Goals:
* Support USB Webcams / Laptop Webcams (not DSLRs)
* A way to display images when running in command line mode
* User selecting command line / laptop kiosk / raspi modes via USB JSON config

SUPER Reach Goals:
* Provide an .iso that someone can burn to a MicroSD and use with zero config
* Build that iso with ResinOS