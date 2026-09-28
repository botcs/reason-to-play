// Copyright (c) 2026 Botos Csaba. MIT License. See LICENSE for details.
(()=>{var Ew=class{constructor(){this._register={}}has(w){return w in this._register}register(w,e){this._register[w]=e}registerClass(w){this.register(w.name,w)}request(w){if(!(w in this._register))throw new Error(`Unknown registry key: '${w}'`);return this._register[w]}registerAll(w){for(let[e,t]of Object.entries(w))this.register(e,t)}},n=new Ew;var G=class r{constructor(w,e,t,s){this.x=w,this.y=e,this.w=t,this.h=s}static fromPosSize(w,e){return new r(w[0],w[1],e[0],e[1])}get left(){return this.x}set left(w){this.x=w}get top(){return this.y}set top(w){this.y=w}get right(){return this.x+this.w}get bottom(){return this.y+this.h}get width(){return this.w}get height(){return this.h}get centerx(){return this.x+Math.floor(this.w/2)}get centery(){return this.y+Math.floor(this.h/2)}get center(){return[this.centerx,this.centery]}get topleft(){return[this.x,this.y]}get size(){return[this.w,this.h]}move(w,e){return typeof w=="object"&&w!==null?new r(this.x+w.x,this.y+w.y,this.w,this.h):new r(this.x+w,this.y+e,this.w,this.h)}copy(){return new r(this.x,this.y,this.w,this.h)}colliderect(w){return this.x<w.x+w.w&&this.x+this.w>w.x&&this.y<w.y+w.h&&this.y+this.h>w.y}collidelistall(w){let e=[];for(let t=0;t<w.length;t++)this.colliderect(w[t].rect||w[t])&&e.push(t);return e}contains(w){return w.x>=this.x&&w.y>=this.y&&w.x+w.w<=this.x+this.w&&w.y+w.h<=this.y+this.h}equals(w){return this.x===w.x&&this.y===w.y&&this.w===w.w&&this.h===w.h}toString(){return`Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`}};var S=class r{constructor(...w){this.keys=Object.freeze([...w].sort())}asVector(){let w=0,e=0;for(let t of this.keys)t==="LEFT"&&(w-=1),t==="RIGHT"&&(w+=1),t==="UP"&&(e-=1),t==="DOWN"&&(e+=1);return{x:w,y:e}}equals(w){if(!(w instanceof r)||this.keys.length!==w.keys.length)return!1;for(let e=0;e<this.keys.length;e++)if(this.keys[e]!==w.keys[e])return!1;return!0}toString(){return this.keys.length===0?"noop":this.keys.join(",")}},bw={NOOP:new S,UP:new S("UP"),DOWN:new S("DOWN"),LEFT:new S("LEFT"),RIGHT:new S("RIGHT"),SPACE:new S("SPACE"),SPACE_RIGHT:new S("SPACE","RIGHT"),SPACE_LEFT:new S("SPACE","LEFT")},Qw=bw.NOOP;var kw=[129,199,132],j=[25,118,210],$=[211,47,47],Rw=[69,90,100],X=[250,250,250],Oe=[109,76,65],Cw=[55,71,79],Bw=[230,81,0],Ie=[255,245,157],Te=[255,138,128],Le=[255,196,0],Fe=[255,82,82],Ue=[255,112,67],He=[144,202,249],Pe=[185,246,202],Me=[207,216,220],qe=[68,90,100],Ye=[1,87,155],Ne=[92,107,192],Ve=[200,150,220],De=[255,230,230],Z={GREEN:kw,BLUE:j,RED:$,GRAY:Rw,WHITE:X,BROWN:Oe,BLACK:Cw,ORANGE:Bw,YELLOW:Ie,PINK:Te,GOLD:Le,LIGHTRED:Fe,LIGHTORANGE:Ue,LIGHTBLUE:He,LIGHTGREEN:Pe,LIGHTGRAY:Me,DARKGRAY:qe,DARKBLUE:Ye,PURPLE:Ne,LIGHTPURPLE:Ve,LIGHTPINK:De},Gw={x:0,y:-1},Ow={x:0,y:1},P={x:-1,y:0},y={x:1,y:0},O=[Gw,P,Ow,y];function M(r,w){return r.x===w.x&&r.y===w.y}function Qe(r){return Math.sqrt(r.x*r.x+r.y*r.y)}function E(r){let w=Qe(r);return w>0?{x:r.x/w,y:r.y/w}:{x:1,y:0}}var I=class{constructor(w){Array.isArray(w)?this.gridsize=w:this.gridsize=[w,w]}passiveMovement(w){let e=w.speed===null?1:w.speed;e!==0&&w.orientation!==void 0&&w._updatePosition(w.orientation,e*this.gridsize[0])}activeMovement(w,e,t){if(t==null&&(t=w.speed===null?1:w.speed),t!==0&&e!==null&&e!==void 0){let s;if(e.asVector?s=e.asVector():s=e,M(s,{x:0,y:0}))return;w._updatePosition(s,t*this.gridsize[0])}}distance(w,e){return Math.abs(w.top-e.top)+Math.abs(w.left-e.left)}};var We=Z,v=class{static is_static=!1;static only_active=!1;static is_avatar=!1;static is_stochastic=!1;static color=null;static cooldown=0;static speed=null;static mass=1;static physicstype=null;static shrinkfactor=0;constructor(w){let{key:e,id:t,pos:s,size:i=[1,1],color:o,speed:a,cooldown:l,physicstype:c,rng:h,img:p,resources:m,..._}=w;this.key=e,this.id=t;let u=Array.isArray(i)?i:[i,i];this.rect=new G(s[0],s[1],u[0],u[1]),this.lastrect=this.rect,this.alive=!0;let d=c||this.constructor.physicstype||I;if(this.physics=new d(u),this.speed=a??this.constructor.speed,this.cooldown=l??this.constructor.cooldown,this.img=p||null,this.color=o||this.constructor.color,this.img&&this.img.startsWith("colors/")){let g=this.img.split("/")[1],f=We[g];f&&(this.color=f)}this._effect_data={},this.lastmove=0,this.resources=new Proxy(m?{...m}:{},{get(g,f){return typeof f=="string"&&!(f in g)&&f!=="toJSON"&&f!=="then"&&f!==Symbol.toPrimitive&&f!==Symbol.toStringTag&&f!=="inspect"&&f!=="constructor"&&f!=="__proto__"?0:g[f]},set(g,f,x){return g[f]=x,!0}}),this.just_pushed=null,this.is_static=this.constructor.is_static,this.only_active=this.constructor.only_active,this.is_avatar=this.constructor.is_avatar,this.is_stochastic=this.constructor.is_stochastic,this.mass=this.constructor.mass,this.shrinkfactor=this.constructor.shrinkfactor,this.stypes=[];for(let[g,f]of Object.entries(_))this[g]=f}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this)}_updatePosition(w,e){let t,s;if(e==null){let i=this.speed||0;t=w.x*i,s=w.y*i}else t=w.x*e,s=w.y*e;this.lastmove>=this.cooldown&&(this.rect=this.rect.move({x:t,y:s}),this.lastmove=0)}get lastdirection(){return{x:this.rect.x-this.lastrect.x,y:this.rect.y-this.lastrect.y}}toString(){return`${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`}},A=class extends v{static value=1;static limit=2;static res_type=null;constructor(w){super(w),this.value=w.value!==void 0?w.value:this.constructor.value,this.limit=w.limit!==void 0?w.limit:this.constructor.limit,this.res_type=w.res_type||this.constructor.res_type}get resource_type(){return this.res_type===null?this.key:this.res_type}},J=class extends v{static is_static=!0;update(w){}_updatePosition(){throw new Error("Tried to move Immutable")}};var ww=class extends v{static color=Rw;static is_static=!0},ew=class extends v{static color=$},tw=class extends A{static is_static=!0},q=class extends v{static color=$;static limit=1;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}},k=class extends v{static draw_arrow=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||y)}},Y=class extends k{static speed=1},N=class extends k{static draw_arrow=!0;static speed=0;constructor(w){super(w),this._age=0,w.limit!==void 0?this.limit=w.limit:this.limit=this.constructor.limit||1}update(w){super.update(w),this._age+=1,this._age>=this.limit&&w.killSprite(this)}};N.limit=1;var T=class extends v{static stype=null},rw=class extends T{static is_static=!0;static is_stochastic=!0;static color=j},L=class extends T{static color=Cw;static is_static=!0;constructor(w){super(w),this.counter=0,this.prob=w.prob!==void 0?w.prob:1,this.total=w.total!==void 0?w.total:null,w.cooldown!==void 0?this.cooldown=w.cooldown:this.cooldown===0&&(this.cooldown=1),this.is_stochastic=this.prob>0&&this.prob<1}update(w){w.time%this.cooldown===0&&w.randomGenerator.random()<this.prob&&(w.addSpriteCreation(this.stype,[this.rect.x,this.rect.y]),this.counter+=1),this.total&&this.counter>=this.total&&w.killSprite(this)}},V=class extends v{static speed=1;static is_stochastic=!0;update(w){super.update(w);let e=O[Math.floor(w.randomGenerator.random()*O.length)];this.physics.activeMovement(this,e)}},D=class extends V{static stype=null;constructor(w){super(w),this.fleeing=w.fleeing||!1,this.stype=w.stype||this.constructor.stype}_closestTargets(w){let e=1e100,t=[],s=w.getSprites(this.stype);for(let i of s){let o=this.physics.distance(this.rect,i.rect);o<e?(e=o,t=[i]):o===e&&t.push(i)}return t}_movesToward(w,e){let t=[],s=this.physics.distance(this.rect,e.rect);for(let i of O){let o=this.rect.move(i),a=this.physics.distance(o,e.rect);this.fleeing&&s<a&&t.push(i),!this.fleeing&&s>a&&t.push(i)}return t}update(w){v.prototype.update.call(this,w);let e=[];for(let s of this._closestTargets(w))e.push(...this._movesToward(w,s));e.length===0&&(e=[...O]);let t=e[Math.floor(w.randomGenerator.random()*e.length)];this.physics.activeMovement(this,t)}},sw=class extends D{constructor(w){super({...w,fleeing:!0})}},iw=class extends L{static color=Bw;static is_static=!1;constructor(w){super(w),this.orientation===void 0&&(this.orientation=w.orientation||y),this.speed=w.speed!==void 0?w.speed:1}update(w){this.lastrect=this.rect,this.lastmove+=1,!this.is_static&&!this.only_active&&this.physics.passiveMovement(this),L.prototype.update.call(this,w)}},ow=class extends Y{static is_stochastic=!0;update(w){if(this.lastdirection.x===0){let t;this.orientation.x>0?t=1:this.orientation.x<0?t=-1:t=w.randomGenerator.random()<.5?-1:1,this.physics.activeMovement(this,{x:t,y:0})}super.update(w)}},aw=class extends k{static is_static=!0;static color=j;static strength=1;static draw_arrow=!0},lw=class r extends q{static spreadprob=1;update(w){if(super.update(w),this._age===2)for(let e of O)w.randomGenerator.random()<(this.spreadprob||r.spreadprob)&&w.addSpriteCreation(this.name,[this.lastrect.x+e.x*this.lastrect.w,this.lastrect.y+e.y*this.lastrect.h])}};function hw(r,w){let e=[...w.active_keys].sort();for(let t=Math.max(3,e.length);t>=0;t--)for(let s of ze(e,t)){let i=s.join(",");if(r._keysToAction.has(i))return r._keysToAction.get(i)}throw new Error("No valid actions encountered, consider allowing NO_OP")}function ze(r,w){if(w===0)return[[]];if(r.length===0)return[];let e=[];function t(s,i){if(i.length===w){e.push([...i]);return}for(let o=s;o<r.length;o++)i.push(r[o]),t(o+1,i),i.pop()}return t(0,[]),e}function Kw(r){let w=new Map;for(let e of Object.values(r)){let t=[...e.keys].sort().join(",");w.set(t,e)}return w}var Q=class extends v{static color=X;static speed=1;static is_avatar=!0;constructor(w){super(w),this.is_avatar=!0;let e=this.constructor.declarePossibleActions();this._keysToAction=Kw(e)}static declarePossibleActions(){return{UP:new S("UP"),DOWN:new S("DOWN"),LEFT:new S("LEFT"),RIGHT:new S("RIGHT"),NO_OP:new S}}update(w){v.prototype.update.call(this,w);let e=hw(this,w);e.equals(Qw)||this.physics.activeMovement(this,e)}},R=class extends v{static color=X;static speed=1;static is_avatar=!0;static draw_arrow=!1;constructor(w){super(w),this.is_avatar=!0,this.orientation===void 0&&(this.orientation=w.orientation||y);let e=this.constructor.declarePossibleActions();this._keysToAction=Kw(e)}static declarePossibleActions(){return{UP:new S("UP"),DOWN:new S("DOWN"),LEFT:new S("LEFT"),RIGHT:new S("RIGHT"),NO_OP:new S}}update(w){let e=this.orientation;this.orientation={x:0,y:0},v.prototype.update.call(this,w);let t=hw(this,w);t&&this.physics.activeMovement(this,t);let s=this.lastdirection;Math.abs(s.x)+Math.abs(s.y)!==0?this.orientation=s:this.orientation=e}},nw=class extends R{static ammo=null;constructor(w){super(w),this.stype=w.stype||null,this.ammo=w.ammo!==void 0?w.ammo:this.constructor.ammo}static declarePossibleActions(){let w=R.declarePossibleActions();return w.SPACE=new S("SPACE"),w}update(w){R.prototype.update.call(this,w);let e=hw(this,w);this._hasAmmo()&&e.equals(bw.SPACE)&&this._shoot(w)}_hasAmmo(){return this.ammo===null?!0:this.ammo in this.resources?this.resources[this.ammo]>0:!1}_spendAmmo(){this.ammo!==null&&this.ammo in this.resources&&(this.resources[this.ammo]-=1)}_shoot(w){if(this.stype===null)return;let e=this._shootDirections(w);for(let t of e){let s=[this.lastrect.x+t.x*this.lastrect.w,this.lastrect.y+t.y*this.lastrect.h],i=w.createSprite(this.stype,s);i&&i.orientation!==void 0&&(i.orientation=t)}this._spendAmmo()}_shootDirections(w){return[E(this.orientation)]}},C=class extends Q{static declarePossibleActions(){return{LEFT:new S("LEFT"),RIGHT:new S("RIGHT"),NO_OP:new S}}update(w){v.prototype.update.call(this,w);let e=hw(this,w),t=e.asVector();(M(t,y)||M(t,P))&&this.physics.activeMovement(this,e)}},cw=class extends C{static color=kw;constructor(w){super(w),this.stype=w.stype||null}static declarePossibleActions(){let w=C.declarePossibleActions();return w.SPACE=new S("SPACE"),w}update(w){C.prototype.update.call(this,w),this.stype&&w.active_keys.includes("SPACE")&&w.createSprite(this.stype,[this.rect.x,this.rect.y])}};function b(r,w,e){e.killSprite(r)}function Ww(r,w,e){e.killSprite(r),e.killSprite(w)}function zw(r,w,e){e.addSpriteCreation(r.key,[r.rect.x,r.rect.y])}function F(r,w,e,{stype:t="wall"}={}){let s=r.lastrect;e.killSprite(r);let i=e.addSpriteCreation(t,r.rect.topleft);i!=null&&(i.lastrect=s,r.orientation!==void 0&&i.orientation!==void 0&&(i.orientation=r.orientation))}function jw(r,w,e,{resource:t,limit:s=1,no_symmetry:i=!1,exhaustStype:o=null}={}){r.resources[t]<s?K(r,w,e,{no_symmetry:i}):o?e.kill_list.includes(w)||F(w,r,e,{stype:o}):b(w,r,e)}function K(r,w,e,{no_symmetry:t=!1}={}){!e.kill_list.includes(w)&&!e.kill_list.includes(r)&&(r.rect.equals(r.lastrect)&&!t?(w.rect=w.lastrect,Iw(w,0)):(r.rect=r.lastrect,Iw(r,0)))}function Iw(r,w){w>5||r.just_pushed&&(r.just_pushed.rect=r.just_pushed.lastrect,Iw(r.just_pushed,w+1))}function $w(r,w,e){for(let t of e.sprite_registry.sprites())t.rect=t.lastrect}function Tw(r,w){return r.just_pushed&&w<3?Tw(r.just_pushed,w+1):r.lastdirection}function Xw(r,w,e){let t=Tw(w,0);Math.abs(t.x)+Math.abs(t.y)===0?(t=Tw(r,0),w.physics.activeMovement(w,E(t)),w.just_pushed=r):(r.physics.activeMovement(r,E(t)),r.just_pushed=w)}function Zw(r,w,e,{exhaustStype:t=null}={}){if(r.lastrect.colliderect(w.rect))return;let s=r.lastdirection;if(Math.abs(s.x)+Math.abs(s.y)===0)return;let o=E(s),a=r.rect.width,l=r.rect.copy();l.x+=Math.round(o.x)*a,l.y+=Math.round(o.y)*a,!(l.x<0||l.y<0||l.x+l.width>e.screensize[0]||l.y+l.height>e.screensize[1])&&(r.rect=l,r.lastmove=0,t&&F(w,r,e,{stype:t}))}function Lw(r,w,e,{with_step_back:t=!0}={}){t&&(r.rect=r.lastrect),r.orientation!==void 0&&(r.orientation={x:-r.orientation.x,y:-r.orientation.y})}function Jw(r,w,e){r.rect=r.lastrect,r.lastmove=r.cooldown,r.physics.activeMovement(r,{x:0,y:1},1),Lw(r,w,e,{with_step_back:!1})}function we(r,w,e){let t=[{x:0,y:-1},{x:-1,y:0},{x:0,y:1},{x:1,y:0}];r.orientation=t[Math.floor(e.randomGenerator.random()*t.length)]}function ee(r,w,e,{offset:t=0}={}){r.rect.top<0?r.rect.top=e.screensize[1]-r.rect.height:r.rect.top+r.rect.height>e.screensize[1]&&(r.rect.top=0),r.rect.left<0?r.rect.left=e.screensize[0]-r.rect.width:r.rect.left+r.rect.width>e.screensize[0]&&(r.rect.left=0),r.lastmove=0}function te(r,w,e){if(!(r instanceof A))throw new Error(`collectResource: sprite must be a Resource, got ${r.constructor.name}`);let t=r.resource_type,s=e.domain.resources_limits&&e.domain.resources_limits[t]||1/0;w.resources[t]=Math.max(0,Math.min(w.resources[t]+r.value,s))}function re(r,w,e,{resource:t,value:s=1}={}){e.resource_changes.push([r,t,s])}function se(r,w,e,{resource:t,value:s=1}={}){e.resource_changes.push([w,t,s]),e.kill_list.push(r)}function ie(r,w,e,{resource:t,value:s=-1}={}){e.resource_changes.push([w,t,s]),e.kill_list.push(r)}function oe(r,w,e,{resource:t,limit:s=1}={}){w.resources[t]>=s&&b(r,w,e)}function ae(r,w,e,{resource:t,limit:s=1}={}){r.resources[t]>=s&&b(r,w,e)}function le(r,w,e,{resource:t,limit:s=1}={}){w.resources[t]<=s&&b(r,w,e)}function ne(r,w,e,{resource:t,limit:s=1}={}){r.resources[t]<=s&&b(r,w,e)}function ce(r,w,e,{resource:t,stype:s,limit:i=1}={}){r.resources[t]>=i&&e.addSpriteCreation(s,[r.rect.x,r.rect.y])}function he(r,w,e){e.kill_list.includes(w)||b(r,w,e)}function pe(r,w,e){let t=r.lastrect,s=E(w.orientation);r.physics.activeMovement(r,s,w.strength||1),r.lastrect=t}function me(r,w,e){if(!ge(r,e,"t_lastpull"))return;let t=r.lastrect,s=w.lastdirection,o=Math.abs(s.x)+Math.abs(s.y)>0?E(s):{x:1,y:0};r._updatePosition(o,(w.speed||1)*r.physics.gridsize[0]),r.lastrect=t}function _e(r,w,e){let t=e.sprite_registry.withStype(w.stype||w.key);if(t.length>0){let s=t[Math.floor(e.randomGenerator.random()*t.length)];r.rect=s.rect.copy()}r.lastmove=0}function ue(r,w,e,{exhaustStype:t=null}={}){if(r.lastrect.colliderect(w.rect))return;let s=e.sprite_registry.group(w.key).filter(o=>o!==w);if(s.length===0)return;let i=s[Math.floor(e.randomGenerator.random()*s.length)];r.rect=i.rect.copy(),r.lastrect=i.rect.copy(),r.lastmove=0,t&&(F(w,r,e,{stype:t}),F(i,r,e,{stype:t}))}function fe(r,w,e,{friction:t=0}={}){ge(r,e,"t_lastbounce")&&(r.speed!==null&&(r.speed*=1-t),K(r,w,e),r.orientation!==void 0&&(Math.abs(r.rect.centerx-w.rect.centerx)>Math.abs(r.rect.centery-w.rect.centery)?r.orientation={x:-r.orientation.x,y:r.orientation.y}:r.orientation={x:r.orientation.x,y:-r.orientation.y}))}function de(r,w,e,{friction:t=0}={}){if(K(r,w,e),r.orientation!==void 0){let s=r.orientation,i=E({x:-r.rect.centerx+w.rect.centerx,y:-r.rect.centery+w.rect.centery}),o=i.x*s.x+i.y*s.y;r.orientation={x:-2*o*i.x+s.x,y:-2*o*i.y+s.y},r.speed!==null&&(r.speed*=1-t)}}function ge(r,w,e){return e in r._effect_data&&r._effect_data[e]===w.time?!1:(r._effect_data[e]=w.time,!0)}var U=class{constructor({win:w=!0,scoreChange:e=0}={}){this.win=w,this.score=e}isDone(w){return[!1,null]}},pw=class extends U{constructor(w={}){super(w),this.limit=w.limit||0}isDone(w){return w.time>=this.limit?[!0,this.win]:[!1,null]}},mw=class extends U{constructor(w={}){super(w),this.limit=w.limit!==void 0?w.limit:0,this.stype=w.stype||null}isDone(w){return w.numSprites(this.stype)<=this.limit?[!0,this.win]:[!1,null]}toString(){return`SpriteCounter(stype=${this.stype})`}},_w=class extends U{constructor(w={}){let{win:e=!0,scoreChange:t=0,limit:s=0,...i}=w;super({win:e,scoreChange:t}),this.limit=s,this.stypes=[];for(let[o,a]of Object.entries(i))o.startsWith("stype")&&this.stypes.push(a)}isDone(w){let e=0;for(let t of this.stypes)e+=w.numSprites(t);return e===this.limit?[!0,this.win]:[!1,null]}},uw=class extends U{constructor(w={}){super(w),this.stype=w.stype||null,this.limit=w.limit||0}isDone(w){let e=w.getAvatars();return e.length===0?[!1,null]:[(e[0].resources[this.stype]||0)>=this.limit,this.win]}};var fw=class r{constructor(){this.classes={},this.classArgs={},this.stypes={},this.spriteKeys=[],this.singletons=[],this._spriteById={},this._liveSpritesByKey={},this._deadSpritesByKey={}}reset(){this._liveSpritesByKey={},this._deadSpritesByKey={},this._spriteById={}}registerSingleton(w){this.singletons.push(w)}isSingleton(w){return this.singletons.includes(w)}registerSpriteClass(w,e,t,s){if(w in this.classes)throw new Error(`Sprite key already registered: ${w}`);if(e==null)throw new Error(`Cannot register null class for key: ${w}`);this.classes[w]=e,this.classArgs[w]=t,this.stypes[w]=s,this.spriteKeys.push(w)}getSpriteDef(w){if(!(w in this.classes))throw new Error(`Unknown sprite type '${w}', verify your domain file`);return{cls:this.classes[w],args:this.classArgs[w],stypes:this.stypes[w]}}*getSpriteDefs(){for(let w of this.spriteKeys)yield[w,this.getSpriteDef(w)]}_generateIdNumber(w){let e=(this._liveSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),t=(this._deadSpritesByKey[w]||[]).map(i=>parseInt(i.id.split(".").pop())),s=e.concat(t);return s.length>0?Math.max(...s)+1:1}generateId(w){let e=this._generateIdNumber(w);return`${w}.${e}`}createSprite(w,e){if(this.isSingleton(w)&&(this._liveSpritesByKey[w]||[]).length>0)return null;let{cls:t,args:s,stypes:i}=this.getSpriteDef(w),o=e.id||this.generateId(w),a={...s,...e,key:w,id:o},l=new t(a);return l.stypes=i,this._liveSpritesByKey[w]||(this._liveSpritesByKey[w]=[]),this._liveSpritesByKey[w].push(l),this._spriteById[o]=l,l}killSprite(w){w.alive=!1;let e=w.key,t=this._liveSpritesByKey[e];if(t){let s=t.indexOf(w);s!==-1&&(t.splice(s,1),this._deadSpritesByKey[e]||(this._deadSpritesByKey[e]=[]),this._deadSpritesByKey[e].push(w))}}group(w,e=!1){let t=this._liveSpritesByKey[w]||[];if(!e)return t;let s=this._deadSpritesByKey[w]||[];return t.concat(s)}*groups(w=!1){for(let e of this.spriteKeys)if(w){let t=this._liveSpritesByKey[e]||[],s=this._deadSpritesByKey[e]||[];yield[e,t.concat(s)]}else yield[e,this._liveSpritesByKey[e]||[]]}*sprites(w=!1){if(w)throw new Error("sprites(includeDead=true) not supported");for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let s of t)yield s}}spritesArray(){let w=[];for(let e of this.spriteKeys){let t=this._liveSpritesByKey[e]||[];for(let s of t)w.push(s)}return w}withStype(w,e=!1){if(this.spriteKeys.includes(w))return this.group(w,e);let t=[];for(let s of this.spriteKeys)if(this.stypes[s]&&this.stypes[s].includes(w)){let i=e?(this._liveSpritesByKey[s]||[]).concat(this._deadSpritesByKey[s]||[]):this._liveSpritesByKey[s]||[];t.push(...i)}return t}getAvatar(){for(let[,w]of this.groups(!0))if(w.length>0&&this.isAvatar(w[0]))return w[0];return null}isAvatar(w){return this.isAvatarCls(w.constructor)}isAvatarCls(w){let e=w;for(;e&&e.name;){if(e.name.includes("Avatar"))return!0;e=Object.getPrototypeOf(e)}return!1}deepCopy(){let w=new r;w.classes={...this.classes},w.classArgs={};for(let[e,t]of Object.entries(this.classArgs))w.classArgs[e]={...t};w.stypes={};for(let[e,t]of Object.entries(this.stypes))w.stypes[e]=[...t];return w.spriteKeys=[...this.spriteKeys],w.singletons=[...this.singletons],w}};var Fw=class{constructor(w=42){this._seed=w,this._state=w}random(){let w=this._state+=1831565813;return w=Math.imul(w^w>>>15,w|1),w^=w+Math.imul(w^w>>>7,w|61),((w^w>>>14)>>>0)/4294967296}choice(w){return w[Math.floor(this.random()*w.length)]}seed(w){this._state=w,this._seed=w}},Uw=class{constructor(w,e,{scoreChange:t=0}={}){this.actor_stype=w,this.actee_stype=e,this.score=t,this.is_stochastic=!1}call(w,e,t){throw new Error("Effect.call not implemented")}get name(){return this.constructor.name}},W=class extends Uw{constructor(w,e,t,s={}){let i=s.scoreChange||0;super(e,t,{scoreChange:i}),this.callFn=w;let{scoreChange:o,...a}=s;this.fnArgs=a,this._name=w.name||"anonymous"}call(w,e,t){return Object.keys(this.fnArgs).length>0?this.callFn(w,e,t,this.fnArgs):this.callFn(w,e,t)}get name(){return this._name}},H=class{constructor(w,e={}){this.domain_registry=w,this.title=e.title||null,this.seed=e.seed!==void 0?e.seed:42,this.block_size=e.block_size||1,this.notable_resources=[],this.sprite_order=[],this.collision_eff=[],this.char_mapping={},this.terminations=[],this.resources_limits={},this.resources_colors={},this.is_stochastic=!1}finishSetup(){this.is_stochastic=this.collision_eff.some(e=>e.is_stochastic),this.setupResources();let w=this.sprite_order.indexOf("avatar");w!==-1&&(this.sprite_order.splice(w,1),this.sprite_order.push("avatar"))}setupResources(){this.notable_resources=[];for(let[w,{cls:e,args:t}]of this.domain_registry.getSpriteDefs())if(e.prototype instanceof A||e===A){let s=w;t.res_type&&(s=t.res_type),t.color&&(this.resources_colors[s]=t.color),t.limit!==void 0&&(this.resources_limits[s]=t.limit),this.notable_resources.push(s)}}buildLevel(w){let e=w.split(`
`).filter(a=>a.length>0),t=e.map(a=>a.length),s=Math.min(...t),i=Math.max(...t);if(s!==i)throw new Error(`Inconsistent line lengths: min=${s}, max=${i}`);let o=new Hw(this,this.domain_registry.deepCopy(),w,t[0],e.length,this.seed);for(let a=0;a<e.length;a++)for(let l=0;l<e[a].length;l++){let c=e[a][l],h=this.char_mapping[c];if(h){let p=[l*this.block_size,a*this.block_size];o.createSprites(h,p)}}return o.initState=o.getGameState(),o}},Hw=class{constructor(w,e,t,s,i,o=0){this.domain=w,this.sprite_registry=e,this.levelstring=t,this.width=s,this.height=i,this.block_size=w.block_size,this.screensize=[this.width*this.block_size,this.height*this.block_size],this.seed=o,this.randomGenerator=new Fw(o),this.kill_list=[],this.create_list=[],this.resource_changes=[],this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.is_stochastic=!1,this.active_keys=[],this.events_triggered=[],this.initState=null,this._gameRect=new G(0,0,this.screensize[0],this.screensize[1])}reset(){this.score=0,this.last_reward=0,this.time=0,this.ended=!1,this.won=!1,this.lose=!1,this.kill_list=[],this.create_list=[],this.resource_changes=[],this.active_keys=[],this.events_triggered=[],this.initState&&this.setGameState(this.initState)}createSprite(w,e,t){let s=this.sprite_registry.createSprite(w,{pos:e,id:t,size:[this.block_size,this.block_size],rng:this.randomGenerator});return s&&(this.is_stochastic=this.domain.is_stochastic||s.is_stochastic||this.is_stochastic),s}createSprites(w,e){return w.map(t=>this.createSprite(t,e)).filter(Boolean)}killSprite(w){this.kill_list.push(w)}addSpriteCreation(w,e,t){return this.create_list.push([w,e,t]),null}addScore(w){this.score+=w,this.last_reward+=w}numSprites(w){return this.sprite_registry.withStype(w).length}getSprites(w){return this.sprite_registry.withStype(w)}getAvatars(){let w=[];for(let[,e]of this.sprite_registry.groups(!0))e.length>0&&this.sprite_registry.isAvatar(e[0])&&w.push(...e);return w}containsRect(w){return this._gameRect.contains(w)}tick(w){if(this.time+=1,this.last_reward=0,this.ended)return;this.active_keys=w.keys;let e=this.sprite_registry.spritesArray();for(let l of e)l.just_pushed=null;for(let l of e)l.update(this);this.events_triggered=[];let[t,s,i]=this._moveEventHandling(),[o,a]=this._eventHandling(t);this.events_triggered=s.concat(o);for(let l of this.kill_list)this.sprite_registry.killSprite(l);for(let[l,c,h]of this.create_list)this.createSprite(l,c,h);for(let[l,c,h]of this.resource_changes){let p=this.domain.resources_limits&&this.domain.resources_limits[c]||1/0;l.resources[c]=Math.max(0,Math.min(l.resources[c]+h,p))}this._checkTerminations(),this.kill_list=[],this.create_list=[],this.resource_changes=[]}_moveEventHandling(){let w=[],e=[],t={},s=this.domain.collision_eff.filter(o=>o.name==="stepBack"||o.name==="stepBackIfHasLess");for(let o of s){let[,a,l]=this._applyEffect(o,t);w.push(...a),e.push(...l)}let i=this.domain.collision_eff.filter(o=>["bounceForward","reverseDirection","turnAround"].includes(o.name));for(let o of i){let[,a,l]=this._applyEffect(o,t);w.push(...a),e.push(...l)}for(let o of s){let[,a,l]=this._applyEffect(o,t);w.push(...a),e.push(...l)}return[t,w,e]}_eventHandling(w){let e=[],t=[],s=this.domain.collision_eff.filter(i=>!["stepBack","stepBackIfHasLess","bounceForward","reverseDirection","turnAround"].includes(i.name));for(let i of s){let[,o,a]=this._applyEffect(i,w);e.push(...o),t.push(...a)}return[e,t]}_applyEffect(w,e){let t=[],s=[],i=w.actor_stype,o=w.actee_stype;if(i in e||(e[i]=this.sprite_registry.withStype(i)),o!=="EOS"&&!(o in e)&&(e[o]=this.sprite_registry.withStype(o)),o==="EOS"){let h=e[i];for(let p=h.length-1;p>=0;p--){let m=h[p];this.containsRect(m.rect)||(this.addScore(w.score),w.call(m,null,this),t.push([w.name,m.id,"EOS"]),s.push([w.name,m.key,"EOS",[m.rect.x,m.rect.y],[null,null]]),!this.containsRect(m.rect)&&m.alive&&this.killSprite(m))}return[e,t,s]}let a=e[i],l=e[o];if(a.length===0||l.length===0)return[e,t,s];let c=!1;a.length>l.length&&([a,l]=[l,a],c=!0);for(let h of a)for(let p of l)h!==p&&h.rect.colliderect(p.rect)&&(c?this.kill_list.includes(p)||(this.addScore(w.score),w.call(p,h,this),t.push([w.name,p.id,h.id]),s.push([w.name,p.key,h.key,[p.rect.x,p.rect.y],[h.rect.x,h.rect.y]])):this.kill_list.includes(h)||(this.addScore(w.score),w.call(h,p,this),t.push([w.name,h.id,p.id]),s.push([w.name,h.key,p.key,[h.rect.x,h.rect.y],[p.rect.x,p.rect.y]])));return[e,t,s]}_checkTerminations(){this.lose=!1;for(let w of this.domain.terminations){let[e,t]=w.isDone(this);if(this.ended=e,this.won=t===null?!1:t,w.constructor.name==="Timeout"||["SpriteCounter","MultiSpriteCounter"].includes(w.constructor.name)&&this.ended&&!this.won&&(this.lose=!0),this.ended){this.addScore(w.score);break}}}getGameState(){let w={};for(let e of this.sprite_registry.spriteKeys){let t=this.sprite_registry._liveSpritesByKey[e]||[],s=this.sprite_registry._deadSpritesByKey[e]||[];w[e]=[...t,...s].map(i=>({id:i.id,key:i.key,x:i.rect.x,y:i.rect.y,w:i.rect.w,h:i.rect.h,alive:i.alive,resources:{...i.resources},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation?{...i.orientation}:void 0,_age:i._age,lastmove:i.lastmove}))}return{score:this.score,time:this.time,sprites:w}}setGameState(w){this.sprite_registry.reset(),this.score=w.score,this.time=w.time;for(let[e,t]of Object.entries(w.sprites))for(let s of t){let i=this.sprite_registry.createSprite(e,{id:s.id,pos:[s.x,s.y],size:[s.w,s.h],rng:this.randomGenerator});i&&(i.resources=new Proxy({...s.resources},{get(o,a){return typeof a=="string"&&!(a in o)&&a!=="toJSON"&&a!=="then"&&a!==Symbol.toPrimitive&&a!==Symbol.toStringTag&&a!=="inspect"&&a!=="constructor"&&a!=="__proto__"?0:o[a]},set(o,a,l){return o[a]=l,!0}}),s.speed!==void 0&&(i.speed=s.speed),s.cooldown!==void 0&&(i.cooldown=s.cooldown),s.orientation&&(i.orientation={...s.orientation}),s._age!==void 0&&(i._age=s._age),s.lastmove!==void 0&&(i.lastmove=s.lastmove),i.alive=s.alive,s.alive||this.sprite_registry.killSprite(i))}}};function Se(){n.register("VGDLSprite",v),n.register("Immovable",ww),n.register("Passive",ew),n.register("Resource",A),n.register("ResourcePack",tw),n.register("Flicker",q),n.register("OrientedFlicker",N),n.register("OrientedSprite",k),n.register("Missile",Y),n.register("SpawnPoint",L),n.register("SpriteProducer",T),n.register("Portal",rw),n.register("RandomNPC",V),n.register("Chaser",D),n.register("Fleeing",sw),n.register("Bomber",iw),n.register("Walker",ow),n.register("Conveyor",aw),n.register("Spreader",lw),n.register("Immutable",J),n.register("MovingAvatar",Q),n.register("OrientedAvatar",R),n.register("ShootAvatar",nw),n.register("HorizontalAvatar",C),n.register("FlakAvatar",cw),n.register("killSprite",b),n.register("killBoth",Ww),n.register("cloneSprite",zw),n.register("transformTo",F),n.register("stepBack",K),n.register("stepBackIfHasLess",jw),n.register("undoAll",$w),n.register("bounceForward",Xw),n.register("catapultForward",Zw),n.register("reverseDirection",Lw),n.register("turnAround",Jw),n.register("flipDirection",we),n.register("wrapAround",ee),n.register("collectResource",te),n.register("changeResource",re),n.register("addResource",se),n.register("removeResource",ie),n.register("killIfOtherHasMore",oe),n.register("killIfHasMore",ae),n.register("killIfOtherHasLess",le),n.register("killIfHasLess",ne),n.register("spawnIfHasMore",ce),n.register("killIfAlive",he),n.register("conveySprite",pe),n.register("pullWithIt",me),n.register("teleportToExit",_e),n.register("teleportToOther",ue),n.register("wallBounce",fe),n.register("bounceDirection",de),n.register("Timeout",pw),n.register("SpriteCounter",mw),n.register("MultiSpriteCounter",_w),n.register("ResourceCounter",uw),n.register("GridPhysics",I),n.register("BasicGame",H);for(let[r,w]of Object.entries(Z))n.register(r,w);n.register("UP",Gw),n.register("DOWN",Ow),n.register("LEFT",P),n.register("RIGHT",y)}var dw=class{constructor(w,e,t=null){this.children=[],this.content=w,this.indent=e,this.parent=null,t&&t.insert(this)}insert(w){if(this.indent<w.indent){if(this.children.length>0&&this.children[0].indent!==w.indent)throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${w.indent}`);this.children.push(w),w.parent=this}else{if(!this.parent)throw new Error("Root node too indented?");this.parent.insert(w)}}getRoot(){return this.parent?this.parent.getRoot():this}toString(){return this.children.length===0?this.content:this.content+"["+this.children.map(w=>w.toString()).join(", ")+"]"}};function je(r,w=8){r=r.replace(/\t/g," ".repeat(w));let e=r.split(`
`),t=new dw("",-1);for(let s of e){s.includes("#")&&(s=s.split("#")[0]);let i=s.trim();if(i.length>0){let o=s.length-s.trimStart().length;t=new dw(i,o,t)}}return t.getRoot()}var gw=class{constructor(){this.verbose=!1}parseGame(w,e={}){let t=w;typeof t=="string"&&(t=je(t).children[0]);let[s,i]=this._parseArgs(t.content);Object.assign(i,e),this.spriteRegistry=new fw,this.game=new H(this.spriteRegistry,i);for(let o of t.children)o.content.startsWith("SpriteSet")&&this.parseSprites(o.children),o.content==="InteractionSet"&&this.parseInteractions(o.children),o.content==="LevelMapping"&&this.parseMappings(o.children),o.content==="TerminationSet"&&this.parseTerminations(o.children);return this.game.finishSetup(),this.game}_eval(w){if(n.has(w))return n.request(w);let e=Number(w);return isNaN(e)?w==="True"||w==="true"?!0:w==="False"||w==="false"?!1:w:e}_parseArgs(w,e=null,t=null){t||(t={});let s=w.split(/\s+/).filter(i=>i.length>0);if(s.length===0)return[e,t];s[0].includes("=")||(e=this._eval(s[0]),s.shift());for(let i of s){let o=i.indexOf("=");if(o===-1)continue;let a=i.substring(0,o),l=i.substring(o+1);t[a]=this._eval(l)}return[e,t]}parseSprites(w,e=null,t={},s=[]){for(let i of w){if(!i.content.includes(">"))throw new Error(`Expected '>' in sprite definition: ${i.content}`);let[o,a]=i.content.split(">").map(p=>p.trim()),[l,c]=this._parseArgs(a,e,{...t}),h=[...s,o];if("singleton"in c&&(c.singleton===!0&&this.spriteRegistry.registerSingleton(o),delete c.singleton),i.children.length===0){this.verbose&&console.log("Defining:",o,l,c,h),this.spriteRegistry.registerSpriteClass(o,l,c,h);let p=this.game.sprite_order.indexOf(o);p!==-1&&this.game.sprite_order.splice(p,1),this.game.sprite_order.push(o)}else this.parseSprites(i.children,l,c,h)}}parseInteractions(w){for(let e of w){if(!e.content.includes(">"))continue;let[t,s]=e.content.split(">").map(l=>l.trim()),[i,o]=this._parseArgs(s),a=t.split(/\s+/).filter(l=>l.length>0);for(let l=1;l<a.length;l++){let c=a[0],h=a[l],p;if(typeof i=="function"&&!i.prototype)p=new W(i,c,h,o);else if(typeof i=="function")p=new W(i,c,h,o);else throw new Error(`Unknown effect type: ${i}`);this.game.collision_eff.push(p)}}}parseTerminations(w){for(let e of w){let[t,s]=this._parseArgs(e.content);this.game.terminations.push(new t(s))}}parseMappings(w){for(let e of w){let[t,s]=e.content.split(">").map(o=>o.trim());if(t.length!==1)throw new Error(`Only single character mappings allowed, got: '${t}'`);let i=s.split(/\s+/).filter(o=>o.length>0);this.game.char_mapping[t]=i}}};var $e="sprites/colored_shapes",Sw=class{constructor(w,e=30){this.canvas=w,this.ctx=w.getContext("2d"),this.cellSize=e,this._imageCache=new Map,this.onImageLoad=null}_getCachedImage(w){if(this._imageCache.has(w)){let t=this._imageCache.get(w);return t&&t!=="loading"?t:null}this._imageCache.set(w,"loading");let e=new Image;return e.onload=()=>{this._imageCache.set(w,e),this.onImageLoad&&this.onImageLoad()},e.onerror=()=>{this._imageCache.set(w,null)},e.src=`${$e}/${w}.png`,null}resize(w,e){this.canvas.width=w*this.cellSize,this.canvas.height=e*this.cellSize}clear(){this.ctx.fillStyle="rgb(207, 216, 220)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}render(w){this.clear();let e=w.block_size,t=this.cellSize/e;for(let s of w.domain.sprite_order){let i=w.sprite_registry._liveSpritesByKey[s]||[];for(let o of i)this._drawSprite(o,t,e)}this._drawHUD(w)}_drawSprite(w,e,t){let s=w.rect.x*e,i=w.rect.y*e,o=w.rect.w*e,a=w.rect.h*e,l=null,c=null,h=null;if(w.img){let f=this._parseImg(w.img);l=f.color,c=f.shape,w.img.startsWith("colored_shapes/")&&(h=w.img.split("/")[1])}l||(l=w.color),l||(l=[128,128,128]);let p=w.shrinkfactor||0,m=s+o*p/2,_=i+a*p/2,u=o*(1-p),d=a*(1-p),g=h?this._getCachedImage(h):null;g?this.ctx.drawImage(g,m,_,u,d):(this.ctx.fillStyle=`rgb(${l[0]}, ${l[1]}, ${l[2]})`,c?this._drawShape(c,m,_,u,d):this.ctx.fillRect(m,_,u,d)),w.orientation&&w.draw_arrow&&this._drawArrow(m,_,u,d,w.orientation,l),w.is_avatar&&this._drawResources(w,m,_,u,d)}_parseImg(w){let e={LIGHTGRAY:[207,216,220],BLUE:[25,118,210],YELLOW:[255,245,157],BLACK:[55,71,79],ORANGE:[230,81,0],PURPLE:[92,107,192],BROWN:[109,76,65],PINK:[255,138,128],GREEN:[129,199,132],RED:[211,47,47],WHITE:[250,250,250],GOLD:[255,196,0],LIGHTRED:[255,82,82],LIGHTORANGE:[255,112,67],LIGHTBLUE:[144,202,249],LIGHTGREEN:[185,246,202],LIGHTPURPLE:[200,150,220],LIGHTPINK:[255,230,230],DARKGRAY:[68,90,100],DARKBLUE:[1,87,155],GRAY:[69,90,100]};if(w.startsWith("colors/")){let t=w.split("/")[1];return{color:e[t]||null,shape:null}}if(w.startsWith("colored_shapes/")){let t=w.split("/")[1],s=["CIRCLE","TRIANGLE","DIAMOND","STAR","CROSS","HEXAGON","SQUARE","PENTAGON"];for(let i of s)if(t.endsWith("_"+i)){let o=t.slice(0,-(i.length+1));return{color:e[o]||null,shape:i}}return{color:null,shape:null}}return{color:null,shape:null}}_drawShape(w,e,t,s,i){let o=this.ctx,a=e+s/2,l=t+i/2,c=s/2,h=i/2,p=2/24,m=c*(1-2*p),_=h*(1-2*p);switch(o.beginPath(),w){case"CIRCLE":o.ellipse(a,l,m,_,0,0,Math.PI*2);break;case"TRIANGLE":{let u=l-_,d=l+_,g=a-m,f=a+m;o.moveTo(a,u),o.lineTo(f,d),o.lineTo(g,d),o.closePath();break}case"DIAMOND":o.moveTo(a,l-_),o.lineTo(a+m,l),o.lineTo(a,l+_),o.lineTo(a-m,l),o.closePath();break;case"STAR":{let u=Math.min(m,_),d=u*.4;for(let g=0;g<5;g++){let f=-Math.PI/2+g*(2*Math.PI/5),x=f+Math.PI/5;g===0?o.moveTo(a+u*Math.cos(f),l+u*Math.sin(f)):o.lineTo(a+u*Math.cos(f),l+u*Math.sin(f)),o.lineTo(a+d*Math.cos(x),l+d*Math.sin(x))}o.closePath();break}case"CROSS":{let u=m*2/3,d=u/2;o.rect(a-m,l-d,m*2,u),o.rect(a-d,l-_,u,_*2);break}case"HEXAGON":{let u=Math.min(m,_);for(let d=0;d<6;d++){let g=Math.PI/6+d*(Math.PI/3),f=a+u*Math.cos(g),x=l+u*Math.sin(g);d===0?o.moveTo(f,x):o.lineTo(f,x)}o.closePath();break}case"SQUARE":{let u=Math.min(m,_)*.05;o.rect(a-m+u,l-_+u,(m-u)*2,(_-u)*2);break}case"PENTAGON":{let u=Math.min(m,_);for(let d=0;d<5;d++){let g=-Math.PI/2+d*(2*Math.PI/5),f=a+u*Math.cos(g),x=l+u*Math.sin(g);d===0?o.moveTo(f,x):o.lineTo(f,x)}o.closePath();break}default:o.rect(e,t,s,i)}o.fill()}_drawArrow(w,e,t,s,i,o){let a=w+t/2,l=e+s/2,c=Math.min(t,s)*.3,h=[o[0],255-o[1],o[2]];this.ctx.strokeStyle=`rgb(${h[0]}, ${h[1]}, ${h[2]})`,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(a,l),this.ctx.lineTo(a+i.x*c,l+i.y*c),this.ctx.stroke()}_drawResources(w,e,t,s,i){let o=w.resources,a=0,l=3;for(let c of Object.keys(o)){if(c==="toJSON")continue;let h=o[c];if(h>0){let p=t+i+a*(l+1);this.ctx.fillStyle="#FFD400",this.ctx.fillRect(e,p,s*Math.min(h/5,1),l),a++}}}_drawHUD(w){this.ctx.fillStyle="white",this.ctx.font="14px monospace",this.ctx.textAlign="left";let e=this.canvas.height-5;this.ctx.fillText(`Score: ${w.score}  Time: ${w.time}`,5,e),w.ended&&(this.ctx.fillStyle=w.won?"#0f0":"#f00",this.ctx.font="bold 24px monospace",this.ctx.textAlign="center",this.ctx.fillText(w.won?"WIN":"LOSE",this.canvas.width/2,this.canvas.height/2))}};var ve={aliens:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        base    > Immovable img=colors/WHITE
        avatar  > FlakAvatar stype=sam img=colors/DARKBLUE
        sam > Missile orientation=UP img=colors/BLUE singleton=True
        bomb > Missile orientation=DOWN img=colors/RED speed=0.2
        alien > Bomber stype=bomb orientation=RIGHT prob=0.03  cooldown=3 speed=0.6 img=colors/PINK
        portalSlow  > SpawnPoint   stype=alien  cooldown=16   total=20 img=colors/ORANGE
        portalFast  > SpawnPoint   stype=alien  cooldown=12   total=20 img=colors/BROWN

    LevelMapping
        . > floor
        w > floor wall
        0 > floor base
        1 > floor portalSlow
        2 > floor portalFast
        A > floor avatar

    TerminationSet
        SpriteCounter      stype=avatar               limit=0 win=False
        MultiSpriteCounter stype1=portalSlow stype2=alien stype3=portalFast limit=0 win=True

    InteractionSet
        avatar  wall  > stepBack
        alien   wall  > turnAround
        sam wall  > killSprite
        bomb wall  > killSprite

        base bomb > killSprite
        bomb base > killSprite
        sam base > killSprite
        base sam > killSprite

        base   alien > killSprite
        avatar alien > killSprite scoreChange=-1
        avatar bomb  > killSprite scoreChange=-1
        alien  sam   > killSprite scoreChange=1
        
        alien EOS > killSprite
        avatar EOS > killSprite
        base EOS > killSprite
        bomb EOS > killSprite
        portalFast EOS > killSprite
        portalSlow EOS > killSprite
        sam EOS > killSprite
        wall EOS > killSprite`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w1.............................w
w000...........................w
w000...........................w
w..............................w
w..............................w
w..............................w
w..............................w
w....000......000000.....000...w
w...00000....00000000...00000..w
w...0...0....00....00...00000..w
w................A.............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w2.............................w
w000...........................w
w000...........................w
w..............................w
w..............................w
w..............................w
w..............................w
w....000......000000.....000...w
w...00000....00000000...00000..w
w...0...0....00....00...00000..w
w................A.............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w1.............................w
w000...........................w
w000...........................w
w..............................w
w.......0000........0000.......w
w.......0..0........0..0.......w
w..............................w
w..............................w
w..00000....00000000....00000..w
w..0...0....00....00....00000..w
w...............A..............w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w2.............................w
w000...........................w
w000...........................w
w..............................w
w..............................w
w..............................w
w000000000000000000000000000000w
w..............................w
w000000000000000000000000000000w
w..............................w
w.............................Aw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},avoidGeorge:{description:`BasicGame
    SpriteSet
	floor > Immovable img=colors/LIGHTGRAY
        annoyed > RandomNPC speed=0.2 img=colors/PURPLE
        cigarette > Flicker img=colors/BROWN limit=5 singleton=True
        quiet > RandomNPC speed=0.2 cons=1 img=colors/GREEN
        avatar > ShootAvatar stype=cigarette img=colors/DARKBLUE speed=1
        george > Chaser img=colors/LIGHTBLUE stype=quiet speed=0.15 fleeing=False
        kennel > Immovable img=colors/BLUE
        puppy > Chaser stype=annoyed cooldown=5 img=colors/ORANGE fleeing=False
        wall > Immovable img=colors/DARKGRAY

    LevelMapping
        . > floor
        A > floor   avatar
        c > floor   quiet
        g > floor   george
        k > floor  kennel
        p > floor  puppy
        w > floor  wall
        a > floor annoyed

    InteractionSet
        annoyed cigarette > transformTo stype=quiet scoreChange=1
        annoyed puppy > transformTo stype=quiet scoreChange=1
        annoyed wall > stepBack
        avatar george > killSprite scoreChange=-1
        avatar wall > stepBack
        kennel cigarette > transformTo stype=puppy
        quiet george > transformTo stype=annoyed
        quiet wall > stepBack
        puppy wall > stepBack

        annoyed EOS > killSprite
        avatar EOS > killSprite
        cigarette EOS > killSprite
        george EOS > killSprite
        kennel EOS > killSprite
        puppy EOS > killSprite
        quiet EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=avatar  win=False
        SpriteCounter stype=quiet   win=False
        Timeout limit=500 win=True`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwww
w......................w
w......................w
w....A...cg....c.......w
w...............c.c....w
w......................w
w.................c....w
w......................w
w......................w
w......................w
wwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwww
w......................w
w..c...w..w..c.....c...w
w.......c........w.....w
w...w..................w
w........A.......c.....w
w..........c...........w
w....w...wwwwwww.......w
w....c.............g...w
w......................w
wwwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwww
w......................w
w..c...w.....c.....w.A.w
w.....k.c......w.......w
w..w...............w...w
w.c..............c.....w
w..........w...w...w...w
w....w.................w
w....g...w.......c.....w
w...........w..........w
wwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwww
w......w.....k.........w
w..c........c....w..A..w
w......................w
w.gw...........w.......w
w.c....w.........c.....w
w.........cw...........w
w....w.................w
w.g..c...g...w...c...k.w
w.c.................c..w
wwwwwwwwwwwwwwwwwwwwwwww`}},avoidGeorge_vgfmri4:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}},beesAndBirds:{description:`BasicGame

  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY
    avatar > MovingAvatar img=colors/DARKBLUE
    bee > RandomNPC img=colors/YELLOW cooldown=4
    distractor > Immovable img=colors/RED
    fence > Immovable img=colors/PURPLE
    goal > Immovable img=colors/GREEN
    obstacle > Immovable img=colors/ORANGE
    sparrow1 > Chaser stype=obstacle img=colors/LIGHTGREEN cooldown=4
    wall > Immovable img=colors/DARKGRAY
    
  LevelMapping
    . > floor
    1 > floor  sparrow1
    b > floor  bee
    d > floor  distractor
    f > floor  fence
    g > floor  goal
    o > floor  obstacle
    A > floor avatar
    w > floor wall
    
  InteractionSet
    avatar bee > killSprite
    avatar obstacle > killSprite
    avatar wall > stepBack
    bee distractor > stepBack
    bee fence > stepBack
    bee obstacle > stepBack
    bee sparrow1 > killSprite
    bee wall > stepBack
    distractor avatar > killSprite
    fence avatar > killSprite
    goal avatar > killSprite scoreChange=1
    obstacle sparrow1 > killSprite
    sparrow1 fence > stepBack
    sparrow1 wall > stepBack
    bee EOS > stepBack
    sparrow1 EOS > stepBack
    avatar EOS > stepBack

    avatar EOS > killSprite
    bee EOS > killSprite
    distractor EOS > killSprite
    fence EOS > killSprite
    goal EOS > killSprite
    obstacle EOS > killSprite
    sparrow1 EOS > killSprite
    wall EOS > killSprite
  TerminationSet
    Timeout limit=3000 win=False
    SpriteCounter stype=goal   limit=0 win=True
    SpriteCounter stype=avatar limit=0 win=False`,levels:{0:`wwwwwwwwwwwwwwww
w.....A........w
w..............w
w..........b...w
w...b..........w
w..............w
w...b..........w
w..............w
wwwwwwwwww...www
w..............w
w..............w
w..b...........w
w.........d....w
w.........g....w
wwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwww
w.....A...fo1.ow
w.........fo..ow
w.........fffffw
w..............w
w....b.........w
w.b............w
w..............w
wwwwwwwwwwooowww
w..d...........w
w..............w
wb.....b.......w
w..............w
w.........g....w
wwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
w.......f...1..w
w.......f......w
w.......f......w
w.......wwwwfffw
w....wwwwwww...w
w........A.w...w
wfffwwwwwwwwooow
wd..b.b.bf.....w
wb..b..bbf....gw
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwww
w..f..A........w
w.1f........fffw
wfff........f1.w
w...........fffw
w..oooooooooooow
w..obb..b.b..b.w
w..o.b..b.b.b..w
w..ob.b..b.b.b.w
w..o.b.d...b.b.w
w..oooooooooooow
w.........g....w
wwwwwwwwwwwwwwww`}},chase_vgfmri3:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}},jaws:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        whalehole  > SpawnPoint img=colors/PURPLE stype=whale prob=0.1 cooldown=10
        piranhahole  >  SpawnPoint img=colors/GREEN stype=piranha prob=0.15 cooldown=10

        avatar  > MovingAvatar img=colors/DARKBLUE
        shark  > Chaser speed=0.1 cooldown=2 img=colors/ORANGE  stype=avatar
        whale  > Missile  orientation=RIGHT  speed=0.1 img=colors/BROWN 
        piranha > Missile orientation=LEFT speed=0.1 img=colors/PINK

    LevelMapping
        . > floor
        w > wall
        1 > floor piranhahole
        2 > floor whalehole
        3 > floor shark
        A > floor avatar

    TerminationSet
        SpriteCounter stype=avatar limit=0 win=False
        Timeout limit=500 win=True

    InteractionSet

        avatar shark  > killSprite
        avatar whale  > killSprite
        avatar piranha > killSprite

        avatar wall > stepBack
        shark wall > stepBack
        whale wall > killSprite
        piranha wall > killSprite
        
        avatar EOS > killSprite
        piranha EOS > killSprite
        piranhahole EOS > killSprite
        shark EOS > killSprite
        wall EOS > killSprite
        whale EOS > killSprite
        whalehole EOS > killSprite`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w.....................w
w2....................w
w2....................w
w2............A.......w
w2....................w
w2....................w
w2....................w
w..................3..w
wwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w..........A..........w
w....................1w
w2....................w
w....................1w
w2....................w
w....................1w
w2....................w
w..........3..........w
wwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w.....................w
w..........A..........w
w.....................w
w....................1w
w2....................w
w....................1w
w2....................w
w..........3..........w
wwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w.....................w
w2...................1w
w2...................1w
w2...................1w
w2...................1w
w........A...........1w
w2....................w
w.............3.......w
wwwwwwwwwwwwwwwwwwwwwww`}},lemmings_vgfmri3:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}},missile_command:{description:`BasicGame
  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY
    city  > RandomNPC img=colors/GREEN speed=0.2
    explosion > Flicker limit=5 img=colors/PINK
    avatar  > ShootAvatar stype=explosion img=colors/DARKBLUE
    incoming_slow  > Chaser stype=city img=colors/RED speed=0.1
    incoming_fast  > Chaser stype=city img=colors/GOLD speed=0.3
    wall > Immovable img=colors/DARKGRAY

  LevelMapping
    . > floor
    c > floor city
    m > floor incoming_slow
    f > floor incoming_fast
    w > floor wall
    A > floor avatar

  InteractionSet
    incoming_slow wall  > stepBack
    incoming_fast wall  > stepBack
    avatar wall  > stepBack
    incoming_slow city > killSprite scoreChange=-1
    city incoming_slow > killSprite
    incoming_fast city > killSprite scoreChange=-1
    city incoming_fast > killSprite
    incoming_slow explosion > killSprite scoreChange=1
    incoming_fast explosion > killSprite scoreChange=1
    city wall > stepBack
    
    avatar EOS > killSprite
    city EOS > killSprite
    explosion EOS > killSprite
    incoming_fast EOS > killSprite
    incoming_slow EOS > killSprite
    wall EOS > killSprite

  TerminationSet
    SpriteCounter stype=city   win=False
    MultiSpriteCounter stype1=incoming_slow stype2=incoming_fast win=True
    Timeout limit=2000 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwwww
w...m...m...m...m...m...w
w.......................w
w.......................w
w.......................w
w........m..............w
w.......................w
w...........A...........w
w.......................w
w..............m........w
w.......................w
w...c....c......c...c...w
wwwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwww
w....f..f......f..f....w
w......................w
w...........f..........w
w......................w
w......................w
w......................w
w...........A..........w
w......................w
w......................w
w......................w
w...c.c....c....c.c....w
wwwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwww
w....m.....m........f..w
w......................w
w......................w
w......f...............w
w......................w
w......................w
w...........A..........w
w......................w
w......................w
w......................w
w...c.......c......c...w
wwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwww
w.f........m....m.....fw
w......................w
wwwwww..m..............w
w......................w
w...................wwww
w......................w
w...........A..........w
w..www.........www.....w
w..w............w......w
w..w............w......w
w..w..c.....c...w..c...w
wwwwwwwwwwwwwwwwwwwwwwww`}},plaqueAttack:{description:`BasicGame
  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY

    fullMolarInf > Immovable img=colors/YELLOW
    fullMolarSup > Immovable img=colors/RED
    deadMolarInf > Immovable img=colors/GREEN
    deadMolarSup > Immovable img=colors/BLUE

    avatar  > ShootAvatar stype=fluor img=colors/DARKBLUE frameRate=8 speed=1
    hotdoghole > SpawnPoint stype=hotdog  prob=0.15 cooldown=10 total=5 img=colors/PURPLE
    burgerhole > SpawnPoint stype=burger  prob=0.18 cooldown=10 total=5 img=colors/LIGHTBLUE
    burger > Chaser speed=1 cooldown=10 stype=fullMolarSup img=colors/BROWN fleeing=False
    hotdog > Chaser speed=1 cooldown=10 stype=fullMolarInf img=colors/ORANGE fleeing=False

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
    Timeout limit=3000 win=False
    MultiSpriteCounter stype1=fullMolarInf stype2=fullMolarSup limit=0 win=False
    MultiSpriteCounter stype1=hotdoghole stype2=hotdog stype3=burger stype4=burgerhole limit=0 win=True`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwdwwwwwwwwwww
wwwwwwwwwwww.wwwwwwwwwww
wwwwwwwwwwww.wwwwwwwwwww
wd...wwwwwww.wwwwwww..dw
wwww.wwwwwww.wwwwwww.www
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w...........A..........w
w......................w
w...m...m...m...m...m..w
wwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwww
w...n...n...n...n...n..w
w......................w
w......................w
w......................w
w...........A..........w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
www..wwwwwww.wwwwwww..ww
wv...wwwwwww.wwwwwww..vw
wwwwwwwwwwww.wwwwwwwwwww
wwwwwwwwwwwwvwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwdwwwwwwwwwww
wwwwwwwwwwww.wwwwwwwwwww
wwwwwwwwwwww.wwwwwwwwwww
wd...wwwwwww.wwwwwww..dw
wwww.wwwwwww.wwwwwww.www
w.........n...n........w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w......................w
w...........A..........w
w...m...m...m...m...m..w
wwwwwwwww..www..wwwwwwww
wwwwwwwww..www..wwwwwwww
wwwwwwwww..www..wwwwwwww
wv.........www........vw
wwwwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwdwwwwwwwwwwww
wwwwwwwwwww.wwwwwwwwwwww
wwwwwwwwwww.wwwwwwwwwwww
wd..wwwwwww.wwwwwww...dw
ww..wwwwwww.wwwwwww.wwww
w....n..n.......n...n..w
w......................w
w......................w
w......................w
w...........A..........w
w......................w
w......................w
w......................w
w......................w
w..m...m...m...m...m...w
wwww..ww.wwwwwwwwwww..ww
wv....ww.wwwwwwwwwww..vw
wwwwwwww.wwwwwwwwwwwwwww
wwwwwwwwvwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwww`}},plaqueAttack_vgfmri3:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},portals:{description:`BasicGame
    SpriteSet
    	floor > Immovable img=colors/LIGHTGRAY
    	sitting  > Immovable img=colors/DARKGREEN
        vertical   > Missile orientation=UP speed=0.15 img=colors/PINK
        horizontal > Missile orientation=LEFT speed=0.2 img=colors/LIGHTRED
    	goal  > Immovable img=colors/LIGHTGREEN
	random   > RandomNPC speed=0.1 cons=1 img=colors/BROWN
	entry1 > Portal stype=exit1 img=colors/LIGHTBLUE
	entry2 > Portal stype=exit2 img=colors/BLUE

        exit1  > Immovable img=colors/GOLD
        exit2  > Immovable img=colors/LIGHTORANGE
        wall > Immovable img=colors/DARKGRAY autotiling=True
        avatar > MovingAvatar img=colors/DARKBLUE speed=1
        
    LevelMapping
        . > floor
        2 > floor  entry2
        3 > floor  exit2
        g > floor  goal
        h > floor  horizontal
        i > floor  entry1
        o > floor  exit1
        r > floor  random
        v > floor  vertical
        w > floor  wall
        x > floor  sitting
	A > floor avatar
    InteractionSet
        random entry1 > stepBack
        random entry2 > stepBack
        random exit1 > stepBack
        random exit2 > stepBack
        random goal > stepBack
        random wall > stepBack

        horizontal goal > stepBack
        vertical goal > stepBack

        sitting  goal > stepBack
        sitting entry1 > stepBack
        sitting entry2 > stepBack
        sitting exit1 > stepBack
        sitting exit2 > stepBack
        sitting wall > stepBack
        avatar entry1 > teleportToExit
        avatar entry2 > teleportToExit
        avatar wall      > stepBack
        goal   avatar    > killSprite scoreChange=1
        avatar sitting    > killSprite
        avatar vertical    > killSprite
        avatar horizontal    > killSprite
        vertical wall    > reverseDirection
        horizontal wall    > reverseDirection

        avatar EOS > killSprite
        entry1 EOS > killSprite
        entry2 EOS > killSprite
        exit1 EOS > killSprite
        exit2 EOS > killSprite
        goal EOS > killSprite
        horizontal EOS > killSprite
        random EOS > killSprite
        sitting EOS > killSprite
        vertical EOS > killSprite
        wall EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal   limit=0 win=True
        SpriteCounter stype=avatar limit=0 win=False
        Timeout limit=3000 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwww
wA..w...v.h..w...xw
wo.iw........w....w
wwwww......o.w.w..w
wo.....w.......w.ow
w.h....wwwwww....ww
w............h....w
wwwww.....www.....w
w.........i.......w
wg.3....v....x..www
wwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwww
w..h....r...w2....w
w..o....wwww..w.w.w
wwwww..v.........vw
w..ow.....w.......w
wA.iw.....w..h.v..w
wwwww....h.....r..w
w...........o.....w
w..i.w.ww...wwwwwww
w...h.v.....w3...gw
wwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwww
wr......w........Aw
w..i.v..wi..h.....w
w.......w.......o.w
w....wwwwwwwwwwwwww
w..h..........2...w
wwwwww..w...w.....w
w.3..w..w...w.ww..w
wh...wv.ov..v...v.w
wg...w..w.....r...w
wwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwww
w.2i..............w
w.i..x............w
w....v......v.....w
w......v.A........w
w.h...............w
w........h........w
w..r..wwww........w
w.....wg3w.......ow
wwwwwwwwwwwwwwwwwww`}},preconditions:{description:`BasicGame
  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY
    avatar > MovingAvatar img=colors/DARKBLUE speed=1
    box > Immovable img=colors/RED
    goal > Immovable img=colors/GOLD
    medicine > ResourcePack limit=4 img=colors/WHITE
    poison > Immovable img=colors/GREEN
    wall > Immovable img=colors/DARKGRAY

  LevelMapping
    . > floor
    b > floor  box
    g > floor  goal
    m > floor  medicine
    p > floor  poison
    w > floor  wall
    A > floor avatar
    
  InteractionSet
    medicine avatar > addResource resource=medicine
    avatar poison > killIfHasLess resource=medicine limit=0
    poison avatar > removeResource resource=medicine
    avatar wall > stepBack
    box avatar > killSprite
    goal avatar > killSprite scoreChange=1
    
    avatar EOS > killSprite
    box EOS > killSprite
    goal EOS > killSprite
    medicine EOS > killSprite
    poison EOS > killSprite
    wall EOS > killSprite

  TerminationSet
    SpriteCounter stype=avatar  limit=0 win=False
    SpriteCounter stype=goal limit=0 win=True
    Timeout limit=3000 win=False`,levels:{0:`wwwwwwwwwwwwwwwwww
w.g.p...w....m...w
w...p...w........w
w...p...w.A..wwwww
w...p............w
w.b.p.........p..w
wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww
w...p...w........w
w.m.....w.A..wwwww
wwwww........wwwww
wmpp........pp..gw
wmp.........pp...w
wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwww
w...p...w....p..bw
w.m.....w.A..wwwww
wpppp......p.....w
w.....p.p.......ww
ww............pppw
wpppp.......pppppw
wmpp........pp..gw
wmp......p..pp...w
wwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwww
w...p...w........w
w.......w.A..wwwww
wpppp......p..pmmw
w.....p.p.....p.ww
wwpp.........ppppw
wpppp......ppppppw
w.m.pp.....ppppppw
wbmmppm..p.ppp.g.w
wwwwwwwwwwwwwwwwww`}},pushBoulders:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        avatar > MovingAvatar img=colors/DARKBLUE
        box1 > Passive img=colors/GREEN
        box2 > Immovable img=colors/LIGHTBLUE
        goal > Immovable img=colors/GOLD
        poison1 > Immovable img=colors/ORANGE
        poison2 > Passive img=colors/PINK
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        1 > floor  box1
        2 > floor  box2
        g > floor  goal
        p > floor  poison1
        q > floor  poison2
        w > floor  wall
        A > floor avatar
    InteractionSet
        avatar poison1 > killSprite
        avatar poison2 > killSprite
        avatar wall > stepBack
        box1 avatar > bounceForward
        box1 box1 > stepBack
        box1 wall    > stepBack
        box2 avatar  > killSprite
        box2 box1 > killSprite
        box2 goal > stepBack
        box2 wall    > stepBack
        goal avatar > killSprite scoreChange=1
        goal box1 > killSprite scoreChange=1
        goal poison1 > stepBack
        goal poison2 > stepBack
        goal wall > stepBack
        poison1 wall > stepBack
        poison2 wall > stepBack
        poison1 box1 > killSprite
        poison1 box2 > stepBack
        poison2 box1 > bounceForward
        poison2 box1 > stepBack
        poison2 box2 > stepBack
        poison2 poison2 > stepBack

        avatar EOS > killSprite
        box1 EOS > killSprite
        box2 EOS > killSprite
        goal EOS > killSprite
        poison1 EOS > killSprite
        poison2 EOS > killSprite
        wall EOS > killSprite
    TerminationSet
        Timeout limit=3000 win=False
        SpriteCounter stype=goal    limit=0 win=True
        SpriteCounter stype=avatar  limit=0 win=False
        
        `,levels:{0:`wwwwwwwwwwwwwwwwwwwwww
