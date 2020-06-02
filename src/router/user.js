const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 设置 cookie 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const method = req.method;
  
  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const result = login(username, password);
    return result.then(data => {
      if (data.username) {
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        return new SuccessModel();
      }
      return new ErrorModel('登录失败');
    });
  }

  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log(req.cookie);
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel());
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }
}

module.exports = handleUserRouter;