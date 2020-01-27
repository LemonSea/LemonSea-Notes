import _ from 'loadsh';

const dom = $('<div>');
dom.html(_.join(['dell', 'lee']), ' ');
$('body').append(dom);