w..1....p............w
w....2....p..........w
wA..q.....2...w.....ww
w....w1.......w.w....w
ww..........q........w
w...p....q......1....w
w....2........g......w
w.........2..........w
wwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwww
wA....w....p.......g.w
ww..1.w......p.......w
w.1...p......2..w...ww
wwwwwww1........w...ww
ww............q......w
w....p....q........1.w
w.....2..............w
w.........2..........w
wwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwww
w......A.1..p....w...w
w..1.wwwwwwww...1....w
w........p....2.p....w
wwwwwwwwwwwwwwwwwww.ww
ww...p......ww...w...w
wwwww...w...1...ww...w
w...w2...ww..w...ww.ww
w..g.....2www..p....ww
wwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwww
w....1...p....w..w.w.w
w..1.w.p......w1..1.ww
w.g..w.....p......11.w
wwwwwwwwwwwwwwwwwww.ww
w...w..p..w......w...w
wwww.q....w.1.w..w...w
w.A..1ww.q....w..ww.ww
w..w..w.w.w...w.....ww
wwwwwwwwwwwwwwwwwwwwww`}},relational:{description:`BasicGame
  SpriteSet
    floor > Immovable img=colors/LIGHTGRAY
    avatar > MovingAvatar img=colors/DARKBLUE
    box > Passive img=colors/ORANGE
    converter1 > Passive img=colors/RED
    converter2 > Immovable img=colors/PURPLE
    converter3 > Immovable img=colors/PINK
    fire > Immovable img=colors/YELLOW
    poison > Immovable img=colors/WHITE
    probe > Passive img=colors/BLUE
    wall > Immovable img=colors/DARKGRAY

  LevelMapping
    . > floor
    a > floor  box
    e > floor  converter1
    f > floor  fire
    p > floor  poison
    w > floor  wall
    x > floor  probe
    y > floor  converter2
    z > floor  converter3
    A > floor avatar
  InteractionSet
    avatar fire > stepBack
    avatar poison > killSprite
    avatar wall > stepBack

    box avatar > bounceForward
    box box > stepBack
    box converter2 > transformTo stype=fire
    box fire > stepBack
    box probe > stepBack
    box wall > stepBack

    converter1 poison > stepBack
    box poison > stepBack
    probe poison > stepBack

    converter1 wall > stepBack
    converter2 wall > stepBack
    converter3 wall > stepBack
    converter1 avatar > transformTo stype=fire
    converter1 box > bounceForward
    converter2 fire > killSprite
    converter3 avatar > transformTo stype=box

    fire probe > killSprite scoreChange=1
    probe fire > killSprite 
    
    probe avatar > bounceForward
    probe box > stepBack
    probe converter1 > stepBack
    probe converter2 > stepBack    
    probe converter3 > stepBack
    probe probe > stepBack
    probe wall > stepBack
    
    avatar EOS > killSprite
    box EOS > killSprite
    converter1 EOS > killSprite
    converter2 EOS > killSprite
    converter3 EOS > killSprite
    fire EOS > killSprite
    probe EOS > killSprite
    wall EOS > killSprite

  TerminationSet
    SpriteCounter stype=avatar  limit=0 win=False
    SpriteCounter stype=probe limit=0 win=True
    Timeout limit=3000 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwwww
