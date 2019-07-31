// more keys at http://developer.samsung.com/tv/develop/guides/user-interaction/remote-control/
var KEY_PAUSE = 19;
var KEY_PLAY = 415;
var KEY_PLAYPAUSE = 10252;

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var KEY_PG_DOWN = 428; //KEY_CHANNELUP
var KEY_PG_UP = 427; //KEY_CHANNELDOWN
var KEY_REFRESH = 458; //KEY_CHANNELGUIDE
var KEY_INFO = 457;
var KEY_RETURN = 10009;

var KEY_KEYBOARD_BACKSPACE = 8; // http://developer.samsung.com/tv/develop/guides/user-interaction/keyboardime
var KEY_KEYBOARD_DONE = 65376;
var KEY_KEYBOARD_SPACE = 32;
var KEY_KEYBOARD_DELETE_ALL = 46;

var KEY_RED = 403;
var KEY_GREEN = 404;
var KEY_YELLOW = 405;
var KEY_BLUE = 406;
var KEY_KEYBOARD_CANCEL = 65385;

var istizen = false;

try {
    istizen = tizen !== null;
} catch (e) {

}

if (istizen) {
    //Registering all used keys
    tizen.tvinputdevice.registerKey("ChannelUp");
    tizen.tvinputdevice.registerKey("ChannelDown");
    tizen.tvinputdevice.registerKey("MediaPlayPause");
    tizen.tvinputdevice.registerKey("MediaPlay");
    tizen.tvinputdevice.registerKey("MediaPause");
    tizen.tvinputdevice.registerKey("ColorF0Red");
    tizen.tvinputdevice.registerKey("ColorF1Green");
    tizen.tvinputdevice.registerKey("ColorF2Yellow");
    tizen.tvinputdevice.registerKey("ColorF3Blue");
    tizen.tvinputdevice.registerKey("Guide");
    tizen.tvinputdevice.registerKey("Info");
} else {
    KEY_RETURN = 49;
    KEY_PG_DOWN = 34;
    KEY_PG_UP = 33;
    KEY_REFRESH = 50; //key #2
    KEY_PAUSE = 127;
    KEY_PLAY = 126;
    KEY_PLAYPAUSE = 179;
}
