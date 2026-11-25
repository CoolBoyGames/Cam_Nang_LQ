import { GLYPHS, ITEMS } from '../data/items';
import type { GuideCard, ItemCategory, ItemCode, PickSuggestion } from '../types';
import { escapeHtml, formatName } from '../utils/format';

export const UI_ICONS = {
  search:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  dice:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/></svg>',
  reset:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
  sun:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  moon:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  plus:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg>',
  trash:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
  arrowRight:
    '<svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
};

export function renderHeroChips(names: string[]): string {
  return `<div class="flex flex-wrap gap-1.5">${names
    .map(
      (n) =>
        `<button type="button" class="hero-chip" data-h="${escapeHtml(n)}">${escapeHtml(formatName(n))}</button>`
    )
    .join('')}</div>`;
}

export function renderItemBadgeByCode(code: ItemCode, suffix = ''): string {
  const item = ITEMS[code];
  return renderItemBadge(item.name, item.category, GLYPHS[item.glyph], suffix);
}

export function renderItemBadge(
  name: string,
  category: ItemCategory,
  glyphPath?: string,
  suffix = ''
): string {
  const icon = glyphPath
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${glyphPath}"/></svg>`
    : '';
  return `<span class="item-badge cat-${category}">${icon}${escapeHtml(name)}${escapeHtml(suffix)}</span>`;
}

export function renderBarRows(
  keys: string[],
  getValue: (key: string) => number,
  getLabel: (key: string) => string,
  clickableHero = false
): string {
  if (!keys.length) return '';
  const max = getValue(keys[0]) || 1;
  return `<div class="space-y-2">${keys
    .map((key) => {
      const val = getValue(key);
      const pct = Math.round((val / max) * 100);
      const attr = clickableHero ? ` data-h="${escapeHtml(key)}"` : '';
      const interactive = clickableHero
        ? 'cursor-pointer hover:text-[var(--gold)] transition-colors'
        : 'cursor-default';
      return `<div class="flex items-center gap-2.5 text-[13px] ${interactive}"${attr}>
        <span class="w-28 shrink-0 truncate font-medium">${escapeHtml(formatName(getLabel(key)))}</span>
        <span class="flex-1 h-2.5 rounded-full overflow-hidden bg-[var(--oth)]">
          <span class="block h-full rounded-full" style="width:${pct}%;background:linear-gradient(90deg,var(--primary),var(--gold))"></span>
        </span>
        <span class="w-7 text-right font-semibold text-[var(--mut)] tabular-nums">${val}</span>
      </div>`;
    })
    .join('')}</div>`;
}

export function renderGuideCards(cards: GuideCard[]): string {
  return cards
    .map(
      (c) => `<article class="panel-box flex flex-col justify-between gap-2">
        <div>
          <h3 class="font-display text-base font-semibold m-0 mb-1.5 text-[var(--ink)]">${escapeHtml(c.title)}</h3>
          <p class="m-0 text-sm text-[var(--mut)] leading-relaxed">${escapeHtml(c.body)}</p>
        </div>
        ${c.source ? `<div class="pt-2 border-t border-[var(--bd)] text-xs text-[var(--mut)]">Nguồn: ${escapeHtml(c.source)}</div>` : ''}
      </article>`
    )
    .join('');
}

export function renderPickCards(
  picks: PickSuggestion[],
  getCounters: (hero: string) => string[]
): string {
  return picks
    .map((p) => {
      const counters = getCounters(p.hero);
      return `<article class="panel-box space-y-2.5">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <button type="button" class="hero-chip font-semibold" data-h="${escapeHtml(p.hero)}">${escapeHtml(formatName(p.hero))}</button>
          <span class="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">${escapeHtml(p.tag)}</span>
        </div>
        <p class="m-0 text-sm text-[var(--mut)] leading-relaxed">${escapeHtml(p.reason)}</p>
        <div>
          <div class="text-[11px] font-semibold tracking-wider uppercase text-[var(--mut)] mb-1.5">Bị khắc chế bởi</div>
          ${renderHeroChips(counters)}
        </div>
      </article>`;
    })
    .join('');
}
