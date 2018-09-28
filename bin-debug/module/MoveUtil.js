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
     * @ author gm
     * y轴方向的移动封装
     */
    var MoveUtil = (function (_super) {
        __extends(MoveUtil, _super);
        function MoveUtil(target, isLoop) {
            if (isLoop === void 0) { isLoop = true; }
            var _this = _super.call(this) || this;
            _this.p = document.createElement('p');
            _this.span = document.createElement('span');
            _this._startPos = new egret.Point(0, 0); //默认起点位置
            _this._endPos = new egret.Point(0, game.Store.stageH); //默认终点位置
            _this._speedY = 1;
            _this._startSpeedY = 0; //初始速度
            _this.obj = null;
            _this.isLoop = true; //是否循环移动,默认为true
            // private _aSpeedY: number = 0.1;
            _this.isGetDistance = false; // 默认不获取
            // _aSpeedY取值在-0.5 ～ 1之间，作为加速度，位移和加速度公式s=1/2at^2
            // 速度和加速度公式v1 = v0 + at
            _this.time = 0;
            _this.obj = target;
            _this.isLoop = isLoop;
            _this.p.id = 'myConsole';
            _this.p.style.position = 'absolute';
            _this.p.style.fontSize = '20px';
            document.getElementsByTagName('body')[0].appendChild(_this.p);
            _this.span.id = 'myConsole2';
            _this.span.style.position = 'absolute';
            _this.span.style.fontSize = '20px';
            document.getElementsByTagName('body')[0].appendChild(_this.span);
            return _this;
        }
        Object.defineProperty(MoveUtil.prototype, "startPos", {
            set: function (value) {
                if (this._startPos !== value) {
                    this._startPos = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoveUtil.prototype, "endPos", {
            set: function (value) {
                if (this._endPos !== value) {
                    this._endPos = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoveUtil.prototype, "speedY", {
            set: function (value) {
                if (this._startSpeedY !== value) {
                    this._startSpeedY = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        //是否获取数据，设置全局数据
        MoveUtil.prototype.getDistance = function (isTrue) {
            if (isTrue === void 0) { isTrue = false; }
            this.isGetDistance = isTrue;
        };
        MoveUtil.prototype.onEnterFrame = function (a) {
            if (!this.obj) {
                return null;
            }
            if (this._speedY < 0) {
                document.getElementById('myConsole').innerHTML = this._speedY.toString();
                game.Store.currentSpeedY = this._startSpeedY;
                return;
            }
            var time = this.time;
            setInterval(function () {
                this.time = this.time + 1;
            }, 1000);
            this.obj.y += Math.floor(this._speedY);
            document.getElementById('myConsole').innerHTML = this.obj.y + '  ' + this._speedY + '  ' + a + '  ' + this.time + Math.random();
            if (this.obj.y >= this._endPos.y && this.isLoop) {
                this.obj.y = this._startPos.y;
            }
            else if (this.obj.y >= this._endPos.y && !this.isLoop) {
                this.obj = null;
                return;
            }
            var tempSpeedY = this._speedY + a;
            this._speedY = tempSpeedY >= 0 ? tempSpeedY : 0;
            if (this.isGetDistance) {
                game.Store.distanceLength = 0.5 * a * time * time;
                // Store.distanceLength += (this._speedY + this._startSpeedY) * 0.5;
                game.Store.currentSpeedY = game.Store.currentSpeedY + a * time;
                // console.log("speed = " + Store.currentSpeedY + " distance = " + Store.distanceLength);
            }
        };
        return MoveUtil;
    }(egret.Sprite));
    game.MoveUtil = MoveUtil;
    __reflect(MoveUtil.prototype, "game.MoveUtil");
})(game || (game = {}));
