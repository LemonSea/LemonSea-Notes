import './style.css';

// 异步加载方式
async function getComponent() {
    const { default: _ } = await import(/* webpackChunkName:"lodash"*/'loadsh');

    const element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'Lee'], '_');
    return element;
}

document.addEventListener('click', () => {
    getComponent().then(element => {
        document.body.appendChild(element);
    })
})
