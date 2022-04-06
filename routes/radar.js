const express = require('express');
const router = express.Router();
var fs = require('fs');
const redis = require('../utils/db').services

const radarService = require('../models/radar');
const nasaService = require('../models/nasa').plot;

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

router.get('/nasa', async (req, res) => {
    try {
        let cache_key = `${req.query.year}_${req.query.month}_${req.query.type}`
        let image = await redis.get(cache_key)
        if (image){
            return res.send(image);
        }
        data = {
            month: req.query.month,
            year: req.query.year,
            plot_type: req.query.type
        }
        const plot = await nasaService(data, cache_key);
        return res.send(plot);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;