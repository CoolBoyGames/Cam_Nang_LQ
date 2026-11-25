import {
  BAN_LIST,
  BAN_PICK_TIPS,
  FIRST_PICKS,
  HIDDEN_PICKS,
  LANING_TIPS,
  MAP_TIPS,
  PING_TIPS,
  QUICK_LINKS,
  TEAMFIGHT_TIPS,
} from '../data/guides';
import {
  COUNTER_COUNTS,
  HEROES,
  HERO_NAMES,
  ITEM_COUNTS,
  ITEM_HEROES,
  TOTAL_COUNTER_SUGGESTIONS,
} from '../data/heroes';
import {
  CATEGORY_LABELS,
  CATEGORY_LEGEND,
  GLYPHS,
  ITEMS,
  ITEM_SWAP_ROWS,
} from '../data/items';
import {
  UI_ICONS,
  renderBarRows,
  renderGuideCards,
  renderHeroChips,
  renderItemBadge,
  renderItemBadgeByCode,
  renderPickCards,
} from '../components/render';
import type { ItemCode } from '../types';
import { escapeHtml, firstLetter, formatName, heroElementId, heroHue } from '../utils/format';

export function renderHeaderStats(): string {
  const stats = [
    { value: HERO_NAMES.length, label: 'Tướng được phân tích' },
    { value: TOTAL_COUNTER_SUGGESTIONS, label: 'Gợi ý khắc chế' },
    { value: Object.keys(ITEM_COUNTS).length, label: 'Loại trang bị' },
  ];
  return stats
    .map(
      (s) => `
    <div class="backdrop-blur-md bg-white/10 border border-amber-400/35 rounded-xl px-5 py-2.5 min-w-[130px] shadow-sm">
      <b class="block font-display text-2xl font-bold text-amber-300 tabular-nums">${s.value}</b>
      <span class="text-xs text-slate-200">${escapeHtml(s.label)}</span>
    </div>`
    )
    .join('');
}

export function renderHomePage(): string {
  const topCounters = Object.keys(COUNTER_COUNTS)
    .sort((a, b) => COUNTER_COUNTS[b] - COUNTER_COUNTS[a] || a.localeCompare(b))
    .slice(0, 10);

  const topItems = (Object.keys(ITEM_COUNTS) as ItemCode[])
    .sort((a, b) => (ITEM_COUNTS[b] ?? 0) - (ITEM_COUNTS[a] ?? 0))
    .slice(0, 10);

  return `
    <div class="mt-5 panel-box flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[var(--primary)]">
      <div>
        <div class="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">Tra cứu nhanh trước trận</div>
        <div class="font-display text-lg font-bold mt-0.5">Tìm tướng khắc chế &amp; trang bị đối phó ngay</div>
        <p class="m-0 text-sm text-[var(--mut)]">Nhấn phím <kbd class="px-1.5 py-0.5 text-xs rounded border border-[var(--bd)] bg-[var(--bg)]">/</kbd> bất kỳ lúc nào để mở nhanh ô tìm kiếm.</p>
      </div>
      <div class="flex gap-2 flex-wrap shrink-0">
        <a href="#heroes" class="pill-btn on no-underline">Tra cứu tướng ${UI_ICONS.arrowRight}</a>
        <a href="#banpick" class="pill-btn no-underline">Công cụ Cấm chọn</a>
      </div>
    </div>

    <h2 class="section-title">Khắc chế được gợi ý nhiều nhất</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Tướng và trang bị xuất hiện nhiều nhất trong toàn bộ bảng. Bấm vào tên tướng để mở thẻ chi tiết.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="panel-box">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-3">Tướng khắc chế hàng đầu</div>
        ${renderBarRows(topCounters, (k) => COUNTER_COUNTS[k] ?? 0, (k) => k, true)}
      </div>
      <div class="panel-box">
        <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-3">Trang bị gợi ý hàng đầu</div>
        ${renderBarRows(topItems, (k) => ITEM_COUNTS[k as ItemCode] ?? 0, (k) => ITEMS[k as ItemCode].name, false)}
      </div>
    </div>

    <h2 class="section-title">Khám phá các mục</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
      ${QUICK_LINKS.map(
        (q) => `
        <a class="panel-box group flex flex-col justify-between gap-2 no-underline text-[var(--ink)] hover:border-[var(--gold)] hover:-translate-y-0.5" href="#${q.id}">
          <div>
            <b class="font-display text-base font-semibold block mb-1 group-hover:text-[var(--gold)] transition-colors">${escapeHtml(q.title)}</b>
            <span class="text-[13px] text-[var(--mut)] leading-relaxed block">${escapeHtml(q.description)}</span>
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">Mở trang ${UI_ICONS.arrowRight}</span>
        </a>`
      ).join('')}
    </div>
  `;
}

