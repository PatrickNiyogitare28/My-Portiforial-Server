const {Blog}  = require('../modals/blogs.modal')
const {date,time } =  require('../utils/date');
let {UniqueId } = require('../utils/uniqueId');
const {Comment} = require('../modals/comments.modal');
const _ = require('lodash');
const getCurrentDate = require('../utils/date');
const currentUser = require('../utils/auth.currentUser');
const {User} = require('../modals/users.modal');


const multer = require('multer');
// const upload = multer({dest:'uploads/blogs'}).single("demo_image");
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/blogs')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${UniqueId()}.jpg`)
    }
})
const upload = multer({
    storage: storage
}).single('demo_image');

const {getBlog} = require('../utils/getBlog');


exports.createBlog = async(req,res)=>{
    let user = await currentUser(req,res);
    let newBlog = new Blog();

    newBlog.author = user._id;
    newBlog.title = req.body.title;
    newBlog.date = await getCurrentDate();
    newBlog.content = req.body.content;
    
    newBlog.save().then(async (blog)=>{
        await User.findOne({_id: user._id}).then(async (author)=>{
            res.send({
                success: true, 
                status: 200,
                message: 'Blog created',
                blog: {
                    _id: blog._id,
                    authorId: user._id,
                    authorName: author.name,
                    authorEmail: author.email,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date
                }
            }).status(200);
        })
    }).catch((error)=>{
        res.send(error).status(400)
    })
}

exports.getBlogs = async(req,res)=>{
    const blogs = [] = await Blog.find();
    let allBlogs = [];
    blogs.forEach(async(blog) => {
        await User.findOne({_id: blog.author}).then( user => {
            allBlogs.push({
             
                    _id: blog._id,
                    authorId: user._id,
                    authorName: user.name,
                    authorEmail: user.email,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date,
                    imageURL: blog.imageURL
             
            })
            if(allBlogs.length == blogs.length){
                return res.send({
                    success: true,
                    status: 200,
                    blogs: allBlogs
                }).status(200)
            }
          })
    })
}

exports.getBlogById = async(req,res)=>{
    await Blog.findOne({_id: req.params.id}).then(async (blog)=>{
        await User.findOne({_id: blog.author}).then(author => {
            res.send({
                success: true,
                status: 200,
                blog: {
                    _id: blog._id,
                    authorId: author._id,
                    authorName: author.name,
                    title: blog.title,
                    date: blog.date,
                    content: blog.content
                }
            }).status(200)
        })
    })
    
}

exports.updateBlog = async(req,res)=>{
    let query = {_id: req.params.id};
    let blog;
    try{
        blog =  getBlog(blogId);
    }
    catch(error){
     return  res.send({
            success: false,
            status: 404, 
            message: 'Blog not found'
        }).status(404)
    }
   
    
   let user = await currentUser(req,res);
    if(user.role != 'ADMIN' && user._id !== blog.author){
        return res.send({
            success: false,
            status: 400,
            message: 'You are not allowed to update this blog'
        }).status(400);
    }

    let newData = {
        author: user._id,
        date: blog.date,
        title: req.body.title,
        content: req.body.content,

    }

    Blog.findByIdAndUpdate(query,newData).then((updatedBlog)=>{
        res.send({
            success: true,
            status: 200,
            message:'Blog updated',
            blog:{
                _id: updatedBlog._id,
                authorId: user._id,
                authorName: user.name,
                date: blog.date,
                title: newBlog.title,
                content: newBlog.content
                
            }
        }).status(200)

    }).catch(err =>{
        res.send(err).status(400);
    })
}

