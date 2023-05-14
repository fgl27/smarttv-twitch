//Variable initialization
var Main_isReleased = false;
var Main_isDebug = false;

var Main_cursorYAddFocus = -1;

var Main_Search = 0;
var Main_Live = 1;
var Main_Users = 2;
var Main_Featured = 3;
var Main_games = 4;
var Main_Vod = 5;
var Main_Clip = 6;
var Main_UserLive = 7;
var Main_usergames = 8;
var Main_UserVod = 9;
var Main_UserChannels = 10;
var Main_SearchGames = 11;
var Main_SearchLive = 12;
var Main_SearchChannels = 13;
var Main_ChannelContent = 14;
var Main_ChannelVod = 15;
var Main_ChannelClip = 16;
var Main_addUser = 17;
var Main_aGame = 18;
var Main_AGameVod = 19;
var Main_AGameClip = 20;

var Main_GoBefore = '';
var Main_values = {
    Main_Go: 1,
    Main_Before: 1,
    Main_BeforeSearch: 1,
    Main_BeforeChannel: 1,
    Main_BeforeAgame: Main_games,
    Main_BeforeChannelisSet: false,
    Main_BeforeAgameisSet: false,
    Main_selectedChannel: '',
    Main_selectedChannelDisplayname: '',
    Main_selectedChannelLogo: '',
    Main_selectedChannel_id: '',
    Main_gameSelected: '',
    Main_gameSelected_id: '',
    Main_OldgameSelected: null,
    Play_isHost: false,
    Play_DisplaynameHost: '',
    Play_selectedChannelDisplayname: '',
    Play_selectedChannel: '',
    Play_gameSelected: '',
    Play_gameSelected_id: null,
    Users_AddcodePosition: 0,
    Play_WasPlaying: 0,
    ChannelVod_vodId: '',
    vodOffset: 0,
    Search_data: '',
    gameSelectedOld: null,
    Games_return: false,
    Search_isSearching: false,
    Play_ChatForceDisable: false,
    Never_run_new: true,
    Chat_font_size_new: 75,
    ChatBackground: 10,
    IsRerun: false,
    Main_selectedChannelPartner: false,
    Sidepannel_Pos: 2,
    Sidepannel_IsUser: false,
    My_channel: false,
    DeviceBitrateCheck: false,
    warning_new_api2: true,
    AddCode_main_token: null
};

var Main_Headers = [];
var Main_Headers_Backup = [];

var Main_LastClickFinish = true;
var Main_addFocusFinish = true;
var Main_newUsercode = 0;
var Main_ExitCursor = 0;
var Main_ExitDialogID = null;
var Main_IsDayFirst = false;
var Main_SearchInput;
var Main_AddUserInput;
var Main_AddCodeInput;
var Main_ChatLiveInput;
var Main_updateclockId;
var Main_ContentLang = '';
var Main_Periods = [];
var Main_addFocusVideoOffset = 0;
var Main_FirstRun = true;
var Main_FirstLoad = false;
var Main_RunningTime = 0;

//The values of thumbnail and related for it screen type
var Main_ReloadLimitOffsetGames = 1.35;
var Main_ReloadLimitOffsetVideos = 1.5;

var Main_ItemsLimitVideo = 45;
var Main_ColoumnsCountVideo = 3;
var Main_ItemsReloadLimitVideo = Math.floor(Main_ItemsLimitVideo / Main_ColoumnsCountVideo / Main_ReloadLimitOffsetVideos);

var Main_ItemsLimitGame = 45;
var Main_ColoumnsCountGame = 5;
var Main_ItemsReloadLimitGame = Math.floor(Main_ItemsLimitGame / Main_ColoumnsCountGame / Main_ReloadLimitOffsetGames);

var Main_ItemsLimitChannel = 48;
var Main_ColoumnsCountChannel = 6;
var Main_ItemsReloadLimitChannel = Math.floor(Main_ItemsLimitChannel / Main_ColoumnsCountChannel / Main_ReloadLimitOffsetVideos);

var Main_AcceptHeader = 'Accept';
var Main_TwitchV5Json = 'application/vnd.twitchtv.v5+json';
var Main_clientIdHeader = 'Client-ID';
var Main_kraken_api = 'https://api.twitch.tv/kraken/';
var Main_helix_api = 'https://api.twitch.tv/helix/';
var Main_Authorization = 'Authorization';
var Main_OAuth = 'OAuth ';
var Main_TwitchV5Flag = '&api_version=5';
var Main_TwitchV5Flag_I = '?api_version=5';

var Main_classThumb = 'stream_thumbnail_focused';
var Main_DataAttribute = 'data_attribute';

var Main_version = 401;
var Main_stringVersion_Min = '4.0.1';
var Main_minversion = 'May 14 2023';
var Main_versionTag = Main_stringVersion_Min + '-' + Main_minversion;
var Main_IsNotBrowserVersion = '';

var Main_Periods_Helix = [0, 1, 7, 30, 0];
var Main_ClockOffset = 0;
var Main_IsNotBrowser = 0;
var Main_randomimg = '?' + Math.random();
var Main_updateUserFeedId;
var Main_vp9supported = false; //TODO check tizen support
var Main_ResetDownId;
var Main_ResetAppId;
var Main_ResetDownUPHold = false;

var Main_Bearer = 'Bearer ';

var Main_Bearer_User_Headers = [
    [Main_clientIdHeader, AddCode_clientId],
    ['Authorization', null]
];

var Main_Bearer_Headers = [
    [Main_clientIdHeader, AddCode_clientId],
    ['Authorization', Main_Bearer + AddCode_main_token]
];
//Variable initialization end

// this function will be called only once the first time the app startup
if (!Main_isReleased) Main_Start();

function Main_Start() {
    Main_Reset();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
        });
    } else {
        // `DOMContentLoaded` already fired
        Main_loadTranslations(window.navigator.userLanguage || window.navigator.language);
    }
}

function Main_Reset() {
    document.body.addEventListener('keydown', Main_ResetDown, false);
    document.body.addEventListener('keyup', Main_handleKeyUp, false);
}

function Main_ResetUP(e) {
    if (e.keyCode === KEY_PG_UP || e.keyCode === KEY_PG_DOWN) {
        window.clearTimeout(Main_ResetDownId);
        window.clearTimeout(Main_ResetAppId);
        document.body.removeEventListener('keyup', Main_ResetUP);
        document.body.addEventListener('keydown', Main_ResetDown, false);

        window.setTimeout(function () {
            Main_AddClass('rest_warning', 'hide');
        }, 1500);
    }
}

