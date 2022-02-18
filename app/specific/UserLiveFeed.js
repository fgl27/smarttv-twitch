//Spacing for reease maker not trow erros frm jshint
var UserLiveFeed_loadingData = false;
var UserLiveFeed_loadingDataTry = 0;
var UserLiveFeed_loadingDataTimeout = 3500;
var UserLiveFeed_loadChannelOffsset = 0;
var UserLiveFeed_loadingDataTryMax = 5;
var UserLiveFeed_dataEnded = false;
var UserLiveFeed_followerChannels = [];
var UserLiveFeed_idObject = {};
var UserLiveFeed_status = false;
var UserLiveFeed_LastPos = null;
var UserSidePannel_LastPos = null;
var UserLiveFeed_token = null;
var UserLiveFeed_Feedid;
var UserLiveFeed_FocusClass = 'feed_thumbnail_focused';
var UserLiveFeed_PreventAddfocus = false;
var UserLiveFeed_PreventHide = false;
var UserLiveFeed_Sort = 0;

var UserLiveFeed_CheckNotifycation = false;
var UserLiveFeed_WasLiveidObject = {};
var UserLiveFeed_NotifyLiveidObject = [];
var UserLiveFeed_Notify = true;
var UserLiveFeed_NotifyRunning = false;
var UserLiveFeed_NotifyTimeout = 3000;

var UserLiveFeed_ids = ['ulf_thumbdiv', 'ulf_img', 'ulf_infodiv', 'ulf_displayname', 'ulf_streamtitle', 'ulf_streamgame', 'ulf_viwers', 'ulf_quality', 'ulf_cell', 'ulempty_', 'user_live_scroll'];

var UserLiveFeed_side_ids = ['usf_thumbdiv', 'usf_img', 'usf_infodiv', 'usf_displayname', 'usf_streamtitle', 'usf_streamgame', 'usf_viwers', 'usf_quality', 'usf_cell', 'ulempty_', 'user_live_scroll'];

function UserLiveFeed_StartLoad(PreventAddfocus) {
    if (AddUser_UserIsSet()) {
        UserLiveFeed_clearHideFeed();

        if (UserLiveFeed_status) {
            if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
                UserLiveFeed_LastPos = JSON.parse(document.getElementById(UserLiveFeed_ids[8] + Play_FeedPos).getAttribute(Main_DataAttribute))[0];

            if (UserLiveFeed_ThumbNull(Sidepannel_PosFeed, UserLiveFeed_side_ids[0]))
                UserSidePannel_LastPos = JSON.parse(document.getElementById(UserLiveFeed_side_ids[8] + Sidepannel_PosFeed).getAttribute(Main_DataAttribute))[0];
        } else {
            UserSidePannel_LastPos = null;
            UserLiveFeed_LastPos = null;
        }

        UserLiveFeed_PreventAddfocus = PreventAddfocus;
        Main_empty('user_feed_scroll');
        Main_HideElement('side_panel_feed_thumb');
        Sidepannel_PosFeed = 0;
        Main_empty('side_panel_holder');
        document.getElementById('side_panel_warn').style.display = 'none';
        UserLiveFeed_status = false;
        document.getElementById('user_feed_scroll').style.left = "0.125em";
        Main_ShowElement('dialog_loading_feed');
        Main_ShowElement('dialog_loading_side_feed');
        UserLiveFeed_loadChannelOffsset = 0;
        UserLiveFeed_followerChannels = [];
        Play_FeedPos = 0;
        UserLiveFeed_idObject = {};
        Main_updateclock();
        UserLiveFeed_Sort = Settings_value.live_feed_sort.defaultValue;

        UserLiveFeed_loadDataPrepare();
        UserLiveFeed_CheckToken();
    }
}

function UserLiveFeed_CheckToken() {
    UserLiveFeed_token = AddUser_UsernameArray[0].access_token;
    UserLiveFeed_loadChannelUserLive();
}

function UserLiveFeed_loadDataPrepare() {
    UserLiveFeed_loadingData = true;
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
}

function UserLiveFeed_loadChannelUserLive() {
    var theUrl = Main_helix_api + 'streams/followed?user_id=' + AddUser_UsernameArray[0].id + '&first=100';

    UserLiveFeed_loadChannelUserLiveGet(theUrl);
}

