//Variable initialization
var ChannelContent_cursorY = 0;
var ChannelContent_cursorX = 0;
var ChannelContent_dataEnded = false;
var ChannelContent_itemsCount = 0;
var ChannelContent_loadingDataTry = 0;
var ChannelContent_loadingDataTryMax = 5;
var ChannelContent_loadingDataTimeout = 3500;
var ChannelContent_itemsCountOffset = 0;
var ChannelContent_isoffline = false;
var ChannelContent_UserChannels = false;
var ChannelContent_TargetId;
var ChannelContent_ids = ['cc_thumbdiv', 'cc_img', 'cc_infodiv', 'cc_name', 'cc_createdon', 'cc_game', 'cc_viwers', 'cc_duration', 'cc_cell', 'sccempty_', 'channel_content_scroll'];
var ChannelContent_status = false;
var ChannelContent_lastselectedChannel = '';
var ChannelContent_responseText = null;
var ChannelContent_selectedChannelViews = '';
var ChannelContent_selectedChannelFollower = '';
var ChannelContent_description = '';
var ChannelContent_ChannelValue = {};
var ChannelContent_ChannelValueIsset = false;
var ChannelContent_offline_image = null;
var ChannelContent_profile_banner = '';
var ChannelContent_KeyEnterID;
var ChannelContent_clear = false;
//Variable initialization end

function ChannelContent_init() {
    Main_values.Main_CenterLablesVectorPos = 1;
    Main_values.Main_Go = Main_ChannelContent;
    if (ChannelContent_ChannelValueIsset && !Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
    if (ChannelContent_lastselectedChannel !== Main_values.Main_selectedChannel) ChannelContent_status = false;
    Main_cleanTopLabel();
    document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
    AddCode_PlayRequest = false;

    Main_innerHTML('top_lable', Main_values.Main_selectedChannelDisplayname);

    if (Main_values.Main_BeforeChannel === Main_UserChannels || Main_values.My_channel) {
        Main_values.Sidepannel_Pos = Main_values.My_channel ? 7 : 6;
        Sidepannel_SetUserLables();
        Sidepannel_SetTopOpacity(Main_values.Main_Go);
    }

    if (ChannelContent_status) {
        Main_YRst(ChannelContent_cursorY);
        Main_ShowElement(ChannelContent_ids[10]);
        ChannelContent_checkUser();
        ChannelContent_removeAllFollowFocus();
        ChannelContent_addFocus();
        Main_SaveValues();
    } else ChannelContent_StartLoad();
}

function ChannelContent_exit() {
    Main_RestoreTopLabel();
    document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
    Main_HideElement(ChannelContent_ids[10]);
    Main_values.My_channel = false;
    ChannelContent_removeFocus();
}

function ChannelContent_StartLoad() {
    ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname);
    Main_updateclock();
    ChannelContent_isoffline = false;
    Main_HideElement(ChannelContent_ids[10]);
    ChannelContent_offline_image = null;
    Main_showLoadDialog();
    Main_HideWarningDialog();
    ChannelContent_lastselectedChannel = Main_values.Main_selectedChannel;
    ChannelContent_status = false;
    ChannelContent_isoffline = false;
    ChannelContent_itemsCountOffset = 0;
    ChannelContent_itemsCount = 0;
    ChannelContent_cursorX = 0;
    ChannelContent_cursorY = 0;
    ChannelContent_dataEnded = false;
    ChannelContent_TargetId = undefined;
    ChannelContent_loadDataPrepare();
    ChannelContent_loadDataRequest();
}

function ChannelContent_loadDataPrepare() {
    Main_FirstLoad = true;
    ChannelContent_loadingDataTry = 0;
    ChannelContent_loadingDataTimeout = 3500;
}

function ChannelContent_loadDataRequest() {
    // Changed to Get Streams https://dev.twitch.tv/docs/api/reference#get-streams
    var theUrl = Main_helix_api + 'streams?user_id=' +
        encodeURIComponent(ChannelContent_TargetId !== undefined ? ChannelContent_TargetId : Main_values.Main_selectedChannel_id);

    BasexmlHttpGet(theUrl, ChannelContent_loadingDataTimeout, 2, null, ChannelContent_loadDataRequestSuccess, ChannelContent_loadDataError, false, null, true);
}

