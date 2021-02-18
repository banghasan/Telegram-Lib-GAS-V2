function Fetch(url = false) {
    this.req = { url: url, options: { method: 'get' } },
        this.req.url = url;
    this.result = false
}

Fetch.prototype = {

    setHeaders: function (headers) {
        return this.req.options.headers = headers;
    },

    getHeaders: function (headers) {
        return this.req.options.headers;
    },

    setUrl: function (url) {
        return this.req.url = url;
    },

    getUrl: function () {
        return this.req.url;
    },

    // request(url, options)
    request: function () {
        var url = arguments[0] ? arguments[0] : this.req.url;
        var options = arguments[1] ? arguments[1] : this.req.options;
        if (!url) return false;
        return this.result = UrlFetchApp.fetch(url, options);
    },

    toJSON: function () {
        if (!this.result) return false;
        return JSON.parse(this.result);
    },

    get: function () {
        this.req.options.method = 'get';
        if (arguments[0]) this.req.url = arguments[0];
        return this.request();
    },

    post: function (data, isJSON = false) {
        this.req.options.method = 'post';
        if (isJSON) {
            this.req.options.contentType = 'application/json';
            this.req.options.payload = JSON.stringify(data);
        } else {
            this.req.options.payload = data;
        }

        return this.request();
    }

}

daftar.prototype.fetch = Fetch;