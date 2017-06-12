var socialButtons = {
    socialSites: [
        {
            name: "Buffer",
            url: "https://bufferapp.com/add?url={url}&text={title} Share Buttons",
            image: "#buffer"
        },
        {
            name: "email",
            url: "mailto:?Subject={title}&Body={body} - {url}",
            image: "#email" // todo icon for email
        },
        {
            name: "Facebook",
            url: "https://facebook.com/sharer.php?u={url}&t={title}",
            image: "#facebook"
        },
        {
            name: "Google Plus",
            url: "https://plus.google.com/share?url={url}",
            image: "#googleplus"
        },
        {
            name: "LinkedIn",
            url: "http://www.linkedin.com/shareArticle?mini=true&url={url}",
            image: "#linkedin"
        },
        {
            name: "Print",
            url: "javascript:window.print();",
            image: "#print" // todo icon for print.
        },
        {
            name: "Pinterest",
            url: "javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());",
            image: "#pinterest"
        },
        {
            name: "Tumblr",
            url: "http://www.tumblr.com/share/link?url={url}&title={title}",
            image: "#tumblr"
        },
        {
            name: "Twitter",
            url: "https://twitter.com/share?url={url}&text={body}",
            image: "#twitter"
        }
    ],

    swapObjectNames: function (object, string) {
        for (var key in object) {
            if (!object.hasOwnProperty(key)) break;
            string = string.replace("{" + key + "}", object[key]);
        }

        return string;
    },

    generateHtml: function (site, html) {
        return socialButtons.swapObjectNames(site, html);
    },

    generate: function (site, social) {
        /// <summary>
        /// Depending on the website, body and title may
        /// not be used but it may be required by others.
        /// </summary >

        social.title = encodeURIComponent(social.title);
        social.body = encodeURIComponent(social.body);
        site.url = socialButtons.swapObjectNames(social, site.url);
        site.image = social.image + site.image;

        return site;
    },

    setup: function (element, exclude, itemHtml, socialImageUrl, url, title, body) { // todo object config instead.
        ///<summary>Setup the social share buttons.</summary>
        ///<param name="element">Element that will contain the social share buttons.</param>
        ///<param name="exlude">Array of social sites to exclude, by name.</param>
        ///<param name="itemHtml">Change the HTML that is returned. Place {url}, {image} and {name} were required.</param>
        ///<param name="url">URL of page you want to share.</param>
        ///<param name="title">Title of page you want to share.</param>
        ///<param name="body">Short description of page you want to share.</param>

        var sites = [],
            formattedExcluded = exclude !== undefined && exclude !== null ? exclude.map(function (n) { return n.toLowerCase() }) : [],
            socialObject = {
                url: url ? url.toLowerCase() : window.location.href,
                title: title || document.title,
                body: body || "",
                image: socialImageUrl || "images/social.svg"
            },
            html = itemHtml || "<a href=\"{url}\" style=\"display:inline-block;width:48px;height:48px\" target=\"_blank\"><img src=\"{image}\" alt=\"Share On {name}\" style=\"width:48px;height:48px\" /></a>",
            finalHtml = "";

        socialButtons.socialSites.forEach(function (site) { formattedExcluded.indexOf(site.name.toLowerCase()) < 0 && sites.push(site) });

        for (var i = 0; i < sites.length; i++) {
            finalHtml += socialButtons.generateHtml(socialButtons.generate(sites[i], socialObject), html);
        }

        if (element !== undefined && element !== null) {
            element.innerHTML = finalHtml;
        }

        return finalHtml;
    }
};
