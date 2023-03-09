//Variable initialization
var Play_ChatPositions = 0;
var Play_ChatPositionConvertBefore = Play_ChatPositions;
var Play_PlayerPanelOffset = -5;
var Play_ChatBackground = 0.55;
var Play_ChatSizeValue = 2;
var Play_SingleClickExit = 0;
var Play_MaxChatSizeValue = 4;
var Play_LowLatency = false;
var Play_CanLowLatency = true;
var Play_PanelHideID = null;
var Play_quality = 'source';
var Play_qualityPlaying = Play_quality;
var Play_isFullScreen = true;
var Play_ChatPositionsBF;
var Play_ChatEnableBF;
var Play_ChatSizeValueBF;
var Play_isHost = false;
var Play_FeedOldUserName = '';
var Play_FeedPos = 0;
var Play_Buffer = 2000;
var Play_CurrentSpeed = 3;
var Play_onPlayerCounter = 0;
var Play_TizenVersion = 2.4;
var Play_EndUpclear = false;
var Play_EndUpclearID;
var Play_EndUpclearCalback;
var Play_EndDialogEnter = 0;
var Play_EndFocus = false;
var Play_Temp_selectedChannelDisplayname = '';

var Play_STATE_LOADING_TOKEN = 0;
var Play_STATE_LOADING_PLAYLIST = 1;
var Play_STATE_PLAYING = 2;
var Play_state = 0;

var Play_streamInfoTimerId = null;
var Play_tokenResponse = 0;
var Play_playlistResponse = 0;
var Play_playingTry = 0;

var Play_playingUrl = '';
var Play_qualities = [];
var Play_qualityIndex = 0;
var Play_ChatEnable = false;
var Play_exitID = null;

var Play_selectedChannel_id_Old = null;
var Play_IsRerun_Old;
var Play_selectedChannel_Old;
var Play_isHost_Old;
var Play_Main_isHost_Old;
var Play_DisplaynameHost_Old;
var Play_selectedChannelDisplayname_Old;
var Play_gameSelected_Old;

var Play_pauseEndID = null;
var Play_pauseStartID = null;

var Play_created = '';

var Play_loadingDataTry = 0;
var Play_loadingDataTryMax = 5;

var Play_loadingInfoDataTry = 0;
var Play_loadingInfoDataTryMax = 5;

var Play_ResumeAfterOnlineCounter = 0;
var Play_ResumeAfterOnlineId;
var Play_isOn = false;
var Play_ChatBackgroundID = null;
var Play_qualitiesFound = false;
var Play_PlayerTime = 0;
var Play_streamCheckId = null;
var Play_PlayerCheckCount = 0;
var Play_PlayerCheckCounter = 0;
var Play_PlayerCheckQualityChanged = false;
var Play_PlayerCheckRun = false;
var Play_Playing = false;
var Play_IsWarning = false;
var Play_LoadLogoSucess = false;
var Play_loadingInfoDataTimeout = 10000;
var Play_loadingDataTimeout = 2000;
var Play_Lang = '';
var Play_Endcounter = 0;
var Play_EndTextCounter = 3;
var Play_EndSettingsCounter = 3;
var Play_EndTextID = null;
var Play_DialogEndText = '';
var Play_currentTime = 0;
var Play_watching_time = 0;
var Play_ChatDelayPosition = 0;
//var Play_4K_ModeEnable = false;
var Play_TargetHost = '';
var Play_isLive = true;
var Play_RestoreFromResume = false;
var Play_PlayerCheckTimer = 7;
var Play_PlayerCheckInterval = 1000;
var Play_updateStreamInfoErrorTry = 0;
var Play_chat_container;
var Play_IncrementView = '';
var Play_ProgresBarrElm;
var Play_DefaultjumpTimers = [];
var Play_UserLiveFeedPressed = false;
var Play_base_kraken_headers_Array = [];

var Play_base_parameters = 'reassignments_supported=true&playlist_include_framerate=true&allow_source=true&fast_bread=true&cdm=wv&p=%d';
var Play_live_ttv_lol_links = 'https://api.ttv.lol/playlist/';
var ttv_lol_headers = [['X-Donate-To', 'https://ttv.lol/donate']];

var use_proxy;
var purple_proxy = 'https://jupter.ga/hls/v2/channel/';
var proxy_timeout = 5000;
var proxy_url = '';
var proxy_headers = null;
var proxy_has_parameter = false;

var proxy_fail_counter = 0;
var proxy_fail_counter_checker = 0;

//var proxy_ping_url = 'https://api.ttv

//counterclockwise movement, Vertical/horizontal Play_ChatPositions
//sizeOffset in relation to the size
var Play_ChatPositionVal = [
    {
        top: 51.8, // Bottom/right 0
        left: 75.1,
        sizeOffset: [31, 16, 0, -25.2, 0] // top - sizeOffset is the defaul top for it chat position
    },
    {
        top: 33, // Middle/right 1
        left: 75.1,
        sizeOffset: [12.5, 0, -6.25, -19.5, 0]
    },
    {
        top: 0.2, // Top/right 2
        left: 75.1,
        sizeOffset: [0, 0, 0, 0, 0]
    },
    {
        top: 0.2, // Top/center 3
        left: 38.3,
        sizeOffset: [0, 0, 0, 0, 0]
    },
    {
        top: 0.2, // Top/left 4
        left: 0.2,
        sizeOffset: [0, 0, 0, 0, 0]
    },
    {
        top: 33, // Middle/left 5
        left: 0.2,
        sizeOffset: [12.5, 0, -6.25, -19.5, 0]
    },
    {
        top: 51.8, // Bottom/left 6
        left: 0.2,
        sizeOffset: [31, 16, 0, -25.2, 0]
    },
    {
        top: 51.8, // Bottom/center 7
        left: 38.3,
        sizeOffset: [31, 16, 0, -25.2, 0]
    }
];

//Conversion between chat at 100% and bellow 50%
var Play_ChatPositionsBefore = [0, 0, 0, 1, 2, 2, 2, 1]; //Chat positions size 50 to 100%
var Play_ChatPositionsAfter = [
    //Chat positions size 100 to 50%
    [0, 1, 2, 2, 2, 1, 0, 0],
    [7, 3, 3, 3, 3, 3, 7, 7],
    [6, 5, 4, 4, 4, 5, 6, 6]
];

var Play_ChatSizeVal = [
    {
        containerHeight: 17, // 12.5%
        percentage: '12.5%',
        dialogTop: -25
    },
    {
        containerHeight: 32, // 25%
        percentage: '25%',
        dialogTop: -40
    },
    {
        containerHeight: 48, // 50%
        percentage: '50%',
        dialogTop: -60
    },
    {
        containerHeight: 73, // 75%
        percentage: '75%',
        dialogTop: -80
    },
    {
        containerHeight: 99.6, // 100%
        percentage: '100%',
        dialogTop: -120
    }
];

var Play_ChatFontObj = [];

var Play_avplay;
var Play_BufferPercentage = 0;
var Play_bufferingcomplete = false;
var Play_oldcurrentTime = 0;
var Play_offsettime = 0;
var Play_offsettimeMinus = 0;
//Variable initialization end

function Play_PreStart() {
    if (Main_IsNotBrowser) {
        //<object id="av-player" type="application/avplayer" style="width:100%; height:100%; position: absolute;"></object>
        var avplay = document.createElement('object');
        avplay.setAttribute('type', 'application/avplayer');
        avplay.setAttribute('style', 'width:100%; height:100%; position: absolute;');
        document.getElementById('scene2').appendChild(avplay);
        Play_avplay = (window.tizen && window.webapis.avplay) || {};
        Play_TizenVersion = tizen.systeminfo.getCapability('http://tizen.org/feature/platform.version');
    }

    Play_chat_container = document.getElementById('chat_container0');
    Play_ProgresBarrElm = document.getElementById('inner_progress_bar');
    Play_dialog_warning_play_middle_text = Main_getElementById('dialog_warning_play_middle_text');
    Play_dialog_warning_play_middle = Main_getElementById('dialog_warning_play_middle');

    Play_ChatPositions = Main_getItemInt('ChatPositionsValue', 0);
    Play_ChatSizeValue = Main_getItemInt('ChatSizeValue', 2);
    Play_ChatEnable = Main_getItemBool('ChatEnable', false);
    Play_isFullScreen = Main_getItemBool('Play_isFullScreen', true);
    Play_ChatBackground = (Main_values.ChatBackground * 0.05).toFixed(2);
    Play_ChatDelayPosition = Main_getItemInt('Play_ChatDelayPosition', 0);
    Play_LowLatency = Main_getItemBool('Play_LowLatency', false);

    //"GET_LIVE_DURATION" is available since Tizen version 2.4.
    //That is used to get a Play_LowLatency scenario
    if (parseFloat(Play_TizenVersion) < 2.4) {
        Play_LowLatency = false;
        Play_CanLowLatency = false;
    } else {
        try {
            //reset old no longer used live feed
            webapis.preview.setPreviewData('{}');
        } catch (ex) {}
    }

    var i = 25,
        max = 301;
    for (i; i < max; i++) {
        Play_ChatFontObj.push(i);
    }
    if (Main_values.Chat_font_size_new > Play_ChatFontObj.length - 1) Main_values.Chat_font_size_new = Play_ChatFontObj.length - 1;

    //Play_ClearPlayer();
    Play_ChatSize(false);
    Play_ChatBackgroundChange(false);
    Play_SetChatFont();

    Main_innerHTML(
        'user_feed_notify_img_holder',
        '<img id="user_feed_notify_img" alt="" class="notify_img" src="' +
            IMG_404_LOGO +
            '" onerror="this.onerror=null;this.src=\'' +
            IMG_404_LOGO +
            '\'" >'
    );

    var Main_clientIdHeader = 'Client-ID';

    Main_Headers = [
        [Main_clientIdHeader, AddCode_clientId],
        [Main_AcceptHeader, Main_TwitchV5Json],
        [Main_Authorization, null]
    ];

    Main_Headers_Backup = [
        [Main_clientIdHeader, AddCode_client_backup],
        [Main_AcceptHeader, Main_TwitchV5Json],
        [Main_Authorization, null]
    ];

    Play_base_kraken_headers_Array = [
        [Main_clientIdHeader, AddCode_client_backup],
        ['Accept', 'application/vnd.twitchtv.v5+json']
    ];
}

//this are the global set option that need to be set only once
//and they need to be set like this to work, faking a video playback
function Play_SetAvPlayGlobal() {
    try {
        Play_avplay.stop();
        Play_avplay.close();
        Play_avplay.open('https://fgl27.github.io/smarttv-twitch/release/githubio/images/temp.mp4');
    } catch (e) {
        console.log(e + ' Play_SetAvPlayGlobal()');
    }
    Play_SetFullScreen(Play_isFullScreen);
    Play_avplay.setListener(PlayStart_listener);
    Play_avplay.prepareAsync();
}

var PlayStart_listener = {
    onstreamcompleted: function () {
        try {
            Play_avplay.stop();
            Play_avplay.close();
        } catch (e) {
            console.log(e + ' PlayStart_listener');
        }
    }
};

var Play_isFullScreenold = true;

function Play_SetFullScreen(isfull) {
    if (Play_isFullScreenold === Play_isFullScreen) {
        Play_setDisplayRect(isfull);
        return;
    }
    Play_isFullScreenold = Play_isFullScreen;

    if (isfull) {
        if (Play_ChatPositionsBF !== undefined) {
            Play_ChatPositions = Play_ChatPositionsBF;
            Play_ChatEnable = Play_ChatEnableBF;
            Play_ChatSizeValue = Play_ChatSizeValueBF;
            if (!Play_ChatEnable) Play_hideChat();
            Play_ChatSize(false);
        }
    } else {
        Play_ChatPositionsBF = Play_ChatPositions;
        Play_ChatEnableBF = Play_ChatEnable;
        Play_ChatSizeValueBF = Play_ChatSizeValue;
        Play_ChatPositions = 0;
        Play_showChat();
        Play_ChatEnable = true;
        Play_ChatSizeValue = Play_MaxChatSizeValue;
        Play_ChatPositionConvert(true);
        Play_ChatSize(false);
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }
    Play_setDisplayRect(isfull);
    Main_setItem('Play_isFullScreen', Play_isFullScreen);
}

function Play_setDisplayRect(isfull) {
    var res, Is_4_by_3;

    if (Play_isOn) res = Play_qualities[Play_qualityIndex].resolution.split('x');
    else if (PlayVod_isOn) res = PlayVod_qualities[PlayVod_qualityIndex].resolution.split('x');
    // for clips there is no info about resolution that can be used here

    if (res) Is_4_by_3 = parseInt(res[0]) / parseInt(res[1]) < 1.7;

    try {
        Play_avplay.setDisplayMethod(Is_4_by_3 ? 'PLAYER_DISPLAY_MODE_LETTER_BOX' : 'PLAYER_DISPLAY_MODE_FULL_SCREEN');
    } catch (e) {
        console.log('setDisplayMethod Is_4_by_3 ' + Is_4_by_3 + ' e ' + e);
    }

    if (isfull) {
        try {
            Play_avplay.setDisplayRect(0, 0, screen.width, screen.height);
        } catch (e) {
            console.log(e + ' Play_SetFullScreen true');
        }
    } else {
        // Chat is 25% of the screen, resize to 75% and center left
        try {
            if (Is_4_by_3) Play_avplay.setDisplayRect(0, 0, screen.width * 0.75, screen.height);
            else Play_avplay.setDisplayRect(0, (screen.height * 0.25) / 2, screen.width * 0.75, screen.height * 0.75);
        } catch (e) {
            console.log(e + ' Play_SetFullScreen false');
        }
    }
}

