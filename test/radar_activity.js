const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');
const radarModel = require('../models/radar');

describe('with Stub: radarget', () => {
    before(() => {
        sinon.stub(request, 'post')
            .yields(null, null, JSON.stringify({
                "radars": [
                    "TIAD",
                    "TIAH",
                    "TICH",
                    "TIDS"
                ]
            }));
    });

    after(() => {
        request.post.restore();
    });

    it('should radarget', (done) => {
        const spy = sinon.spy();
        radarModel.radars({
                date: "2022-02-02",
                test: true
            })
            .then((data) => {
                expect(data.radars.length).to.greaterThan(0);
                done();
            });
    });
});