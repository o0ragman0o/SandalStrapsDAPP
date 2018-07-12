
// module "uiTest.js"

/*******************************************************************\

Tilux JS 
file:	tilux.js
ver:	0.1.0
author: Darryl Morris
email:  o0ragman0o AT gmail.com
updated:1-Jul-2018
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

\*******************************************************************/
	

// let cbId = 0;


// // Proxy handler for nested reactive objects
// const luxHandler = {
// 	has: (target, key) => {
// 		// Pseudo property '__isLux' used to prevent self nesting proxies
// 		if (key === "__isLux") return true;
// 		return key in target;
// 	},

// 	get: (target, key) => {
// 		// Make parent private
// 		if (key === '__p') return;
// 		// Don't proxy callback objects
// 		if (key === '__cbs') {
// 			if(!('__cbs' in target)) target.__cbs = {};
// 			return target.__cbs;
// 		}
// 		// Cache return object/value
// 		let lit = target[key];
// 		// Return primitives directly
// 		if (typeof lit !== 'object' || lit === null) return lit;
// 		// If key does not begin with 's_', assign parent to bubble-up the chain.
// 		// 's_' supresses bubble-up  
// 		// if (!key.startsWith('s_')) lit.__p = target;
// 		// Return if lit is already a Lux object to prevent self nesting proxies
// 		if ('__isLux' in lit) return lit;
// 		// Create new Lux object for lit and return it
// 		return new Proxy(lit, luxHandler);
// 	},

// 	set: (target, key, value) => {
// 		target[key] = value;
// 		// Prevent manual setting of parent or callbacks objects
// 		if(key === '__p' || key === '__cbs') return true;
// 		// Create and attach callback container if one doesn't exist
// 		if(!('__cbs' in target)) target.__cbs = {};
// 		let cbs = target[key].__cbs || target.__cbs;
// 		// run asynchronous callbacks
// 		for(let cb in cbs[key]) { 
// 			setTimeout(	(cb)=>{
// 					cb(value, key, target)
// 				},0, cbs[key][cb]);
// 		};
// 		return true;
// 	},
// }


// // A reactive object class
// class Lux {
// 	constructor(target = {}) {
// 		if(typeof target !== "object") target = {value: target};
// 		target._lId = Symbol('Lux Id');
// 		target.gaze = Lux.prototype.gaze;
// 		return new Proxy(target, luxHandler);
// 	}

// 	gaze(lux, key, callback){
// 		let cbs = typeof lux[key] === "object" ? lux[key].__cbs : lux.__cbs;
// 		if(!(key in cbs)) cbs[key] = {};
// 		cbs[key][++cbId] = callback;
// 		return cbId;
// 	}
// }

// // Session Lux object to store data, bindings and callbacks 
// const Session = new Lux();

// // Hods a cache of constructed Tilux objects
// const cache = new Proxy({},
// 	{
// 		get(target, key) { if(key in target) return target[key];}
// 	});

// cache.get = function(id, flame) {
// 	return cache[id] ? cache[id].f[flame] : undefined;	
// }

// cache.set = function(id, flame, value) {
// 	cache[id].f[flame] = value;
// }

// // A custom render event synchronously dispatched when a candle is rendered to
// // the DOM and all other events have been attached
// const renderEvent = new Event('render');

// // Template literal replacments look-up object
// const t_rplc = {'@':'c.f.','{$':'${','{#':'${Tilux.t','{>':'${Tilux.l'};

// let idNum = 0;

// const sparks = [];

// function newId(prefix = "tlx_") {
// 	return prefix + idNum++;
// }