function Main_ResetDown(e) {
    if (e.keyCode === KEY_PG_UP || e.keyCode === KEY_PG_DOWN) {
        document.body.removeEventListener('keydown', Main_ResetDown, false);
        document.body.addEventListener('keyup', Main_ResetUP, false);
        Main_ResetDownId = window.setTimeout(Main_ResetWarning, 10 * 1000);
    }
}

function Main_ResetWarning() {
    window.clearTimeout(Main_ResetDownId);
    window.clearTimeout(Main_ResetAppId);

    Main_innerHTML('rest_warning', STR_HOLD_RESET);
    Main_RemoveClass('rest_warning', 'hide');

    Main_ResetDownUPHold = true;
    Main_ResetAppId = window.setTimeout(Main_ResetApp, 10 * 1000);
}

var preventSave = false;
function Main_ResetApp() {
    preventSave = true;
    localStorage.removeItem('Main_values');
    for (var key in Settings_value) {
        localStorage.removeItem(key);
    }

    Main_innerHTML('rest_warning', STR_RESET_DONE);

    window.setTimeout(function () {
        window.location.reload(true);
    }, 1500);
}

function Main_loadTranslations(language) {
    Main_Checktylesheet();

    Main_ready(function () {
        // var STR_BODY is defined by the release_maker script
        if (Main_isReleased) document.body.innerHTML = STR_BODY; // jshint ignore:line

        Main_ready(function () {
            try {
                Main_IsNotBrowser = tizen !== null;
                console.log('Main_IsNotBrowser tizen = ' + Main_IsNotBrowser);
                Main_IsNotBrowserVersion = '1.0.0';
                //if (!Main_isReleased)
                Main_isDebug = true;
            } catch (e) {
                Main_IsNotBrowserVersion = '1.0.0';
                Main_IsNotBrowser = 0;
                Main_body.style.backgroundColor = 'rgba(155, 155, 155, 1)'; //default rgba(0, 0, 0, 1)
                Main_isDebug = true;
                console.log('Main_isReleased: ' + Main_isReleased);
                console.log('Main_isDebug: ' + Main_isDebug);
                console.log('Main_isBrowser: ' + !Main_IsNotBrowser);
                TVKeyValue_fixKey();
            }
            Main_showLoadDialog();

            Settings_SetDefautls();
            calculateFontSize();
            en_USLang();
            Languages_SetDefautls();

            // Language is set as (LANGUAGE)_(REGION) in (ISO 639-1)_(ISO 3166-1 alpha-2) eg.; pt_BR Brazil, en_US USA
            // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
            // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2

            //var lang = language,
            //    Savedlang = Main_getItemInt('user_language', 0);

            //if (Savedlang) lang = Settings_Obj_set_values("general_lang");
            //else Settings_CheckLang(lang);

            //if (lang.indexOf('pt_') !== -1) pt_BRLang();
            //else if (lang.indexOf('it_') !== -1) it_ITLang();

            console.log('language is ' + language);
            DefaultLang();

            Main_SearchInput = document.getElementById('search_input');
            Main_AddUserInput = document.getElementById('user_input');
            Main_AddCodeInput = document.getElementById('oauth_input');
            Main_ChatLiveInput = Main_getElementById('chat_send_input');

            AddUser_RestoreUsers();
            Main_RestoreValues();
            if (Main_values.AddCode_main_token) {
                AddCode_main_token = Main_values.AddCode_main_token;
                Main_Bearer_Headers = [
                    [Main_clientIdHeader, AddCode_clientId],
                    ['Authorization', Main_Bearer + AddCode_main_token]
                ];
            }

            if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
                Main_initWindowsCheck();
            } else {
                AddCode_AppTokenCheck(0, Main_initWindowsCheck, Main_initWindowsCheckFail);
            }
        });
    });
}

function Main_initWindowsCheckFail() {
    AddCode_AppToken(0, Main_initWindowsCheck, Main_initWindowsCheck);
}

function Main_initWindowsCheck() {
    //Allow page to proper load/resize and users 0 be restored before Main_initWindows
    window.setTimeout(Main_initWindows, 500);
}

function Main_initWindows() {
    Main_SetStringsMain(true);

    Main_GoBefore = Main_values.Main_Go;

    Main_ready(function () {
        if (Main_IsNotBrowser) {
            console.log('TVKeyValue_regKey started');
            for (var key in TV_Keys) TVKeyValue_regKey(TV_Keys[key]);
        }

        Play_PreStart();
        Chat_Preinit();

        if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            window.clearInterval(Main_updateUserFeedId);
            Main_updateUserFeedId = window.setInterval(Main_updateUserFeed, 600000);
        }
        document.body.addEventListener('keyup', Main_handleKeyUp, false);
        Screens_InitScreens();

        document.getElementById('side_panel').style.marginLeft = '';
        document.getElementById('user_feed_notify').style.marginTop = '';

        Main_checkVersion();

        Main_SetStringsSecondary();

        Play_MakeControls();
        Play_SetControls();
        if (Main_IsNotBrowser) Play_SetAvPlayGlobal();

        PlayVod_RestoreVodIds();

        window.clearInterval(Main_updateclockId);
        Main_updateclockId = window.setInterval(Main_updateclock, 60000);

        inUseObj = Live;
        Main_ready(function () {
            Screens_init();
            Sidepannel_UpdateThumbDoc = document.getElementById('feed_thumb_img');
        });
    });
}

function Main_SetStringsMain(isStarting) {
    Main_updateclock();

    //set top bar labels
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);
    Main_innerHTML(
        'label_update',
        '<div style="vertical-align: middle; display: inline-block;"><i class="icon-globe" style="color: #FF0000;"></i></div><div style="vertical-align: middle; display: inline-block; color: #FF0000">' +
            STR_SPACE +
            STR_UPDATE_AVAILABLE +
            '</div>'
    );

    Main_IconLoad('label_side_panel', 'icon-arrow-left', STR_GOBACK);
    UserLiveFeed_SetFeedPicText();

    Sidepannel_SetDefaultLables();

    Main_textContent('dialog_end_next_text', STR_PLAY_NEXT);
    Main_textContent('dialog_end_replay_text', STR_REPLAY);
    Main_textContent('dialog_end_vod_text', STR_OPEN_BROADCAST);
    Main_textContent('dialog_end_channel_text', STR_CHANNEL_CONT);
    Main_textContent('dialog_end_game_text', STR_GAME_CONT);
    Main_innerHTML('dialog_about_text', STR_ABOUT_INFO_HEADER + '<div id="about_runningtime"></div>' + STR_ABOUT_INFO_0);

    Main_Periods = [STR_CLIP_DAY, STR_CLIP_WEEK, STR_CLIP_MONTH, STR_CLIP_ALL];

    if (isStarting) Settings_SetSettings();
    else {
        Settings_SetStrings();
        Main_checkVersion();
    }
}

