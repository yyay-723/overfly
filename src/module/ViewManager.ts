module game {
    /**
	 *
	 * @author gn
	 * 场景舞台
	 */
	export class ViewManager extends egret.Sprite{
		public constructor() {
			super();
		}

		private static instance: ViewManager;
		private gameStart: GameStart;
		private gamePlaying: GamePlaying;
		private gameOver: GameOver;

		// 获取单例
		public static getInstance(): ViewManager {
			console.log('getInstance');
			if (ViewManager.instance == null) {
                ViewManager.instance = new ViewManager();
            }
            return ViewManager.instance;
		}

		// 开始
		public start() {
			console.log('start');
			this.init();
			this.initListener();
		}

		// 初始化数据
		private init() {
			console.log('init');
			this.gameStart = new GameStart();
			this.gamePlaying = new GamePlaying();
			this.gameOver = new GameOver();
			this.addChild(this.gameStart);
			// this.addChild(this.gamePlaying);
		}

		// 初始化事件监听
		private initListener() {
			console.log('initListener');
			this.addEventListener(SceneEvent.ChangeScene, this.onChangeScene, this);
		}

		// 场景切换
		private onChangeScene(e: SceneEvent) {
			// 移除所有子对象
			this.removeChildren();

			// 判断事件，接下来添加场景到舞台展现
			switch (e.eventType) {
				case SceneEvent.GAME_START:
					this.addChild(this.gameStart);
					break;

				case SceneEvent.GAME_PLAYING:
					this.addChild(this.gamePlaying);
					break;

				case SceneEvent.GAME_OVER:
					this.addChild(this.gameOver);
					break;
				
				default: break;
			}
		}
	}
}