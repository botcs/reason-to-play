// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var er=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},u=new er,Fe=class zw{constructor(e,t,r,i){this.x=e,this.y=t,this.w=r,this.h=i}static fromPosSize(e,t){return new zw(e[0],e[1],t[0],t[1])}get left(){return this.x}set left(e){this.x=e}get top(){return this.y}set top(e){this.y=e}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(e,t){return typeof e=="object"&&e!==null?new zw(this.x+e.x,this.y+e.y,this.w,this.h):new zw(this.x+e,this.y+t,this.w,this.h)}copy(){return new zw(this.x,this.y,this.w,this.h)}colliderect(e){return this.x<e.x+e.w&&this.x+this.w>e.x&&this.y<e.y+e.h&&this.y+this.h>e.y}collidelistall(e){let t=[];for(let r=0;r<e.length;r++)this.colliderect(e[r].rect||e[r])&&t.push(r);return t}contains(e){return e.x>=this.x&&e.y>=this.y&&e.x+e.w<=this.x+this.w&&e.y+e.h<=this.y+this.h}equals(e){return this.x===e.x&&this.y===e.y&&this.w===e.w&&this.h===e.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}},A=class Jt{constructor(...e){this.keys=Object.freeze([...e].sort())}asVector(){let e=0,t=0;for(let r of this.keys)r==="LEFT"&&(e-=1),r==="RIGHT"&&(e+=1),r==="UP"&&(t-=1),r==="DOWN"&&(t+=1);return{x:e,y:t}}equals(e){if(!(e instanceof Jt)||this.keys.length!==e.keys.length)return!1;for(let t=0;t<this.keys.length;t++)if(this.keys[t]!==e.keys[t])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},Ue={NOOP:new A,UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),SPACE:new A("SPACE"),SPACE_RIGHT:new A("SPACE","RIGHT"),SPACE_LEFT:new A("SPACE","LEFT")},tr=Ue.NOOP,Ke=[129,199,132],me=[25,118,210],de=[211,47,47],ze=[69,90,100],fe=[250,250,250],rr=[109,76,65],qe=[55,71,79],je=[230,81,0],ir=[255,245,157],sr=[255,138,128],or=[255,196,0],lr=[255,82,82],ar=[255,112,67],nr=[144,202,249],cr=[185,246,202],hr=[207,216,220],ur=[68,90,100],pr=[1,87,155],mr=[92,107,192],dr=[200,150,220],fr=[255,230,230],We={GREEN:Ke,BLUE:me,RED:de,GRAY:ze,WHITE:fe,BROWN:rr,BLACK:qe,ORANGE:je,YELLOW:ir,PINK:sr,GOLD:or,LIGHTRED:lr,LIGHTORANGE:ar,LIGHTBLUE:nr,LIGHTGREEN:cr,LIGHTGRAY:hr,DARKGRAY:ur,DARKBLUE:pr,PURPLE:mr,LIGHTPURPLE:dr,LIGHTPINK:fr},Qe={x:0,y:-1},Ye={x:0,y:1},ge={x:-1,y:0},uw={x:1,y:0},kw=[Qe,ge,Ye,uw];function ve(w,e){return w.x===e.x&&w.y===e.y}function gr(w){return Math.sqrt(w.x*w.x+w.y*w.y)}function tw(w){let e=gr(w);return e>0?{x:w.x/e,y:w.y/e}:{x:1,y:0}}var Ve=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let r;if(e.asVector?r=e.asVector():r=e,ve(r,{x:0,y:0}))return;w._updatePosition(r,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}},vr=We,T=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:r,size:i=[1,1],color:s,speed:o,cooldown:l,physicstype:c,rng:a,img:n,resources:h,...d}=w;this.key=e,this.id=t;let p=Array.isArray(i)?i:[i,i];this.rect=new Fe(r[0],r[1],p[0],p[1]),this.lastrect=this.rect,this.alive=!0;let y=c||this.constructor.physicstype||Ve;if(this.physics=new y(p),this.speed=o??this.constructor.speed,this.cooldown=l??this.constructor.cooldown,this.img=n||null,this.color=s||this.constructor.color,this.img&&this.img.startsWith("colors/")){let b=this.img.split("/")[1],g=vr[b];g&&(this.color=g)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(h?{...h}:{},{get(b,g){return typeof g=="string"&&!(g in b)&&g!=="toJSON"&&g!=="then"&&g!==Symbol.toPrimitive&&g!==Symbol.toStringTag&&g!=="inspect"&&g!=="constructor"&&g!=="__proto__"?0:b[g]},set(b,g,k){return b[g]=k,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[b,g]of Object.entries(d))this[b]=g}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,r;if(e==null){let i=this.speed||0;t=w.x*i,r=w.y*i}else t=w.x*e,r=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:r}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},_w=class extends T{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},yr=class extends T{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}},Sr=class extends T{static color=ze;static is_static=!0},br=class extends T{static color=de},kr=class extends _w{static is_static=!0},Xe=class extends T{static color=de;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},qw=class extends T{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||uw)}},Je=class extends qw{static speed=1},Ze=class extends qw{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};Ze.limit=1;var ye=class extends T{static stype=null},_r=class extends ye{static is_static=!0;static is_stochastic=!0;static color=me},Se=class extends ye{static color=qe;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},wt=class extends T{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=kw[Math.floor(w.randomGenerator.random()*kw.length)];this.physics.activeMovement(this,e)}},et=class extends wt{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],r=w.getSprites(this.stype);for(let i of r){let s=this.physics.distance(this.rect,i.rect);s<e?(e=s,t=[i]):s===e&&t.push(i)}return t}_movesToward(w,e){let t=[],r=this.physics.distance(this.rect,e.rect);for(let i of kw){let s=this.rect.move(i),o=this.physics.distance(s,e.rect);this.fleeing&&r<o&&t.push(i),!this.fleeing&&r>o&&t.push(i)}return t}update(w){T.prototype.update.call(this,w);let e=[];for(let r of this._closestTargets(w))e.push(...this._movesToward(w,r));e.length===0&&(e=[...kw]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},Er=class extends et{constructor(w){super({...w,fleeing:!0})}},xr=class extends Se{static color=je;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||uw),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),Se.prototype.update.call(this,w)}},Ar=class extends Je{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let e;this.orientation.x>0?e=1:this.orientation.x<0?e=-1:e=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:e,y:0})}super.update(w)}},Or=class extends qw{static is_static=!0;static color=me;static strength=1;static draw_arrow=!0},Ir=class Zt extends Xe{static spreadprob=1;update(e){if(super.update(e),this._age===2)for(let t of kw)e.randomGenerator.random()<(this.spreadprob||Zt.spreadprob)&&e.addSpriteCreation(this.name,[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h])}};function jw(w,e){let t=[...e.active_keys].sort();for(let r=Math.max(3,t.length);r>=0;r--)for(let i of Lr(t,r)){let s=i.join(",");if(w._keysToAction.has(s))return w._keysToAction.get(s)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Lr(w,e){if(e===0)return[[]];if(w.length===0)return[];let t=[];function r(i,s){if(s.length===e){t.push([...s]);return}for(let o=i;o<w.length;o++)s.push(w[o]),r(o+1,s),s.pop()}return r(0,[]),t}function tt(w){let e=new Map;for(let t of Object.values(w)){let r=[...t.keys].sort().join(",");e.set(r,t)}return e}var rt=class extends T{static color=fe;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=tt(e)}static declarePossibleActions(){return{UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){T.prototype.update.call(this,w);let e=jw(this,w);e.equals(tr)||this.physics.activeMovement(this,e)}},Ww=class extends T{static color=fe;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||uw);let e=this.constructor.declarePossibleActions();this._keysToAction=tt(e)}static declarePossibleActions(){return{UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){let e=this.orientation;this.orientation={x:0,y:0},T.prototype.update.call(this,w);let t=jw(this,w);t&&this.physics.activeMovement(this,t);let r=this.lastdirection;Math.abs(r.x)+Math.abs(r.y)!==0?this.orientation=r:this.orientation=e}},Mr=class extends Ww{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=Ww.declarePossibleActions();return w.SPACE=new A("SPACE"),w}update(w){Ww.prototype.update.call(this,w);let e=jw(this,w);this._hasAmmo()&&e.equals(Ue.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let r=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],i=w.createSprite(this.stype,r);i&&i.orientation!==void 0&&(i.orientation=t)}this._spendAmmo()}_shootDirections(w){return[tw(this.orientation)]}},Qw=class extends rt{static declarePossibleActions(){return{LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){T.prototype.update.call(this,w);let e=jw(this,w),t=e.asVector();(ve(t,uw)||ve(t,ge))&&this.physics.activeMovement(this,e)}},Rr=class extends Qw{static color=Ke;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=Qw.declarePossibleActions();return w.SPACE=new A("SPACE"),w}update(w){Qw.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function rw(w,e,t){t.killSprite(w)}function Tr(w,e,t){t.killSprite(w),t.killSprite(e)}function Cr(w,e,t){t.addSpriteCreation(w.key,[w.rect.x,w.rect.y])}function Ew(w,e,t,{stype:r="wall"}={}){let i=w.lastrect;t.killSprite(w);let s=t.addSpriteCreation(r,w.rect.topleft);s!=null&&(s.lastrect=i,w.orientation!==void 0&&s.orientation!==void 0&&(s.orientation=w.orientation))}function Gr(w,e,t,{resource:r,limit:i=1,no_symmetry:s=!1,exhaustStype:o=null}={}){w.resources[r]<i?Yw(w,e,t,{no_symmetry:s}):o?t.kill_list.includes(e)||Ew(e,w,t,{stype:o}):rw(e,w,t)}function Yw(w,e,t,{no_symmetry:r=!1}={}){!t.kill_list.includes(e)&&!t.kill_list.includes(w)&&(w.rect.equals(w.lastrect)&&!r?(e.rect=e.lastrect,be(e,0)):(w.rect=w.lastrect,be(w,0)))}function be(w,e){e>5||w.just_pushed&&(w.just_pushed.rect=w.just_pushed.lastrect,be(w.just_pushed,e+1))}function Br(w,e,t){for(let r of t.sprite_registry.sprites())r.rect=r.lastrect}function ke(w,e){return w.just_pushed&&e<3?ke(w.just_pushed,e+1):w.lastdirection}function Nr(w,e,t){let r=ke(e,0);Math.abs(r.x)+Math.abs(r.y)===0?(r=ke(w,0),e.physics.activeMovement(e,tw(r)),e.just_pushed=w):(w.physics.activeMovement(w,tw(r)),w.just_pushed=e)}function Pr(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=w.lastdirection;if(Math.abs(i.x)+Math.abs(i.y)===0)return;let s=tw(i),o=w.rect.width,l=w.rect.copy();l.x+=Math.round(s.x)*o,l.y+=Math.round(s.y)*o,!(l.x<0||l.y<0||l.x+l.width>t.screensize[0]||l.y+l.height>t.screensize[1])&&(w.rect=l,w.lastmove=0,r&&Ew(e,w,t,{stype:r}))}function it(w,e,t,{with_step_back:r=!0}={}){r&&(w.rect=w.lastrect),w.orientation!==void 0&&(w.orientation={x:-w.orientation.x,y:-w.orientation.y})}function $r(w,e,t){w.rect=w.lastrect,w.lastmove=w.cooldown,w.physics.activeMovement(w,{x:0,y:1},1),it(w,e,t,{with_step_back:!1})}function Hr(w,e,t){let r=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];w.orientation=r[Math.floor(t.randomGenerator.random()*r.length)]}function Dr(w,e,t,{offset:r=0}={}){w.rect.top<0?w.rect.top=t.screensize[1]-w.rect.height:w.rect.top+w.rect.height>t.screensize[1]&&(w.rect.top=0),w.rect.left<0?w.rect.left=t.screensize[0]-w.rect.width:w.rect.left+w.rect.width>t.screensize[0]&&(w.rect.left=0),w.lastmove=0}function Fr(w,e,t){if(!(w instanceof _w))throw new Error(`collectResource: sprite must be a Resource, got ${w.constructor.name}`);let r=w.resource_type,i=t.domain.resources_limits&&t.domain.resources_limits[r]||1/0;e.resources[r]=Math.max(0,Math.min(e.resources[r]+w.value,i))}function Ur(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([w,r,i])}function Kr(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function zr(w,e,t,{resource:r,value:i=-1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function qr(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]>=i&&rw(w,e,t)}function jr(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]>=i&&rw(w,e,t)}function Wr(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]<=i&&rw(w,e,t)}function Qr(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]<=i&&rw(w,e,t)}function Yr(w,e,t,{resource:r,stype:i,limit:s=1}={}){w.resources[r]>=s&&t.addSpriteCreation(i,[w.rect.x,w.rect.y])}function Vr(w,e,t){t.kill_list.includes(e)||rw(w,e,t)}function Xr(w,e,t){let r=w.lastrect,i=tw(e.orientation);w.physics.activeMovement(w,i,e.strength||1),w.lastrect=r}function Jr(w,e,t){if(!st(w,t,"t_lastpull"))return;let r=w.lastrect,i=e.lastdirection,s=Math.abs(i.x)+Math.abs(i.y)>0?tw(i):{x:1,y:0};w._updatePosition(s,(e.speed||1)*w.physics.gridsize[0]),w.lastrect=r}function Zr(w,e,t){let r=t.sprite_registry.withStype(e.stype||e.key);if(r.length>0){let i=r[Math.floor(t.randomGenerator.random()*r.length)];w.rect=i.rect.copy()}w.lastmove=0}function wi(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=t.sprite_registry.group(e.key).filter(o=>o!==e);if(i.length===0)return;let s=i[Math.floor(t.randomGenerator.random()*i.length)];w.rect=s.rect.copy(),w.lastrect=s.rect.copy(),w.lastmove=0,r&&(Ew(e,w,t,{stype:r}),Ew(s,w,t,{stype:r}))}function ei(w,e,t,{friction:r=0}={}){st(w,t,"t_lastbounce")&&(w.speed!==null&&(w.speed*=1-r),Yw(w,e,t),w.orientation!==void 0&&(Math.abs(w.rect.centerx-e.rect.centerx)>Math.abs(w.rect.centery-e.rect.centery)?w.orientation={x:-w.orientation.x,y:w.orientation.y}:w.orientation={x:w.orientation.x,y:-w.orientation.y}))}function ti(w,e,t,{friction:r=0}={}){if(Yw(w,e,t),w.orientation!==void 0){let i=w.orientation,s=tw({x:-w.rect.centerx+e.rect.centerx,y:-w.rect.centery+e.rect.centery}),o=s.x*i.x+s.y*i.y;w.orientation={x:-2*o*s.x+i.x,y:-2*o*s.y+i.y},w.speed!==null&&(w.speed*=1-r)}}function st(w,e,t){return t in w._effect_data&&w._effect_data[t]===e.time?!1:(w._effect_data[t]=e.time,!0)}var Vw=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},ri=class extends Vw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},ii=class extends Vw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},si=class extends Vw{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:r=0,...i}=w;super({win:e,scoreChange:t}),this.limit=r,this.stypes=[];for(let[s,o]of Object.entries(i))s.startsWith("stype")&&this.stypes.push(o)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},oi=class extends Vw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}},li=class wr{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(e){this.singletons.push(e)}isSingleton(e){return this.singletons.includes(e)}registerSpriteClass(e,t,r,i){if(e in this.classes)throw new Error(`Sprite key already registered: ${e}`);if(t==null)throw new Error(`Cannot register null class for key: ${e}`);this.classes[e]=t,this.classArgs[e]=r,this.stypes[e]=i,this.spriteKeys.push(e)}getSpriteDef(e){if(!(e in this.classes))throw new Error(`Unknown sprite type '${e}', verify your domain file`);return{cls:this.classes[e],args:this.classArgs[e],stypes:this.stypes[e]}}*getSpriteDefs(){for(let e of this.spriteKeys)yield[e,this.getSpriteDef(e)]}_generateIdNumber(e){let t=(this._liveSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),r=(this._deadSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),i=t.concat(r);return i.length>0?Math.max(...i)+1:1}generateId(e){let t=this._generateIdNumber(e);return`${e}.${t}`}createSprite(e,t){if(this.isSingleton(e)&&(this._liveSpritesByKey[e]||[]).length>0)return null;let{cls:r,args:i,stypes:s}=this.getSpriteDef(e),o=t.id||this.generateId(e),l={...i,...t,key:e,id:o},c=new r(l);return c.stypes=s,this._liveSpritesByKey[e]||(this._liveSpritesByKey[e]=[]),this._liveSpritesByKey[e].push(c),this._spriteById[o]=c,c}killSprite(e){e.alive=!1;let t=e.key,r=this._liveSpritesByKey[t];if(r){let i=r.indexOf(e);i!==-1&&(r.splice(i,1),this._deadSpritesByKey[t]||(this._deadSpritesByKey[t]=[]),this._deadSpritesByKey[t].push(e))}}group(e,t=!1){let r=this._liveSpritesByKey[e]||[];if(!t)return r;let i=this._deadSpritesByKey[e]||[];return r.concat(i)}*groups(e=!1){for(let t of this.spriteKeys)if(e){let r=this._liveSpritesByKey[t]||[],i=this._deadSpritesByKey[t]||[];yield[t,r.concat(i)]}else yield[t,this._liveSpritesByKey[t]||[]]}*sprites(e=!1){if(e)throw new Error("sprites(includeDead=true) not supported");for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)yield i}}spritesArray(){let e=[];for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)e.push(i)}return e}withStype(e,t=!1){if(this.spriteKeys.includes(e))return this.group(e,t);let r=[];for(let i of this.spriteKeys)if(this.stypes[i]&&this.stypes[i].includes(e)){let s=t?(this._liveSpritesByKey[i]||[]).concat(this._deadSpritesByKey[i]||[]):this._liveSpritesByKey[i]||[];r.push(...s)}return r}getAvatar(){for(let[,e]of this.groups(!0))if(e.length>0&&this.isAvatar(e[0]))return e[0];return null}isAvatar(e){return this.isAvatarCls(e.constructor)}isAvatarCls(e){let t=e;for(;t&&t.name;){if(t.name.includes("Avatar"))return!0;t=Object.getPrototypeOf(t)}return!1}deepCopy(){let e=new wr;e.classes={...this.classes},e.classArgs={};for(let[t,r]of Object.entries(this.classArgs))e.classArgs[t]={...r};e.stypes={};for(let[t,r]of Object.entries(this.stypes))e.stypes[t]=[...r];return e.spriteKeys=[...this.spriteKeys],e.singletons=[...this.singletons],e}},ai=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},ni=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},ot=class extends ni{constructor(w,e,t,r={}){let i=r.scoreChange||0;super(e,t,{scoreChange:i}),this.callFn=w;let{scoreChange:s,...o}=r;this.fnArgs=o,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},lt=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof _w||e===_w){let r=w;t.res_type&&(r=t.res_type),t.color&&(this.resources_colors[r]=t.color),t.limit!==void 0&&(this.resources_limits[r]=t.limit),this.notable_resources.push(r)}}buildLevel(w){let e=w.split(`
`).filter(o=>o.length>0),t=e.map(o=>o.length),r=Math.min(...t),i=Math.max(...t);if(r!==i)throw new Error(`Inconsistent line lengths: min=${r}, max=${i}`);let s=new ci(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let o=0;o<e.length;o++)for(let l=0;l<e[o].length;l++){let c=e[o][l],a=this.char_mapping[c];if(a){let n=[l*this.block_size,o*this.block_size];s.createSprites(a,n)}}return s.initState=s.getGameState(),s}},ci=class{constructor(w,e,t,r,i,s=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=r,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=s,this.randomGenerator=new ai(s),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new Fe(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let r=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return r&&(this.is_stochastic=this.domain.is_stochastic||r.is_stochastic||this.is_stochastic),r}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let l of e)l.just_pushed=null;for(let l of e)l.update(this);this.events_triggered=[];let[t,r,i]=this._moveEventHandling(),[s,o]=this._eventHandling(t);this.events_triggered=r.concat(s);for(let l of this.kill_list)this.sprite_registry.killSprite(l);for(let[l,c,a]of this.create_list)this.createSprite(l,c,a);for(let[l,c,a]of this.resource_changes){let n=this.domain.resources_limits&&this.domain.resources_limits[c]||1/0;l.resources[c]=Math.max(0,Math.min(l.resources[c]+a,n))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},r=this.domain.collision_eff.filter(s=>s.name==="stepBack"||s.name==="stepBackIfHasLess");for(let s of r){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}let i=this.domain.collision_eff.filter(s=>["bounceForward","reverseDirection","turnAround"].includes(s.name));for(let s of i){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}for(let s of r){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}return[t,w,e]}_eventHandling(w){let e=[],t=[],r=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of r){let[,s,o]=this._applyEffect(i,w);e.push(...s),t.push(...o)}return[e,t]}_applyEffect(w,e){let t=[],r=[],i=w.actor_stype,s=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),s!=="EOS"&&!(s in e)&&(e[s]=this.sprite_registry.withStype(s)),s==="EOS"){let a=e[i];for(let n=a.length-1;n>=0;n--){let h=a[n];this.containsRect(h.rect)||(this.addScore(w.score),w.call(h,null,this),t.push([w.name,h.id,"EOS"]),r.push([w.name,h.key,"EOS",[h.rect.x,h.rect.y],[null,null]]),!this.containsRect(h.rect)&&h.alive&&this.killSprite(h))}return[e,t,r]}let o=e[i],l=e[s];if(o.length===0||l.length===0)return[e,t,r];let c=!1;o.length>l.length&&([o,l]=[l,o],c=!0);for(let a of o)for(let n of l)a!==n&&a.rect.colliderect(n.rect)&&(c?this.kill_list.includes(n)||(this.addScore(w.score),w.call(n,a,this),t.push([w.name,n.id,a.id]),r.push([w.name,n.key,a.key,[n.rect.x,n.rect.y],[a.rect.x,a.rect.y]])):this.kill_list.includes(a)||(this.addScore(w.score),w.call(a,n,this),t.push([w.name,a.id,n.id]),r.push([w.name,a.key,n.key,[a.rect.x,a.rect.y],[n.rect.x,n.rect.y]])));return[e,t,r]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],r=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...r].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let r of t){let i=this.sprite_registry.createSprite(e,{id:r.id,pos:[r.x,r.y],size:[r.w,r.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...r.resources},{get(s,o){return typeof o=="string"&&!(o in s)&&o!=="toJSON"&&o!=="then"&&o!==Symbol.toPrimitive&&o!==Symbol.toStringTag&&o!=="inspect"&&o!=="constructor"&&o!=="__proto__"?0:s[o]},set(s,o,l){return s[o]=l,!0}}),r.speed!==void 0&&(i.speed=r.speed),r.cooldown!==void 0&&(i.cooldown=r.cooldown),r.orientation&&(i.orientation={...r.orientation}),r._age!==void 0&&(i._age=r._age),r.lastmove!==void 0&&(i.lastmove=r.lastmove),i.alive=r.alive,r.alive||this.sprite_registry.killSprite(i))}}};function hi(){u.register("VGDLSprite",T),u.register("Immovable",Sr),u.register("Passive",br),u.register("Resource",_w),u.register("ResourcePack",kr),u.register("Flicker",Xe),u.register("OrientedFlicker",Ze),u.register("OrientedSprite",qw),u.register("Missile",Je),u.register("SpawnPoint",Se),u.register("SpriteProducer",ye),u.register("Portal",_r),u.register("RandomNPC",wt),u.register("Chaser",et),u.register("Fleeing",Er),u.register("Bomber",xr),u.register("Walker",Ar),u.register("Conveyor",Or),u.register("Spreader",Ir),u.register("Immutable",yr),u.register("MovingAvatar",rt),u.register("OrientedAvatar",Ww),u.register("ShootAvatar",Mr),u.register("HorizontalAvatar",Qw),u.register("FlakAvatar",Rr),u.register("killSprite",rw),u.register("killBoth",Tr),u.register("cloneSprite",Cr),u.register("transformTo",Ew),u.register("stepBack",Yw),u.register("stepBackIfHasLess",Gr),u.register("undoAll",Br),u.register("bounceForward",Nr),u.register("catapultForward",Pr),u.register("reverseDirection",it),u.register("turnAround",$r),u.register("flipDirection",Hr),u.register("wrapAround",Dr),u.register("collectResource",Fr),u.register("changeResource",Ur),u.register("addResource",Kr),u.register("removeResource",zr),u.register("killIfOtherHasMore",qr),u.register("killIfHasMore",jr),u.register("killIfOtherHasLess",Wr),u.register("killIfHasLess",Qr),u.register("spawnIfHasMore",Yr),u.register("killIfAlive",Vr),u.register("conveySprite",Xr),u.register("pullWithIt",Jr),u.register("teleportToExit",Zr),u.register("teleportToOther",wi),u.register("wallBounce",ei),u.register("bounceDirection",ti),u.register("Timeout",ri),u.register("SpriteCounter",ii),u.register("MultiSpriteCounter",si),u.register("ResourceCounter",oi),u.register("GridPhysics",Ve),u.register("BasicGame",lt);for(let[w,e]of Object.entries(We))u.register(w,e);u.register("UP",Qe),u.register("DOWN",Ye),u.register("LEFT",ge),u.register("RIGHT",uw)}var ui=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let r of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[r]||[];for(let s of i)this._drawSprite(s,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let r=w.rect.x*e,i=w.rect.y*e,s=w.rect.w*e,o=w.rect.h*e,l=null,c=null;if(w.img){let y=this._parseImg(w.img);l=y.color,c=y.shape}l||(l=w.color),l||(l=[128,128,128]);let a=w.shrinkfactor||0,n=r+s*a/2,h=i+o*a/2,d=s*(1-a),p=o*(1-a);this.ctx.fillStyle=`rgb(${l[0]}, ${l[1]}, ${l[2]})`,c?this._drawShape(c,n,h,d,p):this.ctx.fillRect(n,h,d,p),w.orientation&&w.draw_arrow&&this._drawArrow(n,h,d,p,w.orientation,l),w.is_avatar&&this._drawResources(w,n,h,d,p)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],r=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of r)if(t.endsWith("_"+i)){let s=t.slice(0,-(i.length+1));return{color:e[s]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,r,i){let s=this.ctx,o=e+r/2,l=t+i/2,c=r/2,a=i/2,n=2/24,h=c*(1-2*n),d=a*(1-2*n);switch(s.beginPath(),w){case"CIRCLE":s.ellipse(o,l,h,d,0,0,Math.PI*2);break;case"TRIANGLE":{let p=l-d,y=l+d,b=o-h,g=o+h;s.moveTo(o,p),s.lineTo(g,y),s.lineTo(b,y),s.closePath();break}case"DIAMOND":s.moveTo(o,l-d),s.lineTo(o+h,l),s.lineTo(o,l+d),s.lineTo(o-h,l),s.closePath();break;case"STAR":{let p=Math.min(h,d),y=p*.4;for(let b=0;b<5;b++){let g=-Math.PI/2+b*(2*Math.PI/5),k=g+Math.PI/5;b===0?s.moveTo(o+p*Math.cos(g),l+p*Math.sin(g)):s.lineTo(o+p*Math.cos(g),l+p*Math.sin(g)),s.lineTo(o+y*Math.cos(k),l+y*Math.sin(k))}s.closePath();break}case"CROSS":{let p=h*2/3,y=p/2;s.rect(o-h,l-y,h*2,p),s.rect(o-y,l-d,p,d*2);break}case"HEXAGON":{let p=Math.min(h,d);for(let y=0;y<6;y++){let b=Math.PI/6+y*(Math.PI/3),g=o+p*Math.cos(b),k=l+p*Math.sin(b);y===0?s.moveTo(g,k):s.lineTo(g,k)}s.closePath();break}case"SQUARE":{let p=Math.min(h,d)*.05;s.rect(o-h+p,l-d+p,(h-p)*2,(d-p)*2);break}case"PENTAGON":{let p=Math.min(h,d);for(let y=0;y<5;y++){let b=-Math.PI/2+y*(2*Math.PI/5),g=o+p*Math.cos(b),k=l+p*Math.sin(b);y===0?s.moveTo(g,k):s.lineTo(g,k)}s.closePath();break}default:s.rect(e,t,r,i)}s.fill()}_drawArrow(w,e,t,r,i,s){let o=w+t/2,l=e+r/2,c=Math.min(t,r)*.3,a=[s[0],255-s[1],s[2]];this.ctx.strokeStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(o,l),this.ctx.lineTo(o+i.x*c,l+i.y*c),this.ctx.stroke()}_drawResources(w,e,t,r,i){let s=w.resources,o=0,l=3;for(let c of Object.keys(s)){if(c==="toJSON")continue;let a=s[c];if(a>0){let n=t+i+o*(l+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,n,r*Math.min(a/5,1),l),o++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};function pi(w){if(!w.delta_encoded)return;let e=w.states;if(!e||e.length<2){delete w.delta_encoded;return}let t=e[0].sprites;for(let r=1;r<e.length;r++){if(!("sprites"in e[r]))e[r].sprites=Object.assign({},t);else{let i=Object.assign({},t,e[r].sprites);for(let s in i)i[s]===null&&delete i[s];e[r].sprites=i}t=e[r].sprites}delete w.delta_encoded}var at=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function mi(w,e=8){w=w.replace(/\t/g," ".repeat(e));let t=w.split(`
`),r=new at("",-1);for(let i of t){i.includes("#")&&(i=i.split("#")[0]);let s=i.trim();if(s.length>0){let o=i.length-i.trimStart().length;r=new at(s,o,r)}}return r.getRoot()}var di=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=mi(t).children[0]);let[r,i]=this._parseArgs(t.content);Object.assign(i,e),this.spriteRegistry=new li,this.game=new lt(this.spriteRegistry,i);for(let s of t.children)s.content.startsWith("SpriteSet")&&this.parseSprites(s.children),s.content==="InteractionSet"&&this.parseInteractions(s.children),s.content==="LevelMapping"&&this.parseMappings(s.children),s.content==="TerminationSet"&&this.parseTerminations(s.children);return this.game.finishSetup(),this.game}_eval(w){if(u.has(w))return u.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let r=w.split(/\s+/).filter(i=>i.length>0);if(r.length===0)return[e,t];r[0].includes("=")||(e=this._eval(r[0]),r.shift());for(let i of r){let s=i.indexOf("=");if(s===-1)continue;let o=i.substring(0,s),l=i.substring(s+1);t[o]=this._eval(l)}return[e,t]}parseSprites(w,e=null,t={},r=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[s,o]=i.content.split(">").map(n=>n.trim()),[l,c]=this._parseArgs(o,e,{...t}),a=[...r,s];if("singleton"in c&&(c.singleton===!0&&this.spriteRegistry.registerSingleton(s),delete c.singleton),i.children.length===0){this.verbose&&console.log("Defining:",s,l,c,a),this.spriteRegistry.registerSpriteClass(s,l,c,a);let n=this.game.sprite_order.indexOf(s);n!==-1&&this.game.sprite_order.splice(n,1),this.game.sprite_order.push(s)}else this.parseSprites(i.children,l,c,a)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,r]=e.content.split(">").map(l=>l.trim()),[i,s]=this._parseArgs(r),o=t.split(/\s+/).filter(l=>l.length>0);for(let l=1;l<o.length;l++){let c=o[0],a=o[l],n;if(typeof i=="function"&&!i.prototype)n=new ot(i,c,a,s);else if(typeof i=="function")n=new ot(i,c,a,s);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(n)}}}parseTerminations(w){for(let e of w){let[t,r]=this._parseArgs(e.content);this.game.terminations.push(new t(r))}}parseMappings(w){for(let e of w){let[t,r]=e.content.split(">").map(s=>s.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let i=r.split(/\s+/).filter(s=>s.length>0);this.game.char_mapping[t]=i}}},nt={roomworld:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        avatar > MovingAvatar img=colored_shapes/YELLOW_CIRCLE
        goal > Immovable img=colored_shapes/LIGHTGREEN_STAR
        key1 > Resource img=colored_shapes/ORANGE_DIAMOND limit=1
        door1 > Immovable img=colored_shapes/ORANGE_SQUARE
        door1_used > Immovable img=colored_shapes/LIGHTORANGE_SQUARE
        key6 > Resource img=colored_shapes/BLUE_DIAMOND limit=1
        door2 > Immovable img=colored_shapes/RED_SQUARE
        teleporter > Immovable img=colored_shapes/PURPLE_HEXAGON
        catapult > Immovable img=colored_shapes/PINK_TRIANGLE
        catapult_used > Immovable img=colored_shapes/LIGHTPINK_TRIANGLE
        t6 > Portal stype=t6 img=colored_shapes/PURPLE_HEXAGON
        t6_used > Immovable img=colored_shapes/LIGHTPURPLE_HEXAGON
        t3 > Immovable img=colored_shapes/GREEN_HEXAGON
        key4 > Resource img=colored_shapes/GREEN_DIAMOND limit=1
        c6 > Immovable img=colored_shapes/RED_TRIANGLE
        door6 > Immovable img=colored_shapes/BLUE_SQUARE
        door6_used > Immovable img=colored_shapes/LIGHTBLUE_SQUARE
        tp4 > Portal stype=tp4 img=colored_shapes/ORANGE_HEXAGON
        tp4_used > Immovable img=colored_shapes/LIGHTORANGE_HEXAGON

    LevelMapping
        . > floor
        w > floor wall
        A > floor avatar
        x > floor goal
        K > floor key1
        D > floor door1
        k > floor key6
        d > floor door2
        t > floor teleporter
        c > floor catapult
        T > floor t6
        S > floor t3
        e > floor key4
        F > floor c6
        G > floor door6
        P > floor tp4

    InteractionSet
        avatar wall > stepBack
        avatar door1 > stepBackIfHasLess resource=key1 limit=1 exhaustStype=door1_used
        avatar door1_used > stepBack
        avatar door2 > stepBack
        avatar door6 > stepBackIfHasLess resource=key6 limit=1 exhaustStype=door6_used
        avatar door6_used > stepBack

        avatar catapult > catapultForward exhaustStype=catapult_used

        avatar key1 > changeResource resource=key1 value=1
        key1 avatar > killSprite

        avatar key6 > changeResource resource=key6 value=1
        key6 avatar > killSprite

        avatar t6 > teleportToOther exhaustStype=t6_used
        avatar tp4 > teleportToOther exhaustStype=tp4_used

        avatar key4 > changeResource resource=key4 value=1
        key4 avatar > killSprite

        goal avatar > killSprite

        floor EOS > killSprite
        wall EOS > killSprite
        avatar EOS > killSprite
        goal EOS > killSprite
        key1 EOS > killSprite
        door1 EOS > killSprite
        door1_used EOS > killSprite
        key6 EOS > killSprite
        door2 EOS > killSprite
        teleporter EOS > killSprite
        catapult EOS > killSprite
        catapult_used EOS > killSprite
        t6 EOS > killSprite
        t6_used EOS > killSprite
        t3 EOS > killSprite
        key4 EOS > killSprite
        c6 EOS > killSprite
        door6 EOS > killSprite
        door6_used EOS > killSprite
        tp4 EOS > killSprite
        tp4_used EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal limit=0 win=True
        Timeout limit=500 win=False`,levels:{0:`wwwwwwwwwwwww
w...w...D...w
w...w.K.w.x.w
w...wA..w...w
wwwwwwwwwwwww
w...w.t.w...w
w...w...wc..w
w..kw...w...w
wwdwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,1:`wwwwwwwwwwwww
w...w...w.F.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w..Tw...w
w...w.A.w...w
w...w...wS..w
wwwwwwwwwwwww
w...w.T.w...w
w...w...w...w
w.e.w.x.w.c.w
wwwwwwwwwwwww`,2:`wwwwwwwwwwwww
w..Kw...w...w
w...w...w...w
w...w.t.w...w
wwwwwwwwwwwww
w...w.c.w...w
w...w...w..Aw
w...w...w.c.w
wwwwwwwwwwwww
w...w...w..xw
w...wc..w...w
w...w...w...w
wwwwwwwwwwwww`,3:`wwwwwwwwwwwww
w..Pw...w...w
w...w...wc..w
w...w...w...w
wwwwwwwwwwwDw
w.c.G...w...w
wt..wT..w...w
w...wSAkwKT.w
wwwwwwwwwwwww
w...w...d...w
w...w...w..xw
we..w...wP..w
wwwwwwwwwwwww`}},avoidGeorge_vgfmri4:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        annoyed > RandomNPC speed=0.25 cons=2 img=colors/PURPLE
        quiet > RandomNPC speed=0.25 cons=1 img=colors/PINK
        avatar > ShootAvatar stype=cigarette  img=colors/DARKBLUE


        george > Chaser stype=quiet img=colors/YELLOW speed=0.15 frameRate=8
        cigarette > Flicker img=colors/BROWN limit=5 rotateInPlace=False singleton=True
        wall > Immovable img=colors/PURPLE


    LevelMapping
        . > floor
        g > floor george
        c > floor quiet
        A > floor avatar
        w > floor wall

    InteractionSet
        quiet george > transformTo stype=annoyed
        avatar george > killSprite scoreChange=-1

        annoyed cigarette > transformTo stype=quiet scoreChange=1

        annoyed wall > stepBack
        quiet wall > stepBack
        avatar wall > stepBack
        george wall > stepBack

        floor EOS > killSprite
        annoyed EOS > killSprite
        quiet EOS > killSprite
        avatar EOS > killSprite
        george EOS > killSprite
        cigarette EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=avatar  win=False
        SpriteCounter stype=quiet   win=False
        Timeout limit=400 win=True`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w...................w
w.......A......wwwwww
w.........w.........w
wwwww.....w.........w
w.........w.........w
w...................w
w...................w
w..............c....w
w...................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w....w........w.....w
w....w........w.....w
w....w........w.....w
w.................g.w
w...................w
w...................w
wwwwwww.....w.......w
w.....w.....w.......w
w.c...w.....w....A..w
w.....w.....w.......w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w.........w.........w
w...................w
w.......A...........w
www.....ww.ww.....www
w...................w
w..........c........w
w...................w
w...g...............w
w.........w.........w
w.........w.........w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w.....wwwwwww....A..w
w...................w
w...................w
w...................w
w.....wwwwwww.......w
w.....w.............w
w.....w..........c..w
w.....w.............w
w.....wwwwwww...c...w
w...................w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w.....wwwwwww....A..w
w...................w
w.......g...........w
w...................w
w.....wwwwwww.......w
w.....w.............w
w.....w.............w
w.....w.............w
w.....wwwwwww..c....w
w.................c.w
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
w......c............w
w...................w
w.......A.w........gw
w........www........w
w.........w.........w
w...................w
w............c......w
w...................w
w.c.................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
wc...w.....w........w
w....w.....w........w
w....w.....w.....A..w
w...................w
w...................w
w......c............w
w...................w
w....g.......w......w
w............w......w
w............w..c...w
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
w.........g.........w
w...c..www........c.w
w...................w
w..A................w
w...wwwww...........w
w...................w
w....wwwww..........w
w.g.............c...w
w....wwwww..........w
w...................w
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwww
www........A.......ww
ww...c..............w
w..............c....w
w.g............wwwwww
w.........c.........w
www.................w
w..................ww
www.................w
wc..................w
w...................w
wwwwwwwwwwwwwwwwwwwww`}},bait_vgfmri3:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        hole > Immovable img=colors/BLUE
        avatar > MovingAvatar img=colors/DARKBLUE
        mushroom > Immovable img=colors/RED
        key > Resource img=colors/ORANGE limit=1
        goal > Immovable img=colors/GREEN
        box > Passive img=colors/BROWN
        wall > Immovable img=colors/DARKGRAY


    LevelMapping
        . > floor
        w > floor wall
        A > floor avatar
        0 > floor hole
        1 > floor box
        k > floor key
        g > floor goal
        m > floor mushroom

    InteractionSet
        avatar wall > stepBack
        avatar hole > killSprite
        box avatar > bounceForward
        box wall > stepBack
        box box > stepBack
        box mushroom > undoAll


        hole box > killSprite scoreChange=1
        box hole > killSprite

        avatar key > changeResource resource=key value=1 scoreChange=1

        key avatar > killSprite
        goal avatar > killIfOtherHasMore resource=key limit=1

        mushroom avatar > killSprite scoreChange=1



        floor EOS > killSprite
        hole EOS > killSprite
        avatar EOS > killSprite
        mushroom EOS > killSprite
        key EOS > killSprite
        goal EOS > killSprite
        box EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        Timeout limit=600 win=False
        SpriteCounter stype=goal limit=0 win=True
        SpriteCounter stype=avatar limit=0 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwww
w.........A...........w
w.....................w
w.....g........k......w
w.....................w
w.....................w
wwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwww
w...A.....w......m....w
w.........w..........kw
w.....g...............w
w.........w...........w
w...m.....w......m....w
wwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w...A...........w..1.........w
w...............w.........k..w
wwwwwwwwwwwww1wwwwwwwwwwwwwwww
w............................w
w..m.....w.......w...........w
w...m....w.......w...........w
w.m......w.......w.....g.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w...A....k.......m....w
w.............1.......w
w.....................w
w...m.................w
w..............w00wwwww
w....1.m.......w......w
w..............w..g..mw
wwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............g...............w
w............................w
w........1.....A.............w
w......................1.....w
w............0...............w
wwwwwwwwwwwww0wwwwwwwwwwwwwwww
w.......w..........w.........w
w.......w.......m..w.........w
w.......w..........w.........w
w.......w..........w.........w
w.......w..........w.........w
w.......wwwwwkwwwwww.........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwg................wwwwww
ww..........................ww
ww.............A............ww
ww...11.................1...ww
ww..........................ww
ww..........................ww
ww..........................ww
wwwwwwwww..........wwwwwwwwwww
w.......w....................w
w.....k00....................w
wwwwwwwww..........wwwwwwwwwww
ww..........................ww
ww..m.......................ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwwwwwww
w......1..........w........w
w.....1g1.........w........w
w......1..........w........w
w..........................w
w..............1...........w
w.......A......1...........w
w..........................w
w...w0w...........wwwwwwwwww
w...w0w...........w........w
w...wkw...........w........w
w...www...........wwwwwwwwww
w..............m...........w
w..m.......................w
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.......w..........wwww.....ww
w.......w..1.......wwww.....ww
wwwwwwwwgm.........00kw..1..ww
ww......w..........wwww.....ww
ww....1.........1...........ww
ww.......A..........1.......ww
ww11111111111111111111111111ww
ww00000000000000000000000000ww
ww00000000000000000000000000ww
ww..........................ww
ww..........................ww
ww............k.............ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwww..........wwwwwwwwwww
wwwwwwwww..........wwwwwwwwwww
wwwwwwwwg...........0kwwwwwwww
wwwwwwwww..........ww0wwwwwwww
ww..........................ww
ww................1.........ww
ww.......A..................ww
wwwwwwwww..........wwwwwwwwwww
wwwwwwwww..........wwwwwwwwwww
ww.........................mww
ww..........................ww
ww......1...................ww
ww..........................ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,9:`wwwwwwwwwwwwwwwww
w.....wgw.......w
wwwwww...wwwwwwww
w.....w.A.w.....w
w...............w
w..1.........1..w
w...............w
w...............w
wwwwwww.0.wwwwwww
w......w0w......w
w......wkw......w
wwwwwwwwwwwwwwwww`,10:`wwwwwwwwwwwwwwwwwww
w......wwwww......w
w..1...wwwww...1..w
w......00.00......w
w..w.1.00k00.1.w..w
w..w...00000...w..w
w..1...00m00...1..w
w..w...ww1ww...w..w
w.................w
w.................w
w..wwwwww1wwwwww..w
w........Ag.......w
w.................w
wwwwwwwwwwwwwwwwwww`,11:`wwwwwwwwwwwww
w...wkw.....w
w...w000....w
w...w0m01...w
w....0111...w
w.....1A1...w
w....01.1...w
w..1........w
w...........w
w....wwwg...w
wwwwwwwwwwwww`}},bait_vgfmri4:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        hole > Immovable img=colors/BLUE
        avatar > MovingAvatar img=colors/YELLOW
        mushroom > Immovable img=colors/BLACK
        key > Resource img=colors/ORANGE limit=1
        goal > Immovable img=colors/PURPLE
        box > Passive img=colors/BROWN
        wall > Immovable img=colors/PINK


    LevelMapping
        . > floor
        w > floor wall
        A > floor avatar
        0 > floor hole
        1 > floor box
        k > floor key
        g > floor goal
        m > floor mushroom

    InteractionSet
        avatar wall > stepBack
        avatar hole > killSprite
        box avatar > bounceForward
        box wall > stepBack
        box box > stepBack
        box mushroom > undoAll


        hole box > killSprite scoreChange=5
        box hole > killSprite

        avatar key > changeResource resource=key value=5 scoreChange=5

        key avatar > killSprite
        goal avatar > killIfOtherHasMore resource=key limit=1

        mushroom avatar > killSprite scoreChange=10



        floor EOS > killSprite
        hole EOS > killSprite
        avatar EOS > killSprite
        mushroom EOS > killSprite
        key EOS > killSprite
        goal EOS > killSprite
        box EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal limit=0 win=True
        SpriteCounter stype=avatar limit=0 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w.......A...........w
w...................w
w..............k....w
w...................w
w...................w
w...................w
w...................w
w...................w
w..g................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w...A...m...........w
w...................w
w...............g...w
w...................w
w...................w
w...................w
w...................w
w..m................w
w............k......w
w...................w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w............w......w
w...A........w.....ww
w............w.....gw
w............w11111ww
w............w......w
w............w......w
w...................w
w...................w
w..k................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w.........k.........w
w...A.........1.....w
w...................w
w.......1...........w
w...................w
wwwwwwwwww0wwwwwwwwww
w...................w
w...................w
w..g.......mmmmmmm..w
w...................w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w..............A....w
w............1......w
w.................m.w
w.......g.........m.w
w...1...............w
w...........m.......w
wwwwwwwwwwwwww00wwwww
w...................w
w.............k.....w
w...................w
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
w...................w
w...................w
w......1...wwwwwwwwww
w.........m0......g.w
wk........m0........w
w....A....m0........w
w.1....1...wwwwwwwwww
w...................w
w...................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
w.............1.....w
w........1...1g1....w
w.......1.....1.....w
w...A...............w
w........w..........w
w...w0w..w....w0000ww
w...w0w..w....wmmmmww
w...wkw..w....wmmmmww
w...www..w....wmmmmww
w.............wwwwwww
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
w..........ww.......w
w..........ww.......w
w.0m....mmmww.......w
wwg0m...w00kw.......w
w.0m....wwwww.......w
w.......1...1.......w
w1...1...A..........w
w..............wwwwww
w..1...........w....w
w..............w..k.w
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwww.wwwwwwwww
w.....k...w.......g.w
w.........w.........w
w.........w..1.wwwwww
wwwwww00www....wmmmmw
w.........1....wmmmmw
w.......A......0mmmmw
w....1......wwwwwwwww
w........1..0.......w
w.g.........0....k..w
w.....1.....wwwwwwwww
wwwwwwwwwwwwwwwwwwwww`}},chase_vgfmri3:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        carcass > Immovable img=colors/BROWN
        goat > stype=avatar
            angry  > Chaser cooldown=8 img=colors/GOLD
            scared > Fleeing cooldown=3 img=colors/RED
        avatar > MovingAvatar img=colors/DARKBLUE
        wall > Immovable img=colors/DARKGRAY


    LevelMapping
        . > floor
        A > floor avatar
        0 > floor scared
        1 > floor angry
        w > floor wall

    InteractionSet
        angry   wall   > stepBack
        scared   wall   > stepBack
        avatar wall    > stepBack
        avatar angry > killSprite scoreChange=-1
        scared avatar > transformTo stype=carcass scoreChange=1
        scared carcass > transformTo stype=angry
        carcass angry > killSprite


        floor EOS > killSprite
        carcass EOS > killSprite
        goat EOS > killSprite
        angry EOS > killSprite
        scared EOS > killSprite
        avatar EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        Timeout limit=600 win=False
        SpriteCounter stype=scared win=True
        SpriteCounter stype=avatar win=False`,levels:{0:`wwwwwwwwwww
