//Variable initialization
var Settings_cursorY = 0;
var Settings_value = {
    "restor_playback": { //restor_playback
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "clip_auto_play_next": { //clip_auto_play_next
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "single_click_exit": { //single_click_exit
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "app_animations": { //app_animations
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "enter_refresh": { //enter_refresh
        "values": ["yes", "no"],
        "defaultValue": 1
    },
    "show_screen_counter": { //show_screen_counter
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "live_feed_sort": { //show_screen_counter
        "values": [
            "views_more",
            "views_less",
            "name_a-z",
            "name_z-a",
            "game_a-z",
            "game_z-a",
            "uptime_new",
            "uptime_old",
        ],
        "defaultValue": 1
    },
    "live_notification": { //buffer_live
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "global_font_offset": { //live notification
        "values": [-3, -2, -1, 0, 1, 2, 3],
        "defaultValue": 4
    },
    "live_notification_time": { //live notification
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "defaultValue": 4
    },
    "buffer_live": { //buffer_live
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "buffer_vod": { //buffer_vod
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 5
    },
    "buffer_clip": { //buffer_clip
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 3
    },
    "end_dialog_counter": { //end_dialog_counter
        "values": ['disable', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "defaultValue": 4
    },
    "bitrate_min": { //bitrate_min
        "values": ['disable', 11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],
        "defaultValue": 18
    },
    "videos_animation": { //videos_animation
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "thumb_quality": { //thumbnail quality
        "values": ["very-low", "low", "normal", "high", "very-high"],
        "defaultValue": 3
    },
    "clock_offset": { //clock_offset
        "values": Settings_GenerateClock(),
        "defaultValue": 49
    },
    "content_lang": { //content_lang
        "values": ["All"],
        "set_values": [""],
        "defaultValue": 1
    },
    "chat_opt": {
        "values": ["None"],
        "set_values": [""],
        "defaultValue": 1
    },
    "highlight_rewards": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_atstreamer": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_atuser": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_user_send": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "show_sub": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "highlight_bits": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_actions": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
    "clear_chat": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "show_chatters": {//Migrated to dialog
        "values": ["no", "chatters", "viewers"],
        "defaultValue": 2
    },
    "individual_lines": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_individual_background": {//Migrated to dialog
        "values": ["disabled", "enabled", "bright", "dark"],
        "defaultValue": 1
    },
    "chat_logging": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_nickcolor": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 2
    },
    "chat_timestamp": {//Migrated to dialog
        "values": ["no", "yes"],
        "defaultValue": 1
    },
};

var Settings_FeedSort = [
    [null, 'viewer_count', 0],
    [null, 'viewer_count', 1],
    [null, 'user_login', 1],
    [null, 'user_login', 0],
    [null, 'game_name', 1],
    [null, 'game_name', 0],
    [null, 'started_at', 0],
    [null, 'started_at', 1]
];

function Settings_GenerateClock() {
    var clock = [],
        time = 43200,
        i = 0;

    for (i; i < 48; i++) {
        clock.push("-" + Play_timeS(time));
        time -= 900;
    }

    clock.push(Play_timeS(0));
    time = 900;

    for (i = 0; i < 48; i++) {
        clock.push(Play_timeS(time));
        time += 900;
    }

    return clock;
}

var Settings_value_keys = [];
var Settings_positions_length = 0;
//Variable initialization end

function Settings_init() {
    document.body.addEventListener("keydown", Settings_handleKeyDown, false);
    ScreensObj_SetTopLable(STR_SETTINGS);
    Main_ShowElement('settings_holder');
    Main_ShowElement('label_side_panel');
    Main_HideElement('label_refresh');
    Settings_cursorY = 0;
    Settings_inputFocus(Settings_cursorY);
    Settings_DivOptionChangeLang('content_lang', STR_CONTENT_LANG, Languages_Selected);
}

function Settings_exit() {
    Settings_ScrollTableReset();
    document.body.removeEventListener("keydown", Settings_handleKeyDown);
    Main_HideElement('label_side_panel');
    Main_ShowElement('label_refresh');
    Settings_RemoveinputFocus();
    Main_HideElement('settings_holder');
}

// The order in Settings_SetSettings is the display order
function Settings_SetSettings() {
    var div = '',
        key;

    // General settings title
    div += Settings_DivTitle('general', STR_SETTINGS_GENERAL);

    // Content Language selection
    key = "content_lang";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    div += Settings_DivOptionWithSummary(key, STR_CONTENT_LANG, '');

    key = "chat_opt";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    div += Settings_DivOptionNoSummary(key, STR_CHAT_OPTIONS);

    //live_feed_sort
    key = "live_feed_sort";
    Settings_value_keys.push(key);
    Settings_value[key].values = [
        STR_VIWES_MOST,
        STR_VIWES_LOWEST,
        STR_NAME_A_Z,
        STR_NAME_Z_A,
        STR_GAME_A_Z,
        STR_GAME_Z_A,
        STR_CREATED_NEWEST,
        STR_CREATED_OLDEST
    ];

    div += Settings_DivOptionWithSummary(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);

    //thumb qualityes
    key = "thumb_quality";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    div += Settings_DivOptionWithSummary(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);

    key = "global_font_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionWithSummary(key, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    //Player restore playback
    key = "restor_playback";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);

    // Videos
    key = "videos_animation";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_VIDEOS_ANIMATION);

    key = "app_animations";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_APP_ANIMATIONS);

    key = "enter_refresh";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_ENTER_REFRESH);

    key = "clip_auto_play_next";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_AUTO_PLAY_NEXT);

    key = "live_notification";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionNoSummary(key, STR_NOW_LIVE_SHOW);

    key = "live_notification_time";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_NOW_DURATION);

    // Clock offset
    key = "clock_offset";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_CLOCK_OFFSET);

    // show_screen_counter
    key = "show_screen_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];
    div += Settings_DivOptionNoSummary(key, STR_SCREEN_COUNTER);

    // Player settings title
    div += Settings_DivTitle('play', STR_SETTINGS_PLAYER);

    key = "single_click_exit";
    Settings_value_keys.push(key);
    Settings_value[key].values = [STR_NO, STR_YES];

    div += Settings_DivOptionWithSummary(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);

    // end_dialog_counter
    key = "end_dialog_counter";
    Settings_value_keys.push(key);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    div += Settings_DivOptionWithSummary(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);

    // Player buffer title/summary
    div += '<div id="setting_title_buffers" class="settings_title">' + STR_SETTINGS_BUFFER_SIZE + '</div>' +
        '<div id="setting_title_buffers_summary" class="settings_summary">' + STR_SETTINGS_BUFFER_SIZE_SUMMARY + '</div>';

    // Player buffer live
    key = "buffer_live";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_LIVE);

    // Player buffer vod
    key = "buffer_vod";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_VOD);

    // Player buffer clip
    key = "buffer_clip";
    Settings_value_keys.push(key);

    div += Settings_DivOptionNoSummary(key, STR_SETTINGS_BUFFER_CLIP);

    Main_innerHTML("settings_main", div);
    Settings_positions_length = Settings_value_keys.length;
    Languages_SetSettings();
}

