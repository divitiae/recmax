function CTextPerfect(oParentContainer) {

    var _oParentContainer = oParentContainer;

    var _oStartPoint;
    var _oEndPoint;
    var _oText;
    var _oTextStroke;
    var _oContainer;

    this._init = function() {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        _oText = new createjs.Text(TEXT_PERFECT, "100px " + FONT_GAME, TEXT_COLOR);
        _oText.textAlign = "center";

        _oTextStroke = new createjs.Text(TEXT_PERFECT, "100px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oTextStroke.textAlign = "center";
        _oTextStroke.outline = 3;

        _oStartPoint = {
            x: PERFECT_TEXT_START_POINT.x,
            y: PERFECT_TEXT_START_POINT.y - s_iOffsetY
        };
        _oEndPoint = {
            x: PERFECT_TEXT_END_POINT.x,
            y: PERFECT_TEXT_END_POINT.y - s_iOffsetY
        };
        _oContainer.addChild(_oTextStroke, _oText);
        _oContainer.visible = false;

    };

    this.updatePoints = function(iNewX, iNewY) {
        _oStartPoint.y = PERFECT_TEXT_START_POINT.y - iNewY;
        _oEndPoint.y = PERFECT_TEXT_END_POINT.y - iNewY;
    };

    this.animText = function() {
        _oContainer.x = _oStartPoint.x;
        _oContainer.y = _oStartPoint.y;
        _oContainer.visible = true;
        _oContainer.alpha = 1;
        createjs.Tween.get(_oContainer, {
            override: true
        }).to({
            x: _oEndPoint.x,
            y: _oEndPoint.y,
            alpha: 0
        }, MS_PERFECT_TEXT, createjs.Ease.cubicOut).set({
            visible: false
        });
    };

    this._init();

    return this;
}