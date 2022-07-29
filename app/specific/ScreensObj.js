//Spacing for reease maker not trow erros frm jshint
var Main_ItemsLimitMax = 100;

var ChannelClip_game = '';
var ChannelClip_views = '';
var ChannelClip_title = '';
var ChannelClip_playUrl = '';
var ChannelClip_playUrl2 = '';
var ChannelClip_createdAt = '';
var ChannelClip_language = '';

var ChannelVod_vodOffset = 0;
var ChannelVod_DurationSeconds = 0;
var ChannelVod_language = '';
var ChannelVod_createdAt = '';
var ChannelVod_views = '';
var ChannelVod_Duration = '';
var ChannelVod_title = '';
var ChannelVod_game = '';

var Vod_DoAnimateThumb = 1;

var AGame_following = false;

var noop_fun = function () {};
var userGameQuery = '{"query":"{user(id: \\"%x\\") {followedGames(first: 100,type:LIVE){nodes {id displayName boxArtURL viewersCount channelsCount }}}}"}';
var featuredQuery =
    '{"query":"{featuredStreams(first:10,acceptedMature:true%x){stream{type,game{displayName,id},title,id,previewImageURL,viewersCount,createdAt,broadcaster{roles{isPartner},id,login,displayName,language,profileImageURL(width: 300)}}}}"}';

//Screens
var Clip;
var ChannelClip;
var AGameClip;
var Game;
var UserGames;
var Live;
var Featured;
var AGame;
var Vod;
var AGameVod;
var UserVod;
var ChannelVod;
var UserLive;
var UserChannels;
var SearchGames;
var SearchLive;
var SearchChannels;

var Base_obj = {
    posX: 0,
    posY: 0,
    currY: 0,
    row_id: 0,
    offsettopFontsize: 0,
    offsettop: 0,
    coloumn_id: 0,
    dataEnded: false,
    idObject: {},
    loadingData: false,
    itemsCount: 0,
    loadingDataTryMax: 5,
    loadingDataTimeout: 3500,
    MaxOffset: 0,
    offset: 0,
    visiblerows: 3,
    status: false,
    emptyContent: false,
    itemsCountCheck: false,
    FirstLoad: false,
    row: 0,
    data: null,
    token: null,
    data_cursor: 0,
    loadDataSuccess: Screens_loadDataSuccess,
    addrow: Screens_addrow,
    key_exit: function (goSidepanel) {
        //TODO overwrite this on if object
        Screens_RemoveAllFocus();

        if (this.screen === Main_aGame && !goSidepanel) {
            if (Main_values.Games_return) {
                Main_values.Main_Go = Main_SearchGames;
                Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                Main_values.gameSelectedOld = null;
            } else {
                Main_values.Main_Go = Main_values.Main_BeforeAgame;
                Main_values.Main_BeforeAgame = Main_games;
            }
            Screens_BasicExit(Main_values.Main_Go);
            Main_SwitchScreenAction();
        } else if ((this.screen === Main_SearchLive || this.screen === Main_SearchGames || this.screen === Main_SearchChannels) && !goSidepanel) {
            if (Main_values.Main_Go === Main_values.Main_BeforeSearch) Main_values.Main_Go = Main_Live;
            else Main_values.Main_Go = Main_values.Main_BeforeSearch;
            Main_values.Search_isSearching = false;
            Screens_BasicExit(Main_values.Main_Go);
            Main_SwitchScreenAction();
        } else if ((this.screen === Main_AGameClip || this.screen === Main_AGameVod) && !goSidepanel) {
            Screens_BasicExit(Main_aGame);
            Main_SwitchScreenAction();
        } else if ((this.screen === Main_ChannelClip || this.screen === Main_ChannelVod) && !goSidepanel) {
            Screens_BasicExit(Main_ChannelContent);
            Main_SwitchScreenAction();
        } else Screens_OpenSidePanel();
    },
    concatenate: function (responseText) {
        if (this.data) {
            responseText = JSON.parse(responseText);

            if (responseText[this.object]) {
                this.data = this.data.concat(responseText[this.object]);
                this.offset = this.data.length;
            }

            this.setMax(responseText);
        } else {
            responseText = JSON.parse(responseText);

            this.data = responseText[this.object];
            if (this.data) {
                this.offset = this.data.length;
                this.setMax(responseText);
            } else this.data = [];

            this.loadDataSuccess();
        }
        this.loadingData = false;
    }
};

var Base_Vod_obj = {
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    thumbclass: 'stream_thumbnail_live_holder',
    rowClass: 'animate_height_transition',
    addFocus: function (y, x, idArray, forceScroll) {
        this.AnimateThumb(this);
        Screens_addFocusVideo(y, x, idArray, forceScroll);
    },
    setMax: function (tempObj) {
        if (this.use_helix) {
            this.cursor = tempObj.pagination.cursor;
            if (!this.cursor || this.cursor === '') this.dataEnded = true;
        } else if (tempObj[this.object].length < Main_ItemsLimitMax - 5) this.dataEnded = true;
    },
    img_404: IMG_404_VIDEO,
    HasSwitches: true,
    period: ['day', 'week', 'month', 'all'],
    empty_str: function () {
        return STR_NO + STR_SPACE + (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA);
    },
    AnimateThumbId: null,
    HasAnimateThumb: true,
    Vod_newImg: new Image(),
    AnimateThumb: function (screen) {
        window.clearInterval(screen.AnimateThumbId);
        if (!Vod_DoAnimateThumb) return;
        var div = document.getElementById(this.ids[6] + this.posY + '_' + this.posX);

        // Only load the animation if it can be loaded
        // This prevent starting animating before it has loaded or animated a empty image
        this.Vod_newImg.onload = function () {
            this.onload = null;
            Main_HideElement(screen.ids[1] + screen.posY + '_' + screen.posX);
            div.style.backgroundSize = div.offsetWidth + 'px';
            var frame = 0;
            screen.AnimateThumbId = window.setInterval(function () {
                // 10 = quantity of frames in the preview img
                div.style.backgroundPosition = '0px ' + (++frame % 10) * -div.offsetHeight + 'px';
            }, 650);
        };

        this.Vod_newImg.src = div.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    },
    addCellBase: function (cell, thubnail) {
        if (!this.idObject[cell.id] && (thubnail + '').indexOf('404_processing') === -1) {
            this.itemsCount++;
            this.idObject[cell.id] = 1;

            this.row.appendChild(
                Screens_createCellVod(this.row_id + '_' + this.coloumn_id, this.ids, [
                    thubnail.replace('%{width}x%{height}', Main_VideoSize),
                    cell.user_name,
                    STR_STREAM_ON + Main_videoCreatedAt(cell.created_at),
                    twemoji.parse(cell.title),
                    Main_addCommas(cell.view_count) + STR_VIEWS,
                    cell.language ? Main_lang(cell.language) : '',
                    cell.duration,
                    null,
                    cell.id,
                    cell.language,
                    null,
                    cell.user_login,
                    null,
                    cell.user_id,
                    null,
                    null
                ])
            );

            this.coloumn_id++;
        }
    },
    addCell: function (cell) {
        this.addCellBase(cell, cell.thumbnail_url);
    }
};

