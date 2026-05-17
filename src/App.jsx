import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// 词库 — 每分类每难度约 280 词，合计约 5000 张
// ═══════════════════════════════════════════════════════
const RAW = {
  动物: {
    易: [
      "test", "狗", "鸟", "鱼", "牛", "羊", "猪", "鸡", "鸭", "兔",
      "马", "虎", "狮", "熊", "象", "猴", "蛇", "青蛙", "乌龟", "金鱼",
      "小鸡", "小猫", "小狗", "小兔", "熊猫", "企鹅", "海豚", "大象", "长颈鹿", "袋鼠",
      "斑马", "狐狸", "松鼠", "蜜蜂", "蝴蝶", "蜗牛", "蚂蚁", "瓢虫", "蜻蜓", "萤火虫",
      "孔雀", "鹦鹉", "乌鸦", "麻雀", "鸽子", "天鹅", "仙鹤", "白鹭", "鸵鸟", "猫头鹰",
      "螃蟹", "虾", "蜘蛛", "蟋蟀", "螳螂", "蝗虫", "毛毛虫", "蜈蚣", "蚯蚓", "蜗牛",
      "壁虎", "蟾蜍", "蝾螈", "水母", "海星", "海胆", "贝壳", "珊瑚", "章鱼", "乌贼",
      "仓鼠", "豚鼠", "龙猫", "刺猬", "蝙蝠", "猫鼬", "浣熊", "貂", "水獭", "河狸",
      "驴", "骡", "骆驼", "鹿", "麋鹿", "羚羊", "山羊", "绵羊", "野猪", "野兔",
    ],
    中: [
      "变色龙", "穿山甲", "羊驼", "树懒", "狐獴", "侏儒河马", "矮种马", "迷你猪", "微型驴", "侏儒山羊",
      "北极狐", "雪豹", "云豹", "薮猫", "猎豹", "美洲豹", "美洲狮", "土狼", "鬣狗", "豺狼",
      "大猩猩", "黑猩猩", "红毛猩猩", "长臂猿", "狒狒", "猕猴", "叶猴", "眼镜猴", "懒猴", "指猴",
      "鸸鹋", "几维鸟", "渡渡鸟", "信天翁", "鹈鹕", "巨嘴鸟", "犀鸟", "翠鸟", "蜂鸟", "金雕",
      "白头海雕", "秃鹫", "游隼", "雪鸮", "角鸮", "鸮鹦鹉", "琴鸟", "极乐鸟", "蓝脚鲣鸟", "红鹮",
      "大白鲨", "锤头鲨", "虎鲨", "鲸鲨", "双髻鲨", "电鳐", "锯鳐", "弓头鲸", "蓝鲸", "抹香鲸",
      "独角鲸", "白鲸", "海牛", "儒艮", "海豹", "海狮", "海象", "北极熊", "北极兔", "北极狼",
      "科莫多龙", "巨蜥", "蟒蛇", "眼镜蛇", "响尾蛇", "飞蜥", "玻璃蛙", "箭毒蛙", "牛蛙", "树蛙",
      "帝王蟹", "龙虾", "皮皮虾", "鲍鱼", "海参", "砗磲", "鹦鹉螺", "海百合", "翻车鱼", "旗鱼",
    ],
    难: [
      "塔斯马尼亚魔鬼", "鸭嘴兽", "针鼹", "负鼠", "袋熊", "短尾矮袋鼠", "树袋熊", "沙袋鼠", "袋獾", "袋狼",
      "星鼻鼹", "跳鼠", "裸鼹鼠", "毛丝鼠", "海狸鼠", "草原犬鼠", "岩狸", "土豚", "蹄兔", "马岛猬",
      "非洲野驴", "格雷维斑马", "山斑马", "白犀牛", "黑犀牛", "苏门答腊犀", "爪哇犀", "印度犀", "貘", "霍加皮",
      "长颈鹿獾麝", "鬃狼", "薮狗", "大耳狐", "沙狐", "藏狐", "北极熊", "眼镜熊", "懒熊", "马来熊",
      "大食蚁兽", "侏儒食蚁兽", "犰狳", "大犰狳", "三带犰狳", "树懒熊", "二趾树懒", "三趾树懒", "鳞甲目", "穿山甲",
      "白颊黑雁", "帝企鹅", "王企鹅", "麦哲伦企鹅", "小蓝企鹅", "鬼蝠魟", "姥鲨", "象鲨", "大白鲨", "牛鲨",
      "苏门答腊虎", "孟加拉虎", "西伯利亚虎", "华南虎", "马来虎", "爪哇虎", "里海虎", "巴厘虎", "狮虎兽", "虎狮兽",
      "棱皮龟", "玳瑁", "绿海龟", "红海龟", "橄榄丽龟", "平背海龟", "肯氏丽龟", "加拉帕戈斯象龟", "亚达伯拉象龟", "缅甸星龟",
      "白鱀豚", "伊河海豚", "亚马逊河豚", "印度河豚", "巴基斯坦河豚", "弗兰西斯科河豚", "驼背豚", "中华白海豚", "江豚", "瓶鼻海豚",
    ],
  },
  食物: {
    易: [
      "苹果", "香蕉", "橙子", "西瓜", "草莓", "葡萄", "樱桃", "桃子", "梨", "芒果",
      "米饭", "面条", "包子", "饺子", "馒头", "蛋糕", "饼干", "糖果", "巧克力", "冰淇淋",
      "鸡蛋", "牛奶", "面包", "汉堡", "薯条", "披萨", "热狗", "爆米花", "棉花糖", "糖葫芦",
      "豆腐", "豆浆", "油条", "煎蛋", "炒饭", "炒面", "汤圆", "粽子", "月饼", "年糕",
      "玉米", "胡萝卜", "土豆", "番茄", "黄瓜", "白菜", "菠菜", "茄子", "南瓜", "洋葱",
      "鸡腿", "鸡翅", "烤鸭", "红烧肉", "蒸鱼", "虾饺", "春卷", "锅贴", "煎饺", "馄饨",
      "方便面", "泡泡糖", "棒棒糖", "软糖", "果冻", "布丁", "奶茶", "橙汁", "可乐", "牛奶",
      "花生", "瓜子", "核桃", "腰果", "开心果", "杏仁", "葡萄干", "蔓越莓干", "芒果干", "柿饼",
      "饼干", "薯片", "虾条", "旺旺雪饼", "小熊饼干", "奥利奥", "沙琪玛", "麻花", "江米条", "糖麻花",
    ],
    中: [
      "榴莲", "百香果", "火龙果", "菠萝蜜", "山竹", "红毛丹", "木瓜", "番石榴", "蛋黄果", "神秘果",
      "臭豆腐", "肉夹馍", "章鱼小丸子", "螺蛳粉", "酸辣粉", "凉皮", "刀削面", "兰州拉面", "热干面", "过桥米线",
      "担担面", "炸酱面", "阳春面", "乌冬面", "荞麦面", "意大利面", "西班牙海鲜饭", "日式拉面", "越南米粉", "泰式炒河粉",
      "麻辣烫", "串串香", "烧烤", "铁板烧", "寿喜锅", "石锅拌饭", "泡菜汤", "味噌汤", "豆腐煲", "砂锅粥",
      "宫保鸡丁", "鱼香肉丝", "麻婆豆腐", "东坡肉", "回锅肉", "糖醋里脊", "夫妻肺片", "口水鸡", "白切鸡", "盐焗鸡",
      "糯米鸡", "荷叶饭", "煲仔饭", "叉烧饭", "烧鸭饭", "海南鸡饭", "扬州炒饭", "蛋炒饭", "福建炒饭", "潮州粥",
      "提拉米苏", "马卡龙", "华夫饼", "可颂", "泡芙", "闪电泡芙", "玛德琳", "费南雪", "巴斯克蛋糕", "熔岩巧克力蛋糕",
      "红豆饼", "鸡蛋仔", "鸡蛋糕", "萨其马", "驴打滚", "艾窝窝", "糖耳朵", "豌豆黄", "芸豆卷", "茯苓夹饼",
      "烤红薯", "烤玉米", "烤土豆", "烤鱿鱼", "烤生蚝", "烤扇贝", "烤鸡翅", "烤羊肉串", "烤猪蹄", "烤鸡爪",
    ],
    难: [
      "佛跳墙", "盆菜", "围炉煮茶", "乳猪全席", "满汉全席", "文昌鸡", "澄海卤鹅", "潮汕牛肉火锅", "顺德鱼生", "广州叉烧",
      "金华火腿", "宣威火腿", "云腿月饼", "鲜花饼", "乳扇", "汽锅鸡", "过桥米线", "建水豆腐", "石屏豆腐", "蒙自过桥米线",
      "夫妻肺片", "钟水饺", "赖汤圆", "三大炮", "冒菜", "钵钵鸡", "乐山钵钵鸡", "眉山钵钵鸡", "雅安荥经棒棒鸡", "乐山跷脚牛肉",
      "黄山毛峰", "西湖龙井", "碧螺春", "洞庭碧螺春", "君山银针", "祁门红茶", "武夷岩茶", "铁观音", "凤凰单丛", "普洱茶",
      "阳澄湖大闸蟹", "太湖白鱼", "洪泽湖大虾", "千岛湖有机鱼", "西湖醋鱼", "东坡肉", "宋嫂鱼羹", "叫化鸡", "龙井虾仁", "西湖莼菜汤",
      "蟹粉小笼包", "松鼠鳜鱼", "响油鳝糊", "清炒河虾仁", "腌笃鲜", "白斩鸡", "葱油拌面", "生煎馒头", "蟹壳黄", "老虎脚爪",
      "北京烤鸭", "涮羊肉", "豆汁", "炒肝", "卤煮火烧", "门钉肉饼", "爆肚", "灌肠", "炸灌肠", "焦圈",
      "西安羊肉泡馍", "葫芦头", "甑糕", "臊子面", "凉皮", "肉夹馍", "腊汁肉夹馍", "潼关肉夹馍", "蜂蜜凉粽", "镜糕",
      "哈尔滨红肠", "大列巴", "锅包肉", "酱骨架", "猪肉炖粉条", "杀猪菜", "血肠", "白肉血肠", "小鸡炖蘑菇", "酸菜白肉",
    ],
  },
  职业: {
    易: [
      "老师", "医生", "警察", "消防员", "厨师", "护士", "司机", "邮递员", "农民", "工人",
      "画家", "歌手", "演员", "运动员", "记者", "厨师", "服务员", "清洁工", "保安", "收银员",
      "飞行员", "宇航员", "科学家", "工程师", "建筑师", "设计师", "程序员", "律师", "法官", "会计",
      "摄影师", "翻译", "导游", "教练", "裁判", "魔术师", "杂技演员", "马戏演员", "舞蹈家", "音乐家",
      "园丁", "花匠", "渔夫", "牧民", "猎人", "养蜂人", "养鱼人", "兽医", "驯兽师", "马夫",
      "木匠", "铁匠", "裁缝", "鞋匠", "理发师", "美容师", "化妆师", "按摩师", "营养师", "健身教练",
      "快递员", "外卖员", "搬运工", "装修工", "油漆工", "水管工", "电工", "焊工", "修车师", "厨工",
      "售货员", "收银员", "店长", "经理", "老板", "秘书", "前台", "保洁员", "门卫", "保安",
      "消防员", "救生员", "急救员", "志愿者", "社工", "义工", "红十字会员", "环保卫士", "交通协管员", "城管",
    ],
    中: [
      "调酒师", "咖啡师", "糕点师", "巧克力师", "品茶师", "品酒师", "调香师", "花艺师", "插花师", "园艺师",
      "潜水员", "潜水教练", "冲浪教练", "滑翔伞教练", "攀岩教练", "蹦极教练", "极地探险家", "登山向导", "荒野求生专家", "野外救援队员",
      "动画师", "特效师", "游戏设计师", "VR设计师", "3D打印师", "无人机操作员", "机器人工程师", "人工智能研究员", "数据分析师", "网络安全专家",
      "配音演员", "口技演员", "说书人", "相声演员", "脱口秀演员", "皮影戏演员", "木偶戏演员", "提线木偶师", "布袋戏演员", "影偶师",
      "心理医生", "精神科医生", "神经科医生", "外科医生", "内科医生", "儿科医生", "妇科医生", "眼科医生", "耳鼻喉科医生", "皮肤科医生",
      "气象学家", "地质学家", "海洋学家", "天文学家", "考古学家", "人类学家", "社会学家", "心理学家", "经济学家", "政治学家",
      "外交官", "领事", "大使", "联合国官员", "国际观察员", "和平谈判代表", "战地记者", "战地医生", "维和士兵", "驻外记者",
      "驯马师", "骑师", "马球运动员", "马术教练", "赛马评论员", "马厩工人", "马蹄铁匠", "马具师", "马场管理员", "马医",
      "灯塔守护者", "船长", "大副", "轮机长", "领航员", "港务局员工", "海关检验员", "海岸警卫队员", "海上救援员", "渔政管理员",
    ],
    难: [
      "量子物理学家", "纳米技术工程师", "基因编辑科学家", "神经科学家", "认知科学家", "行为经济学家", "计量经济学家", "博弈论专家", "密码学家", "拓扑学家",
      "古生物学家", "地层学家", "岩石学家", "矿物学家", "地球化学家", "地球物理学家", "大气科学家", "气候模型专家", "冰川学家", "火山学家",
      "深海潜航器驾驶员", "水下机器人工程师", "海底管道工程师", "海洋石油平台工程师", "水下爆破专家", "海洋声学工程师", "水文地质学家", "地下水专家", "热泉研究员", "深海采矿工程师",
      "航天工程师", "火箭推进专家", "轨道计算专家", "深空通信工程师", "太空医学专家", "失重环境工程师", "太空农业研究员", "月球基地设计师", "火星殖民地规划师", "小行星采矿专家",
      "古典音乐指挥家", "歌剧演唱家", "弦乐四重奏演奏家", "钢琴独奏家", "管风琴演奏家", "羽管键琴演奏家", "古乐器修复师", "乐谱研究员", "音乐史学家", "声学工程师",
      "文物修复师", "古籍修复师", "字画鉴定专家", "青铜器鉴定家", "陶瓷鉴定专家", "玉器鉴定师", "古钱币鉴定师", "邮票鉴定师", "书画装裱师", "文物摄影师",
      "法医人类学家", "法医昆虫学家", "法医毒理学家", "法医病理学家", "法医牙科学家", "犯罪现场分析师", "侧写师", "测谎专家", "语音分析专家", "笔迹鉴定专家",
      "国际象棋大师", "围棋九段", "桥牌大师", "麻将大师", "国际跳棋世界冠军", "电子竞技运动员", "职业扑克玩家", "游戏解说员", "电竞教练", "赛事主播",
      "珠宝鉴定师", "宝石学家", "钻石切割师", "金银首饰工匠", "珐琅工艺师", "景泰蓝工匠", "掐丝珐琅师", "雕漆工艺师", "金银错工艺师", "錾刻工艺师",
    ],
  },
  交通工具: {
    易: [
      "自行车", "汽车", "公共汽车", "火车", "飞机", "轮船", "摩托车", "出租车", "地铁", "高铁",
      "卡车", "救护车", "消防车", "警车", "校车", "三轮车", "独轮车", "滑板车", "电动车", "平衡车",
      "帆船", "小船", "渡轮", "游轮", "快艇", "划艇", "独木舟", "皮划艇", "橡皮艇", "竹筏",
      "直升机", "热气球", "滑翔机", "降落伞", "滑翔伞", "飞艇", "无人机", "纸飞机", "风筝", "玩具飞机",
      "马车", "牛车", "驴车", "骆驼", "雪橇", "狗拉雪橇", "轿子", "独轮手推车", "婴儿车", "轮椅",
      "拖拉机", "推土机", "挖掘机", "起重机", "叉车", "压路机", "洒水车", "垃圾车", "吊车", "铲车",
      "拖船", "渔船", "货船", "集装箱船", "油轮", "军舰", "潜水艇", "航空母舰", "破冰船", "科考船",
      "坦克", "装甲车", "吉普车", "越野车", "赛车", "敞篷车", "越野摩托", "雪地摩托", "水上摩托", "气垫船",
      "缆车", "登山缆车", "有轨电车", "轻轨", "磁悬浮", "单轨列车", "观光小火车", "蒸汽火车", "双层巴士", "旅游大巴",
    ],
    中: [
      "太空飞船", "航天飞机", "火箭", "人造卫星", "空间站", "月球车", "火星探测车", "深空探测器", "飞碟", "星际飞船",
      "核动力潜艇", "深海探测器", "水下机器人", "海底爬行器", "海底滑翔机", "水下无人机", "深潜器", "蛟龙号", "奋斗者号", "海斗号",
      "水陆两栖车", "水陆两栖飞机", "水上飞机", "浮空艇", "平流层飞艇", "高空气球", "探空气球", "气象气球", "科学气球", "超高空飞机",
      "磁悬浮列车", "真空管道列车", "超级高铁", "新干线", "TGV", "ICE", "复兴号", "和谐号", "高速磁浮", "低速磁浮",
      "皮划艇", "赛艇", "龙舟", "香蕉船", "冲浪板", "风帆冲浪板", "风筝冲浪板", "水上飞板", "水下助推器", "水上摩托艇",
      "雪地摩托", "雪上摩托", "雪橇车", "冰面气垫船", "极地全地形车", "冰上赛车", "冰壶运输车", "冰上渡轮", "破冰气垫船", "核动力破冰船",
      "消防直升机", "医疗直升机", "警用直升机", "军用直升机", "武装直升机", "搜救直升机", "海上直升机", "山地直升机", "电力巡线直升机", "农业直升机",
      "共享单车", "共享电动车", "共享汽车", "网约车", "顺风车", "拼车", "班车", "通勤巴士", "机场摆渡车", "酒店专车",
      "双体船", "三体船", "水翼船", "穿浪双体船", "气垫登陆艇", "气垫渡轮", "高速气垫船", "喷水推进艇", "螺旋桨快艇", "喷气动力艇",
    ],
    难: [
      "超音速客机", "协和式飞机", "图波列夫144", "波音2707", "洛克希德L2000", "亚轨道飞机", "超燃冲压喷气机", "混合动力飞机", "电动飞机", "氢燃料飞机",
      "无人驾驶汽车", "自动驾驶卡车", "无人驾驶巴士", "无人配送车", "无人驾驶出租车", "自主导航船", "无人驾驶地铁", "无人驾驶飞机", "无人机群", "蜂群无人机",
      "个人飞行器", "飞行摩托车", "电动垂直起降飞机", "城市空中出行飞机", "空中的士", "空中巴士", "飞行汽车", "喷气背包", "火箭腰带", "垂直起降喷气机",
      "核动力航空母舰", "导弹驱逐舰", "核潜艇", "弹道导弹潜艇", "攻击型潜艇", "隐形潜艇", "无人潜艇", "水下滑翔机", "深海采矿船", "海底管道铺设船",
      "重型运输火箭", "可回收火箭", "星舰", "猎鹰9号", "猎鹰重型", "新格伦", "长征五号", "阿里安五号", "质子号", "联盟号",
      "真空列车", "超级高铁", "管道运输系统", "气动管道运输", "货物传送管道", "城市地下物流系统", "地下货运网络", "地下快递系统", "地下管网物流", "自动化仓储物流",
      "翼身融合飞机", "飞翼式运输机", "环形机翼飞机", "盒形翼飞机", "串列翼飞机", "鸭翼飞机", "三角翼飞机", "可变后掠翼飞机", "超临界翼型飞机", "自适应机翼飞机",
      "磁流体推进船", "核动力商船", "风帆辅助货轮", "太阳能船", "氢燃料轮船", "液化天然气船", "液化氢运输船", "氨燃料船", "甲醇燃料船", "风筝辅助货船",
      "外骨骼助力装甲", "动力装甲", "单兵飞行器", "单兵滑翔翼", "单兵火箭", "水下推进器", "人鱼推进器", "水下摩托", "水下滑翔机", "水下机器人",
    ],
  },
  自然: {
    易: [
      "太阳", "月亮", "星星", "彩虹", "云朵", "下雨", "下雪", "闪电", "打雷", "起风",
      "山", "海", "河", "湖", "树", "花", "草", "石头", "沙子", "泥土",
      "春天", "夏天", "秋天", "冬天", "白天", "黑夜", "清晨", "傍晚", "日出", "日落",
      "火山", "地震", "海啸", "台风", "龙卷风", "洪水", "干旱", "泥石流", "雪崩", "沙尘暴",
      "森林", "草原", "沙漠", "极地", "湿地", "沼泽", "峡谷", "瀑布", "温泉", "冰川",
      "朝霞", "晚霞", "彩云", "积云", "乌云", "雾", "霜", "露水", "冰雹", "暴风雪",
      "流星", "彗星", "极光", "月食", "日食", "流星雨", "星云", "黑洞", "银河", "星座",
      "海浪", "潮汐", "暗流", "海风", "海雾", "海市蜃楼", "珊瑚礁", "海底火山", "深海峡谷", "海底平原",
      "春雨", "梅雨", "秋雨", "冬雨", "毛毛雨", "倾盆大雨", "冰雨", "酸雨", "彩虹雨", "阵雨",
    ],
    中: [
      "极光带", "磁暴", "太阳风", "太阳耀斑", "日珥", "日冕", "太阳黑子", "太阳风暴", "磁极翻转", "地磁场",
      "季风", "信风", "贸易风", "极地东风", "西风带", "急流", "高空急流", "低空急流", "热带辐合带", "副热带高压",
      "拉尼娜", "厄尔尼诺", "季风降水", "对流雨", "地形雨", "锋面雨", "台风眼", "台风眼壁", "台风螺旋雨带", "超级台风",
      "溶洞", "钟乳石", "石笋", "石柱", "石林", "峰林", "峰丛", "天坑", "竖井", "溶蚀洼地",
      "冻土", "永久冻土", "季节性冻土", "地下冰", "冻融作用", "冻土层甲烷释放", "冻土崩塌", "热融湖", "冻土沉陷", "冻胀丘",
      "海底扩张", "板块漂移", "大陆碰撞", "海沟俯冲", "地幔对流", "地热梯度", "热点火山", "裂谷", "地堑", "地垒",
      "蜃景", "海市蜃楼", "上蜃景", "下蜃景", "侧蜃景", "绿闪", "宝光", "雾虹", "月虹", "火彩虹",
      "鸣沙山", "月牙泉", "七彩丹霞", "张家界石柱", "桂林山水", "九寨沟", "黄龙", "梵净山", "张掖彩丘", "阿尔山",
      "马里亚纳海沟", "挑战者深渊", "汤加海沟", "千岛海沟", "日本海沟", "阿留申海沟", "秘鲁-智利海沟", "波多黎各海沟", "爪哇海沟", "菲律宾海沟",
    ],
    难: [
      "金星凌日", "水星凌日", "木星冲日", "土星冲日", "火星冲日", "火星大冲", "近日点", "远日点", "近地点", "远地点",
      "洛希极限", "拉格朗日点", "引力波", "引力透镜", "引力红移", "时间膨胀", "潮汐锁定", "共振轨道", "柯克伍德间隙", "轨道共振",
      "超新星爆发", "中子星合并", "伽马射线暴", "快速射电暴", "星系碰撞", "黑洞合并", "引力波探测", "暗物质", "暗能量", "宇宙微波背景辐射",
      "岩浆房", "岩浆侵入体", "岩床", "岩脉", "岩株", "火成岩", "变质岩", "沉积岩", "片麻岩", "片岩",
      "浊流", "等深流", "内波", "海底滑坡", "海底峡谷", "海底扇", "深海平原", "海隆", "无震海岭", "微陆块",
      "喀拉喀托火山爆发", "圣海伦斯火山爆发", "皮纳图博火山爆发", "坦博拉火山爆发", "拉基火山爆发", "艾雅法拉火山爆发", "基拉韦厄火山", "冒纳罗亚火山", "斯特龙博利火山", "埃特纳火山",
      "马格努斯效应", "科里奥利效应", "费雷尔环流", "哈德来环流", "极地环流", "威尔逊环流", "热盐环流", "大洋传送带", "深层水形成", "上升流",
      "奥陶纪大灭绝", "泥盆纪大灭绝", "二叠纪大灭绝", "三叠纪大灭绝", "白垩纪大灭绝", "寒武纪生命大爆发", "雪球地球", "大氧化事件", "大陆漂移", "冈瓦纳大陆",
      "辐射雾", "平流雾", "蒸发雾", "锋面雾", "混合雾", "上坡雾", "谷雾", "海洋雾", "城市雾", "冰雾",
    ],
  },
  运动: {
    易: [
      "跑步", "跳高", "跳远", "游泳", "打球", "踢球", "骑车", "爬山", "跳绳", "踢毽子",
      "足球", "篮球", "排球", "乒乓球", "羽毛球", "网球", "棒球", "保龄球", "高尔夫", "台球",
      "体操", "跳水", "滑冰", "滑雪", "游泳", "冲浪", "骑马", "射箭", "拳击", "摔跤",
      "武术", "跆拳道", "柔道", "空手道", "太极拳", "功夫", "剑术", "刀法", "枪法", "棍法",
      "跑步机", "哑铃", "单杠", "双杠", "引体向上", "仰卧起坐", "俯卧撑", "深蹲", "平板支撑", "开合跳",
      "广场舞", "健美操", "瑜伽", "普拉提", "肚皮舞", "芭蕾", "现代舞", "街舞", "拉丁舞", "交谊舞",
      "赛车", "帆船", "赛艇", "皮划艇", "摩托艇", "水上摩托", "风帆", "冲浪板", "滑水", "花样游泳",
      "自行车", "山地车", "公路车", "BMX", "极限自行车", "轮滑", "溜冰", "滑板", "蹦床", "秋千",
      "钓鱼", "爬树", "放风筝", "打水仗", "打雪仗", "堆雪人", "捉迷藏", "老鹰抓小鸡", "跳皮筋", "踢毽子",
    ],
    中: [
      "三人制篮球", "沙滩篮球", "轮椅篮球", "盲人门球", "坐式排球", "轮椅网球", "盲人乒乓球", "坐式乒乓球", "轮椅击剑", "坐式射箭",
      "竞技体操", "艺术体操", "蹦床体操", "技巧体操", "杂技体操", "健美体操", "有氧体操", "男子竞技体操", "女子竞技体操", "团体体操",
      "铁人三项", "现代五项", "全能运动", "十项全能", "七项全能", "冬季两项", "北欧两项", "残奥全能", "青少年全能", "老年全能",
      "攀岩", "速度攀岩", "难度攀岩", "抱石攀岩", "冰岩攀登", "人工岩壁", "天然岩壁", "室内攀岩", "户外攀岩", "竞技攀岩",
      "蹦极", "高空跳伞", "翼装飞行", "定点跳伞", "BASE跳伞", "高空钢丝", "高空秋千", "高空走钢丝", "高空滑索", "高空攀岩",
      "自由式滑雪", "单板滑雪", "冰壶", "雪车", "雪橇", "跳台滑雪", "越野滑雪", "冬季两项", "冰上舞蹈", "花样滑冰",
      "击剑", "现代五项击剑", "剑道", "西洋剑", "重剑", "花剑", "佩剑", "中国剑术", "太极剑", "武术对练",
      "壁球", "回力球", "手球", "草地曲棍球", "冰球", "冰壶", "地掷球", "藤球", "板球", "棒垒球",
      "风筝冲浪", "帆板", "滑翔伞", "滑翔机", "悬挂式滑翔", "三角翼飞行", "动力伞", "动力三角翼", "热气球竞速", "飞行器特技",
    ],
    难: [
      "竞技叠杯", "速度魔方", "电竞射击", "电竞策略", "电竞格斗", "电竞赛车", "电竞体育游戏", "电竞格斗游戏", "电竞卡牌游戏", "电竞音游",
      "国际象棋960", "费歇尔随机国际象棋", "双人国际象棋", "三维国际象棋", "盲棋", "同步象棋", "闪电战国际象棋", "子弹棋", "快棋", "极速棋",
      "水中橄榄球", "水中曲棍球", "水中冰球", "水中拔河", "水中标靶", "水中接力", "水中障碍赛", "水中马术", "水中体操", "水中杂技",
      "马上长枪比武", "骑马射箭", "马上障碍赛", "马上杂技", "马上体操", "马上套索", "马上劈刺", "马上武术", "马上角力", "马上球类",
      "冰上马拉松", "南极马拉松", "撒哈拉沙漠马拉松", "戈壁挑战赛", "亚马逊丛林马拉松", "西藏高原超级马拉松", "死亡谷超级马拉松", "珠峰马拉松", "阿尔卑斯越野跑", "喜马拉雅山地越野",
      "独木舟马拉松", "皮划艇激流回旋", "龙舟世锦赛", "赛艇世锦赛", "帆船环球赛", "铁人三项世锦赛", "超级铁人三项", "极限铁人三项", "冬季铁人三项", "越野铁人三项",
      "卡巴迪", "科罗洽", "苗族武术", "朝鲜族摔跤", "蒙古族摔跤", "藏族赛马", "哈萨克族叼羊", "维吾尔族达瓦孜", "黎族拔河", "壮族抛绣球",
      "赛鸽", "赛鸽定向", "信鸽竞翔", "鸟类竞技", "犬类障碍赛", "赛犬", "犬类服从赛", "犬类飞盘", "犬类牧羊赛", "犬类搜救竞赛",
      "无重力运动", "太空运动", "零重力跑步", "太空体操", "微重力游泳", "太空球类", "轨道竞技", "失重格斗", "空间站运动", "星际竞技",
    ],
  },
  科学: {
    易: [
      "太阳", "月亮", "地球", "星星", "云", "雨", "雪", "风", "火", "水",
      "磁铁", "电池", "灯泡", "镜子", "放大镜", "望远镜", "显微镜", "温度计", "时钟", "指南针",
      "植物", "光合作用", "根", "茎", "叶", "花", "果实", "种子", "发芽", "生长",
      "水循环", "蒸发", "凝结", "降水", "径流", "下渗", "地下水", "河流", "湖泊", "海洋",
      "白天黑夜", "四季变化", "地球自转", "地球公转", "重力", "摩擦力", "弹力", "浮力", "压力", "拉力",
      "固体", "液体", "气体", "融化", "凝固", "蒸发", "液化", "升华", "凝华", "溶解",
      "颜色", "光的折射", "光的反射", "彩虹", "影子", "透明", "不透明", "半透明", "发光", "发热",
      "声音", "回声", "乐器", "噪音", "超声波", "次声波", "声速", "共鸣", "音调", "响度",
      "细菌", "病毒", "真菌", "植物细胞", "动物细胞", "DNA", "基因", "遗传", "变异", "进化",
    ],
    中: [
      "电磁感应", "发电机", "电动机", "变压器", "交流电", "直流电", "电阻", "电容", "电感", "二极管",
      "光合作用", "呼吸作用", "蒸腾作用", "根系吸水", "叶绿素", "叶绿体", "线粒体", "核糖体", "高尔基体", "内质网",
      "牛顿第一定律", "牛顿第二定律", "牛顿第三定律", "万有引力", "开普勒定律", "动量守恒", "能量守恒", "质量守恒", "电荷守恒", "熵增原理",
      "酸碱中和", "氧化还原", "化学方程式", "元素周期表", "化学键", "离子键", "共价键", "金属键", "分子间作用力", "化学平衡",
      "血液循环", "心脏跳动", "肺呼吸", "神经传导", "激素调节", "免疫系统", "消化系统", "排泄系统", "运动系统", "感觉系统",
      "大陆漂移", "板块构造", "地震波", "地壳结构", "地幔对流", "地核组成", "地磁场", "地热能", "温泉形成", "矿物晶体",
      "天气预报", "气象卫星", "多普勒雷达", "风速计", "气压计", "湿度计", "能见度仪", "闪电探测仪", "台风监测", "地震监测",
      "基因测序", "基因克隆", "转基因技术", "干细胞研究", "器官移植", "人工心脏", "人工肾脏", "人工肝脏", "人工眼睛", "神经接口",
      "人工智能", "机器学习", "深度学习", "神经网络", "自然语言处理", "计算机视觉", "强化学习", "迁移学习", "联邦学习", "对抗网络",
    ],
    难: [
      "量子纠缠", "量子叠加", "量子隧穿", "量子退相干", "量子测量", "量子计算", "量子密码", "量子通信", "量子传态", "量子模拟",
      "弦理论", "超弦理论", "M理论", "圈量子引力", "量子引力", "超对称理论", "额外维度", "多宇宙理论", "人择原理", "宇宙学常数",
      "希格斯玻色子", "夸克", "胶子", "轻子", "中微子", "暗物质候选粒子", "轴子", "超对称粒子", "额外维粒子", "镜像物质",
      "CRISPR基因编辑", "碱基编辑", "先导编辑", "表观遗传学", "染色质重塑", "RNA干扰", "蛋白质折叠", "蛋白质工程", "合成生物学", "代谢工程",
      "纳米机器人", "纳米药物", "纳米传感器", "纳米马达", "DNA纳米结构", "蛋白质纳米机器", "分子开关", "分子机器", "纳米孔测序", "原子力显微镜",
      "拓扑量子计算", "容错量子计算", "量子纠错", "量子优越性", "量子霸权", "量子计算机", "量子比特", "量子门", "量子电路", "量子算法",
      "广义相对论", "时空弯曲", "引力波", "黑洞热力学", "霍金辐射", "黑洞信息悖论", "事件视界", "奇点定理", "宇宙审查假说", "时间箭头",
      "宇宙暴胀", "大爆炸核合成", "宇宙微波背景辐射", "重子声学振荡", "宇宙大尺度结构", "宇宙网", "空洞", "超星系团", "宇宙丝", "宇宙墙",
      "超导体", "高温超导", "拓扑超导", "拓扑绝缘体", "量子霍尔效应", "分数量子霍尔效应", "拓扑量子计算", "马约拉纳费米子", "外尔费米子", "狄拉克费米子",
    ],
  },
  历史文化: {
    易: [
      "长城", "故宫", "兵马俑", "天安门", "颐和园", "圆明园", "布达拉宫", "少林寺", "岳阳楼", "滕王阁",
      "孔子", "孟子", "老子", "庄子", "孙子", "屈原", "李白", "杜甫", "苏轼", "王羲之",
      "秦始皇", "汉武帝", "唐太宗", "武则天", "宋太祖", "忽必烈", "朱元璋", "康熙", "乾隆", "慈禧",
      "四大发明", "造纸术", "印刷术", "火药", "指南针", "丝绸之路", "茶马古道", "郑和下西洋", "玄奘西游", "鉴真东渡",
      "春节", "元宵节", "清明节", "端午节", "中秋节", "重阳节", "七夕节", "腊八节", "冬至", "元旦",
      "汉字", "书法", "国画", "京剧", "昆曲", "武术", "中医", "针灸", "茶道", "围棋",
      "龙", "凤凰", "麒麟", "玄武", "朱雀", "白虎", "青龙", "貔貅", "饕餮", "年兽",
      "唐诗", "宋词", "元曲", "明清小说", "四大名著", "诗经", "楚辞", "汉赋", "六朝骈文", "唐宋散文",
      "丝绸", "瓷器", "茶叶", "漆器", "玉器", "青铜器", "刺绣", "剪纸", "年画", "泥塑",
    ],
    中: [
      "夏商周", "春秋战国", "秦汉", "三国", "魏晋南北朝", "隋唐", "五代十国", "宋辽金", "元明清", "民国",
      "百家争鸣", "儒家", "道家", "法家", "墨家", "名家", "农家", "阴阳家", "纵横家", "杂家",
      "科举制度", "殿试", "进士", "举人", "秀才", "状元", "榜眼", "探花", "翰林", "大学士",
      "漕运", "驿站", "丝路贸易", "海上丝路", "茶马互市", "朝贡体系", "宗藩关系", "羁縻制度", "土司制度", "改土归流",
      "乌衣巷", "东晋名士", "竹林七贤", "建安七子", "初唐四杰", "盛唐诗人", "中唐诗人", "晚唐诗人", "宋四家", "元四大家",
      "敦煌壁画", "云冈石窟", "龙门石窟", "麦积山石窟", "大足石刻", "乐山大佛", "峨眉山", "武当山", "五台山", "普陀山",
      "红山文化", "良渚文化", "仰韶文化", "龙山文化", "河姆渡文化", "马家窑文化", "齐家文化", "三星堆文化", "金沙文化", "殷商文化",
      "中国结", "刺绣", "扎染", "蜡染", "香云纱", "缂丝", "宋锦", "云锦", "蜀锦", "壮锦",
      "皮影戏", "木偶戏", "提线木偶", "布袋戏", "杖头木偶", "影子戏", "手影戏", "灯影戏", "隔帘戏", "走马灯",
    ],
    难: [
      "上古三皇五帝", "炎黄子孙", "华夏文明起源", "中原文化圈", "东夷文化", "苗蛮文化", "百越文化", "西戎东夷南蛮北狄", "四裔文化", "边疆民族",
      "原始陶器", "彩陶文化", "黑陶文化", "白陶文化", "硬陶文化", "釉陶文化", "原始瓷器", "青瓷", "白瓷", "彩瓷",
      "铭文金文", "甲骨卜辞", "竹简木牍", "帛书", "石经", "摩崖石刻", "碑刻拓片", "砖刻墓志", "印章篆刻", "玺印制度",
      "汉代经学", "两汉经今古文之争", "魏晋玄学", "隋唐佛学", "宋明理学", "清代考据学", "乾嘉学派", "公羊学派", "今文经学", "古文经学",
      "宋代四大书院", "白鹿洞书院", "岳麓书院", "嵩阳书院", "应天书院", "东林书院", "蒙学", "府学", "官学", "私塾",
      "郑国渠", "都江堰", "灵渠", "京杭大运河", "隋唐大运河", "南北大运河", "海河水系", "淮河水系", "长江水系", "珠江水系",
      "敦煌遗书", "永乐大典", "四库全书", "古今图书集成", "太平御览", "册府元龟", "文苑英华", "太平广记", "资治通鉴", "二十四史",
      "汉代画像石", "南北朝造像", "唐代壁画", "宋代院体画", "元代文人画", "明代浙派", "清代扬州八怪", "海派绘画", "岭南画派", "金陵画派",
      "明清官式建筑", "地方民居建筑", "藏式建筑", "维吾尔族建筑", "傣族建筑", "侗族建筑", "苗族建筑", "客家土楼", "徽派建筑", "北方四合院",
    ],
  },
};