function ChannelContent_loadDataRequestSuccess(response) {
    if (JSON.parse(response).data.length) {
        ChannelContent_responseText = response;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    } else if (!ChannelContent_TargetId) {
        ChannelContent_loadDataPrepare();
        ChannelContent_loadDataCheckHost();
    } else {
        ChannelContent_responseText = null;
        ChannelContent_loadDataPrepare();
        ChannelContent_GetStreamerInfo();
    }
}

function ChannelContent_loadDataError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_loadDataRequest();
    } else {

        ChannelContent_loadDataCheckHostError();

    }
}

var ChannelContent_loadDataCheckHostId;
function ChannelContent_loadDataCheckHost() {

    ChannelContent_loadDataCheckHostId = (new Date().getTime());

    Main_GetHost(
        ChannelContent_CheckHost,
        ChannelContent_loadDataCheckHostId,
        Main_values.Main_selectedChannel
    );
}

function ChannelContent_loadDataCheckHostError() {
    ChannelContent_responseText = null;
    ChannelContent_loadDataPrepare();
    ChannelContent_GetStreamerInfo();
}

function ChannelContent_CheckHost(responseObj, id) {

    if (ChannelContent_loadDataCheckHostId === id) {

        if (responseObj.status === 200) {

            var data = JSON.parse(responseObj.responseText).data;

            if (data.user && data.user.hosting) {

                var response = data.user.hosting;

                ChannelContent_TargetId = parseInt(response.id);
                ChannelContent_loadDataRequest();

                return;
            }
        }

        ChannelContent_loadDataCheckHostError();

    }
}

function ChannelContent_GetStreamerInfo() {
    // https://dev.twitch.tv/docs/api/reference#get-users
    var theUrl = Main_helix_api + 'users?id=' + Main_values.Main_selectedChannel_id;

    BasexmlHttpGet(theUrl, PlayVod_loadingInfoDataTimeout, 2, null, ChannelContent_GetStreamerInfoSuccess, ChannelContent_GetStreamerInfoError, false, null, true);
}

function ChannelContent_GetStreamerInfoSuccess(responseText) {
    var channel = JSON.parse(responseText).data;

    if (channel.length) {
        channel = channel[0];
        ChannelContent_offline_image = channel.offline_image_url;
        ChannelContent_offline_image = ChannelContent_offline_image ? ChannelContent_offline_image.replace("1920x1080", Main_VideoSize) : ChannelContent_offline_image;
        ChannelContent_profile_banner = channel.profile_image_url ? channel.profile_image_url : IMG_404_BANNER;
        ChannelContent_selectedChannelViews = channel.view_count;
        ChannelContent_selectedChannelFollower = channel.followers;
        ChannelContent_description = channel.description;
        Main_values.Main_selectedChannelLogo = channel.logo;
        Main_values.Main_selectedChannelPartner = channel.broadcaster_type === "partner";

        ChannelContent_loadDataSuccess();
    } else {
        ChannelContent_loadDataError();
    }
}

function ChannelContent_GetStreamerInfoError() {
    ChannelContent_loadingDataTry++;
    if (ChannelContent_loadingDataTry < ChannelContent_loadingDataTryMax) {
        ChannelContent_loadingDataTimeout += 500;
        ChannelContent_GetStreamerInfo();
    } else {
        ChannelContent_offline_image = null;
        ChannelContent_profile_banner = IMG_404_BANNER;
        ChannelContent_selectedChannelViews = '';
        ChannelContent_selectedChannelFollower = '';
        ChannelContent_description = '';
        Main_values.Main_selectedChannelLogo = IMG_404_LOGO;
        ChannelContent_loadDataSuccess();
    }
}

function ChannelContent_setFollow() {
    if (AddCode_IsFollowing) Main_innerHTML("channel_content_titley_2", '<i class="icon-heart" style="color: #6441a4; font-size: 100%;"></i>' + STR_SPACE + STR_SPACE + STR_FOLLOWING);
    else Main_innerHTML("channel_content_titley_2", '<i class="icon-heart-o" style="color: #FFFFFF; font-size: 100%; "></i>' + STR_SPACE + STR_SPACE + (AddUser_UserIsSet() ? STR_FOLLOW : STR_NOKEY));
}

