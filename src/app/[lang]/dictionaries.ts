const dictionaries = {
  en: () => import("@/dict/en.json").then((module) => module.default),
  nb: () => import("@/dict/nb.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale.slice(0, 2)]();
