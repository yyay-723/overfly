module game {
	/**
	 *
	 * @author gn
	 * 游戏状态
	 */
	export class Store {

        public static gameResult: boolean = false; //默认为true,表示是成功，继续挑战；false表示失败，再试一次
		
		public static distanceLength: number = 0;//记录走过的路程距离
		
		public static targetDistance:number = 10000;//目标距离
		
		public static stageH:number = 910;//舞台高
		// public static stageH:number = 1136;//舞台高
		
		public static stageW:number = 640;//舞台宽
		
		public static currentSpeedY:number = 6;//当前车速度
	}
}