function ChannelContent_loadDataSuccess() {
    if (!Main_values.Main_selectedChannelLogo) Main_values.Main_selectedChannelLogo = IMG_404_LOGO;

    Main_innerHTML("channel_content_thumbdiv0_1", '<img class="stream_img_channel_logo" alt="" src="' + Main_values.Main_selectedChannelLogo.replace("300x300", '600x600') + '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO + '\'">');

    Main_innerHTML("channel_content_img0_1", '<img class="stream_img_channel" alt="" src="' + ChannelContent_profile_banner + '" onerror="this.onerror=null;this.src=\'' + IMG_404_BANNER + '\'">');

    var streamer_bio = Main_values.Main_selectedChannelDisplayname;

    streamer_bio += (Main_values.Main_selectedChannelPartner ? STR_SPACE + STR_SPACE + '<img style="display: inline-block; width: 2ch; vertical-align: middle;" alt="" src="' + IMG_PARTNER + '">' : "");

    streamer_bio += ChannelContent_selectedChannelViews !== '' ?
        STR_BR + Main_addCommas(ChannelContent_selectedChannelViews) + STR_VIEWS : '';

    streamer_bio += ChannelContent_selectedChannelFollower !== '' ?
        STR_BR + Main_addCommas(ChannelContent_selectedChannelFollower) + STR_FOLLOWERS : '';

    streamer_bio += ChannelContent_description !== '' ?
        STR_BR + STR_BR + STR_ABOUT + ':' + STR_BR + twemoji.parse(ChannelContent_description) : '';

    Main_innerHTML("channel_content_infodiv0_1", streamer_bio);

    if (ChannelContent_responseText) {

        var response = JSON.parse(ChannelContent_responseText);
        if (response.data.length) {

            var hosting = ChannelContent_TargetId !== undefined ? Main_values.Main_selectedChannelDisplayname +
                STR_USER_HOSTING : '';

            var stream = response.data[0];

            ChannelContent_createCell(stream.user_name, stream.id, stream.thumbnail_url,
                twemoji.parse(stream.title), stream.game_name,
                hosting + stream.user_name,
                STR_SINCE + Play_streamLiveAt(stream.started_at) + STR_SPACE + STR_FOR +
                Main_addCommas(stream.viewer_count) + STR_SPACE + STR_VIEWER,
                Main_lang(stream.language),
                Main_is_rerun(stream.type));

            ChannelContent_cursorX = 1;

        } else ChannelContent_createCellOffline();

    } else ChannelContent_createCellOffline();

    ChannelContent_loadDataSuccessFinish();
}

function ChannelContent_createCell(channel_name, channel_id, preview_thumbnail, stream_title, stream_game, channel_display_name, viewers, quality, rerun) {

    var ishosting = ChannelContent_TargetId !== undefined;
    if (!preview_thumbnail) preview_thumbnail = IMG_404_VIDEO;

    document.getElementById('channel_content_cell0_1').setAttribute(Main_DataAttribute, JSON.stringify([channel_name, channel_id, rerun, channel_display_name]));

    Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img class="stream_img" alt="" src="' + preview_thumbnail.replace("{width}x{height}", Main_VideoSize) + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
        '\'"></div><div class="stream_thumbnail_live_text_holder"><div class="stream_text_holder"><div id="channel_content_cell0_3" style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:' + (ishosting ? 99 : 66) + '%; display: inline-block;">' +
        '<i class="icon-' + (rerun ? 'refresh' : 'circle') + ' live_icon strokedeline" style="color: ' +
        (rerun ? '#FFFFFF' : ishosting ? '#FED000' : 'red') +
        ';"></i> ' + channel_display_name + '</div><div class="stream_info_live" style="width:' +
        (ishosting ? 0 : 33) + '%; float: right; text-align: right; display: inline-block;">' +
        (ishosting ? '' : quality) + '</div></div>' +
        '<div class="stream_info_live_title">' + stream_title + '</div>' +
        '<div id="channel_content_cell0_5" class="stream_info_live">' + (stream_game !== "" ? STR_PLAYING + stream_game : "") +
        '</div>' + '<div class="stream_info_live">' + viewers + '</div></div></div>');
}