function Settings_DivTitle(key, string) {
    return '<div id="setting_title_' + key + '" class="settings_section">' + string + '</div>';
}

function Settings_DivOptionNoSummary(key, string) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' +
        key + '_name" class="settings_name">' + string + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionWithSummary(key, string_title, string_summary) {
    return '<div id="' + key + '_div" class="settings_div"><div id="' + key + '_name" class="settings_name">' +
        string_title + '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div></div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_left" class="left"></div></div>' +
        '<div id="' + key + '" class="strokedeline settings_value">' + Settings_Obj_values(key) + '</div>' +
        '<div class="settings_arraw_div"><div id="' + key + 'arrow_right" class="right"></div></div></div>';
}

function Settings_DivOptionChangeLang(key, string_title, string_summary) {
    Main_innerHTML(key + '_name', string_title +
        '<div id="' + key + '_summary" class="settings_summary" style="font-size: 65%;">' + string_summary + '</div>');
}

// The order in Settings_SetStrings doesnot matter
function Settings_SetStrings() {
    var key = '';

    //General settings
    Main_textContent('setting_title_general', STR_SETTINGS_GENERAL);

    // Clock offset
    key = "clock_offset";
    Main_textContent(key + '_name', STR_CLOCK_OFFSET);

    key = "show_screen_counter";
    Main_textContent(key + '_name', STR_SCREEN_COUNTER);

    // Content Language selection
    key = "content_lang";
    Main_textContent(key + '_name', STR_CONTENT_LANG);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [STR_CONTENT_LANG_SUMARRY];

    key = "live_feed_sort";
    Settings_DivOptionChangeLang(key, STR_LIVE_FEED_SORT, STR_LIVE_FEED_SORT_SUMMARY);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_value[key].values = [
        STR_VIWES_MOST,
        STR_VIWES_LOWEST,
        STR_NAME_A_Z,
        STR_NAME_Z_A,
        STR_GAME_A_Z,
        STR_GAME_Z_A,
        STR_CREATED_NEWEST,
        STR_CREATED_OLDEST
    ];

    //Player settings
    Main_textContent('setting_title_play', STR_SETTINGS_PLAYER);

    // Player buffer title/summary
    Main_textContent('setting_title_bandwidth', STR_PLAYER_BITRATE);
    Main_textContent('setting_title_bandwidth_summary', STR_PLAYER_BITRATE_SUMARRY);

    // Player buffer title/summary
    Main_textContent('setting_title_buffers', STR_SETTINGS_BUFFER_SIZE);
    Main_textContent('setting_title_buffers_summary', STR_SETTINGS_BUFFER_SIZE_SUMMARY);

    key = "buffer_live";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_LIVE);
    key = "buffer_vod";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_VOD);
    key = "buffer_clip";
    Main_textContent(key + '_name', STR_SETTINGS_BUFFER_CLIP);

    //Player restore
    key = "restor_playback";
    Settings_DivOptionChangeLang(key, STR_RESTORE_PLAYBACK, STR_RESTORE_PLAYBACK_SUMARRY);
    Settings_value[key].values = [STR_YES, STR_NO];

    //Thumb quality
    key = "thumb_quality";
    Settings_DivOptionChangeLang(key, STR_THUMB_RESOLUTION, STR_THUMB_RESOLUTION_SUMARRY);
    Settings_value[key].values = [STR_VERY_LOW, STR_LOW, STR_NORMAL, STR_HIGH, STR_VERY_HIGH];

    key = "global_font_offset";
    Settings_DivOptionChangeLang(key, STR_GLOBAL_FONT, STR_GLOBAL_FONT_SUMMARY);

    // Chat size
    key = "end_dialog_counter";
    Settings_DivOptionChangeLang(key, STR_END_DIALOG_SETTINGS, STR_END_DIALOG_SETTINGS_SUMMARY);
    Settings_value[key].values[0] = STR_END_DIALOG_DISABLE;

    // Videos
    key = "videos_animation";
    Main_textContent(key + '_name', STR_VIDEOS_ANIMATION);
    Settings_value[key].values = [STR_YES, STR_NO];

    key = "clip_auto_play_next";
    Main_textContent(key + '_name', STR_AUTO_PLAY_NEXT);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "live_notification";
    Main_textContent(key + '_name', STR_NOW_LIVE_SHOW);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "live_notification_time";
    Main_textContent(key + '_name', STR_NOW_DURATION);

    key = "single_click_exit";
    Settings_DivOptionChangeLang(key, STR_SINGLE_EXIT, STR_SINGLE_EXIT_SUMMARY);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "app_animations";
    Main_textContent(key + '_name', STR_APP_ANIMATIONS);
    Settings_value[key].values = [STR_NO, STR_YES];

    key = "enter_refresh";
    Main_textContent(key + '_name', STR_ENTER_REFRESH);
    Settings_value[key].values = [STR_YES, STR_NO];


    for (key in Settings_value)
        if (Settings_value.hasOwnProperty(key))
            Main_textContent(key, Settings_Obj_values(key));

    Languages_SetLang();
}