// ═══════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════
const CATEGORIES = Object.keys(RAW);

function getAllWords(cat, difficulty) {
  if (cat === "全部") {
    return CATEGORIES.flatMap(c => RAW[c][difficulty] || []);
  }
  return RAW[cat]?.[difficulty] || [];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATEGORY_META = {
  全部: { emoji: "🎲", from: "#6366f1", to: "#ec4899", bg: "#fdf4ff" },
  动物: { emoji: "🐾", from: "#f97316", to: "#fb923c", bg: "#fff7ed" },
  食物: { emoji: "🍎", from: "#e11d48", to: "#f43f5e", bg: "#fff1f2" },
  职业: { emoji: "👷", from: "#0891b2", to: "#06b6d4", bg: "#ecfeff" },
  交通工具: { emoji: "🚀", from: "#7c3aed", to: "#a78bfa", bg: "#f5f3ff" },
  自然: { emoji: "🌿", from: "#16a34a", to: "#4ade80", bg: "#f0fdf4" },
  运动: { emoji: "⚽", from: "#d97706", to: "#fbbf24", bg: "#fffbeb" },
  科学: { emoji: "🔬", from: "#0f766e", to: "#14b8a6", bg: "#f0fdfa" },
  历史文化: { emoji: "🏛️", from: "#92400e", to: "#d97706", bg: "#fffbeb" },
};

const DIFFICULTY_META = {
  易: { label: "易", color: "#22c55e", bg: "#dcfce7", desc: "小学低年级" },
  中: { label: "中", color: "#f59e0b", bg: "#fef3c7", desc: "小学高年级" },
  难: { label: "难", color: "#ef4444", bg: "#fee2e2", desc: "初中挑战" },
};

// ═══════════════════════════════════════════════════════
// 主组件
// ═══════════════════════════════════════════════════════
export default function App() {
  // screens: home | category | setup | game | result | leaderboard
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState("易");
  const [minutes, setMinutes] = useState(3);
  const [cardCount, setCardCount] = useState(30);

  // team and leaderboard setup
  const [teamName, setTeamName] = useState(() => {
    const list = ["脑洞大开队 💡", "快乐翻牌家 🃏", "无敌智多星 🧠", "爱拼才会赢 🏆", "开心超人队 🦸", "绝地反击队 🏹", "勇往直前队 🚀"];
    return list[Math.floor(Math.random() * list.length)];
  });
  const [leaderboard, setLeaderboard] = useState(() => {
    const stored = localStorage.getItem("word_game_leaderboard");
    return stored ? JSON.parse(stored) : [];
  });
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("word_game_leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  // deck management — usedWords persists across rounds within same session
  const [usedWords, setUsedWords] = useState(new Set());
  const [roundWords, setRoundWords] = useState([]);
  const [deckExhausted, setDeckExhausted] = useState(false);

  // game state
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [busy, setBusy] = useState(false);

  const timerRef = useRef(null);
  const touchX = useRef(null);

  // ── timer ──
  useEffect(() => {
    if (screen !== "game") return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setScreen("result"); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [screen]);

  // ── start game ──
  const startGame = () => {
    const allWords = getAllWords(category, difficulty);
    const available = allWords.filter(w => !usedWords.has(w));

    let pool;
    if (available.length === 0) {
      // deck exhausted — reset used words and start fresh
      setUsedWords(new Set());
      pool = shuffle(allWords).slice(0, cardCount);
      setDeckExhausted(false);
    } else {
      pool = shuffle(available).slice(0, cardCount);
    }

    setRoundWords(pool);
    setIdx(0);
    setResults([]);
    setTimeLeft(minutes * 60);
    setBusy(false);
    setAnimDir(null);
    setScoreSaved(false);
    setScreen("game");
  };

  // ── advance card ──
  const advance = (status) => {
    if (busy) return;
    setBusy(true);
    setAnimDir(status === "correct" ? "left" : "right");

    setTimeout(() => {
      const newResults = [...results, { word: roundWords[idx], status }];
      setResults(newResults);
      const next = idx + 1;
      if (next >= roundWords.length) {
        // mark used and end
        setUsedWords(prev => {
          const next2 = new Set(prev);
          roundWords.forEach(w => next2.add(w));
          return next2;
        });
        clearInterval(timerRef.current);
        setScreen("result");
      } else {
        setIdx(next);
      }
      setAnimDir(null);
      setBusy(false);
    }, 330);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    // mark used words
    setUsedWords(prev => {
      const next = new Set(prev);
      roundWords.slice(0, idx + 1).forEach(w => next.add(w));
      return next;
    });
    setScreen("result");
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 55) advance(dx < 0 ? "correct" : "skip");
    touchX.current = null;
  };

  // ── keyboard shortcuts for desktop ──
  useEffect(() => {
    if (screen !== "game") return;
    const handleKeyDown = (e) => {
      if (busy) return;
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowLeft") {
        e.preventDefault();
        advance("correct");
      } else if (e.key === "Escape" || e.key === "ArrowRight") {
        e.preventDefault();
        advance("skip");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, busy, idx, roundWords]);

  // ── computed ──
  const meta = CATEGORY_META[category] || CATEGORY_META["全部"];
  const difMeta = DIFFICULTY_META[difficulty];
  const pct = timeLeft / (minutes * 60);
  const tColor = pct > 0.5 ? "#22c55e" : pct > 0.2 ? "#f59e0b" : "#ef4444";
  const correct = results.filter(r => r.status === "correct").length;
  const skipped = results.filter(r => r.status === "skip").length;
  const circ = 2 * Math.PI * 26;
  const totalWords = getAllWords(category || "全部", difficulty).length;
  const usedCount = [...usedWords].filter(w => getAllWords(category || "全部", difficulty).includes(w)).length;
  const remaining = totalWords - usedCount;

  // ── save score to leaderboard ──
  const saveToLeaderboard = () => {
    if (scoreSaved) return;
    const name = teamName.trim() || `神秘战队_${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord = {
      id: Date.now().toString(),
      teamName: name,
      category: category || "全部",
      difficulty: difficulty,
      correct: correct,
      skipped: skipped,
      timeUsed: minutes * 60 - timeLeft,
      timestamp: new Date().toLocaleString(),
    };
    setLeaderboard(prev => {
      const next = [...prev, newRecord];
      return next.sort((a, b) => {
        if (b.correct !== a.correct) return b.correct - a.correct;
        return a.timeUsed - b.timeUsed;
      });
    });
    setScoreSaved(true);
    setTimeout(() => {
      setScreen("leaderboard");
    }, 800);
  };

  return (
    <div style={S.root} className="app-container">
      <style>{CSS}</style>

      {/* ══ GLOBAL HEADER (visible on all screens except active game) ══ */}
      {screen !== "game" && (
        <header className="global-header">
          <div className="header-content">
            <div className="header-brand" onClick={() => setScreen("home")} style={{ cursor: "pointer" }}>
              <img src="/logo.png" className="header-logo" alt="logo" />
              <div className="header-titles">
                <span className="header-title">你说我猜</span>
                <span className="header-tagline">PARTY CARD GAME</span>
              </div>
            </div>
            <div className="header-actions">
              <button className={`header-nav-btn ${screen === "home" ? "active" : ""}`} onClick={() => setScreen("home")}>首页</button>
              <button className={`header-nav-btn ${screen === "category" ? "active" : ""}`} onClick={() => setScreen("category")}>分类</button>
              <button className={`header-nav-btn ${screen === "leaderboard" ? "active" : ""}`} onClick={() => setScreen("leaderboard")}>排行榜 🏆</button>
            </div>
          </div>
        </header>
      )}

      {/* ══ HOME ══ */}
      {screen === "home" && (
        <div style={S.page} className="page-container">
          <div className="responsive-container home-layout">
            <div className="main-section hero-brand-section">
              <div style={{ textAlign: "center", marginBottom: 28, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="/logo.png" className="app-logo float" alt="你说我猜 logo" />
                <h1 style={S.mainTitle} className="brand-title">你说我猜</h1>
                <p style={S.sub} className="brand-subtitle">经典派对翻牌猜词 · 限时激情挑战</p>
              </div>
              <button style={S.bigBtn} className="action-btn-main" onClick={() => setScreen("category")}>开始游戏 →</button>
            </div>

            <div className="side-section home-rules-section">
              <div style={S.ruleBox} className="premium-panel">
                <div style={S.ruleHead} className="panel-header">📖 游戏规则</div>
                {[
                  ["1", "一人当描述者，拿着手机"],
                  ["2", "屏幕显示词语，用语言描述给大家"],
                  ["3", "❌ 不能直接说出词语！"],
                  ["←", "猜对了 → 左滑 或 按 ✅"],
                  ["→", "猜不出 → 右滑 或 按 ⏭"],
                  ["⏱", "时间到或字卡翻完即结束！"],
                ].map(([icon, text]) => (
                  <div key={icon} style={S.ruleRow} className="rule-item">
                    <span style={S.ruleIcon} className="rule-badge">{icon}</span>
                    <span style={S.ruleText}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CATEGORY ══ */}
      {screen === "category" && (
        <div style={S.page} className="page-container">
          <button style={S.ghost} className="ghost-back" onClick={() => setScreen("home")}>← 返回</button>
          <h2 style={{ ...S.mainTitle, fontSize: 26, marginBottom: 6 }}>选择分类</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 18, textAlign: "center" }}>选你们最想玩的主题</p>

          <div className="cc" style={{
            ...S.allCard,
            background: `linear-gradient(135deg,${CATEGORY_META["全部"].from},${CATEGORY_META["全部"].to})`,
            border: category === "全部" ? "3px solid white" : "3px solid transparent"
          }}
            onClick={() => { setCategory("全部"); setScreen("setup"); }}>
            <div style={{ fontSize: 40 }}>🎲</div>
            <div>
              <div style={S.allName}>全部分类</div>
              <div style={S.allSub}>混合所有词</div>
            </div>
            <div style={S.allArrow}>→</div>
          </div>

          <div className="cat-grid">
            {CATEGORIES.map(cat => {
              const m = CATEGORY_META[cat];
              return (
                <div key={cat} className="cc cat-card" style={{
                  ...S.catCard,
                  background: `linear-gradient(145deg,${m.from},${m.to})`,
                  outline: category === cat ? "3px solid white" : "none"
                }}
                  onClick={() => { setCategory(cat); setScreen("setup"); }}>
                  <div style={{ fontSize: 32 }}>{m.emoji}</div>
                  <div style={S.catName}>{cat}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ SETUP ══ */}
      {screen === "setup" && (
        <div style={S.page} className="page-container">
          <button style={S.ghost} className="ghost-back" onClick={() => setScreen("category")}>← 返回</button>

          <div className="responsive-container setup-layout">
            <div className="main-section setup-options-section">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{meta.emoji}</span>
                <h2 style={{ ...S.mainTitle, fontSize: 28, marginTop: 0 }}>{category}</h2>
              </div>

              {/* Team Name Input */}
              <div style={S.section} className="premium-panel flex-panel">
                <div style={S.sectionLabel} className="panel-label">队伍 / 选手名称</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    placeholder="输入本轮队伍名称，例如：无敌风火轮队 🚀"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    style={{
                      flex: 1,
                      border: "2px solid #e2e8f0",
                      borderRadius: 14,
                      padding: "12px 16px",
                      fontSize: 14,
                      fontWeight: 800,
                      fontFamily: "'Nunito', sans-serif",
                      outline: "none",
                      color: "#1e293b"
                    }}
                  />
                  <button
                    onClick={() => {
                      const list = ["脑洞大开队 💡", "快乐翻牌家 🃏", "无敌智多星 🧠", "爱拼才会赢 🏆", "神笔马良队 🎨", "开心超人队 🦸", "绝地反击队 🏹", "勇往直前队 🚀"];
                      setTeamName(list[Math.floor(Math.random() * list.length)]);
                    }}
                    style={{
                      background: "#f1f5f9",
                      border: "none",
                      borderRadius: 14,
                      padding: "0 16px",
                      fontSize: 14,
                      fontWeight: 800,
                      color: "#7c3aed",
                      cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                    className="cc"
                  >
                    🎲 随机
                  </button>
                </div>
              </div>

              {/* difficulty */}
              <div style={S.section} className="premium-panel flex-panel">
                <div style={S.sectionLabel} className="panel-label">难易度</div>
                <div style={S.optRow} className="opt-row-difficulty">
                  {Object.entries(DIFFICULTY_META).map(([k, v]) => (
                    <button key={k} style={{
                      ...S.optBtn,
                      background: difficulty === k ? v.color : "#f1f5f9",
                      color: difficulty === k ? "white" : "#64748b",
                      boxShadow: difficulty === k ? `0 4px 12px ${v.color}55` : "none"
                    }}
                      className={`opt-btn-diff ${difficulty === k ? 'active' : ''}`}
                      onClick={() => setDifficulty(k)}>
                      <span style={{ fontSize: 18, fontWeight: 900 }}>{v.label}</span>
                      <span style={{ fontSize: 11 }}>{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* minutes */}
              <div style={S.section} className="premium-panel">
                <div style={S.sectionLabel} className="panel-label">回合时长</div>
                <div style={S.optRow} className="opt-row-minutes">
                  {[1, 2, 3, 4, 5].map(m => (
                    <button key={m} style={{
                      ...S.optBtnSq,
                      background: minutes === m ? "#7c3aed" : "#f1f5f9",
                      color: minutes === m ? "white" : "#64748b",
                      boxShadow: minutes === m ? "0 4px 12px #7c3aed55" : "none"
                    }}
                      className={`opt-btn-sq ${minutes === m ? 'active' : ''}`}
                      onClick={() => setMinutes(m)}>
                      {m}分
                    </button>
                  ))}
                </div>
              </div>

              {/* card count */}
              <div style={S.section} className="premium-panel">
                <div style={S.sectionLabel} className="panel-label">本轮字卡数</div>
                <div style={S.optRow} className="opt-row-cards">
                  {[15, 20, 30, 40, 50].map(n => (
                    <button key={n} style={{
                      ...S.optBtnSq,
                      background: cardCount === n ? "#7c3aed" : "#f1f5f9",
                      color: cardCount === n ? "white" : "#64748b",
                      boxShadow: cardCount === n ? "0 4px 12px #7c3aed55" : "none",
                      opacity: n > remaining && remaining > 0 ? 0.45 : 1
                    }}
                      className={`opt-btn-sq ${cardCount === n ? 'active' : ''}`}
                      onClick={() => setCardCount(n)}>
                      {n}张
                    </button>
                  ))}
                </div>
                {cardCount > remaining && remaining > 0 && (
                  <p style={{ fontSize: 12, color: "#f59e0b", marginTop: 8, textAlign: "center" }}>
                    ⚠️ 剩余 {remaining} 张，将先用完再循环
                  </p>
                )}
              </div>

              <button style={{ ...S.bigBtn, marginTop: 18 }} className="action-btn-main start-game-btn" onClick={startGame}>
                开始！🚀
              </button>
            </div>

            <div className="side-section setup-status-section">
              {/* deck status */}
              <div style={S.deckStatus} className="premium-panel deck-status-panel">
                <div style={S.deckInfo}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>当前分类字卡池</span>
                  <span style={{ fontWeight: 900, color: remaining < 20 ? "#ef4444" : "#22c55e", fontSize: 24, marginTop: 4 }}>
                    {remaining} / {totalWords}
                  </span>
                  <span style={{ color: "#94a3b8", fontSize: 11, marginTop: 2 }}>未使用的字卡数</span>
                </div>
                {usedCount > 0 && (
                  <button style={S.resetBtn} className="reset-deck-btn" onClick={() => setUsedWords(new Set())}>
                    🔄 重置卡库
                  </button>
                )}
              </div>

              {/* Game Setup Card Summary (Desktop only) */}
              <div className="premium-panel setup-summary-panel desktop-only">
                <div className="summary-title">🎮 选项摘要</div>
                <div className="summary-item">
                  <span className="summary-label">当前队伍</span>
                  <span className="summary-value" style={{ fontWeight: 900, color: "#7c3aed" }}>{teamName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">主题</span>
                  <span className="summary-value highlight">{meta.emoji} {category}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">难度</span>
                  <span className="summary-value" style={{ color: difMeta.color, fontWeight: 900 }}>{difMeta.label} ({difMeta.desc})</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">限时</span>
                  <span className="summary-value">{minutes} 分钟 ({minutes * 60} 秒)</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">字卡</span>
                  <span className="summary-value">{cardCount} 张 / 局</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ GAME ══ */}
      {screen === "game" && roundWords.length > 0 && (
        <div style={{ ...S.gamePage, background: meta.bg }} className="game-page-container"
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

          <div className="responsive-container game-layout">

            {/* Left side panel: Stats & Shortcuts (Desktop only) */}
            <div className="side-section game-left-section desktop-only">
              <div className="premium-panel game-meta-panel">
                <div className="game-section-title">📍 当前局信息</div>
                <div style={{ fontSize: 13, color: "#64748b", fontWeight: 700, marginBottom: 4, textAlign: "left" }}>当前挑战队伍</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#7c3aed", marginBottom: 16, textAlign: "left" }}>{teamName}</div>
                <div className="meta-badge-row">
                  <span style={{ ...S.badge, background: `linear-gradient(90deg,${meta.from},${meta.to})`, fontSize: 14 }}>
                    {meta.emoji} {category}
                  </span>
                  <span style={{ ...S.badge, background: difMeta.color, fontSize: 14 }}>
                    {difMeta.label}
                  </span>
                </div>

                <div style={{ marginTop: 24 }}>
                  <div className="shortcut-title">⌨️ 键盘快捷键</div>
                  <div className="shortcut-item"><kbd>Space</kbd> 或 <kbd>Enter</kbd> 或 <kbd>←</kbd> ＝ 猜对</div>
                  <div className="shortcut-item"><kbd>Esc</kbd> 或 <kbd>→</kbd> ＝ 跳过</div>
                </div>
              </div>
            </div>

            {/* Center: Main Game Play Area */}
            <div className="main-section game-play-section">
              <div style={S.hdr} className="game-header">
                <div style={S.pill("#dcfce7", "#16a34a")} className="game-score-pill correct-pill">✅ {correct}</div>
                <div className="timer-wrapper" style={{ position: "relative", width: 60, height: 60 }}>
                  <svg width="60" height="60" style={{ position: "absolute", top: 0, left: 0 }}>
                    <circle cx="30" cy="30" r="26" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                    <circle cx="30" cy="30" r="26" fill="none" stroke={tColor} strokeWidth="5"
                      strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
                      strokeLinecap="round" transform="rotate(-90 30 30)"
                      style={{ transition: "stroke-dashoffset 1s linear,stroke 0.5s" }} />
                  </svg>
                  <span style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 18, fontWeight: 900, color: tColor
                  }}>{timeLeft}</span>
                </div>
                <div style={S.pill("#fee2e2", "#dc2626")} className="game-score-pill skip-pill">⏭ {skipped}</div>
              </div>

              {/* Mobile-only tags */}
              <div className="mobile-only" style={{ textAlign: "center", marginBottom: 12, display: "flex", gap: 8, justifyContent: "center" }}>
                <span style={{ ...S.badge, background: `linear-gradient(90deg,${meta.from},${meta.to})` }}>
                  {meta.emoji} {category}
                </span>
                <span style={{ ...S.badge, background: difMeta.color }}>
                  {difMeta.label}
                </span>
              </div>

              <div style={S.stack} className="card-stack-container">
                {idx + 2 < roundWords.length && <div style={{ ...S.ghost2, transform: "scale(0.84) translateY(22px)", opacity: 0.3 }} className="stack-layer-3" />}
                {idx + 1 < roundWords.length && <div style={{ ...S.ghost2, transform: "scale(0.92) translateY(11px)", opacity: 0.55 }} className="stack-layer-2" />}
                <div key={idx}
                  className={`card-item ${animDir === "left" ? "sl" : animDir === "right" ? "sr" : "ce"}`}
                  style={{ ...S.card, background: `linear-gradient(150deg,${meta.from},${meta.to})` }}>
                  <div style={S.cardCounter} className="card-counter">{idx + 1} / {roundWords.length}</div>
                  <div style={S.cardWord} className="card-word">{roundWords[idx]}</div>
                  <div style={S.hint} className="card-drag-hint">
                    <span>← 猜对了 (左滑)</span>
                    <span style={{ opacity: 0.4 }}>｜</span>
                    <span>跳过 (右滑) →</span>
                  </div>
                </div>
              </div>

              <div style={S.progBg} className="progress-bar-bg">
                <div style={{
                  ...S.progFill, width: `${(idx / roundWords.length) * 100}%`,
                  background: `linear-gradient(90deg,${meta.from},${meta.to})`
                }} className="progress-bar-fill" />
              </div>

              <div style={S.actions} className="game-actions-row">
                <button style={S.skipBig} className="game-action-btn skip-btn" onClick={() => advance("skip")}>
                  <span style={{ fontSize: 30 }}>⏭</span><span>跳过</span>
                </button>
                <button style={S.okBig} className="game-action-btn correct-btn" onClick={() => advance("correct")}>
                  <span style={{ fontSize: 30 }}>✅</span><span>猜对了！</span>
                </button>
              </div>
              <button style={S.ghost} className="end-game-early" onClick={endGame}>结束本轮</button>
            </div>

            {/* Right side panel: Guessed History List (Desktop only) */}
            <div className="side-section game-right-section desktop-only">
              <div className="premium-panel live-scoreboard-panel">
                <div className="game-section-title">📊 本轮答题明细</div>
                <div className="scoreboard-list" style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {results.length === 0 ? (
                    <div className="scoreboard-empty">暂无答题记录，开始描述吧！</div>
                  ) : (
                    results.map((r, i) => (
                      <div key={i} className={`scoreboard-item ${r.status}`} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                        borderRadius: 10, marginBottom: 6, fontSize: 13, fontWeight: 700,
                        background: r.status === "correct" ? "#f0fdf4" : "#fff1f0",
                        color: r.status === "correct" ? "#16a34a" : "#dc2626",
                        border: r.status === "correct" ? "1px solid #bbf7d0" : "1px solid #fecaca"
                      }}>
                        <span>{r.status === "correct" ? "✅" : "⏭"}</span>
                        <span>第 {i + 1} 题:</span>
                        <span style={{ marginLeft: "auto" }}>{r.word}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ══ RESULT ══ */}
      {screen === "result" && (
        <div style={S.page} className="page-container">
          <div className="responsive-container result-layout">

            {/* Left Section: Score & Navigation */}
            <div className="main-section result-score-section">
              <div className="float" style={{ fontSize: 80, textAlign: "center", marginBottom: 16 }}>
                {correct >= 15 ? "🏆" : correct >= 10 ? "🥳" : correct >= 5 ? "👍" : "💪"}
              </div>

              <div style={S.resCard} className="premium-panel result-card-panel">
                <div style={S.resTitle} className="panel-header">本轮结束！</div>
                <div style={S.bigNum} className="big-score-number">{correct}<span style={{ fontSize: 20, color: "#94a3b8", marginLeft: 4 }}>个</span></div>
                <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>猜对数量</div>

                <div style={S.stats} className="result-stats-row">
                  {[
                    { icon: "✅", val: correct, col: "#22c55e", label: "猜对" },
                    { icon: "⏭", val: skipped, col: "#f97316", label: "跳过" },
                    { icon: "⏱", val: `${minutes * 60 - timeLeft}s`, col: "#60a5fa", label: "用时" },
                  ].map(s => (
                    <div key={s.label} style={S.statBox} className="result-stat-box">
                      <span style={{ fontSize: 26 }}>{s.icon}</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: s.col }}>{s.val}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                <div style={S.medal} className="result-medal-badge">
                  {correct >= 15 ? "🏆 传奇猜词王！" : correct >= 10 ? "🥳 非常棒！继续！" : correct >= 5 ? "👍 不错哦！再来！" : "💪 加油！下次更好！"}
                </div>
              </div>

              {/* Leaderboard saving card */}
              <div style={{ ...S.resCard, marginTop: 12, padding: "18px 20px", textAlign: "left" }} className="premium-panel save-scoreboard-panel">
                <div style={{ ...S.resTitle, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 6, color: "#1e293b" }}>
                  <span>🏆 保存本轮成绩到排行榜</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    placeholder="输入队伍/选手名称"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    style={{
                      flex: 1,
                      border: "2px solid #e2e8f0",
                      borderRadius: 12,
                      padding: "10px 14px",
                      fontSize: 13,
                      fontWeight: 800,
                      fontFamily: "'Nunito', sans-serif",
                      outline: "none",
                      color: "#1e293b"
                    }}
                  />
                  <button
                    onClick={saveToLeaderboard}
                    disabled={scoreSaved}
                    style={{
                      background: scoreSaved ? "#22c55e" : "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "white",
                      border: "none",
                      borderRadius: 12,
                      padding: "0 18px",
                      fontSize: 13,
                      fontWeight: 900,
                      cursor: scoreSaved ? "default" : "pointer",
                      boxShadow: scoreSaved ? "none" : "0 4px 12px rgba(79,70,229,0.25)",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                    className="cc"
                  >
                    {scoreSaved ? "已保存 ✅" : "保存 💾"}
                  </button>
                </div>
              </div>

              {/* Action buttons under the score card on desktop */}
              <div className="result-actions-wrapper">
                <button style={S.bigBtn} className="action-btn-main play-again-btn" onClick={() => setScreen("setup")}>再来一轮 🔄</button>
                <button style={{ ...S.bigBtn, background: "linear-gradient(135deg,#475569,#334155)", marginTop: 12 }}
                  className="action-btn-main change-cat-btn"
                  onClick={() => { setCategory(null); setScreen("category"); }}>换分类 🎯</button>
                <button style={{ ...S.ghost, marginTop: 12 }} className="ghost-back-home" onClick={() => setScreen("home")}>回到首页</button>
              </div>
            </div>

            {/* Right Section: Word Checklist History & Deck info */}
            <div className="side-section result-history-section">
              <div style={S.deckStatus} className="premium-panel deck-status-panel">
                <div style={S.deckInfo}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>本分类剩余未用字卡</span>
                  <span style={{ fontWeight: 900, fontSize: 20, color: remaining - roundWords.length < 20 ? "#ef4444" : "#22c55e", marginTop: 4 }}>
                    {Math.max(0, remaining - roundWords.length)} / {totalWords}
                  </span>
                </div>
              </div>

              {results.length > 0 && (
                <div style={S.history} className="premium-panel history-review-panel">
                  <div style={S.histTitle} className="panel-header-sub">📋 本轮回顾</div>
                  <div className="review-tag-cloud" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {results.map((r, i) => (
                      <span key={i} style={{
                        ...S.tag,
                        background: r.status === "correct" ? "#f0fdf4" : "#fff1f0",
                        color: r.status === "correct" ? "#16a34a" : "#dc2626",
                        borderColor: r.status === "correct" ? "#86efac" : "#fca5a5"
                      }}
                        className={`review-tag ${r.status}`}>
                        {r.status === "correct" ? "✅" : "⏭"} {r.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ══ LEADERBOARD ══ */}
      {screen === "leaderboard" && (
        <div style={S.page} className="page-container ce">
          <button style={S.ghost} className="ghost-back" onClick={() => setScreen("home")}>← 返回首页</button>

          <div className="responsive-container leaderboard-layout" style={{ maxWidth: 900, margin: "0 auto", width: "100%" }}>
            <div className="main-section leaderboard-list-section" style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 36 }}>🏆</span>
                  <h2 style={{ ...S.mainTitle, fontSize: 32, marginTop: 0, textAlign: "left" }}>排行榜</h2>
                </div>
                {leaderboard.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("确定要清除所有排行榜记录吗？此操作无法撤销。")) {
                        setLeaderboard([]);
                        localStorage.removeItem("word_game_leaderboard");
                      }
                    }}
                    style={{
                      background: "#fee2e2",
                      border: "none",
                      borderRadius: 10,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#ef4444",
                      cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif"
                    }}
                    className="cc"
                  >
                    🗑️ 清除所有记录
                  </button>
                )}
              </div>

              {leaderboard.length === 0 ? (
                <div style={{
                  background: "white",
                  borderRadius: 24,
                  padding: "60px 24px",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>🚀</div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#1e293b", marginBottom: 8 }}>暂无排行榜记录</h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>开启一局精彩的你说我猜，并将成绩保存到这里吧！</p>
                  <button style={{ ...S.bigBtn, maxWidth: 220, margin: "0 auto" }} onClick={() => setScreen("category")}>立即开启对局 🎮</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Top 3 Podium (visual cards) on desktop */}
                  <div className="leaderboard-podium" style={{
                    display: "grid",
                    gridTemplateColumns: leaderboard.length >= 3 ? "1fr 1.1fr 1fr" : leaderboard.length === 2 ? "1.1fr 1fr" : "1fr",
                    gap: 16,
                    marginBottom: 12
                  }}>
                    {/* Render up to top 3 in special styled podium blocks */}
                    {leaderboard.slice(0, 3).map((r, i) => {
                      const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
                      const gradient = i === 0
                        ? "linear-gradient(135deg,#fef08a,#fef9c3)" // Gold
                        : i === 1
                          ? "linear-gradient(135deg,#e2e8f0,#f1f5f9)" // Silver
                          : "linear-gradient(135deg,#fed7aa,#ffedd5)"; // Bronze
                      const borderCol = i === 0 ? "#facc15" : i === 1 ? "#cbd5e1" : "#f97316";
                      return (
                        <div key={r.id} style={{
                          background: gradient,
                          border: `2px solid ${borderCol}`,
                          borderRadius: 22,
                          padding: "20px 16px",
                          textAlign: "center",
                          boxShadow: i === 0 ? "0 10px 25px rgba(250,204,21,0.22)" : "0 4px 12px rgba(0,0,0,0.03)",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }} className="podium-card ce">
                          <span style={{ fontSize: 36, position: "absolute", top: -16 }}>{medal}</span>
                          <span style={{ fontWeight: 900, fontSize: 16, color: "#1e293b", marginTop: 14, wordBreak: "break-all" }}>{r.teamName}</span>
                          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2, marginTop: 10 }}>
                            <span style={{ fontSize: 32, fontWeight: 900, color: i === 0 ? "#854d0e" : "#334155" }}>{r.correct}</span>
                            <span style={{ fontSize: 13, color: "#64748b", fontWeight: 700 }}>分</span>
                          </div>

                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 12 }}>
                            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 50, background: "rgba(255,255,255,0.7)", fontWeight: 800, color: "#475569" }}>
                              {r.category}
                            </span>
                            <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 50, background: "rgba(255,255,255,0.7)", fontWeight: 800, color: DIFFICULTY_META[r.difficulty]?.color || "#475569" }}>
                              {r.difficulty}
                            </span>
                          </div>
                          <span style={{ fontSize: 11, color: "#64748b", marginTop: 8, fontWeight: 700 }}>⏱ 用时 {r.timeUsed}秒</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complete scrolling ranking table */}
                  <div style={{
                    background: "white",
                    borderRadius: 24,
                    padding: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    border: "1px solid #e2e8f0"
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "50px 1fr 100px 100px 140px",
                      padding: "12px 8px",
                      borderBottom: "2px solid #f1f5f9",
                      fontSize: 13,
                      fontWeight: 900,
                      color: "#94a3b8",
                      textTransform: "uppercase"
                    }} className="leaderboard-table-header">
                      <span>排名</span>
                      <span>队伍/选手</span>
                      <span style={{ textAlign: "center" }}>得分</span>
                      <span style={{ textAlign: "center" }}>用时</span>
                      <span style={{ textAlign: "right" }}>对局参数</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }} className="leaderboard-table-body">
                      {leaderboard.map((r, index) => (
                        <div key={r.id} style={{
                          display: "grid",
                          gridTemplateColumns: "50px 1fr 100px 100px 140px",
                          padding: "16px 8px",
                          borderBottom: index === leaderboard.length - 1 ? "none" : "1px solid #f1f5f9",
                          fontSize: 14,
                          fontWeight: 700,
                          alignItems: "center",
                          color: "#475569"
                        }} className="leaderboard-row">

                          {/* Rank */}
                          <span style={{
                            fontWeight: 900,
                            fontSize: 16,
                            color: index === 0 ? "#eab308" : index === 1 ? "#94a3b8" : index === 2 ? "#d97706" : "#64748b"
                          }}>
                            #{index + 1}
                          </span>

                          {/* Team Name */}
                          <span style={{ fontWeight: 800, color: "#1e293b", wordBreak: "break-all", paddingRight: 10 }}>{r.teamName}</span>

                          {/* Score */}
                          <span style={{ textAlign: "center", fontWeight: 900, color: "#7c3aed", fontSize: 16 }}>{r.correct} <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>分</span></span>

                          {/* Time */}
                          <span style={{ textAlign: "center", color: "#64748b" }}>{r.timeUsed}s</span>

                          {/* Params */}
                          <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                            <span style={{
                              fontSize: 11,
                              padding: "3px 8px",
                              borderRadius: 8,
                              background: "#f1f5f9",
                              color: "#475569",
                              fontWeight: 800
                            }}>
                              {r.category}
                            </span>
                            <span style={{
                              fontSize: 11,
                              padding: "3px 8px",
                              borderRadius: 8,
                              background: DIFFICULTY_META[r.difficulty]?.bg || "#fee2e2",
                              color: DIFFICULTY_META[r.difficulty]?.color || "#ef4444",
                              fontWeight: 800
                            }}>
                              {r.difficulty}
                            </span>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CSS & Styles
// ═══════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Nunito',sans-serif;background:#f8fafc;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ce{from{opacity:0;transform:scale(0.88) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes sl{0%{opacity:1;transform:translateX(0) rotate(0)}100%{opacity:0;transform:translateX(-130%) rotate(-18deg)}}
@keyframes sr{0%{opacity:1;transform:translateX(0) rotate(0)}100%{opacity:0;transform:translateX(130%) rotate(18deg)}}
.float{animation:float 3s ease-in-out infinite;}
.ce{animation:ce .35s cubic-bezier(.22,1,.36,1) both;}
.sl{animation:sl .33s ease-in both;}
.sr{animation:sr .33s ease-in both;}
.cc{transition:transform .15s;}
.cc:active{transform:scale(0.93)!important;}
button:active{opacity:0.82;}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE DESIGN SYSTEM & MODERN LAYOUT RULES
   ═══════════════════════════════════════════════════════ */

/* Global App Container */
.app-container {
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  font-family: 'Nunito', sans-serif;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

@media (max-width: 767px) {
  .app-container {
    max-width: 430px;
  }
}
@media (min-width: 768px) {
  .app-container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {
  .app-container {
    max-width: 1200px;
    padding: 0 24px;
  }
}

/* Global Sticky Header */
.global-header {
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px 24px;
}
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-logo {
  width: 38px;
  height: 38px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(124, 58, 237, 0.15));
}
.header-titles {
  display: flex;
  flex-direction: column;
}
.header-title {
  font-size: 17px;
  font-weight: 900;
  color: #1e293b;
  letter-spacing: -0.5px;
  line-height: 1.1;
}
.header-tagline {
  font-size: 9px;
  font-weight: 800;
  color: #94a3b8;
  letter-spacing: 0.5px;
  margin-top: 1px;
}
.header-actions {
  display: flex;
  gap: 14px;
}
.header-nav-btn {
  background: none;
  border: none;
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #64748b;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}
.header-nav-btn:hover {
  color: #7c3aed;
  background: #faf5ff;
}

@media (max-width: 767px) {
  .global-header {
    display: none; /* Hide on mobile to keep original simple layout integrity */
  }
}

/* Page Containers */
.page-container {
  width: 100%;
}
@media (min-width: 1024px) {
  .page-container {
    padding: 30px 10px 50px !important;
  }
}

/* 2-Column Responsive Layout */
.responsive-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
}
@media (min-width: 1024px) {
  .responsive-container {
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    margin-top: 16px;
  }
  .main-section {
    flex: 1;
    min-width: 0;
  }
  .side-section {
    width: 380px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

/* Home Screen Enhancements */
.app-logo {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 20px;
  filter: drop-shadow(0 12px 24px rgba(124, 58, 237, 0.25));
}
.brand-title {
  background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (min-width: 1024px) {
  .home-layout {
    align-items: center;
    min-height: calc(100vh - 160px);
  }
  .hero-brand-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 40px;
  }
  .home-rules-section {
    width: 440px !important;
  }
}

/* Category Grid adjustments */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}
.cat-card {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.cat-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 24px rgba(0,0,0,0.15) !important;
}
@media (min-width: 768px) {
  .cat-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
@media (min-width: 1024px) {
  .cat-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}

/* Premium Panel Styling */
.premium-panel {
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.03) !important;
  transition: all 0.3s ease;
}
.premium-panel:hover {
  box-shadow: 0 10px 28px rgba(124, 58, 237, 0.05) !important;
  border-color: rgba(124, 58, 237, 0.2) !important;
}

/* Difficulty Option Adjustments */
@media (min-width: 768px) {
  .opt-row-difficulty, .opt-row-minutes, .opt-row-cards {
    gap: 12px !important;
  }
  .opt-btn-diff, .opt-btn-sq {
    padding: 16px 8px !important;
    font-size: 16px !important;
    border-radius: 16px !important;
  }
}
.opt-btn-diff:hover, .opt-btn-sq:hover {
  transform: translateY(-2px);
  filter: brightness(0.96);
}
.opt-btn-diff.active, .opt-btn-sq.active {
  transform: translateY(-2px) scale(1.01);
}

/* Setup Settings Summary Card */
.summary-title {
  font-weight: 900;
  font-size: 15px;
  color: #1e293b;
  margin-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 8px;
  text-align: left;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
}
.summary-label {
  color: #64748b;
}
.summary-value {
  color: #1e293b;
}
.summary-value.highlight {
  background: #faf5ff;
  color: #7c3aed;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 12px;
  border: 1px solid #f3e8ff;
}

/* Active Game Section Layout overrides */
@media (min-width: 1024px) {
  .game-layout {
    align-items: stretch !important;
    height: calc(100vh - 160px);
    margin-top: 24px !important;
  }
  .game-left-section {
    width: 280px !important;
  }
  .game-play-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 520px;
    margin: 0 auto;
  }
  .game-right-section {
    width: 320px !important;
  }
}

/* Game Card stack visual scaling for desktop */
@media (min-width: 768px) {
  .card-item {
    padding: 70px 40px 56px !important;
    gap: 20px !important;
    border-radius: 40px !important;
  }
  .card-word {
    font-size: 80px !important;
    letter-spacing: 8px !important;
  }
  .card-counter {
    font-size: 15px !important;
    margin-bottom: 8px !important;
  }
  .card-drag-hint {
    font-size: 14px !important;
    margin-top: 8px !important;
  }
}

/* Keyboard Shortcut Visuals */
.shortcut-title {
  font-weight: 900;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: left;
}
.shortcut-item {
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
}
kbd {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-bottom: 3.5px solid #94a3b8;
  border-radius: 6px;
  padding: 3px 8px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 900;
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
}

/* Scrollbars for Live Scoreboard and History lists */
.scoreboard-list::-webkit-scrollbar {
  width: 6px;
}
.scoreboard-list::-webkit-scrollbar-track {
  background: transparent;
}
.scoreboard-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
}
.scoreboard-empty {
  color: #94a3b8;
  font-size: 12px;
  text-align: center;
  padding: 40px 20px;
  font-weight: 700;
  border: 2px dashed #e2e8f0;
  border-radius: 14px;
}
.game-meta-panel, .live-scoreboard-panel {
  background: white;
  border-radius: 20px;
  padding: 22px 20px;
  height: 100%;
}
.game-section-title {
  font-weight: 900;
  font-size: 15px;
  color: #1e293b;
  margin-bottom: 16px;
  border-bottom: 2px solid #f1f5f9;
  padding-bottom: 8px;
  text-align: left;
}
.meta-badge-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

/* Result panel layout overrides */
@media (min-width: 1024px) {
  .result-layout {
    align-items: flex-start !important;
  }
  .result-score-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .result-actions-wrapper {
    width: 100%;
    max-width: 440px;
    margin-top: 10px;
  }
}

/* Utility hide/show helpers */
.desktop-only {
  display: none !important;
}
@media (min-width: 1024px) {
  .desktop-only {
    display: block !important;
  }
  .mobile-only {
    display: none !important;
  }
}
`;

const S = {
  root: { minHeight: "100vh", fontFamily: "'Nunito',sans-serif", background: "#f8fafc" },
  page: { padding: "32px 18px 44px", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh" },
  mainTitle: { fontSize: 36, fontWeight: 900, color: "#1e293b", textAlign: "center", letterSpacing: -1, marginTop: 10 },
  sub: { color: "#94a3b8", fontSize: 14, textAlign: "center", marginTop: 5, marginBottom: 4 },
  ruleBox: {
    background: "white", borderRadius: 22, padding: "18px 20px", width: "100%",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)", marginBottom: 26
  },
  ruleHead: { fontWeight: 900, fontSize: 15, color: "#1e293b", marginBottom: 12 },
  ruleRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 },
  ruleIcon: {
    background: "#f1f5f9", borderRadius: 50, width: 26, height: 26, display: "inline-flex",
    alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#7c3aed", flexShrink: 0
  },
  ruleText: { fontSize: 14, color: "#475569", lineHeight: 1.5 },
  bigBtn: {
    background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "white", border: "none",
    borderRadius: 50, padding: "15px 0", fontSize: 17, fontWeight: 900, fontFamily: "'Nunito',sans-serif",
    cursor: "pointer", boxShadow: "0 6px 20px rgba(79,70,229,0.35)", width: "100%"
  },
  ghost: {
    background: "none", border: "none", color: "#94a3b8", fontSize: 13, fontWeight: 700,
    cursor: "pointer", fontFamily: "'Nunito',sans-serif", padding: "4px 0"
  },
  allCard: {
    display: "flex", alignItems: "center", gap: 14, width: "100%", borderRadius: 22,
    padding: "18px 20px", marginBottom: 12, cursor: "pointer",
    boxShadow: "0 8px 24px rgba(99,102,241,0.25)", transition: "transform .15s"
  },
  allName: { fontWeight: 900, fontSize: 18, color: "white" },
  allSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  allArrow: { marginLeft: "auto", fontSize: 20, color: "rgba(255,255,255,0.7)" },
  catGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, width: "100%" },
  catCard: {
    borderRadius: 18, padding: "14px 6px", textAlign: "center", cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)", transition: "transform .15s"
  },
  catName: { fontWeight: 900, fontSize: 12, color: "white", marginTop: 4 },
  // setup
  deckStatus: {
    background: "white", borderRadius: 16, padding: "14px 18px", width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: 16, display: "flex",
    alignItems: "center", justifyContent: "space-between", gap: 10
  },
  deckInfo: { display: "flex", flexDirection: "column", gap: 2 },
  resetBtn: {
    background: "#f1f5f9", border: "none", borderRadius: 10, padding: "8px 14px",
    fontSize: 13, fontWeight: 800, color: "#7c3aed", cursor: "pointer", fontFamily: "'Nunito',sans-serif",
    whiteSpace: "nowrap"
  },
  section: {
    background: "white", borderRadius: 18, padding: "16px 18px", width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)", marginBottom: 12
  },
  sectionLabel: { fontWeight: 900, fontSize: 13, color: "#94a3b8", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  optRow: { display: "flex", gap: 8 },
  optBtn: {
    flex: 1, border: "none", borderRadius: 14, padding: "12px 6px", display: "flex",
    flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer",
    fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 15, transition: "all .2s"
  },
  optBtnSq: {
    flex: 1, border: "none", borderRadius: 12, padding: "11px 4px", fontSize: 14,
    fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito',sans-serif", transition: "all .2s"
  },
  // game
  gamePage: { minHeight: "100vh", padding: "18px 16px 22px", display: "flex", flexDirection: "column" },
  hdr: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  pill: (bg, col) => ({
    background: bg, borderRadius: 50, padding: "7px 14px", fontWeight: 900,
    fontSize: 15, color: col, minWidth: 62, textAlign: "center"
  }),
  badge: { display: "inline-block", borderRadius: 50, padding: "5px 14px", fontSize: 13, fontWeight: 800, color: "white" },
  stack: { flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  ghost2: {
    position: "absolute", left: 0, right: 0, height: "88%", background: "rgba(148,163,184,0.22)",
    borderRadius: 30, transformOrigin: "bottom center"
  },
  card: {
    position: "relative", zIndex: 3, width: "100%", borderRadius: 30, padding: "36px 24px 28px",
    boxShadow: "0 18px 52px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column",
    alignItems: "center", gap: 12, userSelect: "none"
  },
  cardCounter: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700 },
  cardWord: {
    fontSize: 54, fontWeight: 900, color: "white", letterSpacing: 5,
    textShadow: "0 3px 14px rgba(0,0,0,0.18)", textAlign: "center", lineHeight: 1.25
  },
  hint: { display: "flex", gap: 14, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700 },
  progBg: { height: 5, background: "rgba(0,0,0,0.08)", borderRadius: 99, overflow: "hidden", marginBottom: 16 },
  progFill: { height: "100%", borderRadius: 99, transition: "width .4s" },
  actions: { display: "flex", gap: 12, marginBottom: 8 },
  skipBig: {
    flex: 1, background: "white", border: "3px solid #fed7aa", borderRadius: 20,
    padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
    fontSize: 14, fontWeight: 900, color: "#ea580c", cursor: "pointer",
    fontFamily: "'Nunito',sans-serif", boxShadow: "0 4px 14px rgba(234,88,12,0.1)"
  },
  okBig: {
    flex: 1, background: "linear-gradient(135deg,#22c55e,#16a34a)", border: "none",
    borderRadius: 20, padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center",
    gap: 2, fontSize: 14, fontWeight: 900, color: "white", cursor: "pointer",
    fontFamily: "'Nunito',sans-serif", boxShadow: "0 6px 20px rgba(22,163,74,0.32)"
  },
  // result
  resCard: {
    background: "white", borderRadius: 26, padding: "24px 20px", width: "100%",
    boxShadow: "0 6px 24px rgba(0,0,0,0.08)", marginBottom: 12, textAlign: "center"
  },
  resTitle: { fontSize: 20, fontWeight: 900, color: "#1e293b", marginBottom: 6 },
  bigNum: { fontSize: 66, fontWeight: 900, color: "#7c3aed", lineHeight: 1, marginBottom: 3 },
  stats: {
    display: "flex", justifyContent: "space-around", padding: "14px 0",
    borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", marginBottom: 14
  },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3 },
  medal: {
    fontSize: 14, fontWeight: 800, color: "#7c3aed", background: "#faf5ff",
    borderRadius: 14, padding: "11px 14px"
  },
  history: {
    background: "white", borderRadius: 18, padding: "16px", width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 18
  },
  histTitle: { fontWeight: 900, fontSize: 13, color: "#64748b", marginBottom: 10 },
  tag: { fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 99, border: "1.5px solid" },
};