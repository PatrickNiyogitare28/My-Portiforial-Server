const {Comment} = require('../modals/comments.modal');
const {Blog} = require('../modals/blogs.modal');
const {User} = require('../modals/users.modal');
const currentUser = require('../utils/auth.currentUser');
const getCurrentDate = require('../utils/date');

exports.sendComment = async(req,res) => {
  let user = await currentUser();
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
  let commentsArr = [];
  await Comment.find().then(comments => {
    comments.forEach(comment => {
      User.findOne({_id: comment.user}).then(user => {
        Blog.findOne({_id: comment.blog}).then(blog => {
         
          commentsArr.push({
         _id: comment._id,
         status: comment.status,
         date: comment.date,
         blog: {
           _id: blog._id,
           title: blog.title,
         },
         user: {
           _id: user._id,
           name: user.name,
           email: user.email
         }
         })
         if(users.length == comments.length){
           return res.send({
             success: true,
             status: 200,
             comments: commentsArr
           })
         }
        })

      })
    })
  })
}