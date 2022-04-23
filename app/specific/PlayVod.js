//Variable initialization
var PlayVod_quality = 'Auto';
var PlayVod_qualityPlaying = PlayVod_quality;

var PlayVod_state = 0;

var PlayVod_streamInfoTimerId = null;
var PlayVod_tokenResponse = 0;
var PlayVod_playlistResponse = 0;
var PlayVod_playingTry = 0;

var PlayVod_playingUrl = '';
var PlayVod_qualities = [];
var PlayVod_qualityIndex = 0;

var PlayVod_loadingDataTry = 0;
var PlayVod_loadingDataTryMax = 5;
var PlayVod_isOn = false;
var PlayVod_Buffer = 2000;

var PlayVod_loadingInfoDataTry = 0;
var PlayVod_loadingInfoDataTryMax = 5;
var PlayVod_loadingInfoDataTimeout = 10000;

var PlayVod_PlayerTime = 0;
var PlayVod_streamCheckId = null;
var PlayVod_PlayerCheckCount = 0;
var PlayVod_PlayerCheckQualityChanged = false;
var PlayVod_PlayerCheckCounter = 0;
var PlayVod_PlayerCheckRun = false;

var Play_jumping = false;
var PlayVod_SizeClearID;
var PlayVod_updateStreamInfId;
var PlayVod_addToJump = 0;
var PlayVod_IsJumping = false;
var PlayVod_jumpCount = 0;
var PlayVod_loadingDataTimeout = 2000;
var PlayVod_qualitiesFound = false;
var PlayVod_currentTime = 0;
var PlayVod_VodIds = {};
var PlayVod_VodPositions = 0;
var PlayVod_PanelY = 0;
var PlayVod_ProgressBaroffset = 0;
var PlayVod_StepsCount = 0;
var PlayVod_TimeToJump = 0;
var PlayVod_replay = false;
var PlayVod_jumpTimers = [0, 10, 30, 60, 120, 300, 600, 900, 1200, 1800];

var PlayVod_SaveOffsetId;
var PlayVod_WasSubChekd = false;

var PlayVod_bufferingcomplete = false;
//Variable initialization end

function PlayVod_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    PlayVod_currentTime = 0;
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Chat_title = STR_PAST_BROA + '.';
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    Main_HideElement('progress_pause_holder');
    Main_ShowElement('progress_bar_div');

    //past broadcast
    document.getElementById('controls_' + Play_controlsOpenVod).style.display = 'none';
    //Chat delay
    document.getElementById('controls_' + Play_controlsChatDelay).style.display = 'none';

    document.getElementById('controls_' + Play_controlsLowLatency).style.display = 'none';

    document.getElementById('controls_' + Play_controlsChatSend).style.display = 'none';

    Play_CurrentSpeed = 3;
    Play_IconsResetFocus();

    PlayVod_StepsCount = 0;
    Play_DefaultjumpTimers = PlayVod_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    PlayVod_state = Play_STATE_LOADING_TOKEN;
    PlayClip_HasVOD = true;
    UserLiveFeed_PreventHide = false;
    ChannelVod_vodOffset = 0;
    Main_values.Play_isHost = false;
    PlayClip_HideShowNext(0, 0);
    PlayClip_HideShowNext(1, 0);

    if (Main_values.vodOffset) { // this is a vod coming from a clip or from restore playback
        PlayVod_PrepareLoad();
        PlayVod_updateVodInfo();
    } else {
        PlayVod_updateStreamerInfoValues();
        Main_innerHTML("stream_info_title", ChannelVod_title);
        Main_textContent("stream_info_game", ChannelVod_game);
        Main_innerHTML("stream_live_time", ChannelVod_createdAt + ',' + STR_SPACE + ChannelVod_views);
        Main_textContent("stream_live_viewers", '');
        Main_textContent("stream_watching_time", '');

        Main_replaceClassEmoji('stream_info_title');
    }

    if (PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] && !Main_values.vodOffset) {
        Play_HideBufferDialog();
        Play_showVodDialog();
    } else {
        PlayVod_PosStart();
    }

    if (!Main_values.Play_gameSelected_id && Main_values.Play_gameSelected) {
        PlayClip_UpdateGameInfo();
    }
}

function PlayVod_PosStart() {
    window.setTimeout(function() {
        Main_ShowElement('controls_holder');
        Main_ShowElement('progress_pause_holder');
    }, 1000);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    Main_values.Play_WasPlaying = 2;
    Main_SaveValues();

    window.clearInterval(PlayVod_SaveOffsetId);
    PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
    //View bot is blocking it
    //new Image().src = Play_IncrementView;

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_PlayerCheckCount = 0;
    window.clearInterval(PlayVod_streamCheckId);
    PlayVod_PlayerCheckRun = false;
    Play_PlayerPanelOffset = -13;
    PlayVod_qualitiesFound = false;
    Play_IsWarning = false;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_tokenResponse = 0;
    PlayVod_playlistResponse = 0;
    PlayVod_playingTry = 0;
    document.addEventListener('visibilitychange', PlayVod_Resume, false);
    Play_jumping = false;
    PlayVod_isOn = true;
    PlayVod_WasSubChekd = false;

    if (!PlayVod_replay) PlayVod_loadData();
    else {
        PlayVod_state = Play_STATE_PLAYING;
        PlayVod_qualityChanged();
    }

    Play_EndSet(2);
    document.body.removeEventListener("keyup", Main_handleKeyUp);

    Play_controls[Play_controlsChanelCont].setLable(Main_values.Main_selectedChannelDisplayname);
    Play_controls[Play_controlsGameCont].setLable(Main_values.Play_gameSelected);
}

