//Variable initialization
var PlayClip_PlayerTime = 0;
var PlayClip_streamCheckId = null;
var PlayClip_PlayerCheckCount = 0;
var PlayClip_IsJumping = false;
var PlayClip_jumpCount = 0;
var PlayClip_TimeToJump = 0;
var PlayClip_isOn = false;
var PlayClip_loadingDataTry = 0;
var PlayClip_loadingDataTimeout = 2000;
var PlayClip_loadingDataTryMax = 5;
var PlayClip_quality = 'source';
var PlayClip_qualityPlaying = PlayClip_quality;
var PlayClip_qualityIndex = 0;
var PlayClip_qualities = [];
var PlayClip_playingUrl = '';
var PlayClip_replay = false;
var PlayClip_currentTime = 0;
var PlayClip_offsettime = 0;
var PlayClip_state = 0;
var PlayClip_STATE_PLAYING = 1;
var PlayClip_HasVOD = false;
var PlayClip_PlayerCheckCounter = 0;
var PlayClip_PlayerCheckQualityChanged = false;
var PlayClip_PlayerCheckRun = false;
var PlayClip_Buffer = 2000;

var PlayClip_jumpTimers = [0, 5];
var PlayClip_DurationSeconds = 0;

var PlayClip_HasNext = false;
var PlayClip_HasBack = false;
var PlayClip_HideShowNextDiv = ['next_button', 'back_button'];
var PlayClip_EnterPos = 0;
var PlayClip_All = false;
var PlayClip_All_Forced = true;

var PlayClip_bufferingcomplete = false;
//Variable initialization end

function PlayClip_Start() {
    Play_showBufferDialog();
    Play_HideEndDialog();
    Play_LoadLogo(document.getElementById('stream_info_icon'), Main_values.Main_selectedChannelLogo);
    Main_textContent("stream_info_name", Main_values.Main_selectedChannelDisplayname);
    Main_innerHTML("stream_info_title", ChannelClip_title);
    Main_innerHTML("stream_info_game", ChannelClip_game + ' ' + ChannelClip_views + ' ' + ChannelClip_language);
    Main_textContent("stream_live_icon", ChannelClip_createdAt);
    Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
    Play_DefaultjumpTimers = PlayClip_jumpTimers;
    PlayVod_jumpSteps(Play_DefaultjumpTimers[1]);
    Main_replaceClassEmoji('stream_info_title');

    Main_values.Play_isHost = false;
    Play_CurrentSpeed = 3;

    Main_textContent('progress_bar_current_time', Play_timeS(0));
    Main_textContent("stream_live_time", '');
    Main_textContent("stream_watching_time", '');
    PlayClip_HasVOD = Main_values.ChannelVod_vodId !== null;
    Chat_title = STR_CLIP + '.';
    if (PlayClip_HasVOD) {
        Chat_offset = ChannelVod_vodOffset;
        Chat_Init();
    } else Chat_NoVod();
    Main_innerHTML('pause_button', '<div style="transform: translateY(10%);"><i class="pause_button3d icon-pause"></i> </div>');
    Main_ShowElement('progress_bar_div');
    PlayClip_SetOpenVod();
    Main_ShowElement('controls_holder');

    PlayClip_offsettime = 0;
    PlayClip_PlayerCheckCounter = 0;
    PlayClip_PlayerCheckCount = 0;
    window.clearInterval(PlayClip_streamCheckId);
    PlayClip_PlayerCheckRun = false;
    Play_PlayerPanelOffset = -13;
    PlayClip_state = 0;
    PlayClip_currentTime = 0;
    PlayClip_qualityIndex = 2;
    PlayClip_UpdateNext();
    Play_EndSet(3);
    Play_IsWarning = false;
    Play_IconsResetFocus();

    if (AddUser_UserIsSet()) {
        AddCode_PlayRequest = true;
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_CheckFallow();
    } else Play_hideFallow();

    document.addEventListener('visibilitychange', PlayClip_Resume, false);
    PlayClip_IsJumping = false;
    PlayClip_jumpCount = 0;
    PlayClip_TimeToJump = 0;
    PlayClip_isOn = true;

    PlayClip_loadData();
    document.body.removeEventListener("keyup", Main_handleKeyUp);
}