wfA.......w.........fw
w....a....x..........w
w..............f.....w
w.w.........w........w
w......f.............w
w..............w..x..w
w...w......a.........w
wf..................fw
wwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwww
wA........w..........w
w....a.w..x...p......w
w................w...w
w....w.....w.........w
w...w..........e.....w
w...x....e.......w...w
w..........a.....p...w
w....................w
wwwwwwwwwwwwwwwwwwwwww`,2:`wwwwwwwwwwwwwwwwwwwwww
w.........w..........w
w.w..a....x....p.....w
w....................w
w..p..w....w.........w
w..............y.....w
w...x....y...........w
w.....w....a....w....w
w..........A.........w
wwwwwwwwwwwwwwwwwwwwww`,3:`wwwwwwwwwwwwwwwwwwwwww
w.........w..........w
w.....p...x..........w
w............y..w....w
w....w.p.............w
w..........y...z.....w
w...x....z...........w
w..............w.....w
w..........A.........w
wwwwwwwwwwwwwwwwwwwwww`}},roomworld:{description:`BasicGame
    SpriteSet
        floor > Immovable img=colors/LIGHTGRAY
        wall > Immovable img=colors/DARKGRAY
        avatar > MovingAvatar img=colored_shapes/PACMAN
        goal > Immovable img=colored_shapes/GIFT_BOX

        key1 > Resource img=colored_shapes/BLUE_FLOWER limit=1
        key2 > Resource img=colored_shapes/PLUM_FLOWER limit=1
        key3 > Resource img=colored_shapes/TEAL_FLOWER limit=1
        key4 > Resource img=colored_shapes/LIGHTPINK_FLOWER limit=1
        key5 > Resource img=colored_shapes/NAVY_FLOWER limit=1
        key6 > Resource img=colored_shapes/RED_FLOWER limit=1

        key1_used > Immovable img=colored_shapes/FADED_BLUE_FLOWER
        key2_used > Immovable img=colored_shapes/FADED_PLUM_FLOWER
        key3_used > Immovable img=colored_shapes/FADED_TEAL_FLOWER
        key4_used > Immovable img=colored_shapes/FADED_LIGHTPINK_FLOWER
        key5_used > Immovable img=colored_shapes/FADED_NAVY_FLOWER
        key6_used > Immovable img=colored_shapes/FADED_RED_FLOWER

        door1 > Immovable img=colored_shapes/BLUE_SPADE
        door1_used > Immovable img=colored_shapes/FADED_BLUE_SPADE
        door2 > Immovable img=colored_shapes/PLUM_SPADE
        door2_used > Immovable img=colored_shapes/FADED_PLUM_SPADE
        door3 > Immovable img=colored_shapes/TEAL_SPADE
        door3_used > Immovable img=colored_shapes/FADED_TEAL_SPADE
        door4 > Immovable img=colored_shapes/LIGHTPINK_SPADE
        door4_used > Immovable img=colored_shapes/FADED_LIGHTPINK_SPADE
        door5 > Immovable img=colored_shapes/NAVY_SPADE
        door5_used > Immovable img=colored_shapes/FADED_NAVY_SPADE
        door6 > Immovable img=colored_shapes/RED_SPADE
        door6_used > Immovable img=colored_shapes/FADED_RED_SPADE

        cat1 > Immovable img=colored_shapes/BLUE_PENTAGON
        cat1_used > Immovable img=colored_shapes/FADED_BLUE_PENTAGON
        cat2 > Immovable img=colored_shapes/PLUM_PENTAGON
        cat2_used > Immovable img=colored_shapes/FADED_PLUM_PENTAGON
        cat3 > Immovable img=colored_shapes/TEAL_PENTAGON
        cat3_used > Immovable img=colored_shapes/FADED_TEAL_PENTAGON
        cat4 > Immovable img=colored_shapes/LIGHTPINK_PENTAGON
        cat4_used > Immovable img=colored_shapes/FADED_LIGHTPINK_PENTAGON
        cat5 > Immovable img=colored_shapes/NAVY_PENTAGON
        cat5_used > Immovable img=colored_shapes/FADED_NAVY_PENTAGON
        cat6 > Immovable img=colored_shapes/RED_PENTAGON
        cat6_used > Immovable img=colored_shapes/FADED_RED_PENTAGON

        t1 > Portal stype=t1 img=colored_shapes/BLUE_APPLE
        t1_used > Immovable img=colored_shapes/FADED_BLUE_APPLE
        t2 > Portal stype=t2 img=colored_shapes/PLUM_APPLE
        t2_used > Immovable img=colored_shapes/FADED_PLUM_APPLE
        t3 > Portal stype=t3 img=colored_shapes/TEAL_APPLE
        t3_used > Immovable img=colored_shapes/FADED_TEAL_APPLE
        t4 > Portal stype=t4 img=colored_shapes/LIGHTPINK_APPLE
        t4_used > Immovable img=colored_shapes/FADED_LIGHTPINK_APPLE
        t5 > Portal stype=t5 img=colored_shapes/NAVY_APPLE
        t5_used > Immovable img=colored_shapes/FADED_NAVY_APPLE
        t6 > Portal stype=t6 img=colored_shapes/RED_APPLE
        t6_used > Immovable img=colored_shapes/FADED_RED_APPLE

        t1_fake > Immovable img=colored_shapes/BLUE_APPLE
        t2_fake > Immovable img=colored_shapes/PLUM_APPLE
        t3_fake > Immovable img=colored_shapes/TEAL_APPLE
        t4_fake > Immovable img=colored_shapes/LIGHTPINK_APPLE
        t5_fake > Immovable img=colored_shapes/NAVY_APPLE
        t6_fake > Immovable img=colored_shapes/RED_APPLE

    LevelMapping
        . > floor
        w > floor wall
        A > floor avatar
        x > floor goal

        1 > floor key1
        2 > floor key2
        3 > floor key3
        4 > floor key4
        5 > floor key5
        6 > floor key6

        Q > floor door1
        R > floor door2
        S > floor door3
        U > floor door4
        V > floor door5
        Y > floor door6

        q > floor cat1
        r > floor cat2
        s > floor cat3
        u > floor cat4
        v > floor cat5
        y > floor cat6

        B > floor t1
        C > floor t2
        E > floor t3
        F > floor t4
        G > floor t5
        H > floor t6

        b > floor t1_fake
        c > floor t2_fake
        e > floor t3_fake
        f > floor t4_fake
        g > floor t5_fake
        h > floor t6_fake

    InteractionSet
        avatar wall > stepBack

        avatar door1 > stepBackIfHasLess resource=key1 limit=1 exhaustStype=door1_used
        avatar door1_used > stepBack
        avatar door2 > stepBackIfHasLess resource=key2 limit=1 exhaustStype=door2_used
        avatar door2_used > stepBack
        avatar door3 > stepBackIfHasLess resource=key3 limit=1 exhaustStype=door3_used
        avatar door3_used > stepBack
        avatar door4 > stepBackIfHasLess resource=key4 limit=1 exhaustStype=door4_used
        avatar door4_used > stepBack
        avatar door5 > stepBackIfHasLess resource=key5 limit=1 exhaustStype=door5_used
        avatar door5_used > stepBack
        avatar door6 > stepBackIfHasLess resource=key6 limit=1 exhaustStype=door6_used
        avatar door6_used > stepBack

        avatar cat1 > catapultForward exhaustStype=cat1_used
        avatar cat2 > catapultForward exhaustStype=cat2_used
        avatar cat3 > catapultForward exhaustStype=cat3_used
        avatar cat4 > catapultForward exhaustStype=cat4_used
        avatar cat5 > catapultForward exhaustStype=cat5_used
        avatar cat6 > catapultForward exhaustStype=cat6_used

        avatar key1 > changeResource resource=key1 value=1
        key1 avatar > transformTo stype=key1_used
        avatar key2 > changeResource resource=key2 value=1
        key2 avatar > transformTo stype=key2_used
        avatar key3 > changeResource resource=key3 value=1
        key3 avatar > transformTo stype=key3_used
        avatar key4 > changeResource resource=key4 value=1
        key4 avatar > transformTo stype=key4_used
        avatar key5 > changeResource resource=key5 value=1
        key5 avatar > transformTo stype=key5_used
        avatar key6 > changeResource resource=key6 value=1
        key6 avatar > transformTo stype=key6_used

        avatar t1 > teleportToOther exhaustStype=t1_used
        avatar t2 > teleportToOther exhaustStype=t2_used
        avatar t3 > teleportToOther exhaustStype=t3_used
        avatar t4 > teleportToOther exhaustStype=t4_used
        avatar t5 > teleportToOther exhaustStype=t5_used
        avatar t6 > teleportToOther exhaustStype=t6_used

        goal avatar > killSprite

        floor EOS > killSprite
        wall EOS > killSprite
        avatar EOS > killSprite
        goal EOS > killSprite
        key1 EOS > killSprite
        key2 EOS > killSprite
        key3 EOS > killSprite
        key4 EOS > killSprite
        key5 EOS > killSprite
        key6 EOS > killSprite
        key1_used EOS > killSprite
        key2_used EOS > killSprite
        key3_used EOS > killSprite
        key4_used EOS > killSprite
        key5_used EOS > killSprite
        key6_used EOS > killSprite
        door1 EOS > killSprite
        door1_used EOS > killSprite
        door2 EOS > killSprite
        door2_used EOS > killSprite
        door3 EOS > killSprite
        door3_used EOS > killSprite
        door4 EOS > killSprite
        door4_used EOS > killSprite
        door5 EOS > killSprite
        door5_used EOS > killSprite
        door6 EOS > killSprite
        door6_used EOS > killSprite
        cat1 EOS > killSprite
        cat1_used EOS > killSprite
        cat2 EOS > killSprite
        cat2_used EOS > killSprite
        cat3 EOS > killSprite
        cat3_used EOS > killSprite
        cat4 EOS > killSprite
        cat4_used EOS > killSprite
        cat5 EOS > killSprite
        cat5_used EOS > killSprite
        cat6 EOS > killSprite
        cat6_used EOS > killSprite
        t1 EOS > killSprite
        t1_used EOS > killSprite
        t2 EOS > killSprite
        t2_used EOS > killSprite
        t3 EOS > killSprite
        t3_used EOS > killSprite
        t4 EOS > killSprite
        t4_used EOS > killSprite
        t5 EOS > killSprite
        t5_used EOS > killSprite
        t6 EOS > killSprite
        t6_used EOS > killSprite
        t1_fake EOS > killSprite
        t2_fake EOS > killSprite
        t3_fake EOS > killSprite
        t4_fake EOS > killSprite
        t5_fake EOS > killSprite
        t6_fake EOS > killSprite

    TerminationSet
        SpriteCounter stype=goal limit=0 win=True
        Timeout limit=500 win=False`,levels:{r1_10_17:`wwwwwwwwwwwww
