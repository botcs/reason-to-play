// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var pt=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},u=new pt,ee=class pw{constructor(e,t,r,i){this.x=e,this.y=t,this.w=r,this.h=i}static fromPosSize(e,t){return new pw(e[0],e[1],t[0],t[1])}get left(){return this.x}set left(e){this.x=e}get top(){return this.y}set top(e){this.y=e}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(e,t){return typeof e=="object"&&e!==null?new pw(this.x+e.x,this.y+e.y,this.w,this.h):new pw(this.x+e,this.y+t,this.w,this.h)}copy(){return new pw(this.x,this.y,this.w,this.h)}colliderect(e){return this.x<e.x+e.w&&this.x+this.w>e.x&&this.y<e.y+e.h&&this.y+this.h>e.y}collidelistall(e){let t=[];for(let r=0;r<e.length;r++)this.colliderect(e[r].rect||e[r])&&t.push(r);return t}contains(e){return e.x>=this.x&&e.y>=this.y&&e.x+e.w<=this.x+this.w&&e.y+e.h<=this.y+this.h}equals(e){return this.x===e.x&&this.y===e.y&&this.w===e.w&&this.h===e.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}},x=class nt{constructor(...e){this.keys=Object.freeze([...e].sort())}asVector(){let e=0,t=0;for(let r of this.keys)r==="LEFT"&&(e-=1),r==="RIGHT"&&(e+=1),r==="UP"&&(t-=1),r==="DOWN"&&(t+=1);return{x:e,y:t}}equals(e){if(!(e instanceof nt)||this.keys.length!==e.keys.length)return!1;for(let t=0;t<this.keys.length;t++)if(this.keys[t]!==e.keys[t])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},te={NOOP:new x,UP:new x("UP"),DOWN:new x("DOWN"),LEFT:new x("LEFT"),RIGHT:new x("RIGHT"),SPACE:new x("SPACE"),SPACE_RIGHT:new x("SPACE","RIGHT"),SPACE_LEFT:new x("SPACE","LEFT")},mt=te.NOOP,re=[129,199,132],Ow=[25,118,210],Iw=[211,47,47],ie=[69,90,100],Tw=[250,250,250],ut=[109,76,65],se=[55,71,79],oe=[230,81,0],dt=[255,245,157],ft=[255,138,128],gt=[255,196,0],yt=[255,82,82],St=[255,112,67],vt=[144,202,249],bt=[185,246,202],kt=[207,216,220],xt=[68,90,100],Et=[1,87,155],_t=[92,107,192],At=[200,150,220],Ot=[255,230,230],le={GREEN:re,BLUE:Ow,RED:Iw,GRAY:ie,WHITE:Tw,BROWN:ut,BLACK:se,ORANGE:oe,YELLOW:dt,PINK:ft,GOLD:gt,LIGHTRED:yt,LIGHTORANGE:St,LIGHTBLUE:vt,LIGHTGREEN:bt,LIGHTGRAY:kt,DARKGRAY:xt,DARKBLUE:Et,PURPLE:_t,LIGHTPURPLE:At,LIGHTPINK:Ot},ae={x:0,y:-1},ne={x:0,y:1},Rw={x:-1,y:0},tw={x:1,y:0},rw=[ae,Rw,ne,tw];function Bw(w,e){return w.x===e.x&&w.y===e.y}function It(w){return Math.sqrt(w.x*w.x+w.y*w.y)}function J(w){let e=It(w);return e>0?{x:w.x/e,y:w.y/e}:{x:1,y:0}}var ce=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let r;if(e.asVector?r=e.asVector():r=e,Bw(r,{x:0,y:0}))return;w._updatePosition(r,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}},Tt=le,I=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:r,size:i=[1,1],color:s,speed:l,cooldown:a,physicstype:c,rng:o,img:h,resources:m,...n}=w;this.key=e,this.id=t;let p=Array.isArray(i)?i:[i,i];this.rect=new ee(r[0],r[1],p[0],p[1]),this.lastrect=this.rect,this.alive=!0;let d=c||this.constructor.physicstype||ce;if(this.physics=new d(p),this.speed=l??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=h||null,this.color=s||this.constructor.color,this.img&&this.img.startsWith("colors/")){let y=this.img.split("/")[1],S=Tt[y];S&&(this.color=S)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(m?{...m}:{},{get(y,S){return typeof S=="string"&&!(S in y)&&S!=="toJSON"&&S!=="then"&&S!==Symbol.toPrimitive&&S!==Symbol.toStringTag&&S!=="inspect"&&S!=="constructor"&&S!=="__proto__"?0:y[S]},set(y,S,k){return y[S]=k,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[y,S]of Object.entries(n))this[y]=S}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,r;if(e==null){let i=this.speed||0;t=w.x*i,r=w.y*i}else t=w.x*e,r=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:r}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},iw=class extends I{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},Rt=class extends I{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}},Bt=class extends I{static color=ie;static is_static=!0},Lt=class extends I{static color=Iw},Ct=class extends iw{static is_static=!0},he=class extends I{static color=Iw;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},mw=class extends I{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||tw)}},pe=class extends mw{static speed=1},me=class extends mw{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};me.limit=1;var Lw=class extends I{static stype=null},Mt=class extends Lw{static is_static=!0;static is_stochastic=!0;static color=Ow},Cw=class extends Lw{static color=se;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},ue=class extends I{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=rw[Math.floor(w.randomGenerator.random()*rw.length)];this.physics.activeMovement(this,e)}},de=class extends ue{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],r=w.getSprites(this.stype);for(let i of r){let s=this.physics.distance(this.rect,i.rect);s<e?(e=s,t=[i]):s===e&&t.push(i)}return t}_movesToward(w,e){let t=[],r=this.physics.distance(this.rect,e.rect);for(let i of rw){let s=this.rect.move(i),l=this.physics.distance(s,e.rect);this.fleeing&&r<l&&t.push(i),!this.fleeing&&r>l&&t.push(i)}return t}update(w){I.prototype.update.call(this,w);let e=[];for(let r of this._closestTargets(w))e.push(...this._movesToward(w,r));e.length===0&&(e=[...rw]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},Gt=class extends de{constructor(w){super({...w,fleeing:!0})}},Pt=class extends Cw{static color=oe;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||tw),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),Cw.prototype.update.call(this,w)}},Nt=class extends pe{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let e;this.orientation.x>0?e=1:this.orientation.x<0?e=-1:e=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:e,y:0})}super.update(w)}},Dt=class extends mw{static is_static=!0;static color=Ow;static strength=1;static draw_arrow=!0},Ht=class ct extends he{static spreadprob=1;update(e){if(super.update(e),this._age===2)for(let t of rw)e.randomGenerator.random()<(this.spreadprob||ct.spreadprob)&&e.addSpriteCreation(this.name,[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h])}};function uw(w,e){let t=[...e.active_keys].sort();for(let r=Math.max(3,t.length);r>=0;r--)for(let i of Ft(t,r)){let s=i.join(",");if(w._keysToAction.has(s))return w._keysToAction.get(s)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Ft(w,e){if(e===0)return[[]];if(w.length===0)return[];let t=[];function r(i,s){if(s.length===e){t.push([...s]);return}for(let l=i;l<w.length;l++)s.push(w[l]),r(l+1,s),s.pop()}return r(0,[]),t}function fe(w){let e=new Map;for(let t of Object.values(w)){let r=[...t.keys].sort().join(",");e.set(r,t)}return e}var ge=class extends I{static color=Tw;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=fe(e)}static declarePossibleActions(){return{UP:new x("UP"),DOWN:new x("DOWN"),LEFT:new x("LEFT"),RIGHT:new x("RIGHT"),NO_OP:new x}}update(w){I.prototype.update.call(this,w);let e=uw(this,w);e.equals(mt)||this.physics.activeMovement(this,e)}},dw=class extends I{static color=Tw;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||tw);let e=this.constructor.declarePossibleActions();this._keysToAction=fe(e)}static declarePossibleActions(){return{UP:new x("UP"),DOWN:new x("DOWN"),LEFT:new x("LEFT"),RIGHT:new x("RIGHT"),NO_OP:new x}}update(w){let e=this.orientation;this.orientation={x:0,y:0},I.prototype.update.call(this,w);let t=uw(this,w);t&&this.physics.activeMovement(this,t);let r=this.lastdirection;Math.abs(r.x)+Math.abs(r.y)!==0?this.orientation=r:this.orientation=e}},Kt=class extends dw{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=dw.declarePossibleActions();return w.SPACE=new x("SPACE"),w}update(w){dw.prototype.update.call(this,w);let e=uw(this,w);this._hasAmmo()&&e.equals(te.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let r=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],i=w.createSprite(this.stype,r);i&&i.orientation!==void 0&&(i.orientation=t)}this._spendAmmo()}_shootDirections(w){return[J(this.orientation)]}},fw=class extends ge{static declarePossibleActions(){return{LEFT:new x("LEFT"),RIGHT:new x("RIGHT"),NO_OP:new x}}update(w){I.prototype.update.call(this,w);let e=uw(this,w),t=e.asVector();(Bw(t,tw)||Bw(t,Rw))&&this.physics.activeMovement(this,e)}},Ut=class extends fw{static color=re;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=fw.declarePossibleActions();return w.SPACE=new x("SPACE"),w}update(w){fw.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function V(w,e,t){t.killSprite(w)}function zt(w,e,t){t.killSprite(w),t.killSprite(e)}function Wt(w,e,t){t.addSpriteCreation(w.key,[w.rect.x,w.rect.y])}function sw(w,e,t,{stype:r="wall"}={}){let i=w.lastrect;t.killSprite(w);let s=t.addSpriteCreation(r,w.rect.topleft);s!=null&&(s.lastrect=i,w.orientation!==void 0&&s.orientation!==void 0&&(s.orientation=w.orientation))}function $t(w,e,t,{resource:r,limit:i=1,no_symmetry:s=!1,exhaustStype:l=null}={}){w.resources[r]<i?gw(w,e,t,{no_symmetry:s}):l?t.kill_list.includes(e)||sw(e,w,t,{stype:l}):V(e,w,t)}function gw(w,e,t,{no_symmetry:r=!1}={}){!t.kill_list.includes(e)&&!t.kill_list.includes(w)&&(w.rect.equals(w.lastrect)&&!r?(e.rect=e.lastrect,Mw(e,0)):(w.rect=w.lastrect,Mw(w,0)))}function Mw(w,e){e>5||w.just_pushed&&(w.just_pushed.rect=w.just_pushed.lastrect,Mw(w.just_pushed,e+1))}function jt(w,e,t){for(let r of t.sprite_registry.sprites())r.rect=r.lastrect}function Gw(w,e){return w.just_pushed&&e<3?Gw(w.just_pushed,e+1):w.lastdirection}function Yt(w,e,t){let r=Gw(e,0);Math.abs(r.x)+Math.abs(r.y)===0?(r=Gw(w,0),e.physics.activeMovement(e,J(r)),e.just_pushed=w):(w.physics.activeMovement(w,J(r)),w.just_pushed=e)}function qt(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=w.lastdirection;if(Math.abs(i.x)+Math.abs(i.y)===0)return;let s=J(i),l=w.rect.width,a=w.rect.copy();a.x+=Math.round(s.x)*l,a.y+=Math.round(s.y)*l,!(a.x<0||a.y<0||a.x+a.width>t.screensize[0]||a.y+a.height>t.screensize[1])&&(w.rect=a,w.lastmove=0,r&&sw(e,w,t,{stype:r}))}function ye(w,e,t,{with_step_back:r=!0}={}){r&&(w.rect=w.lastrect),w.orientation!==void 0&&(w.orientation={x:-w.orientation.x,y:-w.orientation.y})}function Qt(w,e,t){w.rect=w.lastrect,w.lastmove=w.cooldown,w.physics.activeMovement(w,{x:0,y:1},1),ye(w,e,t,{with_step_back:!1})}function Xt(w,e,t){let r=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];w.orientation=r[Math.floor(t.randomGenerator.random()*r.length)]}function Jt(w,e,t,{offset:r=0}={}){w.rect.top<0?w.rect.top=t.screensize[1]-w.rect.height:w.rect.top+w.rect.height>t.screensize[1]&&(w.rect.top=0),w.rect.left<0?w.rect.left=t.screensize[0]-w.rect.width:w.rect.left+w.rect.width>t.screensize[0]&&(w.rect.left=0),w.lastmove=0}function Vt(w,e,t){if(!(w instanceof iw))throw new Error(`collectResource: sprite must be a Resource, got ${w.constructor.name}`);let r=w.resource_type,i=t.domain.resources_limits&&t.domain.resources_limits[r]||1/0;e.resources[r]=Math.max(0,Math.min(e.resources[r]+w.value,i))}function Zt(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([w,r,i])}function wr(w,e,t,{resource:r,value:i=1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function er(w,e,t,{resource:r,value:i=-1}={}){t.resource_changes.push([e,r,i]),t.kill_list.push(w)}function tr(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]>=i&&V(w,e,t)}function rr(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]>=i&&V(w,e,t)}function ir(w,e,t,{resource:r,limit:i=1}={}){e.resources[r]<=i&&V(w,e,t)}function sr(w,e,t,{resource:r,limit:i=1}={}){w.resources[r]<=i&&V(w,e,t)}function or(w,e,t,{resource:r,stype:i,limit:s=1}={}){w.resources[r]>=s&&t.addSpriteCreation(i,[w.rect.x,w.rect.y])}function lr(w,e,t){t.kill_list.includes(e)||V(w,e,t)}function ar(w,e,t){let r=w.lastrect,i=J(e.orientation);w.physics.activeMovement(w,i,e.strength||1),w.lastrect=r}function nr(w,e,t){if(!Se(w,t,"t_lastpull"))return;let r=w.lastrect,i=e.lastdirection,s=Math.abs(i.x)+Math.abs(i.y)>0?J(i):{x:1,y:0};w._updatePosition(s,(e.speed||1)*w.physics.gridsize[0]),w.lastrect=r}function cr(w,e,t){let r=t.sprite_registry.withStype(e.stype||e.key);if(r.length>0){let i=r[Math.floor(t.randomGenerator.random()*r.length)];w.rect=i.rect.copy()}w.lastmove=0}function hr(w,e,t,{exhaustStype:r=null}={}){if(w.lastrect.colliderect(e.rect))return;let i=t.sprite_registry.group(e.key).filter(l=>l!==e);if(i.length===0)return;let s=i[Math.floor(t.randomGenerator.random()*i.length)];w.rect=s.rect.copy(),w.lastrect=s.rect.copy(),w.lastmove=0,r&&(sw(e,w,t,{stype:r}),sw(s,w,t,{stype:r}))}function pr(w,e,t,{friction:r=0}={}){Se(w,t,"t_lastbounce")&&(w.speed!==null&&(w.speed*=1-r),gw(w,e,t),w.orientation!==void 0&&(Math.abs(w.rect.centerx-e.rect.centerx)>Math.abs(w.rect.centery-e.rect.centery)?w.orientation={x:-w.orientation.x,y:w.orientation.y}:w.orientation={x:w.orientation.x,y:-w.orientation.y}))}function mr(w,e,t,{friction:r=0}={}){if(gw(w,e,t),w.orientation!==void 0){let i=w.orientation,s=J({x:-w.rect.centerx+e.rect.centerx,y:-w.rect.centery+e.rect.centery}),l=s.x*i.x+s.y*i.y;w.orientation={x:-2*l*s.x+i.x,y:-2*l*s.y+i.y},w.speed!==null&&(w.speed*=1-r)}}function Se(w,e,t){return t in w._effect_data&&w._effect_data[t]===e.time?!1:(w._effect_data[t]=e.time,!0)}var yw=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},ur=class extends yw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},dr=class extends yw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},fr=class extends yw{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:r=0,...i}=w;super({win:e,scoreChange:t}),this.limit=r,this.stypes=[];for(let[s,l]of Object.entries(i))s.startsWith("stype")&&this.stypes.push(l)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},gr=class extends yw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}},yr=class ht{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(e){this.singletons.push(e)}isSingleton(e){return this.singletons.includes(e)}registerSpriteClass(e,t,r,i){if(e in this.classes)throw new Error(`Sprite key already registered: ${e}`);if(t==null)throw new Error(`Cannot register null class for key: ${e}`);this.classes[e]=t,this.classArgs[e]=r,this.stypes[e]=i,this.spriteKeys.push(e)}getSpriteDef(e){if(!(e in this.classes))throw new Error(`Unknown sprite type '${e}', verify your domain file`);return{cls:this.classes[e],args:this.classArgs[e],stypes:this.stypes[e]}}*getSpriteDefs(){for(let e of this.spriteKeys)yield[e,this.getSpriteDef(e)]}_generateIdNumber(e){let t=(this._liveSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),r=(this._deadSpritesByKey[e]||[]).map(s=>parseInt(s.id.split(".").pop())),i=t.concat(r);return i.length>0?Math.max(...i)+1:1}generateId(e){let t=this._generateIdNumber(e);return`${e}.${t}`}createSprite(e,t){if(this.isSingleton(e)&&(this._liveSpritesByKey[e]||[]).length>0)return null;let{cls:r,args:i,stypes:s}=this.getSpriteDef(e),l=t.id||this.generateId(e),a={...i,...t,key:e,id:l},c=new r(a);return c.stypes=s,this._liveSpritesByKey[e]||(this._liveSpritesByKey[e]=[]),this._liveSpritesByKey[e].push(c),this._spriteById[l]=c,c}killSprite(e){e.alive=!1;let t=e.key,r=this._liveSpritesByKey[t];if(r){let i=r.indexOf(e);i!==-1&&(r.splice(i,1),this._deadSpritesByKey[t]||(this._deadSpritesByKey[t]=[]),this._deadSpritesByKey[t].push(e))}}group(e,t=!1){let r=this._liveSpritesByKey[e]||[];if(!t)return r;let i=this._deadSpritesByKey[e]||[];return r.concat(i)}*groups(e=!1){for(let t of this.spriteKeys)if(e){let r=this._liveSpritesByKey[t]||[],i=this._deadSpritesByKey[t]||[];yield[t,r.concat(i)]}else yield[t,this._liveSpritesByKey[t]||[]]}*sprites(e=!1){if(e)throw new Error("sprites(includeDead=true) not supported");for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)yield i}}spritesArray(){let e=[];for(let t of this.spriteKeys){let r=this._liveSpritesByKey[t]||[];for(let i of r)e.push(i)}return e}withStype(e,t=!1){if(this.spriteKeys.includes(e))return this.group(e,t);let r=[];for(let i of this.spriteKeys)if(this.stypes[i]&&this.stypes[i].includes(e)){let s=t?(this._liveSpritesByKey[i]||[]).concat(this._deadSpritesByKey[i]||[]):this._liveSpritesByKey[i]||[];r.push(...s)}return r}getAvatar(){for(let[,e]of this.groups(!0))if(e.length>0&&this.isAvatar(e[0]))return e[0];return null}isAvatar(e){return this.isAvatarCls(e.constructor)}isAvatarCls(e){let t=e;for(;t&&t.name;){if(t.name.includes("Avatar"))return!0;t=Object.getPrototypeOf(t)}return!1}deepCopy(){let e=new ht;e.classes={...this.classes},e.classArgs={};for(let[t,r]of Object.entries(this.classArgs))e.classArgs[t]={...r};e.stypes={};for(let[t,r]of Object.entries(this.stypes))e.stypes[t]=[...r];return e.spriteKeys=[...this.spriteKeys],e.singletons=[...this.singletons],e}},Sr=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},vr=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},ve=class extends vr{constructor(w,e,t,r={}){let i=r.scoreChange||0;super(e,t,{scoreChange:i}),this.callFn=w;let{scoreChange:s,...l}=r;this.fnArgs=l,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},be=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof iw||e===iw){let r=w;t.res_type&&(r=t.res_type),t.color&&(this.resources_colors[r]=t.color),t.limit!==void 0&&(this.resources_limits[r]=t.limit),this.notable_resources.push(r)}}buildLevel(w){let e=w.split(`
`).filter(l=>l.length>0),t=e.map(l=>l.length),r=Math.min(...t),i=Math.max(...t);if(r!==i)throw new Error(`Inconsistent line lengths: min=${r}, max=${i}`);let s=new br(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let l=0;l<e.length;l++)for(let a=0;a<e[l].length;a++){let c=e[l][a],o=this.char_mapping[c];if(o){let h=[a*this.block_size,l*this.block_size];s.createSprites(o,h)}}return s.initState=s.getGameState(),s}},br=class{constructor(w,e,t,r,i,s=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=r,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=s,this.randomGenerator=new Sr(s),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new ee(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let r=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return r&&(this.is_stochastic=this.domain.is_stochastic||r.is_stochastic||this.is_stochastic),r}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let a of e)a.just_pushed=null;for(let a of e)a.update(this);this.events_triggered=[];let[t,r,i]=this._moveEventHandling(),[s,l]=this._eventHandling(t);this.events_triggered=r.concat(s);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,c,o]of this.create_list)this.createSprite(a,c,o);for(let[a,c,o]of this.resource_changes){let h=this.domain.resources_limits&&this.domain.resources_limits[c]||1/0;a.resources[c]=Math.max(0,Math.min(a.resources[c]+o,h))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},r=this.domain.collision_eff.filter(s=>s.name==="stepBack"||s.name==="stepBackIfHasLess");for(let s of r){let[,l,a]=this._applyEffect(s,t);w.push(...l),e.push(...a)}let i=this.domain.collision_eff.filter(s=>["bounceForward","reverseDirection","turnAround"].includes(s.name));for(let s of i){let[,l,a]=this._applyEffect(s,t);w.push(...l),e.push(...a)}for(let s of r){let[,l,a]=this._applyEffect(s,t);w.push(...l),e.push(...a)}return[t,w,e]}_eventHandling(w){let e=[],t=[],r=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of r){let[,s,l]=this._applyEffect(i,w);e.push(...s),t.push(...l)}return[e,t]}_applyEffect(w,e){let t=[],r=[],i=w.actor_stype,s=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),s!=="EOS"&&!(s in e)&&(e[s]=this.sprite_registry.withStype(s)),s==="EOS"){let o=e[i];for(let h=o.length-1;h>=0;h--){let m=o[h];this.containsRect(m.rect)||(this.addScore(w.score),w.call(m,null,this),t.push([w.name,m.id,"EOS"]),r.push([w.name,m.key,"EOS",[m.rect.x,m.rect.y],[null,null]]),!this.containsRect(m.rect)&&m.alive&&this.killSprite(m))}return[e,t,r]}let l=e[i],a=e[s];if(l.length===0||a.length===0)return[e,t,r];let c=!1;l.length>a.length&&([l,a]=[a,l],c=!0);for(let o of l)for(let h of a)o!==h&&o.rect.colliderect(h.rect)&&(c?this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,o,this),t.push([w.name,h.id,o.id]),r.push([w.name,h.key,o.key,[h.rect.x,h.rect.y],[o.rect.x,o.rect.y]])):this.kill_list.includes(o)||(this.addScore(w.score),w.call(o,h,this),t.push([w.name,o.id,h.id]),r.push([w.name,o.key,h.key,[o.rect.x,o.rect.y],[h.rect.x,h.rect.y]])));return[e,t,r]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],r=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...r].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let r of t){let i=this.sprite_registry.createSprite(e,{id:r.id,pos:[r.x,r.y],size:[r.w,r.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...r.resources},{get(s,l){return typeof l=="string"&&!(l in s)&&l!=="toJSON"&&l!=="then"&&l!==Symbol.toPrimitive&&l!==Symbol.toStringTag&&l!=="inspect"&&l!=="constructor"&&l!=="__proto__"?0:s[l]},set(s,l,a){return s[l]=a,!0}}),r.speed!==void 0&&(i.speed=r.speed),r.cooldown!==void 0&&(i.cooldown=r.cooldown),r.orientation&&(i.orientation={...r.orientation}),r._age!==void 0&&(i._age=r._age),r.lastmove!==void 0&&(i.lastmove=r.lastmove),i.alive=r.alive,r.alive||this.sprite_registry.killSprite(i))}}};function kr(){u.register("VGDLSprite",I),u.register("Immovable",Bt),u.register("Passive",Lt),u.register("Resource",iw),u.register("ResourcePack",Ct),u.register("Flicker",he),u.register("OrientedFlicker",me),u.register("OrientedSprite",mw),u.register("Missile",pe),u.register("SpawnPoint",Cw),u.register("SpriteProducer",Lw),u.register("Portal",Mt),u.register("RandomNPC",ue),u.register("Chaser",de),u.register("Fleeing",Gt),u.register("Bomber",Pt),u.register("Walker",Nt),u.register("Conveyor",Dt),u.register("Spreader",Ht),u.register("Immutable",Rt),u.register("MovingAvatar",ge),u.register("OrientedAvatar",dw),u.register("ShootAvatar",Kt),u.register("HorizontalAvatar",fw),u.register("FlakAvatar",Ut),u.register("killSprite",V),u.register("killBoth",zt),u.register("cloneSprite",Wt),u.register("transformTo",sw),u.register("stepBack",gw),u.register("stepBackIfHasLess",$t),u.register("undoAll",jt),u.register("bounceForward",Yt),u.register("catapultForward",qt),u.register("reverseDirection",ye),u.register("turnAround",Qt),u.register("flipDirection",Xt),u.register("wrapAround",Jt),u.register("collectResource",Vt),u.register("changeResource",Zt),u.register("addResource",wr),u.register("removeResource",er),u.register("killIfOtherHasMore",tr),u.register("killIfHasMore",rr),u.register("killIfOtherHasLess",ir),u.register("killIfHasLess",sr),u.register("spawnIfHasMore",or),u.register("killIfAlive",lr),u.register("conveySprite",ar),u.register("pullWithIt",nr),u.register("teleportToExit",cr),u.register("teleportToOther",hr),u.register("wallBounce",pr),u.register("bounceDirection",mr),u.register("Timeout",ur),u.register("SpriteCounter",dr),u.register("MultiSpriteCounter",fr),u.register("ResourceCounter",gr),u.register("GridPhysics",ce),u.register("BasicGame",be);for(let[w,e]of Object.entries(le))u.register(w,e);u.register("UP",ae),u.register("DOWN",ne),u.register("LEFT",Rw),u.register("RIGHT",tw)}var ke=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function xr(w,e=8){w=w.replace(/\t/g," ".repeat(e));let t=w.split(`
`),r=new ke("",-1);for(let i of t){i.includes("#")&&(i=i.split("#")[0]);let s=i.trim();if(s.length>0){let l=i.length-i.trimStart().length;r=new ke(s,l,r)}}return r.getRoot()}var Er=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=xr(t).children[0]);let[r,i]=this._parseArgs(t.content);Object.assign(i,e),this.spriteRegistry=new yr,this.game=new be(this.spriteRegistry,i);for(let s of t.children)s.content.startsWith("SpriteSet")&&this.parseSprites(s.children),s.content==="InteractionSet"&&this.parseInteractions(s.children),s.content==="LevelMapping"&&this.parseMappings(s.children),s.content==="TerminationSet"&&this.parseTerminations(s.children);return this.game.finishSetup(),this.game}_eval(w){if(u.has(w))return u.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let r=w.split(/\s+/).filter(i=>i.length>0);if(r.length===0)return[e,t];r[0].includes("=")||(e=this._eval(r[0]),r.shift());for(let i of r){let s=i.indexOf("=");if(s===-1)continue;let l=i.substring(0,s),a=i.substring(s+1);t[l]=this._eval(a)}return[e,t]}parseSprites(w,e=null,t={},r=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[s,l]=i.content.split(">").map(h=>h.trim()),[a,c]=this._parseArgs(l,e,{...t}),o=[...r,s];if("singleton"in c&&(c.singleton===!0&&this.spriteRegistry.registerSingleton(s),delete c.singleton),i.children.length===0){this.verbose&&console.log("Defining:",s,a,c,o),this.spriteRegistry.registerSpriteClass(s,a,c,o);let h=this.game.sprite_order.indexOf(s);h!==-1&&this.game.sprite_order.splice(h,1),this.game.sprite_order.push(s)}else this.parseSprites(i.children,a,c,o)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,r]=e.content.split(">").map(a=>a.trim()),[i,s]=this._parseArgs(r),l=t.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<l.length;a++){let c=l[0],o=l[a],h;if(typeof i=="function"&&!i.prototype)h=new ve(i,c,o,s);else if(typeof i=="function")h=new ve(i,c,o,s);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(h)}}}parseTerminations(w){for(let e of w){let[t,r]=this._parseArgs(e.content);this.game.terminations.push(new t(r))}}parseMappings(w){for(let e of w){let[t,r]=e.content.split(">").map(s=>s.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let i=r.split(/\s+/).filter(s=>s.length>0);this.game.char_mapping[t]=i}}},_r=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let r of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[r]||[];for(let s of i)this._drawSprite(s,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let r=w.rect.x*e,i=w.rect.y*e,s=w.rect.w*e,l=w.rect.h*e,a=null,c=null;if(w.img){let d=this._parseImg(w.img);a=d.color,c=d.shape}a||(a=w.color),a||(a=[128,128,128]);let o=w.shrinkfactor||0,h=r+s*o/2,m=i+l*o/2,n=s*(1-o),p=l*(1-o);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,c?this._drawShape(c,h,m,n,p):this.ctx.fillRect(h,m,n,p),w.orientation&&w.draw_arrow&&this._drawArrow(h,m,n,p,w.orientation,a),w.is_avatar&&this._drawResources(w,h,m,n,p)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],r=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of r)if(t.endsWith("_"+i)){let s=t.slice(0,-(i.length+1));return{color:e[s]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,r,i){let s=this.ctx,l=e+r/2,a=t+i/2,c=r/2,o=i/2,h=2/24,m=c*(1-2*h),n=o*(1-2*h);switch(s.beginPath(),w){case"CIRCLE":s.ellipse(l,a,m,n,0,0,Math.PI*2);break;case"TRIANGLE":{let p=a-n,d=a+n,y=l-m,S=l+m;s.moveTo(l,p),s.lineTo(S,d),s.lineTo(y,d),s.closePath();break}case"DIAMOND":s.moveTo(l,a-n),s.lineTo(l+m,a),s.lineTo(l,a+n),s.lineTo(l-m,a),s.closePath();break;case"STAR":{let p=Math.min(m,n),d=p*.4;for(let y=0;y<5;y++){let S=-Math.PI/2+y*(2*Math.PI/5),k=S+Math.PI/5;y===0?s.moveTo(l+p*Math.cos(S),a+p*Math.sin(S)):s.lineTo(l+p*Math.cos(S),a+p*Math.sin(S)),s.lineTo(l+d*Math.cos(k),a+d*Math.sin(k))}s.closePath();break}case"CROSS":{let p=m*2/3,d=p/2;s.rect(l-m,a-d,m*2,p),s.rect(l-d,a-n,p,n*2);break}case"HEXAGON":{let p=Math.min(m,n);for(let d=0;d<6;d++){let y=Math.PI/6+d*(Math.PI/3),S=l+p*Math.cos(y),k=a+p*Math.sin(y);d===0?s.moveTo(S,k):s.lineTo(S,k)}s.closePath();break}case"SQUARE":{let p=Math.min(m,n)*.05;s.rect(l-m+p,a-n+p,(m-p)*2,(n-p)*2);break}case"PENTAGON":{let p=Math.min(m,n);for(let d=0;d<5;d++){let y=-Math.PI/2+d*(2*Math.PI/5),S=l+p*Math.cos(y),k=a+p*Math.sin(y);d===0?s.moveTo(S,k):s.lineTo(S,k)}s.closePath();break}default:s.rect(e,t,r,i)}s.fill()}_drawArrow(w,e,t,r,i,s){let l=w+t/2,a=e+r/2,c=Math.min(t,r)*.3,o=[s[0],255-s[1],s[2]];this.ctx.strokeStyle=`rgb(${o[0]}, ${o[1]}, ${o[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(l,a),this.ctx.lineTo(l+i.x*c,a+i.y*c),this.ctx.stroke()}_drawResources(w,e,t,r,i){let s=w.resources,l=0,a=3;for(let c of Object.keys(s)){if(c==="toJSON")continue;let o=s[c];if(o>0){let h=t+i+l*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,h,r*Math.min(o/5,1),a),l++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}},Pw={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}},xe=["#1b6ec2","#2b9a3e","#d42020"];function Ee(w){return xe[Math.min(w,xe.length-1)]}function _e(w,e){if(e<=1)return 0;let t=e/3;return w<t?0:w<2*t?1:2}function Ar(w){let e=[],t=[],r=!1,i=null;for(let h=0;h<w.length;h++){let m=w[h].response||{},n=(m.rationale||m.scratchpad||m.reasoning||"").length;e.push(n),n>0&&(r=!0);let p=w[h].level;i!==null&&p!==i&&t.push(h),i=p}let s=e.filter(h=>h>0),l=null,a=0,c=0,o=1;if(s.length>0){let h=Math.min(...s),m=Math.max(...s);c=Math.log10(h);let n=Math.log10(m)-c;a=n>0?Math.min(25,Math.max(5,Math.ceil(Math.sqrt(s.length)))):1,o=n>0?n/a:1,l=e.map(p=>{if(p<=0)return-1;let d=Math.floor((Math.log10(p)-c)/o);return d>=a&&(d=a-1),d<0&&(d=0),d})}return{lengths:e,levelBoundaries:t,hasAny:r,binAssignments:l,binCount:a,logMin:c,logBinWidth:o}}function Ae(w,e){if(w===0)return 0;let t=Math.floor(Math.log10(w)),r=w/Math.pow(10,t),i;return e?r<1.5?i=1:r<3?i=2:r<7?i=5:i=10:r<=1?i=1:r<=2?i=2:r<=5?i=5:i=10,i*Math.pow(10,t)}function Sw(w,e,t){if(e<=w)return[w];let r=Ae(e-w,!1),i=Ae(r/Math.max(t-1,1),!0);if(i===0)return[w];let s=Math.floor(w/i)*i,l=Math.ceil(e/i)*i,a=[];for(let c=s;c<=l+i*.5;c+=i)a.push(Math.round(c));return a}function Oe(w){let e=w.getBoundingClientRect(),t=window.devicePixelRatio||1,r=e.width,i=e.height;w.width=r*t,w.height=i*t;let s=w.getContext("2d");return s.scale(t,t),{ctx:s,w:r,h:i}}function Nw(w,e){let t=[],r=Math.floor(Math.log10(Math.max(1,w))),i=Math.ceil(Math.log10(Math.max(1,e)));for(let s=r;s<=i;s++)for(let l of[1,2,5]){let a=l*Math.pow(10,s);a>=w&&a<=e&&t.push(a)}return t}function Or(w,e,t={}){let{logX:r=!1,logY:i=!1}=t,{lengths:s,binAssignments:l,binCount:a,logMin:c}=e,{ctx:o,w:h,h:m}=Oe(w),n={top:20,right:8,bottom:46,left:52},p=h-n.left-n.right,d=m-n.top-n.bottom;o.clearRect(0,0,h,m);let y=s.filter(f=>f>0),S=s.length-y.length;if(y.length===0){o.fillStyle="#999",o.font="12px monospace",o.textAlign="center",o.fillText("No reasoning data",h/2,m/2);return}let k=Math.min(...y),M=Math.max(...y),G=Math.log10(M)-c,P;if(r){P=new Array(a).fill(0);for(let f of l)f>=0&&P[f]++}else{P=new Array(a).fill(0);let f=M-k;if(f===0)P[0]=y.length;else for(let A of y){let K=Math.floor((A-k)/f*a);K>=a&&(K=a-1),P[K]++}}let q=Math.max(...P);if(q===0)return;let F=i&&q>1,Q=F?Math.log10(q):1;function Aw(f){return F?f<=0?0:Math.log10(f)/Q:f/q}o.strokeStyle="#ccc",o.lineWidth=1,o.font="10px monospace",o.textBaseline="middle",o.textAlign="right",o.fillStyle="#666";let we=F?Nw(1,q):Sw(0,q,5);for(let f of we){let A=n.top+d*(1-Aw(f));A<n.top-1||A>n.top+d+1||(o.beginPath(),o.moveTo(n.left,A),o.lineTo(n.left+p,A),o.stroke(),o.fillText(String(f),n.left-4,A))}let X=1,v=Math.max(1,(p-X*(a-1))/a);for(let f=0;f<a;f++){let A=Aw(P[f])*d,K=n.left+f*(v+X),wi=n.top+d-A;o.fillStyle=Ee(_e(f,a)),o.fillRect(K,wi,v,A)}if(o.textAlign="center",o.textBaseline="top",o.fillStyle="#666",r)if(G>0)for(let f of Nw(k,M)){let A=(Math.log10(f)-c)/G;o.fillText(String(f),n.left+A*p,n.top+d+4)}else o.fillText(String(k),n.left+p/2,n.top+d+4);else{let f=M-k;if(f>0)for(let A of Sw(k,M,5)){let K=(A-k)/f;o.fillText(String(A),n.left+K*p,n.top+d+4)}else o.fillText(String(k),n.left+p/2,n.top+d+4)}o.strokeStyle="#999",o.lineWidth=1,o.beginPath(),o.moveTo(n.left,n.top),o.lineTo(n.left,n.top+d),o.lineTo(n.left+p,n.top+d),o.stroke(),S>0&&(o.fillStyle="#999",o.font="9px monospace",o.textAlign="right",o.textBaseline="top",o.fillText(S+" empty",h-n.right,2)),o.font="10px monospace",o.fillStyle="#888",o.textAlign="center",o.textBaseline="bottom",o.fillText("Reasoning length (chars)",n.left+p/2,m-2),o.save(),o.translate(12,n.top+d/2),o.rotate(-Math.PI/2),o.textAlign="center",o.textBaseline="middle",o.fillText("Count",0,0),o.restore()}var vw={top:16,right:12,bottom:40,left:52};function Ir(w,e,t,r={}){let{logY:i=!1}=r,{lengths:s,levelBoundaries:l,binAssignments:a,binCount:c}=e,{ctx:o,w:h,h:m}=Oe(w),n=vw,p=h-n.left-n.right,d=m-n.top-n.bottom;o.clearRect(0,0,h,m);let y=s.length;if(y===0)return;let S=Math.max(...s),k=S>0?S:1,M=s.filter(v=>v>0),G=i&&S>1&&M.length>0,P=G?Math.log10(Math.min(...M)):0,q=(G?Math.log10(S):1)-P||1;function F(v){return n.left+(y>1?v/(y-1)*p:p/2)}function Q(v){return G?v<=0?n.top+d:n.top+d-(Math.log10(v)-P)/q*d:n.top+d-v/k*d}o.font="10px monospace",o.strokeStyle="#eee",o.lineWidth=1;let Aw=G?Nw(Math.min(...M),S):Sw(0,k,5);o.textAlign="right",o.textBaseline="middle",o.fillStyle="#666";for(let v of Aw){let f=Q(v);f<n.top-1||f>n.top+d+1||(o.beginPath(),o.moveTo(n.left,f),o.lineTo(n.left+p,f),o.stroke(),o.fillText(String(v),n.left-4,f))}let we=Sw(0,y-1,7);o.textAlign="center",o.textBaseline="top";for(let v of we){if(v<0||v>=y)continue;let f=F(v);o.beginPath(),o.moveTo(f,n.top),o.lineTo(f,n.top+d),o.stroke(),o.fillText(String(v+1),f,n.top+d+4)}if(o.strokeStyle="#999",o.lineWidth=1,o.beginPath(),o.moveTo(n.left,n.top),o.lineTo(n.left,n.top+d),o.lineTo(n.left+p,n.top+d),o.stroke(),l.length>0){o.save(),o.setLineDash([4,4]),o.strokeStyle="#bbb",o.lineWidth=1;for(let v of l){let f=F(v);o.beginPath(),o.moveTo(f,n.top),o.lineTo(f,n.top+d),o.stroke()}o.restore()}if(o.lineWidth=1.5,a&&y>1)for(let v=0;v<y-1;v++){if(G&&(s[v]<=0||s[v+1]<=0))continue;let f=a[v+1];o.strokeStyle=f>=0?Ee(_e(f,c)):"#ccc",o.beginPath(),o.moveTo(F(v),Q(s[v])),o.lineTo(F(v+1),Q(s[v+1])),o.stroke()}else{o.strokeStyle="#888",o.beginPath();let v=!1;for(let f=0;f<y;f++){if(G&&s[f]<=0){v=!1;continue}v?o.lineTo(F(f),Q(s[f])):(o.moveTo(F(f),Q(s[f])),v=!0)}o.stroke()}let X=Math.min(t,y-1);if(X>=0){let v=F(X);o.strokeStyle="rgba(204, 68, 68, 0.25)",o.lineWidth=1,o.beginPath(),o.moveTo(v,n.top),o.lineTo(v,n.top+d),o.stroke();let f=Q(s[X]);o.fillStyle="#cc4444",o.beginPath(),o.arc(v,f,4,0,Math.PI*2),o.fill(),o.fillStyle="#cc4444",o.font="bold 10px monospace",o.textAlign="left",o.textBaseline="bottom";let A=v+6,K=f-4;A+40>h?(o.textAlign="right",o.fillText(String(s[X]),v-6,K)):o.fillText(String(s[X]),A,K)}o.font="10px monospace",o.fillStyle="#888",o.textAlign="center",o.textBaseline="bottom",o.fillText("Step",n.left+p/2,m-2),o.save(),o.translate(12,n.top+d/2),o.rotate(-Math.PI/2),o.textAlign="center",o.textBaseline="middle",o.fillText("Reasoning length (chars)",0,0),o.restore()}function Tr(w){if(!w.delta_encoded)return;let e=w.states;if(!e||e.length<2){delete w.delta_encoded;return}let t=e[0].sprites;for(let r=1;r<e.length;r++){if(!("sprites"in e[r]))e[r].sprites=Object.assign({},t);else{let i=Object.assign({},t,e[r].sprites);for(let s in i)i[s]===null&&delete i[s];e[r].sprites=i}t=e[r].sprites}delete w.delta_encoded}var ei=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";kr();function b(w,e,t){if(w==null||w[e]===void 0)throw new Error(`[replay-viewer] missing required field '${e}' in ${t}. Check the Python pipeline did not drop it.`);return w[e]}var R=null,O=[],g=[],E=0,_=null,Ie=null,Dw=null,Z=null,Te=20,Rr=!1,W=null,bw=null,Re=null,$=null,U=-1,ww=[],ow=-1,Hw=null,B=null,lw=!1,kw=!1,Be=[],L=!1,z=0,aw=[],xw=[],nw=[],Le=null,N=document.getElementById("file-drop-zone"),j=document.getElementById("replay-loading"),Ce=document.getElementById("loading-label"),Fw=document.getElementById("loading-detail"),Br=document.getElementById("loading-fallback-link"),Me=document.getElementById("file-input"),Ge=document.getElementById("replay-container"),Lr=document.getElementById("game-canvas"),Kw=new _r(Lr,30),Cr=document.getElementById("btn-step-back"),Mr=document.getElementById("btn-reset"),Uw=document.getElementById("btn-play-pause"),Gr=document.getElementById("btn-step-fwd"),zw=document.getElementById("step-label"),Pe=document.getElementById("speed-select"),ew=document.getElementById("step-scrubber"),Ew=document.getElementById("metadata-panel"),Ww=document.getElementById("metadata-json"),Ne=document.getElementById("metadata-tab-summary"),De=document.getElementById("metadata-tab-json"),cw=document.getElementById("metadata-copy-btn"),Y=document.getElementById("action-log"),C=document.getElementById("btn-share"),He=document.getElementById("reasoning-charts"),Pr=document.getElementById("chart-histogram"),$w=document.getElementById("chart-line"),Fe=document.getElementById("chart-log-x"),Ke=document.getElementById("chart-log-y"),Nr=document.getElementById("multi-turn-layout"),D=document.getElementById("conversation-content");function jw(){let w=document.getElementById("conversation-panel"),e=document.querySelector(".canvas-wrapper"),t=document.querySelector(".playback-controls"),r=document.querySelector(".replay-left");if(!w||!e||!t||!r)return;let i=r.getBoundingClientRect(),s=e.getBoundingClientRect(),l=t.getBoundingClientRect();if(s.height===0||l.height===0)return;let a=Math.max(0,s.top-i.top),c=Math.max(0,l.bottom-s.top);w.style.flex="none",w.style.marginTop=a+"px",w.style.height=c+"px",Dr()}function Dr(){let w=document.getElementById("metadata-group"),e=document.getElementById("action-log"),t=document.getElementById("conversation-panel");if(!w||!e||!t)return;let r=e.getBoundingClientRect(),i=t.getBoundingClientRect();if(r.height===0||i.height===0)return;let s=i.bottom+12,l=Math.max(0,r.top-s);w.style.marginTop=l+"px",w.style.maxHeight="none",w.style.height=r.height+"px"}if(typeof ResizeObserver<"u"){let w=new ResizeObserver(()=>jw()),e=document.querySelector(".canvas-wrapper"),t=document.querySelector(".playback-controls"),r=document.getElementById("action-log");e&&w.observe(e),t&&w.observe(t),r&&w.observe(r)}window.addEventListener("resize",jw);var Yw=document.getElementById("flap-tab-desc"),qw=document.getElementById("flap-tab-level"),Ue=document.getElementById("flap-panel-desc"),ze=document.getElementById("flap-panel-level"),Hr=document.getElementById("game-desc"),Fr=document.getElementById("level-text"),We={up:document.getElementById("dpad-up"),down:document.getElementById("dpad-down"),left:document.getElementById("dpad-left"),right:document.getElementById("dpad-right"),action:document.getElementById("dpad-space")},Kr=Object.values(We),Qw=null;function $e(w){if(Qw===w){Qw=null,Yw.classList.remove("active"),qw.classList.remove("active"),Ue.classList.remove("open"),ze.classList.remove("open");return}Qw=w,Yw.classList.toggle("active",w==="desc"),qw.classList.toggle("active",w==="level"),Ue.classList.toggle("open",w==="desc"),ze.classList.toggle("open",w==="level")}Yw.addEventListener("click",()=>$e("desc")),qw.addEventListener("click",()=>$e("level")),N.addEventListener("click",()=>{Me.click()}),Me.addEventListener("change",w=>{w.target.files.length>0&&je(w.target.files[0])}),N.addEventListener("dragover",w=>{w.preventDefault(),N.classList.add("dragover")}),N.addEventListener("dragleave",()=>{N.classList.remove("dragover")}),N.addEventListener("drop",w=>{w.preventDefault(),N.classList.remove("dragover"),w.dataTransfer.files.length>0&&je(w.dataTransfer.files[0])});async function je(w){bw=w,Re=w.name,W=null;let e;if(w.name.endsWith(".gz")){let r=new DecompressionStream("gzip"),i=w.stream().pipeThrough(r);e=await new Response(i).text()}else e=await w.text();let t=JSON.parse(e);Ye(t)}function Ur(w,e,t){if(w.length>0&&w[0].state_index!==void 0){let s=[];for(let l=0;l<w.length;l++)s.push(w[l].state_index);return s.push(e-1),s}let r=[],i=0;for(let s=0;s<w.length;s++){if(s>0){let l=w[s-1],a=w[s];(a.level!==l.level||a.attempt!==l.attempt)&&i++}r.push(s+i)}return r.push(w.length+i),r}function zr(w,e){let t=new Array(e).fill(-1),r=[],i=new Array(e).fill(-1);for(let l=0;l<w.length;l++){let a=w[l].state_index;t[a]=l,r.push(a)}let s=-1;for(let l=0;l<e;l++)t[l]>=0&&(s=t[l]),i[l]=s;return{frameToStepMap:t,stepToFrameMap:r,lastActionStepForFrame:i}}function Ye(w){if(!w||!Array.isArray(w.states)){T(),R=null,bw=W=$=null,clearTimeout(Hw),Ge.classList.remove("visible"),N.style.display="none",C.style.display="none",Zw("Replay has no embedded trajectory","Choose a human or generative replay with recorded states from the interactive catalogue, or read the data-format guide.");for(let[l,a]of[["Interactive Catalogue","https://botcs.github.io/reason-to-play/catalogue.html"],["Data-format guide","https://github.com/botcs/reason-to-play-src/blob/main/docs/data-format.md"]]){let c=document.createElement("a");c.textContent=l,c.href=a,Fw.append(document.createTextNode(" "),c)}return!1}if(Tr(w),!w.game||!Pw[w.game]){alert("Unknown game: "+(w.game||"(none)")+". Not found in GAMES registry.");return}R=w;let e=document.querySelector(".canvas-wrapper");if(e){let l=typeof w.game=="string"&&w.game.endsWith("_vgfmri3");e.classList.toggle("vgfmri3-pad",l),l||(e.style.background="")}O=w.states,g=w.steps||[],Be=Ur(g,O.length,w.source);let t=g.length>0&&g[0].state_index!==void 0,r=["human","imputed","narration"].includes(w.source)&&g.length===0&&O.length>0;if(L=t&&O.length>g.length||r,L){z=O.length;let l=zr(g,O.length);aw=l.frameToStepMap,xw=l.stepToFrameMap,nw=l.lastActionStepForFrame}else z=0,aw=[],xw=[],nw=[];Rr=!!(w.meta&&w.meta.persistent),Nr.style.display="flex",N.style.display="none",j.style.display="none",j.classList.remove("error"),Ge.classList.add("visible"),requestAnimationFrame(jw),C.style.display="inline-block",Vr(),ew.min=0,ew.max=L?z-1:g.length,ew.value=0,qr(),B=Ar(g),B.hasAny?(He.classList.add("visible"),hw(0)):He.classList.remove("visible"),U=-1;let i=Pw[R.game],s=w.game_description||i.description;Le=s,Hr.value=s,Dw=null,H(0)}function qe(w){if(Dw===w)return;let e=Pw[R.game];Ie=new Er().parseGame(Le||e.description);let t=e.levels[w];if(!t){console.error("Level",w,"not found for game",R.game);return}_=Ie.buildLevel(t),Dw=w,Fr.value=t,Kw.resize(_.width,_.height);let r=document.querySelector(".canvas-wrapper");if(r&&r.classList.contains("vgfmri3-pad")){let i=_.sprite_registry._liveSpritesByKey.wall,s=i&&i[0]&&i[0].color;s&&(r.style.background=`rgb(${s[0]},${s[1]},${s[2]})`)}}function Qe(w,e){let t={};for(let[r,i]of Object.entries(w.sprites))t[r]=i.map(s=>({id:s.id,key:s.key,x:s.col*e,y:s.row*e,w:e,h:e,alive:s.alive,resources:s.resources||{},speed:s.speed,cooldown:s.cooldown,orientation:s.orientation,_age:s._age,lastmove:s.lastmove}));return{score:w.score,time:w.time,sprites:t}}function H(w){if(L){w<0&&(w=0),w>=z&&(w=z-1),E=w;let c=nw[w],o=O[w],h=o.level;if(h===void 0&&c>=0?h=g[c].level!==void 0?g[c].level:R.start_level||0:h===void 0&&(h=g.length>0&&g[0].level!==void 0?g[0].level:R.start_level||0),qe(h),w<0||w>=O.length)return;let m=_.block_size,n=Qe(o,m);_.setGameState(n);let p=`states[${w}] (frame mode)`;if(_.ended=b(o,"ended",p),_.won=b(o,"won",p),_.lose=b(o,"lose",p),_.timeout=b(o,"timeout",p),_.score=b(o,"score",p),_.time=w,Kw.render(_),Ze(),wt(),rt(),it(),ew.value=w,Vw(),B&&B.hasAny){let d=c>=0?c:0;hw(d)}return}let e=g.length;w<0&&(w=0),w>e&&(w=e),E=w;let t;if(w<g.length)t=g[w].level!==void 0?g[w].level:R.start_level||0;else{let c=g[g.length-1];t=c.level!==void 0?c.level:R.start_level||0}qe(t);let r=Be[w];if(r<0||r>=O.length)return;let i=O[r],s=_.block_size,l=Qe(i,s);_.setGameState(l);let a=`states[${r}] (step mode)`;_.ended=b(i,"ended",a),_.won=b(i,"won",a),_.lose=b(i,"lose",a),_.timeout=b(i,"timeout",a),_.score=b(i,"score",a),_.time=r,Kw.render(_),Ze(),wt(),rt(),it(),ew.value=w,Vw(),B&&B.hasAny&&hw(E)}function Xw(){H(E+1)}function Xe(){H(E-1)}function Je(){Z!==null?T():Ve()}function Ve(){Z===null&&(Uw.textContent="Pause",Te=Number(Pe.value)||20,Z=setInterval(()=>{let w=L?z-1:g.length;if(E>=w){T();return}Xw()},1e3/Te))}function T(){Z!==null&&(clearInterval(Z),Z=null),Uw.textContent="Play"}function Ze(){if(L){let e=E,t=nw[e],r=aw[e]>=0,i=t>=0?g[t]:null,s=O[e],l=s.level??(i&&i.level!==void 0?i.level:"?"),a=s.attempt??(i&&i.attempt!==void 0?i.attempt:"?"),c=r?"ACTION":"NO-OP";zw.textContent="Frame "+(e+1)+" / "+z+" ["+c+"] (L"+l+" A"+a+")";return}let w=g.length;if(E>=w)zw.textContent="Final / "+w+" steps";else{let e=g[E],t=e.level!==void 0?e.level:"?",r=e.attempt!==void 0?e.attempt:"?";zw.textContent="Step "+(E+1)+" / "+w+" (L"+t+" A"+r+")"}}function wt(){jr()}function Wr(w,e){let t=w[e];if(t.user_prompt!==void 0)return t.user_prompt;let r=`steps[${e}]`,i=b(t,"step",r),s=b(t,"level",r),l=b(t,"attempt",r),a=[];return $r(a,w,e,s,l),a.push("# Step "+i+" (Level "+s+", Attempt "+l+")"),a.push(""),a.push(b(t,"formatted_obs",r)),a.join(`
`)}function $r(w,e,t,r,i){let s=null,l=-1;for(let n=t-1;n>=0;n--){let p=e[n];if(!b(p,"action",`steps[${n}]`).startsWith("_")){s=p,l=n;break}}if(s===null)return;let a=`steps[${l}]`,c=b(s,"level",a),o=b(s,"attempt",a);if(c===r&&o===i)return;let h="";b(s,"won",a)?h="won":b(s,"lose",a)?h="died":b(s,"timeout",a)&&(h="timeout");let m=0;for(let n=l;n>=0;n--){let p=e[n];if(b(p,"action",`steps[${n}]`).startsWith("_"))continue;let d=b(p,"level",`steps[${n}]`),y=b(p,"attempt",`steps[${n}]`);if(d===c&&y===o)m+=b(p,"reward",`steps[${n}]`);else break}h&&(w.push("--- TRIAL ENDED outcome: "+h+", score: "+m+" ---"),w.push("")),w.push("--- NEW TRIAL (Level "+r+", Attempt "+i+") ---"),w.push("")}function jr(){let w;if(L){if(w=nw[E],w<0){tt(-1);return}}else w=E<g.length?E:g.length;tt(w)}function et(w){let e=g[w],t=document.createDocumentFragment(),r=document.createElement("div");r.className="msg msg-user",r.dataset.stepIdx=w;let i=document.createElement("div");i.className="msg-label",i.textContent="User (Step "+e.step+")",r.appendChild(i);let s=document.createElement("div");s.textContent=Wr(g,w),r.appendChild(s),t.appendChild(r);let l=e.response||{},a=document.createElement("div");a.className="msg msg-assistant",a.dataset.stepIdx=w;let c=document.createElement("div");c.className="msg-label",c.textContent="Assistant (Step "+e.step+")",a.appendChild(c);let o=[],h=l.rationale;h&&o.push(h),l.action&&o.push("Action: "+l.action);let m=document.createElement("div");return m.textContent=o.join(`

`)||"--",a.appendChild(m),t.appendChild(a),t}D.addEventListener("click",w=>{let e=w.target.closest(".msg[data-step-idx]");if(!e)return;let t=parseInt(e.dataset.stepIdx,10);if(!Number.isFinite(t)||!g||!g[t])return;let r=L?xw[t]??t:t;H(r)});function Jw(w){return w&&typeof w.action=="string"&&w.action.startsWith("_")}function Yr(w,e){let t=0;for(let r=w;r<=e;r++)Jw(g[r])||t++;return t}function tt(w){let e=Math.min(w,g.length-1);if(U<0){D.innerHTML="";let t=R.system_prompt;if(t){let r=document.createElement("div");r.className="msg msg-system";let i=document.createElement("div");i.className="msg-label",i.textContent="System",r.appendChild(i);let s=document.createElement("div");s.textContent=t,r.appendChild(s),D.appendChild(r)}for(let r=0;r<=e;r++)Jw(g[r])||D.appendChild(et(r));U=e,D.scrollTop=D.scrollHeight;return}if(e>U){for(let t=U+1;t<=e;t++)Jw(g[t])||D.appendChild(et(t));U=e,D.scrollTop=D.scrollHeight;return}if(e<U){let t=Yr(e+1,U);for(let r=0;r<t*2;r++)D.removeChild(D.lastChild);U=e}}function qr(){if(Y.innerHTML="",ww=[],ow=-1,L){let t=null,r=null;for(let i=0;i<z;i++){let s=aw[i],l=`states[${i}]`,a=b(O[i],"level",l),c=b(O[i],"attempt",l);if(a!==t||c!==r||i>0&&O[i].time<O[i-1].time){if(t!==null){let m=document.createElement("div");m.className="log-separator",m.textContent="--- Level "+a+", Attempt "+c+" ---",Y.appendChild(m)}t=a,r=c}let o=document.createElement("div");o.className="log-entry",o.dataset.index=i;let h="[F"+(i+1)+"]";if(s>=0){let m=g[s],n=`replaySteps[${s}]`,p=b(m,"level",n),d=b(m,"attempt",n),y=b(m,"step",n),S=b(m,"action",n).toUpperCase(),k="[L"+p+" A"+d+" #"+y+"]",M=b(m,"action_log",n),G=M.indexOf(" -> "),P=G>=0?" -> "+M.substring(G+4):"";o.textContent=h+k+" "+S+P}else{let m=O[i],n=m&&m.action_log;if(n){let p=n.indexOf(" -> "),d=p>=0?n.substring(p+4):"";d&&d!=="no change"?o.textContent=h+" NO-OP -> "+d:o.textContent=h+" NO-OP"}else o.textContent=h+" NO-OP";o.classList.add("noop-entry")}o.addEventListener("click",()=>{T(),H(i)}),Y.appendChild(o),ww.push(o)}return}let w=null,e=null;for(let t=0;t<g.length;t++){let r=g[t],i=`replaySteps[${t}]`,s=b(r,"level",i),l=b(r,"attempt",i);if(s!==w||l!==e){if(w!==null){let c=document.createElement("div");c.className="log-separator",c.textContent="--- Level "+s+", Attempt "+l+" ---",Y.appendChild(c)}w=s,e=l}let a=document.createElement("div");a.className="log-entry",a.dataset.index=t,a.textContent=b(r,"action_log",i),a.addEventListener("click",()=>{T(),H(t)}),Y.appendChild(a),ww.push(a)}}function rt(){if(ow>=0&&ow<ww.length&&ww[ow].classList.remove("current-step"),E>=0&&E<ww.length){let w=ww[E];w.classList.add("current-step");let e=Y.getBoundingClientRect(),t=w.getBoundingClientRect();t.top<e.top?Y.scrollTop-=e.top-t.top:t.bottom>e.bottom&&(Y.scrollTop+=t.bottom-e.bottom)}ow=E}function it(){let w=null;if(L){let t=aw[E];t>=0&&(w=(g[t].action||"").toLowerCase())}else E<g.length&&(w=(g[E].action||"").toLowerCase());for(let t of Kr)t.classList.remove("active");let e=w?We[w]:null;e&&e.classList.add("active")}Cr.addEventListener("click",()=>{T(),Xe()}),Mr.addEventListener("click",()=>{T(),window.location.href=window.location.pathname});function st(w){let e=w==="json";Ne.classList.toggle("active",!e),De.classList.toggle("active",e),Ew.style.display=e?"none":"grid",Ww.style.display=e?"block":"none",cw.style.display=e?"inline-block":"none"}Ne.addEventListener("click",()=>st("summary")),De.addEventListener("click",()=>st("json")),cw.addEventListener("click",async()=>{await navigator.clipboard.writeText(Ww.textContent);let w=cw.textContent;cw.textContent="Copied!",setTimeout(()=>{cw.textContent=w},1500)}),Gr.addEventListener("click",()=>{T(),Xw()}),Uw.addEventListener("click",()=>Je()),Pe.addEventListener("change",()=>{Z!==null&&(T(),Ve())}),ew.addEventListener("input",()=>{T(),H(Number(ew.value))});function hw(w){!B||!B.hasAny||(Or(Pr,B,{logX:lw,logY:kw}),Ir($w,B,w??E,{logY:lw}))}Fe.addEventListener("click",()=>{lw=!lw,Fe.classList.toggle("active",lw),hw()}),Ke.addEventListener("click",()=>{kw=!kw,Ke.classList.toggle("active",kw),hw()}),$w.addEventListener("click",w=>{if(!B||!B.hasAny||g.length===0)return;let e=$w.getBoundingClientRect(),t=w.clientX-e.left,r=e.width-vw.left-vw.right,i=(t-vw.left)/r,s=Math.round(i*(g.length-1));s>=0&&s<g.length&&(T(),H(L?xw[s]:s))}),document.addEventListener("keydown",w=>{let e=w.target.tagName;if(!(e==="TEXTAREA"||e==="INPUT"||e==="SELECT")&&R)switch(w.key){case"ArrowLeft":w.preventDefault(),T(),Xe();break;case"ArrowRight":w.preventDefault(),T(),Xw();break;case" ":w.preventDefault(),Je();break;case"Home":w.preventDefault(),T(),H(0);break;case"End":w.preventDefault(),T(),H(L?z-1:g.length);break}});function Qr(w){return w==null?"--":typeof w=="boolean"?w?"yes":"no":typeof w=="number"?Number.isFinite(w)&&!Number.isInteger(w)?w.toFixed(4):String(w):typeof w=="object"?JSON.stringify(w):String(w)}var ot=new Set(["states","steps"]);function Xr(){let w=[];for(let[e,t]of Object.entries(R))if(!ot.has(e))if(e==="meta"&&t&&typeof t=="object"&&!Array.isArray(t))for(let[r,i]of Object.entries(t))w.push([`meta.${r}`,i]);else w.push([e,t]);return w.sort(([e],[t])=>e.localeCompare(t)),w}function Jr(){let w={};for(let[e,t]of Object.entries(R))ot.has(e)||(w[e]=t);return w}function Vr(){Ew.innerHTML="";for(let[w,e]of Xr()){let t=document.createElement("span");t.className="meta-key",t.textContent=w;let r=document.createElement("span");r.className="meta-val",r.textContent=Qr(e),Ew.appendChild(t),Ew.appendChild(r)}Ww.textContent=JSON.stringify(Jr(),null,2)}function Vw(){!$&&!W||(clearTimeout(Hw),Hw=setTimeout(function(){let w=new URLSearchParams;$?w.set("grid-key",$):w.set("file",W),w.set("step",String(E)),history.replaceState(null,"","?"+w.toString())},200))}function lt(){let w=new URLSearchParams;return $?w.set("grid-key",$):w.set("file",W),w.set("step",String(E)),window.location.origin+"/replay.html?"+w.toString()}function at(w){C.textContent=w,C.disabled=!1,setTimeout(function(){C.textContent="Share"},2e3)}async function Zr(){if($||W){let i=lt();await navigator.clipboard.writeText(i),at("Link copied!");return}if(!bw)return;C.textContent="Uploading...",C.disabled=!0;let w=await fetch("/_api/upload-url?filename="+encodeURIComponent(Re));if(!w.ok){alert("Failed to get upload URL: "+w.status+" "+w.statusText),C.textContent="Share",C.disabled=!1;return}let e=await w.json(),t=await fetch(e.uploadUrl,{method:"PUT",body:bw});if(!t.ok){alert("Upload failed: "+t.status+" "+t.statusText),C.textContent="Share",C.disabled=!1;return}W=e.key,Vw();let r=lt();await navigator.clipboard.writeText(r),at("Link copied!")}C.addEventListener("click",Zr);function _w(w,e){N.style.display="none",j.classList.remove("error"),j.style.display="block",Ce.textContent=w,Fw.textContent=e||""}function Zw(w,e){j.classList.add("error"),j.style.display="block",Ce.textContent=w,Fw.textContent=e||""}Br.addEventListener("click",function(){j.style.display="none",j.classList.remove("error"),N.style.display=""}),(async function(){let w=new URLSearchParams(window.location.search),e=w.get("file"),t=w.get("url"),r=w.get("grid-key");if(!r&&!t&&!e)return;function i(c){if(!c)return"";let o=c.lastIndexOf("/");return o>=0?c.substring(o+1):c}let s,l,a="";try{r?(l=r.endsWith(".gz"),a=i(r),s=await ReasonToPlayAssets.resolveReplayUrl(r),_w("Downloading replay...",a)):t?(s=t,l=t.split("?")[0].endsWith(".gz"),a=i(t.split("?")[0])):(s="/"+e,l=e.endsWith(".gz"),a=i(e)),_w("Downloading replay...",a);let c=await fetch(s);if(!c.ok){Zw("Failed to download replay","HTTP "+c.status+" "+c.statusText);return}let o;if(l){_w("Decompressing...",a);let n=new DecompressionStream("gzip"),p=c.body.pipeThrough(n);o=await new Response(p).text()}else o=await c.text();_w("Parsing...",a);let h=JSON.parse(o);if($=r||null,W=e||null,Ye(h)===!1)return;let m=w.get("step");m!==null&&H(parseInt(m,10))}catch(c){Zw("Error loading replay",String(c)),console.error(c)}})()})();
