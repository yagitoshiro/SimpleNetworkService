function Requests(){

  var Cloud = require('ti.cloud');
  Cloud.debug = true;

  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var data = [];
  var table = Ti.UI.createTableView({
    top: 0,
    data: data
  });

  self.addEventListener('focus', function(e){
    var account = require('lib/account').account;
    Cloud.Users.login(account.login_params, function(e){
      if(e.success){
        Cloud.Friends.requests(function(e){
          alert(e);
        });
      }
    });
  });

  self.add(table);
  return self;
}

module.exports = Requests;
