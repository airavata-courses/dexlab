const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const userActivity = require('../models/activity');

describe('with Stub: Fetch User Activity', () => {
    before(() => {
        sinon.stub(request, 'get')
            .yields(null, {statusCode:200}, JSON.stringify([
                {
                    "time": "20:08:01",
                    "location":"KZFP",
                    "timestamp": "1644254824",
                    "date":"2022-02-02"    
                },
                {
                    "time": "20:08:02",
                    "location":"KZFP",
                    "timestamp": "1644254890",
                    "date":"2022-02-02"    
                },
                {
                    "time": "20:08:03",
                    "location":"KZFP",
                    "timestamp": "1644254950",
                    "date":"2022-02-02"    
                }
            ]));
    });

    after(() => {
        request.get.restore();
    });

    it('Fetching User Activity', function (done) {
            const spy = sinon.spy();
            userActivity.getActivity(spy)
            .then((data) => {
                expect(data.length).to.greaterThan(0);
                data.forEach(item => {
                    expect(item).to.have.property('time');
                    expect(item).to.have.property('location');
                    expect(item).to.have.property('timestamp');
                    expect(item).to.have.property('date');
                });
                done();
            });
        });
});