function Requests(){

  var Cloud = require('ti.cloud');
  Cloud.debug = true;
  var account = require('lib/account').account;

  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var data = [];
  var table = Ti.UI.createTableView({
    top: 0,
    data: data
  });

  self.addEventListener('focus', function(e){
    Cloud.Users.login(account.login_params, function(e){
      if(e.success){
        Cloud.Friends.requests(function(e){
          var requests = e.friend_requests;
          if(requests){
            var length = requests.length;
            var data = [];
            for(var i = 0; i < length; i++){
              data.push({title: requests[i].user.username, id: requests[i].user.id});
            }
            table.setData(data);
          }
        });
      }
    });
  });

  self.add(table);
  return self;
}

module.exports = Requests;
