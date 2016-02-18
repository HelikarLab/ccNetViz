function utils() {}

utils.ajax = function(url, data, action) {
    var xhr = new XMLHttpRequest();
    xhr.open(data ? 'POST' : 'GET', url, true);
    data && xhr.setRequestHeader('content-type', 'application/json');
    action && (xhr.onreadystatechange = function()  {return xhr.readyState === 4 && xhr.status === 200 && action(JSON.parse(xhr.responseText));});
    xhr.send(data && JSON.stringify(data));
}