// // The 'candle template' rendering class
// class Tilux {
// 	constructor(candle = {}) {
// 		// Return candle from cache if it already exists
// 		if(!!candle.f && !!candle.f.id && !!cache[candle.f.id]) return cache[candle.f.id];
// 		this.w = candle.w || '';
// 		this.f = candle.f || {};
// 		this.s = candle.s || undefined;
// 		let lit = new Lux(this);
// 		lit.f.id = candle.f.id || newId();
// 		// React to changes in it's own flame
// 		lit.gaze(lit, 'f', ()=>{Tilux.render(`#${lit.f.id}`, lit);});
// 		// Bind rendering to data in the Session Lux 
// 		if('bind' in lit.f) lit.f.bind.split(' ').forEach(
// 			(b)=>{ lit.gaze(Session, b, ()=>{Tilux.render(`#${lit.f.id}`, lit)}); }
// 		);
// 		if(lit.f.id) cache[lit.f.id] = lit;
// 		if(!!lit.f.created)	lit.f.created.apply(lit);
// 		return lit;
// 	}

// 	// Renders a template to a collection of HTML elements
// 	static render(s, c) {
// 		let activeId = document.activeElement.id;
// 		document.querySelectorAll(s).forEach( root => {
// 			let sibling = root.previousSibling;
// 			let parent = root.parentElement;
// 			sparks.length = 0;
// 			root.outerHTML = this.l(c);
// 			root = sibling.nextSibling;
// 			sparks.forEach((spark) => {
// 				for(let selector in spark){
// 					// root.querySelectorAll(selector).forEach( node => {
// 					parent.querySelectorAll(selector).forEach( node => {
// 							for(let event in spark[selector]) {
// 								node.addEventListener(event, spark[selector][event]);
// 							}
// 							node.dispatchEvent(renderEvent);
// 						}
// 					);
// 				}
// 			})
// 		});
// 		if(activeId !== document.activeElement.id) window[activeId].focus();
// 	}

// 	// Recursive template rendering. i.e, {#([wrapper...],[list,...])}
// 	static t(l,a) {
// 		return a.map(
// 			(e)=>{
// 				return `${!!l[0]?`<${l[0]}>`:``}${!e.map?e:this.t(l.slice(1),e)}${!!l[0]?`</${l[0]}>`:``}`
// 			}).join('')
// 	}
	
// 	// Template literal parser/compiler. i.e, {>(trueCandle, bool, falseCandle)}
// 	static l(c, d=true, e='') {
// 		c = d ? c : e;
// 		if(typeof c !== 'object') c = {w:c || ''};
// 		if(c.s) sparks.push(c.s);
// 		// if(c.s) sparks[sparks.length - 1].push(c.s);
// 		return Function('c', `"use strict"; return \`${c.w.replace(/@|{\$|{#|{>/g, f=>t_rplc[f])}\`;`)(c)
// 	}
// }

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
		if(key === "gaze") return (key, callback)=>{
			if(!('__cbs' in target)) target.__cbs = {};
			if(!(key in target.__cbs)) target.__cbs[key] = {};
			target.__cbs[key][++cbId] = callback;
			return cbId;				
		}

		target._k = key;
		return target[key] ? Lux(target[key], target) : undefined;
	},

	set(target, key, value) {
		if(key == '_p' || key == '_k') {
			target[key] = value;
			return true;
		}
		target[key] = Lux(value);
		// run asynchronous callbacks
		do {
			if('__cbs' in target) {
				// let cbs = target.__cbs[target._k];
				let cbs = target.__cbs[key];
				for(let cb in cbs) {
					cbs[cb](value, key, target);
				}
				// setTimeout(	(cb)=>{
				// 		cb(value, key, target)
				// 	}, 0);
			}
			// key = target;
			target = target._p;
		} while(target);			
		return true;
	},
}


// A reactive object class
function Lux (target = {}, parent) {
	if(typeof target !== 'object') return target;
	target._p = parent;
	if('__isLux' in target) return target;
	return new Proxy(target, luxHandler);
}


// Session Lux object to store data, bindings and callbacks 
const Session = Lux();
// const Session = new Lux();

// Hods a cache of constructed Tilux objects
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

const sparks = [];

function newId(prefix = "tlx_") {
	return prefix + idNum++;
}

