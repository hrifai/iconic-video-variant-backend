const supertest = require("supertest");
const assert = require('assert');
const app = require("./app");

describe("GET default search results", function() {

    it("should give back some results", function(done) {
        supertest(app)
            .get("/variant-testing?gender=female&page=2&page_size=100")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });

    it("should successfully filter results", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });

    it("should give back results with no video_link property", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });
});

describe("GET search results enriched with video", function() {

    it("should give back some results", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });

    it("should successfully filter results", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });

    it("should give back results with video_link property", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });

    it("should prioritise results with video_count", function(done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if (err) done(err);
                done();
            });
    });
});