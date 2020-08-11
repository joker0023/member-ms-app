var urlPrefix = 'http://localhost:9090';
var apiUrl = {
  login: urlPrefix + '/auth/appLogin',
  updateUser: urlPrefix + '/app/updateUser'
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
    var logData = {
      url: url,
      data: data,
      header: header
    };
    console.log('ajax-request: ', logData);
    wx.request({
      method: method,
      url: url,
      data: JSON.stringify(data),
      header: header,
      success: function (resp) {
        wx.hideLoading();
        console.log('respose obj: ', resp.data);
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
        reject && reject(resp);
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

var login = function(code) {
  return doPost(apiUrl.login, {
    code: code
  }, null, null);
}

var updateUser = function(token, nick, avatar) {
  return doPost(apiUrl.updateUser, {
    nick: nick,
    avatar: avatar
  }, {
    token: token
  }, null);
}



module.exports = {
  login: login,
  updateUser: updateUser
}