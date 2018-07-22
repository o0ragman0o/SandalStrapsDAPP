const StringsMapABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_string","type":"string"}],"name":"store","outputs":[{"name":"hash_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_string","type":"string"}],"name":"clear","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"}],"name":"clearHash","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"strings","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_hash","type":"bytes32"}],"name":"Stored","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"ReceivedOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"}];
const StringsMapContract = web3.eth.contract(StringsMapABI);

const formatStringsMapEvents = (log, k) => {
	switch (log.event) {
		case 'Stored': return Tilux.l(`
			<h4>Stored</h4>
			<label>Hash</label><span class="mono">${log.args._hash}</span>
			`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}


const stringsMap = {

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
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<h3 class="ss-title">Lookup / Store / Clear</h3>
					<div>
						{>(ethHexInp('@hash'))}
						<button id="clear-hsh-btn">Clear By Hash</button><br />
						{>(textAreaInp('@string',"Enter string to store"))}<br />
						<button id="store-btn">Store</button>
						<button id="clear-str-btn">Clear By String</button>
						<div class="notice">
							Only the contract owner or string setter can clear an entry.
						</div>
					</div>
					{>(events(@k, formatStringsMapEvents))}
				</div>`,
			f: {
				id: `stringsMap-${k.address}-adv`,
				k: k,
				kAddr: k.address,
				hash: '',
				string: '',

			},
			s: {
				"#get-hash": {
					change: event => {
						self.f.hash = event.target.value;
						self.f.string = self.f.k.strings(self.f.hash);
					},
				},
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


resources["StringsMap v0.4.0"] = {
	template: stringsMap,
	interface: StringsMapContract,
	docPath: "docs/StringsMapAPI.md"
}

resources["StringsMapFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/StringsMapAPI.md"
}


console.log("ran StringsMap.js");
