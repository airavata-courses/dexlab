const express = require('express');
const router = express.Router();
var fs = require('fs');

const radarService = require('../models/radar');

router.get('/get', function (req, res) {
    radarService.radars(req.headers)
        .then(result => {

            res.status(200).send(result)

        })
        .catch(err => res.status(503).send(err));
});

router.post('/plot', function (req, res) {
    radarService.weatherPlot(req.headers, req.body)
        .then(result => {
            fs.readFile('c.png', function (err, content) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/html'
                    })
                    console.log(err);
                    res.end("No such image");
                } else {
                    res.writeHead(200, {
                        'Content-type': 'image/png'
                    });
                    res.end(content);
                }
            });
        })
        .catch(err => res.status(503).send(err));
});

module.exports = router;