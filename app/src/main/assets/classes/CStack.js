function CStack(oInfo, oColor, aEdge, oParentContainer) {

    var _aEdges;
    var _aEdgesLDRU;
    var _aEdgesLURD;
    var _aEdgesDepth;
    var _aLimitPosition;
    var _vDir;
    var _iControlDir = 0;
    var _iID;
    var _aLocalEdge;

    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oLines;
    var _oDepth;
    var _oColor;

    var _bCached = false;

    this._init = function(oInfo, oColor, aEdge) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        _oLines = new createjs.Shape();
        _oDepth = new createjs.Shape();
        _oColor = oColor;
        _iControlDir = oInfo.dir;
        _vDir = new CVector2(DIRECTION_STACKS[oInfo.dir].x, DIRECTION_STACKS[oInfo.dir].y);
        _aLimitPosition = new Array();

        this.setPosition(oInfo.x, oInfo.y);

        this.setEdges(aEdge, {
            x: _oContainer.x,
            y: _oContainer.y
        });

        this.updateSize();
        _oContainer.addChild(_oLines);
        _oContainer.addChild(_oDepth);
    };

    this.setLimitPosition = function(aLimit) {
        for (var i = 0; i < aLimit.length; i++) {
            _aLimitPosition.push(aLimit[i]);
        }
    };

    this.getLimitPosition = function(i) {
        return _aLimitPosition[i];
    };

    this.getAllLimitPosition = function() {
        return _aLimitPosition;
    };

    this.getLeftDownAndRightUpEdges = function() {
        return _aEdgesLDRU;
    };

    this.getLeftUpAndRightDownEdges = function() {
        return _aEdgesLURD;
    };

    this.setDir = function(vDir) {
        _vDir.set(vDir.x, vDir.y);
    };

    this.getDir = function() {
        return _vDir;
    };

    this.isVisible = function() {
        return _oContainer.visible;
    };

    this.setVisible = function(bVal) {
        _oContainer.visible = bVal;
    };

    this.getPosLocal = function() {
        return _oParentContainer.localToGlobal(_oContainer.x, _oContainer.y);
    };

    this.getDirID = function() {
        return _iControlDir;
    };

    this.getID = function() {
        return _iID;
    };

    this.setID = function(iVal) {
        _iID = iVal;
    };

    this.cacheStack = function() {
        //        var oResult = BoundingBoxEdge(_aEdges);
        //
        //        _oContainer.cache(-oResult.xMin, -oResult.yMin, oResult.xMax*2, oResult.yMax*2);
        //
        //        _bCached = true;
    };

    this.updateCache = function() {
        if (!_bCached) {
            return;
        }
        _oLines.updateCache();
        _oDepth.updateCache();
    };

    this.updateSize = function() {
        this.createGraph(_aEdges, _oColor);
        this.createDepthEdge();
        this.updateDepthEffect(_aEdgesDepth, _oColor, true);
    };

    this.createDepthEdge = function() {
        _aEdgesDepth = new Array();

        _aEdgesDepth.push({
            x: _aEdges[1].getPointA().getX(),
            y: _aEdges[1].getPointA().getY()
        }); //RIGHTDOWN
        _aEdgesDepth.push({
            x: _aEdges[1].getPointB().getX(),
            y: _aEdges[1].getPointB().getY()
        }); //CENTER
        _aEdgesDepth.push({
            x: _aEdges[2].getPointB().getX(),
            y: _aEdges[2].getPointB().getY()
        }); //LEFTDOWN
        _aEdgesDepth.push({
            x: _aEdges[2].getPointB().getX(),
            y: _aEdges[2].getPointB().getY() + STACK_DEPTH_SIZE
        }); //LEFTDOWN ISOMETRIC
        _aEdgesDepth.push({
            x: _aEdges[1].getPointB().getX(),
            y: _aEdges[1].getPointB().getY() + STACK_DEPTH_SIZE
        }); //CENTER ISOMETRIC
        _aEdgesDepth.push({
            x: _aEdges[1].getPointA().getX(),
            y: _aEdges[1].getPointA().getY() + STACK_DEPTH_SIZE
        }); //RIGHTDOWN ISOMETRIC
    };

    this.updateDepthEffect = function(aEdge, oColor, bLuminance) {

        if (bLuminance) {
            _oColor.depth = colorLuminance(_oColor.plane, DEPTH_LUMINANCE);
        }
        _oDepth.graphics.clear();
        if (SHOW_EDGES) {
            _oDepth.graphics.beginStroke(oColor.depth);
        }
        if (SHOW_FILL) {
            _oDepth.graphics.beginFill(oColor.depth);
        }
        _oDepth.graphics.setStrokeStyle(_oColor.width);
        for (var i = 0; i < aEdge.length; i++) {
            _oDepth.graphics.lineTo(aEdge[i].x, aEdge[i].y);
        }

        _oDepth.graphics.closePath();
        _oDepth.x = -_oContainer.x;
        _oDepth.y = -_oContainer.y;
    };

    this.perfectPosition = function() {
        var oStartColorRGB = hexToRgb(_oColor.plane);
        var oEndColorRGB = hexToRgb(colorLuminance(_oColor.plane, 0.5));

        var oParent = this;
        new colorLerpShape(_oLines, {
            r: oStartColorRGB.r,
            g: oStartColorRGB.g,
            b: oStartColorRGB.b,
            lerp: 0.0
        }, {
            r: oEndColorRGB.r,
            g: oEndColorRGB.g,
            b: oEndColorRGB.b,
            lerp: 1.0
        }, 0, MS_TIME_PERFECT_HIT, this.createGraph, createjs.Ease.cubicOut, _aEdges, "plane", function() {

            new colorLerpShape(_oLines, {
                r: oEndColorRGB.r,
                g: oEndColorRGB.g,
                b: oEndColorRGB.b,
                lerp: 0.0
            }, {
                r: oStartColorRGB.r,
                g: oStartColorRGB.g,
                b: oStartColorRGB.b,
                lerp: 1.0
            }, 0, MS_TIME_PERFECT_HIT, oParent.createGraph, createjs.Ease.cubicOut, _aEdges, "plane", null);
        });

        var oStartColorRGBDepth = hexToRgb(_oColor.depth);
        var oEndColorRGBDepth = hexToRgb(colorLuminance(_oColor.depth, 0.5));
        new colorLerpShape(_oDepth, {
            r: oStartColorRGBDepth.r,
            g: oStartColorRGBDepth.g,
            b: oStartColorRGBDepth.b,
            lerp: 0.0
        }, {
            r: oEndColorRGBDepth.r,
            g: oEndColorRGBDepth.g,
            b: oEndColorRGBDepth.b,
            lerp: 1.0
        }, 0, MS_TIME_PERFECT_HIT, this.updateDepthEffect, createjs.Ease.cubicOut, _aEdgesDepth, "depth", function() {
            new colorLerpShape(_oDepth, {
                r: oEndColorRGBDepth.r,
                g: oEndColorRGBDepth.g,
                b: oEndColorRGBDepth.b,
                lerp: 0.0
            }, {
                r: oStartColorRGBDepth.r,
                g: oStartColorRGBDepth.g,
                b: oStartColorRGBDepth.b,
                lerp: 1.0
            }, 0, MS_TIME_PERFECT_HIT, oParent.updateDepthEffect, createjs.Ease.cubicOut, _aEdgesDepth, "depth", null);
        });
    };

    this.updateEdgesPosition = function() {
        for (var i = 0; i < _aEdges.length; i++) {
            _aEdges[i].set(_oContainer.x + _aLocalEdge[i].getPointA().getX(), _oContainer.y + _aLocalEdge[i].getPointA().getY(),
                _oContainer.x + _aLocalEdge[i].getPointB().getX(), _oContainer.y + _aLocalEdge[i].getPointB().getY());
        }
    };

    this.createGraph = function(oPoint, oColor) {
        _oLines.graphics.clear();
        if (SHOW_EDGES) {
            _oLines.graphics.beginStroke(oColor.plane);
        }
        if (SHOW_FILL) {
            _oLines.graphics.beginFill(oColor.plane);
        }
        _oLines.graphics.setStrokeStyle(_oColor.width);
        for (var i = 0; i < oPoint.length; i++) {
            _oLines.graphics.lineTo(oPoint[i].getPointA().getX(), oPoint[i].getPointA().getY());
        }

        _oLines.graphics.closePath();
        _oLines.x = -_oContainer.x;
        _oLines.y = -_oContainer.y;

    };

    this.setChildIndex = function(iVal) {
        _oParentContainer.setChildIndex(_oContainer, iVal);
    };

    this.getChildIndex = function() {
        return _oParentContainer.getChildIndex(_oContainer);
    };

    this.fallEffect = function() {
        createjs.Tween.get(_oContainer).to({
            y: CANVAS_HEIGHT,
            alpha: 0
        }, 1500, createjs.Ease.cubicIn).call(function() {
            _oParentContainer.removeChild(_oContainer);
        });
    };

    this.getColor = function() {
        return _oColor;
    };

    this.setPosition = function(iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.getPos = function() {
        return {
            x: _oContainer.x,
            y: _oContainer.y
        };
    };

    this.getEdges = function() {
        return _aEdges;
    };

    this.getLocalEdges = function() {
        return _aLocalEdge;
    };

    this.setEdges = function(aEdges, oOffset) {
        _aLocalEdge = new Array();
        _aEdges = new Array();
        _aEdgesLDRU = new Array();
        _aEdgesLURD = new Array();
        for (var i = 0; i < NUM_OF_EDGES_FOR_STACK; i++) {
            _aLocalEdge[i] = new CEdge(aEdges[i].getPointA().getX(), aEdges[i].getPointA().getY(), aEdges[i].getPointB().getX(), aEdges[i].getPointB().getY(),
                START_EDGES_POSITION[i].type);
            var oEdge = new CEdge(aEdges[i].getPointA().getX() + oOffset.x, aEdges[i].getPointA().getY() + oOffset.y,
                aEdges[i].getPointB().getX() + oOffset.x, aEdges[i].getPointB().getY() + oOffset.y, START_EDGES_POSITION[i].type);

            if (START_EDGES_POSITION[i].type === EDGE_RIGHT_UP || START_EDGES_POSITION[i].type === EDGE_LEFT_DOWN) {
                _aEdgesLDRU.push(oEdge);
            } else {
                _aEdgesLURD.push(oEdge);
            }
            _aEdges.push(oEdge);
        }
    };

    this.edgesToString = function(szText) {
        console.log("------------" + szText + "-------------");
        for (var i = 0; i < NUM_OF_EDGES_FOR_STACK; i++) {
            console.log(_aEdges[i].toString());
        }

    };

    this.limitLeftDown = function() {
        if (_oContainer.x <= _aLimitPosition[_iControlDir].x || _oContainer.y >= _aLimitPosition[_iControlDir].y) {
            this.resetStack(RIGHT_UP);
        }
    };

    this.limitRightDown = function() {
        if (_oContainer.x >= _aLimitPosition[_iControlDir].x || _oContainer.y >= _aLimitPosition[_iControlDir].y) {
            this.resetStack(LEFT_UP);
        }
    };

    this.limitLeftUp = function() {
        if (_oContainer.x <= _aLimitPosition[_iControlDir].x || _oContainer.y <= _aLimitPosition[_iControlDir].y) {
            this.resetStack(RIGHT_DOWN);
        }
    };

    this.limitRightUp = function() {
        if (_oContainer.x >= _aLimitPosition[_iControlDir].x || _oContainer.y <= _aLimitPosition[_iControlDir].y) {
            this.resetStack(LEFT_DOWN);
        }
    };

    this.unload = function() {
        _oParentContainer.removeChild(_oContainer);
    };

    this.resetStack = function(iNewDir) {
        _iControlDir = iNewDir;
        _vDir.set(DIRECTION_STACKS[_iControlDir].x, DIRECTION_STACKS[_iControlDir].y);
    };

    this.update = function(iSpeed) {
        _oContainer.x += _vDir.getX() * iSpeed;
        _oContainer.y += _vDir.getY() * iSpeed;

        switch (_iControlDir) {
            case LEFT_DOWN:
                this.limitLeftDown();
                break;
            case RIGHT_DOWN:
                this.limitRightDown();
                break;
            case LEFT_UP:
                this.limitLeftUp();
                break;
            case RIGHT_UP:
                this.limitRightUp();
                break;
        }
    };

    this._init(oInfo, oColor, aEdge);

    return this;
}