function Settings_SetDefautls() {
    for (var key in Settings_value) {
        Settings_value[key].defaultValue = Main_getItemInt(key, Settings_value[key].defaultValue);
        Settings_value[key].defaultValue -= 1;
        if (Settings_value[key].defaultValue > Settings_Obj_length(key)) Settings_value[key].defaultValue = 0;
    }
    Settings_SetBuffers(0);
    Settings_SetClock();
    Main_SetThumb();
    if (!Settings_Obj_default("app_animations")) Settings_SetAnimations();
    Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
}

function Settings_Obj_values(key) {
    return Settings_value[key].values[Settings_Obj_default(key)];
}

//function Settings_Obj_set_values(key) {
//    return Settings_value[key].set_values[Settings_Obj_default(key)];
//}

function Settings_Obj_default(key) {
    return Settings_value[key].defaultValue;
}

function Settings_Obj_length(key) {
    return Settings_value[key].values.length - 1;
}

function Settings_inputFocus(position) {
    var key = Settings_value_keys[Settings_cursorY];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_Setarrows(position);
    Settings_ScrollTable();
}

function Settings_RemoveinputFocus() {
    var key = Settings_value_keys[Settings_cursorY];
    document.getElementById(key + "arrow_left").style.opacity = "0";
    document.getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_ChangeSettigs(position) {
    var key = Settings_value_keys[position];
    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_Setarrows(position);
    Settings_SetDefault(position);
}

function Settings_Setarrows(position) {
    var key = Settings_value_keys[position];

    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        document.getElementById(key + "arrow_left").style.opacity = "1";
        document.getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        document.getElementById(key + "arrow_left").style.opacity = "0.2";
        document.getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_SetDefault(position) {
    position = Settings_value_keys[position];

    if (position === "videos_animation") Vod_DoAnimateThumb = Settings_Obj_default("videos_animation");
    else if (position === "clip_auto_play_next") PlayClip_All_Forced = Settings_Obj_default("clip_auto_play_next");
    else if (position === "live_notification") UserLiveFeed_Notify = Settings_Obj_default("live_notification");
    else if (position === "live_notification_time") UserLiveFeed_NotifyTimeout = Settings_Obj_values("live_notification_time") * 1000;
    else if (position === "single_click_exit") Play_SingleClickExit = Settings_Obj_default("single_click_exit");
    else if (position === "app_animations") Settings_SetAnimations();
    else if (position === "buffer_live") Settings_SetBuffers(1);
    else if (position === "buffer_vod") Settings_SetBuffers(2);
    else if (position === "buffer_clip") Settings_SetBuffers(3);
    else if (position === "end_dialog_counter") Play_EndSettingsCounter = Settings_Obj_default("end_dialog_counter");
    else if (position === "thumb_quality") Main_SetThumb();
    else if (position === "global_font_offset") calculateFontSize();
    else if (position === "show_screen_counter") Settings_ShowCounter(Settings_Obj_default("show_screen_counter"));
    else if (position === "clock_offset") {
        Settings_SetClock();
        Main_updateclock();
    }
}

function Settings_SetBuffers(whocall) {
    //TODO remove the try after android app update has be releaased for some time
    try {
        if (!whocall) {
            Play_Buffer = Settings_Obj_values("buffer_live");
            PlayVod_Buffer = Settings_Obj_values("buffer_vod");
            PlayClip_Buffer = Settings_Obj_values("buffer_clip");
        } else if (whocall === 1) {
            Play_Buffer = Settings_Obj_values("buffer_live");
        } else if (whocall === 2) {
            PlayVod_Buffer = Settings_Obj_values("buffer_vod");
        } else if (whocall === 3) {
            PlayClip_Buffer = Settings_Obj_values("buffer_clip");
        }
    } catch (e) { }
}

function Settings_SetAnimations() {
    var i, array,
        classes = ['screen_holder',
            'screen_holder_channel',
            'screen_holder_switch',
            'screen_holder_user',
            'screen_holder_games',
            'animate_height_transition_channel',
            'animate_height_transition_games',
            'animate_height_transition',
            'side_panel_holder_ani',
            'scenefeed_background',
            'user_feed_notify',
            'user_feed_scroll_ani',
            'side_panel_fix',
            'side_panel_movel',
            'side_panel',
            'user_feed'
        ],
        animate = Settings_Obj_default("app_animations"),
        mtransition = animate ? '' : 'none';

    classes.forEach(
        function(classe) {
            array = document.getElementsByClassName(classe);
            for (i = 0; i < array.length; i++)
                array[i].style.transition = mtransition;
        }
    );

    UserLiveFeed_FeedRemoveFocus();

    array = document.getElementsByClassName(Main_classThumb);

    try {
        //Array.prototype maybe not supported by all TVs
        Array.prototype.forEach.call(array,
            function(el) {
                el.classList.remove(Main_classThumb);
            }
        );
    } catch (e) { }

    Main_classThumb = animate ? 'stream_thumbnail_focused' : 'stream_thumbnail_focused_no_ani';
    UserLiveFeed_FocusClass = animate ? 'feed_thumbnail_focused' : 'feed_thumbnail_focused_no_ani';
    Screens_SettingDoAnimations = animate;
}

function Settings_ShowCounter(show) {
    if (show) Main_ShowElement('dialog_counter_text');
    else Main_HideElement('dialog_counter_text');
}

//function Settings_CheckLang(lang) {
//    if (lang.indexOf('en_') !== -1) Settings_value.general_lang.defaultValue = 0;
//    else if (lang.indexOf('it_') !== -1) Settings_value.general_lang.defaultValue = 1;
//    else if (lang.indexOf('pt_') !== -1) Settings_value.general_lang.defaultValue = 2;
//}

//function Settings_SetLang(lang) {
//    if (lang.indexOf('en_') !== -1) en_USLang();
//else if (lang.indexOf('it_') !== -1) it_ITLang();
//else if (lang.indexOf('pt_') !== -1) pt_BRLang();
//    DefaultLang();
//    Main_SetStringsMain(false);
//    Main_SetStringsSecondary();
//}

function Settings_SetClock() {
    var time = Settings_Obj_default("clock_offset");
    Main_ClockOffset = time < 48 ? (48 - time) * -900000 : (time - 48) * 900000;
}

var Settings_CurY = 0;

function Settings_ScrollTable() {
    var doc;
    if (Settings_CurY < Settings_cursorY && Settings_cursorY === 13) {
        doc = document.getElementById('settings_scroll');
        doc.scrollTop = doc.scrollHeight;
        if (Settings_Obj_default("app_animations")) {
            var position = doc.scrollTop;
            doc.scrollTop = 0;
            scrollTo(doc, position, 450);
        }
    } else if (Settings_CurY > Settings_cursorY && Settings_cursorY === 12) {
        doc = document.getElementById('settings_scroll');
        if (Settings_Obj_default("app_animations")) scrollTo(doc, 0, 450);
        else doc.scrollTop = 0;
    }

    Settings_CurY = Settings_cursorY;
}

function Settings_ScrollTableReset() {
    document.getElementById('settings_scroll').scrollTop = 0;
    Settings_CurY = 0;
}

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 3;

    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

function Settings_handleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Settings_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_LEFT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) > 0) {
                Settings_value[key].defaultValue -= 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_RIGHT:
            key = Settings_value_keys[Settings_cursorY];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) {
                Settings_value[key].defaultValue += 1;
                Settings_ChangeSettigs(Settings_cursorY);
            }
            break;
        case KEY_UP:
            if (Settings_cursorY > 0) {
                Settings_RemoveinputFocus();
                Settings_cursorY--;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_DOWN:
            if (Settings_cursorY < (Settings_positions_length - 1)) {
                Settings_RemoveinputFocus();
                Settings_cursorY++;
                Settings_inputFocus(Settings_cursorY);
            }
            break;
        case KEY_ENTER:
            if (!Settings_cursorY) Languages_init();
            else if (Main_A_includes_B(Settings_value_keys[Settings_cursorY], 'chat_opt')) Settings_DialogShowChat();
            break;
        default:
            break;
    }
}


