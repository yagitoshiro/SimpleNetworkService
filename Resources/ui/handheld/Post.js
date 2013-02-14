function Post(post_data){
  var self = Ti.UI.createWindow({
    backgroundColor:'White',
    title: post_data.title
  });

  var wrap = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 0,
    layout: 'vertical'
  });
  var titleLabel = Ti.UI.createLabel({
    top: 5,
    left: 10,
    right: 10,
    text: post_data.title
  });
  wrap.add(titleLabel);
  var contentLabel = Ti.UI.createLabel({
    top: 5,
    left: 10,
    right: 10,
    text: post_data.content
  });
  wrap.add(contentLabel);
  self.add(wrap);

  return self;
}

module.exports = Post;
