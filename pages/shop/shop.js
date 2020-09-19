// pages/shop/shop.js

const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfoVo: null,
    showForm: false,
    shops: []
  },

  onReady() {
    let self = this;
    getApp().checkToken(function() {
      self.init();
    });
  },


  init() {
    let self = this;
    self.token =  getApp().globalData.token;
    // console.log('init',  self.token);
    api.get.getOwnerShop(self.token).then((resp) => {
      if (resp.code != 0) {
        return;
      }
      if (resp.data && resp.data.length > 0) {
        self.setData({
          shops: resp.data
        });

        let localShopId = wx.getStorageSync('shopId');
        // console.log('localShopId: ' + localShopId);
        if (!localShopId) {
          localShopId = resp.data[0].id;
        } else {
          let shopIds = [];
          resp.data.forEach(s => {
            shopIds.push(s.id);
          });
          if (!shopIds.includes(localShopId)) {
            localShopId = resp.data[0].id;
          }
        }
        wx.setStorageSync('shopId', localShopId);
        self.getShopInfoVo(localShopId);
      } else {
        self.setData({
          showForm: true
        });
      }
    });
  },

  addShop(e) {
    let self = this;
    var vals = e.detail.value;
    if (vals.shopName && vals.remark) {
      self.setData({
        showForm: false
      });
      api.post.addShop(self.token, vals).then(resp => {
        if (resp.code == 0) {
          self.init();
        }
      });
    } else {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
    }
  },

  getShopInfoVo(shopId) {
    let self = this;
    api.get.getShopInfoVo(self.token, 'shopId=' + shopId).then(resp => {
      if (resp.code != 0) {
        return;
      }
      getApp().globalData.shopInfoVo = resp.data;
      self.setData({
        shopInfoVo: resp.data
      });
    });
  },

  showRemark() {
    wx.showToast({
      title: this.data.shopInfoVo.shop.remark,
      icon: 'none'
    })
  },

  shopChange(e) {
    var self = this;
    let shopId = self.data.shops[e.detail.value].id;
    wx.setStorageSync('shopId', shopId);
    self.getShopInfoVo(shopId);
  }
})