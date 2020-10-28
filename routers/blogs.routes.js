const express = require('express');
const router = express.Router();
const AuthMiddleWare  = require('../middlewares/auth');
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog,updateBlogImage} = require('../controllers/blogs.controller');



const {createBlogValidator} = require('../helper/validators/blog.validator')

router.post('/addBlog', [AuthMiddleWare],createBlogValidator,createBlog);

router.get('/allBlogs',getBlogs);

router.get('/getBlog/:id',getBlogById);

router.put('/updateBlog/:id',[AuthMiddleWare],updateBlog);

router.delete('/delete/:id', [AuthMiddleWare],deleteBlog);

router.post("/setBlogImage/:blogId", updateBlogImage);


// router.put('/setBlogImage/:blogId',updateBlogImage)

module.exports = router;