function UserLiveFeed_loadChannelUserLiveGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.timeout = UserLiveFeed_loadingDataTimeout;

    Main_Bearer_User_Headers[1][1] = Main_Bearer + AddUser_UsernameArray[0].access_token;

    for (var i = 0; i < Main_Bearer_Headers.length; i++)
        xmlHttp.setRequestHeader(Main_Bearer_User_Headers[i][0], Main_Bearer_User_Headers[i][1]);

    xmlHttp.ontimeout = function() { };

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                UserLiveFeed_loadDataSuccess(xmlHttp.responseText);
            } else if (UserLiveFeed_token && (xmlHttp.status === 401 || xmlHttp.status === 403)) { //token expired
                //Token has change or because is new or because it is invalid because user delete in twitch settings
                // so callbackFuncOK and callbackFuncNOK must be the same to recheck the token
                AddCode_refreshTokens(0, 0, UserLiveFeed_CheckToken, UserLiveFeed_loadDataRefreshTokenError);
            } else {
                UserLiveFeed_loadDataErrorLive();
            }
        }
    };

    xmlHttp.send(null);
}

function UserLiveFeed_loadDataRefreshTokenError() {
    if (!AddUser_UsernameArray[0].access_token) UserLiveFeed_CheckToken();
    else UserLiveFeed_loadDataErrorLive();
}

function UserLiveFeed_loadDataErrorLive() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadChannelUserLive();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        Main_HideElement('dialog_loading_side_feed');
        if (UserLiveFeed_isFeedShow()) {
            Play_showWarningDialog(STR_REFRESH_PROBLEM);
            window.setTimeout(function() {
                Play_HideWarningDialog();
            }, 2000);
        }
    }
}

var UserLiveFeed_loadDataSuccessResponse = [];
var UserLiveFeed_loadDataSuccessUrl;

function UserLiveFeed_loadDataSuccess(responseText) {
    UserLiveFeed_loadDataSuccessResponse = JSON.parse(responseText).data;
    var userids;

    for (var i = 0; i < UserLiveFeed_loadDataSuccessResponse.length; i++) {
        if (userids) {
            userids += '&id=' + UserLiveFeed_loadDataSuccessResponse[i].user_id;
        } else {
            userids = '?id=' + UserLiveFeed_loadDataSuccessResponse[i].user_id;
        }
    }

    UserLiveFeed_loadDataSuccessUrl = Main_helix_api + 'users' + userids;
    UserLiveFeed_loadingDataTry = 0;
    UserLiveFeed_loadingDataTimeout = 3500;
    UserLiveFeed_loadDataSuccessHttpRequest();
}

function UserLiveFeed_loadDataSuccessHttpRequest() {
    BasexmlHttpGet(
        UserLiveFeed_loadDataSuccessUrl,
        UserLiveFeed_loadingDataTimeout,
        2,
        null,
        UserLiveFeed_loadDataSuccessUpdateMap,
        UserLiveFeed_loadDataSuccessError,
        false,
        null,
        true,
        true
    );
}

function UserLiveFeed_loadDataSuccessUpdateMap(response) {
    response = JSON.parse(response);
    if (response.data && response.data.length) {

        var data = response.data;

        var mapLogoPartner = {};

        for (var i = 0; i < data.length; i++) {
            mapLogoPartner[data[i].id] = {
                partner: data[i].broadcaster_type === 'partner',
                logo: data[i].profile_image_url,
            };
        }

        UserLiveFeed_loadDataSuccessEnd(UserLiveFeed_loadDataSuccessResponse, mapLogoPartner);

    }
}

function UserLiveFeed_loadDataSuccessError() {
    UserLiveFeed_loadingDataTry++;
    if (UserLiveFeed_loadingDataTry < UserLiveFeed_loadingDataTryMax) {
        UserLiveFeed_loadingDataTimeout += 500;
        UserLiveFeed_loadDataSuccessHttpRequest();
    } else {
        UserLiveFeed_loadingData = false;
        Main_HideElement('dialog_loading_feed');
        Main_HideElement('dialog_loading_side_feed');
        if (UserLiveFeed_isFeedShow()) {
            Play_showWarningDialog(STR_REFRESH_PROBLEM);
            window.setTimeout(function() {
                Play_HideWarningDialog();
            }, 2000);
        }
    }

}

