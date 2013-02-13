function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

  var View;
  if(Ti.App.Properties.hasProperty('username')){
    // ホーム画面を表示
    View = require('ui/views/Home');
    self.tabBarHidden = false;
  }else{
    // ユーザー登録画面を表示
    View = require('ui/views/Subscribe');
    self.tabBarHidden = true;
  }
  var view = new View();
  self.add(view);
	
	return self;
}

module.exports = ApplicationWindow;