function ScreensObj_InitVod() {
    Vod = Screens_assign(
        {
            periodMaxPos: 4,
            HeaderQuatity: 2,
            key_pgDown: Main_Clip,
            key_pgUp: Main_games,
            object: 'vods',
            ids: Screens_ScreenIds('Vod'),
            table: 'stream_table_vod',
            screen: Main_Vod,
            highlightSTR: 'Vod_highlight',
            highlight: Main_getItemBool('Vod_highlight', false),
            periodPos: Main_getItemInt('vod_periodPos', 2),
            base_url: Main_kraken_api + 'videos/top?limit=' + Main_ItemsLimitMax,
            set_url: function () {
                this.url =
                    this.base_url +
                    '&broadcast_type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views&offset=' +
                    this.offset +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            key_play: function () {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else Screens_PeriodStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function () {
                this.TopRowCreated = true;
                this.row = document.createElement('div');
                var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
                var thumbfollow,
                    div,
                    i = 0;

                for (i; i < SwitchesStrings.length; i++) {
                    thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
                    div = document.createElement('div');
                    div.setAttribute('id', this.ids[8] + 'y_' + i);
                    div.className = 'stream_cell_period';
                    div.innerHTML =
                        '<div id="' +
                        this.ids[0] +
                        'y_' +
                        i +
                        '" class="stream_thumbnail_channel_vod" ><div id="' +
                        this.ids[3] +
                        'y_' +
                        i +
                        '" class="stream_channel_follow_game">' +
                        thumbfollow +
                        '</div></div>';
                    this.row.appendChild(div);
                }
                document.getElementById(this.table).appendChild(this.row);
            },
            label_init: function () {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);
                this.SetPeriod();
            },
            SetPeriod: function () {
                Main_setItem('vod_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_VIDEOS, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_SPACE + Main_Periods[this.periodPos - 1]);
            }
        },
        Base_obj
    );

    Vod = Screens_assign(Vod, Base_Vod_obj);
}

function ScreensObj_InitChannelVod() {
    ChannelVod = Screens_assign(
        {
            periodMaxPos: 2,
            HeaderQuatity: 2,
            key_pgDown: Main_ChannelClip,
            object: 'data',
            ids: Screens_ScreenIds('ChannelVod'),
            table: 'stream_table_channel_vod',
            screen: Main_ChannelVod,
            time: ['time', 'views'],
            extraoffset: 0,
            OffSetPos: 0,
            highlightSTR: 'ChannelVod_highlight',
            highlight: Main_getItemBool('ChannelVod_highlight', false),
            periodPos: Main_getItemInt('ChannelVod_periodPos', 1),
            use_helix: true,
            base_url: Main_helix_api + 'videos?first=' + Main_ItemsLimitMax + '&user_id=',
            set_url: function () {
                // https://dev.twitch.tv/docs/api/reference#get-videos
                this.url =
                    this.base_url +
                    encodeURIComponent(Main_values.Main_selectedChannel_id) +
                    '&type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=' +
                    this.time[this.periodPos - 1] +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            key_play: function () {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else if (this.posX === 1) {
                        this.periodPos++;
                        if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                        this.SetPeriod();
                        Screens_StartLoad();
                    } else Screens_OffSetStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function () {
                this.TopRowCreated = true;
                this.row = document.createElement('div');
                var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_TYPE];
                var thumbfollow,
                    div,
                    i = 0;

                for (i; i < SwitchesStrings.length; i++) {
                    thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
                    div = document.createElement('div');
                    div.setAttribute('id', this.ids[8] + 'y_' + i);
                    div.className = 'stream_cell_period';
                    div.innerHTML =
                        '<div id="' +
                        this.ids[0] +
                        'y_' +
                        i +
                        '" class="stream_thumbnail_channel_vod" ><div id="' +
                        this.ids[3] +
                        'y_' +
                        i +
                        '" class="stream_channel_follow_game">' +
                        thumbfollow +
                        '</div></div>';
                    this.row.appendChild(div);
                }
                document.getElementById(this.table).appendChild(this.row);
            },
            lastselectedChannel: '',
            label_init: function () {
                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel !== this.lastselectedChannel) {
                    this.OffSetPos = 0;
                    this.extraoffset = 0;
                    this.status = false;
                }
                this.lastselectedChannel = Main_values.Main_selectedChannel;
                Main_cleanTopLabel();
                Main_ShowElement('label_side_panel');
                this.SetPeriod();
            },
            SetPeriod: function () {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(
                    Main_values.Main_selectedChannelDisplayname,
                    (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + (this.periodPos === 1 ? STR_TIME : STR_VIWES) //+ ', Offset ' + inUseObj.extraoffset
                );
            },
            label_exit: function () {
                Main_RestoreTopLabel();
            }
        },
        Base_obj
    );

    ChannelVod = Screens_assign(ChannelVod, Base_Vod_obj);

    ChannelVod.addCell = function (cell) {
        var thumbnail = cell.thumbnail_url;

        // video content can be null sometimes, in that case the preview will be 404_processing
        // but if the video is from the stream that has not yet ended it can also be 404_processing and not be a null video
        if (!this.row_id && (thumbnail + '').indexOf('404_processing') !== -1) thumbnail = ChannelContent_offline_image !== null ? ChannelContent_offline_image : this.img_404;

        this.addCellBase(cell, thumbnail);
    };
}

function ScreensObj_InitAGameVod() {
    AGameVod = Screens_assign(
        {
            use_helix: true,
            periodMaxPos: 4,
            HeaderQuatity: 2,
            object: 'data',
            key_pgDown: Main_Live,
            key_pgUp: Main_Featured,
            ids: Screens_ScreenIds('AGameVod'),
            table: 'stream_table_a_game_vod',
            screen: Main_AGameVod,
            highlightSTR: 'AGameVod_highlight',
            highlight: Main_getItemBool('AGameVod_highlight', false),
            periodPos: Main_getItemInt('AGameVod_periodPos', 2),
            base_url: Main_helix_api + 'videos?first=' + Main_ItemsLimitMax + '&game_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    Main_values.Main_gameSelected_id +
                    '&type=' +
                    (this.highlight ? 'highlight' : 'archive') +
                    '&sort=views' +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (this.cursor ? '&after=' + this.cursor : '') +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            key_play: function () {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else Screens_PeriodStart();
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function () {
                this.TopRowCreated = true;
                this.row = document.createElement('div');
                var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_CLIP];
                var thumbfollow,
                    div,
                    i = 0;

                for (i; i < SwitchesStrings.length; i++) {
                    thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
                    div = document.createElement('div');
                    div.setAttribute('id', this.ids[8] + 'y_' + i);
                    div.className = 'stream_cell_period';
                    div.innerHTML =
                        '<div id="' +
                        this.ids[0] +
                        'y_' +
                        i +
                        '" class="stream_thumbnail_channel_vod" ><div id="' +
                        this.ids[3] +
                        'y_' +
                        i +
                        '" class="stream_channel_follow_game">' +
                        thumbfollow +
                        '</div></div>';
                    this.row.appendChild(div);
                }
                document.getElementById(this.table).appendChild(this.row);
            },
            OldgameSelected: '',
            label_init: function () {
                ScreensObj_TopLableAgameInit();
                this.SetPeriod();
            },
            label_exit: ScreensObj_TopLableAgameExit,
            SetPeriod: function () {
                Main_setItem('AGameVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + STR_SPACE + Main_Periods[this.periodPos - 1]);
            }
        },
        Base_obj
    );

    AGameVod = Screens_assign(AGameVod, Base_Vod_obj);
}

function ScreensObj_InitUserVod() {
    UserVod = Screens_assign(
        {
            periodMaxPos: 2,
            HeaderQuatity: 3,
            object: 'videos',
            key_pgDown: Main_UserChannels,
            key_pgUp: Main_usergames,
            ids: Screens_ScreenIds('UserVod'),
            table: 'stream_table_user_vod',
            screen: Main_UserVod,
            time: ['time', 'views'],
            highlightSTR: 'UserVod_highlight',
            highlight: Main_getItemBool('UserVod_highlight', false),
            periodPos: Main_getItemInt('UserVod_periodPos', 1),
            base_url: Main_kraken_api + 'videos/followed?limit=' + Main_ItemsLimitMax,
            set_url: function () {
                this.token = Main_OAuth + AddUser_UsernameArray[0].access_token;

                this.url = this.base_url + '&broadcast_type=' + (this.highlight ? 'highlight' : 'archive') + '&sort=' + this.time[this.periodPos - 1] + '&offset=' + this.offset;
            },
            key_play: function () {
                if (this.posY === -1) {
                    if (this.posX === 0) {
                        this.highlight = !this.highlight;
                        this.SetPeriod();
                        Screens_StartLoad();
                        Main_setItem(this.highlightSTR, this.highlight ? 'true' : 'false');
                    } else {
                        this.periodPos++;
                        if (this.periodPos > this.periodMaxPos) this.periodPos = 1;
                        this.SetPeriod();
                        Screens_StartLoad();
                    }
                } else Main_OpenVod(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            },
            SwitchesIcons: ['movie-play', 'history'],
            addSwitches: function () {
                this.TopRowCreated = true;
                this.row = document.createElement('div');
                var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_VOD, STR_SPACE + STR_SPACE + STR_SWITCH_TYPE];
                var thumbfollow,
                    div,
                    i = 0;

                for (i; i < SwitchesStrings.length; i++) {
                    thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
                    div = document.createElement('div');
                    div.setAttribute('id', this.ids[8] + 'y_' + i);
                    div.className = 'stream_cell_period';
                    div.innerHTML =
                        '<div id="' +
                        this.ids[0] +
                        'y_' +
                        i +
                        '" class="stream_thumbnail_channel_vod" ><div id="' +
                        this.ids[3] +
                        'y_' +
                        i +
                        '" class="stream_channel_follow_game">' +
                        thumbfollow +
                        '</div></div>';
                    this.row.appendChild(div);
                }
                document.getElementById(this.table).appendChild(this.row);
            },
            label_init: function () {
                this.SetPeriod();
                Sidepannel_SetTopOpacity(this.screen);
            },
            SetPeriod: function () {
                Main_setItem('UserVod_periodPos', this.periodPos);

                ScreensObj_SetTopLable(STR_USER, (this.highlight ? STR_PAST_HIGHL : STR_PAST_BROA) + (this.periodPos === 1 ? STR_TIME : STR_VIWES));
            }
        },
        Base_obj
    );

    UserVod = Screens_assign(UserVod, Base_Vod_obj);
}

var Base_Live_obj = {
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ItemsLimit: Main_ItemsLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    rowClass: 'animate_height_transition',
    thumbclass: 'stream_thumbnail_live_holder',
    img_404: IMG_404_VIDEO,
    setMax: function (tempObj) {
        if (this.use_helix) {
            this.cursor = tempObj.pagination.cursor;
            if (!this.cursor || this.cursor === '') this.dataEnded = true;
        } else {
            this.MaxOffset = tempObj._total;

            if (!tempObj[this.object]) this.dataEnded = true;
            else if (typeof this.MaxOffset === 'undefined') {
                if (tempObj[this.object].length < 90) this.dataEnded = true;
            } else {
                if (this.data.length >= this.MaxOffset) this.dataEnded = true;
            }
        }
    },
    check_offset: function () {
        if (this.offset >= 900 || (typeof this.MaxOffset !== 'undefined' && this.offset && this.offset + Main_ItemsLimitMax > this.MaxOffset)) this.dataEnded = true;
    },
    empty_str: function () {
        return STR_NO + STR_SPACE + STR_LIVE_CHANNELS;
    },
    addCell: function (cell) {
        this.addCellTemp(cell);
    },
    addCellTemp: function (cell) {
        var id_cell = this.use_helix ? cell.user_id : cell.channel._id;

        if (!this.idObject[id_cell]) {
            this.itemsCount++;
            this.idObject[id_cell] = 1;
            if (this.use_helix) {
                this.row.appendChild(
                    Screens_createCellLive(this.row_id + '_' + this.coloumn_id, [cell.user_login, cell.user_id, Main_is_rerun(cell.type), cell.game_id], this.ids, [
                        cell.thumbnail_url.replace('{width}x{height}', Main_VideoSize),
                        cell.user_name,
                        cell.title,
                        cell.game_name,
                        STR_SINCE + Play_streamLiveAt(cell.started_at) + STR_SPACE + STR_FOR + Main_addCommas(cell.viewer_count) + STR_SPACE + STR_VIEWER,
                        '[' + cell.language.toUpperCase() + ']'
                    ])
                );
            } else {
                this.row.appendChild(
                    Screens_createCellLive(this.row_id + '_' + this.coloumn_id, [cell.channel.name, cell.channel._id, Main_is_rerun(cell.broadcast_platform)], this.ids, [
                        cell.preview.template.replace('{width}x{height}', Main_VideoSize),
                        cell.channel.display_name,
                        cell.channel.status,
                        cell.game,
                        STR_SINCE + Play_streamLiveAt(cell.created_at) + STR_SPACE + STR_FOR + Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER,
                        Main_videoqualitylang(cell.video_height, cell.average_fps, cell.channel.broadcaster_language)
                    ])
                );
            }
            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitLive() {
    Live = Screens_assign(
        {
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('Live'),
            table: 'stream_table_live',
            screen: Main_Live,
            object: 'data',
            key_pgDown: Main_Featured,
            key_pgUp: Main_games,
            use_helix: true,
            base_url: Main_helix_api + 'streams?first=' + Main_ItemsLimitMax,
            set_url: function () {
                //this.check_offset();

                this.url = this.base_url + (this.cursor ? '&after=' + this.cursor : '') + (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            label_init: function () {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_LIVE);
            },
            key_play: function () {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        },
        Base_obj
    );

    Live = Screens_assign(Live, Base_Live_obj);
}

function ScreensObj_InitSearchLive() {
    SearchLive = Screens_assign(
        {
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('SearchLive'),
            table: 'stream_table_search_live',
            screen: Main_SearchLive,
            object: 'streams',
            base_url: Main_kraken_api + 'search/streams?limit=' + Main_ItemsLimitMax + '&query=',
            set_url: function () {
                this.check_offset();

                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) + '&offset=' + this.offset;
            },
            label_init: function () {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_LIVE, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                Main_values.Search_isSearching = false;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            },
            key_play: function () {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        },
        Base_obj
    );

    SearchLive = Screens_assign(SearchLive, Base_Live_obj);

    // SearchLive.setMax = function(tempObj) {
    //     this.MaxOffset = tempObj._total;
    //     if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined' ||
    //         (this.data.length < Main_ItemsLimitMax)) this.dataEnded = true;
    // };
}

function ScreensObj_InitUserLive() {
    UserLive = Screens_assign(
        {
            HeaderQuatity: 3,
            ids: Screens_ScreenIds('UserLive'),
            table: 'stream_table_user_live',
            screen: Main_UserLive,
            object: 'data',
            key_pgDown: Main_usergames,
            key_pgUp: Main_UserChannels,
            base_url: Main_helix_api + 'streams/',
            loadChannelOffsset: 0,
            followerChannels: '',
            followerChannelsDone: false,
            use_helix: true,
            set_url: function () {
                //this.check_offset();

                //this.token = Main_Bearer + AddUser_UsernameArray[0].access_token;
                this.url = this.base_url + 'followed?user_id=' + AddUser_UsernameArray[0].id + '&first=' + Main_ItemsLimitMax + (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                ScreensObj_TopLableUserInit();
                ScreensObj_SetTopLable(STR_USER, STR_LIVE_CHANNELS);
            },
            key_play: function () {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        },
        Base_obj
    );

    UserLive = Screens_assign(UserLive, Base_Live_obj);
}

function ScreensObj_InitAGame() {
    AGame = Screens_assign(
        {
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('AGame'),
            table: 'stream_table_a_game',
            screen: Main_aGame,
            object: 'data',
            key_pgDown: Main_Live,
            key_pgUp: Main_Featured,
            use_helix: true,
            base_url: Main_helix_api + 'streams?game_id=',
            set_url: function () {
                //this.check_offset();
                this.url =
                    this.base_url +
                    encodeURIComponent(Main_values.Main_gameSelected_id) +
                    '&first=' +
                    Main_ItemsLimitMax +
                    (this.cursor ? '&after=' + this.cursor : '') +
                    (Main_ContentLang !== '' ? '&language=' + Main_ContentLang : '');
            },
            label_init: function () {
                ScreensObj_TopLableAgameInit();

                if (Main_values.Search_isSearching) {
                    //Reset label as the app may be restoring from background
                    Main_cleanTopLabel();
                } else Main_values.gameSelectedOld = null;

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_LIVE);
            },
            label_exit: ScreensObj_TopLableAgameExit,
            HasSwitches: true,
            SwitchesIcons: ['movie-play', 'movie'],
            addSwitches: function () {
                this.TopRowCreated = true;
                this.row = document.createElement('div');
                var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_VIDEOS, STR_SPACE + STR_SPACE + STR_CLIPS];
                var thumbfollow,
                    div,
                    i = 0;

                for (i; i < SwitchesStrings.length; i++) {
                    thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
                    div = document.createElement('div');
                    div.setAttribute('id', this.ids[8] + 'y_' + i);
                    div.className = 'stream_cell_period';
                    div.innerHTML =
                        '<div id="' +
                        this.ids[0] +
                        'y_' +
                        i +
                        '" class="stream_thumbnail_channel_vod" ><div id="' +
                        this.ids[3] +
                        'y_' +
                        i +
                        '" class="stream_channel_follow_game">' +
                        thumbfollow +
                        '</div></div>';
                    this.row.appendChild(div);
                }
                document.getElementById(this.table).appendChild(this.row);
            },
            key_play: function () {
                if (this.posY !== -1) {
                    Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
                } else AGame_headerOptions();
            }
        },
        Base_obj
    );

    AGame = Screens_assign(AGame, Base_Live_obj);
}

function ScreensObj_InitFeatured() {
    Featured = Screens_assign(
        {
            isQuery: true,
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('Featured'),
            table: 'stream_table_featured',
            screen: Main_Featured,
            key_pgDown: Main_games,
            key_pgUp: Main_Live,
            object: 'data',
            base_post: featuredQuery,
            set_url: function () {
                this.dataEnded = true;
                this.url = PlayClip_BaseClipUrl;
                this.post = this.base_post.replace('%x', Main_ContentLang === '' ? '' : ',language:\\"' + Main_ContentLang + '\\"');
            },
            label_init: function () {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_FEATURED);
            },
            key_play: function () {
                Main_OpenLiveStream(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
            }
        },
        Base_obj
    );

    Featured = Screens_assign(Featured, Base_Live_obj);

    Featured.concatenate = function (responseText) {
        var responseObj = JSON.parse(responseText);

        var hasData = responseObj.data && responseObj.data.featuredStreams;

        if (hasData) {
            this.data = responseObj.data.featuredStreams;
            this.loadDataSuccess();
        }

        this.loadingData = false;
    };

    Featured.addCell = function (cell) {
        if (!cell || !cell.stream) {
            return;
        }
        var id_cell = cell.stream.broadcaster.id;

        if (!this.idObject[id_cell]) {
            this.itemsCount++;
            this.idObject[id_cell] = 1;
            var broadcasterLanguage = cell.stream.broadcaster.language ? cell.stream.broadcaster.language.toUpperCase() : '';

            this.row.appendChild(
                Screens_createCellLive(
                    this.row_id + '_' + this.coloumn_id,
                    [cell.stream.broadcaster.login, cell.stream.broadcaster.id, Main_is_rerun(cell.stream.type), cell.stream.game.id],
                    this.ids,
                    [
                        cell.stream.previewImageURL ? cell.stream.previewImageURL.replace('{width}x{height}', Main_VideoSize) : '',
                        cell.stream.broadcaster.displayName,
                        cell.stream.title,
                        cell.stream.game.displayName,
                        STR_SINCE + Play_streamLiveAt(cell.stream.createdAt) + STR_SPACE + STR_FOR + Main_addCommas(cell.stream.viewersCount) + STR_SPACE + STR_VIEWER,
                        '[' + broadcasterLanguage + ']'
                    ]
                )
            );

            this.coloumn_id++;
        }
    };
}

var Base_Clip_obj = {
    HeaderQuatity: 2,
    ItemsLimit: Main_ItemsLimitVideo,
    TopRowCreated: false,
    ItemsReloadLimit: Main_ItemsReloadLimitVideo,
    ColoumnsCount: Main_ColoumnsCountVideo,
    addFocus: Screens_addFocusVideo,
    rowClass: 'animate_height_transition',
    thumbclass: 'stream_thumbnail_live_holder',
    cursor: null,
    object: 'data',
    period: ['day', 'week', 'month', 'all'],
    img_404: IMG_404_VIDEO,
    empty_str: function () {
        return STR_NO + STR_SPACE + STR_CLIPS;
    },
    HasSwitches: true,
    SwitchesIcons: ['history', 'play-1'],
    addSwitches: function () {
        this.TopRowCreated = true;
        this.row = document.createElement('div');
        var SwitchesStrings = [STR_SPACE + STR_SPACE + STR_SWITCH_CLIP, STR_SPACE + STR_SPACE + STR_PLAY_ALL];
        var thumbfollow,
            div,
            i = 0;

        for (i; i < SwitchesStrings.length; i++) {
            thumbfollow = '<i class="icon-' + this.SwitchesIcons[i] + ' stream_channel_follow_icon"></i>' + SwitchesStrings[i];
            div = document.createElement('div');
            div.setAttribute('id', this.ids[8] + 'y_' + i);
            div.className = 'stream_cell_period';
            div.innerHTML =
                '<div id="' +
                this.ids[0] +
                'y_' +
                i +
                '" class="stream_thumbnail_channel_vod" ><div id="' +
                this.ids[3] +
                'y_' +
                i +
                '" class="stream_channel_follow_game">' +
                thumbfollow +
                '</div></div>';
            this.row.appendChild(div);
        }
        document.getElementById(this.table).appendChild(this.row);
    },
    setMax: function (tempObj) {
        this.cursor = tempObj.pagination.cursor;
        if (!this.cursor) this.dataEnded = true;
    },
    key_play: function () {
        if (this.posY === -1) {
            if (!this.loadingData) {
                if (!this.posX) Screens_PeriodStart();
                else {
                    PlayClip_All = true;
                    Screens_removeFocusFollow();
                    this.posX = 0;
                    this.posY = 0;
                    Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
                }
            }
        } else Main_OpenClip(this.posY + '_' + this.posX, this.ids, Screens_handleKeyDown);
    },
    Cells: [],
    addCell: function (cell) {
        var idValue = this.use_helix ? cell.id : cell.tracking_id;

        if (!this.idObject[idValue]) {
            this.itemsCount++;
            this.idObject[idValue] = 1;

            this.row.appendChild(
                Screens_createCellClip(this.row_id + '_' + this.coloumn_id, this.ids, [
                    cell.id,
                    cell.duration,
                    null,
                    cell.broadcaster_name ? cell.broadcaster_name.toLowerCase() : cell.broadcaster_name,
                    cell.broadcaster_name,
                    null,
                    cell.broadcaster_id,
                    cell.video_id && cell.video_id !== '' ? cell.video_id : null, //8
                    null,
                    twemoji.parse(cell.title),
                    '[' + cell.language.toUpperCase() + ']',
                    STR_CREATED_AT + Main_videoCreatedAt(cell.created_at),
                    Main_addCommas(cell.view_count) + STR_VIEWS,
                    cell.thumbnail_url,
                    cell.game_id
                ])
            );

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitClip() {
    Clip = Screens_assign(
        {
            ids: Screens_ScreenIds('Clip'),
            table: 'stream_table_clip',
            screen: Main_Clip,
            key_pgDown: Main_Live,
            key_pgUp: Main_games,
            periodPos: Main_getItemInt('Clip_periodPos', 2),
            base_url: Main_kraken_api + 'clips/top?limit=' + Main_ItemsLimitMax,
            set_url: function () {
                this.url =
                    this.base_url +
                    '&period=' +
                    this.period[this.periodPos - 1] +
                    (this.cursor ? '&cursor=' + this.cursor : '') +
                    (Main_ContentLang !== '' ? '&language=' + (Languages_Extra[Main_ContentLang] ? Languages_Extra[Main_ContentLang] : Main_ContentLang) : '');
            },
            SetPeriod: function () {
                Main_setItem('Clip_periodPos', this.periodPos);
                ScreensObj_SetTopLable(STR_CLIPS, Main_Periods[this.periodPos - 1]);
            },
            label_init: function () {
                this.SetPeriod();
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);
            },
            label_exit: function () {
                Main_RestoreTopLabel();
            }
        },
        Base_obj
    );

    Clip = Screens_assign(Clip, Base_Clip_obj);
}

function ScreensObj_InitChannelClip() {
    ChannelClip = Screens_assign(
        {
            use_helix: true,
            ids: Screens_ScreenIds('ChannelClip'),
            table: 'stream_table_channel_clip',
            screen: Main_ChannelClip,
            key_pgUp: Main_ChannelVod,
            periodPos: Main_getItemInt('ChannelClip_periodPos', 2),
            base_url: Main_helix_api + 'clips?broadcaster_id=',
            set_url: function () {
                this.url =
                    this.base_url +
                    encodeURIComponent(Main_values.Main_selectedChannel_id) +
                    '&first=' +
                    Main_ItemsLimitMax +
                    ScreensObj_ClipGetPeriod(this.periodPos) +
                    (this.cursor ? '&after=' + this.cursor : '');
            },
            SetPeriod: function () {
                Main_setItem('ChannelClip_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_selectedChannelDisplayname, STR_CLIPS + STR_SPACE + Main_Periods[this.periodPos - 1]);
            },
            label_init: function () {
                if (!Main_values.Search_isSearching && Main_values.Main_selectedChannel_id) ChannelContent_RestoreChannelValue();
                if (Main_values.Main_selectedChannel !== this.lastselectedChannel) this.status = false;
                Main_cleanTopLabel();
                this.SetPeriod();
                Main_ShowElement('label_side_panel');
                this.lastselectedChannel = Main_values.Main_selectedChannel;
            },
            label_exit: Main_RestoreTopLabel
        },
        Base_obj
    );

    ChannelClip = Screens_assign(ChannelClip, Base_Clip_obj);
}

function ScreensObj_InitAGameClip() {
    AGameClip = Screens_assign(
        {
            use_helix: true,
            ids: Screens_ScreenIds('AGameClip'),
            table: 'stream_table_a_game_clip',
            screen: Main_AGameClip,
            key_pgDown: Main_Live,
            key_pgUp: Main_Featured,
            periodPos: Main_getItemInt('AGameClip_periodPos', 2),
            base_url: Main_helix_api + 'clips?game_id=',
            set_url: function () {
                this.url = this.base_url + Main_values.Main_gameSelected_id + '&first=' + Main_ItemsLimitMax + ScreensObj_ClipGetPeriod(this.periodPos) + (this.cursor ? '&after=' + this.cursor : '');
            },
            SetPeriod: function () {
                Main_setItem('AGameClip_periodPos', this.periodPos);

                ScreensObj_SetTopLable(Main_values.Main_gameSelected, STR_CLIPS + STR_SPACE + Main_Periods[this.periodPos - 1]);
            },
            label_init: function () {
                ScreensObj_TopLableAgameInit();
                this.SetPeriod();
            },
            label_exit: ScreensObj_TopLableAgameExit
        },
        Base_obj
    );

    AGameClip = Screens_assign(AGameClip, Base_Clip_obj);
}

var Base_Game_obj = {
    HeaderQuatity: 2,
    thumbclass: 'stream_thumbnail_game_holder',
    ItemsReloadLimit: Main_ItemsReloadLimitGame,
    ItemsLimit: Main_ItemsLimitGame,
    rowClass: 'animate_height_transition_games',
    ColoumnsCount: Main_ColoumnsCountGame,
    addFocus: Screens_addFocusGame,
    img_404: IMG_404_GAME,
    empty_str: function () {
        return STR_NO + STR_SPACE + STR_LIVE_GAMES;
    },
    key_play: function () {
        Main_removeFocus(this.posY + '_' + this.posX, this.ids);

        Main_values.Main_gameSelected = JSON.parse(document.getElementById(this.ids[5] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));
        Main_values.Main_gameSelected_id = Main_values.Main_gameSelected[3];
        Main_values.Main_gameSelected = Main_values.Main_gameSelected[1];

        document.body.removeEventListener('keydown', Screens_handleKeyDown);
        Main_values.Main_BeforeAgame = this.screen;
        Main_values.Main_Go = Main_aGame;
        Main_values.Main_BeforeAgameisSet = true;

        Main_addFocusVideoOffset = 0;
        document.body.removeEventListener('keydown', Screens_handleKeyDown);
        Main_HideElement(this.ids[10]);

        Main_SwitchScreenAction();
    },
    setMax: function (tempObj) {
        if (this.use_helix) {
            this.cursor = tempObj.pagination.cursor;
            if (!this.cursor || this.cursor === '') this.dataEnded = true;
        } else {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset) this.dataEnded = true;
        }
    },
    addCell: function (cell) {
        var hasLive = this.isLive || this.screen === Main_games;
        var game = this.hasGameProp && !this.isQuery ? cell.game : cell;

        var id_cell = this.use_helix || this.isQuery ? game.id : game._id;

        if (!this.idObject[id_cell]) {
            this.itemsCount++;
            this.idObject[id_cell] = 1;
            if (this.use_helix) {
                this.row.appendChild(
                    Screens_createCellGame(this.row_id + '_' + this.coloumn_id, this.ids, [
                        game.box_art_url.replace(this.isSearch ? '52x72' : '{width}x{height}', Main_GameSize),
                        game.name,
                        '',
                        id_cell
                    ])
                );
            } else if (this.isQuery) {
                if (!game) {
                    return;
                }

                this.row.appendChild(
                    Screens_createCellGame(this.row_id + '_' + this.coloumn_id, this.ids, [
                        game.boxArtURL.replace('{width}x{height}', Main_GameSize),
                        game.displayName,
                        (cell.channelsCount ? Main_addCommas(cell.channelsCount) : 0) +
                            STR_SPACE +
                            STR_CHANNELS +
                            STR_BR +
                            STR_FOR +
                            (cell.viewersCount ? Main_addCommas(cell.viewersCount) : 0) +
                            STR_SPACE +
                            STR_VIEWER,
                        id_cell
                    ])
                );
            } else {
                this.row.appendChild(
                    Screens_createCellGame(this.row_id + '_' + this.coloumn_id, this.ids, [
                        game.box.template.replace('{width}x{height}', Main_GameSize),
                        game.name,
                        hasLive ? Main_addCommas(cell.channels) + STR_SPACE + STR_CHANNELS + STR_BR + STR_FOR + Main_addCommas(cell.viewers) + STR_SPACE + STR_VIEWER : '',
                        id_cell
                    ])
                );
            }

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitGame() {
    Game = Screens_assign(
        {
            ids: Screens_ScreenIds('Game'),
            table: 'stream_table_games',
            screen: Main_games,
            key_pgDown: Main_Live,
            key_pgUp: Main_Featured,
            object: 'data',
            use_helix: true,
            base_url: Main_helix_api + 'games/top?first=' + Main_ItemsLimitMax,
            set_url: function () {
                if (!this.use_helix && this.offset && this.offset + Main_ItemsLimitMax > this.MaxOffset) this.dataEnded = true;
                this.url = this.base_url + (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                Sidepannel_SetDefaultLables();
                Main_values.Sidepannel_IsUser = false;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_GAMES);
            }
        },
        Base_obj
    );

    Game = Screens_assign(Game, Base_Game_obj);
}

function ScreensObj_InitUserGames() {
    UserGames = Screens_assign(
        {
            ids: Screens_ScreenIds('UserGames'),
            table: 'stream_table_user_games',
            screen: Main_usergames,
            key_pgDownNext: Main_UserChannels,
            key_pgDown: Main_UserChannels,
            key_pgUp: Main_UserLive,
            isLive: false,
            hasGameProp: true,
            OldUserName: '',
            object: 'data',
            isQuery: true,
            base_post: userGameQuery,
            set_url: function () {
                this.dataEnded = true;
                this.url = PlayClip_BaseClipUrl;
                this.post = this.base_post.replace('%x', AddUser_UsernameArray[0].id);
            },
            label_init: function () {
                ScreensObj_TopLableUserInit();
                ScreensObj_SetTopLable(STR_USER, STR_FOLLOW_GAMES);
            },
            label_exit: function () {
                Main_IconLoad('label_refresh', 'icon-refresh', STR_REFRESH + ':' + STR_GUIDE);
            }
        },
        Base_obj
    );

    UserGames = Screens_assign(UserGames, Base_Game_obj);

    UserGames.concatenate = function (responseText) {
        var responseObj = JSON.parse(responseText);

        var hasData = responseObj.data && responseObj.data.user && responseObj.data.user.followedGames && responseObj.data.user.followedGames.nodes;

        if (hasData) {
            this.data = responseObj.data.user.followedGames.nodes;

            this.data.sort(function (a, b) {
                if (!a || !b) {
                    return 0;
                }
                return a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1 : 0;
            });

            this.loadDataSuccess();
        }

        this.loadingData = false;

        if (this.hasBackupData) {
            this.setBackupData(responseObj, this.data, this.lastRefresh, this.gameSelected_Id, this.ContentLang, this.Lang);
        }
    };
}

function ScreensObj_InitSearchGames() {
    SearchGames = Screens_assign(
        {
            use_helix: true,
            ids: Screens_ScreenIds('SearchGames'),
            table: 'stream_table_search_game',
            screen: Main_SearchGames,
            isLive: false,
            OldUserName: '',
            object: 'data',
            lastData: '',
            isSearch: true,
            base_url: Main_helix_api + 'search/categories?query=',
            set_url: function () {
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) + '&first=' + Main_ItemsLimitMax + (this.cursor ? '&after=' + this.cursor : '');
            },
            label_init: function () {
                if (!Main_values.gameSelectedOld) Main_values.gameSelectedOld = Main_values.Main_gameSelected;
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_GAMES, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                Main_values.Main_gameSelected = Main_values.gameSelectedOld;
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
                Main_values.Games_return = false;
            }
        },
        Base_obj
    );

    SearchGames = Screens_assign(SearchGames, Base_Game_obj);
}

var Base_Channel_obj = {
    ItemsLimit: Main_ItemsLimitChannel,
    ColoumnsCount: Main_ColoumnsCountChannel,
    addFocus: Screens_addFocusChannel,
    ItemsReloadLimit: Main_ItemsReloadLimitChannel,
    thumbclass: 'stream_thumbnail_channel_holder',
    rowClass: 'animate_height_transition_channel',
    img_404: IMG_404_LOGO,
    cursor: null,
    setMax: function (tempObj) {
        if (this.use_helix) {
            this.cursor = tempObj.pagination.cursor;
            if (!this.cursor || this.cursor === '') this.dataEnded = true;
        } else {
            this.MaxOffset = tempObj._total;
            if (this.data.length >= this.MaxOffset || typeof this.MaxOffset === 'undefined') this.dataEnded = true;
        }
    },
    empty_str: function () {
        return STR_NO + STR_SPACE + STR_USER_CHANNEL;
    },
    addCellTemp: function (cell) {
        if (!this.idObject[cell.id]) {
            this.itemsCount++;
            this.idObject[cell.id] = 1;

            this.row.appendChild(Screens_createCellChannel(this.row_id + '_' + this.coloumn_id, this.ids, [cell.broadcaster_login, cell.id, cell.thumbnail_url, cell.display_name, null]));

            this.coloumn_id++;
        }
    }
};

function ScreensObj_InitUserChannels() {
    UserChannels = Screens_assign(
        {
            use_helix: true,
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('UserChannels'),
            table: 'stream_table_user_channels',
            screen: Main_UserChannels,
            object: 'data',
            key_pgDown: Main_UserLive,
            key_pgUp: Main_usergames,
            key_pgUpNext: Main_UserChannels,
            base_url: Main_helix_api + 'users/follows?first=' + Main_ItemsLimitMax + '&from_id=',
            base_url_channels: Main_helix_api + 'users?',
            channelDataPos: 0,
            set_url: function () {
                if (this.getFollowed) {
                    this.url = this.base_url + AddUser_UsernameArray[0].id + (this.cursor ? '&after=' + this.cursor : '');
                } else {
                    this.channels = 'id=' + this.channelData[this.channelDataPos].to_id;
                    var i = this.channelDataPos + 1,
                        dataLen = this.channelData.length,
                        len = Math.min(dataLen, i + 99);

                    this.channelDataPos++;
                    for (i; i < len; i++) {
                        this.channels += '&id=' + this.channelData[i].to_id;
                        this.channelDataPos++;
                    }

                    this.url = this.base_url_channels + this.channels;

                    if (dataLen <= i) {
                        this.dataEnded = true;
                    }
                }
            },
            label_init: function () {
                ScreensObj_TopLableUserInit();

                ScreensObj_SetTopLable(STR_USER, STR_USER_CHANNEL);
            },
            key_play: function () {
                if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

                Main_values.Main_selectedChannel = JSON.parse(document.getElementById(this.ids[8] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

                Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
                Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
                Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
                Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];

                document.body.removeEventListener('keydown', Screens_handleKeyDown);
                Main_values.Main_BeforeChannel = Main_UserChannels;
                Main_values.Main_Go = Main_ChannelContent;
                Main_values.Main_BeforeChannelisSet = true;
                AddCode_IsFollowing = true;
                ChannelContent_UserChannels = true;
                Screens_exit();
                Main_SwitchScreen();
            },
            addCell: function (cell) {
                if (!this.idObject[cell.id]) {
                    this.itemsCount++;
                    this.idObject[cell.id] = 1;

                    this.row.appendChild(
                        Screens_createCellChannel(this.row_id + '_' + this.coloumn_id, this.ids, [cell.login, cell.id, cell.profile_image_url, cell.display_name, cell.broadcaster_type === 'partner'])
                    );

                    this.coloumn_id++;
                }
            }
        },
        Base_obj
    );

    UserChannels = Screens_assign(UserChannels, Base_Channel_obj);
    UserChannels.addrow = Screens_addrowChannel;
    UserChannels.visiblerows = 5;

    UserChannels.concatenate = function (responseText) {
        var responseObj = JSON.parse(responseText);

        if (this.getFollowed) {
            var data = responseObj[this.object];

            this.cursor = responseObj.pagination.cursor;

            if (data.length) {
                if (!this.channelData) {
                    this.channelData = data;
                } else {
                    this.channelData.push.apply(this.channelData, responseObj[this.object]);
                }
            } else if (!this.channelData) {
                this.dataEnded = true;
                this.data = [];
                this.loadDataSuccess();
                this.loadingData = false;
                return;
            }

            if (this.cursor && this.cursor !== '') {
                Screens_loadDataRequest(this.screen);
            } else {
                //sort
                this.channelData.sort(function (a, b) {
                    return a.to_login < b.to_login ? -1 : a.to_login > b.to_login ? 1 : 0;
                });
                this.getFollowed = false;
                Screens_loadDataRequest(this.screen);
            }
        } else {
            var tempData = responseObj[this.object];
            if (tempData) {
                tempData.sort(function (a, b) {
                    return a.login < b.login ? -1 : a.login > b.login ? 1 : 0;
                });
            }

            if (this.data) {
                if (tempData) {
                    this.data.push.apply(this.data, tempData);
                    this.offset = this.data.length;
                }
            } else {
                this.data = tempData;
                if (this.data) {
                    this.offset = this.data.length;
                } else this.data = [];

                this.loadDataSuccess();
            }

            this.loadingData = false;
        }
    };
}

function ScreensObj_InitSearchChannels() {
    SearchChannels = Screens_assign(
        {
            HeaderQuatity: 2,
            ids: Screens_ScreenIds('SearchChannels'),
            table: 'stream_table_search_channel',
            screen: Main_SearchChannels,
            object: 'data',
            use_helix: true,
            base_url: Main_helix_api + 'search/channels?first=' + Main_ItemsLimitMax + '&query=',
            set_url: function () {
                this.url = this.base_url + encodeURIComponent(Main_values.Search_data) + '&after=' + (this.cursor ? this.cursor : '');
            },
            label_init: function () {
                Main_values.Search_isSearching = true;
                Main_cleanTopLabel();
                if (this.lastData !== Main_values.Search_data) this.status = false;
                this.lastData = Main_values.Search_data;
                Sidepannel_SetTopOpacity(this.screen);

                ScreensObj_SetTopLable(STR_SEARCH + STR_SPACE + STR_CHANNELS, "'" + Main_values.Search_data + "'");
            },
            label_exit: function () {
                if (!Main_values.Search_isSearching) Main_RestoreTopLabel();
            },
            key_play: function () {
                if (Main_ThumbOpenIsNull(this.posY + '_' + this.posX, this.ids[0])) return;

                Main_values.Main_selectedChannel = JSON.parse(document.getElementById(this.ids[8] + this.posY + '_' + this.posX).getAttribute(Main_DataAttribute));

                Main_values.Main_selectedChannel_id = Main_values.Main_selectedChannel[1];
                Main_values.Main_selectedChannelDisplayname = Main_values.Main_selectedChannel[3];
                Main_values.Main_selectedChannelLogo = Main_values.Main_selectedChannel[2];
                Main_values.Main_selectedChannel = Main_values.Main_selectedChannel[0];

                document.body.removeEventListener('keydown', Screens_handleKeyDown);
                Main_values.Main_BeforeChannel = Main_SearchChannels;
                Main_values.Main_Go = Main_ChannelContent;
                Main_values.Main_BeforeChannelisSet = true;
                AddCode_IsFollowing = false;
                ChannelContent_UserChannels = false;
                Screens_exit();
                Main_SwitchScreen();
            },
            addCell: function (cell) {
                this.addCellTemp(cell);
            }
        },
        Base_obj
    );

    SearchChannels = Screens_assign(SearchChannels, Base_Channel_obj);
    SearchChannels.addrow = Screens_addrowChannel;
    SearchChannels.visiblerows = 5;
}

function ScreensObj_TopLableAgameInit() {
    if (Main_values.Main_OldgameSelected === null) Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;
    Main_ShowElement('label_side_panel');
    if (Main_values.Main_OldgameSelected !== Main_values.Main_gameSelected || inUseObj.gameSelected !== Main_values.Main_gameSelected) inUseObj.status = false;
    inUseObj.gameSelected = Main_values.Main_gameSelected;
    Main_values.Main_OldgameSelected = Main_values.Main_gameSelected;

    Sidepannel_SetDefaultLables();
    Main_values.Sidepannel_IsUser = false;
    Sidepannel_SetTopOpacity(inUseObj.screen);
}

function ScreensObj_TopLableAgameExit() {
    inUseObj.gameSelected = Main_values.Main_gameSelected;
    Main_HideElement('label_side_panel');
}

function ScreensObj_TopLableUserInit() {
    if (inUseObj.OldUserName !== AddUser_UsernameArray[0].name) inUseObj.status = false;
    inUseObj.OldUserName = AddUser_UsernameArray[0].name;

    Sidepannel_SetUserLables();
    Sidepannel_SetTopOpacity(inUseObj.screen);
}

function ScreensObj_SetTopLable(text, small_text) {
    Main_innerHTML('top_lable', text + STR_SPACE + (small_text ? '<div style="font-size: 65%;display: inline-block;">' + small_text + '</div>' : ''));
}

function ScreensObj_ClipGetPeriod(periodPos) {
    if (periodPos === 4) return '';

    var date = '',
        today = new Date(),
        newDate = today,
        day = today.getDate(),
        month = today.getMonth() + 1,
        year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    var dayEnd = '&ended_at=' + year + '-' + month + '-' + day + 'T23:59:59Z';

    newDate.setDate(newDate.getDate() - Main_Periods_Helix[periodPos]);
    day = newDate.getDate();
    month = newDate.getMonth() + 1;
    year = newDate.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    date = '&started_at=' + year + '-' + month + '-' + day + 'T00:00:00Z';

    date += dayEnd;

    return date;
}