function UserLiveFeed_loadDataSuccessEnd(response, mapLogoPartner) {

    //var response = JSON.parse(responseText).data;
    var response_items = response.length;
    var sorting = Settings_Obj_default('live_feed_sort');

    if (response_items < Main_ItemsLimitVideo) UserLiveFeed_dataEnded = true;

    var stream, id, doc = document.getElementById("user_feed_scroll"),
        docside = document.getElementById("side_panel_holder"),
        i = 0;

    if (!UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name]) {
        UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name] = {};
        UserLiveFeed_CheckNotifycation = false;
    }

    var sorting_type1 = Settings_FeedSort[sorting][0],
        sorting_type2 = Settings_FeedSort[sorting][1],
        sorting_direction = Settings_FeedSort[sorting][2];

    if (sorting_direction) {
        //A-Z
        if (sorting_type1) {
            response.sort(function(a, b) {
                return (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? -1 :
                    (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? 1 : 0));
            });
        } else {
            response.sort(function(a, b) {
                return (a[sorting_type2] < b[sorting_type2] ? -1 :
                    (a[sorting_type2] > b[sorting_type2] ? 1 : 0));
            });
        }
    } else {
        //Z-A
        if (sorting_type1) {
            response.sort(function(a, b) {
                return (a[sorting_type1][sorting_type2] > b[sorting_type1][sorting_type2] ? -1 :
                    (a[sorting_type1][sorting_type2] < b[sorting_type1][sorting_type2] ? 1 : 0));
            });
        } else {
            response.sort(function(a, b) {
                return (a[sorting_type2] > b[sorting_type2] ? -1 :
                    (a[sorting_type2] < b[sorting_type2] ? 1 : 0));
            });
        }
    }

    for (i; i < response_items; i++) {
        stream = response[i];
        id = stream.user_id;

        if (!UserLiveFeed_idObject[id]) {

            //Check if was live if not notificate
            if (!UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name][id]) {
                UserLiveFeed_NotifyLiveidObject.push({
                    name: stream.user_name,
                    logo: mapLogoPartner[id].logo,
                    title: Main_ReplaceLargeFont(twemoji.parse(stream.title)),
                    game: stream.game_name,
                    rerun: Main_is_rerun(stream.type),
                });
            }

            UserLiveFeed_idObject[id] = 1;
            if (UserLiveFeed_LastPos !== null && UserLiveFeed_LastPos === stream.user_login) {
                Play_FeedPos = i;
            }

            doc.appendChild(UserLiveFeed_CreatFeed(i,
                [stream.user_login, id, Main_is_rerun(stream.type)],
                [
                    stream.thumbnail_url.replace("{width}x{height}", Main_VideoSize),
                    stream.user_name,
                    stream.game_name,
                    Main_addCommas(stream.viewer_count),
                    stream.title
                ]));

            if (UserSidePannel_LastPos !== null && UserSidePannel_LastPos === stream.user_login) {
                Sidepannel_PosFeed = i;
            }

            docside.appendChild(UserLiveFeed_CreatSideFeed(i,
                [stream.user_login, id, Main_is_rerun(stream.type)],
                [
                    stream.user_login, id, stream.thumbnail_url.replace("{width}x{height}", Main_SidePannelSize),
                    stream.user_name,
                    stream.title,
                    stream.game_name,
                    STR_SINCE + Play_streamLiveAt(stream.started_at) + ' ' +
                    STR_FOR + Main_addCommas(stream.viewer_count) + STR_SPACE + STR_VIEWER,
                    '[' + stream.language.toUpperCase() + ']',
                    Main_is_rerun(stream.type),
                    mapLogoPartner[id].partner
                ],
                [
                    mapLogoPartner[id].logo,
                    stream.user_name,
                    stream.user_name,
                    stream.game_name,
                    Main_addCommas(stream.viewer_count)
                ]
            ));
        }
    }

    UserLiveFeed_WasLiveidObject[AddUser_UsernameArray[0].name] = JSON.parse(JSON.stringify(UserLiveFeed_idObject));

    // doc.appendChild(UserLiveFeed_CreatFeed(i++,
    //     ['ashlynn', 35618666, false],
    //     ["https://static-cdn.jtvnw.net/ttv-static/404_preview-640x360.jpg",
    //         'ashlynn',
    //         'test',
    //         Main_addCommas(10),
    //         'title'
    //     ]));

    UserLiveFeed_loadDataSuccessFinish();
}