function PlayVod_PrepareLoad() {
    PlayVod_loadingInfoDataTry = 0;
    PlayVod_loadingInfoDataTryMax = 5;
    PlayVod_loadingInfoDataTimeout = 10000;
}

function PlayVod_updateStreamerInfoValues() {
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false, ' [' + (ChannelVod_language).toUpperCase() + ']');


    //The chat init will happens after user click on vod dialog
    if (!PlayVod_VodIds['#' + Main_values.ChannelVod_vodId]) Chat_Init();

    if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_PlayRequest = true;
        AddCode_CheckFollow();
    } else Play_hideFollow();
}

function PlayVod_updateVodInfo() {
    // https://dev.twitch.tv/docs/api/reference#get-videos
    var theUrl = Main_helix_api + 'videos?id=' + Main_values.ChannelVod_vodId;
    BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, PlayVod_updateVodInfoPannel, PlayVod_updateVodInfoError, false, null, true);
}

function PlayVod_updateVodInfoError() {
    PlayVod_loadingInfoDataTry++;
    if (PlayVod_loadingInfoDataTry < PlayVod_loadingInfoDataTryMax) {
        PlayVod_loadingInfoDataTimeout += 2000;
        PlayVod_updateVodInfo();
    }
}

function PlayVod_updateVodInfoPannel(response) {
    response = JSON.parse(response).data[0];
    response.channel = {
        partner: false,
        broadcaster_language: response.language,
        display_name: response.user_name,
        _id: response.user_id,
        name: response.user_name,
    };
    response.length = Play_timeHMS(response.length);

    ChannelVod_title = twemoji.parse(response.title, false, true);

    //TODO add a warning about muted segments
    //if (response.muted_segments) console.log(response.muted_segments);

    Main_values.Main_selectedChannelPartner = response.channel.partner;
    Play_partnerIcon(Main_values.Main_selectedChannelDisplayname, Main_values.Main_selectedChannelPartner, false,
        '[' + (response.channel.broadcaster_language).toUpperCase() + ']');

    Main_innerHTML("stream_info_title", ChannelVod_title);
    Main_innerHTML("stream_info_game", (response.game !== "" && response.game !== null ? STR_STARTED + STR_PLAYING +
        response.game : ""));

    Main_innerHTML("stream_live_time", STR_STREAM_ON + Main_videoCreatedAt(response.created_at) + ',' + STR_SPACE + Main_addCommas(response.views) + STR_VIEWS);
    Main_textContent("stream_live_viewers", '');
    Main_textContent("stream_watching_time", '');

    ChannelVod_DurationSeconds = parseInt(response.length);
    Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));

    PlayVod_currentTime = Main_values.vodOffset * 1000;
    PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);

    Main_values.Main_selectedChannelDisplayname = response.channel.display_name;
    //Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);

    Main_values.Main_selectedChannelLogo = response.channel.logo;
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);

    Main_values.Main_selectedChannel_id = response.channel._id;
    Main_values.Main_selectedChannel = response.channel.name;

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFollow();
    } else Play_hideFollow();

    //View bot is blocking it
    //new Image().src = response.increment_view_count_url;

    Play_EndSet(2);
}

function PlayVod_Resume() {
    if (document.hidden) {
        if (Play_isEndDialogVisible()) {
            Play_CleanHideExit();
            Play_hideChat();
            PlayVod_shutdownStream();
        } else {
            PlayVod_SaveOffset();
            PlayVod_SaveVodIds();
            Chat_Pause();
            if (Main_IsNotBrowser) {
                Play_avplay.pause();
                Main_values.vodOffset = Play_avplay.getCurrentTime() / 1000;
            }
            Play_ClearPlayer();
            UserLiveFeed_Hide(true);
            window.clearInterval(PlayVod_streamCheckId);
            window.clearInterval(PlayVod_SaveOffsetId);
        }
    } else {
        PlayVod_isOn = true;
        Play_clearPause();
        if (PlayVod_isOn) {
            Play_showBufferDialog();
            Play_ResumeAfterOnlineCounter = 0;

            window.clearInterval(Play_ResumeAfterOnlineId);
            if (navigator.onLine) PlayVod_ResumeAfterOnline();
            else Play_ResumeAfterOnlineId = window.setInterval(PlayVod_ResumeAfterOnline, 100);

            Play_EndSet(2);
            window.clearInterval(PlayVod_SaveOffsetId);
            PlayVod_SaveOffsetId = window.setInterval(PlayVod_SaveOffset, 60000);
        }
    }
}

