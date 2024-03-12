import path from 'path';
const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

function nonStrictCompare(a, b, offset) {
    if (!offset) {
        offset = 10;
    }
    return Math.abs(a - b) < offset;
}
class Test extends StageTest {

    page = this.getPage(pagePath);

    tests = [
        // Test 1 - check main-title
        this.node.execute(async () => {
            await this.page.setViewport({width: 1440, height: 740});
            const title = await this.page.findBySelector('#main-title');
            return title ?
                correct() :
                wrong(`Your page must contain a main-title element.`)
        }),
        // Test 2 - check login-button
        this.page.execute(() => {
            this.loginButton = document.getElementById('login-button');

            return this.loginButton ?
                correct() :
                wrong(`Your page must contain an element with "login-button" id.`)
        }),
        // Test 3 - check main title font
        this.page.execute(() => {
            this.title = document.getElementById('main-title');
            let titleStyles = window.getComputedStyle(this.title);

            return titleStyles.fontSize === '18px' && titleStyles.fontWeight === '500' &&  titleStyles.fontFamily.indexOf('Inter') !== -1 ?
                correct() :
                wrong(`Check your main-title element font size, family and weight (we expect that you have connected the font Inter using GoogleFonts).
                Now your project has the following values: fontSize=${titleStyles.fontSize}, fontWeight=${titleStyles.fontWeight} and fontFamily=${titleStyles.fontFamily}.`)
        }),
        // Test 4 - check main title position
        this.node.execute(async () => {
            let titleCoords = await this.page.evaluate(async () => {
                let titleObj = document.getElementById('main-title');
                return titleObj ? [titleObj.getBoundingClientRect().x, titleObj.getBoundingClientRect().y] : [-1, -1];
            });
            return titleCoords[0] === 90 && nonStrictCompare(titleCoords[1], 20, 5) ?
                correct() :
                wrong(`Check float and position of main-title element. Now your project has the following values: 
                x-coordinate=${titleCoords[0]} and y-coordinate=${titleCoords[1]}.`);
        }),
        // Test 5 - check body background-color
        this.page.execute(() => {
            let bodyStyles = window.getComputedStyle(document.body);

            return bodyStyles.backgroundColor === 'rgb(242, 235, 255)' ?
                correct() :
                wrong(`Check background-color of body. Now your project has the following values: backgroundColor=${bodyStyles.backgroundColor}.`)
        }),
        // Test 6 - check login-button font
        this.page.execute(() => {
            let loginStyles = window.getComputedStyle(this.loginButton);

            return loginStyles.fontSize === '16px' && loginStyles.fontWeight === '500' && loginStyles.opacity === '0.8' &&
                loginStyles.fontFamily.includes('Inter') ?
                correct() :
                wrong(`Check your login-button element font size, weight, family and opacity (we expect that you have connected the font Inter using GoogleFonts).
                Now your project has the following values: fontSize=${loginStyles.fontSize}, fontWeight=${loginStyles.fontWeight},
                opacity=${loginStyles.opacity} and fontFamily=${loginStyles.fontFamily}.`)
        }),
        // Test 7 - check login position
        this.node.execute(async () => {
            let loginCoords = await this.page.evaluate(async () => {
                let loginObj = document.getElementById('login-button');
                return loginObj ? [loginObj.getBoundingClientRect().x + loginObj.getBoundingClientRect().width, loginObj.getBoundingClientRect().y] : [-1, -1];
            });

            return loginCoords[0] === 1350 && loginCoords[1] === 20 ?
                correct() :
                wrong(`Check float and position of login-button. Now your project has the following values of login-button: 
                y-coordinate=${loginCoords[1]} and x-coordinate of the right border=${loginCoords[0]}`);
        }),
        // Test 8 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 9 - check video position
        this.node.execute(async () => {
            let videoCoords = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return video ? [video.getBoundingClientRect().x, video.getBoundingClientRect().y] : [-1, -1];
            });
            return videoCoords[0] === 90 && nonStrictCompare(videoCoords[1], 134) ?
                correct() :
                wrong(`Check position of video element. Now your project has the following values of video: 
                x-coordinate=${videoCoords[0]} and y-coordinate=${videoCoords[1]}.`);
        }),
        // Test 10 - check video poster and controls
        this.page.execute(() => {
            return this.video[0].controls && this.video[0].poster ?
                correct() :
                wrong(`Check if you have controls enabled for the video element and if a poster has been added.`)
        }),
        // Test 11 - check video border
        this.page.execute(() => {
            let videoStyles = window.getComputedStyle(this.video[0]);

            return videoStyles.border === "1px solid rgb(0, 0, 0)" && videoStyles.borderRadius === "10px" ?
                correct() :
                wrong(`Please, check border of your video tag. Now your project has the following values of video: 
                border=${videoStyles.border} and borderRadius=${videoStyles.borderRadius}.`)
        }),
        // Test 12 - check video width and height
        this.node.execute(async () => {
            let videoWidth = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return [video.getBoundingClientRect().width, video.getBoundingClientRect().height];
            });

            return nonStrictCompare(videoWidth[0], 828, 5) && nonStrictCompare(videoWidth[1], 500) ?
                correct() :
                wrong(`Check size of video element, now you have width=${videoWidth[0]} and height=${videoWidth[1]}.`);
        }),

    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
