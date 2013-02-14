function Home(){
  var self = Ti.UI.createView();

  var label = Ti.UI.createLabel({
    text:"イエーイ、ホーム画面",
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE
  });
  self.add(label);

  return self;
}

module.exports = Home;
