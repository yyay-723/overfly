var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    /**
     *
     * @author gn
     * 场景舞台
     */
    var ViewManager = (function (_super) {
        __extends(ViewManager, _super);
        function ViewManager() {
            return _super.call(this) || this;
        }
        // 获取单例
        ViewManager.getInstance = function () {
            console.log('getInstance');
            if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
        };
        // 开始
        ViewManager.prototype.start = function () {
            console.log('start');
            this.init();
            this.initListener();
        };
        // 初始化数据
        ViewManager.prototype.init = function () {
            console.log('init');
            this.gameStart = new game.GameStart();
            this.gamePlaying = new game.GamePlaying();
            this.gameOver = new game.GameOver();
            this.addChild(this.gameStart);
            // this.addChild(this.gamePlaying);
        };
        // 初始化事件监听
        ViewManager.prototype.initListener = function () {
            console.log('initListener');
            this.addEventListener(game.SceneEvent.ChangeScene, this.onChangeScene, this);
        };
        // 场景切换
        ViewManager.prototype.onChangeScene = function (e) {
            // 移除所有子对象
            this.removeChildren();
            // 判断事件，接下来添加场景到舞台展现
            switch (e.eventType) {
                case game.SceneEvent.GAME_START:
                    this.addChild(this.gameStart);
                    break;
                case game.SceneEvent.GAME_PLAYING:
                    this.addChild(this.gamePlaying);
                    break;
                case game.SceneEvent.GAME_OVER:
                    this.addChild(this.gameOver);
                    break;
                default: break;
            }
        };
        return ViewManager;
    }(egret.Sprite));
    game.ViewManager = ViewManager;
    __reflect(ViewManager.prototype, "game.ViewManager");
})(game || (game = {}));
