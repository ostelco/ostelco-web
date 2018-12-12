# OYA Front End App

##Build tools

This project uses [**Gulp**](http://gulpjs.com/) to compile CSS to SASS, minimise CSS and JS files, optimising images, [**Browsersync**](https://browsersync.io/) for spinning up a local web server.

If you haven't used gulp before you need to do the following

```terminal
npm install gulp-cli -g
npm install gulp -D
```

After that you can just

```terminal
npm install
```

or

```terminal
yarn install
```

And after that just do

```terminal
gulp
```

For task running and

```terminal
gulp build
```

to get the production files in the 'public folder'

##Sign up and mailing
The app also uses Mailchimp and Mandrill to sign up and send emails.
By default Mailchimp embedded forms reload the page upon completion but this is not ewhat we want for our app.

In order to fix this we'll change the form template from a POST to a GET request and also add JSONP in the api call. Like so:

```html
<!-- from mailchimp template -->
<form
  action="http://xxxxx.us#.list-manage1.com/subscribe/post?u=xxxxx&id=xxxx"
  method="post"
  ...
></form>
```

Change it to a GET request, and in the forms "action" attribute change post?u= to post-json?u= and then at the end of the forms action append &c=? to get around any cross domain issue.

```html
<!-- from mailchimp template -->
<form
  action="http://xxxxx.us#.list-manage1.com/subscribe/post-json?u=xxxxx&id=xxxx&c=?"
  method="get"
  ...
></form>
```

MailChimp will return a json object containing 2 values: 'result' - this will indicate if the request was successful or not ( I've only ever seen 2 values, "error" and "success" ) and 'msg' - a message describing the result.

###Mandrill
We use mandrill SDK to send out the emails upon registration. You will need to create a new API key in the Mandrill console when starting a new project, to refer to that list. Also Mailchimp templates need to be exported to Mandrill manually upon updating.