function Main_SetStringsSecondary() {
    Main_textContent('play_dialog_exit_text', STR_EXIT_AGAIN);

    Main_textContent('side_panel_feed_settings', STR_SIDE_PANEL_SETTINGS);
    Main_textContent('side_panel_feed_refresh', STR_REFRESH);
    Main_textContent('user_feed_notify_main', STR_NOW_LIVE);

    Main_textContent('chanel_button', STR_CHANNELS);
    Main_textContent('game_button', STR_GAMES);
    Main_textContent('live_button', STR_LIVE);
    Main_textContent('exit_app_cancel', STR_CANCEL);
    Main_textContent('exit_app_close', STR_CLOSE);
    Main_textContent('remove_cancel', STR_CANCEL);
    Main_textContent('remove_yes', STR_YES);
    Main_textContent('exit_app_minimize', STR_MINIMIZE);
    Main_textContent('main_dialog_exit_text', STR_EXIT_MESSAGE);

    Main_innerHTML('dialog_controls_text', STR_CONTROLS_MAIN_0);
    Main_textContent('side_panel_warn_text', STR_NO + STR_LIVE_CHANNELS);
    Main_textContent('side_panel_movel_top_text', STR_LIVE_FEED);

    Main_textContent('dialog_period_text', STR_SWITCH_CLIP);
    Main_innerHTML('dialog_period_1', Main_Periods[0]);
    Main_innerHTML('dialog_period_2', Main_Periods[1]);
    Main_innerHTML('dialog_period_3', Main_Periods[2]);
    Main_innerHTML('dialog_period_4', Main_Periods[3]);

    Main_innerHTML('main_dialog_user_first', STR_USER_MAKE_ONE);
    Main_innerHTML('main_dialog_user_remove', STR_USER_REMOVE);

    Main_innerHTML('dialog_OffSet_text', STR_SWITCH_POS + STR_BR);
    Main_textContent('dialog_OffSet_text_summary', STR_SWITCH_POS_SUMMARY);

    Main_textContent('dialog_vod_text', STR_VOD_HISTORY);
    Main_innerHTML('dialog_vod_start_text', STR_FROM_START);

    Main_innerHTML('channel_content_titley_0', '<i class="icon-movie-play stream_channel_follow_icon"></i>' + STR_SPACE + STR_SPACE + STR_VIDEOS);
    Main_innerHTML('channel_content_titley_1', '<i class="icon-movie stream_channel_follow_icon"></i>' + STR_SPACE + STR_SPACE + STR_CLIPS);
    Main_innerHTML(
        'channel_content_titley_2',
        '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + STR_FOLLOW
    );

    Main_textContent('chat_send_button0', STR_OPTIONS);
    Main_textContent('chat_send_button1', STR_CHAT_DELL_ALL);
    Main_textContent('chat_send_button2', STR_CHAT_UNICODE_EMOJI);
    Main_textContent('chat_send_button3', STR_CHAT_BTTV_GLOBAL);
    Main_textContent('chat_send_button4', STR_CHAT_FFZ_GLOBAL);
    Main_textContent('chat_send_button5', STR_CHAT_SEVENTV_GLOBAL);
    Main_textContent('chat_send_button6', STR_CHAT_SEND);
    Main_textContent('chat_send_button7', STR_CHAT_AT_STREAM);
    Main_textContent('chat_send_button8', STR_CHAT_TW_EMOTES);
    Main_textContent('chat_send_button9', STR_CHAT_BTTV_STREAM);
    Main_textContent('chat_send_button10', STR_CHAT_FFZ_STREAM);
    Main_textContent('chat_send_button11', STR_CHAT_SEVENTV_STREAM);
    Main_textContent('chat_result', STR_CHAT_RESULT);
    ChatLiveControls_OptionsUpdate_defautls();
}

function Main_IconLoad(lable, icon, string) {
    Main_innerHTML(
        lable,
        '<div style="vertical-align: middle; display: inline-block;"><i class="' +
            icon +
            '" style="color: #FFFFFF;"></i></div><div style="vertical-align: middle; display: inline-block;">' +
            STR_SPACE +
            string +
            '</div>'
    );
}

function Main_HideElement(element) {
    document.getElementById(element).classList.add('hide');
}

function Main_ShowElement(element) {
    document.getElementById(element).classList.remove('hide');
}

function Main_isElementShowing(element) {
    return document.getElementById(element).className.indexOf('hide') === -1;
}

function Main_AddClass(element, mclass) {
    document.getElementById(element).classList.add(mclass);
}

function Main_RemoveClass(element, mclass) {
    document.getElementById(element).classList.remove(mclass);
}

function Main_innerHTML(div, value) {
    document.getElementById(div).innerHTML = value;
}

function Main_textContent(div, value) {
    Main_textContentWithEle(document.getElementById(div), value);
}

function Main_textContentWithEle(elem, value) {
    if (elem) elem.textContent = value;
}

function Main_replaceClassEmoji(div) {
    var emojiel = document.getElementById(div).getElementsByClassName('emoji');
    if (emojiel) {
        var i = 0;
        for (i; i < emojiel.length; i++) emojiel[i].classList.add('emoticon');

        emojiel = document.getElementById(div).getElementsByClassName('emoticon');
        for (i = 0; i < emojiel.length; i++) emojiel[i].classList.remove('emoji');
    }
}

function Main_showLoadDialog() {
    Main_YRst(-1);
    Main_ShowElement('dialog_loading');
}

function Main_HideLoadDialog() {
    Main_HideElement('dialog_loading');
}

function Main_clearExitDialog() {
    window.clearTimeout(Main_ExitDialogID);
}

function Main_setExitDialog() {
    Main_ExitDialogID = window.setTimeout(Main_HideExitDialog, 6000);
}

function Main_showExitDialog() {
    Main_setExitDialog();
    Main_ShowElement('main_dialog_exit');
    document.body.addEventListener('keydown', Main_ExitDialog, false);
}

function Main_HideExitDialog() {
    document.body.removeEventListener('keydown', Main_ExitDialog, false);
    Main_SwitchScreenAction();
    Main_clearExitDialog();
    Main_HideElement('main_dialog_exit');
    Main_ExitCursor = 0;
    Main_ExitCursorSet();
}

