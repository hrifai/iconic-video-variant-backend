const supertest = require("supertest");
const assert = require('assert');

const app = require("./app");

describe("For the endpoint without video", function() {

    const default_url = "/variant-search?gender=female&page=9&page_size=100";

    describe("GET default search results", function () {

        it("should give back some results", function (done) {
            supertest(app)
                .get(default_url)
                .expect(200)
                .then(response => {
                    const data = JSON.parse(response.text);
                    if(data._embedded.product.length > 0) done()
                })
        });

        it("should give back results with no video_links property", function (done) {
            supertest(app)
                .get(default_url)
                .expect(200)
                .then(response => {
                    const data = JSON.parse(response.text);
                    if(!(data._embedded.product.every(product => product.video_links))) done();
                })
        });

    });
});


describe("For the endpoint with video", function() {

    const video_varient_url = "/variant-search?gender=female&page=9&page_size=100&video=true";

    describe("GET search results enriched with video", function () {

        it("should give back some results", function (done) {
            supertest(app)
                .get(video_varient_url)
                .expect(200)
                .then(response => {
                    const data = JSON.parse(response.text);
                    if(data._embedded.product.length > 0) done()
                })
        });


        it("should give back results with video_links property", function (done) {
            supertest(app)
                .get(video_varient_url)
                .expect(200)
                .then(response => {
                    const data = JSON.parse(response.text);
                    if(data._embedded.product.filter(p => p.video_links).length > 0) done();
                })
        });

        it("should prioritise results with video_count", function (done) {
            supertest(app)
                .get(video_varient_url)
                .expect(200)
                .then(response => {
                    const data = JSON.parse(response.text);
                    const products = data._embedded.product;

                    const expected_sort = products.sort((a,b) => {
                        return b.video_count - a.video_count
                    });

                    if(expected_sort[0].video_count <= products[0].video_count) done();
                })
        });
    });
});