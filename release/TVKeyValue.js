// more keys at http://developer.samsung.com/tv/develop/guides/user-interaction/remote-control/

var TV_Keys = ['ChannelUp',
        'ChannelDown',
        'MediaRewind',
        'MediaFastForward',
        'MediaStop',
        'MediaPlayPause',
        'MediaPlay',
        'MediaPause',
        'ColorF0Red',
        'ColorF1Green',
        'ColorF2Yellow',
        'ColorF3Blue',
        'Guide',
        'Info'];

function regKey(key) {
    try {
        console.log('2Registering key ' + key);
        tizen.tvinputdevice.registerKey(key);
    } catch (e) {
        console.log('2Registering key ' + key + ' error');
        console.log(e);
    }
}

StartKeys();

function StartKeys() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            for (var key in TV_Keys) regKey(TV_Keys[key]);
        });
    } else { // `DOMContentLoaded` already fired
        for (var key in TV_Keys) regKey(TV_Keys[key]);
    }
}