function Play_SetChatFont() {
    Main_getElementById('chat_inner_container').style.fontSize = Play_ChatFontObj[Main_values.Chat_font_size_new] * 0.76 + '%';
}

function Play_Start() {
    Play_showBufferDialog();
    Play_ResetProxy();

    Main_empty('stream_info_title');
    Play_LoadLogoSucess = false;
    PlayClip_HasVOD = true;
    //reset channel logo to prevent another channel logo
    Play_LoadLogo(document.getElementById('stream_info_icon'), IMG_404_LOGO_TEMP);

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = '';
    document.getElementById('controls_' + Play_controlsChatSend).style.display = '';
    document.getElementById('controls_' + Play_controlsProxy).style.display = '';

    document.getElementById('controls_' + Play_controlsLowLatency).style.display = Play_CanLowLatency ? '' : 'none';

    Play_CurrentSpeed = 3;
    Play_IconsResetFocus();

    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    Main_values.Play_WasPlaying = 1;
    Main_SaveValues();

    Play_isHost = Main_values.Play_isHost;
    Main_values.Play_isHost = false;
    Play_RestoreFromResume = false;
    Main_ShowElement('controls_holder');

    Play_currentTime = 0;
    Play_watching_time = 0;
    Main_textContent('stream_watching_time', STR_WATCHING + Play_timeS(0));
    Play_created = Play_timeMs(0);

    Main_textContent('stream_live_time', Play_created);
    Main_HideElement('progress_bar_div');

    Play_offsettimeMinus = 0;
    Play_UserLiveFeedPressed = false;
    if (!Play_EndDialogEnter) {
        Play_EndSet(1);
        UserLiveFeed_SetFeedPicText();
    }
    Play_PlayerPanelOffset = -5;
    Play_updateStreamInfoErrorTry = 0;
    Play_PlayerCheckCounter = 0;
    Play_PlayerCheckCount = 0;
    window.clearInterval(Play_streamCheckId);
    Play_PlayerCheckRun = false;
    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_isLive = true;
    Play_qualitiesFound = 0;
    Play_tokenResponse = 0;
    Play_playlistResponse = 0;
    Play_playingTry = 0;
    Play_isOn = true;
    Play_Playing = false;
    Play_state = Play_STATE_LOADING_TOKEN;
    document.addEventListener('visibilitychange', Play_Resume, false);
    document.body.removeEventListener('keyup', Main_handleKeyUp);
    Play_updateStreamInfoStart();
    Play_loadData();
    window.clearInterval(Play_streamInfoTimerId);
    Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);

    if (!Main_values.Play_gameSelected_id && Main_values.Play_gameSelected) {
        PlayClip_UpdateGameInfo();
    }
}

// To Force a warn, not used regularly so keep commented out
//function Play_Warn(text) {
//    Play_showWarningDialog(text);
//}

var Play_CheckIfIsLiveStartCounter = 0;
var Play_CheckIfIsLiveStartChannel = 0;
var Play_CheckIfIsLiveStartCallback = 0;

function Play_CheckIfIsLiveStart(callback) {
    if (Main_ThumbOpenIsNull(Play_FeedPos, UserLiveFeed_ids[0])) return;
    Play_showBufferDialog();

    Play_CheckIfIsLiveStartCounter = 0;
    Play_CheckIfIsLiveStartCallback = callback;
    Play_CheckIfIsLiveStartChannel = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];

    Play_Temp_selectedChannelDisplayname = document.getElementById(UserLiveFeed_ids[3] + Play_FeedPos).textContent;

    Play_CheckIfIsLive();
}

function Play_CheckIfIsLive() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'https://gql.twitch.tv/gql', true);
    xmlHttp.timeout = Play_loadingDataTimeout;

    if (Play_Headers && Play_Headers.length) {
        var len = Play_Headers.length;

        for (var i = 0; i < len; i++) xmlHttp.setRequestHeader(Play_Headers[i][0], Play_Headers[i][1]);
    }

    xmlHttp.ontimeout = function () {};

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                try {
                    Play_tokenResponse = JSON.parse(xmlHttp.responseText).data.streamPlaybackAccessToken;

                    if (!Play_tokenResponse.hasOwnProperty('value') || !Play_tokenResponse.hasOwnProperty('signature')) Play_CheckIfIsLiveError();
                    else {
                        Play_CheckIfIsLiveStartCounter = 0;
                        Play_CheckIfIsLiveLink();
                    }
                } catch (e) {
                    console.log('Play_CheckIfIsLive e ' + e);
                    Play_CheckIfIsLiveError();
                }
            } else Play_CheckIfIsLiveError();
        }
    };

    xmlHttp.send(Play_live_token.replace('%x', Play_CheckIfIsLiveStartChannel));
}

function Play_CheckIfIsLiveError() {
    if (Play_CheckIfIsLiveStartCounter < 3) {
        Play_CheckIfIsLiveStartCounter++;
        Play_CheckIfIsLive();
    } else Play_CheckIfIsLiveWarn();
}

function Play_CheckIfIsLiveWarn() {
    Play_HideBufferDialog();
    Play_showWarningDialog(Play_Temp_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function () {
        Play_HideWarningDialog();
    }, 2000);
}

function Play_CheckIfIsLiveLinkError() {
    if (Play_CheckIfIsLiveStartCounter < 3) {
        Play_CheckIfIsLiveStartCounter++;
        Play_CheckIfIsLiveLink();
    } else Play_CheckIfIsLiveWarn();
}

function Play_CheckIfIsLiveLink() {
    var theUrl;
    try {
        theUrl =
            Play_hlsBaseURL +
            Play_CheckIfIsLiveStartChannel +
            '.m3u8?&token=' +
            encodeURIComponent(Play_tokenResponse.value) +
            '&sig=' +
            Play_tokenResponse.signature +
            '&reassignments_supported=true&playlist_include_framerate=true&allow_source=true&p=' +
            Main_RandomInt();
    } catch (e) {
        console.log('Play_CheckIfIsLiveLink e ' + e);
        Play_CheckIfIsLiveLinkError();
        return;
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', theUrl, true);
    xmlHttp.timeout = Play_loadingDataTimeout;
    xmlHttp.setRequestHeader(Main_clientIdHeader, Main_Headers_Backup[0][1]);

    xmlHttp.ontimeout = function () {};

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) Play_CheckIfIsLiveStartCallback();
            else Play_CheckIfIsLiveLinkError();
        }
    };

    xmlHttp.send(null);
}

//function Play_CheckResume() {
//    if (Play_isOn) Play_Resume();
//    if (PlayVod_isOn) PlayVod_Resume();
//    if (PlayClip_isOn) {
//        PlayClip_shutdownStream();
//        window.clearInterval(PlayClip_streamCheckId);
//    }
//}

function Play_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            Play_shutdownStream();
        } else {
            Play_ClearPlayer();
            Play_offPlayer();
            UserLiveFeed_Hide(true);
            Play_Playing = false;
            ChatLive_Clear();
            window.clearInterval(Play_streamInfoTimerId);
            window.clearInterval(Play_streamCheckId);
        }
    } else {
        Play_isOn = true;
        Play_clearPause();
        if (Play_isOn) {
            Play_showBufferDialog();
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_RestoreFromResume = true;
            if (!Play_LoadLogoSucess) Play_updateStreamInfoStart();
            else Play_updateStreamInfo();
            Play_ResumeAfterOnlineCounter = 0;

            window.clearInterval(Play_ResumeAfterOnlineId);
            if (navigator.onLine) Play_ResumeAfterOnline();
            else Play_ResumeAfterOnlineId = window.setInterval(Play_ResumeAfterOnline, 100);

            window.clearInterval(Play_streamInfoTimerId);
            Play_streamInfoTimerId = window.setInterval(Play_updateStreamInfo, 60000);
        }
    }
}

function Play_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        Play_state = Play_STATE_LOADING_TOKEN;
        Play_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function Play_updateStreamLogo() {
    var theUrl = Main_helix_api + 'users?id=' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(theUrl, Play_loadingInfoDataTimeout, 2, null, Play_updateStreamLogoValues, Play_updateStreamLogoError, false, null, true);
}

function Play_updateStreamLogoValues(response) {
    response = JSON.parse(response);
    if (response.data && response.data.length) {
        response.stream = response.data[0];

        Play_partnerIcon(
            Play_isHost ? Main_values.Play_DisplaynameHost : Main_values.Play_selectedChannelDisplayname,
            response.stream.broadcaster_type === 'partner',
            true,
            Play_Lang
        ); //response.stream.channel.partner
        Main_values.Play_selectedChannelLogo = response.stream.profile_image_url;
        Play_LoadLogoSucess = true;
        Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Play_selectedChannelLogo);
    }
}

function Play_updateStreamLogoError() {
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 500;
        window.setTimeout(function () {
            if (Play_isOn) Play_updateStreamLogoValues();
        }, 750);
    }
    Play_loadingInfoDataTry++;
}

function Play_updateStreamInfoStart() {
    var theUrl = Main_helix_api + 'streams/?user_id=' + Main_values.Play_selectedChannel_id;
    BasexmlHttpGet(
        theUrl,
        Play_loadingInfoDataTimeout,
        2,
        null,
        Play_updateStreamInfoStartValues,
        Play_updateStreamInfoStartError,
        false,
        null,
        true
    );
}

function Play_partnerIcon(name, partner, islive, lang) {
    var div =
        '<div class="partnericon_div"> ' +
        name +
        STR_SPACE +
        STR_SPACE +
        '</div>' +
        (partner ? '<img class="partnericon_img" alt="" src="' + IMG_PARTNER + '">' : '');

    if (islive) {
        div +=
            STR_SPACE +
            STR_SPACE +
            '<div class="partnericon_text" style="background: #' +
            (Main_values.IsRerun ? 'FFFFFF; color: #000000;' : 'E21212;') +
            '">' +
            STR_SPACE +
            STR_SPACE +
            (Main_values.IsRerun ? STR_NOT_LIVE : STR_LIVE) +
            STR_SPACE +
            STR_SPACE +
            '</div>';
    }

    div += '<div class="lang_text" ">' + STR_SPACE + STR_SPACE + lang + '</div>';
    Main_innerHTML('stream_info_name', div);
}

function Play_updateStreamInfoStartValues(response) {
    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Play_selectedChannel_id;
        AddCode_CheckFollow();
    } else Play_hideFollow();

    response = JSON.parse(response);
    if (response.data && response.data.length) {
        response.stream = response.data[0];

        Main_values.IsRerun = Main_is_rerun(response.stream.type);

        Main_innerHTML('stream_info_title', twemoji.parse(response.stream.title, false, true));
        Main_values.Play_gameSelected = response.stream.game_name;
        Play_Lang = ' [' + response.stream.language.toUpperCase() + ']';

        Play_partnerIcon(Play_isHost ? Main_values.Play_DisplaynameHost : Main_values.Play_selectedChannelDisplayname, false, true, Play_Lang); //response.stream.channel.partner

        var playing = Main_values.Play_gameSelected !== '' ? STR_PLAYING + Main_values.Play_gameSelected : '';
        Main_textContent('stream_info_game', playing);

        Main_innerHTML('stream_live_viewers', STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewer_count) + STR_SPACE + STR_VIEWER);

        Play_created = response.stream.started_at;

        Play_controls[Play_controlsChanelCont].setLable(Main_values.Play_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);
    }

    Play_loadingInfoDataTry = 0;
    Play_loadingInfoDataTimeout = 3000;
    Play_updateStreamLogo();
}

function Play_updateStreamInfoStartError() {
    if (Play_loadingInfoDataTry < Play_loadingInfoDataTryMax) {
        Play_loadingInfoDataTimeout += 500;
        window.setTimeout(function () {
            if (Play_isOn) Play_updateStreamInfoStart();
        }, 750);
    }
    Play_loadingInfoDataTry++;
}

function Play_updateStreamInfo() {
    var theUrl = Main_helix_api + 'streams/?user_id=' + Main_values.Play_selectedChannel_id;

    BasexmlHttpGet(theUrl, 3000, 2, null, Play_updateStreamInfoValues, Play_updateStreamInfoError, false, null, true);
}

function Play_updateStreamInfoValues(response) {
    response = JSON.parse(response);
    if (response.data && response.data.length) {
        response.stream = response.data[0];

        Main_innerHTML('stream_info_title', twemoji.parse(response.stream.title, false, true));
        Main_values.Play_gameSelected = response.stream.game_name;
        Main_textContent('stream_info_game', STR_PLAYING + Main_values.Play_gameSelected);

        Main_innerHTML('stream_live_viewers', STR_SPACE + STR_FOR + Main_addCommas(response.stream.viewer_count) + STR_SPACE + STR_VIEWER);

        if (!Play_LoadLogoSucess) {
            Play_loadingInfoDataTry = 0;
            Play_loadingInfoDataTimeout = 3000;
            Play_updateStreamLogo();
        }

        Play_controls[Play_controlsChanelCont].setLable(Main_values.Play_selectedChannelDisplayname);
        Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);
    }
}