w.........w
wA........w
w.........w
w....0....w
w.........w
wwwwwwwwwww`,1:`wwwwwwwwwww
w..0......w
w....w....w
w..www..A.w
w....w....w
w.....0...w
wwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwwww
w.......................w
w.........0.....w.......w
w......wwwwwwwwww.......w
w........w......www.....w
w..........A............w
w.....ww......w....w....w
w.....ww...wwww....w0...w
w.....ww................w
wwww...0..........wwwwwww
w.......................w
wwwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwww
w...........w.............w
w...w1......w..w...w......w
w......wwwwww..w...w......w
w...w..wwwwww..0...www....w
w...........w......www....w
wwww......0......A........w
w.....ww...wwwwww....w....w
w.....ww...ww.....w..w0...w
w.....w...................w
wwwwwwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwww
w.......0...w.......0.....w
w...w.......w..0..........w
w......wwwwww......w......w
w...w..wwwwww......www....w
w...........w......www....w
wwww.....0.......A........w
w..0..ww...wwwwww....w....w
w.....ww...ww.....w..w0...w
w.....w....0..............w
wwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwww
wAww..........0..... ..w
w.ww..wwwwww.......www.w
w.ww..... ....ww...w.0.w
w.....w.......ww...w0..w
w..0..w...wwwwww...0...w
w.....w0.....0.... ..www
w.0...wwwwwww.....0....w
w.ww..w..0..w...wwww...w
w.......0.....0........w
wwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwww
w.....0................w
w..0...w. ....w.0......w
w...w.......0.ww.......w
w.....w........0...w...w
w.0..0.....0w..........w
w.....w....w...w..w....w
w.......w..0....w......w
w...w.....w..0..w..0...w
w......0......A........w
wwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwwwwww
ww....w......0.....0000w
ww..w.w....w.wwwwwwwww.w
ww..0..ww....... ......w
ww.w...........0.......w
w .......ww.......0....w
w.0.0..ww...0........0.w
w.. .....000...0.0.....w
w......ww..0..0........w
w...A...0......wwwwwww.w
wwwwwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w....ww....0.................w
w....ww......................w
wA...ww............wwwwww....w
w.........www....0...www.....w
w............................w
wwww....0..............0.....w
w...........wwwwwww..........w
w...1.....................1..w
w..........0...........ww....w
w.....wwwwww...........ww....w
wwww.......w......0....wwwwwww
w......1...w.................w
w..........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,9:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.....w......................w
w.....w.....0................w
w.....w............wwwwww....w
w.........www........www.....w
w............................w
wwww..............www........w
w.......0......wwww....A.....w
w.0..........................w
w.....wwwwww...........ww....w
w...0.wwwwww...........ww....w
w..........w...0.......wwwwwww
w..........w.................w
w..........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,10:`wwwwwwwwwwwwwwwwwwwwwwww
w.0.w..0........w..0...w
w...w....ww.....w..wwwww
w...w.ww..w...0.0......w
w...w.0...w..wwwwwww...w
w.0wwwwwwww..0....w....w
w.............0...w...ww
w.ww...ww0...wwwwww.00.w
wA...wwwwww..0....w....w
www....0......w..0..wwww
wwwwwwwwwwwwwwwwwwwwwwww`,11:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w.....w.0..........w.........w
w.....w........0...wwwwww....w
w.....w...www......w.........w
w.....w......................w
wwwwwww....A...wwwwww....0...w
w..............wwwwww........w
w..............0.............w
w........0..........wwwww0...w
w...0.wwwwwww....www...ww....w
w..0.......ww...0w.....wwwwwww
w..........ww................w
w..........ww................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},chase_vgfmri4:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        carcass > Immovable img=colors/BLACK
        goat > stype=avatar
            angry  > Chaser cooldown=8 img=colors/GOLD
            scared > Fleeing cooldown=3 img=colors/RED
        avatar > MovingAvatar img=colors/DARKBLUE
        wall > Immovable img=colors/BROWN


    LevelMapping
        . > floor
        A > floor avatar
        0 > floor scared
        1 > floor angry
        w > floor wall

    InteractionSet
        angry   wall   > stepBack
        scared   wall   > stepBack
        avatar wall    > stepBack
        avatar angry > killSprite scoreChange=-1
        scared avatar > transformTo stype=carcass scoreChange=1
        scared carcass > transformTo stype=angry
        carcass angry > killSprite


        floor EOS > killSprite
        carcass EOS > killSprite
        goat EOS > killSprite
        angry EOS > killSprite
        scared EOS > killSprite
        avatar EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=scared win=True
        SpriteCounter stype=avatar win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w...................w
