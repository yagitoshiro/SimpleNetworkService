function Home(parentWindow){
  var Cloud = require('ti.cloud');
  var account = require('lib/account').account;
  var self = Ti.UI.createView();

  var data = [];
  var table = Ti.UI.createTableView({
    data: data
  });

  table.addEventListener('click', function(e){
    var post_data = e.row.data;
    var Window = require('ui/handheld/Post');
    var window = new Window(post_data);
    parentWindow.containingTab.open(window);
  });

  function loadData(){
    if(Ti.App.Properties.hasProperty('username')){
      Cloud.debug = true;
      Cloud.Users.login(account.login_params(), function(e){
        Cloud.Posts.query({order: "-created_at"}, function(e){
          var data = [];
          var posts = e.posts;
          var length = posts.length;
          for(var i = 0; i < length; i++){
            Ti.API.info(JSON.stringify(posts[i]));
            if(!posts[i].title){continue;}
            data.push({title: posts[i].title, data: posts[i]});
          }
          table.setData(data);
        });
      });
    }
  }
  parentWindow.addEventListener('focus', function(e){
    loadData();
  });
  self.add(table);

  //投稿！
  createButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.COMPOSE
  });
  parentWindow.rightNavButton = createButton;
  createButton.addEventListener('click', function(e){
    var Window = require('ui/handheld/Compose');
    var window = new Window();
    window.open({modal: true});
  });

  return self;
}

module.exports = Home;