function Play_updateStreamInfoError() {
    if (Play_updateStreamInfoErrorTry < Play_loadingInfoDataTryMax) {
        window.setTimeout(function () {
            if (Play_isOn) Play_updateStreamInfo();
            //give a second for it retry as the TV may be on coming from resume
        }, 2500);
        Play_updateStreamInfoErrorTry++;
    } else Play_updateStreamInfoErrorTry = 0;
}

function Play_LoadLogo(ImgObjet, link) {
    ImgObjet.onerror = function () {
        this.onerror = null;
        this.src = IMG_404_LOGO; //img fail to load a predefined logo
        Play_LoadLogoSucess = false;
    };
    ImgObjet.src = link;
}

function Play_loadData(skipProxy) {
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000 + (Play_RestoreFromResume ? 3000 : 0);
    Play_loadDataRequest(skipProxy);
}

var Play_410ERROR = true;
var Play_hlsBaseURL = 'https://usher.ttvnw.net/api/channel/hls/';
function Play_loadDataRequest(skipProxy) {
    try {
        var theUrl;
        var xmlHttp = new XMLHttpRequest();
        var headers;
        var useProxy;

        if (use_proxy && !skipProxy && Play_state === Play_STATE_LOADING_TOKEN) {
            //if at te end of a request the values are different we have a issues
            proxy_fail_counter_checker = proxy_fail_counter;

            useProxy = true;
            Play_state = Play_STATE_LOADING_PLAYLIST;
            headers = proxy_headers ? proxy_headers : [];

            var URL_parameters = Play_base_parameters.replace('%d', Math.random() * 100000);
            var url = proxy_url + Main_values.Play_selectedChannel + (proxy_has_parameter ? '.m3u8' + encodeURIComponent('?' + URL_parameters) : '');

            xmlHttp.open('GET', url, true);

            xmlHttp.timeout = proxy_timeout;
        } else {
            headers = Play_Headers;
            if (Play_state === Play_STATE_LOADING_TOKEN) {
                xmlHttp.open('POST', 'https://gql.twitch.tv/gql', true);
            } else {
                if (!Play_tokenResponse.hasOwnProperty('value') || !Play_tokenResponse.hasOwnProperty('signature')) {
                    Play_410ERROR = true;
                    if (Main_isDebug) console.log('Play_410ERROR ' + Play_410ERROR);
                    Play_loadDataError();
                    return;
                }

                theUrl =
                    Play_hlsBaseURL +
                    Main_values.Play_selectedChannel +
                    '.m3u8?&token=' +
                    encodeURIComponent(Play_tokenResponse.value) +
                    '&sig=' +
                    Play_tokenResponse.signature +
                    '&playlist_include_framerate=true&reassignments_supported=true&allow_source=true&fast_bread=true&cdm=wv&p=' +
                    Main_RandomInt();

                xmlHttp.open('GET', theUrl, true);
            }
            xmlHttp.timeout = Play_loadingDataTimeout;
        }

        if (headers && headers.length) {
            var len = headers.length;

            for (var i = 0; i < len; i++) xmlHttp.setRequestHeader(headers[i][0], headers[i][1]);
        }

        xmlHttp.ontimeout = function () {};

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    Play_loadingDataTry = 0;
                    if (Play_isOn) Play_loadDataSuccess(xmlHttp.responseText);
                    //Play_410ERROR = false;
                } else if (useProxy && PlayHLS_CheckProxyResultFail(xmlHttp.responseText)) {
                    //if proxy fails fall back to normal request
                    Play_state = Play_STATE_LOADING_TOKEN;
                    Play_loadData(true);
                } else if (xmlHttp.status === 0 && Main_startsWith(Play_hlsBaseURL, 'https:')) {
                    //https issue
                    //some devices are triggered with a status 0 when trying to get the playlist URL related to cors
                    //change to http to see if it fixes

                    //problem is that some devices will not allow http connection they demand https

                    Play_hlsBaseURL = Play_hlsBaseURL.replace('https:', 'http:');
                    Play_loadDataRequest(skipProxy);
                } else if (xmlHttp.status === 403 || xmlHttp.status === 404) {
                    //forbidden access
                    //404 = off line
                    //403 = forbidden access
                    //410 = api v3 is gone use v5 bug

                    Play_loadDataErrorFinish(xmlHttp.status === 410, xmlHttp.status === 403);
                } else {
                    if (xmlHttp.status === 410) {
                        Play_410ERROR = true;
                        if (Main_isDebug) console.log('Play_410ERROR ' + Play_410ERROR);
                    }

                    Play_loadDataError();
                }

                Play_loadDataErrorLog(xmlHttp);
            }
        };

        xmlHttp.send(Play_state === Play_STATE_LOADING_TOKEN ? Play_live_token.replace('%x', Main_values.Play_selectedChannel) : null);
    } catch (e) {
        console.log('Play_loadDataRequest e ' + e);
        Play_loadDataError();
    }
}

function PlayHLS_CheckProxyResultFail(responseText) {
    if (Main_A_includes_B(responseText, 'not_found: transcode does not exist')) {
        return false;
    }

    proxy_fail_counter++;

    return true;
}

function Play_loadDataErrorLog(xmlHttp) {
    if (Main_isDebug) {
        console.log(xmlHttp.status);
        console.log(xmlHttp.responseText);
    }
}

function Play_loadDataError() {
    if (Play_isOn && Play_isLive) {
        Play_loadingDataTry++;
        if (Play_loadingDataTry < Play_loadingDataTryMax + (Play_RestoreFromResume ? 7 : 0)) {
            Play_loadingDataTimeout += 250;
            if (Play_RestoreFromResume) window.setTimeout(Play_loadDataRequest, 500);
            else Play_loadDataRequest();
        } else {
            if (Main_IsNotBrowser) Play_loadDataErrorFinish();
            else Play_loadDataSuccessFake();
        }
    }
}

function Play_loadDataErrorFinish(error_410, Isforbiden) {
    if (Play_EndDialogEnter) {
        Play_EndDialogEnter = 0;
        Play_HideBufferDialog();

        document.body.removeEventListener('keydown', Play_handleKeyDown);
        document.body.addEventListener('keydown', Play_EndUpclearCalback, false);
        Play_state = Play_STATE_PLAYING;

        Play_showWarningDialog(error_410 ? STR_410_ERROR : Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

        window.setTimeout(function () {
            Play_HideWarningDialog();
        }, 2000);
        Play_RestorePlayDataValues();
        Main_values.Play_WasPlaying = 0;
        Main_SaveValues();
    } else if (Play_selectedChannel_id_Old !== null) Play_RestorePlayData(error_410);
    else if (Isforbiden) Play_ForbiddenLive();
    else Play_CheckHostStart(error_410);
}

function Play_ForbiddenLive() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_FORBIDDEN);
    window.setTimeout(function () {
        if (Play_isOn) Play_CheckHostStart();
    }, 4000);
}

//Browsers crash trying to get the streams link
var tempQualities = [
    {
        id: 'Auto',
        band: 0,
        codec: 'avc',
        resolution: 'auto',
        url: 'https://auto'
    },
    {
        id: '1080p60 | source ',
        band: '| 10.00Mbps',
        codec: ' | avc',
        resolution: '1920x1080',
        url: 'https://souce'
    },
    {
        id: '720p60',
        band: ' | 5.00Mbps',
        codec: ' | avc',
        resolution: '1920x1080',
        url: 'https://720p60'
    },
    {
        id: '720p',
        band: ' | 2.50Mbps',
        codec: ' | avc',
        resolution: '1280x720',
        url: 'https://720'
    },
    {
        id: '480p',
        band: ' | 2.50Mbps',
        codec: ' | avc',
        resolution: '640x480',
        url: 'https://480'
    },
    {
        id: '320p',
        band: ' | 2.50Mbps',
        codec: ' | avc',
        resolution: '480x320',
        url: 'https://320'
    }
];

function Play_loadDataSuccessFake() {
    Play_qualities = tempQualities;
    Play_state = Play_STATE_PLAYING;
    if (Play_isOn) Play_qualityChanged();
}

function Play_loadDataSuccess(responseText) {
    if (Play_state === Play_STATE_LOADING_TOKEN) {
        try {
            Play_tokenResponse = JSON.parse(responseText).data.streamPlaybackAccessToken;
        } catch (e) {
            Play_tokenResponse = null;
            console.log('Play_loadDataSuccess e ' + e);
        }

        Play_state = Play_STATE_LOADING_PLAYLIST;

        Play_loadData();
    } else if (Play_state === Play_STATE_LOADING_PLAYLIST) {
        UserLiveFeed_Hide(true);

        if (Play_EndDialogEnter === 2) PlayVod_PreshutdownStream(true);
        else if (Play_EndDialogEnter === 3) PlayClip_PreshutdownStream(false);

        Play_EndDialogEnter = 0;

        Play_EndSet(1);
        UserLiveFeed_SetFeedPicText();
        Play_HideEndDialog();

        Play_playlistResponse = responseText;
        Play_qualities = Play_extractQualities(Play_playlistResponse);
        Play_state = Play_STATE_PLAYING;
        if (Play_isOn) Play_qualityChanged();

        UserLiveFeed_PreventHide = false;
        ChatLive_Playing = true;
    }
}

function Play_extractQualities(input) {
    var Band,
        codec,
        result = [],
        TempId = '',
        tempCount = 1,
        Resolution;

    var streams = Play_extractStreamDeclarations(input);

    for (var i = 0; i < streams.length; i++) {
        TempId = streams[i].split('NAME="')[1].split('"')[0];
        Band = Play_extractBand(streams[i].split('BANDWIDTH=')[1].split(',')[0]);
        codec = Play_extractCodec(streams[i].split('CODECS="')[1].split('.')[0]);
        Resolution = streams[i].split('RESOLUTION=')[1].split(',')[0];

        if (!result.length) {
            if (TempId.indexOf('ource') === -1) TempId = TempId + ' | source';
            else TempId = TempId.replace('(', ' | ').replace(')', '');
            result.push({
                id: TempId,
                band: Band,
                codec: codec,
                resolution: Resolution,
                url: streams[i].split('\n')[2]
            });
        } else if (result[i - tempCount].id !== TempId && result[i - tempCount].id !== TempId + ' | source') {
            result.push({
                id: TempId,
                band: Band,
                codec: codec,
                resolution: Resolution,
                url: streams[i].split('\n')[2]
            });
        } else tempCount++;
    }

    return result;
}

function Play_extractBand(input) {
    input = parseInt(input);
    return input > 0 ? ' | ' + parseFloat(input / 1000000).toFixed(2) + 'Mbps' : '';
}

function Play_extractCodec(input) {
    if (input.indexOf('avc') !== -1) return ' | avc';
    else if (input.indexOf('vp9') !== -1) return ' | vp9';
    else if (input.indexOf('mp4') !== -1) return ' | mp4';
    return '';
}

function Play_extractStreamDeclarations(input) {
    var result = [];

    var myRegexp = /#EXT-X-MEDIA:(.)*\n#EXT-X-STREAM-INF:(.)*\n(.)*/g;
    var marray;
    while ((marray = myRegexp.exec(input))) result.push(marray[0]);

    return result;
}

function Play_qualityChanged() {
    window.clearInterval(Play_streamCheckId);
    Play_qualityIndex = 0;
    Play_playingUrl = Play_qualities[0].url;

    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) {
            //make shore to set a value before break out
            Play_qualityIndex = i;
            Play_playingUrl = Play_qualities[i].url;
        }
    }

    Play_quality = Play_qualities[Play_qualityIndex].id;
    Play_qualityPlaying = Play_quality;

    Play_SetHtmlQuality('stream_quality', true);

    Play_state = Play_STATE_PLAYING;
    if (Main_isDebug) console.log('Play_qualityChanged before Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');

    Play_BufferPercentage = 0;
    Play_onPlayerCounter = 0;
    if (Play_isOn) Play_onPlayer();
    //Play_PannelEndStart(1);
}

