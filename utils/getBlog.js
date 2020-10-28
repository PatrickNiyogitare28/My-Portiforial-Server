const {Blog} = require('../modals/blogs.modal');

module.exports.getBlog = async(blogId) => {
    return await Blog.findOne({_id: blogId});
}