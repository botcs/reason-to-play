// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var Ve=class{constructor(){this._register={}}has(w){return w in this._register}register(w,t){this._register[w]=t}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[t,s]of Object.entries(w))this.register(t,s)}},u=new Ve;var gw=class e{constructor(w,t,s,o){this.x=w,this.y=t,this.w=s,this.h=o}static fromPosSize(w,t){return new e(w[0],w[1],t[0],t[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,t){return typeof w=="object"&&w!==null?new e(this.x+w.x,this.y+w.y,this.w,this.h):new e(this.x+w,this.y+t,this.w,this.h)}copy(){return new e(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let t=[];for(let s=0;s<w.length;s++)this.colliderect(w[s].rect||w[s])&&t.push(s);return t}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var E=class e{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,t=0;for(let s of this.keys)s==="LEFT"&&(w-=1),s==="RIGHT"&&(w+=1),s==="UP"&&(t-=1),s==="DOWN"&&(t+=1);return{x:w,y:t}}equals(w){if(!(w instanceof e)||this.keys.length!==w.keys.length)return!1;for(let t=0;t<this.keys.length;t++)if(this.keys[t]!==w.keys[t])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},Xe={NOOP:new E,UP:new E("UP"),DOWN:new E("DOWN"),LEFT:new E("LEFT"),RIGHT:new E("RIGHT"),SPACE:new E("SPACE"),SPACE_RIGHT:new E("SPACE","RIGHT"),SPACE_LEFT:new E("SPACE","LEFT")},Tt=Xe.NOOP;var Je=[129,199,132],he=[25,118,210],ue=[211,47,47],Ze=[69,90,100],fe=[250,250,250],qs=[109,76,65],wt=[55,71,79],et=[230,81,0],Ys=[255,245,157],Qs=[255,138,128],Vs=[255,196,0],Xs=[255,82,82],Js=[255,112,67],Zs=[144,202,249],wo=[185,246,202],eo=[207,216,220],to=[68,90,100],so=[1,87,155],oo=[92,107,192],ro=[200,150,220],io=[255,230,230],me={GREEN:Je,BLUE:he,RED:ue,GRAY:Ze,WHITE:fe,BROWN:qs,BLACK:wt,ORANGE:et,YELLOW:Ys,PINK:Qs,GOLD:Vs,LIGHTRED:Xs,LIGHTORANGE:Js,LIGHTBLUE:Zs,LIGHTGREEN:wo,LIGHTGRAY:eo,DARKGRAY:to,DARKBLUE:so,PURPLE:oo,LIGHTPURPLE:ro,LIGHTPINK:io},tt={x:0,y:-1},st={x:0,y:1},Uw={x:-1,y:0},J={x:1,y:0},vw=[tt,Uw,st,J];function Kw(e,w){return e.x===w.x&&e.y===w.y}function no(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function Z(e){let w=no(e);return w>0?{x:e.x/w,y:e.y/w}:{x:1,y:0}}var yw=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let t=w.speed===null?1:w.speed;t!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,t*this.gridsize[0])}activeMovement(w,t,s){if(s==null&&(s=w.speed===null?1:w.speed),s!==0&&t!==null&&t!==void 0){let o;if(t.asVector?o=t.asVector():o=t,Kw(o,{x:0,y:0}))return;w._updatePosition(o,s*this.gridsize[0])}}distance(w,t){return Math.abs(w.top-t.top)+Math.abs(w.left-t.left)}};var lo=me,O=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:t,id:s,pos:o,size:r=[1,1],color:i,speed:n,cooldown:a,physicstype:l,rng:c,img:h,resources:f,...p}=w;this.key=t,this.id=s;let v=Array.isArray(r)?r:[r,r];this.rect=new gw(o[0],o[1],v[0],v[1]),this.lastrect=this.rect,this.alive=!0;let b=l||this.constructor.physicstype||yw;if(this.physics=new b(v),this.speed=n??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=h||null,this.color=i||this.constructor.color,this.img&&this.img.startsWith("colors/")){let S=this.img.split("/")[1],d=lo[S];d&&(this.color=d)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(f?{...f}:{},{get(S,d){return typeof d=="string"&&!(d in S)&&d!=="toJSON"&&d!=="then"&&d!==Symbol.toPrimitive&&d!==Symbol.toStringTag&&d!=="inspect"&&d!=="constructor"&&d!=="__proto__"?0:S[d]},set(S,d,I){return S[d]=I,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[S,d]of Object.entries(p))this[S]=d}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,t){let s,o;if(t==null){let r=this.speed||0;s=w.x*r,o=w.y*r}else s=w.x*t,o=w.y*t;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:s,y:o}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},j=class extends O{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},pe=class extends O{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var de=class extends O{static color=Ze;static is_static=!0},ge=class extends O{static color=ue},ve=class extends j{static is_static=!0},jw=class extends O{static color=ue;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},aw=class extends O{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||J)}},Ww=class extends aw{static speed=1},zw=class extends aw{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};zw.limit=1;var Sw=class extends O{static stype=null},ye=class extends Sw{static is_static=!0;static is_stochastic=!0;static color=he},bw=class extends Sw{static color=wt;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},qw=class extends O{static speed=1;static is_stochastic=!0;update(w){super.update(w);let t=vw[Math.floor(w.randomGenerator.random()*vw.length)];this.physics.activeMovement(this,t)}},Yw=class extends qw{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let t=1e100,s=[],o=w.getSprites(this.stype);for(let r of o){let i=this.physics.distance(this.rect,r.rect);i<t?(t=i,s=[r]):i===t&&s.push(r)}return s}_movesToward(w,t){let s=[],o=this.physics.distance(this.rect,t.rect);for(let r of vw){let i=this.rect.move(r),n=this.physics.distance(i,t.rect);this.fleeing&&o<n&&s.push(r),!this.fleeing&&o>n&&s.push(r)}return s}update(w){O.prototype.update.call(this,w);let t=[];for(let o of this._closestTargets(w))t.push(...this._movesToward(w,o));t.length===0&&(t=[...vw]);let s=t[Math.floor(w.randomGenerator.random()*t.length)];this.physics.activeMovement(this,s)}},Se=class extends Yw{constructor(w){super({...w,fleeing:!0})}},be=class extends bw{static color=et;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||J),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),bw.prototype.update.call(this,w)}},ke=class extends Ww{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let s;this.orientation.x>0?s=1:this.orientation.x<0?s=-1:s=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:s,y:0})}super.update(w)}},xe=class extends aw{static is_static=!0;static color=he;static strength=1;static draw_arrow=!0},_e=class e extends jw{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let t of vw)w.randomGenerator.random()<(this.spreadprob||e.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h])}};function Re(e,w){let t=[...w.active_keys].sort();for(let s=Math.max(3,t.length);s>=0;s--)for(let o of co(t,s)){let r=o.join(",");if(e._keysToAction.has(r))return e._keysToAction.get(r)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function co(e,w){if(w===0)return[[]];if(e.length===0)return[];let t=[];function s(o,r){if(r.length===w){t.push([...r]);return}for(let i=o;i<e.length;i++)r.push(e[i]),s(i+1,r),r.pop()}return s(0,[]),t}function Lt(e){let w=new Map;for(let t of Object.values(e)){let s=[...t.keys].sort().join(",");w.set(s,t)}return w}var Qw=class extends O{static color=fe;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let t=this.constructor.declarePossibleActions();this._keysToAction=Lt(t)}static declarePossibleActions(){return{UP:new E("UP"),DOWN:new E("DOWN"),LEFT:new E("LEFT"),RIGHT:new E("RIGHT"),NO_OP:new E}}update(w){O.prototype.update.call(this,w);let t=Re(this,w);t.equals(Tt)||this.physics.activeMovement(this,t)}},lw=class extends O{static color=fe;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||J);let t=this.constructor.declarePossibleActions();this._keysToAction=Lt(t)}static declarePossibleActions(){return{UP:new E("UP"),DOWN:new E("DOWN"),LEFT:new E("LEFT"),RIGHT:new E("RIGHT"),NO_OP:new E}}update(w){let t=this.orientation;this.orientation={x:0,y:0},O.prototype.update.call(this,w);let s=Re(this,w);s&&this.physics.activeMovement(this,s);let o=this.lastdirection;Math.abs(o.x)+Math.abs(o.y)!==0?this.orientation=o:this.orientation=t}},Ee=class extends lw{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=lw.declarePossibleActions();return w.SPACE=new E("SPACE"),w}update(w){lw.prototype.update.call(this,w);let t=Re(this,w);this._hasAmmo()&&t.equals(Xe.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let t=this._shootDirections(w);for(let s of t){let o=[this.lastrect.x+s.x*this.lastrect.w,this.lastrect.y+s.y*this.lastrect.h],r=w.createSprite(this.stype,o);r&&r.orientation!==void 0&&(r.orientation=s)}this._spendAmmo()}_shootDirections(w){return[Z(this.orientation)]}},cw=class extends Qw{static declarePossibleActions(){return{LEFT:new E("LEFT"),RIGHT:new E("RIGHT"),NO_OP:new E}}update(w){O.prototype.update.call(this,w);let t=Re(this,w),s=t.asVector();(Kw(s,J)||Kw(s,Uw))&&this.physics.activeMovement(this,t)}},Ae=class extends cw{static color=Je;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=cw.declarePossibleActions();return w.SPACE=new E("SPACE"),w}update(w){cw.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function tw(e,w,t){t.killSprite(e)}function Mt(e,w,t){t.killSprite(e),t.killSprite(w)}function Ct(e,w,t){t.addSpriteCreation(e.key,[e.rect.x,e.rect.y])}function kw(e,w,t,{stype:s="wall"}={}){let o=e.lastrect;t.killSprite(e);let r=t.addSpriteCreation(s,e.rect.topleft);r!=null&&(r.lastrect=o,e.orientation!==void 0&&r.orientation!==void 0&&(r.orientation=e.orientation))}function Gt(e,w,t,{resource:s,limit:o=1,no_symmetry:r=!1,exhaustStype:i=null}={}){e.resources[s]<o?Vw(e,w,t,{no_symmetry:r}):i?t.kill_list.includes(w)||kw(w,e,t,{stype:i}):tw(w,e,t)}function Vw(e,w,t,{no_symmetry:s=!1}={}){!t.kill_list.includes(w)&&!t.kill_list.includes(e)&&(e.rect.equals(e.lastrect)&&!s?(w.rect=w.lastrect,ot(w,0)):(e.rect=e.lastrect,ot(e,0)))}function ot(e,w){w>5||e.just_pushed&&(e.just_pushed.rect=e.just_pushed.lastrect,ot(e.just_pushed,w+1))}function Bt(e,w,t){for(let s of t.sprite_registry.sprites())s.rect=s.lastrect}function rt(e,w){return e.just_pushed&&w<3?rt(e.just_pushed,w+1):e.lastdirection}function Pt(e,w,t){let s=rt(w,0);Math.abs(s.x)+Math.abs(s.y)===0?(s=rt(e,0),w.physics.activeMovement(w,Z(s)),w.just_pushed=e):(e.physics.activeMovement(e,Z(s)),e.just_pushed=w)}function Nt(e,w,t,{exhaustStype:s=null}={}){if(e.lastrect.colliderect(w.rect))return;let o=e.lastdirection;if(Math.abs(o.x)+Math.abs(o.y)===0)return;let i=Z(o),n=e.rect.width,a=e.rect.copy();a.x+=Math.round(i.x)*n,a.y+=Math.round(i.y)*n,!(a.x<0||a.y<0||a.x+a.width>t.screensize[0]||a.y+a.height>t.screensize[1])&&(e.rect=a,e.lastmove=0,s&&kw(w,e,t,{stype:s}))}function it(e,w,t,{with_step_back:s=!0}={}){s&&(e.rect=e.lastrect),e.orientation!==void 0&&(e.orientation={x:-e.orientation.x,y:-e.orientation.y})}function Dt(e,w,t){e.rect=e.lastrect,e.lastmove=e.cooldown,e.physics.activeMovement(e,{x:0,y:1},1),it(e,w,t,{with_step_back:!1})}function Ht(e,w,t){let s=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];e.orientation=s[Math.floor(t.randomGenerator.random()*s.length)]}function $t(e,w,t,{offset:s=0}={}){e.rect.top<0?e.rect.top=t.screensize[1]-e.rect.height:e.rect.top+e.rect.height>t.screensize[1]&&(e.rect.top=0),e.rect.left<0?e.rect.left=t.screensize[0]-e.rect.width:e.rect.left+e.rect.width>t.screensize[0]&&(e.rect.left=0),e.lastmove=0}function Ft(e,w,t){if(!(e instanceof j))throw new Error(`collectResource: sprite must be a Resource, got ${e.constructor.name}`);let s=e.resource_type,o=t.domain.resources_limits&&t.domain.resources_limits[s]||1/0;w.resources[s]=Math.max(0,Math.min(w.resources[s]+e.value,o))}function Ut(e,w,t,{resource:s,value:o=1}={}){t.resource_changes.push([e,s,o])}function Kt(e,w,t,{resource:s,value:o=1}={}){t.resource_changes.push([w,s,o]),t.kill_list.push(e)}function jt(e,w,t,{resource:s,value:o=-1}={}){t.resource_changes.push([w,s,o]),t.kill_list.push(e)}function Wt(e,w,t,{resource:s,limit:o=1}={}){w.resources[s]>=o&&tw(e,w,t)}function zt(e,w,t,{resource:s,limit:o=1}={}){e.resources[s]>=o&&tw(e,w,t)}function qt(e,w,t,{resource:s,limit:o=1}={}){w.resources[s]<=o&&tw(e,w,t)}function Yt(e,w,t,{resource:s,limit:o=1}={}){e.resources[s]<=o&&tw(e,w,t)}function Qt(e,w,t,{resource:s,stype:o,limit:r=1}={}){e.resources[s]>=r&&t.addSpriteCreation(o,[e.rect.x,e.rect.y])}function Vt(e,w,t){t.kill_list.includes(w)||tw(e,w,t)}function Xt(e,w,t){let s=e.lastrect,o=Z(w.orientation);e.physics.activeMovement(e,o,w.strength||1),e.lastrect=s}function Jt(e,w,t){if(!ss(e,t,"t_lastpull"))return;let s=e.lastrect,o=w.lastdirection,i=Math.abs(o.x)+Math.abs(o.y)>0?Z(o):{x:1,y:0};e._updatePosition(i,(w.speed||1)*e.physics.gridsize[0]),e.lastrect=s}function Zt(e,w,t){let s=t.sprite_registry.withStype(w.stype||w.key);if(s.length>0){let o=s[Math.floor(t.randomGenerator.random()*s.length)];e.rect=o.rect.copy()}e.lastmove=0}function ws(e,w,t,{exhaustStype:s=null}={}){if(e.lastrect.colliderect(w.rect))return;let o=t.sprite_registry.group(w.key).filter(i=>i!==w);if(o.length===0)return;let r=o[Math.floor(t.randomGenerator.random()*o.length)];e.rect=r.rect.copy(),e.lastrect=r.rect.copy(),e.lastmove=0,s&&(kw(w,e,t,{stype:s}),kw(r,e,t,{stype:s}))}function es(e,w,t,{friction:s=0}={}){ss(e,t,"t_lastbounce")&&(e.speed!==null&&(e.speed*=1-s),Vw(e,w,t),e.orientation!==void 0&&(Math.abs(e.rect.centerx-w.rect.centerx)>Math.abs(e.rect.centery-w.rect.centery)?e.orientation={x:-e.orientation.x,y:e.orientation.y}:e.orientation={x:e.orientation.x,y:-e.orientation.y}))}function ts(e,w,t,{friction:s=0}={}){if(Vw(e,w,t),e.orientation!==void 0){let o=e.orientation,r=Z({x:-e.rect.centerx+w.rect.centerx,y:-e.rect.centery+w.rect.centery}),i=r.x*o.x+r.y*o.y;e.orientation={x:-2*i*r.x+o.x,y:-2*i*r.y+o.y},e.speed!==null&&(e.speed*=1-s)}}function ss(e,w,t){return t in e._effect_data&&e._effect_data[t]===w.time?!1:(e._effect_data[t]=w.time,!0)}var xw=class{constructor({win:w=!0,scoreChange:t=0}={}){this.win=w,this.score=t}isDone(w){return[!1,null]}},Ie=class extends xw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},Oe=class extends xw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},Te=class extends xw{constructor(w={}){let{win:t=!0,scoreChange:s=0,limit:o=0,...r}=w;super({win:t,scoreChange:s}),this.limit=o,this.stypes=[];for(let[i,n]of Object.entries(r))i.startsWith("stype")&&this.stypes.push(n)}isDone(w){let t=0;for(let s of this.stypes)t+=w.numSprites(s);return t===this.limit?[!0,this.win]:[!1,null]}},Le=class extends xw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let t=w.getAvatars();return t.length===0?[!1,null]:[(t[0].resources[this.stype]||0)>=this.limit,this.win]}};var Me=class e{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,t,s,o){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(t==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=t,this.classArgs[w]=s,this.stypes[w]=o,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let t=(this._liveSpritesByKey[w]||[]).map(r=>parseInt(r.id.split(".").pop())),s=(this._deadSpritesByKey[w]||[]).map(r=>parseInt(r.id.split(".").pop())),o=t.concat(s);return o.length>0?Math.max(...o)+1:1}generateId(w){let t=this._generateIdNumber(w);return`${w}.${t}`}createSprite(w,t){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:s,args:o,stypes:r}=this.getSpriteDef(w),i=t.id||this.generateId(w),n={...o,...t,key:w,id:i},a=new s(n);return a.stypes=r,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[i]=a,a}killSprite(w){w.alive=!1;let t=w.key,s=this._liveSpritesByKey[t];if(s){let o=s.indexOf(w);o!==-1&&(s.splice(o,1),this._deadSpritesByKey[t]||(this._deadSpritesByKey[t]=[]),this._deadSpritesByKey[t].push(w))}}group(w,t=!1){let s=this._liveSpritesByKey[w]||[];if(!t)return s;let o=this._deadSpritesByKey[w]||[];return s.concat(o)}*groups(w=!1){for(let t of this.spriteKeys)if(w){let s=this._liveSpritesByKey[t]||[],o=this._deadSpritesByKey[t]||[];yield[t,s.concat(o)]}else yield[t,this._liveSpritesByKey[t]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let t of this.spriteKeys){let s=this._liveSpritesByKey[t]||[];for(let o of s)yield o}}spritesArray(){let w=[];for(let t of this.spriteKeys){let s=this._liveSpritesByKey[t]||[];for(let o of s)w.push(o)}return w}withStype(w,t=!1){if(this.spriteKeys.includes(w))return this.group(w,t);let s=[];for(let o of this.spriteKeys)if(this.stypes[o]&&this.stypes[o].includes(w)){let r=t?(this._liveSpritesByKey[o]||[]).concat(this._deadSpritesByKey[o]||[]):this._liveSpritesByKey[o]||[];s.push(...r)}return s}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let t=w;for(;t&&t.name;){if(t.name.includes("Avatar"))return!0;t=Object.getPrototypeOf(t)}return!1}deepCopy(){let w=new e;w.classes={...this.classes},w.classArgs={};for(let[t,s]of Object.entries(this.classArgs))w.classArgs[t]={...s};w.stypes={};for(let[t,s]of Object.entries(this.stypes))w.stypes[t]=[...s];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var nt=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},at=class{constructor(w,t,{scoreChange:s=0}={}){this.actor_stype=w,this.actee_stype=t,this.score=s,this.is_stochastic=!1}call(w,t,s){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Xw=class extends at{constructor(w,t,s,o={}){let r=o.scoreChange||0;super(t,s,{scoreChange:r}),this.callFn=w;let{scoreChange:i,...n}=o;this.fnArgs=n,this._name=w.name||"anonymous"}call(w,t,s){return Object.keys(this.fnArgs).length>0?this.callFn(w,t,s,this.fnArgs):this.callFn(w,t,s)}get name(){return this._name}},_w=class{constructor(w,t={}){this.domain_registry=w,this.title=t.title||null,this.seed=t.seed!==void 0?t.seed:42,this.block_size=t.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(t=>t.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:t,args:s}]of this.domain_registry.getSpriteDefs())if(t.prototype instanceof j||t===j){let o=w;s.res_type&&(o=s.res_type),s.color&&(this.resources_colors[o]=s.color),s.limit!==void 0&&(this.resources_limits[o]=s.limit),this.notable_resources.push(o)}}buildLevel(w){let t=w.split(`
`).filter(n=>n.length>0),s=t.map(n=>n.length),o=Math.min(...s),r=Math.max(...s);if(o!==r)throw new Error(`Inconsistent line lengths: min=${o}, max=${r}`);let i=new lt(this,this.domain_registry.deepCopy(),w,s[0],t.length,this.seed);for(let n=0;n<t.length;n++)for(let a=0;a<t[n].length;a++){let l=t[n][a],c=this.char_mapping[l];if(c){let h=[a*this.block_size,n*this.block_size];i.createSprites(c,h)}}return i.initState=i.getGameState(),i}},lt=class{constructor(w,t,s,o,r,i=0){this.domain=w,this.sprite_registry=t,this.levelstring=s,this.width=o,this.height=r,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=i,this.randomGenerator=new nt(i),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new gw(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,t,s){let o=this.sprite_registry.createSprite(w,{pos:t,id:s,size:[this.block_size,this.block_size],rng:this.randomGenerator});return o&&(this.is_stochastic=this.domain.is_stochastic||o.is_stochastic||this.is_stochastic),o}createSprites(w,t){return w.map(s=>this.createSprite(s,t)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,t,s){return this.create_list.push([w,t,s]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,t]of this.sprite_registry.groups(!0))t.length>0&&this.sprite_registry.isAvatar(t[0])&&w.push(...t);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let t=this.sprite_registry.spritesArray();for(let a of t)a.just_pushed=null;for(let a of t)a.update(this);this.events_triggered=[];let[s,o,r]=this._moveEventHandling(),[i,n]=this._eventHandling(s);this.events_triggered=o.concat(i);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,l,c]of this.create_list)this.createSprite(a,l,c);for(let[a,l,c]of this.resource_changes){let h=this.domain.resources_limits&&this.domain.resources_limits[l]||1/0;a.resources[l]=Math.max(0,Math.min(a.resources[l]+c,h))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],t=[],s={},o=this.domain.collision_eff.filter(i=>i.name==="stepBack"||i.name==="stepBackIfHasLess");for(let i of o){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}let r=this.domain.collision_eff.filter(i=>["bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of r){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}for(let i of o){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}return[s,w,t]}_eventHandling(w){let t=[],s=[],o=this.domain.collision_eff.filter(r=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(r.name));for(let r of o){let[,i,n]=this._applyEffect(r,w);t.push(...i),s.push(...n)}return[t,s]}_applyEffect(w,t){let s=[],o=[],r=w.actor_stype,i=w.actee_stype;if(r in t||(t[r]=this.sprite_registry.withStype(r)),i!=="EOS"&&!(i in t)&&(t[i]=this.sprite_registry.withStype(i)),i==="EOS"){let c=t[r];for(let h=c.length-1;h>=0;h--){let f=c[h];this.containsRect(f.rect)||(this.addScore(w.score),w.call(f,null,this),s.push([w.name,f.id,"EOS"]),o.push([w.name,f.key,"EOS",[f.rect.x,f.rect.y],[null,null]]),!this.containsRect(f.rect)&&f.alive&&this.killSprite(f))}return[t,s,o]}let n=t[r],a=t[i];if(n.length===0||a.length===0)return[t,s,o];let l=!1;n.length>a.length&&([n,a]=[a,n],l=!0);for(let c of n)for(let h of a)c!==h&&c.rect.colliderect(h.rect)&&(l?this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,c,this),s.push([w.name,h.id,c.id]),o.push([w.name,h.key,c.key,[h.rect.x,h.rect.y],[c.rect.x,c.rect.y]])):this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,h,this),s.push([w.name,c.id,h.id]),o.push([w.name,c.key,h.key,[c.rect.x,c.rect.y],[h.rect.x,h.rect.y]])));return[t,s,o]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[t,s]=w.isDone(this);if(this.ended=t,this.won=s===null?!1:s,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let t of this.sprite_registry.spriteKeys){let s=this.sprite_registry._liveSpritesByKey[t]||[],o=this.sprite_registry._deadSpritesByKey[t]||[];w[t]=[...s,...o].map(r=>({id:r.id,key:r.key,x:r.rect.x,y:r.rect.y,w:r.rect.w,h:r.rect.h,alive:r.alive,resources:{...r.resources},speed:r.speed,cooldown:r.cooldown,orientation:r.orientation?{...r.orientation}:void 0,_age:r._age,lastmove:r.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[t,s]of Object.entries(w.sprites))for(let o of s){let r=this.sprite_registry.createSprite(t,{id:o.id,pos:[o.x,o.y],size:[o.w,o.h],rng:this.randomGenerator});r&&(r.resources=new Proxy({...o.resources},{get(i,n){return typeof n=="string"&&!(n in i)&&n!=="toJSON"&&n!=="then"&&n!==Symbol.toPrimitive&&n!==Symbol.toStringTag&&n!=="inspect"&&n!=="constructor"&&n!=="__proto__"?0:i[n]},set(i,n,a){return i[n]=a,!0}}),o.speed!==void 0&&(r.speed=o.speed),o.cooldown!==void 0&&(r.cooldown=o.cooldown),o.orientation&&(r.orientation={...o.orientation}),o._age!==void 0&&(r._age=o._age),o.lastmove!==void 0&&(r.lastmove=o.lastmove),r.alive=o.alive,o.alive||this.sprite_registry.killSprite(r))}}};function os(){u.register("VGDLSprite",O),u.register("Immovable",de),u.register("Passive",ge),u.register("Resource",j),u.register("ResourcePack",ve),u.register("Flicker",jw),u.register("OrientedFlicker",zw),u.register("OrientedSprite",aw),u.register("Missile",Ww),u.register("SpawnPoint",bw),u.register("SpriteProducer",Sw),u.register("Portal",ye),u.register("RandomNPC",qw),u.register("Chaser",Yw),u.register("Fleeing",Se),u.register("Bomber",be),u.register("Walker",ke),u.register("Conveyor",xe),u.register("Spreader",_e),u.register("Immutable",pe),u.register("MovingAvatar",Qw),u.register("OrientedAvatar",lw),u.register("ShootAvatar",Ee),u.register("HorizontalAvatar",cw),u.register("FlakAvatar",Ae),u.register("killSprite",tw),u.register("killBoth",Mt),u.register("cloneSprite",Ct),u.register("transformTo",kw),u.register("stepBack",Vw),u.register("stepBackIfHasLess",Gt),u.register("undoAll",Bt),u.register("bounceForward",Pt),u.register("catapultForward",Nt),u.register("reverseDirection",it),u.register("turnAround",Dt),u.register("flipDirection",Ht),u.register("wrapAround",$t),u.register("collectResource",Ft),u.register("changeResource",Ut),u.register("addResource",Kt),u.register("removeResource",jt),u.register("killIfOtherHasMore",Wt),u.register("killIfHasMore",zt),u.register("killIfOtherHasLess",qt),u.register("killIfHasLess",Yt),u.register("spawnIfHasMore",Qt),u.register("killIfAlive",Vt),u.register("conveySprite",Xt),u.register("pullWithIt",Jt),u.register("teleportToExit",Zt),u.register("teleportToOther",ws),u.register("wallBounce",es),u.register("bounceDirection",ts),u.register("Timeout",Ie),u.register("SpriteCounter",Oe),u.register("MultiSpriteCounter",Te),u.register("ResourceCounter",Le),u.register("GridPhysics",yw),u.register("BasicGame",_w);for(let[e,w]of Object.entries(me))u.register(e,w);u.register("UP",tt),u.register("DOWN",st),u.register("LEFT",Uw),u.register("RIGHT",J)}var Ce=class{constructor(w,t=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=t}resize(w,t){this.canvas.width=w*this.cellSize,this.canvas.height=t*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let t=w.block_size,s=this.cellSize/t;for(let o of w.domain.sprite_order){let r=w.sprite_registry._liveSpritesByKey[o]||[];for(let i of r)this._drawSprite(i,s,t)}this._drawHUD(w)}_drawSprite(w,t,s){let o=w.rect.x*t,r=w.rect.y*t,i=w.rect.w*t,n=w.rect.h*t,a=null,l=null;if(w.img){let b=this._parseImg(w.img);a=b.color,l=b.shape}a||(a=w.color),a||(a=[128,128,128]);let c=w.shrinkfactor||0,h=o+i*c/2,f=r+n*c/2,p=i*(1-c),v=n*(1-c);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,l?this._drawShape(l,h,f,p,v):this.ctx.fillRect(h,f,p,v),w.orientation&&w.draw_arrow&&this._drawArrow(h,f,p,v,w.orientation,a),w.is_avatar&&this._drawResources(w,h,f,p,v)}_parseImg(w){let t={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let s=w.split("/")[1];return{color:t[s]||null,shape:null}}if(w.startsWith("colored_shapes/")){let s=w.split("/")[1],o=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let r of o)if(s.endsWith("_"+r)){let i=s.slice(0,-(r.length+1));return{color:t[i]||null,shape:r}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,t,s,o,r){let i=this.ctx,n=t+o/2,a=s+r/2,l=o/2,c=r/2,h=2/24,f=l*(1-2*h),p=c*(1-2*h);switch(i.beginPath(),w){case"CIRCLE":i.ellipse(n,a,f,p,0,0,Math.PI*2);break;case"TRIANGLE":{let v=a-p,b=a+p,S=n-f,d=n+f;i.moveTo(n,v),i.lineTo(d,b),i.lineTo(S,b),i.closePath();break}case"DIAMOND":i.moveTo(n,a-p),i.lineTo(n+f,a),i.lineTo(n,a+p),i.lineTo(n-f,a),i.closePath();break;case"STAR":{let v=Math.min(f,p),b=v*.4;for(let S=0;S<5;S++){let d=-Math.PI/2+S*(2*Math.PI/5),I=d+Math.PI/5;S===0?i.moveTo(n+v*Math.cos(d),a+v*Math.sin(d)):i.lineTo(n+v*Math.cos(d),a+v*Math.sin(d)),i.lineTo(n+b*Math.cos(I),a+b*Math.sin(I))}i.closePath();break}case"CROSS":{let v=f*2/3,b=v/2;i.rect(n-f,a-b,f*2,v),i.rect(n-b,a-p,v,p*2);break}case"HEXAGON":{let v=Math.min(f,p);for(let b=0;b<6;b++){let S=Math.PI/6+b*(Math.PI/3),d=n+v*Math.cos(S),I=a+v*Math.sin(S);b===0?i.moveTo(d,I):i.lineTo(d,I)}i.closePath();break}case"SQUARE":{let v=Math.min(f,p)*.05;i.rect(n-f+v,a-p+v,(f-v)*2,(p-v)*2);break}case"PENTAGON":{let v=Math.min(f,p);for(let b=0;b<5;b++){let S=-Math.PI/2+b*(2*Math.PI/5),d=n+v*Math.cos(S),I=a+v*Math.sin(S);b===0?i.moveTo(d,I):i.lineTo(d,I)}i.closePath();break}default:i.rect(t,s,o,r)}i.fill()}_drawArrow(w,t,s,o,r,i){let n=w+s/2,a=t+o/2,l=Math.min(s,o)*.3,c=[i[0],255-i[1],i[2]];this.ctx.strokeStyle=`rgb(${c[0]}, ${c[1]}, ${c[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(n,a),this.ctx.lineTo(n+r.x*l,a+r.y*l),this.ctx.stroke()}_drawResources(w,t,s,o,r){let i=w.resources,n=0,a=3;for(let l of Object.keys(i)){if(l==="toJSON")continue;let c=i[l];if(c>0){let h=s+r+n*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(t,h,o*Math.min(c/5,1),a),n++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let t=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,t),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};function rs(e){if(!e.delta_encoded)return;let w=e.states;if(!w||w.length<2){delete e.delta_encoded;return}let t=w[0].sprites;for(let s=1;s<w.length;s++){if(!("sprites"in w[s]))w[s].sprites=Object.assign({},t);else{let o=Object.assign({},t,w[s].sprites);for(let r in o)o[r]===null&&delete o[r];w[s].sprites=o}t=w[s].sprites}delete e.delta_encoded}var Ge=class{constructor(w,t,s=null){this.children=[],this.content=w,this.indent=t,this.parent=null,s&&s.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function ho(e,w=8){e=e.replace(/\t/g," ".repeat(w));let t=e.split(`
`),s=new Ge("",-1);for(let o of t){o.includes("#")&&(o=o.split("#")[0]);let r=o.trim();if(r.length>0){let i=o.length-o.trimStart().length;s=new Ge(r,i,s)}}return s.getRoot()}var Be=class{constructor(){this.verbose=!1}parseGame(w,t={}){let s=w;typeof s=="string"&&(s=ho(s).children[0]);let[o,r]=this._parseArgs(s.content);Object.assign(r,t),this.spriteRegistry=new Me,this.game=new _w(this.spriteRegistry,r);for(let i of s.children)i.content.startsWith("SpriteSet")&&this.parseSprites(i.children),i.content==="InteractionSet"&&this.parseInteractions(i.children),i.content==="LevelMapping"&&this.parseMappings(i.children),i.content==="TerminationSet"&&this.parseTerminations(i.children);return this.game.finishSetup(),this.game}_eval(w){if(u.has(w))return u.request(w);let t=Number(w);return isNaN(t)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:t}_parseArgs(w,t=null,s=null){s||(s={});let o=w.split(/\s+/).filter(r=>r.length>0);if(o.length===0)return[t,s];o[0].includes("=")||(t=this._eval(o[0]),o.shift());for(let r of o){let i=r.indexOf("=");if(i===-1)continue;let n=r.substring(0,i),a=r.substring(i+1);s[n]=this._eval(a)}return[t,s]}parseSprites(w,t=null,s={},o=[]){for(let r of w){if(!r.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${r.content}`);let[i,n]=r.content.split(">").map(h=>h.trim()),[a,l]=this._parseArgs(n,t,{...s}),c=[...o,i];if("singleton"in l&&(l.singleton===!0&&this.spriteRegistry.registerSingleton(i),delete l.singleton),r.children.length===0){this.verbose&&console.log("Defining:",i,a,l,c),this.spriteRegistry.registerSpriteClass(i,a,l,c);let h=this.game.sprite_order.indexOf(i);h!==-1&&this.game.sprite_order.splice(h,1),this.game.sprite_order.push(i)}else this.parseSprites(r.children,a,l,c)}}parseInteractions(w){for(let t of w){if(!t.content.includes(">"))continue;let[s,o]=t.content.split(">").map(a=>a.trim()),[r,i]=this._parseArgs(o),n=s.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<n.length;a++){let l=n[0],c=n[a],h;if(typeof r=="function"&&!r.prototype)h=new Xw(r,l,c,i);else if(typeof r=="function")h=new Xw(r,l,c,i);else throw new Error(`Unknown effect type: ${r}`);this.game.collision_eff.push(h)}}}parseTerminations(w){for(let t of w){let[s,o]=this._parseArgs(t.content);this.game.terminations.push(new s(o))}}parseMappings(w){for(let t of w){let[s,o]=t.content.split(">").map(i=>i.trim());if(s.length!==1)throw new Error(`Only single character mappings allowed, got: '${s}'`);let r=o.split(/\s+/).filter(i=>i.length>0);this.game.char_mapping[s]=r}}};var ct={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var Jw=["localhost","127.0.0.1",""].includes(window.location.hostname)?"":"https://dthc03qo05lda.cloudfront.net";os();var is="rdms_unit8_for_website/",uo="./catalogue-data/manifest.json",_s=60;async function uw(e,w,{tries:t=3,baseDelayMs:s=250}={}){let o;for(let r=0;r<t;r++){try{let i=await fetch(e,w);if(i.ok||i.status<500&&i.status!==429)return i;o=new Error(`HTTP ${i.status}`)}catch(i){o=i}if(r<t-1){let i=s*Math.pow(2,r)+Math.random()*200;await new Promise(n=>setTimeout(n,i))}}throw o||new Error("fetch failed")}var Es=new URLSearchParams(window.location.search),Zw=typeof window<"u"&&window.EMBED_CONFIG||null,As=!!Zw||Es.get("embed")==="1";As&&document.body.classList.add("embed-mode");function H(e){if(Zw&&Zw[e]!==void 0&&Zw[e]!==null)return String(Zw[e]);let w=Es.get(e);return w??null}function fw(e){return Jw?`${Jw}/${is}${e}`:`./data/${is}${e}`}function gt(e){let w=parseInt(e.replace("sub-",""),10);if(!Number.isFinite(w))throw new Error(`bad subject id: ${e}`);return w<=11?{section:"cohort3",vgfmri:"vgfmri3"}:{section:"cohort4",vgfmri:"vgfmri4"}}var fo={avoidgeorge:"avoidGeorge",plaqueattack:"plaqueAttack"};function vt(e){return fo[e]||e}var mo={dsv32:"DeepSeek-V3.2",dsv4_flash:"DeepSeek-V4-Flash",dsv4_pro:"DeepSeek-V4-Pro",qwen35_9b:"Qwen3.5-9B",qwen35_27b:"Qwen3.5-27B",qwen35_35b_a3b:"Qwen3.5-35B-A3B",qwen35_122b_a10b:"Qwen3.5-122B-A10B"},ns={dsv32:"https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",dsv4_flash:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",dsv4_pro:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",qwen35_9b:"https://huggingface.co/Qwen/Qwen3.5-9B",qwen35_27b:"https://huggingface.co/Qwen/Qwen3.5-27B",qwen35_35b_a3b:"https://huggingface.co/Qwen/Qwen3.5-35B-A3B",qwen35_122b_a10b:"https://huggingface.co/Qwen/Qwen3.5-122B-A10B"};function yt(e){return mo[e]||e}var D=null,Ow=null,m=null,g=null,we=null,Rs=null,De={},mt=null,mw=null;var M=null,ie="main",ww=new Map,ee=!1,x=0,y=0,ew=_s,te=!1,L=null,sw=2,k=e=>document.getElementById(e),q=k("select-subject"),$=k("select-game"),R=k("select-model"),P=k("select-stream"),U=k("btn-load"),ow=k("load-status"),pw=k("main-container"),Is=k("game-canvas"),po=k("canvas-wrapper"),as=k("play-indicator"),go=k("conversation-panel"),N=k("conversation-content"),He=k("try-tab"),Ew=k("game-status"),Os=k("btn-model-prev"),Ts=k("btn-model-next"),$e=k("select-model-quick"),W=k("scrubber-front"),Q=k("scrubber-back"),ls=k("scrubber-window"),cs=k("scrub-back-label"),hs=k("scrub-front-label"),us=k("meta-label"),Ls=k("btn-speed-up"),Ms=k("btn-speed-down"),vo=k("speed-value"),Iw=[.25,.5,1,2,4],Cs=50,T=0,z=null,V=k("roi-grid"),fs=k("btn-expand-all"),oe=k("roi-picker-overlay"),ms=k("roi-picker-groups"),yo="figures/brain_roi",So={Frontal:["IFGtriang","IFGoperc","MFG","SFG","OFC"],Motor:["PreCG","SMA","PoCG","ROL"],Parietal:["IPG","AG","SMG","PCUN"],Visual:["IOG","MOG","SOG","FFG","MTG"],"Early Visual":["LING","CAL","CUN"],Striatal:["Caudate","Putamen","dStriatum"],Cerebellum:["Cerebellum"]},Gs={AG:"Angular Gyrus",CAL:"Calcarine Sulcus",Caudate:"Caudate",Cerebellum:"Cerebellum",CUN:"Cuneus",dStriatum:"Dorsal Striatum",FFG:"Fusiform Gyrus",IFGoperc:"IFG (oper.)",IFGtriang:"IFG (triang.)",IOG:"Inf. Occipital",IPG:"Inf. Parietal",LING:"Lingual",MFG:"Mid. Frontal",MOG:"Mid. Occipital",MTG:"Mid. Temporal",OFC:"Orbitofrontal",PCUN:"Precuneus",PoCG:"Postcentral",PreCG:"Precentral",Putamen:"Putamen",ROL:"Rolandic Oper.",SFG:"Sup. Frontal",SMA:"Supp. Motor",SMG:"Supramarginal",SOG:"Sup. Occipital"};function re(e,w){return`${yo}/thumb_brain_${e}_${w}.png`}var ps=new Set;function bo(e){for(let w of e)for(let t of["front","side"]){let s=re(w,t);if(ps.has(s))continue;ps.add(s);let o=new Image;o.decoding="async",o.src=s}}var hw=new Map,se=new Map;function St(e,w,t){return`${e}/${w}/${t}`}function ko(){let e=H("subject")||"sub-13",w=H("game")||"bait",t=H("model")||"qwen35_27b",s=St(e,w,t);if(hw.has(s)||se.has(s))return;let o=`${e}__${w}__${t}`,r=fw(`data/${o}.json`),i=fw(`data/${o}.bin`),n=(async()=>{try{let[a,l]=await Promise.all([uw(r),uw(i)]);if(!a.ok||!l.ok)return null;let c=await a.json(),h=new Uint8Array(await l.arrayBuffer());return hw.set(s,{meta:c,blob:h}),{meta:c,blob:h}}catch{return null}})();se.set(s,n)}var ds=!1;async function xo(){if(ds||(ds=!0,!m||!D))return;let e=typeof navigator<"u"&&(navigator.connection||navigator.mozConnection||navigator.webkitConnection);if(e&&(e.saveData||e.effectiveType&&["slow-2g","2g","3g"].includes(e.effectiveType)))return;let w=m.meta.subject,t=m.meta.game,s=m.meta.model,o=D.units.filter(r=>r.subject===w&&r.game===t&&r.model!==s);for(let r of o){let i=St(w,t,r.model);if(!hw.has(i))try{let[n,a]=await Promise.all([fw(`data/${r.json}`),fw(`data/${r.bin}`)]),l={priority:"low"},[c,h]=await Promise.all([uw(n,l),uw(a,l)]);if(!c.ok||!h.ok)continue;let f=await c.json(),p=new Uint8Array(await h.arrayBuffer());hw.set(i,{meta:f,blob:p})}catch{}}}var Bs=new WeakMap,Pe=null,gs=[[68,1,84],[71,40,120],[62,74,137],[49,104,142],[38,130,142],[31,158,137],[53,183,121],[110,206,88],[181,222,43],[253,231,37]],_o=[[5,48,97],[33,102,172],[67,147,195],[146,197,222],[209,229,240],[247,247,247],[253,219,199],[244,165,130],[214,96,77],[178,24,43],[103,0,31]];function ht(e,w){if(w<=0)return e[0];if(w>=1)return e[e.length-1];let t=w*(e.length-1),s=Math.floor(t),o=t-s,r=e[s],i=e[s+1];return[Math.round(r[0]+(i[0]-r[0])*o),Math.round(r[1]+(i[1]-r[1])*o),Math.round(r[2]+(i[2]-r[2])*o)]}async function Eo(){let e=await fw("manifest.json"),[w,t]=await Promise.all([fetch(e),fetch(uo)]);if(!w.ok){ow.textContent=`Manifest fetch failed: ${w.status}`;return}D=await w.json(),Ow=t.ok?await t.json():null,ow.textContent=`${D.units.length} units available`,Ao()}function Ao(){let e=[...new Set(D.units.map(w=>w.subject))].sort();q.innerHTML='<option value="">-- select --</option>';for(let w of e){let t=document.createElement("option");t.value=w,t.textContent=w,q.appendChild(t)}}function Ps(){$.innerHTML='<option value="">-- select --</option>',$.disabled=!0,R.innerHTML='<option value="">--</option>',R.disabled=!0,P.innerHTML='<option value="">--</option>',P.disabled=!0,U.disabled=!0;let e=q.value;if(!e)return;let w=[...new Set(D.units.filter(t=>t.subject===e).map(t=>t.game))].sort();if(w.length!==0){$.disabled=!1;for(let t of w){let s=document.createElement("option");s.value=t,s.textContent=t,$.appendChild(s)}}}function Ns(){R.innerHTML='<option value="">-- select --</option>',R.disabled=!0,P.innerHTML='<option value="">--</option>',P.disabled=!0,U.disabled=!0;let e=q.value,w=$.value;if(!e||!w)return;let t=D.units.filter(s=>s.subject===e&&s.game===w).map(s=>s.model).sort();if(t.length!==0){R.disabled=!1;for(let s of t){let o=document.createElement("option");o.value=s,o.textContent=yt(s),R.appendChild(o)}}}function Fe(){P.innerHTML='<option value="">-- select --</option>',P.disabled=!0,U.disabled=!0;let e=R.value;if(!e||!D.model_specs[e])return;let w=D.model_specs[e].streams;P.disabled=!1;for(let t of w){let s=document.createElement("option");s.value=t,s.textContent=t,P.appendChild(s)}P.value=w.includes("main")?"main":w[0],U.disabled=!1}q.addEventListener("change",Ps);$.addEventListener("change",Ns);R.addEventListener("change",Fe);P.addEventListener("change",()=>{U.disabled=!(q.value&&$.value&&R.value&&P.value)});async function bt({preserveState:e=!1}={}){let w=q.value,t=$.value,s=R.value,o=P.value;if(!w||!t||!s||!o)return;U.disabled=!0,ow.textContent="Fetching unit...";let r=D.units.find(G=>G.subject===w&&G.game===t&&G.model===s);if(!r){ow.textContent=`No unit for ${w}/${t}/${s}`,U.disabled=!1;return}let i=!!L,n=m?.meta?.subject,a=m?.meta?.game,l=e&&n===w&&a===t,c=y,h=x,f=ew,p=te,v=M,b=T;i&&K(!1);let S=St(w,t,s);se.has(S)&&(await se.get(S),se.delete(S));let d,I;if(hw.has(S)){let G=hw.get(S);d=G.meta,I=G.blob}else{let[G,Y]=await Promise.all([fw(`data/${r.json}`),fw(`data/${r.bin}`)]),[le,ce]=await Promise.all([uw(G),uw(Y)]);if(!le.ok)throw new Error(`meta fetch ${le.status}`);if(!ce.ok)throw new Error(`bin fetch ${ce.status}`);d=await le.json(),I=new Uint8Array(await ce.arrayBuffer()),hw.set(S,{meta:d,blob:I})}m={meta:d,blob:I},bo(d.rois),ie=o,e&&n===w&&a===t?(x=Math.min(h,d.n_TR-1),y=Math.min(c,d.n_TR-1),ew=f,te=p,M=v&&d.rois.includes(v)?v:d.rois[0],T=b):(x=0,y=0,ew=_s,te=!1,M=d.rois[0],T=0),ww=new Map,l&&V.children.length>0&&Co()?Go():We(),pw.classList.add("visible"),await new Promise(G=>requestAnimationFrame(G)),Ko(d.n_TR,{reset:!l}),Tw(),l&&g&&mw?(Ws(g),z=Ks(g),T>=0&&g.states&&T<g.states.length?ae(T):Ye()):await qo(w,t),Mw(),ow.textContent=`${w} / ${t} / ${s} (${o}) -- N=${d.n_TR}`,sr(),U.disabled=!1,i&&K(!0)}U.addEventListener("click",()=>bt({preserveState:!0}).catch(e=>{console.error(e),ow.textContent=`Load failed: ${e.message}`,U.disabled=!1}));function Ro(e,w){let t=m.meta.best_layer[e];if(!t||t[w]==null)throw new Error(`best_layer missing for ROI=${e} stream=${w}`);return t[w]}function Io(e,w){let t=m.meta,s=t.n_layers,o=t.streams.length,r=t.rois.indexOf(e),i=t.streams.indexOf(w);if(r<0||i<0)throw new Error(`unknown ROI/stream: ${e}/${w}`);let n=r*o*s+i*s;return t.similarity_pearson.slice(n,n+s)}function vs(e,w,t){let s=new Float32Array(e.length);if(t===w)return s.fill(w),s;let o=(t-w)/255;for(let r=0;r<e.length;r++)s[r]=w+e[r]*o;return s}function Oo(e,w){let t=new Float32Array(w*w),s=0;for(let o=0;o<w-1;o++)for(let r=o+1;r<w;r++){let i=e[s++];t[o*w+r]=i,t[r*w+o]=i}return t}function Ds(e){let w=m.blob,t=e.rdm,s=e.pca,o=w.subarray(t.offset,t.offset+t.length),r=w.subarray(s.offset,s.offset+s.length),i=vs(o,t.qmin,t.qmax),n=vs(r,s.qmin,s.qmax);return{rdm:Oo(i,m.meta.n_TR),pca:n,pcaShape:s.shape}}function To(e){return Ds(m.meta.panels.human[e])}function Lo(e,w){let t=String(w),s=m.meta.panels.model[e][t];if(!s)throw new Error(`no model panel for stream=${e} layer=${w}`);return Ds(s)}function ys(e,w,t,s){let o=m.meta.n_TR,r=m.meta.n_pca_dim,{rdm:i,pca:n}=w,a=e.getBoundingClientRect(),l=Math.max(120,Math.floor(a.width)),c=Math.max(120,Math.floor(a.height));e.width=l,e.height=c;let h=e.getContext("2d");h.fillStyle="#fafafa",h.fillRect(0,0,l,c);let f=20,p=f,v=f,b=Math.min(l-f,c-f),S=p,d=v,I=b,G=b,Y=Math.max(1,s-t+1),le=I/Y,ce=G/Y,rw=1/0,Cw=-1/0;for(let _=t;_<=s;_++)for(let C=_+1;C<=s;C++){let A=i[_*o+C];A<rw&&(rw=A),A>Cw&&(Cw=A)}(!isFinite(rw)||rw===Cw)&&(rw=0,Cw=1);let X=1/0,dw=-1/0;for(let _=t;_<=s;_++)for(let C=0;C<r;C++){let A=n[_*r+C];A<X&&(X=A),A>dw&&(dw=A)}(!isFinite(X)||X===dw)&&(X=0,dw=1);let iw=h.createImageData(Math.max(1,Math.floor(I)),Math.max(1,Math.floor(G))),nw=iw.width,Gw=iw.height;for(let _=0;_<Gw;_++){let C=t+Math.floor(_/Gw*Y);for(let A=0;A<nw;A++){let Nw=t+Math.floor(A/nw*Y),Dw=(i[C*o+Nw]-rw)/(Cw-rw),[Hw,$w,Fw]=ht(_o,Math.max(0,Math.min(1,Dw))),B=(_*nw+A)*4;iw.data[B]=Hw,iw.data[B+1]=$w,iw.data[B+2]=Fw,iw.data[B+3]=255}}h.putImageData(iw,S,d);let Bw=h.createImageData(nw,f);for(let _=0;_<f;_++){let C=Math.floor(_/f*r);for(let A=0;A<nw;A++){let Nw=t+Math.floor(A/nw*Y),Dw=(n[Nw*r+C]-X)/(dw-X),[Hw,$w,Fw]=ht(gs,Math.max(0,Math.min(1,Dw))),B=(_*nw+A)*4;Bw.data[B]=Hw,Bw.data[B+1]=$w,Bw.data[B+2]=Fw,Bw.data[B+3]=255}}h.putImageData(Bw,S,0);let Pw=h.createImageData(f,Gw);for(let _=0;_<Gw;_++){let C=t+Math.floor(_/Gw*Y);for(let A=0;A<f;A++){let Nw=Math.floor(A/f*r),Dw=(n[C*r+Nw]-X)/(dw-X),[Hw,$w,Fw]=ht(gs,Math.max(0,Math.min(1,Dw))),B=(_*f+A)*4;Pw.data[B]=Hw,Pw.data[B+1]=$w,Pw.data[B+2]=Fw,Pw.data[B+3]=255}}if(h.putImageData(Pw,0,d),y>=t&&y<=s){let _=S+(y-t+.5)/Y*I,C=d+(y-t+.5)/Y*G;h.strokeStyle="rgba(246, 195, 80, 0.9)",h.lineWidth=1.5,h.beginPath(),h.moveTo(_,d),h.lineTo(_,d+G),h.moveTo(S,C),h.lineTo(S+I,C),h.stroke()}}function je(e){if(ww.has(e))return ww.get(e);let w=Ro(e,ie);return ww.set(e,w),w}function Mo(e){return m.meta.roi_n_voxels[m.meta.rois.indexOf(e)]}function Hs(){return ee?m.meta.rois.slice():[M]}function We(){Pe&&Pe.disconnect(),V.innerHTML="";for(let e of Hs())V.appendChild(Bo(e));Pe=new IntersectionObserver($o,{root:null,rootMargin:"120px 0px",threshold:.01});for(let e of V.children)Pe.observe(e)}function Co(){let e=Hs(),w=Array.from(V.children).map(t=>t.dataset.roi);if(e.length!==w.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==w[t])return!1;return!0}function Go(){for(let e of V.children){let w=e.dataset.roi,t=e.querySelector(".row-layer-strip");t&&kt(t,w);let s=e.querySelector(".layer-current-label");s&&(s.textContent=`Layer ${je(w)}`),e.dataset.dirty="1"}}function Bo(e){let w=document.createElement("div");w.className="roi-row",e===M&&w.classList.add("active"),w.dataset.roi=e,w.dataset.dirty="1";let t=document.createElement("div");t.className="roi-card roi-card-human";let s=document.createElement("div");s.className="roi-brain";let o=Gs[e]||e;s.innerHTML=`
    <div class="roi-brain-stack" role="button" tabindex="0"
         title="Choose a different brain region">
      <img class="brain-view" src="${re(e,"front")}" alt="${e} frontal">
      <img class="brain-view" src="${re(e,"side")}"  alt="${e} lateral">
    </div>
    <div class="roi-name" title="${e}">${o}</div>
    <div class="roi-meta">${e} &middot; ${Mo(e)} vox</div>
  `;let r=s.querySelector(".roi-brain-stack");r&&(r.addEventListener("click",p=>{p.stopPropagation(),ut(e)}),r.addEventListener("keydown",p=>{(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),ut(e))})),t.appendChild(s);let i=document.createElement("div");i.className="panel-cell panel-human",i.innerHTML="<canvas></canvas>",t.appendChild(i),w.appendChild(t);let n=document.createElement("div");n.className="row-controls",n.innerHTML=`
    <button class="row-btn" data-act="up" title="Previous ROI">&#9650;</button>
    <button class="row-btn pick" data-act="pick" title="Choose ROI">&#9863;</button>
    <button class="row-btn" data-act="down" title="Next ROI">&#9660;</button>
  `,n.querySelector("[data-act=up]").addEventListener("click",p=>{p.stopPropagation(),Ss(e,-1)}),n.querySelector("[data-act=down]").addEventListener("click",p=>{p.stopPropagation(),Ss(e,1)}),n.querySelector("[data-act=pick]").addEventListener("click",p=>{p.stopPropagation(),ut(e)}),w.appendChild(n);let a=document.createElement("div");a.className="roi-card roi-card-model";let l=document.createElement("div");l.className="panel-cell panel-model",l.innerHTML="<canvas></canvas>",a.appendChild(l);let c=document.createElement("div");c.className="layer-strip-col";let h=document.createElement("div");h.className="row-layer-strip",kt(h,e);let f=document.createElement("div");return f.className="layer-current-label",f.textContent=`Layer ${je(e)}`,c.appendChild(h),c.appendChild(f),a.appendChild(c),w.appendChild(a),w}var Ne=[[246,226,130],[240,165,60],[200,40,40]];function Po(e){e=Math.max(0,Math.min(1,e));let w=e*(Ne.length-1),t=Math.min(Ne.length-2,Math.floor(w)),s=w-t,o=Ne[t],r=Ne[t+1],i=Math.round(o[0]+(r[0]-o[0])*s),n=Math.round(o[1]+(r[1]-o[1])*s),a=Math.round(o[2]+(r[2]-o[2])*s);return`rgb(${i}, ${n}, ${a})`}function kt(e,w){e.innerHTML="";let t=Io(w,ie),s=m.meta.layer_indices,o=je(w),r=1/0,i=-1/0;for(let n=0;n<t.length;n++)t[n]<r&&(r=t[n]),t[n]>i&&(i=t[n]);for(let n=0;n<s.length;n++){let a=s[n],l=document.createElement("div");l.className="layer-block",a===o&&l.classList.add("active");let c=i===r?.5:(t[n]-r)/(i-r);l.style.background=Po(c),l.title=`L${a}: r=${t[n].toFixed(3)}`,l.addEventListener("click",h=>{h.stopPropagation(),Ho(w,a)}),e.appendChild(l)}}var No=7;function Do(e){let w=e.querySelector(".roi-card-model .panel-cell"),t=e.querySelector(".layer-strip-col"),s=e.querySelector(".row-layer-strip");if(!w)return;let o=w.offsetHeight;if(o&&(t&&(t.style.height=`${o}px`),s)){s.style.height=`${o}px`;let i=Math.max(20,o-6),n=1,l=m.meta.layer_indices.length,c=Math.max(2,(i-(l-1)*n)/l),h=Math.max(28,c*No);s.querySelectorAll(".layer-block").forEach(f=>{f.style.height=`${c}px`,f.style.width=`${h}px`})}}function Ho(e,w){if(ww.get(e)===w)return;ww.set(e,w);let t=V.querySelector(`.roi-row[data-roi="${e}"]`);if(!t)return;let s=t.querySelector(".layer-current-label");s&&(s.textContent=`Layer ${w}`),kt(t.querySelector(".row-layer-strip"),e),_t(t,{onlyModel:!0})}function $s(e){if(e!==M)if(M=e,!ee)We(),ze();else{V.querySelectorAll(".roi-row").forEach(t=>t.classList.toggle("active",t.dataset.roi===M));let w=V.querySelector(`.roi-row[data-roi="${M}"]`);w&&w.scrollIntoView({block:"nearest",behavior:"smooth"})}}function Ss(e,w){let t=m.meta.rois,o=((t.indexOf(e)+w)%t.length+t.length)%t.length;$s(t[o])}function ut(e){ms.innerHTML="";let w=new Set(m.meta.rois);for(let[t,s]of Object.entries(So)){let o=s.filter(n=>w.has(n));if(o.length===0)continue;let r=document.createElement("div");r.className="roi-picker-group",r.innerHTML=`<h4>${t}</h4><div class="roi-picker-items"></div>`;let i=r.querySelector(".roi-picker-items");for(let n of o){let a=document.createElement("button");a.className="roi-picker-item"+(n===e?" active":"");let l=Gs[n]||n;a.innerHTML=`
        <div class="picker-views">
          <img class="brain-view" src="${re(n,"front")}" alt="${n} frontal">
          <img class="brain-view" src="${re(n,"side")}"  alt="${n} lateral">
        </div>
        <span class="name" title="${n}">${l}</span>
      `,a.addEventListener("click",()=>{xt(),$s(n)}),i.appendChild(a)}ms.appendChild(r)}oe.classList.add("open")}function xt(){oe.classList.remove("open")}oe.addEventListener("click",e=>{e.target===oe&&xt()});window.addEventListener("keydown",e=>{e.key==="Escape"&&(oe.classList.contains("open")&&xt(),Rt())});fs.addEventListener("click",()=>{ee=!ee,fs.textContent=ee?"Collapse to active ROI":"View all Brain Regions",We(),ze()});function $o(e){for(let w of e)Bs.set(w.target,w.isIntersecting),w.isIntersecting&&w.target.dataset.dirty==="1"&&(_t(w.target),w.target.dataset.dirty="")}function _t(e,{onlyModel:w=!1}={}){if(!m)return;Do(e);let t=Math.min(x,y),s=Math.max(x,y),o=e.dataset.roi,r=e.querySelectorAll(".panel-cell canvas");w||ys(r[0],To(o),t,s);let i=je(o);ys(r[1],Lo(ie,i),t,s)}var ft=!1;function ze(){ft||(ft=!0,requestAnimationFrame(()=>{ft=!1,Fo()}))}function Fo(){if(m){for(let e of V.children)Bs.get(e)?_t(e):e.dataset.dirty="1";ne(),Lw(),Wo()}}function Tw(){ze()}function Uo(e){let w=document.getElementById("scrubber-marks");w.innerHTML="";let t=m.meta.tr_meta;if(!(!t||!t.run||e<=1))for(let s=0;s<e;s++){let o=s===0,r=o||t.run[s]!==t.run[s-1],i=o||t.level[s]!==t.level[s-1];if(!r&&!i)continue;let n=r?"run":"level",a=r?`R${t.run[s]}L${t.level[s]}`:`L${t.level[s]}`,l=document.createElement("div");l.className=`mark ${n}`,l.style.left=`${s/(e-1)*100}%`,l.innerHTML=`<div class="stick"></div><div class="lab">${a}</div>`,w.appendChild(l)}}function Ko(e,{reset:w=!0}={}){let t=Math.max(0,e-1);W.min=0,W.max=t,Q.min=0,Q.max=t,w?(y=Math.min(ew,t),x=0):(y=Math.min(y,t),x=Math.min(x,t)),W.value=y,Q.value=x,Uo(e),ne(),Lw()}function ne(){if(!m)return;let e=m.meta.n_TR,w=W.parentElement.clientWidth;if(!w||e<=1)return;let t=8,s=w-t*2,o=t+x/(e-1)*s,r=t+y/(e-1)*s;cs.textContent=`FROM ${x}`,hs.textContent=`TR ${y} / ${e-1}`,cs.style.left=`${o}px`,hs.style.left=`${r}px`,us&&(us.textContent="")}function Lw(){if(!m)return;let e=m.meta.n_TR,w=W.parentElement.clientWidth;if(!w||e<=1)return;let t=8,s=w-t*2,o=t+x/(e-1)*s,r=t+y/(e-1)*s,i=Math.min(o,r),n=Math.abs(r-o);ls.style.left=`${i}px`,ls.style.width=`${n}px`}function F(e,{reason:w}={}){if(!m)return;let t=m.meta.n_TR-1;y=Math.max(0,Math.min(t,e)),w!=="noFromFollow"&&(x=Math.max(0,y-ew)),W.value=y,Q.value=x,Tw(),Mw(),Ye(),qe()}function pt(e,{fromUser:w=!1}={}){if(!m)return;let t=m.meta.n_TR-1;x=Math.max(0,Math.min(t,e));let s=y>0?y-1:0;x>s&&(x=s),w&&y>0&&(ew=y-x,te=!0),Q.value=x,Tw()}W.addEventListener("input",()=>{F(parseInt(W.value,10))});Q.addEventListener("input",()=>{pt(parseInt(Q.value,10),{fromUser:!0})});var Et=document.getElementById("scrubber-track-wrap");function Ue(e){let w=Et.getBoundingClientRect(),t=6,s=Math.max(1,w.width-t*2),o=(e-w.left-t)/s,r=m.meta.n_TR;return Math.max(0,Math.min(r-1,Math.round(o*(r-1))))}Et.addEventListener("mousedown",e=>{if(!m||e.target.tagName==="INPUT")return;e.preventDefault(),F(Ue(e.clientX));let w=s=>{F(Ue(s.clientX))},t=()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",t)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",t)});Et.addEventListener("touchstart",e=>{if(!m||e.target.tagName==="INPUT")return;e.preventDefault();let w=e.touches[0];F(Ue(w.clientX));let t=o=>{o.preventDefault(),F(Ue(o.touches[0].clientX))},s=()=>{document.removeEventListener("touchmove",t),document.removeEventListener("touchend",s),document.removeEventListener("touchcancel",s)};document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",s),document.addEventListener("touchcancel",s)},{passive:!1});function K(e){if(e){if(L)return;g&&g.states&&g.states.length>0?zo():L=setInterval(()=>{if(!m)return;let w=m.meta.n_TR-1;if(y>=w){K(!1);return}F(y+1)},1e3/sw)}else L&&(clearTimeout(L),clearInterval(L),L=null);qe()}function qe(){let e=document.getElementById("btn-play-pause");if(!e)return;let w=!!L,t=!w&&Fs();e.dataset.state=w?"playing":t?"ended":"paused";let s=w?"Pause":t?"Replay":"Play";e.setAttribute("aria-label",s),e.title=s}function Fs(){return g&&g.states&&g.states.length>0?T>=g.states.length-1:m?y>=m.meta.n_TR-1:!1}function jo(){g&&g.states&&g.states.length>0?(T=0,y=0,x=0,W.value=0,Q.value=0,ae(0),Tw(),Mw(),ne(),Lw()):m&&F(0)}function Wo(){let e=document.getElementById("open-rep-viewer");if(!e||!m)return;let w=m.meta,t=new URLSearchParams;t.set("subject",w.subject),t.set("game",w.game),t.set("model",w.model),t.set("stream",ie),M&&t.set("roi",M),M&&ww.has(M)&&t.set("layer",String(ww.get(M))),t.set("tr",String(y)),e.href=`representation.html?${t.toString()}`}var bs=document.getElementById("btn-play-pause");bs&&(bs.addEventListener("click",e=>{if(e.stopPropagation(),!L&&Fs()){jo(),K(!0);return}K(!L)}),qe());function zo(){let e=g.states,w=()=>{if(!L)return;if(T>=e.length-1){K(!1);return}T+=1,ae(T),Mw();let t=Us(T);t!==y&&(y=t,(!te||y-x>ew)&&(x=Math.max(0,y-ew)),W.value=y,Q.value=x,ze()),ne(),Lw(),L=setTimeout(w,Cs/sw)};L=setTimeout(w,0)}function Us(e){if(!z||!g||!g.steps)return y;let w=z[e];if(w<0)return 0;let t=g.steps[w],s=(e-(t.state_index??t.frame_idx??0))*(Cs/1e3);return Vo(t.realworld_ts+s)}function Ks(e){let w=new Int32Array(e.states.length).fill(-1);if(!e.steps||e.steps.length===0)return w;let t=-1;for(let s=0;s<e.states.length;s++){for(;t+1<e.steps.length&&(e.steps[t+1].state_index??e.steps[t+1].frame_idx??0)<=s;)t++;w[s]=t}return w}function At(e){e=Math.max(0,Math.min(Iw.length-1,e)),sw=Iw[e];let w=sw===Math.floor(sw)?`${sw}x`:`${sw}x`;vo.textContent=w,Ms.disabled=e===0,Ls.disabled=e===Iw.length-1,L&&(K(!1),K(!0))}function js(){let e=Iw.indexOf(sw);return e<0?Iw.indexOf(1):e}Ls.addEventListener("click",()=>At(js()+1));Ms.addEventListener("click",()=>At(js()-1));At(Iw.indexOf(2));window.addEventListener("keydown",e=>{if(m){if(e.key===" "||e.code==="Space"){let w=e.target;if(w&&(w.isContentEditable||w.tagName==="INPUT"&&w.type!=="range"||w.tagName==="TEXTAREA"))return;K(!L),e.preventDefault();return}e.target.tagName==="INPUT"||e.target.tagName==="SELECT"||(e.key==="ArrowLeft"?(e.shiftKey?pt(x-1,{fromUser:!0}):F(y-1),e.preventDefault()):e.key==="ArrowRight"?(e.shiftKey?pt(x+1,{fromUser:!0}):F(y+1),e.preventDefault()):e.key==="Home"?(F(0),e.preventDefault()):e.key==="End"&&(F(m.meta.n_TR-1),e.preventDefault()))}});window.addEventListener("resize",()=>{m&&(Lw(),Rw(),Tw())});function Rw(){let e=Is.offsetHeight||400;pw&&pw.style.setProperty("--card-h",`${e}px`),go.style.setProperty("--canvas-h",`${e}px`);let w=document.getElementById("scrubber-row"),t=w?w.offsetHeight:76,s=document.getElementById("model-switcher");if(s&&s.style.setProperty("--scrub-h",`${t}px`),He){let r=(He.textContent||"").length,n=r*11+16,a=Math.max(7,Math.min(14,(e-16)/r));He.style.fontSize=e<n?`${a.toFixed(1)}px`:"14px"}}async function qo(e,w){if(g=null,N.innerHTML='<em style="color:#888">Looking up replay...</em>',!Ow){N.innerHTML='<em style="color:#888">No catalogue manifest -- replays unavailable.</em>',Rw();return}let{section:t,vgfmri:s}=gt(e),o=`${vt(w)}_${s}`,r=Ow[t]?.[e]?.replays?.[o];if(!r){N.innerHTML=`<em style="color:#888">No replay listed for ${e}/${o}.</em>`,Rw();return}let i=Jw?`${Jw}/${r}`:`data/${r}`,n=await uw(i);if(!n.ok){N.innerHTML=`<em style="color:#888">Replay fetch failed: ${n.status}</em>`,Rw();return}let a=i.split("?")[0].endsWith(".gz"),l;if(a){let p=new DecompressionStream("gzip");l=await new Response(n.body.pipeThrough(p)).text()}else l=await n.text();let c=JSON.parse(l);rs(c),g=c,we||(we=new Ce(Is,24));let h=c.game_description||ct[c.game].description;Rs=new Be().parseGame(h),De={},mt=null,Ws(c),z=Ks(c),T=0,wr(c),Rw(),Ye()}function Ws(e){let w=m.meta.tr_meta?.unix_ts;if(!w)throw new Error("tr_meta.unix_ts missing. Re-export with export_rsa_for_web.py rev that writes tr_unix_ts alongside tr_run_seq/tr_level_seq/tr_play_seq.");if(!e.steps[0]?.realworld_ts)throw new Error("Replay steps lack realworld_ts; cannot align.");let t=new Float64Array(e.steps.length),s=new Int32Array(e.steps.length);for(let l=0;l<e.steps.length;l++)t[l]=e.steps[l].realworld_ts,s[l]=l;let o=[...s].sort((l,c)=>t[l]-t[c]),r=new Float64Array(o.length),i=new Int32Array(o.length);for(let l=0;l<o.length;l++)r[l]=t[o[l]],i[l]=o[l];function n(l,c){let h=0,f=l.length;for(;h<f;){let p=h+f>>>1;l[p]<c?h=p+1:f=p}return h}let a=m.meta.n_TR;mw=new Int32Array(a);for(let l=0;l<a;l++){let c=w[l],h=n(r,c),f=-1,p=1/0;for(let v of[h-1,h]){if(v<0||v>=r.length)continue;let b=Math.abs(r[v]-c);b<p&&(p=b,f=i[v])}if(f<0)throw new Error(`No replay step found near TR ${l} unix_ts ${c}`);mw[l]=f}}function Yo(e){if(De[e])return De[e];let t=ct[g.game].levels[e];if(!t)throw new Error(`Level ${e} not found for game ${g.game}`);let s=Rs.buildLevel(t);return De[e]=s,s}function Qo(e,w){let t={};for(let[s,o]of Object.entries(e.sprites))t[s]=o.map(r=>({id:r.id,key:r.key,x:r.col*w,y:r.row*w,w,h:w,alive:r.alive,resources:r.resources||{},speed:r.speed,cooldown:r.cooldown,orientation:r.orientation,_age:r._age,lastmove:r.lastmove}));return{score:e.score,time:e.time,sprites:t}}function ae(e){if(!we||!g)return;let w=g.states?.[e];if(!w)return;let t=z?z[e]:-1,o=(t>=0?g.steps[t]:null)?.level??w.level??0,r=Yo(o);r!==mt&&(we.resize(r.width,r.height),mt=r),r.setGameState(Qo(w,r.block_size)),r.ended=w.ended??!1,r.won=w.won??!1,r.lose=w.lose??!1,r.timeout=w.timeout??!1,r.score=w.score??0,r.time=e,we.render(r),Ew&&(r.won?(Ew.textContent="WIN",Ew.className="game-status visible win"):r.lose||r.timeout?(Ew.textContent=r.timeout?"LOSE (timeout)":"LOSE",Ew.className="game-status visible lose"):Ew.className="game-status"),Rw()}function Ye(){if(!g||!mw)return;let e=mw[y];if(e<0)return;let w=g.steps[e],t=w.state_index??w.frame_idx??0;T=t,ae(t)}function Vo(e){let w=m.meta.tr_meta.unix_ts,t=0,s=w.length;for(;t<s;){let r=t+s>>>1;w[r]<e?t=r+1:s=r}let o=t;return t>0&&(t===w.length||e-w[t-1]<w[t]-e)&&(o=t-1),Math.max(0,Math.min(w.length-1,o))}function Ke(e){return e&&typeof e.action=="string"&&e.action.startsWith("_")}function Xo(e,w,t,s,o){let r=null,i=-1;for(let l=t-1;l>=0;l--)if(!Ke(w[l])){r=w[l],i=l;break}if(!r||r.level===s&&r.attempt===o)return;let n="";r.won?n="won":r.lose?n="died":r.timeout&&(n="timeout");let a=0;for(let l=i;l>=0;l--){let c=w[l];if(!Ke(c))if(c.level===r.level&&c.attempt===r.attempt)a+=c.reward??0;else break}n&&(e.push(`--- TRIAL ENDED outcome: ${n}, score: ${a} ---`),e.push("")),e.push(`--- NEW TRIAL (Level ${s}, Attempt ${o}) ---`),e.push("")}function Jo(e,w){let t=e[w];if(t.user_prompt!==void 0)return t.user_prompt;let s=[];return Xo(s,e,w,t.level,t.attempt),s.push(`# Step ${t.step} (Level ${t.level}, Attempt ${t.attempt})`),s.push(""),s.push(t.formatted_obs??""),s.join(`
`)}function Zo(e,w){let t=document.createDocumentFragment(),s=document.createElement("div");s.className="msg msg-user",s.dataset.stepIdx=w;let o=document.createElement("div");o.className="msg-label",o.textContent=`User (Step ${e.step})`,s.appendChild(o);let r=document.createElement("div");r.textContent=Jo(g.steps,w),s.appendChild(r),t.appendChild(s);let i=e.response||{},n=document.createElement("div");n.className="msg msg-assistant",n.dataset.stepIdx=w;let a=document.createElement("div");a.className="msg-label",a.textContent=`Assistant (Step ${e.step})`,n.appendChild(a);let l=[];i.rationale&&l.push(i.rationale),i.action&&l.push(`Action: ${i.action}`);let c=document.createElement("div");return c.textContent=l.join(`

`)||"--",n.appendChild(c),t.appendChild(n),t}N.addEventListener("click",e=>{let w=e.target.closest(".msg[data-step-idx]");if(!w)return;let t=parseInt(w.dataset.stepIdx,10);if(!Number.isFinite(t)||!g||!g.steps||!g.steps[t])return;let s=g.steps[t],o=s.state_index??s.frame_idx??0;L&&K(!1);let r=Us(o);F(r),T=o,ae(o),Mw()});function wr(e){if(N.innerHTML="",dt=-1,Aw=-1,(e.steps||[]).length===0){N.innerHTML='<em style="color:#888">Replay has no steps.</em>';return}if(e.system_prompt){let t=document.createElement("div");t.className="msg msg-system";let s=document.createElement("div");s.className="msg-label",s.textContent="System",t.appendChild(s);let o=document.createElement("div");o.textContent=e.system_prompt,t.appendChild(o),N.appendChild(t)}}var Aw=-1;function er(e,w){if(!g||!g.steps)return 0;let t=0;for(let s=e;s<=w;s++)Ke(g.steps[s])||t++;return t}function tr(e){if(!(!g||!g.steps)&&e!==Aw){if(e>Aw)for(let w=Aw+1;w<=e;w++)Ke(g.steps[w])||N.appendChild(Zo(g.steps[w],w));else{let w=er(e+1,Aw);for(let t=0;t<w*2;t++)N.removeChild(N.lastChild)}Aw=e}}var dt=-1;function Mw(){if(!g||!g.steps)return;let e=-1;z&&T>=0&&T<z.length?e=z[T]:mw&&(e=mw[y]),!(e<0)&&(tr(e),e!==dt&&(dt=e,N.querySelectorAll(".msg").forEach(w=>{w.classList.toggle("active",Number(w.dataset.stepIdx)===e)}),N.scrollTop=N.scrollHeight))}po.addEventListener("click",e=>{m&&(e.target.closest("#try-tab")||(e.stopPropagation(),K(!L),as.classList.add("flash"),setTimeout(()=>as.classList.remove("flash"),350)))});He.addEventListener("click",e=>{if(e.stopPropagation(),!m)return;let w=m.meta.subject,{section:t,vgfmri:s}=gt(w),o=`${vt(m.meta.game)}_${s}`,r=0;if(g&&z){let a=z[T];a>=0&&(r=g.steps[a]?.level??0)}let i=`interactive-gameplay.html?game=${encodeURIComponent(o)}&level=${r}`,n=Ow?.[t]?.[w]?.replays?.[o];n&&(i+=`&replay=${encodeURIComponent(n)}`),window.open(i,"_blank")});function Qe(){return!D||!q.value||!$.value?[]:D.units.filter(e=>e.subject===q.value&&e.game===$.value).map(e=>e.model).sort()}function sr(){$e&&($e.textContent=yt(R.value)||"--");let e=Qe(),w=e.indexOf(R.value);Os.disabled=w<=0,Ts.disabled=w<0||w>=e.length-1}function or(){let e=document.getElementById("model-picker-overlay"),w=document.getElementById("model-picker-items");if(!e||!w)return;w.innerHTML="";let t=Qe();for(let s of t){let o=document.createElement("div");o.className="model-picker-item"+(s===R.value?" active":"");let r=document.createElement("button");if(r.type="button",r.className="name-btn",r.textContent=yt(s),r.addEventListener("click",()=>{Rt(),It(s)}),o.appendChild(r),ns[s]){let i=document.createElement("a");i.className="hf-link",i.href=ns[s],i.target="_blank",i.rel="noopener noreferrer",i.textContent="Hugging Face",i.addEventListener("click",n=>n.stopPropagation()),o.appendChild(i)}w.appendChild(o)}e.classList.add("open")}function Rt(){let e=document.getElementById("model-picker-overlay");e&&e.classList.remove("open")}{let e=document.getElementById("model-picker-overlay");e&&e.addEventListener("click",w=>{w.target===e&&Rt()}),$e&&$e.addEventListener("click",w=>{w.stopPropagation(),or()})}function It(e){!e||e===R.value||(R.value=e,Fe(),bt({preserveState:!0}).catch(w=>{console.error(w),ow.textContent=`Switch failed: ${w.message}`}))}Os.addEventListener("click",()=>{let e=Qe(),w=e.indexOf(R.value);w>0&&It(e[w-1])});Ts.addEventListener("click",()=>{let e=Qe(),w=e.indexOf(R.value);w>=0&&w<e.length-1&&It(e[w+1])});async function rr(){ko(),await Eo();let e=H("subject")||"sub-13",w=H("game")||"bait",t=H("model")||"qwen35_27b",s=H("stream")||"main";if(!As&&D&&Ow){let o=w.toLowerCase();if(!D.units.some(i=>i.subject===e&&i.game.toLowerCase()===o))try{let{section:i,vgfmri:n}=gt(e),a=`${vt(o)}_${n}`,l=Ow[i]?.[e]?.replays?.[a];if(l){window.location.replace(`replay.html?grid-key=${encodeURIComponent(l)}`);return}}catch{}}if([...q.options].some(o=>o.value===e)&&(q.value=e,Ps()),[...$.options].some(o=>o.value===w)&&($.value=w,Ns()),[...R.options].some(o=>o.value===t))R.value=t,Fe();else{let o=[...R.options].map(r=>r.value).find(r=>r&&r!=="");o&&(R.value=o,Fe())}if([...P.options].some(o=>o.value===s)&&(P.value=s,U.disabled=!1),!U.disabled)try{await bt(),ir(),qe()}catch(o){console.error(o),ow.textContent=`Default load failed: ${o.message}`}}function ir(){if(!m)return;let e=H("roi"),w=H("layer"),t=H("level"),s=H("episode"),o=!1;if(e&&m.meta.rois.includes(e)&&e!==M&&(M=e,o=!0),w!=null){let n=parseInt(w,10);Number.isFinite(n)&&m.meta.layer_indices.includes(n)&&(ww.set(M,n),o=!0)}o&&We();let r=H("tr"),i=-1;if(r!=null){let n=parseInt(r,10);Number.isFinite(n)&&(i=Math.max(0,Math.min(m.meta.n_TR-1,n)))}else if(t!=null&&s!=null){let n=parseInt(t,10),a=parseInt(s,10),l=m.meta.tr_meta;if(l&&l.level&&l.play){let c=[];for(let h=0;h<m.meta.n_TR;h++){if(l.level[h]!==n)continue;let f=l.play[h],p=c.indexOf(f);if(p<0&&(c.push(f),p=c.length-1),p===a){i=h;break}}}}i>=0&&(y=i,x=Math.max(0,y-ew),W.value=y,Q.value=x,ne(),Lw()),Tw(),Ye(),Mw(),zs()}var ks=!1;function zs(){if(ks||!m||!pw||!g||!g.states||g.states.length===0||!nr(pw))return;ks=!0,K(!0);let e=()=>xo().catch(()=>{});typeof requestIdleCallback=="function"?requestIdleCallback(e,{timeout:5e3}):setTimeout(e,1500)}function nr(e){let w=e.getBoundingClientRect(),t=window.innerHeight||document.documentElement.clientHeight;return w.top<t&&w.bottom>0}var xs=typeof IntersectionObserver<"u"?new IntersectionObserver(e=>{for(let w of e)w.isIntersecting&&zs()},{threshold:.15}):null;xs&&pw&&xs.observe(pw);rr();})();