function UserLiveFeed_loadDataSuccessFinish() {
    UserLiveFeed_loadingData = false;
    UserLiveFeed_status = true;
    Main_ready(function() {
        Main_HideElement('dialog_loading_feed');
        Main_HideElement('dialog_loading_side_feed');
        Sidepannel_AddFocusFeed(true);
        UserLiveFeed_FeedAddFocus(true);
        window.setTimeout(Sidepannel_PreloadImgs, 600);

        //The app just started or user change don't nottify
        if (UserLiveFeed_CheckNotifycation) UserLiveFeed_LiveNotification();
        else {
            UserLiveFeed_NotifyLiveidObject = [];
            UserLiveFeed_CheckNotifycation = true;
        }
    });
}

function UserLiveFeed_LiveNotification() {
    if (UserLiveFeed_NotifyRunning || !UserLiveFeed_Notify ||
        !UserLiveFeed_NotifyLiveidObject.length) {
        UserLiveFeed_NotifyLiveidObject = [];
        return;
    }

    UserLiveFeed_NotifyRunning = true;
    UserLiveFeed_LiveNotificationShow(0);
}

function UserLiveFeed_LiveNotificationShow(position) {
    var img = document.getElementById('user_feed_notify_img');

    img.onload = function() {
        this.onload = null;
        this.onerror = null;
        UserLiveFeed_LiveNotificationOnload(position);
    };

    img.onerror = function() {
        this.onerror = null;
        this.onload = null;
        this.src = IMG_404_LOGO;
        UserLiveFeed_LiveNotificationOnload(position);
    };

    img.src = UserLiveFeed_NotifyLiveidObject[position].logo;
}

function UserLiveFeed_LiveNotificationOnload(position) {
    Main_innerHTML('user_feed_notify_name', '<i class="icon-' + (!UserLiveFeed_NotifyLiveidObject[position].rerun ? 'circle" style="color: red;' : 'refresh" style="') + ' font-size: 75%; "></i>' + STR_SPACE + UserLiveFeed_NotifyLiveidObject[position].name);

    Main_textContent('user_feed_notify_game', UserLiveFeed_NotifyLiveidObject[position].game);
    Main_innerHTML('user_feed_notify_title', UserLiveFeed_NotifyLiveidObject[position].title);

    Main_ready(function() {
        Main_RemoveClass('user_feed_notify', 'user_feed_notify_hide');

        window.setTimeout(function() {
            UserLiveFeed_LiveNotificationHide(position);
        }, UserLiveFeed_NotifyTimeout);
    });
}

function UserLiveFeed_LiveNotificationHide(position) {
    Main_AddClass('user_feed_notify', 'user_feed_notify_hide');

    if (position < (UserLiveFeed_NotifyLiveidObject.length - 1)) {
        window.setTimeout(function() {
            UserLiveFeed_LiveNotificationShow(position + 1);
        }, 800);
    } else {
        UserLiveFeed_NotifyRunning = false;
        UserLiveFeed_NotifyLiveidObject = [];
    }
}

function UserLiveFeed_GetSize() {
    return document.getElementById('user_feed_scroll').getElementsByClassName('user_feed_thumb').length;
}

function UserLiveFeed_CreatFeed(id, data, valuesArray) {
    var div = document.createElement('div');
    div.setAttribute('id', UserLiveFeed_ids[8] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(data));

    div.className = 'user_feed_thumb';
    div.innerHTML = '<div id="' + UserLiveFeed_ids[0] + id + '" class="stream_thumbnail_player_feed" >' +
        '<div class="stream_thumbnail_live_img"><img id="' + UserLiveFeed_ids[1] + id + '" alt="" class="stream_img" src="' + valuesArray[0] +
        Main_randomimg + '" onerror="this.onerror=null;this.src=\'' + IMG_404_VIDEO + '\'"></div>' +
        '<div id="' + UserLiveFeed_ids[2] + id + '" class="player_live_feed_text"><div class="stream_text_holder">' +
        '<div style="line-height: 1.6ch;"><div id="' + UserLiveFeed_ids[3] + id +
        '" class="stream_info_live_name" style="width: 63%; display: inline-block;">' + Main_ReplaceLargeFont(valuesArray[1]) + '</div>' +
        '<div "class="stream_info_live" style="width:36%; float: right; text-align: right; display: inline-block; font-size: 75%; ">' +
        '<i class="icon-' + (!data[2] ? 'circle" style="color: red;' : 'refresh" style="') + ' font-size: 75%; "></i>' +
        STR_SPACE + valuesArray[3] + '</div></div><div id="' + UserLiveFeed_ids[4] + id +
        '"class="stream_info_live_title">' + Main_ReplaceLargeFont(twemoji.parse(valuesArray[4])) + '</div><div id="' +
        UserLiveFeed_ids[5] + id + '"class="stream_info_live">' + valuesArray[2] + '</div></div></div></div>';

    return div;
}

