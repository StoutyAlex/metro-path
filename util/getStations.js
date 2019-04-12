const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const appDir = path.dirname(__dirname + '/data/');

const src_bkt = process.env.METRO_PROJECT_BUCKET;
const src_key = process.env.METRO_DATA_STATIONS;

const environment = process.env.ENV; 

module.exports = () => {
  if (environment == 'dev') {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(fs.readFileSync(appDir + '/stations.json', 'utf8')));
    });
  } else {
    return new Promise((resolve, reject) => {
      s3.getObject({
        Bucket: src_bkt,
        Key: src_key
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data.Body));
        }
      });
    });
  }
}
