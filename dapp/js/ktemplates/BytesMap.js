
/* API */
const BytesMapABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"clearHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"bytes4"},{"name":"_bytes","type":"bytes"}],"name":"clear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_type","type":"bytes4"},{"name":"_bytes","type":"bytes"}],"name":"store","outputs":[{"name":"hash_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"bytesMap","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_hash","type":"bytes32"}],"name":"Stored","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const BytesMapContract = web3.eth.contract(BytesMapABI);


/* Events formating */
const formatBytesMapEvents = (log, k) => {
	switch (log.event) {
		case 'Stored': return Tilux.l(`
			<h4>Stored</h4>
			<label>Hash</label><span class="mono">${log.args._hash}</span>
			`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}

/* Template */
const bytesMap = {

	minimal: (k) => {
		return {
			w: `{>(regBase.minimal(@k))}`,
			f: {
				k: k,
			}
		}
	},

	basic: (k) => {
		return {
			w: `<div id="{$@id}">
				{>(regBase.basic(@k))}
				</div>`,
			f: {
				k: k,
			}
		}
	},

	advanced: (k) => {
		const self =  new Tilux({
			w: `<div id="{$@id}>"
					{>(regBase.advanced(@k))}
					<h3 class="ss-title">Lookup / Store / Clear</h3>
					<div>
						{>(ethHexInp('bmKey', 'Lookup key'))}
						<button id="clear-key-btn">Clear Key</button><br>
						{>(selectInp("bytesType", @types))}<br>
						{>(textAreaInp('bmBytes', 'Bytes to store'))}<br>
						<button id="set-btn">Set</button>
						<button id="clear-bytes-btn">Clear Bytes</button>
					</div>
					{>(events(@k, formatBytesMapEvents))}
				</div>`,
			f: {
				k: k,
				kAddr: k.address,
				get bytes() {self.f.k.bytes(Session['bmKey'])},
				types: [],
			},
			s: {
				"#string": {
					change: event => {
						self.f.string = event.target.value;
					},
				},
				"#store-btn": {
					click: event => {
						self.f.k.store(self.f.string, {from: Session.currAccount})
					},
				},
				"#clear-str-btn": {
					click: event => {
						self.f.k.clear(self.f.string, {from: Session.currAccount})						
					}
				},
				"#clear-hsh-btn": {
					click: event => {
						self.f.k.clearHash(self.f.hash, {from: Session.currAccount})						
					}
				},
			}
		}, CACHE);
		return self;
	}
}

bytesMap.getBytes = function(e, k) {
	let types = "0x42ccbbbe";
	let b = k.bytes(e.target.value);
	let t = k.bytes(types+b.slice[2,10]);
	$id("text-area-${k.address}").innerHTML = web3.toUtf8(t);
}

resources["BytesMap v0.4.0"] = {
	template: bytesMap,
	interface: BytesMapContract,
	docPath: "docs/BytesMapAPI.md"
}

resources["BytesMapFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/BytesMapAPI.md"
}

resources["BytesMap v0.4.3"] = {
	template: bytesMap,
	interface: BytesMapContract,
	docPath: "docs/BytesMapAPI.md"
}

resources["BytesMapFactory v0.4.3"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/BytesMapAPI.md"
}

console.log("ran BytesMap.js");
