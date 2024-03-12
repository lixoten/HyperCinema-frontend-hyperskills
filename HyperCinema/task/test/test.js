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
            await this.page.setViewport({width: 1440, height: 2776});
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
            this.actorsHeader = document.querySelectorAll('.section-header');

            return this.actorsHeader.length === 2 ?
                correct() :
                wrong(`Your page should contain 2 .section-header elements.`)
        }),
        //Test 10 - check font section-header
        this.page.execute(() => {
            let actorsHeaderStyles = window.getComputedStyle(this.actorsHeader[0]);
            let reviewsHeaderStyles = window.getComputedStyle(this.actorsHeader[1]);
            return actorsHeaderStyles.fontSize === '32px' && actorsHeaderStyles.fontWeight === '700' &&
                actorsHeaderStyles.fontFamily.includes('Montserrat') && reviewsHeaderStyles.fontSize === "32px" &&
                reviewsHeaderStyles.fontWeight === '700' && reviewsHeaderStyles.fontFamily.includes('Montserrat')?
                correct() :
                wrong(`Check font of .section-header elements.`)
        }),
        //Test 11 - check position section-header
        this.node.execute(async () => {
            let ahCoords = await this.page.evaluate(async () => {
                let actors = document.getElementsByClassName('section-header')[0];
                let reviews = document.getElementsByClassName('section-header')[1];
                return [actors.getBoundingClientRect().x, actors.getBoundingClientRect().y,
                    reviews.getBoundingClientRect().x, reviews.getBoundingClientRect().y];
            });
            return ahCoords[0] === 90 && nonStrictCompare(ahCoords[1], 786) &&
            ahCoords[2] === 90 && nonStrictCompare(ahCoords[3], 1270) ?
                correct() :
                wrong(`Check position of .section-header element, your positions of first header are: x=${ahCoords[0]} and y=${ahCoords[1]}, and positions of second:  
                x=${ahCoords[2]} and y=${ahCoords[3]}`);
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
        // Test 14 - check reviews-list article
        this.page.execute(() => {
            this.articleObj = document.querySelectorAll('#reviews-list article');
            this.gradeObj = document.querySelectorAll('#reviews-list article .grade');
            return this.articleObj.length >= 3 && this.gradeObj.length >= 3 ?
                correct() :
                wrong(`Your page must contain at least 3 reviews with 3 grades.`)
        }),
        // Test 15 - check reviews-list article border
        this.page.execute(() => {
            let styles = window.getComputedStyle(this.articleObj[0]);

            return styles.border === "1px solid rgb(0, 0, 0)" && styles.borderRadius === "10px" ?
                correct() :
                wrong(`Please, check borders of review article.`)
        }),
        // Test 16 - check position of first reviews-list article
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article');
                return [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y];
            });
            return coords[0] === 90 && nonStrictCompare(coords[1], 1348) ?
                correct() :
                wrong(`Please, check position of your first review, your positions now: x=${coords[0]} and ${coords[1]}.`)
        }),
        // Test 17 - check position of second reviews-list article
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelectorAll('#reviews-list article')[1];
                let obj0 = document.querySelectorAll('#reviews-list article')[0];
                return [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y, obj0.getBoundingClientRect().y, obj0.getBoundingClientRect().height];
            });
            return coords[0] === 90 && Math.round(coords[1] - coords[2] - coords[3]) === 40 ?
                correct() :
                wrong(`Please, check position of your second review. Now your project has the following values of second review element: 
                x-coordinate=${coords[0]} and the distance between the second and first elements of the reviews is ${coords[1] - coords[2] - coords[3]}.`)
        }),
        // Test 18 - check size of first reviews-list article
        this.node.execute(async () => {
            let width = await this.page.evaluate(async () => {
                let obj = document.querySelectorAll('#reviews-list article')[0];
                return obj.getBoundingClientRect().width
            });
            return nonStrictCompare(width, 936, 5) ?
                correct() :
                wrong(`Please check the width of the element with review, your width now - ${width}px.`)
        }),
        // Test 19 - check position of first reviews-list article span
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article .date');
                return obj ? [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y] : [-1, -1];
            });
            return nonStrictCompare(coords[0], 130, 5) && nonStrictCompare(coords[1], 1392) ?
                correct() :
                wrong(`Please, check position of your first .date element, your position: x=${coords[0]} and y=${coords[1]}.`)
        }),
        // Test 20 - check position of first reviews-list article h1
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article h1');
                return obj ? [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y] : [-1, -1];
            });
            return nonStrictCompare(coords[0], 130, 5) && nonStrictCompare(coords[1], 1435) ?
                correct() :
                wrong(`Please, check position of your first h1 element of article, your position - x=${coords[0]} and y=${coords[1]}.`)
        }),
        // Test 21 - check position of first reviews-list article p
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article p');
                return obj ? [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y] : [-1, -1];
            });
            return nonStrictCompare(coords[0], 130, 5) && nonStrictCompare(coords[1], 1480, 15) ?
                correct() :
                wrong(`Please, check position of your first p element of article, your position - x=${coords[0]} and y=${coords[1]}.`)
        }),
        // Test 22 - check fonts of all elements of article
        this.page.execute(() => {
            let date = window.getComputedStyle(document.querySelector('#reviews-list article .date'));
            let h1Obj = window.getComputedStyle(document.querySelector('#reviews-list article h1'));
            let pObj = window.getComputedStyle(document.querySelector('#reviews-list article p'));

            let dateOk = date.fontWeight === '300' && date.fontSize === '14px' && date.opacity === '0.6';
            let h1Ok = h1Obj.fontWeight === '600' && h1Obj.fontSize === '24px';
            let pOk = pObj.fontWeight === '400' && pObj.fontSize === '18px';

            return dateOk && h1Ok && pOk ?
                correct() :
                wrong(`Check fonts of all elements of review article.`)
        }),

        // Test 23 - check position of first reviews-list article grade
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article .grade');
                return obj ? [obj.getBoundingClientRect().x, obj.getBoundingClientRect().y] : [-1, -1];
            });
            return nonStrictCompare(coords[0], 915, 5) && nonStrictCompare(coords[1], 1348) ?
                correct() :
                wrong(`Please, check position of your first .grade element of article, your position - x=${coords[0]} and y=${coords[1]}.`)
        }),
        // Test 24 - check background and fonts of first reviews-list article grade
        this.page.execute(() => {
            let styles = window.getComputedStyle(this.gradeObj[0]);
            let spanStyle = window.getComputedStyle(document.querySelector('#reviews-list article .grade span'));
            return styles.backgroundImage && styles.fontSize === '24px' && styles.fontWeight === '500' &&
                spanStyle.fontSize === '14px' && spanStyle.fontWeight === '300' ?
                correct() :
                wrong(`Check fonts and background of grade element in article.`)
        }),
        // Test 25 - check size of first reviews-list article grade
        this.node.execute(async () => {
            let coords = await this.page.evaluate(async () => {
                let obj = document.querySelector('#reviews-list article .grade');
                return obj ? [obj.getBoundingClientRect().width, obj.getBoundingClientRect().height] : [-1, -1];
            });
            return coords[0] === 72 && coords[1] === 93 ?
                correct() :
                wrong(`Please, check size of article grade. Now your project has the following values of first reviews-list article grade: 
                width=${coords[0]} and height=${coords[1]}.`)
        }),

        //Test 27 - check click on reviews-button
        this.node.execute(async () => {
            await this.page.setViewport({width: 1440, height: 1200});
            const reviewsButton = await this.page.findAllBySelector('button');
            await reviewsButton[1].click();
            let scrollTop = await this.page.evaluate(async () => {
                return document.querySelectorAll('.section-header')[1].getBoundingClientRect().y;
            });
            return  Math.round(scrollTop) === 0 ?
                correct() :
                wrong(`Make sure you don't forget to add a scroll to the reviews section when you click on the "Reviews" button`);
        }),
    ]

}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
