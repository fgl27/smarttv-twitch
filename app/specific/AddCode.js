//Variable initialization
var AddCode_loadingDataTry = 0;
var AddCode_loadingDataTryMax = 5;
var AddCode_loadingDataTimeout = 10000;
var AddCode_Code = 0;
var AddCode_loadingData = false;
var AddCode_keyBoardOn = false;
var AddCode_IsFollowing = false;
var AddCode_IsSub = false;
var AddCode_PlayRequest = false;
var AddCode_Channel_id = '';

var AddCode_redirect_uri = 'https://fgl27.github.io/smarttv-twitch/release/githubio/login/twitch.html';
var AddCode_client_secret = "zhd1wr8lxyz9snzo48rfb70r7vtod6";
var AddCode_UrlToken = 'https://id.twitch.tv/oauth2/token?';
//Variable initialization end

function AddCode_init() {
    AddCode_loadingData = false;
    Main_CounterDialogRst();
    Main_HideWarningDialog();
    ScreensObj_SetTopLable(STR_USER_CODE);
    Main_AddCodeInput.placeholder = STR_PLACEHOLDER_OAUTH;
    Main_ShowElement('oauth_scroll');
    Main_innerHTML("oauth_text", STR_OAUTH_IN +
        '<div style="display: inline-block; color: #FF0000; font-size: 110%; font-family: \'Roboto-Bold\';">' +
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].name + '</div>' + STR_OAUTH_EXPLAIN);
    AddCode_inputFocus();
}

function AddCode_exit() {
    AddCode_RemoveinputFocus(false);
    document.body.removeEventListener("keydown", AddCode_handleKeyDown);
    Main_HideElement('oauth_scroll');
}

function AddCode_handleKeyDown(event) {
    if (AddCode_loadingData || AddCode_keyBoardOn) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else {
                Main_values.Main_Go = Main_Users;
                AddCode_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_PLAY:
        case KEY_PAUSE:
        case KEY_PLAYPAUSE:
        case KEY_ENTER:
            AddCode_inputFocus();
            break;
        default:
            break;
    }
}

function AddCode_inputFocus() {
    document.body.removeEventListener("keydown", AddCode_handleKeyDown);
    document.body.addEventListener("keydown", AddCode_KeyboardEvent, false);
    Main_AddCodeInput.placeholder = STR_PLACEHOLDER_OAUTH;
    Main_AddCodeInput.focus();
    AddCode_keyBoardOn = true;
}

function AddCode_RemoveinputFocus(EnaKeydown) {
    Main_AddCodeInput.blur();
    AddCode_removeEventListener();
    document.body.removeEventListener("keydown", AddCode_KeyboardEvent);
    Main_AddCodeInput.placeholder = STR_PLACEHOLDER_PRESS + STR_PLACEHOLDER_OAUTH;

    if (EnaKeydown) document.body.addEventListener("keydown", AddCode_handleKeyDown, false);
    window.setTimeout(function() {
        AddCode_keyBoardOn = false;
    }, 250);
}

function AddCode_removeEventListener() {
    if (Main_AddCodeInput !== null) {
        var elClone = Main_AddCodeInput.cloneNode(true);
        Main_AddCodeInput.parentNode.replaceChild(elClone, Main_AddCodeInput);
        Main_AddCodeInput = document.getElementById("oauth_input");
    }
}

function AddCode_KeyboardEvent(event) {
    if (AddCode_loadingData) return;

    switch (event.keyCode) {
        case KEY_RETURN:
            if (Main_isAboutDialogShown()) Main_HideAboutDialog();
            else if (Main_isControlsDialogShown()) Main_HideControlsDialog();
            else {
                Main_values.Main_Go = Main_Users;
                AddCode_exit();
                Main_SwitchScreen();
            }
            break;
        case KEY_KEYBOARD_DELETE_ALL:
            Main_AddCodeInput.value = '';
            event.preventDefault();
            break;
        case KEY_KEYBOARD_DONE:
        case KEY_KEYBOARD_CANCEL:
        case KEY_DOWN:
            if (Main_AddCodeInput.value !== '' && Main_AddCodeInput.value !== null) {
                AddCode_Code = Main_AddCodeInput.value;
                AddCode_loadingDataTry = 0;
                Main_HideElement('oauth_scroll');
                Main_showLoadDialog();
                AddCode_requestTokens();
            }
            AddCode_RemoveinputFocus(true);
            break;
        case KEY_KEYBOARD_BACKSPACE:
            Main_AddCodeInput.value = Main_AddCodeInput.value.slice(0, -1);
            event.preventDefault();
            break;
        case KEY_KEYBOARD_SPACE:
            Main_AddCodeInput.value += ' ';
            event.preventDefault();
            break;
        default:
            break;
    }
}

