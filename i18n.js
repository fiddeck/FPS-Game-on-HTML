/* ============================================================
   GOLDEN HOUR — 中英双语 / Chinese-English interface
   在设置 → 界面（INTERFACE）里新增“语言 / LANGUAGE”选项。
   做法：不改动游戏逻辑，只在运行时翻译文本节点，
   并把一个真实的设置行注入游戏的设置 schema。
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'golden-hour-lang';

  /* ---------- 词表 ---------- */
  var DICT = {
    /* ===== 加载 / 启动 ===== */
    'Golden Hour': '黄金时刻',
    'PREPARING': '准备中',
    'PREPARING THE ARMOURY': '准备军械库',
    'INITIALISING RENDERER': '初始化渲染器',
    'ASSEMBLING WEAPONS': '组装武器',
    'BUILDING FURNITURE': '搭建家具',
    'BRIEFING OPERATORS': '简报干员',
    'MAPPING ROUTES': '规划路线',
    'PAINTING MATERIALS': '绘制材质',
    'CAPTURING LIGHT': '捕捉光照',
    'DRESSING THE LOBBY': '布置大堂',
    'RAISING THE HOTEL': '建造酒店',
    'FINAL CHECKS': '最终检查',
    'PLEASE WAIT': '请稍候',
    'FIELD NOTES': '战地笔记',

    /* ===== 主菜单 ===== */
    'Golden Hour': '黄金时刻',
    'TEAM DEATHMATCH — 5 v 5 — FIRST TO 40': '团队死斗 — 5 v 5 — 先到 40 杀',
    'DEPLOY': '部署',
    'GUNSMITH': '枪械工坊',
    'ATTACHMENTS · CAMOS': '配件 · 迷彩',
    'DIFFICULTY': '难度',
    'REGULAR': '常规',
    'RECRUIT': '新兵',
    'VETERAN': '老兵',
    'HARDENED': '硬核',
    'SETTINGS': '设置',
    'CONTROLS · AUDIO · GRAPHICS': '操作 · 音频 · 画面',
    'LOADOUT': '配装',
    'ASSAULT RIFLE': '突击步枪',
    'SUBMACHINE GUN': '冲锋枪',
    'SHOTGUN': '霰弹枪',
    'PISTOL': '手枪',
    'FACTORY CONFIGURATION': '原厂配置',
    'FRAG × 2': '破片手雷 × 2',
    'FIELD UPGRADE —': '战场升级 —',
    'K9 UNIT': 'K9 军犬',
    'OPERATOR · VANGUARD': '干员 · 先锋',
    'MATCHES': '场次',
    'WINS': '胜场',
    'WIN RATE': '胜率',
    'ELIMS': '击杀',
    'WEAPON MASTERY': '武器精通',
    'CAMOS': '迷彩',
    'NAVIGATE': '移动',
    'SELECT': '选择',
    'CHANGE': '调整',

    /* ===== 设置：页签与按键说明 ===== */
    'BACK': '返回',
    'CONTROLS': '操作',
    'MOUSE & VIEW': '鼠标与视角',
    'AUDIO': '音频',
    'GRAPHICS': '画面',
    'INTERFACE': '界面',
    'LANGUAGE': '语言',
    'MOVEMENT': '移动',
    'MOVE': '移动',
    'SPRINT — ANY DIRECTION': '冲刺 — 任意方向',
    'JUMP / MANTLE': '跳跃 / 翻越',
    'CROUCH / SLIDE': '蹲下 / 滑铲',
    'PRONE / DIVE': '卧倒 / 俯冲',
    'COMBAT': '战斗',
    'FIRE': '开火',
    'AIM DOWN SIGHTS': '开镜瞄准',
    'RELOAD': '换弹',
    'MELEE': '近战',
    'OR': '或',
    'FRAG GRENADE': '破片手雷',
    'UNLEASH K9 UNIT': '释放 K9 军犬',
    'SWAP WEAPON': '切换武器',
    'INSPECT WEAPON': '检视武器',
    'GENERAL': '通用',
    'SCOREBOARD': '计分板',
    'PAUSE / BACK': '暂停 / 返回',
    'MENU NAVIGATE': '菜单导航',
    'MENU SELECT': '菜单选择',
    'SWITCH TAB': '切换页签',
    'FULLSCREEN': '全屏',
    'ADJUST': '调整',

    /* ===== 设置：鼠标与视角 ===== */
    'MOUSE SENSITIVITY': '鼠标灵敏度',
    'ADS SENSITIVITY MULTIPLIER': '开镜灵敏度倍率',
    'INVERT VERTICAL LOOK': '反转垂直视角',
    'OFF': '关',
    'ON': '开',
    'FIELD OF VIEW': '视野范围',
    'How far the view turns for a given mouse movement. Lower is steadier for rifles; higher turns faster in close quarters.':
      '鼠标移动相同距离时视角转动的幅度。数值越低越稳，适合步枪；越高在近距离转身越快。',
    'Applied on top of sensitivity while aiming down sights. Zoom already slows the view; 1.00 keeps the same hand distance per on-screen distance.':
      '开镜时叠加在基础灵敏度之上的倍率。放大本身就会让视角变慢；1.00 表示屏幕距离对应的手部移动与不开镜一致。',
    'Pushing the mouse forward looks down instead of up.':
      '向前推鼠标时视角向下，而不是向上。',
    'Horizontal field of view at 16:9. Wider shows more of the room and makes movement feel faster; narrower makes distant targets larger.':
      '16:9 下的水平视野。数值越大看到的空间越多、移动感更快；越小远处目标越大。',

    /* ===== 设置：音频 ===== */
    'MASTER VOLUME': '主音量',
    'EFFECTS VOLUME': '音效音量',
    'MUSIC VOLUME': '音乐音量',
    'Overall loudness of everything: weapons, footsteps, interface and music.':
      '所有声音的总音量：武器、脚步、界面与音乐。',
    'Weapons, impacts, footsteps and ambience, relative to the master volume.':
      '武器、击中、脚步与环境音，相对主音量生效。',
    'Menu score and the lounge band playing in the Ember Bar. Shooting the speaker also works.':
      '菜单音乐，以及 Ember Bar 里的现场乐队。把音箱打掉也行。',

    /* ===== 设置：画面 ===== */
    'QUALITY PRESET': '画质预设',
    'LOW': '低',
    'MEDIUM': '中',
    'HIGH': '高',
    'ULTRA': '极高',
    'low': '低',
    'medium': '中',
    'high': '高',
    'ultra': '极高',
    'MOTION BLUR': '动态模糊',
    'One switch for resolution scale, anti-aliasing, shadows, ambient occlusion, reflections and light shafts.':
      '一次调整分辨率缩放、抗锯齿、阴影、环境光遮蔽、反射与光束。',
    '70% resolution, no anti-aliasing, no ambient occlusion or floor reflections. For integrated graphics.':
      '70% 分辨率，无抗锯齿，无环境光遮蔽与地面反射。适合核显。',
    '85% resolution, 2× MSAA, half-rate floor reflections and light shafts.':
      '85% 分辨率，2× MSAA，半速地面反射与光束。',
    'Full resolution, 4× MSAA, ambient occlusion and 4K sun shadows. Recommended.':
      '完整分辨率，4× MSAA，环境光遮蔽与 4K 日光阴影。推荐。',
    'High, plus sharper reflections, denser light shafts and up to 2× pixel density on high-DPI displays.':
      '高画质之上，更锐利的反射、更密的光束；高分屏可达 2× 像素密度。',
    'Film-style blur on fast camera turns and on the weapon and hands as they move (reload, recoil, swap). The weapon stays sharp at rest. Off is the competitive choice.':
      '快速转视角以及换弹、后坐、换枪时武器与手部的电影式模糊。静止时武器保持清晰。关闭是竞技选择。',
    'Borderless fullscreen. F11 does the same; Esc leaves it.':
      '无边框全屏。F11 同样有效；Esc 退出。',

    /* ===== 设置：界面 ===== */
    'MINIMAP': '小地图',
    'ROTATING': '随视角旋转',
    'NORTH UP': '北向上',
    'CROSSHAIR COLOUR': '准星颜色',
    'WHITE': '白色',
    'CYAN': '青色',
    'LIME': '青柠',
    'AMBER': '琥珀',
    'HUD SCALE': 'HUD 缩放',
    'CONTROL HINTS': '操作提示',
    'Rotating keeps your view pointing up, like the compass. North Up keeps the hotel still and turns your arrow instead.':
      '随视角旋转：视角始终朝上，如同罗盘。北向上：地图固定，箭头随视角转动。',
    'Pick the colour you lose least against the sunset. The crosshair always turns red over an enemy.':
      '挑一个在夕阳里最不容易看丢的颜色。准星压在敌人身上时始终变红。',
    'Size of the in-match HUD. Menus are not affected.':
      '对局内 HUD 的大小。菜单不受影响。',
    'Shows the movement keys at the start of your first few matches.':
      '前几局开局时会显示移动按键提示。',
    'Interface language. The change applies immediately.':
      '界面语言，切换后立即生效。',

    /* ===== 枪械工坊 ===== */
    'PRIMARY': '主武器',
    'SECONDARY': '副武器',
    'WEAPON': '武器',
    'ATTACHMENTS': '配件',
    'OPTIC': '瞄具',
    'MUZZLE': '枪口',
    'UNDERBARREL': '下挂',
    'MAGAZINE': '弹匣',
    'STOCK': '枪托',
    'SLOT': '槽位',
    'OPTION': '选项',
    'EQUIP': '装备',
    'EQUIPPED': '已装备',
    'SET PRIMARY': '设为主武器',
    'EQUIP AS PRIMARY': '装备为主武器',
    'EQUIPPED AS PRIMARY': '已装备为主武器',
    'RESET': '重置',
    'RESET BUILD': '重置配装',
    'CONFIRM RESET': '确认重置',
    'NO STAT CHANGE': '属性无变化',
    'DAMAGE': '伤害',
    'RANGE': '射程',
    'FIRE RATE': '射速',
    'ACCURACY': '精度',
    'RECOIL CONTROL': '后坐控制',
    'MOBILITY': '机动性',
    'HANDLING': '操控性',
    'ADS TIME': '开镜时间',
    'ADS MOVE SPEED': '开镜移动速度',
    'HIP SPREAD': '腰射散布',
    'HORIZONTAL RECOIL': '水平后坐力',
    'VERTICAL RECOIL': '垂直后坐力',
    'MOVE SPEED': '移动速度',
    'SPRINT-TO-FIRE': '跑射延迟',
    'RELOAD TIME': '换弹时间',
    'MAG SIZE': '弹匣容量',
    'MUZZLE FLASH': '枪口火焰',
    'SIDEARM — ALWAYS CARRIED': '副武器 — 始终携带',
    'AUTO': '全自动',
    'SEMI': '半自动',
    'PUMP': '泵动',
    'BURST': '点射',
    'Balanced carbine. Wins the long lanes of the atrium.':
      '均衡的卡宾枪。擅长中庭的长通道。',
    'Fast-handling 9 mm. Owns corridors and the bar.':
      '操控迅捷的 9 毫米。走廊与酒吧的主宰。',
    'Pump-action 12 gauge. One trigger pull inside a room.':
      '泵动式 12 号。室内一枪一个。',
    'Striker-fired sidearm. Always on your hip.':
      '击针式副武器。始终随身。',

    /* 配件名称与说明 */
    'IRON SIGHTS': '机械瞄具',
    'KITE REFLEX': 'KITE 红点',
    'HALO HOLOGRAPHIC': 'HALO 全息',
    'VANTAGE 2.5×': 'VANTAGE 2.5倍镜',
    'FACTORY MUZZLE': '原厂枪口',
    'MONOLITH SUPPRESSOR': 'MONOLITH 消音器',
    'PORTED COMPENSATOR': '开孔补偿器',
    'SLOTTED BRAKE': '开槽制退器',
    'FULL CHOKE': '全收束器',
    'NO UNDERBARREL': '无下挂',
    'VERTICAL FOREGRIP': '垂直握把',
    'ANGLED FOREGRIP': '斜三角握把',
    'TAC LASER': '战术镭指',
    'STANDARD MAG': '标准弹匣',
    'EXTENDED MAG': '扩容弹匣',
    'SPEED MAG': '快速弹匣',
    'FACTORY STOCK': '原厂枪托',
    'SKELETON STOCK': '骨架枪托',
    'PADDED STOCK': '缓冲枪托',
    'Nothing between you and the target. Fastest to the eye.':
      '目标与视线之间毫无遮挡，抬枪最快。',
    'Open red dot. Precise and quick.': '开放式红点，精准且迅速。',
    'Wide window with a ring-and-dot reticle.': '宽视窗，环形点状分划。',
    'Magnified prism sight for the long lanes.': '放大棱镜瞄具，适合长走廊。',
    'Standard flash hider.': '标准消焰器。',
    'Quiet report and a hidden flash. Enemies hear you late.':
      '枪声低沉、火光隐蔽。敌人更晚发现你。',
    'Vents gas upward to hold the muzzle down.': '向上导气，压住枪口上跳。',
    'Kills side-to-side drift.': '消除左右漂移。',
    'Tighter pattern, longer reach.': '散布更紧，射程更远。',
    'Bare handguard.': '光秃的护木。',
    'A firm hold that steadies sustained fire.': '稳固握持，持续射击更平稳。',
    'Snappier to the shoulder and out of a sprint.': '抬枪与冲刺转射击更快。',
    'Visible beam. Tightens hip fire.': '可见光束，收紧腰射散布。',
    'Factory capacity.': '出厂容量。',
    'Half again as many rounds; a little slower to handle.':
      '弹容量多五成，操控稍慢。',
    'Flared well and a pull tab for faster changes.': '喇叭口与拉片，换弹更快。',
    'Balanced.': '均衡。',
    'Light and fast; kicks harder.': '轻快，但后坐更大。',
    'Soaks up recoil at the cost of speed.': '吸收后坐，牺牲速度。',
    '−7% ADS TIME': '开镜时间 −7%',
    '+4% ADS TIME': '开镜时间 +4%',
    '+5% ZOOM': '放大倍率 +5%',
    '+15% ADS TIME': '开镜时间 +15%',
    '+70% ZOOM': '放大倍率 +70%',
    '−10% ADS MOVE SPEED': '开镜移动速度 −10%',

    /* 迷彩 */
    'STANDARD ISSUE': '标准配发',
    'MILITARY': '军用',
    'SPECIAL': '特殊',
    'MASTERY': '精通',
    'COMPLETIONIST': '全收集',
    'As issued.': '出厂涂装。',
    'Flat dark earth with worn edges.': '哑光深土色，边缘磨损。',
    'Hand-sprayed woodland through netting.': '透过网布手喷的林地迷彩。',
    'Urban shards in three greys.': '三阶灰的都市碎片。',
    'Black brushstrokes over olive and tan.': '橄榄与棕褐底色上的黑色笔触。',
    'Burnt-orange contour lines on matte black.': '哑黑底上的焦橙等高线。',
    'Twill-weave carbon under clear coat.': '清漆下的斜纹碳纤维。',
    'Folded-steel waves, acid etched.': '酸蚀的折叠钢纹。',
    'Polished gold with engraved scrollwork.': '抛光金与雕刻卷草纹。',
    'Black glass with a slow ember glow in the cracks.': '黑玻璃，裂缝中泛着缓慢的余烬光。',
    'UNLOCKED — ENTER TO EQUIP': '已解锁 — 回车装备',
    'ALL CAMOS UNLOCKED': '全部迷彩已解锁',
    'CHANGES APPLY ON YOUR NEXT SPAWN': '更改将在下次复活后生效',
    'RANK UP': '等级提升',
    'MAX RANK': '满级',

    /* ===== 对局 HUD ===== */
    'TEAM DEATHMATCH': '团队死斗',
    'FIRST TO 40 ELIMINATIONS': '先到 40 杀获胜',
    'SPRINT ANY DIRECTION': '任意方向冲刺',
    'SLIDE': '滑铲',
    'DIVE': '俯冲',
    'SCORES': '比分',
    'ENEMY K9 CLOSE': '敌方 K9 逼近',
    'VANGUARD': '先锋',
    'EMBER': '余烬',
    'ELIMINATED BY': '击杀者',
    'OUT OF BOUNDS': '出界',
    'SELF-INFLICTED': '自我了断',
    'Gravity': '重力',
    'You': '你',
    'YOU': '你',
    'RESPAWN IN': '复活倒计时',
    'LOW AMMO': '弹药不足',
    'NO AMMO': '无弹药',
    'RELOADING': '换弹中',
    'FALL': '坠落',
    'CHANDELIER': '吊灯',
    'MATCH POINT': '赛点',
    'NEED ONE ELIMINATION': '再击杀一人',
    'VICTORY': '胜利',
    'DEFEAT': '失败',
    'DRAW': '平局',
    'ONE MINUTE REMAINING': '剩余一分钟',
    'TIME LIMIT REACHED': '时间到',
    'SCORES TIED': '比分持平',
    'LEAD TAKEN': '取得领先',
    'LEAD LOST': '失去领先',
    'K9 UNLEASHED': 'K9 已释放',
    'K9 DESTROYED': 'K9 被摧毁',
    'ENEMY K9 DESTROYED': '敌方 K9 被摧毁',
    'ENEMY K9 INBOUND': '敌方 K9 来袭',
    'K9 BATTERY DEPLETED': 'K9 电量耗尽',
    'K9 UNIT ALREADY HUNTING': 'K9 已在猎杀',
    'K9 UNIT DESTROYED': 'K9 已被摧毁',
    'HOSTILE UNIT HUNTING — SHOOT IT DOWN': '敌方单位正在猎杀 — 击落它',
    'HUNTING HOSTILES': '猎杀敌人',
    'AIM AT THE BASE': '瞄准底座',
    'PULL THE PIN': '拔掉保险销',
    '30 SECONDS': '30 秒',

    /* ===== 勋章 / 击杀播报 ===== */
    'HEADSHOT': '爆头',
    'DOUBLE KILL': '双杀',
    'TRIPLE KILL': '三杀',
    'FURY KILL': '狂怒击杀',
    'FRENZY KILL': '狂暴击杀',
    'DIVE KILL': '俯冲击杀',
    'SLIDE KILL': '滑铲击杀',
    'POINT BLANK': '零距离击杀',
    'PACK LEADER': '领头狼',
    'K9 TAKEDOWN': 'K9 击杀',
    'FINAL KILL': '最后一击',
    'BY YOU': '由你完成',

    /* ===== 计分板 ===== */
    'OPERATOR': '干员',
    'SCORE': '得分',
    'K/D': 'K/D',

    /* ===== 暂停 ===== */
    'PAUSED': '已暂停',
    'RESUME': '继续',
    'QUIT TO MENU': '退出到主菜单',
    'PRESS AGAIN TO FORFEIT': '再按一次认输',
    'REMAINING': '剩余',
    'APPLIES ON NEXT SPAWN': '下次复活后生效',

    /* ===== 结算 ===== */
    'PROGRESSION': '进度',
    'K9 TAKEDOWNS': 'K9 击杀数',
    'UNLOCKED': '已解锁',
    'CHALLENGE COMPLETE': '挑战完成',
    'MATCH SCORE': '对局得分',
    'VICTORY BONUS': '胜利奖励',
    'COMPLETION BONUS': '完成奖励',
    'CAMO PROGRESS': '迷彩进度',
    'TOTAL XP': '总经验',
    'YOUR PERFORMANCE': '你的表现',
    'DEATHS': '死亡',
    'K/D RATIO': 'K/D 比',
    'ACCURACY': '命中率',
    'HEADSHOTS': '爆头数',
    'BEST STREAK': '最佳连杀',
    'SHOTS FIRED': '开火数',
    'MEDALS': '勋章',
    'NO MEDALS THIS MATCH': '本局没有勋章',
    'MATCH MVP': '本局 MVP',
    'PLAY AGAIN': '再来一局',
    'MAIN MENU': '主菜单',
    'CHOOSE': '选择'
  };

  /* ---------- 带数字的模板 ---------- */
  var RULES = [
    [/^(\d+) \/ (\d+) XP$/, '$1 / $2 经验'],
    [/^(\d+) \/ ([\d,]+) XP$/, '$1 / $2 经验'],
    [/^(\d+) \/ (\d+) ATTACHMENTS$/, '$1 / $2 配件'],
    [/^(\d+) \/ (\d+) CAMOS$/, '$1 / $2 迷彩'],
    [/^(\d+) ELIMS$/, '$1 击杀'],
    [/^(\d+) ELIMS · (\d+) HEADSHOTS$/, '$1 击杀 · $2 爆头'],
    [/^RANK (\d+)$/, '等级 $1'],
    [/^FIRST TO (\d+) ELIMINATIONS$/, '先到 $1 杀获胜'],
    [/^FIRST TO (\d+) · (.+)$/, '先到 $1 杀 · $2'],
    [/^FIRST TO (\d+)$/, '先到 $1 杀'],
    [/^(\d+:\d+) REMAINING$/, '$1 剩余'],
    [/^Charges in (\d+) s · hunts on its own for (\d+) s$/, '充能 $1 秒 · 自主猎杀 $2 秒'],
    [/^Charges in (\d+) s · hunts for (\d+) s$/, '充能 $1 秒 · 猎杀 $2 秒'],
    [/^NEXT · (.+)$/, '下一款 · $1'],
    [/^(\d+)M$/, '$1 米']
  ];

  /* ---------- 战地笔记（含 <b> 富文本，单独处理） ---------- */
  var TIPS_EN = [
    'Sprint works in <b>every direction</b>. Strafe-sprint out of a bad angle instead of turning your back.',
    'Slide with <b>C</b> while sprinting to take a corner low and fast. Slide kills earn a medal.',
    'Dive with <b>X</b> through a window: every pane in the hotel breaks.',
    'Bullets punch through thin cover. Wooden slats, plaster and furniture will not save anyone.',
    'Enemies appear on your minimap when they <b>fire</b>. A suppressor keeps bots from hearing you early.',
    'The atrium chandelier is not decoration. Shoot the mount when somebody stands underneath.',
    'Health regenerates after a few seconds out of the fight. Break line of sight, then re-engage.',
    'Headshots unlock the Tigerstripe and Ember Topo camos. Build each weapon in the <b>Gunsmith</b>.',
    'The balcony ring sees the whole lobby. So does everyone looking up at it.',
    'Empty magazine? Swapping to your sidearm with <b>2</b> is always faster than reloading.',
    'Your <b>K9 unit</b> charges while you fight. Press <b>B</b> to unleash it: it hunts on its own until its battery runs out.',
    'An <b>enemy K9</b> can be shot down. Watch the red edge marker, turn toward it and fire before it leaps.'
  ];
  var TIPS_ZH = [
    '冲刺在<b>任何方向</b>都有效。从不利角度侧向冲刺脱离，而不是把后背转给敌人。',
    '冲刺时按 <b>C</b> 滑铲，可以低姿快速过弯。滑铲击杀会获得勋章。',
    '按 <b>X</b> 俯冲穿过窗户：酒店里每一块玻璃都能打碎。',
    '子弹能打穿薄掩体。木条、石膏和家具救不了任何人。',
    '敌人<b>开火</b>时会出现在你的小地图上。消音器能让 AI 更晚听到你。',
    '中庭的吊灯不是装饰。有人站在下面时，打它的挂点。',
    '脱离交火几秒后生命值会恢复。先切断视线，再重新接战。',
    '爆头可解锁 TIGERSTRIPE 与 EMBER TOPO 迷彩。在<b>枪械工坊</b>里改装每把武器。',
    '环廊能俯瞰整个大堂——抬头看环廊的人也一样。',
    '弹匣空了？按 <b>2</b> 换副武器永远比换弹快。',
    '<b>K9 无人机</b>会在战斗中充能。按 <b>B</b> 释放：它会自主猎杀，直到电量耗尽。',
    '敌方 <b>K9</b> 可以被击落。注意屏幕边缘的红色标记，在它扑上来之前转身开火。'
  ];

  /* ---------- 运行时引擎 ---------- */
  var lang = 'en';
  var origText = new WeakMap();     // text node -> 原始英文
  var skipMut = new WeakSet();      // 自己写入的节点，忽略下一次回调
  var tipSkip = new WeakSet();
  var observer = null;
  var TIP_PLAIN_ZH = null;

  function norm(s) {
    return String(s).replace(/[\s\u00a0]+/g, ' ').trim();
  }

  function plainOf(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return norm(d.textContent || '');
  }

  function translateText(value) {
    var m = /^([\s\u00a0]*)([\s\S]*?)([\s\u00a0]*)$/.exec(value);
    if (!m) return value;
    var core = m[2];
    if (!core || !/[A-Za-z]/.test(core)) return value;
    var key = norm(core);
    var hit = DICT[key];
    if (hit == null) {
      for (var i = 0; i < RULES.length; i++) {
        var re = RULES[i][0];
        if (re.test(key)) { hit = key.replace(re, RULES[i][1]); break; }
      }
    }
    return hit == null ? value : m[1] + hit + m[3];
  }

  function isTipHost(node) {
    return node && node.nodeType === 1 && (node.id === 'ltipp' || node.id === 'hint');
  }

  function processTip(el) {
    if (!el || !el.id) return;
    if (tipSkip.has(el)) { tipSkip.delete(el); return; }
    var cur = el.innerHTML || '';
    if (!cur) return;
    if (lang === 'zh') {
      var zh = TIPS_ZH[TIPS_EN.map(plainOf).indexOf(plainOf(cur))];
      if (zh && zh !== cur) { tipSkip.add(el); el.innerHTML = zh; }
    } else {
      if (TIP_PLAIN_ZH === null) TIP_PLAIN_ZH = TIPS_ZH.map(plainOf);
      var i = TIP_PLAIN_ZH.indexOf(plainOf(cur));
      if (i >= 0 && cur !== TIPS_EN[i]) { tipSkip.add(el); el.innerHTML = TIPS_EN[i]; }
    }
  }

  function translateNode(node) {
    var v = node.nodeValue;
    if (v == null) return;
    var p = node.parentElement;
    if (p && (p.tagName === 'SCRIPT' || p.tagName === 'STYLE' || p.tagName === 'TEXTAREA')) return;
    if (lang === 'zh') {
      if (!origText.has(node)) origText.set(node, v);
      var zh = translateText(origText.get(node));
      if (zh !== v) { skipMut.add(node); node.nodeValue = zh; }
    } else {
      var en = origText.get(node);
      if (en != null && en !== v) { skipMut.add(node); node.nodeValue = en; }
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { translateNode(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (isTipHost(root)) processTip(root);
    var host = root.querySelector ? root.querySelector('#ltipp, #hint') : null;
    if (host) processTip(host);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) translateNode(n);
  }

  function onMutations(list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.type === 'characterData') {
        var t = m.target;
        if (skipMut.has(t)) { skipMut.delete(t); continue; }
        if (lang === 'zh') { origText.set(t, t.nodeValue); translateNode(t); }
        continue;
      }
      if (m.type === 'childList') {
        if (isTipHost(m.target)) processTip(m.target);
        for (var j = 0; j < m.addedNodes.length; j++) {
          var node = m.addedNodes[j];
          if (node.nodeType === 3) {
            if (skipMut.has(node)) { skipMut.delete(node); continue; }
            if (lang === 'zh') translateNode(node);
          } else if (node.nodeType === 1) {
            walk(node);
          }
        }
      }
    }
  }

  function applyAll() {
    observer && observer.takeRecords();
    walk(document.documentElement);
  }

  function persist(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function setLang(next, opts) {
    next = next === 'zh' ? 'zh' : 'en';
    lang = next;
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.setAttribute('data-gh-lang', next);
    if (window.__GH_SETTINGS) window.__GH_SETTINGS.lang = next;
    if (!opts || !opts.silent) persist(next);
    applyAll();
    syncSchema();
    return lang;
  }

  /* ---------- 注入“语言”设置行 ---------- */
  function syncSchema() {
    var dbg = window.GH && window.GH.debug;
    if (!dbg || !dbg.schema || !dbg.schema.interface) return false;
    var rows = dbg.schema.interface.rows;
    var row = rows.filter(function (r) { return r.k === 'lang'; })[0];
    if (!row) {
      row = {
        k: 'lang',
        label: 'LANGUAGE',
        type: 'seg',
        opts: [['en', 'ENGLISH'], ['zh', '中文']],
        desc: 'Interface language. The change applies immediately.'
      };
      rows.unshift(row);
    }
    if (dbg.settings) dbg.settings.lang = lang;
    return true;
  }

  /* 每次打开设置，游戏会重排 .on 状态；用它保持两侧一致 */
  function watchSettingsPage() {
    var page = document.getElementById('pg-settings');
    if (!page || page.dataset.ghLangWatch) return;
    page.dataset.ghLangWatch = '1';
    var row = page.querySelector('.row[data-row="interface:0"]');
    if (!row) return;
    var seg = row.querySelector('.seg');
    if (!seg) return;
    var sync = function () {
      var buttons = seg.querySelectorAll('button');
      var on = seg.querySelector('button.on');
      if (!on) return;                       // 尚未同步（页面刚构建），先不动
      var idx = Array.prototype.indexOf.call(buttons, on);
      var want = idx === 1 ? 'zh' : 'en';
      if (want !== lang) setLang(want);
    };
    new MutationObserver(sync).observe(seg, { subtree: true, attributes: true, attributeFilter: ['class'] });
    sync();
  }

  function hookGame() {
    if (!syncSchema()) return false;
    var dbg = window.GH.debug;
    if (dbg.settings) dbg.settings.lang = lang;
    watchSettingsPage();
    return true;
  }

  /* ---------- 启动 ---------- */
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  lang = saved === 'zh' || saved === 'en' ? saved
    : ((navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en');

  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.documentElement.setAttribute('data-gh-lang', lang);

  observer = new MutationObserver(onMutations);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  /* 静态 HTML 立刻翻译；游戏用 JS 改的文本由 observer 跟随 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyAll(); boot(); });
  } else {
    applyAll(); boot();
  }

  function boot() {
    /* 设置对象在游戏模块求值时就暴露了：尽早写入 lang，
       这样设置页第一次构建时就能选中正确的语言 */
    var early = setInterval(function () {
      if (window.__GH_SETTINGS) {
        window.__GH_SETTINGS.lang = lang;
        clearInterval(early);
      }
    }, 25);

    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      if (window.GH && window.GH.debug) {
        syncSchema();
        if (window.GH.debug.settings) window.GH.debug.settings.lang = lang;
        if (window.GH.debug.schema && window.GH.debug.schema.interface) {
          watchSettingsPage();
          clearInterval(timer);
          clearInterval(early);
        }
      } else if (tries > 1200) {
        clearInterval(timer);
      }
    }, 100);

    /* 设置页是懒加载的，出现后挂监听 */
    new MutationObserver(function () {
      if (document.getElementById('pg-settings')) { hookGame(); watchSettingsPage(); }
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* 调试 / 自动化接口 */
  window.GH_I18N = {
    setLang: setLang,
    getLang: function () { return lang; },
    dict: DICT
  };
})();