var Play_listener = {
    onbufferingstart: function () {
        Play_showBufferDialog();
        Play_bufferingcomplete = false;
        Play_RestoreFromResume = false;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        // sync chat and stream
        if (!Main_isReleased) console.log('onbufferingstart:', 'date: ' + new Date());
    },
    onbufferingcomplete: function () {
        Play_HideBufferDialog();
        Play_bufferingcomplete = true;
        Play_RestoreFromResume = false;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        if (!Main_isReleased) console.log('onbufferingcomplete:', 'date: ' + new Date());
    },
    onbufferingprogress: function (percent) {
        if (percent < 5) Play_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        Play_PlayerCheckQualityChanged = true;
        //percent has a -2 offset and goes up to 98
        if (percent < 98) {
            Play_BufferPercentage = percent;
            if (!Play_BufferDialogVisible()) Play_showBufferDialog();
        } else {
            Play_BufferPercentage = 0;
            Play_HideBufferDialog();
            Play_bufferingcomplete = true;
            if (!Main_isReleased) console.log('onbufferingprogress > 98:', 'date: ' + new Date());
        }
        Play_RestoreFromResume = false;
    },
    oncurrentplaytime: function (currentTime) {
        if (Play_currentTime !== currentTime) Play_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function () {
        Play_CheckHostStart();
        if (!Main_isReleased) console.log('onstreamcompleted:', 'date: ' + new Date());
    },
    onerror: function (eventType) {
        if (!Main_isReleased) console.log('onerror:', 'date: ' + new Date() + ' eventType: ' + eventType);
        if (eventType === 'PLAYER_ERROR_CONNECTION_FAILED' || eventType === 'PLAYER_ERROR_INVALID_URI') Play_CheckHostStart();
    }
};

function Play_SetHtmlQuality(element) {
    if (!Play_qualities[Play_qualityIndex] || !Play_qualities[Play_qualityIndex].hasOwnProperty('id')) return;

    Play_quality = Play_qualities[Play_qualityIndex].id;

    var quality_string = '';

    if (Play_quality.indexOf('source') !== -1) quality_string = Play_quality.replace('source', STR_SOURCE);
    else quality_string = Play_quality;

    quality_string += Play_qualities[Play_qualityIndex].band + Play_qualities[Play_qualityIndex].codec;

    Main_textContent(element, quality_string);
}

function Play_onPlayer() {
    Play_showBufferDialog();
    if (!Main_isReleased) {
        console.log('Play_onPlayer:', 'date: ' + new Date());
        console.log('Play_onPlayer:', '\n' + '\n"' + Play_playingUrl + '"\n');
    }

    if (Main_IsNotBrowser) {
        Play_loadChat();

        try {
            Play_avplay.stop();
            Play_avplay.close();
            Play_avplay.open(Play_playingUrl);
        } catch (e) {
            console.log('Play_onPlayer open ' + e);
        }

        Play_avplay.setBufferingParam('PLAYER_BUFFER_FOR_PLAY', 'PLAYER_BUFFER_SIZE_IN_SECOND', Play_Buffer);
        Play_avplay.setBufferingParam('PLAYER_BUFFER_FOR_RESUME', 'PLAYER_BUFFER_SIZE_IN_SECOND', Play_Buffer);

        //Old 4k check no longer used because causes problem
        //leave it here to be recheck on a future 4k streams from twitch
        //if (Main_Is4k && !Play_4K_ModeEnable) {
        //    Play_avplay.setStreamingProperty("SET_MODE_4K", "TRUE");
        //    Play_4K_ModeEnable = true;
        //}

        Play_SetFullScreen(Play_isFullScreen);
        Play_avplay.setListener(Play_listener);
        Play_offsettime = Play_oldcurrentTime;

        try {
            //Disabled closed caption as ins't properly supported by all devices
            Play_avplay.setSilentSubtitle(true);
        } catch (e) {
            console.log('PlayVod_onPlayer open ' + e);
        }

        if (!Main_isReleased) console.log('Before Play_avplay.prepareAsync:', 'date: ' + new Date());

        //Use prepareAsync as prepare() only can freeze up the app
        Play_avplay.prepareAsync(
            function () {
                //successCallback

                if (!Main_isReleased) console.log('Play_avplay.prepareAsync Live OK:', 'date: ' + new Date());

                try {
                    //GET_LIVE_DURATION not supported by all TVs
                    if (Play_LowLatency) Play_avplay.seekTo(Play_avplay.getStreamingProperty('GET_LIVE_DURATION').split('|')[1] - 3000);
                } catch (e) {}

                Play_avplay.play();
                Play_Playing = true;
                if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

                Play_PlayerCheckCount = 0;
                Play_PlayerCheckTimer = 1 + Play_Buffer * 2;
                Play_PlayerCheckQualityChanged = false;
                window.clearInterval(Play_streamCheckId);
                Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
            },
            function () {
                //errorCallback
                if (!Main_isReleased) console.log('Play_avplay.prepareAsync Live NOK:', 'date: ' + new Date());
                Play_onPlayerCounter++;
                if (Play_onPlayerCounter < 5) Play_onPlayer();
                else {
                    if (!Main_isReleased) console.log('Play_avplay.prepareAsync Live fail too mutch exit:', 'date: ' + new Date());
                    Play_EndStart(false, 1);
                }
            }
        );
    } else Play_loadChat();
}

function Play_loadChat() {
    if (Main_values.Play_ChatForceDisable) {
        Chat_Disable();
        return;
    }

    ChatLive_Init();
}

function Play_PlayerCheck() {
    if (Play_PlayerTime === Play_currentTime && Play_isIdleOrPlaying()) {
        Play_PlayerCheckCount++;
        if (Play_PlayerCheckCount > Play_PlayerCheckTimer) {
            //Don't change the first time only retry, and don't change if in Auto mode
            if (
                Play_PlayerCheckQualityChanged &&
                Play_PlayerCheckRun &&
                Play_qualityIndex < Play_getQualitiesCount() - 1 &&
                Play_qualityPlaying.indexOf('Auto') === -1
            )
                Play_qualityIndex++;
            else if (!Play_PlayerCheckQualityChanged && Play_PlayerCheckRun) Play_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 1);
            else if (Play_PlayerCheckCounter > 1) Play_CheckConnection(Play_PlayerCheckCounter, 1, Play_DropOneQuality);
            else {
                Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
                Play_qualityChanged();
                Play_PlayerCheckRun = true;
            }
        }
    } else {
        Play_PlayerCheckCounter = 0;
        Play_PlayerCheckCount = 0;
        Play_PlayerCheckRun = false;
    }
    Play_PlayerTime = Play_currentTime;
}

// If idle or playing, the media is be played or process to
// So we use PlayerCheck to avaluate if we are staled fro too long or not and drop the quality
function Play_isIdleOrPlaying() {
    if (Main_IsNotBrowser) {
        var state = Play_avplay.getState();
        return !Play_isEndDialogVisible() && (state === 'IDLE' || state === 'PLAYING');
    }
    return false;
}

function Play_DropOneQuality(ConnectionDrop) {
    if (!ConnectionDrop) {
        if (Play_qualityIndex < Play_getQualitiesCount() - 1) Play_qualityIndex++;
        else {
            Play_CheckHostStart();
            return;
        }
    }

    Play_PlayerCheckCounter = 0;
    Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
    Play_qualityChanged();
    Play_PlayerCheckRun = true;
}

function Play_EndStart(hosting, PlayVodClip) {
    Main_values.Play_isHost = hosting;
    Play_EndSet(PlayVodClip);
    Play_PlayEndStart(PlayVodClip);
}

// Check if connection with twitch server is OK if not for 15s drop one quality
function Play_CheckConnection(counter, PlayVodClip, DropOneQuality) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = 1000;
    xmlHttp.open('GET', 'https://static-cdn.jtvnw.net/jtv-static/404_preview-10x10.png?' + Math.random(), true);

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (Play_isNotplaying()) DropOneQuality(counter > 2);
            } else if (counter > 12) Play_EndStart(false, PlayVodClip);
        }
    };

    xmlHttp.send(null);
}

function Play_isNotplaying() {
    if (Main_IsNotBrowser) return Play_avplay.getState() !== 'PLAYING';
    return false;
}

function Play_clock() {
    var clock = Main_getclock();
    Main_textContent('stream_clock', clock);
    Main_textContent('label_clock', clock);
}

function Play_lessthanten(time) {
    return time < 10 ? '0' + time : time;
}

function Play_timeS(time) {
    var seconds, minutes, hours;
    time += Play_offsettimeMinus / 1000;
    time = Math.round(Math.max(0, time));

    seconds = Play_lessthanten(parseInt(time) % 60);

    time = Math.floor(time / 60);
    minutes = Play_lessthanten(time % 60);

    time = Math.floor(time / 60);
    hours = Play_lessthanten(time);

    //final time 00:00 or 00:00:00
    return !time ? minutes + ':' + seconds : hours + ':' + minutes + ':' + seconds;
}

function Play_timeHMS(time) {
    var hourIndex = time.indexOf('h');
    var minuteIndex = time.indexOf('m');
    var secondIndex = time.indexOf('s');

    var hour = time.substring(0, hourIndex);
    var minute = time.substring(hourIndex + 1, minuteIndex);
    var second = time.substring(minuteIndex + 1, secondIndex);

    var hourInt = hour ? parseInt(hour) * 3600 : 0;
    var minuteInt = minute ? parseInt(minute) * 60 : 0;
    var secondInt = second ? parseInt(second) : 0;

    return hourInt + minuteInt + secondInt;
}

function Play_timeMs(time) {
    if (time < 0 && !Play_offsettimeMinus) Play_offsettimeMinus = time * -1;
    time += Play_offsettimeMinus;

    return Play_timeS(parseInt(time / 1000));
}

function Play_streamLiveAt(time) {
    //time in '2017-10-27T13:27:27Z'
    return Play_timeMs(new Date().getTime() - new Date(time).getTime());
}

function Play_timeDay(time) {
    var minutes, hours, days;

    time = Math.floor(parseInt(time / 1000) / 60);
    minutes = time % 60;

    time = Math.floor(time / 60);
    hours = time % 24;

    days = Math.floor(time / 24);

    //final time 0m or 23h 59m or 1d 23h 59m
    return (days ? days + 'd ' : '') + (hours ? hours + 'h ' : '') + minutes + 'm';
}

function Play_shutdownStream() {
    if (Play_isOn) {
        Play_PreshutdownStream(true);
        Play_qualities = [];
        Main_values.Play_WasPlaying = 0;
        Play_exitMain();
    }
}

function Play_PreshutdownStream(closePlayer) {
    if (Main_IsNotBrowser && closePlayer) Play_offPlayer();
    if (closePlayer) Play_isOn = false;
    if (!Play_isEndDialogVisible() || closePlayer) UserLiveFeed_Hide(true);

    Play_ClearPlay(closePlayer);
    Play_ClearPlayer();
    Main_values.Play_selectedChannel_id = '';
}

function Play_offPlayer() {
    if (Main_IsNotBrowser) {
        try {
            Play_avplay.stop();
            Play_avplay.close();
        } catch (e) {
            console.log('Play_offPlayer ' + e);
        }
    }
}

function Play_exitMain() {
    if (AddUser_UserIsSet()) {
        AddCode_IsFollowing = false;
        Play_setFollow();
    } else Play_hideFollow();

    UserLiveFeed_PreventHide = false;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_ReStartScreens();
}

