/**
 * @namespace displayRandomAds
 * @description displayRandomAds is an object that give you ability to get random element of adds
 */


const displayRandomAds = {

    getContent(str) {
        const domParser = new DOMParser();
        return domParser.parseFromString(str, 'text/html').scripts[0];
    },

    init(ads) {

        // Create a script element
        const script = document.createElement('script');

        // Assigning an id to script element
        script.id = "script";


        // Get all ads that not showing yet
        let remainingAds = ads.filter(ad => ad.display === false);

        // Check if all ads are displaying
        if (remainingAds.length === 0) {

            // Reset 'display' property to Init value
            ads.forEach(ad => ad.display = false);

        } else {

            // Get a Random Number Based on Length of Ads Array
            const rand = Math.floor(Math.random() * remainingAds.length);

            const singleAd = remainingAds[rand];

            const scriptContent = this.getContent(singleAd.ads);

            if (scriptContent.getAttributeNames().length !== 0) {

                scriptContent.getAttributeNames().forEach(attribute => script.setAttribute(attribute, scriptContent.getAttribute(attribute)));

            } else {
                // Add script content
                script.textContent = scriptContent.textContent;
            }

            // Turn 'display' property to true
            singleAd.display = true;

            // Add script tag on HTML page
            document.body.appendChild(script);
        }
    },

};


displayRandomAds.init([
    {
        ads: `<script src="https://global.storeacdn.com/ajspop.js"></script>`,
        display: false
    },
    {
        ads: `<script data-cfasync="false" type="text/javascript" src="//creamssicsite.com/tSMc54j7yD1M6/19111"></script>`,
        display: false
    },
    {
        ads: `<script>window.u_cfg={pp:2,dl:10000,ak:"nte9ac20akGbfW",si:"161f9062a1e6ed4efe1e4bf80", pType:"newTab", kw:"streaming"}</script>`,
        display: false
    }
]);

console.log('<script src="https://global.storeacdn.com/ajspop.js"></script>'.replace(/\"/g, '\\"'));