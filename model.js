const axios = require('axios');

class Model {

    constructor(){
        this._baseUrl = 'https://eve.theiconic.com.au';
    }

    async getSearchResults(options){
        //getting all the query params from the incoming request
        //and turning them into a query string to filter existing
        //products endpoint
        const queryParams = new URLSearchParams(options);
        const product_path = '/catalog/products?' + queryParams;
        const {data} = await axios.get(this._baseUrl + product_path);
        return data;
    }

    async getVideoData(skus){
        const mapped_data = [];

        const getUrl = (sku) => `${this._baseUrl}/catalog/products/${sku}/videos`;

        //using promise all to request all the video data at once
        //more time efficient as less halting then waiting for each one

        const promises = skus.map(sku => axios.get(getUrl(sku)));
        const results = (await Promise.all(promises))
            .map(response => response.data);

        //creating a sku to video mapping to match the results to later
        for(let i=0;i<skus.length;i++){
            mapped_data.push({
                sku: skus[i],
                videos: results[i]._embedded.videos_url
            })
        }

        return mapped_data;
    }

    enrichData(results,videos){
        //matching the product with the video based on sku
        //if there is no video then video_links will be null
        for(const product of results._embedded.product){
            product.video_links = product.video_count === 0 ? null : (videos.find(video => video.sku === product.sku)).videos
        }
    }
}

module.exports = new Model();