function PlayVod_ResumeAfterOnline() {
    if (navigator.onLine || Play_ResumeAfterOnlineCounter > 200) {
        window.clearInterval(Play_ResumeAfterOnlineId);
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayVod_loadData();
    }
    Play_ResumeAfterOnlineCounter++;
}

function PlayVod_SaveOffset() {
    //Prevent setting it to 0 before it was used
    if (!Main_values.vodOffset) {
        Main_values.vodOffset = parseInt(PlayVod_currentTime / 1000);
        Main_SaveValues();
        Main_values.vodOffset = 0;
    }
}


function PlayVod_loadData() {
    PlayVod_loadingDataTry = 0;
    PlayVod_loadingDataTimeout = 2000;
    PlayVod_loadDataRequest();
}

function PlayVod_loadDataRequest() {
    var theUrl,
        state = PlayVod_state === Play_STATE_LOADING_TOKEN;

    var xmlHttp = new XMLHttpRequest();


    try {

        if (state) {

            xmlHttp.open(
                "POST",
                'https://gql.twitch.tv/gql',
                true
            );

        } else {

            if (!PlayVod_tokenResponse.hasOwnProperty('value') || !PlayVod_tokenResponse.hasOwnProperty('signature')) {
                Play_410ERROR = true;
                if (Main_isDebug) console.log('Play_410ERROR ' + Play_410ERROR);
                PlayVod_loadDataError();
                return;
            }

            theUrl = 'https://usher.ttvnw.net/vod/' + Main_values.ChannelVod_vodId +
                '.m3u8?&nauth=' + encodeURIComponent(PlayVod_tokenResponse.value) + '&nauthsig=' + PlayVod_tokenResponse.signature +
                '&playlist_include_framerate=true&reassignments_supported=true&allow_source=true' +
                (Main_vp9supported ? '&preferred_codecs=vp09' : '') + '&p=' + Main_RandomInt();

            xmlHttp.open(
                "GET",
                theUrl,
                true
            );

        }


        xmlHttp.timeout = Play_loadingDataTimeout;
        if (Play_Headers && Play_Headers.length) {

            var len = Play_Headers.length;

            for (var i = 0; i < len; i++)
                xmlHttp.setRequestHeader(Play_Headers[i][0], Play_Headers[i][1]);

        }

        xmlHttp.ontimeout = function() { };

        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    PlayVod_loadDataSuccess(xmlHttp.responseText);
                    //Play_410ERROR = false;
                } else {
                    if (xmlHttp.status === 410) {
                        Play_410ERROR = true;
                        if (Main_isDebug) console.log('Play_410ERROR ' + Play_410ERROR);
                    }
                    PlayVod_loadDataError();
                }
            }
        };

        xmlHttp.send(
            state ?
                Play_vod_token.replace('%x', Main_values.ChannelVod_vodId) :
                null
        );

    } catch (e) {

        PlayVod_loadDataError();
        console.log('PlayVod_loadDataRequest e ' + e);
    }

}

function PlayVod_loadDataError() {
    if (PlayVod_isOn) {
        var mjson;

        try {

            if (PlayVod_tokenResponse.value) mjson = JSON.parse(PlayVod_tokenResponse.value);

            if (mjson) {
                if (JSON.parse(PlayVod_tokenResponse.value).chansub.restricted_bitrates.length !== 0) {
                    PlayVod_loadDataCheckSub();
                    return;
                }
            }

        } catch (e) {
            console.log('PlayVod_loadDataError e ' + e);
        }

        PlayVod_loadingDataTry++;
        if (PlayVod_loadingDataTry < PlayVod_loadingDataTryMax) {
            PlayVod_loadingDataTimeout += 250;
            PlayVod_loadDataRequest();
        } else {
            if (Main_IsNotBrowser) {
                Play_HideBufferDialog();
                Play_PlayEndStart(2);
            } else PlayVod_loadDataSuccessFake();
        }
    }
}

//Browsers crash trying to get the streams link
function PlayVod_loadDataSuccessFake() {
    PlayVod_qualities = tempQualities;

    PlayVod_state = Play_STATE_PLAYING;
    if (PlayVod_isOn) PlayVod_qualityChanged();
}

function PlayVod_loadDataSuccess(responseText) {
    if (PlayVod_state === Play_STATE_LOADING_TOKEN) {

        try {

            PlayVod_tokenResponse = JSON.parse(responseText).data.videoPlaybackAccessToken;

        } catch (e) {
            PlayVod_tokenResponse = null;
            console.log('PlayVod_loadDataSuccess e ' + e);
        }

        PlayVod_state = Play_STATE_LOADING_PLAYLIST;
        PlayVod_loadData();

    } else if (PlayVod_state === Play_STATE_LOADING_PLAYLIST) {
        PlayVod_playlistResponse = responseText;
        PlayVod_qualities = Play_extractQualities(PlayVod_playlistResponse);
        PlayVod_state = Play_STATE_PLAYING;
        if (PlayVod_isOn) PlayVod_qualityChanged();
    }
}

function PlayVod_loadDataCheckSub() {
    if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckSub();
    } else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOOAUTH);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
}

