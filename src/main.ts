import './style.css';
import { BAN_LIST, NAV_ITEMS } from './data/guides';
import { HEROES, HERO_NAMES } from './data/heroes';
import {
  renderAboutPage,
  renderBanPickPage,
  renderHeaderStats,
  renderHeroesPage,
  renderHomePage,
  renderItemsPage,
  renderLaningPage,
  renderSkillsPage,
  renderTablePage,
} from './pages/pages';
import { UI_ICONS, renderHeroChips, renderItemBadgeByCode } from './components/render';
import type { BanPickMode, ItemCategory, ItemCode, PageId, SearchMode } from './types';
import { escapeHtml, firstLetter, formatName, heroElementId } from './utils/format';

const PAGE_RENDERERS: Record<PageId, () => string> = {
  home: renderHomePage,
  heroes: renderHeroesPage,
  items: renderItemsPage,
  banpick: renderBanPickPage,
  laning: renderLaningPage,
  skills: renderSkillsPage,
  table: renderTablePage,
  about: renderAboutPage,
};

// --- Theme Management ---
const THEME_KEY = 'cnlq-theme';

function getPreferredDark(): boolean {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(dark: boolean): void {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.innerHTML = dark ? UI_ICONS.sun : UI_ICONS.moon;
    toggleBtn.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    toggleBtn.setAttribute('title', dark ? 'Giao diện sáng' : 'Giao diện tối');
  }
}

applyTheme(getPreferredDark());

// --- App Shell ---
const app = document.getElementById('app');
if (!app) {
  throw new Error('Root #app element not found');
}

app.innerHTML = `
  <header class="relative overflow-hidden text-slate-100 px-4 pt-9 pb-8 border-b-2 border-[var(--gold)] text-center"
    style="background:radial-gradient(circle at 50% 0%, rgba(124,58,237,0.35), transparent 65%), linear-gradient(135deg,var(--hero1),var(--hero2))">
    <div class="relative z-[1] max-w-[1100px] mx-auto">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 border border-amber-400/35 text-amber-300 mb-3">
        Arena of Valor · Tactical Guide
      </div>
      <h1 class="m-0 mb-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
        Cẩm nang khắc chế Liên Quân
      </h1>
      <p class="m-0 mx-auto max-w-[600px] text-slate-300 text-sm sm:text-[15px]">
        Biết ai khắc chế ai và nên lên trang bị gì để thắng đường đấu.
      </p>
      <div class="flex justify-center gap-3 flex-wrap mt-5">
        ${renderHeaderStats()}
      </div>
    </div>
  </header>

  <nav id="nv" class="sticky top-[env(safe-area-inset-top,0px)] z-[6] bg-[var(--card)]/90 backdrop-blur-md border-b border-[var(--bd)] px-3 py-2">
    <div class="max-w-[1100px] mx-auto flex items-center gap-2">
      <div class="flex-1 flex items-center gap-1.5 flex-nowrap overflow-x-auto no-scrollbar">
        ${NAV_ITEMS.map(
          (item) => `
          <a href="#${item.id}" data-nav="${item.id}"
            class="shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[var(--ink)] no-underline text-[13.5px] font-medium hover:bg-[var(--oth)]">
            ${escapeHtml(item.label)}
          </a>`
        ).join('')}
      </div>
      <div class="flex items-center gap-1.5 shrink-0 pl-2 border-l border-[var(--bd)]">
        <button type="button" id="quick-search" class="pill-btn !px-2.5 !py-1.5" aria-label="Tìm kiếm nhanh (phím /)" title="Tìm kiếm nhanh (/)">
          ${UI_ICONS.search}
        </button>
        <button type="button" id="theme-toggle" class="pill-btn !px-2.5 !py-1.5" aria-label="Đổi giao diện sáng/tối"></button>
      </div>
    </div>
  </nav>

  <main class="max-w-[1100px] mx-auto px-4 pb-10">
    ${(Object.keys(PAGE_RENDERERS) as PageId[])
      .map(
        (id) =>
          `<section class="pg hidden" id="p-${id}">${PAGE_RENDERERS[id]()}</section>`
      )
      .join('')}
  </main>

  <footer class="max-w-[1100px] mx-auto px-4 pb-8">
    <div class="border-t border-[var(--bd)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--mut)]">
      <span>Cẩm nang khắc chế Liên Quân · Dữ liệu tổng hợp từ Sforum</span>
      <span>Phím tắt: <kbd class="px-1.5 py-0.5 rounded border border-[var(--bd)] bg-[var(--card)] text-[var(--ink)]">/</kbd> Tìm tướng · <kbd class="px-1.5 py-0.5 rounded border border-[var(--bd)] bg-[var(--card)] text-[var(--ink)]">Esc</kbd> Đặt lại</span>
    </div>
  </footer>
`;

