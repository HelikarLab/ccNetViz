console.log("Web worker is executing");
self.addEventListener('message', function (e) {
    self.postMessage(e.data);
}, false);

// self.postMessage("Hello I am a web worker.");