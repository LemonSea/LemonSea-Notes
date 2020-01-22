function Header() {
    let dom = document.getElementById('root');
    let header = document.createElement('div');
    header.innerHTML = 'header';
    dom.append(header);
}

export default Header;
