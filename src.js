/**
 * @namespace displayRandomAds
 * @description displayRandomAds is an object that give you ability to get random element of adds
 */


const displayRandomAds = {

    isMatch(str) {
        return /<\/([a-z]+)>$/ig.exec(str);
    },

    getContent(str) {
        const domParser = new DOMParser();
        return domParser.parseFromString(str, 'text/html');
    },

    init(ads) {

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


            if (this.isMatch(singleAd.ads) === null) {
                return new Error('Your input is not a Javascript or an HTML code!');
            }

            const tagName = this.isMatch(singleAd.ads)[1];
            const HTMLElement = this.getContent(singleAd.ads).getElementsByTagName(tagName)[0];
            console.log(HTMLElement);

            if (tagName == 'script') {

                // Create a script element
                var script = document.createElement('script');

                // Assigning an id to script element
                script.id = "script";

                if (HTMLElement.getAttributeNames().length !== 0) {

                    HTMLElement.getAttributeNames().forEach(attribute => script.setAttribute(attribute, HTMLElement.getAttribute(attribute)));

                }
                // Add script content
                script.textContent = HTMLElement.textContent;
            }


            // Add script tag on HTML page
            document.body.appendChild(script ?? HTMLElement);

            // Turn 'display' property to true
            singleAd.display = true;
        }
    }

};


displayRandomAds.init([
    {
        ads: `<a href="https://smrturl.co/o/165013/53188596?s1=" target="_blank"><img src="https://img.akwam.co/uploads/hrBrn.gif" alt="click"></a>`,
        display: false
    },
    {
        ads: `<script data-cfasync="false" type="text/javascript" src="//creamssicsite.com/tSMc54j7yD1M6/19111"></script>`,
        display: false
    },
    {
        ads: `<script></script>`,
        display: false
    }
]);

