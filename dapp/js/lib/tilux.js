/*******************************************************************\

Tilux JS 
file:	tilux.js
ver:	0.1.0
author: Darryl Morris
email:  o0ragman0o AT gmail.com
pdated: 4-Jul-2018
copyright: 2018

Release Notes:
* More performat event attachment
* New: Render Event. Synchronously when event attachment is complete
* New: `cache` used to cache candles
* New: `cache.get(id, flame)` and `cache.set(id, flame, value)` for
setting flamedata of cached candles 
* `gaze` binding function moved from Tilux to Lux
* `cbs` now an object
* Callbacks are async'd throught `setTimeout()`
* `const Session` lux provision to transport inter-Lux bindings
* Restructured callback regeime which no longer requires parent bubbleup

TODO:
* Implement selection reestablishment across re-renders
* Sparks not being captured and attached in t() function 

\*******************************************************************/
	


let cbId = 0;

// Proxy handler for nested reactive objects
const luxHandler = {
	has(target, key) {
		// Pseudo property '__isLux' used to prevent self nesting proxies
		if (key === "__isLux") return true;
		return key in target;
	},

	get(target, key) {
		if(key === "__cbs") return target[key];
		if(key === "gaze") 
			// `gaze()` is a proxy trapped function and doesn't show as property of a Lux object (not ideal)
			return (key, callback)=>{
			if(!('__cbs' in target)) target.__cbs = {};
			if(!(key in target.__cbs)) target.__cbs[key] = {};
			target.__cbs[key][++cbId] = callback;
			return cbId;				
		}

		target._k = key;
		return target[key] !== undefined ? Lux(target[key], target) : undefined;
	},

	set(target, key, value) {
		if(key == '_p' || key == '_k') {
			target[key] = value;
			return true;
		}
		target[key] = Lux(value);
		target._k = key;
		// run asynchronous callbacks
		do {
			if('__cbs' in target) {
				let cbs = target.__cbs[target._k];
				for(let cb in cbs) {
					setTimeout(()=>{
						cbs[cb](value, key, target);});
				}
			}
			target = target._p;
		} while(target);			
		return true;
	},
}


// A reactive object class
function Lux (target = {}, parent) {
	if(typeof target !== 'object' || target == null) return target;
	target._p = parent;
	if('__isLux' in target) return target;
	return new Proxy(target, luxHandler);
}


// Session Lux object to store data, bindings and callbacks 
const Session = Lux();
// const Session = new Lux();

// Holds a cache of constructed Tilux objects
const cache = new Proxy({},
	{
		get(target, key) { if(key in target) return target[key];}
	});

cache.get = function(id, flame) {
	return cache[id] ? cache[id].f[flame] : undefined;	
}

cache.set = function(id, flame, value) {
	cache[id].f[flame] = value;
}

// A custom render event synchronously dispatched when a candle is rendered to
// the DOM and all other events have been attached
const renderEvent = new Event('render');

// Template literal replacments look-up object
const t_rplc = {'@':'c.f.','{$':'${','{#':'${Tilux.t','{>':'${Tilux.l'};

let idNum = 0;
const CACHE = true;
const sparks = [];

function newId(prefix = "tlx_") {
	return prefix + idNum++;
}

// The 'candle template' rendering class
class Tilux {
	constructor(candle = {}, toCache) {
		// Return candle from cache if it already exists
		if(!!candle.f && !!candle.f.id && !!cache[candle.f.id]) return cache[candle.f.id];
		let lit = Lux();
		lit.w = candle.w || '';
		lit.f = candle.f || {};
		lit.s = candle.s || undefined;
		lit.f.id = lit.f.id || newId();
		if(toCache) cache[lit.f.id] = lit;
		lit.watch = (lux, key) => {
			lux.gaze(key, ()=>{Tilux.render(`#${lit.f.id}`, lit)})
		}
		// React to changes in it's own flame
		lit.gaze('f', ()=>{Tilux.render(`#${lit.f.id}`, lit);});
		// Bind rendering to data in the Session Lux 
		if('bind' in lit.f) lit.f.bind.split(' ').forEach(
			(b)=>{ Session.gaze(b, ()=>{Tilux.render(`#${lit.f.id}`, lit)}); }
			// (b)=>{ Session.gaze(b, ()=>{Tilux.render(`#${lit.f.id}`, lit)}); }
		);
		if('created' in lit.f) lit.f.created.apply(lit);
		return lit;
	}

	// Renders a template to a collection of HTML elements
	static render(s, c) {
		let activeId = document.activeElement.id;
		document.querySelectorAll(s).forEach( root => {
			let sibling = root.previousSibling;
			let parent = root.parentElement;
			sparks.length = 0;
			root.outerHTML = this.l(c);
			root = sibling.nextSibling;
			sparks.forEach((spark) => {
				for(let selector in spark){
					// root.querySelectorAll(selector).forEach( node => {
					parent.querySelectorAll(selector).forEach( node => {
							for(let event in spark[selector]) {
								if(event != '_k') node.addEventListener(event, spark[selector][event]);
							}
							node.dispatchEvent(renderEvent);
						}
					);
				}
			})
		});
		if(activeId !== document.activeElement.id) window[activeId].focus();
	}

	// Recursive template rendering. i.e, {#([list,...],[wrapper...])}
	// `a` is an array of data to be wrapped. Nested arrays are wrapped by `l[nesting depth]`
	// `w` is an optional array of wrapping tag names such as '[li]', '[tr, tr]'
	static t(a, w=['']) {
		return a.map(
			(e)=>{
				return `${!!w[0]?`<${w[0]}>`:``}${!e.map?e:this.t(w.slice(1),e)}${!!w[0]?`</${w[0]}>`:``}`
			}).join('')
	}
	
	// Template literal parser/compiler. i.e, {>(trueCandle, bool, falseCandle)}
	static l(c, d=true, e='') {
		c = d ? c : e;
		if(typeof c !== 'object') c = {w:c || ''};
		if(c.s) sparks.push(c.s);
		return Function('c', `"use strict"; return \`${c.w.replace(/@|{\$|{#|{>/g, f=>t_rplc[f])}\`;`)(c)
	}
}

