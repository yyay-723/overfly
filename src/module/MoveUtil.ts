module game {
	/**
	 * @ author gm
	 * y轴方向的移动封装
	 */
	export class MoveUtil extends egret.Sprite {
		public p = document.createElement('p');
		public span = document.createElement('span');
		public constructor(target: any, isLoop: boolean = true) {
			super();
			this.obj = target;
			this.isLoop = isLoop;
			this.p.id = 'myConsole';
			this.p.style.position = 'absolute';
			this.p.style.fontSize = '20px';
			document.getElementsByTagName('body')[0].appendChild(this.p);
			this.span.id = 'myConsole2';
			this.span.style.position = 'absolute';
			this.span.style.fontSize = '20px';
			document.getElementsByTagName('body')[0].appendChild(this.span);
		}

		private _startPos: egret.Point = new egret.Point(0, 0); //默认起点位置
		private _endPos: egret.Point = new egret.Point(0, Store.stageH);//默认终点位置
		private _speedY: number = 1;
		private _startSpeedY: number = 0;//初始速度
		private obj: any = null;
		private isLoop: boolean = true; //是否循环移动,默认为true
		// private _aSpeedY: number = 0.1;
		public isGetDistance: boolean = false;// 默认不获取
		public set startPos(value: egret.Point) {
			if (this._startPos !== value) {
				this._startPos = value;
			}
		}


		public set endPos(value: egret.Point) {
			if (this._endPos !== value) {
				this._endPos = value;
			}
		}

		public set speedY(value: number) {
			if (this._startSpeedY !== value) {
				this._startSpeedY = value;
			}
		}
		
		//是否获取数据，设置全局数据
		public getDistance(isTrue: boolean = false) {
			this.isGetDistance = isTrue;
		}

		// _aSpeedY取值在-0.5 ～ 1之间，作为加速度，位移和加速度公式s=1/2at^2
		// 速度和加速度公式v1 = v0 + at
		
		public time = 0;
		public onEnterFrame(a) {
			if (!this.obj) {
				return null;
			}

			if (this._speedY < 0) {
				document.getElementById('myConsole').innerHTML = this._speedY.toString();
				Store.currentSpeedY = this._startSpeedY;
				return;
			}
			var time = this.time;
			setInterval(function() {
				this.time = this.time+1;
			}, 1000);
			this.obj.y += Math.floor(this._speedY);

			document.getElementById('myConsole').innerHTML = this.obj.y + '  ' + this._speedY + '  ' + a + '  ' + this.time + Math.random();

			if (this.obj.y >= this._endPos.y && this.isLoop) {
				this.obj.y = this._startPos.y;
			} else if (this.obj.y >= this._endPos.y && !this.isLoop) {
				this.obj = null;
				return;
			}
			var tempSpeedY = this._speedY + a;
			this._speedY = tempSpeedY >= 0 ? tempSpeedY : 0;
			if (this.isGetDistance) {
				
				Store.distanceLength = 0.5 * a * time * time;
				// Store.distanceLength += (this._speedY + this._startSpeedY) * 0.5;
				Store.currentSpeedY = Store.currentSpeedY + a * time;

				// console.log("speed = " + Store.currentSpeedY + " distance = " + Store.distanceLength);
			}

		}

	}
}