w...w...w...w
wb..w...w...w
w...w...w...w
wwwwwRwwwwwww
w...w...w...w
w...w...wr..w
w...w..1w...w
wwwwwwwwwwwww
w...w...w...w
w...w..sw..xw
w...w..Aw...w
wwwwwwwwwwwww`,r1_10_2:`wwwwwwwwwwwww
w..Aw..xw...w
w..uw...w.g.w
w...w...w...w
wwwwwwwwwwwww
wv..w...w...w
w...w...w...w
w...w1..w...w
wwwwwwwwwwwSw
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_10_22:`wwwwwwwwwwwww
w...wq..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...Q...w...w
w...w...w..cw
w...w...w...w
wwwwwwwwwwwww
w...w...w..xw
w.3.w...w...w
w...wA.yw...w
wwwwwwwwwwwww`,r1_10_6:`wwwwwwwwwwwww
w...w..yw...w
w...w.A.w...w
w...w...w.x.w
wwwwwwwwwwwww
w...w...w...w
w...w...w3..w
w...w.r.w...w
wwRwwwwwwwwww
w...w...w..gw
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_11_11:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwUwwwwww
w.FAw...w.g.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
wb..w...w.x.w
w...wu..w..Fw
w...w...w...w
wwwwwwwwwwwww`,r1_11_23:`wwwwwwwwwwwww
w...w...wA..w
w...w..bwG..w
w...w...w...w
wwwUwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...wG..w..vw
w.c.w...w...w
w...w.x.w...w
wwwwwwwwwwwww`,r1_11_9:`wwwwwwwwwwwww
w...w...w...w
w...w...Y...w
w...w...w...w
wwwwwwwwwwwww
w..Bwf..w..Bw
w.A.w...w...w
w...w...w.x.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..ywc..w...w
wwwwwwwwwwwww`,r1_12_1:`wwwwwwwwwwwww
w...w...w.A.w
w...w..4w...w
w...w...w..6w
wwwQwwwwwYwww
w...w...w...w
w...w.h.w.x.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...wy..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_12_10:`wwwwwwwwwwwww
w...wA..w.x.w
w..qw.2.R...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w.e.w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w3..w...Q...w
w...w...w...w
wwwwwwwwwwwww`,r1_12_16:`wwwwwwwwwwwww
w...w...w...w
w...w.e.w...w
w...w...w2..w
wwQwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.4.w..xw.s.w
wA..U...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_12_7:`wwwwwwwwwwwww
wf..w..6w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..rw.A.w...w
w...w2..w...w
wwwwwwwRwUwww
w...w...w...w
w...wx..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_13_22:`wwwwwwwwwwwww
w...w.A.w...w
w...w.1.Q..xw
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..3w...w
w...w...w...w
wwwwwwwwwRwww
w...w...w...w
w..qw...U...w
w...w...w...w
wwwwwwwwwwwww`,r1_13_4:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.u.w...w
wSwwwwwwwwwQw
w...w...w...w
w...w2..w...w
w...w...w...w
wwwwwwwwwwwww
w..Aw.x.w...w
w5..V...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_14_11:`wwwwwwwwwwwww
w...Y...w...w
w...U...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wE..w...w...w
w..Aw...w...w
wwwwwwwwwwwww
w...w...w.E.w
w...w...w...w
w..qwh..w.x.w
wwwwwwwwwwwww`,r1_14_24:`wwwwwwwwwwwww
w...w...w...w
w...S...w...w
wg..w...w...w
wwwwwwwwwwwww
w...w...w..Aw
w...w...w..Bw
w...R...w...w
wwwwwwwwwwwww
w..xw...w.q.w
w..Bw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_15_15:`wwwwwwwwwwwww
w..uw...w...w
w...wx..w...w
wA..w...w..rw
wwwwwwwwwwwww
w...w...w...w
w...w.g.w...w
w...w...w...w
wwwwwQwYwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_15_24:`wwwwwwwwwwwww
w...wr..w...w
w...w...w...w
w...w...w.c.w
wwwwwwwwwRwUw
w...w...w...w
w...w...w...w
wu.Aw...w...w
wwwwwwwwwwwww
w...w...w...w
w..xw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_16_7:`wwwwwwwwwwwww
w.x.w...w...w
w.F.w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wh..w...w..3w
w...w...w...w
wwwwwwwwwwwww
w...w..cwA..w
w...w...w..Fw
w..gw...w...w
wwwwwwwwwwwww`,r1_17_9:`wwwwwwwwwwwww
w...w.A.w...w
w...w...Y...w
w2..w..6w.x.w
wwwwwwwwwwwww
w...w...w.v.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w..5w
w...w...w...w
w...w.4.w...w
wwwwwwwwwwwww`,r1_18_13:`wwwwwwwwwwwww
w...w...w...w
w...Q...w...w
w...w...w...w
wwwwwwwwwwwSw
w...w...w...w
w...w...w...w
wAu.w.q.w...w
wwwwwwYwwwwww
w...w...w...w
w...w...w...w
w.x.w...w...w
wwwwwwwwwwwww`,r1_19_15:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wAu.w...w...w
wwwwwwwwwwwww
w...w...w...w
w..xwe..w...w
w...w...w..hw
wwwwwwwwwwwww
w...w...w...w
w...w...Q...w
w...w...S...w
wwwwwwwwwwwww`,r1_1_10:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...wg..w
wwwwwwwwwwwww
w...w...w...w
w...w..6w4..w
w...wA..w...w
wwwRwwYwwwwww
w...w...w...w
w..vw...w...w
w...wx..w...w
wwwwwwwwwwwww`,r1_1_12:`wwwwwwwwwwwww
w...V...w...w
w.A.w.x.w...w
w.5.w...w...w
wwwwwwwwwwwww
w...w...w.u.w
w...w...w...w
w...w...w...w
wwwwwwwwwSwww
w...w...w...w
w...w..gw...w
w...w...w..4w
wwwwwwwwwwwww`,r1_1_14:`wwwwwwwwwwwww
w...wy..w...w
w...w...w.b.w
w5..w...w...w
wwwwwwwwwwwww
w...w...w...w
w...U...w...w
w...w...w...w
wwwwwwwwwwwww
w.A.w...w...w
w...w...w...w
w.2.R..xw...w
wwwwwwwwwwwww`,r1_1_16:`wwwwwwwwwwwww
w...w.A.Y...w
w.f.w6..w...w
w...w...wx..w
wwwwwwwwwwwww
w...w5..w...w
w...w...w...w
w...w...w...w
wSwwwwwwwwwww
wq..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_1_17:`wwwwwwwwwwwww
w...w...Q.x.w
w...w.A1w...w
w...w...w...w
wwwwwwwwwwwww
wv..Y...w...w
w...w...w2..w
w...w...w...w
wwwwwwwwwwwww
w..bw...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_1_21:`wwwwwwwwwwwww
w...w...w...w
w..Aw...w...w
w4..w...w.q.w
wwwUwwwwwwwww
w...w...Y...w
w.x.w...w...w
w...w..2w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.h.w...w
wwwwwwwwwwwww`,r1_1_22:`wwwwwwwwwwwww
w...w...w...w
w...w...S...w
w...w...w..rw
wwwwwwwwwwwww
w...w..Aw.x.w
w...w...w...w
w...w1..Q...w
wwwwwwwwwwwww
w...w...w...w
w.6.w...w...w
w...w..bw...w
wwwwwwwwwwwww`,r1_1_23:`wwwwwwwwwwwww
w...V...wh..w
w...w...w...w
wA.5wx..w...w
wwwwwwwwwwwww
w.r.w...w...w
w...w...w...w
w...w...w...w
wwwwwSwwwwwww
w...w1..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_1_24:`wwwwwwwwwwwww
w.f.w...V...w
w...w.A.w..xw
w...w5..w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wv..w...w...w
wwwwwwwwwYwww
w.4.w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_1_25:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwVwwwwwwwww
w...w..Aw.x.w
w6..w...R...w
w...w..2w...w
wwwwwwwwwwwww
w..bw...w...w
w...w...wy..w
w...w...w...w
wwwwwwwwwwwww`,r1_1_4:`wwwwwwwwwwwww
w...w...w...w
w...w..2w...w
w.c.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.y.w...w
wwwwwwwwwwYww
w...w...w...w
w5..V...w...w
wA..wx..w...w
wwwwwwwwwwwww`,r1_1_5:`wwwwwwwwwwwww
w...w...w...w
w...w...wv..w
w.h.w...w...w
wwwwwwwwwwwww
w...wA..w...w
w...w...w...w
w...w..6w...w
wwSwwwYwwwwww
w...wx..w...w
w2..w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_1_7:`wwwwwwwwwwwww
w...w...w...w
w..4w...w...w
w...S...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.e.w
wwwwwwwwwwwww
w...w...w...w
w..Aw...wr..w
w.5.V..xw...w
wwwwwwwwwwwww`,r1_1_9:`wwwwwwwwwwwww
w...w.3.w...w
w...w..Aw...w
w...w...w.u.w
wwwwwSwwwwwww
w...w..xw2..w
w...w...w...w
w...w...w...w
wwwwwwwwwwUww
w...w...w...w
w...w.b.w...w
w...w...w...w
wwwwwwwwwwwww`,r1_20_5:`wwwwwwwwwwwww
w...wq..w...w
w...w...w...w
w...w...V.g.w
wwwwwwwwwwwww
w1..w..xw...w
w.A.w...w...w
w...Q...w...w
wwwwwwwwwwwww
wu..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_21_9:`wwwwwwwwwwwww
w...w...S...w
w...w...wv..w
w...w...w...w
wwwwwwwwwwwww
wq..w..xw.A.w
w...w...w...w
w...w.G.w..Gw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...ws..w
wwwwwwwwwwwww`,r1_22_22:`wwwwwwwwwwwww
w...w...U...w
w...w...w...w
wh..w...w...w
wwwwwwwwwwwww
w2..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.e.w...w...w
w...w..Aw...w
w...w.F.w.xFw
wwwwwwwwwwwww`,r1_23_19:`wwwwwwwwwwwww
w..uw...w...w
w...w.x.w...w
w.A.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w5..w
w...w.e.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..2w...U...w
wwwwwwwwwwwww`,r1_24_12:`wwwwwwwwwwwww
w...w...w...w
w...w..qw...w
w...w...w.u.w
wwwwwwwwwwwww
w1..w...w...w
w..Aw...w...w
w...w3..wc..w
wwwQwwwwwwwww
w...w...w...w
w...w...w...w
wx..w...w...w
wwwwwwwwwwwww`,r1_2_1:`wwwwwwwwwwwww
w...w...wy..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w..Hw...w
w...w.A.w...w
w...w...we..w
wwwwwwwwwwwww
w...w.H.w...w
w...w...w...w
w.4.w.x.wv..w
wwwwwwwwwwwww`,r1_2_10:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.b.w...w...w
wwwwwwwwwwwww
wA.Fw...w...w
w...w...ws..w
w...w...w...w
wwwwwwwwwwwww
w...w..Fw..vw
w.6.w.x.w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_11:`wwwwwwwwwwwww
w..2wc..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w..Aw..xw
w...w..Bw...w
wr..w...wB..w
wwwwwwwwwwwww
wv..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_12:`wwwwwwwwwwwww
w...w...w...w
w.E.w...w...w
w..xw...w..uw
wwwwwwwwwwwww
w...w..Aw..qw
w.g.w...w...w
w...w.E.w...w
wwwwwwwwwwwww
w...w...w...w
w.2.w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_14:`wwwwwwwwwwwww
w...w.G.w...w
w...w...w...w
w...w.A.wxG.w
wwwwwwwwwwwww
w3..w...w...w
w...w...w...w
w...w...w.s.w
wwwwwwwwwwwww
w...w...w.v.w
w.b.w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_15:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w..Aw...w.v.w
w.F.wu..w...w
w...w...w...w
wwwwwwwwwwwww
w..Fw...w..5w
w...w...w...w
wx..w..hw...w
wwwwwwwwwwwww`,r1_2_16:`wwwwwwwwwwwww
w...wr..w.f.w
w..3w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wA.Ew...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..swEx.w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_18:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
ws..w...w..6w
wwwwwwwwwwwww
wc..w...wA..w
w...w.E.w...w
w...wx..w.E.w
wwwwwwwwwwwww
w...w...w...w
w...wy..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_19:`wwwwwwwwwwwww
w...wA..w...w
w...w...w4..w
ws..w.H.w...w
wwwwwwwwwwwww
w...w...w...w
wx..w...w...w
w..Hw...w...w
wwwwwwwwwwwww
w...w...w...w
w..fw...wy..w
w...w...w...w
wwwwwwwwwwwww`,r1_2_20:`wwwwwwwwwwwww
wA..w...w...w
w.C.w...w...w
w...w...w..gw
wwwwwwwwwwwww
w.s.w...w...w
w...w...w.Cxw
w...w.v.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w2..w...w
wwwwwwwwwwwww`,r1_2_22:`wwwwwwwwwwwww
w..qw...w...w
w...w..3w...w
w...w...w.r.w
wwwwwwwwwwwww
wA..w...w...w
w.H.w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wH.xw...w..fw
w...w...w...w
wwwwwwwwwwwww`,r1_2_25:`wwwwwwwwwwwww
w...w..Cw...w
w...w.x.w...w
w.q.w...w...w
wwwwwwwwwwwww
w..hw...w...w
w...w...w...w
w...w...w5..w
wwwwwwwwwwwww
w...w...wA.Cw
w...wy..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_2_6:`wwwwwwwwwwwww
w...w..rw...w
wxC.w...w...w
w...w...w...w
wwwwwwwwwwwww
w..ew...w...w
w...wv..w...w
w...w...w...w
wwwwwwwwwwwww
w.C.w...w...w
wA..w...w.1.w
w...w...w...w
wwwwwwwwwwwww`,r1_2_7:`wwwwwwwwwwwww
w...w...w...w
w..sw...w...w
w...w...w.r.w
wwwwwwwwwwwww
w...wc..w...w
wG..w...w...w
w.x.w...w...w
wwwwwwwwwwwww
w...w...w...w
w6..w...wA..w
w...w...w..Gw
wwwwwwwwwwwww`,r1_3_1:`wwwwwwwwwwwww
w..5w...w...w
w...w...w...w
w...w.c.w...w
wwwwwwwwwwwww
w...w.v.w...w
w...w...w..Aw
w...w...w.y.w
wwwwwwwwwwwww
w...w...w..xw
w...wu..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_10:`wwwwwwwwwwwww
w...w...w...w
w...wv..w...w
w...w...w..sw
wwwwwwwwwwwww
w...w...w...w
w.5.w...wA..w
w...w...w.q.w
wwwwwwwwwwwww
w...wb..w...w
w...w...w...w
w...w...w..xw
wwwwwwwwwwwww`,r1_3_12:`wwwwwwwwwwwww
w..qw...w...w
w...w.x.w...w
w.A.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wh..w.y.w...w
wwwwwwwwwwwww
w...w...w..3w
w..rw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_13:`wwwwwwwwwwwww
w..Aw...w...w
w..rw...w.1.w
w...wx..w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...wy..w...w
wc..w...wq..w
wwwwwwwwwwwww`,r1_3_15:`wwwwwwwwwwwww
w...w..cw...w
w...w...wy..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...ws..w
w...w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w..6wA.uw...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_19:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wv..w...w.r.w
wwwwwwwwwwwww
w6..w...w.h.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w...wA.uw...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_2:`wwwwwwwwwwwww
w...ws..w...w
wA..w...w...w
w.y.w...w...w
wwwwwwwwwwwww
w...w...w6..w
w..xw...w...w
w...w...w...w
wwwwwwwwwwwww
w...wh..w...w
w...w...w...w
w..qw...w...w
wwwwwwwwwwwww`,r1_3_21:`wwwwwwwwwwwww
w...w.4.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..fw...w...w
w...w...w.r.w
wwwwwwwwwwwww
w..Aw...w..vw
w...w.x.w...w
w..sw...w...w
wwwwwwwwwwwww`,r1_3_23:`wwwwwwwwwwwww
w.A.w.x.w...w
w..rw...w...w
w...w...w...w
wwwwwwwwwwwww
w...w.4.w...w
w...w...w...w
wu..w...w.f.w
wwwwwwwwwwwww
w...w...w...w
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_24:`wwwwwwwwwwwww
w...w..uw...w
w...w...w2..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..qw...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wA.yw..xw...w
w...w...we..w
wwwwwwwwwwwww`,r1_3_25:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.b.w...w..5w
w...w..sw...w
w...w...w...w
wwwwwwwwwwwww
wv..w...w...w
w...wA..wx..w
w...w..rw...w
wwwwwwwwwwwww`,r1_3_4:`wwwwwwwwwwwww
w.h.w...w...w
w...w..yw...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.A.w
w6..w...w...w
w...w...w..qw
wwwwwwwwwwwww
w...w...w.x.w
w...w...w...w
w...w..sw...w
wwwwwwwwwwwww`,r1_3_6:`wwwwwwwwwwwww
w4..w...w...w
w...wy..ws..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wh..w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w...w..vw...w
w...w.A.w...w
wwwwwwwwwwwww`,r1_3_8:`wwwwwwwwwwwww
w...w...w..cw
w...w...w...w
w...w.y.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wAv.w.3.w...w
wwwwwwwwwwwww
wx..w...w.r.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_3_9:`wwwwwwwwwwwww
w...w...w..Aw
w..qw6..w...w
w...w...w..uw
wwwwwwwwwwwww
w...w...w.x.w
w...w...w...w
w.y.w...w...w
wwwwwwwwwwwww
w...wf..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_10:`wwwwwwwwwwwww
w...wr..w...w
w..sw...w...w
w...w...w...w
wwwVwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...R...w...w
w.A2wx..w..fw
wwwwwwwwwwwww`,r1_4_12:`wwwwwwwwwwwww
w..1w...w...w
w...Q.x.w...w
wA..w...w...w
wwwwwwwwwwwww
w...w...U...w
w...wu..w...w
w...w...w...w
wwwwwwwwwwwww
ws..w...w...w
w...w...w.g.w
w...w...w...w
wwwwwwwwwwwww`,r1_4_13:`wwwwwwwwwwwww
w...w...w...w
w...w...w.e.w
w...w...w...w
wwwwwwwwwwwww
w..6w...w...w
wA..wu..w...w
w...w...S...w
wwYwwwwwwwwww
w...w.r.w...w
w..xw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_14:`wwwwwwwwwwwww
w...wu..Y...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..3w...wr..w
w.A.w.b.w...w
wwwSwwwwwwwww
w...w...w...w
w..xw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_15:`wwwwwwwwwwwww
w...w...w...w
w..qw...V...w
w...w...w...w
wwwwwwwwwwwww
w.y.w..4wx..w
w...wA..U...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..bw...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_16:`wwwwwwwwwwwww
w...w...S...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...ws..w
wc..w...w...w
wwwwwwwwwwwww
w...wA..w...w
w..uw.4.w...w
w...w...U..xw
wwwwwwwwwwwww`,r1_4_18:`wwwwwwwwwwwww
w...R...w...w
w...w...w...w
ws..w.y.w...w
wwwwwwwwwwwww
w..5w.x.w.c.w
w...V...w...w
wA..w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_19:`wwwwwwwwwwwww
w.h.w...w...w
w...w...w...w
w...w...S...w
wwwwwwwwwwwww
w...R.x.w...w
w...w...w...w
wA2.w...w.s.w
wwwwwwwwwwwww
w...w...w...w
w..vw...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_2:`wwwwwwwwwwwww
wc..w...w...w
w...w..rw...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...U...w...w
w...w...w...w
wwwwwwwwwwwww
w...w..xw...w
w.A.Q...w...w
w..1w...wv..w
wwwwwwwwwwwww`,r1_4_21:`wwwwwwwwwwwww
w...w..uw...w
w...w...w...w
w...w...w.b.w
wwwwwwSwwwwww
w.A.w...w...w
w.6.w...w...w
w...w...w...w
wYwwwwwwwwwww
w...w...w..sw
w.x.w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_22:`wwwwwwwwwwwww
w...w...w...w
w..ew..uw...w
w...w...w.y.w
wwwwwwwwwwwww
w...w...w...w
wA..U..xw...w
w..4w...w...w
wwwwwwwwwwwww
w...w...Q...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_25:`wwwwwwwwwwwww
w..bw...w...w
w...w...w...w
w...w...w...w
wwwwwwRwwwwww
w...w...w..yw
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...wx..w..uw
wA..Y...w...w
w.6.w...w...w
wwwwwwwwwwwww`,r1_4_4:`wwwwwwwwwwwww
w...w...w...w
w...S...w...w
w...w...w...w
wwwwwwwwwwwww
w...Y...w...w
w.6.w...w...w
wA..wx..w.f.w
wwwwwwwwwwwww
wq..w...w.y.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_5:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.y.w...w...w
wwwwwwwwwwUww
w.6.Y...w...w
w...w...w...w
w..Aw..xw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.h.w..vw...w
wwwwwwwwwwwww`,r1_4_7:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w.6.Y...w
w...wA..w...w
wc..w...wx..w
wwwwwwwwwwwww
w...S...w.s.w
w...wu..w...w
w...w...w...w
wwwwwwwwwwwww`,r1_4_9:`wwwwwwwwwwwww
w...w...w...w
w...R...w..gw
w...w...w...w
wwwwwwwwwwwww
w...w.A5w...w
w...w...wx..w
w...w...V...w
wwwwwwwwwwwww
w...w...w...w
w...w...ws..w
w..rw...w...w
wwwwwwwwwwwww`,r1_5_10:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...U.q.w..Aw
w...w...w...w
w...w...w.y.w
wwwwwwwSwwwww
w...w...w...w
w...w...w.x.w
w..rw...w...w
wwwwwwwwwwwww`,r1_5_12:`wwwwwwwwwwwww
w..rw...w...w
w...w...w...w
w..Aw..xw...w
wwwwwwwwwwSww
w...w...w...w
w..uw...w...w
w...w...w...w
wwwRwwwwwwwww
w...w...w...w
w...w...wv..w
w...w...w...w
wwwwwwwwwwwww`,r1_5_13:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...R...wA..w
w...w...w..rw
wwwwwwVwwwwww
w.y.w...w...w
w...wq..w...w
w...w...w..xw
wwwwwwwwwwwww`,r1_5_15:`wwwwwwwwwwwww
wA..w..xw...w
w..yw...w...w
w...w...w..sw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.v.w...w
wwwwwwwwwwQww
w...w...Y...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_5_17:`wwwwwwwwwwwww
w...w..sw...w
w...w...w...w
w...w.A.w.x.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...Y...w...w
wwwwwRwwwwwww
w...w...w...w
w..yw...w...w
w...w..uw...w
wwwwwwwwwwwww`,r1_5_18:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...R...w...w
wwwwwwwwwwQww
w.q.w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.s.w...w...w
w...w..uw...w
w...w.A.w..xw
wwwwwwwwwwwww`,r1_5_19:`wwwwwwwwwwwww
w...S...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
wA..w...w...w
w...w...w...w
ws..w...w...w
wwwwwwwwwwUww
w...w...w...w
w...w..yw...w
w.x.w...wu..w
wwwwwwwwwwwww`,r1_5_20:`wwwwwwwwwwwww
w...w...w...w
w...R...w...w
w...w...w...w
wwwwwwwwwVwww
w...w...w...w
w...w...w...w
wq..w.y.w...w
wwwwwwwwwwwww
w..Aw...w...w
w...w...w...w
w..uw..xw...w
wwwwwwwwwwwww`,r1_5_23:`wwwwwwwwwwwww
w...w...w...w
w..yw...w...w
w...w...w...w
wwwwwwwwwwwQw
w...w...w...w
w.A.w...w...w
wr..w.v.w...w
wwwwwwwVwwwww
w...w...w...w
w...w...w...w
wx..w...w...w
wwwwwwwwwwwww`,r1_5_24:`wwwwwwwwwwwww
w...w...w...w
w...wq..w..Aw
w...w...w.r.w
wYwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.u.w.x.w
wwwwwwwSwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_5_3:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.s.Y...w...w
wwwwwwwwwwwww
w...w...w.A.w
w...w...w...w
w...w...w..uw
wwwUwwwwwwwww
w...w...w...w
w...w...w...w
w...w..rw..xw
wwwwwwwwwwwww`,r1_5_4:`wwwwwwwwwwwww
w...w...wA..w
w...w...w...w
wr..S...w..yw
wwUwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w..xw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...ws..w...w
wwwwwwwwwwwww`,r1_5_6:`wwwwwwwwwwwww
w...w...w...w
w...w..sw.x.w
w...w.A.w...w
wRwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwYw
w...w.y.w...w
w...w...wr..w
w...w...w...w
wwwwwwwwwwwww`,r1_5_7:`wwwwwwwwwwwww
w...w...w...w
w..vw...w...w
w...w...U...w
wwwwwwwwwwwww
wA..w...w...w
w...w...Q...w
wu..w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..sw...w
wx..w...w...w
wwwwwwwwwwwww`,r1_5_8:`wwwwwwwwwwwww
w...w...w...w
w...R...w...w
wy..w...w...w
wwwwwwwwwwwVw
ws..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w.A.w...w
w...w...w...w
w...w..vw.x.w
wwwwwwwwwwwww`,r1_5_9:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wAq.w...w.v.w
wwwwwwYwwwwww
w..xw.u.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...Q...w...w
wwwwwwwwwwwww`,r1_6_13:`wwwwwwwwwwwww
w...w...w.A.w
w...w...w...w
w..ew..1w.G.w
wwwwwwwwwwwww
w...w...w...w
w...w..sw...w
w...w...wGx.w
wwwwwwwwwwwww
w...w...w.f.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_6_17:`wwwwwwwwwwwww
w...w...w...w
w..hw...w...w
w...w...w..2w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.s.w...w
wwwwwwwwwwwww
w...w...w...w
wf..w...w.A.w
w...wGx.wG..w
wwwwwwwwwwwww`,r1_6_3:`wwwwwwwwwwwww
w...wE..w...w
w...w...w...w
w..gw.x.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.3.w
wwwwwwwwwwwww
w.y.w.f.w...w
w...w...w.AEw
w...w...w...w
wwwwwwwwwwwww`,r1_6_6:`wwwwwwwwwwwww
w...w...w...w
wC..w.4.wb..w
wA..w...w...w
wwwwwwwwwwwww
w..gw.y.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..xw...w...w
w..Cw...w...w
wwwwwwwwwwwww`,r1_6_7:`wwwwwwwwwwwww
w...w4..w...w
w...w...w...w
w.v.w...w...w
wwwwwwwwwwwww
w...w.C.w...w
w...w...w...w
w...wA..w...w
wwwwwwwwwwwww
w..xw...w...w
wC..w.e.w...w
w...w...w.g.w
wwwwwwwwwwwww`,r1_6_9:`wwwwwwwwwwwww
w...w...wE..w
wc..w..Ew...w
w...wA..wx..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.f.w
wwwwwwwwwwwww
w.q.w...w...w
w...w...w...w
w...w...w.3.w
wwwwwwwwwwwww`,r1_7_10:`wwwwwwwwwwwww
w.4.w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w.s.w...w
w...w...w..Aw
w...w...w.r.w
wwwSwwwwwwwww
w...w.1.w...w
w...w...wx..w
w...w...w...w
wwwwwwwwwwwww`,r1_7_14:`wwwwwwwwwwwww
w...w...wA..w
w...wu..w...w
w...R...w.y.w
wwwwwwwwwwwww
w...w...wx..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w..6w
w..5w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_7_15:`wwwwwwwwwwwww
w...w...w...w
w...V...w...w
w...w...w.6.w
wwwwwwwwwwwww
w...w...w...w
w.1.w...w...w
w...w...w...w
wwwwwwwwwwwww
w...wx..w..qw
w..sw...w...w
wA..w...w...w
wwwwwwwwwwwww`,r1_7_16:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..rw...w
wAq.w...w...w
wwwwwwwwwRwww
w..xw...w...w
w...w...w...w
w...w5..w3..w
wwwwwwwwwwwww`,r1_7_24:`wwwwwwwwwwwww
w...w...w...w
w...w...w6..w
w...w...w...w
wwVwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.3.wA.uw
wwwwwwwwwwwww
w...w...w...w
w...w...w.x.w
w...wr..w...w
wwwwwwwwwwwww`,r1_8_1:`wwwwwwwwwwwww
w...w..4w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
wA.1wx..w...w
w...w...w...w
w...Q...w...w
wwwwwwwwwwwww
w...V...w...w
w...w3..R...w
w...w...w...w
wwwwwwwwwwwww`,r1_8_12:`wwwwwwwwwwwww
w...w...w...w
w...Q...w...w
w...w...w...w
wwwwwwwwwwwww
w.A.w...w...w
w..6wx..w...w
w...Y...w...w
wwwwwwwwwwUww
w...w...w...w
w...w...w...w
w..2w5..w...w
wwwwwwwwwwwww`,r1_8_13:`wwwwwwwwwwwww
w.6.w..2w...w
w...w...w...w
w...w...w...w
wVwwwwwwwwwww
w...w..Awx..w
w...w...S...w
w...w.3.w...w
wwQwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_8_16:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...S...w...w
wwwwwwwwwwwww
w...w...w1.Aw
w...w...w...w
w...w.5.w...w
wwwYwwwwwwQww
w...w...w..xw
w...w...w...w
w..4w...w...w
wwwwwwwwwwwww`,r1_8_18:`wwwwwwwwwwwww
w.6.w3..w...w
w...w...w...w
w...w...V...w
wwwwwwwwwwwww
w...w.1.w...w
w...w...w...w
w...wA..w...w
wwwwwwwQwwwUw
w...wx..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_8_24:`wwwwwwwwwwwww
w...Q...w...w
w...w...w...w
w...w..4w...w
wwwwwwwwwwwww
w3..wx..w...w
w...w...w...w
w.A.S...w...w
wwwwwwwwwwwww
w...V...w..6w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_9_1:`wwwwwwwwwwwww
w...w...w...w
w.2.wE..w...w
w...wx..w...w
wwwwwwwwwwwww
w...w.c.w...w
wA..w...w...w
w..Ew...w...w
wwwwwwwwwwwVw
w.1.w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r1_9_10:`wwwwwwwwwwwww
w...w...w..hw
w.F.w...w...w
wx..w...w...w
wwwwwwwwwwwww
w...w..Aw...w
w...w...w...w
w...wF..w6..w
wVwwwwwwwwwww
w...w...w...w
w...w...w4..w
w...w...w...w
wwwwwwwwwwwww`,r1_9_17:`wwwwwwwwwwwww
w...w...Y...w
w...w...w...w
wc..w...w...w
wwwwwwwwwwwww
w2..w...w...w
w...w...wB.Aw
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w.1.wBx.w
w...w...w...w
wwwwwwwwwwwww`,r1_9_21:`wwwwwwwwwwwww
wx..w...w...w
w...w...w...w
w..Gw...w..fw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.1.w
wwwwwwSwwwwww
w..Aw...w...w
w...w...w...w
wG..w...w..6w
wwwwwwwwwwwww`,r1_9_25:`wwwwwwwwwwwww
w6..w.G.w...w
w...w...w...w
w...w..Aw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w..cw
wwwUwwwwwwwww
w.2.w..Gw...w
w...w..xw...w
w...w...w...w
wwwwwwwwwwwww`,r2_10_10:`wwwwwwwwwwwww
w...w.C.w...w
w...w..1w...w
w...w...w..yw
wwwUwwwQwwwww
w...w.x.w...w
w...w...w...w
w...w...w..sw
wwwwwwwwwwwww
w..Cw...w...w
w...w...w...w
wA..w...S...w
wwwwwwwwwwwww`,r2_10_19:`wwwwwwwwwwwww
w..qw...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwUQw
w.3.w...w...w
w...S...w...w
w..Gw..xw...w
wwwwwwwwwwwww
w.u.w...w...w
w...w.G.w...w
w...wA..w...w
wwwwwwwwwwwww`,r2_10_24:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...Q...w...w
wwwYwwwwwwwww
w...w3..w...w
w...w...w..Ew
w...wE..wA..w
wwwwwwSwwwwww
w...wx..w..vw
w...w...w...w
w..rw...w...w
wwwwwwwwwwwww`,r2_11_13:`wwwwwwwwwwwww
w.5.wA..wE..w
w...w...w...w
w...w.E.w..uw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w..xw
wwwwwwwwwwwww
w...w...w..4w
w..bwq..w...w
w...w...w...w
wwwwwwwwwwwww`,r2_11_24:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w2..wf..w...w
wwwwwwwwwwwww
w.y.w...w...w
w...w...w...w
w...w...w5..w
wwwwwwwwwwwww
w...w...w...w
wC..w..qw...w
w.A.w..Cw..xw
wwwwwwwwwwwww`,r2_11_9:`wwwwwwwwwwwww
w...w.A.w3..w
w...w.C.w...w
wu..w...w...w
wwwwwwwwwwwww
w...w...we..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wC..wx..w1..w
w..yw...w...w
wwwwwwwwwwwww`,r2_12_17:`wwwwwwwwwwwww
wg..w...w...w
w...w...w4..w
w...w...w...w
wwwwwwwwwwwww
w...w...w2A.w
w...wq..w...w
w.s.w...w...w
wwwwwwwwwwRww
w...wx..w...w
w...w...w.3.w
w...w...S...w
wwwwwwwwwwwww`,r2_12_23:`wwwwwwwwwwwww
w...w...w...w
w...we..w...w
w...w...w...w
wwwwwwwwwwwww
w.q.w.6.w...w
w...w...wx..w
w...w...w...w
wwwwwwwwwRwww
ws..w.5.w...w
w...w...V...w
w...w.A.w2..w
wwwwwwwwwwwww`,r2_12_8:`wwwwwwwwwwwww
w..vw...w...w
w...w...w...w
w...w...w..3w
wwwwwwwwwwwww
w...w.q.wx..w
w.f.w...w...w
w...w...w...w
wwwwwwwwwwYww
w...w.A4w..6w
w...w...U...w
w...w...w...w
wwwwwwwwwwwww`,r2_13_15:`wwwwwwwwwwwww
w...wv..wA..w
w...w...w...w
w5..w...w.y.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.q.w
wwwwwwwQwwwww
w.3.w...w...w
w...w...w...w
w...w...w.x.w
wwwwwwwwwwwww`,r2_13_18:`wwwwwwwwwwwww
w...w...w...w
w...wy..w...w
w.r.w..Aw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.x.w6..w...w
wwwwwwVwwwwww
w...w...w..uw
w...w...w...w
w..4w...w...w
wwwwwwwwwwwww`,r2_13_22:`wwwwwwwwwwwww
w...wx..w.4.w
w..yw...w...w
w...w...w...w
wwwwwwwwwwwVw
wq..w..3w...w
w...w...w...w
wA..w...w...w
wwwwwwwwwwwww
w...w...w...w
w..vw...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_14_11:`wwwwwwwwwwwww
w..3wG..w...w
w...w...w...w
w...w.A.w...w
wwwwwwwwwwUww
w...w...w...w
w...w..cw...w
wy..w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w.GFw...w.F.w
w...w...w...w
wwwwwwwwwwwww`,r2_14_21:`wwwwwwwwwwwww
w...w...w...w
w...w...U...w
w...w...w...w
wwwwwwwwwwwww
wG..wx..w3..w
w..Bw...w...w
w...wB..w...w
wwwwwwwwwwwww
w...w...w.c.w
w...wA..w...w
w..vw.G.w...w
wwwwwwwwwwwww`,r2_14_5:`wwwwwwwwwwwww
wC..w...wr..w
w..Hw...w...w
w...w.CAw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w5..w...w
wwwwwwwwwwUww
w...wx.Hw...w
w...w...w...w
w..fw...w...w
wwwwwwwwwwwww`,r2_15_17:`wwwwwwwwwwwww
w...w...w...w
w..4w..sw...w
w...w...w...w
wwwwwwwwwwYww
w...w...w...w
w...w1.Aw...w
wu..w...w...w
wwwwwwQwwwwww
w...w...w..xw
w...w..vw...w
w...w...w...w
wwwwwwwwwwwww`,r2_16_11:`wwwwwwwwwwwww
w...U...w...w
w...w...w...w
w.c.w...w..6w
wwwwwwwwwwwww
w..xw...w2..w
w..HwA5.w...w
w...w...w...w
wwwwwwwVwwwww
w...w...w...w
w...w...w...w
w...wH..w...w
wwwwwwwwwwwww`,r2_17_7:`wwwwwwwwwwwww
w...w...w...w
w...w...wv..w
w...w...Q...w
wwwwwwwwwwwww
w..xw...w...w
w...w.e.w...w
w...w...w...w
wwwVwwwwwRwww
w...w...w...w
w...wr..w...w
w5..wA..w...w
wwwwwwwwwwwww`,r2_18_12:`wwwwwwwwwwwww
w...w.h.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w..Aw...w.B.w
w...w...w...w
w.s.w...wx..w
wwwwwwwwwwwww
w...w.u.w...w
wB..w...V...w
w...w...wr..w
wwwwwwwwwwwww`,r2_2_11:`wwwwwwwwwwwww
w...w...w...w
w...V...w...w
w...w...w..2w
wwwwwwwwwwwww
w...w...w...w
w...wx..Q..1w
w...w...w...w
wwwwwwwwwwwww
w...w...w.u.w
w...w...w...w
w.g.w..hwA..w
wwwwwwwwwwwww`,r2_2_12:`wwwwwwwwwwwww
wg..w...w...w
w...w...w2..w
w...w...w...w
wwwwwVwwwwwww
w...w...w...w
w.A.w...w...w
ws..w...w...w
wwwwwwwwwwwww
w...w..xw..ew
w..3w...w...w
w...S...w...w
wwwwwwwwwwwww`,r2_2_13:`wwwwwwwwwwwww
w..yw...w.x.w
wA..w.2.R...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.4.w...w
wwwwwwwwwwwYw
w...w...w...w
w...w...w.f.w
wh..w...w...w
wwwwwwwwwwwww`,r2_2_14:`wwwwwwwwwwwww
w...w...w...w
w..2w...w...w
w...w...Q...w
wwwwwwwwwwwww
w...we..wx..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwVw
w...w.A.w...w
w.c.w...w..5w
w...w..rw...w
wwwwwwwwwwwww`,r2_2_18:`wwwwwwwwwwwww
w...w...w...w
w...w.2.w...w
w...w...w...w
wwwwwwwwwYwww
w...w.x.w...w
w...w...w.h.w
w...w...w...w
wwwwwwwVwwwww
w...w...w...w
w..gw...w..Aw
w...w.5.wr..w
wwwwwwwwwwwww`,r2_2_2:`wwwwwwwwwwwww
w...w...w...w
w...w.g.w...w
w...w...w...w
wwwQwwwwwwwww
w...w...w...w
w...w...w.4.w
w...wx..U...w
wwwwwwwwwwwww
w..6we..w.r.w
w...w...wA..w
w...w...w...w
wwwwwwwwwwwww`,r2_2_20:`wwwwwwwwwwwww
w...w...w...w
w..1w...w6..w
w...Q..xw...w
wwwwwwwwwwwww
w.s.w...w...w
w..Aw...w...w
w...w..bw...w
wwwwwwwwwwVww
w...w...w...w
w...w...w...w
w..hw...w...w
wwwwwwwwwwwww`,r2_2_21:`wwwwwwwwwwwww
wb..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwUw
wx..w...we..w
w...w.6.w...w
w...w...w...w
wwwVwwwwwwwww
w5..w..Aw...w
w...wq..w...w
w...w...w...w
wwwwwwwwwwwww`,r2_2_22:`wwwwwwwwwwwww
w...w...w...w
w...Y...w...w
w...w.g.w.2.w
wwwwwwwwwwwww
w...w...w...w
w.x.w..cw...w
w...w...w...w
wwwVwwwwwwwww
w...w...w...w
w.5.w..Aw...w
w...wv..w...w
wwwwwwwwwwwww`,r2_2_24:`wwwwwwwwwwwww
w.e.Y...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w..gw...w
w...w...w...w
w...w...wx..w
wwwwwwwwwwQww
w...w..Aw...w
w...w...w...w
w.3.w..rw..1w
wwwwwwwwwwwww`,r2_2_3:`wwwwwwwwwwwww
w...w...w.x.w
wh..w...w...w
w...w...w...w
wwwwwwwwwwUww
w...Y...w...w
w...w...w...w
wf..w...w4..w
wwwwwwwwwwwww
w...w...w..qw
w...w.2.w.A.w
w...w...w...w
wwwwwwwwwwwww`,r2_2_4:`wwwwwwwwwwwww
w...w...w...w
w...w...w..hw
w...w...w...w
wwwwwwwwwwwww
w...w5..w.e.w
w..xw...w...w
w...w...w...w
wwRwwwwwwwwUw
w...w..Aw...w
w..2w...w...w
w...wy..w...w
wwwwwwwwwwwww`,r2_2_6:`wwwwwwwwwwwww
w...w..xw...w
w...Q...w...w
w1..w...w...w
wwwwwwwwwwYww
w.y.w...w...w
w...w...w..cw
w.A.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..hw...w.5.w
wwwwwwwwwwwww`,r2_2_8:`wwwwwwwwwwwww
w...wy..w...w
w...w..Aw...w
w..5w...w...w
wwVwwwwwwwwww
w...w...w...w
wx..w...w...w
w...w.1.w..fw
wwwwwwwwwwYww
w...w...w...w
w...w...w...w
wh..w...w...w
wwwwwwwwwwwww`,r2_2_9:`wwwwwwwwwwwww
w...w...w.A.w
w...w...w...w
w...Y...w.y.w
wwwwwwwwwwwww
w...w...w...w
w...w5..w...w
w...w...w4..w
wwwwwwwwwwwUw
w..gw.h.w...w
w...w...w.x.w
w...w...w...w
wwwwwwwwwwwww`,r2_3_1:`wwwwwwwwwwwww
w...w...w...w
w...w2..w...w
w..fw...w.r.w
wwwwwwwwwwwww
w.A.w...w...w
w...w...w...w
wy..w...w...w
wwwwwwwwwwwww
w...w..xw...w
w...w...w...w
w..uw...ws..w
wwwwwwwwwwwww`,r2_3_12:`wwwwwwwwwwwww
wb..w...w...w
w...wA.vw...w
w...w...w.s.w
wwwwwwwwwwwww
w.6.w...w...w
w...w...w...w
w...w...w.x.w
wwwwwwwwwwwww
w...w...w...w
w...w...wu..w
w...wy..w...w
wwwwwwwwwwwww`,r2_3_13:`wwwwwwwwwwwww
w.x.ws..wv..w
w...w...w.A.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.y.w
wwwwwwwwwwwww
w...w...w...w
w..uw...w...w
w...wc..w.3.w
wwwwwwwwwwwww`,r2_3_15:`wwwwwwwwwwwww
w...w...w...w
w...w..hw...w
w...w...w..qw
wwwwwwwwwwwww
wA..w...w...w
w...w...w.6.w
wy..w...w...w
wwwwwwwwwwwww
w...wx..w..rw
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_3_17:`wwwwwwwwwwwww
w...w...w...w
w..uw...w...w
w...wx..w.s.w
wwwwwwwwwwwww
w.v.w...wh..w
w...w...w...w
w..Aw...w...w
wwwwwwwwwwwww
w...w...w...w
w..qw3..w...w
w...w...w...w
wwwwwwwwwwwww`,r2_3_18:`wwwwwwwwwwwww
w...w...wr..w
w...w...w...w
w.q.w...w...w
wwwwwwwwwwwww
wx..w..2w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.s.w...w...w
w...w...w...w
w...wy.Awh..w
wwwwwwwwwwwww`,r2_3_2:`wwwwwwwwwwwww
w.x.w...w...w
w...wu..w..gw
w...w...w...w
wwwwwwwwwwwww
w.r.w...w...w
w...w...w...w
w...w.2.w...w
wwwwwwwwwwwww
wq..w...w...w
w..Aw...w...w
w...wy..w...w
wwwwwwwwwwwww`,r2_3_21:`wwwwwwwwwwwww
w..sw...w..hw
w...wx..w...w
w...w...w...w
wwwwwwwwwwwww
w.v.w...w...w
w..Aw...w6..w
w...w...w...w
wwwwwwwwwwwww
w.r.w...w...w
w...w...w...w
w...w..uw...w
wwwwwwwwwwwww`,r2_3_22:`wwwwwwwwwwwww
w...w..rw...w
w...w...w...w
w...w...w6..w
wwwwwwwwwwwww
w...w.s.w.e.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w..xw
wA.uw..qw...w
w...w...w...w
wwwwwwwwwwwww`,r2_3_23:`wwwwwwwwwwwww
w..yw...w...w
w...w...wu..w
w...w..xw...w
wwwwwwwwwwwww
wq..w...w.r.w
w...we..w...w
wA..w...w...w
wwwwwwwwwwwww
w...w...w...w
w6..w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_3_24:`wwwwwwwwwwwww
w...w...w...w
w..uwc..w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w..vw...w...w
w...w...w...w
wwwwwwwwwwwww
w.4.w...w.y.w
w...wA..w...w
w...w..qw...w
wwwwwwwwwwwww`,r2_3_25:`wwwwwwwwwwwww
w...w...w...w
w...w.g.w...w
wq..w...w5..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
ws..w...w...w
wwwwwwwwwwwww
w.A.w...w..xw
w..rw...w...w
w...w..vw...w
wwwwwwwwwwwww`,r2_3_5:`wwwwwwwwwwwww
w...wv..w...w
w...w.A.w...w
wr..w...w...w
wwwwwwwwwwwww
w..xw...w...w
w...w...w...w
w...w1..w...w
wwwwwwwwwwwww
wq..w...w.y.w
w...wf..w...w
w...w...w...w
wwwwwwwwwwwww`,r2_3_6:`wwwwwwwwwwwww
w...w.A.w.f.w
w...wq..w...w
w.r.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.x.w...w...w
wwwwwwwwwwwww
w...w...w.u.w
w...w...w...w
w..2w..yw...w
wwwwwwwwwwwww`,r2_4_1:`wwwwwwwwwwwww
w...wHA.w..Hw
w..sw...w...w
w...w...w.r.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...wx..w
wwwwwwwwwwwww
w.q.w...w...w
w...w..gw5..w
w...w...w...w
wwwwwwwwwwwww`,r2_4_10:`wwwwwwwwwwwww
w...wH..w...w
w...w...w...w
w...w.A.w..yw
wwwwwwwwwwwww
w...w...w..Hw
w...w...w...w
w..4w...w..qw
wwwwwwwwwwwww
w...w...w...w
w...w..vwx..w
w.c.w...w...w
wwwwwwwwwwwww`,r2_4_12:`wwwwwwwwwwwww
w...w...w...w
w..sw...w...w
w...w...w..qw
wwwwwwwwwwwww
w...w...w..bw
wA..w...w...w
w.C.w..2w...w
wwwwwwwwwwwww
w...w...w...w
w..uw...w...w
w..Cwx..w...w
wwwwwwwwwwwww`,r2_4_13:`wwwwwwwwwwwww
w...w...w.C.w
w...w...wA..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..rw...w
wCq.w...w2..w
wwwwwwwwwwwww
w...w...w..vw
wx..w...w...w
w...wh..w...w
wwwwwwwwwwwww`,r2_4_15:`wwwwwwwwwwwww
w..vw.x.w...w
w...w...w...w
w.G.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w.h.w
wq..w.5.w...w
wwwwwwwwwwwww
w...w.A.w.u.w
w...w...w...w
w...wG..w...w
wwwwwwwwwwwww`,r2_4_16:`wwwwwwwwwwwww
w...w..yw..2w
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww
w.e.w..Cw...w
w...w..Aw...w
w...w...w...w
wwwwwwwwwwwww
wC..w...w...w
w..vw...w...w
w...w.x.w...w
wwwwwwwwwwwww`,r2_4_18:`wwwwwwwwwwwww
w...w..sw.x.w
w...wE..w...w
wu..w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...wg..w
wwwwwwwwwwwww
w.6.w...w...w
w...w...w...w
w...wAE.wq..w
wwwwwwwwwwwww`,r2_4_19:`wwwwwwwwwwwww
w..yw...w..Aw
wF..w...w...w
w...w..xwF..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.s.w...w
wwwwwwwwwwwww
w...w...w.u.w
w...we..w...w
w6..w...w...w
wwwwwwwwwwwww`,r2_4_22:`wwwwwwwwwwwww
wb..w.A.w...w
w...w...w..Cw
w...w.C.w.q.w
wwwwwwwwwwwww
w...w.2.w...w
w...w...w...w
w.r.w...w..xw
wwwwwwwwwwwww
w...w.u.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_4_25:`wwwwwwwwwwwww
w...w..sw...w
w...w...w...w
w...w..Ewx..w
wwwwwwwwwwwww
w...w...w..qw
w...w...w...w
wr..w...w...w
wwwwwwwwwwwww
w.3.w...w...w
w...w...wA..w
w...wc..wE..w
wwwwwwwwwwwww`,r2_4_3:`wwwwwwwwwwwww
w...wf..w...w
w.E.w...w...w
wu..w...w...w
wwwwwwwwwwwww
w...w.1.w...w
w.x.w...w..Ew
w...w...w.A.w
wwwwwwwwwwwww
w...w...w.r.w
w...w...w...w
w..yw...w...w
wwwwwwwwwwwww`,r2_4_4:`wwwwwwwwwwwww
w...w...w...w
w...w..6w...w
w...w...w..uw
wwwwwwwwwwwww
w...w...w...w
w...wC..w...w
wCv.w.A.w...w
wwwwwwwwwwwww
w..xw.g.w...w
w...w...w...w
w...w...ws..w
wwwwwwwwwwwww`,r2_4_5:`wwwwwwwwwwwww
w.C.w...w...w
w...w..4w...w
w.v.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...wr..w...w
w..xw...w...w
wwwwwwwwwwwww
w..Cw..gw..qw
wA..w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_4_8:`wwwwwwwwwwwww
w...w...w...w
w..sw..xwu..w
wC..w...w...w
wwwwwwwwwwwww
w.v.w..gw...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.C.w...w..2w
w...w...w...w
w.A.w...w...w
wwwwwwwwwwwww`,r2_4_9:`wwwwwwwwwwwww
w.H.w...w...w
w...wc..w..3w
wv..w...w...w
wwwwwwwwwwwww
w...w.y.w...w
w...w...wH..w
w.x.w...w..Aw
wwwwwwwwwwwww
w...w...w...w
w...w...ws..w
w...w...w...w
wwwwwwwwwwwww`,r2_5_1:`wwwwwwwwwwwww
w...w...w...w
w...w...w.F.w
w...Y...w..Aw
wwwwwwVwwwwww
ws..w...w...w
w...w...wC.xw
w...w...w...w
wwwwwwwwwwwww
w..Fw...Q...w
w.C.w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_5_10:`wwwwwwwwwwwww
wG..w...wF..w
w...w...w.G.w
wx..w.q.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...S...w
wwwwwwwwwYwww
w...w...w...w
wF..w...w...w
w.A.w...V...w
wwwwwwwwwwwww`,r2_5_12:`wwwwwwwwwwwww
w..Bw...S...w
wA..w...R...w
w...w...Q...w
wwwwwwwwwwwww
w..Hw...w...w
w..Bw...wxH.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w..sw...w
wwwwwwwwwwwww`,r2_5_13:`wwwwwwwwwwwww
w...wA..w...w
w...wE..w...w
w...w...w...w
wwwwwwwwwwwww
w...w...wH.Ew
w...Q...w...w
w...w...w...w
wwVSwwwwwwwww
w...w.H.w...w
w...wx..w...w
w...w...wv..w
wwwwwwwwwwwww`,r2_5_14:`wwwwwwwwwwwww
w.C.w..xw...w
w..Gw.G.w..Aw
w...w...wC..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w..qw
wUwwwwwSwwwww
w...w...w...w
w...w...w...w
w...Y...w...w
wwwwwwwwwwwww`,r2_5_18:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...wBA.w..uw
wwwwwwwwwwwww
w...w...w..Bw
w...wx..w...w
w...w.E.w..Ew
wwwwwwwwwwwww
w...Y...w...w
w...w...w...w
w...R...S...w
wwwwwwwwwwwww`,r2_5_20:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.r.w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.xGw...w...w
wwwwwwwwwSYVw
w.F.w..Gw...w
w...w...w...w
w..Aw.F.w...w
wwwwwwwwwwwww`,r2_5_22:`wwwwwwwwwwwww
w...w...w...w
w...Q...w...w
w...w...U...w
wwwwwwwwwwwVw
w...w.A.w...w
w...w..Fw...w
ws..w...w...w
wwwwwwwwwwwww
w...w...w...w
wH..w...wx..w
w.F.w...w..Hw
wwwwwwwwwwwww`,r2_5_23:`wwwwwwwwwwwww
w...w...w..Aw
w...w...w.F.w
w...w...w...w
wwVSwwwYwwwww
w...w...w...w
w...w...w...w
w...w...w.xBw
wwwwwwwwwwwww
w...wB..w...w
w...w...w...w
w..sw.F.w...w
wwwwwwwwwwwww`,r2_5_25:`wwwwwwwwwwwww
w..vwE..w...w
w...w...w.E.w
w...w.x.wH..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.AHw...w
wQVwwwwwwwwww
w...w...w...w
w...w...w...w
w...U...w...w
wwwwwwwwwwwww`,r2_5_3:`wwwwwwwwwwwww
w.B.w..Bw...w
w...w...w...w
wF..wx..w...w
wwwwwwwwwwwww
w...w...w...w
w...w...wr..w
w...w...w...w
wYwwwwUwwwwww
w...w...w..Aw
w...w...w.F.w
w...V...w...w
wwwwwwwwwwwww`,r2_5_4:`wwwwwwwwwwwww
w.F.wx..w...w
w...wF..w...w
w.E.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...S...w...w
w...w...w..yw
wwwwwwwwwwwww
wA..w...R...w
w..Ew...Y...w
w...w...w...w
wwwwwwwwwwwww`,r2_5_9:`wwwwwwwwwwwww
w...w...w..xw
w...w..Fw...w
w...w.G.wF..w
wwUwwwwwwwwww
w...w...w...w
w...wG..w...w
w...wA..w...w
wwwwwwwwwwRQw
w...w...w...w
w..vw...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_6_1:`wwwwwwwwwwwww
wA..w...w...w
w.B.w...w..cw
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w.6.w...w...w
w...w.f.w.r.w
wwwwwwwwwwwww
w...w...w...w
w...V...w...w
w.B5w.x.w...w
wwwwwwwwwwwww`,r2_6_13:`wwwwwwwwwwwww
w...w...w...w
wA..w...wv..w
w.C.w...w...w
wwwwwwwwwwwww
w...w...w1..w
w...w...w...w
w...wf..w...w
wwwwwwwwwwwww
w2..w...w...w
w...wx..w...w
wC..R...we..w
wwwwwwwwwwwww`,r2_6_16:`wwwwwwwwwwwww
w...w...w...w
w...w...w..hw
w...wG.Aw...w
wwwwwwwwwwwww
w...w...Y...w
w...w.G6w...w
w...w...wx..w
wwwwwwwwwwwww
w...w...w4..w
w..sw...w...w
w...w.c.w...w
wwwwwwwwwwwww`,r2_6_18:`wwwwwwwwwwwww
w...w...w..xw
w...w.E.Y...w
w...w..6w...w
wwwwwwwwwwwww
w...w...w...w
w..1w..hw...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w.EAw...wu..w
w...w..fw...w
wwwwwwwwwwwww`,r2_6_19:`wwwwwwwwwwwww
w...w...wu..w
w.EAw...w...w
w...w.f.w...w
wwwwwwwwwwwww
w...w...w...w
w...w..Ew...w
w...w..5w...w
wwwwwwVwwwwww
w.6.w...w...w
w...w...wb..w
w...w.x.w...w
wwwwwwwwwwwww`,r2_6_2:`wwwwwwwwwwwww
w...w...w.5.w
w...w...w.G.w
w.GAw...w...w
wwwwwwwwwwwVw
w.u.w...w...w
w...w...w...w
w...w...wx..w
wwwwwwwwwwwww
w...w..2w...w
w...w...w...w
wc..w...w.h.w
wwwwwwwwwwwww`,r2_6_20:`wwwwwwwwwwwww
w.G.w.e.wG.6w
w...w...w...w
w..Aw...w...w
wwwwwwwwwwwYw
w...w...w...w
w...w...wx..w
w...w.s.w...w
wwwwwwwwwwwww
w.h.w..4w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_6_21:`wwwwwwwwwwwww
wg..w...w...w
w...w..bw..Ew
w...w...w.A.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w..1w
wwwwwwwwwwwww
w.r.w.E.w.x.w
w...w6..Y...w
w...w...w...w
wwwwwwwwwwwww`,r2_6_22:`wwwwwwwwwwwww
w...w...w...w
w...w2..w...w
w...w...w.h.w
wwwwwwwwwwwww
w...w.x.wF.Aw
w...S...w...w
wF.3w...w...w
wwwwwwwwwwwww
w...w.q.w.c.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_6_25:`wwwwwwwwwwwww
w...w...w.g.w
w...wC..w...w
w...w..4w...w
wwwwwwUwwwwww
w...w...w...w
w.b.wx..w.5.w
w...w...w...w
wwwwwwwwwwwww
wq..w...w...w
w...w...wC..w
w...w...w.A.w
wwwwwwwwwwwww`,r2_6_4:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w..ew.6.w
wwwwwwwwwwwww
wC..R...w...w
w..2wx..w...w
w...w...w..uw
wwwwwwwwwwwww
w...w...w...w
w...w...wAC.w
w.g.w...w...w
wwwwwwwwwwwww`,r2_6_5:`wwwwwwwwwwwww
w...S...w.A.w
w.C.w.x.w.C.w
w..3w...w...w
wwwwwwwwwwwww
w...w2..w...w
w...w...w...w
w...w...w..yw
wwwwwwwwwwwww
w.h.w...w..bw
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r2_6_6:`wwwwwwwwwwwww
w...Q.x.wA.Fw
w.F1w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.v.w...w...w
wwwwwwwwwwwww
w...w...w...w
wc..w...w3..w
w...w.h.w...w
wwwwwwwwwwwww`,r2_6_8:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wh..w..4w...w
wwwwwwwwwwwww
w..Aw...w..gw
w...wr..w...w
w.F.w...w...w
wwwwwwwwwwwww
w.5.w...w...w
w...w.x.w...w
wF..V...w...w
wwwwwwwwwwwww`,r2_7_11:`wwwwwwwwwwwww
w...w..3w...w
w...wA..w5..w
w...w...S...w
wwwwwwwwwwwVw
w...Q...w...w
w...w...w...w
w...w..ew.x.w
wwwwwwwwwwwww
w..cw...w...w
w...w...w...w
w...w...wq..w
wwwwwwwwwwwww`,r2_7_13:`wwwwwwwwwwwww
w...w...w6A.w
w..ywh..w...w
w...w...w...w
wwwwwwwwwYwww
w...w...w...w
w...Q...w...w
w...w...w4..w
wwwwwwwwwwwUw
w...w...w...w
w...w..gwx..w
w...w...w...w
wwwwwwwwwwwww`,r2_7_16:`wwwwwwwwwwwww
w.e.w...S..4w
w...w.A.w...w
w...w.3.w...w
wRwwwwwwwwwUw
w...w...w...w
w...w...w...w
w...w...wx..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...wv..wh..w
wwwwwwwwwwwww`,r2_7_19:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...wf..w...w
wwwwwwwQwwwww
w...w...w..xw
w...w...w...w
w...w..ew...w
wwwwwwwwwwwRw
ws..w...Y...w
w...w...w...w
w...w6A.w..2w
wwwwwwwwwwwww`,r2_7_7:`wwwwwwwwwwwww
w...w...w...w
w...w...Yq..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wA..V...w...w
w..5w..4w..cw
wwwwwUwwwwwww
w...w...w...w
wb..w...w...w
w...wx..w...w
wwwwwwwwwwwww`,r2_7_8:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.s.w...w
wwwwwwwwwwwww
w..2w...w...w
w...w...w...w
w.A.we..w...w
wRwwwwwwwVwww
w...U...w..cw
w4..w...w...w
w...w..xw...w
wwwwwwwwwwwww`,r2_7_9:`wwwwwwwwwwwww
w...w...wu..w
w..gw...w...w
w...w...w...w
wwwwwwwwwwwww
w...R...w6.Aw
w.f.w...w...w
w...w...w...w
wwwwwwwwwYwww
w...wx..U...w
w...w...w..4w
w...w...w...w
wwwwwwwwwwwww`,r2_8_13:`wwwwwwwwwwwww
w...w...V...w
w...wA..w...w
w..6w5..w.r.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...wx..w
wwwwwUwwwwwww
w...w...w...w
w...Q...w...w
w..uw...w...w
wwwwwwwwwwwww`,r2_8_18:`wwwwwwwwwwwww
w...R...w...w
w2.Aw..sw.x.w
w...w...w...w
wwwwwwwwwwwww
w...w..3w...w
w...w...V...w
w...w...w...w
wwwwwwwwwwYww
w...w...w...w
w...w...wv..w
w...w...w...w
wwwwwwwwwwwww`,r2_8_19:`wwwwwwwwwwwww
w...w...w...w
w...w..2w...w
w...w...w...w
wYwwwwwwwwwww
w...Q...wA..w
w...w...w...w
w...w.y.w4..w
wwwwwwwwwwwUw
w...w...w...w
w...w.x.wr..w
w...w...w...w
wwwwwwwwwwwww`,r2_8_20:`wwwwwwwwwwwww
w...w...w...w
w..vw..xw...w
w...w...w...w
wwwVwwwwwwwww
w...w...w...w
wA5.w...w...w
w...w...w...w
wwwwwwwwwwQww
w...w...w...w
w...w..rR.4.w
w...w...w...w
wwwwwwwwwwwww`,r2_8_24:`wwwwwwwwwwwww
w...w...w...w
w...w.A.S...w
w...w.3.w.y.w
wwwwwwwwwwwww
w...w...w..xw
w...U...w...w
w...w...w...w
wwwwwVwwwwwww
w2..w...w...w
w...w...w...w
w...w..qw...w
wwwwwwwwwwwww`,r2_8_5:`wwwwwwwwwwwww
w...w...w...w
w...w...w2..w
w...w...w...w
wwYSwwwwwwwww
w...w...w..Aw
w...w...w...w
w...w...w1..w
wwwwwwwwwwwQw
w.y.wx..w...w
w...w...w...w
w...w...wu..w
wwwwwwwwwwwww`,r2_8_9:`wwwwwwwwwwwww
w...w...w...w
w..4w...ws..w
w...w..xw...w
wVwwwwwwwwwRw
w...w...wA..w
w...w...w.2.w
w...w...w...w
wwwwwwwwwwwww
w...w.u.w...w
w...w...S...w
w...w...w...w
wwwwwwwwwwwww`,r2_9_19:`wwwwwwwwwwwww
w.A.wF..wr..w
w...wx..w...w
wu..w...w...w
wwwwwwwwwwwww
w...w...w...w
wF..w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wg..w...w...w
w...w6..wb..w
wwwwwwwwwwwww`,r2_9_23:`wwwwwwwwwwwww
w...w...w...w
w...w.x.w...w
w.b.wF..w...w
wwwwwwwwwwwww
w...w..ew...w
w...w...wu..w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w.2.wA..w...w
w...w..vw..Fw
wwwwwwwwwwwww`,r2_9_25:`wwwwwwwwwwwww
w...w...w...w
w...w..vw...w
wf..wA..w..Ew
wwwwwwwwwwwww
w...w...w...w
w...wE..w.5.w
w...w..xw...w
wwwwwwwwwwwww
w...w...w...w
w...w..sw...w
wg..w...w...w
wwwwwwwwwwwww`,r2_9_5:`wwwwwwwwwwwww
wA..w...w..Bw
w...w.h.wx..w
w.q.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w5..w...w
w.B.w...w...w
wwwwwwwwwwwww
w...w.y.w...w
w...w...w...w
w...w...we..w
wwwwwwwwwwwww`,r3_10_1:`wwwwwwwwwwwww
wc..w...w...w
w...w...w...w
w...wg..w...w
wwwwwwwwwwwww
w...U.4.w...w
w..1wA..w...w
w...w...w...w
wQwwwwwwwwYww
w...w..xw...w
w..qw...w.3.w
w...w...w...w
wwwwwwwwwwwww`,r3_10_16:`wwwwwwwwwwwww
w...w...w...w
w...Y...wb..w
w...w...w...w
wwwwwwwwwwwww
w...w..Aw...w
wx..w...w...w
w...w5..w..4w
wwwwwwVwwwwww
w.v.w...w...w
w...Q..1wf..w
w...w...w...w
wwwwwwwwwwwww`,r3_10_19:`wwwwwwwwwwwww
w...w...w...w
wg..w...w...w
w...w...w.3.w
wwwwwwwwwwwww
w...w...w2..w
w...w5..wA..w
wq..V...R...w
wwwwwwwwwwwww
w.x.w...w...w
w...w...w...w
w...w..fU...w
wwwwwwwwwwwww`,r3_10_2:`wwwwwwwwwwwww
w...wf..w..hw
w...w...w...w
w...w...V...w
wwwwwwwwwwwww
w...S...w.4.w
w.6.w...w...w
w...wA.3w...w
wYwwwwwwwwwww
w...wx..w...w
w..rw...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_10_3:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...w.c.w
wwwwwwwwwwwww
w...w...V...w
w1..w...w...w
w..Awg..w.4.w
wwQwwwwwwwwww
w...R...w...w
w...w..qw...w
w2..w...w.x.w
wwwwwwwwwwwww`,r3_11_11:`wwwwwwwwwwwww
w...w...w...w
w...w.x.wq..w
w...w...w...w
wwwwwwwwwwwww
w...w...w..uw
w...w...w...w
we..w..gw...w
wwwwwwwwwwwww
w..5w...wA.yw
w...ws..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_11_15:`wwwwwwwwwwwww
w...w...w...w
wc..w...wv..w
w...w.x.w...w
wwwwwwwwwwwww
wg..w...w.u.w
w...w.3.w...w
w...w...w...w
wwwwwwwwwwwww
w.y.w...w.r.w
w...w...wA..w
w...w...w...w
wwwwwwwwwwwww`,r3_11_21:`wwwwwwwwwwwww
w...w...wv..w
w...wu..w...w
wx..w...w...w
wwwwwwwwwwwww
w...w...w..rw
w.6.w...wA..w
w...w.g.w...w
wwwwwwwwwwwww
w...w...w.y.w
w...wf..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_11_4:`wwwwwwwwwwwww
w..Aw.e.w.2.w
w...w...w...w
w.q.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.s.w...w.f.w
wwwwwwwwwwwww
w...w...w...w
w..vw..xwy..w
w...w...w...w
wwwwwwwwwwwww`,r3_11_9:`wwwwwwwwwwwww
w...wr..w...w
we..w...w...w
w...w...w...w
wwwwwwwwwwwww
w..fw4..w..xw
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.q.w
w...w..uw...w
wA.yw...w...w
wwwwwwwwwwwww`,r3_12_12:`wwwwwwwwwwwww
w..4w...w...w
w...w...w...w
w...w..cw.6.w
wwwwwwwwwwwww
wA..w.x.w...w
w...w..Bw...w
ws..w...w...w
wwwwwwwwwwwww
w...w...w...w
w...R...w.3.w
w..2w..Bw...w
wwwwwwwwwwwww`,r3_12_16:`wwwwwwwwwwwww
w...w.A.wx..w
w.4.wr..w...w
w...w...w.H.w
wUwwwwwwwwwww
w..Hw...w...w
w...w..6w...w
w...w...w.5.w
wwwwwwwwwwwww
w...w...w...w
w..ew...w...w
w...w...w..1w
wwwwwwwwwwwww`,r3_12_4:`wwwwwwwwwwwww
w...w...w.b.w
w...w...w...w
w..5w...w...w
wwwwwwwwwwwww
w..4w...w...w
w...w.Fxw...w
w...w...w6..w
wwwwwwwwwwwww
w...w2..w...w
w..vw...wF..w
w.A.w...R...w
wwwwwwwwwwwww`,r3_13_1:`wwwwwwwwwwwww
w...w...w...w
w..sw.H.w3..w
w.A.w...w...w
wwwwwwwwwwwww
wv..w5..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwQw
w.CHw.C.w...w
w...w..xw...w
w...w...w...w
wwwwwwwwwwwww`,r3_13_7:`wwwwwwwwwwwww
w...w...wu..w
w...Y...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..Cw.C.w.1.w
w.B.w.x.w...w
wwwwwwwwwwwww
w...wB..w...w
w..yw...w...w
w.A.w...w.3.w
wwwwwwwwwwwww`,r3_14_10:`wwwwwwwwwwwww
w...S...w...w
w...w...w...w
w.x.w..3w...w
wwwwwwVwwwRYw
w...w...w...w
wA..w5.Fw...w
wF..w...w...w
wwwwwwwwwwwww
w...w...w4..w
w...ws..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_14_16:`wwwwwwwwwwwww
w...Y..xw...w
w..6w...w...w
w...w...w...w
wSwwwwwwwRwww
w...w...w...w
w...w...Q...w
w3.Gw...w...w
wwwwwwwwwwwww
w...w...w..sw
w..Aw...w...w
w.G.w.4.w...w
wwwwwwwwwwwww`,r3_15_5:`wwwwwwwwwwwww
w...w...w...w
w...Q...wu..w
w...w...w...w
wwwwwwwwwwwww
w..Bw...w...w
w...w...w...w
w..Aw.4.wx..w
wwwwwwwwwwwww
w...w...S.r.w
w.6.w.B.w...w
w...w3..w...w
wwwwwwwwwwwww`,r3_15_9:`wwwwwwwwwwwww
w...w...S...w
w...w...w...w
w..6w...w...w
wwwwwwwwwwwww
w...w...w...w
w...Q...w...w
w.s.w1E.w..yw
wwwwwwwwwwwww
w..xwE..w...w
w...w..Aw.4.w
w...w...w...w
wwwwwwwwwwwww`,r3_16_20:`wwwwwwwwwwwww
w...w...w...w
w..vw...w...w
w...w.A1w...w
wwUwwQwwwwwww
w...w.F.wF..w
w...w...w..6w
w...w...w...w
wVwwwwwwwYwww
w...w...w...w
w...wy..w...w
w...w...w..xw
wwwwwwwwwwwww`,r3_17_17:`wwwwwwwwwwwww
w...w..rw...w
w...w.A.w...w
w1..w...w.u.w
wwwwwwwwwwwww
w...w...w...w
w...wx..w...w
w...w...V..5w
wwURwwwwwwwww
w...w...w...w
w...w...w...w
w...w..6w...w
wwwwwwwwwwwww`,r3_18_9:`wwwwwwwwwwwww
w..cw...Q...w
w...w...w...w
w...w..xw.1.w
wwwwwwwwwwwRw
w...w...S...w
w...w.A.w2..w
w...w.3.w...w
wwwwwwwwwwwww
w...w...w4..w
w...w...w...w
w..yw..rw...w
wwwwwwwwwwwww`,r3_19_24:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...Y..rw
wwwwwwwwwwwww
w...w...w...w
w...R...wA..w
w...w..4wC..w
wwwwwwwwwwwww
w...w...w...w
w..xw...wq..w
w...wv..w..Cw
wwwwwwwwwwwww`,r3_20_23:`wwwwwwwwwwwww
w...U...S...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w.H.w
w..Hw.b.w...w
wu..w...w.A.w
wwwwwwwwwwwww
w.2.R...w...w
w...wx..we..w
w...w...w...w
wwwwwwwwwwwww`,r3_2_1:`wwwwwwwwwwwww
w...U...wx..w
w...w...w...w
w...w...w.F.w
wwwVwwwwwwwww
w...wA..w.H3w
w...wH..w...w
w...w...w...w
wwQwwwwwwwSww
w...w...w..Fw
w...w...w...w
w...Y...w...w
wwwwwwwwwwwww`,r3_2_12:`wwwwwwwwwwwww
w...w..Ew...w
w...w...Y.B.w
w...w.6.w...w
wwwwwwwwwwwww
w.xBw...w...w
w...wE..w...w
w...w.A.w...w
wwwwwwwwwwUSw
w...V...w...w
w...w...w...w
w...R...w...w
wwwwwwwwwwwww`,r3_2_13:`wwwwwwwwwwwww
w...w.C.w...w
w...w.4.w...w
w...w...w...w
wwwwwUwwwwwww
w.G.w..Gw..Aw
wx..w...w.C.w
w...w...w...w
wwwwwwwwwwwww
w...Q...Y...w
w...R...w...w
w...S...w...w
wwwwwwwwwwwww`,r3_2_14:`wwwwwwwwwwwww
w...w...w...w
w...wx..w...w
w...wG..w...w
wRYwwwwwwwwww
w...w...w...w
w...w.B.V...w
w...w..5wG..w
wUSwwwwwwwwww
w...w...w...w
w...wA.Bw...w
w...w...w...w
wwwwwwwwwwwww`,r3_2_18:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...wG.4w...w
wVwwwwUwwwwww
w...w...w...w
w...w...w...w
w...w..Bw...w
wQYSwwwwwwwww
w...w...w.x.w
w...wA.GwB..w
w...w...w...w
wwwwwwwwwwwww`,r3_2_2:`wwwwwwwwwwwww
w...w...w.x.w
w...w...wE..w
w...w...w...w
wwwSwVwwwwwww
w...Y...w..2w
w...w...w..Fw
w...w...w...w
wwwwwUwwwRwww
w...w...w...w
w.A.w...w...w
w..Fw...wE..w
wwwwwwwwwwwww`,r3_2_22:`wwwwwwwwwwwww
w..xw...w...w
w..Ew...wC..w
w...w...wA..w
wwwwwRwwwwwww
w...V...w...w
w...Q...w...w
w...w...w...w
wwwwwwwwwwwYw
w.C.U...w...w
w...wE..w...w
w4..w...w...w
wwwwwwwwwwwww`,r3_2_23:`wwwwwwwwwwwww
w...w...Q...w
w.A.w...w...w
wC..w...V...w
wwwwwwwwwwwUw
w.6.w.B.w...w
w...Y...w...w
w.C.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...R...wx..w
w...w...w..Bw
wwwwwwwwwwwww`,r3_2_24:`wwwwwwwwwwwww
w...S...w...w
w..3w...w...w
wC..w.E.w.CAw
wwwwwwwwwwwww
w...w...V...w
w...U...R...w
w...w...w...w
wYwwwwwwwwwww
w...w..xw...w
w...w..Ew...w
w...w...w...w
wwwwwwwwwwwww`,r3_2_25:`wwwwwwwwwwwww
w...w...w...w
w...w...wG.Aw
w...S...w...w
wUwwwwwwwwwww
w...w5..w...w
w...w.G.w..Fw
w...w...wx..w
wRQwwwVwwwwww
w...w...w...w
w...w..Fw...w
w...w...w...w
wwwwwwwwwwwww`,r3_2_4:`wwwwwwwwwwwww
w...U...w...w
w...w...w.B.w
w...w...w..xw
wYwSwwwwwwwww
w...wA..w...w
w...w...w...w
w...w.E.w...w
wwwwwwwwwwwRw
w5..V..Bw...w
w...w...w...w
w..Ew...w...w
wwwwwwwwwwwww`,r3_2_5:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w...Q...w
wwwSwwwwwwwww
w...w...w.5.w
w...Y...w...w
w...U...w..Bw
wwwwwwwwwVwww
w..Aw.x.w...w
wB..w..Hw..Hw
w...w...w...w
wwwwwwwwwwwww`,r3_2_7:`wwwwwwwwwwwww
w...w...wA..w
w...w...w...w
w...Y...w.H.w
wwwwwwwwwwwww
w...wF..w...w
wH..w...w...w
w.2.w.x.w...w
wwwRwwwwwwSQw
w...w...U...w
w..Fw...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_2_9:`wwwwwwwwwwwww
w...w...w...w
w.C.w...S...w
w.A.w...w...w
wwwwwwwwwwwww
w...V...w2..w
w...w...w...w
w...U...w.C.w
wwYwwwwwwRwww
w...w.xGw...w
w...w...w...w
w...w...wG..w
wwwwwwwwwwwww`,r3_3_1:`wwwwwwwwwwwww
w...w...wy..w
w...w...w...w
w..6w.v.w...w
wwwwwwwwwwwww
w...w...wx..w
w...w...w...w
w..ew...w...w
wwwwwwwwwwwww
w.2.R...w..sw
w...w...w...w
w.A.w..uw...w
wwwwwwwwwwwww`,r3_3_10:`wwwwwwwwwwwww
w..vw...w5..w
w...wx..w...w
w...w...w...w
wwwwwwwwwwwww
wu..w...w.q.w
w...w...w...w
w...w.s.w...w
wwwRwwwwwwwww
w.2.w...w...w
w..Aw..cw...w
w...w...w...w
wwwwwwwwwwwww`,r3_3_14:`wwwwwwwwwwwww
w..sw..hw...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...S.A.wq..w
w.r.w.3.w...w
wwwwwwwwwwwww
w...w...w...w
w..uw...w.4.w
w...w.x.w...w
wwwwwwwwwwwww`,r3_3_19:`wwwwwwwwwwwww
w...w...w...w
w..bw6..w...w
w...w...w...w
wwwwwwwwwwwww
w...w..5w.s.w
w...w...w...w
w.x.wA..w...w
wwwwwwVwwwwww
wr..w...w...w
w...w...wy..w
w...wv..w...w
wwwwwwwwwwwww`,r3_3_2:`wwwwwwwwwwwww
w...w...w..ew
w...wq..w...w
w...w...w...w
wwwwwwwwwwwww
w...w.2.w3..w
w.x.w.A.w...w
w...w...w...w
wwwwwRwwwwwww
w.u.w...w.s.w
w...wr..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_3_20:`wwwwwwwwwwwww
w...w...wy..w
w...w...w...w
w.6.w...w...w
wwwwwwwwwwwww
w...w...w..1w
w.e.w...w...w
w...w.u.w.A.w
wwwwwwwwwwwQw
w..xw...w...w
w...ws..w...w
w...w...wv..w
wwwwwwwwwwwww`,r3_3_23:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.g.w..1w...w
wwwwwwwwwwwww
w...wA..w..uw
w...w..3w...w
w.v.S...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..qw..xwr..w
wwwwwwwwwwwww`,r3_3_4:`wwwwwwwwwwwww
w..qw...w...w
w...w...w...w
w...w...w.f.w
wwwwwwwwwwwww
w...w.3.S...w
w...w...w...w
w5..w..Aw..yw
wwwwwwwwwwwww
w...w..xw...w
w..uw...w...w
w...w...wv..w
wwwwwwwwwwwww`,r3_3_5:`wwwwwwwwwwwww
w...w...V...w
w..sw...w...w
w...w.5Aw.y.w
wwwwwwwwwwwww
w...w...w...w
w...w.4.w...w
w...w...w..qw
wwwwwwwwwwwww
wf..w...w.x.w
w...w...w...w
w...w..uw...w
wwwwwwwwwwwww`,r3_3_6:`wwwwwwwwwwwww
w...w...w3..w
w...wv..w.A.w
w.s.w...S...w
wwwwwwwwwwwww
w...w...w...w
w.x.w...w...w
w...w...w..qw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.e.w..rw.4.w
wwwwwwwwwwwww`,r3_3_8:`wwwwwwwwwwwww
w3..S..sw...w
w.A.w...w...w
w...w...w..vw
wwwwwwwwwwwww
w...w.y.w...w
w...w...w..xw
w..gw...w...w
wwwwwwwwwwwww
w...w...w..uw
w...w...w...w
w2..w...w...w
wwwwwwwwwwwww`,r3_3_9:`wwwwwwwwwwwww
w...w...wr..w
w...w...w...w
w...w..xw...w
wwwwwwwwwwwww
w...w...w..uw
w...w.1.w...w
w..fw...w...w
wwwwwwwwwwwVw
w...w...w5..w
w...ws..w...w
w..vw...w.A.w
wwwwwwwwwwwww`,r3_4_11:`wwwwwwwwwwwww
w...w...wu..w
w..4w...w...w
w...w.2.w...w
wwwwwwwRwwwQw
w...w...w...w
w...w..xwA..w
w...w...w.1.w
wwwwwwwwwwwww
w...w...w..5w
w..yw.3.w...w
w...w...w...w
wwwwwwwwwwwww`,r3_4_13:`wwwwwwwwwwwww
w...w...w...w
w..6w...w...w
w...w...w..2w
wwwwwwwwwwwww
w...w...w...w
w...w..uw..Aw
w5..w...w..3w
wwwwwwwwwwSww
w..xw.4.w...w
w...w...w...w
w...U...wr..w
wwwwwwwwwwwww`,r3_4_14:`wwwwwwwwwwwww
w...w...wA..w
w...w.4.w...w
w...w...w..1w
wwwwwwwwwwQww
w...w...w...w
w..3w...w...w
w...w.6.w..vw
wwwwwwwwwwwww
w.s.w...w...w
w...w...w.5.w
w...w.x.V...w
wwwwwwwwwwwww`,r3_4_16:`wwwwwwwwwwwww
w1..w...w...w
w...w...w2..w
w...w...w...w
wwwwwwwwwwwww
w...Y..xw...w
w...w...w.3.w
w.6.w...w...w
wwwwwwwwwwwww
wu..w.4.w..rw
w...U..Aw...w
w...w...w...w
wwwwwwwwwwwww`,r3_4_2:`wwwwwwwwwwwww
w..qw...U...w
w...w..4w...w
w...w...w.x.w
wYwwwwwwwwwww
w...w..5w.3.w
w.A6w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..2w...w
w...w...wu..w
wwwwwwwwwwwww`,r3_4_20:`wwwwwwwwwwwww
w...w3..w...w
w..4w...w1..w
w...w...w...w
wwwwwwwwwwwww
w...V...w...w
w..5w...wy..w
w...w..xw...w
wwwwwwwwwwwww
wr..Y..Aw...w
w...w..6w...w
w...w...w...w
wwwwwwwwwwwww`,r3_4_21:`wwwwwwwwwwwww
w...w.2.ws..w
w...w...w...w
w.1.w...w...w
wwwwwwRwwwVww
w...w...w..Aw
w...w...w..5w
w...w..xw...w
wwwwwwwwwwwww
wr..w...w...w
w...w...w...w
w...w4..w6..w
wwwwwwwwwwwww`,r3_4_22:`wwwwwwwwwwwww
w...w...w...w
w...wA..w...w
wv..w5..V..qw
wwwwwwwwwwwww
w...w...w...w
w.6.w...w...w
w...w...w4..w
wwwwwwwwwwwUw
w...w...w...w
w.2.w...w...w
w...w..1w.x.w
wwwwwwwwwwwww`,r3_4_23:`wwwwwwwwwwwww
w..xw.6.w...w
w...w...w..1w
w...w...w...w
wUwwwwwwwwwww
w...w...w..3w
w..4w...w...w
w...w.v.w...w
wwwwwwwwwwwww
wr..w.2.w...w
w...R...w...w
w...w.A.w...w
wwwwwwwwwwwww`,r3_4_24:`wwwwwwwwwwwww
w...w.x.S...w
w...w...w...w
w.4.w...w3..w
wwwwwwwwwwwww
w...w.A.R.s.w
w..6w..2w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w..vw.5.w...w
w...w...w...w
wwwwwwwwwwwww`,r3_4_25:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w2..w.u.w...w
wwwwwwwwwwwww
w...w...wA..w
w...w.6.w.3.w
w1..w...w...w
wwwwwwwwwwSww
w...w...w...w
wx..w...wq..w
w...V.5.w...w
wwwwwwwwwwwww`,r3_4_3:`wwwwwwwwwwwww
w4..w...w...w
w...w...w...w
w...w...w3..w
wwwwwwwwwwwww
w...w.x.w..Aw
w.5.w...w6..w
w...w...w...w
wwwwwwwRwwwYw
ws..w...w...w
w...w...w...w
w...w2..wy..w
wwwwwwwwwwwww`,r3_4_5:`wwwwwwwwwwwww
w...w...w..4w
w..1w..xw...w
w...Q...w...w
wwwwwwwwwwwww
w.y.w...w...w
w...w...w2..w
w...w...w...w
wwwVwwwwwwwww
w...w...w..sw
w..Aw...w...w
w5..w6..w...w
wwwwwwwwwwwww`,r3_4_7:`wwwwwwwwwwwww
w...w...w.2.w
w...w3..w...w
wr..w...w...w
wwwwwwwwwwwww
w1..w...w5..w
w...w..xw...w
w...w...V...w
wwwwwwwwwwwww
w...w...Y.q.w
w...wA..w...w
w...w..6w...w
wwwwwwwwwwwww`,r3_4_8:`wwwwwwwwwwwww
w...wy..w.A.w
w...w...w.3.w
w...w...w...w
wwwwwwwwwSwww
w.2.w.5.w...w
w...w...w...w
w...w...w.v.w
wwwwwwwwwwwww
w...w...Q...w
w4..w..xw...w
w...w...w1..w
wwwwwwwwwwwww`,r3_4_9:`wwwwwwwwwwwww
w...w.x.w...w
w...w...R...w
w.5.w...w.2.w
wwwwwwwwwwwww
w.4.w.3.w..qw
w...w...w...w
w...w...w...w
wwwwwwwwwYwww
w.s.w...w.A.w
w...w...w...w
w...w...w6..w
wwwwwwwwwwwww`,r3_5_1:`wwwwwwwwwwwww
w...w...w.E.w
w...w...w...w
w...w...w.r.w
wwwwwwwwwwwww
wg..U...w...w
w...w...w...w
w...w1..w.x.w
wwwwwwwwwwwww
w...w...w..Ew
w.h.wA.sw...w
w...w...w...w
wwwwwwwwwwwww`,r3_5_10:`wwwwwwwwwwwww
w...w...w...w
w...w.f.w...w
w.e.w...w.4.w
wwwwwwVwwwwww
w.C.w...w...w
w...w...w...w
w.y.w...w...w
wwwwwwwwwwwww
w...w.A.w..Cw
w...w..sw...w
wx..w...w...w
wwwwwwwwwwwww`,r3_5_11:`wwwwwwwwwwwww
w...w...w...w
w...w...w.F.w
w...w...w..rw
wwwwwwwwwwwww
w...w...w...w
wA..w...w...w
w.v.w6..w..xw
wwwwwwwwwwwww
w...w...V...w
w...w...w...w
w.F.w..cw.g.w
wwwwwwwwwwwww`,r3_5_13:`wwwwwwwwwwwww
w...w...w..Aw
w...w..3w...w
w...U...w..qw
wwwwwwwwwwwww
w...w..ew...w
w..Bw...w...w
ws..w...wB..w
wwwwwwwwwwwww
w...w.g.w...w
w...w...w...w
w..xw...w...w
wwwwwwwwwwwww`,r3_5_14:`wwwwwwwwwwwww
w.c.w...w..xw
w...w..uw...w
w...wE..w...w
wwwwwwwwwwwww
wA..w...w...w
w...w...w2..w
w.s.w...w...w
wwwwwwUwwwwww
wE..wh..w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_5_15:`wwwwwwwwwwwww
w..uw...w...w
w...w..Bw...w
w..Aw...w...w
wwwwwwwwwwwww
w1..w...w...w
w...w...w..Bw
w...wh..w.v.w
wwYwwwwwwwwww
w...w...w...w
w...w..fw.x.w
w...w...w...w
wwwwwwwwwwwww`,r3_5_18:`wwwwwwwwwwwww
w...w..rw...w
w...w...w.x.w
wu.Aw..Bw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wB..w...w...w
wwwwwRwwwwwww
w...w..5w...w
w..gw...w...w
w...w...wc..w
wwwwwwwwwwwww`,r3_5_19:`wwwwwwwwwwwww
w2..w...w...w
w...w...w...w
w...w...w...w
wwwwwwwVwwwww
w...w...w..Bw
w...w..gw...w
wu.Aw...w..rw
wwwwwwwwwwwww
w..Bw...w...w
w...wh..w...w
w...w...wx..w
wwwwwwwwwwwww`,r3_5_21:`wwwwwwwwwwwww
w..yw.H.w...w
w...w...w...w
w.A.w...w...w
wwwwwwwwwwwww
wf..w...w...w
w...w...wb..w
w...w...w...w
wwYwwwwwwwwww
w...w.H.w...w
w..1w..uw..xw
w...w...w...w
wwwwwwwwwwwww`,r3_5_22:`wwwwwwwwwwwww
w...w...wE..w
w...w...w...w
w...w..hw.s.w
wwwRwwwwwwwww
w...w...w...w
w..3w...w.x.w
w...w...w...w
wwwwwwwwwwwww
w.A.w...w...w
w...w...w...w
w..qw.E.wb..w
wwwwwwwwwwwww`,r3_5_23:`wwwwwwwwwwwww
wA.rw..Fw...w
w...w...w...w
w...w...w..cw
wwwwwwwwwwwww
w...w...w...w
w..gw.2.Q...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w..uw...w
w...wF..wx..w
wwwwwwwwwwwww`,r3_5_25:`wwwwwwwwwwwww
w...w...w..Aw
w...w...w...w
w.b.w...w..qw
wwwwwwwwwwwww
w...w...wC..w
w..Cw...w...w
w.y.w...w...w
wwwwwwwwwwwww
w...w...Y.2.w
w.x.w...w...w
w...wf..w...w
wwwwwwwwwwwww`,r3_5_3:`wwwwwwwwwwwww
w..rw...w...w
w...w..xw.A.w
wF..w...w..qw
wwwwwwwwwwwww
w..ew...w...w
w...w.1.w..Fw
w...w...w...w
wwwwwRwwwwwww
w...w...w...w
w...wg..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_5_5:`wwwwwwwwwwwww
w.G.w...w...w
w..vw...w...w
w...w..xw...w
wwwwwwwwwwwww
w...w...w...w
w..Awc..w...w
w.q.w...we..w
wwwwwwVwwwwww
wG..w...w...w
w...w...w.1.w
w...w...w...w
wwwwwwwwwwwww`,r3_5_7:`wwwwwwwwwwwww
w...w...w...w
w...w..cwE..w
w...w...w..uw
wwwUwwwwwwwww
w..fw...w...w
w...w.5.w.x.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...wE..w...w
wA.sw...w...w
wwwwwwwwwwwww`,r3_6_1:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.q.w...w...w
wwwwwSwwwwwww
w...w...w...w
w.G.w.6.w...w
w.x.w...w..sw
wwwwwwwwwwwww
w...w...w...w
w.A.w..vw.G.w
w.5.V...w...w
wwwwwwwwwwwww`,r3_6_11:`wwwwwwwwwwwww
w...w..2w...w
w...Y...w...w
w...w...w.Gxw
wwwwwwwwwwwww
w...w...w...w
w..sw...S...w
w...w.3Aw.r.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..vw...w..Gw
wwwwwwwwwwwww`,r3_6_12:`wwwwwwwwwwwww
w...w...w...w
wC.xwC..wv..w
w...w...w...w
wwwwwwwwwVwww
w...w...w...w
w...w...w5A.w
w.y.w...w...w
wwwwwQwwwwwww
w.u.w...w..6w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_6_15:`wwwwwwwwwwwww
w..uw...w...w
w...w.C.w..xw
w...w...wC..w
wwRwwwwwwwwww
w...w...w...w
w.2.w...V...w
wA..w...w...w
wwwwwwwwwwwww
w.v.w..6w.q.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_6_16:`wwwwwwwwwwwww
w...w2..R...w
w...w.A.w...w
w...w...w.r.w
wwwwwwwwwwwww
w...V...wC..w
w...w1..w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w.xCw
w..uws..w...w
wwwwwwwwwwwww`,r3_6_18:`wwwwwwwwwwwww
w...w...wH..w
w...wv..w...w
w...w...w...w
wwwwwwwwwwwww
w..xw...w.s.w
wH..w.1.w...w
w...w.A.Q...w
wwwwwwwwwwwww
w...w...w..4w
w...w...w...w
w..qw...Y...w
wwwwwwwwwwwww`,r3_6_19:`wwwwwwwwwwwww
w4..w..qw..xw
w...w...wG..w
w...w...w...w
wwwwwwwwwwwww
w...w.y.w...w
w...w...wG..w
w...w...w...w
wwYwwwwwwwwww
w...w.A.w..sw
w...w...w...w
w...w5..V...w
wwwwwwwwwwwww`,r3_6_2:`wwwwwwwwwwwww
w...wA..w...w
w...w1..w...w
w...w...Q..yw
wwSwwwwwwwwww
w...w...w...w
w..4w...w..Fw
w...w...w...w
wwwwwwwwwwwww
w...w...w.F.w
w...w...w..xw
w..sw..rw...w
wwwwwwwwwwwww`,r3_6_21:`wwwwwwwwwwwww
w...w...w..Ew
w...Y...w..xw
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w.E.w...w...w
w...w2..w..qw
wwwwwwwwwwwww
w.s.S.3.w..yw
w...wA..w...w
w...w...w...w
wwwwwwwwwwwww`,r3_6_24:`wwwwwwwwwwwww
w...w...wq..w
w...w..Cw...w
w.u.w.x.w...w
wwwwwwwwwwwww
w...w.A.w...w
w..5w...R...w
w...w..2w..rw
wYwwwwwwwwwww
w...w...w...w
w...w...w.C.w
w...w...w...w
wwwwwwwwwwwww`,r3_6_3:`wwwwwwwwwwwww
w.x.w...w...w
w...w...w...w
wF..w...wF..w
wwwwwwwwwwwww
w.q.w..2w..sw
w...w...R...w
w...wA..w...w
wwwwwwwwwwwww
w...w...V.6.w
w..vw...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_6_5:`wwwwwwwwwwwww
w...w.C.wu..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwRw
w.r.w...w...w
w...w...w2..w
w...w...w..Aw
wwwwwwVwwwwww
w...w...w..qw
w..xw.4.w...w
w.C.w...w...w
wwwwwwwwwwwww`,r3_6_7:`wwwwwwwwwwwww
wE..w...wu..w
w...w...w...w
w.x.w...w...w
wwwwwwwUwwwww
w3.Aw...w...w
w...w...w...w
w...w...w1..w
wSwwwwwwwwwww
w...w..Ew.y.w
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww`,r3_7_15:`wwwwwwwwwwwww
w...w..1w...w
w...w...w6..w
w...w...Y...w
wwwwwwwQwwwww
w...w...w..sw
w.2.w..xw.A.w
w...w...w...w
wwwwwwwwwwwww
wg..w..4w...w
w...w...w...w
w...w...w..5w
wwwwwwwwwwwww`,r3_7_18:`wwwwwwwwwwwww
w...w..2w...w
w...w...we..w
w...w...w...w
wwwwwwwwwwwww
w...w...w3..w
w..Aw...w...w
wq..w1..w...w
wwwwwwwwwwwww
w..5w.6.Y...w
w...w...w..xw
w...V...w...w
wwwwwwwwwwwww`,r3_7_2:`wwwwwwwwwwwww
w..xw6..w...w
w...w...R.2.w
w...Y...w...w
wwwwwwwwwwwww
w...w..hw..uw
w...w...w...w
w3..w...wA..w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w4..w..5w
wwwwwwwwwwwww`,r3_7_3:`wwwwwwwwwwwww
w...w5..w.x.w
w...R...V...w
w2..w...w...w
wwwwwwwwwwwww
w.q.w.4.wf..w
w...w...w...w
wA..w...w...w
wwwwwwwwwwwww
w...w.3.w...w
w...w...w...w
w...w...w.1.w
wwwwwwwwwwwww`,r3_8_10:`wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w..4w.g.w
wwwwwwwwwwwww
w.Bxw...w...w
w...w...w.HBw
w...w.u.w...w
wwwwwwwwwwwww
w...w...w...w
w...w..6wE..w
w.HEw...w.A.w
wwwwwwwwwwwww`,r3_8_13:`wwwwwwwwwwwww
w...w...wx..w
w...w..2w...w
w4..w...w.B.w
wwwwwwwwwwwww
w..Fw...wE..w
w...w...w...w
wB..w.s.wF..w
wwwwwwwwwwwww
w..hw..Ew...w
w...w...w...w
w...wA..w...w
wwwwwwwwwwwww`,r3_8_15:`wwwwwwwwwwwww
w..yw...w...w
w...w..Ew...w
w...w..Aw...w
wwwwwwwwwwwww
w...w...w...w
w.h.w.BEw...w
w...w...w.5.w
wwwwwwwwwwwww
wB.Cw...w..Cw
w...w...wx..w
w...w..6w...w
wwwwwwwwwwwww`,r3_8_9:`wwwwwwwwwwwww
w..cw...wq..w
w...wA.Gw...w
w...w...w...w
wwwwwwwwwwwww
w.5.w.B.w..Gw
w...w.E.w..Ew
w...w...w...w
wwwwwwwwwwwww
w...w...w..Bw
w...w...w...w
w...w..4wx..w
wwwwwwwwwwwww`,r3_9_1:`wwwwwwwwwwwww
w..Aw...wh..w
w...w...w...w
w.q.w...w...w
wwwwwQwwwwwww
w...w...w...w
w4..w...w...w
w...w...w..5w
wUwwwwwwwwwww
w...wx..w...w
w...w...w.2.w
w..vw...w...w
wwwwwwwwwwwww`,r3_9_23:`wwwwwwwwwwwww
w..fw2..w1..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wx..w...w...w
w...w...U...w
wwwwwwwwwwwww
w.r.w..5w...w
w...w...wq..w
w...V...w..Aw
wwwwwwwwwwwww`,r3_9_24:`wwwwwwwwwwwww
w...w...w...w
w...U...w.h.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wx..w.2.w..3w
wwwwwwwwwwwww
w.q.V...w...w
w...w5..ws.Aw
w...w...w...w
wwwwwwwwwwwww`,r3_9_5:`wwwwwwwwwwwww
w..qw...S...w
w...w...w...w
w..Aw3..w..vw
wwwwwwwwwwwww
w2..w...w...w
w...w...wx..w
w...w...w...w
wwwwwwwUwwwww
w...w...w.5.w
w...w...w...w
w.g.w...w...w
wwwwwwwwwwwww`,r3_9_9:`wwwwwwwwwwwww
w.x.w...Y...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.r.w..5w...w
w...w...w.1.w
w...w...w...w
wwwSwwwwwwwww
w...w...w.h.w
w.3.wu.Aw...w
w...w...w...w
wwwwwwwwwwwww`,r4_10_6:`wwwwwwwwwwwww
w...w.x.wy..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.q.w.E.w..sw
w...R.2.w...w
w...w...w..Fw
wwwwwwwYwwwww
w...wF..w...w
w1..w..Aw...w
w...wE..w...w
wwwwwwwwwwwww`,r4_10_8:`wwwwwwwwwwwww
w...w.E.w...w
w...w..vw...w
w...w...w..yw
wwwwwwwwwwwww
w...w..Ew...w
w...VA..w.x.w
w...w..Cw...w
wwwwwwwwwwwww
ws..U...w.6.w
w...w...w...w
w...w.C4w...w
wwwwwwwwwwwww`,r4_11_3:`wwwwwwwwwwwww
w...w.x.wr..w
w...w...w...w
w.5.V...w...w
wwwYwwwwwwwww
w...w.A.S...w
wE..wE..w...w
w..6w..1w...w
wwwwwQwwwwwww
w...w...w.y.w
w...w..2w...w
w...w...R...w
wwwwwwwwwwwww`,r4_11_9:`wwwwwwwwwwwww
w...wA..w3..w
w...w...U...w
w.x.w4.Ew...w
wwwRwwwwwwwSw
w...w...w...w
w.2.Y...w...w
w...w6E.w..rw
wwwwwwwwwwwVw
w.q.w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r4_12_1:`wwwwwwwwwwwww
w...w...w...w
w...w...U...w
w.r.w...w...w
wwwwwRwwwwwww
w...w...w...w
w...V..2w..xw
w..5w...w...w
wwwwwwwwwwwww
w.q.w...Q.v.w
w..uw...w...w
w.A.w1..w...w
wwwwwwwwwwwww`,r4_12_6:`wwwwwwwwwwwww
w..qw...w...w
w...w...w.x.w
w...w...w...w
wwwwwwwwwwwww
w...Q...w..sw
w1..w...w...w
w...w...w...w
wUwYwwwwwVwww
w...w.A.w...w
w6..w..uw..5w
w...wr..w...w
wwwwwwwwwwwww`,r4_13_12:`wwwwwwwwwwwww
w..rw...w...w
w...w..sw...w
w...w..Hw...w
wwwwwwwwwwwww
w.4.U...w...w
w...w...w...w
w...w.B.w..yw
wwYwwwwwwwwww
w...V...w...w
w.6Aw...wBx.w
w.5.w.H.w...w
wwwwwwwwwwwww`,r4_14_5:`wwwwwwwwwwwww
w...S...U...w
w..Cw.4.w...w
w..3w...w...w
wwwwwwwwwwwww
w.1.w.x.w..Aw
w...Q...w..Ew
w...w...w..Cw
wwwwwwwwwwwww
w.q.w...w...w
w...w...R...w
w.E.w..hw...w
wwwwwwwwwwwww`,r4_15_4:`wwwwwwwwwwwww
w...ws..w...w
w...w.6.Y.E.w
wq..w..Aw...w
wwwwwwwwwwwVw
w...w...w...w
w...w...w...w
wv..w..gw...w
wwwwwwwwwwwww
w...w.1.w...w
w...w..Ew...w
wx..w...Q...w
wwwwwwwwwwwww`,r4_16_24:`wwwwwwwwwwwww
w..uw..sw...w
w...w...w...w
w...Q...w...w
wwwUwwwwwwwww
w5..w...w.G.w
wA..V...w..Ew
w4..wG..w...w
wwwwwwwwwwwww
w...w...w...w
w..bw...wx.Ew
w...w...w...w
wwwwwwwwwwwww`,r4_17_10:`wwwwwwwwwwwww
w.H.w...w...w
w...Y...w..3w
w6..w...w...w
wwwwwwwwwwwww
w.f.w...w...w
w...w...Q...w
w...w1.Bw.x.w
wwwwwwwwwwwww
w...w.5.w...w
w...wv..w...w
w.H.w.A.V.B.w
wwwwwwwwwwwww`,r4_2_1:`wwwwwwwwwwwww
wB..w...w...w
w..uw...w...w
w...wE..w..qw
wwwwwwwwwwwww
w...w.3Bw...w
w...S...w...w
w.r.w.A.w...w
wwwwwwwVwwwww
w...wF..w.x.w
w.F.w...w.E.w
w...w...w...w
wwwwwwwwwwwww`,r4_2_13:`wwwwwwwwwwwww
w...wA.1w...w
w...w.C.wGx.w
wq..Q...w...w
wwwwwUwwwwwww
w..Ew...w...w
w...w..Ew...w
w...w...w..uw
wwwwwwwwwwwww
w...w..Gw...w
w..vw...w...w
wC..w...w...w
wwwwwwwwwwwww`,r4_2_15:`wwwwwwwwwwwww
w...w..uw...w
w.C.w...w..Cw
wx..w.F.w...w
wwwwwwwwwwwww
ws..w...w...w
w...w...w..Bw
w...w...S...w
wwwwwwwwwwwww
w.B.w...R.y.w
w...w.2Fw...w
w...w..Aw...w
wwwwwwwwwwwww`,r4_2_17:`wwwwwwwwwwwww
w..Bw...ws..w
w...w..xw...w
w...w..Cw...w
wwwwwwwwwwwww
w...w..2w..Ew
w...w.EAw...w
wu..R...w.r.w
wwwwwwwwwwwww
w...w...w...w
w...w...w.C.w
wB..V...w...w
wwwwwwwwwwwww`,r4_2_2:`wwwwwwwwwwwww
w...w..sw.F.w
wB..w.E.w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
wx..wu..w...w
wF..w...wB..w
wwwwwwwwwwUww
w...w..Aw.r.w
w...w5E.V...w
w...w...w...w
wwwwwwwwwwwww`,r4_2_23:`wwwwwwwwwwwww
w..vw...w..Aw
w...w...w..Bw
wB..wG..w4..w
wwwwwwwwwYUww
w...w...w...w
w..Ew...w...w
w...w.r.w.u.w
wwwwwwwwwwwww
w...w...w...w
w...w...wE..w
w...wx.Gw...w
wwwwwwwwwwwww`,r4_2_24:`wwwwwwwwwwwww
w...w...w...w
w...w..yw...w
w...w.F.wE..w
wwwwwwwwwwwww
w...w.q.w...w
w...w...w.x.w
w..Cw...w..Ew
wwwwwwwwwwwww
w.u.wA1.w...w
w...Q...w.C.w
w...U..Fw...w
wwwwwwwwwwwww`,r4_2_25:`wwwwwwwwwwwww
w...wv..w..Hw
w...w...w...w
wGq.w...w...w
wwwwwwwwwwwww
w...w...w.x.w
w..Ew...w..Ew
w...w...w...w
wwwwwwwwwwwww
w...w...wAG.w
w...wu..w...w
w..HY...S.3.w
wwwwwwwwwwwww`,r4_2_3:`wwwwwwwwwwwww
w...wB..w...w
w...Y..Aw...w
w.s.w..6w...w
wwwwwwwwwwwww
wG..w...wF..w
w...w..ywx..w
w...w...w...w
wUwwwwwwwwwww
w..Gw..Bw.F.w
w...w...w...w
w...w..uw...w
wwwwwwwwwwwww`,r4_2_4:`wwwwwwwwwwwww
w...wH.vw.F.w
w...w...w...w
w.u.w...w...w
wwwwwwwwwwwww
w...w...w...w
wB..w...w...w
w...w...w..Bw
wwwwwwSwwwwww
w.r.V..5w...w
w...w..AwFx.w
w...w.H.w...w
wwwwwwwwwwwww`,r4_2_5:`wwwwwwwwwwwww
w...w...R...w
w...wBA.Q...w
wF..w..2w.u.w
wwwwwwwwwwwww
wH..w...w...w
wx..w...w...w
w...w...wF..w
wwwwwwwwwwwww
w...w...w.H.w
w..rwB.sw...w
w...w...w...w
wwwwwwwwwwwww`,r4_2_6:`wwwwwwwwwwwww
w..sw...w...w
w...wE..w...w
wG..w...w.r.w
wwwwwwwwwwwww
w...w...w..Aw
w...w.F.w5..w
w...w...w.G.w
wwwwwwwwwwQVw
wx..wF..w...w
w..Ew...w...w
w...w...wy..w
wwwwwwwwwwwww`,r4_2_7:`wwwwwwwwwwwww
w...wxE.w...w
w..Gw...w...w
wr..w...w...w
wwwwwwwwwwwww
w...w.C.w...w
w..Ew...w...w
w...w...w.s.w
wwwwwwwwwwwww
w...Y...w...w
w..6w..vw...w
wG.AS...w..Cw
wwwwwwwwwwwww`,r4_2_8:`wwwwwwwwwwwww
w...w...w...w
w...wr..w...w
w...w...w.qGw
wwwwwwwwwwwww
w...w.E.w...w
w...w...wC..w
w.E.R...w...w
wwwwwwwwwwwww
ws..w.G.w..xw
w...V...w...w
w...w5.Aw..Cw
wwwwwwwwwwwww`,r4_3_1:`wwwwwwwwwwwww
w..rw...w...w
w...w6..Y...w
wA.3w...w..1w
wwwSwwwwwwQww
w..4w...w.x.w
w...w..vw...w
w...w...w...w
wUwwwwwwwwwww
w...V...w...w
w...w...wy..w
w5..w...w...w
wwwwwwwwwwwww`,r4_3_10:`wwwwwwwwwwwww
w...wq..w...w
w5..w..6w...w
w...wA..Y.1.w
wwwVwwwwwQwww
w...U...w3..w
w...wx..w...w
w..4w...w...w
wwwwwwwwwSwww
w...w...w...w
w..vw...w...w
w...wy..w...w
wwwwwwwwwwwww`,r4_3_11:`wwwwwwwwwwwww
w...w..4U...w
w..1w...w.x.w
w...Q...w...w
wwwwwwwwwwwww
wr..w...w..uw
w.A2w...w...w
w...w...w...w
wRwwwYwwwwwww
w...w...w..sw
w...V..6w...w
w..5w...w...w
wwwwwwwwwwwww`,r4_3_12:`wwwwwwwwwwwww
w5..V...w...w
w...w...w...w
w...w...w.r.w
wwQwwwwwwwwww
w...w...w...w
w...w...w..xw
w..1w.u.w...w
wRwwwwwwwwSww
w..2w...U...w
w...w4..w...w
w.Asw...w3..w
wwwwwwwwwwwww`,r4_3_13:`wwwwwwwwwwwww
wx..w..sw...w
w...w...w...w
w...w...w...w
wSwwwwwwwwwRw
w..3w...w...w
w...w..rw.2.w
w...w...w...w
wwVwwwwwwQwww
w...w...U...w
w...wu4.w.1.w
w.5.w..Aw...w
wwwwwwwwwwwww`,r4_3_14:`wwwwwwwwwwwww
w..qw...w1..w
w...w..5Q...w
w...w...wAv.w
wwwwwwwVwwwww
w...Y...w...w
w...w...w.4.w
w...w.6.w...w
wwwwwwwwwwUww
w...w...w3..w
w...w.x.S...w
w..uw...w...w
wwwwwwwwwwwww`,r4_3_16:`wwwwwwwwwwwww
w..6w...w...w
w...Y...wy..w
w...w...w...w
wwQwwwwwwwwww
w.1.w...w...w
w...w..vw..xw
w...w...w...w
wRwwwwwwwwwVw
w.A.w...S..5w
w2..w.3.w...w
w..uw...w...w
wwwwwwwwwwwww`,r4_3_18:`wwwwwwwwwwwww
w...w..5w2..w
w..xV...w...w
w...w...R...w
wwwwwwwwwwwww
wu..w...w4.yw
w...w...w.A.w
w...w...w...w
wwwwwwwSwUwww
w...w...w...w
w..rw...w...w
w...w.3.Q.1.w
wwwwwwwwwwwww`,r4_3_2:`wwwwwwwwwwwww
w.1.Qx..w...w
w...w...w...w
w...w...w.s.w
wwRwwwwwwwwww
w...w...V...w
w...w...w...w
w2..w.5.w...w
wwwwwwSwwwwww
w6q.Y3..w...w
w...w...w...w
w.A.w...wu..w
wwwwwwwwwwwww`,r4_3_20:`wwwwwwwwwwwww
w...w.1vw...w
w...w...w4..w
w...w..Aw...w
wwwYwwwQwUwww
w...w2..w..5w
w6..R...w...w
w...w...w...w
wwwwwwwwwwwVw
w...w...w...w
w..rw...w...w
w...w..sw..xw
wwwwwwwwwwwww`,r4_3_24:`wwwwwwwwwwwww
w...w...w.4.w
w...w...w...w
w.u.w...U...w
wwwwwwwwwwQww
w...w...w1..w
w...ws..w...w
wx..w...w...w
wwwYwwwwwwwSw
w...w...wA..w
w...w5..w...w
w.6.V...wr.3w
wwwwwwwwwwwww`,r4_3_25:`wwwwwwwwwwwww
w...w...w...w
w...w...w..4w
w.u.w...U...w
wwwwwwwwwQwww
w.x.w...w...w
w...V..5w...w
w...w...w.1.w
wwwwwwYwwSwww
w.v.w.6.w..Aw
w...w...w.3.w
w...w...ws..w
wwwwwwwwwwwww`,r4_3_4:`wwwwwwwwwwwww
w...w..5w.4.w
w...V...w...w
w6..w...UAu.w
wYwwwwwwwwwww
w...w.s.w...w
w...w...w..2w
w...w...w...w
wwwwwwwwwwwRw
wy..w...Q.1.w
w...w...w...w
w...w..xw...w
wwwwwwwwwwwww`,r4_3_5:`wwwwwwwwwwwww
w...wv..wq..w
w...w...w...w
w...w...w...w
wwwYwwwwwwwww
w...wx..V...w
w...w...w...w
w..6w...w5..w
wQwwwwwwwUwww
w...w..2w...w
w...w..rw..4w
w..1R.A.w...w
wwwwwwwwwwwww`,r4_3_6:`wwwwwwwwwwwww
w...w.3.ws..w
w.4.S...w..Aw
w...w...w..6w
wwwUwwwwwwYww
w...w...w...w
w..xw..uw.5.w
w...w...w...w
wwwwwwwwwVwww
w...w...w...w
w..rw...w...w
w...w...R..2w
wwwwwwwwwwwww`,r4_3_7:`wwwwwwwwwwwww
w...w...w...w
w...w2..w...w
w..xw...R...w
wSwwwwVwwwwww
w...w...w.q.w
w3..w...w...w
w...w.5.w...w
wwYwwwwQwwwww
w...w.A.w...w
w.6.w1..w...w
w...ws..wu..w
wwwwwwwwwwwww`,r4_3_8:`wwwwwwwwwwwww
w...w...w...w
w...w..qw...w
w...w...w.x.w
wSwwwwwwwwwVw
w3..w...w.5.w
w...w..rw...w
w...w...w...w
wwRwwwwwwYwww
w2..U4..w6..w
w...w..vw...w
w...w.A.w...w
wwwwwwwwwwwww`,r4_4_1:`wwwwwwwwwwwww
w...wB..w...w
w...w...wq..w
w.u.w...w...w
wwwwwwwwwwwww
w...w...w..yw
w...w...w.A.w
wr.Fw..ES.F.w
wwwwwwwwwwwww
w...w...w...w
w...wB.xw...w
w..Ew...w...w
wwwwwwwwwwwww`,r4_4_10:`wwwwwwwwwwwww
w..rw...wF..w
w...w...w...w
w...w..Gw...w
wwwwwwwwwRwww
wq.Aw...w...w
w...wx..w...w
wH..w..Gw...w
wwwwwwwwwwwww
w...w...w.v.w
w...wF..w...w
wH.uw...w...w
wwwwwwwwwwwww`,r4_4_13:`wwwwwwwwwwwww
w..CwA.qw...w
w...w...w...w
w.r.w.C.w..sw
wwwwwwwwwwwww
w...w...w...w
w...w..Bw...w
w..Fw.x.w..Bw
wwUwwwwwwwwww
w...w...w.u.w
w...w...w...w
w...wF..w...w
wwwwwwwwwwwww`,r4_4_14:`wwwwwwwwwwwww
w...wA.rw...w
w...w...w...w
w...w.B.w..sw
wwwwwYwwwwwww
w...wH..w...w
w...w...w...w
w.v.w...w..Cw
wwwwwwwwwwwww
wC.xw...w...w
w...wB.qw.H.w
w...w...w...w
wwwwwwwwwwwww`,r4_4_16:`wwwwwwwwwwwww
w..vwB..w...w
w...w..rw.E.w
w...w...w...w
wwwwwwwSwwwww
w...w...w...w
wxC.w...w..Cw
w...w...w...w
wwwwwwwwwwwww
w...w...w.q.w
w...wA.sw...w
w..EwB..w...w
wwwwwwwwwwwww`,r4_4_2:`wwwwwwwwwwwww
w...w...w...w
w..Ew...w.x.w
w...w...w.G.w
wUwwwwwwwwwww
w...w...w...w
w...wq..w...w
wHy.w...w..Gw
wwwwwwwwwwwww
w..EwH..w.r.w
w...w..uw...w
w...wA..w...w
wwwwwwwwwwwww`,r4_4_21:`wwwwwwwwwwwww
w...wEA.w...w
w...wq..w...w
wu..w...w...w
wwwwwwwUwwwww
w...w..Cw...w
wF..w...w.x.w
w...w...w.F.w
wwwwwwwwwwwww
w.s.w.E.w...w
w...w...wC..w
w...w..vw...w
wwwwwwwwwwwww`,r4_4_22:`wwwwwwwwwwwww
w...w...Y...w
w...w..sw...w
w...w.H.wC..w
wwwwwwwwwwwww
w...w.x.wG..w
w.C.w...w...w
w...w.G.w...w
wwwwwwwwwwwww
w...w...w.v.w
w..ywA.rw...w
w...wH..w...w
wwwwwwwwwwwww`,r4_4_25:`wwwwwwwwwwwww
w...wA.qw...w
wB..w...w...w
w...w.G.w..yw
wwwwwwwwwwwww
wx..w.r.w.F.w
w...w...w...w
w..Fw...w...w
wwwwwwwwwwwww
w.G.Q..Bw...w
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww`,r4_4_5:`wwwwwwwwwwwww
w...w...w...w
w..rw...wG..w
w...wB..w..vw
wwwwwwwwwwwww
wu.Gw.x.w...w
w...wB..w...w
w.A.w...w.F.w
wwwVwwwwwwwww
w...w...w.q.w
w...w...w...w
w.F.w...w...w
wwwwwwwwwwwww`,r4_4_6:`wwwwwwwwwwwww
w.H.w...w.x.w
w...w...w.C.w
w...w...w...w
wwwwwwwwwwwww
wG..w...wG..w
w...w..vw...w
wAs.w...w..qw
wwwwwwwwwSwww
w...w...w...w
w...w...w...w
w..rw.C.w..Hw
wwwwwwwwwwwww`,r4_4_8:`wwwwwwwwwwwww
w...wx..w...w
w...w...w..Aw
w...w..Bw.vHw
wwUwwwwwwwwww
w...w.y.w...w
w.E.w...w...w
w...w...w.r.w
wwwwwwwwwwwww
w...w..EwB..w
w.H.w...w...w
w..uw...w...w
wwwwwwwwwwwww`,r4_5_1:`wwwwwwwwwwwww
w...w..3w.C.w
w..Gw...w...w
ws..w...w.uAw
wwwwwwwwwwwww
w...wC..w...w
w...w.G.w...w
wx..w...w.v.w
wwwwwwwwwwwww
w.5.w...w...w
w...w...wq..w
w...w...w...w
wwwwwwwwwwwww`,r4_5_12:`wwwwwwwwwwwww
w...w...wq..w
w...wr..w...w
wv..w...wGA.w
wwwwwwwwwwwww
w...w..Cw...w
w...w.G.w..Cw
w...w...w.y.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..4w.6.w.x.w
wwwwwwwwwwwww`,r4_5_13:`wwwwwwwwwwwww
w..qw..vw...w
w.C.w...w...w
w..Aw...w.y.w
wwwwwwwwwwwww
w..3w.1.w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.E.w...w...w
w...w..uw.x.w
wC..w..Ew...w
wwwwwwwwwwwww`,r4_5_14:`wwwwwwwwwwwww
w..Bw...w..Gw
wG..w...wA..w
w...w..2w..yw
wwwwwwwwwwwww
w...w..1w...w
w..Bw...w...w
wu..w...w.q.w
wwwwwwwwwwwww
w...w...w...w
w.x.w...w...w
w...w...wr..w
wwwwwwwwwwwww`,r4_5_15:`wwwwwwwwwwwww
w...wA.rw...w
w.5.w.E.w...w
w...w...w..sw
wwwwwwwwwwwww
w...wE..w...w
w...w..Hw...w
w..4w...w.y.w
wwwwwwwwwwwww
w...w...w...w
w..vw...w...w
w..Hw..xw...w
wwwwwwwwwwwww`,r4_5_16:`wwwwwwwwwwwww
wE.rw...w...w
w...w...w5..w
w...wx..w...w
wwwwwwwwwwwww
w...wE..w...w
w...w...w1..w
w...wH..w...w
wwwwwwwwwwwww
w.s.w...w...w
w...w...wq..w
w...wu..wH.Aw
wwwwwwwwwwwww`,r4_5_2:`wwwwwwwwwwwww
w...w..Fw...w
w...wu.AwG..w
wy..w...w..rw
wwwwwwwwwwwww
w...w6..w...w
w...w...w...w
w.v.w...w.x.w
wwwwwwwwwwwww
w...w.F.w...w
w...w...w...w
w...w.G.w..5w
wwwwwwwwwwwww`,r4_5_22:`wwwwwwwwwwwww
w...wu..w.C.w
w...w.F.w..Fw
w.r.w..Aw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.s.w6..w.yCw
wwwwwwwwwwwww
w...w.5.w...w
w...w...w.x.w
w...w...w...w
wwwwwwwwwwwww`,r4_5_24:`wwwwwwwwwwwww
w..qw...w...w
w...w...w...w
w...w...w1..w
wwwwwwwwwwwww
w.r.w..Fw...w
w...w.H.wH..w
w...w...w..uw
wwwwwwwwwwwww
wy..w5..wx..w
w...w...w...w
wAF.w...w...w
wwwwwwwwwwwww`,r4_5_25:`wwwwwwwwwwwww
w...w...w.F.w
w...w1..w.G.w
w...w...w...w
wwwwwwwwwwwww
w.v.w.3.w...w
w...w...w...w
w...w...w.rGw
wwwwwwwwwwwww
wu..wA..w...w
w...w.F.w...w
w...wy..wx..w
wwwwwwwwwwwww`,r4_5_4:`wwwwwwwwwwwww
w...w...w...w
w...w4..w...w
w..6w...w.yGw
wwwwwwwwwwwww
w...w...w...w
w...w..Cw...w
w...wG..wx..w
wwwwwwwwwwwww
wu..w...w...w
w...wr..ws..w
w...w...wCA.w
wwwwwwwwwwwww`,r4_5_5:`wwwwwwwwwwwww
wC..w..xw...w
w..sw...wGC.w
w...w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w2..w..1w
wwwwwwwwwwwww
w.q.w...w..Aw
w...w...w.G.w
w...wr..wu..w
wwwwwwwwwwwww`,r4_5_8:`wwwwwwwwwwwww
w.B.w...w...w
w..sw.x.w.A.w
w...w...wF.uw
wwwwwwwwwwwww
wF..w...w...w
w.B.w...w...w
w...w2..w.q.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w5..w...wr..w
wwwwwwwwwwwww`,r4_6_11:`wwwwwwwwwwwww
w...w.1.w..Aw
w...Q...wu..w
wy..w...w.s.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w...w.e.w..rw
wwwwwwwwwwwww
w...w...w...w
w...w...Y..6w
w..gw..xw...w
wwwwwwwwwwwww`,r4_6_17:`wwwwwwwwwwwww
w...wq..U...w
w...w...w...w
w...w...w..4w
wwwwwwwwwwwww
wb..w..ew.v.w
w...w...w...w
w...w...wA.sw
wwwwwwwwwwwww
w...Q.1.w...w
w...w...w...w
w..xw...wu..w
wwwwwwwwwwwww`,r4_6_18:`wwwwwwwwwwwww
w...w...w..xw
w...w...w...w
w...w..cw...w
wwwwwwwwwwwVw
wq..w...w...w
w...w.b.w5..w
w...w...w...w
wwwYwwwwwwwww
w...w.A.w..rw
w...w..yw...w
w.6.wv..w...w
wwwwwwwwwwwww`,r4_6_19:`wwwwwwwwwwwww
w...w...w.4.w
w...wy..U...w
w...w...w...w
wwwwwwwwwwwww
w...w..gw.u.w
wh..w...wA..w
w...w...w..sw
wwwwwwwwwwwww
w...w..1w...w
w.x.w...wq..w
w...Q...w...w
wwwwwwwwwwwww`,r4_6_2:`wwwwwwwwwwwww
w..Aw...V...w
w..uw...w...w
w.y.w.5.w..vw
wwwwwwwwwwwww
w...wh..w...w
w...w...w...w
wq..w...w...w
wwwwwwwwwwwww
w...U...w...w
w4..w.x.w...w
w...w...w..cw
wwwwwwwwwwwww`,r4_6_22:`wwwwwwwwwwwww
w...w...w...w
w..vw..3w.b.w
w...w...w...w
wwwwwSwwwwwww
w.y.w...w...w
w...w...wh..w
wAs.wx..w...w
wwwwwwwwwwwww
w...w...w...w
w...R...w...w
w..2w..uw...w
wwwwwwwwwwwww`,r4_6_24:`wwwwwwwwwwwww
w..Aw...w...w
w..uw..rw..1w
wy..w...w...w
wwwwwwwwwwQww
w...wg..w..xw
w3..w...w...w
w...w...w...w
wSwwwwwwwwwww
w...w...w...w
w...w...w...w
w..sw...wc..w
wwwwwwwwwwwww`,r4_6_25:`wwwwwwwwwwwww
w...w...wr..w
w.g.w...w...w
w...w...w...w
wwwwwwwwwQwww
w...w...w...w
w...we..w...w
w.x.w...w..1w
wwwSwwwwwwwww
w...w...w.qAw
w.3.w...wu..w
w...wy..w...w
wwwwwwwwwwwww`,r4_6_3:`wwwwwwwwwwwww
w...w5..wr..w
w...V...w...w
w..xw...w...w
wwwwwwwwwwwww
w...w...w.v.w
w.f.w...wA..w
w...wb..w..yw
wwwwwwwwwwwww
w...w...w...w
w...w...w..4w
w...ws..U...w
wwwwwwwwwwwww`,r4_6_5:`wwwwwwwwwwwww
w...U...wu..w
w...w..4w.A.w
w.v.w...w..yw
wwwwwwwwwwwww
w...w...w...w
w...wf..w...w
w...w...w.r.w
wwwwwwwwwwwww
w.e.w...w...w
w...w.x.R...w
w...w...w..2w
wwwwwwwwwwwww`,r4_6_6:`wwwwwwwwwwwww
w2..w...w...w
w...R.x.w...w
w...w...w..hw
wwwwwwwwwwwww
w.q.w..gw...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
ws..w.1.w..uw
w..rw...w...w
w..Aw...Q...w
wwwwwwwwwwwww`,r4_6_7:`wwwwwwwwwwwww
w.6.wy..wu.Aw
w...w...w...w
w...w...w..qw
wwYwwwwwwwwww
w..xw...w...w
w...w...w...w
w...wf..w4..w
wwwwwwwwwwwUw
w...w...w...w
we..w...w...w
w...w...wr..w
wwwwwwwwwwwww`,r4_6_8:`wwwwwwwwwwwww
w...w...w...w
w..vw...w..ew
w...w...w...w
wYwwwwwwwwwww
w...wf..w...w
w.6.w...w...w
w...w...wx..w
wwwwwwwwwwSww
wu..w...w3..w
w..sw..yw...w
w..Aw...w...w
wwwwwwwwwwwww`,r4_6_9:`wwwwwwwwwwwww
w...w6..ws..w
w...w...w...w
we..w...w...w
wwwwwwwYwwwww
wb..w...w.rAw
w...w...w...w
w...wx..w..uw
wwwwwwwwwwwww
w...w...w...w
w...wv..w...w
w...w...Q..1w
wwwwwwwwwwwww`,r4_7_14:`wwwwwwwwwwwww
w...w...wG..w
w...wv..w..1w
wx..w...Q...w
wwwwwwwwwwwww
w...V...w...w
w5..w...w...w
w...w...w...w
wwwwwwUwwwwww
w.s.w...w...w
w...w.A.w...w
w...wq.Gw.h.w
wwwwwwwwwwwww`,r4_7_16:`wwwwwwwwwwwww
w.5.V...w.x.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w.y.w...w.u.w
w...w...w...w
w...wh..w...w
wUwwwwwwwQwww
wAq.w...w...w
w...w...w..Ew
w..Ew...w..1w
wwwwwwwwwwwww`,r4_7_22:`wwwwwwwwwwwww
w...w..Hw...w
w...Y..6w..cw
w.q.w...w...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.x.w...w...w
wwwwwwwwwQwww
w...w...R...w
wH.uw...w.1.w
wA..w..rw...w
wwwwwwwwwwwww`,r4_7_6:`wwwwwwwwwwwww
w...wv..w...w
w...w...w..Ew
wx..w...Y.6.w
wwwwwwwwwwwww
w...w...w...w
w..Aw...w..cw
wr.Ew...w...w
wwwwwVwwwwwww
w...w..5w...w
w..sS...w...w
w...w...w...w
wwwwwwwwwwwww`,r4_8_11:`wwwwwwwwwwwww
w..rw...wC..w
wB..wx..w...w
w...w...w.v.w
wwwwwwwwwwwww
w..gw.A.w...w
w...w.4Cw...w
w...w...w..uw
wwwwwUwwwwwww
w...w.B.w...w
w..qw...w...w
w...w...w...w
wwwwwwwwwwwww`,r4_8_13:`wwwwwwwwwwwww
w...wy..wu..w
w...w...w...w
w...w...w..Fw
wwwwwwwwwwwww
w..5w...w..bw
wAF.V...w...w
w...w..Ew...w
wwwwwwwwwwwww
wv..w...w..xw
w...wE.rw...w
w...w...w...w
wwwwwwwwwwwww`,r4_8_24:`wwwwwwwwwwwww
w...w...w...w
w...wr..w...w
wq..w.H.w.c.w
wwwwwwwwwwwww
w...w.s.wB..w
w...w...w...w
w...w...w.v.w
wwwwwwwwwwwww
w.2.wB..w...w
wAH.w...w...w
w...R...wx..w
wwwwwwwwwwwww`,r4_8_4:`wwwwwwwwwwwww
w..Cw...w.F.w
w..vw..xw...w
w...w...w.u.w
wwwwwwwwwwwww
w...w...w...w
w.h.w...w...w
w...w.y.w.s.w
wwwwwwwwwwwww
w5..V...w...w
wF..w...w...w
w..Aw..Cw...w
wwwwwwwwwwwww`,r4_9_16:`wwwwwwwwwwwww
w...w..Fw...w
w..xw...w...w
w...w...w...w
wwwwwwwwwwwww
wr..w...wH..w
w...w..qw...w
w...w...wF..w
wwwwwwwwwwQww
wy..w.5.w..Cw
w...V.A.w...w
w...w.C.w..Hw
wwwwwwwwwwwww`,r4_9_23:`wwwwwwwwwwwww
wG..w...wF..w
w...wy..wH..w
w..Fw...w...w
wwQwwwwwwwwww
w...w...wH..w
w.6.w...w...w
w.AGw...w...w
wYwwwwwwwwwww
w...w...w...w
w..uw...w...w
w...w..qw.x.w
wwwwwwwwwwwww`,r5_10_4:`wwwwwwwwwwwww
w...wy..wb.Cw
wC..w...w..Aw
w.s.w...w.r.w
wwwwwwwwwwwww
w...S.xfw...w
w...w...w...w
w3..w...w6h.w
wwwwwwwwwwwYw
w...w...w...w
w...w...wu..w
w...w...w...w
wwwwwwwwwwwww`,r5_11_22:`wwwwwwwwwwwww
w.6.Y.f.w...w
w...w...w..Gw
w...w...w..Ew
wwwUwwwwwwwww
w...w...w...w
w4..w...w...w
w...w...w..vw
wwwwwwwwwwwww
wAu.w...w...w
w..rV.E.w.G.w
w...w3..wx..w
wwwwwwwwwwwww`,r5_2_1:`wwwwwwwwwwwww
wB.xw..sw..2w
w...wAH.w...w
w...w...w.v.w
wwwwwwwwwwwww
wy..w...w...w
wg..w...w...w
w...w...wB3.w
wwwwwwwwwwwww
w...w...w...w
w.H.w..qw...w
w..uw...w...w
wwwwwwwwwwwww`,r5_2_10:`wwwwwwwwwwwww
w...wE4.w...w
w...wv..w...w
ws..w...w..1w
wwwwwwwwwwwww
w...w...w...w
w...w...w..Bw
w.f.w.r.w...w
wwwwwwwwwwwww
w..xw.E.w.q.w
w.B.w..yw...w
w...w.A.w...w
wwwwwwwwwwwww`,r5_2_11:`wwwwwwwwwwwww
w...w...wu..w
w...wF..w..cw
w...w...w...w
wwwwwwwwwwwww
wv..wF..w.y.w
w...w...wA.Hw
w...wx..w..3w
wwwwwwwwwwwww
w..4w...w...w
w...ws..w.H.w
w...w...wq..w
wwwwwwwwwwwww`,r5_2_12:`wwwwwwwwwwwww
w...w...w...w
w...wq..wy.3w
w..gw...w..Hw
wwwwwwwwwwwww
wA..w...w.x.w
w..Hwr..w..6w
wv..w...w.E.w
wwwwwwwwwwwww
w...w.E.w...w
w..uw...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_2_13:`wwwwwwwwwwwww
w...w...w..4w
w..Cw...wB..w
w...w...w.y.w
wwwwwwwwwwwww
wr..w...w...w
w...wv..w...w
w...w...w..qw
wwwwwwwwwwwww
ws..wx..w...w
w..Aw.6.w...w
wBe.w..Cw...w
wwwwwwwwwwwww`,r5_2_14:`wwwwwwwwwwwww
w..yw...w...w
w...w.G.w...w
w...w...w.u.w
wwwwwwwwwwwww
w.q.wx..w...w
wF..wG.cw...w
wA..w...w.6.w
wwwwwwwwwwwww
w...w...w..sw
w..5w..vw...w
w...w..Fw...w
wwwwwwwwwwwww`,r5_2_15:`wwwwwwwwwwwww
wB..w...w...w
w...w...wv.5w
wr..wG..w...w
wwwwwwwwwwwww
w...wx..w..qw
w...w..Gw...w
w.s.w..cwBA.w
wwwwwwwwwwwww
w...w3..w.u.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_2_16:`wwwwwwwwwwwww
w.AGw...w...w
w...w.F.wq..w
w.y.w.xbw...w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
wv..w...w...w
wwwwwwwwwwwww
w...w.4.w..uw
w..2w..rw...w
wF..w.G.w...w
wwwwwwwwwwwww`,r5_2_17:`wwwwwwwwwwwww
w...w...w..4w
w..qw...w...w
w...w.F.w..uw
wwwwwwwwwwwww
ws..w...w...w
w...wx6.w...w
wA.Cw.F.w...w
wwwwwwwwwwwww
w...w...w...w
wh..wr..wy.Cw
w...w...w...w
wwwwwwwwwwwww`,r5_2_18:`wwwwwwwwwwwww
w...wv..wBA.w
w2.xw...w...w
w..Fw...w..yw
wwwwwwwwwwwww
w...w.e.w...w
wB.1w...w...w
w.q.w...w..rw
wwwwwwwwwwwww
w...w...wF..w
w...w...w...w
w..sw...w...w
wwwwwwwwwwwww`,r5_2_19:`wwwwwwwwwwwww
wB..w..vw...w
w...w.B.w...w
w.r.w.A.w.u.w
wwwwwwwwwwwww
w...w.q.w...w
w...w...w.G.w
w.y.w...w...w
wwwwwwwwwwwww
w...w.x.w...w
w.5.w..Gw4..w
w...wh..w...w
wwwwwwwwwwwww`,r5_2_2:`wwwwwwwwwwwww
w...w...w.x.w
w...wy.GwC..w
w.s.w...w...w
wwwwwwwwwwwww
w...w...wA..w
w...w..vw...w
w...w...wG.qw
wwwwwwwwwwwww
w...w...w...w
w...w.1.wu..w
w..4w.Cbw...w
wwwwwwwwwwwww`,r5_2_20:`wwwwwwwwwwwww
wG..w.A.w...w
w...wG.sw...w
w.q.w...w..yw
wwwwwwwwwwwww
w6..w.v.w...w
w...w.3.wB..w
w.r.w...w..hw
wwwwwwwwwwwww
w...wx..w...w
w...wB..w...w
w...w...w...w
wwwwwwwwwwwww`,r5_2_21:`wwwwwwwwwwwww
wA.yw..uw...w
w...w...w..Fw
w..Cw..5w...w
wwwwwwwwwwwww
w...wF..w..rw
w..hw...w...w
w...wx..w...w
wwwwwwwwwwwww
w...w...w1..w
w...w...w...w
w...ws..wq.Cw
wwwwwwwwwwwww`,r5_2_22:`wwwwwwwwwwwww
w.x.w..4w.C.w
w.C.w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w..vw
w...w..rw...w
wHs.w.6.w...w
wwwwwwwwwwwww
w...w...w.u.w
w..yw..bwH.Aw
w...w...w...w
wwwwwwwwwwwww`,r5_2_23:`wwwwwwwwwwwww
w...wv.Hw...w
w...w...wu..w
w.q.wA4.w..2w
wwwwwwwwwwwww
w...wf.xwH..w
w...w.G.w...w
wG..w...w..sw
wwwwwwwwwwwww
w...w...w...w
w...w...wy..w
w...w...w...w
wwwwwwwwwwwww`,r5_2_24:`wwwwwwwwwwwww
w...w...w...w
wx.Fw...wr..w
w...w...w...w
wwwwwwwwwwwww
w.A.w...w.q.w
w.B.w...wB..w
wu..wh..w...w
wwwwwwwwwwwww
w...w...w.s.w
w...w.F2w...w
w..vw...w..1w
wwwwwwwwwwwww`,r5_2_25:`wwwwwwwwwwwww
w...w...wq..w
w...w..Bw...w
w...wc..w...w
wwwwwwwwwwwww
wu.4w...w.yGw
w...w..swA..w
w...w...w...w
wwwwwwwwwwwww
w.v.w...w.x.w
wG..w...w1..w
w...w...w.B.w
wwwwwwwwwwwww`,r5_2_3:`wwwwwwwwwwwww
w...wu.HwF..w
w...w...w...w
w.v.w...w...w
wwwwwwwwwwwww
w...w.s.w..yw
w...w...w...w
w...w.2.w...w
wwwwwwwwwwwww
w..xw...w.q.w
w.e.w4..wA..w
w..Fw...wH..w
wwwwwwwwwwwww`,r5_2_4:`wwwwwwwwwwwww
w..uw...w...w
w...w...w...w
w...wF..w.g.w
wwwwwwwwwwwww
ws..w.v.w...w
w..Aw...w.F.w
w.E.w1..w.x.w
wwwwwwwwwwwww
w...w...wE.2w
w...wq..w...w
w...w...wr..w
wwwwwwwwwwwww`,r5_2_5:`wwwwwwwwwwwww
w...w...w...w
wHx.w...wy..w
w...w...w...w
wwwwwwwwwwwww
w...w.4.w.u.w
w...ws..w..Fw
w...w...w...w
wwwwwwwwwwwww
w...wb..w...w
wA.vw..qw..Hw
w..Fw.6.w...w
wwwwwwwwwwwww`,r5_2_6:`wwwwwwwwwwwww
w...w...ws..w
w..xw...w...w
w..Cw6..w...w
wwwwwwwwwwwww
wE..w...w.y.w
w..Aw..3w...w
wq..w.r.wE..w
wwwwwwwwwwwww
w...w...w...w
w...w..Cw...w
w..uw..fw...w
wwwwwwwwwwwww`,r5_2_7:`wwwwwwwwwwwww
w..rw...w...w
w.C.w..vw...w
w...w...w1..w
wwwwwwwwwwwww
w...w...wH..w
wx..w...w...w
w..Hw...w.g.w
wwwwwwwwwwwww
w.u.wA.Cw..yw
w...w...w...w
w...w..qw..6w
wwwwwwwwwwwww`,r5_2_8:`wwwwwwwwwwwww
w.x.w...w...w
wF1.wG.rw...w
w...w...w..vw
wwwwwwwwwwwww
wA..w...w...w
w..Gw...w...w
ws..w...w...w
wwwwwwwwwwwww
w...w...w.3yw
w...w...w...w
w..uw.F.wb..w
wwwwwwwwwwwww`,r5_2_9:`wwwwwwwwwwwww
w...wE..w...w
w...w...wy..w
w...w...w..cw
wwwwwwwwwwwww
w.64w...w.v.w
w..Gw..qw..Aw
w.s.w...wG..w
wwwwwwwwwwwww
w...w...wx..w
w...w...w...w
w..uw...w.E.w
wwwwwwwwwwwww`,r5_3_1:`wwwwwwwwwwwww
w...w...wu..w
w.B.w...w...w
wG..w..Ew...w
wwwwwwwwwVwSw
wF..w..1w...w
wG..w..Fw.5Bw
w...w..xw..Aw
wwwwwUwwwwwww
w..hw...w..Ew
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_3_11:`wwwwwwwwwwwww
w...w...wB..w
w.2Cw...w...w
w.A.w...w..Hw
wRwwwwwwwQwww
w...wH..w..Bw
w..3w..xwC..w
w.v.w...w...w
wwwwwwwwwwwww
w...w...w...w
w..Ew...U..Ew
w...w...wf..w
wwwwwwwwwwwww`,r5_3_13:`wwwwwwwwwwwww
w...w...Vu..w
w...w..Fw...w
w...w...w...w
wwwwwwwwwUwww
w..FwH..w.4.w
w...w.G.w.A.w
w...w...w.B.w
wwwwwwwwwwYww
w3..w...w...w
w..GwBeHw...w
w..xw...w...w
wwwwwwwwwwwww`,r5_3_14:`wwwwwwwwwwwww
w5C.w...w4..w
w...w.E.w...w
w.A.w..Cw...w
wVwwwwwwwSwww
w...w...w...w
w...w...w...w
w.q.w...w..Gw
wwRwwwwwwwwww
w...w...wx..w
w..Gw.hBwB..w
w...w..Ew...w
wwwwwwwwwwwww`,r5_3_15:`wwwwwwwwwwwww
w...wx..w...w
w..GwG..RB..w
wE..S...w...w
wwwwwwwwwwwww
w.B.wH..Y.u.w
w...w..Aw...w
w..1w..6w...w
wwwwwwwwwwwww
w...wH.Ewc..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_3_17:`wwwwwwwwwwwww
w...w...w...w
w...RC..w...w
wv..Q.1Aw.BGw
wSwwwwwwwwwww
w.E.w...w...w
w...w...w...w
w...w.h.wG.xw
wwwwwwwwwwwww
wCB.w...w...w
w...w...w.E.w
w..6w...w...w
wwwwwwwwwwwww`,r5_3_18:`wwwwwwwwwwwww
w...w...S...w
w..sw.G.w.H.w
w...w...wB..w
wQwwwwRwwwwww
w.A.w...w...w
w..1w...w...w
w.F.w..ew...w
wwwwwwwwwwwww
w4..w...w..Fw
w.G.w..xw...w
w...w.H.wB..w
wwwwwwwwwwwww`,r5_3_19:`wwwwwwwwwwwww
w...VG.4w...w
w...U...w...w
w.v.wA..w...w
wwwwwwwSwwwww
w..Cw.FHw..Hw
w...w...w..xw
w..1w...w...w
wwwwwwwwwwwww
w...wb..w.GFw
w...w...w...w
w..Cw...w...w
wwwwwwwwwwwww`,r5_3_2:`wwwwwwwwwwwww
w..CwAE.w...w
w...w.3.S...w
w.B.w...w.v.w
wVwwwwwwwwwww
w...w..Fw...w
w...w...w...w
w.1.w...w.F.w
wwwwwwwwwwwUw
wBx.w...w...w
w..hw...wEC.w
w...w...w...w
wwwwwwwwwwwww`,r5_3_20:`wwwwwwwwwwwww
w..2w..qw.B.w
wA.Ew...wh..w
w...R...w...w
wwwwwwVwwwwww
w...wF..w...w
w...w..CQ...w
wC.xw4..w...w
wwwwwwwwwwwww
w...w...w.B.w
w...wFE.w...w
w...w...w...w
wwwwwwwwwwwww`,r5_3_22:`wwwwwwwwwwwww
w...w...U...w
wCB.w...w...w
w...wAE4w..vw
wwwwwYwwwwwww
w...w...w...w
w..3w.g.w...w
wH..wC.EwH..w
wwwwwwVwwwwww
w...w...w...w
w...w...w...w
w...w...w.xBw
wwwwwwwwwwwww`,r5_3_23:`wwwwwwwwwwwww
w6.Hw..sS...w
w...w...wF..w
w1A.Q...w...w
wwwwwwwwwwwww
w..HwE..w...w
w...w.x.wF..w
w..Bw...wc..w
wwwwwwwwwwwww
w...w.B.w...w
w...U..Ew...w
w...w...w...w
wwwwwwwwwwwww`,r5_3_25:`wwwwwwwwwwwww
w6..R...w...w
w..Aw..sw...w
wF.2w...wH..w
wwwwwwwwwwwww
w...w...wx.Ew
w...w..Hw...w
wF.Gw...w...w
wSwwwwwwwwwUw
w.E.w...w...w
w...w..cw...w
w..Gw...w...w
wwwwwwwwwwwww`,r5_3_3:`wwwwwwwwwwwww
wB..w...w...w
w6..w...w.H.w
w...w...w..xw
wwwwwwwwwwwww
w.r.w...w.c.w
w...wF..w...w
w...w..Ew...w
wUwwwwwwwwwQw
w.4.w..Bw.H.w
wA..w...wE..w
w.F.V...w...w
wwwwwwwwwwwww`,r5_3_6:`wwwwwwwwwwwww
w...wC..w..Cw
w.G.w.H.w5..w
wH..w...wA..w
wwQwwwwwwwVww
w...w...w...w
w...w...w.4.w
wF..w...w..yw
wwwwwwwwwwwww
w...w.x.w.e.w
w...w...R...w
w...w..Gw..Fw
wwwwwwwwwwwww`,r5_3_8:`wwwwwwwwwwwww
wx..w..hw...w
w.F.w...w...w
w...w...w...w
wwwYwwwwwwwww
w...w..Gw...w
w..EwC..w...w
w...w...wE..w
wwwwwwwwwwwww
w...wC.AQ.v.w
w...w.2.w...w
w5GFw...R...w
wwwwwwwwwwwww`,r5_4_11:`wwwwwwwwwwwww
w.1.V...w...w
w...w...w...w
w5.Bw...w..3w
wwwwwwwRwwwww
w..xw...wB..w
w...w...w...w
w...w...w...w
wwwwwwwwwYwww
w4s.w...w.6Aw
w...wq..wv..w
w...w...w...w
wwwwwwwwwwwww`,r5_4_12:`wwwwwwwwwwwww
w..sw..uw.x.w
w...w...w...w
w6..w...w...w
wwwwwwwwwwwww
w.r.w.3.w5..w
w2.Aw.C.w...w
w...w...w...w
wRwwwSwwwwwww
w...U...w...w
w.C.w...w...w
w...w..1w...w
wwwwwwwwwwwww`,r5_4_13:`wwwwwwwwwwwww
w...w..3w..6w
w...w...w.G.w
w2..V...w...w
wwwwwwwwwwwYw
w.1.Q...w...w
w...w.G.w...w
wu.Aw4..w...w
wwwwwwwwwwwww
w...w...wx..w
w...w..sw...w
w..vw...w...w
wwwwwwwwwwwww`,r5_4_14:`wwwwwwwwwwwww
w...w...Q...w
w..5w.B.w...w
w..xw..1w...w
wwwwwwwwwwwww
wr..wB..w...w
w...w...w..3w
w...w...w...w
wwwwwUwwwwwww
w.u.w..4w...w
w...wq.Aw...w
w...w...Y.2.w
wwwwwwwwwwwww`,r5_4_15:`wwwwwwwwwwwww
w.52w...w...w
w...w...w...w
wC..R...w...w
wwwwwwwwwwwww
w..xw...wC..w
w...w...w...w
w...w...w...w
wwwwwwwwwSwYw
w.u.w..1wA4.w
w...wy..w..6w
w...w...wr..w
wwwwwwwwwwwww`,r5_4_17:`wwwwwwwwwwwww
w...w...w5..w
w...wy..ws..w
w..xw...w...w
wwwwwwwwwwwww
w...w...w.r.w
w...w...wA..w
w4H.U..1w..3w
wwwwwwwwwwSww
w...R...w...w
w...w...wH..w
w...w...w..6w
wwwwwwwwwwwww`,r5_4_18:`wwwwwwwwwwwww
w...w...w...w
wF..w...w...w
w...w...w...w
wwRwwwwwwwSww
w..Aw5.Fw..1w
w.2.w...V...w
wy..w6..w..4w
wwwwwwwwwwwww
w...w...w..xw
w...w...w...w
w..rw..vw...w
wwwwwwwwwwwww`,r5_4_2:`wwwwwwwwwwwww
w...w..Gw.1.w
w...w...wA..w
w...w...Q.y.w
wwwwwwwwwwwww
w.G4w..5w...w
w...w...w...w
w3..S...Y..uw
wwwwwwwwwwwww
w...w..xw.2.w
w...w...w...w
w...w...wq..w
wwwwwwwwwwwww`,r5_4_22:`wwwwwwwwwwwww
w...Q...w.F.w
wx..w4.6w.5.w
w...w...w...w
wwwwwwwwwVwww
w.s.w...w...w
w...w2.Fw...w
w...w...w...w
wwwwwwwSwwwww
w.q.wA..w...w
w...w...w...w
w...wr.3w...w
wwwwwwwwwwwww`,r5_4_24:`wwwwwwwwwwwww
w...w...w...w
wx..w.6Gw...w
w...w.4.U...w
wwwwwwwwwwwww
w.s.w5..w...w
w...w.G.w...w
w...w...w...w
wwwwwwQwwSwww
w.u.w..Aw...w
w...w..1w...w
w2..wr..w...w
wwwwwwwwwwwww`,r5_4_5:`wwwwwwwwwwwww
w...wv..wA.2w
w...w.1.wr.5w
wu..w...w...w
wYwwwwwwwwwVw
w...w..4w...w
w...w...w..Gw
wx..w.G.w3..w
wwwwwwwUwwwww
w...w...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_4_6:`wwwwwwwwwwwww
w4A.U.E.w..6w
w...w2..w...w
w.y.w...w...w
wwwwwwQwwwwww
w...w...w.E.w
w...w...w...w
w.r.w...w.3.w
wwwwwwwwwwwSw
w...wx..w...w
w..qw...w...w
w5..w...w...w
wwwwwwwwwwwww`,r5_4_8:`wwwwwwwwwwwww
w...wr..wv..w
w...w...w...w
wu..w...w5A.w
wwwwwwwwwwwVw
w...w...wF..w
w...w...w..2w
wx..w...w...w
wwwwwwwwwwwww
w.6.w...w...w
w.F1w...U...w
w...Y...w.3.w
wwwwwwwwwwwww`,r5_4_9:`wwwwwwwwwwwww
w...w..3w...w
w...w..Hw4..w
w...w6..w...w
wwwRwwSwwwwww
wH..w...w..xw
w...w...w...w
w...w...w...w
wwQwwwwwwwwww
w1..w5..w.r.w
wA.yw..qw...w
w...w...w...w
wwwwwwwwwwwww`,r5_5_1:`wwwwwwwwwwwww
w...w.H.w...w
w..ERA.sw...w
w...w...w.v.w
wwwwwwwwwwwww
w...w...w..Ew
w.6Hw.5.w...w
w...w...w...w
wwYwwwwwwwwww
w3..w..xw..uw
w...w...w.c.w
w...S...w...w
wwwwwwwwwwwww`,r5_5_11:`wwwwwwwwwwwww
w..uwH..w..1w
w.c.w...w.G.w
w...w...w...w
wwwwwwwUwwwQw
w...w...V...w
w...w.x.w...w
w...w...w56.w
wwwwwwwwwwwww
w.A.w...w..Hw
wG.sw...w...w
w...w..vw...w
wwwwwwwwwwwww`,r5_5_12:`wwwwwwwwwwwww
w...w...w..5w
wA.Cw...w...w
w.u.w...wB..w
wwwwwwwwwwwww
w...w...w...w
w...w..Cw1..w
w.y.w4..U...w
wwwwwwwwwwRQw
w...w.s.wx..w
w...w...w...w
w..Bwh..w...w
wwwwwwwwwwwww`,r5_5_13:`wwwwwwwwwwwww
w...w...w...w
w.B.w.x.w...w
w...w...w..Bw
wwwwwwVwwwwww
ws..w...w..qw
w...w.4.w...w
w...w5..w...w
wwwwwwwQwwwww
w.y.w1..w...w
wg..w...w...w
wE.AY.E.w...w
wwwwwwwwwwwww`,r5_5_16:`wwwwwwwwwwwww
w...w...w...w
w..Hw...wv6.w
w...wx..w...w
wwwwwwUwwwwww
w.r.w...wE2fw
w...w...w...w
w...w4..R...w
wwwwwwwwwwwww
wq..wH..w...w
w.A.w...w...w
w..EV...w...w
wwwwwwwwwwwww`,r5_5_17:`wwwwwwwwwwwww
w.F.w.A.we..w
w...V..yw...w
w...w.G.w.s.w
wwwwwwwwwwwww
w...U..1w...w
w.4.w...w...w
w.G.w...w..Fw
wwwwwwwQwwwww
w...w...w...w
w...w.x.w...w
w..vw..3w...w
wwwwwwwwwwwww`,r5_5_18:`wwwwwwwwwwwww
w...w...wE.bw
w.x.w...w.A.w
w...w..Gw..yw
wwYwwwwwwwwww
w...w...w...w
w...w3..w...w
w6..S.E.w..sw
wwwwwwwwwwwVw
w...w...w...w
w...w...w...w
w...wv..wG.4w
wwwwwwwwwwwww`,r5_5_19:`wwwwwwwwwwwww
w...w...wC..w
w..yw...w.5.w
w.h.wx..w...w
wwwwwwUwwwwww
w.A.w...w...w
w..Bw...R3.Bw
w.q.w.4.S...w
wwwwwwwwwwwww
w...w...w...w
w..uw.C.w...w
w...w...w...w
wwwwwwwwwwwww`,r5_5_2:`wwwwwwwwwwwww
w...w.2.w...w
w...w...R..xw
w..Hw...w...w
wwwwwSwwwwwww
w...w.3.wbv.w
w...w.G.w..1w
w...w...w...w
wYwwwwwwwwwww
w...w...w...w
w..Hw...wy.Aw
w...wu..w.G.w
wwwwwwwwwwwww`,r5_5_21:`wwwwwwwwwwwww
w...w...wy..w
w...wr..w..Aw
w.C.w...w..Hw
wwwwwwYwwwwww
w...w.1.w...w
w...wH..Q.2.w
w...w.5.w...w
wwwwwwwwwwwRw
w...wb..w...w
w...wv..w...w
w..Cw...w..xw
wwwwwwwwwwwww`,r5_5_22:`wwwwwwwwwwwww
w.C.wr..w...w
w...w...ws..w
w...w...w.FAw
wwwwwwRwwwwww
w...w...w...w
w..xw...w...w
w.b.w...w..Cw
wwwUwwwwwwwww
w...w..6w...w
w41.Y...wq..w
w...w..Fw...w
wwwwwwwwwwwww`,r5_5_23:`wwwwwwwwwwwww
wH..w...w.H.w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
ws..w...w...w
w...wv..w.3.w
w...Y...w..Gw
wwwwwwwwwSwww
wu..w...w.41w
w...w.b.w...w
wAG.wx..Q...w
wwwwwwwwwwwww`,r5_5_24:`wwwwwwwwwwwww
w...w...w...w
w.2.Y.G.w...w
wB..w3..w...w
wwwwwwwSwwwww
w...w...V...w
w...w...w.x.w
wv..we5.w...w
wwwwwwwwwwwww
w..Gw...w...w
w...w..sw..Bw
wA.qw...w...w
wwwwwwwwwwwww`,r5_5_3:`wwwwwwwwwwwww
w...wq..wA..w
w..CR...wv..w
w...wb..w..Fw
wwwwwwwwwwwww
w...w...w...w
w...w...w..Cw
w.r.w...w...w
wwwwwwwwwwwww
w...w...wF..w
w...Y...S.3.w
wx5.w6..w...w
wwwwwwwwwwwww`,r5_5_5:`wwwwwwwwwwwww
w1..w.G.w...w
w...w..rw...w
wG.3wA..w.s.w
wwQwwwwwwwwww
w5..w..xwH..w
w...w...w...w
w...V...w...w
wwwwwwwwwwwww
w...w...w...w
w...U...w..Hw
w...w..uwb..w
wwwwwwwwwwwww`,r5_5_8:`wwwwwwwwwwwww
w...w...w..Aw
w.H.wq..wr..w
w...w...R.F.w
wwwwwwwwwwwww
wF..w...w..sw
w...w..Hw..5w
w4..w...wb..w
wwUwwwwwwwwww
w...Y...w...w
w6..wx..w...w
w...w...w...w
wwwwwwwwwwwww`,r5_5_9:`wwwwwwwwwwwww
w...wv.Aw...w
w...w.E.w...w
w.r.w...w..Gw
wwwwwwwwwwwww
w...w...w3..w
w.G.w...w...w
w...w.y.w.x.w
wwwQwwwwwwwVw
w...w.E2w.5.w
w...w...w...w
w.c.w...R...w
wwwwwwwwwwwww`,r5_6_11:`wwwwwwwwwwwww
w...w...w...w
w..sw..uw...w
w...R...w...w
wwwwwwwwwwwww
w.q.w...w...w
w..4w...w...w
w..AQ...S...w
wUwwwwwwwwYww
w...w...w...w
w.5.w..rw.x.w
w...V...w...w
wwwwwwwwwwwww`,r5_6_12:`wwwwwwwwwwwww
w...V..qw...w
w..sw...w...w
w...w...w...w
wwwwwwwwwwwww
w.v.w...w...w
w...w...w...w
w3A.w...w...w
wwwSwwwQwwUww
w...R...w...w
w..2w...Y...w
w...w..yw..xw
wwwwwwwwwwwww`,r5_6_13:`wwwwwwwwwwwww
w..sS...w...w
w...w...w...w
w...w...w...w
wwwwwwwwwRwww
wv..Y...U...w
w...w...w...w
w...w...w..xw
wwwwwwwwwwwww
wu.Aw...w.r.w
w.5.w1..Q...w
w...V...w...w
wwwwwwwwwwwww`,r5_6_14:`wwwwwwwwwwwww
w...w..uw.x.w
w...w...Y...w
w...w...w...w
wRwwwwSwwwwww
w...w3..w...w
wA..U...w...w
w4r.Q...w...w
wwwwwVwwwwwww
w...w...w...w
w...w...w...w
w..qw..sw...w
wwwwwwwwwwwww`,r5_6_15:`wwwwwwwwwwwww
w...wu..w...w
w...U...Y.1.w
wr..wA.6w...w
wwwwwwwwwQwww
w...w...w...w
w...w...w...w
ws..w...w.v.w
wSRwwwwwwwwww
w...V...w...w
w...w...w.x.w
w...w...w...w
wwwwwwwwwwwww`,r5_6_16:`wwwwwwwwwwwww
w...V...w...w
w...w..sY.x.w
w..5w...w...w
wwSwwwwwwwwRw
w3..w...w...w
w..Aw...w...w
w.r.Q...w...w
wwwUwwwwwwwww
w...w...w...w
w..qw..vw...w
w...w...w...w
wwwwwwwwwwwww`,r5_6_18:`wwwwwwwwwwwww
w...w...w...w
w...w..uw...w
w...w...wx..w
wwwSwwwVwwwww
w...w5..w.A.w
w...w...U...w
w...w...w.y4w
wwwwwwwwwQwww
w...R...w...w
w...Yv..ws..w
w...w...w...w
wwwwwwwwwwwww`,r5_6_19:`wwwwwwwwwwwww
w...w...R...w
w...w...Y2A.w
w.r.S..3w..qw
wwwwwwwwwwwww
w...w...w...w
w.x.w...w...w
w...w...w.v.w
wwVwwwwwwwwQw
w...w...U...w
w...w...w...w
w...w...wu..w
wwwwwwwwwwwww`,r5_6_2:`wwwwwwwwwwwww
w...w...w...w
w..rw...w...w
w...w...w...w
wYwwwwwwwwwww
w.u.w...w..xw
w...w...w...w
w...Q...w...w
wwwwwwVwwwwww
w.y.w...S..qw
wA..w...w...w
w4..U.3.R...w
wwwwwwwwwwwww`,r5_6_20:`wwwwwwwwwwwww
wA1.V...w...w
w...Q...Y...w
w.y.R..6w.s.w
wwwwwwwwwwwww
w...U...w...w
w...w...w...w
wu..w...w.x.w
wwwwwwwwwwwww
w...w...w...w
w..vS...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_6_21:`wwwwwwwwwwwww
w.4.w..qw...w
w...wA..w...w
w...Q.1.V..uw
wwUwwwwwwwwww
w...w...w...w
w...w...w...w
wv..w...w..yw
wwRwwSwwwwwww
w...Y...w...w
w...w...w...w
w.x.w...w...w
wwwwwwwwwwwww`,r5_6_22:`wwwwwwwwwwwww
w...w...w...w
w...w...ws..w
w...wx..w...w
wUwwwwwwwwYww
w...w...w...w
w...w...w..6w
w...w...w...w
wwwwwVwwwwwSw
wy..w...w...w
w...R...wv.Aw
w...wu..Q3..w
wwwwwwwwwwwww`,r5_6_23:`wwwwwwwwwwwww
w...S...w...w
w.6.w..vw...w
w...w3A.U..rw
wwwYwwwwwVwww
w...R...w...w
w...w...w...w
w.s.w...w.q.w
wQwwwwwwwwwww
w...w...w...w
wx..w...w...w
w...w...w...w
wwwwwwwwwwwww`,r5_6_25:`wwwwwwwwwwwww
w...w...wy..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwww
w...w...w..rw
wx..w...w...w
w...w...w...w
wUwwwwwwwwVww
w.s.w...S.q.w
w...w...Y...w
w...Q..1R.3Aw
wwwwwwwwwwwww`,r5_6_3:`wwwwwwwwwwwww
w...w...wq..w
w...wx..w...w
w...w...S...w
wwQwwwwwwwVww
w...w...w...w
w...w...w.5.w
w...w...w...w
wwwwwwwwwwRUw
w.s.w...w.A.w
w...w...w...w
w...Yy..wu.4w
wwwwwwwwwwwww`,r5_6_7:`wwwwwwwwwwwww
wA..w...w...w
w..4w...V...w
wr..U.5.w.y.w
wwwQwwwwwwwSw
w...w...w...w
w...w...w...w
wq..w...w.x.w
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w..uY...R...w
wwwwwwwwwwwww`,r5_7_15:`wwwwwwwwwwwww
w...w...w...w
w..cw...w...w
w...w...w...w
wwwwwwwwwwwww
w.s.w..ew...w
w...w...Y...w
w...w.x.w6..w
wUwwwwwwwwQww
w...V...w1..w
w4..w2g.w...w
w.f.w5A.R...w
wwwwwwwwwwwww`,r5_7_16:`wwwwwwwwwwwww
wf..w...w1..w
w...w.5.Q...w
w...w...w.hcw
wwwwwwVwwSwww
w...w...w...w
w...wx.bw3.2w
w...w...w..Aw
wwwwwwwwwwRww
w...w...w...w
w...w...w...w
w...wv..U.4.w
wwwwwwwwwwwww`,r5_7_19:`wwwwwwwwwwwww
w...wv..Q.1.w
w...w...w...w
w...w...w...w
wwwwwwwwwwSww
w...w...w..Aw
w...w.x.w6.gw
w.e.w...w3.bw
wwwwwwUwwwYww
w...wf..R...w
w...w.4.w.2.w
w...w...w...w
wwwwwwwwwwwww`,r5_7_21:`wwwwwwwwwwwww
w..bw6..w...w
wx..w...w...w
w...Y...w...w
wwwwwUwwwwwww
w.2.w...w...w
w3..w.4.wf..w
w.A.S...w.g.w
wRwwwwwwwwwww
w.c.w...w...w
w...w..uw...w
w1..Q...w...w
wwwwwwwwwwwww`,r5_7_22:`wwwwwwwwwwwww
w...w...w...w
w5..V..uw...w
w...w...w...w
wwwQwwwwwwwww
wA..w...w...w
w...w.h3w...w
w41.U...w...w
wwwwwwSwwwwww
w..bw...w...w
w...w...R.c.w
wf..w..2w.x.w
wwwwwwwwwwwww`,r5_7_9:`wwwwwwwwwwwww
w.2.U...Q..Aw
w...w...w..1w
w...w4..w..3w
wwRwwwwwwSwww
w...w...w...w
wb..wf..we..w
w..xw...w.6.w
wwwwwwwwwYwww
w...w...w...w
w...w..cw...w
w...w...wv..w
wwwwwwwwwwwww`,r5_8_14:`wwwwwwwwwwwww
w...w..3wG..w
w.E.wr..w...w
wG..w...w...w
wwwwwwwwwwRww
w...w.E.wA..w
w...w...w2..w
wu.Fw...w.y.w
wwwwwwwwwwwww
w...w...w...w
w...w..qw...w
wx..V...w..Fw
wwwwwwwwwwwww`,r5_8_21:`wwwwwwwwwwwww
w.A.w...w.B.w
w5..V.H.w...w
w.y.w...w..uw
wwwwwwwwwwwww
w...w..Fw.x.w
w..Bw...w4..w
w...w...w...w
wwwwwwwwwwwww
wq..w..Fw...w
w...w...w...w
w...w.H.Yr..w
wwwwwwwwwwwww`,r5_8_7:`wwwwwwwwwwwww
w..sw...w...w
w.F.w..xw..Bw
w...w...w..Hw
wwwwwwwwwwwww
w...w...w5..w
w...w...V...w
w.B.w..HwA.rw
wwwwwwwwwwwww
w...w...w...w
w1.qw...w...w
w...wu..R..Fw
wwwwwwwwwwwww`,r5_9_17:`wwwwwwwwwwwww
w...w...Y...w
w.F.w.C6w..xw
w...w...w...w
wwwwwwwwwwwww
w...wb..w.F.w
w..Aw.3.w...w
wEv.w...wH..w
wwwwwwwwwwRww
w...w.5.w...w
wC..w...w...w
w...wH.Ew...w
wwwwwwwwwwwww`,test_1:`wwwwwwwwwwwww
w..Fw...w...w
w...w...wr..w
w...w...w...w
wwwwwwwwwwwQw
w.u.Y...w...w
wg..wC..w...w
w...weA6w1C.w
wwwwwwwwwwwww
w...w...R...w
w...w...w..xw
w4..w...wF..w
wwwwwwwwwwwww`,test_10:`wwwwwwwwwwwww
w...w..rw...w
w...wA..w...w
w...w..GwC..w
wwRwwwwSwwwww
w...w..1w..5w
w4..wG..w..Cw
w...w...w...w
wwwwwwQwwwVww
w...w...wx.hw
w...wv..w...w
w...w...w...w
wwwwwwwwwwwww`,test_11:`wwwwwwwwwwwww
w...w3..w1.Aw
w...w.2.Yq..w
w...w...w...w
wwwwwwSwwQwww
w...w...w...w
w.G.w...w...w
ws..wF..w..Gw
wwwwwwwwwwVww
w...w.F.w.r.w
w...w...w...w
wx..w...w...w
wwwwwwwwwwwww`,test_12:`wwwwwwwwwwwww
w.G.w...w...w
w...w...w...w
w...w.v.wG..w
wwwwwwwwwwwww
wq..w.f.w...w
w...w.x.w...w
w...w...w...w
wwwYwwQwwwwww
w.E.w...w..Ew
w6.AR..1w.4.w
w...w...ws..w
wwwwwwwwwwwww`,test_2:`wwwwwwwwwwwww
w...w..Ewf..w
w1..Q...w.E.w
w...w...w..xw
wwwwwwwwwwwww
w.v.w...w...w
w..Aw...w...w
w.u.w...w5H.w
wwwwwwwwwwwVw
wH..w...w...w
w2..w...w...w
w...w..qw.3.w
wwwwwwwwwwwww`,test_3:`wwwwwwwwwwwww
w...w...w...w
wCE.w...w...w
wA..w...w.h.w
wwwwwwwwwwwUw
w...w...w...w
w.x.w...w...w
w...w.r.w.4.w
wwwwwwwwwwwww
wu..w.E.w..sw
w..1w..6w...w
w...S..3wC..w
wwwwwwwwwwwww`,test_4:`wwwwwwwwwwwww
w..sw...w..Gw
w1..w...Y...w
wA..w.B.w..rw
wwwQwwwwwwwRw
w...wB..w...w
w..Gw.3.w...w
w...w...w...w
wwwwwwSwwwwww
w...wx..w...w
w...w5.ew...w
w...w...w...w
wwwwwwwwwwwww`,test_5:`wwwwwwwwwwwww
w...w..uw.1.w
w...w...w...w
w...wE..w...w
wwwwwwwwwQwww
w...w.5bw...w
wH..wr..wx..w
w...w...w...w
wwwUwwwwwwwww
wA..w...w...w
w.E.w.H.w...w
w.4.wg.vw...w
wwwwwwwwwwwww`,test_6:`wwwwwwwwwwwww
w...wGf.wC..w
w...w...w4..w
w..Cw...wx..w
wwwwwwwwwwwww
wv..w..1w.s.w
w...w..Aw...w
w...V..5w...w
wwwwwQwwwwwww
w...w...w.G.w
w...w..qw...w
w..yw...w...w
wwwwwwwwwwwww`,test_7:`wwwwwwwwwwwww
w...w.61w...w
w...w..Bw...w
w.u.Q...R.q.w
wwwwwwwwwwwww
w...wC..w...w
w.x.w..4w.A.w
w.e.w...wB.sw
wwwwwwwUwwwww
w...w...w...w
w...w...wC..w
w...w...w...w
wwwwwwwwwwwww`,test_8:`wwwwwwwwwwwww
w..Bw1.4w...w
w..sw...w...w
w...w...w...w
wwwwwwQwwwwww
w...w...w...w
w...w...w.f.w
w...w...wC.yw
wwwwwwwwwwwww
w..Aw.2.wg..w
wB..w...w...w
w6..Y..Cw.x.w
wwwwwwwwwwwww`,test_9:`wwwwwwwwwwwww
w...wE.3w...w
w...w...w...w
w...w...U..4w
wwwwwwwwwwwww
w...w.E.w.y.w
w..Cw..hw...w
w...w.x.w.rAw
wwwwwwwwwwwww
w...w.g.w..5w
w...w.C.V...w
w...w...Y...w
wwwwwwwwwwwww`,transfer_1:`wwwwwwwwwwwww
wx.Ew53.V...w
w...wA..w..hw
w...w...w.r.w
wwwwwwSwwwwww
ws..w...w...w
w...w...w..1w
w...w..Gw...w
wwwwwwwwwwQww
w..6w...w...w
wG..w4..w...w
wE..w...w...w
wwwwwwwwwwwww`,transfer_10:`wwwwwwwwwwwww
w...wE..w1..w
wG..w...wr..w
wh..w...w...w
wwwwwwwwwwwww
wE..w...w.v.w
w...w...w..Aw
wx..w...w.C.w
wwwwwwwwwwwww
w...w...w.G.w
w6..w.C.w...w
w..3w..yw...w
wwwwwwwwwwwww`,transfer_11:`wwwwwwwwwwwww
w...w...w...w
w..5w1..wu..w
w...Q...w...w
wwYwwwwwwwwww
w...w...R4.qw
w...w.F.w...w
w...w.x.w..Aw
wwwwwwwwwUwww
w...w.hFw...w
w...w...wr..w
w...w...w...w
wwwwwwwwwwwww`,transfer_12:`wwwwwwwwwwwww
w.B.w...w..hw
w.x.wf..w4..w
w...w.G.U...w
wwwwwwwwwVwYw
w...w...w...w
w...w...wA.6w
w...wG..w.v.w
wwSwwwwwwwwww
w...w...w..Cw
w...w.C.w...w
w...w..Bw...w
wwwwwwwwwwwww`,transfer_13:`wwwwwwwwwwwww
w...w...w...w
w...wy..ws.hw
w...w...w...w
wwwwwwwwwwRww
w..cw...w...w
w...w...w32Aw
w...U...w.f.w
wwwwwwwwwwwSw
w...w...w...w
w.x.V.5.Y..6w
w...w...w...w
wwwwwwwwwwwww`,transfer_14:`wwwwwwwwwwwww
w...w1..wq..w
w...w...w...w
w...w...w...w
wwwwwwwwwwwRw
w.x.w...w...w
w...w...w.2.w
w5..w...w...w
wwwwwwwwwUwww
w.r.w...w..cw
w...w...w.A.w
w...ws..Yu.4w
wwwwwwwwwwwww`,transfer_15:`wwwwwwwwwwwww
w..3w...w...w
w..Gw...w...w
w.b.S.C.w..xw
wwwwwwwwwwwww
w.h.wC..w.v.w
w...we..w...w
w...w6..w...w
wwwwwwwwwwwww
w...w...R.u.w
w...w.A.w...w
w...wG2.w...w
wwwwwwwwwwwww`,transfer_16:`wwwwwwwwwwwww
w..4w...w...w
wBF.w...w...w
w...w...w...w
wwwwwwwwwwwww
wF..w1.Gw.B.w
w.A.Y...w...w
w6..w...w..rw
wwwwwwwwwSwww
w...wx..w...w
wG..w...w2..w
w..uw...w...w
wwwwwwwwwwwww`,transfer_17:`wwwwwwwwwwwww
w..1w...w...w
w...w..sw...w
w...w...w..xw
wwwwwwYwwwwww
w.E.w..6w..2w
w...w.E.w...w
wAv.w...w...w
wwwwwwwwwwwww
w..bw4..U...w
w...w..gw...w
w5..V...w...w
wwwwwwwwwwwww`,transfer_18:`wwwwwwwwwwwww
w...w.ACw.2.w
wg.Cw..yw...w
w.u.w...w...w
wwwwwwwwwwwRw
wb..w...Q...w
w...ws..w...w
wq..w...w..rw
wwwwwwwwwwwww
w...w...w...w
w...w...w...w
w.x.w...w...w
wwwwwwwwwwwww`,transfer_19:`wwwwwwwwwwwww
w...w.3.wq..w
wx..S...w...w
w...w...w...w
wwwVwwwwwwRww
w..Hw.G.w..rw
w...w..fw...w
w.B.w...w.ABw
wwwwwwwwwwwww
w...wG..w...w
w...w...w...w
w...w..Hw..1w
wwwwwwwwwwwww`,transfer_2:`wwwwwwwwwwwww
w..Cw...w...w
w...w...w.B.w
w.u.w.BFw...w
wwwwwwwwwwwww
w...w.x.w...w
w.2.V...w...w
w5..w...Q...w
wwYwwwwwwwwww
w...w...w...w
w..Fw.C.w...w
w...wr.Awq..w
wwwwwwwwwwwww`,transfer_20:`wwwwwwwwwwwww
w.C.w...Y...w
w...w...wv..w
w.s.w.E.w...w
wwwwwwwwwwwww
w...w...w.C.w
w...w...w...w
wx..w...w.G.w
wwwwwwwwwSwww
wG..R...w...w
w.2.w...w..Bw
w.A.wB..w.Efw
wwwwwwwwwwwww`,transfer_3:`wwwwwwwwwwwww
w...w..Cw...w
w...w...wB..w
w..ew...w.y.w
wwwwwwwwwwwww
wAhBw..xw..Gw
w...w...w...w
w.u.wG..w...w
wwwwwwwwwwwww
w1..w2..S...w
w...w...w...w
w...Q..Cw...w
wwwwwwwwwwwww`,transfer_4:`wwwwwwwwwwwww
wH.vw...w...w
w...w...w..Bw
w.A.w.B.w.s.w
wwwwwwwwwwwSw
wH.4w...w...w
w...w...w..xw
w.u.w...w..2w
wwwwwwwwwwwww
w...V...w...w
w...w...w...w
w..qw...w...w
wwwwwwwwwwwww`,transfer_5:`wwwwwwwwwwwww
w...w...wAE.w
w..uw...w..Cw
w...w...w...w
wSwQwwwwwwwww
w..Ew...w...w
w...wx..Y...w
w3..w..hw..6w
wwwwwwwwwwUww
w...w...wC..w
w5..w...w...w
w..rw...w.4.w
wwwwwwwwwwwww`,transfer_6:`wwwwwwwwwwwww
w...V..rw...w
wg.Cw.C.w...w
w...w...w...w
wSwwwwwwwwwww
w..Aw...w...w
w...w...w...w
wy.3w..xw...w
wRwwwwYwwwwww
w...w...w.q.w
w4..U..6w...w
w...w...w...w
wwwwwwwwwwwww`,transfer_7:`wwwwwwwwwwwww
w...w...w.A.w
w...wv..Q.F.w
w.q.w...w..yw
wwwwwwwwwwwww
w.x.wEF.w...w
w..Cw...w...w
w...w...w3..w
wwwwwwwwwwwSw
w.E.w...w...w
w5..w6..wC..w
w...V...w...w
wwwwwwwwwwwww`,transfer_8:`wwwwwwwwwwwww
w6.Ew.Fxwu..w
w...w...w...w
w...w...w...w
wYwwwwwwwwwww
w...w...w...w
w..Fw...w..Gw
w...w...w.y.w
wwSwwwRwwwwww
wE..w...Q...w
w..Aw..cw...w
w.G.w...w1..w
wwwwwwwwwwwww`,transfer_9:`wwwwwwwwwwwww
w...w...w...w
w2..w..xw...w
w...R..gw...w
wwwwwwwwwwwww
wv..w...w...w
w...w...w...w
w...w...w.y.w
wUQwwYwwwwwSw
w..4w...w...w
w.H.w.6.w5..w
wA..w...V..Hw
wwwwwwwwwwwww`}},sokoban_vgfmri3:{description:`BasicGame square_size=20
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`}},tutorial:{description:`BasicGame
    SpriteSet
    	floor > Immovable img=colors/LIGHTGRAY
    	thing > RandomNPC img=colors/PURPLE speed=0.1
    	thingtwo > Immovable img=colors/LIGHTBLUE 
    	thingthree > Immovable img=colors/BROWN
        apple > Immovable img=colors/RED
        bullet > Flicker img=colors/WHITE limit=5 singleton=True
        avatar > ShootAvatar stype=bullet img=colors/DARKBLUE speed=1
        wall > Immovable img=colors/DARKGRAY
    LevelMapping
        . > floor
        a > floor apple
        t > floor thing
        c > floor thingtwo
        p > floor thingthree
        w > floor wall
        A > floor avatar
    InteractionSet
        thing bullet > transformTo stype=thingtwo
        apple avatar > killSprite
	avatar thingthree > killSprite
        avatar wall > stepBack
        thing wall > stepBack
    TerminationSet
        SpriteCounter stype=avatar  limit=0 win=False
        SpriteCounter stype=thing  limit=0 win=False
        SpriteCounter stype=apple limit=0 win=True
        Timeout limit=3000 win=False`,levels:{0:`wwwwwwwwwwwwwwwwwwwwwwwwww
wA.......................w
w.......t........t.......w
w........................w
w........................w
w....................a...w
w..........a.............w
w........................w
w.........aaaaa..........w
wwwwwwwwwwwwwwwwwwwwwwwwww`,1:`wwwwwwwwwwwwwwwwwwwwwwwwww
wA..p....................w
w................c.......w
w......t.....a...........w
wwww.....................w
w.aw.................a...w
w.ww.......a.............w
w..............c.........w
w....................t...w
wwwwwwwwwwwwwwwwwwwwwwwwww`}},zelda_vgfmri3:{description:`BasicGame
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
wwwwwwwwwwwwwwwwwwwww`}}};var xe="https://dthc03qo05lda.cloudfront.net";function Xe({datasetRoot:r=null,hostname:w="",fetchManifest:e=fetch}={}){let t=["localhost","127.0.0.1",""].includes(w)?"":xe,s=r==null?null:r.replace(/\/+$/,""),i=s==null?"catalogue-data/manifest.json":`${s}/website-assets/replays/manifest.json`,o;async function a(c){if(s==null)return t?`${t}/${c}`:`data/${c}`;let h=/^llm_catalogue\/(cohort[34]|lrm-cr|lrm-ao)\/(.+)\/([^/]+)\.replay\.json\.gz$/.exec(c);if(h){o||=e(i).then(async d=>{if(!d.ok)throw new Error(`Unable to load interactive catalogue: ${d.status}`);return d.json()}).catch(d=>{throw o=null,d});let[,p,m,_]=h,u=(await o)[p]?.[m]?.replays?.[_];if(!u)throw new Error(`Replay is not listed: ${c}`);c=u}return`${s}/${c}`}function l(c){return s==null?`${t||"data"}/rdms_unit8_for_website/${c}`:`${s}/website-assets/rdms/${c}`}return{catalogueManifestUrl:i,resolveReplayUrl:a,resolveRdmUrl:l}}var Ae=globalThis.location?.hostname||"",fr=["localhost","127.0.0.1",""].includes(Ae)?"":xe,{catalogueManifestUrl:Pw,resolveReplayUrl:Mw,resolveRdmUrl:ye}=Xe({datasetRoot:globalThis.REASON_TO_PLAY_DATA?.datasetRoot,hostname:Ae});function Ee(r){if(!r.delta_encoded)return;let w=r.states;if(!w||w.length<2){delete r.delta_encoded;return}let e=w[0].sprites;for(let t=1;t<w.length;t++){if(!("sprites"in w[t]))w[t].sprites=Object.assign({},e);else{let s=Object.assign({},e,w[t].sprites);for(let i in s)s[i]===null&&delete s[i];w[t].sprites=s}e=w[t].sprites}delete r.delta_encoded}function qw(r,w){if(r===w)return!0;if(!r||!w||typeof r!="object"||typeof w!="object")return!1;let e=Object.keys(r);return e.length===Object.keys(w).length&&e.every(t=>Object.hasOwn(w,t)&&r[t]===w[t])}function Ze(r,w){return w&&r.length===w.length&&r.every((e,t)=>{let s=w[t];return e.id===s.id&&e.key===s.key&&e.col===s.col&&e.row===s.row&&e.alive===s.alive&&qw(e.resources,s.resources)&&qw(e.orientation,s.orientation)})}function Je(r){if(!r||!Array.isArray(r.states)||r.states.length===0)throw new Error("Replay has no embedded trajectory");Ee(r);let w={},e={},t=r.states.map(({score:a,time:l,level:c,sprites:h})=>{let p={};for(let[m,_]of Object.entries(h))p[m]=_===w[m]||Ze(_,e[m])?e[m]:_.map(({id:u,key:d,col:g,row:f,alive:x,resources:Be,orientation:Ge})=>({id:u,key:d,col:g,row:f,alive:x,resources:Be,orientation:Ge}));return w=h,qw(p,e)||(e=p),{score:a,time:l,level:c,sprites:e}}),s={game_description:r.game_description,states:t,steps:(r.steps||[]).filter(a=>typeof a.action=="string"&&!a.action.startsWith("_")).map(({action:a,level:l,state_index:c,frame_idx:h,response:p,hidden_reasoning:m})=>({action:a,level:l,state_index:c,frame_idx:h,response:{rationale:p?.rationale},hidden_reasoning:m}))},i=new WeakSet;function o(a){if(!(!a||typeof a!="object"||i.has(a))){i.add(a);for(let l of Object.values(a))o(l);Object.freeze(a)}}return o(s),s}async function wt(r,{tries:w=3,baseDelayMs:e=250}={}){let t;for(let s=0;s<w;s++){try{let i=await fetch(r);if(i.ok||i.status<500&&i.status!==429)return i;t=new Error("HTTP "+i.status)}catch(i){t=i}if(s<w-1){let i=e*Math.pow(2,s)+Math.random()*200;await new Promise(o=>setTimeout(o,i))}}throw t||new Error("Replay request failed")}async function et(r){let w=await wt(r);if(!w.ok)throw new Error("HTTP "+w.status);let e=r.split("?")[0].endsWith(".gz")?await new Response(w.body.pipeThrough(new DecompressionStream("gzip"))).text():await w.text();return JSON.parse(e)}function be(r=et){let w=new Map;return{has:e=>w.has(e),peek:e=>w.get(e)?.data,load(e){if(w.has(e))return w.get(e).promise;let t={};return t.promise=Promise.resolve().then(()=>r(e)).then(s=>(t.data=Je(s),t.data)).catch(s=>{throw w.delete(e),s}),w.set(e,t),t.promise}}}Se();var vw=["bait_vgfmri3","chase_vgfmri3","helper_vgfmri3","lemmings_vgfmri3","zelda_vgfmri3","plaqueAttack_vgfmri3"],xw=["bait_vgfmri4","chase_vgfmri4","helper_vgfmri4","lemmings_vgfmri4","zelda_vgfmri4","avoidGeorge_vgfmri4"],tt=[{id:"cohort3",title:"Cohort 3 (vgfmri3)",games:vw,type:"human",cohort:"vgfmri3"},{id:"cohort4",title:"Cohort 4 (vgfmri4)",games:xw,type:"human",cohort:"vgfmri4"},{id:"lrm-cr",title:"Large Reasoning Models -- Copied-reasoning",games:[...vw,...xw],type:"llm",rationale_mode:"copied-reasoning",suggestion_level:"elaborate"},{id:"lrm-ao",title:"Large Reasoning Models -- Action-only",games:[...vw,...xw],type:"llm",rationale_mode:"action-only",suggestion_level:"elaborate"}],rt={bait_vgfmri3:"Bait (v3)",bait_vgfmri4:"Bait (v4)",chase_vgfmri3:"Chase (v3)",chase_vgfmri4:"Chase (v4)",helper_vgfmri3:"Helper (v3)",helper_vgfmri4:"Helper (v4)",lemmings_vgfmri3:"Lemmings (v3)",lemmings_vgfmri4:"Lemmings (v4)",zelda_vgfmri3:"Zelda (v3)",zelda_vgfmri4:"Zelda (v4)",plaqueAttack_vgfmri3:"Plaque Attack (v3)",avoidGeorge_vgfmri4:"Avoid George (v4)"},st={bait_vgfmri3:"Bait",bait_vgfmri4:"Bait",chase_vgfmri3:"Chase",chase_vgfmri4:"Chase",helper_vgfmri3:"Helper",helper_vgfmri4:"Helper",lemmings_vgfmri3:"Lemmings",lemmings_vgfmri4:"Lemmings",zelda_vgfmri3:"Zelda",zelda_vgfmri4:"Zelda",plaqueAttack_vgfmri3:"Plaque Attack",avoidGeorge_vgfmri4:"Avoid George"},it=18,ke=20,ot=300,at=700,yw={};async function lt(){let r=await fetch(Pw);if(!r.ok)throw new Error(`Failed to load ${Pw}`);yw=await r.json()}var nt=ye("manifest.json"),Ce=new Set;async function ct(){try{let r=await fetch(nt);if(!r.ok)return;let w=await r.json();for(let e of w.units||[])Ce.add(`${e.subject}|${String(e.game).toLowerCase()}`)}catch{}}var Vw=be();function ht(r){let w=yw[r];return w?Object.keys(w).sort():[]}function pt(r,w){return yw[r]?.[w]?.stats||{wins:0,losses:0}}function Yw(r,w,e){return yw[r]?.[w]?.replays?.[e]||null}function Re(r,w){let e={};for(let[t,s]of Object.entries(r.sprites))e[t]=s.map(i=>({id:i.id,key:i.key,x:i.col*w,y:i.row*w,w,h:w,alive:i.alive,resources:i.resources||{},speed:i.speed,cooldown:i.cooldown,orientation:i.orientation,_age:i._age,lastmove:i.lastmove}));return{score:r.score,time:r.time,sprites:e}}var B=class{constructor(w,e,t,s){this.gameName=e,this.playbackMode=t,this.subject=null,this.replayData=null,this.s3Key=null,this.states=[],this.steps=[],this.totalFrames=0,this.currentFrameIndex=0,this.currentStepIndex=0,this.playing=!1,this.playTimer=null,this.streamTimer=null,this.streamedChars=0,this._fullRationale="",this.currentLevel=null,this.currentLevelNum=-1,this.game=null,this.renderer=null,this.levels={},this._build(w,s)}_build(w,e){let t=document.createElement("div");t.className="game-card",this.titleEl=document.createElement("a"),this.titleEl.className="game-card-title",this.titleEl.textContent=e?rt[this.gameName]||this.gameName:st[this.gameName]||this.gameName,this.titleEl.addEventListener("click",()=>this._openFullViewer()),t.appendChild(this.titleEl),this.canvasContainer=document.createElement("div"),this.canvasContainer.className="canvas-container",this.canvas=document.createElement("canvas"),this.canvasContainer.appendChild(this.canvas),this.overlay=document.createElement("div"),this.overlay.className="canvas-overlay",this.overlay.textContent="Loading...",this.canvasContainer.appendChild(this.overlay),this.playIndicator=document.createElement("div"),this.playIndicator.className="play-indicator",this.playIndicator.innerHTML='<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>',this.canvasContainer.appendChild(this.playIndicator),this.canvasContainer.addEventListener("click",l=>{this.overlay.classList.contains("hidden")&&(l.stopPropagation(),this.togglePlay())}),t.appendChild(this.canvasContainer);let s=document.createElement("div");s.className="card-drawer-anchor";let i=document.createElement("div");i.className="card-drawer";let o=document.createElement("div");o.className="card-drawer-inner",this.scrubber=document.createElement("input"),this.scrubber.type="range",this.scrubber.min=0,this.scrubber.max=0,this.scrubber.value=0,this.scrubber.addEventListener("input",()=>{this._updatingScrubber||(this.stop(),this._goToIndex(parseInt(this.scrubber.value)))}),o.appendChild(this.scrubber);let a=document.createElement("div");if(a.className="flap-tabs",this.descTab=this._makeTab("Game Description","flap-tab-desc"),this.levelTab=this._makeTab("Level Layout","flap-tab-level"),this.tryTab=this._makeTab("Try Yourself","flap-tab-try"),a.appendChild(this.descTab),a.appendChild(this.levelTab),a.appendChild(this.tryTab),o.appendChild(a),this.descPanel=this._makePanel("flap-panel-desc"),this.descTextarea=this._makeTextarea(120),this.descPanel.appendChild(this.descTextarea),o.appendChild(this.descPanel),this.levelPanel=this._makePanel("flap-panel-level"),this.levelTextarea=this._makeTextarea(80),this.levelPanel.appendChild(this.levelTextarea),o.appendChild(this.levelPanel),this.descTab.addEventListener("click",()=>this._toggleFlap("desc")),this.levelTab.addEventListener("click",()=>this._toggleFlap("level")),this.tryTab.addEventListener("click",()=>this._openTryPage()),this.playbackMode==="llm"){let l=document.createElement("div");l.className="reasoning-stripe no-reasoning",this.reasoningText=document.createElement("div"),this.reasoningText.className="reasoning-text",this.reasoningText.textContent="",l.appendChild(this.reasoningText);let c=document.createElement("div");c.className="click-hint",c.textContent="Click to open full viewer",l.appendChild(c),this.reasoningStripe=l,l.addEventListener("click",()=>this._openFullViewer()),o.appendChild(l)}else this.reasoningStripe=null,this.reasoningText=null;i.appendChild(o),s.appendChild(i),t.appendChild(s),w.appendChild(t),this.cardEl=t}_makeTab(w,e){let t=document.createElement("button");return t.className="flap-tab "+e,t.textContent=w,t}_makePanel(w){let e=document.createElement("div");return e.className="flap-panel "+w,e}_makeTextarea(w){let e=document.createElement("textarea");return e.readOnly=!0,e.spellcheck=!1,e.style.height=w+"px",e}_toggleFlap(w){let e=[{tab:this.descTab,panel:this.descPanel,id:"desc"},{tab:this.levelTab,panel:this.levelPanel,id:"level"}];for(let t of e)if(t.id===w){let s=!t.panel.classList.contains("open");if(t.panel.classList.toggle("open"),t.tab.classList.toggle("active"),!s)continue}else t.panel.classList.remove("open"),t.tab.classList.remove("active")}_currentIndex(){return this.playbackMode==="human"?this.currentFrameIndex:this.currentStepIndex}_maxIndex(){return this.playbackMode==="human"?Math.max(0,this.totalFrames-1):Math.max(0,this.steps.length-1)}async load(w,e){let t=(this._loadRequest||0)+1;this._loadRequest=t;let s=()=>!this.destroyed&&t===this._loadRequest;if(this.stop(),this.s3Key=w,!w)return this.overlay.textContent="No replay available",this.overlay.classList.remove("hidden"),!1;try{let i=e||await Mw(w);if(!s())return!1;if(!i)throw new Error("Failed to resolve replay URL");let o=Vw.peek(i);o||(this.overlay.textContent="Loading...",this.overlay.classList.remove("hidden"));let a=o||await Vw.load(i);if(!s())return!1;this.replayData=a,this.states=a.states,this.steps=a.steps,this.totalFrames=this.states.length;let l=ve[this.gameName];if(!l)throw new Error("Unknown game: "+this.gameName);if(this.playbackMode==="human"&&!a.game_description)throw new Error(this.gameName+": human replay missing game_description field");return this.activeDesc=a.game_description||l.description,this.game=new gw().parseGame(this.activeDesc),this.renderer=new Sw(this.canvas,it),this.levels=l.levels||{},this.currentLevel=null,this.currentLevelNum=-1,this.currentFrameIndex=0,this.currentStepIndex=0,this.descTextarea.value=this.activeDesc,this.scrubber.max=this._maxIndex(),this.scrubber.value=0,this._initialLoad=!0,this._goToIndex(0),this._initialLoad=!1,this.overlay.classList.add("hidden"),!0}catch{return s()&&this.showLoadError(),!1}}showLoadError(){this.destroyed||(this.overlay.textContent="Failed to load replay",this.overlay.classList.remove("hidden"))}_buildLevel(w){if(w===this.currentLevelNum)return;let e=this.levels[w];if(!e)return;this.currentLevel=this.game.buildLevel(e),this.currentLevelNum=w,this.renderer.resize(this.currentLevel.width,this.currentLevel.height),this.levelTextarea.value=e;let t=e.split(`
`).filter(i=>i.length>0);this.levelTextarea.style.height=Math.min(t.length*14+8,160)+"px";let s=this.currentLevel.sprite_registry._liveSpritesByKey.wall;if(s&&s.length>0){let i=s[0].color;i&&(this.canvasContainer.style.background=`rgb(${i[0]},${i[1]},${i[2]})`)}}_goToIndex(w){this.playbackMode==="human"?this._goToFrame(w):this._goToStep(w)}_goToFrame(w){if(!this.states.length)return;w=Math.max(0,Math.min(w,this.totalFrames-1)),this.currentFrameIndex=w;let e=this.states[w],t=e.level!==void 0?e.level:0;this._buildLevel(t),this.currentLevel&&(this.currentLevel.setGameState(Re(e,this.currentLevel.block_size)),this.currentLevel.score=e.score,this.currentLevel.time=w,this.renderer.render(this.currentLevel)),this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1}_goToStep(w){if(!this.steps.length)return;w=Math.max(0,Math.min(w,this.steps.length-1)),this.currentStepIndex=w;let e=this.steps[w];this._buildLevel(e.level!==void 0?e.level:0);let t=e.state_index!==void 0?e.state_index:e.frame_idx!==void 0?e.frame_idx:w;if(t>=0&&t<this.states.length&&this.currentLevel){let s=this.states[t];this.currentLevel.setGameState(Re(s,this.currentLevel.block_size)),this.currentLevel.score=s.score,this.currentLevel.time=s.time,this.renderer.render(this.currentLevel)}this._updatingScrubber=!0,this.scrubber.value=w,this._updatingScrubber=!1,this._updateReasoning(e)}_updateReasoning(w){if(this._stopStream(),!this.reasoningStripe){this.playing&&this._scheduleNoReasoningAdvance();return}let t=(w.response||{}).rationale||w.hidden_reasoning||"";if(!t){this.reasoningStripe.classList.add("no-reasoning"),this.reasoningText.textContent=this.playing?w.action||"--":"",this.playing&&this._scheduleNoReasoningAdvance();return}if(this.reasoningStripe.classList.remove("no-reasoning"),!this.playing){this.reasoningText.textContent=this._initialLoad?"":t;return}this.streamedChars=0,this._fullRationale=t,this.reasoningText.textContent="",this._streamStartTime=performance.now(),this._streamDurationMs=Math.min(t.length/ot*1e3,at),this._streamTick()}_streamTick(){let w=performance.now()-this._streamStartTime,e=Math.min(1,w/this._streamDurationMs),t=Math.round(e*this._fullRationale.length);this.reasoningText.textContent=this._fullRationale.slice(0,t),this.reasoningStripe.scrollTop=this.reasoningStripe.scrollHeight,e<1?this.streamTimer=requestAnimationFrame(()=>this._streamTick()):(this.streamTimer=null,this._onStreamDone())}_onStreamDone(){if(this.playing){if(this._currentIndex()>=this._maxIndex()){this.stop();return}this._goToIndex(this._currentIndex()+1)}}_scheduleNoReasoningAdvance(){this.playTimer=setTimeout(()=>this._onStreamDone(),1e3/ke)}_stopStream(){this.streamTimer&&(cancelAnimationFrame(this.streamTimer),this.streamTimer=null)}togglePlay(){this.playing?this.stop():this.play()}_flashIndicator(w){let e=w==="pause"?'<svg viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>':'<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>';this.playIndicator.innerHTML=e,this.playIndicator.classList.add("flash"),clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>this.playIndicator.classList.remove("flash"),400)}play(){this.playing=!0,this.cardEl.classList.add("is-playing"),this._flashIndicator("play"),this.playbackMode==="llm"?this.steps.length&&this._updateReasoning(this.steps[this.currentStepIndex]):this._scheduleNextFrame()}stop(){this.playing=!1,this.cardEl.classList.remove("is-playing"),this._flashIndicator("pause"),this._stopStream(),this.playTimer&&(clearTimeout(this.playTimer),this.playTimer=null)}_scheduleNextFrame(){if(!this.playing||this.currentFrameIndex>=this.totalFrames-1){this.stop();return}this.playTimer=setTimeout(()=>{this.playing&&(this._goToFrame(this.currentFrameIndex+1),this._scheduleNextFrame())},1e3/ke)}_openFullViewer(){if(this.playbackMode==="human"&&this.subject){let e=this.gameName.replace(/_vgfmri\d+$/,"");if(Ce.has(`${this.subject}|${e.toLowerCase()}`)){let t=new URLSearchParams({subject:this.subject,game:e,stream:"main"});window.location.href="representation.html?"+t.toString();return}}if(!this.s3Key)return;let w="replay.html?grid-key="+encodeURIComponent(this.s3Key)+"&step="+this.currentStepIndex;window.location.href=w}_openTryPage(){let w=this.currentLevelNum>=0?this.currentLevelNum:0,e="interactive-gameplay.html?game="+encodeURIComponent(this.gameName)+"&level="+w;this.s3Key&&(e+="&replay="+encodeURIComponent(this.s3Key)),window.location.href=e}destroy(){this.stop(),this.destroyed=!0,clearTimeout(this._flashTimer),this.replayData=null,this.states=[],this.steps=[],this.currentLevel=null,this.game=null,this.renderer=null,this.cardEl?.remove()}},mt=4,z=[],Nw=0;async function Aw(r,w,e=!1){try{let t=w?await Mw(w):null;if(r.destroyed)return;if(t&&Vw.has(t)){await r.load(w,t);return}let s={card:r,s3Key:w,url:t,priority:e},i=e?z.findIndex(o=>!o.priority):-1;i===-1?z.push(s):z.splice(i,0,s),_t()}catch{r.showLoadError()}}async function _t(){if(!(Nw>=mt)){Nw++;try{for(;z.length>0;){let{card:r,s3Key:w,url:e}=z.shift();r.destroyed||await r.load(w,e)}}finally{Nw--}}}var Dw=class{constructor(w,e){this.def=e,this.cards=[],this.subjects=[],this.activeSubject=null,this.el=document.createElement("div"),this.el.className="cohort-section";let t=document.createElement("h2");t.className="cohort-heading",t.textContent=e.title,this.el.appendChild(t),this.selectorRow=document.createElement("div"),this.selectorRow.className="selector-row",this.el.appendChild(this.selectorRow),this.gridContainer=document.createElement("div"),this.el.appendChild(this.gridContainer),w.appendChild(this.el)}populate(){this.subjects=ht(this.def.id),this._buildTabs(),this.subjects.length>0&&this.select(this.subjects[0])}_buildTabs(){this.selectorRow.innerHTML="";for(let w of this.subjects){let e=document.createElement("button");e.className="selector-tab";let t=pt(this.def.id,w),s=this.def.type==="llm"?w.split("/").pop():w;e.innerHTML=`${s} <span class="stats">${t.wins}W/${t.losses}L</span>`,e.addEventListener("click",()=>this.select(w,!0)),this.selectorRow.appendChild(e)}}async select(w,e=!1){this.activeSubject=w,this.selectorRow.querySelectorAll(".selector-tab").forEach((a,l)=>{a.classList.toggle("active",this.subjects[l]===w)});for(let a of this.cards)a.destroy();this.cards=[],this.gridContainer.innerHTML="";let s=this.def.type==="llm",i=s?"llm":"human",o=this.def.games;if(s){let a=document.createElement("div");a.className="cohort-block-label",a.textContent="vgfmri3 games",this.gridContainer.appendChild(a);let l=document.createElement("div");l.className="game-grid",this.gridContainer.appendChild(l);for(let m of vw){let _=new B(l,m,i,!0);_.subject=w,this.cards.push(_),Aw(_,Yw(this.def.id,w,m),e)}let c=document.createElement("hr");c.className="cohort-block-separator",this.gridContainer.appendChild(c);let h=document.createElement("div");h.className="cohort-block-label",h.textContent="vgfmri4 games",this.gridContainer.appendChild(h);let p=document.createElement("div");p.className="game-grid",this.gridContainer.appendChild(p);for(let m of xw){let _=new B(p,m,i,!0);_.subject=w,this.cards.push(_),Aw(_,Yw(this.def.id,w,m),e)}}else{let a=document.createElement("div");a.className="game-grid",this.gridContainer.appendChild(a);for(let l of o){let c=new B(a,l,i,!1);c.subject=w,this.cards.push(c),Aw(c,Yw(this.def.id,w,l),e)}}}};async function ut(){let r=document.querySelectorAll(".cat-embed-card");if(r.length>0){for(let t of r){let s=t.dataset.game,i=t.dataset.mode||"llm",o=t.dataset.path;if(!s||!o){console.warn("cat-embed-card missing data-game or data-path",t);continue}let a=new B(t,s,i,!0);Aw(a,o)}return}let w=document.getElementById("catalogue-root");if(!w)return;let e=new URLSearchParams(window.location.search);if(e.get("single")==="1"){let a=function(c){return s.length===1&&i.endsWith(".replay.json.gz")?i:`${i.replace(/\/+$/,"")}/${c}.replay.json.gz`},s=(e.get("games")||e.get("game")||"").split(",").map(c=>c.trim()).filter(Boolean),i=e.get("path")||"",o=e.get("mode")||"llm";if(s.length===0||!i){w.innerHTML='<div class="catalogue-loading">single mode needs ?games= and ?path=</div>';return}let l=e.get("autoplay")==="1";w.innerHTML="",w.classList.add("single-card-root"),s.length>1&&w.classList.add("multi-card-root");for(let c of s){let h=document.createElement("div");h.className="single-card-slot",w.appendChild(h);let p=new B(h,c,o,!0),m=p.load(a(c));l&&m.then(_=>{_&&!p.destroyed&&p.play()})}return}await Promise.all([lt(),ct()]),w.innerHTML="";for(let t of tt)new Dw(w,t).populate()}ut();})();