function UserLiveFeed_CreatSideFeed(id, jsondata, data, valuesArray) {

    var div = document.createElement('div');
    div.setAttribute('id', UserLiveFeed_side_ids[8] + id);
    div.setAttribute(Main_DataAttribute, JSON.stringify(jsondata));
    div.setAttribute('side_panel_data', JSON.stringify(data));
    div.className = 'side_panel_feed';

    div.innerHTML = '<div id="' + UserLiveFeed_side_ids[0] + id +
        '" class="side_panel_div"><div id="' + UserLiveFeed_side_ids[2] + id +
        '" style="width: 100%;"><div id="' + UserLiveFeed_side_ids[3] + id +
        '" style="display: none;">' + valuesArray[1] +
        '</div><div class="side_panel_iner_div1"><img id="' + UserLiveFeed_side_ids[1] + id +
        '" class="side_panel_channel_img" src="' + valuesArray[0] +
        '" onerror="this.onerror=null;this.src=\'' + IMG_404_LOGO +
        '\'"></div><div class="side_panel_iner_div2"><div id="' + UserLiveFeed_side_ids[4] + id +
        '" class="side_panel_new_title">' + Main_ReplaceLargeFont(valuesArray[2]) + '</div><div id="' +
        UserLiveFeed_side_ids[5] + id + '" class="side_panel_new_game">' + valuesArray[3] +
        '</div></div><div class="side_panel_iner_div3"><div style="text-align: center;"><i class="icon-' +
        (!jsondata[2] ? 'circle" style="color: red;' : 'refresh" style="') +
        ' font-size: 55%; "></i><div style="font-size: 58%;">' + valuesArray[4] + '</div></div></div></div></div></div>';

    return div;
}

function UserLiveFeed_isFeedShow() {
    return document.getElementById('user_feed').className.indexOf('user_feed_hide') === -1;
}

function UserLiveFeed_ShowFeed(PreventAddfocus) {
    var hasuser = AddUser_UserIsSet() && AddUser_UsernameArray[0].access_token;

    if (!hasuser) {
        return;
    }

    if (hasuser) {
        if (Play_FeedOldUserName !== AddUser_UsernameArray[0].name) UserLiveFeed_status = false;
        Play_FeedOldUserName = AddUser_UsernameArray[0].name;
    }

    if (!hasuser || !UserLiveFeed_ThumbNull(0, UserLiveFeed_ids[0]) ||
        !Main_A_equals_B(UserLiveFeed_Sort, Settings_value.live_feed_sort.defaultValue)) UserLiveFeed_status = false;

    if (!UserLiveFeed_status && !UserLiveFeed_loadingData) UserLiveFeed_StartLoad(PreventAddfocus);

    if (hasuser) {
        if (Main_isElementShowing('scene2')) UserLiveFeed_Show(PreventAddfocus);

        if (!PreventAddfocus) UserLiveFeed_FeedAddFocus(true);
        else {
            UserLiveFeed_FeedRemoveFocus();
            UserLiveFeed_FeedSetPos(true);
        }
    }
}

function UserLiveFeed_Show(notransition) {
    if (notransition) {
        var doc = document.getElementById('user_feed');
        doc.style.transition = 'none';
        doc.classList.remove('user_feed_hide');
        Main_ready(function() {
            if (Settings_Obj_default("app_animations")) doc.style.transition = '';
        });
    } else Main_RemoveClass('user_feed', 'user_feed_hide');
}