function PlayClip_loadData() {
    PlayClip_loadingDataTry = 0;
    PlayClip_loadingDataTimeout = 2000;
    PlayClip_loadDataRequest();
}

function PlayClip_loadDataRequest() {
    var theUrl = (!Main_IsNotBrowser ? proxyurl : '') + 'https://clips.twitch.tv/api/v2/clips/' + ChannelClip_playUrl + '/status';

    BasexmlHttpGet(theUrl, PlayClip_loadingDataTimeout, 1, null, PlayClip_QualityGenerate, PlayClip_loadDataError, true);
}

function PlayClip_loadDataError() {
    PlayClip_loadingDataTry++;
    if (PlayClip_loadingDataTry < PlayClip_loadingDataTryMax) {
        PlayClip_loadingDataTimeout += 250;
        PlayClip_loadDataRequest();
    } else {
        Play_HideBufferDialog();
        Play_PlayEndStart(3);
    }
}

var PlayClip_listener = {
    onbufferingstart: function() {
        Play_showBufferDialog();
        PlayClip_bufferingcomplete = false;
        PlayClip_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        PlayClip_PlayerCheckQualityChanged = true;
        if (!Main_isReleased) console.log('onbufferingstart:', 'date: ' + (new Date()));
    },
    onbufferingcomplete: function() {
        Play_HideBufferDialog();
        PlayClip_bufferingcomplete = true;
        Main_empty('dialog_buffer_play_percentage');
        // reset the values after using
        PlayClip_offsettime = 0;
        PlayClip_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = Play_Buffer;
        PlayClip_PlayerCheckQualityChanged = true;
        if (!Main_isReleased) console.log('onbufferingcomplete:', 'date: ' + (new Date()));
    },
    onbufferingprogress: function(percent) {
        if (percent < 5) PlayClip_PlayerCheckCount = 0;

        Play_PlayerCheckTimer = Play_Buffer;
        PlayClip_PlayerCheckQualityChanged = true;

        //percent has a -2 offset and goes up to 98
        if (percent < 98) {
            Play_BufferPercentage = percent;
            Main_textContent("dialog_buffer_play_percentage", percent + 3);
            if (!Play_BufferDialogVisible()) Play_showBufferDialog();
        } else {
            Play_BufferPercentage = 0;
            Play_HideBufferDialog();
            Play_bufferingcomplete = true;
            Main_empty('dialog_buffer_play_percentage');
            // reset the values after using
            PlayClip_offsettime = 0;
            if (!Main_isReleased) console.log('onbufferingprogress > 98:', 'date: ' + (new Date()));
        }
    },
    oncurrentplaytime: function(currentTime) {
        if (PlayClip_currentTime !== currentTime) PlayClip_updateCurrentTime(currentTime);
    },
    onstreamcompleted: function() {
        Play_PannelEndStart(3);
    },
    onerror: function(eventType) {
        if (!Main_isReleased) console.log('onerror:', 'date: ' + (new Date()) + ' eventType: ' + eventType);
        if (eventType === "PLAYER_ERROR_CONNECTION_FAILED" || eventType === "PLAYER_ERROR_INVALID_URI")
            Play_PannelEndStart(3);
    }
};

function PlayClip_QualityGenerate(response) {
    PlayClip_qualities = [];

    response = JSON.parse(response).quality_options;

    for (var i = 0; i < response.length; i++) {

        if (!PlayClip_qualities.length) {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | source | mp4',
                'url': response[i].source
            });
        } else {
            PlayClip_qualities.push({
                'id': response[i].quality + 'p' + PlayClip_FrameRate(response[i].frame_rate) + ' | mp4',
                'url': response[i].source
            });
        }
    }

    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_qualityChanged();
}

