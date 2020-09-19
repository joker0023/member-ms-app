const api = require("../../utils/api");

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null
  },


  onReady() {
    let self = this;
    getApp().checkToken(function() {
      self.init();
    });
  },

  init() {
    let self = this;
    let token =  getApp().globalData.token;
    api.get.getUser(token).then(resp => {
      if (resp.code == 0) {
        getApp().globalData.user = resp.data;
        self.setData({
          user:  resp.data
        });
      }
    });
  }
})