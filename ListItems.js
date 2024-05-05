var aTags = document.querySelectorAll('#body a');
for (var i=0;i < aTags.length;i++){
    var current = aTags[i]
    current.setAttribute("href",'./' + current.innerHTML.replace(/ /g,'-') + '/index.html');
}
