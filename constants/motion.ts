// Motion values copied from the GSAP code in assets/js/main.js on the PHP site.
export const easePower3Out = [0.215, 0.61, 0.355, 1] as const;

// Every reveal starts once the element's top edge has risen a quarter of the screen above the
// bottom, so the visitor sees it animate after scrolling it into view (8% and 15% fired while it
// was still near the edge, so it looked already done). amount 0: a share of a tall block (the PHP site's
// way) left it blank for a long scroll. One shared viewport for Appear, FadeIn and MaskReveal.
export const viewMargin = "0px 0px -25% 0px";
export const revealViewport = { once: true, amount: 0, margin: viewMargin } as const;
