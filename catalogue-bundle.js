// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var kw=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},n=new kw;var R=class s{constructor(w,e,t,i){this.x=w,this.y=e,this.w=t,this.h=i}static fromPosSize(w,e){return new s(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new s(this.x+w.x,this.y+w.y,this.w,this.h):new s(this.x+w,this.y+e,this.w,this.h)}copy(){return new s(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let t=0;t<w.length;t++)this.colliderect(w[t].rect||w[t])&&e.push(t);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var f=class s{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let t of this.keys)t==="LEFT"&&(w-=1),t==="RIGHT"&&(w+=1),t==="UP"&&(e-=1),t==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof s)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},_w={NOOP:new f,UP:new f("UP"),DOWN:new f("DOWN"),LEFT:new f("LEFT"),RIGHT:new f("RIGHT"),SPACE:new f("SPACE"),SPACE_RIGHT:new f("SPACE","RIGHT"),SPACE_LEFT:new f("SPACE","LEFT")},Hw=_w.NOOP;var xw=[129,199,132],q=[25,118,210],Q=[211,47,47],Ew=[69,90,100],V=[250,250,250],Se=[109,76,65],Aw=[55,71,79],Tw=[230,81,0],ve=[255,245,157],ye=[255,138,128],be=[255,196,0],ke=[255,82,82],_e=[255,112,67],xe=[144,202,249],Ee=[185,246,202],Ae=[207,216,220],Te=[68,90,100],Ie=[1,87,155],Oe=[92,107,192],Re=[200,150,220],Le=[255,230,230],X={GREEN:xw,BLUE:q,RED:Q,GRAY:Ew,WHITE:V,BROWN:Se,BLACK:Aw,ORANGE:Tw,YELLOW:ve,PINK:ye,GOLD:be,LIGHTRED:ke,LIGHTORANGE:_e,LIGHTBLUE:xe,LIGHTGREEN:Ee,LIGHTGRAY:Ae,DARKGRAY:Te,DARKBLUE:Ie,PURPLE:Oe,LIGHTPURPLE:Re,LIGHTPINK:Le},Iw={x:0,y:-1},Ow={x:0,y:1},D={x:-1,y:0},_={x:1,y:0},L=[Iw,D,Ow,_];function H(s,w){return s.x===w.x&&s.y===w.y}function Ce(s){return Math.sqrt(s.x*s.x+s.y*s.y)}function x(s){let w=Ce(s);return w>0?{x:s.x/w,y:s.y/w}:{x:1,y:0}}var C=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let i;if(e.asVector?i=e.asVector():i=e,H(i,{x:0,y:0}))return;w._updatePosition(i,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var Be=X,y=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:i,size:r=[1,1],color:o,speed:l,cooldown:a,physicstype:p,rng:c,img:h,resources:m,...v}=w;this.key=e,this.id=t;let u=Array.isArray(r)?r:[r,r];this.rect=new R(i[0],i[1],u[0],u[1]),this.lastrect=this.rect,this.alive=!0;let g=p||this.constructor.physicstype||C;if(this.physics=new g(u),this.speed=l??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=h||null,this.color=o||this.constructor.color,this.img&&this.img.startsWith("colors/")){let S=this.img.split("/")[1],d=Be[S];d&&(this.color=d)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(m?{...m}:{},{get(S,d){return typeof d=="string"&&!(d in S)&&d!=="toJSON"&&d!=="then"&&d!==Symbol.toPrimitive&&d!==Symbol.toStringTag&&d!=="inspect"&&d!=="constructor"&&d!=="__proto__"?0:S[d]},set(S,d,k){return S[d]=k,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[S,d]of Object.entries(v))this[S]=d}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,i;if(e==null){let r=this.speed||0;t=w.x*r,i=w.y*r}else t=w.x*e,i=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:i}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},b=class extends y{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},Z=class extends y{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var J=class extends y{static color=Ew;static is_static=!0},ww=class extends y{static color=Q},ew=class extends b{static is_static=!0},F=class extends y{static color=Q;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},A=class extends y{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||_)}},K=class extends A{static speed=1},U=class extends A{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};U.limit=1;var M=class extends y{static stype=null},tw=class extends M{static is_static=!0;static is_stochastic=!0;static color=q},B=class extends M{static color=Aw;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},z=class extends y{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=L[Math.floor(w.randomGenerator.random()*L.length)];this.physics.activeMovement(this,e)}},W=class extends z{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],i=w.getSprites(this.stype);for(let r of i){let o=this.physics.distance(this.rect,r.rect);o<e?(e=o,t=[r]):o===e&&t.push(r)}return t}_movesToward(w,e){let t=[],i=this.physics.distance(this.rect,e.rect);for(let r of L){let o=this.rect.move(r),l=this.physics.distance(o,e.rect);this.fleeing&&i<l&&t.push(r),!this.fleeing&&i>l&&t.push(r)}return t}update(w){y.prototype.update.call(this,w);let e=[];for(let i of this._closestTargets(w))e.push(...this._movesToward(w,i));e.length===0&&(e=[...L]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},sw=class extends W{constructor(w){super({...w,fleeing:!0})}},iw=class extends B{static color=Tw;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||_),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),B.prototype.update.call(this,w)}},rw=class extends K{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let t;this.orientation.x>0?t=1:this.orientation.x<0?t=-1:t=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:t,y:0})}super.update(w)}},ow=class extends A{static is_static=!0;static color=q;static strength=1;static draw_arrow=!0},aw=class s extends F{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of L)w.randomGenerator.random()<(this.spreadprob||s.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function cw(s,w){let e=[...w.active_keys].sort();for(let t=Math.max(3,e.length);t>=0;t--)for(let i of Ge(e,t)){let r=i.join(",");if(s._keysToAction.has(r))return s._keysToAction.get(r)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Ge(s,w){if(w===0)return[[]];if(s.length===0)return[];let e=[];function t(i,r){if(r.length===w){e.push([...r]);return}for(let o=i;o<s.length;o++)r.push(s[o]),t(o+1,r),r.pop()}return t(0,[]),e}function Fw(s){let w=new Map;for(let e of Object.values(s)){let t=[...e.keys].sort().join(",");w.set(t,e)}return w}var j=class extends y{static color=V;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=Fw(e)}static declarePossibleActions(){return{UP:new f("UP"),DOWN:new f("DOWN"),LEFT:new f("LEFT"),RIGHT:new f("RIGHT"),NO_OP:new f}}update(w){y.prototype.update.call(this,w);let e=cw(this,w);e.equals(Hw)||this.physics.activeMovement(this,e)}},T=class extends y{static color=V;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||_);let e=this.constructor.declarePossibleActions();this._keysToAction=Fw(e)}static declarePossibleActions(){return{UP:new f("UP"),DOWN:new f("DOWN"),LEFT:new f("LEFT"),RIGHT:new f("RIGHT"),NO_OP:new f}}update(w){let e=this.orientation;this.orientation={x:0,y:0},y.prototype.update.call(this,w);let t=cw(this,w);t&&this.physics.activeMovement(this,t);let i=this.lastdirection;Math.abs(i.x)+Math.abs(i.y)!==0?this.orientation=i:this.orientation=e}},lw=class extends T{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=T.declarePossibleActions();return w.SPACE=new f("SPACE"),w}update(w){T.prototype.update.call(this,w);let e=cw(this,w);this._hasAmmo()&&e.equals(_w.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let i=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],r=w.createSprite(this.stype,i);r&&r.orientation!==void 0&&(r.orientation=t)}this._spendAmmo()}_shootDirections(w){return[x(this.orientation)]}},I=class extends j{static declarePossibleActions(){return{LEFT:new f("LEFT"),RIGHT:new f("RIGHT"),NO_OP:new f}}update(w){y.prototype.update.call(this,w);let e=cw(this,w),t=e.asVector();(H(t,_)||H(t,D))&&this.physics.activeMovement(this,e)}},nw=class extends I{static color=xw;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=I.declarePossibleActions();return w.SPACE=new f("SPACE"),w}update(w){I.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function E(s,w,e){e.killSprite(s)}function Kw(s,w,e){e.killSprite(s),e.killSprite(w)}function Uw(s,w,e){e.addSpriteCreation(s.key,[s.rect.x,s.rect.y])}function G(s,w,e,{stype:t="wall"}={}){let i=s.lastrect;e.killSprite(s);let r=e.addSpriteCreation(t,s.rect.topleft);r!=null&&(r.lastrect=i,s.orientation!==void 0&&r.orientation!==void 0&&(r.orientation=s.orientation))}function zw(s,w,e,{resource:t,limit:i=1,no_symmetry:r=!1,exhaustStype:o=null}={}){s.resources[t]<i?$(s,w,e,{no_symmetry:r}):o?e.kill_list.includes(w)||G(w,s,e,{stype:o}):E(w,s,e)}function $(s,w,e,{no_symmetry:t=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(s)&&(s.rect.equals(s.lastrect)&&!t?(w.rect=w.lastrect,Rw(w,0)):(s.rect=s.lastrect,Rw(s,0)))}function Rw(s,w){w>5||s.just_pushed&&(s.just_pushed.rect=s.just_pushed.lastrect,Rw(s.just_pushed,w+1))}function Ww(s,w,e){for(let t of e.sprite_registry.sprites())t.rect=t.lastrect}function Lw(s,w){return s.just_pushed&&w<3?Lw(s.just_pushed,w+1):s.lastdirection}function jw(s,w,e){let t=Lw(w,0);Math.abs(t.x)+Math.abs(t.y)===0?(t=Lw(s,0),w.physics.activeMovement(w,x(t)),w.just_pushed=s):(s.physics.activeMovement(s,x(t)),s.just_pushed=w)}function $w(s,w,e,{exhaustStype:t=null}={}){if(s.lastrect.colliderect(w.rect))return;let i=s.lastdirection;if(Math.abs(i.x)+Math.abs(i.y)===0)return;let o=x(i),l=s.rect.width,a=s.rect.copy();a.x+=Math.round(o.x)*l,a.y+=Math.round(o.y)*l,!(a.x<0||a.y<0||a.x+a.width>e.screensize[0]||a.y+a.height>e.screensize[1])&&(s.rect=a,s.lastmove=0,t&&G(w,s,e,{stype:t}))}function Cw(s,w,e,{with_step_back:t=!0}={}){t&&(s.rect=s.lastrect),s.orientation!==void 0&&(s.orientation={x:-s.orientation.x,y:-s.orientation.y})}function Yw(s,w,e){s.rect=s.lastrect,s.lastmove=s.cooldown,s.physics.activeMovement(s,{x:0,y:1},1),Cw(s,w,e,{with_step_back:!1})}function qw(s,w,e){let t=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];s.orientation=t[Math.floor(e.randomGenerator.random()*t.length)]}function Qw(s,w,e,{offset:t=0}={}){s.rect.top<0?s.rect.top=e.screensize[1]-s.rect.height:s.rect.top+s.rect.height>e.screensize[1]&&(s.rect.top=0),s.rect.left<0?s.rect.left=e.screensize[0]-s.rect.width:s.rect.left+s.rect.width>e.screensize[0]&&(s.rect.left=0),s.lastmove=0}function Vw(s,w,e){if(!(s instanceof b))throw new Error(`collectResource: sprite must be a Resource, got ${s.constructor.name}`);let t=s.resource_type,i=e.domain.resources_limits&&e.domain.resources_limits[t]||1/0;w.resources[t]=Math.max(0,Math.min(w.resources[t]+s.value,i))}function Xw(s,w,e,{resource:t,value:i=1}={}){e.resource_changes.push([s,t,i])}function Zw(s,w,e,{resource:t,value:i=1}={}){e.resource_changes.push([w,t,i]),e.kill_list.push(s)}function Jw(s,w,e,{resource:t,value:i=-1}={}){e.resource_changes.push([w,t,i]),e.kill_list.push(s)}function we(s,w,e,{resource:t,limit:i=1}={}){w.resources[t]>=i&&E(s,w,e)}function ee(s,w,e,{resource:t,limit:i=1}={}){s.resources[t]>=i&&E(s,w,e)}function te(s,w,e,{resource:t,limit:i=1}={}){w.resources[t]<=i&&E(s,w,e)}function se(s,w,e,{resource:t,limit:i=1}={}){s.resources[t]<=i&&E(s,w,e)}function ie(s,w,e,{resource:t,stype:i,limit:r=1}={}){s.resources[t]>=r&&e.addSpriteCreation(i,[s.rect.x,s.rect.y])}function re(s,w,e){e.kill_list.includes(w)||E(s,w,e)}function oe(s,w,e){let t=s.lastrect,i=x(w.orientation);s.physics.activeMovement(s,i,w.strength||1),s.lastrect=t}function ae(s,w,e){if(!pe(s,e,"t_lastpull"))return;let t=s.lastrect,i=w.lastdirection,o=Math.abs(i.x)+Math.abs(i.y)>0?x(i):{x:1,y:0};s._updatePosition(o,(w.speed||1)*s.physics.gridsize[0]),s.lastrect=t}function le(s,w,e){let t=e.sprite_registry.withStype(w.stype||w.key);if(t.length>0){let i=t[Math.floor(e.randomGenerator.random()*t.length)];s.rect=i.rect.copy()}s.lastmove=0}function ne(s,w,e,{exhaustStype:t=null}={}){if(s.lastrect.colliderect(w.rect))return;let i=e.sprite_registry.group(w.key).filter(o=>o!==w);if(i.length===0)return;let r=i[Math.floor(e.randomGenerator.random()*i.length)];s.rect=r.rect.copy(),s.lastrect=r.rect.copy(),s.lastmove=0,t&&(G(w,s,e,{stype:t}),G(r,s,e,{stype:t}))}function ce(s,w,e,{friction:t=0}={}){pe(s,e,"t_lastbounce")&&(s.speed!==null&&(s.speed*=1-t),$(s,w,e),s.orientation!==void 0&&(Math.abs(s.rect.centerx-w.rect.centerx)>Math.abs(s.rect.centery-w.rect.centery)?s.orientation={x:-s.orientation.x,y:s.orientation.y}:s.orientation={x:s.orientation.x,y:-s.orientation.y}))}function he(s,w,e,{friction:t=0}={}){if($(s,w,e),s.orientation!==void 0){let i=s.orientation,r=x({x:-s.rect.centerx+w.rect.centerx,y:-s.rect.centery+w.rect.centery}),o=r.x*i.x+r.y*i.y;s.orientation={x:-2*o*r.x+i.x,y:-2*o*r.y+i.y},s.speed!==null&&(s.speed*=1-t)}}function pe(s,w,e){return e in s._effect_data&&s._effect_data[e]===w.time?!1:(s._effect_data[e]=w.time,!0)}var N=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},hw=class extends N{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},pw=class extends N{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},mw=class extends N{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:i=0,...r}=w;super({win:e,scoreChange:t}),this.limit=i,this.stypes=[];for(let[o,l]of Object.entries(r))o.startsWith("stype")&&this.stypes.push(l)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},uw=class extends N{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var dw=class s{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,t,i){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=t,this.stypes[w]=i,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(r=>parseInt(r.id.split(".").pop())),t=(this._deadSpritesByKey[w]||[]).map(r=>parseInt(r.id.split(".").pop())),i=e.concat(t);return i.length>0?Math.max(...i)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:t,args:i,stypes:r}=this.getSpriteDef(w),o=e.id||this.generateId(w),l={...i,...e,key:w,id:o},a=new t(l);return a.stypes=r,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[o]=a,a}killSprite(w){w.alive=!1;let e=w.key,t=this._liveSpritesByKey[e];if(t){let i=t.indexOf(w);i!==-1&&(t.splice(i,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let t=this._liveSpritesByKey[w]||[];if(!e)return t;let i=this._deadSpritesByKey[w]||[];return t.concat(i)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let t=this._liveSpritesByKey[e]||[],i=this._deadSpritesByKey[e]||[];yield[e,t.concat(i)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let i of t)yield i}}spritesArray(){let w=[];for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let i of t)w.push(i)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let t=[];for(let i of this.spriteKeys)if(this.stypes[i]&&this.stypes[i].includes(w)){let r=e?(this._liveSpritesByKey[i]||[]).concat(this._deadSpritesByKey[i]||[]):this._liveSpritesByKey[i]||[];t.push(...r)}return t}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new s;w.classes={...this.classes},w.classArgs={};for(let[e,t]of Object.entries(this.classArgs))w.classArgs[e]={...t};w.stypes={};for(let[e,t]of Object.entries(this.stypes))w.stypes[e]=[...t];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var Mw=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},Bw=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Y=class extends Bw{constructor(w,e,t,i={}){let r=i.scoreChange||0;super(e,t,{scoreChange:r}),this.callFn=w;let{scoreChange:o,...l}=i;this.fnArgs=l,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},P=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof b||e===b){let i=w;t.res_type&&(i=t.res_type),t.color&&(this.resources_colors[i]=t.color),t.limit!==void 0&&(this.resources_limits[i]=t.limit),this.notable_resources.push(i)}}buildLevel(w){let e=w.split(`
`).filter(l=>l.length>0),t=e.map(l=>l.length),i=Math.min(...t),r=Math.max(...t);if(i!==r)throw new Error(`Inconsistent line lengths: min=${i}, max=${r}`);let o=new Gw(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let l=0;l<e.length;l++)for(let a=0;a<e[l].length;a++){let p=e[l][a],c=this.char_mapping[p];if(c){let h=[a*this.block_size,l*this.block_size];o.createSprites(c,h)}}return o.initState=o.getGameState(),o}},Gw=class{constructor(w,e,t,i,r,o=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=i,this.height=r,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=o,this.randomGenerator=new Mw(o),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new R(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let i=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return i&&(this.is_stochastic=this.domain.is_stochastic||i.is_stochastic||this.is_stochastic),i}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let a of e)a.just_pushed=null;for(let a of e)a.update(this);this.events_triggered=[];let[t,i,r]=this._moveEventHandling(),[o,l]=this._eventHandling(t);this.events_triggered=i.concat(o);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,p,c]of this.create_list)this.createSprite(a,p,c);for(let[a,p,c]of this.resource_changes){let h=this.domain.resources_limits&&this.domain.resources_limits[p]||1/0;a.resources[p]=Math.max(0,Math.min(a.resources[p]+c,h))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},i=this.domain.collision_eff.filter(o=>o.name==="stepBack"||o.name==="stepBackIfHasLess");for(let o of i){let[,l,a]=this._applyEffect(o,t);w.push(...l),e.push(...a)}let r=this.domain.collision_eff.filter(o=>["bounceForward","reverseDirection","turnAround"].includes(o.name));for(let o of r){let[,l,a]=this._applyEffect(o,t);w.push(...l),e.push(...a)}for(let o of i){let[,l,a]=this._applyEffect(o,t);w.push(...l),e.push(...a)}return[t,w,e]}_eventHandling(w){let e=[],t=[],i=this.domain.collision_eff.filter(r=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(r.name));for(let r of i){let[,o,l]=this._applyEffect(r,w);e.push(...o),t.push(...l)}return[e,t]}_applyEffect(w,e){let t=[],i=[],r=w.actor_stype,o=w.actee_stype;if(r in e||(e[r]=this.sprite_registry.withStype(r)),o!=="EOS"&&!(o in e)&&(e[o]=this.sprite_registry.withStype(o)),o==="EOS"){let c=e[r];for(let h=c.length-1;h>=0;h--){let m=c[h];this.containsRect(m.rect)||(this.addScore(w.score),w.call(m,null,this),t.push([w.name,m.id,"EOS"]),i.push([w.name,m.key,"EOS",[m.rect.x,m.rect.y],[null,null]]),!this.containsRect(m.rect)&&m.alive&&this.killSprite(m))}return[e,t,i]}let l=e[r],a=e[o];if(l.length===0||a.length===0)return[e,t,i];let p=!1;l.length>a.length&&([l,a]=[a,l],p=!0);for(let c of l)for(let h of a)c!==h&&c.rect.colliderect(h.rect)&&(p?this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,c,this),t.push([w.name,h.id,c.id]),i.push([w.name,h.key,c.key,[h.rect.x,h.rect.y],[c.rect.x,c.rect.y]])):this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,h,this),t.push([w.name,c.id,h.id]),i.push([w.name,c.key,h.key,[c.rect.x,c.rect.y],[h.rect.x,h.rect.y]])));return[e,t,i]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],i=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...i].map(r=>({id:r.id,key:r.key,x:r.rect.x,y:r.rect.y,w:r.rect.w,h:r.rect.h,alive:r.alive,resources:{...r.resources},speed:r.speed,cooldown:r.cooldown,orientation:r.orientation?{...r.orientation}:void 0,_age:r._age,lastmove:r.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let i of t){let r=this.sprite_registry.createSprite(e,{id:i.id,pos:[i.x,i.y],size:[i.w,i.h],rng:this.randomGenerator});r&&(r.resources=new Proxy({...i.resources},{get(o,l){return typeof l=="string"&&!(l in o)&&l!=="toJSON"&&l!=="then"&&l!==Symbol.toPrimitive&&l!==Symbol.toStringTag&&l!=="inspect"&&l!=="constructor"&&l!=="__proto__"?0:o[l]},set(o,l,a){return o[l]=a,!0}}),i.speed!==void 0&&(r.speed=i.speed),i.cooldown!==void 0&&(r.cooldown=i.cooldown),i.orientation&&(r.orientation={...i.orientation}),i._age!==void 0&&(r._age=i._age),i.lastmove!==void 0&&(r.lastmove=i.lastmove),r.alive=i.alive,i.alive||this.sprite_registry.killSprite(r))}}};function me(){n.register("VGDLSprite",y),n.register("Immovable",J),n.register("Passive",ww),n.register("Resource",b),n.register("ResourcePack",ew),n.register("Flicker",F),n.register("OrientedFlicker",U),n.register("OrientedSprite",A),n.register("Missile",K),n.register("SpawnPoint",B),n.register("SpriteProducer",M),n.register("Portal",tw),n.register("RandomNPC",z),n.register("Chaser",W),n.register("Fleeing",sw),n.register("Bomber",iw),n.register("Walker",rw),n.register("Conveyor",ow),n.register("Spreader",aw),n.register("Immutable",Z),n.register("MovingAvatar",j),n.register("OrientedAvatar",T),n.register("ShootAvatar",lw),n.register("HorizontalAvatar",I),n.register("FlakAvatar",nw),n.register("killSprite",E),n.register("killBoth",Kw),n.register("cloneSprite",Uw),n.register("transformTo",G),n.register("stepBack",$),n.register("stepBackIfHasLess",zw),n.register("undoAll",Ww),n.register("bounceForward",jw),n.register("catapultForward",$w),n.register("reverseDirection",Cw),n.register("turnAround",Yw),n.register("flipDirection",qw),n.register("wrapAround",Qw),n.register("collectResource",Vw),n.register("changeResource",Xw),n.register("addResource",Zw),n.register("removeResource",Jw),n.register("killIfOtherHasMore",we),n.register("killIfHasMore",ee),n.register("killIfOtherHasLess",te),n.register("killIfHasLess",se),n.register("spawnIfHasMore",ie),n.register("killIfAlive",re),n.register("conveySprite",oe),n.register("pullWithIt",ae),n.register("teleportToExit",le),n.register("teleportToOther",ne),n.register("wallBounce",ce),n.register("bounceDirection",he),n.register("Timeout",hw),n.register("SpriteCounter",pw),n.register("MultiSpriteCounter",mw),n.register("ResourceCounter",uw),n.register("GridPhysics",C),n.register("BasicGame",P);for(let[s,w]of Object.entries(X))n.register(s,w);n.register("UP",Iw),n.register("DOWN",Ow),n.register("LEFT",D),n.register("RIGHT",_)}var fw=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function Ne(s,w=8){s=s.replace(/\t/g," ".repeat(w));let e=s.split(`
`),t=new fw("",-1);for(let i of e){i.includes("#")&&(i=i.split("#")[0]);let r=i.trim();if(r.length>0){let o=i.length-i.trimStart().length;t=new fw(r,o,t)}}return t.getRoot()}var gw=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=Ne(t).children[0]);let[i,r]=this._parseArgs(t.content);Object.assign(r,e),this.spriteRegistry=new dw,this.game=new P(this.spriteRegistry,r);for(let o of t.children)o.content.startsWith("SpriteSet")&&this.parseSprites(o.children),o.content==="InteractionSet"&&this.parseInteractions(o.children),o.content==="LevelMapping"&&this.parseMappings(o.children),o.content==="TerminationSet"&&this.parseTerminations(o.children);return this.game.finishSetup(),this.game}_eval(w){if(n.has(w))return n.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let i=w.split(/\s+/).filter(r=>r.length>0);if(i.length===0)return[e,t];i[0].includes("=")||(e=this._eval(i[0]),i.shift());for(let r of i){let o=r.indexOf("=");if(o===-1)continue;let l=r.substring(0,o),a=r.substring(o+1);t[l]=this._eval(a)}return[e,t]}parseSprites(w,e=null,t={},i=[]){for(let r of w){if(!r.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${r.content}`);let[o,l]=r.content.split(">").map(h=>h.trim()),[a,p]=this._parseArgs(l,e,{...t}),c=[...i,o];if("singleton"in p&&(p.singleton===!0&&this.spriteRegistry.registerSingleton(o),delete p.singleton),r.children.length===0){this.verbose&&console.log("Defining:",o,a,p,c),this.spriteRegistry.registerSpriteClass(o,a,p,c);let h=this.game.sprite_order.indexOf(o);h!==-1&&this.game.sprite_order.splice(h,1),this.game.sprite_order.push(o)}else this.parseSprites(r.children,a,p,c)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,i]=e.content.split(">").map(a=>a.trim()),[r,o]=this._parseArgs(i),l=t.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<l.length;a++){let p=l[0],c=l[a],h;if(typeof r=="function"&&!r.prototype)h=new Y(r,p,c,o);else if(typeof r=="function")h=new Y(r,p,c,o);else throw new Error(`Unknown effect type: ${r}`);this.game.collision_eff.push(h)}}}parseTerminations(w){for(let e of w){let[t,i]=this._parseArgs(e.content);this.game.terminations.push(new t(i))}}parseMappings(w){for(let e of w){let[t,i]=e.content.split(">").map(o=>o.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let r=i.split(/\s+/).filter(o=>o.length>0);this.game.char_mapping[t]=r}}};var Sw=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let i of w.domain.sprite_order){let r=w.sprite_registry._liveSpritesByKey[i]||[];for(let o of r)this._drawSprite(o,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let i=w.rect.x*e,r=w.rect.y*e,o=w.rect.w*e,l=w.rect.h*e,a=null,p=null;if(w.img){let g=this._parseImg(w.img);a=g.color,p=g.shape}a||(a=w.color),a||(a=[128,128,128]);let c=w.shrinkfactor||0,h=i+o*c/2,m=r+l*c/2,v=o*(1-c),u=l*(1-c);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,p?this._drawShape(p,h,m,v,u):this.ctx.fillRect(h,m,v,u),w.orientation&&w.draw_arrow&&this._drawArrow(h,m,v,u,w.orientation,a),w.is_avatar&&this._drawResources(w,h,m,v,u)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],i=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let r of i)if(t.endsWith("_"+r)){let o=t.slice(0,-(r.length+1));return{color:e[o]||null,shape:r}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,i,r){let o=this.ctx,l=e+i/2,a=t+r/2,p=i/2,c=r/2,h=2/24,m=p*(1-2*h),v=c*(1-2*h);switch(o.beginPath(),w){case"CIRCLE":o.ellipse(l,a,m,v,0,0,Math.PI*2);break;case"TRIANGLE":{let u=a-v,g=a+v,S=l-m,d=l+m;o.moveTo(l,u),o.lineTo(d,g),o.lineTo(S,g),o.closePath();break}case"DIAMOND":o.moveTo(l,a-v),o.lineTo(l+m,a),o.lineTo(l,a+v),o.lineTo(l-m,a),o.closePath();break;case"STAR":{let u=Math.min(m,v),g=u*.4;for(let S=0;S<5;S++){let d=-Math.PI/2+S*(2*Math.PI/5),k=d+Math.PI/5;S===0?o.moveTo(l+u*Math.cos(d),a+u*Math.sin(d)):o.lineTo(l+u*Math.cos(d),a+u*Math.sin(d)),o.lineTo(l+g*Math.cos(k),a+g*Math.sin(k))}o.closePath();break}case"CROSS":{let u=m*2/3,g=u/2;o.rect(l-m,a-g,m*2,u),o.rect(l-g,a-v,u,v*2);break}case"HEXAGON":{let u=Math.min(m,v);for(let g=0;g<6;g++){let S=Math.PI/6+g*(Math.PI/3),d=l+u*Math.cos(S),k=a+u*Math.sin(S);g===0?o.moveTo(d,k):o.lineTo(d,k)}o.closePath();break}case"SQUARE":{let u=Math.min(m,v)*.05;o.rect(l-m+u,a-v+u,(m-u)*2,(v-u)*2);break}case"PENTAGON":{let u=Math.min(m,v);for(let g=0;g<5;g++){let S=-Math.PI/2+g*(2*Math.PI/5),d=l+u*Math.cos(S),k=a+u*Math.sin(S);g===0?o.moveTo(d,k):o.lineTo(d,k)}o.closePath();break}default:o.rect(e,t,i,r)}o.fill()}_drawArrow(w,e,t,i,r,o){let l=w+t/2,a=e+i/2,p=Math.min(t,i)*.3,c=[o[0],255-o[1],o[2]];this.ctx.strokeStyle=`rgb(${c[0]}, ${c[1]}, ${c[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(l,a),this.ctx.lineTo(l+r.x*p,a+r.y*p),this.ctx.stroke()}_drawResources(w,e,t,i,r){let o=w.resources,l=0,a=3;for(let p of Object.keys(o)){if(p==="toJSON")continue;let c=o[p];if(c>0){let h=t+r+l*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,h,i*Math.min(c/5,1),a),l++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var ue={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var Nw=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";function de(s){if(!s.delta_encoded)return;let w=s.states;if(!w||w.length<2){delete s.delta_encoded;return}let e=w[0].sprites;for(let t=1;t<w.length;t++){if(!("sprites"in w[t]))w[t].sprites=Object.assign({},e);else{let i=Object.assign({},e,w[t].sprites);for(let r in i)i[r]===null&&delete i[r];w[t].sprites=i}e=w[t].sprites}delete s.delta_encoded}me();var vw=["bait_vgfmri3","chase_vgfmri3","helper_vgfmri3","lemmings_vgfmri3","zelda_vgfmri3","plaqueAttack_vgfmri3"],yw=["bait_vgfmri4","chase_vgfmri4","helper_vgfmri4","lemmings_vgfmri4","zelda_vgfmri4","avoidGeorge_vgfmri4"],Pe=[{id:"cohort3",title:"Cohort 3 (vgfmri3)",games:vw,type:"human",cohort:"vgfmri3"},{id:"cohort4",title:"Cohort 4 (vgfmri4)",games:yw,type:"human",cohort:"vgfmri4"},{id:"lrm-cr",title:"Large Reasoning Models -- Copied-reasoning",games:[...vw,...yw],type:"llm",rationale_mode:"copied-reasoning",suggestion_level:"elaborate"},{id:"lrm-ao",title:"Large Reasoning Models -- Action-only",games:[...vw,...yw],type:"llm",rationale_mode:"action-only",suggestion_level:"elaborate"}],De={bait_vgfmri3:"Bait (v3)",bait_vgfmri4:"Bait (v4)",chase_vgfmri3:"Chase (v3)",chase_vgfmri4:"Chase (v4)",helper_vgfmri3:"Helper (v3)",helper_vgfmri4:"Helper (v4)",lemmings_vgfmri3:"Lemmings (v3)",lemmings_vgfmri4:"Lemmings (v4)",zelda_vgfmri3:"Zelda (v3)",zelda_vgfmri4:"Zelda (v4)",plaqueAttack_vgfmri3:"Plaque Attack (v3)",avoidGeorge_vgfmri4:"Avoid George (v4)"},He={bait_vgfmri3:"Bait",bait_vgfmri4:"Bait",chase_vgfmri3:"Chase",chase_vgfmri4:"Chase",helper_vgfmri3:"Helper",helper_vgfmri4:"Helper",lemmings_vgfmri3:"Lemmings",lemmings_vgfmri4:"Lemmings",zelda_vgfmri3:"Zelda",zelda_vgfmri4:"Zelda",plaqueAttack_vgfmri3:"Plaque Attack",avoidGeorge_vgfmri4:"Avoid George"},Fe=18,fe=20,Ke=300,Ue=700,bw={};async function ze(){let s=await fetch("catalogue-data/manifest.json");if(!s.ok)throw new Error("Failed to load catalogue-data/manifest.json");bw=await s.json()}async function We(s,w,{tries:e=3,baseDelayMs:t=250}={}){let i;for(let r=0;r<e;r++){try{let o=await fetch(s,w);if(o.ok||o.status<500&&o.status!==429)return o;i=new Error("HTTP "+o.status)}catch(o){i=o}if(r<e-1){let o=t*Math.pow(2,r)+Math.random()*200;await new Promise(l=>setTimeout(l,o))}}throw i||new Error("fetch failed")}function je(s){return Nw?`${Nw}/${s}`:"data/"+s}async function $e(s){let w=await We(s);if(!w.ok)return null;let e=s.split("?")[0].endsWith(".gz"),t;if(e){let r=new DecompressionStream("gzip");t=await new Response(w.body.pipeThrough(r)).text()}else t=await w.text();let i=JSON.parse(t);return de(i),i}function Ye(s){let w=bw[s];return w?Object.keys(w).sort():[]}function qe(s,w){return bw[s]?.[w]?.stats||{wins:0,losses:0}}function Pw(s,w,e){return bw[s]?.[w]?.replays?.[e]||null}function ge(s,w){let e={};for(let[t,i]of Object.entries(s.sprites))e[t]=i.map(r=>({id:r.id,key:r.key,x:r.col*w,y:r.row*w,w,h:w,alive:r.alive,resources:r.resources||{},speed:r.speed,cooldown:r.cooldown,orientation:r.orientation,_age:r._age,lastmove:r.lastmove}));return{score:s.score,time:s.time,sprites:e}}var O=class{constructor(w,e,t,i){this.gameName=e,this.playbackMode=t,this.subject=null,this.replayData=null,this.s3Key=null,this.states=[],this.steps=[],this.totalFrames=0,this.currentFrameIndex=0,this.currentStepIndex=0,this.playing=!1,this.playTimer=null,this.streamTimer=null,this.streamedChars=0,this._fullRationale="",this.currentLevel=null,this.currentLevelNum=-1,this.game=null,this.renderer=null,this.levels={},this._build(w,i)}_build(w,e){let t=document.createElement("div");t.className="game-card",this.titleEl=document.createElement("a"),this.titleEl.className="game-card-title",this.titleEl.textContent=e?De[this.gameName]||this.gameName:He[this.gameName]||this.gameName,this.titleEl.addEventListener("click",()=>this._openFullViewer()),t.appendChild(this.titleEl),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="canvas-container",this.canvas=document.createElement("canvas"),this.canvasContainer.appendChild(this.canvas),this.overlay=document.createElement("div"),this.overlay.className="canvas-overlay",this.overlay.textContent="Loading...",this.canvasContainer.appendChild(this.overlay),this.playIndicator=document.createElement("div"),this.playIndicator.className="play-indicator",this.playIndicator.innerHTML='<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>',this.canvasContainer.appendChild(this.playIndicator),this.canvasContainer.addEventListener("click",a=>{this.overlay.classList.contains("hidden")&&(a.stopPropagation(),this.togglePlay())}),t.appendChild(this.canvasContainer);let i=document.createElement("div");i.className="card-drawer-anchor";let r=document.createElement("div");r.className="card-drawer";let o=document.createElement("div");o.className="card-drawer-inner",this.scrubber=document.createElement("input"),this.scrubber.type="range",this.scrubber.min=0,this.scrubber.max=0,this.scrubber.value=0,this.scrubber.addEventListener("input",()=>{this._updatingScrubber||(this.stop(),this._goToIndex(parseInt(this.scrubber.value)))}),o.appendChild(this.scrubber);let l=document.createElement("div");if(l.className="flap-tabs",this.descTab=this._makeTab("Game Description","flap-tab-desc"),this.levelTab=this._makeTab("Level Layout","flap-tab-level"),this.tryTab=this._makeTab("Try Yourself","flap-tab-try"),l.appendChild(this.descTab),l.appendChild(this.levelTab),l.appendChild(this.tryTab),o.appendChild(l),this.descPanel=this._makePanel("flap-panel-desc"),this.descTextarea=this._makeTextarea(120),this.descPanel.appendChild(this.descTextarea),o.appendChild(this.descPanel),this.levelPanel=this._makePanel("flap-panel-level"),this.levelTextarea=this._makeTextarea(80),this.levelPanel.appendChild(this.levelTextarea),o.appendChild(this.levelPanel),this.descTab.addEventListener("click",()=>this._toggleFlap("desc")),this.levelTab.addEventListener("click",()=>this._toggleFlap("level")),this.tryTab.addEventListener("click",()=>this._openTryPage()),this.playbackMode==="llm"){let a=document.createElement("div");a.className="reasoning-stripe no-reasoning",this.reasoningText=document.createElement("div"),this.reasoningText.className="reasoning-text",this.reasoningText.textContent="",a.appendChild(this.reasoningText);let p=document.createElement("div");p.className="click-hint",p.textContent="Click to open full viewer",a.appendChild(p),this.reasoningStripe=a,a.addEventListener("click",()=>this._openFullViewer()),o.appendChild(a)}else this.reasoningStripe=null,this.reasoningText=null;r.appendChild(o),i.appendChild(r),t.appendChild(i),w.appendChild(t),this.cardEl=t}_makeTab(w,e){let t=document.createElement("button");return t.className="flap-tab "+e,t.textContent=w,t}_makePanel(w){let e=document.createElement("div");return e.className="flap-panel "+w,e}_makeTextarea(w){let e=document.createElement("textarea");return e.readOnly=!0,e.spellcheck=!1,e.style.height=w+"px",e}_toggleFlap(w){let e=[{tab:this.descTab,panel:this.descPanel,id:"desc"},{tab:this.levelTab,panel:this.levelPanel,id:"level"}];for(let t of e)if(t.id===w){let i=!t.panel.classList.contains("open");if(t.panel.classList.toggle("open"),t.tab.classList.toggle("active"),!i)continue}else t.panel.classList.remove("open"),t.tab.classList.remove("active")}_currentIndex(){return this.playbackMode==="human"?this.currentFrameIndex:this.currentStepIndex}_maxIndex(){return this.playbackMode==="human"?Math.max(0,this.totalFrames-1):Math.max(0,this.steps.length-1)}async load(w){if(this.overlay.textContent="Loading...",this.overlay.classList.remove("hidden"),this.stop(),this.s3Key=w,!w){this.overlay.textContent="No replay available";return}let e=await je(w);if(!e){this.overlay.textContent="Failed to resolve URL";return}let t=await $e(e);if(!t){this.overlay.textContent="Failed to load replay";return}this.replayData=t,this.states=t.states||[],this.steps=(t.steps||[]).filter(o=>!o.action.startsWith("_")),this.totalFrames=this.states.length;let i=ue[this.gameName];if(!i){this.overlay.textContent="Unknown game: "+this.gameName;return}if(this.playbackMode==="human"&&!t.game_description)throw new Error(this.gameName+": human replay missing game_description field");this.activeDesc=t.game_description||i.description;let r=new gw;this.game=r.parseGame(this.activeDesc),this.renderer=new Sw(this.canvas,Fe),this.levels=i.levels||{},this.currentLevelNum=-1,this.descTextarea.value=this.activeDesc,this.scrubber.max=this._maxIndex(),this.scrubber.value=0,this.overlay.classList.add("hidden"),this._initialLoad=!0,this._goToIndex(0),this._initialLoad=!1}_buildLevel(w){if(w===this.currentLevelNum)return;let e=this.levels[w];if(!e)return;this.currentLevel=this.game.buildLevel(e),this.currentLevelNum=w,this.renderer.resize(this.currentLevel.width,this.currentLevel.height),this.levelTextarea.value=e;let t=e.split(`
`).filter(r=>r.length>0);this.levelTextarea.style.height=Math.min(t.length*14+8,160)+"px";let i=this.currentLevel.sprite_registry._liveSpritesByKey.wall;if(i&&i.length>0){let r=i[0].color;r&&(this.canvasContainer.style.background=`rgb(${r[0]},${r[1]},${r[2]})`)}}_goToIndex(w){this.playbackMode==="human"?this._goToFrame(w):this._goToStep(w)}_goToFrame(w){if(!this.states.length)return;w=Math.max(0,Math.min(w,this.totalFrames-1)),this.currentFrameIndex=w;let e=this.states[w],t=e.level!==void 0?e.level:0;this._buildLevel(t),this.currentLevel&&(this.currentLevel.setGameState(ge(e,this.currentLevel.block_size)),this.currentLevel.score=e.score,this.currentLevel.time=w,this.renderer.render(this.currentLevel)),this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1}_goToStep(w){if(!this.steps.length)return;w=Math.max(0,Math.min(w,this.steps.length-1)),this.currentStepIndex=w;let e=this.steps[w];this._buildLevel(e.level!==void 0?e.level:0);let t=e.state_index!==void 0?e.state_index:e.frame_idx!==void 0?e.frame_idx:w;if(t>=0&&t<this.states.length&&this.currentLevel){let i=this.states[t];this.currentLevel.setGameState(ge(i,this.currentLevel.block_size)),this.currentLevel.score=i.score,this.currentLevel.time=i.time,this.renderer.render(this.currentLevel)}this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1,this._updateReasoning(e)}_updateReasoning(w){if(this._stopStream(),!this.reasoningStripe){this.playing&&this._scheduleNoReasoningAdvance();return}let t=(w.response||{}).rationale||w.hidden_reasoning||"";if(!t){this.reasoningStripe.classList.add("no-reasoning"),this.reasoningText.textContent=this.playing?w.action||"--":"",this.playing&&this._scheduleNoReasoningAdvance();return}if(this.reasoningStripe.classList.remove("no-reasoning"),!this.playing){this.reasoningText.textContent=this._initialLoad?"":t;return}this.streamedChars=0,this._fullRationale=t,this.reasoningText.textContent="",this._streamStartTime=performance.now(),this._streamDurationMs=Math.min(t.length/Ke*1e3,Ue),this._streamTick()}_streamTick(){let w=performance.now()-this._streamStartTime,e=Math.min(1,w/this._streamDurationMs),t=Math.round(e*this._fullRationale.length);this.reasoningText.textContent=this._fullRationale.slice(0,t),this.reasoningStripe.scrollTop=this.reasoningStripe.scrollHeight,e<1?this.streamTimer=requestAnimationFrame(()=>this._streamTick()):(this.streamTimer=null,this._onStreamDone())}_onStreamDone(){if(this.playing){if(this._currentIndex()>=this._maxIndex()){this.stop();return}this._goToIndex(this._currentIndex()+1)}}_scheduleNoReasoningAdvance(){this.playTimer=setTimeout(()=>this._onStreamDone(),1e3/fe)}_stopStream(){this.streamTimer&&(cancelAnimationFrame(this.streamTimer),this.streamTimer=null)}togglePlay(){this.playing?this.stop():this.play()}_flashIndicator(w){let e=w==="pause"?'<svg viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>':'<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>';this.playIndicator.innerHTML=e,this.playIndicator.classList.add("flash"),clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>this.playIndicator.classList.remove("flash"),400)}play(){this.playing=!0,this.cardEl.classList.add("is-playing"),this._flashIndicator("play"),this.playbackMode==="llm"?this.steps.length&&this._updateReasoning(this.steps[this.currentStepIndex]):this._scheduleNextFrame()}stop(){this.playing=!1,this.cardEl.classList.remove("is-playing"),this._flashIndicator("pause"),this._stopStream(),this.playTimer&&(clearTimeout(this.playTimer),this.playTimer=null)}_scheduleNextFrame(){if(!this.playing||this.currentFrameIndex>=this.totalFrames-1){this.stop();return}this.playTimer=setTimeout(()=>{this.playing&&(this._goToFrame(this.currentFrameIndex+1),this._scheduleNextFrame())},1e3/fe)}_openFullViewer(){if(this.playbackMode==="human"&&this.subject){let e=this.gameName.replace(/_vgfmri\d+$/,""),t=new URLSearchParams({subject:this.subject,game:e,stream:"main"});window.location.href="representation.html?"+t.toString();return}if(!this.s3Key)return;let w="replay.html?grid-key="+encodeURIComponent(this.s3Key)+"&step="+this.currentStepIndex;window.location.href=w}_openTryPage(){let w=this.currentLevelNum>=0?this.currentLevelNum:0,e="interactive-gameplay.html?game="+encodeURIComponent(this.gameName)+"&level="+w;this.s3Key&&(e+="&replay="+encodeURIComponent(this.s3Key)),window.location.href=e}destroy(){this.stop(),this.cardEl?.remove()}},Dw=class{constructor(w,e){this.def=e,this.cards=[],this.subjects=[],this.activeSubject=null,this.el=document.createElement("div"),this.el.className="cohort-section";let t=document.createElement("h2");t.className="cohort-heading",t.textContent=e.title,this.el.appendChild(t),this.selectorRow=document.createElement("div"),this.selectorRow.className="selector-row",this.el.appendChild(this.selectorRow),this.gridContainer=document.createElement("div"),this.el.appendChild(this.gridContainer),w.appendChild(this.el)}populate(){this.subjects=Ye(this.def.id),this._buildTabs(),this.subjects.length>0&&this.select(this.subjects[0])}_buildTabs(){this.selectorRow.innerHTML="";for(let w of this.subjects){let e=document.createElement("button");e.className="selector-tab";let t=qe(this.def.id,w),i=this.def.type==="llm"?w.split("/").pop():w;e.innerHTML=`${i} <span class="stats">${t.wins}W/${t.losses}L</span>`,e.addEventListener("click",()=>this.select(w)),this.selectorRow.appendChild(e)}}async select(w){this.activeSubject=w,this.selectorRow.querySelectorAll(".selector-tab").forEach((o,l)=>{o.classList.toggle("active",this.subjects[l]===w)});for(let o of this.cards)o.destroy();this.cards=[],this.gridContainer.innerHTML="";let t=this.def.type==="llm",i=t?"llm":"human",r=this.def.games;if(t){let o=document.createElement("div");o.className="cohort-block-label",o.textContent="vgfmri3 games",this.gridContainer.appendChild(o);let l=document.createElement("div");l.className="game-grid",this.gridContainer.appendChild(l);for(let h of vw){let m=new O(l,h,i,!0);m.subject=w,this.cards.push(m),m.load(Pw(this.def.id,w,h))}let a=document.createElement("hr");a.className="cohort-block-separator",this.gridContainer.appendChild(a);let p=document.createElement("div");p.className="cohort-block-label",p.textContent="vgfmri4 games",this.gridContainer.appendChild(p);let c=document.createElement("div");c.className="game-grid",this.gridContainer.appendChild(c);for(let h of yw){let m=new O(c,h,i,!0);m.subject=w,this.cards.push(m),m.load(Pw(this.def.id,w,h))}}else{let o=document.createElement("div");o.className="game-grid",this.gridContainer.appendChild(o);for(let l of r){let a=new O(o,l,i,!1);a.subject=w,this.cards.push(a),a.load(Pw(this.def.id,w,l))}}}};async function Qe(){let s=document.querySelectorAll(".cat-embed-card");if(s.length>0){for(let t of s){let i=t.dataset.game,r=t.dataset.mode||"llm",o=t.dataset.path;if(!i||!o){console.warn("cat-embed-card missing data-game or data-path",t);continue}new O(t,i,r,!0).load(o)}return}let w=document.getElementById("catalogue-root");if(!w)return;let e=new URLSearchParams(window.location.search);if(e.get("single")==="1"){let l=function(p){return i.length===1&&r.endsWith(".replay.json.gz")?r:`${r.replace(/\/+$/,"")}/${p}.replay.json.gz`},i=(e.get("games")||e.get("game")||"").split(",").map(p=>p.trim()).filter(Boolean),r=e.get("path")||"",o=e.get("mode")||"llm";if(i.length===0||!r){w.innerHTML='<div class="catalogue-loading">single mode needs ?games= and ?path=</div>';return}let a=e.get("autoplay")==="1";w.innerHTML="",w.classList.add("single-card-root"),i.length>1&&w.classList.add("multi-card-root");for(let p of i){let c=document.createElement("div");c.className="single-card-slot",w.appendChild(c);let h=new O(c,p,o,!0),m=h.load(l(p));a&&m.then(()=>h.play()).catch(()=>{})}return}await ze(),w.innerHTML="";for(let t of Pe)new Dw(w,t).populate()}Qe();})();
