const api = require('utils/api.js');

//app.js
App({
  onLaunch: function () {
    // wx.setStorageSync('logs', logs)
    var self = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login ok', res);
        // self.login(res.code);
        self.globalData.token = 'fc9eadebf877cc161bcb3dcfa89e4694';
      }
    })
  },
  login(code) {
    var self = this;
    api.login(code).then(res => {
      if (res.code == 0) {
        self.globalData.token = res.data;
      }
    }).then(() => {
      if (!self.globalData.token) {
        return;
      }
      wx.getUserInfo({
        success: res => {
          console.log(res);
          api.post.updateUser(self.globalData.token, {
            nick: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl
          });
        }
      });
    });
  },
  checkToken(callback) {
    var self = this;
    setTimeout(() => {
      console.log(self.globalData);
      if (self.globalData.token) {
        callback && callback();
      } else{
        self.checkToken();
      }
    }, 1000);
  },
  
  globalData: {
    token: null,
    shopInfoVo: null,
    user: null
  }
})