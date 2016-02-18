# gulp-invalidate-cloudfront

> Invalidate cloudfront files

## Install

    npm install gulp-invalidate-cloudfront --save-dev

## Usage

```js
var gulp = require('gulp');
var cloudfront = require('gulp-invalidate-cloudfront');

var invalidationBatch = {
    CallerReference: Date.now().toString(),
    Paths: {
        Quantity: 1,
        Items: ['/index.html']
    }
};

var awsSettings = {
    credentials: {
        accessKeyId: 'aaaa',
        secretAccessKey: 'bbbb'
    },
    distributionId: 'EAKJKJSS',
    region: 'us-east-1'
};

gulp.task('deploy', function() {
    return gulp.src(['**/*.js'])
               .pipe(cloudfront(invalidationBatch, awsSettings));
});
```
