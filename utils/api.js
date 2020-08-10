var urlPrefix = 'http://localhost:9091';
var apiUrl = {
  hello: urlPrefix + '/hello'
};

var ajax = function (method, url, data, header, callback) {
  if (!method) {
    method = 'GET';
  }
  if (!url) {
    return;
  }
  if (!data) {
    data = {};
  }
  if (!header) {
    header = {};
  }
  return new Promise((resolve, reject) => {
    console.log(url);
    console.log(data, header);
    wx.request({
      method: method,
      url: url,
      data: JSON.stringify(data),
      header: header,
      success: function (resp) {
        wx.hideLoading();
        console.log('respose obj: ', resp);
        if (resp.data.code != 0) {
          wx.showModal({
            content: resp.data.message || '服务器出错',
            showCancel: false
          });
        }
        callback && callback(resp.data);
        resolve && resolve(resp.data);
      },
      fail: function (resp) {
        wx.hideLoading();
        console.log('fail: ', resp);
        wx.showModal({
          content: '网络错误',
          showCancel: false
        });
      }
    });
  });
};

var doPost = function (url, data, header, callback) {
  return ajax('POST', url, data, header, callback);
};

var doGet = function (url, header, callback) {
  return ajax('GET', url, null, header, callback);
}

var hello = function (code, userInfo, callback) {
  return doGet(apiUrl.hello, null, callback);
};



module.exports = {
  hello: hello
}