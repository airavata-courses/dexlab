const express = require('express');
const router = express.Router();

const userService = require('../models/activity');

router.get('/get', function (req, res) {
    userService.getActivity(req.headers)
        .then(result => {
            if (result.history) {
                res.status(200).send(JSON.parse(result.userLogs))
            } else {
                res.status(200).send({
                    data: []
                })
            }
        })
        .catch(err => res.status(503).send(err));
});

router.post('/set', async (req, res) => {
    try {
        let userActivity = await userService.getActivity(req.headers);
        console.log(userActivity)
        req.body.timestamp = new Date().getTime()
        
        if (userActivity.history) {
            userActivity.userLogs = JSON.parse(userActivity.userLogs);
            
            if (userActivity.userLogs.data.length > 20) {
                userActivity.userLogs.data.pop()
            }
            userActivity.userLogs.data.unshift(req.body);
        } else {
            userActivity = {
                data: []
            }
            userActivity.data.push(req.body);
        }

        let set = await userService.setActivity(req.headers, JSON.stringify(userActivity));
        console.log(set)
        if (set) {
            res.status(200).send({
                "message": "success"
            })
        } else {
            res.status(400).send({
                "message": "failure"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(503).send({
            error: error,
            status: "Something went wrong"
        })
    }
});

module.exports = router;