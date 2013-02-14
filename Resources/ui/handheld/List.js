function List(){
  var self = Ti.UI.createWindow();
  var Cloud = require('ti.cloud');
  var account = require('lib/account').account;

  var data = [];
  var table = Ti.UI.createTableView({
    editable: true,
    data: data
  });
  self.add(table);

  var editButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.EDIT
  });
  var cancelButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.CANCEL
  });
  self.rightNavButton = editButton;

  editButton.addEventListener('click', function(e){
    self.rightNavButton = cancelButton;
    table.editing = true;
  });

  cancelButton.addEventListener('click', function(e){
    self.rightNavButton = editButton;
    table.editing = false;
  });

  function loadData(){
    Cloud.debug = true;
    Cloud.Users.login(account.login_params(), function(e){
      if(e.success){
        Cloud.Friends.search({user_id: e.users[0].id}, function(e){
          var friends = e.users;
          var length = friends.length;
          var data = [];
          for(var i = 0; i < length; i++){
            data.push({title: friends[i].username, id: friends[i].id});
          }
          table.setData(data);
        });
      }else{
        alert('ログインできない…');
      }
    });
  }
  self.addEventListener('focus', function(){
    loadData();
  });

  return self;
}

module.exports = List;
