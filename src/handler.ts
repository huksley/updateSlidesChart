'use strict';
import * as fs from 'fs'
import { google } from 'googleapis'
import { Context } from 'aws-lambda';

function authorize() {
  return new Promise((resolve, reject) => {
    // configure a JWT auth client
    console.warn("Authorizing with key", process.env.GOOGLE_SHEETS_CLIENT_EMAIL)
    let jwtClient = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      process.env.GOOGLE_SHEETS_CLIENT_KEY,
      ['https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/presentations']);
    //authenticate request
    jwtClient.authorize(function (err: any, tokens: any) {
      if (err) reject(err);
      console.warn("Authorization were successful");
      resolve(jwtClient)
    });
  })
}

function updateSlidesChartAuth(presentationId: string, chartObjectId: string, auth: any) {
  return new Promise((resolve, reject) => {
    const slides = google.slides({version: 'v1', auth});
    slides.presentations.batchUpdate({
      "presentationId": presentationId,
      "resource": {
        "requests": [
          {
            "refreshSheetsChart": {
              "objectId": chartObjectId
            }
          }
        ]
      }
    }).then((res: any) => {
      console.log(res);
      resolve(res);
    }).catch((err: Error) => {
      console.log(err);
      reject(err)
    })
  })
}

module.exports.updateSlidesChart = (event: any, context: Context) => {
  authorize().then(auth => updateSlidesChartAuth(process.env.PRESENTATION_ID, process.env.CHART_OBJECT_ID, auth)).catch(err => console.warn(err))
  context.done()
}

if (process.env.RUN_CONSOLE) {
  console.warn("Running in console", process.env)
  authorize()
  .then(auth => updateSlidesChartAuth(process.env.PRESENTATION_ID, process.env.CHART_OBJECT_ID, auth)
  .then(res => {})
  .catch(err => console.warn('Failed to update chart', err.message, process.env.DEBUG ? err : '')))
  .catch(err => console.warn('Failed to authorize', err.message, process.env.DEBUG ? err : ''))
}