// The 'candle template' rendering class
class Tilux {
	constructor(candle = {}) {
		// Return candle from cache if it already exists
		if(!!candle.f && !!candle.f.id && !!cache[candle.f.id]) return cache[candle.f.id];
		let lit = Lux();
		// let lit = new Lux();
		let id = candle.f.id || newId();
		lit.w = candle.w || '';
		lit.f = candle.f || {};
		lit.s = candle.s || undefined;
		lit.f.id = id || newId();
		// React to changes in it's own flame
		lit.gaze('f', ()=>{Tilux.render(`#${id}`, lit);});
		// Bind rendering to data in the Session Lux 
		if('bind' in lit.f) lit.f.bind.split(' ').forEach(
			(b)=>{ Session.gaze(b, ()=>{Tilux.render(`#${id}`, lit)}); }
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
					root.querySelectorAll(selector).forEach( node => {
					// parent.querySelectorAll(selector).forEach( node => {
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

	// Recursive template rendering. i.e, {#([wrapper...],[list,...])}
	// `l` is an array of wrapping tag names such as '[li]', '[tr, tr]'
	// `a` is an array of data to be wrapped. Nested arrays are wrapped by `l[nesting depth]`
	static t(l,a) {
		return a.map(
			(e)=>{
				return `${!!l[0]?`<${l[0]}>`:``}${!e.map?e:this.t(l.slice(1),e)}${!!l[0]?`</${l[0]}>`:``}`
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


$import ("js/lib/blockies.js");
// $import ("js/ui/style.js");
// $import ("js/ui/Docs.js");
// $import ("js/ui/Accounts.js");
// $import ("js/ui/net.js");
// $import ("js/ui/socLinks.js");
// $import ("js/ui/modal.js");

// $import ("js/lib/etherlux/addressInput.js");
// $import ("js/ui/SSWidgets.js");
// $import ("js/ui/events.js");
// $import ("js/ui/footer.js");
// $import ("js/ui/navPath.js");
// $import ("js/ui/navTree.js");
// $import ("js/ui/Tx.js");
// $import ("js/ui/Search.js");
// $import ("js/ui/Block.js");
// $import ("js/ui/Address.js");

const contracts = {};

const _textOut = (bind, value = '') => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bind}">{$@value}</span>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || value; },
		},
	});
}

const _idicon = (bind, size = 4, _class = "idicon") => {
	return new Tilux({
		w: `<img id="{$@id}" bind="{$@bind}" class="${_class}" src="{$@value}" />`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return blockie(Session[this.bind] || this.bind, size)},
		}
	});
}

const _addrLink = (bind) => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bind}" class="ss-addr" onclick={$!contracts['@value'] ? "modal.show(addressModal('@value'))" : "navPath.push('{$@value}')"}>{$@value}</span>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || this.bind; },
		},
	});
}


const _ethAddrSml = (bind) => {
	return `{>(_idicon('${bind}', 2))} {>(_addrLink('${bind}'))}`
}

const _txHashLink = (bind) => {
	return new Tilux({
		w: `<a id="{$@id}" bind="{$@bind}" class="mono" href="javascript:modal.show(txHashModal('{$@value}'))" target="_">{$@value}</a>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || this.bind; },
		},
	});
}

const _blockLink = (bind) => {
	return new Tilux({
		w: `<a id="{$@id}" bind="{$@bind}" class="mono" href="javascript:modal.show(blockModal('{$@bind}'))" target="_">{$@bind}</a>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || this.bind; },
		},
	});
}

const _ethAddrInp = (bind, placeHolder = "Enter address 0x123aBc...") => {
	let id = newId('addrInp_');
	const self = new Tilux({
		w: `<span id="${id}">
				{>(_idicon(@bindTo))}
				<input id="${id}_inp" bind="bind" class="ss-input ss-addr" placeholder="${placeHolder}" pattern="0x[0-9|a-f|A-F]{40}">
			</span>`,
		f: {
			id: id,
			bindTo: bind,
			get value() { return Session[self.f.bindTo] || ""; },
		},
		s: {
			[`#${id}_inp`]: {
				input(event) { Session[self.f.bindTo] = event.target.value; },
				render(event) { event.target.value = self.f.value }
			},
		},
	});
	Session.gaze(self.f.bindTo, (value) => {window[self.f.id].value = value});
	return self;
}