w...................w
w..............A....w
w...................w
w..........0........w
w...................w
w...................w
w...................w
w...................w
w...................w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w...................w
w..0................w
w.........w.........w
w.........w.........w
w.........w.........w
w...wwwwwwwwwwww....w
w.........w.........w
w.........w......A..w
w.........w.........w
w.........0.........w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w...................w
w.....wwwwwwwww.....w
w.....w...0...w.....w
w.....w.......w.....w
w.....w....A..w.....w
w.....w.......w.....w
wwwwwww.......w.....w
w.....w.......w.....w
w.....w.....0.w.....w
wwww..w0......w...www
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w...w0......w.......w
w...w..www..w.......w
w...w..www..w0......w
w...w......0w....0..w
w...w...............w
wwwww0..A...........w
w...................w
w......wwww.0.w.....w
w...0..w...0..w0....w
w......w......w.....w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w...w...0...........w
w...w...............w
w...w..wwwwww....0..w
w...w..wwwwww.......w
w....0..............w
wwww.........A..wwwww
w.......0...........w
w..1.......wwww.....w
w..........ww..0.0..w
w...........w.......w
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
wAwww..........0....w
w...................w
w......w...wwwwwww..w
w..0...w...ww....w..w
w......w0........wwww
w.0....wwwww........w
wwww...w.....w......w
w......w.....w......w
w..1.........w..0...w
w........0...w......w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
w.....0......0.w....w
w..0...wwwwwwwww.0..w
w......w............w
w......w.0..........w
w.0.......A.0www....w
www.....0......wwwwww
w.....w........w....w
w...wwwwwww.0..w....w
w..0w.....w...0...0.w
w...w.....w.........w
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
ww...........0..0..0w
wwwwwwww......wwwwwww
ww..1..ww...........w
w.......w...........w
w..........Awwww....w
wwww........w..w..1.w
w.0....www..w.0wwwwww
w...........w..w..0.w
w..............0..0.w
w.......0.........www
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwww
w....ww.............w
w....ww.......wwww..w
w.........0......w..w
wwww....0......0....w
w.........A.........w
w..............wwwwww
w.0..............1..w
w........wwwwww.....w
wwww..........w..0..w
w.........1...w.....w
wwwwwwwwwwwwwwwwwwwww`}},helper_vgfmri3:{description:`BasicGame frame_rate=30
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE cooldown=0
        mover > VGDLSprite
            chaser > Chaser
                chaser1 > stype=box1 img=colors/ORANGE  cooldown=12
                chaser2 > stype=box3 img=colors/LIGHTBLUE cooldown=12
        wall > Immovable img=colors/BLACK
        forcefield > Passive img=colors/PURPLE
        box > Passive
            box1 > img=colors/WHITE
            box2 > img=colors/GREEN
            box3 > img=colors/YELLOW

    LevelMapping
        . > floor
        A > floor avatar
        w > floor wall
        a > floor box1
        b > floor box2
        c > floor box3
        f > floor forcefield
        x > floor chaser1
        z > floor chaser2
        z > floor chaser2

    InteractionSet
        avatar wall > stepBack
        box wall > stepBack
        box3 avatar > bounceForward
        box1 avatar > bounceForward
        box1 box2 > stepBack
        box1 box1 > stepBack
        box2 avatar > killSprite
        box1 chaser > killSprite
        box3 chaser > killSprite
        chaser forcefield > stepBack
        chaser wall > stepBack
        chaser box2 > stepBack

        floor EOS > killSprite
        avatar EOS > killSprite
        mover EOS > killSprite
        chaser EOS > killSprite
        chaser1 EOS > killSprite
        chaser2 EOS > killSprite
        wall EOS > killSprite
        forcefield EOS > killSprite
        box EOS > killSprite
        box1 EOS > killSprite
        box2 EOS > killSprite
        box3 EOS > killSprite

    TerminationSet
        Timeout limit=600 win=False
        SpriteCounter stype=avatar  limit=0 win=False
        SpriteCounter stype=box1 limit=0 win=True`,levels:{0:`wwwwwwwwwwwwwwwwww