function PlayClip_FrameRate(value) {
    if (value > 40) return 60;
    else return '';
}

function PlayClip_qualityChanged() {
    window.clearInterval(PlayClip_streamCheckId);
    PlayClip_qualityIndex = 0;
    PlayClip_playingUrl = PlayClip_qualities[0].url;
    if (PlayClip_quality.indexOf("source") !== -1) PlayClip_quality = "source";
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
            PlayClip_playingUrl = PlayClip_qualities[i].url;
        }
    }

    PlayClip_qualityPlaying = PlayClip_quality;
    if (Main_isDebug) console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
    PlayClip_state = PlayClip_STATE_PLAYING;
    PlayClip_SetHtmlQuality('stream_quality');

    PlayClip_replay = false;
    PlayClip_onPlayer();
}

function PlayClip_onPlayer() {
    Play_showBufferDialog();

    if (!Main_isReleased) {
        console.log('PlayClip_onPlayer:', 'date: ' + (new Date()));
        console.log('PlayClip_onPlayer:', '\n' + '\n"' + PlayClip_playingUrl + '"\n');
    }

    if (Main_IsNotBrowser) {
        try {
            Play_avplay.stop();
            Play_avplay.close();
            Play_avplay.open(PlayClip_playingUrl);
        } catch (e) {
            console.log('PlayClip_onPlayer open ' + e);
        }

        if (PlayClip_offsettime > 0 && PlayClip_offsettime !== Play_avplay.getCurrentTime()) {
            try {
                Play_avplay.seekTo(PlayClip_offsettime - 3500); // minor delay on the seekTo to show were it stop or at least before
            } catch (e) {
                console.log('PlayClip_onPlayer seekTo ' + e);
            }
            Play_clearPause();
        }

        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_PLAY", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayClip_Buffer);
        Play_avplay.setBufferingParam("PLAYER_BUFFER_FOR_RESUME", "PLAYER_BUFFER_SIZE_IN_SECOND", PlayClip_Buffer);
        Play_SetFullScreen(Play_isFullScreen);
        Play_avplay.setListener(PlayClip_listener);

        Play_avplay.prepareAsync(function() { //successCallback
            Play_avplay.play();
            PlayClip_DurationSeconds = Play_avplay.getDuration() / 1000;
            Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
            if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        }, function() { //errorCallback
            Play_avplay.prepare();
            Play_avplay.play();
            PlayClip_DurationSeconds = Play_avplay.getDuration() / 1000;
            Main_textContent('progress_bar_duration', Play_timeS(PlayClip_DurationSeconds));
            if (Play_ChatEnable && !Play_isChatShown()) Play_showChat();
        });


        PlayClip_PlayerCheckCount = 0;
        Play_PlayerCheckTimer = 1 + (PlayClip_Buffer * 2);
        PlayClip_PlayerCheckQualityChanged = false;
        window.clearInterval(PlayClip_streamCheckId);
        PlayClip_streamCheckId = window.setInterval(PlayClip_PlayerCheck, Play_PlayerCheckInterval);
    }
}

function PlayClip_Resume() {
    if (document.hidden) PlayClip_shutdownStream();
}

