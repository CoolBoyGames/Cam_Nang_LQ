import type { HeroData, ItemCode } from '../types';

const RAW_HEROES =
  "Nakroth|Aleister,Arum,Alice|ABC;Grakk|Chaugnar,Toro,Enzo|ACD;Fennik|Slimz,Violet,Murad|ABC;Natalya|Yue,Veera,Murad,Lauriel,Liliana|DEFH;Cresht|Toro,Hayate,Fennik|HDR;Jinna|Tulen,Hayate,Gildur|DFE;Helen|Natalya,Maloch,Keera|HL;Maloch|Veres,Florentino,Lauriel|HK;Ngộ Không|Fennik,Kaine,Lindis,Elsu|ACM;Kriknak|Murad,Nakroth,Zill|GBC;Arthur|Maloch,Lữ Bố,Florentino|JHK;Slimz|Elsu,Valhein,Alice|CUK;Ilumia|Nakroth,Kriknak,Murad|GDF;Preyta|Murad,Yue,Ignis|DFE;Skud|Florentino,Veres,Arum|TJS;Raz|Tulen,Murad,Veera|DEF;Lauriel|Aleister,Baldum,Arum,Tulen,Liliana,Billow|FEGH;Kaine|Fennik,Elsu,Lindis|MGK;Airi|Yena,Florentino,Keera|HIJ;Zuka|Lữ Bố,Wonder Woman,Zephys|CJA;Ignis|Ngộ Không,Yue,Iggy,Zuka|DFG;Murad|Kriknak,Nakroth,Zuka|GKS;Zill|Hayate,Fennik,Nakroth,Ryoma|DGI;Arduin|Lauriel,Lữ Bố,Zephys|DHK;Stuart|Erin,Keera,Paine|CBJ;Ryoma|Yena,Airi,Murad|GH;Astrid|Lữ Bố,Zephys,Maloch|JIOH;Tel'Annas|Murad,Elsu,Stuart,Aoi,Keera|ABCEF;Superman|Alice,Zill,Kaine|IJD;Wonder Woman|Keera,Aoi,Hayate|HOG;Xeniel|Slimz,Maloch,Lauriel|SRQ;Kil'Groth|Arum,Lữ Bố,Omen|HB;Moren|Zill,Elsu,Murad|BAI;TeeMee|Alice,Hayate,Baldum|POG;Lindis|Nakroth,Murad,Kriknak|JIC;Omen|Dextra,Lữ Bố,Florentino|ABH;Tulen|Zuka,Nakroth,Ngộ Không|DFEG;Liliana|Nakroth,Ngộ Không,Zuka|DFE;Max|Maloch,Xeniel,Liliana|OPG;The Flash|Ngộ Không,Zuka,Stuart|DIG;Wisp|Nakroth,Zill,Kriknak|AC;Arum|Teemee,Baldum,Gildur|HL;Rourke|Baldum,Aleister,Zephys|OPQ;Marja|Richter,Maloch,Lữ Bố|DGEF;Roxie|Alice,Baldum,Arum|EFJ;Baldum|Toro,Gildur,Thane|POQ;Annette|Aleister,Alice,Baldum|DFE;Amily|Lữ Bố,Omen,Richter|HJIB;Y'bneth|Enzo,Omen,Lữ Bố,Thane|AHC;Elsu|Helen,Zata,Paine,Yue,Iggy|LC;Richter|Yena,Lữ Bố,Omen|DGK;Wiro|Lữ Bố,Thane,Omen|OPQ;Quillen|Kriknak,Nakroth,Zuka|GCM;Sephera|Aleister,Yue,Alice|HG;Florentino|Lauriel,Marja,Arum,Aleister|HDG;D'arcy|Eland'Orr,Fennik,Murad|GEF;Hayate|Annette,Murad,Stuart|ACJ;Capheny|Hayate,Stuart,Valhein|ABC;Errol|Omen,Florentino,Lữ Bố|HPD;Yena|Florentino,Richter,Lữ Bố|JDK;Enzo|Marja,Keera,Nakroth|TUJ;Zip|TeeMee,Dirak,Arum|QPO;Qi|Aleister,TeeMee,Baldum|HJI;Celica|Violet,Nakroth,Eland'Orr|ABC;Volkath|Arum,Baldum,Aleister|JHG;Krizzix|Lindis,Elsu,TeeMee|GEF;Eland'Orr|Ryoma,Keera,Fennik|GIC;Ishar|Murad,Nakroth,Quillen|FED;Dirak|Heino,Keera,Hayate|DFE;Keera|Paine,Aoi,Wonder Woman|FED;Ata|Maloch,Hayate,Lữ Bố|QOP;Paine|Gildur,Arum,Grakk|FEG;Laville|Mina,Aoi,Liliana|BAC;Rouie|Raz,Baldum,Annette|HD;Zata|Veera,Tulen,Nakroth|FEG;Allain|Omen,Florentino,Zill,Paine|HK;Thorne|Zill,Raz,Hayate|CA;Sinestrea|Nakroth,Quillen,Ngộ Không|HGM;Dextra|Omen,Hayate,Aleister|DKH;Lorion|Gildur,Zill,Ngộ Không|DGN;Bright|Keera,Murad,Nakroth|GC;Iggy|Yue,Heino,Nakroth|DEF;Aoi|Kriknak,Zuka,Nakroth|GK;Tachi|Florentino,Raz,Arum|CJI;Aya|Alice,Arum,Aleister|SEF;Yue|Murad,Nakroth,Ngộ Không|FEL;Teeri|Murad,Nakroth,Stuart|CGB;Bonnie|Kriknak,Zata,Zill|EFN;Bijan|Annette,Toro,Arum|DNC;Ming|Helen,Dolia,Maloch|HL;Erin|Eland'Orr,Violet,Hayate|GAB;Charlotte|Florentino,Richter,Omen|HC;Dolia|Maloch,Arum,Aleister|HD;Biron|Marja,Bolt Baron,Florentino|CGU;Bolt Baron|Marja,Murad,Nakroth|EFG;Veera|Nakroth,Aoi,Ngộ Không|NFE;Kahlii|Liliana,Zata,Paine|EFG;Mganga|Maloch,Veres,Ignis|HEF;Krixi|Tulen,Liliana,Aoi|EFG;Điêu Thuyền|Chaugnar,Florentino,Keera|NEFD;Azzen'Ka|Yue,Iggy,Heino|NEFD;Valhein|Stuart,Capheny,Elsu|CGU;Thane|Y'bneth,Enzo,Toro|CGB;Omega|Gildur,Zip,Toro|DCS;Lữ Bố|Florentino,Veres,Hayate|HCS;Mina|Hayate,Slimz,Florentino|QOH;Triệu Vân|Laville,Fennik,Hayate|PWH;Zephys|Aleister,Baldum,TeeMee|GUV;Heino|Gildur,Yue,Elsu|GLEF;Chaugnar|Hayate,Yorn,Tel'Annas|OSP;Butterfly|Baldum,Wonder Woman,Arum|JVH;Taara|Florentino,Veres,Lauriel|HCS;Alice|Zill,Nakroth,Sinestrea|DFE;Orrmar|Gildur,Alice,Baldum,Hayate|DCO;Gildur|Chaugnar,Yue,Florentino|DCG;Yorn|Aleister,Gildur,Grakk|UCS;Toro|Enzo,Baldum,Florentino|CDN;Edras|Hayate,Bolt Baron,Aoi|CGS";

