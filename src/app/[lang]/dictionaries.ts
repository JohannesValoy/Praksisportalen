const dictionaries = {
  en: () => import("@/dict/en.json").then((module) => module.default),
  nb: () => import("@/dict/nb.json").then((module) => module.default),
};

/**
 * The getDictionary function fetches the dictionary for the given locale.
 * @param locale The locale.
 */
export const getDictionary = async (locale: string) =>
  dictionaries[locale.slice(0, 2)]();
