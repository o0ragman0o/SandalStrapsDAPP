
const textOut = (bind, value = '') => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bind}">{$@value}</span>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || value; },
		},
	});
}

const idicon = (bind, size = 4, _class = "") => {
	return new Tilux({
		w: `<img id="{$@id}" bind="{$@bind}" class="${_class} idicon" src="{$@value}">`,
		f: {
			id: newId(),
			bind: bind,
			get value() {
				return Session[this.bind] ? blockie(Session[this.bind], size)
					: isAddr(this.bind) ? blockie(this.bind, size)
					: blockie('0x', size);
			},
		}
	});
}

const addrLink = (bind) => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bind}" class="ss-addr" onclick={$@onclick}>{$@value}</span>`,
		f: {
			id: newId(),
			bind: bind,
			get value() { return Session[this.bind] || this.bind; },
			get onclick() {return !contracts[this.value] ? `modal.show(addressModal('${this.value}'))` : `navPath.push('${this.value}')`; },
		},
	});
}


const ethAddrSml = (bind) => {
	return `{>(idicon('${bind}', 2))} {>(addrLink('${bind}'))}`
}


const txHashLink = (hash) => {
	return `<a class="mono" href="javascript:modal.show(txHashModal('${hash}'))" target="_">${hash}</a>`;
}

const blockLink = (blkNum) => {
	return `<a class="mono" href="javascript:modal.show(blockModal('${blkNum}'))" target="_">${blkNum}</a>`;
}

const ethVal = (bind) => {
	return new Tilux({
		w: `<span bind="{$@bind}"><i class="fab fa-fw fa-ethereum"></i> <span class="ss-val">{$@value}</span></span>`,
		f: {
			get value() { return bind in Session ? toEther(Session[bind]) : toEther(bind); },
		},
	});
}

const tokVal = (bind, dec = 0) => {
	return new Tilux({
		w: `<span bind="{$@bind}"><i class="fas fa-fw fa-dot-circle"></i> <span class="ss-val">{$@value}</span></span>`,
		f: {
			get value() { return bind in Session ? toDecimal(Session[bind], dec) : toDecimal(bind, dec); },
		},
	});
}

const ethAddrInp = (bind, placeHolder = "Enter address 0x123aBc...") => {
	let id = newId('addrInp_');
	const self = new Tilux({
		w: `<span id="${id}">
				{>(idicon(@bindTo, 4, "inp-icon"))}
				<input id="${id}_inp" bind="{$@bindTo}" class="ss-input ss-addr ss-addr-inp" placeholder="${placeHolder}" pattern="0x[0-9|a-f|A-F]{40}">
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
	// Session.gaze(self.f.bindTo, (value) => {window[self.f.id].value = value});
	return self;
}


const ethHexInp = (bind, placeHolder = "0x123abc...") => {
	let id = newId('hexInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="fs14 inp-icon">0x</span>
				<input id="{$@id}_inp" class="ss-input ss-addr ss-bytes32" placeholder="${placeHolder}" pattern="0x[0-9|a-f|A-F]{64}">
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

const decInp = (bind, placeHolder = "0.00...") => {
	let id = newId('decInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="fs14 inp-icon">0.0</span>
				<input id="{$@id}_inp" class="ss-input ss-addr bytes32" placeholder="${placeHolder}" pattern="[0-9].[0-9]">
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

const txtInp = (bind, placeHolder = "abc...") => {
	let id = newId('txtInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="fs14 inp-icon">Abc</span>
				<input id="{$@id}_inp" class="ss-input ss-addr bytes32" placeholder="${placeHolder}">
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

const ethValInp = (bind, placeHolder="Value...") => {
	let id = newId('selInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="inp-icon"><i class="fab fa-fw fa-ethereum fs14"></i></span>
				<input id="{$@id}_inp" class="ss-input mono" placeholder="${placeHolder}" type="text" pattern="^(\d*\.)?\d+$">
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

const tokValInp = (bind, placeHolder="Value...") => {
	let id = newId('selInp_');
	const self = {
		w: `<span id="{$@id}">
				<span class="inp-icon"><i class="fas fa-fw fa-dot-circle fs14"></i></span>
				<input id="{$@id}_inp" class="ss-input mono" placeholder="${placeHolder}" type="text" pattern="^(\d*\.)?\d+$">
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

const textAreaInp = (bind, placeHolder="Enter test...") => {
	let id = newId('textAreaInp_');
	const self = {
		w: `<span id="${id}_wrapper">
				<span class="inp-icon"><i class="fas fa-fw fa-font fs-14"></i></span>
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

const range = (bind, min="0", max="100") => {
	let id = newId("range_");
	const self = new Tilux({
		w: `<input id="${id}" bind="{$@bind}" type="range" min="${min}" max="${max}">
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

const selectInp = (bind, entries) => {
	let id = `selInp_${bind}`;
	const self = {
		w: `<span id='${id}'><select id='${id}-inp' class="ss-input">{#(@s_entries,['option'])}</select></span>
		`,
		f: {
			id: id,
			bind: bind,
			s_entries: entries,
		},
		s: {
			[`#${id}-inp`]: {
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

const accountBal = (bind) => {
	return new Tilux({
		w:`
			<span id="{$@id}" class="balance">
				{>(@balance)}
			</span>
		`,
		f: {
			id: newId(),
			bind: bind,
			get balance() { return toEther(web3.eth.getBalance(Session[bind]))}
		}
	});
}

const accountSelect = (bind) => {
	return new Tilux({
		w: `<span id="{$@id}" bind="{$@bindPass}">
				{>(accountBal(@bindto))}
				{>(idicon(@bindto, 4, "inp-icon"))}
				{>(selectInp(@bindto, @accounts))}
			</span>`,
		f: {
			id: newId("accSel_"),
			bindto: bind,
			get accounts() { return accounts(); },
		},
	});
}



const datePicker = (bind) => {
	let id = `datePicker_${bind}`;
	const self = {
		w: `<span id="{$@id}">
				<i class="fas fa-fw fa-calendar-alt fs14"></i>
				<input id="{$@id}-dp" type="date" value="{$@value}">
			</span>
		`,
		f: {
			id: id,
			bind: bind,
			get value() { return Session[self.f.bind + 'str'] },
		},
		s: {
			[`#${id+'-dp'}`]: {
				input(event) {
					Session[self.f.bind + 'str'] = event.target.value;
					Session[self.f.bind] = event.target.valueAsNumber;
				},
			},
		},
	};

	return new Tilux(self);
}

const txButton = (id, text, action=()=>{}) => {
	return new Tilux({
		w: `<button id="${id}"><i class="fa fa-paper-plane" aria-hidden="true"> </i><label>${text}</label></button>
		`,
		f: {},
		s: {
			['#' + id]: {
				click() {action();}
			},
		},
	});
}

const checkBox = (bind, placeholder="Checkbox") => {
	let id = `selInp_${bind}`;
	return new Tilux({
		w: `<input id="{$@id}" type="checkbox" {>('checked', @checked)}> ${placeholder}
		`,
		f: {
			id: id,
			bind: bind,
			get checked() { return Session[this.bind]; }
		},
		s: {
			[`${id}`]: {
				input(event) { Session[self.f.bind] = event.target.value; }
			}
		},
	});
}
