import type { GlyphKey, ItemCategory, ItemCode, ItemInfo, ItemSwapEntry } from '../types';

export const GLYPHS: Record<GlyphKey, string> = {
  boots: 'M5 4h6v8l8 3v4H5z',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z',
  armor: 'M8 4L4 7l2 4v9h12v-9l2-4-4-3-2 2h-4z',
  medal: 'M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 14l-2 7 5-3 5 3-2-7',
  book: 'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12',
  sword: 'M20 4L9 15M7 13l4 4M5 19l-2 2M17 4h3v3',
  spear: 'M4 20L20 4M14 4h6v6',
  orb: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9l2 2',
  staff: 'M6 20L16 10M16 3l5 5-5 5-5-5z',
  cloak: 'M8 4h8l3 16-7-3-7 3z',
  flame: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2 2 2 0-3-1-5 1-8z',
  mask: 'M5 5h14v7c0 4-3 7-7 8-4-1-7-4-7-8zM9 10v1M15 10v1',
  scythe: 'M6 20L14 5c4 0 6 3 6 6M14 5c-4 0-6 3-6 6',
  fist: 'M7 11V8a2 2 0 0 1 4 0 2 2 0 0 1 4 0 2 2 0 0 1 3 2v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-4-5z',
  leaf: 'M5 19C5 9 11 5 20 5c0 9-4 15-13 15M5 19L13 11',
};

export const ITEMS: Record<ItemCode, ItemInfo> = {
  A: { code: 'A', name: 'Khiên Thất Truyền', category: 'def', glyph: 'shield' },
  B: { code: 'B', name: 'Khiên Huyền Thoại', category: 'def', glyph: 'shield' },
  C: { code: 'C', name: 'Giáp Thống Khổ', category: 'def', glyph: 'armor' },
  D: { code: 'D', name: 'Giày Kiên Cường', category: 'ten', glyph: 'boots' },
  E: { code: 'E', name: 'Giáp Gaia', category: 'mr', glyph: 'leaf' },
  F: { code: 'F', name: 'Huân Chương Troy', category: 'mr', glyph: 'medal' },
  G: { code: 'G', name: 'Quả Cầu Băng Sương', category: 'oth', glyph: 'orb' },
  H: { code: 'H', name: 'Sách/Đao Truy Hồn', category: 'heal', glyph: 'book' },
  I: { code: 'I', name: 'Trượng Băng', category: 'oth', glyph: 'staff' },
  J: { code: 'J', name: 'Áo Choàng Băng Giá', category: 'oth', glyph: 'cloak' },
  K: { code: 'K', name: 'Thương Khung Kiếm', category: 'oth', glyph: 'sword' },
  L: { code: 'L', name: 'Liệt Hỏa/Đại Địa Hồi Huyết', category: 'oth', glyph: 'flame' },
  M: { code: 'M', name: 'Liệt Hỏa/Đại Địa Ma Nhãn', category: 'oth', glyph: 'flame' },
  N: { code: 'N', name: 'Liệt Hỏa/Đại Địa Mở Trói', category: 'oth', glyph: 'flame' },
  O: { code: 'O', name: 'Thương Xuyên Phá', category: 'pen', glyph: 'spear' },
  P: { code: 'P', name: 'Thương Longinus', category: 'pen', glyph: 'spear' },
  Q: { code: 'Q', name: 'Kiếm Muramasa', category: 'pen', glyph: 'sword' },
  R: { code: 'R', name: 'Kiếm Fafnir', category: 'oth', glyph: 'sword' },
  S: { code: 'S', name: 'Mặt Nạ Berith', category: 'oth', glyph: 'mask' },
  T: { code: 'T', name: 'Giáp Hộ Mệnh', category: 'def', glyph: 'shield' },
  U: { code: 'U', name: 'Liềm Đoạt Mệnh', category: 'oth', glyph: 'scythe' },
  V: { code: 'V', name: 'Hercule Thịnh Nộ', category: 'oth', glyph: 'fist' },
  W: { code: 'W', name: 'Phức Hợp Kiếm', category: 'oth', glyph: 'sword' },
};

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  ten: 'Kháng hiệu ứng',
  def: 'Giáp vật lý',
  mr: 'Giáp phép',
  heal: 'Chống hồi máu',
  pen: 'Xuyên giáp',
  oth: 'Khác',
};

