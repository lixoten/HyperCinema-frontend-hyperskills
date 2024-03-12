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

    page = this.getPage(pagePath)

    tests = [
        // Test 1 - check main-title
        this.node.execute(async () => {
            await this.page.setViewport({width: 1440, height: 1200});
            const title = await this.page.findBySelector('#main-title');
            return title ?
                correct() :
                wrong(`Your page must contain a main-title element.`)
        }),
        // Test 2 - check video
        this.page.execute(() => {
            this.video = document.getElementsByTagName('video');

            return this.video.length > 0 ?
                correct() :
                wrong(`Your page should contain a video tag.`)
        }),
        // Test 3 - check video position
        this.node.execute(async () => {
            let videoCoords = await this.page.evaluate(async () => {
                let video = document.getElementsByTagName('video')[0];
                return [video.getBoundingClientRect().x, video.getBoundingClientRect().y];
            });
            return videoCoords[0] === 90 && nonStrictCompare(videoCoords[1], 134) ?
                correct() :
                wrong(`Check position of video element, your positions now: x=${videoCoords[0]} and y=${videoCoords[1]}.`);
        }),
        // Test 4 - check name
        this.page.execute(() => {
            this.nameEl = document.getElementsByClassName('name');

            return this.nameEl.length > 0 ?
                correct() :
                wrong(`Your page should contain a name element.`)
        }),
        // Test 5 - check description
        this.page.execute(() => {
            this.description = document.getElementsByClassName('description');

            return this.description.length > 0 ?
                correct() :
                wrong(`Your page should contain a description element.`)
        }),
        // Test 6 - check table
        this.page.execute(() => {
            this.table = document.getElementsByTagName('table');

            return this.table.length > 0 ?
                correct() :
                wrong(`Your page should contain a table tag.`)
        }),
        // Test 7 - check buttons
        this.page.execute(() => {
            this.buttons = document.getElementsByTagName('button');

            return this.buttons.length === 2 ?
                correct() :
                wrong(`Your page should contain 2 button elements.`)
        }),
        // Test 8 - check buttons position
        this.node.execute(async () => {
            let buttonCoords = await this.page.evaluate(async () => {
                let buttonEl1 = document.getElementsByTagName('button')[0];
                let buttonEl2 = document.getElementsByTagName('button')[1];
                return [buttonEl1.getBoundingClientRect().x, buttonEl1.getBoundingClientRect().y,
                    buttonEl2.getBoundingClientRect().x, buttonEl2.getBoundingClientRect().y];
            });
            return nonStrictCompare(buttonCoords[0], 955) && nonStrictCompare(buttonCoords[1], 592) &&
            nonStrictCompare(buttonCoords[2], 1170) && nonStrictCompare(buttonCoords[3], 592) ?
                correct() :
                wrong(`Check position of buttons element. Now your project has the following values of buttons elements: 
                left button coordinates - x=${buttonCoords[0]} and y=${buttonCoords[1]}, 
                right button coordinates - x=${buttonCoords[2]} and y=${buttonCoords[3]}`);
        }),
        //Test 9 - check section-header
        this.page.execute(() => {
            this.actorsHeader = document.querySelector('.section-header');

            return this.actorsHeader ?
                correct() :
                wrong(`Your page should contain a .section-header element.`)
        }),
        //Test 10 - check font section-header
        this.page.execute(() => {
            let actorsHeaderStyles = window.getComputedStyle(this.actorsHeader);
            return actorsHeaderStyles.fontSize === '32px' && actorsHeaderStyles.fontWeight === '700' &&
                actorsHeaderStyles.fontFamily.includes('Montserrat') ?
                correct() :
                wrong(`Check font of .section-header element.`)
        }),
        //Test 11 - check position section-header
        this.node.execute(async () => {
            let ahCoords = await this.page.evaluate(async () => {
                let ahObj = document.getElementsByClassName('section-header')[0];
                return [ahObj.getBoundingClientRect().x, ahObj.getBoundingClientRect().y];
            });
            return ahCoords[0] === 90 && nonStrictCompare(ahCoords[1], 786) ?
                correct() :
                wrong(`Check position of .section-header element, your positions are: x=${ahCoords[0]} and y=${ahCoords[1]}.`);
        }),
        //Test 12 - check article
        this.page.execute(() => {
            this.articleObj = document.querySelectorAll('#actors-list article');

            return this.articleObj.length === 7 ?
                correct() :
                wrong(`Your page should contain 7 article elements inside #actors-list element.`)
        }),
        //Test 13 - check first article position
        this.node.execute(async () => {
            let arCoords = await this.page.evaluate(async () => {
                let arObj = document.querySelector('#actors-list article');
                return [arObj.getBoundingClientRect().x, arObj.getBoundingClientRect().y];
            });
            return arCoords[0] === 90 && nonStrictCompare(arCoords[1], 865) ?
                correct() :
                wrong(`Check position of first article element. Now your project has the following values of first article element: 
                x-coordinate=${arCoords[0]} and y-coordinate=${arCoords[1]}.`);
        }),
        //Test 14 - check third article position
        this.node.execute(async () => {
            let arCoords = await this.page.evaluate(async () => {
                let arObj = document.querySelectorAll('#actors-list article')[2];
                return [arObj.getBoundingClientRect().x, arObj.getBoundingClientRect().y];
            });
            return nonStrictCompare(arCoords[0], 460, 5) && nonStrictCompare(arCoords[1], 865) ?
                correct() :
                wrong(`Check position of first article element. Now your project has the following values of third article element: 
                x-coordinate=${arCoords[0]} and y-coordinate=${arCoords[1]}.`);
        }),
        //Test 15 - check article img
        this.page.execute(() => {
            this.imgs = document.querySelectorAll('#actors-list article img');

            return this.imgs.length === 7 ?
                correct() :
                wrong(`Your page should contain 7 img elements inside articles.`)
        }),
        //Test 16 - check article img size
        this.page.execute(() => {
            let styles = window.getComputedStyle(this.imgs[0]);
            return styles.width === "147px" && styles.height === "209px" ?
                correct() :
                wrong(`Check size of img inside article. Now your project has the following values of article img element: 
                width=${styles.width} and height=${styles.height}.`)
        }),
        //Test 17 - check article size
        this.node.execute(async () => {
            let styles = await this.page.evaluate(async () => {
                let arObj = document.querySelector('#actors-list article');
                return [arObj.getBoundingClientRect().width, arObj.getBoundingClientRect().height];
            });
            return styles[0] === 149 && Math.round(styles[1]) === 251 ?
                correct() :
                wrong(`Check size of img inside article. Now your project has the following values of article element: 
                width=${styles[0]} and height=${styles[1]}.`)
        }),
        //Test 18 - check article div
        this.page.execute(() => {
            this.divs = document.querySelectorAll('#actors-list article div');

            return this.divs.length === 7 ?
                correct() :
                wrong(`Your page should contain 7 div elements inside articles.`)
        }),
        //Test 19 - check article div font
        this.page.execute(() => {
            let styles = window.getComputedStyle(this.divs[0]);
            return styles.fontSize === "15px" ?
                correct() :
                wrong(`Check font of your article div element.`)
        }),
        //Test 20 - check article border
        this.page.execute(() => {
            let styles = window.getComputedStyle(this.articleObj[0]);
            return styles.border === "1px solid rgb(0, 0, 0)" && styles.borderRadius === "10px" ?
                correct() :
                wrong(`Check border of article.`)
        }),
        //Test 21 - check position of 5's actors
        this.node.execute(async () => {
            let arCoords = await this.page.evaluate(async () => {
                let artObjs = document.querySelectorAll('#actors-list article');
                artObjs[0].remove();
                artObjs[1].remove();
                let arObj = artObjs[4];
                return [arObj.getBoundingClientRect().x, arObj.getBoundingClientRect().y];
            });
            return nonStrictCompare(arCoords[0], 643, 5) && nonStrictCompare(arCoords[1], 865) ?
                correct() :
                wrong(`Check position of your actors after removing 2 actors. Now your project has the following values of fifth article element: 
                x-coordinate=${arCoords[0]} and y-coordinate=${arCoords[1]}.`);
        }),
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