function Main_ExitCursorSet() {
    Main_RemoveClass('exit_app_cancel', 'button_dialog_focused');
    Main_RemoveClass('exit_app_minimize', 'button_dialog_focused');
    Main_RemoveClass('exit_app_close', 'button_dialog_focused');
    if (!Main_ExitCursor) Main_AddClass('exit_app_cancel', 'button_dialog_focused');
    else if (Main_ExitCursor === 1) Main_AddClass('exit_app_minimize', 'button_dialog_focused');
    else Main_AddClass('exit_app_close', 'button_dialog_focused');
}

function Main_CounterDialogRst() {
    Main_empty('dialog_counter_text');
}

function Main_CounterDialog(x, y, coloumns, total) {
    if (total > 0) Main_textContent('dialog_counter_text', y * coloumns + (x + 1) + '/' + total);
    else Main_CounterDialogRst();
}

function Main_showWarningDialog(text) {
    Main_innerHTML('dialog_warning_text', text);
    Main_ShowElement('dialog_warning');
}

function Main_HideWarningDialog() {
    Main_HideElement('dialog_warning');
}

function Main_AboutDialogUpdateTime() {
    Main_innerHTML('about_runningtime', STR_RUNNINGTIME + STR_SPACE + Play_timeDay(Date.now() - Main_RunningTime));
}

function Main_showAboutDialog() {
    Main_HideControlsDialog();
    Main_AboutDialogUpdateTime();
    Main_ShowElement('dialog_about');
}

function Main_HideAboutDialog() {
    Main_HideElement('dialog_about');
}

function Main_isAboutDialogShown() {
    return Main_isElementShowing('dialog_about');
}

function Main_showSettings() {
    Main_HideControlsDialog();
    Main_HideWarningDialog();
    Main_ExitCurrent(Main_values.Main_Go);
    Main_CounterDialogRst();
    Settings_init();
}

function Main_showControlsDialog() {
    Main_HideAboutDialog();
    Main_ShowElement('dialog_controls');
}

function Main_HideControlsDialog() {
    Main_HideElement('dialog_controls');
}

function Main_isControlsDialogShown() {
    return Main_isElementShowing('dialog_controls');
}

function Main_addCommas(value) {
    return (value + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Main_videoqualitylang(video_height, average_fps, language) {
    video_height = video_height + ''; //stringfy doesnot work 8|
    if (!video_height.indexOf('x')) video_height = video_height.slice(-3);

    if (average_fps > 58) average_fps = 60;
    else if (average_fps < 32) average_fps = 30;
    else average_fps = Math.ceil(average_fps);

    return video_height + 'p' + average_fps + (language !== '' ? ' [' + language.toUpperCase() + ']' : '');
}

function Main_lang(language) {
    return language !== '' ? ' [' + language.toUpperCase() + ']' : '';
}

function Main_is_rerun(content) {
    return (content + '').indexOf('live') === -1;
}

function Main_ThumbNull(y, x, thumbnail) {
    return document.getElementById(thumbnail + y + '_' + x) !== null;
}

function Main_ReStartScreens() {
    Main_updateclock();
    Main_SwitchScreen();
    document.body.addEventListener('keyup', Main_handleKeyUp, false);
}

function Main_SwitchScreen(removekey) {
    Main_ready(function () {
        Main_SwitchScreenAction(removekey);
    });
}

function Main_RemoveKeys() {
    if (Main_values.Main_Go === Main_ChannelContent) document.body.removeEventListener('keydown', ChannelContent_handleKeyDown);
    else if (Main_values.Main_Go === Main_Users) document.body.removeEventListener('keydown', Users_handleKeyDown);
    else {
        if (Main_values.Main_Go === Main_Live) inUseObj = Live;
        else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
        else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
        else if (Main_values.Main_Go === Main_games) inUseObj = Game;
        else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
        else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
        else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
        else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
        else if (Main_values.Main_Go === Main_usergames) inUseObj = UserGames;
        else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
        else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
        else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
        else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
        else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
        else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
        else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
        else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;

        document.body.removeEventListener('keydown', Screens_handleKeyDown);
    }
}

var Main_Switchobj = {
    // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
    //    [Main_Users]: Users_init
};

Main_Switchobj[Main_Users] = Users_init;
Main_Switchobj[Main_ChannelContent] = ChannelContent_init;

Main_Switchobj[Main_SearchChannels] = function () {
    inUseObj = SearchChannels;
    Screens_init();
};

Main_Switchobj[Main_SearchLive] = function () {
    inUseObj = SearchLive;
    Screens_init();
};

Main_Switchobj[Main_SearchGames] = function () {
    inUseObj = SearchGames;
    Screens_init();
};

Main_Switchobj[Main_UserChannels] = function () {
    inUseObj = UserChannels;
    Screens_init();
};

Main_Switchobj[Main_UserLive] = function () {
    inUseObj = UserLive;
    Screens_init();
};

Main_Switchobj[Main_usergames] = function () {
    inUseObj = UserGames;
    Screens_init();
};

Main_Switchobj[Main_ChannelVod] = function () {
    inUseObj = ChannelVod;
    Screens_init();
};
Main_Switchobj[Main_UserVod] = function () {
    inUseObj = UserVod;
    Screens_init();
};
Main_Switchobj[Main_Live] = function () {
    inUseObj = Live;
    Screens_init();
};
Main_Switchobj[Main_Featured] = function () {
    inUseObj = Featured;
    Screens_init();
};
Main_Switchobj[Main_AGameClip] = function () {
    inUseObj = AGameClip;
    Screens_init();
};
Main_Switchobj[Main_AGameVod] = function () {
    inUseObj = AGameVod;
    Screens_init();
};
Main_Switchobj[Main_Clip] = function () {
    inUseObj = Clip;
    Screens_init();
};
Main_Switchobj[Main_Vod] = function () {
    inUseObj = Vod;
    Screens_init();
};
Main_Switchobj[Main_ChannelClip] = function () {
    inUseObj = ChannelClip;
    Screens_init();
};
Main_Switchobj[Main_aGame] = function () {
    inUseObj = AGame;
    Screens_init();
};
Main_Switchobj[Main_games] = function () {
    inUseObj = Game;
    Screens_init();
};

function Main_SwitchScreenAction(removekey) {
    Main_HideWarningDialog();
    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_Switchobj[Main_values.Main_Go]) Main_Switchobj[Main_values.Main_Go]();
    else Main_Switchobj[1]();

    if (removekey) Main_RemoveKeys();
}

function Main_OpenSearch() {
    if (!Main_values.Search_isSearching) Main_values.Main_BeforeSearch = Main_values.Main_Go;
    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_Search;
    Main_HideWarningDialog();
    Main_CounterDialogRst();
    Search_init();
}

function Main_SaveValues() {
    Main_setItem('Main_values', JSON.stringify(Main_values));
}

function Main_RestoreValues() {
    Main_values = Screens_assign(Main_values, Main_getItemJson('Main_values', {}));
}

var Main_ExitCurrentobj = {
    // way not?... 'computed property names' is only available in ES6 (use 'esversion: 6').
    //    [Main_Users]: Users_exit
};
Main_ExitCurrentobj[Main_Users] = Users_exit;
Main_ExitCurrentobj[Main_ChannelContent] = ChannelContent_exit;

Main_ExitCurrentobj[Main_SearchChannels] = Screens_exit;
Main_ExitCurrentobj[Main_SearchLive] = Screens_exit;
Main_ExitCurrentobj[Main_SearchGames] = Screens_exit;
Main_ExitCurrentobj[Main_UserChannels] = Screens_exit;
Main_ExitCurrentobj[Main_UserLive] = Screens_exit;
Main_ExitCurrentobj[Main_usergames] = Screens_exit;
Main_ExitCurrentobj[Main_ChannelVod] = Screens_exit;
Main_ExitCurrentobj[Main_UserVod] = Screens_exit;
Main_ExitCurrentobj[Main_Live] = Screens_exit;
Main_ExitCurrentobj[Main_Featured] = Screens_exit;
Main_ExitCurrentobj[Main_AGameClip] = Screens_exit;
Main_ExitCurrentobj[Main_AGameVod] = Screens_exit;
Main_ExitCurrentobj[Main_Clip] = Screens_exit;
Main_ExitCurrentobj[Main_Vod] = Screens_exit;
Main_ExitCurrentobj[Main_ChannelClip] = Screens_exit;
Main_ExitCurrentobj[Main_aGame] = Screens_exit;
Main_ExitCurrentobj[Main_games] = Screens_exit;

function Main_ExitCurrent(ExitCurrent) {
    if (Main_ExitCurrentobj[ExitCurrent]) Main_ExitCurrentobj[ExitCurrent]();
    if (Main_isElementShowing('settings_holder')) Settings_exit();
}

function Main_RestoreTopLabel() {
    Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);
    Main_HideElement('label_side_panel');
}

