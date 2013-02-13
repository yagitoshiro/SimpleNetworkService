function Friends(){
  var Cloud = require('ti.cloud');
  var login_params = {
    login: Ti.App.Properties.getString('username'),
    password: Ti.App.Properties.getString('password')
  };
  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var data = [];
  var table = Ti.UI.createTableView({
    data: data
  });

  self.addEventListener('focus', function(e){
    Cloud.debug = true;
    Cloud.Users.login(login_params, function(e){
      if(e.success){
        var params = {
          per_page: 50,
          page: 1,
          order: "-created_at"
        };
        Cloud.Users.query(params, function(e){
          Ti.API.info(JSON.stringify(e));
          if(e.success && e.users){
            var data = [];
            var length = e.users.length;
            for(var i = 0; i < length; i++){
              data.push({title: e.users[i].username, id: e.users[i].id});
            }
            table.setData(data);
          }
        });
      }else{
        //ログイン失敗
        alert("ログインできません。あなた何者？");
      }
    });
  });

  table.addEventListener('click', function(e){
    if(e.row.hasCheck){
      e.row.hasCheck = false;
    }else{
      e.row.hasCheck = true;
    }
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
    alert(user_ids.join(','));
    Cloud.Users.login(login_params, function(e){
      if(e.success){
        Cloud.Friends.add({user_ids: user_ids.join(',')}, function(e){
          alert("リクエストを送りました");
        });
      }
    });
  });


  self.add(table);
  return self;
}

module.exports = Friends;
