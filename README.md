# iconic-video-variant-backend

This project is a Backend Technical Challenge. The task was to create a lightweight API that could be used for an AB test. Using an existing endpoint to get back results and then, depending on the users variant, enrich the search results with video data.

# Logic

The new endpoint works by taking in all the same query params and filters as the existing endpoint as well as a new parameter 

``
?video=true
``
that signifies whether or not to enrich the search results with videos.

# Running and testing

In order to run this project you can simply install dependencies and run the app using

```
npm install && node app.js
``` 

This will start the localhost server on port 8080

In order to test the project you will need to install the dev dependencies and run the mocha test file using

```
npm install --dev && mocha test.js
```

_note: you may need to install mocha globally for this to work_