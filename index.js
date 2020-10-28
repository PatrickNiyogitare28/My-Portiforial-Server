const app = require('./app');
require('dotenv').config()

// const multer = require('multer');
// const upload = multer({dest:'uploads/blogs'}).single("demo_image");

// app.post("/api/blogs/setBlogImage", (req, res) => {
//     upload(req, res, (err) => {
//      if(err) {
//        return res.status(400).send("Something went wrong! "+err);
//      }
//      res.send(req.file);
//    });
//  });


const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log("App is running on port "+port);
    
})