function Settings_DialogShowChat() {
    var yes_no = [STR_NO, STR_YES];
    Settings_value.highlight_rewards.values = yes_no;
    Settings_value.highlight_atstreamer.values = yes_no;
    Settings_value.highlight_atuser.values = yes_no;
    Settings_value.highlight_user_send.values = yes_no;
    Settings_value.show_sub.values = yes_no;
    Settings_value.highlight_bits.values = yes_no;
    Settings_value.show_actions.values = yes_no;
    Settings_value.chat_individual_background.values = [STR_DISABLED, STR_ENABLED, STR_BRIGHT_MODE, STR_DARK_MODE];
    Settings_value.chat_logging.values = yes_no;
    Settings_value.individual_lines.values = yes_no;
    Settings_value.chat_nickcolor.values = yes_no;
    Settings_value.chat_timestamp.values = yes_no;
    Settings_value.clear_chat.values = yes_no;
    Settings_value.show_chatters.values = [STR_DISABLED, STR_SHOW_IN_CHAT_CHATTERS, STR_SHOW_IN_CHAT_VIEWERS];

    var obj = {
        chat_logging: {
            defaultValue: Settings_value.chat_logging.defaultValue,
            values: Settings_value.chat_logging.values,
            title: STR_CHAT_LOGGING,
            summary: STR_CHAT_LOGGING_SUMMARY
        },
        individual_lines: {
            defaultValue: Settings_value.individual_lines.defaultValue,
            values: Settings_value.individual_lines.values,
            title: STR_CHAT_INDIVIDUAL_LINE,
            summary: null
        },
        chat_individual_background: {
            defaultValue: Settings_value.chat_individual_background.defaultValue,
            values: Settings_value.chat_individual_background.values,
            title: STR_CHAT_INDIVIDUAL_BACKGROUND,
            summary: STR_CHAT_INDIVIDUAL_BACKGROUND_SUMMARY
        },
        chat_timestamp: {
            defaultValue: Settings_value.chat_timestamp.defaultValue,
            values: Settings_value.chat_timestamp.values,
            title: STR_CHAT_TIMESTAMP,
            summary: null
        },
        show_chatters: {
            defaultValue: Settings_value.chat_timestamp.defaultValue,
            values: Settings_value.chat_timestamp.values,
            title: STR_SHOW_IN_CHAT,
            summary: STR_SHOW_IN_CHAT_SUMMARY
        },
        chat_nickcolor: {
            defaultValue: Settings_value.chat_nickcolor.defaultValue,
            values: Settings_value.chat_nickcolor.values,
            title: STR_CHAT_NICK_COLOR,
            summary: STR_CHAT_NICK_COLOR_SUMMARY
        },
        highlight_rewards: {
            defaultValue: Settings_value.highlight_rewards.defaultValue,
            values: Settings_value.highlight_rewards.values,
            title: STR_CHAT_HIGHLIGHT_REDEEMED,
            summary: null
        },
        highlight_atstreamer: {
            defaultValue: Settings_value.highlight_atstreamer.defaultValue,
            values: Settings_value.highlight_atstreamer.values,
            title: STR_CHAT_HIGHLIGHT_STREAMER,
            summary: null
        },
        highlight_atuser: {
            defaultValue: Settings_value.highlight_atuser.defaultValue,
            values: Settings_value.highlight_atuser.values,
            title: STR_CHAT_HIGHLIGHT_USER,
            summary: null
        },
        highlight_user_send: {
            defaultValue: Settings_value.highlight_user_send.defaultValue,
            values: Settings_value.highlight_user_send.values,
            title: STR_CHAT_HIGHLIGHT_USER_SEND,
            summary: null
        },
        show_sub: {
            defaultValue: Settings_value.show_sub.defaultValue,
            values: Settings_value.show_sub.values,
            title: STR_CHAT_SHOW_SUB,
            summary: null
        },
        highlight_bits: {
            defaultValue: Settings_value.highlight_bits.defaultValue,
            values: Settings_value.highlight_bits.values,
            title: STR_CHAT_HIGHLIGHT_BIT,
            summary: null
        },
        clear_chat: {
            defaultValue: Settings_value.clear_chat.defaultValue,
            values: Settings_value.clear_chat.values,
            title: STR_CHAT_CLEAR_MSG,
            summary: STR_CHAT_CLEAR_MSG_SUMMARY
        },
        show_actions: {
            defaultValue: Settings_value.show_actions.defaultValue,
            values: Settings_value.show_actions.values,
            title: STR_CHAT_HIGHLIGHT_ACTIONS,
            summary: STR_CHAT_HIGHLIGHT_ACTIONS_SUMMARY
        },
    };

    Settings_DialogShow(obj, STR_CHAT_OPTIONS);
}