applyTheme(getPreferredDark());

// --- Routing ---
let currentPage: PageId | '' = '';

function navigate(keepScroll = false): void {
  const hash = (location.hash || '#home').slice(1) as PageId;
  const target: PageId = hash in PAGE_RENDERERS ? hash : 'home';
  if (target === currentPage) return;
  currentPage = target;

  document.querySelectorAll<HTMLElement>('.pg').forEach((sec) => {
    sec.classList.toggle('hidden', sec.id !== `p-${target}`);
  });

  document.querySelectorAll<HTMLAnchorElement>('#nv a').forEach((a) => {
    const active = a.getAttribute('href') === `#${target}`;
    a.classList.toggle('bg-[var(--gold)]', active);
    a.classList.toggle('text-[#0f172a]', active);
    a.classList.toggle('font-semibold', active);
  });

  if (!keepScroll) {
    window.scrollTo(0, 0);
  }
}

window.addEventListener('hashchange', () => navigate());

// --- Hero Lookup State & Filtering ---
const searchInput = document.getElementById('q') as HTMLInputElement;
const countEl = document.getElementById('cnt') as HTMLElement;
const emptyHeroesEl = document.getElementById('empty-heroes') as HTMLElement;
let searchMode: SearchMode = 'n';
let categoryFilter: ItemCategory | '' = '';
let letterFilter = '';

const PLACEHOLDERS: Record<SearchMode, string> = {
  n: 'Tìm tướng, ví dụ Nakroth',
  c: 'Nhập tên tướng khắc chế để xem nó khắc chế ai, ví dụ Murad',
  i: 'Nhập tên trang bị, ví dụ Giày Kiên Cường',
};

function syncHeroControls(): void {
  document.querySelectorAll<HTMLButtonElement>('#tb button').forEach((btn) => {
    const { m, ct, az } = btn.dataset;
    const isOn =
      (m !== undefined && m === searchMode) ||
      (ct !== undefined && ct === categoryFilter) ||
      (az !== undefined && az === letterFilter);
    if (m !== undefined || ct !== undefined || az !== undefined) {
      btn.classList.toggle('on', isOn);
    }
  });
  searchInput.placeholder = PLACEHOLDERS[searchMode];
}

function filterHeroes(): void {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;

  document.querySelectorAll<HTMLElement>('.hero-card').forEach((card) => {
    const nameAttr = card.getAttribute('data-n') ?? '';
    let ok = true;

    if (query) {
      const target =
        searchMode === 'n'
          ? nameAttr
          : searchMode === 'c'
            ? (card.getAttribute('data-c') ?? '')
            : (card.getAttribute('data-it') ?? '');
      ok = target.includes(query);
    }

    if (ok && categoryFilter) {
      const cats = ` ${card.getAttribute('data-k') ?? ''} `;
      ok = cats.includes(` ${categoryFilter} `);
    }

    if (ok && letterFilter) {
      ok = firstLetter(nameAttr) === letterFilter;
    }

    card.style.display = ok ? '' : 'none';
    if (ok) visible++;
  });

  countEl.textContent = `Hiển thị ${visible} / ${HERO_NAMES.length} tướng`;
  emptyHeroesEl.classList.toggle('hidden', visible > 0);
}