function ChannelContent_createCellOffline() {
    ChannelContent_isoffline = true;
    Main_innerHTML("channel_content_thumbdiv0_0", '<div class="stream_thumbnail_live_img"><img class="stream_img" alt="" src="' + ChannelContent_offline_image + Main_randomimg +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO +
        '\'"></div><div class="stream_thumbnail_live_text_holder"><div class="stream_text_holder" style="font-size: 150%;"><div style="line-height: 1.6ch;"><div class="stream_info_live_name" style="width:99%; display: inline-block;">' +
        Main_values.Main_selectedChannelDisplayname + '</div><div class="stream_info_live" style="width:0%; float: right; text-align: right; display: inline-block;"></div></div>' +
        '<div class="stream_info_live">' + STR_CH_IS_OFFLINE + '</div></div>' +
        '</div>');
}

function ChannelContent_loadDataSuccessFinish() {
    if (!ChannelContent_status) {
        ChannelContent_status = true;
        if (!ChannelContent_isoffline) ChannelContent_cursorY = 1;
        ChannelContent_addFocus();
        Main_SaveValues();
        Main_ShowElement(ChannelContent_ids[10]);
        Main_HideLoadDialog();
    }
    ChannelContent_checkUser();
    Main_FirstLoad = false;
}

function ChannelContent_checkUser() {
    if (ChannelContent_UserChannels) ChannelContent_setFollow();
    else if (AddUser_UserIsSet()) {
        AddCode_Channel_id = Main_values.Main_selectedChannel_id;
        AddCode_PlayRequest = false;
        AddCode_CheckFollow();
    } else {
        AddCode_IsFollowing = false;
        ChannelContent_setFollow();
    }
}

function ChannelContent_addFocus() {
    if (ChannelContent_cursorY) Main_AddClass('channel_content_thumbdiv0_0', Main_classThumb);
    else ChannelContent_addFocusFollow();

    Main_handleKeyUp();
}

function ChannelContent_addFocusFollow() {
    Main_AddClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
}

function ChannelContent_removeFocus() {
    if (ChannelContent_cursorY) Main_RemoveClass("channel_content_thumbdiv0_0", Main_classThumb);
    else Main_RemoveClass('channel_content_thumbdivy_' + ChannelContent_cursorX, 'stream_switch_focused');
}

function ChannelContent_removeAllFollowFocus() {
    Main_RemoveClass('channel_content_thumbdivy_0', 'stream_switch_focused');
    Main_RemoveClass('channel_content_thumbdivy_1', 'stream_switch_focused');
    Main_RemoveClass('channel_content_thumbdivy_2', 'stream_switch_focused');
}

function ChannelContent_keyEnter() {
    if (!ChannelContent_cursorY) {
        if (!ChannelContent_cursorX) {
            document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_HideElement(ChannelContent_ids[10]);
            ChannelContent_removeFocus();
            Main_ready(function() {
                inUseObj = ChannelVod;
                Screens_init();
            });
        } else if (ChannelContent_cursorX === 1) {
            document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
            Main_HideElement(ChannelContent_ids[10]);
            ChannelContent_removeFocus();
            Main_ready(function() {
                inUseObj = ChannelClip;
                Screens_init();
            });
        } else if (ChannelContent_cursorX === 2) {
            // if (AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token) {
            //     AddCode_PlayRequest = false;
            //     AddCode_Channel_id = Main_values.Main_selectedChannel_id;
            //     if (AddCode_IsFollowing) AddCode_UnFollow();
            //     else AddCode_Follow();
            // } else {
            //     Main_showWarningDialog(STR_NOKEY_WARN);
            //     window.setTimeout(Main_HideWarningDialog, 2000);
            // }
            Main_showWarningDialog(STR_FOLLOW_ISSUE);
            window.setTimeout(Main_HideWarningDialog, 2000);
        }
    } else {
        document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
        Main_HideElement(ChannelContent_ids[10]);

        Main_values.Play_selectedChannel = JSON.parse(document.getElementById('channel_content_cell0_1').getAttribute(Main_DataAttribute));

        Main_values.IsRerun = Main_values.Play_selectedChannel[2];
        Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannel[3];

        Main_values.Play_selectedChannel = Main_values.Play_selectedChannel[0];

        if (Main_values.Play_selectedChannelDisplayname.indexOf(STR_USER_HOSTING) !== -1) {
            Main_values.Play_isHost = true;
            Main_values.Play_DisplaynameHost = Main_values.Play_selectedChannelDisplayname;
            Main_values.Play_selectedChannelDisplayname = Main_values.Play_selectedChannelDisplayname.split(STR_USER_HOSTING)[1];
            Main_values.Play_selectedChannel_id = ChannelContent_TargetId;
        } else Main_values.Play_selectedChannel_id = Main_values.Main_selectedChannel_id;

        var playing = document.getElementById('channel_content_cell0_5').textContent;
        Main_values.Play_gameSelected = playing.indexOf(STR_PLAYING) !== -1 ? playing.split(STR_PLAYING)[1] : "";

        Main_ready(Main_openStream);
    }
}