function PlayVod_NotSub() {
    Play_HideBufferDialog();
    Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_NOT_SUB);
    window.setTimeout(function() {
        if (PlayVod_isOn) PlayVod_shutdownStream();
    }, 4000);
}

function PlayVod_isSub() {
    if (!PlayVod_WasSubChekd) {
        // Do one more try before failing, because the access_token may be expired on the first treys
        // the PlayVod_loadData can't check if is expired, but the AddCode_RequestCheckSub can
        // and will refresh the token if it fail, so just to be shore run the PlayVod_loadData one more time
        PlayVod_WasSubChekd = true;
        PlayVod_state = Play_STATE_LOADING_TOKEN;
        PlayVod_loadData();
    } else {
        Play_HideBufferDialog();
        Play_showWarningDialog(STR_IS_SUB_ONLY + STR_IS_SUB_IS_SUB + STR_410_FEATURING);
        window.setTimeout(function() {
            if (PlayVod_isOn) PlayVod_shutdownStream();
        }, 4000);
    }
}

function PlayVod_qualityChanged() {
    window.clearInterval(PlayVod_streamCheckId);
    PlayVod_qualityIndex = 0;
    PlayVod_playingUrl = PlayVod_qualities[0].url;

    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
            PlayVod_playingUrl = PlayVod_qualities[i].url;
        }
    }

    PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;
    PlayVod_qualityPlaying = PlayVod_quality;

    PlayVod_SetHtmlQuality('stream_quality', true);
    Play_onPlayerCounter = 0;
    PlayVod_onPlayer();
    //Play_PannelEndStart(2);
}

var PlayVod_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        PlayVod_bufferingcomplete = false;
        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        if (!Main_isReleased) console.log('onbufferingstart:', 'date: ' + (new Date()));
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        PlayVod_bufferingcomplete = true;
        // reset the values after using
        PlayVod_SaveOffset();
        PlayVod_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        if (!Main_isReleased) console.log('onbufferingcomplete:', 'date: ' + (new Date()));
    },
    onbufferingprogress: function(percent) {
        if (percent < 5) PlayVod_PlayerCheckCount = 0;

        Play_PlayerCheckTimer = PlayVod_Buffer;
        PlayVod_PlayerCheckQualityChanged = true;
        //percent has a -2 offset and goes up to 98
        if (percent < 98) {
            Play_BufferPercentage = percent;
            if (!Play_BufferDialogVisible()) Play_showBufferDialog();
        } else {
            Play_BufferPercentage = 0;
            Play_HideBufferDialog();
            Play_bufferingcomplete = true;
            // reset the values after using
            Main_values.vodOffset = 0;
            if (!Main_isReleased) console.log('onbufferingprogress > 98:', 'date: ' + (new Date()));
        }
    },
    oncurrentplaytime: function(currentTime) {
        if (PlayVod_currentTime !== currentTime) PlayVod_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_PannelEndStart(2);
    },
    onerror: function(eventType) {
        if (!Main_isReleased) console.log('onerror:', 'date: ' + (new Date()) + ' eventType: ' + eventType);
        if (eventType === "PLAYER_ERROR_CONNECTION_FAILED" || eventType === "PLAYER_ERROR_INVALID_URI")
            Play_PannelEndStart(2);
    }
};

function PlayVod_onPlayer() {
    Play_showBufferDialog();

    if (!Main_isReleased) {
        console.log('PlayVod_onPlayer:', 'date: ' + (new Date()));
        console.log('PlayVod_onPlayer:', '\n' + '\n"' + PlayVod_playingUrl + '"\n');
    }

    if (Main_IsNotBrowser) {
        try {
            Play_avplay.stop();
            Play_avplay.close();
            Play_avplay.open(PlayVod_playingUrl);
        } catch (e) {
            console.log('PlayVod_onPlayer open ' + e);
        }

        if (Main_values.vodOffset > ChannelVod_DurationSeconds) Main_values.vodOffset = 0;

        if (Main_values.vodOffset && !PlayVod_replay) {
            Chat_offset = Main_values.vodOffset;
            Chat_Init();
            Play_avplay.seekTo(Main_values.vodOffset * 1000);
        }
        PlayVod_replay = false;

        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayVod_Buffer);
        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayVod_Buffer);
        Play_SetFullScreen(Play_isFullScreen);
        Play_avplay.setListener(PlayVod_listener);

        Play_avplay.prepareAsync(function() { //successCallback
            if (!Main_isReleased) console.log('Play_avplay.prepareAsync Vod OK:', 'date: ' + (new Date()));
            Play_avplay.play();
            ChannelVod_DurationSeconds = Play_avplay.getDuration() / 1000;
            Main_textContent('progress_bar_duration', Play_timeS(ChannelVod_DurationSeconds));
            if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();

            PlayVod_PlayerCheckCount = 0;
            Play_PlayerCheckTimer = 3 + (PlayVod_Buffer * 2);
            PlayVod_PlayerCheckQualityChanged = false;
            window.clearInterval(PlayVod_streamCheckId);
            PlayVod_streamCheckId = window.setInterval(PlayVod_PlayerCheck, Play_PlayerCheckInterval);

        }, function() { //errorCallback

            if (!Main_isReleased) console.log('Play_avplay.prepareAsync Vod NOK:', 'date: ' + (new Date()));
            Play_onPlayerCounter++;
            if (Play_onPlayerCounter < 5) PlayVod_onPlayer();
            else {
                if (!Main_isReleased) console.log('Play_avplay.prepareAsync Vod fail too mutch exit:', 'date: ' + (new Date()));
                Play_EndStart(false, 2);
            }

        });


    }
}

