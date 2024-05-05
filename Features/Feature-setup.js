var feature = document.location.pathname.split('/').reverse()[1].replace(/-/g,' ')
document.getElementsByTagName('title')[0].innerText = feature
var title = document.createElement("a")
title.innerText = feature
title.href = '../features-home.html'
document.getElementById('head').appendChild(title)