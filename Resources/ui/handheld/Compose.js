function Compose(){

  var Cloud = require('ti.cloud');
  var account = require('lib/account').account;

  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var cancelButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.CANCEL
  });
  self.leftNavButton = cancelButton;
  cancelButton.addEventListener('click', function(){self.close();});

  var sendButton = Ti.UI.createButton({
    systemButton: Titanium.UI.iPhone.SystemButton.SAVE
  });
  self.rightNavButton = sendButton;

  var wrap = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    layout: 'vertical',
    top: 0
  });

  var titleField = Ti.UI.createTextField({
    top: 10,
    height: 50,
    left: 10,
    right: 10,
    hintText: 'タイトル',
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
  });
  wrap.add(titleField);

  var contentArea = Ti.UI.createTextArea({
    top: 40,
    height: 150,
    left: 10,
    right: 10,
    borderWidth: 1,
    borderRadius: 5
  });
  wrap.add(contentArea);

  sendButton.addEventListener('click', function(e){
    Cloud.debug = true;
    Cloud.Users.login(account.login_params(), function(e){
      if(e.success){
        Cloud.Posts.create({
          title: titleField.value,
          content: contentArea.value
        }, function(e){
          if(e.success){
            self.close();
          }else{
            alert("投稿できませんでした");
          }
        });
      }
    });
  });

  self.add(wrap);

  return self;
}
module.exports = Compose;
