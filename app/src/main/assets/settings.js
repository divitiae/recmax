var CANVAS_WIDTH = 840;
var CANVAS_HEIGHT = 1360;

var CANVAS_WIDTH_HALF = CANVAS_WIDTH * 0.5;
var CANVAS_HEIGHT_HALF = CANVAS_HEIGHT * 0.5;

var EDGEBOARD_X = 72;
var EDGEBOARD_Y = 170;

var CONFIRMATION_EXIT = 0;
var CONFIRMATION_RESET = 1;

var DISABLE_SOUND_MOBILE = false;
var FONT_GAME = "Odin-Bold";
var TEXT_COLOR = "#fff";
var TEXT_COLOR_STROKE = "#555555";
var TEXT_COLOR_BEST_SORE = "#fff";

var FPS_TIME = 1000 / 30;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var STATE_INIT = 0;
var STATE_PLAY = 1;
var STATE_FINISH = 2;
var STATE_PAUSE = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;
var ON_BUT_NO_DOWN = 6;
var ON_BUT_YES_DOWN = 7;

var NUM_OF_EDGES_FOR_STACK = 4;

var SHOW_EDGES = true;
var SHOW_FILL = true;

var LEFT_UP = 3;
var RIGHT_UP = 2;
var LEFT_DOWN = 1;
var RIGHT_DOWN = 0;
var NO_DIR = 4;

var EDGE_RIGHT_UP = 0;
var EDGE_RIGHT_DOWN = 1;
var EDGE_LEFT_DOWN = 2;
var EDGE_LEFT_UP = 3;

var STACK_DIRECTIONS = {
    x: 0.5,
    y: 0.5
};

var MS_FADE_ANIM = 250;
var MS_SCROLL_CONTAINER_STACK = 750;
var MS_PERFECT_TEXT = 1000;

var PERFECT_TEXT_START_POINT = {
    x: CANVAS_WIDTH_HALF,
    y: CANVAS_HEIGHT - 150
};

var PERFECT_TEXT_END_POINT = {
    x: CANVAS_WIDTH_HALF,
    y: CANVAS_HEIGHT - 300
};

var MS_WAIT_SHOW_GAME_OVER_PANEL = 500;

var PLANES_COLOR_1 = {
    r: 200,
    g: 0,
    b: 0,
    a: 1
};
var LINES_COLOR_1 = {
    r: 0,
    g: 200,
    b: 0,
    a: 1
};
var PLANES_COLOR_2 = {
    r: 0,
    g: 0,
    b: 200,
    a: 1
};
var LINES_COLOR_2 = {
    r: 255,
    g: 255,
    b: 0,
    a: 1
};

var MS_TIME_ZOOM_OUT = 1000;

var MS_TIME_PERFECT_HIT = 500;

var CONTAINER_STACK_POS = {
    x: CANVAS_WIDTH_HALF,
    y: CANVAS_HEIGHT_HALF
};
var LINES_WIDTH = 1;

var ANGLE_STACK = 35 * (Math.PI / 180);

var DEFAULT_DIR = {
    x: Math.cos(ANGLE_STACK),
    y: Math.sin(ANGLE_STACK)
};

var DIRECTION_STACKS = [DEFAULT_DIR, {
        x: -DEFAULT_DIR.x,
        y: DEFAULT_DIR.y
    }, {
        x: DEFAULT_DIR.x,
        y: -DEFAULT_DIR.y
    },
    {
        x: -DEFAULT_DIR.x,
        y: -DEFAULT_DIR.y
    }, {
        x: 0,
        y: 0
    }
];

var STACK_DIMENSION = {
    x: 200,
    y: 140
};
var STACK_DEPTH_SIZE = 50;
var STACK_HEIGHT_OFFSET = 100;
var STACK_HEIGHT_OFFSET_HALF = STACK_HEIGHT_OFFSET * 0.5;

var STACKS_DISTANCE_OFFSET = 300;

var PERFECT_RANGE = 10;

var DEFAULT_COLOR = ["#cc0000", "#00cc00", "#0000cc", "#ffff00"];

var DEPTH_LUMINANCE = -0.2; //-20% 

var COLOR_GRADIENTS_STACKS = ["#FF5858", "#FF6058", "#FF6958", "#FF7158", "#FF7A58", "#FF8358", "#FF8B58", "#FF9458", "#FF9D58", "#FFA558", "#FFAE58", "#FFB658", "#FFBF58", "#FFC858", "#FFD058", "#FFD958", "#FFE258", "#F4E358", "#EAE559", "#DFE659", "#D5E85A", "#CAEA5B", "#C0EB5B", "#B5ED5C", "#ABEF5D", "#A0F05D", "#96F25E", "#8BF35E", "#81F55F", "#76F760", "#6CF860", "#61FA61", "#57FC62", "#5AF26B", "#5DE975", "#60E07E", "#64D788", "#67CE91", "#6AC49B", "#6DBBA4", "#71B2AE", "#74A9B7", "#77A0C1", "#7A96CA", "#7E8DD4", "#8184DD", "#847BE7", "#8772F0", "#8B69FA", "#9267EF", "#9A66E4", "#A265D9", "#A964CE", "#B163C4", "#B962B9", "#C161AE", "#C85FA3", "#D05E98", "#D85D8E", "#E05C83", "#E75B78", "#EF5A6D", "#F75962", "#FF5858"];

var SHOW_CUT_EDGES = false;

var STACKS_LIMIT_POSITION = [{
        x: 966,
        y: 620
    }, {
        x: 425,
        y: 598
    },
    {
        x: 942,
        y: 236.5
    }, {
        x: 426,
        y: 242
    }
];

var STACKS_START_POSITION = [{
    x: 426,
    y: 242,
    dir: LEFT_UP
}, {
    x: 942,
    y: 236.5,
    dir: LEFT_DOWN
}];

var START_EDGES_POSITION = [{
        startX: 0,
        startY: -STACK_DIMENSION.y,
        endX: STACK_DIMENSION.x,
        endY: 0,
        type: EDGE_RIGHT_UP
    },
    {
        startX: STACK_DIMENSION.x,
        startY: 0,
        endX: 0,
        endY: STACK_DIMENSION.y,
        type: EDGE_RIGHT_DOWN
    },
    {
        startX: 0,
        startY: STACK_DIMENSION.y,
        endX: -STACK_DIMENSION.x,
        endY: 0,
        type: EDGE_LEFT_DOWN
    },
    {
        startX: -STACK_DIMENSION.x,
        startY: 0,
        endX: 0,
        endY: -STACK_DIMENSION.y,
        type: EDGE_LEFT_UP
    }
];

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;