function PlayVod_PlayerCheck() {
    if (PlayVod_isOn && PlayVod_PlayerTime === PlayVod_currentTime && Play_isIdleOrPlaying()) {
        PlayVod_PlayerCheckCount++;
        if (PlayVod_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry, and don't change if in Auto mode
            if (PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun &&
                (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) && (PlayVod_quality.indexOf("Auto") === -1))
                PlayVod_qualityIndex++;
            else if (!PlayVod_PlayerCheckQualityChanged && PlayVod_PlayerCheckRun) PlayVod_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 2);
            else if (PlayVod_PlayerCheckCounter > 1) Play_CheckConnection(PlayVod_PlayerCheckCounter, 2, PlayVod_DropOneQuality);
            else {
                PlayVod_qualityDisplay();
                if (Main_IsNotBrowser && !Main_values.vodOffset) Main_values.vodOffset = Play_avplay.getCurrentTime() / 1000;
                PlayVod_qualityChanged();
                PlayVod_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayVod_PlayerCheckCounter = 0;
        PlayVod_PlayerCheckCount = 0;
        PlayVod_PlayerCheckRun = false;
    }

    PlayVod_PlayerTime = PlayVod_currentTime;
}

function PlayVod_updateCurrentTime(currentTime) {
    PlayVod_currentTime = currentTime;

    if (!Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (PlayVod_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    if (Play_isPanelShown() && !Play_BufferDialogVisible())
        PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, !PlayVod_IsJumping);
}

function PlayVod_DropOneQuality(ConnectionDrop) {
    if (!ConnectionDrop) {
        if (PlayVod_qualityIndex < PlayVod_getQualitiesCount() - 1) PlayVod_qualityIndex++;
        else {
            Play_EndStart(false, 2);
            return;
        }
    }

    PlayVod_PlayerCheckCounter = 0;
    PlayVod_qualityDisplay();
    if (Main_IsNotBrowser && !Main_values.vodOffset) Main_values.vodOffset = Play_avplay.getCurrentTime() / 1000;
    PlayVod_qualityChanged();
    PlayVod_PlayerCheckRun = true;
}

function PlayVod_shutdownStream() {
    if (PlayVod_isOn) {
        PlayVod_qualities = [];
        PlayVod_PreshutdownStream(true);
        Play_exitMain();
    }
}

function PlayVod_PreshutdownStream(saveOffset) {
    if (saveOffset) PlayVod_SaveVodIds();
    if (Main_IsNotBrowser) Play_offPlayer();
    Main_ShowElement('controls_holder');
    Main_ShowElement('progress_pause_holder');
    PlayVod_isOn = false;
    window.clearInterval(PlayVod_SaveOffsetId);
    window.clearInterval(PlayVod_updateStreamInfId);
    Main_values.Play_WasPlaying = 0;
    Chat_Clear();
    UserLiveFeed_Hide(true);
    Play_ClearPlayer();
    PlayVod_ClearVod();
}

function PlayVod_ClearVod() {
    document.body.removeEventListener("keydown", PlayVod_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayVod_Resume);
    Main_values.vodOffset = 0;
    window.clearInterval(PlayVod_streamInfoTimerId);
    window.clearInterval(PlayVod_streamCheckId);
    ChannelVod_DurationSeconds = 0;
}

function PlayVod_hidePanel() {
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    Play_ForceHidePannel();
    PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    PlayVod_quality = PlayVod_qualityPlaying;
}

function PlayVod_showPanel(autoHide) {
    PlayVod_ProgresBarrUpdate((PlayVod_currentTime / 1000), ChannelVod_DurationSeconds, true);
    Play_clock();
    Play_CleanHideExit();
    if (autoHide) {
        PlayVod_IconsBottonResetFocus();
        PlayVod_qualityIndexReset();
        PlayVod_qualityDisplay();
        PlayVod_SetHtmlQuality('stream_quality', true);
        Play_clearHidePanel();
        PlayVod_setHidePanel();
    }
    Play_ForceShowPannel();
}

function PlayVod_IconsBottonResetFocus() {
    PlayVod_PanelY = 1;
    PlayClip_EnterPos = 0;
    PlayVod_IconsBottonFocus();
}

function PlayVod_IconsBottonFocus() {
    if (PlayVod_PanelY < 0) {
        PlayVod_PanelY = 0;
        return;
    }
    Main_RemoveClass('pause_button', 'progress_bar_div_focus');
    Main_RemoveClass('next_button', 'progress_bar_div_focus');
    Main_RemoveClass('back_button', 'progress_bar_div_focus');
    Main_RemoveClass('progress_bar_div', 'progress_bar_div_focus');

    if (!PlayVod_PanelY) { //progress_bar
        Main_AddClass('progress_bar_div', 'progress_bar_div_focus');
        Play_IconsRemoveFocus();
        if (PlayVod_addToJump) {
            PlayVod_jumpTime();
            document.getElementById('progress_bar_steps').style.display = 'inline-block';
        }
    } else if (PlayVod_PanelY === 1) { //pause/next/back buttons
        if (!PlayClip_EnterPos) { //pause
            Main_AddClass('pause_button', 'progress_bar_div_focus');
        } else if (PlayClip_EnterPos === 1) { //next
            Main_AddClass('next_button', 'progress_bar_div_focus');
        } else if (PlayClip_EnterPos === -1) { //back
            Main_AddClass('back_button', 'progress_bar_div_focus');
        }

        Play_IconsRemoveFocus();
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
    } else if (PlayVod_PanelY === 2) { //botton icons
        Play_IconsAddFocus();
        Main_innerHTML('progress_bar_jump_to', STR_SPACE);
        document.getElementById('progress_bar_steps').style.display = 'none';
    }
}

function PlayVod_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayVod_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
}

function PlayVod_qualityIndexReset() {
    PlayVod_qualityIndex = 0;
    for (var i = 0; i < PlayVod_getQualitiesCount(); i++) {
        if (PlayVod_qualities[i].id === PlayVod_quality) {
            PlayVod_qualityIndex = i;
            break;
        } else if (PlayVod_qualities[i].id.indexOf(PlayVod_quality) !== -1) { //make shore to set a value before break out
            PlayVod_qualityIndex = i;
        }
    }
}

function PlayVod_qualityDisplay() {
    if (PlayVod_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!PlayVod_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (PlayVod_qualityIndex === PlayVod_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    PlayVod_SetHtmlQuality('controls_name_' + Play_controlsQuality);
}

function PlayVod_SetHtmlQuality(element) {
    if (!PlayVod_qualities[PlayVod_qualityIndex] || !PlayVod_qualities[PlayVod_qualityIndex].hasOwnProperty('id')) return;

    PlayVod_quality = PlayVod_qualities[PlayVod_qualityIndex].id;

    var quality_string = '';
    if (PlayVod_quality.indexOf('source') !== -1) quality_string = PlayVod_quality.replace("source", STR_SOURCE);
    else quality_string = PlayVod_quality;

    quality_string += PlayVod_qualities[PlayVod_qualityIndex].band + PlayVod_qualities[PlayVod_qualityIndex].codec;

    Main_textContent(element, quality_string);
}

function PlayVod_getQualitiesCount() {
    return PlayVod_qualities.length;
}

function PlayVod_ProgresBarrUpdate(current_time_seconds, duration_seconds, update_bar) {
    Main_textContent('progress_bar_current_time', Play_timeS(current_time_seconds));
    if (update_bar) Play_ProgresBarrElm.style.width = ((current_time_seconds / duration_seconds) * 100) + '%';
}

function PlayVod_jump() {
    if (Play_BufferDialogVisible()) {
        Play_IsWarning = true;
        Play_showWarningDialog(STR_JUMP_BUFFER_WARNING);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 1000);
        return;
    }

    Play_clearPause();
    if (!Play_isEndDialogVisible() && Main_IsNotBrowser) {
        if (Play_isIdleOrPlaying()) Play_avplay.pause();

        try {
            Play_avplay.seekTo((PlayVod_TimeToJump > 0) ? (PlayVod_TimeToJump * 1000) : 0);
        } catch (e) {
            Play_HideWarningDialog();
            console.log('PlayVod_jump ' + e);
            return;
        }

        PlayVod_PlayerCheckQualityChanged = false;
        PlayClip_PlayerCheckQualityChanged = false;

        //Save in case we crash or something related
        PlayVod_currentTime = PlayVod_TimeToJump * 1000;
        PlayVod_SaveVodIds();

        if (PlayVod_isOn) Chat_offset = PlayVod_TimeToJump;
        else Chat_offset = ChannelVod_vodOffset;

        if (PlayClip_HasVOD) Chat_Init();
        if (!Play_isIdleOrPlaying()) Play_avplay.play();

    }
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
    Main_innerHTML('pause_button', '<div ><i class="pause_button3d icon-pause"></i> </div>');
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    PlayVod_TimeToJump = 0;
}

function PlayVod_SizeClear() {
    PlayVod_jumpCount = 0;
    PlayVod_StepsCount = 0;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
}

function PlayVod_jumpSteps(duration_seconds) {
    if (PlayVod_addToJump && !PlayVod_PanelY) document.getElementById('progress_bar_steps').style.display = 'inline-block';
    if (Math.abs(duration_seconds) > 60)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + (duration_seconds / 60) + STR_MINUTES);
    else if (duration_seconds)
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + duration_seconds + STR_SECONDS);
    else
        Main_textContent('progress_bar_steps', STR_JUMPING_STEP + Play_DefaultjumpTimers[1] + STR_SECONDS);
}

