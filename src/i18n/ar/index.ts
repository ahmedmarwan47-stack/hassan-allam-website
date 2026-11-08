// The Arabic dictionary, merged from one file per area of the site.
import shell from "./shell";
import home from "./home";
import project from "./project";
import story from "./story";
import dataLive from "./data-live";
import dataContent from "./data-content";
import names from "./names";

const merged: Record<string, string> = { ...dataLive, ...dataContent, ...home, ...project, ...story, ...shell, ...names };

// Project and brand names also appear in Latin inside translated sentences
// ("في قلب SwanLake Residences …") — write them in Arabic script there too.
// Longest first so "SwanLake Residences" wins over "SwanLake".
const IN_SENTENCE: [RegExp, string][] = (
  [
    ["Encore SwanLake El Gouna", "إنكور سوان ليك الجونة"],
    ["Swanlake Residences El Gouna", "سوان ليك ريزيدنسز الجونة"],
    ["SwanLake Residences El Gouna", "سوان ليك ريزيدنسز الجونة"],
    ["SwanLake Residences", "سوان ليك ريزيدنسز"],
    ["Swanlake Residences", "سوان ليك ريزيدنسز"],
    ["Little Venice", "ليتل فينيس"],
    ["Park Central", "بارك سنترال"],
    ["Parkview", "بارك فيو"],
    ["Park View", "بارك فيو"],
    ["Seasons Residences", "سيزونز ريزيدنس"],
    ["Seasons Residence", "سيزونز ريزيدنس"],
    ["The Valleys", "ذا فاليز"],
    ["Mostakbal City", "مستقبل سيتي"],
    ["HAPTOWN", "هاب تاون"],
    ["Haptown", "هاب تاون"],
    ["KEYS 52", "كيز 52"],
    ["XCHANGE", "إكستشينج"],
    ["SwanLake", "سوان ليك"],
    ["Swanlake", "سوان ليك"],
    ["Encore", "إنكور"],
  ] as const
).map(([en, ar]) => [new RegExp(en.replace(/\s+/g, "\\s+"), "g"), ar]);

const AR: Record<string, string> = Object.fromEntries(
  Object.entries(merged).map(([en, ar]) => [
    en,
    IN_SENTENCE.reduce((s, [re, to]) => s.replace(re, to), ar),
  ]),
);
export default AR;