const _ethHexInp = (bind, placeHolder = "0x...") => {
	let id = newId('hexInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="fs14 fa-fw">0x</span>
				<input id="{$@id}_inp" class="ss-input ss-addr bytes32" placeholder="${placeHolder}" pattern="0x[0-9|a-f|A-F]{64}">
			</span>`,
		f: {
			id: id,
			bindTo: bind,
			get value() { return Session[self.f.bindTo] || ""; },
		},
		s: {
			[`#${id}_inp`]: {
				input(event) { Session[self.f.bindTo] = event.target.value; },
				render(event) { event.target.value = self.f.value }
			},
		},
	};
	return new Tilux(self);
}

const _ethValInp = (bind, placeHolder="Value...") => {
	let id = newId('selInp_');
	const self = {
		w: `<span id="${id}"><i class="fab fa-fw fa-ethereum fs14"></i>
				<input id="${id}_inp" class="ss-input" placeholder="${placeHolder}" type="text" pattern="^(\d*\.)?\d+$">
			</span>`,
		f: {
			id: id,
			bindTo: bind,
			get value() { return Session[self.f.bindTo] || ""; },
		},
		s: {
			[`#${id}_inp`]: {
				input(event) { Session[self.f.bindTo] = event.target.value; },
				render(event) { event.target.value = self.f.value }
			},
		},
	};
	return new Tilux(self);
}

const _textAreaInp = (bind, placeHolder="Enter test...") => {
	let id = newId('textAreaInp_');
	const self = {
		w: `<span id="${id}_wrapper">
				<i class="fas fa-fw fa-font fs-14"></i>
				<textarea id="${id}_ta" class="ss-input" placeholder="${placeHolder}"></textarea>
			</span>
		`,
		f: {
			id: id,
			bind: bind,
			get value() { return Session[self.f.bind] || ""; },
		},
		s: {
			[`#${id}_ta`]: {
				input(event) { Session[self.f.bind] = event.target.value; },
				render(event) { event.target.value = self.f.value }
			},
		},
	};
	return new Tilux(self);
}

const _range = (bind, min="0", max="100") => {
	let id = newId("range_");
	const self = new Tilux({
		w: `<input id="${id}" bind="{$@bind}" type="range" min="${min}" max="${max}" >
		`,
		f: {
			id: id,
			bindto: bind,
			get value() { return Session[self.f.bind] || ''; },
			created() {
				Session.gaze(bind, (value)=>{window[id].value = value})
			},

		},
		s: {
			[`#${id}`]: {
				input(event) { Session[self.f.bindto] = event.target.value; },
				render(event) {	event.target.value = self.f.value; }
			},
		},
	});
	return self;
}

const _selectInp = (bind, entries) => {
	let id = newId('selInp_');
	const self = {
		w: `<select id='${id}' class="ss-input">{#(@s_entries,['option'])}</select>
		`,
		f: {
			id: id,
			bind: bind,
			s_entries: entries,
		},
		s: {
			[`#${id}`]: {
				input(event) {
					Session[self.f.bind] = event.target.value;
					Session[self.f.bind + '_selIdx'] = event.target.selectedIndex;
				},
				render(event) {
					event.target.selectedIndex = Session[self.f.bind + '_selIdx'] || 0;
				}
			}
		}
	};
	return  new Tilux(self);
}

const _ethVal = (bind) => {
	return new Tilux({
		w: `<span bind="{$@bind}" ><i class="fab fa-fw fa-ethereum"></i> <span class="ss-val">{$@value}</span></span>`,
		f: {
			// bind: bind,
			get value() { return bind in Session ? toEther(Session[bind]) : bind; },
		},
	});
}