function PlayVod_jumpTime() {
    Main_textContent('progress_bar_jump_to', STR_JUMP_TIME + ' (' + (PlayVod_addToJump < 0 ? '-' : '') + Play_timeS(Math.abs(PlayVod_addToJump)) + ')' + STR_JUMP_T0 + Play_timeS(PlayVod_TimeToJump));
}

function PlayVod_jumpStart(multiplier, duration_seconds) {
    var currentTime = Main_IsNotBrowser ? (Play_avplay.getCurrentTime() / 1000) : 0;

    window.clearTimeout(PlayVod_SizeClearID);
    PlayVod_IsJumping = true;

    if (PlayVod_jumpCount < (Play_DefaultjumpTimers.length - 1) && (PlayVod_StepsCount++ % 6) === 0) PlayVod_jumpCount++;

    PlayVod_addToJump += Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier;
    PlayVod_TimeToJump = currentTime + PlayVod_addToJump;

    //hls jump/seek time in avplay is "10 base", jump/seek to 1:53:53 will jump to 1:53:50, round to show then
    if (PlayVod_isOn) PlayVod_TimeToJump = Math.floor(PlayVod_TimeToJump / 10) * 10;

    if (PlayVod_TimeToJump > duration_seconds) {
        PlayVod_addToJump = duration_seconds - currentTime - Play_DefaultjumpTimers[1];
        PlayVod_TimeToJump = currentTime + PlayVod_addToJump;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
    } else if (PlayVod_TimeToJump < 0) {
        PlayVod_addToJump = 0 - currentTime;
        PlayVod_jumpCount = 0;
        PlayVod_StepsCount = 0;
        PlayVod_TimeToJump = 0;
    }

    PlayVod_jumpTime();
    Play_ProgresBarrElm.style.width = ((PlayVod_TimeToJump / duration_seconds) * 100) + '%';
    PlayVod_jumpSteps(Play_DefaultjumpTimers[PlayVod_jumpCount] * multiplier);

    PlayVod_SizeClearID = window.setTimeout(PlayVod_SizeClear, 1000);
}

