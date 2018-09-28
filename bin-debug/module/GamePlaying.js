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
     * 游戏进行中
     */
    var GamePlaying = (function (_super) {
        __extends(GamePlaying, _super);
        function GamePlaying() {
            var _this = _super.call(this) || this;
            _this.sceneEvent = new game.SceneEvent(game.SceneEvent.ChangeScene);
            _this.isTouching = false;
            _this.skinName = "resource/eui_skins/mySkins/gamePlayingSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        // 添加到舞台
        GamePlaying.prototype.onAdded = function (e) {
            console.log('onAdded--gamePlaying');
            this.sceneEvent.eventType = game.SceneEvent.GAME_OVER;
            this.gameBg.width = game.Store.stageW;
            this.gameBg.height = game.Store.stageH;
            this.gameBg.y = 0;
            this.gameBgClone.width = game.Store.stageW;
            this.gameBgClone.height = game.Store.stageH;
            this.gameBgClone.y = -game.Store.stageH;
            this.gameCar.x = game.Store.stageW / 2 - this.gameCar.width / 2;
            this.gameCar.y = game.Store.stageH - this.gameCar.height;
            // this.gameCar.y = 977,  this.gameCar.height = 159, Store.stageH = 1136。
            console.log(game.Store.stageH - this.gameCar.height);
            // 动画
            this.gameBgMove = new game.MoveUtil(this.gameBg);
            this.gameBgMove.startPos = new egret.Point(0, 0);
            this.gameBgMove.endPos = new egret.Point(0, game.Store.stageH);
            this.gameBgCloneMove = new game.MoveUtil(this.gameBgClone);
            this.gameBgCloneMove.startPos = new egret.Point(0, -game.Store.stageH);
            this.gameBgCloneMove.endPos = new egret.Point(0, 0);
            this.gameBgMove.getDistance(true); //这里只需要一个设置为true就可以。
            // this.addEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
            // 陀螺仪
            // 创建 DeviceOrientation 类
            var orientation = new egret.DeviceOrientation();
            // 添加事件监听器
            orientation.addEventListener(egret.Event.CHANGE, this.startAnimation, this);
            //开始监听设备方向变化
            orientation.start();
            // 添加音效
            // var sound:egret.Sound = RES.getRes("sound_mp3");
            var sound = RES.getRes("soundCar_mp3");
            // play() 方法播放音频，有2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
            var channel = sound.play(0, -1);
            this.soundChannel = channel;
        };
        // 从舞台移除
        GamePlaying.prototype.onRemoved = function (e) {
            console.log('onRemoved--gamePlaying');
            this.resetData();
        };
        GamePlaying.prototype.startAnimationFrame = function () {
            // 检测游戏是否结束
            if (this.isOver()) {
                this.onGameOver();
            }
            // 检测是否遇到河流
            if (game.Store.distanceLength >= 300) {
                this.isHitRiver();
            }
            // 检测是否跨越河流，河流宽200，车身长159，所以是300 + 359 取1000
            if (game.Store.distanceLength >= 800) {
                this.isAcrossRiver();
            }
            var random = Math.random();
            var _aSpeed = 0.1;
            if (random > 0.5) {
                _aSpeed = random;
            }
            else {
                _aSpeed = -random * 10;
            }
            // 调节音量
            if (this.soundChannel && this.soundChannel.volume >= 0) {
                this.soundChannel.volume = this.soundChannel.volume + _aSpeed;
            }
            this.gameBgMove.onEnterFrame(_aSpeed);
            this.gameBgCloneMove.onEnterFrame(_aSpeed);
        };
        // 遇到河流处理
        GamePlaying.prototype.isHitRiver = function () {
            this.gameCar.scaleX = 1.2;
            this.gameCar.scaleY = 1.2;
        };
        // 跨越河流处理
        GamePlaying.prototype.isAcrossRiver = function () {
            var _this = this;
            egret.Tween.get(this.gameCar).to({ scaleX: 1, scaleY: 1 }, 100, egret.Ease.backIn);
            setTimeout(function () {
                game.Store.gameResult = true;
                _this.onGameOver();
            }, 1000);
        };
        // 判断是否结束
        GamePlaying.prototype.isOver = function () {
            if (game.Store.distanceLength >= game.Store.targetDistance) {
                game.Store.gameResult = true;
                return true;
            }
            else if (game.Store.currentSpeedY <= 0) {
                game.Store.gameResult = false;
                return true;
            }
            return false;
        };
        // 重置数据
        GamePlaying.prototype.resetData = function () {
            this.gameBg.y = 0;
            this.gameBgClone.y = -game.Store.stageH;
            game.Store.distanceLength = 0;
        };
        // 游戏结束抛事件
        GamePlaying.prototype.onGameOver = function () {
            console.log('onGameOver');
            this.soundChannel.stop();
            // this.removeEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
            game.ViewManager.getInstance().dispatchEvent(this.sceneEvent);
        };
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        GamePlaying.prototype.startAnimation = function (e) {
            // 检测游戏是否结束
            if (this.isOver()) {
                this.onGameOver();
            }
            // 检测是否遇到河流
            if (game.Store.distanceLength >= 300) {
                this.isHitRiver();
            }
            // 检测是否跨越河流，河流宽200，车身长159，所以是300 + 359 取1000
            if (game.Store.distanceLength >= 800) {
                this.isAcrossRiver();
            }
            var _aSpeed = -Math.floor(e.beta) / 10;
            // 调节音量
            if (this.soundChannel && this.soundChannel.volume >= 0) {
                this.soundChannel.volume = this.soundChannel.volume + _aSpeed;
            }
            this.gameBgMove.onEnterFrame(_aSpeed);
            this.gameBgCloneMove.onEnterFrame(_aSpeed);
        };
        return GamePlaying;
    }(eui.Component));
    game.GamePlaying = GamePlaying;
    __reflect(GamePlaying.prototype, "game.GamePlaying");
})(game || (game = {}));
