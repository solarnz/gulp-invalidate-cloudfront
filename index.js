'use strict';

var gutil = require('gulp-util');

var AWS = require('aws-sdk');
var through = require('through2');

module.exports = function(invalidationBatch, options) {
  function bufferContents(file, enc, cb) {
    cb();
  }

  function endStream(cb) {
    AWS.config.update({
      region: options.region,
      accessKeyId: (process.env.AWS_ACCESS_KEY_ID ||
                    options.credentials.accessKeyId),
      secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY ||
                        options.credentials.secretAccessKey)
    });

    var cloudfront = new AWS.CloudFront();
    cloudfront.createInvalidation({
      DistributionId: options.distributionId,
      InvalidationBatch: invalidationBatch
    }, function(err, data) {
      if (err) {
        throw new gutil.PluginError('gulp-invalidate-cloudfront', 'Could not invalidate cloudfront: ' + err);
        return cb(false);
      }

      gutil.log('Cloudfront invalidation created with id: ' + data.Invalidation.Id);
      cb();
    });
  }

  return through.obj(bufferContents, endStream);
};