function PlayClip_PlayerCheck() {
    if (PlayClip_isOn && PlayClip_PlayerTime === PlayClip_currentTime && Play_isIdleOrPlaying()) {
        PlayClip_PlayerCheckCount++;
        if (PlayClip_PlayerCheckCount > Play_PlayerCheckTimer) {

            //Don't change the first time only retry
            if (PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun && (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1)) PlayClip_qualityIndex++;
            else if (!PlayClip_PlayerCheckQualityChanged && PlayClip_PlayerCheckRun) PlayClip_PlayerCheckCounter++;

            if (!navigator.onLine) Play_EndStart(false, 3);
            else if (PlayClip_PlayerCheckCounter > 1) Play_CheckConnection(PlayClip_PlayerCheckCounter, 3, PlayClip_DropOneQuality);
            else {
                PlayClip_qualityDisplay();
                if (!PlayClip_offsettime) PlayClip_offsettime = Play_avplay.getCurrentTime();
                PlayClip_qualityChanged();
                PlayClip_PlayerCheckRun = true;
            }

        } // else we try for too long let the listener onerror catch it
    } else {
        PlayClip_PlayerCheckCounter = 0;
        PlayClip_PlayerCheckCount = 0;
        PlayClip_PlayerCheckRun = false;

    }

    PlayClip_PlayerTime = PlayClip_currentTime;
}

function PlayClip_DropOneQuality(ConnectionDrop) {

    if (!ConnectionDrop) {
        if (PlayClip_qualityIndex < PlayClip_getQualitiesCount() - 1) PlayClip_qualityIndex++;
        else {
            Play_EndStart(false, 3);
            return;
        }
    }

    PlayClip_PlayerCheckCounter = 0;
    PlayClip_qualityDisplay();
    if (!PlayClip_offsettime) PlayClip_offsettime = Play_avplay.getCurrentTime();
    PlayClip_qualityChanged();
    PlayClip_PlayerCheckRun = true;
}

function PlayClip_updateCurrentTime(currentTime) {
    PlayClip_currentTime = currentTime;
    if (PlayClip_HasVOD) PlayVod_currentTime = PlayClip_currentTime + (ChannelVod_vodOffset * 1000);

    if (!Play_IsWarning && Play_WarningDialogVisible()) Play_HideWarningDialog();
    if (PlayClip_bufferingcomplete && Play_BufferDialogVisible()) Play_HideBufferDialog();

    if (Play_isPanelShown() && !Play_BufferDialogVisible())
        PlayVod_ProgresBarrUpdate((PlayClip_currentTime / 1000), PlayClip_DurationSeconds, !PlayVod_IsJumping);
}

function PlayClip_shutdownStream() {
    if (PlayClip_isOn) {
        PlayClip_All = false;
        PlayClip_PreshutdownStream();
        Play_CleanHideExit();
        Play_exitMain();
    }
}

function PlayClip_PreshutdownStream() {
    if (Main_IsNotBrowser) Play_offPlayer();
    PlayClip_hidePanel();
    PlayClip_qualities = [];
    window.clearInterval(PlayClip_streamCheckId);
    PlayClip_isOn = false;
    Chat_Clear();
    Play_ClearPlayer();
    UserLiveFeed_Hide();
    document.body.removeEventListener("keydown", PlayClip_handleKeyDown);
    document.removeEventListener('visibilitychange', PlayClip_Resume);
    ChannelVod_vodOffset = 0;
}

function PlayClip_UpdateNext() {
    var nextid = PlayClip_getIdNext(1, 0);
    var backid = PlayClip_getIdNext(-1, inUseObj.ColoumnsCount - 1);
    var text;

    PlayClip_HasNext = false;
    PlayClip_HasBack = false;

    if (nextid) {
        PlayClip_HasNext = true;
        text = JSON.parse(document.getElementById(inUseObj.ids[8] + nextid).getAttribute(Main_DataAttribute));
        Main_textContent("next_button_text_name", text[4]);
        Main_innerHTML("next_button_text_title", text[9]);

        Main_textContent("end_next_button_text_name", text[4]);
        Main_innerHTML("end_next_button_text_title", text[9]);

        PlayClip_HideShowNext(0, 1);
    } else PlayClip_HideShowNext(0, 0);

    if (backid) {
        PlayClip_HasBack = true;
        text = JSON.parse(document.getElementById(inUseObj.ids[8] + backid).getAttribute(Main_DataAttribute));
        Main_textContent("back_button_text_name", text[4]);
        Main_innerHTML("back_button_text_title", text[9]);
        PlayClip_HideShowNext(1, 1);
    } else PlayClip_HideShowNext(1, 0);
}