export function renderHeroesPage(): string {
  const letters = Array.from(new Set(HERO_NAMES.map((n) => firstLetter(n)))).sort();

  const cardsHtml = HERO_NAMES.map((name) => {
    const d = HEROES[name];
    const cats = d.items.map((c) => ITEMS[c].category).join(' ');
    const itemNames = d.items.map((c) => ITEMS[c].name.toLowerCase()).join('|');

    return `
      <article class="hero-card flex flex-col gap-3"
        id="${heroElementId(name)}"
        data-n="${escapeHtml(name.toLowerCase())}"
        data-c="${escapeHtml(d.counters.join(',').toLowerCase())}"
        data-k="${escapeHtml(cats)}"
        data-it="${escapeHtml(itemNames)}">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg font-bold text-white border-2 border-[var(--gold)] shrink-0 shadow-sm"
               style="background:hsl(${heroHue(name)},52%,38%)">
            ${escapeHtml(name.charAt(0))}
          </div>
          <div class="min-w-0">
            <b class="font-display text-[17px] font-bold block leading-tight truncate">${escapeHtml(formatName(name))}</b>
            <small class="block text-xs text-[var(--mut)]">${d.counters.length} tướng khắc chế gợi ý</small>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Bị khắc chế bởi</div>
          ${renderHeroChips(d.counters)}
        </div>

        <div>
          <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Trang bị gợi ý</div>
          <div class="flex flex-wrap gap-1.5">${d.items.map((c) => renderItemBadgeByCode(c)).join('')}</div>
        </div>

        ${
          d.countersTo.length
            ? `<div class="pt-2 border-t border-[var(--bd)]">
                 <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Khắc chế các tướng này</div>
                 ${renderHeroChips(d.countersTo)}
               </div>`
            : ''
        }
      </article>
    `;
  }).join('');

  return `
    <h2 class="section-title">Tra cứu tướng</h2>
    <div id="tb" class="space-y-3 mb-4">
      <div id="sb" class="sticky z-[5] bg-[var(--bg)]/95 backdrop-blur-md pt-2.5 pb-2.5 border-b border-[var(--bd)]" style="top:calc(env(safe-area-inset-top,0px) + 54px)">
        <div class="flex gap-2 flex-wrap mb-2.5 items-center">
          <div class="relative flex-1 min-w-[200px]">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--mut)] pointer-events-none">${UI_ICONS.search}</span>
            <input id="q" class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[var(--bd)] focus:border-[var(--gold)] bg-[var(--card)] text-[var(--ink)] text-sm outline-none shadow-sm"
              placeholder="Tìm tướng, ví dụ Nakroth" aria-label="Tìm tướng" />
          </div>
          <button type="button" id="rn" class="pill-btn">${UI_ICONS.dice} Ngẫu nhiên</button>
          <button type="button" id="rs" class="pill-btn">${UI_ICONS.reset} Đặt lại</button>
        </div>

        <div class="flex gap-2 flex-wrap items-center">
          <span class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] w-16 shrink-0">Tìm theo</span>
          <button type="button" data-m="n" class="pill-btn on">Tên tướng</button>
          <button type="button" data-m="c" class="pill-btn">Tướng khắc chế</button>
          <button type="button" data-m="i" class="pill-btn">Trang bị</button>
        </div>
      </div>

      <div class="flex gap-2 flex-wrap items-center">
        <span class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] w-16 shrink-0">Loại đồ</span>
        <button type="button" data-ct="" class="pill-btn on">Tất cả</button>
        <button type="button" data-ct="ten" class="pill-btn">Kháng hiệu ứng</button>
        <button type="button" data-ct="def" class="pill-btn">Giáp vật lý</button>
        <button type="button" data-ct="mr" class="pill-btn">Giáp phép</button>
        <button type="button" data-ct="heal" class="pill-btn">Chống hồi máu</button>
        <button type="button" data-ct="pen" class="pill-btn">Xuyên giáp</button>
      </div>

      <div class="flex gap-1.5 flex-wrap items-center" id="az">
        <span class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] w-16 shrink-0">Chữ cái</span>
        <button type="button" data-az="" class="pill-btn on">Tất cả</button>
        ${letters
          .map(
            (l) =>
              `<button type="button" data-az="${escapeHtml(l)}" class="pill-btn min-w-[32px] !px-2 justify-center">${escapeHtml(l.toUpperCase())}</button>`
          )
          .join('')}
      </div>

      <div id="cnt" class="text-[13px] font-medium text-[var(--mut)] pt-1"></div>
    </div>

    <div id="empty-heroes" class="hidden panel-box text-center py-8 space-y-3">
      <div class="font-display text-base font-semibold">Không tìm thấy tướng phù hợp</div>
      <p class="m-0 text-sm text-[var(--mut)]">Thử tìm nhanh một trong các gợi ý phổ biến hoặc đặt lại bộ lọc:</p>
      <div class="flex justify-center flex-wrap gap-2">
        <button type="button" class="hero-chip" data-suggest="Nakroth">Nakroth</button>
        <button type="button" class="hero-chip" data-suggest="Florentino">Florentino</button>
        <button type="button" class="hero-chip" data-suggest="Elsu">Elsu</button>
        <button type="button" class="hero-chip" data-suggest="Lauriel">Lauriel</button>
        <button type="button" id="rs-empty" class="pill-btn on">${UI_ICONS.reset} Đặt lại bộ lọc</button>
      </div>
    </div>

    <div id="cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${cardsHtml}
    </div>
  `;
}

