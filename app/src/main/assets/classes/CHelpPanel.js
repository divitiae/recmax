function CHelpPanel(iXPos, iYPos, oSprite) {
    var _oHelpBg;
    var _oGroup;
    var _oPage1Container;
    var _oFade;
    var _oGroup;
    var _oButContinue;
    var _oArrowPower;
    var _oArrowRotate;
    var _oPosPower;
    var _oInputPower;
    var _oInputRotate;
    var _bClick = false;

    this._init = function(iXPos, iYPos, oSprite) {
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH * 0.5;
        _oHelpBg.y = CANVAS_HEIGHT * 0.5;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;

        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oGroup.addChild(_oFade);

        _oGroup.addChild(_oHelpBg);

        s_oStage.addChild(_oGroup);

        _oGroup.on("pressup", function() {
            s_oHelpPanel._onExitHelp();
        }, null, true);

        _oPage1Container = new createjs.Container();
        _oPage1Container.alpha = 0;
        this.page1(_oPage1Container);


        if (!s_bMobile)
            _oFade.cursor = "pointer";
    };

    this.page1 = function(oContainer) {

        var oTextMatchStroke;
        oTextMatchStroke = new createjs.Text(TEXT_CONTROLS, "32px " + FONT_GAME, "#ff6000");
        oTextMatchStroke.x = CANVAS_WIDTH * 0.5;
        oTextMatchStroke.y = CANVAS_HEIGHT * 0.5 - 200;
        oTextMatchStroke.textAlign = "center";
        oTextMatchStroke.outline = 5;
        oContainer.addChild(oTextMatchStroke);

        var oTextMatch;
        oTextMatch = new createjs.Text(TEXT_CONTROLS, "32px " + FONT_GAME, TEXT_COLOR);
        oTextMatch.x = CANVAS_WIDTH * 0.5;
        oTextMatch.y = oTextMatchStroke.y;
        oTextMatch.textAlign = "center";
        oContainer.addChild(oTextMatch);

        _oPosPower = {
            x: CANVAS_WIDTH_HALF,
            y: 340
        };

        _oArrowPower = new CArrow(_oPosPower.x, _oPosPower.y, oContainer);

        _oArrowPower.animateMask(1000);

        var oSpriteBall = s_oSpriteLibrary.getSprite("ball");

        var oSpriteInput;
        if (s_bMobile) {
            oSpriteInput = s_oSpriteLibrary.getSprite("help_touch");
        } else {
            oSpriteInput = s_oSpriteLibrary.getSprite("help_mouse");
        }

        _oInputPower = createBitmap(oSpriteInput);

        _oInputPower.x = _oPosPower.x - 130;
        _oInputPower.y = _oPosPower.y - 10;
        _oInputPower.regX = oSpriteInput.width * 0.5;
        _oInputPower.regY = oSpriteInput.height * 0.5;
        oContainer.addChild(_oInputPower);

        var oBallPower = new CBall(_oPosPower.x, _oPosPower.y, null, oSpriteBall, oContainer);

        this.animateInputPower(1000);

        _oArrowRotate = new CArrow(_oPosPower.x, _oPosPower.y + 160, oContainer);
        _oArrowRotate.animateRotation(1000);
        _oArrowRotate.mask(100);

        _oInputRotate = createBitmap(oSpriteInput);
        _oInputRotate.x = _oPosPower.x - 150;
        _oInputRotate.y = _oPosPower.y + 160;
        _oInputRotate.regX = oSpriteInput.width * 0.5;
        _oInputRotate.regY = oSpriteInput.height * 0.5;
        oContainer.addChild(_oInputRotate);

        var oBallRotate = new CBall(_oPosPower.x, _oPosPower.y + 160, null, oSpriteBall, oContainer);

        this.animateInputRotate(1000);

        createjs.Tween.get(oContainer).to({
            alpha: 1
        }, 300, createjs.Ease.cubicOut);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 310, CANVAS_HEIGHT * 0.5 + 145, oSpriteContinue, oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(oContainer);
    };

    this.animateInputPower = function(iTime) {
        createjs.Tween.get(_oInputPower).to({
            x: _oPosPower.x - 230
        }, iTime, createjs.Ease.cubicInOut).call(function() {
            createjs.Tween.get(_oInputPower).to({
                x: _oPosPower.x - 130
            }, iTime, createjs.Ease.cubicInOut).call(function() {
                s_oHelpPanel.animateInputPower(iTime);
            });
        });
    };

    this.animateInputRotate = function(iTime) {
        createjs.Tween.get(_oInputRotate).to({
            y: _oPosPower.y + 60
        }, iTime, createjs.Ease.cubicInOut).call(function() {
            createjs.Tween.get(_oInputRotate).to({
                y: _oPosPower.y + 180
            }, iTime, createjs.Ease.cubicInOut).call(function() {
                s_oHelpPanel.animateInputRotate(iTime);
            });
        });
    };


    this.unload = function() {
        s_oStage.removeChild(_oGroup, _oPage1Container);
        s_oHelpPanel = null;
        _oGroup.off("pressup", function() {
            s_oHelpPanel._onExitHelp();
        }, null, true);
        _oButContinue.unload();
        _oButContinue = null;
        createjs.Tween.removeAllTweens();
    };

    this._onExitHelp = function() {
        if (_bClick) {
            return;
        }
        _bClick = true;

        var oParent = this;
        createjs.Tween.get(_oPage1Container).to({
            alpha: 0
        }, 300, createjs.Ease.cubicOut).call(function() {
            oParent.unload();
            s_oGame._onExitHelp();
        });
    };

    s_oHelpPanel = this;

    this._init(iXPos, iYPos, oSprite);

}

var s_oHelpPanel = null;