import avatar from './avatar.png';
import './index.scss';
import createAvatar from './createAvatar';

createAvatar()

let img = new Image();
img.src = avatar;
img.classList.add('avatar');

let root = document.getElementById('root');
root.append(img);
