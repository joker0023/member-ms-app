// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [
      {
        id:1,
        title: 200,
        content: 'this is test200',
        desc: false
      },
      {
        id:2,
        title: 400,
        content: 'this is test400',
        desc: false
      }
    ],
    other: 'just test'
  },

  toggleDesc: function(event) {
    let id = event.currentTarget.dataset.recordid;
    let records = this.data.records;
    records.forEach(function(r) {
      if (r.id == id) {
        r.desc = !r.desc;
      }
    });
    this.setData({
      records: records
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})