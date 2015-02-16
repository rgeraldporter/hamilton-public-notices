#!/usr/bin/env node

/*
*
*   Hammer Scraper
*
*   Author:                     Rob Porter <rob@weeverapps.com>
*   Usage:                      scrapes the city of Hamilton's public notices

*
*/

var CONFIG = {
    scrapeUrl:      'http://www.hamilton.ca/CityDepartments/PlanningEcDev/Divisions/Planning/Development/PublicMeetingNotices.htm',
    domBase:        '#RadEditorPlaceHolderControl0 ul li a',
    twitter:        {
        consumerKey:        '',
        consumerSecret:     '',
        accessToken:        '',
        accessTokenSecret:  '',
        callBackUrl:        ''
    }
};

/**
 * Global libraries. Call using lib.[name of method]
 */

var lib     = {
    sys:                require( 'sys' ),
    util:               require( 'util' ),
    exec:               require( 'child_process' ).exec,
    fs:                 require( 'fs' ),
    jsdom:              require( 'jsdom' ),
    querySelectorAll:   require('query-selector'),
    Twitter:            require( 'twitter-js-client' )
};

// Classes
var Promise     = require( 'es6-promise' ).Promise;

lib.jsdom.env(

    CONFIG.scrapeUrl,

    ['http://code.jquery.com/jquery.js'],

    function( errors, window ) {

        var pdfs        = window.jQuery( CONFIG.domBase ),
            result      = [],
            twitter     = lib.Twitter( CONFIG.twitter );

        [].forEach.call( pdfs, function(pdf) {

            result.push({
                pdf:        'http://hamilton.ca' + pdf.getAttribute('href'),
                text:       pdf.innerHTML
            });
        });

        console.log(result);
    }
);