function Play_updateCurrentTime(currentTime) {
    Play_currentTime = currentTime;

    if (!Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (Play_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    Play_oldcurrentTime = currentTime + Play_offsettime - 14000; // 14s buffer size from twitch
    if (Play_isPanelShown()) Play_RefreshWatchingtime();
}

function Play_ClearPlayer() {
    Play_hidePanel();
    Play_clearPause();
    Play_HideWarningDialog();
    if (!Play_EndDialogEnter) Play_HideEndDialog();
    Play_IncrementView = '';

    if (Play_qualities[0] && Play_qualityIndex === Play_getQualitiesCount() - 1) {
        if (Play_qualities[0].hasOwnProperty('id')) {
            Play_quality = Play_qualities[0].id;
            Play_qualityPlaying = Play_quality;
        }
    }

    if (PlayVod_qualities[0] && PlayVod_qualityIndex === PlayVod_getQualitiesCount() - 1) {
        if (PlayVod_qualities[0].hasOwnProperty('id')) {
            PlayVod_quality = PlayVod_qualities[0].id;
            PlayVod_qualityPlaying = PlayVod_quality;
        }
    }

    if (PlayClip_qualities[0] && PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        if (PlayClip_qualities[0].hasOwnProperty('id')) {
            PlayClip_quality = PlayClip_qualities[0].id;
            PlayClip_qualityPlaying = PlayClip_quality;
        }
    }
}

function Play_ResetProxy() {
    Play_A_Control(Settings_get_enabled(), Play_controlsProxy);
}

function Play_A_Control(value, control) {
    //After setting we only reset this if the app is close/re opened
    Play_controls[control].defaultValue = value;
    if (Play_controls[control].bottomArrows) Play_controls[control].bottomArrows();
    Play_controls[control].setLable();
}

function Play_ClearPlay(clearChat) {
    Play_Playing = false;
    document.body.removeEventListener('keydown', Play_handleKeyDown);
    document.removeEventListener('visibilitychange', Play_Resume);
    if (clearChat) ChatLive_Clear();
    Play_offsettime = 0;
    Play_oldcurrentTime = 0;
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    Play_IsWarning = false;
}

function Play_hideFollow() {
    Play_controls[Play_controlsFollow].setLable(STR_NOKEY);
    AddCode_IsFollowing = false;
}

function Play_showBufferDialog() {
    Main_ShowElement('dialog_loading_play');
}

function Play_HideBufferDialog() {
    Main_HideElement('dialog_loading_play');
}

function Play_BufferDialogVisible() {
    return Main_isElementShowing('dialog_loading_play');
}

function Play_showWarningDialog(text) {
    Main_innerHTML('dialog_warning_play_text', text);
    Main_ShowElement('dialog_warning_play');
}

function Play_HideWarningDialog() {
    Main_HideElement('dialog_warning_play');
}

function Play_WarningDialogVisible() {
    return Main_isElementShowing('dialog_warning_play');
}

function Play_showExitDialog() {
    if (!Play_ExitDialogVisible()) {
        Main_ShowElement('play_dialog_exit');
        Play_exitID = window.setTimeout(Play_showExitDialog, 3000);
    } else {
        Play_CleanHideExit();
    }
}

function Play_CleanHideExit() {
    window.clearTimeout(Play_exitID);
    Main_HideElement('play_dialog_exit');
}

function Play_ExitDialogVisible() {
    return Main_isElementShowing('play_dialog_exit');
}

// For some reason clearTimeout fail some time when two are set in a sequence on the same function
function Play_clearPauseEnd() {
    window.clearTimeout(Play_pauseEndID);
}

function Play_clearPauseStart() {
    window.clearTimeout(Play_pauseStartID);
}

function Play_clearPause() {
    Play_clearPauseEnd();
    Play_clearPauseStart();
    ChatLive_Playing = true;
}

function Play_isPanelShown() {
    return document.getElementById('scene_channel_panel').style.opacity === '1';
}

function Play_hidePanel() {
    //return;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    Play_quality = Play_qualityPlaying;
    Play_ResetProxy();
}

function Play_showPanel() {
    PlayVod_IconsBottonResetFocus();
    Play_qualityIndexReset();
    Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
    Play_SetHtmlQuality('stream_quality', true);
    Play_RefreshWatchingtime();
    Play_clock();
    Play_UpdateVideoStatus();
    Play_CleanHideExit();
    Play_ForceShowPannel();
    Play_clearHidePanel();
    Play_setHidePanel();
}

function Play_UpdateVideoStatus() {
    Main_innerHTML('stream_status', Play_UpdateVideoStatusGetProxy());
}

function Play_UpdateVideoStatusGetProxy() {
    if (!Play_isOn) {
        return '';
    }
    var proxyString = STR_BR + PROXY_SERVICE;

    if (!use_proxy) {
        return proxyString + PROXY_SERVICE_OFF;
    }

    if (proxy_fail_counter > proxy_fail_counter_checker) {
        return proxyString + PROXY_SERVICE_FAIL.replace('%x', proxy_fail_counter);
    }

    return proxyString + PROXY_SERVICE_STATUS;
}

function Play_ForceShowPannel() {
    document.getElementById('scene_channel_panel').style.opacity = '1';
    Main_ShowElement('playsideinfo');
}

function Play_ForceHidePannel() {
    document.getElementById('scene_channel_panel').style.opacity = '0';
    Main_HideElement('playsideinfo');
}

function Play_RefreshWatchingtime() {
    Main_innerHTML('stream_watching_time', ',' + STR_SPACE + STR_SPACE + STR_WATCHING + Play_timeMs(Play_oldcurrentTime));

    Main_innerHTML('stream_live_time', STR_SINCE + ('00:00'.indexOf(Play_created) !== -1 ? '00:00' : Play_streamLiveAt(Play_created)));
}

function Play_clearHidePanel() {
    window.clearTimeout(Play_PanelHideID);
    PlayVod_ProgressBaroffset = 0;
}

function Play_setHidePanel() {
    Play_PanelHideID = window.setTimeout(Play_hidePanel, 5000);
}

function Play_showChat() {
    Play_ChatPosition();
    Play_ChatBackgroundChange(false);
    Main_ShowElement('chat_container0');

    Play_controls[Play_controlsChat].setLable();
}

function Play_hideChat() {
    Main_HideElement('chat_container0');
    Play_controls[Play_controlsChat].setLable();
}

function Play_isChatShown() {
    return Main_isElementShowing('chat_container0');
}

function Play_getQualitiesCount() {
    return Play_qualities.length;
}

function Play_ChatSize(showDialog) {
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) Play_ChatSizeValue = Play_MaxChatSizeValue;
    Play_chat_container.style.height = Play_ChatSizeVal[Play_ChatSizeValue].containerHeight + '%';
    document.getElementById('play_chat_dialog').style.marginTop = Play_ChatSizeVal[Play_ChatSizeValue].dialogTop + '%';
    Play_ChatPosition();

    if (showDialog) Play_showChatBackgroundDialog(STR_SIZE + Play_ChatSizeVal[Play_ChatSizeValue].percentage);

    window.setTimeout(function () {
        if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    }, 500);
    Main_setItem('ChatSizeValue', Play_ChatSizeValue);
}

function Play_ChatBackgroundChange(showDialog) {
    Play_chat_container.style.backgroundColor = 'rgba(0, 0, 0, ' + Play_ChatBackground + ')';
    if (showDialog) Play_showChatBackgroundDialog(STR_BRIGHTNESS + (Play_ChatBackground * 100).toFixed(0) + '%');
}

function Play_ChatPositionConvert(up) {
    if (up) {
        Play_ChatPositionConvertBefore = Play_ChatPositions;
        Play_ChatPositions = Play_ChatPositionsBefore[Play_ChatPositions];
    } else Play_ChatPositions = Play_ChatPositionsAfter[Play_ChatPositions][Play_ChatPositionConvertBefore];
}

function Play_ChatPosition() {
    var bool = Play_ChatSizeValue === Play_MaxChatSizeValue;

    if (Play_ChatPositions < 0) Play_ChatPositions = bool ? 2 : 7;
    else if (Play_ChatPositions > (bool ? 2 : 7)) Play_ChatPositions = 0;

    Play_chat_container.style.top =
        (bool ? 0.2 : Play_ChatPositionVal[Play_ChatPositions].top + Play_ChatPositionVal[Play_ChatPositions].sizeOffset[Play_ChatSizeValue]) + '%';

    Play_chat_container.style.left = Play_ChatPositionVal[Play_ChatPositions + (bool ? 2 : 0)].left + '%';

    //if (Chat_div) Chat_div.scrollTop = Chat_div.scrollHeight;
    Main_setItem('ChatPositionsValue', Play_ChatPositions);
}

function Play_showChatBackgroundDialog(DialogText) {
    window.clearTimeout(Play_ChatBackgroundID);
    Main_textContent('play_chat_dialog_text', DialogText);
    Main_ShowElement('play_chat_dialog');
    Play_ChatBackgroundID = window.setTimeout(Play_hideChatBackgroundDialog, 1000);
}

function Play_hideChatBackgroundDialog() {
    Main_HideElement('play_chat_dialog');
}

function Play_KeyPause(PlayVodClip) {
    if (Play_BufferDialogVisible()) return;

    if (Play_isNotplaying()) {
        if (Main_IsNotBrowser) {
            try {
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
                Play_avplay.play();
            } catch (e) {
                console.log('Play_avplay.pause: ' + e);
                return;
            }
        }
        Play_clearPause();
        ChatLive_MessagesRunAfterPause();
        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i></div>');

        if (PlayVodClip === 1) {
            if (Play_isPanelShown()) Play_hidePanel();
            window.clearInterval(Play_streamCheckId);
            Play_streamCheckId = window.setInterval(Play_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 2) {
            if (Play_isPanelShown()) PlayVod_hidePanel();
            window.clearInterval(PlayVod_streamCheckId);
            PlayVod_streamCheckId = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);
        } else if (PlayVodClip === 3) {
            if (Play_isPanelShown()) PlayClip_hidePanel();
            window.clearInterval(PlayClip_streamCheckId);
            PlayClip_streamCheckId = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
        }
    } else {
        if (Main_IsNotBrowser) {
            try {
                webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
                Play_avplay.pause();
            } catch (e) {
                console.log('Play_avplay.pause: ' + e);
                return;
            }
        }
        ChatLive_Playing = false;

        window.clearInterval(Play_streamCheckId);
        window.clearInterval(PlayVod_streamCheckId);
        window.clearInterval(PlayClip_streamCheckId);

        Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-play-1"></i></div>');
    }
}

function Play_IconsResetFocus() {
    Play_IconsRemoveFocus();
    Play_Panelcounter = Play_controlsDefault;
    Play_IconsAddFocus();
}

function Play_PrepareshowEndDialog(PlayVodClip) {
    Play_state = -1;
    PlayVod_state = -1;
    PlayClip_state = -1;
    Play_hideChat();
    Play_hidePanel();
    PlayClip_hidePanel();
    PlayVod_hidePanel();
    if (!Play_IsWarning) Play_HideWarningDialog();
    Play_HideBufferDialog();
    Play_CleanHideExit();
    if (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced)) {
        Play_EndIconsRemoveFocus();
        Play_Endcounter = -1;
    }
    Play_EndIconsAddFocus();
}

function Play_showEndDialog() {
    Main_ShowElement('dialog_end_stream');
    UserLiveFeed_SetHoldUp();
    Play_EndFocus = true;
    UserLiveFeed_PreventHide = true;
    UserLiveFeed_clearHideFeed();
    UserLiveFeed_ShowFeed(true);
    Main_values.Play_WasPlaying = 0;
    Main_SaveValues();
}

function Play_HideEndDialog() {
    Main_HideElement('dialog_end_stream');
    Play_EndTextClear();
    Play_EndIconsResetFocus();
}

function Play_isEndDialogVisible() {
    return Main_isElementShowing('dialog_end_stream');
}

function Play_EndIconsResetFocus() {
    Play_EndIconsRemoveFocus();
    Play_Endcounter = 0;
    Play_EndIconsAddFocus();
}

function Play_EndIconsAddFocus() {
    Main_AddClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndIconsRemoveFocus() {
    Main_RemoveClass('dialog_end_' + Play_Endcounter, 'dialog_end_icons_focus');
}

function Play_EndText(PlayVodClip) {
    if (PlayVodClip === 1) Play_DialogEndText = Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE;
    else if (PlayVodClip === 2) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_VIDEO;
    else if (PlayVodClip === 3) Play_DialogEndText = Main_values.Main_selectedChannelDisplayname + STR_CLIP;

    if (Play_EndTextCounter === -2) {
        //disable
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;
        Play_EndTextClear();
        return;
    }

    Main_innerHTML(
        'dialog_end_stream_text',
        Play_DialogEndText +
            STR_IS_OFFLINE +
            STR_BR +
            (PlayVodClip === 3 && PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced) ? STR_PLAY_NEXT_IN : STR_STREAM_END) +
            Play_EndTextCounter +
            '...'
    );

    if (Play_isEndDialogVisible()) {
        Play_EndTextCounter--;
        Play_state = Play_STATE_PLAYING;
        PlayVod_state = Play_STATE_PLAYING;
        PlayClip_state = PlayClip_STATE_PLAYING;

        if (Play_EndTextCounter === -1) {
            Main_innerHTML('dialog_end_stream_text', Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END + '0...');
            Play_CleanHideExit();
            Play_hideChat();

            if (PlayVodClip === 1) Play_shutdownStream();
            else if (PlayVodClip === 2) PlayVod_shutdownStream();
            else if (PlayVodClip === 3) {
                if (PlayClip_HasNext && (PlayClip_All || PlayClip_All_Forced) && !document.hidden) PlayClip_PlayNext();
                else PlayClip_shutdownStream();
            }
        } else {
            Play_EndTextID = window.setTimeout(function () {
                Play_EndText(PlayVodClip);
            }, 1000);
        }
    } else {
        Play_EndTextID = window.setTimeout(function () {
            Play_EndText(PlayVodClip);
        }, 50);
    }
}

function Play_EndTextClear() {
    window.clearTimeout(Play_EndTextID);
    Main_innerHTML('dialog_end_stream_text', Play_DialogEndText + STR_IS_OFFLINE + STR_BR + STR_STREAM_END_EXIT);
}