function AddCode_refreshTokens(position, tryes, callbackFunc, callbackFuncNOK) {
    if (!AddUser_UsernameArray[position] || !AddUser_UsernameArray[position].access_token) return;

    var xmlHttp = new XMLHttpRequest();

    var url = AddCode_UrlToken + 'grant_type=refresh_token&client_id=' +
        encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
        '&refresh_token=' + encodeURIComponent(AddUser_UsernameArray[position].refresh_token) +
        '&redirect_uri=' + AddCode_redirect_uri;

    xmlHttp.open("POST", url, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                AddCode_refreshTokensSucess(xmlHttp.responseText, position, callbackFunc);
            } else {
                try {
                    var response = JSON.parse(xmlHttp.responseText);
                    if (response.message) {
                        if (Main_A_includes_B(response.message, 'Invalid refresh token')) {
                            AddCode_requestTokensFailRunning(position);
                            if (callbackFuncNOK) callbackFuncNOK();
                        } else AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
                    } else AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
                } catch (e) {
                    AddCode_refreshTokensError(position, tryes, callbackFunc, callbackFuncNOK);
                }
            }
        }
    };

    xmlHttp.send(null);
}

function AddCode_refreshTokensError(position, tryes, callbackFuncOK, callbackFuncNOK) {
    tryes++;
    if (tryes < 5) AddCode_refreshTokens(position, tryes, callbackFuncOK, callbackFuncNOK);
    else if (callbackFuncNOK) callbackFuncNOK();
}

function AddCode_refreshTokensSucess(responseText, position, callbackFunc) {
    var response = JSON.parse(responseText);
    if (AddCode_TokensCheckScope(response.scope)) {
        AddUser_UsernameArray[position].access_token = response.access_token;
        AddUser_UsernameArray[position].refresh_token = response.refresh_token;
        AddUser_UsernameArray[position].expires_in = response.expires_in;

        AddUser_SaveUserArray();

        AddCode_Refreshtimeout(position);

    } else AddCode_requestTokensFailRunning(position);

    if (callbackFunc) callbackFunc();
}

//Check if has all scopes, in canse they change
function AddCode_TokensCheckScope(scope) {
    if (scope.indexOf("user_read") === -1) return false;
    if (scope.indexOf("user_follows_edit") === -1) return false;
    if (scope.indexOf("user_subscriptions") === -1) return false;

    return true;
}

function AddCode_requestTokens() {
    var theUrl = AddCode_UrlToken + 'grant_type=authorization_code&client_id=' +
        encodeURIComponent(Main_clientId) + '&client_secret=' + encodeURIComponent(AddCode_client_secret) +
        '&code=' + encodeURIComponent(AddCode_Code) + '&redirect_uri=' + AddCode_redirect_uri;

    AddCode_BasexmlHttpGet(theUrl, 'POST', 0, null, AddCode_requestTokensReady);
}

function AddCode_requestTokensReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            AddCode_requestTokensSucess(xmlHttp.responseText);
        } else AddCode_requestTokensError();
        return;
    }
}

function AddCode_requestTokensError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) {
        AddCode_requestTokens();
    } else AddCode_requestTokensFail();

}

function AddCode_requestTokensFail() {
    Main_HideLoadDialog();
    Main_showWarningDialog(STR_OAUTH_FAIL);
    window.setTimeout(function() {
        Main_HideWarningDialog();
        Main_newUsercode = 0;
        Main_HideWarningDialog();
        Main_ShowElement('oauth_scroll');
        AddCode_inputFocus();
        AddCode_loadingData = false;
    }, 4000);
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
    AddUser_SaveUserArray();
}

function AddCode_requestTokensFailRunning(position) {
    //Token fail remove it
    Users_status = false;
    Main_HideLoadDialog();
    AddUser_UsernameArray[position].access_token = 0;
    AddUser_UsernameArray[position].refresh_token = 0;
    AddUser_SaveUserArray();
    Main_SaveValues();
}