function PlayClip_getIdNext(y, x) {
    if (Main_ThumbNull((inUseObj.posY), (inUseObj.posX + y), inUseObj.ids[0]))
        return inUseObj.posY + '_' + (inUseObj.posX + y);
    else if (Main_ThumbNull((inUseObj.posY + y), x, inUseObj.ids[0]))
        return (inUseObj.posY + y) + '_' + x;

    return null;
}

function PlayClip_HideShowNext(which, val) {
    document.getElementById(PlayClip_HideShowNextDiv[which]).style.opacity = val;
}

function PlayClip_Enter() {
    if (!PlayClip_EnterPos) {
        if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
            if (Play_isNotplaying()) Chat_Play(Chat_Id);
            else Chat_Pause();
        }
        if (!Play_isEndDialogVisible()) Play_KeyPause(3);
    } else if (PlayClip_EnterPos === 1) PlayClip_PlayNext();
    else if (PlayClip_EnterPos === -1) PlayClip_PlayPreviously();
}

function PlayClip_PlayNext() {
    Screens_KeyLeftRight(1, 0);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayPreviously() {
    Screens_KeyLeftRight(-1, inUseObj.ColoumnsCount - 1);
    PlayClip_PlayNextPreviously();
}

function PlayClip_PlayNextPreviously() {
    var doc = document.getElementById("scene_channel_panel");
    doc.style.transition = 'none';
    doc.style.opacity = "0";
    Main_ready(function() {
        PlayClip_PreshutdownStream();
        Main_OpenClip(inUseObj.posY + '_' + inUseObj.posX, inUseObj.ids, Screens_handleKeyDown);
        doc.style.transition = '';
    });
}

function PlayClip_hidePanel() {
    //return;
    PlayVod_jumpCount = 0;
    PlayVod_IsJumping = false;
    PlayVod_addToJump = 0;
    Play_clearHidePanel();
    PlayClip_quality = PlayClip_qualityPlaying;
    document.getElementById("scene_channel_panel").style.opacity = "0";
    PlayVod_ProgresBarrUpdate((PlayClip_currentTime / 1000), PlayClip_DurationSeconds, true);
    Main_innerHTML('progress_bar_jump_to', STR_SPACE);
    document.getElementById('progress_bar_steps').style.display = 'none';
}

function PlayClip_showPanel() {
    PlayVod_ProgresBarrUpdate((PlayClip_currentTime / 1000), PlayClip_DurationSeconds, true);
    Play_clock();
    Play_CleanHideExit();
    PlayVod_IconsBottonResetFocus();
    PlayClip_qualityIndexReset();
    PlayClip_qualityDisplay();
    document.getElementById("scene_channel_panel").style.opacity = "1";
    Play_clearHidePanel();
    PlayClip_setHidePanel();
}

function PlayClip_qualityIndexReset() {
    PlayClip_qualityIndex = 0;
    for (var i = 0; i < PlayClip_getQualitiesCount(); i++) {
        if (PlayClip_qualities[i].id === PlayClip_quality) {
            PlayClip_qualityIndex = i;
            break;
        } else if (PlayClip_qualities[i].id.indexOf(PlayClip_quality) !== -1) { //make shore to set a value before break out
            PlayClip_qualityIndex = i;
        }
    }
}

function PlayClip_getQualitiesCount() {
    return PlayClip_qualities.length;
}

function PlayClip_qualityDisplay() {
    if (PlayClip_getQualitiesCount() === 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0";
    } else if (!PlayClip_qualityIndex) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "0.2";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    } else if (PlayClip_qualityIndex === PlayClip_getQualitiesCount() - 1) {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "0.2";
    } else {
        document.getElementById("control_arrow_up_" + Play_controlsQuality).style.opacity = "1";
        document.getElementById("control_arrow_down" + Play_controlsQuality).style.opacity = "1";
    }

    PlayClip_SetHtmlQuality('controls_name_' + Play_controlsQuality);
}