export function renderItemsPage(): string {
  const sortedCodes = (Object.keys(ITEM_COUNTS) as ItemCode[]).sort(
    (a, b) => (ITEM_COUNTS[b] ?? 0) - (ITEM_COUNTS[a] ?? 0)
  );

  return `
    <h2 class="section-title">Hướng dẫn trang bị</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Màu sắc là cách hiểu của mình về công dụng từng loại; nguồn chỉ liệt kê trang bị mà không giải thích.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      ${CATEGORY_LEGEND.map(
        (c) => `
        <div class="cat-${c.category} rounded-xl px-4 py-3 text-[13px] border border-current/15">
          <b class="font-display block text-sm font-bold mb-0.5">${escapeHtml(c.title)}</b>
          ${escapeHtml(c.description)}
        </div>`
      ).join('')}
    </div>

    <h2 class="section-title">Chi tiết từng trang bị</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Sắp xếp theo số lần được gợi ý. Bấm vào tên tướng để mở thẻ của tướng đó.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${sortedCodes
        .map((code) => {
          const item = ITEMS[code];
          const count = ITEM_COUNTS[code] ?? 0;
          const heroes = (ITEM_HEROES[code] ?? []).slice().sort((a, b) => a.localeCompare(b));
          return `
            <article class="panel-box space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                ${renderItemBadgeByCode(code)}
                <small class="text-xs font-medium text-[var(--mut)]">${escapeHtml(CATEGORY_LABELS[item.category])} · ${count} lượt gợi ý</small>
              </div>
              <div>
                <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Dùng để đối đầu</div>
                ${renderHeroChips(heroes)}
              </div>
            </article>
          `;
        })
        .join('')}
    </div>
  `;
}

