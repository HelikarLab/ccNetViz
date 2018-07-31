self.addEventListener('message', function (e) {

    console.log("random web worker is working");
    let data = e.data;

    for (let i = 0, n = data.length; i < n; i++) {
        let o = data[i];
        o.x = Math.random();
        o.y = Math.random();
    }
    
    self.postMessage(data);
}, false);