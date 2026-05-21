"use client";

import Link from "next/link";
import { BAGUA } from "@/lib/design-system";
import { BaguaWheel } from "@/components/bagua-decorations";
import { CopyButton } from "@/components/copy-button";

// 山海经异兽数据 - GPT Image 2 提示词 · 大荒经
const CREATURES = [
  {
    id: "kui-niu",
    name: "夔牛",
    source: "《山海经·大荒东经》",
    rawText: "东海中有流波山，入海七千里。其上有兽，状如牛，苍身而无角，一足，出入水则必有风雨，其光如日月，其声如雷，其名曰夔。黄帝得之，以其皮为鼓，橛以雷兽之骨，声闻五百里，以威天下。",
    promptZh: "生成一张山海经夔牛插图，独脚青灰色神牛站在雷雨交加的东海之中，雷电交加的氛围，独脚站立的姿态，单眼如烈日般炽烈燃烧，周身风雨大作，青铜器纹饰风格，远景海浪翻涌，肃穆而震撼的中国神话氛围",
    promptEn: "A mythical Chinese beast Kui Niu, ancient bronze ritual vessel art style, single-legged blue-grey bull standing in a thunderstorm sea, its body glowing like moonlight, lightning and rain surrounding it, one cyclopean eye blazing like the sun, dramatic silhouette, dark stormy ocean backdrop, ancient Chinese mythological creature, bronze mask aesthetic, visceral powerful presence, no text, no watermark",
    tags: ["大荒东经", "神兽", "雷兽"],
    bagua: "gen" as const,
  },
  {
    id: "ying-long",
    name: "应龙",
    source: "《山海经·大荒东经》",
    rawText: "应龙处南极，杀蚩尤与夸父，不得复上。故下数旱，旱而为应龙之状，乃得大雨。",
    promptZh: "生成一张山海经应龙插图，金色神龙展开巨大双翅斩杀魔神，蚩尤与夸父败退于脚下，风云变色，电闪雷鸣，天界与凡间交汇之处，应龙身上散发金色光芒与雷霆之力，中国上古战争神话场景。",
    promptEn: "A divine Chinese dragon Ying Long, ancient Shan Hai Jing illustration, golden divine dragon with enormous spread wings battling Chi You and Kua Fu, lightning and storm surrounding the scene, divine golden light emanating from the dragon, mythological war scene between gods and giants, dramatic Wu Xia cinematic atmosphere, dark thunder clouds with golden divine rays, powerful heroic pose, Chinese mythological art, no text, no watermark",
    tags: ["大荒东经", "神龙", "战神"],
    bagua: "zhen" as const,
  },
  {
    id: "she-bi",
    name: "奢比",
    source: "《山海经·大荒东经》",
    rawText: "大荒东有神人面犬耳，珥两青蛇，名曰奢比。",
    promptZh: "生成一张山海经奢比尸神插图，人面犬耳的神灵耳朵上挂着两条游动的青蛇，在云雾缭绕的大荒之野驻足，青蛇吐信，犬耳耸立，中国上古荒野神灵。",
    promptEn: "A divine Chinese spirit She Bi, Shan Hai Jing illustration, deity with human face and dog ears wearing two living green snakes on each ear, standing in misty wilderness of the Great Wasteland, snakes flickering tongues, dog ears perked up alert, ancient Chinese wilderness deity, mysterious fog atmosphere, no text, no watermark",
    tags: ["大荒东经", "神祇", "荒野"],
    bagua: "xun" as const,
  },
  {
    id: "zhu-long",
    name: "烛龙",
    source: "《山海经·大荒北经》",
    rawText: "西北海之外，赤水之北，有章尾山。有神，人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息，风雨是谒。是烛九阴，是烛龙。",
    promptZh: "生成一张山海经烛龙插图，巨大的红色人面蛇身神占据画面中央，烛龙的眼睛睁闭之间控制昼夜交替，通体散发着日月般的光芒，周围风雨环绕，背景是幽暗神秘的山海世界，水墨古风，武侠电影般的史诗氛围。",
    promptEn: "A legendary Chinese fire deity Zhu Long, ancient ink wash painting style, a massive red humanoid face atop an enormous serpent body stretching across the landscape, eyes closed for night and open for day, glowing like the sun and moon, surrounded by swirling mist and wind, dramatic Wu Xia cinematic atmosphere, dark mystical background with red and gold accents, intricate scales, powerful divine presence, Chinese mythological art, detailed texture, no text, no watermark",
    tags: ["大荒北经", "神祇", "昼夜"],
    bagua: "kan" as const,
  },
  {
    id: "kua-fu",
    name: "夸父",
    source: "《山海经·大荒北经》",
    rawText: "夸父与日逐走，入日，渴欲得饮。饮于河渭，河渭不足，北饮大泽。未至，道渴而死。弃其杖，化为邓林。",
    promptZh: "生成一张山海经夸父逐日插图，巨人夸父在夕阳下狂奔追赶太阳，黄河渭河的水被他一饮而尽，巨大的身躯在山峦间奔跑，手杖化为桃林在身后盛开，中国上古悲剧英雄神话。",
    promptEn: "A giant Chinese hero Kua Fu chasing the sun, Shan Hai Jing illustration, colossal figure running across mountains chasing the setting sun, drinking the Yellow River and Wei River in massive gulps, body casting enormous shadow, walking stick transforming into blossoming peach grove behind, ancient Chinese tragic hero myth, warm sunset dramatic atmosphere, no text, no watermark",
    tags: ["大荒北经", "巨人", "逐日"],
    bagua: "gen" as const,
  },
  {
    id: "xiang-liu",
    name: "相柳",
    source: "《山海经·大荒北经》",
    rawText: "共工臣名曰相繇，九首蛇身，自环食于九土。",
    promptZh: "生成一张山海经相柳插图，九个人面巨蛇身的恐怖凶神盘踞在中原大地，九个人面表情各异，九个脑袋同时吞噬万物，所到之处化为沼泽毒池，九张嘴同时喷出黑色的污秽之物，中国上古水神恶臣。",
    promptEn: "A terrifying nine-headed Chinese monster Xiang Liu, Shan Hai Jing illustration, nine human-faced serpent bodies coiling across the central plains, nine heads devouring everything simultaneously, wherever it goes turning into poisonous swamps, nine mouths spitting black filth together, ancient Chinese water god's evil minister, dark grim atmosphere, no text, no watermark",
    tags: ["大荒北经", "凶兽", "水神"],
    bagua: "qian" as const,
  },
  {
    id: "chi-you",
    name: "蚩尤",
    source: "《山海经·大荒北经》",
    rawText: "蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。",
    promptZh: "生成一张山海经蚩尤战神插图，武冠华服的巨人战神蚩尤站在战场中央，手持巨大的战戈和战盾，身后是铜头铁额的八十一位兄弟，脚下是被击败的敌人，中国上古战争之神。",
    promptEn: "Chinese war god Chi You, Shan Hai Jing illustration, battle-crowned warrior giant standing at center of battlefield, holding massive halberd and shield, eighty-one copper-headed brothers behind, defeated enemies at feet, ancient Chinese god of war, bloody battlefield atmosphere, dramatic war scene, no text, no watermark",
    tags: ["大荒北经", "神祇", "战神"],
    bagua: "qian" as const,
  },
  {
    id: "jiu-feng",
    name: "九凤",
    source: "《山海经·大荒北经》",
    rawText: "大荒之中，有神，九首人面鸟身，名曰九凤。",
    promptZh: "生成一张山海经九凤插图，九个人面的神凤展开巨大的九翼在九天之上翱翔，羽色五彩祥瑞，每个凤头神态各异——有吟唱有长鸣有低语，九道神光从翅膀散开，中国上古九头神凤。",
    promptEn: "A divine nine-headed Chinese phoenix Jiu Feng, Shan Hai Jing illustration, nine human-faced divine phoenixes spreading nine enormous wings across the heavens, five-colored iridescent plumage, each phoenix head with different expression—some singing, some crying, some whispering, nine divine light rays radiating from wings, ancient Chinese nine-headed sacred bird, celestial grand atmosphere, no text, no watermark",
    tags: ["大荒北经", "神鸟", "九头"],
    bagua: "li" as const,
  },
  {
    id: "chang-xi",
    name: "嫦娥",
    source: "《山海经·大荒西经》",
    rawText: "帝俊妻常羲，浴月，取月精。",
    promptZh: "生成一张山海经常羲（嫦娥）插图，月中女神在银色的月宫中沐浴，月光如水银般倾泻，玉兔捣药于旁，桂树飘香，中国上古月神形象，水墨银蓝月光色调。",
    promptEn: "Chinese moon goddess Chang Xi, Shan Hai Jing illustration, divine woman bathing in silver moon palace, moonlight pouring like liquid silver, jade rabbit grinding elixir beside her, cassia tree fragrance filling the air, ancient Chinese moon deity, silver-blue moonlit palette, ethereal serene atmosphere, no text, no watermark",
    tags: ["大荒西经", "神祇", "月神"],
    bagua: "dui" as const,
  },
  {
    id: "xi-wang-mu",
    name: "西王母",
    source: "《山海经·大荒西经》",
    rawText: "玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜。",
    promptZh: "生成一张山海经西王母插图，豹尾虎齿的威严女神戴玉胜披长发端坐于昆仑瑶池旁，虎齿微露却不失慈祥，身边有三青鸟侍奉，瑶草琪花盛开，中国上古女神之祖。",
    promptEn: "Queen Mother of the West Xi Wang Mu, Shan Hai Jing illustration, majestic goddess with leopard tail and tiger fangs wearing jade crown, long disheveled hair, seated beside Kunlun Yaochi pool, slight fangs yet benevolent expression, three blue birds serving her, celestial flowers blooming around, ancient Chinese supreme goddess, grand celestial atmosphere, no text, no watermark",
    tags: ["大荒西经", "神祇", "女神"],
    bagua: "kun" as const,
  },
  {
    id: "bu-si-min",
    name: "不死民",
    source: "《山海经·大荒南经》",
    rawText: "有不死民，不死者皆面黄。",
    promptZh: "生成一张山海经不死民插图，面色金黄的不死之民在南方炎热之地劳作，房屋被奇花异草环绕，远处的灵泉泛着不死之光，周围是永不枯竭的果实，中国上古不死之民的祥和画面。",
    promptEn: "An immortal Chinese person Bu Si Min, Shan Hai Jing illustration, golden-faced immortal beings working in southern lands of eternal warmth, homes surrounded by exotic flowers and herbs, fountain of immortality glowing nearby, inexhaustible fruit trees around, serene ancient Chinese immortality scene, warm golden atmosphere, no text, no watermark",
    tags: ["大荒南经", "异人", "不死"],
    bagua: "li" as const,
  },
  {
    id: "yu-she",
    name: "育蛇",
    source: "《山海经·大荒南经》",
    rawText: "南方有育蛇，风生兽。",
    promptZh: "生成一张山海经育蛇插图，神蛇在南方丛林中盘踞，鳞片泛着温润的绿光，守护着身后的不死之树，树上有永不凋谢的花朵，中国上古南方守护神蛇。",
    promptEn: "A divine southern Chinese serpent Yu She, Shan Hai Jing illustration, sacred serpent coiling in southern jungle, warm green scales glistening, guarding an immortal tree behind with never-wilting flowers, ancient Chinese southern guardian serpent, lush jungle atmosphere, no text, no watermark",
    tags: ["大荒南经", "蛇", "南方"],
    bagua: "xun" as const,
  },
  {
    id: "ling-shan-shi-wu",
    name: "灵山十巫",
    source: "《山海经·大荒西经》",
    rawText: "灵山有十巫，咸皆升降，百药爰在。",
    promptZh: "生成一张山海经灵山十巫插图，十位巫师在灵山之巅进行祭祀仪式，各执法器，灵草仙药满山遍野，神光笼罩，与天地沟通的神秘场景，中国上古巫术文化。",
    promptEn: "Ten Chinese wizards on sacred Ling Shan mountain, Shan Hai Jing illustration, ten shamans performing ritual at the mountain summit, each holding mystical implements, divine healing herbs covering the slopes, sacred light enveloping the scene, ancient Chinese shamanic culture, misty mountain atmosphere, no text, no watermark",
    tags: ["大荒西经", "神祇", "巫术"],
    bagua: "gen" as const,
  },
  {
    id: "qi-chong",
    name: "齐虫",
    source: "《山海经·大荒北经》",
    rawText: "北方有禹虫，强不可听。",
    promptZh: "生成一张山海经齐虫插图，巨大的虫形生物在北方寒冷荒野中蠕动，身体庞大到遮蔽天日，发出人耳无法承受的低频轰鸣，北方大荒的苍茫背景，中国上古恐怖巨虫。",
    promptEn: "A monstrous insect deity Qi Chong, Shan Hai Jing illustration, enormous worm-like creature writhing in the cold northern wilderness, body so massive it blocks out the sun, emitting low-frequency droning sound that human ears cannot bear, desolate northern great wasteland backdrop, ancient Chinese terrifying mega insect, grim atmospheric tones, no text, no watermark",
    tags: ["大荒北经", "虫", "北方"],
    bagua: "kan" as const,
  },
];

