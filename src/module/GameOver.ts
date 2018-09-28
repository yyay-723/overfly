module game {
    /**
	 *
	 * @author gn
	 * 游戏结束
	 */
	export class GameOver extends eui.Component{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/mySkins/gameOverSkin.exml";
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}

		private sceneEvent: SceneEvent = new SceneEvent(SceneEvent.ChangeScene);
		public result: eui.Image;
		public playAgainBtn: eui.Button;

		// 添加到舞台
		private onAdded(e:egret.Event) {
			console.log('onAdded');
			this.sceneEvent.eventType = SceneEvent.GAME_START;

			if (Store.gameResult) {
				this.result.source = "successed_png";
				this.playAgainBtn.label = '继续挑战';
			} else {
				this.result.source = "fighting_png";
				this.playAgainBtn.label = '再来一次';
			}

			const _resultX = this.result.width/2 + 30;
			const _resultY = 100;
            egret.Tween.get(this.result).to({ x: _resultX, y: _resultY, scaleX: 1.2, scaleY: 1.2 },500,egret.Ease.backOut);

			this.playAgainBtn.left = Store.stageW/2 - this.playAgainBtn.width/2;
			this.playAgainBtn.top = 560;

			this.playAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
		}

		// 从舞台移除
		private onRemoved(e:egret.Event) {
			console.log('onRemoved');
			this.playAgainBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlayAgain,this);
		}

		// 点击继续按钮
		private onPlayAgain(e: egret.TouchEvent) {
			ViewManager.getInstance().dispatchEvent(this.sceneEvent);
		}
	}
}