var Settings_DialogValue = [];
var Settings_DialogPos = 0;

function Settings_DialogShow(obj, title) {
    Main_removeEventListener("keydown", Settings_handleKeyDown);

    var dialogContent = title + STR_BR + STR_BR;
    Settings_DialogValue = [];

    for (var property in obj) {
        Settings_DialogValue.push(property);
        if (obj[property].keyenter) {
            dialogContent += Settings_Content(property, [STR_CONTENT_LANG_SUMARRY], obj[property].title, null);
        } else {
            dialogContent += obj[property].summary ?
                Settings_DivOptionWithSummary(property, obj[property].title, obj[property].summary, 73) :
                Settings_DivOptionNoSummary(property, obj[property].title);
        }
    }

    Main_innerHTML("dialog_settings_text", dialogContent + STR_DIV_TITLE + STR_CLOSE_THIS + '</div>');

    Settings_DialogPos = 0;
    Main_AddClass(Settings_DialogValue[0], 'settings_value_focus');
    Main_AddClass(Settings_DialogValue[0] + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(Settings_DialogValue[0]);

    Main_ShowElement('dialog_settings');
    Main_addEventListener("keydown", Settings_DialoghandleKeyDown);
}

function Settings_SetarrowsKey(key) {
    if (!Settings_Obj_length(key)) return;

    var currentValue = Settings_Obj_default(key);
    var maxValue = Settings_Obj_length(key);

    if (currentValue > 0 && currentValue < maxValue) {
        Main_getElementById(key + "arrow_left").style.opacity = "1";
        Main_getElementById(key + "arrow_right").style.opacity = "1";
    } else if (currentValue === maxValue) {
        Main_getElementById(key + "arrow_left").style.opacity = "1";
        Main_getElementById(key + "arrow_right").style.opacity = "0.2";
    } else {
        Main_getElementById(key + "arrow_left").style.opacity = "0.2";
        Main_getElementById(key + "arrow_right").style.opacity = "1";
    }
}

function Settings_DialoghandleKeyDown(event) {
    var key;
    switch (event.keyCode) {
        case KEY_ENTER:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            Settings_RemoveinputFocusKey(Settings_DialogValue[Settings_DialogPos]);
            Main_HideElement('dialog_settings');
            Main_removeEventListener("keydown", Settings_DialoghandleKeyDown);
            Main_addEventListener("keydown", Settings_handleKeyDown);
            break;
        case KEY_LEFT:
            key = Settings_DialogValue[Settings_DialogPos];
            if (Settings_Obj_default(key) > 0) Settings_DialogRigthLeft(-1);
            break;
        case KEY_RIGHT:
            key = Settings_DialogValue[Settings_DialogPos];
            if (Settings_Obj_default(key) < Settings_Obj_length(key)) Settings_DialogRigthLeft(1);
            break;
        case KEY_UP:
            if (Settings_DialogPos > 0) Settings_DialogUpDown(-1);
            break;
        case KEY_DOWN:
            if (Settings_DialogPos < (Settings_DialogValue.length - 1)) Settings_DialogUpDown(1);
            break;
        default:
            break;
    }
}

function Settings_DialogUpDown(offset) {
    Settings_RemoveinputFocusKey(Settings_DialogValue[Settings_DialogPos]);
    Settings_DialogPos += offset;

    var key = Settings_DialogValue[Settings_DialogPos];
    Main_AddClass(key, 'settings_value_focus');
    Main_AddClass(key + '_div', 'settings_div_focus');
    Settings_SetarrowsKey(key);
}

function Settings_DialogRigthLeft(offset) {
    var key = Settings_DialogValue[Settings_DialogPos];

    Settings_value[key].defaultValue += offset;

    Main_setItem(key, Settings_Obj_default(key) + 1);
    Main_textContent(key, Settings_Obj_values(key));
    Settings_SetarrowsKey(key);
    Settings_SetDefault(key);
}

function Settings_RemoveinputFocusKey(key) {
    Main_getElementById(key + "arrow_left").style.opacity = "0";
    Main_getElementById(key + "arrow_right").style.opacity = "0";
    Main_RemoveClass(key, 'settings_value_focus');
    Main_RemoveClass(key + '_div', 'settings_div_focus');
}

function Settings_Content(key, valuesArray, STR, STR_SUMMARY) {
    Settings_value_keys.push(key);
    if (valuesArray) Settings_value[key].values = valuesArray;

    return (STR_SUMMARY ? Settings_DivOptionWithSummary(key, STR, STR_SUMMARY) : Settings_DivOptionNoSummary(key, STR));
}
