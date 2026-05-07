// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var kw=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},n=new kw;var q=class r{constructor(w,e,t,s){this.x=w,this.y=e,this.w=t,this.h=s}static fromPosSize(w,e){return new r(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new r(this.x+w.x,this.y+w.y,this.w,this.h):new r(this.x+w,this.y+e,this.w,this.h)}copy(){return new r(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let t=0;t<w.length;t++)this.colliderect(w[t].rect||w[t])&&e.push(t);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var u=class r{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let t of this.keys)t==="LEFT"&&(w-=1),t==="RIGHT"&&(w+=1),t==="UP"&&(e-=1),t==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof r)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},Sw={NOOP:new u,UP:new u("UP"),DOWN:new u("DOWN"),LEFT:new u("LEFT"),RIGHT:new u("RIGHT"),SPACE:new u("SPACE"),SPACE_RIGHT:new u("SPACE","RIGHT"),SPACE_LEFT:new u("SPACE","LEFT")},Bw=Sw.NOOP;var zw=[129,199,132],$=[25,118,210],Q=[211,47,47],xw=[69,90,100],V=[250,250,250],_e=[109,76,65],Aw=[55,71,79],Ew=[230,81,0],ve=[255,245,157],de=[255,138,128],be=[255,196,0],ye=[255,82,82],ke=[255,112,67],Se=[144,202,249],ze=[185,246,202],xe=[207,216,220],Ae=[68,90,100],Ee=[1,87,155],je=[92,107,192],qe=[200,150,220],Te=[255,230,230],X={GREEN:zw,BLUE:$,RED:Q,GRAY:xw,WHITE:V,BROWN:_e,BLACK:Aw,ORANGE:Ew,YELLOW:ve,PINK:de,GOLD:be,LIGHTRED:ye,LIGHTORANGE:ke,LIGHTBLUE:Se,LIGHTGREEN:ze,LIGHTGRAY:xe,DARKGRAY:Ae,DARKBLUE:Ee,PURPLE:je,LIGHTPURPLE:qe,LIGHTPINK:Te},jw={x:0,y:-1},qw={x:0,y:1},M={x:-1,y:0},S={x:1,y:0},T=[jw,M,qw,S];function B(r,w){return r.x===w.x&&r.y===w.y}function Ie(r){return Math.sqrt(r.x*r.x+r.y*r.y)}function z(r){let w=Ie(r);return w>0?{x:r.x/w,y:r.y/w}:{x:1,y:0}}var I=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let s;if(e.asVector?s=e.asVector():s=e,B(s,{x:0,y:0}))return;w._updatePosition(s,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var Re=X,b=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:s,size:l=[1,1],color:i,speed:o,cooldown:a,physicstype:g,rng:c,img:m,resources:h,...d}=w;this.key=e,this.id=t;let p=Array.isArray(l)?l:[l,l];this.rect=new q(s[0],s[1],p[0],p[1]),this.lastrect=this.rect,this.alive=!0;let _=g||this.constructor.physicstype||I;if(this.physics=new _(p),this.speed=o??this.constructor.speed,this.cooldown=a??this.constructor.cooldown,this.img=m||null,this.color=i||this.constructor.color,this.img&&this.img.startsWith("colors/")){let v=this.img.split("/")[1],f=Re[v];f&&(this.color=f)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(h?{...h}:{},{get(v,f){return typeof f=="string"&&!(f in v)&&f!=="toJSON"&&f!=="then"&&f!==Symbol.toPrimitive&&f!==Symbol.toStringTag&&f!=="inspect"&&f!=="constructor"&&f!=="__proto__"?0:v[f]},set(v,f,k){return v[f]=k,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[v,f]of Object.entries(d))this[v]=f}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,s;if(e==null){let l=this.speed||0;t=w.x*l,s=w.y*l}else t=w.x*e,s=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:s}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},y=class extends b{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},Z=class extends b{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var J=class extends b{static color=xw;static is_static=!0},ww=class extends b{static color=Q},ew=class extends y{static is_static=!0},N=class extends b{static color=Q;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},A=class extends b{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||S)}},P=class extends A{static speed=1},D=class extends A{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};D.limit=1;var O=class extends b{static stype=null},tw=class extends O{static is_static=!0;static is_stochastic=!0;static color=$},R=class extends O{static color=Aw;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},H=class extends b{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=T[Math.floor(w.randomGenerator.random()*T.length)];this.physics.activeMovement(this,e)}},F=class extends H{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],s=w.getSprites(this.stype);for(let l of s){let i=this.physics.distance(this.rect,l.rect);i<e?(e=i,t=[l]):i===e&&t.push(l)}return t}_movesToward(w,e){let t=[],s=this.physics.distance(this.rect,e.rect);for(let l of T){let i=this.rect.move(l),o=this.physics.distance(i,e.rect);this.fleeing&&s<o&&t.push(l),!this.fleeing&&s>o&&t.push(l)}return t}update(w){b.prototype.update.call(this,w);let e=[];for(let s of this._closestTargets(w))e.push(...this._movesToward(w,s));e.length===0&&(e=[...T]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},rw=class extends F{constructor(w){super({...w,fleeing:!0})}},sw=class extends R{static color=Ew;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||S),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),R.prototype.update.call(this,w)}},lw=class extends P{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let t;this.orientation.x>0?t=1:this.orientation.x<0?t=-1:t=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:t,y:0})}super.update(w)}},iw=class extends A{static is_static=!0;static color=$;static strength=1;static draw_arrow=!0},aw=class r extends N{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of T)w.randomGenerator.random()<(this.spreadprob||r.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function cw(r,w){let e=[...w.active_keys].sort();for(let t=Math.max(3,e.length);t>=0;t--)for(let s of Ge(e,t)){let l=s.join(",");if(r._keysToAction.has(l))return r._keysToAction.get(l)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function Ge(r,w){if(w===0)return[[]];if(r.length===0)return[];let e=[];function t(s,l){if(l.length===w){e.push([...l]);return}for(let i=s;i<r.length;i++)l.push(r[i]),t(i+1,l),l.pop()}return t(0,[]),e}function Nw(r){let w=new Map;for(let e of Object.values(r)){let t=[...e.keys].sort().join(",");w.set(t,e)}return w}var K=class extends b{static color=V;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=Nw(e)}static declarePossibleActions(){return{UP:new u("UP"),DOWN:new u("DOWN"),LEFT:new u("LEFT"),RIGHT:new u("RIGHT"),NO_OP:new u}}update(w){b.prototype.update.call(this,w);let e=cw(this,w);e.equals(Bw)||this.physics.activeMovement(this,e)}},E=class extends b{static color=V;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||S);let e=this.constructor.declarePossibleActions();this._keysToAction=Nw(e)}static declarePossibleActions(){return{UP:new u("UP"),DOWN:new u("DOWN"),LEFT:new u("LEFT"),RIGHT:new u("RIGHT"),NO_OP:new u}}update(w){let e=this.orientation;this.orientation={x:0,y:0},b.prototype.update.call(this,w);let t=cw(this,w);t&&this.physics.activeMovement(this,t);let s=this.lastdirection;Math.abs(s.x)+Math.abs(s.y)!==0?this.orientation=s:this.orientation=e}},ow=class extends E{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=E.declarePossibleActions();return w.SPACE=new u("SPACE"),w}update(w){E.prototype.update.call(this,w);let e=cw(this,w);this._hasAmmo()&&e.equals(Sw.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let s=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],l=w.createSprite(this.stype,s);l&&l.orientation!==void 0&&(l.orientation=t)}this._spendAmmo()}_shootDirections(w){return[z(this.orientation)]}},j=class extends K{static declarePossibleActions(){return{LEFT:new u("LEFT"),RIGHT:new u("RIGHT"),NO_OP:new u}}update(w){b.prototype.update.call(this,w);let e=cw(this,w),t=e.asVector();(B(t,S)||B(t,M))&&this.physics.activeMovement(this,e)}},nw=class extends j{static color=zw;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=j.declarePossibleActions();return w.SPACE=new u("SPACE"),w}update(w){j.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function x(r,w,e){e.killSprite(r)}function Pw(r,w,e){e.killSprite(r),e.killSprite(w)}function Dw(r,w,e){e.addSpriteCreation(r.key,[r.rect.x,r.rect.y])}function G(r,w,e,{stype:t="wall"}={}){let s=r.lastrect;e.killSprite(r);let l=e.addSpriteCreation(t,r.rect.topleft);l!=null&&(l.lastrect=s,r.orientation!==void 0&&l.orientation!==void 0&&(l.orientation=r.orientation))}function Hw(r,w,e,{resource:t,limit:s=1,no_symmetry:l=!1,exhaustStype:i=null}={}){r.resources[t]<s?U(r,w,e,{no_symmetry:l}):i?e.kill_list.includes(w)||G(w,r,e,{stype:i}):x(w,r,e)}function U(r,w,e,{no_symmetry:t=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(r)&&(r.rect.equals(r.lastrect)&&!t?(w.rect=w.lastrect,Tw(w,0)):(r.rect=r.lastrect,Tw(r,0)))}function Tw(r,w){w>5||r.just_pushed&&(r.just_pushed.rect=r.just_pushed.lastrect,Tw(r.just_pushed,w+1))}function Fw(r,w,e){for(let t of e.sprite_registry.sprites())t.rect=t.lastrect}function Iw(r,w){return r.just_pushed&&w<3?Iw(r.just_pushed,w+1):r.lastdirection}function Kw(r,w,e){let t=Iw(w,0);Math.abs(t.x)+Math.abs(t.y)===0?(t=Iw(r,0),w.physics.activeMovement(w,z(t)),w.just_pushed=r):(r.physics.activeMovement(r,z(t)),r.just_pushed=w)}function Uw(r,w,e,{exhaustStype:t=null}={}){if(r.lastrect.colliderect(w.rect))return;let s=r.lastdirection;if(Math.abs(s.x)+Math.abs(s.y)===0)return;let i=z(s),o=r.rect.width,a=r.rect.copy();a.x+=Math.round(i.x)*o,a.y+=Math.round(i.y)*o,!(a.x<0||a.y<0||a.x+a.width>e.screensize[0]||a.y+a.height>e.screensize[1])&&(r.rect=a,r.lastmove=0,t&&G(w,r,e,{stype:t}))}function Ow(r,w,e,{with_step_back:t=!0}={}){t&&(r.rect=r.lastrect),r.orientation!==void 0&&(r.orientation={x:-r.orientation.x,y:-r.orientation.y})}function Ww(r,w,e){r.rect=r.lastrect,r.lastmove=r.cooldown,r.physics.activeMovement(r,{x:0,y:1},1),Ow(r,w,e,{with_step_back:!1})}function Yw(r,w,e){let t=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];r.orientation=t[Math.floor(e.randomGenerator.random()*t.length)]}function $w(r,w,e,{offset:t=0}={}){r.rect.top<0?r.rect.top=e.screensize[1]-r.rect.height:r.rect.top+r.rect.height>e.screensize[1]&&(r.rect.top=0),r.rect.left<0?r.rect.left=e.screensize[0]-r.rect.width:r.rect.left+r.rect.width>e.screensize[0]&&(r.rect.left=0),r.lastmove=0}function Qw(r,w,e){if(!(r instanceof y))throw new Error(`collectResource: sprite must be a Resource, got ${r.constructor.name}`);let t=r.resource_type,s=e.domain.resources_limits&&e.domain.resources_limits[t]||1/0;w.resources[t]=Math.max(0,Math.min(w.resources[t]+r.value,s))}function Vw(r,w,e,{resource:t,value:s=1}={}){e.resource_changes.push([r,t,s])}function Xw(r,w,e,{resource:t,value:s=1}={}){e.resource_changes.push([w,t,s]),e.kill_list.push(r)}function Zw(r,w,e,{resource:t,value:s=-1}={}){e.resource_changes.push([w,t,s]),e.kill_list.push(r)}function Jw(r,w,e,{resource:t,limit:s=1}={}){w.resources[t]>=s&&x(r,w,e)}function we(r,w,e,{resource:t,limit:s=1}={}){r.resources[t]>=s&&x(r,w,e)}function ee(r,w,e,{resource:t,limit:s=1}={}){w.resources[t]<=s&&x(r,w,e)}function te(r,w,e,{resource:t,limit:s=1}={}){r.resources[t]<=s&&x(r,w,e)}function re(r,w,e,{resource:t,stype:s,limit:l=1}={}){r.resources[t]>=l&&e.addSpriteCreation(s,[r.rect.x,r.rect.y])}function se(r,w,e){e.kill_list.includes(w)||x(r,w,e)}function le(r,w,e){let t=r.lastrect,s=z(w.orientation);r.physics.activeMovement(r,s,w.strength||1),r.lastrect=t}function ie(r,w,e){if(!me(r,e,"t_lastpull"))return;let t=r.lastrect,s=w.lastdirection,i=Math.abs(s.x)+Math.abs(s.y)>0?z(s):{x:1,y:0};r._updatePosition(i,(w.speed||1)*r.physics.gridsize[0]),r.lastrect=t}function ae(r,w,e){let t=e.sprite_registry.withStype(w.stype||w.key);if(t.length>0){let s=t[Math.floor(e.randomGenerator.random()*t.length)];r.rect=s.rect.copy()}r.lastmove=0}function oe(r,w,e,{exhaustStype:t=null}={}){if(r.lastrect.colliderect(w.rect))return;let s=e.sprite_registry.group(w.key).filter(i=>i!==w);if(s.length===0)return;let l=s[Math.floor(e.randomGenerator.random()*s.length)];r.rect=l.rect.copy(),r.lastrect=l.rect.copy(),r.lastmove=0,t&&(G(w,r,e,{stype:t}),G(l,r,e,{stype:t}))}function ne(r,w,e,{friction:t=0}={}){me(r,e,"t_lastbounce")&&(r.speed!==null&&(r.speed*=1-t),U(r,w,e),r.orientation!==void 0&&(Math.abs(r.rect.centerx-w.rect.centerx)>Math.abs(r.rect.centery-w.rect.centery)?r.orientation={x:-r.orientation.x,y:r.orientation.y}:r.orientation={x:r.orientation.x,y:-r.orientation.y}))}function ce(r,w,e,{friction:t=0}={}){if(U(r,w,e),r.orientation!==void 0){let s=r.orientation,l=z({x:-r.rect.centerx+w.rect.centerx,y:-r.rect.centery+w.rect.centery}),i=l.x*s.x+l.y*s.y;r.orientation={x:-2*i*l.x+s.x,y:-2*i*l.y+s.y},r.speed!==null&&(r.speed*=1-t)}}function me(r,w,e){return e in r._effect_data&&r._effect_data[e]===w.time?!1:(r._effect_data[e]=w.time,!0)}var L=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},mw=class extends L{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},gw=class extends L{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},hw=class extends L{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:s=0,...l}=w;super({win:e,scoreChange:t}),this.limit=s,this.stypes=[];for(let[i,o]of Object.entries(l))i.startsWith("stype")&&this.stypes.push(o)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},pw=class extends L{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var fw=class r{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,t,s){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=t,this.stypes[w]=s,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(l=>parseInt(l.id.split(".").pop())),t=(this._deadSpritesByKey[w]||[]).map(l=>parseInt(l.id.split(".").pop())),s=e.concat(t);return s.length>0?Math.max(...s)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:t,args:s,stypes:l}=this.getSpriteDef(w),i=e.id||this.generateId(w),o={...s,...e,key:w,id:i},a=new t(o);return a.stypes=l,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(a),this._spriteById[i]=a,a}killSprite(w){w.alive=!1;let e=w.key,t=this._liveSpritesByKey[e];if(t){let s=t.indexOf(w);s!==-1&&(t.splice(s,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let t=this._liveSpritesByKey[w]||[];if(!e)return t;let s=this._deadSpritesByKey[w]||[];return t.concat(s)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let t=this._liveSpritesByKey[e]||[],s=this._deadSpritesByKey[e]||[];yield[e,t.concat(s)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let s of t)yield s}}spritesArray(){let w=[];for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let s of t)w.push(s)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let t=[];for(let s of this.spriteKeys)if(this.stypes[s]&&this.stypes[s].includes(w)){let l=e?(this._liveSpritesByKey[s]||[]).concat(this._deadSpritesByKey[s]||[]):this._liveSpritesByKey[s]||[];t.push(...l)}return t}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new r;w.classes={...this.classes},w.classArgs={};for(let[e,t]of Object.entries(this.classArgs))w.classArgs[e]={...t};w.stypes={};for(let[e,t]of Object.entries(this.stypes))w.stypes[e]=[...t];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var Rw=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},Gw=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},W=class extends Gw{constructor(w,e,t,s={}){let l=s.scoreChange||0;super(e,t,{scoreChange:l}),this.callFn=w;let{scoreChange:i,...o}=s;this.fnArgs=o,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},C=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof y||e===y){let s=w;t.res_type&&(s=t.res_type),t.color&&(this.resources_colors[s]=t.color),t.limit!==void 0&&(this.resources_limits[s]=t.limit),this.notable_resources.push(s)}}buildLevel(w){let e=w.split(`
`).filter(o=>o.length>0),t=e.map(o=>o.length),s=Math.min(...t),l=Math.max(...t);if(s!==l)throw new Error(`Inconsistent line lengths: min=${s}, max=${l}`);let i=new Lw(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let o=0;o<e.length;o++)for(let a=0;a<e[o].length;a++){let g=e[o][a],c=this.char_mapping[g];if(c){let m=[a*this.block_size,o*this.block_size];i.createSprites(c,m)}}return i.initState=i.getGameState(),i}},Lw=class{constructor(w,e,t,s,l,i=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=s,this.height=l,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=i,this.randomGenerator=new Rw(i),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new q(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let s=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return s&&(this.is_stochastic=this.domain.is_stochastic||s.is_stochastic||this.is_stochastic),s}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let a of e)a.just_pushed=null;for(let a of e)a.update(this);this.events_triggered=[];let[t,s,l]=this._moveEventHandling(),[i,o]=this._eventHandling(t);this.events_triggered=s.concat(i);for(let a of this.kill_list)this.sprite_registry.killSprite(a);for(let[a,g,c]of this.create_list)this.createSprite(a,g,c);for(let[a,g,c]of this.resource_changes){let m=this.domain.resources_limits&&this.domain.resources_limits[g]||1/0;a.resources[g]=Math.max(0,Math.min(a.resources[g]+c,m))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},s=this.domain.collision_eff.filter(i=>i.name==="stepBack"||i.name==="stepBackIfHasLess");for(let i of s){let[,o,a]=this._applyEffect(i,t);w.push(...o),e.push(...a)}let l=this.domain.collision_eff.filter(i=>["bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of l){let[,o,a]=this._applyEffect(i,t);w.push(...o),e.push(...a)}for(let i of s){let[,o,a]=this._applyEffect(i,t);w.push(...o),e.push(...a)}return[t,w,e]}_eventHandling(w){let e=[],t=[],s=this.domain.collision_eff.filter(l=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(l.name));for(let l of s){let[,i,o]=this._applyEffect(l,w);e.push(...i),t.push(...o)}return[e,t]}_applyEffect(w,e){let t=[],s=[],l=w.actor_stype,i=w.actee_stype;if(l in e||(e[l]=this.sprite_registry.withStype(l)),i!=="EOS"&&!(i in e)&&(e[i]=this.sprite_registry.withStype(i)),i==="EOS"){let c=e[l];for(let m=c.length-1;m>=0;m--){let h=c[m];this.containsRect(h.rect)||(this.addScore(w.score),w.call(h,null,this),t.push([w.name,h.id,"EOS"]),s.push([w.name,h.key,"EOS",[h.rect.x,h.rect.y],[null,null]]),!this.containsRect(h.rect)&&h.alive&&this.killSprite(h))}return[e,t,s]}let o=e[l],a=e[i];if(o.length===0||a.length===0)return[e,t,s];let g=!1;o.length>a.length&&([o,a]=[a,o],g=!0);for(let c of o)for(let m of a)c!==m&&c.rect.colliderect(m.rect)&&(g?this.kill_list.includes(m)||(this.addScore(w.score),w.call(m,c,this),t.push([w.name,m.id,c.id]),s.push([w.name,m.key,c.key,[m.rect.x,m.rect.y],[c.rect.x,c.rect.y]])):this.kill_list.includes(c)||(this.addScore(w.score),w.call(c,m,this),t.push([w.name,c.id,m.id]),s.push([w.name,c.key,m.key,[c.rect.x,c.rect.y],[m.rect.x,m.rect.y]])));return[e,t,s]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],s=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...s].map(l=>({id:l.id,key:l.key,x:l.rect.x,y:l.rect.y,w:l.rect.w,h:l.rect.h,alive:l.alive,resources:{...l.resources},speed:l.speed,cooldown:l.cooldown,orientation:l.orientation?{...l.orientation}:void 0,_age:l._age,lastmove:l.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let s of t){let l=this.sprite_registry.createSprite(e,{id:s.id,pos:[s.x,s.y],size:[s.w,s.h],rng:this.randomGenerator});l&&(l.resources=new Proxy({...s.resources},{get(i,o){return typeof o=="string"&&!(o in i)&&o!=="toJSON"&&o!=="then"&&o!==Symbol.toPrimitive&&o!==Symbol.toStringTag&&o!=="inspect"&&o!=="constructor"&&o!=="__proto__"?0:i[o]},set(i,o,a){return i[o]=a,!0}}),s.speed!==void 0&&(l.speed=s.speed),s.cooldown!==void 0&&(l.cooldown=s.cooldown),s.orientation&&(l.orientation={...s.orientation}),s._age!==void 0&&(l._age=s._age),s.lastmove!==void 0&&(l.lastmove=s.lastmove),l.alive=s.alive,s.alive||this.sprite_registry.killSprite(l))}}};function ge(){n.register("VGDLSprite",b),n.register("Immovable",J),n.register("Passive",ww),n.register("Resource",y),n.register("ResourcePack",ew),n.register("Flicker",N),n.register("OrientedFlicker",D),n.register("OrientedSprite",A),n.register("Missile",P),n.register("SpawnPoint",R),n.register("SpriteProducer",O),n.register("Portal",tw),n.register("RandomNPC",H),n.register("Chaser",F),n.register("Fleeing",rw),n.register("Bomber",sw),n.register("Walker",lw),n.register("Conveyor",iw),n.register("Spreader",aw),n.register("Immutable",Z),n.register("MovingAvatar",K),n.register("OrientedAvatar",E),n.register("ShootAvatar",ow),n.register("HorizontalAvatar",j),n.register("FlakAvatar",nw),n.register("killSprite",x),n.register("killBoth",Pw),n.register("cloneSprite",Dw),n.register("transformTo",G),n.register("stepBack",U),n.register("stepBackIfHasLess",Hw),n.register("undoAll",Fw),n.register("bounceForward",Kw),n.register("catapultForward",Uw),n.register("reverseDirection",Ow),n.register("turnAround",Ww),n.register("flipDirection",Yw),n.register("wrapAround",$w),n.register("collectResource",Qw),n.register("changeResource",Vw),n.register("addResource",Xw),n.register("removeResource",Zw),n.register("killIfOtherHasMore",Jw),n.register("killIfHasMore",we),n.register("killIfOtherHasLess",ee),n.register("killIfHasLess",te),n.register("spawnIfHasMore",re),n.register("killIfAlive",se),n.register("conveySprite",le),n.register("pullWithIt",ie),n.register("teleportToExit",ae),n.register("teleportToOther",oe),n.register("wallBounce",ne),n.register("bounceDirection",ce),n.register("Timeout",mw),n.register("SpriteCounter",gw),n.register("MultiSpriteCounter",hw),n.register("ResourceCounter",pw),n.register("GridPhysics",I),n.register("BasicGame",C);for(let[r,w]of Object.entries(X))n.register(r,w);n.register("UP",jw),n.register("DOWN",qw),n.register("LEFT",M),n.register("RIGHT",S)}var uw=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function Le(r,w=8){r=r.replace(/\t/g," ".repeat(w));let e=r.split(`
`),t=new uw("",-1);for(let s of e){s.includes("#")&&(s=s.split("#")[0]);let l=s.trim();if(l.length>0){let i=s.length-s.trimStart().length;t=new uw(l,i,t)}}return t.getRoot()}var _w=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=Le(t).children[0]);let[s,l]=this._parseArgs(t.content);Object.assign(l,e),this.spriteRegistry=new fw,this.game=new C(this.spriteRegistry,l);for(let i of t.children)i.content.startsWith("SpriteSet")&&this.parseSprites(i.children),i.content==="InteractionSet"&&this.parseInteractions(i.children),i.content==="LevelMapping"&&this.parseMappings(i.children),i.content==="TerminationSet"&&this.parseTerminations(i.children);return this.game.finishSetup(),this.game}_eval(w){if(n.has(w))return n.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let s=w.split(/\s+/).filter(l=>l.length>0);if(s.length===0)return[e,t];s[0].includes("=")||(e=this._eval(s[0]),s.shift());for(let l of s){let i=l.indexOf("=");if(i===-1)continue;let o=l.substring(0,i),a=l.substring(i+1);t[o]=this._eval(a)}return[e,t]}parseSprites(w,e=null,t={},s=[]){for(let l of w){if(!l.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${l.content}`);let[i,o]=l.content.split(">").map(m=>m.trim()),[a,g]=this._parseArgs(o,e,{...t}),c=[...s,i];if("singleton"in g&&(g.singleton===!0&&this.spriteRegistry.registerSingleton(i),delete g.singleton),l.children.length===0){this.verbose&&console.log("Defining:",i,a,g,c),this.spriteRegistry.registerSpriteClass(i,a,g,c);let m=this.game.sprite_order.indexOf(i);m!==-1&&this.game.sprite_order.splice(m,1),this.game.sprite_order.push(i)}else this.parseSprites(l.children,a,g,c)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,s]=e.content.split(">").map(a=>a.trim()),[l,i]=this._parseArgs(s),o=t.split(/\s+/).filter(a=>a.length>0);for(let a=1;a<o.length;a++){let g=o[0],c=o[a],m;if(typeof l=="function"&&!l.prototype)m=new W(l,g,c,i);else if(typeof l=="function")m=new W(l,g,c,i);else throw new Error(`Unknown effect type: ${l}`);this.game.collision_eff.push(m)}}}parseTerminations(w){for(let e of w){let[t,s]=this._parseArgs(e.content);this.game.terminations.push(new t(s))}}parseMappings(w){for(let e of w){let[t,s]=e.content.split(">").map(i=>i.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let l=s.split(/\s+/).filter(i=>i.length>0);this.game.char_mapping[t]=l}}};var vw=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let s of w.domain.sprite_order){let l=w.sprite_registry._liveSpritesByKey[s]||[];for(let i of l)this._drawSprite(i,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let s=w.rect.x*e,l=w.rect.y*e,i=w.rect.w*e,o=w.rect.h*e,a=null,g=null;if(w.img){let _=this._parseImg(w.img);a=_.color,g=_.shape}a||(a=w.color),a||(a=[128,128,128]);let c=w.shrinkfactor||0,m=s+i*c/2,h=l+o*c/2,d=i*(1-c),p=o*(1-c);this.ctx.fillStyle=`rgb(${a[0]}, ${a[1]}, ${a[2]})`,g?this._drawShape(g,m,h,d,p):this.ctx.fillRect(m,h,d,p),w.orientation&&w.draw_arrow&&this._drawArrow(m,h,d,p,w.orientation,a),w.is_avatar&&this._drawResources(w,m,h,d,p)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],s=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let l of s)if(t.endsWith("_"+l)){let i=t.slice(0,-(l.length+1));return{color:e[i]||null,shape:l}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,s,l){let i=this.ctx,o=e+s/2,a=t+l/2,g=s/2,c=l/2,m=2/24,h=g*(1-2*m),d=c*(1-2*m);switch(i.beginPath(),w){case"CIRCLE":i.ellipse(o,a,h,d,0,0,Math.PI*2);break;case"TRIANGLE":{let p=a-d,_=a+d,v=o-h,f=o+h;i.moveTo(o,p),i.lineTo(f,_),i.lineTo(v,_),i.closePath();break}case"DIAMOND":i.moveTo(o,a-d),i.lineTo(o+h,a),i.lineTo(o,a+d),i.lineTo(o-h,a),i.closePath();break;case"STAR":{let p=Math.min(h,d),_=p*.4;for(let v=0;v<5;v++){let f=-Math.PI/2+v*(2*Math.PI/5),k=f+Math.PI/5;v===0?i.moveTo(o+p*Math.cos(f),a+p*Math.sin(f)):i.lineTo(o+p*Math.cos(f),a+p*Math.sin(f)),i.lineTo(o+_*Math.cos(k),a+_*Math.sin(k))}i.closePath();break}case"CROSS":{let p=h*2/3,_=p/2;i.rect(o-h,a-_,h*2,p),i.rect(o-_,a-d,p,d*2);break}case"HEXAGON":{let p=Math.min(h,d);for(let _=0;_<6;_++){let v=Math.PI/6+_*(Math.PI/3),f=o+p*Math.cos(v),k=a+p*Math.sin(v);_===0?i.moveTo(f,k):i.lineTo(f,k)}i.closePath();break}case"SQUARE":{let p=Math.min(h,d)*.05;i.rect(o-h+p,a-d+p,(h-p)*2,(d-p)*2);break}case"PENTAGON":{let p=Math.min(h,d);for(let _=0;_<5;_++){let v=-Math.PI/2+_*(2*Math.PI/5),f=o+p*Math.cos(v),k=a+p*Math.sin(v);_===0?i.moveTo(f,k):i.lineTo(f,k)}i.closePath();break}default:i.rect(e,t,s,l)}i.fill()}_drawArrow(w,e,t,s,l,i){let o=w+t/2,a=e+s/2,g=Math.min(t,s)*.3,c=[i[0],255-i[1],i[2]];this.ctx.strokeStyle=`rgb(${c[0]}, ${c[1]}, ${c[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(o,a),this.ctx.lineTo(o+l.x*g,a+l.y*g),this.ctx.stroke()}_drawResources(w,e,t,s,l){let i=w.resources,o=0,a=3;for(let g of Object.keys(i)){if(g==="toJSON")continue;let c=i[g];if(c>0){let m=t+l+o*(a+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,m,s*Math.min(c/5,1),a),o++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var he={roomworld:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};function pe(r){if(!r.delta_encoded)return;let w=r.states;if(!w||w.length<2){delete r.delta_encoded;return}let e=w[0].sprites;for(let t=1;t<w.length;t++){if(!("sprites"in w[t]))w[t].sprites=Object.assign({},e);else{let s=Object.assign({},e,w[t].sprites);for(let l in s)s[l]===null&&delete s[l];w[t].sprites=s}e=w[t].sprites}delete r.delta_encoded}ge();var Ce={cohort3:{"sub-01":{stats:{wins:203,losses:93},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-01/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-01/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-01/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-01/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-01/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-01/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-02":{stats:{wins:208,losses:77},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-02/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-02/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-02/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-02/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-02/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-02/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-03":{stats:{wins:145,losses:96},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-03/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-03/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-03/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-03/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-03/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-03/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-04":{stats:{wins:162,losses:96},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-04/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-04/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-04/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-04/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-04/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-04/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-05":{stats:{wins:118,losses:117},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-05/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-05/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-05/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-05/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-05/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-05/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-06":{stats:{wins:173,losses:87},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-06/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-06/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-06/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-06/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-06/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-06/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-07":{stats:{wins:122,losses:114},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-07/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-07/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-07/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-07/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-07/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-07/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-08":{stats:{wins:115,losses:106},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-08/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-08/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-08/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-08/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-08/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-08/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-09":{stats:{wins:128,losses:63},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-09/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-09/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-09/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-09/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-09/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-09/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-10":{stats:{wins:124,losses:81},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-10/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-10/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-10/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-10/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-10/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-10/plaqueAttack_vgfmri3.replay.json.gz"}},"sub-11":{stats:{wins:96,losses:77},replays:{bait_vgfmri3:"llm_catalogue/cohort3/sub-11/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/cohort3/sub-11/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/cohort3/sub-11/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/cohort3/sub-11/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/cohort3/sub-11/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/cohort3/sub-11/plaqueAttack_vgfmri3.replay.json.gz"}}},cohort4:{"sub-12":{stats:{wins:78,losses:118},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-12/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-12/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-12/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-12/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-12/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-12/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-13":{stats:{wins:99,losses:109},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-13/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-13/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-13/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-13/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-13/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-13/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-14":{stats:{wins:118,losses:98},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-14/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-14/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-14/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-14/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-14/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-14/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-15":{stats:{wins:117,losses:104},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-15/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-15/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-15/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-15/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-15/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-15/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-16":{stats:{wins:89,losses:118},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-16/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-16/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-16/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-16/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-16/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-16/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-17":{stats:{wins:119,losses:85},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-17/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-17/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-17/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-17/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-17/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-17/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-18":{stats:{wins:120,losses:101},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-18/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-18/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-18/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-18/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-18/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-18/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-19":{stats:{wins:137,losses:96},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-19/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-19/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-19/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-19/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-19/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-19/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-20":{stats:{wins:100,losses:91},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-20/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-20/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-20/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-20/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-20/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-20/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-21":{stats:{wins:93,losses:106},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-21/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-21/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-21/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-21/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-21/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-21/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-22":{stats:{wins:117,losses:141},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-22/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-22/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-22/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-22/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-22/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-22/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-23":{stats:{wins:114,losses:90},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-23/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-23/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-23/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-23/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-23/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-23/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-24":{stats:{wins:88,losses:103},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-24/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-24/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-24/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-24/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-24/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-24/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-25":{stats:{wins:108,losses:102},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-25/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-25/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-25/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-25/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-25/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-25/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-26":{stats:{wins:114,losses:109},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-26/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-26/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-26/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-26/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-26/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-26/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-27":{stats:{wins:87,losses:123},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-27/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-27/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-27/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-27/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-27/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-27/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-28":{stats:{wins:105,losses:111},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-28/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-28/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-28/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-28/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-28/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-28/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-29":{stats:{wins:118,losses:85},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-29/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-29/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-29/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-29/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-29/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-29/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-30":{stats:{wins:99,losses:89},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-30/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-30/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-30/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-30/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-30/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-30/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-31":{stats:{wins:91,losses:117},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-31/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-31/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-31/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-31/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-31/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-31/avoidGeorge_vgfmri4.replay.json.gz"}},"sub-32":{stats:{wins:66,losses:120},replays:{bait_vgfmri4:"llm_catalogue/cohort4/sub-32/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/cohort4/sub-32/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/cohort4/sub-32/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/cohort4/sub-32/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/cohort4/sub-32/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/cohort4/sub-32/avoidGeorge_vgfmri4.replay.json.gz"}}},"lrm-cr":{"deepseek/deepseek-v3.2":{stats:{wins:138,losses:58},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/avoidGeorge_vgfmri4.replay.json.gz"}},"deepseek/deepseek-v4-flash":{stats:{wins:140,losses:53},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/avoidGeorge_vgfmri4.replay.json.gz"}},"deepseek/deepseek-v4-pro":{stats:{wins:82,losses:22},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-122b-a10b":{stats:{wins:75,losses:52},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-27b":{stats:{wins:102,losses:68},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-27b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-35b-a3b":{stats:{wins:74,losses:41},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-397b-a17b":{stats:{wins:120,losses:66},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-9b":{stats:{wins:20,losses:14},replays:{bait_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-cr/qwen/qwen3.5-9b/avoidGeorge_vgfmri4.replay.json.gz"}}},"lrm-ao":{"deepseek/deepseek-v3.2":{stats:{wins:37,losses:68},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/avoidGeorge_vgfmri4.replay.json.gz"}},"deepseek/deepseek-v4-flash":{stats:{wins:51,losses:77},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/avoidGeorge_vgfmri4.replay.json.gz"}},"deepseek/deepseek-v4-pro":{stats:{wins:66,losses:75},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-122b-a10b":{stats:{wins:34,losses:67},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-27b":{stats:{wins:38,losses:70},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-27b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-35b-a3b":{stats:{wins:27,losses:68},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-397b-a17b":{stats:{wins:40,losses:70},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/avoidGeorge_vgfmri4.replay.json.gz"}},"qwen/qwen3.5-9b":{stats:{wins:34,losses:114},replays:{bait_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/bait_vgfmri3.replay.json.gz",chase_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/chase_vgfmri3.replay.json.gz",helper_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/helper_vgfmri3.replay.json.gz",lemmings_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/lemmings_vgfmri3.replay.json.gz",zelda_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/zelda_vgfmri3.replay.json.gz",plaqueAttack_vgfmri3:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/plaqueAttack_vgfmri3.replay.json.gz",bait_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/bait_vgfmri4.replay.json.gz",chase_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/chase_vgfmri4.replay.json.gz",helper_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/helper_vgfmri4.replay.json.gz",lemmings_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/lemmings_vgfmri4.replay.json.gz",zelda_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/zelda_vgfmri4.replay.json.gz",avoidGeorge_vgfmri4:"llm_catalogue/lrm-ao/qwen/qwen3.5-9b/avoidGeorge_vgfmri4.replay.json.gz"}}}},dw=["bait_vgfmri3","chase_vgfmri3","helper_vgfmri3","lemmings_vgfmri3","zelda_vgfmri3","plaqueAttack_vgfmri3"],bw=["bait_vgfmri4","chase_vgfmri4","helper_vgfmri4","lemmings_vgfmri4","zelda_vgfmri4","avoidGeorge_vgfmri4"],Me=[{id:"cohort3",title:"Cohort 3 (vgfmri3)",games:dw,type:"human",cohort:"vgfmri3"},{id:"cohort4",title:"Cohort 4 (vgfmri4)",games:bw,type:"human",cohort:"vgfmri4"},{id:"lrm-cr",title:"Large Reasoning Models -- Copied-reasoning",games:[...dw,...bw],type:"llm",rationale_mode:"copied-reasoning",suggestion_level:"elaborate"},{id:"lrm-ao",title:"Large Reasoning Models -- Action-only",games:[...dw,...bw],type:"llm",rationale_mode:"action-only",suggestion_level:"elaborate"}],Be={bait_vgfmri3:"Bait (v3)",bait_vgfmri4:"Bait (v4)",chase_vgfmri3:"Chase (v3)",chase_vgfmri4:"Chase (v4)",helper_vgfmri3:"Helper (v3)",helper_vgfmri4:"Helper (v4)",lemmings_vgfmri3:"Lemmings (v3)",lemmings_vgfmri4:"Lemmings (v4)",zelda_vgfmri3:"Zelda (v3)",zelda_vgfmri4:"Zelda (v4)",plaqueAttack_vgfmri3:"Plaque Attack (v3)",avoidGeorge_vgfmri4:"Avoid George (v4)"},Ne={bait_vgfmri3:"Bait",bait_vgfmri4:"Bait",chase_vgfmri3:"Chase",chase_vgfmri4:"Chase",helper_vgfmri3:"Helper",helper_vgfmri4:"Helper",lemmings_vgfmri3:"Lemmings",lemmings_vgfmri4:"Lemmings",zelda_vgfmri3:"Zelda",zelda_vgfmri4:"Zelda",plaqueAttack_vgfmri3:"Plaque Attack",avoidGeorge_vgfmri4:"Avoid George"},Pe=18,fe=20,De=300,He=700,yw={};async function Fe(){yw=Ce}function Ke(r){let w=yw[r];return w?Object.keys(w).sort():[]}function Ue(r,w){return yw[r]?.[w]?.stats||{wins:0,losses:0}}function Cw(r,w,e){return yw[r]?.[w]?.replays?.[e]||null}async function We(r){if(!window.__REPLAY_GZ__?.[r]){let o="catalogue-data/"+r.replace(".replay.json.gz",".replay.js");await new Promise((a,g)=>{let c=document.createElement("script");c.src=o,c.onload=a,c.onerror=()=>g(new Error("Failed to load replay script: "+o)),document.head.appendChild(c)})}let w=window.__REPLAY_GZ__?.[r];if(!w)throw new Error("Replay data missing after load: "+r);let e=Uint8Array.from(atob(w),o=>o.charCodeAt(0)),t=new DecompressionStream("gzip"),s=t.writable.getWriter();s.write(e),s.close();let l=await new Response(t.readable).text(),i=JSON.parse(l);return pe(i),i}function ue(r,w){let e={};for(let[t,s]of Object.entries(r.sprites))e[t]=s.map(l=>({id:l.id,key:l.key,x:l.col*w,y:l.row*w,w,h:w,alive:l.alive,resources:l.resources||{},speed:l.speed,cooldown:l.cooldown,orientation:l.orientation,_age:l._age,lastmove:l.lastmove}));return{score:r.score,time:r.time,sprites:e}}var Y=class{constructor(w,e,t,s){this.gameName=e,this.playbackMode=t,this.replayData=null,this.s3Key=null,this.states=[],this.steps=[],this.totalFrames=0,this.currentFrameIndex=0,this.currentStepIndex=0,this.playing=!1,this.playTimer=null,this.streamTimer=null,this.streamedChars=0,this._fullRationale="",this.currentLevel=null,this.currentLevelNum=-1,this.game=null,this.renderer=null,this.levels={},this._build(w,s)}_build(w,e){let t=document.createElement("div");t.className="game-card",this.titleEl=document.createElement("a"),this.titleEl.className="game-card-title",this.titleEl.textContent=e?Be[this.gameName]||this.gameName:Ne[this.gameName]||this.gameName,this.titleEl.addEventListener("click",()=>this._openFullViewer()),t.appendChild(this.titleEl),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="canvas-container",this.canvas=document.createElement("canvas"),this.canvasContainer.appendChild(this.canvas),this.overlay=document.createElement("div"),this.overlay.className="canvas-overlay",this.overlay.textContent="Loading...",this.canvasContainer.appendChild(this.overlay),this.playIndicator=document.createElement("div"),this.playIndicator.className="play-indicator",this.playIndicator.innerHTML='<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>',this.canvasContainer.appendChild(this.playIndicator),this.canvasContainer.addEventListener("click",a=>{this.overlay.classList.contains("hidden")&&(a.stopPropagation(),this.togglePlay())}),t.appendChild(this.canvasContainer);let s=document.createElement("div");s.className="card-drawer-anchor";let l=document.createElement("div");l.className="card-drawer";let i=document.createElement("div");i.className="card-drawer-inner",this.scrubber=document.createElement("input"),this.scrubber.type="range",this.scrubber.min=0,this.scrubber.max=0,this.scrubber.value=0,this.scrubber.addEventListener("input",()=>{this._updatingScrubber||(this.stop(),this._goToIndex(parseInt(this.scrubber.value)))}),i.appendChild(this.scrubber);let o=document.createElement("div");if(o.className="flap-tabs",this.descTab=this._makeTab("Game Description","flap-tab-desc"),this.levelTab=this._makeTab("Level Layout","flap-tab-level"),this.tryTab=this._makeTab("Try Yourself","flap-tab-try"),o.appendChild(this.descTab),o.appendChild(this.levelTab),o.appendChild(this.tryTab),i.appendChild(o),this.descPanel=this._makePanel("flap-panel-desc"),this.descTextarea=this._makeTextarea(120),this.descPanel.appendChild(this.descTextarea),i.appendChild(this.descPanel),this.levelPanel=this._makePanel("flap-panel-level"),this.levelTextarea=this._makeTextarea(80),this.levelPanel.appendChild(this.levelTextarea),i.appendChild(this.levelPanel),this.descTab.addEventListener("click",()=>this._toggleFlap("desc")),this.levelTab.addEventListener("click",()=>this._toggleFlap("level")),this.tryTab.addEventListener("click",()=>this._openTryPage()),this.playbackMode==="llm"){let a=document.createElement("div");a.className="reasoning-stripe no-reasoning",this.reasoningText=document.createElement("div"),this.reasoningText.className="reasoning-text",this.reasoningText.textContent="",a.appendChild(this.reasoningText);let g=document.createElement("div");g.className="click-hint",g.textContent="Click to open full viewer",a.appendChild(g),this.reasoningStripe=a,a.addEventListener("click",()=>this._openFullViewer()),i.appendChild(a)}else this.reasoningStripe=null,this.reasoningText=null;l.appendChild(i),s.appendChild(l),t.appendChild(s),w.appendChild(t),this.cardEl=t}_makeTab(w,e){let t=document.createElement("button");return t.className="flap-tab "+e,t.textContent=w,t}_makePanel(w){let e=document.createElement("div");return e.className="flap-panel "+w,e}_makeTextarea(w){let e=document.createElement("textarea");return e.readOnly=!0,e.spellcheck=!1,e.style.height=w+"px",e}_toggleFlap(w){let e=[{tab:this.descTab,panel:this.descPanel,id:"desc"},{tab:this.levelTab,panel:this.levelPanel,id:"level"}];for(let t of e)if(t.id===w){let s=!t.panel.classList.contains("open");if(t.panel.classList.toggle("open"),t.tab.classList.toggle("active"),!s)continue}else t.panel.classList.remove("open"),t.tab.classList.remove("active")}_currentIndex(){return this.playbackMode==="human"?this.currentFrameIndex:this.currentStepIndex}_maxIndex(){return this.playbackMode==="human"?Math.max(0,this.totalFrames-1):Math.max(0,this.steps.length-1)}async load(w){if(this.overlay.textContent="Loading...",this.overlay.classList.remove("hidden"),this.stop(),this.s3Key=w,!w){this.overlay.textContent="No replay available";return}let e=await We(w);this.replayData=e,this.states=e.states||[],this.steps=(e.steps||[]).filter(l=>!l.action.startsWith("_")),this.totalFrames=this.states.length;let t=he[this.gameName];if(!t){this.overlay.textContent="Unknown game: "+this.gameName;return}if(this.playbackMode==="human"&&!e.game_description)throw new Error(this.gameName+": human replay missing game_description field");this.activeDesc=e.game_description||t.description;let s=new _w;this.game=s.parseGame(this.activeDesc),this.renderer=new vw(this.canvas,Pe),this.levels=t.levels||{},this.currentLevelNum=-1,this.descTextarea.value=this.activeDesc,this.scrubber.max=this._maxIndex(),this.scrubber.value=0,this.overlay.classList.add("hidden"),this._initialLoad=!0,this._goToIndex(0),this._initialLoad=!1}_buildLevel(w){if(w===this.currentLevelNum)return;let e=this.levels[w];if(!e)return;this.currentLevel=this.game.buildLevel(e),this.currentLevelNum=w,this.renderer.resize(this.currentLevel.width,this.currentLevel.height),this.levelTextarea.value=e;let t=e.split(`
`).filter(l=>l.length>0);this.levelTextarea.style.height=Math.min(t.length*14+8,160)+"px";let s=this.currentLevel.sprite_registry._liveSpritesByKey.wall;if(s&&s.length>0){let l=s[0].color;l&&(this.canvasContainer.style.background=`rgb(${l[0]},${l[1]},${l[2]})`)}}_goToIndex(w){this.playbackMode==="human"?this._goToFrame(w):this._goToStep(w)}_goToFrame(w){if(!this.states.length)return;w=Math.max(0,Math.min(w,this.totalFrames-1)),this.currentFrameIndex=w;let e=this.states[w],t=e.level!==void 0?e.level:0;this._buildLevel(t),this.currentLevel&&(this.currentLevel.setGameState(ue(e,this.currentLevel.block_size)),this.currentLevel.score=e.score,this.currentLevel.time=w,this.renderer.render(this.currentLevel)),this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1}_goToStep(w){if(!this.steps.length)return;w=Math.max(0,Math.min(w,this.steps.length-1)),this.currentStepIndex=w;let e=this.steps[w];this._buildLevel(e.level!==void 0?e.level:0);let t=e.state_index!==void 0?e.state_index:e.frame_idx!==void 0?e.frame_idx:w;if(t>=0&&t<this.states.length&&this.currentLevel){let s=this.states[t];this.currentLevel.setGameState(ue(s,this.currentLevel.block_size)),this.currentLevel.score=s.score,this.currentLevel.time=s.time,this.renderer.render(this.currentLevel)}this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1,this._updateReasoning(e)}_updateReasoning(w){if(this._stopStream(),!this.reasoningStripe){this.playing&&this._scheduleNoReasoningAdvance();return}let t=(w.response||{}).rationale||w.hidden_reasoning||"";if(!t){this.reasoningStripe.classList.add("no-reasoning"),this.reasoningText.textContent=this.playing?w.action||"--":"",this.playing&&this._scheduleNoReasoningAdvance();return}if(this.reasoningStripe.classList.remove("no-reasoning"),!this.playing){this.reasoningText.textContent=this._initialLoad?"":t;return}this.streamedChars=0,this._fullRationale=t,this.reasoningText.textContent="",this._streamStartTime=performance.now(),this._streamDurationMs=Math.min(t.length/De*1e3,He),this._streamTick()}_streamTick(){let w=performance.now()-this._streamStartTime,e=Math.min(1,w/this._streamDurationMs),t=Math.round(e*this._fullRationale.length);this.reasoningText.textContent=this._fullRationale.slice(0,t),this.reasoningStripe.scrollTop=this.reasoningStripe.scrollHeight,e<1?this.streamTimer=requestAnimationFrame(()=>this._streamTick()):(this.streamTimer=null,this._onStreamDone())}_onStreamDone(){if(this.playing){if(this._currentIndex()>=this._maxIndex()){this.stop();return}this._goToIndex(this._currentIndex()+1)}}_scheduleNoReasoningAdvance(){this.playTimer=setTimeout(()=>this._onStreamDone(),1e3/fe)}_stopStream(){this.streamTimer&&(cancelAnimationFrame(this.streamTimer),this.streamTimer=null)}togglePlay(){this.playing?this.stop():this.play()}_flashIndicator(w){let e=w==="pause"?'<svg viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>':'<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>';this.playIndicator.innerHTML=e,this.playIndicator.classList.add("flash"),clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>this.playIndicator.classList.remove("flash"),400)}play(){this.playing=!0,this.cardEl.classList.add("is-playing"),this._flashIndicator("play"),this.playbackMode==="llm"?this.steps.length&&this._updateReasoning(this.steps[this.currentStepIndex]):this._scheduleNextFrame()}stop(){this.playing=!1,this.cardEl.classList.remove("is-playing"),this._flashIndicator("pause"),this._stopStream(),this.playTimer&&(clearTimeout(this.playTimer),this.playTimer=null)}_scheduleNextFrame(){if(!this.playing||this.currentFrameIndex>=this.totalFrames-1){this.stop();return}this.playTimer=setTimeout(()=>{this.playing&&(this._goToFrame(this.currentFrameIndex+1),this._scheduleNextFrame())},1e3/fe)}_openFullViewer(){if(!this.s3Key)return;let w="replay.html?local-key="+encodeURIComponent(this.s3Key)+"&step="+this.currentStepIndex;window.location.href=w}_openTryPage(){let w=this.currentLevelNum>=0?this.currentLevelNum:0,e="interactive-gameplay.html?game="+encodeURIComponent(this.gameName)+"&level="+w;this.s3Key&&(e+="&replay="+encodeURIComponent(this.s3Key)),window.location.href=e}destroy(){this.stop(),this.cardEl?.remove()}},Mw=class{constructor(w,e){this.def=e,this.cards=[],this.subjects=[],this.activeSubject=null,this.el=document.createElement("div"),this.el.className="cohort-section";let t=document.createElement("h2");t.className="cohort-heading",t.textContent=e.title,this.el.appendChild(t),this.selectorRow=document.createElement("div"),this.selectorRow.className="selector-row",this.el.appendChild(this.selectorRow),this.gridContainer=document.createElement("div"),this.el.appendChild(this.gridContainer),w.appendChild(this.el)}populate(){this.subjects=Ke(this.def.id),this._buildTabs(),this.subjects.length>0&&this.select(this.subjects[0])}_buildTabs(){this.selectorRow.innerHTML="";for(let w of this.subjects){let e=document.createElement("button");e.className="selector-tab";let t=Ue(this.def.id,w),s=this.def.type==="llm"?w.split("/").pop():w;e.innerHTML=`${s} <span class="stats">${t.wins}W/${t.losses}L</span>`,e.addEventListener("click",()=>this.select(w)),this.selectorRow.appendChild(e)}}async select(w){this.activeSubject=w,this.selectorRow.querySelectorAll(".selector-tab").forEach((i,o)=>{i.classList.toggle("active",this.subjects[o]===w)});for(let i of this.cards)i.destroy();this.cards=[],this.gridContainer.innerHTML="";let t=this.def.type==="llm",s=t?"llm":"human",l=this.def.games;if(t){let i=document.createElement("div");i.className="cohort-block-label",i.textContent="vgfmri3 games",this.gridContainer.appendChild(i);let o=document.createElement("div");o.className="game-grid",this.gridContainer.appendChild(o);for(let m of dw){let h=new Y(o,m,s,!0);this.cards.push(h),h.load(Cw(this.def.id,w,m))}let a=document.createElement("hr");a.className="cohort-block-separator",this.gridContainer.appendChild(a);let g=document.createElement("div");g.className="cohort-block-label",g.textContent="vgfmri4 games",this.gridContainer.appendChild(g);let c=document.createElement("div");c.className="game-grid",this.gridContainer.appendChild(c);for(let m of bw){let h=new Y(c,m,s,!0);this.cards.push(h),h.load(Cw(this.def.id,w,m))}}else{let i=document.createElement("div");i.className="game-grid",this.gridContainer.appendChild(i);for(let o of l){let a=new Y(i,o,s,!1);this.cards.push(a),a.load(Cw(this.def.id,w,o))}}}};async function Ye(){let r=document.getElementById("catalogue-root");await Fe(),r.innerHTML="";for(let w of Me)new Mw(r,w).populate()}Ye();})();
