function ApplicationWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

  var View, view;
  // ホーム画面を表示
  View = require('ui/views/Home');
  view = new View();
  self.add(view);

  if(!Ti.App.Properties.hasProperty('username')){
    // ユーザー登録画面を表示
    var modalWindow = Ti.UI.createWindow({
      backgroundColor: 'White'
    });
    View = require('ui/views/Subscribe');
    view = new View(modalWindow);
    modalWindow.add(view);
    self.addEventListener('open', function(){
      modalWindow.open({modal:true});
    });
  }
	
	return self;
}

module.exports = ApplicationWindow;