w........a.......w
w......w.........w
w......w.........w
w..x...w......a..w
w......w.........w
w......www.......w
w..A.............w
www...x..........w
wwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w.x.................w
w...a.....a.........w
w............a......w
w...................w
w...b..........a....w
w........a..........w
w..A..b..........b..w
wwwx................w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwww
w...............w
w.b.............w
w.......fffff...w
w..b..a.f.x.f...w
w.......f..xf...w
w..A....fffff...w
w.........a.....w
www..........b..w
wwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w............................w
w...faaf.....................w
w...ffff...........a...bb....w
w............................w
w..............a.............w
w..x.........................w
w..........b.................w
w...................a........w
w..A.....a.....b.............w
w............................w
www.................x........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w.........................x..w
w............................w
w.............b..............w
w................cccccc......w
w................c..a.c......w
w..b........m....c....c......w
w..............A.cccccc......w
w...fffff....................w
w...fx.xf....................w
w...f...f...bbb..............w
w...fffff...bab...b......b...w
w...........bbb..............w
www..........................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w...........bba.b............w
w........a..fbbbb............w
w..........afff..............w
w............................w
w..x.........................w
w.......................a.bbbw
w..z.......ccccc..........ba.w
w...................a.....b..w
w............................w
w..A...w.......b........ff...w
www....w............x........w
w............................w
w.........z..................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w............................w
w...faa.......af.............w
w...ffff.....fff.......bb....w
w.........c...............z..w
w..............a.............w
w..x.............c...........w
w..........b.................w
w................c..a........w
w..A.....a.....b.............w
w............................w
w............................w
www........z........x........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............z...............w
w............................w
w......fa.a..................w
w......ffff............bb....w
w................a.a.........w
w..............a.fff.........w
w..x.........................w
w..........b..............z..w
w...................a........w
w..A.....a.....b.............w
w.....................x......w
w............................w
www.....c........c...........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w........b...................w
w..................a.........w
w............................w
w............................w
w..b........m................w
w..............A.............w
w....fffff...................w
w...fx.x..f..................w
w...f.....f..................w
w....fffff....a...b......b...w
w...........................ww
w...........................ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,9:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w........b...................w
w..................a.........w
w..................fffff.....w
w.................fx....f....w
w..b........m.....f..x..f....w
w..............A...fffff.....w
w............................w
w............................w
w........w...................w
w......w......a...b......b...w
w............................w
w............................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,10:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w...........fba.bf...........w
w........a..fbbbbf...........w
w..........a..ff.............w
w..x.........................w
w.......................a....w
wbbb.........................w
w.a.b................a.......w
w...b........................w
w..A...w.......b........ff...w
www....w............x........w
w..........c.................w
w................z...........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,11:`wwwwwwwwwwwwwwwww
w......x........w
w...............w
wbbb.........bbbw
w...............w
w...............w
w......A........w
w...............w
w....ccccc......w
w...............w
w...............w
w....z.z.z......w
wfffffffffffffffw
w.....a.....a...w
w...............w
w...............w
wwwwwwwwwwwwwwwww`}},helper_vgfmri4:{description:`BasicGame frame_rate=30
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE cooldown=0
        mover > VGDLSprite
            chaser > Chaser
                chaser1 > stype=box1 img=colors/ORANGE  cooldown=12
                chaser2 > stype=box3 img=colors/LIGHTBLUE cooldown=12
        wall > Immovable img=colors/BLACK
        forcefield > Passive img=colors/PURPLE
        box > Passive
            box1 > img=colors/WHITE
            box2 > img=colors/GREEN
            box3 > img=colors/YELLOW

    LevelMapping
        . > floor
        A > floor avatar
        w > floor wall
        a > floor box1
        b > floor box2
        c > floor box3
        f > floor forcefield
        x > floor chaser1
        z > floor chaser2
        z > floor chaser2

    InteractionSet
        avatar wall > stepBack
        box wall > stepBack
        box3 avatar > bounceForward
        box1 avatar > bounceForward
        box1 box2 > stepBack
        box1 box1 > stepBack
        box2 avatar > killSprite scoreChange=1
        box1 chaser > killSprite
        box3 chaser > killSprite scoreChange=1
        chaser forcefield > stepBack
        chaser wall > stepBack
        chaser box2 > stepBack

        floor EOS > killSprite
        avatar EOS > killSprite
        mover EOS > killSprite
        chaser EOS > killSprite
        chaser1 EOS > killSprite
        chaser2 EOS > killSprite
        wall EOS > killSprite
        forcefield EOS > killSprite
        box EOS > killSprite
        box1 EOS > killSprite
        box2 EOS > killSprite
        box3 EOS > killSprite

    TerminationSet
        SpriteCounter stype=avatar  limit=0 win=False
        SpriteCounter stype=box1 limit=0 win=True
        Timeout limit=600 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w...........a.......w
w...................w
w.........w.........w
w.........w.........w
w..x......w......a..w
w.........w.........w
w.........www.......w
w...................w
w..A................w
www......x..........w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w.x.................w
w...a.....a.......A.w
w............a......w
w...................w
w...................w
w...b..........a....w
w...................w
w........a..........w
w.....b..........b..w
wwwx................w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w.......A...........w
w...................w
w.b.................w
w.......fffff.......w
w..b..a.f.x.f.......w
w.......f..xf.......w
w.......fffff...a...w
w...................w
w............b......w
www.................w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w...a...............w
w.......w.a.w.b.....w
w.......w...w.......w
w.......w.a.w.......w
w..x....w...w....a..w
w.b.....f...f.......w
w.......wwwww.......w
w...................w
w..A.a.........b....w
www........x........w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w............w......w
w...b.a..a...w......w
w............w.....xw
w............w......w
wwwwwwwwwccwww......w
w.......w...........w
w.......w....bbbbb..w
w.......w....b...b..w
w.......w....b..Ab..w
www..x..w....bbbbb..w
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
w........fffffff....w
w....A...fbbbbbf....w
w........fb.a.bf....w
w........fbbbbbf....w
w..x.....fffffff....w
w..............a....w
w..z............ccccw
wbbbbbbb........c...w
w......b...x....c.a.w
w..a...b.z......c...w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
w.......x....b..a.ccw
w............b..a...w
w............b..aaaaw
w............bbbbbbbw
w..........A........w
wbbbbbbbb...........w
w.......b...........w
wcccccc.b...........w
w.....c.b.....z.....w
w.aa..c.b...........w
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
w...w.......ffcb..bbw
w...w.z.....wwcba.bbw
w.c.f.......wwcba.bbw
w...f.......wwcba.bbw
w...w..A....wwcb..bbw
w...w.......wwcw..bbw
w...........cccw..bbw
wbbb........cccwwwwww
w..b........wwww....w
w.ab...x......w.....w
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwww
w.....a..b.....c....w
wz.wbwwwwwwwwwwwbw..w
w..w.....z.......b..w
w..w.bbbwwwwwfww.w..w
wffw.b.........b.wccw
w..w.w....x....b.w..w
w..w.w..wwwwwwww.w..w
w.Aw.b.....c..b..b..w
w..w.bbwwwfwwwwwbw..w
w..f...b...c.....a..w
wwwwwwwwwwwwwwwwwwwww`}},lemmings_vgfmri3:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        hole   > Immovable img=colors/LIGHTBLUE
        shovel > Flicker img=colors/BROWN limit=1 singleton=True

        entrance > SpawnPoint total=6 cooldown=35 stype=lemming img=colors/PURPLE
        goal > Immovable img=colors/GREEN

        avatar  > ShootAvatar stype=shovel img=colors/DARKBLUE
        lemming > Chaser  stype=goal speed=1 cooldown=5 img=colors/RED
        wall > Immovable img=colors/GRAY

    LevelMapping
        . > floor
        x > floor goal
        e > floor entrance
        h > floor hole
        A > floor avatar
        w > floor wall

    InteractionSet
        avatar hole > killSprite scoreChange=-5
        lemming hole > killSprite scoreChange=-2

        avatar wall > stepBack
        lemming wall > stepBack
        avatar EOS > stepBack
        lemming EOS > stepBack
        wall shovel  > killSprite
        lemming goal > killSprite scoreChange=2


        floor EOS > killSprite
        hole EOS > killSprite
        shovel EOS > killSprite
        entrance EOS > killSprite
        goal EOS > killSprite
        avatar EOS > killSprite
        lemming EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        Timeout limit=600 win=False
        SpriteCounter  stype=avatar  limit=0 win=False
        MultiSpriteCounter stype1=entrance stype2=lemming limit=0 win=True`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwww
w..x................www
w..w..................w
w.......A............ew
wwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwww
w..x................www
w..w........wwwww.....w
w.......A.......w....ew
wwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwww
w..x...ww.w....w....www
w..www..w...w..w.w....w
w.......A........w...ew
wwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w......ww...wwwww............w
w......ww...wwwww........ww..w
w......ww...wwwww......ww....w
w.x....ww...www........ww....w
w....wwww....ww..............w
w..wwww.......www............w
w..ww.........www............w
w.............www............w
w......www....www............w
w.......ww......www..........w
w.......ww......www..........w
w..w....ww......www..........w
w.......A...............e....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w......ww...wwwww............w
w......ww...wwwww......hhww..w
w......ww...wwwww......wwx...w
w......ww...www........ww....w
w..hhwwww...www..............w
w..wwww.....wwwwh............w
w..ww.......wwwwh............w
w.............wwh............w
w......www....wwh............w
w......wwh......wwwh.........w
w......wwh......wwwh.........w
w..w...wwh......wwwh.........w
w..e....A....................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w................................w
w.........whh........wwww...x....w
w........wwww........whww........w
w.........www........wwww........w
w.........ww.....A.....wh........w
w........wwwh..........wwh.......w
w.........www...www...wwww.......w
w.......e..www........wwww.......w
w................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............ww..wwwwww...........w
w............ww.hhh..hw.w.........w
w.......x....w..wwwwww...ww.......w
w.......whw..w.wwwwww.w...........w
w.......ww.....wwwwwhww...........w
w.......ww...hwwwwwwwww...........w
w............hw..w..ww............w
w.......w....hw....wwww...........w
w.......A................e........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w......ww...wwwww............w
w...e..ww...wwwww............w
w......ww....................w
w......ww...wwwhh.....wwww...w
w..hhwwww......ww.....wwww...w
w..wwww........ww............w
w..ww.......wwwww............w
w.............hhh............w
w.............hhh............w
w......wwh......wwwh.........w
w......wwh......wwwh.....ww..w
w......wwh......w........wx..w
w.......A....................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..................................w
w......................e...........w
w........wwwwwwwwwwwwwwww..........w
w........wwwwwwwwhhwwwwwwwwwwwwwwwww
w........wwhhhwwwwwwwwhww..........w
wwwwwwwwwwwwwwwwwhhwwwwww..........w
w........wwwwwwwwwwwwwhww..........w
w.........x............A...........w
w..................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,9:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w......ww...wwwww............w
w......ww...wwwww........e...w
w......ww....................w
w......ww.....www.......ww...w
w..hhwwww....hwww.......ww...w
w..wwww......hwww............w
w..ww........hwww............w
w.............www........w...w
w.............www........w...w
w......hhw......www......w...w
w......www......www......w...w
w...x..www......www......w...w
w.......A....................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,10:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w...............w.......wh........w
w..e.....wwwwwwww.......wwww......w
w........whhhhhhh.........w.......w
w........w........................w
wwwwwwwwww......wwwwwwwwwwwwwwwwwww
w...............whw.....whw.......w
w.........w.w...whw.....whw.......w
w.......A...w...whw.....whw.......w
w...........w...www.....wwx.......w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,11:`wwwwwwwwwwwwwwwwwwwww
w....x.ww.wwwwww....w
w.....hwwwww.wwww...w
w..w..wwwwwwwww..ww.w
w..wwww.wwwwww.w....w
w..ww.hhwwwwwhww....w
w..ww.wwwwwwwwww....w
w.....wwhhw..ww.....w
w....wwwwww.wwww....w
w..A.............e..w
wwwwwwwwwwwwwwwwwwwww`}},lemmings_vgfmri4:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        hole   > Immovable img=colors/LIGHTBLUE
        shovel > Flicker img=colors/BROWN limit=1 singleton=True

        entrance > SpawnPoint total=4 cooldown=35 stype=lemming img=colors/PURPLE
        goal > Immovable img=colors/GREEN

        avatar  > ShootAvatar stype=shovel img=colors/DARKBLUE
        lemming > Chaser  stype=goal speed=1 cooldown=5 img=colors/RED
        wall > Immovable img=colors/GRAY

    LevelMapping
        . > floor
        x > floor goal
        e > floor entrance
        h > floor hole
        A > floor avatar
        w > floor wall

    InteractionSet
        avatar hole > killSprite scoreChange=-5
        lemming hole > killSprite scoreChange=-2

        avatar wall > stepBack
        lemming wall > stepBack
        avatar EOS > stepBack
        lemming EOS > stepBack
        wall shovel  > killSprite
        lemming goal > killSprite scoreChange=2


        floor EOS > killSprite
        hole EOS > killSprite
        shovel EOS > killSprite
        entrance EOS > killSprite
        goal EOS > killSprite
        avatar EOS > killSprite
        lemming EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter  stype=avatar  limit=0 win=False
        MultiSpriteCounter stype1=entrance stype2=lemming limit=0 win=True
        Timeout limit=600 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w...................w
w..x................w
w...................w
w...................w
w...................w
w...................w
w...................w
w...................w
w................e..w
w.......A...........w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w......w............w
w..x...w............w
w......w............w
w......w............w
w......wwwwwwwwwwwwww
w...................w
w...................w
w...................w
w...................w
w.......A..........ew
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w...................w
w..x................w
w...................w
w...................w
wwwwwwwwwwwwwwwwwwwww
w...................w
w...................w
w...................w
w................e..w
w.......A...........w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w...................w
w...............e...w
w...................w
w..wwwwwwww.......www
w..wwwwwwwwwwwwwwwwww
w.......A...........w
w...................w
w.....wwwwww........w
w.....w....w........w
w.....w.x..w........w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w......ww...www..hh.w
w......ww...w.......w
w......ww...w.......w
w.x....ww...ww......w
w.....www....ww.....w
w..wwww.......ww....w
w..ww.........w.....w
w..w..........www...w
w..w................w
w.......A..........ew
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
w...................w
w....hh.....ww...x..w
w....ww.....whh.....w
w.....w.....www.....w
w.....w..A....wh....w
w...wwh.......wh....w
w...w.........w.....w
w..........wwww.....w
w...................w
we..................w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
w......ww...w.hhww..w
w......ww...ww....x.w
w......ww...ww......w
w..hhwwww...ww......w
w..wwww.....wwwwh...w
w..ww.........wwh...w
w.............wwh...w
w......wwh......wwwhw
w..w...wwh.........hw
w..e....A...........w
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
w...hw..............w
w...hw..............w
w...hw....wwwwwwwwwww
wA..hw....wwhhhhhhhhw
w...hw....wwhhhhhhhhw
w...hw....wwhh......w
wwwwww....wwhh......w
w.........ww......x.w
w.........wwhh......w
w.e.......wwhh......w
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwww
whhh...........e....w
w..............wwwwww
w........ww....whhhhw
w...wwwwwwwwwwwwhhhhw
w.wwwwhhwwhhh..whhhhw
wwwwwwhhwwwww..wwwwww
w...wwwwwwwww.....A.w
w....whhhhwwww......w
w....whhhhww........w
w.x..whhhhww........w
wwwwwwwwwwwwwwwwwwwww`}},plaqueAttack_vgfmri3:{description:`BasicGame
  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY

    fullMolarInf > Immovable img=colors/YELLOW
    fullMolarSup > Immovable img=colors/RED
    deadMolarInf > Immovable img=colors/GREEN
    deadMolarSup > Immovable img=colors/BLUE

    avatar  > ShootAvatar stype=fluor img=colors/DARKBLUE frameRate=8 speed=1
    hotdoghole > SpawnPoint stype=hotdog  prob=0.15 cooldown=8 total=3 img=colors/PURPLE
    burgerhole > SpawnPoint stype=burger  prob=0.15 cooldown=8 total=3 img=colors/LIGHTBLUE
    burger > Chaser speed=1 cooldown=8 stype=fullMolarSup img=colors/BROWN fleeing=False
    hotdog > Chaser speed=1 cooldown=8 stype=fullMolarInf img=colors/ORANGE fleeing=False

    fluor > Missile img=colors/LIGHTRED speed=1
    wall > Immovable img=colors/GRAY

  LevelMapping
    h > hotdog floor
    d > hotdoghole floor
    b > burger floor
    v > burgerhole floor
    n > fullMolarSup floor
    m > fullMolarInf floor
    . > floor
    A > avatar floor
    w > floor wall
    p > floor deadMolarInf

  InteractionSet
    avatar wall > stepBack
    hotdog wall > stepBack
    burger wall > stepBack

    fluor hotdog > killSprite
    hotdog fluor > killSprite scoreChange=1
    fluor burger > killSprite
    burger fluor > killSprite scoreChange=1
    
    fluor wall   > killSprite


    fullMolarInf hotdog > transformTo stype=deadMolarInf scoreChange=-1
    hotdog deadMolarInf > killSprite 
    fullMolarInf burger > transformTo stype=deadMolarInf scoreChange=-1
    burger deadMolarInf > killSprite 
    deadMolarInf avatar > transformTo stype=fullMolarInf scoreChange=1
    
    
    fullMolarSup hotdog > transformTo stype=deadMolarSup
    hotdog deadMolarSup > killSprite  scoreChange=-1
    fullMolarSup burger > transformTo stype=deadMolarSup 
    burger deadMolarSup > killSprite scoreChange=-1
    deadMolarSup avatar > transformTo stype=fullMolarSup scoreChange=1

    avatar EOS > killSprite
    burger EOS > killSprite
    burgerhole EOS > killSprite
    deadMolarInf EOS > killSprite
    deadMolarSup EOS > killSprite
    fluor EOS > killSprite
    fullMolarInf EOS > killSprite
    fullMolarSup EOS > killSprite
    hotdog EOS > killSprite
    hotdoghole EOS > killSprite
    wall EOS > killSprite


  TerminationSet
    Timeout limit=600 win=False
    MultiSpriteCounter stype1=fullMolarInf stype2=fullMolarSup limit=0 win=False
    MultiSpriteCounter stype1=hotdoghole stype2=hotdog stype3=burger stype4=burgerhole limit=0 win=True`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
wwww..www......dwwwww
w...................w
w........A..........w
w...................w
w...................w
w..m.m.m............w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
wwwwd.www......dwwwww
w...................w
w..n.....A........n.w
w...................w
w...mm.....m.m..m.m.w
www.......ww.......ww
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
wwww..www.......wwwww
w..n.n.n.......n.n.nw
w........A..........w
w...................w
wwwwwww...ww...wwwwww
w......v..ww..v.....w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww.....................wwwww
w.nnn....................nnn.w
w............................w
w............................w
w........wwwwwwwwwww.........w
w............................w
w............................w
w............................w
wv...........A..............vw
w.....mmm............mmm.....w
w............wwwww...........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww..d..................wwwww
w.nnn........................w
w............................w
w............................w
w........wwwwwwwwwww.........w
w............................w
w............................w
w............................w
w............A..............vw
w.......................mmm..w
w............wwwww..........vw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww.........ddddd.......wwwww
w............................w
w............................w
wn..........................nw
w............................w
w............................w
w............................w
w............................w
w...mmmm....A..........mmmm..w
w.............mmm............w
wwwwwwwwww...wwwww...wwwwwwwww
w............wwwww...........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww.........d.d.d.......wwwww
w.n........................n.w
w............................w
w.........wwwwwwwwwww........w
w............................w
w............................w
w............................w
w............................w
w...m.mmm....A.m......mmm.m..w
w.............m.m............w
w..wwwwwww...wwwww...wwwwww..w
wv...........wwwww..........vw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwwwwww
w......wdw.wdw.wdw.....w
wwwwwwww.w.w.w.w.w..wwww
wd...www.w.w.w.w.www..dw
wwww.www.www.www.www.www
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w...........A..........w
w......................w
w...m...m...m...m...m..w
wwwwwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwwwwww
wwwwwwww...wdw...wwwwwww
wd.....w...w.w...w....dw
wwwwww.w...w.w...w.wwwww
w........n.....n.......w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w...........A..........w
w.....m.....m.....m....w
wv........wwwww.......vw
wwwwwwwwwwwwwwwwwwwwwwww`,9:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww.......dddddddd......wwwww
w............................w
w............................w
wn..........................nw
w............................w
w............................w
w............................w
w............................w
w.m.m.m.m....A.......m.m.m.m.w
w.............mmm............w
w...wwwwww...wwwww...wwwww...w
wv...........wwwww..........vw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,10:`wwwwwwwwwwwwwwwwwwwwwwww
w...n...n...n...n...n..w
w......................w
w......................w
w...........A..........w
w......................w
w......................w
w......................w
w......................w
w......................w
wwww.www.www.www.www.www
wv...w w.w w.w w.w w..vw
wwwwwwwwvwww.wwwvwwwwwww
wwwwwwwwwwwwwwwwwwwwwwww`,11:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwww..........ddd........wwwww
w..n.n..n............n.n..n..w
w............................w
w............................w
w............................w
w............................w
w............................w
w............................w
w............................w
w............................w
w............A...............w
w.m.m.m.m.....vvv....m.m.m.m.w
w............wwwww...........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},sokoban_vgfmri3:{description:`BasicGame square_size=20
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        hole   > Immovable img=colors/RED
        avatar > MovingAvatar img=colors/DARKBLUE
        box    > Passive img=colors/GREEN
        wall > Immovable img=colors/DARKGRAY autotiling=True

    LevelMapping
        . > floor
        A > floor avatar
        0 > floor hole
        1 > floor box
        w > floor wall

    InteractionSet
        avatar wall > stepBack
        box avatar > bounceForward scoreChange=1
        box wall > stepBack
        box box > stepBack
        box hole > killSprite scoreChange=1

        floor EOS > killSprite
        hole EOS > killSprite
        avatar EOS > killSprite
        box EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=box    limit=0 win=True
        Timeout limit=600 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w..............0ww..w
w......1............w
w...........A.......w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwww
w......w..0.....w
w..1...w........w
w......w.....A..w
w...............w
w...............w
wwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w...........................ww
w...........................ww
wwwwwww......0wwww...........w
w....1.......................w
w.........1..................w
w.....A........wwwwww........w
w............................w
w......wwwwwwwww.........wwwww
w......0.................wwwww
w...........................ww
w...........................ww
w...........................ww
w...........................ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},zelda_vgfmri3:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        goal  > Immovable img=colors/GREEN
        key   > Resource img=colors/ORANGE limit=1
        sword > OrientedFlicker singleton=True img=colors/WHITE
        avatar  > ShootAvatar   stype=sword frameRate=8 img=colors/DARKBLUE
        monsterQuick > RandomNPC cooldown=6 cons=6 img=colors/BROWN
        monsterNormal > RandomNPC cooldown=8 cons=8 img=colors/PINK
        monsterSlow > RandomNPC cooldown=10 cons=12 img=colors/GOLD
        wall > Immovable autotiling=true img=colors/DARKGRAY



    LevelMapping
        . > floor
        A > floor avatar
        g > floor goal
        + > floor key
        1 > floor monsterQuick
        2 > floor monsterNormal
        3 > floor monsterSlow
        w > floor wall

    InteractionSet
        avatar wall > stepBack
        goal avatar > killIfOtherHasMore resource=key limit=1
        monsterSlow sword > killSprite scoreChange=2
        monsterQuick sword > killSprite scoreChange=2
        monsterNormal sword > killSprite scoreChange=2

        monsterSlow monsterSlow > stepBack
        monsterSlow monsterQuick > stepBack
        monsterSlow monsterNormal > stepBack
        monsterQuick monsterNormal > stepBack
        monsterNormal monsterNormal > stepBack
        monsterQuick monsterQuick > stepBack

        avatar monsterSlow > killSprite scoreChange=-1
        avatar monsterQuick > killSprite scoreChange=-1
        avatar monsterNormal > killSprite scoreChange=-1

        avatar key > changeResource resource=key value=1 scoreChange=5
        key avatar > killSprite

        monsterQuick wall > stepBack
        monsterNormal wall > stepBack
        monsterSlow wall > stepBack

        sword wall > killSprite




        floor EOS > killSprite
        goal EOS > killSprite
        key EOS > killSprite
        sword EOS > killSprite
        avatar EOS > killSprite
        monsterQuick EOS > killSprite
        monsterNormal EOS > killSprite
        monsterSlow EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal win=True
        SpriteCounter stype=avatar win=False
        Timeout limit=600 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.......g..w.................w
