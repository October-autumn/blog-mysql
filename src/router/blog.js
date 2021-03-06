const { getList, getDetail, newBlog, updataBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const author = 'zhangsan'; // 假数据，等到开发登录时再改为真实数据
    req.body.author = author;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updataBlog(id, req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel('更新博客失败');
    })
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const author = 'zhangsan'; // 假数据，等到开发登录时再改为真实数据
    const result = deleteBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel('删除博客失败');
    })
  }
}

module.exports = handleBlogRouter;