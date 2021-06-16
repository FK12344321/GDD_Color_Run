var MoveForward=pc.createScript("moveForward");MoveForward.attributes.add("speed",{type:"number",default:.1}),MoveForward.attributes.add("textElement",{type:"entity"}),MoveForward.attributes.add("pathLength",{type:"number",default:45}),MoveForward.attributes.add("dist",{type:"number",default:.25}),MoveForward.prototype.initialize=function(){this.app.on("players:startFight",(function(){this.app.root.findByName("fightCamera").enabled=!0,this.app.root.findByName("mainCamera").enabled=!1}),this)},MoveForward.prototype.update=function(t){this.entity.getPosition().z>=this.pathLength?(this.app.fire("players:startFight"),this.app.root.findByName("track").collision.enabled=!0,this.enabled=!1):this.entity.translateLocal(0,0,this.speed*t)};var ColorManager=pc.createScript("colorManager");ColorManager.attributes.add("mainCamera",{type:"entity"}),ColorManager.attributes.add("player",{type:"entity"}),ColorManager.attributes.add("blueButton",{type:"entity"}),ColorManager.attributes.add("greenButton",{type:"entity"}),ColorManager.attributes.add("redButton",{type:"entity"}),ColorManager.attributes.add("redMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("greenMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("blueMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("pinkMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("yellowMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("cyanMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("blackMaterial",{type:"asset",assetType:"material"}),ColorManager.attributes.add("textElement",{type:"entity"});var bluePressed=!1,redPressed=!1,greenPressed=!1;ColorManager.prototype.recolor=function(e){"blue"===e&&(this.player.model.meshInstances[0].material=this.blueMaterial.resource),"red"===e&&(this.player.model.meshInstances[0].material=this.redMaterial.resource),"green"===e&&(this.player.model.meshInstances[0].material=this.greenMaterial.resource)},ColorManager.prototype.initialize=function(){const e=this.app.graphicsDevice.canvas.clientWidth/375,r=this.app.graphicsDevice.canvas.clientHeight/635,t=107*e,s=160*e,a=482*r,n=520*r,i=164*e,d=213*e,l=560*r,o=612*r,u=214*e,p=270*e,h=482*r,c=512*r;this.blueButton.element.on("touchstart",(function(){bluePressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.greenButton.element.on("touchstart",(function(){greenPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.redButton.element.on("touchstart",(function(){redPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}),this),this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,(function(e){e.event.preventDefault()}),this),this.app.touch.on(pc.EVENT_TOUCHMOVE,(function(e){if(!(e.touches.length>1)){var r=e.touches[0].x,g=e.touches[0].y;r>t&&r<s&&g<n&&g>a?(greenPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)):r>i&&r<d&&g<o&&g>l?(redPressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)):r>u&&r<p&&g<c&&g>h&&(bluePressed=!0,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)),e.event.preventDefault()}}),this),this.app.touch.on(pc.EVENT_TOUCHEND,(function(){var e=null;if(!(event.touches.length>1)){bluePressed||redPressed||!greenPressed?bluePressed||!redPressed||greenPressed?!bluePressed||redPressed||greenPressed?bluePressed&&redPressed&&!greenPressed?e=this.pinkMaterial:!bluePressed&&redPressed&&greenPressed?e=this.yellowMaterial:bluePressed&&!redPressed&&greenPressed?e=this.cyanMaterial:bluePressed&&redPressed&&greenPressed&&(e=this.blackMaterial):e=this.blueMaterial:e=this.redMaterial:e=this.greenMaterial,null!==e&&(this.player.model.meshInstances[0].material=e.resource);for(var r=this.app.root.findByTag("crowdMembers"),t=0;t<r.length;t++)null!==e&&(r[t].model.meshInstances[0].material=e.resource);bluePressed=!1,redPressed=!1,greenPressed=!1,this.app.fire("interface:changeTexture",redPressed,bluePressed,greenPressed)}}),this))},ColorManager.prototype.update=function(e){};var CrowdManager=pc.createScript("crowdManager");CrowdManager.attributes.add("player",{type:"entity"}),CrowdManager.attributes.add("textElement",{type:"entity"}),CrowdManager.attributes.add("crowdMember",{type:"entity"}),CrowdManager.prototype.initialize=function(){this.entity.collision.on("collisionstart",(function(t){var e=this.crowdMember.clone(),i=this.entity.getPosition();this.player.getPosition();e.setPosition(i.x,i.y,i.z),e.enabled=!0,this.app.root.addChild(e),this.entity.enabled=!1}),this)},CrowdManager.prototype.update=function(t){};var ChangeTexture=pc.createScript("changeTexture");ChangeTexture.attributes.add("blue_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_blue",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green_blue_red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("red",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("green",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("blue",{type:"asset",assetType:"texture"}),ChangeTexture.attributes.add("full",{type:"asset",assetType:"texture"}),ChangeTexture.prototype.initialize=function(){this.app.on("interface:changeTexture",(function(){var e;greenPressed||bluePressed||redPressed?greenPressed||bluePressed||!redPressed?greenPressed||!bluePressed||redPressed?!greenPressed&&bluePressed&&redPressed?e=this.green:!greenPressed||bluePressed||redPressed?greenPressed&&!bluePressed&&redPressed?e=this.blue:greenPressed&&bluePressed&&!redPressed?e=this.red:greenPressed&&bluePressed&&redPressed&&(e=this.full):e=this.blue_red:e=this.green_red:e=this.green_blue:e=this.green_blue_red,this.entity.element.textureAsset=e}),this)},ChangeTexture.prototype.update=function(e){};var GameStart=pc.createScript("gameStart");GameStart.prototype.initialize=function(){this.entity.element.on("touchstart",(function(){this.app.root.findByName("Root").destroy(),this.app.loadSceneHierarchy("1175865.json",(function(t,e){}))}),this),this.app.touch&&this.app.touch.on(pc.EVENT_TOUCHSTART,(function(t){t.event.preventDefault()}),this)},GameStart.prototype.update=function(t){};var start,pos1,pos2,Fight=pc.createScript("fight");Fight.attributes.add("aim",{type:"entity",default:null}),Fight.attributes.add("HP",{type:"number",default:100}),Fight.attributes.add("textElement",{type:"entity"});var collided=0;Fight.prototype.initialize=function(){this.speed=new pc.Vec3,start=!1,this.entity.rigidbody.linearVelocity=new pc.Vec3(0,0,-.2),this.app.on("players:startFight",(function(){start=!0,this.entity.rigidbody.type="dynamic"}),this)},Fight.prototype.update=function(t){if(null!==this.aim&&console.log(this.aim.enabled),start)if(this.HP<=0&&(this.entity.enabled=!1),null!==this.aim&&this.aim.enabled)this.entity.rigidbody.enabled=!1,this.entity.lookAt(this.aim.getPosition()),this.entity.rigidbody.enabled=!0,this.distance(this.aim.getPosition(),this.entity.getPosition())<2?(this.entity.rigidbody.linearVelocity.set(0,0,0),this.aim.script.defence.HP-=10):(this.speed.copy(this.entity.forward).scale(5),this.entity.rigidbody.linearVelocity=this.speed);else{for(var i=this.app.root.findByTag("teamMember"),e=1e5,s=0;s<i.length;s++)if(i[s].enabled){var n=this.distance(i[s].getPosition(),this.entity.getPosition());n<e&&(e=n,this.aim=i[s])}this.aim.script.defence.enemy=this.entity}},Fight.prototype.distance=function(t,i){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.z-i.z,2))};var start,Defence=pc.createScript("defence");Defence.attributes.add("HP",{type:"number",default:100}),Defence.attributes.add("enemy",{type:"entity",default:null}),Defence.prototype.initialize=function(){start=!1,this.app.on("players:startFight",(function(){start=!0,this.entity.rigidbody.type="static"}),this)},Defence.prototype.distance=function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.z-e.z,2))},Defence.prototype.update=function(t){if(start)if(this.HP<=0&&(this.entity.enabled=!1),null!==this.enemy&&this.enemy.enabled)this.entity.rigidbody.enabled=!1,this.entity.lookAt(this.enemy.getPosition()),this.entity.rigidbody.enabled=!0,this.distance(this.enemy.getPosition(),this.entity.getPosition())<2&&(this.enemy.script.fight.HP-=5);else for(var e=1e4,i=this.app.root.findByTag("fightMember"),n=0;n<i.length;n++)if(i[n].enabled){var s=this.distance(i[n].getPosition(),this.entity.getPosition());e>s&&(e=s,this.enemy=i[n])}};var start,speed,CrowdMove=pc.createScript("crowdMove");CrowdMove.prototype.initialize=function(){start=!1,speed=this.app.root.findByName("Player").script.moveForward.speed,this.app.on("players:startFight",(function(){start=!0}),this)},CrowdMove.prototype.update=function(t){start||this.entity.translateLocal(0,0,speed*t)};