w..........w.................w
w.................w.......+..w
w.....A...........w..........w
w.................w..........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.......g..w.................w
w..........w.................w
w.................w.......+..w
w...............A.w..........w
w...3.............w..........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w..3.......wg..........3.....w
w............................w
w............................w
w............................w
w...................w........w
w...................w........w
w..3.......w........w........w
w..........w+.......w..A.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w..........wg................w
w..........wwwww.............w
w............................w
w............................w
w.......3....................w
w............................w
w............................w
w.....................wwwwwwww
w...........................+w
w..........w.................w
w..........w...........3.....w
wA.........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.........+w.............A...w
w.......wwww.................w
w............................w
w.......2....................w
w.................3..........w
w............................w
w............................w
w.....................wwwwwwww
w....2.......................w
w.......wwww.................w
w.........gw.................w
w..........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w..........w.............A...w
w.......wwww.................w
w............................w
w..........3.................w
w............................w
wwwwwww......................w
w............................w
w.....................wwwwwwww
w....2................g......w
w.......wwww.................w
w.........+w...........1.....w
w..........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.........gw.............A...w
w.......wwww.................w
w............................w
w..........3.................w
w.....................wwwwwwww
wwwwwww.....................+w
w..................3.........w
w...2........................w
w............................w
w.......wwww.................w
w.......2..w...........1.....w
w..........w.................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwww
wA.......w..w
w..w........w
w...w...w.+ww
www.w2..wwwww
w.......w.g.w
w.2.........w
w.....2.....w
wwwwwwwwwwwww`,8:`wwwwwwwwwwwww
w.3.gw....1.w
w..www......w
w..........2w
w.......wwwww
w.......w+..w
w...w...w...w
wA..w.......w
wwwwwwwwwwwww`,9:`wwwwwwwwwwwww
w..2.ww....Aw
w....w......w
w.w.....wwwww
w+w........3w
w.w..wwwwwwww
w.......w...w
w...3w....wgw
wwwwwwwwwwwww`,10:`wwwwwwwwwwwww
w..........gw
w....w......w
w.w.w..1....w
w+w.........w
ww3..3..2...w
w..w..w.w.w.w
w...A.......w
wwwwwwwwwwwww`,11:`wwwwwwwwwwwww
w....w....g.w
w...www.....w
w.1..www....w
w..wwwwwww..w
w......w....w
w....w...1..w
wA...w+...1.w
wwwwwwwwwwwww`}},zelda_vgfmri4:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        goal  > Immovable img=colors/GREEN
        key   > Resource img=colors/ORANGE limit=1
        sword > OrientedFlicker singleton=True img=colors/WHITE
        avatar  > ShootAvatar   stype=sword frameRate=8 img=colors/DARKBLUE
        monsterQuick > RandomNPC cooldown=6 cons=6 img=colors/BROWN
        monsterNormal > RandomNPC cooldown=8 cons=8 img=colors/PINK
        monsterSlow > RandomNPC cooldown=10 cons=12 img=colors/GOLD
        wall > Immovable autotiling=true img=colors/DARKGRAY



    LevelMapping
        . > floor
        A > floor avatar
        g > floor goal
        + > floor key
        1 > floor monsterQuick
        2 > floor monsterNormal
        3 > floor monsterSlow
        w > floor wall

    InteractionSet
        avatar wall > stepBack
        goal avatar > killIfOtherHasMore resource=key limit=1
        monsterSlow sword > killSprite scoreChange=2
        monsterQuick sword > killSprite scoreChange=2
        monsterNormal sword > killSprite scoreChange=2

        monsterSlow monsterSlow > stepBack
        monsterSlow monsterQuick > stepBack
        monsterSlow monsterNormal > stepBack
        monsterQuick monsterNormal > stepBack
        monsterNormal monsterNormal > stepBack
        monsterQuick monsterQuick > stepBack

        avatar monsterSlow > killSprite scoreChange=-1
        avatar monsterQuick > killSprite scoreChange=-1
        avatar monsterNormal > killSprite scoreChange=-1

        avatar key > changeResource resource=key value=1 scoreChange=5
        key avatar > killSprite

        monsterQuick wall > stepBack
        monsterNormal wall > stepBack
        monsterSlow wall > stepBack

        sword wall > killSprite




        floor EOS > killSprite
        goal EOS > killSprite
        key EOS > killSprite
        sword EOS > killSprite
        avatar EOS > killSprite
        monsterQuick EOS > killSprite
        monsterNormal EOS > killSprite
        monsterSlow EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal win=True
        SpriteCounter stype=avatar win=False
        Timeout limit=600 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w.......g..w........w
w..........w........w
w........w.......+..w
w........w..........w
w........w..........w
w...................w
w...................w
w.....A.............w
w...................w
wwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w.......g..w........w
w...................w
w..........w........w
w..........w.....+..w
w...................w
w...................w
w........A.w........w
w...3..........w....w
w...................w
wwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w..3.......wg..3....w
w...................w
w...................w
w...................w
w...................w
w...........w.......w
w...........w.......w
w..3.......w....w...w
w......w+...w..A....w
wwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w..........wg.......w
w..........wwwww....w
w.......3...........w
w..............wwwwww
w..................+w
w..........w........w
w...................w
w..........w...3....w
wA.........w........w
wwwwwwwwwwwwwwwwwwwww`,4:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w.........+w....A...w
w.......www.........w
w.......2...........w
w........3..........w
w............wwwwwwww
w....2..............w
w.......wwww........w
w.........gw........w
w..........w........w
wwwwwwwwwwwwwwwwwwwww`,5:`wwwwwwwwwwwwwwwwwwwww
w..........w........w
w..........w.....A..w
w.......wwww........w
w..........3........w
w.............wwwwwww
w....2........g.....w
w.......wwww........w
w.........+w...1....w
w..........w........w
w..........w........w
wwwwwwwwwwwwwwwwwwwww`,6:`wwwwwwwwwwwwwwwwwwwww
w.........gw...A....w
w.......wwww........w
w..........3........w
wwwwwww...........+.w
w........3..........w
w...2...............w
w.......wwww........w
w.......2..w.....1..w
w..........w........w
w..........w........w
wwwwwwwwwwwwwwwwwwwww`,7:`wwwwwwwwwwwwwwwwwwwww
w...................w
wA...............w..w
w..w................w
w...w...w........+.ww
w...w...............w
www.w2..wwwwwwwwwwwww
w.......w...........w
w.......w....g......w
w.2.................w
w.....2.............w
wwwwwwwwwwwwwwwwwwwww`,8:`wwwwwwwwwwwwwwwwwwwww
w.3.gw....1.w.......w
w..www......w.......w
w...........w.......w
w...............2...w
w...................w
w.......wwwwwwwwwwwww
w.......w.....+.....w
w.......w...........w
w...w...w...........w
wA..w...............w
wwwwwwwwwwwwwwwwwwwww`}}},cs=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";hi();var hs="rdms_unit8_for_website/",fi=ReasonToPlayAssets.catalogueManifestUrl,ct=60;async function iw(w,e,{tries:t=3,baseDelayMs:r=250}={}){let i;for(let s=0;s<t;s++){try{let o=await fetch(w,e);if(o.ok||o.status<500&&o.status!==429)return o;i=new Error(`HTTP ${o.status}`)}catch(o){i=o}if(s<t-1){let o=r*Math.pow(2,s)+Math.random()*200;await new Promise(l=>setTimeout(l,o))}}throw i||new Error("fetch failed")}var ht=new URLSearchParams(window.location.search),xw=typeof window<"u"&&window.EMBED_CONFIG||null,ut=!!xw||ht.get("embed")==="1";ut&&document.body.classList.add("embed-mode");function $(w){return xw&&xw[w]!==void 0&&xw[w]!==null?String(xw[w]):ht.get(w)??null}function sw(w){return ReasonToPlayAssets.resolveRdmUrl(w)}function _e(w){let e=parseInt(w.replace("sub-",""),10);if(!Number.isFinite(e))throw new Error(`bad subject id: ${w}`);return e<=11?{section:"cohort3",vgfmri:"vgfmri3"}:{section:"cohort4",vgfmri:"vgfmri4"}}var gi={avoidgeorge:"avoidGeorge",plaqueattack:"plaqueAttack"};function Ee(w){return gi[w]||w}var vi={dsv32:"DeepSeek-V3.2",dsv4_flash:"DeepSeek-V4-Flash",dsv4_pro:"DeepSeek-V4-Pro",qwen35_9b:"Qwen3.5-9B",qwen35_27b:"Qwen3.5-27B",qwen35_35b_a3b:"Qwen3.5-35B-A3B",qwen35_122b_a10b:"Qwen3.5-122B-A10B"},pt={dsv32:"https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",dsv4_flash:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",dsv4_pro:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",qwen35_9b:"https://huggingface.co/Qwen/Qwen3.5-9B",qwen35_27b:"https://huggingface.co/Qwen/Qwen3.5-27B",qwen35_35b_a3b:"https://huggingface.co/Qwen/Qwen3.5-35B-A3B",qwen35_122b_a10b:"https://huggingface.co/Qwen/Qwen3.5-122B-A10B"};function Xw(w){return vi[w]||w}var mt=!!window.EMBED_CONFIG;function xe(w,e){if(!mt){w.textContent=`Layer ${e}`;return}let t=Xw(O.value)||"";w.dataset.fitModel=t,w.dataset.fitLayer=String(e),w.textContent=`${t} | Layer ${e}`,requestAnimationFrame(()=>dt(w))}function dt(w){if(!mt)return;let e=w.dataset.fitModel,t=w.dataset.fitLayer;!e||t==null||(w.textContent=`${e} | Layer ${t}`,(w.scrollHeight>w.clientHeight+1||w.scrollWidth>w.clientWidth+1)&&(w.textContent=`${e} | L${t}`))}var G=null,pw=null,m=null,f=null,Aw=null,ft=null,Jw={},Ae=null,ow=null,L=null,Ow="main",Y=new Map,Iw=!1,_=0,v=0,J=ct,Lw=!1,M=null,Z=2,S=w=>document.getElementById(w),K=S("select-subject"),H=S("select-game"),O=S("select-model"),B=S("select-stream"),D=S("btn-load"),ww=S("load-status"),lw=S("main-container"),gt=S("game-canvas"),ew=S("canvas-wrapper"),vt=S("play-indicator"),yi=S("conversation-panel"),N=S("conversation-content"),Zw=S("try-tab"),mw=S("game-status"),yt=S("btn-model-prev"),St=S("btn-model-next"),we=S("select-model-quick"),z=S("scrubber-front"),j=S("scrubber-back"),bt=S("scrubber-window"),kt=S("scrub-back-label"),_t=S("scrub-front-label"),Et=S("meta-label"),xt=S("btn-speed-up"),At=S("btn-speed-down"),Si=S("speed-value"),dw=[.25,.5,1,2,4],Ot=50,I=0,q=null,W=S("roi-grid"),It=S("btn-expand-all"),Mw=S("roi-picker-overlay"),Lt=S("roi-picker-groups"),bi="figures/brain_roi",ki={Frontal:["IFGtriang","IFGoperc","MFG","SFG","OFC"],Motor:["PreCG","SMA","PoCG","ROL"],Parietal:["IPG","AG","SMG","PCUN"],Visual:["IOG","MOG","SOG","FFG","MTG"],"Early Visual":["LING","CAL","CUN"],Striatal:["Caudate","Putamen","dStriatum"],Cerebellum:["Cerebellum"]},Mt={AG:"Angular Gyrus",CAL:"Calcarine Sulcus",Caudate:"Caudate",Cerebellum:"Cerebellum",CUN:"Cuneus",dStriatum:"Dorsal Striatum",FFG:"Fusiform Gyrus",IFGoperc:"IFG (oper.)",IFGtriang:"IFG (triang.)",IOG:"Inf. Occipital",IPG:"Inf. Parietal",LING:"Lingual",MFG:"Mid. Frontal",MOG:"Mid. Occipital",MTG:"Mid. Temporal",OFC:"Orbitofrontal",PCUN:"Precuneus",PoCG:"Postcentral",PreCG:"Precentral",Putamen:"Putamen",ROL:"Rolandic Oper.",SFG:"Sup. Frontal",SMA:"Supp. Motor",SMG:"Supramarginal",SOG:"Sup. Occipital"};function Rw(w,e){return`${bi}/thumb_brain_${w}_${e}.png`}var Rt=new Set;function _i(w){for(let e of w)for(let t of["front","side"]){let r=Rw(e,t);if(Rt.has(r))continue;Rt.add(r);let i=new Image;i.decoding="async",i.src=r}}var aw=new Map,Tw=new Map;function Oe(w,e,t){return`${w}/${e}/${t}`}function Ei(){let w=$("subject")||"sub-13",e=$("game")||"bait",t=$("model")||"qwen35_27b",r=Oe(w,e,t);if(aw.has(r)||Tw.has(r))return;let i=`${w}__${e}__${t}`,s=sw(`data/${i}.json`),o=sw(`data/${i}.bin`),l=(async()=>{try{let[c,a]=await Promise.all([iw(s),iw(o)]);if(!c.ok||!a.ok)return null;let n=await c.json(),h=new Uint8Array(await a.arrayBuffer());return aw.set(r,{meta:n,blob:h}),{meta:n,blob:h}}catch{return null}})();Tw.set(r,l)}var Tt=!1;async function xi(){if(Tt||(Tt=!0,!m||!G))return;let w=typeof navigator<"u"&&(navigator.connection||navigator.mozConnection||navigator.webkitConnection);if(w&&(w.saveData||w.effectiveType&&["slow-2g","2g","3g"].includes(w.effectiveType)))return;let e=m.meta.subject,t=m.meta.game,r=m.meta.model,i=G.units.filter(s=>s.subject===e&&s.game===t&&s.model!==r);for(let s of i){let o=Oe(e,t,s.model);if(!aw.has(o))try{let[l,c]=await Promise.all([sw(`data/${s.json}`),sw(`data/${s.bin}`)]),a={priority:"low"},[n,h]=await Promise.all([iw(l,a),iw(c,a)]);if(!n.ok||!h.ok)continue;let d=await n.json(),p=new Uint8Array(await h.arrayBuffer());aw.set(o,{meta:d,blob:p})}catch{}}}var Ct=new WeakMap,ee=null,Gt=[[68,1,84],[71,40,120],[62,74,137],[49,104,142],[38,130,142],[31,158,137],[53,183,121],[110,206,88],[181,222,43],[253,231,37]],Ai=[[5,48,97],[33,102,172],[67,147,195],[146,197,222],[209,229,240],[247,247,247],[253,219,199],[244,165,130],[214,96,77],[178,24,43],[103,0,31]];function Ie(w,e){if(e<=0)return w[0];if(e>=1)return w[w.length-1];let t=e*(w.length-1),r=Math.floor(t),i=t-r,s=w[r],o=w[r+1];return[Math.round(s[0]+(o[0]-s[0])*i),Math.round(s[1]+(o[1]-s[1])*i),Math.round(s[2]+(o[2]-s[2])*i)]}async function Oi(){let w=await sw("manifest.json"),[e,t]=await Promise.all([fetch(w),fetch(fi)]);if(!e.ok){ww.textContent=`Manifest fetch failed: ${e.status}`;return}G=await e.json(),pw=t.ok?await t.json():null,ww.textContent=`${G.units.length} units available`,Ii()}function Ii(){let w=[...new Set(G.units.map(e=>e.subject))].sort();K.innerHTML='<option value="">-- select --</option>';for(let e of w){let t=document.createElement("option");t.value=e,t.textContent=e,K.appendChild(t)}}function Bt(){H.innerHTML='<option value="">-- select --</option>',H.disabled=!0,O.innerHTML='<option value="">--</option>',O.disabled=!0,B.innerHTML='<option value="">--</option>',B.disabled=!0,D.disabled=!0;let w=K.value;if(!w)return;let e=[...new Set(G.units.filter(t=>t.subject===w).map(t=>t.game))].sort();if(e.length!==0){H.disabled=!1;for(let t of e){let r=document.createElement("option");r.value=t,r.textContent=t,H.appendChild(r)}}}function Nt(){O.innerHTML='<option value="">-- select --</option>',O.disabled=!0,B.innerHTML='<option value="">--</option>',B.disabled=!0,D.disabled=!0;let w=K.value,e=H.value;if(!w||!e)return;let t=G.units.filter(r=>r.subject===w&&r.game===e).map(r=>r.model).sort();if(t.length!==0){O.disabled=!1;for(let r of t){let i=document.createElement("option");i.value=r,i.textContent=Xw(r),O.appendChild(i)}}}function te(){B.innerHTML='<option value="">-- select --</option>',B.disabled=!0,D.disabled=!0;let w=O.value;if(!w||!G.model_specs[w])return;let e=G.model_specs[w].streams;B.disabled=!1;for(let t of e){let r=document.createElement("option");r.value=t,r.textContent=t,B.appendChild(r)}B.value=e.includes("main")?"main":e[0],D.disabled=!1}K.addEventListener("change",Bt),H.addEventListener("change",Nt),O.addEventListener("change",te),B.addEventListener("change",()=>{D.disabled=!(K.value&&H.value&&O.value&&B.value)});async function Le({preserveState:w=!1}={}){let e=K.value,t=H.value,r=O.value,i=B.value;if(!e||!t||!r||!i)return;D.disabled=!0,ww.textContent="Fetching unit...";let s=G.units.find(C=>C.subject===e&&C.game===t&&C.model===r);if(!s){ww.textContent=`No unit for ${e}/${t}/${r}`,D.disabled=!1;return}let o=!!M,l=m?.meta?.subject,c=m?.meta?.game,a=w&&l===e&&c===t,n=v,h=_,d=J,p=Lw,y=L,b=I;o&&U(!1);let g=Oe(e,t,r);Tw.has(g)&&(await Tw.get(g),Tw.delete(g));let k,V;if(aw.has(g)){let C=aw.get(g);k=C.meta,V=C.blob}else{let[C,Q]=await Promise.all([sw(`data/${s.json}`),sw(`data/${s.bin}`)]),[ue,pe]=await Promise.all([iw(C),iw(Q)]);if(!ue.ok)throw new Error(`meta fetch ${ue.status}`);if(!pe.ok)throw new Error(`bin fetch ${pe.status}`);k=await ue.json(),V=new Uint8Array(await pe.arrayBuffer()),aw.set(g,{meta:k,blob:V})}m={meta:k,blob:V},_i(k.rois),Ow=i,w&&l===e&&c===t?(_=Math.min(h,k.n_TR-1),v=Math.min(n,k.n_TR-1),J=d,Lw=p,L=y&&k.rois.includes(y)?y:k.rois[0],I=b):(_=0,v=0,J=ct,Lw=!1,L=k.rois[0],I=0),Y=new Map,a&&W.children.length>0&&Bi()?Ni():ie(),lw.classList.add("visible"),await new Promise(C=>requestAnimationFrame(C)),qi(k.n_TR,{reset:!a}),fw(),a&&f&&ow?(Qt(f),q=jt(f),I>=0&&f.states&&I<f.states.length?Gw(I):ne()):await Yi(e,t),Sw(),ww.textContent=`${e} / ${t} / ${r} (${i}) -- N=${k.n_TR}`,ss(),D.disabled=!1,o&&U(!0)}D.addEventListener("click",()=>Le({preserveState:!0}).catch(w=>{console.error(w),ww.textContent=`Load failed: ${w.message}`,D.disabled=!1}));function Li(w,e){let t=m.meta.best_layer[w];if(!t||t[e]==null)throw new Error(`best_layer missing for ROI=${w} stream=${e}`);return t[e]}function Mi(w,e){let t=m.meta,r=t.n_layers,i=t.streams.length,s=t.rois.indexOf(w),o=t.streams.indexOf(e);if(s<0||o<0)throw new Error(`unknown ROI/stream: ${w}/${e}`);let l=s*i*r+o*r;return t.similarity_pearson.slice(l,l+r)}function Pt(w,e,t){let r=new Float32Array(w.length);if(t===e)return r.fill(e),r;let i=(t-e)/255;for(let s=0;s<w.length;s++)r[s]=e+w[s]*i;return r}function Ri(w,e){let t=new Float32Array(e*e),r=0;for(let i=0;i<e-1;i++)for(let s=i+1;s<e;s++){let o=w[r++];t[i*e+s]=o,t[s*e+i]=o}return t}function $t(w){let e=m.blob,t=w.rdm,r=w.pca,i=e.subarray(t.offset,t.offset+t.length),s=e.subarray(r.offset,r.offset+r.length),o=Pt(i,t.qmin,t.qmax),l=Pt(s,r.qmin,r.qmax);return{rdm:Ri(o,m.meta.n_TR),pca:l,pcaShape:r.shape}}function Ti(w){return $t(m.meta.panels.human[w])}function Ci(w,e){let t=String(e),r=m.meta.panels.model[w][t];if(!r)throw new Error(`no model panel for stream=${w} layer=${e}`);return $t(r)}function Ht(w,e,t,r){let i=m.meta.n_TR,s=m.meta.n_pca_dim,{rdm:o,pca:l}=e,c=w.getBoundingClientRect(),a=Math.max(120,Math.floor(c.width)),n=Math.max(120,Math.floor(c.height));w.width=a,w.height=n;let h=w.getContext("2d");h.fillStyle="#fafafa",h.fillRect(0,0,a,n);let d=20,p=d,y=d,b=Math.min(a-d,n-d),g=p,k=y,V=b,C=b,Q=Math.max(1,r-t+1),ue=V/Q,pe=C/Q,nw=1/0,Bw=-1/0;for(let E=t;E<=r;E++)for(let R=E+1;R<=r;R++){let x=o[E*i+R];x<nw&&(nw=x),x>Bw&&(Bw=x)}(!isFinite(nw)||nw===Bw)&&(nw=0,Bw=1);let X=1/0,bw=-1/0;for(let E=t;E<=r;E++)for(let R=0;R<s;R++){let x=l[E*s+R];x<X&&(X=x),x>bw&&(bw=x)}(!isFinite(X)||X===bw)&&(X=0,bw=1);let cw=h.createImageData(Math.max(1,Math.floor(V)),Math.max(1,Math.floor(C))),hw=cw.width,Nw=cw.height;for(let E=0;E<Nw;E++){let R=t+Math.floor(E/Nw*Q);for(let x=0;x<hw;x++){let Hw=t+Math.floor(x/hw*Q),Dw=(o[R*i+Hw]-nw)/(Bw-nw),[Fw,Uw,Kw]=Ie(Ai,Math.max(0,Math.min(1,Dw))),P=(E*hw+x)*4;cw.data[P]=Fw,cw.data[P+1]=Uw,cw.data[P+2]=Kw,cw.data[P+3]=255}}h.putImageData(cw,g,k);let Pw=h.createImageData(hw,d);for(let E=0;E<d;E++){let R=Math.floor(E/d*s);for(let x=0;x<hw;x++){let Hw=t+Math.floor(x/hw*Q),Dw=(l[Hw*s+R]-X)/(bw-X),[Fw,Uw,Kw]=Ie(Gt,Math.max(0,Math.min(1,Dw))),P=(E*hw+x)*4;Pw.data[P]=Fw,Pw.data[P+1]=Uw,Pw.data[P+2]=Kw,Pw.data[P+3]=255}}h.putImageData(Pw,g,0);let $w=h.createImageData(d,Nw);for(let E=0;E<Nw;E++){let R=t+Math.floor(E/Nw*Q);for(let x=0;x<d;x++){let Hw=Math.floor(x/d*s),Dw=(l[R*s+Hw]-X)/(bw-X),[Fw,Uw,Kw]=Ie(Gt,Math.max(0,Math.min(1,Dw))),P=(E*d+x)*4;$w.data[P]=Fw,$w.data[P+1]=Uw,$w.data[P+2]=Kw,$w.data[P+3]=255}}if(h.putImageData($w,0,k),v>=t&&v<=r){let E=g+(v-t+.5)/Q*V,R=k+(v-t+.5)/Q*C;h.strokeStyle="rgba(246, 195, 80, 0.9)",h.lineWidth=1.5,h.beginPath(),h.moveTo(E,k),h.lineTo(E,k+C),h.moveTo(g,R),h.lineTo(g+V,R),h.stroke()}}function re(w){if(Y.has(w))return Y.get(w);let e=Li(w,Ow);return Y.set(w,e),e}function Gi(w){return m.meta.roi_n_voxels[m.meta.rois.indexOf(w)]}function Dt(){return Iw?m.meta.rois.slice():[L]}function ie(){ee&&ee.disconnect(),W.innerHTML="";for(let w of Dt())W.appendChild(Pi(w));ee=new IntersectionObserver(Ui,{root:null,rootMargin:"120px 0px",threshold:.01});for(let w of W.children)ee.observe(w)}function Bi(){let w=Dt(),e=Array.from(W.children).map(t=>t.dataset.roi);if(w.length!==e.length)return!1;for(let t=0;t<w.length;t++)if(w[t]!==e[t])return!1;return!0}function Ni(){for(let w of W.children){let e=w.dataset.roi,t=w.querySelector(".row-layer-strip");t&&Me(t,e);let r=w.querySelector(".layer-current-label");r&&xe(r,re(e)),w.dataset.dirty="1"}}function Pi(w){let e=document.createElement("div");e.className="roi-row",w===L&&e.classList.add("active"),e.dataset.roi=w,e.dataset.dirty="1";let t=document.createElement("div");t.className="roi-card roi-card-human";let r=document.createElement("div");r.className="roi-brain";let i=Mt[w]||w;r.innerHTML=`
    <div class="roi-brain-stack" role="button" tabindex="0"
         title="Choose a different brain region">
      <img class="brain-view" src="${Rw(w,"front")}" alt="${w} frontal">
      <img class="brain-view" src="${Rw(w,"side")}"  alt="${w} lateral">
    </div>
    <div class="roi-name" title="${w}">${i}</div>
    <div class="roi-meta">${w} &middot; ${Gi(w)} vox</div>
  `;let s=r.querySelector(".roi-brain-stack");s&&(s.addEventListener("click",p=>{p.stopPropagation(),Re(w)}),s.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),Re(w))})),t.appendChild(r);let o=document.createElement("div");o.className="panel-cell panel-human",o.innerHTML="<canvas></canvas>",t.appendChild(o),e.appendChild(t);let l=document.createElement("div");l.className="row-controls",l.innerHTML=`
    <button class="row-btn" data-act="up" title="Previous ROI">&#9650;</button>
    <button class="row-btn pick" data-act="pick" title="Choose ROI">&#9863;</button>
    <button class="row-btn" data-act="down" title="Next ROI">&#9660;</button>
  `,l.querySelector("[data-act=up]").addEventListener("click",p=>{p.stopPropagation(),Ut(w,-1)}),l.querySelector("[data-act=down]").addEventListener("click",p=>{p.stopPropagation(),Ut(w,1)}),l.querySelector("[data-act=pick]").addEventListener("click",p=>{p.stopPropagation(),Re(w)}),e.appendChild(l);let c=document.createElement("div");c.className="roi-card roi-card-model";let a=document.createElement("div");a.className="panel-cell panel-model",a.innerHTML="<canvas></canvas>",c.appendChild(a);let n=document.createElement("div");n.className="layer-strip-col";let h=document.createElement("div");h.className="row-layer-strip",Me(h,w);let d=document.createElement("div");return d.className="layer-current-label",xe(d,re(w)),n.appendChild(h),n.appendChild(d),c.appendChild(n),e.appendChild(c),e}var se=[[246,226,130],[240,165,60],[200,40,40]];function $i(w){w=Math.max(0,Math.min(1,w));let e=w*(se.length-1),t=Math.min(se.length-2,Math.floor(e)),r=e-t,i=se[t],s=se[t+1],o=Math.round(i[0]+(s[0]-i[0])*r),l=Math.round(i[1]+(s[1]-i[1])*r),c=Math.round(i[2]+(s[2]-i[2])*r);return`rgb(${o}, ${l}, ${c})`}function Me(w,e){w.innerHTML="";let t=Mi(e,Ow),r=m.meta.layer_indices,i=re(e),s=1/0,o=-1/0;for(let l=0;l<t.length;l++)t[l]<s&&(s=t[l]),t[l]>o&&(o=t[l]);for(let l=0;l<r.length;l++){let c=r[l],a=document.createElement("div");a.className="layer-block",c===i&&a.classList.add("active");let n=o===s?.5:(t[l]-s)/(o-s);a.style.background=$i(n),a.title=`L${c}: r=${t[l].toFixed(3)}`,a.addEventListener("click",h=>{h.stopPropagation(),Fi(e,c)}),w.appendChild(a)}}var Hi=7;function Di(w){let e=w.querySelector(".roi-card-model .panel-cell"),t=w.querySelector(".layer-strip-col"),r=w.querySelector(".row-layer-strip");if(!e)return;let i=e.offsetHeight;if(i){if(t&&(t.style.height=`${i}px`),t){let s=t.querySelector(".layer-current-label");s&&dt(s)}if(r){r.style.height=`${i}px`;let s=Math.max(20,i-6),o=1,l=m.meta.layer_indices.length,c=Math.max(2,(s-(l-1)*o)/l),a=Math.max(28,c*Hi);r.querySelectorAll(".layer-block").forEach(n=>{n.style.height=`${c}px`,n.style.width=`${a}px`})}}}function Fi(w,e){if(Y.get(w)===e)return;Y.set(w,e);let t=W.querySelector(`.roi-row[data-roi="${w}"]`);if(!t)return;let r=t.querySelector(".layer-current-label");r&&xe(r,e),Me(t.querySelector(".row-layer-strip"),w),Ce(t,{onlyModel:!0})}function Ft(w){if(w!==L)if(L=w,!Iw)ie(),oe();else{W.querySelectorAll(".roi-row").forEach(t=>t.classList.toggle("active",t.dataset.roi===L));let e=W.querySelector(`.roi-row[data-roi="${L}"]`);e&&e.scrollIntoView({block:"nearest",behavior:"smooth"})}}function Ut(w,e){let t=m.meta.rois,r=((t.indexOf(w)+e)%t.length+t.length)%t.length;Ft(t[r])}function Re(w){Lt.innerHTML="";let e=new Set(m.meta.rois);for(let[t,r]of Object.entries(ki)){let i=r.filter(l=>e.has(l));if(i.length===0)continue;let s=document.createElement("div");s.className="roi-picker-group",s.innerHTML=`<h4>${t}</h4><div class="roi-picker-items"></div>`;let o=s.querySelector(".roi-picker-items");for(let l of i){let c=document.createElement("button");c.className="roi-picker-item"+(l===w?" active":"");let a=Mt[l]||l;c.innerHTML=`
        <div class="picker-views">
          <img class="brain-view" src="${Rw(l,"front")}" alt="${l} frontal">
          <img class="brain-view" src="${Rw(l,"side")}"  alt="${l} lateral">
        </div>
        <span class="name" title="${l}">${a}</span>
      `,c.addEventListener("click",()=>{Te(),Ft(l)}),o.appendChild(c)}Lt.appendChild(s)}Mw.classList.add("open")}function Te(){Mw.classList.remove("open")}Mw.addEventListener("click",w=>{w.target===Mw&&Te()}),window.addEventListener("keydown",w=>{w.key==="Escape"&&(Mw.classList.contains("open")&&Te(),He())}),It.addEventListener("click",()=>{Iw=!Iw,It.textContent=Iw?"Collapse to active ROI":"View all Brain Regions",ie(),oe()});function Ui(w){for(let e of w)Ct.set(e.target,e.isIntersecting),e.isIntersecting&&e.target.dataset.dirty==="1"&&(Ce(e.target),e.target.dataset.dirty="")}function Ce(w,{onlyModel:e=!1}={}){if(!m)return;Di(w);let t=Math.min(_,v),r=Math.max(_,v),i=w.dataset.roi,s=w.querySelectorAll(".panel-cell canvas");e||Ht(s[0],Ti(i),t,r);let o=re(i);Ht(s[1],Ci(Ow,o),t,r)}var Ge=!1;function oe(){Ge||(Ge=!0,requestAnimationFrame(()=>{Ge=!1,Ki()}))}function Ki(){if(m){for(let w of W.children)Ct.get(w)?Ce(w):w.dataset.dirty="1";Cw(),gw(),Wi()}}function fw(){oe()}function zi(w){let e=document.getElementById("scrubber-marks");e.innerHTML="";let t=m.meta.tr_meta;if(!(!t||!t.run||w<=1))for(let r=0;r<w;r++){let i=r===0,s=i||t.run[r]!==t.run[r-1],o=i||t.level[r]!==t.level[r-1];if(!s&&!o)continue;let l=s?"run":"level",c=s?`R${t.run[r]}L${t.level[r]}`:`L${t.level[r]}`,a=document.createElement("div");a.className=`mark ${l}`,a.style.left=`${r/(w-1)*100}%`,a.innerHTML=`<div class="stick"></div><div class="lab">${c}</div>`,e.appendChild(a)}}function qi(w,{reset:e=!0}={}){let t=Math.max(0,w-1);z.min=0,z.max=t,j.min=0,j.max=t,e?(v=0,_=0):(v=Math.min(v,t),_=Math.min(_,t)),z.value=v,j.value=_,zi(w),Cw(),gw()}function Cw(){if(!m)return;let w=m.meta.n_TR,e=z.parentElement.clientWidth;if(!e||w<=1)return;let t=8,r=e-t*2,i=t+_/(w-1)*r,s=t+v/(w-1)*r;kt.textContent=`FROM ${_}`,_t.textContent=`TR ${v} / ${w-1}`,kt.style.left=`${i}px`,_t.style.left=`${s}px`,Et&&(Et.textContent="")}function gw(){if(!m)return;let w=m.meta.n_TR,e=z.parentElement.clientWidth;if(!e||w<=1)return;let t=8,r=e-t*2,i=t+_/(w-1)*r,s=t+v/(w-1)*r,o=Math.min(i,s),l=Math.abs(s-i);bt.style.left=`${o}px`,bt.style.width=`${l}px`}function F(w,{reason:e}={}){if(!m)return;let t=m.meta.n_TR-1;v=Math.max(0,Math.min(t,w)),e!=="noFromFollow"&&(_=Math.max(0,v-J)),z.value=v,j.value=_,fw(),Sw(),ne(),ae()}function Be(w,{fromUser:e=!1}={}){if(!m)return;let t=m.meta.n_TR-1;_=Math.max(0,Math.min(t,w));let r=7,i=Math.max(0,v-r);_>i&&(_=i),e&&v>=r&&(J=v-_,Lw=!0),j.value=_,fw()}z.addEventListener("input",()=>{F(parseInt(z.value,10))}),j.addEventListener("input",()=>{Be(parseInt(j.value,10),{fromUser:!0})});var Ne=document.getElementById("scrubber-track-wrap");function le(w){let e=Ne.getBoundingClientRect(),t=6,r=Math.max(1,e.width-t*2),i=(w-e.left-t)/r,s=m.meta.n_TR;return Math.max(0,Math.min(s-1,Math.round(i*(s-1))))}Ne.addEventListener("mousedown",w=>{if(!m||w.target.tagName==="INPUT")return;w.preventDefault(),F(le(w.clientX));let e=r=>{F(le(r.clientX))},t=()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)};document.addEventListener("mousemove",e),document.addEventListener("mouseup",t)}),Ne.addEventListener("touchstart",w=>{if(!m||w.target.tagName==="INPUT")return;w.preventDefault();let e=w.touches[0];F(le(e.clientX));let t=i=>{i.preventDefault(),F(le(i.touches[0].clientX))},r=()=>{document.removeEventListener("touchmove",t),document.removeEventListener("touchend",r),document.removeEventListener("touchcancel",r)};document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",r),document.addEventListener("touchcancel",r)},{passive:!1});function U(w){if(w){if(M)return;f&&f.states&&f.states.length>0?Qi():M=setInterval(()=>{if(!m)return;let e=m.meta.n_TR-1;if(v>=e){U(!1);return}F(v+1)},1e3/Z)}else M&&(clearTimeout(M),clearInterval(M),M=null);ae()}function ae(){let w=document.getElementById("btn-play-pause");if(!w)return;let e=!!M,t=!e&&Kt();w.dataset.state=e?"playing":t?"ended":"paused";let r=e?"Pause":t?"Replay":"Play";w.setAttribute("aria-label",r),w.title=r}function Kt(){return f&&f.states&&f.states.length>0?I>=f.states.length-1:m?v>=m.meta.n_TR-1:!1}function ji(){f&&f.states&&f.states.length>0?(I=0,v=0,_=0,z.value=0,j.value=0,Gw(0),fw(),Sw(),Cw(),gw()):m&&F(0)}function Wi(){let w=document.getElementById("open-rep-viewer");if(!w||!m)return;let e=m.meta,t=new URLSearchParams;t.set("subject",e.subject),t.set("game",e.game),t.set("model",e.model),t.set("stream",Ow),L&&t.set("roi",L),L&&Y.has(L)&&t.set("layer",String(Y.get(L))),t.set("tr",String(v)),w.href=`representation.html?${t.toString()}`}var zt=document.getElementById("btn-play-pause");zt&&(zt.addEventListener("click",w=>{if(w.stopPropagation(),!M&&Kt()){ji(),U(!0);return}U(!M)}),ae());function Qi(){let w=f.states,e=()=>{if(!M)return;if(I>=w.length-1){U(!1);return}I+=1,Gw(I),Sw();let t=qt(I);t!==v&&(v=t,(!Lw||v-_>J)&&(_=Math.max(0,v-J)),z.value=v,j.value=_,oe()),Cw(),gw(),M=setTimeout(e,Ot/Z)};M=setTimeout(e,0)}function qt(w){if(!q||!f||!f.steps)return v;let e=q[w];if(e<0)return 0;let t=f.steps[e],r=(w-(t.state_index??t.frame_idx??0))*(Ot/1e3);return Ji(t.realworld_ts+r)}function jt(w){let e=new Int32Array(w.states.length).fill(-1);if(!w.steps||w.steps.length===0)return e;let t=-1;for(let r=0;r<w.states.length;r++){for(;t+1<w.steps.length&&(w.steps[t+1].state_index??w.steps[t+1].frame_idx??0)<=r;)t++;e[r]=t}return e}function Pe(w){w=Math.max(0,Math.min(dw.length-1,w)),Z=dw[w];let e=Z===Math.floor(Z)?`${Z}x`:`${Z}x`;Si.textContent=e,At.disabled=w===0,xt.disabled=w===dw.length-1,M&&(U(!1),U(!0))}function Wt(){let w=dw.indexOf(Z);return w<0?dw.indexOf(1):w}xt.addEventListener("click",()=>Pe(Wt()+1)),At.addEventListener("click",()=>Pe(Wt()-1)),Pe(dw.indexOf(2)),window.addEventListener("keydown",w=>{if(m){if(w.key===" "||w.code==="Space"){let e=w.target;if(e&&(e.isContentEditable||e.tagName==="INPUT"&&e.type!=="range"||e.tagName==="TEXTAREA"))return;U(!M),w.preventDefault();return}w.target.tagName==="INPUT"||w.target.tagName==="SELECT"||(w.key==="ArrowLeft"?(w.shiftKey?Be(_-1,{fromUser:!0}):F(v-1),w.preventDefault()):w.key==="ArrowRight"?(w.shiftKey?Be(_+1,{fromUser:!0}):F(v+1),w.preventDefault()):w.key==="Home"?(F(0),w.preventDefault()):w.key==="End"&&(F(m.meta.n_TR-1),w.preventDefault()))}}),window.addEventListener("resize",()=>{m&&(gw(),vw(),fw())});function vw(){let w=(ew&&ew.classList.contains("vgfmri3-pad")?ew.offsetHeight:gt.offsetHeight)||400;lw&&lw.style.setProperty("--card-h",`${w}px`),yi.style.setProperty("--canvas-h",`${w}px`);let e=document.getElementById("scrubber-row"),t=e?e.offsetHeight:76,r=document.getElementById("model-switcher");if(r&&r.style.setProperty("--scrub-h",`${t}px`),Zw){let i=(Zw.textContent||"").length,s=i*11+16,o=Math.max(7,Math.min(14,(w-16)/i));Zw.style.fontSize=w<s?`${o.toFixed(1)}px`:"14px"}}async function Yi(w,e){if(f=null,N.innerHTML='<em style="color:#888">Looking up replay...</em>',!pw){N.innerHTML='<em style="color:#888">No catalogue manifest -- replays unavailable.</em>',vw();return}let{section:t,vgfmri:r}=_e(w),i=`${Ee(e)}_${r}`,s=pw[t]?.[w]?.replays?.[i];if(!s){N.innerHTML=`<em style="color:#888">No replay listed for ${w}/${i}.</em>`,vw();return}let o=await ReasonToPlayAssets.resolveReplayUrl(s),l=await iw(o);if(!l.ok){N.innerHTML=`<em style="color:#888">Replay fetch failed: ${l.status}</em>`,vw();return}let c=o.split("?")[0].endsWith(".gz"),a;if(c){let p=new DecompressionStream("gzip");a=await new Response(l.body.pipeThrough(p)).text()}else a=await l.text();let n=JSON.parse(a);pi(n),f=n;let h=typeof n.game=="string"&&n.game.endsWith("_vgfmri3");ew.classList.toggle("vgfmri3-pad",h),h||(ew.style.background=""),Aw||(Aw=new ui(gt,24));let d=n.game_description||nt[n.game].description;ft=new di().parseGame(d),Jw={},Ae=null,Qt(n),q=jt(n),I=0,ts(n),vw(),ne()}function Qt(w){let e=m.meta.tr_meta?.unix_ts;if(!e)throw new Error("tr_meta.unix_ts missing. Re-export with export_rsa_for_web.py rev that writes tr_unix_ts alongside tr_run_seq/tr_level_seq/tr_play_seq.");if(!w.steps[0]?.realworld_ts)throw new Error("Replay steps lack realworld_ts; cannot align.");let t=new Float64Array(w.steps.length),r=new Int32Array(w.steps.length);for(let a=0;a<w.steps.length;a++)t[a]=w.steps[a].realworld_ts,r[a]=a;let i=[...r].sort((a,n)=>t[a]-t[n]),s=new Float64Array(i.length),o=new Int32Array(i.length);for(let a=0;a<i.length;a++)s[a]=t[i[a]],o[a]=i[a];function l(a,n){let h=0,d=a.length;for(;h<d;){let p=h+d>>>1;a[p]<n?h=p+1:d=p}return h}let c=m.meta.n_TR;ow=new Int32Array(c);for(let a=0;a<c;a++){let n=e[a],h=l(s,n),d=-1,p=1/0;for(let y of[h-1,h]){if(y<0||y>=s.length)continue;let b=Math.abs(s[y]-n);b<p&&(p=b,d=o[y])}if(d<0)throw new Error(`No replay step found near TR ${a} unix_ts ${n}`);ow[a]=d}}function Vi(w){if(Jw[w])return Jw[w];let e=nt[f.game].levels[w];if(!e)throw new Error(`Level ${w} not found for game ${f.game}`);let t=ft.buildLevel(e);return Jw[w]=t,t}function Xi(w,e){let t={};for(let[r,i]of Object.entries(w.sprites))t[r]=i.map(s=>({id:s.id,key:s.key,x:s.col*e,y:s.row*e,w:e,h:e,alive:s.alive,resources:s.resources||{},speed:s.speed,cooldown:s.cooldown,orientation:s.orientation,_age:s._age,lastmove:s.lastmove}));return{score:w.score,time:w.time,sprites:t}}function Gw(w){if(!Aw||!f)return;let e=f.states?.[w];if(!e)return;let t=q?q[w]:-1,r=e.level??(t>=0?f.steps[t]:null)?.level??0,i=Vi(r);if(i!==Ae&&(Aw.resize(i.width,i.height),Ae=i,ew.classList.contains("vgfmri3-pad"))){let s=i.sprite_registry._liveSpritesByKey.wall,o=s&&s[0]&&s[0].color;o&&(ew.style.background=`rgb(${o[0]},${o[1]},${o[2]})`)}i.setGameState(Xi(e,i.block_size)),i.ended=e.ended??!1,i.won=e.won??!1,i.lose=e.lose??!1,i.timeout=e.timeout??!1,i.score=e.score??0,i.time=w,Aw.render(i),mw&&(i.won?(mw.textContent="WIN",mw.className="game-status visible win"):i.lose||i.timeout?(mw.textContent=i.timeout?"LOSE (timeout)":"LOSE",mw.className="game-status visible lose"):mw.className="game-status"),vw()}function ne(){if(!f||!ow)return;let w=ow[v];if(w<0)return;let e=f.steps[w],t=e.state_index??e.frame_idx??0;I=t,Gw(t)}function Ji(w){let e=m.meta.tr_meta.unix_ts,t=0,r=e.length;for(;t<r;){let s=t+r>>>1;e[s]<w?t=s+1:r=s}let i=t;return t>0&&(t===e.length||w-e[t-1]<e[t]-w)&&(i=t-1),Math.max(0,Math.min(e.length-1,i))}function ce(w){return w&&typeof w.action=="string"&&w.action.startsWith("_")}function Zi(w,e,t,r,i){let s=null,o=-1;for(let a=t-1;a>=0;a--)if(!ce(e[a])){s=e[a],o=a;break}if(!s||s.level===r&&s.attempt===i)return;let l="";s.won?l="won":s.lose?l="died":s.timeout&&(l="timeout");let c=0;for(let a=o;a>=0;a--){let n=e[a];if(!ce(n))if(n.level===s.level&&n.attempt===s.attempt)c+=n.reward??0;else break}l&&(w.push(`--- TRIAL ENDED outcome: ${l}, score: ${c} ---`),w.push("")),w.push(`--- NEW TRIAL (Level ${r}, Attempt ${i}) ---`),w.push("")}function ws(w,e){let t=w[e];if(t.user_prompt!==void 0)return t.user_prompt;let r=[];return Zi(r,w,e,t.level,t.attempt),r.push(`# Step ${t.step} (Level ${t.level}, Attempt ${t.attempt})`),r.push(""),r.push(t.formatted_obs??""),r.join(`