function AddCode_requestTokensSucess(responseText) {
    var response = JSON.parse(responseText);
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = response.access_token;
    AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = response.refresh_token;
    AddCode_loadingDataTry = 0;
    AddCode_CheckOauthToken();
}

function AddCode_CheckOauthToken() {
    AddCode_BasexmlHttpGetValidate(AddCode_CheckOauthTokenReady, Main_values.Users_AddcodePosition, 0);
}

function AddCode_CheckOauthTokenReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) AddCode_CheckOauthTokenSucess(xmlHttp.responseText);
        else AddCode_CheckOauthTokenError();
    }
}

function AddCode_CheckOauthTokenSucess(response) {
    var token = JSON.parse(response);
    if (token.login &&
        token.login.indexOf(AddUser_UsernameArray[Main_values.Users_AddcodePosition].name) !== -1) {
        AddUser_SaveUserArray();
        Main_newUsercode = 0;
        Main_HideLoadDialog();
        Users_status = false;
        Main_values.Main_Go = Main_Users;
        Main_SaveValues();
        Main_showWarningDialog(STR_USER_CODE_OK);
        window.setTimeout(function() {
            Main_HideLoadDialog();
            AddCode_exit();
            Users_status = false;
            Users_init();
            AddCode_loadingData = false;
            Main_AddCodeInput.value = '';
        }, 3000);
    } else {
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].access_token = 0;
        AddUser_UsernameArray[Main_values.Users_AddcodePosition].refresh_token = 0;
        Main_showWarningDialog(STR_OAUTH_FAIL_USER + AddUser_UsernameArray[Main_values.Users_AddcodePosition].name);
        window.setTimeout(function() {
            Main_HideWarningDialog();
            Main_ShowElement('oauth_scroll');
            AddCode_inputFocus();
        }, 4000);
    }
    return;
}

function AddCode_CheckOauthTokenError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_CheckOauthToken();
    else AddCode_requestTokensFail();
}

function AddCode_CheckTokenStart(position) {
    AddCode_CheckToken(position, 0);
}

function AddCode_CheckToken(position, tryes) {
    AddCode_BasexmlHttpGetValidate(AddCode_CheckTokenReady, position, tryes);
}

function AddCode_CheckTokenReady(xmlHttp, position, tryes) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) AddCode_CheckTokenSuccess(xmlHttp.responseText, position);
        else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(position, 0, null, null);
        } else AddCode_CheckTokenError(position, tryes);
    }
}

function AddCode_CheckTokenSuccess(responseText, position) {
    var token = JSON.parse(responseText);
    if (token.scopes && !AddCode_TokensCheckScope(token.scopes)) AddCode_requestTokensFailRunning(position);
    else if (token.expires_in) {
        AddUser_UsernameArray[position].expires_in = token.expires_in;
        AddCode_Refreshtimeout(position);
    }
}

function AddCode_Refreshtimeout(position) {
    window.clearTimeout(AddUser_UsernameArray[position].timeout_id);

    if (AddUser_UsernameArray[position].access_token) {
        AddUser_UsernameArray[position].timeout_id = window.setTimeout(function() {

            AddCode_refreshTokens(position, 0, null, null);

        }, (parseInt(AddUser_UsernameArray[position].expires_in) - 60) * 1000);
    }
}

function AddCode_CheckTokenError(position, tryes) {
    tryes++;
    if (tryes < AddCode_loadingDataTryMax) AddCode_CheckToken(position, tryes);
}

function AddCode_CheckFollow() {
    AddCode_loadingDataTry = 0;
    AddCode_IsFollowing = false;
    AddCode_RequestCheckFollow();
}

function AddCode_RequestCheckFollow() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 2, null, AddCode_RequestCheckFollowReady);
}

function AddCode_RequestCheckFollowReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //yes
            AddCode_RequestCheckFollowOK();
        } else if (xmlHttp.status === 404) { //no
            AddCode_RequestCheckFollowNOK(xmlHttp.responseText);
        } else { // internet error
            AddCode_RequestCheckFollowError();
        }
    }
}