function PlayClip_SetHtmlQuality(element) {
    if (!PlayClip_qualities[PlayClip_qualityIndex].hasOwnProperty('id')) return;

    PlayClip_quality = PlayClip_qualities[PlayClip_qualityIndex].id;

    var quality_string = PlayClip_quality;
    if (PlayClip_quality.indexOf('source') !== -1) quality_string = quality_string.replace("source", STR_SOURCE);

    Main_textContent(element, PlayClip_quality);
}

function PlayClip_setHidePanel() {
    Play_PanelHideID = window.setTimeout(PlayClip_hidePanel, 5000 + PlayVod_ProgressBaroffset); // time in ms
}

function PlayClip_SetOpenVod() {
    document.getElementById('controls_' + 3).style.display = PlayClip_HasVOD ? 'inline-block' : 'none';
}

function PlayClip_OpenVod() {
    if (PlayClip_HasVOD) {
        Main_values.vodOffset = ChannelVod_vodOffset;
        PlayClip_PreshutdownStream();
        document.body.addEventListener("keydown", PlayVod_handleKeyDown, false);
        Play_IconsResetFocus();
        Main_ready(PlayVod_Start);
    } else {
        Play_clearHidePanel();
        Play_IsWarning = true;
        Play_showWarningDialog(STR_NO_BROADCAST_WARNING);
        window.setTimeout(function() {
            Play_IsWarning = false;
            Play_HideWarningDialog();
        }, 2000);
    }
}

