/**
 * Created by Rahil on 07-07-2016.
 */
makeCorsRequest();
setInterval(function(){
        makeCorsRequest();
    },20000);
self.addEventListener('message', function (e) {
}, false);
// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
};
// Make the actual CORS request.
function makeCorsRequest() {
    // All HTML5 Rocks properties support CORS.
    var url = 'https://finance.google.com/finance/info?client=ig&q=NSE:NIFTY';
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
          data = text.substring(3);
        data = JSON.parse(data);
        console.log(data);
        var dataJ = data;
        var len = dataJ.length;
        console.log(len);
        var curPrice = 0;
        if (dataJ[0].l != null) {
            console.log("came inside dataJ[0]");
            curPrice = parseFloat((dataJ[0].l).replace(",", ""));
        }
        console.log(curPrice);
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
};