function Main_cleanTopLabel() {
    Main_ShowElement('label_side_panel');
}

function Main_videoCreatedAt(time) {
    //time in '2017-10-27T13:27:27Z'
    time = new Date(time);
    if (Main_IsDayFirst) return time.getDate() + ' ' + STR_MONTHS[time.getMonth()] + ' ' + time.getFullYear();
    else return STR_MONTHS[time.getMonth()] + ' ' + time.getDate() + ' ' + time.getFullYear();
}

function Main_checkVersion() {
    if (Main_IsNotBrowser) {
        var Appversion = null,
            TizenVersion = null,
            fw = null,
            value = 0,
            Main_tvModel;

        try {
            Appversion = tizen.application.getAppInfo().version;
            // Retrieving Platform Information https://developer.samsung.com/tv/develop/guides/fundamentals/retrieving-platform-information
            TizenVersion = tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version');
            fw = webapis.productinfo.getFirmware();
            Main_tvModel = webapis.productinfo.getModel();
            console.log('App version: ' + Main_minversion);
        } catch (e) {}

        if (Appversion !== null && TizenVersion !== null && Main_tvModel !== null && fw !== null) {
            Main_versionTag =
                'APP ' +
                STR_VERSION +
                Appversion +
                '.' +
                Main_minversion +
                (Main_isReleased
                    ? ''
                    : '<div style="display: inline-block; color: #FF0000; font-size: 110%; font-weight: bold;"> TEST ONLY</div><br><div style="display: inline-block; color: #FF0000; font-size: 110%; font-weight: bold;">Don\'t use this version unless you are testing or debugging... Go back to github and download the correct release zip that is only 12kb</div>') +
                STR_BR +
                'Tizen ' +
                STR_VERSION +
                TizenVersion +
                STR_SPACE +
                STR_SPACE +
                '|' +
                STR_SPACE +
                STR_SPACE +
                'TV: ' +
                Main_tvModel +
                STR_SPACE +
                STR_SPACE +
                '|' +
                STR_SPACE +
                STR_SPACE +
                'FW: ' +
                fw +
                STR_BR;
            Appversion = Appversion.split('.');
            value = parseInt(Appversion[0] + Appversion[1] + Appversion[2]);

            Main_innerHTML('dialog_about_text', STR_ABOUT_INFO_HEADER + Main_versionTag + '<div id="about_runningtime"></div>' + STR_ABOUT_INFO_0);

            if (!Main_isReleased) console.log('Tizen ' + STR_VERSION + TizenVersion + ' | ' + 'TV: ' + Main_tvModel + ' | ' + 'FW: ' + fw);

            if (value < Main_version) Main_ShowElement('label_update');
        }
    }
    Main_RunningTime = Date.now();
}