function resetHeroFilters(): void {
  searchInput.value = '';
  searchMode = 'n';
  categoryFilter = '';
  letterFilter = '';
  syncHeroControls();
  filterHeroes();
}

function jumpToHero(name: string): void {
  const card = document.getElementById(heroElementId(name));
  if (!card) return;
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('hl');
  window.setTimeout(() => card.classList.remove('hl'), 1600);
}

searchInput.addEventListener('input', filterHeroes);

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    if (currentPage !== 'heroes') {
      location.hash = 'heroes';
      navigate();
    }
    searchInput.focus();
  } else if (e.key === 'Escape') {
    resetHeroFilters();
    searchInput.blur();
  }
});

// --- Ban/Pick Interactive State ---
let banPickMode: BanPickMode = 'f';
let enemyTeam: string[] = [];
const enemySelect = document.getElementById('es') as HTMLSelectElement;

function syncBanPickMode(): void {
  const bf = document.getElementById('bf') as HTMLElement;
  const bc = document.getElementById('bc') as HTMLElement;
  bf.style.display = banPickMode === 'f' ? '' : 'none';
  bc.style.display = banPickMode === 'c' ? '' : 'none';
  document.querySelectorAll<HTMLButtonElement>('[data-bm]').forEach((btn) => {
    btn.classList.toggle('on', btn.dataset.bm === banPickMode);
  });
}

function renderEnemyCounters(): void {
  const listEl = document.getElementById('el') as HTMLElement;
  const resultEl = document.getElementById('cr') as HTMLElement;

  const slots: string[] = [];
  for (let i = 0; i < 5; i++) {
    const hero = enemyTeam[i];
    if (hero) {
      slots.push(
        `<button type="button" data-x="${escapeHtml(hero)}"
          class="flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl border border-[var(--gold)] bg-[var(--gold-soft)] text-[var(--ink)] text-xs font-semibold cursor-pointer">
          <span class="truncate">${escapeHtml(formatName(hero))}</span>
          <span class="text-[var(--mut)]" aria-hidden="true">×</span>
        </button>`
      );
    } else {
      slots.push(
        `<div class="flex items-center justify-center px-3 py-2 rounded-xl border border-dashed border-[var(--bd)] text-xs text-[var(--mut)]">
          Địch ${i + 1}
        </div>`
      );
    }
  }
  listEl.innerHTML = slots.join('');

  if (!enemyTeam.length) {
    resultEl.innerHTML =
      '<p class="m-0 text-xs text-[var(--mut)]">Chọn tối đa 5 tướng địch ở trên để xem gợi ý khắc chế.</p>';
    return;
  }

  const counterScores: Record<string, string[]> = {};
  const itemScores: Partial<Record<ItemCode, number>> = {};
  const bannedSet = new Set(BAN_LIST.map((b) => b.hero));

  for (const enemy of enemyTeam) {
    const data = HEROES[enemy];
    if (!data) continue;
    for (const c of data.counters) {
      (counterScores[c] ??= []).push(enemy);
    }
    for (const code of data.items) {
      itemScores[code] = (itemScores[code] ?? 0) + 1;
    }
  }

  const topPicks = Object.keys(counterScores)
    .sort((a, b) => counterScores[b].length - counterScores[a].length || a.localeCompare(b))
    .slice(0, 8);

  const topItems = (Object.keys(itemScores) as ItemCode[])
    .sort((a, b) => (itemScores[b] ?? 0) - (itemScores[a] ?? 0))
    .slice(0, 6);

  resultEl.innerHTML = `
    <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-2">Tướng nên chọn (xếp theo số tướng địch khắc chế được)</div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${topPicks
        .map((c) => {
          const hitList = counterScores[c];
          const banWarn = bannedSet.has(c) ? ' · Hay bị cấm' : '';
          return `
            <div class="rounded-xl border border-[var(--bd)] bg-[var(--bg)] p-3 space-y-2">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <button type="button" class="hero-chip font-semibold" data-h="${escapeHtml(c)}">${escapeHtml(formatName(c))}</button>
                <span class="text-xs font-medium text-[var(--gold)]">Khắc chế ${hitList.length}/${enemyTeam.length}${banWarn}</span>
              </div>
              ${renderHeroChips(hitList)}
            </div>
          `;
        })
        .join('')}
    </div>
    <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mt-4 mb-2">Trang bị nên lên (theo số tướng địch cần đối phó)</div>
    <div class="flex flex-wrap gap-1.5">${topItems.map((code) => renderItemBadgeByCode(code, ` (${itemScores[code]})`)).join('')}</div>
  `;
}

