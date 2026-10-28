/*! mochi-ui v1.4.4 | MIT */
import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, getCurrentInstance as m, getCurrentScope as h, guardReactiveProps as g, h as _, inject as v, isRef as y, markRaw as b, mergeProps as x, nextTick as S, normalizeClass as C, normalizeProps as w, normalizeStyle as T, onBeforeUnmount as E, onErrorCaptured as D, onMounted as O, onScopeDispose as k, openBlock as A, provide as j, reactive as M, ref as N, renderList as P, renderSlot as F, resolveDynamicComponent as I, shallowRef as L, toDisplayString as R, toValue as z, unref as B, useAttrs as V, useSlots as H, vModelText as U, vShow as W, watch as G, withCtx as ee, withDirectives as te, withKeys as K, withModifiers as q } from "vue";
//#region \0rolldown/runtime.js
var J = Object.defineProperty, ne = (e, t) => {
	let n = {};
	for (var r in e) J(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || J(n, Symbol.toStringTag, { value: "Module" }), n;
}, re = typeof window < "u" && typeof document < "u", ie = "http://www.w3.org/2000/svg", Y = "mc-liquid-refract", ae = "mc-liquid-glass-refraction", oe = "mc-lg-", se = ".mc-liquid-glass", ce = ".mc-liquid-glass--no-refract", le = {
	bezel: 28,
	thickness: 34,
	ior: 1.45,
	dispersion: .35,
	scale: 1,
	blur: .6,
	saturation: 1.6
}, ue = null;
function de() {
	if (!re || typeof document > "u") return !1;
	if (ue !== null) return ue;
	if (!document.body) return !1;
	try {
		let e = document.createElement("div");
		e.style.position = "fixed", e.style.opacity = "0", e.style.pointerEvents = "none", e.style.backdropFilter = "url(#mc-liquid-glass-probe)", e.style.setProperty("-webkit-backdrop-filter", "url(#mc-liquid-glass-probe)"), document.body.appendChild(e);
		let t = getComputedStyle(e), n = t.backdropFilter || t.getPropertyValue("-webkit-backdrop-filter") || "";
		e.remove(), ue = n.includes("url(");
	} catch {
		ue = !1;
	}
	return ue;
}
var fe = .3, pe = .15;
function me(e, t, n) {
	if (e <= 0 || e >= t || n <= 0) return 0;
	let r = fe * t;
	if (e <= r) {
		let t = e / r;
		return n * (1.5 * t - .5 * t * t * t);
	}
	let i = (e - r) / (t - r);
	return n * (1 - 3 * i * i + 2 * i * i * i);
}
function he(e, t) {
	let n = e.length, r = t / (n - 1), i = Infinity, a = -Infinity, o = 0, s = 0;
	for (let t = 1; t < n; t++) {
		let n = (e[t] - e[t - 1]) / r, c = 1 + n;
		c < i && (i = c), c > a && (a = c);
		let l = n > 1e-9 ? 1 : n < -1e-9 ? -1 : 0;
		l !== 0 && (s === 0 ? s = l : l !== s && (o++, s = l));
	}
	let c = e[0], l = e[n - 1], u = o === 1, d = u && c === 0 && Math.abs(l) < 1e-9 && i >= pe, f = i < pe && i < 1 ? Math.max(.05, Math.min(.98, .85 / (1 - i))) : 1;
	return {
		ok: d,
		minJacobian: i,
		maxJacobian: a,
		shrink: f,
		edge: c,
		tail: l,
		unimodal: u
	};
}
function ge(e) {
	let t = Math.max(e.ior, 1), n = Math.PI / 4, r = Math.asin(Math.min(1, Math.sin(n) / t)), i = Math.tan(n - r);
	return (e.bezel * .5 + Math.max(e.thickness, 0) * .5) * i * Math.max(e.scale, 0);
}
function _e(e, t, n) {
	let r = Math.max(e.bezel, .5), i = /* @__PURE__ */ new Float64Array(192), a = ge(e), o = Math.min(t, n) * .35;
	a = Math.max(Math.min(a, o), 0);
	for (let e = 0; e < 8; e++) {
		for (let e = 0; e < 192; e++) i[e] = me(e / 191 * r, r, a);
		let e = he(i, r);
		if (e.ok) break;
		a *= e.shrink;
	}
	let s = 0;
	for (let e = 0; e < 192; e++) i[e] > s && (s = i[e]);
	return {
		offsets: i,
		peak: s
	};
}
var X = .4, ve = .5;
function ye(e, t, n) {
	if (!Number.isFinite(t)) return e;
	let r = Math.max(n - Math.abs(e - t), 0) / n;
	return Math.min(e, t) - r * r * n * .25;
}
function be(e, t, n, r, i, a, o, s, c) {
	let l = Math.min(n, r) / 2, u = Math.min(Math.max(i, .5), l), d = Math.min(Math.max(a, .5), l), f = 1 / u, p = 1 / d, m = (e - n / 2) * f, h = (t - r / 2) * p, g = n / 2 * f, _ = r / 2 * p, v = Math.abs(m) - (g - 1), y = Math.abs(h) - (_ - 1), b = Math.min(u, d), x = o / b, S = s / b, C = Math.max(S - Math.abs(v), 0) / S, w = Math.max(S - Math.abs(y), 0) / S, T = Math.max(v, 0) + C * C * S * .25, E = Math.max(y, 0) + w * w * S * .25, D = v > 0 ? 1 - C * .5 : C * .5, O = y > 0 ? 1 - w * .5 : w * .5, k = Math.max(x - Math.abs(v - y), 0) / x, A = Math.max(v, y) + k * k * x * .25, j = v > y ? 1 - k * .5 : k * .5, M = v > y ? k * .5 : 1 - k * .5, N = Math.max(S - Math.abs(A), 0) / S, P = Math.min(A, 0) - N * N * S * .25, F = A < 0 ? 1 - N * .5 : N * .5, I = Math.sqrt(T * T + E * E), L = I + P - 1, R = 2 * u * d / (u + d), z = -L * R, B = m < 0 ? -1 : 1, V = h < 0 ? -1 : 1, H = T / (I || 1) * D, U = E / (I || 1) * O, W = (H + F * j) * B, G = (U + F * M) * V, ee = W * f, te = G * p, K = Math.sqrt(ee * ee + te * te) || 1, q = Math.abs(e - n / 2) - (n / 2 - u), J = Math.abs(t - r / 2) - (r / 2 - d), ne = .4 * Math.sqrt(q * q + J * J), re = Math.abs(v - y) * (2 / (f + p)) * Math.SQRT1_2, ie = Math.min(-v, -y), Y = Math.min(Math.max(ie / x + .5, 0), 1), ae = Y * (c + ve * re) + (1 - Y) * Number.MAX_VALUE;
	return {
		distance: z,
		nx: ee / K,
		ny: te / K,
		room: ye(ne, ae, 1.5)
	};
}
function xe(e, t, n, r, i, a) {
	let o = Math.max(1, Math.round(e)), s = Math.max(1, Math.round(t)), c = Math.min(Math.max(re && window.devicePixelRatio || 1, 1), 3), l = 1048576, u = o * s * c * c, d = u > l ? Math.sqrt(l / u) : 1, f = Math.max(2, Math.round(o * c * d)), p = Math.max(2, Math.round(s * c * d)), m = document.createElement("canvas");
	m.width = f, m.height = p;
	let h = m.getContext("2d");
	if (!h) return "";
	let g = a.offsets.length, _ = a.peak, v = h.createImageData(f, p), y = v.data, b = Math.max(i.bezel, .5), x = Math.min(Math.max(a.peak * .7, 6), 40), S = Math.min(Math.max(a.peak * .2, 3), 12), C = Math.min(Math.max(a.peak * X, 3), 14);
	for (let e = 0; e < p; e++) {
		let t = (e + .5) / p * s;
		for (let i = 0; i < f; i++) {
			let c = be((i + .5) / f * o, t, o, s, n, r, x, S, C), l = (e * f + i) * 4;
			if (c.distance >= b) {
				y[l] = 128, y[l + 1] = 128, y[l + 2] = 0, y[l + 3] = 255;
				continue;
			}
			let u = Math.min(Math.max(c.distance / b, 0), 1) * (g - 1), d = Math.floor(u), p = Math.min(d + 1, g - 1), m = a.offsets[d] + (a.offsets[p] - a.offsets[d]) * (u - d);
			m = Math.max(0, ye(m, c.room, 1.5));
			let h = _ > 0 ? m / _ : 0, v = -c.nx * h, w = -c.ny * h;
			y[l] = Math.round(128 + 127 * Math.max(-1, Math.min(1, v))), y[l + 1] = Math.round(128 + 127 * Math.max(-1, Math.min(1, w))), y[l + 2] = 0, y[l + 3] = 255;
		}
	}
	return h.putImageData(v, 0, 0), m.toDataURL("image/png");
}
var Se = 255 / 254, Ce = -.003937;
function we(e, t, n, r, i, a) {
	let o = r * 2, s = [], c = Math.min(Math.max(n.dispersion, 0), 1), l = Math.ceil(r * (1 + c)) + 2;
	if (s.push(`<filter id="${e}" x="${-l}" y="${-l}" width="${Math.round(i) + l * 2}" height="${Math.round(a) + l * 2}" color-interpolation-filters="sRGB">`), s.push(`<feGaussianBlur in="SourceGraphic" stdDeviation="${n.blur.toFixed(3)}" result="soft"/>`), s.push(`<feImage href="${t}" x="0" y="0" width="${i}" height="${a}" preserveAspectRatio="none" result="mapRaw"/>`), s.push(`<feComponentTransfer in="mapRaw" result="map"><feFuncR type="linear" slope="${Se.toFixed(6)}" intercept="${Ce}"/><feFuncG type="linear" slope="${Se.toFixed(6)}" intercept="${Ce}"/></feComponentTransfer>`), n.dispersion > .001) {
		let e = o * Math.min(n.dispersion, 1);
		s.push(`<feDisplacementMap in="soft" in2="map" scale="${(o + e).toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dHi"/>`), s.push(`<feDisplacementMap in="soft" in2="map" scale="${o.toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dMid"/>`), s.push(`<feDisplacementMap in="soft" in2="map" scale="${(o - e).toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dLo"/>`), s.push("<feColorMatrix in=\"dHi\" type=\"matrix\" values=\"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1\" result=\"cR\"/>"), s.push("<feColorMatrix in=\"dMid\" type=\"matrix\" values=\"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1\" result=\"cG\"/>"), s.push("<feColorMatrix in=\"dLo\" type=\"matrix\" values=\"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0 1\" result=\"cB\"/>"), s.push("<feBlend in=\"cR\" in2=\"cG\" mode=\"screen\" result=\"rg\"/>"), s.push("<feBlend in=\"rg\" in2=\"cB\" mode=\"screen\" result=\"rgb\"/>"), s.push(`<feColorMatrix in="rgb" type="saturate" values="${n.saturation.toFixed(3)}"/>`);
	} else s.push(`<feDisplacementMap in="soft" in2="map" scale="${o.toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="rgb"/>`), s.push(`<feColorMatrix in="rgb" type="saturate" values="${n.saturation.toFixed(3)}"/>`);
	return s.push("</filter>"), s.join("");
}
var Te = /* @__PURE__ */ new Map(), Ee = /* @__PURE__ */ new Map(), De = null, Oe = null, ke = null, Ae = 0, je = {}, Me = !1;
function Ne() {
	if (!re || !document.body) return null;
	if (De) return De;
	let e = document.createElementNS(ie, "svg");
	e.setAttribute("aria-hidden", "true"), e.setAttribute("width", "0"), e.setAttribute("height", "0"), e.setAttribute("focusable", "false"), e.setAttribute("data-mochi-liquid-glass", ""), e.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
	let t = document.createElementNS(ie, "defs");
	return e.appendChild(t), document.body.appendChild(e), De = t, De;
}
function Pe(e, t, n) {
	let r = e.getPropertyValue(t).trim();
	if (!r) return n;
	let i = parseFloat(r);
	return Number.isFinite(i) ? i : n;
}
function Fe(e, t, n, r) {
	let i = (e.getPropertyValue(t) || "0px").trim().split(/\s+/), a = (e, t) => {
		if (!e) return 0;
		if (e.endsWith("%")) {
			let n = parseFloat(e);
			return Number.isFinite(n) ? n / 100 * t : 0;
		}
		let n = parseFloat(e);
		return Number.isFinite(n) ? n : 0;
	};
	return {
		rx: a(i[0] ?? "", n),
		ry: a(i[1] ?? i[0] ?? "", r)
	};
}
function Ie(e) {
	let t = getComputedStyle(e), n = e.clientWidth, r = e.clientHeight;
	if (n < 2 || r < 2) return null;
	let i = parseFloat(t.getPropertyValue("border-top-width")) || 0, a = Fe(t, "border-top-left-radius", n, r), o = Math.max(a.rx - i, 0), s = Math.max(a.ry - i, 0), c = {
		bezel: Math.min(Pe(t, "--mc-liquid-bezel", le.bezel), Math.min(n, r) / 2),
		thickness: Pe(t, "--mc-liquid-thickness", le.thickness),
		ior: Pe(t, "--mc-liquid-ior", le.ior),
		dispersion: Pe(t, "--mc-liquid-dispersion", le.dispersion),
		scale: Pe(t, "--mc-liquid-refract-scale", le.scale) * (je.scale ?? 1),
		blur: Pe(t, "--mc-liquid-refract-blur", le.blur),
		saturation: Pe(t, "--mc-liquid-sat", le.saturation)
	};
	return je.blur !== void 0 && (c.blur = je.blur), je.saturation !== void 0 && (c.saturation = je.saturation), {
		width: n,
		height: r,
		rx: o,
		ry: s,
		optics: c,
		signature: [
			Math.round(n),
			Math.round(r),
			Math.round(o),
			Math.round(s),
			c.bezel.toFixed(2),
			c.thickness.toFixed(2),
			c.ior.toFixed(3),
			c.dispersion.toFixed(3),
			c.scale.toFixed(3),
			c.blur.toFixed(3),
			c.saturation.toFixed(3)
		].join("|")
	};
}
function Le(e, t) {
	let n = parseFloat(t.opacity);
	if (Number.isFinite(n) && n < 1 || t.filter && t.filter !== "none") return !1;
	let r = t.backdropFilter || t.getPropertyValue("-webkit-backdrop-filter") || "";
	return !(r && r !== "none");
}
function Re(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(36);
}
function ze(e) {
	let t = Ee.get(e);
	t && (--t.refs, t.refs <= 0 && (t.node.remove(), Ee.delete(e)));
}
function Be(e) {
	let t = Ne();
	if (!t) return null;
	let n = Re(e.signature), r = Ee.get(n);
	if (r) return r.refs += 1, n;
	let i = _e(e.optics, e.width, e.height), a = i.peak;
	if (a <= 0) return null;
	let o = xe(e.width, e.height, e.rx, e.ry, e.optics, i);
	if (!o) return null;
	let s = we(`${oe}${n}`, o, e.optics, a, e.width, e.height), c = new DOMParser().parseFromString(`<svg xmlns="${ie}">${s}</svg>`, "image/svg+xml").documentElement.firstElementChild;
	return c ? (t.appendChild(c), Ee.set(n, {
		refs: 1,
		node: c
	}), n) : null;
}
function Ve(e) {
	let t = getComputedStyle(e), n = Ie(e), r = Te.get(e);
	if (!n || !Le(e, t) || n.optics.scale <= 0 || e.matches(ce)) {
		e.style.removeProperty("--mc-liquid-filter"), r && (ze(r.filterId), Te.delete(e));
		return;
	}
	if (r && r.signature === n.signature) return;
	r && ze(r.filterId);
	let i = Be(n);
	i ? (e.style.setProperty("--mc-liquid-filter", `url(#${oe}${i})`), Te.set(e, {
		signature: n.signature,
		filterId: i
	}), Oe?.observe(e)) : (e.style.removeProperty("--mc-liquid-filter"), Te.delete(e));
}
function He(e) {
	let t = Array.from(e.querySelectorAll(se));
	for (let e of t) Ve(e);
	for (let [e, t] of Te) e.isConnected || (ze(t.filterId), Te.delete(e), Oe?.unobserve(e));
}
function Ue(e) {
	re && (Ae || (Ae = requestAnimationFrame(() => {
		Ae = 0, He(e ?? document);
	})));
}
function We(e) {
	return e instanceof Element ? e.matches(se) ? !0 : e.querySelector(se) !== null : !1;
}
function Ge(e) {
	re && de() && He(e ?? document);
}
function Ke(e = {}) {
	if (!re) return !1;
	if (je = {
		...je,
		...e
	}, !document.body) return typeof document.addEventListener == "function" && document.addEventListener("DOMContentLoaded", () => Ke(e), { once: !0 }), !1;
	let t = de();
	return document.documentElement.classList.toggle(Y, t), t ? Me ? (Ue(), !0) : (Ne(), typeof ResizeObserver < "u" && (Oe = new ResizeObserver((e) => {
		for (let t of e) {
			let e = t.target;
			Ve(e);
		}
	})), typeof MutationObserver < "u" && (ke = new MutationObserver((e) => {
		for (let t of e) if (t.type === "attributes") {
			let e = t.target;
			if (e instanceof Element && We(e)) {
				Ue();
				return;
			}
		} else {
			for (let e of Array.from(t.addedNodes)) if (We(e)) {
				Ue();
				return;
			}
			for (let e of Array.from(t.removedNodes)) if (We(e)) {
				Ue();
				return;
			}
		}
	}), ke.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["class"]
	})), Me = !0, He(document), !0) : !1;
}
function qe() {
	if (re) {
		Ae && (cancelAnimationFrame(Ae), Ae = 0), ke?.disconnect(), ke = null, Oe?.disconnect(), Oe = null, Me = !1;
		for (let [, e] of Te) ze(e.filterId);
		Te.clear(), Ee.clear(), document.querySelectorAll("svg[data-mochi-liquid-glass]").forEach((e) => e.remove()), De = null, document.documentElement.classList.remove(Y);
	}
}
//#endregion
//#region src/utils/format.ts
var Je = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB"
];
function Ye(e, t = 1, n = "B", r) {
	if (!Number.isFinite(e)) return `0 ${n}`;
	let i = e < 0 ? "-" : "", a = Math.abs(e);
	if (a < 1) return `${i}0 ${n}`;
	let o = Math.min(Math.floor(Math.log(a) / Math.log(1024)), Je.length - 1);
	return `${i}${tt(a / 1024 ** o, o === 0 ? 0 : t, r)} ${n === "B" ? Je[o] : n}`;
}
function Xe(e, t) {
	if (!Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	if (n < 1e3) return `${tt(Math.round(e), 0, t)}ms`;
	let r = Math.floor(n / 1e3), i = r % 60, a = Math.floor(r / 60) % 60, o = Math.floor(r / 3600) % 24, s = Math.floor(r / 86400), c = [];
	return s && c.push(`${s}d`), o && c.push(`${o}h`), a && c.push(`${a}m`), (i || !c.length) && c.push(`${i}s`), `${e < 0 ? "-" : ""}${c.join(" ")}`;
}
function Ze(e, t = Date.now(), n) {
	let r = nt(e);
	if (!r) return "—";
	let i = nt(t) ?? /* @__PURE__ */ new Date(), a = r.getTime() - i.getTime(), o = Math.abs(a);
	for (let [e, t] of [
		["year", 31536e6],
		["month", 2592e6],
		["week", 6048e5],
		["day", 864e5],
		["hour", 36e5],
		["minute", 6e4],
		["second", 1e3]
	]) if (o >= t || e === "second") {
		let r = Math.round(a / t);
		try {
			return new Intl.RelativeTimeFormat(n, { numeric: "auto" }).format(r, e);
		} catch {
			return `${r} ${e}`;
		}
	}
	return "—";
}
function Qe(e, t = 0, n) {
	return Number.isFinite(e) ? `${tt(e * 100, t, n)}%` : "—";
}
function $e(e, t) {
	if (!Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	if (n < 1e3) return tt(e, 0, t);
	for (let [r, i] of [
		[0xe8d4a51000, "T"],
		[1e9, "B"],
		[1e6, "M"],
		[1e3, "K"]
	]) if (n >= r) {
		let n = e / r;
		return `${tt(n, +(Math.abs(n) < 10), t)}${i}`;
	}
	return tt(e, 0, t);
}
function et(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function tt(e, t, n) {
	try {
		return new Intl.NumberFormat(n, {
			minimumFractionDigits: 0,
			maximumFractionDigits: Math.max(0, t)
		}).format(e);
	} catch {
		return e.toFixed(Math.max(0, t));
	}
}
function nt(e) {
	if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
	if (typeof e == "number") {
		let t = new Date(e);
		return Number.isNaN(t.getTime()) ? null : t;
	}
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
//#endregion
//#region src/utils/contrast.ts
function rt(e) {
	if (!e) return null;
	let t = e.trim().toLowerCase(), n = t.match(/^#([0-9a-f]{3,8})$/);
	if (n) {
		let e = n[1];
		if (e.length === 3 || e.length === 4) {
			let [t, n, r, i] = e.split("");
			return {
				r: parseInt(t + t, 16),
				g: parseInt(n + n, 16),
				b: parseInt(r + r, 16),
				a: i ? parseInt(i + i, 16) / 255 : 1
			};
		}
		return e.length === 6 || e.length === 8 ? {
			r: parseInt(e.slice(0, 2), 16),
			g: parseInt(e.slice(2, 4), 16),
			b: parseInt(e.slice(4, 6), 16),
			a: e.length === 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1
		} : null;
	}
	let r = t.match(/^rgba?\(([^)]+)\)$/);
	if (r) {
		let e = r[1].split(/[\s,/]+/).filter(Boolean);
		if (e.length < 3) return null;
		let t = (e) => e.endsWith("%") ? parseFloat(e) / 100 * 255 : parseFloat(e), n = e[3];
		return {
			r: t(e[0]),
			g: t(e[1]),
			b: t(e[2]),
			a: n === void 0 ? 1 : n.endsWith("%") ? parseFloat(n) / 100 : parseFloat(n)
		};
	}
	let i = t.match(/^hsla?\(([^)]+)\)$/);
	if (i) {
		let e = i[1].split(/[\s,/]+/).filter(Boolean);
		if (e.length < 3) return null;
		let t = e[0], n = e[1], r = e[2];
		if (it(t) || it(n) || it(r)) return null;
		let a = (parseFloat(t) % 360 + 360) % 360, o = parseFloat(n) / 100, s = parseFloat(r) / 100;
		if (Number.isNaN(a) || Number.isNaN(o) || Number.isNaN(s)) return null;
		let c = e[3], [l, u, d] = mt(a, o, s);
		return {
			r: l,
			g: u,
			b: d,
			a: c === void 0 ? 1 : c.endsWith("%") ? parseFloat(c) / 100 : parseFloat(c)
		};
	}
	let a = t.match(/^oklch\(([^)]+)\)$/);
	if (a) {
		let e = a[1].split(/[\s,/]+/).filter(Boolean);
		if (e.length < 3 || e.some(it)) return null;
		let t = e[0].endsWith("%") ? parseFloat(e[0]) / 100 : parseFloat(e[0]), n = e[1].endsWith("%") ? parseFloat(e[1]) / 100 * .4 : parseFloat(e[1]), r = (parseFloat(e[2]) % 360 + 360) % 360;
		if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r)) return null;
		let i = e[3], [o, s, c] = at(t, n, r);
		return {
			r: o,
			g: s,
			b: c,
			a: i === void 0 ? 1 : i.endsWith("%") ? parseFloat(i) / 100 : parseFloat(i)
		};
	}
	let o = t.match(/^oklab\(([^)]+)\)$/);
	if (o) {
		let e = o[1].split(/[\s,/]+/).filter(Boolean);
		if (e.length < 3 || e.some(it)) return null;
		let t = e[0].endsWith("%") ? parseFloat(e[0]) / 100 : parseFloat(e[0]), n = e[1].endsWith("%") ? parseFloat(e[1]) / 100 * .4 : parseFloat(e[1]), r = e[2].endsWith("%") ? parseFloat(e[2]) / 100 * .4 : parseFloat(e[2]);
		if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r)) return null;
		let i = e[3], [a, s, c] = ot(t, n, r);
		return {
			r: a,
			g: s,
			b: c,
			a: i === void 0 ? 1 : i.endsWith("%") ? parseFloat(i) / 100 : parseFloat(i)
		};
	}
	return null;
}
var it = (e) => /calc\(|\bvar\(/.test(e);
function at(e, t, n) {
	let r = n * Math.PI / 180;
	return ot(e, t * Math.cos(r), t * Math.sin(r));
}
function ot(e, t, n) {
	let r = e + .3963377774 * t + .2158037573 * n, i = e - .1055613458 * t - .0638541728 * n, a = e - .0894841775 * t - 1.291485548 * n, o = r ** 3, s = i ** 3, c = a ** 3;
	return [
		4.0767416621 * o - 3.3077115913 * s + .2309699292 * c,
		-1.2684380046 * o + 2.6097574011 * s - .3413193965 * c,
		-.0041960863 * o - .7034186147 * s + 1.707614701 * c
	].map((e) => {
		let t = e <= .0031308 ? e * 12.92 : 1.055 * Math.max(e, 0) ** (1 / 2.4) - .055;
		return Math.min(255, Math.max(0, t * 255));
	});
}
function st(e) {
	let t = typeof e == "string" ? rt(e) : e;
	if (!t) return 0;
	let [n, r, i] = [
		t.r,
		t.g,
		t.b
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * n + .7152 * r + .0722 * i;
}
function ct(e, t) {
	let n = rt(e), r = rt(t);
	if (!n || !r) return 0;
	let i = st(pt(n, r)), a = st(r), o = Math.max(i, a), s = Math.min(i, a);
	return (o + .05) / (s + .05);
}
function lt(e, t) {
	let n = ct(e, t), r = {
		ratio: Math.round(n * 100) / 100,
		aa: n >= 4.5,
		aaLarge: n >= 3,
		aaa: n >= 7
	}, i = ut(t);
	return i && (r.suggestion = i), r;
}
function ut(e) {
	if (rt(e)) return ct("#ffffff", e) >= ct("#111111", e) ? "#ffffff" : "#111111";
}
function dt(e) {
	let t = /(?:repeating-)?(?:linear|radial|conic)-gradient\(([^()]*(?:\([^()]*\)[^()]*)*)\)/.exec(e)?.[1];
	if (!t) return [];
	let n = [], r = 0, i = "";
	for (let e of t) e === "(" && r++, e === ")" && r--, e === "," && r === 0 ? (n.push(i), i = "") : i += e;
	n.push(i);
	let a = [];
	for (let e of n) {
		let t = e.trim().match(/^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^)]*\)|#[0-9a-f]{3,8}/i)?.[0];
		t && a.push(t);
	}
	return a;
}
function ft(e, t) {
	if (!e.length || !t.length) return;
	let n, r = -1;
	for (let i of t) {
		let t = Infinity;
		for (let n of e) {
			let e = ct(i, n);
			if (e <= 0) {
				t = 0;
				break;
			}
			t = Math.min(t, e);
		}
		t > r && (r = t, n = i);
	}
	return r > 0 ? n : void 0;
}
function pt(e, t) {
	let n = e.a;
	return {
		r: e.r * n + t.r * (1 - n),
		g: e.g * n + t.g * (1 - n),
		b: e.b * n + t.b * (1 - n),
		a: 1
	};
}
function mt(e, t, n) {
	let r = (1 - Math.abs(2 * n - 1)) * t, i = r * (1 - Math.abs(e / 60 % 2 - 1)), a = n - r / 2, o;
	return o = e < 60 ? [
		r,
		i,
		0
	] : e < 120 ? [
		i,
		r,
		0
	] : e < 180 ? [
		0,
		r,
		i
	] : e < 240 ? [
		0,
		i,
		r
	] : e < 300 ? [
		i,
		0,
		r
	] : [
		r,
		0,
		i
	], [
		Math.round((o[0] + a) * 255),
		Math.round((o[1] + a) * 255),
		Math.round((o[2] + a) * 255)
	];
}
//#endregion
//#region src/utils/storage.ts
function ht() {
	let e = /* @__PURE__ */ new Map(), t = null;
	try {
		if (typeof window < "u" && window.localStorage) {
			let e = "__mochi_probe__";
			window.localStorage.setItem(e, "1"), window.localStorage.removeItem(e), t = window.localStorage;
		}
	} catch {
		t = null;
	}
	return {
		getItem(n) {
			try {
				return t ? t.getItem(n) : e.get(n) ?? null;
			} catch {
				return e.get(n) ?? null;
			}
		},
		setItem(n, r) {
			e.set(n, r);
			try {
				t?.setItem(n, r);
			} catch {}
		},
		removeItem(n) {
			e.delete(n);
			try {
				t?.removeItem(n);
			} catch {}
		},
		clear() {
			e.clear();
			try {
				t?.clear();
			} catch {}
		},
		key(n) {
			try {
				let e = t?.key(n) ?? null;
				if (e) return e;
			} catch {}
			return Array.from(e.keys())[n] ?? null;
		},
		get length() {
			try {
				return t ? t.length : e.size;
			} catch {
				return e.size;
			}
		},
		persistent: t !== null
	};
}
var gt = ht();
function _t(e, t, n = gt) {
	try {
		let r = n.getItem(e);
		return r === null ? t : JSON.parse(r);
	} catch {
		return t;
	}
}
function vt(e, t, n = gt) {
	try {
		return n.setItem(e, JSON.stringify(t)), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/utils/keys.ts
function yt(e) {
	return e.key === "Enter" || e.key === " " || e.key === "Spacebar";
}
function bt(e, t) {
	return !yt(e) || !t ? !1 : (e.preventDefault(), t.click(), !0);
}
typeof globalThis.requestAnimationFrame != "function" && (globalThis.requestAnimationFrame = ((e) => setTimeout(() => e(Date.now()), 16))), typeof globalThis.cancelAnimationFrame != "function" && (globalThis.cancelAnimationFrame = ((e) => clearTimeout(e)));
var xt = {
	default: "var(--mc-text-3)",
	primary: "hsl(var(--mc-h) var(--mc-s) 62%)",
	accent: "var(--mc-accent)",
	success: "var(--mc-success)",
	warning: "var(--mc-warning)",
	danger: "var(--mc-danger)",
	info: "var(--mc-info)",
	brand: "var(--mc-gradient-brand)"
};
function St(e) {
	if (e) return xt[e] ?? e;
}
function Ct(e) {
	return Object.prototype.hasOwnProperty.call(xt, e);
}
var wt = typeof window < "u" && typeof document < "u";
function Tt(e) {
	return !!e && typeof e == "object" && "nodeType" in e && e.nodeType === 1;
}
function Et(e) {
	return wt ? window.requestAnimationFrame(e) : setTimeout(e, 16);
}
function Dt(e) {
	Et(() => Et(e));
}
function Ot(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function kt(e) {
	return Array.from(new Set(e));
}
function At(e) {
	return Array.isArray(e) ? e : [e];
}
function jt(e, t) {
	if (e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => jt(e, t[n]));
	let n = Object.keys(e), r = Object.keys(t);
	return n.length === r.length && n.every((n) => Object.prototype.hasOwnProperty.call(t, n) && jt(e[n], t[n]));
}
function Mt(e, t) {
	try {
		return new Intl.NumberFormat(t).format(e);
	} catch {
		return String(e);
	}
}
function Nt(e, t = "yyyy-MM-dd", n = "en-US") {
	let r = {
		yyyy: String(e.getFullYear()),
		yy: String(e.getFullYear()).slice(-2),
		MM: String(e.getMonth() + 1).padStart(2, "0"),
		M: String(e.getMonth() + 1),
		dd: String(e.getDate()).padStart(2, "0"),
		d: String(e.getDate()),
		HH: String(e.getHours()).padStart(2, "0"),
		H: String(e.getHours()),
		mm: String(e.getMinutes()).padStart(2, "0"),
		m: String(e.getMinutes()),
		ss: String(e.getSeconds()).padStart(2, "0"),
		s: String(e.getSeconds())
	};
	return t.replace(/yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s/g, (e) => r[e] ?? e);
}
function Pt(e) {
	return e.replace(/(-\w)/g, (e) => e[1].toUpperCase());
}
function Ft(e) {
	return e.replace(/-(\w)/g, (e, t) => t.toUpperCase());
}
//#endregion
//#region src/utils/cx.ts
function Z(...e) {
	let t = [];
	for (let n of e) if (n) {
		if (typeof n == "string" || typeof n == "number") t.push(String(n));
		else if (Array.isArray(n)) {
			let e = Z(...n);
			e && t.push(e);
		} else if (typeof n == "object") for (let e in n) n[e] && t.push(e);
	}
	return t.join(" ");
}
//#endregion
//#region src/components/affix/Affix.vue?vue&type=script&setup=true&lang.ts
var It = ["aria-disabled"], Lt = { class: "mc-affix__body" }, Rt = /*@__PURE__*/ p({
	name: "MochiAffix",
	__name: "Affix",
	props: {
		target: { default: null },
		scrollTarget: { default: null },
		offsetTop: { default: 0 },
		offsetBottom: { default: 0 },
		placeholder: {
			type: Boolean,
			default: !0
		},
		zIndex: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = N(null), o = N(null), u = N(!1), d = N(0), f = N({
			top: 0,
			left: 0,
			width: 0
		});
		function p(e) {
			return e ? typeof e == "string" ? wt ? document.querySelector(e) : null : e : null;
		}
		function m(e) {
			return e === window;
		}
		function h() {
			return p(n.scrollTarget) ?? window;
		}
		function g(e) {
			return m(e) ? window.scrollY || document.documentElement.scrollTop || 0 : e.scrollTop;
		}
		function _(e) {
			return m(e) ? {
				width: window.innerWidth,
				height: window.innerHeight
			} : {
				width: e.clientWidth,
				height: e.clientHeight
			};
		}
		function v() {
			if (!wt) return;
			let e = p(n.target) ?? o.value ?? a.value;
			if (!e) return;
			let t = h(), i = _(t), s = m(t) ? null : t.getBoundingClientRect(), c = s ? s.top : 0, l = e.getBoundingClientRect(), v = g(t), y = l.top - c + v, b = l.height || 0, x = !1, S = "top";
			n.offsetBottom > 0 && v + i.height - n.offsetBottom >= y + b && (x = !0, S = "bottom"), !x && v + n.offsetTop >= y && (x = !0, S = "top"), x !== u.value && (u.value = x, r("change", x)), x && (d.value = b, f.value = {
				top: S === "top" ? c + n.offsetTop : c + i.height - b - n.offsetBottom,
				left: l.left,
				width: l.width
			});
		}
		let y = 0;
		function b() {
			y || (y = requestAnimationFrame(() => {
				y = 0, v();
			}));
		}
		function x() {
			b();
		}
		function S() {
			wt && (w(), h().addEventListener("scroll", x, { passive: !0 }), window.addEventListener("resize", b), v());
		}
		function w() {
			wt && (h().removeEventListener("scroll", x), window.removeEventListener("resize", b), y && (cancelAnimationFrame(y), y = 0));
		}
		G(() => [n.target, n.scrollTarget], S), O(S), E(w);
		let D = i(() => {
			if (u.value) return {
				position: "fixed",
				top: `${f.value.top}px`,
				left: `${f.value.left}px`,
				width: `${f.value.width}px`,
				zIndex: n.zIndex ?? "var(--mc-z-sticky)"
			};
		}), k = i(() => Z("mc-affix", {
			"is-affixed": u.value,
			"is-disabled": n.disabled,
			"has-placeholder": u.value && n.placeholder
		}, n.customClass)), j = i(() => Z("mc-affix__content", "mc-grain-overlay", { "is-disabled": n.disabled }));
		return (t, n) => (A(), c("div", {
			ref_key: "root",
			ref: a,
			class: C(k.value)
		}, [u.value && e.placeholder ? (A(), c("div", {
			key: 0,
			class: "mc-affix__placeholder",
			style: T({ height: `${d.value}px` }),
			"aria-hidden": "true"
		}, null, 4)) : s("", !0), l("div", {
			ref_key: "content",
			ref: o,
			class: C(["mc-affix__content", j.value]),
			style: T(D.value),
			"aria-disabled": e.disabled ? "true" : void 0
		}, [
			n[0] || (n[0] = l("span", {
				class: "mc-affix__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			n[1] || (n[1] = l("span", {
				class: "mc-affix__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", Lt, [F(t.$slots, "default", {}, void 0, !0)])
		], 14, It)], 2));
	}
}), Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, zt = /*#__PURE__*/ Q(Rt, [["__scopeId", "data-v-d2823e4c"]]), Bt = {
	check: ["M20 6 9 17l-5-5"],
	"check-double": ["M2 12.5 6 16.5 13 9.5", "M12 15.5 15 18.5 22 11.5"],
	close: ["M18 6 6 18", "M6 6l12 12"],
	minus: ["M5 12h14"],
	plus: ["M12 5v14", "M5 12h14"],
	"more-horizontal": [
		"M6 12h.01",
		"M12 12h.01",
		"M18 12h.01"
	],
	"more-vertical": [
		"M12 6h.01",
		"M12 12h.01",
		"M12 18h.01"
	],
	"chevron-up": ["m6 15 6-6 6 6"],
	"chevron-down": ["m6 9 6 6 6-6"],
	"chevron-left": ["m15 18-6-6 6-6"],
	"chevron-right": ["m9 18 6-6-6-6"],
	"chevrons-up-down": ["m7 15 5 5 5-5", "m7 9 5-5 5 5"],
	"chevrons-left-right": ["m9 7-5 5 5 5", "m15 7 5 5-5 5"],
	"arrow-up": ["M12 19V5", "m5 12 7-7 7 7"],
	"arrow-down": ["M12 5v14", "m19 12-7 7-7-7"],
	"arrow-left": ["M19 12H5", "m12 19-7-7 7-7"],
	"arrow-right": ["M5 12h14", "m12 5 7 7-7 7"],
	"arrow-up-right": ["M7 17 17 7", "M7 7h10v10"],
	"arrow-down-left": ["M17 7 7 17", "M17 17H7V7"],
	"arrow-left-right": [
		"M8 7 3 12l5 5",
		"M16 7l5 5-5 5",
		"M3 12h18"
	],
	"circle-check": ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "m8.5 12 2.5 2.5 4.5-5"],
	"circle-x": [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"m9 9 6 6",
		"m15 9-6 6"
	],
	"circle-plus": [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M12 8v8",
		"M8 12h8"
	],
	"circle-minus": ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M8 12h8"],
	"circle-help": [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M9.6 9.2a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5",
		"M12 16.5h.01"
	],
	info: [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M12 11v5",
		"M12 8h.01"
	],
	"alert-circle": [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M12 8v4.5",
		"M12 16h.01"
	],
	"alert-triangle": [
		"M10.3 4.3 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z",
		"M12 9v4",
		"M12 16.5h.01"
	],
	"check-square": ["M5 5h14v14H5Z", "m9 12 2 2 4-4"],
	square: ["M5 5h14v14H5Z"],
	circle: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"],
	menu: [
		"M4 7h16",
		"M4 12h16",
		"M4 17h16"
	],
	home: ["m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2Z"],
	back: ["M19 12H5", "m12 19-7-7 7-7"],
	"corner-up-left": ["M9 14 4 9l5-5", "M4 9h10a6 6 0 0 1 6 6v5"],
	external: [
		"M14 4h6v6",
		"M20 4l-9 9",
		"M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
	],
	bookmark: ["M6 4h12v16l-6-4-6 4Z"],
	flag: ["M5 21V4", "M5 5h11l-1.6 3.5L16 12H5"],
	send: ["M21 3 10.5 13.5", "M21 3l-6.5 18-4-8-8-4Z"],
	reply: ["M9 14 4 9l5-5", "M4 9h9a7 7 0 0 1 7 7v4"],
	quote: ["M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3", "M19 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v1a3 3 0 0 1-3 3"],
	hash: [
		"M5 9h14",
		"M5 15h14",
		"M11 4 9 20",
		"M16 4l-2 16"
	],
	search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z", "m20 20-3.6-3.6"],
	edit: ["m4 20 4.6-1L18.6 9a2.1 2.1 0 0 0-3-3L5.6 15.6Z", "m14.4 6.6 3 3"],
	trash: [
		"M4 7h16",
		"M10 4h4",
		"M6 7l1 13h10l1-13",
		"M10 11v6",
		"M14 11v6"
	],
	copy: ["M9 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"],
	download: [
		"M12 4v11",
		"m7.5 10.5 4.5 4.5 4.5-4.5",
		"M4 19h16"
	],
	upload: [
		"M12 16V5",
		"m7.5 9.5 4.5-4.5 4.5 4.5",
		"M4 19h16"
	],
	refresh: ["M20 11a8 8 0 1 0-1.6 5.4", "M20 4v7h-7"],
	"rotate-cw": ["M21 12a9 9 0 1 1-2.6-6.4", "M21 3v6h-6"],
	"rotate-ccw": ["M3 12a9 9 0 1 0 2.6-6.4", "M3 3v6h6"],
	filter: ["M3 5h18l-7 8v6l-4 2v-8Z"],
	sliders: [
		"M4 6h10",
		"M18 6h2",
		"M4 12h2",
		"M10 12h10",
		"M4 18h8",
		"M16 18h4",
		"M14 4v4",
		"M6 10v4",
		"M12 16v4"
	],
	settings: ["M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", "M19.1 14.2a1.5 1.5 0 0 0 .3 1.7l.1.1a1.8 1.8 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.6 1.1v.2a1.8 1.8 0 1 1-3.6 0v-.1a1.5 1.5 0 0 0-2.6-1.1l-.1.1a1.8 1.8 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1.1-2.6h-.2a1.8 1.8 0 1 1 0-3.6h.1a1.5 1.5 0 0 0 1.1-2.6l-.1-.1a1.8 1.8 0 1 1 2.6-2.6l.1.1a1.5 1.5 0 0 0 1.7.3h.1a1.5 1.5 0 0 0 .9-1.4v-.2a1.8 1.8 0 1 1 3.6 0v.1a1.5 1.5 0 0 0 2.6 1.1l.1-.1a1.8 1.8 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0 1.1 2.6h.2a1.8 1.8 0 1 1 0 3.6h-.1a1.5 1.5 0 0 0-1.4.9Z"],
	wand: [
		"m4 20 9-9",
		"M15.5 3.5 16 6l2.5.5L16 7l-.5 2.5L15 7l-2.5-.5L15 6Z",
		"m18.5 12 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z"
	],
	save: [
		"M5 4h11l3 3v13H5Z",
		"M8 4v6h7V4",
		"M8 20v-6h8v6"
	],
	printer: [
		"M7 8V4h10v4",
		"M5 8h14a1 1 0 0 1 1 1v7h-4v4H8v-4H4V9a1 1 0 0 1 1-1Z",
		"M8 16h8"
	],
	share: [
		"M12 15V4",
		"m8 7 4-3 4 3",
		"M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"
	],
	link: ["M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1", "M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1"],
	paperclip: ["M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3l7.8-7.8"],
	maximize: [
		"M4 9V4h5",
		"M20 15v5h-5",
		"M20 9V4h-5",
		"M4 15v5h5"
	],
	minimize: [
		"M9 4v5H4",
		"M15 20v-5h5",
		"M15 4v5h5",
		"M9 20v-5H4"
	],
	expand: [
		"m9 3-6 6",
		"m15 3 6 6",
		"m9 21-6-6",
		"m15 21 6-6"
	],
	grip: [
		"M9 6h.01",
		"M9 12h.01",
		"M9 18h.01",
		"M15 6h.01",
		"M15 12h.01",
		"M15 18h.01"
	],
	"grip-vertical": [
		"M9 6h.01",
		"M9 12h.01",
		"M9 18h.01",
		"M15 6h.01",
		"M15 12h.01",
		"M15 18h.01"
	],
	play: ["m8 5 11 7-11 7Z"],
	pause: ["M8 5v14", "M16 5v14"],
	"skip-forward": ["m5 5 10 7-10 7Z", "M19 5v14"],
	"skip-back": ["m19 5-10 7 10 7Z", "M5 5v14"],
	volume: ["M4 9v6h4l5 4V5L8 9Z", "M17 9.5a3.5 3.5 0 0 1 0 5"],
	"volume-x": [
		"M4 9v6h4l5 4V5L8 9Z",
		"m17 10 4 4",
		"m21 10-4 4"
	],
	camera: ["M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z", "M12 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"],
	mic: [
		"M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z",
		"M5 11a7 7 0 0 0 14 0",
		"M12 18v3"
	],
	image: [
		"M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
		"m3.5 16 4.5-4.5 3 3L15 10l5.5 5.5",
		"M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
	],
	film: [
		"M4 5h16v14H4Z",
		"M8 5v14",
		"M16 5v14",
		"M4 9.5h4",
		"M4 14.5h4",
		"M16 9.5h4",
		"M16 14.5h4"
	],
	music: [
		"M9 18V6l10-2v12",
		"M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
		"M19 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
	],
	file: ["M6 3h8l5 5v13H6Z", "M14 3v5h5"],
	"file-text": [
		"M6 3h8l5 5v13H6Z",
		"M14 3v5h5",
		"M9 13h6",
		"M9 17h4"
	],
	folder: ["M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"],
	clipboard: [
		"M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1Z",
		"M9 5H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2",
		"M9 11h6",
		"M9 15h4"
	],
	archive: [
		"M4 7h16v13H4Z",
		"M3 4h18v3H3Z",
		"M10 11h4"
	],
	paperclipbox: ["M4 7h16v13H4Z", "M9 12h6"],
	code: ["m9 7-5 5 5 5", "m15 7 5 5-5 5"],
	terminal: [
		"M5 5h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
		"m8 10 2.5 2.5L8 15",
		"M13 15h4"
	],
	database: [
		"M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z",
		"M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6",
		"M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
	],
	cpu: [
		"M8 8h8v8H8Z",
		"M5 10h3",
		"M5 14h3",
		"M16 10h3",
		"M16 14h3",
		"M10 5v3",
		"M14 5v3",
		"M10 16v3",
		"M14 16v3"
	],
	server: [
		"M4 4h16v6H4Z",
		"M4 14h16v6H4Z",
		"M7.5 7h.01",
		"M7.5 17h.01"
	],
	cloud: ["M7 18a4 4 0 0 1 .6-8 6 6 0 0 1 11.4 1.8A3.6 3.6 0 0 1 18 18Z"],
	activity: ["M3 12h4l3 8 4-16 3 8h4"],
	"chart-bar": [
		"M5 20V10",
		"M12 20V4",
		"M19 20v-7"
	],
	"chart-line": [
		"M4 19V5",
		"M4 19h16",
		"m7 15 3.5-4 3 2.5L20 7"
	],
	pie: ["M12 3a9 9 0 1 0 9 9h-9Z", "M15 3.5A9 9 0 0 1 20.5 9H15Z"],
	"pie-chart": ["M11 3.5A8.5 8.5 0 1 0 20.5 13H11V3.5Z", "M13.5 2.2A9 9 0 0 1 21.8 10.5h-8.3V2.2Z"],
	"trending-up": ["m3 17 6-6 4 4 8-8", "M15 7h6v6"],
	"trending-down": ["m3 7 6 6 4-4 8 8", "M15 17h6v-6"],
	"git-branch": [
		"M6 4v10",
		"M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
		"M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
		"M18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
		"M18 8v1a4 4 0 0 1-4 4H8"
	],
	layers: ["m12 3 9 5-9 5-9-5Z", "m3 13 9 5 9-5"],
	grid: [
		"M4 4h7v7H4Z",
		"M13 4h7v7h-7Z",
		"M4 13h7v7H4Z",
		"M13 13h7v7h-7Z"
	],
	list: [
		"M4 6h16",
		"M4 12h16",
		"M4 18h16"
	],
	table: [
		"M4 5h16v14H4Z",
		"M4 10h16",
		"M10 10v9"
	],
	layout: [
		"M4 4h16v16H4Z",
		"M4 9h16",
		"M10 9v11"
	],
	columns: [
		"M4 4h16v16H4Z",
		"M10 4v16",
		"M16 4v16"
	],
	sidebar: ["M4 4h16v16H4Z", "M9 4v16"],
	box: [
		"m12 3 8 4.5v9L12 21l-8-4.5v-9Z",
		"m4 7.5 8 4.5 8-4.5",
		"M12 12v9"
	],
	bell: ["M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8", "M13.7 21a2 2 0 0 1-3.4 0"],
	"bell-off": [
		"M8.7 4.6A6 6 0 0 1 18 8c0 2.5.3 4.3.8 5.6M5.9 6.6A6 6 0 0 0 6 8c0 7-3 8-3 8h14",
		"M13.7 21a2 2 0 0 1-3.4 0",
		"M2 2l20 20"
	],
	mail: ["M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z", "m3 7 9 6 9-6"],
	"at-sign": ["M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z", "M15.5 12v1.5a2 2 0 0 0 4 0V12a7.5 7.5 0 1 0-3 6"],
	phone: ["M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4.5 5a2 2 0 0 1 2-2Z"],
	message: ["M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8l-5 4V6a1 1 0 0 1 1-1Z"],
	"message-circle": [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M8.5 10.5h7",
		"M8.5 13.5h4"
	],
	"messages-square": [
		"M4 5h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8l-4 3V6a1 1 0 0 1 1-1Z",
		"M20 9h-7a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v3l3-3h3a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Z",
		"M15 14h3"
	],
	globe: [
		"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
		"M3.5 9h17",
		"M3.5 15h17",
		"M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"
	],
	users: [
		"M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
		"M2.5 20a6.5 6.5 0 0 1 13 0",
		"M17 11a3 3 0 1 0 0-6",
		"M16 14.5a5.5 5.5 0 0 1 5.5 5.5"
	],
	user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4.5 20a7.5 7.5 0 0 1 15 0"],
	star: ["m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9Z"],
	heart: ["M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z"],
	eye: ["M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
	"eye-off": [
		"M3 3l18 18",
		"M10.6 6.2A9.9 9.9 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.3 3.9",
		"M6.3 6.6A17 17 0 0 0 2 12s3.6 6 10 6c1.4 0 2.7-.3 3.9-.9"
	],
	lock: ["M6 11h12v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z", "M8.5 11V7.5a3.5 3.5 0 0 1 7 0V11"],
	unlock: ["M6 11h12v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Z", "M8.5 11V7.5a3.5 3.5 0 0 1 6.9-1.1"],
	key: ["M15.5 9.5a4 4 0 1 0-3.9 5.1L4 22l2-2 2 2 2-2 2 2 1.4-1.4-2-2 1-1-1.5-1.5", "M15.5 7.5h.01"],
	shield: ["M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"],
	"shield-check": ["M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z", "m9 12 2 2 4-4"],
	gift: [
		"M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z",
		"M3 7h18v4H3Z",
		"M12 7v14",
		"M12 7S9.5 3 7.5 4.2 9 7 12 7Z",
		"M12 7s2.5-4 4.5-2.8S15 7 12 7Z"
	],
	crown: ["M4 18h16", "M4 18 3 7l5 4 4-6 4 6 5-4-1 11Z"],
	"shopping-bag": ["M6 8h12l1 12H5Z", "M9 8V6a3 3 0 0 1 6 0v2"],
	cart: [
		"M3 4h2l2.5 11h10L20 7H6",
		"M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
		"M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
	],
	"credit-card": [
		"M3 6h18v12H3Z",
		"M3 10h18",
		"M7 15h3"
	],
	briefcase: [
		"M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z",
		"M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2",
		"M4 13h16"
	],
	clock: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M12 7v5l3 2"],
	calendar: [
		"M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
		"M8 3v4",
		"M16 3v4",
		"M3 10h18"
	],
	timer: [
		"M12 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z",
		"M12 12v4",
		"M9 2h6",
		"M12 2v2"
	],
	hourglass: ["M7 3h10v4l-5 5 5 5v4H7v-4l5-5-5-5Z"],
	"calendar-plus": [
		"M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
		"M8 3v4",
		"M16 3v4",
		"M3 10h18",
		"M12 13v5",
		"M9.5 15.5h5"
	],
	inbox: ["M4 13h4l1.5 2.5h5L16 13h4", "M4 13 6.6 5.6A2 2 0 0 1 8.5 4.2h7a2 2 0 0 1 1.9 1.4L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"],
	wind: [
		"M3 8h10a2.5 2.5 0 1 0-2.5-2.5",
		"M3 12h13a3 3 0 1 1-3 3",
		"M3 16h8a2 2 0 1 1-2 2"
	],
	palette: [
		"M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.6-1.3-.3-.4-.4-.8-.4-1.2 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-4-4-7-9-7Z",
		"M7.5 11h.01",
		"M9.5 7h.01",
		"M14.5 6.5h.01",
		"M17.5 9.5h.01"
	],
	brush: ["M15 4 8 11l5 5 7-7-5-5Z", "M8 11c-2 0-3.5 1.5-3.5 3.5 0 1.2-.6 2-1.5 2.6.8 1 2.2 1.4 3.5 1.4 2 0 3.5-1.5 3.5-3.5 0-2-1-3.5-2-4Z"],
	pen: ["M12 19l7-7 2 2-7 7-3 1 1-3Z", "M18 13l-7-7 2-2 7 7-2 2Z"],
	feather: ["M20 4c-6 0-12 4-13 11l-3 5 5-3C16 16 20 10 20 4Z", "M8 16 16 8"],
	droplets: ["M12 3s6 6.5 6 10a6 6 0 0 1-12 0c0-3.5 6-10 6-10Z"],
	sparkles: [
		"m11 3 1.6 4.4L17 9l-4.4 1.6L11 15l-1.6-4.4L5 9l4.4-1.6Z",
		"m18.5 14.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z",
		"m5.5 15 .6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z"
	],
	zap: ["M13 2 4 14h7l-1 8 9-12h-7Z"],
	moon: ["M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"],
	sun: [
		"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
		"M12 2v2",
		"M12 20v2",
		"m4.9 4.9 1.4 1.4",
		"m17.7 17.7 1.4 1.4",
		"M2 12h2",
		"M20 12h2",
		"m4.9 19.1 1.4-1.4",
		"m17.7 6.3 1.4-1.4"
	],
	"sun-moon": ["M12 3a6 6 0 0 0 0 12 6 6 0 0 0 0-12Z", "M14 2.5A7.5 7.5 0 0 1 14 17a8 8 0 0 0 0-14.5Z"],
	type: [
		"M5 6V4h14v2",
		"M12 4v16",
		"M9 20h6"
	],
	"align-left": [
		"M4 6h16",
		"M4 12h10",
		"M4 18h13"
	],
	"align-center": [
		"M4 6h16",
		"M7 12h10",
		"M6 18h12"
	],
	"align-right": [
		"M4 6h16",
		"M10 12h10",
		"M7 18h13"
	],
	book: ["M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2Z", "M20 19H6a2 2 0 0 0-2 2"],
	rocket: [
		"M12 3c3.5 2 5.5 5.5 5.5 9L12 17l-5.5-5c0-3.5 2-7 5.5-9Z",
		"M9 12H6.5L4 15v3l3-1.5",
		"M15 12h2.5L20 15v3l-3-1.5",
		"M12 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
	],
	leaf: ["M20 4C10 4 4 9 4 16c0 2 .5 3 1 4 1-6 5-9 9-10-4 2-7 5-8 10 8 1 14-4 14-16Z"],
	coffee: [
		"M4 8h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z",
		"M17 9h1.5a2.5 2.5 0 0 1 0 5H17",
		"M6 2v3",
		"M10 2v3",
		"M14 2v3"
	],
	flask: [
		"M9 3h6",
		"M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3",
		"M7 15h10"
	],
	"check-square-2": ["M5 5h14v14H5Z", "m9 12 2 2 4-4"],
	"toggle-left": ["M8 8h8a4 4 0 1 1 0 8H8a4 4 0 1 1 0-8Z", "M8 12h.01"],
	"toggle-right": ["M16 8H8a4 4 0 1 0 0 8h8a4 4 0 1 0 0-8Z", "M16 12h.01"],
	"circle-dot": ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"],
	"loader-circle": ["M12 3a9 9 0 1 0 9 9"],
	"log-out": [
		"M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3",
		"M10 17l-5-5 5-5",
		"M5 12h11"
	],
	"log-in": [
		"M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3",
		"M15 17l5-5-5-5",
		"M20 12H9"
	],
	slash: ["M5 5l14 14"],
	"corner-down-right": ["M4 4v7a4 4 0 0 0 4 4h12", "m16 11 4 4-4 4"],
	"arrow-down-up": [
		"M8 3v18",
		"m4 7 4-4 4 4",
		"M16 21V3",
		"m12 17 4 4 4-4"
	],
	percent: [
		"M19 5 5 19",
		"M7 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
		"M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
	],
	dollar: ["M12 3v18", "M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 1.8 2.7 4.5 3.2 4.5 1.3 4.5 3.3-2 3-4.5 3-4.5-1.3-4.5-3"],
	"trash-2": [
		"M4 7h16",
		"M9 7V5h6v2",
		"M6 7l1 13h10l1-13",
		"M10 11v6",
		"M14 11v6"
	]
}, Vt = {
	tick: "check",
	cross: "close",
	xmark: "close",
	remove: "close",
	delete: "trash",
	trash2: "trash-2",
	pencil: "edit",
	magnify: "search",
	cog: "settings",
	gear: "settings",
	home: "home",
	user1: "user",
	bell: "bell",
	"alert-triangle": "alert-triangle",
	"info-circle": "info",
	"warning-circle": "alert-circle",
	"check-circle": "circle-check",
	"x-circle": "circle-x",
	"plus-circle": "circle-plus",
	"minus-circle": "circle-minus",
	"help-circle": "circle-help",
	spinner: "loader-circle",
	loader: "loader-circle",
	star1: "star",
	heart1: "heart",
	eye1: "eye",
	"eye-off-1": "eye-off",
	chevronup: "chevron-up",
	chevrondown: "chevron-down",
	chevronleft: "chevron-left",
	chevronright: "chevron-right",
	arrowup: "arrow-up",
	arrowdown: "arrow-down",
	arrowleft: "arrow-left",
	arrowright: "arrow-right",
	dots: "more-horizontal",
	dotsv: "more-vertical",
	"chevron-up-right": "arrow-up-right"
}, Ht = /* @__PURE__ */ new Map();
for (let e of Object.keys(Bt)) {
	let t = e.replace(/-/g, "");
	Ht.has(t) || Ht.set(t, e);
}
function Ut(e) {
	return Vt[e] || (Bt[e] ? e : Ht.get(e.replace(/-/g, "")) ?? e);
}
//#endregion
//#region src/components/icon/Icon.vue?vue&type=script&setup=true&lang.ts
var Wt = ["title", "aria-label"], Gt = [
	"fill",
	"stroke",
	"stroke-width",
	"aria-label",
	"aria-hidden",
	"aria-disabled"
], Kt = ["d"], $ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiIcon",
	__name: "Icon",
	props: {
		name: {},
		paths: {},
		size: { default: 18 },
		strokeWidth: { default: 1.8 },
		fill: {
			type: Boolean,
			default: !1
		},
		rotate: { default: 0 },
		spin: {
			type: Boolean,
			default: !1
		},
		color: {},
		label: {},
		variant: { default: "plain" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => {
			let e = n.paths;
			if (!e) return null;
			let t = (Array.isArray(e) ? e : [e]).flatMap((e) => String(e).split("|")).map((e) => e.trim()).filter((e) => e.length > 0);
			return t.length ? t : null;
		}), a = i(() => r.value ?? Bt[Ut(n.name ?? "")] ?? []), o = i(() => !r.value && !!n.name && a.value.length === 0), s = i(() => o.value && !1), l = i(() => n.label ?? n.name), u = i(() => typeof n.size == "number" ? `${n.size}px` : n.size), d = i(() => ({
			width: u.value,
			height: "auto",
			color: n.color,
			"--mc-icon-rot": n.rotate ? `${n.rotate}deg` : void 0
		})), f = i(() => ({
			width: u.value,
			height: u.value,
			fontSize: `calc(${u.value} * 0.55)`,
			color: n.color,
			"--mc-icon-rot": n.rotate ? `${n.rotate}deg` : void 0
		})), p = i(() => Z("mc-icon", `mc-icon--${n.variant}`, {
			"mc-icon--spin": n.spin,
			"is-disabled": n.disabled
		}, n.customClass));
		return (n, r) => s.value ? (A(), c("span", {
			key: 0,
			class: "mc-icon mc-icon--missing",
			style: T(f.value),
			title: `Unknown icon: ${t.name}`,
			role: "img",
			"aria-label": l.value,
			"aria-hidden": "true"
		}, " ? ", 12, Wt)) : (A(), c("svg", {
			key: 1,
			class: C(p.value),
			style: T(d.value),
			viewBox: "0 0 24 24",
			fill: t.fill ? "currentColor" : "none",
			stroke: t.fill ? "none" : "currentColor",
			"stroke-width": t.strokeWidth,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			role: "img",
			"aria-label": l.value,
			"aria-hidden": t.label ? void 0 : "true",
			"aria-disabled": t.disabled || void 0,
			focusable: "false"
		}, [(A(!0), c(e, null, P(a.value, (e, t) => (A(), c("path", {
			key: t,
			d: e
		}, null, 8, Kt))), 128))], 14, Gt));
	}
}), [["__scopeId", "data-v-9fadec83"]]), qt = {
	name: "en-US",
	pagination: {
		itemsPerPage: "{count} / page",
		prev: "Prev",
		next: "Next",
		page: "Go to",
		jump: "Jump",
		total: "Total {count}",
		goto: "Go",
		label: "Pagination",
		previousPage: "Previous page",
		nextPage: "Next page",
		jumpToPage: "Jump to page",
		perPage: "Items per page"
	},
	empty: { text: "Nothing here yet" },
	select: {
		placeholder: "Select…",
		noMatch: "No matches",
		clear: "Clear selection",
		search: "Search options",
		clearSearch: "Clear search",
		create: "Create",
		loading: "Loading…"
	},
	input: {
		placeholder: "Type something…",
		clear: "Clear",
		showPassword: "Show password",
		hidePassword: "Hide password"
	},
	datePicker: {
		year: "Year",
		month: "Month",
		date: "Date",
		time: "Time",
		startTime: "Start",
		endTime: "End",
		confirm: "Apply",
		now: "Now",
		clear: "Clear",
		picker: "Date picker",
		previousMonth: "Previous month",
		nextMonth: "Next month",
		previousYear: "Previous year",
		nextYear: "Next year",
		previousYears: "Previous years",
		nextYears: "Next years",
		chooseMonth: "Choose month",
		chooseYear: "Choose year",
		hour: "Hour",
		minute: "Minute"
	},
	upload: {
		tip: "Click or drag to upload",
		replace: "Replace",
		delete: "Delete",
		max: "Max {count}",
		typeNotAllowed: "File type is not allowed",
		countLimit: "Only {count} files can be uploaded",
		sizeLimit: "File is bigger than {size}",
		rejected: "File was rejected",
		uploaded: "Uploaded",
		failed: "Failed",
		cancel: "Cancel upload of {name}",
		retry: "Retry upload of {name}"
	},
	message: {
		success: "Success",
		error: "Error",
		warning: "Warning",
		info: "Info",
		dismiss: "Dismiss"
	},
	popconfirm: {
		confirm: "Confirm",
		cancel: "Cancel",
		error: "Something went wrong"
	},
	dynamicTags: {
		add: "add a tag",
		remove: "remove {tag}",
		edit: "edit {tag}",
		empty: "A tag cannot be empty",
		duplicate: "This tag already exists",
		max: "You can only add {count} tags",
		rejected: "This tag was rejected",
		removeRejected: "This tag cannot be removed"
	},
	clipboard: {
		copy: "Copy",
		copied: "Copied",
		failed: "Copy failed",
		copyLabel: "Copy to clipboard"
	},
	popselect: {
		label: "Select",
		clear: "Clear"
	},
	table: {
		empty: "No data",
		sortBy: "Sort by {column}"
	},
	transfer: {
		source: "Source list",
		target: "Target list",
		search: "Search",
		searchSource: "Search the source list",
		searchTarget: "Search the target list",
		selectAllSource: "Select all source items",
		selectAllTarget: "Select all target items",
		moveToTarget: "Move to the target list",
		moveToSource: "Move to the source list"
	},
	image: {
		preview: "Preview image",
		close: "Close preview",
		previous: "Previous image",
		next: "Next image",
		thumbnails: "Image thumbnails",
		counter: "{index} / {total}",
		gallery: "Image gallery"
	},
	ellipsis: {
		expand: "Expand",
		collapse: "Collapse"
	},
	dataTable: {
		columns: "Columns",
		visibleColumns: "Visible columns",
		reset: "Reset",
		selected: "{count} selected",
		total: "Total {count}",
		selectAll: "Select all rows",
		selectRow: "Select row {index}",
		expand: "Expand row",
		collapse: "Collapse row",
		previous: "Previous page",
		next: "Next page",
		rowsPerPage: "{count} / page",
		loading: "Loading…",
		dragColumn: "Reorder",
		dragRow: "Drag row {index} to reorder",
		moveUp: "Move row {index} up",
		moveDown: "Move row {index} down",
		dropBefore: "Drop before row {index}",
		dropAfter: "Drop after row {index}",
		pager: "Pagination",
		clearSelection: "Clear selection"
	},
	time: {
		now: "just now",
		ago: "{count} {unit} ago",
		fromNow: "in {count} {unit}",
		second: {
			one: "second",
			other: "seconds"
		},
		minute: {
			one: "minute",
			other: "minutes"
		},
		hour: {
			one: "hour",
			other: "hours"
		},
		day: {
			one: "day",
			other: "days"
		},
		month: {
			one: "month",
			other: "months"
		},
		year: {
			one: "year",
			other: "years"
		}
	},
	alert: { close: "Close alert" },
	anchor: { navigation: "Section navigation" },
	breadcrumb: {
		label: "Breadcrumb",
		expand: "Show hidden breadcrumbs"
	},
	calendar: {
		previousMonth: "Previous month",
		nextMonth: "Next month",
		previousWeek: "Previous week",
		nextWeek: "Next week"
	},
	carousel: {
		previous: "Previous",
		next: "Next",
		slide: "Slide {index} of {total}",
		readMore: "Read more"
	},
	cascader: { clear: "Clear" },
	code: {
		copy: "Copy code",
		copied: "Copied",
		copyLabel: "Copy to clipboard"
	},
	colorPicker: {
		picker: "Colour picker",
		saturation: "Saturation and brightness",
		hue: "Hue",
		alpha: "Alpha",
		hex: "Hex value"
	},
	dialog: { close: "Close dialog" },
	drawer: { close: "Close drawer" },
	modal: { close: "Close" },
	inputNumber: {
		increase: "Increase",
		decrease: "Decrease"
	},
	mention: { label: "Mentions" },
	notification: { dismiss: "Dismiss notification" },
	pageHeader: {
		breadcrumb: "Breadcrumb",
		back: "Back"
	},
	scrollbar: {
		up: "Scroll up",
		down: "Scroll down",
		position: "Scroll position"
	},
	tabs: {
		close: "Close tab",
		add: "Add tab"
	},
	tag: { close: "Close" },
	timePicker: {
		clear: "Clear",
		picker: "Time picker",
		hours: "Hours",
		minutes: "Minutes",
		seconds: "Seconds"
	},
	tour: {
		end: "End tour",
		next: "Next",
		previous: "Previous",
		skip: "Skip"
	},
	tree: {
		expand: "Expand node",
		collapse: "Collapse node"
	},
	treeSelect: {
		clear: "Clear",
		search: "Search options",
		expand: "Expand",
		collapse: "Collapse"
	},
	floatButton: {
		open: "Open actions",
		close: "Close actions"
	},
	signature: {
		hint: "Sign here",
		undo: "Undo",
		clear: "Clear",
		save: "Save as PNG"
	},
	split: { resize: "Resize panes" },
	watermark: { label: "Watermark" },
	sparkline: { label: "Sparkline" },
	spin: { loading: "Loading" }
}, Jt = {
	name: "zh-CN",
	pagination: {
		itemsPerPage: "每页 {count} 条",
		prev: "上一页",
		next: "下一页",
		page: "前往",
		jump: "跳页",
		total: "共 {count} 条",
		goto: "确定",
		label: "分页",
		previousPage: "上一页",
		nextPage: "下一页",
		jumpToPage: "跳转到指定页",
		perPage: "每页条数"
	},
	empty: { text: "这里还什么都没有" },
	select: {
		placeholder: "请选择…",
		noMatch: "没有匹配项",
		clear: "清除选择",
		search: "搜索选项",
		clearSearch: "清除搜索",
		create: "创建",
		loading: "加载中…"
	},
	input: {
		placeholder: "请输入…",
		clear: "清空",
		showPassword: "显示密码",
		hidePassword: "隐藏密码"
	},
	datePicker: {
		year: "年",
		month: "月",
		date: "日",
		time: "时间",
		startTime: "开始时间",
		endTime: "结束时间",
		confirm: "确定",
		now: "此刻",
		clear: "清除",
		picker: "日期选择器",
		previousMonth: "上一月",
		nextMonth: "下一月",
		previousYear: "上一年",
		nextYear: "下一年",
		previousYears: "前几年",
		nextYears: "后几年",
		chooseMonth: "选择月份",
		chooseYear: "选择年份",
		hour: "时",
		minute: "分"
	},
	upload: {
		tip: "点击或拖拽上传",
		replace: "替换",
		delete: "删除",
		max: "最多 {count} 个",
		typeNotAllowed: "不支持该文件类型",
		countLimit: "最多只能上传 {count} 个文件",
		sizeLimit: "文件超过 {size}",
		rejected: "文件被拒绝",
		uploaded: "已上传",
		failed: "上传失败",
		cancel: "取消上传 {name}",
		retry: "重新上传 {name}"
	},
	message: {
		success: "成功",
		error: "错误",
		warning: "警告",
		info: "提示",
		dismiss: "关闭"
	},
	popconfirm: {
		confirm: "确定",
		cancel: "取消",
		error: "出错了"
	},
	dynamicTags: {
		add: "添加标签",
		remove: "移除 {tag}",
		edit: "编辑 {tag}",
		empty: "标签不能为空",
		duplicate: "该标签已存在",
		max: "最多只能添加 {count} 个标签",
		rejected: "该标签不被允许",
		removeRejected: "该标签不能被移除"
	},
	clipboard: {
		copy: "复制",
		copied: "已复制",
		failed: "复制失败",
		copyLabel: "复制到剪贴板"
	},
	popselect: {
		label: "选择",
		clear: "清除"
	},
	table: {
		empty: "暂无数据",
		sortBy: "按 {column} 排序"
	},
	transfer: {
		source: "源列表",
		target: "目标列表",
		search: "搜索",
		searchSource: "搜索源列表",
		searchTarget: "搜索目标列表",
		selectAllSource: "全选源列表",
		selectAllTarget: "全选目标列表",
		moveToTarget: "移到目标列表",
		moveToSource: "移到源列表"
	},
	image: {
		preview: "预览图片",
		close: "关闭预览",
		previous: "上一张",
		next: "下一张",
		thumbnails: "缩略图",
		counter: "{index} / {total}",
		gallery: "图片画廊"
	},
	ellipsis: {
		expand: "展开",
		collapse: "收起"
	},
	dataTable: {
		columns: "列设置",
		visibleColumns: "显示的列",
		reset: "重置",
		selected: "已选 {count} 项",
		total: "共 {count} 条",
		selectAll: "全选所有行",
		selectRow: "选择第 {index} 行",
		expand: "展开行",
		collapse: "收起行",
		previous: "上一页",
		next: "下一页",
		rowsPerPage: "每页 {count} 条",
		loading: "加载中…",
		dragColumn: "拖拽排序",
		dragRow: "拖拽第 {index} 行以调整顺序",
		moveUp: "将第 {index} 行上移",
		moveDown: "将第 {index} 行下移",
		dropBefore: "放在第 {index} 行之前",
		dropAfter: "放在第 {index} 行之后",
		pager: "分页",
		clearSelection: "清除选择"
	},
	time: {
		now: "刚刚",
		ago: "{count} {unit}前",
		fromNow: "{count} {unit}后",
		second: {
			one: "秒",
			other: "秒"
		},
		minute: {
			one: "分钟",
			other: "分钟"
		},
		hour: {
			one: "小时",
			other: "小时"
		},
		day: {
			one: "天",
			other: "天"
		},
		month: {
			one: "个月",
			other: "个月"
		},
		year: {
			one: "年",
			other: "年"
		}
	},
	alert: { close: "关闭提示" },
	anchor: { navigation: "章节导航" },
	breadcrumb: {
		label: "面包屑",
		expand: "展开被折叠的面包屑"
	},
	calendar: {
		previousMonth: "上一月",
		nextMonth: "下一月",
		previousWeek: "上一周",
		nextWeek: "下一周"
	},
	carousel: {
		previous: "上一张",
		next: "下一张",
		slide: "第 {index} 张，共 {total} 张",
		readMore: "了解更多"
	},
	cascader: { clear: "清除" },
	code: {
		copy: "复制代码",
		copied: "已复制",
		copyLabel: "复制到剪贴板"
	},
	colorPicker: {
		picker: "颜色选择器",
		saturation: "饱和度与明度",
		hue: "色相",
		alpha: "透明度",
		hex: "十六进制色值"
	},
	dialog: { close: "关闭对话框" },
	drawer: { close: "关闭抽屉" },
	modal: { close: "关闭" },
	inputNumber: {
		increase: "增加",
		decrease: "减少"
	},
	mention: { label: "提及列表" },
	notification: { dismiss: "关闭通知" },
	pageHeader: {
		breadcrumb: "面包屑",
		back: "返回"
	},
	scrollbar: {
		up: "向上滚动",
		down: "向下滚动",
		position: "滚动位置"
	},
	tabs: {
		close: "关闭标签页",
		add: "添加标签页"
	},
	tag: { close: "关闭" },
	timePicker: {
		clear: "清除",
		picker: "时间选择器",
		hours: "时",
		minutes: "分",
		seconds: "秒"
	},
	tour: {
		end: "结束引导",
		next: "下一步",
		previous: "上一步",
		skip: "跳过"
	},
	tree: {
		expand: "展开节点",
		collapse: "收起节点"
	},
	treeSelect: {
		clear: "清除",
		search: "搜索选项",
		expand: "展开",
		collapse: "收起"
	},
	floatButton: {
		open: "展开操作",
		close: "收起操作"
	},
	signature: {
		hint: "在此处签名",
		undo: "撤销",
		clear: "清除",
		save: "保存为 PNG"
	},
	split: { resize: "拖拽调整面板宽度" },
	watermark: { label: "水印" },
	sparkline: { label: "迷你趋势图" },
	spin: { loading: "加载中" }
}, Yt = Symbol("mochi-locale");
function Xt(e) {
	j(Yt, e);
}
function Zt() {
	let e = v(Yt, null), t = N(qt);
	return i(() => e?.value ?? t.value);
}
var Qt = qt, $t = Jt, en = ["aria-disabled", "aria-live"], tn = {
	key: 0,
	class: "mc-alert__icon",
	"aria-hidden": "true"
}, nn = { class: "mc-alert__body" }, rn = {
	key: 0,
	class: "mc-alert__title",
	"data-mc-type": "title"
}, an = {
	key: 1,
	class: "mc-alert__description"
}, on = {
	key: 1,
	class: "mc-alert__action"
}, sn = ["aria-label", "disabled"], cn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiAlert",
	__name: "Alert",
	props: {
		type: { default: "info" },
		title: {},
		description: {},
		closable: {
			type: Boolean,
			default: !1
		},
		showIcon: {
			type: Boolean,
			default: !0
		},
		icon: {},
		effect: { default: "soft" },
		accent: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let r = e, a = t, u = Zt(), p = N(!0), m = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x"
		}, h = i(() => r.icon ?? m[r.type]);
		function g() {
			!r.disabled && p.value && (p.value = !1, a("close"));
		}
		let _ = i(() => Z("mc-alert", "mc-sheen-sweep", `mc-alert--${r.type}`, `mc-alert--${r.effect}`, {
			"is-accent": r.accent,
			"is-closable": r.closable,
			"is-disabled": r.disabled
		}, r.customClass));
		return (t, r) => (A(), o(n, { name: "mc-alert" }, {
			default: ee(() => [p.value ? (A(), c("div", {
				key: 0,
				class: C(_.value),
				role: "alert",
				"aria-disabled": e.disabled || void 0,
				"aria-live": e.type === "error" ? "assertive" : "polite"
			}, [
				e.showIcon ? (A(), c("span", tn, [f($, {
					name: h.value,
					size: 18,
					"stroke-width": 2
				}, null, 8, ["name"])])) : s("", !0),
				l("div", nn, [e.title || t.$slots.title ? (A(), c("p", rn, [F(t.$slots, "title", {}, () => [d(R(e.title), 1)], !0)])) : s("", !0), e.description || t.$slots.default ? (A(), c("div", an, [F(t.$slots, "default", {}, () => [d(R(e.description), 1)], !0)])) : s("", !0)]),
				t.$slots.action ? (A(), c("div", on, [F(t.$slots, "action", {}, void 0, !0)])) : s("", !0),
				e.closable ? (A(), c("button", {
					key: 2,
					class: "mc-alert__close",
					type: "button",
					"aria-label": B(u).alert?.close ?? "Close alert",
					disabled: e.disabled,
					onClick: g
				}, [f($, {
					name: "close",
					size: 13,
					"stroke-width": 2.4
				})], 8, sn)) : s("", !0)
			], 10, en)) : s("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-3dc9a41b"]]), ln = ["aria-label"], un = [
	"href",
	"aria-current",
	"aria-disabled",
	"tabindex",
	"onClick",
	"onKeydown"
], dn = { class: "mc-anchor__label" }, fn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiAnchor",
	__name: "Anchor",
	props: {
		items: {},
		target: { default: null },
		affix: {
			type: Boolean,
			default: !1
		},
		offset: { default: 16 },
		duration: { default: 420 },
		placement: { default: "left" },
		customClass: {}
	},
	emits: ["change"],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n, u = N(null), d = N(null), f = N(null), p = N(null), m = N(""), h = N(!1), g = N({
			top: 0,
			scale: 1,
			ready: !1
		}), _ = N(0), v = N(0), y = /* @__PURE__ */ new Map();
		function b(e) {
			return e ? typeof e == "string" ? wt ? document.querySelector(e) : null : e : null;
		}
		function x(e) {
			return e === window;
		}
		function w() {
			return b(r.target) ?? window;
		}
		function D(e) {
			return x(e) ? window.scrollY || document.documentElement.scrollTop || 0 : e.scrollTop;
		}
		function k(e) {
			return x(e) ? {
				width: window.innerWidth,
				height: window.innerHeight
			} : {
				width: e.clientWidth,
				height: e.clientHeight
			};
		}
		function j(e) {
			if (!wt) return null;
			let t = e.href ?? `#${e.key}`, n = t.startsWith("#") ? t : `#${t}`;
			try {
				return document.querySelector(n);
			} catch {
				return null;
			}
		}
		function M(e, t) {
			let n = j(e);
			if (!n) return null;
			let r = x(t) ? null : t.getBoundingClientRect(), i = r ? r.top : 0;
			return n.getBoundingClientRect().top - i + D(t);
		}
		function F() {
			if (!wt) return;
			let e = w(), t = D(e);
			k(e);
			let n = t + r.offset + 1, i = "", a = -Infinity;
			for (let t of r.items) {
				if (t.disabled) continue;
				let r = M(t, e);
				r !== null && r <= n && r > a && (a = r, i = t.key);
			}
			if (!i && r.items.length) {
				let t = r.items.find((e) => !e.disabled);
				if (t) {
					let r = M(t, e);
					r !== null && r > n && (i = t.key);
				}
			}
			i !== m.value && (m.value = i, o("change", i)), I(), L();
		}
		function I() {
			let e = m.value ? y.get(m.value) : void 0, t = f.value;
			if (!e || !t) {
				g.value = {
					...g.value,
					ready: !1
				};
				return;
			}
			let n = p.value?.offsetHeight || e.offsetHeight;
			g.value = {
				top: t.offsetTop + e.offsetTop,
				scale: n > 0 ? e.offsetHeight / n : 1,
				ready: !0
			};
		}
		function L() {
			if (!r.affix || !u.value || !d.value) return;
			let e = u.value.getBoundingClientRect(), t = e.top <= r.offset;
			t !== h.value && (h.value = t), t && (_.value = e.left, v.value = e.height);
		}
		let z = 0;
		function V(e, t) {
			if (z && cancelAnimationFrame(z), r.duration <= 0) {
				e === window ? window.scrollTo(0, t) : e.scrollTo({
					top: t,
					behavior: "auto"
				});
				return;
			}
			let n = D(e), i = t - n;
			if (Math.abs(i) < 1) return;
			let a = performance.now(), o = (t) => {
				let s = Math.min(1, (t - a) / r.duration), c = 1 - (1 - s) ** 3, l = n + i * c;
				e === window ? window.scrollTo(0, l) : e.scrollTo({
					top: l,
					behavior: "auto"
				}), z = s < 1 ? requestAnimationFrame(o) : 0;
			};
			z = requestAnimationFrame(o);
		}
		function H(e) {
			if (e.disabled) return;
			let t = w(), n = j(e);
			if (!n) return;
			let i = x(t) ? null : t.getBoundingClientRect(), a = i ? i.top : 0, s = n.getBoundingClientRect().top - a + D(t) - r.offset;
			V(t, Math.max(0, s)), m.value = e.key, o("change", e.key);
		}
		function U(e, t) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), H(t));
		}
		let W = 0;
		function ee() {
			W || (W = requestAnimationFrame(() => {
				W = 0, F();
			}));
		}
		function te() {
			ee();
		}
		function K() {
			wt && (J(), w().addEventListener("scroll", te, { passive: !0 }), window.addEventListener("resize", ee), F());
		}
		function J() {
			wt && (w().removeEventListener("scroll", te), window.removeEventListener("resize", ee), W && (cancelAnimationFrame(W), W = 0));
		}
		G(() => r.items, () => S(F), { deep: !0 }), G(() => r.target, K), O(K), E(J);
		let ne = i(() => ({
			transform: `translateY(${g.value.top}px) scaleY(${g.value.scale})`,
			opacity: +!!g.value.ready
		})), re = i(() => {
			if (r.affix && h.value) return {
				position: "fixed",
				top: `${r.offset}px`,
				left: `${_.value}px`
			};
		});
		function ie(e) {
			return { "--mc-anchor-level": String(e.level ?? 1) };
		}
		let Y = i(() => Z("mc-anchor", "mc-anchor--panel", "mc-grain-overlay", `mc-anchor--${r.placement}`, { "is-affixed": h.value }, r.customClass));
		return (n, r) => (A(), c("div", {
			ref_key: "wrapper",
			ref: d,
			class: "mc-anchor__wrapper"
		}, [t.affix && h.value ? (A(), c("div", {
			key: 0,
			class: "mc-anchor__placeholder",
			style: T({ height: `${v.value}px` }),
			"aria-hidden": "true"
		}, null, 4)) : s("", !0), l("nav", {
			ref_key: "root",
			ref: u,
			class: C(Y.value),
			style: T(re.value),
			"aria-label": B(a).anchor?.navigation ?? "Section navigation"
		}, [
			r[0] || (r[0] = l("span", {
				class: "mc-anchor__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-anchor__rail",
				"aria-hidden": "true"
			}, null, -1)),
			l("span", {
				ref_key: "markerEl",
				ref: p,
				class: "mc-anchor__indicator",
				style: T(ne.value),
				"aria-hidden": "true"
			}, null, 4),
			l("ul", {
				ref_key: "listEl",
				ref: f,
				class: "mc-anchor__list"
			}, [(A(!0), c(e, null, P(t.items, (e) => (A(), c("li", {
				key: e.key,
				class: "mc-anchor__item"
			}, [l("a", {
				href: e.href ?? `#${e.key}`,
				class: C(["mc-anchor__link", {
					"is-active": e.key === m.value,
					"is-disabled": e.disabled,
					"mc-sheen-sweep": !e.disabled
				}]),
				style: T(ie(e)),
				"aria-current": e.key === m.value ? "true" : void 0,
				"aria-disabled": e.disabled ? "true" : void 0,
				tabindex: e.disabled ? -1 : void 0,
				onClick: q((t) => H(e), ["prevent"]),
				onKeydown: (t) => U(t, e)
			}, [l("span", dn, R(e.label), 1)], 46, un)]))), 128))], 512)
		], 14, ln)], 512));
	}
}), [["__scopeId", "data-v-91533e31"]]), pn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiAurora",
	__name: "Aurora",
	props: {
		intensity: { default: 1 },
		speed: { default: 20 },
		colors: { default: () => [] },
		blobs: { default: 4 },
		grain: {
			type: Boolean,
			default: !0
		},
		variant: { default: "mesh" },
		animated: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => n.colors.length ? n.colors : [
			"hsl(var(--mc-h) var(--mc-s) 68%)",
			"hsl(var(--mc-h2) var(--mc-s2) 64%)",
			"hsl(var(--mc-h3) var(--mc-s3) 66%)",
			"hsl(var(--mc-h) calc(var(--mc-s) * 0.78) 74%)"
		]), a = i(() => r.value.slice(0, Math.max(1, n.blobs)).map((e, t) => ({
			"--mc-blob-color": e,
			"--mc-blob-delay": `${(t / Math.max(1, n.blobs) * n.speed).toFixed(2)}s`,
			"--mc-blob-scale": `${1 + t * .18}`,
			"--mc-blob-x": `${18 + t * 28 % 74}%`,
			"--mc-blob-y": `${22 + t * 37 % 50}%`
		}))), o = i(() => ({
			"--mc-aurora-intensity": String(n.intensity),
			"--mc-aurora-speed": `${n.speed}s`
		})), s = i(() => Z("mc-aurora", `is-${n.variant}`, {
			"is-grain": n.grain,
			"is-static": !n.animated,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (A(), c("div", {
			class: C(s.value),
			style: T(o.value),
			"aria-hidden": "true"
		}, [(A(!0), c(e, null, P(a.value, (e, t) => (A(), c("span", {
			key: t,
			class: "mc-aurora__blob",
			style: T(e)
		}, null, 4))), 128)), F(t.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-d732a653"]]), mn = {
	top: "bottom",
	"top-start": "bottom-start",
	"top-end": "bottom-end",
	bottom: "top",
	"bottom-start": "top-start",
	"bottom-end": "top-end",
	left: "right",
	"left-start": "right-start",
	"left-end": "right-end",
	right: "left",
	"right-start": "left-start",
	"right-end": "left-end"
};
function hn(e, t, n, r, i, a, o, s) {
	let [c, l = "center"] = r.split("-"), u = 0, d = 0;
	return c === "top" || c === "bottom" ? (d = c === "top" ? e.top - n - i : e.bottom + i, u = l === "start" ? e.left : l === "end" ? e.right - t : e.left + e.width / 2 - t / 2) : (u = c === "left" ? e.left - t - i : e.right + i, d = l === "start" ? e.top : l === "end" ? e.bottom - n : e.top + e.height / 2 - n / 2), {
		x: u,
		y: d,
		placement: r
	};
}
function gn(e, t, n, r, i, a) {
	let o = e.placement.split("-")[0];
	return o === "top" ? e.y < a : o === "bottom" ? e.y + n > i - a : o === "left" ? e.x < a : e.x + t > r - a;
}
function _n(e, t, n = {}) {
	let { placement: r = "bottom", offset: a = 8, flip: o = !0, shift: s = !0, padding: c = 8, zIndex: l, arrowPadding: u = 12 } = n, d = L({
		x: 0,
		y: 0,
		placement: "bottom"
	}), f = i(() => d.value.placement), p = i(() => d.value.placement.split("-")[0]), m = i(() => {
		let [e, t = "center"] = d.value.placement.split("-"), n = t === "start" ? "top" : t === "end" ? "bottom" : "center", r = t === "start" ? "left" : t === "end" ? "right" : "center";
		return e === "top" ? `bottom ${r}` : e === "bottom" ? `top ${r}` : e === "left" ? `${n} right` : `${n} left`;
	}), h = N(!1), g = 0;
	function _() {
		let n = e.value, i = t.value;
		if (!n || !i) return;
		let l = n.getBoundingClientRect(), f = i.offsetWidth, p = i.offsetHeight, m = window.innerWidth, g = window.innerHeight, _ = z(r), v = z(a), y = hn(l, f, p, _, v, m, g, c);
		if (o && gn(y, f, p, m, g, c)) {
			let e = hn(l, f, p, mn[y.placement], v, m, g, c);
			gn(e, f, p, m, g, c) || (y = e);
		}
		let b, x, S = y.placement.split("-")[0];
		if (S === "top" || S === "bottom") {
			if (s) {
				let e = c, t = m - f - c, n = Math.min(Math.max(y.x, e), Math.max(e, t));
				y = {
					...y,
					x: n
				};
			}
			let e = l.left + l.width / 2 - y.x;
			b = Math.min(Math.max(e, u), Math.max(u, f - u));
		} else {
			if (s) {
				let e = c, t = g - p - c, n = Math.min(Math.max(y.y, e), Math.max(e, t));
				y = {
					...y,
					y: n
				};
			}
			let e = l.top + l.height / 2 - y.y;
			x = Math.min(Math.max(e, u), Math.max(u, p - u));
		}
		d.value = {
			...y,
			arrowX: b,
			arrowY: x
		}, h.value = !0;
	}
	function v() {
		g && cancelAnimationFrame(g), g = requestAnimationFrame(_);
	}
	function y() {
		wt && (b(), window.addEventListener("scroll", v, !0), window.addEventListener("resize", v));
	}
	function b() {
		wt && (window.removeEventListener("scroll", v, !0), window.removeEventListener("resize", v), g && cancelAnimationFrame(g), g = 0);
	}
	return G([e, t], () => v(), { flush: "post" }), G(() => [z(r), z(a)], () => v(), { flush: "post" }), E(() => b()), {
		coords: d,
		currentPlacement: f,
		arrowSide: p,
		transformOrigin: m,
		style: i(() => ({
			position: n.strategy ?? "fixed",
			left: "0px",
			top: "0px",
			translate: `${Math.round(d.value.x)}px ${Math.round(d.value.y)}px`,
			zIndex: z(n.zIndex) ?? void 0
		})),
		isVisible: h,
		update: _,
		schedule: v,
		startAutoUpdate: y,
		stopAutoUpdate: b
	};
}
//#endregion
//#region src/components/config-provider/context.ts
var vn = Symbol("mochi-config"), yn = 2e3, bn = 10, xn = 900, Sn = 0;
function Cn() {
	return Sn = (Sn + 1) % xn, yn + Sn * bn;
}
function wn() {
	Sn = 0;
}
function Tn(e = {}) {
	let t = v(vn, null)?.zIndex?.value ?? yn, n = N(e.zIndex?.value);
	return e.active && G(e.active, (e) => {
		e && (n.value = Cn());
	}, {
		immediate: !0,
		flush: "sync"
	}), E(() => {
		n.value = void 0;
	}), i(() => e.zIndex?.value === void 0 ? n.value === void 0 ? t + bn : n.value : e.zIndex.value);
}
//#endregion
//#region src/composables/useOverlayStack.ts
var En = [];
function Dn(e) {
	let t = En.findIndex((t) => t.id === e);
	t !== -1 && En.splice(t, 1);
}
function On(e) {
	let t = Symbol("mochi-overlay"), n = {
		id: t,
		modal: !!e.modal
	};
	function r() {
		return En.length > 0 && En[En.length - 1].id === t;
	}
	function i() {
		for (let e = En.length - 1; e >= 0; e--) if (En[e].modal) return En[e].id === t;
		return !1;
	}
	return typeof window < "u" && (G(e.active, (e) => {
		Dn(t), e && En.push(n);
	}, {
		immediate: !0,
		flush: "sync"
	}), E(() => Dn(t))), {
		isTop: r,
		isTopModal: i
	};
}
function kn() {
	En.length = 0;
}
//#endregion
//#region src/composables/useOverlayScope.ts
function An() {
	let e = v(vn, null);
	return i(() => {
		let t = {};
		for (let [n, r] of Object.entries(e?.scopeAttrs?.value ?? {})) r !== void 0 && (t[n] = r);
		let n = e?.scopeStyle?.value;
		return n && Object.keys(n).length && (t.style = { ...n }), t;
	});
}
//#endregion
//#region src/components/auto-complete/AutoComplete.vue?vue&type=script&setup=true&lang.ts
var jn = {
	key: 0,
	class: "mc-auto-complete__affix mc-auto-complete__affix--prefix"
}, Mn = [
	"value",
	"placeholder",
	"disabled",
	"aria-expanded",
	"aria-disabled"
], Nn = {
	key: 1,
	class: "mc-auto-complete__affix mc-auto-complete__affix--suffix"
}, Pn = [
	"data-index",
	"aria-selected",
	"onClick",
	"onMouseenter"
], Fn = { class: "mc-auto-complete__option-label" }, In = {
	key: 0,
	class: "mc-auto-complete__empty",
	role: "presentation"
}, Ln = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiAutoComplete",
	inheritAttrs: !1,
	__name: "AutoComplete",
	props: {
		modelValue: { default: "" },
		options: { default: () => [] },
		filter: {},
		prefix: {},
		suffix: {},
		size: { default: "medium" },
		variant: { default: "filled" },
		placeholder: { default: "" },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: void 0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"select",
		"update:open",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = V(), m = Zt(), h = An(), g = i(() => u.placeholder || m.value.input.placeholder), _ = i(() => m.value.select.noMatch), v = i(() => {
			let { class: e, style: t, ...n } = p;
			return n;
		}), y = N(!1), b = Tn({ active: y }), w = i(() => u.open ?? y.value), { isTop: D } = On({ active: w }), k = N(u.modelValue ?? ""), j = N(-1);
		G(() => u.modelValue, (e) => {
			k.value = e ?? "";
		});
		let M = i(() => (u.options ?? []).map((e) => typeof e == "string" ? {
			label: e,
			value: e
		} : e)), F = i(() => {
			let e = k.value.trim();
			if (!e) return [];
			let t = u.filter;
			if (t) return M.value.filter((n) => t(e, n));
			let n = e.toLowerCase();
			return M.value.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n));
		}), I = N(null), L = N(null), z = N(null), { style: H, coords: U, arrowSide: W, transformOrigin: te, update: K, startAutoUpdate: q, stopAutoUpdate: J } = _n(I, L, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			padding: 8,
			zIndex: b
		}), ne = i(() => {
			let e = U.value.arrowX;
			return e === void 0 ? { left: "50%" } : { left: `${Math.round(e)}px` };
		});
		function re(e) {
			(u.open ?? y.value) !== e && (y.value = e, d("update:open", e), d(e ? "open" : "close"));
		}
		function ie() {
			u.disabled || M.value.length && re(!0);
		}
		function Y() {
			re(!1), j.value = -1;
		}
		function ae(e) {
			let t = e.target;
			k.value = t.value, d("update:modelValue", t.value), j.value = -1, t.value.trim() ? ie() : Y();
		}
		function oe() {
			u.disabled || k.value.trim() && ie();
		}
		function se() {
			d("change", k.value);
		}
		function ce(e) {
			let t = F.value;
			if (!t.length) return;
			let n = j.value < 0 ? e > 0 ? -1 : 0 : j.value;
			j.value = (n + e + t.length) % t.length, le();
		}
		function le() {
			let e = z.value;
			e && e.querySelector(`[data-index="${j.value}"]`)?.scrollIntoView({ block: "nearest" });
		}
		function ue(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function de(e) {
			k.value = e.value, d("update:modelValue", e.value), d("change", e.value), d("select", e), Y();
		}
		function fe(e) {
			if (!u.disabled) {
				if (e.key === "ArrowDown") {
					if (e.preventDefault(), !w.value) {
						ie();
						return;
					}
					ce(1);
				} else if (e.key === "ArrowUp") {
					if (e.preventDefault(), !w.value) {
						ie();
						return;
					}
					ce(-1);
				} else if (e.key === "Enter") {
					let t = F.value[j.value];
					t && (e.preventDefault(), de(t));
				} else e.key === "Escape" ? w.value && D() && (e.preventDefault(), e.stopPropagation(), Y()) : e.key === "Tab" && Y();
			}
		}
		G(w, async (e) => {
			e ? (await S(), L.value && I.value && (L.value.style.minWidth = `${I.value.offsetWidth}px`), K(), q()) : J();
		}), G(F, () => {
			j.value = -1, K();
		});
		function pe(e) {
			if (!w.value) return;
			let t = e.target;
			t && (I.value?.contains(t) || L.value?.contains(t) || Y());
		}
		O(() => {
			document.addEventListener("pointerdown", pe, !0);
		}), E(() => {
			document.removeEventListener("pointerdown", pe, !0), J();
		});
		let me = i(() => {
			let e = u.teleport;
			return typeof e == "string" ? e : "body";
		}), he = i(() => u.teleport === !1), ge = i(() => Z("mc-auto-complete", `mc-auto-complete--${u.variant}`, `mc-auto-complete--${u.size}`, {
			"is-open": w.value,
			"is-disabled": u.disabled
		})), _e = i(() => Z(ge.value, p.class, u.customClass)), X = i(() => p.style);
		return (i, a) => (A(), c("div", {
			class: C(_e.value),
			style: T(X.value)
		}, [l("div", {
			ref_key: "field",
			ref: I,
			class: "mc-auto-complete__field mc-sheen-sweep"
		}, [
			a[0] || (a[0] = l("span", {
				class: "mc-auto-complete__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			a[1] || (a[1] = l("span", {
				class: "mc-auto-complete__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			r.prefix ? (A(), c("span", jn, [f($, {
				name: r.prefix,
				size: 15
			}, null, 8, ["name"])])) : s("", !0),
			l("input", x(v.value, {
				class: "mc-auto-complete__input",
				type: "text",
				role: "combobox",
				value: k.value,
				placeholder: g.value,
				disabled: r.disabled,
				"aria-expanded": w.value,
				"aria-haspopup": "listbox",
				"aria-autocomplete": "list",
				"aria-disabled": r.disabled || void 0,
				onInput: ae,
				onFocus: oe,
				onBlur: se,
				onKeydown: fe
			}), null, 16, Mn),
			r.suffix ? (A(), c("span", Nn, [f($, {
				name: r.suffix,
				size: 15
			}, null, 8, ["name"])])) : s("", !0)
		], 512), (A(), o(t, {
			to: me.value,
			disabled: he.value
		}, [f(n, { name: "mc-auto-complete-pop" }, {
			default: ee(() => [w.value ? (A(), c("div", x({
				key: 0,
				ref_key: "panel",
				ref: L,
				class: "mc-auto-complete__panel",
				style: B(H)
			}, B(h)), [l("span", {
				class: C(["mc-auto-complete__panel-arrow", `is-${B(W)}`]),
				style: T(ne.value),
				"aria-hidden": "true"
			}, null, 6), l("div", {
				class: "mc-auto-complete__panel-inner mc-grain-overlay",
				style: T({ transformOrigin: B(te) })
			}, [l("ul", {
				ref_key: "listEl",
				ref: z,
				class: "mc-auto-complete__list mc-scroll",
				role: "listbox"
			}, [(A(!0), c(e, null, P(F.value, (e, t) => (A(), c("li", {
				key: e.value,
				class: C(["mc-auto-complete__option", { "is-active": t === j.value }]),
				role: "option",
				"data-index": t,
				"aria-selected": t === j.value,
				onClick: (t) => de(e),
				onMouseenter: (e) => j.value = t,
				onMousemove: ue
			}, [l("span", Fn, R(e.label), 1), f($, {
				name: "arrow-right",
				size: 13,
				class: "mc-auto-complete__option-arrow"
			})], 42, Pn))), 128)), F.value.length ? s("", !0) : (A(), c("li", In, R(_.value), 1))], 512)], 4)], 16)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 6));
	}
}), [["__scopeId", "data-v-5e97e080"]]), Rn = ["tabindex", "aria-disabled"], zn = ["src", "alt"], Bn = {
	key: 1,
	class: "mc-avatar__text"
}, Vn = {
	key: 3,
	class: "mc-avatar__text"
}, Hn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiAvatar",
	__name: "Avatar",
	props: {
		src: {},
		text: {},
		icon: {},
		alt: { default: "" },
		size: { default: "medium" },
		shape: { default: "circle" },
		bordered: {
			type: Boolean,
			default: !1
		},
		status: {},
		statusPosition: { default: "bottom-right" },
		ring: {
			type: Boolean,
			default: !1
		},
		tilt: {
			type: Boolean,
			default: !1
		},
		interactive: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["error"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = {
			small: 28,
			medium: 40,
			large: 56
		}, u = {
			small: 12,
			medium: 15,
			large: 20
		}, d = i(() => typeof n.size == "number" ? n.size : a[n.size] ?? 40), f = i(() => typeof n.size == "number" ? Math.round(d.value * .38) : u[n.size] ?? 15), p = N(null);
		function m(e) {
			n.interactive && !n.disabled && bt(e, p.value);
		}
		let h = i(() => Z("mc-avatar", `mc-avatar--${n.shape}`, {
			"is-bordered": n.bordered,
			"is-ring": n.ring,
			"is-tilt": n.tilt,
			"is-interactive": n.interactive,
			"is-disabled": n.disabled
		}, n.customClass)), g = i(() => (n.text ?? "").trim().slice(0, 2).toUpperCase());
		function _(e) {
			r("error", e);
		}
		return (t, n) => (A(), c("span", {
			ref_key: "root",
			ref: p,
			class: C(h.value),
			style: T({
				width: `${d.value}px`,
				height: `${d.value}px`,
				fontSize: `${f.value}px`
			}),
			tabindex: e.interactive ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: q(m, ["self"])
		}, [
			e.src ? (A(), c("img", {
				key: 0,
				class: "mc-avatar__img",
				src: e.src,
				alt: e.alt,
				onError: _
			}, null, 40, zn)) : e.text ? (A(), c("span", Bn, R(g.value), 1)) : e.icon ? (A(), o($, {
				key: 2,
				name: e.icon,
				size: Math.round(d.value * .45),
				class: "mc-avatar__icon"
			}, null, 8, ["name", "size"])) : (A(), c("span", Vn, R(g.value || "·"), 1)),
			n[0] || (n[0] = l("span", {
				class: "mc-avatar__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			n[1] || (n[1] = l("span", {
				class: "mc-avatar__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			e.status ? (A(), c("span", {
				key: 4,
				class: C(["mc-avatar__status", [`is-${e.status}`, `is-${e.statusPosition}`]])
			}, null, 2)) : s("", !0)
		], 46, Rn));
	}
}), [["__scopeId", "data-v-077a90f3"]]), Un = [
	"aria-label",
	"disabled",
	"aria-disabled"
], Wn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiBackTop",
	__name: "BackTop",
	props: {
		target: { default: null },
		visibilityHeight: { default: 220 },
		right: { default: 28 },
		bottom: { default: 28 },
		size: { default: 46 },
		shape: { default: "circle" },
		duration: { default: 480 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: { default: "Back to top" },
		customClass: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let r = e, a = t, s = N(!1);
		function c(e) {
			return e ? typeof e == "string" ? wt ? document.querySelector(e) : null : e : null;
		}
		function u(e) {
			return e === window;
		}
		function d() {
			return c(r.target) ?? window;
		}
		function p(e) {
			return u(e) ? window.scrollY || document.documentElement.scrollTop || 0 : e.scrollTop;
		}
		function m() {
			let e = d();
			s.value = p(e) > r.visibilityHeight;
		}
		let h = 0;
		function g() {
			h || (h = requestAnimationFrame(() => {
				h = 0, m();
			}));
		}
		function _() {
			g();
		}
		function v() {
			wt && (y(), d().addEventListener("scroll", _, { passive: !0 }), window.addEventListener("resize", g), m());
		}
		function y() {
			wt && (d().removeEventListener("scroll", _), window.removeEventListener("resize", g), h && (cancelAnimationFrame(h), h = 0));
		}
		let b = 0;
		function x() {
			let e = d(), t = p(e);
			if (t <= 0) return;
			if (r.duration <= 0) {
				e === window ? window.scrollTo(0, 0) : e.scrollTo({
					top: 0,
					behavior: "auto"
				});
				return;
			}
			b && cancelAnimationFrame(b);
			let n = performance.now(), i = (a) => {
				let o = Math.min(1, (a - n) / r.duration), s = 1 - (1 - o) ** 3, c = t * (1 - s);
				e === window ? window.scrollTo(0, c) : e.scrollTo({
					top: c,
					behavior: "auto"
				}), b = o < 1 ? requestAnimationFrame(i) : 0;
			};
			b = requestAnimationFrame(i);
		}
		function w() {
			r.disabled || (a("click"), x());
		}
		G(() => r.target, v), G(() => r.visibilityHeight, m), O(() => {
			v(), S(() => m());
		}), E(y);
		let D = i(() => ({
			right: `${r.right}px`,
			bottom: `${r.bottom}px`,
			width: `${r.size}px`,
			height: `${r.size}px`
		})), k = i(() => Z("mc-back-top", `mc-back-top--${r.shape}`, "mc-sheen-sweep", { "is-disabled": r.disabled }, r.customClass));
		return (t, r) => (A(), o(n, {
			name: "mc-back-top",
			persisted: ""
		}, {
			default: ee(() => [te(l("button", {
				type: "button",
				class: C(k.value),
				style: T(D.value),
				"aria-label": e.label,
				disabled: e.disabled,
				"aria-disabled": e.disabled ? "true" : void 0,
				onClick: w
			}, [
				r[0] || (r[0] = l("span", {
					class: "mc-back-top__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				r[1] || (r[1] = l("span", {
					class: "mc-back-top__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				r[2] || (r[2] = l("span", {
					class: "mc-back-top__glow",
					"aria-hidden": "true"
				}, null, -1)),
				f($, {
					name: "arrow-up",
					size: Math.round(e.size * .46),
					"stroke-width": 2.2
				}, null, 8, ["size"])
			], 14, Un), [[W, s.value]])]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-f1cd0917"]]), Gn = { class: "mc-badge__count" }, Kn = { class: "mc-badge__ribbon-text" }, qn = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiBadge",
	__name: "Badge",
	props: {
		value: { type: [
			Number,
			String,
			Boolean
		] },
		max: { default: 99 },
		showZero: {
			type: Boolean,
			default: !1
		},
		dot: {
			type: Boolean,
			default: !1
		},
		status: { default: "default" },
		offset: {},
		standalone: {
			type: Boolean,
			default: !1
		},
		color: {},
		ribbon: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = H(), n = e, r = i(() => !(n.value === void 0 || n.value === null || n.value === !1 || n.value === 0 && !n.showZero || n.value === "" && !n.showZero)), a = i(() => n.dot || n.value === !0 || !r.value), o = i(() => n.dot || n.status !== "default" ? !0 : r.value), u = i(() => {
			let e = n.value;
			return typeof e == "number" && e > n.max ? `${n.max}+` : e === !0 ? "" : String(e ?? "");
		}), f = i(() => {
			if (!n.offset) return;
			let [e = 0, t = 0] = n.offset;
			return { translate: `${e}px ${t}px` };
		}), p = i(() => {
			let e = {}, t = St(n.color ?? (n.status === "default" ? void 0 : n.status));
			return t && (e["--mc-badge-bg"] = t, e["--mc-badge-fg"] = "var(--mc-on-solid)"), e;
		}), m = i(() => Z("mc-badge", {
			"is-standalone": n.standalone || !t.default,
			"is-dot": a.value,
			"is-ribbon": n.ribbon,
			"is-disabled": n.disabled,
			[`is-status-${n.status}`]: n.status !== "default"
		}, n.customClass));
		return (t, n) => (A(), c("span", { class: C(m.value) }, [
			F(t.$slots, "default", {}, void 0, !0),
			o.value && !a.value && !e.ribbon ? (A(), c("span", {
				key: 0,
				class: "mc-badge__bubble",
				style: T({
					...p.value,
					...f.value
				})
			}, [l("span", Gn, R(u.value), 1)], 4)) : o.value && a.value && !e.ribbon ? (A(), c("span", {
				key: 1,
				class: "mc-badge__bubble mc-badge__bubble--dot",
				style: T({
					...p.value,
					...f.value
				}),
				"aria-hidden": "true"
			}, [...n[0] || (n[0] = [l("span", { class: "mc-badge__dot" }, null, -1)])], 4)) : s("", !0),
			e.ribbon ? (A(), c("span", {
				key: 2,
				class: "mc-badge__ribbon",
				style: T(p.value)
			}, [l("span", Kn, [F(t.$slots, "ribbon", {}, () => [d(R(u.value), 1)], !0)])], 4)) : s("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-675f08d8"]]), Jn = /* @__PURE__ */ "212222.222122.222221.121223.121322.131222.122213.122312.132212.221213.221312.231212.112232.122132.122231.113222.123122.123221.223211.221132.221231.213212.223112.312131.311222.321122.321221.312212.322112.322211.212123.212321.232121.111323.131123.131321.112313.132113.132311.211313.231113.231311.112133.112331.132131.113123.113321.133121.313121.211331.231131.213113.213311.213131.311123.311321.331121.312113.312311.332111.314111.221411.431111.111224.111422.121124.121421.141122.141221.112214.112412.122114.122411.142112.142211.241211.221114.413111.241112.134111.111242.121142.121241.114212.124112.124211.411212.421112.421211.212141.214121.412121.111143.111341.131141.114113.114311.411113.411311.113141.114131.311141.411131.211412.211214.211232.2331112".split("."), Yn = 104, Xn = 106;
function Zn(e) {
	let t = [], n = !0;
	for (let r of e) {
		let e = Number(r);
		for (let r = 0; r < e; r++) t.push(n);
		n = !n;
	}
	return t;
}
function Qn(e) {
	let t = e ?? "", n = [Yn];
	for (let e of t) {
		let t = e.charCodeAt(0);
		if (t < 32 || t > 126) throw Error(`[mochi-ui] Barcode: character "${e}" is not supported by Code 128 subset B.`);
		n.push(t - 32);
	}
	let r = Yn;
	for (let e = 1; e < n.length; e++) r += n[e] * e;
	n.push(r % 103), n.push(Xn);
	let i = [];
	for (let e of n) i.push(...Zn(Jn[e]));
	return {
		modules: i,
		text: t,
		leadingText: "",
		trailingText: ""
	};
}
var $n = [
	"0001101",
	"0011001",
	"0010011",
	"0111101",
	"0100111",
	"0110001",
	"0101111",
	"0111011",
	"0110111",
	"0001011"
], er = [
	"1110010",
	"1100110",
	"1101100",
	"1000010",
	"1011100",
	"1001110",
	"1010000",
	"1000100",
	"1001000",
	"1110100"
], tr = [
	"LLLLLL",
	"LLGLGG",
	"LLGGLG",
	"LLGGGL",
	"LGLLGG",
	"LGGLLG",
	"LGGGLL",
	"LGLGLG",
	"LGLGGL",
	"LGGLGL"
];
function nr(e) {
	return er[e];
}
function rr(e, t) {
	return t === "L" ? $n[e] : nr(e).split("").reverse().join("");
}
function ir(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t += e[n] * (n % 2 == 0 ? 1 : 3);
	return (10 - t % 10) % 10;
}
function ar(e) {
	let t = (e ?? "").replace(/\D/g, "");
	if (t.length !== 12 && t.length !== 13) throw Error("[mochi-ui] Barcode: EAN-13 needs 12 or 13 digits.");
	let n = t.slice(0, 12).split("").map(Number), r = ir(n);
	if (t.length === 13 && Number(t[12]) !== r) throw Error("[mochi-ui] Barcode: EAN-13 check digit is invalid.");
	let i = tr[n[0]], a = [], o = (e) => {
		for (let t of e) a.push(t === "1");
	};
	o("101");
	for (let e = 0; e < 6; e++) o(rr(n[e + 1], i[e]));
	o("01010");
	for (let e = 0; e < 6; e++) o(nr(n[e + 7]));
	return o("101"), {
		modules: a,
		text: n.slice(1).join(""),
		leadingText: String(n[0]),
		trailingText: String(r)
	};
}
function or(e, t) {
	return t === "ean13" ? ar(e) : Qn(e);
}
//#endregion
//#region src/components/barcode/Barcode.vue?vue&type=script&setup=true&lang.ts
var sr = { class: "mc-barcode__plate mc-grain-overlay" }, cr = [
	"width",
	"height",
	"viewBox",
	"aria-label"
], lr = [
	"x",
	"width",
	"height",
	"fill"
], ur = {
	key: 1,
	class: "mc-barcode__error"
}, dr = {
	key: 0,
	class: "mc-barcode__guard"
}, fr = { class: "mc-barcode__digits" }, pr = {
	key: 1,
	class: "mc-barcode__guard"
}, mr = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiBarcode",
	__name: "Barcode",
	props: {
		value: {},
		format: { default: "code128" },
		width: { default: 240 },
		height: { default: 90 },
		color: { default: "currentColor" },
		showText: {
			type: Boolean,
			default: !0
		},
		label: {},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => {
			try {
				return {
					result: or(n.value ?? "", n.format),
					error: null
				};
			} catch (e) {
				return {
					result: null,
					error: e instanceof Error ? e.message : "Unable to encode barcode"
				};
			}
		}), a = i(() => {
			let e = r.value.result;
			if (!e) return [];
			let t = e.modules, i = t.length, a = n.showText ? 18 : 0;
			Math.max(1, n.height - a);
			let o = n.width / i, s = [], c = 0;
			for (; c < i;) {
				if (!t[c]) {
					c++;
					continue;
				}
				let e = 1;
				for (; c + e < i && t[c + e];) e++;
				s.push({
					x: c * o,
					width: e * o
				}), c += e;
			}
			return s;
		}), o = i(() => n.showText ? Math.max(1, n.height - 18) : n.height), u = i(() => ({
			top: `${o.value}px`,
			height: n.showText ? "18px" : "0px"
		})), d = i(() => Z("mc-barcode", "mc-sheen-sweep", `mc-barcode--${n.format}`, { "is-error": !!r.value.error }, n.customClass));
		return (n, i) => (A(), c("div", {
			class: C(d.value),
			style: T({
				width: `${t.width}px`,
				height: `${t.height}px`
			})
		}, [
			i[0] || (i[0] = l("span", {
				class: "mc-barcode__halo",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", sr, [r.value.result ? (A(), c("svg", {
				key: 0,
				class: "mc-barcode__svg",
				width: t.width,
				height: o.value,
				viewBox: `0 0 ${t.width} ${o.value}`,
				role: "img",
				"aria-label": t.label || t.value || "Barcode"
			}, [(A(!0), c(e, null, P(a.value, (e, n) => (A(), c("rect", {
				key: n,
				x: e.x,
				y: "0",
				width: e.width,
				height: o.value,
				fill: t.color
			}, null, 8, lr))), 128))], 8, cr)) : (A(), c("span", ur, R(r.value.error), 1))]),
			t.showText && r.value.result ? (A(), c("div", {
				key: 0,
				class: "mc-barcode__text",
				style: T(u.value)
			}, [
				r.value.result.leadingText ? (A(), c("span", dr, R(r.value.result.leadingText), 1)) : s("", !0),
				l("span", fr, R(r.value.result.text), 1),
				r.value.result.trailingText ? (A(), c("span", pr, R(r.value.result.trailingText), 1)) : s("", !0)
			], 4)) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-f865edc9"]]), hr = ["aria-label"], gr = { class: "mc-breadcrumb__list" }, _r = {
	key: 0,
	class: "mc-breadcrumb__separator",
	"aria-hidden": "true"
}, vr = ["aria-expanded", "aria-label"], yr = ["href", "onClick"], br = { class: "mc-breadcrumb__label" }, xr = ["aria-current", "aria-disabled"], Sr = { class: "mc-breadcrumb__label" }, Cr = ["aria-disabled", "onClick"], wr = { class: "mc-breadcrumb__popup-content" }, Tr = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiBreadcrumb",
	__name: "Breadcrumb",
	props: {
		items: {},
		separator: { default: "chevron-right" },
		maxItems: { default: 0 },
		customClass: {}
	},
	emits: ["select"],
	setup(r, { emit: a }) {
		let u = r, p = Zt(), m = An(), h = a, g = N(null), _ = N(null), v = N(!1), { isTop: y } = On({ active: v }), { style: b, transformOrigin: w, update: T, startAutoUpdate: D, stopAutoUpdate: k } = _n(g, _, {
			placement: "bottom",
			offset: 8,
			flip: !0
		});
		function j(e = !1) {
			v.value = !0, S(() => {
				T(), D(), e && M();
			});
		}
		function M() {
			(_.value?.querySelector("[role=\"menuitem\"]:not([aria-disabled=\"true\"])"))?.focus();
		}
		function F() {
			v.value && (v.value = !1, k());
		}
		function I(e) {
			if (!v.value) return;
			let t = e.target;
			t && (g.value?.contains(t) || _.value?.contains(t) || F());
		}
		function L(e) {
			e.key === "Escape" ? v.value && y() && (e.stopPropagation(), F()) : (e.key === "Enter" || e.key === " ") && (e.preventDefault(), v.value ? F() : j(!0));
		}
		function z(e) {
			if (e.key === "Escape") {
				if (!y()) return;
				e.stopPropagation(), F();
				return;
			}
			if (![
				"ArrowDown",
				"ArrowUp",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = e.currentTarget, n = Array.from(t.querySelectorAll("[role=\"menuitem\"]:not([aria-disabled=\"true\"])"));
			if (!n.length) return;
			let r = n.indexOf(document.activeElement);
			e.preventDefault();
			let i = r;
			e.key === "ArrowDown" ? i = r + 1 : e.key === "ArrowUp" ? i = r - 1 : e.key === "Home" ? i = 0 : e.key === "End" && (i = n.length - 1), i < 0 && (i = 0), i >= n.length && (i = n.length - 1), n[i]?.focus();
		}
		O(() => {
			wt && document.addEventListener("mousedown", I, !0);
		}), E(() => {
			k(), wt && document.removeEventListener("mousedown", I, !0);
		});
		let V = i(() => {
			let e = u.items ?? [], t = u.maxItems;
			if (!t || t <= 0 || e.length <= t) return e.map((e, t) => ({
				item: e,
				index: t,
				type: "item"
			}));
			let n = Math.max(1, t - 1 - 1), r = e.slice(0, 1), i = e.slice(e.length - n);
			e.slice(1, e.length - n);
			let a = r.map((e, t) => ({
				item: e,
				index: t,
				type: "item"
			}));
			return a.push({
				item: { label: "…" },
				index: 1,
				type: "ellipsis"
			}), i.forEach((t, r) => {
				a.push({
					item: t,
					index: e.length - n + r,
					type: "item"
				});
			}), a;
		}), H = i(() => {
			let e = u.items ?? [], t = u.maxItems;
			if (!t || t <= 0 || e.length <= t) return [];
			let n = Math.max(1, t - 2);
			return e.slice(1, e.length - n).map((e, t) => ({
				item: e,
				index: t + 1
			}));
		});
		function U(e, t) {
			e.disabled || (h("select", e, t), F());
		}
		let W = i(() => Z("mc-breadcrumb", u.customClass));
		return (i, a) => (A(), c("nav", {
			class: C(W.value),
			"aria-label": B(p).breadcrumb?.label ?? "Breadcrumb"
		}, [l("ol", gr, [(A(!0), c(e, null, P(V.value, (e, t) => (A(), c("li", {
			key: `${e.type}-${e.index}`,
			class: "mc-breadcrumb__item"
		}, [t > 0 ? (A(), c("span", _r, [f($, {
			name: r.separator,
			size: 15,
			"stroke-width": 2
		}, null, 8, ["name"])])) : s("", !0), e.type === "ellipsis" ? (A(), c("button", {
			key: 1,
			ref_for: !0,
			ref_key: "ellipsisRef",
			ref: g,
			type: "button",
			class: "mc-breadcrumb__ellipsis",
			"aria-haspopup": "true",
			"aria-expanded": v.value,
			"aria-label": B(p).breadcrumb?.expand ?? "Show hidden breadcrumbs",
			onClick: a[0] || (a[0] = (e) => v.value ? F() : j()),
			onMouseenter: a[1] || (a[1] = (e) => j()),
			onKeydown: L
		}, [f($, {
			name: "more-horizontal",
			size: 15
		})], 40, vr)) : e.item.href && !e.item.disabled ? (A(), c("a", {
			key: 2,
			class: "mc-breadcrumb__link",
			href: e.item.href,
			onClick: (t) => U(e.item, e.index)
		}, [e.item.icon ? (A(), o($, {
			key: 0,
			name: e.item.icon,
			size: 15,
			class: "mc-breadcrumb__icon"
		}, null, 8, ["name"])) : s("", !0), l("span", br, R(e.item.label), 1)], 8, yr)) : (A(), c("span", {
			key: 3,
			class: C(["mc-breadcrumb__text", {
				"is-current": t === V.value.length - 1,
				"is-disabled": e.item.disabled
			}]),
			"aria-current": t === V.value.length - 1 ? "page" : void 0,
			"aria-disabled": e.item.disabled ? "true" : void 0
		}, [e.item.icon ? (A(), o($, {
			key: 0,
			name: e.item.icon,
			size: 15,
			class: "mc-breadcrumb__icon"
		}, null, 8, ["name"])) : s("", !0), l("span", Sr, R(e.item.label), 1)], 10, xr))]))), 128))]), (A(), o(t, { to: "body" }, [f(n, { name: "mc-breadcrumb-pop" }, {
			default: ee(() => [v.value && H.value.length ? (A(), c("div", x({
				key: 0,
				ref_key: "popupRef",
				ref: _,
				class: "mc-breadcrumb__popup mc-grain-overlay",
				style: [B(b), { transformOrigin: B(w) }]
			}, B(m), {
				role: "menu",
				onKeydown: z
			}), [a[2] || (a[2] = l("span", {
				class: "mc-breadcrumb__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)), (A(!0), c(e, null, P(H.value, (e) => (A(), c("button", {
				key: e.item.label,
				type: "button",
				class: C(["mc-breadcrumb__popup-item mc-sheen-sweep", { "is-disabled": e.item.disabled }]),
				role: "menuitem",
				"aria-disabled": e.item.disabled ? "true" : void 0,
				onClick: (t) => U(e.item, e.index)
			}, [l("span", wr, [e.item.icon ? (A(), o($, {
				key: 0,
				name: e.item.icon,
				size: 15,
				class: "mc-breadcrumb__icon"
			}, null, 8, ["name"])) : s("", !0), d(" " + R(e.item.label), 1)])], 10, Cr))), 128))], 16)) : s("", !0)]),
			_: 1
		})]))], 10, hr));
	}
}), [["__scopeId", "data-v-5b263ab0"]]), Er = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Dr = {
	key: 1,
	class: "mc-button__aurora",
	"aria-hidden": "true"
}, Or = {
	key: 2,
	class: "mc-button__grain",
	"aria-hidden": "true"
}, kr = {
	key: 3,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Ar = {
	key: 4,
	class: "mc-button__spinner",
	"aria-hidden": "true"
}, jr = {
	key: 6,
	class: "mc-button__label"
}, Mr = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiButtonInner",
	__name: "ButtonInner",
	props: {
		loading: { type: Boolean },
		iconLeft: {},
		iconRight: {},
		glow: {},
		material: {}
	},
	setup(t) {
		return (n, r) => (A(), c(e, null, [
			t.material === "liquid" ? (A(), c("span", Er)) : s("", !0),
			t.material === "glass" ? (A(), c("span", Dr)) : s("", !0),
			t.material === "glass" ? (A(), c("span", Or)) : s("", !0),
			t.material === "liquid" ? (A(), c("span", kr)) : s("", !0),
			l("span", {
				class: "mc-button__glow",
				style: T(t.glow),
				"aria-hidden": "true"
			}, null, 4),
			r[1] || (r[1] = l("span", {
				class: "mc-button__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			t.loading ? (A(), c("span", Ar, [...r[0] || (r[0] = [l("svg", {
				viewBox: "0 0 24 24",
				width: "1em",
				height: "1em"
			}, [l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})], -1)])])) : t.iconLeft ? (A(), o($, {
				key: 5,
				name: t.iconLeft,
				class: "mc-button__icon"
			}, null, 8, ["name"])) : s("", !0),
			n.$slots.default ? (A(), c("span", jr, [F(n.$slots, "default", {}, void 0, !0)])) : s("", !0),
			t.iconRight && !t.loading ? (A(), o($, {
				key: 7,
				name: t.iconRight,
				class: "mc-button__icon"
			}, null, 8, ["name"])) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-2fca074c"]]), Nr = [
	"href",
	"tabindex",
	"aria-disabled",
	"aria-busy"
], Pr = [
	"type",
	"disabled",
	"aria-busy"
], Fr = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiButton",
	__name: "Button",
	props: {
		variant: { default: "soft" },
		color: { default: "default" },
		size: { default: "medium" },
		shape: { default: "pill" },
		disabled: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		effect: { default: "squish" },
		iconLeft: {},
		iconRight: {},
		type: { default: "button" },
		href: {},
		customClass: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = N(null), o = N(50), s = N(50), l = i(() => ({
			"--mc-mx": `${o.value}%`,
			"--mc-my": `${s.value}%`
		}));
		function u(e) {
			let t = a.value;
			if (!t) return;
			let n = t.getBoundingClientRect();
			o.value = (e.clientX - n.left) / n.width * 100, s.value = (e.clientY - n.top) / n.height * 100;
		}
		function d(e) {
			n.disabled || n.loading ? (e.preventDefault(), e.stopPropagation()) : r("click", e);
		}
		let p = i(() => Z("mc-button", `mc-button--${n.variant}`, `mc-button--${n.color}`, `mc-button--${n.size}`, `mc-button--${n.shape}`, `mc-button--fx-${n.effect}`, {
			"mc-liquid-glass": n.variant === "liquid",
			"mc-liquid-glass--liquid": n.variant === "liquid",
			"mc-liquid-glass--layers": n.variant === "liquid",
			"is-disabled": n.disabled,
			"is-loading": n.loading,
			"is-block": n.block
		}, n.customClass));
		return (t, n) => e.href ? (A(), c("a", {
			key: 0,
			ref_key: "root",
			ref: a,
			class: C(p.value),
			href: e.disabled || e.loading ? void 0 : e.href,
			tabindex: e.disabled || e.loading ? -1 : void 0,
			"aria-disabled": e.disabled || e.loading || void 0,
			"aria-busy": e.loading || void 0,
			onClick: d,
			onMousemove: u
		}, [f(Mr, {
			loading: e.loading,
			"icon-left": e.iconLeft,
			"icon-right": e.iconRight,
			glow: l.value,
			material: e.variant === "liquid" ? "liquid" : e.variant === "glass" ? "glass" : ""
		}, {
			default: ee(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, [
			"loading",
			"icon-left",
			"icon-right",
			"glow",
			"material"
		])], 42, Nr)) : (A(), c("button", {
			key: 1,
			ref_key: "root",
			ref: a,
			class: C(p.value),
			type: e.type,
			disabled: e.disabled || e.loading,
			"aria-busy": e.loading || void 0,
			onClick: d,
			onMousemove: u
		}, [f(Mr, {
			loading: e.loading,
			"icon-left": e.iconLeft,
			"icon-right": e.iconRight,
			glow: l.value,
			material: e.variant === "liquid" ? "liquid" : e.variant === "glass" ? "glass" : ""
		}, {
			default: ee(() => [F(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, [
			"loading",
			"icon-left",
			"icon-right",
			"glow",
			"material"
		])], 42, Pr));
	}
}), [["__scopeId", "data-v-9ed2b4b7"]]), Ir = { class: "mc-calendar__header" }, Lr = ["disabled", "aria-label"], Rr = { class: "mc-calendar__title mc-sheen-sweep" }, zr = ["disabled", "aria-label"], Br = ["disabled"], Vr = {
	key: 0,
	class: "mc-calendar__grid"
}, Hr = {
	key: 0,
	class: "mc-calendar__week-num mc-calendar__week-num--head"
}, Ur = {
	key: 0,
	class: "mc-calendar__week-num"
}, Wr = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"onClick"
], Gr = { class: "mc-calendar__day-num" }, Kr = {
	key: 0,
	class: "mc-calendar__dots",
	"aria-hidden": "true"
}, qr = {
	key: 1,
	class: "mc-calendar__day-label"
}, Jr = {
	key: 1,
	class: "mc-calendar__week"
}, Yr = { class: "mc-calendar__week-head" }, Xr = ["onClick"], Zr = { class: "mc-calendar__day-head-name" }, Qr = { class: "mc-calendar__day-head-num" }, $r = { class: "mc-calendar__week-body" }, ei = { class: "mc-calendar__hours" }, ti = [
	"aria-label",
	"onClick",
	"onKeydown"
], ni = 40, ri = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCalendar",
	__name: "Calendar",
	props: {
		modelValue: { default: null },
		month: {},
		mode: { default: "month" },
		locale: { default: "en-US" },
		showWeekNumber: {
			type: Boolean,
			default: !1
		},
		events: { default: () => [] },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:month",
		"select",
		"month-change"
	],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n;
		function u(e) {
			if (e == null || e === "") return null;
			if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
			let t = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2}))?/.exec(e);
			if (t) return new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), Number(t[4] ?? 0), Number(t[5] ?? 0));
			let n = new Date(e);
			return Number.isNaN(n.getTime()) ? null : n;
		}
		function d(e) {
			return `${e.getFullYear()}-${`${e.getMonth() + 1}`.padStart(2, "0")}-${`${e.getDate()}`.padStart(2, "0")}`;
		}
		function p(e, t) {
			return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
		}
		function m(e) {
			try {
				let t = new Intl.Locale(e).weekInfo?.firstDay;
				if (typeof t == "number") return t % 7;
			} catch {}
			return 1;
		}
		function h(e) {
			let t = new Date(e.getFullYear(), e.getMonth(), e.getDate()), n = (t.getDay() + 6) % 7;
			t.setDate(t.getDate() - n + 3);
			let r = new Date(t.getFullYear(), 0, 4), i = (r.getDay() + 6) % 7;
			return r.setDate(r.getDate() - i + 3), 1 + Math.round((t.getTime() - r.getTime()) / 6048e5);
		}
		let g = /* @__PURE__ */ new Date(), _ = N(null);
		G(() => r.modelValue, (e) => {
			_.value = u(e);
		}, { immediate: !0 });
		let v = N(null);
		G(() => r.month, (e) => {
			v.value = u(e);
		}, { immediate: !0 });
		let y = i(() => _.value), b = i(() => v.value ?? y.value ?? g), x = i(() => r.locale || "en-US"), S = i(() => {
			try {
				return new Intl.DateTimeFormat(x.value, {
					month: "long",
					year: "numeric"
				}).format(b.value);
			} catch {
				return `${b.value.getFullYear()}/${b.value.getMonth() + 1}`;
			}
		}), w = i(() => {
			let e = [], t = m(x.value);
			try {
				let n = new Intl.DateTimeFormat(x.value, { weekday: "short" });
				for (let r = 0; r < 7; r += 1) {
					let i = new Date(2024, 0, 7 + (t + r) % 7);
					e.push(n.format(i));
				}
			} catch {
				for (let n = 0; n < 7; n += 1) e.push([
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
				][(t + n) % 7]);
			}
			return e;
		});
		function E(e) {
			try {
				return new Intl.DateTimeFormat(x.value, { weekday: "short" }).format(e);
			} catch {
				return [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
				][e.getDay()];
			}
		}
		function D(e) {
			try {
				return new Intl.DateTimeFormat(x.value, {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				}).format(e);
			} catch {
				return d(e);
			}
		}
		let O = i(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of r.events) {
				let n = u(t.date);
				if (!n) continue;
				let r = d(n), i = e.get(r);
				i ? i.push(t) : e.set(r, [t]);
			}
			return e;
		});
		function k(e) {
			let t = /(\d{1,2}):(\d{2})/.exec(e.time ?? e.date);
			return t ? {
				hour: Math.min(23, Math.max(0, Number(t[1]))),
				minute: Math.min(59, Math.max(0, Number(t[2])))
			} : {
				hour: 0,
				minute: 0
			};
		}
		function j(e) {
			return (O.value.get(e) ?? []).map((t, n) => {
				let { hour: r, minute: i } = k(t);
				return {
					key: `${e}-${n}`,
					label: t.label ?? "",
					color: t.color,
					top: (r + i / 60) * ni,
					height: ni * .5
				};
			});
		}
		let M = i(() => {
			let e = b.value, t = e.getFullYear(), n = e.getMonth(), r = (new Date(t, n, 1).getDay() - m(x.value) + 7) % 7, i = [];
			for (let e = 0; e < 42; e += 1) {
				let a = new Date(t, n, 1 - r + e), o = d(a);
				i.push({
					date: a,
					key: o,
					day: a.getDate(),
					inMonth: a.getMonth() === n,
					isToday: p(a, g),
					isSelected: y.value ? p(a, y.value) : !1,
					events: O.value.get(o) ?? [],
					weekNumber: h(a)
				});
			}
			return i;
		}), I = i(() => {
			let e = y.value ?? b.value, t = new Date(e.getFullYear(), e.getMonth(), e.getDate()), n = (t.getDay() - m(x.value) + 7) % 7;
			t.setDate(t.getDate() - n);
			let r = [];
			for (let e = 0; e < 7; e += 1) {
				let n = new Date(t.getFullYear(), t.getMonth(), t.getDate() + e), i = d(n);
				r.push({
					date: n,
					key: i,
					day: n.getDate(),
					isToday: p(n, g),
					isSelected: y.value ? p(n, y.value) : !1,
					events: O.value.get(i) ?? []
				});
			}
			return r;
		}), L = Array.from({ length: 24 }, (e, t) => t);
		function z(e) {
			return `${`${e}`.padStart(2, "0")}:00`;
		}
		function V(e) {
			if (r.disabled) return;
			let t = b.value, n = r.mode === "week" ? new Date(t.getFullYear(), t.getMonth(), t.getDate() + e * 7) : new Date(t.getFullYear(), t.getMonth() + e, 1);
			v.value = n, o("update:month", n), o("month-change", n);
		}
		function H() {
			if (r.disabled) return;
			let e = /* @__PURE__ */ new Date();
			_.value = e, v.value = new Date(e.getFullYear(), e.getMonth(), 1), o("update:modelValue", e), o("update:month", v.value), o("select", e);
		}
		function U(e) {
			r.disabled || (_.value = e, o("update:modelValue", e), o("select", e));
		}
		let W = i(() => Z("mc-calendar", "mc-grain-overlay", `mc-calendar--${r.mode}`, {
			"has-week-numbers": r.showWeekNumber,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (A(), c("div", { class: C(W.value) }, [
			l("header", Ir, [
				l("button", {
					type: "button",
					class: "mc-calendar__nav",
					disabled: t.disabled,
					"aria-label": t.mode === "week" ? B(a).calendar?.previousWeek ?? "Previous week" : B(a).calendar?.previousMonth ?? "Previous month",
					onClick: r[0] || (r[0] = (e) => V(-1))
				}, [f($, {
					name: "chevron-left",
					size: 16,
					"stroke-width": 2.2
				})], 8, Lr),
				l("span", Rr, R(S.value), 1),
				l("button", {
					type: "button",
					class: "mc-calendar__nav",
					disabled: t.disabled,
					"aria-label": t.mode === "week" ? B(a).calendar?.nextWeek ?? "Next week" : B(a).calendar?.nextMonth ?? "Next month",
					onClick: r[1] || (r[1] = (e) => V(1))
				}, [f($, {
					name: "chevron-right",
					size: 16,
					"stroke-width": 2.2
				})], 8, zr),
				l("button", {
					type: "button",
					class: "mc-calendar__today",
					disabled: t.disabled,
					onClick: H
				}, " Today ", 8, Br)
			]),
			t.mode === "month" ? (A(), c("div", Vr, [
				t.showWeekNumber ? (A(), c("div", Hr, " # ")) : s("", !0),
				(A(!0), c(e, null, P(w.value, (e, t) => (A(), c("div", {
					key: `wd-${t}`,
					class: "mc-calendar__weekday"
				}, R(e), 1))), 128)),
				(A(!0), c(e, null, P(M.value, (n, r) => (A(), c(e, { key: n.key }, [t.showWeekNumber && r % 7 == 0 ? (A(), c("div", Ur, R(n.weekNumber), 1)) : s("", !0), l("button", {
					type: "button",
					class: C(["mc-calendar__day", {
						"is-outside": !n.inMonth,
						"is-today": n.isToday,
						"is-selected": n.isSelected,
						"has-events": n.events.length > 0,
						"mc-aurora-inset": n.isSelected
					}]),
					disabled: t.disabled,
					"aria-label": D(n.date),
					"aria-pressed": n.isSelected,
					onClick: (e) => U(n.date)
				}, [
					l("span", Gr, R(n.day), 1),
					n.events.length ? (A(), c("span", Kr, [(A(!0), c(e, null, P(n.events.slice(0, 3), (e, t) => (A(), c("span", {
						key: t,
						class: "mc-calendar__dot",
						style: T(e.color ? { "--mc-calendar-color": e.color } : void 0)
					}, null, 4))), 128))])) : s("", !0),
					n.events.length && n.events[0]?.label ? (A(), c("span", qr, R(n.events[0].label), 1)) : s("", !0)
				], 10, Wr)], 64))), 128))
			])) : (A(), c("div", Jr, [l("div", Yr, [r[2] || (r[2] = l("div", { class: "mc-calendar__gutter" }, null, -1)), (A(!0), c(e, null, P(I.value, (e) => (A(), c("button", {
				key: e.key,
				type: "button",
				class: C(["mc-calendar__day-head", {
					"is-today": e.isToday,
					"is-selected": e.isSelected
				}]),
				onClick: (t) => U(e.date)
			}, [l("span", Zr, R(E(e.date)), 1), l("span", Qr, R(e.day), 1)], 10, Xr))), 128))]), l("div", $r, [l("div", ei, [(A(!0), c(e, null, P(B(L), (e) => (A(), c("span", {
				key: e,
				class: "mc-calendar__hour"
			}, R(z(e)), 1))), 128))]), (A(!0), c(e, null, P(I.value, (t) => (A(), c("div", {
				key: t.key,
				class: C(["mc-calendar__col", {
					"is-today": t.isToday,
					"is-selected": t.isSelected
				}]),
				role: "button",
				tabindex: "0",
				"aria-label": D(t.date),
				onClick: (e) => U(t.date),
				onKeydown: [K(q((e) => U(t.date), ["prevent"]), ["enter"]), K(q((e) => U(t.date), ["prevent"]), ["space"])]
			}, [(A(!0), c(e, null, P(B(L), (e) => (A(), c("span", {
				key: e,
				class: "mc-calendar__slot"
			}))), 128)), (A(!0), c(e, null, P(j(t.key), (e) => (A(), c("span", {
				key: e.key,
				class: "mc-calendar__event",
				style: T({
					top: `${e.top}px`,
					height: `${e.height}px`,
					...e.color ? { "--mc-calendar-color": e.color } : {}
				})
			}, R(e.label), 5))), 128))], 42, ti))), 128))])])),
			F(n.$slots, "default", {}, void 0, !0)
		], 2));
	}
}), [["__scopeId", "data-v-5462b1de"]]), ii = ["tabindex", "aria-disabled"], ai = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, oi = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, si = {
	key: 2,
	class: "mc-card__sheen",
	"aria-hidden": "true"
}, ci = {
	key: 3,
	class: "mc-card__grain",
	"aria-hidden": "true"
}, li = {
	key: 4,
	class: "mc-card__corner"
}, ui = {
	key: 5,
	class: "mc-card__media"
}, di = {
	key: 6,
	class: "mc-card__header"
}, fi = {
	key: 0,
	class: "mc-card__header-main"
}, pi = {
	key: 1,
	class: "mc-card__extra"
}, mi = { class: "mc-card__body" }, hi = {
	key: 7,
	class: "mc-card__footer"
}, gi = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCard",
	__name: "Card",
	props: {
		variant: { default: "solid" },
		padding: { default: "medium" },
		hoverable: {
			type: Boolean,
			default: !1
		},
		sheen: {
			type: Boolean,
			default: !1
		},
		tilt: {
			type: Boolean,
			default: !1
		},
		grain: {
			type: Boolean,
			default: !1
		},
		highlight: {
			type: Boolean,
			default: !0
		},
		blob: {
			type: Boolean,
			default: !1
		},
		aurora: {
			type: Boolean,
			default: !1
		},
		focusable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(null);
		function r(e) {
			t.focusable && !t.disabled && bt(e, n.value);
		}
		let a = i(() => Z("mc-card", `mc-card--${t.variant}`, `mc-card--pad-${t.padding}`, {
			"mc-liquid-glass": t.variant === "liquid",
			"mc-liquid-glass--liquid": t.variant === "liquid",
			"mc-liquid-glass--layers": t.variant === "liquid",
			"is-hoverable": t.hoverable,
			"is-sheen": t.sheen,
			"is-tilt": t.tilt,
			"is-grain": t.grain,
			"is-highlight": t.highlight,
			"is-blob": t.blob,
			"is-aurora": t.aurora,
			"is-disabled": t.disabled
		}, t.customClass));
		return (t, i) => (A(), c("section", {
			ref_key: "root",
			ref: n,
			class: C(a.value),
			tabindex: e.focusable ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: q(r, ["self"])
		}, [
			e.variant === "liquid" ? (A(), c("span", ai)) : s("", !0),
			i[0] || (i[0] = l("span", {
				class: "mc-card__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.variant === "liquid" ? (A(), c("span", oi)) : s("", !0),
			e.sheen ? (A(), c("span", si)) : s("", !0),
			e.grain ? (A(), c("span", ci)) : s("", !0),
			t.$slots.corner ? (A(), c("div", li, [F(t.$slots, "corner", {}, void 0, !0)])) : s("", !0),
			t.$slots.media ? (A(), c("div", ui, [F(t.$slots, "media", {}, void 0, !0)])) : s("", !0),
			t.$slots.header || t.$slots.extra ? (A(), c("header", di, [t.$slots.header ? (A(), c("div", fi, [F(t.$slots, "header", {}, void 0, !0)])) : s("", !0), t.$slots.extra ? (A(), c("div", pi, [F(t.$slots, "extra", {}, void 0, !0)])) : s("", !0)])) : s("", !0),
			l("div", mi, [F(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (A(), c("footer", hi, [F(t.$slots, "footer", {}, void 0, !0)])) : s("", !0)
		], 42, ii));
	}
}), [["__scopeId", "data-v-8153b659"]]), _i = { class: "mc-carousel__viewport" }, vi = ["src", "alt"], yi = {
	key: 1,
	class: "mc-carousel__caption"
}, bi = { class: "mc-carousel__caption-inner" }, xi = {
	key: 0,
	class: "mc-carousel__tag"
}, Si = {
	class: "mc-carousel__title",
	"data-mc-type": "title"
}, Ci = {
	key: 1,
	class: "mc-carousel__desc"
}, wi = ["href"], Ti = {
	class: "mc-visually-hidden",
	"aria-live": "polite"
}, Ei = ["aria-label", "disabled"], Di = ["aria-label", "disabled"], Oi = {
	key: 2,
	class: "mc-carousel__dots"
}, ki = [
	"aria-label",
	"aria-current",
	"onClick"
], Ai = {
	key: 3,
	class: "mc-carousel__fraction"
}, ji = {
	key: 4,
	class: "mc-carousel__numbers"
}, Mi = ["aria-label", "onClick"], Ni = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCarousel",
	__name: "Carousel",
	props: {
		items: {},
		modelValue: { default: 0 },
		height: { default: "360px" },
		interval: { default: 5e3 },
		loop: {
			type: Boolean,
			default: !0
		},
		effect: { default: "slide" },
		direction: { default: "horizontal" },
		indicator: { default: "dots" },
		autoplay: {
			type: Boolean,
			default: !0
		},
		pauseOnHover: {
			type: Boolean,
			default: !0
		},
		kenBurns: {
			type: Boolean,
			default: !0
		},
		caption: {
			type: Boolean,
			default: !0
		},
		draggable: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n, u = N(r.modelValue), p = i(() => r.items?.length ?? 0), m = N(!1), h = N(!1), g = N(0), _ = N(0), v = N(null), y = null;
		G(() => r.modelValue, (e) => {
			typeof e == "number" && e !== u.value && (u.value = e);
		}), G(() => r.autoplay, () => b()), G(p, () => b());
		function b() {
			x(), !(!r.autoplay || r.interval <= 0 || p.value < 2) && (y = setInterval(() => w(), r.interval));
		}
		function x() {
			y && (clearInterval(y), y = null);
		}
		function S(e) {
			let t = p.value;
			if (t === 0) return;
			let n = e;
			n = r.loop ? (e % t + t) % t : Math.min(Math.max(e, 0), t - 1), n !== u.value && (u.value = n, o("update:modelValue", n), o("change", n));
		}
		function w() {
			p.value && (!r.loop && u.value >= p.value - 1 || S(u.value + 1));
		}
		function D() {
			p.value && (!r.loop && u.value <= 0 || S(u.value - 1));
		}
		function k(e) {
			!r.draggable || p.value < 2 || e.button === 0 && (e.target?.closest("button, a") || (h.value = !0, g.value = e.clientX, _.value = 0, e.currentTarget.setPointerCapture?.(e.pointerId)));
		}
		function j(e) {
			if (!h.value) return;
			let t = v.value;
			if (t) {
				let n = t.getBoundingClientRect();
				if (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) {
					M(e);
					return;
				}
			}
			_.value = e.clientX - g.value;
		}
		function M(e) {
			h.value && (h.value = !1, Math.abs(_.value) > 60 && (_.value > 0 ? D() : w()), _.value = 0, e && e.currentTarget.releasePointerCapture?.(e.pointerId));
		}
		function I() {
			h.value && (h.value = !1, _.value = 0);
		}
		function L(e) {
			e.key === "ArrowRight" ? w() : e.key === "ArrowLeft" && D();
		}
		let z = i(() => {
			if (r.effect === "fade") return {};
			let e = -u.value * 100, t = _.value;
			return r.direction === "vertical" ? { transform: `translate3d(0, calc(${e}% + ${t}px), 0)` } : { transform: `translate3d(calc(${e}% + ${t}px), 0, 0)` };
		}), V = i(() => r.items?.[u.value]), H = i(() => {
			let e = V.value, t = `Slide ${u.value + 1} of ${p.value}`;
			return e?.title ? `${t}: ${e.title}` : t;
		}), U = i(() => !r.loop && u.value === 0), W = i(() => !r.loop && u.value >= p.value - 1);
		function ee() {
			m.value = !0, r.pauseOnHover && x();
		}
		function te() {
			m.value = !1, r.pauseOnHover && b();
		}
		return O(b), E(x), (n, r) => (A(), c("div", {
			ref_key: "root",
			ref: v,
			class: C(["mc-carousel", [B(Z)(`mc-carousel--${t.effect}`, `mc-carousel--${t.direction}`, { "is-dragging": h.value }, t.customClass)]]),
			style: T({ height: typeof t.height == "number" ? `${t.height}px` : t.height }),
			tabindex: "0",
			role: "region",
			"aria-roledescription": "carousel",
			onMouseenter: ee,
			onMouseleave: te,
			onKeydown: L,
			onPointerdown: k,
			onPointermove: j,
			onPointerup: M,
			onPointercancel: I
		}, [
			l("div", _i, [l("div", {
				class: "mc-carousel__track",
				style: T(z.value)
			}, [F(n.$slots, "default", {}, () => [(A(!0), c(e, null, P(t.items, (e, n) => (A(), c("div", {
				key: n,
				class: C(["mc-carousel__slide", {
					"is-active": n === u.value,
					"is-ken-burns": t.kenBurns && n === u.value
				}])
			}, [
				e.src ? (A(), c("img", {
					key: 0,
					class: "mc-carousel__img",
					src: e.src,
					alt: e.title ?? ""
				}, null, 8, vi)) : s("", !0),
				r[2] || (r[2] = l("div", { class: "mc-carousel__veil" }, null, -1)),
				t.caption && e.title ? (A(), c("div", yi, [r[1] || (r[1] = l("span", {
					class: "mc-carousel__aurora",
					"aria-hidden": "true"
				}, null, -1)), l("div", bi, [
					e.tag ? (A(), c("span", xi, R(e.tag), 1)) : s("", !0),
					l("h3", Si, R(e.title), 1),
					e.description ? (A(), c("p", Ci, R(e.description), 1)) : s("", !0),
					e.link ? (A(), c("a", {
						key: 2,
						class: "mc-carousel__cta",
						href: e.link
					}, [r[0] || (r[0] = d(" Read more ", -1)), f($, {
						name: "arrow-right",
						size: 15
					})], 8, wi)) : s("", !0)
				])])) : s("", !0)
			], 2))), 128))], !0)], 4)]),
			l("p", Ti, R(H.value), 1),
			t.indicator !== "none" && p.value > 1 ? (A(), c(e, { key: 0 }, [
				t.indicator === "arrows" ? (A(), c("button", {
					key: 0,
					class: "mc-carousel__nav is-prev",
					type: "button",
					"aria-label": B(a).carousel?.previous ?? "Previous",
					disabled: U.value,
					onClick: D
				}, [f($, {
					name: "chevron-left",
					size: 18
				})], 8, Ei)) : s("", !0),
				t.indicator === "arrows" ? (A(), c("button", {
					key: 1,
					class: "mc-carousel__nav is-next",
					type: "button",
					"aria-label": B(a).carousel?.next ?? "Next",
					disabled: W.value,
					onClick: w
				}, [f($, {
					name: "chevron-right",
					size: 18
				})], 8, Di)) : s("", !0),
				t.indicator === "dots" ? (A(), c("div", Oi, [(A(!0), c(e, null, P(t.items, (e, t) => (A(), c("button", {
					key: t,
					class: C(["mc-carousel__dot", { "is-active": t === u.value }]),
					type: "button",
					"aria-label": `Go to slide ${t + 1}`,
					"aria-current": t === u.value,
					onClick: (e) => S(t)
				}, [...r[3] || (r[3] = [l("span", { class: "mc-carousel__dot-fill" }, null, -1)])], 10, ki))), 128))])) : s("", !0),
				t.indicator === "fraction" ? (A(), c("div", Ai, [
					l("strong", null, R(String(u.value + 1).padStart(2, "0")), 1),
					r[4] || (r[4] = l("span", null, "/", -1)),
					l("span", null, R(String(p.value).padStart(2, "0")), 1)
				])) : s("", !0),
				t.indicator === "numbers" ? (A(), c("div", ji, [(A(!0), c(e, null, P(t.items, (e, t) => (A(), c("button", {
					key: t,
					class: C(["mc-carousel__number", { "is-active": t === u.value }]),
					type: "button",
					"aria-label": `Go to slide ${t + 1}`,
					onClick: (e) => S(t)
				}, R(String(t + 1).padStart(2, "0")), 11, Mi))), 128))])) : s("", !0)
			], 64)) : s("", !0)
		], 38));
	}
}), [["__scopeId", "data-v-a378cf68"]]), Pi = 0;
function Fi(e = "mc") {
	let t = m();
	return t?.uid === void 0 ? (Pi += 1, `${e}-${Pi}`) : `${e}-${t.uid}-${Pi++}`;
}
function Ii(e = "mc") {
	return N(Fi(e));
}
var Li = Symbol("mochi-id");
function Ri(e) {
	j(Li, e);
}
function zi(e) {
	return v(Li, e);
}
//#endregion
//#region src/components/cascader/Cascader.vue?vue&type=script&setup=true&lang.ts
var Bi = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant"
], Vi = {
	key: 0,
	class: "mc-cascader__tags"
}, Hi = { class: "mc-cascader__tag-label" }, Ui = ["aria-label", "onClick"], Wi = { class: "mc-cascader__affix" }, Gi = ["aria-label"], Ki = ["id", "aria-multiselectable"], qi = {
	key: 0,
	class: "mc-cascader__breadcrumb"
}, Ji = { class: "mc-cascader__crumb" }, Yi = [
	"id",
	"aria-selected",
	"aria-disabled",
	"disabled",
	"onClick",
	"onMouseenter"
], Xi = { class: "mc-cascader__option-label" }, Zi = {
	key: 0,
	class: "mc-cascader__empty"
}, Qi = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCascader",
	__name: "Cascader",
	props: {
		modelValue: { default: () => [] },
		options: { default: () => [] },
		multiple: {
			type: Boolean,
			default: !1
		},
		showAllLevels: {
			type: Boolean,
			default: !0
		},
		changeOnSelect: {
			type: Boolean,
			default: !1
		},
		placeholder: { default: "Select…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		clearable: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"open",
		"close"
	],
	setup(a, { emit: u }) {
		let d = a, p = u, m = Zt(), h = Fi("mc-cascader"), g = An(), _ = N(null), v = N(null), y = N(d.open), { isTop: b } = On({ active: y }), { style: w, transformOrigin: D, update: k, startAutoUpdate: j, stopAutoUpdate: M } = _n(_, v, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: y })
		}), F = N([]), I = N(0), L = N(0);
		G(() => d.open, (e) => {
			y.value = e, e ? S(() => {
				k(), j();
			}) : M();
		});
		function z(e, t) {
			let n = [], r = e;
			for (let e of t) {
				let t = r.find((t) => t.value === e);
				if (!t) break;
				n.push(t), r = t.children ?? [];
			}
			return n;
		}
		let V = i(() => d.multiple ? [] : z(d.options, d.modelValue ?? [])), H = i(() => d.multiple ? (d.modelValue ?? []).map((e) => z(d.options, e ?? [])) : []), U = i(() => (d.multiple ? H.value.length : V.value.length) > 0), W = i(() => {
			if (d.multiple) return "";
			let e = V.value;
			return e.length ? d.showAllLevels ? e.map((e) => e.label).join("  /  ") : e[e.length - 1].label : "";
		}), te = i(() => {
			let e = [d.options];
			for (let t of F.value) {
				if (!t.children?.length) break;
				e.push(t.children);
			}
			return e;
		}), K = i(() => F.value.map((e) => e.label));
		function J(e, t) {
			return `${h}-option-${e}-${t}`;
		}
		let ne = i(() => {
			if (y.value && te.value[I.value]?.[L.value]) return J(I.value, L.value);
		});
		function re(e) {
			if (!(d.disabled && e) && y.value !== e) {
				if (y.value = e, p("update:open", e), e) {
					p("open");
					let e = d.multiple ? [] : V.value;
					F.value = e.slice(0, Math.max(e.length - 1, 0)), I.value = Math.max(F.value.length, 0), L.value = 0, S(() => {
						k(), j();
					});
				} else p("close"), M();
			}
		}
		function ie() {
			re(!y.value);
		}
		function Y(e) {
			if (!y.value) return;
			let t = e.target;
			t && (_.value?.contains(t) || v.value?.contains(t) || re(!1));
		}
		O(() => document.addEventListener("mousedown", Y)), E(() => {
			document.removeEventListener("mousedown", Y), M();
		});
		function ae(e) {
			p("update:modelValue", e), p("change", e);
		}
		function oe(e, t) {
			if (e.disabled) return;
			let n = F.value.slice(0, t).concat(e);
			if (e.children?.length && !d.changeOnSelect) {
				F.value = n, I.value = t + 1, L.value = 0;
				return;
			}
			let r = n.map((e) => e.value);
			if (d.multiple) {
				let e = d.modelValue ?? [];
				e.some((e) => e.length === r.length && e.every((e, t) => e === r[t])) || ae(e.concat([r]));
			} else ae(r), re(!1);
		}
		function se(e, t) {
			!e.disabled && e.children?.length && (F.value = F.value.slice(0, t).concat(e), I.value = t + 1, L.value = 0);
		}
		function ce(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function le(e) {
			ae((d.modelValue ?? []).filter((t, n) => n !== e));
		}
		function ue() {
			ae([]);
		}
		function de(e) {
			y.value ? fe(e) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), re(!0));
		}
		function fe(e) {
			if (!b()) return;
			let t = te.value[I.value] ?? [];
			switch (e.key) {
				case "Escape":
					e.stopPropagation();
					{
						let e = v.value?.contains(document.activeElement) ?? !1;
						re(!1), e && _.value?.focus({ preventScroll: !0 });
					}
					break;
				case "ArrowDown":
					e.preventDefault(), L.value = Math.min(L.value + 1, t.length - 1);
					break;
				case "ArrowUp":
					e.preventDefault(), L.value = Math.max(L.value - 1, 0);
					break;
				case "ArrowRight": {
					e.preventDefault();
					let n = t[L.value];
					n?.children?.length && se(n, I.value);
					break;
				}
				case "ArrowLeft":
					e.preventDefault(), I.value > 0 && (--I.value, F.value = F.value.slice(0, I.value), L.value = 0);
					break;
				case "Enter":
				case " ": {
					e.preventDefault();
					let n = t[L.value];
					n && oe(n, I.value);
					break;
				}
			}
		}
		function pe(e) {
			if (d.multiple) return (d.modelValue ?? []).some((t) => t.length && t[t.length - 1] === e.value);
			let t = V.value;
			return t.length > 0 && t[t.length - 1].value === e.value;
		}
		function me(e, t) {
			return F.value[t]?.value === e.value;
		}
		let he = i(() => typeof d.teleport == "string" ? d.teleport : "body"), ge = i(() => Z("mc-cascader", `mc-cascader--${d.variant}`, `mc-cascader--${d.size}`, {
			"is-open": y.value,
			"is-disabled": d.disabled,
			"is-empty": !U.value,
			"is-multiple": d.multiple
		}, d.customClass));
		return (i, u) => (A(), c("div", { class: C(ge.value) }, [l("button", {
			ref_key: "trigger",
			ref: _,
			type: "button",
			class: "mc-cascader__trigger mc-sheen-sweep",
			disabled: a.disabled,
			"aria-disabled": a.disabled || void 0,
			"aria-expanded": y.value,
			"aria-haspopup": "listbox",
			"aria-controls": B(h),
			"aria-activedescendant": ne.value,
			onClick: ie,
			onKeydown: de
		}, [
			u[0] || (u[0] = l("span", {
				class: "mc-cascader__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			d.multiple && H.value.length ? (A(), c("span", Vi, [(A(!0), c(e, null, P(H.value, (e, t) => (A(), c("span", {
				key: `${e.map((e) => e.value).join("-")}-${t}`,
				class: "mc-cascader__tag"
			}, [l("span", Hi, R(e.map((e) => e.label).join(" / ")), 1), l("span", {
				class: "mc-cascader__tag-close",
				role: "button",
				tabindex: "-1",
				"aria-label": `remove ${e.map((e) => e.label).join(" / ")}`,
				onClick: q((e) => le(t), ["stop"])
			}, [f($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, Ui)]))), 128))])) : (A(), c("span", {
				key: 1,
				class: C(["mc-cascader__value", { "is-placeholder": !U.value }])
			}, R(U.value ? W.value : B(m).select.placeholder || a.placeholder), 3)),
			l("span", Wi, [a.clearable && U.value ? (A(), c("span", {
				key: 0,
				class: "mc-cascader__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": B(m).cascader?.clear ?? "clear",
				onClick: q(ue, ["stop"])
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, Gi)) : s("", !0), f($, {
				name: "chevron-down",
				size: 14,
				class: C(["mc-cascader__caret", { "is-spin": y.value }])
			}, null, 8, ["class"])])
		], 40, Bi), (A(), o(t, {
			to: he.value,
			disabled: !a.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [y.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: v,
				class: "mc-cascader__panel",
				style: B(w)
			}, B(g), {
				id: B(h),
				role: "listbox",
				"aria-multiselectable": d.multiple || void 0,
				onKeydown: fe
			}), [l("div", {
				class: "mc-cascader__inner mc-grain-overlay",
				style: T({ transformOrigin: B(D) })
			}, [K.value.length ? (A(), c("div", qi, [(A(!0), c(e, null, P(K.value, (t, n) => (A(), c(e, { key: `${t}-${n}` }, [n ? (A(), o($, {
				key: 0,
				name: "chevron-right",
				size: 11,
				class: "mc-cascader__crumb-sep"
			})) : s("", !0), l("span", Ji, R(t), 1)], 64))), 128))])) : s("", !0), f(r, {
				tag: "div",
				class: "mc-cascader__columns",
				name: "mc-cascader-col"
			}, {
				default: ee(() => [(A(!0), c(e, null, P(te.value, (t, n) => (A(), c("div", {
					key: n,
					class: "mc-cascader__column",
					role: "presentation"
				}, [(A(!0), c(e, null, P(t, (e, t) => (A(), c("button", {
					key: String(e.value),
					id: J(n, t),
					type: "button",
					class: C(["mc-cascader__option", {
						"is-selected": pe(e),
						"is-on-path": me(e, n),
						"is-disabled": e.disabled,
						"is-highlight": n === I.value && t === L.value
					}]),
					role: "option",
					"aria-selected": pe(e),
					"aria-disabled": e.disabled || void 0,
					disabled: e.disabled,
					onClick: (t) => oe(e, n),
					onMouseenter: (t) => se(e, n),
					onMousemove: ce
				}, [l("span", Xi, R(e.label), 1), e.children?.length ? (A(), o($, {
					key: 0,
					name: "chevron-right",
					size: 13,
					class: "mc-cascader__option-arrow"
				})) : s("", !0)], 42, Yi))), 128)), t.length ? s("", !0) : (A(), c("p", Zi, "—"))]))), 128))]),
				_: 1
			})], 4)], 16, Ki)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-c405931b"]]), $i = ["aria-busy"], ea = { class: "mc-chart__body mc-grain-overlay" }, ta = ["viewBox", "height"], na = { class: "mc-chart__grid" }, ra = [
	"x1",
	"x2",
	"y1",
	"y2"
], ia = { class: "mc-chart__skeleton-bars" }, aa = [
	"x",
	"y",
	"width",
	"height"
], oa = {
	key: 1,
	class: "mc-chart__empty",
	role: "status"
}, sa = {
	class: "mc-chart__empty-art",
	"aria-hidden": "true"
}, ca = { class: "mc-chart__empty-ring" }, la = { class: "mc-chart__empty-text" }, ua = [
	"viewBox",
	"height",
	"aria-label"
], da = ["id"], fa = ["stop-color"], pa = ["stop-color"], ma = {
	key: 0,
	class: "mc-chart__grid"
}, ha = [
	"x1",
	"x2",
	"y1",
	"y2"
], ga = {
	key: 1,
	class: "mc-chart__mark-lines"
}, _a = [
	"x1",
	"x2",
	"y1",
	"y2"
], va = ["transform"], ya = ["width"], ba = {
	class: "mc-chart__mark-chip-text",
	x: "6",
	y: "13"
}, xa = {
	key: 2,
	class: "mc-chart__series"
}, Sa = ["d", "fill"], Ca = ["d"], wa = {
	key: 3,
	class: "mc-chart__series"
}, Ta = [
	"x",
	"y",
	"width",
	"height",
	"fill",
	"aria-label",
	"onClick",
	"onKeydown"
], Ea = {
	key: 4,
	class: "mc-chart__series"
}, Da = [
	"cx",
	"cy",
	"fill",
	"aria-label",
	"onClick",
	"onKeydown"
], Oa = {
	key: 5,
	class: "mc-chart__radar"
}, ka = ["points"], Aa = [
	"x1",
	"y1",
	"x2",
	"y2"
], ja = ["points"], Ma = ["points"], Na = [
	"cx",
	"cy",
	"onPointerenter"
], Pa = [
	"x",
	"y",
	"text-anchor"
], Fa = {
	key: 6,
	class: "mc-chart__pie"
}, Ia = [
	"cx",
	"cy",
	"r",
	"stroke",
	"stroke-width",
	"stroke-dasharray",
	"transform",
	"aria-label",
	"onPointerenter",
	"onClick",
	"onKeydown"
], La = {
	key: 0,
	class: "mc-chart__donut-center"
}, Ra = ["x", "y"], za = ["x", "y"], Ba = {
	key: 7,
	class: "mc-chart__y-axis"
}, Va = [
	"x1",
	"x2",
	"y1",
	"y2"
], Ha = ["x", "y"], Ua = {
	key: 8,
	class: "mc-chart__x-axis"
}, Wa = [
	"x1",
	"x2",
	"y1",
	"y2"
], Ga = [
	"x",
	"y",
	"text-anchor"
], Ka = {
	key: 9,
	class: "mc-chart__crosshair"
}, qa = [
	"x1",
	"x2",
	"y1",
	"y2"
], Ja = [
	"cx",
	"cy",
	"fill"
], Ya = { class: "mc-chart__tooltip-title" }, Xa = { class: "mc-chart__tooltip-list" }, Za = { class: "mc-chart__tooltip-name" }, Qa = { class: "mc-chart__tooltip-value" }, $a = {
	key: 0,
	class: "mc-chart__zoom"
}, eo = ["aria-valuenow", "disabled"], to = ["aria-valuenow", "disabled"], no = {
	key: 0,
	class: "mc-chart__legend"
}, ro = [
	"aria-pressed",
	"disabled",
	"onClick"
], io = { class: "mc-chart__legend-label" }, ao = 640, oo = 11, so = 14, co = 18, lo = 8, uo = 24, fo = .02, po = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiChart",
	__name: "Chart",
	props: {
		type: { default: "line" },
		data: { default: () => [] },
		height: { default: 280 },
		loading: {
			type: Boolean,
			default: !1
		},
		emptyText: { default: "暂无数据" },
		legend: {
			type: Boolean,
			default: !0
		},
		tooltip: {
			type: Boolean,
			default: !0
		},
		animation: {
			type: Boolean,
			default: !0
		},
		yAxis: {
			type: Boolean,
			default: !0
		},
		xAxis: {
			type: Boolean,
			default: !0
		},
		grid: {
			type: Boolean,
			default: !0
		},
		markLine: {},
		innerRadius: { default: .6 },
		dataZoom: {
			type: Boolean,
			default: !1
		},
		valueFormatter: {},
		title: { default: "" },
		customClass: {}
	},
	emits: ["legendClick", "itemClick"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = [
			"var(--mc-chart-1)",
			"var(--mc-chart-2)",
			"var(--mc-chart-3)",
			"var(--mc-chart-4)",
			"var(--mc-chart-5)",
			"var(--mc-chart-6)"
		], u = Fi("mc-chart"), d = /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60]/;
		function p(e) {
			return d.test(e) ? oo : oo * .56;
		}
		function m(e) {
			let t = 0;
			for (let n of e) t += p(n);
			return t;
		}
		function h(e, t) {
			if (t <= 0) return "";
			if (m(e) <= t) return e;
			let n = t - p("…"), r = 0, i = "";
			for (let t of e) {
				let e = p(t);
				if (r + e > n) break;
				i += t, r += e;
			}
			return i ? `${i}…` : "…";
		}
		function _(e) {
			return Number.isFinite(e) ? Math.abs(e) >= 1e3 ? $e(e) : String(Number.isInteger(e) ? e : Number(e.toFixed(2))) : "—";
		}
		function v(e, t) {
			if (r.valueFormatter) try {
				return r.valueFormatter(e, t);
			} catch {}
			return Number.isFinite(e) ? Math.abs(e) < 1e3 ? String(Number.isInteger(e) ? e : Number(e.toFixed(2))) : $e(e) : "—";
		}
		let y = i(() => {
			let e = r.data;
			return Array.isArray(e) ? e ?? [] : e && Array.isArray(e.series) ? e.series : [];
		}), b = i(() => {
			let e = r.data;
			return Array.isArray(e) ? [] : e?.labels ?? [];
		}), x = i(() => y.value.map((e, t) => ({
			name: e?.name || `系列 ${t + 1}`,
			data: Array.isArray(e?.data) ? e.data.map((e) => typeof e == "number" && Number.isFinite(e) ? e : 0) : [],
			color: e?.color || o[t % o.length],
			area: !!e?.area,
			index: t
		}))), D = i(() => x.value.reduce((e, t) => Math.max(e, t.data.length), 0)), k = i(() => {
			let e = b.value;
			return Array.from({ length: D.value }, (t, n) => {
				let r = e[n];
				return String(r == null || r === "" ? n + 1 : r);
			});
		}), j = i(() => r.type === "pie" || r.type === "doughnut"), M = i(() => r.type === "doughnut"), I = i(() => r.type === "radar"), L = i(() => r.type === "scatter"), z = i(() => !j.value && !I.value), B = i(() => z.value && !L.value), V = i(() => r.type === "bar"), H = N([]), U = N([]), ee = N(null), K = N(null), J = i(() => j.value ? x.value.slice(0, 1) : x.value.filter((e) => !H.value.includes(e.name))), ne = i(() => !x.value.some((e) => e.data.length > 0)), re = N(null), ie = N(null), Y = N(ao), ae = null;
		function oe() {
			let e = re.value;
			if (!e) return;
			let t = e.clientWidth;
			t > 0 && (Y.value = t);
		}
		function se() {
			oe();
		}
		O(() => {
			oe(), typeof ResizeObserver < "u" && re.value ? (ae = new ResizeObserver(() => oe()), ae.observe(re.value)) : typeof window < "u" && window.addEventListener("resize", se);
		}), E(() => {
			ae?.disconnect(), ae = null, typeof window < "u" && window.removeEventListener("resize", se);
		});
		function ce(e, t) {
			if (!(e > 0)) return 1;
			let n = Math.floor(Math.log10(e)), r = e / 10 ** n, i;
			return i = t ? r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10 : r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10, i * 10 ** n;
		}
		let le = N({
			start: 0,
			end: 1
		}), ue = i(() => r.dataZoom && z.value && D.value > 1), de = i(() => {
			let e = D.value;
			if (!ue.value || e <= 1) return {
				start: 0,
				end: Math.max(0, e - 1)
			};
			let t = Math.round(le.value.start * (e - 1)), n = Math.round(le.value.end * (e - 1));
			return {
				start: Math.min(t, e - 1),
				end: Math.max(n, t)
			};
		}), fe = i(() => {
			let { start: e, end: t } = de.value, n = [];
			for (let r = e; r <= t; r++) n.push({
				index: r,
				label: k.value[r] ?? String(r + 1)
			});
			return n;
		}), pe = i(() => r.xAxis && z.value ? uo : 0), me = i(() => Math.max(40, r.height - so - pe.value - lo)), he = i(() => {
			let e = [];
			for (let t of J.value) for (let n of fe.value) {
				let r = t.data[n.index];
				typeof r == "number" && Number.isFinite(r) && e.push(r);
			}
			return e;
		}), ge = i(() => {
			let e = he.value, t = e.length ? Math.min(...e) : 0, n = e.length ? Math.max(...e) : 1;
			V.value && (t = Math.min(0, t)), t === n && (n = t + Math.abs(t || 1) * .5);
			let r = et(Math.floor(me.value / 46), 2, 6), i = ce(ce(n - t, !1) / Math.max(1, r - 1), !0), a = Math.floor(t / i) * i, o = Math.ceil(n / i) * i, s = Math.max(1, Math.round((o - a) / i)), c = [];
			for (let e = 0; e <= s; e++) c.push(Number((a + e * i).toPrecision(12)));
			return {
				min: a,
				max: o,
				step: i,
				ticks: c
			};
		}), _e = i(() => {
			if (!r.yAxis || !z.value) return 0;
			let e = ge.value.ticks.reduce((e, t) => Math.max(e, m(_(t))), 0);
			return Math.min(Math.max(24, e + 12), Math.max(24, Y.value * .4));
		}), X = i(() => {
			let e = Math.max(60, Y.value), t = Math.max(60, r.height), n = _e.value;
			return {
				x: n,
				y: so,
				w: Math.max(20, e - n - co),
				h: Math.max(20, t - so - pe.value - lo)
			};
		});
		function ve(e) {
			let { min: t, max: n } = ge.value, r = n - t || 1;
			return X.value.y + X.value.h - (e - t) / r * X.value.h;
		}
		let ye = i(() => {
			let { min: e, max: t } = ge.value;
			return e <= 0 && t >= 0 ? ve(0) : e > 0 ? X.value.y + X.value.h : X.value.y;
		}), be = i(() => X.value.w / Math.max(1, fe.value.length));
		function xe(e) {
			let t = fe.value, n = Math.max(0, t.findIndex((t) => t.index === e));
			return V.value ? X.value.x + be.value * (n + .5) : t.length <= 1 ? X.value.x + X.value.w / 2 : X.value.x + n / (t.length - 1) * X.value.w;
		}
		let Se = i(() => J.value.map((e) => {
			let t = fe.value.map((t) => {
				let n = e.data[t.index] ?? 0;
				return {
					x: xe(t.index),
					y: ve(n),
					value: n,
					index: t.index
				};
			}), n = t.length ? t.map((e, t) => `${t ? "L" : "M"}${e.x.toFixed(2)} ${e.y.toFixed(2)}`).join(" ") : "", r = 0;
			for (let e = 1; e < t.length; e++) r += Math.hypot(t[e].x - t[e - 1].x, t[e].y - t[e - 1].y);
			return {
				series: e,
				points: t,
				d: n,
				length: Math.max(1, r)
			};
		})), Ce = i(() => {
			let e = r.type === "area" && !L.value;
			return Se.value.filter((t) => (e || t.series.area) && t.points.length > 1 && !L.value).map((e) => {
				let t = e.points[0], n = e.points[e.points.length - 1], r = ye.value, i = `${e.d} L${n.x.toFixed(2)} ${r.toFixed(2)} L${t.x.toFixed(2)} ${r.toFixed(2)} Z`;
				return {
					series: e.series,
					d: i,
					gradientId: `${u}-grad-${e.series.index}`
				};
			});
		}), we = i(() => {
			let e = J.value, t = fe.value, n = be.value, r = Math.min(n * .68, 48), i = r / Math.max(1, e.length), a = ye.value, o = [];
			return e.forEach((e, s) => {
				t.forEach((t, c) => {
					let l = e.data[t.index] ?? 0, u = ve(l), d = Math.min(u, a), f = Math.max(1, Math.abs(u - a)), p = X.value.x + n * c + (n - r) / 2 + s * i;
					o.push({
						key: `${e.index}-${t.index}`,
						x: p + i * .07,
						y: d,
						w: i * .86,
						h: f,
						value: l,
						series: e,
						index: t.index,
						negative: l < 0
					});
				});
			}), o;
		}), Te = i(() => J.value.flatMap((e) => fe.value.map((t) => {
			let n = e.data[t.index] ?? 0;
			return {
				key: `${e.index}-${t.index}`,
				x: xe(t.index),
				y: ve(n),
				value: n,
				series: e,
				index: t.index
			};
		}))), Ee = i(() => {
			let e = fe.value, t = X.value.x + X.value.w / 2, n = X.value.y + X.value.h / 2, r = Math.max(12, Math.min(X.value.w, X.value.h) / 2 - 26), { min: i, max: a } = ge.value, o = a - i || 1, s = (i, a) => {
				let o = -Math.PI / 2 + i / Math.max(1, e.length) * Math.PI * 2;
				return {
					x: t + Math.cos(o) * r * a,
					y: n + Math.sin(o) * r * a,
					angle: o
				};
			};
			return {
				cx: t,
				cy: n,
				radius: r,
				rings: Array.from({ length: 4 }, (t, n) => {
					let r = (n + 1) / 4;
					return e.map((e, t) => s(t, r)).map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" ");
				}),
				spokes: e.map((e, r) => {
					let i = s(r, 1);
					return {
						x1: t,
						y1: n,
						x2: i.x,
						y2: i.y
					};
				}),
				series: J.value.map((t) => {
					let n = e.map((e, n) => {
						let r = t.data[e.index] ?? 0, a = et((r - i) / o, 0, 1);
						return {
							...s(n, a),
							value: r,
							index: e.index
						};
					});
					return {
						series: t,
						points: n,
						polygon: n.map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" ")
					};
				}),
				labels: e.map((e, t) => {
					let n = s(t, 1.16), r = Math.cos(n.angle), i = r > .25 ? "start" : r < -.25 ? "end" : "middle";
					return {
						index: e.index,
						text: h(e.label, 64),
						x: n.x + (i === "start" ? 4 : i === "end" ? -4 : 0),
						y: n.y,
						anchor: i
					};
				})
			};
		}), De = i(() => {
			let e = X.value.x + X.value.w / 2, t = X.value.y + X.value.h / 2, n = Math.max(12, Math.min(X.value.w, X.value.h) / 2 - 10);
			return {
				cx: e,
				cy: t,
				r: n,
				inner: M.value ? n * et(r.innerRadius, 0, .9) : 0
			};
		}), Oe = i(() => {
			let e = x.value[0];
			if (!e) return [];
			let t = e.data.reduce((e, t) => e + Math.max(0, t), 0), n = -Math.PI / 2;
			return e.data.map((e, r) => {
				let i = t > 0 ? Math.max(0, e) / t : 0, a = n;
				return n += i * Math.PI * 2, {
					index: r,
					name: k.value[r] ?? String(r + 1),
					value: e,
					frac: i,
					start: a,
					end: n,
					color: o[r % o.length],
					hidden: U.value.includes(r)
				};
			});
		}), ke = i(() => {
			let { cx: e, cy: t, r: n, inner: r } = De.value, i = r > 0 ? (n + r) / 2 : n / 2, a = r > 0 ? n - r : n, o = 2 * Math.PI * i, s = Oe.value.length > 1 ? 2 : 0;
			return Oe.value.map((n) => {
				let r = Math.max(.5, n.frac * o - s);
				return {
					...n,
					len: r,
					circumference: o,
					strokeRadius: i,
					strokeWidth: a,
					cx: e,
					cy: t,
					rotation: n.start * 180 / Math.PI
				};
			});
		}), Ae = i(() => {
			if (!M.value) return null;
			if (K.value !== null) {
				let e = Oe.value[K.value];
				return e ? {
					title: e.name,
					text: `${(e.frac * 100).toFixed(1)}%`
				} : null;
			}
			return {
				title: "合计",
				text: $e(Oe.value.reduce((e, t) => e + (t.hidden ? 0 : t.value), 0))
			};
		}), je = i(() => {
			let e = r.markLine;
			return e == null ? [] : typeof e == "number" ? [{ value: e }] : Array.isArray(e) ? e : [e];
		}), Me = i(() => j.value ? Oe.value.map((e) => ({
			key: `slice-${e.index}`,
			name: e.name,
			color: e.color,
			visible: !e.hidden,
			index: e.index
		})) : x.value.map((e) => ({
			key: `series-${e.index}`,
			name: e.name,
			color: e.color,
			visible: !H.value.includes(e.name),
			index: e.index
		})));
		function Ne(e) {
			r.loading || (j.value ? U.value = U.value.includes(e.index) ? U.value.filter((t) => t !== e.index) : [...U.value, e.index] : H.value = H.value.includes(e.name) ? H.value.filter((t) => t !== e.name) : [...H.value, e.name], a("legendClick", e.name));
		}
		let Pe = i(() => r.yAxis ? ge.value.ticks.map((e) => ({
			value: e,
			text: _(e),
			y: ve(e)
		})) : []), Fe = i(() => {
			if (!r.xAxis) return [];
			let e = fe.value;
			if (!e.length) return [];
			let t = Math.max(1, Math.floor(X.value.w / 56)), n = Math.max(1, Math.ceil(e.length / t)), i = V.value ? Math.min(be.value - 6, 80) : 80, a = [];
			return e.forEach((e, t) => {
				if (t % n !== 0) return;
				let r = xe(e.index), o = h(e.label, i), s = m(o), c = "middle", l = r;
				r - s / 2 < 2 ? (c = "start", l = 2) : r + s / 2 > Y.value - 2 && (c = "end", l = Y.value - 2), a.push({
					index: e.index,
					text: o,
					x: l,
					y: X.value.y + X.value.h + 14,
					anchor: c
				});
			}), a;
		}), Ie = N(null), Le = N({
			x: 0,
			y: 0
		}), Re = N({
			x: 0,
			y: 0
		}), ze = i(() => {
			if (j.value) {
				if (K.value === null) return [];
				let e = Oe.value[K.value];
				return e ? [{
					series: e.name,
					value: e.value,
					color: e.color,
					label: e.name
				}] : [];
			}
			if (ee.value === null) return [];
			let e = ee.value, t = k.value[e] ?? "";
			return J.value.map((n) => ({
				series: n.name,
				value: n.data[e] ?? 0,
				color: n.color,
				label: t
			}));
		}), Be = i(() => {
			if (j.value) {
				let e = K.value === null ? null : Oe.value[K.value];
				return e ? e.name : "";
			}
			return ee.value === null ? "" : k.value[ee.value] ?? "";
		}), Ve = i(() => ({
			active: ze.value.length > 0,
			x: Re.value.x,
			y: Re.value.y,
			items: ze.value
		})), He = i(() => ({ transform: `translate3d(${Re.value.x}px, ${Re.value.y}px, 0)` }));
		function Ue() {
			let e = re.value, t = Ie.value;
			if (!e || !t) return;
			let n = e.clientWidth, r = e.clientHeight, i = t.offsetWidth, a = t.offsetHeight, o = Le.value.x + 16;
			o + i > n - 8 && (o = Le.value.x - i - 16), o = et(o, 8, Math.max(8, n - i - 8));
			let s = Le.value.y - a / 2;
			s = et(s, 8, Math.max(8, r - a - 8)), Re.value = {
				x: o,
				y: s
			};
		}
		G([
			ze,
			ee,
			K
		], () => {
			S(Ue);
		}, { flush: "post" }), G([Y, () => r.height], () => S(Ue), { flush: "post" });
		function We(e) {
			let t = ie.value;
			if (!t) return {
				x: 0,
				y: 0
			};
			let n = t.getBoundingClientRect(), r = n.width / (Y.value || 1) || 1;
			return {
				x: (e.clientX - n.left) / r,
				y: (e.clientY - n.top) / r
			};
		}
		function Ge(e) {
			let t = re.value;
			if (!t) return {
				x: 0,
				y: 0
			};
			let n = t.getBoundingClientRect();
			return {
				x: e.clientX - n.left,
				y: e.clientY - n.top
			};
		}
		function Ke(e) {
			if (!z.value || r.loading) return;
			let t = fe.value;
			if (!t.length) return;
			let { x: n } = We(e), i;
			i = V.value ? Math.floor((n - X.value.x) / (be.value || 1)) : Math.round((n - X.value.x) / (X.value.w || 1) * (t.length - 1));
			let a = et(i, 0, t.length - 1);
			ee.value = t[a].index, Le.value = Ge(e), Ue();
		}
		function qe() {
			ee.value = null;
		}
		function Je(e) {
			r.tooltip && Ke(e);
		}
		function Ye(e, t) {
			r.tooltip && (K.value = e, Le.value = Ge(t));
		}
		function Xe() {
			K.value = null;
		}
		function Ze(e, t) {
			r.tooltip && (ee.value = e, Le.value = Ge(t));
		}
		function Qe(e, t, n) {
			a("itemClick", {
				series: e,
				index: t,
				value: n
			});
		}
		function tt(e, t, n, r) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), Qe(t, n, r));
		}
		function nt(e, t, n) {
			return `${e} · ${t}：${v(n, e)}`;
		}
		let rt = N(null), it = N(null);
		function at(e) {
			let t = rt.value;
			if (!t) return 0;
			let n = t.getBoundingClientRect();
			return n.width ? et((e.clientX - n.left) / n.width, 0, 1) : 0;
		}
		function ot(e, t) {
			e === "start" ? le.value = {
				...le.value,
				start: et(t, 0, le.value.end - fo)
			} : le.value = {
				...le.value,
				end: et(t, le.value.start + fo, 1)
			};
		}
		function st(e) {
			it.value && ot(it.value, at(e));
		}
		function ct() {
			it.value = null, typeof window < "u" && (window.removeEventListener("pointermove", st), window.removeEventListener("pointerup", ct), window.removeEventListener("pointercancel", ct));
		}
		function lt(e, t) {
			r.loading || (e.preventDefault(), it.value = t, typeof window < "u" && (window.addEventListener("pointermove", st), window.addEventListener("pointerup", ct), window.addEventListener("pointercancel", ct)));
		}
		function ut(e) {
			if (r.loading) return;
			let t = at(e);
			ot(Math.abs(t - le.value.start) <= Math.abs(t - le.value.end) ? "start" : "end", t);
		}
		function dt(e, t) {
			let n = t === "start" ? le.value.start : le.value.end, r = e.shiftKey ? .1 : .02, i = null;
			e.key === "ArrowLeft" || e.key === "ArrowDown" ? i = n - r : e.key === "ArrowRight" || e.key === "ArrowUp" ? i = n + r : e.key === "Home" ? i = 0 : e.key === "End" && (i = 1), i !== null && (e.preventDefault(), ot(t, i));
		}
		let ft = i(() => {
			if (j.value) return null;
			if (I.value) {
				if (ee.value === null) return null;
				let e = fe.value.findIndex((e) => e.index === ee.value);
				if (e < 0) return null;
				let t = Ee.value.labels[e];
				return t ? {
					x: Ee.value.cx,
					y: Ee.value.cy,
					x2: t.x,
					y2: t.y,
					dots: []
				} : null;
			}
			if (ee.value === null) return null;
			let e = xe(ee.value), t = J.value.map((t) => {
				let n = t.data[ee.value] ?? 0;
				return {
					series: t,
					x: e,
					y: ve(n)
				};
			});
			return {
				x: e,
				y: X.value.y,
				x2: e,
				y2: X.value.y + X.value.h,
				dots: t
			};
		}), pt = i(() => {
			let e = Math.max(60, Y.value), t = Math.max(60, r.height) - pe.value - lo, n = so, i = Math.max(20, t - n), a = [
				.42,
				.68,
				.5,
				.86,
				.34,
				.62,
				.46
			], o = e / a.length, s = Math.max(6, o * .42);
			return {
				baseline: t,
				bars: a.map((e, n) => ({
					x: o * (n + .5) - s / 2,
					y: t - i * e,
					w: s,
					h: i * e
				})),
				grids: [
					0,
					.25,
					.5,
					.75,
					1
				].map((e) => n + i * e)
			};
		}), mt = i(() => {
			if (r.title) return r.title;
			let e = x.value.map((e) => e.name).filter(Boolean);
			return e.length ? `图表：${e.join("、")}` : "图表";
		}), ht = i(() => Z("mc-chart", `mc-chart--${r.type}`, {
			"is-loading": r.loading,
			"is-empty": ne.value,
			"is-animated": r.animation,
			"is-disabled": r.loading
		}, r.customClass));
		return (n, r) => (A(), c("div", {
			class: C(ht.value),
			"aria-busy": t.loading ? "true" : void 0
		}, [l("div", ea, [
			r[5] || (r[5] = l("span", {
				class: "mc-chart__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", {
				ref_key: "hostRef",
				ref: re,
				class: "mc-chart__canvas",
				style: T({ height: `${t.height}px` })
			}, [t.loading ? (A(), c("svg", {
				key: 0,
				class: "mc-chart__svg mc-chart__svg--loading",
				viewBox: `0 0 ${Y.value} ${t.height}`,
				width: "100%",
				height: t.height,
				"aria-hidden": "true"
			}, [l("g", na, [(A(!0), c(e, null, P(pt.value.grids, (e, t) => (A(), c("line", {
				key: `s-g${t}`,
				x1: X.value.x,
				x2: X.value.x + X.value.w,
				y1: e,
				y2: e
			}, null, 8, ra))), 128))]), l("g", ia, [(A(!0), c(e, null, P(pt.value.bars, (e, t) => (A(), c("rect", {
				key: `s-b${t}`,
				x: e.x,
				y: e.y,
				width: e.w,
				height: e.h,
				rx: "4"
			}, null, 8, aa))), 128))])], 8, ta)) : ne.value ? (A(), c("div", oa, [F(n.$slots, "empty", {}, () => [l("div", sa, [r[4] || (r[4] = l("span", { class: "mc-chart__empty-halo" }, null, -1)), l("span", ca, [f($, {
				name: "chart-line",
				size: 24,
				"stroke-width": 1.5
			})])]), l("p", la, R(t.emptyText), 1)], !0)])) : (A(), c("svg", {
				key: 2,
				ref_key: "svgRef",
				ref: ie,
				class: "mc-chart__svg",
				viewBox: `0 0 ${Y.value} ${t.height}`,
				width: "100%",
				height: t.height,
				role: "img",
				"aria-label": mt.value,
				onPointermove: Ke,
				onPointerdown: Je,
				onPointerleave: qe
			}, [
				l("title", null, R(mt.value), 1),
				l("defs", null, [(A(!0), c(e, null, P(Ce.value, (e) => (A(), c("linearGradient", {
					id: e.gradientId,
					key: "a.gradientId",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1"
				}, [l("stop", {
					offset: "0%",
					"stop-color": e.series.color,
					"stop-opacity": "0.34"
				}, null, 8, fa), l("stop", {
					offset: "100%",
					"stop-color": e.series.color,
					"stop-opacity": "0"
				}, null, 8, pa)], 8, da))), 128))]),
				t.grid && z.value ? (A(), c("g", ma, [(A(!0), c(e, null, P(ge.value.ticks, (e, t) => (A(), c("line", {
					key: `g-${t}`,
					x1: X.value.x,
					x2: X.value.x + X.value.w,
					y1: ve(e),
					y2: ve(e)
				}, null, 8, ha))), 128))])) : s("", !0),
				z.value ? (A(), c("g", ga, [(A(!0), c(e, null, P(je.value, (e, t) => (A(), c("g", { key: `ml-${t}` }, [l("line", {
					class: "mc-chart__mark-line",
					x1: X.value.x,
					x2: X.value.x + X.value.w,
					y1: ve(e.value),
					y2: ve(e.value),
					style: T(e.color ? { stroke: e.color } : void 0)
				}, null, 12, _a), e.label ? (A(), c("g", {
					key: 0,
					transform: `translate(${X.value.x + X.value.w - m(h(e.label, 72)) - 12}, ${ve(e.value) - 9})`
				}, [l("rect", {
					class: "mc-chart__mark-chip-bg",
					width: m(h(e.label, 72)) + 12,
					height: "18",
					rx: "9"
				}, null, 8, ya), l("text", ba, R(h(e.label, 72)), 1)], 8, va)) : s("", !0)]))), 128))])) : s("", !0),
				B.value ? (A(), c("g", xa, [(A(!0), c(e, null, P(Ce.value, (e) => (A(), c("path", {
					key: `area-${e.series.index}`,
					class: "mc-chart__area",
					d: e.d,
					fill: `url(#${e.gradientId})`
				}, null, 8, Sa))), 128)), (A(!0), c(e, null, P(Se.value, (e) => (A(), c("path", {
					key: `line-${e.series.index}`,
					class: "mc-chart__line",
					d: e.d,
					style: T({
						stroke: e.series.color,
						"--mc-draw-length": String(e.length)
					})
				}, null, 12, Ca))), 128))])) : s("", !0),
				V.value ? (A(), c("g", wa, [(A(!0), c(e, null, P(we.value, (e, t) => (A(), c("rect", {
					key: e.key,
					class: C(["mc-chart__bar", { "is-negative": e.negative }]),
					x: e.x,
					y: e.y,
					width: e.w,
					height: e.h,
					rx: "3",
					fill: e.series.color,
					role: "button",
					tabindex: "0",
					"aria-label": nt(e.series.name, k.value[e.index] ?? "", e.value),
					style: T({ "--i": t }),
					onClick: (t) => Qe(e.series.name, e.index, e.value),
					onKeydown: (t) => tt(t, e.series.name, e.index, e.value)
				}, null, 46, Ta))), 128))])) : s("", !0),
				L.value ? (A(), c("g", Ea, [(A(!0), c(e, null, P(Te.value, (e, t) => (A(), c("circle", {
					key: e.key,
					class: "mc-chart__point",
					cx: e.x,
					cy: e.y,
					r: "4",
					fill: e.series.color,
					role: "button",
					tabindex: "0",
					"aria-label": nt(e.series.name, k.value[e.index] ?? "", e.value),
					style: T({ "--i": t }),
					onClick: (t) => Qe(e.series.name, e.index, e.value),
					onKeydown: (t) => tt(t, e.series.name, e.index, e.value)
				}, null, 44, Da))), 128))])) : s("", !0),
				I.value ? (A(), c("g", Oa, [
					(A(!0), c(e, null, P(Ee.value.rings, (e, t) => (A(), c("polygon", {
						key: `ring-${t}`,
						class: "mc-chart__radar-ring",
						points: e
					}, null, 8, ka))), 128)),
					(A(!0), c(e, null, P(Ee.value.spokes, (e, t) => (A(), c("line", {
						key: `spoke-${t}`,
						class: "mc-chart__radar-spoke",
						x1: e.x1,
						y1: e.y1,
						x2: e.x2,
						y2: e.y2
					}, null, 8, Aa))), 128)),
					(A(!0), c(e, null, P(Ee.value.series, (t) => (A(), c("g", { key: `radar-series-${t.series.index}` }, [
						l("polygon", {
							class: "mc-chart__radar-area",
							points: t.polygon,
							style: T({ fill: t.series.color })
						}, null, 12, ja),
						l("polygon", {
							class: "mc-chart__radar-line",
							points: t.polygon,
							style: T({ stroke: t.series.color })
						}, null, 12, Ma),
						(A(!0), c(e, null, P(t.points, (e, n) => (A(), c("circle", {
							key: `radar-point-${t.series.index}-${n}`,
							class: "mc-chart__radar-dot",
							cx: e.x,
							cy: e.y,
							r: "3.4",
							style: T({ fill: t.series.color }),
							onPointerenter: (t) => Ze(e.index, t),
							onPointerleave: qe
						}, null, 44, Na))), 128))
					]))), 128)),
					(A(!0), c(e, null, P(Ee.value.labels, (e) => (A(), c("text", {
						key: `radar-label-${e.index}`,
						class: "mc-chart__axis-label",
						x: e.x,
						y: e.y,
						"text-anchor": e.anchor,
						"dominant-baseline": "middle"
					}, R(e.text), 9, Pa))), 128))
				])) : s("", !0),
				j.value ? (A(), c("g", Fa, [(A(!0), c(e, null, P(ke.value, (e, t) => te((A(), c("circle", {
					key: `slice-${e.index}`,
					class: "mc-chart__arc",
					cx: e.cx,
					cy: e.cy,
					r: e.strokeRadius,
					stroke: e.color,
					"stroke-width": e.strokeWidth,
					"stroke-dasharray": `${e.len} ${e.circumference}`,
					transform: `rotate(${e.rotation} ${e.cx} ${e.cy})`,
					style: T({
						"--mc-donut-length": String(e.len),
						"--i": t
					}),
					role: "button",
					tabindex: "0",
					"aria-label": `${e.name}：${v(e.value, e.name)}（${(e.frac * 100).toFixed(1)}%）`,
					onPointerenter: (t) => Ye(e.index, t),
					onPointerleave: Xe,
					onClick: (t) => Qe(e.name, e.index, e.value),
					onKeydown: (t) => tt(t, e.name, e.index, e.value)
				}, null, 44, Ia)), [[W, !e.hidden]])), 128)), Ae.value ? (A(), c("g", La, [l("text", {
					class: "mc-chart__donut-title",
					x: De.value.cx,
					y: De.value.cy - 8,
					"text-anchor": "middle"
				}, R(Ae.value.title), 9, Ra), l("text", {
					class: "mc-chart__donut-value",
					x: De.value.cx,
					y: De.value.cy + 12,
					"text-anchor": "middle"
				}, R(Ae.value.text), 9, za)])) : s("", !0)])) : s("", !0),
				t.yAxis && z.value ? (A(), c("g", Ba, [l("line", {
					class: "mc-chart__axis-line",
					x1: X.value.x,
					x2: X.value.x,
					y1: X.value.y,
					y2: X.value.y + X.value.h
				}, null, 8, Va), (A(!0), c(e, null, P(Pe.value, (e) => (A(), c("text", {
					key: `y-${e.value}`,
					class: "mc-chart__axis-label",
					x: X.value.x - 8,
					y: e.y,
					"text-anchor": "end",
					"dominant-baseline": "middle"
				}, R(e.text), 9, Ha))), 128))])) : s("", !0),
				t.xAxis && z.value ? (A(), c("g", Ua, [l("line", {
					class: "mc-chart__axis-line",
					x1: X.value.x,
					x2: X.value.x + X.value.w,
					y1: X.value.y + X.value.h,
					y2: X.value.y + X.value.h
				}, null, 8, Wa), (A(!0), c(e, null, P(Fe.value, (e) => (A(), c("text", {
					key: `x-${e.index}`,
					class: "mc-chart__axis-label",
					x: e.x,
					y: e.y,
					"text-anchor": e.anchor,
					"dominant-baseline": "middle"
				}, R(e.text), 9, Ga))), 128))])) : s("", !0),
				ft.value ? (A(), c("g", Ka, [l("line", {
					class: "mc-chart__crosshair-line",
					x1: ft.value.x,
					x2: ft.value.x2,
					y1: ft.value.y,
					y2: ft.value.y2
				}, null, 8, qa), (A(!0), c(e, null, P(ft.value.dots, (e) => (A(), c("circle", {
					key: `dot-${e.series.index}`,
					class: "mc-chart__crosshair-dot",
					cx: e.x,
					cy: e.y,
					r: "4.5",
					fill: e.series.color
				}, null, 8, Ja))), 128))])) : s("", !0)
			], 40, ua)), t.tooltip && ze.value.length ? (A(), c("div", {
				key: 3,
				ref_key: "tipRef",
				ref: Ie,
				class: "mc-chart__tooltip",
				style: T(He.value),
				role: "tooltip"
			}, [F(n.$slots, "tooltip", w(g(Ve.value)), () => [l("p", Ya, R(Be.value), 1), l("ul", Xa, [(A(!0), c(e, null, P(ze.value, (e) => (A(), c("li", {
				key: e.series,
				class: "mc-chart__tooltip-row"
			}, [
				l("span", {
					class: "mc-chart__tooltip-dot",
					style: T({ background: e.color })
				}, null, 4),
				l("span", Za, R(e.series), 1),
				l("span", Qa, R(v(e.value, e.series)), 1)
			]))), 128))])], !0)], 4)) : s("", !0)], 4),
			ue.value ? (A(), c("div", $a, [l("div", {
				ref_key: "zoomTrackRef",
				ref: rt,
				class: "mc-chart__zoom-track",
				role: "group",
				"aria-label": "数据范围",
				onPointerdown: ut
			}, [
				l("div", {
					class: "mc-chart__zoom-range",
					style: T({
						left: `${le.value.start * 100}%`,
						width: `${(le.value.end - le.value.start) * 100}%`
					})
				}, null, 4),
				l("button", {
					type: "button",
					class: "mc-chart__zoom-handle",
					role: "slider",
					"aria-label": "起始位置",
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-valuenow": Math.round(le.value.start * 100),
					disabled: t.loading,
					style: T({ left: `${le.value.start * 100}%` }),
					onPointerdown: r[0] || (r[0] = q((e) => lt(e, "start"), ["stop"])),
					onKeydown: r[1] || (r[1] = (e) => dt(e, "start"))
				}, null, 44, eo),
				l("button", {
					type: "button",
					class: "mc-chart__zoom-handle",
					role: "slider",
					"aria-label": "结束位置",
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-valuenow": Math.round(le.value.end * 100),
					disabled: t.loading,
					style: T({ left: `${le.value.end * 100}%` }),
					onPointerdown: r[2] || (r[2] = q((e) => lt(e, "end"), ["stop"])),
					onKeydown: r[3] || (r[3] = (e) => dt(e, "end"))
				}, null, 44, to)
			], 544)])) : s("", !0)
		]), t.legend && Me.value.length ? (A(), c("div", no, [F(n.$slots, "legend", { series: Me.value }, () => [(A(!0), c(e, null, P(Me.value, (e) => (A(), c("button", {
			key: e.key,
			type: "button",
			class: C(["mc-chart__legend-item", { "is-off": !e.visible }]),
			"aria-pressed": e.visible,
			disabled: t.loading,
			onClick: (t) => Ne(e)
		}, [l("span", {
			class: "mc-chart__legend-dot",
			style: T({ background: e.color })
		}, null, 4), l("span", io, R(e.name), 1)], 10, ro))), 128))], !0)])) : s("", !0)], 10, $i));
	}
}), [["__scopeId", "data-v-36f176a1"]]), mo = ["onKeydown"], ho = [
	"checked",
	"disabled",
	"aria-checked",
	"aria-disabled"
], go = {
	key: 0,
	class: "mc-checkbox__label"
}, _o = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCheckbox",
	inheritAttrs: !1,
	__name: "Checkbox",
	props: {
		modelValue: {
			type: [Boolean, Array],
			default: !1
		},
		label: { default: "" },
		value: {},
		indeterminate: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = V(), o = i(() => {
			let { class: e, style: t, ...n } = a;
			return n;
		}), f = N(null), p = i(() => Array.isArray(n.modelValue)), m = i(() => n.value ?? n.label ?? ""), h = i(() => p.value ? n.modelValue.includes(m.value) : n.modelValue === !0);
		G(() => n.indeterminate, (e) => {
			f.value && (f.value.indeterminate = e);
		}, {
			immediate: !0,
			flush: "post"
		});
		function g() {
			if (n.disabled) return;
			let e = !h.value;
			if (p.value) {
				let t = [...n.modelValue], i = t.indexOf(m.value);
				e ? i === -1 && t.push(m.value) : i !== -1 && t.splice(i, 1), r("update:modelValue", t), r("change", t), _();
			} else r("update:modelValue", e), r("change", e), _();
		}
		function _() {
			S(() => {
				f.value && (f.value.checked = h.value);
			});
		}
		let v = i(() => Z("mc-checkbox", `mc-checkbox--${n.size}`, {
			"is-checked": h.value,
			"is-indeterminate": n.indeterminate,
			"is-disabled": n.disabled
		})), y = i(() => Z(v.value, a.class, n.customClass)), b = i(() => a.style);
		return (t, n) => (A(), c("label", {
			class: C(y.value),
			style: T(b.value),
			onKeydown: K(q(g, ["prevent"]), ["enter"])
		}, [
			l("input", x({
				ref_key: "field",
				ref: f
			}, o.value, {
				class: "mc-checkbox__input mc-visually-hidden",
				type: "checkbox",
				role: "checkbox",
				checked: h.value,
				disabled: e.disabled,
				"aria-checked": e.indeterminate ? "mixed" : h.value,
				"aria-disabled": e.disabled || void 0,
				onChange: g
			}), null, 16, ho),
			n[0] || (n[0] = u("<span class=\"mc-checkbox__box mc-sheen-sweep\" aria-hidden=\"true\" data-v-f27e07e7><span class=\"mc-checkbox__grain mc-grain-overlay\" data-v-f27e07e7></span><svg viewBox=\"0 0 24 24\" class=\"mc-checkbox__mark\" data-v-f27e07e7><path class=\"mc-checkbox__check\" d=\"M20 6 9 17l-5-5\" data-v-f27e07e7></path><path class=\"mc-checkbox__dash\" d=\"M6 12h12\" data-v-f27e07e7></path></svg></span><span class=\"mc-checkbox__glow\" aria-hidden=\"true\" data-v-f27e07e7></span>", 2)),
			e.label || t.$slots.default ? (A(), c("span", go, [F(t.$slots, "default", {}, () => [d(R(e.label), 1)], !0)])) : s("", !0)
		], 46, mo));
	}
}), [["__scopeId", "data-v-f27e07e7"]]), vo = ["aria-label"], yo = { class: "mc-circle-cutout__face" }, bo = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCircleCutout",
	__name: "CircleCutout",
	props: {
		size: { default: 320 },
		gutter: { default: 24 },
		tone: { default: "surface" },
		ring: {
			type: Boolean,
			default: !0
		},
		offset: { default: 0 },
		frosted: {
			type: Boolean,
			default: !1
		},
		label: { default: "圆形镂空" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => Z("mc-circle-cutout", `mc-circle-cutout--${t.tone}`, {
			"has-ring": t.ring,
			"is-offset": t.offset !== 0,
			"is-frosted": t.frosted
		}, t.customClass)), r = i(() => {
			let e = {
				"--mc-cutout-size": typeof t.size == "number" ? `${t.size}px` : t.size,
				"--mc-cutout-gutter": `${t.gutter}px`
			};
			return t.offset && (e["--mc-cutout-shift"] = `${t.offset / 100 * 50}%`), e;
		});
		return (t, i) => (A(), c("div", {
			class: C(n.value),
			style: T(r.value),
			role: "group",
			"aria-label": e.label
		}, [i[0] || (i[0] = l("span", {
			class: "mc-circle-cutout__aurora",
			"aria-hidden": "true"
		}, null, -1)), l("div", yo, [F(t.$slots, "default", {}, void 0, !0)])], 14, vo));
	}
}), [["__scopeId", "data-v-eefb9352"]]);
//#endregion
//#region src/composables/useClipboard.ts
function xo(e = {}) {
	let { timeout: t = 2e3, onSuccess: n, onError: r } = e, i = N(!1), a = N(null), o = null;
	function s() {
		o !== null && (clearTimeout(o), o = null);
	}
	function c() {
		s(), o = setTimeout(() => {
			i.value = !1, o = null;
		}, t);
	}
	function l(e) {
		if (typeof document > "u" || !document.body) return !1;
		let t = document.activeElement, n = document.getSelection(), r = n && n.rangeCount > 0 ? n.getRangeAt(0) : null, i = document.createElement("textarea");
		i.value = e, i.setAttribute("readonly", ""), i.style.position = "fixed", i.style.top = "0", i.style.left = "-9999px", i.style.opacity = "0", i.style.pointerEvents = "none", document.body.appendChild(i);
		let a = !1;
		try {
			i.select(), i.setSelectionRange(0, i.value.length), a = document.execCommand("copy");
		} catch {
			a = !1;
		} finally {
			i.remove(), r && n && (n.removeAllRanges(), n.addRange(r)), t?.focus?.({ preventScroll: !0 });
		}
		return a;
	}
	async function u(e) {
		let t = typeof navigator < "u" ? navigator.clipboard : void 0;
		if (t && typeof t.writeText == "function") try {
			await t.writeText(e);
			return;
		} catch (t) {
			if (l(e)) return;
			throw t;
		}
		if (!l(e)) throw Error("Clipboard is not available in this context");
	}
	async function d(e) {
		a.value = null;
		try {
			return await u(e), i.value = !0, c(), n?.(e), !0;
		} catch (e) {
			let t = e instanceof Error ? e : Error(String(e));
			return a.value = t, i.value = !1, r?.(t), !1;
		}
	}
	return h() && k(s), {
		copy: d,
		copied: i,
		error: a
	};
}
//#endregion
//#region src/components/clipboard-button/ClipboardButton.vue?vue&type=script&setup=true&lang.ts
var So = ["disabled", "aria-label"], Co = { class: "mc-clipboard-button__label" }, wo = {
	class: "mc-clipboard-button__status",
	role: "status",
	"aria-live": "polite"
}, To = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiClipboardButton",
	__name: "ClipboardButton",
	props: {
		text: {},
		value: {},
		content: {},
		successText: {},
		errorText: {},
		icon: {},
		size: { default: "medium" },
		variant: { default: "soft" },
		disabled: {
			type: Boolean,
			default: !1
		},
		timeout: { default: 2e3 },
		customClass: {}
	},
	emits: [
		"copy",
		"success",
		"error"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = Zt(), { copy: o, copied: s, error: u } = xo({
			timeout: n.timeout,
			onSuccess: (e) => r("success", e),
			onError: (e) => r("error", e)
		}), d = i(() => ({
			copy: a.value.clipboard?.copy ?? "Copy",
			copied: a.value.clipboard?.copied ?? "Copied",
			failed: a.value.clipboard?.failed ?? "Copy failed",
			copyLabel: a.value.clipboard?.copyLabel ?? "Copy to clipboard"
		})), p = i(() => n.text ?? n.value ?? ""), m = i(() => s.value), h = i(() => u.value !== null), g = i(() => h.value ? n.errorText ?? d.value.failed : m.value ? n.successText ?? d.value.copied : n.content ?? d.value.copy), _ = i(() => n.icon ?? (m.value ? "circle-check" : "copy")), v = i(() => n.size === "small" ? 12 : n.size === "large" ? 16 : 14), y = i(() => n.content ?? d.value.copyLabel), b = i(() => h.value ? n.errorText ?? d.value.failed : m.value ? n.successText ?? d.value.copied : ""), x = null;
		G(u, (e) => {
			x !== null && (clearTimeout(x), x = null), e && (x = setTimeout(() => {
				u.value = null, x = null;
			}, n.timeout));
		}), E(() => {
			x !== null && clearTimeout(x);
		});
		async function S() {
			n.disabled || (r("copy", p.value), await o(p.value));
		}
		let w = i(() => Z("mc-clipboard-button", `mc-clipboard-button--${n.variant}`, `mc-clipboard-button--${n.size}`, {
			"is-copied": m.value,
			"is-error": h.value,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (A(), c("button", {
			type: "button",
			class: C(w.value),
			disabled: e.disabled,
			"aria-label": y.value,
			onClick: S
		}, [
			f($, {
				name: _.value,
				size: v.value,
				class: "mc-clipboard-button__icon"
			}, null, 8, ["name", "size"]),
			l("span", Co, R(g.value), 1),
			l("span", wo, R(b.value), 1)
		], 10, So));
	}
}), [["__scopeId", "data-v-40ab6147"]]), Eo = /* @__PURE__ */ "break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.function.if.import.in.instanceof.new.of.return.super.switch.this.throw.try.typeof.var.void.while.with.yield.async.await.static.get.set.from.as".split("."), Do = [
	...Eo,
	"type",
	"interface",
	"enum",
	"implements",
	"declare",
	"namespace",
	"readonly",
	"public",
	"private",
	"protected",
	"abstract",
	"keyof",
	"infer",
	"satisfies",
	"is",
	"module",
	"override",
	"accessor"
], Oo = [
	"string",
	"number",
	"boolean",
	"symbol",
	"bigint",
	"object",
	"unknown",
	"never",
	"any",
	"void",
	"undefined",
	"null",
	"true",
	"false"
], ko = /* @__PURE__ */ "def.class.return.if.elif.else.for.while.break.continue.pass.import.from.as.try.except.finally.raise.with.lambda.global.nonlocal.yield.assert.del.in.is.not.and.or.async.await.match.case".split("."), Ao = [
	"int",
	"float",
	"str",
	"bool",
	"bytes",
	"list",
	"dict",
	"set",
	"tuple",
	"None",
	"True",
	"False",
	"self"
], jo = /* @__PURE__ */ "abstract.assert.break.case.catch.class.const.continue.default.do.double.else.enum.extends.final.finally.float.for.goto.if.implements.import.instanceof.int.interface.long.native.new.package.private.protected.public.record.return.sealed.short.static.strictfp.super.switch.synchronized.this.throw.throws.transient.try.void.volatile.while.var".split("."), Mo = /* @__PURE__ */ "auto.break.case.char.const.continue.default.do.double.else.enum.extern.float.for.goto.if.inline.int.long.register.restrict.return.short.signed.sizeof.static.struct.switch.typedef.union.unsigned.void.volatile.while.bool.class.template.typename.public.private.protected.virtual.new.delete.this.using.namespace.try.catch.throw.operator.friend.constexpr.override.nullptr".split("."), No = [
	"break",
	"case",
	"chan",
	"const",
	"continue",
	"default",
	"defer",
	"else",
	"fallthrough",
	"for",
	"func",
	"go",
	"goto",
	"if",
	"import",
	"interface",
	"map",
	"package",
	"range",
	"return",
	"select",
	"struct",
	"switch",
	"type",
	"var"
], Po = [
	"bool",
	"byte",
	"complex64",
	"complex128",
	"error",
	"float32",
	"float64",
	"int",
	"int8",
	"int16",
	"int32",
	"int64",
	"rune",
	"string",
	"uint",
	"uint8",
	"uint16",
	"uint32",
	"uint64",
	"uintptr",
	"any"
], Fo = /* @__PURE__ */ "as.break.const.continue.crate.dyn.else.enum.extern.fn.for.if.impl.in.let.loop.match.mod.move.mut.pub.ref.return.self.static.struct.super.trait.type.unsafe.use.where.while.async.await".split("."), Io = [
	"bool",
	"char",
	"f32",
	"f64",
	"i8",
	"i16",
	"i32",
	"i64",
	"i128",
	"isize",
	"str",
	"u8",
	"u16",
	"u32",
	"u64",
	"u128",
	"usize",
	"String",
	"Vec",
	"Option",
	"Result"
], Lo = /* @__PURE__ */ "select.from.where.insert.into.values.update.set.delete.create.table.alter.drop.index.view.join.inner.left.right.outer.full.on.group.by.order.having.limit.offset.union.all.distinct.as.and.or.not.in.between.like.exists.case.when.then.else.end.primary.key.foreign.references.default.asc.desc".split("."), Ro = /* @__PURE__ */ "if.then.else.elif.fi.for.while.until.do.done.case.esac.function.return.export.local.readonly.declare.source.alias.unset.echo.cd.ls.cat.grep.sed.awk.sudo.set.shift.exit".split("."), zo = /* @__PURE__ */ "important.inherit.initial.unset.auto.none.solid.dashed.dotted.block.inline.flex.grid.absolute.relative.fixed.sticky.static.hidden.visible.center.left.right.top.bottom.pointer.default.border.box".split(".");
function Bo(e) {
	return {
		mode: e.mode ?? "code",
		lineComments: e.lineComments ?? ["//"],
		blockComments: e.blockComments ?? [["/*", "*/"]],
		stringDelims: e.stringDelims ?? ["\"", "'"],
		keywords: e.keywords ?? [],
		builtins: e.builtins ?? [],
		types: e.types ?? [],
		constants: e.constants ?? [],
		caseInsensitive: e.caseInsensitive ?? !1
	};
}
var Vo = {
	javascript: Bo({
		keywords: [
			...Eo,
			"true",
			"false",
			"null",
			"undefined"
		],
		builtins: [
			"console",
			"window",
			"document",
			"Math",
			"JSON",
			"Object",
			"Array",
			"Promise",
			"Set",
			"Map",
			"Date",
			"RegExp"
		]
	}),
	typescript: Bo({
		keywords: [
			...Do,
			"true",
			"false",
			"null",
			"undefined"
		],
		types: Oo,
		builtins: [
			"console",
			"window",
			"document",
			"Math",
			"JSON",
			"Object",
			"Array",
			"Promise",
			"Set",
			"Map",
			"Date",
			"RegExp"
		]
	}),
	python: Bo({
		lineComments: ["#"],
		keywords: ko,
		types: Ao
	}),
	java: Bo({
		keywords: [
			...jo,
			"true",
			"false",
			"null"
		],
		types: [
			"int",
			"long",
			"double",
			"float",
			"boolean",
			"char",
			"byte",
			"short",
			"String"
		]
	}),
	c: Bo({
		keywords: [
			...Mo,
			"true",
			"false",
			"NULL"
		],
		types: [
			"int",
			"char",
			"float",
			"double",
			"void"
		]
	}),
	cpp: Bo({
		keywords: [
			...Mo,
			"true",
			"false",
			"nullptr"
		],
		types: [
			"int",
			"char",
			"float",
			"double",
			"void",
			"string",
			"auto"
		]
	}),
	csharp: Bo({
		keywords: /* @__PURE__ */ "abstract.as.base.break.case.catch.class.const.continue.default.delegate.do.else.enum.event.explicit.extern.finally.fixed.for.foreach.goto.if.implicit.in.interface.internal.is.lock.namespace.new.operator.out.override.params.private.protected.public.readonly.ref.return.sealed.static.struct.switch.this.throw.try.typeof.using.var.virtual.void.while.yield.true.false.null".split("."),
		types: [
			"bool",
			"byte",
			"char",
			"decimal",
			"double",
			"float",
			"int",
			"long",
			"object",
			"sbyte",
			"short",
			"string",
			"uint",
			"ulong"
		]
	}),
	go: Bo({
		keywords: [
			...No,
			"true",
			"false",
			"nil"
		],
		types: Po
	}),
	rust: Bo({
		keywords: [
			...Fo,
			"true",
			"false"
		],
		types: Io
	}),
	php: Bo({
		lineComments: ["//", "#"],
		keywords: /* @__PURE__ */ "abstract.and.array.as.break.callable.case.catch.class.clone.const.continue.declare.default.do.echo.else.elseif.empty.enddeclare.endfor.endforeach.endif.endswitch.endwhile.extends.final.finally.fn.for.foreach.function.global.goto.if.implements.include.instanceof.insteadof.interface.isset.list.match.namespace.new.or.print.private.protected.public.readonly.require.return.static.switch.throw.trait.try.unset.use.var.while.xor.yield.true.false.null".split("."),
		types: [
			"int",
			"float",
			"string",
			"bool",
			"array",
			"object",
			"mixed"
		]
	}),
	swift: Bo({
		keywords: /* @__PURE__ */ "associatedtype.class.deinit.enum.extension.fileprivate.func.import.init.inout.internal.let.open.operator.private.protocol.public.rethrows.static.struct.subscript.typealias.var.break.case.continue.default.defer.do.else.fallthrough.for.guard.if.in.repeat.return.switch.where.while.as.catch.is.super.self.throw.try.true.false.nil.some.any".split("."),
		types: [
			"Int",
			"Double",
			"String",
			"Bool",
			"Array",
			"Dictionary",
			"Character",
			"Set",
			"Optional"
		]
	}),
	kotlin: Bo({
		keywords: /* @__PURE__ */ "as.break.class.continue.do.else.false.for.fun.if.in.interface.is.null.object.package.return.super.this.throw.true.try.typealias.val.var.when.while.by.catch.constructor.delegate.dynamic.field.file.finally.get.import.init.param.property.receiver.set.setparam.where".split("."),
		types: [
			"Int",
			"Long",
			"Double",
			"Float",
			"Boolean",
			"Char",
			"String",
			"Unit",
			"Any"
		]
	}),
	ruby: Bo({
		lineComments: ["#"],
		keywords: /* @__PURE__ */ "alias.and.begin.break.case.class.def.defined.do.else.elsif.end.ensure.false.for.if.in.module.next.nil.not.or.redo.rescue.retry.return.self.super.then.true.undef.unless.until.when.while.yield.require.attr_accessor".split(".")
	}),
	swift_ignore: Bo({ mode: "text" }),
	sql: Bo({
		lineComments: ["--"],
		keywords: [
			...Lo,
			"true",
			"false",
			"null"
		],
		caseInsensitive: !0
	}),
	shell: Bo({
		lineComments: ["#"],
		keywords: Ro,
		builtins: [
			"printf",
			"read",
			"test",
			"curl",
			"git",
			"npm",
			"node",
			"yarn",
			"pnpm",
			"docker",
			"make",
			"python",
			"pip"
		]
	}),
	json: Bo({ keywords: [
		"true",
		"false",
		"null"
	] }),
	yaml: Bo({
		lineComments: ["#"],
		keywords: [
			"true",
			"false",
			"null",
			"yes",
			"no"
		]
	}),
	markdown: Bo({ mode: "text" }),
	text: Bo({ mode: "text" })
}, Ho = /* @__PURE__ */ new Set([
	"html",
	"xml",
	"svg",
	"vue",
	"svelte"
]), Uo = /* @__PURE__ */ new Set([
	"css",
	"scss",
	"less",
	"stylus"
]);
function Wo(e) {
	let t = (e || "").toLowerCase().trim();
	if (Ho.has(t)) return Bo({
		mode: "markup",
		lineComments: [],
		blockComments: []
	});
	if (Uo.has(t)) return Bo({
		mode: "style",
		keywords: zo
	});
	if (Vo[t]) return Vo[t];
	let n = {
		js: "javascript",
		jsx: "javascript",
		mjs: "javascript",
		cjs: "javascript",
		ts: "typescript",
		tsx: "typescript",
		py: "python",
		rb: "ruby",
		sh: "shell",
		bash: "shell",
		zsh: "shell",
		console: "shell",
		terminal: "shell",
		yml: "yaml",
		htm: "html",
		"c++": "cpp",
		"c#": "csharp",
		golang: "go",
		rs: "rust",
		kt: "kotlin",
		plaintext: "text",
		plain: "text",
		txt: "text"
	}[t];
	return n && Vo[n] ? Vo[n] : Bo({ mode: "text" });
}
var Go = /[A-Za-z_$À-￿]/, Ko = /[A-Za-z0-9_$À-￿]/, qo = "+-*/%=<>!&|^~?:";
function Jo(e, t, n) {
	for (let r of n) if (r && e.startsWith(r, t)) return r;
	return null;
}
function Yo(e, t) {
	let n = [], r = (e) => t.caseInsensitive ? e.toLowerCase() : e, i = new Set(t.keywords.map(r)), a = new Set(t.builtins.map(r)), o = new Set(t.types.map(r)), s = new Set(t.constants.map(r)), c = 0, l = e.length, u = (e, t) => {
		t && n.push({
			kind: e,
			value: t
		});
	};
	for (; c < l;) {
		let n = e[c];
		if (n === " " || n === "	" || n === "\n" || n === "\r") {
			let t = c;
			for (; t < l && /\s/.test(e[t]);) t++;
			u("plain", e.slice(c, t)), c = t;
			continue;
		}
		if (Jo(e, c, t.lineComments)) {
			let t = e.indexOf("\n", c);
			t === -1 && (t = l), u("comment", e.slice(c, t)), c = t;
			continue;
		}
		let d = null, f = "";
		for (let [n, r] of t.blockComments) if (e.startsWith(n, c)) {
			f = n, d = r;
			break;
		}
		if (d) {
			let t = e.indexOf(d, c + f.length), n = t === -1 ? l : t + d.length;
			u("comment", e.slice(c, n)), c = n;
		} else if (t.stringDelims.includes(n)) {
			let t = c + 1;
			for (; t < l;) if (e[t] === "\\") t += 2;
			else {
				if (e[t] === n) {
					t++;
					break;
				}
				if (e[t] === "\n" && n !== "`") break;
				t++;
			}
			u("string", e.slice(c, Math.min(t, l))), c = Math.min(t, l);
		} else if (/[0-9]/.test(n) || n === "." && /[0-9]/.test(e[c + 1] ?? "")) {
			let t = /^(?:0[xX][0-9a-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?)/.exec(e.slice(c)), r = t ? t[0] : n;
			u("number", r), c += r.length;
		} else if (Go.test(n)) {
			let t = c;
			for (; t < l && Ko.test(e[t]);) t++;
			let n = e.slice(c, t), d = t;
			for (; d < l && /\s/.test(e[d]);) d++;
			let f = e[d] === "(", p = r(n);
			i.has(p) ? u("keyword", n) : o.has(p) ? u("type", n) : a.has(p) ? u("function", n) : s.has(p) ? u("number", n) : u(f ? "function" : "plain", n), c = t;
		} else if (qo.includes(n)) {
			let t = c;
			for (; t < l && qo.includes(e[t]);) t++;
			u("operator", e.slice(c, t)), c = t;
		} else u("punctuation", n), c += 1;
	}
	return n;
}
function Xo(e) {
	let t = [], n = 0, r = e.length;
	for (; n < r;) {
		if (e.startsWith("<!--", n)) {
			let i = e.indexOf("-->", n + 4), a = i === -1 ? r : i + 3;
			t.push({
				kind: "comment",
				value: e.slice(n, a)
			}), n = a;
			continue;
		}
		if (e[n] === "<" && /[A-Za-z/!]/.test(e[n + 1] ?? "")) {
			let i = /^<\/?[A-Za-z][\w:.-]*/.exec(e.slice(n));
			if (i) {
				for (t.push({
					kind: "tag",
					value: i[0]
				}), n += i[0].length; n < r && e[n] !== ">";) {
					let i = e[n];
					if (/\s/.test(i)) {
						let i = n;
						for (; i < r && /\s/.test(e[i]);) i++;
						t.push({
							kind: "plain",
							value: e.slice(n, i)
						}), n = i;
						continue;
					}
					if (i === "/" || i === "=") {
						t.push({
							kind: "punctuation",
							value: i
						}), n++;
						continue;
					}
					if (i === "\"" || i === "'") {
						let a = e.indexOf(i, n + 1), o = a === -1 ? r : a + 1;
						t.push({
							kind: "string",
							value: e.slice(n, o)
						}), n = o;
						continue;
					}
					let a = /^[^\s=/>]+/.exec(e.slice(n));
					a ? (t.push({
						kind: "attr",
						value: a[0]
					}), n += a[0].length) : n++;
				}
				n < r && e[n] === ">" && (t.push({
					kind: "tag",
					value: ">"
				}), n++);
				continue;
			}
		}
		let i = e.indexOf("<", n), a = i === -1 ? r : i;
		t.push({
			kind: "plain",
			value: e.slice(n, a)
		}), n = a;
	}
	return t;
}
function Zo(e, t) {
	let n = [], r = new Set(t.keywords), i = 0, a = e.length, o = (e, t) => {
		t && n.push({
			kind: e,
			value: t
		});
	};
	for (; i < a;) {
		let t = e[i];
		if (e.startsWith("/*", i)) {
			let t = e.indexOf("*/", i + 2), n = t === -1 ? a : t + 2;
			o("comment", e.slice(i, n)), i = n;
			continue;
		}
		if (t === "\"" || t === "'") {
			let n = i + 1;
			for (; n < a && e[n] !== t;) e[n] === "\\" && n++, n++;
			o("string", e.slice(i, Math.min(n + 1, a))), i = Math.min(n + 1, a);
			continue;
		}
		if (t === "{") {
			for (o("punctuation", "{"), i++; i < a && e[i] !== "}";) {
				let t = e[i];
				if (/\s/.test(t)) {
					let t = i;
					for (; t < a && /\s/.test(e[t]);) t++;
					o("plain", e.slice(i, t)), i = t;
				} else if (t === ";") o("punctuation", ";"), i++;
				else if (t === ":") o("punctuation", ":"), i++;
				else if (t === "#") {
					let n = /^#[\da-fA-F]{3,8}/.exec(e.slice(i));
					o("number", n ? n[0] : t), i += n ? n[0].length : 1;
				} else if (/[0-9]/.test(t)) {
					let n = /^-?\d*\.?\d+(?:px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|fr|ch|ex)?/.exec(e.slice(i)), r = n ? n[0] : t;
					o("number", r), i += r.length;
				} else if (Go.test(t)) {
					let t = i;
					for (; t < a && /[\w-]/.test(e[t]);) t++;
					let n = e.slice(i, t), s = t;
					for (; s < a && /\s/.test(e[s]);) s++;
					e[s] === ":" ? o("property", n) : r.has(n.toLowerCase()) ? o("keyword", n) : o("plain", n), i = t;
				} else o("punctuation", t), i++;
			}
			i < a && e[i] === "}" && (o("punctuation", "}"), i++);
			continue;
		}
		if (t === "}") {
			o("punctuation", "}"), i++;
			continue;
		}
		let n = i;
		for (; n < a && e[n] !== "{" && e[n] !== "}";) n++;
		let s = e.slice(i, n);
		s.trim() ? o("selector", s) : o("plain", s), i = n;
	}
	return n;
}
function Qo(e, t) {
	if (!e) return [];
	let n = Wo(t);
	return n.mode === "text" ? [{
		kind: "plain",
		value: e
	}] : n.mode === "markup" ? Xo(e) : n.mode === "style" ? Zo(e, n) : Yo(e, n);
}
//#endregion
//#region src/components/code/Code.vue?vue&type=script&setup=true&lang.ts
var $o = {
	key: 0,
	class: "mc-code__header mc-sheen-sweep"
}, es = { class: "mc-code__title" }, ts = ["disabled", "aria-label"], ns = { class: "mc-code__copy-text" }, rs = ["aria-label"], is = { class: "mc-code__pre" }, as = { class: "mc-code__code" }, os = {
	key: 0,
	class: "mc-code__gutter",
	"aria-hidden": "true"
}, ss = { class: "mc-code__content" }, cs = {
	key: 1,
	class: "mc-code__footer"
}, ls = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCode",
	__name: "Code",
	props: {
		code: {},
		language: { default: "text" },
		showLineNumbers: {
			type: Boolean,
			default: !0
		},
		lineNumbers: {
			type: Boolean,
			default: !0
		},
		showHeader: {
			type: Boolean,
			default: !0
		},
		filename: {},
		copyable: {
			type: Boolean,
			default: !0
		},
		maxHeight: {},
		theme: { default: "glass" },
		label: {},
		customClass: {}
	},
	emits: ["copy", "copied"],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n, u = N(!1), d, p = i(() => r.showLineNumbers && r.lineNumbers), m = i(() => {
			let e = Qo(r.code ?? "", r.language), t = [[]];
			for (let n of e) n.value.split("\n").forEach((e, r) => {
				r > 0 && t.push([]), e && t[t.length - 1].push({
					kind: n.kind,
					value: e
				});
			});
			return t;
		}), h = i(() => r.filename || r.label || r.language || "code"), g = i(() => !!(r.code ?? "").trim().length);
		async function _() {
			if (g.value) try {
				typeof navigator < "u" && navigator.clipboard?.writeText && await navigator.clipboard.writeText(r.code ?? ""), u.value = !0, o("copy", r.code ?? ""), o("copied"), d && clearTimeout(d), d = setTimeout(() => {
					u.value = !1;
				}, 1600);
			} catch {
				u.value = !1;
			}
		}
		let v = i(() => {
			if (r.maxHeight !== void 0 && r.maxHeight !== null) return typeof r.maxHeight == "number" ? { maxHeight: `${r.maxHeight}px` } : { maxHeight: r.maxHeight };
		}), y = i(() => Z("mc-code", "mc-grain-overlay", `mc-code--${r.theme}`, {
			"has-gutter": p.value,
			"has-header": r.showHeader
		}, r.customClass));
		return (n, r) => (A(), c("figure", { class: C(y.value) }, [
			t.showHeader ? (A(), c("header", $o, [
				r[0] || (r[0] = l("span", {
					class: "mc-code__dots",
					"aria-hidden": "true"
				}, [
					l("i"),
					l("i"),
					l("i")
				], -1)),
				l("span", es, R(h.value), 1),
				r[1] || (r[1] = l("span", { class: "mc-code__spacer" }, null, -1)),
				F(n.$slots, "header", {}, void 0, !0),
				t.copyable ? (A(), c("button", {
					key: 0,
					type: "button",
					class: C(["mc-code__copy", { "is-copied": u.value }]),
					disabled: !g.value,
					"aria-label": u.value ? B(a).code?.copied ?? "Copied" : B(a).code?.copy ?? "Copy code",
					"aria-live": "polite",
					onClick: _
				}, [f($, {
					name: u.value ? "check" : "copy",
					size: 14
				}, null, 8, ["name"]), l("span", ns, R(u.value ? B(a).code?.copied ?? "Copied" : B(a).code?.copy ?? "Copy"), 1)], 10, ts)) : s("", !0)
			])) : s("", !0),
			l("div", {
				class: "mc-code__body mc-scroll",
				style: T(v.value),
				tabindex: "0",
				role: "region",
				"aria-label": h.value
			}, [l("pre", is, [l("code", as, [(A(!0), c(e, null, P(m.value, (t, n) => (A(), c("span", {
				key: n,
				class: "mc-code__line"
			}, [p.value ? (A(), c("span", os, R(n + 1), 1)) : s("", !0), l("span", ss, [(A(!0), c(e, null, P(t, (e, t) => (A(), c("span", {
				key: t,
				class: C(["mc-code__token", `mc-code__token--${e.kind}`])
			}, R(e.value), 3))), 128))])]))), 128))])])], 12, rs),
			n.$slots.footer ? (A(), c("footer", cs, [F(n.$slots, "footer", {}, void 0, !0)])) : s("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-6035b7f3"]]), us = [
	"id",
	"disabled",
	"aria-expanded",
	"aria-controls",
	"aria-disabled",
	"onClick"
], ds = { class: "mc-collapse__head" }, fs = {
	class: "mc-collapse__title",
	"data-mc-type": "title"
}, ps = ["id", "aria-labelledby"], ms = { class: "mc-collapse__panel-inner" }, hs = { class: "mc-collapse__content" }, gs = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCollapse",
	__name: "Collapse",
	props: {
		items: {},
		modelValue: { default: void 0 },
		accordion: {
			type: Boolean,
			default: !1
		},
		ghost: {
			type: Boolean,
			default: !1
		},
		defaultOpen: { default: () => [] },
		expandIcon: { default: "chevron-down" },
		iconPosition: { default: "right" },
		separated: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = Fi("mc-collapse");
		function f(e) {
			return `${u}-trigger-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
		}
		function p(e) {
			return `${u}-panel-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
		}
		let m = i(() => {
			let e = r.modelValue ?? r.defaultOpen;
			return e === void 0 ? [] : Array.isArray(e) ? e : [e];
		});
		function h(e) {
			return m.value.includes(e);
		}
		function g(e, t) {
			if (t) return;
			let n;
			n = r.accordion ? h(e) ? [] : [e] : h(e) ? m.value.filter((t) => t !== e) : [...m.value, e], a("update:modelValue", r.accordion ? n[0] ?? "" : n), a("change", r.accordion ? n[0] ?? "" : n);
		}
		return (n, r) => (A(), c("div", { class: C(["mc-collapse", [B(Z)("mc-collapse", {
			"is-ghost": t.ghost,
			"is-separated": t.separated
		}, t.customClass)]]) }, [(A(!0), c(e, null, P(t.items, (e) => (A(), c("div", {
			key: e.key,
			class: C(["mc-collapse__item", {
				"is-open": h(e.key),
				"is-disabled": e.disabled
			}])
		}, [l("button", {
			id: f(e.key),
			class: "mc-collapse__trigger",
			type: "button",
			disabled: e.disabled,
			"aria-expanded": h(e.key),
			"aria-controls": p(e.key),
			"aria-disabled": e.disabled || void 0,
			onClick: (t) => g(e.key, e.disabled)
		}, [l("span", ds, [
			t.iconPosition === "left" ? (A(), o($, {
				key: 0,
				name: t.expandIcon,
				class: "mc-collapse__chevron is-left"
			}, null, 8, ["name"])) : s("", !0),
			e.icon ? (A(), o($, {
				key: 1,
				name: e.icon,
				class: "mc-collapse__icon"
			}, null, 8, ["name"])) : s("", !0),
			l("span", fs, [F(n.$slots, "title", { item: e }, () => [d(R(e.title), 1)], !0)])
		]), t.iconPosition === "right" ? (A(), o($, {
			key: 0,
			name: t.expandIcon,
			class: "mc-collapse__chevron"
		}, null, 8, ["name"])) : s("", !0)], 8, us), l("div", {
			id: p(e.key),
			class: "mc-collapse__panel",
			role: "region",
			"aria-labelledby": f(e.key)
		}, [r[0] || (r[0] = l("span", {
			class: "mc-collapse__aurora",
			"aria-hidden": "true"
		}, null, -1)), l("div", ms, [l("div", hs, [F(n.$slots, "default", { item: e }, () => [d(R(e.content), 1)], !0)])])], 8, ps)], 2))), 128)), F(n.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-93d7aa1a"]]), _s = "cubic-bezier(0.34, 1.56, 0.64, 1)", vs = 320;
function ys(e, t) {
	if (typeof window > "u" || typeof document > "u") return t;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(e).trim() || t;
	} catch {
		return t;
	}
}
function bs(e = {}) {
	function t() {
		return z(e.direction) !== "horizontal";
	}
	function n() {
		return z(e.easing) ?? ys("--mc-ease-spring", _s);
	}
	function r() {
		let t = z(e.duration);
		if (t !== void 0) return t;
		let n = Number.parseFloat(ys("--mc-dur-base", String(vs)));
		return Number.isFinite(n) ? n : vs;
	}
	function i(e) {
		return t() ? e.scrollHeight : e.scrollWidth;
	}
	function a(e) {
		let t = r(), i = n();
		return [
			`height ${t}ms ${i}`,
			`width ${t}ms ${i}`,
			`opacity ${t}ms ${i}`,
			`transform ${t}ms ${i}`
		].join(", ");
	}
	function o(e) {
		let n = e, r = t();
		n.style.overflow = "hidden", n.style.height = r ? "0px" : "", n.style.width = r ? "" : "0px", n.style.opacity = "0", n.style.transform = "scale(0.98)";
	}
	function s(e, n) {
		let o = e, s = t(), c = i(o);
		o.style.transition = a(o), S(() => {
			requestAnimationFrame(() => {
				s ? (o.style.height = `${c}px`, o.style.width = "") : (o.style.width = `${c}px`, o.style.height = ""), o.style.opacity = "1", o.style.transform = "scale(1)";
			});
		}), window.setTimeout(() => n(), r() + 20);
	}
	function c(e) {
		let t = e;
		t.style.overflow = "", t.style.height = "", t.style.width = "", t.style.opacity = "", t.style.transform = "", t.style.transition = "";
	}
	function l(e) {
		let n = e, r = t(), o = i(n);
		n.style.overflow = "hidden", n.style.transition = a(n), r ? (n.style.height = `${o}px`, n.style.width = "") : (n.style.width = `${o}px`, n.style.height = ""), n.style.opacity = "1", n.style.transform = "scale(1)";
	}
	function u(e, n) {
		let i = e, a = t();
		requestAnimationFrame(() => {
			a ? (i.style.height = "0px", i.style.width = "") : (i.style.width = "0px", i.style.height = ""), i.style.opacity = "0", i.style.transform = "scale(0.98)";
		}), window.setTimeout(() => n(), r() + 20);
	}
	function d(e) {
		let t = e;
		t.style.overflow = "", t.style.height = "", t.style.width = "", t.style.opacity = "", t.style.transform = "", t.style.transition = "";
	}
	return {
		onBeforeEnter: o,
		onEnter: s,
		onAfterEnter: c,
		onBeforeLeave: l,
		onLeave: u,
		onAfterLeave: d
	};
}
//#endregion
//#region src/components/collapse-transition/CollapseTransition.vue?vue&type=script&setup=true&lang.ts
function xs() {
	let e = m(), t = e?.setupState, r = e?.slots.default?.() ?? [], i = r.length > 1 || t?.surface ? [_("div", {
		class: t?.classes,
		tabindex: t?.surface ? 0 : void 0
	}, [...t?.surface ? [_("span", {
		class: "mc-collapse-transition__aurora mc-aurora-inset",
		"aria-hidden": "true"
	}), _("span", {
		class: "mc-collapse-transition__edge",
		"aria-hidden": "true"
	})] : [], ...r])] : r;
	return _(n, {
		css: !1,
		...t?.hooks
	}, { default: () => i });
}
//#endregion
//#region src/components/collapse-transition/CollapseTransition.vue
var Ss = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	render: xs,
	name: "MochiCollapseTransition",
	__name: "CollapseTransition",
	props: {
		direction: { default: "vertical" },
		duration: {},
		surface: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e;
		return {
			render: xs,
			props: t,
			hooks: bs({
				direction: () => t.direction,
				duration: () => t.duration
			}),
			classes: i(() => Z("mc-collapse-transition", `mc-collapse-transition--${t.direction}`, {
				"mc-collapse-transition--surface": t.surface,
				"mc-sheen-sweep": t.surface,
				"is-disabled": t.disabled
			}, t.customClass))
		};
	}
}), [["__scopeId", "data-v-8e9b68d7"]]), Cs = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], ws = { class: "mc-color-picker__text" }, Ts = ["id", "aria-label"], Es = { class: "mc-color-picker__preview" }, Ds = { class: "mc-color-picker__preview-text" }, Os = { class: "mc-color-picker__preview-meta" }, ks = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], As = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], js = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], Ms = { class: "mc-color-picker__row" }, Ns = { class: "mc-color-picker__hex-field" }, Ps = ["disabled", "aria-label"], Fs = {
	key: 0,
	class: "mc-color-picker__presets"
}, Is = [
	"disabled",
	"aria-label",
	"onClick"
], Ls = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiColorPicker",
	__name: "ColorPicker",
	props: {
		modelValue: { default: "" },
		format: { default: "hex" },
		showAlpha: {
			type: Boolean,
			default: !1
		},
		presets: { default: () => [] },
		size: { default: "medium" },
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = Zt(), p = An(), m = a, h = Fi("mc-color-picker");
		function g(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function _(e, t, n) {
			let r = t / 100, i = n / 100, a = i * r, o = a * (1 - Math.abs(e / 60 % 2 - 1)), s = i - a, c = 0, l = 0, u = 0;
			return e < 60 ? [c, l, u] = [
				a,
				o,
				0
			] : e < 120 ? [c, l, u] = [
				o,
				a,
				0
			] : e < 180 ? [c, l, u] = [
				0,
				a,
				o
			] : e < 240 ? [c, l, u] = [
				0,
				o,
				a
			] : e < 300 ? [c, l, u] = [
				o,
				0,
				a
			] : [c, l, u] = [
				a,
				0,
				o
			], {
				r: Math.round((c + s) * 255),
				g: Math.round((l + s) * 255),
				b: Math.round((u + s) * 255)
			};
		}
		function v(e, t, n) {
			let r = e / 255, i = t / 255, a = n / 255, o = Math.max(r, i, a), s = o - Math.min(r, i, a), c = 0;
			s !== 0 && (c = o === r ? (i - a) / s % 6 : o === i ? (a - r) / s + 2 : (r - i) / s + 4, c *= 60, c < 0 && (c += 360));
			let l = o === 0 ? 0 : s / o * 100;
			return {
				h: c,
				s: l,
				v: o * 100
			};
		}
		function y(e, t, n) {
			let r = e / 255, i = t / 255, a = n / 255, o = Math.max(r, i, a), s = Math.min(r, i, a), c = o - s, l = (o + s) / 2, u = 0, d = 0;
			return c !== 0 && (d = c / (1 - Math.abs(2 * l - 1)), u = o === r ? (i - a) / c % 6 : o === i ? (a - r) / c + 2 : (r - i) / c + 4, u *= 60, u < 0 && (u += 360)), {
				h: u,
				s: d * 100,
				l: l * 100
			};
		}
		function b(e, t, n) {
			let r = t / 100, i = n / 100, a = (1 - Math.abs(2 * i - 1)) * r, o = a * (1 - Math.abs(e / 60 % 2 - 1)), s = i - a / 2, c = 0, l = 0, u = 0;
			return e < 60 ? [c, l, u] = [
				a,
				o,
				0
			] : e < 120 ? [c, l, u] = [
				o,
				a,
				0
			] : e < 180 ? [c, l, u] = [
				0,
				a,
				o
			] : e < 240 ? [c, l, u] = [
				0,
				o,
				a
			] : e < 300 ? [c, l, u] = [
				o,
				0,
				a
			] : [c, l, u] = [
				a,
				0,
				o
			], {
				r: Math.round((c + s) * 255),
				g: Math.round((l + s) * 255),
				b: Math.round((u + s) * 255)
			};
		}
		function w(e) {
			let t = (e ?? "").trim().toLowerCase();
			if (!t) return null;
			if (t.startsWith("#")) {
				let e = t.slice(1);
				if (e.length === 3 || e.length === 4) {
					let t = parseInt(e[0] + e[0], 16), n = parseInt(e[1] + e[1], 16), r = parseInt(e[2] + e[2], 16), i = e.length === 4 ? parseInt(e[3] + e[3], 16) / 255 : 1;
					return {
						...v(t, n, r),
						a: i
					};
				}
				if (e.length === 6 || e.length === 8) {
					let t = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), r = parseInt(e.slice(4, 6), 16), i = e.length === 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1;
					return {
						...v(t, n, r),
						a: i
					};
				}
				return null;
			}
			let n = /^(rgba?|hsla?)\(([^)]+)\)$/.exec(t);
			if (!n) return null;
			let r = n[2].split(/[\s,/]+/).filter(Boolean), i = r.length > 3 ? g(parseFloat(r[3]), 0, 1) : 1;
			if (n[1] === "rgb" || n[1] === "rgba") return {
				...v(g(parseInt(r[0], 10) || 0, 0, 255), g(parseInt(r[1], 10) || 0, 0, 255), g(parseInt(r[2], 10) || 0, 0, 255)),
				a: i
			};
			let a = b(g(parseFloat(r[0]) || 0, 0, 360), g(parseFloat(r[1]) || 0, 0, 100), g(parseFloat(r[2]) || 0, 0, 100));
			return {
				...v(a.r, a.g, a.b),
				a: i
			};
		}
		function D(e, t, n) {
			let r = (e) => g(Math.round(e), 0, 255).toString(16).padStart(2, "0");
			return `#${r(e)}${r(t)}${r(n)}`;
		}
		let k = N(null), j = N(null), M = N(null), F = N(null), I = N(null), L = N(u.open), { style: z, transformOrigin: V, update: H, startAutoUpdate: W, stopAutoUpdate: q } = _n(k, j, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: L })
		}), J = N({
			h: 340,
			s: 86,
			v: 62,
			a: 1
		}), ne = N(""), re = null;
		G(() => u.open, (e) => {
			L.value = e, e ? S(() => {
				H(), W();
			}) : q();
		});
		function ie() {
			let e = w(u.modelValue);
			if (e) {
				J.value = e;
				let { r: t, g: n, b: r } = _(e.h, e.s, e.v);
				ne.value = D(t, n, r);
			}
		}
		G(() => u.modelValue, ie, { immediate: !0 });
		let Y = i(() => _(J.value.h, J.value.s, J.value.v)), ae = i(() => y(Y.value.r, Y.value.g, Y.value.b)), oe = i(() => {
			let { r: e, g: t, b: n } = Y.value, r = J.value.a;
			if (u.format === "rgb") return r < 1 ? `rgba(${e}, ${t}, ${n}, ${Number(r.toFixed(2))})` : `rgb(${e}, ${t}, ${n})`;
			if (u.format === "hsl") {
				let e = ae.value;
				return r < 1 ? `hsla(${Math.round(e.h)}, ${Math.round(e.s)}%, ${Math.round(e.l)}%, ${Number(r.toFixed(2))})` : `hsl(${Math.round(e.h)}, ${Math.round(e.s)}%, ${Math.round(e.l)}%)`;
			}
			if (u.showAlpha && r < 1) {
				let i = Math.round(r * 255).toString(16).padStart(2, "0");
				return `${D(e, t, n)}${i}`;
			}
			return D(e, t, n);
		}), se = i(() => D(Y.value.r, Y.value.g, Y.value.b)), ce = i(() => {
			let { r: e, g: t, b: n } = Y.value;
			return { background: `rgba(${e}, ${t}, ${n}, ${J.value.a})` };
		}), le = i(() => [
			"linear-gradient(to top, hsl(0 0% 0% / 1), hsl(0 0% 0% / 0))",
			"linear-gradient(to right, hsl(0 0% 100% / 1), hsl(0 0% 100% / 0))",
			`hsl(${Math.round(J.value.h)} 100% 50%)`
		].join(", ")), ue = i(() => {
			let e = [];
			for (let t = 0; t <= 6; t += 1) e.push(`hsl(${t * 60} 100% 50%)`);
			return `linear-gradient(to right, ${e.join(", ")})`;
		}), de = i(() => {
			let { r: e, g: t, b: n } = Y.value;
			return `linear-gradient(to right, rgba(${e}, ${t}, ${n}, 0), rgba(${e}, ${t}, ${n}, 1))`;
		}), fe = i(() => ({
			left: `${J.value.s}%`,
			top: `${100 - J.value.v}%`,
			background: `hsl(${Math.round(J.value.h)} 100% 50%)`
		})), pe = i(() => ({
			left: `${J.value.h / 360 * 100}%`,
			background: `hsl(${Math.round(J.value.h)} 100% 50%)`
		})), me = i(() => ({ left: `${J.value.a * 100}%` }));
		function he(e) {
			u.disabled && e || L.value !== e && (L.value = e, m("update:open", e), e ? (m("open"), S(() => {
				H(), W();
			})) : (m("close"), q()));
		}
		function ge() {
			he(!L.value);
		}
		function _e(e) {
			if (!L.value) return;
			let t = e.target;
			t && (k.value?.contains(t) || j.value?.contains(t) || he(!1));
		}
		function X(e, t) {
			let n = t.getBoundingClientRect();
			return g((e.clientX - n.left) / n.width, 0, 1);
		}
		function ve(e) {
			let t = M.value;
			if (!t) return;
			let n = t.getBoundingClientRect(), r = g((e.clientX - n.left) / n.width, 0, 1), i = g((e.clientY - n.top) / n.height, 0, 1);
			J.value = {
				...J.value,
				s: r * 100,
				v: (1 - i) * 100
			}, Ee();
		}
		function ye(e) {
			let t = F.value;
			t && (J.value = {
				...J.value,
				h: X(e, t) * 360
			}, Ee());
		}
		function be(e) {
			let t = I.value;
			t && (J.value = {
				...J.value,
				a: X(e, t)
			}, Ee());
		}
		function xe(e, t) {
			u.disabled || (t.preventDefault(), re = e, e === "sv" ? ve(t) : e === "hue" ? ye(t) : be(t));
		}
		function Se(e) {
			re && (re === "sv" ? ve(e) : re === "hue" ? ye(e) : be(e));
		}
		function Ce() {
			re = null;
		}
		function we(e) {
			Se(e);
		}
		function Te() {
			Ce();
		}
		O(() => {
			document.addEventListener("mousedown", _e), window.addEventListener("pointermove", we), window.addEventListener("pointerup", Te), window.addEventListener("pointercancel", Te);
		}), E(() => {
			document.removeEventListener("mousedown", _e), window.removeEventListener("pointermove", we), window.removeEventListener("pointerup", Te), window.removeEventListener("pointercancel", Te), q();
		});
		function Ee() {
			m("update:modelValue", oe.value), m("change", oe.value), ne.value = se.value;
		}
		function De() {
			let e = w(ne.value);
			e ? (J.value = e, Ee()) : ne.value = se.value;
		}
		function Oe(e) {
			let t = w(e);
			t && (J.value = t, Ee());
		}
		function ke(e) {
			if (u.disabled) return;
			let t = e.shiftKey ? 10 : 2;
			if (e.key === "ArrowLeft") J.value = {
				...J.value,
				s: g(J.value.s - t, 0, 100)
			};
			else if (e.key === "ArrowRight") J.value = {
				...J.value,
				s: g(J.value.s + t, 0, 100)
			};
			else if (e.key === "ArrowUp") J.value = {
				...J.value,
				v: g(J.value.v + t, 0, 100)
			};
			else if (e.key === "ArrowDown") J.value = {
				...J.value,
				v: g(J.value.v - t, 0, 100)
			};
			else return;
			e.preventDefault(), Ee();
		}
		function Ae(e) {
			if (u.disabled) return;
			let t = e.shiftKey ? 10 : 2;
			if (e.key === "ArrowLeft") J.value = {
				...J.value,
				h: (J.value.h - t + 360) % 360
			};
			else if (e.key === "ArrowRight") J.value = {
				...J.value,
				h: (J.value.h + t) % 360
			};
			else return;
			e.preventDefault(), Ee();
		}
		function je(e) {
			if (u.disabled) return;
			let t = e.shiftKey ? .1 : .02;
			if (e.key === "ArrowLeft" || e.key === "ArrowDown") J.value = {
				...J.value,
				a: g(J.value.a - t, 0, 1)
			};
			else if (e.key === "ArrowRight" || e.key === "ArrowUp") J.value = {
				...J.value,
				a: g(J.value.a + t, 0, 1)
			};
			else return;
			e.preventDefault(), Ee();
		}
		let Me = i(() => typeof u.teleport == "string" ? u.teleport : "body"), Ne = i(() => Z("mc-color-picker", `mc-color-picker--${u.size}`, {
			"is-open": L.value,
			"is-disabled": u.disabled
		}, u.customClass));
		return (i, a) => (A(), c("div", { class: C(Ne.value) }, [l("button", {
			ref_key: "trigger",
			ref: k,
			type: "button",
			class: "mc-color-picker__trigger",
			disabled: r.disabled,
			"aria-disabled": r.disabled || void 0,
			"aria-expanded": L.value,
			"aria-haspopup": "dialog",
			"aria-controls": B(h),
			onClick: ge
		}, [
			l("span", {
				class: "mc-color-picker__swatch",
				style: T(ce.value),
				"aria-hidden": "true"
			}, null, 4),
			l("span", ws, R(oe.value), 1),
			f($, {
				name: "chevron-down",
				size: 13,
				class: "mc-color-picker__caret"
			}),
			a[4] || (a[4] = l("span", {
				class: "mc-color-picker__sheen",
				"aria-hidden": "true"
			}, null, -1))
		], 8, Cs), (A(), o(t, {
			to: Me.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [L.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: j,
				class: "mc-color-picker__panel",
				style: B(z)
			}, B(p), {
				id: B(h),
				role: "dialog",
				"aria-label": B(d).colorPicker?.picker ?? "colour picker"
			}), [l("div", {
				class: "mc-color-picker__inner mc-grain-overlay",
				style: T({ transformOrigin: B(V) })
			}, [
				l("div", Es, [
					l("span", {
						class: "mc-color-picker__chip",
						style: T(ce.value),
						"aria-hidden": "true"
					}, null, 4),
					l("span", Ds, R(oe.value), 1),
					l("span", Os, "alpha " + R(Math.round(J.value.a * 100)) + "%", 1)
				]),
				l("div", {
					ref_key: "svEl",
					ref: M,
					class: "mc-color-picker__sv",
					style: T({ background: le.value }),
					role: "slider",
					tabindex: r.disabled ? -1 : 0,
					"aria-label": B(d).colorPicker?.saturation ?? "saturation and brightness",
					"aria-valuenow": Math.round(J.value.s),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-disabled": r.disabled || void 0,
					onPointerdown: a[0] || (a[0] = (e) => xe("sv", e)),
					onKeydown: ke
				}, [l("span", {
					class: "mc-color-picker__knob",
					style: T(fe.value),
					"aria-hidden": "true"
				}, null, 4)], 44, ks),
				l("div", {
					ref_key: "hueEl",
					ref: F,
					class: "mc-color-picker__slider",
					style: T({ background: ue.value }),
					role: "slider",
					tabindex: r.disabled ? -1 : 0,
					"aria-label": B(d).colorPicker?.hue ?? "hue",
					"aria-valuenow": Math.round(J.value.h),
					"aria-valuemin": "0",
					"aria-valuemax": "360",
					"aria-orientation": "horizontal",
					"aria-disabled": r.disabled || void 0,
					onPointerdown: a[1] || (a[1] = (e) => xe("hue", e)),
					onKeydown: Ae
				}, [l("span", {
					class: "mc-color-picker__knob mc-color-picker__knob--bar",
					style: T(pe.value),
					"aria-hidden": "true"
				}, null, 4)], 44, As),
				r.showAlpha ? (A(), c("div", {
					key: 0,
					ref_key: "alphaEl",
					ref: I,
					class: "mc-color-picker__slider mc-color-picker__slider--alpha",
					style: T({ background: de.value }),
					role: "slider",
					tabindex: r.disabled ? -1 : 0,
					"aria-label": B(d).colorPicker?.alpha ?? "alpha",
					"aria-valuenow": Math.round(J.value.a * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-orientation": "horizontal",
					"aria-disabled": r.disabled || void 0,
					onPointerdown: a[2] || (a[2] = (e) => xe("alpha", e)),
					onKeydown: je
				}, [l("span", {
					class: "mc-color-picker__knob mc-color-picker__knob--bar",
					style: T(me.value),
					"aria-hidden": "true"
				}, null, 4)], 44, js)) : s("", !0),
				l("div", Ms, [l("label", Ns, [a[5] || (a[5] = l("span", { class: "mc-color-picker__hex-label" }, "HEX", -1)), te(l("input", {
					"onUpdate:modelValue": a[3] || (a[3] = (e) => ne.value = e),
					class: "mc-color-picker__hex-input",
					spellcheck: "false",
					disabled: r.disabled,
					"aria-label": B(d).colorPicker?.hex ?? "hex value",
					onBlur: De,
					onKeydown: K(De, ["enter"])
				}, null, 40, Ps), [[U, ne.value]])]), u.presets.length ? (A(), c("div", Fs, [(A(!0), c(e, null, P(u.presets, (e) => (A(), c("button", {
					key: e,
					type: "button",
					class: "mc-color-picker__preset",
					style: T({ background: e }),
					disabled: r.disabled,
					"aria-label": `use ${e}`,
					onClick: (t) => Oe(e)
				}, null, 12, Is))), 128))])) : s("", !0)])
			], 4)], 16, Ts)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-7c59475f"]]), Rs = ["aria-label"], zs = {
	key: 0,
	class: "mc-command-bar__side mc-command-bar__side--start"
}, Bs = { class: "mc-command-bar__main" }, Vs = {
	key: 1,
	class: "mc-command-bar__side mc-command-bar__side--end"
}, Hs = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCommandBar",
	__name: "CommandBar",
	props: {
		position: { default: "inline" },
		inset: { default: "var(--mc-space-4)" },
		tone: { default: "glass" },
		divider: {
			type: Boolean,
			default: !0
		},
		accent: {
			type: Boolean,
			default: !1
		},
		bleed: {
			type: Boolean,
			default: !1
		},
		label: { default: "命令栏" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => Z("mc-command-bar", `mc-command-bar--${t.position}`, `mc-command-bar--${t.tone}`, {
			"has-divider": t.divider,
			"has-accent": t.accent,
			"is-bleed": t.bleed
		}, t.customClass)), r = i(() => {
			let e = { "--mc-cb-inset": t.inset };
			return t.position !== "inline" && !t.bleed && (e.insetInline = t.inset), e;
		});
		return (t, i) => (A(), c("div", {
			class: C(n.value),
			style: T(r.value),
			role: "toolbar",
			"aria-label": e.label
		}, [l("div", { class: C(["mc-command-bar__inner", { "mc-sheen-sweep": e.tone === "glass" }]) }, [
			i[0] || (i[0] = l("span", {
				class: "mc-command-bar__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			i[1] || (i[1] = l("span", {
				class: "mc-command-bar__grain",
				"aria-hidden": "true"
			}, null, -1)),
			t.$slots.start ? (A(), c("div", zs, [F(t.$slots, "start", {}, void 0, !0)])) : s("", !0),
			l("div", Bs, [F(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.end ? (A(), c("div", Vs, [F(t.$slots, "end", {}, void 0, !0)])) : s("", !0)
		], 2)], 14, Rs));
	}
}), [["__scopeId", "data-v-afbc846a"]]), Us = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function Ws(e) {
	let { enabled: t, container: n, autoFocus: r = !0, restoreFocus: i = !0, initialFocus: a, isTop: o } = e, s = null;
	function c(e) {
		if (e.key !== "Tab" || o && !o()) return;
		let t = n.value;
		if (!t) return;
		let r = Array.from(t.querySelectorAll(Us)).filter((e) => e.offsetParent !== null || e === document.activeElement);
		if (r.length === 0) {
			e.preventDefault(), t.focus();
			return;
		}
		let i = r[0], a = r[r.length - 1];
		e.shiftKey && document.activeElement === i ? (e.preventDefault(), a.focus()) : !e.shiftKey && document.activeElement === a && (e.preventDefault(), i.focus());
	}
	G(t, (e) => {
		e ? (s = document.activeElement, document.addEventListener("keydown", c, !0), S(() => {
			let e = a?.value ?? n.value;
			r && e && (!o || o()) && (e.querySelector(Us) ?? e).focus({ preventScroll: !0 });
		})) : (document.removeEventListener("keydown", c, !0), i && s && (s.focus({ preventScroll: !0 }), s = null));
	}, { flush: "post" }), E(() => {
		document.removeEventListener("keydown", c, !0);
	});
}
//#endregion
//#region src/composables/useScrollLock.ts
var Gs = 0, Ks = "", qs = "";
function Js(e) {
	G(e, (e) => {
		e ? t() : n();
	}, { immediate: !0 });
	function t() {
		if (!wt || Gs++ > 0) return;
		let e = document.body;
		Ks = e.style.overflow, qs = e.style.paddingRight;
		let t = window.innerWidth - document.documentElement.clientWidth;
		e.style.overflow = "hidden", t > 0 && (e.style.paddingRight = `${t}px`);
	}
	function n() {
		if (!wt || Gs === 0 || (--Gs, Gs > 0)) return;
		let e = document.body;
		e.style.overflow = Ks, e.style.paddingRight = qs;
	}
	E(() => {
		if (Gs > 0) {
			Gs = 0;
			let e = document.body;
			e.style.overflow = Ks, e.style.paddingRight = qs;
		}
	});
}
//#endregion
//#region src/components/command-palette/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var Ys = ["aria-label"], Xs = { class: "mc-command__search" }, Zs = [
	"placeholder",
	"aria-controls",
	"aria-activedescendant"
], Qs = { class: "mc-command__hotkey" }, $s = ["id"], ec = {
	key: 0,
	class: "mc-command__group",
	role: "presentation"
}, tc = [
	"id",
	"data-active",
	"aria-selected",
	"aria-disabled",
	"onMouseenter",
	"onClick"
], nc = { class: "mc-command__text" }, rc = {
	class: "mc-command__title",
	"data-mc-type": "title"
}, ic = {
	key: 0,
	class: "mc-command__subtitle"
}, ac = {
	key: 1,
	class: "mc-command__shortcut"
}, oc = {
	key: 0,
	class: "mc-command__empty"
}, sc = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCommandPalette",
	__name: "CommandPalette",
	props: {
		open: { type: Boolean },
		items: { default: () => [] },
		placeholder: { default: "Search commands…" },
		hotkey: {},
		emptyText: { default: "No matching commands" },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		label: { default: "Command palette" },
		customClass: {}
	},
	emits: [
		"update:open",
		"open",
		"close",
		"select"
	],
	setup(r, { emit: a }) {
		let u = r, p = a, m = An(), h = Fi("mc-cmd"), g = N(null), _ = N(null), v = N(null), y = N(""), b = N(0), w = N(!!u.open), { isTop: T, isTopModal: D } = On({
			active: w,
			modal: !0
		}), k = Tn({ active: w }), j = wt && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent), M = i(() => u.hotkey ?? (j ? "⌘K" : "Ctrl K")), F = i(() => typeof u.teleport == "string" ? u.teleport : "body");
		function I(e) {
			return e.trim().toLowerCase();
		}
		let L = i(() => {
			let e = u.items ?? [], t = I(y.value);
			return t ? e.filter((e) => I(e.title).includes(t) || (e.subtitle ? I(e.subtitle).includes(t) : !1) || (e.group ? I(e.group).includes(t) : !1)) : e;
		}), z = i(() => {
			let e = [], t = /* @__PURE__ */ new Map(), n = 0;
			for (let r of L.value) {
				let i = r.group ?? "", a = t.get(i);
				a || (a = {
					name: i,
					rows: []
				}, t.set(i, a), e.push(a)), a.rows.push({
					item: r,
					index: n
				}), n += 1;
			}
			return e;
		}), V = i(() => L.value);
		G(() => u.open, (e) => {
			w.value = e, e ? (y.value = "", b.value = 0, S(() => _.value?.focus()), p("open")) : p("close");
		}), G(y, () => {
			b.value = 0;
		});
		function H(e) {
			u.open !== e && p("update:open", e);
		}
		function W() {
			H(!1);
		}
		function K() {
			W();
		}
		function q(e) {
			e.disabled || (p("select", e), e.action?.(), W());
		}
		function J(e) {
			let t = V.value.length;
			t && (b.value = (b.value + e + t) % t, ne());
		}
		function ne() {
			S(() => {
				let e = v.value;
				if (!e) return;
				let t = e.querySelector("[data-active=\"true\"]");
				if (!t) return;
				let n = t.offsetTop, r = n + t.offsetHeight;
				n < e.scrollTop ? e.scrollTop = n : r > e.scrollTop + e.clientHeight && (e.scrollTop = r - e.clientHeight);
			});
		}
		function re(e) {
			if (e.key === "ArrowDown") e.preventDefault(), J(1);
			else if (e.key === "ArrowUp") e.preventDefault(), J(-1);
			else if (e.key === "Enter") {
				e.preventDefault();
				let t = V.value[b.value];
				t && q(t);
			} else e.key === "Escape" && T() && (e.preventDefault(), W());
		}
		function ie(e) {
			e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), H(!u.open));
		}
		O(() => {
			wt && (document.addEventListener("keydown", ie), w.value = u.open);
		}), E(() => {
			wt && document.removeEventListener("keydown", ie);
		}), Ws({
			enabled: w,
			container: g,
			autoFocus: !1,
			isTop: D
		}), Js(w);
		let Y = i(() => `${h}-option-${b.value}`), ae = i(() => Z("mc-command-palette", u.customClass));
		return (i, a) => (A(), o(t, {
			to: F.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-command" }, {
			default: ee(() => [r.open ? (A(), c("div", x({
				key: 0,
				class: ae.value,
				style: { "--mc-layer-z": B(k) }
			}, B(m)), [l("div", {
				class: "mc-command__backdrop",
				onClick: K
			}), l("div", {
				ref_key: "panel",
				ref: g,
				class: "mc-command__panel mc-grain-overlay",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": r.label,
				onKeydown: re
			}, [
				a[2] || (a[2] = l("span", {
					class: "mc-command__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				l("div", Xs, [
					f($, {
						name: "search",
						size: 18,
						class: "mc-command__search-icon"
					}),
					te(l("input", {
						ref_key: "input",
						ref: _,
						"onUpdate:modelValue": a[0] || (a[0] = (e) => y.value = e),
						class: "mc-command__input",
						type: "text",
						role: "combobox",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: r.placeholder,
						"aria-expanded": !0,
						"aria-controls": `${B(h)}-list`,
						"aria-activedescendant": Y.value
					}, null, 8, Zs), [[U, y.value]]),
					l("kbd", Qs, R(M.value), 1)
				]),
				l("div", {
					ref_key: "list",
					ref: v,
					id: `${B(h)}-list`,
					class: "mc-command__list",
					role: "listbox"
				}, [(A(!0), c(e, null, P(z.value, (t) => (A(), c(e, { key: t.name || "default" }, [t.name ? (A(), c("div", ec, R(t.name), 1)) : s("", !0), (A(!0), c(e, null, P(t.rows, (e) => (A(), c("button", {
					id: `${B(h)}-option-${e.index}`,
					key: e.item.key,
					type: "button",
					role: "option",
					class: C(["mc-command__item mc-sheen-sweep", {
						"is-active": e.index === b.value,
						"is-disabled": e.item.disabled
					}]),
					"data-active": e.index === b.value ? "true" : "false",
					"aria-selected": e.index === b.value ? "true" : "false",
					"aria-disabled": e.item.disabled ? "true" : void 0,
					onMouseenter: (t) => b.value = e.index,
					onClick: (t) => q(e.item)
				}, [
					a[1] || (a[1] = l("span", {
						class: "mc-command__bar",
						"aria-hidden": "true"
					}, null, -1)),
					e.item.icon ? (A(), o($, {
						key: 0,
						name: e.item.icon,
						size: 17,
						class: "mc-command__icon"
					}, null, 8, ["name"])) : s("", !0),
					l("span", nc, [l("span", rc, R(e.item.title), 1), e.item.subtitle ? (A(), c("span", ic, R(e.item.subtitle), 1)) : s("", !0)]),
					e.item.shortcut ? (A(), c("kbd", ac, R(e.item.shortcut), 1)) : s("", !0)
				], 42, tc))), 128))], 64))), 128)), V.value.length ? s("", !0) : (A(), c("div", oc, R(r.emptyText), 1))], 8, $s),
				a[3] || (a[3] = l("div", { class: "mc-command__footer" }, [
					l("span", { class: "mc-command__hint" }, [
						l("kbd", null, "↑"),
						l("kbd", null, "↓"),
						d(" navigate")
					]),
					l("span", { class: "mc-command__hint" }, [l("kbd", null, "↵"), d(" select")]),
					l("span", { class: "mc-command__hint" }, [l("kbd", null, "esc"), d(" close")])
				], -1))
			], 40, Ys)], 16)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]));
	}
}), [["__scopeId", "data-v-42751d32"]]), cc = (e, t, n) => Math.min(Math.max(e, t), n);
function lc(e) {
	let t = {};
	e.name && (t["--mc-theme-name"] = e.name), e.pack && (t["--mc-pack-name"] = e.pack), typeof e.hue == "number" && (t["--mc-h"] = String(cc(e.hue, 0, 360))), typeof e.saturation == "number" && (t["--mc-s"] = `${cc(e.saturation, 0, 100)}%`), typeof e.accentHue == "number" && (t["--mc-h2"] = String(cc(e.accentHue, 0, 360))), typeof e.accentSaturation == "number" && (t["--mc-s2"] = `${cc(e.accentSaturation, 0, 100)}%`), typeof e.tertiaryHue == "number" && (t["--mc-h3"] = String(cc(e.tertiaryHue, 0, 360)));
	let n = e.effect;
	if (n) {
		if (typeof n.blur == "number" && (t["--mc-blur"] = `${n.blur}px`), typeof n.blurLarge == "number" && (t["--mc-blur-lg"] = `${n.blurLarge}px`), typeof n.saturation == "number" && (t["--mc-sat"] = String(n.saturation)), typeof n.glassAlpha == "number" && (t["--mc-glass-alpha"] = String(cc(n.glassAlpha, 0, 1))), typeof n.radius == "number" && (t["--mc-radius-md"] = `${n.radius}px`, t["--mc-radius-lg"] = `${n.radius + 4}px`, t["--mc-radius-xl"] = `${n.radius + 10}px`, t["--mc-radius-2xl"] = `${n.radius + 18}px`, t["--mc-radius-3xl"] = `${n.radius + 26}px`), typeof n.radiusLarge == "number" && (t["--mc-radius-2xl"] = `${n.radiusLarge}px`, t["--mc-radius-3xl"] = `${n.radiusLarge + 8}px`), typeof n.squish == "number" && (t["--mc-squish"] = String(n.squish)), typeof n.lift == "number" && (t["--mc-lift"] = `${n.lift}px`), typeof n.sheenSpeed == "number" && (t["--mc-sheen-speed"] = `${n.sheenSpeed}ms`), typeof n.auroraSpeed == "number" && (t["--mc-aurora-speed"] = `${n.auroraSpeed}s`), typeof n.grainAlpha == "number" && (t["--mc-grain-alpha"] = String(n.grainAlpha)), typeof n.ringWidth == "number" && (t["--mc-ring-width"] = `${n.ringWidth}px`), typeof n.shadowScale == "number") {
			let e = n.shadowScale;
			t["--mc-shadow-md"] = `0 ${8 * e}px ${20 * e}px -${6 * e}px var(--mc-shadow-color-md)`, t["--mc-shadow-lg"] = `0 ${18 * e}px ${40 * e}px -${12 * e}px var(--mc-shadow-color-lg)`, t["--mc-shadow-xl"] = `0 ${36 * e}px ${70 * e}px -${22 * e}px var(--mc-shadow-color-xl)`;
		}
		if (n.fonts) {
			let e = n.fonts;
			e.sans && (t["--mc-font-sans"] = e.sans), e.display && (t["--mc-font-display"] = e.display), e.round && (t["--mc-font-round"] = e.round), e.mono && (t["--mc-font-mono"] = e.mono), e.serif && (t["--mc-font-serif"] = e.serif), e.condensed && (t["--mc-font-condensed"] = e.condensed);
		}
	}
	if (e.cssVars) for (let [n, r] of Object.entries(e.cssVars)) t[n] = r;
	return t;
}
function uc(e, t) {
	let n = lc(t);
	for (let [t, r] of Object.entries(n)) e.style.setProperty(t, r);
	t.colorMode && e.setAttribute("data-mc-color-mode", t.colorMode), t.name && e.setAttribute("data-mc-theme", t.name), t.pack ? e.setAttribute("data-mc-pack", t.pack) : e.removeAttribute("data-mc-pack"), t.density ? e.setAttribute("data-mc-density", t.density) : e.removeAttribute("data-mc-density"), t.motion ? e.setAttribute("data-mc-motion", t.motion) : e.removeAttribute("data-mc-motion"), dc(e);
}
function dc(e) {
	if (typeof window > "u" || !e || !e.style) return;
	let t = `hsl(${getComputedStyle(e).getPropertyValue("--mc-h").trim()} 42% 11%)`, n = (t, n) => {
		let r = document.createElement("span");
		r.setAttribute("aria-hidden", "true"), r.style.cssText = `position:absolute;inline-size:0;block-size:0;overflow:hidden;pointer-events:none;visibility:hidden;${t}:${n}`, e.appendChild(r);
		let i = getComputedStyle(r).getPropertyValue(t).trim();
		return r.remove(), i || n;
	}, r = (e) => ft(e, ["#ffffff", t]), i = (e) => e === t ? "hsl(var(--mc-h) 42% 11%)" : e, a = n("background-color", "var(--mc-primary)");
	if (a) {
		let t = r([a]);
		t && e.style.setProperty("--mc-on-primary", i(t));
	}
	let o = n("background-color", "var(--mc-accent)"), s = o ? r([o]) : void 0;
	s && (e.style.setProperty("--mc-on-solid", i(s)), e.style.setProperty("--mc-accent-contrast", i(s)), e.style.setProperty("--mc-on-solid-soft", s === t ? "hsl(var(--mc-h) 42% 11% / 0.86)" : "rgb(255 255 255 / 0.86)"), e.style.setProperty("--mc-on-solid-muted", s === t ? "hsl(var(--mc-h) 42% 11% / 0.62)" : "rgb(255 255 255 / 0.62)"));
	let c = dt(n("background-image", "var(--mc-gradient-brand)")), l = c.length ? r(c) : void 0;
	l && (e.style.setProperty("--mc-on-gradient", i(l)), e.style.setProperty("--mc-on-gradient-muted", l === t ? "hsl(var(--mc-h) 42% 11% / 0.62)" : "rgb(255 255 255 / 0.62)"));
}
var fc = null;
function pc(e) {
	if (typeof document > "u" || fc) return;
	let t = e ?? document.documentElement;
	dc(t), fc = new MutationObserver(() => dc(t)), fc.observe(t, {
		attributes: !0,
		attributeFilter: ["data-mc-theme", "data-mc-color-mode"]
	}), t.addEventListener("transitionend", (e) => {
		let n = e.propertyName;
		(!n || n.startsWith("--mc-h")) && dc(t);
	});
}
function mc(e) {
	return e === "light" || e === "dark" ? e : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
var hc = [
	{
		name: "mochi",
		label: "Mochi",
		swatch: "#f472b6"
	},
	{
		name: "sakura",
		label: "Sakura",
		swatch: "#fb7185"
	},
	{
		name: "peach",
		label: "Peach",
		swatch: "#fb923c"
	},
	{
		name: "amber",
		label: "Amber",
		swatch: "#f59e0b"
	},
	{
		name: "mint",
		label: "Mint",
		swatch: "#34d399"
	},
	{
		name: "sky",
		label: "Sky",
		swatch: "#38bdf8"
	},
	{
		name: "violet",
		label: "Violet",
		swatch: "#a78bfa"
	},
	{
		name: "crimson",
		label: "Crimson",
		swatch: "#e11d48"
	},
	{
		name: "ink",
		label: "Ink",
		swatch: "#64748b"
	},
	{
		name: "cocoa",
		label: "Cocoa",
		swatch: "#a16207"
	}
], gc = [
	{
		name: "gfx-collage",
		label: "GFX Collage",
		preset: "sakura"
	},
	{
		name: "mint-agency",
		label: "Mint Agency",
		preset: "mint"
	},
	{
		name: "crimson-gothic",
		label: "Crimson Gothic",
		preset: "crimson"
	},
	{
		name: "poster",
		label: "Poster",
		preset: "ink"
	},
	{
		name: "dashboard",
		label: "Dashboard",
		preset: "violet"
	},
	{
		name: "neon-zine",
		label: "Neon Zine",
		preset: "sky"
	}
];
function _c() {
	let e = N({
		name: "mochi",
		colorMode: "light"
	});
	return {
		theme: e,
		colorMode: i(() => mc(e.value.colorMode))
	};
}
//#endregion
//#region src/components/config-provider/ConfigProvider.vue
var vc = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiConfigProvider",
	__name: "ConfigProvider",
	props: {
		theme: {},
		global: {
			type: Boolean,
			default: !1
		},
		locale: {},
		size: {},
		density: {},
		motion: {},
		pack: {},
		zIndex: { default: 2e3 },
		prefix: { default: "mc" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(null), r = N(t.size ?? "medium"), a = N(t.zIndex), o = N(t.prefix), s = N(t.locale ?? Qt);
		G(() => t.size, (e) => {
			e && (r.value = e);
		}), G(() => t.zIndex, (e) => {
			typeof e == "number" && (a.value = e);
		}), G(() => t.locale, (e) => {
			e && (s.value = e);
		});
		let l = i(() => t.theme ? lc(t.theme) : {}), u = i(() => mc(t.theme?.colorMode)), d = i(() => {
			let e = {};
			return t.theme?.name && (e["data-mc-theme"] = t.theme.name), t.theme?.pack && (e["data-mc-pack"] = t.theme.pack), t.theme?.colorMode && (e["data-mc-color-mode"] = u.value), t.theme?.density && (e["data-mc-density"] = t.theme.density), t.theme?.motion && (e["data-mc-motion"] = t.theme.motion), t.density && (e["data-mc-density"] = t.density), t.motion && (e["data-mc-motion"] = t.motion), t.pack && (e["data-mc-pack"] = t.pack), e;
		}), f = i(() => ({ ...l.value })), p = [];
		return G([
			l,
			u,
			() => t.theme?.name,
			() => t.theme?.pack,
			() => t.theme?.density,
			() => t.theme?.motion,
			() => t.density,
			() => t.motion,
			() => t.pack
		], () => {
			if (!t.global || typeof document > "u") return;
			let e = document.documentElement;
			for (let t of p) t in l.value || e.style.removeProperty(t);
			p = [];
			for (let [t, n] of Object.entries(l.value)) e.style.setProperty(t, n), p.push(t);
			t.theme?.name && e.setAttribute("data-mc-theme", t.theme.name), e.setAttribute("data-mc-color-mode", u.value);
			let n = t.pack ?? t.theme?.pack;
			n ? e.setAttribute("data-mc-pack", n) : e.removeAttribute("data-mc-pack");
			let r = t.density ?? t.theme?.density, i = t.motion ?? t.theme?.motion;
			r ? e.setAttribute("data-mc-density", r) : e.removeAttribute("data-mc-density"), i ? e.setAttribute("data-mc-motion", i) : e.removeAttribute("data-mc-motion"), dc(e);
		}, { immediate: !0 }), G([
			l,
			u,
			() => t.theme?.name,
			() => t.theme?.pack,
			() => t.pack
		], () => {
			t.global || typeof document > "u" || S(() => {
				n.value && dc(n.value);
			});
		}, {
			immediate: !0,
			flush: "post"
		}), E(() => {
			if (!t.global || typeof document > "u") return;
			let e = document.documentElement;
			for (let t of p) e.style.removeProperty(t);
			p = [];
		}), Xt(s), j(vn, {
			size: r,
			zIndex: a,
			prefix: o,
			locale: s,
			dark: i(() => u.value === "dark"),
			scopeAttrs: d,
			scopeStyle: l
		}), (t, r) => (A(), c("div", x({
			ref_key: "wrapper",
			ref: n,
			class: ["mc-config-provider", B(Z)(e.customClass)],
			style: f.value
		}, d.value), [F(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3dfb4e23"]]), yc = ["aria-label"], bc = {
	class: "mc-countdown__inner",
	"aria-hidden": "true"
}, xc = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiCountdown",
	__name: "Countdown",
	props: {
		target: {},
		format: { default: "HH:mm:ss" },
		size: { default: "medium" },
		color: {},
		separator: { default: ":" },
		customClass: {}
	},
	emits: ["finish"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(Date.now()), s, u = !1;
		function d() {
			let e = r.target;
			if (e instanceof Date) return e.getTime();
			if (typeof e == "number") return e;
			let t = new Date(e).getTime();
			return Number.isNaN(t) ? Date.now() : t;
		}
		function f() {
			p();
		}
		function p() {
			m();
			let e = 1e3 - Date.now() % 1e3 + 5;
			s = setTimeout(() => {
				o.value = Date.now(), g.value || p();
			}, e);
		}
		function m() {
			s && clearTimeout(s), s = void 0;
		}
		G(() => r.target, () => {
			u = !1, o.value = Date.now(), f();
		}, { immediate: !0 }), E(m);
		let h = i(() => Math.max(0, d() - o.value)), g = i(() => h.value <= 0);
		G(g, (e) => {
			e && !u && (u = !0, a("finish"), m());
		}, { immediate: !0 });
		let _ = i(() => {
			let e = Math.floor(h.value / 1e3), t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), i = Math.floor(e % 3600 / 60), a = e % 60, o = {
				D: t,
				H: n,
				m: i,
				s: a
			}, s = {
				D: String(t).padStart(2, "0"),
				H: String(n).padStart(2, "0"),
				m: String(i).padStart(2, "0"),
				s: String(a).padStart(2, "0")
			}, c = [], l = r.format, u = 0;
			for (; u < l.length;) {
				let e = l[u], t = l[u + 1];
				(e === "D" || e === "H" || e === "m" || e === "s") && t === e ? (c.push({
					char: s[e],
					kind: "digit"
				}), u += 2) : e === "D" || e === "H" || e === "m" || e === "s" ? (c.push({
					char: String(o[e]),
					kind: "digit"
				}), u += 1) : (c.push({
					char: e === " " ? r.separator : e,
					kind: "sep"
				}), u += 1);
			}
			return c;
		}), v = i(() => Z("mc-countdown", "mc-grain-overlay", `mc-countdown--${r.size}`, { "is-finished": g.value }, r.customClass)), y = i(() => {
			let e = Math.max(0, Math.floor(h.value / 1e3)), t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = e % 60, a = [];
			return t > 0 && a.push(`${t} day${t === 1 ? "" : "s"}`), n > 0 && a.push(`${n} hour${n === 1 ? "" : "s"}`), r > 0 && a.push(`${r} minute${r === 1 ? "" : "s"}`), a.push(`${i} second${i === 1 ? "" : "s"}`), a.join(" ");
		}), b = i(() => St(r.color) ? { color: St(r.color) } : void 0);
		return (t, n) => (A(), c("div", {
			class: C(v.value),
			style: T(b.value),
			role: "timer",
			"aria-live": "off",
			"aria-label": y.value
		}, [l("span", bc, [(A(!0), c(e, null, P(_.value, (e, t) => (A(), c("span", {
			key: `${t}-${e.kind}-${e.char}`,
			class: C(["mc-countdown__char", {
				"mc-countdown__char--digit": e.kind === "digit",
				"mc-countdown__char--sep": e.kind === "sep",
				"mc-sheen-sweep": e.kind === "digit"
			}])
		}, R(e.char), 3))), 128))])], 14, yc));
	}
}), [["__scopeId", "data-v-ddfa4066"]]);
//#endregion
//#region src/composables/useClickOutside.ts
function Sc(e, t, n = {}) {
	let { event: r = "mousedown", ignore: i = [] } = n;
	function a(n) {
		let r = B(e);
		if (!r) return;
		let a = n.target;
		if (a && !r.contains(a)) {
			for (let e of i) {
				let t = y(e) ? e.value : e;
				if (t && t.contains(a)) return;
			}
			t(n);
		}
	}
	O(() => {
		document.addEventListener(r, a, !0);
	}), E(() => {
		document.removeEventListener(r, a, !0);
	});
}
//#endregion
//#region src/components/data-table/DataTable.vue?vue&type=script&setup=true&lang.ts
var Cc = {
	key: 0,
	class: "mc-data-table__toolbar"
}, wc = { class: "mc-data-table__toolbar-lead" }, Tc = { class: "mc-data-table__toolbar-title" }, Ec = { class: "mc-data-table__toolbar-tail" }, Dc = ["aria-expanded"], Oc = { class: "mc-data-table__column-menu-title" }, kc = [
	"checked",
	"disabled",
	"onChange"
], Ac = { class: "mc-data-table__column-label" }, jc = {
	key: 0,
	class: "mc-data-table__head-row mc-data-table__head-row--group"
}, Mc = { class: "mc-visually-hidden" }, Nc = { class: "mc-data-table__checkbox" }, Pc = [
	"checked",
	".indeterminate",
	"aria-label"
], Fc = { class: "mc-visually-hidden" }, Ic = ["colspan"], Lc = {
	key: 0,
	class: "mc-data-table__group-title"
}, Rc = { class: "mc-visually-hidden" }, zc = { class: "mc-data-table__checkbox" }, Bc = [
	"checked",
	".indeterminate",
	"aria-label"
], Vc = { class: "mc-visually-hidden" }, Hc = ["aria-sort"], Uc = ["aria-label", "onClick"], Wc = { class: "mc-data-table__th-text" }, Gc = {
	key: 0,
	class: "mc-data-table__sort-priority",
	"aria-hidden": "true"
}, Kc = {
	key: 2,
	class: "mc-data-table__th-text"
}, qc = ["aria-label", "onPointerdown"], Jc = { class: "mc-data-table__body" }, Yc = {
	key: 0,
	class: "mc-data-table__spacer-row"
}, Xc = ["colspan"], Zc = [
	"onClick",
	"onKeydown",
	"onDragover",
	"onDrop"
], Qc = [
	"aria-label",
	"onKeydown",
	"onDragstart"
], $c = { class: "mc-data-table__checkbox" }, el = [
	"checked",
	"aria-label",
	"onChange"
], tl = [
	"aria-expanded",
	"aria-label",
	"onClick"
], nl = {
	key: 0,
	class: "mc-data-table__cell-clip"
}, rl = {
	key: 0,
	class: "mc-data-table__expand-row"
}, il = ["colspan"], al = { class: "mc-data-table__expand-inner" }, ol = { class: "mc-data-table__expand-json" }, sl = {
	key: 1,
	class: "mc-data-table__spacer-row"
}, cl = ["colspan"], ll = {
	key: 2,
	class: "mc-data-table__row mc-data-table__row--empty"
}, ul = ["colspan"], dl = {
	class: "mc-data-table__empty-icon",
	"aria-hidden": "true"
}, fl = { class: "mc-data-table__empty-text" }, pl = {
	key: 0,
	class: "mc-data-table__foot"
}, ml = { class: "mc-data-table__foot-row" }, hl = {
	key: 0,
	class: "mc-data-table__foot-label"
}, gl = {
	key: 1,
	class: "mc-data-table__foot-value"
}, _l = {
	key: 1,
	class: "mc-data-table__loading",
	role: "status",
	"aria-live": "polite"
}, vl = { class: "mc-visually-hidden" }, yl = {
	key: 2,
	class: "mc-data-table__footer"
}, bl = { class: "mc-data-table__total" }, xl = ["aria-label"], Sl = ["disabled", "aria-label"], Cl = {
	key: 0,
	class: "mc-data-table__ellipsis"
}, wl = ["aria-current", "onClick"], Tl = ["disabled", "aria-label"], El = { class: "mc-data-table__size" }, Dl = { class: "mc-visually-hidden" }, Ol = ["value"], kl = ["value"], Al = {
	key: 0,
	class: "mc-data-table__batch",
	role: "region",
	"aria-live": "polite"
}, jl = { class: "mc-data-table__batch-count" }, Ml = { class: "mc-data-table__batch-actions" }, Nl = ["aria-label"], Pl = 420, Fl = 140, Il = 40, Ll = 46, Rl = 46, zl = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDataTable",
	__name: "DataTable",
	props: {
		columns: { default: () => [] },
		data: { default: () => [] },
		rowKey: {
			type: [String, Function],
			default: "id"
		},
		pagination: {
			type: [Boolean, Object],
			default: !1
		},
		selection: {
			type: Boolean,
			default: !1
		},
		selectedKeys: {},
		expandable: {
			type: [Boolean, Function],
			default: !1
		},
		expandedKeys: {},
		defaultExpandedKeys: {},
		defaultExpandAll: { type: Boolean },
		loading: {
			type: Boolean,
			default: !1
		},
		empty: { default: "" },
		size: { default: "medium" },
		maxHeight: {},
		sort: {},
		stripe: {
			type: Boolean,
			default: !1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		multiSort: {
			type: Boolean,
			default: !1
		},
		sorts: { default: () => [] },
		columnGroups: { default: () => [] },
		columnVisibility: {
			type: Boolean,
			default: !1
		},
		hiddenColumns: { default: void 0 },
		defaultHiddenColumns: { default: () => [] },
		resizable: {
			type: Boolean,
			default: !1
		},
		summary: {
			type: [Boolean, Object],
			default: !1
		},
		summaryScope: { default: "all" },
		batchActions: {
			type: Boolean,
			default: !1
		},
		batchLabel: { default: "{count} selected" },
		virtual: {
			type: [Boolean, Object],
			default: !1
		},
		rowDraggable: {
			type: Boolean,
			default: !1
		},
		onRowReorder: {
			type: Function,
			default: void 0
		},
		customClass: {}
	},
	emits: [
		"update:selectedKeys",
		"update:expandedKeys",
		"update:sort",
		"update:sorts",
		"update:hiddenColumns",
		"update:page",
		"update:pageSize",
		"selection-change",
		"expand-change",
		"sort-change",
		"sorts-change",
		"column-resize",
		"page-change",
		"row-click",
		"row-reorder"
	],
	setup(t, { emit: r }) {
		let a = t, u = r, p = H(), m = Zt(), h = i(() => {
			let e = m.value.dataTable;
			return {
				columns: e?.columns ?? "Columns",
				visibleColumns: e?.visibleColumns ?? "Visible columns",
				reset: e?.reset ?? "Reset",
				selected: e?.selected ?? "{count} selected",
				total: e?.total ?? "Total {count}",
				selectAll: e?.selectAll ?? "Select all rows",
				selectRow: e?.selectRow ?? "Select row {index}",
				expand: e?.expand ?? "Expand row",
				collapse: e?.collapse ?? "Collapse row",
				previous: e?.previous ?? "Previous page",
				next: e?.next ?? "Next page",
				rowsPerPage: e?.rowsPerPage ?? "{count} / page",
				loading: e?.loading ?? "Loading…",
				dragColumn: e?.dragColumn ?? "Reorder",
				dragRow: e?.dragRow ?? "Drag row {index} to reorder",
				moveUp: e?.moveUp ?? "Move row {index} up",
				moveDown: e?.moveDown ?? "Move row {index} down",
				dropBefore: e?.dropBefore ?? "Drop before row {index}",
				dropAfter: e?.dropAfter ?? "Drop after row {index}",
				pager: e?.pager ?? "Pagination",
				clearSelection: e?.clearSelection ?? "Clear selection"
			};
		});
		function g(e, t) {
			return e.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : `{${n}}`);
		}
		let _ = (e) => e.render ? e.render(e.row, e.index) : null, v = (e) => e.render ? e.render(e.column) : null;
		function y(e, t) {
			return typeof a.rowKey == "function" ? a.rowKey(e, t) : e?.[a.rowKey] ?? t;
		}
		let b = i(() => {
			let e = /* @__PURE__ */ new Map();
			return a.data.forEach((t, n) => e.set(t, y(t, n))), e;
		});
		function x(e) {
			let t = b.value.get(e);
			return t === void 0 ? "" : t;
		}
		let w = N({
			key: "",
			order: null
		}), D = N([]), k = i(() => a.sort ?? w.value), j = i(() => a.sorts ?? D.value);
		function M(e) {
			if (a.multiSort) {
				let t = j.value.find((t) => t.key === e.key);
				return {
					order: t?.order ?? null,
					priority: t?.priority ?? 0
				};
			}
			return {
				order: k.value.key === e.key ? k.value.order : null,
				priority: 1
			};
		}
		function I(e) {
			if (!e.sortable) return;
			if (!a.multiSort) {
				let t = k.value, n = t.key === e.key && t.order === "asc" ? "desc" : "asc", r = {
					key: e.key,
					order: n
				};
				w.value = r, u("update:sort", r), u("sort-change", r);
				return;
			}
			let t = j.value.map((e) => ({ ...e })), n = t.findIndex((t) => t.key === e.key);
			if (n >= 0) {
				let r = t[n];
				r.order === "asc" ? t[n] = {
					key: e.key,
					order: "desc",
					priority: r.priority ?? n + 1
				} : t.splice(n, 1);
			} else t.push({
				key: e.key,
				order: "asc",
				priority: t.length + 1
			});
			let r = t.map((e, t) => ({
				...e,
				priority: t + 1
			}));
			if (D.value = r, u("update:sorts", r), u("sorts-change", r), r.length) {
				let e = {
					key: r[0].key,
					order: r[0].order,
					priority: 1
				};
				u("update:sort", e), u("sort-change", e);
			}
		}
		let L = i(() => {
			let e = a.multiSort ? j.value.filter((e) => e.key && e.order) : k.value?.key && k.value?.order ? [k.value] : [];
			return e.length ? [...a.data].sort((t, n) => {
				for (let r of e) {
					let e = t?.[r.key], i = n?.[r.key], a = 0;
					if (a = e === i ? 0 : e == null ? 1 : i == null ? -1 : e > i ? 1 : -1, a !== 0) return a * (r.order === "asc" ? 1 : -1);
				}
				return 0;
			}) : a.data;
		}), z = N(null);
		G([k, j], () => {
			z.value = null;
		}), G(() => a.data, (e) => {
			let t = z.value;
			if (!t || !t.length) return;
			let n = new Set(e.map((e, t) => y(e, t))), r = t.filter((e) => n.has(e)), i = new Set(r), a = e.map((e, t) => y(e, t)).filter((e) => !i.has(e));
			z.value = [...r, ...a];
		});
		let B = i(() => {
			let e = z.value, t = L.value;
			if (!e || !e.length) return t;
			let n = /* @__PURE__ */ new Map();
			e.forEach((e, t) => n.set(e, t));
			let r = [], i = [];
			for (let e of t) {
				let t = x(e);
				n.has(t) ? r.push(e) : i.push(e);
			}
			return r.sort((e, t) => (n.get(x(e)) ?? 0) - (n.get(x(t)) ?? 0)), [...r, ...i];
		}), V = N(1), U = N(10);
		G(() => a.pagination, (e) => {
			e && typeof e == "object" && (e.page !== void 0 && (V.value = e.page), e.pageSize !== void 0 && (U.value = e.pageSize));
		}, {
			immediate: !0,
			deep: !0
		});
		let W = i(() => {
			if (!a.pagination) return null;
			let e = typeof a.pagination == "object" ? a.pagination : {};
			return {
				page: V.value,
				pageSize: U.value,
				total: e.total ?? a.data.length
			};
		}), te = i(() => {
			let e = W.value;
			return e ? Math.max(1, Math.ceil(e.total / Math.max(1, e.pageSize))) : 1;
		}), J = i(() => {
			let e = W.value;
			if (!e) return B.value;
			let t = (e.page - 1) * e.pageSize;
			return B.value.slice(t, t + e.pageSize);
		});
		G(te, (e) => {
			V.value > e && ne(e);
		});
		function ne(e) {
			let t = Math.min(Math.max(1, e), te.value);
			V.value = t, (a.pagination && typeof a.pagination == "object" ? a.pagination : null)?.onChange?.(t, U.value), u("update:page", t), u("page-change", t, U.value);
		}
		function re(e) {
			U.value = e, V.value = 1, (a.pagination && typeof a.pagination == "object" ? a.pagination : null)?.onChange?.(1, e), u("update:pageSize", e), u("update:page", 1), u("page-change", 1, e);
		}
		function ie(e) {
			let t = e.target, n = Number(t?.value);
			Number.isFinite(n) && re(n);
		}
		let Y = [
			10,
			20,
			50,
			100
		], ae = i(() => {
			let e = [...Y];
			return e.includes(U.value) || e.push(U.value), e.sort((e, t) => e - t);
		}), oe = i(() => {
			let e = te.value, t = V.value, n = [], r = 0;
			for (let i = 1; i <= e; i += 1) (i === 1 || i === e || Math.abs(i - t) <= 1) && (r && i - r > 1 && n.push("…"), n.push(i), r = i);
			return n;
		}), se = i(() => a.virtual ? typeof a.virtual == "object" ? a.virtual : {} : null), ce = i(() => se.value !== null), le = i(() => Math.max(24, se.value?.rowHeight ?? 44)), ue = i(() => Math.max(0, se.value?.overscan ?? 6)), de = N(null), fe = N(null), pe = N(0), me = N(0), he = N(0);
		function ge() {
			let e = de.value;
			e && (pe.value = e.scrollTop);
		}
		function _e() {
			let e = de.value;
			e && (me.value = e.clientHeight, he.value = fe.value?.offsetHeight ?? 0);
		}
		O(() => {
			_e(), typeof window < "u" && window.addEventListener("resize", _e);
		}), E(() => {
			typeof window < "u" && window.removeEventListener("resize", _e);
		}), G(ce, (e) => {
			e ? S(() => {
				_e();
				let e = de.value;
				e && (e.scrollTop = 0);
			}) : pe.value = 0;
		}), G(V, () => {
			pe.value = 0;
			let e = de.value;
			e && (e.scrollTop = 0);
		});
		let X = i(() => {
			let e = J.value.length, t = le.value, n = ue.value, r = Math.ceil((me.value || t * 8) / t) + 1, i = Math.max(0, pe.value - he.value), a = Math.min(Math.max(0, Math.floor(i / t) - n), Math.max(0, e - 1)), o = Math.min(e, a + r + n * 2);
			return {
				total: e,
				start: a,
				end: o,
				padTop: a * t,
				padBottom: Math.max(0, (e - o) * t),
				height: t
			};
		}), ve = N(null), ye = N(null), be = N("before"), xe = /* @__PURE__ */ new Map(), Se = /* @__PURE__ */ new Map();
		function Ce(e) {
			let t = Se.get(e);
			return t || (t = (t) => {
				t ? xe.set(e, t) : xe.delete(e);
			}, Se.set(e, t)), t;
		}
		function we() {
			ve.value = null, ye.value = null, be.value = "before";
		}
		function Te(e, t) {
			a.rowDraggable && (ve.value = e, t.dataTransfer && (t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/plain", String(e))));
		}
		function Ee(e) {
			let t = e.currentTarget;
			if (!t) return "before";
			let n = t.getBoundingClientRect();
			return e.clientY < n.top + n.height / 2 ? "before" : "after";
		}
		function De(e, t) {
			ve.value !== null && ve.value !== e && (t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), ye.value = e, be.value = Ee(t));
		}
		function Oe(e, t) {
			if (ve.value === null) return;
			t.preventDefault();
			let n = ve.value, r = Ee(t);
			we();
			let i = r === "before" ? e : e + 1;
			n < i && --i, i !== n && Ae(n, i);
		}
		function ke() {
			we();
		}
		function Ae(e, t) {
			let n = J.value;
			if (e === t || e < 0 || t < 0 || e >= n.length || t >= n.length) return;
			let r = B.value.map(x), i = W.value ? (W.value.page - 1) * W.value.pageSize : 0, a = r.slice(i, i + n.length);
			if (a.length <= 1) return;
			let o = a.splice(e, 1)[0];
			if (o === void 0) return;
			a.splice(t, 0, o);
			let s = [...r];
			s.splice(i, a.length, ...a), z.value = s, u("row-reorder", e, t, n);
		}
		function je(e, t, n) {
			if (!a.rowDraggable || !n.altKey || n.key !== "ArrowUp" && n.key !== "ArrowDown") return;
			n.preventDefault();
			let r = n.key === "ArrowUp" ? e - 1 : e + 1;
			r < 0 || r >= J.value.length || (Ae(e, r), S(() => {
				xe.get(t)?.focus();
			}));
		}
		let Me = N([]), Ne = i(() => a.selectedKeys ?? Me.value);
		function Pe(e) {
			Me.value = e, u("update:selectedKeys", e), u("selection-change", e);
		}
		let Fe = i(() => J.value.map((e) => x(e))), Ie = i(() => Fe.value.length > 0 && Fe.value.every((e) => Ne.value.includes(e))), Le = i(() => Fe.value.some((e) => Ne.value.includes(e))), Re = i(() => Le.value && !Ie.value);
		function ze(e) {
			return Ne.value.includes(e);
		}
		function Be(e) {
			Pe(Ne.value.includes(e) ? Ne.value.filter((t) => t !== e) : [...Ne.value, e]);
		}
		function Ve() {
			Ie.value ? Pe(Ne.value.filter((e) => !Fe.value.includes(e))) : Pe(Array.from(/* @__PURE__ */ new Set([...Ne.value, ...Fe.value])));
		}
		let He = N([]), Ue = i(() => a.expandedKeys ?? He.value);
		function We(e) {
			return typeof a.expandable == "function" ? !!a.expandable(e) : a.expandable ? Array.isArray(e?.children) ? e.children.length > 0 : e?.expandable === !0 : !1;
		}
		let Ge = i(() => a.data.filter(We).map((e) => x(e))), Ke = i(() => !!a.expandable && !ce.value), qe = !1;
		G(() => a.data, () => {
			qe || a.expandedKeys || a.data.length && (qe = !0, He.value = Array.from(new Set(a.defaultExpandAll ? Ge.value : a.defaultExpandedKeys ?? [])));
		}, { immediate: !0 });
		function Je(e) {
			return Ue.value.includes(e);
		}
		function Ye(e) {
			let t = !Je(e), n = t ? [...Ue.value, e] : Ue.value.filter((t) => t !== e);
			He.value = n, u("update:expandedKeys", n), u("expand-change", e, t);
		}
		let Xe = N([]);
		function Ze() {
			let e = [...a.defaultHiddenColumns ?? []];
			for (let t of a.columns) t.hidden && !e.includes(t.key) && e.push(t.key);
			return e;
		}
		let Qe = !1;
		G(() => a.columns, () => {
			Qe || (Qe = !0, Xe.value = Ze());
		}, {
			immediate: !0,
			deep: !0
		});
		let $e = i(() => a.hiddenColumns ?? Xe.value), et = i(() => a.columns.map((e, t) => ({
			col: e,
			ci: t
		})).filter(({ col: e }) => !$e.value.includes(e.key)));
		function tt(e) {
			return $e.value.includes(e.key);
		}
		function nt(e) {
			if (e.hideable === !1) return;
			let t = $e.value.includes(e.key) ? $e.value.filter((t) => t !== e.key) : [...$e.value, e.key];
			Xe.value = t, u("update:hiddenColumns", t);
		}
		function rt() {
			let e = Ze();
			Xe.value = e, u("update:hiddenColumns", e);
		}
		let it = N(!1), at = N(null), ot = N(null);
		Sc(at, () => {
			it.value = !1;
		}, { ignore: [ot] });
		let st = i(() => {
			let e = [];
			for (let t of et.value) {
				let n = a.columnGroups?.some((e) => (e.columns ?? []).includes(t.col.key)), r = t.col.group && n ? t.col.group : void 0, i = e[e.length - 1];
				if (r) {
					if (i && i.type === "group" && i.title === r) i.cols.push(t);
					else {
						let n = a.columnGroups?.find((e) => e.title === r);
						e.push({
							type: "group",
							title: r,
							align: n?.align,
							cols: [t]
						});
					}
				} else e.push({
					type: "solo",
					cols: [t]
				});
			}
			return {
				runs: e,
				hasGroups: e.some((e) => e.type === "group")
			};
		});
		G([st, et], () => S(_e));
		let ct = N({}), lt = N(null);
		function ut(e) {
			let t = ct.value[e.key];
			if (t !== void 0) return t;
			if (typeof e.width == "number") return e.width;
			if (typeof e.width == "string") {
				let t = parseFloat(e.width);
				return Number.isFinite(t) ? t : void 0;
			}
		}
		function dt(e) {
			return ut(e) ?? Fl;
		}
		function ft(e) {
			let t = ut(e);
			if (t !== void 0) return { width: `${t}px` };
		}
		let pt = i(() => et.value.map(({ col: e }) => ft(e))), mt = i(() => et.value.some(({ col: e }) => !!e.fixed)), ht = i(() => {
			let e = 0;
			return a.rowDraggable && (e += Il), a.selection && (e += Ll), Ke.value && (e += Rl), e;
		}), gt = i(() => ({
			left: "0px",
			width: `${Il}px`,
			minWidth: `${Il}px`
		})), _t = i(() => ({
			left: a.rowDraggable ? `${Il}px` : "0px",
			width: `${Ll}px`,
			minWidth: `${Ll}px`
		})), vt = i(() => ({
			left: `${ht.value - Rl}px`,
			width: `${Rl}px`,
			minWidth: `${Rl}px`
		})), yt = i(() => {
			let e = /* @__PURE__ */ new Map(), t = ht.value, n = et.value.filter(({ col: e }) => e.fixed === "right"), r = n.reduce((e, { col: t }) => e + dt(t), 0), i = 0, a = /* @__PURE__ */ new Map();
			n.forEach(({ col: e }) => {
				i += dt(e), a.set(e.key, r - i);
			});
			for (let { col: n } of et.value) {
				let r = {}, i = ut(n);
				i !== void 0 && (r.width = `${i}px`, r.minWidth = `${i}px`), n.fixed === "left" ? (r.left = `${t}px`, t += dt(n)) : n.fixed === "right" && (r.right = `${a.get(n.key) ?? 0}px`), e.set(n.key, r);
			}
			return e;
		});
		function bt(e, t) {
			if (!a.resizable) return;
			t.preventDefault(), t.stopPropagation();
			let n = t.clientX, r = ut(e) ?? Fl, i = e.minWidth ?? 72, o = e.maxWidth ?? 720;
			lt.value = e.key;
			let s = (t) => {
				let a = Math.min(Math.max(r + (t.clientX - n), i), o);
				ct.value = {
					...ct.value,
					[e.key]: Math.round(a)
				};
			}, c = () => {
				lt.value = null, window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", c), u("column-resize", e.key, ct.value[e.key] ?? r);
			};
			window.addEventListener("pointermove", s), window.addEventListener("pointerup", c);
		}
		let xt = i(() => et.value.length + +!!a.rowDraggable + +!!a.selection + +!!Ke.value);
		function St(e) {
			return (e.key ? [e.key, ...e.slots ?? []] : [...e.slots ?? []]).find((e) => !!p[e]);
		}
		let Ct = i(() => {
			let e = W.value ? (W.value.page - 1) * W.value.pageSize : 0, t = ce.value ? X.value : null, n = t ? J.value.slice(t.start, t.end) : J.value, r = t ? t.start : 0;
			return n.map((t, n) => ({
				row: t,
				index: e + r + n,
				viewIndex: r + n,
				key: x(t),
				cells: et.value.map(({ col: e }) => ({
					col: e,
					slotName: St(e),
					value: t?.[e.key]
				}))
			}));
		}), wt = i(() => {
			if (!a.summary) return null;
			if (typeof a.summary == "object") return a.summary;
			let e = {};
			for (let t of a.columns) t.summary && (e[t.key] = t.summary);
			return Object.keys(e).length ? { columns: e } : null;
		}), Tt = i(() => a.summaryScope === "page" ? J.value : B.value);
		function Et(e, t = 0) {
			if (!Number.isFinite(e)) return "—";
			try {
				return new Intl.NumberFormat("en-US", {
					minimumFractionDigits: 0,
					maximumFractionDigits: t
				}).format(e);
			} catch {
				return e.toFixed(t);
			}
		}
		function Dt(e) {
			let t = wt.value?.columns?.[e.key];
			if (!t) return "";
			let n = Tt.value;
			if (typeof t == "function") return String(t(n));
			let r = n.map((t) => Number(t?.[e.key])).filter((e) => Number.isFinite(e));
			switch (t) {
				case "count": return Et(n.length);
				case "sum": return Et(r.reduce((e, t) => e + t, 0));
				case "avg": return r.length ? Et(r.reduce((e, t) => e + t, 0) / r.length, 2) : "—";
				case "min": return r.length ? Et(Math.min(...r)) : "—";
				case "max": return r.length ? Et(Math.max(...r)) : "—";
				default: return "";
			}
		}
		let Ot = i(() => a.batchActions && a.selection && Ne.value.length > 0), kt = i(() => a.empty || m.value.table.empty), At = i(() => a.batchLabel ? g(a.batchLabel, { count: Ne.value.length }) : g(h.value.selected, { count: Ne.value.length }));
		function jt() {
			Pe([]);
		}
		let Mt = i(() => Z("mc-data-table", "mc-grain-overlay", `mc-data-table--${a.size}`, {
			"is-striped": a.stripe,
			"is-bordered": a.bordered,
			"is-loading": a.loading,
			"is-batching": Ot.value,
			"has-toolbar": a.columnVisibility,
			"is-virtual": ce.value,
			"is-draggable": a.rowDraggable
		}, a.customClass)), Nt = i(() => {
			if (a.maxHeight !== void 0) return { maxHeight: typeof a.maxHeight == "number" ? `${a.maxHeight}px` : a.maxHeight };
			if (ce.value) return { maxHeight: `${Pl}px` };
		}), Pt = i(() => ce.value ? { "--mc-dt-vrow-h": `${X.value.height}px` } : void 0);
		return (r, i) => (A(), c("div", { class: C(Mt.value) }, [
			t.columnVisibility ? (A(), c("div", Cc, [
				l("div", wc, [l("span", Tc, R(h.value.columns), 1)]),
				l("div", Ec, [l("button", {
					ref_key: "columnButtonRef",
					ref: ot,
					type: "button",
					class: "mc-data-table__tool-btn",
					"aria-expanded": it.value,
					"aria-haspopup": "true",
					onClick: i[0] || (i[0] = (e) => it.value = !it.value)
				}, [f($, {
					name: "columns",
					size: 15,
					"stroke-width": 2
				}), l("span", null, R(h.value.columns), 1)], 8, Dc)]),
				it.value ? (A(), c("div", {
					key: 0,
					ref_key: "columnMenuRef",
					ref: at,
					class: "mc-data-table__column-menu"
				}, [
					l("p", Oc, R(h.value.visibleColumns), 1),
					(A(!0), c(e, null, P(t.columns, (e) => (A(), c("label", {
						key: e.key,
						class: C(["mc-data-table__column-item", {
							"is-hidden": tt(e),
							"is-locked": e.hideable === !1
						}])
					}, [l("input", {
						class: "mc-data-table__column-check",
						type: "checkbox",
						checked: !tt(e),
						disabled: e.hideable === !1,
						onChange: (t) => nt(e)
					}, null, 40, kc), l("span", Ac, R(e.title ?? e.key), 1)], 2))), 128)),
					l("button", {
						type: "button",
						class: "mc-data-table__column-reset",
						onClick: rt
					}, R(h.value.reset), 1)
				], 512)) : s("", !0)
			])) : s("", !0),
			l("div", {
				ref_key: "viewportRef",
				ref: de,
				class: "mc-data-table__viewport mc-scroll",
				style: T(Nt.value),
				onScrollPassive: ge
			}, [l("table", {
				class: C(["mc-data-table__table", { "is-fixed-layout": mt.value }]),
				style: T(Pt.value)
			}, [
				l("colgroup", null, [
					t.rowDraggable ? (A(), c("col", {
						key: 0,
						style: T({ width: `${Il}px` })
					}, null, 4)) : s("", !0),
					t.selection ? (A(), c("col", {
						key: 1,
						style: T({ width: `${Ll}px` })
					}, null, 4)) : s("", !0),
					Ke.value ? (A(), c("col", {
						key: 2,
						style: T({ width: `${Rl}px` })
					}, null, 4)) : s("", !0),
					(A(!0), c(e, null, P(pt.value, (e, t) => (A(), c("col", {
						key: et.value[t]?.col.key ?? t,
						style: T(e)
					}, null, 4))), 128))
				]),
				l("thead", {
					ref_key: "headRef",
					ref: fe,
					class: "mc-data-table__head"
				}, [st.value.hasGroups ? (A(), c("tr", jc, [
					t.rowDraggable ? (A(), c("th", {
						key: 0,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(gt.value)
					}, [l("span", Mc, R(h.value.dragColumn), 1)], 4)) : s("", !0),
					t.selection ? (A(), c("th", {
						key: 1,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(_t.value)
					}, [l("span", Nc, [l("input", {
						class: C(["mc-data-table__checkbox-input", { "is-indeterminate": Re.value }]),
						type: "checkbox",
						checked: Ie.value,
						".indeterminate": Re.value,
						"aria-label": h.value.selectAll,
						onChange: Ve
					}, null, 42, Pc)])], 4)) : s("", !0),
					Ke.value ? (A(), c("th", {
						key: 2,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(vt.value)
					}, [l("span", Fc, R(h.value.expand), 1)], 4)) : s("", !0),
					(A(!0), c(e, null, P(st.value.runs, (e) => (A(), c("th", {
						key: e.type === "group" ? `g-${e.title}` : `s-${e.cols[0]?.col.key}`,
						scope: "colgroup",
						colspan: e.type === "group" ? e.cols.length : 1,
						class: C(["mc-data-table__th mc-data-table__th--group", [e.type === "group" ? `is-align-${e.align ?? "center"}` : "is-align-center", { "is-spacer": e.type === "solo" }]])
					}, [e.type === "group" ? (A(), c("span", Lc, R(e.title), 1)) : s("", !0)], 10, Ic))), 128))
				])) : s("", !0), l("tr", { class: C(["mc-data-table__head-row", { "is-grouped": st.value.hasGroups }]) }, [
					t.rowDraggable && !st.value.hasGroups ? (A(), c("th", {
						key: 0,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(gt.value)
					}, [l("span", Rc, R(h.value.dragColumn), 1)], 4)) : s("", !0),
					t.selection && !st.value.hasGroups ? (A(), c("th", {
						key: 1,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(_t.value)
					}, [l("span", zc, [l("input", {
						class: C(["mc-data-table__checkbox-input", { "is-indeterminate": Re.value }]),
						type: "checkbox",
						checked: Ie.value,
						".indeterminate": Re.value,
						"aria-label": h.value.selectAll,
						onChange: Ve
					}, null, 42, Bc)])], 4)) : s("", !0),
					Ke.value && !st.value.hasGroups ? (A(), c("th", {
						key: 2,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: T(vt.value)
					}, [l("span", Vc, R(h.value.expand), 1)], 4)) : s("", !0),
					(A(!0), c(e, null, P(et.value, ({ col: e }) => (A(), c("th", {
						key: e.key,
						scope: "col",
						class: C(["mc-data-table__th mc-sheen-sweep", {
							"is-sortable": !!e.sortable,
							"is-sorted": M(e).order !== null,
							"is-fixed": !!e.fixed,
							"is-fixed-left": e.fixed === "left",
							"is-fixed-right": e.fixed === "right"
						}]),
						style: T(yt.value.get(e.key)),
						"aria-sort": e.sortable ? M(e).order === "asc" ? "ascending" : M(e).order === "desc" ? "descending" : "none" : void 0
					}, [e.header ? (A(), o(v, {
						key: 0,
						render: e.header,
						column: e
					}, null, 8, ["render", "column"])) : e.sortable ? (A(), c("button", {
						key: 1,
						type: "button",
						class: "mc-data-table__sort-btn",
						"aria-label": `Sort by ${e.title ?? e.key}`,
						onClick: (t) => I(e)
					}, [
						l("span", Wc, R(e.title ?? e.key), 1),
						l("span", {
							class: C(["mc-data-table__sort", {
								"is-asc": M(e).order === "asc",
								"is-desc": M(e).order === "desc"
							}]),
							"aria-hidden": "true"
						}, [f($, {
							name: "chevron-up",
							size: 14,
							"stroke-width": 2.4
						})], 2),
						t.multiSort && M(e).priority > 0 ? (A(), c("span", Gc, R(M(e).priority), 1)) : s("", !0)
					], 8, Uc)) : (A(), c("span", Kc, R(e.title ?? e.key), 1)), t.resizable ? (A(), c("span", {
						key: 3,
						class: C(["mc-data-table__resize", { "is-active": lt.value === e.key }]),
						role: "separator",
						"aria-orientation": "vertical",
						"aria-label": `Resize ${e.title ?? e.key}`,
						onPointerdown: (t) => bt(e, t)
					}, null, 42, qc)) : s("", !0)], 14, Hc))), 128))
				], 2)], 512),
				l("tbody", Jc, [
					ce.value && X.value.padTop > 0 ? (A(), c("tr", Yc, [l("td", {
						class: "mc-data-table__spacer-cell",
						style: T({ height: `${X.value.padTop}px` }),
						colspan: xt.value
					}, null, 12, Xc)])) : s("", !0),
					(A(!0), c(e, null, P(Ct.value, (n) => (A(), c(e, { key: n.key }, [l("tr", {
						class: C(["mc-data-table__row", {
							"is-selected": t.selection && ze(n.key),
							"is-stripe": n.viewIndex % 2 == 1,
							"is-dragging": ve.value === n.viewIndex,
							"is-drop-before": ye.value === n.viewIndex && be.value === "before",
							"is-drop-after": ye.value === n.viewIndex && be.value === "after"
						}]),
						style: T({ "--i": n.index }),
						tabindex: "0",
						role: "button",
						onClick: (e) => u("row-click", n.row, n.index),
						onKeydown: [K(q((e) => u("row-click", n.row, n.index), ["prevent"]), ["enter"]), K(q((e) => u("row-click", n.row, n.index), ["prevent"]), ["space"])],
						onDragover: (e) => De(n.viewIndex, e),
						onDrop: (e) => Oe(n.viewIndex, e)
					}, [
						t.rowDraggable ? (A(), c("td", {
							key: 0,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: T(gt.value)
						}, [l("button", {
							ref_for: !0,
							ref: Ce(n.key),
							type: "button",
							class: "mc-data-table__drag",
							draggable: "true",
							"aria-label": g(h.value.dragRow, { index: n.viewIndex + 1 }),
							onClick: i[1] || (i[1] = q(() => {}, ["stop"])),
							onKeydown: (e) => je(n.viewIndex, n.key, e),
							onDragstart: (e) => Te(n.viewIndex, e),
							onDragend: ke
						}, [f($, {
							name: "grip",
							size: 14,
							"stroke-width": 2
						})], 40, Qc)], 4)) : s("", !0),
						t.selection ? (A(), c("td", {
							key: 1,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: T(_t.value)
						}, [l("span", $c, [l("input", {
							class: "mc-data-table__checkbox-input",
							type: "checkbox",
							checked: ze(n.key),
							"aria-label": g(h.value.selectRow, { index: n.index + 1 }),
							onClick: i[2] || (i[2] = q(() => {}, ["stop"])),
							onChange: (e) => Be(n.key)
						}, null, 40, el)])], 4)) : s("", !0),
						Ke.value ? (A(), c("td", {
							key: 2,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: T(vt.value)
						}, [We(n.row) ? (A(), c("button", {
							key: 0,
							type: "button",
							class: C(["mc-data-table__expand-btn", { "is-open": Je(n.key) }]),
							"aria-expanded": Je(n.key),
							"aria-label": Je(n.key) ? h.value.collapse : h.value.expand,
							onClick: q((e) => Ye(n.key), ["stop"])
						}, [f($, {
							name: "chevron-right",
							size: 15,
							"stroke-width": 2.2
						})], 10, tl)) : s("", !0)], 4)) : s("", !0),
						(A(!0), c(e, null, P(n.cells, (t) => (A(), c("td", {
							key: t.col.key,
							class: C(["mc-data-table__cell", [`is-align-${t.col.align ?? "left"}`, {
								"is-fixed": !!t.col.fixed,
								"is-fixed-left": t.col.fixed === "left",
								"is-fixed-right": t.col.fixed === "right"
							}]]),
							style: T(yt.value.get(t.col.key))
						}, [ce.value ? (A(), c("div", nl, [F(r.$slots, t.slotName ?? "__mc_data_table_default__", {
							row: n.row,
							index: n.index,
							value: t.value
						}, () => [t.col.render ? (A(), o(_, {
							key: 0,
							render: t.col.render,
							row: n.row,
							index: n.index
						}, null, 8, [
							"render",
							"row",
							"index"
						])) : (A(), c(e, { key: 1 }, [d(R(t.value), 1)], 64))], !0)])) : F(r.$slots, t.slotName ?? "__mc_data_table_default__", {
							row: n.row,
							index: n.index,
							value: t.value
						}, () => [t.col.render ? (A(), o(_, {
							key: 0,
							render: t.col.render,
							row: n.row,
							index: n.index
						}, null, 8, [
							"render",
							"row",
							"index"
						])) : (A(), c(e, { key: 1 }, [d(R(t.value), 1)], 64))], !0, 1)], 6))), 128))
					], 46, Zc), Ke.value && We(n.row) ? (A(), c("tr", rl, [l("td", {
						colspan: xt.value,
						class: "mc-data-table__expand-cell"
					}, [l("div", { class: C(["mc-data-table__expand", { "is-open": Je(n.key) }]) }, [l("div", al, [F(r.$slots, "expand", {
						row: n.row,
						index: n.index
					}, () => [l("pre", ol, R(JSON.stringify(n.row, null, 2)), 1)], !0)])], 2)], 8, il)])) : s("", !0)], 64))), 128)),
					ce.value && X.value.padBottom > 0 ? (A(), c("tr", sl, [l("td", {
						class: "mc-data-table__spacer-cell",
						style: T({ height: `${X.value.padBottom}px` }),
						colspan: xt.value
					}, null, 12, cl)])) : s("", !0),
					Ct.value.length ? s("", !0) : (A(), c("tr", ll, [l("td", {
						class: "mc-data-table__empty mc-aurora-inset",
						colspan: xt.value,
						role: "status"
					}, [
						l("span", dl, [f($, {
							name: "box",
							size: 28,
							"stroke-width": 1.6
						})]),
						l("span", fl, R(kt.value), 1),
						F(r.$slots, "empty", {}, void 0, !0)
					], 8, ul)]))
				]),
				wt.value ? (A(), c("tfoot", pl, [l("tr", ml, [
					t.rowDraggable ? (A(), c("td", {
						key: 0,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: T(gt.value)
					}, null, 4)) : s("", !0),
					t.selection ? (A(), c("td", {
						key: 1,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: T(_t.value)
					}, null, 4)) : s("", !0),
					Ke.value ? (A(), c("td", {
						key: 2,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: T(vt.value)
					}, null, 4)) : s("", !0),
					(A(!0), c(e, null, P(et.value, ({ col: e }, t) => (A(), c("td", {
						key: `foot-${e.key}`,
						class: C(["mc-data-table__cell mc-data-table__foot-cell", `is-align-${e.align ?? "left"}`]),
						style: T(yt.value.get(e.key))
					}, [t === 0 && wt.value.label ? (A(), c("span", hl, R(wt.value.label), 1)) : (A(), c("span", gl, R(Dt(e)), 1))], 6))), 128))
				])])) : s("", !0)
			], 6)], 36),
			t.loading ? (A(), c("div", _l, [i[5] || (i[5] = l("span", {
				class: "mc-data-table__spinner",
				"aria-hidden": "true"
			}, [l("svg", {
				viewBox: "0 0 24 24",
				width: "26",
				height: "26"
			}, [l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})])], -1)), l("span", vl, R(h.value.loading), 1)])) : s("", !0),
			W.value ? (A(), c("footer", yl, [
				l("span", bl, R(g(h.value.total, { count: W.value.total })), 1),
				l("nav", {
					class: "mc-data-table__pager",
					"aria-label": h.value.pager
				}, [
					l("button", {
						type: "button",
						class: "mc-data-table__page-btn",
						disabled: V.value <= 1,
						"aria-label": h.value.previous,
						onClick: i[3] || (i[3] = (e) => ne(V.value - 1))
					}, [f($, {
						name: "chevron-left",
						size: 15,
						"stroke-width": 2.2
					})], 8, Sl),
					(A(!0), c(e, null, P(oe.value, (t, n) => (A(), c(e, { key: `${t}-${n}` }, [typeof t == "number" ? (A(), c("button", {
						key: 1,
						type: "button",
						class: C(["mc-data-table__page-btn", { "is-active": t === V.value }]),
						"aria-current": t === V.value ? "page" : void 0,
						onClick: (e) => ne(t)
					}, R(t), 11, wl)) : (A(), c("span", Cl, "…"))], 64))), 128)),
					l("button", {
						type: "button",
						class: "mc-data-table__page-btn",
						disabled: V.value >= te.value,
						"aria-label": h.value.next,
						onClick: i[4] || (i[4] = (e) => ne(V.value + 1))
					}, [f($, {
						name: "chevron-right",
						size: 15,
						"stroke-width": 2.2
					})], 8, Tl)
				], 8, xl),
				l("label", El, [l("span", Dl, R(g(h.value.rowsPerPage, { count: U.value })), 1), l("select", {
					class: "mc-data-table__select",
					value: U.value,
					onChange: ie
				}, [(A(!0), c(e, null, P(ae.value, (e) => (A(), c("option", {
					key: e,
					value: e
				}, R(g(h.value.rowsPerPage, { count: e })), 9, kl))), 128))], 40, Ol)])
			])) : s("", !0),
			f(n, { name: "mc-dt-batch" }, {
				default: ee(() => [Ot.value ? (A(), c("div", Al, [
					l("span", jl, R(At.value), 1),
					l("span", Ml, [F(r.$slots, "batch-actions", {
						keys: Ne.value,
						clear: jt
					}, void 0, !0)]),
					l("button", {
						type: "button",
						class: "mc-data-table__batch-clear",
						"aria-label": h.value.clearSelection,
						onClick: jt
					}, [f($, {
						name: "close",
						size: 14,
						"stroke-width": 2.4
					})], 8, Nl)
				])) : s("", !0)]),
				_: 3
			})
		], 2));
	}
}), [["__scopeId", "data-v-15844ea2"]]), Bl = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], Vl = { class: "mc-date-picker__affix" }, Hl = ["aria-label"], Ul = ["id", "aria-label"], Wl = { class: "mc-date-picker__body" }, Gl = {
	key: 0,
	class: "mc-date-picker__shortcuts"
}, Kl = ["onClick"], ql = { class: "mc-date-picker__calendar" }, Jl = { class: "mc-date-picker__header" }, Yl = ["aria-label"], Xl = ["aria-label"], Zl = ["aria-label"], Ql = ["aria-label"], $l = ["aria-label"], eu = ["aria-label"], tu = ["aria-label"], nu = {
	key: "day",
	class: "mc-date-picker__day-view"
}, ru = { class: "mc-date-picker__weekdays" }, iu = { class: "mc-date-picker__cells" }, au = [
	"disabled",
	"aria-pressed",
	"aria-current",
	"onClick"
], ou = { class: "mc-date-picker__cell-text" }, su = {
	key: "month",
	class: "mc-date-picker__month-view"
}, cu = ["onClick"], lu = {
	key: "year",
	class: "mc-date-picker__year-view"
}, uu = ["onClick"], du = {
	key: 0,
	class: "mc-date-picker__time"
}, fu = ["aria-label"], pu = ["aria-label"], mu = { class: "mc-date-picker__footer" }, hu = { class: "mc-date-picker__summary" }, gu = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDatePicker",
	__name: "DatePicker",
	props: {
		modelValue: { default: null },
		type: { default: "date" },
		format: { default: void 0 },
		valueFormat: { default: void 0 },
		placeholder: { default: "Pick a date…" },
		disabledDate: {
			type: Function,
			default: void 0
		},
		shortcuts: { default: () => [] },
		size: { default: "medium" },
		variant: { default: "soft" },
		clearable: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, p = a, m = Zt(), h = Fi("mc-date-picker"), g = An(), _ = N(null), v = N(null), y = N(u.open), { style: b, transformOrigin: w, update: D, startAutoUpdate: k, stopAutoUpdate: j } = _n(_, v, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: y })
		}), M = N("day"), F = N((/* @__PURE__ */ new Date()).getFullYear()), I = N((/* @__PURE__ */ new Date()).getMonth()), L = N(Math.floor((/* @__PURE__ */ new Date()).getFullYear() / 12) * 12), z = N(0), V = N(0);
		G(() => u.open, (e) => {
			y.value = e, e ? (X(), S(() => {
				D(), k();
			})) : j();
		});
		let H = i(() => u.type === "dateRange" || u.type === "datetimeRange"), W = i(() => u.type === "datetime" || u.type === "datetimeRange"), K = i(() => u.type === "datetime" || u.type === "datetimeRange" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"), J = i(() => u.format ?? K.value), ne = [
			"Su",
			"Mo",
			"Tu",
			"We",
			"Th",
			"Fr",
			"Sa"
		], re = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		function ie(e) {
			if (e == null || e === "") return null;
			if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? null : t;
		}
		function Y(e, t) {
			return !e || !t ? !1 : e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
		}
		function ae(e) {
			return new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds());
		}
		let oe = i(() => {
			if (!H.value) return [];
			let e = u.modelValue;
			return Array.isArray(e) ? e.map(ie).filter((e) => !!e) : [];
		}), se = i(() => H.value ? null : ie(u.modelValue)), ce = i(() => H.value ? oe.value.length > 0 : !!se.value), le = i(() => {
			if (H.value) {
				let [e, t] = oe.value;
				return e ? t ? `${Nt(e, J.value)}  ~  ${Nt(t, J.value)}` : Nt(e, J.value) : "";
			}
			let e = se.value;
			return e ? Nt(e, J.value) : "";
		});
		i(() => new Date(F.value, I.value, 1));
		let ue = i(() => `${re[I.value]} ${F.value}`), de = i(() => {
			let e = new Date(F.value, I.value, 1).getDay(), t = new Date(F.value, I.value, 1 - e), n = [];
			for (let e = 0; e < 42; e += 1) n.push(new Date(t.getFullYear(), t.getMonth(), t.getDate() + e));
			return n;
		}), fe = i(() => {
			let e = [];
			for (let t = 0; t < 12; t += 1) e.push(L.value + t);
			return e;
		}), pe = /* @__PURE__ */ new Date();
		function me(e) {
			if (!u.disabledDate) return !1;
			try {
				return !!u.disabledDate(ae(e));
			} catch {
				return !1;
			}
		}
		let he = N(null), ge = N(null), _e = N(null);
		function X() {
			let [e, t] = oe.value;
			he.value = e ? ae(e) : null, ge.value = t ? ae(t) : null, _e.value = se.value ? ae(se.value) : null;
			let n = e ?? se.value ?? /* @__PURE__ */ new Date();
			z.value = n.getHours(), V.value = n.getMinutes(), F.value = n.getFullYear(), I.value = n.getMonth();
		}
		function ve(e) {
			u.disabled && e || y.value !== e && (y.value = e, p("update:open", e), e ? (p("open"), X(), M.value = "day", S(() => {
				D(), k();
			})) : (p("close"), j()));
		}
		function ye() {
			ve(!y.value);
		}
		function be(e) {
			if (!y.value) return;
			let t = e.target;
			t && (_.value?.contains(t) || v.value?.contains(t) || ve(!1));
		}
		O(() => document.addEventListener("mousedown", be)), E(() => {
			document.removeEventListener("mousedown", be), j();
		});
		function xe(e) {
			let t = new Date(F.value, I.value + e, 1);
			F.value = t.getFullYear(), I.value = t.getMonth();
		}
		function Se(e) {
			F.value += e;
		}
		function Ce(e) {
			L.value += e * 12;
		}
		function we(e) {
			M.value = e;
		}
		function Te(e) {
			let t = ae(e);
			return t.setHours(z.value, V.value, 0, 0), t;
		}
		function Ee(e) {
			if (!me(e)) {
				if (H.value) {
					if (!he.value || he.value && ge.value) {
						he.value = ae(e), ge.value = null;
						return;
					}
					let t = he.value, n = e.getTime() < t.getTime() ? t : e, r = e.getTime() < t.getTime() ? e : t;
					he.value = ae(r), ge.value = Te(n), W.value || Ae();
				} else _e.value = Te(e), W.value || ke();
			}
		}
		function De(e) {
			I.value = e, M.value = "day";
		}
		function Oe(e) {
			F.value = e, M.value = "month";
		}
		function ke() {
			let e = _e.value;
			if (!e) return;
			let t = u.valueFormat ? Nt(e, u.valueFormat) : e;
			p("update:modelValue", t), p("change", t), ve(!1);
		}
		function Ae() {
			let e = he.value, t = ge.value;
			if (!e || !t) return;
			let n = u.valueFormat ? [Nt(e, u.valueFormat), Nt(t, u.valueFormat)] : [ae(e), ae(t)];
			p("update:modelValue", n), p("change", n), ve(!1);
		}
		function je() {
			let e = /* @__PURE__ */ new Date();
			z.value = e.getHours(), V.value = e.getMinutes(), H.value ? (he.value = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0), ge.value = Te(e), _e.value = ae(e)) : (_e.value = Te(e), F.value = e.getFullYear(), I.value = e.getMonth());
		}
		function Me() {
			H.value ? Ae() : ke();
		}
		function Ne() {
			p("update:modelValue", null), p("change", null);
		}
		function Pe(e) {
			if (Array.isArray(e.value)) {
				let [t, n] = e.value.map(ie);
				he.value = t ? ae(t) : null, ge.value = n ? ae(n) : null, t && (F.value = t.getFullYear(), I.value = t.getMonth()), n && (z.value = n.getHours(), V.value = n.getMinutes());
			} else {
				let t = ie(e.value);
				if (!t) return;
				_e.value = ae(t), z.value = t.getHours(), V.value = t.getMinutes(), F.value = t.getFullYear(), I.value = t.getMonth();
			}
			W.value || Me();
		}
		function Fe(e) {
			let t = e.getMonth() === I.value, n = he.value, r = ge.value, i = Y(e, n), a = Y(e, r), o = !1;
			return n && r && !i && !a && (o = e.getTime() > Math.min(n.getTime(), r.getTime()) && e.getTime() < Math.max(n.getTime(), r.getTime())), {
				"is-outside": !t,
				"is-today": Y(e, pe),
				"is-selected": H.value ? i || a : Y(e, _e.value),
				"is-range-start": i,
				"is-range-end": a,
				"is-in-range": o,
				"is-disabled": me(e)
			};
		}
		let Ie = i(() => {
			let e = he.value, t = ge.value;
			return e ? t ? `${Nt(e, J.value)}  ~  ${Nt(t, J.value)}` : Nt(e, J.value) : "";
		}), Le = i(() => typeof u.teleport == "string" ? u.teleport : "body"), Re = i(() => Z("mc-date-picker", `mc-date-picker--${u.variant}`, `mc-date-picker--${u.size}`, `mc-date-picker--${u.type}`, {
			"is-open": y.value,
			"is-disabled": u.disabled,
			"is-empty": !ce.value
		}, u.customClass));
		return (i, a) => (A(), c("div", { class: C(Re.value) }, [l("button", {
			ref_key: "trigger",
			ref: _,
			type: "button",
			class: "mc-date-picker__trigger mc-sheen-sweep",
			disabled: r.disabled,
			"aria-disabled": r.disabled || void 0,
			"aria-expanded": y.value,
			"aria-haspopup": "dialog",
			"aria-controls": B(h),
			onClick: ye
		}, [
			a[9] || (a[9] = l("span", {
				class: "mc-date-picker__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			f($, {
				name: "calendar",
				size: 15,
				class: "mc-date-picker__icon"
			}),
			l("span", { class: C(["mc-date-picker__value", { "is-placeholder": !ce.value }]) }, R(ce.value ? le.value : r.placeholder), 3),
			l("span", Vl, [r.clearable && ce.value ? (A(), c("span", {
				key: 0,
				class: "mc-date-picker__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": B(m).datePicker.clear ?? "clear",
				onClick: q(Ne, ["stop"])
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, Hl)) : s("", !0)])
		], 8, Bl), (A(), o(t, {
			to: Le.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [y.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: v,
				class: "mc-date-picker__panel",
				style: B(b)
			}, B(g), {
				id: B(h),
				role: "dialog",
				"aria-label": B(m).datePicker.picker ?? "date picker"
			}), [l("div", {
				class: "mc-date-picker__inner mc-grain-overlay",
				style: T({ transformOrigin: B(w) })
			}, [l("div", Wl, [u.shortcuts.length ? (A(), c("aside", Gl, [(A(!0), c(e, null, P(u.shortcuts, (e) => (A(), c("button", {
				key: e.label,
				type: "button",
				class: "mc-date-picker__shortcut",
				onClick: (t) => Pe(e)
			}, R(e.label), 9, Kl))), 128))])) : s("", !0), l("div", ql, [
				l("header", Jl, [
					M.value === "day" ? (A(), c("button", {
						key: 0,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.previousMonth ?? "previous month",
						onClick: a[0] || (a[0] = (e) => xe(-1))
					}, [f($, {
						name: "chevron-left",
						size: 15
					})], 8, Yl)) : M.value === "month" ? (A(), c("button", {
						key: 1,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.previousYear ?? "previous year",
						onClick: a[1] || (a[1] = (e) => Se(-1))
					}, [f($, {
						name: "chevron-left",
						size: 15
					})], 8, Xl)) : (A(), c("button", {
						key: 2,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.previousYears ?? "previous years",
						onClick: a[2] || (a[2] = (e) => Ce(-1))
					}, [f($, {
						name: "chevron-left",
						size: 15
					})], 8, Zl)),
					l("button", {
						type: "button",
						class: "mc-date-picker__title",
						"aria-label": M.value === "day" ? B(m).datePicker.chooseMonth ?? "choose month" : B(m).datePicker.chooseYear ?? "choose year",
						onClick: a[3] || (a[3] = (e) => we(M.value === "day" ? "month" : "year"))
					}, [M.value === "day" ? (A(), c(e, { key: 0 }, [d(R(ue.value), 1)], 64)) : M.value === "month" ? (A(), c(e, { key: 1 }, [d(R(F.value), 1)], 64)) : (A(), c(e, { key: 2 }, [d(R(L.value) + " – " + R(L.value + 11), 1)], 64)), f($, {
						name: "chevrons-up-down",
						size: 12,
						class: "mc-date-picker__title-icon"
					})], 8, Ql),
					M.value === "day" ? (A(), c("button", {
						key: 3,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.nextMonth ?? "next month",
						onClick: a[4] || (a[4] = (e) => xe(1))
					}, [f($, {
						name: "chevron-right",
						size: 15
					})], 8, $l)) : M.value === "month" ? (A(), c("button", {
						key: 4,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.nextYear ?? "next year",
						onClick: a[5] || (a[5] = (e) => Se(1))
					}, [f($, {
						name: "chevron-right",
						size: 15
					})], 8, eu)) : (A(), c("button", {
						key: 5,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": B(m).datePicker.nextYears ?? "next years",
						onClick: a[6] || (a[6] = (e) => Ce(1))
					}, [f($, {
						name: "chevron-right",
						size: 15
					})], 8, tu))
				]),
				f(n, {
					name: "mc-date-swap",
					mode: "out-in"
				}, {
					default: ee(() => [M.value === "day" ? (A(), c("div", nu, [l("div", ru, [(A(), c(e, null, P(ne, (e) => l("span", {
						key: e,
						class: "mc-date-picker__weekday"
					}, R(e), 1)), 64))]), l("div", iu, [(A(!0), c(e, null, P(de.value, (e) => (A(), c("button", {
						key: e.getTime(),
						type: "button",
						class: C(["mc-date-picker__cell", Fe(e)]),
						disabled: me(e),
						"aria-pressed": Fe(e)["is-selected"],
						"aria-current": Y(e, B(pe)) ? "date" : void 0,
						onClick: (t) => Ee(e)
					}, [l("span", ou, R(e.getDate()), 1)], 10, au))), 128))])])) : M.value === "month" ? (A(), c("div", su, [(A(), c(e, null, P(re, (e, t) => l("button", {
						key: e,
						type: "button",
						class: C(["mc-date-picker__month", { "is-active": t === I.value }]),
						onClick: (e) => De(t)
					}, R(e.slice(0, 3)), 11, cu)), 64))])) : (A(), c("div", lu, [(A(!0), c(e, null, P(fe.value, (e) => (A(), c("button", {
						key: e,
						type: "button",
						class: C(["mc-date-picker__year", {
							"is-active": e === F.value,
							"is-today": e === (/* @__PURE__ */ new Date()).getFullYear()
						}]),
						onClick: (t) => Oe(e)
					}, R(e), 11, uu))), 128))]))]),
					_: 1
				}),
				W.value ? (A(), c("div", du, [
					f($, {
						name: "clock",
						size: 14,
						class: "mc-date-picker__time-icon"
					}),
					te(l("input", {
						"onUpdate:modelValue": a[7] || (a[7] = (e) => z.value = e),
						class: "mc-date-picker__time-input",
						type: "number",
						min: "0",
						max: "23",
						"aria-label": B(m).datePicker.hour ?? "hour"
					}, null, 8, fu), [[
						U,
						z.value,
						void 0,
						{ number: !0 }
					]]),
					a[10] || (a[10] = l("span", { class: "mc-date-picker__time-sep" }, ":", -1)),
					te(l("input", {
						"onUpdate:modelValue": a[8] || (a[8] = (e) => V.value = e),
						class: "mc-date-picker__time-input",
						type: "number",
						min: "0",
						max: "59",
						"aria-label": B(m).datePicker.minute ?? "minute"
					}, null, 8, pu), [[
						U,
						V.value,
						void 0,
						{ number: !0 }
					]])
				])) : s("", !0)
			])]), l("footer", mu, [
				l("button", {
					type: "button",
					class: "mc-date-picker__now",
					onClick: je
				}, [f($, {
					name: "sun",
					size: 13
				}), l("span", null, R(B(m).datePicker.now), 1)]),
				l("span", hu, R(Ie.value), 1),
				l("button", {
					type: "button",
					class: "mc-date-picker__apply",
					onClick: Me
				}, R(B(m).datePicker.confirm), 1)
			])], 4)], 16, Ul)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-00104fba"]]), _u = {
	key: 0,
	class: "mc-descriptions__title mc-sheen-sweep"
}, vu = { class: "mc-descriptions__title-text" }, yu = { class: "mc-descriptions__table" }, bu = { class: "mc-descriptions__body" }, xu = ["colspan"], Su = ["colspan"], Cu = { class: "mc-descriptions__stack" }, wu = { class: "mc-descriptions__value mc-descriptions__value--stack" }, Tu = {
	key: 0,
	class: "mc-descriptions__row"
}, Eu = ["colspan"], Du = { class: "mc-descriptions__empty-text" }, Ou = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDescriptions",
	__name: "Descriptions",
	props: {
		items: { default: () => [] },
		column: { default: 1 },
		direction: { default: "horizontal" },
		bordered: {
			type: Boolean,
			default: !0
		},
		size: { default: "medium" },
		title: {},
		emptyText: { default: "No data" },
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => {
			let e = [], t = [], r = 0, i = 0;
			for (let a of n.items) {
				let o = Math.max(1, Math.min(a.span ?? 1, n.column));
				r + o > n.column && t.length && (e.push(t), t = [], r = 0), t.push({
					item: a,
					span: o,
					index: i
				}), i += 1, r += o;
			}
			return t.length && e.push(t), e;
		});
		function a(e) {
			if (n.direction !== "vertical" && e.labelWidth !== void 0) return { width: typeof e.labelWidth == "number" ? `${e.labelWidth}px` : e.labelWidth };
		}
		let o = i(() => Z("mc-descriptions", "mc-grain-overlay", `mc-descriptions--${n.direction}`, `mc-descriptions--${n.size}`, { "is-bordered": n.bordered }, n.customClass)), u = i(() => ({ "--mc-desc-columns": String(Math.max(1, n.column)) }));
		return (n, i) => (A(), c("div", {
			class: C(o.value),
			style: T(u.value)
		}, [t.title ? (A(), c("div", _u, [l("span", vu, R(t.title), 1)])) : s("", !0), l("table", yu, [l("colgroup", null, [(A(!0), c(e, null, P(t.direction === "horizontal" ? t.column * 2 : t.column, (e) => (A(), c("col", {
			key: e,
			style: T(t.direction === "horizontal" && e % 2 == 1 ? { width: "var(--mc-desc-label-width)" } : void 0)
		}, null, 4))), 128))]), l("tbody", bu, [(A(!0), c(e, null, P(r.value, (r, i) => (A(), c("tr", {
			key: i,
			class: "mc-descriptions__row",
			style: T({ "--i": i })
		}, [(A(!0), c(e, null, P(r, (r) => (A(), c(e, { key: r.index }, [t.direction === "horizontal" ? (A(), c(e, { key: 0 }, [l("th", {
			scope: "row",
			class: "mc-descriptions__label",
			style: T(a(r.item)),
			colspan: 1
		}, [F(n.$slots, "label", {
			label: r.item.label,
			item: r.item,
			index: r.index
		}, () => [d(R(r.item.label), 1)], !0)], 4), l("td", {
			class: "mc-descriptions__value",
			colspan: r.span * 2 - 1
		}, [F(n.$slots, "value", {
			value: r.item.value,
			item: r.item,
			index: r.index
		}, () => [d(R(r.item.value), 1)], !0)], 8, xu)], 64)) : (A(), c("td", {
			key: 1,
			class: "mc-descriptions__cell",
			colspan: r.span
		}, [l("div", Cu, [l("div", {
			role: "rowheader",
			class: "mc-descriptions__label mc-descriptions__label--stack",
			style: T(a(r.item))
		}, [F(n.$slots, "label", {
			label: r.item.label,
			item: r.item,
			index: r.index
		}, () => [d(R(r.item.label), 1)], !0)], 4), l("div", wu, [F(n.$slots, "value", {
			value: r.item.value,
			item: r.item,
			index: r.index
		}, () => [d(R(r.item.value), 1)], !0)])])], 8, Su))], 64))), 128))], 4))), 128)), r.value.length ? s("", !0) : (A(), c("tr", Tu, [l("td", {
			class: "mc-descriptions__empty mc-aurora-inset",
			colspan: t.direction === "horizontal" ? t.column * 2 : t.column,
			role: "status"
		}, [l("span", Du, R(t.emptyText), 1)], 8, Eu)]))])])], 6));
	}
}), [["__scopeId", "data-v-b51b890c"]]), ku = ["aria-disabled", "aria-labelledby"], Au = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, ju = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Mu = {
	key: 0,
	class: "mc-dialog__grip",
	"aria-hidden": "true"
}, Nu = ["id"], Pu = ["aria-label", "disabled"], Fu = {
	key: 2,
	class: "mc-dialog__footer"
}, Iu = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])", Lu = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDialog",
	__name: "Dialog",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		title: {},
		width: { default: 520 },
		maxWidth: { default: "92vw" },
		drag: {
			type: Boolean,
			default: !1
		},
		resizable: {
			type: Boolean,
			default: !1
		},
		showClose: {
			type: Boolean,
			default: !0
		},
		closeOnClickModal: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		beforeClose: {},
		variant: { default: "glass" },
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(e, { emit: r }) {
		let a = e, u = Zt(), p = An(), m = r, h = Fi("mc-dialog"), g = N(null), _ = N(null), v = N(null), y = N(!1), { isTop: b, isTopModal: S } = On({
			active: y,
			modal: !0
		}), w = Tn({ active: y }), D = i(() => {
			let e = _.value;
			return e && e.querySelector(Iu) ? e : v.value;
		});
		G(() => [a.open, a.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (y.value = t) : y.value = e;
		}, { immediate: !0 });
		let k = i(() => y.value);
		Js(i(() => wt && k.value)), Ws({
			enabled: k,
			container: g,
			initialFocus: D,
			isTop: S
		});
		function j(e) {
			y.value !== e && (y.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		function M() {
			y.value && !a.disabled && (a.beforeClose ? a.beforeClose(() => j(!1)) : j(!1));
		}
		function P() {
			a.closeOnClickModal && M();
		}
		function I(e) {
			e.key === "Escape" && y.value && b() && (e.stopPropagation(), M());
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", I);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", I), U();
		});
		let L = N({
			x: 0,
			y: 0
		}), z = null;
		function V(e) {
			a.drag && !a.disabled && (e.target?.closest("button") || (z = {
				x: e.clientX,
				y: e.clientY,
				ox: L.value.x,
				oy: L.value.y
			}, typeof window < "u" && (window.addEventListener("mousemove", H), window.addEventListener("mouseup", U))));
		}
		function H(e) {
			z && (L.value = {
				x: z.ox + (e.clientX - z.x),
				y: z.oy + (e.clientY - z.y)
			});
		}
		function U() {
			z = null, typeof window < "u" && (window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", U));
		}
		let W = i(() => ({ transform: `translate3d(${Math.round(L.value.x)}px, ${Math.round(L.value.y)}px, 0)` })), te = i(() => ({
			width: typeof a.width == "number" ? `${a.width}px` : a.width,
			maxWidth: typeof a.maxWidth == "number" ? `${a.maxWidth}px` : a.maxWidth
		})), K = i(() => Z("mc-dialog", "mc-grain-overlay", {
			"mc-panel--liquid": a.variant === "liquid",
			"mc-liquid-glass": a.variant === "liquid",
			"mc-liquid-glass--liquid": a.variant === "liquid",
			"mc-liquid-glass--layers": a.variant === "liquid",
			"is-draggable": a.drag,
			"is-resizable": a.resizable,
			"is-disabled": a.disabled
		}, a.customClass));
		return (r, i) => (A(), o(t, { to: "body" }, [f(n, { name: "mc-dialog" }, {
			default: ee(() => [k.value ? (A(), c("div", x({
				key: 0,
				class: "mc-dialog__overlay",
				style: { "--mc-layer-z": B(w) }
			}, B(p), { onClick: P }), [l("div", {
				class: "mc-dialog__wrapper",
				style: T(W.value),
				onClick: i[0] || (i[0] = q(() => {}, ["stop"]))
			}, [l("div", {
				ref_key: "panel",
				ref: g,
				class: C(K.value),
				style: T(te.value),
				role: "dialog",
				"aria-modal": "true",
				"aria-disabled": e.disabled || void 0,
				"aria-labelledby": B(h),
				tabindex: "-1"
			}, [
				e.variant === "liquid" ? (A(), c("span", Au)) : s("", !0),
				e.variant === "liquid" ? (A(), c("span", ju)) : s("", !0),
				l("header", {
					class: C(["mc-dialog__header mc-sheen-sweep", { "is-draggable": L.value }]),
					onMousedown: V
				}, [
					L.value ? (A(), c("span", Mu, [f($, {
						name: "grip",
						size: 16
					})])) : s("", !0),
					l("h2", {
						id: B(h),
						ref_key: "titleRef",
						ref: v,
						class: "mc-dialog__title",
						tabindex: "-1",
						"data-mc-type": "title"
					}, [F(r.$slots, "title", {}, () => [d(R(e.title), 1)], !0)], 8, Nu),
					e.showClose ? (A(), c("button", {
						key: 1,
						type: "button",
						class: "mc-dialog__close",
						"aria-label": B(u).dialog?.close ?? "Close dialog",
						disabled: e.disabled,
						onClick: M
					}, [f($, {
						name: "close",
						size: 14,
						"stroke-width": 2.4
					})], 8, Pu)) : s("", !0)
				], 34),
				l("div", {
					ref_key: "bodyRef",
					ref: _,
					class: "mc-dialog__body"
				}, [F(r.$slots, "default", {}, void 0, !0)], 512),
				r.$slots.footer ? (A(), c("footer", Fu, [F(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 14, ku)], 4)], 16)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-897c8d72"]]);
//#endregion
//#region src/composables/useCountUp.ts
function Ru(e, t = {}) {
	let { duration: n = 900, decimals: r = 0, delay: a = 0, from: o = 0 } = t, s = N(o), c = 0, l;
	function u(e) {
		return e === 1 ? 1 : 1 - 2 ** (-10 * e);
	}
	function d() {
		let t = performance.now(), r = s.value, i = e.value - r;
		if (i === 0) {
			s.value = e.value;
			return;
		}
		let a = (o) => {
			let l = Math.min(1, (o - t) / n);
			s.value = r + i * u(l), l < 1 ? c = requestAnimationFrame(a) : s.value = e.value;
		};
		c = requestAnimationFrame(a);
	}
	return G(e, (e) => {
		l && clearTimeout(l), a > 0 ? l = setTimeout(d, a) : d();
	}, { immediate: !0 }), E(() => {
		c && cancelAnimationFrame(c), l && clearTimeout(l);
	}), {
		value: s,
		display: i(() => s.value.toLocaleString(void 0, {
			minimumFractionDigits: r,
			maximumFractionDigits: r
		})),
		stop: () => c && cancelAnimationFrame(c)
	};
}
//#endregion
//#region src/components/diff/Diff.vue?vue&type=script&setup=true&lang.ts
var zu = { class: "mc-diff__header mc-sheen-sweep" }, Bu = { class: "mc-diff__labels" }, Vu = { class: "mc-diff__label mc-diff__label--old" }, Hu = { class: "mc-diff__label mc-diff__label--new" }, Uu = {
	key: 0,
	class: "mc-diff__stats"
}, Wu = { class: "mc-diff__stat is-added" }, Gu = { class: "mc-diff__stat is-removed" }, Ku = {
	key: 0,
	class: "mc-diff__body"
}, qu = { class: "mc-diff__no" }, Ju = { class: "mc-diff__no" }, Yu = { class: "mc-diff__sign" }, Xu = { class: "mc-diff__content" }, Zu = {
	key: 1,
	class: "mc-diff__body mc-diff__body--split"
}, Qu = { class: "mc-diff__no" }, $u = { class: "mc-diff__content" }, ed = { class: "mc-diff__no" }, td = { class: "mc-diff__content" }, nd = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDiff",
	__name: "Diff",
	props: {
		oldText: { default: "" },
		newText: { default: "" },
		oldLabel: { default: "原文件" },
		newLabel: { default: "新文件" },
		mode: { default: "unified" },
		showStats: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	setup(t) {
		let n = t;
		function r(e, t) {
			let n = e.length, r = t.length, i = Array.from({ length: n + 1 }, () => Array(r + 1).fill(0));
			for (let a = n - 1; a >= 0; a--) for (let n = r - 1; n >= 0; n--) i[a][n] = e[a] === t[n] ? i[a + 1][n + 1] + 1 : Math.max(i[a + 1][n], i[a][n + 1]);
			let a = [], o = 0, s = 0, c = 1, l = 1;
			for (; o < n && s < r;) e[o] === t[s] ? (a.push({
				type: "context",
				content: e[o],
				oldNo: c++,
				newNo: l++
			}), o++, s++) : i[o + 1][s] >= i[o][s + 1] ? (a.push({
				type: "removed",
				content: e[o],
				oldNo: c++
			}), o++) : (a.push({
				type: "added",
				content: t[s],
				newNo: l++
			}), s++);
			for (; o < n;) a.push({
				type: "removed",
				content: e[o++],
				oldNo: c++
			});
			for (; s < r;) a.push({
				type: "added",
				content: t[s++],
				newNo: l++
			});
			return a;
		}
		let a = i(() => r((n.oldText ?? "").split("\n"), (n.newText ?? "").split("\n"))), o = i(() => {
			let e = 0, t = 0;
			for (let n of a.value) n.type === "added" ? e++ : n.type === "removed" && t++;
			return {
				added: e,
				removed: t
			};
		}), u = i(() => o.value.added), d = i(() => o.value.removed), { display: f } = Ru(u, {
			duration: 700,
			from: 0
		}), { display: p } = Ru(d, {
			duration: 700,
			from: 0
		}), m = i(() => {
			let e = [], t = a.value, n = 0;
			for (; n < t.length;) {
				let r = t[n];
				r.type === "removed" && t[n + 1]?.type === "added" ? (e.push({
					left: r,
					right: t[n + 1]
				}), n += 2) : (e.push({
					left: r.type === "added" ? void 0 : r,
					right: r.type === "removed" ? void 0 : r
				}), n++);
			}
			return e;
		}), h = i(() => Z("mc-diff", "mc-grain-overlay", `mc-diff--${n.mode}`, n.customClass));
		return (n, r) => (A(), c("div", { class: C(h.value) }, [l("header", zu, [l("div", Bu, [l("span", Vu, R(t.oldLabel), 1), l("span", Hu, R(t.newLabel), 1)]), t.showStats ? (A(), c("div", Uu, [l("span", Wu, "+" + R(B(f)), 1), l("span", Gu, "−" + R(B(p)), 1)])) : s("", !0)]), t.mode === "unified" ? (A(), c("div", Ku, [(A(!0), c(e, null, P(a.value, (e, t) => (A(), c("div", {
			key: t,
			class: C(["mc-diff__line", `is-${e.type}`])
		}, [
			l("span", qu, R(e.oldNo ?? ""), 1),
			l("span", Ju, R(e.newNo ?? ""), 1),
			l("span", Yu, R(e.type === "added" ? "+" : e.type === "removed" ? "−" : " "), 1),
			l("span", Xu, R(e.content), 1)
		], 2))), 128))])) : (A(), c("div", Zu, [(A(!0), c(e, null, P(m.value, (e, t) => (A(), c("div", {
			key: t,
			class: "mc-diff__row"
		}, [l("div", { class: C(["mc-diff__cell", e.left ? `is-${e.left.type}` : "is-empty"]) }, [l("span", Qu, R(e.left?.oldNo ?? ""), 1), l("span", $u, R(e.left?.content ?? ""), 1)], 2), l("div", { class: C(["mc-diff__cell", e.right ? `is-${e.right.type}` : "is-empty"]) }, [l("span", ed, R(e.right?.newNo ?? ""), 1), l("span", td, R(e.right?.content ?? ""), 1)], 2)]))), 128))]))], 2));
	}
}), [["__scopeId", "data-v-63a1f984"]]);
//#endregion
//#region src/composables/useDiscrete.ts
function rd(e) {
	let t = null, n = null, r = null;
	function i() {
		t || typeof document > "u" || (e.container && (r = typeof e.container == "string" ? document.querySelector(e.container) : e.container), r || (r = document.createElement("div"), r.setAttribute("data-mochi-discrete", ""), e.inline || document.body.appendChild(r)), t = a({ render: () => _(e.component, {
			...e.props ?? {},
			ref: (e) => {
				n = e;
			}
		}) }), e.plugins?.forEach((e) => t.use(e)), t.mount(r));
	}
	function o() {
		t?.unmount(), t = null, n = null, r && r.parentNode && !e.inline && r.parentNode.removeChild(r), r = null;
	}
	return new Proxy({}, { get(e, t) {
		return t === "mount" ? i : t === "unmount" || t === "destroy" ? o : (...e) => {
			n || i();
			let r = n?.[t];
			return typeof r == "function" ? r.apply(n, e) : void 0;
		};
	} });
}
//#endregion
//#region src/components/discrete-api/DiscreteApi.vue
var id = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDiscreteApi",
	__name: "DiscreteApi",
	props: {
		component: {},
		componentProps: { default: () => ({}) },
		inline: {
			type: Boolean,
			default: !1
		},
		plugins: {},
		customClass: {}
	},
	setup(e, { expose: t }) {
		let n = e, r = N(!1), i = N(null), a = {
			component: n.component,
			props: n.componentProps,
			inline: n.inline,
			plugins: n.plugins,
			container: void 0
		}, o = L(b(rd(a)));
		function l() {
			a.container = n.inline ? i.value ?? void 0 : void 0, o.value.mount(), r.value = !0;
		}
		function u() {
			r.value && (o.value.unmount(), a.component = n.component, a.props = n.componentProps, a.inline = n.inline, a.plugins = n.plugins, l());
		}
		function d(e, t) {
			if (e === t) return !0;
			if (typeof e == "function" && typeof t == "function") return String(e) === String(t);
			if (typeof e != "object" || typeof t != "object" || !e || !t || Array.isArray(e) !== Array.isArray(t)) return !1;
			let n = e, r = t, i = Object.keys(n);
			return i.length === Object.keys(r).length && i.every((e) => d(n[e], r[e]));
		}
		return G(() => [
			n.component,
			n.componentProps,
			n.inline,
			n.plugins
		], (e, t) => {
			d(e[0], t[0]) && d(e[1], t[1]) && d(e[2], t[2]) && d(e[3], t[3]) || u();
		}), j("mochi:discrete", o), O(() => {
			l();
		}), E(() => {
			o.value.unmount(), r.value = !1;
		}), t({
			api: o,
			mount: () => l(),
			destroy: () => o.value.unmount()
		}), (t, n) => (A(), c("span", { class: C(B(Z)("mc-discrete-api", { "is-mounted": r.value }, e.customClass)) }, [e.inline ? (A(), c("span", {
			key: 0,
			ref_key: "host",
			ref: i,
			class: "mc-discrete-api__host"
		}, null, 512)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-6bd3cf9e"]]), ad = ["aria-orientation", "aria-disabled"], od = {
	key: 0,
	class: "mc-divider__wave",
	"aria-hidden": "true"
}, sd = ["tabindex"], cd = { class: "mc-divider__label-text" }, ld = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDivider",
	__name: "Divider",
	props: {
		orientation: { default: "horizontal" },
		dashed: {
			type: Boolean,
			default: !1
		},
		gradient: {
			type: Boolean,
			default: !1
		},
		wave: {
			type: Boolean,
			default: !1
		},
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		interactive: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(null);
		function r(e) {
			t.interactive && !t.disabled && bt(e, n.value);
		}
		let a = i(() => Z(`mc-divider--${t.orientation}`, {
			"is-dashed": t.dashed,
			"is-gradient": t.gradient,
			"is-wave": t.wave,
			"is-disabled": t.disabled,
			"is-interactive": t.interactive
		}, t.customClass));
		return (t, i) => (A(), c("div", {
			class: C(["mc-divider", a.value]),
			role: "separator",
			"aria-orientation": e.orientation,
			"aria-disabled": e.disabled || void 0
		}, [e.wave ? (A(), c("span", od, [...i[0] || (i[0] = [l("svg", {
			viewBox: "0 0 120 12",
			preserveAspectRatio: "none",
			width: "100%",
			height: "100%"
		}, [l("path", {
			d: "M0 6c10-8 20 8 30 0s20-8 30 0 20 8 30 0 20-8 30 0v6H0Z",
			fill: "currentColor",
			opacity: "0.22"
		})], -1)])])) : s("", !0), e.label ? (A(), c("span", {
			key: 1,
			ref_key: "labelEl",
			ref: n,
			class: "mc-divider__label",
			tabindex: e.interactive ? 0 : void 0,
			onKeydown: q(r, ["self"])
		}, [l("span", cd, R(e.label), 1)], 40, sd)) : s("", !0)], 10, ad));
	}
}), [["__scopeId", "data-v-cddbd875"]]), ud = ["aria-label"], dd = { class: "mc-dock__items" }, fd = [
	"aria-label",
	"aria-pressed",
	"aria-disabled",
	"disabled",
	"onMouseenter",
	"onFocus",
	"onClick",
	"onKeydown"
], pd = { class: "mc-dock__tile mc-sheen-sweep" }, md = {
	key: 0,
	class: "mc-dock__badge",
	"aria-hidden": "true"
}, hd = {
	key: 1,
	class: "mc-dock__label",
	role: "tooltip"
}, gd = {
	key: 2,
	class: "mc-dock__dot",
	"aria-hidden": "true"
}, _d = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDock",
	__name: "Dock",
	props: {
		items: {},
		modelValue: {},
		position: { default: "bottom" },
		size: { default: 48 },
		magnification: { default: 1.45 },
		showLabels: {
			type: Boolean,
			default: !1
		},
		background: {
			type: Boolean,
			default: !0
		},
		label: { default: "Dock" },
		customClass: {}
	},
	emits: ["update:modelValue", "select"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(-1);
		function u(e) {
			return r.modelValue === void 0 ? !!e.active : e.key === r.modelValue;
		}
		function d(e) {
			if (o.value < 0) return 1;
			let t = Math.abs(e - o.value), n = Math.max(0, 1 - t * .4);
			return 1 + (r.magnification - 1) * n;
		}
		function p(e) {
			e.disabled || (a("update:modelValue", e.key), a("select", e.key, e));
		}
		function m(e, t) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			let n = r.items[t];
			n && p(n);
		}
		let h = i(() => Z("mc-dock", `mc-dock--${r.position}`, {
			"has-background": r.background,
			"has-labels": r.showLabels,
			"mc-grain-overlay": r.background
		}, r.customClass)), g = i(() => ({
			"--mc-dock-size": `${r.size}px`,
			"--mc-dock-gap": `${Math.round(r.size * .16)}px`
		}));
		return (n, r) => (A(), c("div", {
			class: C(h.value),
			style: T(g.value),
			role: "toolbar",
			"aria-label": t.label
		}, [r[2] || (r[2] = l("span", {
			class: "mc-dock__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), l("div", dd, [(A(!0), c(e, null, P(t.items, (e, n) => (A(), c("button", {
			key: e.key,
			type: "button",
			class: C(["mc-dock__item", {
				"is-active": u(e),
				"is-disabled": e.disabled
			}]),
			style: T({ "--mc-dock-scale": d(n) }),
			"aria-label": e.label,
			"aria-pressed": u(e) ? "true" : "false",
			"aria-disabled": e.disabled ? "true" : void 0,
			disabled: e.disabled,
			onMouseenter: (e) => o.value = n,
			onMouseleave: r[0] || (r[0] = (e) => o.value = -1),
			onFocus: (e) => o.value = n,
			onBlur: r[1] || (r[1] = (e) => o.value = -1),
			onClick: (t) => p(e),
			onKeydown: (e) => m(e, n)
		}, [
			l("span", pd, [f($, {
				name: e.icon,
				size: Math.round(t.size * .46),
				"stroke-width": 1.9
			}, null, 8, ["name", "size"])]),
			e.badge !== void 0 && e.badge !== "" ? (A(), c("span", md, R(e.badge), 1)) : s("", !0),
			t.showLabels ? (A(), c("span", hd, R(e.label), 1)) : s("", !0),
			u(e) ? (A(), c("span", gd)) : s("", !0)
		], 46, fd))), 128))])], 14, ud));
	}
}), [["__scopeId", "data-v-49514c86"]]), vd = ["aria-disabled", "aria-labelledby"], yd = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, bd = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, xd = { class: "mc-drawer__header mc-sheen-sweep" }, Sd = ["id"], Cd = ["aria-label", "disabled"], wd = { class: "mc-drawer__body" }, Td = {
	key: 2,
	class: "mc-drawer__footer"
}, Ed = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDrawer",
	__name: "Drawer",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		placement: { default: "right" },
		size: {},
		title: {},
		showClose: {
			type: Boolean,
			default: !0
		},
		closeOnClickModal: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		variant: { default: "glass" },
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(e, { emit: r }) {
		let a = e, u = Zt(), p = An(), m = r, h = Fi("mc-drawer"), g = N(null), _ = N(!1), { isTop: v, isTopModal: y } = On({
			active: _,
			modal: !0
		}), b = Tn({ active: _ });
		G(() => [a.open, a.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (_.value = t) : _.value = e;
		}, { immediate: !0 });
		let S = i(() => _.value);
		Js(i(() => wt && S.value)), Ws({
			enabled: S,
			container: g,
			isTop: y
		});
		function w(e) {
			_.value !== e && (_.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		function D() {
			a.closeOnClickModal && !a.disabled && w(!1);
		}
		function k(e) {
			if (e.key === "Escape" && _.value && v()) {
				if (e.stopPropagation(), a.disabled) return;
				w(!1);
			}
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", k);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", k);
		});
		let j = i(() => a.placement === "left" || a.placement === "right"), M = i(() => {
			let e = a.size;
			if (e === void 0) return j.value ? { width: "420px" } : { height: "40%" };
			let t = typeof e == "number" ? `${e}px` : e;
			return j.value ? { width: t } : { height: t };
		}), P = i(() => Z("mc-drawer", "mc-grain-overlay", `mc-drawer--${a.placement}`, {
			"mc-panel--liquid": a.variant === "liquid",
			"mc-liquid-glass": a.variant === "liquid",
			"mc-liquid-glass--liquid": a.variant === "liquid",
			"mc-liquid-glass--layers": a.variant === "liquid",
			"is-disabled": a.disabled
		}, a.customClass));
		return (r, i) => (A(), o(t, { to: "body" }, [f(n, { name: "mc-drawer" }, {
			default: ee(() => [S.value ? (A(), c("div", x({
				key: 0,
				class: "mc-drawer__overlay",
				style: { "--mc-layer-z": B(b) }
			}, B(p), { onClick: D }), [l("aside", {
				ref_key: "panel",
				ref: g,
				class: C(P.value),
				style: T(M.value),
				role: "dialog",
				"aria-modal": "true",
				"aria-disabled": e.disabled || void 0,
				"aria-labelledby": B(h),
				tabindex: "-1",
				onClick: i[1] || (i[1] = q(() => {}, ["stop"]))
			}, [
				e.variant === "liquid" ? (A(), c("span", yd)) : s("", !0),
				e.variant === "liquid" ? (A(), c("span", bd)) : s("", !0),
				l("header", xd, [l("h2", {
					id: B(h),
					class: "mc-drawer__title",
					"data-mc-type": "title"
				}, [F(r.$slots, "title", {}, () => [d(R(e.title), 1)], !0)], 8, Sd), e.showClose ? (A(), c("button", {
					key: 0,
					type: "button",
					class: "mc-drawer__close",
					"aria-label": B(u).drawer?.close ?? "Close drawer",
					disabled: e.disabled,
					onClick: i[0] || (i[0] = (e) => w(!1))
				}, [f($, {
					name: "close",
					size: 14,
					"stroke-width": 2.4
				})], 8, Cd)) : s("", !0)]),
				l("div", wd, [F(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (A(), c("footer", Td, [F(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 14, vd)], 16)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-23f53da5"]]), Dd = [
	"disabled",
	"aria-expanded",
	"aria-controls"
], Od = {
	key: 1,
	class: "mc-dropdown__label"
}, kd = [
	"disabled",
	"aria-expanded",
	"aria-controls"
], Ad = ["id"], jd = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Md = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Nd = {
	key: 0,
	class: "mc-dropdown__group",
	role: "presentation"
}, Pd = ["disabled", "onClick"], Fd = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDropdown",
	__name: "Dropdown",
	props: {
		options: {},
		trigger: { default: "click" },
		placement: { default: "bottom-start" },
		disabled: {
			type: Boolean,
			default: !1
		},
		showArrow: {
			type: Boolean,
			default: !0
		},
		split: {
			type: Boolean,
			default: !1
		},
		width: {},
		offset: { default: 8 },
		variant: { default: "glass" },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		label: {},
		icon: {},
		customClass: {}
	},
	emits: [
		"update:open",
		"open",
		"close",
		"select"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = An(), m = N(!1), h = N(null), g = N(null), _ = Fi("mc-dropdown"), { isTop: v } = On({ active: m }), y, b = Tn({ active: m }), { style: w, coords: D, transformOrigin: k, arrowSide: j, schedule: M, stopAutoUpdate: I } = _n(h, g, {
			placement: u.placement,
			offset: u.offset,
			zIndex: b
		});
		Sc(h, () => W(), { ignore: [g] });
		let L = i(() => u.variant === "liquid" ? "mc-panel--liquid mc-liquid-glass mc-liquid-glass--liquid mc-liquid-glass--layers" : void 0);
		G(m, (e) => {
			e ? (d("open"), M(), z()) : (d("close"), I());
		});
		function z() {
			I(), typeof window < "u" && (window.addEventListener("scroll", M, !0), window.addEventListener("resize", M));
		}
		E(() => {
			y && clearTimeout(y), I(), typeof document < "u" && document.removeEventListener("keydown", ae);
		});
		function V() {
			u.disabled || (m.value = !m.value);
		}
		function H() {
			u.disabled || (u.trigger === "hover" ? (y && clearTimeout(y), y = setTimeout(() => m.value = !0, 90)) : m.value = !0);
		}
		function U() {
			u.trigger === "hover" ? (y && clearTimeout(y), y = setTimeout(() => m.value = !1, 140)) : m.value = !1;
		}
		function W() {
			m.value = !1;
		}
		function te() {
			return Array.from(g.value?.querySelectorAll(".mc-dropdown__item:not(:disabled)") ?? []);
		}
		function K() {
			(h.value?.querySelector("button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])") ?? h.value)?.focus({ preventScroll: !0 });
		}
		function J(e) {
			let t = te();
			t.length && t[(e % t.length + t.length) % t.length]?.focus({ preventScroll: !0 });
		}
		function ne() {
			let e = g.value?.contains(document.activeElement) ?? !1;
			W(), e && S(() => K());
		}
		function re(e) {
			e.disabled || (e.handler?.(), d("select", e), ne());
		}
		function ie(e) {
			u.disabled || (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), m.value ? J(e.key === "ArrowDown" ? 0 : -1) : (m.value = !0, S(() => J(e.key === "ArrowDown" ? 0 : -1))));
		}
		function Y(e) {
			if (e.key === "Escape") {
				e.preventDefault(), e.stopPropagation(), ne();
				return;
			}
			if (e.key === "Tab") {
				W();
				return;
			}
			let t = te();
			if (!t.length) return;
			let n = t.indexOf(document.activeElement);
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = e.key === "ArrowDown" ? 1 : -1;
				J(n === -1 ? t === 1 ? 0 : -1 : n + t);
			} else e.key === "Home" ? (e.preventDefault(), J(0)) : e.key === "End" && (e.preventDefault(), J(-1));
		}
		function ae(e) {
			if (e.key !== "Escape" || !m.value || !v()) return;
			e.stopPropagation();
			let t = g.value?.contains(document.activeElement) ?? !1;
			W(), t && S(() => K());
		}
		function oe(e) {
			u.trigger === "contextmenu" && (e.preventDefault(), m.value = !m.value);
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", ae);
		});
		let se = i(() => {
			let e = j.value;
			if (e === "top" || e === "bottom") {
				let e = D.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = D.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), ce = i(() => `mc-dropdown__arrow--${j.value}`), le = i(() => {
			if (u.teleport !== !1) return typeof u.teleport == "string" ? u.teleport : "body";
		}), ue = i(() => {
			let e = [];
			for (let t of u.options ?? []) if (t.group) {
				let n = e.find((e) => e.group === t.group);
				n || (n = {
					group: t.group,
					items: []
				}, e.push(n)), n.items.push(t);
			} else {
				let n = e[e.length - 1];
				(!n || n.group !== void 0) && (n = { items: [] }, e.push(n)), n.items.push(t);
			}
			return e;
		});
		return (i, a) => (A(), c("div", { class: C(["mc-dropdown", B(Z)(r.customClass)]) }, [l("div", {
			ref_key: "triggerRef",
			ref: h,
			class: "mc-dropdown__trigger",
			onClick: a[0] || (a[0] = (e) => r.trigger === "click" && V()),
			onMouseenter: a[1] || (a[1] = (e) => r.trigger === "hover" && H()),
			onMouseleave: a[2] || (a[2] = (e) => r.trigger === "hover" && U()),
			onContextmenu: oe,
			onKeydown: ie
		}, [F(i.$slots, "trigger", { open: m.value }, () => [l("button", {
			class: "mc-dropdown__btn",
			type: "button",
			disabled: r.disabled,
			"aria-expanded": m.value,
			"aria-haspopup": "menu",
			"aria-controls": m.value ? B(_) : void 0
		}, [
			r.icon ? (A(), o($, {
				key: 0,
				name: r.icon,
				class: "mc-dropdown__icon"
			}, null, 8, ["name"])) : s("", !0),
			r.label ? (A(), c("span", Od, R(r.label), 1)) : s("", !0),
			r.showArrow && !r.split ? (A(), o($, {
				key: 2,
				name: "chevron-down",
				class: C(["mc-dropdown__chevron", { "is-open": m.value }])
			}, null, 8, ["class"])) : s("", !0)
		], 8, Dd)], !0), r.split ? (A(), c("button", {
			key: 0,
			class: "mc-dropdown__split",
			type: "button",
			disabled: r.disabled,
			"aria-expanded": m.value,
			"aria-haspopup": "menu",
			"aria-controls": m.value ? B(_) : void 0,
			onClick: q(V, ["stop"])
		}, [f($, {
			name: "chevron-down",
			class: C(["mc-dropdown__chevron", { "is-open": m.value }])
		}, null, 8, ["class"])], 8, kd)) : s("", !0)], 544), (A(), o(t, { to: le.value }, [f(n, { name: "mc-dropdown-fade" }, {
			default: ee(() => [m.value ? (A(), c("div", x({
				key: 0,
				ref_key: "panelRef",
				ref: g,
				class: "mc-dropdown__layer",
				style: {
					...B(w),
					transformOrigin: B(k)
				}
			}, B(p), {
				onMouseenter: a[3] || (a[3] = (e) => r.trigger === "hover" && (m.value = !0)),
				onMouseleave: a[4] || (a[4] = (e) => r.trigger === "hover" && U())
			}), [l("span", {
				class: C(["mc-dropdown__arrow", ce.value]),
				style: T(se.value),
				"aria-hidden": "true"
			}, null, 6), l("div", {
				id: B(_),
				class: C(["mc-dropdown__panel", L.value]),
				style: T({ width: r.width ? `${r.width}px` : void 0 }),
				role: "menu",
				onKeydown: Y
			}, [
				r.variant === "liquid" ? (A(), c("span", jd)) : s("", !0),
				a[5] || (a[5] = l("span", {
					class: "mc-dropdown__aurora",
					"aria-hidden": "true"
				}, null, -1)),
				r.variant === "liquid" ? (A(), c("span", Md)) : s("", !0),
				a[6] || (a[6] = l("span", {
					class: "mc-dropdown__glint",
					"aria-hidden": "true"
				}, null, -1)),
				(A(!0), c(e, null, P(ue.value, (t, n) => (A(), c(e, { key: n }, [t.group ? (A(), c("div", Nd, R(t.group), 1)) : s("", !0), (A(!0), c(e, null, P(t.items, (e, t) => (A(), c("button", {
					key: e.key ?? t,
					class: C(["mc-dropdown__item", {
						"is-danger": e.danger,
						"is-disabled": e.disabled,
						"is-divided": e.divided
					}]),
					type: "button",
					role: "menuitem",
					disabled: e.disabled,
					onClick: (t) => re(e)
				}, [e.icon ? (A(), o($, {
					key: 0,
					name: e.icon,
					class: "mc-dropdown__icon"
				}, null, 8, ["name"])) : s("", !0), l("span", null, R(e.label), 1)], 10, Pd))), 128))], 64))), 128)),
				F(i.$slots, "default", {}, void 0, !0)
			], 46, Ad)], 16)) : s("", !0)]),
			_: 3
		})], 8, ["to"]))], 2));
	}
}), [["__scopeId", "data-v-9e777b32"]]), Id = ["aria-disabled"], Ld = [
	"value",
	"placeholder",
	"disabled",
	"size",
	"aria-label",
	"onInput",
	"onKeydown"
], Rd = ["aria-label", "onClick"], zd = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDynamicInput",
	__name: "DynamicInput",
	props: {
		modelValue: { default: () => [] },
		placeholder: { default: "Type and press Enter…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N([""]), u = N([]), d = i(() => o.value.filter((e) => e.trim() !== ""));
		function p() {
			let e = (r.modelValue ?? []).filter((e) => e !== ""), t = d.value;
			e.length === t.length && e.every((e, n) => e === t[n]) || (o.value = e.concat([""]));
		}
		G(() => r.modelValue, p, { immediate: !0 });
		function m() {
			let e = d.value;
			a("update:modelValue", e), a("change", e);
		}
		function h(e) {
			let t = Math.min(Math.max(e, 0), o.value.length - 1);
			S(() => {
				let e = u.value[t];
				e?.focus(), e?.select();
			});
		}
		function g(e, t) {
			let n = t.target.value, r = o.value.slice();
			r[e] = n, o.value = r, m();
		}
		function _(e, t) {
			t.preventDefault();
			let n = o.value.slice();
			n[e] = n[e].trim(), n.splice(e + 1, 0, ""), o.value = n, m(), h(e + 1);
		}
		function v(e, t) {
			if (o.value[e] !== "") return;
			t.preventDefault();
			let n = -1;
			for (let e = o.value.length - 1; e >= 0; --e) if (o.value[e] !== "") {
				n = e;
				break;
			}
			if (n === -1) return;
			let r = o.value.slice();
			r.splice(n, 1), o.value = r, m(), h(Math.max(n - 1, 0));
		}
		function y(e) {
			if (r.disabled) return;
			let t = o.value.slice();
			t.splice(e, 1), t.length || t.push(""), o.value = t, m(), h(Math.max(e - 1, 0));
		}
		let b = i(() => Z("mc-dynamic-input", "mc-sheen-sweep", `mc-dynamic-input--${r.variant}`, `mc-dynamic-input--${r.size}`, { "is-disabled": r.disabled }, r.customClass));
		return (n, r) => (A(), c("div", { class: C(b.value) }, [r[0] || (r[0] = l("span", {
			class: "mc-dynamic-input__grain mc-grain-overlay",
			"aria-hidden": "true"
		}, null, -1)), l("div", {
			class: "mc-dynamic-input__track",
			role: "list",
			"aria-disabled": t.disabled || void 0
		}, [(A(!0), c(e, null, P(o.value, (e, n) => (A(), c("span", {
			key: n,
			class: C(["mc-dynamic-input__pill", { "is-empty": e === "" }]),
			role: "listitem"
		}, [l("input", {
			ref_for: !0,
			ref: (e) => {
				e && (u.value[n] = e);
			},
			class: "mc-dynamic-input__field",
			value: e,
			placeholder: n === o.value.length - 1 ? t.placeholder : "",
			disabled: t.disabled,
			size: Math.max(e.length, 1),
			"aria-label": `value ${n + 1}`,
			autocomplete: "off",
			onInput: (e) => g(n, e),
			onKeydown: [K((e) => _(n, e), ["enter"]), K((e) => v(n, e), ["backspace"])]
		}, null, 40, Ld), e !== "" && !t.disabled ? (A(), c("button", {
			key: 0,
			type: "button",
			class: "mc-dynamic-input__remove",
			"aria-label": `remove ${e}`,
			onClick: (e) => y(n)
		}, [f($, {
			name: "close",
			size: 10,
			"stroke-width": 2.6
		})], 8, Rd)) : s("", !0)], 2))), 128))], 8, Id)], 2));
	}
}), [["__scopeId", "data-v-f976d107"]]), Bd = [
	"aria-label",
	"onKeydown",
	"onBlur"
], Vd = {
	key: 1,
	class: "mc-dynamic-tags__label"
}, Hd = [
	"aria-label",
	"disabled",
	"onClick"
], Ud = [
	"aria-label",
	"disabled",
	"onClick"
], Wd = [
	"placeholder",
	"disabled",
	"size",
	"aria-label",
	"aria-invalid",
	"aria-describedby"
], Gd = ["id"], Kd = 2600, qd = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiDynamicTags",
	__name: "DynamicTags",
	props: {
		modelValue: { default: () => [] },
		placeholder: { default: "Add a tag…" },
		max: { default: 0 },
		size: { default: "medium" },
		disabled: {
			type: Boolean,
			default: !1
		},
		color: { default: "accent" },
		beforeAdd: {},
		validator: {},
		onBeforeAdd: {},
		beforeRemove: {},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"remove",
		"edit",
		"reject"
	],
	setup(t, { emit: n }) {
		let a = t, o = n, u = Zt(), d = Fi("mc-dynamic-tags-error"), p = N(""), m = N(null), h = N(null), g = N(-1), _ = N(""), v = N(!1), y = N(""), b = i(() => a.modelValue ?? []), x = i(() => a.max > 0 && b.value.length >= a.max), w = i(() => y.value !== ""), T = i(() => ({
			add: u.value.dynamicTags?.add ?? "add a tag",
			remove: u.value.dynamicTags?.remove ?? "remove {tag}",
			edit: u.value.dynamicTags?.edit ?? "edit {tag}",
			empty: u.value.dynamicTags?.empty ?? "A tag cannot be empty",
			duplicate: u.value.dynamicTags?.duplicate ?? "This tag already exists",
			max: u.value.dynamicTags?.max ?? "You can only add {count} tags",
			rejected: u.value.dynamicTags?.rejected ?? "This tag was rejected",
			removeRejected: u.value.dynamicTags?.removeRejected ?? "This tag cannot be removed"
		})), D;
		function O(e) {
			D !== void 0 && (clearTimeout(D), D = void 0), y.value = e;
		}
		function k() {
			D !== void 0 && (clearTimeout(D), D = void 0), y.value = "";
		}
		function j(e) {
			O(e), D = setTimeout(() => {
				D = void 0, y.value = "";
			}, Kd);
		}
		async function M(e, t) {
			if (!e) return !0;
			try {
				return await e(t, b.value) !== !1;
			} catch {
				return !1;
			}
		}
		function F(e) {
			return e === !1 ? T.value.rejected : typeof e == "string" && e.trim() ? e : !0;
		}
		function I(e, t) {
			if (!e) return !0;
			try {
				return F(e(t));
			} catch {
				return T.value.rejected;
			}
		}
		async function L(e, t) {
			if (!e) return !0;
			try {
				return F(await e(t));
			} catch {
				return T.value.rejected;
			}
		}
		function z(e, t) {
			j(t), o("reject", e, t), p.value = "";
		}
		async function V() {
			if (a.disabled || v.value) return;
			let e = p.value.trim();
			if (!e) {
				p.value = "";
				return;
			}
			if (x.value) {
				O(T.value.max.replace("{count}", String(a.max)));
				return;
			}
			if (b.value.includes(e)) {
				O(T.value.duplicate), p.value = "";
				return;
			}
			let t = I(a.validator, e);
			if (t !== !0) {
				z(e, t);
				return;
			}
			if (v.value = !0, !await M(a.beforeAdd, e)) {
				v.value = !1, O(T.value.rejected), p.value = "";
				return;
			}
			let n = await L(a.onBeforeAdd, e);
			if (v.value = !1, n !== !0) {
				z(e, n);
				return;
			}
			let r = b.value.concat([e]);
			o("update:modelValue", r), o("change", r), p.value = "", k();
		}
		async function H(e) {
			if (a.disabled || v.value) return;
			let t = b.value[e];
			if (t === void 0) return;
			v.value = !0;
			let n = await M(a.beforeRemove, t);
			if (v.value = !1, !n) {
				O(T.value.removeRejected);
				return;
			}
			let r = b.value.filter((t, n) => n !== e);
			o("update:modelValue", r), o("change", r), o("remove", t), k(), S(() => m.value?.focus());
		}
		function W(e) {
			h.value = e ?? null;
		}
		function J(e) {
			if (a.disabled || v.value) return;
			let t = b.value[e];
			t !== void 0 && (g.value = e, _.value = t, k(), S(() => {
				let e = h.value;
				e?.focus(), e?.select();
			}));
		}
		function ne() {
			g.value = -1, _.value = "";
		}
		function re(e) {
			if (g.value !== e) return;
			let t = b.value[e];
			if (t === void 0) {
				ne();
				return;
			}
			let n = _.value.trim();
			if (!n) O(T.value.empty), ne(), S(() => m.value?.focus());
			else if (n !== t && b.value.some((t, r) => r !== e && t === n)) O(T.value.duplicate), ne(), S(() => m.value?.focus());
			else {
				if (n !== t) {
					let t = b.value.map((t, r) => r === e ? n : t);
					o("update:modelValue", t), o("change", t), o("edit", n);
				}
				ne(), k(), S(() => m.value?.focus());
			}
		}
		function ie(e) {
			e.key === "Enter" ? (e.preventDefault(), V()) : e.key === "Backspace" && !p.value && b.value.length && (e.preventDefault(), H(b.value.length - 1));
		}
		function Y() {
			V();
		}
		G(() => a.max, () => {
			x.value && (p.value = "");
		}), E(() => {
			D !== void 0 && (clearTimeout(D), D = void 0);
		});
		let ae = i(() => Z("mc-dynamic-tags", "mc-sheen-sweep", `mc-dynamic-tags--${a.size}`, `mc-dynamic-tags--${a.color}`, {
			"is-disabled": a.disabled,
			"is-full": x.value,
			"is-error": w.value,
			"is-busy": v.value
		}, a.customClass));
		return (n, i) => (A(), c("div", { class: C(ae.value) }, [
			i[3] || (i[3] = l("span", {
				class: "mc-dynamic-tags__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			f(r, {
				tag: "div",
				class: "mc-dynamic-tags__list",
				name: "mc-tag-pop"
			}, {
				default: ee(() => [(A(!0), c(e, null, P(b.value, (e, n) => (A(), c("span", {
					key: e,
					class: "mc-dynamic-tags__tag",
					role: "listitem"
				}, [
					g.value === n ? te((A(), c("input", {
						key: 0,
						ref_for: !0,
						ref: W,
						"onUpdate:modelValue": i[0] || (i[0] = (e) => _.value = e),
						class: "mc-dynamic-tags__edit",
						type: "text",
						"aria-label": T.value.edit.replace("{tag}", e),
						autocomplete: "off",
						onKeydown: [K(q((e) => re(n), ["prevent"]), ["enter"]), i[1] || (i[1] = K(q((e) => ne(), ["prevent"]), ["esc"]))],
						onBlur: (e) => re(n)
					}, null, 40, Bd)), [[U, _.value]]) : (A(), c("span", Vd, R(e), 1)),
					!t.disabled && g.value !== n ? (A(), c("button", {
						key: 2,
						type: "button",
						class: "mc-dynamic-tags__action",
						"aria-label": T.value.edit.replace("{tag}", e),
						disabled: v.value,
						onClick: (e) => J(n)
					}, [f($, {
						name: "edit",
						size: 11,
						"stroke-width": 2.2
					})], 8, Hd)) : s("", !0),
					t.disabled ? s("", !0) : (A(), c("button", {
						key: 3,
						type: "button",
						class: "mc-dynamic-tags__action mc-dynamic-tags__remove",
						"aria-label": T.value.remove.replace("{tag}", e),
						disabled: v.value,
						onClick: (e) => H(n)
					}, [f($, {
						name: "close",
						size: 10,
						"stroke-width": 2.6
					})], 8, Ud))
				]))), 128))]),
				_: 1
			}),
			te(l("input", {
				ref_key: "input",
				ref: m,
				"onUpdate:modelValue": i[2] || (i[2] = (e) => p.value = e),
				class: C(["mc-dynamic-tags__input", { "is-error": w.value }]),
				placeholder: x.value ? "" : t.placeholder,
				disabled: t.disabled || x.value,
				size: Math.max(p.value.length, 1),
				"aria-label": t.placeholder || T.value.add,
				"aria-invalid": w.value || void 0,
				"aria-describedby": w.value ? B(d) : void 0,
				autocomplete: "off",
				onKeydown: ie,
				onBlur: Y
			}, null, 42, Wd), [[U, p.value]]),
			w.value ? (A(), c("p", {
				key: 0,
				id: B(d),
				class: "mc-dynamic-tags__error",
				role: "alert"
			}, R(y.value), 9, Gd)) : s("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-70c5775e"]]), Jd = ["role"], Yd = ["role"], Xd = ["role"], Zd = ["role"], Qd = ["role"], $d = ["role"], ef = ["role"], tf = ["role"], nf = ["role"], rf = ["role"], af = ["role"], of = ["role"], sf = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiElement",
	__name: "Element",
	props: {
		as: { default: "div" },
		role: {},
		inline: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => Z("mc-element", { "is-inline": t.inline }, t.customClass)), r = [
			"div",
			"span",
			"p",
			"section",
			"article",
			"aside",
			"header",
			"footer",
			"main",
			"nav",
			"label"
		], a = i(() => r.includes(t.as) ? t.as : "div");
		return (t, r) => a.value === "div" ? (A(), c("div", {
			key: 0,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, Jd)) : a.value === "span" ? (A(), c("span", {
			key: 1,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, Yd)) : a.value === "p" ? (A(), c("p", {
			key: 2,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, Xd)) : a.value === "section" ? (A(), c("section", {
			key: 3,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, Zd)) : a.value === "article" ? (A(), c("article", {
			key: 4,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, Qd)) : a.value === "aside" ? (A(), c("aside", {
			key: 5,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, $d)) : a.value === "header" ? (A(), c("header", {
			key: 6,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, ef)) : a.value === "footer" ? (A(), c("footer", {
			key: 7,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, tf)) : a.value === "main" ? (A(), c("main", {
			key: 8,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, nf)) : a.value === "nav" ? (A(), c("nav", {
			key: 9,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, rf)) : a.value === "label" ? (A(), c("label", {
			key: 10,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, af)) : (A(), c("div", {
			key: 11,
			class: C(n.value),
			role: e.role
		}, [F(t.$slots, "default", {}, void 0, !0)], 10, of));
	}
}), [["__scopeId", "data-v-032e1793"]]), cf = ["title"], lf = ["disabled", "aria-expanded"], uf = { class: "mc-ellipsis__toggle-inner" }, df = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiEllipsis",
	__name: "Ellipsis",
	props: {
		text: {},
		lines: { default: 1 },
		tooltip: {
			type: Boolean,
			default: !1
		},
		expandable: {
			type: Boolean,
			default: !1
		},
		direction: { default: "horizontal" },
		showMore: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(!1), r = Zt(), a = i(() => r.value.ellipsis?.expand ?? "Expand"), o = i(() => r.value.ellipsis?.collapse ?? "Collapse"), u = i(() => `mc-ellipsis--clamp-${Math.min(4, Math.max(1, t.lines))}`), p = i(() => Z("mc-ellipsis", u.value, `mc-ellipsis--${t.direction}`, {
			"is-expanded": n.value,
			"is-expandable": t.expandable,
			"is-disabled": t.disabled
		}, t.customClass));
		function m() {
			t.disabled || (n.value = !n.value);
		}
		return (t, r) => (A(), c("span", {
			class: C(p.value),
			title: e.tooltip ? e.text : void 0
		}, [l("span", { class: C(["mc-ellipsis__text", { "is-faded": e.showMore }]) }, R(e.text), 3), e.expandable ? (A(), c("button", {
			key: 0,
			class: "mc-ellipsis__toggle",
			type: "button",
			disabled: e.disabled,
			"aria-expanded": n.value,
			onClick: m
		}, [l("span", uf, [d(R(n.value ? o.value : a.value) + " ", 1), f($, {
			name: n.value ? "chevron-up" : "chevron-down",
			size: 12
		}, null, 8, ["name"])])], 8, lf)) : s("", !0)], 10, cf));
	}
}), [["__scopeId", "data-v-4d54de31"]]), ff = [
	{
		key: "smileys",
		label: "表情",
		icon: "heart",
		emojis: /* @__PURE__ */ "😀.😃.😄.😁.😆.😅.🤣.😂.🙂.🙃.😉.😊.😇.🥰.😍.🤩.😘.😗.😚.😙.😋.😛.😜.🤪.😝.🤗.🤔.🤨.😐.😑.😶.😏.😒.🙄.😬.😴.🤤.😪.😵.🥴".split(".")
	},
	{
		key: "gestures",
		label: "手势",
		icon: "sparkles",
		emojis: [
			"👍",
			"👎",
			"👌",
			"✌️",
			"🤞",
			"🤝",
			"👏",
			"🙌",
			"🙏",
			"💪",
			"🫶",
			"🤙"
		]
	},
	{
		key: "hearts",
		label: "爱心",
		icon: "heart",
		emojis: [
			"❤️",
			"🧡",
			"💛",
			"💚",
			"💙",
			"💜",
			"🖤",
			"🤍",
			"🤎",
			"💖",
			"💘",
			"💝"
		]
	},
	{
		key: "animals",
		label: "动物",
		icon: "zap",
		emojis: [
			"🐱",
			"🐰",
			"🐻",
			"🐼",
			"🐨",
			"🦊",
			"🐶",
			"🐈",
			"🦄",
			"🐝",
			"🦋",
			"🐳"
		]
	},
	{
		key: "food",
		label: "食物",
		icon: "sparkles",
		emojis: [
			"🍓",
			"🍑",
			"🍒",
			"🍉",
			"🍇",
			"🍋",
			"🥑",
			"🍕",
			"🍰",
			"🍡",
			"🍪",
			"☕"
		]
	},
	{
		key: "symbols",
		label: "符号",
		icon: "sparkles",
		emojis: [
			"✨",
			"⭐",
			"🌟",
			"💫",
			"🔥",
			"💥",
			"🎉",
			"🎊",
			"💖",
			"✅",
			"❌",
			"❓"
		]
	}
], pf = ["disabled", "aria-expanded"], mf = {
	key: 0,
	class: "mc-emoji__value"
}, hf = { class: "mc-emoji__search" }, gf = ["placeholder"], _f = {
	key: 0,
	class: "mc-emoji__section"
}, vf = { class: "mc-emoji__grid" }, yf = ["disabled", "onClick"], bf = ["data-emoji-category"], xf = { class: "mc-emoji__section-title" }, Sf = { class: "mc-emoji__grid" }, Cf = ["disabled", "onClick"], wf = {
	key: 0,
	class: "mc-emoji__empty mc-aurora-inset"
}, Tf = { class: "mc-emoji__tabs" }, Ef = [
	"disabled",
	"aria-pressed",
	"onClick"
], Df = "mochi-ui:recent-emoji", Of = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiEmoji",
	__name: "Emoji",
	props: {
		modelValue: {},
		categories: { default: () => ff },
		placeholder: { default: "搜索表情…" },
		trigger: { default: "click" },
		placement: { default: "bottom-start" },
		width: { default: 320 },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "select"],
	setup(r, { emit: a }) {
		let u = r, p = a, m = An(), h = N(!1), { isTop: g } = On({ active: h }), _ = Tn({ active: h }), v = N(""), y = N(u.categories[0]?.key ?? ""), b = N(null), S = N(null), { style: w } = _n(b, S, {
			placement: u.placement,
			offset: 8,
			zIndex: _
		});
		Sc(b, () => h.value = !1, { ignore: [S] });
		function T() {
			if (typeof localStorage > "u") return [];
			try {
				let e = localStorage.getItem(Df);
				return e ? JSON.parse(e) : [];
			} catch {
				return [];
			}
		}
		let D = N(T());
		function O(e) {
			let t = [e, ...D.value.filter((t) => t !== e)].slice(0, 16);
			D.value = t;
			try {
				localStorage.setItem(Df, JSON.stringify(t));
			} catch {}
		}
		let k = i(() => {
			let e = v.value.trim().toLowerCase();
			return e ? u.categories.map((t) => ({
				...t,
				emojis: t.emojis.filter((t) => t.includes(e))
			})).filter((e) => e.emojis.length) : u.categories;
		});
		function j(e) {
			u.disabled || (p("update:modelValue", e), p("select", e), O(e), h.value = !1);
		}
		function M() {
			u.disabled || (h.value = !h.value);
		}
		let I = N(null);
		function L(e) {
			y.value = e;
			let t = I.value;
			if (!t) return;
			let n = t.querySelector(`[data-emoji-category="${e}"]`);
			n && t.scrollTo({
				top: Math.max(0, n.offsetTop - 8),
				behavior: "smooth"
			});
		}
		function z() {
			let e = I.value;
			if (!e) return;
			let t = e.scrollTop + 12, n = "";
			for (let r of Array.from(e.querySelectorAll("[data-emoji-category]"))) r.offsetTop <= t && (n = r.dataset.emojiCategory ?? n);
			n || (n = e.querySelector("[data-emoji-category]")?.dataset.emojiCategory ?? ""), n && (y.value = n);
		}
		function V(e) {
			e.key === "Escape" && h.value && g() && (e.stopPropagation(), h.value = !1, b.value?.focus());
		}
		G(h, (e) => {
			e && (v.value = ""), typeof document < "u" && (document.removeEventListener("keydown", V), e && document.addEventListener("keydown", V));
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", V);
		}), G(() => u.disabled, (e) => {
			e && (h.value = !1);
		});
		let H = i(() => {
			if (u.teleport !== !1) return typeof u.teleport == "string" ? u.teleport : "body";
		});
		return (i, a) => (A(), c("span", { class: C(["mc-emoji", B(Z)(r.customClass)]) }, [l("button", {
			ref_key: "triggerRef",
			ref: b,
			class: "mc-emoji__trigger",
			type: "button",
			"aria-label": "选择表情",
			disabled: r.disabled,
			"aria-expanded": h.value,
			onClick: M,
			onMouseenter: a[0] || (a[0] = (e) => r.trigger === "hover" && !r.disabled && (h.value = !0))
		}, [F(i.$slots, "default", { emoji: r.modelValue }, () => [r.modelValue ? (A(), c("span", mf, R(r.modelValue), 1)) : (A(), o($, {
			key: 1,
			name: "heart",
			size: 18
		}))], !0)], 40, pf), (A(), o(t, { to: H.value }, [f(n, { name: "mc-emoji-fade" }, {
			default: ee(() => [h.value ? (A(), c("div", x({
				key: 0,
				ref_key: "panelRef",
				ref: S,
				class: "mc-emoji__panel mc-grain-overlay",
				style: {
					...B(w),
					width: `${r.width}px`
				}
			}, B(m)), [
				l("div", hf, [f($, {
					name: "search",
					size: 14
				}), te(l("input", {
					"onUpdate:modelValue": a[1] || (a[1] = (e) => v.value = e),
					type: "text",
					placeholder: r.placeholder,
					onKeydown: a[2] || (a[2] = K((e) => h.value = !1, ["esc"]))
				}, null, 40, gf), [[U, v.value]])]),
				D.value.length && !v.value ? (A(), c("div", _f, [a[3] || (a[3] = l("div", { class: "mc-emoji__section-title" }, "最近使用", -1)), l("div", vf, [(A(!0), c(e, null, P(D.value, (e) => (A(), c("button", {
					key: e,
					class: "mc-emoji__cell",
					type: "button",
					disabled: r.disabled,
					onClick: (t) => j(e)
				}, R(e), 9, yf))), 128))])])) : s("", !0),
				l("div", {
					ref_key: "bodyRef",
					ref: I,
					class: "mc-emoji__body mc-scroll",
					onScrollPassive: z
				}, [(A(!0), c(e, null, P(k.value, (t) => (A(), c("div", {
					key: t.key,
					class: "mc-emoji__section",
					"data-emoji-category": t.key
				}, [l("div", xf, [f($, {
					name: t.icon,
					size: 12
				}, null, 8, ["name"]), d(" " + R(t.label), 1)]), l("div", Sf, [(A(!0), c(e, null, P(t.emojis, (e) => (A(), c("button", {
					key: e,
					class: "mc-emoji__cell",
					type: "button",
					disabled: r.disabled,
					onClick: (t) => j(e)
				}, R(e), 9, Cf))), 128))])], 8, bf))), 128)), k.value.length ? s("", !0) : (A(), c("p", wf, [...a[4] || (a[4] = [l("span", { class: "mc-emoji__empty-text" }, "没有找到表情", -1)])]))], 544),
				l("div", Tf, [(A(!0), c(e, null, P(r.categories, (e) => (A(), c("button", {
					key: e.key,
					class: C(["mc-emoji__tab mc-sheen-sweep", { "is-active": y.value === e.key }]),
					type: "button",
					disabled: r.disabled,
					"aria-pressed": y.value === e.key,
					onClick: (t) => L(e.key)
				}, [f($, {
					name: e.icon,
					size: 15
				}, null, 8, ["name"])], 10, Ef))), 128))])
			], 16)) : s("", !0)]),
			_: 1
		})], 8, ["to"]))], 2));
	}
}), [["__scopeId", "data-v-e10ff665"]]), kf = { class: "mc-empty__art" }, Af = { class: "mc-empty__figure" }, jf = {
	key: 0,
	class: "mc-empty__status"
}, Mf = {
	key: 0,
	class: "mc-empty__description"
}, Nf = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiEmpty",
	__name: "Empty",
	props: {
		description: { default: "" },
		image: { default: "box" },
		status: {},
		size: { default: "medium" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => t.size === "small" ? 26 : t.size === "large" ? 58 : 40), r = i(() => Z("mc-empty", `mc-empty--${t.size}`, { "has-status": !!t.status }, t.customClass));
		return (t, i) => (A(), c("div", {
			class: C(r.value),
			role: "status"
		}, [l("div", kf, [
			i[0] || (i[0] = l("span", {
				class: "mc-empty__halo",
				"aria-hidden": "true"
			}, null, -1)),
			i[1] || (i[1] = l("span", {
				class: "mc-empty__ring mc-sheen-sweep",
				"aria-hidden": "true"
			}, [l("span", { class: "mc-empty__grain mc-grain-overlay" })], -1)),
			l("span", Af, [F(t.$slots, "image", {}, () => [f($, {
				name: e.image,
				class: "mc-empty__icon",
				size: n.value,
				"stroke-width": 1.5
			}, null, 8, ["name", "size"])], !0)]),
			e.status ? (A(), c("span", jf, [f($, {
				name: e.status,
				size: 14,
				"stroke-width": 2.2,
				label: e.status
			}, null, 8, ["name", "label"])])) : s("", !0),
			i[2] || (i[2] = l("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--a",
				"aria-hidden": "true"
			}, null, -1)),
			i[3] || (i[3] = l("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--b",
				"aria-hidden": "true"
			}, null, -1)),
			i[4] || (i[4] = l("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--c",
				"aria-hidden": "true"
			}, null, -1))
		]), e.description || t.$slots.default ? (A(), c("p", Mf, [F(t.$slots, "default", {}, () => [d(R(e.description), 1)], !0)])) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-009091d0"]]), Pf = ["aria-label"], Ff = { class: "mc-equation__inner" }, If = {
	key: 0,
	class: "mc-equation__sup"
}, Lf = {
	key: 1,
	class: "mc-equation__sub"
}, Rf = {
	key: 2,
	class: "mc-equation__frac"
}, zf = { class: "mc-equation__num" }, Bf = { class: "mc-equation__den" }, Vf = { key: 4 }, Hf = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiEquation",
	__name: "Equation",
	props: {
		formula: { default: "" },
		display: {
			type: Boolean,
			default: !1
		},
		errorColor: {},
		customClass: {}
	},
	setup(t) {
		let n = t, r = {
			alpha: "α",
			beta: "β",
			gamma: "γ",
			delta: "δ",
			epsilon: "ε",
			zeta: "ζ",
			eta: "η",
			theta: "θ",
			lambda: "λ",
			mu: "μ",
			pi: "π",
			rho: "ρ",
			sigma: "σ",
			tau: "τ",
			phi: "φ",
			omega: "ω",
			Delta: "Δ",
			Sigma: "Σ",
			Omega: "Ω"
		}, a = {
			times: "×",
			div: "÷",
			pm: "±",
			cdot: "·",
			leq: "≤",
			geq: "≥",
			neq: "≠",
			approx: "≈",
			infty: "∞",
			sum: "∑",
			int: "∫",
			sqrt: "√",
			rightarrow: "→",
			leftarrow: "←",
			partial: "∂",
			nabla: "∇"
		}, o = i(() => {
			let e = n.formula ?? "", t = [], i = 0, o = "", s = () => {
				o && (t.push({
					type: "text",
					value: o
				}), o = "");
			};
			for (; i < e.length;) {
				let n = e[i];
				if (n === "\\") {
					let n = /\\([A-Za-z]+)/.exec(e.slice(i));
					if (n) {
						s();
						let o = n[1];
						if (o === "frac") {
							let r = e.slice(i + n[0].length), a = /^\{([^{}]*)\}/.exec(r)?.[1] ?? "", o = /^\{[^{}]*\}/.exec(r.slice(a ? a.length + 2 : 0))?.[1] ?? "";
							t.push({
								type: "frac",
								value: "",
								num: a,
								den: o
							}), i += n[0].length + (a ? a.length + 2 : 0) + (o ? o.length + 2 : 0);
							continue;
						}
						if (o === "sqrt") {
							s();
							let r = e.slice(i + n[0].length), a = /^\{([^{}]*)\}/.exec(r)?.[1] ?? "";
							t.push({
								type: "text",
								value: `√${a}`
							}), i += n[0].length + (a ? a.length + 2 : 0);
							continue;
						}
						let c = r[o] ?? a[o];
						c ? t.push({
							type: "text",
							value: c
						}) : t.push({
							type: "error",
							value: o
						}), i += n[0].length;
						continue;
					}
				}
				if (n === "^" || n === "_") {
					s();
					let r = n === "^", a = e.slice(i + 1), o, c;
					a.startsWith("{") ? (o = /^\{([^{}]*)\}/.exec(a)?.[1] ?? "", c = o.length + 2) : (o = a[0] ?? "", c = 1), t.push({
						type: r ? "sup" : "sub",
						value: o
					}), i += 1 + c;
				} else o += n, i++;
			}
			return s(), t;
		}), s = i(() => Z("mc-equation", {
			"is-display": n.display,
			"mc-sheen-sweep": n.display
		}, n.customClass)), u = i(() => {
			let e = "";
			for (let t of o.value) t.type === "sup" ? e += ` power ${t.value} ` : t.type === "sub" ? e += ` subscript ${t.value} ` : t.type === "frac" ? e += ` ${t.num} over ${t.den} ` : e += t.value;
			return e.replace(/\s+/g, " ").trim();
		});
		return (n, r) => (A(), c("span", {
			class: C(s.value),
			"aria-label": u.value || void 0
		}, [l("span", Ff, [(A(!0), c(e, null, P(o.value, (n, r) => (A(), c(e, { key: r }, [n.type === "sup" ? (A(), c("sup", If, R(n.value), 1)) : n.type === "sub" ? (A(), c("sub", Lf, R(n.value), 1)) : n.type === "frac" ? (A(), c("span", Rf, [l("span", zf, R(n.num), 1), l("span", Bf, R(n.den), 1)])) : n.type === "error" ? (A(), c("span", {
			key: 3,
			class: "mc-equation__error",
			style: T(t.errorColor ? { color: t.errorColor } : void 0)
		}, R(n.value), 5)) : (A(), c("span", Vf, R(n.value), 1))], 64))), 128))])], 10, Pf));
	}
}), [["__scopeId", "data-v-efd6cf14"]]), Uf = {
	key: 1,
	class: "mc-error-boundary__panel mc-grain-overlay",
	role: "alert",
	"aria-live": "assertive"
}, Wf = {
	class: "mc-error-boundary__emblem",
	"aria-hidden": "true"
}, Gf = {
	class: "mc-error-boundary__title",
	"data-mc-type": "title"
}, Kf = {
	key: 0,
	class: "mc-error-boundary__description"
}, qf = {
	key: 1,
	class: "mc-error-boundary__stack"
}, Jf = { class: "mc-error-boundary__actions" }, Yf = {
	key: 2,
	class: "mc-error-boundary__minimal",
	role: "alert",
	"aria-live": "assertive"
}, Xf = { class: "mc-error-boundary__minimal-text" }, Zf = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiErrorBoundary",
	__name: "ErrorBoundary",
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		fallback: { default: "panel" },
		title: { default: "出了点问题" },
		description: { default: "" },
		showStack: {
			type: Boolean,
			default: !1
		},
		onError: {},
		retryText: { default: "重试" },
		customClass: {}
	},
	emits: ["error", "retry"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(null), u = N(""), d = N(!1), p = N(0), m = i(() => o.value ?? /* @__PURE__ */ Error("Unknown error"));
		function h(e) {
			return e instanceof Error ? e : Error(typeof e == "string" ? e : JSON.stringify(e));
		}
		function g(e, t) {
			a("error", e, t);
		}
		let _ = !1;
		D((e, t, n) => {
			if (r.disabled) return !0;
			if (_ || d.value) return !1;
			_ = !0, d.value = !0;
			let i = h(e);
			return o.value = i, u.value = n, g(i, n), S(() => {
				_ = !1;
			}), !1;
		});
		function v() {
			_ = !1, d.value = !1, o.value = null, u.value = "", p.value += 1, a("retry");
		}
		function y() {
			_ = !1, d.value = !1, o.value = null, u.value = "", p.value += 1;
		}
		G(() => r.disabled, (e) => {
			e && y();
		});
		let b = i(() => Z("mc-error-boundary", `mc-error-boundary--${r.fallback}`, {
			"is-failed": d.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (A(), c("div", { class: C(b.value) }, [d.value ? (A(), c(e, { key: 1 }, [n.$slots.fallback ? F(n.$slots, "fallback", {
			error: m.value,
			retry: v
		}, void 0, !0, 0) : t.fallback === "panel" ? (A(), c("div", Uf, [r[0] || (r[0] = l("span", {
			class: "mc-error-boundary__aurora",
			"aria-hidden": "true"
		}, null, -1)), F(n.$slots, "error", {
			error: m.value,
			retry: v
		}, () => [
			l("span", Wf, [f($, {
				name: "alert-triangle",
				size: 28,
				"stroke-width": 1.7
			})]),
			l("h3", Gf, R(t.title), 1),
			t.description ? (A(), c("p", Kf, R(t.description), 1)) : s("", !0),
			t.showStack && m.value.stack ? (A(), c("pre", qf, R(m.value.stack), 1)) : s("", !0),
			l("div", Jf, [l("button", {
				type: "button",
				class: "mc-error-boundary__retry",
				onClick: v
			}, [f($, {
				name: "rotate-cw",
				size: 15,
				"stroke-width": 2
			}), l("span", null, R(t.retryText), 1)])])
		], !0)])) : t.fallback === "minimal" ? (A(), c("p", Yf, [
			f($, {
				name: "alert-circle",
				size: 15,
				"stroke-width": 2,
				class: "mc-error-boundary__minimal-icon"
			}),
			l("span", Xf, R(t.title), 1),
			l("button", {
				type: "button",
				class: "mc-error-boundary__minimal-action",
				onClick: v
			}, R(t.retryText), 1)
		])) : s("", !0)], 64)) : (A(), c("div", {
			key: p.value,
			class: "mc-error-boundary__content"
		}, [F(n.$slots, "default", {}, void 0, !0)]))], 2));
	}
}), [["__scopeId", "data-v-243bb489"]]), Qf = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiFlex",
	__name: "Flex",
	props: {
		direction: { default: "row" },
		justify: { default: "flex-start" },
		align: { default: "stretch" },
		wrap: {
			type: Boolean,
			default: !1
		},
		gap: {},
		inline: {
			type: Boolean,
			default: !1
		},
		flex: {},
		padding: {},
		margin: {},
		bordered: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			8,
			10,
			12,
			16,
			20,
			24
		], n = e;
		function r(e) {
			if (e != null) return typeof e == "number" ? t.includes(e) ? `var(--mc-space-${e})` : `calc(var(--mc-space-1) * ${e})` : e;
		}
		let a = i(() => ({
			display: n.inline ? "inline-flex" : "flex",
			flexDirection: n.direction,
			justifyContent: n.justify,
			alignItems: n.align,
			flexWrap: n.wrap ? "wrap" : "nowrap",
			gap: r(n.gap),
			flex: n.flex === void 0 ? void 0 : typeof n.flex == "number" ? `${n.flex} 1 0%` : n.flex,
			padding: r(n.padding),
			margin: r(n.margin)
		})), o = i(() => Z("mc-flex", `mc-flex--${n.direction}`, {
			"is-inline": n.inline,
			"is-wrap": n.wrap,
			"is-bordered": n.bordered
		}, n.customClass));
		return (e, t) => (A(), c("div", {
			class: C(o.value),
			style: T(a.value)
		}, [F(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-00592234"]]), $f = { class: "mc-float-button__stack" }, ep = ["aria-hidden"], tp = {
	key: 0,
	class: "mc-float-button__tip"
}, np = [
	"disabled",
	"tabindex",
	"aria-label",
	"onClick"
], rp = [
	"disabled",
	"aria-label",
	"aria-expanded"
], ip = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiFloatButton",
	__name: "FloatButton",
	props: {
		actions: { default: () => [] },
		position: { default: "bottom-right" },
		direction: { default: "vertical" },
		trigger: { default: "click" },
		icon: { default: "plus" },
		closeIcon: { default: "close" },
		size: { default: 52 },
		visible: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		zIndex: { default: 1200 },
		customClass: {}
	},
	emits: [
		"update:open",
		"open",
		"close",
		"select"
	],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n, u = N(!1), d = N(null), { isTop: p } = On({ active: u });
		function m(e = !0) {
			u.value = !1, o("update:open", !1), o("close"), e && S(() => d.value?.focus({ preventScroll: !0 }));
		}
		function h(e) {
			e.key === "Escape" && u.value && p() && (e.stopPropagation(), m());
		}
		function g() {
			r.disabled || (u.value = !u.value, o("update:open", u.value), u.value ? o("open") : o("close"));
		}
		function _(e) {
			r.disabled || (e.action?.(), o("select", e), m());
		}
		let v = i(() => ({
			zIndex: r.zIndex,
			"--mc-float-size": `${r.size}px`
		})), y = i(() => Z("mc-float-button", `is-${r.position}`, `is-${r.direction}`, {
			"is-open": u.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => t.visible ? (A(), c("div", {
			key: 0,
			class: C(y.value),
			style: T(v.value),
			onMouseleave: r[1] || (r[1] = (e) => t.trigger === "hover" && !t.disabled && (u.value = !1)),
			onKeydown: h
		}, [l("div", $f, [(A(!0), c(e, null, P(t.actions, (e, n) => (A(), c("div", {
			key: e.key ?? n,
			class: "mc-float-button__item",
			style: T({
				"--mc-float-index": t.actions.length - 1 - n,
				"--mc-float-color": e.color ?? "var(--mc-accent)"
			}),
			"aria-hidden": u.value ? void 0 : "true"
		}, [e.tooltip || e.label ? (A(), c("span", tp, R(e.tooltip ?? e.label), 1)) : s("", !0), l("button", {
			class: "mc-float-button__mini",
			type: "button",
			disabled: t.disabled,
			tabindex: u.value ? void 0 : -1,
			"aria-label": e.tooltip ?? e.label ?? e.icon,
			onClick: (t) => _(e)
		}, [f($, {
			name: e.icon,
			size: 19
		}, null, 8, ["name"])], 8, np)], 12, ep))), 128))]), l("button", {
			ref_key: "mainButton",
			ref: d,
			class: "mc-float-button__main",
			type: "button",
			disabled: t.disabled,
			"aria-label": u.value ? B(a).floatButton?.close ?? "Close actions" : B(a).floatButton?.open ?? "Open actions",
			"aria-expanded": u.value,
			onClick: g,
			onMouseenter: r[0] || (r[0] = (e) => t.trigger === "hover" && !t.disabled && (u.value = !0))
		}, [
			r[2] || (r[2] = l("span", {
				class: "mc-float-button__halo",
				"aria-hidden": "true"
			}, null, -1)),
			r[3] || (r[3] = l("span", {
				class: "mc-float-button__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			f($, {
				name: u.value ? t.closeIcon : t.icon,
				size: 22,
				class: "mc-float-button__icon"
			}, null, 8, ["name"])
		], 40, rp)], 38)) : s("", !0);
	}
}), [["__scopeId", "data-v-d8edccd9"]]), ap = Symbol("mochi-form"), op = { class: "mc-form__body" }, sp = {
	key: 0,
	class: "mc-form__footer"
}, cp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiForm",
	__name: "Form",
	props: {
		modelValue: { default: () => ({}) },
		rules: { default: () => [] },
		layout: { default: "horizontal" },
		labelWidth: { default: 120 },
		labelPosition: { default: "right" },
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		validateOnRuleChange: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"submit",
		"validate"
	],
	setup(e, { expose: t, emit: n }) {
		let r = e, a = n, o = N({ ...r.modelValue ?? {} }), u = M({ ...r.modelValue ?? {} }), d = !1;
		G(() => r.modelValue, (e) => {
			d = !0, o.value = { ...e ?? {} }, S(() => {
				d = !1;
			});
		}, { deep: !0 }), G(o, (e) => {
			d ? d = !1 : (a("update:modelValue", { ...e }), a("change", { ...e }));
		}, { deep: !0 });
		let f = N({}), p = N({}), m = i(() => typeof r.labelWidth == "number" ? `${r.labelWidth}px` : r.labelWidth);
		function h(e) {
			if (e) return Object.prototype.hasOwnProperty.call(o.value, e) ? o.value[e] : e.split(".").reduce((e, t) => e == null ? e : e[t], o.value);
		}
		function g(e, t) {
			if (e) {
				if (e.includes(".")) {
					let n = e.split("."), r = { ...o.value }, i = r;
					for (let e = 0; e < n.length - 1; e += 1) {
						let t = n[e];
						i[t] = { ...i[t] ?? {} }, i = i[t];
					}
					i[n[n.length - 1]] = t, o.value = r;
				} else o.value = {
					...o.value,
					[e]: t
				};
			}
		}
		function _(e) {
			return !!(e == null || e === "" || Array.isArray(e) && e.length === 0);
		}
		async function v(e, t) {
			if (e.required && _(t)) return e.message ?? `${e.label ?? e.key} is required`;
			if (e.validator) return new Promise((n) => {
				let r = !1, i = (e) => {
					r || (r = !0, n(e == null ? void 0 : typeof e == "string" ? e : e.message));
				}, a;
				try {
					a = e.validator(e, t, i);
				} catch (e) {
					i(e instanceof Error ? e.message : String(e));
					return;
				}
				a === !1 ? i(e.message ?? `${e.label ?? e.key} is invalid`) : typeof a == "string" ? i(a) : a && typeof a.then == "function" && a.then(() => i(void 0)).catch((e) => i(e instanceof Error ? e.message : String(e)));
			});
		}
		function y(e, t) {
			let n = { ...p.value };
			t ? n[e] = t : delete n[e], p.value = n;
		}
		async function b(e) {
			let t = r.rules.filter((t) => t.key === e);
			if (!t.length) {
				y(e, void 0);
				return;
			}
			let n = h(e);
			for (let r of t) {
				let t = await v(r, n);
				if (t) return y(e, t), t;
			}
			y(e, void 0);
		}
		async function x() {
			let e = Object.keys(f.value), t = (await Promise.all(e.map((e) => b(e)))).every((e) => !e);
			return a("validate", t), t;
		}
		function w(e) {
			e ? y(e, void 0) : p.value = {};
		}
		function E() {
			let e = {};
			for (let t of Object.keys(u)) e[t] = u[t];
			d = !0, o.value = e, a("update:modelValue", { ...e }), p.value = {};
		}
		function D(e) {
			f.value = {
				...f.value,
				[e.key]: e
			};
		}
		function O(e) {
			let t = { ...f.value };
			delete t[e], f.value = t;
		}
		G(() => r.rules, () => {
			r.validateOnRuleChange && x();
		}, { deep: !0 }), t({
			validate: x,
			resetFields: E,
			clearValidate: w,
			validateField: b,
			errors: p,
			model: o
		});
		let k = {
			model: o,
			errors: p,
			layout: i(() => r.layout),
			labelWidth: m,
			labelPosition: i(() => r.labelPosition),
			disabled: i(() => r.disabled),
			size: i(() => r.size),
			register: D,
			unregister: O,
			setError: y,
			validateField: b,
			validate: x,
			resetFields: E,
			clearValidate: w,
			setFieldValue: g
		};
		j(ap, k);
		async function P(e) {
			e.preventDefault(), await x() && a("submit", { ...o.value });
		}
		let I = i(() => Z("mc-form", `mc-form--${r.layout}`, `mc-form--${r.size}`, { "is-disabled": r.disabled }, r.customClass));
		return (e, t) => (A(), c("form", {
			class: C(I.value),
			style: T({ "--mc-form-label-width": m.value }),
			novalidate: "",
			onSubmit: P
		}, [l("div", op, [F(e.$slots, "default", {}, void 0, !0)]), e.$slots.footer ? (A(), c("footer", sp, [F(e.$slots, "footer", {}, void 0, !0)])) : s("", !0)], 38));
	}
}), [["__scopeId", "data-v-fe12f720"]]), lp = {
	key: 0,
	class: "mc-form-item__label"
}, up = {
	key: 0,
	class: "mc-form-item__asterisk",
	"aria-hidden": "true"
}, dp = { class: "mc-form-item__label-text" }, fp = { class: "mc-form-item__content" }, pp = ["aria-describedby", "aria-invalid"], mp = ["role", "aria-live"], hp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiFormItem",
	__name: "FormItem",
	props: {
		label: { default: "" },
		prop: { default: "" },
		required: {
			type: Boolean,
			default: !1
		},
		error: { default: void 0 },
		feedback: { default: "" },
		labelWidth: { default: void 0 },
		showLabel: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	setup(e) {
		let t = e, r = v(ap, null), a = `${Fi("mc-form-item")}-message`, u = N(0), p = i(() => t.prop && r ? r.errors.value[t.prop] : void 0), m = i(() => t.error ?? p.value), h = i(() => t.required), g = i(() => !!m.value), _ = i(() => !!(m.value || t.feedback)), y = i(() => {
			let e = t.labelWidth ?? r?.labelWidth.value;
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		});
		G(() => m.value, (e) => {
			e && (u.value += 1);
		}), r && t.prop && (r.register({
			key: t.prop,
			label: t.label,
			required: t.required
		}), E(() => r.unregister(t.prop)));
		function b() {
			r && t.prop && r.validateField(t.prop);
		}
		function x(e) {
			let t = e.relatedTarget;
			t && e.currentTarget?.contains(t) || b();
		}
		let S = i(() => Z("mc-form-item", {
			"has-error": g.value,
			"has-label": t.showLabel && !!t.label,
			"is-required": h.value,
			"is-vertical": r?.layout.value === "vertical" || r?.labelPosition.value === "top",
			"is-label-left": r?.labelPosition.value === "left"
		}, t.customClass));
		return (t, r) => (A(), c("div", {
			class: C(S.value),
			style: T(y.value ? { "--mc-form-label-width": y.value } : void 0)
		}, [e.showLabel && e.label ? (A(), c("label", lp, [h.value ? (A(), c("span", up, "*")) : s("", !0), l("span", dp, R(e.label), 1)])) : s("", !0), l("div", fp, [l("div", {
			class: "mc-form-item__control",
			"aria-describedby": _.value ? a : void 0,
			"aria-invalid": g.value || void 0,
			onFocusout: x,
			onChange: b
		}, [F(t.$slots, "default", {}, void 0, !0)], 40, pp), f(n, { name: "mc-form-msg" }, {
			default: ee(() => [_.value ? (A(), c("p", {
				id: a,
				key: m.value ? `error-${u.value}` : "feedback",
				class: C(["mc-form-item__message", { "is-error": g.value }]),
				role: m.value ? "alert" : void 0,
				"aria-live": m.value ? void 0 : "polite"
			}, [m.value ? (A(), o($, {
				key: 0,
				name: "alert-circle",
				size: 12,
				class: "mc-form-item__msg-icon"
			})) : s("", !0), d(" " + R(m.value || e.feedback), 1)], 10, mp)) : s("", !0)]),
			_: 1
		})])], 6));
	}
}), [["__scopeId", "data-v-48e877ca"]]), gp = {
	key: 0,
	class: "mc-form-row__label"
}, _p = { class: "mc-form-row__content" }, vp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiFormRow",
	__name: "FormRow",
	props: {
		label: { default: "" },
		labelWidth: { default: void 0 },
		gutter: { default: 16 },
		customClass: {}
	},
	setup(e) {
		let t = e, n = v(ap, null), r = i(() => {
			let e = t.labelWidth ?? n?.labelWidth.value;
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}), a = i(() => Z("mc-form-row", {
			"has-label": !!t.label,
			"is-vertical": n?.layout.value === "vertical" || n?.labelPosition.value === "top"
		}, t.customClass));
		return (t, n) => (A(), c("div", {
			class: C(a.value),
			style: T({
				"--mc-form-row-gutter": `${e.gutter}px`,
				...r.value ? { "--mc-form-label-width": r.value } : {}
			})
		}, [e.label ? (A(), c("label", gp, R(e.label), 1)) : s("", !0), l("div", _p, [F(t.$slots, "default", {}, void 0, !0)])], 6));
	}
}), [["__scopeId", "data-v-e09d3593"]]), yp = [
	"aria-label",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuetext",
	"aria-disabled"
], bp = {
	class: "mc-gauge__svg",
	viewBox: "0 0 120 120",
	"aria-hidden": "true",
	focusable: "false"
}, xp = ["id"], Sp = ["stop-color"], Cp = ["stop-color"], wp = ["stroke-dasharray", "transform"], Tp = [
	"stroke",
	"stroke-dasharray",
	"transform"
], Ep = {
	key: 0,
	class: "mc-gauge__ticks"
}, Dp = [
	"x1",
	"y1",
	"x2",
	"y2"
], Op = {
	key: 1,
	class: "mc-gauge__labels"
}, kp = ["x", "y"], Ap = {
	key: 0,
	class: "mc-gauge__readout"
}, jp = {
	class: "mc-gauge__value",
	"data-mc-type": "readout"
}, Mp = {
	key: 0,
	class: "mc-gauge__unit"
}, Np = 60, Pp = 60, Fp = 55, Ip = 50, Lp = 46, Rp = 42, zp = 34, Bp = 5, Vp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiGauge",
	__name: "Gauge",
	props: {
		value: { default: 0 },
		min: { default: 0 },
		max: { default: 100 },
		size: { default: 160 },
		startAngle: { default: 225 },
		sweep: { default: 270 },
		tickCount: { default: 13 },
		majorTickEvery: { default: 3 },
		showTicks: {
			type: Boolean,
			default: !0
		},
		showLabels: {
			type: Boolean,
			default: !0
		},
		showNeedle: {
			type: Boolean,
			default: !0
		},
		showValue: {
			type: Boolean,
			default: !0
		},
		unit: { default: "" },
		label: { default: "量表" },
		color: { default: "accent" },
		formatter: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		function n(e, t) {
			let n = t * Math.PI / 180;
			return {
				x: Np + e * Math.sin(n),
				y: Pp - e * Math.cos(n)
			};
		}
		function r(e) {
			return String(Math.round(e));
		}
		let a = t, o = Fi("mc-gauge-grad");
		function u(e) {
			return a.formatter ? a.formatter(e) : r(e);
		}
		let d = i(() => {
			let e = a.max - a.min;
			return e > 0 ? e : 1;
		}), f = i(() => Ot((a.value - a.min) / d.value, 0, 1)), p = i(() => Ot(a.sweep, 1, 359)), m = i(() => a.startAngle + f.value * p.value), h = i(() => 2 * Math.PI * zp), g = i(() => p.value / 360 * h.value), _ = i(() => f.value * g.value), v = i(() => a.startAngle - 90), y = i(() => St(a.color) ?? "var(--mc-accent)"), b = i(() => {
			let e = Math.max(0, Math.floor(a.tickCount));
			if (!e) return [];
			let t = Math.max(1, Math.floor(a.majorTickEvery)), r = [];
			for (let i = 0; i < e; i++) {
				let o = e === 1 ? 0 : i / (e - 1), s = a.startAngle + o * p.value, c = i % t === 0 || i === e - 1, l = n(Fp, s), f = n(c ? Lp : Ip, s), m = n(Rp, s);
				r.push({
					key: String(i),
					major: c,
					label: c ? u(a.min + o * d.value) : "",
					x1: f.x,
					y1: f.y,
					x2: l.x,
					y2: l.y,
					lx: m.x,
					ly: m.y
				});
			}
			return r;
		}), x = i(() => u(Ot(a.value, a.min, a.max))), S = i(() => {
			let e = a.unit ? ` ${a.unit}` : "";
			return `${x.value}${e}`;
		}), w = i(() => ({ transform: `rotate(${m.value}deg)` })), E = i(() => Z("mc-gauge", {
			"is-disabled": a.disabled,
			"is-empty": f.value <= 0,
			"is-full": f.value >= 1
		}, a.customClass));
		return (n, r) => (A(), c("div", {
			class: C(E.value),
			style: T({
				width: `${t.size}px`,
				height: `${t.size}px`
			}),
			role: "meter",
			"aria-label": t.label,
			"aria-valuenow": B(Ot)(t.value, t.min, t.max),
			"aria-valuemin": t.min,
			"aria-valuemax": t.max,
			"aria-valuetext": S.value,
			"aria-disabled": t.disabled || void 0
		}, [
			r[1] || (r[1] = l("span", {
				class: "mc-gauge__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[2] || (r[2] = l("span", {
				class: "mc-gauge__grain",
				"aria-hidden": "true"
			}, null, -1)),
			r[3] || (r[3] = l("span", {
				class: "mc-gauge__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			(A(), c("svg", bp, [
				l("defs", null, [l("linearGradient", {
					id: B(o),
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%"
				}, [l("stop", {
					offset: "0%",
					"stop-color": y.value
				}, null, 8, Sp), l("stop", {
					offset: "100%",
					"stop-color": y.value,
					"stop-opacity": "0.72"
				}, null, 8, Cp)], 8, xp)]),
				l("circle", {
					class: "mc-gauge__arc-track",
					cx: Np,
					cy: Pp,
					r: zp,
					fill: "none",
					"stroke-width": Bp,
					"stroke-dasharray": `${g.value} ${h.value}`,
					transform: `rotate(${v.value} ${Np} ${Pp})`
				}, null, 8, wp),
				l("circle", {
					class: "mc-gauge__arc-fill",
					cx: Np,
					cy: Pp,
					r: zp,
					fill: "none",
					"stroke-width": Bp,
					"stroke-linecap": "round",
					stroke: `url(#${B(o)})`,
					"stroke-dasharray": `${_.value} ${h.value}`,
					transform: `rotate(${v.value} ${Np} ${Pp})`
				}, null, 8, Tp),
				t.showTicks ? (A(), c("g", Ep, [(A(!0), c(e, null, P(b.value, (e) => (A(), c("line", {
					key: e.key,
					class: C(["mc-gauge__tick", { "mc-gauge__tick--major": e.major }]),
					x1: e.x1,
					y1: e.y1,
					x2: e.x2,
					y2: e.y2
				}, null, 10, Dp))), 128))])) : s("", !0),
				t.showLabels ? (A(), c("g", Op, [(A(!0), c(e, null, P(b.value, (e) => (A(), c("text", {
					key: e.key,
					class: "mc-gauge__label",
					x: e.lx,
					y: e.ly,
					"text-anchor": "middle",
					"dominant-baseline": "middle"
				}, R(e.label), 9, kp))), 128))])) : s("", !0),
				t.showNeedle ? (A(), c("g", {
					key: 2,
					class: "mc-gauge__needle",
					style: T(w.value)
				}, [...r[0] || (r[0] = [l("path", {
					class: "mc-gauge__blade",
					d: "M60 31 L63.2 52 L56.8 52 Z"
				}, null, -1)])], 4)) : s("", !0),
				t.showNeedle ? (A(), c("circle", {
					key: 3,
					class: "mc-gauge__hub",
					cx: Np,
					cy: Pp,
					r: "6"
				})) : s("", !0)
			])),
			t.showValue ? (A(), c("div", Ap, [F(n.$slots, "value", {}, () => [l("span", jp, R(x.value), 1), t.unit ? (A(), c("span", Mp, R(t.unit), 1)) : s("", !0)], !0)])) : s("", !0)
		], 14, yp));
	}
}), [["__scopeId", "data-v-d872f159"]]), Hp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiGlobalStyle",
	__name: "GlobalStyle",
	props: {
		fontFamily: {},
		baseFontSize: {},
		background: {},
		color: {},
		scrollbar: {
			type: Boolean,
			default: !0
		},
		disableSelection: {
			type: Boolean,
			default: !1
		},
		smoothScroll: {
			type: Boolean,
			default: !1
		},
		baseline: {
			type: Boolean,
			default: !1
		},
		grain: {
			type: Boolean,
			default: !1
		},
		aurora: {
			type: Boolean,
			default: !1
		},
		sheen: {
			type: Boolean,
			default: !1
		},
		glass: {
			type: Boolean,
			default: !1
		},
		css: {},
		target: { default: "head" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(null), r = null, a = i(() => {
			let e = [];
			return t.fontFamily && e.push(`html[data-mochi] body { font-family: ${t.fontFamily}; }`), t.baseFontSize && e.push(`html[data-mochi] { font-size: ${t.baseFontSize}px; }`), t.background && e.push(`html[data-mochi] body { background: ${t.background}; }`), t.color && e.push(`html[data-mochi] body { color: ${t.color}; }`), t.smoothScroll && e.push("html[data-mochi] { scroll-behavior: smooth; }"), t.disableSelection && e.push("html[data-mochi] body, html[data-mochi] body * { -webkit-user-select: none; user-select: none; }"), t.scrollbar || (e.push("html[data-mochi] ::-webkit-scrollbar { width: 0; height: 0; }"), e.push("html[data-mochi] * { scrollbar-width: none; }")), t.baseline && e.push("\nhtml[data-mochi] a,\nhtml[data-mochi] button,\nhtml[data-mochi] [role='button'] {\n  transition:\n    color var(--mc-dur-base) var(--mc-ease-out),\n    background-color var(--mc-dur-base) var(--mc-ease-out),\n    transform var(--mc-dur-fast) var(--mc-ease-spring);\n}\nhtml[data-mochi] a:hover {\n  color: var(--mc-accent-text);\n}\nhtml[data-mochi] button:active:not(:disabled),\nhtml[data-mochi] [role='button']:active {\n  transform: scale(var(--mc-press-scale));\n}\n/* No :where() here — it contributes zero specificity, so the rule could\n   never beat the base.css focus rule and the ring was dead code. */\nhtml[data-mochi] :focus-visible {\n  outline: none;\n  box-shadow: var(--mc-focus-ring), var(--mc-glow-accent);\n  border-radius: inherit;\n}\nhtml[data-mochi] :disabled,\nhtml[data-mochi] [aria-disabled='true'] {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n"), t.glass && e.push("\n:where(html[data-mochi] .mc-glass, html[data-mochi] .mc-panel, html[data-mochi] .mc-glass-strong) {\n  -webkit-backdrop-filter: blur(var(--mc-panel-blur)) saturate(var(--mc-panel-sat));\n  backdrop-filter: blur(var(--mc-panel-blur)) saturate(var(--mc-panel-sat));\n}\n"), t.aurora && e.push("\nhtml[data-mochi] body {\n  background-image: radial-gradient(\n    60% 42% at 18% 0%,\n    color-mix(in srgb, var(--mc-accent) 14%, transparent) 0%,\n    transparent 72%\n  );\n}\n"), t.grain && e.push("\nhtml[data-mochi] body::before {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background-image: var(--mc-grain);\n  background-size: 140px 140px;\n  opacity: var(--mc-grain-alpha);\n  mix-blend-mode: soft-light;\n}\n"), t.sheen && e.push("\nhtml[data-mochi] body::after {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background: var(--mc-gradient-sheen);\n  animation: mc-sheen 1.4s var(--mc-ease-spring) forwards;\n}\n"), e.push("\nhtml[data-mochi] ::selection {\n  background: var(--mc-accent-glow);\n  color: var(--mc-text-1);\n}\nhtml[data-mochi] ::-webkit-scrollbar-thumb {\n  background: var(--mc-scrollbar-thumb);\n  border-radius: var(--mc-radius-pill);\n}\nhtml[data-mochi] ::-webkit-scrollbar-thumb:hover {\n  background: var(--mc-scrollbar-thumb-hover);\n}\n"), t.css && e.push(t.css), e.join("\n");
		});
		function o() {
			if (typeof document > "u") return;
			s();
			let e = document.createElement("style");
			e.setAttribute("data-mochi-global-style", ""), e.textContent = a.value, t.target === "head" ? document.head.appendChild(e) : n.value?.parentNode?.insertBefore(e, n.value.nextSibling), r = e;
		}
		function s() {
			r?.remove(), r = null;
		}
		return O(o), G(a, () => o()), E(s), (e, r) => (A(), c("span", {
			ref_key: "anchor",
			ref: n,
			class: C(B(Z)("mc-global-style", t.customClass))
		}, null, 2));
	}
}), [["__scopeId", "data-v-a25ed06c"]]), Up = [
	"tabindex",
	"role",
	"aria-disabled"
], Wp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiGradientText",
	__name: "GradientText",
	props: {
		animated: {
			type: Boolean,
			default: !0
		},
		glow: {
			type: Boolean,
			default: !1
		},
		gradient: {},
		aurora: {
			type: Boolean,
			default: !1
		},
		align: { default: "left" },
		sheen: {
			type: Boolean,
			default: !1
		},
		focusable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = i(() => Z("mc-gradient-text", {
			"is-animated": n.animated,
			"is-glow": n.glow,
			"is-aurora": n.aurora,
			"is-sheen": n.sheen,
			"is-focusable": n.focusable,
			"is-disabled": n.disabled,
			[`is-align-${n.align}`]: n.align !== "left"
		}, n.customClass));
		function o(e) {
			n.disabled || r("click", e);
		}
		function s(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), !n.disabled && r("click", new MouseEvent("click")));
		}
		return (t, n) => (A(), c("span", {
			class: C(a.value),
			style: T(e.gradient ? { backgroundImage: e.gradient } : void 0),
			tabindex: e.focusable ? 0 : void 0,
			role: e.focusable ? "button" : void 0,
			"aria-disabled": e.disabled || void 0,
			onClick: o,
			onKeydown: s
		}, [F(t.$slots, "default", {}, void 0, !0)], 46, Up));
	}
}), [["__scopeId", "data-v-f314d4fc"]]), Gp = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiGrid",
	__name: "Grid",
	props: {
		cols: { default: 1 },
		gutter: { default: 16 },
		rowGutter: {},
		justify: { default: "stretch" },
		align: { default: "stretch" },
		bordered: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			8,
			10,
			12,
			16,
			20,
			24
		], n = e, r = [
			"xs",
			"sm",
			"md",
			"lg",
			"xl"
		];
		function a(e) {
			if (e !== void 0) return Number.isFinite(e) ? Math.max(1, Math.round(e)) : 1;
		}
		function o() {
			if (typeof n.cols == "number") {
				let e = a(n.cols) ?? 1;
				return {
					xs: e,
					sm: e,
					md: e,
					lg: e,
					xl: e
				};
			}
			let e = n.cols ?? {}, t = {};
			for (let n of r) {
				let r = a(e[n]);
				r !== void 0 && (t[n] = r);
			}
			return t;
		}
		function s(e) {
			let n = e / 4;
			return Number.isInteger(n) && t.includes(n) ? `var(--mc-space-${n})` : `${e}px`;
		}
		let l = i(() => {
			let e = o(), t = {
				gap: `${s(n.rowGutter ?? n.gutter)} ${s(n.gutter)}`,
				justifyContent: n.justify,
				alignItems: n.align
			};
			for (let n of r) {
				let r = e[n];
				r !== void 0 && (t[`--mc-grid-cols-${n}`] = r);
			}
			return t;
		}), u = i(() => Z("mc-grid", { "is-bordered": n.bordered }, n.customClass));
		return (e, t) => (A(), c("div", {
			class: C(u.value),
			style: T(l.value)
		}, [F(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-62d749b7"]]), Kp = { class: "mc-heatmap__frame mc-grain-overlay" }, qp = { class: "mc-heatmap__scroll mc-scroll" }, Jp = [
	"width",
	"height",
	"aria-label"
], Yp = {
	key: 0,
	class: "mc-heatmap__months"
}, Xp = ["x"], Zp = ["transform"], Qp = { key: 0 }, $p = ["y"], em = ["transform"], tm = [
	"y",
	"width",
	"height",
	"aria-label"
], nm = 22, rm = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiHeatmap",
	__name: "Heatmap",
	props: {
		data: { default: () => [] },
		start: {},
		end: {},
		levels: { default: 5 },
		cellSize: { default: 12 },
		gap: { default: 3 },
		showWeekdayLabels: {
			type: Boolean,
			default: !0
		},
		showMonthLabels: {
			type: Boolean,
			default: !0
		},
		tooltip: {},
		locale: { default: "en-US" },
		label: { default: "Activity heatmap" },
		customClass: {}
	},
	setup(t) {
		let n = t, r = `${Fi("mc-heat")}-hot`;
		function a(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? /* @__PURE__ */ new Date() : t;
		}
		function o(e) {
			return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
		}
		let u = i(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of n.data) e.set(t.date, t.value);
			return e;
		}), d = i(() => {
			let e = n.end ? a(n.end) : /* @__PURE__ */ new Date();
			return {
				start: n.start ? a(n.start) : /* @__PURE__ */ new Date(e.getTime() - 156384e5),
				end: e
			};
		}), f = i(() => {
			let { start: e, end: t } = d.value, n = new Date(e), r = (n.getDay() + 6) % 7;
			n.setDate(n.getDate() - r);
			let i = [], a = new Date(n), s = t.getTime(), c = u.value;
			for (; a.getTime() <= s;) {
				let e = [];
				for (let t = 0; t < 7; t++) {
					let t = o(a);
					e.push({
						date: t,
						value: c.get(t) ?? 0
					}), a.setDate(a.getDate() + 1);
				}
				i.push({
					key: i[0] ? `${i.length}` : "0",
					days: e
				});
			}
			return i;
		}), p = i(() => {
			let e = n.data.map((e) => e.value);
			return e.length ? Math.max(...e, 1) : 1;
		}), m = i(() => Math.min(5, Math.max(1, n.levels)));
		function h(e) {
			if (e <= 0) return 0;
			let t = e / p.value;
			return Math.min(m.value, Math.max(1, Math.ceil(t * m.value)));
		}
		let g = i(() => {
			let e = [];
			try {
				let t = new Intl.DateTimeFormat(n.locale, { weekday: "short" });
				for (let n = 0; n < 7; n += 1) e.push(t.format(new Date(2024, 0, 1 + n)));
			} catch {
				let t = [
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
					"Sun"
				];
				for (let n = 0; n < 7; n += 1) e.push(t[n]);
			}
			return e.map((e, t) => t % 2 == 0 ? e : "");
		}), _ = i(() => {
			if (!n.showMonthLabels) return [];
			let e = null;
			try {
				e = new Intl.DateTimeFormat(n.locale, { month: "short" });
			} catch {
				e = null;
			}
			let t = [], r = -1;
			return f.value.forEach((n, i) => {
				let o = a(n.days[0].date), s = o.getMonth();
				s !== r && (r = s, t.push({
					index: i,
					label: e ? e.format(o) : `${s + 1}`
				}));
			}), t;
		}), v = i(() => f.value.length * (n.cellSize + n.gap) + (n.showWeekdayLabels ? nm : 0)), y = i(() => 7 * (n.cellSize + n.gap)), b = i(() => Z("mc-heatmap", "mc-aurora-inset", n.customClass));
		function x(e) {
			return n.tooltip ? n.tooltip(e) : `${e.date} · ${e.value}`;
		}
		return (n, i) => (A(), c("div", { class: C(b.value) }, [l("div", Kp, [l("div", qp, [(A(), c("svg", {
			class: "mc-heatmap__grid",
			width: v.value,
			height: y.value + (t.showMonthLabels ? 16 : 0),
			role: "group",
			"aria-label": t.label
		}, [
			l("defs", null, [l("linearGradient", {
				id: r,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1"
			}, [...i[0] || (i[0] = [l("stop", {
				offset: "0%",
				"stop-color": "var(--mc-accent-3)"
			}, null, -1), l("stop", {
				offset: "100%",
				"stop-color": "var(--mc-accent)"
			}, null, -1)])])]),
			t.showMonthLabels ? (A(), c("g", Yp, [(A(!0), c(e, null, P(_.value, (e) => (A(), c("text", {
				key: e.index,
				x: (t.showWeekdayLabels ? nm : 0) + e.index * (t.cellSize + t.gap),
				y: 11,
				class: "mc-heatmap__month"
			}, R(e.label), 9, Xp))), 128))])) : s("", !0),
			l("g", { transform: `translate(0, ${t.showMonthLabels ? 16 : 0})` }, [t.showWeekdayLabels ? (A(), c("g", Qp, [(A(!0), c(e, null, P(g.value, (e, n) => (A(), c("text", {
				key: n,
				x: 0,
				y: n * (t.cellSize + t.gap) + t.cellSize * .75,
				class: "mc-heatmap__weekday"
			}, R(e), 9, $p))), 128))])) : s("", !0), (A(!0), c(e, null, P(f.value, (n, i) => (A(), c("g", {
				key: i,
				transform: `translate(${(t.showWeekdayLabels ? nm : 0) + i * (t.cellSize + t.gap)}, 0)`
			}, [(A(!0), c(e, null, P(n.days, (e, n) => (A(), c("rect", {
				key: e.date,
				class: C(["mc-heatmap__cell", `is-level-${h(e.value)}`]),
				style: T(h(e.value) >= m.value ? { fill: `url(#${r})` } : void 0),
				x: 0,
				y: n * (t.cellSize + t.gap),
				width: t.cellSize,
				height: t.cellSize,
				rx: "3",
				role: "img",
				"aria-label": x(e)
			}, [l("title", null, R(x(e)), 1)], 14, tm))), 128))], 8, em))), 128))], 8, Zp)
		], 8, Jp))])])], 2));
	}
}), [["__scopeId", "data-v-21473cff"]]), im = {
	key: 0,
	class: "mc-highlight__mark"
}, am = { class: "mc-highlight__text" }, om = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiHighlight",
	__name: "Highlight",
	props: {
		text: {},
		keywords: { default: () => [] },
		caseSensitive: {
			type: Boolean,
			default: !1
		},
		accent: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => {
			let e = n.text ?? "", t = n.keywords.filter(Boolean);
			if (!t.length) return [{
				text: e,
				hit: !1
			}];
			let r = n.caseSensitive ? "g" : "gi", i = t.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), a = RegExp(`(${i.join("|")})`, r);
			return e.split(a).filter((e) => e !== "").map((e) => ({
				text: e,
				hit: t.some((t) => n.caseSensitive ? t === e : t.toLowerCase() === e.toLowerCase())
			}));
		}), a = i(() => Z("mc-highlight", { "is-accent": n.accent }, n.customClass));
		return (t, n) => (A(), c("span", { class: C(a.value) }, [(A(!0), c(e, null, P(r.value, (t, n) => (A(), c(e, { key: n }, [t.hit ? (A(), c("mark", im, [l("span", am, R(t.text), 1)])) : (A(), c(e, { key: 1 }, [d(R(t.text), 1)], 64))], 64))), 128))], 2));
	}
}), [["__scopeId", "data-v-4183e26e"]]), sm = ["aria-label"], cm = { class: "mc-icon-rail__body" }, lm = {
	key: 0,
	class: "mc-icon-rail__slot"
}, um = [
	"disabled",
	"aria-disabled",
	"aria-current",
	"aria-label",
	"title",
	"onClick"
], dm = { class: "mc-icon-rail__icon mc-sheen-sweep" }, fm = {
	key: 0,
	class: "mc-icon-rail__label"
}, pm = {
	key: 1,
	class: "mc-icon-rail__slot"
}, mm = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiIconRail",
	__name: "IconRail",
	props: {
		options: { default: () => [] },
		modelValue: {},
		labelPosition: { default: "right" },
		size: { default: "medium" },
		avatarPosition: { default: "top" },
		label: { default: "Icon rail" },
		customClass: {}
	},
	emits: ["update:modelValue", "select"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(r.modelValue);
		G(() => r.modelValue, (e) => {
			o.value = e;
		});
		let u = i(() => r.modelValue ?? o.value);
		function d(e) {
			return e.key === u.value;
		}
		function p(e) {
			e.disabled || (o.value = e.key, a("update:modelValue", e.key), a("select", e.key, e));
		}
		let m = i(() => r.labelPosition !== "none"), h = {
			small: 15,
			medium: 17,
			large: 20
		}, g = i(() => h[r.size] ?? h.medium);
		function _(e) {
			if (!(m.value && e.label)) return e.label ?? e.key;
		}
		function v(e) {
			if (![
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = e.currentTarget, n = Array.from(t.querySelectorAll("button.mc-icon-rail__item:not(:disabled)"));
			if (!n.length) return;
			let r = n.indexOf(document.activeElement);
			e.preventDefault();
			let i = r;
			e.key === "ArrowDown" ? i = r + 1 : e.key === "ArrowUp" ? i = r - 1 : e.key === "Home" ? i = 0 : e.key === "End" && (i = n.length - 1), i < 0 && (i = 0), i >= n.length && (i = n.length - 1), n[i]?.focus();
		}
		let y = i(() => Z("mc-icon-rail", `mc-icon-rail--${r.size}`, `mc-icon-rail--label-${r.labelPosition}`, `mc-icon-rail--avatar-${r.avatarPosition}`, { "mc-icon-rail--selected": u.value !== void 0 && u.value !== "" }, r.customClass));
		return (n, r) => (A(), c("nav", {
			class: C(y.value),
			"aria-label": t.label
		}, [
			r[0] || (r[0] = l("span", {
				class: "mc-icon-rail__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-icon-rail__grain",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", cm, [
				n.$slots.avatar && t.avatarPosition === "top" ? (A(), c("div", lm, [F(n.$slots, "avatar", {}, void 0, !0)])) : s("", !0),
				l("ul", {
					class: "mc-icon-rail__list",
					role: "list",
					onKeydown: v
				}, [(A(!0), c(e, null, P(t.options, (e) => (A(), c("li", {
					key: e.key,
					class: "mc-icon-rail__row"
				}, [l("button", {
					type: "button",
					class: C(["mc-icon-rail__item", { "mc-icon-rail__item--selected": d(e) }]),
					disabled: e.disabled,
					"aria-disabled": e.disabled ? "true" : void 0,
					"aria-current": d(e) ? "true" : void 0,
					"aria-label": _(e),
					title: _(e),
					onClick: (t) => p(e)
				}, [l("span", dm, [f($, {
					name: e.icon,
					size: g.value,
					class: "mc-icon-rail__glyph"
				}, null, 8, ["name", "size"])]), m.value && e.label ? (A(), c("span", fm, R(e.label), 1)) : s("", !0)], 10, um)]))), 128))], 32),
				n.$slots.avatar && t.avatarPosition === "bottom" ? (A(), c("div", pm, [F(n.$slots, "avatar", {}, void 0, !0)])) : s("", !0)
			])
		], 10, sm));
	}
}), [["__scopeId", "data-v-05238be3"]]);
//#endregion
//#region src/composables/useIntersection.ts
function hm(e, t = {}) {
	let { threshold: n = 0, rootMargin: r = "0px", once: i = !1 } = t, a = N(!1), o = N(0), s = N(null), c = null;
	return O(() => {
		typeof IntersectionObserver > "u" ? a.value = !0 : (c = new IntersectionObserver((e) => {
			let t = e[e.length - 1];
			t && (s.value = t, a.value = t.isIntersecting, o.value = t.intersectionRatio, t.isIntersecting && i && (c?.disconnect(), c = null));
		}, {
			threshold: n,
			rootMargin: r
		}), e.value && c.observe(e.value));
	}), E(() => {
		c?.disconnect(), c = null;
	}), {
		isIntersecting: a,
		ratio: o,
		entry: s
	};
}
//#endregion
//#region src/components/image-group/registry.ts
var gm = /* @__PURE__ */ new Map();
function _m(e, t) {
	return gm.set(e, t), () => {
		gm.get(e) === t && gm.delete(e);
	};
}
function vm(e) {
	return gm.get(e);
}
//#endregion
//#region src/components/image/Image.vue?vue&type=script&setup=true&lang.ts
var ym = [
	"tabindex",
	"role",
	"aria-label",
	"aria-disabled",
	"onKeydown"
], bm = {
	key: 0,
	class: "mc-image__shimmer mc-grain-overlay",
	"aria-hidden": "true"
}, xm = ["src", "alt"], Sm = {
	key: 2,
	class: "mc-image__fallback mc-aurora-inset"
}, Cm = {
	key: 0,
	class: "mc-image__fallback-text"
}, wm = {
	key: 3,
	class: "mc-image__badge",
	"aria-hidden": "true"
}, Tm = {
	key: 4,
	class: "mc-image__caption"
}, Em = ["aria-label"], Dm = { class: "mc-image-lightbox__panel" }, Om = ["src", "alt"], km = ["aria-label"], Am = {
	key: 0,
	class: "mc-image-lightbox__caption"
}, jm = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiImage",
	__name: "Image",
	props: {
		src: {},
		alt: { default: "" },
		width: {},
		height: {},
		ratio: { default: "" },
		fit: { default: "cover" },
		rounded: {
			type: Boolean,
			default: !0
		},
		circle: {
			type: Boolean,
			default: !1
		},
		fallback: { default: "image" },
		preview: {
			type: Boolean,
			default: !1
		},
		group: { default: "" },
		lazy: {
			type: Boolean,
			default: !1
		},
		placeholder: {
			type: Boolean,
			default: !0
		},
		position: { default: "center" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["load", "error"],
	setup(r, { emit: a }) {
		let u = r, d = a, p = N(null), m = N(null), h = N("idle"), g = N(!1), _ = N(null), v = Zt(), y = An(), b = i(() => ({
			preview: v.value.image?.preview ?? "Preview image",
			close: v.value.image?.close ?? "Close preview"
		})), S = i(() => g.value), { isTop: w, isTopModal: D } = On({
			active: S,
			modal: !0
		});
		Ws({
			enabled: S,
			container: m,
			isTop: D
		}), Js(S);
		let { isIntersecting: k } = hm(p, {
			rootMargin: "160px",
			once: !0
		}), j = i(() => !u.lazy || k.value), M = (e) => {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}, P = i(() => ({
			width: M(u.width),
			height: M(u.height),
			aspectRatio: u.ratio || void 0
		})), I = i(() => ({
			objectFit: u.fit,
			objectPosition: u.position
		}));
		G(() => u.src, () => {
			h.value = "idle";
		});
		function L(e) {
			h.value = "loaded", d("load", e);
		}
		function z(e) {
			h.value = "error", d("error", e);
		}
		function V() {
			if (!u.preview || u.disabled || h.value === "error") return;
			let e = u.group ? vm(u.group) : void 0;
			if (e) {
				let t = e.images.findIndex((e) => e.src === u.src);
				e.open(t >= 0 ? t : 0);
			} else _.value = document.activeElement ?? null, g.value = !0, document.addEventListener("keydown", U);
		}
		function H() {
			g.value = !1, document.removeEventListener("keydown", U), _.value?.focus?.();
		}
		function U(e) {
			e.key === "Escape" && w() && H();
		}
		O(() => {
			u.lazy || (h.value = "loading");
		}), E(() => {
			document.removeEventListener("keydown", U);
		});
		let W = i(() => Z("mc-image", "mc-sheen-sweep", {
			"is-rounded": u.rounded && !u.circle,
			"is-circle": u.circle,
			"is-loaded": h.value === "loaded",
			"is-error": h.value === "error",
			"is-zoomable": u.preview && !u.disabled,
			"is-disabled": u.disabled
		}, u.customClass));
		return (i, a) => (A(), c(e, null, [l("figure", {
			ref_key: "root",
			ref: p,
			class: C(W.value),
			style: T(P.value),
			tabindex: r.preview && !r.disabled ? 0 : void 0,
			role: r.preview && !r.disabled ? "button" : void 0,
			"aria-label": r.preview && !r.disabled ? r.alt || b.value.preview : void 0,
			"aria-disabled": r.disabled ? "true" : void 0,
			onClick: V,
			onKeydown: [K(V, ["enter"]), K(q(V, ["prevent"]), ["space"])]
		}, [
			r.placeholder && h.value !== "loaded" ? (A(), c("span", bm)) : s("", !0),
			j.value && r.src && h.value !== "error" ? (A(), c("img", {
				key: 1,
				class: "mc-image__img",
				src: r.src,
				alt: r.alt,
				style: T(I.value),
				loading: "lazy",
				decoding: "async",
				onLoad: L,
				onError: z
			}, null, 44, xm)) : s("", !0),
			h.value === "error" ? (A(), c("span", Sm, [f($, {
				name: r.fallback,
				size: 24
			}, null, 8, ["name"]), r.alt ? (A(), c("span", Cm, R(r.alt), 1)) : s("", !0)])) : s("", !0),
			r.preview && h.value === "loaded" ? (A(), c("span", wm, [f($, {
				name: "expand",
				size: 13
			})])) : s("", !0),
			i.$slots.default ? (A(), c("figcaption", Tm, [F(i.$slots, "default", {}, void 0, !0)])) : s("", !0)
		], 46, ym), (A(), o(t, { to: "body" }, [f(n, { name: "mc-image-lightbox" }, {
			default: ee(() => [g.value ? (A(), c("div", x({
				key: 0,
				ref_key: "lightbox",
				ref: m,
				class: "mc-image-lightbox"
			}, B(y), {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": r.alt || b.value.preview,
				onClick: q(H, ["self"])
			}), [l("div", Dm, [
				l("img", {
					class: "mc-image-lightbox__img",
					src: r.src,
					alt: r.alt
				}, null, 8, Om),
				l("button", {
					type: "button",
					class: "mc-image-lightbox__close",
					"aria-label": b.value.close,
					onClick: H
				}, [f($, {
					name: "close",
					size: 18
				})], 8, km),
				r.alt ? (A(), c("p", Am, R(r.alt), 1)) : s("", !0)
			])], 16, Em)) : s("", !0)]),
			_: 1
		})]))], 64));
	}
}), [["__scopeId", "data-v-afa6c809"]]), Mm = ["aria-label"], Nm = [
	"disabled",
	"aria-label",
	"onClick"
], Pm = {
	key: 0,
	class: "mc-image-group__caption"
}, Fm = {
	key: 0,
	class: "mc-image-group__empty"
}, Im = ["aria-label"], Lm = { class: "mc-image-lightbox__panel" }, Rm = ["src", "alt"], zm = ["aria-label"], Bm = ["aria-label"], Vm = ["aria-label"], Hm = {
	key: 2,
	class: "mc-image-lightbox__caption"
}, Um = { class: "mc-image-lightbox__counter" }, Wm = ["aria-label"], Gm = [
	"aria-label",
	"aria-current",
	"onClick"
], Km = ["src", "alt"], qm = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiImageGroup",
	__name: "ImageGroup",
	props: {
		images: { default: () => [] },
		columns: { default: 3 },
		ratio: { default: "4/3" },
		preview: {
			type: Boolean,
			default: !0
		},
		name: { default: "" },
		customClass: {}
	},
	emits: ["open", "close"],
	setup(r, { emit: a }) {
		let u = r, d = a, p = Zt(), m = An(), h = i(() => ({
			preview: p.value.image?.preview ?? "Preview image",
			close: p.value.image?.close ?? "Close preview",
			previous: p.value.image?.previous ?? "Previous image",
			next: p.value.image?.next ?? "Next image",
			thumbnails: p.value.image?.thumbnails ?? "Image thumbnails",
			counter: p.value.image?.counter ?? "{index} / {total}",
			gallery: p.value.image?.gallery ?? "Image gallery"
		})), g = N(null), _ = N(!1), v = N(0), y = i(() => _.value), { isTop: b, isTopModal: S } = On({
			active: y,
			modal: !0
		});
		Ws({
			enabled: y,
			container: g,
			isTop: S
		}), Js(y);
		let w = i(() => u.images[v.value] ?? null), D = i(() => h.value.counter.replace("{index}", String(v.value + 1)).replace("{total}", String(u.images.length)));
		function k(e) {
			if (!u.images.length) return;
			let t = u.images.length;
			v.value = (e % t + t) % t;
			let n = u.images[v.value];
			n && d("open", n, v.value);
		}
		function j(e) {
			u.images.length && (k(e), _.value = !0, document.addEventListener("keydown", L));
		}
		function M() {
			_.value && (_.value = !1, document.removeEventListener("keydown", L), d("close"));
		}
		function F(e) {
			k(e);
		}
		function I(e) {
			u.images.length && k(v.value + e);
		}
		function L(e) {
			b() && (e.key === "Escape" ? M() : e.key === "ArrowLeft" ? (e.preventDefault(), I(-1)) : e.key === "ArrowRight" && (e.preventDefault(), I(1)));
		}
		let z = {
			images: u.images,
			open: j
		}, V;
		O(() => {
			u.name && (V = _m(u.name, z));
		}), E(() => {
			V?.(), V = void 0, document.removeEventListener("keydown", L);
		}), G(() => u.images, (e) => {
			z.images = e, v.value >= e.length && (v.value = Math.max(0, e.length - 1));
		}, { deep: !0 });
		let H = i(() => ({ "--mc-image-group-columns": String(Math.max(1, u.columns)) })), U = i(() => Z("mc-image-group", "mc-grain-overlay", {
			"is-empty": !u.images.length,
			"is-previewable": u.preview
		}, u.customClass));
		return (i, a) => (A(), c(e, null, [l("div", { class: C(U.value) }, [
			a[2] || (a[2] = l("span", {
				class: "mc-image-group__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", {
				class: "mc-image-group__grid",
				style: T(H.value),
				role: "group",
				"aria-label": h.value.gallery
			}, [(A(!0), c(e, null, P(r.images, (e, t) => (A(), c("button", {
				key: `${e.src}-${t}`,
				type: "button",
				class: "mc-image-group__cell mc-sheen-sweep",
				disabled: !r.preview,
				"aria-label": e.alt || h.value.preview,
				onClick: (e) => j(t)
			}, [f(jm, {
				src: e.src,
				alt: e.alt,
				ratio: r.ratio,
				preview: !1,
				lazy: !0
			}, null, 8, [
				"src",
				"alt",
				"ratio"
			]), e.caption ? (A(), c("span", Pm, R(e.caption), 1)) : s("", !0)], 8, Nm))), 128))], 12, Mm),
			r.images.length ? s("", !0) : (A(), c("p", Fm, R(h.value.gallery), 1))
		], 2), (A(), o(t, { to: "body" }, [f(n, { name: "mc-image-lightbox" }, {
			default: ee(() => [_.value && w.value ? (A(), c("div", x({
				key: 0,
				ref_key: "lightbox",
				ref: g,
				class: "mc-image-lightbox"
			}, B(m), {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": w.value.alt || h.value.preview,
				onClick: q(M, ["self"])
			}), [l("div", Lm, [
				l("img", {
					class: "mc-image-lightbox__img",
					src: w.value.src,
					alt: w.value.alt
				}, null, 8, Rm),
				l("button", {
					type: "button",
					class: "mc-image-lightbox__close",
					"aria-label": h.value.close,
					onClick: M
				}, [f($, {
					name: "close",
					size: 18
				})], 8, zm),
				r.images.length > 1 ? (A(), c("button", {
					key: 0,
					type: "button",
					class: "mc-image-lightbox__nav is-prev",
					"aria-label": h.value.previous,
					onClick: a[0] || (a[0] = (e) => I(-1))
				}, [f($, {
					name: "chevron-left",
					size: 20
				})], 8, Bm)) : s("", !0),
				r.images.length > 1 ? (A(), c("button", {
					key: 1,
					type: "button",
					class: "mc-image-lightbox__nav is-next",
					"aria-label": h.value.next,
					onClick: a[1] || (a[1] = (e) => I(1))
				}, [f($, {
					name: "chevron-right",
					size: 20
				})], 8, Vm)) : s("", !0),
				w.value.caption ? (A(), c("p", Hm, R(w.value.caption), 1)) : s("", !0),
				l("p", Um, R(D.value), 1),
				r.images.length > 1 ? (A(), c("div", {
					key: 3,
					class: "mc-image-lightbox__thumbs",
					role: "group",
					"aria-label": h.value.thumbnails
				}, [(A(!0), c(e, null, P(r.images, (e, t) => (A(), c("button", {
					key: `${e.src}-${t}`,
					type: "button",
					class: C(["mc-image-lightbox__thumb", { "is-active": t === v.value }]),
					"aria-label": e.alt || `${t + 1}`,
					"aria-current": t === v.value ? "true" : void 0,
					onClick: (e) => F(t)
				}, [l("img", {
					src: e.src,
					alt: e.alt,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Km)], 10, Gm))), 128))], 8, Wm)) : s("", !0)
			])], 16, Im)) : s("", !0)]),
			_: 1
		})]))], 64));
	}
}), [["__scopeId", "data-v-7812b16a"]]), Jm = {
	class: "mc-infinite-scroll__status mc-grain-overlay",
	role: "status",
	"aria-live": "polite"
}, Ym = {
	class: "mc-infinite-scroll__loader mc-sheen-sweep",
	"aria-hidden": "true"
}, Xm = {
	class: "mc-infinite-scroll__spinner",
	viewBox: "0 0 24 24",
	width: "18",
	height: "18"
}, Zm = ["stroke"], Qm = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiInfiniteScroll",
	__name: "InfiniteScroll",
	props: {
		load: {},
		distance: { default: 120 },
		disabled: {
			type: Boolean,
			default: !1
		},
		immediate: {
			type: Boolean,
			default: !0
		},
		hasMore: {
			type: Boolean,
			default: !0
		},
		loadingText: { default: "Loading…" },
		finishedText: { default: "No more items" },
		hintText: { default: "Scroll to load more" },
		scrollTarget: { default: null },
		customClass: {}
	},
	emits: [
		"load",
		"finish",
		"error"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N([]), s = N(!1), u = N(!1), d = N(null), p = null, m = `${Fi("mc-is")}-grad`, h = i(() => u.value || !r.hasMore);
		function g() {
			let e = d.value;
			if (!e || typeof window > "u") return !1;
			let t = e.getBoundingClientRect(), n = r.scrollTarget;
			if (n) {
				let e = n.getBoundingClientRect();
				return t.top <= e.bottom && t.bottom >= e.top;
			}
			return t.top <= window.innerHeight && t.bottom >= 0;
		}
		async function _() {
			if (!(s.value || h.value || r.disabled)) {
				s.value = !0;
				try {
					let e = await r.load();
					Array.isArray(e) && e.length ? (o.value = o.value.concat(e), a("load", e)) : (u.value = !0, a("finish"));
				} catch (e) {
					a("error", e), u.value = !0;
				} finally {
					s.value = !1;
				}
				h.value || r.disabled || (await S(), g() && _());
			}
		}
		function v() {
			p?.disconnect(), p = null, typeof IntersectionObserver < "u" && d.value && (p = new IntersectionObserver((e) => {
				e[e.length - 1]?.isIntersecting && _();
			}, {
				root: r.scrollTarget ?? null,
				rootMargin: `0px 0px ${r.distance}px 0px`
			}), p.observe(d.value));
		}
		G(d, v, { flush: "post" }), G(() => [
			r.disabled,
			r.scrollTarget,
			r.distance
		], v), G(() => r.hasMore, (e) => {
			e && (u.value = !1);
		}), r.immediate && Promise.resolve().then(() => void _());
		let y = i(() => Z("mc-infinite-scroll", {
			"is-loading": s.value,
			"is-done": h.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (A(), c("div", { class: C(y.value) }, [
			F(n.$slots, "default", {
				items: o.value,
				loading: s.value,
				done: h.value,
				loadMore: _
			}, void 0, !0),
			l("div", {
				ref_key: "sentinel",
				ref: d,
				class: "mc-infinite-scroll__sentinel",
				"aria-hidden": "true"
			}, null, 512),
			l("div", Jm, [s.value ? (A(), c(e, { key: 0 }, [l("span", Ym, [(A(), c("svg", Xm, [l("defs", null, [l("linearGradient", {
				id: m,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1"
			}, [...r[0] || (r[0] = [l("stop", {
				offset: "0%",
				"stop-color": "var(--mc-accent-3)"
			}, null, -1), l("stop", {
				offset: "100%",
				"stop-color": "var(--mc-accent-2)"
			}, null, -1)])])]), l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: `url(#${m})`,
				"stroke-width": "2.6",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, 8, Zm)]))]), l("span", null, R(t.loadingText), 1)], 64)) : h.value ? (A(), c(e, { key: 1 }, [
				r[1] || (r[1] = l("span", {
					class: "mc-infinite-scroll__line",
					"aria-hidden": "true"
				}, null, -1)),
				l("span", null, R(t.finishedText), 1),
				r[2] || (r[2] = l("span", {
					class: "mc-infinite-scroll__line",
					"aria-hidden": "true"
				}, null, -1))
			], 64)) : (A(), c(e, { key: 2 }, [f($, {
				name: "chevron-down",
				size: 14
			}), l("span", null, R(t.hintText), 1)], 64))])
		], 2));
	}
}), [["__scopeId", "data-v-c7ae18c8"]]), $m = {
	key: 0,
	class: "mc-input__affix mc-input__affix--prefix"
}, eh = {
	key: 1,
	class: "mc-input__count"
}, th = ["aria-label"], nh = ["aria-label"], rh = {
	key: 4,
	class: "mc-input__affix mc-input__affix--suffix"
}, ih = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiInput",
	inheritAttrs: !1,
	__name: "Input",
	props: {
		modelValue: { default: "" },
		type: { default: "text" },
		size: { default: "medium" },
		variant: { default: "filled" },
		color: { default: "default" },
		placeholder: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		clearable: {
			type: Boolean,
			default: !1
		},
		showPassword: {
			type: Boolean,
			default: !1
		},
		prefix: { default: "" },
		suffix: { default: "" },
		status: {},
		maxlength: {},
		showCount: {
			type: Boolean,
			default: !1
		},
		autofocus: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur",
		"clear",
		"enter"
	],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, u = V(), d = i(() => {
			let { class: e, style: t, ...n } = u;
			return n;
		});
		function p(e) {
			return e == null ? "" : String(e);
		}
		let m = N(p(n.modelValue));
		G(() => n.modelValue, (e) => {
			m.value = p(e);
		});
		let h = N(!1), g = i(() => n.type === "textarea"), _ = i(() => n.type === "password" ? h.value ? "text" : "password" : n.type), v = i(() => n.type === "number" && m.value !== "" && !Number.isNaN(Number(m.value)) ? Number(m.value) : m.value), y = i(() => m.value !== ""), b = i(() => n.clearable && y.value && !n.disabled && !n.readonly), S = i(() => n.showPassword && n.type === "password" && !n.disabled), w = i(() => m.value.length), E = i(() => n.maxlength ? `${w.value}/${n.maxlength}` : String(w.value));
		function D(e) {
			let t = e.target;
			m.value = t.value, a("update:modelValue", v.value);
		}
		function O(e) {
			let t = e.target;
			m.value = t.value, a("update:modelValue", v.value), a("change", v.value);
		}
		function k(e) {
			a("focus", e);
		}
		function j(e) {
			a("blur", e);
		}
		function M(e) {
			e.key === "Enter" && a("enter", v.value);
		}
		function P() {
			n.disabled || n.readonly || (m.value = "", a("update:modelValue", ""), a("clear"));
		}
		function L() {
			h.value = !h.value;
		}
		let z = i(() => Z("mc-input", "mc-sheen-sweep", `mc-input--${n.variant}`, `mc-input--${n.size}`, `mc-input--${n.color}`, {
			"is-disabled": n.disabled,
			"is-readonly": n.readonly,
			"is-textarea": g.value,
			[`is-status-${n.status}`]: !!n.status
		})), H = i(() => Z(z.value, u.class, n.customClass)), U = i(() => u.style);
		return (t, n) => (A(), c("div", {
			class: C(H.value),
			style: T(U.value)
		}, [
			n[0] || (n[0] = l("span", {
				class: "mc-input__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			e.prefix || t.$slots.prefix ? (A(), c("span", $m, [F(t.$slots, "prefix", {}, () => [e.prefix ? (A(), o($, {
				key: 0,
				name: e.prefix,
				size: 15
			}, null, 8, ["name"])) : s("", !0)], !0)])) : s("", !0),
			(A(), o(I(g.value ? "textarea" : "input"), x(d.value, {
				class: "mc-input__field",
				value: m.value,
				type: g.value ? void 0 : _.value,
				placeholder: e.placeholder,
				disabled: e.disabled,
				readonly: e.readonly,
				maxlength: e.maxlength,
				autofocus: e.autofocus,
				rows: g.value ? 3 : void 0,
				"aria-invalid": e.status === "error" || void 0,
				"aria-disabled": e.disabled || void 0,
				onInput: D,
				onChange: O,
				onFocus: k,
				onBlur: j,
				onKeydown: M
			}), null, 16, [
				"value",
				"type",
				"placeholder",
				"disabled",
				"readonly",
				"maxlength",
				"autofocus",
				"rows",
				"aria-invalid",
				"aria-disabled"
			])),
			e.showCount ? (A(), c("span", eh, R(E.value), 1)) : s("", !0),
			S.value ? (A(), c("button", {
				key: 2,
				type: "button",
				class: "mc-input__action",
				"aria-label": h.value ? B(r).input.hidePassword ?? "Hide password" : B(r).input.showPassword ?? "Show password",
				onClick: L
			}, [f($, {
				name: h.value ? "eye-off" : "eye",
				size: 15
			}, null, 8, ["name"])], 8, th)) : s("", !0),
			b.value ? (A(), c("button", {
				key: 3,
				type: "button",
				class: "mc-input__action",
				"aria-label": B(r).input.clear ?? "Clear",
				onClick: P
			}, [f($, {
				name: "close",
				size: 14,
				"stroke-width": 2.4
			})], 8, nh)) : s("", !0),
			e.suffix || t.$slots.suffix ? (A(), c("span", rh, [F(t.$slots, "suffix", {}, () => [e.suffix ? (A(), o($, {
				key: 0,
				name: e.suffix,
				size: 15
			}, null, 8, ["name"])) : s("", !0)], !0)])) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-62243a5a"]]), ah = {
	key: 0,
	class: "mc-input-number__controls mc-input-number__controls--left"
}, oh = ["disabled", "aria-label"], sh = ["disabled", "aria-label"], ch = [
	"value",
	"placeholder",
	"disabled",
	"aria-disabled",
	"aria-valuemin",
	"aria-valuemax"
], lh = {
	key: 1,
	class: "mc-input-number__controls mc-input-number__controls--right"
}, uh = ["disabled", "aria-label"], dh = ["disabled", "aria-label"], fh = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiInputNumber",
	inheritAttrs: !1,
	__name: "InputNumber",
	props: {
		modelValue: { default: null },
		min: {},
		max: {},
		step: { default: 1 },
		precision: {},
		controlsPosition: {
			type: [String, Boolean],
			default: "both"
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		variant: { default: "filled" },
		placeholder: { default: "" },
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, o = V(), u = i(() => {
			let { class: e, style: t, ...n } = o;
			return n;
		}), d = N(n.modelValue === null || n.modelValue === void 0 ? "" : String(n.modelValue)), f = N(n.modelValue === null || n.modelValue === void 0 ? null : n.modelValue);
		G(() => n.modelValue, (e) => {
			d.value = e == null ? "" : String(e);
		});
		let p = i(() => n.modelValue === null || n.modelValue === void 0 ? null : n.modelValue);
		function m(e) {
			if (n.precision === void 0 || n.precision === null) return Number(e.toFixed(10));
			let t = Math.max(0, Math.floor(n.precision));
			return Number(e.toFixed(t));
		}
		function h(e) {
			let t = e;
			return n.min !== void 0 && (t = Math.max(t, n.min)), n.max !== void 0 && (t = Math.min(t, n.max)), m(t);
		}
		function g(e) {
			let t = e === null ? null : h(e);
			t === p.value ? d.value = t === null ? "" : String(t) : (d.value = t === null ? "" : String(t), a("update:modelValue", t), a("change", t));
		}
		function _(e) {
			let t = e.target;
			d.value = t.value;
			let n = t.value.trim();
			if (n === "") {
				a("update:modelValue", null);
				return;
			}
			let r = Number(n);
			if (Number.isNaN(r)) return;
			let i = h(r);
			a("update:modelValue", i);
		}
		function v() {
			f.value = p.value;
		}
		function y() {
			let e = d.value.trim();
			if (e === "") {
				g(null), b(null);
				return;
			}
			let t = Number(e), n = Number.isNaN(t) ? p.value : t;
			g(n), b(n);
		}
		function b(e) {
			e !== f.value && (f.value = e, e === p.value && a("change", e));
		}
		function S(e) {
			n.disabled || (e.key === "ArrowUp" ? (e.preventDefault(), w(1)) : e.key === "ArrowDown" ? (e.preventDefault(), w(-1)) : e.key === "Enter" && y());
		}
		function w(e) {
			if (n.disabled) return;
			let t = (p.value ?? (n.min === void 0 ? 0 : n.min)) + e * (n.step ?? 1);
			g(h(m(Math.round(t / (n.step ?? 1)) * (n.step ?? 1))));
		}
		let E = i(() => n.controlsPosition === "both" || n.controlsPosition === "left"), D = i(() => n.controlsPosition === "both" || n.controlsPosition === "right"), O = i(() => n.controlsPosition === "left" || n.controlsPosition === "right"), k = i(() => n.min !== void 0 && p.value !== null && p.value <= n.min), j = i(() => n.max !== void 0 && p.value !== null && p.value >= n.max), M = i(() => n.disabled || k.value), P = i(() => n.disabled || j.value), F = i(() => Z("mc-input-number", "mc-sheen-sweep", `mc-input-number--${n.variant}`, `mc-input-number--${n.size}`, {
			"is-disabled": n.disabled,
			"is-stacked": O.value
		})), I = i(() => Z(F.value, o.class, n.customClass)), L = i(() => o.style), R = i(() => ({
			min: n.min,
			max: n.max
		}));
		return (t, n) => (A(), c("div", {
			class: C(I.value),
			style: T(L.value)
		}, [
			n[8] || (n[8] = l("span", {
				class: "mc-input-number__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			E.value ? (A(), c("div", ah, [l("button", {
				type: "button",
				class: "mc-input-number__step",
				disabled: M.value,
				"aria-label": B(r).inputNumber?.decrease ?? "Decrease",
				onClick: n[0] || (n[0] = (e) => w(-1))
			}, [...n[4] || (n[4] = [l("span", { class: "mc-input-number__glyph" }, "−", -1)])], 8, oh), O.value ? (A(), c("button", {
				key: 0,
				type: "button",
				class: "mc-input-number__step",
				disabled: P.value,
				"aria-label": B(r).inputNumber?.increase ?? "Increase",
				onClick: n[1] || (n[1] = (e) => w(1))
			}, [...n[5] || (n[5] = [l("span", { class: "mc-input-number__glyph" }, "+", -1)])], 8, sh)) : s("", !0)])) : s("", !0),
			l("input", x(u.value, {
				class: "mc-input-number__field",
				type: "text",
				inputmode: "decimal",
				value: d.value,
				placeholder: e.placeholder,
				disabled: e.disabled,
				"aria-disabled": e.disabled || void 0,
				"aria-valuemin": R.value.min,
				"aria-valuemax": R.value.max,
				onInput: _,
				onFocus: v,
				onBlur: y,
				onKeydown: S
			}), null, 16, ch),
			D.value ? (A(), c("div", lh, [O.value ? (A(), c("button", {
				key: 0,
				type: "button",
				class: "mc-input-number__step",
				disabled: M.value,
				"aria-label": B(r).inputNumber?.decrease ?? "Decrease",
				onClick: n[2] || (n[2] = (e) => w(-1))
			}, [...n[6] || (n[6] = [l("span", { class: "mc-input-number__glyph" }, "−", -1)])], 8, uh)) : s("", !0), l("button", {
				type: "button",
				class: "mc-input-number__step",
				disabled: P.value,
				"aria-label": B(r).inputNumber?.increase ?? "Increase",
				onClick: n[3] || (n[3] = (e) => w(1))
			}, [...n[7] || (n[7] = [l("span", { class: "mc-input-number__glyph" }, "+", -1)])], 8, dh)])) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-6b0524dc"]]), ph = ["aria-label"], mh = { class: "mc-input-otp__track" }, hh = [
	"type",
	"value",
	"disabled",
	"aria-label",
	"autocomplete",
	"id",
	"onInput",
	"onKeydown",
	"onPaste",
	"onFocus"
], gh = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiInputOTP",
	__name: "InputOTP",
	props: {
		modelValue: { default: "" },
		length: { default: 6 },
		disabled: {
			type: Boolean,
			default: !1
		},
		mask: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"complete"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Fi("mc-otp"), s = N([]), u = N(0), d = N({
			opacity: 0,
			transform: "translate3d(0, 0, 0)",
			width: "0px",
			height: "0px"
		}), f = N([]);
		function p() {
			let e = (r.modelValue ?? "").replace(/\s/g, ""), t = [];
			for (let n = 0; n < r.length; n += 1) t.push(e[n] ?? "");
			f.value = t;
		}
		G(() => r.modelValue, p, { immediate: !0 }), G(() => r.length, () => {
			p(), u.value = Math.min(u.value, Math.max(r.length - 1, 0));
		});
		let m = i(() => f.value.join("")), h = i(() => m.value.length === r.length && m.value.length > 0);
		function g() {
			a("update:modelValue", m.value), a("change", m.value), h.value && a("complete", m.value);
		}
		function _(e) {
			let t = Math.min(Math.max(e, 0), r.length - 1);
			u.value = t, S(() => {
				s.value[t]?.focus(), s.value[t]?.select(), v();
			});
		}
		function v() {
			let e = s.value[u.value];
			e ? d.value = {
				opacity: +!r.disabled,
				transform: `translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0)`,
				width: `${e.offsetWidth}px`,
				height: `${e.offsetHeight}px`
			} : d.value = {
				opacity: 0,
				transform: "translate3d(0, 0, 0)",
				width: "0px",
				height: "0px"
			};
		}
		function y(e, t) {
			let n = t.target, i = n.value.replace(/[^\dA-Za-z]/g, ""), a = i ? i.slice(-1) : "", o = f.value.slice();
			o[e] = a, f.value = o, n.value = a, g(), a && e < r.length - 1 ? _(e + 1) : v();
		}
		function b(e, t) {
			if (!r.disabled) {
				if (t.key === "Backspace") {
					if (!f.value[e] && e > 0) {
						t.preventDefault();
						let n = f.value.slice();
						n[e - 1] = "", f.value = n, g(), _(e - 1);
					}
				} else if (t.key === "ArrowLeft" && e > 0) t.preventDefault(), _(e - 1);
				else if (t.key === "ArrowRight" && e < r.length - 1) t.preventDefault(), _(e + 1);
				else if (t.key === "Delete") {
					t.preventDefault();
					let n = f.value.slice();
					n[e] = "", f.value = n, g();
				}
			}
		}
		function x(e, t) {
			if (r.disabled) return;
			let n = (t.clipboardData?.getData("text") ?? "").replace(/[^\dA-Za-z]/g, "");
			if (!n) return;
			t.preventDefault();
			let i = f.value.slice(), a = e;
			for (let e of n) {
				if (a >= r.length) break;
				i[a] = e, a += 1;
			}
			f.value = i, g(), _(Math.min(a, r.length - 1));
		}
		function w(e) {
			u.value = e, S(v);
		}
		function D() {
			S(v);
		}
		function k() {
			v();
		}
		O(() => {
			window.addEventListener("resize", k), S(v);
		}), E(() => window.removeEventListener("resize", k));
		let j = i(() => Z("mc-input-otp", `mc-input-otp--${r.size}`, {
			"is-disabled": r.disabled,
			"is-complete": h.value
		}, r.customClass));
		return (n, r) => (A(), c("div", {
			class: C(j.value),
			role: "group",
			"aria-label": `${t.length} character code`
		}, [l("div", mh, [
			r[0] || (r[0] = l("span", {
				class: "mc-input-otp__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-input-otp__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			l("span", {
				class: "mc-input-otp__ring",
				style: T(d.value),
				"aria-hidden": "true"
			}, null, 4),
			(A(!0), c(e, null, P(t.length, (e) => (A(), c("input", {
				key: e,
				ref_for: !0,
				ref: (t) => {
					t && (s.value[e - 1] = t);
				},
				class: C(["mc-input-otp__box", {
					"is-filled": !!f.value[e - 1],
					"is-active": u.value === e - 1
				}]),
				type: t.mask ? "password" : "text",
				value: f.value[e - 1] ?? "",
				disabled: t.disabled,
				"aria-label": `digit ${e} of ${t.length}`,
				autocomplete: e === 1 ? "one-time-code" : "off",
				id: e === 1 ? B(o) : void 0,
				inputmode: "numeric",
				maxlength: "1",
				onInput: (t) => y(e - 1, t),
				onKeydown: (t) => b(e - 1, t),
				onPaste: (t) => x(e - 1, t),
				onFocus: (t) => w(e - 1),
				onBlur: D
			}, null, 42, hh))), 128))
		])], 10, ph));
	}
}), [["__scopeId", "data-v-b23ba80b"]]), _h = [
	"viewBox",
	"width",
	"height",
	"aria-label"
], vh = ["id"], yh = ["d", "fill"], bh = [
	"d",
	"stroke",
	"filter",
	"stroke-width"
], xh = [
	"cx",
	"cy",
	"r"
], Sh = {
	key: 2,
	class: "mc-sparkline__hover"
}, Ch = [
	"x1",
	"y1",
	"x2",
	"y2"
], wh = [
	"cx",
	"cy",
	"r"
], Th = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSparkline",
	__name: "Sparkline",
	props: {
		data: { default: () => [] },
		width: { default: 160 },
		height: { default: 44 },
		showArea: {
			type: Boolean,
			default: !0
		},
		showDot: {
			type: Boolean,
			default: !0
		},
		smooth: {
			type: Boolean,
			default: !0
		},
		strokeWidth: { default: 2 },
		animated: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = Zt(), r = N(null), a = N(null), o = i(() => Math.max(2, t.strokeWidth + 1)), u = i(() => {
			let e = t.data;
			if (!e.length) return {
				min: 0,
				max: 1
			};
			let n = Math.min(...e), r = Math.max(...e);
			return {
				min: n,
				max: n === r ? n + 1 : r
			};
		}), d = i(() => {
			let e = t.data;
			if (!e.length) return [];
			let n = t.width - o.value * 2, r = t.height - o.value * 2, { min: i, max: a } = u.value, s = e.length > 1 ? n / (e.length - 1) : 0;
			return e.map((e, t) => {
				let n = o.value + t * s, c = o.value + r - (e - i) / (a - i) * r;
				return {
					x: Number(n.toFixed(2)),
					y: Number(c.toFixed(2)),
					value: e
				};
			});
		}), f = i(() => {
			let e = d.value;
			if (!e.length) return "";
			if (!t.smooth) return e.map((e, t) => `${t ? "L" : "M"}${e.x} ${e.y}`).join(" ");
			let n = `M${e[0].x} ${e[0].y}`;
			for (let t = 0; t < e.length - 1; t++) {
				let r = e[t === 0 ? 0 : t - 1], i = e[t], a = e[t + 1], o = e[t + 2] ?? a, s = i.x + (a.x - r.x) / 6, c = i.y + (a.y - r.y) / 6, l = a.x - (o.x - i.x) / 6, u = a.y - (o.y - i.y) / 6;
				n += ` C${s.toFixed(2)} ${c.toFixed(2)}, ${l.toFixed(2)} ${u.toFixed(2)}, ${a.x} ${a.y}`;
			}
			return n;
		}), p = i(() => {
			let e = d.value;
			if (!e.length) return "";
			let n = t.height - o.value;
			return `${f.value} L${e[e.length - 1].x} ${n} L${e[0].x} ${n} Z`;
		}), m = i(() => d.value[d.value.length - 1]), h = i(() => a.value === null ? null : d.value[a.value] ?? null), g = `mc-spark-${Math.random().toString(36).slice(2, 9)}`, _ = g, v = `${g}-line`, y = `${g}-glow`;
		function b(e) {
			let n = r.value, i = d.value;
			if (!n || !i.length) return;
			let o = n.getBoundingClientRect();
			if (!o.width) return;
			let s = t.width / o.width, c = (e.clientX - o.left) * s, l = 0, u = Infinity;
			i.forEach((e, t) => {
				let n = Math.abs(e.x - c);
				n < u && (u = n, l = t);
			}), a.value = l;
		}
		function x() {
			a.value = null;
		}
		return (t, i) => (A(), c("svg", {
			ref_key: "svgRef",
			ref: r,
			class: C(["mc-sparkline", [B(Z)({ "is-animated": e.animated }, e.customClass)]]),
			viewBox: `0 0 ${e.width} ${e.height}`,
			width: e.width,
			height: e.height,
			role: "img",
			"aria-label": B(n).sparkline?.label ?? "sparkline",
			onMousemove: b,
			onMouseleave: x
		}, [
			l("defs", null, [
				l("linearGradient", {
					id: B(_),
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1"
				}, [...i[0] || (i[0] = [l("stop", {
					offset: "0%",
					"stop-color": "var(--mc-accent)",
					"stop-opacity": "0.42"
				}, null, -1), l("stop", {
					offset: "100%",
					"stop-color": "var(--mc-accent)",
					"stop-opacity": "0"
				}, null, -1)])], 8, vh),
				l("linearGradient", {
					id: v,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0"
				}, [...i[1] || (i[1] = [l("stop", {
					offset: "0%",
					"stop-color": "var(--mc-accent-3)"
				}, null, -1), l("stop", {
					offset: "100%",
					"stop-color": "var(--mc-accent)"
				}, null, -1)])]),
				l("filter", {
					id: y,
					x: "-50%",
					y: "-50%",
					width: "200%",
					height: "200%"
				}, [...i[2] || (i[2] = [l("feGaussianBlur", {
					stdDeviation: "2.6",
					result: "blur"
				}, null, -1), l("feMerge", null, [
					l("feMergeNode", { in: "blur" }),
					l("feMergeNode", { in: "blur" }),
					l("feMergeNode", { in: "SourceGraphic" })
				], -1)])])
			]),
			e.showArea ? (A(), c("path", {
				key: 0,
				class: "mc-sparkline__area",
				d: p.value,
				fill: `url(#${B(_)})`
			}, null, 8, yh)) : s("", !0),
			l("path", {
				class: "mc-sparkline__line",
				d: f.value,
				stroke: `url(#${v})`,
				filter: `url(#${y})`,
				fill: "none",
				"stroke-width": e.strokeWidth,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, null, 8, bh),
			e.showDot && m.value ? (A(), c("circle", {
				key: 1,
				class: "mc-sparkline__dot",
				cx: m.value.x,
				cy: m.value.y,
				r: e.strokeWidth + 1
			}, null, 8, xh)) : s("", !0),
			h.value ? (A(), c("g", Sh, [l("line", {
				class: "mc-sparkline__guide",
				x1: h.value.x,
				y1: o.value,
				x2: h.value.x,
				y2: e.height - o.value
			}, null, 8, Ch), l("circle", {
				class: "mc-sparkline__hover-dot",
				cx: h.value.x,
				cy: h.value.y,
				r: e.strokeWidth + 2
			}, null, 8, wh)])) : s("", !0)
		], 42, _h));
	}
}), [["__scopeId", "data-v-a660277d"]]), Eh = ["aria-busy"], Dh = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Oh = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, kh = { class: "mc-kpi-card__header" }, Ah = { class: "mc-kpi-card__title" }, jh = {
	key: 0,
	class: "mc-kpi-card__badge"
}, Mh = {
	key: 2,
	class: "mc-kpi-card__row",
	"aria-live": "polite"
}, Nh = {
	class: "mc-kpi-card__value",
	"data-mc-type": "readout"
}, Ph = {
	key: 0,
	class: "mc-kpi-card__affix"
}, Fh = { class: "mc-kpi-card__number mc-kpi-card__number--gradient" }, Ih = {
	key: 1,
	class: "mc-kpi-card__affix"
}, Lh = { class: "mc-kpi-card__trend-value" }, Rh = {
	key: 3,
	class: "mc-kpi-card__skeleton",
	"aria-hidden": "true"
}, zh = {
	key: 4,
	class: "mc-kpi-card__sparkline"
}, Bh = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiKpiCard",
	__name: "KpiCard",
	props: {
		title: {},
		value: {},
		precision: { default: 0 },
		prefix: {},
		suffix: {},
		trend: {},
		trendColor: { default: "auto" },
		icon: {},
		color: { default: "default" },
		sparkline: {},
		variant: { default: "solid" },
		hoverable: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => {
			let e = t.value;
			if (typeof e == "number") return Number.isFinite(e) ? e : 0;
			let n = Number.parseFloat(String(e ?? "").replace(/[^0-9.eE+-]/g, ""));
			return Number.isFinite(n) ? n : 0;
		}), r = i(() => {
			if (typeof t.value == "number") return !0;
			let e = String(t.value ?? "").trim();
			return e !== "" && Number.isFinite(Number.parseFloat(e));
		}), { display: a } = Ru(i(() => n.value), {
			duration: 900,
			decimals: t.precision,
			from: 0
		}), o = i(() => r.value ? a.value : String(t.value ?? "")), u = i(() => {
			let e = t.trend;
			if (!e) return null;
			let n = e.direction ?? (e.value < 0 ? "down" : "up"), r = Math.abs(e.value);
			return {
				text: Number.isInteger(r) ? String(r) : r.toFixed(t.precision > 0 ? t.precision : 1),
				direction: n
			};
		}), d = i(() => t.trendColor === "success" ? "success" : t.trendColor === "danger" ? "danger" : u.value?.direction === "up" ? "success" : "danger"), p = i(() => Z("mc-kpi-card", `mc-kpi-card--${t.variant}`, `mc-kpi-card--${t.color}`, {
			"mc-liquid-glass": t.variant === "liquid",
			"mc-liquid-glass--liquid": t.variant === "liquid",
			"mc-liquid-glass--layers": t.variant === "liquid",
			"is-hoverable": t.hoverable,
			"is-loading": t.loading,
			"is-animated": r.value
		}, t.customClass));
		return (t, n) => (A(), c("div", {
			class: C(p.value),
			"aria-busy": e.loading ? "true" : void 0
		}, [
			e.variant === "liquid" ? (A(), c("span", Dh)) : s("", !0),
			n[0] || (n[0] = l("span", {
				class: "mc-kpi-card__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.variant === "liquid" ? (A(), c("span", Oh)) : s("", !0),
			n[1] || (n[1] = l("span", {
				class: "mc-kpi-card__grain",
				"aria-hidden": "true"
			}, null, -1)),
			l("header", kh, [l("span", Ah, R(e.title), 1), e.icon ? (A(), c("span", jh, [f($, {
				name: e.icon,
				size: 18
			}, null, 8, ["name"])])) : s("", !0)]),
			e.loading ? (A(), c("div", Rh)) : (A(), c("div", Mh, [l("span", Nh, [
				e.prefix ? (A(), c("span", Ph, R(e.prefix), 1)) : s("", !0),
				l("span", Fh, R(o.value), 1),
				e.suffix ? (A(), c("span", Ih, R(e.suffix), 1)) : s("", !0)
			]), u.value ? (A(), c("span", {
				key: 0,
				class: C(["mc-kpi-card__trend", `mc-kpi-card__trend--${d.value}`])
			}, [f($, {
				name: u.value.direction === "up" ? "arrow-up" : "arrow-down",
				size: 12,
				"stroke-width": 2.4
			}, null, 8, ["name"]), l("span", Lh, R(u.value.text), 1)], 2)) : s("", !0)])),
			e.sparkline && e.sparkline.length ? (A(), c("div", zh, [f(Th, {
				data: e.sparkline,
				width: 240,
				height: 44
			}, null, 8, ["data"])])) : s("", !0)
		], 10, Eh));
	}
}), [["__scopeId", "data-v-c5bdfad7"]]), Vh = { class: "mc-layout__header-inner" }, Hh = { class: "mc-layout__body" }, Uh = [
	"aria-label",
	"aria-expanded",
	"aria-disabled",
	"disabled"
], Wh = { class: "mc-layout__sider-body" }, Gh = { class: "mc-layout__sider-inner" }, Kh = { class: "mc-layout__content" }, qh = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiLayout",
	__name: "Layout",
	props: {
		hasSider: {
			type: Boolean,
			default: !1
		},
		siderWidth: { default: 240 },
		siderCollapsed: {
			type: Boolean,
			default: !1
		},
		siderCollapsedWidth: { default: 68 },
		headerHeight: { default: 64 },
		footerHeight: { default: 64 },
		hasHeader: {
			type: Boolean,
			default: !0
		},
		hasFooter: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		toggleLabel: { default: "Toggle sidebar" },
		customClass: {}
	},
	emits: ["update:siderCollapsed", "toggle"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = i(() => !!n.siderCollapsed);
		function o() {
			if (n.disabled) return;
			let e = !a.value;
			r("update:siderCollapsed", e), r("toggle", e);
		}
		let u = i(() => Z("mc-layout", {
			"has-sider": n.hasSider,
			"is-collapsed": a.value,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (A(), c("div", { class: C(u.value) }, [
			e.hasHeader ? (A(), c("header", {
				key: 0,
				class: "mc-layout__header mc-sheen-sweep",
				style: T({ height: `${e.headerHeight}px` })
			}, [
				n[0] || (n[0] = l("span", {
					class: "mc-layout__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				n[1] || (n[1] = l("span", {
					class: "mc-layout__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				l("div", Vh, [F(t.$slots, "header", {}, void 0, !0)])
			], 4)) : s("", !0),
			l("div", Hh, [e.hasSider ? (A(), c("aside", {
				key: 0,
				class: "mc-layout__sider",
				style: T({ width: `${a.value ? e.siderCollapsedWidth : e.siderWidth}px` })
			}, [
				n[2] || (n[2] = l("span", {
					class: "mc-layout__sider-accent",
					"aria-hidden": "true"
				}, null, -1)),
				l("button", {
					type: "button",
					class: "mc-layout__toggle",
					"aria-label": e.toggleLabel,
					"aria-expanded": !a.value,
					"aria-disabled": e.disabled ? "true" : void 0,
					disabled: e.disabled,
					onClick: o
				}, [f($, {
					name: a.value ? "chevron-right" : "chevron-left",
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])], 8, Uh),
				l("div", Wh, [l("div", Gh, [F(t.$slots, "sider", {}, void 0, !0)])])
			], 4)) : s("", !0), l("main", Kh, [F(t.$slots, "default", {}, void 0, !0)])]),
			e.hasFooter ? (A(), c("footer", {
				key: 1,
				class: "mc-layout__footer",
				style: T({ height: `${e.footerHeight}px` })
			}, [F(t.$slots, "footer", {}, void 0, !0)], 4)) : s("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-93d02311"]]), Jh = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuetext",
	"aria-disabled"
], Yh = {
	key: 0,
	class: "mc-level-meter__readout mc-sheen-sweep mc-grain-overlay"
}, Xh = { class: "mc-level-meter__readout-text" }, Zh = { class: "mc-level-meter__body" }, Qh = {
	class: "mc-level-meter__segments",
	"aria-hidden": "true"
}, $h = {
	key: 0,
	class: "mc-level-meter__scale",
	"aria-hidden": "true"
}, eg = 3, tg = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiLevelMeter",
	__name: "LevelMeter",
	props: {
		modelValue: { default: 0 },
		min: { default: 0 },
		max: { default: 100 },
		segments: { default: 12 },
		step: { default: 1 },
		orientation: { default: "vertical" },
		segmentSize: { default: 6 },
		thickness: { default: 14 },
		thresholds: { default: () => [70, 90] },
		marks: { default: () => [] },
		showScale: {
			type: Boolean,
			default: !0
		},
		showValue: {
			type: Boolean,
			default: !0
		},
		label: { default: "电平" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(Ot(r.modelValue, r.min, r.max));
		G(() => r.modelValue, (e) => {
			o.value = Ot(e, r.min, r.max);
		});
		let u = i(() => {
			let e = r.max - r.min;
			return e > 0 ? e : 1;
		}), f = i(() => Ot((o.value - r.min) / u.value, 0, 1));
		function p(e) {
			let t = Ot(e, r.min, r.max);
			t !== o.value && (o.value = t, a("update:modelValue", t), a("change", t));
		}
		function m(e) {
			let t = e * 100, n = r.thresholds ?? [];
			return n.length >= 2 && t > n[1] ? "danger" : n.length >= 1 && t > n[0] ? "warning" : "accent";
		}
		let h = i(() => Math.max(1, Math.floor(r.segments))), g = i(() => {
			let e = h.value, t = [];
			for (let n = 0; n < e; n++) {
				let r = n / e, i = (n + 1) / e;
				t.push({
					key: String(n),
					fill: Ot((f.value - r) / (i - r), 0, 1),
					tier: m(i)
				});
			}
			return t;
		}), _ = i(() => {
			let e = h.value, t = Math.max(1, r.segmentSize);
			return {
				"--mc-lm-length": `${e * t + (e - 1) * eg}px`,
				"--mc-lm-thickness": `${Math.max(1, r.thickness)}px`,
				"--mc-lm-gap": `${eg}px`,
				"--mc-lm-step": `${t}px`
			};
		}), v = i(() => (r.marks?.length ? r.marks : [r.min, r.max]).map((e, t) => ({
			key: `${t}-${e}`,
			label: String(e),
			pos: Ot((e - r.min) / u.value, 0, 1) * 100
		})));
		function y(e) {
			if (r.disabled) return;
			let t = Math.abs(r.step) || 1, n = r.orientation === "vertical", i = 0;
			if (e.key === "ArrowUp" || e.key === "ArrowRight" && !n) i = t;
			else if (e.key === "ArrowDown" || e.key === "ArrowLeft" && !n) i = -t;
			else if (e.key === "PageUp") i = t * 10;
			else if (e.key === "PageDown") i = -t * 10;
			else if (e.key === "Home") {
				e.preventDefault(), p(r.min);
				return;
			} else if (e.key === "End") {
				e.preventDefault(), p(r.max);
				return;
			} else return;
			e.preventDefault(), p(o.value + i);
		}
		let b = i(() => String(Math.round(o.value * 100) / 100)), x = i(() => Z("mc-level-meter", `mc-level-meter--${r.orientation}`, { "is-disabled": r.disabled }, r.customClass));
		function S(e) {
			let t = r.orientation === "vertical";
			return {
				"--mc-lm-fill-x": t ? "1" : String(e),
				"--mc-lm-fill-y": t ? String(e) : "1"
			};
		}
		function w(e) {
			return { "--mc-lm-pos": `${e}%` };
		}
		return (n, r) => (A(), c("div", {
			class: C(x.value),
			style: T(_.value),
			role: "meter",
			tabindex: t.disabled ? -1 : 0,
			"aria-label": t.label,
			"aria-valuenow": o.value,
			"aria-valuemin": t.min,
			"aria-valuemax": t.max,
			"aria-valuetext": b.value,
			"aria-disabled": t.disabled || void 0,
			onKeydown: y
		}, [t.showValue ? (A(), c("div", Yh, [r[0] || (r[0] = l("span", {
			class: "mc-level-meter__aurora",
			"aria-hidden": "true"
		}, null, -1)), l("span", Xh, [F(n.$slots, "value", {}, () => [d(R(b.value), 1)], !0)])])) : s("", !0), l("div", Zh, [l("div", Qh, [(A(!0), c(e, null, P(g.value, (e) => (A(), c("span", {
			key: e.key,
			class: C(["mc-level-meter__segment", `mc-level-meter__segment--${e.tier}`])
		}, [l("span", {
			class: "mc-level-meter__fill",
			style: T(S(e.fill))
		}, null, 4)], 2))), 128))]), t.showScale ? (A(), c("div", $h, [(A(!0), c(e, null, P(v.value, (e) => (A(), c("span", {
			key: e.key,
			class: "mc-level-meter__mark",
			style: T(w(e.pos))
		}, R(e.label), 5))), 128))])) : s("", !0)])], 46, Jh));
	}
}), [["__scopeId", "data-v-8c5afab6"]]), ng = [
	"tabindex",
	"role",
	"aria-disabled"
], rg = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiLiquidGlass",
	__name: "LiquidGlass",
	props: {
		variant: { default: "default" },
		dark: {
			type: Boolean,
			default: !1
		},
		refract: {
			type: Boolean,
			default: !0
		},
		tint: {},
		tintOpacity: {},
		bezel: {},
		thickness: {},
		ior: {},
		dispersion: {},
		specular: {},
		flow: {},
		hover: {
			type: Boolean,
			default: !1
		},
		pill: {
			type: Boolean,
			default: !1
		},
		radius: {},
		focusable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = i(() => Z("mc-liquid-glass", `mc-liquid-glass--${n.variant}`, {
			"mc-liquid-glass--dark": n.dark,
			"mc-liquid-glass--refract": n.refract,
			"mc-liquid-glass--no-refract": !n.refract,
			"mc-liquid-glass--pill": n.pill,
			"is-hover": n.hover,
			"is-focusable": n.focusable,
			"is-disabled": n.disabled
		}, n.customClass)), o = i(() => {
			let e = {};
			return n.radius && (e.borderRadius = n.radius), n.tint && (e["--mc-liquid-tint-color"] = n.tint), n.tintOpacity !== void 0 && (e["--mc-liquid-tint"] = String(n.tintOpacity)), n.bezel !== void 0 && (e["--mc-liquid-bezel"] = `${n.bezel}px`), n.thickness !== void 0 && (e["--mc-liquid-thickness"] = `${n.thickness}px`), n.ior !== void 0 && (e["--mc-liquid-ior"] = String(n.ior)), n.dispersion !== void 0 && (e["--mc-liquid-dispersion"] = String(n.dispersion)), n.specular !== void 0 && (e["--mc-liquid-specular"] = String(n.specular)), n.flow !== void 0 && (e["--mc-liquid-flow"] = String(n.flow)), Object.keys(e).length ? e : void 0;
		});
		function s(e) {
			n.disabled || r("click", e);
		}
		function l(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), !n.disabled && r("click", new MouseEvent("click")));
		}
		return O(() => {
			n.refract && Ke();
		}), G(() => n.refract, (e) => {
			e ? Ke() : Ge();
		}), G(() => [
			n.bezel,
			n.thickness,
			n.ior,
			n.dispersion,
			n.radius
		], () => Ge()), (t, n) => (A(), c("div", {
			class: C(a.value),
			style: T(o.value),
			tabindex: e.focusable ? 0 : void 0,
			role: e.focusable ? "button" : void 0,
			"aria-disabled": e.disabled || void 0,
			onClick: s,
			onKeydown: l
		}, [F(t.$slots, "default", {}, void 0, !0)], 46, ng));
	}
}), [["__scopeId", "data-v-0e3d67be"]]), ig = {
	key: 0,
	class: "mc-list__badge mc-list__skeleton",
	"aria-hidden": "true"
}, ag = {
	key: 1,
	class: "mc-list__avatar mc-list__skeleton mc-list__skeleton--avatar"
}, og = [
	"tabindex",
	"aria-disabled",
	"onClick",
	"onKeydown"
], sg = {
	key: 0,
	class: "mc-list__badge"
}, cg = {
	key: 1,
	class: "mc-list__avatar"
}, lg = ["src", "alt"], ug = {
	key: 2,
	class: "mc-list__avatar-text"
}, dg = { class: "mc-list__body" }, fg = {
	class: "mc-list__title",
	"data-mc-type": "title"
}, pg = {
	key: 0,
	class: "mc-list__meta"
}, mg = {
	key: 2,
	class: "mc-list__extra"
}, hg = {
	key: 0,
	class: "mc-list__empty mc-aurora-inset",
	role: "status"
}, gg = { class: "mc-list__empty-text" }, _g = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiList",
	__name: "List",
	props: {
		data: { default: () => [] },
		split: {
			type: Boolean,
			default: !0
		},
		size: { default: "medium" },
		avatar: {
			type: [Boolean, String],
			default: !1
		},
		badge: {
			type: [
				Boolean,
				String,
				Object
			],
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingRows: { default: 4 },
		titleKey: { default: "title" },
		metaKey: { default: "description" },
		emptyText: { default: "No data" },
		customClass: {}
	},
	emits: ["click"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => {
			let e = r.avatar;
			return e ? typeof e == "string" ? { icon: e } : e === !0 ? { icon: "user" } : e : null;
		}), p = i(() => !!u.value), m = i(() => !!r.badge);
		function h(e) {
			return typeof r.badge == "string" ? r.badge : e && typeof e == "object" && e.icon || "sparkles";
		}
		let g = i(() => Z("mc-list", "mc-grain-overlay", `mc-list--${r.size}`, {
			"is-split": r.split,
			"is-loading": r.loading,
			"has-avatar": p.value && !m.value,
			"has-badge": m.value
		}, r.customClass));
		function _(e) {
			return e?.[r.titleKey];
		}
		function v(e) {
			return e?.[r.metaKey];
		}
		function y(e) {
			return !!(e && typeof e == "object" && e.disabled);
		}
		function b(e, t) {
			y(e) || a("click", e, t);
		}
		function x(e, t, n) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), b(t, n));
		}
		return (n, r) => (A(), c("div", {
			class: C(g.value),
			role: "list"
		}, [t.loading ? (A(!0), c(e, { key: 0 }, P(t.loadingRows, (e) => (A(), c("div", {
			key: e,
			class: "mc-list__item mc-list__item--skeleton",
			style: T({ "--i": e - 1 }),
			"aria-hidden": "true"
		}, [
			m.value ? (A(), c("span", ig)) : s("", !0),
			p.value && !m.value ? (A(), c("span", ag)) : s("", !0),
			r[0] || (r[0] = l("span", { class: "mc-list__body" }, [l("span", { class: "mc-list__skeleton mc-list__skeleton--title" }), l("span", { class: "mc-list__skeleton mc-list__skeleton--meta" })], -1))
		], 4))), 128)) : (A(), c(e, { key: 1 }, [(A(!0), c(e, null, P(t.data, (e, t) => (A(), c("div", {
			key: t,
			class: C(["mc-list__item mc-sheen-sweep", { "is-disabled": y(e) }]),
			style: T({ "--i": t }),
			role: "button",
			tabindex: y(e) ? -1 : 0,
			"aria-disabled": y(e) ? "true" : void 0,
			onClick: (n) => b(e, t),
			onKeydown: (n) => x(n, e, t)
		}, [
			m.value ? (A(), c("span", sg, [F(n.$slots, "badge", {
				item: e,
				index: t
			}, () => [f($, {
				name: h(e),
				size: 18
			}, null, 8, ["name"])], !0)])) : s("", !0),
			p.value && !m.value ? (A(), c("span", cg, [F(n.$slots, "avatar", {
				item: e,
				index: t
			}, () => [u.value?.src ? (A(), c("img", {
				key: 0,
				class: "mc-list__avatar-img",
				src: u.value.src,
				alt: u.value.alt ?? ""
			}, null, 8, lg)) : u.value?.icon ? (A(), o($, {
				key: 1,
				name: u.value.icon,
				class: "mc-list__avatar-icon",
				size: 18
			}, null, 8, ["name"])) : (A(), c("span", ug, R((u.value?.text ?? "").slice(0, 2).toUpperCase()), 1))], !0)])) : s("", !0),
			l("span", dg, [l("span", fg, [F(n.$slots, "itemTitle", {
				item: e,
				index: t
			}, () => [d(R(_(e)), 1)], !0)]), n.$slots.itemMeta || v(e) ? (A(), c("span", pg, [F(n.$slots, "itemMeta", {
				item: e,
				index: t
			}, () => [d(R(v(e)), 1)], !0)])) : s("", !0)]),
			n.$slots.itemExtra ? (A(), c("span", mg, [F(n.$slots, "itemExtra", {
				item: e,
				index: t
			}, void 0, !0)])) : s("", !0)
		], 46, og))), 128)), t.data.length ? s("", !0) : (A(), c("div", hg, [l("span", gg, [F(n.$slots, "empty", {}, () => [d(R(t.emptyText), 1)], !0)])]))], 64))], 2));
	}
}), [["__scopeId", "data-v-c6240ca9"]]), vg = [
	"aria-valuenow",
	"aria-busy",
	"aria-disabled"
], yg = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiLoadingBar",
	__name: "LoadingBar",
	props: {
		loading: {
			type: Boolean,
			default: !1
		},
		color: {},
		height: { default: 3 },
		indeterminate: {
			type: Boolean,
			default: !1
		},
		percent: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(0);
		G(() => t.percent, (e) => {
			n.value = e;
		}, { immediate: !0 }), G(() => t.loading, (e) => {
			e && (n.value = t.percent);
		});
		let r = i(() => t.loading || n.value > 0 && n.value < 100), a = i(() => Math.min(100, Math.max(0, n.value))), o = i(() => ({ ...St(t.color) ? { background: St(t.color) } : {} })), s = i(() => ({ transform: `scaleX(${a.value / 100})` })), u = i(() => ({ "--mc-loading-bar-h": `${t.height}px` })), d = i(() => Z("mc-loading-bar", {
			"is-visible": r.value,
			"is-indeterminate": t.indeterminate,
			"is-disabled": t.disabled
		}, t.customClass));
		return (t, n) => (A(), c("div", {
			class: C(d.value),
			style: T(u.value),
			role: "progressbar",
			tabindex: "0",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": e.indeterminate ? void 0 : a.value,
			"aria-busy": e.loading || void 0,
			"aria-disabled": e.disabled ? "true" : void 0
		}, [
			n[2] || (n[2] = l("span", {
				class: "mc-loading-bar__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			n[3] || (n[3] = l("div", { class: "mc-loading-bar__track mc-grain-overlay" }, null, -1)),
			e.indeterminate ? (A(), c("div", {
				key: 0,
				class: "mc-loading-bar__fill mc-loading-bar__fill--indeterminate",
				style: T(o.value)
			}, [...n[0] || (n[0] = [l("span", {
				class: "mc-loading-bar__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4)) : (A(), c("div", {
				key: 1,
				class: "mc-loading-bar__fill",
				style: T([o.value, s.value])
			}, [...n[1] || (n[1] = [l("span", {
				class: "mc-loading-bar__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4))
		], 14, vg));
	}
}), [["__scopeId", "data-v-d66e06ec"]]), bg = {
	key: 0,
	class: "mc-log__header mc-sheen-sweep"
}, xg = { class: "mc-log__title" }, Sg = [
	"role",
	"tabindex",
	"aria-disabled",
	"onClick",
	"onKeydown"
], Cg = {
	key: 0,
	class: "mc-log__time"
}, wg = {
	key: 1,
	class: "mc-log__badge"
}, Tg = { class: "mc-log__message-wrap" }, Eg = { class: "mc-log__message" }, Dg = {
	key: 0,
	class: "mc-log__empty mc-aurora-inset",
	role: "status"
}, Og = 22, kg = 8, Ag = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiLog",
	__name: "Log",
	props: {
		lines: {},
		level: { default: "all" },
		autoScroll: {
			type: Boolean,
			default: !0
		},
		height: { default: 320 },
		virtual: {
			type: Boolean,
			default: !1
		},
		showTimestamps: {
			type: Boolean,
			default: !0
		},
		showLevel: {
			type: Boolean,
			default: !0
		},
		title: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["select"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(null), u = N(0), d = N(0), f = N(Og), p = null;
		function m(e) {
			let t = e.toLowerCase();
			return t === "warning" ? "warn" : t === "err" ? "error" : t === "verbose" || t === "log" ? "info" : t === "trace" || t === "debug" || t === "info" || t === "success" || t === "warn" || t === "error" ? t : "info";
		}
		function h(e) {
			if (e == null || e === "") return "";
			if (typeof e == "string") return e;
			let t = e instanceof Date ? e : new Date(e);
			return Number.isNaN(t.getTime()) ? String(e) : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(t.getSeconds()).padStart(2, "0")}.${String(t.getMilliseconds()).padStart(3, "0")}`;
		}
		let g = i(() => (r.lines ?? []).map((e) => typeof e == "string" ? {
			level: "info",
			message: e
		} : {
			time: e.time,
			level: m(e.level ?? "info"),
			message: e.message ?? ""
		})), _ = i(() => {
			let e = r.level;
			if (!e || e === "all") return null;
			let t = (Array.isArray(e) ? e : [e]).map((e) => m(e));
			return t.length ? t : null;
		}), v = i(() => {
			let e = _.value;
			return e ? g.value.filter((t) => e.includes(t.level)) : g.value;
		}), y = i(() => v.value.length * f.value), b = i(() => {
			if (!r.virtual) return {
				start: 0,
				end: v.value.length,
				offset: 0
			};
			let e = d.value || 320, t = Math.max(0, Math.floor(u.value / f.value) - kg), n = Math.ceil(e / f.value) + 16;
			return {
				start: t,
				end: Math.min(v.value.length, t + n),
				offset: t * f.value
			};
		}), x = i(() => v.value.slice(b.value.start, b.value.end));
		function w() {
			let e = o.value;
			e && (d.value = e.clientHeight, D());
		}
		function D() {
			let e = o.value;
			if (!e || typeof window > "u") return;
			let t = getComputedStyle(e).getPropertyValue("--mc-log-row-height").trim(), n = parseFloat(t);
			Number.isFinite(n) && n > 0 && (f.value = n);
		}
		function k() {
			let e = o.value;
			e && (e.scrollTop = e.scrollHeight);
		}
		function j(e, t) {
			r.disabled || a("select", e, t);
		}
		G(() => v.value.length, async () => {
			r.autoScroll && (await S(), k());
		}), G(() => r.autoScroll, (e) => {
			e && k();
		}), O(() => {
			w(), typeof ResizeObserver < "u" && o.value && (p = new ResizeObserver(() => w()), p.observe(o.value)), r.autoScroll && k();
		}), E(() => {
			p?.disconnect(), p = null;
		});
		let M = i(() => Z("mc-log", "mc-grain-overlay", {
			"is-virtual": r.virtual,
			"has-timestamps": r.showTimestamps,
			"has-level": r.showLevel,
			"is-disabled": r.disabled
		}, r.customClass)), I = i(() => typeof r.height == "number" ? { height: `${r.height}px` } : { height: r.height });
		return (n, r) => (A(), c("section", {
			class: C(M.value),
			style: T(I.value)
		}, [
			t.title || n.$slots.header ? (A(), c("header", bg, [
				l("span", xg, R(t.title), 1),
				r[0] || (r[0] = l("span", { class: "mc-log__spacer" }, null, -1)),
				F(n.$slots, "header", {}, void 0, !0)
			])) : s("", !0),
			l("div", {
				ref_key: "scroller",
				ref: o,
				class: "mc-log__scroller",
				role: "log",
				"aria-live": "polite"
			}, [l("div", {
				class: "mc-log__canvas",
				style: T({ height: `${y.value}px` })
			}, [l("div", {
				class: "mc-log__window",
				role: "list",
				style: T({ transform: `translateY(${b.value.offset}px)` })
			}, [(A(!0), c(e, null, P(x.value, (e, n) => (A(), c("div", {
				key: `${b.value.start + n}-${e.message}`,
				class: C(["mc-log__row", [`mc-log__row--${e.level}`, { "is-last": b.value.start + n === v.value.length - 1 }]]),
				role: t.disabled ? "listitem" : "button",
				tabindex: t.disabled ? -1 : 0,
				"aria-disabled": t.disabled ? "true" : void 0,
				onClick: (t) => j(e, b.value.start + n),
				onKeydown: [K(q((t) => j(e, b.value.start + n), ["prevent"]), ["enter"]), K(q((t) => j(e, b.value.start + n), ["prevent"]), ["space"])]
			}, [
				t.showTimestamps ? (A(), c("span", Cg, R(h(e.time)), 1)) : s("", !0),
				r[2] || (r[2] = l("span", {
					class: "mc-log__dot",
					"aria-hidden": "true"
				}, null, -1)),
				t.showLevel ? (A(), c("span", wg, R(e.level), 1)) : s("", !0),
				l("span", Tg, [l("span", Eg, R(e.message), 1), r[1] || (r[1] = l("span", {
					class: "mc-log__caret",
					"aria-hidden": "true"
				}, null, -1))])
			], 42, Sg))), 128))], 4)], 4), v.value.length ? s("", !0) : (A(), c("div", Dg, [...r[3] || (r[3] = [l("span", { class: "mc-log__empty-text" }, "No entries", -1)])]))], 512),
			r[4] || (r[4] = l("div", {
				class: "mc-log__scanline",
				"aria-hidden": "true"
			}, null, -1))
		], 6));
	}
}), [["__scopeId", "data-v-2d34ba15"]]), jg = ["aria-hidden"], Mg = {
	key: 0,
	class: "mc-marquee__separator",
	"aria-hidden": "true"
}, Ng = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMarquee",
	__name: "Marquee",
	props: {
		content: {},
		speed: { default: 50 },
		direction: { default: "left" },
		vertical: {
			type: Boolean,
			default: !1
		},
		hoverPause: {
			type: Boolean,
			default: !0
		},
		separator: { default: "•" },
		repeat: { default: 3 },
		gradient: {
			type: Boolean,
			default: !0
		},
		height: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = N(null), a = N(null), o = N(0), u = N(!1), f = N(!1), p = null;
		function m() {
			let e = r.value, t = e?.firstElementChild;
			if (!t) return;
			let i = t.getBoundingClientRect(), s = n.vertical ? i.height : i.width;
			s > 0 && (o.value = s);
			let c = a.value;
			c && e && (f.value = n.vertical ? e.scrollHeight > c.clientHeight : e.scrollWidth > c.clientWidth);
		}
		O(() => {
			m(), typeof ResizeObserver < "u" && r.value && (p = new ResizeObserver(() => m()), p.observe(r.value), a.value && p.observe(a.value));
		}), E(() => {
			p?.disconnect(), p = null;
		}), G(() => [
			n.content,
			n.repeat,
			n.vertical
		], () => m());
		let h = i(() => n.content === void 0 || n.content === null ? [] : Array.isArray(n.content) ? n.content : [n.content]), g = i(() => {
			if (o.value <= 0) return 12;
			let e = Math.max(1, n.speed);
			return o.value / e;
		}), _ = i(() => Math.max(2, Math.round(n.repeat))), v = i(() => ({
			"--mc-marquee-repeat": _.value,
			"--mc-marquee-duration": `${g.value}s`
		})), y = i(() => Z("mc-marquee", `mc-marquee--${n.direction}`, {
			"mc-marquee--vertical": n.vertical,
			"is-faded": n.gradient && f.value,
			"is-paused": u.value && n.hoverPause,
			"is-disabled": n.disabled
		}, n.customClass)), b = i(() => {
			if (n.vertical && n.height !== void 0) return { "--mc-marquee-height": typeof n.height == "number" ? `${n.height}px` : n.height };
		});
		function x() {
			u.value = !0;
		}
		function S() {
			u.value = !1;
		}
		return (n, i) => (A(), c("div", {
			class: C(y.value),
			onMouseenter: x,
			onMouseleave: S
		}, [l("div", {
			ref_key: "viewportRef",
			ref: a,
			class: "mc-marquee__viewport",
			style: T(b.value)
		}, [l("div", {
			ref_key: "trackRef",
			ref: r,
			class: "mc-marquee__track",
			style: T(v.value)
		}, [(A(!0), c(e, null, P(_.value, (r) => (A(), c("div", {
			key: r,
			class: "mc-marquee__group",
			"aria-hidden": r > 1
		}, [n.$slots.default ? F(n.$slots, "default", {}, void 0, !0, 0) : (A(!0), c(e, { key: 1 }, P(h.value, (e, n) => (A(), c("span", {
			key: n,
			class: "mc-marquee__item"
		}, [d(R(e) + " ", 1), n < h.value.length - 1 ? (A(), c("span", Mg, R(t.separator), 1)) : s("", !0)]))), 128))], 8, jg))), 128))], 4)], 4)], 34));
	}
}), [["__scopeId", "data-v-9c9abee7"]]), Pg = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMasonry",
	__name: "Masonry",
	props: {
		columns: { default: 3 },
		gap: { default: 16 },
		itemStyle: {},
		customClass: {}
	},
	setup(t) {
		let n = t, r = H(), a = N(null), s = N(0), u = N(1), d = N([]), f = (e) => e.node, p = [
			{
				key: "xs",
				query: "(max-width: 639px)"
			},
			{
				key: "sm",
				query: "(min-width: 640px) and (max-width: 767px)"
			},
			{
				key: "md",
				query: "(min-width: 768px) and (max-width: 1023px)"
			},
			{
				key: "lg",
				query: "(min-width: 1024px) and (max-width: 1279px)"
			},
			{
				key: "xl",
				query: "(min-width: 1280px)"
			}
		], m = /* @__PURE__ */ new Map();
		function h() {
			if (typeof n.columns == "number") return Math.max(1, Math.round(n.columns));
			let e = n.columns ?? {}, t = e.xs ?? 1;
			for (let n of p) m.get(n.key)?.matches && e[n.key] !== void 0 && (t = e[n.key]);
			return Math.max(1, Math.round(t));
		}
		function g() {
			let e = h();
			e !== u.value && (u.value = e, S(k));
		}
		let v = i(() => {
			let e = u.value, t = n.gap;
			return Math.max(0, (s.value - t * (e - 1)) / e);
		}), y = i(() => {
			let e = u.value, t = n.gap, r = v.value, i = Array(e).fill(0), a = [];
			d.value.forEach((n, o) => {
				let s = 0;
				for (let t = 1; t < e; t += 1) i[t] < i[s] && (s = t);
				let c = s * (r + t), l = i[s];
				a.push({
					x: c,
					y: l,
					width: r
				}), i[s] = l + n + t;
			});
			let o = i.length ? Math.max(...i) - t : 0;
			return {
				positions: a,
				height: Math.max(0, o)
			};
		}), b = i(() => (r.default?.() ?? []).map((e, t) => {
			let r = y.value.positions[t], i = {
				width: r ? `${r.width}px` : void 0,
				transform: r ? `translate3d(${r.x}px, ${r.y}px, 0)` : void 0,
				...n.itemStyle ?? {}
			}, a = { "--mc-masonry-index": String(t) };
			return _("div", {
				key: e.key ?? t,
				class: "mc-masonry__item mc-sheen-sweep",
				style: [i, a]
			}, [e]);
		}));
		function x() {
			let e = a.value;
			if (!e) return;
			let t = Array.from(e.children).map((e) => e.offsetHeight);
			(t.length !== d.value.length || t.some((e, t) => e !== d.value[t])) && (d.value = t);
		}
		let w = null;
		function D() {
			if (w?.disconnect(), w = null, typeof ResizeObserver > "u" || !a.value) return;
			let e = a.value;
			w = new ResizeObserver(() => {
				let t = e.clientWidth;
				t !== s.value && (s.value = t), x();
			}), w.observe(e), Array.from(e.children).forEach((e) => w?.observe(e));
		}
		function k() {
			let e = a.value;
			if (!e) return;
			let t = e.clientWidth;
			t !== s.value && (s.value = t), x(), D();
		}
		function j() {
			if (wt && typeof window.matchMedia == "function") for (let e of p) {
				let t = window.matchMedia(e.query);
				m.set(e.key, t);
				let n = () => g();
				typeof t.addEventListener == "function" ? t.addEventListener("change", n) : typeof t.addListener == "function" && t.addListener(n);
			}
		}
		O(async () => {
			j(), g(), await S(), k();
		}), E(() => {
			w?.disconnect(), w = null;
		}), G(() => [
			n.columns,
			n.gap,
			n.itemStyle
		], () => S(k), { deep: !0 });
		let M = i(() => ({ height: y.value.height ? `${y.value.height}px` : void 0 })), F = i(() => Z("mc-masonry", "mc-masonry--panel mc-grain-overlay", n.customClass));
		return (t, n) => (A(), c("div", {
			ref_key: "container",
			ref: a,
			class: C(F.value),
			style: T(M.value)
		}, [n[0] || (n[0] = l("span", {
			class: "mc-masonry__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), (A(!0), c(e, null, P(b.value, (e, t) => (A(), o(f, {
			key: t,
			node: e
		}, null, 8, ["node"]))), 128))], 6));
	}
}), [["__scopeId", "data-v-88cbeaca"]]), Fg = ["id"], Ig = {
	class: "mc-mention__mirror",
	"aria-hidden": "true"
}, Lg = {
	key: 0,
	class: "mc-mention__chip"
}, Rg = {
	key: 0,
	class: "mc-mention__placeholder"
}, zg = [
	"value",
	"placeholder",
	"disabled",
	"aria-expanded"
], Bg = ["aria-label"], Vg = [
	"aria-selected",
	"onMousedown",
	"onMouseenter"
], Hg = { class: "mc-mention__avatar" }, Ug = ["src", "alt"], Wg = {
	key: 1,
	class: "mc-mention__initials"
}, Gg = { class: "mc-mention__name" }, Kg = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMention",
	__name: "Mention",
	props: {
		modelValue: { default: "" },
		options: { default: () => [] },
		prefix: { default: "@" },
		placeholder: { default: "Write something…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		disabled: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"select"
	],
	setup(r, { emit: a }) {
		let u = r, p = Zt(), m = An(), h = a, g = Fi("mc-mention"), _ = N(null), v = N(null), y = N(null), b = N(!1), { isTop: w } = On({ active: b }), T = N(""), D = N(0), { style: k, transformOrigin: j, update: M, startAutoUpdate: F, stopAutoUpdate: I } = _n(_, y, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: b })
		});
		function L(e) {
			return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		let z = i(() => RegExp(`${L(u.prefix)}\\S*`, "g")), V = i(() => {
			let e = u.modelValue ?? "";
			if (!e) return [];
			let t = [], n = z.value;
			n.lastIndex = 0;
			let r = 0, i;
			for (; (i = n.exec(e)) !== null;) i.index > r && t.push({
				text: e.slice(r, i.index),
				mention: !1
			}), t.push({
				text: i[0],
				mention: !0
			}), r = i.index + i[0].length, i[0].length === 0 && (n.lastIndex += 1);
			return r < e.length && t.push({
				text: e.slice(r),
				mention: !1
			}), t;
		}), H = i(() => {
			let e = T.value.toLowerCase();
			return e ? u.options.filter((t) => t.name.toLowerCase().includes(e)) : u.options;
		});
		function U() {
			let e = v.value;
			if (!e || u.disabled) {
				b.value = !1;
				return;
			}
			let t = e.selectionStart ?? 0, n = (u.modelValue ?? "").slice(0, t), r = n.lastIndexOf(u.prefix);
			if (r === -1) {
				b.value = !1;
				return;
			}
			let i = n.slice(r + u.prefix.length);
			/\s/.test(i) ? b.value = !1 : (T.value = i, D.value = 0, b.value ? M() : (b.value = !0, S(() => {
				M(), F();
			})));
		}
		function W() {
			b.value = !1, I();
		}
		function te(e) {
			let t = e.target.value;
			h("update:modelValue", t), h("change", t), U();
		}
		function K(e) {
			if (e.key === "Escape") b.value && w() && (e.stopPropagation(), W());
			else if (b.value) {
				if (e.key === "ArrowDown") e.preventDefault(), D.value = Math.min(D.value + 1, H.value.length - 1);
				else if (e.key === "ArrowUp") e.preventDefault(), D.value = Math.max(D.value - 1, 0);
				else if (e.key === "Enter" || e.key === "Tab") {
					let t = H.value[D.value];
					if (!t) return;
					e.preventDefault(), J(t);
				}
			}
		}
		function J(e) {
			let t = v.value, n = t?.selectionStart ?? (u.modelValue ?? "").length, r = (u.modelValue ?? "").slice(0, n), i = r.lastIndexOf(u.prefix), a = i === -1 ? n : i, o = (u.modelValue ?? "").slice(n), s = `${u.prefix}${e.name} `, c = r.slice(0, a) + s + o;
			h("update:modelValue", c), h("change", c), h("select", e), W(), S(() => {
				let e = a + s.length;
				t?.focus(), t?.setSelectionRange(e, e);
			});
		}
		function ne(e) {
			if (!b.value) return;
			let t = e.target;
			t && (_.value?.contains(t) || y.value?.contains(t) || W());
		}
		O(() => document.addEventListener("mousedown", ne)), E(() => {
			document.removeEventListener("mousedown", ne), I();
		}), G(() => u.disabled, (e) => {
			e && W();
		});
		function re(e) {
			let t = e.trim().split(/\s+/);
			return t.length > 1 ? (t[0][0] ?? "") + (t[1][0] ?? "") : e.slice(0, 2).toUpperCase();
		}
		let ie = i(() => typeof u.teleport == "string" ? u.teleport : "body"), Y = i(() => Z("mc-mention", `mc-mention--${u.variant}`, `mc-mention--${u.size}`, {
			"is-disabled": u.disabled,
			"is-open": b.value
		}, u.customClass));
		return (i, a) => (A(), c("div", { class: C(Y.value) }, [l("div", {
			ref_key: "field",
			ref: _,
			class: "mc-mention__field mc-sheen-sweep",
			id: B(g)
		}, [
			a[0] || (a[0] = l("span", {
				class: "mc-mention__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", Ig, [(A(!0), c(e, null, P(V.value, (t, n) => (A(), c(e, { key: n }, [t.mention ? (A(), c("span", Lg, R(t.text), 1)) : (A(), c(e, { key: 1 }, [d(R(t.text), 1)], 64))], 64))), 128)), u.modelValue ? s("", !0) : (A(), c("span", Rg, R(r.placeholder), 1))]),
			l("textarea", {
				ref_key: "textarea",
				ref: v,
				class: "mc-mention__input",
				value: u.modelValue,
				placeholder: r.placeholder,
				disabled: r.disabled,
				"aria-expanded": b.value,
				"aria-autocomplete": "list",
				role: "combobox",
				rows: "1",
				onInput: te,
				onKeydown: K,
				onClick: U,
				onBlur: W
			}, null, 40, zg)
		], 8, Fg), (A(), o(t, {
			to: ie.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [b.value && H.value.length ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: y,
				class: "mc-mention__menu",
				style: {
					...B(k),
					transformOrigin: B(j)
				}
			}, B(m), {
				role: "listbox",
				"aria-label": B(p).mention?.label ?? "mentions"
			}), [(A(!0), c(e, null, P(H.value, (e, t) => (A(), c("button", {
				key: e.id,
				type: "button",
				class: C(["mc-mention__option", { "is-active": t === D.value }]),
				role: "option",
				"aria-selected": t === D.value,
				onMousedown: q((t) => J(e), ["prevent"]),
				onMouseenter: (e) => D.value = t
			}, [
				l("span", Hg, [e.avatar ? (A(), c("img", {
					key: 0,
					src: e.avatar,
					alt: e.name
				}, null, 8, Ug)) : (A(), c("span", Wg, R(re(e.name)), 1))]),
				l("span", Gg, R(e.name), 1),
				f($, {
					name: "at-sign",
					size: 12,
					class: "mc-mention__at"
				})
			], 42, Vg))), 128))], 16, Bg)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-c974be8f"]]), qg = ["aria-orientation"], Jg = [
	"aria-disabled",
	"aria-haspopup",
	"aria-expanded",
	"aria-current",
	"aria-label",
	"title",
	"tabindex",
	"onClick",
	"onMouseenter",
	"onFocus"
], Yg = {
	key: 1,
	class: "mc-menu__label"
}, Xg = {
	key: 3,
	class: "mc-menu__dot",
	"aria-hidden": "true"
}, Zg = [
	"aria-disabled",
	"aria-current",
	"onClick"
], Qg = { class: "mc-menu__label" }, $g = 100, e_ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMenu",
	__name: "Menu",
	props: {
		options: {},
		modelValue: {},
		mode: { default: "vertical" },
		collapsed: {
			type: Boolean,
			default: !1
		},
		collapseWidth: { default: 64 },
		accordion: {
			type: Boolean,
			default: !1
		},
		indent: { default: 14 },
		theme: { default: "light" },
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"select",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = An(), m = N([]), h = N(""), { isTop: g } = On({ active: i(() => !!h.value) }), _ = N(null), v = N(null), y = N(""), b = N(null), w = /* @__PURE__ */ new Map();
		function D(e, t) {
			t instanceof HTMLElement ? w.set(e, t) : w.delete(e);
		}
		function k(e) {
			return Array.isArray(e.children) && e.children.length > 0;
		}
		function j(e, t, n) {
			for (let r of e) {
				let e = k(r);
				n.push({
					type: e ? "group" : "item",
					key: r.key,
					option: r,
					depth: t
				}), e && m.value.includes(r.key) && j(r.children ?? [], t + 1, n);
			}
			return n;
		}
		let M = i(() => u.mode === "vertical"), F = i(() => M.value && u.collapsed), I = i(() => (u.options ?? []).map((e) => ({
			type: k(e) ? "group" : "item",
			key: e.key,
			option: e,
			depth: 0
		}))), L = i(() => M.value ? j(u.options ?? [], 0, []) : I.value), z = i(() => {
			if (!h.value) return null;
			let e = (t) => {
				for (let n of t) {
					if (n.key === h.value) return n;
					if (n.children) {
						let t = e(n.children);
						if (t) return t;
					}
				}
				return null;
			};
			return e(u.options ?? []);
		}), V = i(() => {
			let e = z.value;
			return !e || !e.children ? [] : j(e.children, 1, []);
		}), { style: H, transformOrigin: U, update: W, startAutoUpdate: te, stopAutoUpdate: K } = _n(v, _, {
			placement: "bottom",
			offset: 10,
			flip: !0,
			shift: !0
		});
		function q(e, t) {
			h.value === e && _.value ? J() : (h.value = e, v.value = t, S(() => {
				W(), te();
			}));
		}
		function J() {
			h.value && (h.value = "", K());
		}
		function ne(e) {
			g() && (se(e), e.key === "Escape" && (e.stopPropagation(), J()));
		}
		function re(e) {
			e.disabled || (d("update:modelValue", e.key), d("select", e.key, e), (!M.value || F.value) && J());
		}
		function ie(e) {
			if (e.disabled) return;
			let t = e.key;
			m.value.includes(t) ? (m.value = m.value.filter((e) => e !== t), d("close", t)) : (m.value = u.accordion ? [t] : [...m.value, t], d("open", t));
		}
		let Y = N({
			top: 0,
			scale: 1,
			ready: !1
		}), ae = N({
			left: 0,
			scale: 1,
			ready: !1
		});
		function oe() {
			let e = u.modelValue, t = e ? w.get(e) : void 0;
			if (M.value) {
				if (!t) Y.value = {
					...Y.value,
					ready: !1
				};
				else {
					let e = b.value?.offsetHeight || t.offsetHeight;
					Y.value = {
						top: t.offsetTop,
						scale: e > 0 ? t.offsetHeight / e : 1,
						ready: !0
					};
				}
			} else t ? ae.value = {
				left: t.offsetLeft,
				scale: t.offsetWidth / $g,
				ready: !0
			} : ae.value = {
				...ae.value,
				ready: !1
			};
		}
		G([
			() => u.modelValue,
			() => u.collapsed,
			() => u.mode,
			m
		], () => {
			S(oe);
		}), G(() => u.options, () => S(oe), { deep: !0 });
		function se(e) {
			if (![
				"ArrowDown",
				"ArrowUp",
				"ArrowRight",
				"ArrowLeft",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = e.currentTarget, n = Array.from(t.querySelectorAll("[role=\"menuitem\"]:not([aria-disabled=\"true\"])"));
			if (!n.length) return;
			let r = n.indexOf(document.activeElement);
			e.preventDefault();
			let i = r;
			e.key === "ArrowDown" || e.key === "ArrowRight" && !M.value ? i = r + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" && !M.value ? i = r - 1 : e.key === "Home" ? i = 0 : e.key === "End" && (i = n.length - 1), i < 0 && (i = 0), i >= n.length && (i = n.length - 1), n[i]?.focus();
		}
		function ce(e, t) {
			y.value = e.key, (u.mode === "horizontal" || F.value) && k(e.option) && q(e.key, t.currentTarget);
		}
		let le = i(() => {
			let e = y.value;
			return e && L.value.some((t) => t.key === e) ? e : u.modelValue ? u.modelValue : L.value[0]?.key ?? "";
		});
		function ue(e) {
			let t = e.currentTarget;
			if (!t || typeof t.getBoundingClientRect != "function") return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-menu-glow-x", `${e.clientX - n.left}px`), t.style.setProperty("--mc-menu-glow-y", `${e.clientY - n.top}px`);
		}
		function de(e) {
			if (!h.value) return;
			let t = e.target;
			t && (v.value?.contains(t) || _.value?.contains(t) || J());
		}
		O(() => {
			S(oe), wt && (document.addEventListener("mousedown", de, !0), window.addEventListener("resize", fe));
		}), E(() => {
			K(), wt && (document.removeEventListener("mousedown", de, !0), window.removeEventListener("resize", fe));
		});
		function fe() {
			S(oe);
		}
		let pe = i(() => !M.value || !F.value ? {} : {
			minWidth: `${u.collapseWidth}px`,
			maxWidth: `${u.collapseWidth}px`
		}), me = i(() => ({
			transform: `translateY(${Y.value.top}px) scaleY(${Y.value.scale})`,
			opacity: +!!Y.value.ready
		})), he = i(() => ({
			width: `${$g}px`,
			transform: `translateX(${ae.value.left}px) scaleX(${ae.value.scale})`,
			opacity: +!!ae.value.ready
		}));
		function ge(e) {
			return F.value || !M.value ? {} : { paddingInlineStart: `${12 + e.depth * u.indent}px` };
		}
		let _e = i(() => Z("mc-menu", `mc-menu--${u.mode}`, `mc-menu--${u.theme}`, {
			"is-collapsed": F.value,
			"has-pill": M.value && Y.value.ready
		}, u.customClass));
		return (i, a) => (A(), c("div", {
			class: C(_e.value),
			style: T(pe.value)
		}, [
			a[0] || (a[0] = l("span", {
				class: "mc-menu__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			l("div", {
				class: "mc-menu__list",
				role: "menu",
				"aria-orientation": r.mode === "horizontal" ? "horizontal" : "vertical",
				onKeydown: se
			}, [r.mode === "vertical" ? (A(), c("span", {
				key: 0,
				ref_key: "pillEl",
				ref: b,
				class: "mc-menu__pill",
				style: T(me.value),
				"aria-hidden": "true"
			}, null, 4)) : (A(), c("span", {
				key: 1,
				class: "mc-menu__indicator",
				style: T(he.value),
				"aria-hidden": "true"
			}, null, 4)), (A(!0), c(e, null, P(L.value, (e) => (A(), c("div", {
				key: e.key,
				class: "mc-menu__row",
				role: "none"
			}, [l("button", {
				ref_for: !0,
				ref: (t) => D(e.key, t),
				type: "button",
				role: "menuitem",
				class: C(["mc-menu__item mc-sheen-sweep", {
					"is-active": e.key === r.modelValue,
					"is-disabled": e.option.disabled,
					"is-group": e.type === "group",
					"is-open": e.type === "group" && m.value.includes(e.key)
				}]),
				style: T(ge(e)),
				"aria-disabled": e.option.disabled ? "true" : void 0,
				"aria-haspopup": e.type === "group" ? "true" : void 0,
				"aria-expanded": e.type === "group" ? m.value.includes(e.key) : void 0,
				"aria-current": e.key === r.modelValue ? "true" : void 0,
				"aria-label": F.value ? e.option.label : void 0,
				title: F.value ? e.option.label : void 0,
				tabindex: e.key === le.value ? 0 : -1,
				onClick: (t) => e.type === "group" ? ie(e.option) : re(e.option),
				onPointermove: ue,
				onMouseenter: (t) => (r.mode === "horizontal" || F.value) && k(e.option) ? q(e.key, t.currentTarget) : void 0,
				onFocus: (t) => ce(e, t)
			}, [
				e.option.icon ? (A(), o($, {
					key: 0,
					name: e.option.icon,
					size: 18,
					class: "mc-menu__icon"
				}, null, 8, ["name"])) : s("", !0),
				F.value ? s("", !0) : (A(), c("span", Yg, R(e.option.label), 1)),
				e.type === "group" && !F.value ? (A(), o($, {
					key: 2,
					name: "chevron-down",
					size: 14,
					class: "mc-menu__chevron"
				})) : s("", !0),
				F.value && e.key === r.modelValue ? (A(), c("span", Xg)) : s("", !0)
			], 46, Jg)]))), 128))], 40, qg),
			(A(), o(t, { to: "body" }, [f(n, { name: "mc-menu-panel" }, {
				default: ee(() => [h.value && V.value.length ? (A(), c("div", x({
					key: 0,
					ref_key: "panelEl",
					ref: _,
					class: "mc-menu__panel mc-grain-overlay",
					style: [B(H), { transformOrigin: B(U) }]
				}, B(p), {
					role: "menu",
					onKeydown: ne,
					onMouseleave: J
				}), [(A(!0), c(e, null, P(V.value, (e) => (A(), c("div", {
					key: e.key,
					class: "mc-menu__row",
					role: "none"
				}, [l("button", {
					ref_for: !0,
					ref: (t) => D(e.key, t),
					type: "button",
					role: "menuitem",
					class: C(["mc-menu__item mc-sheen-sweep", {
						"is-active": e.key === r.modelValue,
						"is-disabled": e.option.disabled,
						"is-group": e.type === "group"
					}]),
					style: T(ge(e)),
					"aria-disabled": e.option.disabled ? "true" : void 0,
					"aria-current": e.key === r.modelValue ? "true" : void 0,
					onPointermove: ue,
					onClick: (t) => e.type === "group" ? ie(e.option) : re(e.option)
				}, [e.option.icon ? (A(), o($, {
					key: 0,
					name: e.option.icon,
					size: 17,
					class: "mc-menu__icon"
				}, null, 8, ["name"])) : s("", !0), l("span", Qg, R(e.option.label), 1)], 46, Zg)]))), 128))], 16)) : s("", !0)]),
				_: 1
			})]))
		], 6));
	}
}), [["__scopeId", "data-v-37fa9ddd"]]);
//#endregion
//#region src/utils/vnode.ts
function t_() {
	return function(e) {
		let t = e.content;
		return t == null || t === !1 ? null : typeof t == "string" || typeof t == "number" ? String(t) : t;
	};
}
//#endregion
//#region src/components/message/Message.vue?vue&type=script&setup=true&lang.ts
var n_ = [
	"role",
	"aria-disabled",
	"aria-live"
], r_ = {
	class: "mc-message__icon-wrap",
	"aria-hidden": "true"
}, i_ = {
	key: 0,
	class: "mc-message__spinner",
	viewBox: "0 0 24 24"
}, a_ = {
	class: "mc-message__ring-svg",
	viewBox: "0 0 34 34",
	"data-mc-overlay": ""
}, o_ = {
	key: 0,
	class: "mc-message__ring-bar",
	cx: "17",
	cy: "17",
	r: "15"
}, s_ = { class: "mc-message__content" }, c_ = ["aria-label", "disabled"], l_ = 94.25, u_ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMessage",
	__name: "Message",
	props: {
		type: { default: "info" },
		content: { type: [
			String,
			Object,
			Number,
			Boolean,
			null,
			Array
		] },
		duration: { default: 3e3 },
		icon: {},
		showProgress: {
			type: Boolean,
			default: !0
		},
		placement: { default: "top" },
		offset: { default: 16 },
		max: { default: 3 },
		disabled: {
			type: Boolean,
			default: !1
		},
		className: {},
		customClass: {}
	},
	emits: ["close"],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), o = n, u = t_(), d = N(!1), p = N(!1), m, h = 0, g = 0, _ = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x",
			loading: "loader-circle"
		}, v = i(() => r.icon ?? _[r.type]);
		function y() {
			p.value || r.disabled || (p.value = !0, b(), o("close"));
		}
		function b() {
			m !== void 0 && clearTimeout(m), m = void 0;
		}
		function x() {
			b(), !(r.duration <= 0) && (h = Date.now(), m = setTimeout(y, g > 0 ? g : r.duration));
		}
		function S() {
			r.duration <= 0 || d.value || (d.value = !0, g = Math.max(0, g - (Date.now() - h)), b());
		}
		function w() {
			r.duration <= 0 || (d.value = !1, x());
		}
		O(() => {
			g = r.duration, x();
		}), E(() => {
			b();
		});
		let D = i(() => Z("mc-message", "mc-grain-overlay", `mc-message--${r.type}`, `mc-message--${r.placement}`, {
			"is-paused": d.value,
			"is-disabled": r.disabled
		}, r.className, r.customClass)), k = i(() => ({
			"--mc-message-duration": `${Math.max(0, r.duration)}ms`,
			"--mc-message-ring": `${l_}`
		}));
		return (n, r) => (A(), c("div", {
			class: C(D.value),
			style: T(k.value),
			role: t.type === "error" ? "alert" : "status",
			"aria-disabled": t.disabled || void 0,
			"aria-live": t.type === "error" ? "assertive" : "polite",
			onMouseenter: S,
			onMouseleave: w
		}, [
			l("span", r_, [t.type === "loading" ? (A(), c("svg", i_, [...r[0] || (r[0] = [l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, -1)])])) : (A(), c(e, { key: 1 }, [(A(), c("svg", a_, [r[1] || (r[1] = l("circle", {
				class: "mc-message__ring-track",
				cx: "17",
				cy: "17",
				r: "15"
			}, null, -1)), t.showProgress && t.duration > 0 ? (A(), c("circle", o_)) : s("", !0)])), f($, {
				name: v.value,
				size: 16,
				"stroke-width": 2,
				class: "mc-message__icon"
			}, null, 8, ["name"])], 64))]),
			l("span", s_, [F(n.$slots, "content", {}, () => [f(B(u), { content: t.content }, null, 8, ["content"])], !0)]),
			l("button", {
				type: "button",
				class: "mc-message__close",
				"aria-label": B(a).message.dismiss ?? "Dismiss",
				disabled: t.disabled,
				onClick: y
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, c_)
		], 46, n_));
	}
}), [["__scopeId", "data-v-ac220b79"]]), d_ = L([]), f_ = N("mc-message"), p_ = N(0), m_ = N(3), h_ = 0;
function g_() {
	return h_ += 1, h_;
}
function __(e) {
	let t = e.max > 0 ? e.max : m_.value, n = [...d_.value, e];
	for (; n.length > t;) n.shift();
	d_.value = n;
}
function v_(e) {
	d_.value.some((t) => t.id === e) && (d_.value = d_.value.filter((t) => t.id !== e));
}
function y_() {
	d_.value = [];
}
//#endregion
//#region src/components/message/MessageProvider.vue
var b_ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiMessageProvider",
	__name: "MessageProvider",
	props: {
		customClass: {},
		placement: { default: "top" },
		offset: { default: 16 },
		max: { default: 3 }
	},
	setup(t) {
		let n = t;
		O(() => {
			p_.value += 1, m_.value = n.max, wt && window.addEventListener("resize", h), h();
		}), E(() => {
			p_.value = Math.max(0, p_.value - 1), wt && window.removeEventListener("resize", h);
		}), G(() => n.max, (e) => {
			m_.value = e;
		});
		function a(e) {
			v_(e);
		}
		let s = i(() => d_.value[d_.value.length - 1]), l = i(() => s.value?.placement ?? n.placement), u = i(() => {
			let e = s.value?.offset ?? n.offset;
			return Number.isFinite(e) ? Math.max(0, e) : 0;
		}), d = N(null), p = N(0), m = N(0);
		function h() {
			let e = d.value?.firstElementChild;
			p.value = e ? e.offsetHeight : 0, m.value = wt ? window.innerHeight : 0;
		}
		G(d_, () => {
			S(h);
		}, { deep: !0 });
		let g = i(() => {
			let e = m.value, t = p.value;
			if (!e || !t) return 0;
			let n = u.value;
			if (l.value === "center") {
				let r = t - (e - n * 2);
				return r > 0 ? -Math.round(r / 2) : 0;
			}
			let r = t + n - e;
			return r <= 0 ? 0 : -Math.min(Math.round(r), n);
		}), _ = i(() => {
			let e = `${u.value}px`, t = l.value;
			return {
				paddingTop: t.startsWith("top") ? e : "0px",
				paddingBottom: t.startsWith("bottom") ? e : "0px",
				paddingLeft: t.endsWith("start") ? e : "0px",
				paddingRight: t.endsWith("end") ? e : "0px"
			};
		}), v = i(() => ({ "--mc-message-shift": `${g.value}px` }));
		return (t, i) => (A(), c("div", {
			ref_key: "hostEl",
			ref: d,
			class: C(B(Z)("mc-message-host", `mc-message-host--${l.value}`, n.customClass)),
			style: T(_.value),
			role: "status",
			"aria-live": "polite"
		}, [f(r, {
			name: B(f_),
			tag: "div",
			class: "mc-message-stack",
			"move-class": "mc-message-move",
			style: T(v.value)
		}, {
			default: ee(() => [(A(!0), c(e, null, P(B(d_), (e) => (A(), o(u_, {
				key: e.id,
				type: e.type,
				content: e.content,
				duration: e.duration,
				icon: e.icon,
				"show-progress": e.showProgress,
				placement: e.placement,
				offset: e.offset,
				max: e.max || void 0,
				"class-name": e.className,
				"custom-class": e.customClass,
				onClose: (t) => a(e.id)
			}, null, 8, [
				"type",
				"content",
				"duration",
				"icon",
				"show-progress",
				"placement",
				"offset",
				"max",
				"class-name",
				"custom-class",
				"onClose"
			]))), 128))]),
			_: 1
		}, 8, ["name", "style"])], 6));
	}
}), [["__scopeId", "data-v-4207f52d"]]), x_ = null, S_ = null;
function C_() {
	x_ || typeof document < "u" && (p_.value > 0 || (x_ = document.createElement("div"), x_.className = "mc-message-root", document.body.appendChild(x_), S_ = a(b_), S_.mount(x_)));
}
function w_(e, t, n = {}) {
	let r = n.duration ?? (e === "loading" ? 0 : 3e3), i = {
		id: g_(),
		type: e,
		content: n.content ?? t,
		duration: r,
		icon: n.icon,
		showProgress: n.showProgress ?? r > 0,
		placement: n.placement ?? "top",
		offset: n.offset ?? 16,
		max: n.max ?? 0,
		className: n.className,
		customClass: n.customClass,
		onClose: n.onClose
	};
	return __(i), C_(), {
		id: i.id,
		close: () => v_(i.id)
	};
}
var T_ = {
	info(e, t) {
		return w_("info", e, t);
	},
	success(e, t) {
		return w_("success", e, t);
	},
	warning(e, t) {
		return w_("warning", e, t);
	},
	error(e, t) {
		return w_("error", e, t);
	},
	loading(e, t) {
		return w_("loading", e, {
			duration: 0,
			...t
		});
	},
	open(e, t) {
		return w_(t?.type ?? "info", e, t);
	},
	closeAll() {
		y_();
	},
	destroyAll() {
		let e = f_.value;
		f_.value = "", y_(), S(() => {
			f_.value = e;
		});
	}
};
function E_() {
	return T_;
}
//#endregion
//#region src/components/modal/Modal.vue?vue&type=script&setup=true&lang.ts
var D_ = ["aria-disabled", "aria-labelledby"], O_ = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, k_ = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, A_ = {
	key: 2,
	class: "mc-modal__header mc-sheen-sweep"
}, j_ = ["id"], M_ = ["aria-label", "disabled"], N_ = { class: "mc-modal__body" }, P_ = { class: "mc-modal__footer" }, F_ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiModal",
	__name: "Modal",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		title: {},
		width: { default: 420 },
		maskClosable: {
			type: Boolean,
			default: !0
		},
		okText: { default: "OK" },
		cancelText: { default: "Cancel" },
		onOk: {},
		onCancel: {},
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		variant: { default: "glass" },
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close",
		"ok",
		"cancel"
	],
	setup(e, { emit: r }) {
		let a = e, u = Zt(), p = An(), m = r, h = Fi("mc-modal"), g = N(null), _ = N(!1), { isTop: v, isTopModal: y } = On({
			active: _,
			modal: !0
		}), b = Tn({ active: _ }), S = N(!1);
		G(() => [a.open, a.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (_.value = t) : _.value = e;
		}, { immediate: !0 });
		let w = i(() => _.value), D = i(() => a.loading || S.value);
		Js(i(() => wt && w.value)), Ws({
			enabled: w,
			container: g,
			isTop: y
		});
		function k(e) {
			_.value !== e && (_.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		async function j() {
			if (!(a.disabled || S.value)) {
				if (m("ok"), !a.onOk) k(!1);
				else {
					S.value = !0;
					try {
						await a.onOk() !== !1 && k(!1);
					} finally {
						S.value = !1;
					}
				}
			}
		}
		function M() {
			a.disabled || (m("cancel"), a.onCancel?.(), k(!1));
		}
		function P() {
			a.maskClosable && M();
		}
		function I(e) {
			e.key === "Escape" && _.value && v() && (e.stopPropagation(), M());
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", I);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", I);
		});
		let L = i(() => ({ width: typeof a.width == "number" ? `${a.width}px` : a.width })), z = i(() => Z("mc-modal", "mc-grain-overlay", {
			"mc-panel--liquid": a.variant === "liquid",
			"mc-liquid-glass": a.variant === "liquid",
			"mc-liquid-glass--liquid": a.variant === "liquid",
			"mc-liquid-glass--layers": a.variant === "liquid",
			"is-disabled": a.disabled
		}, a.customClass));
		return (r, i) => (A(), o(t, { to: "body" }, [f(n, { name: "mc-modal" }, {
			default: ee(() => [w.value ? (A(), c("div", x({
				key: 0,
				class: "mc-modal__overlay",
				style: { "--mc-layer-z": B(b) }
			}, B(p), { onClick: P }), [l("div", {
				ref_key: "panel",
				ref: g,
				class: C(z.value),
				style: T(L.value),
				role: "dialog",
				"aria-modal": "true",
				"aria-disabled": e.disabled || void 0,
				"aria-labelledby": B(h),
				tabindex: "-1",
				onClick: i[0] || (i[0] = q(() => {}, ["stop"]))
			}, [
				e.variant === "liquid" ? (A(), c("span", O_)) : s("", !0),
				e.variant === "liquid" ? (A(), c("span", k_)) : s("", !0),
				e.title || r.$slots.header ? (A(), c("header", A_, [l("h2", {
					id: B(h),
					class: "mc-modal__title",
					"data-mc-type": "title"
				}, [F(r.$slots, "header", {}, () => [d(R(e.title), 1)], !0)], 8, j_), l("button", {
					type: "button",
					class: "mc-modal__close",
					"aria-label": B(u).modal?.close ?? "Close",
					disabled: e.disabled,
					onClick: M
				}, [f($, {
					name: "close",
					size: 14,
					"stroke-width": 2.4
				})], 8, M_)])) : s("", !0),
				l("div", N_, [F(r.$slots, "default", {}, void 0, !0)]),
				l("footer", P_, [F(r.$slots, "footer", {}, () => [f(Fr, {
					variant: "soft",
					disabled: e.disabled,
					onClick: M
				}, {
					default: ee(() => [d(R(e.cancelText), 1)]),
					_: 1
				}, 8, ["disabled"]), f(Fr, {
					variant: "solid",
					color: "accent",
					loading: D.value,
					disabled: e.disabled,
					onClick: j
				}, {
					default: ee(() => [d(R(e.okText), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])], !0)])
			], 14, D_)], 16)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-a40c994f"]]), I_ = { class: "mc-notification-wrap" }, L_ = [
	"role",
	"aria-disabled",
	"aria-live"
], R_ = {
	class: "mc-notification__icon-wrap",
	"aria-hidden": "true"
}, z_ = {
	key: 0,
	class: "mc-notification__spinner",
	viewBox: "0 0 24 24"
}, B_ = { class: "mc-notification__body" }, V_ = {
	key: 0,
	class: "mc-notification__title",
	"data-mc-type": "title"
}, H_ = { class: "mc-notification__content" }, U_ = ["aria-label", "disabled"], W_ = {
	key: 0,
	class: "mc-notification__bar",
	"aria-hidden": "true"
}, G_ = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiNotification",
	__name: "Notification",
	props: {
		type: { default: "info" },
		content: {},
		title: {},
		duration: { default: 4500 },
		icon: {},
		showProgress: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		className: {},
		customClass: {}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, u = N(!1), p = N(!1), m, h = 0, g = 0, _ = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x",
			loading: "loader-circle"
		}, v = i(() => n.icon ?? _[n.type]), y = i(() => n.type === "loading");
		function b() {
			m !== void 0 && clearTimeout(m), m = void 0;
		}
		function x() {
			p.value || n.disabled || (p.value = !0, b(), a("close"));
		}
		function S() {
			b(), !y.value && (n.duration <= 0 || (h = Date.now(), m = setTimeout(x, g > 0 ? g : n.duration)));
		}
		function w() {
			y.value || n.duration <= 0 || u.value || (u.value = !0, g = Math.max(0, g - (Date.now() - h)), b());
		}
		function D() {
			y.value || n.duration <= 0 || (u.value = !1, S());
		}
		O(() => {
			g = n.duration, S();
		}), E(() => {
			b();
		});
		let k = i(() => Z("mc-notification", "mc-grain-overlay", `mc-notification--${n.type}`, {
			"is-paused": u.value,
			"is-disabled": n.disabled
		}, n.className, n.customClass)), j = i(() => ({ "--mc-notification-duration": `${Math.max(0, n.duration)}ms` }));
		return (t, n) => (A(), c("div", I_, [l("div", {
			class: C(k.value),
			style: T(j.value),
			role: e.type === "error" ? "alert" : "status",
			"aria-disabled": e.disabled || void 0,
			"aria-live": e.type === "error" ? "assertive" : "polite",
			onMouseenter: w,
			onMouseleave: D
		}, [
			l("span", R_, [y.value ? (A(), c("svg", z_, [...n[0] || (n[0] = [l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, -1)])])) : (A(), o($, {
				key: 1,
				name: v.value,
				size: 18,
				"stroke-width": 2,
				class: "mc-notification__icon"
			}, null, 8, ["name"]))]),
			l("div", B_, [e.title || t.$slots.title ? (A(), c("p", V_, [F(t.$slots, "title", {}, () => [d(R(e.title), 1)], !0)])) : s("", !0), l("p", H_, R(e.content), 1)]),
			l("button", {
				type: "button",
				class: "mc-notification__close",
				"aria-label": B(r).notification?.dismiss ?? "Dismiss notification",
				disabled: e.disabled,
				onClick: x
			}, [f($, {
				name: "close",
				size: 13,
				"stroke-width": 2.4
			})], 8, U_),
			e.showProgress && e.duration > 0 && !y.value ? (A(), c("span", W_)) : s("", !0)
		], 46, L_)]));
	}
}), [["__scopeId", "data-v-dc3aca05"]]), K_ = N([]), q_ = N("mc-notification"), J_ = N(0), Y_ = 0;
function X_() {
	return Y_ += 1, Y_;
}
function Z_(e) {
	K_.value.push(e);
}
function Q_(e) {
	let t = K_.value.findIndex((t) => t.id === e);
	t >= 0 && K_.value.splice(t, 1);
}
function $_() {
	K_.value.splice(0, K_.value.length);
}
//#endregion
//#region src/components/notification/NotificationProvider.vue
var ev = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiNotificationProvider",
	__name: "NotificationProvider",
	props: { customClass: {} },
	setup(t) {
		let n = t;
		O(() => {
			J_.value += 1;
		}), E(() => {
			J_.value = Math.max(0, J_.value - 1);
		});
		function i(e) {
			Q_(e);
		}
		return (t, a) => (A(), c("div", {
			class: C(B(Z)("mc-notification-host", n.customClass)),
			role: "status",
			"aria-live": "polite"
		}, [f(r, {
			name: B(q_),
			tag: "div",
			class: "mc-notification-stack",
			"move-class": "mc-notification-move"
		}, {
			default: ee(() => [(A(!0), c(e, null, P(B(K_), (e) => (A(), o(G_, {
				key: e.id,
				type: e.type,
				content: e.content,
				title: e.title,
				duration: e.duration,
				icon: e.icon,
				"show-progress": e.showProgress,
				"class-name": e.className,
				"custom-class": e.customClass,
				onClose: (t) => i(e.id)
			}, null, 8, [
				"type",
				"content",
				"title",
				"duration",
				"icon",
				"show-progress",
				"class-name",
				"custom-class",
				"onClose"
			]))), 128))]),
			_: 1
		}, 8, ["name"])], 2));
	}
}), [["__scopeId", "data-v-a4e462cb"]]), tv = null, nv = null;
function rv() {
	tv || typeof document < "u" && (J_.value > 0 || (tv = document.createElement("div"), tv.className = "mc-notification-root", document.body.appendChild(tv), nv = a(ev), nv.mount(tv)));
}
function iv(e, t, n = {}) {
	let r = n.duration ?? (e === "loading" ? 0 : 4500), i = {
		id: X_(),
		type: e,
		content: n.content ?? t,
		title: n.title,
		duration: r,
		icon: n.icon,
		showProgress: n.showProgress ?? r > 0,
		className: n.className,
		customClass: n.customClass,
		onClose: n.onClose
	};
	return Z_(i), rv(), {
		id: i.id,
		close: () => Q_(i.id)
	};
}
var av = {
	info(e, t) {
		return iv("info", e, t);
	},
	success(e, t) {
		return iv("success", e, t);
	},
	warning(e, t) {
		return iv("warning", e, t);
	},
	error(e, t) {
		return iv("error", e, t);
	},
	loading(e, t) {
		return iv("loading", e, {
			duration: 0,
			...t
		});
	},
	open(e, t) {
		return iv(t?.type ?? "info", e, t);
	},
	closeAll() {
		$_();
	},
	destroyAll() {
		let e = q_.value;
		q_.value = "", $_(), S(() => {
			q_.value = e;
		});
	}
};
function ov() {
	return av;
}
//#endregion
//#region src/components/number-animation/NumberAnimation.vue?vue&type=script&setup=true&lang.ts
var sv = {
	key: 0,
	class: "mc-number-animation__affix"
}, cv = ["aria-label"], lv = { class: "mc-number-animation__inner" }, uv = {
	key: 0,
	class: "mc-number-animation__static"
}, dv = {
	key: 1,
	class: "mc-number-animation__reel",
	"aria-hidden": "true"
}, fv = {
	key: 1,
	class: "mc-number-animation__affix"
}, pv = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiNumberAnimation",
	__name: "NumberAnimation",
	props: {
		value: {},
		from: { default: 0 },
		duration: { default: 1200 },
		decimals: { default: 0 },
		separator: {
			type: Boolean,
			default: !0
		},
		prefix: {},
		suffix: {},
		size: { default: "medium" },
		color: {},
		direction: { default: "up" },
		customClass: {}
	},
	setup(t) {
		let n = t, r = N(n.from), a = 0;
		function o(e) {
			let [t, r] = (Number.isFinite(e) ? e : 0).toFixed(n.decimals).split("."), i = n.separator ? t.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : t;
			return r ? `${i}.${r}` : i;
		}
		function u(e) {
			return e === 1 ? 1 : 1 - 2 ** (-10 * e);
		}
		function d() {
			a && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(a), a = 0);
		}
		function f() {
			d();
			let e = n.direction === "down" ? n.value : n.from, t = n.direction === "down" ? n.from : n.value, i = t - e;
			if (r.value = e, i === 0 || n.duration <= 0 || !wt) {
				r.value = t;
				return;
			}
			let o = performance.now(), s = () => {
				let c = Math.min(1, (performance.now() - o) / n.duration);
				r.value = e + i * u(c), c < 1 ? a = Et(s) : r.value = t;
			};
			a = Et(s);
		}
		G(() => [
			n.value,
			n.from,
			n.direction,
			n.duration
		], () => f(), { immediate: !0 }), E(() => {
			d();
		});
		let p = i(() => o(r.value).split("").map((e) => ({
			char: e,
			digit: /[0-9]/.test(e) ? Number(e) : null
		}))), m = i(() => o(r.value)), h = i(() => Z("mc-number-animation", `mc-number-animation--${n.size}`, `mc-number-animation--${n.direction}`, n.customClass)), g = i(() => St(n.color) ? { color: St(n.color) } : void 0);
		return (n, r) => (A(), c("span", {
			class: C(["mc-number-animation", h.value]),
			style: T(g.value),
			"aria-live": "polite",
			"data-mc-type": "readout"
		}, [
			t.prefix ? (A(), c("span", sv, R(t.prefix), 1)) : s("", !0),
			l("span", {
				class: C(["mc-number-animation__value", { "is-plain": !!t.color }]),
				"aria-label": m.value
			}, [l("span", lv, [(A(!0), c(e, null, P(p.value, (t, n) => (A(), c("span", {
				key: n,
				class: C(["mc-number-animation__glyph", { "is-digit": t.digit !== null }])
			}, [t.digit === null ? (A(), c("span", uv, R(t.char), 1)) : (A(), c("span", dv, [l("span", {
				class: "mc-number-animation__strip",
				"aria-hidden": "true",
				style: T({ transform: `translateY(${-t.digit * 10}%)` })
			}, [(A(), c(e, null, P(10, (e) => l("i", { key: e }, R(e - 1), 1)), 64))], 4)]))], 2))), 128))])], 10, cv),
			t.suffix ? (A(), c("span", fv, R(t.suffix), 1)) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-92fa7c57"]]), mv = ["aria-disabled"], hv = ["aria-label"], gv = ["href"], _v = {
	key: 1,
	class: "mc-page-header__crumb is-current"
}, vv = { class: "mc-page-header__main" }, yv = { class: "mc-page-header__lead" }, bv = ["disabled", "aria-label"], xv = { class: "mc-page-header__back-label" }, Sv = { class: "mc-page-header__text" }, Cv = {
	key: 0,
	class: "mc-page-header__title",
	"data-mc-type": "title"
}, wv = {
	key: 1,
	class: "mc-page-header__subtitle"
}, Tv = {
	key: 0,
	class: "mc-page-header__actions"
}, Ev = {
	key: 1,
	class: "mc-page-header__extra"
}, Dv = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiPageHeader",
	__name: "PageHeader",
	props: {
		title: {},
		subtitle: {},
		breadcrumb: {},
		back: {
			type: [Boolean, String],
			default: !1
		},
		avatar: {},
		sticky: {
			type: Boolean,
			default: !1
		},
		compact: {
			type: Boolean,
			default: !1
		},
		separator: { default: "chevron-right" },
		aurora: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["back"],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), u = n, p = N(!1);
		function m() {
			p.value = window.scrollY > 24;
		}
		O(() => {
			r.sticky && window.addEventListener("scroll", m, { passive: !0 });
		}), E(() => {
			r.sticky && window.removeEventListener("scroll", m);
		});
		let h = i(() => typeof r.back == "string" ? r.back : a.value.pageHeader?.back ?? "Back"), g = i(() => Z("mc-page-header", {
			"is-sticky": r.sticky,
			"is-condensed": p.value,
			"is-compact": r.compact,
			"is-aurora": r.aurora,
			"is-grain": r.grain,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (A(), c("header", {
			class: C(g.value),
			"aria-disabled": t.disabled || void 0
		}, [
			r[2] || (r[2] = l("span", {
				class: "mc-page-header__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			t.breadcrumb?.length ? (A(), c("nav", {
				key: 0,
				class: "mc-page-header__crumbs",
				"aria-label": B(a).pageHeader?.breadcrumb ?? "Breadcrumb"
			}, [(A(!0), c(e, null, P(t.breadcrumb, (n, r) => (A(), c(e, { key: r }, [n.href ? (A(), c("a", {
				key: 0,
				class: "mc-page-header__crumb",
				href: n.href
			}, [n.icon ? (A(), o($, {
				key: 0,
				name: n.icon,
				size: 14
			}, null, 8, ["name"])) : s("", !0), d(" " + R(n.label), 1)], 8, gv)) : (A(), c("span", _v, [n.icon ? (A(), o($, {
				key: 0,
				name: n.icon,
				size: 14
			}, null, 8, ["name"])) : s("", !0), d(" " + R(n.label), 1)])), r < t.breadcrumb.length - 1 ? (A(), o($, {
				key: 2,
				name: t.separator,
				size: 13,
				class: "mc-page-header__crumb-sep"
			}, null, 8, ["name"])) : s("", !0)], 64))), 128))], 8, hv)) : s("", !0),
			l("div", vv, [l("div", yv, [
				t.back ? (A(), c("button", {
					key: 0,
					class: "mc-page-header__back",
					type: "button",
					disabled: t.disabled,
					"aria-label": h.value,
					onClick: r[0] || (r[0] = (e) => u("back"))
				}, [f($, {
					name: "arrow-left",
					size: 16
				}), l("span", xv, R(h.value), 1)], 8, bv)) : s("", !0),
				t.avatar ? (A(), o(Hn, {
					key: 1,
					src: t.avatar,
					size: "large",
					class: "mc-page-header__avatar"
				}, null, 8, ["src"])) : s("", !0),
				l("div", Sv, [
					t.title ? (A(), c("h1", Cv, R(t.title), 1)) : s("", !0),
					t.subtitle ? (A(), c("p", wv, R(t.subtitle), 1)) : s("", !0),
					F(n.$slots, "meta", {}, void 0, !0)
				])
			]), n.$slots.actions ? (A(), c("div", Tv, [r[1] || (r[1] = l("span", {
				class: "mc-page-header__glint",
				"aria-hidden": "true"
			}, null, -1)), F(n.$slots, "actions", {}, void 0, !0)])) : s("", !0)]),
			n.$slots.extra ? (A(), c("div", Ev, [F(n.$slots, "extra", {}, void 0, !0)])) : s("", !0)
		], 10, mv));
	}
}), [["__scopeId", "data-v-660c02ff"]]), Ov = ["aria-label", "aria-disabled"], kv = {
	key: 0,
	class: "mc-pagination__total"
}, Av = { class: "mc-pagination__controls" }, jv = ["disabled", "aria-label"], Mv = {
	key: 1,
	class: "mc-pagination__step-label"
}, Nv = {
	key: 0,
	class: "mc-pagination__pages"
}, Pv = {
	key: 0,
	class: "mc-pagination__gap"
}, Fv = [
	"disabled",
	"aria-current",
	"aria-label",
	"onClick"
], Iv = { class: "mc-pagination__page-label" }, Lv = {
	key: 0,
	class: "mc-pagination__grain mc-grain-overlay",
	"aria-hidden": "true"
}, Rv = {
	key: 1,
	class: "mc-pagination__counter"
}, zv = ["disabled", "aria-label"], Bv = {
	key: 1,
	class: "mc-pagination__step-label"
}, Vv = {
	key: 1,
	class: "mc-pagination__sizer"
}, Hv = { class: "mc-visually-hidden" }, Uv = ["value", "disabled"], Wv = ["value"], Gv = {
	key: 2,
	class: "mc-pagination__jumper"
}, Kv = { class: "mc-pagination__jumper-text" }, qv = [
	"max",
	"disabled",
	"aria-label"
], Jv = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiPagination",
	__name: "Pagination",
	props: {
		modelValue: { default: 1 },
		pageSize: { default: 10 },
		total: { default: 0 },
		pageSizes: { default: () => [
			10,
			20,
			50,
			100
		] },
		showSizeChanger: {
			type: Boolean,
			default: !1
		},
		showQuickJumper: {
			type: Boolean,
			default: !1
		},
		showTotal: {
			type: Boolean,
			default: !1
		},
		simple: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		prev: { default: "chevron-left" },
		next: { default: "chevron-right" },
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:pageSize",
		"change",
		"size-change"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, u = N(""), d = Zt(), f = i(() => {
			let e = Math.max(1, r.pageSize);
			return Math.max(1, Math.ceil((r.total || 0) / e));
		}), p = i(() => {
			let e = Math.round(r.modelValue || 1);
			return Math.min(Math.max(1, e), f.value);
		});
		function m(e) {
			return !!Bt[Ut(e)];
		}
		let h = i(() => {
			let e = f.value, t = p.value;
			if (e <= 7) return Array.from({ length: e }, (e, t) => t + 1);
			let n = [1], r = Math.max(2, t - 1), i = Math.min(e - 1, t + 1);
			r > 2 && n.push("gap-left");
			for (let e = r; e <= i; e += 1) n.push(e);
			return i < e - 1 && n.push("gap-right"), n.push(e), n;
		});
		function g(e) {
			if (r.disabled) return;
			let t = Math.min(Math.max(1, e), f.value);
			t !== r.modelValue && (a("update:modelValue", t), a("change", t, r.pageSize));
		}
		function _(e) {
			if (r.disabled) return;
			let t = Number(e.target.value);
			if (!t || t === r.pageSize) return;
			a("update:pageSize", t), a("size-change", t);
			let n = Math.min(p.value, Math.max(1, Math.ceil((r.total || 0) / t)));
			a("update:modelValue", n), a("change", n, t);
		}
		function v() {
			if (r.disabled) return;
			let e = Number(u.value);
			e && (g(e), u.value = "");
		}
		G(f, (e) => {
			p.value > e && a("update:modelValue", e);
		});
		let y = i(() => Z("mc-pagination", {
			"is-simple": r.simple,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (A(), c("nav", {
			class: C(y.value),
			"aria-label": B(d).pagination.label ?? "Pagination",
			"aria-disabled": t.disabled ? "true" : void 0
		}, [
			r[3] || (r[3] = l("span", {
				class: "mc-pagination__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			t.showTotal ? (A(), c("span", kv, R(B(d).pagination.total.replace("{count}", String(t.total))), 1)) : s("", !0),
			l("div", Av, [
				l("button", {
					type: "button",
					class: C(["mc-pagination__step mc-sheen-sweep", { "is-text": !m(t.prev) }]),
					disabled: t.disabled || p.value <= 1,
					"aria-label": B(d).pagination.previousPage ?? "Previous page",
					onClick: r[0] || (r[0] = (e) => g(p.value - 1))
				}, [m(t.prev) ? (A(), o($, {
					key: 0,
					name: t.prev,
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])) : (A(), c("span", Mv, R(t.prev), 1))], 10, jv),
				t.simple ? (A(), c("span", Rv, R(p.value) + " / " + R(f.value), 1)) : (A(), c("div", Nv, [(A(!0), c(e, null, P(h.value, (n) => (A(), c(e, { key: n }, [typeof n == "string" ? (A(), c("span", Pv, "…")) : (A(), c("button", {
					key: 1,
					type: "button",
					class: C(["mc-pagination__page mc-sheen-sweep", { "is-active": n === p.value }]),
					disabled: t.disabled,
					"aria-current": n === p.value ? "page" : void 0,
					"aria-label": `Page ${n}`,
					onClick: (e) => g(n)
				}, [l("span", Iv, R(n), 1), n === p.value ? (A(), c("span", Lv)) : s("", !0)], 10, Fv))], 64))), 128))])),
				l("button", {
					type: "button",
					class: C(["mc-pagination__step mc-sheen-sweep", { "is-text": !m(t.next) }]),
					disabled: t.disabled || p.value >= f.value,
					"aria-label": B(d).pagination.nextPage ?? "Next page",
					onClick: r[1] || (r[1] = (e) => g(p.value + 1))
				}, [m(t.next) ? (A(), o($, {
					key: 0,
					name: t.next,
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])) : (A(), c("span", Bv, R(t.next), 1))], 10, zv)
			]),
			t.showSizeChanger && !t.simple ? (A(), c("label", Vv, [l("span", Hv, R(B(d).pagination.perPage ?? "Items per page"), 1), l("select", {
				class: "mc-pagination__select",
				value: t.pageSize,
				disabled: t.disabled,
				onChange: _
			}, [(A(!0), c(e, null, P(t.pageSizes, (e) => (A(), c("option", {
				key: e,
				value: e
			}, R(e) + " / page", 9, Wv))), 128))], 40, Uv)])) : s("", !0),
			t.showQuickJumper && !t.simple ? (A(), c("label", Gv, [l("span", Kv, R(B(d).pagination.goto), 1), te(l("input", {
				"onUpdate:modelValue": r[2] || (r[2] = (e) => u.value = e),
				class: "mc-pagination__input",
				type: "number",
				min: "1",
				max: f.value,
				disabled: t.disabled,
				"aria-label": B(d).pagination.jumpToPage ?? "Jump to page",
				onKeydown: K(v, ["enter"])
			}, null, 40, qv), [[U, u.value]])])) : s("", !0)
		], 10, Ov));
	}
}), [["__scopeId", "data-v-29a2613a"]]), Yv = "a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
function Xv(e, t) {
	let n = N(!0), r = N(null), i = null;
	function a() {
		let i = e.value;
		if (!i) return;
		let a = i.querySelector(Yv);
		r.value = a, n.value = !a, t?.(a);
	}
	return O(() => {
		a(), typeof MutationObserver < "u" && e.value && (i = new MutationObserver(() => a()), i.observe(e.value, {
			childList: !0,
			subtree: !0
		}));
	}), E(() => {
		i?.disconnect(), i = null;
	}), {
		selfFocusable: n,
		innerFocusable: r,
		detect: a
	};
}
//#endregion
//#region src/components/popconfirm/Popconfirm.vue?vue&type=script&setup=true&lang.ts
var Zv = [
	"role",
	"tabindex",
	"aria-expanded",
	"aria-disabled",
	"aria-controls"
], Qv = ["id", "aria-labelledby"], $v = { class: "mc-popconfirm__body" }, ey = ["id"], ty = {
	key: 0,
	class: "mc-popconfirm__description"
}, ny = {
	key: 1,
	class: "mc-popconfirm__error",
	role: "alert"
}, ry = { class: "mc-popconfirm__actions" }, iy = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiPopconfirm",
	__name: "Popconfirm",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		title: {},
		description: {},
		okText: {},
		cancelText: {},
		placement: { default: "top" },
		okType: { default: "danger" },
		onOk: {},
		onCancel: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		width: {},
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close",
		"confirm",
		"cancel",
		"confirming",
		"error"
	],
	setup(r, { emit: a }) {
		let u = H(), p = r, m = a, h = Zt(), g = An(), _ = Fi("mc-popconfirm"), v = Fi("mc-popconfirm-title"), y = N(null), b = N(null), w = N(!1), { isTop: D } = On({ active: w }), { selfFocusable: k } = Xv(y), j = Tn({ active: w }), M = N(!1), P = N(""), { style: I, coords: L, currentPlacement: z, transformOrigin: V, arrowSide: U, update: W, startAutoUpdate: te, stopAutoUpdate: K } = _n(y, b, {
			placement: p.placement,
			offset: 10,
			zIndex: j
		}), q = i(() => w.value && !p.disabled);
		G(() => [p.open, p.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (w.value = t) : w.value = e;
		}, { immediate: !0 }), G(q, (e) => {
			e ? (P.value = "", W(), te(), J()) : K();
		}, { immediate: !0 });
		function J() {
			S(() => {
				(b.value?.querySelector(".mc-popconfirm__ok"))?.focus({ preventScroll: !0 });
			});
		}
		G(M, (e) => {
			e ? S(() => b.value?.querySelector("[role=\"dialog\"]")?.focus({ preventScroll: !0 })) : w.value && S(() => {
				w.value && b.value?.querySelector(".mc-popconfirm__ok")?.focus({ preventScroll: !0 });
			});
		});
		function ne() {
			y.value?.focus({ preventScroll: !0 });
		}
		function re(e) {
			w.value !== e && (w.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		function ie() {
			p.disabled || re(!w.value);
		}
		function Y() {
			re(!1), ne();
		}
		function ae(e) {
			return !!e && typeof e.then == "function";
		}
		function oe(e) {
			let t = e instanceof Error ? e : Error(String(e));
			P.value = t.message || h.value.popconfirm.error || "Something went wrong", m("error", t);
		}
		async function se() {
			if (p.disabled || M.value) return;
			m("confirm"), P.value = "";
			let e = p.onOk;
			if (!e) {
				Y();
				return;
			}
			let t;
			try {
				t = e();
			} catch (e) {
				oe(e);
				return;
			}
			if (!ae(t)) t !== !1 && Y();
			else {
				M.value = !0, m("confirming", !0);
				try {
					await t !== !1 && Y();
				} catch (e) {
					oe(e);
				} finally {
					M.value = !1, m("confirming", !1);
				}
			}
		}
		function ce() {
			m("cancel"), p.onCancel?.(), Y();
		}
		function le(e) {
			k.value && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ie());
		}
		function ue(e) {
			e.key === "Escape" && w.value && D() && (e.stopPropagation(), re(!1), ne());
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", ue);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", ue), K();
		}), Sc(y, () => re(!1), { ignore: [b] });
		let de = i(() => {
			let e = U.value;
			if (e === "top" || e === "bottom") {
				let e = L.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = L.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), fe = i(() => `mc-popconfirm__arrow--${U.value}`), pe = i(() => !!(p.title || u.title)), me = i(() => {
			if (p.width !== void 0) return typeof p.width == "number" ? `${p.width}px` : p.width;
		}), he = i(() => Z("mc-popconfirm__layer", `mc-popconfirm--${z.value}`)), ge = i(() => Z("mc-popconfirm", "mc-grain-overlay", p.customClass));
		return (i, a) => (A(), c(e, null, [l("span", {
			ref_key: "reference",
			ref: y,
			class: C(["mc-popconfirm__trigger", { "is-disabled": r.disabled }]),
			role: B(k) ? "button" : void 0,
			tabindex: B(k) ? 0 : void 0,
			"aria-expanded": q.value,
			"aria-haspopup": "dialog",
			"aria-disabled": r.disabled,
			"aria-controls": q.value ? B(_) : void 0,
			onClick: ie,
			onKeydown: le
		}, [F(i.$slots, "default", {}, void 0, !0)], 42, Zv), (A(), o(t, { to: "body" }, [f(n, { name: "mc-float" }, {
			default: ee(() => [q.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: b,
				class: he.value,
				style: B(I)
			}, B(g)), [l("span", {
				class: C(["mc-popconfirm__arrow", fe.value]),
				style: T(de.value),
				"aria-hidden": "true"
			}, null, 6), l("div", {
				id: B(_),
				class: C(ge.value),
				role: "dialog",
				"aria-labelledby": B(v),
				style: T({
					width: me.value,
					transformOrigin: B(V)
				}),
				tabindex: "-1"
			}, [l("div", $v, [
				l("p", {
					id: B(v),
					class: C(["mc-popconfirm__title", { "is-empty": !pe.value }]),
					"data-mc-type": "title"
				}, [F(i.$slots, "title", {}, () => [d(R(r.title), 1)], !0)], 10, ey),
				r.description || i.$slots.description ? (A(), c("p", ty, [F(i.$slots, "description", {}, () => [d(R(r.description), 1)], !0)])) : s("", !0),
				F(i.$slots, "content", {}, void 0, !0),
				P.value ? (A(), c("p", ny, R(P.value), 1)) : s("", !0)
			]), l("div", ry, [f(Fr, {
				size: "small",
				variant: "soft",
				onClick: ce
			}, {
				default: ee(() => [d(R(r.cancelText ?? B(h).popconfirm.cancel), 1)]),
				_: 1
			}), f(Fr, {
				size: "small",
				variant: "solid",
				"custom-class": "mc-popconfirm__ok",
				color: r.okType === "primary" ? "accent" : r.okType,
				loading: M.value,
				disabled: M.value,
				onClick: se
			}, {
				default: ee(() => [d(R(r.okText ?? B(h).popconfirm.confirm), 1)]),
				_: 1
			}, 8, [
				"color",
				"loading",
				"disabled"
			])])], 14, Qv)], 16)) : s("", !0)]),
			_: 3
		})]))], 64));
	}
}), [["__scopeId", "data-v-be8a41c0"]]), ay = [
	"role",
	"tabindex",
	"aria-expanded",
	"aria-disabled",
	"aria-controls"
], oy = ["id", "aria-labelledby"], sy = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, cy = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, ly = ["id"], uy = { class: "mc-popover__body" }, dy = {
	key: 2,
	class: "mc-popover__footer"
}, fy = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiPopover",
	__name: "Popover",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		title: {},
		trigger: { default: "click" },
		placement: { default: "top" },
		width: {},
		offset: { default: 10 },
		showArrow: {
			type: Boolean,
			default: !0
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		variant: { default: "glass" },
		popoverClass: {},
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = H(), p = r, m = a, h = Fi("mc-popover"), g = Fi("mc-popover-title"), _ = N(null), v = N(null), y = N(!1), { isTop: b } = On({ active: y }), { selfFocusable: w } = Xv(_), D = Tn({ active: y }), k = An(), { style: j, coords: M, currentPlacement: P, transformOrigin: I, arrowSide: L, update: z, startAutoUpdate: V, stopAutoUpdate: U } = _n(_, v, {
			placement: p.placement,
			offset: p.offset,
			zIndex: D
		}), W = i(() => y.value && !p.disabled);
		G(() => [p.open, p.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (y.value = t) : y.value = e;
		}, { immediate: !0 }), G(W, (e) => {
			e ? (z(), V()) : U();
		}, { immediate: !0 });
		function te(e) {
			p.disabled || y.value !== e && (y.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		function K() {
			p.trigger === "hover" && te(!0);
		}
		function q() {
			p.trigger === "hover" && te(!1);
		}
		function J() {
			(p.trigger === "focus" || p.trigger === "hover") && te(!0);
		}
		function ne(e) {
			if (p.trigger !== "focus") return;
			let t = e.relatedTarget;
			t && v.value?.contains(t) || te(!1);
		}
		function re() {
			p.trigger === "click" && te(!y.value);
		}
		function ie() {
			(_.value?.querySelector("button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])") ?? _.value)?.focus({ preventScroll: !0 });
		}
		function Y(e) {
			w.value && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), re());
		}
		function ae(e) {
			if (e.key !== "Escape" || !y.value || !b()) return;
			e.stopPropagation();
			let t = v.value?.contains(document.activeElement) ?? !1;
			te(!1), t && S(() => ie());
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", ae);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", ae), U();
		}), Sc(_, () => te(!1), { ignore: [v] });
		let oe = i(() => typeof p.teleport == "string" ? p.teleport : "body"), se = i(() => {
			let e = L.value;
			if (e === "top" || e === "bottom") {
				let e = M.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = M.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), ce = i(() => `mc-popover__arrow--${L.value}`), le = i(() => !!(p.title || u.title)), ue = i(() => {
			if (p.width !== void 0) return typeof p.width == "number" ? `${p.width}px` : p.width;
		}), de = i(() => Z("mc-popover__layer", `mc-popover--${P.value}`)), fe = i(() => Z("mc-popover", "mc-grain-overlay", {
			"mc-panel--liquid": p.variant === "liquid",
			"mc-liquid-glass": p.variant === "liquid",
			"mc-liquid-glass--liquid": p.variant === "liquid",
			"mc-liquid-glass--layers": p.variant === "liquid"
		}, p.popoverClass, p.customClass));
		return (i, a) => (A(), c(e, null, [l("span", {
			ref_key: "reference",
			ref: _,
			class: C(["mc-popover__trigger", { "is-disabled": r.disabled }]),
			role: B(w) ? "button" : void 0,
			tabindex: B(w) ? 0 : void 0,
			"aria-expanded": W.value,
			"aria-haspopup": "dialog",
			"aria-disabled": r.disabled || void 0,
			"aria-controls": W.value ? B(h) : void 0,
			onMouseenter: K,
			onMouseleave: q,
			onFocusin: J,
			onFocusout: ne,
			onClick: re,
			onKeydown: Y
		}, [F(i.$slots, "trigger", {}, () => [F(i.$slots, "default", {}, void 0, !0)], !0)], 42, ay), (A(), o(t, {
			to: oe.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-float" }, {
			default: ee(() => [W.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: v,
				class: de.value,
				style: B(j)
			}, B(k)), [r.showArrow ? (A(), c("span", {
				key: 0,
				class: C(["mc-popover__arrow", ce.value]),
				style: T(se.value),
				"aria-hidden": "true"
			}, null, 6)) : s("", !0), l("div", {
				id: B(h),
				class: C(fe.value),
				role: "dialog",
				"aria-labelledby": B(g),
				style: T({
					width: ue.value,
					transformOrigin: B(I)
				})
			}, [
				r.variant === "liquid" ? (A(), c("span", sy)) : s("", !0),
				r.variant === "liquid" ? (A(), c("span", cy)) : s("", !0),
				l("header", {
					id: B(g),
					class: C(["mc-popover__header", { "is-empty": !le.value }]),
					"data-mc-type": "title"
				}, [F(i.$slots, "title", {}, () => [d(R(r.title), 1)], !0)], 10, ly),
				l("div", uy, [F(i.$slots, "content", {}, void 0, !0)]),
				i.$slots.footer ? (A(), c("footer", dy, [F(i.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 14, oy)], 16)) : s("", !0)]),
			_: 3
		})], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-2dddd313"]]), py = [
	"aria-expanded",
	"aria-controls",
	"aria-owns",
	"aria-activedescendant",
	"aria-labelledby",
	"aria-disabled"
], my = ["id"], hy = ["id"], gy = {
	key: 0,
	class: "mc-popselect__tag mc-popselect__tag--more"
}, _y = {
	key: 1,
	class: "mc-popselect__placeholder"
}, vy = ["id"], yy = ["id"], by = ["id", "aria-multiselectable"], xy = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], Sy = {
	class: "mc-popselect__check",
	"aria-hidden": "true"
}, Cy = { class: "mc-popselect__label" }, wy = {
	key: 0,
	class: "mc-popselect__empty"
}, Ty = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiPopselect",
	__name: "Popselect",
	props: {
		open: { type: Boolean },
		modelValue: {},
		options: { default: () => [] },
		multiple: {
			type: Boolean,
			default: !1
		},
		placement: { default: "bottom-start" },
		trigger: { default: "click" },
		showArrow: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		maxTagCount: { default: 1 },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		placeholder: {},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"select",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = Zt(), m = Fi("mc-popselect"), h = Fi("mc-popselect-list"), g = Fi("mc-popselect-label"), _ = Fi("mc-popselect-value"), v = N(null), y = N(null), b = N(!1), { isTop: w } = On({ active: b }), D = Tn({ active: b }), k = An(), j = N(-1), { style: M, coords: F, currentPlacement: I, transformOrigin: L, arrowSide: z, update: V, startAutoUpdate: H, stopAutoUpdate: U } = _n(v, y, {
			placement: u.placement,
			offset: 8,
			zIndex: D
		}), W = i(() => b.value && !u.disabled);
		G(() => u.open, (e) => {
			e !== void 0 && (b.value = e);
		}, { immediate: !0 }), G(W, (e) => {
			e ? (j.value = ie(), V(), H()) : U();
		}, { immediate: !0 });
		let te = i(() => {
			let e = u.modelValue;
			return e == null ? [] : Array.isArray(e) ? e : [e];
		});
		function K(e) {
			return te.value.includes(e.value);
		}
		let q = i(() => u.options.filter((e) => K(e)).map((e) => e.label)), J = i(() => {
			let e = Math.max(0, u.maxTagCount);
			return q.value.slice(0, e);
		}), ne = i(() => Math.max(0, q.value.length - J.value.length)), re = i(() => q.value.length ? q.value[0] : "");
		function ie() {
			return u.options.findIndex((e) => !e.disabled);
		}
		function Y(e) {
			d("update:modelValue", e), d("change", e);
		}
		function ae(e) {
			if (!e.disabled) {
				if (d("select", e.value), u.multiple) {
					let t = [...te.value], n = t.indexOf(e.value);
					n >= 0 ? t.splice(n, 1) : t.push(e.value), Y(t);
				} else Y(e.value), se(!1);
			}
		}
		function oe() {
			Y(u.multiple ? [] : void 0);
		}
		function se(e) {
			u.disabled || b.value !== e && (b.value = e, d("update:open", e), d(e ? "open" : "close"));
		}
		function ce() {
			u.trigger === "hover" && se(!0);
		}
		function le() {
			u.trigger === "hover" && se(!1);
		}
		function ue() {
			(u.trigger === "focus" || u.trigger === "hover") && se(!0);
		}
		function de(e) {
			if (u.trigger !== "focus") return;
			let t = e.relatedTarget;
			t && y.value?.contains(t) || se(!1);
		}
		function fe() {
			u.trigger === "click" && se(!b.value);
		}
		function pe(e) {
			let t = u.options.length;
			if (t === 0) return;
			let n = j.value;
			for (let r = 0; r < t; r += 1) if (n = (n + e + t) % t, !u.options[n]?.disabled) {
				j.value = n;
				return;
			}
		}
		function me() {
			for (let e = u.options.length - 1; e >= 0; --e) if (!u.options[e]?.disabled) return e;
			return -1;
		}
		function he(e) {
			if (W.value) {
				if (e.key === "ArrowDown") e.preventDefault(), pe(1);
				else if (e.key === "ArrowUp") e.preventDefault(), pe(-1);
				else if (e.key === "Enter" || e.key === " ") {
					let t = u.options[j.value];
					t && (e.preventDefault(), ae(t));
				}
			}
		}
		function ge(e) {
			W.value ? he(e) : u.disabled || (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" ? (e.preventDefault(), se(!0)) : e.key === "ArrowUp" && (e.preventDefault(), se(!0), S(() => {
				j.value = me();
			})));
		}
		function _e() {
			let e = document.activeElement;
			return e ? !!v.value?.contains(e) || !!y.value?.contains(e) : !1;
		}
		function X(e) {
			if (e.key === "Escape" && b.value && w()) {
				e.stopPropagation();
				let t = _e();
				se(!1), t && v.value?.focus({ preventScroll: !0 });
				return;
			}
			if (!W.value) return;
			let t = e.target;
			t && y.value?.contains(t) && he(e);
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", X);
		}), E(() => {
			typeof document < "u" && document.removeEventListener("keydown", X), U();
		}), Sc(v, () => se(!1), { ignore: [y] });
		let ve = i(() => typeof u.teleport == "string" ? u.teleport : "body"), ye = i(() => {
			let e = z.value;
			if (e === "top" || e === "bottom") {
				let e = F.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = F.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), be = i(() => `mc-popselect__arrow--${z.value}`), xe = i(() => {
			if (!(!W.value || j.value < 0) && u.options[j.value]) return `${h}-option-${j.value}`;
		}), Se = i(() => p.value.popselect?.clear ?? "Clear"), Ce = i(() => p.value.popselect?.label ?? "Select"), we = i(() => Z("mc-popselect__layer", `mc-popselect--${I.value}`)), Te = i(() => Z("mc-popselect", "mc-grain-overlay", u.customClass)), Ee = i(() => u.multiple ? "" : re.value), De = i(() => te.value.length > 0);
		return G(() => u.options, () => {
			W.value && (j.value = ie());
		}), (i, a) => (A(), c(e, null, [l("span", {
			ref_key: "reference",
			ref: v,
			class: C(["mc-popselect__trigger", {
				"is-disabled": r.disabled,
				"is-open": W.value,
				"is-filled": De.value
			}]),
			"aria-expanded": W.value,
			"aria-haspopup": "listbox",
			"aria-controls": B(h),
			"aria-owns": B(h),
			"aria-activedescendant": xe.value,
			"aria-labelledby": `${B(g)} ${B(_)}`,
			"aria-disabled": r.disabled,
			role: "combobox",
			tabindex: "0",
			onMouseenter: ce,
			onMouseleave: le,
			onFocusin: ue,
			onFocusout: de,
			onClick: fe,
			onKeydown: ge
		}, [
			l("span", {
				id: B(g),
				class: "mc-visually-hidden"
			}, R(Ce.value), 9, my),
			r.multiple ? (A(), c("span", {
				key: 0,
				id: B(_),
				class: "mc-popselect__tags"
			}, [
				(A(!0), c(e, null, P(J.value, (e) => (A(), c("span", {
					key: e,
					class: "mc-popselect__tag"
				}, R(e), 1))), 128)),
				ne.value > 0 ? (A(), c("span", gy, " +" + R(ne.value), 1)) : s("", !0),
				De.value ? s("", !0) : (A(), c("span", _y, R(r.placeholder ?? B(p).select.placeholder), 1))
			], 8, hy)) : (A(), c("span", {
				key: 1,
				id: B(_),
				class: "mc-popselect__value"
			}, [l("span", { class: C(De.value ? "is-filled" : "is-placeholder") }, R(Ee.value || r.placeholder || B(p).select.placeholder), 3)], 8, vy)),
			f($, {
				name: "chevron-down",
				size: 14,
				class: "mc-popselect__caret"
			})
		], 42, py), (A(), o(t, {
			to: ve.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-float" }, {
			default: ee(() => [W.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: y,
				class: we.value,
				style: B(M)
			}, B(k)), [r.showArrow ? (A(), c("span", {
				key: 0,
				class: C(["mc-popselect__arrow", be.value]),
				style: T(ye.value),
				"aria-hidden": "true"
			}, null, 6)) : s("", !0), l("div", {
				id: B(m),
				class: C(Te.value),
				role: "presentation",
				style: T({ transformOrigin: B(L) })
			}, [l("ul", {
				id: B(h),
				class: "mc-popselect__list mc-scroll",
				role: "listbox",
				"aria-multiselectable": r.multiple
			}, [(A(!0), c(e, null, P(r.options, (e, t) => (A(), c("li", {
				key: e.value,
				id: `${B(h)}-option-${t}`,
				class: C(["mc-popselect__option", {
					"is-selected": K(e),
					"is-disabled": e.disabled,
					"is-highlighted": t === j.value
				}]),
				role: "option",
				"aria-selected": K(e),
				"aria-disabled": e.disabled,
				onClick: (t) => ae(e),
				onMouseenter: (e) => j.value = t
			}, [l("span", Sy, [K(e) ? (A(), o($, {
				key: 0,
				name: "check",
				size: 12,
				"stroke-width": 2.6
			})) : s("", !0)]), l("span", Cy, R(e.label), 1)], 42, xy))), 128)), r.options.length === 0 ? (A(), c("li", wy, R(B(p).select.noMatch), 1)) : s("", !0)], 8, by), r.multiple && De.value ? (A(), c("button", {
				key: 0,
				type: "button",
				class: "mc-popselect__clear",
				onClick: oe
			}, R(Se.value), 1)) : s("", !0)], 14, yy)], 16)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-0ed01b37"]]), Ey = ["aria-valuenow", "aria-disabled"], Dy = {
	key: 0,
	class: "mc-progress__indicator"
}, Oy = [
	"width",
	"height",
	"aria-valuenow",
	"aria-disabled"
], ky = ["id"], Ay = [
	"stroke-width",
	"stroke-dasharray",
	"transform"
], jy = [
	"stroke-width",
	"stroke",
	"stroke-dasharray",
	"transform"
], My = 42, Ny = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiProgress",
	__name: "Progress",
	props: {
		percentage: { default: 0 },
		status: {},
		strokeWidth: { default: 8 },
		showIndicator: {
			type: Boolean,
			default: !0
		},
		indicatorPlacement: { default: "outside" },
		color: {},
		type: { default: "line" },
		width: {},
		gap: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = Fi("mc-progress-grad"), r = 2 * Math.PI * My, a = .75 * r, o = i(() => {
			let e = Number(t.percentage);
			return Number.isNaN(e) ? 0 : Math.min(100, Math.max(0, e));
		}), u = i(() => Math.round(o.value)), d = i(() => o.value <= 0), f = i(() => o.value >= 100), p = i(() => {
			if (t.width !== void 0) return typeof t.width == "number" ? `${t.width}px` : t.width;
		}), m = i(() => {
			if (t.width !== void 0) return { width: p.value };
		}), h = i(() => {
			let e = { "--mc-p": String(o.value / 100) }, n = St(t.color);
			return n && (e.background = n), e;
		}), g = i(() => ({ left: `clamp(calc(var(--mc-progress-knob-size) / 2), ${o.value}%, calc(100% - var(--mc-progress-knob-size) / 2))` })), _ = i(() => t.strokeWidth * 100 / v.value), v = i(() => {
			let e = t.width;
			return e === void 0 ? 120 : typeof e == "number" ? e : parseFloat(e) || 120;
		}), y = i(() => `${v.value}px`), b = i(() => Math.min(180, Math.max(0, t.gap))), x = i(() => b.value / 360 * r), S = i(() => Math.max(0, a - x.value)), w = i(() => t.type === "dashboard"), E = i(() => w.value ? `${S.value * o.value / 100} ${r}` : `${r * o.value / 100} ${r}`), D = i(() => w.value ? `${S.value} ${r}` : `${r} ${r}`), O = i(() => w.value ? 135 : -90), k = i(() => St(t.color) ?? `url(#${n})`), j = i(() => t.showIndicator && t.indicatorPlacement !== "none"), M = i(() => Z("mc-progress", `mc-progress--${t.type}`, `mc-progress--${t.status ?? "normal"}`, {
			"is-inside": t.indicatorPlacement === "inside",
			"is-disabled": t.disabled,
			"is-empty": d.value,
			"is-full": f.value
		}, t.customClass));
		return (t, r) => e.type === "line" ? (A(), c("div", {
			key: 0,
			class: C(M.value),
			style: T(m.value)
		}, [l("div", {
			class: "mc-progress__track",
			style: T({ height: `${e.strokeWidth}px` }),
			role: "progressbar",
			tabindex: "0",
			"aria-valuenow": u.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-disabled": e.disabled || void 0
		}, [
			l("div", {
				class: "mc-progress__fill",
				style: T(h.value)
			}, [...r[0] || (r[0] = [l("span", {
				class: "mc-progress__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4),
			l("span", {
				class: "mc-progress__knob",
				style: T(g.value),
				"aria-hidden": "true"
			}, null, 4),
			e.showIndicator && e.indicatorPlacement === "inside" ? (A(), c("span", {
				key: 0,
				class: C(["mc-progress__indicator mc-progress__indicator--inside", { "is-light": u.value > 55 }])
			}, R(u.value) + "% ", 3)) : s("", !0)
		], 12, Ey), e.showIndicator && e.indicatorPlacement === "outside" ? (A(), c("span", Dy, R(u.value) + "% ", 1)) : s("", !0)], 6)) : (A(), c("div", {
			key: 1,
			class: C(M.value),
			style: T({ width: y.value })
		}, [(A(), c("svg", {
			class: "mc-progress__svg",
			width: v.value,
			height: v.value,
			viewBox: "0 0 100 100",
			role: "progressbar",
			tabindex: "0",
			"aria-valuenow": u.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-disabled": e.disabled || void 0
		}, [
			l("defs", null, [l("linearGradient", {
				id: B(n),
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "100%"
			}, [...r[1] || (r[1] = [
				l("stop", {
					offset: "0%",
					"stop-color": "hsl(var(--mc-h) var(--mc-s) 64%)"
				}, null, -1),
				l("stop", {
					offset: "52%",
					"stop-color": "hsl(var(--mc-h2) var(--mc-s2) 62%)"
				}, null, -1),
				l("stop", {
					offset: "100%",
					"stop-color": "hsl(var(--mc-h3) var(--mc-s3) 62%)"
				}, null, -1)
			])], 8, ky)]),
			l("circle", {
				class: "mc-progress__ring-track",
				cx: "50",
				cy: "50",
				r: My,
				fill: "none",
				"stroke-width": _.value,
				"stroke-dasharray": D.value,
				transform: `rotate(${O.value} 50 50)`
			}, null, 8, Ay),
			l("circle", {
				class: "mc-progress__ring-fill",
				cx: "50",
				cy: "50",
				r: My,
				fill: "none",
				"stroke-width": _.value,
				"stroke-linecap": "round",
				stroke: k.value,
				"stroke-dasharray": E.value,
				transform: `rotate(${O.value} 50 50)`
			}, null, 8, jy)
		], 8, Oy)), j.value ? (A(), c("span", {
			key: 0,
			class: "mc-progress__ring-label",
			style: T({ fontSize: `${Math.max(12, v.value * .18)}px` })
		}, R(u.value) + "% ", 5)) : s("", !0)], 6));
	}
}), [["__scopeId", "data-v-78b3e873"]]), Py = {
	key: 0,
	class: "mc-prose__progress",
	"aria-hidden": "true"
}, Fy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1\"/></svg>", Iy = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M9 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>", Ly = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiProse",
	__name: "Prose",
	props: {
		size: { default: "medium" },
		width: { default: "normal" },
		theme: { default: "auto" },
		dropCap: {
			type: Boolean,
			default: !1
		},
		anchors: {
			type: Boolean,
			default: !1
		},
		progress: {
			type: Boolean,
			default: !1
		},
		serif: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(null), r = N(0);
		function a(e) {
			return e.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		function o(e) {
			let t = e.cloneNode(!0);
			return t.querySelectorAll(".mc-prose__anchor").forEach((e) => e.remove()), (t.textContent ?? "").trim();
		}
		function u(e, t) {
			let n = t, r = 2;
			for (; e.querySelector(`[id="${n}"]`);) n = `${t}-${r}`, r += 1;
			return n;
		}
		function d() {
			let e = n.value;
			e && wt && t.anchors && e.querySelectorAll("h2, h3").forEach((t) => {
				if (t.querySelector(".mc-prose__anchor")) return;
				t.id || (t.id = u(e, a(o(t)) || "section"));
				let n = document.createElement("button");
				n.type = "button", n.className = "mc-prose__anchor", n.setAttribute("aria-label", "复制标题链接"), n.title = "复制链接", n.innerHTML = Fy, n.addEventListener("click", () => {
					_(t.id, n);
				}), t.appendChild(n);
			});
		}
		function f() {
			let e = n.value;
			e && wt && e.querySelectorAll("pre").forEach((e) => {
				if (e.querySelector(".mc-prose__copy")) return;
				let t = document.createElement("button");
				t.type = "button", t.className = "mc-prose__copy", t.setAttribute("aria-label", "复制代码"), t.title = "复制代码", t.innerHTML = Iy, t.addEventListener("click", () => {
					v(e, t);
				}), e.appendChild(t);
			});
		}
		let p = null, m;
		function h(e) {
			p && p !== e && p.classList.remove("is-copied"), p = e, e.classList.add("is-copied"), m && clearTimeout(m), m = setTimeout(() => {
				e.classList.remove("is-copied"), p === e && (p = null);
			}, 1600);
		}
		async function g(e) {
			try {
				await navigator.clipboard?.writeText(e);
			} catch {}
		}
		async function _(e, t) {
			let n = window.location.href.split("#")[0];
			await g(`${n}#${e}`), h(t);
		}
		async function v(e, t) {
			let n = (e.querySelector("code")?.textContent ?? e.textContent ?? "").trim();
			n && (await g(n), h(t));
		}
		let y = null;
		function b() {
			d(), f();
		}
		function x() {
			wt && n.value && (y?.disconnect(), y = new MutationObserver(() => {
				b();
			}), y.observe(n.value, {
				childList: !0,
				subtree: !0
			}));
		}
		let S = null, w = 0;
		function D(e) {
			return e === window;
		}
		function k(e) {
			if (!wt) return window;
			let t = e?.parentElement ?? null;
			for (; t;) {
				let e = getComputedStyle(t).overflowY;
				if ((e === "auto" || e === "scroll" || e === "overlay") && t.scrollHeight > t.clientHeight) return t;
				t = t.parentElement;
			}
			return window;
		}
		function j() {
			let e = n.value;
			if (!e || !wt || !S) return;
			let t = S, i = D(t), a = i ? 0 : t.getBoundingClientRect().top, o = i ? window.innerHeight : t.clientHeight, s = i ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop, c = e.getBoundingClientRect(), l = c.top - a + s, u = l - o, d = l + c.height - o, f = Math.max(1, d - u);
			r.value = Ot((s - u) / f, 0, 1);
		}
		function M() {
			w || (w = requestAnimationFrame(() => {
				w = 0, j();
			}));
		}
		function P() {
			wt && (I(), S = k(n.value), S.addEventListener("scroll", M, { passive: !0 }), window.addEventListener("resize", M), j());
		}
		function I() {
			wt && (S && S.removeEventListener("scroll", M), window.removeEventListener("resize", M), w && (cancelAnimationFrame(w), w = 0));
		}
		O(() => {
			b(), x(), t.progress && P();
		}), E(() => {
			I(), y?.disconnect(), y = null, m && clearTimeout(m), p = null;
		}), G(() => t.anchors, (e) => {
			e && b();
		}), G(() => t.progress, (e) => {
			e ? P() : I();
		});
		let L = i(() => ({ transform: `scaleX(${r.value})` })), R = i(() => Z("mc-prose", "mc-grain-overlay", `mc-prose--size-${t.size}`, `mc-prose--width-${t.width}`, `mc-prose--theme-${t.theme}`, {
			"mc-prose--drop-cap": t.dropCap,
			"mc-prose--anchors": t.anchors,
			"mc-prose--progress": t.progress,
			"mc-prose--serif": t.serif
		}, t.customClass));
		return (t, r) => (A(), c("div", {
			ref_key: "root",
			ref: n,
			class: C(R.value)
		}, [
			e.progress ? (A(), c("span", Py, [l("span", {
				class: "mc-prose__progress-bar",
				style: T(L.value)
			}, null, 4)])) : s("", !0),
			r[0] || (r[0] = l("span", {
				class: "mc-prose__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			F(t.$slots, "default", {}, void 0, !0)
		], 2));
	}
}), [["__scopeId", "data-v-d593119d"]]);
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/typeof.js
function Ry(e) {
	"@babel/helpers - typeof";
	return Ry = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Ry(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPrimitive.js
function zy(e, t) {
	if (Ry(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Ry(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPropertyKey.js
function By(e) {
	var t = zy(e, "string");
	return Ry(t) == "symbol" ? t : t + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/defineProperty.js
function Vy(e, t, n) {
	return (t = By(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
//#endregion
//#region src/components/qr-code/qr.ts
var Hy = {
	L: 1,
	M: 0,
	Q: 3,
	H: 2
}, Uy = {
	L: [
		-1,
		7,
		10,
		15,
		20,
		26,
		18,
		20,
		24,
		30,
		18
	],
	M: [
		-1,
		10,
		16,
		26,
		18,
		24,
		16,
		18,
		22,
		22,
		26
	],
	Q: [
		-1,
		13,
		22,
		18,
		26,
		18,
		24,
		18,
		22,
		20,
		24
	],
	H: [
		-1,
		17,
		28,
		22,
		16,
		22,
		28,
		26,
		26,
		24,
		28
	]
}, Wy = {
	L: [
		-1,
		1,
		1,
		1,
		1,
		1,
		2,
		2,
		2,
		2,
		4
	],
	M: [
		-1,
		1,
		1,
		1,
		2,
		2,
		4,
		4,
		4,
		5,
		5
	],
	Q: [
		-1,
		1,
		1,
		2,
		2,
		4,
		4,
		6,
		6,
		8,
		8
	],
	H: [
		-1,
		1,
		1,
		2,
		4,
		4,
		4,
		5,
		6,
		8,
		8
	]
};
function Gy(e, t) {
	let n = 0;
	for (let r = 7; r >= 0; r--) n = n << 1 ^ (n >>> 7) * 285, n ^= (t >>> r & 1) * e;
	return n & 255;
}
function Ky(e) {
	let t = Array(e).fill(0);
	t[e - 1] = 1;
	let n = 1;
	for (let r = 0; r < e; r++) {
		for (let e = 0; e < t.length; e++) t[e] = Gy(t[e], n), e + 1 < t.length && (t[e] ^= t[e + 1]);
		n = Gy(n, 2);
	}
	return t;
}
function qy(e, t) {
	let n = t.map(() => 0);
	for (let r of e) {
		let e = r ^ n.shift();
		n.push(0);
		for (let r = 0; r < t.length; r++) n[r] ^= Gy(t[r], e);
	}
	return n;
}
function Jy(e) {
	let t = (16 * e + 128) * e + 64;
	if (e >= 2) {
		let n = Math.floor(e / 7) + 2;
		t -= (25 * n - 10) * n - 55, e >= 7 && (t -= 36);
	}
	return t;
}
function Yy(e, t) {
	return Math.floor(Jy(e) / 8) - Uy[t][e] * Wy[t][e];
}
function Xy(e) {
	if (e === 1) return [];
	let t = Math.floor(e / 7) + 2, n = e === 32 ? 26 : Math.floor((e * 4 + t * 2 + 1) / (t * 2 - 2)) * 2, r = Array(t).fill(0);
	r[0] = 6;
	let i = e * 4 + 10;
	for (let e = r.length - 1; e >= 1; e--, i -= n) r[e] = i;
	return r;
}
function Zy(e) {
	let t = [];
	for (let n of e) {
		let e = n.codePointAt(0);
		e < 128 ? t.push(e) : e < 2048 ? t.push(192 | e >> 6, 128 | e & 63) : e < 65536 ? t.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : t.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63);
	}
	return t;
}
var Qy = class {
	constructor() {
		Vy(this, "bits", []);
	}
	append(e, t) {
		for (let n = t - 1; n >= 0; n--) this.bits.push(e >>> n & 1);
	}
	get length() {
		return this.bits.length;
	}
};
function $y(e, t, n) {
	let r = Zy(e), i = Yy(t, n) * 8, a = new Qy();
	a.append(4, 4), a.append(r.length, t <= 9 ? 8 : 16);
	for (let e of r) a.append(e, 8);
	for (a.append(0, Math.min(4, i - a.length)); a.length % 8 != 0;) a.append(0, 1);
	let o = 0;
	for (; a.length < i;) a.append(o % 2 == 0 ? 236 : 17, 8), o++;
	let s = [];
	for (let e = 0; e < a.bits.length; e += 8) {
		let t = 0;
		for (let n = 0; n < 8; n++) t = t << 1 | a.bits[e + n];
		s.push(t);
	}
	return s;
}
function eb(e, t, n) {
	let r = Wy[n][t], i = Uy[n][t], a = Math.floor(Jy(t) / 8), o = r - a % r, s = Math.floor(a / r), c = Ky(i), l = [], u = 0;
	for (let t = 0; t < r; t++) {
		let n = s - i + (t < o ? 0 : 1), r = e.slice(u, u + n);
		u += n;
		let a = qy(r, c), d = r.slice();
		t < o && d.push(0), l.push(d.concat(a));
	}
	let d = [];
	for (let e = 0; e < l[0].length; e++) for (let t = 0; t < l.length; t++) (e !== s - i || t >= o) && d.push(l[t][e]);
	return d;
}
var tb = class {
	constructor(e) {
		Vy(this, "size", void 0), Vy(this, "modules", void 0), Vy(this, "isFunction", void 0), this.size = e, this.modules = Array.from({ length: e }, () => Array(e).fill(!1)), this.isFunction = Array.from({ length: e }, () => Array(e).fill(!1));
	}
	get(e, t) {
		return this.modules[t][e];
	}
	setFunction(e, t, n) {
		e < 0 || t < 0 || e >= this.size || t >= this.size || (this.modules[t][e] = n, this.isFunction[t][e] = !0);
	}
	setData(e, t, n) {
		this.modules[t][e] = n;
	}
};
function nb(e, t, n) {
	for (let r = -4; r <= 4; r++) for (let i = -4; i <= 4; i++) {
		let a = Math.max(Math.abs(i), Math.abs(r));
		e.setFunction(t + i, n + r, a !== 2 && a !== 4);
	}
}
function rb(e, t, n) {
	for (let r = -2; r <= 2; r++) for (let i = -2; i <= 2; i++) e.setFunction(t + i, n + r, Math.max(Math.abs(i), Math.abs(r)) !== 1);
}
function ib(e, t, n) {
	let r = Hy[t] << 3 | n, i = r;
	for (let e = 0; e < 10; e++) i = i << 1 ^ (i >>> 9) * 1335;
	let a = (r << 10 | i) ^ 21522, o = (e) => !!(a >>> e & 1);
	for (let t = 0; t <= 5; t++) e.setFunction(8, t, o(t));
	e.setFunction(8, 7, o(6)), e.setFunction(8, 8, o(7)), e.setFunction(7, 8, o(8));
	for (let t = 9; t < 15; t++) e.setFunction(14 - t, 8, o(t));
	for (let t = 0; t < 8; t++) e.setFunction(e.size - 1 - t, 8, o(t));
	for (let t = 8; t < 15; t++) e.setFunction(8, e.size - 15 + t, o(t));
	e.setFunction(8, e.size - 8, !0);
}
function ab(e, t) {
	if (t < 7) return;
	let n = t;
	for (let e = 0; e < 12; e++) n = n << 1 ^ (n >>> 11) * 7973;
	let r = t << 12 | n, i = (e) => !!(r >>> e & 1);
	for (let t = 0; t < 18; t++) {
		let n = i(t), r = e.size - 11 + t % 3, a = Math.floor(t / 3);
		e.setFunction(r, a, n), e.setFunction(a, r, n);
	}
}
function ob(e, t, n) {
	let r = e.size;
	for (let t = 0; t < r; t++) e.setFunction(6, t, t % 2 == 0), e.setFunction(t, 6, t % 2 == 0);
	nb(e, 3, 3), nb(e, r - 4, 3), nb(e, 3, r - 4);
	let i = Xy(t), a = i.length;
	for (let t = 0; t < a; t++) for (let n = 0; n < a; n++) t === 0 && n === 0 || t === 0 && n === a - 1 || t === a - 1 && n === 0 || rb(e, i[t], i[n]);
	ib(e, n, 0), ab(e, t);
}
function sb(e, t) {
	let n = 0, r = e.size;
	for (let i = r - 1; i >= 1; i -= 2) {
		i === 6 && (i = 5);
		for (let a = 0; a < r; a++) for (let o = 0; o < 2; o++) {
			let s = i - o, c = i + 1 & 2 ? a : r - 1 - a;
			!e.isFunction[c][s] && n < t.length * 8 && (e.setData(s, c, !!(t[n >>> 3] >>> 7 - (n & 7) & 1)), n++);
		}
	}
}
function cb(e, t) {
	for (let n = 0; n < e.size; n++) for (let r = 0; r < e.size; r++) {
		let i;
		switch (t) {
			case 0:
				i = (r + n) % 2 == 0;
				break;
			case 1:
				i = n % 2 == 0;
				break;
			case 2:
				i = r % 3 == 0;
				break;
			case 3:
				i = (r + n) % 3 == 0;
				break;
			case 4:
				i = (Math.floor(r / 3) + Math.floor(n / 2)) % 2 == 0;
				break;
			case 5:
				i = r * n % 2 + r * n % 3 == 0;
				break;
			case 6:
				i = (r * n % 2 + r * n % 3) % 2 == 0;
				break;
			default: i = ((r + n) % 2 + r * n % 3) % 2 == 0;
		}
		!e.isFunction[n][r] && i && (e.modules[n][r] = !e.modules[n][r]);
	}
}
var lb = 3, ub = 3, db = 40, fb = 10;
function pb(e) {
	let t = e[1], n = t > 0 && e[2] === t && e[3] === t * 3 && e[4] === t && e[5] === t;
	return (n && e[0] >= t * 4 && e[6] >= t ? 1 : 0) + (n && e[6] >= t * 4 && e[0] >= t ? 1 : 0);
}
function mb(e, t, n, r) {
	let i = e, a = t;
	return i && (n.unshift(a), n.pop(), a = 0), a += r, n.unshift(a), n.pop(), pb(n);
}
function hb(e, t, n) {
	let r = e;
	t[0] === 0 && (r += n), t.unshift(r), t.pop();
}
function gb(e) {
	let t = e.size, n = 0;
	for (let r = 0; r < t; r++) {
		let i = !1, a = 0, o = [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		];
		for (let s = 0; s < t; s++) {
			let c = e.get(s, r);
			c === i ? (a++, a === 5 ? n += lb : a > 5 && n++) : (hb(a, o, t), i || (n += pb(o) * db), i = c, a = 1);
		}
		n += mb(i, a, o, t) * db;
	}
	for (let r = 0; r < t; r++) {
		let i = !1, a = 0, o = [
			0,
			0,
			0,
			0,
			0,
			0,
			0
		];
		for (let s = 0; s < t; s++) {
			let c = e.get(r, s);
			c === i ? (a++, a === 5 ? n += lb : a > 5 && n++) : (hb(a, o, t), i || (n += pb(o) * db), i = c, a = 1);
		}
		n += mb(i, a, o, t) * db;
	}
	for (let r = 0; r < t - 1; r++) for (let i = 0; i < t - 1; i++) {
		let t = e.get(i, r);
		t === e.get(i + 1, r) && t === e.get(i, r + 1) && t === e.get(i + 1, r + 1) && (n += ub);
	}
	let r = 0;
	for (let n = 0; n < t; n++) for (let i = 0; i < t; i++) e.get(i, n) && r++;
	let i = t * t, a = Math.ceil(Math.abs(r * 20 - i * 10) / i) - 1;
	return n += a * fb, n;
}
function _b(e, t) {
	let n = Zy(e).length;
	for (let e = 1; e <= 10; e++) {
		let r = Yy(e, t);
		if (Math.ceil((4 + (e <= 9 ? 8 : 16) + n * 8) / 8) <= r) return e;
	}
	throw Error(`[mochi-ui] QRCode: payload is too large — versions 1-10 hold at most ${Yy(10, t) - 3} bytes at level ${t}.`);
}
function vb(e, t = "M") {
	let n = e ?? "", r = _b(n, t), i = r * 4 + 17, a = eb($y(n, r, t), r, t), o = 0, s = Infinity;
	for (let e = 0; e < 8; e++) {
		let n = new tb(i);
		ob(n, r, t), sb(n, a), ib(n, t, e), cb(n, e);
		let c = gb(n);
		c < s && (s = c, o = e);
	}
	let c = new tb(i);
	return ob(c, r, t), sb(c, a), ib(c, t, o), cb(c, o), {
		size: i,
		modules: c.modules,
		version: r,
		ecc: t,
		mask: o
	};
}
function yb(e) {
	let t = [];
	for (let n = 0; n < e.size; n++) {
		let r = 0;
		for (; r < e.size;) {
			if (!e.modules[n][r]) {
				r++;
				continue;
			}
			let i = 1;
			for (; r + i < e.size && e.modules[n][r + i];) i++;
			t.push(`M${r} ${n}h${i}v1h-${i}z`), r += i;
		}
	}
	return t.join("");
}
//#endregion
//#region src/components/qr-code/QRCode.vue?vue&type=script&setup=true&lang.ts
var bb = ["aria-label"], xb = ["viewBox"], Sb = [
	"width",
	"height",
	"fill"
], Cb = ["transform"], wb = ["d", "fill"], Tb = { key: 0 }, Eb = ["fill"], Db = ["href"], Ob = {
	key: 1,
	class: "mc-qr-code__error"
}, kb = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiQRCode",
	__name: "QRCode",
	props: {
		value: {},
		size: { default: 160 },
		level: { default: "M" },
		margin: { default: 2 },
		color: { default: "currentColor" },
		backgroundColor: { default: "transparent" },
		logo: {},
		label: {},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => {
			try {
				return {
					qr: vb(t.value ?? "", t.level),
					error: null
				};
			} catch (e) {
				return {
					qr: null,
					error: e instanceof Error ? e.message : "Unable to encode QR code"
				};
			}
		}), r = i(() => n.value.qr ? yb(n.value.qr) : ""), a = i(() => n.value.qr ? n.value.qr.size + t.margin * 2 : 0), o = i(() => Math.max(0, a.value * .2)), u = i(() => {
			if (!n.value.qr) return {};
			let e = o.value, t = (a.value - e) / 2;
			return {
				x: `${t}`,
				y: `${t}`,
				width: `${e}`,
				height: `${e}`
			};
		}), d = i(() => {
			if (!n.value.qr) return {};
			let e = o.value * 1.24, t = (a.value - e) / 2;
			return {
				x: `${t}`,
				y: `${t}`,
				width: `${e}`,
				height: `${e}`,
				rx: `${e * .18}`
			};
		}), f = i(() => t.backgroundColor === "transparent" ? "var(--mc-surface)" : t.backgroundColor), p = i(() => Z("mc-qr-code", { "is-error": !!n.value.error }, t.customClass));
		return (t, i) => (A(), c("div", {
			class: C(p.value),
			style: T({
				width: `${e.size}px`,
				height: `${e.size}px`
			}),
			role: "img",
			"aria-label": n.value.error ? n.value.error : e.label || e.value || "QR code"
		}, [i[0] || (i[0] = l("span", {
			class: "mc-qr-code__halo",
			"aria-hidden": "true"
		}, null, -1)), l("span", {
			class: "mc-qr-code__plate mc-sheen-sweep",
			style: T({ "--mc-plate-bg": f.value })
		}, [n.value.qr ? (A(), c("svg", {
			key: 0,
			class: "mc-qr-code__svg",
			viewBox: `0 0 ${a.value} ${a.value}`,
			width: "100%",
			height: "100%",
			focusable: "false"
		}, [
			l("rect", {
				class: "mc-qr-code__bg",
				x: "0",
				y: "0",
				width: a.value,
				height: a.value,
				fill: e.backgroundColor
			}, null, 8, Sb),
			l("g", { transform: `translate(${e.margin}, ${e.margin})` }, [l("path", {
				d: r.value,
				fill: e.color
			}, null, 8, wb)], 8, Cb),
			e.logo ? (A(), c("g", Tb, [l("rect", {
				style: T(d.value),
				fill: f.value
			}, null, 12, Eb), l("image", {
				href: e.logo,
				style: T(u.value),
				preserveAspectRatio: "xMidYMid meet"
			}, null, 12, Db)])) : s("", !0)
		], 8, xb)) : (A(), c("span", Ob, R(n.value.error), 1))], 4)], 14, bb));
	}
}), [["__scopeId", "data-v-c9d61e2a"]]), Ab = Symbol("mochi-radio-group"), jb = [
	"name",
	"value",
	"checked",
	"disabled",
	"aria-checked",
	"aria-disabled"
], Mb = {
	key: 0,
	class: "mc-radio__label"
}, Nb = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiRadio",
	inheritAttrs: !1,
	__name: "Radio",
	props: {
		value: {},
		label: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		},
		size: {},
		name: {},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = V(), o = i(() => {
			let { class: e, style: t, ...n } = a;
			return n;
		}), u = v(Ab, null), f = N(!1), p = i(() => u ? u.modelValue.value === n.value : f.value), m = i(() => n.disabled || (u ? u.disabled.value : !1)), h = i(() => n.size ?? u?.size.value ?? "medium"), g = i(() => n.name ?? u?.name ?? "mc-radio");
		function _() {
			m.value || (u ? u.select(n.value) : (f.value = !0, r("update:modelValue", n.value), r("change", n.value)));
		}
		let y = i(() => Z("mc-radio", `mc-radio--${h.value}`, {
			"is-checked": p.value,
			"is-disabled": m.value
		})), b = i(() => Z(y.value, a.class, n.customClass)), S = i(() => a.style);
		return (t, n) => (A(), c("label", {
			class: C(b.value),
			style: T(S.value)
		}, [
			l("input", x(o.value, {
				class: "mc-radio__input mc-visually-hidden",
				type: "radio",
				role: "radio",
				name: g.value,
				value: e.value,
				checked: p.value,
				disabled: m.value,
				"aria-checked": p.value,
				"aria-disabled": m.value || void 0,
				onChange: _
			}), null, 16, jb),
			n[0] || (n[0] = l("span", {
				class: "mc-radio__circle mc-sheen-sweep",
				"aria-hidden": "true"
			}, [l("span", { class: "mc-radio__grain mc-grain-overlay" }), l("span", { class: "mc-radio__dot" })], -1)),
			n[1] || (n[1] = l("span", {
				class: "mc-radio__halo",
				"aria-hidden": "true"
			}, null, -1)),
			e.label || t.$slots.default ? (A(), c("span", Mb, [F(t.$slots, "default", {}, () => [d(R(e.label), 1)], !0)])) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-187931b9"]]), Pb = ["aria-orientation", "aria-disabled"], Fb = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiRadioGroup",
	inheritAttrs: !1,
	__name: "RadioGroup",
	props: {
		modelValue: {},
		options: { default: () => [] },
		direction: { default: "horizontal" },
		size: { default: "medium" },
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, s = V(), u = N(null), d = N(r.modelValue);
		G(() => r.modelValue, (e) => {
			d.value = e;
		});
		let f = i(() => r.size), p = i(() => r.disabled), m = r.name ?? `mc-radio-${Fi("group")}`;
		function h(e) {
			d.value !== e && (d.value = e, a("update:modelValue", e), a("change", e));
		}
		function g(e) {
			if (r.disabled) return;
			let t = e.key === "ArrowRight" || e.key === "ArrowDown", n = e.key === "ArrowLeft" || e.key === "ArrowUp";
			if (!t && !n) return;
			let i = Array.from(u.value?.querySelectorAll("input[type=\"radio\"]") ?? []).filter((e) => e.name === m), a = i.find((e) => e === document.activeElement);
			if (!a) return;
			e.preventDefault();
			let o = i[(i.indexOf(a) + (t ? 1 : -1) + i.length) % i.length];
			o && !o.disabled && (o.focus(), o.click());
		}
		j(Ab, {
			modelValue: d,
			size: f,
			disabled: p,
			name: m,
			select: h
		});
		let _ = i(() => Z("mc-radio-group", `mc-radio-group--${r.direction}`, `mc-radio-group--${r.size}`, { "is-disabled": r.disabled })), v = i(() => Z(_.value, s.class, r.customClass)), y = i(() => s.style);
		return (n, r) => (A(), c("div", {
			ref_key: "root",
			ref: u,
			class: C(v.value),
			style: T(y.value),
			role: "radiogroup",
			"aria-orientation": t.direction,
			"aria-disabled": t.disabled || void 0,
			onKeydown: g
		}, [
			r[0] || (r[0] = l("span", {
				class: "mc-radio-group__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-radio-group__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			F(n.$slots, "default", {}, () => [(A(!0), c(e, null, P(t.options, (e, t) => (A(), o(Nb, {
				key: `${String(e.value)}-${t}`,
				value: e.value,
				label: e.label,
				disabled: e.disabled
			}, null, 8, [
				"value",
				"label",
				"disabled"
			]))), 128))], !0)
		], 46, Pb));
	}
}), [["__scopeId", "data-v-ef5e0aa4"]]), Ib = ["aria-disabled"], Lb = {
	class: "mc-rate__glyphs",
	"aria-hidden": "true"
}, Rb = {
	viewBox: "0 0 24 24",
	class: "mc-rate__glyph mc-rate__glyph--empty"
}, zb = ["d"], Bb = ["d"], Vb = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], Hb = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], Ub = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], Wb = "m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9Z", Gb = "M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z", Kb = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiRate",
	inheritAttrs: !1,
	__name: "Rate",
	props: {
		modelValue: { default: 0 },
		max: { default: 5 },
		allowHalf: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		color: { default: "default" },
		variant: { default: "star" },
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = V(), u = N(null), d = N(null), f = N(!1), p = N(r.modelValue > 0 ? r.modelValue : 1), m, h = i(() => d.value ?? r.modelValue ?? 0), g = i(() => r.variant === "heart" ? Gb : Wb);
		G(() => r.modelValue, (e) => {
			f.value = !1, m && clearTimeout(m), m = setTimeout(() => {
				f.value = !0, m = setTimeout(() => {
					f.value = !1;
				}, 420);
			}, 20), e > 0 && (p.value = e);
		}), E(() => {
			m && clearTimeout(m);
		});
		function _(e) {
			let t = h.value;
			return t >= e ? "full" : r.allowHalf && t >= e - .5 ? "half" : "empty";
		}
		function v(e) {
			return e === "half" ? { clipPath: "inset(0 50% 0 0)" } : {};
		}
		function y(e) {
			r.readonly || (p.value = e, a("update:modelValue", e), a("change", e));
		}
		function b(e) {
			r.readonly || (d.value = e);
		}
		function x() {
			d.value = null;
		}
		function S(e) {
			return !r.readonly && e === p.value;
		}
		function w(e) {
			if (r.readonly) return;
			let t = r.allowHalf ? .5 : 1, n;
			if (e.key === "ArrowRight" || e.key === "ArrowUp") n = (r.modelValue ?? 0) + t;
			else if (e.key === "ArrowLeft" || e.key === "ArrowDown") n = (r.modelValue ?? 0) - t;
			else if (e.key === "Home") n = r.allowHalf ? .5 : 1;
			else if (e.key === "End") n = r.max;
			else return;
			e.preventDefault();
			let i = Math.min(Math.max(n, 0), r.max);
			p.value = i, i !== (r.modelValue ?? 0) && y(i), u.value?.querySelector(`[data-value="${i}"]`)?.focus();
		}
		let D = i(() => Z("mc-rate", `mc-rate--${r.size}`, `mc-rate--${r.color}`, `mc-rate--${r.variant}`, {
			"is-readonly": r.readonly,
			"is-pulse": f.value,
			"is-half": r.allowHalf
		})), O = i(() => Z(D.value, o.class, r.customClass)), k = i(() => o.style);
		return (n, r) => (A(), c("div", {
			ref_key: "root",
			ref: u,
			class: C(O.value),
			style: T(k.value),
			role: "radiogroup",
			"aria-orientation": "horizontal",
			"aria-disabled": t.readonly || void 0,
			onMouseleave: x,
			onKeydown: w
		}, [
			r[0] || (r[0] = l("span", {
				class: "mc-rate__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-rate__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			(A(!0), c(e, null, P(t.max, (n) => (A(), c("span", {
				key: n,
				class: C(["mc-rate__item", {
					"is-full": _(n) === "full",
					"is-half": _(n) === "half",
					"is-active": _(n) !== "empty"
				}])
			}, [l("span", Lb, [(A(), c("svg", Rb, [l("path", { d: g.value }, null, 8, zb)])), _(n) === "empty" ? s("", !0) : (A(), c("svg", {
				key: 0,
				viewBox: "0 0 24 24",
				class: "mc-rate__glyph mc-rate__glyph--fill",
				style: T(v(_(n)))
			}, [l("path", { d: g.value }, null, 8, Bb)], 4))]), t.allowHalf ? (A(), c(e, { key: 0 }, [l("button", {
				type: "button",
				class: "mc-rate__hit is-left",
				role: "radio",
				"aria-checked": t.modelValue === n - .5,
				"aria-label": `${n - .5}`,
				"aria-disabled": t.readonly || void 0,
				"data-value": n - .5,
				tabindex: S(n - .5) ? 0 : -1,
				disabled: t.readonly,
				onClick: (e) => y(n - .5),
				onMouseenter: (e) => b(n - .5)
			}, null, 40, Vb), l("button", {
				type: "button",
				class: "mc-rate__hit is-right",
				role: "radio",
				"aria-checked": t.modelValue === n,
				"aria-label": `${n}`,
				"aria-disabled": t.readonly || void 0,
				"data-value": n,
				tabindex: S(n) ? 0 : -1,
				disabled: t.readonly,
				onClick: (e) => y(n),
				onMouseenter: (e) => b(n)
			}, null, 40, Hb)], 64)) : (A(), c("button", {
				key: 1,
				type: "button",
				class: "mc-rate__hit",
				role: "radio",
				"aria-checked": t.modelValue === n,
				"aria-label": `${n}`,
				"aria-disabled": t.readonly || void 0,
				"data-value": n,
				tabindex: S(n) ? 0 : -1,
				disabled: t.readonly,
				onClick: (e) => y(n),
				onMouseenter: (e) => b(n)
			}, null, 40, Ub))], 2))), 128))
		], 46, Ib));
	}
}), [["__scopeId", "data-v-dc5921b7"]]), qb = ["aria-live"], Jb = {
	class: "mc-result__emblem",
	"aria-hidden": "true"
}, Yb = { class: "mc-result__disc" }, Xb = {
	key: 0,
	class: "mc-result__code",
	"data-mc-type": "readout"
}, Zb = {
	key: 0,
	class: "mc-result__title",
	"data-mc-type": "title"
}, Qb = {
	key: 1,
	class: "mc-result__subtitle"
}, $b = {
	key: 2,
	class: "mc-result__extra"
}, ex = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiResult",
	__name: "Result",
	props: {
		status: { default: "success" },
		title: {},
		subtitle: {},
		icon: {},
		live: { default: "off" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = {
			success: "circle-check",
			error: "circle-x",
			warning: "alert-triangle",
			info: "info",
			404: "search",
			403: "lock",
			500: "alert-circle"
		}, r = i(() => t.status === "404" || t.status === "403" || t.status === "500"), a = i(() => t.icon ?? n[t.status]), u = i(() => Z("mc-result", "mc-grain-overlay", `mc-result--${t.status}`, t.customClass));
		return (t, n) => (A(), c("section", {
			class: C(u.value),
			role: "status",
			"aria-live": e.live
		}, [
			l("div", Jb, [
				n[0] || (n[0] = l("span", { class: "mc-result__halo" }, null, -1)),
				n[1] || (n[1] = l("span", { class: "mc-result__lens" }, null, -1)),
				l("span", Yb, [r.value ? (A(), c("span", Xb, R(e.status), 1)) : (A(), o($, {
					key: 1,
					name: a.value,
					size: 46,
					"stroke-width": 1.6
				}, null, 8, ["name"]))])
			]),
			e.title || t.$slots.title ? (A(), c("h2", Zb, [F(t.$slots, "title", {}, () => [d(R(e.title), 1)], !0)])) : s("", !0),
			e.subtitle || t.$slots.subtitle ? (A(), c("p", Qb, [F(t.$slots, "subtitle", {}, () => [d(R(e.subtitle), 1)], !0)])) : s("", !0),
			t.$slots.extra ? (A(), c("div", $b, [F(t.$slots, "extra", {}, void 0, !0)])) : s("", !0)
		], 10, qb));
	}
}), [["__scopeId", "data-v-fd687a57"]]), tx = ["aria-label"], nx = ["disabled", "aria-label"], rx = [
	"aria-label",
	"aria-valuemax",
	"aria-valuenow"
], ix = ["disabled", "aria-label"], ax = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiScrollbar",
	__name: "Scrollbar",
	props: {
		height: { default: 320 },
		maxHeight: {},
		size: { default: 10 },
		minSize: { default: 28 },
		step: { default: 48 },
		label: { default: "Scrollable region" },
		customClass: {}
	},
	setup(e) {
		let t = e, n = Zt(), r = N(null), a = N(null), o = N(null), s = N(null), u = N(!1), d = N(0), p = N(0), m = N(0), h = N(0), g = N(!1);
		function _(e) {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}
		function v() {
			let e = r.value;
			e && (d.value = e.scrollTop, p.value = e.clientHeight, m.value = e.scrollHeight, h.value = s.value?.clientHeight ?? 0);
		}
		function y() {
			d.value = r.value?.scrollTop ?? 0;
		}
		let b = i(() => !m.value || !p.value ? 0 : Math.min(1, p.value / m.value)), x = i(() => h.value > 0 ? h.value : p.value), S = i(() => {
			let e = Math.max(t.minSize, Math.round(p.value * b.value));
			return Math.min(e, Math.max(0, x.value));
		}), w = i(() => {
			let e = Math.max(0, x.value - S.value), t = Math.max(1, m.value - p.value), n = d.value / t * e;
			return {
				height: `${S.value}px`,
				transform: `translateY(${n}px)`
			};
		}), D = i(() => m.value > p.value + 1);
		function k(e) {
			let t = r.value;
			t && t.scrollBy({
				top: e,
				behavior: "smooth"
			});
		}
		let j = 0, M = 0;
		function P(e) {
			let t = r.value;
			if (t) {
				e.preventDefault(), e.stopPropagation(), g.value = !0, j = e.clientY, M = t.scrollTop;
				try {
					e.currentTarget.setPointerCapture?.(e.pointerId);
				} catch {}
				window.addEventListener("pointermove", I), window.addEventListener("pointerup", L);
			}
		}
		function I(e) {
			let t = r.value;
			if (!t || !g.value) return;
			let n = Math.max(0, x.value - S.value), i = Math.max(1, m.value - p.value);
			if (!n) return;
			let a = (e.clientY - j) / n * i;
			t.scrollTop = M + a;
		}
		function L() {
			g.value = !1, window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", L);
		}
		function R(e) {
			let n = r.value;
			n && (e.key === "ArrowDown" || e.key === "ArrowRight" ? (e.preventDefault(), n.scrollBy({
				top: t.step,
				behavior: "smooth"
			})) : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (e.preventDefault(), n.scrollBy({
				top: -t.step,
				behavior: "smooth"
			})) : e.key === "Home" ? (e.preventDefault(), n.scrollTo({
				top: 0,
				behavior: "smooth"
			})) : e.key === "End" && (e.preventDefault(), n.scrollTo({
				top: m.value,
				behavior: "smooth"
			})));
		}
		let z = null;
		O(() => {
			if (v(), typeof ResizeObserver < "u" && r.value) {
				z = new ResizeObserver(() => v()), z.observe(r.value);
				let e = r.value.firstElementChild;
				e && z.observe(e);
			}
		}), E(() => {
			z?.disconnect(), z = null, wt && (window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", L));
		});
		let V = i(() => ({
			height: _(t.height),
			maxHeight: _(t.maxHeight)
		})), H = i(() => Z("mc-scrollbar", {
			"is-hovered": u.value,
			"is-dragging": g.value,
			"has-overflow": D.value
		}, t.customClass));
		return (t, i) => (A(), c("div", {
			class: C(H.value),
			style: T(V.value),
			onMouseenter: i[2] || (i[2] = (e) => u.value = !0),
			onMouseleave: i[3] || (i[3] = (e) => u.value = !1)
		}, [l("div", {
			ref_key: "viewport",
			ref: r,
			class: "mc-scrollbar__viewport",
			tabindex: "0",
			role: "region",
			"aria-label": e.label,
			onScroll: y
		}, [F(t.$slots, "default", {}, void 0, !0)], 40, tx), l("div", {
			ref_key: "track",
			ref: a,
			class: "mc-scrollbar__track",
			style: T({ width: `${e.size}px` })
		}, [
			l("button", {
				type: "button",
				class: "mc-scrollbar__arrow mc-scrollbar__arrow--up mc-sheen-sweep",
				tabindex: "-1",
				disabled: !D.value || d.value <= 0,
				"aria-label": B(n).scrollbar?.up ?? "Scroll up",
				onClick: i[0] || (i[0] = (t) => k(-e.step))
			}, [f($, {
				name: "chevron-up",
				size: 12,
				"stroke-width": 2.4
			})], 8, nx),
			l("div", {
				ref_key: "thumbArea",
				ref: s,
				class: "mc-scrollbar__thumb-area"
			}, [l("div", {
				ref_key: "thumb",
				ref: o,
				class: "mc-scrollbar__thumb",
				role: "slider",
				tabindex: "0",
				"aria-label": B(n).scrollbar?.position ?? "Scroll position",
				"aria-orientation": "vertical",
				"aria-valuemin": 0,
				"aria-valuemax": Math.max(0, m.value - p.value),
				"aria-valuenow": Math.round(d.value),
				style: T(w.value),
				onPointerdown: P,
				onKeydown: R
			}, [...i[4] || (i[4] = [l("span", {
				class: "mc-scrollbar__thumb-fill mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)])], 44, rx)], 512),
			l("button", {
				type: "button",
				class: "mc-scrollbar__arrow mc-scrollbar__arrow--down mc-sheen-sweep",
				tabindex: "-1",
				disabled: !D.value || d.value >= m.value - p.value,
				"aria-label": B(n).scrollbar?.down ?? "Scroll down",
				onClick: i[1] || (i[1] = (t) => k(e.step))
			}, [f($, {
				name: "chevron-down",
				size: 12,
				"stroke-width": 2.4
			})], 8, ix)
		], 4)], 38));
	}
}), [["__scopeId", "data-v-8609be9d"]]), ox = [
	"role",
	"aria-multiselectable",
	"aria-orientation",
	"aria-disabled"
], sx = [
	"role",
	"aria-checked",
	"aria-disabled",
	"disabled",
	"tabindex",
	"onClick",
	"onFocus"
], cx = { class: "mc-segmented__content" }, lx = { class: "mc-segmented__label" }, ux = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSegmented",
	__name: "Segmented",
	props: {
		modelValue: {},
		options: { default: () => [] },
		multiple: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		variant: { default: "soft" },
		color: { default: "default" },
		block: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = N(null), d = [];
		function f(e, t) {
			d[e] = Tt(t) ? t : null;
		}
		let p = N(r.modelValue);
		G(() => r.modelValue, (e) => {
			p.value = e;
		});
		let m = i(() => {
			let e = p.value;
			return e == null ? [] : r.multiple ? Array.isArray(e) ? e.slice() : [e] : Array.isArray(e) ? e.slice(0, 1) : [e];
		});
		function h(e) {
			return m.value.indexOf(e) !== -1;
		}
		function g(e) {
			return r.disabled || !!e.disabled;
		}
		let _ = N(0);
		function v(e) {
			_.value = e;
		}
		function y(e, t) {
			if (!g(e)) {
				if (_.value = t, r.multiple) {
					let t = h(e.value) ? m.value.filter((t) => t !== e.value) : [...m.value, e.value];
					p.value = t, a("update:modelValue", t), a("change", t);
				} else h(e.value) || (p.value = e.value, a("update:modelValue", e.value), a("change", e.value));
			}
		}
		function b(e, t) {
			let n = r.options, i = n.length;
			for (let r = 1; r <= i; r++) {
				let a = ((e + t * r) % i + i) % i, o = n[a];
				if (o && !g(o)) return a;
			}
			return -1;
		}
		function x(e) {
			let t = d[e];
			t && t.focus();
		}
		function w(e) {
			if (r.disabled) return;
			let t = r.options;
			if (!t.length) return;
			let n = e.key === "ArrowRight" || e.key === "ArrowDown", i = e.key === "ArrowLeft" || e.key === "ArrowUp";
			if (!n && !i && e.key !== "Home" && e.key !== "End") return;
			e.preventDefault();
			let a = -1;
			if (a = n ? b(_.value, 1) : i ? b(_.value, -1) : e.key === "Home" ? b(-1, 1) : b(t.length, -1), !(a < 0) && (_.value = a, x(a), !r.multiple)) {
				let e = t[a];
				e && !h(e.value) && y(e, a);
			}
		}
		let D = i(() => {
			let e = r.options;
			if (!r.multiple) {
				let t = e.findIndex((e) => h(e.value));
				return t >= 0 ? [{
					key: "single",
					index: t
				}] : [];
			}
			return e.map((e, t) => ({
				option: e,
				index: t
			})).filter(({ option: e }) => h(e.value)).map(({ option: e, index: t }) => ({
				key: `multi-${String(e.value)}-${t}`,
				index: t
			}));
		}), k = N({}), j = N(!1), M = 0;
		function F() {
			let e = {};
			for (let t of D.value) {
				let n = d[t.index];
				e[t.key] = n ? {
					left: n.offsetLeft,
					top: n.offsetTop,
					width: n.offsetWidth,
					height: n.offsetHeight,
					scale: 1,
					ready: !0
				} : {
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					scale: 1,
					ready: !1
				};
			}
			let t = k.value, n = Object.keys(e).filter((n) => {
				let r = t[n], i = e[n];
				return !!r && !!i && r.ready && i.ready && Math.abs(r.width - i.width) > .5;
			});
			if (!n.length) {
				M && (cancelAnimationFrame(M), M = 0), j.value = !1, k.value = e;
				return;
			}
			let r = { ...e };
			for (let i of n) {
				let n = t[i], a = e[i];
				r[i] = {
					...a,
					left: n.left,
					top: n.top,
					scale: n.width / a.width
				};
			}
			k.value = r, j.value = !0, S(() => {
				u.value?.offsetWidth, M = requestAnimationFrame(() => {
					M = 0, j.value = !1, k.value = e;
				});
			});
		}
		function I(e) {
			let t = k.value[e.key];
			return !t || !t.ready ? { opacity: 0 } : {
				width: `${t.width}px`,
				height: `${t.height}px`,
				transform: `translate(${t.left}px, ${t.top}px) scaleX(${t.scale})`
			};
		}
		let L = null;
		function z() {
			S(F);
		}
		O(() => {
			S(F), wt && (window.addEventListener("resize", z), u.value && typeof ResizeObserver < "u" && (L = new ResizeObserver(() => S(F)), L.observe(u.value)));
		}), E(() => {
			wt && window.removeEventListener("resize", z), L?.disconnect(), L = null, M && (cancelAnimationFrame(M), M = 0);
		}), G(() => r.options, () => {
			let e = r.options;
			if (!e.length) {
				_.value = 0;
				return;
			}
			let t = e.findIndex((e) => h(e.value));
			r.multiple ? (_.value < 0 || _.value >= e.length) && (_.value = t >= 0 ? t : 0) : _.value = t >= 0 ? t : 0;
		}, {
			immediate: !0,
			deep: !0
		}), G(p, () => {
			if (!r.multiple) {
				let e = r.options.findIndex((e) => h(e.value));
				e >= 0 && (_.value = e);
			}
			S(F);
		}, { deep: !0 }), G([() => r.size, () => r.variant], () => S(F));
		let B = i(() => Z("mc-segmented", `mc-segmented--${r.size}`, `mc-segmented--${r.variant}`, `mc-segmented--${r.color}`, {
			"is-multiple": r.multiple,
			"is-block": r.block,
			"is-disabled": r.disabled,
			"is-snapping": j.value
		}, r.customClass));
		return (n, r) => (A(), c("div", { class: C(B.value) }, [l("div", {
			ref_key: "track",
			ref: u,
			class: "mc-segmented__track",
			role: t.multiple ? "group" : "radiogroup",
			"aria-multiselectable": t.multiple ? "true" : void 0,
			"aria-orientation": t.multiple ? void 0 : "horizontal",
			"aria-disabled": t.disabled || void 0,
			onKeydown: w
		}, [
			r[0] || (r[0] = l("span", {
				class: "mc-segmented__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = l("span", {
				class: "mc-segmented__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			r[2] || (r[2] = l("span", {
				class: "mc-segmented__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			(A(!0), c(e, null, P(D.value, (e) => (A(), c("span", {
				key: e.key,
				class: "mc-segmented__indicator",
				style: T(I(e)),
				"aria-hidden": "true"
			}, null, 4))), 128)),
			(A(!0), c(e, null, P(t.options, (e, n) => (A(), c("button", {
				key: `${String(e.value)}-${n}`,
				ref_for: !0,
				ref: (e) => f(n, e),
				type: "button",
				class: C(["mc-segmented__item", {
					"is-selected": h(e.value),
					"is-disabled": g(e)
				}]),
				role: t.multiple ? "checkbox" : "radio",
				"aria-checked": h(e.value) ? "true" : "false",
				"aria-disabled": g(e) ? "true" : void 0,
				disabled: g(e),
				tabindex: n === _.value ? 0 : -1,
				onClick: (t) => y(e, n),
				onFocus: (e) => v(n)
			}, [l("span", cx, [e.icon ? (A(), o($, {
				key: 0,
				name: e.icon,
				size: 16,
				class: "mc-segmented__icon"
			}, null, 8, ["name"])) : s("", !0), l("span", lx, R(e.label), 1)])], 42, sx))), 128))
		], 40, ox)], 2));
	}
}), [["__scopeId", "data-v-f514e2c4"]]), dx = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-disabled",
	"tabindex"
], fx = {
	key: 0,
	class: "mc-select__affix"
}, px = { class: "mc-select__tag-label" }, mx = ["aria-label", "onClick"], hx = {
	key: 0,
	class: "mc-select__placeholder"
}, gx = {
	key: 0,
	class: "mc-select__value"
}, _x = {
	key: 1,
	class: "mc-select__placeholder"
}, vx = {
	key: 3,
	class: "mc-select__spinner",
	"aria-hidden": "true"
}, yx = ["aria-label"], bx = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, xx = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Sx = {
	key: 2,
	class: "mc-select__search"
}, Cx = [
	"aria-label",
	"aria-controls",
	"aria-activedescendant"
], wx = ["aria-label"], Tx = [
	"id",
	"aria-multiselectable",
	"aria-busy"
], Ex = {
	key: 0,
	class: "mc-select__group mc-select__group--sticky",
	role: "presentation"
}, Dx = {
	key: 0,
	class: "mc-select__group mc-select__group--nested",
	role: "presentation"
}, Ox = [
	"id",
	"data-index",
	"onClick",
	"onKeydown"
], kx = {
	class: "mc-select__create-chip",
	"aria-hidden": "true"
}, Ax = { class: "mc-select__create-label" }, jx = { class: "mc-select__create-text" }, Mx = { class: "mc-select__create-value" }, Nx = [
	"id",
	"data-index",
	"aria-selected",
	"aria-disabled",
	"aria-setsize",
	"aria-posinset",
	"onClick"
], Px = { class: "mc-select__option-label" }, Fx = {
	key: 0,
	class: "mc-select__option-desc"
}, Ix = {
	key: 1,
	class: "mc-select__loading",
	role: "presentation",
	"aria-live": "polite"
}, Lx = { class: "mc-select__loading-text" }, Rx = {
	key: 2,
	class: "mc-select__empty",
	role: "presentation"
}, zx = 250, Bx = 4e3, Vx = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSelect",
	inheritAttrs: !1,
	__name: "Select",
	props: {
		modelValue: { default: void 0 },
		options: { default: () => [] },
		grouped: {
			type: Boolean,
			default: !1
		},
		groups: { default: () => [] },
		multiple: {
			type: Boolean,
			default: !1
		},
		filterable: {
			type: Boolean,
			default: !1
		},
		remote: {
			type: Boolean,
			default: !1
		},
		remoteMethod: {
			type: Function,
			default: void 0
		},
		remoteShowLoading: {
			type: Boolean,
			default: !0
		},
		allowCreate: {
			type: Boolean,
			default: !1
		},
		onCreate: {
			type: Function,
			default: void 0
		},
		clearable: {
			type: Boolean,
			default: !1
		},
		placeholder: { default: "" },
		size: { default: "medium" },
		variant: { default: "filled" },
		panelVariant: { default: "glass" },
		maxTagCount: { default: 0 },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: void 0
		},
		virtual: {
			type: [Boolean, Object],
			default: !1
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"update:open",
		"open",
		"close",
		"clear",
		"remove-tag",
		"remote-method"
	],
	setup(r, { emit: a }) {
		let u = Symbol("mc-select-create"), p = r, m = a, h = V(), g = Zt(), _ = An(), v = i(() => p.placeholder || g.value.select.placeholder), y = i(() => g.value.select.noMatch), b = N(!1), w = Fi("mc-select"), D = Tn({ active: b }), k = i(() => p.open ?? b.value), { isTop: j } = On({ active: k });
		function M(e) {
			k.value !== e && (b.value = e, m("update:open", e), m(e ? "open" : "close"));
		}
		let I = N(null), L = N(!1), z, H, W = 0, J = 0, ne = !1, re = i(() => p.remote && I.value ? I.value : p.options ?? []);
		function ie(e) {
			let t = e.description ?? e.desc ?? e.subText;
			return typeof t == "string" && t.trim() ? t : "";
		}
		let Y = i(() => {
			let e = [], t = (n, r) => {
				let i = ie(n);
				if (r === 0 && n.children && n.children.length) {
					e.push({
						kind: "group",
						label: n.label,
						value: n.value,
						disabled: !0,
						depth: 0,
						raw: n,
						description: i
					});
					for (let e of n.children) t(e, 1);
				} else e.push({
					kind: "option",
					label: n.label,
					value: n.value,
					disabled: n.disabled,
					depth: r,
					raw: n,
					description: i
				});
			};
			if (p.groups.length) {
				for (let n of p.groups) {
					e.push({
						kind: "section",
						label: n.label,
						value: n.label,
						disabled: !0,
						depth: 0
					});
					for (let e of n.options) t(e, 0);
				}
				return e;
			}
			if (p.grouped) {
				let n = /* @__PURE__ */ new Map();
				for (let e of re.value) {
					let t = typeof e.group == "string" ? e.group : "", r = n.get(t);
					r ? r.push(e) : n.set(t, [e]);
				}
				for (let [r, i] of n) {
					r && e.push({
						kind: "section",
						label: r,
						value: r,
						disabled: !0,
						depth: 0
					});
					for (let e of i) t(e, 0);
				}
				return e;
			}
			for (let e of re.value) t(e, 0);
			return e;
		}), ae = N(""), oe = i(() => {
			let e = ae.value.trim().toLowerCase();
			if (!e || p.remote) return Y.value;
			let t = [], n, r, i = !1, a = !1;
			for (let o of Y.value) o.kind === "section" ? (n = o, r = void 0, i = !1, a = !1) : o.kind === "group" ? (r = o, a = !1) : String(o.label).toLowerCase().includes(e) && (n && !i && (t.push(n), i = !0), r && !a && (t.push(r), a = !0), t.push(o));
			return t;
		}), se = i(() => {
			if (!p.allowCreate) return !1;
			let e = ae.value.trim().toLowerCase();
			return e ? !Y.value.some((t) => t.kind === "option" && String(t.label).toLowerCase().includes(e)) : !1;
		}), ce = i(() => se.value ? [{
			kind: "create",
			label: ae.value.trim(),
			value: u,
			depth: 0
		}, ...oe.value] : oe.value), le = i(() => {
			let e = ce.value, t = [], n;
			for (let r = 0; r < e.length; r++) {
				let i = e[r];
				i.kind === "section" ? (n = {
					key: `mc-select-section-${r}`,
					label: i.label,
					items: []
				}, t.push(n)) : (n || (n = {
					key: `mc-select-section-${t.length}`,
					label: "",
					items: []
				}, t.push(n)), n.items.push({
					option: i,
					index: r
				}));
			}
			return t;
		}), ue = i(() => p.remote && p.remoteShowLoading && L.value), de = i(() => p.virtual ? typeof p.virtual == "object" ? p.virtual : {} : null), fe = i(() => {
			if (!de.value) return !1;
			let e = ce.value;
			return e.length ? e.every((e) => e.kind === "option" && !e.description) : !1;
		}), pe = N(0), me = i(() => {
			let e = de.value?.rowHeight;
			return e ? Math.max(20, e) : pe.value || 40;
		}), he = i(() => Math.max(0, de.value?.overscan ?? 6)), ge = N(0), _e = N(0), X = i(() => {
			if (!fe.value) return null;
			let e = ce.value.length, t = me.value, n = he.value, r = Math.max(0, Math.floor(ge.value / t) - n), i = Math.ceil((ge.value + Math.max(_e.value, t)) / t) + 1, a = Math.min(e, r + i + n);
			return {
				start: r,
				end: a,
				top: r * t,
				bottom: (e - a) * t,
				total: e
			};
		}), ve = i(() => {
			let e = X.value;
			if (!e) return le.value;
			let t = le.value[0];
			return t ? [{
				...t,
				items: t.items.slice(e.start, e.end)
			}] : le.value;
		});
		function ye() {
			let e = Me.value;
			e && (ge.value = e.scrollTop);
		}
		function be() {
			let e = Me.value;
			if (e && (_e.value = e.clientHeight, ge.value = e.scrollTop, fe.value && !de.value?.rowHeight)) {
				let t = e.querySelector("[data-index]")?.offsetHeight ?? 0;
				t && (pe.value = t);
			}
		}
		function xe() {
			z !== void 0 && (clearTimeout(z), z = void 0), H !== void 0 && (clearTimeout(H), H = void 0);
		}
		async function Se(e, t) {
			let n = J;
			L.value = !0, m("remote-method", e);
			let r = p.remoteMethod;
			if (typeof r != "function") H = setTimeout(() => {
				H = void 0, t === W && (L.value = !1);
			}, Bx);
			else {
				ne = !0;
				try {
					let i = await r(e);
					if (t !== W) return;
					Array.isArray(i) && n === J && (I.value = i);
				} catch {} finally {
					t === W && (ne = !1, L.value = !1);
				}
			}
		}
		G(ae, (e) => {
			W += 1, xe(), ne = !1;
			let t = e.trim();
			if (!t || !p.remote) {
				L.value = !1, I.value = null;
				return;
			}
			L.value = !0;
			let n = W;
			z = setTimeout(() => {
				z = void 0, Se(t, n);
			}, zx);
		}), G(() => p.options, () => {
			J += 1, H !== void 0 && (clearTimeout(H), H = void 0), ne || (L.value = !1);
		});
		let Ce = i(() => p.multiple ? Array.isArray(p.modelValue) ? [...p.modelValue] : [] : p.modelValue === void 0 || p.modelValue === null ? [] : [p.modelValue]);
		function we(e) {
			return Ce.value.includes(e);
		}
		let Te = /* @__PURE__ */ new Map();
		G(Y, (e) => {
			for (let t of e) t.kind === "option" && Te.set(t.value, t.label);
		}, { immediate: !0 });
		function Ee(e) {
			let t = Y.value.find((t) => t.kind === "option" && t.value === e);
			return t ? t.label : Te.get(e) ?? String(e);
		}
		let De = i(() => {
			if (p.multiple) return "";
			let e = Ce.value[0];
			return e === void 0 ? "" : Ee(e);
		}), Oe = i(() => Ce.value.length > 0), ke = i(() => {
			let e = Ce.value, t = p.maxTagCount;
			return !t || t <= 0 || e.length <= t ? e.map((e) => ({
				value: e,
				label: Ee(e)
			})) : [...e.slice(0, t).map((e) => ({
				value: e,
				label: Ee(e)
			})), {
				value: "__mochi_rest__",
				label: `+${e.length - t}`,
				rest: !0
			}];
		}), Ae = N(null), je = N(null), Me = N(null), Ne = N(null), Pe = N(-1), { style: Fe, coords: Ie, arrowSide: Le, transformOrigin: Re, update: ze, startAutoUpdate: Be, stopAutoUpdate: Ve } = _n(Ae, je, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			padding: 8,
			zIndex: D
		}), He = i(() => {
			let e = Ie.value.arrowX;
			return e === void 0 ? { left: "50%" } : { left: `${Math.round(e)}px` };
		});
		function Ue() {
			let e = ce.value;
			for (let t = 0; t < e.length; t++) if (e[t].kind === "option" && !e[t].disabled) return t;
			return -1;
		}
		function We(e) {
			let t = ce.value;
			if (!t.length) return;
			let n = Pe.value;
			for (let r = 0; r < t.length; r++) {
				n = (n + e + t.length) % t.length;
				let r = t[n];
				if (r.kind === "option" && !r.disabled) {
					Pe.value = n, Ge();
					return;
				}
			}
		}
		function Ge() {
			let e = Me.value;
			if (e) {
				if (X.value) {
					let t = me.value, n = Pe.value * t, r = n + t;
					n < e.scrollTop ? e.scrollTop = n : r > e.scrollTop + e.clientHeight && (e.scrollTop = r - e.clientHeight), ge.value = e.scrollTop;
				} else e.querySelector(`[data-index="${Pe.value}"]`)?.scrollIntoView({ block: "nearest" });
			}
		}
		function Ke(e) {
			if (!e.disabled) {
				if (e.kind === "create") qe(e.label);
				else if (e.kind === "option") {
					if (p.multiple) {
						let t = [...Ce.value], n = t.indexOf(e.value);
						n === -1 ? t.push(e.value) : t.splice(n, 1), m("update:modelValue", t), m("change", t);
					} else m("update:modelValue", e.value), m("change", e.value), M(!1);
				}
			}
		}
		function qe(e) {
			let t = e.trim();
			t && (p.onCreate?.(t), ae.value = "", S(() => Ne.value?.focus()));
		}
		function Je(e) {
			if (p.disabled) return;
			let t = Ce.value.filter((t) => t !== e);
			m("update:modelValue", t), m("change", t), m("remove-tag", e);
		}
		function Ye() {
			if (p.disabled) return;
			let e = p.multiple ? [] : null;
			m("update:modelValue", e), m("change", e), m("clear");
		}
		function Xe() {
			p.disabled || p.loading || M(!k.value);
		}
		function Ze(e) {
			if (!p.disabled) {
				if (e.key === "Escape") k.value && j() && (e.stopPropagation(), M(!1));
				else if (e.key === "Enter" || e.key === " ") {
					if (e.preventDefault(), !k.value) {
						et();
						return;
					}
					let t = ce.value[Pe.value];
					t && Ke(t);
				} else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
					if (e.preventDefault(), !k.value) {
						et();
						return;
					}
					We(e.key === "ArrowDown" ? 1 : -1);
				}
			}
		}
		function Qe(e) {
			if (e.key === "ArrowDown") e.preventDefault(), We(1);
			else if (e.key === "ArrowUp") e.preventDefault(), We(-1);
			else if (e.key === "Enter") {
				e.preventDefault();
				let t = ce.value[Pe.value];
				t && Ke(t);
			} else if (e.key === "Escape") {
				if (!j()) return;
				e.preventDefault(), e.stopPropagation(), M(!1);
			}
		}
		function $e(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function et() {
			p.disabled || p.loading || M(!0);
		}
		G(k, async (e) => {
			if (e) ae.value = "", Pe.value = Ue(), ge.value = 0, await S(), je.value && Ae.value && (je.value.style.minWidth = `${Ae.value.offsetWidth}px`), ze(), Be(), be(), (p.filterable || p.remote) && Ne.value?.focus();
			else {
				let e = typeof document < "u" && (je.value?.contains(document.activeElement) ?? !1);
				Ve(), ae.value = "", e && S(() => Ae.value?.focus({ preventScroll: !0 }));
			}
		}), G(ce, () => {
			Pe.value = Ue(), ge.value = 0;
			let e = Me.value;
			e && (e.scrollTop = 0), ze();
		}), G(ue, () => ze());
		function tt(e) {
			if (!k.value) return;
			let t = e.target;
			t && (Ae.value?.contains(t) || je.value?.contains(t) || M(!1));
		}
		O(() => {
			document.addEventListener("pointerdown", tt, !0), k.value && S(be);
		}), E(() => {
			document.removeEventListener("pointerdown", tt, !0), Ve(), xe();
		});
		let nt = i(() => {
			let e = p.teleport;
			return typeof e == "string" ? e : "body";
		}), rt = i(() => p.teleport === !1), it = i(() => Z("mc-select", `mc-select--${p.variant}`, `mc-select--${p.size}`, {
			"is-open": k.value,
			"is-disabled": p.disabled,
			"is-multiple": p.multiple
		})), at = i(() => Z(it.value, h.class, p.customClass)), ot = i(() => h.style);
		return (i, a) => (A(), c("div", {
			class: C(at.value),
			style: T(ot.value)
		}, [l("div", {
			ref_key: "trigger",
			ref: Ae,
			class: "mc-select__control mc-sheen-sweep",
			role: "combobox",
			"aria-expanded": k.value,
			"aria-haspopup": "listbox",
			"aria-controls": k.value ? B(w) + "-list" : void 0,
			"aria-activedescendant": k.value && Pe.value >= 0 ? B(w) + "-option-" + Pe.value : void 0,
			"aria-disabled": r.disabled || void 0,
			tabindex: r.disabled ? -1 : 0,
			onClick: Xe,
			onKeydown: Ze
		}, [
			a[3] || (a[3] = l("span", {
				class: "mc-select__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			a[4] || (a[4] = l("span", {
				class: "mc-select__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			i.$slots.prefix ? (A(), c("span", fx, [F(i.$slots, "prefix", {}, void 0, !0)])) : s("", !0),
			r.multiple ? (A(), c(e, { key: 1 }, [(A(!0), c(e, null, P(ke.value, (e) => (A(), c("span", {
				key: String(e.value),
				class: C(["mc-select__tag", { "is-rest": e.rest }])
			}, [l("span", px, R(e.label), 1), !e.rest && !r.disabled ? (A(), c("button", {
				key: 0,
				type: "button",
				class: "mc-select__tag-close",
				"aria-label": `Remove ${e.label}`,
				onClick: q((t) => Je(e.value), ["stop"])
			}, [f($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, mx)) : s("", !0)], 2))), 128)), ke.value.length ? s("", !0) : (A(), c("span", hx, R(v.value), 1))], 64)) : (A(), c(e, { key: 2 }, [De.value ? (A(), c("span", gx, R(De.value), 1)) : (A(), c("span", _x, R(v.value), 1))], 64)),
			r.loading ? (A(), c("span", vx, [...a[2] || (a[2] = [l("svg", {
				viewBox: "0 0 24 24",
				width: "1em",
				height: "1em"
			}, [l("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})], -1)])])) : s("", !0),
			r.clearable && Oe.value && !r.disabled ? (A(), c("button", {
				key: 4,
				type: "button",
				class: "mc-select__clear",
				"aria-label": B(g).select.clear ?? "Clear selection",
				onClick: q(Ye, ["stop"])
			}, [f($, {
				name: "close",
				size: 13,
				"stroke-width": 2.4
			})], 8, yx)) : s("", !0),
			l("span", {
				class: C(["mc-select__arrow", { "is-open": k.value }]),
				"aria-hidden": "true"
			}, [f($, {
				name: "chevron-down",
				size: 15
			})], 2)
		], 40, dx), (A(), o(t, {
			to: nt.value,
			disabled: rt.value
		}, [f(n, { name: "mc-select-pop" }, {
			default: ee(() => [k.value ? (A(), c("div", x({
				key: 0,
				ref_key: "panel",
				ref: je,
				class: ["mc-select__panel", { "mc-select__panel--liquid": r.panelVariant === "liquid" }],
				style: B(Fe)
			}, B(_)), [l("span", {
				class: C(["mc-select__panel-arrow", `is-${B(Le)}`]),
				style: T(He.value),
				"aria-hidden": "true"
			}, null, 6), l("div", {
				class: C(["mc-select__panel-inner mc-grain-overlay", {
					"mc-panel--liquid": r.panelVariant === "liquid",
					"mc-liquid-glass": r.panelVariant === "liquid",
					"mc-liquid-glass--liquid": r.panelVariant === "liquid",
					"mc-liquid-glass--layers": r.panelVariant === "liquid"
				}]),
				style: T({ transformOrigin: B(Re) })
			}, [
				r.panelVariant === "liquid" ? (A(), c("span", bx)) : s("", !0),
				r.panelVariant === "liquid" ? (A(), c("span", xx)) : s("", !0),
				r.filterable || r.remote ? (A(), c("div", Sx, [
					f($, {
						name: "search",
						size: 14,
						class: "mc-select__search-icon"
					}),
					te(l("input", {
						ref_key: "searchInput",
						ref: Ne,
						"onUpdate:modelValue": a[0] || (a[0] = (e) => ae.value = e),
						class: "mc-select__search-input",
						type: "text",
						placeholder: "Search…",
						"aria-label": B(g).select.search ?? "Search options",
						"aria-controls": B(w) + "-list",
						"aria-activedescendant": Pe.value >= 0 ? B(w) + "-option-" + Pe.value : void 0,
						onKeydown: Qe
					}, null, 40, Cx), [[U, ae.value]]),
					ae.value ? (A(), c("button", {
						key: 0,
						type: "button",
						class: "mc-select__search-clear",
						"aria-label": B(g).select.clearSearch ?? "Clear search",
						onClick: a[1] || (a[1] = (e) => ae.value = "")
					}, [f($, {
						name: "close",
						size: 11,
						"stroke-width": 2.6
					})], 8, wx)) : s("", !0)
				])) : s("", !0),
				l("ul", {
					ref_key: "listEl",
					ref: Me,
					id: B(w) + "-list",
					class: "mc-select__list mc-scroll",
					role: "listbox",
					"aria-multiselectable": r.multiple || void 0,
					"aria-busy": ue.value || void 0,
					onScrollPassive: ye
				}, [
					X.value && X.value.top > 0 ? (A(), c("li", {
						key: 0,
						class: "mc-select__spacer",
						role: "presentation",
						"aria-hidden": "true",
						style: T({ height: X.value.top + "px" })
					}, null, 4)) : s("", !0),
					(A(!0), c(e, null, P(ve.value, (t) => (A(), c(e, { key: t.key }, [t.label ? (A(), c("li", Ex, R(t.label), 1)) : s("", !0), (A(!0), c(e, null, P(t.items, (t) => (A(), c(e, { key: `${String(t.option.label)}-${t.index}` }, [t.option.kind === "group" ? (A(), c("li", Dx, R(t.option.label), 1)) : t.option.kind === "create" ? (A(), c("li", {
						key: 1,
						id: B(w) + "-option-" + t.index,
						class: C(["mc-select__create", { "is-active": t.index === Pe.value }]),
						role: "option",
						"data-index": t.index,
						"aria-selected": !1,
						tabindex: "0",
						onClick: (e) => Ke(t.option),
						onKeydown: [K(q((e) => Ke(t.option), ["prevent"]), ["enter"]), K(q((e) => Ke(t.option), ["prevent"]), ["space"])]
					}, [l("span", kx, [f($, {
						name: "plus",
						size: 12,
						"stroke-width": 2.6
					})]), l("span", Ax, [l("span", jx, R(B(g).select.create ?? "Create"), 1), l("span", Mx, R(t.option.label), 1)])], 42, Ox)) : (A(), c("li", {
						key: 2,
						id: B(w) + "-option-" + t.index,
						class: C(["mc-select__option", {
							"is-active": t.index === Pe.value,
							"is-selected": we(t.option.value),
							"is-disabled": t.option.disabled,
							"is-nested": t.option.depth > 0,
							"is-multiline": !!t.option.description
						}]),
						role: "option",
						"data-index": t.index,
						"aria-selected": we(t.option.value),
						"aria-disabled": t.option.disabled || void 0,
						"aria-setsize": X.value ? X.value.total : void 0,
						"aria-posinset": X.value ? t.index + 1 : void 0,
						onClick: (e) => Ke(t.option),
						onMousemove: $e
					}, [l("span", { class: C(["mc-select__option-body", { "has-desc": !!t.option.description }]) }, [F(i.$slots, "option", {
						option: t.option.raw,
						label: t.option.label,
						value: t.option.value,
						selected: we(t.option.value),
						disabled: !!t.option.disabled,
						index: t.index
					}, () => [l("span", Px, R(t.option.label), 1)], !0), t.option.description ? (A(), c("span", Fx, R(t.option.description), 1)) : s("", !0)], 2), a[5] || (a[5] = l("span", {
						class: "mc-select__check",
						"aria-hidden": "true"
					}, [l("svg", { viewBox: "0 0 24 24" }, [l("path", { d: "M20 6 9 17l-5-5" })])], -1))], 42, Nx))], 64))), 128))], 64))), 128)),
					ue.value ? (A(), c("li", Ix, [a[6] || (a[6] = l("span", {
						class: "mc-select__loading-spinner",
						"aria-hidden": "true"
					}, [l("svg", {
						viewBox: "0 0 24 24",
						width: "1em",
						height: "1em"
					}, [l("circle", {
						cx: "12",
						cy: "12",
						r: "9",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2.4",
						"stroke-linecap": "round",
						"stroke-dasharray": "42 60"
					})])], -1)), l("span", Lx, R(B(g).select.loading ?? "Loading…"), 1)])) : s("", !0),
					!ce.value.length && !ue.value ? (A(), c("li", Rx, [F(i.$slots, "empty", {}, () => [d(R(y.value), 1)], !0)])) : s("", !0),
					X.value && X.value.bottom > 0 ? (A(), c("li", {
						key: 3,
						class: "mc-select__spacer",
						role: "presentation",
						"aria-hidden": "true",
						style: T({ height: X.value.bottom + "px" })
					}, null, 4)) : s("", !0)
				], 40, Tx)
			], 6)], 16)) : s("", !0)]),
			_: 3
		})], 8, ["to", "disabled"]))], 6));
	}
}), [["__scopeId", "data-v-b583a844"]]), Hx = { class: "mc-signature__frame mc-sheen-sweep" }, Ux = ["id", "aria-label"], Wx = {
	key: 0,
	class: "mc-signature__hint",
	"aria-hidden": "true"
}, Gx = { class: "mc-signature__toolbar" }, Kx = ["disabled", "aria-label"], qx = ["disabled", "aria-label"], Jx = ["disabled", "aria-label"], Yx = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSignature",
	__name: "Signature",
	props: {
		modelValue: { default: "" },
		width: { default: 480 },
		height: { default: 200 },
		strokeColor: { default: "current" },
		strokeWidth: { default: 2.6 },
		background: { default: "transparent" },
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"save",
		"clear"
	],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, o = Fi("mc-signature"), u = N(null), d = N([]), p = N(!1), m = N(!1), h = [], g = 1;
		function _(e, t) {
			let n = (e ?? "").trim();
			if (typeof document > "u") return n;
			let r = document.createElement("span");
			r.style.display = "none", r.style.color = n === "current" ? `var(${t})` : n, document.body.appendChild(r);
			let i = getComputedStyle(r).color;
			if (document.body.removeChild(r), !i) return n === "current" ? "" : n;
			let a = document.createElement("canvas").getContext("2d");
			return a ? (a.fillStyle = "transparent", a.fillStyle = i, a.fillStyle) : i;
		}
		let v = i(() => _(n.strokeColor, "--mc-accent")), y = i(() => {
			let e = (n.background ?? "").trim();
			return !e || e === "transparent" ? "transparent" : _(e, "--mc-surface");
		});
		function b() {
			return u.value?.getContext("2d") ?? null;
		}
		function x(e) {
			e.clearRect(0, 0, n.width, n.height), y.value !== "transparent" && (e.save(), e.fillStyle = y.value, e.fillRect(0, 0, n.width, n.height), e.restore());
		}
		function S(e, t) {
			if (!t.length) return;
			if (e.save(), e.strokeStyle = v.value, e.lineWidth = n.strokeWidth, e.lineCap = "round", e.lineJoin = "round", t.length === 1) {
				e.beginPath(), e.arc(t[0].x, t[0].y, n.strokeWidth / 2, 0, Math.PI * 2), e.fillStyle = v.value, e.fill(), e.restore();
				return;
			}
			e.beginPath(), e.moveTo(t[0].x, t[0].y);
			for (let n = 1; n < t.length - 1; n += 1) {
				let r = (t[n].x + t[n + 1].x) / 2, i = (t[n].y + t[n + 1].y) / 2;
				e.quadraticCurveTo(t[n].x, t[n].y, r, i);
			}
			let r = t[t.length - 1];
			e.lineTo(r.x, r.y), e.stroke(), e.restore();
		}
		function w() {
			let e = b();
			if (e) {
				e.setTransform(g, 0, 0, g, 0, 0), x(e);
				for (let t of d.value) S(e, t);
				m.value = d.value.length > 0;
			}
		}
		function T() {
			let e = u.value;
			e && (g = Math.min(window.devicePixelRatio || 1, 3), e.width = Math.round(n.width * g), e.height = Math.round(n.height * g), e.style.width = `${n.width}px`, e.style.height = `${n.height}px`);
		}
		function D(e) {
			let t = b();
			if (!t || !e) return;
			let r = new Image();
			r.onload = () => {
				t.setTransform(g, 0, 0, g, 0, 0), x(t), t.drawImage(r, 0, 0, n.width, n.height), m.value = !0;
			}, r.src = e;
		}
		function k(e) {
			let t = u.value?.getBoundingClientRect();
			return t ? {
				x: e.clientX - t.left,
				y: e.clientY - t.top
			} : {
				x: 0,
				y: 0
			};
		}
		function j(e) {
			if (e.button !== 0 && e.pointerType === "mouse") return;
			let t = u.value;
			t && (e.preventDefault(), t.setPointerCapture(e.pointerId), p.value = !0, h = [k(e)], d.value = d.value.concat([h]), w());
		}
		function M(e) {
			if (!p.value) return;
			e.preventDefault();
			let t = k(e), n = h[h.length - 1];
			n && Math.abs(t.x - n.x) < .6 && Math.abs(t.y - n.y) < .6 || (h.push(t), w());
		}
		function P() {
			p.value && (p.value = !1, h = [], w());
		}
		function F() {
			d.value.length && (d.value = d.value.slice(0, -1), w());
		}
		function I() {
			d.value = [], w(), a("clear"), a("update:modelValue", ""), a("change", "");
		}
		function L() {
			let e = u.value;
			if (!e) return;
			let t = e.toDataURL("image/png");
			a("update:modelValue", t), a("change", t), a("save", t);
		}
		O(() => {
			T(), w(), n.modelValue && D(n.modelValue);
		}), E(() => {
			p.value = !1;
		}), G(() => [n.width, n.height], () => {
			T(), w();
		}), G(() => n.strokeColor, () => w()), G(() => n.background, () => w()), G(() => n.modelValue, (e) => {
			e && D(e);
		});
		let z = i(() => Z("mc-signature", {
			"is-drawing": p.value,
			"has-ink": m.value
		}, n.customClass));
		return (t, n) => (A(), c("div", { class: C(z.value) }, [l("div", Hx, [
			n[0] || (n[0] = l("span", {
				class: "mc-signature__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			l("canvas", {
				ref_key: "canvas",
				ref: u,
				id: B(o),
				class: "mc-signature__canvas",
				"aria-label": `signature ${e.width} by ${e.height}`,
				role: "img",
				onPointerdown: j,
				onPointermove: M,
				onPointerup: P,
				onPointercancel: P,
				onPointerleave: P
			}, null, 40, Ux),
			m.value ? s("", !0) : (A(), c("span", Wx, [f($, {
				name: "pen",
				size: 16
			}), l("span", null, R(B(r).signature?.hint ?? "Sign here"), 1)]))
		]), l("div", Gx, [
			l("button", {
				type: "button",
				class: "mc-signature__btn",
				disabled: !m.value,
				"aria-label": B(r).signature?.undo ?? "undo",
				onClick: F
			}, [f($, {
				name: "arrow-left",
				size: 14
			}), l("span", null, R(B(r).signature?.undo ?? "Undo"), 1)], 8, Kx),
			l("button", {
				type: "button",
				class: "mc-signature__btn",
				disabled: !m.value,
				"aria-label": B(r).signature?.clear ?? "clear",
				onClick: I
			}, [f($, {
				name: "trash",
				size: 14
			}), l("span", null, R(B(r).signature?.clear ?? "Clear"), 1)], 8, qx),
			l("button", {
				type: "button",
				class: "mc-signature__btn mc-signature__btn--primary",
				disabled: !m.value,
				"aria-label": B(r).signature?.save ?? "save as PNG",
				onClick: L
			}, [f($, {
				name: "save",
				size: 14
			}), l("span", null, R(B(r).signature?.save ?? "Save as PNG"), 1)], 8, Jx)
		])], 2));
	}
}), [["__scopeId", "data-v-683813eb"]]), Xx = { class: "mc-skeleton__content" }, Zx = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSkeleton",
	__name: "Skeleton",
	props: {
		rows: { default: 3 },
		columns: { default: 1 },
		width: {},
		height: {},
		avatar: {
			type: Boolean,
			default: !1
		},
		title: {
			type: Boolean,
			default: !1
		},
		round: {
			type: Boolean,
			default: !1
		},
		animated: {
			type: Boolean,
			default: !0
		},
		loading: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => {
			if (n.width !== void 0) return { width: typeof n.width == "number" ? `${n.width}px` : n.width };
		}), a = i(() => {
			if (n.height !== void 0) return { height: typeof n.height == "number" ? `${n.height}px` : n.height };
		}), o = i(() => Math.max(0, n.rows)), u = i(() => Math.max(1, n.columns));
		function d(e, t) {
			if (u.value === 1) return { flex: "1 1 auto" };
			let n = e === o.value - 1, r = t === u.value - 1;
			return n && r ? { flex: "0 0 62%" } : n ? { flex: "1 1 auto" } : { flex: "1 1 0%" };
		}
		let f = i(() => Z("mc-skeleton", {
			"is-animated": n.animated && n.loading && !n.disabled,
			"is-round": n.round,
			"has-avatar": n.avatar,
			"is-disabled": n.disabled
		}, n.customClass));
		return (i, p) => t.loading ? (A(), c("div", {
			key: 0,
			class: C(f.value),
			style: T(r.value),
			"aria-busy": "true"
		}, [t.avatar ? (A(), c("div", {
			key: 0,
			class: "mc-skeleton__avatar",
			style: T(a.value)
		}, null, 4)) : s("", !0), l("div", Xx, [t.title ? (A(), c("div", {
			key: 0,
			class: "mc-skeleton__block mc-skeleton__title",
			style: T(a.value)
		}, null, 4)) : s("", !0), (A(!0), c(e, null, P(o.value, (t) => (A(), c("div", {
			key: t,
			class: "mc-skeleton__row"
		}, [(A(!0), c(e, null, P(u.value, (e) => (A(), c("div", {
			key: e,
			class: "mc-skeleton__block mc-skeleton__row-item",
			style: T({
				...a.value,
				...d(t - 1, e - 1)
			})
		}, null, 4))), 128))]))), 128))])], 6)) : (A(), c("div", {
			key: 1,
			class: C(B(Z)("mc-skeleton", "mc-skeleton--loaded", n.customClass))
		}, [F(i.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-fb159268"]]), Qx = [
	"tabindex",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-orientation",
	"aria-disabled",
	"aria-label",
	"onPointerdown",
	"onKeydown"
], $x = {
	key: 0,
	class: "mc-slider__bubble"
}, eS = {
	key: 0,
	class: "mc-slider__marks"
}, tS = { class: "mc-slider__mark-label" }, nS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSlider",
	inheritAttrs: !1,
	__name: "Slider",
	props: {
		modelValue: { default: 0 },
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		range: {
			type: Boolean,
			default: !1
		},
		vertical: {
			type: Boolean,
			default: !1
		},
		marks: { default: () => [] },
		showValue: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: { default: "default" },
		size: { default: "medium" },
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = V();
		function u(e) {
			return Array.isArray(e) ? e : [e ?? r.min];
		}
		function d(e) {
			if (r.range) {
				let t = u(e), n = Ot(t[0] ?? r.min, r.min, r.max), i = Ot(t[1] ?? r.max, r.min, r.max);
				return n <= i ? [n, i] : [i, n];
			}
			return [Ot(u(e)[0] ?? r.min, r.min, r.max)];
		}
		let f = N(d(r.modelValue));
		G(() => r.modelValue, (e) => {
			let t = d(e);
			t.every((e, t) => e === f.value[t]) || (f.value = t);
		});
		function p(e) {
			let t = r.step ?? 1, n = Math.round((e - r.min) / t) * t + r.min;
			return Number(Ot(n, r.min, r.max).toFixed(10));
		}
		function m(e) {
			let t = r.max - r.min;
			return t <= 0 ? 0 : (e - r.min) / t * 100;
		}
		function h() {
			return r.range ? [...f.value] : f.value[0];
		}
		function g(e, t) {
			if (r.disabled) return;
			let n = [...f.value];
			r.range ? e === 0 ? n[0] = Math.min(t, n[1]) : n[1] = Math.max(t, n[0]) : n[0] = t, !n.every((e, t) => e === f.value[t]) && (f.value = n, a("update:modelValue", h()));
		}
		let _ = N(null), v = N(null);
		function y(e) {
			let t = _.value;
			if (!t) return r.min;
			let n = t.getBoundingClientRect(), i = r.vertical ? 1 - (e.clientY - n.top) / n.height : (e.clientX - n.left) / n.width;
			return p(r.min + Ot(i, 0, 1) * (r.max - r.min));
		}
		function b(e) {
			let t = v.value;
			t !== null && g(t, y(e));
		}
		function x(e) {
			if (r.disabled) return;
			let t = y(e), n = 0;
			r.range && (n = Math.abs(t - f.value[0]) <= Math.abs(t - f.value[1]) ? 0 : 1), v.value = n, b(e);
		}
		function S(e, t) {
			r.disabled || (v.value = e, b(t));
		}
		function w(e) {
			v.value !== null && b(e);
		}
		function D() {
			v.value !== null && (v.value = null, a("change", h()));
		}
		O(() => {
			window.addEventListener("pointermove", w), window.addEventListener("pointerup", D);
		}), E(() => {
			window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", D);
		});
		function k(e, t) {
			if (r.disabled) return;
			let n = r.step ?? 1, i = f.value[e];
			if (t.key === "Home") {
				t.preventDefault(), j(e, r.range && e === 1 ? f.value[0] : r.min);
				return;
			}
			if (t.key === "End") {
				t.preventDefault(), j(e, r.range && e === 0 ? f.value[1] : r.max);
				return;
			}
			let a = 0;
			if (t.key === "ArrowRight" || t.key === "ArrowUp") a = n;
			else if (t.key === "ArrowLeft" || t.key === "ArrowDown") a = -n;
			else if (t.key === "PageUp") a = n * 10;
			else if (t.key === "PageDown") a = -n * 10;
			else return;
			t.preventDefault(), j(e, p(i + a));
		}
		function j(e, t) {
			let n = f.value[e];
			g(e, t), f.value[e] !== n && a("change", h());
		}
		function M(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect(), r = (e.clientX - (n.left + n.width / 2)) / n.width * 4, i = (e.clientY - (n.top + n.height / 2)) / n.height * 4;
			t.style.setProperty("--mc-mx", `${r.toFixed(2)}px`), t.style.setProperty("--mc-my", `${i.toFixed(2)}px`);
		}
		let F = i(() => {
			if (r.range) {
				let e = m(f.value[0]), t = m(f.value[1]);
				return r.vertical ? {
					bottom: `${e}%`,
					height: `${t - e}%`
				} : {
					left: `${e}%`,
					width: `${t - e}%`
				};
			}
			let e = m(f.value[0]);
			return r.vertical ? {
				bottom: "0%",
				height: `${e}%`
			} : {
				left: "0%",
				width: `${e}%`
			};
		}), I = i(() => f.value.map((e, t) => ({
			value: e,
			index: t,
			style: { "--mc-pos": String(m(e)) }
		}))), L = i(() => r.marks ?? []);
		function z(e) {
			return { "--mc-pos": String(m(e)) };
		}
		let B = i(() => Z("mc-slider", `mc-slider--${r.color}`, `mc-slider--${r.size}`, {
			"is-vertical": r.vertical,
			"is-range": r.range,
			"is-disabled": r.disabled,
			"is-dragging": v.value !== null,
			"has-marks": L.value.length > 0
		})), H = i(() => Z(B.value, o.class, r.customClass)), U = i(() => o.style);
		return (n, r) => (A(), c("div", {
			class: C(H.value),
			style: T(U.value)
		}, [
			l("div", {
				ref_key: "track",
				ref: _,
				class: "mc-slider__rail",
				onPointerdown: x
			}, [
				l("div", {
					class: "mc-slider__fill",
					style: T(F.value)
				}, [...r[0] || (r[0] = [l("span", { class: "mc-slider__fill-shine" }, null, -1)])], 4),
				r[1] || (r[1] = l("span", { class: "mc-slider__groove" }, null, -1)),
				r[2] || (r[2] = l("span", { class: "mc-slider__grain mc-grain-overlay" }, null, -1))
			], 544),
			(A(!0), c(e, null, P(I.value, (e) => (A(), c("div", {
				key: e.index,
				class: "mc-slider__handle",
				style: T(e.style),
				role: "slider",
				tabindex: t.disabled ? -1 : 0,
				"aria-valuemin": t.min,
				"aria-valuemax": t.max,
				"aria-valuenow": e.value,
				"aria-orientation": t.vertical ? "vertical" : "horizontal",
				"aria-disabled": t.disabled || void 0,
				"aria-label": `Value ${e.value}`,
				onPointerdown: (t) => S(e.index, t),
				onPointermove: M,
				onKeydown: (t) => k(e.index, t)
			}, [
				r[3] || (r[3] = l("span", { class: "mc-slider__halo" }, null, -1)),
				r[4] || (r[4] = l("span", { class: "mc-slider__core" }, null, -1)),
				t.showValue ? (A(), c("span", $x, R(e.value), 1)) : s("", !0)
			], 44, Qx))), 128)),
			L.value.length ? (A(), c("div", eS, [(A(!0), c(e, null, P(L.value, (e) => (A(), c("span", {
				key: e.value,
				class: "mc-slider__mark",
				style: T(z(e.value))
			}, [r[5] || (r[5] = l("span", { class: "mc-slider__mark-dot" }, null, -1)), l("span", tS, R(e.label), 1)], 4))), 128))])) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-c80b6cfb"]]), rS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSpace",
	__name: "Space",
	props: {
		direction: { default: "horizontal" },
		size: { default: 2 },
		align: { default: "center" },
		wrap: {
			type: Boolean,
			default: !1
		},
		fill: {
			type: Boolean,
			default: !1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = [
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			8,
			10,
			12,
			16,
			20,
			24
		], n = e;
		function r(e) {
			if (e != null) return typeof e == "number" ? t.includes(e) ? `var(--mc-space-${e})` : `calc(var(--mc-space-1) * ${e})` : e;
		}
		let a = i(() => ({
			flexDirection: n.direction === "vertical" ? "column" : "row",
			gap: r(n.size),
			alignItems: n.align,
			flexWrap: n.wrap ? "wrap" : "nowrap"
		})), o = i(() => Z("mc-space", `mc-space--${n.direction}`, {
			"is-wrap": n.wrap,
			"is-fill": n.fill,
			"is-bordered": n.bordered
		}, n.customClass));
		return (e, t) => (A(), c("div", {
			class: C(o.value),
			style: T(a.value)
		}, [F(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-e0939175"]]), iS = ["aria-busy", "aria-disabled"], aS = {
	key: 0,
	class: "mc-spin__overlay"
}, oS = {
	key: 0,
	class: "mc-spin__body"
}, sS = {
	class: "mc-spin__loader",
	"aria-hidden": "true"
}, cS = {
	viewBox: "0 0 44 44",
	class: "mc-spin__ring"
}, lS = ["id"], uS = ["stroke"], dS = {
	key: 0,
	class: "mc-spin__tip"
}, fS = { class: "mc-visually-hidden" }, pS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSpin",
	__name: "Spin",
	props: {
		loading: {
			type: Boolean,
			default: !0
		},
		size: { default: 32 },
		color: {},
		tip: {},
		fullscreen: {
			type: Boolean,
			default: !1
		},
		delay: { default: 0 },
		indicator: { default: "ring" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(r) {
		let a = r, u = Zt(), d = An(), p = Fi("mc-spin-grad"), m = N(a.loading && a.delay === 0), h;
		function g() {
			h !== void 0 && (clearTimeout(h), h = void 0), a.loading ? a.delay <= 0 ? m.value = !0 : (m.value = !1, h = setTimeout(() => {
				m.value = !0;
			}, a.delay)) : m.value = !1;
		}
		G(() => [a.loading, a.delay], g, { immediate: !0 });
		let _ = Tn({ active: i(() => a.fullscreen && m.value) });
		E(() => {
			h !== void 0 && clearTimeout(h);
		});
		let v = i(() => typeof a.size == "number" ? `${a.size}px` : a.size), y = i(() => Z("mc-spin", `mc-spin--${a.indicator}`, {
			"is-fullscreen": a.fullscreen,
			"is-visible": m.value,
			"is-disabled": a.disabled
		}, a.customClass)), b = i(() => {
			let e = { "--mc-spin-size": v.value };
			a.fullscreen && (e.zIndex = String(_.value));
			let t = St(a.color);
			return t && (e["--mc-spin-color"] = t), e;
		}), S = i(() => `url(#${p})`);
		return (i, a) => (A(), o(t, {
			to: "body",
			disabled: !r.fullscreen
		}, [l("div", x({
			class: y.value,
			style: b.value
		}, B(d), {
			role: "status",
			"aria-live": "polite",
			"aria-busy": r.loading || void 0,
			"aria-disabled": r.disabled || void 0
		}), [r.fullscreen ? (A(), c("div", aS)) : s("", !0), f(n, { name: "mc-spin-fade" }, {
			default: ee(() => [m.value ? (A(), c("div", oS, [
				l("div", sS, [r.indicator === "ring" ? (A(), c(e, { key: 0 }, [(A(), c("svg", cS, [
					l("defs", null, [l("linearGradient", {
						id: B(p),
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%"
					}, [...a[0] || (a[0] = [
						l("stop", {
							offset: "0%",
							"stop-color": "hsl(var(--mc-h) var(--mc-s) 64%)"
						}, null, -1),
						l("stop", {
							offset: "55%",
							"stop-color": "hsl(var(--mc-h2) var(--mc-s2) 62%)"
						}, null, -1),
						l("stop", {
							offset: "100%",
							"stop-color": "hsl(var(--mc-h3) var(--mc-s3) 62%)"
						}, null, -1)
					])], 8, lS)]),
					a[1] || (a[1] = l("circle", {
						class: "mc-spin__ring-track",
						cx: "22",
						cy: "22",
						r: "18"
					}, null, -1)),
					l("circle", {
						class: "mc-spin__ring-arc",
						cx: "22",
						cy: "22",
						r: "18",
						stroke: S.value
					}, null, 8, uS)
				])), a[2] || (a[2] = l("span", { class: "mc-spin__ring-core" }, null, -1))], 64)) : r.indicator === "dots" ? (A(), c(e, { key: 1 }, [
					a[3] || (a[3] = l("span", {
						class: "mc-spin__dot",
						style: { "--i": "0" }
					}, null, -1)),
					a[4] || (a[4] = l("span", {
						class: "mc-spin__dot",
						style: { "--i": "1" }
					}, null, -1)),
					a[5] || (a[5] = l("span", {
						class: "mc-spin__dot",
						style: { "--i": "2" }
					}, null, -1))
				], 64)) : r.indicator === "bars" ? (A(), c(e, { key: 2 }, [
					a[6] || (a[6] = l("span", {
						class: "mc-spin__bar",
						style: { "--i": "0" }
					}, null, -1)),
					a[7] || (a[7] = l("span", {
						class: "mc-spin__bar",
						style: { "--i": "1" }
					}, null, -1)),
					a[8] || (a[8] = l("span", {
						class: "mc-spin__bar",
						style: { "--i": "2" }
					}, null, -1))
				], 64)) : (A(), c(e, { key: 3 }, [a[9] || (a[9] = l("span", { class: "mc-spin__orbit-track" }, null, -1)), a[10] || (a[10] = l("span", { class: "mc-spin__orbit-dot" }, null, -1))], 64))]),
				r.tip ? (A(), c("p", dS, R(r.tip), 1)) : s("", !0),
				l("span", fS, R(B(u).spin?.loading ?? "Loading"), 1)
			])) : s("", !0)]),
			_: 1
		})], 16, iS)], 8, ["disabled"]));
	}
}), [["__scopeId", "data-v-834f2cd5"]]), mS = ["data-mc-color-mode"], hS = [
	"aria-orientation",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-disabled",
	"aria-label"
], gS = {
	class: "mc-split__grip mc-aurora-inset",
	"aria-hidden": "true"
}, _S = ["data-mc-color-mode"], vS = 5, yS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSplit",
	__name: "Split",
	props: {
		direction: { default: "horizontal" },
		variant: { default: "soft" },
		gutter: { default: 8 },
		divider: { default: "auto" },
		panePadding: {},
		firstMode: { default: "auto" },
		secondMode: { default: "auto" },
		size: { default: 50 },
		min: { default: 10 },
		max: { default: 90 },
		collapsible: {
			type: Boolean,
			default: !0
		},
		resizable: {
			type: Boolean,
			default: !0
		},
		firstPaneStyle: {},
		secondPaneStyle: {},
		customClass: {}
	},
	emits: [
		"update:size",
		"resize",
		"collapse"
	],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, o = N(null), s = N(n.size), u = N(!1), d = N(!1), p = N(n.size);
		function m(e) {
			return Ot(e, Math.min(n.min, n.max), Math.max(n.min, n.max));
		}
		function h(e, t = !1) {
			let n = m(e);
			s.value = n, t || (a("update:size", n), a("resize", n));
		}
		let g = 0;
		function _() {
			g && (cancelAnimationFrame(g), g = 0);
		}
		function v(e, t) {
			let r = o.value;
			if (!r) return s.value;
			let i = r.getBoundingClientRect();
			return n.direction === "horizontal" ? i.width ? (e - i.left) / i.width * 100 : s.value : i.height ? (t - i.top) / i.height * 100 : s.value;
		}
		function y(e) {
			d.value && h(v(e.clientX, e.clientY));
		}
		function b() {
			d.value && (d.value = !1, wt && (window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b)), x());
		}
		function x() {
			let e = m(Math.round(s.value / vS) * vS);
			if (Math.abs(e - s.value) < .01) return;
			_();
			let t = s.value, n = e - t, r = performance.now(), i = (o) => {
				let c = Math.min(1, (o - r) / 260), l = 1 - (1 - c) ** 3;
				s.value = t + n * l, c < 1 ? g = requestAnimationFrame(i) : (g = 0, s.value = e, a("update:size", e), a("resize", e));
			};
			g = requestAnimationFrame(i);
		}
		function S(e) {
			n.resizable && !u.value && (e.preventDefault(), e.currentTarget.focus(), d.value = !0, _(), wt && (window.addEventListener("pointermove", y), window.addEventListener("pointerup", b)));
		}
		function w() {
			n.collapsible && (u.value ? (u.value = !1, h(p.value)) : (p.value = s.value, u.value = !0, h(0)), a("collapse", u.value));
		}
		function D(e) {
			if (!n.resizable) return;
			let t = e.shiftKey ? 10 : 1, r = n.direction === "horizontal" ? "ArrowLeft" : "ArrowUp", i = n.direction === "horizontal" ? "ArrowRight" : "ArrowDown";
			e.key === r ? (e.preventDefault(), h(s.value - t)) : e.key === i ? (e.preventDefault(), h(s.value + t)) : e.key === "Home" ? (e.preventDefault(), h(n.min)) : e.key === "End" ? (e.preventDefault(), h(n.max)) : e.key === "Enter" && (e.preventDefault(), w());
		}
		G(() => n.size, (e) => {
			d.value || (s.value = m(e));
		}), E(() => {
			_(), wt && (window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b));
		});
		let O = i(() => {
			let e = n.firstPaneStyle ?? {}, t = {};
			return (n.direction === "horizontal" ? e.width !== void 0 : e.height !== void 0) || (t.flex = `0 0 calc(max(0px, ${s.value}% - ${M.value / 2}px))`), {
				...t,
				...e
			};
		}), k = i(() => ({
			flex: "1 1 0%",
			minWidth: 0,
			minHeight: 0,
			...n.secondPaneStyle ?? {}
		})), j = i(() => n.divider === "auto" ? n.variant === "hard" ? "hairline" : "pill" : n.divider), M = i(() => {
			switch (j.value) {
				case "none": return 0;
				case "hairline": return 1;
				case "ink": return 2;
				default: return Math.max(0, n.gutter);
			}
		}), P = i(() => {
			let e = { "--mc-split-gutter": `${M.value}px` };
			return n.panePadding !== void 0 && n.panePadding !== null && n.panePadding !== "" && (e["--mc-split-pane-pad"] = typeof n.panePadding == "number" ? `${n.panePadding}px` : n.panePadding), e;
		}), I = i(() => Z("mc-split", `mc-split--${n.direction}`, `mc-split--${n.variant}`, `mc-split--divider-${j.value}`, {
			"is-dragging": d.value,
			"is-collapsed": u.value,
			"is-disabled": !n.resizable
		}, n.customClass));
		return (t, n) => (A(), c("div", {
			ref_key: "container",
			ref: o,
			class: C(I.value),
			style: T(P.value)
		}, [
			l("div", {
				class: "mc-split__pane mc-split__pane--first",
				style: T(O.value),
				"data-mc-color-mode": e.firstMode === "auto" ? void 0 : e.firstMode
			}, [F(t.$slots, "first", {}, void 0, !0)], 12, mS),
			l("div", {
				class: "mc-split__bar",
				role: "separator",
				tabindex: "0",
				"aria-orientation": e.direction === "horizontal" ? "vertical" : "horizontal",
				"aria-valuenow": Math.round(s.value),
				"aria-valuemin": e.min,
				"aria-valuemax": e.max,
				"aria-disabled": e.resizable ? void 0 : "true",
				"aria-label": e.collapsible ? B(r).split?.resize ?? "Resize panes" : void 0,
				onPointerdown: S,
				onDblclick: w,
				onKeydown: D
			}, [n[0] || (n[0] = l("span", {
				class: "mc-split__sheen",
				"aria-hidden": "true"
			}, null, -1)), l("span", gS, [f($, {
				name: e.direction === "horizontal" ? "grip-vertical" : "grip",
				size: 14
			}, null, 8, ["name"])])], 40, hS),
			l("div", {
				class: "mc-split__pane mc-split__pane--second",
				style: T(k.value),
				"data-mc-color-mode": e.secondMode === "auto" ? void 0 : e.secondMode
			}, [F(t.$slots, "second", {}, void 0, !0)], 12, _S)
		], 6));
	}
}), [["__scopeId", "data-v-dab8acae"]]), bS = {
	key: 0,
	class: "mc-statistic__title"
}, xS = { class: "mc-statistic__row" }, SS = {
	class: "mc-statistic__value mc-sheen-sweep",
	"data-mc-type": "readout"
}, CS = {
	key: 0,
	class: "mc-statistic__affix"
}, wS = {
	key: 1,
	class: "mc-statistic__affix"
}, TS = { class: "mc-statistic__trend-value" }, ES = {
	key: 1,
	class: "mc-statistic__trend-suffix"
}, DS = {
	key: 1,
	class: "mc-statistic__description"
}, OS = {
	key: 2,
	class: "mc-statistic__sparkline"
}, kS = {
	key: 3,
	class: "mc-statistic__footer"
}, AS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiStatistic",
	__name: "Statistic",
	props: {
		value: {},
		title: {},
		description: {},
		trend: {},
		precision: { default: 0 },
		prefix: {},
		suffix: {},
		size: { default: "medium" },
		color: {},
		animated: {
			type: Boolean,
			default: !0
		},
		duration: { default: 900 },
		separator: {
			type: Boolean,
			default: !0
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => {
			let e = t.value;
			if (typeof e == "number") return Number.isFinite(e) ? e : 0;
			let n = Number.parseFloat(String(e).replace(/[^0-9.eE+-]/g, ""));
			return Number.isFinite(n) ? n : 0;
		}), r = i(() => typeof t.value == "number" || String(t.value).trim() !== "" && Number.isFinite(Number.parseFloat(String(t.value)))), { display: a } = Ru(i(() => n.value), {
			duration: t.duration,
			decimals: t.precision,
			from: 0
		}), u = i(() => {
			if (!t.animated || !r.value) return String(t.value ?? "");
			let e = a.value;
			return t.separator ? e : e.replace(/,/g, "");
		}), d = i(() => {
			let e = t.trend;
			if (!e) return null;
			if (typeof e == "string") return {
				text: e,
				direction: "up",
				suffix: ""
			};
			let n = e.direction ?? (e.value < 0 ? "down" : "up"), r = Math.abs(e.value);
			return {
				text: Number.isInteger(r) ? String(r) : r.toFixed(t.precision > 0 ? t.precision : 1),
				direction: n,
				suffix: e.suffix ?? ""
			};
		}), f = i(() => Z("mc-statistic", "mc-grain-overlay", `mc-statistic--${t.size}`, { "is-animated": t.animated && r.value }, t.customClass)), p = i(() => St(t.color) ? { color: St(t.color) } : void 0), m = i(() => String(t.value ?? ""));
		return (t, n) => (A(), c("div", {
			class: C(f.value),
			"aria-live": "polite"
		}, [
			e.title ? (A(), c("span", bS, R(e.title), 1)) : s("", !0),
			l("div", xS, [l("span", SS, [
				e.prefix ? (A(), c("span", CS, R(e.prefix), 1)) : s("", !0),
				(A(), c("span", {
					key: m.value,
					class: C(["mc-statistic__number mc-statistic__number--gradient", { "is-plain": !!e.color }]),
					style: T(p.value)
				}, R(u.value), 7)),
				e.suffix ? (A(), c("span", wS, R(e.suffix), 1)) : s("", !0)
			]), d.value ? (A(), c("span", {
				key: 0,
				class: C(["mc-statistic__trend", [`mc-statistic__trend--${d.value.direction}`, { "is-plain": typeof e.trend == "string" }]])
			}, [
				typeof e.trend == "string" ? s("", !0) : (A(), o($, {
					key: 0,
					name: d.value.direction === "up" ? "arrow-up" : "arrow-down",
					size: 12,
					"stroke-width": 2.4
				}, null, 8, ["name"])),
				l("span", TS, R(d.value.text), 1),
				d.value.suffix ? (A(), c("span", ES, R(d.value.suffix), 1)) : s("", !0)
			], 2)) : s("", !0)]),
			e.description ? (A(), c("p", DS, R(e.description), 1)) : s("", !0),
			t.$slots.sparkline ? (A(), c("div", OS, [F(t.$slots, "sparkline", {}, void 0, !0)])) : s("", !0),
			t.$slots.footer ? (A(), c("div", kS, [F(t.$slots, "footer", {}, void 0, !0)])) : s("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-200b933c"]]), jS = ["aria-current"], MS = [
	"disabled",
	"aria-current",
	"aria-label",
	"onClick"
], NS = { class: "mc-steps__node-inner" }, PS = {
	key: 1,
	class: "mc-steps__index"
}, FS = {
	key: 0,
	class: "mc-steps__grain mc-grain-overlay",
	"aria-hidden": "true"
}, IS = { class: "mc-steps__content" }, LS = {
	class: "mc-steps__title",
	"data-mc-type": "title"
}, RS = {
	key: 0,
	class: "mc-steps__description"
}, zS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSteps",
	__name: "Steps",
	props: {
		steps: {},
		modelValue: { default: 0 },
		direction: { default: "horizontal" },
		status: { default: "process" },
		clickable: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => {
			let e = Math.round(r.modelValue || 0);
			return Math.min(Math.max(0, e), Math.max(0, r.steps.length - 1));
		});
		function d(e, t) {
			return e.status ? e.status : t < u.value ? "finish" : t === u.value ? r.status : "wait";
		}
		function f(e) {
			return e === r.steps.length - 1;
		}
		function p(e) {
			return +(e < u.value);
		}
		let m = i(() => r.steps.map((e, t) => {
			let n = d(e, t);
			return e.icon ? {
				icon: e.icon,
				text: ""
			} : n === "finish" ? {
				icon: "check",
				text: ""
			} : n === "error" ? {
				icon: "close",
				text: ""
			} : {
				icon: null,
				text: String(t + 1)
			};
		}));
		function h(e) {
			r.clickable && (a("update:modelValue", e), a("change", e));
		}
		let g = i(() => Z("mc-steps", `mc-steps--${r.direction}`, { "is-clickable": r.clickable }, r.customClass));
		return (n, r) => (A(), c("ol", {
			class: C(g.value),
			role: "list"
		}, [(A(!0), c(e, null, P(t.steps, (e, n) => (A(), c("li", {
			key: n,
			class: C(["mc-steps__step", {
				"is-active": n === u.value,
				"is-finish": d(e, n) === "finish",
				"is-error": d(e, n) === "error",
				"is-wait": d(e, n) === "wait"
			}]),
			"aria-current": n === u.value ? "step" : void 0
		}, [
			l("button", {
				type: "button",
				class: C(["mc-steps__node mc-sheen-sweep", { "is-disabled": !t.clickable }]),
				disabled: !t.clickable,
				"aria-current": n === u.value ? "step" : void 0,
				"aria-label": `Step ${n + 1}: ${e.title}`,
				onClick: (e) => h(n)
			}, [l("span", NS, [m.value[n].icon ? (A(), o($, {
				key: 0,
				name: m.value[n].icon ?? "circle",
				size: 16,
				"stroke-width": 2.4
			}, null, 8, ["name"])) : (A(), c("span", PS, R(m.value[n].text), 1))]), n === u.value ? (A(), c("span", FS)) : s("", !0)], 10, MS),
			f(n) ? s("", !0) : (A(), c("div", {
				key: 0,
				class: "mc-steps__connector",
				"aria-hidden": "true",
				style: T({ "--mc-fill-scale": p(n) })
			}, [...r[0] || (r[0] = [l("span", { class: "mc-steps__connector-track" }, null, -1), l("span", { class: "mc-steps__connector-fill" }, null, -1)])], 4)),
			l("div", IS, [l("div", LS, R(e.title), 1), e.description ? (A(), c("div", RS, R(e.description), 1)) : s("", !0)])
		], 10, jS))), 128))], 2));
	}
}), [["__scopeId", "data-v-3dee8894"]]), BS = [
	"aria-checked",
	"aria-disabled",
	"disabled"
], VS = {
	key: 0,
	class: "mc-switch__spinner",
	"aria-hidden": "true"
}, HS = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiSwitch",
	inheritAttrs: !1,
	__name: "Switch",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		color: { default: "default" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = V(), o = i(() => {
			let { class: e, style: t, ...n } = a;
			return n;
		}), d = i(() => n.modelValue === !0);
		function f() {
			if (n.disabled || n.loading) return;
			let e = !d.value;
			r("update:modelValue", e), r("change", e);
		}
		let p = i(() => Z("mc-switch", "mc-sheen-sweep", `mc-switch--${n.size}`, `mc-switch--${n.color}`, {
			"is-on": d.value,
			"is-disabled": n.disabled,
			"is-loading": n.loading
		})), m = i(() => Z(p.value, a.class, n.customClass)), h = i(() => a.style);
		return (t, n) => (A(), c("button", x(o.value, {
			type: "button",
			role: "switch",
			class: m.value,
			style: h.value,
			"aria-checked": d.value,
			"aria-disabled": e.disabled || e.loading || void 0,
			disabled: e.disabled || e.loading,
			onClick: f
		}), [n[1] || (n[1] = u("<span class=\"mc-switch__track\" aria-hidden=\"true\" data-v-c8d926c0><span class=\"mc-switch__grain mc-grain-overlay\" data-v-c8d926c0></span></span><span class=\"mc-switch__knob-wrap\" aria-hidden=\"true\" data-v-c8d926c0><span class=\"mc-switch__knob\" data-v-c8d926c0><span class=\"mc-switch__knob-core\" data-v-c8d926c0></span></span></span>", 2)), e.loading ? (A(), c("span", VS, [...n[0] || (n[0] = [l("svg", {
			viewBox: "0 0 24 24",
			width: "1em",
			height: "1em"
		}, [l("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.4",
			"stroke-linecap": "round",
			"stroke-dasharray": "42 60"
		})], -1)])])) : s("", !0)], 16, BS));
	}
}), [["__scopeId", "data-v-c8d926c0"]]), US = ["aria-disabled"], WS = {
	key: 0,
	class: "mc-table__caption"
}, GS = { class: "mc-table__head" }, KS = { class: "mc-table__head-row" }, qS = ["aria-sort"], JS = ["aria-label", "onClick"], YS = { class: "mc-table__th-text" }, XS = {
	key: 1,
	class: "mc-table__th-text"
}, ZS = { class: "mc-table__body" }, QS = ["onClick", "onKeydown"], $S = {
	key: 0,
	class: "mc-table__row mc-table__row--empty"
}, eC = ["colspan"], tC = {
	class: "mc-table__empty-icon",
	"aria-hidden": "true"
}, nC = { class: "mc-table__empty-text" }, rC = 140, iC = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTable",
	__name: "Table",
	props: {
		columns: { default: () => [] },
		data: { default: () => [] },
		rowKey: {
			type: [String, Function],
			default: "id"
		},
		striped: {
			type: Boolean,
			default: !1
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		hoverable: {
			type: Boolean,
			default: !0
		},
		size: { default: "medium" },
		variant: { default: "plain" },
		caption: {},
		sortKey: {},
		sortOrder: { default: null },
		emptyText: { default: "No data" },
		maxHeight: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["sort", "row-click"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = N(null), u = i(() => r.sortKey === void 0 ? o.value : r.sortOrder ? {
			key: r.sortKey,
			order: r.sortOrder
		} : null);
		function p(e) {
			if (!e.sortable) return;
			let t = u.value, n = t && t.key === e.key && t.order === "asc" ? "desc" : "asc";
			o.value = {
				key: e.key,
				order: n
			}, a("sort", {
				key: e.key,
				order: n
			});
		}
		function m(e) {
			return u.value?.key === e.key;
		}
		let h = i(() => {
			let e = u.value;
			if (!e) return r.data;
			let t = e.order === "desc" ? -1 : 1;
			return [...r.data].sort((n, r) => {
				let i = n?.[e.key], a = r?.[e.key];
				return i === a ? 0 : i == null ? 1 : a == null ? -1 : (i > a ? 1 : -1) * t;
			});
		});
		function g(e) {
			let t = u.value;
			return t && t.key === e.key ? t.order : null;
		}
		function _(e) {
			if (!e.sortable) return;
			let t = g(e);
			return t === "asc" ? "ascending" : t === "desc" ? "descending" : "none";
		}
		function v(e, t) {
			return typeof r.rowKey == "function" ? r.rowKey(e, t) : e?.[r.rowKey] ?? t;
		}
		function y(e, t) {
			return e?.[t.key];
		}
		function b(e, t) {
			r.disabled || a("row-click", e, t);
		}
		function x(e) {
			if (typeof e.width == "number") return e.width;
			if (typeof e.width == "string") {
				let t = parseFloat(e.width);
				return Number.isFinite(t) ? t : rC;
			}
			return rC;
		}
		let S = i(() => r.columns.map((e) => e.width === void 0 ? e.fixed ? `${rC}px` : void 0 : typeof e.width == "number" ? `${e.width}px` : e.width)), w = i(() => r.columns.some((e) => !!e.fixed)), E = i(() => {
			let e = 0, t = r.columns.filter((e) => e.fixed === "right"), n = t.reduce((e, t) => e + x(t), 0), i = 0, a = /* @__PURE__ */ new Map();
			t.forEach((e, t) => {
				i += x(e), a.set(t, n - i);
			});
			let o = 0;
			return r.columns.map((t) => {
				let n = {};
				if (t.width !== void 0) {
					let e = typeof t.width == "number" ? `${t.width}px` : t.width;
					n.width = e, n.minWidth = e;
				}
				return t.fixed === "left" ? (n.left = `${e}px`, e += x(t)) : t.fixed === "right" && (n.right = `${a.get(o) ?? 0}px`, o += 1), n;
			});
		}), D = i(() => Z("mc-table", "mc-grain-overlay", `mc-table--${r.variant}`, `mc-table--${r.size}`, {
			"is-striped": r.striped,
			"is-bordered": r.bordered,
			"is-hoverable": r.hoverable,
			"is-disabled": r.disabled
		}, r.customClass)), O = i(() => r.maxHeight === void 0 ? void 0 : { maxHeight: typeof r.maxHeight == "number" ? `${r.maxHeight}px` : r.maxHeight });
		return (n, r) => (A(), c("div", {
			class: C(D.value),
			"aria-disabled": t.disabled ? "true" : void 0
		}, [l("div", {
			class: "mc-table__scroll mc-scroll",
			style: T(O.value)
		}, [l("table", { class: C(["mc-table__table", { "is-fixed-layout": w.value }]) }, [
			t.caption ? (A(), c("caption", WS, R(t.caption), 1)) : s("", !0),
			l("colgroup", null, [(A(!0), c(e, null, P(t.columns, (e, t) => (A(), c("col", {
				key: e.key,
				style: T(S.value[t] ? { width: S.value[t] } : void 0)
			}, null, 4))), 128))]),
			l("thead", GS, [l("tr", KS, [(A(!0), c(e, null, P(t.columns, (e, t) => (A(), c("th", {
				key: e.key,
				scope: "col",
				class: C(["mc-table__th mc-sheen-sweep", {
					"is-sortable": !!e.sortable,
					"is-sorted": m(e),
					"is-fixed": !!e.fixed,
					"is-fixed-left": e.fixed === "left",
					"is-fixed-right": e.fixed === "right"
				}]),
				style: T(E.value[t]),
				"aria-sort": _(e)
			}, [e.sortable ? (A(), c("button", {
				key: 0,
				type: "button",
				class: "mc-table__sort-btn",
				"aria-label": `Sort by ${e.title ?? e.key}`,
				onClick: (t) => p(e)
			}, [l("span", YS, R(e.title ?? e.key), 1), l("span", {
				class: C(["mc-table__sort", {
					"is-asc": g(e) === "asc",
					"is-desc": g(e) === "desc"
				}]),
				"aria-hidden": "true"
			}, [f($, {
				name: "chevron-up",
				size: 14,
				"stroke-width": 2.4
			})], 2)], 8, JS)) : (A(), c("span", XS, R(e.title ?? e.key), 1))], 14, qS))), 128))])]),
			l("tbody", ZS, [(A(!0), c(e, null, P(h.value, (r, i) => (A(), c("tr", {
				key: v(r, i),
				class: "mc-table__row",
				style: T({ "--i": i }),
				tabindex: "0",
				role: "button",
				onClick: (e) => b(r, i),
				onKeydown: [K(q((e) => b(r, i), ["prevent"]), ["enter"]), K(q((e) => b(r, i), ["prevent"]), ["space"])]
			}, [(A(!0), c(e, null, P(t.columns, (e, t) => (A(), c("td", {
				key: e.key,
				class: C(["mc-table__cell", [`is-align-${e.align ?? "left"}`, {
					"is-fixed": !!e.fixed,
					"is-fixed-left": e.fixed === "left",
					"is-fixed-right": e.fixed === "right"
				}]]),
				style: T(E.value[t])
			}, [F(n.$slots, e.key, {
				row: r,
				index: i,
				value: y(r, e)
			}, () => [d(R(y(r, e)), 1)], !0)], 6))), 128))], 44, QS))), 128)), t.data.length ? s("", !0) : (A(), c("tr", $S, [l("td", {
				class: "mc-table__empty mc-aurora-inset",
				colspan: t.columns.length,
				role: "status"
			}, [l("span", tC, [f($, {
				name: "box",
				size: 26,
				"stroke-width": 1.6
			})]), l("span", nC, R(t.emptyText), 1)], 8, eC)]))])
		], 2)], 4)], 10, US));
	}
}), [["__scopeId", "data-v-f033e94d"]]), aC = {
	key: 0,
	class: "mc-tabs__grain mc-grain-overlay",
	"aria-hidden": "true"
}, oC = [
	"id",
	"aria-selected",
	"aria-controls",
	"aria-labelledby",
	"aria-disabled",
	"tabindex",
	"onClick",
	"onKeydown"
], sC = ["id"], cC = [
	"aria-label",
	"disabled",
	"onClick"
], lC = ["aria-label"], uC = ["id", "aria-labelledby"], dC = 3, fC = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTabs",
	__name: "Tabs",
	props: {
		tabs: { default: () => [] },
		modelValue: {},
		type: { default: "line" },
		animated: {
			type: Boolean,
			default: !0
		},
		stretch: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		teleport: {
			type: [Boolean, String],
			default: !1
		},
		closable: {
			type: Boolean,
			default: !1
		},
		onClose: {},
		addable: {
			type: Boolean,
			default: !1
		},
		onAdd: {},
		lazy: {
			type: Boolean,
			default: !1
		},
		fill: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(n, { emit: r }) {
		let a = n, u = Zt(), p = An(), m = r, h = Fi("mc-tabs"), g = N(null), _ = /* @__PURE__ */ new Map(), v = N({
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			ready: !1
		}), y = N(1), b = N(!1), w = N(/* @__PURE__ */ new Set()), D = N(""), k = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			ready: !1
		}, j = 0, M = null;
		function I(e, t) {
			t instanceof HTMLElement ? _.set(e, t) : _.delete(e);
		}
		let L = i(() => {
			let e = a.modelValue;
			if (e == null) return a.tabs[0]?.key ?? "";
			if (e === "") return "";
			if (a.tabs.some((t) => t.key === e)) return e;
			let t = D.value;
			return t && a.tabs.some((e) => e.key === t) ? t : e;
		}), z = i(() => a.tabs.map((e) => ({
			tab: e,
			mounted: !a.lazy || w.value.has(e.key)
		}))), V = i(() => typeof a.teleport == "string" ? a.teleport : "body");
		function H(e) {
			return !!e.disabled;
		}
		function U(e) {
			return a.closable && e.closable !== !1;
		}
		function ee(e) {
			H(e) || e.key !== a.modelValue && (m("update:modelValue", e.key), m("change", e.key));
		}
		function J(e, t) {
			if (!e.length) return;
			let n = a.tabs[t - 1];
			return n && e.some((e) => e.key === n.key) ? n : e[0];
		}
		function ne(e, t) {
			if (H(e) || a.onClose?.(e.key, t) === !1) return;
			let n = J(a.tabs.filter((e, n) => n !== t), t);
			if (e.key === L.value) {
				let e = n?.key ?? "";
				D.value = e, m("update:modelValue", e), m("change", e);
			}
			S(ie);
		}
		function re() {
			a.onAdd?.();
		}
		function ie() {
			let e = _.get(L.value), t = g.value;
			if (!e || !t) {
				v.value = {
					...v.value,
					ready: !1
				};
				return;
			}
			let n = a.type === "line", r = {
				left: e.offsetLeft,
				top: n ? e.offsetTop + e.offsetHeight : e.offsetTop,
				width: e.offsetWidth,
				height: n ? dC : e.offsetHeight,
				ready: !0
			};
			j && (cancelAnimationFrame(j), j = 0, b.value = !1, y.value = 1, k = {
				...v.value,
				ready: !0
			}), !k.ready || k.width === r.width ? (k = r, v.value = r, y.value = 1) : (b.value = !0, v.value = {
				...r,
				left: k.left,
				top: k.top
			}, y.value = k.width / r.width, S(() => {
				t.offsetWidth, j = requestAnimationFrame(() => {
					j = 0, b.value = !1, v.value = r, y.value = 1, k = r;
				});
			}));
		}
		G([
			L,
			() => a.type,
			() => a.size
		], () => S(ie)), G(L, (e) => {
			e && !w.value.has(e) && (w.value = new Set(w.value).add(e));
		}, { immediate: !0 }), G(() => a.lazy, (e) => {
			if (!e) return;
			let t = new Set(w.value);
			for (let e of a.tabs) t.add(e.key);
			w.value = t;
		});
		let Y = new Set(a.tabs.map((e) => e.key));
		G(() => a.tabs, (e) => {
			let t = new Set(e.map((e) => e.key)), n = [...Y].some((e) => !t.has(e));
			Y = t;
			let r = a.modelValue;
			if (n && r && !t.has(r)) {
				let n = D.value, r = (n && t.has(n) ? n : "") || e[0]?.key || "";
				D.value = r, m("update:modelValue", r), m("change", r);
			}
			S(ie);
		}, { deep: !0 }), O(() => {
			S(ie), wt && (window.addEventListener("resize", ae), g.value && typeof ResizeObserver < "u" && (M = new ResizeObserver(() => S(ie)), M.observe(g.value)));
		}), E(() => {
			wt && window.removeEventListener("resize", ae), M?.disconnect(), M = null, j && (cancelAnimationFrame(j), j = 0);
		});
		function ae() {
			S(ie);
		}
		function oe(e) {
			let t = g.value;
			if (!t || e.deltaY === 0 || e.deltaX !== 0 || t.scrollWidth <= t.clientWidth) return;
			let n = t.scrollWidth - t.clientWidth, r = t.scrollLeft + e.deltaY;
			r <= 0 || r >= n || (e.preventDefault(), t.scrollLeft = r);
		}
		function se(e) {
			if (![
				"ArrowLeft",
				"ArrowRight",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = a.tabs.filter((e) => !H(e));
			if (!t.length) return;
			e.preventDefault();
			let n = t.findIndex((e) => e.key === L.value), r = n;
			e.key === "ArrowRight" ? r = n + 1 : e.key === "ArrowLeft" ? r = n - 1 : e.key === "Home" ? r = 0 : e.key === "End" && (r = t.length - 1), r < 0 && (r = 0), r >= t.length && (r = t.length - 1);
			let i = t[r];
			i && (ee(i), S(() => _.get(i.key)?.focus()));
		}
		let ce = i(() => {
			let e = {
				width: `${v.value.width}px`,
				height: `${v.value.height}px`,
				transform: `translate(${v.value.left}px, ${v.value.top}px) scaleX(${y.value})`,
				opacity: +!!v.value.ready
			};
			return b.value && (e.transition = "none"), e;
		}), le = i(() => Z("mc-tabs", `mc-tabs--${a.type}`, `mc-tabs--${a.size}`, {
			"is-animated": a.animated,
			"is-stretch": a.stretch,
			"mc-tabs--fill": a.fill
		}, a.customClass));
		return (r, i) => (A(), c("div", { class: C(le.value) }, [l("div", {
			ref_key: "nav",
			ref: g,
			class: "mc-tabs__nav",
			role: "tablist",
			"aria-orientation": "horizontal",
			onKeydown: se,
			onWheel: oe
		}, [
			n.type === "card" || n.type === "pill" ? (A(), c("span", aC)) : s("", !0),
			l("span", {
				class: "mc-tabs__indicator",
				style: T(ce.value),
				"aria-hidden": "true"
			}, null, 4),
			(A(!0), c(e, null, P(n.tabs, (e, t) => (A(), c("div", {
				id: `${B(h)}-tab-${e.key}`,
				key: e.key,
				ref_for: !0,
				ref: (t) => I(e.key, t),
				role: "tab",
				class: C(["mc-tabs__tab mc-sheen-sweep", {
					"is-active": e.key === L.value,
					"is-disabled": H(e),
					"is-closable": U(e)
				}]),
				"aria-selected": e.key === L.value ? "true" : "false",
				"aria-controls": `${B(h)}-panel-${e.key}`,
				"aria-labelledby": `${B(h)}-label-${e.key}`,
				"aria-disabled": H(e) ? "true" : void 0,
				tabindex: e.key === L.value ? 0 : -1,
				onClick: (t) => ee(e),
				onKeydown: [K(q((t) => ee(e), ["prevent"]), ["enter"]), K(q((t) => ee(e), ["prevent"]), ["space"])]
			}, [
				e.icon ? (A(), o($, {
					key: 0,
					name: e.icon,
					size: 16,
					class: "mc-tabs__icon"
				}, null, 8, ["name"])) : s("", !0),
				l("span", {
					id: `${B(h)}-label-${e.key}`,
					class: "mc-tabs__label"
				}, [F(r.$slots, `${e.key}-label`, { tab: e }, () => [d(R(e.label), 1)], !0)], 8, sC),
				U(e) ? (A(), c("button", {
					key: 1,
					class: "mc-tabs__close",
					type: "button",
					"aria-label": B(u).tabs?.close ?? "Close tab",
					disabled: H(e),
					onClick: q((n) => ne(e, t), ["stop"]),
					onKeydown: [i[0] || (i[0] = K(q(() => {}, ["stop"]), ["enter"])), i[1] || (i[1] = K(q(() => {}, ["stop"]), ["space"]))]
				}, [f($, {
					name: "close",
					size: 16
				})], 40, cC)) : s("", !0)
			], 42, oC))), 128)),
			n.addable ? (A(), c("button", {
				key: 1,
				class: "mc-tabs__add",
				type: "button",
				"aria-label": B(u).tabs?.add ?? "Add tab",
				onClick: re
			}, [f($, {
				name: "plus",
				size: 16
			})], 8, lC)) : s("", !0)
		], 544), (A(), o(t, {
			to: V.value,
			disabled: !n.teleport
		}, [l("div", x({ class: "mc-tabs__panels" }, B(p)), [(A(!0), c(e, null, P(z.value, (t) => (A(), c(e, { key: `panel-${t.tab.key}` }, [t.mounted ? te((A(), c("div", {
			key: 0,
			id: `${B(h)}-panel-${t.tab.key}`,
			class: "mc-tabs__panel mc-scroll",
			role: "tabpanel",
			"aria-labelledby": `${B(h)}-tab-${t.tab.key}`,
			tabindex: "0"
		}, [r.$slots[t.tab.key] ? F(r.$slots, t.tab.key, { tab: t.tab }, void 0, !0, 0) : F(r.$slots, "default", { tab: t.tab }, void 0, !0, 1)], 8, uC)), [[W, t.tab.key === L.value]]) : s("", !0)], 64))), 128))], 16)], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-243109e7"]]), pC = ["tabindex", "aria-disabled"], mC = {
	key: 0,
	class: "mc-tag__dot",
	"aria-hidden": "true"
}, hC = { class: "mc-tag__label" }, gC = ["aria-label", "disabled"], _C = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTag",
	__name: "Tag",
	props: {
		color: { default: "default" },
		variant: { default: "soft" },
		size: { default: "medium" },
		round: {
			type: Boolean,
			default: !0
		},
		bordered: {
			type: Boolean,
			default: !1
		},
		closable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		dot: {
			type: Boolean,
			default: !1
		},
		focusable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["close"],
	setup(e, { emit: t }) {
		let n = e, r = Zt(), a = t, u = N(null);
		function d(e) {
			n.focusable && !n.disabled && bt(e, u.value);
		}
		let p = i(() => Z("mc-tag", `mc-tag--${n.variant}`, `mc-tag--${n.color}`, `mc-tag--${n.size}`, {
			"is-round": n.round,
			"is-bordered": n.bordered,
			"is-closable": n.closable,
			"is-focusable": n.focusable,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (A(), c("span", {
			ref_key: "root",
			ref: u,
			class: C(p.value),
			tabindex: e.focusable ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: q(d, ["self"])
		}, [
			n[1] || (n[1] = l("span", {
				class: "mc-tag__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.dot ? (A(), c("span", mC)) : e.icon ? (A(), o($, {
				key: 1,
				name: e.icon,
				class: "mc-tag__icon"
			}, null, 8, ["name"])) : s("", !0),
			l("span", hC, [F(t.$slots, "default", {}, void 0, !0)]),
			e.closable ? (A(), c("button", {
				key: 2,
				class: "mc-tag__close",
				type: "button",
				"aria-label": B(r).tag?.close ?? "close",
				disabled: e.disabled,
				onClick: n[0] || (n[0] = q((e) => a("close"), ["stop"]))
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, gC)) : s("", !0)
		], 42, pC));
	}
}), [["__scopeId", "data-v-8cc8aef7"]]), vC = [
	"value",
	"rows",
	"placeholder",
	"disabled",
	"maxlength",
	"aria-disabled"
], yC = {
	key: 0,
	class: "mc-textarea__footer"
}, bC = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTextarea",
	inheritAttrs: !1,
	__name: "Textarea",
	props: {
		modelValue: { default: "" },
		rows: { default: 3 },
		autosize: {
			type: [Boolean, Object],
			default: !1
		},
		maxlength: {},
		showCount: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		variant: { default: "filled" },
		size: { default: "medium" },
		placeholder: { default: "" },
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, a = V(), o = i(() => {
			let { class: e, style: t, ...n } = a;
			return n;
		}), u = N(null), d = N(n.modelValue ?? "");
		G(() => n.modelValue, (e) => {
			d.value = e ?? "", b();
		});
		let f = i(() => n.autosize !== !1 && n.autosize !== void 0), p = i(() => {
			let e = n.autosize;
			return typeof e == "object" && e ? e.minRows : n.rows;
		}), m = i(() => {
			let e = n.autosize;
			return typeof e == "object" && e ? e.maxRows : Math.max(n.rows * 6, n.rows);
		}), h = i(() => d.value.length), g = i(() => n.maxlength ? `${h.value}/${n.maxlength}` : String(h.value)), _ = i(() => !!n.maxlength && h.value >= n.maxlength * .9);
		function v() {
			let e = u.value;
			if (!e || !f.value) return;
			let t = getComputedStyle(e), n = parseFloat(t.lineHeight) || 22, r = (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0), i = (parseFloat(t.borderTopWidth) || 0) + (parseFloat(t.borderBottomWidth) || 0), a = p.value * n + r + i, o = m.value * n + r + i;
			e.style.height = "auto";
			let s = e.scrollHeight, c = Math.min(Math.max(s, a), o);
			e.style.height = `${c}px`, e.style.overflowY = s > o ? "auto" : "hidden";
		}
		let y = !1;
		function b() {
			y || (y = !0, S(() => {
				y = !1, v();
			}));
		}
		O(() => b());
		function w(e) {
			let t = e.target;
			d.value = t.value, r("update:modelValue", t.value), b();
		}
		function E(e) {
			let t = e.target;
			d.value = t.value, r("update:modelValue", t.value), r("change", t.value);
		}
		function D(e) {
			r("focus", e);
		}
		function k(e) {
			r("blur", e);
		}
		let j = i(() => Z("mc-textarea", "mc-sheen-sweep", `mc-textarea--${n.variant}`, `mc-textarea--${n.size}`, {
			"is-disabled": n.disabled,
			"is-autosize": f.value
		})), M = i(() => Z(j.value, a.class, n.customClass)), P = i(() => a.style);
		return (t, n) => (A(), c("div", {
			class: C(M.value),
			style: T(P.value)
		}, [
			n[0] || (n[0] = l("span", {
				class: "mc-textarea__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			l("textarea", x({
				ref_key: "field",
				ref: u
			}, o.value, {
				class: "mc-textarea__field",
				value: d.value,
				rows: f.value ? p.value : e.rows,
				placeholder: e.placeholder,
				disabled: e.disabled,
				maxlength: e.maxlength,
				"aria-disabled": e.disabled || void 0,
				onInput: w,
				onChange: E,
				onFocus: D,
				onBlur: k
			}), null, 16, vC),
			e.showCount ? (A(), c("div", yC, [l("span", { class: C(["mc-textarea__count", { "is-near": _.value }]) }, R(g.value), 3)])) : s("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-e6dd1048"]]), xC = ["href"], SC = { class: "mc-thing__body mc-aurora-inset" }, CC = { class: "mc-thing__head" }, wC = {
	class: "mc-thing__title",
	"data-mc-type": "title"
}, TC = {
	key: 0,
	class: "mc-thing__desc"
}, EC = {
	key: 1,
	class: "mc-thing__meta"
}, DC = {
	key: 1,
	class: "mc-thing__value mc-sheen-sweep"
}, OC = { class: "mc-thing__body mc-aurora-inset" }, kC = { class: "mc-thing__head" }, AC = {
	class: "mc-thing__title",
	"data-mc-type": "title"
}, jC = {
	key: 0,
	class: "mc-thing__desc"
}, MC = {
	key: 1,
	class: "mc-thing__meta"
}, NC = {
	key: 1,
	class: "mc-thing__value mc-sheen-sweep"
}, PC = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiThing",
	__name: "Thing",
	props: {
		title: {},
		description: {},
		icon: {},
		image: {},
		value: {},
		meta: { default: () => [] },
		status: { default: "default" },
		statusText: {},
		href: {},
		compact: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = i(() => Z("mc-thing", "mc-grain-overlay", {
			"is-compact": n.compact,
			"is-link": !!n.href
		}, n.customClass));
		return (n, i) => t.href ? (A(), c("a", {
			key: 0,
			href: t.href,
			class: C(r.value)
		}, [
			t.image || t.icon ? (A(), o(Hn, {
				key: 0,
				src: t.image,
				icon: t.icon,
				size: "medium",
				class: "mc-thing__avatar"
			}, null, 8, ["src", "icon"])) : s("", !0),
			l("div", SC, [
				l("div", CC, [l("span", wC, R(t.title), 1), t.statusText ? (A(), c("span", {
					key: 0,
					class: C(["mc-thing__status", `is-${t.status}`])
				}, R(t.statusText), 3)) : s("", !0)]),
				t.description ? (A(), c("p", TC, R(t.description), 1)) : s("", !0),
				t.meta.length ? (A(), c("dl", EC, [(A(!0), c(e, null, P(t.meta, (e, t) => (A(), c("div", {
					key: t,
					class: "mc-thing__meta-item"
				}, [l("dt", null, R(e.label), 1), l("dd", null, R(e.value), 1)]))), 128))])) : s("", !0)
			]),
			t.value !== void 0 && t.value !== "" ? (A(), c("span", DC, R(t.value), 1)) : (A(), o($, {
				key: 2,
				name: "chevron-right",
				size: 16,
				class: "mc-thing__chevron"
			}))
		], 10, xC)) : (A(), c("div", {
			key: 1,
			class: C(r.value)
		}, [
			t.image || t.icon ? (A(), o(Hn, {
				key: 0,
				src: t.image,
				icon: t.icon,
				size: "medium",
				class: "mc-thing__avatar"
			}, null, 8, ["src", "icon"])) : s("", !0),
			l("div", OC, [
				l("div", kC, [l("span", AC, R(t.title), 1), t.statusText ? (A(), c("span", {
					key: 0,
					class: C(["mc-thing__status", `is-${t.status}`])
				}, R(t.statusText), 3)) : s("", !0)]),
				t.description ? (A(), c("p", jC, R(t.description), 1)) : s("", !0),
				t.meta.length ? (A(), c("dl", MC, [(A(!0), c(e, null, P(t.meta, (e, t) => (A(), c("div", {
					key: t,
					class: "mc-thing__meta-item"
				}, [l("dt", null, R(e.label), 1), l("dd", null, R(e.value), 1)]))), 128))])) : s("", !0)
			]),
			t.value !== void 0 && t.value !== "" ? (A(), c("span", NC, R(t.value), 1)) : (A(), o($, {
				key: 2,
				name: "chevron-right",
				size: 16,
				class: "mc-thing__chevron"
			}))
		], 2));
	}
}), [["__scopeId", "data-v-51fa2bd1"]]), FC = ["datetime"], IC = {
	key: 0,
	class: "mc-time__dot mc-sheen-sweep",
	"aria-hidden": "true"
}, LC = { class: "mc-time__text" }, RC = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTime",
	__name: "Time",
	props: {
		value: {},
		format: { default: "YYYY-MM-DD HH:mm:ss" },
		relative: {
			type: Boolean,
			default: !1
		},
		live: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = N(Date.now()), r, a = Zt(), o = [
			[864e5, "day"],
			[36e5, "hour"],
			[6e4, "minute"],
			[1e3, "second"]
		];
		function u(e) {
			try {
				return new Intl.PluralRules(a.value.name).select(e) === "one" ? "one" : "other";
			} catch {
				return e === 1 ? "one" : "other";
			}
		}
		function d(e) {
			if (e == null || e === "") return null;
			let t = e instanceof Date ? e : new Date(e);
			return Number.isNaN(t.getTime()) ? null : t;
		}
		function f(e) {
			return String(e).padStart(2, "0");
		}
		function p(e) {
			let n = {
				YYYY: String(e.getFullYear()),
				MM: f(e.getMonth() + 1),
				DD: f(e.getDate()),
				HH: f(e.getHours()),
				mm: f(e.getMinutes()),
				ss: f(e.getSeconds())
			};
			return t.format.replace(/YYYY|MM|DD|HH|mm|ss/g, (e) => n[e] ?? e);
		}
		function m(e) {
			let t = a.value.time, r = n.value - e.getTime(), i = Math.abs(r);
			if (i < 5e3) return t.now;
			for (let [e, n] of o) if (i >= e) {
				let a = Math.floor(i / e), o = u(a), s = t[n][o] ?? t[n].other;
				return (r > 0 ? t.ago : t.fromNow).replace("{count}", String(a)).replace("{unit}", s);
			}
			return t.now;
		}
		let h = i(() => d(t.value)), g = i(() => {
			let e = h.value;
			return e ? t.relative ? m(e) : p(e) : "—";
		});
		G(() => t.relative || t.live, (e) => {
			r && clearInterval(r), r = void 0, e && (r = setInterval(() => {
				n.value = Date.now();
			}, 1e3));
		}, { immediate: !0 }), E(() => {
			r && clearInterval(r);
		});
		let _ = i(() => Z("mc-time", "mc-grain-overlay", { "is-live": t.live }, t.customClass));
		return (t, n) => (A(), c("time", {
			class: C(_.value),
			datetime: h.value?.toISOString()
		}, [e.live ? (A(), c("span", IC)) : s("", !0), l("span", LC, R(g.value), 1)], 10, FC));
	}
}), [["__scopeId", "data-v-30c4248c"]]), zC = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], BC = { class: "mc-time-picker__affix" }, VC = ["aria-label"], HC = ["id", "aria-label"], UC = { class: "mc-time-picker__wheels" }, WC = {
	key: 0,
	class: "mc-time-picker__meridiem"
}, GC = { class: "mc-time-picker__wheel" }, KC = ["aria-label"], qC = ["aria-selected"], JC = { class: "mc-time-picker__wheel" }, YC = ["aria-label"], XC = ["aria-selected"], ZC = { class: "mc-time-picker__wheel" }, QC = ["aria-label"], $C = ["aria-selected"], ew = { class: "mc-time-picker__footer" }, tw = { class: "mc-time-picker__readout" }, nw = 34, rw = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTimePicker",
	__name: "TimePicker",
	props: {
		modelValue: { default: null },
		format: { default: "HH:mm:ss" },
		use12Hours: {
			type: Boolean,
			default: !1
		},
		minuteStep: { default: 1 },
		placeholder: { default: "Pick a time…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = Zt(), m = An(), h = Fi("mc-time-picker"), g = N(null), _ = N(null), v = N(null), y = N(null), b = N(null), w = N(u.open), { isTop: D } = On({ active: w }), { style: k, transformOrigin: j, update: M, startAutoUpdate: F, stopAutoUpdate: I } = _n(g, _, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: w })
		}), L = N(0), z = N(0), V = N(0), H = N("AM"), U = !1, W = 0;
		G(() => u.open, (e) => {
			w.value = e, e ? (de(), S(() => {
				ge("auto"), M(), F();
			})) : I();
		});
		function te(e) {
			if (e == null || e === "") return null;
			if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
			let t = String(e), n = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(t.trim());
			if (n) {
				let e = /* @__PURE__ */ new Date();
				return e.setHours(Number(n[1]), Number(n[2]), n[3] ? Number(n[3]) : 0, 0), e;
			}
			let r = new Date(t);
			return Number.isNaN(r.getTime()) ? null : r;
		}
		function J(e, t) {
			let n = e.getHours(), r = n % 12 == 0 ? 12 : n % 12, i = {
				HH: String(n).padStart(2, "0"),
				H: String(n),
				hh: String(r).padStart(2, "0"),
				h: String(r),
				mm: String(e.getMinutes()).padStart(2, "0"),
				m: String(e.getMinutes()),
				ss: String(e.getSeconds()).padStart(2, "0"),
				s: String(e.getSeconds()),
				A: n < 12 ? "AM" : "PM",
				a: n < 12 ? "am" : "pm"
			};
			return t.replace(/HH|H|hh|h|mm|m|ss|s|A|a/g, (e) => i[e] ?? e);
		}
		let ne = i(() => te(u.modelValue)), re = i(() => {
			let e = u.format;
			return u.use12Hours && (e = e.replace("HH", "hh").replace("H", "h"), /[Aa]/.test(e) || (e = `${e} A`)), e;
		}), ie = i(() => {
			let e = ne.value;
			return e ? J(e, re.value) : "";
		}), Y = i(() => !!ne.value), ae = i(() => u.use12Hours ? Array.from({ length: 12 }, (e, t) => t + 1) : Array.from({ length: 24 }, (e, t) => t)), oe = i(() => {
			let e = Math.max(1, Math.min(u.minuteStep, 60)), t = [];
			for (let n = 0; n < 60; n += e) t.push(n);
			return t;
		}), se = i(() => Array.from({ length: 60 }, (e, t) => t)), ce = i(() => {
			if (u.use12Hours) {
				let e = L.value % 12 == 0 ? 12 : L.value % 12;
				return Math.max(ae.value.indexOf(e), 0);
			}
			return Math.max(ae.value.indexOf(L.value), 0);
		}), le = i(() => Math.max(oe.value.indexOf(z.value), 0)), ue = i(() => Math.max(se.value.indexOf(V.value), 0));
		function de() {
			let e = ne.value ?? /* @__PURE__ */ new Date();
			L.value = e.getHours(), z.value = e.getMinutes(), V.value = e.getSeconds(), H.value = e.getHours() < 12 ? "AM" : "PM";
		}
		function fe(e) {
			u.disabled && e || w.value !== e && (w.value = e, d("update:open", e), e ? (d("open"), de(), S(() => {
				ge("auto"), M(), F();
			})) : (d("close"), I()));
		}
		function pe() {
			fe(!w.value);
		}
		function me(e) {
			if (!w.value) return;
			let t = e.target;
			t && (g.value?.contains(t) || _.value?.contains(t) || fe(!1));
		}
		O(() => document.addEventListener("mousedown", me)), E(() => {
			document.removeEventListener("mousedown", me), window.clearTimeout(W), I();
		});
		function he() {
			let e = /* @__PURE__ */ new Date();
			e.setHours(L.value, z.value, V.value, 0), d("update:modelValue", e), d("change", e);
		}
		function ge(e = "smooth") {
			U = !0, v.value?.scrollTo({
				top: ce.value * nw,
				behavior: e
			}), y.value?.scrollTo({
				top: le.value * nw,
				behavior: e
			}), b.value?.scrollTo({
				top: ue.value * nw,
				behavior: e
			}), _e();
		}
		function _e() {
			window.clearTimeout(W), W = window.setTimeout(() => {
				U = !1;
			}, 160);
		}
		function X(e) {
			if (_e(), U) return;
			let t = e === "hour" ? v.value : e === "minute" ? y.value : b.value;
			if (!t) return;
			let n = Math.round(t.scrollTop / nw);
			if (e === "hour") {
				let e = ae.value[n];
				if (e === void 0) return;
				let t = u.use12Hours ? H.value === "PM" ? e % 12 + 12 : e % 12 : e;
				if (t === L.value) return;
				L.value = t;
			} else if (e === "minute") {
				let e = oe.value[n];
				if (e === void 0 || e === z.value) return;
				z.value = e;
			} else {
				let e = se.value[n];
				if (e === void 0 || e === V.value) return;
				V.value = e;
			}
			he();
		}
		function ve(e, t) {
			if (e === "hour") {
				let e = ae.value, n = e[(ce.value + t + e.length) % e.length];
				if (n === void 0) return;
				L.value = u.use12Hours ? H.value === "PM" ? n % 12 + 12 : n % 12 : n;
			} else if (e === "minute") {
				let e = oe.value, n = e[(le.value + t + e.length) % e.length];
				if (n === void 0) return;
				z.value = n;
			} else {
				let e = se.value, n = e[(ue.value + t + e.length) % e.length];
				if (n === void 0) return;
				V.value = n;
			}
			he(), S(() => ge("smooth"));
		}
		function ye() {
			H.value = H.value === "AM" ? "PM" : "AM", L.value = H.value === "PM" ? L.value % 12 + 12 : L.value % 12, he();
		}
		function be() {
			let e = /* @__PURE__ */ new Date();
			L.value = e.getHours(), z.value = e.getMinutes(), V.value = e.getSeconds(), H.value = e.getHours() < 12 ? "AM" : "PM", he(), S(() => ge("smooth"));
		}
		function xe() {
			d("update:modelValue", null), d("change", null);
		}
		function Se(e) {
			e.key === "Escape" && w.value && D() ? (e.stopPropagation(), fe(!1)) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), w.value || fe(!0));
		}
		function Ce(e) {
			if (e.key === "Escape" && D()) {
				e.stopPropagation();
				let t = _.value?.contains(document.activeElement) ?? !1;
				fe(!1), t && g.value?.focus({ preventScroll: !0 });
			}
		}
		let we = i(() => typeof u.teleport == "string" ? u.teleport : "body"), Te = i(() => Z("mc-time-picker", `mc-time-picker--${u.variant}`, `mc-time-picker--${u.size}`, {
			"is-open": w.value,
			"is-disabled": u.disabled,
			"is-empty": !Y.value
		}, u.customClass));
		return (i, a) => (A(), c("div", { class: C(Te.value) }, [l("button", {
			ref_key: "trigger",
			ref: g,
			type: "button",
			class: "mc-time-picker__trigger mc-sheen-sweep",
			disabled: r.disabled,
			"aria-disabled": r.disabled || void 0,
			"aria-expanded": w.value,
			"aria-haspopup": "listbox",
			"aria-controls": B(h),
			onClick: pe,
			onKeydown: Se
		}, [
			a[11] || (a[11] = l("span", {
				class: "mc-time-picker__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			f($, {
				name: "clock",
				size: 15,
				class: "mc-time-picker__icon"
			}),
			l("span", { class: C(["mc-time-picker__value", { "is-placeholder": !Y.value }]) }, R(Y.value ? ie.value : r.placeholder), 3),
			l("span", BC, [Y.value ? (A(), c("span", {
				key: 0,
				class: "mc-time-picker__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": B(p).timePicker?.clear ?? "clear",
				onClick: q(xe, ["stop"])
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, VC)) : s("", !0)])
		], 40, zC), (A(), o(t, {
			to: we.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [w.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: _,
				class: "mc-time-picker__panel",
				style: B(k)
			}, B(m), {
				id: B(h),
				role: "dialog",
				"aria-label": B(p).timePicker?.picker ?? "time picker",
				onKeydown: Ce
			}), [l("div", {
				class: "mc-time-picker__inner mc-grain-overlay",
				style: T({ transformOrigin: B(j) })
			}, [l("div", UC, [
				u.use12Hours ? (A(), c("div", WC, [l("button", {
					type: "button",
					class: C(["mc-time-picker__meridiem-btn", { "is-active": H.value === "AM" }]),
					onClick: a[0] || (a[0] = (e) => H.value === "AM" ? null : ye())
				}, " AM ", 2), l("button", {
					type: "button",
					class: C(["mc-time-picker__meridiem-btn", { "is-active": H.value === "PM" }]),
					onClick: a[1] || (a[1] = (e) => H.value === "PM" ? null : ye())
				}, " PM ", 2)])) : s("", !0),
				l("div", GC, [a[14] || (a[14] = l("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), l("div", {
					ref_key: "hourCol",
					ref: v,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": B(p).timePicker?.hours ?? "hours",
					tabindex: "0",
					onScroll: a[2] || (a[2] = (e) => X("hour")),
					onKeydown: [a[3] || (a[3] = K(q((e) => ve("hour", -1), ["prevent"]), ["up"])), a[4] || (a[4] = K(q((e) => ve("hour", 1), ["prevent"]), ["down"]))]
				}, [
					a[12] || (a[12] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(A(!0), c(e, null, P(ae.value, (e) => (A(), c("div", {
						key: e,
						class: C(["mc-time-picker__item", { "is-active": e === ae.value[ce.value] }]),
						role: "option",
						"aria-selected": e === ae.value[ce.value]
					}, R(u.use12Hours ? e : String(e).padStart(2, "0")), 11, qC))), 128)),
					a[13] || (a[13] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, KC)]),
				l("div", JC, [a[17] || (a[17] = l("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), l("div", {
					ref_key: "minuteCol",
					ref: y,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": B(p).timePicker?.minutes ?? "minutes",
					tabindex: "0",
					onScroll: a[5] || (a[5] = (e) => X("minute")),
					onKeydown: [a[6] || (a[6] = K(q((e) => ve("minute", -1), ["prevent"]), ["up"])), a[7] || (a[7] = K(q((e) => ve("minute", 1), ["prevent"]), ["down"]))]
				}, [
					a[15] || (a[15] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(A(!0), c(e, null, P(oe.value, (e) => (A(), c("div", {
						key: e,
						class: C(["mc-time-picker__item", { "is-active": e === oe.value[le.value] }]),
						role: "option",
						"aria-selected": e === oe.value[le.value]
					}, R(String(e).padStart(2, "0")), 11, XC))), 128)),
					a[16] || (a[16] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, YC)]),
				l("div", ZC, [a[20] || (a[20] = l("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), l("div", {
					ref_key: "secondCol",
					ref: b,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": B(p).timePicker?.seconds ?? "seconds",
					tabindex: "0",
					onScroll: a[8] || (a[8] = (e) => X("second")),
					onKeydown: [a[9] || (a[9] = K(q((e) => ve("second", -1), ["prevent"]), ["up"])), a[10] || (a[10] = K(q((e) => ve("second", 1), ["prevent"]), ["down"]))]
				}, [
					a[18] || (a[18] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(A(!0), c(e, null, P(se.value, (e) => (A(), c("div", {
						key: e,
						class: C(["mc-time-picker__item", { "is-active": e === se.value[ue.value] }]),
						role: "option",
						"aria-selected": e === se.value[ue.value]
					}, R(String(e).padStart(2, "0")), 11, $C))), 128)),
					a[19] || (a[19] = l("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, QC)])
			]), l("footer", ew, [l("button", {
				type: "button",
				class: "mc-time-picker__now",
				onClick: be
			}, [f($, {
				name: "timer",
				size: 13
			}), l("span", null, R(B(p).datePicker.now), 1)]), l("span", tw, R(ie.value), 1)])], 4)], 16, HC)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-2dac70fb"]]), iw = [
	"tabindex",
	"aria-disabled",
	"aria-current",
	"onClick",
	"onKeydown"
], aw = {
	key: 0,
	class: "mc-timeline__index",
	"aria-hidden": "true"
}, ow = {
	key: 2,
	class: "mc-timeline__dot"
}, sw = { class: "mc-timeline__body" }, cw = { class: "mc-timeline__head mc-sheen-sweep" }, lw = {
	key: 0,
	class: "mc-timeline__title",
	"data-mc-type": "title"
}, uw = {
	key: 1,
	class: "mc-timeline__time"
}, dw = {
	key: 2,
	class: "mc-timeline__action"
}, fw = {
	key: 0,
	class: "mc-timeline__content"
}, pw = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTimeline",
	__name: "Timeline",
	props: {
		items: { default: () => [] },
		direction: { default: "vertical" },
		reverse: {
			type: Boolean,
			default: !1
		},
		pending: {
			type: Boolean,
			default: !1
		},
		icon: {},
		numbered: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["click"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => {
			let e = r.items.map((e, t) => ({
				...e,
				originalIndex: t,
				isPending: !1
			}));
			return r.pending && e.push({
				title: "Pending",
				isPending: !0,
				originalIndex: -1
			}), r.reverse ? e.reverse() : e;
		});
		function d(e, t) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), !t.disabled && a("click", t, t.originalIndex));
		}
		function f(e, t) {
			return t.isPending ? "…" : String(e + 1).padStart(2, "0");
		}
		let p = i(() => Z("mc-timeline", `mc-timeline--${r.direction}`, { "is-reverse": r.reverse }, r.customClass));
		return (n, r) => (A(), c("ol", { class: C(p.value) }, [(A(!0), c(e, null, P(u.value, (e, r) => (A(), c("li", {
			key: `${e.originalIndex}-${r}`,
			class: C(["mc-timeline__item", {
				"is-pending": e.isPending,
				"is-active": !!e.active,
				"is-disabled": !!e.disabled,
				"has-icon": !t.numbered && !!(e.icon || t.icon),
				"has-index": t.numbered
			}]),
			style: T({ "--i": r }),
			role: "button",
			tabindex: e.disabled ? -1 : 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			"aria-current": e.active ? "step" : void 0,
			onClick: (t) => e.disabled ? void 0 : a("click", e, e.originalIndex),
			onKeydown: (t) => d(t, e)
		}, [l("span", {
			class: C(["mc-timeline__node", `is-${e.type ?? "default"}`]),
			style: T(e.color ? { "--mc-timeline-color": e.color } : void 0),
			"aria-hidden": "true"
		}, [t.numbered ? (A(), c("span", aw, R(f(r, e)), 1)) : e.icon || t.icon ? (A(), o($, {
			key: 1,
			name: e.icon ?? t.icon ?? "circle",
			size: 13,
			"stroke-width": 2.2
		}, null, 8, ["name"])) : (A(), c("span", ow))], 6), l("div", sw, [
			l("div", cw, [
				e.title ? (A(), c("span", lw, R(e.title), 1)) : s("", !0),
				e.time ? (A(), c("span", uw, R(e.time), 1)) : s("", !0),
				n.$slots.action ? (A(), c("span", dw, [F(n.$slots, "action", {
					item: e,
					index: e.originalIndex
				}, void 0, !0)])) : s("", !0)
			]),
			e.content ? (A(), c("div", fw, R(e.content), 1)) : s("", !0),
			F(n.$slots, "item", {
				item: e,
				index: e.originalIndex
			}, void 0, !0)
		])], 46, iw))), 128))], 2));
	}
}), [["__scopeId", "data-v-b6b51a68"]]), mw = ["role", "tabindex"], hw = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, gw = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, _w = ["id"], vw = ["id"], yw = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTooltip",
	__name: "Tooltip",
	props: {
		content: {},
		text: {},
		open: { type: Boolean },
		modelValue: { type: Boolean },
		trigger: { default: "hover" },
		placement: { default: "top" },
		showArrow: {
			type: Boolean,
			default: !0
		},
		delay: { default: 200 },
		offset: { default: 8 },
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		maxWidth: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		variant: { default: "glass" },
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = H(), p = r, m = a, h = Fi("mc-tooltip"), g = N(null), _ = N(null), v = N(!1), { isTop: y } = On({ active: v }), b = N(!1), S = Tn({ active: v }), w = An(), D = i(() => p.content ?? p.text ?? "");
		function k() {
			return D.value.length > 0 || !!u.content;
		}
		let { selfFocusable: j, innerFocusable: M } = Xv(g, () => P());
		function P() {
			let e = g.value;
			if (!e) return;
			let t = M.value;
			k() ? t ? (t.setAttribute("aria-describedby", h), e.removeAttribute("aria-describedby")) : e.setAttribute("aria-describedby", h) : (e.removeAttribute("aria-describedby"), t && t.removeAttribute("aria-describedby"));
		}
		let I, L, { style: z, coords: V, currentPlacement: U, transformOrigin: W, arrowSide: te, update: K, startAutoUpdate: q, stopAutoUpdate: J } = _n(g, _, {
			placement: p.placement,
			offset: p.offset,
			zIndex: S
		}), ne = i(() => !p.disabled && v.value);
		G(() => [p.open, p.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (v.value = t) : v.value = e;
		}, { immediate: !0 }), G(ne, (e) => {
			e ? (K(), q()) : J();
		}, { immediate: !0 }), G(D, () => P());
		function re() {
			I !== void 0 && clearTimeout(I), L !== void 0 && clearTimeout(L), I = void 0, L = void 0;
		}
		function ie(e) {
			p.disabled || v.value !== e && (v.value = e, m("update:open", e), m("update:modelValue", e), m(e ? "open" : "close"));
		}
		function Y() {
			p.disabled || (re(), p.delay <= 0 ? ie(!0) : I = setTimeout(() => ie(!0), p.delay));
		}
		function ae(e = 80) {
			re(), e <= 0 ? ie(!1) : L = setTimeout(() => ie(!1), e);
		}
		function oe() {
			p.trigger === "hover" && Y();
		}
		function se() {
			p.trigger === "hover" && ae();
		}
		function ce() {
			(p.trigger === "focus" || p.trigger === "hover") && Y();
		}
		function le() {
			(p.trigger === "focus" || p.trigger === "hover") && ae(0);
		}
		function ue() {
			p.trigger === "click" && ie(!v.value);
		}
		function de(e) {
			e.key === "Escape" && v.value && y() ? (e.stopPropagation(), ie(!1)) : j.value && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ue());
		}
		function fe(e) {
			e.key === "Escape" && v.value && y() && ie(!1);
		}
		O(() => {
			typeof document < "u" && document.addEventListener("keydown", fe);
		}), E(() => {
			re(), typeof document < "u" && document.removeEventListener("keydown", fe), M.value?.removeAttribute("aria-describedby"), J();
		}), Sc(g, () => ie(!1), { ignore: [_] });
		let pe = i(() => typeof p.teleport == "string" ? p.teleport : "body"), me = i(() => {
			let e = te.value;
			if (e === "top" || e === "bottom") {
				let e = V.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = V.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), he = i(() => `mc-tooltip__arrow--${te.value}`), ge = i(() => {
			if (p.maxWidth !== void 0) return typeof p.maxWidth == "number" ? `${p.maxWidth}px` : p.maxWidth;
		}), _e = i(() => Z("mc-tooltip__layer", `mc-tooltip--${U.value}`)), X = i(() => Z("mc-tooltip", {
			"mc-panel--liquid": p.variant === "liquid",
			"mc-liquid-glass": p.variant === "liquid",
			"mc-liquid-glass--liquid": p.variant === "liquid",
			"mc-liquid-glass--layers": p.variant === "liquid",
			"is-disabled": p.disabled
		}, p.customClass));
		return (i, a) => (A(), c(e, null, [
			l("span", {
				ref_key: "reference",
				ref: g,
				class: C(["mc-tooltip__trigger", { "is-plain": B(j) }]),
				role: B(j) ? "button" : void 0,
				tabindex: B(j) ? 0 : void 0,
				onMouseenter: oe,
				onMouseleave: se,
				onFocusin: ce,
				onFocusout: le,
				onClick: ue,
				onKeydown: de
			}, [F(i.$slots, "trigger", {}, () => [F(i.$slots, "default", {}, void 0, !0)], !0)], 42, mw),
			(A(), o(t, {
				to: pe.value,
				disabled: !r.teleport
			}, [f(n, {
				name: "mc-float",
				onBeforeLeave: a[0] || (a[0] = (e) => b.value = !0),
				onAfterLeave: a[1] || (a[1] = (e) => b.value = !1)
			}, {
				default: ee(() => [ne.value && k() ? (A(), c("div", x({
					key: 0,
					ref_key: "floating",
					ref: _,
					class: _e.value,
					style: B(z)
				}, B(w)), [r.showArrow ? (A(), c("span", {
					key: 0,
					class: C(["mc-tooltip__arrow", he.value]),
					style: T(me.value),
					"aria-hidden": "true"
				}, null, 6)) : s("", !0), l("div", {
					class: C(X.value),
					role: "tooltip",
					style: T({
						maxWidth: ge.value,
						transformOrigin: B(W)
					})
				}, [
					r.variant === "liquid" ? (A(), c("span", hw)) : s("", !0),
					r.variant === "liquid" ? (A(), c("span", gw)) : s("", !0),
					l("span", {
						id: B(h),
						class: "mc-tooltip__content"
					}, [F(i.$slots, "content", {}, () => [d(R(D.value), 1)], !0)], 8, _w)
				], 6)], 16)) : s("", !0)]),
				_: 3
			})], 8, ["to", "disabled"])),
			!ne.value && !b.value && k() ? (A(), c("span", {
				key: 0,
				id: B(h),
				class: "mc-visually-hidden",
				role: "tooltip"
			}, [F(i.$slots, "content", {}, () => [d(R(D.value), 1)], !0)], 8, vw)) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-1ee1c5fa"]]), bw = ["aria-labelledby"], xw = ["aria-label"], Sw = ["id"], Cw = { class: "mc-tour__content" }, ww = { class: "mc-tour__footer" }, Tw = {
	key: 0,
	class: "mc-tour__progress"
}, Ew = { class: "mc-tour__counter" }, Dw = { class: "mc-tour__dots" }, Ow = { class: "mc-tour__actions" }, kw = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTour",
	__name: "Tour",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		steps: { default: () => [] },
		mask: {
			type: Boolean,
			default: !0
		},
		showProgress: {
			type: Boolean,
			default: !0
		},
		nextText: { default: "Next" },
		prevText: { default: "Back" },
		finishText: { default: "Done" },
		maskPadding: { default: 8 },
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close",
		"change",
		"finish"
	],
	setup(r, { emit: a }) {
		let u = r, p = Zt(), m = An(), h = a, g = Fi("mc-tour"), _ = N(!1), v = Tn({ active: _ }), y = N(0), b = N(null), w = N(null), D = N({
			w: 320,
			h: 180
		}), k = N({
			x: 0,
			y: 0
		}), j = N({
			x: 0,
			y: 0,
			side: "top"
		}), M = N({
			top: 0,
			left: 0,
			width: 0,
			height: 0
		});
		G(() => [u.open, u.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (_.value = t) : _.value = e;
		}, { immediate: !0 });
		let I = i(() => _.value && u.steps.length > 0), { isTop: L, isTopModal: z } = On({
			active: I,
			modal: !0
		});
		Ws({
			enabled: I,
			container: b,
			isTop: z
		});
		let V = i(() => u.steps[y.value] ?? null), H = i(() => y.value <= 0), U = i(() => y.value >= u.steps.length - 1), W = i(() => u.steps.length > 0 ? (y.value + 1) / u.steps.length : 0);
		function te(e) {
			if (!e) return null;
			let t = e.target;
			return typeof t == "string" ? typeof document > "u" ? null : document.querySelector(t) : t ?? null;
		}
		function K() {
			let e = w.value;
			if (!e) {
				M.value = {
					top: 0,
					left: 0,
					width: 0,
					height: 0
				};
				return;
			}
			let t = e.getBoundingClientRect();
			M.value = {
				top: t.top,
				left: t.left,
				width: t.width,
				height: t.height
			};
		}
		function q() {
			let e = b.value;
			if (!e) return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (D.value = {
				w: t.width,
				h: t.height
			});
		}
		function J() {
			K(), q();
			let e = V.value?.placement ?? "bottom", t = typeof window > "u" ? 1024 : window.innerWidth, n = typeof window > "u" ? 768 : window.innerHeight, r = D.value.w, i = D.value.h, a = M.value;
			if (!w.value || a.width === 0) {
				k.value = {
					x: Math.max(12, (t - r) / 2),
					y: Math.max(12, (n - i) / 2)
				}, j.value = {
					x: 0,
					y: 0,
					side: "top"
				};
				return;
			}
			let o = a.left + a.width / 2, s = a.top + a.height / 2, c = 0, l = 0, u = "top";
			e === "top" ? (c = o - r / 2, l = a.top - i - 18, u = "bottom") : e === "left" ? (c = a.left - r - 18, l = s - i / 2, u = "right") : e === "right" ? (c = a.left + a.width + 18, l = s - i / 2, u = "left") : (c = o - r / 2, l = a.top + a.height + 18, u = "top"), c = Math.min(Math.max(12, c), Math.max(12, t - r - 12)), l = Math.min(Math.max(12, l), Math.max(12, n - i - 12)), k.value = {
				x: c,
				y: l
			};
			let d = Math.min(Math.max(16, o - c), Math.max(16, r - 16)), f = Math.min(Math.max(16, s - l), Math.max(16, i - 16));
			j.value = {
				x: d,
				y: f,
				side: u
			};
		}
		function ne() {
			let e = w.value;
			e && typeof e.scrollIntoView == "function" && e.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center"
			});
		}
		function re() {
			wt && (w.value = te(V.value), S(() => {
				ne(), window.setTimeout(J, 220), J();
			}));
		}
		G(y, () => {
			re(), h("change", y.value);
		}), G(() => u.steps, () => {
			y.value >= u.steps.length && (y.value = Math.max(0, u.steps.length - 1)), re();
		}), G(I, (e) => {
			e ? (y.value = 0, re(), h("open")) : h("close");
		});
		function ie(e) {
			_.value !== e && (_.value = e, h("update:open", e), h("update:modelValue", e));
		}
		function Y() {
			ie(!1);
		}
		function ae() {
			U.value ? (h("finish"), Y()) : y.value += 1;
		}
		function oe() {
			H.value || --y.value;
		}
		function se(e) {
			I.value && L() && (e.target?.closest("button, a[href], input, select, textarea, [contenteditable=\"true\"]") && e.key === "Enter" || (e.key === "Escape" ? (e.stopPropagation(), Y()) : e.key === "ArrowRight" || e.key === "Enter" ? ae() : e.key === "ArrowLeft" && oe()));
		}
		function ce() {
			J();
		}
		O(() => {
			typeof document < "u" && (document.addEventListener("keydown", se), window.addEventListener("scroll", ce, !0), window.addEventListener("resize", ce)), I.value && re();
		}), E(() => {
			typeof document < "u" && (document.removeEventListener("keydown", se), window.removeEventListener("scroll", ce, !0), window.removeEventListener("resize", ce));
		});
		let le = i(() => ({
			transform: `translate3d(${Math.round(M.value.left - u.maskPadding)}px, ${Math.round(M.value.top - u.maskPadding)}px, 0)`,
			width: `${M.value.width + u.maskPadding * 2}px`,
			height: `${M.value.height + u.maskPadding * 2}px`,
			display: M.value.width > 0 ? "block" : "none"
		})), ue = i(() => ({ transform: `translate3d(${Math.round(k.value.x)}px, ${Math.round(k.value.y)}px, 0)` })), de = i(() => {
			let { x: e, y: t, side: n } = j.value;
			return n === "top" ? {
				left: "0px",
				top: "-8px",
				translate: `${Math.round(e - 8)}px 0px`
			} : n === "bottom" ? {
				left: "0px",
				bottom: "-8px",
				translate: `${Math.round(e - 8)}px 0px`
			} : n === "left" ? {
				top: "0px",
				left: "-8px",
				translate: `0px ${Math.round(t - 8)}px`
			} : {
				top: "0px",
				right: "-8px",
				translate: `0px ${Math.round(t - 8)}px`
			};
		}), fe = i(() => Z("mc-tour", u.customClass));
		return (i, a) => (A(), o(t, { to: "body" }, [f(n, { name: "mc-tour" }, {
			default: ee(() => [I.value ? (A(), c("div", x({
				key: 0,
				class: fe.value,
				style: { "--mc-layer-z": B(v) }
			}, B(m)), [
				r.mask ? (A(), c("div", {
					key: 0,
					class: "mc-tour__scrim",
					style: T(le.value),
					"aria-hidden": "true"
				}, null, 4)) : s("", !0),
				l("div", {
					class: "mc-tour__spotlight",
					style: T(le.value),
					"aria-hidden": "true"
				}, null, 4),
				l("div", {
					class: "mc-tour__wrap",
					style: T(ue.value)
				}, [M.value.width > 0 ? (A(), c("span", {
					key: 0,
					class: "mc-tour__arrow",
					style: T(de.value),
					"aria-hidden": "true"
				}, null, 4)) : s("", !0), l("div", {
					ref_key: "panel",
					ref: b,
					class: "mc-tour__panel mc-grain-overlay",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": B(g)
				}, [
					r.showProgress ? (A(), c("span", {
						key: 0,
						class: "mc-tour__bar",
						style: T({ transform: `scaleX(${W.value})` }),
						"aria-hidden": "true"
					}, null, 4)) : s("", !0),
					l("button", {
						type: "button",
						class: "mc-tour__close",
						"aria-label": B(p).tour?.end ?? "End tour",
						onClick: Y
					}, [f($, {
						name: "close",
						size: 13,
						"stroke-width": 2.4
					})], 8, xw),
					l("h3", {
						id: B(g),
						class: "mc-tour__title",
						"data-mc-type": "title"
					}, R(V.value?.title), 9, Sw),
					l("div", Cw, [F(i.$slots, "default", {
						step: V.value,
						index: y.value
					}, () => [d(R(V.value?.content), 1)], !0)]),
					l("div", ww, [r.showProgress ? (A(), c("div", Tw, [l("span", Ew, R(y.value + 1) + " / " + R(r.steps.length), 1), l("span", Dw, [(A(!0), c(e, null, P(r.steps, (e, t) => (A(), c("span", {
						key: t,
						class: C(["mc-tour__dot", { "is-active": t === y.value }])
					}, null, 2))), 128))])])) : s("", !0), l("div", Ow, [f(Fr, {
						size: "small",
						variant: "soft",
						disabled: H.value,
						onClick: oe
					}, {
						default: ee(() => [d(R(r.prevText), 1)]),
						_: 1
					}, 8, ["disabled"]), f(Fr, {
						size: "small",
						variant: "solid",
						color: "accent",
						onClick: ae
					}, {
						default: ee(() => [d(R(U.value ? r.finishText : r.nextText), 1)]),
						_: 1
					})])])
				], 8, bw)], 4)
			], 16)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-bc866b5c"]]), Aw = ["aria-label"], jw = { class: "mc-transfer__head" }, Mw = {
	key: 0,
	class: "mc-transfer__search"
}, Nw = ["placeholder", "aria-label"], Pw = {
	key: 1,
	class: "mc-transfer__title",
	"data-mc-type": "title"
}, Fw = { class: "mc-transfer__check" }, Iw = [
	"checked",
	"disabled",
	"aria-label"
], Lw = { class: "mc-transfer__count" }, Rw = [
	"checked",
	"disabled",
	"aria-label",
	"onChange"
], zw = { class: "mc-transfer__label" }, Bw = {
	key: 0,
	class: "mc-transfer__empty"
}, Vw = { class: "mc-transfer__controls" }, Hw = ["disabled", "aria-label"], Uw = ["disabled", "aria-label"], Ww = ["aria-label"], Gw = { class: "mc-transfer__head" }, Kw = {
	key: 0,
	class: "mc-transfer__search"
}, qw = ["placeholder", "aria-label"], Jw = {
	key: 1,
	class: "mc-transfer__title",
	"data-mc-type": "title"
}, Yw = { class: "mc-transfer__check" }, Xw = [
	"checked",
	"disabled",
	"aria-label"
], Zw = { class: "mc-transfer__count" }, Qw = [
	"checked",
	"disabled",
	"aria-label",
	"onChange"
], $w = { class: "mc-transfer__label" }, eT = {
	key: 0,
	class: "mc-transfer__empty"
}, tT = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTransfer",
	__name: "Transfer",
	props: {
		modelValue: { default: () => [] },
		data: { default: () => [] },
		titles: { default: void 0 },
		leftTitle: { default: void 0 },
		rightTitle: { default: void 0 },
		filterable: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let a = t, u = n, d = Zt(), p = N(""), m = N(""), h = N(/* @__PURE__ */ new Set()), g = N(/* @__PURE__ */ new Set()), _ = N("right"), v = i(() => a.modelValue ?? []), y = i(() => a.leftTitle ?? a.titles?.[0] ?? d.value.transfer.source), b = i(() => a.rightTitle ?? a.titles?.[1] ?? d.value.transfer.target);
		function x(e, t) {
			return !t.trim() || e.label.toLowerCase().includes(t.trim().toLowerCase());
		}
		let S = i(() => a.data.filter((e) => !v.value.includes(e.key) && x(e, p.value))), w = i(() => a.data.filter((e) => v.value.includes(e.key) && x(e, m.value))), T = i(() => S.value.filter((e) => !e.disabled)), E = i(() => w.value.filter((e) => !e.disabled)), D = i(() => T.value.length > 0 && T.value.every((e) => h.value.has(e.key))), O = i(() => E.value.length > 0 && E.value.every((e) => g.value.has(e.key)));
		function k(e, t, n) {
			if (a.disabled || n) return;
			let r = new Set(e);
			r.has(t) ? r.delete(t) : r.add(t), e === h.value ? h.value = r : g.value = r;
		}
		function j(e) {
			if (a.disabled) return;
			let t = e === "left" ? T.value : E.value, n = e === "left" ? h.value : g.value, r = /* @__PURE__ */ new Set();
			if (!t.every((e) => n.has(e.key))) for (let e of t) r.add(e.key);
			e === "left" ? h.value = r : g.value = r;
		}
		function M() {
			if (a.disabled || !h.value.size) return;
			let e = [...h.value].filter((e) => S.value.some((t) => t.key === e && !t.disabled));
			if (!e.length) return;
			_.value = "right";
			let t = [...v.value];
			for (let n of e) t.includes(n) || t.push(n);
			u("update:modelValue", t), u("change", t), h.value = /* @__PURE__ */ new Set();
		}
		function F() {
			if (a.disabled || !g.value.size) return;
			let e = [...g.value].filter((e) => w.value.some((t) => t.key === e && !t.disabled));
			if (!e.length) return;
			_.value = "left";
			let t = v.value.filter((t) => !e.includes(t));
			u("update:modelValue", t), u("change", t), g.value = /* @__PURE__ */ new Set();
		}
		G(() => a.modelValue, () => {
			let e = new Set(S.value.map((e) => e.key)), t = new Set(w.value.map((e) => e.key));
			h.value = new Set([...h.value].filter((t) => e.has(t))), g.value = new Set([...g.value].filter((e) => t.has(e)));
		});
		let I = i(() => Z("mc-transfer", `mc-transfer--${a.size}`, { "is-disabled": a.disabled }, a.customClass));
		return (n, i) => (A(), c("div", { class: C(I.value) }, [
			l("section", {
				class: "mc-transfer__panel mc-grain-overlay",
				"aria-label": B(d).transfer.source
			}, [
				l("header", jw, [t.filterable ? (A(), c("label", Mw, [f($, {
					name: "search",
					size: 13,
					class: "mc-transfer__search-icon"
				}), te(l("input", {
					"onUpdate:modelValue": i[0] || (i[0] = (e) => p.value = e),
					type: "search",
					class: "mc-transfer__search-input",
					placeholder: B(d).transfer.search ?? "Search",
					"aria-label": B(d).transfer.searchSource ?? "search source"
				}, null, 8, Nw), [[U, p.value]])])) : (A(), c("span", Pw, R(y.value), 1)), l("label", Fw, [
					l("input", {
						type: "checkbox",
						checked: D.value,
						disabled: t.disabled || !T.value.length,
						"aria-label": B(d).transfer.selectAllSource ?? "select all source",
						onChange: i[1] || (i[1] = (e) => j("left"))
					}, null, 40, Iw),
					l("span", { class: C(["mc-transfer__box", { "is-checked": D.value }]) }, [D.value ? (A(), o($, {
						key: 0,
						name: "check",
						size: 10,
						"stroke-width": 3
					})) : s("", !0)], 2),
					l("span", Lw, R(S.value.length), 1)
				])]),
				f(r, {
					tag: "div",
					class: "mc-transfer__list",
					name: _.value === "right" ? "mc-move-right" : "mc-move-left"
				}, {
					default: ee(() => [(A(!0), c(e, null, P(S.value, (e) => (A(), c("label", {
						key: e.key,
						class: C(["mc-transfer__row", {
							"is-disabled": e.disabled,
							"is-checked": h.value.has(e.key)
						}])
					}, [
						l("input", {
							type: "checkbox",
							class: "mc-transfer__native",
							checked: h.value.has(e.key),
							disabled: t.disabled || e.disabled,
							"aria-label": e.label,
							onChange: (t) => k(h.value, e.key, e.disabled)
						}, null, 40, Rw),
						l("span", { class: C(["mc-transfer__box", { "is-checked": h.value.has(e.key) }]) }, [h.value.has(e.key) ? (A(), o($, {
							key: 0,
							name: "check",
							size: 10,
							"stroke-width": 3
						})) : s("", !0)], 2),
						l("span", zw, R(e.label), 1)
					], 2))), 128))]),
					_: 1
				}, 8, ["name"]),
				S.value.length ? s("", !0) : (A(), c("p", Bw, R(B(d).empty.text), 1))
			], 8, Aw),
			l("div", Vw, [l("button", {
				type: "button",
				class: "mc-transfer__btn mc-sheen-sweep",
				disabled: t.disabled || !h.value.size,
				"aria-label": B(d).transfer.moveToTarget ?? "move to target",
				onClick: M
			}, [f($, {
				name: "chevron-right",
				size: 15,
				class: "mc-transfer__btn-icon"
			})], 8, Hw), l("button", {
				type: "button",
				class: "mc-transfer__btn mc-sheen-sweep",
				disabled: t.disabled || !g.value.size,
				"aria-label": B(d).transfer.moveToSource ?? "move to source",
				onClick: F
			}, [f($, {
				name: "chevron-left",
				size: 15,
				class: "mc-transfer__btn-icon"
			})], 8, Uw)]),
			l("section", {
				class: "mc-transfer__panel mc-grain-overlay",
				"aria-label": B(d).transfer.target
			}, [
				l("header", Gw, [t.filterable ? (A(), c("label", Kw, [f($, {
					name: "search",
					size: 13,
					class: "mc-transfer__search-icon"
				}), te(l("input", {
					"onUpdate:modelValue": i[2] || (i[2] = (e) => m.value = e),
					type: "search",
					class: "mc-transfer__search-input",
					placeholder: B(d).transfer.search ?? "Search",
					"aria-label": B(d).transfer.searchTarget ?? "search target"
				}, null, 8, qw), [[U, m.value]])])) : (A(), c("span", Jw, R(b.value), 1)), l("label", Yw, [
					l("input", {
						type: "checkbox",
						checked: O.value,
						disabled: t.disabled || !E.value.length,
						"aria-label": B(d).transfer.selectAllTarget ?? "select all target",
						onChange: i[3] || (i[3] = (e) => j("right"))
					}, null, 40, Xw),
					l("span", { class: C(["mc-transfer__box", { "is-checked": O.value }]) }, [O.value ? (A(), o($, {
						key: 0,
						name: "check",
						size: 10,
						"stroke-width": 3
					})) : s("", !0)], 2),
					l("span", Zw, R(w.value.length), 1)
				])]),
				f(r, {
					tag: "div",
					class: "mc-transfer__list",
					name: _.value === "right" ? "mc-move-right" : "mc-move-left"
				}, {
					default: ee(() => [(A(!0), c(e, null, P(w.value, (e) => (A(), c("label", {
						key: e.key,
						class: C(["mc-transfer__row", {
							"is-disabled": e.disabled,
							"is-checked": g.value.has(e.key)
						}])
					}, [
						l("input", {
							type: "checkbox",
							class: "mc-transfer__native",
							checked: g.value.has(e.key),
							disabled: t.disabled || e.disabled,
							"aria-label": e.label,
							onChange: (t) => k(g.value, e.key, e.disabled)
						}, null, 40, Qw),
						l("span", { class: C(["mc-transfer__box", { "is-checked": g.value.has(e.key) }]) }, [g.value.has(e.key) ? (A(), o($, {
							key: 0,
							name: "check",
							size: 10,
							"stroke-width": 3
						})) : s("", !0)], 2),
						l("span", $w, R(e.label), 1)
					], 2))), 128))]),
					_: 1
				}, 8, ["name"]),
				w.value.length ? s("", !0) : (A(), c("p", eT, R(B(d).empty.text), 1))
			], 8, Ww)
		], 2));
	}
}), [["__scopeId", "data-v-9fd05716"]]), nT = ["aria-label"], rT = ["aria-label", "aria-valuenow"], iT = { class: "mc-transport__keys" }, aT = [
	"aria-label",
	"title",
	"disabled"
], oT = [
	"aria-label",
	"title",
	"disabled"
], sT = [
	"aria-label",
	"title",
	"disabled"
], cT = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTransport",
	__name: "Transport",
	props: {
		playing: {
			type: Boolean,
			default: !1
		},
		showProgress: {
			type: Boolean,
			default: !0
		},
		progress: { default: 0 },
		disabled: {
			type: Boolean,
			default: !1
		},
		size: { default: "medium" },
		prevLabel: { default: "上一首" },
		playLabel: { default: "播放" },
		pauseLabel: { default: "暂停" },
		nextLabel: { default: "下一首" },
		progressLabel: { default: "播放进度" },
		label: { default: "播放控制" },
		customClass: {}
	},
	emits: [
		"prev",
		"next",
		"play",
		"pause",
		"toggle"
	],
	setup(e, { emit: t }) {
		let n = {
			small: 15,
			medium: 18,
			large: 22
		}, r = {
			small: 34,
			medium: 42,
			large: 52
		}, a = e, o = t, u = i(() => Math.round(Ot(Number(a.progress) || 0, 0, 100))), d = i(() => ({ "--mc-tp": String(Ot(Number(a.progress) || 0, 0, 100) / 100) })), p = i(() => n[a.size] ?? n.medium);
		i(() => r[a.size] ?? r.medium);
		let m = i(() => a.playing ? a.pauseLabel : a.playLabel), h = i(() => a.playing ? "pause" : "play");
		function g() {
			a.disabled || o("prev");
		}
		function _() {
			a.disabled || o("next");
		}
		function v() {
			a.disabled || (o("toggle"), a.playing ? o("pause") : o("play"));
		}
		let y = i(() => Z("mc-transport", `mc-transport--${a.size}`, {
			"is-disabled": a.disabled,
			"is-playing": a.playing
		}, a.customClass));
		return (t, n) => (A(), c("div", {
			class: C(y.value),
			role: "group",
			"aria-label": e.label
		}, [e.showProgress ? (A(), c("div", {
			key: 0,
			class: "mc-transport__progress",
			role: "progressbar",
			"aria-label": e.progressLabel,
			"aria-valuenow": u.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [l("span", {
			class: "mc-transport__progress-fill",
			style: T(d.value)
		}, null, 4)], 8, rT)) : s("", !0), l("div", iT, [
			l("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--prev",
				"aria-label": e.prevLabel,
				title: e.prevLabel,
				disabled: e.disabled,
				onClick: g
			}, [f($, {
				name: "skip-back",
				size: p.value
			}, null, 8, ["size"])], 8, aT),
			l("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--play mc-sheen-sweep",
				"aria-label": m.value,
				title: m.value,
				disabled: e.disabled,
				onClick: v
			}, [
				n[0] || (n[0] = l("span", {
					class: "mc-transport__play-aurora",
					"aria-hidden": "true"
				}, null, -1)),
				n[1] || (n[1] = l("span", {
					class: "mc-transport__play-grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				f($, {
					class: "mc-transport__play-glyph",
					name: h.value,
					size: p.value
				}, null, 8, ["name", "size"])
			], 8, oT),
			l("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--next",
				"aria-label": e.nextLabel,
				title: e.nextLabel,
				disabled: e.disabled,
				onClick: _
			}, [f($, {
				name: "skip-forward",
				size: p.value
			}, null, 8, ["size"])], 8, sT)
		])], 10, nT));
	}
}), [["__scopeId", "data-v-d64fd132"]]), lT = ["aria-multiselectable"], uT = [
	"data-index",
	"aria-level",
	"aria-posinset",
	"aria-setsize",
	"aria-expanded",
	"aria-selected",
	"aria-checked",
	"aria-disabled",
	"tabindex",
	"draggable",
	"onClick",
	"onKeydown",
	"onDragstart",
	"onDragover",
	"onDrop"
], dT = {
	key: 0,
	class: "mc-tree__guides",
	"aria-hidden": "true"
}, fT = { class: "mc-tree__content mc-sheen-sweep" }, pT = [
	"aria-expanded",
	"aria-label",
	"onClick"
], mT = {
	key: 1,
	class: "mc-tree__chevron mc-tree__chevron--leaf",
	"aria-hidden": "true"
}, hT = [
	"checked",
	".indeterminate",
	"disabled",
	"aria-label",
	"onChange"
], gT = ["title"], _T = {
	key: 4,
	class: "mc-tree__extra"
}, vT = {
	key: 2,
	class: "mc-tree__empty mc-aurora-inset",
	role: "status"
}, yT = { class: "mc-tree__empty-text" }, bT = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTree",
	__name: "Tree",
	props: {
		data: { default: () => [] },
		nodeKey: { default: "key" },
		showLine: {
			type: Boolean,
			default: !1
		},
		expandable: {
			type: Boolean,
			default: !0
		},
		defaultExpandedKeys: {},
		expandedKeys: {},
		checkable: {
			type: Boolean,
			default: !1
		},
		checkedKeys: {},
		draggable: {
			type: Boolean,
			default: !1
		},
		emptyText: { default: "No data" },
		maxHeight: { default: void 0 },
		virtual: {
			type: [Boolean, Object],
			default: !1
		},
		size: { default: "medium" },
		customClass: {}
	},
	emits: [
		"update:expandedKeys",
		"update:checkedKeys",
		"update:data",
		"node-click",
		"check-change",
		"move"
	],
	setup(t, { emit: n }) {
		let r = t, a = Zt(), u = n;
		function p(e, t, n) {
			return e?.[r.nodeKey] ?? `${t}.${n}`;
		}
		let m = N(null);
		G(() => r.data, () => {
			m.value = null;
		});
		let h = i(() => m.value ?? r.data);
		function g(e, t, n, r) {
			return e.map((i, a) => ({
				node: i,
				key: p(i, r, a),
				children: g(i?.children ?? [], null, n + 1, `${r}.${a}`),
				parent: t,
				depth: n,
				posInSet: a + 1,
				setSize: e.length
			}));
		}
		function _(e, t) {
			for (let n of e) n.parent = t, _(n.children, n);
		}
		let v = i(() => {
			let e = g(h.value, null, 0, "root");
			return _(e, null), e;
		}), y = N([]), b = !1;
		G(() => r.data, () => {
			b || r.expandedKeys || (b = !0, y.value = [...r.defaultExpandedKeys ?? []]);
		}, { immediate: !0 });
		let x = i(() => r.expandedKeys ?? y.value), w = i(() => new Set(x.value));
		function D(e) {
			let t = w.value.has(e) ? x.value.filter((t) => t !== e) : [...x.value, e];
			y.value = t, u("update:expandedKeys", t);
		}
		let k = N([]), j = i(() => r.checkedKeys ?? k.value), M = i(() => new Set(j.value)), I = i(() => {
			let e = /* @__PURE__ */ new Set(), t = (n) => {
				let r = !1;
				for (let i of n) {
					let n = i.children.length ? t(i.children) : !1, a = M.value.has(i.key);
					(a || n) && (r = !0), n && !a && e.add(i.key);
				}
				return r;
			};
			return t(v.value), e;
		});
		function L(e, t) {
			let n = new Set(M.value), r = (e) => {
				t ? n.add(e.key) : n.delete(e.key), e.children.forEach(r);
			};
			r(e);
			let i = e.parent;
			for (; i;) i.children.length > 0 && i.children.every((e) => n.has(e.key)) ? n.add(i.key) : n.delete(i.key), i = i.parent;
			let a = Array.from(n);
			k.value = a, u("update:checkedKeys", a), u("check-change", e.key, t);
		}
		function z(e, t) {
			let n = e.target;
			L(t, !!n?.checked);
		}
		let V = i(() => {
			let e = [], t = (n, i) => {
				for (let a of n) {
					let n = a.children.length > 0 && !a.node.isLeaf, o = !r.expandable || w.value.has(a.key);
					e.push({
						...a,
						level: i,
						hasChildren: n,
						expanded: o,
						isLast: a.posInSet === a.setSize
					}), n && o && t(a.children, i + 1);
				}
			};
			return t(v.value, 0), e;
		}), H = i(() => r.virtual ? typeof r.virtual == "object" ? r.virtual : {} : null), U = N(null), W = N(0), ee = N(0), te = N(0), K = N(0), J = i(() => !!H.value && V.value.length > 0), ne = i(() => {
			let e = H.value?.rowHeight;
			return e ? Math.max(14, e) : te.value || 32;
		}), re = i(() => Math.max(0, H.value?.overscan ?? 6)), ie = i(() => {
			if (!J.value) return null;
			let e = V.value.length, t = ne.value, n = K.value, r = Math.max(0, Math.floor((W.value - n) / t) - re.value), i = Math.ceil((W.value + Math.max(ee.value, t) - n) / t) + 1, a = Math.min(e, r + i + re.value);
			return {
				start: r,
				end: a,
				top: r * t,
				bottom: (e - a) * t
			};
		}), Y = i(() => {
			let e = ie.value;
			return e ? V.value.slice(e.start, e.end) : V.value;
		}), ae = i(() => ie.value?.start ?? 0), oe = i(() => {
			let e = ie.value;
			return e ? {
				top: e.top,
				bottom: e.bottom
			} : null;
		});
		function se() {
			let e = U.value;
			if (!e) return;
			ee.value = e.clientHeight, W.value = e.scrollTop;
			let t = Number.parseFloat(getComputedStyle(e).paddingTop);
			if (K.value = Number.isFinite(t) ? t : 0, J.value && !H.value?.rowHeight && !te.value) {
				let t = e.querySelectorAll("[data-index]"), n = t[0], r = t[1], i = n?.offsetTop, a = r?.offsetTop;
				i !== void 0 && a !== void 0 && a > i ? te.value = a - i : n?.offsetHeight && (te.value = n.offsetHeight);
			}
		}
		function ce(e) {
			let t = e.target;
			t && (W.value = t.scrollTop);
		}
		function le(e) {
			if (!J.value) return;
			let t = U.value;
			if (!t) return;
			let n = ne.value, r = K.value + e * n, i = t.scrollTop, a = i + t.clientHeight;
			r < i + K.value ? t.scrollTop = Math.max(0, r - K.value - n) : r + n > a && (t.scrollTop = r + n - t.clientHeight + n), W.value = t.scrollTop;
		}
		let ue;
		function de() {
			if (typeof ResizeObserver > "u") return;
			let e = U.value;
			e && (ue?.disconnect(), ue = new ResizeObserver(() => se()), ue.observe(e));
		}
		O(() => {
			J.value && S(() => {
				se(), de();
			});
		}), E(() => ue?.disconnect()), G(J, (e) => {
			e ? S(() => {
				se(), de();
			}) : (ue?.disconnect(), ue = void 0, te.value = 0, W.value = 0);
		});
		let fe = N(null), pe = N(null), me = /* @__PURE__ */ new Map();
		function he(e, t) {
			t instanceof HTMLElement ? me.set(e, t) : me.delete(e);
		}
		function ge(e) {
			pe.value = e;
			let t = V.value.findIndex((t) => t.key === e);
			t >= 0 && le(t), S(() => me.get(e)?.focus());
		}
		let _e = i(() => {
			let e = pe.value;
			return e === null ? V.value[0]?.key : !J.value || Y.value.some((t) => t.key === e) ? e : Y.value[0]?.key;
		});
		function X(e) {
			fe.value = e.key, u("node-click", e.node, e.key);
		}
		function ve(e) {
			e.node.disabled || (X(e), pe.value = e.key);
		}
		function ye(e, t) {
			let n = V.value, i = n.findIndex((e) => e.key === t.key);
			if (!(i < 0)) switch (e.key) {
				case "ArrowDown": {
					e.preventDefault();
					let t = n[i + 1];
					t && ge(t.key);
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					let t = n[i - 1];
					t && ge(t.key);
					break;
				}
				case "ArrowRight":
					if (e.preventDefault(), t.hasChildren && !t.expanded) D(t.key);
					else if (t.hasChildren && t.expanded) {
						let e = n[i + 1];
						e && ge(e.key);
					}
					break;
				case "ArrowLeft":
					e.preventDefault(), t.hasChildren && t.expanded ? D(t.key) : t.parent && ge(t.parent.key);
					break;
				case "Home": {
					e.preventDefault();
					let t = n[0];
					t && ge(t.key);
					break;
				}
				case "End": {
					e.preventDefault();
					let t = n[n.length - 1];
					t && ge(t.key);
					break;
				}
				case "Enter":
				case " ": e.preventDefault(), r.checkable && !t.node.disabled ? L(t, !M.value.has(t.key)) : X(t);
			}
		}
		let be = N(null), xe = N(null);
		function Se(e) {
			return e.map((e) => ({
				...e,
				...e?.children ? { children: Se(e.children) } : {}
			}));
		}
		function Ce(e, t, n = "root") {
			for (let r = 0; r < e.length; r += 1) {
				let i = e[r];
				if (p(i, n, r) === t) return {
					list: e,
					index: r,
					node: i,
					path: n
				};
				if (i?.children?.length) {
					let e = Ce(i.children, t, `${n}.${r}`);
					if (e) return e;
				}
			}
			return null;
		}
		function we(e, t, n) {
			let r = e?.children ?? [];
			for (let e = 0; e < r.length; e += 1) if (p(r[e], n, e) === t || r[e]?.children?.length && we(r[e], t, `${n}.${e}`)) return !0;
			return !1;
		}
		function Te(e, t) {
			!r.draggable || t.node.disabled ? e.preventDefault() : (be.value = t.key, e.dataTransfer && (e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", String(t.key))));
		}
		function Ee(e, t) {
			if (!r.draggable || be.value === null || t.key === be.value) return;
			e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
			let n = e.currentTarget;
			if (!n) return;
			let i = n.getBoundingClientRect(), a = (e.clientY - i.top) / i.height, o = a < .28 ? "before" : a > .72 ? "after" : "inside";
			xe.value = {
				key: t.key,
				position: o
			};
		}
		function De(e, t) {
			e.preventDefault(), e.stopPropagation();
			let n = be.value, r = xe.value;
			be.value = null, xe.value = null, n !== null && r && ke(n, r.key, r.position);
		}
		function Oe() {
			be.value = null, xe.value = null;
		}
		function ke(e, t, n) {
			let r = Se(h.value), i = Ce(r, e);
			if (i && !we(i.node, t, `${i.path}.${i.index}`)) {
				if (i.list.splice(i.index, 1), n === "inside") {
					let e = Ce(r, t);
					if (!e) return;
					e.node.children || (e.node.children = []), e.node.children.push(i.node);
				} else {
					let e = Ce(r, t);
					if (!e) return;
					let a = n === "after" ? e.index + 1 : e.index;
					e.list.splice(a, 0, i.node);
				}
				m.value = r, u("update:data", r), u("move", {
					from: e,
					to: t,
					position: n
				});
			}
		}
		function Ae(e) {
			if (xe.value && xe.value.key === e.key) return `is-drop-${xe.value.position}`;
		}
		let je = i(() => Z("mc-tree", "mc-grain-overlay", `mc-tree--${r.size}`, {
			"is-line": r.showLine,
			"is-checkable": r.checkable,
			"is-draggable": r.draggable,
			"is-windowed": J.value,
			"mc-scroll": J.value
		}, r.customClass)), Me = i(() => {
			let e = r.maxHeight ?? (J.value ? "24rem" : void 0);
			if (e != null) return { maxHeight: typeof e == "number" ? `${e}px` : e };
		});
		function Ne(e) {
			return `calc(${e - 1} * var(--mc-tree-indent) + 9px)`;
		}
		return (n, r) => (A(), c("div", {
			ref_key: "treeEl",
			ref: U,
			class: C(je.value),
			style: T(Me.value),
			role: "tree",
			"aria-multiselectable": t.checkable ? "true" : void 0,
			onScrollPassive: ce
		}, [
			oe.value && oe.value.top > 0 ? (A(), c("div", {
				key: 0,
				class: "mc-tree__spacer",
				role: "presentation",
				"aria-hidden": "true",
				style: T({ height: oe.value.top + "px" })
			}, null, 4)) : s("", !0),
			(A(!0), c(e, null, P(Y.value, (i, u) => (A(), c("div", {
				key: i.key,
				ref_for: !0,
				ref: (e) => he(i.key, e),
				"data-index": u + ae.value,
				class: C(["mc-tree__node", [Ae(i), {
					"is-disabled": !!i.node.disabled,
					"is-selected": fe.value === i.key,
					"is-dragging": be.value === i.key
				}]]),
				role: "treeitem",
				style: T({
					"--mc-level": i.level,
					"--i": u + ae.value
				}),
				"aria-level": i.level + 1,
				"aria-posinset": i.posInSet,
				"aria-setsize": i.setSize,
				"aria-expanded": i.hasChildren ? i.expanded : void 0,
				"aria-selected": fe.value === i.key,
				"aria-checked": t.checkable ? M.value.has(i.key) ? "true" : I.value.has(i.key) ? "mixed" : "false" : void 0,
				"aria-disabled": i.node.disabled ? "true" : void 0,
				tabindex: _e.value === i.key ? 0 : -1,
				draggable: t.draggable && !i.node.disabled,
				onClick: (e) => ve(i),
				onKeydown: (e) => ye(e, i),
				onDragstart: (e) => Te(e, i),
				onDragover: (e) => Ee(e, i),
				onDrop: (e) => De(e, i),
				onDragend: Oe
			}, [t.showLine ? (A(), c("span", dT, [(A(!0), c(e, null, P(i.level, (e) => (A(), c("span", {
				key: e,
				class: C(["mc-tree__guide", { "is-last": e === i.level && i.isLast }]),
				style: T({ left: Ne(e) })
			}, null, 6))), 128))])) : s("", !0), l("span", fT, [
				i.hasChildren && t.expandable ? (A(), c("button", {
					key: 0,
					type: "button",
					class: C(["mc-tree__chevron", { "is-open": i.expanded }]),
					"aria-expanded": i.expanded,
					"aria-label": i.expanded ? B(a).tree?.collapse ?? "Collapse node" : B(a).tree?.expand ?? "Expand node",
					tabindex: "-1",
					onClick: q((e) => D(i.key), ["stop"])
				}, [f($, {
					name: "chevron-right",
					size: 14,
					"stroke-width": 2.4
				})], 10, pT)) : (A(), c("span", mT)),
				t.checkable ? (A(), c("label", {
					key: 2,
					class: "mc-tree__checkbox",
					onClick: r[0] || (r[0] = q(() => {}, ["stop"]))
				}, [l("input", {
					class: C(["mc-tree__checkbox-input", { "is-indeterminate": I.value.has(i.key) }]),
					type: "checkbox",
					checked: M.value.has(i.key),
					".indeterminate": I.value.has(i.key),
					disabled: !!i.node.disabled,
					"aria-label": `Toggle ${i.node.label}`,
					onChange: (e) => z(e, i)
				}, null, 42, hT)])) : s("", !0),
				i.node.icon ? (A(), o($, {
					key: 3,
					name: i.node.icon,
					class: "mc-tree__icon",
					size: 16
				}, null, 8, ["name"])) : s("", !0),
				l("span", {
					class: "mc-tree__label",
					title: i.node.label
				}, R(i.node.label), 9, gT),
				n.$slots.node ? (A(), c("span", _T, [F(n.$slots, "node", {
					node: i.node,
					key: i.key,
					level: i.level
				}, void 0, !0)])) : s("", !0)
			])], 46, uT))), 128)),
			oe.value && oe.value.bottom > 0 ? (A(), c("div", {
				key: 1,
				class: "mc-tree__spacer",
				role: "presentation",
				"aria-hidden": "true",
				style: T({ height: oe.value.bottom + "px" })
			}, null, 4)) : s("", !0),
			V.value.length ? s("", !0) : (A(), c("div", vT, [l("span", yT, [F(n.$slots, "empty", {}, () => [d(R(t.emptyText), 1)], !0)])]))
		], 46, lT));
	}
}), [["__scopeId", "data-v-22523390"]]), xT = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], ST = {
	key: 0,
	class: "mc-tree-select__chips"
}, CT = { class: "mc-tree-select__chip-label" }, wT = ["aria-label", "onClick"], TT = { class: "mc-tree-select__affix" }, ET = ["aria-label"], DT = ["id", "aria-multiselectable"], OT = { class: "mc-tree-select__search" }, kT = ["placeholder", "aria-label"], AT = { class: "mc-tree-select__tree" }, jT = [
	"aria-level",
	"aria-expanded",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], MT = ["aria-label", "onClick"], NT = {
	key: 0,
	class: "mc-tree-select__check"
}, PT = [
	"checked",
	"disabled",
	"aria-label",
	"onChange"
], FT = {
	key: 1,
	class: "mc-tree-select__dash"
}, IT = { class: "mc-tree-select__label" }, LT = {
	key: 0,
	class: "mc-tree-select__empty"
}, RT = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTreeSelect",
	__name: "TreeSelect",
	props: {
		modelValue: { default: void 0 },
		options: { default: () => [] },
		multiple: {
			type: Boolean,
			default: !1
		},
		checkable: {
			type: Boolean,
			default: !1
		},
		placeholder: { default: "Select…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		clearable: {
			type: Boolean,
			default: !0
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		open: {
			type: Boolean,
			default: !1
		},
		teleport: {
			type: [Boolean, String],
			default: !0
		},
		customClass: {}
	},
	emits: [
		"update:modelValue",
		"update:open",
		"change",
		"open",
		"close"
	],
	setup(r, { emit: a }) {
		let u = r, d = a, p = Zt(), m = An(), h = Fi("mc-tree-select"), g = N(null), _ = N(null), v = N(null), y = N(u.open), { isTop: b } = On({ active: y }), { style: w, transformOrigin: D, update: k, startAutoUpdate: j, stopAutoUpdate: M } = _n(g, _, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: Tn({ active: y })
		}), F = N(/* @__PURE__ */ new Set()), I = N(""), L = N(0);
		G(() => u.open, (e) => {
			y.value = e, e ? S(() => {
				k(), j(), v.value?.focus();
			}) : M();
		});
		let z = i(() => u.multiple ? Array.isArray(u.modelValue) ? [...u.modelValue] : [] : u.modelValue === void 0 || u.modelValue === null ? [] : [u.modelValue]), V = i(() => new Set(z.value)), H = i(() => {
			let e = /* @__PURE__ */ new Map(), t = (n) => {
				for (let r of n) e.set(r.value, r), r.children?.length && t(r.children);
			};
			return t(u.options), e;
		}), W = i(() => z.value.map((e) => H.value.get(e)?.label ?? String(e))), K = i(() => z.value.length > 0), J = i(() => u.multiple ? "" : W.value[0] ?? "");
		function ne(e, t) {
			return !t || e.label.toLowerCase().includes(t);
		}
		function re(e, t, n) {
			let r = !1;
			for (let i of e) {
				let e = !1;
				i.children?.length && (e = re(i.children, t, n)), (ne(i, t) || e) && (n.add(i.value), r = !0);
			}
			return r;
		}
		let ie = i(() => {
			if (!I.value.trim()) return null;
			let e = /* @__PURE__ */ new Set();
			return re(u.options, I.value.trim().toLowerCase(), e), e;
		});
		function Y(e) {
			let t = +!!V.value.has(e.value);
			for (let n of e.children ?? []) t += Y(n);
			return t;
		}
		function ae(e) {
			let t = 1;
			for (let n of e.children ?? []) t += ae(n);
			return t;
		}
		let oe = i(() => {
			I.value.trim().toLowerCase();
			let e = ie.value, t = [], n = (r, i) => {
				for (let a of r) {
					if (e && !e.has(a.value)) continue;
					let r = !!a.children?.length, o = e ? r : F.value.has(a.value), s = Y(a), c = ae(a);
					t.push({
						option: a,
						depth: i,
						hasChildren: r,
						expanded: o,
						indeterminate: s > 0 && s < c
					}), r && o && n(a.children, i + 1);
				}
			};
			return n(u.options, 0), t;
		});
		function se(e) {
			u.disabled && e || y.value !== e && (y.value = e, d("update:open", e), e ? (d("open"), S(() => {
				k(), j(), v.value?.focus();
			})) : (d("close"), I.value = "", M()));
		}
		function ce() {
			se(!y.value);
		}
		function le(e) {
			if (!y.value) return;
			let t = e.target;
			t && (g.value?.contains(t) || _.value?.contains(t) || se(!1));
		}
		O(() => document.addEventListener("mousedown", le)), E(() => {
			document.removeEventListener("mousedown", le), M();
		});
		function ue(e) {
			if (!e.hasChildren) return;
			let t = new Set(F.value);
			t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), F.value = t;
		}
		function de(e) {
			let t = u.multiple ? e : e[0] ?? void 0;
			d("update:modelValue", t), d("change", t);
		}
		function fe(e) {
			if (!e.option.disabled) {
				if (u.checkable) {
					let t = new Set(V.value);
					t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), de([...t]);
				} else e.hasChildren && !u.multiple ? ue(e) : (de([e.option.value]), u.multiple || se(!1));
			}
		}
		function pe(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function me(e) {
			if (e.option.disabled) return;
			let t = new Set(V.value);
			t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), de([...t]);
		}
		function he() {
			de([]);
		}
		function ge(e) {
			de(z.value.filter((t) => t !== e));
		}
		function _e(e) {
			e.key === "Escape" && y.value && b() ? (e.stopPropagation(), se(!1)) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), y.value || se(!0));
		}
		function X(e) {
			if (e.key === "Escape" && b()) {
				e.stopPropagation();
				let t = _.value?.contains(document.activeElement) ?? !1;
				se(!1), t && g.value?.focus({ preventScroll: !0 });
				return;
			}
			let t = oe.value;
			if (e.key === "ArrowDown") e.preventDefault(), L.value = Math.min(L.value + 1, t.length - 1);
			else if (e.key === "ArrowUp") e.preventDefault(), L.value = Math.max(L.value - 1, 0);
			else if (e.key === "Enter") {
				e.preventDefault();
				let n = t[L.value];
				n && fe(n);
			}
		}
		let ve = i(() => typeof u.teleport == "string" ? u.teleport : "body"), ye = i(() => Z("mc-tree-select", `mc-tree-select--${u.variant}`, `mc-tree-select--${u.size}`, {
			"is-open": y.value,
			"is-disabled": u.disabled,
			"is-empty": !K.value,
			"is-multiple": u.multiple
		}, u.customClass));
		return (i, a) => (A(), c("div", { class: C(ye.value) }, [l("button", {
			ref_key: "trigger",
			ref: g,
			type: "button",
			class: "mc-tree-select__trigger mc-sheen-sweep",
			disabled: r.disabled,
			"aria-disabled": r.disabled || void 0,
			"aria-expanded": y.value,
			"aria-haspopup": "tree",
			"aria-controls": B(h),
			onClick: ce,
			onKeydown: _e
		}, [
			a[3] || (a[3] = l("span", {
				class: "mc-tree-select__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			u.multiple && z.value.length ? (A(), c("span", ST, [(A(!0), c(e, null, P(z.value, (e) => (A(), c("span", {
				key: String(e),
				class: "mc-tree-select__chip"
			}, [l("span", CT, R(H.value.get(e)?.label ?? e), 1), l("span", {
				class: "mc-tree-select__chip-close",
				role: "button",
				tabindex: "-1",
				"aria-label": `remove ${H.value.get(e)?.label ?? e}`,
				onClick: q((t) => ge(e), ["stop"])
			}, [f($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, wT)]))), 128))])) : (A(), c("span", {
				key: 1,
				class: C(["mc-tree-select__value", { "is-placeholder": !K.value }])
			}, R(K.value ? J.value : B(p).select.placeholder || r.placeholder), 3)),
			l("span", TT, [r.clearable && K.value ? (A(), c("span", {
				key: 0,
				class: "mc-tree-select__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": B(p).treeSelect?.clear ?? "clear",
				onClick: q(he, ["stop"])
			}, [f($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, ET)) : s("", !0), f($, {
				name: "chevron-down",
				size: 14,
				class: C(["mc-tree-select__caret", { "is-spin": y.value }])
			}, null, 8, ["class"])])
		], 40, xT), (A(), o(t, {
			to: ve.value,
			disabled: !r.teleport
		}, [f(n, { name: "mc-overlay-fade" }, {
			default: ee(() => [y.value ? (A(), c("div", x({
				key: 0,
				ref_key: "floating",
				ref: _,
				class: "mc-tree-select__panel",
				style: B(w)
			}, B(m), {
				id: B(h),
				role: "tree",
				"aria-multiselectable": u.multiple || void 0,
				onKeydown: X
			}), [l("div", {
				class: "mc-tree-select__inner mc-grain-overlay",
				style: T({ transformOrigin: B(D) })
			}, [l("div", OT, [
				f($, {
					name: "search",
					size: 13,
					class: "mc-tree-select__search-icon"
				}),
				te(l("input", {
					ref_key: "searchInput",
					ref: v,
					"onUpdate:modelValue": a[0] || (a[0] = (e) => I.value = e),
					type: "search",
					class: "mc-tree-select__search-input",
					placeholder: B(p).select.placeholder,
					"aria-label": B(p).treeSelect?.search ?? "search options"
				}, null, 8, kT), [[U, I.value]]),
				I.value ? (A(), c("span", {
					key: 0,
					class: "mc-tree-select__search-clear",
					onClick: a[1] || (a[1] = (e) => I.value = "")
				}, [f($, {
					name: "close",
					size: 11,
					"stroke-width": 2.6
				})])) : s("", !0)
			]), l("div", AT, [(A(!0), c(e, null, P(oe.value, (e, t) => (A(), c("div", {
				key: String(e.option.value),
				class: C(["mc-tree-select__row", {
					"is-highlight": t === L.value,
					"is-checked": V.value.has(e.option.value)
				}]),
				style: T({ "--mc-tree-depth": e.depth }),
				role: "treeitem",
				"aria-level": e.depth + 1,
				"aria-expanded": e.hasChildren ? e.expanded : void 0,
				"aria-selected": V.value.has(e.option.value),
				"aria-disabled": e.option.disabled || void 0,
				onClick: (t) => fe(e),
				onMouseenter: (e) => L.value = t,
				onMousemove: pe
			}, [
				a[4] || (a[4] = l("span", { class: "mc-tree-select__indent" }, null, -1)),
				l("span", {
					class: C(["mc-tree-select__twisty", {
						"is-open": e.expanded,
						"is-hidden": !e.hasChildren
					}]),
					role: "button",
					tabindex: "-1",
					"aria-label": e.expanded ? B(p).treeSelect?.collapse ?? "collapse" : B(p).treeSelect?.expand ?? "expand",
					onClick: q((t) => ue(e), ["stop"])
				}, [f($, {
					name: "chevron-right",
					size: 12,
					"stroke-width": 2.4
				})], 10, MT),
				u.checkable ? (A(), c("label", NT, [l("input", {
					type: "checkbox",
					checked: V.value.has(e.option.value),
					disabled: e.option.disabled,
					"aria-label": e.option.label,
					onClick: a[2] || (a[2] = q(() => {}, ["stop"])),
					onChange: (t) => me(e)
				}, null, 40, PT), l("span", { class: C(["mc-tree-select__box", {
					"is-checked": V.value.has(e.option.value),
					"is-mixed": e.indeterminate
				}]) }, [V.value.has(e.option.value) ? (A(), o($, {
					key: 0,
					name: "check",
					size: 10,
					"stroke-width": 3
				})) : e.indeterminate ? (A(), c("span", FT)) : s("", !0)], 2)])) : s("", !0),
				l("span", IT, R(e.option.label), 1)
			], 46, jT))), 128)), oe.value.length ? s("", !0) : (A(), c("p", LT, R(B(p).select.noMatch), 1))])], 4)], 16, DT)) : s("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-cfd1c4f2"]]), zT = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiTypography",
	__name: "Typography",
	props: {
		variant: { default: "body" },
		font: { default: "sans" },
		weight: {},
		italic: { type: Boolean },
		treatment: {},
		gradient: {
			type: Boolean,
			default: !1
		},
		align: { default: "left" },
		truncate: { type: Boolean },
		clamp: {},
		underline: { type: Boolean },
		glow: { type: Boolean },
		aurora: {
			type: Boolean,
			default: !1
		},
		sheen: {
			type: Boolean,
			default: !1
		},
		stroke: {
			type: [Boolean, Number],
			default: !1
		},
		focusable: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: {},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => !!t.stroke && !t.gradient), r = i(() => Z("mc-typography", `mc-typography--${t.variant}`, `mc-font--${t.font}`, `is-align-${t.align}`, {
			"is-gradient": t.gradient,
			"is-aurora": t.aurora,
			"is-truncate": t.truncate,
			"is-underline": t.underline,
			"is-glow": t.glow,
			"is-sheen": t.sheen,
			"is-stroke": n.value,
			"is-focusable": t.focusable,
			"is-disabled": t.disabled,
			"is-italic": t.italic,
			[`is-treatment-${t.treatment}`]: !!t.treatment,
			[`is-clamp-${t.clamp}`]: !!t.clamp
		}, t.customClass)), a = i(() => {
			let e = {};
			return t.color && (e.color = t.color), typeof t.weight == "number" && Number.isFinite(t.weight) && (e.fontWeight = String(Math.min(900, Math.max(100, Math.round(t.weight))))), n.value && typeof t.stroke == "number" && Number.isFinite(t.stroke) && (e["--mc-text-stroke-width"] = `${Math.min(12, Math.max(.5, t.stroke))}px`), Object.keys(e).length ? e : void 0;
		}), o = i(() => ({
			class: r.value,
			style: a.value,
			tabindex: t.focusable ? 0 : void 0,
			"aria-disabled": t.disabled || void 0
		}));
		return (t, n) => e.variant === "h1" ? (A(), c("h1", w(x({ key: 0 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h2" ? (A(), c("h2", w(x({ key: 1 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h3" ? (A(), c("h3", w(x({ key: 2 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h4" ? (A(), c("h4", w(x({ key: 3 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h5" ? (A(), c("h5", w(x({ key: 4 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h6" ? (A(), c("h6", w(x({ key: 5 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16)) : (A(), c("div", w(x({ key: 6 }, o.value)), [F(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-7569a8a9"]]), BT = [
	"accept",
	"multiple",
	"disabled",
	"id"
], VT = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onKeydown"
], HT = { class: "mc-upload__icon" }, UT = { class: "mc-upload__tip" }, WT = {
	key: 0,
	class: "mc-upload__limit"
}, GT = {
	key: 0,
	class: "mc-upload__notice",
	role: "alert",
	"aria-live": "assertive"
}, KT = { class: "mc-upload__notice-name" }, qT = { class: "mc-upload__notice-reason" }, JT = {
	key: 0,
	class: "mc-upload__thumb"
}, YT = ["src", "alt"], XT = {
	key: 1,
	class: "mc-upload__badge"
}, ZT = { class: "mc-upload__meta" }, QT = ["title"], $T = {
	key: 0,
	class: "mc-upload__percent"
}, eE = {
	key: 1,
	class: "mc-upload__state is-success"
}, tE = {
	key: 2,
	class: "mc-upload__state is-error",
	role: "alert"
}, nE = {
	key: 2,
	class: "mc-upload__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, rE = ["stroke-dasharray"], iE = { class: "mc-upload__actions" }, aE = [
	"aria-label",
	"disabled",
	"onClick"
], oE = [
	"aria-label",
	"disabled",
	"onClick"
], sE = [
	"aria-label",
	"disabled",
	"onClick"
], cE = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiUpload",
	__name: "Upload",
	props: {
		fileList: { default: () => [] },
		action: { default: "" },
		autoUpload: {
			type: Boolean,
			default: !0
		},
		accept: { default: "" },
		max: { default: 0 },
		maxCount: { default: 0 },
		maxSize: { default: 0 },
		beforeUpload: {},
		customRequest: {},
		headers: { default: void 0 },
		withCredentials: {
			type: Boolean,
			default: !1
		},
		showCancel: {
			type: Boolean,
			default: !0
		},
		listType: { default: "text" },
		disabled: {
			type: Boolean,
			default: !1
		},
		multiple: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	emits: [
		"update:fileList",
		"change",
		"remove",
		"progress",
		"success",
		"error",
		"exceed",
		"reject",
		"cancel"
	],
	setup(t, { expose: n, emit: r }) {
		let a = t, u = r, p = Zt(), m = Fi("mc-upload"), h = N(null), _ = N(!1), v = N({}), y = N([]), b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), T = 0;
		function D() {
			return T += 1, `mc-upload-${Date.now()}-${T}`;
		}
		let O = i(() => {
			let e = a.max > 0 ? a.max : 0, t = a.maxCount > 0 ? a.maxCount : 0;
			return e && t ? Math.min(e, t) : e || t;
		});
		function k(e) {
			if (!Number.isFinite(e) || e <= 0) return "0 B";
			let t = [
				"B",
				"KB",
				"MB",
				"GB",
				"TB"
			], n = e, r = 0;
			for (; n >= 1024 && r < t.length - 1;) n /= 1024, r += 1;
			let i = r === 0 || n >= 10 ? 0 : 1;
			return `${n.toFixed(i).replace(/\.0$/, "")} ${t[r]}`;
		}
		function j(e, t) {
			let n = {
				file: e,
				reason: t
			};
			y.value = [...y.value, n], u("reject", n);
		}
		let M = i(() => ({
			uploaded: p.value.upload.uploaded ?? "Uploaded",
			failed: p.value.upload.failed ?? "Failed",
			typeNotAllowed: p.value.upload.typeNotAllowed ?? "File type is not allowed",
			countLimit: p.value.upload.countLimit ?? "Only {count} files can be uploaded",
			sizeLimit: p.value.upload.sizeLimit ?? "File is bigger than {size}",
			rejected: p.value.upload.rejected ?? "File was rejected",
			cancel: p.value.upload.cancel ?? "Cancel upload of {name}",
			retry: p.value.upload.retry ?? "Retry upload of {name}"
		}));
		function I(e) {
			if (!a.accept) return !0;
			let t = a.accept.toLowerCase();
			for (let n of t.split(",")) {
				let t = n.trim();
				if (t) {
					if (t.startsWith(".")) {
						if (e.name.toLowerCase().endsWith(t)) return !0;
					} else if (t.endsWith("/*")) {
						if (e.type.startsWith(t.slice(0, -1))) return !0;
					} else if (e.type.toLowerCase() === t) return !0;
				}
			}
			return !1;
		}
		function L(e) {
			return e.type.startsWith("image/");
		}
		function z(e, t) {
			let n = (a.fileList ?? []).map((n) => n.uid === e ? {
				...n,
				...t
			} : n);
			u("update:fileList", n), u("change", n);
		}
		function V(e) {
			return (a.fileList ?? []).find((t) => t.uid === e);
		}
		function H(e) {
			let t = x.get(e);
			t && (x.delete(e), t.abort());
			let n = b.get(e);
			n !== void 0 && (b.delete(e), window.clearInterval(n));
			let r = S.get(e);
			r && (S.delete(e), r.abort());
		}
		function U(e) {
			if (!e.file) return;
			z(e.uid, {
				status: "uploading",
				percent: 0
			});
			let t = new AbortController();
			if (S.set(e.uid, t), a.customRequest) {
				a.customRequest({
					file: e.file,
					headers: a.headers,
					withCredentials: a.withCredentials,
					signal: t.signal,
					onProgress: (t) => {
						let n = Math.max(0, Math.min(100, Math.round(t)));
						z(e.uid, { percent: n }), u("progress", {
							uid: e.uid,
							percent: n
						});
					},
					onSuccess: (t) => {
						S.delete(e.uid), z(e.uid, {
							status: "success",
							percent: 100,
							url: typeof t == "string" ? t : void 0,
							error: void 0
						});
						let n = V(e.uid);
						n && u("success", n);
					},
					onError: (t) => {
						S.delete(e.uid), z(e.uid, {
							status: "error",
							error: t?.message || M.value.failed
						});
						let n = V(e.uid);
						n && u("error", n);
					},
					onComplete: () => {
						S.delete(e.uid);
						let t = V(e.uid);
						if (!t || t.status !== "uploading") return;
						z(e.uid, {
							status: "success",
							percent: 100
						});
						let n = V(e.uid);
						n && u("success", n);
					}
				});
				return;
			}
			if (a.action) {
				let t = new XMLHttpRequest();
				x.set(e.uid, t), t.open("POST", a.action, !0), t.withCredentials = a.withCredentials;
				for (let [e, n] of Object.entries(a.headers ?? {})) try {
					t.setRequestHeader(e, n);
				} catch {}
				t.upload.onprogress = (t) => {
					if (!t.lengthComputable) return;
					let n = Math.min(100, Math.round(t.loaded / t.total * 100));
					z(e.uid, { percent: n }), u("progress", {
						uid: e.uid,
						percent: n
					});
				}, t.onload = () => {
					if (x.delete(e.uid), S.delete(e.uid), t.status >= 200 && t.status < 300) {
						z(e.uid, {
							status: "success",
							percent: 100,
							url: t.responseText
						});
						let n = V(e.uid);
						n && u("success", n);
					} else {
						z(e.uid, { status: "error" });
						let t = V(e.uid);
						t && u("error", t);
					}
				}, t.onerror = () => {
					x.delete(e.uid), S.delete(e.uid), z(e.uid, { status: "error" });
					let t = V(e.uid);
					t && u("error", t);
				};
				let n = new FormData();
				n.append("file", e.file), t.send(n);
				return;
			}
			let n = 0, r = window.setInterval(() => {
				if (n = Math.min(100, n + 7 + Math.round(Math.random() * 9)), z(e.uid, { percent: n }), u("progress", {
					uid: e.uid,
					percent: n
				}), n >= 100) {
					window.clearInterval(r), b.delete(e.uid), S.delete(e.uid), z(e.uid, {
						status: "success",
						percent: 100
					});
					let t = V(e.uid);
					t && u("success", t);
				}
			}, 140);
			b.set(e.uid, r);
		}
		async function W(e) {
			if (a.disabled) return;
			let t = Array.from(e);
			y.value = [];
			let n = t.filter((e) => !I(e));
			n.length && u("exceed", n);
			for (let e of n) j(e, M.value.typeNotAllowed);
			let r = t.filter(I), i = O.value, o = i > 0 ? Math.max(i - (a.fileList ?? []).length, 0) : Infinity, s = r.slice(0, o);
			if (r.length > s.length) {
				let e = r.slice(s.length);
				u("exceed", e);
				for (let t of e) j(t, M.value.countLimit.replace("{count}", String(i)));
			}
			if (!s.length) return;
			let c = a.beforeUpload, l = [];
			for (let e of s) if (a.maxSize > 0 && e.size > a.maxSize) j(e, M.value.sizeLimit.replace("{size}", k(a.maxSize)));
			else {
				if (c) {
					let n = !1;
					try {
						n = await c(e, t);
					} catch {
						n = !1;
					}
					if (!n) {
						j(e, M.value.rejected);
						continue;
					}
				}
				l.push(e);
			}
			if (!l.length) return;
			let d = l.map((e) => ({
				uid: D(),
				name: e.name,
				status: a.autoUpload ? "uploading" : "ready",
				percent: 0,
				file: e
			}));
			for (let e of d) e.file && L(e.file) && (v.value[e.uid] = URL.createObjectURL(e.file));
			let f = (a.fileList ?? []).concat(d);
			if (u("update:fileList", f), u("change", f), a.autoUpload) for (let e of d) U(e);
		}
		function G(e) {
			let t = e.target;
			t.files?.length && W(t.files), t.value = "";
		}
		function ee(e) {
			if (_.value = !1, a.disabled) return;
			let t = e.dataTransfer?.files;
			t?.length && W(t);
		}
		function te(e) {
			a.disabled || (e.preventDefault(), _.value = !0);
		}
		function J() {
			_.value = !1;
		}
		function ne() {
			a.disabled || h.value?.click();
		}
		function re(e) {
			let t = v.value[e.uid];
			t && (URL.revokeObjectURL(t), delete v.value[e.uid]);
			let n = (a.fileList ?? []).filter((t) => t.uid !== e.uid);
			u("update:fileList", n), u("change", n);
		}
		function ie(e) {
			a.disabled || (H(e.uid), re(e), u("remove", e));
		}
		function Y(e) {
			H(e.uid), re(e), u("cancel", e);
		}
		function ae() {
			for (let e of a.fileList ?? []) e.status === "uploading" && Y(e);
		}
		function oe(e) {
			a.disabled || U(e);
		}
		function se(e) {
			return v.value[e.uid] ?? e.url ?? "";
		}
		E(() => {
			for (let e of b.values()) window.clearInterval(e);
			b.clear();
			for (let e of x.values()) e.abort();
			x.clear();
			for (let e of S.values()) e.abort();
			S.clear();
			for (let e of Object.values(v.value)) URL.revokeObjectURL(e);
		});
		let ce = i(() => a.fileList ?? []), le = i(() => ({
			files: ce.value,
			remove: ie,
			retry: oe,
			cancel: Y
		}));
		n({ cancel: ae });
		let ue = i(() => a.listType !== "text"), de = i(() => a.listType === "picture-card"), fe = i(() => Z("mc-upload", `mc-upload--${a.listType}`, {
			"is-disabled": a.disabled,
			"is-dragging": _.value
		}, a.customClass));
		return (n, r) => (A(), c("div", { class: C(fe.value) }, [
			l("input", {
				ref_key: "input",
				ref: h,
				type: "file",
				class: "mc-upload__input",
				accept: a.accept,
				multiple: t.multiple,
				disabled: t.disabled,
				id: B(m),
				onChange: G
			}, null, 40, BT),
			l("div", {
				class: C(["mc-upload__zone mc-sheen-sweep", { "is-dragging": _.value }]),
				role: "button",
				tabindex: t.disabled ? -1 : 0,
				"aria-disabled": t.disabled || void 0,
				"aria-label": B(p).upload.tip,
				onClick: ne,
				onKeydown: [K(q(ne, ["prevent"]), ["enter"]), K(q(ne, ["prevent"]), ["space"])],
				onDrop: ee,
				onDragover: te,
				onDragleave: J
			}, [
				r[0] || (r[0] = l("span", {
					class: "mc-upload__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				r[1] || (r[1] = l("span", {
					class: "mc-upload__halo",
					"aria-hidden": "true"
				}, null, -1)),
				l("span", HT, [f($, {
					name: "upload",
					size: 20
				})]),
				l("span", UT, R(B(p).upload.tip), 1),
				O.value ? (A(), c("span", WT, R(B(p).upload.max.replace("{count}", String(O.value))), 1)) : s("", !0)
			], 42, VT),
			y.value.length ? (A(), c("div", GT, [(A(!0), c(e, null, P(y.value, (e, t) => (A(), c("p", {
				key: t,
				class: "mc-upload__notice-line"
			}, [
				f($, {
					name: "alert-circle",
					size: 13
				}),
				l("span", KT, R(e.file.name), 1),
				l("span", qT, R(e.reason), 1)
			]))), 128))])) : s("", !0),
			F(n.$slots, "file-list", w(g(le.value)), () => [F(n.$slots, "fileList", w(g(le.value)), () => [ce.value.length ? (A(), c("ul", {
				key: 0,
				class: C(["mc-upload__list", { "is-grid": ue.value }])
			}, [(A(!0), c(e, null, P(ce.value, (e) => (A(), c("li", {
				key: e.uid,
				class: C(["mc-upload__item", [`is-${e.status}`, {
					"is-card": de.value,
					"is-thumb": ue.value && !de.value
				}]])
			}, [
				ue.value ? (A(), c("span", JT, [se(e) ? (A(), c("img", {
					key: 0,
					src: se(e),
					alt: e.name
				}, null, 8, YT)) : (A(), o($, {
					key: 1,
					name: "file",
					size: 18,
					class: "mc-upload__thumb-icon"
				}))])) : (A(), c("span", XT, [f($, {
					name: "file-text",
					size: 15
				})])),
				l("span", ZT, [l("span", {
					class: "mc-upload__name",
					title: e.name
				}, R(e.name), 9, QT), e.status === "uploading" ? (A(), c("span", $T, R(e.percent) + "% ", 1)) : e.status === "success" ? (A(), c("span", eE, [f($, {
					name: "circle-check",
					size: 12
				}), d(" " + R(M.value.uploaded), 1)])) : e.status === "error" ? (A(), c("span", tE, [f($, {
					name: "alert-circle",
					size: 12
				}), d(" " + R(e.error || M.value.failed), 1)])) : s("", !0)]),
				e.status === "uploading" ? (A(), c("svg", nE, [r[2] || (r[2] = l("circle", {
					class: "mc-upload__ring-track",
					cx: "18",
					cy: "18",
					r: "15",
					fill: "none",
					"stroke-width": "3"
				}, null, -1)), l("circle", {
					class: "mc-upload__ring-bar",
					cx: "18",
					cy: "18",
					r: "15",
					fill: "none",
					"stroke-width": "3",
					"stroke-linecap": "round",
					"stroke-dasharray": `${e.percent / 100 * 94.25} 94.25`,
					transform: "rotate(-90 18 18)"
				}, null, 8, rE)])) : s("", !0),
				l("span", iE, [
					e.status === "error" ? (A(), c("button", {
						key: 0,
						type: "button",
						class: "mc-upload__action",
						"aria-label": M.value.retry.replace("{name}", e.name),
						disabled: t.disabled,
						onClick: (t) => oe(e)
					}, [f($, {
						name: "refresh",
						size: 13
					})], 8, aE)) : s("", !0),
					e.status === "uploading" && t.showCancel ? (A(), c("button", {
						key: 1,
						type: "button",
						class: "mc-upload__action mc-upload__action--cancel",
						"aria-label": M.value.cancel.replace("{name}", e.name),
						disabled: t.disabled,
						onClick: (t) => Y(e)
					}, [f($, {
						name: "square",
						size: 10,
						fill: !0
					})], 8, oE)) : s("", !0),
					l("button", {
						type: "button",
						class: "mc-upload__action",
						"aria-label": `remove ${e.name}`,
						disabled: t.disabled,
						onClick: (t) => ie(e)
					}, [f($, {
						name: "close",
						size: 13,
						"stroke-width": 2.4
					})], 8, sE)
				])
			], 2))), 128))], 2)) : s("", !0)], !0)], !0)
		], 2));
	}
}), [["__scopeId", "data-v-0adda6b1"]]), lE = {
	key: 0,
	class: "mc-vertical-text__aurora",
	"aria-hidden": "true"
}, uE = {
	key: 1,
	class: "mc-vertical-text__grain",
	"aria-hidden": "true"
}, dE = { class: "mc-vertical-text__body" }, fE = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiVerticalText",
	__name: "VerticalText",
	props: {
		text: {},
		direction: { default: "rtl" },
		upright: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" },
		tone: { default: "ink" },
		align: { default: "start" },
		tracking: { default: "normal" },
		rule: {
			type: Boolean,
			default: !1
		},
		plate: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(e) {
		let t = e, n = i(() => Z("mc-vertical-text", `mc-vertical-text--${t.direction}`, `mc-vertical-text--${t.size}`, `mc-vertical-text--${t.tone}`, `is-align-${t.align}`, {
			"is-upright": t.upright,
			"is-tracking": t.tracking === "wide",
			"has-rule": t.rule,
			"is-plate": t.plate
		}, t.plate ? "mc-sheen-sweep" : void 0, t.customClass));
		return (t, r) => (A(), c("div", { class: C(n.value) }, [
			e.plate ? (A(), c("span", lE)) : s("", !0),
			e.plate ? (A(), c("span", uE)) : s("", !0),
			l("div", dE, [F(t.$slots, "default", {}, () => [d(R(e.text), 1)], !0)])
		], 2));
	}
}), [["__scopeId", "data-v-35ea19aa"]]), pE = ["aria-label"], mE = ["aria-disabled"], hE = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiVirtualList",
	__name: "VirtualList",
	props: {
		items: {},
		height: { default: 400 },
		itemHeight: { default: 40 },
		overscan: { default: 5 },
		keyField: { default: "id" },
		itemClass: {},
		label: { default: "Virtual list" },
		customClass: {}
	},
	setup(t) {
		let n = t, r = N(null), a = N(0), o = N(0);
		function s(e) {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}
		let u = i(() => n.items?.length ?? 0), f = i(() => u.value * n.itemHeight), p = i(() => {
			let e = Math.floor(a.value / n.itemHeight) - n.overscan;
			return Math.max(0, e);
		}), m = i(() => {
			let e = Math.ceil((a.value + o.value) / n.itemHeight);
			return Math.min(u.value, e + n.overscan);
		}), h = i(() => {
			let e = n.items ?? [], t = [];
			for (let r = p.value; r < m.value; r += 1) {
				let i = e[r], a = i, o = a && typeof a == "object" && a[n.keyField] !== void 0 ? a[n.keyField] : r;
				t.push({
					key: o,
					index: r,
					item: i
				});
			}
			return t;
		});
		function g(e) {
			if (e == null) return "";
			if (typeof e == "string" || typeof e == "number") return String(e);
			let t = e;
			return typeof t.label == "string" ? t.label : typeof t.title == "string" ? t.title : "";
		}
		function _(e) {
			return !e || typeof e != "object" ? !1 : e.disabled === !0;
		}
		function v() {
			a.value = r.value?.scrollTop ?? 0;
		}
		let y = null;
		O(() => {
			let e = r.value;
			e && (o.value = e.clientHeight, typeof ResizeObserver < "u" && (y = new ResizeObserver(() => {
				o.value = e.clientHeight;
			}), y.observe(e)));
		}), E(() => {
			y?.disconnect(), y = null;
		});
		let b = i(() => ({ height: s(n.height) })), x = i(() => Z("mc-virtual-list", "mc-grain-overlay", n.customClass));
		return (n, i) => (A(), c("div", {
			class: C(x.value),
			style: T(b.value)
		}, [i[0] || (i[0] = l("span", {
			class: "mc-virtual-list__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), l("div", {
			ref_key: "viewport",
			ref: r,
			class: "mc-virtual-list__viewport",
			role: "list",
			tabindex: "0",
			"aria-live": "off",
			"aria-label": t.label,
			onScroll: v
		}, [l("div", {
			class: "mc-virtual-list__spacer",
			style: T({ height: `${f.value}px` })
		}, [(A(!0), c(e, null, P(h.value, (e) => (A(), c("div", {
			key: e.key,
			class: C(["mc-virtual-list__item mc-sheen-sweep", [t.itemClass, { "is-disabled": _(e.item) }]]),
			role: "listitem",
			"aria-disabled": _(e.item) ? "true" : void 0,
			style: T({
				height: `${t.itemHeight}px`,
				transform: `translateY(${e.index * t.itemHeight}px)`
			})
		}, [F(n.$slots, "default", {
			item: e.item,
			index: e.index
		}, () => [d(R(g(e.item)), 1)], !0)], 14, mE))), 128))], 4)], 40, pE)], 6));
	}
}), [["__scopeId", "data-v-ab4d12c2"]]), gE = [
	"tabindex",
	"aria-hidden",
	"aria-label"
], _E = /*#__PURE__*/ Q(/* @__PURE__ */ p({
	name: "MochiWatermark",
	__name: "Watermark",
	props: {
		content: { default: "Mochi UI" },
		fullscreen: {
			type: Boolean,
			default: !1
		},
		fontSize: { default: 16 },
		rotate: { default: -22 },
		gapX: { default: 180 },
		gapY: { default: 110 },
		color: {},
		opacity: { default: .16 },
		fontFamily: {},
		fontWeight: { default: 600 },
		zIndex: { default: 0 },
		gradient: {
			type: Boolean,
			default: !0
		},
		interactive: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	},
	setup(t) {
		let n = t, r = Zt(), a = N(null);
		function o(e) {
			n.interactive && !n.disabled && bt(e, a.value);
		}
		let s = N({
			width: 0,
			height: 0
		});
		function u() {
			let e = a.value;
			if (!e) return;
			if (n.fullscreen) {
				if (!wt) return;
				s.value = {
					width: e.clientWidth,
					height: e.clientHeight
				};
				return;
			}
			let t = e.parentElement;
			s.value = {
				width: e.clientWidth,
				height: t?.clientHeight || e.clientHeight
			};
		}
		let d = null;
		function f() {
			d?.disconnect(), d = null;
			let e = a.value;
			e && typeof ResizeObserver < "u" && (d = new ResizeObserver(() => u()), d.observe(n.fullscreen ? e : e.parentElement ?? e));
		}
		O(() => {
			u(), f();
		}), E(() => {
			d?.disconnect(), d = null;
		}), G(() => n.fullscreen, () => {
			u(), f();
		});
		let p = i(() => {
			let e = Math.max(1, Math.floor(s.value.width / n.gapX)), t = Math.max(1, Math.ceil(s.value.height / (n.gapY + n.fontSize))), r = [];
			for (let n = 0; n < t; n++) for (let t = 0; t < e; t++) r.push({ key: `${n}-${t}` });
			return r;
		}), m = i(() => !n.gradient || !!n.color), h = i(() => Z("mc-watermark", {
			"is-fullscreen": n.fullscreen,
			"is-plain": m.value,
			"is-interactive": n.interactive,
			"is-disabled": n.disabled
		}, n.customClass));
		return (n, i) => (A(), c("div", {
			ref_key: "host",
			ref: a,
			class: C(h.value),
			style: T({ zIndex: t.zIndex }),
			tabindex: t.interactive ? 0 : void 0,
			"aria-hidden": t.interactive ? void 0 : "true",
			"aria-label": t.interactive ? B(r).watermark?.label ?? "Watermark" : void 0,
			onKeydown: q(o, ["self"])
		}, [l("div", {
			class: "mc-watermark__layer",
			style: T({
				opacity: t.opacity,
				rotate: `${t.rotate}deg`,
				gridTemplateColumns: `repeat(auto-fill, ${t.gapX}px)`,
				rowGap: `${t.gapY}px`,
				height: `${s.value.height}px`,
				fontSize: `${t.fontSize}px`,
				fontFamily: t.fontFamily,
				fontWeight: t.fontWeight,
				color: t.color
			})
		}, [(A(!0), c(e, null, P(p.value, (e) => (A(), c("span", {
			key: e.key,
			class: "mc-watermark__text"
		}, R(t.content), 1))), 128))], 4)], 46, gE));
	}
}), [["__scopeId", "data-v-4f39bc55"]]), vE = /* @__PURE__ */ ne({
	Affix: () => zt,
	Alert: () => cn,
	Anchor: () => fn,
	Aurora: () => pn,
	AutoComplete: () => Ln,
	Avatar: () => Hn,
	BackTop: () => Wn,
	Badge: () => qn,
	Barcode: () => mr,
	Breadcrumb: () => Tr,
	Button: () => Fr,
	Calendar: () => ri,
	Card: () => gi,
	Carousel: () => Ni,
	Cascader: () => Qi,
	Chart: () => po,
	Checkbox: () => _o,
	CircleCutout: () => bo,
	ClipboardButton: () => To,
	Code: () => ls,
	Collapse: () => gs,
	CollapseTransition: () => Ss,
	ColorPicker: () => Ls,
	CommandBar: () => Hs,
	CommandPalette: () => sc,
	ConfigProvider: () => vc,
	Countdown: () => xc,
	DEFAULT_CATEGORIES: () => ff,
	DataTable: () => zl,
	DatePicker: () => gu,
	Descriptions: () => Ou,
	Dialog: () => Lu,
	Diff: () => nd,
	DiscreteApi: () => id,
	Divider: () => ld,
	Dock: () => _d,
	Drawer: () => Ed,
	Dropdown: () => Fd,
	DynamicInput: () => zd,
	DynamicTags: () => qd,
	Element: () => sf,
	Ellipsis: () => df,
	Emoji: () => Of,
	Empty: () => Nf,
	Equation: () => Hf,
	ErrorBoundary: () => Zf,
	Flex: () => Qf,
	FloatButton: () => ip,
	Form: () => cp,
	FormItem: () => hp,
	FormRow: () => vp,
	Gauge: () => Vp,
	GlobalStyle: () => Hp,
	GradientText: () => Wp,
	Grid: () => Gp,
	Heatmap: () => rm,
	Highlight: () => om,
	Icon: () => $,
	IconRail: () => mm,
	Image: () => jm,
	ImageGroup: () => qm,
	InfiniteScroll: () => Qm,
	Input: () => ih,
	InputNumber: () => fh,
	InputOTP: () => gh,
	KpiCard: () => Bh,
	Layout: () => qh,
	LevelMeter: () => tg,
	LiquidGlass: () => rg,
	List: () => _g,
	LoadingBar: () => yg,
	Log: () => Ag,
	Marquee: () => Ng,
	Masonry: () => Pg,
	Mention: () => Kg,
	Menu: () => e_,
	Message: () => u_,
	MessageProvider: () => b_,
	Modal: () => F_,
	Notification: () => G_,
	NotificationProvider: () => ev,
	NumberAnimation: () => pv,
	PageHeader: () => Dv,
	Pagination: () => Jv,
	Popconfirm: () => iy,
	Popover: () => fy,
	Popselect: () => Ty,
	Progress: () => Ny,
	Prose: () => Ly,
	QRCode: () => kb,
	Radio: () => Nb,
	RadioGroup: () => Fb,
	Rate: () => Kb,
	Result: () => ex,
	Scrollbar: () => ax,
	Segmented: () => ux,
	Select: () => Vx,
	Signature: () => Yx,
	Skeleton: () => Zx,
	Slider: () => nS,
	Space: () => rS,
	Sparkline: () => Th,
	Spin: () => pS,
	Split: () => yS,
	Statistic: () => AS,
	Steps: () => zS,
	Switch: () => HS,
	Table: () => iC,
	Tabs: () => fC,
	Tag: () => _C,
	Textarea: () => bC,
	Thing: () => PC,
	Time: () => RC,
	TimePicker: () => rw,
	Timeline: () => pw,
	Tooltip: () => yw,
	Tour: () => kw,
	Transfer: () => tT,
	Transport: () => cT,
	Tree: () => bT,
	TreeSelect: () => RT,
	Typography: () => zT,
	Upload: () => cE,
	VerticalText: () => fE,
	VirtualList: () => hE,
	Watermark: () => _E,
	message: () => T_,
	notification: () => av,
	useCollapseTransition: () => bs,
	useMessage: () => E_,
	useNotification: () => ov
}), yE = {
	small: {
		height: "var(--mc-control-height-sm)",
		font: "var(--mc-text-sm)",
		gap: "var(--mc-space-2)"
	},
	medium: {
		height: "var(--mc-control-height-md)",
		font: "var(--mc-text-base)",
		gap: "var(--mc-space-3)"
	},
	large: {
		height: "var(--mc-control-height-lg)",
		font: "var(--mc-text-lg)",
		gap: "var(--mc-space-4)"
	}
};
function bE(e) {
	return i(() => yE[e.value] ?? yE.medium);
}
//#endregion
//#region src/composables/useVModel.ts
function xE(e, t, n = "modelValue") {
	return i({
		get: () => e.modelValue ?? e.value,
		set: (e) => {
			t("update:modelValue", e), t("update:value", e), n === "value" && t("update:value", e);
		}
	});
}
//#endregion
//#region src/composables/useMergeProps.ts
function SE(e, t, n) {
	return i(() => {
		let r = typeof n == "function" ? n() : n, i = {
			...t,
			...e
		};
		return i.class = Z(r, t.class ?? ""), i;
	});
}
//#endregion
//#region src/composables/useInView.ts
function CE(e, t = {}) {
	let { threshold: n = 0, rootMargin: r = "0px", root: i = null, once: a = !1, delay: o = 0 } = t, s = N(!1), c = N(0), l = null, u = null;
	function d() {
		l?.disconnect(), l = null, u && (clearTimeout(u), u = null);
	}
	function f() {
		if (!wt || l) return;
		let t = e.value;
		t && (typeof IntersectionObserver > "u" ? (s.value = !0, c.value = 1) : (l = new IntersectionObserver((e) => {
			for (let t of e) if (c.value = t.intersectionRatio, t.isIntersecting) {
				let e = () => {
					s.value = !0, a && d();
				};
				o > 0 ? (u && clearTimeout(u), u = setTimeout(e, o)) : e();
			} else a || (u && (clearTimeout(u), u = null), s.value = !1);
		}, {
			threshold: n,
			rootMargin: r,
			root: i
		}), l.observe(t)));
	}
	return O(f), E(d), {
		isInView: s,
		ratio: c,
		stop: d,
		start: f
	};
}
//#endregion
//#region src/composables/useDebounce.ts
function wE(e, t = 200) {
	let n = null, r = null, i = ((...i) => {
		r = i, n && clearTimeout(n), n = setTimeout(() => {
			n = null;
			let t = r;
			r = null, t && e(...t);
		}, t);
	});
	return i.flush = () => {
		if (!n) return;
		clearTimeout(n), n = null;
		let t = r;
		r = null, t && e(...t);
	}, i.cancel = () => {
		n && clearTimeout(n), n = null, r = null;
	}, i.pending = () => n !== null, E(() => {
		n && clearTimeout(n), n = null;
	}), i;
}
function TE(e, t = 200) {
	let n = 0, r = null, i = null, a = () => typeof performance < "u" ? performance.now() : Date.now(), o = ((...o) => {
		let s = a() - n;
		if (i = o, s >= t) {
			n = a();
			let t = i;
			i = null, t && e(...t);
		} else r || (r = setTimeout(() => {
			r = null, n = a();
			let t = i;
			i = null, t && e(...t);
		}, t - s));
	});
	return o.cancel = () => {
		r && clearTimeout(r), r = null, i = null;
	}, o.pending = () => r !== null, E(() => {
		r && clearTimeout(r), r = null;
	}), o;
}
//#endregion
//#region src/composables/useMagnetic.ts
function EE(e = {}) {
	let { strength: t = .18, radius: n = 90, lift: r = 4, trackPointer: i = !0, tilt: a } = e, o = Math.max(0, a?.max ?? 0), s = N(null), c = null, l = 0;
	function u(e) {
		if (!c) return;
		let n = c.getBoundingClientRect();
		if (!n.width || !n.height) return;
		let a = e.clientX - n.left, s = e.clientY - n.top, u = a - n.width / 2, d = s - n.height / 2;
		l && cancelAnimationFrame(l), l = requestAnimationFrame(() => {
			l = 0, c?.style.setProperty("--mc-magnet-x", `${u * t}px`), c?.style.setProperty("--mc-magnet-y", `${d * t}px`), c?.style.setProperty("--mc-magnet-lift", `${r}px`), o > 0 && (c?.style.setProperty("--mc-tilt-x", `${(d / (n.height / 2) * o).toFixed(2)}deg`), c?.style.setProperty("--mc-tilt-y", `${(-(u / (n.width / 2)) * o).toFixed(2)}deg`)), i && (c?.style.setProperty("--mc-mx", `${a / n.width * 100}%`), c?.style.setProperty("--mc-my", `${s / n.height * 100}%`));
		});
	}
	function d() {
		f();
	}
	function f() {
		c && (c.style.setProperty("--mc-magnet-x", "0px"), c.style.setProperty("--mc-magnet-y", "0px"), c.style.setProperty("--mc-mx", "50%"), c.style.setProperty("--mc-my", "50%"), o > 0 && (c.style.setProperty("--mc-tilt-x", "0deg"), c.style.setProperty("--mc-tilt-y", "0deg")));
	}
	function p(e) {
		c && (c.removeEventListener("mousemove", u), c.removeEventListener("mouseleave", d)), c = e, c && (c.style.setProperty("--mc-magnet-radius", `${n}px`), c.style.setProperty("--mc-magnet-strength", String(t)), c.addEventListener("mousemove", u), c.addEventListener("mouseleave", d));
	}
	return O(() => {
		s.value && p(s.value);
	}), E(() => {
		l && cancelAnimationFrame(l), c && (c.removeEventListener("mousemove", u), c.removeEventListener("mouseleave", d)), c = null;
	}), {
		target: s,
		bind: p,
		reset: f
	};
}
//#endregion
//#region src/composables/useHostTheme.ts
function DE(e = wt ? document.documentElement : null, t = {}) {
	let { attribute: n = "data-theme", darkValue: r = "dark", lightValue: i = "light", autoValue: a = "auto", target: o = wt ? document.documentElement : null, onChange: s } = t, c = o ?? e;
	if (!c || !wt) return () => {};
	let l = null;
	function u() {
		let e = (c?.getAttribute(n) ?? "").trim().toLowerCase();
		return e === r ? "dark" : e === i ? "light" : e === a || e === "" ? window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light" : e.includes("dark") ? "dark" : "light";
	}
	function d() {
		let e = u();
		c?.setAttribute("data-mc-color-mode", e), l !== e && (l = e, s?.(e));
	}
	let f = new MutationObserver(d);
	f.observe(c, {
		attributes: !0,
		attributeFilter: [n]
	});
	let p = window.matchMedia?.("(prefers-color-scheme: dark)"), m = () => {
		let e = (c.getAttribute(n) ?? "").trim().toLowerCase();
		(!e || e === a) && d();
	};
	return p?.addEventListener?.("change", m), d(), () => {
		f.disconnect(), p?.removeEventListener?.("change", m);
	};
}
function OE(e = {}) {
	let t = N("light"), n = DE(null, {
		...e,
		onChange: (n) => {
			t.value = n, e.onChange?.(n);
		}
	});
	return E(n), {
		mode: t,
		stop: n
	};
}
function kE(e, t) {
	let n = typeof e == "object" && e && "value" in e ? e.value : e;
	if (!n || !wt) return () => {};
	let r = new MutationObserver(() => {
		t(n.getAttribute("data-mc-color-mode") ?? document.documentElement.getAttribute("data-mc-color-mode") ?? "light");
	});
	return r.observe(n, {
		attributes: !0,
		attributeFilter: ["data-mc-color-mode"]
	}), () => r.disconnect();
}
function AE(e) {
	let t = N((wt ? document.documentElement.getAttribute("data-mc-color-mode") : null) ?? "light"), n = () => {};
	return O(() => {
		n = kE(e, (e) => {
			t.value = e;
		});
	}), E(() => n()), G(e, () => {
		n(), n = kE(e, (e) => {
			t.value = e;
		});
	}), t;
}
//#endregion
//#region src/composables/useHeadings.ts
function jE(e, t = {}) {
	let { levels: n = [2, 3], selector: r = n.map((e) => `h${e}`).join(", "), observe: i = !0 } = t, a = N([]), o = null;
	function s() {
		return e ? typeof e == "object" && "value" in e ? e.value : e : wt ? document.body : null;
	}
	function c(e, t) {
		return e.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-+|-+$/g, "") || `section-${t + 1}`;
	}
	function l() {
		let e = s();
		if (!e) {
			a.value = [];
			return;
		}
		let t = /* @__PURE__ */ new Map(), n = [];
		e.querySelectorAll(r).forEach((e) => {
			let r = (e.textContent ?? "").trim();
			if (!r) return;
			let i = e.id;
			if (!i) {
				let a = c(r, n.length), o = t.get(a) ?? 0;
				t.set(a, o + 1), i = o === 0 ? a : `${a}-${o + 1}`, e.id = i;
			}
			let a = Number(e.tagName.slice(1));
			n.push({
				id: i,
				text: r,
				level: a,
				element: e
			});
		}), a.value = n;
	}
	return O(() => {
		if (l(), !i || !wt) return;
		let e = s();
		e && (o = new MutationObserver(() => l()), o.observe(e, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}));
	}), E(() => {
		o?.disconnect(), o = null;
	}), {
		items: a,
		refresh: l
	};
}
//#endregion
//#region src/composables/useLocalSearch.ts
function ME(e, t = {}) {
	let { limit: n = 20, threshold: r = .2 } = t;
	function i() {
		return Array.isArray(e) ? e : e.value ?? [];
	}
	let a = N([]);
	function o(e) {
		let t = e.trim().toLowerCase();
		if (!t) return a.value = [], [];
		let o = [];
		for (let e of i()) {
			let n = NE(e, t);
			n && n.score >= r && o.push(n);
		}
		o.sort((e, t) => t.score - e.score);
		let s = o.slice(0, n);
		return a.value = s, s;
	}
	return {
		search: o,
		results: a,
		searchNow: o
	};
}
function NE(e, t) {
	let n = e.title.toLowerCase(), r = [
		{
			text: n,
			weight: 1
		},
		{
			text: (e.summary ?? "").toLowerCase(),
			weight: .5
		},
		{
			text: (e.keywords ?? []).join(" ").toLowerCase(),
			weight: .7
		},
		{
			text: (e.group ?? "").toLowerCase(),
			weight: .4
		}
	], i = 0, a = [];
	for (let { text: e, weight: o } of r) {
		if (!e) continue;
		if (e === t) {
			i = Math.max(i, 1 * o);
			continue;
		}
		let r = e.indexOf(t);
		if (r >= 0) {
			let s = r === 0 || /[\s\-_/]/.test(e[r - 1]);
			i = Math.max(i, (s ? .9 : .6) * o), e === n && (a = Array.from({ length: t.length }, (e, t) => r + t));
			continue;
		}
		let s = PE(e, t);
		s > 0 && (i = Math.max(i, s * o));
	}
	return i <= 0 ? null : {
		doc: e,
		score: Math.round(i * 1e3) / 1e3,
		matches: a
	};
}
function PE(e, t) {
	let n = 0, r = 0;
	for (let i of t) {
		let t = e.indexOf(i, n);
		if (t < 0) return 0;
		t > n && (r += t - n), n = t + 1;
	}
	if (n === 0) return 0;
	let i = t.length / Math.max(e.length, t.length);
	return Math.max(0, i - r * .04) * .8;
}
//#endregion
//#region src/directives/burst.ts
var FE = {
	count: 10,
	distance: 46,
	duration: 720,
	color: "hsl(var(--mc-h2) var(--mc-s2) 66%)",
	size: 7,
	shape: "dot"
}, IE = {
	mounted(e, t) {
		let n = {
			...FE,
			...t.value ?? {}
		}, r = (t) => {
			let r = e.getBoundingClientRect(), i = t.clientX - r.left, a = t.clientY - r.top, o = document.createElement("span");
			o.className = "mc-burst-layer", o.setAttribute("aria-hidden", "true"), o.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:5;";
			for (let e = 0; e < n.count; e++) {
				let t = document.createElement("i"), r = Math.PI * 2 * e / n.count + Math.random() * .5, s = n.distance * (.55 + Math.random() * .65);
				t.style.cssText = [
					"position:absolute",
					`left:${i}px`,
					`top:${a}px`,
					`width:${n.size}px`,
					`height:${n.size}px`,
					"margin-left:calc(var(--mc-burst-size) / -2)",
					"margin-top:calc(var(--mc-burst-size) / -2)",
					`background:${n.color}`,
					"border-radius:50%",
					"will-change:transform,opacity",
					`animation:mc-particle-fly ${n.duration}ms var(--mc-ease-out) forwards`,
					`--mc-particle-x:${Math.cos(r) * s}px`,
					`--mc-particle-y:${Math.sin(r) * s}px`,
					`--mc-burst-size:${n.size}px`
				].join(";"), o.appendChild(t);
			}
			e.appendChild(o), window.setTimeout(() => {
				o.remove();
			}, n.duration + 120);
		};
		e.addEventListener("click", r), e.__mcBurst = r;
	},
	unmounted(e) {
		let t = e.__mcBurst;
		t && e.removeEventListener("click", t), e.querySelectorAll(".mc-burst-layer").forEach((e) => e.remove());
	}
};
//#endregion
//#region src/plugin.ts
function LE(e) {
	if (!e || typeof e != "object" && typeof e != "function") return !1;
	let t = e;
	return typeof t.render == "function" || typeof t.setup == "function" || typeof t.template == "string" || !!t.__vccOpts;
}
var RE = { install(e, t = {}) {
	typeof document < "u" && (document.documentElement.setAttribute("data-mochi", ""), t.theme && uc(document.documentElement, t.theme), pc(document.documentElement), Ke());
	let n = t.prefix ?? "M";
	for (let [r, i] of Object.entries(vE)) {
		if (!LE(i)) continue;
		let a = (i.name ?? r).replace(/^Mochi/, "");
		e.component(`${n}${a}`, i), t.unprefixed && (a && a !== r ? e.component(a, i) : r !== a && e.component(r, i));
	}
	e.provide("mochi:zIndex", t.zIndex ?? 2e3), e.directive("mc-burst", IE);
} };
//#endregion
export { zt as Affix, cn as Alert, fn as Anchor, pn as Aurora, Ln as AutoComplete, Hn as Avatar, Wn as BackTop, qn as Badge, mr as Barcode, Tr as Breadcrumb, Fr as Button, ri as Calendar, gi as Card, Ni as Carousel, Qi as Cascader, po as Chart, _o as Checkbox, bo as CircleCutout, To as ClipboardButton, ls as Code, gs as Collapse, Ss as CollapseTransition, Ls as ColorPicker, Hs as CommandBar, sc as CommandPalette, vc as ConfigProvider, xc as Countdown, ff as DEFAULT_CATEGORIES, zl as DataTable, gu as DatePicker, Ou as Descriptions, Lu as Dialog, nd as Diff, id as DiscreteApi, ld as Divider, _d as Dock, Ed as Drawer, Fd as Dropdown, zd as DynamicInput, qd as DynamicTags, sf as Element, df as Ellipsis, Of as Emoji, Nf as Empty, Hf as Equation, Zf as ErrorBoundary, Qf as Flex, ip as FloatButton, cp as Form, hp as FormItem, vp as FormRow, Vp as Gauge, Hp as GlobalStyle, Wp as GradientText, Gp as Grid, rm as Heatmap, om as Highlight, Vt as ICON_ALIASES, Bt as ICON_PATHS, $ as Icon, mm as IconRail, jm as Image, qm as ImageGroup, Qm as InfiniteScroll, ih as Input, fh as InputNumber, gh as InputOTP, Bh as KpiCard, Y as LIQUID_GLASS_ACTIVE_CLASS, ae as LIQUID_GLASS_FILTER_ID, Qt as LOCALE_EN_US, Yt as LOCALE_KEY, $t as LOCALE_ZH_CN, qh as Layout, tg as LevelMeter, rg as LiquidGlass, _g as List, yg as LoadingBar, Ag as Log, Ng as Marquee, Pg as Masonry, Kg as Mention, e_ as Menu, u_ as Message, b_ as MessageProvider, RE as MochiUI, RE as default, F_ as Modal, G_ as Notification, ev as NotificationProvider, pv as NumberAnimation, gc as PACKS, Dv as PageHeader, Jv as Pagination, iy as Popconfirm, fy as Popover, Ty as Popselect, Ny as Progress, Ly as Prose, kb as QRCode, Nb as Radio, Fb as RadioGroup, Kb as Rate, ex as Result, yE as SIZE_MAP, ax as Scrollbar, ux as Segmented, Vx as Select, Yx as Signature, Zx as Skeleton, nS as Slider, rS as Space, Th as Sparkline, pS as Spin, yS as Split, AS as Statistic, zS as Steps, HS as Switch, hc as THEME_PRESETS, iC as Table, fC as Tabs, _C as Tag, bC as Textarea, PC as Thing, RC as Time, rw as TimePicker, pw as Timeline, yw as Tooltip, kw as Tour, tT as Transfer, cT as Transport, bT as Tree, RT as TreeSelect, zT as Typography, cE as Upload, fE as VerticalText, hE as VirtualList, _E as Watermark, bt as activateOnKey, Cn as allocateZIndex, dc as applyAdaptiveText, uc as applyTheme, ut as bestForeground, ft as bestForegroundOver, Ft as camelCase, lt as checkContrast, Ot as clamp, et as clampNumber, pt as composite, ct as contrastRatio, rd as createDiscreteApi, ht as createSafeStorage, Ye as formatBytes, $e as formatCompactNumber, Nt as formatDate, Xe as formatDuration, Mt as formatNumber, Qe as formatPercent, Ze as formatRelativeTime, dt as gradientStops, zi as injectId, pc as installAdaptiveText, Ke as installLiquidGlassFilter, yt as isActivationKey, wt as isBrowser, Tt as isElement, jt as isEqual, Ct as isSemanticColor, T_ as message, Dt as nextFrame, av as notification, rt as parseColor, Pt as pascalCase, Ri as provideId, Xt as provideLocale, Et as raf, _t as readJSON, Ge as refreshLiquidGlass, st as relativeLuminance, kn as resetOverlayStack, wn as resetZIndex, St as resolveColor, mc as resolveColorMode, Ut as resolveIconName, gt as safeStorage, de as supportsLiquidGlassRefraction, DE as syncHostTheme, lc as themeToCssVars, At as toArray, qe as uninstallLiquidGlassFilter, kt as uniq, Sc as useClickOutside, xo as useClipboard, bs as useCollapseTransition, AE as useColorMode, Ru as useCountUp, wE as useDebounce, _n as useFloating, Ws as useFocusTrap, jE as useHeadings, OE as useHostTheme, Fi as useId, Ii as useIdRef, CE as useInView, hm as useIntersection, ME as useLocalSearch, Zt as useLocale, EE as useMagnetic, SE as useMergeProps, E_ as useMessage, ov as useNotification, On as useOverlayStack, Js as useScrollLock, bE as useSize, _c as useTheme, TE as useThrottle, Xv as useTriggerAnchor, xE as useVModel, Tn as useZIndex, IE as vMochiBurst, kE as watchColorMode, vt as writeJSON };

//# sourceMappingURL=mochi-ui.mjs.map