const UniqueId = require('./uniqueId')
const multer = require('multer')
const storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, 'uploads/blogs')
        },
        filename: (req, file, callBack) => {
            callBack(null, `uploads/blogs/${UniqueId()}.png`)
        }
    })
    const upload = multer({
        storage: storage
    })
    // console.log("hello");

module.exports = upload