function Play_EndDialogPressed(PlayVodClip) {
    var canhide = true;
    if (Play_Endcounter === -1 && PlayClip_HasNext) PlayClip_PlayNext();
    else if (!Play_Endcounter) {
        if (PlayVodClip === 2) {
            if (!PlayVod_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function () {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayVod_replay = true;
                PlayVod_PlayerCheckQualityChanged = false;
                PlayVod_Start();
                Play_clearPause();
                PlayVod_currentTime = 0;
                Chat_offset = 0;
                Chat_Init();
            }
        } else if (PlayVodClip === 3) {
            if (!PlayClip_qualities.length) {
                canhide = false;
                Play_showWarningDialog(STR_CLIP_FAIL);
                window.setTimeout(function () {
                    Play_HideWarningDialog();
                }, 2000);
            } else {
                PlayClip_replay = true;
                PlayClip_PlayerCheckQualityChanged = false;
                PlayClip_replay = true;
                PlayClip_Start();
                Play_clearPause();
            }
        }
    } else if (Play_Endcounter === 1) {
        if (Main_values.Play_isHost) {
            Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname + STR_USER_HOSTING;
            Main_values.Play_selectedChannel = Play_TargetHost.login;
            Main_values.Play_selectedChannelDisplayname = Play_TargetHost.displayName;
            Main_values.Play_DisplaynameHost = Main_values.Play_DisplaynameHost + Main_values.Play_selectedChannelDisplayname;
            Play_PreshutdownStream(false);
            document.body.addEventListener('keydown', Play_handleKeyDown, false);

            Main_values.Play_selectedChannel_id = Play_TargetHost.id;
            Main_ready(Play_Start);
        } else {
            PlayClip_OpenVod();
            if (!PlayClip_HasVOD) canhide = false;
        }
    } else if (Play_Endcounter === 2) Play_OpenChannel(PlayVodClip);
    else if (Play_Endcounter === 3) {
        Play_OpenGame(PlayVodClip);
        if (Main_values.Play_gameSelected === '') canhide = false;
    }

    if (canhide) {
        Play_HideEndDialog();
        UserLiveFeed_Hide(true);
        UserLiveFeed_PreventHide = false;
    }
    Play_EndDialogEnter = 0;
}

function Play_EndSet(PlayVodClip) {
    if (!PlayVodClip) {
        // Play is hosting
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 1;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent('dialog_end_vod_text', STR_OPEN_HOST);

        Play_EndTextsReset();
        Main_innerHTML('end_channel_name_text', Main_values.Play_selectedChannelDisplayname);
        Main_innerHTML(
            'end_vod_title_text',
            Main_values.Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.displayName
        );
    } else if (PlayVodClip === 1) {
        // play
        Play_EndIconsRemoveFocus();
        Play_Endcounter = 2;
        Play_EndIconsAddFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'none';
        document.getElementById('dialog_end_1').style.display = 'none';

        Play_EndTextsReset();
        Main_innerHTML('end_channel_name_text', Main_values.Play_selectedChannelDisplayname);
    } else if (PlayVodClip === 2) {
        // vod
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'none';

        Main_innerHTML('end_replay_name_text', Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML('end_replay_title_text', ChannelVod_title);

        Main_textContent('end_vod_name_text', '');
        Main_textContent('end_vod_title_text', '');

        Main_innerHTML('end_channel_name_text', Main_values.Main_selectedChannelDisplayname);
    } else if (PlayVodClip === 3) {
        // clip
        Play_EndIconsResetFocus();
        document.getElementById('dialog_end_-1').style.display = PlayClip_HasNext ? 'inline-block' : 'none';
        document.getElementById('dialog_end_0').style.display = 'inline-block';
        document.getElementById('dialog_end_1').style.display = 'inline-block';
        Main_textContent('dialog_end_vod_text', PlayClip_HasVOD ? STR_OPEN_BROADCAST : STR_NO_BROADCAST);

        Main_innerHTML('end_replay_name_text', Main_values.Main_selectedChannelDisplayname);
        Main_innerHTML('end_replay_title_text', ChannelClip_title);

        Main_innerHTML('end_vod_name_text', Main_values.Main_selectedChannelDisplayname);

        Main_innerHTML('end_channel_name_text', Main_values.Main_selectedChannelDisplayname);
    }
    Main_textContent('end_game_name_text', Main_values.Play_gameSelected);
}

function Play_EndTextsReset() {
    Main_textContent('end_replay_name_text', '');
    Main_textContent('end_replay_title_text', '');
    Main_textContent('end_vod_name_text', '');
    Main_textContent('end_vod_title_text', '');
}

function Play_OpenChannel(PlayVodClip) {
    if (!Main_values.Main_BeforeChannelisSet && Main_values.Main_Go !== Main_ChannelVod && Main_values.Main_Go !== Main_ChannelClip) {
        Main_values.Main_BeforeChannel =
            Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_aGame ? Main_values.Main_BeforeAgame : Main_values.Main_Go;
        Main_values.Main_BeforeChannelisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_ChannelContent;

    if (PlayVodClip === 1) {
        Main_values.Main_selectedChannel_id = Main_values.Play_selectedChannel_id;
        Main_values.Main_selectedChannel = Main_values.Play_selectedChannel;
        Main_values.Main_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname;
        ChannelContent_UserChannels = AddCode_IsFollowing;
        Play_hideChat();
        Play_shutdownStream();
    } else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

//TODO improve this
function Play_OpenSearch(PlayVodClip) {
    if (PlayVodClip === 1) {
        Play_hideChat();
        Play_PreshutdownStream(true);
    } else if (PlayVodClip === 2) PlayVod_PreshutdownStream();
    else if (PlayVodClip === 3) PlayClip_PreshutdownStream();

    Main_values.Play_WasPlaying = 0;
    PlayVod_ProgresBarrUpdate(0, 0);
    Main_ShowElement('scene1');
    Main_HideElement('scene2');
    Main_updateclock();
    Main_OpenSearch();
}

function Play_OpenGame(PlayVodClip) {
    if (Main_values.Play_gameSelected === '') {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_GAME);
        window.setTimeout(function () {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
        return;
    }

    if (!Main_values.Main_BeforeAgameisSet && Main_values.Main_Go !== Main_AGameVod && Main_values.Main_Go !== Main_AGameClip) {
        Main_values.Main_BeforeAgame =
            Main_values.Main_BeforeChannelisSet &&
            Main_values.Main_Go !== Main_ChannelContent &&
            Main_values.Main_Go !== Main_ChannelVod &&
            Main_values.Main_Go !== Main_ChannelClip
                ? Main_values.Main_BeforeChannel
                : Main_values.Main_Go;
        Main_values.Main_BeforeAgameisSet = true;
    }

    Main_ExitCurrent(Main_values.Main_Go);
    Main_values.Main_Go = Main_aGame;

    Main_values.Main_gameSelected = Main_values.Play_gameSelected;
    Main_values.Main_gameSelected_id = Main_values.Play_gameSelected_id;

    Play_hideChat();
    if (PlayVodClip === 1) Play_shutdownStream();
    else if (PlayVodClip === 2) PlayVod_shutdownStream();
    else if (PlayVodClip === 3) PlayClip_shutdownStream();
}

function Play_FollowUnfollow() {
    // if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
    //     if (AddCode_IsFollowing) AddCode_UnFollow();
    //     else AddCode_Follow();
    // } else {
    //     Play_showWarningDialog(STR_NOKEY_WARN);
    //     Play_IsWarning = true;
    //     window.setTimeout(function() {
    //         Play_HideWarningDialog();
    //         Play_IsWarning = false;
    //     }, 2000);
    // }

    Play_showWarningDialog(STR_FOLLOW_ISSUE);
    Play_IsWarning = true;
    window.setTimeout(function () {
        Play_HideWarningDialog();
        Play_IsWarning = false;
    }, 2000);
}

function Play_qualityDisplay(getQualitiesCount, qualityIndex, callback) {
    var doc_up = document.getElementById('control_arrow_up_' + Play_controlsQuality),
        doc_down = document.getElementById('control_arrow_down' + Play_controlsQuality);

    if (getQualitiesCount() === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!qualityIndex) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '0.2';
        doc_down.style.opacity = '1';
    } else if (qualityIndex === getQualitiesCount() - 1) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '1';
        doc_down.style.opacity = '0.2';
    } else {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '1';
        doc_down.style.opacity = '1';
    }

    callback('controls_name_' + Play_controlsQuality);
}

function Play_qualityIndexReset() {
    Play_qualityIndex = 0;
    for (var i = 0; i < Play_getQualitiesCount(); i++) {
        if (Play_qualities[i].id === Play_quality) {
            Play_qualityIndex = i;
            break;
        } else if (Play_qualities[i].id.indexOf(Play_quality) !== -1) {
            //make shore to set a value before break out
            Play_qualityIndex = i;
        }
    }
}

//called by android PlayerActivity TODO check this
function Play_PannelEndStart(PlayVodClip) {
    if (PlayVodClip === 1) {
        //live
        window.clearInterval(Play_streamCheckId);
        Play_CheckHostStart();
    } else {
        Play_PlayEndStart(PlayVodClip);
    }
}

function Play_PlayEndStart(PlayVodClip) {
    window.clearInterval(Play_streamCheckId);
    window.clearInterval(PlayClip_streamCheckId);
    window.clearInterval(PlayVod_streamCheckId);

    Play_PrepareshowEndDialog(PlayVodClip);
    Play_EndTextCounter = !Play_EndSettingsCounter ? -2 : Play_EndSettingsCounter;

    Play_EndText(PlayVodClip);
    Play_showEndDialog();
}

function Play_CheckHostStart(error_410) {
    if (Main_IsNotBrowser) webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);

    if (error_410) {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_410_ERROR);
    }

    Play_showBufferDialog();
    Play_state = -1;
    Play_loadingDataTry = 0;
    Play_loadingDataTimeout = 2000;
    ChatLive_Clear();
    window.clearInterval(Play_streamInfoTimerId);
    window.clearInterval(Play_streamCheckId);
    if (Main_values.Play_selectedChannel_id !== '') Play_loadDataCheckHost();
    //else Play_CheckId();
}

// function Play_CheckId() {
//     BasexmlHttpGet(
//         'https://api.twitch.tv/kraken/users?login=' + Main_values.Play_selectedChannel,
//         Play_loadingDataTimeout,
//         2,
//         null,
//         Play_CheckIdValue,
//         Play_CheckIdError,
//         false
//     );
// }

// function Play_CheckIdValue(musers) {
//     musers = JSON.parse(musers).users[0];
//     if (musers !== undefined) {
//         Main_values.Play_selectedChannel_id = musers._id;
//         Play_loadingDataTry = 0;
//         Play_loadingDataTimeout = 2000;
//         Play_loadDataCheckHost();
//     } else Play_PlayEndStart(1);
// }

// function Play_CheckIdError() {
//     Play_loadingDataTry++;
//     if (Play_loadingDataTry < Play_loadingDataTryMax) {
//         Play_loadingDataTimeout += 250;
//         Play_CheckId();
//     } else Play_EndStart(false, 1);
// }

var Play_loadDataCheckHostId;
function Play_loadDataCheckHost() {
    Play_loadDataCheckHostId = new Date().getTime();

    Main_GetHost(Play_CheckHost, Play_loadDataCheckHostId, Main_values.Main_selectedChannel);
}

function Play_CheckHost(responseObj, id) {
    if (Play_isOn && Play_loadDataCheckHostId === id) {
        if (responseObj.status === 200) {
            var data = JSON.parse(responseObj.responseText).data;

            if (data.user && data.user.hosting) {
                var response = data.user.hosting;

                Play_TargetHost = response;

                Play_IsWarning = true;
                Play_showWarningDialog(Main_values.Play_selectedChannelDisplayname + STR_IS_NOW + STR_USER_HOSTING + Play_TargetHost.displayName);

                window.setTimeout(function () {
                    Play_IsWarning = false;
                }, 4000);

                Play_EndSet(0);
                Main_values.Play_isHost = true;

                Play_PlayEndStart(1);

                return;
            }
        }

        Play_EndSet(1);
        Main_values.Play_isHost = false;
        Play_PlayEndStart(1);
    }
}

function Play_setFollow() {
    Play_controls[Play_controlsFollow].setLable(AddCode_IsFollowing ? STR_FOLLOWING : STR_FOLLOW, AddCode_IsFollowing);
}

function Play_KeyReturn(is_vod) {
    if (Play_isEndDialogVisible()) Play_EndTextClear();

    if (Play_isEndDialogVisible() && !Play_ExitDialogVisible() && !Play_SingleClickExit) Play_showExitDialog();
    else if (UserLiveFeed_isFeedShow() && !Play_isEndDialogVisible()) UserLiveFeed_Hide();
    else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
        if (is_vod) PlayVod_hidePanel();
        else Play_hidePanel();
    } else {
        if (Play_isVodDialogShown() && Play_ExitDialogVisible()) {
            Play_HideVodDialog();
            PlayVod_PreshutdownStream(false);
            Play_exitMain();
        } else if (Play_ExitDialogVisible() || Play_SingleClickExit) {
            Play_CleanHideExit();
            Play_hideChat();
            if (is_vod) PlayVod_shutdownStream();
            else Play_shutdownStream();
        } else if (Play_WarningDialogVisible()) {
            Play_HideWarningDialog();
            Play_showExitDialog();
        } else {
            Play_showExitDialog();
        }
    }
}

function Play_handleKeyUp(e) {
    if (e.keyCode === KEY_UP) {
        Play_handleKeyUpEndClear();
        if (!Play_EndUpclear) Play_EndDialogUpDown();
    }
}

function Play_OpenLiveFeed(ResetFeed, doc) {
    var selectedChannel = JSON.parse(doc.getAttribute(Main_DataAttribute))[0];
    if (Main_values.Play_selectedChannel !== selectedChannel) {
        Play_SavePlayData();
        Play_PreshutdownStream(false);

        Main_values.Play_isHost = false;
        Play_UserLiveFeedPressed = true;
        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
    } else if (ResetFeed) UserLiveFeed_ResetFeedId();
}

function Play_keyUpEnd() {
    Play_EndUpclear = true;
    UserLiveFeed_FeedRefresh(Play_EndFocus);
}

function Play_handleKeyUpEndClear() {
    window.clearTimeout(Play_EndUpclearID);
    document.body.removeEventListener('keyup', Play_handleKeyUp);
    document.body.addEventListener('keydown', Play_EndUpclearCalback, false);
}

function Play_EndDialogUpDown() {
    Play_EndTextClear();
    if (UserLiveFeed_loadingData || !AddUser_UserIsSet()) return;

    if (Play_EndFocus) {
        Play_EndFocus = false;
        Play_EndIconsRemoveFocus();
        UserLiveFeed_FeedAddFocus();
    } else {
        Play_EndFocus = true;
        UserLiveFeed_FeedRemoveFocus();
        Play_EndIconsAddFocus();
    }
}

function Play_SavePlayData() {
    Play_selectedChannel_id_Old = Main_values.Play_selectedChannel_id;
    Play_IsRerun_Old = Main_values.IsRerun;
    Play_selectedChannel_Old = Main_values.Play_selectedChannel;
    Play_isHost_Old = Play_isHost;
    Play_Main_isHost_Old = Main_values.Play_isHost;
    Play_DisplaynameHost_Old = Main_values.Play_DisplaynameHost;
    Play_selectedChannelDisplayname_Old = Main_values.Play_selectedChannelDisplayname;
    Play_gameSelected_Old = Main_values.Play_gameSelected;
}

function Play_RestorePlayData(error_410) {
    Play_HideBufferDialog();
    Play_state = Play_STATE_PLAYING;

    Play_showWarningDialog(error_410 ? STR_410_ERROR : Main_values.Play_selectedChannelDisplayname + ' ' + STR_LIVE + STR_IS_OFFLINE);

    window.setTimeout(function () {
        Play_HideWarningDialog();
    }, 2000);

    Play_RestorePlayDataValues();

    Main_SaveValues();
    Play_updateStreamInfoStart();
}

