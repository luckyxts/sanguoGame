var three = {
	//基本设置
	canvas:null,
	ctx:null,
	progress:0,
	me:this,
	SIZE:32,
	timer:null,
	keyDown:[],
	isKeyDown:false,
	isMoveBk:false,
	canvas_width:480,
	canvas_height:288,
	//更换地图时存储下英雄的位置
	herX:null,
	herY:null,
	//圆对象
	circle:null,
	//各种对象
	currentMap:new Array(),
	background:null,
	//主角对象
	protagonist:null,
	battleHero:null,
	//查看对象
	state:null,
	//敌人列表
	enemyList:null,
	//战斗选项对象
	select:null,
	//魔法对象
	magic:null,
	//主菜单对象
	menu:null,
	//talk对象
	talk:null,
	//npc列表
	npcList:null,
	//结算对象
	accounts:null,
	//游戏结束对象
	gameover:null,
	//图片
	imgBack:new Image(),
	imgMap:new Image(),
	//主菜单图片
	imgMenu:new Image(),
	//游戏结束图片
	imgGameOver:new Image(),
	//人物图片
	imgLiuBei:[new Image(),new Image()],
	imgGuanYu:[new Image(),new Image()],
	imgsNPC:[new Image(),new Image()],
	imgsNpcFace:[new Image(),new Image()],
	imgsEnemyDead:[new Image()],
	imgsMagic:[new Image(),new Image()],
	//游戏状态
	cur_phase:null,
	PHASE_DOWNLOADING:1,									//下载阶段
	PHASE_MENU:2,											//主界面
	PHASE_SAFERING:3,										//安全区域
	PHASE_TALKING:4,										//聊天模式
	PHASE_FIGHTING:5,										//战斗区域
	PHASE_BATTLE:6,											//战斗模式
	PHASE_DRAWCIRCLE:7,										//遇怪画圆
	PHASE_ACCOUNTS:8,										//胜利结算
	PHASE_GAMEOVER:9,										//失败
	PHASE_STATE:10,											//查看英雄状态和进行存档
	//地图所有数据
	MAP_1:{
		mapClass:0,
		name:'map1',
		currentMap:[
			 [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],  
            [0,0,1,3,5,5,1,5,5,5,5,1,0,0,0],  
            [0,0,1,80,4,4,1,80,4,4,4,1,0,0,0],  
            [0,0,1,80,4,4,1,80,8,7,8,1,0,0,0],  
            [0,0,1,80,4,4,5,81,4,4,4,1,0,0,0],  
            [0,0,1,2,2,2,6,4,4,4,4,1,0,0,0],  
            [0,0,1,3,5,5,81,4,4,4,4,1,0,0,0],  
            [0,0,1,80,4,4,4,4,4,4,9,1,0,0,0],  
            [0,0,1,2,2,2,2,6,2,2,2,1,0,0,0], 
		],
		enterNextMap:[
			{
				name:'map2',
				mapStartX:0,
				mapStartY:0,
				MapX:0,
				MapY:0,
				heroX:224,
				heroY:256,
				map:null,
				hero:{x:224,y:256},
			},
		],
		currentNPC:[],
	},
	MAP_2:{
		mapClass:0,
		name:'map2',
		currentMap:[
			[18,18,18,18,18,18,18,18,18,18,18,18,55,55,18,18,18,18,18,18],  
			[18,18,18,17,17,17,17,17,17,17,17,17,55,55,17,17,17,17,17,18],  
			[18,18,17,17,17,17,18,18,17,17,17,17,55,55,17,17,17,17,17,18],  
			[18,17,17,17,18,18,18,18,18,17,17,55,55,17,17,17,17,17,17,18],  
			[18,17,17,18,22,23,23,23,24,18,17,55,55,22,23,23,23,24,17,18],  
			[18,17,17,18,25,28,26,79,27,18,55,55,17,25,28,26,79,27,17,18],  
			[18,17,17,17,17,10,11,12,18,18,55,55,17,17,17,17,17,17,17,18],  
			[18,18,17,17,10,16,16,16,11,55,55,17,17,17,17,17,17,17,17,18],  
			[18,18,17,17,77,16,16,16,16,21,21,17,17,17,17,17,17,17,17,18],  
			[18,18,17,17,77,16,16,16,16,55,55,17,17,17,17,17,17,17,17,18],  
			[18,18,18,18,18,18,18,18,18,55,55,18,18,18,18,18,18,18,17,18],
			],
		enterNextMap:[{
				name:'map1',
				mapStartX:0,
				mapStartY:1,
				heroX:192,
				heroY:128,
				MapX:0,
				MapY:-1,
				map:null,
				hero:{x:192,y:128},
			},
			{
				name:'map3',
				mapStartX:5,
				mapStartY:1,
				heroX:320,
				heroY:128,
				MapX:-5,
				MapY:-1,
				map:null,
				hero:{x:320,y:128},
			},
			{
				name:'map4',
				mapStartX:5,
				mapStartY:2,
				heroX:416,
				heroY:256,
				MapX:-5,
				MapY:-2,
				map:null,
				hero:{x:416,y:256},
			},
		],
		currentNPC:[],
	},
	MAP_3:{
		mapClass:0,
		name:'map3',
		currentMap:[
			 [0,0,1,2,2,2,2,2,2,2,2,1,0,0,0],  
            [0,0,1,3,5,5,5,5,5,5,5,1,0,0,0],  
            [0,0,1,80,4,4,4,4,4,4,4,1,0,0,0],  
            [0,0,1,80,4,4,4,4,4,4,8,1,0,0,0],  
            [0,0,1,80,4,9,4,4,4,4,4,1,0,0,0],  
            [0,0,1,2,2,2,6,4,4,4,4,1,0,0,0],  
            [0,0,1,3,5,5,81,4,4,4,4,1,0,0,0],  
            [0,0,1,80,4,4,4,4,4,4,9,1,0,0,0],  
            [0,0,1,2,2,2,2,6,2,2,2,1,0,0,0], 
		],
		enterNextMap:[
			{
				name:'map2',
				mapStartX:0,
				mapStartY:0,
				MapX:0,
				MapY:0,
				heroX:224,
				heroY:256,
				map:null,
				hero:{x:224,y:256},
			},
		],
		currentNPC:[],
	},
	MAP_4:{
		mapClass:1,
		name:'map4',
		currentMap:[
			[18,18,17,18,18,18,18,18,18,18,18,18,55,55,18,18,18,18,18,18],  
			[18,18,17,17,17,17,17,17,17,17,17,17,55,55,17,17,17,17,17,18],  
			[18,18,17,17,17,17,18,18,17,17,17,17,55,55,17,17,17,17,17,18],  
			[18,17,17,17,18,18,18,18,18,17,17,55,55,17,17,17,17,17,17,18],  
			[18,17,17,18,17,17,17,17,17,17,17,55,55,22,23,23,23,24,17,18],  
			[18,17,17,18,17,17,17,17,17,17,55,55,17,25,28,26,79,27,17,18],  
			[18,17,17,17,17,10,11,12,18,18,55,55,17,17,17,17,17,17,17,18],  
			[18,18,17,17,10,16,16,16,11,55,55,17,17,17,17,17,17,17,17,18],  
			[18,18,17,17,77,16,16,16,16,21,21,17,17,17,17,17,17,17,17,18],  
			[18,18,17,17,77,16,16,16,16,55,55,17,17,17,17,17,17,17,17,18],  
			[18,18,18,18,18,18,18,18,18,55,55,18,18,18,18,18,18,18,18,18],
		],
		enterNextMap:[
			{
				name:'map2',
				mapStartX:0,
				mapStartY:0,
				MapX:0,
				MapY:0,
				heroX:64,
				heroY:0,
				map:null,
				hero:{x:64,y:0},
			},
		],
		currentNPC:[],
	},
	//初始化
	init:function(){
		for(var i=0;i<(this.canvas_height/this.SIZE);i++){
			this.currentMap[i]=[];
			for(var j=0;j<(this.canvas_width/this.SIZE);j++)
				this.currentMap[j]=[];
		}
		this.cur_phase = this.PHASE_DOWNLOADING;
		this.canvas = document.getElementById('my_three');
		this.canvas.width = this.canvas_width;
		this.canvas.height = this.canvas_height;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.strokeStyle = "#ddd";
		this.ctx.fillStyle = "#ddd";
		this.ctx.lineWidth = "10";
		this.ctx.font = "32px SimHei";
		this.imgBack.src = "image/back.png";
		this.imgBack.onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		//地图
		this.imgMap.src = "image/map.jpg";
		this.imgMap.onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		//主选项菜单
		this.imgMenu.src = "image/menu.jpg";
		this.imgMenu.onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		this.imgGameOver.src = "image/gameover.jpg";
		this.imgGameOver.onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		//刘备
		this.imgLiuBei[0].src = "image/lb.png";
		this.imgLiuBei[0].onload = function(){
			this.progress += 10;
			this.drawPicture();
		}.bind(this);
		this.imgLiuBei[1].src = "image/lbface.png";
		this.imgLiuBei[1].onload = function(){
			this.progress += 10;
			this.drawPicture();
		}.bind(this);
		//关羽
		this.imgGuanYu[0].src = "image/gy.png";
		this.imgGuanYu[0].onload = function(){
			this.progress += 10;
			this.drawPicture();
		}.bind(this);
		this.imgGuanYu[1].src = "image/gyface.png";
		this.imgGuanYu[1].onload = function(){
			this.progress += 10;
			this.drawPicture();
		}.bind(this);
		//npc人物
		this.imgsNPC[0].src = "image/npc1.png";
		this.imgsNPC[0].onload = function(){
			this.progress += 10;
			this.drawPicture();
		}.bind(this);
		this.imgsNPC[1].src = "image/npc2.png";
		this.imgsNPC[1].onload = function(){
			this.progress += 15;
			this.drawPicture();
		}.bind(this);
		//npc的脸
		this.imgsNpcFace[0].src = "image/npcface1.png";
		this.imgsNPC[0].onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		this.imgsNpcFace[1].src = "image/npcface2.png";
		this.imgsNpcFace[1].onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		//敌人死亡图片
		this.imgsEnemyDead[0].src = "image/enemyDead.png";
		this.imgsEnemyDead[0].onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		//魔法图片
		this.imgsMagic[0].src = "image/thunder.png";
		this.imgsMagic[0].onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
		this.imgsMagic[1].src = "image/fire.png";
		this.imgsMagic[1].onload = function(){
			this.progress += 5;
			this.drawPicture();
		}.bind(this);
	},
	//加载圆环
	drawPicture:function(){
		this.ctx.clearRect(0,0,this.canvas_width,this.canvas_height);
		var x = this.canvas_width/2;
		var y = this.canvas_height/2;
		this.ctx.lineWidth = "2";
		var radius = 80;
		var start = 0;
		var end = (this.progress/100*360)/180*Math.PI;
		this.ctx.arc(x,y,radius,80,start,end);
		this.ctx.stroke();
		var str = this.progress+'%';
		var w = this.ctx.measureText(str).width;
		this.ctx.fillText(str,x-w/2,y+10);
		if(this.progress==100){
			this.ctx.strokeStyle = "white";
			this.ctx.fillStyle = "black";
			this.protagonist = new this.Protagonist();
			this.npcList = new this.GameNpcList();
			//所有图片加载完成,为全局地图变量添加数据
			this.interNpctoMap();
			//加载第一张地图
			this.initMapData(this.MAP_1);
			this.menu = new this.Menu(this.imgMenu);
			this.cur_phase = this.PHASE_MENU;
			//创建状态界面对象
			this.state = new this.State();
			document.addEventListener('keydown',function(e){
				if(e.keyCode!=39&&e.keyCode!=37&&e.keyCode!=40&&e.keyCode!=38){
					return;
				}
				if(this.keyDown[this.keyDown.length-1]!=e.keyCode){
					clearInterval(this.timer);
					this.timer=null;
				}
				for(var i=0;i<this.keyDown.length;i++){
					if(this.keyDown[i]==e.keyCode){return;}
				}
				this.keyDown.push(e.keyCode);
				switch(e.keyCode){
					//上下左右
					case 39:this.moveFn(e.keyCode);break;
					case 37:this.moveFn(e.keyCode);break;
					case 40:this.moveFn(e.keyCode);break;
					case 38:this.moveFn(e.keyCode);break;
				}
			}.bind(this));
			document.addEventListener('keydown',function(e){
				switch(e.keyCode){
					//按键e
					case 69:this.moveFn(e.keyCode);break;
					case 27:this.moveFn(e.keyCode);break;
				}
			}.bind(this));
			document.addEventListener('keyup',function(e){
				if(e.keyCode!=39&&e.keyCode!=37&&e.keyCode!=40&&e.keyCode!=38){
					return;
				}
				for(var i=0;i<this.keyDown.length;i++){
					if(this.keyDown[i]==e.keyCode){this.keyDown.splice(i,1);}
				}
				clearInterval(this.timer);this.timer=null;
				if(this.keyDown.length!=0){
					this.moveFn(this.keyDown[this.keyDown.length-1]);
				}
			}.bind(this));
			this.startEngine();
		}
	},
	//将NPC插入地图之中
	interNpctoMap:function(){
		this.MAP_2.currentNPC = [
		{state:0,img:this.imgsNPC[1],x:15,y:2,talk1:[
			{imgHead:this.imgsNpcFace[1],speak:"小弟:",str:"大哥我们今天砍谁"},
			{imgHead:this.imgLiuBei[1],speak:"刘备:",str:"见谁砍谁"},
			{imgHead:this.imgsNpcFace[1],speak:"小弟:",str:"没问题大哥"}]},
		{state:0,img:this.imgGuanYu[0],x:4,y:6,talk1:[
			{imgHead:this.imgLiuBei[1],speak:"刘备:",str:"二弟,可否助我？"},
			{imgHead:this.imgGuanYu[1],speak:"关羽:",str:"誓死追随大哥！"}]},
		];
		this.MAP_1.currentNPC = [
		{state:0,img:this.imgsNPC[0],x:4,y:3,
			talk1:[{imgHead:this.imgsNpcFace[0],speak:"妹子:",str:"如今,天下打乱,民不聊生"},
					{imgHead:this.imgsNpcFace[0],speak:"妹子:",str:"有志之士都应报效国家"},
					{imgHead:this.imgLiuBei[1],speak:"刘备:",str:"在下正有此意"},
					{imgHead:this.imgsNpcFace[0],speak:"妹子:",str:"那么,祝少侠一路平安"},
					{imgHead:this.imgLiuBei[1],speak:"刘备:",str:"多谢！"}
				],
			talk2:[{imgHead:this.imgsNpcFace[0],speak:"小弟:",str:"大哥我今天好想砍人啊"},{imgHead:this.imgLiuBei[1],speak:"刘备:",str:"没问题,砍起来"}]
			},
		];
		this.MAP_1.enterNextMap[0].map = this.MAP_2;
		this.MAP_2.enterNextMap[0].map = this.MAP_1;
		this.MAP_2.enterNextMap[1].map = this.MAP_3;
		this.MAP_2.enterNextMap[2].map = this.MAP_4;
		this.MAP_3.enterNextMap[0].map = this.MAP_2;
		this.MAP_4.enterNextMap[0].map = this.MAP_2;
	},
	//载入地图数据
	initMapData:function(data,now){
		this.npcList.list.length=0;
		if(data.currentNPC.length!=0){
			for(var i=0;i<data.currentNPC.length;i++){
				var p = data.currentNPC[i];
				if(p.state==0){
					var npc = new this.GameNpc(p.img,p.x,p.y,p.talk1);
				}
				if(p.state==1){
					var npc = new this.GameNpc(p.img,p.x,p.y,p.talk2);
				}
				this.npcList.add(npc);
			}
		}
		if(!now){
			this.protagonist.x = 128;
			this.protagonist.y = 128;
			this.background = new this.Background(0,0,data.currentMap,data.enterNextMap,data.name,data.mapClass);
		}
		else{
			for(var i=0;i<data.enterNextMap.length;i++){
				if(now==data.enterNextMap[i].name){
					this.protagonist.x = data.enterNextMap[i].hero.x;
					this.protagonist.y = data.enterNextMap[i].hero.y;
					this.background = new this.Background(data.enterNextMap[i].MapX,data.enterNextMap[i].MapY,data.currentMap,data.enterNextMap,data.name,data.mapClass);
					for(var j=0;j<this.npcList.list.length;j++){
						this.npcList.list[j].x += data.enterNextMap[i].MapX;
						this.npcList.list[j].y += data.enterNextMap[i].MapY;
					}
					break;
				}
			}
		}
		if(this.background.mapClass==0){
			this.cur_phase = this.PHASE_SAFERING;
		}
		if(this.background.mapClass==1){
			this.cur_phase = this.PHASE_FIGHTING;
		}
	},
	//主菜单对象
		Menu:function(img){
		this.img = img;
		this.startStr = "新的开始";
		this.oldStr = "旧的回忆";
		this.strWidth = three.ctx.measureText(this.startStr).width;
		this.y = three.canvas_height;
		this.rectY = three.canvas_height/2;
		this.moveOver = false;
		this.moveCount = 0;
		this.draw = function(){
			three.ctx.fillStyle = "black";
			three.ctx.fillRect(0,0,three.canvas_width,three.canvas_height);
			three.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,0,this.y,three.canvas_width,three.canvas_height);
			if(this.moveOver){
				three.ctx.strokeRect(three.canvas_width/2-this.strWidth/2-10,this.rectY,this.strWidth+20,40);
				three.ctx.fillStyle = "white";
				three.ctx.fillText(this.startStr,three.canvas_width/2-this.strWidth/2,three.canvas_height/2+30);
				three.ctx.fillText(this.oldStr,three.canvas_width/2-this.strWidth/2,three.canvas_height/2+70);
			}
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%2==0){
				if(this.y>0){
					this.y-=8;
				}
				else{
					this.moveOver = true;
					three.ctx.fillStyle = "white";
				}
			}
		}
	},
	//查看状态栏
	State:function(){
		this.state = 0;
		this. i = 0;
		this.draw = function(){
			three.ctx.font = "32px SimHei";
			three.ctx.fillStyle = "black";
			three.ctx.fillRect(20,20,100,130);
			three.ctx.fillStyle = "white";
			three.ctx.fillText('状态',40,55);
			three.ctx.fillText('存档',40,95);
			three.ctx.fillText('读挡',40,135);
		}
		this.move = function(){
			if(this.state == 1){
				three.ctx.beginPath();
				three.ctx.moveTo(30,40+this.i*40);
				three.ctx.lineTo(35,45+this.i*40);
				three.ctx.lineTo(30,50+this.i*40);
				three.ctx.fill();
				three.ctx.closePath();
			}
			if(this.state == 2){
				three.ctx.fillStyle = "black";
				three.ctx.fillRect(160,20,230,130);
				three.ctx.drawImage(three.imgLiuBei[1],0,0,90,100,170,30,100,100);
				three.ctx.font = "16px SimHei";
				three.ctx.fillStyle = "white";
				three.ctx.fillText('等级:'+three.protagonist.level,200+three.imgLiuBei[1].width,50);
				three.ctx.fillText('攻击:'+three.protagonist.attack,200+three.imgLiuBei[1].width,70);
				three.ctx.fillText('血量:'+three.protagonist.blood,200+three.imgLiuBei[1].width,90);
				three.ctx.fillText('技能:',200+three.imgLiuBei[1].width,130);
				for(var i =0;i<three.protagonist.magic.length;i++){
					three.ctx.fillText(three.protagonist.magic[i].name,200+three.imgLiuBei[1].width+three.ctx.measureText('技能:').width,120+i*20);
				}
			}
			if(this.state == 3){
				//存储英雄
				var hero = JSON.stringify(three.protagonist);
				//存储英雄魔法图片
				var imgMagic = [];
				for(var i = 0;i<three.protagonist.magic.length;i++){
					imgMagic[imgMagic.length] = three.protagonist.magic[i].img.getAttribute('src');
				}
				localStorage.imgMagic = JSON.stringify(imgMagic);
				localStorage.hero = hero;
				//x,y,map,enterNextMap,name,mapClass
				localStorage.mapX = JSON.stringify(three.background.x);
				localStorage.mapY = JSON.stringify(three.background.y);
				localStorage.map = JSON.stringify(three.background.currentMap);
				localStorage.mapName = JSON.stringify(three.background.name);
				localStorage.mapClass = JSON.stringify(three.background.mapClass);
				//存储当前地图
				localStorage.nowYouLooked = JSON.stringify(three.background.nowYouLooked);
				three.ctx.fillStyle = "black";
				//存储NPC
				localStorage.npc = JSON.stringify(three.npcList.list);
				var img = [];
				for(var i =0 ; i<three.npcList.list.length;i++){
					img[img.length] = three.npcList.list[i].img.getAttribute('src');
				}
				localStorage.imgNpc = JSON.stringify(img);
				//npc的对话头像存储
				var imgHead = [];
				for(var i = 0;i<three.npcList.list.length;i++){
					imgHead[i] = [];
					for(var j = 0;j<three.npcList.list[i].str.length;j++){
						imgHead[i][j] = three.npcList.list[i].str[j].imgHead.getAttribute('src');
					}
				}
				localStorage.imgHead = JSON.stringify(imgHead);
				three.ctx.fillRect(160,40,160,50);
				three.ctx.font = "32px SimHei";
				three.ctx.fillStyle = "white";
				three.ctx.fillText('存档成功',180,75);
			}
			if(this.state == 4){
				three.getRecord();
			}
		}
	},
	//获取记录
	getRecord:function(){
		var hero = localStorage.getItem('hero');
		//取出必要属性英雄属性
		three.protagonist.blood = JSON.parse(hero).blood;
		three.protagonist.name = JSON.parse(hero).name;
		three.protagonist.x = JSON.parse(hero).x;
		three.protagonist.y = JSON.parse(hero).y;
		three.protagonist.indexX = JSON.parse(hero).indexX;
		three.protagonist.indexY = JSON.parse(hero).indexY;
		three.protagonist.isWalk = JSON.parse(hero).isWalk;
		three.protagonist.moveStart = JSON.parse(hero).moveStart;
		three.protagonist.direction = JSON.parse(hero).direction;
		three.protagonist.keyDown = JSON.parse(hero).keyDown;
		three.protagonist.moveCount = JSON.parse(hero).moveCount;
		three.protagonist.walkCount = JSON.parse(hero).walkCount;
		three.protagonist.needEXP = JSON.parse(hero).needEXP;
		three.protagonist.nowEXP = JSON.parse(hero).nowEXP;
		three.protagonist.magic = JSON.parse(hero).magic;
		three.protagonist.attack = JSON.parse(hero).attack;
		three.protagonist.level = JSON.parse(hero).level;
		var imgMagic = JSON.parse(localStorage.getItem('imgMagic'));
		for(var i = 0;i<imgMagic.length;i++){
			var imgMagicNow = new Image();
			imgMagicNow.src = imgMagic[i];
			three.protagonist.magic[i].img = imgMagicNow;
		}
		//取出地图必要属性
		var mapName = JSON.parse(localStorage.getItem('mapName'));
		var mapX = JSON.parse(localStorage.getItem('mapX'));
		var mapY = JSON.parse(localStorage.getItem('mapY'));
		var map = JSON.parse(localStorage.getItem('map'));
		//取出地图
		var mapClass = JSON.parse(localStorage.getItem('mapClass'));
		var nextMap = eval("three.MAP_"+(mapName.substr(3,1))).enterNextMap;
		three.background = new three.Background(mapX,mapY,map,nextMap,mapName,mapClass);
		three.background.nowYouLooked = JSON.parse(localStorage.getItem('nowYouLooked'));
		//取出NPC
		var list = JSON.parse(localStorage.getItem('npc'));
		three.npcList.list.length = 0;
		//npc的身体图片
		var img = JSON.parse(localStorage.getItem('imgNpc'));
		for(var i = 0;i<list.length;i++){
			var imgBody = new Image();
			imgBody.src = img[i];
			var npc = new three.GameNpc(imgBody,list[i].x,list[i].y,list[i].str);
			npc.firstIndexY = list[i].firstIndexY;
			npc.index = list[i].index;
			npc.indexY = list[i].indexY;
			three.npcList.list.push(npc);
		}
		//npc的对话图片
		var imgHead = JSON.parse(localStorage.getItem('imgHead'));
		for(var i =0;i<three.npcList.list.length;i++){
			for(var j=0;j<three.npcList.list[i].str.length;j++){
				var imgHeadNow = new Image();
				imgHeadNow.src = imgHead[i][j]
				three.npcList.list[i].str[j].imgHead = imgHeadNow;
			}
		}
		three.cur_phase = 3;
		three.state.state = 0;
	},
	//背景对象
	Background:function(x,y,map,enterNextMap,name,mapClass){
		this.x = x;
		this.y = y;
		this.mapClass = mapClass;
		this.name = name;
		this.enterNextMap = enterNextMap;
		this.startX = -this.x;
		this.startY = -this.y;
		this.moveBK = false;
		this.direction = null;
		this.moveCount = 0;
		this.walkCount = 0;
		this.nowYouLooked =[];
		this.currentMap=map;
		this.canRightCount = this.currentMap[0].length - three.canvas_width/three.SIZE - this.startX;
		this.canLeftCount = this.startX;
		this.canDownCount = this.currentMap.length - three.canvas_height/three.SIZE - this.startY;
		this.canUpCount = this.startY;
		for(var i1 =(-this.y),i2=0;i1<three.canvas_height/three.SIZE+(-this.y);i1++,i2++){
			this.nowYouLooked[i2] = [];
			for(var j1 = (-this.x),j2=0;j1<three.canvas_width/three.SIZE+(-this.x);j1++,j2++){
				if(this.currentMap[i1][j1]==10||this.currentMap[i1][j1]==11||this.currentMap[i1][j1]==12||this.currentMap[i1][j1]==13||this.currentMap[i1][j1]==14||this.currentMap[i1][j1]==15||this.currentMap[i1][j1]==16||this.currentMap[i1][j1]==17||this.currentMap[i1][j1]==20||this.currentMap[i1][j1]==21||this.currentMap[i1][j1]==26||this.currentMap[i1][j1]==77||this.currentMap[i1][j1]==4||this.currentMap[i1][j1]==81||this.currentMap[i1][j1]==80||this.currentMap[i1][j1]==5||this.currentMap[i1][j1]==3||this.currentMap[i1][j1]==6){
					this.nowYouLooked[i2][j2] = 1;
				}
				else{
					this.nowYouLooked[i2][j2] = 0;
				}
			}
		}
		for(var k=0;k<three.npcList.list.length;k++){
			if((three.npcList.list[k].y>=0)&&(three.npcList.list[k].x>=0)){
				var i = three.npcList.list[k].y;
				var j = three.npcList.list[k].x;
				this.nowYouLooked[i][j] = 2;
			}
		}
		this.draw = function(){
			var firstX = this.x;
			var firstY = this.y;
			for(var i=0; i<this.currentMap.length;i++,this.y++){
				for(var j=0;j<this.currentMap[i].length;j++,this.x++){
					var x = this.currentMap[i][j]%10;
					var y = parseInt(this.currentMap[i][j]/10);
					three.ctx.drawImage(three.imgMap,x*three.SIZE,y*three.SIZE,three.SIZE,three.SIZE,this.x*three.SIZE,this.y*three.SIZE,three.SIZE,three.SIZE);
				}
				this.x = firstX;
			}
			this.y = firstY;
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveBK){
				if(this.moveCount%2==0){
					if(this.direction==39){
						if(!three.canMove(39)){	this.moveBK = false;three.isMoveBk = false;three.isKeyDown=false;return;}
						this.x -= 0.25;
						for(var i=0;i<three.npcList.list.length;i++){
							three.npcList.list[i].x -= 0.25;
						}
						this.walkCount++;
						if(this.walkCount==4){
							this.moveBK = false;
							three.isMoveBk = false;
							three.isKeyDown==false;
							this.startX++;
							three.createLookArray();
							this.walkCount = 0;
							this.canRightCount--;
							this.canLeftCount++;
							three.isChangeMap();
						}
					}
					if(this.direction==37){
						if(!three.canMove(37)){	this.moveBK = false;three.isMoveBk = false;three.isKeyDown=false;return;}
						this.x += 0.25;
						for(var i=0;i<three.npcList.list.length;i++){
							three.npcList.list[i].x += 0.25;
						}
						this.walkCount++;
						if(this.walkCount==4){
							this.moveBK = false;
							three.isMoveBk = false;
							three.isKeyDown==false;
							three.createLookArray();
							this.walkCount = 0;
							this.startX--;
							this.canRightCount++;
							this.canLeftCount--;
							three.isChangeMap();
						}
					}
					if(this.direction==38){
						if(!three.canMove(38)){	this.moveBK = false;three.isMoveBk = false;three.isKeyDown=false;return;}
						this.y += 0.25;
						for(var i=0;i<three.npcList.list.length;i++){
							three.npcList.list[i].y += 0.25;
						}
						this.walkCount++;
						if(this.walkCount==4){
							this.moveBK = false;
							three.isMoveBk = false;
							three.isKeyDown==false;
							three.createLookArray();
							this.walkCount = 0;
							this.startY--;
							this.canUpCount--;
							this.canDownCount++;
							three.isChangeMap();
						}
					}
					if(this.direction==40){
						if(!three.canMove(40)){	this.moveBK = false;three.isMoveBk = false;three.isKeyDown=false;return;}
						this.y -= 0.25;
						for(var i=0;i<three.npcList.list.length;i++){
							three.npcList.list[i].y -= 0.25;
						}
						this.walkCount++;
						if(this.walkCount==4){
							this.moveBK = false;
							three.isMoveBk = false;
							three.isKeyDown==false;
							three.createLookArray();
							this.walkCount = 0;
							this.startY++;
							this.canUpCount++;
							this.canDownCount--;
							three.isChangeMap();
						}
					}
				}
			}
		}
	},
	//判断是否需要重载地图
	isChangeMap:function(){
		var map = three.background;
		var hero = three.protagonist;
		for(var i=0;i<map.enterNextMap.length;i++){
			if((hero.x==map.enterNextMap[i].heroX)&&(hero.y==map.enterNextMap[i].heroY)&&(map.startX==map.enterNextMap[i].mapStartX)&&(map.startY==map.enterNextMap[i].mapStartY)){
				this.initMapData(map.enterNextMap[i].map,this.background.name);
				break;
			}
		}
	},
	//改变当前所看到地图的数组
	createLookArray:function(){
		for(var i1 =(-three.background.y),i2=0;i1<three.canvas_height/three.SIZE+(-three.background.y);i1++,i2++){
			for(var j1 = (-three.background.x),j2=0;j1<three.canvas_width/three.SIZE+(-three.background.x);j1++,j2++){
				if(three.background.currentMap[i1][j1]==10||three.background.currentMap[i1][j1]==11||three.background.currentMap[i1][j1]==12||three.background.currentMap[i1][j1]==13||three.background.currentMap[i1][j1]==14||three.background.currentMap[i1][j1]==15||three.background.currentMap[i1][j1]==16||three.background.currentMap[i1][j1]==17||three.background.currentMap[i1][j1]==20||three.background.currentMap[i1][j1]==21||three.background.currentMap[i1][j1]==26||three.background.currentMap[i1][j1]==77){
					three.background.nowYouLooked[i2][j2] = 1;
				}
				else{
					three.background.nowYouLooked[i2][j2] = 0;
				}
			}
		}
		for(var k=0;k<this.npcList.list.length;k++){
			if((this.npcList.list[k].y>=0)&&(this.npcList.list[k].x>=0)){
				var i = this.npcList.list[k].y;
				var j = this.npcList.list[k].x;
				this.background.nowYouLooked[i][j] = 2;
			}
		}
	},
	//按键所改变的状态
	onkeyA:function(d){
		three.isKeyDown=true;
		three.protagonist.isWalk=true;
		three.protagonist.direction=d;
		var changeD = (((d==39)||(d==37))?'x':'y');
		var herX = three.protagonist.x/three.SIZE;
		var herY = three.protagonist.y/three.SIZE;
		var backMiddleX = parseInt(three.canvas_width/three.SIZE/2);	
		var backMiddleY = parseInt(three.canvas_height/three.SIZE/2);
		if((changeD=='x')&&(herX>=backMiddleX)){
			if((d==39)&&((this.background.canRightCount>0))){
				this.moveBackGround(d);
			}
		}
		if((changeD=='x')&&(herX<=backMiddleX)){
			if((d==37)&&((this.background.canLeftCount>0))){
				this.moveBackGround(d);
			}
		}
		if((changeD=='y')&&(herY<=backMiddleY)){
			if((d==38)&&((this.background.canUpCount>0))){
				this.moveBackGround(d);
			}
		}
		if((changeD=='y')&&(herY>=backMiddleY)){
			if((d==40)&&((this.background.canDownCount>0))){
				this.moveBackGround(d);
			}
		}
	},
	//图像位移函数
	moveBackGround:function(direction){
		this.isKeyDown = false;
		this.isMoveBk = true;
		this.background.direction=direction;
		this.protagonist.isWalk=false;
		this.background.moveBK = true;
	},
	//主角英雄对象
	Protagonist:function(){
		this.level = 1;				//等级
		this.name = "刘备";
		this.x = null;
		this.y = null;
		this.indexX = 0;
		this.indexY = 0;
		this.isWalk = false;
		this.moveStart = false;
		this.direction = null;
		this.keyDown = false;
		this.moveCount = 0;
		this.walkCount = 0;
		//战斗属性
		this.blood = 130;
		this.bloodGrow = 10;
		this.attack = 40;
		this.attackGrow = 5;
		this.needEXP =100;
		this.nowEXP =100;
		this.experienceGrow = 200;
		this.img = three.imgLiuBei[0];
		//魔法
		this.magic = [{name:"雷电术",img:three.imgsMagic[0]},{name:"火球术",img:three.imgsMagic[1]}],
		this.draw = function(){
			three.ctx.drawImage(this.img,this.indexX*three.SIZE,this.indexY*three.SIZE,three.SIZE,three.SIZE,this.x,this.y,three.SIZE,three.SIZE);
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%5==0){
				this.indexX ++;
				if(this.indexX==3){
					this.indexX=0;
				}
			}
			if(this.direction==39){
				this.indexY = 2
			}
			if(this.direction==37){
				this.indexY = 1
			}
			if(this.direction==40){
				this.indexY = 0
			}
			if(this.direction==38){
				this.indexY = 3
			}
			if(this.isWalk){
				this.isKeyDown=true;
				if(this.direction==39){
					three.heroInterval(39);
				}
				if(this.direction==37){
					three.heroInterval(37);
				}
				if(this.direction==40){
					three.heroInterval(40);
				}
				if(this.direction==38){
					three.heroInterval(38);
				}
			}
		}
	},
	//NPC对象
	GameNpc:function(img,x,y,str){
		this.x = x;
		this.y = y;
		this.firstIndexY = 0;
		this.index = 0;
		this.img = img;
		this.indexY = 0;
		this.moveCount=0;
		//要说的话
		this.str = str;
		this.draw = function(){
			three.ctx.drawImage(this.img,this.index*three.SIZE,this.indexY*three.SIZE,three.SIZE,three.SIZE,this.x*three.SIZE,this.y*three.SIZE,three.SIZE,three.SIZE);
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%5==0){
				this.index++;
				if(this.index==3){
					this.index = 0;
				}
			}
		}
	},
	//NPC列表
	GameNpcList:function(){
		this.list = [];
		this.add = function(obj){
			this.list.push(obj);
		}
		this.draw = function(){
			for(var i = 0; i<this.list.length;i++){
				this.list[i].draw();
			}
		}
		this.move = function(){
			for(var i = 0; i<this.list.length;i++){
				this.list[i].move();
			}
		}
	},
	//遇敌画圆函数
	CIRCLE:function(){
		this.x = three.protagonist.x;
		this.y = three.protagonist.y;
		this.r = 500;
		this.moveCount = 0;
		three.ctx.strokeStyle = "black";
		three.ctx.lineWidth = '500';
		this.draw = function(){
			three.ctx.beginPath();
			three.ctx.arc(this.x+16,this.y+16,this.r,0,2*Math.PI);
			three.ctx.stroke();
			three.ctx.closePath();
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%1==0){
				this.r -= 10;
			}
			if(this.r == 0){
				three.enemyList = new three.GameEnemyList();
				three.ctx.fillStyle = "black";
				var k = parseInt(Math.random()*3)+1;
				for(var i=0;i<k;i++){
					var enmey = new three.GameEnemy(i);
					three.enemyList.add(enmey);
				}
				three.battleHero = new three.HeroBattle(three.protagonist.blood,three.protagonist.attack,three.protagonist.name);
				three.select = new three.GameSelect();
				three.magic = new three.GameMagic();
				three.cur_phase = three.PHASE_BATTLE;
			}
		}
	},
	//魔法对象
	GameMagic:function(){
		this.list = three.protagonist.magic;
		this.x = 0;
		this.y = 0;
		this.width = 192;
		this.height = 192;
		this.moveCount = 0;
		this.draw = function(){
			three.ctx.drawImage(this.list[three.select.magicX].img,this.x*this.width,this.y*this.height,this.width,this.height,three.canvas_width/2-this.width/2,three.canvas_height/2-this.height/2,this.width,this.height);
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%10==0){
				this.x ++;
				if(this.x==5){
					three.select.state = 3;
					three.select.i = 0;
					this.x = 0;
				}
			}
		}
	},
	//敌人对象
	GameEnemy:function(y){
		this.dead = false;
		this.y = y;
		this.x = 1;
		this.y1 = 1
		this.name = "盗贼";
		this.moveX = 11;
		this.height = 64;
		this.blood = parseInt(Math.random()*20+30);
		this.attack = parseInt(Math.random()*5+10);
		this.img = three.imgsNPC[1];
		this.imgDead = three.imgsEnemyDead[0];
		var w1 = three.ctx.measureText(this.name).width;
		var w2 = three.ctx.measureText(this.blood).width;
		this.w3 = (w1-w2)/2;
		this.moveCount = 0;
		this.Count = this.attack;
		this.canMove = false;
		this.strOver = true;
		this.strCount = 0;
		this.experience = 60;
		this.draw = function(){
			if(!this.dead){
				three.ctx.drawImage(this.img,this.x*three.SIZE,three.SIZE*this.y1,three.SIZE,three.SIZE,this.moveX*three.SIZE,this.height*this.y+20,three.SIZE,three.SIZE);
			}
			else{
				three.ctx.drawImage(this.imgDead,0,0,three.SIZE,three.SIZE,this.moveX*three.SIZE,this.height*this.y+20,three.SIZE,three.SIZE);
			}
			three.ctx.fillStyle = "white";
			three.ctx.fillText(this.name,this.moveX*three.SIZE+60-this.w3,this.height*this.y+35);
			three.ctx.fillText(this.blood,this.moveX*three.SIZE+60,this.height*this.y+55);
			three.ctx.fillStyle = "red";
			three.ctx.fillRect(this.moveX*three.SIZE,this.height*(this.y+1)+10,this.blood*0.5,4);
		}
		this.move = function(){
			this.moveCount++;
			if((three.select.state == 6)&&(this.canMove)){
				if(this.moveCount%2==0){
					this.x++;
					if(this.x==4){
						this.x=0;
					}
					this.moveX -= 0.2;
					if(this.moveX <= 9){
						three.select.state = 7;
					}
				}
			}
			if((three.select.state == 7)&&(this.canMove)){
				three.ctx.beginPath();
				three.ctx.moveTo(three.battleHero.moveX*three.SIZE+three.SIZE,20);
				three.ctx.lineTo(three.battleHero.moveX*three.SIZE,20+32);
				three.ctx.fillStyle = "white";
				three.ctx.stroke();
				three.ctx.closePath();
				three.battleHero.blood -= 1;
				if(three.battleHero.blood == 0){
					three.select.state = 8;
					this.strOver = false;
				}
				this.Count -= 1;
				if(this.Count==0){
					three.select.state = 8;
					this.Count = this.attack;
					this.strOver = false;
				}
			}
			if((three.select.state == 8)&&(this.canMove)){
				three.ctx.fillStyle = "white";
				if(three.battleHero.blood != 0){
					var str1 = this.name+" 对 "+three.battleHero.name+"造成了"+this.attack+"点伤害";
					var str2 = str1.substr(0,this.strCount);
				}
				else{
					var str1 = "您在此战役中全军覆没了！";
					var str2 = str1.substr(0,this.strCount);
				}
				three.ctx.fillText(str2,110+10,3*84);
				this.strCount++;
				if(this.strCount == str1.length){
					this.strOver = true;
				}
			}
			if((three.select.state == 9)&&(this.canMove)){
				this.strCount = 0;
				if(this.moveCount%2==0){
					this.x++;
					if(this.x==4){
						this.x=0;
					}
					this.y1 = 2;
					this.moveX += 0.2;
					if(this.moveX >= 11){
						this.moveX = 11;
						this.y1 = 1;
						this.canMove = false;	
						three.enemyList.turn++;
						for(var i=three.enemyList.turn;i<three.enemyList.list.length;i++){
							if(!three.enemyList.list[three.enemyList.turn].dead){
								three.enemyList.list[three.enemyList.turn].canMove = true;
								three.select.state = 6;
								break;
							}
							three.enemyList.turn++;
							if(three.enemyList.turn == three.enemyList.list.length){break;}
						}
						if(three.enemyList.turn == three.enemyList.list.length){
							three.select.state = 0 ;
							three.enemyList.turn = 0;
						}
					}
				}
			}
		}
	},
	//敌人对象列表
	GameEnemyList:function(){
		this.list = [];
		this.turn = 0;
		this.draw= function(){
			for(var i=0;i<this.list.length;i++){
				this.list[i].draw();
			}
		}
		this.add = function(enemy){
			this.list.push(enemy);
		}
		this.move = function(){
			for(var i=0;i<this.list.length;i++){
				this.list[i].move();
			}
		}
	},
	//战斗选择对象
	GameSelect:function(){
		this.width = 80;
		this.height = 140;
		this.strOver = false;
		this.state = 0;
		this.strCount = 0;
		this.y = 0;
		this.i = 0;					//选项（攻击，道具）
		this.k = 0;					//选择敌人
		this.magicX = 0;
		three.ctx.lineWidth = '2';
		three.ctx.strokeStyle = "white";
		this.draw = function(){
			three.ctx.strokeRect(20,three.canvas_height/2,this.width,this.height);
			three.ctx.fillStyle = "white";
			three.ctx.fillText('攻击',50,three.canvas_height/2+30*(this.y+1));
			three.ctx.fillText('道具',50,three.canvas_height/2+30*(this.y+2));
			three.ctx.fillText('魔法',50,three.canvas_height/2+30*(this.y+3));
			three.ctx.fillText('逃跑',50,three.canvas_height/2+30*(this.y+4));
			three.ctx.strokeRect(30+this.width,3*84-30,300,50);
			if(this.state==0){
				for(var i=0;i<three.enemyList.list.length;i++){
					if(!three.enemyList.list[i].dead){
						this.k = i;
						break;
					}
				}
				three.ctx.beginPath();
				three.ctx.moveTo(30,(this.i+1)*30+three.canvas_height/2-10);
				three.ctx.lineTo(35,(this.i+1)*30+three.canvas_height/2-5);
				three.ctx.lineTo(30,(this.i+1)*30+three.canvas_height/2);
				three.ctx.fill();
				three.ctx.closePath();
			}
			if(this.state==1){
				three.ctx.beginPath();
				three.ctx.moveTo(11*three.SIZE-20,(this.k)*64+35);
				three.ctx.lineTo(11*three.SIZE-15,(this.k)*64+40);
				three.ctx.lineTo(11*three.SIZE-20,(this.k)*64+45);
				three.ctx.fill();
				three.ctx.closePath();
			}
			if(this.state==11){
				three.ctx.fillStyle = "white";
				var str1 = "逃跑成功";
				var str2 = str1.substr(0,this.strCount);
				three.ctx.fillText(str2,110+10,3*84);
				this.strCount++;
				if(this.strCount == str1.length){
					this.strOver = true;
				}
			}
			if(this.state==12){
				three.ctx.fillStyle = "white";
				var str1 = "逃跑失败";
				var str2 = str1.substr(0,this.strCount);
				three.ctx.fillText(str2,110+10,3*84);
				this.strCount++;
				if(this.strCount == str1.length){
					this.strOver = true;
				}
			}
			if(this.state == 13){
				three.ctx.strokeRect(30+this.width,3*84-100,200,50);
				for(var i=0;i<three.magic.list.length;i++){
					three.ctx.fillText(three.magic.list[i].name,30+this.width+20+i*80,3*84-67);
				}
				three.ctx.beginPath();
				three.ctx.moveTo(30+this.width+10+this.magicX*80,3*84-80);
				three.ctx.lineTo(30+this.width+10+this.magicX*80+5,3*84-75);
				three.ctx.lineTo(30+this.width+10+this.magicX*80,3*84-70);
				three.ctx.fill();
				three.ctx.closePath();
			}
		}
	},
	//或许战斗英雄对象
	HeroBattle:function(blood,attack,name){
		this.blood = blood;
		this.name = name;
		this.attack = attack;
		this.img = three.imgLiuBei[0];
		this.i = 0;
		this.x = 0;
		this.y = 2;
		this.height = 64;
		this.moveCount = 0 ;
		this.moveX = 3;
		var width = this.blood*0.5;
		var end = 4*three.SIZE;
		this.start = end - width;
		var w1 = three.ctx.measureText(this.name).width;
		var w2 = three.ctx.measureText(this.blood).width;
		this.w3 = (w1-w2)/2;
		this.Count = parseInt(Math.random()*15+(this.attack-10));
		this.damage = this.Count;
		this.strCount = 0;
		this.strOver = true;
		this.draw = function(){
			three.ctx.drawImage(this.img,this.x*three.SIZE,three.SIZE*this.y,three.SIZE,three.SIZE,this.moveX*three.SIZE,this.height*this.i+20,three.SIZE,three.SIZE);
			three.ctx.fillStyle = "white";
			three.ctx.fillText(this.name,2*three.SIZE-three.ctx.measureText(this.blood).width+5-this.w3,this.height*this.i+35);
			three.ctx.fillText(this.blood,2*three.SIZE-three.ctx.measureText(this.blood).width+5,this.height*this.i+55);
			three.ctx.fillStyle = "red";
			three.ctx.fillRect(this.start,this.height*(this.i+1)+10,this.blood*0.5,4);
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%2==0){
				if(three.select.state == 2){
					this.x++;
					if(this.x==4){
						this.x=0;
					}
					this.moveX += 0.2;
					if(this.moveX >= 5){
						three.select.state = 3;
					}
				}
			}
			if(three.select.state == 3){
				if(three.select.i == 2){
					three.select.state = 14;
					return;
				}
				three.ctx.beginPath();
				three.ctx.moveTo(three.enemyList.list[0].moveX*three.SIZE+three.SIZE,three.enemyList.list[0].height*three.select.k+20);
				three.ctx.lineTo(three.enemyList.list[0].moveX*three.SIZE,three.enemyList.list[0].height*three.select.k+20+32);
				three.ctx.fillStyle = "white";
				three.ctx.stroke();
				three.ctx.closePath();
				three.enemyList.list[three.select.k].blood -= 1;
				if(three.enemyList.list[three.select.k].blood==0){
					three.enemyList.list[three.select.k].dead = true;
					this.strOver = false;
					three.select.state = 4;
				}
				this.Count -= 1;
				if(this.Count==0){
					three.select.state = 4;
					this.strOver = false;
				}
			}
			if(three.select.state == 4){
				three.ctx.fillStyle = "white";
				var str1 = this.name+" 对 "+three.enemyList.list[three.select.k].name+"造成了"+(this.damage)+"点伤害";
				var str2 = str1.substr(0,this.strCount);
				three.ctx.fillText(str2,110+10,3*84);
				this.strCount++;
				if(this.strCount == str1.length){
					this.strOver = true;	
				}
			}
			if(three.select.state == 5){
				if(this.moveCount%2==0){
					this.x++;
					if(this.x==4){
						this.x=0;
					}
					this.strCount = 0;
					this.y = 1;
					this.moveX -= 0.2;
					if(this.moveX <=3){
						this.moveX = 3;
						this.y = 2;
						three.select.state = 6;
						this.Count = parseInt(Math.random()*15+(this.attack-10));
						this.damage = this.Count;
					}
				}
			}
			if(three.select.state == 10){
				three.ctx.fillStyle = "white";
				var str1 = this.name+"军取得了胜利！";
				var str2 = str1.substr(0,this.strCount);
				three.ctx.fillText(str2,110+10,3*84);
				if(this.moveCount%3==0){
					this.strCount++;
				}
				if(this.strCount == str1.length){
					this.strOver = true;
				}
			}
		}
	},
	//获取结算界面对象
	AccountsWin:function(){
		this.getExperience = 0;
		for(var i=0;i<three.enemyList.list.length;i++){
			this.getExperience += three.enemyList.list[i].experience;
		}
		this.img = three.protagonist.img;
		this.x = 0;
		this.moveCount = 0;
		this.canGetEXP = true;
		this.draw = function(){
			three.ctx.fillStyle = "black";
			three.ctx.fillRect(0,0,three.canvas_width,three.canvas_height);
			three.ctx.drawImage(this.img,this.x*three.SIZE,0,three.SIZE,three.SIZE,three.canvas_width/2-three.SIZE/2,three.canvas_height/2-three.SIZE/2,three.SIZE,three.SIZE);
			three.ctx.fillStyle = "white";
			three.ctx.fillText("升级所需经验:"+three.protagonist.nowEXP,30,three.canvas_height/2-three.SIZE/2);
			three.ctx.fillText("获得经验:"+this.getExperience,30,three.canvas_height/2-three.SIZE/2+40);
			if(!this.canGetEXP){
				three.ctx.fillText("当前等级:"+three.protagonist.level,three.canvas_width/2+60,three.canvas_height/2-three.SIZE/2-40);
				three.ctx.fillText("攻击:+"+three.protagonist.attackGrow,three.canvas_width/2+60,three.canvas_height/2-three.SIZE/2);
				three.ctx.fillText("获得血量:+"+three.protagonist.bloodGrow,three.canvas_width/2+60,three.canvas_height/2-three.SIZE/2+40);
			}
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%5 == 0){
				this.x++;
				if(this.x==4){
					this.x=0;
				}
			}
			if(three.protagonist.nowEXP==0){
				this.canGetEXP = false;
				three.protagonist.needEXP += three.protagonist.experienceGrow;
				three.protagonist.nowEXP = three.protagonist.needEXP;
				three.protagonist.attack += three.protagonist.attackGrow;
				three.protagonist.blood += three.protagonist.bloodGrow;
				three.protagonist.level++;
			}
			if((this.getExperience>0)&&(this.canGetEXP)){
				three.protagonist.nowEXP -= 2;
				this.getExperience -= 2;
			}
		}
	},
	GameOver:function(img){
		this.img = img;
		this.reStartStr = "重新开始";
		this.closePageStr = "关闭网页";
		this.strWidth = three.ctx.measureText(this.startStr).width;
		this.y = three.canvas_height;
		this.rectY = three.canvas_height/2;
		this.moveOver = false;
		this.moveCount = 0;
		this.draw = function(){
			three.ctx.fillRect(0,0,three.canvas_width,three.canvas_height);
			three.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,0,this.y,three.canvas_width,three.canvas_height);
			if(this.moveOver){
				three.ctx.strokeRect(three.canvas_width/2-this.strWidth/2-10,this.rectY,this.strWidth+20,40);
				three.ctx.fillText(this.reStartStr,three.canvas_width/2-this.strWidth/2,three.canvas_height/2+30);
				three.ctx.fillText(this.closePageStr,three.canvas_width/2-this.strWidth/2,three.canvas_height/2+70);
			}
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%2==0){
				if(this.y>0){
					this.y-=8;
				}
				else{
					this.moveOver = true;
					three.ctx.fillStyle = "white";
				}
			}
		}
	},
	//英雄间隔移动
	heroInterval:function(d){
		if((!three.canMove(d))){	three.protagonist.isWalk = false;three.isKeyDown=false;return;}
			three.protagonist.moveStart=true;
			if(three.protagonist.moveCount%2==0){
				if(d==37){
					three.protagonist.x -= 8;
				}
				if(d==39){
					three.protagonist.x += 8;
				}
				if(d==38){
					three.protagonist.y -= 8;
				}
				if(d==40){
					three.protagonist.y += 8;
				}
				three.protagonist.walkCount++;
				if(three.protagonist.walkCount==4){
					three.protagonist.isWalk = false;
					three.protagonist.walkCount = 0;
					three.isKeyDown=false;
					three.protagonist.moveStart = false;
					three.isChangeMap();
				}
			}
	},
	//按键操作
	moveFn:function(e){
		if(((this.cur_phase==this.PHASE_SAFERING)||(this.cur_phase==this.PHASE_FIGHTING))&&((e==37)||(e==38)||(e==39)||(e==40))){
			(this.timer==undefined)&&(this.timer=setInterval(function(){
				((this.isKeyDown==false)&&(this.isMoveBk==false))&&this.onkeyA(e)}.bind(this),10));
		}
		if((this.cur_phase==this.PHASE_SAFERING)&&(e==69)){
			this.judgeTalk();
		}
		if((this.cur_phase==this.PHASE_TALKING)&&(e==69)){
			this.changeTalkStr();
		}
		//主菜单选项
		if((this.cur_phase==this.PHASE_MENU)&&(e==69)&&(this.menu.moveOver)){
			if(this.menu.rectY==this.canvas_height/2){
				this.menu.y = three.canvas_height;
				this.menu.moveOver = false;
				this.protagonist = new this.Protagonist();
				this.npcList = new this.GameNpcList();
				//所有图片加载完成,为全局地图变量添加数据
				this.interNpctoMap();
				//加载第一张地图
				this.initMapData(this.MAP_1);
				this.menu = new this.Menu(this.imgMenu);
			}
			else{
				three.getRecord();
			}
		}
		if((this.cur_phase==this.PHASE_MENU)&&(e==38)&&(this.menu.moveOver)&&(this.menu.rectY>three.canvas_height/2)){
			this.menu.rectY -= 40;
		}
		if((this.cur_phase==this.PHASE_MENU)&&(e==40)&&(this.menu.moveOver)&&(this.menu.rectY<three.canvas_height/2+40)){
			this.menu.rectY += 40;
		}
		//失败选项单
		if((this.cur_phase==this.PHASE_GAMEOVER)&&(e==69)&&(this.gameover.moveOver)){
			if(this.gameover.rectY==this.canvas_height/2){
				this.gameover.y = three.canvas_height;
				this.gameover.moveOver = false;
				this.cur_phase=this.PHASE_MENU;
			}
			else{
				window.close();
			}
		}
		if((this.cur_phase==this.PHASE_GAMEOVER)&&(e==38)&&(this.gameover.moveOver)&&(this.gameover.rectY>three.canvas_height/2)){
			this.gameover.rectY -= 40;
		}
		if((this.cur_phase==this.PHASE_GAMEOVER)&&(e==40)&&(this.gameover.moveOver)&&(this.gameover.rectY<three.canvas_height/2+40)){
			this.gameover.rectY += 40;
		}
		//战斗选项上下控制 攻击魔法 e控制选择
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==38)&&(this.select.state==0)){
			this.select.i--;
			if(this.select.i==-1){
				this.select.i = 3;
			}
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==40)&&(this.select.state==0)){
			this.select.i++;
			if(this.select.i==4){
				this.select.i=0;
			}
		}
		//主要战斗切换状态
		//判断各种 后面的e要放在上面
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==12)&&(this.battleHero.strOver)){
			for(var i=0;i<this.enemyList.list.length;i++){
				if(!this.enemyList.list[this.enemyList.turn].dead){
					this.enemyList.list[this.enemyList.turn].canMove = true;
					break;
				}
				this.enemyList.turn++;
			}
			this.select.state = 6;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==11)&&(this.battleHero.strOver)){
			this.verifyXY();
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==10)&&(this.battleHero.strOver)){
			this.accounts = new this.AccountsWin();
			this.enemyList.list.length = 0;
			this.cur_phase = this.PHASE_ACCOUNTS;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==8)&&(this.enemyList.list[this.enemyList.turn].strOver)){
			if(this.battleHero.blood != 0){
				this.select.state = 9;
			}
			else{
				//英雄死亡进入失败界面
				this.ctx.font = "32px SimHei";
				this.gameover = new this.GameOver(this.imgGameOver);
				this.cur_phase = this.PHASE_GAMEOVER;
			}
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==4)&&(this.battleHero.strOver)){
			var k = 0;
			for(var i=0;i<three.enemyList.list.length;i++){
				if(three.enemyList.list[i].dead){
					k++;
				}
			}
			if(k == this.enemyList.list.length){
				this.battleHero.strCount = 0;
				//此时胜利 进入结算页面
				this.select.state = 10;
			}
			this.select.state = 5;
			for(var i=0;i<this.enemyList.list.length;i++){
				if(!this.enemyList.list[this.enemyList.turn].dead){
					this.enemyList.list[this.enemyList.turn].canMove = true;
					break;
				}
				this.enemyList.turn++;
				if(this.enemyList.turn == this.enemyList.list.length){
					this.select.state = 10;
				}
			}
		}
		//左右选择魔法种类
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==37)&&(this.select.state==13)){
			three.select.magicX--;
			if(three.select.magicX==-1){
				three.select.magicX = three.magic.list.length-1;
			}
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==39)&&(this.select.state==13)){
			three.select.magicX++;
			if(three.select.magicX==three.magic.list.length){
				three.select.magicX = 0;
			}
		}
		//攻击选择i=0
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==1)&&(this.select.i==0)){
			this.select.state = 2;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==0)&&(this.select.i==0)){
			this.select.state = 1;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==0)&&(this.select.i==3)){
			//逃跑状态
			var success = Math.random();
			if(success>0.5){
				this.select.state = 11;
			}
			else{
				this.select.state = 12;
			}
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==1)&&(this.select.i==2)){
			this.select.state = 2;
		}
		//选择魔法
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==13)){
			this.select.state = 1;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==69)&&(this.select.state==0)&&(this.select.i==2)){
			this.select.state = 13;
		}
		//显示魔法
		//攻击人物上下选择攻击目标 e确定 esc返回上一级
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==38)&&(this.select.state==1)){
			var i = this.select.k;
			for(var i = this.select.k;i>=0;i--){
				if(i == 0){
					i = this.enemyList.list.length;
				}
				if(!this.enemyList.list[(i-1)].dead){
					this.select.k = (i-1);
					return;
				}
			}
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==40)&&(this.select.state==1)){
			var i = this.select.k;
				for(var i = this.select.k;i<this.enemyList.list.length;i++){
					if(i == this.enemyList.list.length - 1){
							i = -1;
					}
					if(!this.enemyList.list[(i+1)].dead){
						this.select.k = (i+1);
						return;
					}
				}
		}
		//按esc退到最初选择
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==27)&&(this.select.state==13)){
			this.select.state = 0;
		}
		if((this.cur_phase==this.PHASE_BATTLE)&&(e==27)&&(this.select.state==1)){
			if(this.select.i == 0){
				this.select.state = 0;
			}
			if(this.select.i == 2){
				this.select.state = 13;
			}
		}
		//结算界面按e继续获取经验
		if((this.cur_phase==this.PHASE_ACCOUNTS)&&(e==69)&&(this.accounts.canGetEXP==false)){
			this.accounts.canGetEXP = true;
		}
		if((this.cur_phase==this.PHASE_ACCOUNTS)&&(e==69)&&(this.accounts.getExperience==0)&&(this.accounts.canGetEXP)){
			//x,y余数校验
			this.verifyXY();
		}
		//用esc查看当前状态和存档
		//进入查看状态界面
		if(((this.cur_phase==this.PHASE_SAFERING))&&(e==27)&&this.state.state == 0){
			this.cur_phase = this.PHASE_STATE;
			//状态1进入列表
			this.state.state = 1;
		}
		else if(((this.cur_phase==this.PHASE_STATE))&&(e==27)&&this.state.state == 1){
			this.cur_phase = this.PHASE_SAFERING;
			//状态0退出
			this.state.state = 0;
		}
		else if(((this.cur_phase==this.PHASE_STATE))&&(e==27)&&(this.state.state == 2)){
			this.state.state = 1;
		}
		else if(((this.cur_phase==this.PHASE_STATE))&&(e==27)&&(this.state.state == 3)){
			this.state.state = 1;
		}
		//选择查看状态独挡,存档
		if(((this.cur_phase==this.PHASE_STATE))&&(e==38)&&this.state.state == 1){
			this.state.i --;
			if(this.state.i == -1){
				this.state.i = 2;
			}
		}
		if(((this.cur_phase==this.PHASE_STATE))&&(e==40)&&this.state.state == 1){
			this.state.i ++;
			if(this.state.i == 3){
				this.state.i = 0;
			}
		}
		//选择进入
		if(((this.cur_phase==this.PHASE_STATE))&&(e==69)&&this.state.state == 1){
			if(this.state.i == 0){
				//状态2查看状态
				this.state.state = 2;					
			}
			if(this.state.i == 1){
				//状态3存档
				this.state.state = 3;					
			}
			if(this.state.i == 2){
				//状态2独挡
				this.state.state = 4;					
			}
		}
	},
	//余数校验函数
	verifyXY:function(){
		var x = this.protagonist.x;
		var y = this.protagonist.y;
		if((x%32)!=0){
			var remainder = x%32;
			if(remainder>16){
				this.protagonist.x += (32-remainder);
			}
			else{
				this.protagonist.x -= remainder;
			}
		}
		if((y%32)!=0){
			var remainder = y%32;
			if(remainder>16){
				this.protagonist.y += (32-remainder);
			}
			else{
				this.protagonist.y -= remainder;
			}
		}
		this.cur_phase = this.PHASE_FIGHTING;
		three.protagonist.isWalk = false;
		three.protagonist.walkCount = 0;
		three.isKeyDown=false;
		three.protagonist.moveStart = false;
		three.isChangeMap();
	},
	//可否移动英雄或者背景（是否撞墙）
	canMove:function(direction){
		if(three.protagonist.moveStart){ return true;}
		var j = this.protagonist.x/three.SIZE;
		var i = this.protagonist.y/three.SIZE;
		if(direction==37){
			if((j==0)||(this.background.nowYouLooked[i][j-1]==2)||(this.background.nowYouLooked[i][j-1]==0)){
				return false;
			}
		}
		if(direction==39){
			if((j==(this.background.currentMap[0].length-this.background.startX-1)||(this.background.nowYouLooked[i][j+1]==2)||(this.background.nowYouLooked[i][j+1]==0))){
				return false;
			}
		}
		if(direction==38){
			if((i==0)||(this.background.nowYouLooked[i-1][j]==2)||(this.background.nowYouLooked[i-1][j]==0)){
				return false;
			}
		}
		if(direction==40){
			if((i==(this.background.currentMap.length-this.background.startY-1)||(this.background.nowYouLooked[i+1][j]==2)||(this.background.nowYouLooked[i+1][j]==0))){
				return false;
			}
		}
		return true;
	},
	//看E判断是否能进去对话模式
	judgeTalk:function(){
		if(this.protagonist.indexY==0){
			var i = this.protagonist.y/32+1;
			var j = this.protagonist.x/32;
			var k = this.isHaveNpc(i,j);
			if((k+1)){
				this.cur_phase = this.PHASE_TALKING;
				this.npcList.list[k].indexY = 3;
				this.talk = new this.Talk(this.npcList.list[k].str,k);
			}
		}
		if(this.protagonist.indexY==3){
			var i = this.protagonist.y/32-1;
			var j = this.protagonist.x/32;
			var k = this.isHaveNpc(i,j);
			if((k+1)){
				this.cur_phase = this.PHASE_TALKING;
				this.npcList.list[k].indexY = 0;
				this.talk = new this.Talk(this.npcList.list[k].str,k);
			}
		}
		if(this.protagonist.indexY==1){
			var i = this.protagonist.y/32;
			var j = this.protagonist.x/32-1;
			var k = this.isHaveNpc(i,j);
			if((k+1)){
				this.cur_phase = this.PHASE_TALKING;
				this.npcList.list[k].indexY = 2;
				this.talk = new this.Talk(this.npcList.list[k].str,k);
			}
		}
		if(this.protagonist.indexY==2){
			var i = this.protagonist.y/32;
			var j = this.protagonist.x/32+1;
			var k = this.isHaveNpc(i,j);
			if((k+1)){
				this.cur_phase = this.PHASE_TALKING;
				this.npcList.list[k].indexY = 1;
				this.talk = new this.Talk(this.npcList.list[k].str,k);
			}
		}
	},
	//判断面前是否有NPC
	isHaveNpc:function(i,j){
		for(var k=0;k<this.npcList.list.length;k++){
			if(this.npcList.list[k].x == j && this.npcList.list[k].y == i){
				return k;
			}
		}
	},
	//对话对象
	Talk:function(str,k){
		this.str = str;
		this.k = k;
		this.str_width = 300;
		this.str_height = 90;
		this.nowStr = "";
		three.ctx.font = "18px SimHei";
		this.moveCount=0;
		this.now = 0;
		this.i = 0;
		this.talkOver = false;
		this.draw = function(){
			var g = three.ctx.createLinearGradient(0,0,this.str_width,this.str_height);
			g.addColorStop(1,'rgba(0,0,0,0.5)');
			three.ctx.fillStyle = g;
			three.ctx.fillRect(three.canvas_width/2-this.str_width/2,three.canvas_height-this.str_height,this.str_width,this.str_height);
			if(this.str[this.now].imgHead){
				three.ctx.drawImage(this.str[this.now].imgHead,0,0,this.str[this.now].imgHead.width,this.str[this.now].imgHead.height,three.canvas_width/2-this.str_width/2,three.canvas_height-this.str_height,this.str[this.now].imgHead.width,this.str[this.now].imgHead.height);
				three.ctx.fillStyle = "white";
				three.ctx.fillText(this.str[this.now].speak,three.canvas_width/2-this.str_width/2+this.str[this.now].imgHead.width+10,three.canvas_height-this.str_height+30);
				three.ctx.fillText(this.nowStr,three.canvas_width/2-this.str_width/2+this.str[this.now].imgHead.width+10,three.canvas_height-this.str_height+60);
			}
			else{
				three.ctx.fillStyle = "white";
				three.ctx.fillText(this.str[this.now].speak,three.canvas_width/2-this.str_width/2+15,three.canvas_height-this.str_height+30);
				three.ctx.fillText(this.nowStr,three.canvas_width/2-this.str_width/2+15,three.canvas_height-this.str_height+60);
			}
		}
		this.move = function(){
			this.moveCount++;
			if(this.moveCount%2==0){
				if(this.i < this.str[this.now].str.length){
					this.nowStr = this.nowStr+this.str[this.now].str[this.i];
					this.i++;
				}
				else{
					this.talkOver = true;
				}
			}
		}
	},
	//改变对话
	changeTalkStr:function(){
		if(this.talk.talkOver){
			if(this.talk.now==(this.talk.str.length-1)){
				this.cur_phase = this.PHASE_SAFERING;
				this.npcList.list[this.talk.k].indexY = this.npcList.list[this.talk.k].firstIndexY;
				return;
			}
			this.talk.now++;
			this.talk.i=0;
			this.talk.nowStr = "";
			this.talk.talkOver = false;
		}
	},
	//引擎
	startEngine:function(){
		setInterval(function(){
			switch(this.cur_phase){
				case this.PHASE_MENU:this.MenuFn();break;							//主选项
				case this.PHASE_SAFERING:this.SaferingFn();break;					//安全区域
				case this.PHASE_TALKING:this.TalkingFn();break;						//聊天模式
				case this.PHASE_FIGHTING:this.FightFn();break;						//战斗区域
				case this.PHASE_BATTLE:this.BattleFn();break;						//战斗模式
				case this.PHASE_DRAWCIRCLE:this.DrawFn();break;						//花园
				case this.PHASE_ACCOUNTS:this.AccountsFn();break;					//胜利
				case this.PHASE_GAMEOVER:this.GameOverFn();break;					//失败
				case this.PHASE_STATE:this.StateFn();break;
			}
		}.bind(this),24);
	},
	//主菜单
	MenuFn:function(){
		this.menu.draw();
		this.menu.move();
	},
	//胜利结算
	AccountsFn:function(){
		this.accounts.draw();
		this.accounts.move();
	},
	GameOverFn:function(){
		this.gameover.draw();
		this.gameover.move();
	},
	//战斗模式
	BattleFn:function(){
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.canvas_width,this.canvas_height);
		this.enemyList.draw();
		this.enemyList.move();
		this.battleHero.draw();
		this.battleHero.move();
		this.select.draw();
		if(this.select.state == 14){
			this.magic.draw();
			this.magic.move();
		}
	},
	//战斗区
	FightFn:function(){
		this.background.draw();
		this.background.move();
		this.protagonist.draw();
		this.protagonist.move();
		var n = Math.random()*3000;
		if(n<10){
			this.circle = new this.CIRCLE();
			this.ctx.font = "18px SimHei";
			this.cur_phase = this.PHASE_DRAWCIRCLE;
		}
	},
	//画圆
	DrawFn:function(){
		this.circle.draw();
		this.circle.move();
	},
	//安全区
	SaferingFn:function(){
		this.background.draw();
		this.background.move();
		this.npcList.draw();
		this.npcList.move();
		this.protagonist.draw();
		this.protagonist.move();
	},
	//查看状态
	StateFn:function(){
		this.background.draw();
		this.background.move();
		this.npcList.draw();
		this.npcList.move();
		this.protagonist.draw();
		this.protagonist.move();
		this.state.draw();
		this.state.move();
	},
	//正在对话函数
	TalkingFn:function(){
		this.background.draw();
		this.background.move();
		this.npcList.draw();
		this.npcList.move();
		this.protagonist.draw();
		this.protagonist.move();
		this.talk.draw();
		this.talk.move();
	},
}
window.onload = function(){
	three.init();
}