const reverseMap: Record<string, string[]> = {};
const counterCounts: Record<string, number> = {};
const itemCounts: Partial<Record<ItemCode, number>> = {};
const itemHeroes: Partial<Record<ItemCode, string[]>> = {};
const heroMap: Record<string, HeroData> = {};
let totalCounters = 0;

for (const row of RAW_HEROES.split(';')) {
  const [name, countersRaw, itemsRaw] = row.split('|');
  const counters = countersRaw.split(',');
  const items = itemsRaw.split('') as ItemCode[];

  heroMap[name] = {
    name,
    counters,
    items,
    countersTo: [],
  };

  for (const counter of counters) {
    const key = counter.toLowerCase();
    (reverseMap[key] ??= []).push(name);
    counterCounts[counter] = (counterCounts[counter] ?? 0) + 1;
    totalCounters++;
  }

  for (const code of items) {
    itemCounts[code] = (itemCounts[code] ?? 0) + 1;
    (itemHeroes[code] ??= []).push(name);
  }
}

for (const hero of Object.values(heroMap)) {
  hero.countersTo = (reverseMap[hero.name.toLowerCase()] ?? []).slice().sort((a, b) => a.localeCompare(b));
}

export const HEROES: Record<string, HeroData> = heroMap;
export const HERO_NAMES: string[] = Object.keys(heroMap).sort((a, b) => a.localeCompare(b));
export const COUNTER_COUNTS: Record<string, number> = counterCounts;
export const ITEM_COUNTS: Partial<Record<ItemCode, number>> = itemCounts;
export const ITEM_HEROES: Partial<Record<ItemCode, string[]>> = itemHeroes;
export const TOTAL_COUNTER_SUGGESTIONS = totalCounters;