function Play_RestorePlayDataValues() {
    Main_values.Play_selectedChannel_id = Play_selectedChannel_id_Old;
    Play_selectedChannel_id_Old = null;

    Main_values.IsRerun = Play_IsRerun_Old;
    Main_values.Play_selectedChannel = Play_selectedChannel_Old;
    Play_isHost = Play_isHost_Old;
    Main_values.Play_isHost = Play_Main_isHost_Old;
    Main_values.Play_DisplaynameHost = Play_DisplaynameHost_Old;
    Main_values.Play_selectedChannelDisplayname = Play_selectedChannelDisplayname_Old;
    Main_values.Play_gameSelected = Play_gameSelected_Old;
}

function Play_handleKeyDown(e) {
    if (Play_state !== Play_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                    Play_CleanHideExit();
                    Play_hideChat();
                    Play_shutdownStream();
                } else {
                    Play_showExitDialog();
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.keyCode) {
            case KEY_LEFT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (Main_values.Play_isHost ? 1 : 2)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Play_FeedPos < UserLiveFeed_GetSize() - 1 && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(1, 1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = Main_values.Play_isHost ? 1 : 2;
                    Play_EndIconsAddFocus();
                } else {
                    Play_showPanel();
                }
                break;
            case KEY_UP:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        if (PlayVod_PanelY < 1) {
                            PlayVod_PanelY = 1;
                        } else PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, 1);
                    Play_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow() && AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) UserLiveFeed_ShowFeed();
                else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    document.body.removeEventListener('keydown', Play_handleKeyDown, false);
                    document.body.addEventListener('keyup', Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = Play_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                break;
            case KEY_DOWN:
                if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(1, -1);
                    Play_setHidePanel();
                } else if (Play_isEndDialogVisible()) Play_EndDialogUpDown();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) Play_KeyChatSizeChage();
                else {
                    Play_showPanel();
                }
                break;
            case KEY_ENTER:
                var doc;
                if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(1);
                    else {
                        doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
                        if (doc !== null) {
                            Play_EndDialogEnter = 1;
                            Play_EndUpclearCalback = Play_handleKeyDown;
                            Play_OpenLiveFeed(false, doc);
                        }
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 1) {
                        if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                    } else Play_BottomOptionsPressed(1);
                    Play_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    doc = document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos);
                    if (doc !== null) {
                        Play_EndDialogEnter = 1;
                        Play_EndUpclearCalback = Play_handleKeyDown;
                        Play_OpenLiveFeed(false, doc);
                    }
                } else Play_showPanel();
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Play_KeyReturn(false);
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) Play_KeyPause(1);
                break;
            case KEY_KEYBOARD_SPACE:
            case KEY_PLAYPAUSE:
                if (!Play_isEndDialogVisible()) Play_KeyPause(1);
                break;
            case KEY_INFO:
            case KEY_REFRESH:
                Play_controls[Play_controlsChat].enterKey(1);
                break;
            case KEY_PG_UP:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(1, 1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_PG_DOWN:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(1, -1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_STOP:
                Play_hideChat();
                Play_shutdownStream();
                break;
            case KEY_GREEN:
                if (!Main_isReleased) {
                    Main_PrintUnicode('Reloading');
                    window.location.reload(true);
                }
                break;
            default:
                break;
        }
    }
}

var Play_controls = {};
var Play_controlsSize = -1;

var Play_controlsSearch = 0;
var Play_controlsChanelCont = 1;
var Play_controlsGameCont = 2;
var Play_controlsOpenVod = 3;
var Play_controlsFollow = 4;
var Play_controlsQuality = 5;
var Play_controlsLowLatency = 6;
var Play_controlsChat = 7;
var Play_controlsChatSend = 8;
var Play_controlsChatSide = 9;
var Play_controlsChatPos = 10;
var Play_controlsChatSize = 11;
var Play_controlsChatBright = 12;
var Play_controlsChatFont = 13;
var Play_controlsChatDelay = 14;
var Play_controlsChatForceDis = 15;
var Play_controlsProxy = 16;

var Play_controlsDefault = Play_controlsChat;
var Play_Panelcounter = Play_controlsDefault;

function Play_MakeControls() {
    Play_controls[Play_controlsSearch] = {
        //Search
        icons: 'search',
        string: STR_SEARCH,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenSearch(PlayVodClip);
        }
    };

    Play_controls[Play_controlsChanelCont] = {
        //channel content
        icons: 'filmstrip',
        string: STR_CHANNEL_CONT,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenChannel(PlayVodClip);
        },
        setLable: function (title) {
            Main_innerHTML(
                'extra_button_' + this.position,
                '<div style="max-width: 27%; text-overflow: ellipsis; overflow: hidden; transform: translate(135.5%, 0);">' + title + '</div>'
            );
        }
    };

    Play_controls[Play_controlsGameCont] = {
        //game content
        icons: 'gamepad',
        string: STR_GAME_CONT,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            Play_ForceHidePannel();
            Play_OpenGame(PlayVodClip);
        },
        setLable: function (title) {
            Main_innerHTML(
                'extra_button_' + this.position,
                '<div style="max-width: 40%; text-overflow: ellipsis; overflow: hidden; transform: translate(75%, 0);">' +
                    (title === '' ? STR_NO_GAME : title) +
                    '</div>'
            );
        }
    };

    Play_controls[Play_controlsOpenVod] = {
        //open vod
        icons: 'movie-play',
        string: STR_OPEN_BROADCAST,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function () {
            Play_ForceHidePannel();
            PlayClip_OpenVod();
        },
        setLable: function (title) {
            Main_innerHTML(
                'extra_button_' + this.position,
                '<div style="max-width: 60%; text-overflow: ellipsis; overflow: hidden; transform: translate(33%, 0);">' + title + '</div>'
            );
        }
    };

    Play_controls[Play_controlsFollow] = {
        //following
        icons: 'heart-o',
        string: STR_FOLLOW,
        values: '',
        defaultValue: null,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            AddCode_Channel_id = PlayVodClip === 1 ? Main_values.Play_selectedChannel_id : Main_values.Main_selectedChannel_id;
            Play_FollowUnfollow();

            Play_Resetpanel(PlayVodClip);
        },
        setLable: function (string, AddCode_IsFollowing) {
            Main_textContent('extra_button_text' + this.position, string);
            this.setIcon(AddCode_IsFollowing);
            //Main_textContent('extra_button_' + this.position, AddCode_IsFollowing ? STR_CLICK_UNFOLLOW : STR_CLICK_FOLLOW);
        },
        setIcon: function (AddCode_IsFollowing) {
            Main_innerHTML(
                'controls_icon_' + this.position,
                '<i class="pause_button3d icon-' +
                    (AddCode_IsFollowing ? 'heart' : 'heart-o') +
                    '" style="color: #' +
                    (AddCode_IsFollowing ? '6441a4' : 'FFFFFF') +
                    ';" ></i>'
            );
        }
    };

    Play_controls[Play_controlsQuality] = {
        //quality
        icons: 'videocamera',
        string: STR_QUALITY,
        values: ['1080p60 | Source | 10.00Mbps'],
        defaultValue: 0,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            if (PlayVodClip === 1) {
                Play_hidePanel();
                Play_quality = Play_qualities[Play_qualityIndex].id;
                Play_qualityPlaying = Play_quality;
                Play_playingUrl = Play_qualities[Play_qualityIndex].url;
                Play_SetHtmlQuality('stream_quality');
                Play_onPlayer();
            } else if (PlayVodClip === 2) {
                PlayVod_hidePanel();
                if (Main_IsNotBrowser) {
                    Main_values.vodOffset = Play_avplay.getCurrentTime() / 1000;
                }
                PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
                PlayVod_qualityPlaying = PlayVod_quality;
                PlayVod_playingUrl = PlayVod_qualities[PlayVod_qualityIndex].url;
                PlayVod_SetHtmlQuality('stream_quality');
                PlayVod_onPlayer();
            } else if (PlayVodClip === 3) {
                PlayClip_hidePanel();
                if (Main_IsNotBrowser) {
                    PlayClip_offsettime = Play_avplay.getCurrentTime() - 1;
                }
                PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;
                PlayClip_qualityPlaying = PlayClip_quality;
                PlayClip_playingUrl = PlayClip_qualities[PlayClip_qualityIndex].url;
                PlayClip_SetHtmlQuality('stream_quality');
                PlayClip_onPlayer();
            }
            Play_clearPause();
        },
        updown: function (adder, PlayVodClip) {
            if (PlayVodClip === 1) {
                //TODO fix this reversed logic
                Play_qualityIndex += adder * -1;

                if (Play_qualityIndex > Play_getQualitiesCount() - 1) Play_qualityIndex = Play_getQualitiesCount() - 1;
                else if (Play_qualityIndex < 0) Play_qualityIndex = 0;

                Play_qualityDisplay(Play_getQualitiesCount, Play_qualityIndex, Play_SetHtmlQuality);
            } else if (PlayVodClip === 2) {
                //TODO fix this reversed logic
                PlayVod_qualityIndex += adder * -1;

                if (PlayVod_qualityIndex > PlayVod_getQualitiesCount() - 1) PlayVod_qualityIndex = PlayVod_getQualitiesCount() - 1;
                else if (PlayVod_qualityIndex < 0) PlayVod_qualityIndex = 0;

                Play_qualityDisplay(PlayVod_getQualitiesCount, PlayVod_qualityIndex, PlayVod_SetHtmlQuality);
            } else if (PlayVodClip === 3) {
                //TODO fix this reversed logic
                PlayClip_qualityIndex += adder * -1;

                if (PlayClip_qualityIndex > PlayClip_getQualitiesCount() - 1) PlayClip_qualityIndex = PlayClip_getQualitiesCount() - 1;
                else if (PlayClip_qualityIndex < 0) PlayClip_qualityIndex = 0;

                Play_qualityDisplay(PlayClip_getQualitiesCount, PlayClip_qualityIndex, PlayClip_SetHtmlQuality);
            }
        }
    };

    Play_controls[Play_controlsLowLatency] = {
        //quality
        icons: 'history',
        string: STR_LOW_LATENCY,
        values: null,
        defaultValue: 0,
        opacity: 0,
        enterKey: function () {
            Play_hidePanel();

            Play_LowLatency = !Play_LowLatency;

            if (Main_IsNotBrowser) Play_onPlayer();

            if (Play_LowLatency) {
                Play_showWarningDialog(STR_LOW_LATENCY_SUMARRY);
                window.setTimeout(Play_HideWarningDialog, 3000);
            }

            Main_setItem('Play_LowLatency', Play_LowLatency);
            this.setLable();
        },
        setLable: function () {
            Main_textContent('extra_button_' + this.position, '(' + (Play_LowLatency ? STR_ENABLED : STR_DISABLED) + ')');
        }
    };

    Play_controls[Play_controlsChat] = {
        //chat enable disable
        icons: 'chat',
        string: STR_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function () {
            if (!Play_isFullScreen) return;
            if (!Play_isChatShown() && !Play_isEndDialogVisible()) {
                Play_showChat();
                Play_ChatEnable = true;
            } else {
                Play_hideChat();
                Play_ChatEnable = false;
            }
            Main_setItem('ChatEnable', Play_ChatEnable ? 'true' : 'false');
            this.setLable();
        },
        setLable: function () {
            var string = Play_isChatShown() ? STR_YES : STR_NO;
            if (!Play_isFullScreen) string = STR_CHAT_SIDE;

            Main_textContent('extra_button_' + this.position, '(' + string + ')');
        }
    };

    Play_controls[Play_controlsChatSend] = {
        ShowInLive: true,
        ShowInVod: true,
        ShowInClip: true,
        ShowInPP: true,
        ShowInMulti: true,
        ShowInChat: false,
        ShowInAudioPP: false,
        ShowInAudioMulti: false,
        ShowInPreview: false,
        ShowInStay: true,
        icons: 'keyboard',
        string: STR_CHAT_WRITE,
        opacity: 0,
        values: null,
        defaultValue: null,
        enterKey: function () {
            if (Main_values.Play_ChatForceDisable) {
                Play_showWarningMidleDialog(STR_CHAT_DISABLE, 1500);
                return;
            } else if (!AddUser_UserIsSet() || !AddUser_UsernameArray[0].access_token) {
                Play_showWarningMidleDialog(STR_NOKEY_CHAT_WARN, 3000);
                return;
            }

            ChatLiveControls_Show();
        }
    };

    Play_controls[Play_controlsChatSide] = {
        //chat side
        icons: Play_isFullScreen ? 'resize-down' : 'resize-up',
        string: STR_CHAT_VIDEO_MODE,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function () {
            Play_isFullScreen = !Play_isFullScreen;
            Play_SetFullScreen(Play_isFullScreen);

            this.setLable();
            this.setIcon();
        },
        setLable: function () {
            Main_textContent('extra_button_' + this.position, '(' + (Play_isFullScreen ? STR_CHAT_SIDE_FULL : STR_CHAT_SIDE) + ')');

            Play_controls[Play_controlsChat].setLable();
        },
        setIcon: function () {
            Main_innerHTML(
                'controls_icon_' + this.position,
                '<i class="pause_button3d icon-' + (Play_isFullScreen ? 'resize-down' : 'resize-up') + '" ></i>'
            );
        }
    };

    Play_controls[Play_controlsChatPos] = {
        //chat position
        icons: 'chat-pos',
        string: STR_CHAT_POS,
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        defaultValue: Play_ChatPositions,
        opacity: 0,
        isChat: true,
        updown: function (adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = this.values.length - 1;
            else if (this.defaultValue > this.values.length - 1) this.defaultValue = 0;

            Play_ChatPositions += adder;

            Play_ChatPosition();

            this.defaultValue = Play_ChatPositions;

            this.setLable();
        },
        setLable: function () {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue]);
        }
    };

    Play_controls[Play_controlsChatSize] = {
        //chat size
        icons: 'chat-size',
        string: STR_CHAT_SIZE,
        values: ['12.5%', '25%', '50%', '75%', '100%'],
        defaultValue: Play_ChatSizeValue,
        opacity: 0,
        isChat: true,
        updown: function (adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > this.values.length - 1) {
                this.defaultValue = this.values.length - 1;
                return;
            }
            this.bottomArrows();
            Play_ChatSizeValue = this.defaultValue;

            if (Play_ChatSizeValue === Play_MaxChatSizeValue - 1 && adder === -1) {
                Play_ChatPositionConvert(false);
            } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);

            Play_ChatSize(true);

            Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
            this.setLable();
        },
        setLable: function () {
            Main_textContent(
                'controls_name_' + Play_controlsChatPos,
                Play_controls[Play_controlsChatPos].values[Play_controls[Play_controlsChatPos].defaultValue]
            );
        },
        bottomArrows: function () {
            Play_BottomArrows(this.position);
        }
    };

    Play_controls[Play_controlsChatBright] = {
        //chat_brightness
        icons: 'chat-brig',
        string: STR_CHAT_BRIGHTNESS,
        values: [
            '0%',
            '5%',
            '10%',
            '15%',
            '20%',
            '25%',
            '30%',
            '35%',
            '40%',
            '45%',
            '50%',
            '55%',
            '60%',
            '65%',
            '70%',
            '75%',
            '80%',
            '85%',
            '90%',
            '95%',
            '100%'
        ],
        defaultValue: Main_values.ChatBackground,
        opacity: 0,
        isChat: true,
        updown: function (adder) {
            if (!Play_isChatShown() || !Play_isFullScreen) return;
            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > this.values.length - 1) this.defaultValue = this.values.length - 1;
            Main_values.ChatBackground = this.defaultValue;

            Play_ChatBackground = (this.defaultValue * 0.05).toFixed(2);
            Play_ChatBackgroundChange(false);

            this.setLable();
            this.bottomArrows();
            Main_SaveValues();
        },
        setLable: function () {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue]);
        },
        bottomArrows: function () {
            Play_BottomArrows(this.position);
        }
    };

    Play_controls[Play_controlsChatFont] = {
        //Chat font size
        ShowInLive: false,
        ShowInVod: false,
        ShowInClip: false,
        ShowInPP: false,
        ShowInMulti: false,
        ShowInChat: true,
        ShowInAudioPP: false,
        ShowInAudioMulti: false,
        ShowInPreview: false,
        ShowInStay: false,
        icons: 'chat-font',
        string: STR_CHAT_FONT,
        opacity: 0,
        values: Play_ChatFontObj,
        defaultValue: Main_values.Chat_font_size_new,
        isChat: true,
        updown: function (adder) {
            if (!Play_isChatShown()) return;

            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > this.values.length - 1) this.defaultValue = this.values.length - 1;
            Main_values.Chat_font_size_new = this.defaultValue;

            Play_SetChatFont();
            this.bottomArrows();
            this.setLable();
            Main_SaveValues();
        },
        setLable: function () {
            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] + '%');
        },
        bottomArrows: function () {
            Play_BottomArrows(this.position);
        }
    };

    Play_controls[Play_controlsChatDelay] = {
        //chat delay
        icons: 'chat-delay',
        string: STR_CHAT_DELAY,
        values: [STR_DISABLE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 45, 60, 90, 120, 150, 180, 240, 300],
        defaultValue: Play_ChatDelayPosition,
        opacity: 0,
        isChat: false,
        updown: function (adder) {
            this.defaultValue += adder;

            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > this.values.length - 1) this.defaultValue = this.values.length - 1;

            Play_ChatDelayPosition = this.defaultValue;

            Main_setItem('Play_ChatDelayPosition', Play_ChatDelayPosition);
            this.bottomArrows();
            this.setLable();
        },
        setLable: function () {
            var stringSec = '';

            if (this.defaultValue > 1) stringSec = STR_SECONDS;
            else if (this.defaultValue > 0) stringSec = STR_SECOND;

            Main_textContent('controls_name_' + this.position, this.values[this.defaultValue] + stringSec);
        },
        bottomArrows: function () {
            Play_BottomArrows(this.position);
        }
    };

    Play_controls[Play_controlsChatForceDis] = {
        //force disable chat
        icons: 'chat-stop',
        string: STR_F_DISABLE_CHAT,
        values: null,
        defaultValue: null,
        opacity: 0,
        enterKey: function (PlayVodClip) {
            Main_values.Play_ChatForceDisable = !Main_values.Play_ChatForceDisable;

            if (PlayVodClip === 1) ChatLive_Init();
            else Chat_Init();

            this.setLable();
            Main_SaveValues();
        },
        setLable: function () {
            Main_textContent('extra_button_' + this.position, '(' + (Main_values.Play_ChatForceDisable ? STR_YES : STR_NO) + ')');
        }
    };

    Play_controls[Play_controlsProxy] = {
        opacity: 0,
        icons: 'proxy',
        string: PROXY_SERVICE,
        values: STR_PROXY_CONTROLS_ARRAY,
        defaultValue: Settings_get_enabled(),
        enterKey: function () {
            var currentProxyEnabled = Settings_get_enabled(),
                i,
                key;

            if (this.defaultValue < 1) {
                key = proxyArray[this.defaultValue];
                Settings_value[key].defaultValue = 1;
                Main_setItem(key, 2);
                Settings_set_all_proxy(key);
            } else {
                //reset all proxy to disable
                i = 0;
                var len = proxyArray.length;
                for (i; i < len; i++) {
                    key = proxyArray[i];
                    Settings_value[key].defaultValue = 0;
                    Main_setItem(key, 1);
                }
                use_proxy = false;
            }

            if (currentProxyEnabled !== Settings_get_enabled()) {
                Play_showBufferDialog();
                Play_state = Play_STATE_LOADING_TOKEN;
                Play_loadData();
            }

            Play_ResetProxy();
            Play_UpdateVideoStatus();
        },
        updown: function (adder) {
            this.defaultValue += adder;
            if (this.defaultValue < 0) this.defaultValue = 0;
            else if (this.defaultValue > this.values.length - 1) this.defaultValue = this.values.length - 1;
            this.bottomArrows();
        },
        bottomArrows: function () {
            Play_BottomArrows(this.position);
        },
        setLable: function () {
            Main_textContent('extra_button_text' + this.position, PROXY_SERVICE + this.values[this.defaultValue]);
        }
    };
}

