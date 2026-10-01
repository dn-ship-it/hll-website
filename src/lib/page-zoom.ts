/**
 * The desktop design zoom set on <html> by the DESIGN_SCALE script in the
 * frontend layout (1 below 1280px). Under it, getBoundingClientRect() and
 * scrollY are in screen pixels while offsetTop / offsetHeight / clientWidth
 * stay in layout pixels; multiply layout pixels by this to compare them.
 */
export function pageZoom() {
  if (typeof document === "undefined") return 1;
  return parseFloat(document.documentElement.style.zoom) || 1;
}
