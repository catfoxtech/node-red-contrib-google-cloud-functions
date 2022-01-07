module.exports = function (RED) {
    'use strict';

    function CloudFunctionsInputNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg, _send, done) {
            if (msg.req && msg.res) {
                _send({
                    payload: msg.req.method === 'GET' ? msg.req.query : msg.req.body,
                    req: msg.req,
                    res: {
                        _res: msg.res
                    }
                })
            } else {
                _send(msg);
            }

            if (done) {
                done();
            }
        });
    }

    function CloudFunctionsOutputNode(config) {
        RED.nodes.createNode(this, config);

        this.on('input', function (msg, _send, done) {
            if (msg.func) {
                msg.func();
            }

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType('gcp-cloud-functions-http-in', CloudFunctionsInputNode);
    RED.nodes.registerType('gcp-cloud-functions-topic-in', CloudFunctionsInputNode);
    RED.nodes.registerType('gcp-cloud-functions-bucket-in', CloudFunctionsInputNode);
    RED.nodes.registerType('gcp-cloud-functions-topic-out', CloudFunctionsOutputNode);
    RED.nodes.registerType('gcp-cloud-functions-bucket-out', CloudFunctionsOutputNode);
}
