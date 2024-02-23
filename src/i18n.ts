import i18next from 'i18next';

const enNs1 = require("./locales/en.json");
const enNs2 = require("./locales/de.json");
const enFallback  = require("./locales/fallback.json");

export const defaultNS = 'en';
export const fallbackNS = 'fallback';

i18next.init({
    debug: true,
    fallbackLng: 'eng',
    defaultNS,
    fallbackNS,
    resources: {
        eng: {
            en: enNs1,
            de: enNs2,
            fallback: enFallback,
        },
    },
});

export default i18next;