`)}function es(w,e){let t=document.createDocumentFragment(),r=document.createElement("div");r.className="msg msg-user",r.dataset.stepIdx=e;let i=document.createElement("div");i.className="msg-label",i.textContent=`User (Step ${w.step})`,r.appendChild(i);let s=document.createElement("div");s.textContent=ws(f.steps,e),r.appendChild(s),t.appendChild(r);let o=w.response||{},l=document.createElement("div");l.className="msg msg-assistant",l.dataset.stepIdx=e;let c=document.createElement("div");c.className="msg-label",c.textContent=`Assistant (Step ${w.step})`,l.appendChild(c);let a=[];o.rationale&&a.push(o.rationale),o.action&&a.push(`Action: ${o.action}`);let n=document.createElement("div");return n.textContent=a.join(`

`)||"--",l.appendChild(n),t.appendChild(l),t}N.addEventListener("click",w=>{let e=w.target.closest(".msg[data-step-idx]");if(!e)return;let t=parseInt(e.dataset.stepIdx,10);if(!Number.isFinite(t)||!f||!f.steps||!f.steps[t])return;let r=f.steps[t],i=r.state_index??r.frame_idx??0;M&&U(!1);let s=qt(i);F(s),I=i,Gw(i),Sw()});function ts(w){if(N.innerHTML="",$e=-1,yw=-1,(w.steps||[]).length===0){N.innerHTML='<em style="color:#888">Replay has no steps.</em>';return}if(w.system_prompt){let e=document.createElement("div");e.className="msg msg-system";let t=document.createElement("div");t.className="msg-label",t.textContent="System",e.appendChild(t);let r=document.createElement("div");r.textContent=w.system_prompt,e.appendChild(r),N.appendChild(e)}}var yw=-1;function rs(w,e){if(!f||!f.steps)return 0;let t=0;for(let r=w;r<=e;r++)ce(f.steps[r])||t++;return t}function is(w){if(!(!f||!f.steps)&&w!==yw){if(w>yw)for(let e=yw+1;e<=w;e++)ce(f.steps[e])||N.appendChild(es(f.steps[e],e));else{let e=rs(w+1,yw);for(let t=0;t<e*2;t++)N.removeChild(N.lastChild)}yw=w}}var $e=-1;function Sw(){if(!f||!f.steps)return;let w=-1;q&&I>=0&&I<q.length?w=q[I]:ow&&(w=ow[v]),!(w<0)&&(is(w),w!==$e&&($e=w,N.querySelectorAll(".msg").forEach(e=>{e.classList.toggle("active",Number(e.dataset.stepIdx)===w)}),N.scrollTop=N.scrollHeight))}ew.addEventListener("click",w=>{m&&(w.target.closest("#try-tab")||(w.stopPropagation(),U(!M),vt.classList.add("flash"),setTimeout(()=>vt.classList.remove("flash"),350)))}),Zw.addEventListener("click",w=>{if(w.stopPropagation(),!m)return;let e=m.meta.subject,{section:t,vgfmri:r}=_e(e),i=`${Ee(m.meta.game)}_${r}`,s=0;if(f&&q){let c=q[I];c>=0&&(s=f.steps[c]?.level??0)}let o=`interactive-gameplay.html?game=${encodeURIComponent(i)}&level=${s}`,l=pw?.[t]?.[e]?.replays?.[i];l&&(o+=`&replay=${encodeURIComponent(l)}`),window.open(o,"_blank")});function he(){return!G||!K.value||!H.value?[]:G.units.filter(w=>w.subject===K.value&&w.game===H.value).map(w=>w.model).sort()}function ss(){we&&(we.textContent=Xw(O.value)||"--");let w=he(),e=w.indexOf(O.value);yt.disabled=e<=0,St.disabled=e<0||e>=w.length-1}function os(){let w=document.getElementById("model-picker-overlay"),e=document.getElementById("model-picker-items");if(!w||!e)return;e.innerHTML="";let t=he();for(let r of t){let i=document.createElement("div");i.className="model-picker-item"+(r===O.value?" active":"");let s=document.createElement("button");if(s.type="button",s.className="name-btn",s.textContent=Xw(r),s.addEventListener("click",()=>{He(),De(r)}),i.appendChild(s),pt[r]){let o=document.createElement("a");o.className="hf-link",o.href=pt[r],o.target="_blank",o.rel="noopener noreferrer",o.textContent="Hugging Face",o.addEventListener("click",l=>l.stopPropagation()),i.appendChild(o)}e.appendChild(i)}w.classList.add("open")}function He(){let w=document.getElementById("model-picker-overlay");w&&w.classList.remove("open")}{let w=document.getElementById("model-picker-overlay");w&&w.addEventListener("click",e=>{e.target===w&&He()}),we&&we.addEventListener("click",e=>{e.stopPropagation(),os()})}function De(w){!w||w===O.value||(O.value=w,te(),Le({preserveState:!0}).catch(e=>{console.error(e),ww.textContent=`Switch failed: ${e.message}`}))}yt.addEventListener("click",()=>{let w=he(),e=w.indexOf(O.value);e>0&&De(w[e-1])}),St.addEventListener("click",()=>{let w=he(),e=w.indexOf(O.value);e>=0&&e<w.length-1&&De(w[e+1])});async function ls(){Ei(),await Oi();let w=$("subject")||"sub-13",e=$("game")||"bait",t=$("model")||"qwen35_27b",r=$("stream")||"main";if(!ut&&G&&pw){let i=e.toLowerCase();if(!G.units.some(s=>s.subject===w&&s.game.toLowerCase()===i))try{let{section:s,vgfmri:o}=_e(w),l=`${Ee(i)}_${o}`,c=pw[s]?.[w]?.replays?.[l];if(c){window.location.replace(`replay.html?grid-key=${encodeURIComponent(c)}`);return}}catch{}}if([...K.options].some(i=>i.value===w)&&(K.value=w,Bt()),[...H.options].some(i=>i.value===e)&&(H.value=e,Nt()),[...O.options].some(i=>i.value===t))O.value=t,te();else{let i=[...O.options].map(s=>s.value).find(s=>s&&s!=="");i&&(O.value=i,te())}if([...B.options].some(i=>i.value===r)&&(B.value=r,D.disabled=!1),!D.disabled)try{await Le(),as(),ae()}catch(i){console.error(i),ww.textContent=`Default load failed: ${i.message}`}}function as(){if(!m)return;let w=$("roi"),e=$("layer"),t=$("level"),r=$("episode"),i=!1;if(w&&m.meta.rois.includes(w)&&w!==L&&(L=w,i=!0),e!=null){let l=parseInt(e,10);Number.isFinite(l)&&m.meta.layer_indices.includes(l)&&(Y.set(L,l),i=!0)}i&&ie();let s=$("tr"),o=-1;if(s!=null){let l=parseInt(s,10);Number.isFinite(l)&&(o=Math.max(0,Math.min(m.meta.n_TR-1,l)))}else if(t!=null&&r!=null){let l=parseInt(t,10),c=parseInt(r,10),a=m.meta.tr_meta;if(a&&a.level&&a.play){let n=[];for(let h=0;h<m.meta.n_TR;h++){if(a.level[h]!==l)continue;let d=a.play[h],p=n.indexOf(d);if(p<0&&(n.push(d),p=n.length-1),p===c){o=h;break}}}}o>=0&&(v=o,_=Math.max(0,v-J),z.value=v,j.value=_,Cw(),gw()),fw(),ne(),Sw(),Vt()}var Yt=!1;function Vt(){if(Yt||!m||!lw||!f||!f.states||f.states.length===0||!ns(lw))return;Yt=!0,U(!0);let w=()=>xi().catch(()=>{});typeof requestIdleCallback=="function"?requestIdleCallback(w,{timeout:5e3}):setTimeout(w,1500)}function ns(w){let e=w.getBoundingClientRect(),t=window.innerHeight||document.documentElement.clientHeight;return e.top<t&&e.bottom>0}var Xt=typeof IntersectionObserver<"u"?new IntersectionObserver(w=>{for(let e of w)e.isIntersecting&&Vt()},{threshold:.15}):null;Xt&&lw&&Xt.observe(lw),ls()})();