exports.deleteBlog = async(req,res)=>{
    let query = {_id: req.params.id};
    let blog;
  
        blog = await Blog.findOne({_id: req.params.id});
  
    if(!blog) return  res.send({
            success: false,
            status: 404, 
            message: 'Blog not found'
        }).status(404)
  
    
   let user = await currentUser(req,res);
    if(user.role != 'ADMIN' && user._id !== blog.author){
        return res.send({
            success: false,
            status: 400,
            message: 'You are not allowed to delete this blog'
        }).status(400);
    }

  Blog.findOneAndDelete(query).then(removedBlog =>{
        res.send({
            success: true,
            status: 200,
            message: 'Blog removed',
            removedBlog: {
                _id: blog._id,
                authorId: user._id,
                authorName: user.name,
                date: blog.date,
                title: blog.title,
                content: blog.content
            }
        }).status(200)
    }).catch(error => {
        res.send(error);
    })
}

exports.updateBlogImage = async(req,res,next)=>{
    let blogId;
    upload(req, res, (err) => {
        if(err) {
          return res.status(400).send("Something went wrong! "+err);
        }
        blogId = req.params.blogId;
        // console.log(blogId);
        // res.send(req.file);
    
        file = req.file;
        updateBlogWithImageRL(res,blogId,req.file);
      });

      
}

const updateBlogWithImageRL = async(res,blogId,file) => {
    try{
     let blog = await Blog.findOne({_id: blogId});
     console.log(blog)
     let newBlog = {
        author: blog.author,
        title: blog.title,
        content: blog.content,
        date: blog.title,
        imageURL:file.path
    }

    Blog.findOneAndUpdate({_id: blogId},newBlog).then(()=>{
        res.send({
            success: true,
            status: 200,
            message: "Blog image saved",
            blog: newBlog,
            file: file
        }).status(200)
    })
    }
    catch(e){
        console.log("///// "+e)
        return res.send({
            success: false,
            status: 404,
            message:"Blog not found"
        }).status(404)
    }

}

exports.sendComment = async(req,res) => {
    let user = await currentUser(req,res);
    let blogId = req.params.blogId;
    let bog; 
    try{
     blog = await Blog.findOne({_id: blogId});
     let newComment = new Comment();
         newComment.user = user._id;
         newComment.blog = blog._id;
         newComment.date = getCurrentDate();
         newComment.comment = req.body.comment;
         newComment.save().then(comment => {
           res.send({
             success: true,
             status: 200,
             message: "comment sent",
             comment: comment
                     }).status(200)
         })
    }
   catch(error){
     res.send({
       success: false,
       status: 404,
       message: 'Blog not found'
     }).status(404)
   }
  }
  
  module.exports.readComments = async(req,res) => {
   let blogId = req.params.blogId;
   let blog;
   try{
       blog = await Blog.findOne({_id: blogId});
   }
   catch(e){
       return res.send({
           success: false,
           status: 404,
           message: "Blog not found"
       }).status(404);
   }
   let commentsArr = [];
   await Comment.find({blog: blogId}).then(async(comments) => {
         comments.forEach(async(comment) => {
             await User.findOne({_id: comment.user}).then(user => {
                     commentsArr.push({
                     user: _.pick(user,['_id','name','email']),
                     comment: _.pick(comment,['_id','comment','status',date])
                 });
             })
             if(commentsArr.length == comments.length){
                return res.send({
                    sucess: true,
                    status: 200,
                    blog: blog,
                    comments: commentsArr
                })
            }
         })
      
        
   });
}

module.exports.deleteComment = async(req,res) => {
    let commentId = req.params.commentId;
  
    try{
        let comment = await Comment.findOne({_id: commentId});
        if(comment) {
            await Comment.findOneAndDelete({_id: commentId}).then(removed => {
                return res.send({
                    success: true,
                    status: 200,
                    message: "comment deleted",
                    comment: removed
                }).status(200);
            })
        }
        else{
            return res.send({
                success: false,
                status: 404,
                message: "comment not found"
            }).status(404);
        }
        
    }
    catch(e){
        return res.send({
            success: false,
            status: 404,
            message: "Error: "+e
        }).status(404);
       
    }
}