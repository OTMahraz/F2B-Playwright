// Base fixe
const SFDC_BASE = "https://swisslifebp";

// Environnement (recette = UAT, preprod = PREPROD)
const ENV = process.env.ENV || "recette";


// Mapping des environnements Salesforce
const ENV_SUFFIXES: Record<string, string> = {
  recette: "--recette.sandbox.my.salesforce.com/",
  preprod: "--preprod.sandbox.my.salesforce.com/",
};

// URL finale
const BASE_URL = SFDC_BASE + (ENV_SUFFIXES[ENV] ?? ENV_SUFFIXES.recette);

console.log("ENV:", ENV);
console.log("BASE_URL:", BASE_URL);

