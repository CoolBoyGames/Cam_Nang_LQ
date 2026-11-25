import type { BanEntry, GuideCard, PageId, PickSuggestion } from '../types';

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'heroes', label: 'Tướng' },
  { id: 'items', label: 'Trang bị' },
  { id: 'banpick', label: 'Cấm chọn' },
  { id: 'laning', label: 'Đi đường và giao tranh' },
  { id: 'skills', label: 'Kỹ năng chung' },
  { id: 'table', label: 'Bảng khắc chế' },
  { id: 'about', label: 'Giới thiệu' },
];

export const QUICK_LINKS: { id: PageId; title: string; description: string }[] = [
  { id: 'heroes', title: 'Tra cứu tướng', description: 'Tìm tướng, xem ai khắc chế và nên lên đồ gì.' },
  { id: 'items', title: 'Trang bị', description: 'Từng món đồ dùng để khắc chế những tướng nào.' },
  { id: 'laning', title: 'Đi đường và giao tranh tổng', description: 'Mẹo farm, giành mục tiêu và phối hợp khi giao tranh.' },
  { id: 'skills', title: 'Kỹ năng chung', description: 'Đọc map, ping và đổi trang bị theo tình huống.' },
  { id: 'banpick', title: 'Cấm chọn', description: 'Gợi ý cấm, chọn trước và chọn sau theo đội hình địch.' },
  { id: 'table', title: 'Bảng khắc chế', description: 'Toàn bộ cặp khắc chế trong một bảng.' },
  { id: 'about', title: 'Giới thiệu', description: 'Nguồn dữ liệu, lưu ý và phím tắt.' },
];

export const BAN_LIST: BanEntry[] = [
  {
    hero: 'Elsu',
    role: 'Xạ thủ',
    banRate: 71.21,
    note: 'Bắn rất đau khi về tay địch; nhiều người cũng cấm vì sợ đồng đội chọn nhầm.',
  },
  {
    hero: 'Zata',
    role: 'Pháp sư giữa',
    banRate: 66.59,
    note: 'Sau chỉnh sửa dễ kích hoạt Thiên Dực và gây nhiều sát thương diện rộng.',
  },
  {
    hero: 'Aya',
    role: 'Trợ thủ',
    banRate: 54.17,
    note: 'Bảo kê xạ thủ rất tốt, nhưng tỉ lệ thắng chỉ 48,44% và phụ thuộc xạ thủ cơ động.',
  },
  {
    hero: 'Taara',
    role: 'Đấu sĩ đường trên',
    banRate: 37.12,
    note: 'Trâu, đau và hồi máu liên tục; lần đầu lọt top tướng bị cấm.',
  },
  {
    hero: 'Sinestrea',
    role: 'Sát thủ rừng',
    banRate: 11.76,
    note: 'Tỉ lệ cấm cao nhất trong nhóm sát thủ.',
  },
];

export const FIRST_PICKS: PickSuggestion[] = [
  { hero: 'Moren', reason: 'Được làm lại ở mùa S1 2026, tự bảo vệ tốt và gây sát thương duy trì.', tag: 'Meta S1 2026' },
  { hero: 'Yue', reason: 'Cấu rỉa an toàn từ xa, đồ phép được tăng sức mạnh.', tag: 'Meta S1 2026' },
  { hero: 'Volkath', reason: 'Mạnh hơn sau khi sửa lỗi.', tag: 'Meta S1 2026' },
  { hero: 'Teeri', reason: 'Lên mạnh khi đủ đồ, nổi bật trong giao tranh tổng.', tag: 'Meta S1 2026' },
  { hero: 'Lauriel', reason: 'Hồi máu theo từng chiêu nên khó bị dồn sát thương.', tag: 'Meta S1 2026' },
  { hero: 'Tachi', reason: 'Linh hoạt, cần ít nhất 3 món sát thương.', tag: 'Đa năng 2025' },
  { hero: 'Heino', reason: 'Lối chơi đơn giản, an toàn trong nhiều thế trận.', tag: 'Đa năng 2025' },
  { hero: 'Fennik', reason: 'Dọn quái nhanh, kiểm soát mục tiêu lớn và bản đồ tốt.', tag: 'Đa năng 2025' },
  { hero: 'Maloch', reason: 'Sát thương diện rộng và chống chịu tốt.', tag: 'Đa năng 2025' },
  { hero: 'Tulen', reason: 'Sát thương nhanh, cấu rỉa và truy đuổi hiệu quả.', tag: 'Đa năng 2025' },
  { hero: 'Marja', reason: 'Chơi tốt ở 3 đến 4 vị trí khác nhau.', tag: 'Đa năng 2025' },
];

