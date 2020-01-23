import './style.css';
var btn = document.createElement('button');
btn.innerHTML = 'add';
document.body.appendChild(btn);
btn.onclick = function () {
    var div = document.createElement('div');
    div.innerHTML = 'item';
    document.body.appendChild(div);
}