const _accountBal = (bind) => {
	return new Tilux({
		w:`
			<span id="{$@id}" class="balance">
				{>(_ethVal(@balance))}
			</span>
		`,
		f: {
			id: newId(),
			bind: bind,
			get balance() { return toEther(web3.eth.getBalance(Session[bind]))}
		}
	});
}

const _accountSelect = (bind) => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bindPass}">
				{>(_accountBal(@bindPass))}
				{>(_idicon(@bindPass))}
				{>(_selectInp(@bindPass, @accounts))}
			</span>`,
		f: {
			id: newId("accSel_"),
			bindPass: bind,
			get accounts() { return accounts(); },
		},
	});
}


const _accountsTplt = new Tilux({
		w:`
			<div id="{$@id}" class="js-end">
				<span id="send-tx"><i class="fa fa-paper-plane" aria-hidden="true"></i></span>
				{>(_accountSelect('currAccount'))}
				<span id="search"><i class="fas fa-search"></i></span>
			</div>
		`,
		f: {
			id: newId("accTplt_"),
		},
		s: {
			"#send-tx": {
				click() { modal.show(txForm()) }
			},
			"#search": {
				click() { modal.show(searchForm()) }
			},
		}
	});

const _datePicker = (bind) => {
	let id = newId('dateInp_');
	const self = {
		w: `<span id="{$@id}" >
				<input id="{$@id}_dp" type="date">
			</span>
		`,
		f: {
			id: id,
			bindTo: bind,
		},
		s: {
			[`#${id}_dp`]: {
				input(event) { Session[self.f.bindTo] = event.target.value; },
			},
		},
	};
	return new Tilux(self);
}

const _txButton = (bind, text="Click", func = ()=>{}, icon) => {
	let id = newId('btn_');
	const self = {
		w: `<button id="{$@id}"><i class="fas fa-fw {$@icon} fs10" aria-hidden="true"> </i><label>${text}</label></button>
		`,
		f: {
			id: id,
			func: func,
			icon:icon,
		},
		s: {
			[`#${id}`]: {
				click(event) { self.f.func(event) },
			},
		},
	};
	return new Tilux(self);
}

const _checkBox = (bind, text, value="value") => {
	let id = newId("chkBox_");
	const self = {
		w: `<span id="${id}"><label><input id="${id}_cb" bind="{$@bind}" type="checkbox" {>('checked', @checked)} value="{$@value}">${text}</label></span>
		`,
		f: {
			id: id,
			bind: bind,
			value: value,
			get checked() { return Session[self.f.bind] || ""; },
		},
		s: {
			[`#${id}_cb`]: {
				input(event) { Session[self.f.bind] = event.target.checked; },
			},
		},
	};
	return new Tilux(self);
}





console.log("ran Accounts.js");


