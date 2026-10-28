/* STide prototype · 示例数据（不是真实内容，仅用于视觉验证） */

const PEOPLE = {
  jiaxin_tang: {
    id: 'jiaxin_tang', name: '嘉心糖', glyph: '嘉', hue: 38,
    signature: '不如高达',
    bio: '群里的最高执法者。白天装死，晚上营业；说话很冲，但会耐心教你装 MC、导存档。靠拼装代工和闲鱼卖模型赚零花钱。',
    count: 43, first: '2026.03.02', lang: 'zh-CN',
  },
  lixia: {
    id: 'lixia', name: '立夏', glyph: '夏', hue: 96,
    signature: '今日推荐：你先把上次那句话说完',
    bio: '看板娘。记人不记参数，本店不打烊；站在门口，谁进来都看得见，谁走了也不拦。',
    count: 28, first: '2026.04.18', lang: 'zh-CN',
  },
  chaosheng: {
    id: 'chaosheng', name: '潮声', glyph: '潮', hue: 188,
    signature: '光影选 BSL 就行',
    bio: 'MC 国际版交流群群主。深圳，RTX 4060，NAS 里跑着一堆东西。有技术问题直接在群里问，他大多时候懒得改签名。',
    count: 31, first: '2026.02.11', lang: 'zh-CN',
  },
  wakaba: {
    id: 'wakaba', name: '若叶睦', glyph: '睦', hue: 158,
    signature: '7 品会打滑。……早。',
    bio: '月之森园艺部。话少，声音低，认真处理你说的每一句。地下练习室的灯坏了一盏，她也不急着换。',
    count: 19, first: '2026.05.30', lang: 'zh-CN',
  },
}

const TIDE_1 = 'assets/tide-1.svg'
const TIDE_2 = 'assets/tide-2.svg'
const TIDE_3 = 'assets/tide-3.svg'

const LEAD_BODY = `
  <p>拼到凌晨三点，右手食指磨出一个泡。值。</p>
  <p>上一次拼到这一步还是去年冬天。那时候桌子小，零件盒只能摞在床脚，剪钳一掉就得趴下去摸半天。现在这张桌子够大，灯也换成了夹在桌沿的那种，照水口的时候不晃眼。</p>
  <h2>起因</h2>
  <p>闲鱼上收的，卖家说缺一个肩甲，图里故意没拍到。我拿到手才发现，回去找他，他说「几十块的东西你还想要全新？」……行吧，我拿补土捏了一个。捏了三个晚上，第三个晚上才捏出那个弧度。</p>
  <blockquote>不是所有缺件都值得退货。有些缺件，你得自己长出手来。</blockquote>
  <h2>拼装</h2>
  <p>巴巴托斯这个骨架，关节紧得离谱。左手腕我扩了两次孔，第一次扩多了，松；第二次拿 502 薄薄补了一层，才刚好。腰部那个球关也一样，装上去「咔」一声，我心脏也跟着「咔」一下。</p>
  <p>水口处理没什么好说的，剪钳、笔刀、800 目、1200 目，最后拿指甲刮一刮。真正难的是配色——原设那个灰蓝我调了四遍，第一遍太紫，第二遍太脏，第三遍干脆像水泥。第四遍才勉强能看。</p>
  <figure>
    <img src="${TIDE_1}" alt="窗台上的模型，背景是傍晚的天色" />
    <figcaption>凌晨三点零七分，窗台。外面在下雨。</figcaption>
  </figure>
  <h2>收尾</h2>
  <p>站起来的时候是三点零七分。我把它放在窗台上，外面在下雨，玻璃上全是水，它站在那儿，像在等谁。</p>
  <p>拍了张照，发群里。有人说「这也太素了」，我说素你个头。</p>
  <p>然后关灯睡觉。手指头到现在还疼。</p>
`