export const HIDDEN_PICKS: PickSuggestion[] = [
  { hero: 'Valhein', reason: 'Dễ bị bắt bài; chỉ nên chọn khi địch đã lộ ít nhất 1 tướng chủ lực.', tag: 'Giấu bài' },
  { hero: 'Raz', reason: 'Chọn sớm dễ gặp kèo khắc chế, khó chạm được chủ lực địch.', tag: 'Giấu bài' },
  { hero: 'Zuka', reason: 'Nhiều tướng bán hành từ sớm như Yena, Ryoma, Murad, Florentino.', tag: 'Giấu bài' },
];

export const BAN_PICK_TIPS: GuideCard[] = [
  {
    title: 'Đừng cấm theo cảm tính',
    body: 'Nhiều người cấm tướng mình sợ hoặc không muốn đồng đội chọn, nên địch giữ được quân bài hợp meta. Hãy cấm có lý do.',
  },
  {
    title: 'Cấm theo bậc rank',
    body: 'Florentino bị cấm triệt để ở giải nhưng ở rank chỉ đáng sợ khi vào tay cao thủ. Valhein snowball mạnh ở giải nhưng bình thường ở rank.',
  },
  {
    title: 'Cấm tướng phụ thuộc cộng sự',
    body: 'Aya mạnh khi đi cùng xạ thủ cơ động, nhưng yếu khi đi cùng xạ thủ kém cơ động như Yorn hay Tel’Annas.',
  },
  {
    title: 'Giấu bài khi có thể',
    body: 'Tướng dễ bị khắc chế nên chọn sau. Nếu buộc phải chọn đầu, hãy chọn tướng đa năng hoặc ít bị bắt bài.',
  },
  {
    title: 'Nhìn cả đội hình, không chỉ 1 đấu 1',
    body: 'Liên Quân là game 5 đấu 5. Hãy cân nhắc phối hợp đội hình, kiểm soát bản đồ và thời gian hồi chiêu của địch.',
  },
  {
    title: 'Có phương án dự phòng',
    body: 'Tướng hay bị cấm có thể mất bất cứ lúc nào. Chuẩn bị ít nhất một lựa chọn thay thế cùng vị trí.',
  },
];

export const LANING_TIPS: GuideCard[] = [
  {
    title: 'Last hit lính',
    body: 'Thanh máu lính chuyển trắng khi có thể kết liễu bằng một đòn. Last hit mọi thứ để có đủ vàng lên đồ mạnh trước các pha giao tranh.',
    source: 'Hoàng Hà Mobile',
  },
  {
    title: 'Farm chung ở đầu game',
    body: 'Rừng ra đường farm cùng đồng đội để chia tài nguyên. Đường giữa hoặc Tà Thần cũng có thể farm cùng rừng, tạo lợi thế kinh tế sớm.',
    source: 'Sforum, Hoàng Hà Mobile',
  },
  {
    title: 'Giành mọi mục tiêu nhỏ',
    body: 'Chim, cua, linh thú thủ vệ và quái rừng địch. Ăn đủ các mục tiêu này giúp 4/5 đồng đội lên cấp 4 sớm, tranh chấp thuận lợi hơn.',
    source: 'Sforum',
  },
  {
    title: 'Tướng yếu đầu game thì farm thấp',
    body: 'Lauriel hay Liliana máu giấy, kém cơ động và chưa có chiêu cuối ở đầu trận. Hãy farm thấp, an toàn rồi lên đủ đồ.',
    source: 'Shopee Blog, huongdanlienquan.org',
  },
  {
    title: 'Đi giữa là đảo đường',
    body: 'Dọn lính nhanh rồi đảo đường gank hai cánh thay vì ôm trụ. Nếu núp bụi mà địch không sập bẫy, quay về farm thêm lính và quái gần đường.',
    source: 'Finhay, BlueStacks',
  },
  {
    title: 'Xạ thủ farm an toàn',
    body: 'Xạ thủ là nguồn sát thương chính giữa và cuối trận nên ưu tiên farm an toàn. Sống đến cuối giao tranh gây nhiều sát thương hơn lao lên sớm rồi chết.',
    source: 'FPT Shop',
  },
  {
    title: 'Khi đang thua vàng',
    body: 'Mid feed nhiều thì đừng đi lẻ, hãy đi theo đội và kéo late. Solo Tà Thần thua vàng nên lên đồ rẻ cấp 2 hoặc 3 trước, đừng vội món đắt như Nanh Fenrir.',
    source: 'Sforum',
  },
];