const uiTest = new Tilux({
	w: `
		<div id="{$@id}" class="layer">
			{>(_idicon("Me Darryl", 10))}{>(_idicon("Darryl", 6))}{>(_idicon("Darryl"))}<br />
			{>(_ethAddrInp('inpAddr'))} <br />
			{>(_ethAddrInp('inpAddr'))} <br />
			{>(_ethAddrSml('inpAddr'))} <br />
			{>(_ethAddrSml('inpAddr'))} <br />
			{>(_accountSelect('currAccount'))}<br />
			{>(_ethHexInp('inpHex'))} {>(_txHashLink('inpHex'))}<br />
			{>(_ethHexInp('inpHex'))} {>(_txHashLink('inpHex'))}<br />
			{>(_ethValInp('inpEth'))} {>(_textOut('inpEth'))} <br />
			{>(_ethValInp('inpEth'))} {>(_textOut('inpEth'))} <br />
			{>(_textAreaInp('inpText'))}<br /> {>(_textOut('inpText'))}<br />
			{>(_textAreaInp('inpText'))}<br /> {>(_textOut('inpText'))}<br />
			<i class="fas fa-fw fa-wallet fs14"></i> {>(_selectInp('selVal', ['a','b','c']))} {>(_textOut('selVal'))}<br />
			<i class="fas fa-fw fa-wallet fs14"></i> {>(_selectInp('selVal', ['a','b','c']))} {>(_textOut('selVal'))}<br />
			<i class="fas fa-fw fa-calendar-alt fs14"></i> {>(_datePicker('dateVal'))}  {>(_textOut('dateVal'))}<br />
			<i class="fas fa-fw fa-calendar-alt fs14"></i> {>(_datePicker('dateVal'))}  {>(_textOut('dateVal'))}<br />
			{>(_txButton('clk', 'Click', '()=>{}','fa-paper-plane'))} {>(_textOut('clk'))}<br />
			{>(_checkBox('cbxVal', 'Checkbox'))} {>(_textOut('cbxVal'))} <br /> 
			{>(_checkBox('cbxVal', 'Checkbox'))} {>(_textOut('cbxVal'))} <br /> 
			<i class="fas fa-fw fa-gas-pump fs14"></i> {>(_range('rng'))} {>(_textOut('rng'))}<br />
			<i class="fas fa-fw fa-gas-pump fs14"></i> {>(_range('rng'))} {>(_textOut('rng'))}<br />
		</div>
	`,
	f: {
		id: 'ui_test',
	},
});

const mainTplt = new Tilux({
	w: `<div id="{$@id}"  class="contract">
		{>(uiTest)}
		</div>
	`,
	f: {
		id: "test-tplt",
	}
});


Session.currAccount = web3.eth.accounts[0];
Session.accounts = web3.eth.accounts;
// Session.curr


function start() {

	Tilux.render("#ss-style", ss_style);
	Tilux.render("#accounts", _accountsTplt);
	// Tilux.render("#nav-path", {w:'<div id="selTEst">{>(_accountSelect)}</div>'});
	// Tilux.render("#nav-path", navPath);
	Tilux.render("#test-tplt", mainTplt);
	// Tilux.render("#footer-tplt", footer);
	console.log("ran main.js");
}


