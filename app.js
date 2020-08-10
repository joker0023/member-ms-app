//app.js
App({
  onLaunch: function () {
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login ok');
      }
    })
    
  },
  globalData: {
    userInfo: null
  }
})