/*! mochi-ui v1.9.1 | MIT */
import { Comment as e, Fragment as t, Teleport as n, Transition as r, TransitionGroup as i, computed as a, createApp as o, createBlock as s, createCommentVNode as c, createElementBlock as l, createElementVNode as u, createSlots as d, createStaticVNode as f, createTextVNode as p, createVNode as m, defineComponent as h, getCurrentInstance as g, getCurrentScope as _, guardReactiveProps as v, h as y, inject as b, isRef as x, isVNode as S, markRaw as C, mergeModels as w, mergeProps as T, nextTick as E, normalizeClass as D, normalizeProps as O, normalizeStyle as k, onBeforeUnmount as A, onErrorCaptured as j, onMounted as ee, onScopeDispose as M, onUpdated as N, openBlock as P, provide as F, reactive as I, ref as L, renderList as R, renderSlot as z, resolveDynamicComponent as B, shallowRef as V, toDisplayString as H, toValue as U, unref as W, useAttrs as G, useModel as K, useSlots as te, vModelText as ne, vShow as re, watch as q, withCtx as J, withDirectives as ie, withKeys as Y, withModifiers as X } from "vue";
//#region \0rolldown/runtime.js
var ae = Object.defineProperty, oe = (e, t) => {
	let n = {};
	for (var r in e) ae(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || ae(n, Symbol.toStringTag, { value: "Module" }), n;
}, se = typeof window < "u" && typeof document < "u", ce = "http://www.w3.org/2000/svg", le = "mc-liquid-refract", ue = "mc-liquid-glass-refraction", de = "mc-lg-", fe = ".mc-liquid-glass", pe = ".mc-liquid-glass--no-refract", me = {
	bezel: 28,
	thickness: 34,
	ior: 1.45,
	dispersion: .35,
	scale: 1,
	blur: .6,
	saturation: 1.6
}, he = null;
function ge() {
	if (!se || typeof document > "u") return !1;
	if (he !== null) return he;
	if (!document.body) return !1;
	try {
		let e = document.createElement("div");
		e.style.position = "fixed", e.style.opacity = "0", e.style.pointerEvents = "none", e.style.backdropFilter = "url(#mc-liquid-glass-probe)", e.style.setProperty("-webkit-backdrop-filter", "url(#mc-liquid-glass-probe)"), document.body.appendChild(e);
		let t = getComputedStyle(e), n = t.backdropFilter || t.getPropertyValue("-webkit-backdrop-filter") || "";
		e.remove(), he = n.includes("url(");
	} catch {
		he = !1;
	}
	return he;
}
var _e = .3, ve = .15;
function ye(e, t, n) {
	if (e <= 0 || e >= t || n <= 0) return 0;
	let r = _e * t;
	if (e <= r) {
		let t = e / r;
		return n * (1.5 * t - .5 * t * t * t);
	}
	let i = (e - r) / (t - r);
	return n * (1 - 3 * i * i + 2 * i * i * i);
}
function be(e, t) {
	let n = e.length, r = t / (n - 1), i = Infinity, a = -Infinity, o = 0, s = 0;
	for (let t = 1; t < n; t++) {
		let n = (e[t] - e[t - 1]) / r, c = 1 + n;
		c < i && (i = c), c > a && (a = c);
		let l = n > 1e-9 ? 1 : n < -1e-9 ? -1 : 0;
		l !== 0 && (s === 0 ? s = l : l !== s && (o++, s = l));
	}
	let c = e[0], l = e[n - 1], u = o === 1, d = u && c === 0 && Math.abs(l) < 1e-9 && i >= ve, f = i < ve && i < 1 ? Math.max(.05, Math.min(.98, .85 / (1 - i))) : 1;
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
function xe(e) {
	let t = Math.max(e.ior, 1), n = Math.PI / 4, r = Math.asin(Math.min(1, Math.sin(n) / t)), i = Math.tan(n - r);
	return (e.bezel * .5 + Math.max(e.thickness, 0) * .5) * i * Math.max(e.scale, 0);
}
function Se(e, t, n) {
	let r = Math.max(e.bezel, .5), i = /* @__PURE__ */ new Float64Array(192), a = xe(e), o = Math.min(t, n) * .35;
	a = Math.max(Math.min(a, o), 0);
	for (let e = 0; e < 8; e++) {
		for (let e = 0; e < 192; e++) i[e] = ye(e / 191 * r, r, a);
		let e = be(i, r);
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
var Ce = .4, we = .5;
function Te(e, t, n) {
	if (!Number.isFinite(t)) return e;
	let r = Math.max(n - Math.abs(e - t), 0) / n;
	return Math.min(e, t) - r * r * n * .25;
}
function Ee(e, t, n, r, i, a, o, s, c) {
	let l = Math.min(n, r) / 2, u = Math.min(Math.max(i, .5), l), d = Math.min(Math.max(a, .5), l), f = 1 / u, p = 1 / d, m = (e - n / 2) * f, h = (t - r / 2) * p, g = n / 2 * f, _ = r / 2 * p, v = Math.abs(m) - (g - 1), y = Math.abs(h) - (_ - 1), b = Math.min(u, d), x = o / b, S = s / b, C = Math.max(S - Math.abs(v), 0) / S, w = Math.max(S - Math.abs(y), 0) / S, T = Math.max(v, 0) + C * C * S * .25, E = Math.max(y, 0) + w * w * S * .25, D = v > 0 ? 1 - C * .5 : C * .5, O = y > 0 ? 1 - w * .5 : w * .5, k = Math.max(x - Math.abs(v - y), 0) / x, A = Math.max(v, y) + k * k * x * .25, j = v > y ? 1 - k * .5 : k * .5, ee = v > y ? k * .5 : 1 - k * .5, M = Math.max(S - Math.abs(A), 0) / S, N = Math.min(A, 0) - M * M * S * .25, P = A < 0 ? 1 - M * .5 : M * .5, F = Math.sqrt(T * T + E * E), I = F + N - 1, L = 2 * u * d / (u + d), R = -I * L, z = m < 0 ? -1 : 1, B = h < 0 ? -1 : 1, V = T / (F || 1) * D, H = E / (F || 1) * O, U = (V + P * j) * z, W = (H + P * ee) * B, G = U * f, K = W * p, te = Math.sqrt(G * G + K * K) || 1, ne = Math.abs(e - n / 2) - (n / 2 - u), re = Math.abs(t - r / 2) - (r / 2 - d), q = .4 * Math.sqrt(ne * ne + re * re), J = Math.abs(v - y) * (2 / (f + p)) * Math.SQRT1_2, ie = Math.min(-v, -y), Y = Math.min(Math.max(ie / x + .5, 0), 1), X = Y * (c + we * J) + (1 - Y) * Number.MAX_VALUE;
	return {
		distance: R,
		nx: G / te,
		ny: K / te,
		room: Te(q, X, 1.5)
	};
}
function De(e, t, n, r, i, a) {
	let o = Math.max(1, Math.round(e)), s = Math.max(1, Math.round(t)), c = Math.min(Math.max(se && window.devicePixelRatio || 1, 1), 3), l = 1048576, u = o * s * c * c, d = u > l ? Math.sqrt(l / u) : 1, f = Math.max(2, Math.round(o * c * d)), p = Math.max(2, Math.round(s * c * d)), m = document.createElement("canvas");
	m.width = f, m.height = p;
	let h = m.getContext("2d");
	if (!h) return "";
	let g = a.offsets.length, _ = a.peak, v = h.createImageData(f, p), y = v.data, b = Math.max(i.bezel, .5), x = Math.min(Math.max(a.peak * .7, 6), 40), S = Math.min(Math.max(a.peak * .2, 3), 12), C = Math.min(Math.max(a.peak * Ce, 3), 14);
	for (let e = 0; e < p; e++) {
		let t = (e + .5) / p * s;
		for (let i = 0; i < f; i++) {
			let c = Ee((i + .5) / f * o, t, o, s, n, r, x, S, C), l = (e * f + i) * 4;
			if (c.distance >= b) {
				y[l] = 128, y[l + 1] = 128, y[l + 2] = 0, y[l + 3] = 255;
				continue;
			}
			let u = Math.min(Math.max(c.distance / b, 0), 1) * (g - 1), d = Math.floor(u), p = Math.min(d + 1, g - 1), m = a.offsets[d] + (a.offsets[p] - a.offsets[d]) * (u - d);
			m = Math.max(0, Te(m, c.room, 1.5));
			let h = _ > 0 ? m / _ : 0, v = -c.nx * h, w = -c.ny * h;
			y[l] = Math.round(128 + 127 * Math.max(-1, Math.min(1, v))), y[l + 1] = Math.round(128 + 127 * Math.max(-1, Math.min(1, w))), y[l + 2] = 0, y[l + 3] = 255;
		}
	}
	return h.putImageData(v, 0, 0), m.toDataURL("image/png");
}
var Oe = 255 / 254, ke = -.003937;
function Ae(e, t, n, r, i, a) {
	let o = r * 2, s = [], c = Math.min(Math.max(n.dispersion, 0), 1), l = Math.ceil(r * (1 + c)) + 2;
	if (s.push(`<filter id="${e}" x="${-l}" y="${-l}" width="${Math.round(i) + l * 2}" height="${Math.round(a) + l * 2}" color-interpolation-filters="sRGB">`), s.push(`<feGaussianBlur in="SourceGraphic" stdDeviation="${n.blur.toFixed(3)}" result="soft"/>`), s.push(`<feImage href="${t}" x="0" y="0" width="${i}" height="${a}" preserveAspectRatio="none" result="mapRaw"/>`), s.push(`<feComponentTransfer in="mapRaw" result="map"><feFuncR type="linear" slope="${Oe.toFixed(6)}" intercept="${ke}"/><feFuncG type="linear" slope="${Oe.toFixed(6)}" intercept="${ke}"/></feComponentTransfer>`), n.dispersion > .001) {
		let e = o * Math.min(n.dispersion, 1);
		s.push(`<feDisplacementMap in="soft" in2="map" scale="${(o + e).toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dHi"/>`), s.push(`<feDisplacementMap in="soft" in2="map" scale="${o.toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dMid"/>`), s.push(`<feDisplacementMap in="soft" in2="map" scale="${(o - e).toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="dLo"/>`), s.push("<feColorMatrix in=\"dHi\" type=\"matrix\" values=\"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1\" result=\"cR\"/>"), s.push("<feColorMatrix in=\"dMid\" type=\"matrix\" values=\"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1\" result=\"cG\"/>"), s.push("<feColorMatrix in=\"dLo\" type=\"matrix\" values=\"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0 1\" result=\"cB\"/>"), s.push("<feBlend in=\"cR\" in2=\"cG\" mode=\"screen\" result=\"rg\"/>"), s.push("<feBlend in=\"rg\" in2=\"cB\" mode=\"screen\" result=\"rgb\"/>"), s.push(`<feColorMatrix in="rgb" type="saturate" values="${n.saturation.toFixed(3)}"/>`);
	} else s.push(`<feDisplacementMap in="soft" in2="map" scale="${o.toFixed(4)}" xChannelSelector="R" yChannelSelector="G" result="rgb"/>`), s.push(`<feColorMatrix in="rgb" type="saturate" values="${n.saturation.toFixed(3)}"/>`);
	return s.push("</filter>"), s.join("");
}
var je = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), Ne = null, Pe = null, Fe = null, Ie = 0, Le = {}, Re = !1;
function ze() {
	if (!se || !document.body) return null;
	if (Ne) return Ne;
	let e = document.createElementNS(ce, "svg");
	e.setAttribute("aria-hidden", "true"), e.setAttribute("width", "0"), e.setAttribute("height", "0"), e.setAttribute("focusable", "false"), e.setAttribute("data-mochi-liquid-glass", ""), e.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
	let t = document.createElementNS(ce, "defs");
	return e.appendChild(t), document.body.appendChild(e), Ne = t, Ne;
}
function Be(e, t, n) {
	let r = e.getPropertyValue(t).trim();
	if (!r) return n;
	let i = parseFloat(r);
	return Number.isFinite(i) ? i : n;
}
function Ve(e, t, n, r) {
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
function He(e) {
	let t = getComputedStyle(e), n = e.clientWidth, r = e.clientHeight;
	if (n < 2 || r < 2) return null;
	let i = parseFloat(t.getPropertyValue("border-top-width")) || 0, a = Ve(t, "border-top-left-radius", n, r), o = Math.max(a.rx - i, 0), s = Math.max(a.ry - i, 0), c = {
		bezel: Math.min(Be(t, "--mc-liquid-bezel", me.bezel), Math.min(n, r) / 2),
		thickness: Be(t, "--mc-liquid-thickness", me.thickness),
		ior: Be(t, "--mc-liquid-ior", me.ior),
		dispersion: Be(t, "--mc-liquid-dispersion", me.dispersion),
		scale: Be(t, "--mc-liquid-refract-scale", me.scale) * (Le.scale ?? 1),
		blur: Be(t, "--mc-liquid-refract-blur", me.blur),
		saturation: Be(t, "--mc-liquid-sat", me.saturation)
	};
	return Le.blur !== void 0 && (c.blur = Le.blur), Le.saturation !== void 0 && (c.saturation = Le.saturation), {
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
function Ue(e, t) {
	let n = parseFloat(t.opacity);
	if (Number.isFinite(n) && n < 1 || t.filter && t.filter !== "none") return !1;
	let r = t.backdropFilter || t.getPropertyValue("-webkit-backdrop-filter") || "";
	return !(r && r !== "none");
}
function We(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(36);
}
function Ge(e) {
	let t = Me.get(e);
	t && (--t.refs, t.refs <= 0 && (t.node.remove(), Me.delete(e)));
}
function Ke(e) {
	let t = ze();
	if (!t) return null;
	let n = We(e.signature), r = Me.get(n);
	if (r) return r.refs += 1, n;
	let i = Se(e.optics, e.width, e.height), a = i.peak;
	if (a <= 0) return null;
	let o = De(e.width, e.height, e.rx, e.ry, e.optics, i);
	if (!o) return null;
	let s = Ae(`${de}${n}`, o, e.optics, a, e.width, e.height), c = new DOMParser().parseFromString(`<svg xmlns="${ce}">${s}</svg>`, "image/svg+xml").documentElement.firstElementChild;
	return c ? (t.appendChild(c), Me.set(n, {
		refs: 1,
		node: c
	}), n) : null;
}
function qe(e) {
	let t = getComputedStyle(e), n = He(e), r = je.get(e);
	if (!n || !Ue(e, t) || n.optics.scale <= 0 || e.matches(pe)) {
		e.style.removeProperty("--mc-liquid-filter"), r && (Ge(r.filterId), je.delete(e));
		return;
	}
	if (r && r.signature === n.signature) return;
	r && Ge(r.filterId);
	let i = Ke(n);
	i ? (e.style.setProperty("--mc-liquid-filter", `url(#${de}${i})`), je.set(e, {
		signature: n.signature,
		filterId: i
	}), Pe?.observe(e)) : (e.style.removeProperty("--mc-liquid-filter"), je.delete(e));
}
function Je(e) {
	let t = Array.from(e.querySelectorAll(fe));
	for (let e of t) qe(e);
	for (let [e, t] of je) e.isConnected || (Ge(t.filterId), je.delete(e), Pe?.unobserve(e));
}
function Ye(e) {
	se && (Ie || (Ie = requestAnimationFrame(() => {
		Ie = 0, Je(e ?? document);
	})));
}
function Xe(e) {
	return e instanceof Element ? e.matches(fe) ? !0 : e.querySelector(fe) !== null : !1;
}
function Ze(e) {
	se && ge() && Je(e ?? document);
}
function Qe(e = {}) {
	if (!se) return !1;
	if (Le = {
		...Le,
		...e
	}, !document.body) return typeof document.addEventListener == "function" && document.addEventListener("DOMContentLoaded", () => Qe(e), { once: !0 }), !1;
	let t = ge();
	return document.documentElement.classList.toggle(le, t), t ? Re ? (Ye(), !0) : (ze(), typeof ResizeObserver < "u" && (Pe = new ResizeObserver((e) => {
		for (let t of e) {
			let e = t.target;
			qe(e);
		}
	})), typeof MutationObserver < "u" && (Fe = new MutationObserver((e) => {
		for (let t of e) if (t.type === "attributes") {
			let e = t.target;
			if (e instanceof Element && Xe(e)) {
				Ye();
				return;
			}
		} else {
			for (let e of Array.from(t.addedNodes)) if (Xe(e)) {
				Ye();
				return;
			}
			for (let e of Array.from(t.removedNodes)) if (Xe(e)) {
				Ye();
				return;
			}
		}
	}), Fe.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["class"]
	})), Re = !0, Je(document), !0) : !1;
}
function $e() {
	if (se) {
		Ie && (cancelAnimationFrame(Ie), Ie = 0), Fe?.disconnect(), Fe = null, Pe?.disconnect(), Pe = null, Re = !1;
		for (let [, e] of je) Ge(e.filterId);
		je.clear(), Me.clear(), document.querySelectorAll("svg[data-mochi-liquid-glass]").forEach((e) => e.remove()), Ne = null, document.documentElement.classList.remove(le);
	}
}
//#endregion
//#region src/utils/format.ts
var et = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB"
];
function tt(e, t = 1, n = "B", r) {
	if (!Number.isFinite(e)) return `0 ${n}`;
	let i = e < 0 ? "-" : "", a = Math.abs(e);
	if (a < 1) return `${i}0 ${n}`;
	let o = Math.min(Math.floor(Math.log(a) / Math.log(1024)), et.length - 1);
	return `${i}${st(a / 1024 ** o, o === 0 ? 0 : t, r)} ${n === "B" ? et[o] : n}`;
}
function nt(e, t) {
	if (!Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	if (n < 1e3) return `${st(Math.round(e), 0, t)}ms`;
	let r = Math.floor(n / 1e3), i = r % 60, a = Math.floor(r / 60) % 60, o = Math.floor(r / 3600) % 24, s = Math.floor(r / 86400), c = [];
	return s && c.push(`${s}d`), o && c.push(`${o}h`), a && c.push(`${a}m`), (i || !c.length) && c.push(`${i}s`), `${e < 0 ? "-" : ""}${c.join(" ")}`;
}
function rt(e, t = Date.now(), n) {
	let r = ct(e);
	if (!r) return "—";
	let i = ct(t) ?? /* @__PURE__ */ new Date(), a = r.getTime() - i.getTime(), o = Math.abs(a);
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
function it(e, t = 0, n) {
	return Number.isFinite(e) ? `${st(e * 100, t, n)}%` : "—";
}
function at(e, t) {
	if (!Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	if (n < 1e3) return st(e, 0, t);
	for (let [r, i] of [
		[0xe8d4a51000, "T"],
		[1e9, "B"],
		[1e6, "M"],
		[1e3, "K"]
	]) if (n >= r) {
		let n = e / r;
		return `${st(n, +(Math.abs(n) < 10), t)}${i}`;
	}
	return st(e, 0, t);
}
function ot(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function st(e, t, n) {
	try {
		return new Intl.NumberFormat(n, {
			minimumFractionDigits: 0,
			maximumFractionDigits: Math.max(0, t)
		}).format(e);
	} catch {
		return e.toFixed(Math.max(0, t));
	}
}
function ct(e) {
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
function lt(e) {
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
		if (ut(t) || ut(n) || ut(r)) return null;
		let a = (parseFloat(t) % 360 + 360) % 360, o = parseFloat(n) / 100, s = parseFloat(r) / 100;
		if (Number.isNaN(a) || Number.isNaN(o) || Number.isNaN(s)) return null;
		let c = e[3], [l, u, d] = bt(a, o, s);
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
		if (e.length < 3 || e.some(ut)) return null;
		let t = e[0].endsWith("%") ? parseFloat(e[0]) / 100 : parseFloat(e[0]), n = e[1].endsWith("%") ? parseFloat(e[1]) / 100 * .4 : parseFloat(e[1]), r = (parseFloat(e[2]) % 360 + 360) % 360;
		if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r)) return null;
		let i = e[3], [o, s, c] = dt(t, n, r);
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
		if (e.length < 3 || e.some(ut)) return null;
		let t = e[0].endsWith("%") ? parseFloat(e[0]) / 100 : parseFloat(e[0]), n = e[1].endsWith("%") ? parseFloat(e[1]) / 100 * .4 : parseFloat(e[1]), r = e[2].endsWith("%") ? parseFloat(e[2]) / 100 * .4 : parseFloat(e[2]);
		if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r)) return null;
		let i = e[3], [a, s, c] = ft(t, n, r);
		return {
			r: a,
			g: s,
			b: c,
			a: i === void 0 ? 1 : i.endsWith("%") ? parseFloat(i) / 100 : parseFloat(i)
		};
	}
	return null;
}
var ut = (e) => /calc\(|\bvar\(/.test(e);
function dt(e, t, n) {
	let r = n * Math.PI / 180;
	return ft(e, t * Math.cos(r), t * Math.sin(r));
}
function ft(e, t, n) {
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
function pt(e) {
	let t = typeof e == "string" ? lt(e) : e;
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
function mt(e, t) {
	let n = lt(e), r = lt(t);
	if (!n || !r) return 0;
	let i = pt(yt(n, r)), a = pt(r), o = Math.max(i, a), s = Math.min(i, a);
	return (o + .05) / (s + .05);
}
function ht(e, t) {
	let n = mt(e, t), r = {
		ratio: Math.round(n * 100) / 100,
		aa: n >= 4.5,
		aaLarge: n >= 3,
		aaa: n >= 7
	}, i = gt(t);
	return i && (r.suggestion = i), r;
}
function gt(e) {
	if (lt(e)) return mt("#ffffff", e) >= mt("#111111", e) ? "#ffffff" : "#111111";
}
function _t(e) {
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
function vt(e, t) {
	if (!e.length || !t.length) return;
	let n, r = -1;
	for (let i of t) {
		let t = Infinity;
		for (let n of e) {
			let e = mt(i, n);
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
function yt(e, t) {
	let n = e.a;
	return {
		r: e.r * n + t.r * (1 - n),
		g: e.g * n + t.g * (1 - n),
		b: e.b * n + t.b * (1 - n),
		a: 1
	};
}
function bt(e, t, n) {
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
function xt() {
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
var St = xt();
function Ct(e, t, n = St) {
	try {
		let r = n.getItem(e);
		return r === null ? t : JSON.parse(r);
	} catch {
		return t;
	}
}
function wt(e, t, n = St) {
	try {
		return n.setItem(e, JSON.stringify(t)), !0;
	} catch {
		return !1;
	}
}
//#endregion
//#region src/utils/keys.ts
function Tt(e) {
	return e.key === "Enter" || e.key === " " || e.key === "Spacebar";
}
function Et(e, t) {
	return !Tt(e) || !t ? !1 : (e.preventDefault(), t.click(), !0);
}
typeof globalThis.requestAnimationFrame != "function" && (globalThis.requestAnimationFrame = ((e) => setTimeout(() => e(Date.now()), 16))), typeof globalThis.cancelAnimationFrame != "function" && (globalThis.cancelAnimationFrame = ((e) => clearTimeout(e)));
var Dt = {
	default: "var(--mc-text-3)",
	primary: "hsl(var(--mc-h) var(--mc-s) 62%)",
	accent: "var(--mc-accent)",
	success: "var(--mc-success)",
	warning: "var(--mc-warning)",
	danger: "var(--mc-danger)",
	info: "var(--mc-info)",
	brand: "var(--mc-gradient-brand)"
};
function Ot(e) {
	if (e) return Dt[e] ?? e;
}
function kt(e) {
	return Object.prototype.hasOwnProperty.call(Dt, e);
}
var At = typeof window < "u" && typeof document < "u";
function jt(e) {
	return !!e && typeof e == "object" && "nodeType" in e && e.nodeType === 1;
}
function Mt(e) {
	return At ? window.requestAnimationFrame(e) : setTimeout(e, 16);
}
function Nt(e) {
	Mt(() => Mt(e));
}
function Pt(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function Ft(e) {
	return Array.from(new Set(e));
}
function It(e) {
	return Array.isArray(e) ? e : [e];
}
function Lt(e, t) {
	if (e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != "object" || typeof t != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) return e.length === t.length && e.every((e, n) => Lt(e, t[n]));
	let n = Object.keys(e), r = Object.keys(t);
	return n.length === r.length && n.every((n) => Object.prototype.hasOwnProperty.call(t, n) && Lt(e[n], t[n]));
}
function Rt(e, t) {
	try {
		return new Intl.NumberFormat(t).format(e);
	} catch {
		return String(e);
	}
}
function zt(e, t = "yyyy-MM-dd", n = "en-US") {
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
function Bt(e) {
	return e.replace(/(-\w)/g, (e) => e[1].toUpperCase());
}
function Vt(e) {
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
var Ht = ["aria-disabled"], Ut = { class: "mc-affix__body" }, Wt = /*@__PURE__*/ h({
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
		let n = e, r = t, i = L(null), o = L(null), s = L(!1), d = L(0), f = L({
			top: 0,
			left: 0,
			width: 0
		});
		function p(e) {
			return e ? typeof e == "string" ? At ? document.querySelector(e) : null : e : null;
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
			if (!At) return;
			let e = p(n.target) ?? o.value ?? i.value;
			if (!e) return;
			let t = h(), a = _(t), c = m(t) ? null : t.getBoundingClientRect(), l = c ? c.top : 0, u = e.getBoundingClientRect(), v = g(t), y = u.top - l + v, b = u.height || 0, x = !1, S = "top";
			n.offsetBottom > 0 && v + a.height - n.offsetBottom >= y + b && (x = !0, S = "bottom"), !x && v + n.offsetTop >= y && (x = !0, S = "top"), x !== s.value && (s.value = x, r("change", x)), x && (d.value = b, f.value = {
				top: S === "top" ? l + n.offsetTop : l + a.height - b - n.offsetBottom,
				left: u.left,
				width: u.width
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
			At && (C(), h().addEventListener("scroll", x, { passive: !0 }), window.addEventListener("resize", b), v());
		}
		function C() {
			At && (h().removeEventListener("scroll", x), window.removeEventListener("resize", b), y && (cancelAnimationFrame(y), y = 0));
		}
		q(() => [n.target, n.scrollTarget], S), ee(S), A(C);
		let w = a(() => {
			if (s.value) return {
				position: "fixed",
				top: `${f.value.top}px`,
				left: `${f.value.left}px`,
				width: `${f.value.width}px`,
				zIndex: n.zIndex ?? "var(--mc-z-sticky)"
			};
		}), T = a(() => Z("mc-affix", {
			"is-affixed": s.value,
			"is-disabled": n.disabled,
			"has-placeholder": s.value && n.placeholder
		}, n.customClass)), E = a(() => Z("mc-affix__content", "mc-recipe-panel", "mc-grain-overlay", { "is-disabled": n.disabled }));
		return (t, n) => (P(), l("div", {
			ref_key: "root",
			ref: i,
			class: D(T.value)
		}, [s.value && e.placeholder ? (P(), l("div", {
			key: 0,
			class: "mc-affix__placeholder",
			style: k({ height: `${d.value}px` }),
			"aria-hidden": "true"
		}, null, 4)) : c("", !0), u("div", {
			ref_key: "content",
			ref: o,
			class: D(["mc-affix__content", E.value]),
			style: k(w.value),
			"aria-disabled": e.disabled ? "true" : void 0
		}, [
			n[0] || (n[0] = u("span", {
				class: "mc-affix__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			n[1] || (n[1] = u("span", {
				class: "mc-affix__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", Ut, [z(t.$slots, "default", {}, void 0, !0)])
		], 14, Ht)], 2));
	}
}), Q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, Gt = /*#__PURE__*/ Q(Wt, [["__scopeId", "data-v-882d6f56"]]), Kt = {
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
	"sun-moon": [
		"M12 3a9 9 0 0 1 0 18",
		"M12 3a9 9 0 0 0 0 18",
		"M12 3v18"
	],
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
}, qt = {
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
}, Jt = /* @__PURE__ */ new Map();
for (let e of Object.keys(Kt)) {
	let t = e.replace(/-/g, "");
	Jt.has(t) || Jt.set(t, e);
}
function Yt(e) {
	return qt[e] || (Kt[e] ? e : Jt.get(e.replace(/-/g, "")) ?? e);
}
//#endregion
//#region src/components/icon/Icon.vue?vue&type=script&setup=true&lang.ts
var Xt = ["title", "aria-label"], Zt = [
	"fill",
	"stroke",
	"stroke-width",
	"aria-label",
	"aria-hidden",
	"aria-disabled"
], Qt = ["d"], $ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => {
			let e = n.paths;
			if (!e) return null;
			let t = (Array.isArray(e) ? e : [e]).flatMap((e) => String(e).split("|")).map((e) => e.trim()).filter((e) => e.length > 0);
			return t.length ? t : null;
		}), i = a(() => r.value ?? Kt[Yt(n.name ?? "")] ?? []), o = a(() => !r.value && !!n.name && i.value.length === 0), s = a(() => o.value && !1), c = a(() => n.label ?? n.name), u = a(() => typeof n.size == "number" ? `${n.size}px` : n.size), d = a(() => ({
			width: u.value,
			height: "auto",
			color: n.color,
			"--mc-icon-rot": n.rotate ? `${n.rotate}deg` : void 0
		})), f = a(() => ({
			width: u.value,
			height: u.value,
			fontSize: `calc(${u.value} * 0.55)`,
			color: n.color,
			"--mc-icon-rot": n.rotate ? `${n.rotate}deg` : void 0
		})), p = a(() => Z("mc-icon", `mc-icon--${n.variant}`, {
			"mc-icon--spin": n.spin,
			"is-disabled": n.disabled
		}, n.customClass));
		return (n, r) => s.value ? (P(), l("span", {
			key: 0,
			class: "mc-icon mc-icon--missing",
			style: k(f.value),
			title: `Unknown icon: ${e.name}`,
			role: "img",
			"aria-label": c.value,
			"aria-hidden": "true"
		}, " ? ", 12, Xt)) : (P(), l("svg", {
			key: 1,
			class: D(p.value),
			style: k(d.value),
			viewBox: "0 0 24 24",
			fill: e.fill ? "currentColor" : "none",
			stroke: e.fill ? "none" : "currentColor",
			"stroke-width": e.strokeWidth,
			"stroke-linecap": "round",
			"stroke-linejoin": "round",
			role: "img",
			"aria-label": c.value,
			"aria-hidden": e.label ? void 0 : "true",
			"aria-disabled": e.disabled || void 0,
			focusable: "false"
		}, [(P(!0), l(t, null, R(i.value, (e, t) => (P(), l("path", {
			key: t,
			d: e
		}, null, 8, Qt))), 128))], 14, Zt));
	}
}), [["__scopeId", "data-v-9fadec83"]]), $t = {
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
	slider: { label: "Slider" },
	watermark: { label: "Watermark" },
	sparkline: { label: "Sparkline" },
	spin: { loading: "Loading" }
}, en = {
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
	slider: { label: "滑块" },
	watermark: { label: "水印" },
	sparkline: { label: "迷你趋势图" },
	spin: { loading: "加载中" }
}, tn = Symbol("mochi-locale");
function nn(e) {
	F(tn, e);
}
function rn() {
	let e = b(tn, null), t = L($t);
	return a(() => e?.value ?? t.value);
}
var an = $t, on = en, sn = ["aria-disabled", "aria-live"], cn = {
	key: 0,
	class: "mc-alert__icon",
	"aria-hidden": "true"
}, ln = { class: "mc-alert__body" }, un = {
	key: 0,
	class: "mc-alert__title",
	"data-mc-type": "title"
}, dn = {
	key: 1,
	class: "mc-alert__description"
}, fn = {
	key: 1,
	class: "mc-alert__action"
}, pn = ["aria-label", "disabled"], mn = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, i = t, o = rn(), d = L(!0), f = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x"
		}, h = a(() => n.icon ?? f[n.type]);
		function g() {
			!n.disabled && d.value && (d.value = !1, i("close"));
		}
		let _ = a(() => Z("mc-alert", "mc-sheen-sweep", "mc-recipe-sheet", `mc-alert--${n.type}`, `mc-alert--${n.effect}`, {
			"is-accent": n.accent,
			"is-closable": n.closable,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (P(), s(r, { name: "mc-alert" }, {
			default: J(() => [d.value ? (P(), l("div", {
				key: 0,
				class: D(_.value),
				role: "alert",
				"aria-disabled": e.disabled || void 0,
				"aria-live": e.type === "error" ? "assertive" : "polite"
			}, [
				e.showIcon ? (P(), l("span", cn, [m($, {
					name: h.value,
					size: 18,
					"stroke-width": 2
				}, null, 8, ["name"])])) : c("", !0),
				u("div", ln, [e.title || t.$slots.title ? (P(), l("p", un, [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)])) : c("", !0), e.description || t.$slots.default ? (P(), l("div", dn, [z(t.$slots, "default", {}, () => [p(H(e.description), 1)], !0)])) : c("", !0)]),
				t.$slots.action ? (P(), l("div", fn, [z(t.$slots, "action", {}, void 0, !0)])) : c("", !0),
				e.closable ? (P(), l("button", {
					key: 2,
					class: "mc-alert__close",
					type: "button",
					"aria-label": W(o).alert?.close ?? "Close alert",
					disabled: e.disabled,
					onClick: g
				}, [m($, {
					name: "close",
					size: 13,
					"stroke-width": 2.4
				})], 8, pn)) : c("", !0)
			], 10, sn)) : c("", !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-882a3968"]]), hn = ["aria-label"], gn = [
	"href",
	"aria-current",
	"aria-disabled",
	"tabindex",
	"onClick",
	"onKeydown"
], _n = { class: "mc-anchor__label" }, vn = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = L(null), d = L(null), f = L(null), p = L(null), m = L(""), h = L(!1), g = L({
			top: 0,
			scale: 1,
			ready: !1
		}), _ = L(0), v = L(0), y = /* @__PURE__ */ new Map();
		function b(e) {
			return e ? typeof e == "string" ? At ? document.querySelector(e) : null : e : null;
		}
		function x(e) {
			return e === window;
		}
		function S() {
			return b(r.target) ?? window;
		}
		function C(e) {
			return x(e) ? window.scrollY || document.documentElement.scrollTop || 0 : e.scrollTop;
		}
		function w(e) {
			return x(e) ? {
				width: window.innerWidth,
				height: window.innerHeight
			} : {
				width: e.clientWidth,
				height: e.clientHeight
			};
		}
		function T(e) {
			if (!At) return null;
			let t = e.href ?? `#${e.key}`, n = t.startsWith("#") ? t : `#${t}`;
			try {
				return document.querySelector(n);
			} catch {
				return null;
			}
		}
		function O(e, t) {
			let n = T(e);
			if (!n) return null;
			let r = x(t) ? null : t.getBoundingClientRect(), i = r ? r.top : 0;
			return n.getBoundingClientRect().top - i + C(t);
		}
		function j() {
			if (!At) return;
			let e = S(), t = C(e);
			w(e);
			let n = t + r.offset + 1, i = "", a = -Infinity;
			for (let t of r.items) {
				if (t.disabled) continue;
				let r = O(t, e);
				r !== null && r <= n && r > a && (a = r, i = t.key);
			}
			if (!i && r.items.length) {
				let t = r.items.find((e) => !e.disabled);
				if (t) {
					let r = O(t, e);
					r !== null && r > n && (i = t.key);
				}
			}
			i !== m.value && (m.value = i, o("change", i)), M(), N();
		}
		function M() {
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
		function N() {
			if (!r.affix || !s.value || !d.value) return;
			let e = s.value.getBoundingClientRect(), t = e.top <= r.offset;
			t !== h.value && (h.value = t), t && (_.value = e.left, v.value = e.height);
		}
		let F = 0;
		function I(e, t) {
			if (F && cancelAnimationFrame(F), r.duration <= 0) {
				e === window ? window.scrollTo(0, t) : e.scrollTo({
					top: t,
					behavior: "auto"
				});
				return;
			}
			let n = C(e), i = t - n;
			if (Math.abs(i) < 1) return;
			let a = performance.now(), o = (t) => {
				let s = Math.min(1, (t - a) / r.duration), c = 1 - (1 - s) ** 3, l = n + i * c;
				e === window ? window.scrollTo(0, l) : e.scrollTo({
					top: l,
					behavior: "auto"
				}), F = s < 1 ? requestAnimationFrame(o) : 0;
			};
			F = requestAnimationFrame(o);
		}
		function z(e) {
			if (e.disabled) return;
			let t = S(), n = T(e);
			if (!n) return;
			let i = x(t) ? null : t.getBoundingClientRect(), a = i ? i.top : 0, s = n.getBoundingClientRect().top - a + C(t) - r.offset;
			I(t, Math.max(0, s)), m.value = e.key, o("change", e.key);
		}
		function B(e, t) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), z(t));
		}
		let V = 0;
		function U() {
			V || (V = requestAnimationFrame(() => {
				V = 0, j();
			}));
		}
		function G() {
			U();
		}
		function K() {
			At && (te(), S().addEventListener("scroll", G, { passive: !0 }), window.addEventListener("resize", U), j());
		}
		function te() {
			At && (S().removeEventListener("scroll", G), window.removeEventListener("resize", U), V && (cancelAnimationFrame(V), V = 0));
		}
		q(() => r.items, () => E(j), { deep: !0 }), q(() => r.target, K), ee(K), A(te);
		let ne = a(() => ({
			transform: `translateY(${g.value.top}px) scaleY(${g.value.scale})`,
			opacity: +!!g.value.ready
		})), re = a(() => {
			if (r.affix && h.value) return {
				position: "fixed",
				top: `${r.offset}px`,
				left: `${_.value}px`
			};
		});
		function J(e) {
			return { "--mc-anchor-level": String(e.level ?? 1) };
		}
		let ie = a(() => Z("mc-anchor", "mc-recipe-panel", "mc-anchor--panel", "mc-grain-overlay", `mc-anchor--${r.placement}`, { "is-affixed": h.value }, r.customClass));
		return (n, r) => (P(), l("div", {
			ref_key: "wrapper",
			ref: d,
			class: "mc-anchor__wrapper"
		}, [e.affix && h.value ? (P(), l("div", {
			key: 0,
			class: "mc-anchor__placeholder",
			style: k({ height: `${v.value}px` }),
			"aria-hidden": "true"
		}, null, 4)) : c("", !0), u("nav", {
			ref_key: "root",
			ref: s,
			class: D(ie.value),
			style: k(re.value),
			"aria-label": W(i).anchor?.navigation ?? "Section navigation"
		}, [
			r[0] || (r[0] = u("span", {
				class: "mc-anchor__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-anchor__rail",
				"aria-hidden": "true"
			}, null, -1)),
			u("span", {
				ref_key: "markerEl",
				ref: p,
				class: "mc-anchor__indicator",
				style: k(ne.value),
				"aria-hidden": "true"
			}, null, 4),
			u("ul", {
				ref_key: "listEl",
				ref: f,
				class: "mc-anchor__list"
			}, [(P(!0), l(t, null, R(e.items, (e) => (P(), l("li", {
				key: e.key,
				class: "mc-anchor__item"
			}, [u("a", {
				href: e.href ?? `#${e.key}`,
				class: D(["mc-anchor__link", {
					"is-active": e.key === m.value,
					"is-disabled": e.disabled,
					"mc-sheen-sweep": !e.disabled
				}]),
				style: k(J(e)),
				"aria-current": e.key === m.value ? "true" : void 0,
				"aria-disabled": e.disabled ? "true" : void 0,
				tabindex: e.disabled ? -1 : void 0,
				onClick: X((t) => z(e), ["prevent"]),
				onKeydown: (t) => B(t, e)
			}, [u("span", _n, H(e.label), 1)], 46, gn)]))), 128))], 512)
		], 14, hn)], 512));
	}
}), [["__scopeId", "data-v-fc0073c9"]]), yn = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => n.colors.length ? n.colors : [
			"hsl(var(--mc-h) var(--mc-s) 68%)",
			"hsl(var(--mc-h2) var(--mc-s2) 64%)",
			"hsl(var(--mc-h3) var(--mc-s3) 66%)",
			"hsl(var(--mc-h) calc(var(--mc-s) * 0.78) 74%)"
		]), i = a(() => r.value.slice(0, Math.max(1, n.blobs)).map((e, t) => ({
			"--mc-blob-color": e,
			"--mc-blob-delay": `${(t / Math.max(1, n.blobs) * n.speed).toFixed(2)}s`,
			"--mc-blob-scale": `${1 + t * .18}`,
			"--mc-blob-x": `${18 + t * 28 % 74}%`,
			"--mc-blob-y": `${22 + t * 37 % 50}%`
		}))), o = a(() => ({
			"--mc-aurora-intensity": String(n.intensity),
			"--mc-aurora-speed": `${n.speed}s`
		})), s = a(() => Z("mc-aurora", `is-${n.variant}`, {
			"is-grain": n.grain,
			"is-static": !n.animated,
			"is-disabled": n.disabled
		}, n.customClass));
		return (e, n) => (P(), l("div", {
			class: D(s.value),
			style: k(o.value),
			"aria-hidden": "true"
		}, [(P(!0), l(t, null, R(i.value, (e, t) => (P(), l("span", {
			key: t,
			class: "mc-aurora__blob",
			style: k(e)
		}, null, 4))), 128)), z(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-d732a653"]]), bn = {
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
function xn(e, t, n, r, i, a, o, s) {
	let [c, l = "center"] = r.split("-"), u = 0, d = 0;
	return c === "top" || c === "bottom" ? (d = c === "top" ? e.top - n - i : e.bottom + i, u = l === "start" ? e.left : l === "end" ? e.right - t : e.left + e.width / 2 - t / 2) : (u = c === "left" ? e.left - t - i : e.right + i, d = l === "start" ? e.top : l === "end" ? e.bottom - n : e.top + e.height / 2 - n / 2), {
		x: u,
		y: d,
		placement: r
	};
}
function Sn(e, t, n, r, i, a) {
	let o = e.placement.split("-")[0];
	return o === "top" ? e.y < a : o === "bottom" ? e.y + n > i - a : o === "left" ? e.x < a : e.x + t > r - a;
}
function Cn(e, t, n = {}) {
	let { placement: r = "bottom", offset: i = 8, flip: o = !0, shift: s = !0, padding: c = 8, zIndex: l, arrowPadding: u = 12 } = n, d = V({
		x: 0,
		y: 0,
		placement: "bottom"
	}), f = a(() => d.value.placement), p = a(() => d.value.placement.split("-")[0]), m = a(() => {
		let [e, t = "center"] = d.value.placement.split("-"), n = t === "start" ? "top" : t === "end" ? "bottom" : "center", r = t === "start" ? "left" : t === "end" ? "right" : "center";
		return e === "top" ? `bottom ${r}` : e === "bottom" ? `top ${r}` : e === "left" ? `${n} right` : `${n} left`;
	}), h = L(!1), g = 0;
	function _() {
		let n = e.value, a = t.value;
		if (!n || !a) return;
		let l = n.getBoundingClientRect(), f = a.offsetWidth, p = a.offsetHeight, m = window.innerWidth, g = window.innerHeight, _ = U(r), v = U(i), y = xn(l, f, p, _, v, m, g, c);
		if (o && Sn(y, f, p, m, g, c)) {
			let e = xn(l, f, p, bn[y.placement], v, m, g, c);
			Sn(e, f, p, m, g, c) || (y = e);
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
	function y(e) {
		let n = t.value, r = e.target;
		n && r && (n === r || n.contains(r)) || v();
	}
	function b() {
		At && (x(), window.addEventListener("scroll", y, !0), window.addEventListener("resize", v));
	}
	function x() {
		At && (window.removeEventListener("scroll", y, !0), window.removeEventListener("resize", v), g && cancelAnimationFrame(g), g = 0);
	}
	return q([e, t], () => v(), { flush: "post" }), q(() => [U(r), U(i)], () => v(), { flush: "post" }), A(() => x()), {
		coords: d,
		currentPlacement: f,
		arrowSide: p,
		transformOrigin: m,
		style: a(() => ({
			position: n.strategy ?? "fixed",
			left: "0px",
			top: "0px",
			translate: `${Math.round(d.value.x)}px ${Math.round(d.value.y)}px`,
			zIndex: U(n.zIndex) ?? void 0
		})),
		isVisible: h,
		update: _,
		schedule: v,
		startAutoUpdate: b,
		stopAutoUpdate: x
	};
}
//#endregion
//#region src/components/config-provider/context.ts
var wn = Symbol("mochi-config"), Tn = 2e3, En = 10, Dn = 900, On = 0;
function kn() {
	return On = (On + 1) % Dn, Tn + On * En;
}
function An() {
	On = 0;
}
function jn(e = {}) {
	let t = b(wn, null)?.zIndex?.value ?? Tn, n = L(e.zIndex?.value);
	return e.active && q(e.active, (e) => {
		e && (n.value = kn());
	}, {
		immediate: !0,
		flush: "sync"
	}), A(() => {
		n.value = void 0;
	}), a(() => e.zIndex?.value === void 0 ? n.value === void 0 ? t + En : n.value : e.zIndex.value);
}
//#endregion
//#region src/composables/useOverlayStack.ts
var Mn = [];
function Nn(e) {
	let t = Mn.findIndex((t) => t.id === e);
	t !== -1 && Mn.splice(t, 1);
}
function Pn(e) {
	let t = Symbol("mochi-overlay"), n = {
		id: t,
		modal: !!e.modal
	};
	function r() {
		return Mn.length > 0 && Mn[Mn.length - 1].id === t;
	}
	function i() {
		for (let e = Mn.length - 1; e >= 0; e--) if (Mn[e].modal) return Mn[e].id === t;
		return !1;
	}
	return typeof window < "u" && (q(e.active, (e) => {
		Nn(t), e && Mn.push(n);
	}, {
		immediate: !0,
		flush: "sync"
	}), A(() => Nn(t))), {
		isTop: r,
		isTopModal: i
	};
}
function Fn() {
	Mn.length = 0;
}
//#endregion
//#region src/composables/useId.ts
var In = 0;
function Ln(e = "mc") {
	let t = g();
	return t?.uid === void 0 ? (In += 1, `${e}-${In}`) : `${e}-${t.uid}-${In++}`;
}
function Rn(e = "mc") {
	return L(Ln(e));
}
var zn = Symbol("mochi-id");
function Bn(e) {
	F(zn, e);
}
function Vn(e) {
	return b(zn, e);
}
//#endregion
//#region src/composables/useOverlayScope.ts
function Hn() {
	let e = b(wn, null);
	return a(() => {
		let t = {};
		for (let [n, r] of Object.entries(e?.scopeAttrs?.value ?? {})) r !== void 0 && (t[n] = r);
		let n = e?.scopeStyle?.value;
		return n && Object.keys(n).length && (t.style = { ...n }), t;
	});
}
//#endregion
//#region src/components/auto-complete/AutoComplete.vue?vue&type=script&setup=true&lang.ts
var Un = {
	key: 0,
	class: "mc-auto-complete__affix mc-auto-complete__affix--prefix"
}, Wn = [
	"value",
	"placeholder",
	"disabled",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-disabled"
], Gn = {
	key: 1,
	class: "mc-auto-complete__affix mc-auto-complete__affix--suffix"
}, Kn = [
	"id",
	"data-index",
	"aria-selected",
	"onClick",
	"onMouseenter"
], qn = { class: "mc-auto-complete__option-label" }, Jn = {
	key: 0,
	class: "mc-auto-complete__empty",
	role: "presentation"
}, Yn = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiAutoComplete",
	inheritAttrs: !1,
	__name: "AutoComplete",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"select",
		"update:open",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = Ln("mc-auto-complete"), d = `${o}-list`, f = (e) => `${o}-option-${e}`, p = e, h = i, g = K(e, "modelValue"), _ = G(), v = rn(), y = Hn(), b = a(() => p.placeholder || v.value.input.placeholder), x = a(() => v.value.select.noMatch), S = a(() => {
			let { class: e, style: t, ...n } = _;
			return n;
		}), C = L(!1), w = jn({ active: C }), O = a(() => p.open ?? C.value), { isTop: j } = Pn({ active: O }), M = L(g.value ?? ""), N = L(-1);
		q(() => g.value, (e) => {
			M.value = e ?? "";
		});
		let F = a(() => (p.options ?? []).map((e) => typeof e == "string" ? {
			label: e,
			value: e
		} : e)), I = a(() => {
			let e = M.value.trim();
			if (!e) return [];
			let t = p.filter;
			if (t) return F.value.filter((n) => t(e, n));
			let n = e.toLowerCase();
			return F.value.filter((e) => e.label.toLowerCase().includes(n) || e.value.toLowerCase().includes(n));
		}), z = L(null), B = L(null), V = L(null), { style: U, coords: te, arrowSide: ne, transformOrigin: re, update: ie, startAutoUpdate: Y, stopAutoUpdate: X } = Cn(z, B, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			padding: 8,
			zIndex: w
		}), ae = a(() => {
			let e = te.value.arrowX;
			return e === void 0 ? { left: "50%" } : { left: `${Math.round(e)}px` };
		});
		function oe(e) {
			(p.open ?? C.value) !== e && (C.value = e, h("update:open", e), h(e ? "open" : "close"));
		}
		function se() {
			p.disabled || F.value.length && oe(!0);
		}
		function ce() {
			oe(!1), N.value = -1;
		}
		function le(e) {
			let t = e.target;
			M.value = t.value, g.value = t.value, N.value = -1, t.value.trim() ? se() : ce();
		}
		function ue() {
			p.disabled || M.value.trim() && se();
		}
		function de() {
			h("change", M.value);
		}
		function fe(e) {
			let t = I.value;
			if (!t.length) return;
			let n = N.value < 0 ? e > 0 ? -1 : 0 : N.value;
			N.value = (n + e + t.length) % t.length, pe();
		}
		function pe() {
			let e = V.value;
			e && e.querySelector(`[data-index="${N.value}"]`)?.scrollIntoView({ block: "nearest" });
		}
		function me(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function he(e) {
			M.value = e.value, g.value = e.value, h("change", e.value), h("select", e), ce();
		}
		function ge(e) {
			if (!p.disabled) {
				if (e.key === "ArrowDown") {
					if (e.preventDefault(), !O.value) {
						se();
						return;
					}
					fe(1);
				} else if (e.key === "ArrowUp") {
					if (e.preventDefault(), !O.value) {
						se();
						return;
					}
					fe(-1);
				} else if (e.key === "Enter") {
					let t = I.value[N.value];
					t && (e.preventDefault(), he(t));
				} else e.key === "Escape" ? O.value && j() && (e.preventDefault(), e.stopPropagation(), ce()) : e.key === "Tab" && ce();
			}
		}
		q(O, async (e) => {
			e ? (await E(), B.value && z.value && (B.value.style.minWidth = `${z.value.offsetWidth}px`), ie(), Y()) : X();
		}), q(I, () => {
			N.value = -1, ie();
		});
		function _e(e) {
			if (!O.value) return;
			let t = e.target;
			t && (z.value?.contains(t) || B.value?.contains(t) || ce());
		}
		ee(() => {
			document.addEventListener("pointerdown", _e, !0);
		}), A(() => {
			document.removeEventListener("pointerdown", _e, !0), X();
		});
		let ve = a(() => {
			let e = p.teleport;
			return typeof e == "string" ? e : "body";
		}), ye = a(() => p.teleport === !1), be = a(() => Z("mc-auto-complete", `mc-auto-complete--${p.variant}`, `mc-auto-complete--${p.size}`, {
			"is-open": O.value,
			"is-disabled": p.disabled
		})), xe = a(() => Z(be.value, _.class, p.customClass)), Se = a(() => _.style), Ce = a(() => ({
			"mc-recipe-well": p.variant === "filled" || p.variant === "outlined",
			"mc-recipe-well-rim": p.variant === "outlined"
		}));
		return (i, a) => (P(), l("div", {
			class: D(xe.value),
			style: k(Se.value)
		}, [u("div", {
			ref_key: "field",
			ref: z,
			class: D(["mc-auto-complete__field mc-sheen-sweep", Ce.value])
		}, [
			a[0] || (a[0] = u("span", {
				class: "mc-auto-complete__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			a[1] || (a[1] = u("span", {
				class: "mc-auto-complete__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			e.prefix ? (P(), l("span", Un, [m($, {
				name: e.prefix,
				size: 15
			}, null, 8, ["name"])])) : c("", !0),
			u("input", T(S.value, {
				class: "mc-auto-complete__input",
				type: "text",
				role: "combobox",
				value: M.value,
				placeholder: b.value,
				disabled: e.disabled,
				"aria-expanded": O.value,
				"aria-haspopup": "listbox",
				"aria-autocomplete": "list",
				"aria-controls": O.value ? d : void 0,
				"aria-activedescendant": O.value && N.value >= 0 ? f(N.value) : void 0,
				"aria-disabled": e.disabled || void 0,
				onInput: le,
				onFocus: ue,
				onBlur: de,
				onKeydown: ge
			}), null, 16, Wn),
			e.suffix ? (P(), l("span", Gn, [m($, {
				name: e.suffix,
				size: 15
			}, null, 8, ["name"])])) : c("", !0)
		], 2), (P(), s(n, {
			to: ve.value,
			disabled: ye.value
		}, [m(r, { name: "mc-auto-complete-pop" }, {
			default: J(() => [O.value ? (P(), l("div", T({
				key: 0,
				ref_key: "panel",
				ref: B,
				class: "mc-auto-complete__panel",
				style: W(U)
			}, W(y)), [u("span", {
				class: D(["mc-auto-complete__panel-arrow mc-recipe-panel", `is-${W(ne)}`]),
				style: k(ae.value),
				"aria-hidden": "true"
			}, null, 6), u("div", {
				class: "mc-auto-complete__panel-inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(re) })
			}, [u("ul", {
				id: d,
				ref_key: "listEl",
				ref: V,
				class: "mc-auto-complete__list mc-scroll",
				role: "listbox"
			}, [(P(!0), l(t, null, R(I.value, (e, t) => (P(), l("li", {
				id: f(t),
				key: e.value,
				class: D(["mc-auto-complete__option", { "is-active": t === N.value }]),
				role: "option",
				"data-index": t,
				"aria-selected": e.value === M.value,
				onClick: (t) => he(e),
				onMouseenter: (e) => N.value = t,
				onMousemove: me
			}, [u("span", qn, H(e.label), 1), m($, {
				name: "arrow-right",
				size: 13,
				class: "mc-auto-complete__option-arrow"
			})], 42, Kn))), 128)), I.value.length ? c("", !0) : (P(), l("li", Jn, H(x.value), 1))], 512)], 4)], 16)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 6));
	}
}), [["__scopeId", "data-v-5a4dc7ef"]]), Xn = ["tabindex", "aria-disabled"], Zn = ["src", "alt"], Qn = {
	key: 1,
	class: "mc-avatar__text"
}, $n = {
	key: 3,
	class: "mc-avatar__text"
}, er = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = {
			small: 28,
			medium: 40,
			large: 56
		}, o = {
			small: 12,
			medium: 15,
			large: 20
		}, d = a(() => typeof n.size == "number" ? n.size : i[n.size] ?? 40), f = a(() => typeof n.size == "number" ? Math.round(d.value * .38) : o[n.size] ?? 15), p = L(null);
		function m(e) {
			n.interactive && !n.disabled && Et(e, p.value);
		}
		let h = a(() => Z("mc-avatar", "mc-recipe-panel", `mc-avatar--${n.shape}`, {
			"is-bordered": n.bordered,
			"is-ring": n.ring,
			"is-tilt": n.tilt,
			"is-interactive": n.interactive,
			"is-disabled": n.disabled
		}, n.customClass)), g = a(() => (n.text ?? "").trim().slice(0, 2).toUpperCase());
		function _(e) {
			r("error", e);
		}
		return (t, n) => (P(), l("span", {
			ref_key: "root",
			ref: p,
			class: D(h.value),
			style: k({
				width: `${d.value}px`,
				height: `${d.value}px`,
				fontSize: `${f.value}px`
			}),
			tabindex: e.interactive ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: X(m, ["self"])
		}, [
			e.src ? (P(), l("img", {
				key: 0,
				class: "mc-avatar__img",
				src: e.src,
				alt: e.alt,
				onError: _
			}, null, 40, Zn)) : e.text ? (P(), l("span", Qn, H(g.value), 1)) : e.icon ? (P(), s($, {
				key: 2,
				name: e.icon,
				size: Math.round(d.value * .45),
				class: "mc-avatar__icon"
			}, null, 8, ["name", "size"])) : (P(), l("span", $n, H(g.value || "·"), 1)),
			n[0] || (n[0] = u("span", {
				class: "mc-avatar__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			n[1] || (n[1] = u("span", {
				class: "mc-avatar__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			e.status ? (P(), l("span", {
				key: 4,
				class: D(["mc-avatar__status", [`is-${e.status}`, `is-${e.statusPosition}`]])
			}, null, 2)) : c("", !0)
		], 46, Xn));
	}
}), [["__scopeId", "data-v-59fb5bab"]]), tr = [
	"aria-label",
	"disabled",
	"aria-disabled"
], nr = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, i = t, o = L(!1);
		function c(e) {
			return e ? typeof e == "string" ? At ? document.querySelector(e) : null : e : null;
		}
		function l(e) {
			return e === window;
		}
		function d() {
			return c(n.target) ?? window;
		}
		function f(e) {
			return l(e) ? window.scrollY || document.documentElement.scrollTop || 0 : e.scrollTop;
		}
		function p() {
			let e = d();
			o.value = f(e) > n.visibilityHeight;
		}
		let h = 0;
		function g() {
			h || (h = requestAnimationFrame(() => {
				h = 0, p();
			}));
		}
		function _() {
			g();
		}
		function v() {
			At && (y(), d().addEventListener("scroll", _, { passive: !0 }), window.addEventListener("resize", g), p());
		}
		function y() {
			At && (d().removeEventListener("scroll", _), window.removeEventListener("resize", g), h && (cancelAnimationFrame(h), h = 0));
		}
		let b = 0;
		function x() {
			let e = d(), t = f(e);
			if (t <= 0) return;
			if (n.duration <= 0) {
				e === window ? window.scrollTo(0, 0) : e.scrollTo({
					top: 0,
					behavior: "auto"
				});
				return;
			}
			b && cancelAnimationFrame(b);
			let r = performance.now(), i = (a) => {
				let o = Math.min(1, (a - r) / n.duration), s = 1 - (1 - o) ** 3, c = t * (1 - s);
				e === window ? window.scrollTo(0, c) : e.scrollTo({
					top: c,
					behavior: "auto"
				}), b = o < 1 ? requestAnimationFrame(i) : 0;
			};
			b = requestAnimationFrame(i);
		}
		function S() {
			n.disabled || (i("click"), x());
		}
		q(() => n.target, v), q(() => n.visibilityHeight, p), ee(() => {
			v(), E(() => p());
		}), A(y);
		let C = a(() => ({
			right: `${n.right}px`,
			bottom: `${n.bottom}px`,
			width: `${n.size}px`,
			height: `${n.size}px`
		})), w = a(() => Z("mc-back-top", "mc-recipe-panel", `mc-back-top--${n.shape}`, "mc-sheen-sweep", { "is-disabled": n.disabled }, n.customClass));
		return (t, n) => (P(), s(r, {
			name: "mc-back-top",
			persisted: ""
		}, {
			default: J(() => [ie(u("button", {
				type: "button",
				class: D(w.value),
				style: k(C.value),
				"aria-label": e.label,
				disabled: e.disabled,
				"aria-disabled": e.disabled ? "true" : void 0,
				onClick: S
			}, [
				n[0] || (n[0] = u("span", {
					class: "mc-back-top__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				n[1] || (n[1] = u("span", {
					class: "mc-back-top__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				n[2] || (n[2] = u("span", {
					class: "mc-back-top__glow",
					"aria-hidden": "true"
				}, null, -1)),
				m($, {
					name: "arrow-up",
					size: Math.round(e.size * .46),
					"stroke-width": 2.2
				}, null, 8, ["size"])
			], 14, tr), [[re, o.value]])]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-5b94d14a"]]), rr = { class: "mc-badge__count" }, ir = { class: "mc-badge__ribbon-text" }, ar = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = te(), n = e, r = a(() => !(n.value === void 0 || n.value === null || n.value === !1 || n.value === 0 && !n.showZero || n.value === "" && !n.showZero)), i = a(() => n.dot || n.value === !0 || !r.value), o = a(() => n.dot || n.status !== "default" ? !0 : r.value), s = a(() => {
			let e = n.value;
			return typeof e == "number" && e > n.max ? `${n.max}+` : e === !0 ? "" : String(e ?? "");
		}), d = a(() => {
			if (!n.offset) return;
			let [e = 0, t = 0] = n.offset;
			return { translate: `${e}px ${t}px` };
		}), f = a(() => {
			let e = {}, t = Ot(n.color ?? (n.status === "default" ? void 0 : n.status));
			return t && (e["--mc-badge-bg"] = t, e["--mc-badge-fg"] = "var(--mc-on-solid)"), e;
		}), m = a(() => Z("mc-badge", {
			"is-standalone": n.standalone || !t.default,
			"is-dot": i.value,
			"is-ribbon": n.ribbon,
			"is-disabled": n.disabled,
			[`is-status-${n.status}`]: n.status !== "default"
		}, n.customClass));
		return (t, n) => (P(), l("span", { class: D(m.value) }, [
			z(t.$slots, "default", {}, void 0, !0),
			o.value && !i.value && !e.ribbon ? (P(), l("span", {
				key: 0,
				class: "mc-badge__bubble",
				style: k({
					...f.value,
					...d.value
				})
			}, [u("span", rr, H(s.value), 1)], 4)) : o.value && i.value && !e.ribbon ? (P(), l("span", {
				key: 1,
				class: "mc-badge__bubble mc-badge__bubble--dot",
				style: k({
					...f.value,
					...d.value
				}),
				"aria-hidden": "true"
			}, [...n[0] || (n[0] = [u("span", { class: "mc-badge__dot" }, null, -1)])], 4)) : c("", !0),
			e.ribbon ? (P(), l("span", {
				key: 2,
				class: "mc-badge__ribbon",
				style: k(f.value)
			}, [u("span", ir, [z(t.$slots, "ribbon", {}, () => [p(H(s.value), 1)], !0)])], 4)) : c("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-675f08d8"]]), or = /* @__PURE__ */ "212222.222122.222221.121223.121322.131222.122213.122312.132212.221213.221312.231212.112232.122132.122231.113222.123122.123221.223211.221132.221231.213212.223112.312131.311222.321122.321221.312212.322112.322211.212123.212321.232121.111323.131123.131321.112313.132113.132311.211313.231113.231311.112133.112331.132131.113123.113321.133121.313121.211331.231131.213113.213311.213131.311123.311321.331121.312113.312311.332111.314111.221411.431111.111224.111422.121124.121421.141122.141221.112214.112412.122114.122411.142112.142211.241211.221114.413111.241112.134111.111242.121142.121241.114212.124112.124211.411212.421112.421211.212141.214121.412121.111143.111341.131141.114113.114311.411113.411311.113141.114131.311141.411131.211412.211214.211232.2331112".split("."), sr = 104, cr = 106;
function lr(e) {
	let t = [], n = !0;
	for (let r of e) {
		let e = Number(r);
		for (let r = 0; r < e; r++) t.push(n);
		n = !n;
	}
	return t;
}
function ur(e) {
	let t = e ?? "", n = [sr];
	for (let e of t) {
		let t = e.charCodeAt(0);
		if (t < 32 || t > 126) throw Error(`[mochi-ui] Barcode: character "${e}" is not supported by Code 128 subset B.`);
		n.push(t - 32);
	}
	let r = sr;
	for (let e = 1; e < n.length; e++) r += n[e] * e;
	n.push(r % 103), n.push(cr);
	let i = [];
	for (let e of n) i.push(...lr(or[e]));
	return {
		modules: i,
		text: t,
		leadingText: "",
		trailingText: ""
	};
}
var dr = [
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
], fr = [
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
], pr = [
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
function mr(e) {
	return fr[e];
}
function hr(e, t) {
	return t === "L" ? dr[e] : mr(e).split("").reverse().join("");
}
function gr(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t += e[n] * (n % 2 == 0 ? 1 : 3);
	return (10 - t % 10) % 10;
}
function _r(e) {
	let t = (e ?? "").replace(/\D/g, "");
	if (t.length !== 12 && t.length !== 13) throw Error("[mochi-ui] Barcode: EAN-13 needs 12 or 13 digits.");
	let n = t.slice(0, 12).split("").map(Number), r = gr(n);
	if (t.length === 13 && Number(t[12]) !== r) throw Error("[mochi-ui] Barcode: EAN-13 check digit is invalid.");
	let i = pr[n[0]], a = [], o = (e) => {
		for (let t of e) a.push(t === "1");
	};
	o("101");
	for (let e = 0; e < 6; e++) o(hr(n[e + 1], i[e]));
	o("01010");
	for (let e = 0; e < 6; e++) o(mr(n[e + 7]));
	return o("101"), {
		modules: a,
		text: n.slice(1).join(""),
		leadingText: String(n[0]),
		trailingText: String(r)
	};
}
function vr(e, t) {
	return t === "ean13" ? _r(e) : ur(e);
}
//#endregion
//#region src/components/barcode/Barcode.vue?vue&type=script&setup=true&lang.ts
var yr = { class: "mc-barcode__plate mc-grain-overlay" }, br = [
	"width",
	"height",
	"viewBox",
	"aria-label"
], xr = [
	"x",
	"width",
	"height",
	"fill"
], Sr = {
	key: 1,
	class: "mc-barcode__error"
}, Cr = {
	key: 0,
	class: "mc-barcode__guard"
}, wr = { class: "mc-barcode__digits" }, Tr = {
	key: 1,
	class: "mc-barcode__guard"
}, Er = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => {
			try {
				return {
					result: vr(n.value ?? "", n.format),
					error: null
				};
			} catch (e) {
				return {
					result: null,
					error: e instanceof Error ? e.message : "Unable to encode barcode"
				};
			}
		}), i = a(() => {
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
		}), o = a(() => n.showText ? Math.max(1, n.height - 18) : n.height), s = a(() => ({
			top: `${o.value}px`,
			height: n.showText ? "18px" : "0px"
		})), d = a(() => Z("mc-barcode", "mc-sheen-sweep", `mc-barcode--${n.format}`, { "is-error": !!r.value.error }, n.customClass));
		return (n, a) => (P(), l("div", {
			class: D(d.value),
			style: k({
				width: `${e.width}px`,
				height: `${e.height}px`
			})
		}, [
			a[0] || (a[0] = u("span", {
				class: "mc-barcode__halo",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", yr, [r.value.result ? (P(), l("svg", {
				key: 0,
				class: "mc-barcode__svg",
				width: e.width,
				height: o.value,
				viewBox: `0 0 ${e.width} ${o.value}`,
				role: "img",
				"aria-label": e.label || e.value || "Barcode"
			}, [(P(!0), l(t, null, R(i.value, (t, n) => (P(), l("rect", {
				key: n,
				x: t.x,
				y: "0",
				width: t.width,
				height: o.value,
				fill: e.color
			}, null, 8, xr))), 128))], 8, br)) : (P(), l("span", Sr, H(r.value.error), 1))]),
			e.showText && r.value.result ? (P(), l("div", {
				key: 0,
				class: "mc-barcode__text",
				style: k(s.value)
			}, [
				r.value.result.leadingText ? (P(), l("span", Cr, H(r.value.result.leadingText), 1)) : c("", !0),
				u("span", wr, H(r.value.result.text), 1),
				r.value.result.trailingText ? (P(), l("span", Tr, H(r.value.result.trailingText), 1)) : c("", !0)
			], 4)) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-f865edc9"]]), Dr = ["aria-label"], Or = { class: "mc-breadcrumb__list" }, kr = {
	key: 0,
	class: "mc-breadcrumb__separator",
	"aria-hidden": "true"
}, Ar = ["aria-expanded", "aria-label"], jr = ["href", "onClick"], Mr = { class: "mc-breadcrumb__label" }, Nr = ["aria-current", "aria-disabled"], Pr = { class: "mc-breadcrumb__label" }, Fr = ["aria-disabled", "onClick"], Ir = { class: "mc-breadcrumb__popup-content" }, Lr = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiBreadcrumb",
	__name: "Breadcrumb",
	props: {
		items: {},
		separator: { default: "chevron-right" },
		maxItems: { default: 0 },
		customClass: {}
	},
	emits: ["select"],
	setup(e, { emit: i }) {
		let o = e, d = rn(), f = Hn(), h = i, g = L(null), _ = L(null), v = L(!1), { isTop: y } = Pn({ active: v }), { style: b, transformOrigin: x, update: S, startAutoUpdate: C, stopAutoUpdate: w } = Cn(g, _, {
			placement: "bottom",
			offset: 8,
			flip: !0
		});
		function O(e = !1) {
			v.value = !0, E(() => {
				S(), C(), e && k();
			});
		}
		function k() {
			(_.value?.querySelector("[role=\"menuitem\"]:not([aria-disabled=\"true\"])"))?.focus();
		}
		function j() {
			v.value && (v.value = !1, w());
		}
		function M(e) {
			if (!v.value) return;
			let t = e.target;
			t && (g.value?.contains(t) || _.value?.contains(t) || j());
		}
		function N(e) {
			e.key === "Escape" ? v.value && y() && (e.stopPropagation(), j()) : (e.key === "Enter" || e.key === " ") && (e.preventDefault(), v.value ? j() : O(!0));
		}
		function F(e) {
			if (e.key === "Escape") {
				if (!y()) return;
				e.stopPropagation(), j();
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
		ee(() => {
			At && document.addEventListener("mousedown", M, !0);
		}), A(() => {
			w(), At && document.removeEventListener("mousedown", M, !0);
		});
		let I = a(() => {
			let e = o.items ?? [], t = o.maxItems;
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
		}), z = a(() => {
			let e = o.items ?? [], t = o.maxItems;
			if (!t || t <= 0 || e.length <= t) return [];
			let n = Math.max(1, t - 2);
			return e.slice(1, e.length - n).map((e, t) => ({
				item: e,
				index: t + 1
			}));
		});
		function B(e, t) {
			e.disabled || (h("select", e, t), j());
		}
		let V = a(() => Z("mc-breadcrumb", o.customClass));
		return (i, a) => (P(), l("nav", {
			class: D(V.value),
			"aria-label": W(d).breadcrumb?.label ?? "Breadcrumb"
		}, [u("ol", Or, [(P(!0), l(t, null, R(I.value, (t, n) => (P(), l("li", {
			key: `${t.type}-${t.index}`,
			class: "mc-breadcrumb__item"
		}, [n > 0 ? (P(), l("span", kr, [m($, {
			name: e.separator,
			size: 15,
			"stroke-width": 2
		}, null, 8, ["name"])])) : c("", !0), t.type === "ellipsis" ? (P(), l("button", {
			key: 1,
			ref_for: !0,
			ref_key: "ellipsisRef",
			ref: g,
			type: "button",
			class: "mc-breadcrumb__ellipsis",
			"aria-haspopup": "true",
			"aria-expanded": v.value,
			"aria-label": W(d).breadcrumb?.expand ?? "Show hidden breadcrumbs",
			onClick: a[0] || (a[0] = (e) => v.value ? j() : O()),
			onMouseenter: a[1] || (a[1] = (e) => O()),
			onKeydown: N
		}, [m($, {
			name: "more-horizontal",
			size: 15
		})], 40, Ar)) : t.item.href && !t.item.disabled ? (P(), l("a", {
			key: 2,
			class: "mc-breadcrumb__link",
			href: t.item.href,
			onClick: (e) => B(t.item, t.index)
		}, [t.item.icon ? (P(), s($, {
			key: 0,
			name: t.item.icon,
			size: 15,
			class: "mc-breadcrumb__icon"
		}, null, 8, ["name"])) : c("", !0), u("span", Mr, H(t.item.label), 1)], 8, jr)) : (P(), l("span", {
			key: 3,
			class: D(["mc-breadcrumb__text", {
				"is-current": n === I.value.length - 1,
				"is-disabled": t.item.disabled
			}]),
			"aria-current": n === I.value.length - 1 ? "page" : void 0,
			"aria-disabled": t.item.disabled ? "true" : void 0
		}, [t.item.icon ? (P(), s($, {
			key: 0,
			name: t.item.icon,
			size: 15,
			class: "mc-breadcrumb__icon"
		}, null, 8, ["name"])) : c("", !0), u("span", Pr, H(t.item.label), 1)], 10, Nr))]))), 128))]), (P(), s(n, { to: "body" }, [m(r, { name: "mc-breadcrumb-pop" }, {
			default: J(() => [v.value && z.value.length ? (P(), l("div", T({
				key: 0,
				ref_key: "popupRef",
				ref: _,
				class: "mc-breadcrumb__popup mc-recipe-panel mc-grain-overlay",
				style: [W(b), { transformOrigin: W(x) }]
			}, W(f), {
				role: "menu",
				onKeydown: F
			}), [a[2] || (a[2] = u("span", {
				class: "mc-breadcrumb__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)), (P(!0), l(t, null, R(z.value, (e) => (P(), l("button", {
				key: e.item.label,
				type: "button",
				class: D(["mc-breadcrumb__popup-item mc-sheen-sweep", { "is-disabled": e.item.disabled }]),
				role: "menuitem",
				"aria-disabled": e.item.disabled ? "true" : void 0,
				onClick: (t) => B(e.item, e.index)
			}, [u("span", Ir, [e.item.icon ? (P(), s($, {
				key: 0,
				name: e.item.icon,
				size: 15,
				class: "mc-breadcrumb__icon"
			}, null, 8, ["name"])) : c("", !0), p(" " + H(e.item.label), 1)])], 10, Fr))), 128))], 16)) : c("", !0)]),
			_: 1
		})]))], 10, Dr));
	}
}), [["__scopeId", "data-v-4dcfb6f8"]]), Rr = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, zr = {
	key: 1,
	class: "mc-button__aurora",
	"aria-hidden": "true"
}, Br = {
	key: 2,
	class: "mc-button__grain",
	"aria-hidden": "true"
}, Vr = {
	key: 3,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Hr = {
	key: 4,
	class: "mc-button__spinner",
	"aria-hidden": "true"
}, Ur = {
	key: 6,
	class: "mc-button__label"
}, Wr = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiButtonInner",
	__name: "ButtonInner",
	props: {
		loading: { type: Boolean },
		iconLeft: {},
		iconRight: {},
		glow: {},
		material: {}
	},
	setup(e) {
		return (n, r) => (P(), l(t, null, [
			e.material === "liquid" ? (P(), l("span", Rr)) : c("", !0),
			e.material === "glass" ? (P(), l("span", zr)) : c("", !0),
			e.material === "glass" ? (P(), l("span", Br)) : c("", !0),
			e.material === "liquid" ? (P(), l("span", Vr)) : c("", !0),
			u("span", {
				class: "mc-button__glow",
				style: k(e.glow),
				"aria-hidden": "true"
			}, null, 4),
			r[1] || (r[1] = u("span", {
				class: "mc-button__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			e.loading ? (P(), l("span", Hr, [...r[0] || (r[0] = [u("svg", {
				viewBox: "0 0 24 24",
				width: "1em",
				height: "1em"
			}, [u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})], -1)])])) : e.iconLeft ? (P(), s($, {
				key: 5,
				name: e.iconLeft,
				class: "mc-button__icon"
			}, null, 8, ["name"])) : c("", !0),
			n.$slots.default ? (P(), l("span", Ur, [z(n.$slots, "default", {}, void 0, !0)])) : c("", !0),
			e.iconRight && !e.loading ? (P(), s($, {
				key: 7,
				name: e.iconRight,
				class: "mc-button__icon"
			}, null, 8, ["name"])) : c("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-2fca074c"]]), Gr = [
	"href",
	"tabindex",
	"aria-disabled",
	"aria-busy"
], Kr = [
	"type",
	"disabled",
	"aria-busy"
], qr = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = L(null), o = L(50), s = L(50), c = a(() => ({
			"--mc-mx": `${o.value}%`,
			"--mc-my": `${s.value}%`
		}));
		function u(e) {
			let t = i.value;
			if (!t) return;
			let n = t.getBoundingClientRect();
			o.value = (e.clientX - n.left) / n.width * 100, s.value = (e.clientY - n.top) / n.height * 100;
		}
		function d(e) {
			n.disabled || n.loading ? (e.preventDefault(), e.stopPropagation()) : r("click", e);
		}
		let f = a(() => Z("mc-button", `mc-button--${n.variant}`, `mc-button--${n.color}`, `mc-button--${n.size}`, `mc-button--${n.shape}`, `mc-button--fx-${n.effect}`, {
			"mc-liquid-glass": n.variant === "liquid",
			"mc-liquid-glass--liquid": n.variant === "liquid",
			"mc-liquid-glass--layers": n.variant === "liquid",
			"mc-recipe-panel": n.variant === "glass",
			"is-disabled": n.disabled,
			"is-loading": n.loading,
			"is-block": n.block
		}, n.customClass));
		return (t, n) => e.href ? (P(), l("a", {
			key: 0,
			ref_key: "root",
			ref: i,
			class: D(f.value),
			href: e.disabled || e.loading ? void 0 : e.href,
			tabindex: e.disabled || e.loading ? -1 : void 0,
			"aria-disabled": e.disabled || e.loading || void 0,
			"aria-busy": e.loading || void 0,
			onClick: d,
			onMousemove: u
		}, [m(Wr, {
			loading: e.loading,
			"icon-left": e.iconLeft,
			"icon-right": e.iconRight,
			glow: c.value,
			material: e.variant === "liquid" ? "liquid" : e.variant === "glass" ? "glass" : ""
		}, {
			default: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, [
			"loading",
			"icon-left",
			"icon-right",
			"glow",
			"material"
		])], 42, Gr)) : (P(), l("button", {
			key: 1,
			ref_key: "root",
			ref: i,
			class: D(f.value),
			type: e.type,
			disabled: e.disabled || e.loading,
			"aria-busy": e.loading || void 0,
			onClick: d,
			onMousemove: u
		}, [m(Wr, {
			loading: e.loading,
			"icon-left": e.iconLeft,
			"icon-right": e.iconRight,
			glow: c.value,
			material: e.variant === "liquid" ? "liquid" : e.variant === "glass" ? "glass" : ""
		}, {
			default: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, [
			"loading",
			"icon-left",
			"icon-right",
			"glow",
			"material"
		])], 42, Kr));
	}
}), [["__scopeId", "data-v-6e545067"]]), Jr = { class: "mc-calendar__header" }, Yr = ["disabled", "aria-label"], Xr = { class: "mc-calendar__title mc-sheen-sweep" }, Zr = ["disabled", "aria-label"], Qr = ["disabled"], $r = {
	key: 0,
	class: "mc-calendar__grid"
}, ei = {
	key: 0,
	class: "mc-calendar__week-num mc-calendar__week-num--head"
}, ti = {
	key: 0,
	class: "mc-calendar__week-num"
}, ni = [
	"disabled",
	"aria-label",
	"aria-pressed",
	"onClick"
], ri = { class: "mc-calendar__day-num" }, ii = {
	key: 0,
	class: "mc-calendar__dots",
	"aria-hidden": "true"
}, ai = {
	key: 1,
	class: "mc-calendar__day-label"
}, oi = {
	key: 1,
	class: "mc-calendar__week"
}, si = { class: "mc-calendar__week-head" }, ci = ["onClick"], li = { class: "mc-calendar__day-head-name" }, ui = { class: "mc-calendar__day-head-num" }, di = { class: "mc-calendar__week-body" }, fi = { class: "mc-calendar__hours mc-recipe-well" }, pi = [
	"aria-label",
	"onClick",
	"onKeydown"
], mi = 40, hi = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiCalendar",
	__name: "Calendar",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: null },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:month",
		"select",
		"month-change"
	], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = K(e, "modelValue");
		function d(e) {
			if (e == null || e === "") return null;
			if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
			let t = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2}))?/.exec(e);
			if (t) return new Date(Number(t[1]), Number(t[2]) - 1, Number(t[3]), Number(t[4] ?? 0), Number(t[5] ?? 0));
			let n = new Date(e);
			return Number.isNaN(n.getTime()) ? null : n;
		}
		function f(e) {
			return `${e.getFullYear()}-${`${e.getMonth() + 1}`.padStart(2, "0")}-${`${e.getDate()}`.padStart(2, "0")}`;
		}
		function p(e, t) {
			return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
		}
		function h(e) {
			try {
				let t = new Intl.Locale(e).weekInfo?.firstDay;
				if (typeof t == "number") return t % 7;
			} catch {}
			return 1;
		}
		function g(e) {
			let t = new Date(e.getFullYear(), e.getMonth(), e.getDate()), n = (t.getDay() + 6) % 7;
			t.setDate(t.getDate() - n + 3);
			let r = new Date(t.getFullYear(), 0, 4), i = (r.getDay() + 6) % 7;
			return r.setDate(r.getDate() - i + 3), 1 + Math.round((t.getTime() - r.getTime()) / 6048e5);
		}
		let _ = /* @__PURE__ */ new Date(), v = L(null);
		q(() => s.value, (e) => {
			v.value = d(e);
		}, { immediate: !0 });
		let y = L(null);
		q(() => r.month, (e) => {
			y.value = d(e);
		}, { immediate: !0 });
		let b = a(() => v.value), x = a(() => y.value ?? b.value ?? _), S = a(() => r.locale || "en-US"), C = a(() => {
			try {
				return new Intl.DateTimeFormat(S.value, {
					month: "long",
					year: "numeric"
				}).format(x.value);
			} catch {
				return `${x.value.getFullYear()}/${x.value.getMonth() + 1}`;
			}
		}), w = a(() => {
			let e = [], t = h(S.value);
			try {
				let n = new Intl.DateTimeFormat(S.value, { weekday: "short" });
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
		function T(e) {
			try {
				return new Intl.DateTimeFormat(S.value, { weekday: "short" }).format(e);
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
		function E(e) {
			try {
				return new Intl.DateTimeFormat(S.value, {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				}).format(e);
			} catch {
				return f(e);
			}
		}
		let O = a(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of r.events) {
				let n = d(t.date);
				if (!n) continue;
				let r = f(n), i = e.get(r);
				i ? i.push(t) : e.set(r, [t]);
			}
			return e;
		});
		function A(e) {
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
				let { hour: r, minute: i } = A(t);
				return {
					key: `${e}-${n}`,
					label: t.label ?? "",
					color: t.color,
					top: (r + i / 60) * mi,
					height: mi * .5
				};
			});
		}
		let ee = a(() => {
			let e = x.value, t = e.getFullYear(), n = e.getMonth(), r = (new Date(t, n, 1).getDay() - h(S.value) + 7) % 7, i = [];
			for (let e = 0; e < 42; e += 1) {
				let a = new Date(t, n, 1 - r + e), o = f(a);
				i.push({
					date: a,
					key: o,
					day: a.getDate(),
					inMonth: a.getMonth() === n,
					isToday: p(a, _),
					isSelected: b.value ? p(a, b.value) : !1,
					events: O.value.get(o) ?? [],
					weekNumber: g(a)
				});
			}
			return i;
		}), M = a(() => {
			let e = b.value ?? x.value, t = new Date(e.getFullYear(), e.getMonth(), e.getDate()), n = (t.getDay() - h(S.value) + 7) % 7;
			t.setDate(t.getDate() - n);
			let r = [];
			for (let e = 0; e < 7; e += 1) {
				let n = new Date(t.getFullYear(), t.getMonth(), t.getDate() + e), i = f(n);
				r.push({
					date: n,
					key: i,
					day: n.getDate(),
					isToday: p(n, _),
					isSelected: b.value ? p(n, b.value) : !1,
					events: O.value.get(i) ?? []
				});
			}
			return r;
		}), N = Array.from({ length: 24 }, (e, t) => t);
		function F(e) {
			return `${`${e}`.padStart(2, "0")}:00`;
		}
		function I(e) {
			if (r.disabled) return;
			let t = x.value, n = r.mode === "week" ? new Date(t.getFullYear(), t.getMonth(), t.getDate() + e * 7) : new Date(t.getFullYear(), t.getMonth() + e, 1);
			y.value = n, o("update:month", n), o("month-change", n);
		}
		function B() {
			if (r.disabled) return;
			let e = /* @__PURE__ */ new Date();
			v.value = e, y.value = new Date(e.getFullYear(), e.getMonth(), 1), s.value = e, o("update:month", y.value), o("select", e);
		}
		function V(e) {
			r.disabled || (v.value = e, s.value = e, o("select", e));
		}
		let U = a(() => Z("mc-calendar", "mc-recipe-sheet", "mc-grain-overlay", `mc-calendar--${r.mode}`, {
			"has-week-numbers": r.showWeekNumber,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (P(), l("div", { class: D(U.value) }, [
			u("header", Jr, [
				u("button", {
					type: "button",
					class: "mc-calendar__nav",
					disabled: e.disabled,
					"aria-label": e.mode === "week" ? W(i).calendar?.previousWeek ?? "Previous week" : W(i).calendar?.previousMonth ?? "Previous month",
					onClick: r[0] || (r[0] = (e) => I(-1))
				}, [m($, {
					name: "chevron-left",
					size: 16,
					"stroke-width": 2.2
				})], 8, Yr),
				u("span", Xr, H(C.value), 1),
				u("button", {
					type: "button",
					class: "mc-calendar__nav",
					disabled: e.disabled,
					"aria-label": e.mode === "week" ? W(i).calendar?.nextWeek ?? "Next week" : W(i).calendar?.nextMonth ?? "Next month",
					onClick: r[1] || (r[1] = (e) => I(1))
				}, [m($, {
					name: "chevron-right",
					size: 16,
					"stroke-width": 2.2
				})], 8, Zr),
				u("button", {
					type: "button",
					class: "mc-calendar__today",
					disabled: e.disabled,
					onClick: B
				}, " Today ", 8, Qr)
			]),
			e.mode === "month" ? (P(), l("div", $r, [
				e.showWeekNumber ? (P(), l("div", ei, " # ")) : c("", !0),
				(P(!0), l(t, null, R(w.value, (e, t) => (P(), l("div", {
					key: `wd-${t}`,
					class: "mc-calendar__weekday"
				}, H(e), 1))), 128)),
				(P(!0), l(t, null, R(ee.value, (n, r) => (P(), l(t, { key: n.key }, [e.showWeekNumber && r % 7 == 0 ? (P(), l("div", ti, H(n.weekNumber), 1)) : c("", !0), u("button", {
					type: "button",
					class: D(["mc-calendar__day", {
						"is-outside": !n.inMonth,
						"is-today": n.isToday,
						"is-selected": n.isSelected,
						"has-events": n.events.length > 0,
						"mc-aurora-inset": n.isSelected
					}]),
					disabled: e.disabled,
					"aria-label": E(n.date),
					"aria-pressed": n.isSelected,
					onClick: (e) => V(n.date)
				}, [
					u("span", ri, H(n.day), 1),
					n.events.length ? (P(), l("span", ii, [(P(!0), l(t, null, R(n.events.slice(0, 3), (e, t) => (P(), l("span", {
						key: t,
						class: "mc-calendar__dot",
						style: k(e.color ? { "--mc-calendar-color": e.color } : void 0)
					}, null, 4))), 128))])) : c("", !0),
					n.events.length && n.events[0]?.label ? (P(), l("span", ai, H(n.events[0].label), 1)) : c("", !0)
				], 10, ni)], 64))), 128))
			])) : (P(), l("div", oi, [u("div", si, [r[2] || (r[2] = u("div", { class: "mc-calendar__gutter" }, null, -1)), (P(!0), l(t, null, R(M.value, (e) => (P(), l("button", {
				key: e.key,
				type: "button",
				class: D(["mc-calendar__day-head", {
					"is-today": e.isToday,
					"is-selected": e.isSelected
				}]),
				onClick: (t) => V(e.date)
			}, [u("span", li, H(T(e.date)), 1), u("span", ui, H(e.day), 1)], 10, ci))), 128))]), u("div", di, [u("div", fi, [(P(!0), l(t, null, R(W(N), (e) => (P(), l("span", {
				key: e,
				class: "mc-calendar__hour"
			}, H(F(e)), 1))), 128))]), (P(!0), l(t, null, R(M.value, (e) => (P(), l("div", {
				key: e.key,
				class: D(["mc-calendar__col", {
					"is-today": e.isToday,
					"is-selected": e.isSelected
				}]),
				role: "button",
				tabindex: "0",
				"aria-label": E(e.date),
				onClick: (t) => V(e.date),
				onKeydown: [Y(X((t) => V(e.date), ["prevent"]), ["enter"]), Y(X((t) => V(e.date), ["prevent"]), ["space"])]
			}, [(P(!0), l(t, null, R(W(N), (e) => (P(), l("span", {
				key: e,
				class: "mc-calendar__slot"
			}))), 128)), (P(!0), l(t, null, R(j(e.key), (e) => (P(), l("span", {
				key: e.key,
				class: "mc-calendar__event",
				style: k({
					top: `${e.top}px`,
					height: `${e.height}px`,
					...e.color ? { "--mc-calendar-color": e.color } : {}
				})
			}, H(e.label), 5))), 128))], 42, pi))), 128))])])),
			z(n.$slots, "default", {}, void 0, !0)
		], 2));
	}
}), [["__scopeId", "data-v-11cca52e"]]), gi = ["tabindex", "aria-disabled"], _i = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, vi = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, yi = {
	key: 2,
	class: "mc-card__sheen",
	"aria-hidden": "true"
}, bi = {
	key: 3,
	class: "mc-card__grain",
	"aria-hidden": "true"
}, xi = {
	key: 4,
	class: "mc-card__corner"
}, Si = {
	key: 5,
	class: "mc-card__media"
}, Ci = {
	key: 6,
	class: "mc-card__header"
}, wi = {
	key: 0,
	class: "mc-card__header-main"
}, Ti = {
	key: 1,
	class: "mc-card__extra"
}, Ei = { class: "mc-card__body" }, Di = {
	key: 7,
	class: "mc-card__footer"
}, Oi = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(null);
		function r(e) {
			t.focusable && !t.disabled && Et(e, n.value);
		}
		let i = a(() => Z("mc-card", `mc-card--${t.variant}`, `mc-card--pad-${t.padding}`, {
			"mc-liquid-glass": t.variant === "liquid",
			"mc-liquid-glass--liquid": t.variant === "liquid",
			"mc-liquid-glass--layers": t.variant === "liquid",
			"mc-recipe-sheet": t.variant === "solid",
			"is-hoverable": t.hoverable,
			"is-sheen": t.sheen,
			"is-tilt": t.tilt,
			"is-grain": t.grain,
			"is-highlight": t.highlight,
			"is-blob": t.blob,
			"is-aurora": t.aurora,
			"is-disabled": t.disabled
		}, t.customClass));
		return (t, a) => (P(), l("section", {
			ref_key: "root",
			ref: n,
			class: D(i.value),
			tabindex: e.focusable ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: X(r, ["self"])
		}, [
			e.variant === "liquid" ? (P(), l("span", _i)) : c("", !0),
			a[0] || (a[0] = u("span", {
				class: "mc-card__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.variant === "liquid" ? (P(), l("span", vi)) : c("", !0),
			e.sheen ? (P(), l("span", yi)) : c("", !0),
			e.grain ? (P(), l("span", bi)) : c("", !0),
			t.$slots.corner ? (P(), l("div", xi, [z(t.$slots, "corner", {}, void 0, !0)])) : c("", !0),
			t.$slots.media ? (P(), l("div", Si, [z(t.$slots, "media", {}, void 0, !0)])) : c("", !0),
			t.$slots.header || t.$slots.extra ? (P(), l("header", Ci, [t.$slots.header ? (P(), l("div", wi, [z(t.$slots, "header", {}, void 0, !0)])) : c("", !0), t.$slots.extra ? (P(), l("div", Ti, [z(t.$slots, "extra", {}, void 0, !0)])) : c("", !0)])) : c("", !0),
			u("div", Ei, [z(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.footer ? (P(), l("footer", Di, [z(t.$slots, "footer", {}, void 0, !0)])) : c("", !0)
		], 42, gi));
	}
}), [["__scopeId", "data-v-8642e3b5"]]), ki = { class: "mc-carousel__viewport" }, Ai = ["src", "alt"], ji = {
	key: 1,
	class: "mc-carousel__caption mc-recipe-panel"
}, Mi = { class: "mc-carousel__caption-inner" }, Ni = {
	key: 0,
	class: "mc-carousel__tag"
}, Pi = {
	class: "mc-carousel__title",
	"data-mc-type": "title"
}, Fi = {
	key: 1,
	class: "mc-carousel__desc"
}, Ii = ["href"], Li = {
	class: "mc-visually-hidden",
	"aria-live": "polite"
}, Ri = ["aria-label", "disabled"], zi = ["aria-label", "disabled"], Bi = {
	key: 2,
	class: "mc-carousel__dots"
}, Vi = [
	"aria-label",
	"aria-current",
	"onClick"
], Hi = {
	key: 3,
	class: "mc-carousel__fraction"
}, Ui = {
	key: 4,
	class: "mc-carousel__numbers"
}, Wi = ["aria-label", "onClick"], Gi = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiCarousel",
	__name: "Carousel",
	props: /*@__PURE__*/ w({
		items: {},
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
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = K(e, "modelValue"), d = L(s.value), f = a(() => r.items?.length ?? 0), h = L(!1), g = L(!1), _ = L(!1), v = L(0), y = L(0), b = L(null), x = null;
		q(() => s.value, (e) => {
			typeof e == "number" && e !== d.value && (d.value = e);
		}), q(() => r.autoplay, () => S()), q(f, () => S());
		function S() {
			C(), !(!r.autoplay || r.interval <= 0 || f.value < 2) && (x = setInterval(() => T(), r.interval));
		}
		function C() {
			x && (clearInterval(x), x = null);
		}
		function w(e) {
			let t = f.value;
			if (t === 0) return;
			let n = e;
			n = r.loop ? (e % t + t) % t : Math.min(Math.max(e, 0), t - 1), n !== d.value && (d.value = n, s.value = n, o("change", n));
		}
		function T() {
			f.value && (!r.loop && d.value >= f.value - 1 || w(d.value + 1));
		}
		function E() {
			f.value && (!r.loop && d.value <= 0 || w(d.value - 1));
		}
		function O(e) {
			!r.draggable || f.value < 2 || e.button === 0 && (e.target?.closest("button, a") || (g.value = !0, v.value = e.clientX, y.value = 0, C(), e.currentTarget.setPointerCapture?.(e.pointerId)));
		}
		function j(e) {
			if (!g.value) return;
			let t = b.value;
			if (t) {
				let n = t.getBoundingClientRect();
				if (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom) {
					M(e);
					return;
				}
			}
			y.value = e.clientX - v.value;
		}
		function M(e) {
			g.value && (g.value = !1, Math.abs(y.value) > 60 && (y.value > 0 ? E() : T()), y.value = 0, e && e.currentTarget.releasePointerCapture?.(e.pointerId), ne());
		}
		function N() {
			g.value && (g.value = !1, y.value = 0, ne());
		}
		function F(e) {
			e.key === "ArrowRight" ? T() : e.key === "ArrowLeft" && E();
		}
		let I = a(() => {
			if (r.effect === "fade") return {};
			let e = -d.value * 100, t = y.value;
			return r.direction === "vertical" ? { transform: `translate3d(0, calc(${e}% + ${t}px), 0)` } : { transform: `translate3d(calc(${e}% + ${t}px), 0, 0)` };
		}), B = a(() => r.items?.[d.value]), V = a(() => {
			let e = B.value, t = `Slide ${d.value + 1} of ${f.value}`;
			return e?.title ? `${t}: ${e.title}` : t;
		}), U = a(() => !r.loop && d.value === 0), G = a(() => !r.loop && d.value >= f.value - 1);
		function te() {
			return r.pauseOnHover && (h.value || g.value || _.value);
		}
		function ne() {
			r.pauseOnHover && !te() && S();
		}
		function re() {
			h.value = !0, r.pauseOnHover && C();
		}
		function J() {
			h.value = !1, ne();
		}
		function ie() {
			_.value = !0, r.pauseOnHover && C();
		}
		function Y() {
			_.value = !1, ne();
		}
		return ee(S), A(C), (n, r) => (P(), l("div", {
			ref_key: "root",
			ref: b,
			class: D(["mc-carousel", [W(Z)(`mc-carousel--${e.effect}`, `mc-carousel--${e.direction}`, { "is-dragging": g.value }, e.customClass)]]),
			style: k({ height: typeof e.height == "number" ? `${e.height}px` : e.height }),
			tabindex: "0",
			role: "region",
			"aria-roledescription": "carousel",
			onMouseenter: re,
			onMouseleave: J,
			onFocusin: ie,
			onFocusout: Y,
			onKeydown: F,
			onPointerdown: O,
			onPointermove: j,
			onPointerup: M,
			onPointercancel: N
		}, [
			u("div", ki, [u("div", {
				class: "mc-carousel__track",
				style: k(I.value)
			}, [z(n.$slots, "default", {}, () => [(P(!0), l(t, null, R(e.items, (t, n) => (P(), l("div", {
				key: n,
				class: D(["mc-carousel__slide", {
					"is-active": n === d.value,
					"is-ken-burns": e.kenBurns && n === d.value
				}])
			}, [
				t.src ? (P(), l("img", {
					key: 0,
					class: "mc-carousel__img",
					src: t.src,
					alt: t.title ?? ""
				}, null, 8, Ai)) : c("", !0),
				r[2] || (r[2] = u("div", { class: "mc-carousel__veil" }, null, -1)),
				e.caption && t.title ? (P(), l("div", ji, [r[1] || (r[1] = u("span", {
					class: "mc-carousel__aurora",
					"aria-hidden": "true"
				}, null, -1)), u("div", Mi, [
					t.tag ? (P(), l("span", Ni, H(t.tag), 1)) : c("", !0),
					u("h3", Pi, H(t.title), 1),
					t.description ? (P(), l("p", Fi, H(t.description), 1)) : c("", !0),
					t.link ? (P(), l("a", {
						key: 2,
						class: "mc-carousel__cta",
						href: t.link
					}, [r[0] || (r[0] = p(" Read more ", -1)), m($, {
						name: "arrow-right",
						size: 15
					})], 8, Ii)) : c("", !0)
				])])) : c("", !0)
			], 2))), 128))], !0)], 4)]),
			u("p", Li, H(V.value), 1),
			e.indicator !== "none" && f.value > 1 ? (P(), l(t, { key: 0 }, [
				e.indicator === "arrows" ? (P(), l("button", {
					key: 0,
					class: "mc-carousel__nav mc-recipe-panel is-prev",
					type: "button",
					"aria-label": W(i).carousel?.previous ?? "Previous",
					disabled: U.value,
					onClick: E
				}, [m($, {
					name: "chevron-left",
					size: 18
				})], 8, Ri)) : c("", !0),
				e.indicator === "arrows" ? (P(), l("button", {
					key: 1,
					class: "mc-carousel__nav mc-recipe-panel is-next",
					type: "button",
					"aria-label": W(i).carousel?.next ?? "Next",
					disabled: G.value,
					onClick: T
				}, [m($, {
					name: "chevron-right",
					size: 18
				})], 8, zi)) : c("", !0),
				e.indicator === "dots" ? (P(), l("div", Bi, [(P(!0), l(t, null, R(e.items, (e, t) => (P(), l("button", {
					key: t,
					class: D(["mc-carousel__dot", { "is-active": t === d.value }]),
					type: "button",
					"aria-label": `Go to slide ${t + 1}`,
					"aria-current": t === d.value,
					onClick: (e) => w(t)
				}, [...r[3] || (r[3] = [u("span", { class: "mc-carousel__dot-fill" }, null, -1)])], 10, Vi))), 128))])) : c("", !0),
				e.indicator === "fraction" ? (P(), l("div", Hi, [
					u("strong", null, H(String(d.value + 1).padStart(2, "0")), 1),
					r[4] || (r[4] = u("span", null, "/", -1)),
					u("span", null, H(String(f.value).padStart(2, "0")), 1)
				])) : c("", !0),
				e.indicator === "numbers" ? (P(), l("div", Ui, [(P(!0), l(t, null, R(e.items, (e, t) => (P(), l("button", {
					key: t,
					class: D(["mc-carousel__number", { "is-active": t === d.value }]),
					type: "button",
					"aria-label": `Go to slide ${t + 1}`,
					onClick: (e) => w(t)
				}, H(String(t + 1).padStart(2, "0")), 11, Wi))), 128))])) : c("", !0)
			], 64)) : c("", !0)
		], 38));
	}
}), [["__scopeId", "data-v-41be09ba"]]), Ki = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant"
], qi = {
	key: 0,
	class: "mc-cascader__tags"
}, Ji = { class: "mc-cascader__tag-label" }, Yi = ["aria-label", "onClick"], Xi = { class: "mc-cascader__affix" }, Zi = ["aria-label"], Qi = ["id", "aria-multiselectable"], $i = {
	key: 0,
	class: "mc-cascader__breadcrumb"
}, ea = { class: "mc-cascader__crumb" }, ta = [
	"id",
	"aria-selected",
	"aria-disabled",
	"disabled",
	"onClick",
	"onMouseenter"
], na = { class: "mc-cascader__option-label" }, ra = {
	key: 0,
	class: "mc-cascader__empty"
}, ia = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiCascader",
	__name: "Cascader",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: o }) {
		let d = e, f = o, p = K(e, "modelValue"), h = rn(), g = Ln("mc-cascader"), _ = Hn(), v = L(null), y = L(null), b = L(d.open), { isTop: x } = Pn({ active: b }), { style: S, transformOrigin: C, update: w, startAutoUpdate: O, stopAutoUpdate: j } = Cn(v, y, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: b })
		}), M = L([]), N = L(0), F = L(0);
		q(() => d.open, (e) => {
			b.value = e, e ? E(() => {
				w(), O();
			}) : j();
		});
		function I(e, t) {
			let n = [], r = e;
			for (let e of t) {
				let t = r.find((t) => t.value === e);
				if (!t) break;
				n.push(t), r = t.children ?? [];
			}
			return n;
		}
		let z = a(() => d.multiple ? [] : I(d.options, p.value ?? [])), B = a(() => d.multiple ? (p.value ?? []).map((e) => I(d.options, e ?? [])) : []), V = a(() => (d.multiple ? B.value.length : z.value.length) > 0), U = a(() => {
			if (d.multiple) return "";
			let e = z.value;
			return e.length ? d.showAllLevels ? e.map((e) => e.label).join("  /  ") : e[e.length - 1].label : "";
		}), G = a(() => {
			let e = [d.options];
			for (let t of M.value) {
				if (!t.children?.length) break;
				e.push(t.children);
			}
			return e;
		}), te = a(() => M.value.map((e) => e.label));
		function ne(e, t) {
			return `${g}-option-${e}-${t}`;
		}
		let re = a(() => {
			if (b.value && G.value[N.value]?.[F.value]) return ne(N.value, F.value);
		});
		function ie(e) {
			if (!(d.disabled && e) && b.value !== e) {
				if (b.value = e, f("update:open", e), e) {
					f("open");
					let e = d.multiple ? [] : z.value;
					M.value = e.slice(0, Math.max(e.length - 1, 0)), N.value = Math.max(M.value.length, 0), F.value = 0, E(() => {
						w(), O();
					});
				} else f("close"), j();
			}
		}
		function Y() {
			ie(!b.value);
		}
		function ae(e) {
			if (!b.value) return;
			let t = e.target;
			t && (v.value?.contains(t) || y.value?.contains(t) || ie(!1));
		}
		ee(() => document.addEventListener("mousedown", ae)), A(() => {
			document.removeEventListener("mousedown", ae), j();
		});
		function oe(e) {
			p.value = e, f("change", e);
		}
		function se(e, t) {
			if (e.disabled) return;
			let n = M.value.slice(0, t).concat(e);
			if (e.children?.length && !d.changeOnSelect) {
				M.value = n, N.value = t + 1, F.value = 0;
				return;
			}
			let r = n.map((e) => e.value);
			if (d.multiple) {
				let e = p.value ?? [];
				e.some((e) => e.length === r.length && e.every((e, t) => e === r[t])) || oe(e.concat([r]));
			} else oe(r), ie(!1);
		}
		function ce(e, t) {
			!e.disabled && e.children?.length && (M.value = M.value.slice(0, t).concat(e), N.value = t + 1, F.value = 0);
		}
		function le(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function ue(e) {
			oe((p.value ?? []).filter((t, n) => n !== e));
		}
		function de() {
			oe([]);
		}
		function fe(e) {
			b.value ? pe(e) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), ie(!0));
		}
		function pe(e) {
			if (!x()) return;
			let t = G.value[N.value] ?? [];
			switch (e.key) {
				case "Escape":
					e.stopPropagation();
					{
						let e = y.value?.contains(document.activeElement) ?? !1;
						ie(!1), e && v.value?.focus({ preventScroll: !0 });
					}
					break;
				case "ArrowDown":
					e.preventDefault(), F.value = Math.min(F.value + 1, t.length - 1);
					break;
				case "ArrowUp":
					e.preventDefault(), F.value = Math.max(F.value - 1, 0);
					break;
				case "ArrowRight": {
					e.preventDefault();
					let n = t[F.value];
					n?.children?.length && ce(n, N.value);
					break;
				}
				case "ArrowLeft":
					e.preventDefault(), N.value > 0 && (--N.value, M.value = M.value.slice(0, N.value), F.value = 0);
					break;
				case "Enter":
				case " ": {
					e.preventDefault();
					let n = t[F.value];
					n && se(n, N.value);
					break;
				}
			}
		}
		function me(e) {
			if (d.multiple) return (p.value ?? []).some((t) => t.length && t[t.length - 1] === e.value);
			let t = z.value;
			return t.length > 0 && t[t.length - 1].value === e.value;
		}
		function he(e, t) {
			return M.value[t]?.value === e.value;
		}
		let ge = a(() => typeof d.teleport == "string" ? d.teleport : "body"), _e = a(() => Z("mc-cascader", `mc-cascader--${d.variant}`, `mc-cascader--${d.size}`, {
			"is-open": b.value,
			"is-disabled": d.disabled,
			"is-empty": !V.value,
			"is-multiple": d.multiple
		}, d.customClass)), ve = a(() => ({ "mc-recipe-well": d.variant !== "ghost" }));
		return (a, o) => (P(), l("div", { class: D(_e.value) }, [u("button", {
			ref_key: "trigger",
			ref: v,
			type: "button",
			class: D(["mc-cascader__trigger mc-sheen-sweep", ve.value]),
			disabled: e.disabled,
			"aria-disabled": e.disabled || void 0,
			"aria-expanded": b.value,
			"aria-haspopup": "listbox",
			"aria-controls": W(g),
			"aria-activedescendant": re.value,
			onClick: Y,
			onKeydown: fe
		}, [
			o[0] || (o[0] = u("span", {
				class: "mc-cascader__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			d.multiple && B.value.length ? (P(), l("span", qi, [(P(!0), l(t, null, R(B.value, (e, t) => (P(), l("span", {
				key: `${e.map((e) => e.value).join("-")}-${t}`,
				class: "mc-cascader__tag"
			}, [u("span", Ji, H(e.map((e) => e.label).join(" / ")), 1), u("span", {
				class: "mc-cascader__tag-close",
				role: "button",
				tabindex: "-1",
				"aria-label": `remove ${e.map((e) => e.label).join(" / ")}`,
				onClick: X((e) => ue(t), ["stop"])
			}, [m($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, Yi)]))), 128))])) : (P(), l("span", {
				key: 1,
				class: D(["mc-cascader__value", { "is-placeholder": !V.value }])
			}, H(V.value ? U.value : W(h).select.placeholder || e.placeholder), 3)),
			u("span", Xi, [e.clearable && V.value ? (P(), l("span", {
				key: 0,
				class: "mc-cascader__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": W(h).cascader?.clear ?? "clear",
				onClick: X(de, ["stop"])
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, Zi)) : c("", !0), m($, {
				name: "chevron-down",
				size: 14,
				class: D(["mc-cascader__caret", { "is-spin": b.value }])
			}, null, 8, ["class"])])
		], 42, Ki), (P(), s(n, {
			to: ge.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [b.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: y,
				class: "mc-cascader__panel",
				style: W(S)
			}, W(_), {
				id: W(g),
				role: "listbox",
				"aria-multiselectable": d.multiple || void 0,
				onKeydown: pe
			}), [u("div", {
				class: "mc-cascader__inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(C) })
			}, [te.value.length ? (P(), l("div", $i, [(P(!0), l(t, null, R(te.value, (e, n) => (P(), l(t, { key: `${e}-${n}` }, [n ? (P(), s($, {
				key: 0,
				name: "chevron-right",
				size: 11,
				class: "mc-cascader__crumb-sep"
			})) : c("", !0), u("span", ea, H(e), 1)], 64))), 128))])) : c("", !0), m(i, {
				tag: "div",
				class: "mc-cascader__columns",
				name: "mc-cascader-col"
			}, {
				default: J(() => [(P(!0), l(t, null, R(G.value, (e, n) => (P(), l("div", {
					key: n,
					class: "mc-cascader__column",
					role: "presentation"
				}, [(P(!0), l(t, null, R(e, (e, t) => (P(), l("button", {
					key: String(e.value),
					id: ne(n, t),
					type: "button",
					class: D(["mc-cascader__option", {
						"is-selected": me(e),
						"is-on-path": he(e, n),
						"is-disabled": e.disabled,
						"is-highlight": n === N.value && t === F.value
					}]),
					role: "option",
					"aria-selected": me(e),
					"aria-disabled": e.disabled || void 0,
					disabled: e.disabled,
					onClick: (t) => se(e, n),
					onMouseenter: (t) => ce(e, n),
					onMousemove: le
				}, [u("span", na, H(e.label), 1), e.children?.length ? (P(), s($, {
					key: 0,
					name: "chevron-right",
					size: 13,
					class: "mc-cascader__option-arrow"
				})) : c("", !0)], 42, ta))), 128)), e.length ? c("", !0) : (P(), l("p", ra, "—"))]))), 128))]),
				_: 1
			})], 4)], 16, Qi)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-c6df3a73"]]), aa = [
	"var(--mc-chart-1)",
	"var(--mc-chart-2)",
	"var(--mc-chart-3)",
	"var(--mc-chart-4)",
	"var(--mc-chart-5)",
	"var(--mc-chart-6)"
], oa = .02, sa = /[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60]/;
function ca(e) {
	return sa.test(e) ? 11 : 6.16;
}
function la(e) {
	let t = 0;
	for (let n of e) t += ca(n);
	return t;
}
function ua(e, t) {
	if (t <= 0) return "";
	if (la(e) <= t) return e;
	let n = t - ca("…"), r = 0, i = "";
	for (let t of e) {
		let e = ca(t);
		if (r + e > n) break;
		i += t, r += e;
	}
	return i ? `${i}…` : "…";
}
function da(e) {
	return Number.isFinite(e) ? Math.abs(e) >= 1e3 ? at(e) : String(Number.isInteger(e) ? e : Number(e.toFixed(2))) : "—";
}
function fa(e, t, n) {
	if (n) try {
		return n(e, t);
	} catch {}
	return Number.isFinite(e) ? Math.abs(e) < 1e3 ? String(Number.isInteger(e) ? e : Number(e.toFixed(2))) : at(e) : "—";
}
function pa(e) {
	return Array.isArray(e) ? e ?? [] : e && Array.isArray(e.series) ? e.series : [];
}
function ma(e) {
	return Array.isArray(e) ? [] : e?.labels ?? [];
}
function ha(e) {
	return e.map((e, t) => ({
		name: e?.name || `系列 ${t + 1}`,
		data: Array.isArray(e?.data) ? e.data.map((e) => typeof e == "number" && Number.isFinite(e) ? e : 0) : [],
		color: e?.color || aa[t % aa.length],
		area: !!e?.area,
		index: t
	}));
}
function ga(e) {
	return e.reduce((e, t) => Math.max(e, t.data.length), 0);
}
function _a(e, t) {
	return Array.from({ length: e }, (e, n) => {
		let r = t[n];
		return String(r == null || r === "" ? n + 1 : r);
	});
}
function va(e, t) {
	if (!(e > 0)) return 1;
	let n = Math.floor(Math.log10(e)), r = e / 10 ** n, i;
	return i = t ? r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10 : r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10, i * 10 ** n;
}
function ya(e) {
	let { values: t, isBar: n, innerHeight: r } = e, i = t.length ? Math.min(...t) : 0, a = t.length ? Math.max(...t) : 1;
	n && (i = Math.min(0, i)), i === a && (a = i + Math.abs(i || 1) * .5);
	let o = ot(Math.floor(r / 46), 2, 6), s = va(va(a - i, !1) / Math.max(1, o - 1), !0), c = Math.floor(i / s) * s, l = Math.ceil(a / s) * s, u = Math.max(1, Math.round((l - c) / s)), d = [];
	for (let e = 0; e <= u; e++) d.push(Number((c + e * s).toPrecision(12)));
	return {
		min: c,
		max: l,
		step: s,
		ticks: d
	};
}
function ba(e, t) {
	let n = [];
	for (let r of e) for (let e of t) {
		let t = r.data[e.index];
		typeof t == "number" && Number.isFinite(t) && n.push(t);
	}
	return n;
}
function xa(e) {
	let { yAxis: t, isCartesian: n, ticks: r, width: i } = e;
	if (!t || !n) return 0;
	let a = r.reduce((e, t) => Math.max(e, la(da(t))), 0);
	return Math.min(Math.max(24, a + 12), Math.max(24, i * .4));
}
function Sa(e) {
	return e.xAxis && e.isCartesian ? 24 : 0;
}
function Ca(e) {
	return Math.max(40, e.height - 14 - e.axisBottom - 8);
}
function wa(e) {
	let { width: t, height: n, yGutter: r, axisBottom: i } = e, a = Math.max(60, t), o = Math.max(60, n), s = r;
	return {
		x: s,
		y: 14,
		w: Math.max(20, a - s - 18),
		h: Math.max(20, o - 14 - i - 8)
	};
}
function Ta(e, t, n) {
	let { min: r, max: i } = t, a = i - r || 1;
	return n.y + n.h - (e - r) / a * n.h;
}
function Ea(e, t) {
	let { min: n, max: r } = e;
	return n <= 0 && r >= 0 ? Ta(0, e, t) : n > 0 ? t.y + t.h : t.y;
}
function Da(e, t) {
	return e / Math.max(1, t);
}
function Oa(e) {
	let { categoryIndex: t, visibleCategories: n, plot: r, bandWidth: i, isBar: a } = e, o = Math.max(0, n.findIndex((e) => e.index === t));
	return a ? r.x + i * (o + .5) : n.length <= 1 ? r.x + r.w / 2 : r.x + o / (n.length - 1) * r.w;
}
function ka(e) {
	return e.dataZoom && e.isCartesian && e.categoryCount > 1;
}
function Aa(e) {
	let { zoom: t, showZoom: n, categoryCount: r } = e, i = r;
	if (!n || i <= 1) return {
		start: 0,
		end: Math.max(0, i - 1)
	};
	let a = Math.round(t.start * (i - 1)), o = Math.round(t.end * (i - 1));
	return {
		start: Math.min(a, i - 1),
		end: Math.max(o, a)
	};
}
function ja(e) {
	let { start: t, end: n, labels: r } = e, i = [];
	for (let e = t; e <= n; e++) i.push({
		index: e,
		label: r[e] ?? String(e + 1)
	});
	return i;
}
function Ma(e, t, n) {
	return t === "start" ? {
		...e,
		start: ot(n, 0, e.end - oa)
	} : {
		...e,
		end: ot(n, e.start + oa, 1)
	};
}
function Na(e, t) {
	if (!t) return 0;
	let n = t.getBoundingClientRect();
	return n.width ? ot((e - n.left) / n.width, 0, 1) : 0;
}
//#endregion
//#region src/components/chart/cartesian.ts
function Pa(e) {
	let { activeSeries: t, visibleCategories: n, plot: r, bandWidth: i, isBar: a, scale: o } = e, s = (e) => Oa({
		categoryIndex: e,
		visibleCategories: n,
		plot: r,
		bandWidth: i,
		isBar: a
	}), c = (e) => Ta(e, o, r);
	return t.map((e) => {
		let t = n.map((t) => {
			let n = e.data[t.index] ?? 0;
			return {
				x: s(t.index),
				y: c(n),
				value: n,
				index: t.index
			};
		}), r = t.length ? t.map((e, t) => `${t ? "L" : "M"}${e.x.toFixed(2)} ${e.y.toFixed(2)}`).join(" ") : "", i = 0;
		for (let e = 1; e < t.length; e++) i += Math.hypot(t[e].x - t[e - 1].x, t[e].y - t[e - 1].y);
		return {
			series: e,
			points: t,
			d: r,
			length: Math.max(1, i)
		};
	});
}
function Fa(e) {
	let { type: t, isScatter: n, lineSeries: r, baselineY: i, uid: a } = e, o = t === "area" && !n;
	return r.filter((e) => (o || e.series.area) && e.points.length > 1 && !n).map((e) => {
		let t = e.points[0], n = e.points[e.points.length - 1], r = `${e.d} L${n.x.toFixed(2)} ${i.toFixed(2)} L${t.x.toFixed(2)} ${i.toFixed(2)} Z`;
		return {
			series: e.series,
			d: r,
			gradientId: `${a}-grad-${e.series.index}`
		};
	});
}
function Ia(e) {
	let { activeSeries: t, visibleCategories: n, bandWidth: r, baselineY: i, plotX: a, scale: o, plot: s } = e, c = t, l = n, u = r, d = Math.min(u * .68, 48), f = d / Math.max(1, c.length), p = i, m = [];
	return c.forEach((e, t) => {
		l.forEach((n, r) => {
			let i = e.data[n.index] ?? 0, c = Ta(i, o, s), l = Math.min(c, p), h = Math.max(1, Math.abs(c - p)), g = a + u * r + (u - d) / 2 + t * f;
			m.push({
				key: `${e.index}-${n.index}`,
				x: g + f * .07,
				y: l,
				w: f * .86,
				h,
				value: i,
				series: e,
				index: n.index,
				negative: i < 0
			});
		});
	}), m;
}
function La(e) {
	let { activeSeries: t, visibleCategories: n, plot: r, bandWidth: i, isBar: a, scale: o } = e, s = (e) => Oa({
		categoryIndex: e,
		visibleCategories: n,
		plot: r,
		bandWidth: i,
		isBar: a
	}), c = (e) => Ta(e, o, r);
	return t.flatMap((e) => n.map((t) => {
		let n = e.data[t.index] ?? 0;
		return {
			key: `${e.index}-${t.index}`,
			x: s(t.index),
			y: c(n),
			value: n,
			series: e,
			index: t.index
		};
	}));
}
function Ra(e) {
	let { xAxis: t, cats: n, plotWidth: r, isBar: i, bandWidth: a, width: o, plotBottomY: s, xPosOf: c } = e;
	if (!t || !n.length) return [];
	let l = Math.max(1, Math.floor(r / 56)), u = Math.max(1, Math.ceil(n.length / l)), d = i ? Math.min(a - 6, 80) : 80, f = [];
	return n.forEach((e, t) => {
		if (t % u !== 0) return;
		let n = c(e.index), r = ua(e.label, d), i = la(r), a = "middle", l = n;
		n - i / 2 < 2 ? (a = "start", l = 2) : n + i / 2 > o - 2 && (a = "end", l = o - 2), f.push({
			index: e.index,
			text: r,
			x: l,
			y: s + 14,
			anchor: a
		});
	}), f;
}
//#endregion
//#region src/components/chart/radial.ts
function za(e) {
	let { cats: t, activeSeries: n, plot: r, min: i, max: a } = e, o = r.x + r.w / 2, s = r.y + r.h / 2, c = Math.max(12, Math.min(r.w, r.h) / 2 - 26), l = a - i || 1, u = (e, n) => {
		let r = -Math.PI / 2 + e / Math.max(1, t.length) * Math.PI * 2;
		return {
			x: o + Math.cos(r) * c * n,
			y: s + Math.sin(r) * c * n,
			angle: r
		};
	};
	return {
		cx: o,
		cy: s,
		radius: c,
		rings: Array.from({ length: 4 }, (e, n) => {
			let r = (n + 1) / 4;
			return t.map((e, t) => u(t, r)).map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" ");
		}),
		spokes: t.map((e, t) => {
			let n = u(t, 1);
			return {
				x1: o,
				y1: s,
				x2: n.x,
				y2: n.y
			};
		}),
		series: n.map((e) => {
			let n = t.map((t, n) => {
				let r = e.data[t.index] ?? 0, a = ot((r - i) / l, 0, 1);
				return {
					...u(n, a),
					value: r,
					index: t.index
				};
			});
			return {
				series: e,
				points: n,
				polygon: n.map((e) => `${e.x.toFixed(2)},${e.y.toFixed(2)}`).join(" ")
			};
		}),
		labels: t.map((e, t) => {
			let n = u(t, 1.16), r = Math.cos(n.angle), i = r > .25 ? "start" : r < -.25 ? "end" : "middle";
			return {
				index: e.index,
				text: ua(e.label, 64),
				x: n.x + (i === "start" ? 4 : i === "end" ? -4 : 0),
				y: n.y,
				anchor: i
			};
		})
	};
}
function Ba(e) {
	let { plot: t, isDoughnut: n, innerRadius: r } = e, i = t.x + t.w / 2, a = t.y + t.h / 2, o = Math.max(12, Math.min(t.w, t.h) / 2 - 10);
	return {
		cx: i,
		cy: a,
		r: o,
		inner: n ? o * ot(r, 0, .9) : 0
	};
}
function Va(e) {
	let { seriesList: t, categoryLabels: n, hiddenSlices: r } = e, i = t[0];
	if (!i) return [];
	let a = i.data.reduce((e, t) => e + Math.max(0, t), 0), o = -Math.PI / 2;
	return i.data.map((e, t) => {
		let i = a > 0 ? Math.max(0, e) / a : 0, s = o;
		return o += i * Math.PI * 2, {
			index: t,
			name: String(n[t] ?? String(t + 1)),
			value: e,
			frac: i,
			start: s,
			end: o,
			color: aa[t % aa.length],
			hidden: r.includes(t)
		};
	});
}
function Ha(e, t) {
	let { cx: n, cy: r, r: i, inner: a } = e, o = a > 0 ? (i + a) / 2 : i / 2, s = a > 0 ? i - a : i, c = 2 * Math.PI * o, l = t.length > 1 ? 2 : 0;
	return t.map((e) => {
		let t = Math.max(.5, e.frac * c - l);
		return {
			...e,
			len: t,
			circumference: c,
			strokeRadius: o,
			strokeWidth: s,
			cx: n,
			cy: r,
			rotation: e.start * 180 / Math.PI
		};
	});
}
function Ua(e) {
	let { isDoughnut: t, activeSliceIndex: n, slices: r } = e;
	if (!t) return null;
	if (n !== null) {
		let e = r[n];
		return e ? {
			title: e.name,
			text: `${(e.frac * 100).toFixed(1)}%`
		} : null;
	}
	return {
		title: "合计",
		text: at(r.reduce((e, t) => e + (t.hidden ? 0 : t.value), 0))
	};
}
//#endregion
//#region src/components/chart/chrome.ts
function Wa(e) {
	let t = e;
	return t == null ? [] : typeof t == "number" ? [{ value: t }] : Array.isArray(t) ? t : [t];
}
function Ga(e) {
	let { isPie: t, slices: n, seriesList: r, hiddenSeries: i } = e;
	return t ? n.map((e) => ({
		key: `slice-${e.index}`,
		name: e.name,
		color: e.color,
		visible: !e.hidden,
		index: e.index
	})) : r.map((e) => ({
		key: `series-${e.index}`,
		name: e.name,
		color: e.color,
		visible: !i.includes(e.name),
		index: e.index
	}));
}
function Ka(e) {
	let { yAxis: t, ticks: n, scale: r, plot: i } = e;
	return t ? n.map((e) => ({
		value: e,
		text: da(e),
		y: Ta(e, r, i)
	})) : [];
}
function qa(e) {
	let { isPie: t, activeSliceIndex: n, slices: r, activeIndex: i, categoryLabels: a, activeSeries: o } = e;
	if (t) {
		if (n === null) return [];
		let e = r[n];
		return e ? [{
			series: e.name,
			value: e.value,
			color: e.color,
			label: e.name
		}] : [];
	}
	if (i === null) return [];
	let s = i, c = a[s] ?? "";
	return o.map((e) => ({
		series: e.name,
		value: e.data[s] ?? 0,
		color: e.color,
		label: c
	}));
}
function Ja(e) {
	let { isPie: t, activeSliceIndex: n, slices: r, activeIndex: i, categoryLabels: a } = e;
	if (t) {
		let e = n === null ? null : r[n];
		return e ? e.name : "";
	}
	return i === null ? "" : a[i] ?? "";
}
function Ya(e) {
	let { width: t, height: n, axisBottom: r } = e, i = Math.max(60, t), a = Math.max(60, n) - r - 8, o = Math.max(20, a - 14), s = [
		.42,
		.68,
		.5,
		.86,
		.34,
		.62,
		.46
	], c = i / s.length, l = Math.max(6, c * .42);
	return {
		baseline: a,
		bars: s.map((e, t) => ({
			x: c * (t + .5) - l / 2,
			y: a - o * e,
			w: l,
			h: o * e
		})),
		grids: [
			0,
			.25,
			.5,
			.75,
			1
		].map((e) => 14 + o * e)
	};
}
function Xa(e) {
	let { isPie: t, isRadar: n, activeIndex: r, xPosOf: i, yPosOf: a, plot: o, activeSeries: s, visibleCategories: c, radar: l } = e;
	if (t) return null;
	if (n) {
		if (r === null) return null;
		let e = c.findIndex((e) => e.index === r);
		if (e < 0) return null;
		let t = l.labels[e];
		return t ? {
			x: l.cx,
			y: l.cy,
			x2: t.x,
			y2: t.y,
			dots: []
		} : null;
	}
	if (r === null) return null;
	let u = i(r), d = s.map((e) => {
		let t = e.data[r] ?? 0;
		return {
			series: e,
			x: u,
			y: a(t)
		};
	});
	return {
		x: u,
		y: o.y,
		x2: u,
		y2: o.y + o.h,
		dots: d
	};
}
//#endregion
//#region src/components/chart/useChart.ts
function Za(e, t) {
	let n = Ln("mc-chart"), r = a(() => e.type === "pie" || e.type === "doughnut"), i = a(() => e.type === "doughnut"), o = a(() => e.type === "radar"), s = a(() => e.type === "scatter"), c = a(() => !r.value && !o.value), l = a(() => c.value && !s.value), u = a(() => e.type === "bar"), d = a(() => pa(e.data)), f = a(() => ma(e.data)), p = a(() => ha(d.value)), m = a(() => ga(p.value)), h = a(() => _a(m.value, f.value)), g = L([]), _ = L([]), v = L(null), y = L(null), b = a(() => r.value ? p.value.slice(0, 1) : p.value.filter((e) => !g.value.includes(e.name))), x = a(() => !p.value.some((e) => e.data.length > 0)), S = L(null), C = L(null), w = L(640), T = null;
	function D() {
		let e = S.value;
		if (!e) return;
		let t = e.clientWidth;
		t > 0 && (w.value = t);
	}
	function O() {
		D();
	}
	ee(() => {
		D(), typeof ResizeObserver < "u" && S.value ? (T = new ResizeObserver(() => D()), T.observe(S.value)) : typeof window < "u" && window.addEventListener("resize", O);
	}), A(() => {
		T?.disconnect(), T = null, typeof window < "u" && window.removeEventListener("resize", O);
	});
	let k = L({
		start: 0,
		end: 1
	}), j = a(() => ka({
		dataZoom: e.dataZoom,
		isCartesian: c.value,
		categoryCount: m.value
	})), M = a(() => Aa({
		zoom: k.value,
		showZoom: j.value,
		categoryCount: m.value
	})), N = a(() => ja({
		start: M.value.start,
		end: M.value.end,
		labels: h.value
	})), P = a(() => Sa({
		xAxis: e.xAxis,
		isCartesian: c.value
	})), F = a(() => Ca({
		height: e.height,
		axisBottom: P.value
	})), I = a(() => ba(b.value, N.value)), R = a(() => ya({
		values: I.value,
		isBar: u.value,
		innerHeight: F.value
	})), z = a(() => xa({
		yAxis: e.yAxis,
		isCartesian: c.value,
		ticks: R.value.ticks,
		width: w.value
	})), B = a(() => wa({
		width: w.value,
		height: e.height,
		yGutter: z.value,
		axisBottom: P.value
	}));
	function V(e) {
		return Ta(e, R.value, B.value);
	}
	let H = a(() => Ea(R.value, B.value)), U = a(() => Da(B.value.w, N.value.length));
	function W(e) {
		return Oa({
			categoryIndex: e,
			visibleCategories: N.value,
			plot: B.value,
			bandWidth: U.value,
			isBar: u.value
		});
	}
	let G = a(() => Pa({
		activeSeries: b.value,
		visibleCategories: N.value,
		plot: B.value,
		bandWidth: U.value,
		isBar: u.value,
		scale: R.value
	})), K = a(() => Fa({
		type: e.type,
		isScatter: s.value,
		lineSeries: G.value,
		baselineY: H.value,
		uid: n
	})), te = a(() => Ia({
		activeSeries: b.value,
		visibleCategories: N.value,
		bandWidth: U.value,
		baselineY: H.value,
		plotX: B.value.x,
		scale: R.value,
		plot: B.value
	})), ne = a(() => La({
		activeSeries: b.value,
		visibleCategories: N.value,
		plot: B.value,
		bandWidth: U.value,
		isBar: u.value,
		scale: R.value
	})), re = a(() => za({
		cats: N.value,
		activeSeries: b.value,
		plot: B.value,
		min: R.value.min,
		max: R.value.max
	})), J = a(() => Ba({
		plot: B.value,
		isDoughnut: i.value,
		innerRadius: e.innerRadius
	})), ie = a(() => Va({
		seriesList: p.value,
		categoryLabels: h.value,
		hiddenSlices: _.value
	})), Y = a(() => Ha(J.value, ie.value)), X = a(() => Ua({
		isDoughnut: i.value,
		activeSliceIndex: y.value,
		slices: ie.value
	})), ae = a(() => Wa(e.markLine)), oe = a(() => Ga({
		isPie: r.value,
		slices: ie.value,
		seriesList: p.value,
		hiddenSeries: g.value
	}));
	function se(n) {
		e.loading || (r.value ? _.value = _.value.includes(n.index) ? _.value.filter((e) => e !== n.index) : [..._.value, n.index] : g.value = g.value.includes(n.name) ? g.value.filter((e) => e !== n.name) : [...g.value, n.name], t("legendClick", n.name));
	}
	let ce = a(() => Ka({
		yAxis: e.yAxis,
		ticks: R.value.ticks,
		scale: R.value,
		plot: B.value
	})), le = a(() => Ra({
		xAxis: e.xAxis,
		cats: N.value,
		plotWidth: B.value.w,
		isBar: u.value,
		bandWidth: U.value,
		width: w.value,
		plotBottomY: B.value.y + B.value.h,
		xPosOf: W
	})), ue = L(null), de = L({
		x: 0,
		y: 0
	}), fe = L({
		x: 0,
		y: 0
	}), pe = a(() => qa({
		isPie: r.value,
		activeSliceIndex: y.value,
		slices: ie.value,
		activeIndex: v.value,
		categoryLabels: h.value,
		activeSeries: b.value
	})), me = a(() => Ja({
		isPie: r.value,
		activeSliceIndex: y.value,
		slices: ie.value,
		activeIndex: v.value,
		categoryLabels: h.value
	})), he = a(() => ({
		active: pe.value.length > 0,
		x: fe.value.x,
		y: fe.value.y,
		items: pe.value
	})), ge = a(() => ({ transform: `translate3d(${fe.value.x}px, ${fe.value.y}px, 0)` }));
	function _e() {
		let e = S.value, t = ue.value;
		if (!e || !t) return;
		let n = e.clientWidth, r = e.clientHeight, i = t.offsetWidth, a = t.offsetHeight, o = de.value.x + 16;
		o + i > n - 8 && (o = de.value.x - i - 16), o = ot(o, 8, Math.max(8, n - i - 8));
		let s = de.value.y - a / 2;
		s = ot(s, 8, Math.max(8, r - a - 8)), fe.value = {
			x: o,
			y: s
		};
	}
	q([
		pe,
		v,
		y
	], () => {
		E(_e);
	}, { flush: "post" }), q([w, () => e.height], () => E(_e), { flush: "post" });
	function ve(e) {
		let t = C.value;
		if (!t) return {
			x: 0,
			y: 0
		};
		let n = t.getBoundingClientRect(), r = n.width / (w.value || 1) || 1;
		return {
			x: (e.clientX - n.left) / r,
			y: (e.clientY - n.top) / r
		};
	}
	function ye(e) {
		let t = S.value;
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
	function be(t) {
		if (!c.value || e.loading) return;
		let n = N.value;
		if (!n.length) return;
		let { x: r } = ve(t), i;
		i = u.value ? Math.floor((r - B.value.x) / (U.value || 1)) : Math.round((r - B.value.x) / (B.value.w || 1) * (n.length - 1));
		let a = ot(i, 0, n.length - 1);
		v.value = n[a].index, de.value = ye(t), _e();
	}
	function xe() {
		v.value = null;
	}
	function Se(t) {
		e.tooltip && be(t);
	}
	function Ce(t, n) {
		e.tooltip && (y.value = t, de.value = ye(n));
	}
	function we() {
		y.value = null;
	}
	function Te(t, n) {
		e.tooltip && (v.value = t, de.value = ye(n));
	}
	function Ee(e, n, r) {
		t("itemClick", {
			series: e,
			index: n,
			value: r
		});
	}
	function De(e, t, n, r) {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), Ee(t, n, r));
	}
	function Oe(t, n, r) {
		return `${t} · ${n}：${fa(r, t, e.valueFormatter)}`;
	}
	let ke = L(null), Ae = L(null);
	function je(e) {
		return Na(e.clientX, ke.value);
	}
	function Me(e, t) {
		k.value = Ma(k.value, e, t);
	}
	function Ne(e) {
		Ae.value && Me(Ae.value, je(e));
	}
	function Pe() {
		Ae.value = null, typeof window < "u" && (window.removeEventListener("pointermove", Ne), window.removeEventListener("pointerup", Pe), window.removeEventListener("pointercancel", Pe));
	}
	function Fe(t, n) {
		e.loading || (t.preventDefault(), Ae.value = n, typeof window < "u" && (window.addEventListener("pointermove", Ne), window.addEventListener("pointerup", Pe), window.addEventListener("pointercancel", Pe)));
	}
	function Ie(t) {
		if (e.loading) return;
		let n = je(t);
		Me(Math.abs(n - k.value.start) <= Math.abs(n - k.value.end) ? "start" : "end", n);
	}
	function Le(e, t) {
		let n = t === "start" ? k.value.start : k.value.end, r = e.shiftKey ? .1 : .02, i = null;
		e.key === "ArrowLeft" || e.key === "ArrowDown" ? i = n - r : e.key === "ArrowRight" || e.key === "ArrowUp" ? i = n + r : e.key === "Home" ? i = 0 : e.key === "End" && (i = 1), i !== null && (e.preventDefault(), Me(t, i));
	}
	let Re = a(() => Xa({
		isPie: r.value,
		isRadar: o.value,
		activeIndex: v.value,
		xPosOf: W,
		yPosOf: V,
		plot: B.value,
		activeSeries: b.value,
		visibleCategories: N.value,
		radar: re.value
	})), ze = a(() => Ya({
		width: w.value,
		height: e.height,
		axisBottom: P.value
	})), Be = a(() => {
		if (e.title) return e.title;
		let t = p.value.map((e) => e.name).filter(Boolean);
		return t.length ? `图表：${t.join("、")}` : "图表";
	});
	return {
		hostRef: S,
		svgRef: C,
		tipRef: ue,
		zoomTrackRef: ke,
		classes: a(() => Z("mc-chart", "mc-recipe-sheet", `mc-chart--${e.type}`, {
			"is-loading": e.loading,
			"is-empty": x.value,
			"is-animated": e.animation,
			"is-disabled": e.loading
		}, e.customClass)),
		ariaLabel: Be,
		isPie: r,
		isCartesian: c,
		isRadar: o,
		isScatter: s,
		isBar: u,
		showLineSeries: l,
		showZoom: j,
		isEmpty: x,
		legendItems: oe,
		toggleLegend: se,
		markLines: ae,
		categoryLabels: h,
		yScale: R,
		plot: B,
		yPos: V,
		lineSeries: G,
		areaSeries: K,
		bars: te,
		scatterPoints: ne,
		radar: re,
		pie: J,
		pieSlices: Y,
		donutCenter: X,
		xAxisLabels: le,
		yAxisLabels: ce,
		tooltipItems: pe,
		tooltipTitle: me,
		tooltipState: he,
		tipStyle: ge,
		crosshair: Re,
		skeleton: ze,
		onPointerMove: be,
		onPointerLeave: xe,
		onPointerDown: Se,
		onSliceEnter: Ce,
		onSliceLeave: we,
		onRadarPointEnter: Te,
		onZoomKeydown: Le,
		onZoomPointerDown: Fe,
		onZoomTrackDown: Ie,
		emitItemClick: Ee,
		onMarkKeydown: De,
		markLabel: Oe,
		zoom: k,
		width: w
	};
}
//#endregion
//#region src/components/chart/Chart.vue?vue&type=script&setup=true&lang.ts
var Qa = ["aria-busy"], $a = { class: "mc-chart__body mc-grain-overlay" }, eo = ["viewBox", "height"], to = { class: "mc-chart__grid" }, no = [
	"x1",
	"x2",
	"y1",
	"y2"
], ro = { class: "mc-chart__skeleton-bars" }, io = [
	"x",
	"y",
	"width",
	"height"
], ao = {
	key: 1,
	class: "mc-chart__empty",
	role: "status"
}, oo = {
	class: "mc-chart__empty-art",
	"aria-hidden": "true"
}, so = { class: "mc-chart__empty-ring" }, co = { class: "mc-chart__empty-text" }, lo = [
	"viewBox",
	"height",
	"aria-label"
], uo = ["id"], fo = ["stop-color"], po = ["stop-color"], mo = {
	key: 0,
	class: "mc-chart__grid"
}, ho = [
	"x1",
	"x2",
	"y1",
	"y2"
], go = {
	key: 1,
	class: "mc-chart__mark-lines"
}, _o = [
	"x1",
	"x2",
	"y1",
	"y2"
], vo = ["transform"], yo = ["width"], bo = {
	class: "mc-chart__mark-chip-text",
	x: "6",
	y: "13"
}, xo = {
	key: 2,
	class: "mc-chart__series"
}, So = ["d", "fill"], Co = ["d"], wo = {
	key: 3,
	class: "mc-chart__series"
}, To = [
	"x",
	"y",
	"width",
	"height",
	"fill",
	"aria-label",
	"onClick",
	"onKeydown"
], Eo = {
	key: 4,
	class: "mc-chart__series"
}, Do = [
	"cx",
	"cy",
	"fill",
	"aria-label",
	"onClick",
	"onKeydown"
], Oo = {
	key: 5,
	class: "mc-chart__radar"
}, ko = ["points"], Ao = [
	"x1",
	"y1",
	"x2",
	"y2"
], jo = ["points"], Mo = ["points"], No = [
	"cx",
	"cy",
	"onPointerenter"
], Po = [
	"x",
	"y",
	"text-anchor"
], Fo = {
	key: 6,
	class: "mc-chart__pie"
}, Io = [
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
], Lo = {
	key: 0,
	class: "mc-chart__donut-center"
}, Ro = ["x", "y"], zo = ["x", "y"], Bo = {
	key: 7,
	class: "mc-chart__y-axis"
}, Vo = [
	"x1",
	"x2",
	"y1",
	"y2"
], Ho = ["x", "y"], Uo = {
	key: 8,
	class: "mc-chart__x-axis"
}, Wo = [
	"x1",
	"x2",
	"y1",
	"y2"
], Go = [
	"x",
	"y",
	"text-anchor"
], Ko = {
	key: 9,
	class: "mc-chart__crosshair"
}, qo = [
	"x1",
	"x2",
	"y1",
	"y2"
], Jo = [
	"cx",
	"cy",
	"fill"
], Yo = { class: "mc-chart__tooltip-title" }, Xo = { class: "mc-chart__tooltip-list" }, Zo = { class: "mc-chart__tooltip-name" }, Qo = { class: "mc-chart__tooltip-value" }, $o = {
	key: 0,
	class: "mc-chart__zoom"
}, es = ["aria-valuenow", "disabled"], ts = ["aria-valuenow", "disabled"], ns = {
	key: 0,
	class: "mc-chart__legend"
}, rs = [
	"aria-pressed",
	"disabled",
	"onClick"
], is = { class: "mc-chart__legend-label" }, as = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let { hostRef: r, svgRef: i, tipRef: a, zoomTrackRef: o, classes: s, ariaLabel: d, isPie: f, isCartesian: p, isRadar: h, isScatter: g, isBar: _, showLineSeries: y, showZoom: b, isEmpty: x, legendItems: S, toggleLegend: C, markLines: w, categoryLabels: T, yScale: E, plot: A, yPos: j, lineSeries: ee, areaSeries: M, bars: N, scatterPoints: F, radar: I, pie: L, pieSlices: B, donutCenter: V, xAxisLabels: U, yAxisLabels: G, tooltipItems: K, tooltipTitle: te, tooltipState: ne, tipStyle: q, crosshair: J, skeleton: Y, onPointerMove: ae, onPointerLeave: oe, onPointerDown: se, onSliceEnter: ce, onSliceLeave: le, onRadarPointEnter: ue, onZoomKeydown: de, onZoomPointerDown: fe, onZoomTrackDown: pe, emitItemClick: me, onMarkKeydown: he, markLabel: ge, zoom: _e, width: ve } = Za(e, n);
		return (n, ye) => (P(), l("div", {
			class: D(W(s)),
			"aria-busy": e.loading ? "true" : void 0
		}, [u("div", $a, [
			ye[11] || (ye[11] = u("span", {
				class: "mc-chart__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", {
				ref_key: "hostRef",
				ref: r,
				class: "mc-chart__canvas",
				style: k({ height: `${e.height}px` })
			}, [e.loading ? (P(), l("svg", {
				key: 0,
				class: "mc-chart__svg mc-chart__svg--loading",
				viewBox: `0 0 ${W(ve)} ${e.height}`,
				width: "100%",
				height: e.height,
				"aria-hidden": "true"
			}, [u("g", to, [(P(!0), l(t, null, R(W(Y).grids, (e, t) => (P(), l("line", {
				key: `s-g${t}`,
				x1: W(A).x,
				x2: W(A).x + W(A).w,
				y1: e,
				y2: e
			}, null, 8, no))), 128))]), u("g", ro, [(P(!0), l(t, null, R(W(Y).bars, (e, t) => (P(), l("rect", {
				key: `s-b${t}`,
				x: e.x,
				y: e.y,
				width: e.w,
				height: e.h,
				rx: "4"
			}, null, 8, io))), 128))])], 8, eo)) : W(x) ? (P(), l("div", ao, [z(n.$slots, "empty", {}, () => [u("div", oo, [ye[10] || (ye[10] = u("span", { class: "mc-chart__empty-halo" }, null, -1)), u("span", so, [m($, {
				name: "chart-line",
				size: 24,
				"stroke-width": 1.5
			})])]), u("p", co, H(e.emptyText), 1)], !0)])) : (P(), l("svg", {
				key: 2,
				ref_key: "svgRef",
				ref: i,
				class: "mc-chart__svg",
				viewBox: `0 0 ${W(ve)} ${e.height}`,
				width: "100%",
				height: e.height,
				role: "img",
				"aria-label": W(d),
				onPointermove: ye[2] || (ye[2] = (...e) => W(ae) && W(ae)(...e)),
				onPointerdown: ye[3] || (ye[3] = (...e) => W(se) && W(se)(...e)),
				onPointerleave: ye[4] || (ye[4] = (...e) => W(oe) && W(oe)(...e))
			}, [
				u("title", null, H(W(d)), 1),
				u("defs", null, [(P(!0), l(t, null, R(W(M), (e) => (P(), l("linearGradient", {
					id: e.gradientId,
					key: "a.gradientId",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1"
				}, [u("stop", {
					offset: "0%",
					"stop-color": e.series.color,
					"stop-opacity": "0.34"
				}, null, 8, fo), u("stop", {
					offset: "100%",
					"stop-color": e.series.color,
					"stop-opacity": "0"
				}, null, 8, po)], 8, uo))), 128))]),
				e.grid && W(p) ? (P(), l("g", mo, [(P(!0), l(t, null, R(W(E).ticks, (e, t) => (P(), l("line", {
					key: `g-${t}`,
					x1: W(A).x,
					x2: W(A).x + W(A).w,
					y1: W(j)(e),
					y2: W(j)(e)
				}, null, 8, ho))), 128))])) : c("", !0),
				W(p) ? (P(), l("g", go, [(P(!0), l(t, null, R(W(w), (e, t) => (P(), l("g", { key: `ml-${t}` }, [u("line", {
					class: "mc-chart__mark-line",
					x1: W(A).x,
					x2: W(A).x + W(A).w,
					y1: W(j)(e.value),
					y2: W(j)(e.value),
					style: k(e.color ? { stroke: e.color } : void 0)
				}, null, 12, _o), e.label ? (P(), l("g", {
					key: 0,
					transform: `translate(${W(A).x + W(A).w - W(la)(W(ua)(e.label, 72)) - 12}, ${W(j)(e.value) - 9})`
				}, [u("rect", {
					class: "mc-chart__mark-chip-bg",
					width: W(la)(W(ua)(e.label, 72)) + 12,
					height: "18",
					rx: "9"
				}, null, 8, yo), u("text", bo, H(W(ua)(e.label, 72)), 1)], 8, vo)) : c("", !0)]))), 128))])) : c("", !0),
				W(y) ? (P(), l("g", xo, [(P(!0), l(t, null, R(W(M), (e) => (P(), l("path", {
					key: `area-${e.series.index}`,
					class: "mc-chart__area",
					d: e.d,
					fill: `url(#${e.gradientId})`
				}, null, 8, So))), 128)), (P(!0), l(t, null, R(W(ee), (e) => (P(), l("path", {
					key: `line-${e.series.index}`,
					class: "mc-chart__line",
					d: e.d,
					style: k({
						stroke: e.series.color,
						"--mc-draw-length": String(e.length)
					})
				}, null, 12, Co))), 128))])) : c("", !0),
				W(_) ? (P(), l("g", wo, [(P(!0), l(t, null, R(W(N), (e, t) => (P(), l("rect", {
					key: e.key,
					class: D(["mc-chart__bar", { "is-negative": e.negative }]),
					x: e.x,
					y: e.y,
					width: e.w,
					height: e.h,
					rx: "3",
					fill: e.series.color,
					role: "button",
					tabindex: "0",
					"aria-label": W(ge)(e.series.name, W(T)[e.index] ?? "", e.value),
					style: k({ "--i": t }),
					onClick: (t) => W(me)(e.series.name, e.index, e.value),
					onKeydown: (t) => W(he)(t, e.series.name, e.index, e.value)
				}, null, 46, To))), 128))])) : c("", !0),
				W(g) ? (P(), l("g", Eo, [(P(!0), l(t, null, R(W(F), (e, t) => (P(), l("circle", {
					key: e.key,
					class: "mc-chart__point",
					cx: e.x,
					cy: e.y,
					r: "4",
					fill: e.series.color,
					role: "button",
					tabindex: "0",
					"aria-label": W(ge)(e.series.name, W(T)[e.index] ?? "", e.value),
					style: k({ "--i": t }),
					onClick: (t) => W(me)(e.series.name, e.index, e.value),
					onKeydown: (t) => W(he)(t, e.series.name, e.index, e.value)
				}, null, 44, Do))), 128))])) : c("", !0),
				W(h) ? (P(), l("g", Oo, [
					(P(!0), l(t, null, R(W(I).rings, (e, t) => (P(), l("polygon", {
						key: `ring-${t}`,
						class: "mc-chart__radar-ring",
						points: e
					}, null, 8, ko))), 128)),
					(P(!0), l(t, null, R(W(I).spokes, (e, t) => (P(), l("line", {
						key: `spoke-${t}`,
						class: "mc-chart__radar-spoke",
						x1: e.x1,
						y1: e.y1,
						x2: e.x2,
						y2: e.y2
					}, null, 8, Ao))), 128)),
					(P(!0), l(t, null, R(W(I).series, (e) => (P(), l("g", { key: `radar-series-${e.series.index}` }, [
						u("polygon", {
							class: "mc-chart__radar-area",
							points: e.polygon,
							style: k({ fill: e.series.color })
						}, null, 12, jo),
						u("polygon", {
							class: "mc-chart__radar-line",
							points: e.polygon,
							style: k({ stroke: e.series.color })
						}, null, 12, Mo),
						(P(!0), l(t, null, R(e.points, (t, n) => (P(), l("circle", {
							key: `radar-point-${e.series.index}-${n}`,
							class: "mc-chart__radar-dot",
							cx: t.x,
							cy: t.y,
							r: "3.4",
							style: k({ fill: e.series.color }),
							onPointerenter: (e) => W(ue)(t.index, e),
							onPointerleave: ye[0] || (ye[0] = (...e) => W(oe) && W(oe)(...e))
						}, null, 44, No))), 128))
					]))), 128)),
					(P(!0), l(t, null, R(W(I).labels, (e) => (P(), l("text", {
						key: `radar-label-${e.index}`,
						class: "mc-chart__axis-label",
						x: e.x,
						y: e.y,
						"text-anchor": e.anchor,
						"dominant-baseline": "middle"
					}, H(e.text), 9, Po))), 128))
				])) : c("", !0),
				W(f) ? (P(), l("g", Fo, [(P(!0), l(t, null, R(W(B), (e, t) => ie((P(), l("circle", {
					key: `slice-${e.index}`,
					class: "mc-chart__arc",
					cx: e.cx,
					cy: e.cy,
					r: e.strokeRadius,
					stroke: e.color,
					"stroke-width": e.strokeWidth,
					"stroke-dasharray": `${e.len} ${e.circumference}`,
					transform: `rotate(${e.rotation} ${e.cx} ${e.cy})`,
					style: k({
						"--mc-donut-length": String(e.len),
						"--i": t
					}),
					role: "button",
					tabindex: "0",
					"aria-label": `${e.name}：${W(fa)(e.value, e.name)}（${(e.frac * 100).toFixed(1)}%）`,
					onPointerenter: (t) => W(ce)(e.index, t),
					onPointerleave: ye[1] || (ye[1] = (...e) => W(le) && W(le)(...e)),
					onClick: (t) => W(me)(e.name, e.index, e.value),
					onKeydown: (t) => W(he)(t, e.name, e.index, e.value)
				}, null, 44, Io)), [[re, !e.hidden]])), 128)), W(V) ? (P(), l("g", Lo, [u("text", {
					class: "mc-chart__donut-title",
					x: W(L).cx,
					y: W(L).cy - 8,
					"text-anchor": "middle"
				}, H(W(V).title), 9, Ro), u("text", {
					class: "mc-chart__donut-value",
					x: W(L).cx,
					y: W(L).cy + 12,
					"text-anchor": "middle"
				}, H(W(V).text), 9, zo)])) : c("", !0)])) : c("", !0),
				e.yAxis && W(p) ? (P(), l("g", Bo, [u("line", {
					class: "mc-chart__axis-line",
					x1: W(A).x,
					x2: W(A).x,
					y1: W(A).y,
					y2: W(A).y + W(A).h
				}, null, 8, Vo), (P(!0), l(t, null, R(W(G), (e) => (P(), l("text", {
					key: `y-${e.value}`,
					class: "mc-chart__axis-label",
					x: W(A).x - 8,
					y: e.y,
					"text-anchor": "end",
					"dominant-baseline": "middle"
				}, H(e.text), 9, Ho))), 128))])) : c("", !0),
				e.xAxis && W(p) ? (P(), l("g", Uo, [u("line", {
					class: "mc-chart__axis-line",
					x1: W(A).x,
					x2: W(A).x + W(A).w,
					y1: W(A).y + W(A).h,
					y2: W(A).y + W(A).h
				}, null, 8, Wo), (P(!0), l(t, null, R(W(U), (e) => (P(), l("text", {
					key: `x-${e.index}`,
					class: "mc-chart__axis-label",
					x: e.x,
					y: e.y,
					"text-anchor": e.anchor,
					"dominant-baseline": "middle"
				}, H(e.text), 9, Go))), 128))])) : c("", !0),
				W(J) ? (P(), l("g", Ko, [u("line", {
					class: "mc-chart__crosshair-line",
					x1: W(J).x,
					x2: W(J).x2,
					y1: W(J).y,
					y2: W(J).y2
				}, null, 8, qo), (P(!0), l(t, null, R(W(J).dots, (e) => (P(), l("circle", {
					key: `dot-${e.series.index}`,
					class: "mc-chart__crosshair-dot",
					cx: e.x,
					cy: e.y,
					r: "4.5",
					fill: e.series.color
				}, null, 8, Jo))), 128))])) : c("", !0)
			], 40, lo)), e.tooltip && W(K).length ? (P(), l("div", {
				key: 3,
				ref_key: "tipRef",
				ref: a,
				class: "mc-chart__tooltip mc-recipe-panel",
				style: k(W(q)),
				role: "tooltip"
			}, [z(n.$slots, "tooltip", O(v(W(ne))), () => [u("p", Yo, H(W(te)), 1), u("ul", Xo, [(P(!0), l(t, null, R(W(K), (e) => (P(), l("li", {
				key: e.series,
				class: "mc-chart__tooltip-row"
			}, [
				u("span", {
					class: "mc-chart__tooltip-dot",
					style: k({ background: e.color })
				}, null, 4),
				u("span", Zo, H(e.series), 1),
				u("span", Qo, H(W(fa)(e.value, e.series)), 1)
			]))), 128))])], !0)], 4)) : c("", !0)], 4),
			W(b) ? (P(), l("div", $o, [u("div", {
				ref_key: "zoomTrackRef",
				ref: o,
				class: "mc-chart__zoom-track mc-recipe-well",
				role: "group",
				"aria-label": "数据范围",
				onPointerdown: ye[9] || (ye[9] = (...e) => W(pe) && W(pe)(...e))
			}, [
				u("div", {
					class: "mc-chart__zoom-range",
					style: k({
						left: `${W(_e).start * 100}%`,
						width: `${(W(_e).end - W(_e).start) * 100}%`
					})
				}, null, 4),
				u("button", {
					type: "button",
					class: "mc-chart__zoom-handle",
					role: "slider",
					"aria-label": "起始位置",
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-valuenow": Math.round(W(_e).start * 100),
					disabled: e.loading,
					style: k({ left: `${W(_e).start * 100}%` }),
					onPointerdown: ye[5] || (ye[5] = X((e) => W(fe)(e, "start"), ["stop"])),
					onKeydown: ye[6] || (ye[6] = (e) => W(de)(e, "start"))
				}, null, 44, es),
				u("button", {
					type: "button",
					class: "mc-chart__zoom-handle",
					role: "slider",
					"aria-label": "结束位置",
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-valuenow": Math.round(W(_e).end * 100),
					disabled: e.loading,
					style: k({ left: `${W(_e).end * 100}%` }),
					onPointerdown: ye[7] || (ye[7] = X((e) => W(fe)(e, "end"), ["stop"])),
					onKeydown: ye[8] || (ye[8] = (e) => W(de)(e, "end"))
				}, null, 44, ts)
			], 544)])) : c("", !0)
		]), e.legend && W(S).length ? (P(), l("div", ns, [z(n.$slots, "legend", { series: W(S) }, () => [(P(!0), l(t, null, R(W(S), (t) => (P(), l("button", {
			key: t.key,
			type: "button",
			class: D(["mc-chart__legend-item", { "is-off": !t.visible }]),
			"aria-pressed": t.visible,
			disabled: e.loading,
			onClick: (e) => W(C)(t)
		}, [u("span", {
			class: "mc-chart__legend-dot",
			style: k({ background: t.color })
		}, null, 4), u("span", is, H(t.name), 1)], 10, rs))), 128))], !0)])) : c("", !0)], 10, Qa));
	}
}), [["__scopeId", "data-v-658bb63c"]]), os = ["onKeydown"], ss = [
	"checked",
	"disabled",
	"aria-checked",
	"aria-disabled"
], cs = {
	key: 0,
	class: "mc-checkbox__label"
}, ls = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiCheckbox",
	inheritAttrs: !1,
	__name: "Checkbox",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: {
			type: [Boolean, Array],
			default: !1
		},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = t, i = K(e, "modelValue"), o = G(), s = a(() => {
			let { class: e, style: t, ...n } = o;
			return n;
		}), d = L(null), m = a(() => Array.isArray(i.value)), h = a(() => n.value ?? n.label ?? ""), g = a(() => m.value ? i.value.includes(h.value) : i.value === !0);
		q(() => n.indeterminate, (e) => {
			d.value && (d.value.indeterminate = e);
		}, {
			immediate: !0,
			flush: "post"
		});
		function _() {
			if (n.disabled) return;
			let e = !g.value;
			if (m.value) {
				let t = [...i.value], n = t.indexOf(h.value);
				e ? n === -1 && t.push(h.value) : n !== -1 && t.splice(n, 1), i.value = t, r("change", t), v();
			} else i.value = e, r("change", e), v();
		}
		function v() {
			E(() => {
				d.value && (d.value.checked = g.value);
			});
		}
		let y = a(() => Z("mc-checkbox", `mc-checkbox--${n.size}`, {
			"is-checked": g.value,
			"is-indeterminate": n.indeterminate,
			"is-disabled": n.disabled
		})), b = a(() => Z(y.value, o.class, n.customClass)), x = a(() => o.style);
		return (t, n) => (P(), l("label", {
			class: D(b.value),
			style: k(x.value),
			onKeydown: Y(X(_, ["prevent"]), ["enter"])
		}, [
			u("input", T({
				ref_key: "field",
				ref: d
			}, s.value, {
				class: "mc-checkbox__input mc-visually-hidden",
				type: "checkbox",
				role: "checkbox",
				checked: g.value,
				disabled: e.disabled,
				"aria-checked": e.indeterminate ? "mixed" : g.value,
				"aria-disabled": e.disabled || void 0,
				onChange: _
			}), null, 16, ss),
			n[0] || (n[0] = f("<span class=\"mc-checkbox__box mc-sheen-sweep mc-recipe-well-deep\" aria-hidden=\"true\" data-v-194f781a><span class=\"mc-checkbox__grain mc-grain-overlay\" data-v-194f781a></span><svg viewBox=\"0 0 24 24\" class=\"mc-checkbox__mark\" data-v-194f781a><path class=\"mc-checkbox__check\" d=\"M20 6 9 17l-5-5\" data-v-194f781a></path><path class=\"mc-checkbox__dash\" d=\"M6 12h12\" data-v-194f781a></path></svg></span><span class=\"mc-checkbox__glow\" aria-hidden=\"true\" data-v-194f781a></span>", 2)),
			e.label || t.$slots.default ? (P(), l("span", cs, [z(t.$slots, "default", {}, () => [p(H(e.label), 1)], !0)])) : c("", !0)
		], 46, os));
	}
}), [["__scopeId", "data-v-194f781a"]]), us = ["aria-label"], ds = { class: "mc-circle-cutout__face" }, fs = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => Z("mc-circle-cutout", "mc-recipe-well", `mc-circle-cutout--${t.tone}`, {
			"has-ring": t.ring,
			"is-offset": t.offset !== 0,
			"is-frosted": t.frosted
		}, t.customClass)), r = a(() => {
			let e = {
				"--mc-cutout-size": typeof t.size == "number" ? `${t.size}px` : t.size,
				"--mc-cutout-gutter": `${t.gutter}px`
			};
			return t.offset && (e["--mc-cutout-shift"] = `${t.offset / 100 * 50}%`), e;
		});
		return (t, i) => (P(), l("div", {
			class: D(n.value),
			style: k(r.value),
			role: "group",
			"aria-label": e.label
		}, [i[0] || (i[0] = u("span", {
			class: "mc-circle-cutout__aurora",
			"aria-hidden": "true"
		}, null, -1)), u("div", ds, [z(t.$slots, "default", {}, void 0, !0)])], 14, us));
	}
}), [["__scopeId", "data-v-fd6fc940"]]);
//#endregion
//#region src/composables/useClipboard.ts
function ps(e = {}) {
	let { timeout: t = 2e3, onSuccess: n, onError: r } = e, i = L(!1), a = L(null), o = null;
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
	return _() && M(s), {
		copy: d,
		copied: i,
		error: a
	};
}
//#endregion
//#region src/components/clipboard-button/ClipboardButton.vue?vue&type=script&setup=true&lang.ts
var ms = ["disabled", "aria-label"], hs = { class: "mc-clipboard-button__label" }, gs = {
	class: "mc-clipboard-button__status",
	role: "status",
	"aria-live": "polite"
}, _s = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = rn(), { copy: o, copied: s, error: c } = ps({
			timeout: n.timeout,
			onSuccess: (e) => r("success", e),
			onError: (e) => r("error", e)
		}), d = a(() => ({
			copy: i.value.clipboard?.copy ?? "Copy",
			copied: i.value.clipboard?.copied ?? "Copied",
			failed: i.value.clipboard?.failed ?? "Copy failed",
			copyLabel: i.value.clipboard?.copyLabel ?? "Copy to clipboard"
		})), f = a(() => n.text ?? n.value ?? ""), p = a(() => s.value), h = a(() => c.value !== null), g = a(() => h.value ? n.errorText ?? d.value.failed : p.value ? n.successText ?? d.value.copied : n.content ?? d.value.copy), _ = a(() => n.icon ?? (p.value ? "circle-check" : "copy")), v = a(() => n.size === "small" ? 12 : n.size === "large" ? 16 : 14), y = a(() => n.content ?? d.value.copyLabel), b = a(() => h.value ? n.errorText ?? d.value.failed : p.value ? n.successText ?? d.value.copied : ""), x = null;
		q(c, (e) => {
			x !== null && (clearTimeout(x), x = null), e && (x = setTimeout(() => {
				c.value = null, x = null;
			}, n.timeout));
		}), A(() => {
			x !== null && clearTimeout(x);
		});
		async function S() {
			n.disabled || (r("copy", f.value), await o(f.value));
		}
		let C = a(() => Z("mc-clipboard-button", `mc-clipboard-button--${n.variant}`, `mc-clipboard-button--${n.size}`, {
			"is-copied": p.value,
			"is-error": h.value,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (P(), l("button", {
			type: "button",
			class: D(C.value),
			disabled: e.disabled,
			"aria-label": y.value,
			onClick: S
		}, [
			m($, {
				name: _.value,
				size: v.value,
				class: "mc-clipboard-button__icon"
			}, null, 8, ["name", "size"]),
			u("span", hs, H(g.value), 1),
			u("span", gs, H(b.value), 1)
		], 10, ms));
	}
}), [["__scopeId", "data-v-40ab6147"]]), vs = /* @__PURE__ */ "break.case.catch.class.const.continue.debugger.default.delete.do.else.export.extends.finally.for.function.if.import.in.instanceof.new.of.return.super.switch.this.throw.try.typeof.var.void.while.with.yield.async.await.static.get.set.from.as".split("."), ys = [
	...vs,
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
], bs = [
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
], xs = /* @__PURE__ */ "def.class.return.if.elif.else.for.while.break.continue.pass.import.from.as.try.except.finally.raise.with.lambda.global.nonlocal.yield.assert.del.in.is.not.and.or.async.await.match.case".split("."), Ss = [
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
], Cs = /* @__PURE__ */ "abstract.assert.break.case.catch.class.const.continue.default.do.double.else.enum.extends.final.finally.float.for.goto.if.implements.import.instanceof.int.interface.long.native.new.package.private.protected.public.record.return.sealed.short.static.strictfp.super.switch.synchronized.this.throw.throws.transient.try.void.volatile.while.var".split("."), ws = /* @__PURE__ */ "auto.break.case.char.const.continue.default.do.double.else.enum.extern.float.for.goto.if.inline.int.long.register.restrict.return.short.signed.sizeof.static.struct.switch.typedef.union.unsigned.void.volatile.while.bool.class.template.typename.public.private.protected.virtual.new.delete.this.using.namespace.try.catch.throw.operator.friend.constexpr.override.nullptr".split("."), Ts = [
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
], Es = [
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
], Ds = /* @__PURE__ */ "as.break.const.continue.crate.dyn.else.enum.extern.fn.for.if.impl.in.let.loop.match.mod.move.mut.pub.ref.return.self.static.struct.super.trait.type.unsafe.use.where.while.async.await".split("."), Os = [
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
], ks = /* @__PURE__ */ "select.from.where.insert.into.values.update.set.delete.create.table.alter.drop.index.view.join.inner.left.right.outer.full.on.group.by.order.having.limit.offset.union.all.distinct.as.and.or.not.in.between.like.exists.case.when.then.else.end.primary.key.foreign.references.default.asc.desc".split("."), As = /* @__PURE__ */ "if.then.else.elif.fi.for.while.until.do.done.case.esac.function.return.export.local.readonly.declare.source.alias.unset.echo.cd.ls.cat.grep.sed.awk.sudo.set.shift.exit".split("."), js = /* @__PURE__ */ "important.inherit.initial.unset.auto.none.solid.dashed.dotted.block.inline.flex.grid.absolute.relative.fixed.sticky.static.hidden.visible.center.left.right.top.bottom.pointer.default.border.box".split(".");
function Ms(e) {
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
var Ns = {
	javascript: Ms({
		keywords: [
			...vs,
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
	typescript: Ms({
		keywords: [
			...ys,
			"true",
			"false",
			"null",
			"undefined"
		],
		types: bs,
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
	python: Ms({
		lineComments: ["#"],
		keywords: xs,
		types: Ss
	}),
	java: Ms({
		keywords: [
			...Cs,
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
	c: Ms({
		keywords: [
			...ws,
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
	cpp: Ms({
		keywords: [
			...ws,
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
	csharp: Ms({
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
	go: Ms({
		keywords: [
			...Ts,
			"true",
			"false",
			"nil"
		],
		types: Es
	}),
	rust: Ms({
		keywords: [
			...Ds,
			"true",
			"false"
		],
		types: Os
	}),
	php: Ms({
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
	swift: Ms({
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
	kotlin: Ms({
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
	ruby: Ms({
		lineComments: ["#"],
		keywords: /* @__PURE__ */ "alias.and.begin.break.case.class.def.defined.do.else.elsif.end.ensure.false.for.if.in.module.next.nil.not.or.redo.rescue.retry.return.self.super.then.true.undef.unless.until.when.while.yield.require.attr_accessor".split(".")
	}),
	swift_ignore: Ms({ mode: "text" }),
	sql: Ms({
		lineComments: ["--"],
		keywords: [
			...ks,
			"true",
			"false",
			"null"
		],
		caseInsensitive: !0
	}),
	shell: Ms({
		lineComments: ["#"],
		keywords: As,
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
	json: Ms({ keywords: [
		"true",
		"false",
		"null"
	] }),
	yaml: Ms({
		lineComments: ["#"],
		keywords: [
			"true",
			"false",
			"null",
			"yes",
			"no"
		]
	}),
	markdown: Ms({ mode: "text" }),
	text: Ms({ mode: "text" })
}, Ps = /* @__PURE__ */ new Set([
	"html",
	"xml",
	"svg",
	"vue",
	"svelte"
]), Fs = /* @__PURE__ */ new Set([
	"css",
	"scss",
	"less",
	"stylus"
]);
function Is(e) {
	let t = (e || "").toLowerCase().trim();
	if (Ps.has(t)) return Ms({
		mode: "markup",
		lineComments: [],
		blockComments: []
	});
	if (Fs.has(t)) return Ms({
		mode: "style",
		keywords: js
	});
	if (Ns[t]) return Ns[t];
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
	return n && Ns[n] ? Ns[n] : Ms({ mode: "text" });
}
var Ls = /[A-Za-z_$À-￿]/, Rs = /[A-Za-z0-9_$À-￿]/, zs = "+-*/%=<>!&|^~?:";
function Bs(e, t, n) {
	for (let r of n) if (r && e.startsWith(r, t)) return r;
	return null;
}
function Vs(e, t) {
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
		if (Bs(e, c, t.lineComments)) {
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
		} else if (Ls.test(n)) {
			let t = c;
			for (; t < l && Rs.test(e[t]);) t++;
			let n = e.slice(c, t), d = t;
			for (; d < l && /\s/.test(e[d]);) d++;
			let f = e[d] === "(", p = r(n);
			i.has(p) ? u("keyword", n) : o.has(p) ? u("type", n) : a.has(p) ? u("function", n) : s.has(p) ? u("number", n) : u(f ? "function" : "plain", n), c = t;
		} else if (zs.includes(n)) {
			let t = c;
			for (; t < l && zs.includes(e[t]);) t++;
			u("operator", e.slice(c, t)), c = t;
		} else u("punctuation", n), c += 1;
	}
	return n;
}
function Hs(e) {
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
function Us(e, t) {
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
				} else if (Ls.test(t)) {
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
function Ws(e, t) {
	if (!e) return [];
	let n = Is(t);
	return n.mode === "text" ? [{
		kind: "plain",
		value: e
	}] : n.mode === "markup" ? Hs(e) : n.mode === "style" ? Us(e, n) : Vs(e, n);
}
//#endregion
//#region src/components/code/Code.vue?vue&type=script&setup=true&lang.ts
var Gs = {
	key: 0,
	class: "mc-code__header mc-recipe-panel mc-sheen-sweep"
}, Ks = { class: "mc-code__title" }, qs = ["disabled", "aria-label"], Js = { class: "mc-code__copy-text" }, Ys = ["aria-label"], Xs = { class: "mc-code__pre" }, Zs = { class: "mc-code__code" }, Qs = {
	key: 0,
	class: "mc-code__gutter",
	"aria-hidden": "true"
}, $s = { class: "mc-code__content" }, ec = {
	key: 1,
	class: "mc-code__footer"
}, tc = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = L(!1), d, f = a(() => r.showLineNumbers && r.lineNumbers), p = a(() => {
			let e = Ws(r.code ?? "", r.language), t = [[]];
			for (let n of e) n.value.split("\n").forEach((e, r) => {
				r > 0 && t.push([]), e && t[t.length - 1].push({
					kind: n.kind,
					value: e
				});
			});
			return t;
		}), h = a(() => r.filename || r.label || r.language || "code"), g = a(() => !!(r.code ?? "").trim().length);
		async function _() {
			if (g.value) try {
				typeof navigator < "u" && navigator.clipboard?.writeText && await navigator.clipboard.writeText(r.code ?? ""), s.value = !0, o("copy", r.code ?? ""), o("copied"), d && clearTimeout(d), d = setTimeout(() => {
					s.value = !1;
				}, 1600);
			} catch {
				s.value = !1;
			}
		}
		let v = a(() => {
			if (r.maxHeight !== void 0 && r.maxHeight !== null) return typeof r.maxHeight == "number" ? { maxHeight: `${r.maxHeight}px` } : { maxHeight: r.maxHeight };
		}), y = a(() => Z("mc-code", "mc-recipe-sheet", "mc-grain-overlay", `mc-code--${r.theme}`, {
			"has-gutter": f.value,
			"has-header": r.showHeader
		}, r.customClass));
		return (n, r) => (P(), l("figure", { class: D(y.value) }, [
			e.showHeader ? (P(), l("header", Gs, [
				r[0] || (r[0] = u("span", {
					class: "mc-code__dots",
					"aria-hidden": "true"
				}, [
					u("i"),
					u("i"),
					u("i")
				], -1)),
				u("span", Ks, H(h.value), 1),
				r[1] || (r[1] = u("span", { class: "mc-code__spacer" }, null, -1)),
				z(n.$slots, "header", {}, void 0, !0),
				e.copyable ? (P(), l("button", {
					key: 0,
					type: "button",
					class: D(["mc-code__copy", { "is-copied": s.value }]),
					disabled: !g.value,
					"aria-label": s.value ? W(i).code?.copied ?? "Copied" : W(i).code?.copy ?? "Copy code",
					"aria-live": "polite",
					onClick: _
				}, [m($, {
					name: s.value ? "check" : "copy",
					size: 14
				}, null, 8, ["name"]), u("span", Js, H(s.value ? W(i).code?.copied ?? "Copied" : W(i).code?.copy ?? "Copy"), 1)], 10, qs)) : c("", !0)
			])) : c("", !0),
			u("div", {
				class: "mc-code__body mc-scroll mc-recipe-well",
				style: k(v.value),
				tabindex: "0",
				role: "region",
				"aria-label": h.value
			}, [u("pre", Xs, [u("code", Zs, [(P(!0), l(t, null, R(p.value, (e, n) => (P(), l("span", {
				key: n,
				class: "mc-code__line"
			}, [f.value ? (P(), l("span", Qs, H(n + 1), 1)) : c("", !0), u("span", $s, [(P(!0), l(t, null, R(e, (e, t) => (P(), l("span", {
				key: t,
				class: D(["mc-code__token", `mc-code__token--${e.kind}`])
			}, H(e.value), 3))), 128))])]))), 128))])])], 12, Ys),
			n.$slots.footer ? (P(), l("footer", ec, [z(n.$slots, "footer", {}, void 0, !0)])) : c("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-e17bfc60"]]), nc = [
	"id",
	"disabled",
	"aria-expanded",
	"aria-controls",
	"aria-disabled",
	"onClick"
], rc = { class: "mc-collapse__head" }, ic = {
	class: "mc-collapse__title",
	"data-mc-type": "title"
}, ac = ["id", "aria-labelledby"], oc = { class: "mc-collapse__panel-inner" }, sc = { class: "mc-collapse__content" }, cc = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiCollapse",
	__name: "Collapse",
	props: /*@__PURE__*/ w({
		items: {},
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), d = Ln("mc-collapse");
		function f(e) {
			return `${d}-trigger-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
		}
		function m(e) {
			return `${d}-panel-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
		}
		let h = a(() => {
			let e = o.value ?? r.defaultOpen;
			return e === void 0 ? [] : Array.isArray(e) ? e : [e];
		});
		function g(e) {
			return h.value.includes(e);
		}
		function _(e, t) {
			if (t) return;
			let n;
			n = r.accordion ? g(e) ? [] : [e] : g(e) ? h.value.filter((t) => t !== e) : [...h.value, e], o.value = r.accordion ? n[0] ?? "" : n, i("change", r.accordion ? n[0] ?? "" : n);
		}
		return (n, r) => (P(), l("div", { class: D(["mc-collapse", [W(Z)("mc-collapse", {
			"is-ghost": e.ghost,
			"is-separated": e.separated
		}, e.customClass)]]) }, [(P(!0), l(t, null, R(e.items, (t) => (P(), l("div", {
			key: t.key,
			class: D(["mc-collapse__item", {
				"is-open": g(t.key),
				"is-disabled": t.disabled,
				"mc-recipe-sheet": !e.ghost || e.separated
			}])
		}, [u("button", {
			id: f(t.key),
			class: "mc-collapse__trigger",
			type: "button",
			disabled: t.disabled,
			"aria-expanded": g(t.key),
			"aria-controls": m(t.key),
			"aria-disabled": t.disabled || void 0,
			onClick: (e) => _(t.key, t.disabled)
		}, [u("span", rc, [
			e.iconPosition === "left" ? (P(), s($, {
				key: 0,
				name: e.expandIcon,
				class: "mc-collapse__chevron is-left"
			}, null, 8, ["name"])) : c("", !0),
			t.icon ? (P(), s($, {
				key: 1,
				name: t.icon,
				class: "mc-collapse__icon"
			}, null, 8, ["name"])) : c("", !0),
			u("span", ic, [z(n.$slots, "title", { item: t }, () => [p(H(t.title), 1)], !0)])
		]), e.iconPosition === "right" ? (P(), s($, {
			key: 0,
			name: e.expandIcon,
			class: "mc-collapse__chevron"
		}, null, 8, ["name"])) : c("", !0)], 8, nc), u("div", {
			id: m(t.key),
			class: "mc-collapse__panel",
			role: "region",
			"aria-labelledby": f(t.key)
		}, [r[0] || (r[0] = u("span", {
			class: "mc-collapse__aurora",
			"aria-hidden": "true"
		}, null, -1)), u("div", oc, [u("div", sc, [z(n.$slots, "default", { item: t }, () => [p(H(t.content), 1)], !0)])])], 8, ac)], 2))), 128)), z(n.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-88a8ee7b"]]), lc = "cubic-bezier(0.34, 1.56, 0.64, 1)", uc = 320;
function dc(e, t) {
	if (typeof window > "u" || typeof document > "u") return t;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(e).trim() || t;
	} catch {
		return t;
	}
}
function fc(e = {}) {
	function t() {
		return U(e.direction) !== "horizontal";
	}
	function n() {
		return U(e.easing) ?? dc("--mc-ease-spring", lc);
	}
	function r() {
		let t = U(e.duration);
		if (t !== void 0) return t;
		let n = Number.parseFloat(dc("--mc-dur-base", String(uc)));
		return Number.isFinite(n) ? n : uc;
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
		o.style.transition = a(o), E(() => {
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
function pc() {
	let e = g(), t = e?.setupState, n = e?.slots.default?.() ?? [], i = n.length > 1 || t?.surface ? [y("div", {
		class: t?.classes,
		tabindex: t?.surface ? 0 : void 0
	}, [...t?.surface ? [y("span", {
		class: "mc-collapse-transition__aurora mc-aurora-inset",
		"aria-hidden": "true"
	}), y("span", {
		class: "mc-collapse-transition__edge",
		"aria-hidden": "true"
	})] : [], ...n])] : n;
	return y(r, {
		css: !1,
		...t?.hooks
	}, { default: () => i });
}
//#endregion
//#region src/components/collapse-transition/CollapseTransition.vue
var mc = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	render: pc,
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
			render: pc,
			props: t,
			hooks: fc({
				direction: () => t.direction,
				duration: () => t.duration
			}),
			classes: a(() => Z("mc-collapse-transition", `mc-collapse-transition--${t.direction}`, {
				"mc-collapse-transition--surface": t.surface,
				"mc-recipe-sheet": t.surface,
				"mc-sheen-sweep": t.surface,
				"is-disabled": t.disabled
			}, t.customClass))
		};
	}
}), [["__scopeId", "data-v-c1937697"]]), hc = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], gc = { class: "mc-color-picker__text" }, _c = ["id", "aria-label"], vc = { class: "mc-color-picker__preview" }, yc = { class: "mc-color-picker__preview-text" }, bc = { class: "mc-color-picker__preview-meta" }, xc = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], Sc = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], Cc = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-disabled"
], wc = { class: "mc-color-picker__row" }, Tc = { class: "mc-color-picker__hex-field mc-recipe-well" }, Ec = ["disabled", "aria-label"], Dc = {
	key: 0,
	class: "mc-color-picker__presets"
}, Oc = [
	"disabled",
	"aria-label",
	"onClick"
], kc = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiColorPicker",
	__name: "ColorPicker",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = rn(), f = Hn(), p = i, h = K(e, "modelValue"), g = Ln("mc-color-picker");
		function _(e, t, n) {
			return Math.min(Math.max(e, t), n);
		}
		function v(e, t, n) {
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
		function y(e, t, n) {
			let r = e / 255, i = t / 255, a = n / 255, o = Math.max(r, i, a), s = o - Math.min(r, i, a), c = 0;
			s !== 0 && (c = o === r ? (i - a) / s % 6 : o === i ? (a - r) / s + 2 : (r - i) / s + 4, c *= 60, c < 0 && (c += 360));
			let l = o === 0 ? 0 : s / o * 100;
			return {
				h: c,
				s: l,
				v: o * 100
			};
		}
		function b(e, t, n) {
			let r = e / 255, i = t / 255, a = n / 255, o = Math.max(r, i, a), s = Math.min(r, i, a), c = o - s, l = (o + s) / 2, u = 0, d = 0;
			return c !== 0 && (d = c / (1 - Math.abs(2 * l - 1)), u = o === r ? (i - a) / c % 6 : o === i ? (a - r) / c + 2 : (r - i) / c + 4, u *= 60, u < 0 && (u += 360)), {
				h: u,
				s: d * 100,
				l: l * 100
			};
		}
		function x(e, t, n) {
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
		function S(e) {
			let t = (e ?? "").trim().toLowerCase();
			if (!t) return null;
			if (t.startsWith("#")) {
				let e = t.slice(1);
				if (e.length === 3 || e.length === 4) {
					let t = parseInt(e[0] + e[0], 16), n = parseInt(e[1] + e[1], 16), r = parseInt(e[2] + e[2], 16), i = e.length === 4 ? parseInt(e[3] + e[3], 16) / 255 : 1;
					return {
						...y(t, n, r),
						a: i
					};
				}
				if (e.length === 6 || e.length === 8) {
					let t = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), r = parseInt(e.slice(4, 6), 16), i = e.length === 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1;
					return {
						...y(t, n, r),
						a: i
					};
				}
				return null;
			}
			let n = /^(rgba?|hsla?)\(([^)]+)\)$/.exec(t);
			if (!n) return null;
			let r = n[2].split(/[\s,/]+/).filter(Boolean), i = r.length > 3 ? _(parseFloat(r[3]), 0, 1) : 1;
			if (n[1] === "rgb" || n[1] === "rgba") return {
				...y(_(parseInt(r[0], 10) || 0, 0, 255), _(parseInt(r[1], 10) || 0, 0, 255), _(parseInt(r[2], 10) || 0, 0, 255)),
				a: i
			};
			let a = x(_(parseFloat(r[0]) || 0, 0, 360), _(parseFloat(r[1]) || 0, 0, 100), _(parseFloat(r[2]) || 0, 0, 100));
			return {
				...y(a.r, a.g, a.b),
				a: i
			};
		}
		function C(e, t, n) {
			let r = (e) => _(Math.round(e), 0, 255).toString(16).padStart(2, "0");
			return `#${r(e)}${r(t)}${r(n)}`;
		}
		let w = L(null), O = L(null), j = L(null), M = L(null), N = L(null), F = L(o.open), { style: I, transformOrigin: z, update: B, startAutoUpdate: V, stopAutoUpdate: U } = Cn(w, O, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: F })
		}), G = L({
			h: 340,
			s: 86,
			v: 62,
			a: 1
		}), te = L(""), re = null;
		q(() => o.open, (e) => {
			F.value = e, e ? E(() => {
				B(), V();
			}) : U();
		});
		function X() {
			let e = S(h.value);
			if (e) {
				G.value = e;
				let { r: t, g: n, b: r } = v(e.h, e.s, e.v);
				te.value = C(t, n, r);
			}
		}
		q(() => h.value, X, { immediate: !0 });
		let ae = a(() => v(G.value.h, G.value.s, G.value.v)), oe = a(() => b(ae.value.r, ae.value.g, ae.value.b)), se = a(() => {
			let { r: e, g: t, b: n } = ae.value, r = G.value.a;
			if (o.format === "rgb") return r < 1 ? `rgba(${e}, ${t}, ${n}, ${Number(r.toFixed(2))})` : `rgb(${e}, ${t}, ${n})`;
			if (o.format === "hsl") {
				let e = oe.value;
				return r < 1 ? `hsla(${Math.round(e.h)}, ${Math.round(e.s)}%, ${Math.round(e.l)}%, ${Number(r.toFixed(2))})` : `hsl(${Math.round(e.h)}, ${Math.round(e.s)}%, ${Math.round(e.l)}%)`;
			}
			if (o.showAlpha && r < 1) {
				let i = Math.round(r * 255).toString(16).padStart(2, "0");
				return `${C(e, t, n)}${i}`;
			}
			return C(e, t, n);
		}), ce = a(() => C(ae.value.r, ae.value.g, ae.value.b)), le = a(() => {
			let { r: e, g: t, b: n } = ae.value;
			return { background: `rgba(${e}, ${t}, ${n}, ${G.value.a})` };
		}), ue = a(() => [
			"linear-gradient(to top, hsl(0 0% 0% / 1), hsl(0 0% 0% / 0))",
			"linear-gradient(to right, hsl(0 0% 100% / 1), hsl(0 0% 100% / 0))",
			`hsl(${Math.round(G.value.h)} 100% 50%)`
		].join(", ")), de = a(() => {
			let e = [];
			for (let t = 0; t <= 6; t += 1) e.push(`hsl(${t * 60} 100% 50%)`);
			return `linear-gradient(to right, ${e.join(", ")})`;
		}), fe = a(() => {
			let { r: e, g: t, b: n } = ae.value;
			return `linear-gradient(to right, rgba(${e}, ${t}, ${n}, 0), rgba(${e}, ${t}, ${n}, 1))`;
		}), pe = a(() => ({
			left: `${G.value.s}%`,
			top: `${100 - G.value.v}%`,
			background: `hsl(${Math.round(G.value.h)} 100% 50%)`
		})), me = a(() => ({
			left: `${G.value.h / 360 * 100}%`,
			background: `hsl(${Math.round(G.value.h)} 100% 50%)`
		})), he = a(() => ({ left: `${G.value.a * 100}%` }));
		function ge(e) {
			o.disabled && e || F.value !== e && (F.value = e, p("update:open", e), e ? (p("open"), E(() => {
				B(), V();
			})) : (p("close"), U()));
		}
		function _e() {
			ge(!F.value);
		}
		function ve(e) {
			if (!F.value) return;
			let t = e.target;
			t && (w.value?.contains(t) || O.value?.contains(t) || ge(!1));
		}
		function ye(e, t) {
			let n = t.getBoundingClientRect();
			return _((e.clientX - n.left) / n.width, 0, 1);
		}
		function be(e) {
			let t = j.value;
			if (!t) return;
			let n = t.getBoundingClientRect(), r = _((e.clientX - n.left) / n.width, 0, 1), i = _((e.clientY - n.top) / n.height, 0, 1);
			G.value = {
				...G.value,
				s: r * 100,
				v: (1 - i) * 100
			}, Oe();
		}
		function xe(e) {
			let t = M.value;
			t && (G.value = {
				...G.value,
				h: ye(e, t) * 360
			}, Oe());
		}
		function Se(e) {
			let t = N.value;
			t && (G.value = {
				...G.value,
				a: ye(e, t)
			}, Oe());
		}
		function Ce(e, t) {
			o.disabled || (t.preventDefault(), re = e, e === "sv" ? be(t) : e === "hue" ? xe(t) : Se(t));
		}
		function we(e) {
			re && (re === "sv" ? be(e) : re === "hue" ? xe(e) : Se(e));
		}
		function Te() {
			re = null;
		}
		function Ee(e) {
			we(e);
		}
		function De() {
			Te();
		}
		ee(() => {
			document.addEventListener("mousedown", ve), window.addEventListener("pointermove", Ee), window.addEventListener("pointerup", De), window.addEventListener("pointercancel", De);
		}), A(() => {
			document.removeEventListener("mousedown", ve), window.removeEventListener("pointermove", Ee), window.removeEventListener("pointerup", De), window.removeEventListener("pointercancel", De), U();
		});
		function Oe() {
			h.value = se.value, p("change", se.value), te.value = ce.value;
		}
		function ke() {
			let e = S(te.value);
			e ? (G.value = e, Oe()) : te.value = ce.value;
		}
		function Ae(e) {
			let t = S(e);
			t && (G.value = t, Oe());
		}
		function je(e) {
			if (o.disabled) return;
			let t = e.shiftKey ? 10 : 2;
			if (e.key === "ArrowLeft") G.value = {
				...G.value,
				s: _(G.value.s - t, 0, 100)
			};
			else if (e.key === "ArrowRight") G.value = {
				...G.value,
				s: _(G.value.s + t, 0, 100)
			};
			else if (e.key === "ArrowUp") G.value = {
				...G.value,
				v: _(G.value.v + t, 0, 100)
			};
			else if (e.key === "ArrowDown") G.value = {
				...G.value,
				v: _(G.value.v - t, 0, 100)
			};
			else return;
			e.preventDefault(), Oe();
		}
		function Me(e) {
			if (o.disabled) return;
			let t = e.shiftKey ? 10 : 2;
			if (e.key === "ArrowLeft") G.value = {
				...G.value,
				h: (G.value.h - t + 360) % 360
			};
			else if (e.key === "ArrowRight") G.value = {
				...G.value,
				h: (G.value.h + t) % 360
			};
			else return;
			e.preventDefault(), Oe();
		}
		function Ne(e) {
			if (o.disabled) return;
			let t = e.shiftKey ? .1 : .02;
			if (e.key === "ArrowLeft" || e.key === "ArrowDown") G.value = {
				...G.value,
				a: _(G.value.a - t, 0, 1)
			};
			else if (e.key === "ArrowRight" || e.key === "ArrowUp") G.value = {
				...G.value,
				a: _(G.value.a + t, 0, 1)
			};
			else return;
			e.preventDefault(), Oe();
		}
		let Pe = a(() => typeof o.teleport == "string" ? o.teleport : "body"), Fe = a(() => Z("mc-color-picker", `mc-color-picker--${o.size}`, {
			"is-open": F.value,
			"is-disabled": o.disabled
		}, o.customClass));
		return (i, a) => (P(), l("div", { class: D(Fe.value) }, [u("button", {
			ref_key: "trigger",
			ref: w,
			type: "button",
			class: "mc-color-picker__trigger mc-recipe-well",
			disabled: e.disabled,
			"aria-disabled": e.disabled || void 0,
			"aria-expanded": F.value,
			"aria-haspopup": "dialog",
			"aria-controls": W(g),
			onClick: _e
		}, [
			u("span", {
				class: "mc-color-picker__swatch",
				style: k(le.value),
				"aria-hidden": "true"
			}, null, 4),
			u("span", gc, H(se.value), 1),
			m($, {
				name: "chevron-down",
				size: 13,
				class: "mc-color-picker__caret"
			}),
			a[4] || (a[4] = u("span", {
				class: "mc-color-picker__sheen",
				"aria-hidden": "true"
			}, null, -1))
		], 8, hc), (P(), s(n, {
			to: Pe.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [F.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: O,
				class: "mc-color-picker__panel",
				style: W(I)
			}, W(f), {
				id: W(g),
				role: "dialog",
				"aria-label": W(d).colorPicker?.picker ?? "colour picker"
			}), [u("div", {
				class: "mc-color-picker__inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(z) })
			}, [
				u("div", vc, [
					u("span", {
						class: "mc-color-picker__chip",
						style: k(le.value),
						"aria-hidden": "true"
					}, null, 4),
					u("span", yc, H(se.value), 1),
					u("span", bc, "alpha " + H(Math.round(G.value.a * 100)) + "%", 1)
				]),
				u("div", {
					ref_key: "svEl",
					ref: j,
					class: "mc-color-picker__sv mc-recipe-well mc-recipe-well-deep",
					style: k({ background: ue.value }),
					role: "slider",
					tabindex: e.disabled ? -1 : 0,
					"aria-label": W(d).colorPicker?.saturation ?? "saturation and brightness",
					"aria-valuenow": Math.round(G.value.s),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-disabled": e.disabled || void 0,
					onPointerdown: a[0] || (a[0] = (e) => Ce("sv", e)),
					onKeydown: je
				}, [u("span", {
					class: "mc-color-picker__knob",
					style: k(pe.value),
					"aria-hidden": "true"
				}, null, 4)], 44, xc),
				u("div", {
					ref_key: "hueEl",
					ref: M,
					class: "mc-color-picker__slider mc-recipe-well mc-recipe-well-deep",
					style: k({ background: de.value }),
					role: "slider",
					tabindex: e.disabled ? -1 : 0,
					"aria-label": W(d).colorPicker?.hue ?? "hue",
					"aria-valuenow": Math.round(G.value.h),
					"aria-valuemin": "0",
					"aria-valuemax": "360",
					"aria-orientation": "horizontal",
					"aria-disabled": e.disabled || void 0,
					onPointerdown: a[1] || (a[1] = (e) => Ce("hue", e)),
					onKeydown: Me
				}, [u("span", {
					class: "mc-color-picker__knob mc-color-picker__knob--bar",
					style: k(me.value),
					"aria-hidden": "true"
				}, null, 4)], 44, Sc),
				e.showAlpha ? (P(), l("div", {
					key: 0,
					ref_key: "alphaEl",
					ref: N,
					class: "mc-color-picker__slider mc-color-picker__slider--alpha mc-recipe-well mc-recipe-well-deep",
					style: k({ background: fe.value }),
					role: "slider",
					tabindex: e.disabled ? -1 : 0,
					"aria-label": W(d).colorPicker?.alpha ?? "alpha",
					"aria-valuenow": Math.round(G.value.a * 100),
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-orientation": "horizontal",
					"aria-disabled": e.disabled || void 0,
					onPointerdown: a[2] || (a[2] = (e) => Ce("alpha", e)),
					onKeydown: Ne
				}, [u("span", {
					class: "mc-color-picker__knob mc-color-picker__knob--bar",
					style: k(he.value),
					"aria-hidden": "true"
				}, null, 4)], 44, Cc)) : c("", !0),
				u("div", wc, [u("label", Tc, [a[5] || (a[5] = u("span", { class: "mc-color-picker__hex-label" }, "HEX", -1)), ie(u("input", {
					"onUpdate:modelValue": a[3] || (a[3] = (e) => te.value = e),
					class: "mc-color-picker__hex-input",
					spellcheck: "false",
					disabled: e.disabled,
					"aria-label": W(d).colorPicker?.hex ?? "hex value",
					onBlur: ke,
					onKeydown: Y(ke, ["enter"])
				}, null, 40, Ec), [[ne, te.value]])]), o.presets.length ? (P(), l("div", Dc, [(P(!0), l(t, null, R(o.presets, (t) => (P(), l("button", {
					key: t,
					type: "button",
					class: "mc-color-picker__preset",
					style: k({ background: t }),
					disabled: e.disabled,
					"aria-label": `use ${t}`,
					onClick: (e) => Ae(t)
				}, null, 12, Oc))), 128))])) : c("", !0)])
			], 4)], 16, _c)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-a84ad8a8"]]), Ac = ["aria-label"], jc = {
	key: 0,
	class: "mc-command-bar__side mc-command-bar__side--start"
}, Mc = { class: "mc-command-bar__main" }, Nc = {
	key: 1,
	class: "mc-command-bar__side mc-command-bar__side--end"
}, Pc = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => Z("mc-command-bar", `mc-command-bar--${t.position}`, `mc-command-bar--${t.tone}`, {
			"has-divider": t.divider,
			"has-accent": t.accent,
			"is-bleed": t.bleed
		}, t.customClass)), r = a(() => {
			let e = { "--mc-cb-inset": t.inset };
			return t.position !== "inline" && !t.bleed && (e.insetInline = t.inset), e;
		});
		return (t, i) => (P(), l("div", {
			class: D(n.value),
			style: k(r.value),
			role: "toolbar",
			"aria-label": e.label
		}, [u("div", { class: D(["mc-command-bar__inner", {
			"mc-sheen-sweep": e.tone === "glass",
			"mc-recipe-panel": e.tone === "glass",
			"mc-recipe-sheet": e.tone === "solid"
		}]) }, [
			i[0] || (i[0] = u("span", {
				class: "mc-command-bar__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			i[1] || (i[1] = u("span", {
				class: "mc-command-bar__grain",
				"aria-hidden": "true"
			}, null, -1)),
			t.$slots.start ? (P(), l("div", jc, [z(t.$slots, "start", {}, void 0, !0)])) : c("", !0),
			u("div", Mc, [z(t.$slots, "default", {}, void 0, !0)]),
			t.$slots.end ? (P(), l("div", Nc, [z(t.$slots, "end", {}, void 0, !0)])) : c("", !0)
		], 2)], 14, Ac));
	}
}), [["__scopeId", "data-v-7b67c692"]]), Fc = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function Ic(e) {
	let { enabled: t, container: n, autoFocus: r = !0, restoreFocus: i = !0, initialFocus: a, isTop: o } = e, s = null;
	function c(e) {
		if (e.key !== "Tab" || o && !o()) return;
		let t = n.value;
		if (!t) return;
		let r = Array.from(t.querySelectorAll(Fc)).filter((e) => e.offsetParent !== null || e === document.activeElement);
		if (r.length === 0) {
			e.preventDefault(), t.focus();
			return;
		}
		let i = r[0], a = r[r.length - 1];
		e.shiftKey && document.activeElement === i ? (e.preventDefault(), a.focus()) : !e.shiftKey && document.activeElement === a && (e.preventDefault(), i.focus());
	}
	q(t, (e) => {
		e ? (s = document.activeElement, document.addEventListener("keydown", c, !0), E(() => {
			let e = a?.value ?? n.value;
			r && e && (!o || o()) && (e.querySelector(Fc) ?? e).focus({ preventScroll: !0 });
		})) : (document.removeEventListener("keydown", c, !0), i && s && (s.focus({ preventScroll: !0 }), s = null));
	}, { flush: "post" }), A(() => {
		document.removeEventListener("keydown", c, !0);
	});
}
//#endregion
//#region src/composables/useScrollLock.ts
var Lc = 0, Rc = "", zc = "";
function Bc(e) {
	q(e, (e) => {
		e ? t() : n();
	}, { immediate: !0 });
	function t() {
		if (!At || Lc++ > 0) return;
		let e = document.body;
		Rc = e.style.overflow, zc = e.style.paddingRight;
		let t = window.innerWidth - document.documentElement.clientWidth;
		e.style.overflow = "hidden", t > 0 && (e.style.paddingRight = `${t}px`);
	}
	function n() {
		if (!At || Lc === 0 || (--Lc, Lc > 0)) return;
		let e = document.body;
		e.style.overflow = Rc, e.style.paddingRight = zc;
	}
	A(() => {
		if (Lc > 0) {
			Lc = 0;
			let e = document.body;
			e.style.overflow = Rc, e.style.paddingRight = zc;
		}
	});
}
//#endregion
//#region src/components/command-palette/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var Vc = ["aria-label"], Hc = { class: "mc-command__search mc-recipe-well" }, Uc = [
	"placeholder",
	"aria-controls",
	"aria-activedescendant"
], Wc = { class: "mc-command__hotkey" }, Gc = ["id"], Kc = {
	key: 0,
	class: "mc-command__group",
	role: "presentation"
}, qc = [
	"id",
	"data-active",
	"aria-selected",
	"aria-disabled",
	"onMouseenter",
	"onClick"
], Jc = { class: "mc-command__text" }, Yc = {
	class: "mc-command__title",
	"data-mc-type": "title"
}, Xc = {
	key: 0,
	class: "mc-command__subtitle"
}, Zc = {
	key: 1,
	class: "mc-command__shortcut"
}, Qc = {
	key: 0,
	class: "mc-command__empty"
}, $c = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = e, d = i, f = Hn(), h = Ln("mc-cmd"), g = L(null), _ = L(null), v = L(null), y = L(""), b = L(0), x = L(!!o.open), { isTop: S, isTopModal: C } = Pn({
			active: x,
			modal: !0
		}), w = jn({ active: x }), O = At && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent), k = a(() => o.hotkey ?? (O ? "⌘K" : "Ctrl K")), j = a(() => typeof o.teleport == "string" ? o.teleport : "body");
		function M(e) {
			return e.trim().toLowerCase();
		}
		let N = a(() => {
			let e = o.items ?? [], t = M(y.value);
			return t ? e.filter((e) => M(e.title).includes(t) || (e.subtitle ? M(e.subtitle).includes(t) : !1) || (e.group ? M(e.group).includes(t) : !1)) : e;
		}), F = a(() => {
			let e = [], t = /* @__PURE__ */ new Map(), n = 0;
			for (let r of N.value) {
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
		}), I = a(() => N.value);
		q(() => o.open, (e) => {
			x.value = e, e ? (y.value = "", b.value = 0, E(() => _.value?.focus()), d("open")) : d("close");
		}), q(y, () => {
			b.value = 0;
		});
		function z(e) {
			o.open !== e && d("update:open", e);
		}
		function B() {
			z(!1);
		}
		function V() {
			B();
		}
		function U(e) {
			e.disabled || (d("select", e), e.action?.(), B());
		}
		function G(e) {
			let t = I.value.length;
			t && (b.value = (b.value + e + t) % t, K());
		}
		function K() {
			E(() => {
				let e = v.value;
				if (!e) return;
				let t = e.querySelector("[data-active=\"true\"]");
				if (!t) return;
				let n = t.offsetTop, r = n + t.offsetHeight;
				n < e.scrollTop ? e.scrollTop = n : r > e.scrollTop + e.clientHeight && (e.scrollTop = r - e.clientHeight);
			});
		}
		function te(e) {
			if (e.key === "ArrowDown") e.preventDefault(), G(1);
			else if (e.key === "ArrowUp") e.preventDefault(), G(-1);
			else if (e.key === "Enter") {
				e.preventDefault();
				let t = I.value[b.value];
				t && U(t);
			} else e.key === "Escape" && S() && (e.preventDefault(), B());
		}
		function re(e) {
			e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), z(!o.open));
		}
		ee(() => {
			At && (document.addEventListener("keydown", re), x.value = o.open);
		}), A(() => {
			At && document.removeEventListener("keydown", re);
		}), Ic({
			enabled: x,
			container: g,
			autoFocus: !1,
			isTop: C
		}), Bc(x);
		let Y = a(() => `${h}-option-${b.value}`), X = a(() => Z("mc-command-palette", o.customClass));
		return (i, a) => (P(), s(n, {
			to: j.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-command" }, {
			default: J(() => [e.open ? (P(), l("div", T({
				key: 0,
				class: X.value,
				style: { "--mc-layer-z": W(w) }
			}, W(f)), [u("div", {
				class: "mc-command__backdrop",
				onClick: V
			}), u("div", {
				ref_key: "panel",
				ref: g,
				class: "mc-command__panel mc-grain-overlay mc-recipe-panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": e.label,
				onKeydown: te
			}, [
				a[2] || (a[2] = u("span", {
					class: "mc-command__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				u("div", Hc, [
					m($, {
						name: "search",
						size: 18,
						class: "mc-command__search-icon"
					}),
					ie(u("input", {
						ref_key: "input",
						ref: _,
						"onUpdate:modelValue": a[0] || (a[0] = (e) => y.value = e),
						class: "mc-command__input",
						type: "text",
						role: "combobox",
						autocomplete: "off",
						spellcheck: "false",
						placeholder: e.placeholder,
						"aria-expanded": !0,
						"aria-controls": `${W(h)}-list`,
						"aria-activedescendant": Y.value
					}, null, 8, Uc), [[ne, y.value]]),
					u("kbd", Wc, H(k.value), 1)
				]),
				u("div", {
					ref_key: "list",
					ref: v,
					id: `${W(h)}-list`,
					class: "mc-command__list",
					role: "listbox"
				}, [(P(!0), l(t, null, R(F.value, (e) => (P(), l(t, { key: e.name || "default" }, [e.name ? (P(), l("div", Kc, H(e.name), 1)) : c("", !0), (P(!0), l(t, null, R(e.rows, (e) => (P(), l("button", {
					id: `${W(h)}-option-${e.index}`,
					key: e.item.key,
					type: "button",
					role: "option",
					class: D(["mc-command__item mc-sheen-sweep", {
						"is-active": e.index === b.value,
						"is-disabled": e.item.disabled
					}]),
					"data-active": e.index === b.value ? "true" : "false",
					"aria-selected": e.index === b.value ? "true" : "false",
					"aria-disabled": e.item.disabled ? "true" : void 0,
					onMouseenter: (t) => b.value = e.index,
					onClick: (t) => U(e.item)
				}, [
					a[1] || (a[1] = u("span", {
						class: "mc-command__bar",
						"aria-hidden": "true"
					}, null, -1)),
					e.item.icon ? (P(), s($, {
						key: 0,
						name: e.item.icon,
						size: 17,
						class: "mc-command__icon"
					}, null, 8, ["name"])) : c("", !0),
					u("span", Jc, [u("span", Yc, H(e.item.title), 1), e.item.subtitle ? (P(), l("span", Xc, H(e.item.subtitle), 1)) : c("", !0)]),
					e.item.shortcut ? (P(), l("kbd", Zc, H(e.item.shortcut), 1)) : c("", !0)
				], 42, qc))), 128))], 64))), 128)), I.value.length ? c("", !0) : (P(), l("div", Qc, H(e.emptyText), 1))], 8, Gc),
				a[3] || (a[3] = u("div", { class: "mc-command__footer" }, [
					u("span", { class: "mc-command__hint" }, [
						u("kbd", null, "↑"),
						u("kbd", null, "↓"),
						p(" navigate")
					]),
					u("span", { class: "mc-command__hint" }, [u("kbd", null, "↵"), p(" select")]),
					u("span", { class: "mc-command__hint" }, [u("kbd", null, "esc"), p(" close")])
				], -1))
			], 40, Vc)], 16)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]));
	}
}), [["__scopeId", "data-v-490d1025"]]), el = (e, t, n) => Math.min(Math.max(e, t), n);
function tl(e) {
	let t = {};
	e.name && (t["--mc-theme-name"] = e.name), e.pack && (t["--mc-pack-name"] = e.pack), typeof e.hue == "number" && (t["--mc-h"] = String(el(e.hue, 0, 360))), typeof e.saturation == "number" && (t["--mc-s"] = `${el(e.saturation, 0, 100)}%`), typeof e.accentHue == "number" && (t["--mc-h2"] = String(el(e.accentHue, 0, 360))), typeof e.accentSaturation == "number" && (t["--mc-s2"] = `${el(e.accentSaturation, 0, 100)}%`), typeof e.tertiaryHue == "number" && (t["--mc-h3"] = String(el(e.tertiaryHue, 0, 360)));
	let n = e.effect;
	if (n) {
		if (typeof n.blur == "number" && (t["--mc-blur"] = `${n.blur}px`), typeof n.blurLarge == "number" && (t["--mc-blur-lg"] = `${n.blurLarge}px`), typeof n.saturation == "number" && (t["--mc-sat"] = String(n.saturation)), typeof n.glassAlpha == "number" && (t["--mc-glass-alpha"] = String(el(n.glassAlpha, 0, 1))), typeof n.radius == "number" && (t["--mc-radius-md"] = `${n.radius}px`, t["--mc-radius-lg"] = `${n.radius + 4}px`, t["--mc-radius-xl"] = `${n.radius + 10}px`, t["--mc-radius-2xl"] = `${n.radius + 18}px`, t["--mc-radius-3xl"] = `${n.radius + 26}px`), typeof n.radiusLarge == "number" && (t["--mc-radius-2xl"] = `${n.radiusLarge}px`, t["--mc-radius-3xl"] = `${n.radiusLarge + 8}px`), typeof n.squish == "number" && (t["--mc-squish"] = String(n.squish)), typeof n.lift == "number" && (t["--mc-lift"] = `${n.lift}px`), typeof n.sheenSpeed == "number" && (t["--mc-sheen-speed"] = `${n.sheenSpeed}ms`), typeof n.auroraSpeed == "number" && (t["--mc-aurora-speed"] = `${n.auroraSpeed}s`), typeof n.grainAlpha == "number" && (t["--mc-grain-alpha"] = String(n.grainAlpha)), typeof n.ringWidth == "number" && (t["--mc-ring-width"] = `${n.ringWidth}px`), typeof n.shadowScale == "number") {
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
function nl(e, t) {
	let n = tl(t);
	for (let [t, r] of Object.entries(n)) e.style.setProperty(t, r);
	t.colorMode && e.setAttribute("data-mc-color-mode", t.colorMode), t.name && e.setAttribute("data-mc-theme", t.name), t.pack ? e.setAttribute("data-mc-pack", t.pack) : e.removeAttribute("data-mc-pack"), t.density ? e.setAttribute("data-mc-density", t.density) : e.removeAttribute("data-mc-density"), t.motion ? e.setAttribute("data-mc-motion", t.motion) : e.removeAttribute("data-mc-motion"), rl(e);
}
function rl(e) {
	if (typeof window > "u" || !e || !e.style) return;
	let t = `hsl(${getComputedStyle(e).getPropertyValue("--mc-h").trim()} 42% 11%)`, n = (t, n) => {
		let r = document.createElement("span");
		r.setAttribute("aria-hidden", "true"), r.style.cssText = `position:absolute;inline-size:0;block-size:0;overflow:hidden;pointer-events:none;visibility:hidden;${t}:${n}`, e.appendChild(r);
		let i = getComputedStyle(r).getPropertyValue(t).trim();
		return r.remove(), i || n;
	}, r = (e) => vt(e, ["#ffffff", t]), i = (e) => e === t ? "hsl(var(--mc-h) 42% 11%)" : e, a = n("background-color", "var(--mc-primary)");
	if (a) {
		let t = r([a]);
		t && e.style.setProperty("--mc-on-primary", i(t));
	}
	let o = n("background-color", "var(--mc-accent)"), s = o ? r([o]) : void 0;
	s && (e.style.setProperty("--mc-on-solid", i(s)), e.style.setProperty("--mc-accent-contrast", i(s)), e.style.setProperty("--mc-on-solid-soft", s === t ? "hsl(var(--mc-h) 42% 11% / 0.86)" : "rgb(255 255 255 / 0.86)"), e.style.setProperty("--mc-on-solid-muted", s === t ? "hsl(var(--mc-h) 42% 11% / 0.62)" : "rgb(255 255 255 / 0.62)"));
	let c = _t(n("background-image", "var(--mc-gradient-brand)")), l = c.length ? r(c) : void 0;
	l && (e.style.setProperty("--mc-on-gradient", i(l)), e.style.setProperty("--mc-on-gradient-muted", l === t ? "hsl(var(--mc-h) 42% 11% / 0.62)" : "rgb(255 255 255 / 0.62)"));
}
var il = null;
function al(e) {
	if (typeof document > "u" || il) return;
	let t = e ?? document.documentElement;
	rl(t), il = new MutationObserver(() => rl(t)), il.observe(t, {
		attributes: !0,
		attributeFilter: ["data-mc-theme", "data-mc-color-mode"]
	}), t.addEventListener("transitionend", (e) => {
		let n = e.propertyName;
		(!n || n.startsWith("--mc-h")) && rl(t);
	});
}
function ol(e) {
	return e === "light" || e === "dark" ? e : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
var sl = [
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
], cl = [
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
function ll() {
	let e = L({
		name: "mochi",
		colorMode: "light"
	});
	return {
		theme: e,
		colorMode: a(() => ol(e.value.colorMode))
	};
}
//#endregion
//#region src/components/config-provider/ConfigProvider.vue
var ul = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(null), r = L(t.size ?? "medium"), i = L(t.zIndex), o = L(t.prefix), s = L(t.locale ?? an);
		q(() => t.size, (e) => {
			e && (r.value = e);
		}), q(() => t.zIndex, (e) => {
			typeof e == "number" && (i.value = e);
		}), q(() => t.locale, (e) => {
			e && (s.value = e);
		});
		let c = a(() => t.theme ? tl(t.theme) : {}), u = a(() => ol(t.theme?.colorMode)), d = a(() => {
			let e = {};
			return t.theme?.name && (e["data-mc-theme"] = t.theme.name), t.theme?.pack && (e["data-mc-pack"] = t.theme.pack), t.theme?.colorMode && (e["data-mc-color-mode"] = u.value), t.theme?.density && (e["data-mc-density"] = t.theme.density), t.theme?.motion && (e["data-mc-motion"] = t.theme.motion), t.density && (e["data-mc-density"] = t.density), t.motion && (e["data-mc-motion"] = t.motion), t.pack && (e["data-mc-pack"] = t.pack), e;
		}), f = a(() => ({ ...c.value })), p = [];
		return q([
			c,
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
			for (let t of p) t in c.value || e.style.removeProperty(t);
			p = [];
			for (let [t, n] of Object.entries(c.value)) e.style.setProperty(t, n), p.push(t);
			t.theme?.name && e.setAttribute("data-mc-theme", t.theme.name), e.setAttribute("data-mc-color-mode", u.value);
			let n = t.pack ?? t.theme?.pack;
			n ? e.setAttribute("data-mc-pack", n) : e.removeAttribute("data-mc-pack");
			let r = t.density ?? t.theme?.density, i = t.motion ?? t.theme?.motion;
			r ? e.setAttribute("data-mc-density", r) : e.removeAttribute("data-mc-density"), i ? e.setAttribute("data-mc-motion", i) : e.removeAttribute("data-mc-motion"), rl(e);
		}, { immediate: !0 }), q([
			c,
			u,
			() => t.theme?.name,
			() => t.theme?.pack,
			() => t.pack
		], () => {
			t.global || typeof document > "u" || E(() => {
				n.value && rl(n.value);
			});
		}, {
			immediate: !0,
			flush: "post"
		}), A(() => {
			if (!t.global || typeof document > "u") return;
			let e = document.documentElement;
			for (let t of p) e.style.removeProperty(t);
			p = [];
		}), nn(s), F(wn, {
			size: r,
			zIndex: i,
			prefix: o,
			locale: s,
			dark: a(() => u.value === "dark"),
			scopeAttrs: d,
			scopeStyle: c
		}), (t, r) => (P(), l("div", T({
			ref_key: "wrapper",
			ref: n,
			class: ["mc-config-provider", W(Z)(e.customClass)],
			style: f.value
		}, d.value), [z(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-3dfb4e23"]]), dl = ["aria-label"], fl = {
	class: "mc-countdown__inner",
	"aria-hidden": "true"
}, pl = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = L(Date.now()), s, c = !1;
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
		q(() => r.target, () => {
			c = !1, o.value = Date.now(), f();
		}, { immediate: !0 }), A(m);
		let h = a(() => Math.max(0, d() - o.value)), g = a(() => h.value <= 0);
		q(g, (e) => {
			e && !c && (c = !0, i("finish"), m());
		}, { immediate: !0 });
		let _ = a(() => {
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
		}), v = a(() => Z("mc-countdown", "mc-grain-overlay", `mc-countdown--${r.size}`, { "is-finished": g.value }, r.customClass)), y = a(() => {
			let e = Math.max(0, Math.floor(h.value / 1e3)), t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = e % 60, a = [];
			return t > 0 && a.push(`${t} day${t === 1 ? "" : "s"}`), n > 0 && a.push(`${n} hour${n === 1 ? "" : "s"}`), r > 0 && a.push(`${r} minute${r === 1 ? "" : "s"}`), a.push(`${i} second${i === 1 ? "" : "s"}`), a.join(" ");
		}), b = a(() => Ot(r.color) ? { color: Ot(r.color) } : void 0);
		return (e, n) => (P(), l("div", {
			class: D(v.value),
			style: k(b.value),
			role: "timer",
			"aria-live": "off",
			"aria-label": y.value
		}, [u("span", fl, [(P(!0), l(t, null, R(_.value, (e, t) => (P(), l("span", {
			key: `${t}-${e.kind}-${e.char}`,
			class: D(["mc-countdown__char", {
				"mc-countdown__char--digit": e.kind === "digit",
				"mc-countdown__char--sep": e.kind === "sep",
				"mc-sheen-sweep": e.kind === "digit"
			}])
		}, H(e.char), 3))), 128))])], 14, dl));
	}
}), [["__scopeId", "data-v-ddfa4066"]]);
//#endregion
//#region src/composables/useClickOutside.ts
function ml(e, t, n = {}) {
	let { event: r = "mousedown", ignore: i = [] } = n;
	function a(n) {
		let r = W(e);
		if (!r) return;
		let a = n.target;
		if (a && !r.contains(a)) {
			for (let e of i) {
				let t = x(e) ? e.value : e;
				if (t && t.contains(a)) return;
			}
			t(n);
		}
	}
	ee(() => {
		document.addEventListener(r, a, !0);
	}), A(() => {
		document.removeEventListener(r, a, !0);
	});
}
//#endregion
//#region src/components/data-table/useDataTable.ts
function hl(e, t) {
	let n = te(), r = rn(), i = a(() => {
		let e = r.value.dataTable;
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
	function o(e, t) {
		return e.replace(/\{(\w+)\}/g, (e, n) => n in t ? String(t[n]) : `{${n}}`);
	}
	let s = (e) => e.render ? e.render(e.row, e.index) : null, c = (e) => e.render ? e.render(e.column) : null;
	function l(t, n) {
		return typeof e.rowKey == "function" ? e.rowKey(t, n) : t?.[e.rowKey] ?? n;
	}
	let u = a(() => {
		let t = /* @__PURE__ */ new Map();
		return e.data.forEach((e, n) => t.set(e, l(e, n))), t;
	});
	function d(e) {
		let t = u.value.get(e);
		return t === void 0 ? "" : t;
	}
	let f = L({
		key: "",
		order: null
	}), p = L([]), m = a(() => e.sort ?? f.value), h = a(() => e.sorts ?? p.value);
	function g(t) {
		if (e.multiSort) {
			let e = h.value.find((e) => e.key === t.key);
			return {
				order: e?.order ?? null,
				priority: e?.priority ?? 0
			};
		}
		return {
			order: m.value.key === t.key ? m.value.order : null,
			priority: 1
		};
	}
	function _(n) {
		if (!n.sortable) return;
		if (!e.multiSort) {
			let e = m.value, r = e.key === n.key && e.order === "asc" ? "desc" : "asc", i = {
				key: n.key,
				order: r
			};
			f.value = i, t("update:sort", i), t("sort-change", i);
			return;
		}
		let r = h.value.map((e) => ({ ...e })), i = r.findIndex((e) => e.key === n.key);
		if (i >= 0) {
			let e = r[i];
			e.order === "asc" ? r[i] = {
				key: n.key,
				order: "desc",
				priority: e.priority ?? i + 1
			} : r.splice(i, 1);
		} else r.push({
			key: n.key,
			order: "asc",
			priority: r.length + 1
		});
		let a = r.map((e, t) => ({
			...e,
			priority: t + 1
		}));
		if (p.value = a, t("update:sorts", a), t("sorts-change", a), a.length) {
			let e = {
				key: a[0].key,
				order: a[0].order,
				priority: 1
			};
			t("update:sort", e), t("sort-change", e);
		}
	}
	let v = a(() => {
		let t = e.multiSort ? h.value.filter((e) => e.key && e.order) : m.value?.key && m.value?.order ? [m.value] : [];
		return t.length ? [...e.data].sort((e, n) => {
			for (let r of t) {
				let t = e?.[r.key], i = n?.[r.key], a = 0;
				if (a = t === i ? 0 : t == null ? 1 : i == null ? -1 : t > i ? 1 : -1, a !== 0) return a * (r.order === "asc" ? 1 : -1);
			}
			return 0;
		}) : e.data;
	}), y = L(null);
	q([m, h], () => {
		y.value = null;
	}), q(() => e.data, (e) => {
		let t = y.value;
		if (!t || !t.length) return;
		let n = new Set(e.map((e, t) => l(e, t))), r = t.filter((e) => n.has(e)), i = new Set(r), a = e.map((e, t) => l(e, t)).filter((e) => !i.has(e));
		y.value = [...r, ...a];
	});
	let b = a(() => {
		let e = y.value, t = v.value;
		if (!e || !e.length) return t;
		let n = /* @__PURE__ */ new Map();
		e.forEach((e, t) => n.set(e, t));
		let r = [], i = [];
		for (let e of t) {
			let t = d(e);
			n.has(t) ? r.push(e) : i.push(e);
		}
		return r.sort((e, t) => (n.get(d(e)) ?? 0) - (n.get(d(t)) ?? 0)), [...r, ...i];
	}), x = L(1), S = L(10);
	q(() => e.pagination, (e) => {
		e && typeof e == "object" && (e.page !== void 0 && (x.value = e.page), e.pageSize !== void 0 && (S.value = e.pageSize));
	}, {
		immediate: !0,
		deep: !0
	});
	let C = a(() => {
		if (!e.pagination) return null;
		let t = typeof e.pagination == "object" ? e.pagination : {};
		return {
			page: x.value,
			pageSize: S.value,
			total: t.total ?? e.data.length
		};
	}), w = a(() => {
		let e = C.value;
		return e ? Math.max(1, Math.ceil(e.total / Math.max(1, e.pageSize))) : 1;
	}), T = a(() => {
		let e = C.value;
		if (!e) return b.value;
		let t = (e.page - 1) * e.pageSize;
		return b.value.slice(t, t + e.pageSize);
	});
	q(w, (e) => {
		x.value > e && D(e);
	});
	function D(n) {
		let r = Math.min(Math.max(1, n), w.value);
		x.value = r, (e.pagination && typeof e.pagination == "object" ? e.pagination : null)?.onChange?.(r, S.value), t("update:page", r), t("page-change", r, S.value);
	}
	function O(n) {
		S.value = n, x.value = 1, (e.pagination && typeof e.pagination == "object" ? e.pagination : null)?.onChange?.(1, n), t("update:pageSize", n), t("update:page", 1), t("page-change", 1, n);
	}
	function k(e) {
		let t = e.target, n = Number(t?.value);
		Number.isFinite(n) && O(n);
	}
	let j = [
		10,
		20,
		50,
		100
	], M = a(() => {
		let e = [...j];
		return e.includes(S.value) || e.push(S.value), e.sort((e, t) => e - t);
	}), N = a(() => {
		let e = w.value, t = x.value, n = [], r = 0;
		for (let i = 1; i <= e; i += 1) (i === 1 || i === e || Math.abs(i - t) <= 1) && (r && i - r > 1 && n.push("…"), n.push(i), r = i);
		return n;
	}), P = a(() => e.virtual ? typeof e.virtual == "object" ? e.virtual : {} : null), F = a(() => P.value !== null), I = a(() => Math.max(24, P.value?.rowHeight ?? 44)), R = a(() => Math.max(0, P.value?.overscan ?? 6)), z = L(null), B = L(null), V = L(0), H = L(0), U = L(0);
	function W() {
		let e = z.value;
		e && (V.value = e.scrollTop);
	}
	function G() {
		let e = z.value;
		e && (H.value = e.clientHeight, U.value = B.value?.offsetHeight ?? 0);
	}
	ee(() => {
		G(), typeof window < "u" && window.addEventListener("resize", G);
	}), A(() => {
		typeof window < "u" && window.removeEventListener("resize", G);
	}), q(F, (e) => {
		e ? E(() => {
			G();
			let e = z.value;
			e && (e.scrollTop = 0);
		}) : V.value = 0;
	}), q(x, () => {
		V.value = 0;
		let e = z.value;
		e && (e.scrollTop = 0);
	});
	let K = a(() => {
		let e = T.value.length, t = I.value, n = R.value, r = Math.ceil((H.value || t * 8) / t) + 1, i = Math.max(0, V.value - U.value), a = Math.min(Math.max(0, Math.floor(i / t) - n), Math.max(0, e - 1)), o = Math.min(e, a + r + n * 2);
		return {
			total: e,
			start: a,
			end: o,
			padTop: a * t,
			padBottom: Math.max(0, (e - o) * t),
			height: t
		};
	}), ne = L(null), re = L(null), J = L("before"), ie = /* @__PURE__ */ new Map(), Y = /* @__PURE__ */ new Map();
	function X(e) {
		let t = Y.get(e);
		return t || (t = (t) => {
			t ? ie.set(e, t) : ie.delete(e);
		}, Y.set(e, t)), t;
	}
	function ae() {
		ne.value = null, re.value = null, J.value = "before";
	}
	function oe(t, n) {
		e.rowDraggable && (ne.value = t, n.dataTransfer && (n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("text/plain", String(t))));
	}
	function se(e) {
		let t = e.currentTarget;
		if (!t) return "before";
		let n = t.getBoundingClientRect();
		return e.clientY < n.top + n.height / 2 ? "before" : "after";
	}
	function ce(e, t) {
		ne.value !== null && ne.value !== e && (t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = "move"), re.value = e, J.value = se(t));
	}
	function le(e, t) {
		if (ne.value === null) return;
		t.preventDefault();
		let n = ne.value, r = se(t);
		ae();
		let i = r === "before" ? e : e + 1;
		n < i && --i, i !== n && de(n, i);
	}
	function ue() {
		ae();
	}
	function de(e, n) {
		let r = T.value;
		if (e === n || e < 0 || n < 0 || e >= r.length || n >= r.length) return;
		let i = b.value.map(d), a = C.value ? (C.value.page - 1) * C.value.pageSize : 0, o = i.slice(a, a + r.length);
		if (o.length <= 1) return;
		let s = o.splice(e, 1)[0];
		if (s === void 0) return;
		o.splice(n, 0, s);
		let c = [...i];
		c.splice(a, o.length, ...o), y.value = c, t("row-reorder", e, n, r);
	}
	function fe(t, n, r) {
		if (!e.rowDraggable || !r.altKey || r.key !== "ArrowUp" && r.key !== "ArrowDown") return;
		r.preventDefault();
		let i = r.key === "ArrowUp" ? t - 1 : t + 1;
		i < 0 || i >= T.value.length || (de(t, i), E(() => {
			ie.get(n)?.focus();
		}));
	}
	let pe = L([]), me = a(() => e.selectedKeys ?? pe.value);
	function he(e) {
		pe.value = e, t("update:selectedKeys", e), t("selection-change", e);
	}
	let ge = a(() => T.value.map((e) => d(e))), _e = a(() => ge.value.length > 0 && ge.value.every((e) => me.value.includes(e))), ve = a(() => ge.value.some((e) => me.value.includes(e))), ye = a(() => ve.value && !_e.value);
	function be(e) {
		return me.value.includes(e);
	}
	function xe(e) {
		he(me.value.includes(e) ? me.value.filter((t) => t !== e) : [...me.value, e]);
	}
	function Se() {
		_e.value ? he(me.value.filter((e) => !ge.value.includes(e))) : he(Array.from(/* @__PURE__ */ new Set([...me.value, ...ge.value])));
	}
	let Ce = L([]), we = a(() => e.expandedKeys ?? Ce.value);
	function Te(t) {
		return typeof e.expandable == "function" ? !!e.expandable(t) : e.expandable ? Array.isArray(t?.children) ? t.children.length > 0 : t?.expandable === !0 : !1;
	}
	let Ee = a(() => e.data.filter(Te).map((e) => d(e))), De = a(() => !!e.expandable && !F.value), Oe = !1;
	q(() => e.data, () => {
		Oe || e.expandedKeys || e.data.length && (Oe = !0, Ce.value = Array.from(new Set(e.defaultExpandAll ? Ee.value : e.defaultExpandedKeys ?? [])));
	}, { immediate: !0 });
	function ke(e) {
		return we.value.includes(e);
	}
	function Ae(e) {
		let n = !ke(e), r = n ? [...we.value, e] : we.value.filter((t) => t !== e);
		Ce.value = r, t("update:expandedKeys", r), t("expand-change", e, n);
	}
	let je = L([]);
	function Me() {
		let t = [...e.defaultHiddenColumns ?? []];
		for (let n of e.columns) n.hidden && !t.includes(n.key) && t.push(n.key);
		return t;
	}
	let Ne = !1;
	q(() => e.columns, () => {
		Ne || (Ne = !0, je.value = Me());
	}, {
		immediate: !0,
		deep: !0
	});
	let Pe = a(() => e.hiddenColumns ?? je.value), Fe = a(() => e.columns.map((e, t) => ({
		col: e,
		ci: t
	})).filter(({ col: e }) => !Pe.value.includes(e.key)));
	function Ie(e) {
		return Pe.value.includes(e.key);
	}
	function Le(e) {
		if (e.hideable === !1) return;
		let n = Pe.value.includes(e.key) ? Pe.value.filter((t) => t !== e.key) : [...Pe.value, e.key];
		je.value = n, t("update:hiddenColumns", n);
	}
	function Re() {
		let e = Me();
		je.value = e, t("update:hiddenColumns", e);
	}
	let ze = L(!1), Be = L(null), Ve = L(null);
	ml(Be, () => {
		ze.value = !1;
	}, { ignore: [Ve] });
	let He = a(() => {
		let t = [];
		for (let n of Fe.value) {
			let r = e.columnGroups?.some((e) => (e.columns ?? []).includes(n.col.key)), i = n.col.group && r ? n.col.group : void 0, a = t[t.length - 1];
			if (i) {
				if (a && a.type === "group" && a.title === i) a.cols.push(n);
				else {
					let r = e.columnGroups?.find((e) => e.title === i);
					t.push({
						type: "group",
						title: i,
						align: r?.align,
						cols: [n]
					});
				}
			} else t.push({
				type: "solo",
				cols: [n]
			});
		}
		return {
			runs: t,
			hasGroups: t.some((e) => e.type === "group")
		};
	});
	q([He, Fe], () => E(G));
	let Ue = L({}), We = L(null);
	function Ge(e) {
		let t = Ue.value[e.key];
		if (t !== void 0) return t;
		if (typeof e.width == "number") return e.width;
		if (typeof e.width == "string") {
			let t = parseFloat(e.width);
			return Number.isFinite(t) ? t : void 0;
		}
	}
	function Ke(e) {
		return Ge(e) ?? 140;
	}
	function qe(e) {
		let t = Ge(e);
		if (t !== void 0) return { width: `${t}px` };
	}
	let Je = a(() => Fe.value.map(({ col: e }) => qe(e))), Ye = a(() => Fe.value.some(({ col: e }) => !!e.fixed)), Xe = a(() => {
		let t = 0;
		return e.rowDraggable && (t += 40), e.selection && (t += 46), De.value && (t += 46), t;
	}), Ze = a(() => ({
		left: "0px",
		width: "40px",
		minWidth: "40px"
	})), Qe = a(() => ({
		left: e.rowDraggable ? "40px" : "0px",
		width: "46px",
		minWidth: "46px"
	})), $e = a(() => ({
		left: `${Xe.value - 46}px`,
		width: "46px",
		minWidth: "46px"
	})), et = a(() => {
		let e = /* @__PURE__ */ new Map(), t = Xe.value, n = Fe.value.filter(({ col: e }) => e.fixed === "right"), r = n.reduce((e, { col: t }) => e + Ke(t), 0), i = 0, a = /* @__PURE__ */ new Map();
		n.forEach(({ col: e }) => {
			i += Ke(e), a.set(e.key, r - i);
		});
		for (let { col: n } of Fe.value) {
			let r = {}, i = Ge(n);
			i !== void 0 && (r.width = `${i}px`, r.minWidth = `${i}px`), n.fixed === "left" ? (r.left = `${t}px`, t += Ke(n)) : n.fixed === "right" && (r.right = `${a.get(n.key) ?? 0}px`), e.set(n.key, r);
		}
		return e;
	});
	function tt(n, r) {
		if (!e.resizable) return;
		r.preventDefault(), r.stopPropagation();
		let i = r.clientX, a = Ge(n) ?? 140, o = n.minWidth ?? 72, s = n.maxWidth ?? 720;
		We.value = n.key;
		let c = (e) => {
			let t = Math.min(Math.max(a + (e.clientX - i), o), s);
			Ue.value = {
				...Ue.value,
				[n.key]: Math.round(t)
			};
		}, l = () => {
			We.value = null, window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", l), t("column-resize", n.key, Ue.value[n.key] ?? a);
		};
		window.addEventListener("pointermove", c), window.addEventListener("pointerup", l);
	}
	let nt = a(() => Fe.value.length + +!!e.rowDraggable + +!!e.selection + +!!De.value);
	function rt(e) {
		return (e.key ? [e.key, ...e.slots ?? []] : [...e.slots ?? []]).find((e) => !!n[e]);
	}
	let it = a(() => {
		let e = C.value ? (C.value.page - 1) * C.value.pageSize : 0, t = F.value ? K.value : null, n = t ? T.value.slice(t.start, t.end) : T.value, r = t ? t.start : 0;
		return n.map((t, n) => ({
			row: t,
			index: e + r + n,
			viewIndex: r + n,
			key: d(t),
			cells: Fe.value.map(({ col: e }) => ({
				col: e,
				slotName: rt(e),
				value: t?.[e.key]
			}))
		}));
	}), at = a(() => {
		if (!e.summary) return null;
		if (typeof e.summary == "object") return e.summary;
		let t = {};
		for (let n of e.columns) n.summary && (t[n.key] = n.summary);
		return Object.keys(t).length ? { columns: t } : null;
	}), ot = a(() => e.summaryScope === "page" ? T.value : b.value);
	function st(e, t = 0) {
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
	function ct(e) {
		let t = at.value?.columns?.[e.key];
		if (!t) return "";
		let n = ot.value;
		if (typeof t == "function") return String(t(n));
		let r = n.map((t) => Number(t?.[e.key])).filter((e) => Number.isFinite(e));
		switch (t) {
			case "count": return st(n.length);
			case "sum": return st(r.reduce((e, t) => e + t, 0));
			case "avg": return r.length ? st(r.reduce((e, t) => e + t, 0) / r.length, 2) : "—";
			case "min": return r.length ? st(Math.min(...r)) : "—";
			case "max": return r.length ? st(Math.max(...r)) : "—";
			default: return "";
		}
	}
	let lt = a(() => e.batchActions && e.selection && me.value.length > 0), ut = a(() => e.empty || r.value.table.empty), dt = a(() => e.batchLabel ? o(e.batchLabel, { count: me.value.length }) : o(i.value.selected, { count: me.value.length }));
	function ft() {
		he([]);
	}
	let pt = a(() => Z("mc-data-table", "mc-recipe-sheet", "mc-grain-overlay", `mc-data-table--${e.size}`, {
		"is-striped": e.stripe,
		"is-bordered": e.bordered,
		"is-loading": e.loading,
		"is-batching": lt.value,
		"has-toolbar": e.columnVisibility,
		"is-virtual": F.value,
		"is-draggable": e.rowDraggable
	}, e.customClass)), mt = a(() => {
		if (e.maxHeight !== void 0) return { maxHeight: typeof e.maxHeight == "number" ? `${e.maxHeight}px` : e.maxHeight };
		if (F.value) return { maxHeight: "420px" };
	});
	function ht(e) {
		let t = Ue.value[e.key];
		return typeof t == "number" ? t : typeof e.width == "number" ? e.width : typeof e.width == "string" && /^\d+(\.\d+)?$/.test(e.width.trim()) ? Number(e.width) : 140;
	}
	let gt = a(() => {
		if (!Ye.value) return;
		let e = Fe.value.reduce((e, { col: t }) => e + ht(t), 0);
		return `${Xe.value + e}px`;
	});
	return {
		slots: n,
		t: i,
		page: x,
		pageSize: S,
		goToPage: D,
		setPageSize: O,
		onPageSizeChange: k,
		pageCount: w,
		pageItems: N,
		pageSizeOptions: M,
		paginationConfig: C,
		sortedData: v,
		orderedData: b,
		pagedData: T,
		virtualWindow: K,
		virtualEnabled: F,
		virtualViewportHeight: H,
		headHeight: U,
		measureViewport: G,
		onViewportScroll: W,
		viewportRef: z,
		headRef: B,
		dragFrom: ne,
		dragOverIndex: re,
		dragOverEdge: J,
		onDragStart: oe,
		onDragOver: ce,
		onDrop: le,
		onDragEnd: ue,
		onHandleKeydown: fe,
		handleRef: X,
		selected: me,
		allSelected: _e,
		isIndeterminate: ye,
		isRowSelected: be,
		toggleRow: xe,
		toggleAll: Se,
		clearSelection: ft,
		expanded: we,
		isExpandableRow: Te,
		isExpanded: ke,
		toggleExpand: Ae,
		showExpandColumn: De,
		columnMenuOpen: ze,
		columnMenuRef: Be,
		columnButtonRef: Ve,
		visibleCols: Fe,
		isColumnHidden: Ie,
		toggleColumn: Le,
		resetColumns: Re,
		headerRuns: He,
		resizedWidths: Ue,
		resizingKey: We,
		startResize: tt,
		columnWidths: Je,
		columnStyleMap: et,
		hasFixedColumns: Ye,
		utilityOffset: Xe,
		dragColStyle: Ze,
		selectColStyle: Qe,
		expandColStyle: $e,
		DRAG_COL_WIDTH: 40,
		SELECT_COL_WIDTH: 46,
		EXPAND_COL_WIDTH: 46,
		totalColumns: nt,
		resolvedRows: it,
		summaryConfig: at,
		summaryValue: ct,
		summaryRows: ot,
		formatNumberSafe: st,
		batchVisible: lt,
		batchText: dt,
		emptyText: ut,
		classes: pt,
		scrollStyle: mt,
		tableStyle: a(() => {
			let e = {};
			return F.value && (e["--mc-dt-vrow-h"] = `${K.value.height}px`), gt.value && (e.minWidth = gt.value), Object.keys(e).length ? e : void 0;
		}),
		tableMinWidth: gt,
		resolveKey: l,
		keyOf: d,
		sortStateOf: g,
		onSort: _,
		RenderCell: s,
		RenderHeader: c,
		fill: o
	};
}
//#endregion
//#region src/components/data-table/DataTable.vue?vue&type=script&setup=true&lang.ts
var gl = {
	key: 0,
	class: "mc-data-table__toolbar"
}, _l = { class: "mc-data-table__toolbar-lead" }, vl = { class: "mc-data-table__toolbar-title" }, yl = { class: "mc-data-table__toolbar-tail" }, bl = ["aria-expanded"], xl = { class: "mc-data-table__column-menu-title" }, Sl = [
	"checked",
	"disabled",
	"onChange"
], Cl = { class: "mc-data-table__column-label" }, wl = {
	key: 0,
	class: "mc-data-table__head-row mc-data-table__head-row--group"
}, Tl = { class: "mc-visually-hidden" }, El = { class: "mc-data-table__checkbox" }, Dl = [
	"checked",
	".indeterminate",
	"aria-label"
], Ol = { class: "mc-visually-hidden" }, kl = ["colspan"], Al = {
	key: 0,
	class: "mc-data-table__group-title"
}, jl = { class: "mc-visually-hidden" }, Ml = { class: "mc-data-table__checkbox" }, Nl = [
	"checked",
	".indeterminate",
	"aria-label"
], Pl = { class: "mc-visually-hidden" }, Fl = ["aria-sort"], Il = ["aria-label", "onClick"], Ll = { class: "mc-data-table__th-text" }, Rl = {
	key: 0,
	class: "mc-data-table__sort-priority",
	"aria-hidden": "true"
}, zl = {
	key: 2,
	class: "mc-data-table__th-text"
}, Bl = ["aria-label", "onPointerdown"], Vl = { class: "mc-data-table__body" }, Hl = {
	key: 0,
	class: "mc-data-table__spacer-row"
}, Ul = ["colspan"], Wl = [
	"onClick",
	"onKeydown",
	"onDragover",
	"onDrop"
], Gl = [
	"aria-label",
	"onKeydown",
	"onDragstart"
], Kl = { class: "mc-data-table__checkbox" }, ql = [
	"checked",
	"aria-label",
	"onChange"
], Jl = [
	"aria-expanded",
	"aria-label",
	"onClick"
], Yl = {
	key: 0,
	class: "mc-data-table__cell-clip"
}, Xl = {
	key: 0,
	class: "mc-data-table__expand-row"
}, Zl = ["colspan"], Ql = { class: "mc-data-table__expand-inner" }, $l = { class: "mc-data-table__expand-json" }, eu = {
	key: 1,
	class: "mc-data-table__spacer-row"
}, tu = ["colspan"], nu = {
	key: 2,
	class: "mc-data-table__row mc-data-table__row--empty"
}, ru = ["colspan"], iu = {
	class: "mc-data-table__empty-icon mc-recipe-well",
	"aria-hidden": "true"
}, au = { class: "mc-data-table__empty-text" }, ou = {
	key: 0,
	class: "mc-data-table__foot"
}, su = { class: "mc-data-table__foot-row" }, cu = {
	key: 0,
	class: "mc-data-table__foot-label"
}, lu = {
	key: 1,
	class: "mc-data-table__foot-value"
}, uu = {
	key: 1,
	class: "mc-data-table__loading",
	role: "status",
	"aria-live": "polite"
}, du = { class: "mc-visually-hidden" }, fu = {
	key: 2,
	class: "mc-data-table__footer"
}, pu = { class: "mc-data-table__total" }, mu = ["aria-label"], hu = ["disabled", "aria-label"], gu = {
	key: 0,
	class: "mc-data-table__ellipsis"
}, _u = ["aria-current", "onClick"], vu = ["disabled", "aria-label"], yu = { class: "mc-data-table__size" }, bu = { class: "mc-visually-hidden" }, xu = ["value"], Su = ["value"], Cu = {
	key: 0,
	class: "mc-data-table__batch mc-recipe-panel",
	role: "region",
	"aria-live": "polite"
}, wu = { class: "mc-data-table__batch-count" }, Tu = { class: "mc-data-table__batch-actions" }, Eu = ["aria-label"], Du = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let i = e, a = n, { slots: o, t: d, page: f, pageSize: h, goToPage: g, setPageSize: _, onPageSizeChange: v, pageCount: y, pageItems: b, pageSizeOptions: x, paginationConfig: S, sortedData: C, orderedData: w, pagedData: T, virtualWindow: E, virtualEnabled: O, virtualViewportHeight: A, headHeight: j, measureViewport: ee, onViewportScroll: M, viewportRef: N, headRef: F, dragFrom: I, dragOverIndex: L, dragOverEdge: B, onDragStart: V, onDragOver: U, onDrop: G, onDragEnd: K, onHandleKeydown: te, handleRef: ne, selected: re, allSelected: q, isIndeterminate: ie, isRowSelected: ae, toggleRow: oe, toggleAll: se, clearSelection: ce, expanded: le, isExpandableRow: ue, isExpanded: de, toggleExpand: fe, showExpandColumn: pe, columnMenuOpen: me, columnMenuRef: he, columnButtonRef: ge, visibleCols: _e, isColumnHidden: ve, toggleColumn: ye, resetColumns: be, headerRuns: xe, resizingKey: Se, startResize: Ce, columnWidths: we, columnStyleMap: Te, hasFixedColumns: Ee, utilityOffset: De, dragColStyle: Oe, selectColStyle: ke, expandColStyle: Ae, DRAG_COL_WIDTH: je, SELECT_COL_WIDTH: Me, EXPAND_COL_WIDTH: Ne, totalColumns: Pe, resolvedRows: Fe, summaryConfig: Ie, summaryValue: Le, summaryRows: Re, formatNumberSafe: ze, batchVisible: Be, batchText: Ve, emptyText: He, classes: Ue, scrollStyle: We, tableStyle: Ge, tableMinWidth: Ke, resolveKey: qe, keyOf: Je, sortStateOf: Ye, onSort: Xe, RenderCell: Ze, RenderHeader: Qe, fill: $e } = hl(i, a);
		return (n, i) => (P(), l("div", { class: D(W(Ue)) }, [
			e.columnVisibility ? (P(), l("div", gl, [
				u("div", _l, [u("span", vl, H(W(d).columns), 1)]),
				u("div", yl, [u("button", {
					ref_key: "columnButtonRef",
					ref: ge,
					type: "button",
					class: "mc-data-table__tool-btn",
					"aria-expanded": W(me),
					"aria-haspopup": "true",
					onClick: i[0] || (i[0] = (e) => me.value = !W(me))
				}, [m($, {
					name: "columns",
					size: 15,
					"stroke-width": 2
				}), u("span", null, H(W(d).columns), 1)], 8, bl)]),
				W(me) ? (P(), l("div", {
					key: 0,
					ref_key: "columnMenuRef",
					ref: he,
					class: "mc-data-table__column-menu mc-recipe-panel"
				}, [
					u("p", xl, H(W(d).visibleColumns), 1),
					(P(!0), l(t, null, R(e.columns, (e) => (P(), l("label", {
						key: e.key,
						class: D(["mc-data-table__column-item", {
							"is-hidden": W(ve)(e),
							"is-locked": e.hideable === !1
						}])
					}, [u("input", {
						class: "mc-data-table__column-check",
						type: "checkbox",
						checked: !W(ve)(e),
						disabled: e.hideable === !1,
						onChange: (t) => W(ye)(e)
					}, null, 40, Sl), u("span", Cl, H(e.title ?? e.key), 1)], 2))), 128)),
					u("button", {
						type: "button",
						class: "mc-data-table__column-reset",
						onClick: i[1] || (i[1] = (...e) => W(be) && W(be)(...e))
					}, H(W(d).reset), 1)
				], 512)) : c("", !0)
			])) : c("", !0),
			u("div", {
				ref_key: "viewportRef",
				ref: N,
				class: "mc-data-table__viewport mc-scroll",
				style: k(W(We)),
				onScrollPassive: i[7] || (i[7] = (...e) => W(M) && W(M)(...e))
			}, [u("table", {
				class: D(["mc-data-table__table", { "is-fixed-layout": W(Ee) }]),
				style: k(W(Ge))
			}, [
				u("colgroup", null, [
					e.rowDraggable ? (P(), l("col", {
						key: 0,
						style: k({ width: `${W(je)}px` })
					}, null, 4)) : c("", !0),
					e.selection ? (P(), l("col", {
						key: 1,
						style: k({ width: `${W(Me)}px` })
					}, null, 4)) : c("", !0),
					W(pe) ? (P(), l("col", {
						key: 2,
						style: k({ width: `${W(Ne)}px` })
					}, null, 4)) : c("", !0),
					(P(!0), l(t, null, R(W(we), (e, t) => (P(), l("col", {
						key: W(_e)[t]?.col.key ?? t,
						style: k(e)
					}, null, 4))), 128))
				]),
				u("thead", {
					ref_key: "headRef",
					ref: F,
					class: "mc-data-table__head"
				}, [W(xe).hasGroups ? (P(), l("tr", wl, [
					e.rowDraggable ? (P(), l("th", {
						key: 0,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(Oe))
					}, [u("span", Tl, H(W(d).dragColumn), 1)], 4)) : c("", !0),
					e.selection ? (P(), l("th", {
						key: 1,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(ke))
					}, [u("span", El, [u("input", {
						class: D(["mc-data-table__checkbox-input", { "is-indeterminate": W(ie) }]),
						type: "checkbox",
						checked: W(q),
						".indeterminate": W(ie),
						"aria-label": W(d).selectAll,
						onChange: i[2] || (i[2] = (...e) => W(se) && W(se)(...e))
					}, null, 42, Dl)])], 4)) : c("", !0),
					W(pe) ? (P(), l("th", {
						key: 2,
						scope: "col",
						rowspan: "2",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(Ae))
					}, [u("span", Ol, H(W(d).expand), 1)], 4)) : c("", !0),
					(P(!0), l(t, null, R(W(xe).runs, (e) => (P(), l("th", {
						key: e.type === "group" ? `g-${e.title}` : `s-${e.cols[0]?.col.key}`,
						scope: "colgroup",
						colspan: e.type === "group" ? e.cols.length : 1,
						class: D(["mc-data-table__th mc-data-table__th--group", [e.type === "group" ? `is-align-${e.align ?? "center"}` : "is-align-center", { "is-spacer": e.type === "solo" }]])
					}, [e.type === "group" ? (P(), l("span", Al, H(e.title), 1)) : c("", !0)], 10, kl))), 128))
				])) : c("", !0), u("tr", { class: D(["mc-data-table__head-row", { "is-grouped": W(xe).hasGroups }]) }, [
					e.rowDraggable && !W(xe).hasGroups ? (P(), l("th", {
						key: 0,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(Oe))
					}, [u("span", jl, H(W(d).dragColumn), 1)], 4)) : c("", !0),
					e.selection && !W(xe).hasGroups ? (P(), l("th", {
						key: 1,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(ke))
					}, [u("span", Ml, [u("input", {
						class: D(["mc-data-table__checkbox-input", { "is-indeterminate": W(ie) }]),
						type: "checkbox",
						checked: W(q),
						".indeterminate": W(ie),
						"aria-label": W(d).selectAll,
						onChange: i[3] || (i[3] = (...e) => W(se) && W(se)(...e))
					}, null, 42, Nl)])], 4)) : c("", !0),
					W(pe) && !W(xe).hasGroups ? (P(), l("th", {
						key: 2,
						scope: "col",
						class: "mc-data-table__th mc-data-table__th--util",
						style: k(W(Ae))
					}, [u("span", Pl, H(W(d).expand), 1)], 4)) : c("", !0),
					(P(!0), l(t, null, R(W(_e), ({ col: t }) => (P(), l("th", {
						key: t.key,
						scope: "col",
						class: D(["mc-data-table__th mc-sheen-sweep", {
							"is-sortable": !!t.sortable,
							"is-sorted": W(Ye)(t).order !== null,
							"is-fixed": !!t.fixed,
							"is-fixed-left": t.fixed === "left",
							"is-fixed-right": t.fixed === "right"
						}]),
						style: k(W(Te).get(t.key)),
						"aria-sort": t.sortable ? W(Ye)(t).order === "asc" ? "ascending" : W(Ye)(t).order === "desc" ? "descending" : "none" : void 0
					}, [t.header ? (P(), s(W(Qe), {
						key: 0,
						render: t.header,
						column: t
					}, null, 8, ["render", "column"])) : t.sortable ? (P(), l("button", {
						key: 1,
						type: "button",
						class: "mc-data-table__sort-btn",
						"aria-label": `Sort by ${t.title ?? t.key}`,
						onClick: (e) => W(Xe)(t)
					}, [
						u("span", Ll, H(t.title ?? t.key), 1),
						u("span", {
							class: D(["mc-data-table__sort", {
								"is-asc": W(Ye)(t).order === "asc",
								"is-desc": W(Ye)(t).order === "desc"
							}]),
							"aria-hidden": "true"
						}, [m($, {
							name: "chevron-up",
							size: 14,
							"stroke-width": 2.4
						})], 2),
						e.multiSort && W(Ye)(t).priority > 0 ? (P(), l("span", Rl, H(W(Ye)(t).priority), 1)) : c("", !0)
					], 8, Il)) : (P(), l("span", zl, H(t.title ?? t.key), 1)), e.resizable ? (P(), l("span", {
						key: 3,
						class: D(["mc-data-table__resize", { "is-active": W(Se) === t.key }]),
						role: "separator",
						"aria-orientation": "vertical",
						"aria-label": `Resize ${t.title ?? t.key}`,
						onPointerdown: (e) => W(Ce)(t, e)
					}, null, 42, Bl)) : c("", !0)], 14, Fl))), 128))
				], 2)], 512),
				u("tbody", Vl, [
					W(O) && W(E).padTop > 0 ? (P(), l("tr", Hl, [u("td", {
						class: "mc-data-table__spacer-cell",
						style: k({ height: `${W(E).padTop}px` }),
						colspan: W(Pe)
					}, null, 12, Ul)])) : c("", !0),
					(P(!0), l(t, null, R(W(Fe), (r) => (P(), l(t, { key: r.key }, [u("tr", {
						class: D(["mc-data-table__row", {
							"is-selected": e.selection && W(ae)(r.key),
							"is-stripe": r.viewIndex % 2 == 1,
							"is-dragging": W(I) === r.viewIndex,
							"is-drop-before": W(L) === r.viewIndex && W(B) === "before",
							"is-drop-after": W(L) === r.viewIndex && W(B) === "after"
						}]),
						style: k({ "--i": r.index }),
						tabindex: "0",
						role: "button",
						onClick: (e) => a("row-click", r.row, r.index),
						onKeydown: [Y(X((e) => a("row-click", r.row, r.index), ["prevent"]), ["enter"]), Y(X((e) => a("row-click", r.row, r.index), ["prevent"]), ["space"])],
						onDragover: (e) => W(U)(r.viewIndex, e),
						onDrop: (e) => W(G)(r.viewIndex, e)
					}, [
						e.rowDraggable ? (P(), l("td", {
							key: 0,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: k(W(Oe))
						}, [u("button", {
							ref_for: !0,
							ref: W(ne)(r.key),
							type: "button",
							class: "mc-data-table__drag",
							draggable: "true",
							"aria-label": W($e)(W(d).dragRow, { index: r.viewIndex + 1 }),
							onClick: i[4] || (i[4] = X(() => {}, ["stop"])),
							onKeydown: (e) => W(te)(r.viewIndex, r.key, e),
							onDragstart: (e) => W(V)(r.viewIndex, e),
							onDragend: i[5] || (i[5] = (...e) => W(K) && W(K)(...e))
						}, [m($, {
							name: "grip",
							size: 14,
							"stroke-width": 2
						})], 40, Gl)], 4)) : c("", !0),
						e.selection ? (P(), l("td", {
							key: 1,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: k(W(ke))
						}, [u("span", Kl, [u("input", {
							class: "mc-data-table__checkbox-input",
							type: "checkbox",
							checked: W(ae)(r.key),
							"aria-label": W($e)(W(d).selectRow, { index: r.index + 1 }),
							onClick: i[6] || (i[6] = X(() => {}, ["stop"])),
							onChange: (e) => W(oe)(r.key)
						}, null, 40, ql)])], 4)) : c("", !0),
						W(pe) ? (P(), l("td", {
							key: 2,
							class: "mc-data-table__cell mc-data-table__cell--util",
							style: k(W(Ae))
						}, [W(ue)(r.row) ? (P(), l("button", {
							key: 0,
							type: "button",
							class: D(["mc-data-table__expand-btn", { "is-open": W(de)(r.key) }]),
							"aria-expanded": W(de)(r.key),
							"aria-label": W(de)(r.key) ? W(d).collapse : W(d).expand,
							onClick: X((e) => W(fe)(r.key), ["stop"])
						}, [m($, {
							name: "chevron-right",
							size: 15,
							"stroke-width": 2.2
						})], 10, Jl)) : c("", !0)], 4)) : c("", !0),
						(P(!0), l(t, null, R(r.cells, (e) => (P(), l("td", {
							key: e.col.key,
							class: D(["mc-data-table__cell", [`is-align-${e.col.align ?? "left"}`, {
								"is-fixed": !!e.col.fixed,
								"is-fixed-left": e.col.fixed === "left",
								"is-fixed-right": e.col.fixed === "right"
							}]]),
							style: k(W(Te).get(e.col.key))
						}, [W(O) ? (P(), l("div", Yl, [z(n.$slots, e.slotName ?? "__mc_data_table_default__", {
							row: r.row,
							index: r.index,
							value: e.value
						}, () => [e.col.render ? (P(), s(W(Ze), {
							key: 0,
							render: e.col.render,
							row: r.row,
							index: r.index
						}, null, 8, [
							"render",
							"row",
							"index"
						])) : (P(), l(t, { key: 1 }, [p(H(e.value), 1)], 64))], !0)])) : z(n.$slots, e.slotName ?? "__mc_data_table_default__", {
							row: r.row,
							index: r.index,
							value: e.value
						}, () => [e.col.render ? (P(), s(W(Ze), {
							key: 0,
							render: e.col.render,
							row: r.row,
							index: r.index
						}, null, 8, [
							"render",
							"row",
							"index"
						])) : (P(), l(t, { key: 1 }, [p(H(e.value), 1)], 64))], !0, 1)], 6))), 128))
					], 46, Wl), W(pe) && W(ue)(r.row) ? (P(), l("tr", Xl, [u("td", {
						colspan: W(Pe),
						class: "mc-data-table__expand-cell"
					}, [u("div", { class: D(["mc-data-table__expand", { "is-open": W(de)(r.key) }]) }, [u("div", Ql, [z(n.$slots, "expand", {
						row: r.row,
						index: r.index
					}, () => [u("pre", $l, H(JSON.stringify(r.row, null, 2)), 1)], !0)])], 2)], 8, Zl)])) : c("", !0)], 64))), 128)),
					W(O) && W(E).padBottom > 0 ? (P(), l("tr", eu, [u("td", {
						class: "mc-data-table__spacer-cell",
						style: k({ height: `${W(E).padBottom}px` }),
						colspan: W(Pe)
					}, null, 12, tu)])) : c("", !0),
					W(Fe).length ? c("", !0) : (P(), l("tr", nu, [u("td", {
						class: "mc-data-table__empty mc-aurora-inset",
						colspan: W(Pe),
						role: "status"
					}, [
						u("span", iu, [m($, {
							name: "box",
							size: 28,
							"stroke-width": 1.6
						})]),
						u("span", au, H(W(He)), 1),
						z(n.$slots, "empty", {}, void 0, !0)
					], 8, ru)]))
				]),
				W(Ie) ? (P(), l("tfoot", ou, [u("tr", su, [
					e.rowDraggable ? (P(), l("td", {
						key: 0,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: k(W(Oe))
					}, null, 4)) : c("", !0),
					e.selection ? (P(), l("td", {
						key: 1,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: k(W(ke))
					}, null, 4)) : c("", !0),
					W(pe) ? (P(), l("td", {
						key: 2,
						class: "mc-data-table__cell mc-data-table__cell--util mc-data-table__foot-cell",
						style: k(W(Ae))
					}, null, 4)) : c("", !0),
					(P(!0), l(t, null, R(W(_e), ({ col: e }, t) => (P(), l("td", {
						key: `foot-${e.key}`,
						class: D(["mc-data-table__cell mc-data-table__foot-cell", `is-align-${e.align ?? "left"}`]),
						style: k(W(Te).get(e.key))
					}, [t === 0 && W(Ie).label ? (P(), l("span", cu, H(W(Ie).label), 1)) : (P(), l("span", lu, H(W(Le)(e)), 1))], 6))), 128))
				])])) : c("", !0)
			], 6)], 36),
			e.loading ? (P(), l("div", uu, [i[12] || (i[12] = u("span", {
				class: "mc-data-table__spinner",
				"aria-hidden": "true"
			}, [u("svg", {
				viewBox: "0 0 24 24",
				width: "26",
				height: "26"
			}, [u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})])], -1)), u("span", du, H(W(d).loading), 1)])) : c("", !0),
			W(S) ? (P(), l("footer", fu, [
				u("span", pu, H(W($e)(W(d).total, { count: W(S).total })), 1),
				u("nav", {
					class: "mc-data-table__pager",
					"aria-label": W(d).pager
				}, [
					u("button", {
						type: "button",
						class: "mc-data-table__page-btn",
						disabled: W(f) <= 1,
						"aria-label": W(d).previous,
						onClick: i[8] || (i[8] = (e) => W(g)(W(f) - 1))
					}, [m($, {
						name: "chevron-left",
						size: 15,
						"stroke-width": 2.2
					})], 8, hu),
					(P(!0), l(t, null, R(W(b), (e, n) => (P(), l(t, { key: `${e}-${n}` }, [typeof e == "number" ? (P(), l("button", {
						key: 1,
						type: "button",
						class: D(["mc-data-table__page-btn", { "is-active": e === W(f) }]),
						"aria-current": e === W(f) ? "page" : void 0,
						onClick: (t) => W(g)(e)
					}, H(e), 11, _u)) : (P(), l("span", gu, "…"))], 64))), 128)),
					u("button", {
						type: "button",
						class: "mc-data-table__page-btn",
						disabled: W(f) >= W(y),
						"aria-label": W(d).next,
						onClick: i[9] || (i[9] = (e) => W(g)(W(f) + 1))
					}, [m($, {
						name: "chevron-right",
						size: 15,
						"stroke-width": 2.2
					})], 8, vu)
				], 8, mu),
				u("label", yu, [u("span", bu, H(W($e)(W(d).rowsPerPage, { count: W(h) })), 1), u("select", {
					class: "mc-data-table__select",
					value: W(h),
					onChange: i[10] || (i[10] = (...e) => W(v) && W(v)(...e))
				}, [(P(!0), l(t, null, R(W(x), (e) => (P(), l("option", {
					key: e,
					value: e
				}, H(W($e)(W(d).rowsPerPage, { count: e })), 9, Su))), 128))], 40, xu)])
			])) : c("", !0),
			m(r, { name: "mc-dt-batch" }, {
				default: J(() => [W(Be) ? (P(), l("div", Cu, [
					u("span", wu, H(W(Ve)), 1),
					u("span", Tu, [z(n.$slots, "batch-actions", {
						keys: W(re),
						clear: W(ce)
					}, void 0, !0)]),
					u("button", {
						type: "button",
						class: "mc-data-table__batch-clear",
						"aria-label": W(d).clearSelection,
						onClick: i[11] || (i[11] = (...e) => W(ce) && W(ce)(...e))
					}, [m($, {
						name: "close",
						size: 14,
						"stroke-width": 2.4
					})], 8, Eu)
				])) : c("", !0)]),
				_: 3
			})
		], 2));
	}
}), [["__scopeId", "data-v-aa1dbf5d"]]), Ou = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
], ku = [
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
function Au(e) {
	if (e == null || e === "") return null;
	if (e instanceof Date) return Number.isNaN(e.getTime()) ? null : e;
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? null : t;
}
function ju(e, t) {
	return !e || !t ? !1 : e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
}
function Mu(e) {
	return new Date(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds());
}
function Nu(e) {
	return e === "datetime" || e === "datetimeRange" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd";
}
function Pu(e, t) {
	if (!e) return !1;
	try {
		return !!e(Mu(t));
	} catch {
		return !1;
	}
}
function Fu(e, t) {
	let n = new Date(e, t, 1).getDay(), r = new Date(e, t, 1 - n), i = [];
	for (let e = 0; e < 42; e += 1) i.push(new Date(r.getFullYear(), r.getMonth(), r.getDate() + e));
	return i;
}
function Iu(e) {
	let t = [];
	for (let n = 0; n < 12; n += 1) t.push(e + n);
	return t;
}
function Lu(e, t) {
	let n = e.getMonth() === t.viewMonth, r = t.rangeStart, i = t.rangeEnd, a = ju(e, r), o = ju(e, i), s = !1;
	return r && i && !a && !o && (s = e.getTime() > Math.min(r.getTime(), i.getTime()) && e.getTime() < Math.max(r.getTime(), i.getTime())), {
		"is-outside": !n,
		"is-today": ju(e, t.today),
		"is-selected": t.isRange ? a || o : ju(e, t.pickedDay),
		"is-range-start": a,
		"is-range-end": o,
		"is-in-range": s,
		"is-disabled": t.isDisabled(e)
	};
}
//#endregion
//#region src/components/date-picker/DatePicker.vue?vue&type=script&setup=true&lang.ts
var Ru = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], zu = { class: "mc-date-picker__affix" }, Bu = ["aria-label"], Vu = ["id", "aria-label"], Hu = { class: "mc-date-picker__body" }, Uu = {
	key: 0,
	class: "mc-date-picker__shortcuts"
}, Wu = ["onClick"], Gu = { class: "mc-date-picker__calendar" }, Ku = { class: "mc-date-picker__header" }, qu = ["aria-label"], Ju = ["aria-label"], Yu = ["aria-label"], Xu = ["aria-label"], Zu = ["aria-label"], Qu = ["aria-label"], $u = ["aria-label"], ed = {
	key: "day",
	class: "mc-date-picker__day-view"
}, td = { class: "mc-date-picker__weekdays" }, nd = { class: "mc-date-picker__cells" }, rd = [
	"disabled",
	"aria-pressed",
	"aria-current",
	"onClick"
], id = { class: "mc-date-picker__cell-text" }, ad = {
	key: "month",
	class: "mc-date-picker__month-view"
}, od = ["onClick"], sd = {
	key: "year",
	class: "mc-date-picker__year-view"
}, cd = ["onClick"], ld = {
	key: 0,
	class: "mc-date-picker__time mc-recipe-well"
}, ud = ["aria-label"], dd = ["aria-label"], fd = { class: "mc-date-picker__footer" }, pd = { class: "mc-date-picker__summary" }, md = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiDatePicker",
	__name: "DatePicker",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: null },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), h = rn(), g = Ln("mc-date-picker"), _ = Hn(), v = L(null), y = L(null), b = L(o.open), { style: x, transformOrigin: S, update: C, startAutoUpdate: w, stopAutoUpdate: O } = Cn(v, y, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: b })
		}), j = L("day"), M = L((/* @__PURE__ */ new Date()).getFullYear()), N = L((/* @__PURE__ */ new Date()).getMonth()), F = L(Math.floor((/* @__PURE__ */ new Date()).getFullYear() / 12) * 12), I = L(0), z = L(0);
		q(() => o.open, (e) => {
			b.value = e, e ? (me(), E(() => {
				C(), w();
			})) : O();
		});
		let B = a(() => o.type === "dateRange" || o.type === "datetimeRange"), V = a(() => o.type === "datetime" || o.type === "datetimeRange"), U = a(() => Nu(o.type)), G = a(() => o.format ?? U.value), te = a(() => {
			if (!B.value) return [];
			let e = f.value;
			return Array.isArray(e) ? e.map(Au).filter((e) => !!e) : [];
		}), re = a(() => B.value ? null : Au(f.value)), Y = a(() => B.value ? te.value.length > 0 : !!re.value), ae = a(() => {
			if (B.value) {
				let [e, t] = te.value;
				return e ? t ? `${zt(e, G.value)}  ~  ${zt(t, G.value)}` : zt(e, G.value) : "";
			}
			let e = re.value;
			return e ? zt(e, G.value) : "";
		});
		a(() => new Date(M.value, N.value, 1));
		let oe = a(() => `${ku[N.value]} ${M.value}`), se = a(() => Fu(M.value, N.value)), ce = a(() => Iu(F.value)), le = /* @__PURE__ */ new Date();
		function ue(e) {
			return Pu(o.disabledDate, e);
		}
		let de = L(null), fe = L(null), pe = L(null);
		function me() {
			let [e, t] = te.value;
			de.value = e ? Mu(e) : null, fe.value = t ? Mu(t) : null, pe.value = re.value ? Mu(re.value) : null;
			let n = e ?? re.value ?? /* @__PURE__ */ new Date();
			I.value = n.getHours(), z.value = n.getMinutes(), M.value = n.getFullYear(), N.value = n.getMonth();
		}
		function he(e) {
			o.disabled && e || b.value !== e && (b.value = e, d("update:open", e), e ? (d("open"), me(), j.value = "day", E(() => {
				C(), w();
			})) : (d("close"), O()));
		}
		function ge() {
			he(!b.value);
		}
		function _e(e) {
			if (!b.value) return;
			let t = e.target;
			t && (v.value?.contains(t) || y.value?.contains(t) || he(!1));
		}
		ee(() => document.addEventListener("mousedown", _e)), A(() => {
			document.removeEventListener("mousedown", _e), O();
		});
		function ve(e) {
			let t = new Date(M.value, N.value + e, 1);
			M.value = t.getFullYear(), N.value = t.getMonth();
		}
		function ye(e) {
			M.value += e;
		}
		function be(e) {
			F.value += e * 12;
		}
		function xe(e) {
			j.value = e;
		}
		function Se(e) {
			let t = Mu(e);
			return t.setHours(I.value, z.value, 0, 0), t;
		}
		function Ce(e) {
			if (!ue(e)) {
				if (B.value) {
					if (!de.value || de.value && fe.value) {
						de.value = Mu(e), fe.value = null;
						return;
					}
					let t = de.value, n = e.getTime() < t.getTime() ? t : e, r = e.getTime() < t.getTime() ? e : t;
					de.value = Mu(r), fe.value = Se(n), V.value || De();
				} else pe.value = Se(e), V.value || Ee();
			}
		}
		function we(e) {
			N.value = e, j.value = "day";
		}
		function Te(e) {
			M.value = e, j.value = "month";
		}
		function Ee() {
			let e = pe.value;
			if (!e) return;
			let t = o.valueFormat ? zt(e, o.valueFormat) : e;
			f.value = t, d("change", t), he(!1);
		}
		function De() {
			let e = de.value, t = fe.value;
			if (!e || !t) return;
			let n = o.valueFormat ? [zt(e, o.valueFormat), zt(t, o.valueFormat)] : [Mu(e), Mu(t)];
			f.value = n, d("change", n), he(!1);
		}
		function Oe() {
			let e = /* @__PURE__ */ new Date();
			I.value = e.getHours(), z.value = e.getMinutes(), B.value ? (de.value = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0), fe.value = Se(e), pe.value = Mu(e)) : (pe.value = Se(e), M.value = e.getFullYear(), N.value = e.getMonth());
		}
		function ke() {
			B.value ? De() : Ee();
		}
		function Ae() {
			f.value = null, d("change", null);
		}
		function je(e) {
			if (Array.isArray(e.value)) {
				let [t, n] = e.value.map(Au);
				de.value = t ? Mu(t) : null, fe.value = n ? Mu(n) : null, t && (M.value = t.getFullYear(), N.value = t.getMonth()), n && (I.value = n.getHours(), z.value = n.getMinutes());
			} else {
				let t = Au(e.value);
				if (!t) return;
				pe.value = Mu(t), I.value = t.getHours(), z.value = t.getMinutes(), M.value = t.getFullYear(), N.value = t.getMonth();
			}
			V.value || ke();
		}
		function Me(e) {
			return Lu(e, {
				viewMonth: N.value,
				today: le,
				rangeStart: de.value,
				rangeEnd: fe.value,
				pickedDay: pe.value,
				isRange: B.value,
				isDisabled: ue
			});
		}
		let Ne = a(() => {
			let e = de.value, t = fe.value;
			return e ? t ? `${zt(e, G.value)}  ~  ${zt(t, G.value)}` : zt(e, G.value) : "";
		}), Pe = a(() => typeof o.teleport == "string" ? o.teleport : "body"), Fe = a(() => Z("mc-date-picker", `mc-date-picker--${o.variant}`, `mc-date-picker--${o.size}`, `mc-date-picker--${o.type}`, {
			"is-open": b.value,
			"is-disabled": o.disabled,
			"is-empty": !Y.value
		}, o.customClass)), Ie = a(() => ({ "mc-recipe-well": o.variant !== "ghost" }));
		return (i, a) => (P(), l("div", { class: D(Fe.value) }, [u("button", {
			ref_key: "trigger",
			ref: v,
			type: "button",
			class: D(["mc-date-picker__trigger mc-sheen-sweep", Ie.value]),
			disabled: e.disabled,
			"aria-disabled": e.disabled || void 0,
			"aria-expanded": b.value,
			"aria-haspopup": "dialog",
			"aria-controls": W(g),
			onClick: ge
		}, [
			a[9] || (a[9] = u("span", {
				class: "mc-date-picker__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			m($, {
				name: "calendar",
				size: 15,
				class: "mc-date-picker__icon"
			}),
			u("span", { class: D(["mc-date-picker__value", { "is-placeholder": !Y.value }]) }, H(Y.value ? ae.value : e.placeholder), 3),
			u("span", zu, [e.clearable && Y.value ? (P(), l("span", {
				key: 0,
				class: "mc-date-picker__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": W(h).datePicker.clear ?? "clear",
				onClick: X(Ae, ["stop"])
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, Bu)) : c("", !0)])
		], 10, Ru), (P(), s(n, {
			to: Pe.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [b.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: y,
				class: "mc-date-picker__panel",
				style: W(x)
			}, W(_), {
				id: W(g),
				role: "dialog",
				"aria-label": W(h).datePicker.picker ?? "date picker"
			}), [u("div", {
				class: "mc-date-picker__inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(S) })
			}, [u("div", Hu, [o.shortcuts.length ? (P(), l("aside", Uu, [(P(!0), l(t, null, R(o.shortcuts, (e) => (P(), l("button", {
				key: e.label,
				type: "button",
				class: "mc-date-picker__shortcut",
				onClick: (t) => je(e)
			}, H(e.label), 9, Wu))), 128))])) : c("", !0), u("div", Gu, [
				u("header", Ku, [
					j.value === "day" ? (P(), l("button", {
						key: 0,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.previousMonth ?? "previous month",
						onClick: a[0] || (a[0] = (e) => ve(-1))
					}, [m($, {
						name: "chevron-left",
						size: 15
					})], 8, qu)) : j.value === "month" ? (P(), l("button", {
						key: 1,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.previousYear ?? "previous year",
						onClick: a[1] || (a[1] = (e) => ye(-1))
					}, [m($, {
						name: "chevron-left",
						size: 15
					})], 8, Ju)) : (P(), l("button", {
						key: 2,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.previousYears ?? "previous years",
						onClick: a[2] || (a[2] = (e) => be(-1))
					}, [m($, {
						name: "chevron-left",
						size: 15
					})], 8, Yu)),
					u("button", {
						type: "button",
						class: "mc-date-picker__title",
						"aria-label": j.value === "day" ? W(h).datePicker.chooseMonth ?? "choose month" : W(h).datePicker.chooseYear ?? "choose year",
						onClick: a[3] || (a[3] = (e) => xe(j.value === "day" ? "month" : "year"))
					}, [j.value === "day" ? (P(), l(t, { key: 0 }, [p(H(oe.value), 1)], 64)) : j.value === "month" ? (P(), l(t, { key: 1 }, [p(H(M.value), 1)], 64)) : (P(), l(t, { key: 2 }, [p(H(F.value) + " – " + H(F.value + 11), 1)], 64)), m($, {
						name: "chevrons-up-down",
						size: 12,
						class: "mc-date-picker__title-icon"
					})], 8, Xu),
					j.value === "day" ? (P(), l("button", {
						key: 3,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.nextMonth ?? "next month",
						onClick: a[4] || (a[4] = (e) => ve(1))
					}, [m($, {
						name: "chevron-right",
						size: 15
					})], 8, Zu)) : j.value === "month" ? (P(), l("button", {
						key: 4,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.nextYear ?? "next year",
						onClick: a[5] || (a[5] = (e) => ye(1))
					}, [m($, {
						name: "chevron-right",
						size: 15
					})], 8, Qu)) : (P(), l("button", {
						key: 5,
						type: "button",
						class: "mc-date-picker__nav",
						"aria-label": W(h).datePicker.nextYears ?? "next years",
						onClick: a[6] || (a[6] = (e) => be(1))
					}, [m($, {
						name: "chevron-right",
						size: 15
					})], 8, $u))
				]),
				m(r, {
					name: "mc-date-swap",
					mode: "out-in"
				}, {
					default: J(() => [j.value === "day" ? (P(), l("div", ed, [u("div", td, [(P(!0), l(t, null, R(W(Ou), (e) => (P(), l("span", {
						key: e,
						class: "mc-date-picker__weekday"
					}, H(e), 1))), 128))]), u("div", nd, [(P(!0), l(t, null, R(se.value, (e) => (P(), l("button", {
						key: e.getTime(),
						type: "button",
						class: D(["mc-date-picker__cell", Me(e)]),
						disabled: ue(e),
						"aria-pressed": Me(e)["is-selected"],
						"aria-current": W(ju)(e, W(le)) ? "date" : void 0,
						onClick: (t) => Ce(e)
					}, [u("span", id, H(e.getDate()), 1)], 10, rd))), 128))])])) : j.value === "month" ? (P(), l("div", ad, [(P(!0), l(t, null, R(W(ku), (e, t) => (P(), l("button", {
						key: e,
						type: "button",
						class: D(["mc-date-picker__month", { "is-active": t === N.value }]),
						onClick: (e) => we(t)
					}, H(e.slice(0, 3)), 11, od))), 128))])) : (P(), l("div", sd, [(P(!0), l(t, null, R(ce.value, (e) => (P(), l("button", {
						key: e,
						type: "button",
						class: D(["mc-date-picker__year", {
							"is-active": e === M.value,
							"is-today": e === (/* @__PURE__ */ new Date()).getFullYear()
						}]),
						onClick: (t) => Te(e)
					}, H(e), 11, cd))), 128))]))]),
					_: 1
				}),
				V.value ? (P(), l("div", ld, [
					m($, {
						name: "clock",
						size: 14,
						class: "mc-date-picker__time-icon"
					}),
					ie(u("input", {
						"onUpdate:modelValue": a[7] || (a[7] = (e) => I.value = e),
						class: "mc-date-picker__time-input",
						type: "number",
						min: "0",
						max: "23",
						"aria-label": W(h).datePicker.hour ?? "hour"
					}, null, 8, ud), [[
						ne,
						I.value,
						void 0,
						{ number: !0 }
					]]),
					a[10] || (a[10] = u("span", { class: "mc-date-picker__time-sep" }, ":", -1)),
					ie(u("input", {
						"onUpdate:modelValue": a[8] || (a[8] = (e) => z.value = e),
						class: "mc-date-picker__time-input",
						type: "number",
						min: "0",
						max: "59",
						"aria-label": W(h).datePicker.minute ?? "minute"
					}, null, 8, dd), [[
						ne,
						z.value,
						void 0,
						{ number: !0 }
					]])
				])) : c("", !0)
			])]), u("footer", fd, [
				u("button", {
					type: "button",
					class: "mc-date-picker__now",
					onClick: Oe
				}, [m($, {
					name: "sun",
					size: 13
				}), u("span", null, H(W(h).datePicker.now), 1)]),
				u("span", pd, H(Ne.value), 1),
				u("button", {
					type: "button",
					class: "mc-date-picker__apply",
					onClick: ke
				}, H(W(h).datePicker.confirm), 1)
			])], 4)], 16, Vu)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-c89b5e89"]]), hd = {
	key: 0,
	class: "mc-descriptions__title mc-sheen-sweep"
}, gd = { class: "mc-descriptions__title-text" }, _d = { class: "mc-descriptions__table" }, vd = { class: "mc-descriptions__body" }, yd = ["colspan"], bd = ["colspan"], xd = { class: "mc-descriptions__stack" }, Sd = { class: "mc-descriptions__value mc-descriptions__value--stack" }, Cd = {
	key: 0,
	class: "mc-descriptions__row"
}, wd = ["colspan"], Td = { class: "mc-descriptions__empty-text" }, Ed = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => {
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
		function i(e) {
			if (n.direction !== "vertical" && e.labelWidth !== void 0) return { width: typeof e.labelWidth == "number" ? `${e.labelWidth}px` : e.labelWidth };
		}
		let o = a(() => Z("mc-descriptions", "mc-recipe-sheet", "mc-grain-overlay", `mc-descriptions--${n.direction}`, `mc-descriptions--${n.size}`, { "is-bordered": n.bordered }, n.customClass)), s = a(() => ({ "--mc-desc-columns": String(Math.max(1, n.column)) }));
		return (n, a) => (P(), l("div", {
			class: D(o.value),
			style: k(s.value)
		}, [e.title ? (P(), l("div", hd, [u("span", gd, H(e.title), 1)])) : c("", !0), u("table", _d, [u("colgroup", null, [(P(!0), l(t, null, R(e.direction === "horizontal" ? e.column * 2 : e.column, (t) => (P(), l("col", {
			key: t,
			style: k(e.direction === "horizontal" && t % 2 == 1 ? { width: "var(--mc-desc-label-width)" } : void 0)
		}, null, 4))), 128))]), u("tbody", vd, [(P(!0), l(t, null, R(r.value, (r, a) => (P(), l("tr", {
			key: a,
			class: "mc-descriptions__row",
			style: k({ "--i": a })
		}, [(P(!0), l(t, null, R(r, (r) => (P(), l(t, { key: r.index }, [e.direction === "horizontal" ? (P(), l(t, { key: 0 }, [u("th", {
			scope: "row",
			class: "mc-descriptions__label mc-recipe-well",
			style: k(i(r.item)),
			colspan: 1
		}, [z(n.$slots, "label", {
			label: r.item.label,
			item: r.item,
			index: r.index
		}, () => [p(H(r.item.label), 1)], !0)], 4), u("td", {
			class: "mc-descriptions__value",
			colspan: r.span * 2 - 1
		}, [z(n.$slots, "value", {
			value: r.item.value,
			item: r.item,
			index: r.index
		}, () => [p(H(r.item.value), 1)], !0)], 8, yd)], 64)) : (P(), l("td", {
			key: 1,
			class: "mc-descriptions__cell",
			colspan: r.span
		}, [u("div", xd, [u("div", {
			role: "rowheader",
			class: "mc-descriptions__label mc-descriptions__label--stack mc-recipe-well",
			style: k(i(r.item))
		}, [z(n.$slots, "label", {
			label: r.item.label,
			item: r.item,
			index: r.index
		}, () => [p(H(r.item.label), 1)], !0)], 4), u("div", Sd, [z(n.$slots, "value", {
			value: r.item.value,
			item: r.item,
			index: r.index
		}, () => [p(H(r.item.value), 1)], !0)])])], 8, bd))], 64))), 128))], 4))), 128)), r.value.length ? c("", !0) : (P(), l("tr", Cd, [u("td", {
			class: "mc-descriptions__empty mc-aurora-inset",
			colspan: e.direction === "horizontal" ? e.column * 2 : e.column,
			role: "status"
		}, [u("span", Td, H(e.emptyText), 1)], 8, wd)]))])])], 6));
	}
}), [["__scopeId", "data-v-f7a4c28b"]]), Dd = "a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
function Od(e) {
	return a(() => {
		let t = e.panel.value, n = e.target?.();
		if (n) {
			if (typeof n != "string") return n;
			let e = t?.querySelector(n);
			if (e) return e;
			if (At) return document.querySelector(n);
		}
		return t ? t.querySelector("[autofocus]") || e.body.value?.querySelector(Dd) || (e.title?.value ?? t) : null;
	});
}
//#endregion
//#region src/utils/warn.ts
var kd = /* @__PURE__ */ new Set();
function Ad(e, t) {
	kd.has(e) || (kd.add(e), typeof console < "u" && typeof console.warn == "function" && console.warn(`[mochi-ui] ${t}`));
}
//#endregion
//#region src/components/dialog/Dialog.vue?vue&type=script&setup=true&lang.ts
var jd = [
	"aria-disabled",
	"aria-labelledby",
	"aria-label"
], Md = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Nd = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Pd = {
	key: 0,
	class: "mc-dialog__grip",
	"aria-hidden": "true"
}, Fd = ["id"], Id = ["aria-label", "disabled"], Ld = {
	key: 3,
	class: "mc-dialog__footer"
}, Rd = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiDialog",
	__name: "Dialog",
	props: {
		open: { type: Boolean },
		modelValue: { type: Boolean },
		title: {},
		width: {},
		maxWidth: {},
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
		placement: { default: "center" },
		offset: {},
		initialFocus: {},
		headerless: { type: Boolean },
		ariaLabel: {},
		overlayClass: {},
		wrapperClass: {},
		panelClass: {},
		headerClass: {},
		bodyClass: {},
		closeClass: {},
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(e, { emit: t }) {
		let i = e, o = rn(), d = Hn(), f = t, h = Ln("mc-dialog"), g = te(), _ = a(() => !!g.header), v = L(null), y = L(null), b = L(null), x = L(null), S = L(), C = L(!1), { isTop: w, isTopModal: E } = Pn({
			active: C,
			modal: !0
		}), O = jn({ active: C }), j = Od({
			body: y,
			panel: v,
			title: b,
			target: () => i.initialFocus
		});
		q(() => [i.open, i.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (C.value = t) : C.value = e;
		}, { immediate: !0 });
		let M = a(() => C.value);
		Bc(a(() => At && M.value)), Ic({
			enabled: M,
			container: v,
			initialFocus: j,
			isTop: E
		});
		function F(e) {
			C.value !== e && (C.value = e, f("update:open", e), f("update:modelValue", e), f(e ? "open" : "close"));
		}
		function I() {
			C.value && !i.disabled && (i.beforeClose ? i.beforeClose(() => F(!1)) : F(!1));
		}
		function R() {
			i.closeOnClickModal && I();
		}
		function B(e) {
			e.key === "Escape" && C.value && w() && (e.stopPropagation(), I());
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", B);
		}), A(() => {
			typeof document < "u" && document.removeEventListener("keydown", B), ne();
		});
		let V = L({
			x: 0,
			y: 0
		}), U = null;
		function G(e) {
			i.drag && !i.disabled && (e.target?.closest("button") || (U = {
				x: e.clientX,
				y: e.clientY,
				ox: V.value.x,
				oy: V.value.y
			}, typeof window < "u" && (window.addEventListener("mousemove", K), window.addEventListener("mouseup", ne))));
		}
		function K(e) {
			U && (V.value = {
				x: U.ox + (e.clientX - U.x),
				y: U.oy + (e.clientY - U.y)
			});
		}
		function ne() {
			U = null, typeof window < "u" && (window.removeEventListener("mousemove", K), window.removeEventListener("mouseup", ne));
		}
		let re = a(() => ({ transform: `translate3d(${Math.round(V.value.x)}px, ${Math.round(V.value.y)}px, 0)` })), ie = a(() => {
			let e = {};
			return i.width !== void 0 && (e["--mc-dialog-width"] = typeof i.width == "number" ? `${i.width}px` : i.width), i.maxWidth !== void 0 && (e["--mc-dialog-max-width"] = typeof i.maxWidth == "number" ? `${i.maxWidth}px` : i.maxWidth), e;
		}), Y = a(() => {
			if (!(i.headerless || i.ariaLabel)) return _.value ? S.value : h;
		});
		function ae() {
			if (!_.value || i.headerless || i.ariaLabel) return;
			let e = x.value?.querySelector("[data-mc-title]");
			e ? (e.id || (e.id = Ln("mc-dialog-title")), S.value !== e.id && (S.value = e.id)) : S.value !== void 0 && (S.value = void 0), e || Ad("dialog:header-name", "Dialog: `#header` replaces the titled `<h2>`, so the dialog has no accessible name. Pass `ariaLabel`, or mark the title element inside `#header` with `data-mc-title`.");
		}
		ee(ae), N(ae), i.headerless && !i.ariaLabel && Ad("dialog:headerless-name", "Dialog: `headerless` without `ariaLabel` renders a dialog with no accessible name. Pass `ariaLabel`.");
		let oe = a(() => Z(`is-placement-${i.placement}`, i.overlayClass)), se = a(() => {
			let e = { "--mc-layer-z": String(O.value) };
			return i.offset !== void 0 && (e["--mc-dialog-offset"] = typeof i.offset == "number" ? `${i.offset}px` : i.offset), e;
		}), ce = a(() => Z("mc-dialog__header", "mc-sheen-sweep", i.headerClass, { "is-draggable": i.drag })), le = a(() => Z("mc-dialog", "mc-grain-overlay", {
			"mc-recipe-panel": i.variant !== "liquid",
			"mc-panel--liquid": i.variant === "liquid",
			"mc-liquid-glass": i.variant === "liquid",
			"mc-liquid-glass--liquid": i.variant === "liquid",
			"mc-liquid-glass--layers": i.variant === "liquid",
			"is-draggable": i.drag,
			"is-resizable": i.resizable,
			"is-disabled": i.disabled,
			"is-headerless": i.headerless
		}, i.customClass, i.panelClass));
		return (t, i) => (P(), s(n, { to: "body" }, [m(r, { name: "mc-dialog" }, {
			default: J(() => [M.value ? (P(), l("div", T({
				key: 0,
				class: W(Z)("mc-dialog__overlay", oe.value),
				style: se.value
			}, W(d), { onClick: R }), [u("div", {
				class: D(W(Z)("mc-dialog__wrapper", e.wrapperClass)),
				style: k(re.value),
				onClick: i[0] || (i[0] = X(() => {}, ["stop"]))
			}, [u("div", {
				ref_key: "panel",
				ref: v,
				class: D(le.value),
				style: k(ie.value),
				role: "dialog",
				"aria-modal": "true",
				"aria-disabled": e.disabled || void 0,
				"aria-labelledby": Y.value,
				"aria-label": e.ariaLabel || void 0,
				tabindex: "-1"
			}, [
				e.variant === "liquid" ? (P(), l("span", Md)) : c("", !0),
				e.variant === "liquid" ? (P(), l("span", Nd)) : c("", !0),
				e.headerless ? c("", !0) : (P(), l("header", {
					key: 2,
					ref_key: "headerRef",
					ref: x,
					class: D(ce.value),
					onMousedown: G
				}, [z(t.$slots, "header", {}, () => [
					V.value ? (P(), l("span", Pd, [m($, {
						name: "grip",
						size: 16
					})])) : c("", !0),
					u("h2", {
						id: W(h),
						ref_key: "titleRef",
						ref: b,
						class: "mc-dialog__title",
						tabindex: "-1",
						"data-mc-type": "title"
					}, [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)], 8, Fd),
					e.showClose ? (P(), l("button", {
						key: 1,
						type: "button",
						class: D(W(Z)("mc-dialog__close", e.closeClass)),
						"aria-label": W(o).dialog?.close ?? "Close dialog",
						disabled: e.disabled,
						onClick: I
					}, [m($, {
						name: "close",
						size: 14,
						"stroke-width": 2.4
					})], 10, Id)) : c("", !0)
				], !0)], 34)),
				u("div", {
					ref_key: "bodyRef",
					ref: y,
					class: D(W(Z)("mc-dialog__body", e.bodyClass))
				}, [z(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.footer ? (P(), l("footer", Ld, [z(t.$slots, "footer", {}, void 0, !0)])) : c("", !0)
			], 14, jd)], 6)], 16)) : c("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-d7c65fef"]]);
//#endregion
//#region src/composables/useCountUp.ts
function zd(e, t = {}) {
	let { duration: n = 900, decimals: r = 0, delay: i = 0, from: o = 0 } = t, s = L(o), c = 0, l;
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
	return q(e, (e) => {
		l && clearTimeout(l), i > 0 ? l = setTimeout(d, i) : d();
	}, { immediate: !0 }), A(() => {
		c && cancelAnimationFrame(c), l && clearTimeout(l);
	}), {
		value: s,
		display: a(() => s.value.toLocaleString(void 0, {
			minimumFractionDigits: r,
			maximumFractionDigits: r
		})),
		stop: () => c && cancelAnimationFrame(c)
	};
}
//#endregion
//#region src/components/diff/Diff.vue?vue&type=script&setup=true&lang.ts
var Bd = { class: "mc-diff__header mc-sheen-sweep mc-recipe-panel" }, Vd = { class: "mc-diff__labels" }, Hd = { class: "mc-diff__label mc-diff__label--old" }, Ud = { class: "mc-diff__label mc-diff__label--new" }, Wd = {
	key: 0,
	class: "mc-diff__stats"
}, Gd = { class: "mc-diff__stat is-added" }, Kd = { class: "mc-diff__stat is-removed" }, qd = {
	key: 0,
	class: "mc-diff__body"
}, Jd = { class: "mc-diff__no" }, Yd = { class: "mc-diff__no" }, Xd = { class: "mc-diff__sign" }, Zd = { class: "mc-diff__content" }, Qd = {
	key: 1,
	class: "mc-diff__body mc-diff__body--split"
}, $d = { class: "mc-diff__no" }, ef = { class: "mc-diff__content" }, tf = { class: "mc-diff__no" }, nf = { class: "mc-diff__content" }, rf = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e;
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
		let i = a(() => r((n.oldText ?? "").split("\n"), (n.newText ?? "").split("\n"))), o = a(() => {
			let e = 0, t = 0;
			for (let n of i.value) n.type === "added" ? e++ : n.type === "removed" && t++;
			return {
				added: e,
				removed: t
			};
		}), s = a(() => o.value.added), d = a(() => o.value.removed), { display: f } = zd(s, {
			duration: 700,
			from: 0
		}), { display: p } = zd(d, {
			duration: 700,
			from: 0
		}), m = a(() => {
			let e = [], t = i.value, n = 0;
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
		}), h = a(() => Z("mc-diff", "mc-grain-overlay", "mc-recipe-sheet", `mc-diff--${n.mode}`, n.customClass));
		return (n, r) => (P(), l("div", { class: D(h.value) }, [u("header", Bd, [u("div", Vd, [u("span", Hd, H(e.oldLabel), 1), u("span", Ud, H(e.newLabel), 1)]), e.showStats ? (P(), l("div", Wd, [u("span", Gd, "+" + H(W(f)), 1), u("span", Kd, "−" + H(W(p)), 1)])) : c("", !0)]), e.mode === "unified" ? (P(), l("div", qd, [(P(!0), l(t, null, R(i.value, (e, t) => (P(), l("div", {
			key: t,
			class: D(["mc-diff__line", `is-${e.type}`])
		}, [
			u("span", Jd, H(e.oldNo ?? ""), 1),
			u("span", Yd, H(e.newNo ?? ""), 1),
			u("span", Xd, H(e.type === "added" ? "+" : e.type === "removed" ? "−" : " "), 1),
			u("span", Zd, H(e.content), 1)
		], 2))), 128))])) : (P(), l("div", Qd, [(P(!0), l(t, null, R(m.value, (e, t) => (P(), l("div", {
			key: t,
			class: "mc-diff__row"
		}, [u("div", { class: D(["mc-diff__cell", e.left ? `is-${e.left.type}` : "is-empty"]) }, [u("span", $d, H(e.left?.oldNo ?? ""), 1), u("span", ef, H(e.left?.content ?? ""), 1)], 2), u("div", { class: D(["mc-diff__cell", e.right ? `is-${e.right.type}` : "is-empty"]) }, [u("span", tf, H(e.right?.newNo ?? ""), 1), u("span", nf, H(e.right?.content ?? ""), 1)], 2)]))), 128))]))], 2));
	}
}), [["__scopeId", "data-v-aedb4dd3"]]);
//#endregion
//#region src/composables/useDiscrete.ts
function af(e) {
	let t = null, n = null, r = null;
	function i() {
		t || typeof document > "u" || (e.container && (r = typeof e.container == "string" ? document.querySelector(e.container) : e.container), r || (r = document.createElement("div"), r.setAttribute("data-mochi-discrete", ""), e.inline || document.body.appendChild(r)), t = o({ render: () => y(e.component, {
			...e.props ?? {},
			ref: (e) => {
				n = e;
			}
		}) }), e.plugins?.forEach((e) => t.use(e)), t.mount(r));
	}
	function a() {
		t?.unmount(), t = null, n = null, r && r.parentNode && !e.inline && r.parentNode.removeChild(r), r = null;
	}
	return new Proxy({}, { get(e, t) {
		return t === "mount" ? i : t === "unmount" || t === "destroy" ? a : (...e) => {
			n || i();
			let r = n?.[t];
			return typeof r == "function" ? r.apply(n, e) : void 0;
		};
	} });
}
//#endregion
//#region src/components/discrete-api/DiscreteApi.vue
var of = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = L(!1), i = L(null), a = {
			component: n.component,
			props: n.componentProps,
			inline: n.inline,
			plugins: n.plugins,
			container: void 0
		}, o = V(C(af(a)));
		function s() {
			a.container = n.inline ? i.value ?? void 0 : void 0, o.value.mount(), r.value = !0;
		}
		function u() {
			r.value && (o.value.unmount(), a.component = n.component, a.props = n.componentProps, a.inline = n.inline, a.plugins = n.plugins, s());
		}
		function d(e, t) {
			if (e === t) return !0;
			if (typeof e == "function" && typeof t == "function") return String(e) === String(t);
			if (typeof e != "object" || typeof t != "object" || !e || !t || Array.isArray(e) !== Array.isArray(t)) return !1;
			let n = e, r = t, i = Object.keys(n);
			return i.length === Object.keys(r).length && i.every((e) => d(n[e], r[e]));
		}
		return q(() => [
			n.component,
			n.componentProps,
			n.inline,
			n.plugins
		], (e, t) => {
			d(e[0], t[0]) && d(e[1], t[1]) && d(e[2], t[2]) && d(e[3], t[3]) || u();
		}), F("mochi:discrete", o), ee(() => {
			s();
		}), A(() => {
			o.value.unmount(), r.value = !1;
		}), t({
			api: o,
			mount: () => s(),
			destroy: () => o.value.unmount()
		}), (t, n) => (P(), l("span", { class: D(W(Z)("mc-discrete-api", { "is-mounted": r.value }, e.customClass)) }, [e.inline ? (P(), l("span", {
			key: 0,
			ref_key: "host",
			ref: i,
			class: "mc-discrete-api__host"
		}, null, 512)) : c("", !0)], 2));
	}
}), [["__scopeId", "data-v-6bd3cf9e"]]), sf = ["aria-orientation", "aria-disabled"], cf = {
	key: 0,
	class: "mc-divider__wave",
	"aria-hidden": "true"
}, lf = ["tabindex"], uf = { class: "mc-divider__label-text" }, df = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(null);
		function r(e) {
			t.interactive && !t.disabled && Et(e, n.value);
		}
		let i = a(() => Z(`mc-divider--${t.orientation}`, {
			"is-dashed": t.dashed,
			"is-gradient": t.gradient,
			"is-wave": t.wave,
			"is-disabled": t.disabled,
			"is-interactive": t.interactive
		}, t.customClass));
		return (t, a) => (P(), l("div", {
			class: D(["mc-divider", i.value]),
			role: "separator",
			"aria-orientation": e.orientation,
			"aria-disabled": e.disabled || void 0
		}, [e.wave ? (P(), l("span", cf, [...a[0] || (a[0] = [u("svg", {
			viewBox: "0 0 120 12",
			preserveAspectRatio: "none",
			width: "100%",
			height: "100%"
		}, [u("path", {
			d: "M0 6c10-8 20 8 30 0s20-8 30 0 20 8 30 0 20-8 30 0v6H0Z",
			fill: "currentColor",
			opacity: "0.22"
		})], -1)])])) : c("", !0), e.label ? (P(), l("span", {
			key: 1,
			ref_key: "labelEl",
			ref: n,
			class: "mc-divider__label",
			tabindex: e.interactive ? 0 : void 0,
			onKeydown: X(r, ["self"])
		}, [u("span", uf, H(e.label), 1)], 40, lf)) : c("", !0)], 10, sf));
	}
}), [["__scopeId", "data-v-cddbd875"]]), ff = ["aria-label"], pf = { class: "mc-dock__items" }, mf = [
	"aria-label",
	"aria-pressed",
	"aria-disabled",
	"disabled",
	"onMouseenter",
	"onFocus",
	"onClick",
	"onKeydown"
], hf = { class: "mc-dock__tile mc-sheen-sweep" }, gf = {
	key: 0,
	class: "mc-dock__badge",
	"aria-hidden": "true"
}, _f = {
	key: 1,
	class: "mc-dock__label mc-recipe-panel",
	role: "tooltip"
}, vf = {
	key: 2,
	class: "mc-dock__dot",
	"aria-hidden": "true"
}, yf = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiDock",
	__name: "Dock",
	props: /*@__PURE__*/ w({
		items: {},
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["select"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = L(-1);
		function d(e) {
			return o.value === void 0 ? !!e.active : e.key === o.value;
		}
		function f(e) {
			if (s.value < 0) return 1;
			let t = Math.abs(e - s.value), n = Math.max(0, 1 - t * .4);
			return 1 + (r.magnification - 1) * n;
		}
		function p(e) {
			e.disabled || (o.value = e.key, i("select", e.key, e));
		}
		function h(e, t) {
			if (e.key !== "Enter" && e.key !== " ") return;
			e.preventDefault();
			let n = r.items[t];
			n && p(n);
		}
		let g = a(() => Z("mc-dock", `mc-dock--${r.position}`, {
			"has-background": r.background,
			"has-labels": r.showLabels,
			"mc-grain-overlay": r.background,
			"mc-recipe-panel": r.background
		}, r.customClass)), _ = a(() => ({
			"--mc-dock-size": `${r.size}px`,
			"--mc-dock-gap": `${Math.round(r.size * .16)}px`
		}));
		return (n, r) => (P(), l("div", {
			class: D(g.value),
			style: k(_.value),
			role: "toolbar",
			"aria-label": e.label
		}, [r[2] || (r[2] = u("span", {
			class: "mc-dock__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), u("div", pf, [(P(!0), l(t, null, R(e.items, (t, n) => (P(), l("button", {
			key: t.key,
			type: "button",
			class: D(["mc-dock__item", {
				"is-active": d(t),
				"is-disabled": t.disabled
			}]),
			style: k({ "--mc-dock-scale": f(n) }),
			"aria-label": t.label,
			"aria-pressed": d(t) ? "true" : "false",
			"aria-disabled": t.disabled ? "true" : void 0,
			disabled: t.disabled,
			onMouseenter: (e) => s.value = n,
			onMouseleave: r[0] || (r[0] = (e) => s.value = -1),
			onFocus: (e) => s.value = n,
			onBlur: r[1] || (r[1] = (e) => s.value = -1),
			onClick: (e) => p(t),
			onKeydown: (e) => h(e, n)
		}, [
			u("span", hf, [m($, {
				name: t.icon,
				size: Math.round(e.size * .46),
				"stroke-width": 1.9
			}, null, 8, ["name", "size"])]),
			t.badge !== void 0 && t.badge !== "" ? (P(), l("span", gf, H(t.badge), 1)) : c("", !0),
			e.showLabels ? (P(), l("span", _f, H(t.label), 1)) : c("", !0),
			d(t) ? (P(), l("span", vf)) : c("", !0)
		], 46, mf))), 128))])], 14, ff));
	}
}), [["__scopeId", "data-v-15dc018e"]]), bf = [
	"aria-disabled",
	"aria-labelledby",
	"aria-label"
], xf = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Sf = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Cf = ["id"], wf = ["aria-label", "disabled"], Tf = {
	key: 3,
	class: "mc-drawer__footer"
}, Ef = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		square: {
			type: Boolean,
			default: !1
		},
		initialFocus: {},
		headerless: { type: Boolean },
		ariaLabel: {},
		overlayClass: {},
		panelClass: {},
		headerClass: {},
		bodyClass: {},
		closeClass: {},
		customClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(e, { emit: t }) {
		let i = e, o = rn(), d = Hn(), f = t, h = Ln("mc-drawer"), g = te(), _ = a(() => !!g.header), v = L(null), y = L(null), b = L(null), x = L(null), S = L(), C = L(!1), { isTop: w, isTopModal: E } = Pn({
			active: C,
			modal: !0
		}), O = jn({ active: C });
		q(() => [i.open, i.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (C.value = t) : C.value = e;
		}, { immediate: !0 });
		let j = a(() => C.value), M = Od({
			body: y,
			panel: v,
			title: b,
			target: () => i.initialFocus
		});
		Bc(a(() => At && j.value)), Ic({
			enabled: j,
			container: v,
			initialFocus: M,
			isTop: E
		});
		function F(e) {
			C.value !== e && (C.value = e, f("update:open", e), f("update:modelValue", e), f(e ? "open" : "close"));
		}
		function I() {
			i.closeOnClickModal && !i.disabled && F(!1);
		}
		function R(e) {
			if (e.key === "Escape" && C.value && w()) {
				if (e.stopPropagation(), i.disabled) return;
				F(!1);
			}
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", R);
		}), A(() => {
			typeof document < "u" && document.removeEventListener("keydown", R);
		});
		let B = a(() => {
			let e = {}, t = i.size;
			if (t !== void 0) {
				let n = typeof t == "number" ? `${t}px` : t;
				e["--mc-drawer-size"] = n, /%\s*$/.test(n) && (e["--mc-drawer-max-size"] = "none");
			}
			return e;
		}), V = a(() => {
			if (!(i.headerless || i.ariaLabel)) return _.value ? S.value : h;
		});
		function U() {
			if (!_.value || i.headerless || i.ariaLabel) return;
			let e = x.value?.querySelector("[data-mc-title]");
			e ? (e.id || (e.id = Ln("mc-drawer-title")), S.value !== e.id && (S.value = e.id)) : S.value !== void 0 && (S.value = void 0), e || Ad("drawer:header-name", "Drawer: `#header` replaces the titled `<h2>`, so the drawer has no accessible name. Pass `ariaLabel`, or mark the title element inside `#header` with `data-mc-title`.");
		}
		ee(U), N(U), i.headerless && !i.ariaLabel && Ad("drawer:headerless-name", "Drawer: `headerless` without `ariaLabel` renders a drawer with no accessible name. Pass `ariaLabel`.");
		let G = a(() => Z(i.overlayClass)), K = a(() => Z("mc-drawer__header", "mc-sheen-sweep", i.headerClass)), ne = a(() => Z("mc-drawer", "mc-grain-overlay", `mc-drawer--${i.placement}`, {
			"mc-recipe-panel": i.variant !== "liquid",
			"mc-panel--liquid": i.variant === "liquid",
			"mc-liquid-glass": i.variant === "liquid",
			"mc-liquid-glass--liquid": i.variant === "liquid",
			"mc-liquid-glass--layers": i.variant === "liquid",
			"mc-drawer--flat": i.variant === "flat",
			"mc-drawer--square": i.square,
			"is-headerless": i.headerless,
			"is-disabled": i.disabled
		}, i.customClass, i.panelClass));
		return (t, i) => (P(), s(n, { to: "body" }, [m(r, { name: "mc-drawer" }, {
			default: J(() => [j.value ? (P(), l("div", T({
				key: 0,
				class: ["mc-drawer__overlay", G.value],
				style: { "--mc-layer-z": W(O) }
			}, W(d), { onClick: I }), [u("aside", {
				ref_key: "panel",
				ref: v,
				class: D(ne.value),
				style: k(B.value),
				role: "dialog",
				"aria-modal": "true",
				"aria-disabled": e.disabled || void 0,
				"aria-labelledby": V.value,
				"aria-label": e.ariaLabel || void 0,
				tabindex: "-1",
				onClick: i[1] || (i[1] = X(() => {}, ["stop"]))
			}, [
				e.variant === "liquid" ? (P(), l("span", xf)) : c("", !0),
				e.variant === "liquid" ? (P(), l("span", Sf)) : c("", !0),
				e.headerless ? c("", !0) : (P(), l("header", {
					key: 2,
					ref_key: "headerRef",
					ref: x,
					class: D(K.value)
				}, [z(t.$slots, "header", {}, () => [u("h2", {
					id: W(h),
					ref_key: "titleRef",
					ref: b,
					class: "mc-drawer__title",
					tabindex: "-1",
					"data-mc-type": "title"
				}, [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)], 8, Cf), e.showClose ? (P(), l("button", {
					key: 0,
					type: "button",
					class: D(W(Z)("mc-drawer__close", e.closeClass)),
					"aria-label": W(o).drawer?.close ?? "Close drawer",
					disabled: e.disabled,
					onClick: i[0] || (i[0] = (e) => F(!1))
				}, [m($, {
					name: "close",
					size: 14,
					"stroke-width": 2.4
				})], 10, wf)) : c("", !0)], !0)], 2)),
				u("div", {
					ref_key: "bodyRef",
					ref: y,
					class: D(W(Z)("mc-drawer__body", e.bodyClass))
				}, [z(t.$slots, "default", {}, void 0, !0)], 2),
				t.$slots.footer ? (P(), l("footer", Tf, [z(t.$slots, "footer", {}, void 0, !0)])) : c("", !0)
			], 14, bf)], 16)) : c("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-05a3c892"]]), Df = [
	"disabled",
	"aria-expanded",
	"aria-controls"
], Of = {
	key: 1,
	class: "mc-dropdown__label"
}, kf = [
	"disabled",
	"aria-expanded",
	"aria-controls"
], Af = ["id"], jf = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Mf = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, Nf = {
	key: 0,
	class: "mc-dropdown__group",
	role: "presentation"
}, Pf = ["disabled", "onClick"], Ff = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = e, d = i, f = Hn(), p = L(!1), h = L(null), g = L(null), _ = Ln("mc-dropdown"), { isTop: v } = Pn({ active: p }), y, b = jn({ active: p }), { style: x, coords: S, transformOrigin: C, arrowSide: w, schedule: O, stopAutoUpdate: j } = Cn(h, g, {
			placement: o.placement,
			offset: o.offset,
			zIndex: b
		});
		ml(h, () => V(), { ignore: [g] });
		let M = a(() => o.variant === "liquid" ? "mc-panel--liquid mc-liquid-glass mc-liquid-glass--liquid mc-liquid-glass--layers" : "mc-recipe-panel");
		q(p, (e) => {
			e ? (d("open"), O(), N()) : (d("close"), j());
		});
		function N() {
			j(), typeof window < "u" && (window.addEventListener("scroll", O, !0), window.addEventListener("resize", O));
		}
		A(() => {
			y && clearTimeout(y), j(), typeof document < "u" && document.removeEventListener("keydown", Y);
		});
		function F() {
			o.disabled || (p.value = !p.value);
		}
		function I() {
			o.disabled || (o.trigger === "hover" ? (y && clearTimeout(y), y = setTimeout(() => p.value = !0, 90)) : p.value = !0);
		}
		function B() {
			o.trigger === "hover" ? (y && clearTimeout(y), y = setTimeout(() => p.value = !1, 140)) : p.value = !1;
		}
		function V() {
			p.value = !1;
		}
		function U() {
			return Array.from(g.value?.querySelectorAll(".mc-dropdown__item:not(:disabled)") ?? []);
		}
		function G() {
			(h.value?.querySelector("button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])") ?? h.value)?.focus({ preventScroll: !0 });
		}
		function K(e) {
			let t = U();
			t.length && t[(e % t.length + t.length) % t.length]?.focus({ preventScroll: !0 });
		}
		function te() {
			let e = g.value?.contains(document.activeElement) ?? !1;
			V(), e && E(() => G());
		}
		function ne(e) {
			e.disabled || (e.handler?.(), d("select", e), te());
		}
		function re(e) {
			o.disabled || (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), p.value ? K(e.key === "ArrowDown" ? 0 : -1) : (p.value = !0, E(() => K(e.key === "ArrowDown" ? 0 : -1))));
		}
		function ie(e) {
			if (e.key === "Escape") {
				e.preventDefault(), e.stopPropagation(), te();
				return;
			}
			if (e.key === "Tab") {
				V();
				return;
			}
			let t = U();
			if (!t.length) return;
			let n = t.indexOf(document.activeElement);
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				let t = e.key === "ArrowDown" ? 1 : -1;
				K(n === -1 ? t === 1 ? 0 : -1 : n + t);
			} else e.key === "Home" ? (e.preventDefault(), K(0)) : e.key === "End" && (e.preventDefault(), K(-1));
		}
		function Y(e) {
			if (e.key !== "Escape" || !p.value || !v()) return;
			e.stopPropagation();
			let t = g.value?.contains(document.activeElement) ?? !1;
			V(), t && E(() => G());
		}
		function ae(e) {
			o.trigger === "contextmenu" && (e.preventDefault(), p.value = !p.value);
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", Y);
		});
		let oe = a(() => {
			let e = w.value;
			if (e === "top" || e === "bottom") {
				let e = S.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = S.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), se = a(() => `mc-dropdown__arrow--${w.value}`), ce = a(() => {
			if (o.teleport !== !1) return typeof o.teleport == "string" ? o.teleport : "body";
		}), le = a(() => {
			let e = [];
			for (let t of o.options ?? []) if (t.group) {
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
		return (i, a) => (P(), l("div", { class: D(["mc-dropdown", W(Z)(e.customClass)]) }, [u("div", {
			ref_key: "triggerRef",
			ref: h,
			class: "mc-dropdown__trigger",
			onClick: a[0] || (a[0] = (t) => e.trigger === "click" && F()),
			onMouseenter: a[1] || (a[1] = (t) => e.trigger === "hover" && I()),
			onMouseleave: a[2] || (a[2] = (t) => e.trigger === "hover" && B()),
			onContextmenu: ae,
			onKeydown: re
		}, [z(i.$slots, "trigger", { open: p.value }, () => [u("button", {
			class: "mc-dropdown__btn",
			type: "button",
			disabled: e.disabled,
			"aria-expanded": p.value,
			"aria-haspopup": "menu",
			"aria-controls": p.value ? W(_) : void 0
		}, [
			e.icon ? (P(), s($, {
				key: 0,
				name: e.icon,
				class: "mc-dropdown__icon"
			}, null, 8, ["name"])) : c("", !0),
			e.label ? (P(), l("span", Of, H(e.label), 1)) : c("", !0),
			e.showArrow && !e.split ? (P(), s($, {
				key: 2,
				name: "chevron-down",
				class: D(["mc-dropdown__chevron", { "is-open": p.value }])
			}, null, 8, ["class"])) : c("", !0)
		], 8, Df)], !0), e.split ? (P(), l("button", {
			key: 0,
			class: "mc-dropdown__split",
			type: "button",
			disabled: e.disabled,
			"aria-expanded": p.value,
			"aria-haspopup": "menu",
			"aria-controls": p.value ? W(_) : void 0,
			onClick: X(F, ["stop"])
		}, [m($, {
			name: "chevron-down",
			class: D(["mc-dropdown__chevron", { "is-open": p.value }])
		}, null, 8, ["class"])], 8, kf)) : c("", !0)], 544), (P(), s(n, { to: ce.value }, [m(r, { name: "mc-dropdown-fade" }, {
			default: J(() => [p.value ? (P(), l("div", T({
				key: 0,
				ref_key: "panelRef",
				ref: g,
				class: "mc-dropdown__layer",
				style: {
					...W(x),
					transformOrigin: W(C)
				}
			}, W(f), {
				onMouseenter: a[3] || (a[3] = (t) => e.trigger === "hover" && (p.value = !0)),
				onMouseleave: a[4] || (a[4] = (t) => e.trigger === "hover" && B())
			}), [u("span", {
				class: D(["mc-dropdown__arrow", se.value]),
				style: k(oe.value),
				"aria-hidden": "true"
			}, null, 6), u("div", {
				id: W(_),
				class: D(["mc-dropdown__panel", M.value]),
				style: k({ width: e.width ? `${e.width}px` : void 0 }),
				role: "menu",
				onKeydown: ie
			}, [
				e.variant === "liquid" ? (P(), l("span", jf)) : c("", !0),
				a[5] || (a[5] = u("span", {
					class: "mc-dropdown__aurora",
					"aria-hidden": "true"
				}, null, -1)),
				e.variant === "liquid" ? (P(), l("span", Mf)) : c("", !0),
				a[6] || (a[6] = u("span", {
					class: "mc-dropdown__glint",
					"aria-hidden": "true"
				}, null, -1)),
				(P(!0), l(t, null, R(le.value, (e, n) => (P(), l(t, { key: n }, [e.group ? (P(), l("div", Nf, H(e.group), 1)) : c("", !0), (P(!0), l(t, null, R(e.items, (e, t) => (P(), l("button", {
					key: e.key ?? t,
					class: D(["mc-dropdown__item", {
						"is-danger": e.danger,
						"is-disabled": e.disabled,
						"is-divided": e.divided
					}]),
					type: "button",
					role: "menuitem",
					disabled: e.disabled,
					onClick: (t) => ne(e)
				}, [e.icon ? (P(), s($, {
					key: 0,
					name: e.icon,
					class: "mc-dropdown__icon"
				}, null, 8, ["name"])) : c("", !0), u("span", null, H(e.label), 1)], 10, Pf))), 128))], 64))), 128)),
				z(i.$slots, "default", {}, void 0, !0)
			], 46, Af)], 16)) : c("", !0)]),
			_: 3
		})], 8, ["to"]))], 2));
	}
}), [["__scopeId", "data-v-98fa69c1"]]), If = ["aria-disabled"], Lf = [
	"value",
	"placeholder",
	"disabled",
	"size",
	"aria-label",
	"onInput",
	"onKeydown"
], Rf = ["aria-label", "onClick"], zf = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiDynamicInput",
	__name: "DynamicInput",
	props: /*@__PURE__*/ w({
		placeholder: { default: "Type and press Enter…" },
		size: { default: "medium" },
		variant: { default: "soft" },
		disabled: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = L([""]), d = L([]), f = a(() => s.value.filter((e) => e.trim() !== ""));
		function p() {
			let e = (o.value ?? []).filter((e) => e !== ""), t = f.value;
			e.length === t.length && e.every((e, n) => e === t[n]) || (s.value = e.concat([""]));
		}
		q(() => o.value, p, { immediate: !0 });
		function h() {
			let e = f.value;
			o.value = e, i("change", e);
		}
		function g(e) {
			let t = Math.min(Math.max(e, 0), s.value.length - 1);
			E(() => {
				let e = d.value[t];
				e?.focus(), e?.select();
			});
		}
		function _(e, t) {
			let n = t.target.value, r = s.value.slice();
			r[e] = n, s.value = r, h();
		}
		function v(e, t) {
			t.preventDefault();
			let n = s.value.slice();
			n[e] = n[e].trim(), n.splice(e + 1, 0, ""), s.value = n, h(), g(e + 1);
		}
		function y(e, t) {
			if (s.value[e] !== "") return;
			t.preventDefault();
			let n = -1;
			for (let e = s.value.length - 1; e >= 0; --e) if (s.value[e] !== "") {
				n = e;
				break;
			}
			if (n === -1) return;
			let r = s.value.slice();
			r.splice(n, 1), s.value = r, h(), g(Math.max(n - 1, 0));
		}
		function b(e) {
			if (r.disabled) return;
			let t = s.value.slice();
			t.splice(e, 1), t.length || t.push(""), s.value = t, h(), g(Math.max(e - 1, 0));
		}
		let x = a(() => Z("mc-dynamic-input", "mc-recipe-well", "mc-sheen-sweep", `mc-dynamic-input--${r.variant}`, `mc-dynamic-input--${r.size}`, { "is-disabled": r.disabled }, r.customClass));
		return (n, r) => (P(), l("div", { class: D(x.value) }, [r[0] || (r[0] = u("span", {
			class: "mc-dynamic-input__grain mc-grain-overlay",
			"aria-hidden": "true"
		}, null, -1)), u("div", {
			class: "mc-dynamic-input__track",
			role: "list",
			"aria-disabled": e.disabled || void 0
		}, [(P(!0), l(t, null, R(s.value, (t, n) => (P(), l("span", {
			key: n,
			class: D(["mc-dynamic-input__pill", { "is-empty": t === "" }]),
			role: "listitem"
		}, [u("input", {
			ref_for: !0,
			ref: (e) => {
				e && (d.value[n] = e);
			},
			class: "mc-dynamic-input__field",
			value: t,
			placeholder: n === s.value.length - 1 ? e.placeholder : "",
			disabled: e.disabled,
			size: Math.max(t.length, 1),
			"aria-label": `value ${n + 1}`,
			autocomplete: "off",
			onInput: (e) => _(n, e),
			onKeydown: [Y((e) => v(n, e), ["enter"]), Y((e) => y(n, e), ["backspace"])]
		}, null, 40, Lf), t !== "" && !e.disabled ? (P(), l("button", {
			key: 0,
			type: "button",
			class: "mc-dynamic-input__remove",
			"aria-label": `remove ${t}`,
			onClick: (e) => b(n)
		}, [m($, {
			name: "close",
			size: 10,
			"stroke-width": 2.6
		})], 8, Rf)) : c("", !0)], 2))), 128))], 8, If)], 2));
	}
}), [["__scopeId", "data-v-cbb356f5"]]), Bf = [
	"aria-label",
	"onKeydown",
	"onBlur"
], Vf = {
	key: 1,
	class: "mc-dynamic-tags__label"
}, Hf = [
	"aria-label",
	"disabled",
	"onClick"
], Uf = [
	"aria-label",
	"disabled",
	"onClick"
], Wf = [
	"placeholder",
	"disabled",
	"size",
	"aria-label",
	"aria-invalid",
	"aria-describedby"
], Gf = ["id"], Kf = 2600, qf = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiDynamicTags",
	__name: "DynamicTags",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"remove",
		"edit",
		"reject"
	], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, o = n, s = K(e, "modelValue"), d = rn(), f = Ln("mc-dynamic-tags-error"), p = L(""), h = L(null), g = L(null), _ = L(-1), v = L(""), y = L(!1), b = L(""), x = a(() => s.value ?? []), S = a(() => r.max > 0 && x.value.length >= r.max), C = a(() => b.value !== ""), w = a(() => ({
			add: d.value.dynamicTags?.add ?? "add a tag",
			remove: d.value.dynamicTags?.remove ?? "remove {tag}",
			edit: d.value.dynamicTags?.edit ?? "edit {tag}",
			empty: d.value.dynamicTags?.empty ?? "A tag cannot be empty",
			duplicate: d.value.dynamicTags?.duplicate ?? "This tag already exists",
			max: d.value.dynamicTags?.max ?? "You can only add {count} tags",
			rejected: d.value.dynamicTags?.rejected ?? "This tag was rejected",
			removeRejected: d.value.dynamicTags?.removeRejected ?? "This tag cannot be removed"
		})), T;
		function O(e) {
			T !== void 0 && (clearTimeout(T), T = void 0), b.value = e;
		}
		function k() {
			T !== void 0 && (clearTimeout(T), T = void 0), b.value = "";
		}
		function j(e) {
			O(e), T = setTimeout(() => {
				T = void 0, b.value = "";
			}, Kf);
		}
		async function ee(e, t) {
			if (!e) return !0;
			try {
				return await e(t, x.value) !== !1;
			} catch {
				return !1;
			}
		}
		function M(e) {
			return e === !1 ? w.value.rejected : typeof e == "string" && e.trim() ? e : !0;
		}
		function N(e, t) {
			if (!e) return !0;
			try {
				return M(e(t));
			} catch {
				return w.value.rejected;
			}
		}
		async function F(e, t) {
			if (!e) return !0;
			try {
				return M(await e(t));
			} catch {
				return w.value.rejected;
			}
		}
		function I(e, t) {
			j(t), o("reject", e, t), p.value = "";
		}
		async function z() {
			if (r.disabled || y.value) return;
			let e = p.value.trim();
			if (!e) {
				p.value = "";
				return;
			}
			if (S.value) {
				O(w.value.max.replace("{count}", String(r.max)));
				return;
			}
			if (x.value.includes(e)) {
				O(w.value.duplicate), p.value = "";
				return;
			}
			let t = N(r.validator, e);
			if (t !== !0) {
				I(e, t);
				return;
			}
			if (y.value = !0, !await ee(r.beforeAdd, e)) {
				y.value = !1, O(w.value.rejected), p.value = "";
				return;
			}
			let n = await F(r.onBeforeAdd, e);
			if (y.value = !1, n !== !0) {
				I(e, n);
				return;
			}
			let i = x.value.concat([e]);
			s.value = i, o("change", i), p.value = "", k();
		}
		async function B(e) {
			if (r.disabled || y.value) return;
			let t = x.value[e];
			if (t === void 0) return;
			y.value = !0;
			let n = await ee(r.beforeRemove, t);
			if (y.value = !1, !n) {
				O(w.value.removeRejected);
				return;
			}
			let i = x.value.filter((t, n) => n !== e);
			s.value = i, o("change", i), o("remove", t), k(), E(() => h.value?.focus());
		}
		function V(e) {
			g.value = e ?? null;
		}
		function U(e) {
			if (r.disabled || y.value) return;
			let t = x.value[e];
			t !== void 0 && (_.value = e, v.value = t, k(), E(() => {
				let e = g.value;
				e?.focus(), e?.select();
			}));
		}
		function G() {
			_.value = -1, v.value = "";
		}
		function te(e) {
			if (_.value !== e) return;
			let t = x.value[e];
			if (t === void 0) {
				G();
				return;
			}
			let n = v.value.trim();
			if (!n) O(w.value.empty), G(), E(() => h.value?.focus());
			else if (n !== t && x.value.some((t, r) => r !== e && t === n)) O(w.value.duplicate), G(), E(() => h.value?.focus());
			else {
				if (n !== t) {
					let t = x.value.map((t, r) => r === e ? n : t);
					s.value = t, o("change", t), o("edit", n);
				}
				G(), k(), E(() => h.value?.focus());
			}
		}
		function re(e) {
			e.key === "Enter" ? (e.preventDefault(), z()) : e.key === "Backspace" && !p.value && x.value.length && (e.preventDefault(), B(x.value.length - 1));
		}
		function ae() {
			z();
		}
		q(() => r.max, () => {
			S.value && (p.value = "");
		}), A(() => {
			T !== void 0 && (clearTimeout(T), T = void 0);
		});
		let oe = a(() => Z("mc-dynamic-tags", "mc-recipe-well", "mc-sheen-sweep", `mc-dynamic-tags--${r.size}`, `mc-dynamic-tags--${r.color}`, {
			"is-disabled": r.disabled,
			"is-full": S.value,
			"is-error": C.value,
			"is-busy": y.value
		}, r.customClass));
		return (n, r) => (P(), l("div", { class: D(oe.value) }, [
			r[3] || (r[3] = u("span", {
				class: "mc-dynamic-tags__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			m(i, {
				tag: "div",
				class: "mc-dynamic-tags__list",
				name: "mc-tag-pop"
			}, {
				default: J(() => [(P(!0), l(t, null, R(x.value, (t, n) => (P(), l("span", {
					key: t,
					class: "mc-dynamic-tags__tag",
					role: "listitem"
				}, [
					_.value === n ? ie((P(), l("input", {
						key: 0,
						ref_for: !0,
						ref: V,
						"onUpdate:modelValue": r[0] || (r[0] = (e) => v.value = e),
						class: "mc-dynamic-tags__edit",
						type: "text",
						"aria-label": w.value.edit.replace("{tag}", t),
						autocomplete: "off",
						onKeydown: [Y(X((e) => te(n), ["prevent"]), ["enter"]), r[1] || (r[1] = Y(X((e) => G(), ["prevent"]), ["esc"]))],
						onBlur: (e) => te(n)
					}, null, 40, Bf)), [[ne, v.value]]) : (P(), l("span", Vf, H(t), 1)),
					!e.disabled && _.value !== n ? (P(), l("button", {
						key: 2,
						type: "button",
						class: "mc-dynamic-tags__action",
						"aria-label": w.value.edit.replace("{tag}", t),
						disabled: y.value,
						onClick: (e) => U(n)
					}, [m($, {
						name: "edit",
						size: 11,
						"stroke-width": 2.2
					})], 8, Hf)) : c("", !0),
					e.disabled ? c("", !0) : (P(), l("button", {
						key: 3,
						type: "button",
						class: "mc-dynamic-tags__action mc-dynamic-tags__remove",
						"aria-label": w.value.remove.replace("{tag}", t),
						disabled: y.value,
						onClick: (e) => B(n)
					}, [m($, {
						name: "close",
						size: 10,
						"stroke-width": 2.6
					})], 8, Uf))
				]))), 128))]),
				_: 1
			}),
			ie(u("input", {
				ref_key: "input",
				ref: h,
				"onUpdate:modelValue": r[2] || (r[2] = (e) => p.value = e),
				class: D(["mc-dynamic-tags__input", { "is-error": C.value }]),
				placeholder: S.value ? "" : e.placeholder,
				disabled: e.disabled || S.value,
				size: Math.max(p.value.length, 1),
				"aria-label": e.placeholder || w.value.add,
				"aria-invalid": C.value || void 0,
				"aria-describedby": C.value ? W(f) : void 0,
				autocomplete: "off",
				onKeydown: re,
				onBlur: ae
			}, null, 42, Wf), [[ne, p.value]]),
			C.value ? (P(), l("p", {
				key: 0,
				id: W(f),
				class: "mc-dynamic-tags__error",
				role: "alert"
			}, H(b.value), 9, Gf)) : c("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-396b2174"]]), Jf = ["role"], Yf = ["role"], Xf = ["role"], Zf = ["role"], Qf = ["role"], $f = ["role"], ep = ["role"], tp = ["role"], np = ["role"], rp = ["role"], ip = ["role"], ap = ["role"], op = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => Z("mc-element", { "is-inline": t.inline }, t.customClass)), r = [
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
		], i = a(() => r.includes(t.as) ? t.as : "div");
		return (t, r) => i.value === "div" ? (P(), l("div", {
			key: 0,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, Jf)) : i.value === "span" ? (P(), l("span", {
			key: 1,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, Yf)) : i.value === "p" ? (P(), l("p", {
			key: 2,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, Xf)) : i.value === "section" ? (P(), l("section", {
			key: 3,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, Zf)) : i.value === "article" ? (P(), l("article", {
			key: 4,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, Qf)) : i.value === "aside" ? (P(), l("aside", {
			key: 5,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, $f)) : i.value === "header" ? (P(), l("header", {
			key: 6,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, ep)) : i.value === "footer" ? (P(), l("footer", {
			key: 7,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, tp)) : i.value === "main" ? (P(), l("main", {
			key: 8,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, np)) : i.value === "nav" ? (P(), l("nav", {
			key: 9,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, rp)) : i.value === "label" ? (P(), l("label", {
			key: 10,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, ip)) : (P(), l("div", {
			key: 11,
			class: D(n.value),
			role: e.role
		}, [z(t.$slots, "default", {}, void 0, !0)], 10, ap));
	}
}), [["__scopeId", "data-v-032e1793"]]), sp = ["title"], cp = ["disabled", "aria-expanded"], lp = { class: "mc-ellipsis__toggle-inner" }, up = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(!1), r = rn(), i = a(() => r.value.ellipsis?.expand ?? "Expand"), o = a(() => r.value.ellipsis?.collapse ?? "Collapse"), s = a(() => `mc-ellipsis--clamp-${Math.min(4, Math.max(1, t.lines))}`), d = a(() => Z("mc-ellipsis", s.value, `mc-ellipsis--${t.direction}`, {
			"is-expanded": n.value,
			"is-expandable": t.expandable,
			"is-disabled": t.disabled
		}, t.customClass));
		function f() {
			t.disabled || (n.value = !n.value);
		}
		return (t, r) => (P(), l("span", {
			class: D(d.value),
			title: e.tooltip ? e.text : void 0
		}, [u("span", { class: D(["mc-ellipsis__text", { "is-faded": e.showMore }]) }, H(e.text), 3), e.expandable ? (P(), l("button", {
			key: 0,
			class: "mc-ellipsis__toggle",
			type: "button",
			disabled: e.disabled,
			"aria-expanded": n.value,
			onClick: f
		}, [u("span", lp, [p(H(n.value ? o.value : i.value) + " ", 1), m($, {
			name: n.value ? "chevron-up" : "chevron-down",
			size: 12
		}, null, 8, ["name"])])], 8, cp)) : c("", !0)], 10, sp));
	}
}), [["__scopeId", "data-v-4d54de31"]]), dp = [
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
], fp = ["disabled", "aria-expanded"], pp = {
	key: 0,
	class: "mc-emoji__value"
}, mp = { class: "mc-emoji__search mc-recipe-well" }, hp = ["placeholder"], gp = {
	key: 0,
	class: "mc-emoji__section"
}, _p = { class: "mc-emoji__grid" }, vp = ["disabled", "onClick"], yp = ["data-emoji-category"], bp = { class: "mc-emoji__section-title" }, xp = { class: "mc-emoji__grid" }, Sp = ["disabled", "onClick"], Cp = {
	key: 0,
	class: "mc-emoji__empty mc-aurora-inset"
}, wp = { class: "mc-emoji__tabs" }, Tp = [
	"disabled",
	"aria-pressed",
	"onClick"
], Ep = "mochi-ui:recent-emoji", Dp = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiEmoji",
	__name: "Emoji",
	props: /*@__PURE__*/ w({
		categories: { default: () => dp },
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["select"], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), h = Hn(), g = L(!1), { isTop: _ } = Pn({ active: g }), v = jn({ active: g }), y = L(""), b = L(o.categories[0]?.key ?? ""), x = L(null), S = L(null), { style: C } = Cn(x, S, {
			placement: o.placement,
			offset: 8,
			zIndex: v
		});
		ml(x, () => g.value = !1, { ignore: [S] });
		function w() {
			if (typeof localStorage > "u") return [];
			try {
				let e = localStorage.getItem(Ep);
				return e ? JSON.parse(e) : [];
			} catch {
				return [];
			}
		}
		let E = L(w());
		function O(e) {
			let t = [e, ...E.value.filter((t) => t !== e)].slice(0, 16);
			E.value = t;
			try {
				localStorage.setItem(Ep, JSON.stringify(t));
			} catch {}
		}
		let k = a(() => {
			let e = y.value.trim().toLowerCase();
			return e ? o.categories.map((t) => ({
				...t,
				emojis: t.emojis.filter((t) => t.includes(e))
			})).filter((e) => e.emojis.length) : o.categories;
		});
		function j(e) {
			o.disabled || (f.value = e, d("select", e), O(e), g.value = !1);
		}
		function ee() {
			o.disabled || (g.value = !g.value);
		}
		let M = L(null);
		function N(e) {
			b.value = e;
			let t = M.value;
			if (!t) return;
			let n = t.querySelector(`[data-emoji-category="${e}"]`);
			n && t.scrollTo({
				top: Math.max(0, n.offsetTop - 8),
				behavior: "smooth"
			});
		}
		function F() {
			let e = M.value;
			if (!e) return;
			let t = e.scrollTop + 12, n = "";
			for (let r of Array.from(e.querySelectorAll("[data-emoji-category]"))) r.offsetTop <= t && (n = r.dataset.emojiCategory ?? n);
			n || (n = e.querySelector("[data-emoji-category]")?.dataset.emojiCategory ?? ""), n && (b.value = n);
		}
		function I(e) {
			e.key === "Escape" && g.value && _() && (e.stopPropagation(), g.value = !1, x.value?.focus());
		}
		q(g, (e) => {
			e && (y.value = ""), typeof document < "u" && (document.removeEventListener("keydown", I), e && document.addEventListener("keydown", I));
		}), A(() => {
			typeof document < "u" && document.removeEventListener("keydown", I);
		}), q(() => o.disabled, (e) => {
			e && (g.value = !1);
		});
		let B = a(() => {
			if (o.teleport !== !1) return typeof o.teleport == "string" ? o.teleport : "body";
		});
		return (i, a) => (P(), l("span", { class: D(["mc-emoji", W(Z)(e.customClass)]) }, [u("button", {
			ref_key: "triggerRef",
			ref: x,
			class: "mc-emoji__trigger",
			type: "button",
			"aria-label": "选择表情",
			disabled: e.disabled,
			"aria-expanded": g.value,
			onClick: ee,
			onMouseenter: a[0] || (a[0] = (t) => e.trigger === "hover" && !e.disabled && (g.value = !0))
		}, [z(i.$slots, "default", { emoji: e.modelValue }, () => [e.modelValue ? (P(), l("span", pp, H(e.modelValue), 1)) : (P(), s($, {
			key: 1,
			name: "heart",
			size: 18
		}))], !0)], 40, fp), (P(), s(n, { to: B.value }, [m(r, { name: "mc-emoji-fade" }, {
			default: J(() => [g.value ? (P(), l("div", T({
				key: 0,
				ref_key: "panelRef",
				ref: S,
				class: "mc-emoji__panel mc-grain-overlay mc-recipe-panel",
				style: {
					...W(C),
					width: `${e.width}px`
				}
			}, W(h)), [
				u("div", mp, [m($, {
					name: "search",
					size: 14
				}), ie(u("input", {
					"onUpdate:modelValue": a[1] || (a[1] = (e) => y.value = e),
					type: "text",
					placeholder: e.placeholder,
					onKeydown: a[2] || (a[2] = Y((e) => g.value = !1, ["esc"]))
				}, null, 40, hp), [[ne, y.value]])]),
				E.value.length && !y.value ? (P(), l("div", gp, [a[3] || (a[3] = u("div", { class: "mc-emoji__section-title" }, "最近使用", -1)), u("div", _p, [(P(!0), l(t, null, R(E.value, (t) => (P(), l("button", {
					key: t,
					class: "mc-emoji__cell",
					type: "button",
					disabled: e.disabled,
					onClick: (e) => j(t)
				}, H(t), 9, vp))), 128))])])) : c("", !0),
				u("div", {
					ref_key: "bodyRef",
					ref: M,
					class: "mc-emoji__body mc-scroll",
					onScrollPassive: F
				}, [(P(!0), l(t, null, R(k.value, (n) => (P(), l("div", {
					key: n.key,
					class: "mc-emoji__section",
					"data-emoji-category": n.key
				}, [u("div", bp, [m($, {
					name: n.icon,
					size: 12
				}, null, 8, ["name"]), p(" " + H(n.label), 1)]), u("div", xp, [(P(!0), l(t, null, R(n.emojis, (t) => (P(), l("button", {
					key: t,
					class: "mc-emoji__cell",
					type: "button",
					disabled: e.disabled,
					onClick: (e) => j(t)
				}, H(t), 9, Sp))), 128))])], 8, yp))), 128)), k.value.length ? c("", !0) : (P(), l("p", Cp, [...a[4] || (a[4] = [u("span", { class: "mc-emoji__empty-text" }, "没有找到表情", -1)])]))], 544),
				u("div", wp, [(P(!0), l(t, null, R(e.categories, (t) => (P(), l("button", {
					key: t.key,
					class: D(["mc-emoji__tab mc-sheen-sweep", { "is-active": b.value === t.key }]),
					type: "button",
					disabled: e.disabled,
					"aria-pressed": b.value === t.key,
					onClick: (e) => N(t.key)
				}, [m($, {
					name: t.icon,
					size: 15
				}, null, 8, ["name"])], 10, Tp))), 128))])
			], 16)) : c("", !0)]),
			_: 1
		})], 8, ["to"]))], 2));
	}
}), [["__scopeId", "data-v-5b90ca62"]]), Op = { class: "mc-empty__art" }, kp = { class: "mc-empty__figure" }, Ap = {
	key: 0,
	class: "mc-empty__status"
}, jp = {
	key: 0,
	class: "mc-empty__description"
}, Mp = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => t.size === "small" ? 26 : t.size === "large" ? 58 : 40), r = a(() => Z("mc-empty", `mc-empty--${t.size}`, { "has-status": !!t.status }, t.customClass));
		return (t, i) => (P(), l("div", {
			class: D(r.value),
			role: "status"
		}, [u("div", Op, [
			i[0] || (i[0] = u("span", {
				class: "mc-empty__halo",
				"aria-hidden": "true"
			}, null, -1)),
			i[1] || (i[1] = u("span", {
				class: "mc-empty__ring mc-sheen-sweep",
				"aria-hidden": "true"
			}, [u("span", { class: "mc-empty__grain mc-grain-overlay" })], -1)),
			u("span", kp, [z(t.$slots, "image", {}, () => [m($, {
				name: e.image,
				class: "mc-empty__icon",
				size: n.value,
				"stroke-width": 1.5
			}, null, 8, ["name", "size"])], !0)]),
			e.status ? (P(), l("span", Ap, [m($, {
				name: e.status,
				size: 14,
				"stroke-width": 2.2,
				label: e.status
			}, null, 8, ["name", "label"])])) : c("", !0),
			i[2] || (i[2] = u("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--a",
				"aria-hidden": "true"
			}, null, -1)),
			i[3] || (i[3] = u("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--b",
				"aria-hidden": "true"
			}, null, -1)),
			i[4] || (i[4] = u("span", {
				class: "mc-empty__sparkle mc-empty__sparkle--c",
				"aria-hidden": "true"
			}, null, -1))
		]), e.description || t.$slots.default ? (P(), l("p", jp, [z(t.$slots, "default", {}, () => [p(H(e.description), 1)], !0)])) : c("", !0)], 2));
	}
}), [["__scopeId", "data-v-009091d0"]]), Np = ["aria-label"], Pp = { class: "mc-equation__inner" }, Fp = {
	key: 0,
	class: "mc-equation__sup"
}, Ip = {
	key: 1,
	class: "mc-equation__sub"
}, Lp = {
	key: 2,
	class: "mc-equation__frac"
}, Rp = { class: "mc-equation__num" }, zp = { class: "mc-equation__den" }, Bp = { key: 4 }, Vp = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = {
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
		}, i = {
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
		}, o = a(() => {
			let e = n.formula ?? "", t = [], a = 0, o = "", s = () => {
				o && (t.push({
					type: "text",
					value: o
				}), o = "");
			};
			for (; a < e.length;) {
				let n = e[a];
				if (n === "\\") {
					let n = /\\([A-Za-z]+)/.exec(e.slice(a));
					if (n) {
						s();
						let o = n[1];
						if (o === "frac") {
							let r = e.slice(a + n[0].length), i = /^\{([^{}]*)\}/.exec(r)?.[1] ?? "", o = /^\{[^{}]*\}/.exec(r.slice(i ? i.length + 2 : 0))?.[1] ?? "";
							t.push({
								type: "frac",
								value: "",
								num: i,
								den: o
							}), a += n[0].length + (i ? i.length + 2 : 0) + (o ? o.length + 2 : 0);
							continue;
						}
						if (o === "sqrt") {
							s();
							let r = e.slice(a + n[0].length), i = /^\{([^{}]*)\}/.exec(r)?.[1] ?? "";
							t.push({
								type: "text",
								value: `√${i}`
							}), a += n[0].length + (i ? i.length + 2 : 0);
							continue;
						}
						let c = r[o] ?? i[o];
						c ? t.push({
							type: "text",
							value: c
						}) : t.push({
							type: "error",
							value: o
						}), a += n[0].length;
						continue;
					}
				}
				if (n === "^" || n === "_") {
					s();
					let r = n === "^", i = e.slice(a + 1), o, c;
					i.startsWith("{") ? (o = /^\{([^{}]*)\}/.exec(i)?.[1] ?? "", c = o.length + 2) : (o = i[0] ?? "", c = 1), t.push({
						type: r ? "sup" : "sub",
						value: o
					}), a += 1 + c;
				} else o += n, a++;
			}
			return s(), t;
		}), s = a(() => Z("mc-equation", {
			"is-display": n.display,
			"mc-recipe-sheet": n.display,
			"mc-sheen-sweep": n.display
		}, n.customClass)), c = a(() => {
			let e = "";
			for (let t of o.value) t.type === "sup" ? e += ` power ${t.value} ` : t.type === "sub" ? e += ` subscript ${t.value} ` : t.type === "frac" ? e += ` ${t.num} over ${t.den} ` : e += t.value;
			return e.replace(/\s+/g, " ").trim();
		});
		return (n, r) => (P(), l("span", {
			class: D(s.value),
			"aria-label": c.value || void 0
		}, [u("span", Pp, [(P(!0), l(t, null, R(o.value, (n, r) => (P(), l(t, { key: r }, [n.type === "sup" ? (P(), l("sup", Fp, H(n.value), 1)) : n.type === "sub" ? (P(), l("sub", Ip, H(n.value), 1)) : n.type === "frac" ? (P(), l("span", Lp, [u("span", Rp, H(n.num), 1), u("span", zp, H(n.den), 1)])) : n.type === "error" ? (P(), l("span", {
			key: 3,
			class: "mc-equation__error",
			style: k(e.errorColor ? { color: e.errorColor } : void 0)
		}, H(n.value), 5)) : (P(), l("span", Bp, H(n.value), 1))], 64))), 128))])], 10, Np));
	}
}), [["__scopeId", "data-v-9e449fe4"]]), Hp = {
	key: 1,
	class: "mc-error-boundary__panel mc-grain-overlay mc-recipe-panel",
	role: "alert",
	"aria-live": "assertive"
}, Up = {
	class: "mc-error-boundary__emblem",
	"aria-hidden": "true"
}, Wp = {
	class: "mc-error-boundary__title",
	"data-mc-type": "title"
}, Gp = {
	key: 0,
	class: "mc-error-boundary__description"
}, Kp = {
	key: 1,
	class: "mc-error-boundary__stack mc-recipe-well"
}, qp = { class: "mc-error-boundary__actions" }, Jp = {
	key: 2,
	class: "mc-error-boundary__minimal",
	role: "alert",
	"aria-live": "assertive"
}, Yp = { class: "mc-error-boundary__minimal-text" }, Xp = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = L(null), s = L(""), d = L(!1), f = L(0), p = a(() => o.value ?? /* @__PURE__ */ Error("Unknown error"));
		function h(e) {
			return e instanceof Error ? e : Error(typeof e == "string" ? e : JSON.stringify(e));
		}
		function g(e, t) {
			i("error", e, t);
		}
		let _ = !1;
		j((e, t, n) => {
			if (r.disabled) return !0;
			if (_ || d.value) return !1;
			_ = !0, d.value = !0;
			let i = h(e);
			return o.value = i, s.value = n, g(i, n), E(() => {
				_ = !1;
			}), !1;
		});
		function v() {
			_ = !1, d.value = !1, o.value = null, s.value = "", f.value += 1, i("retry");
		}
		function y() {
			_ = !1, d.value = !1, o.value = null, s.value = "", f.value += 1;
		}
		q(() => r.disabled, (e) => {
			e && y();
		});
		let b = a(() => Z("mc-error-boundary", `mc-error-boundary--${r.fallback}`, {
			"is-failed": d.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (P(), l("div", { class: D(b.value) }, [d.value ? (P(), l(t, { key: 1 }, [n.$slots.fallback ? z(n.$slots, "fallback", {
			error: p.value,
			retry: v
		}, void 0, !0, 0) : e.fallback === "panel" ? (P(), l("div", Hp, [r[0] || (r[0] = u("span", {
			class: "mc-error-boundary__aurora",
			"aria-hidden": "true"
		}, null, -1)), z(n.$slots, "error", {
			error: p.value,
			retry: v
		}, () => [
			u("span", Up, [m($, {
				name: "alert-triangle",
				size: 28,
				"stroke-width": 1.7
			})]),
			u("h3", Wp, H(e.title), 1),
			e.description ? (P(), l("p", Gp, H(e.description), 1)) : c("", !0),
			e.showStack && p.value.stack ? (P(), l("pre", Kp, H(p.value.stack), 1)) : c("", !0),
			u("div", qp, [u("button", {
				type: "button",
				class: "mc-error-boundary__retry",
				onClick: v
			}, [m($, {
				name: "rotate-cw",
				size: 15,
				"stroke-width": 2
			}), u("span", null, H(e.retryText), 1)])])
		], !0)])) : e.fallback === "minimal" ? (P(), l("p", Jp, [
			m($, {
				name: "alert-circle",
				size: 15,
				"stroke-width": 2,
				class: "mc-error-boundary__minimal-icon"
			}),
			u("span", Yp, H(e.title), 1),
			u("button", {
				type: "button",
				class: "mc-error-boundary__minimal-action",
				onClick: v
			}, H(e.retryText), 1)
		])) : c("", !0)], 64)) : (P(), l("div", {
			key: f.value,
			class: "mc-error-boundary__content"
		}, [z(n.$slots, "default", {}, void 0, !0)]))], 2));
	}
}), [["__scopeId", "data-v-365a4737"]]), Zp = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let i = a(() => ({
			display: n.inline ? "inline-flex" : "flex",
			flexDirection: n.direction,
			justifyContent: n.justify,
			alignItems: n.align,
			flexWrap: n.wrap ? "wrap" : "nowrap",
			gap: r(n.gap),
			flex: n.flex === void 0 ? void 0 : typeof n.flex == "number" ? `${n.flex} 1 0%` : n.flex,
			padding: r(n.padding),
			margin: r(n.margin)
		})), o = a(() => Z("mc-flex", `mc-flex--${n.direction}`, {
			"is-inline": n.inline,
			"is-wrap": n.wrap,
			"is-bordered": n.bordered
		}, n.customClass));
		return (e, t) => (P(), l("div", {
			class: D(o.value),
			style: k(i.value)
		}, [z(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-00592234"]]), Qp = { class: "mc-float-button__stack" }, $p = ["aria-hidden"], em = {
	key: 0,
	class: "mc-float-button__tip"
}, tm = [
	"disabled",
	"tabindex",
	"aria-label",
	"onClick"
], nm = [
	"disabled",
	"aria-label",
	"aria-expanded"
], rm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = L(!1), d = L(null), { isTop: f } = Pn({ active: s });
		function p(e = !0) {
			s.value = !1, o("update:open", !1), o("close"), e && E(() => d.value?.focus({ preventScroll: !0 }));
		}
		function h(e) {
			e.key === "Escape" && s.value && f() && (e.stopPropagation(), p());
		}
		function g() {
			r.disabled || (s.value = !s.value, o("update:open", s.value), s.value ? o("open") : o("close"));
		}
		function _(e) {
			r.disabled || (e.action?.(), o("select", e), p());
		}
		let v = a(() => ({
			zIndex: r.zIndex,
			"--mc-float-size": `${r.size}px`
		})), y = a(() => Z("mc-float-button", `is-${r.position}`, `is-${r.direction}`, {
			"is-open": s.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => e.visible ? (P(), l("div", {
			key: 0,
			class: D(y.value),
			style: k(v.value),
			onMouseleave: r[1] || (r[1] = (t) => e.trigger === "hover" && !e.disabled && (s.value = !1)),
			onKeydown: h
		}, [u("div", Qp, [(P(!0), l(t, null, R(e.actions, (t, n) => (P(), l("div", {
			key: t.key ?? n,
			class: "mc-float-button__item",
			style: k({
				"--mc-float-index": e.actions.length - 1 - n,
				"--mc-float-color": t.color ?? "var(--mc-accent)"
			}),
			"aria-hidden": s.value ? void 0 : "true"
		}, [t.tooltip || t.label ? (P(), l("span", em, H(t.tooltip ?? t.label), 1)) : c("", !0), u("button", {
			class: "mc-float-button__mini mc-recipe-panel",
			type: "button",
			disabled: e.disabled,
			tabindex: s.value ? void 0 : -1,
			"aria-label": t.tooltip ?? t.label ?? t.icon,
			onClick: (e) => _(t)
		}, [m($, {
			name: t.icon,
			size: 19
		}, null, 8, ["name"])], 8, tm)], 12, $p))), 128))]), u("button", {
			ref_key: "mainButton",
			ref: d,
			class: "mc-float-button__main",
			type: "button",
			disabled: e.disabled,
			"aria-label": s.value ? W(i).floatButton?.close ?? "Close actions" : W(i).floatButton?.open ?? "Open actions",
			"aria-expanded": s.value,
			onClick: g,
			onMouseenter: r[0] || (r[0] = (t) => e.trigger === "hover" && !e.disabled && (s.value = !0))
		}, [
			r[2] || (r[2] = u("span", {
				class: "mc-float-button__halo",
				"aria-hidden": "true"
			}, null, -1)),
			r[3] || (r[3] = u("span", {
				class: "mc-float-button__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			m($, {
				name: s.value ? e.closeIcon : e.icon,
				size: 22,
				class: "mc-float-button__icon"
			}, null, 8, ["name"])
		], 40, nm)], 38)) : c("", !0);
	}
}), [["__scopeId", "data-v-8cbcfe08"]]), im = Symbol("mochi-form"), am = { class: "mc-form__body" }, om = {
	key: 0,
	class: "mc-form__footer"
}, sm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiForm",
	__name: "Form",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: () => ({}) },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"submit",
		"validate"
	], ["update:modelValue"]),
	setup(e, { expose: t, emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = L({ ...o.value ?? {} }), d = I({ ...o.value ?? {} }), f = !1;
		q(() => o.value, (e) => {
			f = !0, s.value = { ...e ?? {} }, E(() => {
				f = !1;
			});
		}, { deep: !0 }), q(s, (e) => {
			f ? f = !1 : (o.value = { ...e }, i("change", { ...e }));
		}, { deep: !0 });
		let p = L({}), m = L({}), h = a(() => typeof r.labelWidth == "number" ? `${r.labelWidth}px` : r.labelWidth);
		function g(e) {
			if (e) return Object.prototype.hasOwnProperty.call(s.value, e) ? s.value[e] : e.split(".").reduce((e, t) => e == null ? e : e[t], s.value);
		}
		function _(e, t) {
			if (e) {
				if (e.includes(".")) {
					let n = e.split("."), r = { ...s.value }, i = r;
					for (let e = 0; e < n.length - 1; e += 1) {
						let t = n[e];
						i[t] = { ...i[t] ?? {} }, i = i[t];
					}
					i[n[n.length - 1]] = t, s.value = r;
				} else s.value = {
					...s.value,
					[e]: t
				};
			}
		}
		function v(e) {
			return !!(e == null || e === "" || Array.isArray(e) && e.length === 0);
		}
		async function y(e, t) {
			if (e.required && v(t)) return e.message ?? `${e.label ?? e.key} is required`;
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
		function b(e, t) {
			let n = { ...m.value };
			t ? n[e] = t : delete n[e], m.value = n;
		}
		async function x(e) {
			let t = r.rules.filter((t) => t.key === e);
			if (!t.length) {
				b(e, void 0);
				return;
			}
			let n = g(e);
			for (let r of t) {
				let t = await y(r, n);
				if (t) return b(e, t), t;
			}
			b(e, void 0);
		}
		async function S() {
			let e = Object.keys(p.value), t = (await Promise.all(e.map((e) => x(e)))).every((e) => !e);
			return i("validate", t), t;
		}
		function C(e) {
			e ? b(e, void 0) : m.value = {};
		}
		function w() {
			let e = {};
			for (let t of Object.keys(d)) e[t] = d[t];
			f = !0, s.value = e, o.value = { ...e }, m.value = {};
		}
		function T(e) {
			p.value = {
				...p.value,
				[e.key]: e
			};
		}
		function O(e) {
			let t = { ...p.value };
			delete t[e], p.value = t;
		}
		q(() => r.rules, () => {
			r.validateOnRuleChange && S();
		}, { deep: !0 }), t({
			validate: S,
			resetFields: w,
			clearValidate: C,
			validateField: x,
			errors: m,
			model: s
		});
		let A = {
			model: s,
			errors: m,
			layout: a(() => r.layout),
			labelWidth: h,
			labelPosition: a(() => r.labelPosition),
			disabled: a(() => r.disabled),
			size: a(() => r.size),
			register: T,
			unregister: O,
			setError: b,
			validateField: x,
			validate: S,
			resetFields: w,
			clearValidate: C,
			setFieldValue: _
		};
		F(im, A);
		async function j(e) {
			e.preventDefault(), await S() && i("submit", { ...s.value });
		}
		let ee = a(() => Z("mc-form", `mc-form--${r.layout}`, `mc-form--${r.size}`, { "is-disabled": r.disabled }, r.customClass));
		return (e, t) => (P(), l("form", {
			class: D(ee.value),
			style: k({ "--mc-form-label-width": h.value }),
			novalidate: "",
			onSubmit: j
		}, [u("div", am, [z(e.$slots, "default", {}, void 0, !0)]), e.$slots.footer ? (P(), l("footer", om, [z(e.$slots, "footer", {}, void 0, !0)])) : c("", !0)], 38));
	}
}), [["__scopeId", "data-v-9546ef56"]]), cm = {
	key: 0,
	class: "mc-form-item__label"
}, lm = {
	key: 0,
	class: "mc-form-item__asterisk",
	"aria-hidden": "true"
}, um = { class: "mc-form-item__label-text" }, dm = { class: "mc-form-item__content" }, fm = ["aria-describedby", "aria-invalid"], pm = ["role", "aria-live"], mm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = b(im, null), i = `${Ln("mc-form-item")}-message`, o = L(0), d = a(() => t.prop && n ? n.errors.value[t.prop] : void 0), f = a(() => t.error ?? d.value), h = a(() => t.required), g = a(() => !!f.value), _ = a(() => !!(f.value || t.feedback)), v = a(() => {
			let e = t.labelWidth ?? n?.labelWidth.value;
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		});
		q(() => f.value, (e) => {
			e && (o.value += 1);
		}), n && t.prop && (n.register({
			key: t.prop,
			label: t.label,
			required: t.required
		}), A(() => n.unregister(t.prop)));
		function y() {
			n && t.prop && n.validateField(t.prop);
		}
		function x(e) {
			let t = e.relatedTarget;
			t && e.currentTarget?.contains(t) || y();
		}
		let S = a(() => Z("mc-form-item", {
			"has-error": g.value,
			"has-label": t.showLabel && !!t.label,
			"is-required": h.value,
			"is-vertical": n?.layout.value === "vertical" || n?.labelPosition.value === "top",
			"is-label-left": n?.labelPosition.value === "left"
		}, t.customClass));
		return (t, n) => (P(), l("div", {
			class: D(S.value),
			style: k(v.value ? { "--mc-form-label-width": v.value } : void 0)
		}, [e.showLabel && e.label ? (P(), l("label", cm, [h.value ? (P(), l("span", lm, "*")) : c("", !0), u("span", um, H(e.label), 1)])) : c("", !0), u("div", dm, [u("div", {
			class: "mc-form-item__control",
			"aria-describedby": _.value ? i : void 0,
			"aria-invalid": g.value || void 0,
			onFocusout: x,
			onChange: y
		}, [z(t.$slots, "default", {}, void 0, !0)], 40, fm), m(r, { name: "mc-form-msg" }, {
			default: J(() => [_.value ? (P(), l("p", {
				id: i,
				key: f.value ? `error-${o.value}` : "feedback",
				class: D(["mc-form-item__message", { "is-error": g.value }]),
				role: f.value ? "alert" : void 0,
				"aria-live": f.value ? void 0 : "polite"
			}, [f.value ? (P(), s($, {
				key: 0,
				name: "alert-circle",
				size: 12,
				class: "mc-form-item__msg-icon"
			})) : c("", !0), p(" " + H(f.value || e.feedback), 1)], 10, pm)) : c("", !0)]),
			_: 1
		})])], 6));
	}
}), [["__scopeId", "data-v-48e877ca"]]), hm = {
	key: 0,
	class: "mc-form-row__label"
}, gm = { class: "mc-form-row__content" }, _m = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiFormRow",
	__name: "FormRow",
	props: {
		label: { default: "" },
		labelWidth: { default: void 0 },
		gutter: { default: 16 },
		customClass: {}
	},
	setup(e) {
		let t = e, n = b(im, null), r = a(() => {
			let e = t.labelWidth ?? n?.labelWidth.value;
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}), i = a(() => Z("mc-form-row", {
			"has-label": !!t.label,
			"is-vertical": n?.layout.value === "vertical" || n?.labelPosition.value === "top"
		}, t.customClass));
		return (t, n) => (P(), l("div", {
			class: D(i.value),
			style: k({
				"--mc-form-row-gutter": `${e.gutter}px`,
				...r.value ? { "--mc-form-label-width": r.value } : {}
			})
		}, [e.label ? (P(), l("label", hm, H(e.label), 1)) : c("", !0), u("div", gm, [z(t.$slots, "default", {}, void 0, !0)])], 6));
	}
}), [["__scopeId", "data-v-e09d3593"]]), vm = [
	"aria-label",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuetext",
	"aria-disabled"
], ym = {
	class: "mc-gauge__svg",
	viewBox: "0 0 120 120",
	"aria-hidden": "true",
	focusable: "false"
}, bm = ["id"], xm = ["stop-color"], Sm = ["stop-color"], Cm = ["stroke-dasharray", "transform"], wm = [
	"stroke",
	"stroke-dasharray",
	"transform"
], Tm = {
	key: 0,
	class: "mc-gauge__ticks"
}, Em = [
	"x1",
	"y1",
	"x2",
	"y2"
], Dm = {
	key: 1,
	class: "mc-gauge__labels"
}, Om = ["x", "y"], km = {
	key: 0,
	class: "mc-gauge__readout"
}, Am = {
	class: "mc-gauge__value",
	"data-mc-type": "readout"
}, jm = {
	key: 0,
	class: "mc-gauge__unit"
}, Mm = 60, Nm = 60, Pm = 55, Fm = 50, Im = 46, Lm = 42, Rm = 34, zm = 5, Bm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		function n(e, t) {
			let n = t * Math.PI / 180;
			return {
				x: Mm + e * Math.sin(n),
				y: Nm - e * Math.cos(n)
			};
		}
		function r(e) {
			return String(Math.round(e));
		}
		let i = e, o = Ln("mc-gauge-grad");
		function s(e) {
			return i.formatter ? i.formatter(e) : r(e);
		}
		let d = a(() => {
			let e = i.max - i.min;
			return e > 0 ? e : 1;
		}), f = a(() => Pt((i.value - i.min) / d.value, 0, 1)), p = a(() => Pt(i.sweep, 1, 359)), m = a(() => i.startAngle + f.value * p.value), h = a(() => 2 * Math.PI * Rm), g = a(() => p.value / 360 * h.value), _ = a(() => f.value * g.value), v = a(() => i.startAngle - 90), y = a(() => Ot(i.color) ?? "var(--mc-accent)"), b = a(() => {
			let e = Math.max(0, Math.floor(i.tickCount));
			if (!e) return [];
			let t = Math.max(1, Math.floor(i.majorTickEvery)), r = [];
			for (let a = 0; a < e; a++) {
				let o = e === 1 ? 0 : a / (e - 1), c = i.startAngle + o * p.value, l = a % t === 0 || a === e - 1, u = n(Pm, c), f = n(l ? Im : Fm, c), m = n(Lm, c);
				r.push({
					key: String(a),
					major: l,
					label: l ? s(i.min + o * d.value) : "",
					x1: f.x,
					y1: f.y,
					x2: u.x,
					y2: u.y,
					lx: m.x,
					ly: m.y
				});
			}
			return r;
		}), x = a(() => b.value.filter((e) => e.label)), S = a(() => s(Pt(i.value, i.min, i.max))), C = a(() => {
			let e = i.unit ? ` ${i.unit}` : "";
			return `${S.value}${e}`;
		}), w = a(() => ({ transform: `rotate(${m.value}deg)` })), T = a(() => Z("mc-gauge", {
			"is-disabled": i.disabled,
			"is-empty": f.value <= 0,
			"is-full": f.value >= 1
		}, i.customClass));
		return (n, r) => (P(), l("div", {
			class: D(T.value),
			style: k({
				width: `${e.size}px`,
				height: `${e.size}px`
			}),
			role: "meter",
			"aria-label": e.label,
			"aria-valuenow": W(Pt)(e.value, e.min, e.max),
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuetext": C.value,
			"aria-disabled": e.disabled || void 0
		}, [
			r[1] || (r[1] = u("span", {
				class: "mc-gauge__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[2] || (r[2] = u("span", {
				class: "mc-gauge__grain",
				"aria-hidden": "true"
			}, null, -1)),
			r[3] || (r[3] = u("span", {
				class: "mc-gauge__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			(P(), l("svg", ym, [
				u("defs", null, [u("linearGradient", {
					id: W(o),
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%"
				}, [u("stop", {
					offset: "0%",
					"stop-color": y.value
				}, null, 8, xm), u("stop", {
					offset: "100%",
					"stop-color": y.value,
					"stop-opacity": "0.72"
				}, null, 8, Sm)], 8, bm)]),
				u("circle", {
					class: "mc-gauge__arc-track",
					cx: Mm,
					cy: Nm,
					r: Rm,
					fill: "none",
					"stroke-width": zm,
					"stroke-dasharray": `${g.value} ${h.value}`,
					transform: `rotate(${v.value} ${Mm} ${Nm})`
				}, null, 8, Cm),
				u("circle", {
					class: "mc-gauge__arc-fill",
					cx: Mm,
					cy: Nm,
					r: Rm,
					fill: "none",
					"stroke-width": zm,
					"stroke-linecap": "round",
					stroke: `url(#${W(o)})`,
					"stroke-dasharray": `${_.value} ${h.value}`,
					transform: `rotate(${v.value} ${Mm} ${Nm})`
				}, null, 8, wm),
				e.showTicks ? (P(), l("g", Tm, [(P(!0), l(t, null, R(b.value, (e) => (P(), l("line", {
					key: e.key,
					class: D(["mc-gauge__tick", { "mc-gauge__tick--major": e.major }]),
					x1: e.x1,
					y1: e.y1,
					x2: e.x2,
					y2: e.y2
				}, null, 10, Em))), 128))])) : c("", !0),
				e.showLabels ? (P(), l("g", Dm, [(P(!0), l(t, null, R(x.value, (e) => (P(), l("text", {
					key: e.key,
					class: "mc-gauge__label",
					x: e.lx,
					y: e.ly,
					"text-anchor": "middle",
					"dominant-baseline": "middle"
				}, H(e.label), 9, Om))), 128))])) : c("", !0),
				e.showNeedle ? (P(), l("g", {
					key: 2,
					class: "mc-gauge__needle",
					style: k(w.value)
				}, [...r[0] || (r[0] = [u("path", {
					class: "mc-gauge__blade",
					d: "M60 31 L63.2 52 L56.8 52 Z"
				}, null, -1)])], 4)) : c("", !0),
				e.showNeedle ? (P(), l("circle", {
					key: 3,
					class: "mc-gauge__hub",
					cx: Mm,
					cy: Nm,
					r: "6"
				})) : c("", !0)
			])),
			e.showValue ? (P(), l("div", km, [z(n.$slots, "value", {}, () => [u("span", Am, H(S.value), 1), e.unit ? (P(), l("span", jm, H(e.unit), 1)) : c("", !0)], !0)])) : c("", !0)
		], 14, vm));
	}
}), [["__scopeId", "data-v-9fccfaa1"]]), Vm = "\n:where(html[data-mochi]) :where(a, button, [role='button']) {\n  transition:\n    color var(--mc-dur-base) var(--mc-ease-out),\n    background-color var(--mc-dur-base) var(--mc-ease-out),\n    transform var(--mc-dur-fast) var(--mc-ease-spring);\n}\n/* Zero specificity on purpose: a consumer's \".site-link:hover\" (0,2,0) and even\n   a plain \"a:hover\" (0,1,1) must beat this.  Set --mc-link-hover to change\n   the colour for the whole document without writing a selector at all. */\n:where(html[data-mochi]) :where(a:hover) {\n  color: var(--mc-link-hover, var(--mc-accent-text));\n}\n:where(html[data-mochi]) :where(button, [role='button']):active:not(:disabled) {\n  transform: scale(var(--mc-press-scale));\n}\n/* No :where() here — it contributes zero specificity, so the rule could\n   never beat the base.css focus rule and the ring was dead code. */\nhtml[data-mochi] :focus-visible {\n  outline: none;\n  box-shadow: var(--mc-focus-ring), var(--mc-glow-accent);\n  border-radius: inherit;\n}\nhtml[data-mochi] :disabled,\nhtml[data-mochi] [aria-disabled='true'] {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n", Hm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(null), r = null, i = a(() => {
			let e = [], n = [];
			return t.fontFamily && n.push(`html[data-mochi] body { font-family: ${t.fontFamily}; }`), t.baseFontSize && e.push(`html[data-mochi] { font-size: ${t.baseFontSize}px; }`), t.background && n.push(`html[data-mochi] body { background: ${t.background}; }`), t.color && n.push(`html[data-mochi] body { color: ${t.color}; }`), n.length && e.push(`@layer mochi.global {\n${n.join("\n")}\n}`), t.smoothScroll && e.push("html[data-mochi] { scroll-behavior: smooth; }"), t.disableSelection && e.push("html[data-mochi] body, html[data-mochi] body * { -webkit-user-select: none; user-select: none; }"), t.scrollbar || (e.push("html[data-mochi] ::-webkit-scrollbar { width: 0; height: 0; }"), e.push("html[data-mochi] * { scrollbar-width: none; }")), t.baseline && e.push(Vm), t.glass && e.push("\n:where(html[data-mochi] .mc-glass, html[data-mochi] .mc-panel, html[data-mochi] .mc-glass-strong) {\n  -webkit-backdrop-filter: blur(var(--mc-panel-blur)) saturate(var(--mc-panel-sat));\n  backdrop-filter: blur(var(--mc-panel-blur)) saturate(var(--mc-panel-sat));\n}\n"), t.aurora && e.push("\nhtml[data-mochi] body {\n  background-image: radial-gradient(\n    60% 42% at 18% 0%,\n    color-mix(in srgb, var(--mc-accent) 14%, transparent) 0%,\n    transparent 72%\n  );\n}\n"), t.grain && e.push("\nhtml[data-mochi] body::before {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background-image: var(--mc-grain);\n  background-size: 140px 140px;\n  opacity: var(--mc-grain-alpha);\n  mix-blend-mode: soft-light;\n}\n"), t.sheen && e.push("\nhtml[data-mochi] body::after {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  z-index: 1;\n  pointer-events: none;\n  background: var(--mc-gradient-sheen);\n  animation: mc-sheen 1.4s var(--mc-ease-spring) forwards;\n}\n"), e.push("\nhtml[data-mochi] ::selection {\n  background: var(--mc-accent-glow);\n  color: var(--mc-text-1);\n}\nhtml[data-mochi] ::-webkit-scrollbar-thumb {\n  background: var(--mc-scrollbar-thumb);\n  border-radius: var(--mc-radius-pill);\n}\nhtml[data-mochi] ::-webkit-scrollbar-thumb:hover {\n  background: var(--mc-scrollbar-thumb-hover);\n}\n"), t.css && e.push(t.css), e.join("\n");
		});
		function o() {
			if (typeof document > "u") return;
			s();
			let e = document.createElement("style");
			e.setAttribute("data-mochi-global-style", ""), e.textContent = i.value, t.target === "head" ? document.head.appendChild(e) : n.value?.parentNode?.insertBefore(e, n.value.nextSibling), r = e;
		}
		function s() {
			r?.remove(), r = null;
		}
		return ee(o), q(i, () => o()), A(s), (e, r) => (P(), l("span", {
			ref_key: "anchor",
			ref: n,
			class: D(W(Z)("mc-global-style", t.customClass))
		}, null, 2));
	}
}), [["__scopeId", "data-v-a16a3c52"]]), Um = [
	"tabindex",
	"role",
	"aria-disabled"
], Wm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = a(() => Z("mc-gradient-text", {
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
		return (t, n) => (P(), l("span", {
			class: D(i.value),
			style: k(e.gradient ? { backgroundImage: e.gradient } : void 0),
			tabindex: e.focusable ? 0 : void 0,
			role: e.focusable ? "button" : void 0,
			"aria-disabled": e.disabled || void 0,
			onClick: o,
			onKeydown: s
		}, [z(t.$slots, "default", {}, void 0, !0)], 46, Um));
	}
}), [["__scopeId", "data-v-544e0c39"]]), Gm = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		function i(e) {
			if (e !== void 0) return Number.isFinite(e) ? Math.max(1, Math.round(e)) : 1;
		}
		function o() {
			if (typeof n.cols == "number") {
				let e = i(n.cols) ?? 1;
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
				let r = i(e[n]);
				r !== void 0 && (t[n] = r);
			}
			return t;
		}
		function s(e) {
			let n = e / 4;
			return Number.isInteger(n) && t.includes(n) ? `var(--mc-space-${n})` : `${e}px`;
		}
		let c = a(() => {
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
		}), u = a(() => Z("mc-grid", { "is-bordered": n.bordered }, n.customClass));
		return (e, t) => (P(), l("div", {
			class: D(u.value),
			style: k(c.value)
		}, [z(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-62d749b7"]]), Km = { class: "mc-heatmap__frame mc-grain-overlay" }, qm = { class: "mc-heatmap__scroll mc-scroll" }, Jm = [
	"width",
	"height",
	"aria-label"
], Ym = {
	key: 0,
	class: "mc-heatmap__months"
}, Xm = ["x"], Zm = ["transform"], Qm = { key: 0 }, $m = ["y"], eh = ["transform"], th = [
	"y",
	"width",
	"height",
	"aria-label"
], nh = 22, rh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = `${Ln("mc-heat")}-hot`;
		function i(e) {
			let t = new Date(e);
			return Number.isNaN(t.getTime()) ? /* @__PURE__ */ new Date() : t;
		}
		function o(e) {
			return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
		}
		let s = a(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of n.data) e.set(t.date, t.value);
			return e;
		}), d = a(() => {
			let e = n.end ? i(n.end) : /* @__PURE__ */ new Date();
			return {
				start: n.start ? i(n.start) : /* @__PURE__ */ new Date(e.getTime() - 156384e5),
				end: e
			};
		}), f = a(() => {
			let { start: e, end: t } = d.value, n = new Date(e), r = (n.getDay() + 6) % 7;
			n.setDate(n.getDate() - r);
			let i = [], a = new Date(n), c = t.getTime(), l = s.value;
			for (; a.getTime() <= c;) {
				let e = [];
				for (let t = 0; t < 7; t++) {
					let t = o(a);
					e.push({
						date: t,
						value: l.get(t) ?? 0
					}), a.setDate(a.getDate() + 1);
				}
				i.push({
					key: i[0] ? `${i.length}` : "0",
					days: e
				});
			}
			return i;
		}), p = a(() => {
			let e = n.data.map((e) => e.value);
			return e.length ? Math.max(...e, 1) : 1;
		}), m = a(() => Math.min(5, Math.max(1, n.levels)));
		function h(e) {
			if (e <= 0) return 0;
			let t = e / p.value;
			return Math.min(m.value, Math.max(1, Math.ceil(t * m.value)));
		}
		let g = a(() => {
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
		}), _ = a(() => {
			if (!n.showMonthLabels) return [];
			let e = null;
			try {
				e = new Intl.DateTimeFormat(n.locale, { month: "short" });
			} catch {
				e = null;
			}
			let t = [], r = -1;
			return f.value.forEach((n, a) => {
				let o = i(n.days[0].date), s = o.getMonth();
				s !== r && (r = s, t.push({
					index: a,
					label: e ? e.format(o) : `${s + 1}`
				}));
			}), t;
		}), v = a(() => f.value.length * (n.cellSize + n.gap) + (n.showWeekdayLabels ? nh : 0)), y = a(() => 7 * (n.cellSize + n.gap)), b = a(() => Z("mc-heatmap", "mc-aurora-inset", "mc-recipe-sheet", n.customClass));
		function x(e) {
			return n.tooltip ? n.tooltip(e) : `${e.date} · ${e.value}`;
		}
		return (n, i) => (P(), l("div", { class: D(b.value) }, [u("div", Km, [u("div", qm, [(P(), l("svg", {
			class: "mc-heatmap__grid",
			width: v.value,
			height: y.value + (e.showMonthLabels ? 16 : 0),
			role: "group",
			"aria-label": e.label
		}, [
			u("defs", null, [u("linearGradient", {
				id: r,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1"
			}, [...i[0] || (i[0] = [u("stop", {
				offset: "0%",
				"stop-color": "var(--mc-accent-3)"
			}, null, -1), u("stop", {
				offset: "100%",
				"stop-color": "var(--mc-accent)"
			}, null, -1)])])]),
			e.showMonthLabels ? (P(), l("g", Ym, [(P(!0), l(t, null, R(_.value, (t) => (P(), l("text", {
				key: t.index,
				x: (e.showWeekdayLabels ? nh : 0) + t.index * (e.cellSize + e.gap),
				y: 11,
				class: "mc-heatmap__month"
			}, H(t.label), 9, Xm))), 128))])) : c("", !0),
			u("g", { transform: `translate(0, ${e.showMonthLabels ? 16 : 0})` }, [e.showWeekdayLabels ? (P(), l("g", Qm, [(P(!0), l(t, null, R(g.value, (t, n) => (P(), l("text", {
				key: n,
				x: 0,
				y: n * (e.cellSize + e.gap) + e.cellSize * .75,
				class: "mc-heatmap__weekday"
			}, H(t), 9, $m))), 128))])) : c("", !0), (P(!0), l(t, null, R(f.value, (n, i) => (P(), l("g", {
				key: i,
				transform: `translate(${(e.showWeekdayLabels ? nh : 0) + i * (e.cellSize + e.gap)}, 0)`
			}, [(P(!0), l(t, null, R(n.days, (t, n) => (P(), l("rect", {
				key: t.date,
				class: D(["mc-heatmap__cell", `is-level-${h(t.value)}`]),
				style: k(h(t.value) >= m.value ? { fill: `url(#${r})` } : void 0),
				x: 0,
				y: n * (e.cellSize + e.gap),
				width: e.cellSize,
				height: e.cellSize,
				rx: "3",
				role: "img",
				"aria-label": x(t)
			}, [u("title", null, H(x(t)), 1)], 14, th))), 128))], 8, eh))), 128))], 8, Zm)
		], 8, Jm))])])], 2));
	}
}), [["__scopeId", "data-v-0d48683d"]]), ih = {
	key: 0,
	class: "mc-highlight__mark"
}, ah = { class: "mc-highlight__text" }, oh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => {
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
		}), i = a(() => Z("mc-highlight", { "is-accent": n.accent }, n.customClass));
		return (e, n) => (P(), l("span", { class: D(i.value) }, [(P(!0), l(t, null, R(r.value, (e, n) => (P(), l(t, { key: n }, [e.hit ? (P(), l("mark", ih, [u("span", ah, H(e.text), 1)])) : (P(), l(t, { key: 1 }, [p(H(e.text), 1)], 64))], 64))), 128))], 2));
	}
}), [["__scopeId", "data-v-4183e26e"]]), sh = ["aria-label"], ch = { class: "mc-icon-rail__body" }, lh = {
	key: 0,
	class: "mc-icon-rail__slot"
}, uh = [
	"disabled",
	"aria-disabled",
	"aria-current",
	"aria-label",
	"title",
	"onClick"
], dh = { class: "mc-icon-rail__icon mc-sheen-sweep" }, fh = {
	key: 0,
	class: "mc-icon-rail__label"
}, ph = {
	key: 1,
	class: "mc-icon-rail__slot"
}, mh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiIconRail",
	__name: "IconRail",
	props: /*@__PURE__*/ w({
		options: { default: () => [] },
		labelPosition: { default: "right" },
		size: { default: "medium" },
		avatarPosition: { default: "top" },
		label: { default: "Icon rail" },
		customClass: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["select"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = L(o.value);
		q(() => o.value, (e) => {
			s.value = e;
		});
		let d = a(() => o.value ?? s.value);
		function f(e) {
			return e.key === d.value;
		}
		function p(e) {
			e.disabled || (s.value = e.key, o.value = e.key, i("select", e.key, e));
		}
		let h = a(() => r.labelPosition !== "none"), g = {
			small: 15,
			medium: 17,
			large: 20
		}, _ = a(() => g[r.size] ?? g.medium);
		function v(e) {
			if (!(h.value && e.label)) return e.label ?? e.key;
		}
		function y(e) {
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
		let b = a(() => Z("mc-icon-rail", "mc-recipe-panel", `mc-icon-rail--${r.size}`, `mc-icon-rail--label-${r.labelPosition}`, `mc-icon-rail--avatar-${r.avatarPosition}`, { "mc-icon-rail--selected": d.value !== void 0 && d.value !== "" }, r.customClass));
		return (n, r) => (P(), l("nav", {
			class: D(b.value),
			"aria-label": e.label
		}, [
			r[0] || (r[0] = u("span", {
				class: "mc-icon-rail__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-icon-rail__grain",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", ch, [
				n.$slots.avatar && e.avatarPosition === "top" ? (P(), l("div", lh, [z(n.$slots, "avatar", {}, void 0, !0)])) : c("", !0),
				u("ul", {
					class: "mc-icon-rail__list",
					role: "list",
					onKeydown: y
				}, [(P(!0), l(t, null, R(e.options, (e) => (P(), l("li", {
					key: e.key,
					class: "mc-icon-rail__row"
				}, [u("button", {
					type: "button",
					class: D(["mc-icon-rail__item", { "mc-icon-rail__item--selected": f(e) }]),
					disabled: e.disabled,
					"aria-disabled": e.disabled ? "true" : void 0,
					"aria-current": f(e) ? "true" : void 0,
					"aria-label": v(e),
					title: v(e),
					onClick: (t) => p(e)
				}, [u("span", dh, [m($, {
					name: e.icon,
					size: _.value,
					class: "mc-icon-rail__glyph"
				}, null, 8, ["name", "size"])]), h.value && e.label ? (P(), l("span", fh, H(e.label), 1)) : c("", !0)], 10, uh)]))), 128))], 32),
				n.$slots.avatar && e.avatarPosition === "bottom" ? (P(), l("div", ph, [z(n.$slots, "avatar", {}, void 0, !0)])) : c("", !0)
			])
		], 10, sh));
	}
}), [["__scopeId", "data-v-6a017381"]]);
//#endregion
//#region src/composables/useIntersection.ts
function hh(e, t = {}) {
	let { threshold: n = 0, rootMargin: r = "0px", once: i = !1 } = t, a = L(!1), o = L(0), s = L(null), c = null;
	return ee(() => {
		typeof IntersectionObserver > "u" ? a.value = !0 : (c = new IntersectionObserver((e) => {
			let t = e[e.length - 1];
			t && (s.value = t, a.value = t.isIntersecting, o.value = t.intersectionRatio, t.isIntersecting && i && (c?.disconnect(), c = null));
		}, {
			threshold: n,
			rootMargin: r
		}), e.value && c.observe(e.value));
	}), A(() => {
		c?.disconnect(), c = null;
	}), {
		isIntersecting: a,
		ratio: o,
		entry: s
	};
}
//#endregion
//#region src/components/image-group/registry.ts
var gh = /* @__PURE__ */ new Map();
function _h(e, t) {
	return gh.set(e, t), () => {
		gh.get(e) === t && gh.delete(e);
	};
}
function vh(e) {
	return gh.get(e);
}
//#endregion
//#region src/components/image/Image.vue?vue&type=script&setup=true&lang.ts
var yh = [
	"tabindex",
	"role",
	"aria-label",
	"aria-disabled",
	"onKeydown"
], bh = {
	key: 0,
	class: "mc-image__shimmer mc-grain-overlay",
	"aria-hidden": "true"
}, xh = ["src", "alt"], Sh = {
	key: 2,
	class: "mc-image__fallback mc-aurora-inset"
}, Ch = {
	key: 0,
	class: "mc-image__fallback-text"
}, wh = {
	key: 3,
	class: "mc-image__badge",
	"aria-hidden": "true"
}, Th = {
	key: 4,
	class: "mc-image__caption"
}, Eh = ["aria-label"], Dh = { class: "mc-image-lightbox__panel mc-recipe-panel" }, Oh = ["src", "alt"], kh = ["aria-label"], Ah = {
	key: 0,
	class: "mc-image-lightbox__caption"
}, jh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = e, d = i, f = L(null), p = L(null), h = L("idle"), g = L(!1), _ = L(null), v = rn(), y = Hn(), b = a(() => ({
			preview: v.value.image?.preview ?? "Preview image",
			close: v.value.image?.close ?? "Close preview"
		})), x = a(() => g.value), { isTop: S, isTopModal: C } = Pn({
			active: x,
			modal: !0
		});
		Ic({
			enabled: x,
			container: p,
			isTop: C
		}), Bc(x);
		let { isIntersecting: w } = hh(f, {
			rootMargin: "160px",
			once: !0
		}), E = a(() => !o.lazy || w.value), O = (e) => {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}, j = a(() => ({
			width: O(o.width),
			height: O(o.height),
			aspectRatio: o.ratio || void 0
		})), M = a(() => ({
			objectFit: o.fit,
			objectPosition: o.position
		}));
		q(() => o.src, () => {
			h.value = "idle";
		});
		function N(e) {
			h.value = "loaded", d("load", e);
		}
		function F(e) {
			h.value = "error", d("error", e);
		}
		function I() {
			if (!o.preview || o.disabled || h.value === "error") return;
			let e = o.group ? vh(o.group) : void 0;
			if (e) {
				let t = e.images.findIndex((e) => e.src === o.src);
				e.open(t >= 0 ? t : 0);
			} else _.value = document.activeElement ?? null, g.value = !0, document.addEventListener("keydown", B);
		}
		function R() {
			g.value = !1, document.removeEventListener("keydown", B), _.value?.focus?.();
		}
		function B(e) {
			e.key === "Escape" && S() && R();
		}
		ee(() => {
			o.lazy || (h.value = "loading");
		}), A(() => {
			document.removeEventListener("keydown", B);
		});
		let V = a(() => Z("mc-image", "mc-sheen-sweep", {
			"is-rounded": o.rounded && !o.circle,
			"is-circle": o.circle,
			"is-loaded": h.value === "loaded",
			"is-error": h.value === "error",
			"is-zoomable": o.preview && !o.disabled,
			"is-disabled": o.disabled
		}, o.customClass));
		return (i, a) => (P(), l(t, null, [u("figure", {
			ref_key: "root",
			ref: f,
			class: D(V.value),
			style: k(j.value),
			tabindex: e.preview && !e.disabled ? 0 : void 0,
			role: e.preview && !e.disabled ? "button" : void 0,
			"aria-label": e.preview && !e.disabled ? e.alt || b.value.preview : void 0,
			"aria-disabled": e.disabled ? "true" : void 0,
			onClick: I,
			onKeydown: [Y(I, ["enter"]), Y(X(I, ["prevent"]), ["space"])]
		}, [
			e.placeholder && h.value !== "loaded" ? (P(), l("span", bh)) : c("", !0),
			E.value && e.src && h.value !== "error" ? (P(), l("img", {
				key: 1,
				class: "mc-image__img",
				src: e.src,
				alt: e.alt,
				style: k(M.value),
				loading: "lazy",
				decoding: "async",
				onLoad: N,
				onError: F
			}, null, 44, xh)) : c("", !0),
			h.value === "error" ? (P(), l("span", Sh, [m($, {
				name: e.fallback,
				size: 24
			}, null, 8, ["name"]), e.alt ? (P(), l("span", Ch, H(e.alt), 1)) : c("", !0)])) : c("", !0),
			e.preview && h.value === "loaded" ? (P(), l("span", wh, [m($, {
				name: "expand",
				size: 13
			})])) : c("", !0),
			i.$slots.default ? (P(), l("figcaption", Th, [z(i.$slots, "default", {}, void 0, !0)])) : c("", !0)
		], 46, yh), (P(), s(n, { to: "body" }, [m(r, { name: "mc-image-lightbox" }, {
			default: J(() => [g.value ? (P(), l("div", T({
				key: 0,
				ref_key: "lightbox",
				ref: p,
				class: "mc-image-lightbox"
			}, W(y), {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": e.alt || b.value.preview,
				onClick: X(R, ["self"])
			}), [u("div", Dh, [
				u("img", {
					class: "mc-image-lightbox__img",
					src: e.src,
					alt: e.alt
				}, null, 8, Oh),
				u("button", {
					type: "button",
					class: "mc-image-lightbox__close",
					"aria-label": b.value.close,
					onClick: R
				}, [m($, {
					name: "close",
					size: 18
				})], 8, kh),
				e.alt ? (P(), l("p", Ah, H(e.alt), 1)) : c("", !0)
			])], 16, Eh)) : c("", !0)]),
			_: 1
		})]))], 64));
	}
}), [["__scopeId", "data-v-fbeefb09"]]), Mh = ["aria-label"], Nh = [
	"disabled",
	"aria-label",
	"onClick"
], Ph = {
	key: 0,
	class: "mc-image-group__caption"
}, Fh = {
	key: 0,
	class: "mc-image-group__empty"
}, Ih = ["aria-label"], Lh = { class: "mc-image-lightbox__panel mc-recipe-panel" }, Rh = ["src", "alt"], zh = ["aria-label"], Bh = ["aria-label"], Vh = ["aria-label"], Hh = {
	key: 2,
	class: "mc-image-lightbox__caption"
}, Uh = { class: "mc-image-lightbox__counter" }, Wh = ["aria-label"], Gh = [
	"aria-label",
	"aria-current",
	"onClick"
], Kh = ["src", "alt"], qh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = e, d = i, f = rn(), p = Hn(), h = a(() => ({
			preview: f.value.image?.preview ?? "Preview image",
			close: f.value.image?.close ?? "Close preview",
			previous: f.value.image?.previous ?? "Previous image",
			next: f.value.image?.next ?? "Next image",
			thumbnails: f.value.image?.thumbnails ?? "Image thumbnails",
			counter: f.value.image?.counter ?? "{index} / {total}",
			gallery: f.value.image?.gallery ?? "Image gallery"
		})), g = L(null), _ = L(!1), v = L(0), y = a(() => _.value), { isTop: b, isTopModal: x } = Pn({
			active: y,
			modal: !0
		});
		Ic({
			enabled: y,
			container: g,
			isTop: x
		}), Bc(y);
		let S = a(() => o.images[v.value] ?? null), C = a(() => h.value.counter.replace("{index}", String(v.value + 1)).replace("{total}", String(o.images.length)));
		function w(e) {
			if (!o.images.length) return;
			let t = o.images.length;
			v.value = (e % t + t) % t;
			let n = o.images[v.value];
			n && d("open", n, v.value);
		}
		function E(e) {
			o.images.length && (w(e), _.value = !0, document.addEventListener("keydown", N));
		}
		function O() {
			_.value && (_.value = !1, document.removeEventListener("keydown", N), d("close"));
		}
		function j(e) {
			w(e);
		}
		function M(e) {
			o.images.length && w(v.value + e);
		}
		function N(e) {
			b() && (e.key === "Escape" ? O() : e.key === "ArrowLeft" ? (e.preventDefault(), M(-1)) : e.key === "ArrowRight" && (e.preventDefault(), M(1)));
		}
		let F = {
			images: o.images,
			open: E
		}, I;
		ee(() => {
			o.name && (I = _h(o.name, F));
		}), A(() => {
			I?.(), I = void 0, document.removeEventListener("keydown", N);
		}), q(() => o.images, (e) => {
			F.images = e, v.value >= e.length && (v.value = Math.max(0, e.length - 1));
		}, { deep: !0 });
		let z = a(() => ({ "--mc-image-group-columns": String(Math.max(1, o.columns)) })), B = a(() => Z("mc-image-group", "mc-grain-overlay", "mc-recipe-sheet", {
			"is-empty": !o.images.length,
			"is-previewable": o.preview
		}, o.customClass));
		return (i, a) => (P(), l(t, null, [u("div", { class: D(B.value) }, [
			a[2] || (a[2] = u("span", {
				class: "mc-image-group__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", {
				class: "mc-image-group__grid",
				style: k(z.value),
				role: "group",
				"aria-label": h.value.gallery
			}, [(P(!0), l(t, null, R(e.images, (t, n) => (P(), l("button", {
				key: `${t.src}-${n}`,
				type: "button",
				class: "mc-image-group__cell mc-sheen-sweep",
				disabled: !e.preview,
				"aria-label": t.alt || h.value.preview,
				onClick: (e) => E(n)
			}, [m(jh, {
				src: t.src,
				alt: t.alt,
				ratio: e.ratio,
				preview: !1,
				lazy: !0
			}, null, 8, [
				"src",
				"alt",
				"ratio"
			]), t.caption ? (P(), l("span", Ph, H(t.caption), 1)) : c("", !0)], 8, Nh))), 128))], 12, Mh),
			e.images.length ? c("", !0) : (P(), l("p", Fh, H(h.value.gallery), 1))
		], 2), (P(), s(n, { to: "body" }, [m(r, { name: "mc-image-lightbox" }, {
			default: J(() => [_.value && S.value ? (P(), l("div", T({
				key: 0,
				ref_key: "lightbox",
				ref: g,
				class: "mc-image-lightbox"
			}, W(p), {
				role: "dialog",
				"aria-modal": "true",
				"aria-label": S.value.alt || h.value.preview,
				onClick: X(O, ["self"])
			}), [u("div", Lh, [
				u("img", {
					class: "mc-image-lightbox__img",
					src: S.value.src,
					alt: S.value.alt
				}, null, 8, Rh),
				u("button", {
					type: "button",
					class: "mc-image-lightbox__close",
					"aria-label": h.value.close,
					onClick: O
				}, [m($, {
					name: "close",
					size: 18
				})], 8, zh),
				e.images.length > 1 ? (P(), l("button", {
					key: 0,
					type: "button",
					class: "mc-image-lightbox__nav is-prev",
					"aria-label": h.value.previous,
					onClick: a[0] || (a[0] = (e) => M(-1))
				}, [m($, {
					name: "chevron-left",
					size: 20
				})], 8, Bh)) : c("", !0),
				e.images.length > 1 ? (P(), l("button", {
					key: 1,
					type: "button",
					class: "mc-image-lightbox__nav is-next",
					"aria-label": h.value.next,
					onClick: a[1] || (a[1] = (e) => M(1))
				}, [m($, {
					name: "chevron-right",
					size: 20
				})], 8, Vh)) : c("", !0),
				S.value.caption ? (P(), l("p", Hh, H(S.value.caption), 1)) : c("", !0),
				u("p", Uh, H(C.value), 1),
				e.images.length > 1 ? (P(), l("div", {
					key: 3,
					class: "mc-image-lightbox__thumbs",
					role: "group",
					"aria-label": h.value.thumbnails
				}, [(P(!0), l(t, null, R(e.images, (e, t) => (P(), l("button", {
					key: `${e.src}-${t}`,
					type: "button",
					class: D(["mc-image-lightbox__thumb", { "is-active": t === v.value }]),
					"aria-label": e.alt || `${t + 1}`,
					"aria-current": t === v.value ? "true" : void 0,
					onClick: (e) => j(t)
				}, [u("img", {
					src: e.src,
					alt: e.alt,
					loading: "lazy",
					decoding: "async"
				}, null, 8, Kh)], 10, Gh))), 128))], 8, Wh)) : c("", !0)
			])], 16, Ih)) : c("", !0)]),
			_: 1
		})]))], 64));
	}
}), [["__scopeId", "data-v-60ba8799"]]), Jh = {
	class: "mc-infinite-scroll__status mc-recipe-panel mc-grain-overlay",
	role: "status",
	"aria-live": "polite"
}, Yh = {
	class: "mc-infinite-scroll__loader mc-sheen-sweep",
	"aria-hidden": "true"
}, Xh = {
	class: "mc-infinite-scroll__spinner",
	viewBox: "0 0 24 24",
	width: "18",
	height: "18"
}, Zh = ["stroke"], Qh = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = L([]), s = L(!1), c = L(!1), d = L(null), f = null, p = !0, h = `${Ln("mc-is")}-grad`, g = a(() => c.value || !r.hasMore);
		function _() {
			let e = d.value;
			if (!e || typeof window > "u") return !1;
			let t = e.getBoundingClientRect(), n = r.scrollTarget;
			if (n) {
				let e = n.getBoundingClientRect();
				return t.top <= e.bottom && t.bottom >= e.top;
			}
			return t.top <= window.innerHeight && t.bottom >= 0;
		}
		async function v() {
			if (!(s.value || g.value || r.disabled || !p)) {
				s.value = !0;
				try {
					let e = await r.load();
					if (!p) return;
					Array.isArray(e) && e.length ? (o.value = o.value.concat(e), i("load", e)) : (c.value = !0, i("finish"));
				} catch (e) {
					if (!p) return;
					i("error", e), c.value = !0;
				} finally {
					s.value = !1;
				}
				!p || g.value || r.disabled || (await E(), p && _() && v());
			}
		}
		function y() {
			f?.disconnect(), f = null, typeof IntersectionObserver < "u" && d.value && (f = new IntersectionObserver((e) => {
				e[e.length - 1]?.isIntersecting && v();
			}, {
				root: r.scrollTarget ?? null,
				rootMargin: `0px 0px ${r.distance}px 0px`
			}), f.observe(d.value));
		}
		q(d, y, { flush: "post" }), q(() => [
			r.disabled,
			r.scrollTarget,
			r.distance
		], y), q(() => r.hasMore, (e) => {
			e && (c.value = !1);
		}), A(() => {
			p = !1, f?.disconnect(), f = null;
		}), r.immediate && Promise.resolve().then(() => void v());
		let b = a(() => Z("mc-infinite-scroll", {
			"is-loading": s.value,
			"is-done": g.value,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (P(), l("div", { class: D(b.value) }, [
			z(n.$slots, "default", {
				items: o.value,
				loading: s.value,
				done: g.value,
				loadMore: v
			}, void 0, !0),
			u("div", {
				ref_key: "sentinel",
				ref: d,
				class: "mc-infinite-scroll__sentinel",
				"aria-hidden": "true"
			}, null, 512),
			u("div", Jh, [s.value ? (P(), l(t, { key: 0 }, [u("span", Yh, [(P(), l("svg", Xh, [u("defs", null, [u("linearGradient", {
				id: h,
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1"
			}, [...r[0] || (r[0] = [u("stop", {
				offset: "0%",
				"stop-color": "var(--mc-accent-3)"
			}, null, -1), u("stop", {
				offset: "100%",
				"stop-color": "var(--mc-accent-2)"
			}, null, -1)])])]), u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: `url(#${h})`,
				"stroke-width": "2.6",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, 8, Zh)]))]), u("span", null, H(e.loadingText), 1)], 64)) : g.value ? (P(), l(t, { key: 1 }, [
				r[1] || (r[1] = u("span", {
					class: "mc-infinite-scroll__line",
					"aria-hidden": "true"
				}, null, -1)),
				u("span", null, H(e.finishedText), 1),
				r[2] || (r[2] = u("span", {
					class: "mc-infinite-scroll__line",
					"aria-hidden": "true"
				}, null, -1))
			], 64)) : (P(), l(t, { key: 2 }, [m($, {
				name: "chevron-down",
				size: 14
			}), u("span", null, H(e.hintText), 1)], 64))])
		], 2));
	}
}), [["__scopeId", "data-v-b75ea1ee"]]), $h = {
	key: 0,
	class: "mc-input__affix mc-input__affix--prefix"
}, eg = {
	key: 1,
	class: "mc-input__count"
}, tg = ["aria-label"], ng = ["aria-label"], rg = {
	key: 4,
	class: "mc-input__affix mc-input__affix--suffix"
}, ig = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiInput",
	inheritAttrs: !1,
	__name: "Input",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"focus",
		"blur",
		"clear",
		"enter"
	], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = rn(), i = t, o = K(e, "modelValue"), d = G(), f = a(() => {
			let { class: e, style: t, ...n } = d;
			return n;
		});
		function p(e) {
			return e == null ? "" : String(e);
		}
		let h = L(p(o.value));
		q(() => o.value, (e) => {
			h.value = p(e);
		});
		let g = L(!1), _ = a(() => n.type === "textarea"), v = a(() => n.type === "password" ? g.value ? "text" : "password" : n.type), y = a(() => n.type === "number" && h.value !== "" && !Number.isNaN(Number(h.value)) ? Number(h.value) : h.value), b = a(() => h.value !== ""), x = a(() => n.clearable && b.value && !n.disabled && !n.readonly), S = a(() => n.showPassword && n.type === "password" && !n.disabled), C = a(() => h.value.length), w = a(() => n.maxlength ? `${C.value}/${n.maxlength}` : String(C.value));
		function E(e) {
			let t = e.target;
			h.value = t.value, o.value = y.value;
		}
		function O(e) {
			let t = e.target;
			h.value = t.value, o.value = y.value, i("change", y.value);
		}
		function A(e) {
			i("focus", e);
		}
		function j(e) {
			i("blur", e);
		}
		function ee(e) {
			e.key === "Enter" && i("enter", y.value);
		}
		function M() {
			n.disabled || n.readonly || (h.value = "", o.value = "", i("clear"));
		}
		function N() {
			g.value = !g.value;
		}
		let F = a(() => Z("mc-input", "mc-recipe-well", "mc-sheen-sweep", `mc-input--${n.variant}`, `mc-input--${n.size}`, `mc-input--${n.color}`, {
			"is-disabled": n.disabled,
			"is-readonly": n.readonly,
			"is-textarea": _.value,
			"mc-recipe-well-rim": n.variant === "outlined",
			[`is-status-${n.status}`]: !!n.status
		})), I = a(() => Z(F.value, d.class, n.customClass)), R = a(() => d.style);
		return (t, n) => (P(), l("div", {
			class: D(I.value),
			style: k(R.value)
		}, [
			n[0] || (n[0] = u("span", {
				class: "mc-input__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			e.prefix || t.$slots.prefix ? (P(), l("span", $h, [z(t.$slots, "prefix", {}, () => [e.prefix ? (P(), s($, {
				key: 0,
				name: e.prefix,
				size: 15
			}, null, 8, ["name"])) : c("", !0)], !0)])) : c("", !0),
			(P(), s(B(_.value ? "textarea" : "input"), T(f.value, {
				class: "mc-input__field",
				value: h.value,
				type: _.value ? void 0 : v.value,
				placeholder: e.placeholder,
				disabled: e.disabled,
				readonly: e.readonly,
				maxlength: e.maxlength,
				autofocus: e.autofocus,
				rows: _.value ? 3 : void 0,
				"aria-invalid": e.status === "error" || void 0,
				"aria-disabled": e.disabled || void 0,
				onInput: E,
				onChange: O,
				onFocus: A,
				onBlur: j,
				onKeydown: ee
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
			e.showCount ? (P(), l("span", eg, H(w.value), 1)) : c("", !0),
			S.value ? (P(), l("button", {
				key: 2,
				type: "button",
				class: "mc-input__action",
				"aria-label": g.value ? W(r).input.hidePassword ?? "Hide password" : W(r).input.showPassword ?? "Show password",
				onClick: N
			}, [m($, {
				name: g.value ? "eye-off" : "eye",
				size: 15
			}, null, 8, ["name"])], 8, tg)) : c("", !0),
			x.value ? (P(), l("button", {
				key: 3,
				type: "button",
				class: "mc-input__action",
				"aria-label": W(r).input.clear ?? "Clear",
				onClick: M
			}, [m($, {
				name: "close",
				size: 14,
				"stroke-width": 2.4
			})], 8, ng)) : c("", !0),
			e.suffix || t.$slots.suffix ? (P(), l("span", rg, [z(t.$slots, "suffix", {}, () => [e.suffix ? (P(), s($, {
				key: 0,
				name: e.suffix,
				size: 15
			}, null, 8, ["name"])) : c("", !0)], !0)])) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-2ab8c94c"]]), ag = {
	key: 0,
	class: "mc-input-number__controls mc-input-number__controls--left"
}, og = ["disabled", "aria-label"], sg = ["disabled", "aria-label"], cg = [
	"value",
	"placeholder",
	"disabled",
	"aria-disabled",
	"aria-valuemin",
	"aria-valuemax"
], lg = {
	key: 1,
	class: "mc-input-number__controls mc-input-number__controls--right"
}, ug = ["disabled", "aria-label"], dg = ["disabled", "aria-label"], fg = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiInputNumber",
	inheritAttrs: !1,
	__name: "InputNumber",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: null },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = rn(), i = t, o = K(e, "modelValue"), s = G(), d = a(() => {
			let { class: e, style: t, ...n } = s;
			return n;
		}), f = L(o.value === null || o.value === void 0 ? "" : String(o.value)), p = L(o.value === null || o.value === void 0 ? null : o.value);
		q(() => o.value, (e) => {
			f.value = e == null ? "" : String(e);
		});
		let m = a(() => o.value === null || o.value === void 0 ? null : o.value);
		function h(e) {
			if (n.precision === void 0 || n.precision === null) return Number(e.toFixed(10));
			let t = Math.max(0, Math.floor(n.precision));
			return Number(e.toFixed(t));
		}
		function g(e) {
			let t = e;
			return n.min !== void 0 && (t = Math.max(t, n.min)), n.max !== void 0 && (t = Math.min(t, n.max)), h(t);
		}
		function _(e) {
			let t = e === null ? null : g(e);
			t === m.value ? f.value = t === null ? "" : String(t) : (f.value = t === null ? "" : String(t), o.value = t, i("change", t));
		}
		function v(e) {
			let t = e.target;
			f.value = t.value;
			let n = t.value.trim();
			if (n === "") {
				o.value = null;
				return;
			}
			let r = Number(n);
			if (Number.isNaN(r)) return;
			let i = g(r);
			o.value = i;
		}
		function y() {
			p.value = m.value;
		}
		function b() {
			let e = f.value.trim();
			if (e === "") {
				_(null), x(null);
				return;
			}
			let t = Number(e), n = Number.isNaN(t) ? m.value : t;
			_(n), x(n);
		}
		function x(e) {
			e !== p.value && (p.value = e, e === m.value && i("change", e));
		}
		function S(e) {
			n.disabled || (e.key === "ArrowUp" ? (e.preventDefault(), C(1)) : e.key === "ArrowDown" ? (e.preventDefault(), C(-1)) : e.key === "Enter" && b());
		}
		function C(e) {
			if (n.disabled) return;
			let t = (m.value ?? (n.min === void 0 ? 0 : n.min)) + e * (n.step ?? 1);
			_(g(h(Math.round(t / (n.step ?? 1)) * (n.step ?? 1))));
		}
		let w = a(() => n.controlsPosition === "both" || n.controlsPosition === "left"), E = a(() => n.controlsPosition === "both" || n.controlsPosition === "right"), O = a(() => n.controlsPosition === "left" || n.controlsPosition === "right"), A = a(() => n.min !== void 0 && m.value !== null && m.value <= n.min), j = a(() => n.max !== void 0 && m.value !== null && m.value >= n.max), ee = a(() => n.disabled || A.value), M = a(() => n.disabled || j.value), N = a(() => Z("mc-input-number", "mc-recipe-well", "mc-sheen-sweep", `mc-input-number--${n.variant}`, `mc-input-number--${n.size}`, {
			"is-disabled": n.disabled,
			"is-stacked": O.value,
			"mc-recipe-well-rim": n.variant === "outlined"
		})), F = a(() => Z(N.value, s.class, n.customClass)), I = a(() => s.style), R = a(() => ({
			min: n.min,
			max: n.max
		}));
		return (t, n) => (P(), l("div", {
			class: D(F.value),
			style: k(I.value)
		}, [
			n[8] || (n[8] = u("span", {
				class: "mc-input-number__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			w.value ? (P(), l("div", ag, [u("button", {
				type: "button",
				class: "mc-input-number__step",
				disabled: ee.value,
				"aria-label": W(r).inputNumber?.decrease ?? "Decrease",
				onClick: n[0] || (n[0] = (e) => C(-1))
			}, [...n[4] || (n[4] = [u("span", { class: "mc-input-number__glyph" }, "−", -1)])], 8, og), O.value ? (P(), l("button", {
				key: 0,
				type: "button",
				class: "mc-input-number__step",
				disabled: M.value,
				"aria-label": W(r).inputNumber?.increase ?? "Increase",
				onClick: n[1] || (n[1] = (e) => C(1))
			}, [...n[5] || (n[5] = [u("span", { class: "mc-input-number__glyph" }, "+", -1)])], 8, sg)) : c("", !0)])) : c("", !0),
			u("input", T(d.value, {
				class: "mc-input-number__field",
				type: "text",
				inputmode: "decimal",
				value: f.value,
				placeholder: e.placeholder,
				disabled: e.disabled,
				"aria-disabled": e.disabled || void 0,
				"aria-valuemin": R.value.min,
				"aria-valuemax": R.value.max,
				onInput: v,
				onFocus: y,
				onBlur: b,
				onKeydown: S
			}), null, 16, cg),
			E.value ? (P(), l("div", lg, [O.value ? (P(), l("button", {
				key: 0,
				type: "button",
				class: "mc-input-number__step",
				disabled: ee.value,
				"aria-label": W(r).inputNumber?.decrease ?? "Decrease",
				onClick: n[2] || (n[2] = (e) => C(-1))
			}, [...n[6] || (n[6] = [u("span", { class: "mc-input-number__glyph" }, "−", -1)])], 8, ug)) : c("", !0), u("button", {
				type: "button",
				class: "mc-input-number__step",
				disabled: M.value,
				"aria-label": W(r).inputNumber?.increase ?? "Increase",
				onClick: n[3] || (n[3] = (e) => C(1))
			}, [...n[7] || (n[7] = [u("span", { class: "mc-input-number__glyph" }, "+", -1)])], 8, dg)])) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-400e0fa5"]]), pg = ["aria-label"], mg = { class: "mc-input-otp__track" }, hg = [
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
], gg = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiInputOTP",
	__name: "InputOTP",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change", "complete"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = Ln("mc-otp"), c = L([]), d = L(0), f = L({
			opacity: 0,
			transform: "translate3d(0, 0, 0)",
			width: "0px",
			height: "0px"
		}), p = L([]);
		function m() {
			let e = (o.value ?? "").replace(/\s/g, ""), t = [];
			for (let n = 0; n < r.length; n += 1) t.push(e[n] ?? "");
			p.value = t;
		}
		q(() => o.value, m, { immediate: !0 }), q(() => r.length, () => {
			m(), d.value = Math.min(d.value, Math.max(r.length - 1, 0));
		});
		let h = a(() => p.value.join("")), g = a(() => h.value.length === r.length && h.value.length > 0);
		function _() {
			o.value = h.value, i("change", h.value), g.value && i("complete", h.value);
		}
		function v(e) {
			let t = Math.min(Math.max(e, 0), r.length - 1);
			d.value = t, E(() => {
				c.value[t]?.focus(), c.value[t]?.select(), y();
			});
		}
		function y() {
			let e = c.value[d.value];
			e ? f.value = {
				opacity: +!r.disabled,
				transform: `translate3d(${e.offsetLeft}px, ${e.offsetTop}px, 0)`,
				width: `${e.offsetWidth}px`,
				height: `${e.offsetHeight}px`
			} : f.value = {
				opacity: 0,
				transform: "translate3d(0, 0, 0)",
				width: "0px",
				height: "0px"
			};
		}
		function b(e, t) {
			let n = t.target, i = n.value.replace(/[^\dA-Za-z]/g, ""), a = i ? i.slice(-1) : "", o = p.value.slice();
			o[e] = a, p.value = o, n.value = a, _(), a && e < r.length - 1 ? v(e + 1) : y();
		}
		function x(e, t) {
			if (!r.disabled) {
				if (t.key === "Backspace") {
					if (!p.value[e] && e > 0) {
						t.preventDefault();
						let n = p.value.slice();
						n[e - 1] = "", p.value = n, _(), v(e - 1);
					}
				} else if (t.key === "ArrowLeft" && e > 0) t.preventDefault(), v(e - 1);
				else if (t.key === "ArrowRight" && e < r.length - 1) t.preventDefault(), v(e + 1);
				else if (t.key === "Delete") {
					t.preventDefault();
					let n = p.value.slice();
					n[e] = "", p.value = n, _();
				}
			}
		}
		function S(e, t) {
			if (r.disabled) return;
			let n = (t.clipboardData?.getData("text") ?? "").replace(/[^\dA-Za-z]/g, "");
			if (!n) return;
			t.preventDefault();
			let i = p.value.slice(), a = e;
			for (let e of n) {
				if (a >= r.length) break;
				i[a] = e, a += 1;
			}
			p.value = i, _(), v(Math.min(a, r.length - 1));
		}
		function C(e) {
			d.value = e, E(y);
		}
		function w() {
			E(y);
		}
		function T() {
			y();
		}
		ee(() => {
			window.addEventListener("resize", T), E(y);
		}), A(() => window.removeEventListener("resize", T));
		let O = a(() => Z("mc-input-otp", `mc-input-otp--${r.size}`, {
			"is-disabled": r.disabled,
			"is-complete": g.value
		}, r.customClass));
		return (n, r) => (P(), l("div", {
			class: D(O.value),
			role: "group",
			"aria-label": `${e.length} character code`
		}, [u("div", mg, [
			r[0] || (r[0] = u("span", {
				class: "mc-input-otp__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-input-otp__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			u("span", {
				class: "mc-input-otp__ring",
				style: k(f.value),
				"aria-hidden": "true"
			}, null, 4),
			(P(!0), l(t, null, R(e.length, (t) => (P(), l("input", {
				key: t,
				ref_for: !0,
				ref: (e) => {
					e && (c.value[t - 1] = e);
				},
				class: D(["mc-input-otp__box mc-recipe-well mc-recipe-well-deep", {
					"is-filled": !!p.value[t - 1],
					"is-active": d.value === t - 1
				}]),
				type: e.mask ? "password" : "text",
				value: p.value[t - 1] ?? "",
				disabled: e.disabled,
				"aria-label": `digit ${t} of ${e.length}`,
				autocomplete: t === 1 ? "one-time-code" : "off",
				id: t === 1 ? W(s) : void 0,
				inputmode: "numeric",
				maxlength: "1",
				onInput: (e) => b(t - 1, e),
				onKeydown: (e) => x(t - 1, e),
				onPaste: (e) => S(t - 1, e),
				onFocus: (e) => C(t - 1),
				onBlur: w
			}, null, 42, hg))), 128))
		])], 10, pg));
	}
}), [["__scopeId", "data-v-2bbd4d48"]]), _g = [
	"viewBox",
	"width",
	"height",
	"aria-label"
], vg = ["id"], yg = ["d", "fill"], bg = [
	"d",
	"stroke",
	"filter",
	"stroke-width"
], xg = [
	"cx",
	"cy",
	"r"
], Sg = {
	key: 2,
	class: "mc-sparkline__hover"
}, Cg = [
	"x1",
	"y1",
	"x2",
	"y2"
], wg = [
	"cx",
	"cy",
	"r"
], Tg = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = rn(), r = L(null), i = L(null), o = a(() => Math.max(2, t.strokeWidth + 1)), s = a(() => {
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
		}), d = a(() => {
			let e = t.data;
			if (!e.length) return [];
			let n = t.width - o.value * 2, r = t.height - o.value * 2, { min: i, max: a } = s.value, c = e.length > 1 ? n / (e.length - 1) : 0;
			return e.map((e, t) => {
				let n = o.value + t * c, s = o.value + r - (e - i) / (a - i) * r;
				return {
					x: Number(n.toFixed(2)),
					y: Number(s.toFixed(2)),
					value: e
				};
			});
		}), f = a(() => {
			let e = d.value;
			if (!e.length) return "";
			if (!t.smooth) return e.map((e, t) => `${t ? "L" : "M"}${e.x} ${e.y}`).join(" ");
			let n = `M${e[0].x} ${e[0].y}`;
			for (let t = 0; t < e.length - 1; t++) {
				let r = e[t === 0 ? 0 : t - 1], i = e[t], a = e[t + 1], o = e[t + 2] ?? a, s = i.x + (a.x - r.x) / 6, c = i.y + (a.y - r.y) / 6, l = a.x - (o.x - i.x) / 6, u = a.y - (o.y - i.y) / 6;
				n += ` C${s.toFixed(2)} ${c.toFixed(2)}, ${l.toFixed(2)} ${u.toFixed(2)}, ${a.x} ${a.y}`;
			}
			return n;
		}), p = a(() => {
			let e = d.value;
			if (!e.length) return "";
			let n = t.height - o.value;
			return `${f.value} L${e[e.length - 1].x} ${n} L${e[0].x} ${n} Z`;
		}), m = a(() => d.value[d.value.length - 1]), h = a(() => i.value === null ? null : d.value[i.value] ?? null), g = `mc-spark-${Math.random().toString(36).slice(2, 9)}`, _ = g, v = `${g}-line`, y = `${g}-glow`;
		function b(e) {
			let n = r.value, a = d.value;
			if (!n || !a.length) return;
			let o = n.getBoundingClientRect();
			if (!o.width) return;
			let s = t.width / o.width, c = (e.clientX - o.left) * s, l = 0, u = Infinity;
			a.forEach((e, t) => {
				let n = Math.abs(e.x - c);
				n < u && (u = n, l = t);
			}), i.value = l;
		}
		function x() {
			i.value = null;
		}
		return (t, i) => (P(), l("svg", {
			ref_key: "svgRef",
			ref: r,
			class: D(["mc-sparkline", [W(Z)({ "is-animated": e.animated }, e.customClass)]]),
			viewBox: `0 0 ${e.width} ${e.height}`,
			width: e.width,
			height: e.height,
			role: "img",
			"aria-label": W(n).sparkline?.label ?? "sparkline",
			onMousemove: b,
			onMouseleave: x
		}, [
			u("defs", null, [
				u("linearGradient", {
					id: W(_),
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1"
				}, [...i[0] || (i[0] = [u("stop", {
					offset: "0%",
					"stop-color": "var(--mc-accent)",
					"stop-opacity": "0.42"
				}, null, -1), u("stop", {
					offset: "100%",
					"stop-color": "var(--mc-accent)",
					"stop-opacity": "0"
				}, null, -1)])], 8, vg),
				u("linearGradient", {
					id: v,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0"
				}, [...i[1] || (i[1] = [u("stop", {
					offset: "0%",
					"stop-color": "var(--mc-accent-3)"
				}, null, -1), u("stop", {
					offset: "100%",
					"stop-color": "var(--mc-accent)"
				}, null, -1)])]),
				u("filter", {
					id: y,
					x: "-50%",
					y: "-50%",
					width: "200%",
					height: "200%"
				}, [...i[2] || (i[2] = [u("feGaussianBlur", {
					stdDeviation: "2.6",
					result: "blur"
				}, null, -1), u("feMerge", null, [
					u("feMergeNode", { in: "blur" }),
					u("feMergeNode", { in: "blur" }),
					u("feMergeNode", { in: "SourceGraphic" })
				], -1)])])
			]),
			e.showArea ? (P(), l("path", {
				key: 0,
				class: "mc-sparkline__area",
				d: p.value,
				fill: `url(#${W(_)})`
			}, null, 8, yg)) : c("", !0),
			u("path", {
				class: "mc-sparkline__line",
				d: f.value,
				stroke: `url(#${v})`,
				filter: `url(#${y})`,
				fill: "none",
				"stroke-width": e.strokeWidth,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, null, 8, bg),
			e.showDot && m.value ? (P(), l("circle", {
				key: 1,
				class: "mc-sparkline__dot",
				cx: m.value.x,
				cy: m.value.y,
				r: e.strokeWidth + 1
			}, null, 8, xg)) : c("", !0),
			h.value ? (P(), l("g", Sg, [u("line", {
				class: "mc-sparkline__guide",
				x1: h.value.x,
				y1: o.value,
				x2: h.value.x,
				y2: e.height - o.value
			}, null, 8, Cg), u("circle", {
				class: "mc-sparkline__hover-dot",
				cx: h.value.x,
				cy: h.value.y,
				r: e.strokeWidth + 2
			}, null, 8, wg)])) : c("", !0)
		], 42, _g));
	}
}), [["__scopeId", "data-v-a660277d"]]), Eg = ["aria-busy"], Dg = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Og = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, kg = { class: "mc-kpi-card__header" }, Ag = { class: "mc-kpi-card__title" }, jg = {
	key: 0,
	class: "mc-kpi-card__badge"
}, Mg = {
	key: 2,
	class: "mc-kpi-card__row",
	"aria-live": "polite"
}, Ng = {
	class: "mc-kpi-card__value",
	"data-mc-type": "readout"
}, Pg = {
	key: 0,
	class: "mc-kpi-card__affix"
}, Fg = { class: "mc-kpi-card__number mc-kpi-card__number--gradient" }, Ig = {
	key: 1,
	class: "mc-kpi-card__affix"
}, Lg = { class: "mc-kpi-card__trend-value" }, Rg = {
	key: 3,
	class: "mc-kpi-card__skeleton mc-recipe-well",
	"aria-hidden": "true"
}, zg = {
	key: 4,
	class: "mc-kpi-card__sparkline"
}, Bg = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => {
			let e = t.value;
			if (typeof e == "number") return Number.isFinite(e) ? e : 0;
			let n = Number.parseFloat(String(e ?? "").replace(/[^0-9.eE+-]/g, ""));
			return Number.isFinite(n) ? n : 0;
		}), r = a(() => {
			if (typeof t.value == "number") return !0;
			let e = String(t.value ?? "").trim();
			return e !== "" && Number.isFinite(Number.parseFloat(e));
		}), { display: i } = zd(a(() => n.value), {
			duration: 900,
			decimals: t.precision,
			from: 0
		}), o = a(() => r.value ? i.value : String(t.value ?? "")), s = a(() => {
			let e = t.trend;
			if (!e) return null;
			let n = e.direction ?? (e.value < 0 ? "down" : "up"), r = Math.abs(e.value);
			return {
				text: Number.isInteger(r) ? String(r) : r.toFixed(t.precision > 0 ? t.precision : 1),
				direction: n
			};
		}), d = a(() => t.trendColor === "success" ? "success" : t.trendColor === "danger" ? "danger" : s.value?.direction === "up" ? "success" : "danger"), f = a(() => Z("mc-kpi-card", `mc-kpi-card--${t.variant}`, `mc-kpi-card--${t.color}`, {
			"mc-recipe-sheet": t.variant === "solid",
			"mc-recipe-panel": t.variant === "glass",
			"mc-liquid-glass": t.variant === "liquid",
			"mc-liquid-glass--liquid": t.variant === "liquid",
			"mc-liquid-glass--layers": t.variant === "liquid",
			"is-hoverable": t.hoverable,
			"is-loading": t.loading,
			"is-animated": r.value
		}, t.customClass));
		return (t, n) => (P(), l("div", {
			class: D(f.value),
			"aria-busy": e.loading ? "true" : void 0
		}, [
			e.variant === "liquid" ? (P(), l("span", Dg)) : c("", !0),
			n[0] || (n[0] = u("span", {
				class: "mc-kpi-card__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.variant === "liquid" ? (P(), l("span", Og)) : c("", !0),
			n[1] || (n[1] = u("span", {
				class: "mc-kpi-card__grain",
				"aria-hidden": "true"
			}, null, -1)),
			u("header", kg, [u("span", Ag, H(e.title), 1), e.icon ? (P(), l("span", jg, [m($, {
				name: e.icon,
				size: 18
			}, null, 8, ["name"])])) : c("", !0)]),
			e.loading ? (P(), l("div", Rg)) : (P(), l("div", Mg, [u("span", Ng, [
				e.prefix ? (P(), l("span", Pg, H(e.prefix), 1)) : c("", !0),
				u("span", Fg, H(o.value), 1),
				e.suffix ? (P(), l("span", Ig, H(e.suffix), 1)) : c("", !0)
			]), s.value ? (P(), l("span", {
				key: 0,
				class: D(["mc-kpi-card__trend", `mc-kpi-card__trend--${d.value}`])
			}, [m($, {
				name: s.value.direction === "up" ? "arrow-up" : "arrow-down",
				size: 12,
				"stroke-width": 2.4
			}, null, 8, ["name"]), u("span", Lg, H(s.value.text), 1)], 2)) : c("", !0)])),
			e.sparkline && e.sparkline.length ? (P(), l("div", zg, [m(Tg, {
				data: e.sparkline,
				width: 240,
				height: 44
			}, null, 8, ["data"])])) : c("", !0)
		], 10, Eg));
	}
}), [["__scopeId", "data-v-cc902bd6"]]), Vg = { class: "mc-layout__header-inner" }, Hg = { class: "mc-layout__body" }, Ug = [
	"aria-label",
	"aria-expanded",
	"aria-disabled",
	"disabled"
], Wg = { class: "mc-layout__sider-body" }, Gg = { class: "mc-layout__sider-inner" }, Kg = { class: "mc-layout__content" }, qg = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = a(() => !!n.siderCollapsed);
		function o() {
			if (n.disabled) return;
			let e = !i.value;
			r("update:siderCollapsed", e), r("toggle", e);
		}
		let s = a(() => Z("mc-layout", {
			"has-sider": n.hasSider,
			"is-collapsed": i.value,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (P(), l("div", { class: D(s.value) }, [
			e.hasHeader ? (P(), l("header", {
				key: 0,
				class: "mc-layout__header mc-sheen-sweep",
				style: k({ height: `${e.headerHeight}px` })
			}, [
				n[0] || (n[0] = u("span", {
					class: "mc-layout__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				n[1] || (n[1] = u("span", {
					class: "mc-layout__aurora mc-aurora-inset",
					"aria-hidden": "true"
				}, null, -1)),
				u("div", Vg, [z(t.$slots, "header", {}, void 0, !0)])
			], 4)) : c("", !0),
			u("div", Hg, [e.hasSider ? (P(), l("aside", {
				key: 0,
				class: "mc-layout__sider",
				style: k({ width: `${i.value ? e.siderCollapsedWidth : e.siderWidth}px` })
			}, [
				n[2] || (n[2] = u("span", {
					class: "mc-layout__sider-accent",
					"aria-hidden": "true"
				}, null, -1)),
				u("button", {
					type: "button",
					class: "mc-layout__toggle",
					"aria-label": e.toggleLabel,
					"aria-expanded": !i.value,
					"aria-disabled": e.disabled ? "true" : void 0,
					disabled: e.disabled,
					onClick: o
				}, [m($, {
					name: i.value ? "chevron-right" : "chevron-left",
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])], 8, Ug),
				u("div", Wg, [u("div", Gg, [z(t.$slots, "sider", {}, void 0, !0)])])
			], 4)) : c("", !0), u("main", Kg, [z(t.$slots, "default", {}, void 0, !0)])]),
			e.hasFooter ? (P(), l("footer", {
				key: 1,
				class: "mc-layout__footer",
				style: k({ height: `${e.footerHeight}px` })
			}, [z(t.$slots, "footer", {}, void 0, !0)], 4)) : c("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-93d02311"]]), Jg = [
	"tabindex",
	"aria-label",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuetext",
	"aria-disabled"
], Yg = {
	key: 0,
	class: "mc-level-meter__readout mc-sheen-sweep mc-grain-overlay"
}, Xg = { class: "mc-level-meter__readout-text" }, Zg = { class: "mc-level-meter__body" }, Qg = {
	class: "mc-level-meter__segments",
	"aria-hidden": "true"
}, $g = {
	key: 0,
	class: "mc-level-meter__scale",
	"aria-hidden": "true"
}, e_ = 3, t_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiLevelMeter",
	__name: "LevelMeter",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = L(Pt(o.value, r.min, r.max));
		q(() => o.value, (e) => {
			s.value = Pt(e, r.min, r.max);
		});
		let d = a(() => {
			let e = r.max - r.min;
			return e > 0 ? e : 1;
		}), f = a(() => Pt((s.value - r.min) / d.value, 0, 1));
		function m(e) {
			let t = Pt(e, r.min, r.max);
			t !== s.value && (s.value = t, o.value = t, i("change", t));
		}
		function h(e) {
			let t = e * 100, n = r.thresholds ?? [];
			return n.length >= 2 && t > n[1] ? "danger" : n.length >= 1 && t > n[0] ? "warning" : "accent";
		}
		let g = a(() => Math.max(1, Math.floor(r.segments))), _ = a(() => {
			let e = g.value, t = [];
			for (let n = 0; n < e; n++) {
				let r = n / e, i = (n + 1) / e;
				t.push({
					key: String(n),
					fill: Pt((f.value - r) / (i - r), 0, 1),
					tier: h(i)
				});
			}
			return t;
		}), v = a(() => {
			let e = g.value, t = Math.max(1, r.segmentSize);
			return {
				"--mc-lm-length": `${e * t + (e - 1) * e_}px`,
				"--mc-lm-thickness": `${Math.max(1, r.thickness)}px`,
				"--mc-lm-gap": `${e_}px`,
				"--mc-lm-step": `${t}px`
			};
		}), y = a(() => (r.marks?.length ? r.marks : [r.min, r.max]).map((e, t) => ({
			key: `${t}-${e}`,
			label: String(e),
			pos: Pt((e - r.min) / d.value, 0, 1) * 100
		})));
		function b(e) {
			if (r.disabled) return;
			let t = Math.abs(r.step) || 1, n = r.orientation === "vertical", i = 0;
			if (e.key === "ArrowUp" || e.key === "ArrowRight" && !n) i = t;
			else if (e.key === "ArrowDown" || e.key === "ArrowLeft" && !n) i = -t;
			else if (e.key === "PageUp") i = t * 10;
			else if (e.key === "PageDown") i = -t * 10;
			else if (e.key === "Home") {
				e.preventDefault(), m(r.min);
				return;
			} else if (e.key === "End") {
				e.preventDefault(), m(r.max);
				return;
			} else return;
			e.preventDefault(), m(s.value + i);
		}
		let x = a(() => String(Math.round(s.value * 100) / 100)), S = a(() => Z("mc-level-meter", `mc-level-meter--${r.orientation}`, { "is-disabled": r.disabled }, r.customClass));
		function C(e) {
			let t = r.orientation === "vertical";
			return {
				"--mc-lm-fill-x": t ? "1" : String(e),
				"--mc-lm-fill-y": t ? String(e) : "1"
			};
		}
		function w(e) {
			return { "--mc-lm-pos": `${e}%` };
		}
		return (n, r) => (P(), l("div", {
			class: D(S.value),
			style: k(v.value),
			role: "meter",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuenow": s.value,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuetext": x.value,
			"aria-disabled": e.disabled || void 0,
			onKeydown: b
		}, [e.showValue ? (P(), l("div", Yg, [r[0] || (r[0] = u("span", {
			class: "mc-level-meter__aurora",
			"aria-hidden": "true"
		}, null, -1)), u("span", Xg, [z(n.$slots, "value", {}, () => [p(H(x.value), 1)], !0)])])) : c("", !0), u("div", Zg, [u("div", Qg, [(P(!0), l(t, null, R(_.value, (e) => (P(), l("span", {
			key: e.key,
			class: D(["mc-level-meter__segment", `mc-level-meter__segment--${e.tier}`])
		}, [u("span", {
			class: "mc-level-meter__fill",
			style: k(C(e.fill))
		}, null, 4)], 2))), 128))]), e.showScale ? (P(), l("div", $g, [(P(!0), l(t, null, R(y.value, (e) => (P(), l("span", {
			key: e.key,
			class: "mc-level-meter__mark",
			style: k(w(e.pos))
		}, H(e.label), 5))), 128))])) : c("", !0)])], 46, Jg));
	}
}), [["__scopeId", "data-v-44f94715"]]), n_ = [
	"tabindex",
	"role",
	"aria-disabled"
], r_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = a(() => Z("mc-liquid-glass", `mc-liquid-glass--${n.variant}`, {
			"mc-liquid-glass--dark": n.dark,
			"mc-liquid-glass--refract": n.refract,
			"mc-liquid-glass--no-refract": !n.refract,
			"mc-liquid-glass--pill": n.pill,
			"is-hover": n.hover,
			"is-focusable": n.focusable,
			"is-disabled": n.disabled
		}, n.customClass)), o = a(() => {
			let e = {};
			return n.radius && (e.borderRadius = n.radius), n.tint && (e["--mc-liquid-tint-color"] = n.tint), n.tintOpacity !== void 0 && (e["--mc-liquid-tint"] = String(n.tintOpacity)), n.bezel !== void 0 && (e["--mc-liquid-bezel"] = `${n.bezel}px`), n.thickness !== void 0 && (e["--mc-liquid-thickness"] = `${n.thickness}px`), n.ior !== void 0 && (e["--mc-liquid-ior"] = String(n.ior)), n.dispersion !== void 0 && (e["--mc-liquid-dispersion"] = String(n.dispersion)), n.specular !== void 0 && (e["--mc-liquid-specular"] = String(n.specular)), n.flow !== void 0 && (e["--mc-liquid-flow"] = String(n.flow)), Object.keys(e).length ? e : void 0;
		});
		function s(e) {
			n.disabled || r("click", e);
		}
		function c(e) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), !n.disabled && r("click", new MouseEvent("click")));
		}
		return ee(() => {
			n.refract && Qe();
		}), q(() => n.refract, (e) => {
			e ? Qe() : Ze();
		}), q(() => [
			n.bezel,
			n.thickness,
			n.ior,
			n.dispersion,
			n.radius
		], () => Ze()), (t, n) => (P(), l("div", {
			class: D(i.value),
			style: k(o.value),
			tabindex: e.focusable ? 0 : void 0,
			role: e.focusable ? "button" : void 0,
			"aria-disabled": e.disabled || void 0,
			onClick: s,
			onKeydown: c
		}, [z(t.$slots, "default", {}, void 0, !0)], 46, n_));
	}
}), [["__scopeId", "data-v-0e3d67be"]]), i_ = {
	key: 0,
	class: "mc-list__badge mc-list__skeleton",
	"aria-hidden": "true"
}, a_ = {
	key: 1,
	class: "mc-list__avatar mc-list__skeleton mc-list__skeleton--avatar"
}, o_ = [
	"tabindex",
	"aria-disabled",
	"onClick",
	"onKeydown"
], s_ = {
	key: 0,
	class: "mc-list__badge"
}, c_ = {
	key: 1,
	class: "mc-list__avatar"
}, l_ = ["src", "alt"], u_ = {
	key: 2,
	class: "mc-list__avatar-text"
}, d_ = { class: "mc-list__body" }, f_ = {
	class: "mc-list__title",
	"data-mc-type": "title"
}, p_ = {
	key: 0,
	class: "mc-list__meta"
}, m_ = {
	key: 2,
	class: "mc-list__extra"
}, h_ = {
	key: 0,
	class: "mc-list__empty mc-aurora-inset",
	role: "status"
}, g_ = { class: "mc-list__empty-text" }, __ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = a(() => {
			let e = r.avatar;
			return e ? typeof e == "string" ? { icon: e } : e === !0 ? { icon: "user" } : e : null;
		}), d = a(() => !!o.value), f = a(() => !!r.badge);
		function h(e) {
			return typeof r.badge == "string" ? r.badge : e && typeof e == "object" && e.icon || "sparkles";
		}
		let g = a(() => Z("mc-list", "mc-grain-overlay", "mc-recipe-sheet", `mc-list--${r.size}`, {
			"is-split": r.split,
			"is-loading": r.loading,
			"has-avatar": d.value && !f.value,
			"has-badge": f.value
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
			y(e) || i("click", e, t);
		}
		function x(e, t, n) {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), b(t, n));
		}
		return (n, r) => (P(), l("div", {
			class: D(g.value),
			role: "list"
		}, [e.loading ? (P(!0), l(t, { key: 0 }, R(e.loadingRows, (e) => (P(), l("div", {
			key: e,
			class: "mc-list__item mc-list__item--skeleton",
			style: k({ "--i": e - 1 }),
			"aria-hidden": "true"
		}, [
			f.value ? (P(), l("span", i_)) : c("", !0),
			d.value && !f.value ? (P(), l("span", a_)) : c("", !0),
			r[0] || (r[0] = u("span", { class: "mc-list__body" }, [u("span", { class: "mc-list__skeleton mc-list__skeleton--title" }), u("span", { class: "mc-list__skeleton mc-list__skeleton--meta" })], -1))
		], 4))), 128)) : (P(), l(t, { key: 1 }, [(P(!0), l(t, null, R(e.data, (e, t) => (P(), l("div", {
			key: t,
			class: D(["mc-list__item mc-sheen-sweep", { "is-disabled": y(e) }]),
			style: k({ "--i": t }),
			role: "button",
			tabindex: y(e) ? -1 : 0,
			"aria-disabled": y(e) ? "true" : void 0,
			onClick: (n) => b(e, t),
			onKeydown: (n) => x(n, e, t)
		}, [
			f.value ? (P(), l("span", s_, [z(n.$slots, "badge", {
				item: e,
				index: t
			}, () => [m($, {
				name: h(e),
				size: 18
			}, null, 8, ["name"])], !0)])) : c("", !0),
			d.value && !f.value ? (P(), l("span", c_, [z(n.$slots, "avatar", {
				item: e,
				index: t
			}, () => [o.value?.src ? (P(), l("img", {
				key: 0,
				class: "mc-list__avatar-img",
				src: o.value.src,
				alt: o.value.alt ?? ""
			}, null, 8, l_)) : o.value?.icon ? (P(), s($, {
				key: 1,
				name: o.value.icon,
				class: "mc-list__avatar-icon",
				size: 18
			}, null, 8, ["name"])) : (P(), l("span", u_, H((o.value?.text ?? "").slice(0, 2).toUpperCase()), 1))], !0)])) : c("", !0),
			u("span", d_, [u("span", f_, [z(n.$slots, "itemTitle", {
				item: e,
				index: t
			}, () => [p(H(_(e)), 1)], !0)]), n.$slots.itemMeta || v(e) ? (P(), l("span", p_, [z(n.$slots, "itemMeta", {
				item: e,
				index: t
			}, () => [p(H(v(e)), 1)], !0)])) : c("", !0)]),
			n.$slots.itemExtra ? (P(), l("span", m_, [z(n.$slots, "itemExtra", {
				item: e,
				index: t
			}, void 0, !0)])) : c("", !0)
		], 46, o_))), 128)), e.data.length ? c("", !0) : (P(), l("div", h_, [u("span", g_, [z(n.$slots, "empty", {}, () => [p(H(e.emptyText), 1)], !0)])]))], 64))], 2));
	}
}), [["__scopeId", "data-v-16dd5cba"]]), v_ = [
	"aria-valuenow",
	"aria-busy",
	"aria-disabled"
], y_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(0);
		q(() => t.percent, (e) => {
			n.value = e;
		}, { immediate: !0 }), q(() => t.loading, (e) => {
			e && (n.value = t.percent);
		});
		let r = a(() => t.loading || n.value > 0 && n.value < 100), i = a(() => Math.min(100, Math.max(0, n.value))), o = a(() => ({ ...Ot(t.color) ? { background: Ot(t.color) } : {} })), s = a(() => ({ transform: `scaleX(${i.value / 100})` })), c = a(() => ({ "--mc-loading-bar-h": `${t.height}px` })), d = a(() => Z("mc-loading-bar", {
			"is-visible": r.value,
			"is-indeterminate": t.indeterminate,
			"is-disabled": t.disabled
		}, t.customClass));
		return (t, n) => (P(), l("div", {
			class: D(d.value),
			style: k(c.value),
			role: "progressbar",
			tabindex: "0",
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-valuenow": e.indeterminate ? void 0 : i.value,
			"aria-busy": e.loading || void 0,
			"aria-disabled": e.disabled ? "true" : void 0
		}, [
			n[2] || (n[2] = u("span", {
				class: "mc-loading-bar__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			n[3] || (n[3] = u("div", { class: "mc-loading-bar__track mc-grain-overlay mc-recipe-well" }, null, -1)),
			e.indeterminate ? (P(), l("div", {
				key: 0,
				class: "mc-loading-bar__fill mc-loading-bar__fill--indeterminate",
				style: k(o.value)
			}, [...n[0] || (n[0] = [u("span", {
				class: "mc-loading-bar__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4)) : (P(), l("div", {
				key: 1,
				class: "mc-loading-bar__fill",
				style: k([o.value, s.value])
			}, [...n[1] || (n[1] = [u("span", {
				class: "mc-loading-bar__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4))
		], 14, v_));
	}
}), [["__scopeId", "data-v-171582d4"]]), b_ = {
	key: 0,
	class: "mc-log__header mc-recipe-panel mc-sheen-sweep"
}, x_ = { class: "mc-log__title" }, S_ = [
	"role",
	"tabindex",
	"aria-disabled",
	"onClick",
	"onKeydown"
], C_ = {
	key: 0,
	class: "mc-log__time"
}, w_ = {
	key: 1,
	class: "mc-log__badge"
}, T_ = { class: "mc-log__message-wrap" }, E_ = { class: "mc-log__message" }, D_ = {
	key: 0,
	class: "mc-log__empty mc-aurora-inset",
	role: "status"
}, O_ = 22, k_ = 8, A_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = L(null), s = L(0), d = L(0), f = L(O_), p = null;
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
		let g = a(() => (r.lines ?? []).map((e) => typeof e == "string" ? {
			level: "info",
			message: e
		} : {
			time: e.time,
			level: m(e.level ?? "info"),
			message: e.message ?? ""
		})), _ = a(() => {
			let e = r.level;
			if (!e || e === "all") return null;
			let t = (Array.isArray(e) ? e : [e]).map((e) => m(e));
			return t.length ? t : null;
		}), v = a(() => {
			let e = _.value;
			return e ? g.value.filter((t) => e.includes(t.level)) : g.value;
		}), y = a(() => v.value.length * f.value), b = a(() => {
			if (!r.virtual) return {
				start: 0,
				end: v.value.length,
				offset: 0
			};
			let e = d.value || 320, t = Math.max(0, Math.floor(s.value / f.value) - k_), n = Math.ceil(e / f.value) + 16;
			return {
				start: t,
				end: Math.min(v.value.length, t + n),
				offset: t * f.value
			};
		}), x = a(() => v.value.slice(b.value.start, b.value.end));
		function S() {
			let e = o.value;
			e && (d.value = e.clientHeight, C());
		}
		function C() {
			let e = o.value;
			if (!e || typeof window > "u") return;
			let t = getComputedStyle(e).getPropertyValue("--mc-log-row-height").trim(), n = parseFloat(t);
			Number.isFinite(n) && n > 0 && (f.value = n);
		}
		function w() {
			let e = o.value;
			e && (e.scrollTop = e.scrollHeight);
		}
		function T(e, t) {
			r.disabled || i("select", e, t);
		}
		q(() => v.value.length, async () => {
			r.autoScroll && (await E(), w());
		}), q(() => r.autoScroll, (e) => {
			e && w();
		}), ee(() => {
			S(), typeof ResizeObserver < "u" && o.value && (p = new ResizeObserver(() => S()), p.observe(o.value)), r.autoScroll && w();
		}), A(() => {
			p?.disconnect(), p = null;
		});
		let O = a(() => Z("mc-log", "mc-recipe-sheet", "mc-grain-overlay", {
			"is-virtual": r.virtual,
			"has-timestamps": r.showTimestamps,
			"has-level": r.showLevel,
			"is-disabled": r.disabled
		}, r.customClass)), j = a(() => typeof r.height == "number" ? { height: `${r.height}px` } : { height: r.height });
		return (n, r) => (P(), l("section", {
			class: D(O.value),
			style: k(j.value)
		}, [
			e.title || n.$slots.header ? (P(), l("header", b_, [
				u("span", x_, H(e.title), 1),
				r[0] || (r[0] = u("span", { class: "mc-log__spacer" }, null, -1)),
				z(n.$slots, "header", {}, void 0, !0)
			])) : c("", !0),
			u("div", {
				ref_key: "scroller",
				ref: o,
				class: "mc-log__scroller mc-recipe-well",
				role: "log",
				"aria-live": "polite"
			}, [u("div", {
				class: "mc-log__canvas",
				style: k({ height: `${y.value}px` })
			}, [u("div", {
				class: "mc-log__window",
				role: "list",
				style: k({ transform: `translateY(${b.value.offset}px)` })
			}, [(P(!0), l(t, null, R(x.value, (t, n) => (P(), l("div", {
				key: `${b.value.start + n}-${t.message}`,
				class: D(["mc-log__row", [`mc-log__row--${t.level}`, { "is-last": b.value.start + n === v.value.length - 1 }]]),
				role: e.disabled ? "listitem" : "button",
				tabindex: e.disabled ? -1 : 0,
				"aria-disabled": e.disabled ? "true" : void 0,
				onClick: (e) => T(t, b.value.start + n),
				onKeydown: [Y(X((e) => T(t, b.value.start + n), ["prevent"]), ["enter"]), Y(X((e) => T(t, b.value.start + n), ["prevent"]), ["space"])]
			}, [
				e.showTimestamps ? (P(), l("span", C_, H(h(t.time)), 1)) : c("", !0),
				r[2] || (r[2] = u("span", {
					class: "mc-log__dot",
					"aria-hidden": "true"
				}, null, -1)),
				e.showLevel ? (P(), l("span", w_, H(t.level), 1)) : c("", !0),
				u("span", T_, [u("span", E_, H(t.message), 1), r[1] || (r[1] = u("span", {
					class: "mc-log__caret",
					"aria-hidden": "true"
				}, null, -1))])
			], 42, S_))), 128))], 4)], 4), v.value.length ? c("", !0) : (P(), l("div", D_, [...r[3] || (r[3] = [u("span", { class: "mc-log__empty-text" }, "No entries", -1)])]))], 512),
			r[4] || (r[4] = u("div", {
				class: "mc-log__scanline",
				"aria-hidden": "true"
			}, null, -1))
		], 6));
	}
}), [["__scopeId", "data-v-7d2fb370"]]), j_ = ["aria-hidden"], M_ = {
	key: 0,
	class: "mc-marquee__separator",
	"aria-hidden": "true"
}, N_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = L(null), i = L(null), o = L(0), s = L(!1), d = L(!1), f = null;
		function m() {
			let e = r.value, t = e?.firstElementChild;
			if (!t) return;
			let a = t.getBoundingClientRect(), s = n.vertical ? a.height : a.width;
			s > 0 && (o.value = s);
			let c = i.value;
			c && e && (d.value = n.vertical ? e.scrollHeight > c.clientHeight : e.scrollWidth > c.clientWidth);
		}
		ee(() => {
			m(), typeof ResizeObserver < "u" && r.value && (f = new ResizeObserver(() => m()), f.observe(r.value), i.value && f.observe(i.value));
		}), A(() => {
			f?.disconnect(), f = null;
		}), q(() => [
			n.content,
			n.repeat,
			n.vertical
		], () => m());
		let h = a(() => n.content === void 0 || n.content === null ? [] : Array.isArray(n.content) ? n.content : [n.content]), g = a(() => {
			if (o.value <= 0) return 12;
			let e = Math.max(1, n.speed);
			return o.value / e;
		}), _ = a(() => Math.max(2, Math.round(n.repeat))), v = a(() => ({
			"--mc-marquee-repeat": _.value,
			"--mc-marquee-duration": `${g.value}s`
		})), y = a(() => Z("mc-marquee", `mc-marquee--${n.direction}`, {
			"mc-marquee--vertical": n.vertical,
			"is-faded": n.gradient && d.value,
			"is-paused": s.value && n.hoverPause,
			"is-disabled": n.disabled
		}, n.customClass)), b = a(() => {
			if (n.vertical && n.height !== void 0) return { "--mc-marquee-height": typeof n.height == "number" ? `${n.height}px` : n.height };
		});
		function x() {
			s.value = !0;
		}
		function S() {
			s.value = !1;
		}
		return (n, a) => (P(), l("div", {
			class: D(y.value),
			onMouseenter: x,
			onMouseleave: S
		}, [u("div", {
			ref_key: "viewportRef",
			ref: i,
			class: "mc-marquee__viewport",
			style: k(b.value)
		}, [u("div", {
			ref_key: "trackRef",
			ref: r,
			class: "mc-marquee__track",
			style: k(v.value)
		}, [(P(!0), l(t, null, R(_.value, (r) => (P(), l("div", {
			key: r,
			class: "mc-marquee__group",
			"aria-hidden": r > 1
		}, [n.$slots.default ? z(n.$slots, "default", {}, void 0, !0, 0) : (P(!0), l(t, { key: 1 }, R(h.value, (t, n) => (P(), l("span", {
			key: n,
			class: "mc-marquee__item"
		}, [p(H(t) + " ", 1), n < h.value.length - 1 ? (P(), l("span", M_, H(e.separator), 1)) : c("", !0)]))), 128))], 8, j_))), 128))], 4)], 4)], 34));
	}
}), [["__scopeId", "data-v-9c9abee7"]]), P_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiMasonry",
	__name: "Masonry",
	props: {
		columns: { default: 3 },
		gap: { default: 16 },
		itemStyle: {},
		customClass: {}
	},
	setup(n) {
		let r = n, i = te(), o = L(null), c = L(0), d = L(1), f = L([]), p = (e) => e.node;
		function m(n) {
			let r = [];
			for (let i of Array.isArray(n) ? n : [n]) S(i) && (i.type === t ? Array.isArray(i.children) && r.push(...m(i.children)) : i.type !== e && r.push(i));
			return r;
		}
		let h = [
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
		], g = /* @__PURE__ */ new Map(), _ = [];
		function v() {
			if (typeof r.columns == "number") return Math.max(1, Math.round(r.columns));
			let e = r.columns ?? {}, t = e.xs ?? 1;
			for (let n of h) g.get(n.key)?.matches && e[n.key] !== void 0 && (t = e[n.key]);
			return Math.max(1, Math.round(t));
		}
		function b() {
			let e = v();
			e !== d.value && (d.value = e, E(N));
		}
		let x = a(() => {
			let e = d.value, t = r.gap;
			return Math.max(0, (c.value - t * (e - 1)) / e);
		}), C = a(() => {
			let e = d.value, t = r.gap, n = x.value, i = Array(e).fill(0), a = [];
			f.value.forEach((r, o) => {
				let s = 0;
				for (let t = 1; t < e; t += 1) i[t] < i[s] && (s = t);
				let c = s * (n + t), l = i[s];
				a.push({
					x: c,
					y: l,
					width: n
				}), i[s] = l + r + t;
			});
			let o = i.length ? Math.max(...i) - t : 0;
			return {
				positions: a,
				height: Math.max(0, o)
			};
		}), w = a(() => m(i.default?.() ?? []).map((e, t) => {
			let n = C.value.positions[t], i = {
				width: n ? `${n.width}px` : void 0,
				transform: n ? `translate3d(${n.x}px, ${n.y}px, 0)` : void 0,
				...r.itemStyle ?? {}
			}, a = { "--mc-masonry-index": String(t) };
			return y("div", {
				key: e.key ?? t,
				class: "mc-masonry__item mc-sheen-sweep mc-recipe-sheet",
				style: [i, a]
			}, [e]);
		}));
		function T(e) {
			return Array.from(e.children).filter((e) => e instanceof HTMLElement && e.classList.contains("mc-masonry__item"));
		}
		function O() {
			let e = o.value;
			if (!e) return;
			let t = T(e).map((e) => e.offsetHeight);
			(t.length !== f.value.length || t.some((e, t) => e !== f.value[t])) && (f.value = t);
		}
		let j = null;
		function M() {
			if (j?.disconnect(), j = null, typeof ResizeObserver > "u" || !o.value) return;
			let e = o.value;
			j = new ResizeObserver(() => {
				let t = e.clientWidth;
				t !== c.value && (c.value = t), O();
			}), j.observe(e), T(e).forEach((e) => j?.observe(e));
		}
		function N() {
			let e = o.value;
			if (!e) return;
			let t = e.clientWidth;
			t !== c.value && (c.value = t), O(), M();
		}
		function F() {
			if (At && typeof window.matchMedia == "function") for (let e of h) {
				let t = window.matchMedia(e.query);
				g.set(e.key, t);
				let n = () => b();
				typeof t.addEventListener == "function" ? t.addEventListener("change", n) : typeof t.addListener == "function" && t.addListener(n), _.push({
					list: t,
					handler: n
				});
			}
		}
		ee(async () => {
			F(), b(), await E(), N();
		}), A(() => {
			j?.disconnect(), j = null;
			for (let { list: e, handler: t } of _) typeof e.removeEventListener == "function" ? e.removeEventListener("change", t) : typeof e.removeListener == "function" && e.removeListener(t);
			_.length = 0, g.clear();
		}), q(() => [
			r.columns,
			r.gap,
			r.itemStyle
		], () => E(N), { deep: !0 });
		let I = a(() => ({ height: C.value.height ? `${C.value.height}px` : void 0 })), z = a(() => Z("mc-masonry", "mc-masonry--panel mc-grain-overlay", "mc-recipe-panel", r.customClass));
		return (e, n) => (P(), l("div", {
			ref_key: "container",
			ref: o,
			class: D(z.value),
			style: k(I.value)
		}, [n[0] || (n[0] = u("span", {
			class: "mc-masonry__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), (P(!0), l(t, null, R(w.value, (e, t) => (P(), s(p, {
			key: t,
			node: e
		}, null, 8, ["node"]))), 128))], 6));
	}
}), [["__scopeId", "data-v-ced2f341"]]), F_ = ["id"], I_ = {
	class: "mc-mention__mirror",
	"aria-hidden": "true"
}, L_ = {
	key: 0,
	class: "mc-mention__chip"
}, R_ = {
	key: 0,
	class: "mc-mention__placeholder"
}, z_ = [
	"value",
	"placeholder",
	"disabled",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant"
], B_ = ["aria-label"], V_ = [
	"id",
	"onMousedown",
	"onMouseenter"
], H_ = { class: "mc-mention__avatar" }, U_ = ["src", "alt"], W_ = {
	key: 1,
	class: "mc-mention__initials"
}, G_ = { class: "mc-mention__name" }, K_ = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiMention",
	__name: "Mention",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change", "select"], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = rn(), f = Hn(), h = i, g = K(e, "modelValue"), _ = Ln("mc-mention"), v = `${_}-list`, y = (e) => `${_}-option-${e}`, b = L(null), x = L(null), S = L(null), C = L(!1), { isTop: w } = Pn({ active: C }), O = L(""), k = L(0), { style: j, transformOrigin: M, update: N, startAutoUpdate: F, stopAutoUpdate: I } = Cn(b, S, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: C })
		});
		function z(e) {
			return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		let B = a(() => RegExp(`${z(o.prefix)}\\S*`, "g")), V = a(() => {
			let e = g.value ?? "";
			if (!e) return [];
			let t = [], n = B.value;
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
		}), U = a(() => {
			let e = O.value.toLowerCase();
			return e ? o.options.filter((t) => t.name.toLowerCase().includes(e)) : o.options;
		});
		function G() {
			let e = x.value;
			if (!e || o.disabled) {
				C.value = !1;
				return;
			}
			let t = e.value ?? g.value ?? "", n = e.selectionStart ?? t.length, r = t.slice(0, n), i = r.lastIndexOf(o.prefix);
			if (i === -1) {
				C.value = !1;
				return;
			}
			let a = r.slice(i + o.prefix.length);
			/\s/.test(a) ? C.value = !1 : (O.value = a, k.value = 0, C.value ? N() : (C.value = !0, E(() => {
				N(), F();
			})));
		}
		function te() {
			C.value = !1, I();
		}
		function ne(e) {
			let t = e.target.value;
			g.value = t, h("change", t), G();
		}
		function re(e) {
			if (e.key === "Escape") C.value && w() && (e.stopPropagation(), te());
			else if (C.value) {
				if (e.key === "ArrowDown") e.preventDefault(), k.value = Math.min(k.value + 1, U.value.length - 1);
				else if (e.key === "ArrowUp") e.preventDefault(), k.value = Math.max(k.value - 1, 0);
				else if (e.key === "Enter" || e.key === "Tab") {
					let t = U.value[k.value];
					if (!t) return;
					e.preventDefault(), ie(t);
				}
			}
		}
		function ie(e) {
			let t = x.value, n = t?.value ?? g.value ?? "", r = t?.selectionStart ?? n.length, i = n.slice(0, r), a = i.lastIndexOf(o.prefix), s = a === -1 ? r : a, c = n.slice(r), l = `${o.prefix}${e.name} `, u = i.slice(0, s) + l + c;
			g.value = u, h("change", u), h("select", e), te(), E(() => {
				let e = s + l.length;
				t?.focus(), t?.setSelectionRange(e, e);
			});
		}
		function Y(e) {
			if (!C.value) return;
			let t = e.target;
			t && (b.value?.contains(t) || S.value?.contains(t) || te());
		}
		ee(() => document.addEventListener("mousedown", Y)), A(() => {
			document.removeEventListener("mousedown", Y), I();
		}), q(() => o.disabled, (e) => {
			e && te();
		});
		function ae(e) {
			let t = e.trim().split(/\s+/);
			return t.length > 1 ? (t[0][0] ?? "") + (t[1][0] ?? "") : e.slice(0, 2).toUpperCase();
		}
		let oe = a(() => typeof o.teleport == "string" ? o.teleport : "body"), se = a(() => Z("mc-mention", `mc-mention--${o.variant}`, `mc-mention--${o.size}`, {
			"is-disabled": o.disabled,
			"is-open": C.value
		}, o.customClass)), ce = a(() => ({ "mc-recipe-well": o.variant !== "ghost" }));
		return (i, a) => (P(), l("div", { class: D(se.value) }, [u("div", {
			ref_key: "field",
			ref: b,
			class: D(["mc-mention__field mc-sheen-sweep", ce.value]),
			id: W(_)
		}, [
			a[0] || (a[0] = u("span", {
				class: "mc-mention__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", I_, [(P(!0), l(t, null, R(V.value, (e, n) => (P(), l(t, { key: n }, [e.mention ? (P(), l("span", L_, H(e.text), 1)) : (P(), l(t, { key: 1 }, [p(H(e.text), 1)], 64))], 64))), 128)), g.value ? c("", !0) : (P(), l("span", R_, H(e.placeholder), 1))]),
			u("textarea", {
				ref_key: "textarea",
				ref: x,
				class: "mc-mention__input",
				value: g.value,
				placeholder: e.placeholder,
				disabled: e.disabled,
				"aria-expanded": C.value,
				"aria-controls": C.value ? v : void 0,
				"aria-activedescendant": C.value && U.value.length ? y(k.value) : void 0,
				"aria-autocomplete": "list",
				role: "combobox",
				rows: "1",
				onInput: ne,
				onKeydown: re,
				onClick: G,
				onBlur: te
			}, null, 40, z_)
		], 10, F_), (P(), s(n, {
			to: oe.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [C.value && U.value.length ? (P(), l("div", T({
				key: 0,
				id: v,
				ref_key: "floating",
				ref: S,
				class: "mc-mention__menu mc-recipe-panel",
				style: {
					...W(j),
					transformOrigin: W(M)
				}
			}, W(f), {
				role: "listbox",
				"aria-label": W(d).mention?.label ?? "mentions"
			}), [(P(!0), l(t, null, R(U.value, (e, t) => (P(), l("button", {
				id: y(t),
				key: e.id,
				type: "button",
				class: D(["mc-mention__option", { "is-active": t === k.value }]),
				role: "option",
				onMousedown: X((t) => ie(e), ["prevent"]),
				onMouseenter: (e) => k.value = t
			}, [
				u("span", H_, [e.avatar ? (P(), l("img", {
					key: 0,
					src: e.avatar,
					alt: e.name
				}, null, 8, U_)) : (P(), l("span", W_, H(ae(e.name)), 1))]),
				u("span", G_, H(e.name), 1),
				m($, {
					name: "at-sign",
					size: 12,
					class: "mc-mention__at"
				})
			], 42, V_))), 128))], 16, B_)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-04adea25"]]), q_ = ["aria-orientation"], J_ = [
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
], Y_ = {
	key: 1,
	class: "mc-menu__label"
}, X_ = {
	key: 3,
	class: "mc-menu__dot",
	"aria-hidden": "true"
}, Z_ = [
	"aria-disabled",
	"aria-current",
	"onClick"
], Q_ = { class: "mc-menu__label" }, $_ = 100, ev = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiMenu",
	__name: "Menu",
	props: /*@__PURE__*/ w({
		options: {},
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"select",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), p = Hn(), h = L([]), g = L(""), { isTop: _ } = Pn({ active: a(() => !!g.value) }), v = L(null), y = L(null), b = L(""), x = L(null), S = /* @__PURE__ */ new Map();
		function C(e, t) {
			t instanceof HTMLElement ? S.set(e, t) : S.delete(e);
		}
		function w(e) {
			return Array.isArray(e.children) && e.children.length > 0;
		}
		function O(e, t, n) {
			for (let r of e) {
				let e = w(r);
				n.push({
					type: e ? "group" : "item",
					key: r.key,
					option: r,
					depth: t
				}), e && h.value.includes(r.key) && O(r.children ?? [], t + 1, n);
			}
			return n;
		}
		let j = a(() => o.mode === "vertical"), M = a(() => j.value && o.collapsed), N = a(() => (o.options ?? []).map((e) => ({
			type: w(e) ? "group" : "item",
			key: e.key,
			option: e,
			depth: 0
		}))), F = a(() => j.value ? O(o.options ?? [], 0, []) : N.value), I = a(() => {
			if (!g.value) return null;
			let e = (t) => {
				for (let n of t) {
					if (n.key === g.value) return n;
					if (n.children) {
						let t = e(n.children);
						if (t) return t;
					}
				}
				return null;
			};
			return e(o.options ?? []);
		}), z = a(() => {
			let e = I.value;
			return !e || !e.children ? [] : O(e.children, 1, []);
		}), { style: B, transformOrigin: V, update: U, startAutoUpdate: G, stopAutoUpdate: te } = Cn(y, v, {
			placement: "bottom",
			offset: 10,
			flip: !0,
			shift: !0
		});
		function ne(e, t) {
			g.value === e && v.value ? re() : (g.value = e, y.value = t, E(() => {
				U(), G();
			}));
		}
		function re() {
			g.value && (g.value = "", te());
		}
		function ie(e) {
			_() && (ce(e), e.key === "Escape" && (e.stopPropagation(), re()));
		}
		function Y(e) {
			e.disabled || (f.value = e.key, d("select", e.key, e), (!j.value || M.value) && re());
		}
		function X(e) {
			if (e.disabled) return;
			let t = e.key;
			h.value.includes(t) ? (h.value = h.value.filter((e) => e !== t), d("close", t)) : (h.value = o.accordion ? [t] : [...h.value, t], d("open", t));
		}
		let ae = L({
			top: 0,
			scale: 1,
			ready: !1
		}), oe = L({
			left: 0,
			scale: 1,
			ready: !1
		});
		function se() {
			let e = f.value, t = e ? S.get(e) : void 0;
			if (j.value) {
				if (!t) ae.value = {
					...ae.value,
					ready: !1
				};
				else {
					let e = x.value?.offsetHeight || t.offsetHeight;
					ae.value = {
						top: t.offsetTop,
						scale: e > 0 ? t.offsetHeight / e : 1,
						ready: !0
					};
				}
			} else t ? oe.value = {
				left: t.offsetLeft,
				scale: t.offsetWidth / $_,
				ready: !0
			} : oe.value = {
				...oe.value,
				ready: !1
			};
		}
		q([
			() => f.value,
			() => o.collapsed,
			() => o.mode,
			h
		], () => {
			E(se);
		}), q(() => o.options, () => E(se), { deep: !0 });
		function ce(e) {
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
			e.key === "ArrowDown" || e.key === "ArrowRight" && !j.value ? i = r + 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" && !j.value ? i = r - 1 : e.key === "Home" ? i = 0 : e.key === "End" && (i = n.length - 1), i < 0 && (i = 0), i >= n.length && (i = n.length - 1), n[i]?.focus();
		}
		function le(e, t) {
			b.value = e.key, (o.mode === "horizontal" || M.value) && w(e.option) && ne(e.key, t.currentTarget);
		}
		let ue = a(() => {
			let e = b.value;
			return e && F.value.some((t) => t.key === e) ? e : f.value ? f.value : F.value[0]?.key ?? "";
		});
		function de(e) {
			let t = e.currentTarget;
			if (!t || typeof t.getBoundingClientRect != "function") return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-menu-glow-x", `${e.clientX - n.left}px`), t.style.setProperty("--mc-menu-glow-y", `${e.clientY - n.top}px`);
		}
		function fe(e) {
			if (!g.value) return;
			let t = e.target;
			t && (y.value?.contains(t) || v.value?.contains(t) || re());
		}
		ee(() => {
			E(se), At && (document.addEventListener("mousedown", fe, !0), window.addEventListener("resize", pe));
		}), A(() => {
			te(), At && (document.removeEventListener("mousedown", fe, !0), window.removeEventListener("resize", pe));
		});
		function pe() {
			E(se);
		}
		let me = a(() => !j.value || !M.value ? {} : {
			minWidth: `${o.collapseWidth}px`,
			maxWidth: `${o.collapseWidth}px`
		}), he = a(() => ({
			transform: `translateY(${ae.value.top}px) scaleY(${ae.value.scale})`,
			opacity: +!!ae.value.ready
		})), ge = a(() => ({
			width: `${$_}px`,
			transform: `translateX(${oe.value.left}px) scaleX(${oe.value.scale})`,
			opacity: +!!oe.value.ready
		}));
		function _e(e) {
			return M.value || !j.value ? {} : { paddingInlineStart: `${12 + e.depth * o.indent}px` };
		}
		let ve = a(() => Z("mc-menu", `mc-menu--${o.mode}`, `mc-menu--${o.theme}`, {
			"is-collapsed": M.value,
			"has-pill": j.value && ae.value.ready
		}, o.customClass));
		return (i, a) => (P(), l("div", {
			class: D(ve.value),
			style: k(me.value)
		}, [
			a[0] || (a[0] = u("span", {
				class: "mc-menu__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			u("div", {
				class: "mc-menu__list",
				role: "menu",
				"aria-orientation": e.mode === "horizontal" ? "horizontal" : "vertical",
				onKeydown: ce
			}, [e.mode === "vertical" ? (P(), l("span", {
				key: 0,
				ref_key: "pillEl",
				ref: x,
				class: "mc-menu__pill",
				style: k(he.value),
				"aria-hidden": "true"
			}, null, 4)) : (P(), l("span", {
				key: 1,
				class: "mc-menu__indicator",
				style: k(ge.value),
				"aria-hidden": "true"
			}, null, 4)), (P(!0), l(t, null, R(F.value, (t) => (P(), l("div", {
				key: t.key,
				class: "mc-menu__row",
				role: "none"
			}, [u("button", {
				ref_for: !0,
				ref: (e) => C(t.key, e),
				type: "button",
				role: "menuitem",
				class: D(["mc-menu__item mc-sheen-sweep", {
					"is-active": t.key === e.modelValue,
					"is-disabled": t.option.disabled,
					"is-group": t.type === "group",
					"is-open": t.type === "group" && h.value.includes(t.key)
				}]),
				style: k(_e(t)),
				"aria-disabled": t.option.disabled ? "true" : void 0,
				"aria-haspopup": t.type === "group" ? "true" : void 0,
				"aria-expanded": t.type === "group" ? h.value.includes(t.key) : void 0,
				"aria-current": t.key === e.modelValue ? "true" : void 0,
				"aria-label": M.value ? t.option.label : void 0,
				title: M.value ? t.option.label : void 0,
				tabindex: t.key === ue.value ? 0 : -1,
				onClick: (e) => t.type === "group" ? X(t.option) : Y(t.option),
				onPointermove: de,
				onMouseenter: (n) => (e.mode === "horizontal" || M.value) && w(t.option) ? ne(t.key, n.currentTarget) : void 0,
				onFocus: (e) => le(t, e)
			}, [
				t.option.icon ? (P(), s($, {
					key: 0,
					name: t.option.icon,
					size: 18,
					class: "mc-menu__icon"
				}, null, 8, ["name"])) : c("", !0),
				M.value ? c("", !0) : (P(), l("span", Y_, H(t.option.label), 1)),
				t.type === "group" && !M.value ? (P(), s($, {
					key: 2,
					name: "chevron-down",
					size: 14,
					class: "mc-menu__chevron"
				})) : c("", !0),
				M.value && t.key === e.modelValue ? (P(), l("span", X_)) : c("", !0)
			], 46, J_)]))), 128))], 40, q_),
			(P(), s(n, { to: "body" }, [m(r, { name: "mc-menu-panel" }, {
				default: J(() => [g.value && z.value.length ? (P(), l("div", T({
					key: 0,
					ref_key: "panelEl",
					ref: v,
					class: "mc-menu__panel mc-recipe-panel mc-grain-overlay",
					style: [W(B), { transformOrigin: W(V) }]
				}, W(p), {
					role: "menu",
					onKeydown: ie,
					onMouseleave: re
				}), [(P(!0), l(t, null, R(z.value, (t) => (P(), l("div", {
					key: t.key,
					class: "mc-menu__row",
					role: "none"
				}, [u("button", {
					ref_for: !0,
					ref: (e) => C(t.key, e),
					type: "button",
					role: "menuitem",
					class: D(["mc-menu__item mc-sheen-sweep", {
						"is-active": t.key === e.modelValue,
						"is-disabled": t.option.disabled,
						"is-group": t.type === "group"
					}]),
					style: k(_e(t)),
					"aria-disabled": t.option.disabled ? "true" : void 0,
					"aria-current": t.key === e.modelValue ? "true" : void 0,
					onPointermove: de,
					onClick: (e) => t.type === "group" ? X(t.option) : Y(t.option)
				}, [t.option.icon ? (P(), s($, {
					key: 0,
					name: t.option.icon,
					size: 17,
					class: "mc-menu__icon"
				}, null, 8, ["name"])) : c("", !0), u("span", Q_, H(t.option.label), 1)], 46, Z_)]))), 128))], 16)) : c("", !0)]),
				_: 1
			})]))
		], 6));
	}
}), [["__scopeId", "data-v-8e2d46c4"]]);
//#endregion
//#region src/utils/vnode.ts
function tv() {
	return function(e) {
		let t = e.content;
		return t == null || t === !1 ? null : typeof t == "string" || typeof t == "number" ? String(t) : t;
	};
}
//#endregion
//#region src/components/message/Message.vue?vue&type=script&setup=true&lang.ts
var nv = [
	"role",
	"aria-disabled",
	"aria-live"
], rv = {
	class: "mc-message__icon-wrap",
	"aria-hidden": "true"
}, iv = {
	key: 0,
	class: "mc-message__spinner",
	viewBox: "0 0 24 24"
}, av = {
	class: "mc-message__ring-svg",
	viewBox: "0 0 34 34",
	"data-mc-overlay": ""
}, ov = {
	key: 0,
	class: "mc-message__ring-bar",
	cx: "17",
	cy: "17",
	r: "15"
}, sv = { class: "mc-message__content" }, cv = ["aria-label", "disabled"], lv = 94.25, uv = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, s = tv(), d = L(!1), f = L(!1), p, h = 0, g = 0, _ = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x",
			loading: "loader-circle"
		}, v = a(() => r.icon ?? _[r.type]);
		function y() {
			f.value || r.disabled || (f.value = !0, b(), o("close"));
		}
		function b() {
			p !== void 0 && clearTimeout(p), p = void 0;
		}
		function x() {
			b(), !(r.duration <= 0) && (h = Date.now(), p = setTimeout(y, g > 0 ? g : r.duration));
		}
		function S() {
			r.duration <= 0 || d.value || (d.value = !0, g = Math.max(0, g - (Date.now() - h)), b());
		}
		function C() {
			r.duration <= 0 || (d.value = !1, x());
		}
		ee(() => {
			g = r.duration, x();
		}), A(() => {
			b();
		});
		let w = a(() => Z("mc-message", "mc-recipe-panel", "mc-grain-overlay", `mc-message--${r.type}`, `mc-message--${r.placement}`, {
			"is-paused": d.value,
			"is-disabled": r.disabled
		}, r.className, r.customClass)), T = a(() => ({
			"--mc-message-duration": `${Math.max(0, r.duration)}ms`,
			"--mc-message-ring": `${lv}`
		}));
		return (n, r) => (P(), l("div", {
			class: D(w.value),
			style: k(T.value),
			role: e.type === "error" ? "alert" : "status",
			"aria-disabled": e.disabled || void 0,
			"aria-live": e.type === "error" ? "assertive" : "polite",
			onMouseenter: S,
			onMouseleave: C
		}, [
			u("span", rv, [e.type === "loading" ? (P(), l("svg", iv, [...r[0] || (r[0] = [u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, -1)])])) : (P(), l(t, { key: 1 }, [(P(), l("svg", av, [r[1] || (r[1] = u("circle", {
				class: "mc-message__ring-track",
				cx: "17",
				cy: "17",
				r: "15"
			}, null, -1)), e.showProgress && e.duration > 0 ? (P(), l("circle", ov)) : c("", !0)])), m($, {
				name: v.value,
				size: 16,
				"stroke-width": 2,
				class: "mc-message__icon"
			}, null, 8, ["name"])], 64))]),
			u("span", sv, [z(n.$slots, "content", {}, () => [m(W(s), { content: e.content }, null, 8, ["content"])], !0)]),
			u("button", {
				type: "button",
				class: "mc-message__close",
				"aria-label": W(i).message.dismiss ?? "Dismiss",
				disabled: e.disabled,
				onClick: y
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, cv)
		], 46, nv));
	}
}), [["__scopeId", "data-v-bfdda409"]]), dv = V([]), fv = L("mc-message"), pv = L(0), mv = L(3), hv = 0;
function gv() {
	return hv += 1, hv;
}
function _v(e) {
	let t = e.max > 0 ? e.max : mv.value, n = [...dv.value, e];
	for (; n.length > t;) n.shift();
	dv.value = n;
}
function vv(e) {
	dv.value.some((t) => t.id === e) && (dv.value = dv.value.filter((t) => t.id !== e));
}
function yv() {
	dv.value = [];
}
//#endregion
//#region src/components/message/MessageProvider.vue
var bv = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiMessageProvider",
	__name: "MessageProvider",
	props: {
		customClass: {},
		placement: { default: "top" },
		offset: { default: 16 },
		max: { default: 3 }
	},
	setup(e) {
		let n = e;
		ee(() => {
			pv.value += 1, mv.value = n.max, At && window.addEventListener("resize", h), h();
		}), A(() => {
			pv.value = Math.max(0, pv.value - 1), At && window.removeEventListener("resize", h);
		}), q(() => n.max, (e) => {
			mv.value = e;
		});
		function r(e) {
			vv(e);
		}
		let o = a(() => dv.value[dv.value.length - 1]), c = a(() => o.value?.placement ?? n.placement), u = a(() => {
			let e = o.value?.offset ?? n.offset;
			return Number.isFinite(e) ? Math.max(0, e) : 0;
		}), d = L(null), f = L(0), p = L(0);
		function h() {
			let e = d.value?.firstElementChild;
			f.value = e ? e.offsetHeight : 0, p.value = At ? window.innerHeight : 0;
		}
		q(dv, () => {
			E(h);
		}, { deep: !0 });
		let g = a(() => {
			let e = p.value, t = f.value;
			if (!e || !t) return 0;
			let n = u.value;
			if (c.value === "center") {
				let r = t - (e - n * 2);
				return r > 0 ? -Math.round(r / 2) : 0;
			}
			let r = t + n - e;
			return r <= 0 ? 0 : -Math.min(Math.round(r), n);
		}), _ = a(() => {
			let e = `${u.value}px`, t = c.value;
			return {
				paddingTop: t.startsWith("top") ? e : "0px",
				paddingBottom: t.startsWith("bottom") ? e : "0px",
				paddingLeft: t.endsWith("start") ? e : "0px",
				paddingRight: t.endsWith("end") ? e : "0px"
			};
		}), v = a(() => ({ "--mc-message-shift": `${g.value}px` }));
		return (e, a) => (P(), l("div", {
			ref_key: "hostEl",
			ref: d,
			class: D(W(Z)("mc-message-host", `mc-message-host--${c.value}`, n.customClass)),
			style: k(_.value),
			role: "status",
			"aria-live": "polite"
		}, [m(i, {
			name: W(fv),
			tag: "div",
			class: "mc-message-stack",
			"move-class": "mc-message-move",
			style: k(v.value)
		}, {
			default: J(() => [(P(!0), l(t, null, R(W(dv), (e) => (P(), s(uv, {
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
				onClose: (t) => r(e.id)
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
}), [["__scopeId", "data-v-4207f52d"]]), xv = null, Sv = null;
function Cv() {
	xv || typeof document < "u" && (pv.value > 0 || (xv = document.createElement("div"), xv.className = "mc-message-root", document.body.appendChild(xv), Sv = o(bv), Sv.mount(xv)));
}
function wv(e, t, n = {}) {
	let r = n.duration ?? (e === "loading" ? 0 : 3e3), i = {
		id: gv(),
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
	return _v(i), Cv(), {
		id: i.id,
		close: () => vv(i.id)
	};
}
var Tv = {
	info(e, t) {
		return wv("info", e, t);
	},
	success(e, t) {
		return wv("success", e, t);
	},
	warning(e, t) {
		return wv("warning", e, t);
	},
	error(e, t) {
		return wv("error", e, t);
	},
	loading(e, t) {
		return wv("loading", e, {
			duration: 0,
			...t
		});
	},
	open(e, t) {
		return wv(t?.type ?? "info", e, t);
	},
	closeAll() {
		yv();
	},
	destroyAll() {
		let e = fv.value;
		fv.value = "", yv(), E(() => {
			fv.value = e;
		});
	}
};
function Ev() {
	return Tv;
}
//#endregion
//#region src/components/modal/Modal.vue
var Dv = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		ariaLabel: {},
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
	setup(e, { emit: t }) {
		let n = e, r = te(), i = t, o = L(!1);
		q(() => [n.open, n.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (o.value = t) : o.value = e;
		}, { immediate: !0 });
		let c = L(!1), l = a(() => n.loading || c.value), u = a(() => !(n.title || r.header));
		function f(e) {
			i("cancel"), n.onCancel?.(), e();
		}
		function h(e) {
			o.value !== e && (o.value = e, i("update:open", e), i("update:modelValue", e), i(e ? "open" : "close"));
		}
		function g(e) {
			o.value !== e && (o.value = e, i("update:open", e), i("update:modelValue", e), i(e ? "open" : "close"));
		}
		async function _() {
			if (!(n.disabled || c.value)) {
				if (i("ok"), !n.onOk) h(!1);
				else {
					c.value = !0;
					try {
						await n.onOk() !== !1 && h(!1);
					} finally {
						c.value = !1;
					}
				}
			}
		}
		function v() {
			n.disabled || (i("cancel"), n.onCancel?.(), h(!1));
		}
		return (t, n) => (P(), s(Rd, {
			open: o.value,
			width: e.width,
			variant: e.variant,
			disabled: e.disabled,
			headerless: u.value,
			"aria-label": e.ariaLabel,
			"close-on-click-modal": e.maskClosable,
			"before-close": f,
			"custom-class": e.customClass,
			"onUpdate:open": g
		}, d({
			footer: J(() => [z(t.$slots, "footer", {}, () => [m(qr, {
				variant: "soft",
				disabled: e.disabled,
				onClick: v
			}, {
				default: J(() => [p(H(e.cancelText), 1)]),
				_: 1
			}, 8, ["disabled"]), m(qr, {
				variant: "solid",
				color: "accent",
				loading: l.value,
				disabled: e.disabled,
				onClick: _
			}, {
				default: J(() => [p(H(e.okText), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])], !0)]),
			default: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			_: 2
		}, [W(r).header ? {
			name: "title",
			fn: J(() => [z(t.$slots, "header", {}, void 0, !0)]),
			key: "0"
		} : e.title === void 0 ? void 0 : {
			name: "title",
			fn: J(() => [p(H(e.title), 1)]),
			key: "1"
		}]), 1032, [
			"open",
			"width",
			"variant",
			"disabled",
			"headerless",
			"aria-label",
			"close-on-click-modal",
			"custom-class"
		]));
	}
}), [["__scopeId", "data-v-98c07a3b"]]), Ov = { class: "mc-notification-wrap" }, kv = [
	"role",
	"aria-disabled",
	"aria-live"
], Av = {
	class: "mc-notification__icon-wrap",
	"aria-hidden": "true"
}, jv = {
	key: 0,
	class: "mc-notification__spinner",
	viewBox: "0 0 24 24"
}, Mv = { class: "mc-notification__body" }, Nv = {
	key: 0,
	class: "mc-notification__title",
	"data-mc-type": "title"
}, Pv = { class: "mc-notification__content" }, Fv = ["aria-label", "disabled"], Iv = {
	key: 0,
	class: "mc-notification__bar",
	"aria-hidden": "true"
}, Lv = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = rn(), i = t, o = L(!1), d = L(!1), f, h = 0, g = 0, _ = {
			info: "info",
			success: "circle-check",
			warning: "alert-triangle",
			error: "circle-x",
			loading: "loader-circle"
		}, v = a(() => n.icon ?? _[n.type]), y = a(() => n.type === "loading");
		function b() {
			f !== void 0 && clearTimeout(f), f = void 0;
		}
		function x() {
			d.value || n.disabled || (d.value = !0, b(), i("close"));
		}
		function S() {
			b(), !y.value && (n.duration <= 0 || (h = Date.now(), f = setTimeout(x, g > 0 ? g : n.duration)));
		}
		function C() {
			y.value || n.duration <= 0 || o.value || (o.value = !0, g = Math.max(0, g - (Date.now() - h)), b());
		}
		function w() {
			y.value || n.duration <= 0 || (o.value = !1, S());
		}
		ee(() => {
			g = n.duration, S();
		}), A(() => {
			b();
		});
		let T = a(() => Z("mc-notification", "mc-recipe-panel", "mc-grain-overlay", `mc-notification--${n.type}`, {
			"is-paused": o.value,
			"is-disabled": n.disabled
		}, n.className, n.customClass)), E = a(() => ({ "--mc-notification-duration": `${Math.max(0, n.duration)}ms` }));
		return (t, n) => (P(), l("div", Ov, [u("div", {
			class: D(T.value),
			style: k(E.value),
			role: e.type === "error" ? "alert" : "status",
			"aria-disabled": e.disabled || void 0,
			"aria-live": e.type === "error" ? "assertive" : "polite",
			onMouseenter: C,
			onMouseleave: w
		}, [
			u("span", Av, [y.value ? (P(), l("svg", jv, [...n[0] || (n[0] = [u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			}, null, -1)])])) : (P(), s($, {
				key: 1,
				name: v.value,
				size: 18,
				"stroke-width": 2,
				class: "mc-notification__icon"
			}, null, 8, ["name"]))]),
			u("div", Mv, [e.title || t.$slots.title ? (P(), l("p", Nv, [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)])) : c("", !0), u("p", Pv, H(e.content), 1)]),
			u("button", {
				type: "button",
				class: "mc-notification__close",
				"aria-label": W(r).notification?.dismiss ?? "Dismiss notification",
				disabled: e.disabled,
				onClick: x
			}, [m($, {
				name: "close",
				size: 13,
				"stroke-width": 2.4
			})], 8, Fv),
			e.showProgress && e.duration > 0 && !y.value ? (P(), l("span", Iv)) : c("", !0)
		], 46, kv)]));
	}
}), [["__scopeId", "data-v-b235c3e1"]]), Rv = L([]), zv = L("mc-notification"), Bv = L(0), Vv = 0;
function Hv() {
	return Vv += 1, Vv;
}
function Uv(e) {
	Rv.value.push(e);
}
function Wv(e) {
	let t = Rv.value.findIndex((t) => t.id === e);
	t >= 0 && Rv.value.splice(t, 1);
}
function Gv() {
	Rv.value.splice(0, Rv.value.length);
}
//#endregion
//#region src/components/notification/NotificationProvider.vue
var Kv = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiNotificationProvider",
	__name: "NotificationProvider",
	props: { customClass: {} },
	setup(e) {
		let n = e;
		ee(() => {
			Bv.value += 1;
		}), A(() => {
			Bv.value = Math.max(0, Bv.value - 1);
		});
		function r(e) {
			Wv(e);
		}
		return (e, a) => (P(), l("div", {
			class: D(W(Z)("mc-notification-host", n.customClass)),
			role: "status",
			"aria-live": "polite"
		}, [m(i, {
			name: W(zv),
			tag: "div",
			class: "mc-notification-stack",
			"move-class": "mc-notification-move"
		}, {
			default: J(() => [(P(!0), l(t, null, R(W(Rv), (e) => (P(), s(Lv, {
				key: e.id,
				type: e.type,
				content: e.content,
				title: e.title,
				duration: e.duration,
				icon: e.icon,
				"show-progress": e.showProgress,
				"class-name": e.className,
				"custom-class": e.customClass,
				onClose: (t) => r(e.id)
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
}), [["__scopeId", "data-v-a4e462cb"]]), qv = null, Jv = null;
function Yv() {
	qv || typeof document < "u" && (Bv.value > 0 || (qv = document.createElement("div"), qv.className = "mc-notification-root", document.body.appendChild(qv), Jv = o(Kv), Jv.mount(qv)));
}
function Xv(e, t, n = {}) {
	let r = n.duration ?? (e === "loading" ? 0 : 4500), i = {
		id: Hv(),
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
	return Uv(i), Yv(), {
		id: i.id,
		close: () => Wv(i.id)
	};
}
var Zv = {
	info(e, t) {
		return Xv("info", e, t);
	},
	success(e, t) {
		return Xv("success", e, t);
	},
	warning(e, t) {
		return Xv("warning", e, t);
	},
	error(e, t) {
		return Xv("error", e, t);
	},
	loading(e, t) {
		return Xv("loading", e, {
			duration: 0,
			...t
		});
	},
	open(e, t) {
		return Xv(t?.type ?? "info", e, t);
	},
	closeAll() {
		Gv();
	},
	destroyAll() {
		let e = zv.value;
		zv.value = "", Gv(), E(() => {
			zv.value = e;
		});
	}
};
function Qv() {
	return Zv;
}
//#endregion
//#region src/components/number-animation/NumberAnimation.vue?vue&type=script&setup=true&lang.ts
var $v = {
	key: 0,
	class: "mc-number-animation__affix"
}, ey = ["aria-label"], ty = { class: "mc-number-animation__inner" }, ny = {
	key: 0,
	class: "mc-number-animation__static"
}, ry = {
	key: 1,
	class: "mc-number-animation__reel",
	"aria-hidden": "true"
}, iy = {
	key: 1,
	class: "mc-number-animation__affix"
}, ay = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = L(n.from), i = 0;
		function o(e) {
			let [t, r] = (Number.isFinite(e) ? e : 0).toFixed(n.decimals).split("."), i = n.separator ? t.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : t;
			return r ? `${i}.${r}` : i;
		}
		function s(e) {
			return e === 1 ? 1 : 1 - 2 ** (-10 * e);
		}
		function d() {
			i && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(i), i = 0);
		}
		function f() {
			d();
			let e = n.direction === "down" ? n.value : n.from, t = n.direction === "down" ? n.from : n.value, a = t - e;
			if (r.value = e, a === 0 || n.duration <= 0 || !At) {
				r.value = t;
				return;
			}
			let o = performance.now(), c = () => {
				let l = Math.min(1, (performance.now() - o) / n.duration);
				r.value = e + a * s(l), l < 1 ? i = Mt(c) : r.value = t;
			};
			i = Mt(c);
		}
		q(() => [
			n.value,
			n.from,
			n.direction,
			n.duration
		], () => f(), { immediate: !0 }), A(() => {
			d();
		});
		let p = a(() => o(r.value).split("").map((e) => ({
			char: e,
			digit: /[0-9]/.test(e) ? Number(e) : null
		}))), m = a(() => o(r.value)), h = a(() => Z("mc-number-animation", `mc-number-animation--${n.size}`, `mc-number-animation--${n.direction}`, n.customClass)), g = a(() => Ot(n.color) ? { color: Ot(n.color) } : void 0);
		return (n, r) => (P(), l("span", {
			class: D(["mc-number-animation", h.value]),
			style: k(g.value),
			"aria-live": "polite",
			"data-mc-type": "readout"
		}, [
			e.prefix ? (P(), l("span", $v, H(e.prefix), 1)) : c("", !0),
			u("span", {
				class: D(["mc-number-animation__value", { "is-plain": !!e.color }]),
				"aria-label": m.value
			}, [u("span", ty, [(P(!0), l(t, null, R(p.value, (e, n) => (P(), l("span", {
				key: n,
				class: D(["mc-number-animation__glyph", { "is-digit": e.digit !== null }])
			}, [e.digit === null ? (P(), l("span", ny, H(e.char), 1)) : (P(), l("span", ry, [u("span", {
				class: "mc-number-animation__strip",
				"aria-hidden": "true",
				style: k({ transform: `translateY(${-e.digit * 10}%)` })
			}, [(P(), l(t, null, R(10, (e) => u("i", { key: e }, H(e - 1), 1)), 64))], 4)]))], 2))), 128))])], 10, ey),
			e.suffix ? (P(), l("span", iy, H(e.suffix), 1)) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-92fa7c57"]]), oy = ["aria-disabled"], sy = ["aria-label"], cy = ["href"], ly = {
	key: 1,
	class: "mc-page-header__crumb is-current"
}, uy = { class: "mc-page-header__main" }, dy = { class: "mc-page-header__lead" }, fy = ["disabled", "aria-label"], py = { class: "mc-page-header__back-label" }, my = { class: "mc-page-header__text" }, hy = {
	key: 0,
	class: "mc-page-header__title",
	"data-mc-type": "title"
}, gy = {
	key: 1,
	class: "mc-page-header__subtitle"
}, _y = {
	key: 0,
	class: "mc-page-header__actions"
}, vy = {
	key: 1,
	class: "mc-page-header__extra"
}, yy = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n, d = L(!1);
		function f() {
			d.value = window.scrollY > 24;
		}
		ee(() => {
			r.sticky && window.addEventListener("scroll", f, { passive: !0 });
		}), A(() => {
			r.sticky && window.removeEventListener("scroll", f);
		});
		let h = a(() => typeof r.back == "string" ? r.back : i.value.pageHeader?.back ?? "Back"), g = a(() => Z("mc-page-header", {
			"is-sticky": r.sticky,
			"mc-recipe-panel": r.sticky,
			"is-condensed": d.value,
			"is-compact": r.compact,
			"is-aurora": r.aurora,
			"is-grain": r.grain,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (P(), l("header", {
			class: D(g.value),
			"aria-disabled": e.disabled || void 0
		}, [
			r[2] || (r[2] = u("span", {
				class: "mc-page-header__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.breadcrumb?.length ? (P(), l("nav", {
				key: 0,
				class: "mc-page-header__crumbs",
				"aria-label": W(i).pageHeader?.breadcrumb ?? "Breadcrumb"
			}, [(P(!0), l(t, null, R(e.breadcrumb, (n, r) => (P(), l(t, { key: r }, [n.href ? (P(), l("a", {
				key: 0,
				class: "mc-page-header__crumb",
				href: n.href
			}, [n.icon ? (P(), s($, {
				key: 0,
				name: n.icon,
				size: 14
			}, null, 8, ["name"])) : c("", !0), p(" " + H(n.label), 1)], 8, cy)) : (P(), l("span", ly, [n.icon ? (P(), s($, {
				key: 0,
				name: n.icon,
				size: 14
			}, null, 8, ["name"])) : c("", !0), p(" " + H(n.label), 1)])), r < e.breadcrumb.length - 1 ? (P(), s($, {
				key: 2,
				name: e.separator,
				size: 13,
				class: "mc-page-header__crumb-sep"
			}, null, 8, ["name"])) : c("", !0)], 64))), 128))], 8, sy)) : c("", !0),
			u("div", uy, [u("div", dy, [
				e.back ? (P(), l("button", {
					key: 0,
					class: "mc-page-header__back",
					type: "button",
					disabled: e.disabled,
					"aria-label": h.value,
					onClick: r[0] || (r[0] = (e) => o("back"))
				}, [m($, {
					name: "arrow-left",
					size: 16
				}), u("span", py, H(h.value), 1)], 8, fy)) : c("", !0),
				e.avatar ? (P(), s(er, {
					key: 1,
					src: e.avatar,
					size: "large",
					class: "mc-page-header__avatar"
				}, null, 8, ["src"])) : c("", !0),
				u("div", my, [
					e.title ? (P(), l("h1", hy, H(e.title), 1)) : c("", !0),
					e.subtitle ? (P(), l("p", gy, H(e.subtitle), 1)) : c("", !0),
					z(n.$slots, "meta", {}, void 0, !0)
				])
			]), n.$slots.actions ? (P(), l("div", _y, [r[1] || (r[1] = u("span", {
				class: "mc-page-header__glint",
				"aria-hidden": "true"
			}, null, -1)), z(n.$slots, "actions", {}, void 0, !0)])) : c("", !0)]),
			n.$slots.extra ? (P(), l("div", vy, [z(n.$slots, "extra", {}, void 0, !0)])) : c("", !0)
		], 10, oy));
	}
}), [["__scopeId", "data-v-db2309d0"]]), by = ["aria-label", "aria-disabled"], xy = {
	key: 0,
	class: "mc-pagination__total"
}, Sy = { class: "mc-pagination__controls" }, Cy = ["disabled", "aria-label"], wy = {
	key: 1,
	class: "mc-pagination__step-label"
}, Ty = {
	key: 0,
	class: "mc-pagination__pages"
}, Ey = {
	key: 0,
	class: "mc-pagination__gap"
}, Dy = [
	"disabled",
	"aria-current",
	"aria-label",
	"onClick"
], Oy = { class: "mc-pagination__page-label" }, ky = {
	key: 0,
	class: "mc-pagination__grain mc-grain-overlay",
	"aria-hidden": "true"
}, Ay = {
	key: 1,
	class: "mc-pagination__counter"
}, jy = ["disabled", "aria-label"], My = {
	key: 1,
	class: "mc-pagination__step-label"
}, Ny = {
	key: 1,
	class: "mc-pagination__sizer"
}, Py = { class: "mc-visually-hidden" }, Fy = ["value", "disabled"], Iy = ["value"], Ly = {
	key: 2,
	class: "mc-pagination__jumper"
}, Ry = { class: "mc-pagination__jumper-text" }, zy = [
	"max",
	"disabled",
	"aria-label"
], By = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiPagination",
	__name: "Pagination",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: 1 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:pageSize",
		"change",
		"size-change"
	], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), d = L(""), f = rn(), p = a(() => {
			let e = Math.max(1, r.pageSize);
			return Math.max(1, Math.ceil((r.total || 0) / e));
		}), m = a(() => {
			let e = Math.round(o.value || 1);
			return Math.min(Math.max(1, e), p.value);
		});
		function h(e) {
			return !!Kt[Yt(e)];
		}
		let g = a(() => {
			let e = p.value, t = m.value;
			if (e <= 7) return Array.from({ length: e }, (e, t) => t + 1);
			let n = [1], r = Math.max(2, t - 1), i = Math.min(e - 1, t + 1);
			r > 2 && n.push("gap-left");
			for (let e = r; e <= i; e += 1) n.push(e);
			return i < e - 1 && n.push("gap-right"), n.push(e), n;
		});
		function _(e) {
			if (r.disabled) return;
			let t = Math.min(Math.max(1, e), p.value);
			t !== o.value && (o.value = t, i("change", t, r.pageSize));
		}
		function v(e) {
			if (r.disabled) return;
			let t = Number(e.target.value);
			if (!t || t === r.pageSize) return;
			i("update:pageSize", t), i("size-change", t);
			let n = Math.min(m.value, Math.max(1, Math.ceil((r.total || 0) / t)));
			o.value = n, i("change", n, t);
		}
		function y() {
			if (r.disabled) return;
			let e = Number(d.value);
			e && (_(e), d.value = "");
		}
		q(p, (e) => {
			m.value > e && (o.value = e);
		});
		let b = a(() => Z("mc-pagination", {
			"is-simple": r.simple,
			"is-disabled": r.disabled
		}, r.customClass));
		return (n, r) => (P(), l("nav", {
			class: D(b.value),
			"aria-label": W(f).pagination.label ?? "Pagination",
			"aria-disabled": e.disabled ? "true" : void 0
		}, [
			r[3] || (r[3] = u("span", {
				class: "mc-pagination__aurora mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)),
			e.showTotal ? (P(), l("span", xy, H(W(f).pagination.total.replace("{count}", String(e.total))), 1)) : c("", !0),
			u("div", Sy, [
				u("button", {
					type: "button",
					class: D(["mc-pagination__step mc-sheen-sweep", { "is-text": !h(e.prev) }]),
					disabled: e.disabled || m.value <= 1,
					"aria-label": W(f).pagination.previousPage ?? "Previous page",
					onClick: r[0] || (r[0] = (e) => _(m.value - 1))
				}, [h(e.prev) ? (P(), s($, {
					key: 0,
					name: e.prev,
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])) : (P(), l("span", wy, H(e.prev), 1))], 10, Cy),
				e.simple ? (P(), l("span", Ay, H(m.value) + " / " + H(p.value), 1)) : (P(), l("div", Ty, [(P(!0), l(t, null, R(g.value, (n) => (P(), l(t, { key: n }, [typeof n == "string" ? (P(), l("span", Ey, "…")) : (P(), l("button", {
					key: 1,
					type: "button",
					class: D(["mc-pagination__page mc-sheen-sweep", { "is-active": n === m.value }]),
					disabled: e.disabled,
					"aria-current": n === m.value ? "page" : void 0,
					"aria-label": `Page ${n}`,
					onClick: (e) => _(n)
				}, [u("span", Oy, H(n), 1), n === m.value ? (P(), l("span", ky)) : c("", !0)], 10, Dy))], 64))), 128))])),
				u("button", {
					type: "button",
					class: D(["mc-pagination__step mc-sheen-sweep", { "is-text": !h(e.next) }]),
					disabled: e.disabled || m.value >= p.value,
					"aria-label": W(f).pagination.nextPage ?? "Next page",
					onClick: r[1] || (r[1] = (e) => _(m.value + 1))
				}, [h(e.next) ? (P(), s($, {
					key: 0,
					name: e.next,
					size: 16,
					"stroke-width": 2.2
				}, null, 8, ["name"])) : (P(), l("span", My, H(e.next), 1))], 10, jy)
			]),
			e.showSizeChanger && !e.simple ? (P(), l("label", Ny, [u("span", Py, H(W(f).pagination.perPage ?? "Items per page"), 1), u("select", {
				class: "mc-pagination__select mc-recipe-well",
				value: e.pageSize,
				disabled: e.disabled,
				onChange: v
			}, [(P(!0), l(t, null, R(e.pageSizes, (e) => (P(), l("option", {
				key: e,
				value: e
			}, H(e) + " / page", 9, Iy))), 128))], 40, Fy)])) : c("", !0),
			e.showQuickJumper && !e.simple ? (P(), l("label", Ly, [u("span", Ry, H(W(f).pagination.goto), 1), ie(u("input", {
				"onUpdate:modelValue": r[2] || (r[2] = (e) => d.value = e),
				class: "mc-pagination__input mc-recipe-well",
				type: "number",
				min: "1",
				max: p.value,
				disabled: e.disabled,
				"aria-label": W(f).pagination.jumpToPage ?? "Jump to page",
				onKeydown: Y(y, ["enter"])
			}, null, 40, zy), [[ne, d.value]])])) : c("", !0)
		], 10, by));
	}
}), [["__scopeId", "data-v-13c96096"]]), Vy = "a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
function Hy(e, t) {
	let n = L(!0), r = L(null), i = null;
	function a() {
		let i = e.value;
		if (!i) return;
		let a = i.querySelector(Vy);
		r.value = a, n.value = !a, t?.(a);
	}
	return ee(() => {
		a(), typeof MutationObserver < "u" && e.value && (i = new MutationObserver(() => a()), i.observe(e.value, {
			childList: !0,
			subtree: !0
		}));
	}), A(() => {
		i?.disconnect(), i = null;
	}), {
		selfFocusable: n,
		innerFocusable: r,
		detect: a
	};
}
//#endregion
//#region src/components/popover/Popover.vue?vue&type=script&setup=true&lang.ts
var Uy = [
	"role",
	"tabindex",
	"aria-expanded",
	"aria-disabled",
	"aria-controls"
], Wy = [
	"id",
	"aria-labelledby",
	"aria-label"
], Gy = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, Ky = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, qy = ["id"], Jy = { class: "mc-popover__body" }, Yy = {
	key: 2,
	class: "mc-popover__footer"
}, Xy = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		customClass: {},
		ariaLabel: {},
		triggerClass: {}
	},
	emits: [
		"update:open",
		"update:modelValue",
		"open",
		"close"
	],
	setup(e, { expose: i, emit: o }) {
		let d = te(), f = e, h = o, g = Ln("mc-popover"), _ = Ln("mc-popover-title"), v = L(null), y = L(null), b = L(!1), { isTop: x } = Pn({ active: b }), { selfFocusable: S } = Hy(v), C = jn({ active: b }), w = Hn(), { style: O, coords: j, currentPlacement: M, transformOrigin: N, arrowSide: F, update: I, startAutoUpdate: R, stopAutoUpdate: B } = Cn(v, y, {
			placement: f.placement,
			offset: f.offset,
			zIndex: C
		}), V = a(() => b.value && !f.disabled);
		q(() => [f.open, f.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (b.value = t) : b.value = e;
		}, { immediate: !0 }), q(V, (e) => {
			e ? (I(), R()) : B();
		}, { immediate: !0 });
		function U(e) {
			f.disabled || b.value !== e && (b.value = e, h("update:open", e), h("update:modelValue", e), h(e ? "open" : "close"));
		}
		function G() {
			f.trigger === "hover" && U(!0);
		}
		function K() {
			f.trigger === "hover" && U(!1);
		}
		function ne() {
			(f.trigger === "focus" || f.trigger === "hover") && U(!0);
		}
		function re(e) {
			if (f.trigger !== "focus") return;
			let t = e.relatedTarget;
			t && y.value?.contains(t) || U(!1);
		}
		function ie() {
			f.trigger === "click" && U(!b.value);
		}
		function Y() {
			(v.value?.querySelector("button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])") ?? v.value)?.focus({ preventScroll: !0 });
		}
		function X(e) {
			S.value && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ie());
		}
		function ae(e) {
			if (e.key !== "Escape" || !b.value || !x()) return;
			e.stopPropagation();
			let t = y.value?.contains(document.activeElement) ?? !1;
			U(!1), t && E(() => Y());
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", ae);
		}), A(() => {
			typeof document < "u" && document.removeEventListener("keydown", ae), B();
		}), ml(v, () => U(!1), { ignore: [y] });
		let oe = a(() => typeof f.teleport == "string" ? f.teleport : "body"), se = a(() => {
			let e = F.value;
			if (e === "top" || e === "bottom") {
				let e = j.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = j.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), ce = a(() => `mc-popover__arrow--${F.value}`), le = a(() => !!(f.title || d.title)), ue = a(() => f.ariaLabel ? void 0 : le.value ? _ : void 0);
		!le.value && !f.ariaLabel && Ad("popover:name", "Popover: a panel without a title (or `aria-label`) is announced without a name. Pass `title`, a `#title` slot, or `ariaLabel`.");
		let de = a(() => {
			if (f.width !== void 0) return typeof f.width == "number" ? `${f.width}px` : f.width;
		}), fe = a(() => Z("mc-popover__layer", `mc-popover--${M.value}`));
		i({
			floating: y,
			reference: v
		});
		let pe = a(() => Z("mc-popover", "mc-grain-overlay", {
			"mc-recipe-panel": f.variant !== "liquid",
			"mc-panel--liquid": f.variant === "liquid",
			"mc-liquid-glass": f.variant === "liquid",
			"mc-liquid-glass--liquid": f.variant === "liquid",
			"mc-liquid-glass--layers": f.variant === "liquid"
		}, f.popoverClass, f.customClass));
		return (i, a) => (P(), l(t, null, [u("span", {
			ref_key: "reference",
			ref: v,
			class: D(["mc-popover__trigger", [{ "is-disabled": e.disabled }, e.triggerClass]]),
			role: W(S) ? "button" : void 0,
			tabindex: W(S) ? 0 : void 0,
			"aria-expanded": V.value,
			"aria-haspopup": "dialog",
			"aria-disabled": e.disabled || void 0,
			"aria-controls": V.value ? W(g) : void 0,
			onMouseenter: G,
			onMouseleave: K,
			onFocusin: ne,
			onFocusout: re,
			onClick: ie,
			onKeydown: X
		}, [z(i.$slots, "trigger", {}, () => [z(i.$slots, "default", {}, void 0, !0)], !0)], 42, Uy), (P(), s(n, {
			to: oe.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-float" }, {
			default: J(() => [V.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: y,
				class: fe.value,
				style: W(O)
			}, W(w)), [e.showArrow ? (P(), l("span", {
				key: 0,
				class: D(["mc-popover__arrow", ce.value]),
				style: k(se.value),
				"aria-hidden": "true"
			}, null, 6)) : c("", !0), u("div", {
				id: W(g),
				class: D(pe.value),
				role: "dialog",
				"aria-labelledby": ue.value,
				"aria-label": e.ariaLabel || void 0,
				tabindex: "-1",
				style: k({
					width: de.value,
					transformOrigin: W(N)
				})
			}, [
				e.variant === "liquid" ? (P(), l("span", Gy)) : c("", !0),
				e.variant === "liquid" ? (P(), l("span", Ky)) : c("", !0),
				u("header", {
					id: W(_),
					class: D(["mc-popover__header", { "is-empty": !le.value }]),
					"data-mc-type": "title"
				}, [z(i.$slots, "title", {}, () => [p(H(e.title), 1)], !0)], 10, qy),
				u("div", Jy, [z(i.$slots, "content", {}, void 0, !0)]),
				i.$slots.footer ? (P(), l("footer", Yy, [z(i.$slots, "footer", {}, void 0, !0)])) : c("", !0)
			], 14, Wy)], 16)) : c("", !0)]),
			_: 3
		})], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-4737ea66"]]), Zy = {
	key: 0,
	class: "mc-popconfirm__description"
}, Qy = {
	key: 1,
	class: "mc-popconfirm__error",
	role: "alert"
}, $y = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		ariaLabel: {},
		width: { default: 280 },
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
	setup(e, { emit: t }) {
		let n = te(), r = e, i = t, o = rn(), u = L(!1), f = L(""), h = L(null), g = L(!1);
		q(() => [r.open, r.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (g.value = t) : g.value = e;
		}, { immediate: !0 });
		let _ = a(() => g.value && !r.disabled);
		function v() {
			return h.value?.floating?.querySelector("[role=\"dialog\"]") ?? null;
		}
		function y() {
			return h.value?.floating?.querySelector(".mc-popconfirm__ok") ?? null;
		}
		function b(e) {
			g.value !== e && (g.value = e, i("update:open", e), i("update:modelValue", e), i(e ? "open" : "close"));
		}
		q(g, (e) => {
			e && (f.value = "", E(() => y()?.focus({ preventScroll: !0 })));
		}, { immediate: !0 });
		function x() {
			h.value?.reference?.focus({ preventScroll: !0 });
		}
		function S(e) {
			g.value !== e && (g.value = e, i("update:open", e), i("update:modelValue", e), i(e ? "open" : "close"));
		}
		function C() {
			S(!1), x();
		}
		q(u, (e) => {
			e ? E(() => v()?.focus({ preventScroll: !0 })) : g.value && E(() => {
				g.value && y()?.focus({ preventScroll: !0 });
			});
		});
		function w(e) {
			return !!e && typeof e.then == "function";
		}
		function T(e) {
			let t = e instanceof Error ? e : Error(String(e));
			f.value = t.message || o.value.popconfirm.error || "Something went wrong", i("error", t);
		}
		async function D() {
			if (r.disabled || u.value) return;
			i("confirm"), f.value = "";
			let e = r.onOk;
			if (!e) {
				C();
				return;
			}
			let t;
			try {
				t = e();
			} catch (e) {
				T(e);
				return;
			}
			if (!w(t)) t !== !1 && C();
			else {
				u.value = !0, i("confirming", !0);
				try {
					await t !== !1 && C();
				} catch (e) {
					T(e);
				} finally {
					u.value = !1, i("confirming", !1);
				}
			}
		}
		function O() {
			i("cancel"), r.onCancel?.(), C();
		}
		let k = a(() => Z("mc-popconfirm", r.customClass));
		return (t, r) => (P(), s(Xy, {
			ref_key: "popoverRef",
			ref: h,
			open: _.value,
			trigger: "click",
			placement: e.placement,
			width: e.width,
			offset: 10,
			disabled: e.disabled,
			"aria-label": e.ariaLabel,
			"trigger-class": "mc-popconfirm__trigger",
			"custom-class": k.value,
			"onUpdate:open": b
		}, d({
			trigger: J(() => [z(t.$slots, "default", {}, void 0, !0)]),
			content: J(() => [
				e.description || t.$slots.description ? (P(), l("p", Zy, [z(t.$slots, "description", {}, () => [p(H(e.description), 1)], !0)])) : c("", !0),
				z(t.$slots, "content", {}, void 0, !0),
				f.value ? (P(), l("p", Qy, H(f.value), 1)) : c("", !0)
			]),
			footer: J(() => [m(qr, {
				size: "small",
				variant: "soft",
				onClick: O
			}, {
				default: J(() => [p(H(e.cancelText ?? W(o).popconfirm.cancel), 1)]),
				_: 1
			}), m(qr, {
				size: "small",
				variant: "solid",
				"custom-class": "mc-popconfirm__ok",
				color: e.okType === "primary" ? "accent" : e.okType,
				loading: u.value,
				disabled: u.value,
				onClick: D
			}, {
				default: J(() => [p(H(e.okText ?? W(o).popconfirm.confirm), 1)]),
				_: 1
			}, 8, [
				"color",
				"loading",
				"disabled"
			])]),
			_: 2
		}, [e.title || W(n).title ? {
			name: "title",
			fn: J(() => [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)]),
			key: "0"
		} : void 0]), 1032, [
			"open",
			"placement",
			"width",
			"disabled",
			"aria-label",
			"custom-class"
		]));
	}
}), [["__scopeId", "data-v-21164fea"]]), eb = [
	"aria-expanded",
	"aria-controls",
	"aria-owns",
	"aria-activedescendant",
	"aria-labelledby",
	"aria-disabled"
], tb = ["id"], nb = ["id"], rb = {
	key: 0,
	class: "mc-popselect__tag mc-popselect__tag--more"
}, ib = {
	key: 1,
	class: "mc-popselect__placeholder"
}, ab = ["id"], ob = ["id"], sb = ["id", "aria-multiselectable"], cb = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], lb = {
	class: "mc-popselect__check",
	"aria-hidden": "true"
}, ub = { class: "mc-popselect__label" }, db = {
	key: 0,
	class: "mc-popselect__empty"
}, fb = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiPopselect",
	__name: "Popselect",
	props: /*@__PURE__*/ w({
		open: { type: Boolean },
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"select",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), p = rn(), h = Ln("mc-popselect"), g = Ln("mc-popselect-list"), _ = Ln("mc-popselect-label"), v = Ln("mc-popselect-value"), y = L(null), b = L(null), x = L(!1), { isTop: S } = Pn({ active: x }), C = jn({ active: x }), w = Hn(), O = L(-1), { style: j, coords: M, currentPlacement: N, transformOrigin: F, arrowSide: I, update: z, startAutoUpdate: B, stopAutoUpdate: V } = Cn(y, b, {
			placement: o.placement,
			offset: 8,
			zIndex: C
		}), U = a(() => x.value && !o.disabled);
		q(() => o.open, (e) => {
			e !== void 0 && (x.value = e);
		}, { immediate: !0 }), q(U, (e) => {
			e ? (O.value = X(), z(), B()) : V();
		}, { immediate: !0 });
		let G = a(() => {
			let e = f.value;
			return e == null ? [] : Array.isArray(e) ? e : [e];
		});
		function te(e) {
			return G.value.includes(e.value);
		}
		let ne = a(() => o.options.filter((e) => te(e)).map((e) => e.label)), re = a(() => {
			let e = Math.max(0, o.maxTagCount);
			return ne.value.slice(0, e);
		}), ie = a(() => Math.max(0, ne.value.length - re.value.length)), Y = a(() => ne.value.length ? ne.value[0] : "");
		function X() {
			return o.options.findIndex((e) => !e.disabled);
		}
		function ae(e) {
			f.value = e, d("change", e);
		}
		function oe(e) {
			if (!e.disabled) {
				if (d("select", e.value), o.multiple) {
					let t = [...G.value], n = t.indexOf(e.value);
					n >= 0 ? t.splice(n, 1) : t.push(e.value), ae(t);
				} else ae(e.value), ce(!1);
			}
		}
		function se() {
			ae(o.multiple ? [] : void 0), x.value && y.value?.focus({ preventScroll: !0 });
		}
		function ce(e) {
			o.disabled || x.value !== e && (x.value = e, d("update:open", e), d(e ? "open" : "close"));
		}
		function le() {
			o.trigger === "hover" && ce(!0);
		}
		function ue() {
			o.trigger === "hover" && ce(!1);
		}
		function de() {
			(o.trigger === "focus" || o.trigger === "hover") && ce(!0);
		}
		function fe(e) {
			if (o.trigger !== "focus") return;
			let t = e.relatedTarget;
			t && b.value?.contains(t) || ce(!1);
		}
		function pe() {
			o.trigger === "click" && ce(!x.value);
		}
		function me(e) {
			let t = o.options.length;
			if (t === 0) return;
			let n = O.value;
			for (let r = 0; r < t; r += 1) if (n = (n + e + t) % t, !o.options[n]?.disabled) {
				O.value = n;
				return;
			}
		}
		function he() {
			for (let e = o.options.length - 1; e >= 0; --e) if (!o.options[e]?.disabled) return e;
			return -1;
		}
		function ge(e) {
			if (U.value) {
				if (e.key === "ArrowDown") e.preventDefault(), me(1);
				else if (e.key === "ArrowUp") e.preventDefault(), me(-1);
				else if (e.key === "Enter" || e.key === " ") {
					let t = o.options[O.value];
					t && (e.preventDefault(), oe(t));
				}
			}
		}
		function _e(e) {
			U.value ? ge(e) : o.disabled || (e.key === "Enter" || e.key === " " || e.key === "ArrowDown" ? (e.preventDefault(), ce(!0)) : e.key === "ArrowUp" && (e.preventDefault(), ce(!0), E(() => {
				O.value = he();
			})));
		}
		function ve() {
			let e = document.activeElement;
			return e ? !!y.value?.contains(e) || !!b.value?.contains(e) : !1;
		}
		function ye(e) {
			if (e.key === "Escape" && x.value && S()) {
				e.stopPropagation();
				let t = ve();
				ce(!1), t && y.value?.focus({ preventScroll: !0 });
				return;
			}
			if (!U.value) return;
			let t = e.target;
			t && b.value?.contains(t) && (t instanceof HTMLElement && t.closest("button, a, input, select, textarea, [role=\"button\"]") || ge(e));
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", ye);
		}), A(() => {
			typeof document < "u" && document.removeEventListener("keydown", ye), V();
		}), ml(y, () => ce(!1), { ignore: [b] });
		let be = a(() => typeof o.teleport == "string" ? o.teleport : "body"), xe = a(() => {
			let e = I.value;
			if (e === "top" || e === "bottom") {
				let e = M.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = M.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), Se = a(() => `mc-popselect__arrow--${I.value}`), Ce = a(() => {
			if (!(!U.value || O.value < 0) && o.options[O.value]) return `${g}-option-${O.value}`;
		}), we = a(() => p.value.popselect?.clear ?? "Clear"), Te = a(() => p.value.popselect?.label ?? "Select"), Ee = a(() => Z("mc-popselect__layer", `mc-popselect--${N.value}`)), De = a(() => Z("mc-popselect", "mc-recipe-panel", "mc-grain-overlay", o.customClass)), Oe = a(() => o.multiple ? "" : Y.value), ke = a(() => G.value.length > 0);
		return q(() => o.options, () => {
			U.value && (O.value = X());
		}), (i, a) => (P(), l(t, null, [u("span", {
			ref_key: "reference",
			ref: y,
			class: D(["mc-popselect__trigger", {
				"is-disabled": e.disabled,
				"is-open": U.value,
				"is-filled": ke.value
			}]),
			"aria-expanded": U.value,
			"aria-haspopup": "listbox",
			"aria-controls": W(g),
			"aria-owns": W(g),
			"aria-activedescendant": Ce.value,
			"aria-labelledby": `${W(_)} ${W(v)}`,
			"aria-disabled": e.disabled,
			role: "combobox",
			tabindex: "0",
			onMouseenter: le,
			onMouseleave: ue,
			onFocusin: de,
			onFocusout: fe,
			onClick: pe,
			onKeydown: _e
		}, [
			u("span", {
				id: W(_),
				class: "mc-visually-hidden"
			}, H(Te.value), 9, tb),
			e.multiple ? (P(), l("span", {
				key: 0,
				id: W(v),
				class: "mc-popselect__tags"
			}, [
				(P(!0), l(t, null, R(re.value, (e) => (P(), l("span", {
					key: e,
					class: "mc-popselect__tag"
				}, H(e), 1))), 128)),
				ie.value > 0 ? (P(), l("span", rb, " +" + H(ie.value), 1)) : c("", !0),
				ke.value ? c("", !0) : (P(), l("span", ib, H(e.placeholder ?? W(p).select.placeholder), 1))
			], 8, nb)) : (P(), l("span", {
				key: 1,
				id: W(v),
				class: "mc-popselect__value"
			}, [u("span", { class: D(ke.value ? "is-filled" : "is-placeholder") }, H(Oe.value || e.placeholder || W(p).select.placeholder), 3)], 8, ab)),
			m($, {
				name: "chevron-down",
				size: 14,
				class: "mc-popselect__caret"
			})
		], 42, eb), (P(), s(n, {
			to: be.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-float" }, {
			default: J(() => [U.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: b,
				class: Ee.value,
				style: W(j)
			}, W(w)), [e.showArrow ? (P(), l("span", {
				key: 0,
				class: D(["mc-popselect__arrow", Se.value]),
				style: k(xe.value),
				"aria-hidden": "true"
			}, null, 6)) : c("", !0), u("div", {
				id: W(h),
				class: D(De.value),
				role: "presentation",
				style: k({ transformOrigin: W(F) })
			}, [u("ul", {
				id: W(g),
				class: "mc-popselect__list mc-scroll",
				role: "listbox",
				"aria-multiselectable": e.multiple
			}, [(P(!0), l(t, null, R(e.options, (e, t) => (P(), l("li", {
				key: e.value,
				id: `${W(g)}-option-${t}`,
				class: D(["mc-popselect__option", {
					"is-selected": te(e),
					"is-disabled": e.disabled,
					"is-highlighted": t === O.value
				}]),
				role: "option",
				"aria-selected": te(e),
				"aria-disabled": e.disabled,
				onClick: (t) => oe(e),
				onMouseenter: (e) => O.value = t
			}, [u("span", lb, [te(e) ? (P(), s($, {
				key: 0,
				name: "check",
				size: 12,
				"stroke-width": 2.6
			})) : c("", !0)]), u("span", ub, H(e.label), 1)], 42, cb))), 128)), e.options.length === 0 ? (P(), l("li", db, H(W(p).select.noMatch), 1)) : c("", !0)], 8, sb), e.multiple && ke.value ? (P(), l("button", {
				key: 0,
				type: "button",
				class: "mc-popselect__clear",
				onClick: se
			}, H(we.value), 1)) : c("", !0)], 14, ob)], 16)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 64));
	}
}), [["__scopeId", "data-v-9824eb9f"]]), pb = ["aria-valuenow", "aria-disabled"], mb = {
	key: 0,
	class: "mc-progress__indicator"
}, hb = [
	"width",
	"height",
	"aria-valuenow",
	"aria-disabled"
], gb = ["id"], _b = [
	"stroke-width",
	"stroke-dasharray",
	"transform"
], vb = [
	"stroke-width",
	"stroke",
	"stroke-dasharray",
	"transform"
], yb = 42, bb = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = Ln("mc-progress-grad"), r = 2 * Math.PI * yb, i = .75 * r, o = a(() => {
			let e = Number(t.percentage);
			return Number.isNaN(e) ? 0 : Math.min(100, Math.max(0, e));
		}), s = a(() => Math.round(o.value)), d = a(() => o.value <= 0), f = a(() => o.value >= 100), p = a(() => {
			if (t.width !== void 0) return typeof t.width == "number" ? `${t.width}px` : t.width;
		}), m = a(() => {
			if (t.width !== void 0) return { width: p.value };
		}), h = a(() => {
			let e = { "--mc-p": String(o.value / 100) }, n = Ot(t.color);
			return n && (e.background = n), e;
		}), g = a(() => ({ left: `clamp(calc(var(--mc-progress-knob-size) / 2), ${o.value}%, calc(100% - var(--mc-progress-knob-size) / 2))` })), _ = a(() => t.strokeWidth * 100 / v.value), v = a(() => {
			let e = t.width;
			return e === void 0 ? 120 : typeof e == "number" ? e : parseFloat(e) || 120;
		}), y = a(() => `${v.value}px`), b = a(() => Math.min(180, Math.max(0, t.gap))), x = a(() => b.value / 360 * r), S = a(() => Math.max(0, i - x.value)), C = a(() => t.type === "dashboard"), w = a(() => C.value ? `${S.value * o.value / 100} ${r}` : `${r * o.value / 100} ${r}`), T = a(() => C.value ? `${S.value} ${r}` : `${r} ${r}`), E = a(() => C.value ? 135 : -90), O = a(() => Ot(t.color) ?? `url(#${n})`), A = a(() => t.showIndicator && t.indicatorPlacement !== "none"), j = a(() => Z("mc-progress", `mc-progress--${t.type}`, `mc-progress--${t.status ?? "normal"}`, {
			"is-inside": t.indicatorPlacement === "inside",
			"is-disabled": t.disabled,
			"is-empty": d.value,
			"is-full": f.value
		}, t.customClass));
		return (t, r) => e.type === "line" ? (P(), l("div", {
			key: 0,
			class: D(j.value),
			style: k(m.value)
		}, [u("div", {
			class: "mc-progress__track mc-recipe-well",
			style: k({ height: `${e.strokeWidth}px` }),
			role: "progressbar",
			tabindex: "0",
			"aria-valuenow": s.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-disabled": e.disabled || void 0
		}, [
			u("div", {
				class: "mc-progress__fill",
				style: k(h.value)
			}, [...r[0] || (r[0] = [u("span", {
				class: "mc-progress__sheen",
				"aria-hidden": "true"
			}, null, -1)])], 4),
			u("span", {
				class: "mc-progress__knob",
				style: k(g.value),
				"aria-hidden": "true"
			}, null, 4),
			e.showIndicator && e.indicatorPlacement === "inside" ? (P(), l("span", {
				key: 0,
				class: D(["mc-progress__indicator mc-progress__indicator--inside mc-recipe-panel", { "is-light": s.value > 55 }])
			}, H(s.value) + "% ", 3)) : c("", !0)
		], 12, pb), e.showIndicator && e.indicatorPlacement === "outside" ? (P(), l("span", mb, H(s.value) + "% ", 1)) : c("", !0)], 6)) : (P(), l("div", {
			key: 1,
			class: D(j.value),
			style: k({ width: y.value })
		}, [(P(), l("svg", {
			class: "mc-progress__svg",
			width: v.value,
			height: v.value,
			viewBox: "0 0 100 100",
			role: "progressbar",
			tabindex: "0",
			"aria-valuenow": s.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100",
			"aria-disabled": e.disabled || void 0
		}, [
			u("defs", null, [u("linearGradient", {
				id: W(n),
				x1: "0%",
				y1: "0%",
				x2: "100%",
				y2: "100%"
			}, [...r[1] || (r[1] = [
				u("stop", {
					offset: "0%",
					"stop-color": "hsl(var(--mc-h) var(--mc-s) 64%)"
				}, null, -1),
				u("stop", {
					offset: "52%",
					"stop-color": "hsl(var(--mc-h2) var(--mc-s2) 62%)"
				}, null, -1),
				u("stop", {
					offset: "100%",
					"stop-color": "hsl(var(--mc-h3) var(--mc-s3) 62%)"
				}, null, -1)
			])], 8, gb)]),
			u("circle", {
				class: "mc-progress__ring-track",
				cx: "50",
				cy: "50",
				r: yb,
				fill: "none",
				"stroke-width": _.value,
				"stroke-dasharray": T.value,
				transform: `rotate(${E.value} 50 50)`
			}, null, 8, _b),
			u("circle", {
				class: "mc-progress__ring-fill",
				cx: "50",
				cy: "50",
				r: yb,
				fill: "none",
				"stroke-width": _.value,
				"stroke-linecap": "round",
				stroke: O.value,
				"stroke-dasharray": w.value,
				transform: `rotate(${E.value} 50 50)`
			}, null, 8, vb)
		], 8, hb)), A.value ? (P(), l("span", {
			key: 0,
			class: "mc-progress__ring-label",
			style: k({ fontSize: `${Math.max(12, v.value * .18)}px` })
		}, H(s.value) + "% ", 5)) : c("", !0)], 6));
	}
}), [["__scopeId", "data-v-3b344055"]]), xb = {
	key: 0,
	class: "mc-prose__progress",
	"aria-hidden": "true"
}, Sb = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1 1\"/><path d=\"M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1-1\"/></svg>", Cb = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M9 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>", wb = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(null), r = L(0);
		function i(e) {
			return e.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		function o(e) {
			let t = e.cloneNode(!0);
			return t.querySelectorAll(".mc-prose__anchor").forEach((e) => e.remove()), (t.textContent ?? "").trim();
		}
		function s(e, t) {
			let n = t, r = 2;
			for (; e.querySelector(`[id="${n}"]`);) n = `${t}-${r}`, r += 1;
			return n;
		}
		function d() {
			let e = n.value;
			e && At && t.anchors && e.querySelectorAll("h2, h3").forEach((t) => {
				if (t.querySelector(".mc-prose__anchor")) return;
				t.id || (t.id = s(e, i(o(t)) || "section"));
				let n = document.createElement("button");
				n.type = "button", n.className = "mc-prose__anchor", n.setAttribute("aria-label", "复制标题链接"), n.title = "复制链接", n.innerHTML = Sb, n.addEventListener("click", () => {
					_(t.id, n);
				}), t.appendChild(n);
			});
		}
		function f() {
			let e = n.value;
			e && At && e.querySelectorAll("pre").forEach((e) => {
				if (e.querySelector(".mc-prose__copy")) return;
				let t = document.createElement("button");
				t.type = "button", t.className = "mc-prose__copy", t.setAttribute("aria-label", "复制代码"), t.title = "复制代码", t.innerHTML = Cb, t.addEventListener("click", () => {
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
			At && n.value && (y?.disconnect(), y = new MutationObserver(() => {
				b();
			}), y.observe(n.value, {
				childList: !0,
				subtree: !0
			}));
		}
		let S = null, C = 0;
		function w(e) {
			return e === window;
		}
		function T(e) {
			if (!At) return window;
			let t = e?.parentElement ?? null;
			for (; t;) {
				let e = getComputedStyle(t).overflowY;
				if ((e === "auto" || e === "scroll" || e === "overlay") && t.scrollHeight > t.clientHeight) return t;
				t = t.parentElement;
			}
			return window;
		}
		function E() {
			let e = n.value;
			if (!e || !At || !S) return;
			let t = S, i = w(t), a = i ? 0 : t.getBoundingClientRect().top, o = i ? window.innerHeight : t.clientHeight, s = i ? window.scrollY || document.documentElement.scrollTop || 0 : t.scrollTop, c = e.getBoundingClientRect(), l = c.top - a + s, u = l - o, d = l + c.height - o, f = Math.max(1, d - u);
			r.value = Pt((s - u) / f, 0, 1);
		}
		function O() {
			C || (C = requestAnimationFrame(() => {
				C = 0, E();
			}));
		}
		function j() {
			At && (M(), S = T(n.value), S.addEventListener("scroll", O, { passive: !0 }), window.addEventListener("resize", O), E());
		}
		function M() {
			At && (S && S.removeEventListener("scroll", O), window.removeEventListener("resize", O), C && (cancelAnimationFrame(C), C = 0));
		}
		ee(() => {
			b(), x(), t.progress && j();
		}), A(() => {
			M(), y?.disconnect(), y = null, m && clearTimeout(m), p = null;
		}), q(() => t.anchors, (e) => {
			e && b();
		}), q(() => t.progress, (e) => {
			e ? j() : M();
		});
		let N = a(() => ({ transform: `scaleX(${r.value})` })), F = a(() => Z("mc-prose", "mc-grain-overlay", `mc-prose--size-${t.size}`, `mc-prose--width-${t.width}`, `mc-prose--theme-${t.theme}`, {
			"mc-prose--drop-cap": t.dropCap,
			"mc-prose--anchors": t.anchors,
			"mc-prose--progress": t.progress,
			"mc-prose--serif": t.serif
		}, t.customClass));
		return (t, r) => (P(), l("div", {
			ref_key: "root",
			ref: n,
			class: D(F.value)
		}, [
			e.progress ? (P(), l("span", xb, [u("span", {
				class: "mc-prose__progress-bar",
				style: k(N.value)
			}, null, 4)])) : c("", !0),
			r[0] || (r[0] = u("span", {
				class: "mc-prose__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			z(t.$slots, "default", {}, void 0, !0)
		], 2));
	}
}), [["__scopeId", "data-v-d593119d"]]);
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/typeof.js
function Tb(e) {
	"@babel/helpers - typeof";
	return Tb = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, Tb(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPrimitive.js
function Eb(e, t) {
	if (Tb(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (Tb(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPropertyKey.js
function Db(e) {
	var t = Eb(e, "string");
	return Tb(t) == "symbol" ? t : t + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/defineProperty.js
function Ob(e, t, n) {
	return (t = Db(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
//#endregion
//#region src/components/qr-code/qr.ts
var kb = {
	L: 1,
	M: 0,
	Q: 3,
	H: 2
}, Ab = {
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
}, jb = {
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
function Mb(e, t) {
	let n = 0;
	for (let r = 7; r >= 0; r--) n = n << 1 ^ (n >>> 7) * 285, n ^= (t >>> r & 1) * e;
	return n & 255;
}
function Nb(e) {
	let t = Array(e).fill(0);
	t[e - 1] = 1;
	let n = 1;
	for (let r = 0; r < e; r++) {
		for (let e = 0; e < t.length; e++) t[e] = Mb(t[e], n), e + 1 < t.length && (t[e] ^= t[e + 1]);
		n = Mb(n, 2);
	}
	return t;
}
function Pb(e, t) {
	let n = t.map(() => 0);
	for (let r of e) {
		let e = r ^ n.shift();
		n.push(0);
		for (let r = 0; r < t.length; r++) n[r] ^= Mb(t[r], e);
	}
	return n;
}
function Fb(e) {
	let t = (16 * e + 128) * e + 64;
	if (e >= 2) {
		let n = Math.floor(e / 7) + 2;
		t -= (25 * n - 10) * n - 55, e >= 7 && (t -= 36);
	}
	return t;
}
function Ib(e, t) {
	return Math.floor(Fb(e) / 8) - Ab[t][e] * jb[t][e];
}
function Lb(e) {
	if (e === 1) return [];
	let t = Math.floor(e / 7) + 2, n = e === 32 ? 26 : Math.floor((e * 4 + t * 2 + 1) / (t * 2 - 2)) * 2, r = Array(t).fill(0);
	r[0] = 6;
	let i = e * 4 + 10;
	for (let e = r.length - 1; e >= 1; e--, i -= n) r[e] = i;
	return r;
}
function Rb(e) {
	let t = [];
	for (let n of e) {
		let e = n.codePointAt(0);
		e < 128 ? t.push(e) : e < 2048 ? t.push(192 | e >> 6, 128 | e & 63) : e < 65536 ? t.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : t.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63);
	}
	return t;
}
var zb = class {
	constructor() {
		Ob(this, "bits", []);
	}
	append(e, t) {
		for (let n = t - 1; n >= 0; n--) this.bits.push(e >>> n & 1);
	}
	get length() {
		return this.bits.length;
	}
};
function Bb(e, t, n) {
	let r = Rb(e), i = Ib(t, n) * 8, a = new zb();
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
function Vb(e, t, n) {
	let r = jb[n][t], i = Ab[n][t], a = Math.floor(Fb(t) / 8), o = r - a % r, s = Math.floor(a / r), c = Nb(i), l = [], u = 0;
	for (let t = 0; t < r; t++) {
		let n = s - i + (t < o ? 0 : 1), r = e.slice(u, u + n);
		u += n;
		let a = Pb(r, c), d = r.slice();
		t < o && d.push(0), l.push(d.concat(a));
	}
	let d = [];
	for (let e = 0; e < l[0].length; e++) for (let t = 0; t < l.length; t++) (e !== s - i || t >= o) && d.push(l[t][e]);
	return d;
}
var Hb = class {
	constructor(e) {
		Ob(this, "size", void 0), Ob(this, "modules", void 0), Ob(this, "isFunction", void 0), this.size = e, this.modules = Array.from({ length: e }, () => Array(e).fill(!1)), this.isFunction = Array.from({ length: e }, () => Array(e).fill(!1));
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
function Ub(e, t, n) {
	for (let r = -4; r <= 4; r++) for (let i = -4; i <= 4; i++) {
		let a = Math.max(Math.abs(i), Math.abs(r));
		e.setFunction(t + i, n + r, a !== 2 && a !== 4);
	}
}
function Wb(e, t, n) {
	for (let r = -2; r <= 2; r++) for (let i = -2; i <= 2; i++) e.setFunction(t + i, n + r, Math.max(Math.abs(i), Math.abs(r)) !== 1);
}
function Gb(e, t, n) {
	let r = kb[t] << 3 | n, i = r;
	for (let e = 0; e < 10; e++) i = i << 1 ^ (i >>> 9) * 1335;
	let a = (r << 10 | i) ^ 21522, o = (e) => !!(a >>> e & 1);
	for (let t = 0; t <= 5; t++) e.setFunction(8, t, o(t));
	e.setFunction(8, 7, o(6)), e.setFunction(8, 8, o(7)), e.setFunction(7, 8, o(8));
	for (let t = 9; t < 15; t++) e.setFunction(14 - t, 8, o(t));
	for (let t = 0; t < 8; t++) e.setFunction(e.size - 1 - t, 8, o(t));
	for (let t = 8; t < 15; t++) e.setFunction(8, e.size - 15 + t, o(t));
	e.setFunction(8, e.size - 8, !0);
}
function Kb(e, t) {
	if (t < 7) return;
	let n = t;
	for (let e = 0; e < 12; e++) n = n << 1 ^ (n >>> 11) * 7973;
	let r = t << 12 | n, i = (e) => !!(r >>> e & 1);
	for (let t = 0; t < 18; t++) {
		let n = i(t), r = e.size - 11 + t % 3, a = Math.floor(t / 3);
		e.setFunction(r, a, n), e.setFunction(a, r, n);
	}
}
function qb(e, t, n) {
	let r = e.size;
	for (let t = 0; t < r; t++) e.setFunction(6, t, t % 2 == 0), e.setFunction(t, 6, t % 2 == 0);
	Ub(e, 3, 3), Ub(e, r - 4, 3), Ub(e, 3, r - 4);
	let i = Lb(t), a = i.length;
	for (let t = 0; t < a; t++) for (let n = 0; n < a; n++) t === 0 && n === 0 || t === 0 && n === a - 1 || t === a - 1 && n === 0 || Wb(e, i[t], i[n]);
	Gb(e, n, 0), Kb(e, t);
}
function Jb(e, t) {
	let n = 0, r = e.size;
	for (let i = r - 1; i >= 1; i -= 2) {
		i === 6 && (i = 5);
		for (let a = 0; a < r; a++) for (let o = 0; o < 2; o++) {
			let s = i - o, c = i + 1 & 2 ? a : r - 1 - a;
			!e.isFunction[c][s] && n < t.length * 8 && (e.setData(s, c, !!(t[n >>> 3] >>> 7 - (n & 7) & 1)), n++);
		}
	}
}
function Yb(e, t) {
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
var Xb = 3, Zb = 3, Qb = 40, $b = 10;
function ex(e) {
	let t = e[1], n = t > 0 && e[2] === t && e[3] === t * 3 && e[4] === t && e[5] === t;
	return (n && e[0] >= t * 4 && e[6] >= t ? 1 : 0) + (n && e[6] >= t * 4 && e[0] >= t ? 1 : 0);
}
function tx(e, t, n, r) {
	let i = e, a = t;
	return i && (n.unshift(a), n.pop(), a = 0), a += r, n.unshift(a), n.pop(), ex(n);
}
function nx(e, t, n) {
	let r = e;
	t[0] === 0 && (r += n), t.unshift(r), t.pop();
}
function rx(e) {
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
			c === i ? (a++, a === 5 ? n += Xb : a > 5 && n++) : (nx(a, o, t), i || (n += ex(o) * Qb), i = c, a = 1);
		}
		n += tx(i, a, o, t) * Qb;
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
			c === i ? (a++, a === 5 ? n += Xb : a > 5 && n++) : (nx(a, o, t), i || (n += ex(o) * Qb), i = c, a = 1);
		}
		n += tx(i, a, o, t) * Qb;
	}
	for (let r = 0; r < t - 1; r++) for (let i = 0; i < t - 1; i++) {
		let t = e.get(i, r);
		t === e.get(i + 1, r) && t === e.get(i, r + 1) && t === e.get(i + 1, r + 1) && (n += Zb);
	}
	let r = 0;
	for (let n = 0; n < t; n++) for (let i = 0; i < t; i++) e.get(i, n) && r++;
	let i = t * t, a = Math.ceil(Math.abs(r * 20 - i * 10) / i) - 1;
	return n += a * $b, n;
}
function ix(e, t) {
	let n = Rb(e).length;
	for (let e = 1; e <= 10; e++) {
		let r = Ib(e, t);
		if (Math.ceil((4 + (e <= 9 ? 8 : 16) + n * 8) / 8) <= r) return e;
	}
	throw Error(`[mochi-ui] QRCode: payload is too large — versions 1-10 hold at most ${Ib(10, t) - 3} bytes at level ${t}.`);
}
function ax(e, t = "M") {
	let n = e ?? "", r = ix(n, t), i = r * 4 + 17, a = Vb(Bb(n, r, t), r, t), o = 0, s = Infinity;
	for (let e = 0; e < 8; e++) {
		let n = new Hb(i);
		qb(n, r, t), Jb(n, a), Gb(n, t, e), Yb(n, e);
		let c = rx(n);
		c < s && (s = c, o = e);
	}
	let c = new Hb(i);
	return qb(c, r, t), Jb(c, a), Gb(c, t, o), Yb(c, o), {
		size: i,
		modules: c.modules,
		version: r,
		ecc: t,
		mask: o
	};
}
function ox(e) {
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
var sx = ["aria-label"], cx = ["viewBox"], lx = [
	"width",
	"height",
	"fill"
], ux = ["transform"], dx = ["d", "fill"], fx = { key: 0 }, px = ["fill"], mx = ["href"], hx = {
	key: 1,
	class: "mc-qr-code__error"
}, gx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => {
			try {
				return {
					qr: ax(t.value ?? "", t.level),
					error: null
				};
			} catch (e) {
				return {
					qr: null,
					error: e instanceof Error ? e.message : "Unable to encode QR code"
				};
			}
		}), r = a(() => n.value.qr ? ox(n.value.qr) : ""), i = a(() => n.value.qr ? n.value.qr.size + t.margin * 2 : 0), o = a(() => Math.max(0, i.value * .2)), s = a(() => {
			if (!n.value.qr) return {};
			let e = o.value, t = (i.value - e) / 2;
			return {
				x: `${t}`,
				y: `${t}`,
				width: `${e}`,
				height: `${e}`
			};
		}), d = a(() => {
			if (!n.value.qr) return {};
			let e = o.value * 1.24, t = (i.value - e) / 2;
			return {
				x: `${t}`,
				y: `${t}`,
				width: `${e}`,
				height: `${e}`,
				rx: `${e * .18}`
			};
		}), f = a(() => t.backgroundColor === "transparent" ? "var(--mc-surface)" : t.backgroundColor), p = a(() => Z("mc-qr-code", { "is-error": !!n.value.error }, t.customClass));
		return (t, a) => (P(), l("div", {
			class: D(p.value),
			style: k({
				width: `${e.size}px`,
				height: `${e.size}px`
			}),
			role: "img",
			"aria-label": n.value.error ? n.value.error : e.label || e.value || "QR code"
		}, [a[0] || (a[0] = u("span", {
			class: "mc-qr-code__halo",
			"aria-hidden": "true"
		}, null, -1)), u("span", {
			class: "mc-qr-code__plate mc-sheen-sweep",
			style: k({ "--mc-plate-bg": f.value })
		}, [n.value.qr ? (P(), l("svg", {
			key: 0,
			class: "mc-qr-code__svg",
			viewBox: `0 0 ${i.value} ${i.value}`,
			width: "100%",
			height: "100%",
			focusable: "false"
		}, [
			u("rect", {
				class: "mc-qr-code__bg",
				x: "0",
				y: "0",
				width: i.value,
				height: i.value,
				fill: e.backgroundColor
			}, null, 8, lx),
			u("g", { transform: `translate(${e.margin}, ${e.margin})` }, [u("path", {
				d: r.value,
				fill: e.color
			}, null, 8, dx)], 8, ux),
			e.logo ? (P(), l("g", fx, [u("rect", {
				style: k(d.value),
				fill: f.value
			}, null, 12, px), u("image", {
				href: e.logo,
				style: k(s.value),
				preserveAspectRatio: "xMidYMid meet"
			}, null, 12, mx)])) : c("", !0)
		], 8, cx)) : (P(), l("span", hx, H(n.value.error), 1))], 4)], 14, sx));
	}
}), [["__scopeId", "data-v-c9d61e2a"]]), _x = Symbol("mochi-radio-group"), vx = [
	"name",
	"value",
	"checked",
	"disabled",
	"aria-checked",
	"aria-disabled"
], yx = {
	key: 0,
	class: "mc-radio__label"
}, bx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = t, i = G(), o = a(() => {
			let { class: e, style: t, ...n } = i;
			return n;
		}), s = b(_x, null), d = L(!1), f = a(() => s ? s.modelValue.value === n.value : d.value), m = a(() => n.disabled || (s ? s.disabled.value : !1)), h = a(() => n.size ?? s?.size.value ?? "medium"), g = a(() => n.name ?? s?.name ?? "mc-radio");
		function _() {
			m.value || (s ? s.select(n.value) : (d.value = !0, r("update:modelValue", n.value), r("change", n.value)));
		}
		let v = a(() => Z("mc-radio", `mc-radio--${h.value}`, {
			"is-checked": f.value,
			"is-disabled": m.value
		})), y = a(() => Z(v.value, i.class, n.customClass)), x = a(() => i.style);
		return (t, n) => (P(), l("label", {
			class: D(y.value),
			style: k(x.value)
		}, [
			u("input", T(o.value, {
				class: "mc-radio__input mc-visually-hidden",
				type: "radio",
				role: "radio",
				name: g.value,
				value: e.value,
				checked: f.value,
				disabled: m.value,
				"aria-checked": f.value,
				"aria-disabled": m.value || void 0,
				onChange: _
			}), null, 16, vx),
			n[0] || (n[0] = u("span", {
				class: "mc-radio__circle mc-sheen-sweep mc-recipe-well-deep",
				"aria-hidden": "true"
			}, [u("span", { class: "mc-radio__grain mc-grain-overlay" }), u("span", { class: "mc-radio__dot" })], -1)),
			n[1] || (n[1] = u("span", {
				class: "mc-radio__halo",
				"aria-hidden": "true"
			}, null, -1)),
			e.label || t.$slots.default ? (P(), l("span", yx, [z(t.$slots, "default", {}, () => [p(H(e.label), 1)], !0)])) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-8a7714bd"]]), xx = ["aria-orientation", "aria-disabled"], Sx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiRadioGroup",
	inheritAttrs: !1,
	__name: "RadioGroup",
	props: /*@__PURE__*/ w({
		options: { default: () => [] },
		direction: { default: "horizontal" },
		size: { default: "medium" },
		disabled: {
			type: Boolean,
			default: !1
		},
		name: {},
		customClass: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), c = G(), d = L(null), f = L(o.value);
		q(o, (e) => {
			f.value = e;
		});
		let p = a(() => r.size), m = a(() => r.disabled), h = r.name ?? `mc-radio-${Ln("group")}`;
		function g(e) {
			f.value !== e && (f.value = e, o.value = e, i("change", e));
		}
		function _(e) {
			if (r.disabled) return;
			let t = e.key === "ArrowRight" || e.key === "ArrowDown", n = e.key === "ArrowLeft" || e.key === "ArrowUp";
			if (!t && !n) return;
			let i = Array.from(d.value?.querySelectorAll("input[type=\"radio\"]") ?? []).filter((e) => e.name === h), a = i.find((e) => e === document.activeElement);
			if (!a) return;
			e.preventDefault();
			let o = i[(i.indexOf(a) + (t ? 1 : -1) + i.length) % i.length];
			o && !o.disabled && (o.focus(), o.click());
		}
		F(_x, {
			modelValue: f,
			size: p,
			disabled: m,
			name: h,
			select: g
		});
		let v = a(() => Z("mc-radio-group", "mc-recipe-well", `mc-radio-group--${r.direction}`, `mc-radio-group--${r.size}`, { "is-disabled": r.disabled })), y = a(() => Z(v.value, c.class, r.customClass)), b = a(() => c.style);
		return (n, r) => (P(), l("div", {
			ref_key: "root",
			ref: d,
			class: D(y.value),
			style: k(b.value),
			role: "radiogroup",
			"aria-orientation": e.direction,
			"aria-disabled": e.disabled || void 0,
			onKeydown: _
		}, [
			r[0] || (r[0] = u("span", {
				class: "mc-radio-group__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-radio-group__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			z(n.$slots, "default", {}, () => [(P(!0), l(t, null, R(e.options, (e, t) => (P(), s(bx, {
				key: `${String(e.value)}-${t}`,
				value: e.value,
				label: e.label,
				disabled: e.disabled
			}, null, 8, [
				"value",
				"label",
				"disabled"
			]))), 128))], !0)
		], 46, xx));
	}
}), [["__scopeId", "data-v-694977cb"]]), Cx = ["aria-disabled"], wx = {
	class: "mc-rate__glyphs",
	"aria-hidden": "true"
}, Tx = {
	viewBox: "0 0 24 24",
	class: "mc-rate__glyph mc-rate__glyph--empty"
}, Ex = ["d"], Dx = ["d"], Ox = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], kx = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], Ax = [
	"aria-checked",
	"aria-label",
	"aria-disabled",
	"data-value",
	"tabindex",
	"disabled",
	"onClick",
	"onMouseenter"
], jx = "m12 3.6 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.8l5.9-.9Z", Mx = "M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z", Nx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiRate",
	inheritAttrs: !1,
	__name: "Rate",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = G(), d = L(null), f = L(null), p = L(!1), m = L(o.value > 0 ? o.value : 1), h, g = a(() => f.value ?? o.value ?? 0), _ = a(() => r.variant === "heart" ? Mx : jx);
		q(() => o.value, (e) => {
			p.value = !1, h && clearTimeout(h), h = setTimeout(() => {
				p.value = !0, h = setTimeout(() => {
					p.value = !1;
				}, 420);
			}, 20), e > 0 && (m.value = e);
		}), A(() => {
			h && clearTimeout(h);
		});
		function v(e) {
			let t = g.value;
			return t >= e ? "full" : r.allowHalf && t >= e - .5 ? "half" : "empty";
		}
		function y(e) {
			return e === "half" ? { clipPath: "inset(0 50% 0 0)" } : {};
		}
		function b(e) {
			r.readonly || (m.value = e, o.value = e, i("change", e));
		}
		function x(e) {
			r.readonly || (f.value = e);
		}
		function S() {
			f.value = null;
		}
		function C(e) {
			return !r.readonly && e === m.value;
		}
		function w(e) {
			if (r.readonly) return;
			let t = r.allowHalf ? .5 : 1, n;
			if (e.key === "ArrowRight" || e.key === "ArrowUp") n = (o.value ?? 0) + t;
			else if (e.key === "ArrowLeft" || e.key === "ArrowDown") n = (o.value ?? 0) - t;
			else if (e.key === "Home") n = r.allowHalf ? .5 : 1;
			else if (e.key === "End") n = r.max;
			else return;
			e.preventDefault();
			let i = Math.min(Math.max(n, 0), r.max);
			m.value = i, i !== (o.value ?? 0) && b(i), d.value?.querySelector(`[data-value="${i}"]`)?.focus();
		}
		let T = a(() => Z("mc-rate", "mc-recipe-well", `mc-rate--${r.size}`, `mc-rate--${r.color}`, `mc-rate--${r.variant}`, {
			"is-readonly": r.readonly,
			"is-pulse": p.value,
			"is-half": r.allowHalf
		})), E = a(() => Z(T.value, s.class, r.customClass)), O = a(() => s.style);
		return (n, r) => (P(), l("div", {
			ref_key: "root",
			ref: d,
			class: D(E.value),
			style: k(O.value),
			role: "radiogroup",
			"aria-orientation": "horizontal",
			"aria-disabled": e.readonly || void 0,
			onMouseleave: S,
			onKeydown: w
		}, [
			r[0] || (r[0] = u("span", {
				class: "mc-rate__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-rate__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			(P(!0), l(t, null, R(e.max, (n) => (P(), l("span", {
				key: n,
				class: D(["mc-rate__item", {
					"is-full": v(n) === "full",
					"is-half": v(n) === "half",
					"is-active": v(n) !== "empty"
				}])
			}, [u("span", wx, [(P(), l("svg", Tx, [u("path", { d: _.value }, null, 8, Ex)])), v(n) === "empty" ? c("", !0) : (P(), l("svg", {
				key: 0,
				viewBox: "0 0 24 24",
				class: "mc-rate__glyph mc-rate__glyph--fill",
				style: k(y(v(n)))
			}, [u("path", { d: _.value }, null, 8, Dx)], 4))]), e.allowHalf ? (P(), l(t, { key: 0 }, [u("button", {
				type: "button",
				class: "mc-rate__hit is-left",
				role: "radio",
				"aria-checked": e.modelValue === n - .5,
				"aria-label": `${n - .5}`,
				"aria-disabled": e.readonly || void 0,
				"data-value": n - .5,
				tabindex: C(n - .5) ? 0 : -1,
				disabled: e.readonly,
				onClick: (e) => b(n - .5),
				onMouseenter: (e) => x(n - .5)
			}, null, 40, Ox), u("button", {
				type: "button",
				class: "mc-rate__hit is-right",
				role: "radio",
				"aria-checked": e.modelValue === n,
				"aria-label": `${n}`,
				"aria-disabled": e.readonly || void 0,
				"data-value": n,
				tabindex: C(n) ? 0 : -1,
				disabled: e.readonly,
				onClick: (e) => b(n),
				onMouseenter: (e) => x(n)
			}, null, 40, kx)], 64)) : (P(), l("button", {
				key: 1,
				type: "button",
				class: "mc-rate__hit",
				role: "radio",
				"aria-checked": e.modelValue === n,
				"aria-label": `${n}`,
				"aria-disabled": e.readonly || void 0,
				"data-value": n,
				tabindex: C(n) ? 0 : -1,
				disabled: e.readonly,
				onClick: (e) => b(n),
				onMouseenter: (e) => x(n)
			}, null, 40, Ax))], 2))), 128))
		], 46, Cx));
	}
}), [["__scopeId", "data-v-f5fe38b5"]]), Px = ["aria-live"], Fx = {
	class: "mc-result__emblem",
	"aria-hidden": "true"
}, Ix = { class: "mc-result__disc" }, Lx = {
	key: 0,
	class: "mc-result__code",
	"data-mc-type": "readout"
}, Rx = {
	key: 0,
	class: "mc-result__title",
	"data-mc-type": "title"
}, zx = {
	key: 1,
	class: "mc-result__subtitle"
}, Bx = {
	key: 2,
	class: "mc-result__extra"
}, Vx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		}, r = a(() => t.status === "404" || t.status === "403" || t.status === "500"), i = a(() => t.icon ?? n[t.status]), o = a(() => Z("mc-result", "mc-grain-overlay", "mc-recipe-sheet", `mc-result--${t.status}`, t.customClass));
		return (t, n) => (P(), l("section", {
			class: D(o.value),
			role: "status",
			"aria-live": e.live
		}, [
			u("div", Fx, [
				n[0] || (n[0] = u("span", { class: "mc-result__halo" }, null, -1)),
				n[1] || (n[1] = u("span", { class: "mc-result__lens" }, null, -1)),
				u("span", Ix, [r.value ? (P(), l("span", Lx, H(e.status), 1)) : (P(), s($, {
					key: 1,
					name: i.value,
					size: 46,
					"stroke-width": 1.6
				}, null, 8, ["name"]))])
			]),
			e.title || t.$slots.title ? (P(), l("h2", Rx, [z(t.$slots, "title", {}, () => [p(H(e.title), 1)], !0)])) : c("", !0),
			e.subtitle || t.$slots.subtitle ? (P(), l("p", zx, [z(t.$slots, "subtitle", {}, () => [p(H(e.subtitle), 1)], !0)])) : c("", !0),
			t.$slots.extra ? (P(), l("div", Bx, [z(t.$slots, "extra", {}, void 0, !0)])) : c("", !0)
		], 10, Px));
	}
}), [["__scopeId", "data-v-0c4b91ac"]]), Hx = ["aria-label"], Ux = ["disabled", "aria-label"], Wx = [
	"aria-label",
	"aria-valuemax",
	"aria-valuenow"
], Gx = ["disabled", "aria-label"], Kx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = rn(), r = L(null), i = L(null), o = L(null), s = L(null), c = L(!1), d = L(0), f = L(0), p = L(0), h = L(0), g = L(!1);
		function _(e) {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}
		function v() {
			let e = r.value;
			e && (d.value = e.scrollTop, f.value = e.clientHeight, p.value = e.scrollHeight, h.value = s.value?.clientHeight ?? 0);
		}
		function y() {
			d.value = r.value?.scrollTop ?? 0;
		}
		let b = a(() => !p.value || !f.value ? 0 : Math.min(1, f.value / p.value)), x = a(() => h.value > 0 ? h.value : f.value), S = a(() => {
			let e = Math.max(t.minSize, Math.round(f.value * b.value));
			return Math.min(e, Math.max(0, x.value));
		}), C = a(() => {
			let e = Math.max(0, x.value - S.value), t = Math.max(1, p.value - f.value), n = d.value / t * e;
			return {
				height: `${S.value}px`,
				transform: `translateY(${n}px)`
			};
		}), w = a(() => p.value > f.value + 1);
		function T(e) {
			let t = r.value;
			t && t.scrollBy({
				top: e,
				behavior: "smooth"
			});
		}
		let E = 0, O = 0;
		function j(e) {
			let t = r.value;
			if (t) {
				e.preventDefault(), e.stopPropagation(), g.value = !0, E = e.clientY, O = t.scrollTop;
				try {
					e.currentTarget.setPointerCapture?.(e.pointerId);
				} catch {}
				window.addEventListener("pointermove", M), window.addEventListener("pointerup", N);
			}
		}
		function M(e) {
			let t = r.value;
			if (!t || !g.value) return;
			let n = Math.max(0, x.value - S.value), i = Math.max(1, p.value - f.value);
			if (!n) return;
			let a = (e.clientY - E) / n * i;
			t.scrollTop = O + a;
		}
		function N() {
			g.value = !1, window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", N);
		}
		function F(e) {
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
				top: p.value,
				behavior: "smooth"
			})));
		}
		let I = null;
		ee(() => {
			if (v(), typeof ResizeObserver < "u" && r.value) {
				I = new ResizeObserver(() => v()), I.observe(r.value);
				let e = r.value.firstElementChild;
				e && I.observe(e);
			}
		}), A(() => {
			I?.disconnect(), I = null, At && (window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", N));
		});
		let R = a(() => ({
			height: _(t.height),
			maxHeight: _(t.maxHeight)
		})), B = a(() => Z("mc-scrollbar", {
			"is-hovered": c.value,
			"is-dragging": g.value,
			"has-overflow": w.value
		}, t.customClass));
		return (t, a) => (P(), l("div", {
			class: D(B.value),
			style: k(R.value),
			onMouseenter: a[2] || (a[2] = (e) => c.value = !0),
			onMouseleave: a[3] || (a[3] = (e) => c.value = !1)
		}, [u("div", {
			ref_key: "viewport",
			ref: r,
			class: "mc-scrollbar__viewport",
			tabindex: "0",
			role: "region",
			"aria-label": e.label,
			onScroll: y
		}, [z(t.$slots, "default", {}, void 0, !0)], 40, Hx), u("div", {
			ref_key: "track",
			ref: i,
			class: "mc-scrollbar__track mc-recipe-well",
			style: k({ width: `${e.size}px` })
		}, [
			u("button", {
				type: "button",
				class: "mc-scrollbar__arrow mc-scrollbar__arrow--up mc-sheen-sweep",
				tabindex: "-1",
				disabled: !w.value || d.value <= 0,
				"aria-label": W(n).scrollbar?.up ?? "Scroll up",
				onClick: a[0] || (a[0] = (t) => T(-e.step))
			}, [m($, {
				name: "chevron-up",
				size: 12,
				"stroke-width": 2.4
			})], 8, Ux),
			u("div", {
				ref_key: "thumbArea",
				ref: s,
				class: "mc-scrollbar__thumb-area"
			}, [u("div", {
				ref_key: "thumb",
				ref: o,
				class: "mc-scrollbar__thumb",
				role: "slider",
				tabindex: "0",
				"aria-label": W(n).scrollbar?.position ?? "Scroll position",
				"aria-orientation": "vertical",
				"aria-valuemin": 0,
				"aria-valuemax": Math.max(0, p.value - f.value),
				"aria-valuenow": Math.round(d.value),
				style: k(C.value),
				onPointerdown: j,
				onKeydown: F
			}, [...a[4] || (a[4] = [u("span", {
				class: "mc-scrollbar__thumb-fill mc-aurora-inset",
				"aria-hidden": "true"
			}, null, -1)])], 44, Wx)], 512),
			u("button", {
				type: "button",
				class: "mc-scrollbar__arrow mc-scrollbar__arrow--down mc-sheen-sweep",
				tabindex: "-1",
				disabled: !w.value || d.value >= p.value - f.value,
				"aria-label": W(n).scrollbar?.down ?? "Scroll down",
				onClick: a[1] || (a[1] = (t) => T(e.step))
			}, [m($, {
				name: "chevron-down",
				size: 12,
				"stroke-width": 2.4
			})], 8, Gx)
		], 4)], 38));
	}
}), [["__scopeId", "data-v-6a9eeacd"]]), qx = [
	"role",
	"aria-multiselectable",
	"aria-orientation",
	"aria-disabled"
], Jx = [
	"role",
	"aria-label",
	"aria-checked",
	"aria-disabled",
	"disabled",
	"tabindex",
	"onClick",
	"onFocus"
], Yx = { class: "mc-segmented__content" }, Xx = { class: "mc-segmented__label" }, Zx = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSegmented",
	__name: "Segmented",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue");
		q(() => r.options, (e) => {
			for (let t of e ?? []) t.label?.trim() || t.ariaLabel?.trim() || Ad(`segmented:${String(t.value)}`, `Segmented: option "${String(t.value)}" has neither \`label\` nor \`ariaLabel\`, so it is an unnamed ${r.multiple ? "checkbox" : "radio"} in the accessibility tree. Pass \`ariaLabel\` for icon-only segments.`);
		}, { immediate: !0 });
		let d = L(null), f = [];
		function p(e, t) {
			f[e] = jt(t) ? t : null;
		}
		let m = L(o.value);
		q(() => o.value, (e) => {
			m.value = e;
		});
		let h = a(() => {
			let e = m.value;
			return e == null ? [] : r.multiple ? Array.isArray(e) ? e.slice() : [e] : Array.isArray(e) ? e.slice(0, 1) : [e];
		});
		function g(e) {
			return h.value.indexOf(e) !== -1;
		}
		function _(e) {
			return r.disabled || !!e.disabled;
		}
		let v = L(0);
		function y(e) {
			v.value = e;
		}
		function b(e, t) {
			if (!_(e)) {
				if (v.value = t, r.multiple) {
					let t = g(e.value) ? h.value.filter((t) => t !== e.value) : [...h.value, e.value];
					m.value = t, o.value = t, i("change", t);
				} else g(e.value) || (m.value = e.value, o.value = e.value, i("change", e.value));
			}
		}
		function x(e, t) {
			let n = r.options, i = n.length;
			for (let r = 1; r <= i; r++) {
				let a = ((e + t * r) % i + i) % i, o = n[a];
				if (o && !_(o)) return a;
			}
			return -1;
		}
		function S(e) {
			let t = f[e];
			t && t.focus();
		}
		function C(e) {
			if (r.disabled) return;
			let t = r.options;
			if (!t.length) return;
			let n = e.key === "ArrowRight" || e.key === "ArrowDown", i = e.key === "ArrowLeft" || e.key === "ArrowUp";
			if (!n && !i && e.key !== "Home" && e.key !== "End") return;
			e.preventDefault();
			let a = -1;
			if (a = n ? x(v.value, 1) : i ? x(v.value, -1) : e.key === "Home" ? x(-1, 1) : x(t.length, -1), !(a < 0) && (v.value = a, S(a), !r.multiple)) {
				let e = t[a];
				e && !g(e.value) && b(e, a);
			}
		}
		let w = a(() => {
			let e = r.options;
			if (!r.multiple) {
				let t = e.findIndex((e) => g(e.value));
				return t >= 0 ? [{
					key: "single",
					index: t
				}] : [];
			}
			return e.map((e, t) => ({
				option: e,
				index: t
			})).filter(({ option: e }) => g(e.value)).map(({ option: e, index: t }) => ({
				key: `multi-${String(e.value)}-${t}`,
				index: t
			}));
		}), T = L({}), O = L(!1), j = 0;
		function M() {
			let e = {};
			for (let t of w.value) {
				let n = f[t.index];
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
			let t = T.value, n = Object.keys(e).filter((n) => {
				let r = t[n], i = e[n];
				return !!r && !!i && r.ready && i.ready && Math.abs(r.width - i.width) > .5;
			});
			if (!n.length) {
				j && (cancelAnimationFrame(j), j = 0), O.value = !1, T.value = e;
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
			T.value = r, O.value = !0, E(() => {
				d.value?.offsetWidth, j = requestAnimationFrame(() => {
					j = 0, O.value = !1, T.value = e;
				});
			});
		}
		function N(e) {
			let t = T.value[e.key];
			return !t || !t.ready ? { opacity: 0 } : {
				width: `${t.width}px`,
				height: `${t.height}px`,
				transform: `translate(${t.left}px, ${t.top}px) scaleX(${t.scale})`
			};
		}
		let F = null;
		function I() {
			E(M);
		}
		ee(() => {
			E(M), At && (window.addEventListener("resize", I), d.value && typeof ResizeObserver < "u" && (F = new ResizeObserver(() => E(M)), F.observe(d.value)));
		}), A(() => {
			At && window.removeEventListener("resize", I), F?.disconnect(), F = null, j && (cancelAnimationFrame(j), j = 0);
		}), q(() => r.options, () => {
			let e = r.options;
			if (!e.length) {
				v.value = 0;
				return;
			}
			let t = e.findIndex((e) => g(e.value));
			r.multiple ? (v.value < 0 || v.value >= e.length) && (v.value = t >= 0 ? t : 0) : v.value = t >= 0 ? t : 0;
		}, {
			immediate: !0,
			deep: !0
		}), q(m, () => {
			if (!r.multiple) {
				let e = r.options.findIndex((e) => g(e.value));
				e >= 0 && (v.value = e);
			}
			E(M);
		}, { deep: !0 }), q([() => r.size, () => r.variant], () => E(M));
		let z = a(() => Z("mc-segmented", `mc-segmented--${r.size}`, `mc-segmented--${r.variant}`, `mc-segmented--${r.color}`, {
			"is-multiple": r.multiple,
			"is-block": r.block,
			"is-disabled": r.disabled,
			"is-snapping": O.value
		}, r.customClass));
		return (n, r) => (P(), l("div", { class: D(z.value) }, [u("div", {
			ref_key: "track",
			ref: d,
			class: D(["mc-segmented__track", { "mc-recipe-well": e.variant === "well" }]),
			role: e.multiple ? "group" : "radiogroup",
			"aria-multiselectable": e.multiple ? "true" : void 0,
			"aria-orientation": e.multiple ? void 0 : "horizontal",
			"aria-disabled": e.disabled || void 0,
			onKeydown: C
		}, [
			r[0] || (r[0] = u("span", {
				class: "mc-segmented__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			r[1] || (r[1] = u("span", {
				class: "mc-segmented__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			r[2] || (r[2] = u("span", {
				class: "mc-segmented__sheen",
				"aria-hidden": "true"
			}, null, -1)),
			(P(!0), l(t, null, R(w.value, (e) => (P(), l("span", {
				key: e.key,
				class: "mc-segmented__indicator",
				style: k(N(e)),
				"aria-hidden": "true"
			}, null, 4))), 128)),
			(P(!0), l(t, null, R(e.options, (t, n) => (P(), l("button", {
				key: `${String(t.value)}-${n}`,
				ref_for: !0,
				ref: (e) => p(n, e),
				type: "button",
				class: D(["mc-segmented__item", {
					"is-selected": g(t.value),
					"is-disabled": _(t)
				}]),
				role: e.multiple ? "checkbox" : "radio",
				"aria-label": t.ariaLabel,
				"aria-checked": g(t.value) ? "true" : "false",
				"aria-disabled": _(t) ? "true" : void 0,
				disabled: _(t),
				tabindex: n === v.value ? 0 : -1,
				onClick: (e) => b(t, n),
				onFocus: (e) => y(n)
			}, [u("span", Yx, [t.icon ? (P(), s($, {
				key: 0,
				name: t.icon,
				size: 16,
				class: "mc-segmented__icon"
			}, null, 8, ["name"])) : c("", !0), u("span", Xx, H(t.label), 1)])], 42, Jx))), 128))
		], 42, qx)], 2));
	}
}), [["__scopeId", "data-v-f57ed123"]]), Qx = Symbol("mc-select-create");
function $x(e) {
	let t = e.description ?? e.desc ?? e.subText;
	return typeof t == "string" && t.trim() ? t : "";
}
function eS(e) {
	let { sourceOptions: t, groups: n, grouped: r } = e, i = [], a = (e, t) => {
		let n = $x(e);
		if (t === 0 && e.children && e.children.length) {
			i.push({
				kind: "group",
				label: e.label,
				value: e.value,
				disabled: !0,
				depth: 0,
				raw: e,
				description: n
			});
			for (let t of e.children) a(t, 1);
		} else i.push({
			kind: "option",
			label: e.label,
			value: e.value,
			disabled: e.disabled,
			depth: t,
			raw: e,
			description: n
		});
	};
	if (n.length) {
		for (let e of n) {
			i.push({
				kind: "section",
				label: e.label,
				value: e.label,
				disabled: !0,
				depth: 0
			});
			for (let t of e.options) a(t, 0);
		}
		return i;
	}
	if (r) {
		let e = /* @__PURE__ */ new Map();
		for (let n of t) {
			let t = typeof n.group == "string" ? n.group : "", r = e.get(t);
			r ? r.push(n) : e.set(t, [n]);
		}
		for (let [t, n] of e) {
			t && i.push({
				kind: "section",
				label: t,
				value: t,
				disabled: !0,
				depth: 0
			});
			for (let e of n) a(e, 0);
		}
		return i;
	}
	for (let e of t) a(e, 0);
	return i;
}
function tS(e, t, n) {
	let r = t.trim().toLowerCase();
	if (!r || n) return e;
	let i = [], a, o, s = !1, c = !1;
	for (let t of e) t.kind === "section" ? (a = t, o = void 0, s = !1, c = !1) : t.kind === "group" ? (o = t, c = !1) : String(t.label).toLowerCase().includes(r) && (a && !s && (i.push(a), s = !0), o && !c && (i.push(o), c = !0), i.push(t));
	return i;
}
function nS(e, t, n) {
	if (!e) return !1;
	let r = t.trim().toLowerCase();
	return r ? !n.some((e) => e.kind === "option" && String(e.label).toLowerCase().includes(r)) : !1;
}
function rS(e, t, n) {
	return n ? [{
		kind: "create",
		label: t.trim(),
		value: Qx,
		depth: 0
	}, ...e] : e;
}
function iS(e) {
	let t = [], n;
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
}
function aS(e) {
	let { total: t, rowHeight: n, overscan: r, scrollTop: i, viewportHeight: a } = e, o = Math.max(0, Math.floor(i / n) - r), s = Math.ceil((i + Math.max(a, n)) / n) + 1, c = Math.min(t, o + s + r);
	return {
		start: o,
		end: c,
		top: o * n,
		bottom: (t - c) * n,
		total: t
	};
}
function oS(e) {
	return e.length ? e.every((e) => e.kind === "option" && !e.description) : !1;
}
function sS(e, t) {
	if (!t) return e;
	let n = e[0];
	return n ? [{
		...n,
		items: n.items.slice(t.start, t.end)
	}] : e;
}
function cS(e, t) {
	return t ? Array.isArray(e) ? [...e] : [] : e == null ? [] : [e];
}
function lS(e, t, n) {
	let r = t;
	return !r || r <= 0 || e.length <= r ? e.map((e) => ({
		value: e,
		label: n(e)
	})) : [...e.slice(0, r).map((e) => ({
		value: e,
		label: n(e)
	})), {
		value: "__mochi_rest__",
		label: `+${e.length - r}`,
		rest: !0
	}];
}
function uS(e) {
	for (let t = 0; t < e.length; t++) if (e[t].kind === "option" && !e[t].disabled) return t;
	return -1;
}
function dS(e, t, n) {
	if (!e.length) return -1;
	let r = t;
	for (let t = 0; t < e.length; t++) {
		r = (r + n + e.length) % e.length;
		let t = e[r];
		if (t.kind === "option" && !t.disabled) return r;
	}
	return -1;
}
//#endregion
//#region src/components/select/useSelect.ts
var fS = 250, pS = 4e3;
function mS(e, t, n) {
	let r = G(), i = rn(), o = Hn(), s = a(() => e.placeholder || i.value.select.placeholder), c = a(() => i.value.select.noMatch), l = L(!1), u = Ln("mc-select"), d = jn({ active: l }), f = a(() => e.open ?? l.value), { isTop: p } = Pn({ active: f });
	function m(e) {
		f.value !== e && (l.value = e, t("update:open", e), t(e ? "open" : "close"));
	}
	let h = L(null), g = L(!1), _, v, y = 0, b = 0, x = !1, S = a(() => e.remote && h.value ? h.value : e.options ?? []), C = a(() => eS({
		sourceOptions: S.value,
		groups: e.groups ?? [],
		grouped: e.grouped ?? !1
	})), w = L(""), T = a(() => tS(C.value, w.value, e.remote ?? !1)), D = a(() => nS(e.allowCreate ?? !1, w.value, C.value)), O = a(() => rS(T.value, w.value, D.value)), k = a(() => iS(O.value)), j = a(() => (e.remote ?? !1) && (e.remoteShowLoading ?? !0) && g.value), M = a(() => {
		let t = e.virtual;
		return t === !1 ? "never" : t === !0 || typeof t == "object" && t ? "always" : "auto";
	}), N = a(() => {
		if (M.value === "never") return null;
		let t = e.virtual;
		return typeof t == "object" && t ? t : {};
	}), P = a(() => M.value === "never" || !oS(O.value) ? !1 : M.value === "always" || O.value.length >= 200), F = L(0), I = a(() => {
		let e = N.value?.rowHeight;
		return e ? Math.max(20, e) : F.value || 40;
	}), R = a(() => Math.max(0, N.value?.overscan ?? 6)), z = L(0), B = L(0), V = a(() => P.value ? aS({
		total: O.value.length,
		rowHeight: I.value,
		overscan: R.value,
		scrollTop: z.value,
		viewportHeight: B.value
	}) : null), H = a(() => sS(k.value, V.value));
	function U() {
		let e = ce.value;
		e && (z.value = e.scrollTop);
	}
	function W() {
		let e = ce.value;
		if (e && (B.value = e.clientHeight, z.value = e.scrollTop, P.value && !N.value?.rowHeight)) {
			let t = e.querySelector("[data-index]")?.offsetHeight ?? 0;
			t && (F.value = t);
		}
	}
	function K() {
		_ !== void 0 && (clearTimeout(_), _ = void 0), v !== void 0 && (clearTimeout(v), v = void 0);
	}
	async function te(n, r) {
		let i = b;
		g.value = !0, t("remote-method", n);
		let a = e.remoteMethod;
		if (typeof a != "function") v = setTimeout(() => {
			v = void 0, r === y && (g.value = !1);
		}, pS);
		else {
			x = !0;
			try {
				let e = await a(n);
				if (r !== y) return;
				Array.isArray(e) && i === b && (h.value = e);
			} catch {} finally {
				r === y && (x = !1, g.value = !1);
			}
		}
	}
	q(w, (t) => {
		y += 1, K(), x = !1;
		let n = t.trim();
		if (!n || !e.remote) {
			g.value = !1, h.value = null;
			return;
		}
		g.value = !0;
		let r = y;
		_ = setTimeout(() => {
			_ = void 0, te(n, r);
		}, fS);
	}), q(() => e.options, () => {
		b += 1, v !== void 0 && (clearTimeout(v), v = void 0), x || (g.value = !1);
	});
	let ne = a(() => cS(n.value, e.multiple ?? !1));
	function re(e) {
		return ne.value.includes(e);
	}
	let J = /* @__PURE__ */ new Map();
	q(C, (e) => {
		for (let t of e) t.kind === "option" && J.set(t.value, t.label);
	}, { immediate: !0 });
	function ie(e) {
		let t = C.value.find((t) => t.kind === "option" && t.value === e);
		return t ? t.label : J.get(e) ?? String(e);
	}
	let Y = a(() => {
		if (e.multiple) return "";
		let t = ne.value[0];
		return t === void 0 ? "" : ie(t);
	}), X = a(() => ne.value.length > 0), ae = a(() => lS(ne.value, e.maxTagCount ?? 0, ie)), oe = L(null), se = L(null), ce = L(null), le = L(null), ue = L(-1), { style: de, coords: fe, arrowSide: pe, transformOrigin: me, update: he, startAutoUpdate: ge, stopAutoUpdate: _e } = Cn(oe, se, {
		placement: "bottom-start",
		offset: 8,
		flip: !0,
		shift: !0,
		padding: 8,
		zIndex: d
	}), ve = a(() => {
		let e = fe.value.arrowX;
		return e === void 0 ? { left: "50%" } : { left: `${Math.round(e)}px` };
	});
	function ye() {
		return uS(O.value);
	}
	function be(e) {
		let t = O.value;
		if (!t.length) return;
		let n = dS(t, ue.value, e);
		n !== -1 && (ue.value = n, xe());
	}
	function xe() {
		let e = ce.value;
		if (e) {
			if (V.value) {
				let t = I.value, n = ue.value * t, r = n + t;
				n < e.scrollTop ? e.scrollTop = n : r > e.scrollTop + e.clientHeight && (e.scrollTop = r - e.clientHeight), z.value = e.scrollTop;
			} else e.querySelector(`[data-index="${ue.value}"]`)?.scrollIntoView({ block: "nearest" });
		}
	}
	function Se(r) {
		if (!r.disabled) {
			if (r.kind === "create") Ce(r.label);
			else if (r.kind === "option") {
				if (e.multiple) {
					let e = [...ne.value], i = e.indexOf(r.value);
					i === -1 ? e.push(r.value) : e.splice(i, 1), n.value = e, t("change", e);
				} else n.value = r.value, t("change", r.value), m(!1);
			}
		}
	}
	function Ce(t) {
		let n = t.trim();
		n && (e.onCreate?.(n), w.value = "", E(() => le.value?.focus()));
	}
	function we(r) {
		if (e.disabled) return;
		let i = ne.value.filter((e) => e !== r);
		n.value = i, t("change", i), t("remove-tag", r);
	}
	function Te() {
		if (e.disabled) return;
		let r = e.multiple ? [] : null;
		n.value = r, t("change", r), t("clear");
	}
	function Ee() {
		e.disabled || e.loading || m(!f.value);
	}
	function De(t) {
		if (!e.disabled) {
			if (t.key === "Escape") f.value && p() && (t.stopPropagation(), m(!1));
			else if (t.key === "Enter" || t.key === " ") {
				if (t.preventDefault(), !f.value) {
					Ae();
					return;
				}
				let e = O.value[ue.value];
				e && Se(e);
			} else if (t.key === "ArrowDown" || t.key === "ArrowUp") {
				if (t.preventDefault(), !f.value) {
					Ae();
					return;
				}
				be(t.key === "ArrowDown" ? 1 : -1);
			}
		}
	}
	function Oe(e) {
		if (e.key === "ArrowDown") e.preventDefault(), be(1);
		else if (e.key === "ArrowUp") e.preventDefault(), be(-1);
		else if (e.key === "Enter") {
			e.preventDefault();
			let t = O.value[ue.value];
			t && Se(t);
		} else if (e.key === "Escape") {
			if (!p()) return;
			e.preventDefault(), e.stopPropagation(), m(!1);
		}
	}
	function ke(e) {
		let t = e.currentTarget;
		if (!t) return;
		let n = t.getBoundingClientRect();
		t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
	}
	function Ae() {
		e.disabled || e.loading || m(!0);
	}
	q(f, async (t) => {
		if (t) w.value = "", ue.value = ye(), z.value = 0, await E(), se.value && oe.value && (se.value.style.minWidth = `${oe.value.offsetWidth}px`), he(), ge(), W(), (e.filterable || e.remote) && le.value?.focus();
		else {
			let e = typeof document < "u" && (se.value?.contains(document.activeElement) ?? !1);
			_e(), w.value = "", e && E(() => oe.value?.focus({ preventScroll: !0 }));
		}
	}), q(O, () => {
		ue.value = ye(), z.value = 0;
		let e = ce.value;
		e && (e.scrollTop = 0), he();
	}), q(j, () => he());
	function je(e) {
		if (!f.value) return;
		let t = e.target;
		t && (oe.value?.contains(t) || se.value?.contains(t) || m(!1));
	}
	ee(() => {
		document.addEventListener("pointerdown", je, !0), f.value && E(W);
	}), A(() => {
		document.removeEventListener("pointerdown", je, !0), _e(), K();
	});
	let Me = a(() => {
		let t = e.teleport;
		return typeof t == "string" ? t : "body";
	}), Ne = a(() => e.teleport === !1), Pe = a(() => Z("mc-select", `mc-select--${e.variant}`, `mc-select--${e.size}`, {
		"is-open": f.value,
		"is-disabled": e.disabled,
		"is-multiple": e.multiple
	}));
	return {
		trigger: oe,
		panel: se,
		listEl: ce,
		searchInput: le,
		floatingStyle: de,
		arrowSide: pe,
		arrowStyle: ve,
		transformOrigin: me,
		scopeAttrs: o,
		uid: u,
		isOpen: f,
		activeIndex: ue,
		locale: i,
		placeholderText: s,
		emptyText: c,
		query: w,
		showRemoteLoading: j,
		renderedSections: H,
		windowRange: V,
		filteredOptions: O,
		tags: ae,
		singleLabel: Y,
		hasValue: X,
		teleportTarget: Me,
		teleportDisabled: Ne,
		rootClass: a(() => Z(Pe.value, r.class, e.customClass)),
		rootStyle: a(() => r.style),
		onListScroll: U,
		onControlClick: Ee,
		onControlKeydown: De,
		onSearchKeydown: Oe,
		onOptionMove: ke,
		isSelected: re,
		selectOption: Se,
		removeTag: we,
		clear: Te
	};
}
//#endregion
//#region src/components/select/Select.vue?vue&type=script&setup=true&lang.ts
var hS = [
	"aria-label",
	"aria-labelledby",
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-disabled",
	"tabindex"
], gS = {
	key: 0,
	class: "mc-select__affix"
}, _S = { class: "mc-select__tag-label" }, vS = ["aria-label", "onClick"], yS = {
	key: 0,
	class: "mc-select__placeholder"
}, bS = {
	key: 0,
	class: "mc-select__value"
}, xS = {
	key: 1,
	class: "mc-select__placeholder"
}, SS = {
	key: 3,
	class: "mc-select__spinner",
	"aria-hidden": "true"
}, CS = ["aria-label"], wS = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, TS = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, ES = {
	key: 2,
	class: "mc-select__search"
}, DS = [
	"aria-label",
	"aria-controls",
	"aria-activedescendant"
], OS = ["aria-label"], kS = [
	"id",
	"aria-multiselectable",
	"aria-busy"
], AS = {
	key: 0,
	class: "mc-select__group mc-select__group--sticky",
	role: "presentation"
}, jS = {
	key: 0,
	class: "mc-select__group mc-select__group--nested",
	role: "presentation"
}, MS = [
	"id",
	"data-index",
	"onClick",
	"onKeydown"
], NS = {
	class: "mc-select__create-chip",
	"aria-hidden": "true"
}, PS = { class: "mc-select__create-label" }, FS = { class: "mc-select__create-text" }, IS = { class: "mc-select__create-value" }, LS = [
	"id",
	"data-index",
	"aria-selected",
	"aria-disabled",
	"aria-setsize",
	"aria-posinset",
	"onClick"
], RS = { class: "mc-select__option-label" }, zS = {
	key: 0,
	class: "mc-select__option-desc"
}, BS = {
	key: 1,
	class: "mc-select__loading",
	role: "presentation",
	"aria-live": "polite"
}, VS = { class: "mc-select__loading-text" }, HS = {
	key: 2,
	class: "mc-select__empty",
	role: "presentation"
}, US = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSelect",
	inheritAttrs: !1,
	__name: "Select",
	props: /*@__PURE__*/ w({
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
			type: [
				Boolean,
				String,
				Object
			],
			default: "auto"
		},
		ariaLabel: {},
		ariaLabelledby: {},
		customClass: {}
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"update:open",
		"open",
		"close",
		"clear",
		"remove-tag",
		"remote-method"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let { trigger: a, panel: o, listEl: d, searchInput: f, floatingStyle: h, arrowSide: g, arrowStyle: _, transformOrigin: v, scopeAttrs: y, uid: b, isOpen: S, activeIndex: C, locale: w, placeholderText: E, emptyText: O, query: A, showRemoteLoading: j, renderedSections: ee, windowRange: M, filteredOptions: N, tags: F, singleLabel: I, hasValue: L, teleportTarget: B, teleportDisabled: V, rootClass: U, rootStyle: G, onListScroll: te, onControlClick: re, onControlKeydown: q, onSearchKeydown: ae, onOptionMove: oe, isSelected: se, selectOption: ce, removeTag: le, clear: ue } = mS(e, i, K(e, "modelValue"));
		return (i, K) => (P(), l("div", {
			class: D(W(U)),
			style: k(W(G))
		}, [u("div", {
			ref_key: "trigger",
			ref: a,
			class: D(["mc-select__control mc-sheen-sweep", {
				"mc-recipe-well": e.variant === "filled" || e.variant === "outlined",
				"mc-recipe-well-rim": e.variant === "outlined"
			}]),
			role: "combobox",
			"aria-label": e.ariaLabel,
			"aria-labelledby": e.ariaLabelledby,
			"aria-expanded": W(S),
			"aria-haspopup": "listbox",
			"aria-controls": W(S) ? W(b) + "-list" : void 0,
			"aria-activedescendant": W(S) && W(C) >= 0 ? W(b) + "-option-" + W(C) : void 0,
			"aria-disabled": e.disabled || void 0,
			tabindex: e.disabled ? -1 : 0,
			onClick: K[1] || (K[1] = (...e) => W(re) && W(re)(...e)),
			onKeydown: K[2] || (K[2] = (...e) => W(q) && W(q)(...e))
		}, [
			K[9] || (K[9] = u("span", {
				class: "mc-select__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			K[10] || (K[10] = u("span", {
				class: "mc-select__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			i.$slots.prefix ? (P(), l("span", gS, [z(i.$slots, "prefix", {}, void 0, !0)])) : c("", !0),
			e.multiple ? (P(), l(t, { key: 1 }, [(P(!0), l(t, null, R(W(F), (t) => (P(), l("span", {
				key: String(t.value),
				class: D(["mc-select__tag", { "is-rest": t.rest }])
			}, [u("span", _S, H(t.label), 1), !t.rest && !e.disabled ? (P(), l("button", {
				key: 0,
				type: "button",
				class: "mc-select__tag-close",
				"aria-label": `Remove ${t.label}`,
				onClick: X((e) => W(le)(t.value), ["stop"])
			}, [m($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, vS)) : c("", !0)], 2))), 128)), W(F).length ? c("", !0) : (P(), l("span", yS, H(W(E)), 1))], 64)) : (P(), l(t, { key: 2 }, [W(I) ? (P(), l("span", bS, H(W(I)), 1)) : (P(), l("span", xS, H(W(E)), 1))], 64)),
			e.loading ? (P(), l("span", SS, [...K[8] || (K[8] = [u("svg", {
				viewBox: "0 0 24 24",
				width: "1em",
				height: "1em"
			}, [u("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.4",
				"stroke-linecap": "round",
				"stroke-dasharray": "42 60"
			})], -1)])])) : c("", !0),
			e.clearable && W(L) && !e.disabled ? (P(), l("button", {
				key: 4,
				type: "button",
				class: "mc-select__clear",
				"aria-label": W(w).select.clear ?? "Clear selection",
				onClick: K[0] || (K[0] = X((...e) => W(ue) && W(ue)(...e), ["stop"]))
			}, [m($, {
				name: "close",
				size: 13,
				"stroke-width": 2.4
			})], 8, CS)) : c("", !0),
			u("span", {
				class: D(["mc-select__arrow", { "is-open": W(S) }]),
				"aria-hidden": "true"
			}, [m($, {
				name: "chevron-down",
				size: 15
			})], 2)
		], 42, hS), (P(), s(n, {
			to: W(B),
			disabled: W(V)
		}, [m(r, { name: "mc-select-pop" }, {
			default: J(() => [W(S) ? (P(), l("div", T({
				key: 0,
				ref_key: "panel",
				ref: o,
				class: ["mc-select__panel", { "mc-select__panel--liquid": e.panelVariant === "liquid" }],
				style: W(h)
			}, W(y)), [u("span", {
				class: D(["mc-select__panel-arrow", `is-${W(g)}`]),
				style: k(W(_)),
				"aria-hidden": "true"
			}, null, 6), u("div", {
				class: D(["mc-select__panel-inner mc-grain-overlay", {
					"mc-panel--liquid": e.panelVariant === "liquid",
					"mc-liquid-glass": e.panelVariant === "liquid",
					"mc-liquid-glass--liquid": e.panelVariant === "liquid",
					"mc-liquid-glass--layers": e.panelVariant === "liquid",
					"mc-recipe-panel": e.panelVariant !== "liquid"
				}]),
				style: k({ transformOrigin: W(v) })
			}, [
				e.panelVariant === "liquid" ? (P(), l("span", wS)) : c("", !0),
				e.panelVariant === "liquid" ? (P(), l("span", TS)) : c("", !0),
				e.filterable || e.remote ? (P(), l("div", ES, [
					m($, {
						name: "search",
						size: 14,
						class: "mc-select__search-icon"
					}),
					ie(u("input", {
						ref_key: "searchInput",
						ref: f,
						"onUpdate:modelValue": K[3] || (K[3] = (e) => x(A) ? A.value = e : null),
						class: "mc-select__search-input",
						type: "text",
						placeholder: "Search…",
						"aria-label": W(w).select.search ?? "Search options",
						"aria-controls": W(b) + "-list",
						"aria-activedescendant": W(C) >= 0 ? W(b) + "-option-" + W(C) : void 0,
						onKeydown: K[4] || (K[4] = (...e) => W(ae) && W(ae)(...e))
					}, null, 40, DS), [[ne, W(A)]]),
					W(A) ? (P(), l("button", {
						key: 0,
						type: "button",
						class: "mc-select__search-clear",
						"aria-label": W(w).select.clearSearch ?? "Clear search",
						onClick: K[5] || (K[5] = (e) => A.value = "")
					}, [m($, {
						name: "close",
						size: 11,
						"stroke-width": 2.6
					})], 8, OS)) : c("", !0)
				])) : c("", !0),
				u("ul", {
					ref_key: "listEl",
					ref: d,
					id: W(b) + "-list",
					class: "mc-select__list mc-scroll",
					role: "listbox",
					"aria-multiselectable": e.multiple || void 0,
					"aria-busy": W(j) || void 0,
					onScrollPassive: K[7] || (K[7] = (...e) => W(te) && W(te)(...e))
				}, [
					W(M) && W(M).top > 0 ? (P(), l("li", {
						key: 0,
						class: "mc-select__spacer",
						role: "presentation",
						"aria-hidden": "true",
						style: k({ height: W(M).top + "px" })
					}, null, 4)) : c("", !0),
					(P(!0), l(t, null, R(W(ee), (e) => (P(), l(t, { key: e.key }, [e.label ? (P(), l("li", AS, H(e.label), 1)) : c("", !0), (P(!0), l(t, null, R(e.items, (e) => (P(), l(t, { key: `${String(e.option.label)}-${e.index}` }, [e.option.kind === "group" ? (P(), l("li", jS, H(e.option.label), 1)) : e.option.kind === "create" ? (P(), l("li", {
						key: 1,
						id: W(b) + "-option-" + e.index,
						class: D(["mc-select__create", { "is-active": e.index === W(C) }]),
						role: "option",
						"data-index": e.index,
						"aria-selected": !1,
						tabindex: "0",
						onClick: (t) => W(ce)(e.option),
						onKeydown: [Y(X((t) => W(ce)(e.option), ["prevent"]), ["enter"]), Y(X((t) => W(ce)(e.option), ["prevent"]), ["space"])]
					}, [u("span", NS, [m($, {
						name: "plus",
						size: 12,
						"stroke-width": 2.6
					})]), u("span", PS, [u("span", FS, H(W(w).select.create ?? "Create"), 1), u("span", IS, H(e.option.label), 1)])], 42, MS)) : (P(), l("li", {
						key: 2,
						id: W(b) + "-option-" + e.index,
						class: D(["mc-select__option", {
							"is-active": e.index === W(C),
							"is-selected": W(se)(e.option.value),
							"is-disabled": e.option.disabled,
							"is-nested": e.option.depth > 0,
							"is-multiline": !!e.option.description
						}]),
						role: "option",
						"data-index": e.index,
						"aria-selected": W(se)(e.option.value),
						"aria-disabled": e.option.disabled || void 0,
						"aria-setsize": W(M) ? W(M).total : void 0,
						"aria-posinset": W(M) ? e.index + 1 : void 0,
						onClick: (t) => W(ce)(e.option),
						onMousemove: K[6] || (K[6] = (...e) => W(oe) && W(oe)(...e))
					}, [u("span", { class: D(["mc-select__option-body", { "has-desc": !!e.option.description }]) }, [z(i.$slots, "option", {
						option: e.option.raw,
						label: e.option.label,
						value: e.option.value,
						selected: W(se)(e.option.value),
						disabled: !!e.option.disabled,
						index: e.index
					}, () => [u("span", RS, H(e.option.label), 1)], !0), e.option.description ? (P(), l("span", zS, H(e.option.description), 1)) : c("", !0)], 2), K[11] || (K[11] = u("span", {
						class: "mc-select__check",
						"aria-hidden": "true"
					}, [u("svg", { viewBox: "0 0 24 24" }, [u("path", { d: "M20 6 9 17l-5-5" })])], -1))], 42, LS))], 64))), 128))], 64))), 128)),
					W(j) ? (P(), l("li", BS, [K[12] || (K[12] = u("span", {
						class: "mc-select__loading-spinner",
						"aria-hidden": "true"
					}, [u("svg", {
						viewBox: "0 0 24 24",
						width: "1em",
						height: "1em"
					}, [u("circle", {
						cx: "12",
						cy: "12",
						r: "9",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2.4",
						"stroke-linecap": "round",
						"stroke-dasharray": "42 60"
					})])], -1)), u("span", VS, H(W(w).select.loading ?? "Loading…"), 1)])) : c("", !0),
					!W(N).length && !W(j) ? (P(), l("li", HS, [z(i.$slots, "empty", {}, () => [p(H(W(O)), 1)], !0)])) : c("", !0),
					W(M) && W(M).bottom > 0 ? (P(), l("li", {
						key: 3,
						class: "mc-select__spacer",
						role: "presentation",
						"aria-hidden": "true",
						style: k({ height: W(M).bottom + "px" })
					}, null, 4)) : c("", !0)
				], 40, kS)
			], 6)], 16)) : c("", !0)]),
			_: 3
		})], 8, ["to", "disabled"]))], 6));
	}
}), [["__scopeId", "data-v-96891f2e"]]), WS = { class: "mc-signature__frame mc-sheen-sweep mc-recipe-well mc-recipe-well-deep" }, GS = ["id", "aria-label"], KS = {
	key: 0,
	class: "mc-signature__hint",
	"aria-hidden": "true"
}, qS = { class: "mc-signature__toolbar" }, JS = ["disabled", "aria-label"], YS = ["disabled", "aria-label"], XS = ["disabled", "aria-label"], ZS = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSignature",
	__name: "Signature",
	props: /*@__PURE__*/ w({
		width: { default: 480 },
		height: { default: 200 },
		strokeColor: { default: "current" },
		strokeWidth: { default: 2.6 },
		background: { default: "transparent" },
		customClass: {}
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"save",
		"clear"
	], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = rn(), i = t, o = K(e, "modelValue"), s = Ln("mc-signature"), d = L(null), f = L([]), p = L(!1), h = L(!1), g = [], _ = 1;
		function v(e, t) {
			let n = (e ?? "").trim();
			if (typeof document > "u") return n;
			let r = document.createElement("span");
			r.style.display = "none", r.style.color = n === "current" ? `var(${t})` : n, document.body.appendChild(r);
			let i = getComputedStyle(r).color;
			if (document.body.removeChild(r), !i) return n === "current" ? "" : n;
			let a = document.createElement("canvas").getContext("2d");
			return a ? (a.fillStyle = "transparent", a.fillStyle = i, a.fillStyle) : i;
		}
		let y = a(() => v(n.strokeColor, "--mc-accent")), b = a(() => {
			let e = (n.background ?? "").trim();
			return !e || e === "transparent" ? "transparent" : v(e, "--mc-surface");
		});
		function x() {
			return d.value?.getContext("2d") ?? null;
		}
		function S(e) {
			e.clearRect(0, 0, n.width, n.height), b.value !== "transparent" && (e.save(), e.fillStyle = b.value, e.fillRect(0, 0, n.width, n.height), e.restore());
		}
		function C(e, t) {
			if (!t.length) return;
			if (e.save(), e.strokeStyle = y.value, e.lineWidth = n.strokeWidth, e.lineCap = "round", e.lineJoin = "round", t.length === 1) {
				e.beginPath(), e.arc(t[0].x, t[0].y, n.strokeWidth / 2, 0, Math.PI * 2), e.fillStyle = y.value, e.fill(), e.restore();
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
			let e = x();
			if (e) {
				e.setTransform(_, 0, 0, _, 0, 0), S(e);
				for (let t of f.value) C(e, t);
				h.value = f.value.length > 0;
			}
		}
		function T() {
			let e = d.value;
			e && (_ = Math.min(window.devicePixelRatio || 1, 3), e.width = Math.round(n.width * _), e.height = Math.round(n.height * _), e.style.width = `${n.width}px`, e.style.height = `${n.height}px`);
		}
		function E(e) {
			let t = x();
			if (!t || !e) return;
			let r = new Image();
			r.onload = () => {
				t.setTransform(_, 0, 0, _, 0, 0), S(t), t.drawImage(r, 0, 0, n.width, n.height), h.value = !0;
			}, r.src = e;
		}
		function O(e) {
			let t = d.value?.getBoundingClientRect();
			return t ? {
				x: e.clientX - t.left,
				y: e.clientY - t.top
			} : {
				x: 0,
				y: 0
			};
		}
		function k(e) {
			if (e.button !== 0 && e.pointerType === "mouse") return;
			let t = d.value;
			t && (e.preventDefault(), t.setPointerCapture(e.pointerId), p.value = !0, g = [O(e)], f.value = f.value.concat([g]), w());
		}
		function j(e) {
			if (!p.value) return;
			e.preventDefault();
			let t = O(e), n = g[g.length - 1];
			n && Math.abs(t.x - n.x) < .6 && Math.abs(t.y - n.y) < .6 || (g.push(t), w());
		}
		function M() {
			p.value && (p.value = !1, g = [], w());
		}
		function N() {
			f.value.length && (f.value = f.value.slice(0, -1), w());
		}
		function F() {
			f.value = [], w(), i("clear"), o.value = "", i("change", "");
		}
		function I() {
			let e = d.value;
			if (!e) return;
			let t = e.toDataURL("image/png");
			o.value = t, i("change", t), i("save", t);
		}
		ee(() => {
			T(), w(), o.value && E(o.value);
		}), A(() => {
			p.value = !1;
		}), q(() => [n.width, n.height], () => {
			T(), w();
		}), q(() => n.strokeColor, () => w()), q(() => n.background, () => w()), q(() => o.value, (e) => {
			e && E(e);
		});
		let R = a(() => Z("mc-signature", {
			"is-drawing": p.value,
			"has-ink": h.value
		}, n.customClass));
		return (t, n) => (P(), l("div", { class: D(R.value) }, [u("div", WS, [
			n[0] || (n[0] = u("span", {
				class: "mc-signature__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			u("canvas", {
				ref_key: "canvas",
				ref: d,
				id: W(s),
				class: "mc-signature__canvas",
				"aria-label": `signature ${e.width} by ${e.height}`,
				role: "img",
				onPointerdown: k,
				onPointermove: j,
				onPointerup: M,
				onPointercancel: M,
				onPointerleave: M
			}, null, 40, GS),
			h.value ? c("", !0) : (P(), l("span", KS, [m($, {
				name: "pen",
				size: 16
			}), u("span", null, H(W(r).signature?.hint ?? "Sign here"), 1)]))
		]), u("div", qS, [
			u("button", {
				type: "button",
				class: "mc-signature__btn",
				disabled: !h.value,
				"aria-label": W(r).signature?.undo ?? "undo",
				onClick: N
			}, [m($, {
				name: "arrow-left",
				size: 14
			}), u("span", null, H(W(r).signature?.undo ?? "Undo"), 1)], 8, JS),
			u("button", {
				type: "button",
				class: "mc-signature__btn",
				disabled: !h.value,
				"aria-label": W(r).signature?.clear ?? "clear",
				onClick: F
			}, [m($, {
				name: "trash",
				size: 14
			}), u("span", null, H(W(r).signature?.clear ?? "Clear"), 1)], 8, YS),
			u("button", {
				type: "button",
				class: "mc-signature__btn mc-signature__btn--primary",
				disabled: !h.value,
				"aria-label": W(r).signature?.save ?? "save as PNG",
				onClick: I
			}, [m($, {
				name: "save",
				size: 14
			}), u("span", null, H(W(r).signature?.save ?? "Save as PNG"), 1)], 8, XS)
		])], 2));
	}
}), [["__scopeId", "data-v-375d92a2"]]), QS = { class: "mc-skeleton__content" }, $S = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => {
			if (n.width !== void 0) return { width: typeof n.width == "number" ? `${n.width}px` : n.width };
		}), i = a(() => {
			if (n.height !== void 0) return { height: typeof n.height == "number" ? `${n.height}px` : n.height };
		}), o = a(() => Math.max(0, n.rows)), s = a(() => Math.max(1, n.columns));
		function d(e, t) {
			if (s.value === 1) return { flex: "1 1 auto" };
			let n = e === o.value - 1, r = t === s.value - 1;
			return n && r ? { flex: "0 0 62%" } : n ? { flex: "1 1 auto" } : { flex: "1 1 0%" };
		}
		let f = a(() => Z("mc-skeleton", {
			"is-animated": n.animated && n.loading && !n.disabled,
			"is-round": n.round,
			"has-avatar": n.avatar,
			"is-disabled": n.disabled
		}, n.customClass));
		return (a, p) => e.loading ? (P(), l("div", {
			key: 0,
			class: D(f.value),
			style: k(r.value),
			"aria-busy": "true"
		}, [e.avatar ? (P(), l("div", {
			key: 0,
			class: "mc-skeleton__avatar mc-recipe-panel",
			style: k(i.value)
		}, null, 4)) : c("", !0), u("div", QS, [e.title ? (P(), l("div", {
			key: 0,
			class: "mc-skeleton__block mc-skeleton__title mc-recipe-well",
			style: k(i.value)
		}, null, 4)) : c("", !0), (P(!0), l(t, null, R(o.value, (e) => (P(), l("div", {
			key: e,
			class: "mc-skeleton__row"
		}, [(P(!0), l(t, null, R(s.value, (t) => (P(), l("div", {
			key: t,
			class: "mc-skeleton__block mc-skeleton__row-item mc-recipe-well",
			style: k({
				...i.value,
				...d(e - 1, t - 1)
			})
		}, null, 4))), 128))]))), 128))])], 6)) : (P(), l("div", {
			key: 1,
			class: D(W(Z)("mc-skeleton", "mc-skeleton--loaded", n.customClass))
		}, [z(a.$slots, "default", {}, void 0, !0)], 2));
	}
}), [["__scopeId", "data-v-c5d365b0"]]), eC = [
	"tabindex",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-orientation",
	"aria-disabled",
	"aria-label",
	"aria-valuetext",
	"aria-describedby",
	"onPointerdown",
	"onKeydown"
], tC = {
	key: 0,
	class: "mc-slider__bubble"
}, nC = {
	key: 0,
	class: "mc-slider__marks"
}, rC = { class: "mc-slider__mark-label" }, iC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSlider",
	inheritAttrs: !1,
	__name: "Slider",
	props: /*@__PURE__*/ w({
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
		ariaLabel: {},
		ariaDescribedby: {},
		formatValue: {},
		disabled: {
			type: Boolean,
			default: !1
		},
		color: { default: "default" },
		size: { default: "medium" },
		customClass: {}
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), s = rn(), d = G();
		function f(e) {
			return Array.isArray(e) ? e : [e ?? r.min];
		}
		function p(e) {
			if (r.range) {
				let t = f(e), n = Pt(t[0] ?? r.min, r.min, r.max), i = Pt(t[1] ?? r.max, r.min, r.max);
				return n <= i ? [n, i] : [i, n];
			}
			return [Pt(f(e)[0] ?? r.min, r.min, r.max)];
		}
		let m = L(p(o.value));
		q(() => o.value, (e) => {
			let t = p(e);
			t.every((e, t) => e === m.value[t]) || (m.value = t);
		});
		function h(e) {
			let t = r.step ?? 1, n = Math.round((e - r.min) / t) * t + r.min;
			return Number(Pt(n, r.min, r.max).toFixed(10));
		}
		function g(e) {
			let t = r.max - r.min;
			return t <= 0 ? 0 : (e - r.min) / t * 100;
		}
		function _() {
			return r.range ? [...m.value] : m.value[0];
		}
		function v(e, t) {
			if (r.disabled) return;
			let n = [...m.value];
			r.range ? e === 0 ? n[0] = Math.min(t, n[1]) : n[1] = Math.max(t, n[0]) : n[0] = t, !n.every((e, t) => e === m.value[t]) && (m.value = n, o.value = _());
		}
		let y = L(null), b = L(null);
		function x(e) {
			let t = y.value;
			if (!t) return r.min;
			let n = t.getBoundingClientRect(), i = r.vertical ? 1 - (e.clientY - n.top) / n.height : (e.clientX - n.left) / n.width;
			return h(r.min + Pt(i, 0, 1) * (r.max - r.min));
		}
		function S(e) {
			let t = b.value;
			t !== null && v(t, x(e));
		}
		function C(e) {
			if (r.disabled) return;
			let t = x(e), n = 0;
			r.range && (n = Math.abs(t - m.value[0]) <= Math.abs(t - m.value[1]) ? 0 : 1), b.value = n, S(e);
		}
		function w(e, t) {
			r.disabled || (b.value = e, S(t));
		}
		function T(e) {
			b.value !== null && S(e);
		}
		function E() {
			b.value !== null && (b.value = null, i("change", _()));
		}
		ee(() => {
			window.addEventListener("pointermove", T), window.addEventListener("pointerup", E);
		}), A(() => {
			window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", E);
		});
		function O(e, t) {
			if (r.disabled) return;
			let n = r.step ?? 1, i = m.value[e];
			if (t.key === "Home") {
				t.preventDefault(), j(e, r.range && e === 1 ? m.value[0] : r.min);
				return;
			}
			if (t.key === "End") {
				t.preventDefault(), j(e, r.range && e === 0 ? m.value[1] : r.max);
				return;
			}
			let a = 0;
			if (t.key === "ArrowRight" || t.key === "ArrowUp") a = n;
			else if (t.key === "ArrowLeft" || t.key === "ArrowDown") a = -n;
			else if (t.key === "PageUp") a = n * 10;
			else if (t.key === "PageDown") a = -n * 10;
			else return;
			t.preventDefault(), j(e, h(i + a));
		}
		function j(e, t) {
			let n = m.value[e];
			v(e, t), m.value[e] !== n && i("change", _());
		}
		function M(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect(), r = (e.clientX - (n.left + n.width / 2)) / n.width * 4, i = (e.clientY - (n.top + n.height / 2)) / n.height * 4;
			t.style.setProperty("--mc-mx", `${r.toFixed(2)}px`), t.style.setProperty("--mc-my", `${i.toFixed(2)}px`);
		}
		let N = a(() => {
			if (r.range) {
				let e = g(m.value[0]), t = g(m.value[1]);
				return r.vertical ? {
					bottom: `${e}%`,
					height: `${t - e}%`
				} : {
					left: `${e}%`,
					width: `${t - e}%`
				};
			}
			let e = g(m.value[0]);
			return r.vertical ? {
				bottom: "0%",
				height: `${e}%`
			} : {
				left: "0%",
				width: `${e}%`
			};
		}), F = a(() => m.value.map((e, t) => ({
			value: e,
			index: t,
			style: { "--mc-pos": String(g(e)) }
		}))), I = a(() => r.marks ?? []);
		function z(e) {
			return { "--mc-pos": String(g(e)) };
		}
		let B = a(() => Z("mc-slider", `mc-slider--${r.color}`, `mc-slider--${r.size}`, {
			"is-vertical": r.vertical,
			"is-range": r.range,
			"is-disabled": r.disabled,
			"is-dragging": b.value !== null,
			"has-marks": I.value.length > 0
		})), V = a(() => Z(B.value, d.class, r.customClass)), U = a(() => d.style);
		function W(e) {
			let t = r.ariaLabel?.trim() || s.value.slider?.label || "Slider";
			return r.range ? `${t} ${e.index + 1}` : t;
		}
		return (n, r) => (P(), l("div", {
			class: D(V.value),
			style: k(U.value)
		}, [
			u("div", {
				ref_key: "track",
				ref: y,
				class: "mc-slider__rail mc-recipe-well mc-recipe-well-deep",
				onPointerdown: C
			}, [
				u("div", {
					class: "mc-slider__fill",
					style: k(N.value)
				}, [...r[0] || (r[0] = [u("span", { class: "mc-slider__fill-shine" }, null, -1)])], 4),
				r[1] || (r[1] = u("span", { class: "mc-slider__groove" }, null, -1)),
				r[2] || (r[2] = u("span", { class: "mc-slider__grain mc-grain-overlay" }, null, -1))
			], 544),
			(P(!0), l(t, null, R(F.value, (t) => (P(), l("div", {
				key: t.index,
				class: "mc-slider__handle",
				style: k(t.style),
				role: "slider",
				tabindex: e.disabled ? -1 : 0,
				"aria-valuemin": e.min,
				"aria-valuemax": e.max,
				"aria-valuenow": t.value,
				"aria-orientation": e.vertical ? "vertical" : "horizontal",
				"aria-disabled": e.disabled || void 0,
				"aria-label": W(t),
				"aria-valuetext": e.formatValue ? e.formatValue(t.value) : void 0,
				"aria-describedby": e.ariaDescribedby || void 0,
				onPointerdown: (e) => w(t.index, e),
				onPointermove: M,
				onKeydown: (e) => O(t.index, e)
			}, [
				r[3] || (r[3] = u("span", { class: "mc-slider__halo" }, null, -1)),
				r[4] || (r[4] = u("span", { class: "mc-slider__core" }, null, -1)),
				e.showValue ? (P(), l("span", tC, H(t.value), 1)) : c("", !0)
			], 44, eC))), 128)),
			I.value.length ? (P(), l("div", nC, [(P(!0), l(t, null, R(I.value, (e) => (P(), l("span", {
				key: e.value,
				class: "mc-slider__mark",
				style: k(z(e.value))
			}, [r[5] || (r[5] = u("span", { class: "mc-slider__mark-dot" }, null, -1)), u("span", rC, H(e.label), 1)], 4))), 128))])) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-958219b3"]]), aC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let i = a(() => ({
			flexDirection: n.direction === "vertical" ? "column" : "row",
			gap: r(n.size),
			alignItems: n.align,
			flexWrap: n.wrap ? "wrap" : "nowrap"
		})), o = a(() => Z("mc-space", `mc-space--${n.direction}`, {
			"is-wrap": n.wrap,
			"is-fill": n.fill,
			"is-bordered": n.bordered
		}, n.customClass));
		return (e, t) => (P(), l("div", {
			class: D(o.value),
			style: k(i.value)
		}, [z(e.$slots, "default", {}, void 0, !0)], 6));
	}
}), [["__scopeId", "data-v-e0939175"]]), oC = ["aria-busy", "aria-disabled"], sC = {
	key: 0,
	class: "mc-spin__overlay"
}, cC = {
	class: "mc-spin__loader",
	"aria-hidden": "true"
}, lC = {
	viewBox: "0 0 44 44",
	class: "mc-spin__ring"
}, uC = ["id"], dC = ["stroke"], fC = {
	key: 0,
	class: "mc-spin__tip"
}, pC = { class: "mc-visually-hidden" }, mC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let i = e, o = rn(), d = Hn(), f = Ln("mc-spin-grad"), p = L(i.loading && i.delay === 0), h;
		function g() {
			h !== void 0 && (clearTimeout(h), h = void 0), i.loading ? i.delay <= 0 ? p.value = !0 : (p.value = !1, h = setTimeout(() => {
				p.value = !0;
			}, i.delay)) : p.value = !1;
		}
		q(() => [i.loading, i.delay], g, { immediate: !0 });
		let _ = jn({ active: a(() => i.fullscreen && p.value) });
		A(() => {
			h !== void 0 && clearTimeout(h);
		});
		let v = a(() => typeof i.size == "number" ? `${i.size}px` : i.size), y = a(() => Z("mc-spin", `mc-spin--${i.indicator}`, {
			"is-fullscreen": i.fullscreen,
			"is-visible": p.value,
			"is-disabled": i.disabled
		}, i.customClass)), b = a(() => {
			let e = { "--mc-spin-size": v.value };
			i.fullscreen && (e.zIndex = String(_.value));
			let t = Ot(i.color);
			return t && (e["--mc-spin-color"] = t), e;
		}), x = a(() => `url(#${f})`);
		return (i, a) => (P(), s(n, {
			to: "body",
			disabled: !e.fullscreen
		}, [u("div", T({
			class: y.value,
			style: b.value
		}, W(d), {
			role: "status",
			"aria-live": "polite",
			"aria-busy": e.loading || void 0,
			"aria-disabled": e.disabled || void 0
		}), [e.fullscreen ? (P(), l("div", sC)) : c("", !0), m(r, { name: "mc-spin-fade" }, {
			default: J(() => [p.value ? (P(), l("div", {
				key: 0,
				class: D(["mc-spin__body", { "mc-recipe-panel": e.fullscreen }])
			}, [
				u("div", cC, [e.indicator === "ring" ? (P(), l(t, { key: 0 }, [(P(), l("svg", lC, [
					u("defs", null, [u("linearGradient", {
						id: W(f),
						x1: "0%",
						y1: "0%",
						x2: "100%",
						y2: "100%"
					}, [...a[0] || (a[0] = [
						u("stop", {
							offset: "0%",
							"stop-color": "hsl(var(--mc-h) var(--mc-s) 64%)"
						}, null, -1),
						u("stop", {
							offset: "55%",
							"stop-color": "hsl(var(--mc-h2) var(--mc-s2) 62%)"
						}, null, -1),
						u("stop", {
							offset: "100%",
							"stop-color": "hsl(var(--mc-h3) var(--mc-s3) 62%)"
						}, null, -1)
					])], 8, uC)]),
					a[1] || (a[1] = u("circle", {
						class: "mc-spin__ring-track",
						cx: "22",
						cy: "22",
						r: "18"
					}, null, -1)),
					u("circle", {
						class: "mc-spin__ring-arc",
						cx: "22",
						cy: "22",
						r: "18",
						stroke: x.value
					}, null, 8, dC)
				])), a[2] || (a[2] = u("span", { class: "mc-spin__ring-core" }, null, -1))], 64)) : e.indicator === "dots" ? (P(), l(t, { key: 1 }, [
					a[3] || (a[3] = u("span", {
						class: "mc-spin__dot",
						style: { "--i": "0" }
					}, null, -1)),
					a[4] || (a[4] = u("span", {
						class: "mc-spin__dot",
						style: { "--i": "1" }
					}, null, -1)),
					a[5] || (a[5] = u("span", {
						class: "mc-spin__dot",
						style: { "--i": "2" }
					}, null, -1))
				], 64)) : e.indicator === "bars" ? (P(), l(t, { key: 2 }, [
					a[6] || (a[6] = u("span", {
						class: "mc-spin__bar",
						style: { "--i": "0" }
					}, null, -1)),
					a[7] || (a[7] = u("span", {
						class: "mc-spin__bar",
						style: { "--i": "1" }
					}, null, -1)),
					a[8] || (a[8] = u("span", {
						class: "mc-spin__bar",
						style: { "--i": "2" }
					}, null, -1))
				], 64)) : (P(), l(t, { key: 3 }, [a[9] || (a[9] = u("span", { class: "mc-spin__orbit-track" }, null, -1)), a[10] || (a[10] = u("span", { class: "mc-spin__orbit-dot" }, null, -1))], 64))]),
				e.tip ? (P(), l("p", fC, H(e.tip), 1)) : c("", !0),
				u("span", pC, H(W(o).spin?.loading ?? "Loading"), 1)
			], 2)) : c("", !0)]),
			_: 1
		})], 16, oC)], 8, ["disabled"]));
	}
}), [["__scopeId", "data-v-21480a87"]]), hC = ["data-mc-color-mode"], gC = [
	"aria-orientation",
	"aria-valuenow",
	"aria-valuemin",
	"aria-valuemax",
	"aria-disabled",
	"aria-label"
], _C = {
	class: "mc-split__grip mc-aurora-inset mc-recipe-well",
	"aria-hidden": "true"
}, vC = ["data-mc-color-mode"], yC = 5, bC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = rn(), i = t, o = L(null), s = L(n.size), c = L(!1), d = L(!1), f = L(n.size);
		function p(e) {
			return Pt(e, Math.min(n.min, n.max), Math.max(n.min, n.max));
		}
		function h(e, t = !1) {
			let n = p(e);
			s.value = n, t || (i("update:size", n), i("resize", n));
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
			d.value && (d.value = !1, At && (window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b)), x());
		}
		function x() {
			let e = p(Math.round(s.value / yC) * yC);
			if (Math.abs(e - s.value) < .01) return;
			_();
			let t = s.value, n = e - t, r = performance.now(), a = (o) => {
				let c = Math.min(1, (o - r) / 260), l = 1 - (1 - c) ** 3;
				s.value = t + n * l, c < 1 ? g = requestAnimationFrame(a) : (g = 0, s.value = e, i("update:size", e), i("resize", e));
			};
			g = requestAnimationFrame(a);
		}
		function S(e) {
			n.resizable && !c.value && (e.preventDefault(), e.currentTarget.focus(), d.value = !0, _(), At && (window.addEventListener("pointermove", y), window.addEventListener("pointerup", b)));
		}
		function C() {
			n.collapsible && (c.value ? (c.value = !1, h(f.value)) : (f.value = s.value, c.value = !0, h(0)), i("collapse", c.value));
		}
		function w(e) {
			if (!n.resizable) return;
			let t = e.shiftKey ? 10 : 1, r = n.direction === "horizontal" ? "ArrowLeft" : "ArrowUp", i = n.direction === "horizontal" ? "ArrowRight" : "ArrowDown";
			e.key === r ? (e.preventDefault(), h(s.value - t)) : e.key === i ? (e.preventDefault(), h(s.value + t)) : e.key === "Home" ? (e.preventDefault(), h(n.min)) : e.key === "End" ? (e.preventDefault(), h(n.max)) : e.key === "Enter" && (e.preventDefault(), C());
		}
		q(() => n.size, (e) => {
			d.value || (s.value = p(e));
		}), A(() => {
			_(), At && (window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", b));
		});
		let T = a(() => {
			let e = n.firstPaneStyle ?? {}, t = {};
			return (n.direction === "horizontal" ? e.width !== void 0 : e.height !== void 0) || (t.flex = `0 0 calc(max(0px, ${s.value}% - ${j.value / 2}px))`), {
				...t,
				...e
			};
		}), E = a(() => ({
			flex: "1 1 0%",
			minWidth: 0,
			minHeight: 0,
			...n.secondPaneStyle ?? {}
		})), O = a(() => n.divider === "auto" ? n.variant === "hard" ? "hairline" : "pill" : n.divider), j = a(() => {
			switch (O.value) {
				case "none": return 0;
				case "hairline": return 1;
				case "ink": return 2;
				default: return Math.max(0, n.gutter);
			}
		}), ee = a(() => {
			let e = { "--mc-split-gutter": `${j.value}px` };
			return n.panePadding !== void 0 && n.panePadding !== null && n.panePadding !== "" && (e["--mc-split-pane-pad"] = typeof n.panePadding == "number" ? `${n.panePadding}px` : n.panePadding), e;
		}), M = a(() => Z("mc-split", `mc-split--${n.direction}`, `mc-split--${n.variant}`, `mc-split--divider-${O.value}`, {
			"is-dragging": d.value,
			"is-collapsed": c.value,
			"is-disabled": !n.resizable
		}, n.customClass));
		return (t, n) => (P(), l("div", {
			ref_key: "container",
			ref: o,
			class: D(M.value),
			style: k(ee.value)
		}, [
			u("div", {
				class: "mc-split__pane mc-split__pane--first",
				style: k(T.value),
				"data-mc-color-mode": e.firstMode === "auto" ? void 0 : e.firstMode
			}, [z(t.$slots, "first", {}, void 0, !0)], 12, hC),
			u("div", {
				class: "mc-split__bar",
				role: "separator",
				tabindex: "0",
				"aria-orientation": e.direction === "horizontal" ? "vertical" : "horizontal",
				"aria-valuenow": Math.round(s.value),
				"aria-valuemin": e.min,
				"aria-valuemax": e.max,
				"aria-disabled": e.resizable ? void 0 : "true",
				"aria-label": e.collapsible ? W(r).split?.resize ?? "Resize panes" : void 0,
				onPointerdown: S,
				onDblclick: C,
				onKeydown: w
			}, [n[0] || (n[0] = u("span", {
				class: "mc-split__sheen",
				"aria-hidden": "true"
			}, null, -1)), u("span", _C, [m($, {
				name: e.direction === "horizontal" ? "grip-vertical" : "grip",
				size: 14
			}, null, 8, ["name"])])], 40, gC),
			u("div", {
				class: "mc-split__pane mc-split__pane--second",
				style: k(E.value),
				"data-mc-color-mode": e.secondMode === "auto" ? void 0 : e.secondMode
			}, [z(t.$slots, "second", {}, void 0, !0)], 12, vC)
		], 6));
	}
}), [["__scopeId", "data-v-e0fdfa1f"]]), xC = {
	key: 0,
	class: "mc-statistic__title"
}, SC = { class: "mc-statistic__row" }, CC = {
	class: "mc-statistic__value mc-sheen-sweep",
	"data-mc-type": "readout"
}, wC = {
	key: 0,
	class: "mc-statistic__affix"
}, TC = {
	key: 1,
	class: "mc-statistic__affix"
}, EC = { class: "mc-statistic__trend-value" }, DC = {
	key: 1,
	class: "mc-statistic__trend-suffix"
}, OC = {
	key: 1,
	class: "mc-statistic__description"
}, kC = {
	key: 2,
	class: "mc-statistic__sparkline"
}, AC = {
	key: 3,
	class: "mc-statistic__footer"
}, jC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => {
			let e = t.value;
			if (typeof e == "number") return Number.isFinite(e) ? e : 0;
			let n = Number.parseFloat(String(e).replace(/[^0-9.eE+-]/g, ""));
			return Number.isFinite(n) ? n : 0;
		}), r = a(() => typeof t.value == "number" || String(t.value).trim() !== "" && Number.isFinite(Number.parseFloat(String(t.value)))), i = a(() => n.value), { display: o } = zd(i, {
			duration: t.duration,
			decimals: t.precision,
			from: 0
		}), d = a(() => {
			if (!t.animated || !r.value) return String(t.value ?? "");
			let e = o.value;
			return t.separator ? e : e.replace(/,/g, "");
		}), f = a(() => {
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
		}), p = a(() => Z("mc-statistic", "mc-grain-overlay", "mc-recipe-sheet", `mc-statistic--${t.size}`, { "is-animated": t.animated && r.value }, t.customClass)), m = a(() => Ot(t.color) ? { color: Ot(t.color) } : void 0), h = a(() => {
			if (!t.animated || !r.value) return "";
			let e = i.value.toLocaleString(void 0, {
				minimumFractionDigits: t.precision,
				maximumFractionDigits: t.precision
			});
			return t.separator ? e : e.replace(/,/g, "");
		}), g = a(() => {
			let e = { ...m.value ?? {} };
			return h.value && (e.minWidth = `${h.value.length}ch`), Object.keys(e).length ? e : void 0;
		}), _ = a(() => String(t.value ?? ""));
		return (t, n) => (P(), l("div", {
			class: D(p.value),
			"aria-live": "polite"
		}, [
			e.title ? (P(), l("span", xC, H(e.title), 1)) : c("", !0),
			u("div", SC, [u("span", CC, [
				e.prefix ? (P(), l("span", wC, H(e.prefix), 1)) : c("", !0),
				(P(), l("span", {
					key: _.value,
					class: D(["mc-statistic__number mc-statistic__number--gradient", { "is-plain": !!e.color }]),
					style: k(g.value)
				}, H(d.value), 7)),
				e.suffix ? (P(), l("span", TC, H(e.suffix), 1)) : c("", !0)
			]), f.value ? (P(), l("span", {
				key: 0,
				class: D(["mc-statistic__trend", [`mc-statistic__trend--${f.value.direction}`, { "is-plain": typeof e.trend == "string" }]])
			}, [
				typeof e.trend == "string" ? c("", !0) : (P(), s($, {
					key: 0,
					name: f.value.direction === "up" ? "arrow-up" : "arrow-down",
					size: 12,
					"stroke-width": 2.4
				}, null, 8, ["name"])),
				u("span", EC, H(f.value.text), 1),
				f.value.suffix ? (P(), l("span", DC, H(f.value.suffix), 1)) : c("", !0)
			], 2)) : c("", !0)]),
			e.description ? (P(), l("p", OC, H(e.description), 1)) : c("", !0),
			t.$slots.sparkline ? (P(), l("div", kC, [z(t.$slots, "sparkline", {}, void 0, !0)])) : c("", !0),
			t.$slots.footer ? (P(), l("div", AC, [z(t.$slots, "footer", {}, void 0, !0)])) : c("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-21a392c0"]]), MC = ["aria-current"], NC = [
	"disabled",
	"aria-current",
	"aria-label",
	"onClick"
], PC = { class: "mc-steps__node-inner" }, FC = {
	key: 1,
	class: "mc-steps__index"
}, IC = {
	key: 0,
	class: "mc-steps__grain mc-grain-overlay",
	"aria-hidden": "true"
}, LC = { class: "mc-steps__content" }, RC = {
	class: "mc-steps__title",
	"data-mc-type": "title"
}, zC = {
	key: 0,
	class: "mc-steps__description"
}, BC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSteps",
	__name: "Steps",
	props: /*@__PURE__*/ w({
		steps: {},
		direction: { default: "horizontal" },
		status: { default: "process" },
		clickable: {
			type: Boolean,
			default: !1
		},
		customClass: {}
	}, {
		modelValue: { default: 0 },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, i = n, o = K(e, "modelValue"), d = a(() => {
			let e = Math.round(o.value || 0);
			return Math.min(Math.max(0, e), Math.max(0, r.steps.length - 1));
		});
		function f(e, t) {
			return e.status ? e.status : t < d.value ? "finish" : t === d.value ? r.status : "wait";
		}
		function p(e) {
			return e === r.steps.length - 1;
		}
		function m(e) {
			return +(e < d.value);
		}
		let h = a(() => r.steps.map((e, t) => {
			let n = f(e, t);
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
		function g(e) {
			r.clickable && (o.value = e, i("change", e));
		}
		let _ = a(() => Z("mc-steps", `mc-steps--${r.direction}`, { "is-clickable": r.clickable }, r.customClass));
		return (n, r) => (P(), l("ol", {
			class: D(_.value),
			role: "list"
		}, [(P(!0), l(t, null, R(e.steps, (t, n) => (P(), l("li", {
			key: n,
			class: D(["mc-steps__step", {
				"is-active": n === d.value,
				"is-finish": f(t, n) === "finish",
				"is-error": f(t, n) === "error",
				"is-wait": f(t, n) === "wait"
			}]),
			"aria-current": n === d.value ? "step" : void 0
		}, [
			u("button", {
				type: "button",
				class: D(["mc-steps__node mc-sheen-sweep mc-recipe-well", { "is-disabled": !e.clickable }]),
				disabled: !e.clickable,
				"aria-current": n === d.value ? "step" : void 0,
				"aria-label": `Step ${n + 1}: ${t.title}`,
				onClick: (e) => g(n)
			}, [u("span", PC, [h.value[n].icon ? (P(), s($, {
				key: 0,
				name: h.value[n].icon ?? "circle",
				size: 16,
				"stroke-width": 2.4
			}, null, 8, ["name"])) : (P(), l("span", FC, H(h.value[n].text), 1))]), n === d.value ? (P(), l("span", IC)) : c("", !0)], 10, NC),
			p(n) ? c("", !0) : (P(), l("div", {
				key: 0,
				class: "mc-steps__connector",
				"aria-hidden": "true",
				style: k({ "--mc-fill-scale": m(n) })
			}, [...r[0] || (r[0] = [u("span", { class: "mc-steps__connector-track" }, null, -1), u("span", { class: "mc-steps__connector-fill" }, null, -1)])], 4)),
			u("div", LC, [u("div", RC, H(t.title), 1), t.description ? (P(), l("div", zC, H(t.description), 1)) : c("", !0)])
		], 10, MC))), 128))], 2));
	}
}), [["__scopeId", "data-v-a15af743"]]), VC = [
	"aria-checked",
	"aria-disabled",
	"disabled"
], HC = {
	key: 0,
	class: "mc-switch__spinner",
	"aria-hidden": "true"
}, UC = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiSwitch",
	inheritAttrs: !1,
	__name: "Switch",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: {
			type: Boolean,
			default: !1
		},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = t, i = K(e, "modelValue"), o = G(), s = a(() => {
			let { class: e, style: t, ...n } = o;
			return n;
		}), d = a(() => i.value === !0);
		function p() {
			if (n.disabled || n.loading) return;
			let e = !d.value;
			i.value = e, r("change", e);
		}
		let m = a(() => Z("mc-switch", "mc-sheen-sweep", `mc-switch--${n.size}`, `mc-switch--${n.color}`, {
			"is-on": d.value,
			"is-disabled": n.disabled,
			"is-loading": n.loading
		})), h = a(() => Z(m.value, o.class, n.customClass)), g = a(() => o.style);
		return (t, n) => (P(), l("button", T(s.value, {
			type: "button",
			role: "switch",
			class: h.value,
			style: g.value,
			"aria-checked": d.value,
			"aria-disabled": e.disabled || e.loading || void 0,
			disabled: e.disabled || e.loading,
			onClick: p
		}), [n[1] || (n[1] = f("<span class=\"mc-switch__track mc-recipe-well mc-recipe-well-deep\" aria-hidden=\"true\" data-v-8652480f><span class=\"mc-switch__grain mc-grain-overlay\" data-v-8652480f></span></span><span class=\"mc-switch__knob-wrap\" aria-hidden=\"true\" data-v-8652480f><span class=\"mc-switch__knob\" data-v-8652480f><span class=\"mc-switch__knob-core\" data-v-8652480f></span></span></span>", 2)), e.loading ? (P(), l("span", HC, [...n[0] || (n[0] = [u("svg", {
			viewBox: "0 0 24 24",
			width: "1em",
			height: "1em"
		}, [u("circle", {
			cx: "12",
			cy: "12",
			r: "9",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2.4",
			"stroke-linecap": "round",
			"stroke-dasharray": "42 60"
		})], -1)])])) : c("", !0)], 16, VC));
	}
}), [["__scopeId", "data-v-8652480f"]]), WC = ["aria-disabled"], GC = {
	key: 0,
	class: "mc-table__caption"
}, KC = { class: "mc-table__head" }, qC = { class: "mc-table__head-row" }, JC = ["aria-sort"], YC = ["aria-label", "onClick"], XC = { class: "mc-table__th-text" }, ZC = {
	key: 1,
	class: "mc-table__th-text"
}, QC = { class: "mc-table__body" }, $C = ["onClick", "onKeydown"], ew = {
	key: 0,
	class: "mc-table__row mc-table__row--empty"
}, tw = ["colspan"], nw = {
	class: "mc-table__empty-icon mc-recipe-well",
	"aria-hidden": "true"
}, rw = { class: "mc-table__empty-text" }, iw = 140, aw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = L(null), s = a(() => r.sortKey === void 0 ? o.value : r.sortOrder ? {
			key: r.sortKey,
			order: r.sortOrder
		} : null);
		function d(e) {
			if (!e.sortable) return;
			let t = s.value, n = t && t.key === e.key && t.order === "asc" ? "desc" : "asc";
			o.value = {
				key: e.key,
				order: n
			}, i("sort", {
				key: e.key,
				order: n
			});
		}
		function f(e) {
			return s.value?.key === e.key;
		}
		let h = a(() => {
			let e = s.value;
			if (!e) return r.data;
			let t = e.order === "desc" ? -1 : 1;
			return [...r.data].sort((n, r) => {
				let i = n?.[e.key], a = r?.[e.key];
				return i === a ? 0 : i == null ? 1 : a == null ? -1 : (i > a ? 1 : -1) * t;
			});
		});
		function g(e) {
			let t = s.value;
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
			r.disabled || i("row-click", e, t);
		}
		function x(e) {
			if (typeof e.width == "number") return e.width;
			if (typeof e.width == "string") {
				let t = parseFloat(e.width);
				return Number.isFinite(t) ? t : iw;
			}
			return iw;
		}
		let S = a(() => r.columns.map((e) => e.width === void 0 ? e.fixed ? `${iw}px` : void 0 : typeof e.width == "number" ? `${e.width}px` : e.width)), C = a(() => r.columns.some((e) => !!e.fixed)), w = a(() => {
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
		}), T = a(() => Z("mc-table", "mc-grain-overlay", `mc-table--${r.variant}`, `mc-table--${r.size}`, {
			"mc-recipe-panel": r.variant === "glass",
			"is-striped": r.striped,
			"is-bordered": r.bordered,
			"is-hoverable": r.hoverable,
			"is-disabled": r.disabled
		}, r.customClass)), E = a(() => r.maxHeight === void 0 ? void 0 : { maxHeight: typeof r.maxHeight == "number" ? `${r.maxHeight}px` : r.maxHeight });
		return (n, r) => (P(), l("div", {
			class: D(T.value),
			"aria-disabled": e.disabled ? "true" : void 0
		}, [u("div", {
			class: "mc-table__scroll mc-scroll",
			style: k(E.value)
		}, [u("table", { class: D(["mc-table__table", { "is-fixed-layout": C.value }]) }, [
			e.caption ? (P(), l("caption", GC, H(e.caption), 1)) : c("", !0),
			u("colgroup", null, [(P(!0), l(t, null, R(e.columns, (e, t) => (P(), l("col", {
				key: e.key,
				style: k(S.value[t] ? { width: S.value[t] } : void 0)
			}, null, 4))), 128))]),
			u("thead", KC, [u("tr", qC, [(P(!0), l(t, null, R(e.columns, (e, t) => (P(), l("th", {
				key: e.key,
				scope: "col",
				class: D(["mc-table__th mc-sheen-sweep", {
					"is-sortable": !!e.sortable,
					"is-sorted": f(e),
					"is-fixed": !!e.fixed,
					"is-fixed-left": e.fixed === "left",
					"is-fixed-right": e.fixed === "right"
				}]),
				style: k(w.value[t]),
				"aria-sort": _(e)
			}, [e.sortable ? (P(), l("button", {
				key: 0,
				type: "button",
				class: "mc-table__sort-btn",
				"aria-label": `Sort by ${e.title ?? e.key}`,
				onClick: (t) => d(e)
			}, [u("span", XC, H(e.title ?? e.key), 1), u("span", {
				class: D(["mc-table__sort", {
					"is-asc": g(e) === "asc",
					"is-desc": g(e) === "desc"
				}]),
				"aria-hidden": "true"
			}, [m($, {
				name: "chevron-up",
				size: 14,
				"stroke-width": 2.4
			})], 2)], 8, YC)) : (P(), l("span", ZC, H(e.title ?? e.key), 1))], 14, JC))), 128))])]),
			u("tbody", QC, [(P(!0), l(t, null, R(h.value, (r, i) => (P(), l("tr", {
				key: v(r, i),
				class: "mc-table__row",
				style: k({ "--i": i }),
				tabindex: "0",
				role: "button",
				onClick: (e) => b(r, i),
				onKeydown: [Y(X((e) => b(r, i), ["prevent"]), ["enter"]), Y(X((e) => b(r, i), ["prevent"]), ["space"])]
			}, [(P(!0), l(t, null, R(e.columns, (e, t) => (P(), l("td", {
				key: e.key,
				class: D(["mc-table__cell", [`is-align-${e.align ?? "left"}`, {
					"is-fixed": !!e.fixed,
					"is-fixed-left": e.fixed === "left",
					"is-fixed-right": e.fixed === "right"
				}]]),
				style: k(w.value[t])
			}, [z(n.$slots, e.key, {
				row: r,
				index: i,
				value: y(r, e)
			}, () => [p(H(y(r, e)), 1)], !0)], 6))), 128))], 44, $C))), 128)), e.data.length ? c("", !0) : (P(), l("tr", ew, [u("td", {
				class: "mc-table__empty mc-aurora-inset",
				colspan: e.columns.length,
				role: "status"
			}, [u("span", nw, [m($, {
				name: "box",
				size: 26,
				"stroke-width": 1.6
			})]), u("span", rw, H(e.emptyText), 1)], 8, tw)]))])
		], 2)], 4)], 10, WC));
	}
}), [["__scopeId", "data-v-ea544028"]]), ow = {
	key: 0,
	class: "mc-tabs__grain mc-grain-overlay",
	"aria-hidden": "true"
}, sw = [
	"id",
	"aria-selected",
	"aria-controls",
	"aria-labelledby",
	"aria-disabled",
	"tabindex",
	"onClick",
	"onKeydown"
], cw = ["id"], lw = [
	"aria-label",
	"disabled",
	"onClick"
], uw = ["aria-label"], dw = ["id", "aria-labelledby"], fw = 3, pw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiTabs",
	__name: "Tabs",
	props: /*@__PURE__*/ w({
		tabs: { default: () => [] },
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: r }) {
		let i = e, o = rn(), d = Hn(), f = r, h = K(e, "modelValue"), g = Ln("mc-tabs"), _ = L(null), v = /* @__PURE__ */ new Map(), y = L({
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			ready: !1
		}), b = L(1), x = L(!1), S = L(/* @__PURE__ */ new Set()), C = L(""), w = {
			left: 0,
			top: 0,
			width: 0,
			height: 0,
			ready: !1
		}, O = 0, j = null;
		function M(e, t) {
			t instanceof HTMLElement ? v.set(e, t) : v.delete(e);
		}
		let N = a(() => {
			let e = h.value;
			if (e == null) return i.tabs[0]?.key ?? "";
			if (e === "") return "";
			if (i.tabs.some((t) => t.key === e)) return e;
			let t = C.value;
			return t && i.tabs.some((e) => e.key === t) ? t : e;
		}), F = a(() => i.tabs.map((e) => ({
			tab: e,
			mounted: !i.lazy || S.value.has(e.key)
		}))), I = a(() => typeof i.teleport == "string" ? i.teleport : "body");
		function B(e) {
			return !!e.disabled;
		}
		function V(e) {
			return i.closable && e.closable !== !1;
		}
		function U(e) {
			B(e) || e.key !== h.value && (h.value = e.key, f("change", e.key));
		}
		function G(e, t) {
			if (!e.length) return;
			let n = i.tabs[t - 1];
			return n && e.some((e) => e.key === n.key) ? n : e[0];
		}
		function te(e, t) {
			if (B(e) || i.onClose?.(e.key, t) === !1) return;
			let n = G(i.tabs.filter((e, n) => n !== t), t);
			if (e.key === N.value) {
				let e = n?.key ?? "";
				C.value = e, h.value = e, f("change", e);
			}
			E(J);
		}
		function ne() {
			i.onAdd?.();
		}
		function J() {
			let e = v.get(N.value), t = _.value;
			if (!e || !t) {
				y.value = {
					...y.value,
					ready: !1
				};
				return;
			}
			let n = i.type === "line", r = {
				left: e.offsetLeft,
				top: n ? e.offsetTop + e.offsetHeight : e.offsetTop,
				width: e.offsetWidth,
				height: n ? fw : e.offsetHeight,
				ready: !0
			};
			O && (cancelAnimationFrame(O), O = 0, x.value = !1, b.value = 1, w = {
				...y.value,
				ready: !0
			}), !w.ready || w.width === r.width ? (w = r, y.value = r, b.value = 1) : (x.value = !0, y.value = {
				...r,
				left: w.left,
				top: w.top
			}, b.value = w.width / r.width, E(() => {
				t.offsetWidth, O = requestAnimationFrame(() => {
					O = 0, x.value = !1, y.value = r, b.value = 1, w = r;
				});
			}));
		}
		q([
			N,
			() => i.type,
			() => i.size
		], () => E(J)), q(N, (e) => {
			e && !S.value.has(e) && (S.value = new Set(S.value).add(e));
		}, { immediate: !0 }), q(() => i.lazy, (e) => {
			if (!e) return;
			let t = new Set(S.value);
			for (let e of i.tabs) t.add(e.key);
			S.value = t;
		});
		let ae = new Set(i.tabs.map((e) => e.key));
		q(() => i.tabs, (e) => {
			let t = new Set(e.map((e) => e.key)), n = [...ae].some((e) => !t.has(e));
			ae = t;
			let r = h.value;
			if (n && r && !t.has(r)) {
				let n = C.value, r = (n && t.has(n) ? n : "") || e[0]?.key || "";
				C.value = r, h.value = r, f("change", r);
			}
			E(J);
		}, { deep: !0 }), ee(() => {
			E(J), At && (window.addEventListener("resize", oe), _.value && typeof ResizeObserver < "u" && (j = new ResizeObserver(() => E(J)), j.observe(_.value)));
		}), A(() => {
			At && window.removeEventListener("resize", oe), j?.disconnect(), j = null, O && (cancelAnimationFrame(O), O = 0);
		});
		function oe() {
			E(J);
		}
		function se(e) {
			let t = _.value;
			if (!t || e.deltaY === 0 || e.deltaX !== 0 || t.scrollWidth <= t.clientWidth) return;
			let n = t.scrollWidth - t.clientWidth, r = t.scrollLeft + e.deltaY;
			r <= 0 || r >= n || (e.preventDefault(), t.scrollLeft = r);
		}
		function ce(e) {
			if (![
				"ArrowLeft",
				"ArrowRight",
				"Home",
				"End"
			].includes(e.key)) return;
			let t = i.tabs.filter((e) => !B(e));
			if (!t.length) return;
			e.preventDefault();
			let n = t.findIndex((e) => e.key === N.value), r = n;
			e.key === "ArrowRight" ? r = n + 1 : e.key === "ArrowLeft" ? r = n - 1 : e.key === "Home" ? r = 0 : e.key === "End" && (r = t.length - 1), r < 0 && (r = 0), r >= t.length && (r = t.length - 1);
			let a = t[r];
			a && (U(a), E(() => v.get(a.key)?.focus()));
		}
		let le = a(() => {
			let e = {
				width: `${y.value.width}px`,
				height: `${y.value.height}px`,
				transform: `translate(${y.value.left}px, ${y.value.top}px) scaleX(${b.value})`,
				opacity: +!!y.value.ready
			};
			return x.value && (e.transition = "none"), e;
		}), ue = a(() => Z("mc-tabs", `mc-tabs--${i.type}`, `mc-tabs--${i.size}`, {
			"is-animated": i.animated,
			"is-stretch": i.stretch,
			"mc-tabs--fill": i.fill
		}, i.customClass));
		return (r, i) => (P(), l("div", { class: D(ue.value) }, [u("div", {
			ref_key: "nav",
			ref: _,
			class: D(["mc-tabs__nav", { "mc-recipe-well": e.type === "card" || e.type === "pill" }]),
			role: "tablist",
			"aria-orientation": "horizontal",
			onKeydown: ce,
			onWheel: se
		}, [
			e.type === "card" || e.type === "pill" ? (P(), l("span", ow)) : c("", !0),
			u("span", {
				class: "mc-tabs__indicator",
				style: k(le.value),
				"aria-hidden": "true"
			}, null, 4),
			(P(!0), l(t, null, R(e.tabs, (e, t) => (P(), l("div", {
				id: `${W(g)}-tab-${e.key}`,
				key: e.key,
				ref_for: !0,
				ref: (t) => M(e.key, t),
				role: "tab",
				class: D(["mc-tabs__tab mc-sheen-sweep", {
					"is-active": e.key === N.value,
					"is-disabled": B(e),
					"is-closable": V(e)
				}]),
				"aria-selected": e.key === N.value ? "true" : "false",
				"aria-controls": `${W(g)}-panel-${e.key}`,
				"aria-labelledby": `${W(g)}-label-${e.key}`,
				"aria-disabled": B(e) ? "true" : void 0,
				tabindex: e.key === N.value ? 0 : -1,
				onClick: (t) => U(e),
				onKeydown: [Y(X((t) => U(e), ["prevent"]), ["enter"]), Y(X((t) => U(e), ["prevent"]), ["space"])]
			}, [
				e.icon ? (P(), s($, {
					key: 0,
					name: e.icon,
					size: 16,
					class: "mc-tabs__icon"
				}, null, 8, ["name"])) : c("", !0),
				u("span", {
					id: `${W(g)}-label-${e.key}`,
					class: "mc-tabs__label"
				}, [z(r.$slots, `${e.key}-label`, { tab: e }, () => [p(H(e.label), 1)], !0)], 8, cw),
				V(e) ? (P(), l("button", {
					key: 1,
					class: "mc-tabs__close",
					type: "button",
					"aria-label": W(o).tabs?.close ?? "Close tab",
					disabled: B(e),
					onClick: X((n) => te(e, t), ["stop"]),
					onKeydown: [i[0] || (i[0] = Y(X(() => {}, ["stop"]), ["enter"])), i[1] || (i[1] = Y(X(() => {}, ["stop"]), ["space"]))]
				}, [m($, {
					name: "close",
					size: 16
				})], 40, lw)) : c("", !0)
			], 42, sw))), 128)),
			e.addable ? (P(), l("button", {
				key: 1,
				class: "mc-tabs__add",
				type: "button",
				"aria-label": W(o).tabs?.add ?? "Add tab",
				onClick: ne
			}, [m($, {
				name: "plus",
				size: 16
			})], 8, uw)) : c("", !0)
		], 34), (P(), s(n, {
			to: I.value,
			disabled: !e.teleport
		}, [u("div", T({ class: "mc-tabs__panels" }, W(d)), [(P(!0), l(t, null, R(F.value, (e) => (P(), l(t, { key: `panel-${e.tab.key}` }, [e.mounted ? ie((P(), l("div", {
			key: 0,
			id: `${W(g)}-panel-${e.tab.key}`,
			class: "mc-tabs__panel mc-scroll",
			role: "tabpanel",
			"aria-labelledby": `${W(g)}-tab-${e.tab.key}`,
			tabindex: "0"
		}, [r.$slots[e.tab.key] ? z(r.$slots, e.tab.key, { tab: e.tab }, void 0, !0, 0) : z(r.$slots, "default", { tab: e.tab }, void 0, !0, 1)], 8, dw)), [[re, e.tab.key === N.value]]) : c("", !0)], 64))), 128))], 16)], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-741524c3"]]), mw = ["tabindex", "aria-disabled"], hw = {
	key: 0,
	class: "mc-tag__dot",
	"aria-hidden": "true"
}, gw = { class: "mc-tag__label" }, _w = ["aria-label", "disabled"], vw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let n = e, r = rn(), i = t, o = L(null);
		function d(e) {
			n.focusable && !n.disabled && Et(e, o.value);
		}
		let f = a(() => Z("mc-tag", `mc-tag--${n.variant}`, `mc-tag--${n.color}`, `mc-tag--${n.size}`, {
			"is-round": n.round,
			"is-bordered": n.bordered,
			"is-closable": n.closable,
			"is-focusable": n.focusable,
			"is-disabled": n.disabled
		}, n.customClass));
		return (t, n) => (P(), l("span", {
			ref_key: "root",
			ref: o,
			class: D(f.value),
			tabindex: e.focusable ? 0 : void 0,
			"aria-disabled": e.disabled || void 0,
			onKeydown: X(d, ["self"])
		}, [
			n[1] || (n[1] = u("span", {
				class: "mc-tag__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			e.dot ? (P(), l("span", hw)) : e.icon ? (P(), s($, {
				key: 1,
				name: e.icon,
				class: "mc-tag__icon"
			}, null, 8, ["name"])) : c("", !0),
			u("span", gw, [z(t.$slots, "default", {}, void 0, !0)]),
			e.closable ? (P(), l("button", {
				key: 2,
				class: "mc-tag__close",
				type: "button",
				"aria-label": W(r).tag?.close ?? "close",
				disabled: e.disabled,
				onClick: n[0] || (n[0] = X((e) => i("close"), ["stop"]))
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, _w)) : c("", !0)
		], 42, mw));
	}
}), [["__scopeId", "data-v-8cc8aef7"]]), yw = [
	"value",
	"rows",
	"placeholder",
	"disabled",
	"maxlength",
	"aria-disabled"
], bw = {
	key: 0,
	class: "mc-textarea__footer"
}, xw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiTextarea",
	inheritAttrs: !1,
	__name: "Textarea",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: "" },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"change",
		"focus",
		"blur"
	], ["update:modelValue"]),
	setup(e, { emit: t }) {
		let n = e, r = t, i = K(e, "modelValue"), o = G(), s = a(() => {
			let { class: e, style: t, ...n } = o;
			return n;
		}), d = L(null), f = L(i.value ?? "");
		q(() => i.value, (e) => {
			f.value = e ?? "", x();
		});
		let p = a(() => n.autosize !== !1 && n.autosize !== void 0), m = a(() => {
			let e = n.autosize;
			return typeof e == "object" && e ? e.minRows : n.rows;
		}), h = a(() => {
			let e = n.autosize;
			return typeof e == "object" && e ? e.maxRows : Math.max(n.rows * 6, n.rows);
		}), g = a(() => f.value.length), _ = a(() => n.maxlength ? `${g.value}/${n.maxlength}` : String(g.value)), v = a(() => !!n.maxlength && g.value >= n.maxlength * .9);
		function y() {
			let e = d.value;
			if (!e || !p.value) return;
			let t = getComputedStyle(e), n = parseFloat(t.lineHeight) || 22, r = (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0), i = (parseFloat(t.borderTopWidth) || 0) + (parseFloat(t.borderBottomWidth) || 0), a = m.value * n + r + i, o = h.value * n + r + i;
			e.style.height = "auto";
			let s = e.scrollHeight, c = Math.min(Math.max(s, a), o);
			e.style.height = `${c}px`, e.style.overflowY = s > o ? "auto" : "hidden";
		}
		let b = !1;
		function x() {
			b || (b = !0, E(() => {
				b = !1, y();
			}));
		}
		ee(() => x());
		function S(e) {
			let t = e.target;
			f.value = t.value, i.value = t.value, x();
		}
		function C(e) {
			let t = e.target;
			f.value = t.value, i.value = t.value, r("change", t.value);
		}
		function w(e) {
			r("focus", e);
		}
		function O(e) {
			r("blur", e);
		}
		let A = a(() => Z("mc-textarea", "mc-recipe-well", "mc-sheen-sweep", `mc-textarea--${n.variant}`, `mc-textarea--${n.size}`, {
			"is-disabled": n.disabled,
			"is-autosize": p.value,
			"mc-recipe-well-rim": n.variant === "outlined"
		})), j = a(() => Z(A.value, o.class, n.customClass)), M = a(() => o.style);
		return (t, n) => (P(), l("div", {
			class: D(j.value),
			style: k(M.value)
		}, [
			n[0] || (n[0] = u("span", {
				class: "mc-textarea__grain mc-grain-overlay",
				"aria-hidden": "true"
			}, null, -1)),
			u("textarea", T({
				ref_key: "field",
				ref: d
			}, s.value, {
				class: "mc-textarea__field",
				value: f.value,
				rows: p.value ? m.value : e.rows,
				placeholder: e.placeholder,
				disabled: e.disabled,
				maxlength: e.maxlength,
				"aria-disabled": e.disabled || void 0,
				onInput: S,
				onChange: C,
				onFocus: w,
				onBlur: O
			}), null, 16, yw),
			e.showCount ? (P(), l("div", bw, [u("span", { class: D(["mc-textarea__count", { "is-near": v.value }]) }, H(_.value), 3)])) : c("", !0)
		], 6));
	}
}), [["__scopeId", "data-v-6e86aaa7"]]), Sw = ["href"], Cw = { class: "mc-thing__body mc-aurora-inset" }, ww = { class: "mc-thing__head" }, Tw = {
	class: "mc-thing__title",
	"data-mc-type": "title"
}, Ew = {
	key: 0,
	class: "mc-thing__desc"
}, Dw = {
	key: 1,
	class: "mc-thing__meta"
}, Ow = {
	key: 1,
	class: "mc-thing__value mc-sheen-sweep"
}, kw = { class: "mc-thing__body mc-aurora-inset" }, Aw = { class: "mc-thing__head" }, jw = {
	class: "mc-thing__title",
	"data-mc-type": "title"
}, Mw = {
	key: 0,
	class: "mc-thing__desc"
}, Nw = {
	key: 1,
	class: "mc-thing__meta"
}, Pw = {
	key: 1,
	class: "mc-thing__value mc-sheen-sweep"
}, Fw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = a(() => Z("mc-thing", "mc-grain-overlay", "mc-recipe-sheet", {
			"is-compact": n.compact,
			"is-link": !!n.href
		}, n.customClass));
		return (n, i) => e.href ? (P(), l("a", {
			key: 0,
			href: e.href,
			class: D(r.value)
		}, [
			e.image || e.icon ? (P(), s(er, {
				key: 0,
				src: e.image,
				icon: e.icon,
				size: "medium",
				class: "mc-thing__avatar"
			}, null, 8, ["src", "icon"])) : c("", !0),
			u("div", Cw, [
				u("div", ww, [u("span", Tw, H(e.title), 1), e.statusText ? (P(), l("span", {
					key: 0,
					class: D(["mc-thing__status", `is-${e.status}`])
				}, H(e.statusText), 3)) : c("", !0)]),
				e.description ? (P(), l("p", Ew, H(e.description), 1)) : c("", !0),
				e.meta.length ? (P(), l("dl", Dw, [(P(!0), l(t, null, R(e.meta, (e, t) => (P(), l("div", {
					key: t,
					class: "mc-thing__meta-item"
				}, [u("dt", null, H(e.label), 1), u("dd", null, H(e.value), 1)]))), 128))])) : c("", !0)
			]),
			e.value !== void 0 && e.value !== "" ? (P(), l("span", Ow, H(e.value), 1)) : (P(), s($, {
				key: 2,
				name: "chevron-right",
				size: 16,
				class: "mc-thing__chevron"
			}))
		], 10, Sw)) : (P(), l("div", {
			key: 1,
			class: D(r.value)
		}, [
			e.image || e.icon ? (P(), s(er, {
				key: 0,
				src: e.image,
				icon: e.icon,
				size: "medium",
				class: "mc-thing__avatar"
			}, null, 8, ["src", "icon"])) : c("", !0),
			u("div", kw, [
				u("div", Aw, [u("span", jw, H(e.title), 1), e.statusText ? (P(), l("span", {
					key: 0,
					class: D(["mc-thing__status", `is-${e.status}`])
				}, H(e.statusText), 3)) : c("", !0)]),
				e.description ? (P(), l("p", Mw, H(e.description), 1)) : c("", !0),
				e.meta.length ? (P(), l("dl", Nw, [(P(!0), l(t, null, R(e.meta, (e, t) => (P(), l("div", {
					key: t,
					class: "mc-thing__meta-item"
				}, [u("dt", null, H(e.label), 1), u("dd", null, H(e.value), 1)]))), 128))])) : c("", !0)
			]),
			e.value !== void 0 && e.value !== "" ? (P(), l("span", Pw, H(e.value), 1)) : (P(), s($, {
				key: 2,
				name: "chevron-right",
				size: 16,
				class: "mc-thing__chevron"
			}))
		], 2));
	}
}), [["__scopeId", "data-v-d9b478de"]]), Iw = /* @__PURE__ */ new Set(), Lw, Rw;
function zw() {
	if (At && !document.hidden) for (let e of Iw) e();
}
function Bw() {
	document.hidden || zw();
}
function Vw() {
	At && Lw === void 0 && (Lw = setInterval(zw, 1e3), Rw = Bw, document.addEventListener("visibilitychange", Rw));
}
function Hw() {
	Lw !== void 0 && (clearInterval(Lw), Lw = void 0), Rw && (document.removeEventListener("visibilitychange", Rw), Rw = void 0);
}
function Uw(e) {
	return At ? (Iw.add(e), Vw(), () => {
		Iw.delete(e), Iw.size === 0 && Hw();
	}) : () => {};
}
//#endregion
//#region src/components/time/Time.vue?vue&type=script&setup=true&lang.ts
var Ww = ["datetime"], Gw = {
	key: 0,
	class: "mc-time__dot mc-sheen-sweep",
	"aria-hidden": "true"
}, Kw = { class: "mc-time__text" }, qw = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = L(Date.now()), r, i = null, o = "", s = rn(), d = [
			[864e5, "day"],
			[36e5, "hour"],
			[6e4, "minute"],
			[1e3, "second"]
		];
		function f(e) {
			let t = s.value.name;
			try {
				return (!i || t !== o) && (i = new Intl.PluralRules(t), o = t), i.select(e) === "one" ? "one" : "other";
			} catch {
				return e === 1 ? "one" : "other";
			}
		}
		function p(e) {
			if (e == null || e === "") return null;
			let t = e instanceof Date ? e : new Date(e);
			return Number.isNaN(t.getTime()) ? null : t;
		}
		function m(e) {
			return String(e).padStart(2, "0");
		}
		function h(e) {
			let n = {
				YYYY: String(e.getFullYear()),
				MM: m(e.getMonth() + 1),
				DD: m(e.getDate()),
				HH: m(e.getHours()),
				mm: m(e.getMinutes()),
				ss: m(e.getSeconds())
			};
			return t.format.replace(/YYYY|MM|DD|HH|mm|ss/g, (e) => n[e] ?? e);
		}
		function g(e, t) {
			let n = s.value.time, r = t - e.getTime(), i = Math.abs(r);
			if (i < 5e3) return n.now;
			for (let [e, t] of d) if (i >= e) {
				let a = Math.floor(i / e), o = f(a), s = n[t][o] ?? n[t].other;
				return (r > 0 ? n.ago : n.fromNow).replace("{count}", String(a)).replace("{unit}", s);
			}
			return n.now;
		}
		let _ = a(() => p(t.value));
		function v(e) {
			let n = _.value;
			return n ? t.relative ? g(n, e) : h(n) : "—";
		}
		let y = a(() => v(n.value));
		function b() {
			let e = Date.now();
			v(e) !== y.value && (n.value = e);
		}
		q(() => t.relative || t.live, (e) => {
			e && !r ? r = Uw(b) : !e && r && (r(), r = void 0);
		}, { immediate: !0 }), A(() => {
			r?.(), r = void 0;
		});
		let x = a(() => Z("mc-time", "mc-recipe-well", "mc-grain-overlay", { "is-live": t.live }, t.customClass));
		return (t, n) => (P(), l("time", {
			class: D(x.value),
			datetime: _.value?.toISOString()
		}, [e.live ? (P(), l("span", Gw)) : c("", !0), u("span", Kw, H(y.value), 1)], 10, Ww));
	}
}), [["__scopeId", "data-v-e1e56444"]]), Jw = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], Yw = { class: "mc-time-picker__affix" }, Xw = ["aria-label"], Zw = ["id", "aria-label"], Qw = { class: "mc-time-picker__wheels" }, $w = {
	key: 0,
	class: "mc-time-picker__meridiem"
}, eT = { class: "mc-time-picker__wheel mc-recipe-well" }, tT = ["aria-label"], nT = ["aria-selected"], rT = { class: "mc-time-picker__wheel mc-recipe-well" }, iT = ["aria-label"], aT = ["aria-selected"], oT = { class: "mc-time-picker__wheel mc-recipe-well" }, sT = ["aria-label"], cT = ["aria-selected"], lT = { class: "mc-time-picker__footer" }, uT = { class: "mc-time-picker__readout" }, dT = 34, fT = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiTimePicker",
	__name: "TimePicker",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: { default: null },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), p = rn(), h = Hn(), g = Ln("mc-time-picker"), _ = L(null), v = L(null), y = L(null), b = L(null), x = L(null), S = L(o.open), { isTop: C } = Pn({ active: S }), { style: w, transformOrigin: O, update: j, startAutoUpdate: M, stopAutoUpdate: N } = Cn(_, v, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: S })
		}), F = L(0), I = L(0), z = L(0), B = L("AM"), V = !1, U = 0;
		q(() => o.open, (e) => {
			S.value = e, e ? (fe(), E(() => {
				_e("auto"), j(), M();
			})) : N();
		});
		function G(e) {
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
		function te(e, t) {
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
		let ne = a(() => G(f.value)), re = a(() => {
			let e = o.format;
			return o.use12Hours && (e = e.replace("HH", "hh").replace("H", "h"), /[Aa]/.test(e) || (e = `${e} A`)), e;
		}), ie = a(() => {
			let e = ne.value;
			return e ? te(e, re.value) : "";
		}), ae = a(() => !!ne.value), oe = a(() => o.use12Hours ? Array.from({ length: 12 }, (e, t) => t + 1) : Array.from({ length: 24 }, (e, t) => t)), se = a(() => {
			let e = Math.max(1, Math.min(o.minuteStep, 60)), t = [];
			for (let n = 0; n < 60; n += e) t.push(n);
			return t;
		}), ce = a(() => Array.from({ length: 60 }, (e, t) => t)), le = a(() => {
			if (o.use12Hours) {
				let e = F.value % 12 == 0 ? 12 : F.value % 12;
				return Math.max(oe.value.indexOf(e), 0);
			}
			return Math.max(oe.value.indexOf(F.value), 0);
		}), ue = a(() => Math.max(se.value.indexOf(I.value), 0)), de = a(() => Math.max(ce.value.indexOf(z.value), 0));
		function fe() {
			let e = ne.value ?? /* @__PURE__ */ new Date();
			F.value = e.getHours(), I.value = e.getMinutes(), z.value = e.getSeconds(), B.value = e.getHours() < 12 ? "AM" : "PM";
		}
		function pe(e) {
			o.disabled && e || S.value !== e && (S.value = e, d("update:open", e), e ? (d("open"), fe(), E(() => {
				_e("auto"), j(), M();
			})) : (d("close"), N()));
		}
		function me() {
			pe(!S.value);
		}
		function he(e) {
			if (!S.value) return;
			let t = e.target;
			t && (_.value?.contains(t) || v.value?.contains(t) || pe(!1));
		}
		ee(() => document.addEventListener("mousedown", he)), A(() => {
			document.removeEventListener("mousedown", he), window.clearTimeout(U), N();
		});
		function ge() {
			let e = /* @__PURE__ */ new Date();
			e.setHours(F.value, I.value, z.value, 0), f.value = e, d("change", e);
		}
		function _e(e = "smooth") {
			V = !0, y.value?.scrollTo({
				top: le.value * dT,
				behavior: e
			}), b.value?.scrollTo({
				top: ue.value * dT,
				behavior: e
			}), x.value?.scrollTo({
				top: de.value * dT,
				behavior: e
			}), ve();
		}
		function ve() {
			window.clearTimeout(U), U = window.setTimeout(() => {
				V = !1;
			}, 160);
		}
		function ye(e) {
			if (ve(), V) return;
			let t = e === "hour" ? y.value : e === "minute" ? b.value : x.value;
			if (!t) return;
			let n = Math.round(t.scrollTop / dT);
			if (e === "hour") {
				let e = oe.value[n];
				if (e === void 0) return;
				let t = o.use12Hours ? B.value === "PM" ? e % 12 + 12 : e % 12 : e;
				if (t === F.value) return;
				F.value = t;
			} else if (e === "minute") {
				let e = se.value[n];
				if (e === void 0 || e === I.value) return;
				I.value = e;
			} else {
				let e = ce.value[n];
				if (e === void 0 || e === z.value) return;
				z.value = e;
			}
			ge();
		}
		function be(e, t) {
			if (e === "hour") {
				let e = oe.value, n = e[(le.value + t + e.length) % e.length];
				if (n === void 0) return;
				F.value = o.use12Hours ? B.value === "PM" ? n % 12 + 12 : n % 12 : n;
			} else if (e === "minute") {
				let e = se.value, n = e[(ue.value + t + e.length) % e.length];
				if (n === void 0) return;
				I.value = n;
			} else {
				let e = ce.value, n = e[(de.value + t + e.length) % e.length];
				if (n === void 0) return;
				z.value = n;
			}
			ge(), E(() => _e("smooth"));
		}
		function xe() {
			B.value = B.value === "AM" ? "PM" : "AM", F.value = B.value === "PM" ? F.value % 12 + 12 : F.value % 12, ge();
		}
		function Se() {
			let e = /* @__PURE__ */ new Date();
			F.value = e.getHours(), I.value = e.getMinutes(), z.value = e.getSeconds(), B.value = e.getHours() < 12 ? "AM" : "PM", ge(), E(() => _e("smooth"));
		}
		function Ce() {
			f.value = null, d("change", null);
		}
		function we(e) {
			e.key === "Escape" && S.value && C() ? (e.stopPropagation(), pe(!1)) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), S.value || pe(!0));
		}
		function Te(e) {
			if (e.key === "Escape" && C()) {
				e.stopPropagation();
				let t = v.value?.contains(document.activeElement) ?? !1;
				pe(!1), t && _.value?.focus({ preventScroll: !0 });
			}
		}
		let Ee = a(() => typeof o.teleport == "string" ? o.teleport : "body"), De = a(() => Z("mc-time-picker", `mc-time-picker--${o.variant}`, `mc-time-picker--${o.size}`, {
			"is-open": S.value,
			"is-disabled": o.disabled,
			"is-empty": !ae.value
		}, o.customClass)), Oe = a(() => ({ "mc-recipe-well": o.variant !== "ghost" }));
		return (i, a) => (P(), l("div", { class: D(De.value) }, [u("button", {
			ref_key: "trigger",
			ref: _,
			type: "button",
			class: D(["mc-time-picker__trigger mc-sheen-sweep", Oe.value]),
			disabled: e.disabled,
			"aria-disabled": e.disabled || void 0,
			"aria-expanded": S.value,
			"aria-haspopup": "listbox",
			"aria-controls": W(g),
			onClick: me,
			onKeydown: we
		}, [
			a[11] || (a[11] = u("span", {
				class: "mc-time-picker__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			m($, {
				name: "clock",
				size: 15,
				class: "mc-time-picker__icon"
			}),
			u("span", { class: D(["mc-time-picker__value", { "is-placeholder": !ae.value }]) }, H(ae.value ? ie.value : e.placeholder), 3),
			u("span", Yw, [ae.value ? (P(), l("span", {
				key: 0,
				class: "mc-time-picker__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": W(p).timePicker?.clear ?? "clear",
				onClick: X(Ce, ["stop"])
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, Xw)) : c("", !0)])
		], 42, Jw), (P(), s(n, {
			to: Ee.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [S.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: v,
				class: "mc-time-picker__panel",
				style: W(w)
			}, W(h), {
				id: W(g),
				role: "dialog",
				"aria-label": W(p).timePicker?.picker ?? "time picker",
				onKeydown: Te
			}), [u("div", {
				class: "mc-time-picker__inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(O) })
			}, [u("div", Qw, [
				o.use12Hours ? (P(), l("div", $w, [u("button", {
					type: "button",
					class: D(["mc-time-picker__meridiem-btn", { "is-active": B.value === "AM" }]),
					onClick: a[0] || (a[0] = (e) => B.value === "AM" ? null : xe())
				}, " AM ", 2), u("button", {
					type: "button",
					class: D(["mc-time-picker__meridiem-btn", { "is-active": B.value === "PM" }]),
					onClick: a[1] || (a[1] = (e) => B.value === "PM" ? null : xe())
				}, " PM ", 2)])) : c("", !0),
				u("div", eT, [a[14] || (a[14] = u("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), u("div", {
					ref_key: "hourCol",
					ref: y,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": W(p).timePicker?.hours ?? "hours",
					tabindex: "0",
					onScroll: a[2] || (a[2] = (e) => ye("hour")),
					onKeydown: [a[3] || (a[3] = Y(X((e) => be("hour", -1), ["prevent"]), ["up"])), a[4] || (a[4] = Y(X((e) => be("hour", 1), ["prevent"]), ["down"]))]
				}, [
					a[12] || (a[12] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(P(!0), l(t, null, R(oe.value, (e) => (P(), l("div", {
						key: e,
						class: D(["mc-time-picker__item", { "is-active": e === oe.value[le.value] }]),
						role: "option",
						"aria-selected": e === oe.value[le.value]
					}, H(o.use12Hours ? e : String(e).padStart(2, "0")), 11, nT))), 128)),
					a[13] || (a[13] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, tT)]),
				u("div", rT, [a[17] || (a[17] = u("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), u("div", {
					ref_key: "minuteCol",
					ref: b,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": W(p).timePicker?.minutes ?? "minutes",
					tabindex: "0",
					onScroll: a[5] || (a[5] = (e) => ye("minute")),
					onKeydown: [a[6] || (a[6] = Y(X((e) => be("minute", -1), ["prevent"]), ["up"])), a[7] || (a[7] = Y(X((e) => be("minute", 1), ["prevent"]), ["down"]))]
				}, [
					a[15] || (a[15] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(P(!0), l(t, null, R(se.value, (e) => (P(), l("div", {
						key: e,
						class: D(["mc-time-picker__item", { "is-active": e === se.value[ue.value] }]),
						role: "option",
						"aria-selected": e === se.value[ue.value]
					}, H(String(e).padStart(2, "0")), 11, aT))), 128)),
					a[16] || (a[16] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, iT)]),
				u("div", oT, [a[20] || (a[20] = u("div", {
					class: "mc-time-picker__highlight",
					"aria-hidden": "true"
				}, null, -1)), u("div", {
					ref_key: "secondCol",
					ref: x,
					class: "mc-time-picker__col mc-scroll",
					role: "listbox",
					"aria-label": W(p).timePicker?.seconds ?? "seconds",
					tabindex: "0",
					onScroll: a[8] || (a[8] = (e) => ye("second")),
					onKeydown: [a[9] || (a[9] = Y(X((e) => be("second", -1), ["prevent"]), ["up"])), a[10] || (a[10] = Y(X((e) => be("second", 1), ["prevent"]), ["down"]))]
				}, [
					a[18] || (a[18] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1)),
					(P(!0), l(t, null, R(ce.value, (e) => (P(), l("div", {
						key: e,
						class: D(["mc-time-picker__item", { "is-active": e === ce.value[de.value] }]),
						role: "option",
						"aria-selected": e === ce.value[de.value]
					}, H(String(e).padStart(2, "0")), 11, cT))), 128)),
					a[19] || (a[19] = u("div", {
						class: "mc-time-picker__spacer",
						"aria-hidden": "true"
					}, null, -1))
				], 40, sT)])
			]), u("footer", lT, [u("button", {
				type: "button",
				class: "mc-time-picker__now",
				onClick: Se
			}, [m($, {
				name: "timer",
				size: 13
			}), u("span", null, H(W(p).datePicker.now), 1)]), u("span", uT, H(ie.value), 1)])], 4)], 16, Zw)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-5ab0d3cf"]]), pT = [
	"tabindex",
	"aria-disabled",
	"aria-current",
	"onClick",
	"onKeydown"
], mT = {
	key: 0,
	class: "mc-timeline__index",
	"aria-hidden": "true"
}, hT = {
	key: 2,
	class: "mc-timeline__dot"
}, gT = { class: "mc-timeline__body mc-recipe-sheet" }, _T = { class: "mc-timeline__head mc-sheen-sweep" }, vT = {
	key: 0,
	class: "mc-timeline__title",
	"data-mc-type": "title"
}, yT = {
	key: 1,
	class: "mc-timeline__time"
}, bT = {
	key: 2,
	class: "mc-timeline__action"
}, xT = {
	key: 0,
	class: "mc-timeline__content"
}, ST = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = n, o = a(() => {
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
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), !t.disabled && i("click", t, t.originalIndex));
		}
		function f(e, t) {
			return t.isPending ? "…" : String(e + 1).padStart(2, "0");
		}
		let p = a(() => Z("mc-timeline", `mc-timeline--${r.direction}`, { "is-reverse": r.reverse }, r.customClass));
		return (n, r) => (P(), l("ol", { class: D(p.value) }, [(P(!0), l(t, null, R(o.value, (t, r) => (P(), l("li", {
			key: `${t.originalIndex}-${r}`,
			class: D(["mc-timeline__item", {
				"is-pending": t.isPending,
				"is-active": !!t.active,
				"is-disabled": !!t.disabled,
				"has-icon": !e.numbered && !!(t.icon || e.icon),
				"has-index": e.numbered
			}]),
			style: k({ "--i": r }),
			role: "button",
			tabindex: t.disabled ? -1 : 0,
			"aria-disabled": t.disabled ? "true" : void 0,
			"aria-current": t.active ? "step" : void 0,
			onClick: (e) => t.disabled ? void 0 : i("click", t, t.originalIndex),
			onKeydown: (e) => d(e, t)
		}, [u("span", {
			class: D(["mc-timeline__node", `is-${t.type ?? "default"}`]),
			style: k(t.color ? { "--mc-timeline-color": t.color } : void 0),
			"aria-hidden": "true"
		}, [e.numbered ? (P(), l("span", mT, H(f(r, t)), 1)) : t.icon || e.icon ? (P(), s($, {
			key: 1,
			name: t.icon ?? e.icon ?? "circle",
			size: 13,
			"stroke-width": 2.2
		}, null, 8, ["name"])) : (P(), l("span", hT))], 6), u("div", gT, [
			u("div", _T, [
				t.title ? (P(), l("span", vT, H(t.title), 1)) : c("", !0),
				t.time ? (P(), l("span", yT, H(t.time), 1)) : c("", !0),
				n.$slots.action ? (P(), l("span", bT, [z(n.$slots, "action", {
					item: t,
					index: t.originalIndex
				}, void 0, !0)])) : c("", !0)
			]),
			t.content ? (P(), l("div", xT, H(t.content), 1)) : c("", !0),
			z(n.$slots, "item", {
				item: t,
				index: t.originalIndex
			}, void 0, !0)
		])], 46, pT))), 128))], 2));
	}
}), [["__scopeId", "data-v-41efbbf8"]]), CT = ["role", "tabindex"], wT = {
	key: 0,
	class: "mc-liquid-glass__lens",
	"aria-hidden": "true"
}, TT = {
	key: 1,
	class: "mc-liquid-glass__optics",
	"aria-hidden": "true"
}, ET = ["id"], DT = ["id"], OT = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = te(), d = e, f = i, h = Ln("mc-tooltip"), g = L(null), _ = L(null), v = L(!1), { isTop: y } = Pn({ active: v }), b = L(!1), x = jn({ active: v }), S = Hn(), C = a(() => d.content ?? d.text ?? "");
		function w() {
			return C.value.length > 0 || !!o.content;
		}
		let { selfFocusable: E, innerFocusable: O } = Hy(g, () => j());
		function j() {
			let e = g.value;
			if (!e) return;
			let t = O.value;
			w() ? t ? (t.setAttribute("aria-describedby", h), e.removeAttribute("aria-describedby")) : e.setAttribute("aria-describedby", h) : (e.removeAttribute("aria-describedby"), t && t.removeAttribute("aria-describedby"));
		}
		let M, N, { style: F, coords: I, currentPlacement: R, transformOrigin: B, arrowSide: V, update: U, startAutoUpdate: G, stopAutoUpdate: K } = Cn(g, _, {
			placement: d.placement,
			offset: d.offset,
			zIndex: x
		}), ne = a(() => !d.disabled && v.value);
		q(() => [d.open, d.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (v.value = t) : v.value = e;
		}, { immediate: !0 }), q(ne, (e) => {
			e ? (U(), G()) : K();
		}, { immediate: !0 }), q(C, () => j());
		function re() {
			M !== void 0 && clearTimeout(M), N !== void 0 && clearTimeout(N), M = void 0, N = void 0;
		}
		function ie(e) {
			d.disabled || v.value !== e && (v.value = e, f("update:open", e), f("update:modelValue", e), f(e ? "open" : "close"));
		}
		function Y() {
			d.disabled || (re(), d.delay <= 0 ? ie(!0) : M = setTimeout(() => ie(!0), d.delay));
		}
		function X(e = 80) {
			re(), e <= 0 ? ie(!1) : N = setTimeout(() => ie(!1), e);
		}
		function ae() {
			d.trigger === "hover" && Y();
		}
		function oe() {
			d.trigger === "hover" && X();
		}
		function se() {
			(d.trigger === "focus" || d.trigger === "hover") && Y();
		}
		function ce() {
			(d.trigger === "focus" || d.trigger === "hover") && X(0);
		}
		function le() {
			d.trigger === "click" && ie(!v.value);
		}
		function ue(e) {
			e.key === "Escape" && v.value && y() ? (e.stopPropagation(), ie(!1)) : E.value && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), le());
		}
		function de(e) {
			e.key === "Escape" && v.value && y() && ie(!1);
		}
		ee(() => {
			typeof document < "u" && document.addEventListener("keydown", de);
		}), A(() => {
			re(), typeof document < "u" && document.removeEventListener("keydown", de), O.value?.removeAttribute("aria-describedby"), K();
		}), ml(g, () => ie(!1), { ignore: [_] });
		let fe = a(() => typeof d.teleport == "string" ? d.teleport : "body"), pe = a(() => {
			let e = V.value;
			if (e === "top" || e === "bottom") {
				let e = I.value.arrowX;
				return e === void 0 ? void 0 : { left: `calc(${Math.round(e)}px - var(--mc-arrow-size) / 2)` };
			}
			let t = I.value.arrowY;
			if (t !== void 0) return { top: `calc(${Math.round(t)}px - var(--mc-arrow-size) / 2)` };
		}), me = a(() => `mc-tooltip__arrow--${V.value}`), he = a(() => {
			if (d.maxWidth !== void 0) return typeof d.maxWidth == "number" ? `${d.maxWidth}px` : d.maxWidth;
		}), ge = a(() => Z("mc-tooltip__layer", `mc-tooltip--${R.value}`)), _e = a(() => Z("mc-tooltip", {
			"mc-panel--liquid": d.variant === "liquid",
			"mc-liquid-glass": d.variant === "liquid",
			"mc-liquid-glass--liquid": d.variant === "liquid",
			"mc-liquid-glass--layers": d.variant === "liquid",
			"is-disabled": d.disabled
		}, d.customClass));
		return (i, a) => (P(), l(t, null, [
			u("span", {
				ref_key: "reference",
				ref: g,
				class: D(["mc-tooltip__trigger", { "is-plain": W(E) }]),
				role: W(E) ? "button" : void 0,
				tabindex: W(E) ? 0 : void 0,
				onMouseenter: ae,
				onMouseleave: oe,
				onFocusin: se,
				onFocusout: ce,
				onClick: le,
				onKeydown: ue
			}, [z(i.$slots, "trigger", {}, () => [z(i.$slots, "default", {}, void 0, !0)], !0)], 42, CT),
			(P(), s(n, {
				to: fe.value,
				disabled: !e.teleport
			}, [m(r, {
				name: "mc-float",
				onBeforeLeave: a[0] || (a[0] = (e) => b.value = !0),
				onAfterLeave: a[1] || (a[1] = (e) => b.value = !1)
			}, {
				default: J(() => [ne.value && w() ? (P(), l("div", T({
					key: 0,
					ref_key: "floating",
					ref: _,
					class: ge.value,
					style: W(F)
				}, W(S)), [e.showArrow ? (P(), l("span", {
					key: 0,
					class: D(["mc-tooltip__arrow", me.value]),
					style: k(pe.value),
					"aria-hidden": "true"
				}, null, 6)) : c("", !0), u("div", {
					class: D(_e.value),
					role: "tooltip",
					style: k({
						maxWidth: he.value,
						transformOrigin: W(B)
					})
				}, [
					e.variant === "liquid" ? (P(), l("span", wT)) : c("", !0),
					e.variant === "liquid" ? (P(), l("span", TT)) : c("", !0),
					u("span", {
						id: W(h),
						class: "mc-tooltip__content"
					}, [z(i.$slots, "content", {}, () => [p(H(C.value), 1)], !0)], 8, ET)
				], 6)], 16)) : c("", !0)]),
				_: 3
			})], 8, ["to", "disabled"])),
			!ne.value && !b.value && w() ? (P(), l("span", {
				key: 0,
				id: W(h),
				class: "mc-visually-hidden",
				role: "tooltip"
			}, [z(i.$slots, "content", {}, () => [p(H(C.value), 1)], !0)], 8, DT)) : c("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-1ee1c5fa"]]), kT = ["aria-labelledby"], AT = ["aria-label"], jT = ["id"], MT = { class: "mc-tour__content" }, NT = { class: "mc-tour__footer" }, PT = {
	key: 0,
	class: "mc-tour__progress"
}, FT = { class: "mc-tour__counter" }, IT = { class: "mc-tour__dots" }, LT = { class: "mc-tour__actions" }, RT = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: i }) {
		let o = e, d = rn(), f = Hn(), h = i, g = Ln("mc-tour"), _ = L(!1), v = jn({ active: _ }), y = L(0), b = L(null), x = L(null), S = L({
			w: 320,
			h: 180
		}), C = L({
			x: 0,
			y: 0
		}), w = L({
			x: 0,
			y: 0,
			side: "top"
		}), O = L({
			top: 0,
			left: 0,
			width: 0,
			height: 0
		});
		q(() => [o.open, o.modelValue], ([e, t]) => {
			e === void 0 ? t !== void 0 && (_.value = t) : _.value = e;
		}, { immediate: !0 });
		let j = a(() => _.value && o.steps.length > 0), { isTop: M, isTopModal: N } = Pn({
			active: j,
			modal: !0
		});
		Ic({
			enabled: j,
			container: b,
			isTop: N
		});
		let F = a(() => o.steps[y.value] ?? null), I = a(() => y.value <= 0), B = a(() => y.value >= o.steps.length - 1), V = a(() => o.steps.length > 0 ? (y.value + 1) / o.steps.length : 0);
		function U(e) {
			if (!e) return null;
			let t = e.target;
			return typeof t == "string" ? typeof document > "u" ? null : document.querySelector(t) : t ?? null;
		}
		function G() {
			let e = x.value;
			if (!e) {
				O.value = {
					top: 0,
					left: 0,
					width: 0,
					height: 0
				};
				return;
			}
			let t = e.getBoundingClientRect();
			O.value = {
				top: t.top,
				left: t.left,
				width: t.width,
				height: t.height
			};
		}
		function K() {
			let e = b.value;
			if (!e) return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (S.value = {
				w: t.width,
				h: t.height
			});
		}
		function te() {
			G(), K();
			let e = F.value?.placement ?? "bottom", t = typeof window > "u" ? 1024 : window.innerWidth, n = typeof window > "u" ? 768 : window.innerHeight, r = S.value.w, i = S.value.h, a = O.value;
			if (!x.value || a.width === 0) {
				C.value = {
					x: Math.max(12, (t - r) / 2),
					y: Math.max(12, (n - i) / 2)
				}, w.value = {
					x: 0,
					y: 0,
					side: "top"
				};
				return;
			}
			let o = a.left + a.width / 2, s = a.top + a.height / 2, c = 0, l = 0, u = "top";
			e === "top" ? (c = o - r / 2, l = a.top - i - 18, u = "bottom") : e === "left" ? (c = a.left - r - 18, l = s - i / 2, u = "right") : e === "right" ? (c = a.left + a.width + 18, l = s - i / 2, u = "left") : (c = o - r / 2, l = a.top + a.height + 18, u = "top"), c = Math.min(Math.max(12, c), Math.max(12, t - r - 12)), l = Math.min(Math.max(12, l), Math.max(12, n - i - 12)), C.value = {
				x: c,
				y: l
			};
			let d = Math.min(Math.max(16, o - c), Math.max(16, r - 16)), f = Math.min(Math.max(16, s - l), Math.max(16, i - 16));
			w.value = {
				x: d,
				y: f,
				side: u
			};
		}
		function ne() {
			let e = x.value;
			e && typeof e.scrollIntoView == "function" && e.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "center"
			});
		}
		function re() {
			At && (x.value = U(F.value), E(() => {
				ne(), window.setTimeout(te, 220), te();
			}));
		}
		q(y, () => {
			re(), h("change", y.value);
		}), q(() => o.steps, () => {
			y.value >= o.steps.length && (y.value = Math.max(0, o.steps.length - 1)), re();
		}), q(j, (e) => {
			e ? (y.value = 0, re(), h("open")) : h("close");
		});
		function ie(e) {
			_.value !== e && (_.value = e, h("update:open", e), h("update:modelValue", e));
		}
		function Y() {
			ie(!1);
		}
		function X() {
			B.value ? (h("finish"), Y()) : y.value += 1;
		}
		function ae() {
			I.value || --y.value;
		}
		function oe(e) {
			j.value && M() && (e.target?.closest("button, a[href], input, select, textarea, [contenteditable=\"true\"]") && e.key === "Enter" || (e.key === "Escape" ? (e.stopPropagation(), Y()) : e.key === "ArrowRight" || e.key === "Enter" ? X() : e.key === "ArrowLeft" && ae()));
		}
		function se() {
			te();
		}
		ee(() => {
			typeof document < "u" && (document.addEventListener("keydown", oe), window.addEventListener("scroll", se, !0), window.addEventListener("resize", se)), j.value && re();
		}), A(() => {
			typeof document < "u" && (document.removeEventListener("keydown", oe), window.removeEventListener("scroll", se, !0), window.removeEventListener("resize", se));
		});
		let ce = a(() => ({
			transform: `translate3d(${Math.round(O.value.left - o.maskPadding)}px, ${Math.round(O.value.top - o.maskPadding)}px, 0)`,
			width: `${O.value.width + o.maskPadding * 2}px`,
			height: `${O.value.height + o.maskPadding * 2}px`,
			display: O.value.width > 0 ? "block" : "none"
		})), le = a(() => ({ transform: `translate3d(${Math.round(C.value.x)}px, ${Math.round(C.value.y)}px, 0)` })), ue = a(() => {
			let { x: e, y: t, side: n } = w.value;
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
		}), de = a(() => Z("mc-tour", o.customClass));
		return (i, a) => (P(), s(n, { to: "body" }, [m(r, { name: "mc-tour" }, {
			default: J(() => [j.value ? (P(), l("div", T({
				key: 0,
				class: de.value,
				style: { "--mc-layer-z": W(v) }
			}, W(f)), [
				e.mask ? (P(), l("div", {
					key: 0,
					class: "mc-tour__scrim",
					style: k(ce.value),
					"aria-hidden": "true"
				}, null, 4)) : c("", !0),
				u("div", {
					class: "mc-tour__spotlight",
					style: k(ce.value),
					"aria-hidden": "true"
				}, null, 4),
				u("div", {
					class: "mc-tour__wrap",
					style: k(le.value)
				}, [O.value.width > 0 ? (P(), l("span", {
					key: 0,
					class: "mc-tour__arrow",
					style: k(ue.value),
					"aria-hidden": "true"
				}, null, 4)) : c("", !0), u("div", {
					ref_key: "panel",
					ref: b,
					class: "mc-tour__panel mc-recipe-panel mc-grain-overlay",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": W(g)
				}, [
					e.showProgress ? (P(), l("span", {
						key: 0,
						class: "mc-tour__bar",
						style: k({ transform: `scaleX(${V.value})` }),
						"aria-hidden": "true"
					}, null, 4)) : c("", !0),
					u("button", {
						type: "button",
						class: "mc-tour__close",
						"aria-label": W(d).tour?.end ?? "End tour",
						onClick: Y
					}, [m($, {
						name: "close",
						size: 13,
						"stroke-width": 2.4
					})], 8, AT),
					u("h3", {
						id: W(g),
						class: "mc-tour__title",
						"data-mc-type": "title"
					}, H(F.value?.title), 9, jT),
					u("div", MT, [z(i.$slots, "default", {
						step: F.value,
						index: y.value
					}, () => [p(H(F.value?.content), 1)], !0)]),
					u("div", NT, [e.showProgress ? (P(), l("div", PT, [u("span", FT, H(y.value + 1) + " / " + H(e.steps.length), 1), u("span", IT, [(P(!0), l(t, null, R(e.steps, (e, t) => (P(), l("span", {
						key: t,
						class: D(["mc-tour__dot", { "is-active": t === y.value }])
					}, null, 2))), 128))])])) : c("", !0), u("div", LT, [m(qr, {
						size: "small",
						variant: "soft",
						disabled: I.value,
						onClick: ae
					}, {
						default: J(() => [p(H(e.prevText), 1)]),
						_: 1
					}, 8, ["disabled"]), m(qr, {
						size: "small",
						variant: "solid",
						color: "accent",
						onClick: X
					}, {
						default: J(() => [p(H(B.value ? e.finishText : e.nextText), 1)]),
						_: 1
					})])])
				], 8, kT)], 4)
			], 16)) : c("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-fe6f9e0e"]]), zT = ["aria-label"], BT = { class: "mc-transfer__head" }, VT = {
	key: 0,
	class: "mc-transfer__search mc-recipe-well"
}, HT = ["placeholder", "aria-label"], UT = {
	key: 1,
	class: "mc-transfer__title",
	"data-mc-type": "title"
}, WT = { class: "mc-transfer__check" }, GT = [
	"checked",
	"disabled",
	"aria-label"
], KT = { class: "mc-transfer__count" }, qT = ["aria-label"], JT = [
	"data-index",
	"aria-selected",
	"aria-disabled",
	"aria-posinset",
	"aria-setsize",
	"tabindex",
	"onClick",
	"onKeydown"
], YT = { class: "mc-transfer__label" }, XT = {
	key: 0,
	class: "mc-transfer__empty"
}, ZT = { class: "mc-transfer__controls" }, QT = ["disabled", "aria-label"], $T = ["disabled", "aria-label"], eE = ["aria-label"], tE = { class: "mc-transfer__head" }, nE = {
	key: 0,
	class: "mc-transfer__search mc-recipe-well"
}, rE = ["placeholder", "aria-label"], iE = {
	key: 1,
	class: "mc-transfer__title",
	"data-mc-type": "title"
}, aE = { class: "mc-transfer__check" }, oE = [
	"checked",
	"disabled",
	"aria-label"
], sE = { class: "mc-transfer__count" }, cE = ["aria-label"], lE = [
	"data-index",
	"aria-selected",
	"aria-disabled",
	"aria-posinset",
	"aria-setsize",
	"tabindex",
	"onClick",
	"onKeydown"
], uE = { class: "mc-transfer__label" }, dE = {
	key: 0,
	class: "mc-transfer__empty"
}, fE = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiTransfer",
	__name: "Transfer",
	props: /*@__PURE__*/ w({
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
		customClass: {},
		virtual: {
			type: [Boolean, Object],
			default: !1
		}
	}, {
		modelValue: { default: () => [] },
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w(["change"], ["update:modelValue"]),
	setup(e, { emit: n }) {
		let r = e, o = n, d = K(e, "modelValue"), f = rn(), p = L(""), h = L(""), g = L(/* @__PURE__ */ new Set()), _ = L(/* @__PURE__ */ new Set()), v = L("right"), y = a(() => d.value ?? []), b = a(() => new Set(y.value)), x = a(() => r.leftTitle ?? r.titles?.[0] ?? f.value.transfer.source), S = a(() => r.rightTitle ?? r.titles?.[1] ?? f.value.transfer.target);
		function C(e, t) {
			return !t.trim() || e.label.toLowerCase().includes(t.trim().toLowerCase());
		}
		let w = a(() => r.data.filter((e) => !b.value.has(e.key) && C(e, p.value))), T = a(() => r.data.filter((e) => b.value.has(e.key) && C(e, h.value))), O = a(() => w.value.filter((e) => !e.disabled)), j = a(() => T.value.filter((e) => !e.disabled)), M = a(() => O.value.length > 0 && O.value.every((e) => g.value.has(e.key))), N = a(() => j.value.length > 0 && j.value.every((e) => _.value.has(e.key)));
		function F(e, t, n) {
			if (r.disabled || n) return;
			let i = new Set(e);
			i.has(t) ? i.delete(t) : i.add(t), e === g.value ? g.value = i : _.value = i;
		}
		function I(e) {
			if (r.disabled) return;
			let t = e === "left" ? O.value : j.value, n = e === "left" ? g.value : _.value, i = /* @__PURE__ */ new Set();
			if (!t.every((e) => n.has(e.key))) for (let e of t) i.add(e.key);
			e === "left" ? g.value = i : _.value = i;
		}
		function z() {
			if (r.disabled || !g.value.size) return;
			let e = [...g.value].filter((e) => w.value.some((t) => t.key === e && !t.disabled));
			if (!e.length) return;
			v.value = "right";
			let t = [...y.value], n = new Set(t);
			for (let r of e) n.has(r) || (n.add(r), t.push(r));
			d.value = t, o("change", t), g.value = /* @__PURE__ */ new Set();
		}
		function B() {
			if (r.disabled || !_.value.size) return;
			let e = [..._.value].filter((e) => T.value.some((t) => t.key === e && !t.disabled));
			if (!e.length) return;
			v.value = "left";
			let t = new Set(e), n = y.value.filter((e) => !t.has(e));
			d.value = n, o("change", n), _.value = /* @__PURE__ */ new Set();
		}
		q(() => d.value, () => {
			let e = new Set(w.value.map((e) => e.key)), t = new Set(T.value.map((e) => e.key));
			g.value = new Set([...g.value].filter((t) => e.has(t))), _.value = new Set([..._.value].filter((e) => t.has(e)));
		});
		let V = a(() => r.virtual ? typeof r.virtual == "object" ? r.virtual : {} : null), U = a(() => !!V.value);
		function G(e, t) {
			let n = L(null), i = L(0), o = L(0), s = L(0), c = L(0), l = L(null), u = a(() => e().length), d = a(() => {
				let e = V.value?.rowHeight;
				return e ? Math.max(16, e) + c.value : s.value || 40;
			}), f = a(() => Math.max(0, V.value?.overscan ?? 6)), p = a(() => {
				if (!U.value || !u.value) return null;
				let e = d.value, t = Math.max(0, Math.floor(i.value / e) - f.value), n = Math.ceil((i.value + Math.max(o.value, e)) / e) + 1;
				return {
					start: t,
					end: Math.min(u.value, t + n + f.value)
				};
			}), m = a(() => {
				let t = e(), n = p.value;
				return n ? t.slice(n.start, n.end).map((e, t) => ({
					item: e,
					index: n.start + t
				})) : t.map((e, t) => ({
					item: e,
					index: t
				}));
			}), h = a(() => {
				let e = p.value;
				if (!e) return null;
				let t = d.value;
				return {
					top: e.start > 0 ? e.start * t : 0,
					bottom: e.end < u.value ? (u.value - e.end) * t : 0
				};
			}), g = a(() => {
				let e = l.value;
				return e !== null && m.value.some((t) => t.item.key === e) ? e : m.value[0]?.item.key ?? null;
			});
			function _() {
				let e = n.value;
				if (!e || (o.value = e.clientHeight, i.value = e.scrollTop, !U.value)) return;
				let t = e.querySelector(".mc-transfer__rows");
				if (t) {
					let e = Number.parseFloat(getComputedStyle(t).rowGap);
					c.value = Number.isFinite(e) ? Math.max(0, e) : 0;
				}
				if (V.value?.rowHeight) return;
				let r = e.querySelectorAll("[data-index]"), a = r[0], l = r[1];
				if (a) {
					if (l) {
						let e = l.offsetTop - a.offsetTop;
						e > 0 && (s.value = e);
					} else a.offsetHeight && (s.value = a.offsetHeight);
				}
			}
			function v() {
				let e = n.value;
				e && (i.value = e.scrollTop);
			}
			function y(e) {
				let t = n.value;
				if (!t || !U.value) return;
				let r = d.value, a = e * r;
				a < t.scrollTop ? t.scrollTop = Math.max(0, a - r) : a + r > t.scrollTop + t.clientHeight && (t.scrollTop = a + r - t.clientHeight), i.value = t.scrollTop;
			}
			function b(t) {
				let r = e()[t];
				r && (l.value = r.key, y(t), E(() => {
					let e = n.value;
					e && (e.querySelector(`[data-index="${t}"]`) ?? e.querySelector("[role=\"option\"][tabindex=\"0\"]"))?.focus();
				}));
			}
			function x(n) {
				let r = e().find((e) => e.key === n);
				r && F(t.value, n, r.disabled);
			}
			function S(e, t) {
				r.disabled || (e.currentTarget?.focus({ preventScroll: !0 }), l.value = t, x(t));
			}
			function C(t, n) {
				if (r.disabled) return;
				let i = e(), a = i.findIndex((e) => e.key === n);
				if (a < 0) return;
				let s = d.value, c = Math.max(1, Math.floor(Math.max(o.value, s) / s) - 1);
				switch (t.key) {
					case "ArrowDown":
						t.preventDefault(), b(Math.min(i.length - 1, a + 1));
						break;
					case "ArrowUp":
						t.preventDefault(), b(Math.max(0, a - 1));
						break;
					case "Home":
						t.preventDefault(), b(0);
						break;
					case "End":
						t.preventDefault(), b(i.length - 1);
						break;
					case "PageDown":
						t.preventDefault(), b(Math.min(i.length - 1, a + c));
						break;
					case "PageUp":
						t.preventDefault(), b(Math.max(0, a - c));
						break;
					case " ":
					case "Spacebar":
					case "Enter": t.preventDefault(), x(n);
				}
			}
			let w;
			function T() {
				if (typeof ResizeObserver > "u") return;
				let e = n.value;
				e && (w?.disconnect(), w = new ResizeObserver(() => _()), w.observe(e));
			}
			return ee(() => {
				U.value && E(() => {
					_(), T();
				});
			}), A(() => w?.disconnect()), q(U, (e) => {
				e ? E(() => {
					_(), T();
				}) : (w?.disconnect(), w = void 0, s.value = 0, c.value = 0, i.value = 0);
			}), q(u, () => {
				U.value && E(() => {
					let e = n.value;
					if (!e) return;
					let t = Math.max(0, e.scrollHeight - e.clientHeight);
					e.scrollTop > t && (e.scrollTop = t), _();
				});
			}), {
				el: n,
				rows: m,
				spacers: h,
				tabbableKey: g,
				onScroll: v,
				selectRow: S,
				onRowKeydown: C
			};
		}
		let { el: te, rows: re, spacers: Y, tabbableKey: X, onScroll: ae, selectRow: oe, onRowKeydown: se } = G(() => w.value, g), { el: ce, rows: le, spacers: ue, tabbableKey: de, onScroll: fe, selectRow: pe, onRowKeydown: me } = G(() => T.value, _), he = a(() => Z("mc-transfer", `mc-transfer--${r.size}`, { "is-disabled": r.disabled }, r.customClass));
		return (n, r) => (P(), l("div", { class: D(he.value) }, [
			u("section", {
				class: "mc-transfer__panel mc-grain-overlay mc-recipe-panel",
				"aria-label": x.value
			}, [
				u("header", BT, [e.filterable ? (P(), l("label", VT, [m($, {
					name: "search",
					size: 13,
					class: "mc-transfer__search-icon"
				}), ie(u("input", {
					"onUpdate:modelValue": r[0] || (r[0] = (e) => p.value = e),
					type: "search",
					class: "mc-transfer__search-input",
					placeholder: W(f).transfer.search ?? "Search",
					"aria-label": W(f).transfer.searchSource ?? "search source"
				}, null, 8, HT), [[ne, p.value]])])) : (P(), l("span", UT, H(x.value), 1)), u("label", WT, [
					u("input", {
						type: "checkbox",
						checked: M.value,
						disabled: e.disabled || !O.value.length,
						"aria-label": W(f).transfer.selectAllSource ?? "select all source",
						onChange: r[1] || (r[1] = (e) => I("left"))
					}, null, 40, GT),
					u("span", { class: D(["mc-transfer__box", { "is-checked": M.value }]) }, [M.value ? (P(), s($, {
						key: 0,
						name: "check",
						size: 10,
						"stroke-width": 3
					})) : c("", !0)], 2),
					u("span", KT, H(w.value.length), 1)
				])]),
				u("div", {
					ref_key: "leftListEl",
					ref: te,
					class: "mc-transfer__list",
					role: "listbox",
					"aria-multiselectable": "true",
					"aria-label": x.value,
					onScrollPassive: r[2] || (r[2] = (...e) => W(ae) && W(ae)(...e))
				}, [
					W(Y) && W(Y).top > 0 ? (P(), l("div", {
						key: 0,
						class: "mc-transfer__spacer",
						style: k({ height: W(Y).top + "px" }),
						"aria-hidden": "true"
					}, null, 4)) : c("", !0),
					m(i, {
						tag: "div",
						class: "mc-transfer__rows",
						role: "presentation",
						name: v.value === "right" ? "mc-move-right" : "mc-move-left",
						css: !U.value
					}, {
						default: J(() => [(P(!0), l(t, null, R(W(re), (t) => (P(), l("div", {
							key: t.item.key,
							"data-index": t.index,
							class: D(["mc-transfer__row", {
								"is-disabled": t.item.disabled || e.disabled,
								"is-checked": g.value.has(t.item.key)
							}]),
							role: "option",
							"aria-selected": g.value.has(t.item.key),
							"aria-disabled": t.item.disabled || e.disabled ? "true" : void 0,
							"aria-posinset": t.index + 1,
							"aria-setsize": w.value.length,
							tabindex: !e.disabled && W(X) === t.item.key ? 0 : -1,
							onClick: (e) => W(oe)(e, t.item.key),
							onKeydown: (e) => W(se)(e, t.item.key)
						}, [u("span", {
							class: D(["mc-transfer__box", { "is-checked": g.value.has(t.item.key) }]),
							"aria-hidden": "true"
						}, [g.value.has(t.item.key) ? (P(), s($, {
							key: 0,
							name: "check",
							size: 10,
							"stroke-width": 3
						})) : c("", !0)], 2), u("span", YT, H(t.item.label), 1)], 42, JT))), 128))]),
						_: 1
					}, 8, ["name", "css"]),
					W(Y) && W(Y).bottom > 0 ? (P(), l("div", {
						key: 1,
						class: "mc-transfer__spacer",
						style: k({ height: W(Y).bottom + "px" }),
						"aria-hidden": "true"
					}, null, 4)) : c("", !0)
				], 40, qT),
				w.value.length ? c("", !0) : (P(), l("p", XT, H(W(f).empty.text), 1))
			], 8, zT),
			u("div", ZT, [u("button", {
				type: "button",
				class: "mc-transfer__btn mc-sheen-sweep mc-recipe-panel",
				disabled: e.disabled || !g.value.size,
				"aria-label": W(f).transfer.moveToTarget ?? "move to target",
				onClick: z
			}, [m($, {
				name: "chevron-right",
				size: 15,
				class: "mc-transfer__btn-icon"
			})], 8, QT), u("button", {
				type: "button",
				class: "mc-transfer__btn mc-sheen-sweep mc-recipe-panel",
				disabled: e.disabled || !_.value.size,
				"aria-label": W(f).transfer.moveToSource ?? "move to source",
				onClick: B
			}, [m($, {
				name: "chevron-left",
				size: 15,
				class: "mc-transfer__btn-icon"
			})], 8, $T)]),
			u("section", {
				class: "mc-transfer__panel mc-grain-overlay mc-recipe-panel",
				"aria-label": S.value
			}, [
				u("header", tE, [e.filterable ? (P(), l("label", nE, [m($, {
					name: "search",
					size: 13,
					class: "mc-transfer__search-icon"
				}), ie(u("input", {
					"onUpdate:modelValue": r[3] || (r[3] = (e) => h.value = e),
					type: "search",
					class: "mc-transfer__search-input",
					placeholder: W(f).transfer.search ?? "Search",
					"aria-label": W(f).transfer.searchTarget ?? "search target"
				}, null, 8, rE), [[ne, h.value]])])) : (P(), l("span", iE, H(S.value), 1)), u("label", aE, [
					u("input", {
						type: "checkbox",
						checked: N.value,
						disabled: e.disabled || !j.value.length,
						"aria-label": W(f).transfer.selectAllTarget ?? "select all target",
						onChange: r[4] || (r[4] = (e) => I("right"))
					}, null, 40, oE),
					u("span", { class: D(["mc-transfer__box", { "is-checked": N.value }]) }, [N.value ? (P(), s($, {
						key: 0,
						name: "check",
						size: 10,
						"stroke-width": 3
					})) : c("", !0)], 2),
					u("span", sE, H(T.value.length), 1)
				])]),
				u("div", {
					ref_key: "rightListEl",
					ref: ce,
					class: "mc-transfer__list",
					role: "listbox",
					"aria-multiselectable": "true",
					"aria-label": S.value,
					onScrollPassive: r[5] || (r[5] = (...e) => W(fe) && W(fe)(...e))
				}, [
					W(ue) && W(ue).top > 0 ? (P(), l("div", {
						key: 0,
						class: "mc-transfer__spacer",
						style: k({ height: W(ue).top + "px" }),
						"aria-hidden": "true"
					}, null, 4)) : c("", !0),
					m(i, {
						tag: "div",
						class: "mc-transfer__rows",
						role: "presentation",
						name: v.value === "right" ? "mc-move-right" : "mc-move-left",
						css: !U.value
					}, {
						default: J(() => [(P(!0), l(t, null, R(W(le), (t) => (P(), l("div", {
							key: t.item.key,
							"data-index": t.index,
							class: D(["mc-transfer__row", {
								"is-disabled": t.item.disabled || e.disabled,
								"is-checked": _.value.has(t.item.key)
							}]),
							role: "option",
							"aria-selected": _.value.has(t.item.key),
							"aria-disabled": t.item.disabled || e.disabled ? "true" : void 0,
							"aria-posinset": t.index + 1,
							"aria-setsize": T.value.length,
							tabindex: !e.disabled && W(de) === t.item.key ? 0 : -1,
							onClick: (e) => W(pe)(e, t.item.key),
							onKeydown: (e) => W(me)(e, t.item.key)
						}, [u("span", {
							class: D(["mc-transfer__box", { "is-checked": _.value.has(t.item.key) }]),
							"aria-hidden": "true"
						}, [_.value.has(t.item.key) ? (P(), s($, {
							key: 0,
							name: "check",
							size: 10,
							"stroke-width": 3
						})) : c("", !0)], 2), u("span", uE, H(t.item.label), 1)], 42, lE))), 128))]),
						_: 1
					}, 8, ["name", "css"]),
					W(ue) && W(ue).bottom > 0 ? (P(), l("div", {
						key: 1,
						class: "mc-transfer__spacer",
						style: k({ height: W(ue).bottom + "px" }),
						"aria-hidden": "true"
					}, null, 4)) : c("", !0)
				], 40, cE),
				T.value.length ? c("", !0) : (P(), l("p", dE, H(W(f).empty.text), 1))
			], 8, eE)
		], 2));
	}
}), [["__scopeId", "data-v-5e82a538"]]), pE = ["aria-label"], mE = ["aria-label", "aria-valuenow"], hE = { class: "mc-transport__keys" }, gE = [
	"aria-label",
	"title",
	"disabled"
], _E = [
	"aria-label",
	"title",
	"disabled"
], vE = [
	"aria-label",
	"title",
	"disabled"
], yE = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		}, i = e, o = t, s = a(() => Math.round(Pt(Number(i.progress) || 0, 0, 100))), d = a(() => ({ "--mc-tp": String(Pt(Number(i.progress) || 0, 0, 100) / 100) })), f = a(() => n[i.size] ?? n.medium);
		a(() => r[i.size] ?? r.medium);
		let p = a(() => i.playing ? i.pauseLabel : i.playLabel), h = a(() => i.playing ? "pause" : "play");
		function g() {
			i.disabled || o("prev");
		}
		function _() {
			i.disabled || o("next");
		}
		function v() {
			i.disabled || (o("toggle"), i.playing ? o("pause") : o("play"));
		}
		let y = a(() => Z("mc-transport", `mc-transport--${i.size}`, {
			"is-disabled": i.disabled,
			"is-playing": i.playing
		}, i.customClass));
		return (t, n) => (P(), l("div", {
			class: D(y.value),
			role: "group",
			"aria-label": e.label
		}, [e.showProgress ? (P(), l("div", {
			key: 0,
			class: "mc-transport__progress mc-recipe-well",
			role: "progressbar",
			"aria-label": e.progressLabel,
			"aria-valuenow": s.value,
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}, [u("span", {
			class: "mc-transport__progress-fill",
			style: k(d.value)
		}, null, 4)], 8, mE)) : c("", !0), u("div", hE, [
			u("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--prev",
				"aria-label": e.prevLabel,
				title: e.prevLabel,
				disabled: e.disabled,
				onClick: g
			}, [m($, {
				name: "skip-back",
				size: f.value
			}, null, 8, ["size"])], 8, gE),
			u("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--play mc-sheen-sweep",
				"aria-label": p.value,
				title: p.value,
				disabled: e.disabled,
				onClick: v
			}, [
				n[0] || (n[0] = u("span", {
					class: "mc-transport__play-aurora",
					"aria-hidden": "true"
				}, null, -1)),
				n[1] || (n[1] = u("span", {
					class: "mc-transport__play-grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				m($, {
					class: "mc-transport__play-glyph",
					name: h.value,
					size: f.value
				}, null, 8, ["name", "size"])
			], 8, _E),
			u("button", {
				type: "button",
				class: "mc-transport__key mc-transport__key--next",
				"aria-label": e.nextLabel,
				title: e.nextLabel,
				disabled: e.disabled,
				onClick: _
			}, [m($, {
				name: "skip-forward",
				size: f.value
			}, null, 8, ["size"])], 8, vE)
		])], 10, pE));
	}
}), [["__scopeId", "data-v-467d04dd"]]), bE = ["aria-multiselectable"], xE = [
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
], SE = {
	key: 0,
	class: "mc-tree__guides",
	"aria-hidden": "true"
}, CE = { class: "mc-tree__content mc-sheen-sweep" }, wE = [
	"aria-expanded",
	"aria-label",
	"onClick"
], TE = {
	key: 1,
	class: "mc-tree__chevron mc-tree__chevron--leaf",
	"aria-hidden": "true"
}, EE = [
	"checked",
	".indeterminate",
	"disabled",
	"aria-label",
	"onChange"
], DE = ["title"], OE = {
	key: 4,
	class: "mc-tree__extra"
}, kE = {
	key: 2,
	class: "mc-tree__empty mc-aurora-inset",
	role: "status"
}, AE = { class: "mc-tree__empty-text" }, jE = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { emit: n }) {
		let r = e, i = rn(), o = n;
		function d(e, t, n) {
			return e?.[r.nodeKey] ?? `${t}.${n}`;
		}
		let f = L(null);
		q(() => r.data, () => {
			f.value = null;
		});
		let h = a(() => f.value ?? r.data);
		function g(e, t, n, r) {
			return e.map((i, a) => {
				let o = {
					node: i,
					key: d(i, r, a),
					children: [],
					parent: t,
					depth: n,
					posInSet: a + 1,
					setSize: e.length
				};
				return o.children = g(i?.children ?? [], o, n + 1, `${r}.${a}`), o;
			});
		}
		let _ = a(() => g(h.value, null, 0, "root")), v = L([]), y = !1;
		q(() => r.data, () => {
			y || r.expandedKeys || (y = !0, v.value = [...r.defaultExpandedKeys ?? []]);
		}, { immediate: !0 });
		let b = a(() => r.expandedKeys ?? v.value), x = a(() => new Set(b.value));
		function S(e) {
			let t = x.value.has(e) ? b.value.filter((t) => t !== e) : [...b.value, e];
			v.value = t, o("update:expandedKeys", t);
		}
		let C = L([]), w = a(() => r.checkedKeys ?? C.value), T = a(() => new Set(w.value)), O = a(() => {
			let e = /* @__PURE__ */ new Set(), t = (n) => {
				let r = !1;
				for (let i of n) {
					let n = i.children.length ? t(i.children) : !1, a = T.value.has(i.key);
					(a || n) && (r = !0), n && !a && e.add(i.key);
				}
				return r;
			};
			return t(_.value), e;
		});
		function j(e, t) {
			let n = new Set(T.value), r = (e) => {
				t ? n.add(e.key) : n.delete(e.key), e.children.forEach(r);
			};
			r(e);
			let i = e.parent;
			for (; i;) i.children.length > 0 && i.children.every((e) => n.has(e.key)) ? n.add(i.key) : n.delete(i.key), i = i.parent;
			let a = Array.from(n);
			C.value = a, o("update:checkedKeys", a), o("check-change", e.key, t);
		}
		function M(e, t) {
			let n = e.target;
			j(t, !!n?.checked);
		}
		let N = a(() => {
			let e = [], t = (n, i) => {
				for (let a of n) {
					let n = a.children.length > 0 && !a.node.isLeaf, o = !r.expandable || x.value.has(a.key);
					e.push({
						...a,
						level: i,
						hasChildren: n,
						expanded: o,
						isLast: a.posInSet === a.setSize
					}), n && o && t(a.children, i + 1);
				}
			};
			return t(_.value, 0), e;
		}), F = a(() => r.virtual ? typeof r.virtual == "object" ? r.virtual : {} : null), I = L(null), B = L(0), V = L(0), U = L(0), G = L(0), K = a(() => !!F.value && N.value.length > 0), te = a(() => {
			let e = F.value?.rowHeight;
			return e ? Math.max(14, e) : U.value || 32;
		}), ne = a(() => Math.max(0, F.value?.overscan ?? 6)), re = a(() => {
			if (!K.value) return null;
			let e = N.value.length, t = te.value, n = G.value, r = Math.max(0, Math.floor((B.value - n) / t) - ne.value), i = Math.ceil((B.value + Math.max(V.value, t) - n) / t) + 1, a = Math.min(e, r + i + ne.value);
			return {
				start: r,
				end: a,
				top: r * t,
				bottom: (e - a) * t
			};
		}), J = a(() => {
			let e = re.value;
			return e ? N.value.slice(e.start, e.end) : N.value;
		}), ie = a(() => re.value?.start ?? 0), Y = a(() => {
			let e = re.value;
			return e ? {
				top: e.top,
				bottom: e.bottom
			} : null;
		});
		function ae() {
			let e = I.value;
			if (!e) return;
			V.value = e.clientHeight, B.value = e.scrollTop;
			let t = Number.parseFloat(getComputedStyle(e).paddingTop);
			if (G.value = Number.isFinite(t) ? t : 0, K.value && !F.value?.rowHeight && !U.value) {
				let t = e.querySelectorAll("[data-index]"), n = t[0], r = t[1], i = n?.offsetTop, a = r?.offsetTop;
				i !== void 0 && a !== void 0 && a > i ? U.value = a - i : n?.offsetHeight && (U.value = n.offsetHeight);
			}
		}
		function oe(e) {
			let t = e.target;
			t && (B.value = t.scrollTop);
		}
		function se(e) {
			if (!K.value) return;
			let t = I.value;
			if (!t) return;
			let n = te.value, r = G.value + e * n, i = t.scrollTop, a = i + t.clientHeight;
			r < i + G.value ? t.scrollTop = Math.max(0, r - G.value - n) : r + n > a && (t.scrollTop = r + n - t.clientHeight + n), B.value = t.scrollTop;
		}
		let ce;
		function le() {
			if (typeof ResizeObserver > "u") return;
			let e = I.value;
			e && (ce?.disconnect(), ce = new ResizeObserver(() => ae()), ce.observe(e));
		}
		ee(() => {
			K.value && E(() => {
				ae(), le();
			});
		}), A(() => ce?.disconnect()), q(K, (e) => {
			e ? E(() => {
				ae(), le();
			}) : (ce?.disconnect(), ce = void 0, U.value = 0, B.value = 0);
		});
		let ue = L(null), de = L(null), fe = /* @__PURE__ */ new Map();
		function pe(e, t) {
			t instanceof HTMLElement ? fe.set(e, t) : fe.delete(e);
		}
		function me(e) {
			de.value = e;
			let t = N.value.findIndex((t) => t.key === e);
			t >= 0 && se(t), E(() => fe.get(e)?.focus());
		}
		let he = a(() => {
			let e = de.value;
			return e === null ? N.value[0]?.key : !K.value || J.value.some((t) => t.key === e) ? e : J.value[0]?.key;
		});
		function ge(e) {
			ue.value = e.key, o("node-click", e.node, e.key);
		}
		function _e(e) {
			e.node.disabled || (ge(e), de.value = e.key);
		}
		function ve(e, t) {
			let n = N.value, i = n.findIndex((e) => e.key === t.key);
			if (!(i < 0)) switch (e.key) {
				case "ArrowDown": {
					e.preventDefault();
					let t = n[i + 1];
					t && me(t.key);
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					let t = n[i - 1];
					t && me(t.key);
					break;
				}
				case "ArrowRight":
					if (e.preventDefault(), t.hasChildren && !t.expanded) S(t.key);
					else if (t.hasChildren && t.expanded) {
						let e = n[i + 1];
						e && me(e.key);
					}
					break;
				case "ArrowLeft":
					e.preventDefault(), t.hasChildren && t.expanded ? S(t.key) : t.parent && me(t.parent.key);
					break;
				case "Home": {
					e.preventDefault();
					let t = n[0];
					t && me(t.key);
					break;
				}
				case "End": {
					e.preventDefault();
					let t = n[n.length - 1];
					t && me(t.key);
					break;
				}
				case "Enter":
				case " ": e.preventDefault(), r.checkable && !t.node.disabled ? j(t, !T.value.has(t.key)) : ge(t);
			}
		}
		let ye = L(null), be = L(null);
		function xe(e) {
			return e.map((e) => ({
				...e,
				...e?.children ? { children: xe(e.children) } : {}
			}));
		}
		function Se(e, t, n = "root") {
			for (let r = 0; r < e.length; r += 1) {
				let i = e[r];
				if (d(i, n, r) === t) return {
					list: e,
					index: r,
					node: i,
					path: n
				};
				if (i?.children?.length) {
					let e = Se(i.children, t, `${n}.${r}`);
					if (e) return e;
				}
			}
			return null;
		}
		function Ce(e, t, n) {
			let r = e?.children ?? [];
			for (let e = 0; e < r.length; e += 1) if (d(r[e], n, e) === t || r[e]?.children?.length && Ce(r[e], t, `${n}.${e}`)) return !0;
			return !1;
		}
		function we(e, t) {
			!r.draggable || t.node.disabled ? e.preventDefault() : (ye.value = t.key, e.dataTransfer && (e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", String(t.key))));
		}
		function Te(e, t) {
			if (!r.draggable || ye.value === null || t.key === ye.value) return;
			e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "move");
			let n = e.currentTarget;
			if (!n) return;
			let i = n.getBoundingClientRect(), a = (e.clientY - i.top) / i.height, o = a < .28 ? "before" : a > .72 ? "after" : "inside";
			be.value = {
				key: t.key,
				position: o
			};
		}
		function Ee(e, t) {
			e.preventDefault(), e.stopPropagation();
			let n = ye.value, r = be.value;
			ye.value = null, be.value = null, n !== null && r && Oe(n, r.key, r.position);
		}
		function De() {
			ye.value = null, be.value = null;
		}
		function Oe(e, t, n) {
			let r = xe(h.value), i = Se(r, e);
			if (i && !Ce(i.node, t, `${i.path}.${i.index}`)) {
				if (i.list.splice(i.index, 1), n === "inside") {
					let e = Se(r, t);
					if (!e) return;
					e.node.children || (e.node.children = []), e.node.children.push(i.node);
				} else {
					let e = Se(r, t);
					if (!e) return;
					let a = n === "after" ? e.index + 1 : e.index;
					e.list.splice(a, 0, i.node);
				}
				f.value = r, o("update:data", r), o("move", {
					from: e,
					to: t,
					position: n
				});
			}
		}
		function ke(e) {
			if (be.value && be.value.key === e.key) return `is-drop-${be.value.position}`;
		}
		let Ae = a(() => Z("mc-tree", "mc-grain-overlay", "mc-recipe-sheet", `mc-tree--${r.size}`, {
			"is-line": r.showLine,
			"is-checkable": r.checkable,
			"is-draggable": r.draggable,
			"is-windowed": K.value,
			"mc-scroll": K.value
		}, r.customClass)), je = a(() => {
			let e = r.maxHeight ?? (K.value ? "24rem" : void 0);
			if (e != null) return { maxHeight: typeof e == "number" ? `${e}px` : e };
		});
		function Me(e) {
			return `calc(${e - 1} * var(--mc-tree-indent) + 9px)`;
		}
		return (n, r) => (P(), l("div", {
			ref_key: "treeEl",
			ref: I,
			class: D(Ae.value),
			style: k(je.value),
			role: "tree",
			"aria-multiselectable": e.checkable ? "true" : void 0,
			onScrollPassive: oe
		}, [
			Y.value && Y.value.top > 0 ? (P(), l("div", {
				key: 0,
				class: "mc-tree__spacer",
				role: "presentation",
				"aria-hidden": "true",
				style: k({ height: Y.value.top + "px" })
			}, null, 4)) : c("", !0),
			(P(!0), l(t, null, R(J.value, (a, o) => (P(), l("div", {
				key: a.key,
				ref_for: !0,
				ref: (e) => pe(a.key, e),
				"data-index": o + ie.value,
				class: D(["mc-tree__node", [ke(a), {
					"is-disabled": !!a.node.disabled,
					"is-selected": ue.value === a.key,
					"is-dragging": ye.value === a.key
				}]]),
				role: "treeitem",
				style: k({
					"--mc-level": a.level,
					"--i": o + ie.value
				}),
				"aria-level": a.level + 1,
				"aria-posinset": a.posInSet,
				"aria-setsize": a.setSize,
				"aria-expanded": a.hasChildren ? a.expanded : void 0,
				"aria-selected": ue.value === a.key,
				"aria-checked": e.checkable ? T.value.has(a.key) ? "true" : O.value.has(a.key) ? "mixed" : "false" : void 0,
				"aria-disabled": a.node.disabled ? "true" : void 0,
				tabindex: he.value === a.key ? 0 : -1,
				draggable: e.draggable && !a.node.disabled,
				onClick: (e) => _e(a),
				onKeydown: (e) => ve(e, a),
				onDragstart: (e) => we(e, a),
				onDragover: (e) => Te(e, a),
				onDrop: (e) => Ee(e, a),
				onDragend: De
			}, [e.showLine ? (P(), l("span", SE, [(P(!0), l(t, null, R(a.level, (e) => (P(), l("span", {
				key: e,
				class: D(["mc-tree__guide", { "is-last": e === a.level && a.isLast }]),
				style: k({ left: Me(e) })
			}, null, 6))), 128))])) : c("", !0), u("span", CE, [
				a.hasChildren && e.expandable ? (P(), l("button", {
					key: 0,
					type: "button",
					class: D(["mc-tree__chevron", { "is-open": a.expanded }]),
					"aria-expanded": a.expanded,
					"aria-label": a.expanded ? W(i).tree?.collapse ?? "Collapse node" : W(i).tree?.expand ?? "Expand node",
					tabindex: "-1",
					onClick: X((e) => S(a.key), ["stop"])
				}, [m($, {
					name: "chevron-right",
					size: 14,
					"stroke-width": 2.4
				})], 10, wE)) : (P(), l("span", TE)),
				e.checkable ? (P(), l("label", {
					key: 2,
					class: "mc-tree__checkbox",
					onClick: r[0] || (r[0] = X(() => {}, ["stop"]))
				}, [u("input", {
					class: D(["mc-tree__checkbox-input", { "is-indeterminate": O.value.has(a.key) }]),
					type: "checkbox",
					checked: T.value.has(a.key),
					".indeterminate": O.value.has(a.key),
					disabled: !!a.node.disabled,
					"aria-label": `Toggle ${a.node.label}`,
					onChange: (e) => M(e, a)
				}, null, 42, EE)])) : c("", !0),
				a.node.icon ? (P(), s($, {
					key: 3,
					name: a.node.icon,
					class: "mc-tree__icon",
					size: 16
				}, null, 8, ["name"])) : c("", !0),
				u("span", {
					class: "mc-tree__label",
					title: a.node.label
				}, H(a.node.label), 9, DE),
				n.$slots.node ? (P(), l("span", OE, [z(n.$slots, "node", {
					node: a.node,
					key: a.key,
					level: a.level
				}, void 0, !0)])) : c("", !0)
			])], 46, xE))), 128)),
			Y.value && Y.value.bottom > 0 ? (P(), l("div", {
				key: 1,
				class: "mc-tree__spacer",
				role: "presentation",
				"aria-hidden": "true",
				style: k({ height: Y.value.bottom + "px" })
			}, null, 4)) : c("", !0),
			N.value.length ? c("", !0) : (P(), l("div", kE, [u("span", AE, [z(n.$slots, "empty", {}, () => [p(H(e.emptyText), 1)], !0)])]))
		], 46, bE));
	}
}), [["__scopeId", "data-v-f4c5f7a1"]]), ME = [
	"disabled",
	"aria-disabled",
	"aria-expanded",
	"aria-controls"
], NE = {
	key: 0,
	class: "mc-tree-select__chips"
}, PE = { class: "mc-tree-select__chip-label" }, FE = ["aria-label", "onClick"], IE = { class: "mc-tree-select__affix" }, LE = ["aria-label"], RE = ["id", "aria-multiselectable"], zE = { class: "mc-tree-select__search mc-recipe-well" }, BE = ["placeholder", "aria-label"], VE = { class: "mc-tree-select__tree" }, HE = [
	"aria-level",
	"aria-expanded",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onMouseenter"
], UE = ["aria-label", "onClick"], WE = {
	key: 0,
	class: "mc-tree-select__check"
}, GE = [
	"checked",
	"disabled",
	"aria-label",
	"onChange"
], KE = {
	key: 1,
	class: "mc-tree-select__dash"
}, qE = { class: "mc-tree-select__label" }, JE = {
	key: 0,
	class: "mc-tree-select__empty"
}, YE = /*#__PURE__*/ Q(/* @__PURE__ */ h({
	name: "MochiTreeSelect",
	__name: "TreeSelect",
	props: /*@__PURE__*/ w({
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
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: /*@__PURE__*/ w([
		"update:open",
		"change",
		"open",
		"close"
	], ["update:modelValue"]),
	setup(e, { emit: i }) {
		let o = e, d = i, f = K(e, "modelValue"), p = rn(), h = Hn(), g = Ln("mc-tree-select"), _ = L(null), v = L(null), y = L(null), b = L(o.open), { isTop: x } = Pn({ active: b }), { style: S, transformOrigin: C, update: w, startAutoUpdate: O, stopAutoUpdate: j } = Cn(_, v, {
			placement: "bottom-start",
			offset: 8,
			flip: !0,
			shift: !0,
			zIndex: jn({ active: b })
		}), M = L(/* @__PURE__ */ new Set()), N = L(""), F = L(0);
		q(() => o.open, (e) => {
			b.value = e, e ? E(() => {
				w(), O(), y.value?.focus();
			}) : j();
		});
		let I = a(() => o.multiple ? Array.isArray(f.value) ? [...f.value] : [] : f.value === void 0 || f.value === null ? [] : [f.value]), z = a(() => new Set(I.value)), B = a(() => {
			let e = /* @__PURE__ */ new Map(), t = (n) => {
				for (let r of n) e.set(r.value, r), r.children?.length && t(r.children);
			};
			return t(o.options), e;
		}), V = a(() => I.value.map((e) => B.value.get(e)?.label ?? String(e))), U = a(() => I.value.length > 0), G = a(() => o.multiple ? "" : V.value[0] ?? "");
		function te(e, t) {
			return !t || e.label.toLowerCase().includes(t);
		}
		function re(e, t, n) {
			let r = !1;
			for (let i of e) {
				let e = !1;
				i.children?.length && (e = re(i.children, t, n)), (te(i, t) || e) && (n.add(i.value), r = !0);
			}
			return r;
		}
		let Y = a(() => {
			if (!N.value.trim()) return null;
			let e = /* @__PURE__ */ new Set();
			return re(o.options, N.value.trim().toLowerCase(), e), e;
		});
		function ae(e) {
			let t = +!!z.value.has(e.value);
			for (let n of e.children ?? []) t += ae(n);
			return t;
		}
		function oe(e) {
			let t = 1;
			for (let n of e.children ?? []) t += oe(n);
			return t;
		}
		let se = a(() => {
			N.value.trim().toLowerCase();
			let e = Y.value, t = [], n = (r, i) => {
				for (let a of r) {
					if (e && !e.has(a.value)) continue;
					let r = !!a.children?.length, o = e ? r : M.value.has(a.value), s = ae(a), c = oe(a);
					t.push({
						option: a,
						depth: i,
						hasChildren: r,
						expanded: o,
						indeterminate: s > 0 && s < c
					}), r && o && n(a.children, i + 1);
				}
			};
			return n(o.options, 0), t;
		});
		function ce(e) {
			o.disabled && e || b.value !== e && (b.value = e, d("update:open", e), e ? (d("open"), E(() => {
				w(), O(), y.value?.focus();
			})) : (d("close"), N.value = "", j()));
		}
		function le() {
			ce(!b.value);
		}
		function ue(e) {
			if (!b.value) return;
			let t = e.target;
			t && (_.value?.contains(t) || v.value?.contains(t) || ce(!1));
		}
		ee(() => document.addEventListener("mousedown", ue)), A(() => {
			document.removeEventListener("mousedown", ue), j();
		});
		function de(e) {
			if (!e.hasChildren) return;
			let t = new Set(M.value);
			t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), M.value = t;
		}
		function fe(e) {
			let t = o.multiple ? e : e[0] ?? void 0;
			f.value = t, d("change", t);
		}
		function pe(e) {
			if (!e.option.disabled) {
				if (o.checkable) {
					let t = new Set(z.value);
					t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), fe([...t]);
				} else e.hasChildren && !o.multiple ? de(e) : (fe([e.option.value]), o.multiple || ce(!1));
			}
		}
		function me(e) {
			let t = e.currentTarget;
			if (!t) return;
			let n = t.getBoundingClientRect();
			t.style.setProperty("--mc-mx", `${((e.clientX - n.left) / n.width * 100).toFixed(1)}%`), t.style.setProperty("--mc-my", `${((e.clientY - n.top) / n.height * 100).toFixed(1)}%`);
		}
		function he(e) {
			if (e.option.disabled) return;
			let t = new Set(z.value);
			t.has(e.option.value) ? t.delete(e.option.value) : t.add(e.option.value), fe([...t]);
		}
		function ge() {
			fe([]);
		}
		function _e(e) {
			fe(I.value.filter((t) => t !== e));
		}
		function ve(e) {
			e.key === "Escape" && b.value && x() ? (e.stopPropagation(), ce(!1)) : (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && (e.preventDefault(), b.value || ce(!0));
		}
		function ye(e) {
			if (e.key === "Escape" && x()) {
				e.stopPropagation();
				let t = v.value?.contains(document.activeElement) ?? !1;
				ce(!1), t && _.value?.focus({ preventScroll: !0 });
				return;
			}
			let t = se.value;
			if (e.key === "ArrowDown") e.preventDefault(), F.value = Math.min(F.value + 1, t.length - 1);
			else if (e.key === "ArrowUp") e.preventDefault(), F.value = Math.max(F.value - 1, 0);
			else if (e.key === "Enter") {
				e.preventDefault();
				let n = t[F.value];
				n && pe(n);
			}
		}
		let be = a(() => typeof o.teleport == "string" ? o.teleport : "body"), xe = a(() => Z("mc-tree-select", `mc-tree-select--${o.variant}`, `mc-tree-select--${o.size}`, {
			"is-open": b.value,
			"is-disabled": o.disabled,
			"is-empty": !U.value,
			"is-multiple": o.multiple
		}, o.customClass));
		return (i, a) => (P(), l("div", { class: D(xe.value) }, [u("button", {
			ref_key: "trigger",
			ref: _,
			type: "button",
			class: "mc-tree-select__trigger mc-sheen-sweep mc-recipe-well",
			disabled: e.disabled,
			"aria-disabled": e.disabled || void 0,
			"aria-expanded": b.value,
			"aria-haspopup": "tree",
			"aria-controls": W(g),
			onClick: le,
			onKeydown: ve
		}, [
			a[3] || (a[3] = u("span", {
				class: "mc-tree-select__aurora",
				"aria-hidden": "true"
			}, null, -1)),
			o.multiple && I.value.length ? (P(), l("span", NE, [(P(!0), l(t, null, R(I.value, (e) => (P(), l("span", {
				key: String(e),
				class: "mc-tree-select__chip"
			}, [u("span", PE, H(B.value.get(e)?.label ?? e), 1), u("span", {
				class: "mc-tree-select__chip-close",
				role: "button",
				tabindex: "-1",
				"aria-label": `remove ${B.value.get(e)?.label ?? e}`,
				onClick: X((t) => _e(e), ["stop"])
			}, [m($, {
				name: "close",
				size: 10,
				"stroke-width": 2.6
			})], 8, FE)]))), 128))])) : (P(), l("span", {
				key: 1,
				class: D(["mc-tree-select__value", { "is-placeholder": !U.value }])
			}, H(U.value ? G.value : W(p).select.placeholder || e.placeholder), 3)),
			u("span", IE, [e.clearable && U.value ? (P(), l("span", {
				key: 0,
				class: "mc-tree-select__clear",
				role: "button",
				tabindex: "-1",
				"aria-label": W(p).treeSelect?.clear ?? "clear",
				onClick: X(ge, ["stop"])
			}, [m($, {
				name: "close",
				size: 12,
				"stroke-width": 2.4
			})], 8, LE)) : c("", !0), m($, {
				name: "chevron-down",
				size: 14,
				class: D(["mc-tree-select__caret", { "is-spin": b.value }])
			}, null, 8, ["class"])])
		], 40, ME), (P(), s(n, {
			to: be.value,
			disabled: !e.teleport
		}, [m(r, { name: "mc-overlay-fade" }, {
			default: J(() => [b.value ? (P(), l("div", T({
				key: 0,
				ref_key: "floating",
				ref: v,
				class: "mc-tree-select__panel",
				style: W(S)
			}, W(h), {
				id: W(g),
				role: "tree",
				"aria-multiselectable": o.multiple || void 0,
				onKeydown: ye
			}), [u("div", {
				class: "mc-tree-select__inner mc-grain-overlay mc-recipe-panel",
				style: k({ transformOrigin: W(C) })
			}, [u("div", zE, [
				m($, {
					name: "search",
					size: 13,
					class: "mc-tree-select__search-icon"
				}),
				ie(u("input", {
					ref_key: "searchInput",
					ref: y,
					"onUpdate:modelValue": a[0] || (a[0] = (e) => N.value = e),
					type: "search",
					class: "mc-tree-select__search-input",
					placeholder: W(p).select.placeholder,
					"aria-label": W(p).treeSelect?.search ?? "search options"
				}, null, 8, BE), [[ne, N.value]]),
				N.value ? (P(), l("span", {
					key: 0,
					class: "mc-tree-select__search-clear",
					onClick: a[1] || (a[1] = (e) => N.value = "")
				}, [m($, {
					name: "close",
					size: 11,
					"stroke-width": 2.6
				})])) : c("", !0)
			]), u("div", VE, [(P(!0), l(t, null, R(se.value, (e, t) => (P(), l("div", {
				key: String(e.option.value),
				class: D(["mc-tree-select__row", {
					"is-highlight": t === F.value,
					"is-checked": z.value.has(e.option.value)
				}]),
				style: k({ "--mc-tree-depth": e.depth }),
				role: "treeitem",
				"aria-level": e.depth + 1,
				"aria-expanded": e.hasChildren ? e.expanded : void 0,
				"aria-selected": z.value.has(e.option.value),
				"aria-disabled": e.option.disabled || void 0,
				onClick: (t) => pe(e),
				onMouseenter: (e) => F.value = t,
				onMousemove: me
			}, [
				a[4] || (a[4] = u("span", { class: "mc-tree-select__indent" }, null, -1)),
				u("span", {
					class: D(["mc-tree-select__twisty", {
						"is-open": e.expanded,
						"is-hidden": !e.hasChildren
					}]),
					role: "button",
					tabindex: "-1",
					"aria-label": e.expanded ? W(p).treeSelect?.collapse ?? "collapse" : W(p).treeSelect?.expand ?? "expand",
					onClick: X((t) => de(e), ["stop"])
				}, [m($, {
					name: "chevron-right",
					size: 12,
					"stroke-width": 2.4
				})], 10, UE),
				o.checkable ? (P(), l("label", WE, [u("input", {
					type: "checkbox",
					checked: z.value.has(e.option.value),
					disabled: e.option.disabled,
					"aria-label": e.option.label,
					onClick: a[2] || (a[2] = X(() => {}, ["stop"])),
					onChange: (t) => he(e)
				}, null, 40, GE), u("span", { class: D(["mc-tree-select__box", {
					"is-checked": z.value.has(e.option.value),
					"is-mixed": e.indeterminate
				}]) }, [z.value.has(e.option.value) ? (P(), s($, {
					key: 0,
					name: "check",
					size: 10,
					"stroke-width": 3
				})) : e.indeterminate ? (P(), l("span", KE)) : c("", !0)], 2)])) : c("", !0),
				u("span", qE, H(e.option.label), 1)
			], 46, HE))), 128)), se.value.length ? c("", !0) : (P(), l("p", JE, H(W(p).select.noMatch), 1))])], 4)], 16, RE)) : c("", !0)]),
			_: 1
		})], 8, ["to", "disabled"]))], 2));
	}
}), [["__scopeId", "data-v-82e8eadb"]]), XE = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => !!t.stroke && !t.gradient), r = a(() => Z("mc-typography", `mc-typography--${t.variant}`, `mc-font--${t.font}`, `is-align-${t.align}`, {
			"mc-recipe-well": t.variant === "code",
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
		}, t.customClass)), i = a(() => {
			let e = {};
			return t.color && (e.color = t.color), typeof t.weight == "number" && Number.isFinite(t.weight) && (e.fontWeight = String(Math.min(900, Math.max(100, Math.round(t.weight))))), n.value && typeof t.stroke == "number" && Number.isFinite(t.stroke) && (e["--mc-text-stroke-width"] = `${Math.min(12, Math.max(.5, t.stroke))}px`), Object.keys(e).length ? e : void 0;
		}), o = a(() => ({
			class: r.value,
			style: i.value,
			tabindex: t.focusable ? 0 : void 0,
			"aria-disabled": t.disabled || void 0
		}));
		return (t, n) => e.variant === "h1" ? (P(), l("h1", O(T({ key: 0 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h2" ? (P(), l("h2", O(T({ key: 1 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h3" ? (P(), l("h3", O(T({ key: 2 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h4" ? (P(), l("h4", O(T({ key: 3 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h5" ? (P(), l("h5", O(T({ key: 4 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : e.variant === "h6" ? (P(), l("h6", O(T({ key: 5 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16)) : (P(), l("div", O(T({ key: 6 }, o.value)), [z(t.$slots, "default", {}, void 0, !0)], 16));
	}
}), [["__scopeId", "data-v-a16677f1"]]), ZE = [
	"accept",
	"multiple",
	"disabled",
	"id"
], QE = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"onKeydown"
], $E = { class: "mc-upload__icon" }, eD = { class: "mc-upload__tip" }, tD = {
	key: 0,
	class: "mc-upload__limit"
}, nD = {
	key: 0,
	class: "mc-upload__notice",
	role: "alert",
	"aria-live": "assertive"
}, rD = { class: "mc-upload__notice-name" }, iD = { class: "mc-upload__notice-reason" }, aD = {
	key: 0,
	class: "mc-upload__thumb"
}, oD = ["src", "alt"], sD = {
	key: 1,
	class: "mc-upload__badge"
}, cD = { class: "mc-upload__meta" }, lD = ["title"], uD = {
	key: 0,
	class: "mc-upload__percent"
}, dD = {
	key: 1,
	class: "mc-upload__state is-success"
}, fD = {
	key: 2,
	class: "mc-upload__state is-error",
	role: "alert"
}, pD = {
	key: 2,
	class: "mc-upload__ring",
	viewBox: "0 0 36 36",
	"aria-hidden": "true"
}, mD = ["stroke-dasharray"], hD = { class: "mc-upload__actions" }, gD = [
	"aria-label",
	"disabled",
	"onClick"
], _D = [
	"aria-label",
	"disabled",
	"onClick"
], vD = [
	"aria-label",
	"disabled",
	"onClick"
], yD = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e, { expose: n, emit: r }) {
		let i = e, o = r, d = rn(), f = Ln("mc-upload"), h = L(null), g = L(!1), _ = L({}), y = L([]), b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), C = 0;
		function w() {
			return C += 1, `mc-upload-${Date.now()}-${C}`;
		}
		let T = a(() => {
			let e = i.max > 0 ? i.max : 0, t = i.maxCount > 0 ? i.maxCount : 0;
			return e && t ? Math.min(e, t) : e || t;
		});
		function E(e) {
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
		function k(e, t) {
			let n = {
				file: e,
				reason: t
			};
			y.value = [...y.value, n], o("reject", n);
		}
		let j = a(() => ({
			uploaded: d.value.upload.uploaded ?? "Uploaded",
			failed: d.value.upload.failed ?? "Failed",
			typeNotAllowed: d.value.upload.typeNotAllowed ?? "File type is not allowed",
			countLimit: d.value.upload.countLimit ?? "Only {count} files can be uploaded",
			sizeLimit: d.value.upload.sizeLimit ?? "File is bigger than {size}",
			rejected: d.value.upload.rejected ?? "File was rejected",
			cancel: d.value.upload.cancel ?? "Cancel upload of {name}",
			retry: d.value.upload.retry ?? "Retry upload of {name}"
		}));
		function ee(e) {
			if (!i.accept) return !0;
			let t = i.accept.toLowerCase();
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
		function M(e) {
			return e.type.startsWith("image/");
		}
		function N(e, t) {
			let n = (i.fileList ?? []).map((n) => n.uid === e ? {
				...n,
				...t
			} : n);
			o("update:fileList", n), o("change", n);
		}
		function F(e) {
			return (i.fileList ?? []).find((t) => t.uid === e);
		}
		function I(e) {
			let t = x.get(e);
			t && (x.delete(e), t.abort());
			let n = b.get(e);
			n !== void 0 && (b.delete(e), window.clearInterval(n));
			let r = S.get(e);
			r && (S.delete(e), r.abort());
		}
		function B(e) {
			if (!e.file) return;
			N(e.uid, {
				status: "uploading",
				percent: 0
			});
			let t = new AbortController();
			if (S.set(e.uid, t), i.customRequest) {
				i.customRequest({
					file: e.file,
					headers: i.headers,
					withCredentials: i.withCredentials,
					signal: t.signal,
					onProgress: (t) => {
						let n = Math.max(0, Math.min(100, Math.round(t)));
						N(e.uid, { percent: n }), o("progress", {
							uid: e.uid,
							percent: n
						});
					},
					onSuccess: (t) => {
						S.delete(e.uid), N(e.uid, {
							status: "success",
							percent: 100,
							url: typeof t == "string" ? t : void 0,
							error: void 0
						});
						let n = F(e.uid);
						n && o("success", n);
					},
					onError: (t) => {
						S.delete(e.uid), N(e.uid, {
							status: "error",
							error: t?.message || j.value.failed
						});
						let n = F(e.uid);
						n && o("error", n);
					},
					onComplete: () => {
						S.delete(e.uid);
						let t = F(e.uid);
						if (!t || t.status !== "uploading") return;
						N(e.uid, {
							status: "success",
							percent: 100
						});
						let n = F(e.uid);
						n && o("success", n);
					}
				});
				return;
			}
			if (i.action) {
				let t = new XMLHttpRequest();
				x.set(e.uid, t), t.open("POST", i.action, !0), t.withCredentials = i.withCredentials;
				for (let [e, n] of Object.entries(i.headers ?? {})) try {
					t.setRequestHeader(e, n);
				} catch {}
				t.upload.onprogress = (t) => {
					if (!t.lengthComputable) return;
					let n = Math.min(100, Math.round(t.loaded / t.total * 100));
					N(e.uid, { percent: n }), o("progress", {
						uid: e.uid,
						percent: n
					});
				}, t.onload = () => {
					if (x.delete(e.uid), S.delete(e.uid), t.status >= 200 && t.status < 300) {
						N(e.uid, {
							status: "success",
							percent: 100,
							url: t.responseText
						});
						let n = F(e.uid);
						n && o("success", n);
					} else {
						N(e.uid, { status: "error" });
						let t = F(e.uid);
						t && o("error", t);
					}
				}, t.onerror = () => {
					x.delete(e.uid), S.delete(e.uid), N(e.uid, { status: "error" });
					let t = F(e.uid);
					t && o("error", t);
				};
				let n = new FormData();
				n.append("file", e.file), t.send(n);
				return;
			}
			let n = 0, r = window.setInterval(() => {
				if (n = Math.min(100, n + 7 + Math.round(Math.random() * 9)), N(e.uid, { percent: n }), o("progress", {
					uid: e.uid,
					percent: n
				}), n >= 100) {
					window.clearInterval(r), b.delete(e.uid), S.delete(e.uid), N(e.uid, {
						status: "success",
						percent: 100
					});
					let t = F(e.uid);
					t && o("success", t);
				}
			}, 140);
			b.set(e.uid, r);
		}
		async function V(e) {
			if (i.disabled) return;
			let t = Array.from(e);
			y.value = [];
			let n = t.filter((e) => !ee(e));
			n.length && o("exceed", n);
			for (let e of n) k(e, j.value.typeNotAllowed);
			let r = t.filter(ee), a = T.value, s = a > 0 ? Math.max(a - (i.fileList ?? []).length, 0) : Infinity, c = r.slice(0, s);
			if (r.length > c.length) {
				let e = r.slice(c.length);
				o("exceed", e);
				for (let t of e) k(t, j.value.countLimit.replace("{count}", String(a)));
			}
			if (!c.length) return;
			let l = i.beforeUpload, u = [];
			for (let e of c) if (i.maxSize > 0 && e.size > i.maxSize) k(e, j.value.sizeLimit.replace("{size}", E(i.maxSize)));
			else {
				if (l) {
					let n = !1;
					try {
						n = await l(e, t);
					} catch {
						n = !1;
					}
					if (!n) {
						k(e, j.value.rejected);
						continue;
					}
				}
				u.push(e);
			}
			if (!u.length) return;
			let d = u.map((e) => ({
				uid: w(),
				name: e.name,
				status: i.autoUpload ? "uploading" : "ready",
				percent: 0,
				file: e
			}));
			for (let e of d) e.file && M(e.file) && (_.value[e.uid] = URL.createObjectURL(e.file));
			let f = (i.fileList ?? []).concat(d);
			if (o("update:fileList", f), o("change", f), i.autoUpload) for (let e of d) B(e);
		}
		function U(e) {
			let t = e.target;
			t.files?.length && V(t.files), t.value = "";
		}
		function G(e) {
			if (g.value = !1, i.disabled) return;
			let t = e.dataTransfer?.files;
			t?.length && V(t);
		}
		function K(e) {
			i.disabled || (e.preventDefault(), g.value = !0);
		}
		function te() {
			g.value = !1;
		}
		function ne() {
			i.disabled || h.value?.click();
		}
		function re(e) {
			let t = _.value[e.uid];
			t && (URL.revokeObjectURL(t), delete _.value[e.uid]);
			let n = (i.fileList ?? []).filter((t) => t.uid !== e.uid);
			o("update:fileList", n), o("change", n);
		}
		function q(e) {
			i.disabled || (I(e.uid), re(e), o("remove", e));
		}
		function J(e) {
			I(e.uid), re(e), o("cancel", e);
		}
		function ie() {
			for (let e of i.fileList ?? []) e.status === "uploading" && J(e);
		}
		function ae(e) {
			i.disabled || B(e);
		}
		function oe(e) {
			return _.value[e.uid] ?? e.url ?? "";
		}
		A(() => {
			for (let e of b.values()) window.clearInterval(e);
			b.clear();
			for (let e of x.values()) e.abort();
			x.clear();
			for (let e of S.values()) e.abort();
			S.clear();
			for (let e of Object.values(_.value)) URL.revokeObjectURL(e);
		});
		let se = a(() => i.fileList ?? []), ce = a(() => ({
			files: se.value,
			remove: q,
			retry: ae,
			cancel: J
		}));
		n({ cancel: ie });
		let le = a(() => i.listType !== "text"), ue = a(() => i.listType === "picture-card"), de = a(() => Z("mc-upload", `mc-upload--${i.listType}`, {
			"is-disabled": i.disabled,
			"is-dragging": g.value
		}, i.customClass));
		return (n, r) => (P(), l("div", { class: D(de.value) }, [
			u("input", {
				ref_key: "input",
				ref: h,
				type: "file",
				class: "mc-upload__input",
				accept: i.accept,
				multiple: e.multiple,
				disabled: e.disabled,
				id: W(f),
				onChange: U
			}, null, 40, ZE),
			u("div", {
				class: D(["mc-upload__zone mc-sheen-sweep mc-recipe-sheet", { "is-dragging": g.value }]),
				role: "button",
				tabindex: e.disabled ? -1 : 0,
				"aria-disabled": e.disabled || void 0,
				"aria-label": W(d).upload.tip,
				onClick: ne,
				onKeydown: [Y(X(ne, ["prevent"]), ["enter"]), Y(X(ne, ["prevent"]), ["space"])],
				onDrop: G,
				onDragover: K,
				onDragleave: te
			}, [
				r[0] || (r[0] = u("span", {
					class: "mc-upload__grain mc-grain-overlay",
					"aria-hidden": "true"
				}, null, -1)),
				r[1] || (r[1] = u("span", {
					class: "mc-upload__halo",
					"aria-hidden": "true"
				}, null, -1)),
				u("span", $E, [m($, {
					name: "upload",
					size: 20
				})]),
				u("span", eD, H(W(d).upload.tip), 1),
				T.value ? (P(), l("span", tD, H(W(d).upload.max.replace("{count}", String(T.value))), 1)) : c("", !0)
			], 42, QE),
			y.value.length ? (P(), l("div", nD, [(P(!0), l(t, null, R(y.value, (e, t) => (P(), l("p", {
				key: t,
				class: "mc-upload__notice-line"
			}, [
				m($, {
					name: "alert-circle",
					size: 13
				}),
				u("span", rD, H(e.file.name), 1),
				u("span", iD, H(e.reason), 1)
			]))), 128))])) : c("", !0),
			z(n.$slots, "file-list", O(v(ce.value)), () => [z(n.$slots, "fileList", O(v(ce.value)), () => [se.value.length ? (P(), l("ul", {
				key: 0,
				class: D(["mc-upload__list", { "is-grid": le.value }])
			}, [(P(!0), l(t, null, R(se.value, (t) => (P(), l("li", {
				key: t.uid,
				class: D(["mc-upload__item mc-recipe-sheet", [`is-${t.status}`, {
					"is-card": ue.value,
					"is-thumb": le.value && !ue.value
				}]])
			}, [
				le.value ? (P(), l("span", aD, [oe(t) ? (P(), l("img", {
					key: 0,
					src: oe(t),
					alt: t.name
				}, null, 8, oD)) : (P(), s($, {
					key: 1,
					name: "file",
					size: 18,
					class: "mc-upload__thumb-icon"
				}))])) : (P(), l("span", sD, [m($, {
					name: "file-text",
					size: 15
				})])),
				u("span", cD, [u("span", {
					class: "mc-upload__name",
					title: t.name
				}, H(t.name), 9, lD), t.status === "uploading" ? (P(), l("span", uD, H(t.percent) + "% ", 1)) : t.status === "success" ? (P(), l("span", dD, [m($, {
					name: "circle-check",
					size: 12
				}), p(" " + H(j.value.uploaded), 1)])) : t.status === "error" ? (P(), l("span", fD, [m($, {
					name: "alert-circle",
					size: 12
				}), p(" " + H(t.error || j.value.failed), 1)])) : c("", !0)]),
				t.status === "uploading" ? (P(), l("svg", pD, [r[2] || (r[2] = u("circle", {
					class: "mc-upload__ring-track",
					cx: "18",
					cy: "18",
					r: "15",
					fill: "none",
					"stroke-width": "3"
				}, null, -1)), u("circle", {
					class: "mc-upload__ring-bar",
					cx: "18",
					cy: "18",
					r: "15",
					fill: "none",
					"stroke-width": "3",
					"stroke-linecap": "round",
					"stroke-dasharray": `${t.percent / 100 * 94.25} 94.25`,
					transform: "rotate(-90 18 18)"
				}, null, 8, mD)])) : c("", !0),
				u("span", hD, [
					t.status === "error" ? (P(), l("button", {
						key: 0,
						type: "button",
						class: "mc-upload__action",
						"aria-label": j.value.retry.replace("{name}", t.name),
						disabled: e.disabled,
						onClick: (e) => ae(t)
					}, [m($, {
						name: "refresh",
						size: 13
					})], 8, gD)) : c("", !0),
					t.status === "uploading" && e.showCancel ? (P(), l("button", {
						key: 1,
						type: "button",
						class: "mc-upload__action mc-upload__action--cancel",
						"aria-label": j.value.cancel.replace("{name}", t.name),
						disabled: e.disabled,
						onClick: (e) => J(t)
					}, [m($, {
						name: "square",
						size: 10,
						fill: !0
					})], 8, _D)) : c("", !0),
					u("button", {
						type: "button",
						class: "mc-upload__action",
						"aria-label": `remove ${t.name}`,
						disabled: e.disabled,
						onClick: (e) => q(t)
					}, [m($, {
						name: "close",
						size: 13,
						"stroke-width": 2.4
					})], 8, vD)
				])
			], 2))), 128))], 2)) : c("", !0)], !0)], !0)
		], 2));
	}
}), [["__scopeId", "data-v-d470c79e"]]), bD = {
	key: 0,
	class: "mc-vertical-text__aurora",
	"aria-hidden": "true"
}, xD = {
	key: 1,
	class: "mc-vertical-text__grain",
	"aria-hidden": "true"
}, SD = { class: "mc-vertical-text__body" }, CD = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
		let t = e, n = a(() => Z("mc-vertical-text", `mc-vertical-text--${t.direction}`, `mc-vertical-text--${t.size}`, `mc-vertical-text--${t.tone}`, `is-align-${t.align}`, {
			"is-upright": t.upright,
			"is-tracking": t.tracking === "wide",
			"has-rule": t.rule,
			"is-plate": t.plate,
			"mc-recipe-panel": t.plate
		}, t.plate ? "mc-sheen-sweep" : void 0, t.customClass));
		return (t, r) => (P(), l("div", { class: D(n.value) }, [
			e.plate ? (P(), l("span", bD)) : c("", !0),
			e.plate ? (P(), l("span", xD)) : c("", !0),
			u("div", SD, [z(t.$slots, "default", {}, () => [p(H(e.text), 1)], !0)])
		], 2));
	}
}), [["__scopeId", "data-v-deb2add5"]]), wD = ["aria-label"], TD = ["aria-disabled"], ED = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = L(null), i = L(0), o = L(0);
		function s(e) {
			if (e != null) return typeof e == "number" ? `${e}px` : e;
		}
		let c = a(() => n.items?.length ?? 0), d = a(() => c.value * n.itemHeight), f = a(() => {
			let e = Math.floor(i.value / n.itemHeight) - n.overscan;
			return Math.max(0, e);
		}), m = a(() => {
			let e = Math.ceil((i.value + o.value) / n.itemHeight);
			return Math.min(c.value, e + n.overscan);
		}), h = a(() => {
			let e = n.items ?? [], t = [];
			for (let r = f.value; r < m.value; r += 1) {
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
			i.value = r.value?.scrollTop ?? 0;
		}
		let y = null;
		ee(() => {
			let e = r.value;
			e && (o.value = e.clientHeight, typeof ResizeObserver < "u" && (y = new ResizeObserver(() => {
				o.value = e.clientHeight;
			}), y.observe(e)));
		}), A(() => {
			y?.disconnect(), y = null;
		});
		let b = a(() => ({ height: s(n.height) })), x = a(() => Z("mc-virtual-list", "mc-grain-overlay", "mc-recipe-sheet", n.customClass));
		return (n, i) => (P(), l("div", {
			class: D(x.value),
			style: k(b.value)
		}, [i[0] || (i[0] = u("span", {
			class: "mc-virtual-list__aurora mc-aurora-inset",
			"aria-hidden": "true"
		}, null, -1)), u("div", {
			ref_key: "viewport",
			ref: r,
			class: "mc-virtual-list__viewport",
			role: "list",
			tabindex: "0",
			"aria-live": "off",
			"aria-label": e.label,
			onScroll: v
		}, [u("div", {
			class: "mc-virtual-list__spacer",
			style: k({ height: `${d.value}px` })
		}, [(P(!0), l(t, null, R(h.value, (t) => (P(), l("div", {
			key: t.key,
			class: D(["mc-virtual-list__item mc-sheen-sweep", [e.itemClass, { "is-disabled": _(t.item) }]]),
			role: "listitem",
			"aria-disabled": _(t.item) ? "true" : void 0,
			style: k({
				height: `${e.itemHeight}px`,
				transform: `translateY(${t.index * e.itemHeight}px)`
			})
		}, [z(n.$slots, "default", {
			item: t.item,
			index: t.index
		}, () => [p(H(g(t.item)), 1)], !0)], 14, TD))), 128))], 4)], 40, wD)], 6));
	}
}), [["__scopeId", "data-v-27dae639"]]), DD = [
	"tabindex",
	"aria-hidden",
	"aria-label"
], OD = /*#__PURE__*/ Q(/* @__PURE__ */ h({
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
	setup(e) {
		let n = e, r = rn(), i = L(null);
		function o(e) {
			n.interactive && !n.disabled && Et(e, i.value);
		}
		let s = L({
			width: 0,
			height: 0
		});
		function c() {
			let e = i.value;
			if (!e) return;
			if (n.fullscreen) {
				if (!At) return;
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
			let e = i.value;
			e && typeof ResizeObserver < "u" && (d = new ResizeObserver(() => c()), d.observe(n.fullscreen ? e : e.parentElement ?? e));
		}
		ee(() => {
			c(), f();
		}), A(() => {
			d?.disconnect(), d = null;
		}), q(() => n.fullscreen, () => {
			c(), f();
		});
		let p = a(() => {
			let e = Math.max(1, Math.floor(s.value.width / n.gapX)), t = Math.max(1, Math.ceil(s.value.height / (n.gapY + n.fontSize))), r = [];
			for (let n = 0; n < t; n++) for (let t = 0; t < e; t++) r.push({ key: `${n}-${t}` });
			return r;
		}), m = a(() => !n.gradient || !!n.color), h = a(() => Z("mc-watermark", {
			"is-fullscreen": n.fullscreen,
			"is-plain": m.value,
			"is-interactive": n.interactive,
			"is-disabled": n.disabled
		}, n.customClass));
		return (n, a) => (P(), l("div", {
			ref_key: "host",
			ref: i,
			class: D(h.value),
			style: k({ zIndex: e.zIndex }),
			tabindex: e.interactive ? 0 : void 0,
			"aria-hidden": e.interactive ? void 0 : "true",
			"aria-label": e.interactive ? W(r).watermark?.label ?? "Watermark" : void 0,
			onKeydown: X(o, ["self"])
		}, [u("div", {
			class: "mc-watermark__layer",
			style: k({
				opacity: e.opacity,
				rotate: `${e.rotate}deg`,
				gridTemplateColumns: `repeat(auto-fill, ${e.gapX}px)`,
				rowGap: `${e.gapY}px`,
				height: `${s.value.height}px`,
				fontSize: `${e.fontSize}px`,
				fontFamily: e.fontFamily,
				fontWeight: e.fontWeight,
				color: e.color
			})
		}, [(P(!0), l(t, null, R(p.value, (t) => (P(), l("span", {
			key: t.key,
			class: "mc-watermark__text"
		}, H(e.content), 1))), 128))], 4)], 46, DD));
	}
}), [["__scopeId", "data-v-4f39bc55"]]), kD = /* @__PURE__ */ oe({
	Affix: () => Gt,
	Alert: () => mn,
	Anchor: () => vn,
	Aurora: () => yn,
	AutoComplete: () => Yn,
	Avatar: () => er,
	BackTop: () => nr,
	Badge: () => ar,
	Barcode: () => Er,
	Breadcrumb: () => Lr,
	Button: () => qr,
	Calendar: () => hi,
	Card: () => Oi,
	Carousel: () => Gi,
	Cascader: () => ia,
	Chart: () => as,
	Checkbox: () => ls,
	CircleCutout: () => fs,
	ClipboardButton: () => _s,
	Code: () => tc,
	Collapse: () => cc,
	CollapseTransition: () => mc,
	ColorPicker: () => kc,
	CommandBar: () => Pc,
	CommandPalette: () => $c,
	ConfigProvider: () => ul,
	Countdown: () => pl,
	DEFAULT_CATEGORIES: () => dp,
	DataTable: () => Du,
	DatePicker: () => md,
	Descriptions: () => Ed,
	Dialog: () => Rd,
	Diff: () => rf,
	DiscreteApi: () => of,
	Divider: () => df,
	Dock: () => yf,
	Drawer: () => Ef,
	Dropdown: () => Ff,
	DynamicInput: () => zf,
	DynamicTags: () => qf,
	Element: () => op,
	Ellipsis: () => up,
	Emoji: () => Dp,
	Empty: () => Mp,
	Equation: () => Vp,
	ErrorBoundary: () => Xp,
	Flex: () => Zp,
	FloatButton: () => rm,
	Form: () => sm,
	FormItem: () => mm,
	FormRow: () => _m,
	Gauge: () => Bm,
	GlobalStyle: () => Hm,
	GradientText: () => Wm,
	Grid: () => Gm,
	Heatmap: () => rh,
	Highlight: () => oh,
	Icon: () => $,
	IconRail: () => mh,
	Image: () => jh,
	ImageGroup: () => qh,
	InfiniteScroll: () => Qh,
	Input: () => ig,
	InputNumber: () => fg,
	InputOTP: () => gg,
	KpiCard: () => Bg,
	Layout: () => qg,
	LevelMeter: () => t_,
	LiquidGlass: () => r_,
	List: () => __,
	LoadingBar: () => y_,
	Log: () => A_,
	Marquee: () => N_,
	Masonry: () => P_,
	Mention: () => K_,
	Menu: () => ev,
	Message: () => uv,
	MessageProvider: () => bv,
	Modal: () => Dv,
	Notification: () => Lv,
	NotificationProvider: () => Kv,
	NumberAnimation: () => ay,
	PageHeader: () => yy,
	Pagination: () => By,
	Popconfirm: () => $y,
	Popover: () => Xy,
	Popselect: () => fb,
	Progress: () => bb,
	Prose: () => wb,
	QRCode: () => gx,
	Radio: () => bx,
	RadioGroup: () => Sx,
	Rate: () => Nx,
	Result: () => Vx,
	Scrollbar: () => Kx,
	Segmented: () => Zx,
	Select: () => US,
	Signature: () => ZS,
	Skeleton: () => $S,
	Slider: () => iC,
	Space: () => aC,
	Sparkline: () => Tg,
	Spin: () => mC,
	Split: () => bC,
	Statistic: () => jC,
	Steps: () => BC,
	Switch: () => UC,
	Table: () => aw,
	Tabs: () => pw,
	Tag: () => vw,
	Textarea: () => xw,
	Thing: () => Fw,
	Time: () => qw,
	TimePicker: () => fT,
	Timeline: () => ST,
	Tooltip: () => OT,
	Tour: () => RT,
	Transfer: () => fE,
	Transport: () => yE,
	Tree: () => jE,
	TreeSelect: () => YE,
	Typography: () => XE,
	Upload: () => yD,
	VerticalText: () => CD,
	VirtualList: () => ED,
	Watermark: () => OD,
	message: () => Tv,
	notification: () => Zv,
	useCollapseTransition: () => fc,
	useMessage: () => Ev,
	useNotification: () => Qv
}), AD = {
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
function jD(e) {
	return a(() => AD[e.value] ?? AD.medium);
}
//#endregion
//#region src/composables/useInView.ts
function MD(e, t = {}) {
	let { threshold: n = 0, rootMargin: r = "0px", root: i = null, once: a = !1, delay: o = 0 } = t, s = L(!1), c = L(0), l = null, u = null;
	function d() {
		l?.disconnect(), l = null, u && (clearTimeout(u), u = null);
	}
	function f() {
		if (!At || l) return;
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
	return ee(f), A(d), {
		isInView: s,
		ratio: c,
		stop: d,
		start: f
	};
}
//#endregion
//#region src/composables/useDebounce.ts
function ND(e, t = 200) {
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
	}, i.pending = () => n !== null, A(() => {
		n && clearTimeout(n), n = null;
	}), i;
}
function PD(e, t = 200) {
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
	}, o.pending = () => r !== null, A(() => {
		r && clearTimeout(r), r = null;
	}), o;
}
//#endregion
//#region src/composables/useMagnetic.ts
function FD(e = {}) {
	let { strength: t = .18, radius: n = 90, lift: r = 4, trackPointer: i = !0, tilt: a } = e, o = Math.max(0, a?.max ?? 0), s = L(null), c = null, l = 0;
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
	return ee(() => {
		s.value && p(s.value);
	}), A(() => {
		l && cancelAnimationFrame(l), c && (c.removeEventListener("mousemove", u), c.removeEventListener("mouseleave", d)), c = null;
	}), {
		target: s,
		bind: p,
		reset: f
	};
}
//#endregion
//#region src/composables/useHostTheme.ts
function ID(e = At ? document.documentElement : null, t = {}) {
	let { attribute: n = "data-theme", darkValue: r = "dark", lightValue: i = "light", autoValue: a = "auto", target: o = At ? document.documentElement : null, onChange: s } = t, c = o ?? e;
	if (!c || !At) return () => {};
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
function LD(e = {}) {
	let t = L("light"), n = ID(null, {
		...e,
		onChange: (n) => {
			t.value = n, e.onChange?.(n);
		}
	});
	return A(n), {
		mode: t,
		stop: n
	};
}
function RD(e, t) {
	let n = typeof e == "object" && e && "value" in e ? e.value : e;
	if (!n || !At) return () => {};
	let r = new MutationObserver(() => {
		t(n.getAttribute("data-mc-color-mode") ?? document.documentElement.getAttribute("data-mc-color-mode") ?? "light");
	});
	return r.observe(n, {
		attributes: !0,
		attributeFilter: ["data-mc-color-mode"]
	}), () => r.disconnect();
}
function zD(e) {
	let t = L((At ? document.documentElement.getAttribute("data-mc-color-mode") : null) ?? "light"), n = () => {};
	return ee(() => {
		n = RD(e, (e) => {
			t.value = e;
		});
	}), A(() => n()), q(e, () => {
		n(), n = RD(e, (e) => {
			t.value = e;
		});
	}), t;
}
//#endregion
//#region src/composables/useHeadings.ts
function BD(e, t = {}) {
	let { levels: n = [2, 3], selector: r = n.map((e) => `h${e}`).join(", "), observe: i = !0 } = t, a = L([]), o = null;
	function s() {
		return e ? typeof e == "object" && "value" in e ? e.value : e : At ? document.body : null;
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
	return ee(() => {
		if (l(), !i || !At) return;
		let e = s();
		e && (o = new MutationObserver(() => l()), o.observe(e, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}));
	}), A(() => {
		o?.disconnect(), o = null;
	}), {
		items: a,
		refresh: l
	};
}
//#endregion
//#region src/composables/useLocalSearch.ts
function VD(e, t = {}) {
	let { limit: n = 20, threshold: r = .2 } = t;
	function i() {
		return Array.isArray(e) ? e : e.value ?? [];
	}
	let a = L([]);
	function o(e) {
		let t = e.trim().toLowerCase();
		if (!t) return a.value = [], [];
		let o = [];
		for (let e of i()) {
			let n = HD(e, t);
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
function HD(e, t) {
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
		let s = UD(e, t);
		s > 0 && (i = Math.max(i, s * o));
	}
	return i <= 0 ? null : {
		doc: e,
		score: Math.round(i * 1e3) / 1e3,
		matches: a
	};
}
function UD(e, t) {
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
var WD = {
	count: 10,
	distance: 46,
	duration: 720,
	color: "hsl(var(--mc-h2) var(--mc-s2) 66%)",
	size: 7,
	shape: "dot"
}, GD = {
	mounted(e, t) {
		let n = {
			...WD,
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
function KD(e) {
	if (!e || typeof e != "object" && typeof e != "function") return !1;
	let t = e;
	return typeof t.render == "function" || typeof t.setup == "function" || typeof t.template == "string" || !!t.__vccOpts;
}
var qD = { install(e, t = {}) {
	typeof document < "u" && (document.documentElement.setAttribute("data-mochi", ""), t.theme && nl(document.documentElement, t.theme), al(document.documentElement), Qe());
	let n = t.prefix ?? "M";
	for (let [r, i] of Object.entries(kD)) {
		if (!KD(i)) continue;
		let a = (i.name ?? r).replace(/^Mochi/, "");
		e.component(`${n}${a}`, i), t.unprefixed && (a && a !== r ? e.component(a, i) : r !== a && e.component(r, i));
	}
	e.provide("mochi:zIndex", t.zIndex ?? 2e3), e.directive("mc-burst", GD);
} };
//#endregion
export { Gt as Affix, mn as Alert, vn as Anchor, yn as Aurora, Yn as AutoComplete, er as Avatar, nr as BackTop, ar as Badge, Er as Barcode, Lr as Breadcrumb, qr as Button, hi as Calendar, Oi as Card, Gi as Carousel, ia as Cascader, as as Chart, ls as Checkbox, fs as CircleCutout, _s as ClipboardButton, tc as Code, cc as Collapse, mc as CollapseTransition, kc as ColorPicker, Pc as CommandBar, $c as CommandPalette, ul as ConfigProvider, pl as Countdown, dp as DEFAULT_CATEGORIES, Du as DataTable, md as DatePicker, Ed as Descriptions, Rd as Dialog, rf as Diff, of as DiscreteApi, df as Divider, yf as Dock, Ef as Drawer, Ff as Dropdown, zf as DynamicInput, qf as DynamicTags, op as Element, up as Ellipsis, Dp as Emoji, Mp as Empty, Vp as Equation, Xp as ErrorBoundary, Zp as Flex, rm as FloatButton, sm as Form, mm as FormItem, _m as FormRow, Bm as Gauge, Hm as GlobalStyle, Wm as GradientText, Gm as Grid, rh as Heatmap, oh as Highlight, qt as ICON_ALIASES, Kt as ICON_PATHS, $ as Icon, mh as IconRail, jh as Image, qh as ImageGroup, Qh as InfiniteScroll, ig as Input, fg as InputNumber, gg as InputOTP, Bg as KpiCard, le as LIQUID_GLASS_ACTIVE_CLASS, ue as LIQUID_GLASS_FILTER_ID, an as LOCALE_EN_US, tn as LOCALE_KEY, on as LOCALE_ZH_CN, qg as Layout, t_ as LevelMeter, r_ as LiquidGlass, __ as List, y_ as LoadingBar, A_ as Log, N_ as Marquee, P_ as Masonry, K_ as Mention, ev as Menu, uv as Message, bv as MessageProvider, qD as MochiUI, qD as default, Dv as Modal, Lv as Notification, Kv as NotificationProvider, ay as NumberAnimation, cl as PACKS, yy as PageHeader, By as Pagination, $y as Popconfirm, Xy as Popover, fb as Popselect, bb as Progress, wb as Prose, gx as QRCode, bx as Radio, Sx as RadioGroup, Nx as Rate, Vx as Result, AD as SIZE_MAP, Kx as Scrollbar, Zx as Segmented, US as Select, ZS as Signature, $S as Skeleton, iC as Slider, aC as Space, Tg as Sparkline, mC as Spin, bC as Split, jC as Statistic, BC as Steps, UC as Switch, sl as THEME_PRESETS, aw as Table, pw as Tabs, vw as Tag, xw as Textarea, Fw as Thing, qw as Time, fT as TimePicker, ST as Timeline, OT as Tooltip, RT as Tour, fE as Transfer, yE as Transport, jE as Tree, YE as TreeSelect, XE as Typography, yD as Upload, CD as VerticalText, ED as VirtualList, OD as Watermark, Et as activateOnKey, kn as allocateZIndex, rl as applyAdaptiveText, nl as applyTheme, gt as bestForeground, vt as bestForegroundOver, Vt as camelCase, ht as checkContrast, Pt as clamp, ot as clampNumber, yt as composite, mt as contrastRatio, af as createDiscreteApi, xt as createSafeStorage, tt as formatBytes, at as formatCompactNumber, zt as formatDate, nt as formatDuration, Rt as formatNumber, it as formatPercent, rt as formatRelativeTime, _t as gradientStops, Vn as injectId, al as installAdaptiveText, Qe as installLiquidGlassFilter, Tt as isActivationKey, At as isBrowser, jt as isElement, Lt as isEqual, kt as isSemanticColor, Tv as message, Nt as nextFrame, Zv as notification, lt as parseColor, Bt as pascalCase, Bn as provideId, nn as provideLocale, Mt as raf, Ct as readJSON, Ze as refreshLiquidGlass, pt as relativeLuminance, Fn as resetOverlayStack, An as resetZIndex, Ot as resolveColor, ol as resolveColorMode, Yt as resolveIconName, St as safeStorage, ge as supportsLiquidGlassRefraction, ID as syncHostTheme, tl as themeToCssVars, It as toArray, $e as uninstallLiquidGlassFilter, Ft as uniq, ml as useClickOutside, ps as useClipboard, fc as useCollapseTransition, zD as useColorMode, zd as useCountUp, ND as useDebounce, Cn as useFloating, Ic as useFocusTrap, BD as useHeadings, LD as useHostTheme, Ln as useId, Rn as useIdRef, MD as useInView, hh as useIntersection, VD as useLocalSearch, rn as useLocale, FD as useMagnetic, Ev as useMessage, Qv as useNotification, Pn as useOverlayStack, Bc as useScrollLock, jD as useSize, ll as useTheme, PD as useThrottle, Hy as useTriggerAnchor, jn as useZIndex, GD as vMochiBurst, RD as watchColorMode, wt as writeJSON };

//# sourceMappingURL=mochi-ui.mjs.map