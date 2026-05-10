// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var ht=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,s]of Object.entries(w))this.register(e,s)}},m=new ht;var rw=class t{constructor(w,e,s,o){this.x=w,this.y=e,this.w=s,this.h=o}static fromPosSize(w,e){return new t(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new t(this.x+w.x,this.y+w.y,this.w,this.h):new t(this.x+w,this.y+e,this.w,this.h)}copy(){return new t(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let s=0;s<w.length;s++)this.colliderect(w[s].rect||w[s])&&e.push(s);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var b=class t{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let s of this.keys)s==="LEFT"&&(w-=1),s==="RIGHT"&&(w+=1),s==="UP"&&(e-=1),s==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof t)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},pt={NOOP:new b,UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),SPACE:new b("SPACE"),SPACE_RIGHT:new b("SPACE","RIGHT"),SPACE_LEFT:new b("SPACE","LEFT")},Ut=pt.NOOP;var ft=[129,199,132],Cw=[25,118,210],Pw=[211,47,47],mt=[69,90,100],Gw=[250,250,250],ls=[109,76,65],ut=[55,71,79],dt=[230,81,0],as=[255,245,157],cs=[255,138,128],hs=[255,196,0],ps=[255,82,82],fs=[255,112,67],ms=[144,202,249],us=[185,246,202],ds=[207,216,220],gs=[68,90,100],Ss=[1,87,155],ys=[92,107,192],vs=[200,150,220],xs=[255,230,230],Nw={GREEN:ft,BLUE:Cw,RED:Pw,GRAY:mt,WHITE:Gw,BROWN:ls,BLACK:ut,ORANGE:dt,YELLOW:as,PINK:cs,GOLD:hs,LIGHTRED:ps,LIGHTORANGE:fs,LIGHTBLUE:ms,LIGHTGREEN:us,LIGHTGRAY:ds,DARKGRAY:gs,DARKBLUE:Ss,PURPLE:ys,LIGHTPURPLE:vs,LIGHTPINK:xs},gt={x:0,y:-1},St={x:0,y:1},uw={x:-1,y:0},W={x:1,y:0},nw=[gt,uw,St,W];function dw(t,w){return t.x===w.x&&t.y===w.y}function ks(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function z(t){let w=ks(t);return w>0?{x:t.x/w,y:t.y/w}:{x:1,y:0}}var lw=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,s){if(s==null&&(s=w.speed===null?1:w.speed),s!==0&&e!==null&&e!==void 0){let o;if(e.asVector?o=e.asVector():o=e,dw(o,{x:0,y:0}))return;w._updatePosition(o,s*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var Es=Nw,I=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:s,pos:o,size:i=[1,1],color:r,speed:l,cooldown:a,physicstype:n,rng:h,img:p,resources:c,...d}=w;this.key=e,this.id=s;let f=Array.isArray(i)?i:[i,i];this.rect=new rw(o[0],o[1],f[0],f[1]),this.lastrect=this.rect,this.alive=!0;let g=n||this.constructor.physicstype||lw;if(this.physics=new g(f),this.speed=l??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=p||null,this.color=r||this.constructor.color,this.img&&this.img.startsWith("colors/")){let x=this.img.split("/")[1],S=Es[x];S&&(this.color=S)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(c?{...c}:{},{get(x,S){return typeof S=="string"&&!(S in x)&&S!=="toJSON"&&S!=="then"&&S!==Symbol.toPrimitive&&S!==Symbol.toStringTag&&S!=="inspect"&&S!=="constructor"&&S!=="__proto__"?0:x[S]},set(x,S,E){return x[S]=E,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[x,S]of Object.entries(d))this[x]=S}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let s,o;if(e==null){let i=this.speed||0;s=w.x*i,o=w.y*i}else s=w.x*e,o=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:s,y:o}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},C=class extends I{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},Dw=class extends I{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var Hw=class extends I{static color=mt;static is_static=!0},Fw=class extends I{static color=Pw},Kw=class extends C{static is_static=!0},gw=class extends I{static color=Pw;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},V=class extends I{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||W)}},Sw=class extends V{static speed=1},yw=class extends V{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};yw.limit=1;var aw=class extends I{static stype=null},Uw=class extends aw{static is_static=!0;static is_stochastic=!0;static color=Cw},cw=class extends aw{static color=ut;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},vw=class extends I{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=nw[Math.floor(w.randomGenerator.random()*nw.length)];this.physics.activeMovement(this,e)}},xw=class extends vw{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,s=[],o=w.getSprites(this.stype);for(let i of o){let r=this.physics.distance(this.rect,i.rect);r<e?(e=r,s=[i]):r===e&&s.push(i)}return s}_movesToward(w,e){let s=[],o=this.physics.distance(this.rect,e.rect);for(let i of nw){let r=this.rect.move(i),l=this.physics.distance(r,e.rect);this.fleeing&&o<l&&s.push(i),!this.fleeing&&o>l&&s.push(i)}return s}update(w){I.prototype.update.call(this,w);let e=[];for(let o of this._closestTargets(w))e.push(...this._movesToward(w,o));e.length===0&&(e=[...nw]);let s=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,s)}},Ww=class extends xw{constructor(w){super({...w,fleeing:!0})}},zw=class extends cw{static color=dt;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||W),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),cw.prototype.update.call(this,w)}},Yw=class extends Sw{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let s;this.orientation.x>0?s=1:this.orientation.x<0?s=-1:s=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:s,y:0})}super.update(w)}},$w=class extends V{static is_static=!0;static color=Cw;static strength=1;static draw_arrow=!0},jw=class t extends gw{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of nw)w.randomGenerator.random()<(this.spreadprob||t.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function Xw(t,w){let e=[...w.active_keys].sort();for(let s=Math.max(3,e.length);s>=0;s--)for(let o of As(e,s)){let i=o.join(",");if(t._keysToAction.has(i))return t._keysToAction.get(i)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function As(t,w){if(w===0)return[[]];if(t.length===0)return[];let e=[];function s(o,i){if(i.length===w){e.push([...i]);return}for(let r=o;r<t.length;r++)i.push(t[r]),s(r+1,i),i.pop()}return s(0,[]),e}function Wt(t){let w=new Map;for(let e of Object.values(t)){let s=[...e.keys].sort().join(",");w.set(s,e)}return w}var kw=class extends I{static color=Gw;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=Wt(e)}static declarePossibleActions(){return{UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){I.prototype.update.call(this,w);let e=Xw(this,w);e.equals(Ut)||this.physics.activeMovement(this,e)}},Z=class extends I{static color=Gw;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||W);let e=this.constructor.declarePossibleActions();this._keysToAction=Wt(e)}static declarePossibleActions(){return{UP:new b("UP"),DOWN:new b("DOWN"),LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){let e=this.orientation;this.orientation={x:0,y:0},I.prototype.update.call(this,w);let s=Xw(this,w);s&&this.physics.activeMovement(this,s);let o=this.lastdirection;Math.abs(o.x)+Math.abs(o.y)!==0?this.orientation=o:this.orientation=e}},Qw=class extends Z{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=Z.declarePossibleActions();return w.SPACE=new b("SPACE"),w}update(w){Z.prototype.update.call(this,w);let e=Xw(this,w);this._hasAmmo()&&e.equals(pt.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let s of e){let o=[this.lastrect.x+s.x*this.lastrect.w,this.lastrect.y+s.y*this.lastrect.h],i=w.createSprite(this.stype,o);i&&i.orientation!==void 0&&(i.orientation=s)}this._spendAmmo()}_shootDirections(w){return[z(this.orientation)]}},ww=class extends kw{static declarePossibleActions(){return{LEFT:new b("LEFT"),RIGHT:new b("RIGHT"),NO_OP:new b}}update(w){I.prototype.update.call(this,w);let e=Xw(this,w),s=e.asVector();(dw(s,W)||dw(s,uw))&&this.physics.activeMovement(this,e)}},qw=class extends ww{static color=ft;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=ww.declarePossibleActions();return w.SPACE=new b("SPACE"),w}update(w){ww.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function Q(t,w,e){e.killSprite(t)}function zt(t,w,e){e.killSprite(t),e.killSprite(w)}function Yt(t,w,e){e.addSpriteCreation(t.key,[t.rect.x,t.rect.y])}function hw(t,w,e,{stype:s="wall"}={}){let o=t.lastrect;e.killSprite(t);let i=e.addSpriteCreation(s,t.rect.topleft);i!=null&&(i.lastrect=o,t.orientation!==void 0&&i.orientation!==void 0&&(i.orientation=t.orientation))}function $t(t,w,e,{resource:s,limit:o=1,no_symmetry:i=!1,exhaustStype:r=null}={}){t.resources[s]<o?bw(t,w,e,{no_symmetry:i}):r?e.kill_list.includes(w)||hw(w,t,e,{stype:r}):Q(w,t,e)}function bw(t,w,e,{no_symmetry:s=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(t)&&(t.rect.equals(t.lastrect)&&!s?(w.rect=w.lastrect,yt(w,0)):(t.rect=t.lastrect,yt(t,0)))}function yt(t,w){w>5||t.just_pushed&&(t.just_pushed.rect=t.just_pushed.lastrect,yt(t.just_pushed,w+1))}function jt(t,w,e){for(let s of e.sprite_registry.sprites())s.rect=s.lastrect}function vt(t,w){return t.just_pushed&&w<3?vt(t.just_pushed,w+1):t.lastdirection}function Qt(t,w,e){let s=vt(w,0);Math.abs(s.x)+Math.abs(s.y)===0?(s=vt(t,0),w.physics.activeMovement(w,z(s)),w.just_pushed=t):(t.physics.activeMovement(t,z(s)),t.just_pushed=w)}function qt(t,w,e,{exhaustStype:s=null}={}){if(t.lastrect.colliderect(w.rect))return;let o=t.lastdirection;if(Math.abs(o.x)+Math.abs(o.y)===0)return;let r=z(o),l=t.rect.width,a=t.rect.copy();a.x+=Math.round(r.x)*l,a.y+=Math.round(r.y)*l,!(a.x<0||a.y<0||a.x+a.width>e.screensize[0]||a.y+a.height>e.screensize[1])&&(t.rect=a,t.lastmove=0,s&&hw(w,t,e,{stype:s}))}function xt(t,w,e,{with_step_back:s=!0}={}){s&&(t.rect=t.lastrect),t.orientation!==void 0&&(t.orientation={x:-t.orientation.x,y:-t.orientation.y})}function Xt(t,w,e){t.rect=t.lastrect,t.lastmove=t.cooldown,t.physics.activeMovement(t,{x:0,y:1},1),xt(t,w,e,{with_step_back:!1})}function Jt(t,w,e){let s=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];t.orientation=s[Math.floor(e.randomGenerator.random()*s.length)]}function Vt(t,w,e,{offset:s=0}={}){t.rect.top<0?t.rect.top=e.screensize[1]-t.rect.height:t.rect.top+t.rect.height>e.screensize[1]&&(t.rect.top=0),t.rect.left<0?t.rect.left=e.screensize[0]-t.rect.width:t.rect.left+t.rect.width>e.screensize[0]&&(t.rect.left=0),t.lastmove=0}function Zt(t,w,e){if(!(t instanceof C))throw new Error(`collectResource: sprite must be a Resource, got ${t.constructor.name}`);let s=t.resource_type,o=e.domain.resources_limits&&e.domain.resources_limits[s]||1/0;w.resources[s]=Math.max(0,Math.min(w.resources[s]+t.value,o))}function we(t,w,e,{resource:s,value:o=1}={}){e.resource_changes.push([t,s,o])}function te(t,w,e,{resource:s,value:o=1}={}){e.resource_changes.push([w,s,o]),e.kill_list.push(t)}function ee(t,w,e,{resource:s,value:o=-1}={}){e.resource_changes.push([w,s,o]),e.kill_list.push(t)}function se(t,w,e,{resource:s,limit:o=1}={}){w.resources[s]>=o&&Q(t,w,e)}function oe(t,w,e,{resource:s,limit:o=1}={}){t.resources[s]>=o&&Q(t,w,e)}function ie(t,w,e,{resource:s,limit:o=1}={}){w.resources[s]<=o&&Q(t,w,e)}function re(t,w,e,{resource:s,limit:o=1}={}){t.resources[s]<=o&&Q(t,w,e)}function ne(t,w,e,{resource:s,stype:o,limit:i=1}={}){t.resources[s]>=i&&e.addSpriteCreation(o,[t.rect.x,t.rect.y])}function le(t,w,e){e.kill_list.includes(w)||Q(t,w,e)}function ae(t,w,e){let s=t.lastrect,o=z(w.orientation);t.physics.activeMovement(t,o,w.strength||1),t.lastrect=s}function ce(t,w,e){if(!ue(t,e,"t_lastpull"))return;let s=t.lastrect,o=w.lastdirection,r=Math.abs(o.x)+Math.abs(o.y)>0?z(o):{x:1,y:0};t._updatePosition(r,(w.speed||1)*t.physics.gridsize[0]),t.lastrect=s}function he(t,w,e){let s=e.sprite_registry.withStype(w.stype||w.key);if(s.length>0){let o=s[Math.floor(e.randomGenerator.random()*s.length)];t.rect=o.rect.copy()}t.lastmove=0}function pe(t,w,e,{exhaustStype:s=null}={}){if(t.lastrect.colliderect(w.rect))return;let o=e.sprite_registry.group(w.key).filter(r=>r!==w);if(o.length===0)return;let i=o[Math.floor(e.randomGenerator.random()*o.length)];t.rect=i.rect.copy(),t.lastrect=i.rect.copy(),t.lastmove=0,s&&(hw(w,t,e,{stype:s}),hw(i,t,e,{stype:s}))}function fe(t,w,e,{friction:s=0}={}){ue(t,e,"t_lastbounce")&&(t.speed!==null&&(t.speed*=1-s),bw(t,w,e),t.orientation!==void 0&&(Math.abs(t.rect.centerx-w.rect.centerx)>Math.abs(t.rect.centery-w.rect.centery)?t.orientation={x:-t.orientation.x,y:t.orientation.y}:t.orientation={x:t.orientation.x,y:-t.orientation.y}))}function me(t,w,e,{friction:s=0}={}){if(bw(t,w,e),t.orientation!==void 0){let o=t.orientation,i=z({x:-t.rect.centerx+w.rect.centerx,y:-t.rect.centery+w.rect.centery}),r=i.x*o.x+i.y*o.y;t.orientation={x:-2*r*i.x+o.x,y:-2*r*i.y+o.y},t.speed!==null&&(t.speed*=1-s)}}function ue(t,w,e){return e in t._effect_data&&t._effect_data[e]===w.time?!1:(t._effect_data[e]=w.time,!0)}var pw=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},Jw=class extends pw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},Vw=class extends pw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},Zw=class extends pw{constructor(w={}){let{win:e=!0,scoreChange:s=0,limit:o=0,...i}=w;super({win:e,scoreChange:s}),this.limit=o,this.stypes=[];for(let[r,l]of Object.entries(i))r.startsWith("stype")&&this.stypes.push(l)}isDone(w){let e=0;for(let s of this.stypes)e+=w.numSprites(s);return e===this.limit?[!0,this.win]:[!1,null]}},wt=class extends pw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var tt=class t{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,s,o){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=s,this.stypes[w]=o,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),s=(this._deadSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),o=e.concat(s);return o.length>0?Math.max(...o)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:s,args:o,stypes:i}=this.getSpriteDef(w),r=e.id||this.generateId(w),l={...o,...e,key:w,id:r},a=new s(l);return a.stypes=i,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[r]=a,a}killSprite(w){w.alive=!1;let e=w.key,s=this._liveSpritesByKey[e];if(s){let o=s.indexOf(w);o!==-1&&(s.splice(o,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let s=this._liveSpritesByKey[w]||[];if(!e)return s;let o=this._deadSpritesByKey[w]||[];return s.concat(o)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let s=this._liveSpritesByKey[e]||[],o=this._deadSpritesByKey[e]||[];yield[e,s.concat(o)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let s=this._liveSpritesByKey[e]||[];for(let o of s)yield o}}spritesArray(){let w=[];for(let e of this.spriteKeys){let s=this._liveSpritesByKey[e]||[];for(let o of s)w.push(o)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let s=[];for(let o of this.spriteKeys)if(this.stypes[o]&&this.stypes[o].includes(w)){let i=e?(this._liveSpritesByKey[o]||[]).concat(this._deadSpritesByKey[o]||[]):this._liveSpritesByKey[o]||[];s.push(...i)}return s}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new t;w.classes={...this.classes},w.classArgs={};for(let[e,s]of Object.entries(this.classArgs))w.classArgs[e]={...s};w.stypes={};for(let[e,s]of Object.entries(this.stypes))w.stypes[e]=[...s];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var kt=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},bt=class{constructor(w,e,{scoreChange:s=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=s,this.is_stochastic=!1}call(w,e,s){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Ew=class extends bt{constructor(w,e,s,o={}){let i=o.scoreChange||0;super(e,s,{scoreChange:i}),this.callFn=w;let{scoreChange:r,...l}=o;this.fnArgs=l,this._name=w.name||"anonymous"}call(w,e,s){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,s,this.fnArgs):this.callFn(w,e,s)}get name(){return this._name}},fw=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:s}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof C||e===C){let o=w;s.res_type&&(o=s.res_type),s.color&&(this.resources_colors[o]=s.color),s.limit!==void 0&&(this.resources_limits[o]=s.limit),this.notable_resources.push(o)}}buildLevel(w){let e=w.split(`
`).filter(l=>l.length>0),s=e.map(l=>l.length),o=Math.min(...s),i=Math.max(...s);if(o!==i)throw new Error(`Inconsistent line lengths: min=${o}, max=${i}`);let r=new Et(this,this.domain_registry.deepCopy(),w,s[0],e.length,this.seed);for(let l=0;l<e.length;l++)for(let a=0;a<e[l].length;a++){let n=e[l][a],h=this.char_mapping[n];if(h){let p=[a*this.block_size,l*this.block_size];r.createSprites(h,p)}}return r.initState=r.getGameState(),r}},Et=class{constructor(w,e,s,o,i,r=0){this.domain=w,this.sprite_registry=e,this.levelstring=s,this.width=o,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=r,this.randomGenerator=new kt(r),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new rw(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,s){let o=this.sprite_registry.createSprite(w,{pos:e,id:s,size:[this.block_size,this.block_size],rng:this.randomGenerator});return o&&(this.is_stochastic=this.domain.is_stochastic||o.is_stochastic||this.is_stochastic),o}createSprites(w,e){return w.map(s=>this.createSprite(s,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,s){return this.create_list.push([w,e,s]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let a of e)a.just_pushed=null;for(let a of e)a.update(this);this.events_triggered=[];let[s,o,i]=this._moveEventHandling(),[r,l]=this._eventHandling(s);this.events_triggered=o.concat(r);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,n,h]of this.create_list)this.createSprite(a,n,h);for(let[a,n,h]of this.resource_changes){let p=this.domain.resources_limits&&this.domain.resources_limits[n]||1/0;a.resources[n]=Math.max(0,Math.min(a.resources[n]+h,p))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],s={},o=this.domain.collision_eff.filter(r=>r.name==="stepBack"||r.name==="stepBackIfHasLess");for(let r of o){let[,l,a]=this._applyEffect(r,s);w.push(...l),e.push(...a)}let i=this.domain.collision_eff.filter(r=>["bounceForward","reverseDirection","turnAround"].includes(r.name));for(let r of i){let[,l,a]=this._applyEffect(r,s);w.push(...l),e.push(...a)}for(let r of o){let[,l,a]=this._applyEffect(r,s);w.push(...l),e.push(...a)}return[s,w,e]}_eventHandling(w){let e=[],s=[],o=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of o){let[,r,l]=this._applyEffect(i,w);e.push(...r),s.push(...l)}return[e,s]}_applyEffect(w,e){let s=[],o=[],i=w.actor_stype,r=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),r!=="EOS"&&!(r in e)&&(e[r]=this.sprite_registry.withStype(r)),r==="EOS"){let h=e[i];for(let p=h.length-1;p>=0;p--){let c=h[p];this.containsRect(c.rect)||(this.addScore(w.score),w.call(c,null,this),s.push([w.name,c.id,"EOS"]),o.push([w.name,c.key,"EOS",[c.rect.x,c.rect.y],[null,null]]),!this.containsRect(c.rect)&&c.alive&&this.killSprite(c))}return[e,s,o]}let l=e[i],a=e[r];if(l.length===0||a.length===0)return[e,s,o];let n=!1;l.length>a.length&&([l,a]=[a,l],n=!0);for(let h of l)for(let p of a)h!==p&&h.rect.colliderect(p.rect)&&(n?this.kill_list.includes(p)||(this.addScore(w.score),w.call(p,h,this),s.push([w.name,p.id,h.id]),o.push([w.name,p.key,h.key,[p.rect.x,p.rect.y],[h.rect.x,h.rect.y]])):this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,p,this),s.push([w.name,h.id,p.id]),o.push([w.name,h.key,p.key,[h.rect.x,h.rect.y],[p.rect.x,p.rect.y]])));return[e,s,o]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,s]=w.isDone(this);if(this.ended=e,this.won=s===null?!1:s,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let s=this.sprite_registry._liveSpritesByKey[e]||[],o=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...s,...o].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,s]of Object.entries(w.sprites))for(let o of s){let i=this.sprite_registry.createSprite(e,{id:o.id,pos:[o.x,o.y],size:[o.w,o.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...o.resources},{get(r,l){return typeof l=="string"&&!(l in r)&&l!=="toJSON"&&l!=="then"&&l!==Symbol.toPrimitive&&l!==Symbol.toStringTag&&l!=="inspect"&&l!=="constructor"&&l!=="__proto__"?0:r[l]},set(r,l,a){return r[l]=a,!0}}),o.speed!==void 0&&(i.speed=o.speed),o.cooldown!==void 0&&(i.cooldown=o.cooldown),o.orientation&&(i.orientation={...o.orientation}),o._age!==void 0&&(i._age=o._age),o.lastmove!==void 0&&(i.lastmove=o.lastmove),i.alive=o.alive,o.alive||this.sprite_registry.killSprite(i))}}};function de(){m.register("VGDLSprite",I),m.register("Immovable",Hw),m.register("Passive",Fw),m.register("Resource",C),m.register("ResourcePack",Kw),m.register("Flicker",gw),m.register("OrientedFlicker",yw),m.register("OrientedSprite",V),m.register("Missile",Sw),m.register("SpawnPoint",cw),m.register("SpriteProducer",aw),m.register("Portal",Uw),m.register("RandomNPC",vw),m.register("Chaser",xw),m.register("Fleeing",Ww),m.register("Bomber",zw),m.register("Walker",Yw),m.register("Conveyor",$w),m.register("Spreader",jw),m.register("Immutable",Dw),m.register("MovingAvatar",kw),m.register("OrientedAvatar",Z),m.register("ShootAvatar",Qw),m.register("HorizontalAvatar",ww),m.register("FlakAvatar",qw),m.register("killSprite",Q),m.register("killBoth",zt),m.register("cloneSprite",Yt),m.register("transformTo",hw),m.register("stepBack",bw),m.register("stepBackIfHasLess",$t),m.register("undoAll",jt),m.register("bounceForward",Qt),m.register("catapultForward",qt),m.register("reverseDirection",xt),m.register("turnAround",Xt),m.register("flipDirection",Jt),m.register("wrapAround",Vt),m.register("collectResource",Zt),m.register("changeResource",we),m.register("addResource",te),m.register("removeResource",ee),m.register("killIfOtherHasMore",se),m.register("killIfHasMore",oe),m.register("killIfOtherHasLess",ie),m.register("killIfHasLess",re),m.register("spawnIfHasMore",ne),m.register("killIfAlive",le),m.register("conveySprite",ae),m.register("pullWithIt",ce),m.register("teleportToExit",he),m.register("teleportToOther",pe),m.register("wallBounce",fe),m.register("bounceDirection",me),m.register("Timeout",Jw),m.register("SpriteCounter",Vw),m.register("MultiSpriteCounter",Zw),m.register("ResourceCounter",wt),m.register("GridPhysics",lw),m.register("BasicGame",fw);for(let[t,w]of Object.entries(Nw))m.register(t,w);m.register("UP",gt),m.register("DOWN",St),m.register("LEFT",uw),m.register("RIGHT",W)}var et=class{constructor(w,e,s=null){this.children=[],this.content=w,this.indent=e,this.parent=null,s&&s.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function _s(t,w=8){t=t.replace(/\t/g," ".repeat(w));let e=t.split(`
`),s=new et("",-1);for(let o of e){o.includes("#")&&(o=o.split("#")[0]);let i=o.trim();if(i.length>0){let r=o.length-o.trimStart().length;s=new et(i,r,s)}}return s.getRoot()}var st=class{constructor(){this.verbose=!1}parseGame(w,e={}){let s=w;typeof s=="string"&&(s=_s(s).children[0]);let[o,i]=this._parseArgs(s.content);Object.assign(i,e),this.spriteRegistry=new tt,this.game=new fw(this.spriteRegistry,i);for(let r of s.children)r.content.startsWith("SpriteSet")&&this.parseSprites(r.children),r.content==="InteractionSet"&&this.parseInteractions(r.children),r.content==="LevelMapping"&&this.parseMappings(r.children),r.content==="TerminationSet"&&this.parseTerminations(r.children);return this.game.finishSetup(),this.game}_eval(w){if(m.has(w))return m.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,s=null){s||(s={});let o=w.split(/\s+/).filter(i=>i.length>0);if(o.length===0)return[e,s];o[0].includes("=")||(e=this._eval(o[0]),o.shift());for(let i of o){let r=i.indexOf("=");if(r===-1)continue;let l=i.substring(0,r),a=i.substring(r+1);s[l]=this._eval(a)}return[e,s]}parseSprites(w,e=null,s={},o=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[r,l]=i.content.split(">").map(p=>p.trim()),[a,n]=this._parseArgs(l,e,{...s}),h=[...o,r];if("singleton"in n&&(n.singleton===!0&&this.spriteRegistry.registerSingleton(r),delete n.singleton),i.children.length===0){this.verbose&&console.log("Defining:",r,a,n,h),this.spriteRegistry.registerSpriteClass(r,a,n,h);let p=this.game.sprite_order.indexOf(r);p!==-1&&this.game.sprite_order.splice(p,1),this.game.sprite_order.push(r)}else this.parseSprites(i.children,a,n,h)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[s,o]=e.content.split(">").map(a=>a.trim()),[i,r]=this._parseArgs(o),l=s.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<l.length;a++){let n=l[0],h=l[a],p;if(typeof i=="function"&&!i.prototype)p=new Ew(i,n,h,r);else if(typeof i=="function")p=new Ew(i,n,h,r);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(p)}}}parseTerminations(w){for(let e of w){let[s,o]=this._parseArgs(e.content);this.game.terminations.push(new s(o))}}parseMappings(w){for(let e of w){let[s,o]=e.content.split(">").map(r=>r.trim());if(s.length!==1)throw new Error(`Only single character mappings allowed, got: '${s}'`);let i=o.split(/\s+/).filter(r=>r.length>0);this.game.char_mapping[s]=i}}};var ot=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,s=this.cellSize/e;for(let o of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[o]||[];for(let r of i)this._drawSprite(r,s,e)}this._drawHUD(w)}_drawSprite(w,e,s){let o=w.rect.x*e,i=w.rect.y*e,r=w.rect.w*e,l=w.rect.h*e,a=null,n=null;if(w.img){let g=this._parseImg(w.img);a=g.color,n=g.shape}a||(a=w.color),a||(a=[128,128,128]);let h=w.shrinkfactor||0,p=o+r*h/2,c=i+l*h/2,d=r*(1-h),f=l*(1-h);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,n?this._drawShape(n,p,c,d,f):this.ctx.fillRect(p,c,d,f),w.orientation&&w.draw_arrow&&this._drawArrow(p,c,d,f,w.orientation,a),w.is_avatar&&this._drawResources(w,p,c,d,f)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let s=w.split("/")[1];return{color:e[s]||null,shape:null}}if(w.startsWith("colored_shapes/")){let s=w.split("/")[1],o=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of o)if(s.endsWith("_"+i)){let r=s.slice(0,-(i.length+1));return{color:e[r]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,s,o,i){let r=this.ctx,l=e+o/2,a=s+i/2,n=o/2,h=i/2,p=2/24,c=n*(1-2*p),d=h*(1-2*p);switch(r.beginPath(),w){case"CIRCLE":r.ellipse(l,a,c,d,0,0,Math.PI*2);break;case"TRIANGLE":{let f=a-d,g=a+d,x=l-c,S=l+c;r.moveTo(l,f),r.lineTo(S,g),r.lineTo(x,g),r.closePath();break}case"DIAMOND":r.moveTo(l,a-d),r.lineTo(l+c,a),r.lineTo(l,a+d),r.lineTo(l-c,a),r.closePath();break;case"STAR":{let f=Math.min(c,d),g=f*.4;for(let x=0;x<5;x++){let S=-Math.PI/2+x*(2*Math.PI/5),E=S+Math.PI/5;x===0?r.moveTo(l+f*Math.cos(S),a+f*Math.sin(S)):r.lineTo(l+f*Math.cos(S),a+f*Math.sin(S)),r.lineTo(l+g*Math.cos(E),a+g*Math.sin(E))}r.closePath();break}case"CROSS":{let f=c*2/3,g=f/2;r.rect(l-c,a-g,c*2,f),r.rect(l-g,a-d,f,d*2);break}case"HEXAGON":{let f=Math.min(c,d);for(let g=0;g<6;g++){let x=Math.PI/6+g*(Math.PI/3),S=l+f*Math.cos(x),E=a+f*Math.sin(x);g===0?r.moveTo(S,E):r.lineTo(S,E)}r.closePath();break}case"SQUARE":{let f=Math.min(c,d)*.05;r.rect(l-c+f,a-d+f,(c-f)*2,(d-f)*2);break}case"PENTAGON":{let f=Math.min(c,d);for(let g=0;g<5;g++){let x=-Math.PI/2+g*(2*Math.PI/5),S=l+f*Math.cos(x),E=a+f*Math.sin(x);g===0?r.moveTo(S,E):r.lineTo(S,E)}r.closePath();break}default:r.rect(e,s,o,i)}r.fill()}_drawArrow(w,e,s,o,i,r){let l=w+s/2,a=e+o/2,n=Math.min(s,o)*.3,h=[r[0],255-r[1],r[2]];this.ctx.strokeStyle=`rgb(${h[0]}, ${h[1]}, ${h[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(l,a),this.ctx.lineTo(l+i.x*n,a+i.y*n),this.ctx.stroke()}_drawResources(w,e,s,o,i){let r=w.resources,l=0,a=3;for(let n of Object.keys(r)){if(n==="toJSON")continue;let h=r[n];if(h>0){let p=s+i+l*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,p,o*Math.min(h/5,1),a),l++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var it={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var ge=["#1b6ec2","#2b9a3e","#d42020"];function ye(t){return ge[Math.min(t,ge.length-1)]}function ve(t,w){if(w<=1)return 0;let e=w/3;return t<e?0:t<2*e?1:2}function xe(t){let w=[],e=[],s=!1,o=null;for(let h=0;h<t.length;h++){let p=t[h].response||{},d=(p.rationale||p.scratchpad||p.reasoning||"").length;w.push(d),d>0&&(s=!0);let f=t[h].level;o!==null&&f!==o&&e.push(h),o=f}let i=w.filter(h=>h>0),r=null,l=0,a=0,n=1;if(i.length>0){let h=Math.min(...i),p=Math.max(...i);a=Math.log10(h);let d=Math.log10(p)-a;l=d>0?Math.min(25,Math.max(5,Math.ceil(Math.sqrt(i.length)))):1,n=d>0?d/l:1,r=w.map(f=>{if(f<=0)return-1;let g=Math.floor((Math.log10(f)-a)/n);return g>=l&&(g=l-1),g<0&&(g=0),g})}return{lengths:w,levelBoundaries:e,hasAny:s,binAssignments:r,binCount:l,logMin:a,logBinWidth:n}}function Se(t,w){if(t===0)return 0;let e=Math.floor(Math.log10(t)),s=t/Math.pow(10,e),o;return w?s<1.5?o=1:s<3?o=2:s<7?o=5:o=10:s<=1?o=1:s<=2?o=2:s<=5?o=5:o=10,o*Math.pow(10,e)}function rt(t,w,e){if(w<=t)return[t];let s=Se(w-t,!1),o=Se(s/Math.max(e-1,1),!0);if(o===0)return[t];let i=Math.floor(t/o)*o,r=Math.ceil(w/o)*o,l=[];for(let a=i;a<=r+o*.5;a+=o)l.push(Math.round(a));return l}function ke(t){let w=t.getBoundingClientRect(),e=window.devicePixelRatio||1,s=w.width,o=w.height;t.width=s*e,t.height=o*e;let i=t.getContext("2d");return i.scale(e,e),{ctx:i,w:s,h:o}}function At(t,w){let e=[],s=Math.floor(Math.log10(Math.max(1,t))),o=Math.ceil(Math.log10(Math.max(1,w)));for(let i=s;i<=o;i++)for(let r of[1,2,5]){let l=r*Math.pow(10,i);l>=t&&l<=w&&e.push(l)}return e}function be(t,w,e={}){let{logX:s=!1,logY:o=!1}=e,{lengths:i,binAssignments:r,binCount:l,logMin:a}=w,{ctx:n,w:h,h:p}=ke(t),c={top:20,right:8,bottom:46,left:52},d=h-c.left-c.right,f=p-c.top-c.bottom;n.clearRect(0,0,h,p);let g=i.filter(u=>u>0),x=i.length-g.length;if(g.length===0){n.fillStyle="#999",n.font="12px monospace",n.textAlign="center",n.fillText("No reasoning data",h/2,p/2);return}let S=Math.min(...g),E=Math.max(...g),O=Math.log10(E)-a,L;if(s){L=new Array(l).fill(0);for(let u of r)u>=0&&L[u]++}else{L=new Array(l).fill(0);let u=E-S;if(u===0)L[0]=g.length;else for(let y of g){let N=Math.floor((y-S)/u*l);N>=l&&(N=l-1),L[N]++}}let J=Math.max(...L);if(J===0)return;let mw=o&&J>1,K=mw?Math.log10(J):1;function U(u){return mw?u<=0?0:Math.log10(u)/K:u/J}n.strokeStyle="#ccc",n.lineWidth=1,n.font="10px monospace",n.textBaseline="middle",n.textAlign="right",n.fillStyle="#666";let ct=mw?At(1,J):rt(0,J,5);for(let u of ct){let y=c.top+f*(1-U(u));y<c.top-1||y>c.top+f+1||(n.beginPath(),n.moveTo(c.left,y),n.lineTo(c.left+d,y),n.stroke(),n.fillText(String(u),c.left-4,y))}let Bw=1,j=Math.max(1,(d-Bw*(l-1))/l);for(let u=0;u<l;u++){let y=U(L[u])*f,N=c.left+u*(j+Bw),Mw=c.top+f-y;n.fillStyle=ye(ve(u,l)),n.fillRect(N,Mw,j,y)}if(n.textAlign="center",n.textBaseline="top",n.fillStyle="#666",s)if(O>0)for(let u of At(S,E)){let y=(Math.log10(u)-a)/O;n.fillText(String(u),c.left+y*d,c.top+f+4)}else n.fillText(String(S),c.left+d/2,c.top+f+4);else{let u=E-S;if(u>0)for(let y of rt(S,E,5)){let N=(y-S)/u;n.fillText(String(y),c.left+N*d,c.top+f+4)}else n.fillText(String(S),c.left+d/2,c.top+f+4)}n.strokeStyle="#999",n.lineWidth=1,n.beginPath(),n.moveTo(c.left,c.top),n.lineTo(c.left,c.top+f),n.lineTo(c.left+d,c.top+f),n.stroke(),x>0&&(n.fillStyle="#999",n.font="9px monospace",n.textAlign="right",n.textBaseline="top",n.fillText(x+" empty",h-c.right,2)),n.font="10px monospace",n.fillStyle="#888",n.textAlign="center",n.textBaseline="bottom",n.fillText("Reasoning length (chars)",c.left+d/2,p-2),n.save(),n.translate(12,c.top+f/2),n.rotate(-Math.PI/2),n.textAlign="center",n.textBaseline="middle",n.fillText("Count",0,0),n.restore()}var Aw={top:16,right:12,bottom:40,left:52};function Ee(t,w,e,s={}){let{logY:o=!1}=s,{lengths:i,levelBoundaries:r,binAssignments:l,binCount:a}=w,{ctx:n,w:h,h:p}=ke(t),c=Aw,d=h-c.left-c.right,f=p-c.top-c.bottom;n.clearRect(0,0,h,p);let g=i.length;if(g===0)return;let x=Math.max(...i),S=x>0?x:1,E=i.filter(u=>u>0),O=o&&x>1&&E.length>0,L=O?Math.log10(Math.min(...E)):0,mw=(O?Math.log10(x):1)-L||1;function K(u){return c.left+(g>1?u/(g-1)*d:d/2)}function U(u){return O?u<=0?c.top+f:c.top+f-(Math.log10(u)-L)/mw*f:c.top+f-u/S*f}n.font="10px monospace",n.strokeStyle="#eee",n.lineWidth=1;let ct=O?At(Math.min(...E),x):rt(0,S,5);n.textAlign="right",n.textBaseline="middle",n.fillStyle="#666";for(let u of ct){let y=U(u);y<c.top-1||y>c.top+f+1||(n.beginPath(),n.moveTo(c.left,y),n.lineTo(c.left+d,y),n.stroke(),n.fillText(String(u),c.left-4,y))}let Bw=rt(0,g-1,7);n.textAlign="center",n.textBaseline="top";for(let u of Bw){if(u<0||u>=g)continue;let y=K(u);n.beginPath(),n.moveTo(y,c.top),n.lineTo(y,c.top+f),n.stroke(),n.fillText(String(u+1),y,c.top+f+4)}if(n.strokeStyle="#999",n.lineWidth=1,n.beginPath(),n.moveTo(c.left,c.top),n.lineTo(c.left,c.top+f),n.lineTo(c.left+d,c.top+f),n.stroke(),r.length>0){n.save(),n.setLineDash([4,4]),n.strokeStyle="#bbb",n.lineWidth=1;for(let u of r){let y=K(u);n.beginPath(),n.moveTo(y,c.top),n.lineTo(y,c.top+f),n.stroke()}n.restore()}if(n.lineWidth=1.5,l&&g>1)for(let u=0;u<g-1;u++){if(O&&(i[u]<=0||i[u+1]<=0))continue;let y=l[u+1];n.strokeStyle=y>=0?ye(ve(y,a)):"#ccc",n.beginPath(),n.moveTo(K(u),U(i[u])),n.lineTo(K(u+1),U(i[u+1])),n.stroke()}else{n.strokeStyle="#888",n.beginPath();let u=!1;for(let y=0;y<g;y++){if(O&&i[y]<=0){u=!1;continue}u?n.lineTo(K(y),U(i[y])):(n.moveTo(K(y),U(i[y])),u=!0)}n.stroke()}let j=Math.min(e,g-1);if(j>=0){let u=K(j);n.strokeStyle="rgba(204, 68, 68, 0.25)",n.lineWidth=1,n.beginPath(),n.moveTo(u,c.top),n.lineTo(u,c.top+f),n.stroke();let y=U(i[j]);n.fillStyle="#cc4444",n.beginPath(),n.arc(u,y,4,0,Math.PI*2),n.fill(),n.fillStyle="#cc4444",n.font="bold 10px monospace",n.textAlign="left",n.textBaseline="bottom";let N=u+6,Mw=y-4;N+40>h?(n.textAlign="right",n.fillText(String(i[j]),u-6,Mw)):n.fillText(String(i[j]),N,Mw)}n.font="10px monospace",n.fillStyle="#888",n.textAlign="center",n.textBaseline="bottom",n.fillText("Step",c.left+d/2,p-2),n.save(),n.translate(12,c.top+f/2),n.rotate(-Math.PI/2),n.textAlign="center",n.textBaseline="middle",n.fillText("Reasoning length (chars)",0,0),n.restore()}function _t(t){if(!t.delta_encoded)return;let w=t.states;if(!w||w.length<2){delete t.delta_encoded;return}let e=w[0].sprites;for(let s=1;s<w.length;s++){if(!("sprites"in w[s]))w[s].sprites=Object.assign({},e);else{let o=Object.assign({},e,w[s].sprites);for(let i in o)o[i]===null&&delete o[i];w[s].sprites=o}e=w[s].sprites}delete t.delta_encoded}var It=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";de();function k(t,w,e){if(t==null||t[w]===void 0)throw new Error(`[replay-viewer] missing required field '${w}' in ${e}. Check the Python pipeline did not drop it.`);return t[w]}var B=null,R=[],v=[],A=0,_=null,Ae=null,Lt=null,ew=null,_e=20,Is=!1,iw=null,Rt=null,ze=null,sw=null,Y=-1,tw=[],_w=-1,Ie=null,M=null,Tw=!1,lt=!1,Ye=[],G=!1,$=0,Ow=[],Bt=[],Lw=[],$e=null,H=document.getElementById("file-drop-zone"),X=document.getElementById("replay-loading"),je=document.getElementById("loading-label"),Qe=document.getElementById("loading-detail"),Ts=document.getElementById("loading-fallback-link"),qe=document.getElementById("file-input"),Os=document.getElementById("replay-container"),Ls=document.getElementById("game-canvas"),Mt=new ot(Ls,30),Rs=document.getElementById("btn-step-back"),Bs=document.getElementById("btn-reset"),Ht=document.getElementById("btn-play-pause"),Ms=document.getElementById("btn-step-fwd"),Tt=document.getElementById("step-label"),Xe=document.getElementById("speed-select"),ow=document.getElementById("step-scrubber"),at=document.getElementById("metadata-panel"),Ft=document.getElementById("metadata-json"),Je=document.getElementById("metadata-tab-summary"),Ve=document.getElementById("metadata-tab-json"),Iw=document.getElementById("metadata-copy-btn"),q=document.getElementById("action-log"),P=document.getElementById("btn-share"),Te=document.getElementById("reasoning-charts"),Cs=document.getElementById("chart-histogram"),Ct=document.getElementById("chart-line"),Oe=document.getElementById("chart-log-x"),Le=document.getElementById("chart-log-y"),Ps=document.getElementById("multi-turn-layout"),D=document.getElementById("conversation-content"),Pt=document.getElementById("flap-tab-desc"),Gt=document.getElementById("flap-tab-level"),Re=document.getElementById("flap-panel-desc"),Be=document.getElementById("flap-panel-level"),Gs=document.getElementById("game-desc"),Ns=document.getElementById("level-text"),Ze={up:document.getElementById("dpad-up"),down:document.getElementById("dpad-down"),left:document.getElementById("dpad-left"),right:document.getElementById("dpad-right"),action:document.getElementById("dpad-space")},Ds=Object.values(Ze),Ot=null;function ws(t){if(Ot===t){Ot=null,Pt.classList.remove("active"),Gt.classList.remove("active"),Re.classList.remove("open"),Be.classList.remove("open");return}Ot=t,Pt.classList.toggle("active",t==="desc"),Gt.classList.toggle("active",t==="level"),Re.classList.toggle("open",t==="desc"),Be.classList.toggle("open",t==="level")}Pt.addEventListener("click",()=>ws("desc"));Gt.addEventListener("click",()=>ws("level"));H.addEventListener("click",()=>{qe.click()});qe.addEventListener("change",t=>{t.target.files.length>0&&ts(t.target.files[0])});H.addEventListener("dragover",t=>{t.preventDefault(),H.classList.add("dragover")});H.addEventListener("dragleave",()=>{H.classList.remove("dragover")});H.addEventListener("drop",t=>{t.preventDefault(),H.classList.remove("dragover"),t.dataTransfer.files.length>0&&ts(t.dataTransfer.files[0])});async function ts(t){Rt=t,ze=t.name,iw=null;let w;if(t.name.endsWith(".gz")){let s=new DecompressionStream("gzip"),o=t.stream().pipeThrough(s);w=await new Response(o).text()}else w=await t.text();let e=JSON.parse(w);_t(e),es(e)}function Hs(t,w,e){if(t.length>0&&t[0].state_index!==void 0){let r=[];for(let l=0;l<t.length;l++)r.push(t[l].state_index);return r.push(w-1),r}let o=[],i=0;for(let r=0;r<t.length;r++){if(r>0){let l=t[r-1],a=t[r];(a.level!==l.level||a.attempt!==l.attempt)&&i++}o.push(r+i)}return o.push(t.length+i),o}function Fs(t,w){let e=new Array(w).fill(-1),s=[],o=new Array(w).fill(-1);for(let r=0;r<t.length;r++){let l=t[r].state_index;e[l]=r,s.push(l)}let i=-1;for(let r=0;r<w;r++)e[r]>=0&&(i=e[r]),o[r]=i;return{frameToStepMap:e,stepToFrameMap:s,lastActionStepForFrame:o}}function es(t){if(!t.states||!Array.isArray(t.states)){alert('Invalid replay file: missing "states" array. Run export_replay first.');return}if(!t.game||!it[t.game]){alert("Unknown game: "+(t.game||"(none)")+". Not found in GAMES registry.");return}if(B=t,R=t.states,v=t.steps||[],Ye=Hs(v,R.length,t.source),G=v.length>0&&v[0].state_index!==void 0&&R.length>v.length,G){$=R.length;let o=Fs(v,R.length);Ow=o.frameToStepMap,Bt=o.stepToFrameMap,Lw=o.lastActionStepForFrame}else $=0,Ow=[],Bt=[],Lw=[];Is=!!(t.meta&&t.meta.persistent),Ps.style.display="flex",H.style.display="none",X.style.display="none",X.classList.remove("error"),Os.classList.add("visible"),P.style.display="inline-block",qs(),ow.min=0,ow.max=G?$-1:v.length,ow.value=0,Ys(),M=xe(v),M.hasAny?(Te.classList.add("visible"),Rw(0)):Te.classList.remove("visible"),Y=-1;let e=it[B.game],s=t.game_description||e.description;$e=s,Gs.value=s,Lt=null,F(0)}function Me(t){if(Lt===t)return;let w=it[B.game];Ae=new st().parseGame($e||w.description);let s=w.levels[t];if(!s){console.error("Level",t,"not found for game",B.game);return}_=Ae.buildLevel(s),Lt=t,Ns.value=s,Mt.resize(_.width,_.height)}function Ce(t,w){let e={};for(let[s,o]of Object.entries(t.sprites))e[s]=o.map(i=>({id:i.id,key:i.key,x:i.col*w,y:i.row*w,w,h:w,alive:i.alive,resources:i.resources||{},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation,_age:i._age,lastmove:i.lastmove}));return{score:t.score,time:t.time,sprites:e}}function F(t){if(G){t<0&&(t=0),t>=$&&(t=$-1),A=t;let a=Lw[t],n;if(a>=0?n=v[a].level!==void 0?v[a].level:B.start_level||0:n=v.length>0&&v[0].level!==void 0?v[0].level:B.start_level||0,Me(n),t<0||t>=R.length)return;let h=R[t],p=_.block_size,c=Ce(h,p);_.setGameState(c);let d=`states[${t}] (frame mode)`;if(_.ended=k(h,"ended",d),_.won=k(h,"won",d),_.lose=k(h,"lose",d),_.timeout=k(h,"timeout",d),_.score=k(h,"score",d),_.time=t,Mt.render(_),Pe(),Ge(),He(),Fe(),ow.value=t,Dt(),M&&M.hasAny){let f=a>=0?a:0;Rw(f)}return}let w=v.length;t<0&&(t=0),t>w&&(t=w),A=t;let e;if(t<v.length)e=v[t].level!==void 0?v[t].level:B.start_level||0;else{let a=v[v.length-1];e=a.level!==void 0?a.level:B.start_level||0}Me(e);let s=Ye[t];if(s<0||s>=R.length)return;let o=R[s],i=_.block_size,r=Ce(o,i);_.setGameState(r);let l=`states[${s}] (step mode)`;_.ended=k(o,"ended",l),_.won=k(o,"won",l),_.lose=k(o,"lose",l),_.timeout=k(o,"timeout",l),_.score=k(o,"score",l),_.time=s,Mt.render(_),Pe(),Ge(),He(),Fe(),ow.value=t,Dt(),M&&M.hasAny&&Rw(A)}function Kt(){F(A+1)}function ss(){F(A-1)}function os(){ew!==null?T():is()}function is(){ew===null&&(Ht.textContent="Pause",_e=Number(Xe.value)||20,ew=setInterval(()=>{let t=G?$-1:v.length;if(A>=t){T();return}Kt()},1e3/_e))}function T(){ew!==null&&(clearInterval(ew),ew=null),Ht.textContent="Play"}function Pe(){if(G){let w=A,e=Lw[w],s=Ow[w]>=0,o=e>=0?v[e]:null,i=o&&o.level!==void 0?o.level:"?",r=o&&o.attempt!==void 0?o.attempt:"?",l=s?"ACTION":"NO-OP";Tt.textContent="Frame "+(w+1)+" / "+$+" ["+l+"] (L"+i+" A"+r+")";return}let t=v.length;if(A>=t)Tt.textContent="Final / "+t+" steps";else{let w=v[A],e=w.level!==void 0?w.level:"?",s=w.attempt!==void 0?w.attempt:"?";Tt.textContent="Step "+(A+1)+" / "+t+" (L"+e+" A"+s+")"}}function Ge(){Ws()}function Ks(t,w){let e=t[w];if(e.user_prompt!==void 0)return e.user_prompt;let s=`steps[${w}]`,o=k(e,"step",s),i=k(e,"level",s),r=k(e,"attempt",s),l=[];return Us(l,t,w,i,r),l.push("# Step "+o+" (Level "+i+", Attempt "+r+")"),l.push(""),l.push(k(e,"formatted_obs",s)),l.join(`
`)}function Us(t,w,e,s,o){let i=null,r=-1;for(let c=e-1;c>=0;c--){let d=w[c];if(!k(d,"action",`steps[${c}]`).startsWith("_")){i=d,r=c;break}}if(i===null)return;let l=`steps[${r}]`,a=k(i,"level",l),n=k(i,"attempt",l);if(a===s&&n===o)return;let h="";k(i,"won",l)?h="won":k(i,"lose",l)?h="died":k(i,"timeout",l)&&(h="timeout");let p=0;for(let c=r;c>=0;c--){let d=w[c];if(k(d,"action",`steps[${c}]`).startsWith("_"))continue;let g=k(d,"level",`steps[${c}]`),x=k(d,"attempt",`steps[${c}]`);if(g===a&&x===n)p+=k(d,"reward",`steps[${c}]`);else break}h&&(t.push("--- TRIAL ENDED outcome: "+h+", score: "+p+" ---"),t.push("")),t.push("--- NEW TRIAL (Level "+s+", Attempt "+o+") ---"),t.push("")}function Ws(){let t;if(G){if(t=Lw[A],t<0){De(-1);return}}else t=A<v.length?A:v.length;De(t)}function Ne(t){let w=v[t],e=document.createDocumentFragment(),s=document.createElement("div");s.className="msg msg-user";let o=document.createElement("div");o.className="msg-label",o.textContent="User (Step "+w.step+")",s.appendChild(o);let i=document.createElement("div");i.textContent=Ks(v,t),s.appendChild(i),e.appendChild(s);let r=w.response||{},l=document.createElement("div");l.className="msg msg-assistant";let a=document.createElement("div");a.className="msg-label",a.textContent="Assistant (Step "+w.step+")",l.appendChild(a);let n=[],h=r.rationale;h&&n.push(h),r.action&&n.push("Action: "+r.action);let p=document.createElement("div");return p.textContent=n.join(`

`)||"--",l.appendChild(p),e.appendChild(l),e}function Nt(t){return t&&typeof t.action=="string"&&t.action.startsWith("_")}function zs(t,w){let e=0;for(let s=t;s<=w;s++)Nt(v[s])||e++;return e}function De(t){let w=Math.min(t,v.length-1);if(Y<0){D.innerHTML="";let e=B.system_prompt;if(e){let s=document.createElement("div");s.className="msg msg-system";let o=document.createElement("div");o.className="msg-label",o.textContent="System",s.appendChild(o);let i=document.createElement("div");i.textContent=e,s.appendChild(i),D.appendChild(s)}for(let s=0;s<=w;s++)Nt(v[s])||D.appendChild(Ne(s));Y=w,D.scrollTop=D.scrollHeight;return}if(w>Y){for(let e=Y+1;e<=w;e++)Nt(v[e])||D.appendChild(Ne(e));Y=w,D.scrollTop=D.scrollHeight;return}if(w<Y){let e=zs(w+1,Y);for(let s=0;s<e*2;s++)D.removeChild(D.lastChild);Y=w}}function Ys(){if(q.innerHTML="",tw=[],_w=-1,G){let e=null,s=null;for(let o=0;o<$;o++){let i=Ow[o],r=`states[${o}]`,l=k(R[o],"level",r),a=k(R[o],"attempt",r);if(l!==e||a!==s){if(e!==null){let p=document.createElement("div");p.className="log-separator",p.textContent="--- Level "+l+", Attempt "+a+" ---",q.appendChild(p)}e=l,s=a}let n=document.createElement("div");n.className="log-entry",n.dataset.index=o;let h="[F"+(o+1)+"]";if(i>=0){let p=v[i],c=`replaySteps[${i}]`,d=k(p,"level",c),f=k(p,"attempt",c),g=k(p,"step",c),x=k(p,"action",c).toUpperCase(),S="[L"+d+" A"+f+" #"+g+"]",E=k(p,"action_log",c),O=E.indexOf(" -> "),L=O>=0?" -> "+E.substring(O+4):"";n.textContent=h+S+" "+x+L}else{let p=R[o],c=p&&p.action_log;if(c){let d=c.indexOf(" -> "),f=d>=0?c.substring(d+4):"";f&&f!=="no change"?n.textContent=h+" NO-OP -> "+f:n.textContent=h+" NO-OP"}else n.textContent=h+" NO-OP";n.classList.add("noop-entry")}n.addEventListener("click",()=>{T(),F(o)}),q.appendChild(n),tw.push(n)}return}let t=null,w=null;for(let e=0;e<v.length;e++){let s=v[e],o=`replaySteps[${e}]`,i=k(s,"level",o),r=k(s,"attempt",o);if(i!==t||r!==w){if(t!==null){let a=document.createElement("div");a.className="log-separator",a.textContent="--- Level "+i+", Attempt "+r+" ---",q.appendChild(a)}t=i,w=r}let l=document.createElement("div");l.className="log-entry",l.dataset.index=e,l.textContent=k(s,"action_log",o),l.addEventListener("click",()=>{T(),F(e)}),q.appendChild(l),tw.push(l)}}function He(){if(_w>=0&&_w<tw.length&&tw[_w].classList.remove("current-step"),A>=0&&A<tw.length){let t=tw[A];t.classList.add("current-step");let w=q.getBoundingClientRect(),e=t.getBoundingClientRect();e.top<w.top?q.scrollTop-=w.top-e.top:e.bottom>w.bottom&&(q.scrollTop+=e.bottom-w.bottom)}_w=A}function Fe(){let t=null;if(G){let e=Ow[A];e>=0&&(t=(v[e].action||"").toLowerCase())}else A<v.length&&(t=(v[A].action||"").toLowerCase());for(let e of Ds)e.classList.remove("active");let w=t?Ze[t]:null;w&&w.classList.add("active")}Rs.addEventListener("click",()=>{T(),ss()});Bs.addEventListener("click",()=>{T(),window.location.href=window.location.pathname});function rs(t){let w=t==="json";Je.classList.toggle("active",!w),Ve.classList.toggle("active",w),at.style.display=w?"none":"grid",Ft.style.display=w?"block":"none",Iw.style.display=w?"inline-block":"none"}Je.addEventListener("click",()=>rs("summary"));Ve.addEventListener("click",()=>rs("json"));Iw.addEventListener("click",async()=>{await navigator.clipboard.writeText(Ft.textContent);let t=Iw.textContent;Iw.textContent="Copied!",setTimeout(()=>{Iw.textContent=t},1500)});Ms.addEventListener("click",()=>{T(),Kt()});Ht.addEventListener("click",()=>os());Xe.addEventListener("change",()=>{ew!==null&&(T(),is())});ow.addEventListener("input",()=>{T(),F(Number(ow.value))});function Rw(t){!M||!M.hasAny||(be(Cs,M,{logX:Tw,logY:lt}),Ee(Ct,M,t??A,{logY:Tw}))}Oe.addEventListener("click",()=>{Tw=!Tw,Oe.classList.toggle("active",Tw),Rw()});Le.addEventListener("click",()=>{lt=!lt,Le.classList.toggle("active",lt),Rw()});Ct.addEventListener("click",t=>{if(!M||!M.hasAny||v.length===0)return;let w=Ct.getBoundingClientRect(),e=t.clientX-w.left,s=w.width-Aw.left-Aw.right,o=(e-Aw.left)/s,i=Math.round(o*(v.length-1));i>=0&&i<v.length&&(T(),F(G?Bt[i]:i))});document.addEventListener("keydown",t=>{let w=t.target.tagName;if(!(w==="TEXTAREA"||w==="INPUT"||w==="SELECT")&&B)switch(t.key){case"ArrowLeft":t.preventDefault(),T(),ss();break;case"ArrowRight":t.preventDefault(),T(),Kt();break;case" ":t.preventDefault(),os();break;case"Home":t.preventDefault(),T(),F(0);break;case"End":t.preventDefault(),T(),F(G?$-1:v.length);break}});function $s(t){return t==null?"--":typeof t=="boolean"?t?"yes":"no":typeof t=="number"?Number.isFinite(t)&&!Number.isInteger(t)?t.toFixed(4):String(t):typeof t=="object"?JSON.stringify(t):String(t)}var ns=new Set(["states","steps"]);function js(){let t=[];for(let[w,e]of Object.entries(B))if(!ns.has(w))if(w==="meta"&&e&&typeof e=="object"&&!Array.isArray(e))for(let[s,o]of Object.entries(e))t.push([`meta.${s}`,o]);else t.push([w,e]);return t.sort(([w],[e])=>w.localeCompare(e)),t}function Qs(){let t={};for(let[w,e]of Object.entries(B))ns.has(w)||(t[w]=e);return t}function qs(){at.innerHTML="";for(let[t,w]of js()){let e=document.createElement("span");e.className="meta-key",e.textContent=t;let s=document.createElement("span");s.className="meta-val",s.textContent=$s(w),at.appendChild(e),at.appendChild(s)}Ft.textContent=JSON.stringify(Qs(),null,2)}function Dt(){!sw&&!iw||(clearTimeout(Ie),Ie=setTimeout(function(){let t=new URLSearchParams;sw?t.set("grid-key",sw):t.set("file",iw),t.set("step",String(A)),history.replaceState(null,"","?"+t.toString())},200))}function Ke(){let t=new URLSearchParams;return sw?t.set("grid-key",sw):t.set("file",iw),t.set("step",String(A)),window.location.origin+"/replay.html?"+t.toString()}function Ue(t){P.textContent=t,P.disabled=!1,setTimeout(function(){P.textContent="Share"},2e3)}async function Xs(){if(sw||iw){let o=Ke();await navigator.clipboard.writeText(o),Ue("Link copied!");return}if(!Rt)return;P.textContent="Uploading...",P.disabled=!0;let t=await fetch("/_api/upload-url?filename="+encodeURIComponent(ze));if(!t.ok){alert("Failed to get upload URL: "+t.status+" "+t.statusText),P.textContent="Share",P.disabled=!1;return}let w=await t.json(),e=await fetch(w.uploadUrl,{method:"PUT",body:Rt});if(!e.ok){alert("Upload failed: "+e.status+" "+e.statusText),P.textContent="Share",P.disabled=!1;return}iw=w.key,Dt();let s=Ke();await navigator.clipboard.writeText(s),Ue("Link copied!")}P.addEventListener("click",Xs);function nt(t,w){H.style.display="none",X.classList.remove("error"),X.style.display="block",je.textContent=t,Qe.textContent=w||""}function We(t,w){X.classList.add("error"),X.style.display="block",je.textContent=t,Qe.textContent=w||""}Ts.addEventListener("click",function(){X.style.display="none",X.classList.remove("error"),H.style.display=""});(async function(){let t=new URLSearchParams(window.location.search),w=t.get("file"),e=t.get("url"),s=t.get("grid-key");if(!s&&!e&&!w)return;function o(a){if(!a)return"";let n=a.lastIndexOf("/");return n>=0?a.substring(n+1):a}let i,r,l="";try{s?(r=s.endsWith(".gz"),l=o(s),i=It?`${It}/${s}`:"data/"+s,nt("Downloading replay...",l)):e?(i=e,r=e.split("?")[0].endsWith(".gz"),l=o(e.split("?")[0])):(i="/"+w,r=w.endsWith(".gz"),l=o(w)),nt("Downloading replay...",l);let a=await fetch(i);if(!a.ok){We("Failed to download replay","HTTP "+a.status+" "+a.statusText);return}let n;if(r){nt("Decompressing...",l);let c=new DecompressionStream("gzip"),d=a.body.pipeThrough(c);n=await new Response(d).text()}else n=await a.text();nt("Parsing...",l);let h=JSON.parse(n);_t(h),sw=s||null,iw=w||null,es(h);let p=t.get("step");p!==null&&F(parseInt(p,10))}catch(a){We("Error loading replay",String(a)),console.error(a)}})();})();
