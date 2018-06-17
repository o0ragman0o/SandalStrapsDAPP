

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
					<div class="layer">
						<input id="key-input-{$@kAddr}" placeholder="Key" class="mono" type="text" value="{$@key}"></input>
						<button id="clear-key-btn">Clear Key</button><br />
					<select id="reg-in-name" class="ss-input" placeholder="Registrar">
						{#(['option'], @types)}
					</select>
						<textarea id="text-area-{$@kAddr}" placeholder="Enter bytes to store">{$@bytes}</textarea><br />
						<button id="set-btn">Set</button>
						<button id="clear-bytes-btn">Clear Bytes</button>
					</div>
					{>(events(@k, formatBytesMapEvents))}
				</div>`,
			f: {
				k: k,
				kAddr: k.address,
				key: '',
				bytes: '',
				types: [],
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
						self.f.k.store(self.f.string, {from: currAccountLux.address})
					},
				},
				"#clear-str-btn": {
					click: event => {
						self.f.k.clear(self.f.string, {from: currAccountLux.address})						
					}
				},
				"#clear-hsh-btn": {
					click: event => {
						self.f.k.clearHash(self.f.hash, {from: currAccountLux.address})						
					}
				},
			}
		});
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

console.log("ran BytesMap.js");
