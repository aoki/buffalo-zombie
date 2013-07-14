//--Settings--------------------
var pass = 'PASSWORD';
var ip = 'ROUTERS IP-ADDRESS';
//------------------------------

var Browser = require('zombie');
var browser = new Browser();
var user = 'root';
var url = 'http://' + ip + ':80/cgi-bin/cgi?req=frm&frm=nas_disk.html&rand=1786505967';

var id = setInterval( function () {
  browser.authenticate().basic(user, pass);
  browser.visit(url).then(function() {
    var a = browser.document.getElementsByTagName('input');
    for(var e in a){
      if (typeof(a[e].getAttribute) === 'function' && a[e].getAttribute('name') === 'DEV_RECOGNITION'){
        browser.pressButton(a[e]);
        console.log('Pressed Button');
        clearInterval(id);
        clearTimeout(timeoutId);
        return;
      }
    }
  }).fail(function(err) {
    if (err.toString() === 'Error: Server returned status code 401') {
      console.log('Error:', err);
    } else {
      console.log('Error:', err);
      clearInterval(id);
      clearTimeout(timeoutId);
      return;
    }
  });
}, 3000);

var timeoutId = setTimeout(function(){
  console.log('Error: [Timeout]');
  clearInterval(id);
}, 3000*5);
