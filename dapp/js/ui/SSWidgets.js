
const addrLink = (addr) => {
	return `<span class="ss-addr" onclick={$!contracts['${addr}'] ? "modal.show(addressModal('${addr}'))" : "navPath.push('${addr}')"}>${addr}</span>`
}

const ethAddrSml = (addr) => {
	return `<img class="idicon-tny" src="{$blockieTny('${addr}')}" /> {>(addrLink('${addr}'))}`
}

const txHashLink = (hash) => {
	return `<a class="mono" href="javascript:modal.show(txHashModal('${hash}'))" target="_">${hash}</a>`;
}

const blockLink = (blkNum) => {
	return `<a class="mono" href="javascript:modal.show(blockModal('${blkNum}'))" target="_">${blkNum}</a>`;
}

const ethVal = (val) => {
	return `<i class="fab fa-fw fa-ethereum"></i> <span class="ss-val">${toEther(val)}</span>`;
}

const ethAddrInput = (addr, placeHolder = "Enter address") => {
	const self = new Tilux({
		w: `<span id="{$@id}"><img class="idicon-sml input-icon" src="{$blockieSml('{$@addr}')}" /><input id="ethAddr" class="ss-input ss-addr" placeholder="${placeHolder}" value="{$@addr}"></input></span>`,
		f: {
			addr: addr,
		},
		s: {
			'#ethAddr': {
				change: (event)=>{
					self.f.addr = event.target.value;
				}
			}
		}
	});

	return self;
}

const ethValInp = (value, placeHolder) => {
	const self = {
		w: `<input id="ethVal" class="ss-input" placeholder="${placeHolder}" value="{$@value}"></input>`,
		f: {
			value: value,
		},
		s: {
			'#ethVal': {
				change: (event)=>{
					self.f.value = event.target.value;
				}
			}
		}
	};

	return self;
}

const selectInput = (id, entries) => {
	const self = {
		w: `<select id='${id}' class="ss-input">{#(['option'], @entries)}</select>
		`,
		f: {
			id: id,
			selIndex: 0,
			entries: entries,
		},
		s: {
			"#select-inp" : {
				change(event) {
					self.f.selIndex = event.target.selectedIndex; 
				},
			}
		}
	};

	return self;
}