export const TEAMFIGHT_TIPS: GuideCard[] = [
  {
    title: 'Chọn mục tiêu chủ lực',
    body: 'Pháp sư giữa tung combo để cấu rỉa hoặc kết liễu xạ thủ, sát thủ địch, mở đường cho đồng đội càn quét.',
    source: 'Shopee Blog',
  },
  {
    title: 'Theo sát xạ thủ và dùng khống chế',
    body: 'Giữa trận xạ thủ là mục tiêu của sát thủ địch. Đồng đội nên bám theo xạ thủ trong giao tranh nhỏ và dùng khống chế để tạo lợi thế.',
    source: 'huongdanlienquan.org',
  },
  {
    title: 'Tìm góc vào đúng lúc',
    body: 'Tướng như Lauriel cần đủ đồ giảm hồi chiêu rồi tìm góc vào giao tranh để tung liên tục nhiều chiêu.',
    source: 'huongdanlienquan.org',
  },
  {
    title: 'Pháp sư cấu rỉa và khống chế',
    body: 'Shopee Blog xếp nhóm pháp sư cấu rỉa và khống chế vào nhóm hợp giao tranh tổng.',
    source: 'Shopee Blog',
  },
  {
    title: 'Tranh Rồng và Caesar bằng thông tin',
    body: 'Đọc map tốt giúp đội kiểm soát Rồng và Caesar tốt hơn. Xem trang Kỹ năng chung.',
    source: 'FPT Shop',
  },
  {
    title: 'Checklist trước khi vào giao tranh',
    body: 'Cả đội cùng có mặt, chiêu chính đã hồi và đã thống nhất mục tiêu đầu tiên. Nếu thiếu một trong ba, hãy lùi và chờ.',
    source: 'Gợi ý của mình',
  },
];

export const MAP_TIPS: GuideCard[] = [
  {
    title: 'Nhìn minimap đều đặn',
    body: 'Quan sát minimap ở góc trên bên trái để biết đồng minh đang ở đâu và tướng địch nào bị lộ. Thói quen nhìn lại sau mỗi 3 đến 5 giây, kể cả khi farm hay giao tranh, được khuyến nghị.',
    source: 'Thế Giới Di Động, FPT Shop',
  },
  {
    title: 'Địch biến mất là manh mối',
    body: 'Địch rời khỏi tầm nhìn tạo ra khoảng trống thông tin. Ghi nhớ hướng họ đi để đoán đường nào sắp bị gank hoặc mục tiêu nào đang bị ăn.',
    source: 'FPT Shop',
  },
  {
    title: 'Theo dõi hướng đi của rừng',
    body: 'Dự đoán hướng di chuyển của rừng, kể cả giữa và đường trên của địch, rồi ping cho đồng đội và lùi về thấp.',
    source: 'Sforum, FPT Shop',
  },
  {
    title: 'Cảnh giác lối chơi bất thường',
    body: 'Lối chơi bất thường của địch có thể là bẫy gank, hãy thận trọng.',
    source: 'FPT Shop',
  },
  {
    title: 'Nhớ đặc điểm tướng địch',
    body: 'Mỗi tướng có kiểu di chuyển và gank riêng, từ đó đoán vị trí khi họ ẩn mình.',
    source: 'FPT Shop',
  },
  {
    title: 'Theo mục tiêu trên bản đồ',
    body: 'Mục tiêu lớn biến mất nghĩa là địch đang ăn. Bấm vào mục tiêu trên minimap để xem thời gian xuất hiện lại.',
    source: 'FPT Shop, Sforum',
  },
  {
    title: 'Sai lầm hay gặp',
    body: 'Chỉ nhìn map khi đã bị gank, hoặc chỉ dán mắt vào map mà quên diễn biến trên đường.',
    source: 'FPT Shop',
  },
  {
    title: 'Tướng soi map',
    body: 'Lindis soi map không cần mắt. Max có Radar Đạn Đạo quét toàn bản đồ và ngắt quá trình biến về. Ilumia cũng được nhắc là tướng hack map.',
    source: 'Hoàng Hà Mobile, Sforum',
  },
];

export const PING_TIPS: GuideCard[] = [
  {
    title: 'Dùng ping đúng cách',
    body: 'Mở minimap và chạm vào khu vực cần đánh dấu. Giữ ngón tay rồi lướt: lên là đang đến, trái là kẻ địch biến mất, phải là nguy hiểm.',
    source: 'Thế Giới Di Động',
  },
  {
    title: 'Báo ngay khi địch biến mất',
    body: 'Cảnh báo sớm giúp đồng đội lùi kịp thay vì chờ bị gank.',
    source: 'FPT Shop',
  },
];