function Main_empty(el) {
    el = document.getElementById(el);
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_YRst(y) {
    Main_cursorYAddFocus = y;
}

function Main_YchangeAddFocus(y) {
    var position = 0;

    if (Main_cursorYAddFocus < y) position = -1; //going down
    else if (Main_cursorYAddFocus > y) position = 1; //going up

    Main_cursorYAddFocus = y;
    return position;
}

//"handleKeyUp, keyClickDelay, keyClickDelayStart and Main_CantClick" are here to prevent races during click and hold
//That can cause visual glitches and make the user lost sense on were the focus is
//Or cause the app to keep moving up/down seconds after the key has be released
function Main_handleKeyUp() {
    Main_addFocusFinish = true;
}

function Main_keyClickDelay() {
    Main_LastClickFinish = true;
}

function Main_keyClickDelayStart() {
    Main_LastClickFinish = false;
    window.setTimeout(Main_keyClickDelay);
}

function Main_CantClick() {
    return !Main_LastClickFinish || !Main_addFocusFinish;
}

function Main_ThumbOpenIsNull(id, thumbnail) {
    return document.getElementById(thumbnail + id) === null;
}

function Main_OpenLiveStream(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener('keydown', handleKeyDownFunction);
    Main_values.Play_selectedChannel = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    Main_values.Play_selectedChannel_id = Main_values.Play_selectedChannel[1];
    Main_values.IsRerun = Main_values.Play_selectedChannel[2];
    Main_values.Play_gameSelected_id = Main_values.Play_selectedChannel[3];
    Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

    if (Main_values.Play_isHost) {
        Main_values.Play_DisplaynameHost = document.getElementById(idsArray[3] + id).textContent;
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_DisplaynameHost.split(STR_USER_HOSTING)[1];
    } else Main_values.Play_selectedChannelDisplayname = document.getElementById(idsArray[3] + id).textContent;

    var playing = document.getElementById(idsArray[5] + id).textContent;
    Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : '';

    if (Main_values.Main_Go === Main_aGame) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_openStream();
}

function Main_openStream() {
    document.body.removeEventListener('keydown', Play_handleKeyDown);
    document.body.addEventListener('keydown', Play_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hidePanel();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Main_ready(Play_Start);
}

function Main_OpenClip(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener('keydown', handleKeyDownFunction);
    ChannelClip_playUrl = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    PlayClip_DurationSeconds = parseInt(ChannelClip_playUrl[1]);
    Main_values.Play_gameSelected = ChannelClip_playUrl[2];
    Main_values.Main_selectedChannel = ChannelClip_playUrl[3];
    Main_values.Main_selectedChannelDisplayname = ChannelClip_playUrl[4];
    Main_values.Main_selectedChannelLogo = ChannelClip_playUrl[5];
    Main_values.Main_selectedChannel_id = ChannelClip_playUrl[6];
    Main_values.ChannelVod_vodId = ChannelClip_playUrl[7];
    ChannelVod_vodOffset = parseInt(ChannelClip_playUrl[8]);
    Main_values.Play_gameSelected_id = ChannelClip_playUrl[14];

    ChannelClip_title = ChannelClip_playUrl[9];
    ChannelClip_language = ChannelClip_playUrl[10];
    ChannelClip_game = ChannelClip_playUrl[2] && ChannelClip_playUrl[2] !== '' ? STR_PLAYING + ChannelClip_playUrl[2] : '';
    ChannelClip_createdAt = ChannelClip_playUrl[11];
    ChannelClip_views = ChannelClip_playUrl[12];

    ChannelClip_playUrl2 = ChannelClip_playUrl[13].split('-preview')[0] + '.mp4';
    ChannelClip_playUrl = ChannelClip_playUrl[0];

    document.body.addEventListener('keydown', PlayClip_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    Play_hideChat();
    Play_clearPause();
    Play_HideWarningDialog();
    Play_CleanHideExit();
    Main_ready(PlayClip_Start);
}

function Main_OpenVod(id, idsArray, handleKeyDownFunction) {
    if (Main_ThumbOpenIsNull(id, idsArray[0])) return;
    document.body.removeEventListener('keydown', handleKeyDownFunction);
    Main_values.ChannelVod_vodId = JSON.parse(document.getElementById(idsArray[8] + id).getAttribute(Main_DataAttribute));

    ChannelVod_DurationSeconds = parseInt(Main_values.ChannelVod_vodId[6]);
    ChannelVod_Duration = STR_DURATION + Play_timeS(ChannelVod_DurationSeconds);

    ChannelVod_language = Main_values.ChannelVod_vodId[9];
    Main_values.Play_gameSelected = Main_values.ChannelVod_vodId[10];

    if (Main_values.Play_gameSelected === null) Main_values.Play_gameSelected = '';

    Main_values.Main_selectedChannelDisplayname = Main_values.ChannelVod_vodId[1];
    ChannelVod_createdAt = Main_values.ChannelVod_vodId[2];
    ChannelVod_title = Main_values.ChannelVod_vodId[3];
    ChannelVod_game =
        Main_values.Play_gameSelected !== '' && Main_values.Play_gameSelected !== null
            ? STR_STARTED + STR_PLAYING + Main_values.Play_gameSelected
            : '';
    ChannelVod_views = Main_values.ChannelVod_vodId[4];
    Main_values.Play_gameSelected_id = null;

    Main_values.Main_selectedChannel_id = Main_values.ChannelVod_vodId[13];
    Main_values.Main_selectedChannelLogo = Main_values.ChannelVod_vodId[14];
    Main_values.Main_selectedChannelPartner = Main_values.ChannelVod_vodId[15];

    Main_values.Main_selectedChannel = Main_values.ChannelVod_vodId[11];
    Play_IncrementView = Main_values.ChannelVod_vodId[12];

    Main_values.ChannelVod_vodId = Main_values.ChannelVod_vodId[8];
    Main_openVod();
}

function Main_openVod() {
    document.body.addEventListener('keydown', PlayVod_handleKeyDown, false);
    Main_HideElement('scene1');
    Main_ShowElement('scene2');
    PlayVod_hidePanel();
    Play_hideChat();
    Play_clearPause();
    Play_CleanHideExit();
    Main_ready(PlayVod_Start);
}

function Main_ScrollTable(id, position) {
    document.getElementById(id).style.top = position ? position / BodyfontSize + 'em' : '';
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_ScrollTableCalc(id, position, percentage) {
    document.getElementById(id).style.top = 'calc(' + percentage + '% + ' + position / BodyfontSize + 'em)';
    window.setTimeout(Main_handleKeyUp, 10);
}

function Main_removeFocus(id, idArray) {
    Main_addFocusFinish = false;
    Main_RemoveClass(idArray[0] + id, Main_classThumb);
}

// stylesheet[i].cssRules or stylesheet[i].rules is blocked in chrome
// So in order to check if a css class is loaded one can check it's font-family
// The simple test here it to remove the <link rel="stylesheet" href="https://werevere"> from index and see if the bellow funtion loads the css for you and vice versa
function Main_Checktylesheet() {
    console.log('Main_Checktylesheet');
    var span = document.createElement('span');

    span.className = 'fa';
    span.style.display = 'none';
    document.body.insertBefore(span, document.body.firstChild);

    Main_ready(function () {
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') !== 'icons') {
            console.log('Main_Checktylesheet reloading');
            Main_LoadStylesheet('https://fgl27.github.io/smarttv-twitch/release/githubio/css/font-awesome.min.css');
            //TODO remove this when updating
            //Main_LoadStylesheet('https://fgl27.github.io/smarttv-twitch/release/githubio/css/master.css');
        } else console.log('Main_Checktylesheet loaded OK');

        document.body.removeChild(span);
    });
}

function Main_LoadStylesheet(path) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;

    document.getElementsByTagName('head')[0].appendChild(link);
}

//adapted from https://code.jquery.com/jquery-3.3.1.js
function Main_ready(func) {
    if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout(func);
    } else document.addEventListener('DOMContentLoaded', func);
}

var Main_clock_H_M = '';
function Main_getclock() {
    var timems = new Date().getTime() + Main_ClockOffset,
        dayMonth,
        date = new Date(timems);

    if (Main_IsDayFirst) dayMonth = STR_DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + STR_MONTHS[date.getMonth()];
    else dayMonth = STR_DAYS[date.getDay()] + ' ' + STR_MONTHS[date.getMonth()] + ' ' + date.getDate();

    Main_clock_H_M = Play_lessthanten(date.getHours()) + ':' + Play_lessthanten(date.getMinutes());

    return dayMonth + ' ' + Main_clock_H_M;
}

// right after the TV comes from standby the network can lag, delay the check
//function Main_Resume() {
//    if (!document.hidden) {
//        Main_updateclock();
//        //Update clock twice as first try clock may be out of date in the case TV was on standby
//        window.setTimeout(Main_updateclock, 20000);
//    }
//}

function Main_updateclock() {
    if (!document.hidden) {
        Main_textContent('label_clock', Main_getclock());
        if (Main_RunningTime) Main_AboutDialogUpdateTime();
        Main_randomimg = '?' + Math.random();
    }
}

function Main_RandomInt() {
    return parseInt(Math.random() * 1000000000);
}

function Main_updateUserFeed() {
    if (AddUser_UserIsSet()) {
        window.setTimeout(function () {
            if (!document.hidden && !UserLiveFeed_isFeedShow() && !Sidepannel_isShowing() && !UserLiveFeed_loadingData) {
                Play_FeedOldUserName = AddUser_UsernameArray[0].name;
                UserLiveFeed_StartLoad();
            }
        }, 15000);
    }
}

function Main_ExitDialog(event) {
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Main_HideExitDialog();
            break;
        case KEY_RIGHT:
            Main_ExitCursor++;
            if (Main_ExitCursor > 2) Main_ExitCursor = 0;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_LEFT:
            Main_ExitCursor--;
            if (Main_ExitCursor < 0) Main_ExitCursor = 2;
            Main_ExitCursorSet();
            Main_clearExitDialog();
            Main_setExitDialog();
            break;
        case KEY_ENTER:
            if (!Main_IsNotBrowser || !Main_ExitCursor) Main_HideExitDialog();
            else if (Main_ExitCursor === 1) {
                Main_HideExitDialog();
                tizen.application.getCurrentApplication().hide();
            } else if (Main_ExitCursor === 2) tizen.application.getCurrentApplication().exit();
            break;
        default:
            break;
    }
}

