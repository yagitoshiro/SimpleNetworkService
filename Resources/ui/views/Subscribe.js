function Subscribe(modalWindow){
  var self = Ti.UI.createScrollView({
    layout:'vertical',
    contentWidth: 'auto',
    contentHeight: 'auto',
    showVerticalScrollIndicator: true
  });

  var textField = Ti.UI.createTextField({
    hintText:'ユーザー名を登録してね（半角英数字）',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10, right: 10,
    height: 60
  });

  var passwordField = Ti.UI.createTextField({
    passwordMask: true,
    hintText:'パスワードを入力してね',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10, right: 10,
    height: 60
  });

  var passwordConfirmationField = Ti.UI.createTextField({
    passwordMask: true,
    hintText:'確認のためにもう一度パスワードを入力してね',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10, right: 10,
    height: 60
  });

  var submitButton = Ti.UI.createButton({
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    title: '登録',
    top: 10
  });

  self.add(textField);
  self.add(passwordField);
  self.add(passwordConfirmationField);
  self.add(submitButton);

  submitButton.addEventListener('click', function(e){

    var loading = Ti.UI.createView({
      top: 0,
      backgroundColor: 'Black',
      opacity: 0.7
    });
    modalWindow.add(loading);
    var ind = Ti.UI.createActivityIndicator({
      message: '登録中',
      color: 'White',
      width: Ti.UI.SIZE
    });
    loading.add(ind);
    ind.show();

    if(Ti.Network.online){
      var Cloud = require('ti.cloud');
      Cloud.debug = true;
      var username = textField.value;
      var password = passwordField.value;
      var password_confirmation = passwordConfirmationField.value;
      var params = {
        username: username,
        password: password,
        password_confirmation: password_confirmation
      };

      function validate(p){
        var error_messages = [];
        if(p.username === ""){
          error_messages.push("ユーザー名を入れろ");
        }
        if(p.password.length < 4){
          error_messages.push("パスワードが短すぎます（4文字以上でお願いします）");
        }
        if(p.password.length > 20){
          error_messages.push("ええ、安全第一ですけど、いくらなんでもパスワードが長いです");
        }
        if(p.password != p.password_confirmation){
          error_messages.push("パスワードが一致していません");
        }
        return error_messages;
      }

      var error_messages = validate(params);

      if(error_messages.length <= 0){
        //alert(params);
        Cloud.Users.create(params, function(e){
          if(e.success){
            //登録成功
            Ti.App.Properties.setString('username', username);
            Ti.App.Properties.setString('password', password);
            modalWindow.close();
          }else{
            //登録失敗のエラー処理
            modalWindow.remove(loading);
            alert(e.message);
          }
        });
      }else{
        modalWindow.remove(loading);
        alert(error_messages.join("\n"));
      }
    }else{
      modalWindow.remove(loading);
      alert("ごめんね、ネットワークが繋がってないみたい。調べてみて！");
    }
  });
  return self;
}

module.exports = Subscribe;