export function renderBanPickPage(): string {
  const maxBan = BAN_LIST[0]?.banRate ?? 100;

  return `
    <h2 class="section-title">Cấm chọn (Ban/Pick)</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Mẹo từ các bài viết tiếng Việt, danh sách nên cấm, và công cụ gợi ý khi đội bạn chọn trước hoặc chọn sau.</p>

    <div class="inline-flex gap-2 flex-wrap p-1.5 rounded-2xl bg-[var(--card)] border border-[var(--bd)] mb-4">
      <button type="button" class="pill-btn on !border-0" data-bm="f">Đội mình chọn trước</button>
      <button type="button" class="pill-btn !border-0" data-bm="c">Đội mình chọn sau (khắc chế đối thủ)</button>
    </div>

    <div id="bf">
      <h2 class="section-title">Gợi ý chọn trước (First Pick)</h2>
      <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Ưu tiên tướng hợp meta hoặc đa năng, khó bị bắt bài. Mỗi thẻ cho biết ai khắc chế tướng đó theo bảng, để bạn chuẩn bị phương án.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${renderPickCards(FIRST_PICKS, (h) => HEROES[h]?.counters ?? [])}
      </div>

      <h2 class="section-title">Nên giấu bài, đừng chọn sớm</h2>
      <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Những tướng dễ bị khắc chế nếu lộ sớm. Hãy chọn sau khi địch đã lộ tướng chủ lực.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${renderPickCards(HIDDEN_PICKS, (h) => HEROES[h]?.counters ?? [])}
      </div>
    </div>

    <div id="bc" style="display:none" class="panel-box space-y-4">
      <div>
        <h2 class="section-title !mt-0">Chọn tướng khắc chế đối thủ</h2>
        <p class="text-[13px] text-[var(--mut)] m-0">Thêm tối đa 5 tướng của đội địch. Công cụ gom các tướng khắc chế trong bảng và xếp theo số tướng địch mà mỗi tướng khắc chế được.</p>
      </div>
      <div class="flex gap-2 flex-wrap items-center">
        <select id="es" aria-label="Chọn tướng địch"
          class="flex-1 min-w-[180px] px-3.5 py-2.5 rounded-xl border border-[var(--bd)] focus:border-[var(--gold)] bg-[var(--bg)] text-[var(--ink)] text-sm outline-none">
          ${HERO_NAMES.map(
            (n) => `<option value="${escapeHtml(n)}">${escapeHtml(formatName(n))}</option>`
          ).join('')}
        </select>
        <button type="button" class="pill-btn on" id="ea">${UI_ICONS.plus} Thêm tướng địch</button>
        <button type="button" class="pill-btn" id="ec">${UI_ICONS.trash} Xóa hết</button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2" id="el"></div>
      <div id="cr"></div>
    </div>

    <h2 class="section-title">Nên cấm trước</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Tỉ lệ bị cấm của các tướng đứng đầu từng vị trí, theo số liệu máy chủ Mặt Trời trong bài của Sforum.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${BAN_LIST.map((b) => {
        const pct = Math.round((b.banRate / maxBan) * 100);
        const counters = HEROES[b.hero]?.counters ?? [];
        return `
          <article class="panel-box space-y-2.5">
            <div class="flex items-center gap-2.5 text-[13px]">
              <span class="w-24 shrink-0 font-display font-bold text-sm">${escapeHtml(b.hero)}</span>
              <span class="flex-1 h-2.5 rounded-full overflow-hidden bg-[var(--oth)]">
                <span class="block h-full rounded-full" style="width:${pct}%;background:linear-gradient(90deg,var(--accent),var(--gold))"></span>
              </span>
              <span class="w-14 text-right font-semibold text-[var(--mut)] tabular-nums">${String(b.banRate).replace('.', ',')}%</span>
            </div>
            <p class="m-0 text-xs text-[var(--mut)] leading-relaxed"><b class="text-[var(--ink)]">${escapeHtml(b.role)}.</b> ${escapeHtml(b.note)}</p>
            <div>
              <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Nếu không cấm được, khắc chế bằng</div>
              ${renderHeroChips(counters)}
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <h2 class="section-title">Mẹo cấm chọn</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${renderGuideCards(BAN_PICK_TIPS)}
    </div>

    <p class="text-[13px] text-[var(--mut)] mt-5 max-w-[760px]">
      Nguồn: Sforum (tướng bị cấm 22/01/2026, meta S1 2026 28/01/2026, tướng đa năng 25/07/2025, tướng nên giấu bài 02/12/2024, rank và giải S3 2025) và Hoàng Hà Mobile (tướng nên cấm 2026, meta S1 2026). Tỉ lệ cấm là số liệu của bài Sforum cuối tháng 01/2026. Bản cập nhật giữa mùa Vết Nứt Thời Không gần đây chỉnh sức mạnh 8 tướng mà mình chưa đọc, nên hãy kiểm tra lại trong game. Mục "khắc chế" lấy từ bảng của Sforum, và hai mẹo cuối là gợi ý của mình.
    </p>
  `;
}

export function renderLaningPage(): string {
  return `
    <h2 class="section-title">Đi đường và giao tranh tổng</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Laning và all-out battlefield: mẹo tổng hợp từ các bài viết tiếng Việt. Mục ghi “Gợi ý của mình” là nhận xét của mình, không phải từ nguồn.</p>

    <h2 class="section-title">Giai đoạn đi đường (Laning)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${renderGuideCards(LANING_TIPS)}
    </div>

    <h2 class="section-title">Giao tranh tổng (All-out battlefield)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${renderGuideCards(TEAMFIGHT_TIPS)}
    </div>

    <p class="text-[13px] text-[var(--mut)] mt-5 max-w-[760px]">
      Xem thêm <a href="#banpick" class="text-[var(--gold)] font-medium underline">cấm chọn</a> và <a href="#table" class="text-[var(--gold)] font-medium underline">bảng khắc chế</a> để chọn tướng phù hợp trước khi vào trận. Nguồn: Hoàng Hà Mobile, Sforum, FPT Shop, Finhay, BlueStacks, Shopee Blog, huongdanlienquan.org. Một số bài chỉ đọc được đoạn trích ngắn nên chi tiết có thể chưa đầy đủ.
    </p>
  `;
}

export function renderSkillsPage(): string {
  const findGlyph = (itemName: string): string | undefined => {
    const entry = Object.values(ITEMS).find((i) => i.name === itemName);
    return entry ? GLYPHS[entry.glyph] : undefined;
  };

  return `
    <h2 class="section-title">Kỹ năng chung (Universal skills)</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Những kỹ năng dùng cho mọi tướng và mọi vị trí: đọc map, báo hiệu cho đồng đội và đổi trang bị theo tình huống.</p>

    <h2 class="section-title">Đọc map và đoán vị trí địch (Map guessing)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${renderGuideCards(MAP_TIPS)}
    </div>

    <h2 class="section-title">Ping và báo hiệu</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${renderGuideCards(PING_TIPS)}
    </div>

    <h2 class="section-title">Đổi trang bị theo tình huống (Item swapping)</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Không cần theo một bộ đồ cố định. Hãy đổi hoặc thêm đồ theo đội hình địch. Xem thêm <a href="#items" class="text-[var(--gold)] font-medium underline">trang Trang bị</a>.</p>
    <div class="panel-box !p-0 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-[13px]">
          <thead>
            <tr class="border-b border-[var(--bd)] bg-[var(--bg)]">
              <th class="py-3 px-4 text-left font-display font-semibold">Tình huống</th>
              <th class="py-3 px-4 text-left font-display font-semibold">Nên đổi hoặc thêm</th>
              <th class="py-3 px-4 text-left font-display font-semibold">Ghi chú</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--bd)]">
            ${ITEM_SWAP_ROWS.map(
              (row) => `
              <tr class="hover:bg-[var(--card-hover)] transition-colors">
                <td class="py-3 px-4 align-top font-medium">${escapeHtml(row.situation)}</td>
                <td class="py-3 px-4 align-top">
                  ${
                    row.items.length
                      ? `<div class="flex flex-wrap gap-1.5">${row.items
                          .map((it) => renderItemBadge(it.name, it.category, findGlyph(it.name)))
                          .join('')}</div>`
                      : '<span class="text-[var(--mut)]">Đồ rẻ cấp 2 hoặc 3 hiệu quả cao</span>'
                  }
                </td>
                <td class="py-3 px-4 align-top text-[var(--mut)]">${escapeHtml(row.note)}</td>
              </tr>`
            ).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <p class="text-[13px] text-[var(--mut)] mt-5 max-w-[760px]">
      Nguồn: FPT Shop (cách đọc map), Thế Giới Di Động (kỹ năng leo rank, ping), Sforum (minimap, đội hình hack map, chống sát thủ, lật kèo), Hoàng Hà Mobile, Shopee Blog, Finhay, BlueStacks. Nhiều bài chỉ đọc được đoạn trích ngắn.
    </p>
  `;
}

export function renderTablePage(): string {
  return `
    <h2 class="section-title">Bảng khắc chế đầy đủ</h2>
    <p class="text-[13px] text-[var(--mut)] mt-0 mb-4">Mỗi hàng là một tướng, kèm các tướng khắc chế và trang bị gợi ý. Bấm vào tên tướng để mở thẻ chi tiết.</p>
    <div class="panel-box !p-0 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-[13px]">
          <thead>
            <tr class="border-b border-[var(--bd)] bg-[var(--bg)]">
              <th class="py-3 px-4 text-left font-display font-semibold">Tướng</th>
              <th class="py-3 px-4 text-left font-display font-semibold">Bị khắc chế bởi</th>
              <th class="py-3 px-4 text-left font-display font-semibold">Trang bị gợi ý</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--bd)]">
            ${HERO_NAMES.map((name) => {
              const d = HEROES[name];
              return `
                <tr class="hover:bg-[var(--card-hover)] transition-colors">
                  <td class="py-3 px-4 align-top">${renderHeroChips([name])}</td>
                  <td class="py-3 px-4 align-top">${renderHeroChips(d.counters)}</td>
                  <td class="py-3 px-4 align-top"><div class="flex flex-wrap gap-1.5">${d.items.map((c) => renderItemBadgeByCode(c)).join('')}</div></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderAboutPage(): string {
  return `
    <h2 class="section-title">Giới thiệu và nguồn dữ liệu</h2>
    <div class="panel-box max-w-[760px] space-y-3 text-sm text-[var(--mut)] leading-relaxed">
      <p class="m-0">Dữ liệu lấy từ bảng khắc chế của <b class="text-[var(--ink)]">Sforum</b> (cập nhật 23/03/2026), không phải từ aov-builds.com, vì các trang tướng của aov-builds không mở được khi tổng hợp.</p>
      <p class="m-0">Bảng có thể còn tướng cũ và thiếu tướng mới. Các hàng bị lặp trong nguồn (Natalya, Lauriel, Tel’Annas) đã được gộp lại.</p>
      <p class="m-0">Nguồn chỉ liệt kê trang bị gợi ý mà không giải thích lý do. Nhóm màu (kháng hiệu ứng, giáp vật lý, giáp phép, chống hồi máu, xuyên giáp) là cách hiểu của mình về công dụng từng món, nên hãy xem như tham khảo.</p>
      <p class="m-0">Phím tắt: bấm <kbd class="px-1.5 py-0.5 text-xs rounded border border-[var(--bd)] bg-[var(--bg)] text-[var(--ink)]">/</kbd> để vào ô tìm kiếm, bấm <kbd class="px-1.5 py-0.5 text-xs rounded border border-[var(--bd)] bg-[var(--bg)] text-[var(--ink)]">Esc</kbd> để đặt lại bộ lọc. Tên tướng và tên trang bị được giữ nguyên như trong game.</p>
    </div>
  `;
}
