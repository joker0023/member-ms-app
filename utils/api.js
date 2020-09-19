let urlPrefix = 'http://localhost:9090';
let loginUrl = '/auth/appLogin';
let getApiUrl = {
  getUser: '/app/getUser',
  getOwnerShop: '/app/getOwnerShop',
  getShopInfoVo: '/app/getShopInfoVo',
  listMembers: '/app/listMembers',
  getMemberVo: '/app/getMemberVo',
  listRechargeBill: '/app/listRechargeBill',
  listConsumeBill: '/app/listConsumeBill',
  getRechargeBillVo: '/app/getRechargeBillVo',
  getConsumeBillVo: '/app/getConsumeBillVo',
  listClerks: '/app/listClerks',

};
let postApiUrl = {
  updateUser: '/app/updateUser',
  addShop: '/app/addShop',
  updateShop: '/app/updateShop',
  addMember: '/app/addMember',
  delMember: '/app/delMember',
  recharge: '/app/recharge',
  consume: '/app/consume',
  addClerk: '/app/addClerk',
  delClerk: '/app/delClerk',
  
}

let ajax = function (method, url, data, header, callback) {
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
    let logData = {
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

let doPost = function (url, data, header, callback) {
  return ajax('POST', url, data, header, callback);
};

let doGet = function (url, header, callback) {
  return ajax('GET', url, null, header, callback);
}

let login = function(code) {
  return doPost(urlPrefix + loginUrl, {
    code: code
  }, null, null);
}

// let updateUser = function(token, nick, avatar) {
//   return doPost(apiUrl.updateUser, {
//     nick: nick,
//     avatar: avatar
//   }, {
//     token: token
//   }, null);
// }

let getMethods = {};
for (let k in getApiUrl) {
  let url = urlPrefix + getApiUrl[k];
  getMethods[k] = function(token, params) {
    if (!params) {
      params = '';
    }
    return doGet(url + '?' + params, {
      token: token
    }, null);
  };
}

let postMethods = {};
for (let k in postApiUrl) {
  let url = urlPrefix + postApiUrl[k];
  postMethods[k] = function(token, data) {
    return doPost(url, data, {
      token: token
    }, null);
  };
}


module.exports = {
  login: login,
  get: getMethods,
  post: postMethods
}