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
        // self.globalData.token = '';
      }
    })
  },
  login: function(code) {
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
          api.updateUser(self.globalData.token, res.userInfo.nickName, res.userInfo.avatarUrl);
        }
      });
    });
  },
  globalData: {
    userInfo: null,
    token: null
  }
})