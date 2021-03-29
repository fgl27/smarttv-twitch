window.dataLayer = window.dataLayer || [];
function gtag() {

    try {

        dataLayer.push(arguments);

    } catch (e) {

        console.log("gtag e " + e);

    }
}

function Firebase_Startfirebase() {

    Firebase_setTimeout(Firebase_firebaseInitializeApp, 10000);

}

var Firebase_IsLoaded = false;
function Firebase_firebaseInitializeApp() {

    var firebaseConfig = {
        apiKey: "AIzaSyDU1477wMbrpHnLJPgCMohvt2q_LH_tA3c",
        authDomain: "smarttv-twitch-web-samsung.firebaseapp.com",
        databaseURL: "https://smarttv-twitch-web-samsung.firebaseio.com",
        projectId: "smarttv-twitch-web-samsung",
        storageBucket: "smarttv-twitch-web-samsung.appspot.com",
        messagingSenderId: "302068341837",
        appId: "1:302068341837:web:604f8a975842c2e6879004",
        measurementId: "G-9T1TS1E2SC"
    };

    try {
        console.log("Firebase_Startfirebase start");

        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

        gtag('js', new Date());

        Firebase_IsLoaded = true;

    } catch (e) {

        console.log("Firebase_Startfirebase e " + e);

    }

}

function Firebase_setTimeout(fun, time) {
    window.setTimeout(fun, time ? time : 0);
}

function Firebase_Start() {

    //The url may not be part of release so check first
    var urls = [
        'https://unpkg.com/core-js-bundle@3.0.1/minified.js',
        'https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js',
        'https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics.js',
        'https://www.googletagmanager.com/gtag/js'
    ],
        i = 0,
        len = urls.length;

    //Is needed to gitve at least 10s for it file to load to prevent errors on the TV, on a browser it work on TV there is this issue
    for (i; i < len; i++) {

        Firebase_LoadUrlAsync(urls[i], i);

    }


    Firebase_setTimeout(Firebase_Startfirebase, len * 10000);

}

function Firebase_LoadUrlAsync(url, i) {
    Firebase_setTimeout(
        function() {

            Firebase_CheckScript(url, i);

        },
        i * 10000
    );
}

function Firebase_CheckScript(url, AddOnunhandledrejection) {

    if (!Firebase_ScriptLoaded(url)) {

        if (!AddOnunhandledrejection) {

            window.onunhandledrejection = function() {
                //function(e) {
                //console.log('onunhandledrejection e ' + e);
            };

        }

        var jsCode = document.createElement('script');
        jsCode.setAttribute('src', url);
        jsCode.setAttribute('defer', 'true');
        document.body.appendChild(jsCode);

    }

}

function Firebase_ScriptLoaded(url) {

    var scripts = document.getElementsByTagName('script'),
        i = 0,
        len = scripts.length;

    for (i; i < len; i++) {

        if (scripts[i].src === url) {

            return true;

        }

    }

    return false;
}

function Firebase_EventScreen(screen) {
    Firebase_EventShowScreen(
        'screen_view',
        screen
    );
}

function Firebase_EventAgame(game) {
    Firebase_EventShowScreen(
        'game_view',
        game
    );
}

function Firebase_EventShowScreen(type, name) {
    if (!Firebase_IsLoaded) return;

    try {

        gtag(
            'event',
            type,
            {
                'name': name,
                'lang': Languages_Selected
            }
        );

    } catch (e) {
        console.log("Firebase_EventShowScreen e " + e);
    }
}

function Firebase_EventPlay(type, name, game, lang, screen, mode) {

    if (!Firebase_IsLoaded) return;

    try {

        gtag(
            'event',
            type,
            {
                'name': name,
                'lang': lang ? lang.toUpperCase() : 'UNKNOWN',
                'game': game ? game : 'UNKNOWN',
                'screen': screen ? screen : 'UNKNOWN',
                'mode': mode ? mode : 'NORMAL'
            }
        );

    } catch (e) {
        console.log("Firebase_EventPlay e " + e);
    }
}