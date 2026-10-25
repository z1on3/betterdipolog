export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint (inlined in <head> by the root layout) so the
 * saved or system theme is applied without a light-to-dark flash.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
