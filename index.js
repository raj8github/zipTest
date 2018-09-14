// const cp = require('child_process');
// cp.spawn('/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome');

const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

// Optional: set logging level of launcher to see its output.
// Install it using: npm i --save lighthouse-logger
// const log = require('lighthouse-logger');
// log.setLevel('info');

/**
 * Launches a debugging instance of Chrome.
 * @param {boolean=} headless True (default) launches Chrome in headless mode.
 *     False launches a full version of Chrome.
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome() {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    // chromeFlags: [
    //   '--window-size=412,732',
    //   '--disable-gpu',
    //   headless ? '--headless' : ''
    // ]
    //startingUrl: 'https://google.com',
    chromePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  });
}

launchChrome().then(async chrome => {
    const protocol = await CDP({port: chrome.port});
    const { Page } = protocol;
    try {
        await Page.enable();
        const pId = await Page.navigate({url: 'https://google.com'});
        console.log(pId);
    } catch (error) {
        console.log(error)
    }
});