function AddCode_RequestCheckFollowOK() {
    AddCode_IsFollowing = true;
    if (AddCode_PlayRequest) Play_setFollow();
    else ChannelContent_setFollow();
}

function AddCode_RequestCheckFollowNOK(response) {
    response = JSON.parse(response);
    if (response.error) {
        if ((response.error + '').indexOf('Not Found') !== -1) {
            AddCode_IsFollowing = false;
            if (AddCode_PlayRequest) Play_setFollow();
            else ChannelContent_setFollow();
        } else AddCode_RequestCheckFollowError();
    } else AddCode_RequestCheckFollowError();
}

function AddCode_RequestCheckFollowError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckFollow();
    else {
        if (AddCode_PlayRequest) Play_setFollow();
        else ChannelContent_setFollow();
    }
}

function AddCode_Follow() {
    AddCode_loadingDataTry = 0;
    AddCode_FollowRequest();
}

function AddCode_FollowRequest() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_FollowRequestReady);
}

function AddCode_FollowRequestReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success user now is following the channel
            AddCode_IsFollowing = true;
            if (AddCode_PlayRequest) Play_setFollow();
            else ChannelContent_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_Follow, null);
        } else {
            AddCode_FollowRequestError();
        }
    }
}

function AddCode_FollowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_FollowRequest();
}

function AddCode_UnFollow() {
    AddCode_loadingDataTry = 0;
    AddCode_UnFollowRequest();
}

function AddCode_UnFollowRequest() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/channels/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'DELETE', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_UnFollowRequestReady);
}

function AddCode_UnFollowRequestReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 204) { //success user is now not following the channel
            AddCode_IsFollowing = false;
            if (AddCode_PlayRequest) Play_setFollow();
            else ChannelContent_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_UnFollow, null);
        } else {
            AddCode_UnFollowRequestError();
        }
    }
}

function AddCode_UnFollowRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_UnFollowRequest();
}

function AddCode_CheckSub() {
    AddCode_loadingDataTry = 0;
    AddCode_IsSub = false;
    AddCode_RequestCheckSub();
}

function AddCode_RequestCheckSub() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/subscriptions/' + AddCode_Channel_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'GET', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestCheckSubReady);
}

function AddCode_RequestCheckSubReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success yes user is a SUB
            AddCode_IsSub = true;
            PlayVod_isSub();
        } else if (xmlHttp.status === 422) { //channel does not have a subscription program
            AddCode_RequestCheckSubfail();
        } else if (xmlHttp.status === 404) { //success no user is not a sub
            var response = JSON.parse(xmlHttp.responseText);
            if (response.error) {
                if ((response.error + '').indexOf('Not Found') !== -1) {
                    AddCode_RequestCheckSubfail();
                } else AddCode_RequestCheckSubError();
            } else AddCode_RequestCheckSubError();
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_CheckSub, AddCode_RequestCheckSubfail);
        } else { // internet error
            AddCode_RequestCheckSubError();
        }
    }
}

function AddCode_RequestCheckSubError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckSub();
    else AddCode_RequestCheckSubfail();
}

function AddCode_RequestCheckSubfail() {
    AddCode_IsSub = false;
    PlayVod_NotSub();
}

function AddCode_FollowGame() {
    AddCode_loadingDataTry = 0;
    if (Main_values.Main_gameSelected_id) AddCode_RequestFollowGame();
    else AddCode_GetGameId();
}

function AddCode_GetGameId() {
    var theUrl = 'https://api.twitch.tv/api/games/' + encodeURIComponent(Main_values.Main_gameSelected);

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_GetGameIdReady);
}

function AddCode_GetGameIdReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
            Main_values.Main_gameSelected_id = JSON.parse(xmlHttp.responseText)._id;
            AddCode_loadingDataTry = 0;
            AddCode_RequestFollowGame();
            return;
        } else { // internet error
            AddCode_GetGameIdError();
        }
    }
}

function AddCode_GetGameIdError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_GetGameId();
}

function AddCode_RequestFollowGame() {
    var theUrl = Main_kraken_api + 'users/' + AddUser_UsernameArray[0].id + '/follows/games/' +
        Main_values.Main_gameSelected_id + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGet(theUrl, 'PUT', 3, Main_OAuth + AddUser_UsernameArray[0].access_token, AddCode_RequestFollowGameReady);
}

