//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // wx.getUserInfo({
    //   success: res => {
    //     console.log(res);
    //   }
    // });
  },
  onReady: function() {
    // wx.switchTab({
    //   "url": "/pages/shop/shop"
    // });
    console.log('token', app.globalData.token);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
