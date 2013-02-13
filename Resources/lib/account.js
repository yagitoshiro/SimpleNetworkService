var account = {
  login_params: {
    login: Ti.App.Properties.getString('username'),
    password: Ti.App.Properties.getString('password')
  }
};

exports.account = account;
