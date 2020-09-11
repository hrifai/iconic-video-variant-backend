const model = require('./model');

class Controller {
    constructor(){}

    async getSearchResults(req,res){

        //getting search results by proxying
        // query params to existing api
        let results = await model.getSearchResults(req.query);

        //if we are in the variant where we want video links
        if(req.query.video){

            //getting the skus of the products that have videos
            const skus = results._embedded.product
                .filter(product => !!product.video_count)
                .map(product => product.sku);

            //get the video data ie.links
            const videos = await model.getVideoData(skus);

            //add the video data to the existing search results
            //matched by sku
            model.enrichData(results,videos);

            //prioritise the results by sorting based on video count
            results._embedded.product.sort((a,b) => {
                return b.video_count - a.video_count;
            })
        }

        return res
            .status(200)
            .send(results);
    }

}

module.exports = new Controller();