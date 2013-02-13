function ApplicationTabGroup(Window) {
	var self = Ti.UI.createTabGroup();
	
	var win1 = new Window(L('home'));
	
	var tab1 = Ti.UI.createTab({
		title: L('home'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	self.addTab(tab1);
	
	return self;
}

module.exports = ApplicationTabGroup;
