// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var Ze=class{constructor(){this._register={}}has(w){return w in this._register}register(w,t){this._register[w]=t}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[t,s]of Object.entries(w))this.register(t,s)}},h=new Ze;var Sw=class e{constructor(w,t,s,r){this.x=w,this.y=t,this.w=s,this.h=r}static fromPosSize(w,t){return new e(w[0],w[1],t[0],t[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,t){return typeof w=="object"&&w!==null?new e(this.x+w.x,this.y+w.y,this.w,this.h):new e(this.x+w,this.y+t,this.w,this.h)}copy(){return new e(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let t=[];for(let s=0;s<w.length;s++)this.colliderect(w[s].rect||w[s])&&t.push(s);return t}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var A=class e{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,t=0;for(let s of this.keys)s==="LEFT"&&(w-=1),s==="RIGHT"&&(w+=1),s==="UP"&&(t-=1),s==="DOWN"&&(t+=1);return{x:w,y:t}}equals(w){if(!(w instanceof e)||this.keys.length!==w.keys.length)return!1;for(let t=0;t<this.keys.length;t++)if(this.keys[t]!==w.keys[t])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},wt={NOOP:new A,UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),SPACE:new A("SPACE"),SPACE_RIGHT:new A("SPACE","RIGHT"),SPACE_LEFT:new A("SPACE","LEFT")},Gt=wt.NOOP;var et=[129,199,132],he=[25,118,210],fe=[211,47,47],tt=[69,90,100],pe=[250,250,250],tr=[109,76,65],st=[55,71,79],rt=[230,81,0],sr=[255,245,157],rr=[255,138,128],or=[255,196,0],ir=[255,82,82],nr=[255,112,67],ar=[144,202,249],lr=[185,246,202],cr=[207,216,220],ur=[68,90,100],hr=[1,87,155],fr=[92,107,192],pr=[200,150,220],mr=[255,230,230],me={GREEN:et,BLUE:he,RED:fe,GRAY:tt,WHITE:pe,BROWN:tr,BLACK:st,ORANGE:rt,YELLOW:sr,PINK:rr,GOLD:or,LIGHTRED:ir,LIGHTORANGE:nr,LIGHTBLUE:ar,LIGHTGREEN:lr,LIGHTGRAY:cr,DARKGRAY:ur,DARKBLUE:hr,PURPLE:fr,LIGHTPURPLE:pr,LIGHTPINK:mr},ot={x:0,y:-1},it={x:0,y:1},Ww={x:-1,y:0},Z={x:1,y:0},bw=[ot,Ww,it,Z];function jw(e,w){return e.x===w.x&&e.y===w.y}function dr(e){return Math.sqrt(e.x*e.x+e.y*e.y)}function ww(e){let w=dr(e);return w>0?{x:e.x/w,y:e.y/w}:{x:1,y:0}}var kw=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let t=w.speed===null?1:w.speed;t!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,t*this.gridsize[0])}activeMovement(w,t,s){if(s==null&&(s=w.speed===null?1:w.speed),s!==0&&t!==null&&t!==void 0){let r;if(t.asVector?r=t.asVector():r=t,jw(r,{x:0,y:0}))return;w._updatePosition(r,s*this.gridsize[0])}}distance(w,t){return Math.abs(w.top-t.top)+Math.abs(w.left-t.left)}};var vr=me,L=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:t,id:s,pos:r,size:o=[1,1],color:i,speed:n,cooldown:a,physicstype:l,rng:c,img:u,resources:f,...m}=w;this.key=t,this.id=s;let v=Array.isArray(o)?o:[o,o];this.rect=new Sw(r[0],r[1],v[0],v[1]),this.lastrect=this.rect,this.alive=!0;let S=l||this.constructor.physicstype||kw;if(this.physics=new S(v),this.speed=n??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=u||null,this.color=i||this.constructor.color,this.img&&this.img.startsWith("colors/")){let k=this.img.split("/")[1],g=vr[k];g&&(this.color=g)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(f?{...f}:{},{get(k,g){return typeof g=="string"&&!(g in k)&&g!=="toJSON"&&g!=="then"&&g!==Symbol.toPrimitive&&g!==Symbol.toStringTag&&g!=="inspect"&&g!=="constructor"&&g!=="__proto__"?0:k[g]},set(k,g,x){return k[g]=x,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[k,g]of Object.entries(m))this[k]=g}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,t){let s,r;if(t==null){let o=this.speed||0;s=w.x*o,r=w.y*o}else s=w.x*t,r=w.y*t;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:s,y:r}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},j=class extends L{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},de=class extends L{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var ge=class extends L{static color=tt;static is_static=!0},ve=class extends L{static color=fe},ye=class extends j{static is_static=!0},qw=class extends L{static color=fe;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},cw=class extends L{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||Z)}},zw=class extends cw{static speed=1},Yw=class extends cw{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};Yw.limit=1;var xw=class extends L{static stype=null},Se=class extends xw{static is_static=!0;static is_stochastic=!0;static color=he},_w=class extends xw{static color=st;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},Qw=class extends L{static speed=1;static is_stochastic=!0;update(w){super.update(w);let t=bw[Math.floor(w.randomGenerator.random()*bw.length)];this.physics.activeMovement(this,t)}},Vw=class extends Qw{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let t=1e100,s=[],r=w.getSprites(this.stype);for(let o of r){let i=this.physics.distance(this.rect,o.rect);i<t?(t=i,s=[o]):i===t&&s.push(o)}return s}_movesToward(w,t){let s=[],r=this.physics.distance(this.rect,t.rect);for(let o of bw){let i=this.rect.move(o),n=this.physics.distance(i,t.rect);this.fleeing&&r<n&&s.push(o),!this.fleeing&&r>n&&s.push(o)}return s}update(w){L.prototype.update.call(this,w);let t=[];for(let r of this._closestTargets(w))t.push(...this._movesToward(w,r));t.length===0&&(t=[...bw]);let s=t[Math.floor(w.randomGenerator.random()*t.length)];this.physics.activeMovement(this,s)}},be=class extends Vw{constructor(w){super({...w,fleeing:!0})}},ke=class extends _w{static color=rt;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||Z),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),_w.prototype.update.call(this,w)}},xe=class extends zw{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let s;this.orientation.x>0?s=1:this.orientation.x<0?s=-1:s=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:s,y:0})}super.update(w)}},_e=class extends cw{static is_static=!0;static color=he;static strength=1;static draw_arrow=!0},Ee=class e extends qw{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let t of bw)w.randomGenerator.random()<(this.spreadprob||e.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h])}};function Ie(e,w){let t=[...w.active_keys].sort();for(let s=Math.max(3,t.length);s>=0;s--)for(let r of yr(t,s)){let o=r.join(",");if(e._keysToAction.has(o))return e._keysToAction.get(o)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function yr(e,w){if(w===0)return[[]];if(e.length===0)return[];let t=[];function s(r,o){if(o.length===w){t.push([...o]);return}for(let i=r;i<e.length;i++)o.push(e[i]),s(i+1,o),o.pop()}return s(0,[]),t}function Pt(e){let w=new Map;for(let t of Object.values(e)){let s=[...t.keys].sort().join(",");w.set(s,t)}return w}var Xw=class extends L{static color=pe;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let t=this.constructor.declarePossibleActions();this._keysToAction=Pt(t)}static declarePossibleActions(){return{UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){L.prototype.update.call(this,w);let t=Ie(this,w);t.equals(Gt)||this.physics.activeMovement(this,t)}},uw=class extends L{static color=pe;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||Z);let t=this.constructor.declarePossibleActions();this._keysToAction=Pt(t)}static declarePossibleActions(){return{UP:new A("UP"),DOWN:new A("DOWN"),LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){let t=this.orientation;this.orientation={x:0,y:0},L.prototype.update.call(this,w);let s=Ie(this,w);s&&this.physics.activeMovement(this,s);let r=this.lastdirection;Math.abs(r.x)+Math.abs(r.y)!==0?this.orientation=r:this.orientation=t}},Ae=class extends uw{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=uw.declarePossibleActions();return w.SPACE=new A("SPACE"),w}update(w){uw.prototype.update.call(this,w);let t=Ie(this,w);this._hasAmmo()&&t.equals(wt.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let t=this._shootDirections(w);for(let s of t){let r=[this.lastrect.x+s.x*this.lastrect.w,this.lastrect.y+s.y*this.lastrect.h],o=w.createSprite(this.stype,r);o&&o.orientation!==void 0&&(o.orientation=s)}this._spendAmmo()}_shootDirections(w){return[ww(this.orientation)]}},hw=class extends Xw{static declarePossibleActions(){return{LEFT:new A("LEFT"),RIGHT:new A("RIGHT"),NO_OP:new A}}update(w){L.prototype.update.call(this,w);let t=Ie(this,w),s=t.asVector();(jw(s,Z)||jw(s,Ww))&&this.physics.activeMovement(this,t)}},Re=class extends hw{static color=et;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=hw.declarePossibleActions();return w.SPACE=new A("SPACE"),w}update(w){hw.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function tw(e,w,t){t.killSprite(e)}function Nt(e,w,t){t.killSprite(e),t.killSprite(w)}function Dt(e,w,t){t.addSpriteCreation(e.key,[e.rect.x,e.rect.y])}function Ew(e,w,t,{stype:s="wall"}={}){let r=e.lastrect;t.killSprite(e);let o=t.addSpriteCreation(s,e.rect.topleft);o!=null&&(o.lastrect=r,e.orientation!==void 0&&o.orientation!==void 0&&(o.orientation=e.orientation))}function $t(e,w,t,{resource:s,limit:r=1,no_symmetry:o=!1,exhaustStype:i=null}={}){e.resources[s]<r?Jw(e,w,t,{no_symmetry:o}):i?t.kill_list.includes(w)||Ew(w,e,t,{stype:i}):tw(w,e,t)}function Jw(e,w,t,{no_symmetry:s=!1}={}){!t.kill_list.includes(w)&&!t.kill_list.includes(e)&&(e.rect.equals(e.lastrect)&&!s?(w.rect=w.lastrect,nt(w,0)):(e.rect=e.lastrect,nt(e,0)))}function nt(e,w){w>5||e.just_pushed&&(e.just_pushed.rect=e.just_pushed.lastrect,nt(e.just_pushed,w+1))}function Ht(e,w,t){for(let s of t.sprite_registry.sprites())s.rect=s.lastrect}function at(e,w){return e.just_pushed&&w<3?at(e.just_pushed,w+1):e.lastdirection}function Ft(e,w,t){let s=at(w,0);Math.abs(s.x)+Math.abs(s.y)===0?(s=at(e,0),w.physics.activeMovement(w,ww(s)),w.just_pushed=e):(e.physics.activeMovement(e,ww(s)),e.just_pushed=w)}function Ut(e,w,t,{exhaustStype:s=null}={}){if(e.lastrect.colliderect(w.rect))return;let r=e.lastdirection;if(Math.abs(r.x)+Math.abs(r.y)===0)return;let i=ww(r),n=e.rect.width,a=e.rect.copy();a.x+=Math.round(i.x)*n,a.y+=Math.round(i.y)*n,!(a.x<0||a.y<0||a.x+a.width>t.screensize[0]||a.y+a.height>t.screensize[1])&&(e.rect=a,e.lastmove=0,s&&Ew(w,e,t,{stype:s}))}function lt(e,w,t,{with_step_back:s=!0}={}){s&&(e.rect=e.lastrect),e.orientation!==void 0&&(e.orientation={x:-e.orientation.x,y:-e.orientation.y})}function Kt(e,w,t){e.rect=e.lastrect,e.lastmove=e.cooldown,e.physics.activeMovement(e,{x:0,y:1},1),lt(e,w,t,{with_step_back:!1})}function Wt(e,w,t){let s=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];e.orientation=s[Math.floor(t.randomGenerator.random()*s.length)]}function jt(e,w,t,{offset:s=0}={}){e.rect.top<0?e.rect.top=t.screensize[1]-e.rect.height:e.rect.top+e.rect.height>t.screensize[1]&&(e.rect.top=0),e.rect.left<0?e.rect.left=t.screensize[0]-e.rect.width:e.rect.left+e.rect.width>t.screensize[0]&&(e.rect.left=0),e.lastmove=0}function qt(e,w,t){if(!(e instanceof j))throw new Error(`collectResource: sprite must be a Resource, got ${e.constructor.name}`);let s=e.resource_type,r=t.domain.resources_limits&&t.domain.resources_limits[s]||1/0;w.resources[s]=Math.max(0,Math.min(w.resources[s]+e.value,r))}function zt(e,w,t,{resource:s,value:r=1}={}){t.resource_changes.push([e,s,r])}function Yt(e,w,t,{resource:s,value:r=1}={}){t.resource_changes.push([w,s,r]),t.kill_list.push(e)}function Qt(e,w,t,{resource:s,value:r=-1}={}){t.resource_changes.push([w,s,r]),t.kill_list.push(e)}function Vt(e,w,t,{resource:s,limit:r=1}={}){w.resources[s]>=r&&tw(e,w,t)}function Xt(e,w,t,{resource:s,limit:r=1}={}){e.resources[s]>=r&&tw(e,w,t)}function Jt(e,w,t,{resource:s,limit:r=1}={}){w.resources[s]<=r&&tw(e,w,t)}function Zt(e,w,t,{resource:s,limit:r=1}={}){e.resources[s]<=r&&tw(e,w,t)}function ws(e,w,t,{resource:s,stype:r,limit:o=1}={}){e.resources[s]>=o&&t.addSpriteCreation(r,[e.rect.x,e.rect.y])}function es(e,w,t){t.kill_list.includes(w)||tw(e,w,t)}function ts(e,w,t){let s=e.lastrect,r=ww(w.orientation);e.physics.activeMovement(e,r,w.strength||1),e.lastrect=s}function ss(e,w,t){if(!as(e,t,"t_lastpull"))return;let s=e.lastrect,r=w.lastdirection,i=Math.abs(r.x)+Math.abs(r.y)>0?ww(r):{x:1,y:0};e._updatePosition(i,(w.speed||1)*e.physics.gridsize[0]),e.lastrect=s}function rs(e,w,t){let s=t.sprite_registry.withStype(w.stype||w.key);if(s.length>0){let r=s[Math.floor(t.randomGenerator.random()*s.length)];e.rect=r.rect.copy()}e.lastmove=0}function os(e,w,t,{exhaustStype:s=null}={}){if(e.lastrect.colliderect(w.rect))return;let r=t.sprite_registry.group(w.key).filter(i=>i!==w);if(r.length===0)return;let o=r[Math.floor(t.randomGenerator.random()*r.length)];e.rect=o.rect.copy(),e.lastrect=o.rect.copy(),e.lastmove=0,s&&(Ew(w,e,t,{stype:s}),Ew(o,e,t,{stype:s}))}function is(e,w,t,{friction:s=0}={}){as(e,t,"t_lastbounce")&&(e.speed!==null&&(e.speed*=1-s),Jw(e,w,t),e.orientation!==void 0&&(Math.abs(e.rect.centerx-w.rect.centerx)>Math.abs(e.rect.centery-w.rect.centery)?e.orientation={x:-e.orientation.x,y:e.orientation.y}:e.orientation={x:e.orientation.x,y:-e.orientation.y}))}function ns(e,w,t,{friction:s=0}={}){if(Jw(e,w,t),e.orientation!==void 0){let r=e.orientation,o=ww({x:-e.rect.centerx+w.rect.centerx,y:-e.rect.centery+w.rect.centery}),i=o.x*r.x+o.y*r.y;e.orientation={x:-2*i*o.x+r.x,y:-2*i*o.y+r.y},e.speed!==null&&(e.speed*=1-s)}}function as(e,w,t){return t in e._effect_data&&e._effect_data[t]===w.time?!1:(e._effect_data[t]=w.time,!0)}var Aw=class{constructor({win:w=!0,scoreChange:t=0}={}){this.win=w,this.score=t}isDone(w){return[!1,null]}},Oe=class extends Aw{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},Le=class extends Aw{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},Te=class extends Aw{constructor(w={}){let{win:t=!0,scoreChange:s=0,limit:r=0,...o}=w;super({win:t,scoreChange:s}),this.limit=r,this.stypes=[];for(let[i,n]of Object.entries(o))i.startsWith("stype")&&this.stypes.push(n)}isDone(w){let t=0;for(let s of this.stypes)t+=w.numSprites(s);return t===this.limit?[!0,this.win]:[!1,null]}},Me=class extends Aw{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let t=w.getAvatars();return t.length===0?[!1,null]:[(t[0].resources[this.stype]||0)>=this.limit,this.win]}};var Ce=class e{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,t,s,r){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(t==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=t,this.classArgs[w]=s,this.stypes[w]=r,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let t=(this._liveSpritesByKey[w]||[]).map(o=>parseInt(o.id.split(".").pop())),s=(this._deadSpritesByKey[w]||[]).map(o=>parseInt(o.id.split(".").pop())),r=t.concat(s);return r.length>0?Math.max(...r)+1:1}generateId(w){let t=this._generateIdNumber(w);return`${w}.${t}`}createSprite(w,t){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:s,args:r,stypes:o}=this.getSpriteDef(w),i=t.id||this.generateId(w),n={...r,...t,key:w,id:i},a=new s(n);return a.stypes=o,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[i]=a,a}killSprite(w){w.alive=!1;let t=w.key,s=this._liveSpritesByKey[t];if(s){let r=s.indexOf(w);r!==-1&&(s.splice(r,1),this._deadSpritesByKey[t]||(this._deadSpritesByKey[t]=[]),this._deadSpritesByKey[t].push(w))}}group(w,t=!1){let s=this._liveSpritesByKey[w]||[];if(!t)return s;let r=this._deadSpritesByKey[w]||[];return s.concat(r)}*groups(w=!1){for(let t of this.spriteKeys)if(w){let s=this._liveSpritesByKey[t]||[],r=this._deadSpritesByKey[t]||[];yield[t,s.concat(r)]}else yield[t,this._liveSpritesByKey[t]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let t of this.spriteKeys){let s=this._liveSpritesByKey[t]||[];for(let r of s)yield r}}spritesArray(){let w=[];for(let t of this.spriteKeys){let s=this._liveSpritesByKey[t]||[];for(let r of s)w.push(r)}return w}withStype(w,t=!1){if(this.spriteKeys.includes(w))return this.group(w,t);let s=[];for(let r of this.spriteKeys)if(this.stypes[r]&&this.stypes[r].includes(w)){let o=t?(this._liveSpritesByKey[r]||[]).concat(this._deadSpritesByKey[r]||[]):this._liveSpritesByKey[r]||[];s.push(...o)}return s}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let t=w;for(;t&&t.name;){if(t.name.includes("Avatar"))return!0;t=Object.getPrototypeOf(t)}return!1}deepCopy(){let w=new e;w.classes={...this.classes},w.classArgs={};for(let[t,s]of Object.entries(this.classArgs))w.classArgs[t]={...s};w.stypes={};for(let[t,s]of Object.entries(this.stypes))w.stypes[t]=[...s];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var ct=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},ut=class{constructor(w,t,{scoreChange:s=0}={}){this.actor_stype=w,this.actee_stype=t,this.score=s,this.is_stochastic=!1}call(w,t,s){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},Zw=class extends ut{constructor(w,t,s,r={}){let o=r.scoreChange||0;super(t,s,{scoreChange:o}),this.callFn=w;let{scoreChange:i,...n}=r;this.fnArgs=n,this._name=w.name||"anonymous"}call(w,t,s){return Object.keys(this.fnArgs).length>0?this.callFn(w,t,s,this.fnArgs):this.callFn(w,t,s)}get name(){return this._name}},Rw=class{constructor(w,t={}){this.domain_registry=w,this.title=t.title||null,this.seed=t.seed!==void 0?t.seed:42,this.block_size=t.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(t=>t.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:t,args:s}]of this.domain_registry.getSpriteDefs())if(t.prototype instanceof j||t===j){let r=w;s.res_type&&(r=s.res_type),s.color&&(this.resources_colors[r]=s.color),s.limit!==void 0&&(this.resources_limits[r]=s.limit),this.notable_resources.push(r)}}buildLevel(w){let t=w.split(`
`).filter(n=>n.length>0),s=t.map(n=>n.length),r=Math.min(...s),o=Math.max(...s);if(r!==o)throw new Error(`Inconsistent line lengths: min=${r}, max=${o}`);let i=new ht(this,this.domain_registry.deepCopy(),w,s[0],t.length,this.seed);for(let n=0;n<t.length;n++)for(let a=0;a<t[n].length;a++){let l=t[n][a],c=this.char_mapping[l];if(c){let u=[a*this.block_size,n*this.block_size];i.createSprites(c,u)}}return i.initState=i.getGameState(),i}},ht=class{constructor(w,t,s,r,o,i=0){this.domain=w,this.sprite_registry=t,this.levelstring=s,this.width=r,this.height=o,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=i,this.randomGenerator=new ct(i),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new Sw(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,t,s){let r=this.sprite_registry.createSprite(w,{pos:t,id:s,size:[this.block_size,this.block_size],rng:this.randomGenerator});return r&&(this.is_stochastic=this.domain.is_stochastic||r.is_stochastic||this.is_stochastic),r}createSprites(w,t){return w.map(s=>this.createSprite(s,t)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,t,s){return this.create_list.push([w,t,s]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,t]of this.sprite_registry.groups(!0))t.length>0&&this.sprite_registry.isAvatar(t[0])&&w.push(...t);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let t=this.sprite_registry.spritesArray();for(let a of t)a.just_pushed=null;for(let a of t)a.update(this);this.events_triggered=[];let[s,r,o]=this._moveEventHandling(),[i,n]=this._eventHandling(s);this.events_triggered=r.concat(i);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,l,c]of this.create_list)this.createSprite(a,l,c);for(let[a,l,c]of this.resource_changes){let u=this.domain.resources_limits&&this.domain.resources_limits[l]||1/0;a.resources[l]=Math.max(0,Math.min(a.resources[l]+c,u))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],t=[],s={},r=this.domain.collision_eff.filter(i=>i.name==="stepBack"||i.name==="stepBackIfHasLess");for(let i of r){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}let o=this.domain.collision_eff.filter(i=>["bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of o){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}for(let i of r){let[,n,a]=this._applyEffect(i,s);w.push(...n),t.push(...a)}return[s,w,t]}_eventHandling(w){let t=[],s=[],r=this.domain.collision_eff.filter(o=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(o.name));for(let o of r){let[,i,n]=this._applyEffect(o,w);t.push(...i),s.push(...n)}return[t,s]}_applyEffect(w,t){let s=[],r=[],o=w.actor_stype,i=w.actee_stype;if(o in t||(t[o]=this.sprite_registry.withStype(o)),i!=="EOS"&&!(i in t)&&(t[i]=this.sprite_registry.withStype(i)),i==="EOS"){let c=t[o];for(let u=c.length-1;u>=0;u--){let f=c[u];this.containsRect(f.rect)||(this.addScore(w.score),w.call(f,null,this),s.push([w.name,f.id,"EOS"]),r.push([w.name,f.key,"EOS",[f.rect.x,f.rect.y],[null,null]]),!this.containsRect(f.rect)&&f.alive&&this.killSprite(f))}return[t,s,r]}let n=t[o],a=t[i];if(n.length===0||a.length===0)return[t,s,r];let l=!1;n.length>a.length&&([n,a]=[a,n],l=!0);for(let c of n)for(let u of a)c!==u&&c.rect.colliderect(u.rect)&&(l?this.kill_list.includes(u)||(this.addScore(w.score),w.call(u,c,this),s.push([w.name,u.id,c.id]),r.push([w.name,u.key,c.key,[u.rect.x,u.rect.y],[c.rect.x,c.rect.y]])):this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,u,this),s.push([w.name,c.id,u.id]),r.push([w.name,c.key,u.key,[c.rect.x,c.rect.y],[u.rect.x,u.rect.y]])));return[t,s,r]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[t,s]=w.isDone(this);if(this.ended=t,this.won=s===null?!1:s,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let t of this.sprite_registry.spriteKeys){let s=this.sprite_registry._liveSpritesByKey[t]||[],r=this.sprite_registry._deadSpritesByKey[t]||[];w[t]=[...s,...r].map(o=>({id:o.id,key:o.key,x:o.rect.x,y:o.rect.y,w:o.rect.w,h:o.rect.h,alive:o.alive,resources:{...o.resources},speed:o.speed,cooldown:o.cooldown,orientation:o.orientation?{...o.orientation}:void 0,_age:o._age,lastmove:o.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[t,s]of Object.entries(w.sprites))for(let r of s){let o=this.sprite_registry.createSprite(t,{id:r.id,pos:[r.x,r.y],size:[r.w,r.h],rng:this.randomGenerator});o&&(o.resources=new Proxy({...r.resources},{get(i,n){return typeof n=="string"&&!(n in i)&&n!=="toJSON"&&n!=="then"&&n!==Symbol.toPrimitive&&n!==Symbol.toStringTag&&n!=="inspect"&&n!=="constructor"&&n!=="__proto__"?0:i[n]},set(i,n,a){return i[n]=a,!0}}),r.speed!==void 0&&(o.speed=r.speed),r.cooldown!==void 0&&(o.cooldown=r.cooldown),r.orientation&&(o.orientation={...r.orientation}),r._age!==void 0&&(o._age=r._age),r.lastmove!==void 0&&(o.lastmove=r.lastmove),o.alive=r.alive,r.alive||this.sprite_registry.killSprite(o))}}};function ls(){h.register("VGDLSprite",L),h.register("Immovable",ge),h.register("Passive",ve),h.register("Resource",j),h.register("ResourcePack",ye),h.register("Flicker",qw),h.register("OrientedFlicker",Yw),h.register("OrientedSprite",cw),h.register("Missile",zw),h.register("SpawnPoint",_w),h.register("SpriteProducer",xw),h.register("Portal",Se),h.register("RandomNPC",Qw),h.register("Chaser",Vw),h.register("Fleeing",be),h.register("Bomber",ke),h.register("Walker",xe),h.register("Conveyor",_e),h.register("Spreader",Ee),h.register("Immutable",de),h.register("MovingAvatar",Xw),h.register("OrientedAvatar",uw),h.register("ShootAvatar",Ae),h.register("HorizontalAvatar",hw),h.register("FlakAvatar",Re),h.register("killSprite",tw),h.register("killBoth",Nt),h.register("cloneSprite",Dt),h.register("transformTo",Ew),h.register("stepBack",Jw),h.register("stepBackIfHasLess",$t),h.register("undoAll",Ht),h.register("bounceForward",Ft),h.register("catapultForward",Ut),h.register("reverseDirection",lt),h.register("turnAround",Kt),h.register("flipDirection",Wt),h.register("wrapAround",jt),h.register("collectResource",qt),h.register("changeResource",zt),h.register("addResource",Yt),h.register("removeResource",Qt),h.register("killIfOtherHasMore",Vt),h.register("killIfHasMore",Xt),h.register("killIfOtherHasLess",Jt),h.register("killIfHasLess",Zt),h.register("spawnIfHasMore",ws),h.register("killIfAlive",es),h.register("conveySprite",ts),h.register("pullWithIt",ss),h.register("teleportToExit",rs),h.register("teleportToOther",os),h.register("wallBounce",is),h.register("bounceDirection",ns),h.register("Timeout",Oe),h.register("SpriteCounter",Le),h.register("MultiSpriteCounter",Te),h.register("ResourceCounter",Me),h.register("GridPhysics",kw),h.register("BasicGame",Rw);for(let[e,w]of Object.entries(me))h.register(e,w);h.register("UP",ot),h.register("DOWN",it),h.register("LEFT",Ww),h.register("RIGHT",Z)}var Be=class{constructor(w,t=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=t}resize(w,t){this.canvas.width=w*this.cellSize,this.canvas.height=t*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let t=w.block_size,s=this.cellSize/t;for(let r of w.domain.sprite_order){let o=w.sprite_registry._liveSpritesByKey[r]||[];for(let i of o)this._drawSprite(i,s,t)}this._drawHUD(w)}_drawSprite(w,t,s){let r=w.rect.x*t,o=w.rect.y*t,i=w.rect.w*t,n=w.rect.h*t,a=null,l=null;if(w.img){let S=this._parseImg(w.img);a=S.color,l=S.shape}a||(a=w.color),a||(a=[128,128,128]);let c=w.shrinkfactor||0,u=r+i*c/2,f=o+n*c/2,m=i*(1-c),v=n*(1-c);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,l?this._drawShape(l,u,f,m,v):this.ctx.fillRect(u,f,m,v),w.orientation&&w.draw_arrow&&this._drawArrow(u,f,m,v,w.orientation,a),w.is_avatar&&this._drawResources(w,u,f,m,v)}_parseImg(w){let t={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let s=w.split("/")[1];return{color:t[s]||null,shape:null}}if(w.startsWith("colored_shapes/")){let s=w.split("/")[1],r=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let o of r)if(s.endsWith("_"+o)){let i=s.slice(0,-(o.length+1));return{color:t[i]||null,shape:o}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,t,s,r,o){let i=this.ctx,n=t+r/2,a=s+o/2,l=r/2,c=o/2,u=2/24,f=l*(1-2*u),m=c*(1-2*u);switch(i.beginPath(),w){case"CIRCLE":i.ellipse(n,a,f,m,0,0,Math.PI*2);break;case"TRIANGLE":{let v=a-m,S=a+m,k=n-f,g=n+f;i.moveTo(n,v),i.lineTo(g,S),i.lineTo(k,S),i.closePath();break}case"DIAMOND":i.moveTo(n,a-m),i.lineTo(n+f,a),i.lineTo(n,a+m),i.lineTo(n-f,a),i.closePath();break;case"STAR":{let v=Math.min(f,m),S=v*.4;for(let k=0;k<5;k++){let g=-Math.PI/2+k*(2*Math.PI/5),x=g+Math.PI/5;k===0?i.moveTo(n+v*Math.cos(g),a+v*Math.sin(g)):i.lineTo(n+v*Math.cos(g),a+v*Math.sin(g)),i.lineTo(n+S*Math.cos(x),a+S*Math.sin(x))}i.closePath();break}case"CROSS":{let v=f*2/3,S=v/2;i.rect(n-f,a-S,f*2,v),i.rect(n-S,a-m,v,m*2);break}case"HEXAGON":{let v=Math.min(f,m);for(let S=0;S<6;S++){let k=Math.PI/6+S*(Math.PI/3),g=n+v*Math.cos(k),x=a+v*Math.sin(k);S===0?i.moveTo(g,x):i.lineTo(g,x)}i.closePath();break}case"SQUARE":{let v=Math.min(f,m)*.05;i.rect(n-f+v,a-m+v,(f-v)*2,(m-v)*2);break}case"PENTAGON":{let v=Math.min(f,m);for(let S=0;S<5;S++){let k=-Math.PI/2+S*(2*Math.PI/5),g=n+v*Math.cos(k),x=a+v*Math.sin(k);S===0?i.moveTo(g,x):i.lineTo(g,x)}i.closePath();break}default:i.rect(t,s,r,o)}i.fill()}_drawArrow(w,t,s,r,o,i){let n=w+s/2,a=t+r/2,l=Math.min(s,r)*.3,c=[i[0],255-i[1],i[2]];this.ctx.strokeStyle=`rgb(${c[0]}, ${c[1]}, ${c[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(n,a),this.ctx.lineTo(n+o.x*l,a+o.y*l),this.ctx.stroke()}_drawResources(w,t,s,r,o){let i=w.resources,n=0,a=3;for(let l of Object.keys(i)){if(l==="toJSON")continue;let c=i[l];if(c>0){let u=s+o+n*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(t,u,r*Math.min(c/5,1),a),n++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let t=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,t),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};function cs(e){if(!e.delta_encoded)return;let w=e.states;if(!w||w.length<2){delete e.delta_encoded;return}let t=w[0].sprites;for(let s=1;s<w.length;s++){if(!("sprites"in w[s]))w[s].sprites=Object.assign({},t);else{let r=Object.assign({},t,w[s].sprites);for(let o in r)r[o]===null&&delete r[o];w[s].sprites=r}t=w[s].sprites}delete e.delta_encoded}var Ge=class{constructor(w,t,s=null){this.children=[],this.content=w,this.indent=t,this.parent=null,s&&s.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function Sr(e,w=8){e=e.replace(/\t/g," ".repeat(w));let t=e.split(`
`),s=new Ge("",-1);for(let r of t){r.includes("#")&&(r=r.split("#")[0]);let o=r.trim();if(o.length>0){let i=r.length-r.trimStart().length;s=new Ge(o,i,s)}}return s.getRoot()}var Pe=class{constructor(){this.verbose=!1}parseGame(w,t={}){let s=w;typeof s=="string"&&(s=Sr(s).children[0]);let[r,o]=this._parseArgs(s.content);Object.assign(o,t),this.spriteRegistry=new Ce,this.game=new Rw(this.spriteRegistry,o);for(let i of s.children)i.content.startsWith("SpriteSet")&&this.parseSprites(i.children),i.content==="InteractionSet"&&this.parseInteractions(i.children),i.content==="LevelMapping"&&this.parseMappings(i.children),i.content==="TerminationSet"&&this.parseTerminations(i.children);return this.game.finishSetup(),this.game}_eval(w){if(h.has(w))return h.request(w);let t=Number(w);return isNaN(t)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:t}_parseArgs(w,t=null,s=null){s||(s={});let r=w.split(/\s+/).filter(o=>o.length>0);if(r.length===0)return[t,s];r[0].includes("=")||(t=this._eval(r[0]),r.shift());for(let o of r){let i=o.indexOf("=");if(i===-1)continue;let n=o.substring(0,i),a=o.substring(i+1);s[n]=this._eval(a)}return[t,s]}parseSprites(w,t=null,s={},r=[]){for(let o of w){if(!o.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${o.content}`);let[i,n]=o.content.split(">").map(u=>u.trim()),[a,l]=this._parseArgs(n,t,{...s}),c=[...r,i];if("singleton"in l&&(l.singleton===!0&&this.spriteRegistry.registerSingleton(i),delete l.singleton),o.children.length===0){this.verbose&&console.log("Defining:",i,a,l,c),this.spriteRegistry.registerSpriteClass(i,a,l,c);let u=this.game.sprite_order.indexOf(i);u!==-1&&this.game.sprite_order.splice(u,1),this.game.sprite_order.push(i)}else this.parseSprites(o.children,a,l,c)}}parseInteractions(w){for(let t of w){if(!t.content.includes(">"))continue;let[s,r]=t.content.split(">").map(a=>a.trim()),[o,i]=this._parseArgs(r),n=s.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<n.length;a++){let l=n[0],c=n[a],u;if(typeof o=="function"&&!o.prototype)u=new Zw(o,l,c,i);else if(typeof o=="function")u=new Zw(o,l,c,i);else throw new Error(`Unknown effect type: ${o}`);this.game.collision_eff.push(u)}}}parseTerminations(w){for(let t of w){let[s,r]=this._parseArgs(t.content);this.game.terminations.push(new s(r))}}parseMappings(w){for(let t of w){let[s,r]=t.content.split(">").map(i=>i.trim());if(s.length!==1)throw new Error(`Only single character mappings allowed, got: '${s}'`);let o=r.split(/\s+/).filter(i=>i.length>0);this.game.char_mapping[s]=o}}};var ft={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var us=globalThis.ReasonToPlayAssets.catalogueManifestUrl,sw=globalThis.ReasonToPlayAssets.resolveRdmUrl,hs=globalThis.ReasonToPlayAssets.resolveReplayUrl;ls();var Ls=60;async function mw(e,w,{tries:t=3,baseDelayMs:s=250}={}){let r;for(let o=0;o<t;o++){try{let i=await fetch(e,w);if(i.ok||i.status<500&&i.status!==429)return i;r=new Error(`HTTP ${i.status}`)}catch(i){r=i}if(o<t-1){let i=s*Math.pow(2,o)+Math.random()*200;await new Promise(n=>setTimeout(n,i))}}throw r||new Error("fetch failed")}var Ts=new URLSearchParams(window.location.search),ee=typeof window<"u"&&window.EMBED_CONFIG||null,Ms=!!ee||Ts.get("embed")==="1";Ms&&document.body.classList.add("embed-mode");function P(e){if(ee&&ee[e]!==void 0&&ee[e]!==null)return String(ee[e]);let w=Ts.get(e);return w??null}function bt(e){let w=parseInt(e.replace("sub-",""),10);if(!Number.isFinite(w))throw new Error(`bad subject id: ${e}`);return w<=11?{section:"cohort3",vgfmri:"vgfmri3"}:{section:"cohort4",vgfmri:"vgfmri4"}}var br={avoidgeorge:"avoidGeorge",plaqueattack:"plaqueAttack"};function kt(e){return br[e]||e}var kr={dsv32:"DeepSeek-V3.2",dsv4_flash:"DeepSeek-V4-Flash",dsv4_pro:"DeepSeek-V4-Pro",qwen35_9b:"Qwen3.5-9B",qwen35_27b:"Qwen3.5-27B",qwen35_35b_a3b:"Qwen3.5-35B-A3B",qwen35_122b_a10b:"Qwen3.5-122B-A10B"},fs={dsv32:"https://huggingface.co/deepseek-ai/DeepSeek-V3.2-Exp",dsv4_flash:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash",dsv4_pro:"https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro",qwen35_9b:"https://huggingface.co/Qwen/Qwen3.5-9B",qwen35_27b:"https://huggingface.co/Qwen/Qwen3.5-27B",qwen35_35b_a3b:"https://huggingface.co/Qwen/Qwen3.5-35B-A3B",qwen35_122b_a10b:"https://huggingface.co/Qwen/Qwen3.5-122B-A10B"};function qe(e){return kr[e]||e}var Cs=!!window.EMBED_CONFIG;function xt(e,w){if(!Cs){e.textContent=`Layer ${w}`;return}let t=qe(I.value)||"";e.dataset.fitModel=t,e.dataset.fitLayer=String(w),e.textContent=`${t} | Layer ${w}`,requestAnimationFrame(()=>Bs(e))}function Bs(e){if(!Cs)return;let w=e.dataset.fitModel,t=e.dataset.fitLayer;if(!w||t==null)return;e.textContent=`${w} | Layer ${t}`,(e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1)&&(e.textContent=`${w} | L${t}`)}var D=null,dw=null,p=null,d=null,gt=null,te=null,Gs=null,$e={},vt=null,gw=null;var C=null,ae="main",ew=new Map,se=!1,_=0,y=0,ow=Ls,re=!1,M=null,rw=2,b=e=>document.getElementById(e),Y=b("select-subject"),$=b("select-game"),I=b("select-model"),N=b("select-stream"),F=b("btn-load"),iw=b("load-status"),vw=b("main-container"),Ps=b("game-canvas"),nw=b("canvas-wrapper"),ps=b("play-indicator"),xr=b("conversation-panel"),U=b("conversation-content"),He=b("try-tab"),Iw=b("game-status"),Ns=b("btn-model-prev"),Ds=b("btn-model-next"),Fe=b("select-model-quick"),q=b("scrubber-front"),Q=b("scrubber-back"),ms=b("scrubber-window"),ds=b("scrub-back-label"),gs=b("scrub-front-label"),vs=b("meta-label"),$s=b("btn-speed-up"),Hs=b("btn-speed-down"),_r=b("speed-value"),Lw=[.25,.5,1,2,4],Fs=50,T=0,z=null,V=b("roi-grid"),ys=b("btn-expand-all"),ie=b("roi-picker-overlay"),Ss=b("roi-picker-groups"),Er="figures/brain_roi",Ar={Frontal:["IFGtriang","IFGoperc","MFG","SFG","OFC"],Motor:["PreCG","SMA","PoCG","ROL"],Parietal:["IPG","AG","SMG","PCUN"],Visual:["IOG","MOG","SOG","FFG","MTG"],"Early Visual":["LING","CAL","CUN"],Striatal:["Caudate","Putamen","dStriatum"],Cerebellum:["Cerebellum"]},Us={AG:"Angular Gyrus",CAL:"Calcarine Sulcus",Caudate:"Caudate",Cerebellum:"Cerebellum",CUN:"Cuneus",dStriatum:"Dorsal Striatum",FFG:"Fusiform Gyrus",IFGoperc:"IFG (oper.)",IFGtriang:"IFG (triang.)",IOG:"Inf. Occipital",IPG:"Inf. Parietal",LING:"Lingual",MFG:"Mid. Frontal",MOG:"Mid. Occipital",MTG:"Mid. Temporal",OFC:"Orbitofrontal",PCUN:"Precuneus",PoCG:"Postcentral",PreCG:"Precentral",Putamen:"Putamen",ROL:"Rolandic Oper.",SFG:"Sup. Frontal",SMA:"Supp. Motor",SMG:"Supramarginal",SOG:"Sup. Occipital"};function ne(e,w){return`${Er}/thumb_brain_${e}_${w}.png`}var bs=new Set;function Rr(e){for(let w of e)for(let t of["front","side"]){let s=ne(w,t);if(bs.has(s))continue;bs.add(s);let r=new Image;r.decoding="async",r.src=s}}var fw=new Map,oe=new Map;function _t(e,w,t){return`${e}/${w}/${t}`}function Ir(){let e=P("subject")||"sub-13",w=P("game")||"bait",t=P("model")||"qwen35_27b",s=_t(e,w,t);if(fw.has(s)||oe.has(s))return;let r=`${e}__${w}__${t}`,o=sw(`data/${r}.json`),i=sw(`data/${r}.bin`),n=(async()=>{try{let[a,l]=await Promise.all([mw(o),mw(i)]);if(!a.ok||!l.ok)return null;let c=await a.json(),u=new Uint8Array(await l.arrayBuffer());return fw.set(s,{meta:c,blob:u}),{meta:c,blob:u}}catch{return null}})();oe.set(s,n)}var ks=!1;async function Or(){if(ks||(ks=!0,!p||!D))return;let e=typeof navigator<"u"&&(navigator.connection||navigator.mozConnection||navigator.webkitConnection);if(e&&(e.saveData||e.effectiveType&&["slow-2g","2g","3g"].includes(e.effectiveType)))return;let w=p.meta.subject,t=p.meta.game,s=p.meta.model,r=D.units.filter(o=>o.subject===w&&o.game===t&&o.model!==s);for(let o of r){let i=_t(w,t,o.model);if(!fw.has(i))try{let[n,a]=await Promise.all([sw(`data/${o.json}`),sw(`data/${o.bin}`)]),l={priority:"low"},[c,u]=await Promise.all([mw(n,l),mw(a,l)]);if(!c.ok||!u.ok)continue;let f=await c.json(),m=new Uint8Array(await u.arrayBuffer());fw.set(i,{meta:f,blob:m})}catch{}}}var Ks=new WeakMap,Ne=null,xs=[[68,1,84],[71,40,120],[62,74,137],[49,104,142],[38,130,142],[31,158,137],[53,183,121],[110,206,88],[181,222,43],[253,231,37]],Lr=[[5,48,97],[33,102,172],[67,147,195],[146,197,222],[209,229,240],[247,247,247],[253,219,199],[244,165,130],[214,96,77],[178,24,43],[103,0,31]];function pt(e,w){if(w<=0)return e[0];if(w>=1)return e[e.length-1];let t=w*(e.length-1),s=Math.floor(t),r=t-s,o=e[s],i=e[s+1];return[Math.round(o[0]+(i[0]-o[0])*r),Math.round(o[1]+(i[1]-o[1])*r),Math.round(o[2]+(i[2]-o[2])*r)]}async function Tr(){let e=await sw("manifest.json"),w=fetch(us).then(s=>s.ok?s.json():null).then(s=>{dw=s,Zs(P("subject")||"sub-13",P("game")||"bait").catch(()=>{})}).catch(()=>{dw=null}),t=await fetch(e);if(!t.ok){iw.textContent=`Manifest fetch failed: ${t.status}`;return}D=await t.json(),await w,iw.textContent=`${D.units.length} units available`,Mr()}function Mr(){let e=[...new Set(D.units.map(w=>w.subject))].sort();Y.innerHTML='<option value="">-- select --</option>';for(let w of e){let t=document.createElement("option");t.value=w,t.textContent=w,Y.appendChild(t)}}function Ws(){$.innerHTML='<option value="">-- select --</option>',$.disabled=!0,I.innerHTML='<option value="">--</option>',I.disabled=!0,N.innerHTML='<option value="">--</option>',N.disabled=!0,F.disabled=!0;let e=Y.value;if(!e)return;let w=[...new Set(D.units.filter(t=>t.subject===e).map(t=>t.game))].sort();if(w.length!==0){$.disabled=!1;for(let t of w){let s=document.createElement("option");s.value=t,s.textContent=t,$.appendChild(s)}}}function js(){I.innerHTML='<option value="">-- select --</option>',I.disabled=!0,N.innerHTML='<option value="">--</option>',N.disabled=!0,F.disabled=!0;let e=Y.value,w=$.value;if(!e||!w)return;let t=D.units.filter(s=>s.subject===e&&s.game===w).map(s=>s.model).sort();if(t.length!==0){I.disabled=!1;for(let s of t){let r=document.createElement("option");r.value=s,r.textContent=qe(s),I.appendChild(r)}}}function Ue(){N.innerHTML='<option value="">-- select --</option>',N.disabled=!0,F.disabled=!0;let e=I.value;if(!e||!D.model_specs[e])return;let w=D.model_specs[e].streams;N.disabled=!1;for(let t of w){let s=document.createElement("option");s.value=t,s.textContent=t,N.appendChild(s)}N.value=w.includes("main")?"main":w[0],F.disabled=!1}Y.addEventListener("change",Ws);$.addEventListener("change",js);I.addEventListener("change",Ue);N.addEventListener("change",()=>{F.disabled=!(Y.value&&$.value&&I.value&&N.value)});var pw=0,Tw=null;async function Et(e={}){let w=++pw;Tw===null&&(Tw=!!M);try{await Cr(e,w)}catch(t){if(w===pw)throw t}finally{w===pw&&(Tw=null)}}async function Cr({preserveState:e=!1},w){let t=Y.value,s=$.value,r=I.value,o=N.value;if(!t||!s||!r||!o)return;F.disabled=!0,iw.textContent="Fetching unit...";let i=D.units.find(O=>O.subject===t&&O.game===s&&O.model===r);if(!i){iw.textContent=`No unit for ${t}/${s}/${r}`,F.disabled=!1;return}let n=p?.meta?.subject,a=p?.meta?.game,l=e&&n===t&&a===s&&gt===`${t}/${s}`,c=l?null:Zs(t,s).catch(O=>({error:O})),u=y,f=_,m=ow,v=re,S=C,k=T;K(!1,{preserveIntent:!0});let g=_t(t,s,r);oe.has(g)&&(await oe.get(g),oe.delete(g));let x,X;if(fw.has(g)){let O=fw.get(g);x=O.meta,X=O.blob}else{let[O,Ct]=await Promise.all([sw(`data/${i.json}`),sw(`data/${i.bin}`)]),[ue,W]=await Promise.all([mw(O),mw(Ct)]);if(!ue.ok)throw new Error(`meta fetch ${ue.status}`);if(!W.ok)throw new Error(`bin fetch ${W.status}`);x=await ue.json(),X=new Uint8Array(await W.arrayBuffer()),fw.set(g,{meta:x,blob:X})}w===pw&&(p={meta:x,blob:X},Rr(x.rois),ae=o,e&&n===t&&a===s?(_=Math.min(f,x.n_TR-1),y=Math.min(u,x.n_TR-1),ow=m,re=v,C=S&&x.rois.includes(S)?S:x.rois[0],T=k):(_=0,y=0,ow=Ls,re=!1,C=x.rois[0],T=0),ew=new Map,l&&V.children.length>0&&Hr()?Fr():Ye(),vw.classList.add("visible"),await new Promise(O=>requestAnimationFrame(O)),w===pw&&(Vr(x.n_TR,{reset:!l}),Mw(),l&&d&&gw?(wr(d),z=Xs(d),T>=0&&d.states&&T<d.states.length?ce(T):Xe()):await wo(t,s,c,w),w===pw&&(Bw(),iw.textContent=`${t} / ${s} / ${r} (${o}) -- N=${x.n_TR}`,co(),F.disabled=!1,Tw&&K(!0))))}F.addEventListener("click",()=>Et({preserveState:!0}).catch(e=>{console.error(e),iw.textContent=`Load failed: ${e.message}`,F.disabled=!1}));function Br(e,w){let t=p.meta.best_layer[e];if(!t||t[w]==null)throw new Error(`best_layer missing for ROI=${e} stream=${w}`);return t[w]}function Gr(e,w){let t=p.meta,s=t.n_layers,r=t.streams.length,o=t.rois.indexOf(e),i=t.streams.indexOf(w);if(o<0||i<0)throw new Error(`unknown ROI/stream: ${e}/${w}`);let n=o*r*s+i*s;return t.similarity_pearson.slice(n,n+s)}function _s(e,w,t){let s=new Float32Array(e.length);if(t===w)return s.fill(w),s;let r=(t-w)/255;for(let o=0;o<e.length;o++)s[o]=w+e[o]*r;return s}function Pr(e,w){let t=new Float32Array(w*w),s=0;for(let r=0;r<w-1;r++)for(let o=r+1;o<w;o++){let i=e[s++];t[r*w+o]=i,t[o*w+r]=i}return t}function qs(e){let w=p.blob,t=e.rdm,s=e.pca,r=w.subarray(t.offset,t.offset+t.length),o=w.subarray(s.offset,s.offset+s.length),i=_s(r,t.qmin,t.qmax),n=_s(o,s.qmin,s.qmax);return{rdm:Pr(i,p.meta.n_TR),pca:n,pcaShape:s.shape}}function Nr(e){return qs(p.meta.panels.human[e])}function Dr(e,w){let t=String(w),s=p.meta.panels.model[e][t];if(!s)throw new Error(`no model panel for stream=${e} layer=${w}`);return qs(s)}function Es(e,w,t,s){let r=p.meta.n_TR,o=p.meta.n_pca_dim,{rdm:i,pca:n}=w,a=e.getBoundingClientRect(),l=Math.max(120,Math.floor(a.width)),c=Math.max(120,Math.floor(a.height));e.width=l,e.height=c;let u=e.getContext("2d");u.fillStyle="#fafafa",u.fillRect(0,0,l,c);let f=20,m=f,v=f,S=Math.min(l-f,c-f),k=m,g=v,x=S,X=S,O=Math.max(1,s-t+1),Ct=x/O,ue=X/O,W=1/0,Gw=-1/0;for(let E=t;E<=s;E++)for(let B=E+1;B<=s;B++){let R=i[E*r+B];R<W&&(W=R),R>Gw&&(Gw=R)}(!isFinite(W)||W===Gw)&&(W=0,Gw=1);let J=1/0,yw=-1/0;for(let E=t;E<=s;E++)for(let B=0;B<o;B++){let R=n[E*o+B];R<J&&(J=R),R>yw&&(yw=R)}(!isFinite(J)||J===yw)&&(J=0,yw=1);let aw=u.createImageData(Math.max(1,Math.floor(x)),Math.max(1,Math.floor(X))),lw=aw.width,Pw=aw.height;for(let E=0;E<Pw;E++){let B=t+Math.floor(E/Pw*O);for(let R=0;R<lw;R++){let $w=t+Math.floor(R/lw*O),Hw=(i[B*r+$w]-W)/(Gw-W),[Fw,Uw,Kw]=pt(Lr,Math.max(0,Math.min(1,Hw))),G=(E*lw+R)*4;aw.data[G]=Fw,aw.data[G+1]=Uw,aw.data[G+2]=Kw,aw.data[G+3]=255}}u.putImageData(aw,k,g);let Nw=u.createImageData(lw,f);for(let E=0;E<f;E++){let B=Math.floor(E/f*o);for(let R=0;R<lw;R++){let $w=t+Math.floor(R/lw*O),Hw=(n[$w*o+B]-J)/(yw-J),[Fw,Uw,Kw]=pt(xs,Math.max(0,Math.min(1,Hw))),G=(E*lw+R)*4;Nw.data[G]=Fw,Nw.data[G+1]=Uw,Nw.data[G+2]=Kw,Nw.data[G+3]=255}}u.putImageData(Nw,k,0);let Dw=u.createImageData(f,Pw);for(let E=0;E<Pw;E++){let B=t+Math.floor(E/Pw*O);for(let R=0;R<f;R++){let $w=Math.floor(R/f*o),Hw=(n[B*o+$w]-J)/(yw-J),[Fw,Uw,Kw]=pt(xs,Math.max(0,Math.min(1,Hw))),G=(E*f+R)*4;Dw.data[G]=Fw,Dw.data[G+1]=Uw,Dw.data[G+2]=Kw,Dw.data[G+3]=255}}if(u.putImageData(Dw,0,g),y>=t&&y<=s){let E=k+(y-t+.5)/O*x,B=g+(y-t+.5)/O*X;u.strokeStyle="rgba(246, 195, 80, 0.9)",u.lineWidth=1.5,u.beginPath(),u.moveTo(E,g),u.lineTo(E,g+X),u.moveTo(k,B),u.lineTo(k+x,B),u.stroke()}}function ze(e){if(ew.has(e))return ew.get(e);let w=Br(e,ae);return ew.set(e,w),w}function $r(e){return p.meta.roi_n_voxels[p.meta.rois.indexOf(e)]}function zs(){return se?p.meta.rois.slice():[C]}function Ye(){Ne&&Ne.disconnect(),V.innerHTML="";for(let e of zs())V.appendChild(Ur(e));Ne=new IntersectionObserver(zr,{root:null,rootMargin:"120px 0px",threshold:.01});for(let e of V.children)Ne.observe(e)}function Hr(){let e=zs(),w=Array.from(V.children).map(t=>t.dataset.roi);if(e.length!==w.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==w[t])return!1;return!0}function Fr(){for(let e of V.children){let w=e.dataset.roi,t=e.querySelector(".row-layer-strip");t&&At(t,w);let s=e.querySelector(".layer-current-label");s&&xt(s,ze(w)),e.dataset.dirty="1"}}function Ur(e){let w=document.createElement("div");w.className="roi-row",e===C&&w.classList.add("active"),w.dataset.roi=e,w.dataset.dirty="1";let t=document.createElement("div");t.className="roi-card roi-card-human";let s=document.createElement("div");s.className="roi-brain";let r=Us[e]||e;s.innerHTML=`
    <div class="roi-brain-stack" role="button" tabindex="0"
         title="Choose a different brain region">
      <img class="brain-view" src="${ne(e,"front")}" alt="${e} frontal">
      <img class="brain-view" src="${ne(e,"side")}"  alt="${e} lateral">
    </div>
    <div class="roi-name" title="${e}">${r}</div>
    <div class="roi-meta">${e} &middot; ${$r(e)} vox</div>
  `;let o=s.querySelector(".roi-brain-stack");o&&(o.addEventListener("click",m=>{m.stopPropagation(),mt(e)}),o.addEventListener("keydown",m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),mt(e))})),t.appendChild(s);let i=document.createElement("div");i.className="panel-cell panel-human",i.innerHTML="<canvas></canvas>",t.appendChild(i),w.appendChild(t);let n=document.createElement("div");n.className="row-controls",n.innerHTML=`
    <button class="row-btn" data-act="up" title="Previous ROI">&#9650;</button>
    <button class="row-btn pick" data-act="pick" title="Choose ROI">&#9863;</button>
    <button class="row-btn" data-act="down" title="Next ROI">&#9660;</button>
  `,n.querySelector("[data-act=up]").addEventListener("click",m=>{m.stopPropagation(),As(e,-1)}),n.querySelector("[data-act=down]").addEventListener("click",m=>{m.stopPropagation(),As(e,1)}),n.querySelector("[data-act=pick]").addEventListener("click",m=>{m.stopPropagation(),mt(e)}),w.appendChild(n);let a=document.createElement("div");a.className="roi-card roi-card-model";let l=document.createElement("div");l.className="panel-cell panel-model",l.innerHTML="<canvas></canvas>",a.appendChild(l);let c=document.createElement("div");c.className="layer-strip-col";let u=document.createElement("div");u.className="row-layer-strip",At(u,e);let f=document.createElement("div");return f.className="layer-current-label",xt(f,ze(e)),c.appendChild(u),c.appendChild(f),a.appendChild(c),w.appendChild(a),w}var De=[[246,226,130],[240,165,60],[200,40,40]];function Kr(e){e=Math.max(0,Math.min(1,e));let w=e*(De.length-1),t=Math.min(De.length-2,Math.floor(w)),s=w-t,r=De[t],o=De[t+1],i=Math.round(r[0]+(o[0]-r[0])*s),n=Math.round(r[1]+(o[1]-r[1])*s),a=Math.round(r[2]+(o[2]-r[2])*s);return`rgb(${i}, ${n}, ${a})`}function At(e,w){e.innerHTML="";let t=Gr(w,ae),s=p.meta.layer_indices,r=ze(w),o=1/0,i=-1/0;for(let n=0;n<t.length;n++)t[n]<o&&(o=t[n]),t[n]>i&&(i=t[n]);for(let n=0;n<s.length;n++){let a=s[n],l=document.createElement("div");l.className="layer-block",a===r&&l.classList.add("active");let c=i===o?.5:(t[n]-o)/(i-o);l.style.background=Kr(c),l.title=`L${a}: r=${t[n].toFixed(3)}`,l.addEventListener("click",u=>{u.stopPropagation(),qr(w,a)}),e.appendChild(l)}}var Wr=7;function jr(e){let w=e.querySelector(".roi-card-model .panel-cell"),t=e.querySelector(".layer-strip-col"),s=e.querySelector(".row-layer-strip");if(!w)return;let r=w.offsetHeight;if(r){if(t&&(t.style.height=`${r}px`),t){let o=t.querySelector(".layer-current-label");o&&Bs(o)}if(s){s.style.height=`${r}px`;let i=Math.max(20,r-6),n=1,l=p.meta.layer_indices.length,c=Math.max(2,(i-(l-1)*n)/l),u=Math.max(28,c*Wr);s.querySelectorAll(".layer-block").forEach(f=>{f.style.height=`${c}px`,f.style.width=`${u}px`})}}}function qr(e,w){if(ew.get(e)===w)return;ew.set(e,w);let t=V.querySelector(`.roi-row[data-roi="${e}"]`);if(!t)return;let s=t.querySelector(".layer-current-label");s&&xt(s,w),At(t.querySelector(".row-layer-strip"),e),It(t,{onlyModel:!0})}function Ys(e){if(e!==C)if(C=e,!se)Ye(),Qe();else{V.querySelectorAll(".roi-row").forEach(t=>t.classList.toggle("active",t.dataset.roi===C));let w=V.querySelector(`.roi-row[data-roi="${C}"]`);w&&w.scrollIntoView({block:"nearest",behavior:"smooth"})}}function As(e,w){let t=p.meta.rois,r=((t.indexOf(e)+w)%t.length+t.length)%t.length;Ys(t[r])}function mt(e){Ss.innerHTML="";let w=new Set(p.meta.rois);for(let[t,s]of Object.entries(Ar)){let r=s.filter(n=>w.has(n));if(r.length===0)continue;let o=document.createElement("div");o.className="roi-picker-group",o.innerHTML=`<h4>${t}</h4><div class="roi-picker-items"></div>`;let i=o.querySelector(".roi-picker-items");for(let n of r){let a=document.createElement("button");a.className="roi-picker-item"+(n===e?" active":"");let l=Us[n]||n;a.innerHTML=`
        <div class="picker-views">
          <img class="brain-view" src="${ne(n,"front")}" alt="${n} frontal">
          <img class="brain-view" src="${ne(n,"side")}"  alt="${n} lateral">
        </div>
        <span class="name" title="${n}">${l}</span>
      `,a.addEventListener("click",()=>{Rt(),Ys(n)}),i.appendChild(a)}Ss.appendChild(o)}ie.classList.add("open")}function Rt(){ie.classList.remove("open")}ie.addEventListener("click",e=>{e.target===ie&&Rt()});window.addEventListener("keydown",e=>{e.key==="Escape"&&(ie.classList.contains("open")&&Rt(),Tt())});ys.addEventListener("click",()=>{se=!se,ys.textContent=se?"Collapse to active ROI":"View all Brain Regions",Ye(),Qe()});function zr(e){for(let w of e)Ks.set(w.target,w.isIntersecting),w.isIntersecting&&w.target.dataset.dirty==="1"&&(It(w.target),w.target.dataset.dirty="")}function It(e,{onlyModel:w=!1}={}){if(!p)return;jr(e);let t=Math.min(_,y),s=Math.max(_,y),r=e.dataset.roi,o=e.querySelectorAll(".panel-cell canvas");w||Es(o[0],Nr(r),t,s);let i=ze(r);Es(o[1],Dr(ae,i),t,s)}var dt=!1;function Qe(){dt||(dt=!0,requestAnimationFrame(()=>{dt=!1,Yr()}))}function Yr(){if(p){for(let e of V.children)Ks.get(e)?It(e):e.dataset.dirty="1";le(),Cw(),Jr()}}function Mw(){Qe()}function Qr(e){let w=document.getElementById("scrubber-marks");w.innerHTML="";let t=p.meta.tr_meta;if(!(!t||!t.run||e<=1))for(let s=0;s<e;s++){let r=s===0,o=r||t.run[s]!==t.run[s-1],i=r||t.level[s]!==t.level[s-1];if(!o&&!i)continue;let n=o?"run":"level",a=o?`R${t.run[s]}L${t.level[s]}`:`L${t.level[s]}`,l=document.createElement("div");l.className=`mark ${n}`,l.style.left=`${s/(e-1)*100}%`,l.innerHTML=`<div class="stick"></div><div class="lab">${a}</div>`,w.appendChild(l)}}function Vr(e,{reset:w=!0}={}){let t=Math.max(0,e-1);q.min=0,q.max=t,Q.min=0,Q.max=t,w?(y=0,_=0):(y=Math.min(y,t),_=Math.min(_,t)),q.value=y,Q.value=_,Qr(e),le(),Cw()}function le(){if(!p)return;let e=p.meta.n_TR,w=q.parentElement.clientWidth;if(!w||e<=1)return;let t=8,s=w-t*2,r=t+_/(e-1)*s,o=t+y/(e-1)*s;ds.textContent=`FROM ${_}`,gs.textContent=`TR ${y} / ${e-1}`,ds.style.left=`${r}px`,gs.style.left=`${o}px`,vs&&(vs.textContent="")}function Cw(){if(!p)return;let e=p.meta.n_TR,w=q.parentElement.clientWidth;if(!w||e<=1)return;let t=8,s=w-t*2,r=t+_/(e-1)*s,o=t+y/(e-1)*s,i=Math.min(r,o),n=Math.abs(o-r);ms.style.left=`${i}px`,ms.style.width=`${n}px`}function H(e,{reason:w}={}){if(!p)return;let t=p.meta.n_TR-1;y=Math.max(0,Math.min(t,e)),w!=="noFromFollow"&&(_=Math.max(0,y-ow)),q.value=y,Q.value=_,Mw(),Bw(),Xe(),Ve()}function yt(e,{fromUser:w=!1}={}){if(!p)return;let t=p.meta.n_TR-1;_=Math.max(0,Math.min(t,e));let s=7,r=Math.max(0,y-s);_>r&&(_=r),w&&y>=s&&(ow=y-_,re=!0),Q.value=_,Mw()}q.addEventListener("input",()=>{H(parseInt(q.value,10))});Q.addEventListener("input",()=>{yt(parseInt(Q.value,10),{fromUser:!0})});var Ot=document.getElementById("scrubber-track-wrap");function Ke(e){let w=Ot.getBoundingClientRect(),t=6,s=Math.max(1,w.width-t*2),r=(e-w.left-t)/s,o=p.meta.n_TR;return Math.max(0,Math.min(o-1,Math.round(r*(o-1))))}Ot.addEventListener("mousedown",e=>{if(!p||e.target.tagName==="INPUT")return;e.preventDefault(),H(Ke(e.clientX));let w=s=>{H(Ke(s.clientX))},t=()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",t)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",t)});Ot.addEventListener("touchstart",e=>{if(!p||e.target.tagName==="INPUT")return;e.preventDefault();let w=e.touches[0];H(Ke(w.clientX));let t=r=>{r.preventDefault(),H(Ke(r.touches[0].clientX))},s=()=>{document.removeEventListener("touchmove",t),document.removeEventListener("touchend",s),document.removeEventListener("touchcancel",s)};document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",s),document.addEventListener("touchcancel",s)},{passive:!1});function K(e,{preserveIntent:w=!1}={}){if(!w&&Tw!==null&&(Tw=e),e){if(M)return;d&&d.states&&d.states.length>0?Zr():M=setInterval(()=>{if(!p)return;let t=p.meta.n_TR-1;if(y>=t){K(!1);return}H(y+1)},1e3/rw)}else M&&(clearTimeout(M),clearInterval(M),M=null);Ve()}function Ve(){let e=document.getElementById("btn-play-pause");if(!e)return;let w=!!M,t=!w&&Qs();e.dataset.state=w?"playing":t?"ended":"paused";let s=w?"Pause":t?"Replay":"Play";e.setAttribute("aria-label",s),e.title=s}function Qs(){return d&&d.states&&d.states.length>0?T>=d.states.length-1:p?y>=p.meta.n_TR-1:!1}function Xr(){d&&d.states&&d.states.length>0?(T=0,y=0,_=0,q.value=0,Q.value=0,ce(0),Mw(),Bw(),le(),Cw()):p&&H(0)}function Jr(){let e=document.getElementById("open-rep-viewer");if(!e||!p)return;let w=p.meta,t=new URLSearchParams;t.set("subject",w.subject),t.set("game",w.game),t.set("model",w.model),t.set("stream",ae),C&&t.set("roi",C),C&&ew.has(C)&&t.set("layer",String(ew.get(C))),t.set("tr",String(y)),e.href=`representation.html?${t.toString()}`}var Rs=document.getElementById("btn-play-pause");Rs&&(Rs.addEventListener("click",e=>{if(e.stopPropagation(),!M&&Qs()){Xr(),K(!0);return}K(!M)}),Ve());function Zr(){let e=d.states,w=()=>{if(!M)return;if(T>=e.length-1){K(!1);return}T+=1,ce(T),Bw();let t=Vs(T);t!==y&&(y=t,(!re||y-_>ow)&&(_=Math.max(0,y-ow)),q.value=y,Q.value=_,Qe()),le(),Cw(),M=setTimeout(w,Fs/rw)};M=setTimeout(w,0)}function Vs(e){if(!z||!d||!d.steps)return y;let w=z[e];if(w<0)return 0;let t=d.steps[w],s=(e-(t.state_index??t.frame_idx??0))*(Fs/1e3);return so(t.realworld_ts+s)}function Xs(e){let w=new Int32Array(e.states.length).fill(-1);if(!e.steps||e.steps.length===0)return w;let t=-1;for(let s=0;s<e.states.length;s++){for(;t+1<e.steps.length&&(e.steps[t+1].state_index??e.steps[t+1].frame_idx??0)<=s;)t++;w[s]=t}return w}function Lt(e){e=Math.max(0,Math.min(Lw.length-1,e)),rw=Lw[e];let w=rw===Math.floor(rw)?`${rw}x`:`${rw}x`;_r.textContent=w,Hs.disabled=e===0,$s.disabled=e===Lw.length-1,M&&(K(!1),K(!0))}function Js(){let e=Lw.indexOf(rw);return e<0?Lw.indexOf(1):e}$s.addEventListener("click",()=>Lt(Js()+1));Hs.addEventListener("click",()=>Lt(Js()-1));Lt(Lw.indexOf(2));window.addEventListener("keydown",e=>{if(p){if(e.key===" "||e.code==="Space"){let w=e.target;if(w&&(w.isContentEditable||w.tagName==="INPUT"&&w.type!=="range"||w.tagName==="TEXTAREA"))return;K(!M),e.preventDefault();return}e.target.tagName==="INPUT"||e.target.tagName==="SELECT"||(e.key==="ArrowLeft"?(e.shiftKey?yt(_-1,{fromUser:!0}):H(y-1),e.preventDefault()):e.key==="ArrowRight"?(e.shiftKey?yt(_+1,{fromUser:!0}):H(y+1),e.preventDefault()):e.key==="Home"?(H(0),e.preventDefault()):e.key==="End"&&(H(p.meta.n_TR-1),e.preventDefault()))}});window.addEventListener("resize",()=>{p&&(Cw(),We(),Mw())});function We(){let w=(nw&&nw.classList.contains("vgfmri3-pad")?nw.offsetHeight:Ps.offsetHeight)||400;vw&&vw.style.setProperty("--card-h",`${w}px`),xr.style.setProperty("--canvas-h",`${w}px`);let t=document.getElementById("scrubber-row"),s=t?t.offsetHeight:76,r=document.getElementById("model-switcher");if(r&&r.style.setProperty("--scrub-h",`${s}px`),He){let i=(He.textContent||"").length,a=i*11+16,l=Math.max(7,Math.min(14,(w-16)/i));He.style.fontSize=w<a?`${l.toFixed(1)}px`:"14px"}}var we=new Map;async function Zs(e,w){if(!dw)return{message:"No catalogue manifest -- replays unavailable."};let{section:t,vgfmri:s}=bt(e),r=`${kt(w)}_${s}`,o=dw[t]?.[e]?.replays?.[r];if(!o)return{message:`No replay listed for ${e}/${r}.`};let i=await hs(o);if(!we.has(i)){let n=(async()=>{let a=await mw(i);if(!a.ok)return{message:`Replay fetch failed: ${a.status}`};let l=i.split("?")[0].endsWith(".gz")?await new Response(a.body.pipeThrough(new DecompressionStream("gzip"))).text():await a.text(),c=JSON.parse(l);return cs(c),{replay:c}})();we.set(i,n),n.then(a=>{a.replay||we.delete(i)},()=>{we.delete(i)})}return we.get(i)}async function wo(e,w,t,s){d=null,gt=null,U.textContent="Loading replay...";let r=await t;if(s!==pw)return;if(r.error)throw r.error;if(!r.replay){U.textContent=r.message,We();return}let o=r.replay;d=o,gt=`${e}/${w}`;let i=typeof o.game=="string"&&o.game.endsWith("_vgfmri3");nw.classList.toggle("vgfmri3-pad",i),i||(nw.style.background=""),te||(te=new Be(Ps,24));let n=o.game_description||ft[o.game].description;Gs=new Pe().parseGame(n),$e={},vt=null,wr(o),z=Xs(o),T=0,no(o),We(),Xe()}function wr(e){let w=p.meta.tr_meta?.unix_ts;if(!w)throw new Error("tr_meta.unix_ts missing. Re-export with export_rsa_for_web.py rev that writes tr_unix_ts alongside tr_run_seq/tr_level_seq/tr_play_seq.");if(!e.steps[0]?.realworld_ts)throw new Error("Replay steps lack realworld_ts; cannot align.");let t=new Float64Array(e.steps.length),s=new Int32Array(e.steps.length);for(let l=0;l<e.steps.length;l++)t[l]=e.steps[l].realworld_ts,s[l]=l;let r=[...s].sort((l,c)=>t[l]-t[c]),o=new Float64Array(r.length),i=new Int32Array(r.length);for(let l=0;l<r.length;l++)o[l]=t[r[l]],i[l]=r[l];function n(l,c){let u=0,f=l.length;for(;u<f;){let m=u+f>>>1;l[m]<c?u=m+1:f=m}return u}let a=p.meta.n_TR;gw=new Int32Array(a);for(let l=0;l<a;l++){let c=w[l],u=n(o,c),f=-1,m=1/0;for(let v of[u-1,u]){if(v<0||v>=o.length)continue;let S=Math.abs(o[v]-c);S<m&&(m=S,f=i[v])}if(f<0)throw new Error(`No replay step found near TR ${l} unix_ts ${c}`);gw[l]=f}}function eo(e){if($e[e])return $e[e];let t=ft[d.game].levels[e];if(!t)throw new Error(`Level ${e} not found for game ${d.game}`);let s=Gs.buildLevel(t);return $e[e]=s,s}function to(e,w){let t={};for(let[s,r]of Object.entries(e.sprites))t[s]=r.map(o=>({id:o.id,key:o.key,x:o.col*w,y:o.row*w,w,h:w,alive:o.alive,resources:o.resources||{},speed:o.speed,cooldown:o.cooldown,orientation:o.orientation,_age:o._age,lastmove:o.lastmove}));return{score:e.score,time:e.time,sprites:t}}function ce(e){if(!te||!d)return;let w=d.states?.[e];if(!w)return;let t=z?z[e]:-1,s=t>=0?d.steps[t]:null,r=w.level??s?.level??0,o=eo(r);if(o!==vt&&(te.resize(o.width,o.height),vt=o,nw.classList.contains("vgfmri3-pad"))){let i=o.sprite_registry._liveSpritesByKey.wall,n=i&&i[0]&&i[0].color;n&&(nw.style.background=`rgb(${n[0]},${n[1]},${n[2]})`)}o.setGameState(to(w,o.block_size)),o.ended=w.ended??!1,o.won=w.won??!1,o.lose=w.lose??!1,o.timeout=w.timeout??!1,o.score=w.score??0,o.time=e,te.render(o),Iw&&(o.won?(Iw.textContent="WIN",Iw.className="game-status visible win"):o.lose||o.timeout?(Iw.textContent=o.timeout?"LOSE (timeout)":"LOSE",Iw.className="game-status visible lose"):Iw.className="game-status"),We()}function Xe(){if(!d||!gw)return;let e=gw[y];if(e<0)return;let w=d.steps[e],t=w.state_index??w.frame_idx??0;T=t,ce(t)}function so(e){let w=p.meta.tr_meta.unix_ts,t=0,s=w.length;for(;t<s;){let o=t+s>>>1;w[o]<e?t=o+1:s=o}let r=t;return t>0&&(t===w.length||e-w[t-1]<w[t]-e)&&(r=t-1),Math.max(0,Math.min(w.length-1,r))}function je(e){return e&&typeof e.action=="string"&&e.action.startsWith("_")}function ro(e,w,t,s,r){let o=null,i=-1;for(let l=t-1;l>=0;l--)if(!je(w[l])){o=w[l],i=l;break}if(!o||o.level===s&&o.attempt===r)return;let n="";o.won?n="won":o.lose?n="died":o.timeout&&(n="timeout");let a=0;for(let l=i;l>=0;l--){let c=w[l];if(!je(c))if(c.level===o.level&&c.attempt===o.attempt)a+=c.reward??0;else break}n&&(e.push(`--- TRIAL ENDED outcome: ${n}, score: ${a} ---`),e.push("")),e.push(`--- NEW TRIAL (Level ${s}, Attempt ${r}) ---`),e.push("")}function oo(e,w){let t=e[w];if(t.user_prompt!==void 0)return t.user_prompt;let s=[];return ro(s,e,w,t.level,t.attempt),s.push(`# Step ${t.step} (Level ${t.level}, Attempt ${t.attempt})`),s.push(""),s.push(t.formatted_obs??""),s.join(`
`)}function io(e,w){let t=document.createDocumentFragment(),s=document.createElement("div");s.className="msg msg-user",s.dataset.stepIdx=w;let r=document.createElement("div");r.className="msg-label",r.textContent=`User (Step ${e.step})`,s.appendChild(r);let o=document.createElement("div");o.textContent=oo(d.steps,w),s.appendChild(o),t.appendChild(s);let i=e.response||{},n=document.createElement("div");n.className="msg msg-assistant",n.dataset.stepIdx=w;let a=document.createElement("div");a.className="msg-label",a.textContent=`Assistant (Step ${e.step})`,n.appendChild(a);let l=[];i.rationale&&l.push(i.rationale),i.action&&l.push(`Action: ${i.action}`);let c=document.createElement("div");return c.textContent=l.join(`

`)||"--",n.appendChild(c),t.appendChild(n),t}U.addEventListener("click",e=>{let w=e.target.closest(".msg[data-step-idx]");if(!w)return;let t=parseInt(w.dataset.stepIdx,10);if(!Number.isFinite(t)||!d||!d.steps||!d.steps[t])return;let s=d.steps[t],r=s.state_index??s.frame_idx??0;M&&K(!1);let o=Vs(r);H(o),T=r,ce(r),Bw()});function no(e){if(U.innerHTML="",St=-1,Ow=-1,(e.steps||[]).length===0){U.innerHTML='<em style="color:#888">Replay has no steps.</em>';return}if(e.system_prompt){let t=document.createElement("div");t.className="msg msg-system";let s=document.createElement("div");s.className="msg-label",s.textContent="System",t.appendChild(s);let r=document.createElement("div");r.textContent=e.system_prompt,t.appendChild(r),U.appendChild(t)}}var Ow=-1;function ao(e,w){if(!d||!d.steps)return 0;let t=0;for(let s=e;s<=w;s++)je(d.steps[s])||t++;return t}function lo(e){if(!(!d||!d.steps)&&e!==Ow){if(e>Ow)for(let w=Ow+1;w<=e;w++)je(d.steps[w])||U.appendChild(io(d.steps[w],w));else{let w=ao(e+1,Ow);for(let t=0;t<w*2;t++)U.removeChild(U.lastChild)}Ow=e}}var St=-1;function Bw(){if(!d||!d.steps)return;let e=-1;z&&T>=0&&T<z.length?e=z[T]:gw&&(e=gw[y]),!(e<0)&&(lo(e),e!==St&&(St=e,U.querySelectorAll(".msg").forEach(w=>{w.classList.toggle("active",Number(w.dataset.stepIdx)===e)}),U.scrollTop=U.scrollHeight))}nw.addEventListener("click",e=>{p&&(e.target.closest("#try-tab")||(e.stopPropagation(),K(!M),ps.classList.add("flash"),setTimeout(()=>ps.classList.remove("flash"),350)))});He.addEventListener("click",e=>{if(e.stopPropagation(),!p)return;let w=p.meta.subject,{section:t,vgfmri:s}=bt(w),r=`${kt(p.meta.game)}_${s}`,o=0;if(d&&z){let a=z[T];a>=0&&(o=d.steps[a]?.level??0)}let i=`interactive-gameplay.html?game=${encodeURIComponent(r)}&level=${o}`,n=dw?.[t]?.[w]?.replays?.[r];n&&(i+=`&replay=${encodeURIComponent(n)}`),window.open(i,"_blank")});function Je(){return!D||!Y.value||!$.value?[]:D.units.filter(e=>e.subject===Y.value&&e.game===$.value).map(e=>e.model).sort()}function co(){Fe&&(Fe.textContent=qe(I.value)||"--");let e=Je(),w=e.indexOf(I.value);Ns.disabled=w<=0,Ds.disabled=w<0||w>=e.length-1}function uo(){let e=document.getElementById("model-picker-overlay"),w=document.getElementById("model-picker-items");if(!e||!w)return;w.innerHTML="";let t=Je();for(let s of t){let r=document.createElement("div");r.className="model-picker-item"+(s===I.value?" active":"");let o=document.createElement("button");if(o.type="button",o.className="name-btn",o.textContent=qe(s),o.addEventListener("click",()=>{Tt(),Mt(s)}),r.appendChild(o),fs[s]){let i=document.createElement("a");i.className="hf-link",i.href=fs[s],i.target="_blank",i.rel="noopener noreferrer",i.textContent="Hugging Face",i.addEventListener("click",n=>n.stopPropagation()),r.appendChild(i)}w.appendChild(r)}e.classList.add("open")}function Tt(){let e=document.getElementById("model-picker-overlay");e&&e.classList.remove("open")}{let e=document.getElementById("model-picker-overlay");e&&e.addEventListener("click",w=>{w.target===e&&Tt()}),Fe&&Fe.addEventListener("click",w=>{w.stopPropagation(),uo()})}function Mt(e){!e||e===I.value||(I.value=e,Ue(),Et({preserveState:!0}).catch(w=>{console.error(w),iw.textContent=`Switch failed: ${w.message}`}))}Ns.addEventListener("click",()=>{let e=Je(),w=e.indexOf(I.value);w>0&&Mt(e[w-1])});Ds.addEventListener("click",()=>{let e=Je(),w=e.indexOf(I.value);w>=0&&w<e.length-1&&Mt(e[w+1])});async function ho(){Ir(),await Tr();let e=P("subject")||"sub-13",w=P("game")||"bait",t=P("model")||"qwen35_27b",s=P("stream")||"main";if(!Ms&&D&&dw){let r=w.toLowerCase();if(!D.units.some(i=>i.subject===e&&i.game.toLowerCase()===r))try{let{section:i,vgfmri:n}=bt(e),a=`${kt(r)}_${n}`,l=dw[i]?.[e]?.replays?.[a];if(l){window.location.replace(`replay.html?grid-key=${encodeURIComponent(l)}`);return}}catch{}}if([...Y.options].some(r=>r.value===e)&&(Y.value=e,Ws()),[...$.options].some(r=>r.value===w)&&($.value=w,js()),[...I.options].some(r=>r.value===t))I.value=t,Ue();else{let r=[...I.options].map(o=>o.value).find(o=>o&&o!=="");r&&(I.value=r,Ue())}if([...N.options].some(r=>r.value===s)&&(N.value=s,F.disabled=!1),!F.disabled)try{await Et(),fo(),Ve()}catch(r){console.error(r),iw.textContent=`Default load failed: ${r.message}`}}function fo(){if(!p)return;let e=P("roi"),w=P("layer"),t=P("level"),s=P("episode"),r=!1;if(e&&p.meta.rois.includes(e)&&e!==C&&(C=e,r=!0),w!=null){let n=parseInt(w,10);Number.isFinite(n)&&p.meta.layer_indices.includes(n)&&(ew.set(C,n),r=!0)}r&&Ye();let o=P("tr"),i=-1;if(o!=null){let n=parseInt(o,10);Number.isFinite(n)&&(i=Math.max(0,Math.min(p.meta.n_TR-1,n)))}else if(t!=null&&s!=null){let n=parseInt(t,10),a=parseInt(s,10),l=p.meta.tr_meta;if(l&&l.level&&l.play){let c=[];for(let u=0;u<p.meta.n_TR;u++){if(l.level[u]!==n)continue;let f=l.play[u],m=c.indexOf(f);if(m<0&&(c.push(f),m=c.length-1),m===a){i=u;break}}}}i>=0&&(y=i,_=Math.max(0,y-ow),q.value=y,Q.value=_,le(),Cw()),Mw(),Xe(),Bw(),er()}var Is=!1;function er(){if(Is||!p||!vw||!d||!d.states||d.states.length===0||!po(vw))return;Is=!0,K(!0);let e=()=>Or().catch(()=>{});typeof requestIdleCallback=="function"?requestIdleCallback(e,{timeout:5e3}):setTimeout(e,1500)}function po(e){let w=e.getBoundingClientRect(),t=window.innerHeight||document.documentElement.clientHeight;return w.top<t&&w.bottom>0}var Os=typeof IntersectionObserver<"u"?new IntersectionObserver(e=>{for(let w of e)w.isIntersecting&&er()},{threshold:.15}):null;Os&&vw&&Os.observe(vw);ho();})();
