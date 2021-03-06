function CWinPanel(oSpriteBg, bEnd) {

    var _oBg;
    var _oTitleTextStoke;
    var _oTitleText;
    var _oNewScoreTextStroke;
    var _oNewScoreText;
    var _oBestScoreTextStroke;
    var _oBestScoreText;
    var _oGroup;
    var _oButMenu;
    var _oButRestart;
    var _oFlagContainer;

    this._init = function(oSpriteBg) {
        var iSizeFontSecondaryText = 50;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;
        _oGroup.addChild(oFade);

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oGroup.addChild(_oBg);

        _oTitleTextStoke = new createjs.Text("", "100px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oTitleTextStoke.x = CANVAS_WIDTH / 2;
        _oTitleTextStoke.y = 500;
        _oTitleTextStoke.textAlign = "center";
        _oTitleTextStoke.outline = 5;

        _oGroup.addChild(_oTitleTextStoke);

        _oTitleText = new createjs.Text("", "100px " + FONT_GAME, TEXT_COLOR);
        _oTitleText.x = CANVAS_WIDTH / 2;
        _oTitleText.y = _oTitleTextStoke.y;
        _oTitleText.textAlign = "center";

        _oGroup.addChild(_oTitleText);

        _oNewScoreTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oNewScoreTextStroke.x = CANVAS_WIDTH / 2;
        _oNewScoreTextStroke.y = CANVAS_HEIGHT_HALF - 50;
        _oNewScoreTextStroke.textAlign = "center";
        _oNewScoreTextStroke.outline = 5;

        _oGroup.addChild(_oNewScoreTextStroke);

        _oNewScoreText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oNewScoreText.x = CANVAS_WIDTH / 2;
        _oNewScoreText.y = _oNewScoreTextStroke.y;
        _oNewScoreText.textAlign = "center";

        _oGroup.addChild(_oNewScoreText);

        _oBestScoreTextStroke = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oBestScoreTextStroke.x = CANVAS_WIDTH / 2;
        _oBestScoreTextStroke.y = CANVAS_HEIGHT_HALF + 50;
        _oBestScoreTextStroke.textAlign = "center";
        _oBestScoreTextStroke.outline = 5;

        _oGroup.addChild(_oBestScoreTextStroke);

        _oBestScoreText = new createjs.Text("", iSizeFontSecondaryText + "px " + FONT_GAME, TEXT_COLOR);
        _oBestScoreText.x = CANVAS_WIDTH / 2;
        _oBestScoreText.y = _oBestScoreTextStroke.y;
        _oBestScoreText.textAlign = "center";

        _oGroup.addChild(_oBestScoreText);

        var oSpriteButRestart = s_oSpriteLibrary.getSprite("but_restart");
        _oButRestart = new CGfxButton(CANVAS_WIDTH * 0.5 + 290, CANVAS_HEIGHT * 0.5 + 130, oSpriteButRestart, _oGroup);
        _oButRestart.pulseAnimation();
        _oButRestart.addEventListener(ON_MOUSE_DOWN, this._onRestart, this);

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 290, CANVAS_HEIGHT * 0.5 + 130, oSpriteButHome, _oGroup);
        _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

        _oFlagContainer = new createjs.Container();

        _oGroup.addChild(_oFlagContainer);

        _oGroup.on("click", function() {});

        s_oStage.addChild(_oGroup);

    };

    this.unload = function() {
        _oGroup.removeAllEventListeners();
        s_oStage.removeChild(_oGroup);
        if (_oButMenu) {
            _oButMenu.unload();
            _oButMenu = null;
        }

        if (_oButRestart) {
            _oButRestart.unload();
            _oButRestart = null;
        }

    };

    this.show = function(iScore) {

        _oTitleTextStoke.text = TEXT_GAMEOVER;
        _oTitleText.text = TEXT_GAMEOVER;

        _oNewScoreTextStroke.text = TEXT_SCORE + ": " + iScore;
        _oNewScoreText.text = TEXT_SCORE + ": " + iScore;

        _oBestScoreTextStroke.text = TEXT_BEST_SCORE + ": " + s_iBestScore;
        _oBestScoreText.text = TEXT_BEST_SCORE + ": " + s_iBestScore;

        _oGroup.visible = true;

        createjs.Tween.get(_oGroup).wait(MS_WAIT_SHOW_GAME_OVER_PANEL).to({
            alpha: 1
        }, 1250, createjs.Ease.cubicOut).call(function() {
            if (s_oAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_oAdsLevel = 1;
            } else {
                s_oAdsLevel++;
            }
        });

        $(s_oMain).trigger("save_score", iScore);
		gradle.save_score(iScore, 0);
        $(s_oMain).trigger("share_event", iScore);
    };

    this._onContinue = function() {
        var oParent = this;
        createjs.Tween.get(_oGroup, {
            override: true
        }).to({
            alpha: 0
        }, 750, createjs.Ease.cubicOut).call(function() {
            oParent.unload();
        });

        _oButContinue.block(true);
        _oButMenu.block(true);
        s_oGame.onContinue();
    };

    this._onRestart = function() {
        _oButRestart.block(true);
        this.unload();
		gradle.event('btn_retry');
        s_oGame.restartGame();
    };

    this._onExit = function() {

        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg, bEnd);

    return this;
}