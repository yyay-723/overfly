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
     * 游戏结束
     */
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.skinName = "resource/eui_skins/mySkins/gameOverSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // 添加到舞台
        GameOver.prototype.onAdded = function (e) {
            console.log('onAdded');
            this.sceneEvent.eventType = game.SceneEvent.GAME_START;
            if (game.Store.gameResult) {
                this.result.source = "successed_png";
                this.playAgainBtn.label = '继续挑战';
            }
            else {
                this.result.source = "fighting_png";
                this.playAgainBtn.label = '再来一次';
            }
            var _resultX = this.result.width / 2 + 30;
            var _resultY = 100;
            egret.Tween.get(this.result).to({ x: _resultX, y: _resultY, scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.backOut);
            this.playAgainBtn.left = game.Store.stageW / 2 - this.playAgainBtn.width / 2;
            this.playAgainBtn.top = 560;
            this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
        };
        // 从舞台移除
        GameOver.prototype.onRemoved = function (e) {
            console.log('onRemoved');
            this.playAgainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlayAgain, this);
        };
        // 点击继续按钮
        GameOver.prototype.onPlayAgain = function (e) {
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        return GameOver;
    }(eui.Component));
    game.GameOver = GameOver;
    __reflect(GameOver.prototype, "game.GameOver");
})(game || (game = {}));
