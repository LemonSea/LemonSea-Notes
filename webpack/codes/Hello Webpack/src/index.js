import _ from 'loadsh';

const dom = $('<div>');
dom.html(_.join(['dell', 'lee']), ' ');
$('body').append(dom);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('service-worker register');
            }).catch(error => {
                console.log('serviec-work register error');
            })
    })
}