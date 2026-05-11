// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var Mw=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,r]of Object.entries(w))this.register(e,r)}},n=new Mw;var M=class t{constructor(w,e,r,s){this.x=w,this.y=e,this.w=r,this.h=s}static fromPosSize(w,e){return new t(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new t(this.x+w.x,this.y+w.y,this.w,this.h):new t(this.x+w,this.y+e,this.w,this.h)}copy(){return new t(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let r=0;r<w.length;r++)this.colliderect(w[r].rect||w[r])&&e.push(r);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var d=class t{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let r of this.keys)r==="LEFT"&&(w-=1),r==="RIGHT"&&(w+=1),r==="UP"&&(e-=1),r==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof t)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},k={NOOP:new d,UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),SPACE:new d("SPACE"),SPACE_RIGHT:new d("SPACE","RIGHT"),SPACE_LEFT:new d("SPACE","LEFT")},te=k.NOOP;var Pw=[129,199,132],sw=[25,118,210],ow=[211,47,47],Cw=[69,90,100],iw=[250,250,250],Ye=[109,76,65],Nw=[55,71,79],Dw=[230,81,0],$e=[255,245,157],je=[255,138,128],qe=[255,196,0],Qe=[255,82,82],Xe=[255,112,67],Ve=[144,202,249],Je=[185,246,202],Ze=[207,216,220],wt=[68,90,100],et=[1,87,155],tt=[92,107,192],rt=[200,150,220],st=[255,230,230],lw={GREEN:Pw,BLUE:sw,RED:ow,GRAY:Cw,WHITE:iw,BROWN:Ye,BLACK:Nw,ORANGE:Dw,YELLOW:$e,PINK:je,GOLD:qe,LIGHTRED:Qe,LIGHTORANGE:Xe,LIGHTBLUE:Ve,LIGHTGREEN:Je,LIGHTGRAY:Ze,DARKGRAY:wt,DARKBLUE:et,PURPLE:tt,LIGHTPURPLE:rt,LIGHTPINK:st},Hw={x:0,y:-1},Kw={x:0,y:1},$={x:-1,y:0},_={x:1,y:0},P=[Hw,$,Kw,_];function j(t,w){return t.x===w.x&&t.y===w.y}function ot(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function A(t){let w=ot(t);return w>0?{x:t.x/w,y:t.y/w}:{x:1,y:0}}var C=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,r){if(r==null&&(r=w.speed===null?1:w.speed),r!==0&&e!==null&&e!==void 0){let s;if(e.asVector?s=e.asVector():s=e,j(s,{x:0,y:0}))return;w._updatePosition(s,r*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var lt=lw,v=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:r,pos:s,size:o=[1,1],color:i,speed:a,cooldown:l,physicstype:m,rng:c,img:h,resources:p,...g}=w;this.key=e,this.id=r;let f=Array.isArray(o)?o:[o,o];this.rect=new M(s[0],s[1],f[0],f[1]),this.lastrect=this.rect,this.alive=!0;let S=m||this.constructor.physicstype||C;if(this.physics=new S(f),this.speed=a??this.constructor.speed,this.cooldown=l??this.constructor.cooldown,this.img=h||null,this.color=i||this.constructor.color,this.img&&this.img.startsWith("colors/")){let y=this.img.split("/")[1],u=lt[y];u&&(this.color=u)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(p?{...p}:{},{get(y,u){return typeof u=="string"&&!(u in y)&&u!=="toJSON"&&u!=="then"&&u!==Symbol.toPrimitive&&u!==Symbol.toStringTag&&u!=="inspect"&&u!=="constructor"&&u!=="__proto__"?0:y[u]},set(y,u,E){return y[u]=E,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[y,u]of Object.entries(g))this[y]=u}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let r,s;if(e==null){let o=this.speed||0;r=w.x*o,s=w.y*o}else r=w.x*e,s=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:r,y:s}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},b=class extends v{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},aw=class extends v{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var nw=class extends v{static color=Cw;static is_static=!0},cw=class extends v{static color=ow},hw=class extends b{static is_static=!0},q=class extends v{static color=ow;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},I=class extends v{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||_)}},Q=class extends I{static speed=1},X=class extends I{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};X.limit=1;var N=class extends v{static stype=null},pw=class extends N{static is_static=!0;static is_stochastic=!0;static color=sw},D=class extends N{static color=Nw;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},V=class extends v{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=P[Math.floor(w.randomGenerator.random()*P.length)];this.physics.activeMovement(this,e)}},J=class extends V{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,r=[],s=w.getSprites(this.stype);for(let o of s){let i=this.physics.distance(this.rect,o.rect);i<e?(e=i,r=[o]):i===e&&r.push(o)}return r}_movesToward(w,e){let r=[],s=this.physics.distance(this.rect,e.rect);for(let o of P){let i=this.rect.move(o),a=this.physics.distance(i,e.rect);this.fleeing&&s<a&&r.push(o),!this.fleeing&&s>a&&r.push(o)}return r}update(w){v.prototype.update.call(this,w);let e=[];for(let s of this._closestTargets(w))e.push(...this._movesToward(w,s));e.length===0&&(e=[...P]);let r=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,r)}},mw=class extends J{constructor(w){super({...w,fleeing:!0})}},fw=class extends D{static color=Dw;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||_),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),D.prototype.update.call(this,w)}},uw=class extends Q{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let r;this.orientation.x>0?r=1:this.orientation.x<0?r=-1:r=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:r,y:0})}super.update(w)}},dw=class extends I{static is_static=!0;static color=sw;static strength=1;static draw_arrow=!0},gw=class t extends q{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of P)w.randomGenerator.random()<(this.spreadprob||t.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function vw(t,w){let e=[...w.active_keys].sort();for(let r=Math.max(3,e.length);r>=0;r--)for(let s of at(e,r)){let o=s.join(",");if(t._keysToAction.has(o))return t._keysToAction.get(o)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function at(t,w){if(w===0)return[[]];if(t.length===0)return[];let e=[];function r(s,o){if(o.length===w){e.push([...o]);return}for(let i=s;i<t.length;i++)o.push(t[i]),r(i+1,o),o.pop()}return r(0,[]),e}function re(t){let w=new Map;for(let e of Object.values(t)){let r=[...e.keys].sort().join(",");w.set(r,e)}return w}var Z=class extends v{static color=iw;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=re(e)}static declarePossibleActions(){return{UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){v.prototype.update.call(this,w);let e=vw(this,w);e.equals(te)||this.physics.activeMovement(this,e)}},R=class extends v{static color=iw;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||_);let e=this.constructor.declarePossibleActions();this._keysToAction=re(e)}static declarePossibleActions(){return{UP:new d("UP"),DOWN:new d("DOWN"),LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){let e=this.orientation;this.orientation={x:0,y:0},v.prototype.update.call(this,w);let r=vw(this,w);r&&this.physics.activeMovement(this,r);let s=this.lastdirection;Math.abs(s.x)+Math.abs(s.y)!==0?this.orientation=s:this.orientation=e}},Sw=class extends R{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=R.declarePossibleActions();return w.SPACE=new d("SPACE"),w}update(w){R.prototype.update.call(this,w);let e=vw(this,w);this._hasAmmo()&&e.equals(k.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let r of e){let s=[this.lastrect.x+r.x*this.lastrect.w,this.lastrect.y+r.y*this.lastrect.h],o=w.createSprite(this.stype,s);o&&o.orientation!==void 0&&(o.orientation=r)}this._spendAmmo()}_shootDirections(w){return[A(this.orientation)]}},T=class extends Z{static declarePossibleActions(){return{LEFT:new d("LEFT"),RIGHT:new d("RIGHT"),NO_OP:new d}}update(w){v.prototype.update.call(this,w);let e=vw(this,w),r=e.asVector();(j(r,_)||j(r,$))&&this.physics.activeMovement(this,e)}},yw=class extends T{static color=Pw;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=T.declarePossibleActions();return w.SPACE=new d("SPACE"),w}update(w){T.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function O(t,w,e){e.killSprite(t)}function se(t,w,e){e.killSprite(t),e.killSprite(w)}function oe(t,w,e){e.addSpriteCreation(t.key,[t.rect.x,t.rect.y])}function H(t,w,e,{stype:r="wall"}={}){let s=t.lastrect;e.killSprite(t);let o=e.addSpriteCreation(r,t.rect.topleft);o!=null&&(o.lastrect=s,t.orientation!==void 0&&o.orientation!==void 0&&(o.orientation=t.orientation))}function ie(t,w,e,{resource:r,limit:s=1,no_symmetry:o=!1,exhaustStype:i=null}={}){t.resources[r]<s?ww(t,w,e,{no_symmetry:o}):i?e.kill_list.includes(w)||H(w,t,e,{stype:i}):O(w,t,e)}function ww(t,w,e,{no_symmetry:r=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(t)&&(t.rect.equals(t.lastrect)&&!r?(w.rect=w.lastrect,Fw(w,0)):(t.rect=t.lastrect,Fw(t,0)))}function Fw(t,w){w>5||t.just_pushed&&(t.just_pushed.rect=t.just_pushed.lastrect,Fw(t.just_pushed,w+1))}function le(t,w,e){for(let r of e.sprite_registry.sprites())r.rect=r.lastrect}function Uw(t,w){return t.just_pushed&&w<3?Uw(t.just_pushed,w+1):t.lastdirection}function ae(t,w,e){let r=Uw(w,0);Math.abs(r.x)+Math.abs(r.y)===0?(r=Uw(t,0),w.physics.activeMovement(w,A(r)),w.just_pushed=t):(t.physics.activeMovement(t,A(r)),t.just_pushed=w)}function ne(t,w,e,{exhaustStype:r=null}={}){if(t.lastrect.colliderect(w.rect))return;let s=t.lastdirection;if(Math.abs(s.x)+Math.abs(s.y)===0)return;let i=A(s),a=t.rect.width,l=t.rect.copy();l.x+=Math.round(i.x)*a,l.y+=Math.round(i.y)*a,!(l.x<0||l.y<0||l.x+l.width>e.screensize[0]||l.y+l.height>e.screensize[1])&&(t.rect=l,t.lastmove=0,r&&H(w,t,e,{stype:r}))}function zw(t,w,e,{with_step_back:r=!0}={}){r&&(t.rect=t.lastrect),t.orientation!==void 0&&(t.orientation={x:-t.orientation.x,y:-t.orientation.y})}function ce(t,w,e){t.rect=t.lastrect,t.lastmove=t.cooldown,t.physics.activeMovement(t,{x:0,y:1},1),zw(t,w,e,{with_step_back:!1})}function he(t,w,e){let r=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];t.orientation=r[Math.floor(e.randomGenerator.random()*r.length)]}function pe(t,w,e,{offset:r=0}={}){t.rect.top<0?t.rect.top=e.screensize[1]-t.rect.height:t.rect.top+t.rect.height>e.screensize[1]&&(t.rect.top=0),t.rect.left<0?t.rect.left=e.screensize[0]-t.rect.width:t.rect.left+t.rect.width>e.screensize[0]&&(t.rect.left=0),t.lastmove=0}function me(t,w,e){if(!(t instanceof b))throw new Error(`collectResource: sprite must be a Resource, got ${t.constructor.name}`);let r=t.resource_type,s=e.domain.resources_limits&&e.domain.resources_limits[r]||1/0;w.resources[r]=Math.max(0,Math.min(w.resources[r]+t.value,s))}function fe(t,w,e,{resource:r,value:s=1}={}){e.resource_changes.push([t,r,s])}function ue(t,w,e,{resource:r,value:s=1}={}){e.resource_changes.push([w,r,s]),e.kill_list.push(t)}function de(t,w,e,{resource:r,value:s=-1}={}){e.resource_changes.push([w,r,s]),e.kill_list.push(t)}function ge(t,w,e,{resource:r,limit:s=1}={}){w.resources[r]>=s&&O(t,w,e)}function Se(t,w,e,{resource:r,limit:s=1}={}){t.resources[r]>=s&&O(t,w,e)}function ye(t,w,e,{resource:r,limit:s=1}={}){w.resources[r]<=s&&O(t,w,e)}function ve(t,w,e,{resource:r,limit:s=1}={}){t.resources[r]<=s&&O(t,w,e)}function ke(t,w,e,{resource:r,stype:s,limit:o=1}={}){t.resources[r]>=o&&e.addSpriteCreation(s,[t.rect.x,t.rect.y])}function be(t,w,e){e.kill_list.includes(w)||O(t,w,e)}function xe(t,w,e){let r=t.lastrect,s=A(w.orientation);t.physics.activeMovement(t,s,w.strength||1),t.lastrect=r}function Ee(t,w,e){if(!Re(t,e,"t_lastpull"))return;let r=t.lastrect,s=w.lastdirection,i=Math.abs(s.x)+Math.abs(s.y)>0?A(s):{x:1,y:0};t._updatePosition(i,(w.speed||1)*t.physics.gridsize[0]),t.lastrect=r}function _e(t,w,e){let r=e.sprite_registry.withStype(w.stype||w.key);if(r.length>0){let s=r[Math.floor(e.randomGenerator.random()*r.length)];t.rect=s.rect.copy()}t.lastmove=0}function Ae(t,w,e,{exhaustStype:r=null}={}){if(t.lastrect.colliderect(w.rect))return;let s=e.sprite_registry.group(w.key).filter(i=>i!==w);if(s.length===0)return;let o=s[Math.floor(e.randomGenerator.random()*s.length)];t.rect=o.rect.copy(),t.lastrect=o.rect.copy(),t.lastmove=0,r&&(H(w,t,e,{stype:r}),H(o,t,e,{stype:r}))}function Oe(t,w,e,{friction:r=0}={}){Re(t,e,"t_lastbounce")&&(t.speed!==null&&(t.speed*=1-r),ww(t,w,e),t.orientation!==void 0&&(Math.abs(t.rect.centerx-w.rect.centerx)>Math.abs(t.rect.centery-w.rect.centery)?t.orientation={x:-t.orientation.x,y:t.orientation.y}:t.orientation={x:t.orientation.x,y:-t.orientation.y}))}function Ie(t,w,e,{friction:r=0}={}){if(ww(t,w,e),t.orientation!==void 0){let s=t.orientation,o=A({x:-t.rect.centerx+w.rect.centerx,y:-t.rect.centery+w.rect.centery}),i=o.x*s.x+o.y*s.y;t.orientation={x:-2*i*o.x+s.x,y:-2*i*o.y+s.y},t.speed!==null&&(t.speed*=1-r)}}function Re(t,w,e){return e in t._effect_data&&t._effect_data[e]===w.time?!1:(t._effect_data[e]=w.time,!0)}var K=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},kw=class extends K{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},bw=class extends K{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},xw=class extends K{constructor(w={}){let{win:e=!0,scoreChange:r=0,limit:s=0,...o}=w;super({win:e,scoreChange:r}),this.limit=s,this.stypes=[];for(let[i,a]of Object.entries(o))i.startsWith("stype")&&this.stypes.push(a)}isDone(w){let e=0;for(let r of this.stypes)e+=w.numSprites(r);return e===this.limit?[!0,this.win]:[!1,null]}},Ew=class extends K{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var _w=class t{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,r,s){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=r,this.stypes[w]=s,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(o=>parseInt(o.id.split(".").pop())),r=(this._deadSpritesByKey[w]||[]).map(o=>parseInt(o.id.split(".").pop())),s=e.concat(r);return s.length>0?Math.max(...s)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:r,args:s,stypes:o}=this.getSpriteDef(w),i=e.id||this.generateId(w),a={...s,...e,key:w,id:i},l=new r(a);return l.stypes=o,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(l),this._spriteById[i]=l,l}killSprite(w){w.alive=!1;let e=w.key,r=this._liveSpritesByKey[e];if(r){let s=r.indexOf(w);s!==-1&&(r.splice(s,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let r=this._liveSpritesByKey[w]||[];if(!e)return r;let s=this._deadSpritesByKey[w]||[];return r.concat(s)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let r=this._liveSpritesByKey[e]||[],s=this._deadSpritesByKey[e]||[];yield[e,r.concat(s)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let r=this._liveSpritesByKey[e]||[];for(let s of r)yield s}}spritesArray(){let w=[];for(let e of this.spriteKeys){let r=this._liveSpritesByKey[e]||[];for(let s of r)w.push(s)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let r=[];for(let s of this.spriteKeys)if(this.stypes[s]&&this.stypes[s].includes(w)){let o=e?(this._liveSpritesByKey[s]||[]).concat(this._deadSpritesByKey[s]||[]):this._liveSpritesByKey[s]||[];r.push(...o)}return r}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new t;w.classes={...this.classes},w.classArgs={};for(let[e,r]of Object.entries(this.classArgs))w.classArgs[e]={...r};w.stypes={};for(let[e,r]of Object.entries(this.stypes))w.stypes[e]=[...r];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var Ww=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},Yw=class{constructor(w,e,{scoreChange:r=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=r,this.is_stochastic=!1}call(w,e,r){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},ew=class extends Yw{constructor(w,e,r,s={}){let o=s.scoreChange||0;super(e,r,{scoreChange:o}),this.callFn=w;let{scoreChange:i,...a}=s;this.fnArgs=a,this._name=w.name||"anonymous"}call(w,e,r){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,r,this.fnArgs):this.callFn(w,e,r)}get name(){return this._name}},F=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:r}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof b||e===b){let s=w;r.res_type&&(s=r.res_type),r.color&&(this.resources_colors[s]=r.color),r.limit!==void 0&&(this.resources_limits[s]=r.limit),this.notable_resources.push(s)}}buildLevel(w){let e=w.split(`
`).filter(a=>a.length>0),r=e.map(a=>a.length),s=Math.min(...r),o=Math.max(...r);if(s!==o)throw new Error(`Inconsistent line lengths: min=${s}, max=${o}`);let i=new $w(this,this.domain_registry.deepCopy(),w,r[0],e.length,this.seed);for(let a=0;a<e.length;a++)for(let l=0;l<e[a].length;l++){let m=e[a][l],c=this.char_mapping[m];if(c){let h=[l*this.block_size,a*this.block_size];i.createSprites(c,h)}}return i.initState=i.getGameState(),i}},$w=class{constructor(w,e,r,s,o,i=0){this.domain=w,this.sprite_registry=e,this.levelstring=r,this.width=s,this.height=o,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=i,this.randomGenerator=new Ww(i),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new M(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,r){let s=this.sprite_registry.createSprite(w,{pos:e,id:r,size:[this.block_size,this.block_size],rng:this.randomGenerator});return s&&(this.is_stochastic=this.domain.is_stochastic||s.is_stochastic||this.is_stochastic),s}createSprites(w,e){return w.map(r=>this.createSprite(r,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,r){return this.create_list.push([w,e,r]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let l of e)l.just_pushed=null;for(let l of e)l.update(this);this.events_triggered=[];let[r,s,o]=this._moveEventHandling(),[i,a]=this._eventHandling(r);this.events_triggered=s.concat(i);for(let l of this.kill_list)this.sprite_registry.killSprite(l);for(let[l,m,c]of this.create_list)this.createSprite(l,m,c);for(let[l,m,c]of this.resource_changes){let h=this.domain.resources_limits&&this.domain.resources_limits[m]||1/0;l.resources[m]=Math.max(0,Math.min(l.resources[m]+c,h))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],r={},s=this.domain.collision_eff.filter(i=>i.name==="stepBack"||i.name==="stepBackIfHasLess");for(let i of s){let[,a,l]=this._applyEffect(i,r);w.push(...a),e.push(...l)}let o=this.domain.collision_eff.filter(i=>["bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of o){let[,a,l]=this._applyEffect(i,r);w.push(...a),e.push(...l)}for(let i of s){let[,a,l]=this._applyEffect(i,r);w.push(...a),e.push(...l)}return[r,w,e]}_eventHandling(w){let e=[],r=[],s=this.domain.collision_eff.filter(o=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(o.name));for(let o of s){let[,i,a]=this._applyEffect(o,w);e.push(...i),r.push(...a)}return[e,r]}_applyEffect(w,e){let r=[],s=[],o=w.actor_stype,i=w.actee_stype;if(o in e||(e[o]=this.sprite_registry.withStype(o)),i!=="EOS"&&!(i in e)&&(e[i]=this.sprite_registry.withStype(i)),i==="EOS"){let c=e[o];for(let h=c.length-1;h>=0;h--){let p=c[h];this.containsRect(p.rect)||(this.addScore(w.score),w.call(p,null,this),r.push([w.name,p.id,"EOS"]),s.push([w.name,p.key,"EOS",[p.rect.x,p.rect.y],[null,null]]),!this.containsRect(p.rect)&&p.alive&&this.killSprite(p))}return[e,r,s]}let a=e[o],l=e[i];if(a.length===0||l.length===0)return[e,r,s];let m=!1;a.length>l.length&&([a,l]=[l,a],m=!0);for(let c of a)for(let h of l)c!==h&&c.rect.colliderect(h.rect)&&(m?this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,c,this),r.push([w.name,h.id,c.id]),s.push([w.name,h.key,c.key,[h.rect.x,h.rect.y],[c.rect.x,c.rect.y]])):this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,h,this),r.push([w.name,c.id,h.id]),s.push([w.name,c.key,h.key,[c.rect.x,c.rect.y],[h.rect.x,h.rect.y]])));return[e,r,s]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,r]=w.isDone(this);if(this.ended=e,this.won=r===null?!1:r,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let r=this.sprite_registry._liveSpritesByKey[e]||[],s=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...r,...s].map(o=>({id:o.id,key:o.key,x:o.rect.x,y:o.rect.y,w:o.rect.w,h:o.rect.h,alive:o.alive,resources:{...o.resources},speed:o.speed,cooldown:o.cooldown,orientation:o.orientation?{...o.orientation}:void 0,_age:o._age,lastmove:o.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,r]of Object.entries(w.sprites))for(let s of r){let o=this.sprite_registry.createSprite(e,{id:s.id,pos:[s.x,s.y],size:[s.w,s.h],rng:this.randomGenerator});o&&(o.resources=new Proxy({...s.resources},{get(i,a){return typeof a=="string"&&!(a in i)&&a!=="toJSON"&&a!=="then"&&a!==Symbol.toPrimitive&&a!==Symbol.toStringTag&&a!=="inspect"&&a!=="constructor"&&a!=="__proto__"?0:i[a]},set(i,a,l){return i[a]=l,!0}}),s.speed!==void 0&&(o.speed=s.speed),s.cooldown!==void 0&&(o.cooldown=s.cooldown),s.orientation&&(o.orientation={...s.orientation}),s._age!==void 0&&(o._age=s._age),s.lastmove!==void 0&&(o.lastmove=s.lastmove),o.alive=s.alive,s.alive||this.sprite_registry.killSprite(o))}}};function Te(){n.register("VGDLSprite",v),n.register("Immovable",nw),n.register("Passive",cw),n.register("Resource",b),n.register("ResourcePack",hw),n.register("Flicker",q),n.register("OrientedFlicker",X),n.register("OrientedSprite",I),n.register("Missile",Q),n.register("SpawnPoint",D),n.register("SpriteProducer",N),n.register("Portal",pw),n.register("RandomNPC",V),n.register("Chaser",J),n.register("Fleeing",mw),n.register("Bomber",fw),n.register("Walker",uw),n.register("Conveyor",dw),n.register("Spreader",gw),n.register("Immutable",aw),n.register("MovingAvatar",Z),n.register("OrientedAvatar",R),n.register("ShootAvatar",Sw),n.register("HorizontalAvatar",T),n.register("FlakAvatar",yw),n.register("killSprite",O),n.register("killBoth",se),n.register("cloneSprite",oe),n.register("transformTo",H),n.register("stepBack",ww),n.register("stepBackIfHasLess",ie),n.register("undoAll",le),n.register("bounceForward",ae),n.register("catapultForward",ne),n.register("reverseDirection",zw),n.register("turnAround",ce),n.register("flipDirection",he),n.register("wrapAround",pe),n.register("collectResource",me),n.register("changeResource",fe),n.register("addResource",ue),n.register("removeResource",de),n.register("killIfOtherHasMore",ge),n.register("killIfHasMore",Se),n.register("killIfOtherHasLess",ye),n.register("killIfHasLess",ve),n.register("spawnIfHasMore",ke),n.register("killIfAlive",be),n.register("conveySprite",xe),n.register("pullWithIt",Ee),n.register("teleportToExit",_e),n.register("teleportToOther",Ae),n.register("wallBounce",Oe),n.register("bounceDirection",Ie),n.register("Timeout",kw),n.register("SpriteCounter",bw),n.register("MultiSpriteCounter",xw),n.register("ResourceCounter",Ew),n.register("GridPhysics",C),n.register("BasicGame",F);for(let[t,w]of Object.entries(lw))n.register(t,w);n.register("UP",Hw),n.register("DOWN",Kw),n.register("LEFT",$),n.register("RIGHT",_)}var Aw=class{constructor(w,e,r=null){this.children=[],this.content=w,this.indent=e,this.parent=null,r&&r.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function nt(t,w=8){t=t.replace(/\t/g," ".repeat(w));let e=t.split(`
`),r=new Aw("",-1);for(let s of e){s.includes("#")&&(s=s.split("#")[0]);let o=s.trim();if(o.length>0){let i=s.length-s.trimStart().length;r=new Aw(o,i,r)}}return r.getRoot()}var Ow=class{constructor(){this.verbose=!1}parseGame(w,e={}){let r=w;typeof r=="string"&&(r=nt(r).children[0]);let[s,o]=this._parseArgs(r.content);Object.assign(o,e),this.spriteRegistry=new _w,this.game=new F(this.spriteRegistry,o);for(let i of r.children)i.content.startsWith("SpriteSet")&&this.parseSprites(i.children),i.content==="InteractionSet"&&this.parseInteractions(i.children),i.content==="LevelMapping"&&this.parseMappings(i.children),i.content==="TerminationSet"&&this.parseTerminations(i.children);return this.game.finishSetup(),this.game}_eval(w){if(n.has(w))return n.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,r=null){r||(r={});let s=w.split(/\s+/).filter(o=>o.length>0);if(s.length===0)return[e,r];s[0].includes("=")||(e=this._eval(s[0]),s.shift());for(let o of s){let i=o.indexOf("=");if(i===-1)continue;let a=o.substring(0,i),l=o.substring(i+1);r[a]=this._eval(l)}return[e,r]}parseSprites(w,e=null,r={},s=[]){for(let o of w){if(!o.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${o.content}`);let[i,a]=o.content.split(">").map(h=>h.trim()),[l,m]=this._parseArgs(a,e,{...r}),c=[...s,i];if("singleton"in m&&(m.singleton===!0&&this.spriteRegistry.registerSingleton(i),delete m.singleton),o.children.length===0){this.verbose&&console.log("Defining:",i,l,m,c),this.spriteRegistry.registerSpriteClass(i,l,m,c);let h=this.game.sprite_order.indexOf(i);h!==-1&&this.game.sprite_order.splice(h,1),this.game.sprite_order.push(i)}else this.parseSprites(o.children,l,m,c)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[r,s]=e.content.split(">").map(l=>l.trim()),[o,i]=this._parseArgs(s),a=r.split(/\s+/).filter(l=>l.length>0);for(let l=1;l<a.length;l++){let m=a[0],c=a[l],h;if(typeof o=="function"&&!o.prototype)h=new ew(o,m,c,i);else if(typeof o=="function")h=new ew(o,m,c,i);else throw new Error(`Unknown effect type: ${o}`);this.game.collision_eff.push(h)}}}parseTerminations(w){for(let e of w){let[r,s]=this._parseArgs(e.content);this.game.terminations.push(new r(s))}}parseMappings(w){for(let e of w){let[r,s]=e.content.split(">").map(i=>i.trim());if(r.length!==1)throw new Error(`Only single character mappings allowed, got: '${r}'`);let o=s.split(/\s+/).filter(i=>i.length>0);this.game.char_mapping[r]=o}}};var Iw=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,r=this.cellSize/e;for(let s of w.domain.sprite_order){let o=w.sprite_registry._liveSpritesByKey[s]||[];for(let i of o)this._drawSprite(i,r,e)}this._drawHUD(w)}_drawSprite(w,e,r){let s=w.rect.x*e,o=w.rect.y*e,i=w.rect.w*e,a=w.rect.h*e,l=null,m=null;if(w.img){let S=this._parseImg(w.img);l=S.color,m=S.shape}l||(l=w.color),l||(l=[128,128,128]);let c=w.shrinkfactor||0,h=s+i*c/2,p=o+a*c/2,g=i*(1-c),f=a*(1-c);this.ctx.fillStyle=`rgb(${l[0]}, ${l[1]}, ${l[2]})`,m?this._drawShape(m,h,p,g,f):this.ctx.fillRect(h,p,g,f),w.orientation&&w.draw_arrow&&this._drawArrow(h,p,g,f,w.orientation,l),w.is_avatar&&this._drawResources(w,h,p,g,f)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let r=w.split("/")[1];return{color:e[r]||null,shape:null}}if(w.startsWith("colored_shapes/")){let r=w.split("/")[1],s=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let o of s)if(r.endsWith("_"+o)){let i=r.slice(0,-(o.length+1));return{color:e[i]||null,shape:o}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,r,s,o){let i=this.ctx,a=e+s/2,l=r+o/2,m=s/2,c=o/2,h=2/24,p=m*(1-2*h),g=c*(1-2*h);switch(i.beginPath(),w){case"CIRCLE":i.ellipse(a,l,p,g,0,0,Math.PI*2);break;case"TRIANGLE":{let f=l-g,S=l+g,y=a-p,u=a+p;i.moveTo(a,f),i.lineTo(u,S),i.lineTo(y,S),i.closePath();break}case"DIAMOND":i.moveTo(a,l-g),i.lineTo(a+p,l),i.lineTo(a,l+g),i.lineTo(a-p,l),i.closePath();break;case"STAR":{let f=Math.min(p,g),S=f*.4;for(let y=0;y<5;y++){let u=-Math.PI/2+y*(2*Math.PI/5),E=u+Math.PI/5;y===0?i.moveTo(a+f*Math.cos(u),l+f*Math.sin(u)):i.lineTo(a+f*Math.cos(u),l+f*Math.sin(u)),i.lineTo(a+S*Math.cos(E),l+S*Math.sin(E))}i.closePath();break}case"CROSS":{let f=p*2/3,S=f/2;i.rect(a-p,l-S,p*2,f),i.rect(a-S,l-g,f,g*2);break}case"HEXAGON":{let f=Math.min(p,g);for(let S=0;S<6;S++){let y=Math.PI/6+S*(Math.PI/3),u=a+f*Math.cos(y),E=l+f*Math.sin(y);S===0?i.moveTo(u,E):i.lineTo(u,E)}i.closePath();break}case"SQUARE":{let f=Math.min(p,g)*.05;i.rect(a-p+f,l-g+f,(p-f)*2,(g-f)*2);break}case"PENTAGON":{let f=Math.min(p,g);for(let S=0;S<5;S++){let y=-Math.PI/2+S*(2*Math.PI/5),u=a+f*Math.cos(y),E=l+f*Math.sin(y);S===0?i.moveTo(u,E):i.lineTo(u,E)}i.closePath();break}default:i.rect(e,r,s,o)}i.fill()}_drawArrow(w,e,r,s,o,i){let a=w+r/2,l=e+s/2,m=Math.min(r,s)*.3,c=[i[0],255-i[1],i[2]];this.ctx.strokeStyle=`rgb(${c[0]}, ${c[1]}, ${c[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(a,l),this.ctx.lineTo(a+o.x*m,l+o.y*m),this.ctx.stroke()}_drawResources(w,e,r,s,o){let i=w.resources,a=0,l=3;for(let m of Object.keys(i)){if(m==="toJSON")continue;let c=i[m];if(c>0){let h=r+o+a*(l+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,h,s*Math.min(c/5,1),l),a++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var U={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var jw=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";Te();var z=document.getElementById("game-desc"),W=document.getElementById("level-text"),G=document.getElementById("game-canvas"),ct=document.getElementById("btn-play"),ht=document.getElementById("btn-reset"),Qw=document.getElementById("btn-cog"),Zw=document.getElementById("btn-create-env"),Tw=document.getElementById("play-icon"),Pe=document.getElementById("tick-mode"),Xw=document.getElementById("speed-popover"),Vw=document.getElementById("flap-tab-desc"),Jw=document.getElementById("flap-tab-level"),Le=document.getElementById("flap-panel-desc"),Be=document.getElementById("flap-panel-level"),Lw=new Iw(G,30),Ge=null,x=null,B=!1,Rw=null,qw=null,Ce="",Ne="";function De(){let t=Pe.value;return t==="action"?"action":Number(t)}var pt=220,mt=150,rw=new Set,L=null,we=new Map,tw=new Map;G.addEventListener("keydown",t=>{let w=He(t.key);if(w){if(t.preventDefault(),De()==="action"){L=w,B||Bw(),ee();return}t.repeat||(rw.has(w)||(rw.add(w),we.set(w,performance.now()),tw.delete(w)),L=w,B||Bw())}});G.addEventListener("keyup",t=>{let w=He(t.key);w&&(rw.delete(w),we.delete(w),tw.delete(w))});function He(t){switch(t){case"ArrowUp":case"w":return"UP";case"ArrowDown":case"s":return"DOWN";case"ArrowLeft":case"a":return"LEFT";case"ArrowRight":case"d":return"RIGHT";case" ":return"SPACE";default:return null}}function Me(t){switch(t){case"SPACE":return k.SPACE;case"UP":return k.UP;case"DOWN":return k.DOWN;case"LEFT":return k.LEFT;case"RIGHT":return k.RIGHT;default:return k.NOOP}}function ft(){if(L){let w=L;return L=null,tw.set(w,performance.now()),Me(w)}let t=performance.now();for(let w of rw){if(t-(we.get(w)||t)<pt)continue;let r=tw.get(w)||0;if(t-r>=mt)return tw.set(w,t),Me(w)}return k.NOOP}function Gw(){Y(),Ge=new Ow().parseGame(z.value),x=Ge.buildLevel(W.value),Lw.resize(x.width,x.height),Lw.render(x),Ce=z.value,Ne=W.value,Zw.style.display="none",G.focus()}function ee(){if(!x||x.ended){Y();return}x.tick(ft()),Lw.render(x)}function Bw(){let t=De();t==="action"||B||(B=!0,Tw.src="pause.png",Tw.alt="pause",Rw=setInterval(ee,1e3/t))}function Y(){B=!1,Tw.src="play.png",Tw.alt="play",Rw!==null&&(clearInterval(Rw),Rw=null)}function Ke(){B?Y():Bw(),G.focus()}function ut(){Y(),x&&(x.reset(),Lw.render(x))}function Fe(t){if(qw===t){qw=null,Vw.classList.remove("active"),Jw.classList.remove("active"),Le.classList.remove("open"),Be.classList.remove("open");return}Y(),qw=t,Vw.classList.toggle("active",t==="desc"),Jw.classList.toggle("active",t==="level"),Le.classList.toggle("open",t==="desc"),Be.classList.toggle("open",t==="level")}function Ue(){let t=z.value!==Ce||W.value!==Ne;Zw.style.display=t?"block":"none"}function dt(){Xw.classList.toggle("open")}Vw.addEventListener("click",()=>Fe("desc"));Jw.addEventListener("click",()=>Fe("level"));z.addEventListener("input",Ue);W.addEventListener("input",Ue);Zw.addEventListener("click",t=>{t.stopPropagation(),Gw()});ct.addEventListener("click",t=>{t.stopPropagation(),Ke()});ht.addEventListener("click",t=>{t.stopPropagation(),ut(),G.focus()});Qw.addEventListener("click",t=>{t.stopPropagation(),dt()});document.addEventListener("click",t=>{!Xw.contains(t.target)&&t.target!==Qw&&!Qw.contains(t.target)&&Xw.classList.remove("open")});Pe.addEventListener("change",()=>{B&&(Y(),Bw())});G.addEventListener("blur",()=>{rw.clear(),L=null});document.addEventListener("keydown",t=>{let w=t.target.tagName;w==="TEXTAREA"||w==="INPUT"||w==="SELECT"||(t.key==="Enter"&&Gw(),t.key==="p"&&Ke())});document.querySelectorAll(".dpad-btn").forEach(t=>{t.addEventListener("click",w=>{w.preventDefault(),L=t.dataset.action,ee()})});var gt=[{cohort:"vgfmri3",games:[{key:"bait_vgfmri3",name:"Bait",color:"rgb(253,230,153)"},{key:"chase_vgfmri3",name:"Chase",color:"rgb(235,154,155)"},{key:"helper_vgfmri3",name:"Helper",color:"rgb(180,216,170)"},{key:"lemmings_vgfmri3",name:"Lemmings",color:"rgb(166,193,228)"},{key:"plaqueAttack_vgfmri3",name:"Plaque Attack",color:"rgb(245,179,108)"},{key:"zelda_vgfmri3",name:"Zelda",color:"rgb(180,168,210)"}]},{cohort:"vgfmri4",games:[{key:"bait_vgfmri4",name:"Bait",color:"rgb(253,230,153)"},{key:"chase_vgfmri4",name:"Chase",color:"rgb(235,154,155)"},{key:"helper_vgfmri4",name:"Helper",color:"rgb(180,216,170)"},{key:"lemmings_vgfmri4",name:"Lemmings",color:"rgb(166,193,228)"},{key:"avoidGeorge_vgfmri4",name:"Avoid George",color:"rgb(245,179,108)"},{key:"zelda_vgfmri4",name:"Zelda",color:"rgb(180,168,210)"}]}],ze=null,We=null;function St(t,w){let e=document.getElementById("game-selector");e.innerHTML="";let r=9,s=document.createElement("tr");s.innerHTML=`<th></th><th class="level-header" colspan="${r}">Curriculum Levels</th>`,e.appendChild(s);for(let o of gt){let i=document.createElement("tr");i.innerHTML=`<th class="cohort-header" colspan="${r+1}">${o.cohort}</th>`,e.appendChild(i);for(let a of o.games){let l=U[a.key];if(!l)continue;let m=Object.keys(l.levels).map(Number).sort((p,g)=>p-g),c=document.createElement("tr"),h=document.createElement("td");h.className="game-name",h.innerHTML=`<span class="game-badge" style="background:${a.color}">${a.name}</span>`,c.appendChild(h);for(let p=0;p<r;p++){let g=document.createElement("td");if(m.includes(p)){let f=document.createElement("button");f.textContent=p,f.dataset.game=a.key,f.dataset.level=p,a.key===t&&p===w&&f.classList.add("active"),f.addEventListener("click",()=>yt(a.key,p)),g.appendChild(f)}c.appendChild(g)}e.appendChild(c)}}ze=t,We=w}function yt(t,w){let e=U[t];if(!e)return;let r=Object.keys(e.levels).map(Number).sort((a,l)=>a-l),s=r.includes(w)?w:r[0];z.value=e.description,W.value=e.levels[s],Gw(),document.querySelectorAll(".game-selector button.active").forEach(a=>a.classList.remove("active"));let o=document.querySelector(`.game-selector button[data-game="${t}"][data-level="${s}"]`);o&&o.classList.add("active"),ze=t,We=s;let i=new URL(location.href);i.searchParams.set("game",t),i.searchParams.set("level",String(s)),history.replaceState(null,"",i)}async function vt(t){let w=jw?`${jw}/${t}`:`data/${t}`,e=await fetch(w);if(!e.ok)return null;let r=t.endsWith(".gz"),s;if(r){let i=new DecompressionStream("gzip");s=await new Response(e.body.pipeThrough(i)).text()}else s=await e.text();return JSON.parse(s).game_description||null}async function kt(){let t=new URLSearchParams(location.search),w=t.get("game")||"bait_vgfmri4",e=parseInt(t.get("level")||"3",10),r=t.get("replay"),s=U[w]?w:Object.keys(U)[0],o=U[s],i=Object.keys(o.levels).map(Number).sort((m,c)=>m-c),a=i.includes(e)?e:i[0];W.value=o.levels[a];let l=null;r&&(l=await vt(r)),z.value=l||o.description,St(s,a),Gw()}kt();})();