function CreatureCard({ creature }: { creature: typeof CREATURES[0] }) {
  return (
    <article
      className="group rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* 头部：名称和出处 */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{BAGUA.positions[creature.bagua].symbol}</span>
          <div>
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{creature.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}>
              {creature.source}
            </span>
          </div>
        </div>
        <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {creature.rawText}
        </p>
      </div>

      {/* 标签 */}
      <div className="px-4 pt-3 flex flex-wrap gap-2">
        {creature.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded"
            style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 提示词区域 */}
      <details className="group/prompt">
        <summary
          className="flex items-center justify-between px-4 py-3 cursor-pointer list-none text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="flex items-center gap-2">
            <span style={{ opacity: 0.5 }}>{BAGUA.positions.li.symbol}</span>
            提示词
          </span>
          <span className="text-xs opacity-50 group-open/prompt:hidden block">点击展开</span>
          <span className="text-xs opacity-50 group-open/prompt:block hidden">点击收起</span>
        </summary>

        <div className="px-4 pb-4 space-y-3">
          {/* 中文提示词 */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              中文提示词
              <CopyButton text={creature.promptZh} lang="zh" />
            </p>
            <p
              className="text-sm p-3 rounded-md leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}
            >
              {creature.promptZh}
            </p>
          </div>

          {/* English Prompt */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              English Prompt
              <CopyButton text={creature.promptEn} lang="en" />
            </p>
            <p
              className="text-xs p-3 rounded-md font-mono leading-relaxed"
              style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-secondary)" }}
            >
              {creature.promptEn}
            </p>
          </div>
        </div>
      </details>
    </article>
  );
}

export default function ShanHaiJingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* 背景八卦装饰 */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 right-0">
            <BaguaWheel size={400} />
          </div>
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
          {/* 标题符号 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-3xl opacity-40">{BAGUA.positions.gen.symbol}</span>
            <span className="text-5xl">☯</span>
            <span className="text-3xl opacity-40">{BAGUA.positions.dui.symbol}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            山海经
            <span className="block text-xl md:text-2xl font-normal opacity-60 mt-2">异兽图鉴</span>
          </h1>

          <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
            《山海经》异兽与 AI 创作的融合
          </p>

          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            GPT Image 2 提示词 · 中英对照 · 点击展开复制
          </p>
        </div>
      </section>

      {/* 目录导航 */}
      <section
        className="py-4 sticky top-16 z-40 backdrop-blur-xl border-b"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 90%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <span style={{ opacity: 0.5 }}>{BAGUA.positions.kun.symbol}</span>
            <span>导航：</span>
            <Link href="#nan" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              大荒南经
            </Link>
            <span className="opacity-30">·</span>
            <Link href="#xi" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              大荒西经
            </Link>
            <span className="opacity-30">·</span>
            <Link href="#bei" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              大荒北经
            </Link>
            <span className="opacity-30">·</span>
            <Link href="#dong" className="px-2 py-1 rounded transition-colors hover:bg-[var(--bg-secondary)]">
              大荒东经
            </Link>
          </div>
        </div>
      </section>

      {/* 异兽展示 */}
      <section className="py-12 flex-1">
        <div className="max-w-[1400px] mx-auto px-6 space-y-16">
          {/* 大荒东经 */}
          <div id="dong">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.zhen.symbol}</span>
              <h2 className="text-2xl font-semibold">大荒东经</h2>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                已收录 {CREATURES.filter(c => c.tags.includes("大荒东经")).length} 种
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATURES.filter(c => c.tags.includes("大荒东经")).map((creature) => (
                <CreatureCard key={creature.id} creature={creature} />
              ))}
            </div>
          </div>

          {/* 大荒南经 */}
          <div id="nan">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.li.symbol}</span>
              <h2 className="text-2xl font-semibold">大荒南经</h2>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                已收录 {CREATURES.filter(c => c.tags.includes("大荒南经")).length} 种
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATURES.filter(c => c.tags.includes("大荒南经")).map((creature) => (
                <CreatureCard key={creature.id} creature={creature} />
              ))}
            </div>
          </div>

          {/* 大荒西经 */}
          <div id="xi">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.dui.symbol}</span>
              <h2 className="text-2xl font-semibold">大荒西经</h2>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                已收录 {CREATURES.filter(c => c.tags.includes("大荒西经")).length} 种
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATURES.filter(c => c.tags.includes("大荒西经")).map((creature) => (
                <CreatureCard key={creature.id} creature={creature} />
              ))}
            </div>
          </div>

          {/* 大荒北经 */}
          <div id="bei">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">{BAGUA.positions.qian.symbol}</span>
              <h2 className="text-2xl font-semibold">大荒北经</h2>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-muted)" }}
              >
                已收录 {CREATURES.filter(c => c.tags.includes("大荒北经")).length} 种
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CREATURES.filter(c => c.tags.includes("大荒北经")).map((creature) => (
                <CreatureCard key={creature.id} creature={creature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}