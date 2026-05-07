(() => {
  // engine/registry.js
  var OntologyRegistry = class {
    constructor() {
      this._register = {};
    }
    has(key) {
      return key in this._register;
    }
    register(key, cls) {
      this._register[key] = cls;
    }
    registerClass(cls) {
      this.register(cls.name, cls);
    }
    request(key) {
      if (!(key in this._register)) {
        throw new Error(`Unknown registry key: '${key}'`);
      }
      return this._register[key];
    }
    registerAll(entries) {
      for (const [key, value] of Object.entries(entries)) {
        this.register(key, value);
      }
    }
  };
  var registry = new OntologyRegistry();

  // engine/rect.js
  var Rect = class _Rect {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    // Factory from position tuple and size tuple (pygame-style)
    static fromPosSize(pos, size) {
      return new _Rect(pos[0], pos[1], size[0], size[1]);
    }
    get left() {
      return this.x;
    }
    set left(v) {
      this.x = v;
    }
    get top() {
      return this.y;
    }
    set top(v) {
      this.y = v;
    }
    get right() {
      return this.x + this.w;
    }
    get bottom() {
      return this.y + this.h;
    }
    get width() {
      return this.w;
    }
    get height() {
      return this.h;
    }
    get centerx() {
      return this.x + Math.floor(this.w / 2);
    }
    get centery() {
      return this.y + Math.floor(this.h / 2);
    }
    get center() {
      return [this.centerx, this.centery];
    }
    get topleft() {
      return [this.x, this.y];
    }
    get size() {
      return [this.w, this.h];
    }
    // Return a new Rect moved by (dx, dy)
    move(dxOrVec, dy) {
      if (typeof dxOrVec === "object" && dxOrVec !== null) {
        return new _Rect(this.x + dxOrVec.x, this.y + dxOrVec.y, this.w, this.h);
      }
      return new _Rect(this.x + dxOrVec, this.y + dy, this.w, this.h);
    }
    copy() {
      return new _Rect(this.x, this.y, this.w, this.h);
    }
    // AABB overlap test (matching pygame: adjacent rects do NOT collide)
    colliderect(other) {
      return this.x < other.x + other.w && this.x + this.w > other.x && this.y < other.y + other.h && this.y + this.h > other.y;
    }
    // Returns indices of all rects in the list that overlap this one
    collidelistall(others) {
      const result = [];
      for (let i = 0; i < others.length; i++) {
        if (this.colliderect(others[i].rect || others[i])) {
          result.push(i);
        }
      }
      return result;
    }
    // Does this rect fully contain `other`?
    contains(other) {
      return other.x >= this.x && other.y >= this.y && other.x + other.w <= this.x + this.w && other.y + other.h <= this.y + this.h;
    }
    equals(other) {
      return this.x === other.x && this.y === other.y && this.w === other.w && this.h === other.h;
    }
    toString() {
      return `Rect(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };

  // engine/action.js
  var Action = class _Action {
    constructor(...keys) {
      this.keys = Object.freeze([...keys].sort());
    }
    asVector() {
      let x = 0, y = 0;
      for (const k of this.keys) {
        if (k === "LEFT") x -= 1;
        if (k === "RIGHT") x += 1;
        if (k === "UP") y -= 1;
        if (k === "DOWN") y += 1;
      }
      return { x, y };
    }
    equals(other) {
      if (!(other instanceof _Action)) return false;
      if (this.keys.length !== other.keys.length) return false;
      for (let i = 0; i < this.keys.length; i++) {
        if (this.keys[i] !== other.keys[i]) return false;
      }
      return true;
    }
    toString() {
      return this.keys.length === 0 ? "noop" : this.keys.join(",");
    }
  };
  var ACTION = {
    NOOP: new Action(),
    UP: new Action("UP"),
    DOWN: new Action("DOWN"),
    LEFT: new Action("LEFT"),
    RIGHT: new Action("RIGHT"),
    SPACE: new Action("SPACE"),
    SPACE_RIGHT: new Action("SPACE", "RIGHT"),
    SPACE_LEFT: new Action("SPACE", "LEFT")
  };
  var NOOP = ACTION.NOOP;

  // engine/constants.js
  var GREEN = [129, 199, 132];
  var BLUE = [25, 118, 210];
  var RED = [211, 47, 47];
  var GRAY = [69, 90, 100];
  var WHITE = [250, 250, 250];
  var BROWN = [109, 76, 65];
  var BLACK = [55, 71, 79];
  var ORANGE = [230, 81, 0];
  var YELLOW = [255, 245, 157];
  var PINK = [255, 138, 128];
  var GOLD = [255, 196, 0];
  var LIGHTRED = [255, 82, 82];
  var LIGHTORANGE = [255, 112, 67];
  var LIGHTBLUE = [144, 202, 249];
  var LIGHTGREEN = [185, 246, 202];
  var LIGHTGRAY = [207, 216, 220];
  var DARKGRAY = [68, 90, 100];
  var DARKBLUE = [1, 87, 155];
  var PURPLE = [92, 107, 192];
  var LIGHTPURPLE = [200, 150, 220];
  var LIGHTPINK = [255, 230, 230];
  var COLORS = {
    GREEN,
    BLUE,
    RED,
    GRAY,
    WHITE,
    BROWN,
    BLACK,
    ORANGE,
    YELLOW,
    PINK,
    GOLD,
    LIGHTRED,
    LIGHTORANGE,
    LIGHTBLUE,
    LIGHTGREEN,
    LIGHTGRAY,
    DARKGRAY,
    DARKBLUE,
    PURPLE,
    LIGHTPURPLE,
    LIGHTPINK
  };
  var UP = { x: 0, y: -1 };
  var DOWN = { x: 0, y: 1 };
  var LEFT = { x: -1, y: 0 };
  var RIGHT = { x: 1, y: 0 };
  var BASEDIRS = [UP, LEFT, DOWN, RIGHT];
  function vecEquals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  function vecLength(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  function unitVector(v) {
    const len = vecLength(v);
    if (len > 0) {
      return { x: v.x / len, y: v.y / len };
    }
    return { x: 1, y: 0 };
  }

  // engine/physics.js
  var GridPhysics = class {
    constructor(gridsize) {
      if (Array.isArray(gridsize)) {
        this.gridsize = gridsize;
      } else {
        this.gridsize = [gridsize, gridsize];
      }
    }
    passiveMovement(sprite) {
      let speed = sprite.speed === null ? 1 : sprite.speed;
      if (speed !== 0 && sprite.orientation !== void 0) {
        sprite._updatePosition(sprite.orientation, speed * this.gridsize[0]);
      }
    }
    activeMovement(sprite, action, speed) {
      if (speed === void 0 || speed === null) {
        speed = sprite.speed === null ? 1 : sprite.speed;
      }
      if (speed !== 0 && action !== null && action !== void 0) {
        let dir;
        if (action.asVector) {
          dir = action.asVector();
        } else {
          dir = action;
        }
        if (vecEquals(dir, { x: 0, y: 0 })) return;
        sprite._updatePosition(dir, speed * this.gridsize[0]);
      }
    }
    distance(r1, r2) {
      return Math.abs(r1.top - r2.top) + Math.abs(r1.left - r2.left);
    }
  };

  // engine/sprite.js
  var _IMG_COLORS = COLORS;
  var VGDLSprite = class {
    // Class-level defaults (overridden by subclasses)
    static is_static = false;
    static only_active = false;
    static is_avatar = false;
    static is_stochastic = false;
    static color = null;
    static cooldown = 0;
    static speed = null;
    static mass = 1;
    static physicstype = null;
    static shrinkfactor = 0;
    constructor(opts) {
      const {
        key,
        id,
        pos,
        size = [1, 1],
        color,
        speed,
        cooldown,
        physicstype,
        rng,
        img,
        resources,
        ...rest
      } = opts;
      this.key = key;
      this.id = id;
      const sz = Array.isArray(size) ? size : [size, size];
      this.rect = new Rect(pos[0], pos[1], sz[0], sz[1]);
      this.lastrect = this.rect;
      this.alive = true;
      const PhysType = physicstype || this.constructor.physicstype || GridPhysics;
      this.physics = new PhysType(sz);
      this.speed = speed !== void 0 && speed !== null ? speed : this.constructor.speed;
      this.cooldown = cooldown !== void 0 && cooldown !== null ? cooldown : this.constructor.cooldown;
      this.img = img || null;
      this.color = color || this.constructor.color;
      if (this.img && this.img.startsWith("colors/")) {
        const colorName = this.img.split("/")[1];
        const resolved = _IMG_COLORS[colorName];
        if (resolved) this.color = resolved;
      }
      this._effect_data = {};
      this.lastmove = 0;
      this.resources = new Proxy(resources ? { ...resources } : {}, {
        get(target, prop) {
          if (typeof prop === "string" && !(prop in target) && prop !== "toJSON" && prop !== "then" && prop !== Symbol.toPrimitive && prop !== Symbol.toStringTag && prop !== "inspect" && prop !== "constructor" && prop !== "__proto__") {
            return 0;
          }
          return target[prop];
        },
        set(target, prop, value) {
          target[prop] = value;
          return true;
        }
      });
      this.just_pushed = null;
      this.is_static = this.constructor.is_static;
      this.only_active = this.constructor.only_active;
      this.is_avatar = this.constructor.is_avatar;
      this.is_stochastic = this.constructor.is_stochastic;
      this.mass = this.constructor.mass;
      this.shrinkfactor = this.constructor.shrinkfactor;
      this.stypes = [];
      for (const [name, value] of Object.entries(rest)) {
        this[name] = value;
      }
    }
    update(game) {
      this.lastrect = this.rect;
      this.lastmove += 1;
      if (!this.is_static && !this.only_active) {
        this.physics.passiveMovement(this);
      }
    }
    _updatePosition(orientation, speed) {
      let vx, vy;
      if (speed === void 0 || speed === null) {
        const s = this.speed || 0;
        vx = orientation.x * s;
        vy = orientation.y * s;
      } else {
        vx = orientation.x * speed;
        vy = orientation.y * speed;
      }
      if (this.lastmove >= this.cooldown) {
        this.rect = this.rect.move({ x: vx, y: vy });
        this.lastmove = 0;
      }
    }
    get lastdirection() {
      return {
        x: this.rect.x - this.lastrect.x,
        y: this.rect.y - this.lastrect.y
      };
    }
    toString() {
      return `${this.key} '${this.id}' at (${this.rect.x}, ${this.rect.y})`;
    }
  };
  var Resource = class extends VGDLSprite {
    static value = 1;
    static limit = 2;
    static res_type = null;
    constructor(opts) {
      super(opts);
      this.value = opts.value !== void 0 ? opts.value : this.constructor.value;
      this.limit = opts.limit !== void 0 ? opts.limit : this.constructor.limit;
      this.res_type = opts.res_type || this.constructor.res_type;
    }
    get resource_type() {
      if (this.res_type === null) {
        return this.key;
      }
      return this.res_type;
    }
  };
  var Immutable = class extends VGDLSprite {
    static is_static = true;
    update(_game) {
    }
    _updatePosition() {
      throw new Error("Tried to move Immutable");
    }
  };

  // engine/sprites.js
  var Immovable = class extends VGDLSprite {
    static color = GRAY;
    static is_static = true;
  };
  var Passive = class extends VGDLSprite {
    static color = RED;
  };
  var ResourcePack = class extends Resource {
    static is_static = true;
  };
  var Flicker = class extends VGDLSprite {
    static color = RED;
    static limit = 1;
    constructor(opts) {
      super(opts);
      this._age = 0;
      if (opts.limit !== void 0) this.limit = opts.limit;
      else this.limit = this.constructor.limit;
    }
    update(game) {
      super.update(game);
      this._age += 1;
      if (this._age >= this.limit) {
        game.killSprite(this);
      }
    }
  };
  var OrientedSprite = class extends VGDLSprite {
    static draw_arrow = false;
    constructor(opts) {
      super(opts);
      if (this.orientation === void 0) {
        this.orientation = opts.orientation || RIGHT;
      }
    }
  };
  var Missile = class extends OrientedSprite {
    static speed = 1;
  };
  var OrientedFlicker = class extends OrientedSprite {
    static draw_arrow = true;
    static speed = 0;
    constructor(opts) {
      super(opts);
      this._age = 0;
      if (opts.limit !== void 0) this.limit = opts.limit;
      else this.limit = this.constructor.limit || 1;
    }
    update(game) {
      super.update(game);
      this._age += 1;
      if (this._age >= this.limit) {
        game.killSprite(this);
      }
    }
  };
  OrientedFlicker.limit = 1;
  var SpriteProducer = class extends VGDLSprite {
    static stype = null;
  };
  var Portal = class extends SpriteProducer {
    static is_static = true;
    static is_stochastic = true;
    static color = BLUE;
  };
  var SpawnPoint = class extends SpriteProducer {
    static color = BLACK;
    static is_static = true;
    constructor(opts) {
      super(opts);
      this.counter = 0;
      this.prob = opts.prob !== void 0 ? opts.prob : 1;
      this.total = opts.total !== void 0 ? opts.total : null;
      if (opts.cooldown !== void 0) this.cooldown = opts.cooldown;
      else if (this.cooldown === 0) this.cooldown = 1;
      this.is_stochastic = this.prob > 0 && this.prob < 1;
    }
    update(game) {
      if (game.time % this.cooldown === 0 && game.randomGenerator.random() < this.prob) {
        game.addSpriteCreation(this.stype, [this.rect.x, this.rect.y]);
        this.counter += 1;
      }
      if (this.total && this.counter >= this.total) {
        game.killSprite(this);
      }
    }
  };
  var RandomNPC = class extends VGDLSprite {
    static speed = 1;
    static is_stochastic = true;
    update(game) {
      super.update(game);
      const dir = BASEDIRS[Math.floor(game.randomGenerator.random() * BASEDIRS.length)];
      this.physics.activeMovement(this, dir);
    }
  };
  var Chaser = class extends RandomNPC {
    static stype = null;
    constructor(opts) {
      super(opts);
      this.fleeing = opts.fleeing || false;
      this.stype = opts.stype || this.constructor.stype;
    }
    _closestTargets(game) {
      let bestd = 1e100;
      let res = [];
      const targets = game.getSprites(this.stype);
      for (const target of targets) {
        const d = this.physics.distance(this.rect, target.rect);
        if (d < bestd) {
          bestd = d;
          res = [target];
        } else if (d === bestd) {
          res.push(target);
        }
      }
      return res;
    }
    _movesToward(game, target) {
      const res = [];
      const basedist = this.physics.distance(this.rect, target.rect);
      for (const a of BASEDIRS) {
        const r = this.rect.move(a);
        const newdist = this.physics.distance(r, target.rect);
        if (this.fleeing && basedist < newdist) {
          res.push(a);
        }
        if (!this.fleeing && basedist > newdist) {
          res.push(a);
        }
      }
      return res;
    }
    update(game) {
      VGDLSprite.prototype.update.call(this, game);
      let options = [];
      for (const target of this._closestTargets(game)) {
        options.push(...this._movesToward(game, target));
      }
      if (options.length === 0) {
        options = [...BASEDIRS];
      }
      const choice = options[Math.floor(game.randomGenerator.random() * options.length)];
      this.physics.activeMovement(this, choice);
    }
  };
  var Fleeing = class extends Chaser {
    constructor(opts) {
      super({ ...opts, fleeing: true });
    }
  };
  var Bomber = class extends SpawnPoint {
    static color = ORANGE;
    static is_static = false;
    constructor(opts) {
      super(opts);
      if (this.orientation === void 0) {
        this.orientation = opts.orientation || RIGHT;
      }
      this.speed = opts.speed !== void 0 ? opts.speed : 1;
    }
    update(game) {
      this.lastrect = this.rect;
      this.lastmove += 1;
      if (!this.is_static && !this.only_active) {
        this.physics.passiveMovement(this);
      }
      SpawnPoint.prototype.update.call(this, game);
    }
  };
  var Walker = class extends Missile {
    static is_stochastic = true;
    update(game) {
      const lastdir = this.lastdirection;
      if (lastdir.x === 0) {
        let d;
        if (this.orientation.x > 0) d = 1;
        else if (this.orientation.x < 0) d = -1;
        else d = game.randomGenerator.random() < 0.5 ? -1 : 1;
        this.physics.activeMovement(this, { x: d, y: 0 });
      }
      super.update(game);
    }
  };
  var Conveyor = class extends OrientedSprite {
    static is_static = true;
    static color = BLUE;
    static strength = 1;
    static draw_arrow = true;
  };
  var Spreader = class _Spreader extends Flicker {
    static spreadprob = 1;
    update(game) {
      super.update(game);
      if (this._age === 2) {
        for (const u of BASEDIRS) {
          if (game.randomGenerator.random() < (this.spreadprob || _Spreader.spreadprob)) {
            game.addSpriteCreation(this.name, [
              this.lastrect.x + u.x * this.lastrect.w,
              this.lastrect.y + u.y * this.lastrect.h
            ]);
          }
        }
      }
    }
  };

  // engine/avatars.js
  function readAction(sprite, game) {
    const activeKeys = [...game.active_keys].sort();
    for (let numKeys = Math.max(3, activeKeys.length); numKeys >= 0; numKeys--) {
      for (const combo of combinations(activeKeys, numKeys)) {
        const comboKey = combo.join(",");
        if (sprite._keysToAction.has(comboKey)) {
          return sprite._keysToAction.get(comboKey);
        }
      }
    }
    throw new Error("No valid actions encountered, consider allowing NO_OP");
  }
  function combinations(arr, r) {
    if (r === 0) return [[]];
    if (arr.length === 0) return [];
    const result = [];
    function helper(start, combo) {
      if (combo.length === r) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        helper(i + 1, combo);
        combo.pop();
      }
    }
    helper(0, []);
    return result;
  }
  function buildKeysToAction(actions) {
    const map = /* @__PURE__ */ new Map();
    for (const action of Object.values(actions)) {
      const key = [...action.keys].sort().join(",");
      map.set(key, action);
    }
    return map;
  }
  var MovingAvatar = class extends VGDLSprite {
    static color = WHITE;
    static speed = 1;
    static is_avatar = true;
    constructor(opts) {
      super(opts);
      this.is_avatar = true;
      const actions = this.constructor.declarePossibleActions();
      this._keysToAction = buildKeysToAction(actions);
    }
    static declarePossibleActions() {
      return {
        UP: new Action("UP"),
        DOWN: new Action("DOWN"),
        LEFT: new Action("LEFT"),
        RIGHT: new Action("RIGHT"),
        NO_OP: new Action()
      };
    }
    update(game) {
      VGDLSprite.prototype.update.call(this, game);
      const action = readAction(this, game);
      if (!action.equals(NOOP)) {
        this.physics.activeMovement(this, action);
      }
    }
  };
  var OrientedAvatar = class extends VGDLSprite {
    static color = WHITE;
    static speed = 1;
    static is_avatar = true;
    static draw_arrow = false;
    constructor(opts) {
      super(opts);
      this.is_avatar = true;
      if (this.orientation === void 0) {
        this.orientation = opts.orientation || RIGHT;
      }
      const actions = this.constructor.declarePossibleActions();
      this._keysToAction = buildKeysToAction(actions);
    }
    static declarePossibleActions() {
      return {
        UP: new Action("UP"),
        DOWN: new Action("DOWN"),
        LEFT: new Action("LEFT"),
        RIGHT: new Action("RIGHT"),
        NO_OP: new Action()
      };
    }
    update(game) {
      const lastOrientation = this.orientation;
      this.orientation = { x: 0, y: 0 };
      VGDLSprite.prototype.update.call(this, game);
      const action = readAction(this, game);
      if (action) {
        this.physics.activeMovement(this, action);
      }
      const lastdir = this.lastdirection;
      const lastdirLen = Math.abs(lastdir.x) + Math.abs(lastdir.y);
      if (lastdirLen !== 0) {
        this.orientation = lastdir;
      } else {
        this.orientation = lastOrientation;
      }
    }
  };
  var ShootAvatar = class extends OrientedAvatar {
    static ammo = null;
    constructor(opts) {
      super(opts);
      this.stype = opts.stype || null;
      this.ammo = opts.ammo !== void 0 ? opts.ammo : this.constructor.ammo;
    }
    static declarePossibleActions() {
      const actions = OrientedAvatar.declarePossibleActions();
      actions.SPACE = new Action("SPACE");
      return actions;
    }
    update(game) {
      OrientedAvatar.prototype.update.call(this, game);
      const action = readAction(this, game);
      if (this._hasAmmo() && action.equals(ACTION.SPACE)) {
        this._shoot(game);
      }
    }
    _hasAmmo() {
      if (this.ammo === null) return true;
      if (this.ammo in this.resources) {
        return this.resources[this.ammo] > 0;
      }
      return false;
    }
    _spendAmmo() {
      if (this.ammo !== null && this.ammo in this.resources) {
        this.resources[this.ammo] -= 1;
      }
    }
    _shoot(game) {
      if (this.stype === null) return;
      const directions = this._shootDirections(game);
      for (const dir of directions) {
        const neighbor = [
          this.lastrect.x + dir.x * this.lastrect.w,
          this.lastrect.y + dir.y * this.lastrect.h
        ];
        const sprite = game.createSprite(this.stype, neighbor);
        if (sprite && sprite.orientation !== void 0) {
          sprite.orientation = dir;
        }
      }
      this._spendAmmo();
    }
    _shootDirections(_game) {
      return [unitVector(this.orientation)];
    }
  };
  var HorizontalAvatar = class extends MovingAvatar {
    static declarePossibleActions() {
      return {
        LEFT: new Action("LEFT"),
        RIGHT: new Action("RIGHT"),
        NO_OP: new Action()
      };
    }
    update(game) {
      VGDLSprite.prototype.update.call(this, game);
      const action = readAction(this, game);
      const v = action.asVector();
      if (vecEquals(v, RIGHT) || vecEquals(v, LEFT)) {
        this.physics.activeMovement(this, action);
      }
    }
  };
  var FlakAvatar = class extends HorizontalAvatar {
    static color = GREEN;
    constructor(opts) {
      super(opts);
      this.stype = opts.stype || null;
    }
    static declarePossibleActions() {
      const actions = HorizontalAvatar.declarePossibleActions();
      actions.SPACE = new Action("SPACE");
      return actions;
    }
    update(game) {
      HorizontalAvatar.prototype.update.call(this, game);
      if (this.stype && game.active_keys.includes("SPACE")) {
        game.createSprite(this.stype, [this.rect.x, this.rect.y]);
      }
    }
  };

  // engine/effects.js
  function killSprite(sprite, partner, game) {
    game.killSprite(sprite);
  }
  function killBoth(sprite, partner, game) {
    game.killSprite(sprite);
    game.killSprite(partner);
  }
  function cloneSprite(sprite, partner, game) {
    game.addSpriteCreation(sprite.key, [sprite.rect.x, sprite.rect.y]);
  }
  function transformTo(sprite, partner, game, { stype = "wall" } = {}) {
    const lastRectKilled = sprite.lastrect;
    game.killSprite(sprite);
    const newSprite = game.addSpriteCreation(stype, sprite.rect.topleft);
    if (newSprite !== null && newSprite !== void 0) {
      newSprite.lastrect = lastRectKilled;
      if (sprite.orientation !== void 0 && newSprite.orientation !== void 0) {
        newSprite.orientation = sprite.orientation;
      }
    }
  }
  function stepBackIfHasLess(sprite, partner, game, { resource, limit = 1, no_symmetry = false, exhaustStype = null } = {}) {
    if (sprite.resources[resource] < limit) {
      stepBack(sprite, partner, game, { no_symmetry });
    } else {
      if (exhaustStype) {
        if (!game.kill_list.includes(partner)) {
          transformTo(partner, sprite, game, { stype: exhaustStype });
        }
      } else {
        killSprite(partner, sprite, game);
      }
    }
  }
  function stepBack(sprite, partner, game, { no_symmetry = false } = {}) {
    if (!game.kill_list.includes(partner) && !game.kill_list.includes(sprite)) {
      if (sprite.rect.equals(sprite.lastrect) && !no_symmetry) {
        partner.rect = partner.lastrect;
        stepBackPusher(partner, 0);
      } else {
        sprite.rect = sprite.lastrect;
        stepBackPusher(sprite, 0);
      }
    }
  }
  function stepBackPusher(sprite, depth) {
    if (depth > 5) return;
    if (sprite.just_pushed) {
      sprite.just_pushed.rect = sprite.just_pushed.lastrect;
      stepBackPusher(sprite.just_pushed, depth + 1);
    }
  }
  function undoAll(sprite, partner, game) {
    for (const s of game.sprite_registry.sprites()) {
      s.rect = s.lastrect;
    }
  }
  function findOriginMvt(partner, depth) {
    if (partner.just_pushed && depth < 3) {
      return findOriginMvt(partner.just_pushed, depth + 1);
    }
    return partner.lastdirection;
  }
  function bounceForward(sprite, partner, game) {
    let pushedDir = findOriginMvt(partner, 0);
    if (Math.abs(pushedDir.x) + Math.abs(pushedDir.y) === 0) {
      pushedDir = findOriginMvt(sprite, 0);
      partner.physics.activeMovement(partner, unitVector(pushedDir));
      partner.just_pushed = sprite;
    } else {
      sprite.physics.activeMovement(sprite, unitVector(pushedDir));
      sprite.just_pushed = partner;
    }
  }
  function catapultForward(sprite, partner, game, { exhaustStype = null } = {}) {
    if (sprite.lastrect.colliderect(partner.rect)) return;
    const direction = sprite.lastdirection;
    const len = Math.abs(direction.x) + Math.abs(direction.y);
    if (len === 0) return;
    const dir = unitVector(direction);
    const gridsize = sprite.rect.width;
    const newRect = sprite.rect.copy();
    newRect.x += Math.round(dir.x) * gridsize;
    newRect.y += Math.round(dir.y) * gridsize;
    if (newRect.x < 0 || newRect.y < 0 || newRect.x + newRect.width > game.screensize[0] || newRect.y + newRect.height > game.screensize[1]) return;
    sprite.rect = newRect;
    sprite.lastmove = 0;
    if (exhaustStype) {
      transformTo(partner, sprite, game, { stype: exhaustStype });
    }
  }
  function reverseDirection(sprite, partner, game, { with_step_back = true } = {}) {
    if (with_step_back) {
      sprite.rect = sprite.lastrect;
    }
    if (sprite.orientation !== void 0) {
      sprite.orientation = { x: -sprite.orientation.x, y: -sprite.orientation.y };
    }
  }
  function turnAround(sprite, partner, game) {
    sprite.rect = sprite.lastrect;
    sprite.lastmove = sprite.cooldown;
    sprite.physics.activeMovement(sprite, { x: 0, y: 1 }, 1);
    reverseDirection(sprite, partner, game, { with_step_back: false });
  }
  function flipDirection(sprite, partner, game) {
    const BASEDIRS2 = [{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }];
    sprite.orientation = BASEDIRS2[Math.floor(game.randomGenerator.random() * BASEDIRS2.length)];
  }
  function wrapAround(sprite, partner, game, { offset = 0 } = {}) {
    if (sprite.rect.top < 0) {
      sprite.rect.top = game.screensize[1] - sprite.rect.height;
    } else if (sprite.rect.top + sprite.rect.height > game.screensize[1]) {
      sprite.rect.top = 0;
    }
    if (sprite.rect.left < 0) {
      sprite.rect.left = game.screensize[0] - sprite.rect.width;
    } else if (sprite.rect.left + sprite.rect.width > game.screensize[0]) {
      sprite.rect.left = 0;
    }
    sprite.lastmove = 0;
  }
  function collectResource(sprite, partner, game) {
    if (!(sprite instanceof Resource)) {
      throw new Error(`collectResource: sprite must be a Resource, got ${sprite.constructor.name}`);
    }
    const r = sprite.resource_type;
    const limit = game.domain.resources_limits && game.domain.resources_limits[r] || Infinity;
    partner.resources[r] = Math.max(0, Math.min(partner.resources[r] + sprite.value, limit));
  }
  function changeResource(sprite, partner, game, { resource, value = 1 } = {}) {
    game.resource_changes.push([sprite, resource, value]);
  }
  function addResource(sprite, partner, game, { resource, value = 1 } = {}) {
    game.resource_changes.push([partner, resource, value]);
    game.kill_list.push(sprite);
  }
  function removeResource(sprite, partner, game, { resource, value = -1 } = {}) {
    game.resource_changes.push([partner, resource, value]);
    game.kill_list.push(sprite);
  }
  function killIfOtherHasMore(sprite, partner, game, { resource, limit = 1 } = {}) {
    if (partner.resources[resource] >= limit) {
      killSprite(sprite, partner, game);
    }
  }
  function killIfHasMore(sprite, partner, game, { resource, limit = 1 } = {}) {
    if (sprite.resources[resource] >= limit) {
      killSprite(sprite, partner, game);
    }
  }
  function killIfOtherHasLess(sprite, partner, game, { resource, limit = 1 } = {}) {
    if (partner.resources[resource] <= limit) {
      killSprite(sprite, partner, game);
    }
  }
  function killIfHasLess(sprite, partner, game, { resource, limit = 1 } = {}) {
    if (sprite.resources[resource] <= limit) {
      killSprite(sprite, partner, game);
    }
  }
  function spawnIfHasMore(sprite, partner, game, { resource, stype, limit = 1 } = {}) {
    if (sprite.resources[resource] >= limit) {
      game.addSpriteCreation(stype, [sprite.rect.x, sprite.rect.y]);
    }
  }
  function killIfAlive(sprite, partner, game) {
    if (!game.kill_list.includes(partner)) {
      killSprite(sprite, partner, game);
    }
  }
  function conveySprite(sprite, partner, game) {
    const tmp = sprite.lastrect;
    const v = unitVector(partner.orientation);
    sprite.physics.activeMovement(sprite, v, partner.strength || 1);
    sprite.lastrect = tmp;
  }
  function pullWithIt(sprite, partner, game) {
    if (!oncePerStep(sprite, game, "t_lastpull")) return;
    const tmp = sprite.lastrect;
    const lastdir = partner.lastdirection;
    const len = Math.abs(lastdir.x) + Math.abs(lastdir.y);
    const v = len > 0 ? unitVector(lastdir) : { x: 1, y: 0 };
    sprite._updatePosition(v, (partner.speed || 1) * sprite.physics.gridsize[0]);
    sprite.lastrect = tmp;
  }
  function teleportToExit(sprite, partner, game) {
    const exits = game.sprite_registry.withStype(partner.stype || partner.key);
    if (exits.length > 0) {
      const e = exits[Math.floor(game.randomGenerator.random() * exits.length)];
      sprite.rect = e.rect.copy();
    }
    sprite.lastmove = 0;
  }
  function teleportToOther(sprite, partner, game, { exhaustStype = null } = {}) {
    if (sprite.lastrect.colliderect(partner.rect)) return;
    const siblings = game.sprite_registry.group(partner.key).filter((s) => s !== partner);
    if (siblings.length === 0) return;
    const e = siblings[Math.floor(game.randomGenerator.random() * siblings.length)];
    sprite.rect = e.rect.copy();
    sprite.lastrect = e.rect.copy();
    sprite.lastmove = 0;
    if (exhaustStype) {
      transformTo(partner, sprite, game, { stype: exhaustStype });
      transformTo(e, sprite, game, { stype: exhaustStype });
    }
  }
  function wallBounce(sprite, partner, game, { friction = 0 } = {}) {
    if (!oncePerStep(sprite, game, "t_lastbounce")) return;
    if (sprite.speed !== null) sprite.speed *= 1 - friction;
    stepBack(sprite, partner, game);
    if (sprite.orientation !== void 0) {
      if (Math.abs(sprite.rect.centerx - partner.rect.centerx) > Math.abs(sprite.rect.centery - partner.rect.centery)) {
        sprite.orientation = { x: -sprite.orientation.x, y: sprite.orientation.y };
      } else {
        sprite.orientation = { x: sprite.orientation.x, y: -sprite.orientation.y };
      }
    }
  }
  function bounceDirection(sprite, partner, game, { friction = 0 } = {}) {
    stepBack(sprite, partner, game);
    if (sprite.orientation !== void 0) {
      const inc = sprite.orientation;
      const snorm = unitVector({
        x: -sprite.rect.centerx + partner.rect.centerx,
        y: -sprite.rect.centery + partner.rect.centery
      });
      const dp = snorm.x * inc.x + snorm.y * inc.y;
      sprite.orientation = {
        x: -2 * dp * snorm.x + inc.x,
        y: -2 * dp * snorm.y + inc.y
      };
      if (sprite.speed !== null) sprite.speed *= 1 - friction;
    }
  }
  function oncePerStep(sprite, game, name) {
    if (name in sprite._effect_data) {
      if (sprite._effect_data[name] === game.time) {
        return false;
      }
    }
    sprite._effect_data[name] = game.time;
    return true;
  }

  // engine/terminations.js
  var Termination = class {
    constructor({ win = true, scoreChange = 0 } = {}) {
      this.win = win;
      this.score = scoreChange;
    }
    isDone(_game) {
      return [false, null];
    }
  };
  var Timeout = class extends Termination {
    constructor(opts = {}) {
      super(opts);
      this.limit = opts.limit || 0;
    }
    isDone(game) {
      if (game.time >= this.limit) {
        return [true, this.win];
      }
      return [false, null];
    }
  };
  var SpriteCounter = class extends Termination {
    constructor(opts = {}) {
      super(opts);
      this.limit = opts.limit !== void 0 ? opts.limit : 0;
      this.stype = opts.stype || null;
    }
    isDone(game) {
      if (game.numSprites(this.stype) <= this.limit) {
        return [true, this.win];
      }
      return [false, null];
    }
    toString() {
      return `SpriteCounter(stype=${this.stype})`;
    }
  };
  var MultiSpriteCounter = class extends Termination {
    constructor(opts = {}) {
      const { win = true, scoreChange = 0, limit = 0, ...rest } = opts;
      super({ win, scoreChange });
      this.limit = limit;
      this.stypes = [];
      for (const [key, value] of Object.entries(rest)) {
        if (key.startsWith("stype")) {
          this.stypes.push(value);
        }
      }
    }
    isDone(game) {
      let total = 0;
      for (const st of this.stypes) {
        total += game.numSprites(st);
      }
      if (total === this.limit) {
        return [true, this.win];
      }
      return [false, null];
    }
  };
  var ResourceCounter = class extends Termination {
    constructor(opts = {}) {
      super(opts);
      this.stype = opts.stype || null;
      this.limit = opts.limit || 0;
    }
    isDone(game) {
      const avatars = game.getAvatars();
      if (avatars.length === 0) return [false, null];
      const avatar = avatars[0];
      const satisfied = (avatar.resources[this.stype] || 0) >= this.limit;
      return [satisfied, this.win];
    }
  };

  // engine/sprite-registry.js
  var SpriteRegistry = class _SpriteRegistry {
    constructor() {
      this.classes = {};
      this.classArgs = {};
      this.stypes = {};
      this.spriteKeys = [];
      this.singletons = [];
      this._spriteById = {};
      this._liveSpritesByKey = {};
      this._deadSpritesByKey = {};
    }
    reset() {
      this._liveSpritesByKey = {};
      this._deadSpritesByKey = {};
      this._spriteById = {};
    }
    registerSingleton(key) {
      this.singletons.push(key);
    }
    isSingleton(key) {
      return this.singletons.includes(key);
    }
    registerSpriteClass(key, cls, args, stypes) {
      if (key in this.classes) {
        throw new Error(`Sprite key already registered: ${key}`);
      }
      if (cls === null || cls === void 0) {
        throw new Error(`Cannot register null class for key: ${key}`);
      }
      this.classes[key] = cls;
      this.classArgs[key] = args;
      this.stypes[key] = stypes;
      this.spriteKeys.push(key);
    }
    getSpriteDef(key) {
      if (!(key in this.classes)) {
        throw new Error(`Unknown sprite type '${key}', verify your domain file`);
      }
      return {
        cls: this.classes[key],
        args: this.classArgs[key],
        stypes: this.stypes[key]
      };
    }
    *getSpriteDefs() {
      for (const key of this.spriteKeys) {
        yield [key, this.getSpriteDef(key)];
      }
    }
    _generateIdNumber(key) {
      const liveIds = (this._liveSpritesByKey[key] || []).map((s) => parseInt(s.id.split(".").pop()));
      const deadIds = (this._deadSpritesByKey[key] || []).map((s) => parseInt(s.id.split(".").pop()));
      const allIds = liveIds.concat(deadIds);
      if (allIds.length > 0) {
        return Math.max(...allIds) + 1;
      }
      return 1;
    }
    generateId(key) {
      const n = this._generateIdNumber(key);
      return `${key}.${n}`;
    }
    createSprite(key, opts) {
      if (this.isSingleton(key)) {
        const live = this._liveSpritesByKey[key] || [];
        if (live.length > 0) {
          return null;
        }
      }
      const { cls, args, stypes } = this.getSpriteDef(key);
      const id = opts.id || this.generateId(key);
      const mergedOpts = { ...args, ...opts, key, id };
      const sprite = new cls(mergedOpts);
      sprite.stypes = stypes;
      if (!this._liveSpritesByKey[key]) {
        this._liveSpritesByKey[key] = [];
      }
      this._liveSpritesByKey[key].push(sprite);
      this._spriteById[id] = sprite;
      return sprite;
    }
    killSprite(sprite) {
      sprite.alive = false;
      const key = sprite.key;
      const liveList = this._liveSpritesByKey[key];
      if (liveList) {
        const idx = liveList.indexOf(sprite);
        if (idx !== -1) {
          liveList.splice(idx, 1);
          if (!this._deadSpritesByKey[key]) {
            this._deadSpritesByKey[key] = [];
          }
          this._deadSpritesByKey[key].push(sprite);
        }
      }
    }
    group(key, includeDead = false) {
      const live = this._liveSpritesByKey[key] || [];
      if (!includeDead) return live;
      const dead = this._deadSpritesByKey[key] || [];
      return live.concat(dead);
    }
    *groups(includeDead = false) {
      for (const key of this.spriteKeys) {
        if (includeDead) {
          const live = this._liveSpritesByKey[key] || [];
          const dead = this._deadSpritesByKey[key] || [];
          yield [key, live.concat(dead)];
        } else {
          yield [key, this._liveSpritesByKey[key] || []];
        }
      }
    }
    *sprites(includeDead = false) {
      if (includeDead) {
        throw new Error("sprites(includeDead=true) not supported");
      }
      for (const key of this.spriteKeys) {
        const list = this._liveSpritesByKey[key] || [];
        for (const sprite of list) {
          yield sprite;
        }
      }
    }
    spritesArray() {
      const result = [];
      for (const key of this.spriteKeys) {
        const list = this._liveSpritesByKey[key] || [];
        for (const sprite of list) {
          result.push(sprite);
        }
      }
      return result;
    }
    withStype(stype, includeDead = false) {
      if (this.spriteKeys.includes(stype)) {
        return this.group(stype, includeDead);
      }
      const result = [];
      for (const key of this.spriteKeys) {
        if (this.stypes[key] && this.stypes[key].includes(stype)) {
          const list = includeDead ? (this._liveSpritesByKey[key] || []).concat(this._deadSpritesByKey[key] || []) : this._liveSpritesByKey[key] || [];
          result.push(...list);
        }
      }
      return result;
    }
    getAvatar() {
      for (const [, sprites] of this.groups(true)) {
        if (sprites.length > 0 && this.isAvatar(sprites[0])) {
          return sprites[0];
        }
      }
      return null;
    }
    isAvatar(sprite) {
      return this.isAvatarCls(sprite.constructor);
    }
    isAvatarCls(cls) {
      let current = cls;
      while (current && current.name) {
        if (current.name.includes("Avatar")) return true;
        current = Object.getPrototypeOf(current);
      }
      return false;
    }
    // Deep copy for building a level from a domain
    deepCopy() {
      const copy = new _SpriteRegistry();
      copy.classes = { ...this.classes };
      copy.classArgs = {};
      for (const [k, v] of Object.entries(this.classArgs)) {
        copy.classArgs[k] = { ...v };
      }
      copy.stypes = {};
      for (const [k, v] of Object.entries(this.stypes)) {
        copy.stypes[k] = [...v];
      }
      copy.spriteKeys = [...this.spriteKeys];
      copy.singletons = [...this.singletons];
      return copy;
    }
  };

  // engine/game.js
  var SeededRandom = class {
    constructor(seed = 42) {
      this._seed = seed;
      this._state = seed;
    }
    random() {
      let t = this._state += 1831565813;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
    choice(arr) {
      return arr[Math.floor(this.random() * arr.length)];
    }
    seed(s) {
      this._state = s;
      this._seed = s;
    }
  };
  var Effect = class {
    constructor(actorStype, acteeStype, { scoreChange = 0 } = {}) {
      this.actor_stype = actorStype;
      this.actee_stype = acteeStype;
      this.score = scoreChange;
      this.is_stochastic = false;
    }
    call(sprite, partner, game) {
      throw new Error("Effect.call not implemented");
    }
    get name() {
      return this.constructor.name;
    }
  };
  var FunctionalEffect = class extends Effect {
    constructor(fn, actorStype, acteeStype, kwargs = {}) {
      const scoreChange = kwargs.scoreChange || 0;
      super(actorStype, acteeStype, { scoreChange });
      this.callFn = fn;
      const { scoreChange: _sc, ...fnArgs } = kwargs;
      this.fnArgs = fnArgs;
      this._name = fn.name || "anonymous";
    }
    call(sprite, partner, game) {
      if (Object.keys(this.fnArgs).length > 0) {
        return this.callFn(sprite, partner, game, this.fnArgs);
      }
      return this.callFn(sprite, partner, game);
    }
    get name() {
      return this._name;
    }
  };
  var BasicGame = class {
    constructor(spriteRegistry, opts = {}) {
      this.domain_registry = spriteRegistry;
      this.title = opts.title || null;
      this.seed = opts.seed !== void 0 ? opts.seed : 42;
      this.block_size = opts.block_size || 1;
      this.notable_resources = [];
      this.sprite_order = [];
      this.collision_eff = [];
      this.char_mapping = {};
      this.terminations = [];
      this.resources_limits = {};
      this.resources_colors = {};
      this.is_stochastic = false;
    }
    finishSetup() {
      this.is_stochastic = this.collision_eff.some((e) => e.is_stochastic);
      this.setupResources();
      const avatarIdx = this.sprite_order.indexOf("avatar");
      if (avatarIdx !== -1) {
        this.sprite_order.splice(avatarIdx, 1);
        this.sprite_order.push("avatar");
      }
    }
    setupResources() {
      this.notable_resources = [];
      for (const [resType, { cls, args }] of this.domain_registry.getSpriteDefs()) {
        if (cls.prototype instanceof Resource || cls === Resource) {
          let rt = resType;
          if (args.res_type) rt = args.res_type;
          if (args.color) this.resources_colors[rt] = args.color;
          if (args.limit !== void 0) this.resources_limits[rt] = args.limit;
          this.notable_resources.push(rt);
        }
      }
    }
    buildLevel(lstr) {
      const lines = lstr.split("\n").filter((l) => l.length > 0);
      const lengths = lines.map((l) => l.length);
      const minLen = Math.min(...lengths);
      const maxLen = Math.max(...lengths);
      if (minLen !== maxLen) {
        throw new Error(`Inconsistent line lengths: min=${minLen}, max=${maxLen}`);
      }
      const level = new BasicGameLevel(
        this,
        this.domain_registry.deepCopy(),
        lstr,
        lengths[0],
        lines.length,
        this.seed
      );
      for (let row = 0; row < lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++) {
          const c = lines[row][col];
          const keys = this.char_mapping[c];
          if (keys) {
            const pos = [col * this.block_size, row * this.block_size];
            level.createSprites(keys, pos);
          }
        }
      }
      level.initState = level.getGameState();
      return level;
    }
  };
  var BasicGameLevel = class {
    constructor(domain, spriteRegistry, levelstring, width, height, seed = 0) {
      this.domain = domain;
      this.sprite_registry = spriteRegistry;
      this.levelstring = levelstring;
      this.width = width;
      this.height = height;
      this.block_size = domain.block_size;
      this.screensize = [this.width * this.block_size, this.height * this.block_size];
      this.seed = seed;
      this.randomGenerator = new SeededRandom(seed);
      this.kill_list = [];
      this.create_list = [];
      this.resource_changes = [];
      this.score = 0;
      this.last_reward = 0;
      this.time = 0;
      this.ended = false;
      this.won = false;
      this.lose = false;
      this.is_stochastic = false;
      this.active_keys = [];
      this.events_triggered = [];
      this.initState = null;
      this._gameRect = new Rect(0, 0, this.screensize[0], this.screensize[1]);
    }
    reset() {
      this.score = 0;
      this.last_reward = 0;
      this.time = 0;
      this.ended = false;
      this.won = false;
      this.lose = false;
      this.kill_list = [];
      this.create_list = [];
      this.resource_changes = [];
      this.active_keys = [];
      this.events_triggered = [];
      if (this.initState) {
        this.setGameState(this.initState);
      }
    }
    createSprite(key, pos, id) {
      const sprite = this.sprite_registry.createSprite(key, {
        pos,
        id,
        size: [this.block_size, this.block_size],
        rng: this.randomGenerator
      });
      if (sprite) {
        this.is_stochastic = this.domain.is_stochastic || sprite.is_stochastic || this.is_stochastic;
      }
      return sprite;
    }
    createSprites(keys, pos) {
      return keys.map((key) => this.createSprite(key, pos)).filter(Boolean);
    }
    killSprite(sprite) {
      this.kill_list.push(sprite);
    }
    addSpriteCreation(key, pos, id) {
      this.create_list.push([key, pos, id]);
      return null;
    }
    addScore(scoreVal) {
      this.score += scoreVal;
      this.last_reward += scoreVal;
    }
    numSprites(key) {
      return this.sprite_registry.withStype(key).length;
    }
    getSprites(key) {
      return this.sprite_registry.withStype(key);
    }
    getAvatars() {
      const res = [];
      for (const [, ss] of this.sprite_registry.groups(true)) {
        if (ss.length > 0 && this.sprite_registry.isAvatar(ss[0])) {
          res.push(...ss);
        }
      }
      return res;
    }
    containsRect(rect) {
      return this._gameRect.contains(rect);
    }
    tick(action) {
      this.time += 1;
      this.last_reward = 0;
      if (this.ended) return;
      this.active_keys = action.keys;
      const allSprites = this.sprite_registry.spritesArray();
      for (const s of allSprites) {
        s.just_pushed = null;
      }
      for (const s of allSprites) {
        s.update(this);
      }
      this.events_triggered = [];
      const [ss, moveEvents, moveEventKeys] = this._moveEventHandling();
      const [nonMoveEvents, nonMoveEventKeys] = this._eventHandling(ss);
      this.events_triggered = moveEvents.concat(nonMoveEvents);
      for (const sprite of this.kill_list) {
        this.sprite_registry.killSprite(sprite);
      }
      for (const [key, pos, id] of this.create_list) {
        this.createSprite(key, pos, id);
      }
      for (const [sprite, resource, value] of this.resource_changes) {
        const limit = this.domain.resources_limits && this.domain.resources_limits[resource] || Infinity;
        sprite.resources[resource] = Math.max(0, Math.min(sprite.resources[resource] + value, limit));
      }
      this._checkTerminations();
      this.kill_list = [];
      this.create_list = [];
      this.resource_changes = [];
    }
    _moveEventHandling() {
      let allEventsTriggered = [];
      let allEventsTriggeredKeys = [];
      const ss = {};
      const stepbackEffects = this.domain.collision_eff.filter((e) => e.name === "stepBack" || e.name === "stepBackIfHasLess");
      for (const effect of stepbackEffects) {
        const [, events, eventKeys] = this._applyEffect(effect, ss);
        allEventsTriggered.push(...events);
        allEventsTriggeredKeys.push(...eventKeys);
      }
      const moveEffects = this.domain.collision_eff.filter(
        (e) => ["bounceForward", "reverseDirection", "turnAround"].includes(e.name)
      );
      for (const effect of moveEffects) {
        const [, events, eventKeys] = this._applyEffect(effect, ss);
        allEventsTriggered.push(...events);
        allEventsTriggeredKeys.push(...eventKeys);
      }
      for (const effect of stepbackEffects) {
        const [, events, eventKeys] = this._applyEffect(effect, ss);
        allEventsTriggered.push(...events);
        allEventsTriggeredKeys.push(...eventKeys);
      }
      return [ss, allEventsTriggered, allEventsTriggeredKeys];
    }
    _eventHandling(ss) {
      let allEventsTriggered = [];
      let allEventsTriggeredKeys = [];
      const nonMoveEffects = this.domain.collision_eff.filter(
        (e) => !["stepBack", "stepBackIfHasLess", "bounceForward", "reverseDirection", "turnAround"].includes(e.name)
      );
      for (const effect of nonMoveEffects) {
        const [, events, eventKeys] = this._applyEffect(effect, ss);
        allEventsTriggered.push(...events);
        allEventsTriggeredKeys.push(...eventKeys);
      }
      return [allEventsTriggered, allEventsTriggeredKeys];
    }
    _applyEffect(effect, ss) {
      const eventsTriggered = [];
      const eventsTriggeredKeys = [];
      const g1 = effect.actor_stype;
      const g2 = effect.actee_stype;
      if (!(g1 in ss)) {
        ss[g1] = this.sprite_registry.withStype(g1);
      }
      if (g2 !== "EOS" && !(g2 in ss)) {
        ss[g2] = this.sprite_registry.withStype(g2);
      }
      if (g2 === "EOS") {
        const sprites2 = ss[g1];
        for (let i = sprites2.length - 1; i >= 0; i--) {
          const s1 = sprites2[i];
          if (!this.containsRect(s1.rect)) {
            this.addScore(effect.score);
            effect.call(s1, null, this);
            eventsTriggered.push([effect.name, s1.id, "EOS"]);
            eventsTriggeredKeys.push([effect.name, s1.key, "EOS", [s1.rect.x, s1.rect.y], [null, null]]);
            if (!this.containsRect(s1.rect) && s1.alive) {
              this.killSprite(s1);
            }
          }
        }
        return [ss, eventsTriggered, eventsTriggeredKeys];
      }
      let sprites = ss[g1];
      let others = ss[g2];
      if (sprites.length === 0 || others.length === 0) {
        return [ss, eventsTriggered, eventsTriggeredKeys];
      }
      let reverse = false;
      if (sprites.length > others.length) {
        [sprites, others] = [others, sprites];
        reverse = true;
      }
      for (const sprite of sprites) {
        for (const other of others) {
          if (sprite === other) continue;
          if (!sprite.rect.colliderect(other.rect)) continue;
          if (reverse) {
            if (!this.kill_list.includes(other)) {
              this.addScore(effect.score);
              effect.call(other, sprite, this);
              eventsTriggered.push([effect.name, other.id, sprite.id]);
              eventsTriggeredKeys.push([
                effect.name,
                other.key,
                sprite.key,
                [other.rect.x, other.rect.y],
                [sprite.rect.x, sprite.rect.y]
              ]);
            }
          } else {
            if (!this.kill_list.includes(sprite)) {
              this.addScore(effect.score);
              effect.call(sprite, other, this);
              eventsTriggered.push([effect.name, sprite.id, other.id]);
              eventsTriggeredKeys.push([
                effect.name,
                sprite.key,
                other.key,
                [sprite.rect.x, sprite.rect.y],
                [other.rect.x, other.rect.y]
              ]);
            }
          }
        }
      }
      return [ss, eventsTriggered, eventsTriggeredKeys];
    }
    _checkTerminations() {
      this.lose = false;
      for (const t of this.domain.terminations) {
        const [ended, won] = t.isDone(this);
        this.ended = ended;
        this.won = won === null ? false : won;
        if (t.constructor.name === "Timeout") {
        } else if (["SpriteCounter", "MultiSpriteCounter"].includes(t.constructor.name)) {
          if (this.ended && !this.won) {
            this.lose = true;
          }
        }
        if (this.ended) {
          this.addScore(t.score);
          break;
        }
      }
    }
    getGameState() {
      const spriteStates = {};
      for (const key of this.sprite_registry.spriteKeys) {
        const live = this.sprite_registry._liveSpritesByKey[key] || [];
        const dead = this.sprite_registry._deadSpritesByKey[key] || [];
        spriteStates[key] = [...live, ...dead].map((s) => ({
          id: s.id,
          key: s.key,
          x: s.rect.x,
          y: s.rect.y,
          w: s.rect.w,
          h: s.rect.h,
          alive: s.alive,
          resources: { ...s.resources },
          speed: s.speed,
          cooldown: s.cooldown,
          orientation: s.orientation ? { ...s.orientation } : void 0,
          _age: s._age,
          lastmove: s.lastmove
        }));
      }
      return {
        score: this.score,
        time: this.time,
        sprites: spriteStates
      };
    }
    setGameState(state) {
      this.sprite_registry.reset();
      this.score = state.score;
      this.time = state.time;
      for (const [key, spritesData] of Object.entries(state.sprites)) {
        for (const sd of spritesData) {
          const sprite = this.sprite_registry.createSprite(key, {
            id: sd.id,
            pos: [sd.x, sd.y],
            size: [sd.w, sd.h],
            rng: this.randomGenerator
          });
          if (sprite) {
            sprite.resources = new Proxy({ ...sd.resources }, {
              get(target, prop) {
                if (typeof prop === "string" && !(prop in target) && prop !== "toJSON" && prop !== "then" && prop !== Symbol.toPrimitive && prop !== Symbol.toStringTag && prop !== "inspect" && prop !== "constructor" && prop !== "__proto__") {
                  return 0;
                }
                return target[prop];
              },
              set(target, prop, value) {
                target[prop] = value;
                return true;
              }
            });
            if (sd.speed !== void 0) sprite.speed = sd.speed;
            if (sd.cooldown !== void 0) sprite.cooldown = sd.cooldown;
            if (sd.orientation) sprite.orientation = { ...sd.orientation };
            if (sd._age !== void 0) sprite._age = sd._age;
            if (sd.lastmove !== void 0) sprite.lastmove = sd.lastmove;
            sprite.alive = sd.alive;
            if (!sd.alive) {
              this.sprite_registry.killSprite(sprite);
            }
          }
        }
      }
    }
  };

  // engine/setup-registry.js
  function setupRegistry() {
    registry.register("VGDLSprite", VGDLSprite);
    registry.register("Immovable", Immovable);
    registry.register("Passive", Passive);
    registry.register("Resource", Resource);
    registry.register("ResourcePack", ResourcePack);
    registry.register("Flicker", Flicker);
    registry.register("OrientedFlicker", OrientedFlicker);
    registry.register("OrientedSprite", OrientedSprite);
    registry.register("Missile", Missile);
    registry.register("SpawnPoint", SpawnPoint);
    registry.register("SpriteProducer", SpriteProducer);
    registry.register("Portal", Portal);
    registry.register("RandomNPC", RandomNPC);
    registry.register("Chaser", Chaser);
    registry.register("Fleeing", Fleeing);
    registry.register("Bomber", Bomber);
    registry.register("Walker", Walker);
    registry.register("Conveyor", Conveyor);
    registry.register("Spreader", Spreader);
    registry.register("Immutable", Immutable);
    registry.register("MovingAvatar", MovingAvatar);
    registry.register("OrientedAvatar", OrientedAvatar);
    registry.register("ShootAvatar", ShootAvatar);
    registry.register("HorizontalAvatar", HorizontalAvatar);
    registry.register("FlakAvatar", FlakAvatar);
    registry.register("killSprite", killSprite);
    registry.register("killBoth", killBoth);
    registry.register("cloneSprite", cloneSprite);
    registry.register("transformTo", transformTo);
    registry.register("stepBack", stepBack);
    registry.register("stepBackIfHasLess", stepBackIfHasLess);
    registry.register("undoAll", undoAll);
    registry.register("bounceForward", bounceForward);
    registry.register("catapultForward", catapultForward);
    registry.register("reverseDirection", reverseDirection);
    registry.register("turnAround", turnAround);
    registry.register("flipDirection", flipDirection);
    registry.register("wrapAround", wrapAround);
    registry.register("collectResource", collectResource);
    registry.register("changeResource", changeResource);
    registry.register("addResource", addResource);
    registry.register("removeResource", removeResource);
    registry.register("killIfOtherHasMore", killIfOtherHasMore);
    registry.register("killIfHasMore", killIfHasMore);
    registry.register("killIfOtherHasLess", killIfOtherHasLess);
    registry.register("killIfHasLess", killIfHasLess);
    registry.register("spawnIfHasMore", spawnIfHasMore);
    registry.register("killIfAlive", killIfAlive);
    registry.register("conveySprite", conveySprite);
    registry.register("pullWithIt", pullWithIt);
    registry.register("teleportToExit", teleportToExit);
    registry.register("teleportToOther", teleportToOther);
    registry.register("wallBounce", wallBounce);
    registry.register("bounceDirection", bounceDirection);
    registry.register("Timeout", Timeout);
    registry.register("SpriteCounter", SpriteCounter);
    registry.register("MultiSpriteCounter", MultiSpriteCounter);
    registry.register("ResourceCounter", ResourceCounter);
    registry.register("GridPhysics", GridPhysics);
    registry.register("BasicGame", BasicGame);
    for (const [name, value] of Object.entries(COLORS)) {
      registry.register(name, value);
    }
    registry.register("UP", UP);
    registry.register("DOWN", DOWN);
    registry.register("LEFT", LEFT);
    registry.register("RIGHT", RIGHT);
  }

  // engine/parser.js
  var Node = class {
    constructor(content, indent, parent = null) {
      this.children = [];
      this.content = content;
      this.indent = indent;
      this.parent = null;
      if (parent) {
        parent.insert(this);
      }
    }
    insert(node) {
      if (this.indent < node.indent) {
        if (this.children.length > 0) {
          if (this.children[0].indent !== node.indent) {
            throw new Error(`Children indentations must match: expected ${this.children[0].indent}, got ${node.indent}`);
          }
        }
        this.children.push(node);
        node.parent = this;
      } else {
        if (!this.parent) {
          throw new Error("Root node too indented?");
        }
        this.parent.insert(node);
      }
    }
    getRoot() {
      if (this.parent) {
        return this.parent.getRoot();
      }
      return this;
    }
    toString() {
      if (this.children.length === 0) {
        return this.content;
      }
      return this.content + "[" + this.children.map((c) => c.toString()).join(", ") + "]";
    }
  };
  function indentTreeParser(s, tabsize = 8) {
    s = s.replace(/\t/g, " ".repeat(tabsize));
    const lines = s.split("\n");
    let last = new Node("", -1);
    for (let l of lines) {
      if (l.includes("#")) {
        l = l.split("#")[0];
      }
      const content = l.trim();
      if (content.length > 0) {
        const indent = l.length - l.trimStart().length;
        last = new Node(content, indent, last);
      }
    }
    return last.getRoot();
  }
  var VGDLParser = class {
    constructor() {
      this.verbose = false;
    }
    parseGame(treeOrString, extraArgs = {}) {
      let tree = treeOrString;
      if (typeof tree === "string") {
        tree = indentTreeParser(tree).children[0];
      }
      const [sclass, args] = this._parseArgs(tree.content);
      Object.assign(args, extraArgs);
      this.spriteRegistry = new SpriteRegistry();
      this.game = new BasicGame(this.spriteRegistry, args);
      for (const c of tree.children) {
        if (c.content.startsWith("SpriteSet")) {
          this.parseSprites(c.children);
        }
        if (c.content === "InteractionSet") {
          this.parseInteractions(c.children);
        }
        if (c.content === "LevelMapping") {
          this.parseMappings(c.children);
        }
        if (c.content === "TerminationSet") {
          this.parseTerminations(c.children);
        }
      }
      this.game.finishSetup();
      return this.game;
    }
    _eval(estr) {
      if (registry.has(estr)) {
        return registry.request(estr);
      }
      const num = Number(estr);
      if (!isNaN(num)) {
        return num;
      }
      if (estr === "True" || estr === "true") return true;
      if (estr === "False" || estr === "false") return false;
      return estr;
    }
    _parseArgs(s, sclass = null, args = null) {
      if (!args) args = {};
      const sparts = s.split(/\s+/).filter((p) => p.length > 0);
      if (sparts.length === 0) return [sclass, args];
      if (!sparts[0].includes("=")) {
        sclass = this._eval(sparts[0]);
        sparts.shift();
      }
      for (const sp of sparts) {
        const eqIdx = sp.indexOf("=");
        if (eqIdx === -1) continue;
        const k = sp.substring(0, eqIdx);
        const val = sp.substring(eqIdx + 1);
        args[k] = this._eval(val);
      }
      return [sclass, args];
    }
    parseSprites(snodes, parentclass = null, parentargs = {}, parenttypes = []) {
      for (const sn of snodes) {
        if (!sn.content.includes(">")) {
          throw new Error(`Expected '>' in sprite definition: ${sn.content}`);
        }
        const [key, sdef] = sn.content.split(">").map((x) => x.trim());
        const [sclass, args] = this._parseArgs(sdef, parentclass, { ...parentargs });
        const stypes = [...parenttypes, key];
        if ("singleton" in args) {
          if (args.singleton === true) {
            this.spriteRegistry.registerSingleton(key);
          }
          delete args.singleton;
        }
        if (sn.children.length === 0) {
          if (this.verbose) {
            console.log("Defining:", key, sclass, args, stypes);
          }
          this.spriteRegistry.registerSpriteClass(key, sclass, args, stypes);
          const idx = this.game.sprite_order.indexOf(key);
          if (idx !== -1) {
            this.game.sprite_order.splice(idx, 1);
          }
          this.game.sprite_order.push(key);
        } else {
          this.parseSprites(sn.children, sclass, args, stypes);
        }
      }
    }
    parseInteractions(inodes) {
      for (const inode of inodes) {
        if (!inode.content.includes(">")) continue;
        const [pair, edef] = inode.content.split(">").map((x) => x.trim());
        const [eclass, kwargs] = this._parseArgs(edef);
        const objs = pair.split(/\s+/).filter((x) => x.length > 0);
        for (let i = 1; i < objs.length; i++) {
          const actorStype = objs[0];
          const acteeStype = objs[i];
          let effect;
          if (typeof eclass === "function" && !eclass.prototype) {
            effect = new FunctionalEffect(eclass, actorStype, acteeStype, kwargs);
          } else if (typeof eclass === "function") {
            effect = new FunctionalEffect(eclass, actorStype, acteeStype, kwargs);
          } else {
            throw new Error(`Unknown effect type: ${eclass}`);
          }
          this.game.collision_eff.push(effect);
        }
      }
    }
    parseTerminations(tnodes) {
      for (const tn of tnodes) {
        const [sclass, args] = this._parseArgs(tn.content);
        this.game.terminations.push(new sclass(args));
      }
    }
    parseMappings(mnodes) {
      for (const mn of mnodes) {
        const [c, val] = mn.content.split(">").map((x) => x.trim());
        if (c.length !== 1) {
          throw new Error(`Only single character mappings allowed, got: '${c}'`);
        }
        const keys = val.split(/\s+/).filter((x) => x.length > 0);
        this.game.char_mapping[c] = keys;
      }
    }
  };

  // renderer.js
  var Renderer = class {
    constructor(canvas, cellSize = 30) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.cellSize = cellSize;
    }
    resize(widthCells, heightCells) {
      this.canvas.width = widthCells * this.cellSize;
      this.canvas.height = heightCells * this.cellSize;
    }
    clear() {
      this.ctx.fillStyle = "rgb(207, 216, 220)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    render(level) {
      this.clear();
      const bs = level.block_size;
      const scale = this.cellSize / bs;
      for (const key of level.domain.sprite_order) {
        const sprites = level.sprite_registry._liveSpritesByKey[key] || [];
        for (const sprite of sprites) {
          this._drawSprite(sprite, scale, bs);
        }
      }
      this._drawHUD(level);
    }
    _drawSprite(sprite, scale, bs) {
      const x = sprite.rect.x * scale;
      const y = sprite.rect.y * scale;
      const w = sprite.rect.w * scale;
      const h = sprite.rect.h * scale;
      let color = null;
      let shape = null;
      if (sprite.img) {
        const parsed = this._parseImg(sprite.img);
        color = parsed.color;
        shape = parsed.shape;
      }
      if (!color) {
        color = sprite.color;
      }
      if (!color) {
        color = [128, 128, 128];
      }
      const shrink = sprite.shrinkfactor || 0;
      const sx = x + w * shrink / 2;
      const sy = y + h * shrink / 2;
      const sw = w * (1 - shrink);
      const sh = h * (1 - shrink);
      this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      if (shape) {
        this._drawShape(shape, sx, sy, sw, sh);
      } else {
        this.ctx.fillRect(sx, sy, sw, sh);
      }
      if (sprite.orientation && sprite.draw_arrow) {
        this._drawArrow(sx, sy, sw, sh, sprite.orientation, color);
      }
      if (sprite.is_avatar) {
        this._drawResources(sprite, sx, sy, sw, sh);
      }
    }
    _parseImg(img) {
      const COLORS2 = {
        LIGHTGRAY: [207, 216, 220],
        BLUE: [25, 118, 210],
        YELLOW: [255, 245, 157],
        BLACK: [55, 71, 79],
        ORANGE: [230, 81, 0],
        PURPLE: [92, 107, 192],
        BROWN: [109, 76, 65],
        PINK: [255, 138, 128],
        GREEN: [129, 199, 132],
        RED: [211, 47, 47],
        WHITE: [250, 250, 250],
        GOLD: [255, 196, 0],
        LIGHTRED: [255, 82, 82],
        LIGHTORANGE: [255, 112, 67],
        LIGHTBLUE: [144, 202, 249],
        LIGHTGREEN: [185, 246, 202],
        LIGHTPURPLE: [200, 150, 220],
        LIGHTPINK: [255, 230, 230],
        DARKGRAY: [68, 90, 100],
        DARKBLUE: [1, 87, 155],
        GRAY: [69, 90, 100]
      };
      if (img.startsWith("colors/")) {
        const colorName = img.split("/")[1];
        return { color: COLORS2[colorName] || null, shape: null };
      }
      if (img.startsWith("colored_shapes/")) {
        const parts = img.split("/")[1];
        const SHAPES = ["CIRCLE", "TRIANGLE", "DIAMOND", "STAR", "CROSS", "HEXAGON", "SQUARE", "PENTAGON"];
        for (const shape of SHAPES) {
          if (parts.endsWith("_" + shape)) {
            const colorName = parts.slice(0, -(shape.length + 1));
            return { color: COLORS2[colorName] || null, shape };
          }
        }
        return { color: null, shape: null };
      }
      return { color: null, shape: null };
    }
    _drawShape(shape, x, y, w, h) {
      const ctx = this.ctx;
      const cx = x + w / 2;
      const cy = y + h / 2;
      const rx = w / 2;
      const ry = h / 2;
      const pad = 2 / 24;
      const prx = rx * (1 - 2 * pad);
      const pry = ry * (1 - 2 * pad);
      ctx.beginPath();
      switch (shape) {
        case "CIRCLE":
          ctx.ellipse(cx, cy, prx, pry, 0, 0, Math.PI * 2);
          break;
        case "TRIANGLE": {
          const top = cy - pry;
          const bottom = cy + pry;
          const left = cx - prx;
          const right = cx + prx;
          ctx.moveTo(cx, top);
          ctx.lineTo(right, bottom);
          ctx.lineTo(left, bottom);
          ctx.closePath();
          break;
        }
        case "DIAMOND":
          ctx.moveTo(cx, cy - pry);
          ctx.lineTo(cx + prx, cy);
          ctx.lineTo(cx, cy + pry);
          ctx.lineTo(cx - prx, cy);
          ctx.closePath();
          break;
        case "STAR": {
          const outerR = Math.min(prx, pry);
          const innerR = outerR * 0.4;
          for (let i = 0; i < 5; i++) {
            const outerAngle = -Math.PI / 2 + i * (2 * Math.PI / 5);
            const innerAngle = outerAngle + Math.PI / 5;
            if (i === 0) {
              ctx.moveTo(cx + outerR * Math.cos(outerAngle), cy + outerR * Math.sin(outerAngle));
            } else {
              ctx.lineTo(cx + outerR * Math.cos(outerAngle), cy + outerR * Math.sin(outerAngle));
            }
            ctx.lineTo(cx + innerR * Math.cos(innerAngle), cy + innerR * Math.sin(innerAngle));
          }
          ctx.closePath();
          break;
        }
        case "CROSS": {
          const armW = prx * 2 / 3;
          const halfArm = armW / 2;
          ctx.rect(cx - prx, cy - halfArm, prx * 2, armW);
          ctx.rect(cx - halfArm, cy - pry, armW, pry * 2);
          break;
        }
        case "HEXAGON": {
          const r = Math.min(prx, pry);
          for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 6 + i * (Math.PI / 3);
            const px = cx + r * Math.cos(angle);
            const py = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        }
        case "SQUARE": {
          const inset = Math.min(prx, pry) * (1 / 20);
          ctx.rect(cx - prx + inset, cy - pry + inset, (prx - inset) * 2, (pry - inset) * 2);
          break;
        }
        case "PENTAGON": {
          const r = Math.min(prx, pry);
          for (let i = 0; i < 5; i++) {
            const angle = -Math.PI / 2 + i * (2 * Math.PI / 5);
            const px = cx + r * Math.cos(angle);
            const py = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        }
        default:
          ctx.rect(x, y, w, h);
      }
      ctx.fill();
    }
    _drawArrow(x, y, w, h, orientation, color) {
      const cx = x + w / 2;
      const cy = y + h / 2;
      const len = Math.min(w, h) * 0.3;
      const arrowColor = [color[0], 255 - color[1], color[2]];
      this.ctx.strokeStyle = `rgb(${arrowColor[0]}, ${arrowColor[1]}, ${arrowColor[2]})`;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.lineTo(cx + orientation.x * len, cy + orientation.y * len);
      this.ctx.stroke();
    }
    _drawResources(sprite, x, y, w, h) {
      const resources = sprite.resources;
      let barIdx = 0;
      const barHeight = 3;
      for (const key of Object.keys(resources)) {
        if (key === "toJSON") continue;
        const val = resources[key];
        if (val > 0) {
          const barY = y + h + barIdx * (barHeight + 1);
          this.ctx.fillStyle = "#FFD400";
          this.ctx.fillRect(x, barY, w * Math.min(val / 5, 1), barHeight);
          barIdx++;
        }
      }
    }
    _drawHUD(level) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "14px monospace";
      this.ctx.textAlign = "left";
      const y = this.canvas.height - 5;
      this.ctx.fillText(`Score: ${level.score}  Time: ${level.time}`, 5, y);
      if (level.ended) {
        this.ctx.fillStyle = level.won ? "#0f0" : "#f00";
        this.ctx.font = "bold 24px monospace";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          level.won ? "WIN" : "LOSE",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
      }
    }
  };

  // games/game-data.js
  var GAMES = {
    "roomworld": {
      description: `BasicGame
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
        Timeout limit=500 win=False`,
      levels: {
        0: `wwwwwwwwwwwww
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
wwwwwwwwwwwww`,
        1: `wwwwwwwwwwwww
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
wwwwwwwwwwwww`,
        2: `wwwwwwwwwwwww
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
wwwwwwwwwwwww`,
        3: `wwwwwwwwwwwww
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
wwwwwwwwwwwww`
      }
    },
    "avoidGeorge_vgfmri4": {
      description: `BasicGame
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
        Timeout limit=400 win=True`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "bait_vgfmri3": {
      description: `BasicGame
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
        SpriteCounter stype=avatar limit=0 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwwwww
w.........A...........w
w.....................w
w.....g........k......w
w.....................w
w.....................w
wwwwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwwwww
w...A.....w......m....w
w.........w..........kw
w.....g...............w
w.........w...........w
w...m.....w......m....w
wwwwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............................w
w...A...........w..1.........w
w...............w.........k..w
wwwwwwwwwwwww1wwwwwwwwwwwwwwww
w............................w
w..m.....w.......w...........w
w...m....w.......w...........w
w.m......w.......w.....g.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwww
w.....................w
w...A....k.......m....w
w.............1.......w
w.....................w
w...m.................w
w..............w00wwwww
w....1.m.......w......w
w..............w..g..mw
wwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        9: `wwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwww`,
        10: `wwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwww`,
        11: `wwwwwwwwwwwww
w...wkw.....w
w...w000....w
w...w0m01...w
w....0111...w
w.....1A1...w
w....01.1...w
w..1........w
w...........w
w....wwwg...w
wwwwwwwwwwwww`
      }
    },
    "bait_vgfmri4": {
      description: `BasicGame
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
        SpriteCounter stype=avatar limit=0 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwww.wwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "chase_vgfmri3": {
      description: `BasicGame
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
        SpriteCounter stype=avatar win=False`,
      levels: {
        0: `wwwwwwwwwww
w.........w
wA........w
w.........w
w....0....w
w.........w
wwwwwwwwwww`,
        1: `wwwwwwwwwww
w..0......w
w....w....w
w..www..A.w
w....w....w
w.....0...w
wwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwwwwwww
w...........w.............w
w...w1......w..w...w......w
w......wwwwww..w...w......w
w...w..wwwwww..0...www....w
w...........w......www....w
wwww......0......A........w
w.....ww...wwwwww....w....w
w.....ww...ww.....w..w0...w
w.....w...................w
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwww
w.......0...w.......0.....w
w...w.......w..0..........w
w......wwwwww......w......w
w...w..wwwwww......www....w
w...........w......www....w
wwww.....0.......A........w
w..0..ww...wwwwww....w....w
w.....ww...ww.....w..w0...w
w.....w....0..............w
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwww
wAww..........0..... ..w
w.ww..wwwwww.......www.w
w.ww..... ....ww...w.0.w
w.....w.......ww...w0..w
w..0..w...wwwwww...0...w
w.....w0.....0.... ..www
w.0...wwwwwww.....0....w
w.ww..w..0..w...wwww...w
w.......0.....0........w
wwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwww
w.....0................w
w..0...w. ....w.0......w
w...w.......0.ww.......w
w.....w........0...w...w
w.0..0.....0w..........w
w.....w....w...w..w....w
w.......w..0....w......w
w...w.....w..0..w..0...w
w......0......A........w
wwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwwwwww
ww....w......0.....0000w
ww..w.w....w.wwwwwwwww.w
ww..0..ww....... ......w
ww.w...........0.......w
w .......ww.......0....w
w.0.0..ww...0........0.w
w.. .....000...0.0.....w
w......ww..0..0........w
w...A...0......wwwwwww.w
wwwwwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        9: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        10: `wwwwwwwwwwwwwwwwwwwwwwww
w.0.w..0........w..0...w
w...w....ww.....w..wwwww
w...w.ww..w...0.0......w
w...w.0...w..wwwwwww...w
w.0wwwwwwww..0....w....w
w.............0...w...ww
w.ww...ww0...wwwwww.00.w
wA...wwwwww..0....w....w
www....0......w..0..wwww
wwwwwwwwwwwwwwwwwwwwwwww`,
        11: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
      }
    },
    "chase_vgfmri4": {
      description: `BasicGame
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
        SpriteCounter stype=avatar win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "helper_vgfmri3": {
      description: `BasicGame frame_rate=30
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
        SpriteCounter stype=box1 limit=0 win=True`,
      levels: {
        0: `wwwwwwwwwwwwwwwwww
w........a.......w
w......w.........w
w......w.........w
w..x...w......a..w
w......w.........w
w......www.......w
w..A.............w
www...x..........w
wwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
w.x.................w
w...a.....a.........w
w............a......w
w...................w
w...b..........a....w
w........a..........w
w..A..b..........b..w
wwwx................w
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwww
w...............w
w.b.............w
w.......fffff...w
w..b..a.f.x.f...w
w.......f..xf...w
w..A....fffff...w
w.........a.....w
www..........b..w
wwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        9: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        10: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        11: `wwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwww`
      }
    },
    "helper_vgfmri4": {
      description: `BasicGame frame_rate=30
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
        Timeout limit=600 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "lemmings_vgfmri3": {
      description: `BasicGame
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
        MultiSpriteCounter stype1=entrance stype2=lemming limit=0 win=True`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwwwww
w..x................www
w..w..................w
w.......A............ew
wwwwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwwwww
w..x................www
w..w........wwwww.....w
w.......A.......w....ew
wwwwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwwwww
w..x...ww.w....w....www
w..www..w...w..w.w....w
w.......A........w...ew
wwwwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w................................w
w.........whh........wwww...x....w
w........wwww........whww........w
w.........www........wwww........w
w.........ww.....A.....wh........w
w........wwwh..........wwh.......w
w.........www...www...wwww.......w
w.......e..www........wwww.......w
w................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w............ww..wwwwww...........w
w............ww.hhh..hw.w.........w
w.......x....w..wwwwww...ww.......w
w.......whw..w.wwwwww.w...........w
w.......ww.....wwwwwhww...........w
w.......ww...hwwwwwwwww...........w
w............hw..w..ww............w
w.......w....hw....wwww...........w
w.......A................e........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..................................w
w......................e...........w
w........wwwwwwwwwwwwwwww..........w
w........wwwwwwwwhhwwwwwwwwwwwwwwwww
w........wwhhhwwwwwwwwhww..........w
wwwwwwwwwwwwwwwwwhhwwwwww..........w
w........wwwwwwwwwwwwwhww..........w
w.........x............A...........w
w..................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        9: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        10: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w...............w.......wh........w
w..e.....wwwwwwww.......wwww......w
w........whhhhhhh.........w.......w
w........w........................w
wwwwwwwwww......wwwwwwwwwwwwwwwwwww
w...............whw.....whw.......w
w.........w.w...whw.....whw.......w
w.......A...w...whw.....whw.......w
w...........w...www.....wwx.......w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        11: `wwwwwwwwwwwwwwwwwwwww
w....x.ww.wwwwww....w
w.....hwwwww.wwww...w
w..w..wwwwwwwww..ww.w
w..wwww.wwwwww.w....w
w..ww.hhwwwwwhww....w
w..ww.wwwwwwwwww....w
w.....wwhhw..ww.....w
w....wwwwww.wwww....w
w..A.............e..w
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "lemmings_vgfmri4": {
      description: `BasicGame
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
        Timeout limit=600 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    },
    "plaqueAttack_vgfmri3": {
      description: `BasicGame
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
    MultiSpriteCounter stype1=hotdoghole stype2=hotdog stype3=burger stype4=burgerhole limit=0 win=True`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
wwww..www......dwwwww
w...................w
w........A..........w
w...................w
w...................w
w..m.m.m............w
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
wwwwd.www......dwwwww
w...................w
w..n.....A........n.w
w...................w
w...mm.....m.m..m.m.w
www.......ww.......ww
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
wwww..www.......wwwww
w..n.n.n.......n.n.nw
w........A..........w
w...................w
wwwwwww...ww...wwwwww
w......v..ww..v.....w
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwww`,
        9: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        10: `wwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwww`,
        11: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
      }
    },
    "sokoban_vgfmri3": {
      description: `BasicGame square_size=20
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
        Timeout limit=600 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
w..............0ww..w
w......1............w
w...........A.......w
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwww
w......w..0.....w
w..1...w........w
w......w.....A..w
w...............w
w...............w
wwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`
      }
    },
    "zelda_vgfmri3": {
      description: `BasicGame
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
        Timeout limit=600 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.......g..w.................w
w..........w.................w
w.................w.......+..w
w.....A...........w..........w
w.................w..........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w.......g..w.................w
w..........w.................w
w.................w.......+..w
w...............A.w..........w
w...3.............w..........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..........w.................w
w..3.......wg..........3.....w
w............................w
w............................w
w............................w
w...................w........w
w...................w........w
w..3.......w........w........w
w..........w+.......w..A.....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwww
wA.......w..w
w..w........w
w...w...w.+ww
www.w2..wwwww
w.......w.g.w
w.2.........w
w.....2.....w
wwwwwwwwwwwww`,
        8: `wwwwwwwwwwwww
w.3.gw....1.w
w..www......w
w..........2w
w.......wwwww
w.......w+..w
w...w...w...w
wA..w.......w
wwwwwwwwwwwww`,
        9: `wwwwwwwwwwwww
w..2.ww....Aw
w....w......w
w.w.....wwwww
w+w........3w
w.w..wwwwwwww
w.......w...w
w...3w....wgw
wwwwwwwwwwwww`,
        10: `wwwwwwwwwwwww
w..........gw
w....w......w
w.w.w..1....w
w+w.........w
ww3..3..2...w
w..w..w.w.w.w
w...A.......w
wwwwwwwwwwwww`,
        11: `wwwwwwwwwwwww
w....w....g.w
w...www.....w
w.1..www....w
w..wwwwwww..w
w......w....w
w....w...1..w
wA...w+...1.w
wwwwwwwwwwwww`
      }
    },
    "zelda_vgfmri4": {
      description: `BasicGame
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
        Timeout limit=600 win=False`,
      levels: {
        0: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        1: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        2: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        3: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        4: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        5: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        6: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        7: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`,
        8: `wwwwwwwwwwwwwwwwwwwww
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
wwwwwwwwwwwwwwwwwwwww`
      }
    }
  };

  // replay-codec.js
  function expandDeltaStates(data) {
    if (!data.delta_encoded) return;
    const states = data.states;
    if (!states || states.length < 2) {
      delete data.delta_encoded;
      return;
    }
    let prev = states[0].sprites;
    for (let i = 1; i < states.length; i++) {
      if (!("sprites" in states[i])) {
        states[i].sprites = Object.assign({}, prev);
      } else {
        const merged = Object.assign({}, prev, states[i].sprites);
        for (const k in merged) {
          if (merged[k] === null) delete merged[k];
        }
        states[i].sprites = merged;
      }
      prev = states[i].sprites;
    }
    delete data.delta_encoded;
  }

  // catalogue-main.js
  setupRegistry();
  var __MANIFEST__ = { "cohort3": { "sub-01": { "stats": { "wins": 203, "losses": 93 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-01/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-01/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-01/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-01/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-01/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-01/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-02": { "stats": { "wins": 208, "losses": 77 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-02/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-02/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-02/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-02/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-02/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-02/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-03": { "stats": { "wins": 145, "losses": 96 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-03/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-03/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-03/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-03/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-03/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-03/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-04": { "stats": { "wins": 162, "losses": 96 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-04/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-04/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-04/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-04/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-04/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-04/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-05": { "stats": { "wins": 118, "losses": 117 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-05/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-05/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-05/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-05/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-05/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-05/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-06": { "stats": { "wins": 173, "losses": 87 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-06/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-06/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-06/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-06/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-06/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-06/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-07": { "stats": { "wins": 122, "losses": 114 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-07/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-07/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-07/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-07/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-07/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-07/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-08": { "stats": { "wins": 115, "losses": 106 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-08/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-08/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-08/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-08/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-08/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-08/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-09": { "stats": { "wins": 128, "losses": 63 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-09/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-09/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-09/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-09/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-09/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-09/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-10": { "stats": { "wins": 124, "losses": 81 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-10/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-10/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-10/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-10/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-10/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-10/plaqueAttack_vgfmri3.replay.json.gz" } }, "sub-11": { "stats": { "wins": 96, "losses": 77 }, "replays": { "bait_vgfmri3": "llm_catalogue/cohort3/sub-11/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/cohort3/sub-11/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/cohort3/sub-11/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/cohort3/sub-11/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/cohort3/sub-11/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/cohort3/sub-11/plaqueAttack_vgfmri3.replay.json.gz" } } }, "cohort4": { "sub-12": { "stats": { "wins": 78, "losses": 118 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-12/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-12/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-12/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-12/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-12/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-12/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-13": { "stats": { "wins": 99, "losses": 109 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-13/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-13/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-13/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-13/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-13/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-13/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-14": { "stats": { "wins": 118, "losses": 98 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-14/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-14/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-14/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-14/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-14/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-14/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-15": { "stats": { "wins": 117, "losses": 104 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-15/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-15/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-15/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-15/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-15/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-15/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-16": { "stats": { "wins": 89, "losses": 118 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-16/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-16/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-16/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-16/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-16/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-16/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-17": { "stats": { "wins": 119, "losses": 85 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-17/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-17/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-17/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-17/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-17/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-17/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-18": { "stats": { "wins": 120, "losses": 101 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-18/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-18/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-18/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-18/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-18/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-18/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-19": { "stats": { "wins": 137, "losses": 96 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-19/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-19/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-19/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-19/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-19/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-19/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-20": { "stats": { "wins": 100, "losses": 91 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-20/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-20/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-20/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-20/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-20/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-20/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-21": { "stats": { "wins": 93, "losses": 106 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-21/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-21/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-21/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-21/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-21/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-21/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-22": { "stats": { "wins": 117, "losses": 141 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-22/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-22/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-22/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-22/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-22/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-22/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-23": { "stats": { "wins": 114, "losses": 90 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-23/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-23/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-23/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-23/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-23/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-23/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-24": { "stats": { "wins": 88, "losses": 103 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-24/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-24/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-24/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-24/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-24/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-24/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-25": { "stats": { "wins": 108, "losses": 102 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-25/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-25/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-25/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-25/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-25/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-25/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-26": { "stats": { "wins": 114, "losses": 109 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-26/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-26/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-26/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-26/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-26/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-26/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-27": { "stats": { "wins": 87, "losses": 123 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-27/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-27/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-27/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-27/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-27/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-27/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-28": { "stats": { "wins": 105, "losses": 111 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-28/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-28/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-28/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-28/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-28/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-28/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-29": { "stats": { "wins": 118, "losses": 85 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-29/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-29/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-29/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-29/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-29/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-29/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-30": { "stats": { "wins": 99, "losses": 89 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-30/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-30/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-30/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-30/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-30/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-30/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-31": { "stats": { "wins": 91, "losses": 117 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-31/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-31/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-31/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-31/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-31/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-31/avoidGeorge_vgfmri4.replay.json.gz" } }, "sub-32": { "stats": { "wins": 66, "losses": 120 }, "replays": { "bait_vgfmri4": "llm_catalogue/cohort4/sub-32/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/cohort4/sub-32/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/cohort4/sub-32/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/cohort4/sub-32/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/cohort4/sub-32/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/cohort4/sub-32/avoidGeorge_vgfmri4.replay.json.gz" } } }, "lrm-cr": { "deepseek/deepseek-v3.2": { "stats": { "wins": 138, "losses": 58 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v3.2/avoidGeorge_vgfmri4.replay.json.gz" } }, "deepseek/deepseek-v4-flash": { "stats": { "wins": 140, "losses": 53 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-flash/avoidGeorge_vgfmri4.replay.json.gz" } }, "deepseek/deepseek-v4-pro": { "stats": { "wins": 82, "losses": 22 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/deepseek/deepseek-v4-pro/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-122b-a10b": { "stats": { "wins": 75, "losses": 52 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-122b-a10b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-27b": { "stats": { "wins": 102, "losses": 68 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-27b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-35b-a3b": { "stats": { "wins": 74, "losses": 41 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-35b-a3b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-397b-a17b": { "stats": { "wins": 120, "losses": 66 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-397b-a17b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-9b": { "stats": { "wins": 20, "losses": 14 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-cr/qwen/qwen3.5-9b/avoidGeorge_vgfmri4.replay.json.gz" } } }, "lrm-ao": { "deepseek/deepseek-v3.2": { "stats": { "wins": 37, "losses": 68 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v3.2/avoidGeorge_vgfmri4.replay.json.gz" } }, "deepseek/deepseek-v4-flash": { "stats": { "wins": 51, "losses": 77 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-flash/avoidGeorge_vgfmri4.replay.json.gz" } }, "deepseek/deepseek-v4-pro": { "stats": { "wins": 66, "losses": 75 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/deepseek/deepseek-v4-pro/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-122b-a10b": { "stats": { "wins": 34, "losses": 67 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-122b-a10b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-27b": { "stats": { "wins": 38, "losses": 70 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-27b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-35b-a3b": { "stats": { "wins": 27, "losses": 68 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-35b-a3b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-397b-a17b": { "stats": { "wins": 40, "losses": 70 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-397b-a17b/avoidGeorge_vgfmri4.replay.json.gz" } }, "qwen/qwen3.5-9b": { "stats": { "wins": 34, "losses": 114 }, "replays": { "bait_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/bait_vgfmri3.replay.json.gz", "chase_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/chase_vgfmri3.replay.json.gz", "helper_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/helper_vgfmri3.replay.json.gz", "lemmings_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/lemmings_vgfmri3.replay.json.gz", "zelda_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/zelda_vgfmri3.replay.json.gz", "plaqueAttack_vgfmri3": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/plaqueAttack_vgfmri3.replay.json.gz", "bait_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/bait_vgfmri4.replay.json.gz", "chase_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/chase_vgfmri4.replay.json.gz", "helper_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/helper_vgfmri4.replay.json.gz", "lemmings_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/lemmings_vgfmri4.replay.json.gz", "zelda_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/zelda_vgfmri4.replay.json.gz", "avoidGeorge_vgfmri4": "llm_catalogue/lrm-ao/qwen/qwen3.5-9b/avoidGeorge_vgfmri4.replay.json.gz" } } } };
  var VGFMRI3_GAMES = [
    "bait_vgfmri3",
    "chase_vgfmri3",
    "helper_vgfmri3",
    "lemmings_vgfmri3",
    "zelda_vgfmri3",
    "plaqueAttack_vgfmri3"
  ];
  var VGFMRI4_GAMES = [
    "bait_vgfmri4",
    "chase_vgfmri4",
    "helper_vgfmri4",
    "lemmings_vgfmri4",
    "zelda_vgfmri4",
    "avoidGeorge_vgfmri4"
  ];
  var SECTIONS = [
    {
      id: "cohort3",
      title: "Cohort 3 (vgfmri3)",
      games: VGFMRI3_GAMES,
      type: "human",
      cohort: "vgfmri3"
    },
    {
      id: "cohort4",
      title: "Cohort 4 (vgfmri4)",
      games: VGFMRI4_GAMES,
      type: "human",
      cohort: "vgfmri4"
    },
    {
      id: "lrm-cr",
      title: "Large Reasoning Models -- Copied-reasoning",
      games: [...VGFMRI3_GAMES, ...VGFMRI4_GAMES],
      type: "llm",
      rationale_mode: "copied-reasoning",
      suggestion_level: "elaborate"
    },
    {
      id: "lrm-ao",
      title: "Large Reasoning Models -- Action-only",
      games: [...VGFMRI3_GAMES, ...VGFMRI4_GAMES],
      type: "llm",
      rationale_mode: "action-only",
      suggestion_level: "elaborate"
    }
  ];
  var DISPLAY_NAMES = {
    bait_vgfmri3: "Bait (v3)",
    bait_vgfmri4: "Bait (v4)",
    chase_vgfmri3: "Chase (v3)",
    chase_vgfmri4: "Chase (v4)",
    helper_vgfmri3: "Helper (v3)",
    helper_vgfmri4: "Helper (v4)",
    lemmings_vgfmri3: "Lemmings (v3)",
    lemmings_vgfmri4: "Lemmings (v4)",
    zelda_vgfmri3: "Zelda (v3)",
    zelda_vgfmri4: "Zelda (v4)",
    plaqueAttack_vgfmri3: "Plaque Attack (v3)",
    avoidGeorge_vgfmri4: "Avoid George (v4)"
  };
  var DISPLAY_NAMES_SHORT = {
    bait_vgfmri3: "Bait",
    bait_vgfmri4: "Bait",
    chase_vgfmri3: "Chase",
    chase_vgfmri4: "Chase",
    helper_vgfmri3: "Helper",
    helper_vgfmri4: "Helper",
    lemmings_vgfmri3: "Lemmings",
    lemmings_vgfmri4: "Lemmings",
    zelda_vgfmri3: "Zelda",
    zelda_vgfmri4: "Zelda",
    plaqueAttack_vgfmri3: "Plaque Attack",
    avoidGeorge_vgfmri4: "Avoid George"
  };
  var CELL_SIZE = 18;
  var HUMAN_FPS = 20;
  var STREAM_CHARS_PER_SEC = 300;
  var MAX_STEP_DWELL_MS = 700;
  var manifest = {};
  async function loadManifest() {
    manifest = __MANIFEST__;
  }
  function getSubjects(sectionId) {
    const section = manifest[sectionId];
    if (!section) return [];
    return Object.keys(section).sort();
  }
  function getStats(sectionId, subject) {
    return manifest[sectionId]?.[subject]?.stats || { wins: 0, losses: 0 };
  }
  function getReplayKey(sectionId, subject, game) {
    return manifest[sectionId]?.[subject]?.replays?.[game] || null;
  }
  async function loadReplayLocal(s3Key) {
    if (!window.__REPLAY_GZ__?.[s3Key]) {
      const jsPath = "catalogue-data/" + s3Key.replace(".replay.json.gz", ".replay.js");
      await new Promise((resolve, reject) => {
        const sc = document.createElement("script");
        sc.src = jsPath;
        sc.onload = resolve;
        sc.onerror = () => reject(new Error("Failed to load replay script: " + jsPath));
        document.head.appendChild(sc);
      });
    }
    const b64 = window.__REPLAY_GZ__?.[s3Key];
    if (!b64) throw new Error("Replay data missing after load: " + s3Key);
    const binary = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(binary);
    writer.close();
    const text = await new Response(ds.readable).text();
    const data = JSON.parse(text);
    expandDeltaStates(data);
    return data;
  }
  function gridStateToPixelState(gridState, blockSize) {
    const pixelSprites = {};
    for (const [key, spriteList] of Object.entries(gridState.sprites)) {
      pixelSprites[key] = spriteList.map((s) => ({
        id: s.id,
        key: s.key,
        x: s.col * blockSize,
        y: s.row * blockSize,
        w: blockSize,
        h: blockSize,
        alive: s.alive,
        resources: s.resources || {},
        speed: s.speed,
        cooldown: s.cooldown,
        orientation: s.orientation,
        _age: s._age,
        lastmove: s.lastmove
      }));
    }
    return { score: gridState.score, time: gridState.time, sprites: pixelSprites };
  }
  var GameCard = class {
    constructor(container, gameName, playbackMode, showVariant) {
      this.gameName = gameName;
      this.playbackMode = playbackMode;
      this.replayData = null;
      this.s3Key = null;
      this.states = [];
      this.steps = [];
      this.totalFrames = 0;
      this.currentFrameIndex = 0;
      this.currentStepIndex = 0;
      this.playing = false;
      this.playTimer = null;
      this.streamTimer = null;
      this.streamedChars = 0;
      this._fullRationale = "";
      this.currentLevel = null;
      this.currentLevelNum = -1;
      this.game = null;
      this.renderer = null;
      this.levels = {};
      this._build(container, showVariant);
    }
    _build(parent, showVariant) {
      const card = document.createElement("div");
      card.className = "game-card";
      this.titleEl = document.createElement("a");
      this.titleEl.className = "game-card-title";
      this.titleEl.textContent = showVariant ? DISPLAY_NAMES[this.gameName] || this.gameName : DISPLAY_NAMES_SHORT[this.gameName] || this.gameName;
      this.titleEl.addEventListener("click", () => this._openFullViewer());
      card.appendChild(this.titleEl);
      this.canvasContainer = document.createElement("div");
      this.canvasContainer.className = "canvas-container";
      this.canvas = document.createElement("canvas");
      this.canvasContainer.appendChild(this.canvas);
      this.overlay = document.createElement("div");
      this.overlay.className = "canvas-overlay";
      this.overlay.textContent = "Loading...";
      this.canvasContainer.appendChild(this.overlay);
      this.playIndicator = document.createElement("div");
      this.playIndicator.className = "play-indicator";
      this.playIndicator.innerHTML = `<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>`;
      this.canvasContainer.appendChild(this.playIndicator);
      this.canvasContainer.addEventListener("click", (e) => {
        if (!this.overlay.classList.contains("hidden")) return;
        e.stopPropagation();
        this.togglePlay();
      });
      card.appendChild(this.canvasContainer);
      const anchor = document.createElement("div");
      anchor.className = "card-drawer-anchor";
      const drawer = document.createElement("div");
      drawer.className = "card-drawer";
      const drawerInner = document.createElement("div");
      drawerInner.className = "card-drawer-inner";
      this.scrubber = document.createElement("input");
      this.scrubber.type = "range";
      this.scrubber.min = 0;
      this.scrubber.max = 0;
      this.scrubber.value = 0;
      this.scrubber.addEventListener("input", () => {
        if (this._updatingScrubber) return;
        this.stop();
        this._goToIndex(parseInt(this.scrubber.value));
      });
      drawerInner.appendChild(this.scrubber);
      const ft = document.createElement("div");
      ft.className = "flap-tabs";
      this.descTab = this._makeTab("Game Description", "flap-tab-desc");
      this.levelTab = this._makeTab("Level Layout", "flap-tab-level");
      this.tryTab = this._makeTab("Try Yourself", "flap-tab-try");
      ft.appendChild(this.descTab);
      ft.appendChild(this.levelTab);
      ft.appendChild(this.tryTab);
      drawerInner.appendChild(ft);
      this.descPanel = this._makePanel("flap-panel-desc");
      this.descTextarea = this._makeTextarea(120);
      this.descPanel.appendChild(this.descTextarea);
      drawerInner.appendChild(this.descPanel);
      this.levelPanel = this._makePanel("flap-panel-level");
      this.levelTextarea = this._makeTextarea(80);
      this.levelPanel.appendChild(this.levelTextarea);
      drawerInner.appendChild(this.levelPanel);
      this.descTab.addEventListener("click", () => this._toggleFlap("desc"));
      this.levelTab.addEventListener("click", () => this._toggleFlap("level"));
      this.tryTab.addEventListener("click", () => this._openTryPage());
      if (this.playbackMode === "llm") {
        const stripe = document.createElement("div");
        stripe.className = "reasoning-stripe no-reasoning";
        this.reasoningText = document.createElement("div");
        this.reasoningText.className = "reasoning-text";
        this.reasoningText.textContent = "";
        stripe.appendChild(this.reasoningText);
        const hint = document.createElement("div");
        hint.className = "click-hint";
        hint.textContent = "Click to open full viewer";
        stripe.appendChild(hint);
        this.reasoningStripe = stripe;
        stripe.addEventListener("click", () => this._openFullViewer());
        drawerInner.appendChild(stripe);
      } else {
        this.reasoningStripe = null;
        this.reasoningText = null;
      }
      drawer.appendChild(drawerInner);
      anchor.appendChild(drawer);
      card.appendChild(anchor);
      parent.appendChild(card);
      this.cardEl = card;
    }
    _makeTab(text, cls) {
      const b = document.createElement("button");
      b.className = "flap-tab " + cls;
      b.textContent = text;
      return b;
    }
    _makePanel(cls) {
      const d = document.createElement("div");
      d.className = "flap-panel " + cls;
      return d;
    }
    _makeTextarea(h) {
      const t = document.createElement("textarea");
      t.readOnly = true;
      t.spellcheck = false;
      t.style.height = h + "px";
      return t;
    }
    _toggleFlap(which) {
      const panels = [
        { tab: this.descTab, panel: this.descPanel, id: "desc" },
        { tab: this.levelTab, panel: this.levelPanel, id: "level" }
      ];
      for (const p of panels) {
        if (p.id === which) {
          const opening = !p.panel.classList.contains("open");
          p.panel.classList.toggle("open");
          p.tab.classList.toggle("active");
          if (!opening) continue;
        } else {
          p.panel.classList.remove("open");
          p.tab.classList.remove("active");
        }
      }
    }
    // Human: scrubber indexes frames. LLM: scrubber indexes steps.
    _currentIndex() {
      return this.playbackMode === "human" ? this.currentFrameIndex : this.currentStepIndex;
    }
    _maxIndex() {
      return this.playbackMode === "human" ? Math.max(0, this.totalFrames - 1) : Math.max(0, this.steps.length - 1);
    }
    async load(s3Key) {
      this.overlay.textContent = "Loading...";
      this.overlay.classList.remove("hidden");
      this.stop();
      this.s3Key = s3Key;
      if (!s3Key) {
        this.overlay.textContent = "No replay available";
        return;
      }
      const data = await loadReplayLocal(s3Key);
      this.replayData = data;
      this.states = data.states || [];
      this.steps = (data.steps || []).filter((s) => !s.action.startsWith("_"));
      this.totalFrames = this.states.length;
      const gameEntry = GAMES[this.gameName];
      if (!gameEntry) {
        this.overlay.textContent = "Unknown game: " + this.gameName;
        return;
      }
      if (this.playbackMode === "human" && !data.game_description) {
        throw new Error(this.gameName + ": human replay missing game_description field");
      }
      this.activeDesc = data.game_description || gameEntry.description;
      const parser = new VGDLParser();
      this.game = parser.parseGame(this.activeDesc);
      this.renderer = new Renderer(this.canvas, CELL_SIZE);
      this.levels = gameEntry.levels || {};
      this.currentLevelNum = -1;
      this.descTextarea.value = this.activeDesc;
      this.scrubber.max = this._maxIndex();
      this.scrubber.value = 0;
      this.overlay.classList.add("hidden");
      this._initialLoad = true;
      this._goToIndex(0);
      this._initialLoad = false;
    }
    _buildLevel(levelNum) {
      if (levelNum === this.currentLevelNum) return;
      const lvlStr = this.levels[levelNum];
      if (!lvlStr) return;
      this.currentLevel = this.game.buildLevel(lvlStr);
      this.currentLevelNum = levelNum;
      this.renderer.resize(this.currentLevel.width, this.currentLevel.height);
      this.levelTextarea.value = lvlStr;
      const lines = lvlStr.split("\n").filter((l) => l.length > 0);
      this.levelTextarea.style.height = Math.min(lines.length * 14 + 8, 160) + "px";
      const wallSprites = this.currentLevel.sprite_registry._liveSpritesByKey["wall"];
      if (wallSprites && wallSprites.length > 0) {
        const c = wallSprites[0].color;
        if (c) this.canvasContainer.style.background = `rgb(${c[0]},${c[1]},${c[2]})`;
      }
    }
    _goToIndex(index) {
      if (this.playbackMode === "human") {
        this._goToFrame(index);
      } else {
        this._goToStep(index);
      }
    }
    // Human mode: iterate through all states (frames) at 20fps
    _goToFrame(index) {
      if (!this.states.length) return;
      index = Math.max(0, Math.min(index, this.totalFrames - 1));
      this.currentFrameIndex = index;
      const gs = this.states[index];
      const levelNum = gs.level !== void 0 ? gs.level : 0;
      this._buildLevel(levelNum);
      if (this.currentLevel) {
        this.currentLevel.setGameState(gridStateToPixelState(gs, this.currentLevel.block_size));
        this.currentLevel.score = gs.score;
        this.currentLevel.time = index;
        this.renderer.render(this.currentLevel);
      }
      this._updatingScrubber = true;
      this.scrubber.value = index;
      this._updatingScrubber = false;
    }
    // LLM mode: iterate through steps with reasoning streaming
    _goToStep(index) {
      if (!this.steps.length) return;
      index = Math.max(0, Math.min(index, this.steps.length - 1));
      this.currentStepIndex = index;
      const step = this.steps[index];
      this._buildLevel(step.level !== void 0 ? step.level : 0);
      const stateIdx = step.state_index !== void 0 ? step.state_index : step.frame_idx !== void 0 ? step.frame_idx : index;
      if (stateIdx >= 0 && stateIdx < this.states.length && this.currentLevel) {
        const gs = this.states[stateIdx];
        this.currentLevel.setGameState(gridStateToPixelState(gs, this.currentLevel.block_size));
        this.currentLevel.score = gs.score;
        this.currentLevel.time = gs.time;
        this.renderer.render(this.currentLevel);
      }
      this._updatingScrubber = true;
      this.scrubber.value = index;
      this._updatingScrubber = false;
      this._updateReasoning(step);
    }
    _updateReasoning(step) {
      this._stopStream();
      if (!this.reasoningStripe) {
        if (this.playing) this._scheduleNoReasoningAdvance();
        return;
      }
      const resp = step.response || {};
      const rationale = resp.rationale || step.hidden_reasoning || "";
      if (!rationale) {
        this.reasoningStripe.classList.add("no-reasoning");
        this.reasoningText.textContent = this.playing ? step.action || "--" : "";
        if (this.playing) this._scheduleNoReasoningAdvance();
        return;
      }
      this.reasoningStripe.classList.remove("no-reasoning");
      if (!this.playing) {
        this.reasoningText.textContent = this._initialLoad ? "" : rationale;
        return;
      }
      this.streamedChars = 0;
      this._fullRationale = rationale;
      this.reasoningText.textContent = "";
      this._streamStartTime = performance.now();
      this._streamDurationMs = Math.min(
        rationale.length / STREAM_CHARS_PER_SEC * 1e3,
        MAX_STEP_DWELL_MS
      );
      this._streamTick();
    }
    _streamTick() {
      const elapsed = performance.now() - this._streamStartTime;
      const progress = Math.min(1, elapsed / this._streamDurationMs);
      const chars = Math.round(progress * this._fullRationale.length);
      this.reasoningText.textContent = this._fullRationale.slice(0, chars);
      this.reasoningStripe.scrollTop = this.reasoningStripe.scrollHeight;
      if (progress < 1) {
        this.streamTimer = requestAnimationFrame(() => this._streamTick());
      } else {
        this.streamTimer = null;
        this._onStreamDone();
      }
    }
    _onStreamDone() {
      if (!this.playing) return;
      if (this._currentIndex() >= this._maxIndex()) {
        this.stop();
        return;
      }
      this._goToIndex(this._currentIndex() + 1);
    }
    _scheduleNoReasoningAdvance() {
      this.playTimer = setTimeout(() => this._onStreamDone(), 1e3 / HUMAN_FPS);
    }
    _stopStream() {
      if (this.streamTimer) {
        cancelAnimationFrame(this.streamTimer);
        this.streamTimer = null;
      }
    }
    togglePlay() {
      this.playing ? this.stop() : this.play();
    }
    _flashIndicator(icon) {
      const svg = icon === "pause" ? '<svg viewBox="0 0 24 24" fill="white"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>' : '<svg viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>';
      this.playIndicator.innerHTML = svg;
      this.playIndicator.classList.add("flash");
      clearTimeout(this._flashTimer);
      this._flashTimer = setTimeout(() => this.playIndicator.classList.remove("flash"), 400);
    }
    play() {
      this.playing = true;
      this.cardEl.classList.add("is-playing");
      this._flashIndicator("play");
      if (this.playbackMode === "llm") {
        if (this.steps.length) {
          this._updateReasoning(this.steps[this.currentStepIndex]);
        }
      } else {
        this._scheduleNextFrame();
      }
    }
    stop() {
      this.playing = false;
      this.cardEl.classList.remove("is-playing");
      this._flashIndicator("pause");
      this._stopStream();
      if (this.playTimer) {
        clearTimeout(this.playTimer);
        this.playTimer = null;
      }
    }
    _scheduleNextFrame() {
      if (!this.playing || this.currentFrameIndex >= this.totalFrames - 1) {
        this.stop();
        return;
      }
      this.playTimer = setTimeout(() => {
        if (!this.playing) return;
        this._goToFrame(this.currentFrameIndex + 1);
        this._scheduleNextFrame();
      }, 1e3 / HUMAN_FPS);
    }
    _openFullViewer() {
      if (!this.s3Key) return;
      const url = "replay.html?local-key=" + encodeURIComponent(this.s3Key) + "&step=" + this.currentStepIndex;
      window.open(url, "_blank");
    }
    _openTryPage() {
      const levelNum = this.currentLevelNum >= 0 ? this.currentLevelNum : 0;
      let url = "interactive-gameplay.html?game=" + encodeURIComponent(this.gameName) + "&level=" + levelNum;
      if (this.s3Key) {
        url += "&replay=" + encodeURIComponent(this.s3Key);
      }
      window.open(url, "_blank");
    }
    destroy() {
      this.stop();
      this.cardEl?.remove();
    }
  };
  var CohortSection = class {
    constructor(parent, sectionDef) {
      this.def = sectionDef;
      this.cards = [];
      this.subjects = [];
      this.activeSubject = null;
      this.el = document.createElement("div");
      this.el.className = "cohort-section";
      const heading = document.createElement("h2");
      heading.className = "cohort-heading";
      heading.textContent = sectionDef.title;
      this.el.appendChild(heading);
      this.selectorRow = document.createElement("div");
      this.selectorRow.className = "selector-row";
      this.el.appendChild(this.selectorRow);
      this.gridContainer = document.createElement("div");
      this.el.appendChild(this.gridContainer);
      parent.appendChild(this.el);
    }
    populate() {
      this.subjects = getSubjects(this.def.id);
      this._buildTabs();
      if (this.subjects.length > 0) this.select(this.subjects[0]);
    }
    _buildTabs() {
      this.selectorRow.innerHTML = "";
      for (const subj of this.subjects) {
        const tab = document.createElement("button");
        tab.className = "selector-tab";
        const stats = getStats(this.def.id, subj);
        const label = this.def.type === "llm" ? subj.split("/").pop() : subj;
        tab.innerHTML = `${label} <span class="stats">${stats.wins}W/${stats.losses}L</span>`;
        tab.addEventListener("click", () => this.select(subj));
        this.selectorRow.appendChild(tab);
      }
    }
    async select(subject) {
      this.activeSubject = subject;
      const tabs = this.selectorRow.querySelectorAll(".selector-tab");
      tabs.forEach((tab, i) => {
        tab.classList.toggle("active", this.subjects[i] === subject);
      });
      for (const c of this.cards) c.destroy();
      this.cards = [];
      this.gridContainer.innerHTML = "";
      const isLlm = this.def.type === "llm";
      const mode = isLlm ? "llm" : "human";
      const games = this.def.games;
      if (isLlm) {
        const v3label = document.createElement("div");
        v3label.className = "cohort-block-label";
        v3label.textContent = "vgfmri3 games";
        this.gridContainer.appendChild(v3label);
        const grid3 = document.createElement("div");
        grid3.className = "game-grid";
        this.gridContainer.appendChild(grid3);
        for (const game of VGFMRI3_GAMES) {
          const card = new GameCard(grid3, game, mode, true);
          this.cards.push(card);
          card.load(getReplayKey(this.def.id, subject, game));
        }
        const sep = document.createElement("hr");
        sep.className = "cohort-block-separator";
        this.gridContainer.appendChild(sep);
        const v4label = document.createElement("div");
        v4label.className = "cohort-block-label";
        v4label.textContent = "vgfmri4 games";
        this.gridContainer.appendChild(v4label);
        const grid4 = document.createElement("div");
        grid4.className = "game-grid";
        this.gridContainer.appendChild(grid4);
        for (const game of VGFMRI4_GAMES) {
          const card = new GameCard(grid4, game, mode, true);
          this.cards.push(card);
          card.load(getReplayKey(this.def.id, subject, game));
        }
      } else {
        const grid = document.createElement("div");
        grid.className = "game-grid";
        this.gridContainer.appendChild(grid);
        for (const game of games) {
          const card = new GameCard(grid, game, mode, false);
          this.cards.push(card);
          card.load(getReplayKey(this.def.id, subject, game));
        }
      }
    }
  };
  async function init() {
    const root = document.getElementById("catalogue-root");
    await loadManifest();
    root.innerHTML = "";
    for (const def of SECTIONS) {
      const section = new CohortSection(root, def);
      section.populate();
    }
  }
  init();
})();