function Main_ReloadScreen() {
    Screens_clear = true;
    ChannelContent_clear = true;

    if (Main_values.Main_Go !== Main_ChannelContent) Main_values.Main_BeforeChannelisSet = false;
    if (Main_values.Main_Go !== Main_aGame) Main_values.Main_BeforeAgameisSet = false;

    Main_CounterDialogRst();

    if (Main_values.Main_Go === Main_ChannelContent) ChannelContent_StartLoad();
    else if (Main_values.Main_Go === Main_Users) Users_StartLoad();
    else {
        if (Main_values.Main_Go === Main_Live) inUseObj = Live;
        else if (Main_values.Main_Go === Main_Featured) inUseObj = Featured;
        else if (Main_values.Main_Go === Main_usergames) inUseObj = UserGames;
        else if (Main_values.Main_Go === Main_aGame) inUseObj = AGame;
        else if (Main_values.Main_Go === Main_games) inUseObj = Game;
        else if (Main_values.Main_Go === Main_Vod) inUseObj = Vod;
        else if (Main_values.Main_Go === Main_Clip) inUseObj = Clip;
        else if (Main_values.Main_Go === Main_AGameClip) inUseObj = AGameClip;
        else if (Main_values.Main_Go === Main_ChannelClip) inUseObj = ChannelClip;
        else if (Main_values.Main_Go === Main_AGameVod) inUseObj = AGameVod;
        else if (Main_values.Main_Go === Main_UserVod) inUseObj = UserVod;
        else if (Main_values.Main_Go === Main_ChannelVod) inUseObj = ChannelVod;
        else if (Main_values.Main_Go === Main_UserLive) inUseObj = UserLive;
        else if (Main_values.Main_Go === Main_UserChannels) inUseObj = UserChannels;
        else if (Main_values.Main_Go === Main_SearchGames) inUseObj = SearchGames;
        else if (Main_values.Main_Go === Main_SearchLive) inUseObj = SearchLive;
        else if (Main_values.Main_Go === Main_SearchChannels) inUseObj = SearchChannels;

        Screens_StartLoad();
    }
}

function Main_setItem(item, value) {
    if (!preventSave) localStorage.setItem(item, value);
}

function Main_getItemInt(item, default_value) {
    var value = parseInt(localStorage.getItem(item));
    if (value || value === 0) return value;
    return default_value;
}

function Main_getItemJson(item, default_value) {
    return JSON.parse(localStorage.getItem(item)) || default_value;
}

function Main_getItemBool(item, default_value) {
    var default_string = default_value.toString();
    return (localStorage.getItem(item) || default_string) === default_string ? default_value : !default_value;
}

// use http://www.fileformat.info/info/unicode/char/16EB/index.html
// Replace "16EB" with is the char ᛫ by the result of "string.charCodeAt(i).toString(16).toUpperCase()"
// To see supported fonts and etc info about the unknown char
function Main_PrintUnicode(string) {
    console.log(string);
    for (var i = 0; i < string.length; i++)
        console.log('Character is: ' + string.charAt(i) + " it's Unicode is: \\u" + string.charCodeAt(i).toString(16).toUpperCase());
}

function BasexmlHttpGet(theUrl, Timeout, HeaderQuantity, access_token, callbackSucess, calbackError, key, id, use_helix, skip_user_token) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open('GET', theUrl, true);
    xmlHttp.timeout = Timeout;
    var i = 0,
        userToken = false,
        appToken = false;

    if (use_helix) {
        if (!skip_user_token && AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            userToken = true;

            Main_Bearer_User_Headers[1][1] = Main_Bearer + AddUser_UsernameArray[0].access_token;

            for (i; i < Main_Bearer_User_Headers.length; i++)
                xmlHttp.setRequestHeader(Main_Bearer_User_Headers[i][0], Main_Bearer_User_Headers[i][1]);
        } else {
            appToken = true;
            for (i; i < Main_Bearer_Headers.length; i++) xmlHttp.setRequestHeader(Main_Bearer_Headers[i][0], Main_Bearer_Headers[i][1]);
        }
    } else {
        Main_Headers[2][1] = access_token;

        for (i; i < HeaderQuantity; i++) xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);
    }
    xmlHttp.ontimeout = function () {};

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callbackSucess(xmlHttp.responseText, key, id);
            } else if ((HeaderQuantity > 2 || use_helix) && (xmlHttp.status === 401 || xmlHttp.status === 403)) {
                //token expired, only Screens HeaderQuantity will be > 2
                var erroFun = function () {
                    calbackError(key, id);
                };
                if (userToken) {
                    AddCode_refreshTokens(0, 0, erroFun, erroFun);
                } else if (appToken) {
                    AddCode_AppToken(0, erroFun, erroFun);
                } else {
                    calbackError(key, id);
                }
            } else {
                calbackError(key, id);
            }
        }
    };

    xmlHttp.send(null);
}

