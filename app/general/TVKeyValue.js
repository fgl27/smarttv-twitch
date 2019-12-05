// more keys at http://developer.samsung.com/tv/develop/guides/user-interaction/remote-control/
var KEY_PAUSE = 19;
var KEY_PLAY = 415;
var KEY_PLAYPAUSE = 10252;
var KEY_STOP = 413;
var KEY_MEDIAREWIND = 412;
var KEY_MEDIAFASTFORWARD = 417;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var KEY_PG_DOWN = 428; //KEY_CHANNELDOWN
var KEY_PG_UP = 427; //KEY_CHANNELUP
var KEY_REFRESH = 458; //KEY_CHANNELGUIDE
var KEY_INFO = 457;
var KEY_RETURN = 10009;
var KEY_RETURN_Q = 81; //key q

var KEY_KEYBOARD_BACKSPACE = 8; // http://developer.samsung.com/tv/develop/guides/user-interaction/keyboardime
var KEY_KEYBOARD_DONE = 65376;
var KEY_KEYBOARD_SPACE = 32;
var KEY_KEYBOARD_DELETE_ALL = 46;

var KEY_RED = 403;
var KEY_GREEN = 404;
var KEY_YELLOW = 405;
var KEY_BLUE = 406;
var KEY_KEYBOARD_CANCEL = 65385;

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

function TVKeyValue_fixKey() {
    KEY_RETURN = 49;
    KEY_PG_DOWN = 34;
    KEY_PG_UP = 33;
    KEY_REFRESH = 50; //key #2
    KEY_PAUSE = 127;
    KEY_PLAY = 126;
    KEY_PLAYPAUSE = 179;

    KEY_RED = 65; //key A
    KEY_GREEN = 66; //key B
    KEY_YELLOW = 67; //key C
    KEY_BLUE = 68; //key D

    KEY_STOP = 73; //key I
    KEY_MEDIAREWIND = 79; //key O
    KEY_MEDIAFASTFORWARD = 80; //key P
}

function TVKeyValue_regKey(key) {
    try {
        console.log('Registering key ' + key);
        tizen.tvinputdevice.registerKey(key);
    } catch (e) {
        console.log('Registering key ' + key + ' error');
        console.log(e);
    }
}
