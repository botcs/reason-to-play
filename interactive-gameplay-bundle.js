// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var Vw=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},a=new Vw,mw=class D{constructor(e,t,r,i){this.x=e,this.y=t,this.w=r,this.h=i}static fromPosSize(e,t){return new D(e[0],e[1],t[0],t[1])}get left(){return this.x}set left(e){this.x=e}get top(){return this.y}set top(e){this.y=e}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(e,t){return typeof e=="object"&&e!==null?new D(this.x+e.x,this.y+e.y,this.w,this.h):new D(this.x+e,this.y+t,this.w,this.h)}copy(){return new D(this.x,this.y,this.w,this.h)}colliderect(e){return this.x<e.x+e.w&&this.x+this.w>e.x&&this.y<e.y+e.h&&this.y+this.h>e.y}collidelistall(e){let t=[];for(let r=0;r<e.length;r++)this.colliderect(e[r].rect||e[r])&&t.push(r);return t}contains(e){return e.x>=this.x&&e.y>=this.y&&e.x+e.w<=this.x+this.w&&e.y+e.h<=this.y+this.h}equals(e){return this.x===e.x&&this.y===e.y&&this.w===e.w&&this.h===e.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}},d=class Qw{constructor(...e){this.keys=Object.freeze([...e].sort())}asVector(){let e=0,t=0;for(let r of this.keys)r==="LEFT"&&(e-=1),r==="RIGHT"&&(e+=1),r==="UP"&&(t-=1),r==="DOWN"&&(t+=1);return{x:e,y:t}}equals(e){if(!(e instanceof Qw)||this.keys.length!==e.keys.length)return!1;for(let t=0;t<this.keys.length;t++)if(this.keys[t]!==e.keys[t])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},b={NOOP:new d,UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),SPACE:new d("SPACE"),SPACE_RIGHT:new d("SPACE","RIGHT"),SPACE_LEFT:new d("SPACE","LEFT")},Jw=b.NOOP,uw=[129,199,132],X=[25,118,210],V=[211,47,47],fw=[69,90,100],J=[250,250,250],Zw=[109,76,65],gw=[55,71,79],dw=[230,81,0],we=[255,245,157],ee=[255,138,128],te=[255,196,0],re=[255,82,82],ie=[255,112,67],se=[144,202,249],oe=[185,246,202],le=[207,216,220],ae=[68,90,100],ne=[1,87,155],ce=[92,107,192],he=[200,150,220],pe=[255,230,230],Sw={GREEN:uw,BLUE:X,RED:V,GRAY:fw,WHITE:J,BROWN:Zw,BLACK:gw,ORANGE:dw,YELLOW:we,PINK:ee,GOLD:te,LIGHTRED:re,LIGHTORANGE:ie,LIGHTBLUE:se,LIGHTGREEN:oe,LIGHTGRAY:le,DARKGRAY:ae,DARKBLUE:ne,PURPLE:ce,LIGHTPURPLE:he,LIGHTPINK:pe},yw={x:0,y:-1},vw={x:0,y:1},Z={x:-1,y:0},I={x:1,y:0},B=[yw,Z,vw,I];function ww(w,e){return w.x===e.x&&w.y===e.y}function me(w){return Math.sqrt(w.x*w.x+w.y*w.y)}function _(w){let e=me(w);return e>0?{x:w.x/e,y:w.y/e}:{x:1,y:0}}var kw=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let r;if(e.asVector?r=e.asVector():r=e,ww(r,{x:0,y:0}))return;w._updatePosition(r,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}},ue=Sw,y=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:r,size:i=[1,1],color:s,speed:o,cooldown:l,physicstype:h,rng:n,img:c,resources:p,...f}=w;this.key=e,this.id=t;let m=Array.isArray(i)?i:[i,i];this.rect=new mw(r[0],r[1],m[0],m[1]),this.lastrect=this.rect,this.alive=!0;let g=h||this.constructor.physicstype||kw;if(this.physics=new g(m),this.speed=o??this.constructor.speed,this.cooldown=l??this.constructor.cooldown,this.img=c||null,this.color=s||this.constructor.color,this.img&&this.img.startsWith("colors/")){let S=this.img.split("/")[1],u=ue[S];u&&(this.color=u)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(p?{...p}:{},{get(S,u){return typeof u=="string"&&!(u in S)&&u!=="toJSON"&&u!=="then"&&u!==Symbol.toPrimitive&&u!==Symbol.toStringTag&&u!=="inspect"&&u!=="constructor"&&u!=="__proto__"?0:S[u]},set(S,u,k){return S[u]=k,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[S,u]of Object.entries(f))this[S]=u}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,r;if(e==null){let i=this.speed||0;t=w.x*i,r=w.y*i}else t=w.x*e,r=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:r}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},G=class extends y{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},fe=class extends y{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}},ge=class extends y{static color=fw;static is_static=!0},de=class extends y{static color=V},Se=class extends G{static is_static=!0},bw=class extends y{static color=V;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},H=class extends y{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||I)}},_w=class extends H{static speed=1},Ew=class extends H{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};Ew.limit=1;var ew=class extends y{static stype=null},ye=class extends ew{static is_static=!0;static is_stochastic=!0;static color=X},tw=class extends ew{static color=gw;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},Aw=class extends y{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=B[Math.floor(w.randomGenerator.random()*B.length)];this.physics.activeMovement(this,e)}},xw=class extends Aw{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],r=w.getSprites(this.stype);for(let i of r){let s=this.physics.distance(this.rect,i.rect);s<e?(e=s,t=[i]):s===e&&t.push(i)}return t}_movesToward(w,e){let t=[],r=this.physics.distance(this.rect,e.rect);for(let i of B){let s=this.rect.move(i),o=this.physics.distance(s,e.rect);this.fleeing&&r<o&&t.push(i),!this.fleeing&&r>o&&t.push(i)}return t}update(w){y.prototype.update.call(this,w);let e=[];for(let r of this._closestTargets(w))e.push(...this._movesToward(w,r));e.length===0&&(e=[...B]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},ve=class extends xw{constructor(w){super({...w,fleeing:!0})}},ke=class extends tw{static color=dw;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||I),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),tw.prototype.update.call(this,w)}},be=class extends _w{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let e;this.orientation.x>0?e=1:this.orientation.x<0?e=-1:e=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:e,y:0})}super.update(w)}},_e=class extends H{static is_static=!0;static color=X;static strength=1;static draw_arrow=!0},Ee=class qw extends bw{static spreadprob=1;update(e){if(super.update(e),this._age===2)for(let t of B)e.randomGenerator.random()<(this.spreadprob||qw.spreadprob)&&e.addSpriteCreation(this.name,[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h])}};function K(w,e){let t=[...e.active_keys].sort();for(let r=Math.max(3,t.length);r>=0;r--)for(let i of Ae(t,r)){let s=i.join(",");if(w._keysToAction.has(s))return w._keysToAction.get(s)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Ae(w,e){if(e===0)return[[]];if(w.length===0)return[];let t=[];function r(i,s){if(s.length===e){t.push([...s]);return}for(let o=i;o<w.length;o++)s.push(w[o]),r(o+1,s),s.pop()}return r(0,[]),t}function Ow(w){let e=new Map;for(let t of Object.values(w)){let r=[...t.keys].sort().join(",");e.set(r,t)}return e}var Iw=class extends y{static color=J;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=Ow(e)}static declarePossibleActions(){return{UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){y.prototype.update.call(this,w);let e=K(this,w);e.equals(Jw)||this.physics.activeMovement(this,e)}},F=class extends y{static color=J;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||I);let e=this.constructor.declarePossibleActions();this._keysToAction=Ow(e)}static declarePossibleActions(){return{UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){let e=this.orientation;this.orientation={x:0,y:0},y.prototype.update.call(this,w);let t=K(this,w);t&&this.physics.activeMovement(this,t);let r=this.lastdirection;Math.abs(r.x)+Math.abs(r.y)!==0?this.orientation=r:this.orientation=e}},xe=class extends F{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=F.declarePossibleActions();return w.SPACE=new d("SPACE"),w}update(w){F.prototype.update.call(this,w);let e=K(this,w);this._hasAmmo()&&e.equals(b.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let r=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],i=w.createSprite(this.stype,r);i&&i.orientation!==void 0&&(i.orientation=t)}this._spendAmmo()}_shootDirections(w){return[_(this.orientation)]}},U=class extends Iw{static declarePossibleActions(){return{LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){y.prototype.update.call(this,w);let e=K(this,w),t=e.asVector();(ww(t,I)||ww(t,Z))&&this.physics.activeMovement(this,e)}},Oe=class extends U{static color=uw;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=U.declarePossibleActions();return w.SPACE=new d("SPACE"),w}update(w){U.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function E(w,e,t){t.killSprite(w)}function Ie(w,e,t){t.killSprite(w),t.killSprite(e)}function Re(w,e,t){t.addSpriteCreation(w.key,[w.rect.x,w.rect.y])}function C(w,e,t,{stype:r="wall"}={}){let i=w.lastrect;t.killSprite(w);let s=t.addSpriteCreation(r,w.rect.topleft);s!=null&&(s.lastrect=i,w.orientation!==void 0&&s.orientation!==void 0&&(s.orientation=w.orientation))}function Le(w,e,t,{resource:r,limit:i=1,no_symmetry:s=!1,exhaustStype:o=null}={}){w.resources[r]<i?z(w,e,t,{no_symmetry:s}):o?t.kill_list.includes(e)||C(e,w,t,{stype:o}):E(e,w,t)}function z(w,e,t,{no_symmetry:r=!1}={}){!t.kill_list.includes(e)&&!t.kill_list.includes(w)&&(w.rect.equals(w.lastrect)&&!r?(e.rect=e.lastrect,rw(e,0)):(w.rect=w.lastrect,rw(w,0)))}function rw(w,e){e>5||w.just_pushed&&(w.just_pushed.rect=w.just_pushed.lastrect,rw(w.just_pushed,e+1))}function Te(w,e,t){for(let r of t.sprite_registry.sprites())r.rect=r.lastrect}function iw(w,e){return w.just_pushed&&e<3?iw(w.just_pushed,e+1):w.lastdirection}function Be(w,e,t){let r=iw(e,0);Math.abs(r.x)+Math.abs(r.y)===0?(r=iw(w,0),e.physics.activeMovement(e,_(r)),e.just_pushed=w):(w.physics.activeMovement(w,_(r)),w.just_pushed=e)}function Ge(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=w.lastdirection;if(Math.abs(i.x)+Math.abs(i.y)===0)return;let s=_(i),o=w.rect.width,l=w.rect.copy();l.x+=Math.round(s.x)*o,l.y+=Math.round(s.y)*o,!(l.x<0||l.y<0||l.x+l.width>t.screensize[0]||l.y+l.height>t.screensize[1])&&(w.rect=l,w.lastmove=0,r&&C(e,w,t,{stype:r}))}function Rw(w,e,t,{with_step_back:r=!0}={}){r&&(w.rect=w.lastrect),w.orientation!==void 0&&(w.orientation={x:-w.orientation.x,y:-w.orientation.y})}function Ce(w,e,t){w.rect=w.lastrect,w.lastmove=w.cooldown,w.physics.activeMovement(w,{x:0,y:1},1),Rw(w,e,t,{with_step_back:!1})}function Me(w,e,t){let r=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];w.orientation=r[Math.floor(t.randomGenerator.random()*r.length)]}function Pe(w,e,t,{offset:r=0}={}){w.rect.top<0?w.rect.top=t.screensize[1]-w.rect.height:w.rect.top+w.rect.height>t.screensize[1]&&(w.rect.top=0),w.rect.left<0?w.rect.left=t.screensize[0]-w.rect.width:w.rect.left+w.rect.width>t.screensize[0]&&(w.rect.left=0),w.lastmove=0}function Ne(w,e,t){if(!(w instanceof G))throw new Error(`collectResource: sprite must be a Resource, got ${w.constructor.name}`);let r=w.resource_type,i=t.domain.resources_limits&&t.domain.resources_limits[r]||1/0;e.resources[r]=Math.max(0,Math.min(e.resources[r]+w.value,i))}function De(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([w,r,i])}function He(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function Ke(w,e,t,{resource:r,value:i=-1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function Fe(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]>=i&&E(w,e,t)}function Ue(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]>=i&&E(w,e,t)}function ze(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]<=i&&E(w,e,t)}function We(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]<=i&&E(w,e,t)}function $e(w,e,t,{resource:r,stype:i,limit:s=1}={}){w.resources[r]>=s&&t.addSpriteCreation(i,[w.rect.x,w.rect.y])}function Ye(w,e,t){t.kill_list.includes(e)||E(w,e,t)}function je(w,e,t){let r=w.lastrect,i=_(e.orientation);w.physics.activeMovement(w,i,e.strength||1),w.lastrect=r}function Qe(w,e,t){if(!Lw(w,t,"t_lastpull"))return;let r=w.lastrect,i=e.lastdirection,s=Math.abs(i.x)+Math.abs(i.y)>0?_(i):{x:1,y:0};w._updatePosition(s,(e.speed||1)*w.physics.gridsize[0]),w.lastrect=r}function qe(w,e,t){let r=t.sprite_registry.withStype(e.stype||e.key);if(r.length>0){let i=r[Math.floor(t.randomGenerator.random()*r.length)];w.rect=i.rect.copy()}w.lastmove=0}function Xe(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=t.sprite_registry.group(e.key).filter(o=>o!==e);if(i.length===0)return;let s=i[Math.floor(t.randomGenerator.random()*i.length)];w.rect=s.rect.copy(),w.lastrect=s.rect.copy(),w.lastmove=0,r&&(C(e,w,t,{stype:r}),C(s,w,t,{stype:r}))}function Ve(w,e,t,{friction:r=0}={}){Lw(w,t,"t_lastbounce")&&(w.speed!==null&&(w.speed*=1-r),z(w,e,t),w.orientation!==void 0&&(Math.abs(w.rect.centerx-e.rect.centerx)>Math.abs(w.rect.centery-e.rect.centery)?w.orientation={x:-w.orientation.x,y:w.orientation.y}:w.orientation={x:w.orientation.x,y:-w.orientation.y}))}function Je(w,e,t,{friction:r=0}={}){if(z(w,e,t),w.orientation!==void 0){let i=w.orientation,s=_({x:-w.rect.centerx+e.rect.centerx,y:-w.rect.centery+e.rect.centery}),o=s.x*i.x+s.y*i.y;w.orientation={x:-2*o*s.x+i.x,y:-2*o*s.y+i.y},w.speed!==null&&(w.speed*=1-r)}}function Lw(w,e,t){return t in w._effect_data&&w._effect_data[t]===e.time?!1:(w._effect_data[t]=e.time,!0)}var W=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},Ze=class extends W{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},wt=class extends W{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},et=class extends W{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:r=0,...i}=w;super({win:e,scoreChange:t}),this.limit=r,this.stypes=[];for(let[s,o]of Object.entries(i))s.startsWith("stype")&&this.stypes.push(o)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},tt=class extends W{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}},rt=class Xw{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(e){this.singletons.push(e)}isSingleton(e){return this.singletons.includes(e)}registerSpriteClass(e,t,r,i){if(e in this.classes)throw new Error(`Sprite key already registered: ${e}`);if(t==null)throw new Error(`Cannot register null class for key: ${e}`);this.classes[e]=t,this.classArgs[e]=r,this.stypes[e]=i,this.spriteKeys.push(e)}getSpriteDef(e){if(!(e in this.classes))throw new Error(`Unknown sprite type '${e}', verify your domain file`);return{cls:this.classes[e],args:this.classArgs[e],stypes:this.stypes[e]}}*getSpriteDefs(){for(let e of this.spriteKeys)yield[e,this.getSpriteDef(e)]}_generateIdNumber(e){let t=(this._liveSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),r=(this._deadSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),i=t.concat(r);return i.length>0?Math.max(...i)+1:1}generateId(e){let t=this._generateIdNumber(e);return`${e}.${t}`}createSprite(e,t){if(this.isSingleton(e)&&(this._liveSpritesByKey[e]||[]).length>0)return null;let{cls:r,args:i,stypes:s}=this.getSpriteDef(e),o=t.id||this.generateId(e),l={...i,...t,key:e,id:o},h=new r(l);return h.stypes=s,this._liveSpritesByKey[e]||(this._liveSpritesByKey[e]=[]),this._liveSpritesByKey[e].push(h),this._spriteById[o]=h,h}killSprite(e){e.alive=!1;let t=e.key,r=this._liveSpritesByKey[t];if(r){let i=r.indexOf(e);i!==-1&&(r.splice(i,1),this._deadSpritesByKey[t]||(this._deadSpritesByKey[t]=[]),this._deadSpritesByKey[t].push(e))}}group(e,t=!1){let r=this._liveSpritesByKey[e]||[];if(!t)return r;let i=this._deadSpritesByKey[e]||[];return r.concat(i)}*groups(e=!1){for(let t of this.spriteKeys)if(e){let r=this._liveSpritesByKey[t]||[],i=this._deadSpritesByKey[t]||[];yield[t,r.concat(i)]}else yield[t,this._liveSpritesByKey[t]||[]]}*sprites(e=!1){if(e)throw new Error("sprites(includeDead=true) not supported");for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)yield i}}spritesArray(){let e=[];for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)e.push(i)}return e}withStype(e,t=!1){if(this.spriteKeys.includes(e))return this.group(e,t);let r=[];for(let i of this.spriteKeys)if(this.stypes[i]&&this.stypes[i].includes(e)){let s=t?(this._liveSpritesByKey[i]||[]).concat(this._deadSpritesByKey[i]||[]):this._liveSpritesByKey[i]||[];r.push(...s)}return r}getAvatar(){for(let[,e]of this.groups(!0))if(e.length>0&&this.isAvatar(e[0]))return e[0];return null}isAvatar(e){return this.isAvatarCls(e.constructor)}isAvatarCls(e){let t=e;for(;t&&t.name;){if(t.name.includes("Avatar"))return!0;t=Object.getPrototypeOf(t)}return!1}deepCopy(){let e=new Xw;e.classes={...this.classes},e.classArgs={};for(let[t,r]of Object.entries(this.classArgs))e.classArgs[t]={...r};e.stypes={};for(let[t,r]of Object.entries(this.stypes))e.stypes[t]=[...r];return e.spriteKeys=[...this.spriteKeys],e.singletons=[...this.singletons],e}},it=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},st=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Tw=class extends st{constructor(w,e,t,r={}){let i=r.scoreChange||0;super(e,t,{scoreChange:i}),this.callFn=w;let{scoreChange:s,...o}=r;this.fnArgs=o,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},Bw=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof G||e===G){let r=w;t.res_type&&(r=t.res_type),t.color&&(this.resources_colors[r]=t.color),t.limit!==void 0&&(this.resources_limits[r]=t.limit),this.notable_resources.push(r)}}buildLevel(w){let e=w.split(`
`).filter(o=>o.length>0),t=e.map(o=>o.length),r=Math.min(...t),i=Math.max(...t);if(r!==i)throw new Error(`Inconsistent line lengths: min=${r}, max=${i}`);let s=new ot(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let o=0;o<e.length;o++)for(let l=0;l<e[o].length;l++){let h=e[o][l],n=this.char_mapping[h];if(n){let c=[l*this.block_size,o*this.block_size];s.createSprites(n,c)}}return s.initState=s.getGameState(),s}},ot=class{constructor(w,e,t,r,i,s=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=r,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=s,this.randomGenerator=new it(s),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new mw(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let r=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return r&&(this.is_stochastic=this.domain.is_stochastic||r.is_stochastic||this.is_stochastic),r}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let l of e)l.just_pushed=null;for(let l of e)l.update(this);this.events_triggered=[];let[t,r,i]=this._moveEventHandling(),[s,o]=this._eventHandling(t);this.events_triggered=r.concat(s);for(let l of this.kill_list)this.sprite_registry.killSprite(l);for(let[l,h,n]of this.create_list)this.createSprite(l,h,n);for(let[l,h,n]of this.resource_changes){let c=this.domain.resources_limits&&this.domain.resources_limits[h]||1/0;l.resources[h]=Math.max(0,Math.min(l.resources[h]+n,c))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},r=this.domain.collision_eff.filter(s=>s.name==="stepBack"||s.name==="stepBackIfHasLess");for(let s of r){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}let i=this.domain.collision_eff.filter(s=>["bounceForward","reverseDirection","turnAround"].includes(s.name));for(let s of i){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}for(let s of r){let[,o,l]=this._applyEffect(s,t);w.push(...o),e.push(...l)}return[t,w,e]}_eventHandling(w){let e=[],t=[],r=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of r){let[,s,o]=this._applyEffect(i,w);e.push(...s),t.push(...o)}return[e,t]}_applyEffect(w,e){let t=[],r=[],i=w.actor_stype,s=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),s!=="EOS"&&!(s in e)&&(e[s]=this.sprite_registry.withStype(s)),s==="EOS"){let n=e[i];for(let c=n.length-1;c>=0;c--){let p=n[c];this.containsRect(p.rect)||(this.addScore(w.score),w.call(p,null,this),t.push([w.name,p.id,"EOS"]),r.push([w.name,p.key,"EOS",[p.rect.x,p.rect.y],[null,null]]),!this.containsRect(p.rect)&&p.alive&&this.killSprite(p))}return[e,t,r]}let o=e[i],l=e[s];if(o.length===0||l.length===0)return[e,t,r];let h=!1;o.length>l.length&&([o,l]=[l,o],h=!0);for(let n of o)for(let c of l)n!==c&&n.rect.colliderect(c.rect)&&(h?this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,n,this),t.push([w.name,c.id,n.id]),r.push([w.name,c.key,n.key,[c.rect.x,c.rect.y],[n.rect.x,n.rect.y]])):this.kill_list.includes(n)||(this.addScore(w.score),w.call(n,c,this),t.push([w.name,n.id,c.id]),r.push([w.name,n.key,c.key,[n.rect.x,n.rect.y],[c.rect.x,c.rect.y]])));return[e,t,r]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],r=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...r].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let r of t){let i=this.sprite_registry.createSprite(e,{id:r.id,pos:[r.x,r.y],size:[r.w,r.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...r.resources},{get(s,o){return typeof o=="string"&&!(o in s)&&o!=="toJSON"&&o!=="then"&&o!==Symbol.toPrimitive&&o!==Symbol.toStringTag&&o!=="inspect"&&o!=="constructor"&&o!=="__proto__"?0:s[o]},set(s,o,l){return s[o]=l,!0}}),r.speed!==void 0&&(i.speed=r.speed),r.cooldown!==void 0&&(i.cooldown=r.cooldown),r.orientation&&(i.orientation={...r.orientation}),r._age!==void 0&&(i._age=r._age),r.lastmove!==void 0&&(i.lastmove=r.lastmove),i.alive=r.alive,r.alive||this.sprite_registry.killSprite(i))}}};function lt(){a.register("VGDLSprite",y),a.register("Immovable",ge),a.register("Passive",de),a.register("Resource",G),a.register("ResourcePack",Se),a.register("Flicker",bw),a.register("OrientedFlicker",Ew),a.register("OrientedSprite",H),a.register("Missile",_w),a.register("SpawnPoint",tw),a.register("SpriteProducer",ew),a.register("Portal",ye),a.register("RandomNPC",Aw),a.register("Chaser",xw),a.register("Fleeing",ve),a.register("Bomber",ke),a.register("Walker",be),a.register("Conveyor",_e),a.register("Spreader",Ee),a.register("Immutable",fe),a.register("MovingAvatar",Iw),a.register("OrientedAvatar",F),a.register("ShootAvatar",xe),a.register("HorizontalAvatar",U),a.register("FlakAvatar",Oe),a.register("killSprite",E),a.register("killBoth",Ie),a.register("cloneSprite",Re),a.register("transformTo",C),a.register("stepBack",z),a.register("stepBackIfHasLess",Le),a.register("undoAll",Te),a.register("bounceForward",Be),a.register("catapultForward",Ge),a.register("reverseDirection",Rw),a.register("turnAround",Ce),a.register("flipDirection",Me),a.register("wrapAround",Pe),a.register("collectResource",Ne),a.register("changeResource",De),a.register("addResource",He),a.register("removeResource",Ke),a.register("killIfOtherHasMore",Fe),a.register("killIfHasMore",Ue),a.register("killIfOtherHasLess",ze),a.register("killIfHasLess",We),a.register("spawnIfHasMore",$e),a.register("killIfAlive",Ye),a.register("conveySprite",je),a.register("pullWithIt",Qe),a.register("teleportToExit",qe),a.register("teleportToOther",Xe),a.register("wallBounce",Ve),a.register("bounceDirection",Je),a.register("Timeout",Ze),a.register("SpriteCounter",wt),a.register("MultiSpriteCounter",et),a.register("ResourceCounter",tt),a.register("GridPhysics",kw),a.register("BasicGame",Bw);for(let[w,e]of Object.entries(Sw))a.register(w,e);a.register("UP",yw),a.register("DOWN",vw),a.register("LEFT",Z),a.register("RIGHT",I)}var Gw=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function at(w,e=8){w=w.replace(/\t/g," ".repeat(e));let t=w.split(`
`),r=new Gw("",-1);for(let i of t){i.includes("#")&&(i=i.split("#")[0]);let s=i.trim();if(s.length>0){let o=i.length-i.trimStart().length;r=new Gw(s,o,r)}}return r.getRoot()}var nt=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=at(t).children[0]);let[r,i]=this._parseArgs(t.content);Object.assign(i,e),this.spriteRegistry=new rt,this.game=new Bw(this.spriteRegistry,i);for(let s of t.children)s.content.startsWith("SpriteSet")&&this.parseSprites(s.children),s.content==="InteractionSet"&&this.parseInteractions(s.children),s.content==="LevelMapping"&&this.parseMappings(s.children),s.content==="TerminationSet"&&this.parseTerminations(s.children);return this.game.finishSetup(),this.game}_eval(w){if(a.has(w))return a.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let r=w.split(/\s+/).filter(i=>i.length>0);if(r.length===0)return[e,t];r[0].includes("=")||(e=this._eval(r[0]),r.shift());for(let i of r){let s=i.indexOf("=");if(s===-1)continue;let o=i.substring(0,s),l=i.substring(s+1);t[o]=this._eval(l)}return[e,t]}parseSprites(w,e=null,t={},r=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[s,o]=i.content.split(">").map(c=>c.trim()),[l,h]=this._parseArgs(o,e,{...t}),n=[...r,s];if("singleton"in h&&(h.singleton===!0&&this.spriteRegistry.registerSingleton(s),delete h.singleton),i.children.length===0){this.verbose&&console.log("Defining:",s,l,h,n),this.spriteRegistry.registerSpriteClass(s,l,h,n);let c=this.game.sprite_order.indexOf(s);c!==-1&&this.game.sprite_order.splice(c,1),this.game.sprite_order.push(s)}else this.parseSprites(i.children,l,h,n)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,r]=e.content.split(">").map(l=>l.trim()),[i,s]=this._parseArgs(r),o=t.split(/\s+/).filter(l=>l.length>0);for(let l=1;l<o.length;l++){let h=o[0],n=o[l],c;if(typeof i=="function"&&!i.prototype)c=new Tw(i,h,n,s);else if(typeof i=="function")c=new Tw(i,h,n,s);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(c)}}}parseTerminations(w){for(let e of w){let[t,r]=this._parseArgs(e.content);this.game.terminations.push(new t(r))}}parseMappings(w){for(let e of w){let[t,r]=e.content.split(">").map(s=>s.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let i=r.split(/\s+/).filter(s=>s.length>0);this.game.char_mapping[t]=i}}},ct=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let r of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[r]||[];for(let s of i)this._drawSprite(s,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let r=w.rect.x*e,i=w.rect.y*e,s=w.rect.w*e,o=w.rect.h*e,l=null,h=null;if(w.img){let g=this._parseImg(w.img);l=g.color,h=g.shape}l||(l=w.color),l||(l=[128,128,128]);let n=w.shrinkfactor||0,c=r+s*n/2,p=i+o*n/2,f=s*(1-n),m=o*(1-n);this.ctx.fillStyle=`rgb(${l[0]}, ${l[1]}, ${l[2]})`,h?this._drawShape(h,c,p,f,m):this.ctx.fillRect(c,p,f,m),w.orientation&&w.draw_arrow&&this._drawArrow(c,p,f,m,w.orientation,l),w.is_avatar&&this._drawResources(w,c,p,f,m)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],r=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of r)if(t.endsWith("_"+i)){let s=t.slice(0,-(i.length+1));return{color:e[s]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,r,i){let s=this.ctx,o=e+r/2,l=t+i/2,h=r/2,n=i/2,c=2/24,p=h*(1-2*c),f=n*(1-2*c);switch(s.beginPath(),w){case"CIRCLE":s.ellipse(o,l,p,f,0,0,Math.PI*2);break;case"TRIANGLE":{let m=l-f,g=l+f,S=o-p,u=o+p;s.moveTo(o,m),s.lineTo(u,g),s.lineTo(S,g),s.closePath();break}case"DIAMOND":s.moveTo(o,l-f),s.lineTo(o+p,l),s.lineTo(o,l+f),s.lineTo(o-p,l),s.closePath();break;case"STAR":{let m=Math.min(p,f),g=m*.4;for(let S=0;S<5;S++){let u=-Math.PI/2+S*(2*Math.PI/5),k=u+Math.PI/5;S===0?s.moveTo(o+m*Math.cos(u),l+m*Math.sin(u)):s.lineTo(o+m*Math.cos(u),l+m*Math.sin(u)),s.lineTo(o+g*Math.cos(k),l+g*Math.sin(k))}s.closePath();break}case"CROSS":{let m=p*2/3,g=m/2;s.rect(o-p,l-g,p*2,m),s.rect(o-g,l-f,m,f*2);break}case"HEXAGON":{let m=Math.min(p,f);for(let g=0;g<6;g++){let S=Math.PI/6+g*(Math.PI/3),u=o+m*Math.cos(S),k=l+m*Math.sin(S);g===0?s.moveTo(u,k):s.lineTo(u,k)}s.closePath();break}case"SQUARE":{let m=Math.min(p,f)*.05;s.rect(o-p+m,l-f+m,(p-m)*2,(f-m)*2);break}case"PENTAGON":{let m=Math.min(p,f);for(let g=0;g<5;g++){let S=-Math.PI/2+g*(2*Math.PI/5),u=o+m*Math.cos(S),k=l+m*Math.sin(S);g===0?s.moveTo(u,k):s.lineTo(u,k)}s.closePath();break}default:s.rect(e,t,r,i)}s.fill()}_drawArrow(w,e,t,r,i,s){let o=w+t/2,l=e+r/2,h=Math.min(t,r)*.3,n=[s[0],255-s[1],s[2]];this.ctx.strokeStyle=`rgb(${n[0]}, ${n[1]}, ${n[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(o,l),this.ctx.lineTo(o+i.x*h,l+i.y*h),this.ctx.stroke()}_drawResources(w,e,t,r,i){let s=w.resources,o=0,l=3;for(let h of Object.keys(s)){if(h==="toJSON")continue;let n=s[h];if(n>0){let c=t+i+o*(l+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,c,r*Math.min(n/5,1),l),o++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}},M={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}},_t=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";lt();var R=document.getElementById("game-desc"),L=document.getElementById("level-text"),A=document.getElementById("game-canvas"),ht=document.getElementById("btn-play"),pt=document.getElementById("btn-reset"),sw=document.getElementById("btn-cog"),ow=document.getElementById("btn-create-env"),$=document.getElementById("play-icon"),Cw=document.getElementById("tick-mode"),lw=document.getElementById("speed-popover"),aw=document.getElementById("flap-tab-desc"),nw=document.getElementById("flap-tab-level"),Mw=document.getElementById("flap-panel-desc"),Pw=document.getElementById("flap-panel-level"),Y=new ct(A,30),Nw=null,v=null,x=!1,j=null,cw=null,Dw="",Hw="";function Kw(){let w=Cw.value;return w==="action"?"action":Number(w)}var mt=220,ut=150,P=new Set,O=null,hw=new Map,N=new Map;A.addEventListener("keydown",w=>{let e=Fw(w.key);if(e){if(w.preventDefault(),Kw()==="action"){O=e,x||q(),pw();return}w.repeat||(P.has(e)||(P.add(e),hw.set(e,performance.now()),N.delete(e)),O=e,x||q())}}),A.addEventListener("keyup",w=>{let e=Fw(w.key);e&&(P.delete(e),hw.delete(e),N.delete(e))});function Fw(w){switch(w){case"ArrowUp":case"w":return"UP";case"ArrowDown":case"s":return"DOWN";case"ArrowLeft":case"a":return"LEFT";case"ArrowRight":case"d":return"RIGHT";case" ":return"SPACE";default:return null}}function Uw(w){switch(w){case"SPACE":return b.SPACE;case"UP":return b.UP;case"DOWN":return b.DOWN;case"LEFT":return b.LEFT;case"RIGHT":return b.RIGHT;default:return b.NOOP}}function ft(){if(O){let e=O;return O=null,N.set(e,performance.now()),Uw(e)}let w=performance.now();for(let e of P){if(w-(hw.get(e)||w)<mt)continue;let t=N.get(e)||0;if(w-t>=ut)return N.set(e,w),Uw(e)}return b.NOOP}function Q(){T(),Nw=new nt().parseGame(R.value),v=Nw.buildLevel(L.value),Y.resize(v.width,v.height),Y.render(v),Dw=R.value,Hw=L.value,ow.style.display="none",A.focus()}function pw(){if(!v||v.ended){T();return}v.tick(ft()),Y.render(v)}function q(){let w=Kw();w==="action"||x||(x=!0,$.src="pause.png",$.alt="pause",j=setInterval(pw,1e3/w))}function T(){x=!1,$.src="play.png",$.alt="play",j!==null&&(clearInterval(j),j=null)}function zw(){x?T():q(),A.focus()}function gt(){T(),v&&(v.reset(),Y.render(v))}function Ww(w){if(cw===w){cw=null,aw.classList.remove("active"),nw.classList.remove("active"),Mw.classList.remove("open"),Pw.classList.remove("open");return}T(),cw=w,aw.classList.toggle("active",w==="desc"),nw.classList.toggle("active",w==="level"),Mw.classList.toggle("open",w==="desc"),Pw.classList.toggle("open",w==="level")}function $w(){let w=R.value!==Dw||L.value!==Hw;ow.style.display=w?"block":"none"}function dt(){lw.classList.toggle("open")}aw.addEventListener("click",()=>Ww("desc")),nw.addEventListener("click",()=>Ww("level")),R.addEventListener("input",$w),L.addEventListener("input",$w),ow.addEventListener("click",w=>{w.stopPropagation(),Q()}),ht.addEventListener("click",w=>{w.stopPropagation(),zw()}),pt.addEventListener("click",w=>{w.stopPropagation(),gt(),A.focus()}),sw.addEventListener("click",w=>{w.stopPropagation(),dt()}),document.addEventListener("click",w=>{!lw.contains(w.target)&&w.target!==sw&&!sw.contains(w.target)&&lw.classList.remove("open")}),Cw.addEventListener("change",()=>{x&&(T(),q())}),A.addEventListener("blur",()=>{P.clear(),O=null}),document.addEventListener("keydown",w=>{let e=w.target.tagName;e==="TEXTAREA"||e==="INPUT"||e==="SELECT"||(w.key==="Enter"&&Q(),w.key==="p"&&zw())}),document.querySelectorAll(".dpad-btn").forEach(w=>{w.addEventListener("click",e=>{e.preventDefault(),O=w.dataset.action,pw()})});var St=[{cohort:"vgfmri3",games:[{key:"bait_vgfmri3",name:"Bait",color:"rgb(253,230,153)"},{key:"chase_vgfmri3",name:"Chase",color:"rgb(235,154,155)"},{key:"helper_vgfmri3",name:"Helper",color:"rgb(180,216,170)"},{key:"lemmings_vgfmri3",name:"Lemmings",color:"rgb(166,193,228)"},{key:"plaqueAttack_vgfmri3",name:"Plaque Attack",color:"rgb(245,179,108)"},{key:"zelda_vgfmri3",name:"Zelda",color:"rgb(180,168,210)"}]},{cohort:"vgfmri4",games:[{key:"bait_vgfmri4",name:"Bait",color:"rgb(253,230,153)"},{key:"chase_vgfmri4",name:"Chase",color:"rgb(235,154,155)"},{key:"helper_vgfmri4",name:"Helper",color:"rgb(180,216,170)"},{key:"lemmings_vgfmri4",name:"Lemmings",color:"rgb(166,193,228)"},{key:"avoidGeorge_vgfmri4",name:"Avoid George",color:"rgb(245,179,108)"},{key:"zelda_vgfmri4",name:"Zelda",color:"rgb(180,168,210)"}]}],Yw=null,jw=null;function yt(w,e){let t=document.getElementById("game-selector");t.innerHTML="";let r=9,i=document.createElement("tr");i.innerHTML=`<th></th><th class="level-header" colspan="${r}">Curriculum Levels</th>`,t.appendChild(i);for(let s of St){let o=document.createElement("tr");o.innerHTML=`<th class="cohort-header" colspan="${r+1}">${s.cohort}</th>`,t.appendChild(o);for(let l of s.games){let h=M[l.key];if(!h)continue;let n=Object.keys(h.levels).map(Number).sort((f,m)=>f-m),c=document.createElement("tr"),p=document.createElement("td");p.className="game-name",p.innerHTML=`<span class="game-badge" style="background:${l.color}">${l.name}</span>`,c.appendChild(p);for(let f=0;f<r;f++){let m=document.createElement("td");if(n.includes(f)){let g=document.createElement("button");g.textContent=f,g.dataset.game=l.key,g.dataset.level=f,l.key===w&&f===e&&g.classList.add("active"),g.addEventListener("click",()=>vt(l.key,f)),m.appendChild(g)}c.appendChild(m)}t.appendChild(c)}}Yw=w,jw=e}function vt(w,e){let t=M[w];if(!t)return;let r=Object.keys(t.levels).map(Number).sort((l,h)=>l-h),i=r.includes(e)?e:r[0];R.value=t.description,L.value=t.levels[i],Q(),document.querySelectorAll(".game-selector button.active").forEach(l=>l.classList.remove("active"));let s=document.querySelector(`.game-selector button[data-game="${w}"][data-level="${i}"]`);s&&s.classList.add("active"),Yw=w,jw=i;let o=new URL(location.href);o.searchParams.set("game",w),o.searchParams.set("level",String(i)),history.replaceState(null,"",o)}async function kt(w){let e=await ReasonToPlayAssets.resolveReplayUrl(w),t=await fetch(e);if(!t.ok)return null;let r=w.endsWith(".gz"),i;if(r){let s=new DecompressionStream("gzip");i=await new Response(t.body.pipeThrough(s)).text()}else i=await t.text();return JSON.parse(i).game_description||null}async function bt(){let w=new URLSearchParams(location.search),e=w.get("game")||"bait_vgfmri4",t=parseInt(w.get("level")||"3",10),r=w.get("replay"),i=M[e]?e:Object.keys(M)[0],s=M[i],o=Object.keys(s.levels).map(Number).sort((n,c)=>n-c),l=o.includes(t)?t:o[0];L.value=s.levels[l];let h=null;r&&(h=await kt(r)),R.value=h||s.description,yt(i,l),Q()}bt()})();