// --- Global Click Delegation ---
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  if (target.closest('#theme-toggle')) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextDark = !isDark;
    localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light');
    applyTheme(nextDark);
    return;
  }

  if (target.closest('#quick-search')) {
    if (currentPage !== 'heroes') {
      location.hash = 'heroes';
      navigate();
    }
    searchInput.focus();
    return;
  }

  const suggestBtn = target.closest<HTMLElement>('[data-suggest]');
  if (suggestBtn) {
    const val = suggestBtn.getAttribute('data-suggest') ?? '';
    resetHeroFilters();
    searchInput.value = val;
    filterHeroes();
    return;
  }

  if (target.closest('#rs-empty')) {
    resetHeroFilters();
    searchInput.focus();
    return;
  }

  const heroTrigger = target.closest<HTMLElement>('[data-h]');
  if (heroTrigger) {
    const heroName = heroTrigger.getAttribute('data-h');
    if (heroName) {
      if (currentPage !== 'heroes') {
        location.hash = 'heroes';
        navigate(true);
      }
      resetHeroFilters();
      jumpToHero(heroName);
      return;
    }
  }

  const tbBtn = target.closest<HTMLButtonElement>('#tb button');
  if (tbBtn) {
    const { m, ct, az } = tbBtn.dataset;
    if (m) {
      searchMode = m as SearchMode;
    } else if (ct !== undefined) {
      categoryFilter = categoryFilter === ct ? '' : (ct as ItemCategory | '');
    } else if (az !== undefined) {
      letterFilter = letterFilter === az ? '' : az;
    } else if (tbBtn.id === 'rs') {
      resetHeroFilters();
      return;
    } else if (tbBtn.id === 'rn') {
      resetHeroFilters();
      jumpToHero(HERO_NAMES[Math.floor(Math.random() * HERO_NAMES.length)]);
      return;
    }
    syncHeroControls();
    filterHeroes();
    return;
  }

  const bmBtn = target.closest<HTMLButtonElement>('[data-bm]');
  if (bmBtn) {
    banPickMode = bmBtn.dataset.bm as BanPickMode;
    syncBanPickMode();
    return;
  }

  const removeEnemy = target.closest<HTMLElement>('[data-x]');
  if (removeEnemy) {
    const name = removeEnemy.getAttribute('data-x');
    if (name) {
      enemyTeam = enemyTeam.filter((n) => n !== name);
      renderEnemyCounters();
    }
    return;
  }

  if (target.closest('#ea')) {
    const val = enemySelect.value;
    if (val && enemyTeam.length < 5 && !enemyTeam.includes(val)) {
      enemyTeam.push(val);
      renderEnemyCounters();
    }
  } else if (target.closest('#ec')) {
    enemyTeam = [];
    renderEnemyCounters();
  }
});

// Initial render
filterHeroes();
renderEnemyCounters();
navigate();
