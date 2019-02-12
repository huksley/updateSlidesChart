# Update Google Slides chart

## Usage
 
  - Create service account in Google Console
  - Give access to generated user to Google Sheet/Google Slide used
  - Obtain objectId for chart using API for presentations
  - Define vars in AWS Systems Manager / Parameter Store (see serverless.yml for a list)
  - Deploy `npm run sls:deploy`

## Links

  * https://github.com/googleapis/google-api-nodejs-client/blob/master/src/apis/slides/v1.ts
  * https://developers.google.com/slides/reference/rest/v1/presentations/batchUpdate
  * https://stackoverflow.com/questions/38949318/google-sheets-api-returns-the-caller-does-not-have-permission-when-using-serve
  * https://github.com/googleapis/google-api-nodejs-client/issues/588

