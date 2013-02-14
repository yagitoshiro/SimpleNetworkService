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

  table.addEventListener('click', function(e){
    if(e.row.hasCheck){
      e.row.hasCheck = false;
    }else{
      e.row.hasCheck = true;
    }
  });

  var status = true;

  function loadData(){

    if(status === false){
      return;
    }
    status = false;

    var loading = Ti.UI.createView({
      top: 0,
      backgroundColor: 'Black',
      opacity: 0.7
    });
    var ind = Ti.UI.createActivityIndicator({
      color: 'White',
      message: '送信中',
      width: Ti.UI.SIZE
    });
    loading.add(ind);
    ind.show();
    self.add(loading);
    Cloud.Users.login(account.login_params(), function(e){
      if(e.success){
        Cloud.Friends.requests(function(e){
          var requests = e.friend_requests;
          self.remove(loading);
          status = true;
          if(requests){
            var length = requests.length;
            var data = [];
            for(var i = 0; i < length; i++){
              data.push({title: requests[i].user.username, id: requests[i].user.id});
            }
            table.setData(data);
          }
        });
      }else{
        self.remove(loading);
        status = true;
      }
    });
  }

  self.addEventListener('focus', function(e){
    loadData();
  });

  var reloadButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
  });
  self.leftNavButton = reloadButton;
  reloadButton.addEventListener('click', function(){
    loadData();
  });

  var saveButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.SAVE
  });
  self.rightNavButton = saveButton;
  saveButton.addEventListener('click', function(e){
    var rows = table.getData()[0].rows;
    var length = rows.length;
    var user_ids = [];
    for(var i = 0; i < length; i++){
      if(rows[i].hasCheck){
        user_ids.push(rows[i].id);
      }
    }
    //alert(user_ids.join(','));
    Cloud.Users.login(account.login_params(), function(e){
      if(e.success){
        Cloud.Friends.approve({user_ids: user_ids.join(',')}, function(e){
          alert("リクエストを送りました");
          loadData();
        });
      }
    });
  });

  self.add(table);
  return self;
}

module.exports = Requests;
