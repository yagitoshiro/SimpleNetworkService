function ApplicationTabGroup(Window) {
	var self = Ti.UI.createTabGroup();
	
	var home = new Window(L('home'));
	
	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/KS_nav_ui.png',
		window: home
	});
	home.containingTab = tab1;

  var Friends = require('ui/handheld/Friends');
  var friends = new Friends();

  var tab2 = Ti.UI.createTab({
		title: 'ユーザー一覧',
		icon: '/images/KS_nav_ui.png',
		window: friends
  });
  friends.containingTab = tab2;

  var Requests = require('ui/handheld/Requests');
  var requests = new Requests();

  var tab3 = Ti.UI.createTab({
		title: 'リクエスト一覧',
		icon: '/images/KS_nav_ui.png',
		window: requests
  });
  requests.containingTab = tab3;

  var List = require('ui/handheld/List');
  var list = new List();
  var tab4 = Ti.UI.createTab({
		title: 'フレンド一覧',
		icon: '/images/KS_nav_ui.png',
		window: list
  });
  list.containingTab = tab4;

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	return self;
}

module.exports = ApplicationTabGroup;