function UserLiveFeed_Hide(notransition) {
    if (notransition) {
        var doc = document.getElementById('user_feed');
        doc.style.transition = 'none';
        doc.classList.add('user_feed_hide');
        Main_ready(function() {
            if (Settings_Obj_default("app_animations")) doc.style.transition = '';
        });
    } else Main_AddClass('user_feed', 'user_feed_hide');
}

function UserLiveFeed_ResetFeedId() {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_PreventHide) UserLiveFeed_setHideFeed();
}

function UserLiveFeed_clearHideFeed() {
    window.clearTimeout(UserLiveFeed_Feedid);
}

function UserLiveFeed_setHideFeed() {
    if (UserLiveFeed_isFeedShow()) UserLiveFeed_Feedid = window.setTimeout(UserLiveFeed_Hide, 5500);
}

function UserLiveFeed_FeedRefresh(PreventAddfocus) {
    UserLiveFeed_clearHideFeed();
    if (!UserLiveFeed_loadingData) UserLiveFeed_StartLoad(PreventAddfocus);
    else {
        window.setTimeout(function() {
            UserLiveFeed_loadingData = false;
        }, 15000);
    }
}

function UserLiveFeed_FeedAddFocus(skipAnimation) {
    UserLiveFeed_ResetFeedId();
    if (!UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0])) return;

    if (!UserLiveFeed_PreventAddfocus) {
        Main_AddClass(UserLiveFeed_ids[0] + Play_FeedPos, UserLiveFeed_FocusClass);
    } else UserLiveFeed_PreventAddfocus = false;

    UserLiveFeed_FeedSetPos(skipAnimation);
}

function UserLiveFeed_FeedRemoveFocus() {
    if (UserLiveFeed_ThumbNull(Play_FeedPos, UserLiveFeed_ids[0]))
        Main_RemoveClass(UserLiveFeed_ids[0] + Play_FeedPos, UserLiveFeed_FocusClass);
}

function UserLiveFeed_FeedGetPos() {
    var position = 0;

    if (Play_FeedPos < 3) position = 2.5;
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 2), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 2)).offsetLeft * -1);
    else if (UserLiveFeed_ThumbNull((Play_FeedPos + 1), UserLiveFeed_ids[0]))
        position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - 3)).offsetLeft * -1);
    else position = (document.getElementById(UserLiveFeed_ids[8] + (Play_FeedPos - (Play_FeedPos > 3 ? 4 : 3))).offsetLeft * -1);

    return position;
}

function UserLiveFeed_FeedSetPos(skipAnimation) {
    var position = UserLiveFeed_FeedGetPos();
    var doc = document.getElementById('user_feed_scroll');

    if (!skipAnimation && Screens_ChangeFocusAnimationFinished && Screens_SettingDoAnimations &&
        !Screens_ChangeFocusAnimationFast) {
        Screens_ChangeFocusAnimationFinished = false;
        Screens_ChangeFocusAnimationFast = true;

        doc.style.transition = '';
        doc.classList.add('user_feed_scroll_ani');

        window.setTimeout(function() {
            Screens_ChangeFocusAnimationFinished = true;
        }, 200); //Same value as user_feed_scroll_ani
    } else {
        if (skipAnimation) Screens_ChangeFocusAnimationFast = false;
        doc.style.transition = 'none';
        doc.classList.remove('user_feed_scroll_ani');
    }

    if (position) doc.style.left = (position / BodyfontSize) + "em";
}

function UserLiveFeed_ThumbNull(y, thumbnail) {
    return document.getElementById(thumbnail + y) !== null;
}

function UserLiveFeed_SetFeedPicText() {
    Main_innerHTML('icon_feed_refresh', '<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-refresh" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_REFRESH + ':' + STR_UP + STR_SPACE + STR_SPACE + '</div>'); //<div class="strokedelinebig" style="vertical-align: middle; display: inline-block;"><i class="icon-pp" style="color: #FFFFFF; font-size: 115%; "></i></div><div class="strokedelinebig" style="vertical-align: middle; display: inline-block">' + STR_SPACE + STR_PICTURE_LIVE_FEED + '</div>');
}

function UserLiveFeed_SetHoldUp() {
    Main_IconLoad('icon_feed_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_HOLD_UP);
}
