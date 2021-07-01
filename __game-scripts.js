var MoveForward=pc.createScript("moveForward");MoveForward.attributes.add("speed",{type:"number",default:.1}),MoveForward.attributes.add("textElement",{type:"entity"}),MoveForward.attributes.add("pathLength",{type:"number",default:45}),MoveForward.attributes.add("dist",{type:"number",default:.25}),MoveForward.prototype.initialize=function(){this.app.timeScale=1,this.app.on("players:startFight",(function(){this.app.off("players:startFight"),this.app.root.findByName("fightCamera").enabled=!0,this.app.root.findByName("mainCamera").enabled=!1,this.app.root.findByName("track").collision.enabled=!0,this.enabled=!1}),this)},MoveForward.prototype.update=function(t){this.entity.translateLocal(0,0,this.speed*t)},MoveForward.prototype.gameOver=function(){this.app.off("players:startFight")};var CrowdManager=pc.createScript("crowdManager");CrowdManager.attributes.add("player",{type:"entity"}),CrowdManager.attributes.add("textElement",{type:"entity"}),CrowdManager.attributes.add("crowdMember",{type:"entity"}),CrowdManager.prototype.initialize=function(){this.entity.collision.on("collisionstart",(function(t){this.joinPlayer()}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("geme:restart",this.gameOver,this)},CrowdManager.prototype.update=function(t){this.player.getPosition().z+.5>=this.entity.getPosition().z&&this.joinPlayer()},CrowdManager.prototype.joinPlayer=function(){var t=this.crowdMember.clone(),e=this.entity.getPosition();this.player.getPosition();t.setPosition(e.x,e.y,e.z),t.enabled=!0,this.app.root.addChild(t),this.app.root.findByName("mainCamera").script.cameraManager.playerCount+=1,this.entity.enabled=!1},CrowdManager.prototype.gameOver=function(){};var ChangeTexture=pc.createScript("changeTexture");ChangeTexture.attributes.add("blue_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_blue",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_blue_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("blue",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("full",{type:"asset",assetType:"texture"}),ChangeTexture.prototype.initialize=function(){console.log(this.entity.element),this.app.on("interface:changeTexture",(function(){var e=null;greenPressed||bluePressed||redPressed?greenPressed||bluePressed||!redPressed?greenPressed||!bluePressed||redPressed?!greenPressed&&bluePressed&&redPressed?e=this.green:!greenPressed||bluePressed||redPressed?greenPressed&&!bluePressed&&redPressed?e=this.blue:greenPressed&&bluePressed&&!redPressed?e=this.red:greenPressed&&bluePressed&&redPressed&&(e=this.full):e=this.blue_red:e=this.green_red:e=this.green_blue:e=this.green_blue_red,null!==e&&(this.entity.element.textureAsset=e)}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},ChangeTexture.prototype.gameOver=function(){this.app.off("interface:changeTexture")},ChangeTexture.prototype.update=function(e){};var GameStart=pc.createScript("gameStart");GameStart.prototype.initialize=function(){this.entity.element.on("touchstart",(function(){this.app.root.findByName("Root").destroy(),this.app.loadSceneHierarchy("1175865.json",(function(t,e){}))}),this),this.app.touch&&this.app.touch.on(pc.EVENT_TOUCHSTART,(function(t){t.event.preventDefault()}),this)},GameStart.prototype.update=function(t){};var start,pos1,pos2,Fight=pc.createScript("fight");Fight.attributes.add("aim",{type:"entity",default:null}),Fight.attributes.add("HP",{type:"number",default:100}),Fight.attributes.add("textElement",{type:"entity"}),Fight.attributes.add("damage",{type:"number",default:5}),Fight.attributes.add("enemyModel",{type:"entity"});var collided=0;Fight.prototype.initialize=function(){this.speed=new pc.Vec3,this.isFighting=!1,this.isMoving=!1,this.timer=0,start=!1,this.entity.rigidbody.linearVelocity=new pc.Vec3(0,0,-.2),this.app.on("players:startFight",(function(){this.enemyModel.animation.play("fightAnimation.glb",3.2333),start=!0,this.entity.rigidbody.type="dynamic"}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},Fight.prototype.update=function(t){if(start){if(this.HP<=0)return 0===this.timer&&this.enemyModel.animation.play("fallAnimation.glb",2.5),this.timer+=t,void(this.timer>2.5&&(this.entity.enabled=!1));if(null!==this.aim&&this.aim.script.defence.HP>0)this.entity.rigidbody.enabled=!1,this.entity.lookAt(this.aim.getPosition()),this.entity.rigidbody.enabled=!0,this.distance(this.aim.getPosition(),this.entity.getPosition())<2?(this.isFighting||(this.enemyModel.animation.play("fightAnimation.glb",3.233),this.isFighting=!0),this.entity.rigidbody.linearVelocity.set(0,0,0),this.aim.script.defence.HP-=this.damage):(this.isMoving||(this.enemyModel.animation.play("fightPrep.glb",.1),this.isMoving=!0),this.speed.copy(this.entity.forward).scale(5),this.entity.rigidbody.linearVelocity=this.speed);else{this.isFighting=!1,this.isMoving=!1;for(var i=this.app.root.findByTag("teamMember"),e=1e5,s=0,a=0;a<i.length;a++)if(i[a].enabled){s++;var n=this.distance(i[a].getPosition(),this.entity.getPosition());n<e&&(e=n,this.aim=i[a])}0===s&&this.app.fire("gameOver"),this.aim.script.defence.enemy=this.entity}}},Fight.prototype.distance=function(t,i){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.z-i.z,2))},Fight.prototype.gameOver=function(){this.app.off("players:startFight")};var start,Defence=pc.createScript("defence");Defence.attributes.add("HP",{type:"number",default:100}),Defence.attributes.add("enemy",{type:"entity",default:null}),Defence.attributes.add("damage",{type:"number",default:5}),Defence.attributes.add("teamMemberModel",{type:"entity"}),Defence.prototype.initialize=function(){start=!1,this.speed=new pc.Vec3,this.isFighting=!1,this.isMoving=!1,this.app.on("players:startFight",(function(){this.teamMemberModel.animation.play("fightPrep.glb",60),start=!0,this.entity.rigidbody.type="dynamic",this.entity.collision.halfExtents.set(.5,.5,.5)}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},Defence.prototype.distance=function(t,i){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.z-i.z,2))},Defence.prototype.update=function(t){if(start){if(this.HP<=0)return 0===this.timer&&this.teamMemberModel.animation.play("fallAnimation.glb",2.5),this.timer+=t,void(this.timer>2.5&&(this.entity.enabled=!1));if(null!==this.enemy&&this.enemy.script.fight.HP>0)this.entity.rigidbody.enabled=!1,this.entity.lookAt(this.enemy.getPosition()),this.entity.rigidbody.enabled=!0,this.distance(this.enemy.getPosition(),this.entity.getPosition())<2?(this.isFighting||(this.entity.rigidbody.type="static",this.teamMemberModel.animation.play("fightAnimation.glb",3.233),this.isFighting=!0),this.entity.rigidbody.linearVelocity.set(0,0,0),this.enemy.script.fight.HP-=this.damage):(this.isMoving||(this.teamMemberModel.animation.play("fightPrep.glb",3.3),this.isMoving=!0),this.speed.copy(this.entity.forward).scale(5),this.entity.rigidbody.linearVelocity=this.speed);else{this.entity.rigidbody.type="dynamic",this.isFighting=!1,this.isMoving=!1;for(var i=1e4,e=this.app.root.findByTag("fightMember"),s=0,n=0;n<e.length;n++)if(e[n].enabled){s++;var a=this.distance(e[n].getPosition(),this.entity.getPosition());i>a&&(i=a,this.enemy=e[n])}0===s&&this.app.fire("gameWin")}}},Defence.prototype.gameOver=function(){this.app.off("players:startFight")};var start,speed,CrowdMove=pc.createScript("crowdMove");CrowdMove.prototype.initialize=function(){start=!1,speed=this.app.root.findByName("Player").script.moveForward.speed,this.app.on("players:startFight",(function(){start=!0,this.enabled=!1}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},CrowdMove.prototype.update=function(t){start||this.entity.translateLocal(0,0,speed*t)},CrowdMove.prototype.gameOver=function(){this.app.off("players:startFight")};var direction,MovingWall=pc.createScript("movingWall");MovingWall.attributes.add("speed",{type:"number",default:5}),MovingWall.attributes.add("leftCoord",{type:"number",default:-3}),MovingWall.attributes.add("rightCoord",{type:"number",default:3});var endGame=!1;MovingWall.prototype.initialize=function(){this.leftSpeed=-this.speed,this.rightSpeed=this.speed,this.app.on("gameOver",(function(){endGame=!0}),this),this.app.on("gameWin",(function(){endGame=!0}),this),this.app.on("game:restart",(function(){endGame=!0}),this)},MovingWall.prototype.update=function(t){this.entity.rigidbody.enabled=!1,this.entity.translate(this.speed*t,0,0),this.entity.rigidbody.enabled=!0,this.entity.getPosition().x>=this.rightCoord&&(this.speed=this.leftSpeed),this.entity.getPosition().x<=this.leftCoord&&(this.speed=this.rightSpeed)};var CameraManager=pc.createScript("cameraManager");CameraManager.attributes.add("speed",{type:"number",default:10}),CameraManager.attributes.add("playerCount",{type:"number",default:1}),CameraManager.attributes.add("textElement",{type:"entity"}),CameraManager.attributes.add("endLine",{type:"number"}),CameraManager.prototype.initialize=function(){},CameraManager.prototype.update=function(e){0===this.playerCount&&this.app.fire("gameOver"),this.entity.translate(0,0,this.speed*e),this.entity.getPosition().z>this.endLine&&this.app.fire("players:startFight")};var currentCamera,fightStart,GameManager=pc.createScript("gameManager");GameManager.attributes.add("fightCamera",{type:"entity"}),GameManager.attributes.add("mainCamera",{type:"entity"}),GameManager.prototype.initialize=function(){currentCamera=this.mainCamera,fightStart=!1,this.app.on("gameOver",(function(){this.app.timeScale=0,this.app.off("players:startFight"),this.app.off("touchstart"),currentCamera.findByName("LooseInterface").enabled=!0,fightStart||(currentCamera.findByName("ColorInterface").enabled=!1)}),this),this.app.on("gameWin",(function(){for(var a=this.app.root.findByTag("teamMember"),t=0;t<a.length;t++)a[t].destroy();this.app.off("gameWin"),this.app.timeScale=0,this.app.off("players:startFight"),this.app.off("touchstart"),currentCamera.findByName("WinInterface").enabled=!0,fightStart||(currentCamera.findByName("ColorInterface").enabled=!1)}),this),this.app.on("players:startFight",(function(){currentCamera=this.fightCamera,fightStart=!0,this.app.root.findByName("fightCamera").enabled=!0,this.app.root.findByName("mainCamera").enabled=!1,this.app.root.findByName("track").collision.enabled=!0}),this)},GameManager.prototype.update=function(a){};var endGame,RotatingObstacle=pc.createScript("rotatingObstacle");RotatingObstacle.attributes.add("rotateSpeed",{type:"number",default:10}),RotatingObstacle.attributes.add("material",{type:"asset",assetType:"material"}),RotatingObstacle.prototype.initialize=function(){endGame=!1;for(var t=this.entity.findByTag("blade"),e=0;e<t.length;e++)t[e].model.meshInstances[0].material=this.material.resource,t[e].rigidbody.type="kinematic";this.app.on("gameOver",(function(){endGame=!0}),this),this.app.on("gameWin",(function(){endGame=!0}),this),this.app.on("game:restart",(function(){endGame=!0}),this)},RotatingObstacle.prototype.update=function(t){endGame||this.entity.rotateLocal(0,this.rotateSpeed,0)};var Obstacle=pc.createScript("obstacle");Obstacle.prototype.initialize=function(){this.entity.collision.on("collisionstart",(function(e){e.other.model.meshInstances[0].material.name!==this.entity.model.meshInstances[0].material.name&&e.other.tags.has("teamMember")?(e.other.enabled=!1,this.app.root.findByName("mainCamera").script.cameraManager.playerCount-=1):e.other.model.meshInstances[0].material.name===this.entity.model.meshInstances[0].material.name&&e.other.tags.has("teamMember")&&this.entity.destroy()}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},Obstacle.prototype.update=function(e){},Obstacle.prototype.gameOver=function(){};var ColorManager=pc.createScript("colorManager");ColorManager.attributes.add("mainCamera",{type:"entity"}),ColorManager.attributes.add("crowdManagerModel",{type:"entity"}),ColorManager.attributes.add("player",{type:"entity"}),ColorManager.attributes.add("blueButton",{type:"entity"}),ColorManager.attributes.add("greenButton",{type:"entity"}),ColorManager.attributes.add("redButton",{type:"entity"}),ColorManager.attributes.add("redMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("greenMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("blueMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("pinkMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("yellowMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("cyanMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("blackMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("textElement",{type:"entity"});var bluePressed=!1,redPressed=!1,greenPressed=!1,endGame=!1;ColorManager.prototype.recolor=function(e){"blue"===e&&(this.player.model.meshInstances[0].material=this.blueMaterial.resource),"red"===e&&(this.player.model.meshInstances[0].material=this.redMaterial.resource),"green"===e&&(this.player.model.meshInstances[0].material=this.greenMaterial.resource)},ColorManager.prototype.initialize=function(){const e=this.app.graphicsDevice.canvas.clientWidth/375,t=this.app.graphicsDevice.canvas.clientHeight/635,r=107*e,s=160*e,a=482*t,i=520*t,n=164*e,d=213*e,o=560*t,l=612*t,p=214*e,h=290*e,u=482*t,c=512*t;this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this),endGame=!1,this.blueButton.element.on("touchstart",(function(){bluePressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.greenButton.element.on("touchstart",(function(){greenPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.redButton.element.on("touchstart",(function(){redPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,(function(e){e.event.preventDefault()}),this),this.app.touch.on(pc.EVENT_TOUCHMOVE,(function(e){if(!(e.touches.length>1)){var t=e.touches[0].x,g=e.touches[0].y;t>r&&t<s&&g<i&&g>a?(greenPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)):t>n&&t<d&&g<l&&g>o?(redPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)):t>p&&t<h&&g<c&&g>u&&(bluePressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)),e.event.preventDefault()}}),this),this.app.touch.on(pc.EVENT_TOUCHEND,(function(){if(!endGame){var e=null;if(!(event.touches.length>1)){bluePressed||redPressed||!greenPressed?bluePressed||!redPressed||greenPressed?!bluePressed||redPressed||greenPressed?bluePressed&&redPressed&&!greenPressed?e=this.pinkMaterial:!bluePressed&&redPressed&&greenPressed?e=this.yellowMaterial:bluePressed&&!redPressed&&greenPressed?e=this.cyanMaterial:bluePressed&&redPressed&&greenPressed&&(e=this.blackMaterial):e=this.blueMaterial:e=this.redMaterial:e=this.greenMaterial,null!==e&&(this.player.model.meshInstances[0].material=e.resource);for(var t=this.app.root.findByTag("crowdMembers"),r=0;r<t.length;r++)null!==e&&(t[r].model.meshInstances[0].material=e.resource);null!==e&&this.app.fire("model:changeColor",e),bluePressed=!1,redPressed=!1,greenPressed=!1,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed),null!==e&&(this.crowdManagerModel.model.meshInstances[0].material=e.resource)}}}),this))},ColorManager.prototype.update=function(e){},ColorManager.prototype.gameOver=function(){this.app.touch&&(this.app.off("touchstart"),this.app.off("touchend"),this.app.touch.off(pc.EVENT_TOUCHSTART),this.app.touch.off(pc.EVENT_TOUCHEND),this.app.touch.off(pc.EVENT_TOUCHMOVE))};var LevelSwitchButton=pc.createScript("levelSwitchButton");LevelSwitchButton.attributes.add("sceneID",{type:"string"}),LevelSwitchButton.prototype.initialize=function(){this.timer=0,this.initTime=null,this.endTime=null,this.entity.element.on("touchend",(function(){this.entity.element.off("touchend"),this.initTime=this.timer,this.endTime=this.timer+.1}),this),this.app.touch&&this.app.touch.on(pc.EVENT_TOUCHSTART,(function(t){t.event.preventDefault()}),this)},LevelSwitchButton.prototype.update=function(t){(this.timer+=.01,null!==this.initTime&&null!==this.endTime)&&(this.timer>this.endTime&&(this.app.root.findByName("Root").destroy(),this.app.scenes.loadSceneHierarchy(this.sceneID+".json",(function(t,e){t&&console.log(t)}))))};var DebugScript=pc.createScript("debugScript");DebugScript.prototype.initialize=function(){},DebugScript.prototype.update=function(t){};var ChangeModelColor=pc.createScript("changeModelColor");ChangeModelColor.prototype.initialize=function(){this.app.on("model:changeColor",(function(e){null!==e&&(this.entity.model.meshInstances[0].material=e.resource)}),this),this.app.on("players:startFight",(function(){this.entity.rotate(0,180,0)}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},ChangeModelColor.prototype.update=function(e){},ChangeModelColor.prototype.gameOver=function(){this.app.off("model:changeColor")};var RestartPrep=pc.createScript("restartPrep");RestartPrep.prototype.initialize=function(){},RestartPrep.prototype.update=function(t){this.entity.element.on("touchstart",(function(){for(var t=this.app.root.findByTag("teamMember"),e=0;e<t.length;e++)t[e].destroy();this.app.timeScale=0,this.app.fire("game:restart")}),this)};var ShareButtonScript=pc.createScript("shareButtonScript");ShareButtonScript.attributes.add("link",{type:"string",default:"https://vk.com/app6909581#hello"}),ShareButtonScript.prototype.initialize=function(){this.entity.element.on("touchstart",(function(){vkBridge.send("VKWebAppShare", {"link": "https://vk.com/app6909581#hello"});console.log("pressed1")}),this)},ShareButtonScript.prototype.gameOver=function(){},ShareButtonScript.prototype.update=function(t){};var InviteButtonScript=pc.createScript("inviteButtonScript");InviteButtonScript.prototype.initialize=function(){this.entity.element.on("touchstart",(function(){}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},InviteButtonScript.prototype.gameOver=function(){},InviteButtonScript.prototype.update=function(t){};var RatingButtonScript=pc.createScript("ratingButtonScript");RatingButtonScript.prototype.initialize=function(){this.entity.element.on("touchstart",(function(){}),this),this.app.on("gameOver",this.gameOver,this),this.app.on("gameWin",this.gameOver,this),this.app.on("game:restart",this.gameOver,this)},RatingButtonScript.prototype.gameOver=function(){},RatingButtonScript.prototype.update=function(t){};var FallDown=pc.createScript("fallDown");FallDown.attributes.add("ownModel",{type:"entity"}),FallDown.prototype.initialize=function(){},FallDown.prototype.destroy=function(){},FallDown.prototype.update=function(t){};