function PlayClip_handleKeyDown(e) {
    if (PlayClip_state !== PlayClip_STATE_PLAYING) {
        switch (e.keyCode) {
            case KEY_RETURN:
                if (Play_ExitDialogVisible()) {
                    Play_CleanHideExit();
                    PlayClip_shutdownStream();
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
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos--;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && Play_isChatShown()) {
                    Play_ChatPositions++;
                    Play_ChatPosition();
                    Play_controls[Play_controlsChatPos].defaultValue = Play_ChatPositions;
                    Play_controls[Play_controlsChatPos].setLable();
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, -1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(-1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    } else if (PlayVod_PanelY === 1) {
                        if (PlayClip_EnterPos > -1) {
                            PlayClip_EnterPos--;
                            if (PlayClip_HasBack || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                            else PlayClip_EnterPos++;
                        }
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter--;
                    if (Play_Endcounter < (PlayClip_HasNext ? -1 : 0)) Play_Endcounter = 3;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_RIGHT:
                if (UserLiveFeed_isFeedShow()) {
                    if (Play_FeedPos < (UserLiveFeed_GetSize() - 1) && !UserLiveFeed_loadingData) {
                        UserLiveFeed_FeedRemoveFocus();
                        Play_FeedPos++;
                        UserLiveFeed_FeedAddFocus();
                    }
                } else if (Play_isFullScreen && !Play_isPanelShown() && !Play_isEndDialogVisible()) {
                    Play_controls[Play_controlsChat].enterKey(3);
                } else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY === 2) Play_BottomLeftRigt(3, 1);
                    else if (!PlayVod_PanelY) {
                        PlayVod_jumpStart(1, PlayClip_DurationSeconds);
                        PlayVod_ProgressBaroffset = 2500;
                    } else if (PlayVod_PanelY === 1) {
                        if (PlayClip_EnterPos < 1) {
                            PlayClip_EnterPos++;
                            if (PlayClip_HasNext || !PlayClip_EnterPos) PlayVod_IconsBottonFocus();
                            else PlayClip_EnterPos--;
                        }
                    }
                    PlayClip_setHidePanel();
                } else if (Play_isEndDialogVisible()) {
                    Play_EndTextClear();
                    Play_EndIconsRemoveFocus();
                    Play_Endcounter++;
                    if (Play_Endcounter > 3) Play_Endcounter = PlayClip_HasNext ? -1 : 0;
                    Play_EndIconsAddFocus();
                } else PlayClip_showPanel();
                break;
            case KEY_UP:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY--;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, 1);
                    PlayClip_setHidePanel();
                } else if (!UserLiveFeed_isFeedShow()) UserLiveFeed_ShowFeed();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_FeedRefreshFocus();
                else PlayClip_showPanel();
                break;
            case KEY_DOWN:
                if (Play_isEndDialogVisible()) Play_EndTextClear();
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (PlayVod_PanelY < 2) {
                        PlayVod_PanelY++;
                        PlayVod_IconsBottonFocus();
                    } else Play_BottomUpDown(3, -1);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else if (Play_isFullScreen && Play_isChatShown()) {
                    Play_ChatSizeValue++;
                    if (Play_ChatSizeValue > 3) {
                        Play_ChatSizeValue = 0;
                        Play_ChatPositionConvert(false);
                    } else if (Play_ChatSizeValue === 3) Play_ChatPositionConvert(true);
                    Play_ChatSize(true);
                    Play_controls[Play_controlsChatSize].defaultValue = Play_ChatSizeValue;
                    Play_controls[Play_controlsChatSize].bottomArrows();
                    Play_controls[Play_controlsChatSize].setLable();
                } else PlayClip_showPanel();
                break;
            case KEY_ENTER:
                if (Play_isEndDialogVisible()) Play_EndDialogPressed(3);
                else if (Play_isPanelShown()) {
                    Play_clearHidePanel();
                    if (!PlayVod_PanelY) {
                        if (PlayVod_addToJump) PlayVod_jump();
                    } else if (PlayVod_PanelY === 1) PlayClip_Enter();
                    else Play_BottomOptionsPressed(3);
                    PlayClip_setHidePanel();
                } else if (UserLiveFeed_isFeedShow()) {
                    PlayClip_PreshutdownStream();
                    Main_OpenLiveStream(Play_FeedPos, UserLiveFeed_ids, Play_handleKeyDown);
                } else PlayClip_showPanel();
                break;
            case KEY_RETURN:
                if (Play_isPanelShown()) PlayClip_hidePanel();
                else if (UserLiveFeed_isFeedShow()) UserLiveFeed_Hide();
                else {
                    if (Play_ExitDialogVisible()) {
                        Play_CleanHideExit();
                        PlayClip_shutdownStream();
                    } else {
                        Play_showExitDialog();
                    }
                }
                break;
            case KEY_PLAY:
                if (!Play_isEndDialogVisible() && Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Play(Chat_Id);
                }
                break;
            case KEY_PAUSE:
                if (!Play_isEndDialogVisible() && !Play_isNotplaying()) {
                    Play_KeyPause(2);
                    if (!Main_values.Play_ChatForceDisable) Chat_Pause();
                }
                break;
            case KEY_PLAYPAUSE:
                if (PlayClip_HasVOD && !Main_values.Play_ChatForceDisable) {
                    if (Play_isNotplaying()) Chat_Play(Chat_Id);
                    else Chat_Pause();
                }
                if (!Play_isEndDialogVisible()) Play_KeyPause(3);
                break;
            case KEY_INFO:
            case KEY_REFRESH:
                Play_controls[Play_controlsChat].enterKey(3);
                break;
            case KEY_PG_UP:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(3, 1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            case KEY_PG_DOWN:
                Play_Panelcounter = Play_controlsChatPos;
                Play_BottomUpDown(3, -1);
                Play_Panelcounter = Play_controlsDefault;
                break;
            default:
                break;
        }
    }
}