function AddCode_RequestFollowGameReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success we now follow the game
            AGame_following = true;
            AGame_setFollow();
            return;
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_FollowGame, null);
        } else { // internet error
            AddCode_FollowGameRequestError();
        }
    }
}

function AddCode_FollowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestFollowGame();
}

function AddCode_UnFollowGame() {
    AddCode_loadingDataTry = 0;
    AddCode_RequestUnFollowGame();
}

function AddCode_RequestUnFollowGame() {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name +
        '/follows/games/' + encodeURIComponent(Main_values.Main_gameSelected) + '?oauth_token=' +
        AddUser_UsernameArray[0].access_token + Main_TwithcV5Flag;

    AddCode_BasexmlHttpGet(theUrl, 'DELETE', 2, null, AddCode_UnFollowGameRequestReady);
}

function AddCode_UnFollowGameRequestReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {

        if (xmlHttp.status === 404 || xmlHttp.status === 204) { // success we now unfollow the game
            if (xmlHttp.status === 204) { // success we now unfollow the game
                AGame_following = false;
                AGame_setFollow();
            } else if (JSON.parse(xmlHttp.responseText).message.indexOf('does not follow') !== -1) {
                AGame_following = false;
                AGame_setFollow();
            } else AddCode_UnFollowGameRequestError();
        } else if (xmlHttp.status === 401 || xmlHttp.status === 403) { //token expired
            AddCode_refreshTokens(0, 0, AddCode_UnFollowGame, null);
        } else { // internet error
            AddCode_UnFollowGameRequestError();
        }
    }
}

function AddCode_UnFollowGameRequestError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestUnFollowGame();
    else {
        Main_showWarningDialog(STR_410_FEATURING);
        window.setTimeout(Main_HideWarningDialog, 2000);
    }
}

function AddCode_CheckFollowGame() {
    AddCode_loadingDataTry = 0;
    AddCode_RequestCheckFollowGame();
}

function AddCode_RequestCheckFollowGame() {
    var theUrl = 'https://api.twitch.tv/api/users/' + AddUser_UsernameArray[0].name + '/follows/games/' +
        encodeURIComponent(Main_values.Main_gameSelected) + Main_TwithcV5Flag_I;

    AddCode_BasexmlHttpGetBack(theUrl, 'GET', 2, null, AddCode_CheckFollowGameReady);
}

function AddCode_CheckFollowGameReady(xmlHttp) {
    if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) { //success yes user follows
            AGame_following = true;
            AGame_setFollow();
            return;
        } else if (xmlHttp.status === 404) { //success no user doesnot follows
            AGame_following = false;
            AGame_setFollow();
            return;
        } else { // internet error
            AddCode_CheckFollowGameError();
            return;
        }
    }
}

function AddCode_CheckFollowGameError() {
    AddCode_loadingDataTry++;
    if (AddCode_loadingDataTry < AddCode_loadingDataTryMax) AddCode_RequestCheckFollowGame();
    else {
        AGame_following = false;
        AGame_setFollow();
    }
}

function AddCode_BasexmlHttpGet(theUrl, type, HeaderQuatity, access_token, callbackready) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(type, theUrl, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;

    Main_Headers[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers[i][0], Main_Headers[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp);
    };

    xmlHttp.send(null);
}

function AddCode_BasexmlHttpGetBack(theUrl, type, HeaderQuatity, access_token, callbackready) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open(type, theUrl, true);
    xmlHttp.timeout = AddCode_loadingDataTimeout;

    Main_Headers_Back[2][1] = access_token;

    for (var i = 0; i < HeaderQuatity; i++)
        xmlHttp.setRequestHeader(Main_Headers_Back[i][0], Main_Headers_Back[i][1]);

    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp);
    };

    xmlHttp.send(null);
}

function AddCode_BasexmlHttpGetValidate(callbackready, position, tryes) {
    var theUrl = 'https://id.twitch.tv/oauth2/validate';

    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.setRequestHeader(Main_Authorization, Main_OAuth + AddUser_UsernameArray[position].access_token);

    xmlHttp.timeout = 10000;
    xmlHttp.ontimeout = function() {};

    xmlHttp.onreadystatechange = function() {
        callbackready(xmlHttp, position, tryes);
    };

    xmlHttp.send(null);
}