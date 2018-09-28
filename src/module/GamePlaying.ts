module game {
    /**
	 *
	 * @author gn
	 * 游戏进行中
	 */
	export class GamePlaying extends eui.Component{
		public spanaa = document.createElement('span');
		public constructor() {
			super();
			this.spanaa.id = 'myConsole3';
			this.spanaa.style.position = 'absolute';
			this.spanaa.style.fontSize = '20px';
			document.getElementsByTagName('body')[0].appendChild(this.spanaa);
			this.skinName = "resource/eui_skins/mySkins/gamePlayingSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
		public gameBg: eui.Image;
		public gameBgClone: eui.Image;
		public gameBgClone2: eui.Image;
		public gameCar: eui.Image;
		public gameMapArray: any[] = [];

		private isTouching: boolean = false;
		// private gameBgMove: MoveUtil;
		// private gameBgCloneMove: MoveUtil;

    	private soundChannel:egret.SoundChannel;




		// 添加到舞台
		private onAdded(e:egret.Event) {
			console.log('onAdded--gamePlaying');
			this.sceneEvent.eventType = SceneEvent.GAME_OVER;
			this.gameBg.width = Store.stageW;
			this.gameBg.height = Store.stageH;
			//this.gameBg.y = 0;

			this.gameBgClone.width = Store.stageW;
			this.gameBgClone.height = Store.stageH;

			this.gameBgClone2.width = Store.stageW;
			this.gameBgClone2.height = Store.stageH;
			//this.gameBgClone.y = -2*Store.stageH;
			// 车的位置，保持在屏幕下方
			this.gameCar.x = Store.stageW/2 - this.gameCar.width/2;
			this.gameCar.y = Store.stageH - this.gameCar.height - 100;
			// this.gameCar.y = 977,  this.gameCar.height = 159, Store.stageH = 1136。
			console.log(Store.stageH);
			let randTime = 10;
			// 河流随机出现在一个位置
			let riverPos = Math.floor(Math.random() * randTime);
			let bg = null;
			bg = new MoveUtil(this.gameBgClone, false);
			bg.startPos = new egret.Point(0, 0);
			bg.endPos = new egret.Point(0, 2*Store.stageH);
			this.gameMapArray.push(bg);

			bg = new MoveUtil(this.gameBg, false);
			this.gameBg.y = -Store.stageH;
			bg.startPos = new egret.Point(0, -Store.stageH);
			bg.endPos = new egret.Point(0, Store.stageH);
			this.gameMapArray.push(bg);

			bg = new MoveUtil(this.gameBgClone2, false);
			this.gameBgClone2.y = -2*Store.stageH;
			bg.startPos = new egret.Point(0, -2*Store.stageH);
			bg.endPos = new egret.Point(0, 0);
			this.gameMapArray.push(bg);
			// for (let i = 1; i <= randTime; i++) {
			// 	let bg = null;
			// 	if (i === riverPos) {
			// 		console.log('river');
			// 		this.gameBg.y = -(i-1)*Store.stageH;
			// 		bg = new MoveUtil(this.gameBg, false);
			// 	} else {
			// 		console.log('road');
			// 		this.gameBgClone.y = -(i-1)*Store.stageH;
			// 		console.log(this.gameBgClone.y);
			// 		bg = new MoveUtil(this.gameBgClone, false);
			// 	}
			// 	bg._startPos = new egret.Point(0, -(i-1)*Store.stageH);
			// 	bg._endPos = new egret.Point(0, (randTime-i)*Store.stageH);
			// 	console.log(bg._startPos);
			// 	console.log('end'+bg._endPos);
			// 	this.gameMapArray.push(bg);
			// 	bg.getDistance(true);
			// }
			console.log(this.gameMapArray);
			/*
			// 动画：带河流的部分y轴从0移动到H，公路部分比较长，从-2H移动到0
			this.gameBgMove = new MoveUtil(this.gameBg, false);
			this.gameBgMove.startPos = new egret.Point(0, 0);
			this.gameBgMove.endPos = new egret.Point(0, Store.stageH);

			this.gameBgCloneMove = new MoveUtil(this.gameBgClone, false);
			this.gameBgCloneMove.startPos = new egret.Point(0, -2*Store.stageH);
			this.gameBgCloneMove.endPos = new egret.Point(0, 0);
			
			this.gameBgMove.getDistance(true); //这里只需要一个设置为true就可以。
			*/
			this.gameMapArray[0].getDistance(true); //这里只需要一个设置为true就可以。

			
			// 陀螺仪
			// 创建 DeviceOrientation 类
			var orientation = new egret.DeviceOrientation();
			// 添加事件监听器
			orientation.addEventListener(egret.Event.CHANGE,this.startAnimation,this);
			// orientation.addEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
			//开始监听设备方向变化
        	orientation.start();
			
			// 添加音效
			// var sound:egret.Sound = RES.getRes("sound_mp3");
			var sound:egret.Sound = RES.getRes("soundCar_mp3");
			// play() 方法播放音频，有2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
			let channel:egret.SoundChannel = sound.play(0, -1);
			this.soundChannel = channel;

		}

		// 从舞台移除
		private onRemoved(e:egret.Event) {
			console.log('onRemoved--gamePlaying');
			this.resetData();
		}

		// 遇到河流处理
		private isHitRiver(): void {
			this.gameCar.scaleX = 0.8;
			this.gameCar.scaleY = 0.8;
		}

		// 跨越河流处理
		private isAcrossRiver(): void {
			egret.Tween.get(this.gameCar).to({ scaleX: 0.8, scaleY: 0.8 },100,egret.Ease.backIn);
			// setTimeout(() => {
				Store.gameResult = true;
				this.onGameOver();
			// }, 1000);
		}

		// 判断是否结束
		private isOver(): boolean {
			if (Store.distanceLength >= Store.targetDistance) {
				Store.gameResult = true;
				document.getElementById('myConsole').innerHTML = 'end';
				return true;
			} 
			// else if(Store.currentSpeedY < 0) {
			// 	Store.gameResult = false;
			// 	return true;
			// }
			return false;
		}

		// 重置数据
		private resetData() {
			this.gameBg.y = 0;
			this.gameBgClone.y = -Store.stageH;
			Store.distanceLength = 0;
		}

		// 游戏结束抛事件
		private onGameOver() {
			console.log('onGameOver');
			// setTimeout(function() {
				// this.soundChannel.stop();
				// this.removeEventListener(egret.Event.ENTER_FRAME, this.startAnimationFrame, this);
				ViewManager.getInstance().dispatchEvent(this.sceneEvent);
			// }, 2000);
			
		}

		/**
		 * 描述文件加载成功，开始播放动画
		 * Description file loading is successful, start to play the animation
		 */
		private startAnimation(e:egret.OrientationEvent): void {
			
			// 检测游戏是否结束
			if (this.isOver()) {
				this.onGameOver();
			}

			// 检测是否遇到河流
			if (Store.distanceLength >= 1000) {
				this.isHitRiver();
			}

			// 检测是否跨越河流，河流宽200，车身长159，所以是300 + 359 取1000
			if (Store.distanceLength >= 2000) {
				this.isAcrossRiver();
			}
			// alert(e.beta);
			let _aSpeed = -Math.floor(e.beta-50)/10;
			// 调节音量
			// if (this.soundChannel && this.soundChannel.volume >= 0){
			// 	this.soundChannel.volume = this.soundChannel.volume + _aSpeed;
			// }
			document.getElementById('myConsole2').innerHTML = 'change' + Math.random();
			this.gameMapArray.forEach(item => {
				item.onEnterFrame(_aSpeed);
			})
			// this.gameMapArray[0].onEnterFrame(_aSpeed);
			// this.gameMapArray[1].onEnterFrame(_aSpeed);
			// this.gameBgMove.onEnterFrame(_aSpeed);
			// this.gameBgCloneMove.onEnterFrame(_aSpeed);
		}
	}
}