export type ItemCategory = 'ten' | 'def' | 'mr' | 'heal' | 'pen' | 'oth';

export type ItemCode =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P'
  | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W';

export type GlyphKey =
  | 'boots' | 'shield' | 'armor' | 'medal' | 'book'
  | 'sword' | 'spear' | 'orb' | 'staff' | 'cloak'
  | 'flame' | 'mask' | 'scythe' | 'fist' | 'leaf';

export interface ItemInfo {
  code: ItemCode;
  name: string;
  category: ItemCategory;
  glyph: GlyphKey;
}

export interface HeroData {
  name: string;
  counters: string[];
  items: ItemCode[];
  /** Heroes that this hero counters (reverse lookup). */
  countersTo: string[];
}

export interface BanEntry {
  hero: string;
  role: string;
  banRate: number;
  note: string;
}

export interface PickSuggestion {
  hero: string;
  reason: string;
  tag: string;
}

export interface GuideCard {
  title: string;
  body: string;
  source?: string;
}

export interface ItemSwapEntry {
  situation: string;
  items: { name: string; category: ItemCategory }[];
  note: string;
}

export type PageId =
  | 'home'
  | 'heroes'
  | 'items'
  | 'banpick'
  | 'laning'
  | 'skills'
  | 'table'
  | 'about';

export type SearchMode = 'n' | 'c' | 'i';
export type BanPickMode = 'f' | 'c';