function PlayVod_SaveVodIds() {
    var time = PlayVod_currentTime / 1000;

    var vod_id = '#' + Main_values.ChannelVod_vodId; // prevent only numeric key, that makes the obj be shorted

    if (time > 300 && time < (ChannelVod_DurationSeconds - 300)) { //time too small don't save

        //delete before save to add this to the end, and prevent loose it in restorevodids
        if (PlayVod_VodIds[vod_id]) delete PlayVod_VodIds[vod_id];

        PlayVod_VodIds[vod_id] = time;
        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));

    } else if (time > (ChannelVod_DurationSeconds - 300) && PlayVod_VodIds[vod_id]) {

        //if ended or almost delete
        delete PlayVod_VodIds[vod_id];

        Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
    }
}

function PlayVod_RestoreVodIds() {
    PlayVod_VodIds = Main_getItemJson('PlayVod_VodIds', {});

    //Prevent too big obj in storage
    var size = PlayVod_VodIdsSize();
    if (size > 250) PlayVod_CleanVodIds(size - 250);
}

function PlayVod_VodIdsSize() {
    var size = 0;
    for (var key in PlayVod_VodIds) {
        if (PlayVod_VodIds.hasOwnProperty(key)) size++;
    }
    return size;
}

function PlayVod_CleanVodIds(quantity) {
    var position = 0;
    for (var key in PlayVod_VodIds) {
        if (position < quantity) delete PlayVod_VodIds[key];
        else break;
        position++;
    }
    Main_setItem('PlayVod_VodIds', JSON.stringify(PlayVod_VodIds));
}

function Play_showVodDialog() {
    Main_HideElement('controls_holder');
    PlayVod_showPanel(false);
    Main_textContent('stream_quality', '');
    Main_innerHTML("dialog_vod_saved_text", STR_FROM + Play_timeMs(PlayVod_VodIds['#' + Main_values.ChannelVod_vodId] * 1000));
    Main_ShowElement('dialog_vod_start');
}

function Play_HideVodDialog() {
    PlayVod_hidePanel();
    Main_HideElement('dialog_vod_start');
    PlayVod_IconsResetFocus();
    window.setTimeout(function() {
        Main_ShowElement('controls_holder');
    }, 1000);
}

function Play_isVodDialogShown() {
    return Main_isElementShowing('dialog_vod_start');
}

function PlayVod_IconsResetFocus() {
    PlayVod_IconsRemoveFocus();
    PlayVod_VodPositions = 0;
    PlayVod_IconsAddFocus();
}

function PlayVod_IconsAddFocus() {
    Main_AddClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_IconsRemoveFocus() {
    Main_RemoveClass('dialog_vod_' + PlayVod_VodPositions, 'dialog_end_icons_focus');
}

function PlayVod_DialogPressed(fromStart) {
    Play_HideVodDialog();
    Play_showBufferDialog();
    Main_ready(function() {
        if (!fromStart) {
            Main_values.vodOffset = PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
            PlayVod_currentTime = Main_values.vodOffset * 1000;
            PlayVod_ProgresBarrUpdate(Main_values.vodOffset, ChannelVod_DurationSeconds, true);
            PlayVod_PosStart();
        } else {
            delete PlayVod_VodIds['#' + Main_values.ChannelVod_vodId];
            Main_values.vodOffset = 0;
            PlayVod_Start();
        }
    });
}

function PlayVod_OpenLiveStream() {
    PlayVod_PreshutdownStream(true);
    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, PlayVod_handleKeyDown);
}

