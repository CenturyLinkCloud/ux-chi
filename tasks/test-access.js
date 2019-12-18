const pa11y = require('pa11y'),
    fs = require('fs'),
    gulp = require("gulp");

let urlNumber = 0;
let urls;

const options = {
    chromeLaunchConfig: {
        args: ['--no-sandbox']
    },
    log: {
        debug: console.log,
        error: console.error,
        info: console.log
    }
};

async function getUrls() {
    const components = ['backstop-non-responsive.json', 'backstop-non-responsive-ce.json'];

    urls = components.map(file => {
        return JSON.parse(fs.readFileSync(file))['scenarios'].map(component => {
            return component['url'];
        });
    });

    urls = [].concat(...urls);

    console.log(urls);
}

async function runTest(url) {

    try {
        pa11y(url, options).then((result) => {
            console.log(result);
            if (urlNumber < urls.length - 1) {
                runTest(urls[urlNumber + 1])
                urlNumber++;
            }
        });

    } catch (error) {
        console.error(error.message);
    }
}

gulp.task('test:access', (cb) => {
    getUrls().then(() => {
        runTest(urls[0]);
    });

    cb();
});