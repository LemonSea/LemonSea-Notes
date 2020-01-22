function Sidebar() {
    let dom = document.getElementById('root');
    let sidebar = document.createElement('div');
    sidebar.innerHTML = 'sidebar';
    dom.append(sidebar);
}

export default Sidebar;