function Play_IconsAddFocus() {
    Main_AddClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = '1';

    if (Play_controls[Play_Panelcounter].isChat && (!Play_isChatShown() || !Play_isFullScreen))
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = '1';
    else if (Play_Panelcounter !== Play_controlsChat && !Play_controls[Play_Panelcounter].isChat)
        document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = '0';
}

function Play_IconsRemoveFocus() {
    Main_RemoveClass('controls_button_' + Play_Panelcounter, 'progress_bar_div_focus');
    document.getElementById('controls_button_text_' + Play_Panelcounter).style.opacity = '0';
    //in case chat is disable and the warning is showing because some chat option was selected
    document.getElementById('controls_button_text_' + Play_controlsChat).style.opacity = '0';
}

function Play_KeyChatSizeChage() {
    Play_ChatSizeValue++;
    if (Play_ChatSizeValue > Play_MaxChatSizeValue) {
        Play_ChatSizeValue = 0;
        Play_ChatPositionConvert(false);
    } else if (Play_ChatSizeValue === Play_MaxChatSizeValue) Play_ChatPositionConvert(true);
    Play_ChatSize(true);
    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
    Play_controls[Play_controlsChatSize].bottomArrows();
    Play_controls[Play_controlsChatSize].setLable();
}

function Play_BottomOptionsPressed(PlayVodClip) {
    Main_ready(function () {
        if (Play_controls[Play_Panelcounter].enterKey) {
            Play_controls[Play_Panelcounter].enterKey(PlayVodClip);
        } else {
            Play_Resetpanel(PlayVodClip);
        }
    });
    Main_SaveValues();
}

function Play_Resetpanel(PlayVodClip) {
    Play_clearHidePanel();
    if (PlayVodClip === 1) Play_setHidePanel();
    else if (PlayVodClip === 2) PlayVod_setHidePanel();
    else if (PlayVodClip === 3) PlayClip_setHidePanel();
}

function Play_BottomUpDown(PlayVodClip, adder) {
    if (Play_controls[Play_Panelcounter].updown) {
        Play_controls[Play_Panelcounter].updown(adder, PlayVodClip);
    } else if (adder === 1) {
        PlayVod_PanelY--;
        PlayVod_IconsBottonFocus();
    }
}

function Play_BottomLeftRigt(PlayVodClip, adder) {
    Play_IconsRemoveFocus();
    Play_Panelcounter += adder;
    if (Play_Panelcounter > Play_controlsSize) Play_Panelcounter = 0;
    else if (Play_Panelcounter < 0) Play_Panelcounter = Play_controlsSize;

    if (document.getElementById('controls_' + Play_Panelcounter).style.display === 'none') {
        Play_BottomLeftRigt(PlayVodClip, adder);
        return;
    }

    Play_IconsAddFocus();
}

function Play_BottomArrows(position) {
    var doc_up = document.getElementById('control_arrow_up_' + position),
        doc_down = document.getElementById('control_arrow_down' + position);

    if (Play_controls[position].values.length === 1) {
        doc_up.classList.add('hide');
        doc_down.classList.add('hide');
    } else if (!Play_controls[position].defaultValue) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '1';
        doc_down.style.opacity = '0.2';
    } else if (Play_controls[position].defaultValue === Play_controls[position].values.length - 1) {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '0.2';
        doc_down.style.opacity = '1';
    } else {
        doc_up.classList.remove('hide');
        doc_down.classList.remove('hide');

        doc_up.style.opacity = '1';
        doc_down.style.opacity = '1';
    }

    Main_textContent('controls_name_' + position, Play_controls[position].values[Play_controls[position].defaultValue]);
}

function Play_SetControls() {
    var div,
        doc = document.getElementById('controls_holder');
    for (var key in Play_controls) {
        div = document.createElement('div');
        div.classList.add('controls_button_holder');
        div.setAttribute('id', 'controls_' + key);

        div.innerHTML =
            '<div id="controls_button_' +
            key +
            '" class="controls_button"><div id="controls_icon_' +
            key +
            '"><i class="pause_button3d icon-' +
            Play_controls[key].icons +
            '" ></i></div></div><div id="controls_button_text_' +
            key +
            '" class="extra_button_text_holder" style="opacity: ' +
            Play_controls[key].opacity +
            ';"><div id="extra_button_text' +
            key +
            '" class="extra_button_text strokedeline" >' +
            Play_controls[key].string +
            '</div><div id="extra_button_' +
            key +
            '" class="extra_button_text strokedeline" >' +
            (Play_controls[key].values ? Play_SetControlsArrows(key) : STR_SPACE) +
            '</div></div></div>';

        doc.appendChild(div);
        Play_controlsSize++;
        Play_controls[key].position = key;
        if (Play_controls[key].bottomArrows) Play_BottomArrows(key);
        if (Play_controls[key].setLable) Play_controls[key].setLable();
    }
}

function Play_SetControlsArrows(key) {
    return (
        '<div id="controls_arrows_' +
        key +
        '" style="font-size: 50%; display: inline-block; vertical-align: middle;"><div style="display: inline-block;"><div id="control_arrow_up_' +
        key +
        '" class="up"></div><div id="control_arrow_down' +
        key +
        '" class="down"></div></div></div>&nbsp;<div id="controls_name_' +
        key +
        '" class="arrows_text">' +
        Play_controls[key].values[Play_controls[key].defaultValue] +
        '</div>'
    );
}

var Play_dialog_warning_play_middle;
var Play_dialog_warning_play_middle_text;
var Play_showWarningMidleDialogId;
function Play_showWarningMidleDialog(text, timeout) {
    Main_innerHTMLWithEle(Play_dialog_warning_play_middle_text, text);

    if (UserLiveFeed_isFeedShow()) Play_dialog_warning_play_middle.style.marginTop = '90vh';
    else Play_dialog_warning_play_middle.style.marginTop = '50vh';

    Main_ShowElementWithEle(Play_dialog_warning_play_middle);

    if (timeout) {
        Play_showWarningMidleDialogId = Main_setTimeout(
            function () {
                Play_HideWarningMidleDialog();
            },
            timeout,
            Play_showWarningMidleDialogId
        );
    } else Main_clearTimeout(Play_showWarningMidleDialogId);
}

function Play_HideWarningMidleDialog() {
    Main_HideElementWithEle(Play_dialog_warning_play_middle);
    Main_clearTimeout(Play_showWarningMidleDialogId);
}
