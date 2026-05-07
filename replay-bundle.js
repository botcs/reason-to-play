// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var pt=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,o]of Object.entries(w))this.register(e,o)}},u=new pt;var rw=class t{constructor(w,e,o,s){this.x=w,this.y=e,this.w=o,this.h=s}static fromPosSize(w,e){return new t(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new t(this.x+w.x,this.y+w.y,this.w,this.h):new t(this.x+w,this.y+e,this.w,this.h)}copy(){return new t(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let o=0;o<w.length;o++)this.colliderect(w[o].rect||w[o])&&e.push(o);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var b=class t{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let o of this.keys)o==="LEFT"&&(w-=1),o==="RIGHT"&&(w+=1),o==="UP"&&(e-=1),o==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof t)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},ft={NOOP:new b,UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),SPACE:new b("SPACE"),SPACE_RIGHT:new b("SPACE","RIGHT"),SPACE_LEFT:new b("SPACE","LEFT")},Wt=ft.NOOP;var mt=[129,199,132],Pw=[25,118,210],Gw=[211,47,47],ut=[69,90,100],Nw=[250,250,250],no=[109,76,65],dt=[55,71,79],gt=[230,81,0],lo=[255,245,157],ao=[255,138,128],co=[255,196,0],ho=[255,82,82],po=[255,112,67],fo=[144,202,249],mo=[185,246,202],uo=[207,216,220],go=[68,90,100],So=[1,87,155],yo=[92,107,192],vo=[200,150,220],xo=[255,230,230],Dw={GREEN:mt,BLUE:Pw,RED:Gw,GRAY:ut,WHITE:Nw,BROWN:no,BLACK:dt,ORANGE:gt,YELLOW:lo,PINK:ao,GOLD:co,LIGHTRED:ho,LIGHTORANGE:po,LIGHTBLUE:fo,LIGHTGREEN:mo,LIGHTGRAY:uo,DARKGRAY:go,DARKBLUE:So,PURPLE:yo,LIGHTPURPLE:vo,LIGHTPINK:xo},St={x:0,y:-1},yt={x:0,y:1},uw={x:-1,y:0},W={x:1,y:0},nw=[St,uw,yt,W];function dw(t,w){return t.x===w.x&&t.y===w.y}function ko(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function z(t){let w=ko(t);return w>0?{x:t.x/w,y:t.y/w}:{x:1,y:0}}var lw=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,o){if(o==null&&(o=w.speed===null?1:w.speed),o!==0&&e!==null&&e!==void 0){let s;if(e.asVector?s=e.asVector():s=e,dw(s,{x:0,y:0}))return;w._updatePosition(s,o*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var Eo=Dw,I=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:o,pos:s,size:i=[1,1],color:n,speed:l,cooldown:a,physicstype:r,rng:h,img:p,resources:c,...m}=w;this.key=e,this.id=o;let f=Array.isArray(i)?i:[i,i];this.rect=new rw(s[0],s[1],f[0],f[1]),this.lastrect=this.rect,this.alive=!0;let g=r||this.constructor.physicstype||lw;if(this.physics=new g(f),this.speed=l??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=p||null,this.color=n||this.constructor.color,this.img&&this.img.startsWith("colors/")){let k=this.img.split("/")[1],S=Eo[k];S&&(this.color=S)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(c?{...c}:{},{get(k,S){return typeof S=="string"&&!(S in k)&&S!=="toJSON"&&S!=="then"&&S!==Symbol.toPrimitive&&S!==Symbol.toStringTag&&S!=="inspect"&&S!=="constructor"&&S!=="__proto__"?0:k[S]},set(k,S,E){return k[S]=E,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[k,S]of Object.entries(m))this[k]=S}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let o,s;if(e==null){let i=this.speed||0;o=w.x*i,s=w.y*i}else o=w.x*e,s=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:o,y:s}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},C=class extends I{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},Hw=class extends I{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var Fw=class extends I{static color=ut;static is_static=!0},Kw=class extends I{static color=Gw},Uw=class extends C{static is_static=!0},gw=class extends I{static color=Gw;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},Z=class extends I{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||W)}},Sw=class extends Z{static speed=1},yw=class extends Z{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};yw.limit=1;var aw=class extends I{static stype=null},Ww=class extends aw{static is_static=!0;static is_stochastic=!0;static color=Pw},cw=class extends aw{static color=dt;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},vw=class extends I{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=nw[Math.floor(w.randomGenerator.random()*nw.length)];this.physics.activeMovement(this,e)}},xw=class extends vw{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,o=[],s=w.getSprites(this.stype);for(let i of s){let n=this.physics.distance(this.rect,i.rect);n<e?(e=n,o=[i]):n===e&&o.push(i)}return o}_movesToward(w,e){let o=[],s=this.physics.distance(this.rect,e.rect);for(let i of nw){let n=this.rect.move(i),l=this.physics.distance(n,e.rect);this.fleeing&&s<l&&o.push(i),!this.fleeing&&s>l&&o.push(i)}return o}update(w){I.prototype.update.call(this,w);let e=[];for(let s of this._closestTargets(w))e.push(...this._movesToward(w,s));e.length===0&&(e=[...nw]);let o=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,o)}},zw=class extends xw{constructor(w){super({...w,fleeing:!0})}},Yw=class extends cw{static color=gt;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||W),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),cw.prototype.update.call(this,w)}},$w=class extends Sw{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let o;this.orientation.x>0?o=1:this.orientation.x<0?o=-1:o=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:o,y:0})}super.update(w)}},jw=class extends Z{static is_static=!0;static color=Pw;static strength=1;static draw_arrow=!0},Qw=class t extends gw{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of nw)w.randomGenerator.random()<(this.spreadprob||t.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function Jw(t,w){let e=[...w.active_keys].sort();for(let o=Math.max(3,e.length);o>=0;o--)for(let s of Ao(e,o)){let i=s.join(",");if(t._keysToAction.has(i))return t._keysToAction.get(i)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Ao(t,w){if(w===0)return[[]];if(t.length===0)return[];let e=[];function o(s,i){if(i.length===w){e.push([...i]);return}for(let n=s;n<t.length;n++)i.push(t[n]),o(n+1,i),i.pop()}return o(0,[]),e}function zt(t){let w=new Map;for(let e of Object.values(t)){let o=[...e.keys].sort().join(",");w.set(o,e)}return w}var kw=class extends I{static color=Nw;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=zt(e)}static declarePossibleActions(){return{UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){I.prototype.update.call(this,w);let e=Jw(this,w);e.equals(Wt)||this.physics.activeMovement(this,e)}},ww=class extends I{static color=Nw;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||W);let e=this.constructor.declarePossibleActions();this._keysToAction=zt(e)}static declarePossibleActions(){return{UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){let e=this.orientation;this.orientation={x:0,y:0},I.prototype.update.call(this,w);let o=Jw(this,w);o&&this.physics.activeMovement(this,o);let s=this.lastdirection;Math.abs(s.x)+Math.abs(s.y)!==0?this.orientation=s:this.orientation=e}},qw=class extends ww{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=ww.declarePossibleActions();return w.SPACE=new b("SPACE"),w}update(w){ww.prototype.update.call(this,w);let e=Jw(this,w);this._hasAmmo()&&e.equals(ft.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let o of e){let s=[this.lastrect.x+o.x*this.lastrect.w,this.lastrect.y+o.y*this.lastrect.h],i=w.createSprite(this.stype,s);i&&i.orientation!==void 0&&(i.orientation=o)}this._spendAmmo()}_shootDirections(w){return[z(this.orientation)]}},tw=class extends kw{static declarePossibleActions(){return{LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){I.prototype.update.call(this,w);let e=Jw(this,w),o=e.asVector();(dw(o,W)||dw(o,uw))&&this.physics.activeMovement(this,e)}},Xw=class extends tw{static color=mt;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=tw.declarePossibleActions();return w.SPACE=new b("SPACE"),w}update(w){tw.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function Q(t,w,e){e.killSprite(t)}function Yt(t,w,e){e.killSprite(t),e.killSprite(w)}function $t(t,w,e){e.addSpriteCreation(t.key,[t.rect.x,t.rect.y])}function hw(t,w,e,{stype:o="wall"}={}){let s=t.lastrect;e.killSprite(t);let i=e.addSpriteCreation(o,t.rect.topleft);i!=null&&(i.lastrect=s,t.orientation!==void 0&&i.orientation!==void 0&&(i.orientation=t.orientation))}function jt(t,w,e,{resource:o,limit:s=1,no_symmetry:i=!1,exhaustStype:n=null}={}){t.resources[o]<s?bw(t,w,e,{no_symmetry:i}):n?e.kill_list.includes(w)||hw(w,t,e,{stype:n}):Q(w,t,e)}function bw(t,w,e,{no_symmetry:o=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(t)&&(t.rect.equals(t.lastrect)&&!o?(w.rect=w.lastrect,vt(w,0)):(t.rect=t.lastrect,vt(t,0)))}function vt(t,w){w>5||t.just_pushed&&(t.just_pushed.rect=t.just_pushed.lastrect,vt(t.just_pushed,w+1))}function Qt(t,w,e){for(let o of e.sprite_registry.sprites())o.rect=o.lastrect}function xt(t,w){return t.just_pushed&&w<3?xt(t.just_pushed,w+1):t.lastdirection}function qt(t,w,e){let o=xt(w,0);Math.abs(o.x)+Math.abs(o.y)===0?(o=xt(t,0),w.physics.activeMovement(w,z(o)),w.just_pushed=t):(t.physics.activeMovement(t,z(o)),t.just_pushed=w)}function Xt(t,w,e,{exhaustStype:o=null}={}){if(t.lastrect.colliderect(w.rect))return;let s=t.lastdirection;if(Math.abs(s.x)+Math.abs(s.y)===0)return;let n=z(s),l=t.rect.width,a=t.rect.copy();a.x+=Math.round(n.x)*l,a.y+=Math.round(n.y)*l,!(a.x<0||a.y<0||a.x+a.width>e.screensize[0]||a.y+a.height>e.screensize[1])&&(t.rect=a,t.lastmove=0,o&&hw(w,t,e,{stype:o}))}function kt(t,w,e,{with_step_back:o=!0}={}){o&&(t.rect=t.lastrect),t.orientation!==void 0&&(t.orientation={x:-t.orientation.x,y:-t.orientation.y})}function Jt(t,w,e){t.rect=t.lastrect,t.lastmove=t.cooldown,t.physics.activeMovement(t,{x:0,y:1},1),kt(t,w,e,{with_step_back:!1})}function Vt(t,w,e){let o=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];t.orientation=o[Math.floor(e.randomGenerator.random()*o.length)]}function Zt(t,w,e,{offset:o=0}={}){t.rect.top<0?t.rect.top=e.screensize[1]-t.rect.height:t.rect.top+t.rect.height>e.screensize[1]&&(t.rect.top=0),t.rect.left<0?t.rect.left=e.screensize[0]-t.rect.width:t.rect.left+t.rect.width>e.screensize[0]&&(t.rect.left=0),t.lastmove=0}function we(t,w,e){if(!(t instanceof C))throw new Error(`collectResource: sprite must be a Resource, got ${t.constructor.name}`);let o=t.resource_type,s=e.domain.resources_limits&&e.domain.resources_limits[o]||1/0;w.resources[o]=Math.max(0,Math.min(w.resources[o]+t.value,s))}function te(t,w,e,{resource:o,value:s=1}={}){e.resource_changes.push([t,o,s])}function ee(t,w,e,{resource:o,value:s=1}={}){e.resource_changes.push([w,o,s]),e.kill_list.push(t)}function oe(t,w,e,{resource:o,value:s=-1}={}){e.resource_changes.push([w,o,s]),e.kill_list.push(t)}function se(t,w,e,{resource:o,limit:s=1}={}){w.resources[o]>=s&&Q(t,w,e)}function ie(t,w,e,{resource:o,limit:s=1}={}){t.resources[o]>=s&&Q(t,w,e)}function re(t,w,e,{resource:o,limit:s=1}={}){w.resources[o]<=s&&Q(t,w,e)}function ne(t,w,e,{resource:o,limit:s=1}={}){t.resources[o]<=s&&Q(t,w,e)}function le(t,w,e,{resource:o,stype:s,limit:i=1}={}){t.resources[o]>=i&&e.addSpriteCreation(s,[t.rect.x,t.rect.y])}function ae(t,w,e){e.kill_list.includes(w)||Q(t,w,e)}function ce(t,w,e){let o=t.lastrect,s=z(w.orientation);t.physics.activeMovement(t,s,w.strength||1),t.lastrect=o}function he(t,w,e){if(!de(t,e,"t_lastpull"))return;let o=t.lastrect,s=w.lastdirection,n=Math.abs(s.x)+Math.abs(s.y)>0?z(s):{x:1,y:0};t._updatePosition(n,(w.speed||1)*t.physics.gridsize[0]),t.lastrect=o}function pe(t,w,e){let o=e.sprite_registry.withStype(w.stype||w.key);if(o.length>0){let s=o[Math.floor(e.randomGenerator.random()*o.length)];t.rect=s.rect.copy()}t.lastmove=0}function fe(t,w,e,{exhaustStype:o=null}={}){if(t.lastrect.colliderect(w.rect))return;let s=e.sprite_registry.group(w.key).filter(n=>n!==w);if(s.length===0)return;let i=s[Math.floor(e.randomGenerator.random()*s.length)];t.rect=i.rect.copy(),t.lastrect=i.rect.copy(),t.lastmove=0,o&&(hw(w,t,e,{stype:o}),hw(i,t,e,{stype:o}))}function me(t,w,e,{friction:o=0}={}){de(t,e,"t_lastbounce")&&(t.speed!==null&&(t.speed*=1-o),bw(t,w,e),t.orientation!==void 0&&(Math.abs(t.rect.centerx-w.rect.centerx)>Math.abs(t.rect.centery-w.rect.centery)?t.orientation={x:-t.orientation.x,y:t.orientation.y}:t.orientation={x:t.orientation.x,y:-t.orientation.y}))}function ue(t,w,e,{friction:o=0}={}){if(bw(t,w,e),t.orientation!==void 0){let s=t.orientation,i=z({x:-t.rect.centerx+w.rect.centerx,y:-t.rect.centery+w.rect.centery}),n=i.x*s.x+i.y*s.y;t.orientation={x:-2*n*i.x+s.x,y:-2*n*i.y+s.y},t.speed!==null&&(t.speed*=1-o)}}function de(t,w,e){return e in t._effect_data&&t._effect_data[e]===w.time?!1:(t._effect_data[e]=w.time,!0)}var pw=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},Vw=class extends pw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},Zw=class extends pw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},wt=class extends pw{constructor(w={}){let{win:e=!0,scoreChange:o=0,limit:s=0,...i}=w;super({win:e,scoreChange:o}),this.limit=s,this.stypes=[];for(let[n,l]of Object.entries(i))n.startsWith("stype")&&this.stypes.push(l)}isDone(w){let e=0;for(let o of this.stypes)e+=w.numSprites(o);return e===this.limit?[!0,this.win]:[!1,null]}},tt=class extends pw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var et=class t{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,o,s){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=o,this.stypes[w]=s,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),o=(this._deadSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),s=e.concat(o);return s.length>0?Math.max(...s)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:o,args:s,stypes:i}=this.getSpriteDef(w),n=e.id||this.generateId(w),l={...s,...e,key:w,id:n},a=new o(l);return a.stypes=i,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[n]=a,a}killSprite(w){w.alive=!1;let e=w.key,o=this._liveSpritesByKey[e];if(o){let s=o.indexOf(w);s!==-1&&(o.splice(s,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let o=this._liveSpritesByKey[w]||[];if(!e)return o;let s=this._deadSpritesByKey[w]||[];return o.concat(s)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let o=this._liveSpritesByKey[e]||[],s=this._deadSpritesByKey[e]||[];yield[e,o.concat(s)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let o=this._liveSpritesByKey[e]||[];for(let s of o)yield s}}spritesArray(){let w=[];for(let e of this.spriteKeys){let o=this._liveSpritesByKey[e]||[];for(let s of o)w.push(s)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let o=[];for(let s of this.spriteKeys)if(this.stypes[s]&&this.stypes[s].includes(w)){let i=e?(this._liveSpritesByKey[s]||[]).concat(this._deadSpritesByKey[s]||[]):this._liveSpritesByKey[s]||[];o.push(...i)}return o}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new t;w.classes={...this.classes},w.classArgs={};for(let[e,o]of Object.entries(this.classArgs))w.classArgs[e]={...o};w.stypes={};for(let[e,o]of Object.entries(this.stypes))w.stypes[e]=[...o];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var bt=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},Et=class{constructor(w,e,{scoreChange:o=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=o,this.is_stochastic=!1}call(w,e,o){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Ew=class extends Et{constructor(w,e,o,s={}){let i=s.scoreChange||0;super(e,o,{scoreChange:i}),this.callFn=w;let{scoreChange:n,...l}=s;this.fnArgs=l,this._name=w.name||"anonymous"}call(w,e,o){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,o,this.fnArgs):this.callFn(w,e,o)}get name(){return this._name}},fw=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:o}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof C||e===C){let s=w;o.res_type&&(s=o.res_type),o.color&&(this.resources_colors[s]=o.color),o.limit!==void 0&&(this.resources_limits[s]=o.limit),this.notable_resources.push(s)}}buildLevel(w){let e=w.split(`
`).filter(l=>l.length>0),o=e.map(l=>l.length),s=Math.min(...o),i=Math.max(...o);if(s!==i)throw new Error(`Inconsistent line lengths: min=${s}, max=${i}`);let n=new At(this,this.domain_registry.deepCopy(),w,o[0],e.length,this.seed);for(let l=0;l<e.length;l++)for(let a=0;a<e[l].length;a++){let r=e[l][a],h=this.char_mapping[r];if(h){let p=[a*this.block_size,l*this.block_size];n.createSprites(h,p)}}return n.initState=n.getGameState(),n}},At=class{constructor(w,e,o,s,i,n=0){this.domain=w,this.sprite_registry=e,this.levelstring=o,this.width=s,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=n,this.randomGenerator=new bt(n),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new rw(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,o){let s=this.sprite_registry.createSprite(w,{pos:e,id:o,size:[this.block_size,this.block_size],rng:this.randomGenerator});return s&&(this.is_stochastic=this.domain.is_stochastic||s.is_stochastic||this.is_stochastic),s}createSprites(w,e){return w.map(o=>this.createSprite(o,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,o){return this.create_list.push([w,e,o]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let a of e)a.just_pushed=null;for(let a of e)a.update(this);this.events_triggered=[];let[o,s,i]=this._moveEventHandling(),[n,l]=this._eventHandling(o);this.events_triggered=s.concat(n);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,r,h]of this.create_list)this.createSprite(a,r,h);for(let[a,r,h]of this.resource_changes){let p=this.domain.resources_limits&&this.domain.resources_limits[r]||1/0;a.resources[r]=Math.max(0,Math.min(a.resources[r]+h,p))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],o={},s=this.domain.collision_eff.filter(n=>n.name==="stepBack"||n.name==="stepBackIfHasLess");for(let n of s){let[,l,a]=this._applyEffect(n,o);w.push(...l),e.push(...a)}let i=this.domain.collision_eff.filter(n=>["bounceForward","reverseDirection","turnAround"].includes(n.name));for(let n of i){let[,l,a]=this._applyEffect(n,o);w.push(...l),e.push(...a)}for(let n of s){let[,l,a]=this._applyEffect(n,o);w.push(...l),e.push(...a)}return[o,w,e]}_eventHandling(w){let e=[],o=[],s=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of s){let[,n,l]=this._applyEffect(i,w);e.push(...n),o.push(...l)}return[e,o]}_applyEffect(w,e){let o=[],s=[],i=w.actor_stype,n=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),n!=="EOS"&&!(n in e)&&(e[n]=this.sprite_registry.withStype(n)),n==="EOS"){let h=e[i];for(let p=h.length-1;p>=0;p--){let c=h[p];this.containsRect(c.rect)||(this.addScore(w.score),w.call(c,null,this),o.push([w.name,c.id,"EOS"]),s.push([w.name,c.key,"EOS",[c.rect.x,c.rect.y],[null,null]]),!this.containsRect(c.rect)&&c.alive&&this.killSprite(c))}return[e,o,s]}let l=e[i],a=e[n];if(l.length===0||a.length===0)return[e,o,s];let r=!1;l.length>a.length&&([l,a]=[a,l],r=!0);for(let h of l)for(let p of a)h!==p&&h.rect.colliderect(p.rect)&&(r?this.kill_list.includes(p)||(this.addScore(w.score),w.call(p,h,this),o.push([w.name,p.id,h.id]),s.push([w.name,p.key,h.key,[p.rect.x,p.rect.y],[h.rect.x,h.rect.y]])):this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,p,this),o.push([w.name,h.id,p.id]),s.push([w.name,h.key,p.key,[h.rect.x,h.rect.y],[p.rect.x,p.rect.y]])));return[e,o,s]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,o]=w.isDone(this);if(this.ended=e,this.won=o===null?!1:o,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let o=this.sprite_registry._liveSpritesByKey[e]||[],s=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...o,...s].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,o]of Object.entries(w.sprites))for(let s of o){let i=this.sprite_registry.createSprite(e,{id:s.id,pos:[s.x,s.y],size:[s.w,s.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...s.resources},{get(n,l){return typeof l=="string"&&!(l in n)&&l!=="toJSON"&&l!=="then"&&l!==Symbol.toPrimitive&&l!==Symbol.toStringTag&&l!=="inspect"&&l!=="constructor"&&l!=="__proto__"?0:n[l]},set(n,l,a){return n[l]=a,!0}}),s.speed!==void 0&&(i.speed=s.speed),s.cooldown!==void 0&&(i.cooldown=s.cooldown),s.orientation&&(i.orientation={...s.orientation}),s._age!==void 0&&(i._age=s._age),s.lastmove!==void 0&&(i.lastmove=s.lastmove),i.alive=s.alive,s.alive||this.sprite_registry.killSprite(i))}}};function ge(){u.register("VGDLSprite",I),u.register("Immovable",Fw),u.register("Passive",Kw),u.register("Resource",C),u.register("ResourcePack",Uw),u.register("Flicker",gw),u.register("OrientedFlicker",yw),u.register("OrientedSprite",Z),u.register("Missile",Sw),u.register("SpawnPoint",cw),u.register("SpriteProducer",aw),u.register("Portal",Ww),u.register("RandomNPC",vw),u.register("Chaser",xw),u.register("Fleeing",zw),u.register("Bomber",Yw),u.register("Walker",$w),u.register("Conveyor",jw),u.register("Spreader",Qw),u.register("Immutable",Hw),u.register("MovingAvatar",kw),u.register("OrientedAvatar",ww),u.register("ShootAvatar",qw),u.register("HorizontalAvatar",tw),u.register("FlakAvatar",Xw),u.register("killSprite",Q),u.register("killBoth",Yt),u.register("cloneSprite",$t),u.register("transformTo",hw),u.register("stepBack",bw),u.register("stepBackIfHasLess",jt),u.register("undoAll",Qt),u.register("bounceForward",qt),u.register("catapultForward",Xt),u.register("reverseDirection",kt),u.register("turnAround",Jt),u.register("flipDirection",Vt),u.register("wrapAround",Zt),u.register("collectResource",we),u.register("changeResource",te),u.register("addResource",ee),u.register("removeResource",oe),u.register("killIfOtherHasMore",se),u.register("killIfHasMore",ie),u.register("killIfOtherHasLess",re),u.register("killIfHasLess",ne),u.register("spawnIfHasMore",le),u.register("killIfAlive",ae),u.register("conveySprite",ce),u.register("pullWithIt",he),u.register("teleportToExit",pe),u.register("teleportToOther",fe),u.register("wallBounce",me),u.register("bounceDirection",ue),u.register("Timeout",Vw),u.register("SpriteCounter",Zw),u.register("MultiSpriteCounter",wt),u.register("ResourceCounter",tt),u.register("GridPhysics",lw),u.register("BasicGame",fw);for(let[t,w]of Object.entries(Dw))u.register(t,w);u.register("UP",St),u.register("DOWN",yt),u.register("LEFT",uw),u.register("RIGHT",W)}var ot=class{constructor(w,e,o=null){this.children=[],this.content=w,this.indent=e,this.parent=null,o&&o.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function _o(t,w=8){t=t.replace(/\t/g," ".repeat(w));let e=t.split(`
`),o=new ot("",-1);for(let s of e){s.includes("#")&&(s=s.split("#")[0]);let i=s.trim();if(i.length>0){let n=s.length-s.trimStart().length;o=new ot(i,n,o)}}return o.getRoot()}var st=class{constructor(){this.verbose=!1}parseGame(w,e={}){let o=w;typeof o=="string"&&(o=_o(o).children[0]);let[s,i]=this._parseArgs(o.content);Object.assign(i,e),this.spriteRegistry=new et,this.game=new fw(this.spriteRegistry,i);for(let n of o.children)n.content.startsWith("SpriteSet")&&this.parseSprites(n.children),n.content==="InteractionSet"&&this.parseInteractions(n.children),n.content==="LevelMapping"&&this.parseMappings(n.children),n.content==="TerminationSet"&&this.parseTerminations(n.children);return this.game.finishSetup(),this.game}_eval(w){if(u.has(w))return u.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,o=null){o||(o={});let s=w.split(/\s+/).filter(i=>i.length>0);if(s.length===0)return[e,o];s[0].includes("=")||(e=this._eval(s[0]),s.shift());for(let i of s){let n=i.indexOf("=");if(n===-1)continue;let l=i.substring(0,n),a=i.substring(n+1);o[l]=this._eval(a)}return[e,o]}parseSprites(w,e=null,o={},s=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[n,l]=i.content.split(">").map(p=>p.trim()),[a,r]=this._parseArgs(l,e,{...o}),h=[...s,n];if("singleton"in r&&(r.singleton===!0&&this.spriteRegistry.registerSingleton(n),delete r.singleton),i.children.length===0){this.verbose&&console.log("Defining:",n,a,r,h),this.spriteRegistry.registerSpriteClass(n,a,r,h);let p=this.game.sprite_order.indexOf(n);p!==-1&&this.game.sprite_order.splice(p,1),this.game.sprite_order.push(n)}else this.parseSprites(i.children,a,r,h)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[o,s]=e.content.split(">").map(a=>a.trim()),[i,n]=this._parseArgs(s),l=o.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<l.length;a++){let r=l[0],h=l[a],p;if(typeof i=="function"&&!i.prototype)p=new Ew(i,r,h,n);else if(typeof i=="function")p=new Ew(i,r,h,n);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(p)}}}parseTerminations(w){for(let e of w){let[o,s]=this._parseArgs(e.content);this.game.terminations.push(new o(s))}}parseMappings(w){for(let e of w){let[o,s]=e.content.split(">").map(n=>n.trim());if(o.length!==1)throw new Error(`Only single character mappings allowed, got: '${o}'`);let i=s.split(/\s+/).filter(n=>n.length>0);this.game.char_mapping[o]=i}}};var it=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,o=this.cellSize/e;for(let s of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[s]||[];for(let n of i)this._drawSprite(n,o,e)}this._drawHUD(w)}_drawSprite(w,e,o){let s=w.rect.x*e,i=w.rect.y*e,n=w.rect.w*e,l=w.rect.h*e,a=null,r=null;if(w.img){let g=this._parseImg(w.img);a=g.color,r=g.shape}a||(a=w.color),a||(a=[128,128,128]);let h=w.shrinkfactor||0,p=s+n*h/2,c=i+l*h/2,m=n*(1-h),f=l*(1-h);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,r?this._drawShape(r,p,c,m,f):this.ctx.fillRect(p,c,m,f),w.orientation&&w.draw_arrow&&this._drawArrow(p,c,m,f,w.orientation,a),w.is_avatar&&this._drawResources(w,p,c,m,f)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let o=w.split("/")[1];return{color:e[o]||null,shape:null}}if(w.startsWith("colored_shapes/")){let o=w.split("/")[1],s=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of s)if(o.endsWith("_"+i)){let n=o.slice(0,-(i.length+1));return{color:e[n]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,o,s,i){let n=this.ctx,l=e+s/2,a=o+i/2,r=s/2,h=i/2,p=2/24,c=r*(1-2*p),m=h*(1-2*p);switch(n.beginPath(),w){case"CIRCLE":n.ellipse(l,a,c,m,0,0,Math.PI*2);break;case"TRIANGLE":{let f=a-m,g=a+m,k=l-c,S=l+c;n.moveTo(l,f),n.lineTo(S,g),n.lineTo(k,g),n.closePath();break}case"DIAMOND":n.moveTo(l,a-m),n.lineTo(l+c,a),n.lineTo(l,a+m),n.lineTo(l-c,a),n.closePath();break;case"STAR":{let f=Math.min(c,m),g=f*.4;for(let k=0;k<5;k++){let S=-Math.PI/2+k*(2*Math.PI/5),E=S+Math.PI/5;k===0?n.moveTo(l+f*Math.cos(S),a+f*Math.sin(S)):n.lineTo(l+f*Math.cos(S),a+f*Math.sin(S)),n.lineTo(l+g*Math.cos(E),a+g*Math.sin(E))}n.closePath();break}case"CROSS":{let f=c*2/3,g=f/2;n.rect(l-c,a-g,c*2,f),n.rect(l-g,a-m,f,m*2);break}case"HEXAGON":{let f=Math.min(c,m);for(let g=0;g<6;g++){let k=Math.PI/6+g*(Math.PI/3),S=l+f*Math.cos(k),E=a+f*Math.sin(k);g===0?n.moveTo(S,E):n.lineTo(S,E)}n.closePath();break}case"SQUARE":{let f=Math.min(c,m)*.05;n.rect(l-c+f,a-m+f,(c-f)*2,(m-f)*2);break}case"PENTAGON":{let f=Math.min(c,m);for(let g=0;g<5;g++){let k=-Math.PI/2+g*(2*Math.PI/5),S=l+f*Math.cos(k),E=a+f*Math.sin(k);g===0?n.moveTo(S,E):n.lineTo(S,E)}n.closePath();break}default:n.rect(e,o,s,i)}n.fill()}_drawArrow(w,e,o,s,i,n){let l=w+o/2,a=e+s/2,r=Math.min(o,s)*.3,h=[n[0],255-n[1],n[2]];this.ctx.strokeStyle=`rgb(${h[0]}, ${h[1]}, ${h[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(l,a),this.ctx.lineTo(l+i.x*r,a+i.y*r),this.ctx.stroke()}_drawResources(w,e,o,s,i){let n=w.resources,l=0,a=3;for(let r of Object.keys(n)){if(r==="toJSON")continue;let h=n[r];if(h>0){let p=o+i+l*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,p,s*Math.min(h/5,1),a),l++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var rt={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var Se=["#1b6ec2","#2b9a3e","#d42020"];function ve(t){return Se[Math.min(t,Se.length-1)]}function xe(t,w){if(w<=1)return 0;let e=w/3;return t<e?0:t<2*e?1:2}function ke(t){let w=[],e=[],o=!1,s=null;for(let h=0;h<t.length;h++){let p=t[h].response||{},m=(p.rationale||p.scratchpad||p.reasoning||"").length;w.push(m),m>0&&(o=!0);let f=t[h].level;s!==null&&f!==s&&e.push(h),s=f}let i=w.filter(h=>h>0),n=null,l=0,a=0,r=1;if(i.length>0){let h=Math.min(...i),p=Math.max(...i);a=Math.log10(h);let m=Math.log10(p)-a;l=m>0?Math.min(25,Math.max(5,Math.ceil(Math.sqrt(i.length)))):1,r=m>0?m/l:1,n=w.map(f=>{if(f<=0)return-1;let g=Math.floor((Math.log10(f)-a)/r);return g>=l&&(g=l-1),g<0&&(g=0),g})}return{lengths:w,levelBoundaries:e,hasAny:o,binAssignments:n,binCount:l,logMin:a,logBinWidth:r}}function ye(t,w){if(t===0)return 0;let e=Math.floor(Math.log10(t)),o=t/Math.pow(10,e),s;return w?o<1.5?s=1:o<3?s=2:o<7?s=5:s=10:o<=1?s=1:o<=2?s=2:o<=5?s=5:s=10,s*Math.pow(10,e)}function nt(t,w,e){if(w<=t)return[t];let o=ye(w-t,!1),s=ye(o/Math.max(e-1,1),!0);if(s===0)return[t];let i=Math.floor(t/s)*s,n=Math.ceil(w/s)*s,l=[];for(let a=i;a<=n+s*.5;a+=s)l.push(Math.round(a));return l}function be(t){let w=t.getBoundingClientRect(),e=window.devicePixelRatio||1,o=w.width,s=w.height;t.width=o*e,t.height=s*e;let i=t.getContext("2d");return i.scale(e,e),{ctx:i,w:o,h:s}}function _t(t,w){let e=[],o=Math.floor(Math.log10(Math.max(1,t))),s=Math.ceil(Math.log10(Math.max(1,w)));for(let i=o;i<=s;i++)for(let n of[1,2,5]){let l=n*Math.pow(10,i);l>=t&&l<=w&&e.push(l)}return e}function Ee(t,w,e={}){let{logX:o=!1,logY:s=!1}=e,{lengths:i,binAssignments:n,binCount:l,logMin:a}=w,{ctx:r,w:h,h:p}=be(t),c={top:20,right:8,bottom:46,left:52},m=h-c.left-c.right,f=p-c.top-c.bottom;r.clearRect(0,0,h,p);let g=i.filter(d=>d>0),k=i.length-g.length;if(g.length===0){r.fillStyle="#999",r.font="12px monospace",r.textAlign="center",r.fillText("No reasoning data",h/2,p/2);return}let S=Math.min(...g),E=Math.max(...g),L=Math.log10(E)-a,O;if(o){O=new Array(l).fill(0);for(let d of n)d>=0&&O[d]++}else{O=new Array(l).fill(0);let d=E-S;if(d===0)O[0]=g.length;else for(let y of g){let D=Math.floor((y-S)/d*l);D>=l&&(D=l-1),O[D]++}}let V=Math.max(...O);if(V===0)return;let mw=s&&V>1,K=mw?Math.log10(V):1;function U(d){return mw?d<=0?0:Math.log10(d)/K:d/V}r.strokeStyle="#ccc",r.lineWidth=1,r.font="10px monospace",r.textBaseline="middle",r.textAlign="right",r.fillStyle="#666";let ht=mw?_t(1,V):nt(0,V,5);for(let d of ht){let y=c.top+f*(1-U(d));y<c.top-1||y>c.top+f+1||(r.beginPath(),r.moveTo(c.left,y),r.lineTo(c.left+m,y),r.stroke(),r.fillText(String(d),c.left-4,y))}let Mw=1,j=Math.max(1,(m-Mw*(l-1))/l);for(let d=0;d<l;d++){let y=U(O[d])*f,D=c.left+d*(j+Mw),Cw=c.top+f-y;r.fillStyle=ve(xe(d,l)),r.fillRect(D,Cw,j,y)}if(r.textAlign="center",r.textBaseline="top",r.fillStyle="#666",o)if(L>0)for(let d of _t(S,E)){let y=(Math.log10(d)-a)/L;r.fillText(String(d),c.left+y*m,c.top+f+4)}else r.fillText(String(S),c.left+m/2,c.top+f+4);else{let d=E-S;if(d>0)for(let y of nt(S,E,5)){let D=(y-S)/d;r.fillText(String(y),c.left+D*m,c.top+f+4)}else r.fillText(String(S),c.left+m/2,c.top+f+4)}r.strokeStyle="#999",r.lineWidth=1,r.beginPath(),r.moveTo(c.left,c.top),r.lineTo(c.left,c.top+f),r.lineTo(c.left+m,c.top+f),r.stroke(),k>0&&(r.fillStyle="#999",r.font="9px monospace",r.textAlign="right",r.textBaseline="top",r.fillText(k+" empty",h-c.right,2)),r.font="10px monospace",r.fillStyle="#888",r.textAlign="center",r.textBaseline="bottom",r.fillText("Reasoning length (chars)",c.left+m/2,p-2),r.save(),r.translate(12,c.top+f/2),r.rotate(-Math.PI/2),r.textAlign="center",r.textBaseline="middle",r.fillText("Count",0,0),r.restore()}var Aw={top:16,right:12,bottom:40,left:52};function Ae(t,w,e,o={}){let{logY:s=!1}=o,{lengths:i,levelBoundaries:n,binAssignments:l,binCount:a}=w,{ctx:r,w:h,h:p}=be(t),c=Aw,m=h-c.left-c.right,f=p-c.top-c.bottom;r.clearRect(0,0,h,p);let g=i.length;if(g===0)return;let k=Math.max(...i),S=k>0?k:1,E=i.filter(d=>d>0),L=s&&k>1&&E.length>0,O=L?Math.log10(Math.min(...E)):0,mw=(L?Math.log10(k):1)-O||1;function K(d){return c.left+(g>1?d/(g-1)*m:m/2)}function U(d){return L?d<=0?c.top+f:c.top+f-(Math.log10(d)-O)/mw*f:c.top+f-d/S*f}r.font="10px monospace",r.strokeStyle="#eee",r.lineWidth=1;let ht=L?_t(Math.min(...E),k):nt(0,S,5);r.textAlign="right",r.textBaseline="middle",r.fillStyle="#666";for(let d of ht){let y=U(d);y<c.top-1||y>c.top+f+1||(r.beginPath(),r.moveTo(c.left,y),r.lineTo(c.left+m,y),r.stroke(),r.fillText(String(d),c.left-4,y))}let Mw=nt(0,g-1,7);r.textAlign="center",r.textBaseline="top";for(let d of Mw){if(d<0||d>=g)continue;let y=K(d);r.beginPath(),r.moveTo(y,c.top),r.lineTo(y,c.top+f),r.stroke(),r.fillText(String(d+1),y,c.top+f+4)}if(r.strokeStyle="#999",r.lineWidth=1,r.beginPath(),r.moveTo(c.left,c.top),r.lineTo(c.left,c.top+f),r.lineTo(c.left+m,c.top+f),r.stroke(),n.length>0){r.save(),r.setLineDash([4,4]),r.strokeStyle="#bbb",r.lineWidth=1;for(let d of n){let y=K(d);r.beginPath(),r.moveTo(y,c.top),r.lineTo(y,c.top+f),r.stroke()}r.restore()}if(r.lineWidth=1.5,l&&g>1)for(let d=0;d<g-1;d++){if(L&&(i[d]<=0||i[d+1]<=0))continue;let y=l[d+1];r.strokeStyle=y>=0?ve(xe(y,a)):"#ccc",r.beginPath(),r.moveTo(K(d),U(i[d])),r.lineTo(K(d+1),U(i[d+1])),r.stroke()}else{r.strokeStyle="#888",r.beginPath();let d=!1;for(let y=0;y<g;y++){if(L&&i[y]<=0){d=!1;continue}d?r.lineTo(K(y),U(i[y])):(r.moveTo(K(y),U(i[y])),d=!0)}r.stroke()}let j=Math.min(e,g-1);if(j>=0){let d=K(j);r.strokeStyle="rgba(204, 68, 68, 0.25)",r.lineWidth=1,r.beginPath(),r.moveTo(d,c.top),r.lineTo(d,c.top+f),r.stroke();let y=U(i[j]);r.fillStyle="#cc4444",r.beginPath(),r.arc(d,y,4,0,Math.PI*2),r.fill(),r.fillStyle="#cc4444",r.font="bold 10px monospace",r.textAlign="left",r.textBaseline="bottom";let D=d+6,Cw=y-4;D+40>h?(r.textAlign="right",r.fillText(String(i[j]),d-6,Cw)):r.fillText(String(i[j]),D,Cw)}r.font="10px monospace",r.fillStyle="#888",r.textAlign="center",r.textBaseline="bottom",r.fillText("Step",c.left+m/2,p-2),r.save(),r.translate(12,c.top+f/2),r.rotate(-Math.PI/2),r.textAlign="center",r.textBaseline="middle",r.fillText("Reasoning length (chars)",0,0),r.restore()}function lt(t){if(!t.delta_encoded)return;let w=t.states;if(!w||w.length<2){delete t.delta_encoded;return}let e=w[0].sprites;for(let o=1;o<w.length;o++){if(!("sprites"in w[o]))w[o].sprites=Object.assign({},e);else{let s=Object.assign({},e,w[o].sprites);for(let i in s)s[i]===null&&delete s[i];w[o].sprites=s}e=w[o].sprites}delete t.delta_encoded}ge();function x(t,w,e){if(t==null||t[w]===void 0)throw new Error(`[replay-viewer] missing required field '${w}' in ${e}. Check the Python pipeline did not drop it.`);return t[w]}var B=null,R=[],v=[],A=0,_=null,_e=null,Ot=null,ow=null,Ie=20,Io=!1,iw=null,Rt=null,ze=null,X=null,Y=-1,ew=[],Iw=-1,Te=null,M=null,Lw=!1,at=!1,Ye=[],G=!1,$=0,Ow=[],Bt=[],Rw=[],$e=null,F=document.getElementById("file-drop-zone"),J=document.getElementById("replay-loading"),je=document.getElementById("loading-label"),Qe=document.getElementById("loading-detail"),To=document.getElementById("loading-fallback-link"),qe=document.getElementById("file-input"),Lo=document.getElementById("replay-container"),Oo=document.getElementById("game-canvas"),Mt=new it(Oo,30),Ro=document.getElementById("btn-step-back"),Bo=document.getElementById("btn-reset"),Ft=document.getElementById("btn-play-pause"),Mo=document.getElementById("btn-step-fwd"),It=document.getElementById("step-label"),Xe=document.getElementById("speed-select"),sw=document.getElementById("step-scrubber"),ct=document.getElementById("metadata-panel"),Kt=document.getElementById("metadata-json"),Je=document.getElementById("metadata-tab-summary"),Ve=document.getElementById("metadata-tab-json"),Tw=document.getElementById("metadata-copy-btn"),q=document.getElementById("action-log"),P=document.getElementById("btn-share"),Le=document.getElementById("reasoning-charts"),Co=document.getElementById("chart-histogram"),Ct=document.getElementById("chart-line"),Oe=document.getElementById("chart-log-x"),Re=document.getElementById("chart-log-y"),Po=document.getElementById("multi-turn-layout"),H=document.getElementById("conversation-content"),Pt=document.getElementById("flap-tab-desc"),Gt=document.getElementById("flap-tab-level"),Be=document.getElementById("flap-panel-desc"),Me=document.getElementById("flap-panel-level"),Go=document.getElementById("game-desc"),No=document.getElementById("level-text"),Ze={up:document.getElementById("dpad-up"),down:document.getElementById("dpad-down"),left:document.getElementById("dpad-left"),right:document.getElementById("dpad-right"),action:document.getElementById("dpad-space")},Do=Object.values(Ze),Tt=null;function wo(t){if(Tt===t){Tt=null,Pt.classList.remove("active"),Gt.classList.remove("active"),Be.classList.remove("open"),Me.classList.remove("open");return}Tt=t,Pt.classList.toggle("active",t==="desc"),Gt.classList.toggle("active",t==="level"),Be.classList.toggle("open",t==="desc"),Me.classList.toggle("open",t==="level")}Pt.addEventListener("click",()=>wo("desc"));Gt.addEventListener("click",()=>wo("level"));F.addEventListener("click",()=>{qe.click()});qe.addEventListener("change",t=>{t.target.files.length>0&&to(t.target.files[0])});F.addEventListener("dragover",t=>{t.preventDefault(),F.classList.add("dragover")});F.addEventListener("dragleave",()=>{F.classList.remove("dragover")});F.addEventListener("drop",t=>{t.preventDefault(),F.classList.remove("dragover"),t.dataTransfer.files.length>0&&to(t.dataTransfer.files[0])});async function to(t){Rt=t,ze=t.name,iw=null;let w;if(t.name.endsWith(".gz")){let o=new DecompressionStream("gzip"),s=t.stream().pipeThrough(o);w=await new Response(s).text()}else w=await t.text();let e=JSON.parse(w);lt(e),Nt(e)}function Ho(t,w,e){if(t.length>0&&t[0].state_index!==void 0){let n=[];for(let l=0;l<t.length;l++)n.push(t[l].state_index);return n.push(w-1),n}let s=[],i=0;for(let n=0;n<t.length;n++){if(n>0){let l=t[n-1],a=t[n];(a.level!==l.level||a.attempt!==l.attempt)&&i++}s.push(n+i)}return s.push(t.length+i),s}function Fo(t,w){let e=new Array(w).fill(-1),o=[],s=new Array(w).fill(-1);for(let n=0;n<t.length;n++){let l=t[n].state_index;e[l]=n,o.push(l)}let i=-1;for(let n=0;n<w;n++)e[n]>=0&&(i=e[n]),s[n]=i;return{frameToStepMap:e,stepToFrameMap:o,lastActionStepForFrame:s}}function Nt(t){if(!t.states||!Array.isArray(t.states)){alert('Invalid replay file: missing "states" array. Run export_replay first.');return}if(!t.game||!rt[t.game]){alert("Unknown game: "+(t.game||"(none)")+". Not found in GAMES registry.");return}if(B=t,R=t.states,v=t.steps||[],Ye=Ho(v,R.length,t.source),G=v.length>0&&v[0].state_index!==void 0&&R.length>v.length,G){$=R.length;let s=Fo(v,R.length);Ow=s.frameToStepMap,Bt=s.stepToFrameMap,Rw=s.lastActionStepForFrame}else $=0,Ow=[],Bt=[],Rw=[];Io=!!(t.meta&&t.meta.persistent),Po.style.display="flex",F.style.display="none",J.style.display="none",J.classList.remove("error"),Lo.classList.add("visible"),P.style.display="inline-block",qo(),sw.min=0,sw.max=G?$-1:v.length,sw.value=0,Yo(),M=ke(v),M.hasAny?(Le.classList.add("visible"),Bw(0)):Le.classList.remove("visible"),Y=-1;let e=rt[B.game],o=t.game_description||e.description;$e=o,Go.value=o,Ot=null,N(0)}function Ce(t){if(Ot===t)return;let w=rt[B.game];_e=new st().parseGame($e||w.description);let o=w.levels[t];if(!o){console.error("Level",t,"not found for game",B.game);return}_=_e.buildLevel(o),Ot=t,No.value=o,Mt.resize(_.width,_.height)}function Pe(t,w){let e={};for(let[o,s]of Object.entries(t.sprites))e[o]=s.map(i=>({id:i.id,key:i.key,x:i.col*w,y:i.row*w,w,h:w,alive:i.alive,resources:i.resources||{},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation,_age:i._age,lastmove:i.lastmove}));return{score:t.score,time:t.time,sprites:e}}function N(t){if(G){t<0&&(t=0),t>=$&&(t=$-1),A=t;let a=Rw[t],r;if(a>=0?r=v[a].level!==void 0?v[a].level:B.start_level||0:r=v.length>0&&v[0].level!==void 0?v[0].level:B.start_level||0,Ce(r),t<0||t>=R.length)return;let h=R[t],p=_.block_size,c=Pe(h,p);_.setGameState(c);let m=`states[${t}] (frame mode)`;if(_.ended=x(h,"ended",m),_.won=x(h,"won",m),_.lose=x(h,"lose",m),_.timeout=x(h,"timeout",m),_.score=x(h,"score",m),_.time=x(h,"time",m),Mt.render(_),Ge(),Ne(),Fe(),Ke(),sw.value=t,Ht(),M&&M.hasAny){let f=a>=0?a:0;Bw(f)}return}let w=v.length;t<0&&(t=0),t>w&&(t=w),A=t;let e;if(t<v.length)e=v[t].level!==void 0?v[t].level:B.start_level||0;else{let a=v[v.length-1];e=a.level!==void 0?a.level:B.start_level||0}Ce(e);let o=Ye[t];if(o<0||o>=R.length)return;let s=R[o],i=_.block_size,n=Pe(s,i);_.setGameState(n);let l=`states[${o}] (step mode)`;_.ended=x(s,"ended",l),_.won=x(s,"won",l),_.lose=x(s,"lose",l),_.timeout=x(s,"timeout",l),_.score=x(s,"score",l),_.time=x(s,"time",l),Mt.render(_),Ge(),Ne(),Fe(),Ke(),sw.value=t,Ht(),M&&M.hasAny&&Bw(A)}function Ut(){N(A+1)}function eo(){N(A-1)}function oo(){ow!==null?T():so()}function so(){ow===null&&(Ft.textContent="Pause",Ie=Number(Xe.value)||20,ow=setInterval(()=>{let t=G?$-1:v.length;if(A>=t){T();return}Ut()},1e3/Ie))}function T(){ow!==null&&(clearInterval(ow),ow=null),Ft.textContent="Play"}function Ge(){if(G){let w=A,e=Rw[w],o=Ow[w]>=0,s=e>=0?v[e]:null,i=s&&s.level!==void 0?s.level:"?",n=s&&s.attempt!==void 0?s.attempt:"?",l=o?"ACTION":"NO-OP";It.textContent="Frame "+(w+1)+" / "+$+" ["+l+"] (L"+i+" A"+n+")";return}let t=v.length;if(A>=t)It.textContent="Final / "+t+" steps";else{let w=v[A],e=w.level!==void 0?w.level:"?",o=w.attempt!==void 0?w.attempt:"?";It.textContent="Step "+(A+1)+" / "+t+" (L"+e+" A"+o+")"}}function Ne(){Wo()}function Ko(t,w){let e=t[w];if(e.user_prompt!==void 0)return e.user_prompt;let o=`steps[${w}]`,s=x(e,"step",o),i=x(e,"level",o),n=x(e,"attempt",o),l=[];return Uo(l,t,w,i,n),l.push("# Step "+s+" (Level "+i+", Attempt "+n+")"),l.push(""),l.push(x(e,"formatted_obs",o)),l.join(`
`)}function Uo(t,w,e,o,s){let i=null,n=-1;for(let c=e-1;c>=0;c--){let m=w[c];if(!x(m,"action",`steps[${c}]`).startsWith("_")){i=m,n=c;break}}if(i===null)return;let l=`steps[${n}]`,a=x(i,"level",l),r=x(i,"attempt",l);if(a===o&&r===s)return;let h="";x(i,"won",l)?h="won":x(i,"lose",l)?h="died":x(i,"timeout",l)&&(h="timeout");let p=0;for(let c=n;c>=0;c--){let m=w[c];if(x(m,"action",`steps[${c}]`).startsWith("_"))continue;let g=x(m,"level",`steps[${c}]`),k=x(m,"attempt",`steps[${c}]`);if(g===a&&k===r)p+=x(m,"reward",`steps[${c}]`);else break}h&&(t.push("--- TRIAL ENDED outcome: "+h+", score: "+p+" ---"),t.push("")),t.push("--- NEW TRIAL (Level "+o+", Attempt "+s+") ---"),t.push("")}function Wo(){let t;if(G){if(t=Rw[A],t<0){He(-1);return}}else t=A<v.length?A:v.length;He(t)}function De(t){let w=v[t],e=document.createDocumentFragment(),o=document.createElement("div");o.className="msg msg-user";let s=document.createElement("div");s.className="msg-label",s.textContent="User (Step "+w.step+")",o.appendChild(s);let i=document.createElement("div");i.textContent=Ko(v,t),o.appendChild(i),e.appendChild(o);let n=w.response||{},l=document.createElement("div");l.className="msg msg-assistant";let a=document.createElement("div");a.className="msg-label",a.textContent="Assistant (Step "+w.step+")",l.appendChild(a);let r=[],h=n.rationale;h&&r.push(h),n.action&&r.push("Action: "+n.action);let p=document.createElement("div");return p.textContent=r.join(`

`)||"--",l.appendChild(p),e.appendChild(l),e}function Dt(t){return t&&typeof t.action=="string"&&t.action.startsWith("_")}function zo(t,w){let e=0;for(let o=t;o<=w;o++)Dt(v[o])||e++;return e}function He(t){let w=Math.min(t,v.length-1);if(Y<0){H.innerHTML="";let e=B.system_prompt;if(e){let o=document.createElement("div");o.className="msg msg-system";let s=document.createElement("div");s.className="msg-label",s.textContent="System",o.appendChild(s);let i=document.createElement("div");i.textContent=e,o.appendChild(i),H.appendChild(o)}for(let o=0;o<=w;o++)Dt(v[o])||H.appendChild(De(o));Y=w,H.scrollTop=H.scrollHeight;return}if(w>Y){for(let e=Y+1;e<=w;e++)Dt(v[e])||H.appendChild(De(e));Y=w,H.scrollTop=H.scrollHeight;return}if(w<Y){let e=zo(w+1,Y);for(let o=0;o<e*2;o++)H.removeChild(H.lastChild);Y=w}}function Yo(){if(q.innerHTML="",ew=[],Iw=-1,G){let e=null,o=null;for(let s=0;s<$;s++){let i=Ow[s],n=`states[${s}]`,l=x(R[s],"level",n),a=x(R[s],"attempt",n);if(l!==e||a!==o){if(e!==null){let p=document.createElement("div");p.className="log-separator",p.textContent="--- Level "+l+", Attempt "+a+" ---",q.appendChild(p)}e=l,o=a}let r=document.createElement("div");r.className="log-entry",r.dataset.index=s;let h="[F"+(s+1)+"]";if(i>=0){let p=v[i],c=`replaySteps[${i}]`,m=x(p,"level",c),f=x(p,"attempt",c),g=x(p,"step",c),k=x(p,"action",c).toUpperCase(),S="[L"+m+" A"+f+" #"+g+"]",E=x(p,"action_log",c),L=E.indexOf(" -> "),O=L>=0?" -> "+E.substring(L+4):"";r.textContent=h+S+" "+k+O}else{let p=R[s],c=p&&p.action_log;if(c){let m=c.indexOf(" -> "),f=m>=0?c.substring(m+4):"";f&&f!=="no change"?r.textContent=h+" NO-OP -> "+f:r.textContent=h+" NO-OP"}else r.textContent=h+" NO-OP";r.classList.add("noop-entry")}r.addEventListener("click",()=>{T(),N(s)}),q.appendChild(r),ew.push(r)}return}let t=null,w=null;for(let e=0;e<v.length;e++){let o=v[e],s=`replaySteps[${e}]`,i=x(o,"level",s),n=x(o,"attempt",s);if(i!==t||n!==w){if(t!==null){let a=document.createElement("div");a.className="log-separator",a.textContent="--- Level "+i+", Attempt "+n+" ---",q.appendChild(a)}t=i,w=n}let l=document.createElement("div");l.className="log-entry",l.dataset.index=e,l.textContent=x(o,"action_log",s),l.addEventListener("click",()=>{T(),N(e)}),q.appendChild(l),ew.push(l)}}function Fe(){if(Iw>=0&&Iw<ew.length&&ew[Iw].classList.remove("current-step"),A>=0&&A<ew.length){let t=ew[A];t.classList.add("current-step");let w=q.getBoundingClientRect(),e=t.getBoundingClientRect();e.top<w.top?q.scrollTop-=w.top-e.top:e.bottom>w.bottom&&(q.scrollTop+=e.bottom-w.bottom)}Iw=A}function Ke(){let t=null;if(G){let e=Ow[A];e>=0&&(t=(v[e].action||"").toLowerCase())}else A<v.length&&(t=(v[A].action||"").toLowerCase());for(let e of Do)e.classList.remove("active");let w=t?Ze[t]:null;w&&w.classList.add("active")}Ro.addEventListener("click",()=>{T(),eo()});Bo.addEventListener("click",()=>{T(),window.location.href=window.location.pathname});function io(t){let w=t==="json";Je.classList.toggle("active",!w),Ve.classList.toggle("active",w),ct.style.display=w?"none":"grid",Kt.style.display=w?"block":"none",Tw.style.display=w?"inline-block":"none"}Je.addEventListener("click",()=>io("summary"));Ve.addEventListener("click",()=>io("json"));Tw.addEventListener("click",async()=>{await navigator.clipboard.writeText(Kt.textContent);let t=Tw.textContent;Tw.textContent="Copied!",setTimeout(()=>{Tw.textContent=t},1500)});Mo.addEventListener("click",()=>{T(),Ut()});Ft.addEventListener("click",()=>oo());Xe.addEventListener("change",()=>{ow!==null&&(T(),so())});sw.addEventListener("input",()=>{T(),N(Number(sw.value))});function Bw(t){!M||!M.hasAny||(Ee(Co,M,{logX:Lw,logY:at}),Ae(Ct,M,t??A,{logY:Lw}))}Oe.addEventListener("click",()=>{Lw=!Lw,Oe.classList.toggle("active",Lw),Bw()});Re.addEventListener("click",()=>{at=!at,Re.classList.toggle("active",at),Bw()});Ct.addEventListener("click",t=>{if(!M||!M.hasAny||v.length===0)return;let w=Ct.getBoundingClientRect(),e=t.clientX-w.left,o=w.width-Aw.left-Aw.right,s=(e-Aw.left)/o,i=Math.round(s*(v.length-1));i>=0&&i<v.length&&(T(),N(G?Bt[i]:i))});document.addEventListener("keydown",t=>{let w=t.target.tagName;if(!(w==="TEXTAREA"||w==="INPUT"||w==="SELECT")&&B)switch(t.key){case"ArrowLeft":t.preventDefault(),T(),eo();break;case"ArrowRight":t.preventDefault(),T(),Ut();break;case" ":t.preventDefault(),oo();break;case"Home":t.preventDefault(),T(),N(0);break;case"End":t.preventDefault(),T(),N(G?$-1:v.length);break}});function $o(t){return t==null?"--":typeof t=="boolean"?t?"yes":"no":typeof t=="number"?Number.isFinite(t)&&!Number.isInteger(t)?t.toFixed(4):String(t):typeof t=="object"?JSON.stringify(t):String(t)}var ro=new Set(["states","steps"]);function jo(){let t=[];for(let[w,e]of Object.entries(B))if(!ro.has(w))if(w==="meta"&&e&&typeof e=="object"&&!Array.isArray(e))for(let[o,s]of Object.entries(e))t.push([`meta.${o}`,s]);else t.push([w,e]);return t.sort(([w],[e])=>w.localeCompare(e)),t}function Qo(){let t={};for(let[w,e]of Object.entries(B))ro.has(w)||(t[w]=e);return t}function qo(){ct.innerHTML="";for(let[t,w]of jo()){let e=document.createElement("span");e.className="meta-key",e.textContent=t;let o=document.createElement("span");o.className="meta-val",o.textContent=$o(w),ct.appendChild(e),ct.appendChild(o)}Kt.textContent=JSON.stringify(Qo(),null,2)}function Ht(){!X&&!iw||(clearTimeout(Te),Te=setTimeout(function(){let t=new URLSearchParams;X?t.set("grid-key",X):t.set("file",iw),t.set("step",String(A)),history.replaceState(null,"","?"+t.toString())},200))}function Ue(){let t=new URLSearchParams;return X?t.set("grid-key",X):t.set("file",iw),t.set("step",String(A)),window.location.origin+"/replay.html?"+t.toString()}function We(t){P.textContent=t,P.disabled=!1,setTimeout(function(){P.textContent="Share"},2e3)}async function Xo(){if(X||iw){let s=Ue();await navigator.clipboard.writeText(s),We("Link copied!");return}if(!Rt)return;P.textContent="Uploading...",P.disabled=!0;let t=await fetch("/_api/upload-url?filename="+encodeURIComponent(ze));if(!t.ok){alert("Failed to get upload URL: "+t.status+" "+t.statusText),P.textContent="Share",P.disabled=!1;return}let w=await t.json(),e=await fetch(w.uploadUrl,{method:"PUT",body:Rt});if(!e.ok){alert("Upload failed: "+e.status+" "+e.statusText),P.textContent="Share",P.disabled=!1;return}iw=w.key,Ht();let o=Ue();await navigator.clipboard.writeText(o),We("Link copied!")}P.addEventListener("click",Xo);function _w(t,w){F.style.display="none",J.classList.remove("error"),J.style.display="block",je.textContent=t,Qe.textContent=w||""}function Lt(t,w){J.classList.add("error"),J.style.display="block",je.textContent=t,Qe.textContent=w||""}To.addEventListener("click",function(){J.style.display="none",J.classList.remove("error"),F.style.display=""});async function Jo(t){if(!window.__REPLAY_GZ__?.[t]){let l="catalogue-data/"+t.replace(".replay.json.gz",".replay.js");await new Promise((a,r)=>{let h=document.createElement("script");h.src=l,h.onload=a,h.onerror=()=>r(new Error("Failed to load replay script: "+l)),document.head.appendChild(h)})}let w=window.__REPLAY_GZ__?.[t];if(!w)throw new Error("Replay data missing after load: "+t);let e=Uint8Array.from(atob(w),l=>l.charCodeAt(0)),o=new DecompressionStream("gzip"),s=o.writable.getWriter();s.write(e),s.close();let i=await new Response(o.readable).text(),n=JSON.parse(i);return lt(n),n}(async function(){let t=new URLSearchParams(window.location.search),w=t.get("file"),e=t.get("url"),o=t.get("grid-key"),s=t.get("local-key");if(!s&&!o&&!e&&!w)return;function i(r){if(!r)return"";let h=r.lastIndexOf("/");return h>=0?r.substring(h+1):r}let n,l,a="";try{if(s){_w("Loading local replay...",i(s));let m=await Jo(s);X=s,Nt(m);let f=t.get("step");f!==null&&N(parseInt(f,10));return}else if(o){_w("Resolving share URL...",i(o));let m=await fetch("/grid-api/replay-url?key="+encodeURIComponent(o));if(!m.ok){Lt("Failed to resolve grid replay URL","HTTP "+m.status+" "+m.statusText);return}n=(await m.json()).url,l=o.endsWith(".gz"),a=i(o)}else e?(n=e,l=e.split("?")[0].endsWith(".gz"),a=i(e.split("?")[0])):(n="/"+w,l=w.endsWith(".gz"),a=i(w));_w("Downloading replay...",a);let r=await fetch(n);if(!r.ok){Lt("Failed to download replay","HTTP "+r.status+" "+r.statusText);return}let h;if(l){_w("Decompressing...",a);let m=new DecompressionStream("gzip"),f=r.body.pipeThrough(m);h=await new Response(f).text()}else h=await r.text();_w("Parsing...",a);let p=JSON.parse(h);lt(p),X=o||null,iw=w||null,Nt(p);let c=t.get("step");c!==null&&N(parseInt(c,10))}catch(r){Lt("Error loading replay",String(r)),console.error(r)}})();})();