export const CATEGORY_LEGEND: { category: ItemCategory; title: string; description: string }[] = [
  {
    category: 'ten',
    title: 'Kháng hiệu ứng',
    description: 'Giày Kiên Cường giảm thời gian bị choáng và làm chậm từ tướng khống chế.',
  },
  {
    category: 'def',
    title: 'Giáp vật lý',
    description: 'Khiên và Giáp giảm sát thương bùng nổ từ sát thủ và xạ thủ.',
  },
  {
    category: 'mr',
    title: 'Giáp phép',
    description: 'Giáp Gaia và Huân Chương Troy giảm sát thương phép.',
  },
  {
    category: 'heal',
    title: 'Chống hồi máu',
    description: 'Sách/Đao Truy Hồn giảm lượng hồi máu của tướng trâu máu.',
  },
  {
    category: 'pen',
    title: 'Xuyên giáp',
    description: 'Xuyên Phá, Longinus, Muramasa giúp phá tướng đỡ đòn.',
  },
  {
    category: 'oth',
    title: 'Khác',
    description: 'Trang bị băng, Berith, Hồi Huyết và các lựa chọn hỗ trợ khác.',
  },
];

export const ITEM_SWAP_ROWS: ItemSwapEntry[] = [
  {
    situation: 'Sát thủ địch quá xanh, dễ bị dồn sát thương',
    items: [
      { name: 'Giáp Hộ Mệnh', category: 'def' },
      { name: 'Khiên Thất Truyền', category: 'def' },
    ],
    note: 'Sforum: lên đồ chống sốc sát thương sớm. Ví dụ Tel’Annas đổi Giày Du Mục thành Giày Hộ Vệ cùng Giáp Hiệp Sĩ, rồi bán Giáp Hiệp Sĩ sau phút 10 khi đã có đồ công. Shopee Blog nêu Giáp Hộ Mệnh cho Moren khi gặp nhiều sát thủ.',
  },
  {
    situation: 'Địch nhiều khống chế',
    items: [{ name: 'Giày Kiên Cường', category: 'ten' }],
    note: 'Finhay: tăng 35% kháng hiệu ứng, giúp giảm thời gian choáng và làm chậm.',
  },
  {
    situation: 'Địch có tướng hồi máu mạnh (Taara, Amily, Veres, Lữ Bố)',
    items: [{ name: 'Sách/Đao Truy Hồn', category: 'heal' }],
    note: 'BlueStacks: pháp sư nên lên sách ở slot thứ 2 hoặc 3.',
  },
  {
    situation: 'Địch nhiều sát thương phép',
    items: [
      { name: 'Giáp Gaia', category: 'mr' },
      { name: 'Huân Chương Troy', category: 'mr' },
    ],
    note: 'Gợi ý của mình, dựa trên bảng khắc chế.',
  },
  {
    situation: 'Địch nhiều tướng đỡ đòn dày máu',
    items: [
      { name: 'Thương Xuyên Phá', category: 'pen' },
      { name: 'Thương Longinus', category: 'pen' },
      { name: 'Kiếm Muramasa', category: 'pen' },
    ],
    note: 'Gợi ý của mình, dựa trên bảng khắc chế.',
  },
  {
    situation: 'Đang thua vàng',
    items: [],
    note: 'Sforum: đừng vội món đắt như Nanh Fenrir, hãy lên đồ rẻ trước khi full đồ.',
  },
];