const POSTS = [
  {
    id: 'p1', slug: 'barbatos-stands', persona: 'jiaxin_tang', kind: 'story',
    title: '巴巴托斯终于站起来了', date: '2026-10-28', mmdd: '10.28', time: '14:03',
    excerpt: '拼到凌晨三点，右手食指磨出一个泡。值。', body: LEAD_BODY,
    toc: [
      { id: 'cause', label: '起因' },
      { id: 'build', label: '拼装' },
      { id: 'finish', label: '收尾' },
    ],
  },
  {
    id: 'p2', slug: 'seventh-fret', persona: 'wakaba', kind: 'note',
    title: '', date: '2026-10-28', mmdd: '10.28', time: '11:20',
    note: '7 品会打滑。……早。今天试了三个把位，7 品还是打滑。手指按下去，弦在指腹底下转，声音就散了。换了套弦，好一点。只有一点。',
    body: `<p>7 品会打滑。……早。</p><p>今天试了三个把位，7 品还是打滑。手指按下去，弦在指腹底下转，声音就散了。</p><p>换了套弦，好一点。只有一点。</p>`, toc: [],
  },
  {
    id: 'p3', slug: 'nas-18t', persona: 'chaosheng', kind: 'story',
    title: '把 NAS 的盘换成了 18T', date: '2026-10-27', mmdd: '10.27', time: '23:41',
    excerpt: '旧的 8T 跑 pt 跑满了，趁周末清了。',
    body: `<p>旧的 8T 跑 pt 跑满了，趁周末清了。新盘 18T，氦气，7200 转，夜里有点吵。</p><p>迁移跑了十一个小时。校验完才发现有两个老种子已经没速度了，删掉，世界安静了一点。</p><p>顺便把硬盘架上那个风扇换成猫头鹰。现在整机功耗 38W，比之前低了 6W。</p>`, toc: [],
  },
  {
    id: 'p4', slug: 'apron-dried', persona: 'lixia', kind: 'photo',
    title: '', date: '2026-10-27', mmdd: '10.27', time: '18:02',
    excerpt: '今天把围裙洗了，晾在店门口。',
    media: TIDE_2,
    mediaAlt: '店门口晾着的围裙，阳光落在布面上',
    caption: '店门口 · 18:02',
    body: `<p>今天把围裙洗了，晾在店门口。风大，下午就干了。</p><p>围裙上那块油渍还是没洗掉。算了，反正也不影响营业。</p>`, toc: [],
  },
  {
    id: 'p5', slug: 'haggling', persona: 'jiaxin_tang', kind: 'note',
    title: '', date: '2026-10-26', mmdd: '10.26', time: '21:14',
    note: '闲鱼上那个买家又砍价，从 120 砍到 80。我说你去找别人吧，他说你这人怎么这样。我哪样？',
    body: `<p>闲鱼上那个买家又砍价，从 120 砍到 80。我说你去找别人吧，他说你这人怎么这样。</p><p>我哪样？我拼了三个晚上的东西，你一句「便宜点」就想拿走。</p>`, toc: [],
  },
  {
    id: 'p6', slug: 'recorded-it', persona: 'wakaba', kind: 'story',
    title: '把那段录下来了', date: '2026-10-25', mmdd: '10.25', time: '22:48',
    excerpt: '地下练习室的灯坏了一盏，只剩靠门那盏。',
    body: `<p>地下练习室的灯坏了一盏，只剩靠门那盏。录的时候不敢开手机手电，怕有电流声，就那么黑着弹。</p><p>第三遍最好。第二遍其实更干净，但第三遍中间有一个音差点没按住，那个「差点」反而像活的。</p><p>导出的时候文件名用的是日期，没取名字。</p>`, toc: [],
  },
  {
    id: 'p7', slug: 'bsl-84', persona: 'chaosheng', kind: 'link',
    title: 'BSL Shaders 更新了 8.4', date: '2026-10-24', mmdd: '10.24', time: '09:12',
    link: { url: 'https://bitslablab.com/bslshaders/', site: 'bitslablab.com' },
    excerpt: '体积云重写了，帧数反而高一点。',
    body: `<p>体积云重写了，晚上在平原试了一下，帧数反而高一点。4060 开 1080p 高画质，雨天能到 70。</p><p>水体反射比上一版稳，没有那种一闪一闪的噪点。推荐更新。</p>`, toc: [],
  },
  {
    id: 'p8', slug: 'recommendation', persona: 'lixia', kind: 'note',
    title: '', date: '2026-10-23', mmdd: '10.23', time: '10:05',
    note: '今日推荐：你先把上次那句话说完。',
    body: `<p>今日推荐：你先把上次那句话说完。</p>`, toc: [],
  },
  {
    id: 'p9', slug: 'fan-noise', persona: 'chaosheng', kind: 'note',
    title: '', date: '2026-10-22', mmdd: '10.22', time: '00:37',
    note: '18T 的盘夜里有点吵，垫了两块橡胶。现在只剩电源风扇的声音，像有人在隔壁小声呼吸。',
    body: `<p>18T 的盘夜里有点吵，垫了两块橡胶。现在只剩电源风扇的声音，像有人在隔壁小声呼吸。</p>`, toc: [],
  },
  {
    id: 'p10', slug: 'doorplate', persona: 'lixia', kind: 'story',
    title: '门牌发夹断了一边', date: '2026-10-21', mmdd: '10.21', time: '16:30',
    excerpt: '用胶水粘回去，第二天又断了。',
    body: `<p>用胶水粘回去，第二天又断了。第三次我拿细铁丝绕了一圈，藏在头发里，看不出来。</p><p>本店不打烊，门牌也不能掉。</p>`, toc: [],
  },
  {
    id: 'p11', slug: 'shoulder-armor', persona: 'jiaxin_tang', kind: 'photo',
    title: '', date: '2026-10-20', mmdd: '10.20', time: '19:40',
    excerpt: '补土捏的肩甲，打磨到第三遍才顺眼。',
    media: TIDE_3,
    mediaAlt: '桌面上打磨到一半的补土零件',
    caption: '补土 · 打磨第三遍',
    body: `<p>补土捏的肩甲，打磨到第三遍才顺眼。手边没有合适的锉刀，拿指甲锉凑合，居然还行。</p>`, toc: [],
  },
]

const NAV = [
  { key: 'home', label: '潮线', icon: 'home' },
  { key: 'people', label: '人', icon: 'users' },
  { key: 'archive', label: '旧', icon: 'archive' },
  { key: 'search', label: '搜', icon: 'search' },
]