function ChannelContent_SetChannelValue() {
    ChannelContent_ChannelValue = {
        "Main_values.Main_selectedChannel_id": Main_values.Main_selectedChannel_id,
        "Main_values.Main_selectedChannelLogo": Main_values.Main_selectedChannelLogo,
        "Main_values.Main_selectedChannel": Main_values.Main_selectedChannel,
        "Main_values.Main_selectedChannelDisplayname": Main_values.Main_selectedChannelDisplayname,
        "ChannelContent_UserChannels": ChannelContent_UserChannels,
        "Main_values.Main_BeforeChannel": Main_values.Main_BeforeChannel
    };
}

function ChannelContent_RestoreChannelValue() {
    Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel_id;
    Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannelLogo;
    Main_values.Main_selectedChannel = Main_values.Main_selectedChannel;
    Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannelDisplayname;
    ChannelContent_UserChannels = ChannelContent_ChannelValue.ChannelContent_UserChannels;
    Main_values.Main_BeforeChannel = Main_values.Main_BeforeChannel;
    ChannelContent_ChannelValue = {};
    ChannelContent_ChannelValueIsset = false;
}

function ChannelContent_handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER) {
        ChannelContent_handleKeyUpClear();
        if (!ChannelContent_clear) ChannelContent_keyEnter();
    }
}

function ChannelContent_handleKeyUpClear() {
    window.clearTimeout(ChannelContent_KeyEnterID);
    document.body.removeEventListener("keyup", ChannelContent_handleKeyUp);
    document.body.addEventListener("keydown", ChannelContent_handleKeyDown, false);
}

function ChannelContent_handleKeyDown(event) {
    if (Main_FirstLoad || Main_CantClick()) return;
    else Main_keyClickDelayStart();

    switch (event.keyCode) {
        case KEY_RETURN_Q:
        case KEY_KEYBOARD_BACKSPACE:
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                ChannelContent_removeFocus();
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                Main_values.Main_Go = Main_values.Main_BeforeChannel;
                Main_values.Main_BeforeChannel = Main_Live;
                ChannelContent_exit();
                Sidepannel_SetDefaultLables();
                Main_values.Main_selectedChannel_id = '';
                Main_SwitchScreenAction();
            }
            break;
        case KEY_LEFT:
            if (!ChannelContent_cursorY && ChannelContent_cursorX) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX--;
                if (ChannelContent_cursorX < 0) ChannelContent_cursorX = 2;
                ChannelContent_addFocus();
            } else {
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown);
                Sidepannel_Start(ChannelContent_handleKeyDown);
            }
            break;
        case KEY_RIGHT:
            if (!ChannelContent_cursorY) {
                ChannelContent_removeFocus();
                ChannelContent_cursorX++;
                if (ChannelContent_cursorX > 2) ChannelContent_cursorX = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_UP:
            if (!ChannelContent_cursorY && !ChannelContent_isoffline) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_DOWN:
            if (!ChannelContent_cursorY && !ChannelContent_isoffline) {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 1;
                ChannelContent_addFocus();
            } else {
                ChannelContent_removeFocus();
                ChannelContent_cursorY = 0;
                ChannelContent_addFocus();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_KEYBOARD_SPACE:
            ChannelContent_keyEnter();
            break;
        case KEY_ENTER:
            if (!Settings_Obj_default("enter_refresh")) {
                document.body.removeEventListener("keydown", ChannelContent_handleKeyDown, false);
                document.body.addEventListener("keyup", ChannelContent_handleKeyUp, false);
                ChannelContent_clear = false;
                ChannelContent_KeyEnterID = window.setTimeout(Main_ReloadScreen, 500);
            } else ChannelContent_keyEnter();
            break;
        case KEY_INFO:
        case KEY_REFRESH:
            Main_ReloadScreen();
            break;
        default:
            break;
    }
}