// function BasexmlHttpGetBack(theUrl, Timeout, HeaderQuantity, access_token, callbackSucess, calbackError) {
//     var xmlHttp = new XMLHttpRequest();

//     xmlHttp.open('GET', theUrl, true);
//     xmlHttp.timeout = Timeout;

//     Main_Headers_Backup[2][1] = access_token;

//     for (var i = 0; i < HeaderQuantity; i++) xmlHttp.setRequestHeader(Main_Headers_Backup[i][0], Main_Headers_Backup[i][1]);

//     xmlHttp.ontimeout = function () {};

//     xmlHttp.onreadystatechange = function () {
//         if (xmlHttp.readyState === 4) {
//             if (xmlHttp.status === 200) {
//                 callbackSucess(xmlHttp.responseText);
//             } else if (HeaderQuantity > 2 && (xmlHttp.status === 401 || xmlHttp.status === 403)) {
//                 //token expired, only Screens HeaderQuantity will be > 2
//                 AddCode_refreshTokens(0, 0, Screens_loadDataRequestStart, Screens_loadDatafail);
//             } else {
//                 calbackError();
//             }
//         }
//     };

//     xmlHttp.send(null);
// }

var Main_GetHostBaseUrl =
    '{"operationName":"UseHosting","variables":{"channelLogin":"%x"},"extensions":{"persistedQuery":{"version": 1,"sha256Hash":"427f55a3daca510f726c02695a898ef3a0de4355b39af328848876052ea6b337"}}}';

function Main_GetHost(callbackSucess, checkResult, channel) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open('POST', PlayClip_BaseClipUrl, true);
    xmlHttp.timeout = 25000;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_Headers_Backup[0][1]);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');

    xmlHttp.ontimeout = function () {};

    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            callbackSucess(this, checkResult);
        }
    };

    xmlHttp.send(
        Main_GetHostBaseUrl.replace('%x', channel) //postMessage, null for get
    );
}

var Main_VideoSizeAll = ['384x216', '512x288', '640x360', '896x504', '1280x720'];
var Main_GameSizeAll = ['179x250', '272x380', '340x475', '476x665', '773x1080'];
var Main_SidePannelSizeAll = ['640x360', '896x504', '1280x720', '1536x864', '1920x1080'];
var Main_SidePannelSize = '1280x720';
var Main_VideoSize = '640x360';
var Main_GameSize = '340x475';

function Main_SetThumb() {
    Main_VideoSize = Main_VideoSizeAll[Settings_value.thumb_quality.defaultValue];
    Main_GameSize = Main_GameSizeAll[Settings_value.thumb_quality.defaultValue];
    Main_SidePannelSize = Main_SidePannelSizeAll[Settings_value.thumb_quality.defaultValue];
}

function Main_ReplaceLargeFont(text) {
    return text.replace(/[^\x00-\x7F]/g, function (match) {
        return '<span style="font-size: 0.8em;">' + match + '</span>';
    });
}

function Main_Slice(arrayTocopy) {
    var array = [];
    //slice may crash RangeError: Maximum call stack size exceeded
    for (var i = 0; i < arrayTocopy.length; i++) {
        array.push(arrayTocopy[i]);
    }
    return array;
}

function Main_A_includes_B(A, B) {
    return A ? A.indexOf(B) !== -1 : false;
}

// function Main_A_equals_B(A, B) {// jshint ignore:line
//     return A === B;
// }

// function Main_A_equals_B_No_Case(A, B) {// jshint ignore:line
//     return (A ? A.toLowerCase() : null) === (B ? B.toLowerCase() : null);
// }

var Main_body = document.body;

function Main_addEventListener(type, fun) {
    Main_removeEventListener(type, fun);
    Main_body.addEventListener(type, fun);
}

function Main_removeEventListener(type, fun) {
    Main_body.removeEventListener(type, fun);
}

function Main_getElementById(elemString) {
    return document.getElementById(elemString);
}

function Main_setTimeout(fun, timeout, id) {
    Main_clearTimeout(id);
    if (timeout && timeout > 0) return window.setTimeout(fun, timeout);
    else return window.setTimeout(fun);
}

function Main_clearTimeout(id) {
    window.clearTimeout(id);
}

function Main_A_equals_B(A, B) {
    return A === B;
}

function Main_Log(text) {
    if (Main_isDebug) {
        text = text + ' ' + Main_LogDate(new Date());
        console.log(text);
    }
}

function Main_LogDate(date) {
    return date.toLocaleTimeString([], {hour12: false}) + '.' + date.getMilliseconds();
}

function Main_AddClassWitEle(element, mclass) {
    element.classList.add(mclass);
}

function Main_RemoveClassWithEle(element, mclass) {
    element.classList.remove(mclass);
}

function Main_emptyWithEle(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
}

function Main_ShowElementWithEle(element) {
    element.classList.remove('hide');
}

function Main_HideElementWithEle(element) {
    element.classList.add('hide');
}

function Main_innerHTMLWithEle(ele, value) {
    ele.innerHTML = value;
}

var DefaultHttpGetTimeout = 25000;
var DefaultHttpGetTimeoutPlus = 5000;
var DefaultHttpGetReTryMax = 2;

function Main_setInterval(fun, timeout, id) {
    Main_clearInterval(id);
    if (timeout && timeout > 0) return window.setInterval(fun, timeout);
}

function Main_clearInterval(id) {
    window.clearInterval(id);
}

function Main_endsWith(str, suffix) {
    return str && suffix && str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function Main_startsWith(str, suffix) {
    return str && !str.indexOf(suffix);
}

function Main_showWarningExtra(text) {
    Main_innerHTML('dialog_warning_extra_text', text);
    Main_ShowElement('dialog_warning_extra');

    window.addEventListener('keydown', Main_PreventClickfun, true);
    window.addEventListener('keyup', Main_PreventClickfun, true);
    window.addEventListener('keypress', Main_PreventClickfun, true);

    Main_setTimeout(function () {
        Main_PreventClickfunEnd();
    }, 60000);
}

function Main_PreventClickfun(e) {
    e.stopPropagation();
    Main_PreventClickfunEnd();
}

function Main_PreventClickfunEnd() {
    Main_HideElement('dialog_warning_extra');
    window.removeEventListener('keydown', Main_PreventClickfun, true);
    window.removeEventListener('keyup', Main_PreventClickfun, true);
    window.removeEventListener('keypress', Main_PreventClickfun, true);
}