function PlayVod_handleKeyDown(e) {
    if (PlayVod_state !== Play_STATE_PLAYING && !Play_isVodDialogShown()) {
        switch (e.keyCode) {
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                if (Play_ExitDialogVisible() || Play_SingleClickExit) {
                    Play_CleanHideExit();
                    PlayVod_shutdownStream();
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
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, -1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < 0) Play_Endcounter = 3;
                    if (Play_Endcounter === 1) Play_Endcounter = 0;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) {
                    PlayVod_showPanel(true);
                    PlayVod_PanelY = 0;
                    PlayVod_IconsBottonFocus();
                    Play_clearHidePanel();
                    PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                    PlayVod_ProgressBaroffset = 2500;
                    PlayVod_setHidePanel();
                }
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow() && (!Play_EndFocus || !Play_isEndDialogVisible())) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    PlayVod_showPanel(true);
                    PlayVod_PanelY = 0;
                    PlayVod_IconsBottonFocus();
                    Play_clearHidePanel();
                    PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                    PlayVod_ProgressBaroffset = 2500;
                    PlayVod_setHidePanel();
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(2, 1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    }
                    PlayVod_setHidePanel();
                } else if (Play_isVodDialogShown()) {
                    PlayVod_IconsRemoveFocus();
                    if (PlayVod_VodPositions) PlayVod_VodPositions--;
                    else PlayVod_VodPositions++;
                    PlayVod_IconsAddFocus();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = 0;
                    if (Play_Endcounter === 1) Play_Endcounter = 2;
                    Play_EndIconsAddFocus();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    document.body.removeEventListener("keydown", PlayVod_handleKeyDown, false);
                    document.body.addEventListener("keyup", Play_handleKeyUp, false);
                    Play_EndUpclear = false;
                    Play_EndUpclearCalback = PlayVod_handleKeyDown;
                    Play_EndUpclearID = window.setTimeout(Play_keyUpEnd, 250);
                } else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(2, 1);
                    PlayVod_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefresh();
                else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndDialogUpDown();
                else if (Play_isPanelShown() && !Play_isVodDialogShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(2, -1);
                    PlayVod_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_KeyChatSizeChage();
                } else if (!Play_isVodDialogShown()) PlayVod_showPanel(true);
                break;
            case KEY_ENTER:
                if (Play_isVodDialogShown()) PlayVod_DialogPressed(PlayVod_VodPositions);
                else if (Play_isEndDialogVisible()) {
                    if (Play_EndFocus) Play_EndDialogPressed(2);
                    else {
                        Play_EndDialogEnter = 2;
                        Play_EndUpclearCalback = PlayVod_handleKeyDown;
                        Play_SavePlayData();
                        Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                    }
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (!PlayVod_PanelY) {
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) {
                        if (!Main_values.Play_ChatForceDisable) {
                            if (Play_isNotplaying()) Chat_Play(Chat_Id[0]);
                            else Chat_Pause();
                        }
                        if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                    } else Play_BottomOptionsPressed(2);
                    PlayVod_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) Play_CheckIfIsLiveStart(PlayVod_OpenLiveStream);
                else PlayVod_showPanel(true);
                break;
            case KEY_RETURN_Q:
            case KEY_KEYBOARD_BACKSPACE:
            case KEY_RETURN:
                Play_KeyReturn(true);
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Play(Chat_Id[0]);
                }
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Pause();
                }
                break;
            case KEY_PLAYPAUSE:
            case KEY_KEYBOARD_SPACE:
                if (!Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id[0]);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(2);
                break;
            case KEY_INFO:
            case KEY_REFRESH:
                Play_controls[Play_controlsChat].enterKey(2);
                break;
            case KEY_PG_UP:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(2, 1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_PG_DOWN:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(2, -1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_MEDIAREWIND:
                if (!Play_isPanelShown()) {
                    PlayVod_showPanel(true);
                    PlayVod_PanelY = 0;
                    PlayVod_IconsBottonFocus();
                }
                Play_clearHidePanel();
                PlayVod_jumpStart(-1, ChannelVod_DurationSeconds);
                PlayVod_ProgressBaroffset = 2500;
                PlayVod_setHidePanel();
                break;
            case KEY_MEDIAFASTFORWARD:
                if (!Play_isPanelShown()) {
                    PlayVod_showPanel(true);
                    PlayVod_PanelY = 0;
                    PlayVod_IconsBottonFocus();
                }
                Play_clearHidePanel();
                PlayVod_jumpStart(1, ChannelVod_DurationSeconds);
                PlayVod_ProgressBaroffset = 2500;
                PlayVod_setHidePanel();
                break;
            case KEY_STOP:
                Play_hideChat();
                PlayVod_shutdownStream();
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
