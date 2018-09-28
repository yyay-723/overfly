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
     * 游戏开始
     */
    var GameStart = (function (_super) {
        __extends(GameStart, _super);
        function GameStart() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.skinName = "resource/eui_skins/mySkins/gameStartSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // 添加到舞台
        GameStart.prototype.onAdded = function (e) {
            this.sceneEvent.eventType = game.SceneEvent.GAME_PLAYING;
            this.gameBg.width = game.Store.stageW;
            this.gameBg.height = game.Store.stageH;
            this.startMask.width = game.Store.stageW;
            this.startMask.height = game.Store.stageH;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayStart, this);
        };
        // 从舞台移除
        GameStart.prototype.onRemoved = function (e) {
            console.log('onRemoved--gameStart');
            this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayStart, this);
        };
        // 点击继续游戏按钮
        GameStart.prototype.onPlayStart = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return GameStart;
    }(eui.Component));
    game.GameStart = GameStart;
    __reflect(GameStart.prototype, "game.GameStart");
})(game || (game = {}));
