// Devises par pays
export const CURRENCIES = {
    fr: { before: "", after: " € HT" },
    uk: { before: "£", after: "" },
    bfr: { before: "€ ", after: "" },
    nl: { before: "€ ", after: "" },
    bfl: { before: "€ ", after: "" },
    de: { before: "", after: " €" },
    at: { before: "", after: " €" },
    cde: { before: "chf ", after: " exkl. MwSt." },
    cfr: { before: "chf ", after: " ht" },
    es: { before: "", after: " € (sin IVA)" },
    pt: { before: "", after: " € (sem IVA)" },
    it: { before: "", after: " € IVA escl." },
    dk: { before: "", after: " kr." },
    no: { before: "", after: "" },
    se: { before: "", after: " kr" },
    pl: { before: "", after: " zł netto" },
    cz: { before: "", after: " Kč bez DPH" },
    sk: { before: "", after: " €" },
    hu: { before: "", after: " Ft + ÁFA" }
};

// Fonction pour formater un prix avec la devise appropriée
export function formatPrice(price, language) {
    if (!price) return "";
    
    const lowerCaseLanguage = language ? language.toLowerCase() : 'fr';
    const currency = CURRENCIES[lowerCaseLanguage] || CURRENCIES.fr;
    return `${currency.before}${price}${currency.after}`;
} 