let ss_style = new Tilux({
		f: {
			id: 'ss-style',
			hue: 200,
			sat: 100,
			lit: 81,
			get darkest() {return  `hsl(${this.hue}, ${this.sat + (100 - this.sat) * 0.1}%, ${this.lit * 0.3}%)`},
			get dark() {return  `hsl(${this.hue}, ${this.sat + (100 - this.sat) * 0.05}%, ${this.lit * 0.7}%)`},
			get base() {return `hsl(${this.hue}, ${this.sat}%, ${this.lit}%)`},
			get light() {return  `hsl(${this.hue}, ${this.sat - this.sat * 0.05}%, ${this.lit + (100 - this.lit) * 0.3}%)`},
			get lightest() {return  `hsl(${this.hue}, ${this.sat - this.sat * 0.1}%, ${this.lit + (100 - this.lit) * 0.9}%)`},
			get compliment() {return  `hsl(${(this.hue + 180) % 360}, ${this.sat}%, ${this.lit}%)`},
			get invalid() {return `hsl(5, ${this.sat}%, ${this.lit}%)`},
			trans: `0.00s`,
		},

		w: `
		<style id="{$@id}">

			* {
				box-sizing: border-box;
			}

			html {
			    height: 100%;
			    width: 100%;
			}

			body, .body {
			    margin: 0px;
			    padding: 0px;
			    font-size: 16px;
				font-family: Roboto, sans-serif;
				height: 100%;
				width: 100%;
			    transition-duration: {$@trans};
				background-color: {$@compliment};
			}

			article {
			    height: 100%;
			    display: grid;
			    grid-template-rows: 64px 1fr 64px;
			    grid-template-columns: 100%;
			}

			div {
			}

			h1 {
				color: {$@base};
			}

			h3 {
				font-weight: 300;
			}

			label {
				display: inline-block;
				font-weight: 600;
				width: 130px;
			}

			.row {
				display: grid;
				grid-auto-flow: column;
				justify-items: stretch;
			}

			.column {
				display: grid;
				grid-auto-flow: row;
				justify-items: center;
			}

			.as-start {
				align-self: start;
			}
			
			.as-center {
				align-self: center;
			}
			
			.as-end {
				align-self: end;
			}
			
			.js-start {
				justify-self: start;
			}

			.js-stretch {
				justify-self: stretch;
			}

			.js-center {
				justify-self: center;
			}

			.js-end {
				justify-self: end;
			}

			.layout {
				height: 100%
				display: grid;
				grid-template-rows: 64px 1fr 64px;
			}

			.banner {
				top: 0px;
				background-color: {$@darkest};
				color: {$@lightest};
			}

			.main{
				width: 90%;
				max-width: 1310px;
				height: 100%;
			}

			.nav-tree {
				font-size: 0.8em;
				color: {$@darkest};
				text-transform: uppercase;
			}

			.nav-path {
				font-size: 1em;
				top: 64px;
				color: {$@darkest};
				text-transform: uppercase;
				background-color: {$@compliment};
			}

			.contract {
			    color: {$@darkest};
			    background-color: {$@light};
				font-size: 1.0em;
				box-shadow: 0px 0px 5px -1px {$@darkest};
				height: calc(100% - (16px + 1em));
				overflow: auto;
			}

			.footer-row {
				display: grid;
				bottom: 0px; 
				grid-auto-flow: column;
				color: {$@lightest};
				background-color: {$@darkest};
			}

			.net {
				font-size: 0.8rem;
			}

			.soc {
				font-size: 1.6rem;
			}
			
			.path-item {
				display: inline-block;
				padding: 8px;
				cursor: pointer;
			}

			.path-item:hover {
				color: {$@lightest};
				background-color: {$@base};
				box-shadow: 0px -3px 3px{$@darkest};
			}

			.path-item + .active {
				color: {$@darkest};
				background-color: {$@light};
				box-shadow: 0px -3px 3px {$@darkest};
				text-shadow: 0.5px 0.5px 2px {$@lightest};
			}

			a:link {
				text-decoration: none;
			}

			a:hover {
				text-shadow: 0px 0px 2px {$@base};	
			}

			a:active {

			}

			.regbase-adv {
				display: grid;
				margin: 16px;
				grid-template-rows: 1.6em 1.2em 1.2em auto;
				grid-template-columns: 70px 350px auto;
				grid-template-areas:
					"idicon title title"
					"idicon addr bal"
					"idicon owner bal"
					"ext ext ext"
			}

			.docs-link {
				cursor: pointer;
			}

			.rb-idicon {
				grid-area: idicon;
			}

			.rb-title {
				grid-area: title;
			}

			.rb-regname {
				color: {$@darkest};
				font-size: 1.4em;
				text-transform: uppercase;
				text-shadow: 0.5px 0.5px 2px {$@dark};			
			}

			.rb-regname-sml {
				color: {$@darkest};
				font-size: 1.0em;
				text-transform: uppercase;
				text-shadow: 0.5px 0.5px 2px {$@dark};			
			}

			.rb-version {
				justify-self: end;
				font-size: 1.2em;
			}

			.rb-version-sml {
				justify-self: end;
				font-size: 0.8em;
			}

			.rb-addr {
				grid-area: addr;
			}

			.rb-owner {
				grid-area: owner;
			}

			.rb-bal {
				grid-area: bal;
				font-size: 1.6em;
			}

			.rb-ext {
				grid-area: ext;
			}

			.layer {
				border-width: 0 0 4px 0;
				border-style: solid;
				border-color: {$@compliment};
				box-shadow: 0px 0px 5px -1px {$@darkest};
				padding: 13px 15.6px;
			}

			.inline {
				display: inline-block;
			}

			.darkest {
				color: {$@darkest};
			}

			.dark {
				color: {$@darkest};
			}

			.base {
				color: {$@base};
			}

			.light {
				color: {$@light};
			}

			.lightest {
				color: {$@lightest};
			}

			.compliment {
				color: {$@compliment};
			}

			ul, ol,
			.ss-list {
				list-style: none;
			}

			.fs08 {
				font-size: 0.8rem;
			}

			.fs09 {
				font-size: 0.9rem;
			}

			.fs10 {
				font-size: 1.0rem;
			}

			.fs11 {
				font-size: 1.1rem;
			}

			.fs12 {
				font-size: 1.2rem;
			}

			.fs14 {
				font-size: 1.4rem;
			}

			.fs16 {
				font-size: 1.6rem;
			}

			.mono,
			.ss-val,
			.ss-addr,
			.ss-addr-sml
			{
				font-family: monospace;
				cursor: pointer;
			}

			.ss-addr-sml {
				font-size: 0.8em;
			}

			.upper {
				text-transform: uppercase;
			}

			select,
			option,
			ss-select
			{
				color: {$@darkest};
			    transition-duration: {$@trans};
			}

			button,
			input,
			textarea,
			.ss-button,
			.rb-button,
			.ss-input,
			.ss-select,
			.ss-row
			{
				cursor: pointer;
				border-radius: 4px;
				border-color: {$@lightest};
				border-width: 1.4px;
				border-style: solid;
				background-color: {$@light};
				padding: 13px 15.6px;
				margin: 9px;
			    transition-duration: 0.3s;
			    vertical-align: middle;
			}

			button,
			.rb-button
			.ss-button
			{
				color: {$@darkest};
				text-transform: uppercase;
			}

			.rb-button
			{
				width: 300px;
			}

			.ss-input,
			.ss-select
			{
				cursor: pointer;
				display: inline-block;
			}

			input,
			select,
			textarea
			{
				cursor: pointer;
				color: {$@darkest};
				box-shadow: 0.5px 0.5px 5px {$@darkest} inset;
				width: 372px
			}

			textarea
			{
				cursor: pointer;
				width: 90%;
				min-height: 5rem;
			}

			input:hover,
			select:hover,
			textarea:hover,
			input:focus,
			select:focus
			{
				border-color: {$@light};
				border-width: 1.4px;
				border-style: solid;
				background-color: {$@base};
				box-shadow: 0.5px 0.5px 2px {$@darkest} inset;
			}

			input:invalid
			{
				background-color: {$@invalid};
			}

			button:hover,
			.ss-button:hover,
			.rb-button:hover
			{
				border-color: {$@light};
			    background-color: {$@base};
				box-shadow: 0.5px 0.5px 5px {$@darkest};	
			}

			.ss-flex-container {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				flex-direction: row;
			}

			.ss-flex {
				display: inline-flex;
			}

			.idicon,
			.idicon-sml,
			.idicon-tny {
				display: inline-block;
				border-width: 2.2px;
				border-color: {$@lightest};
				border-style: solid;
				border-radius: 100%;
				width: auto;
			    vertical-align: middle;
			}

			.idicon-sml {
				border-width: 1.6px;

			}

			.idicon-tny {
				border-width: 1px;
			}

			.input-icon {
			}

			button + input,
			select + input
			{
				display: inline-block;
			}

			.modal {
				position: fixed;
				display: grid;
				z-index: 1;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.4);
			}

			.modal-inner {
				background-color:{$@lightest};				
				font-size: 1.4em;
				color: {$@darkest};
				margin: 150px;
				padding: 20px;
				height: calc(100% - 300px);
			}

			.modal-content {
				overflow-y: auto;
				overflow-wrap: break-word;
				height: calc(100% - 64px);
			}

			.evnt-label {
				display: inline-block;
				width: 130px;
			}

			.bytes32 {
				width: 570px;				
			}
		</style>
		`,
	}
)

console.log("ran style.js");
