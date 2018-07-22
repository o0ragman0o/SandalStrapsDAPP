const ValueABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_decimals","type":"uint8"}],"name":"setDecimals","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const ValueContract = web3.eth.contract(ValueABI);

// $import ("js/apis/ValueAPI.js");

const formatValueEvents = (log) => {
	return formatRegBaseEvents(log);
}

const valueOwner = (k) => {
	const self = {		
		w: `<div>
				<input id="value-inp" class="ss-input" type="number" placeholder="Set Value" value="{$@inpValue}"/>
				<button id="value-set">Set Value</button>
			</div>
			<div>
				<input id="deci-inp" class="ss-input" type="number" placeholder="Set Decimals" min="0" max="77" value="{$@inpDeci}"/>
				<button id="deci-set">Set Decimal</button>
			</div>
			`,
		f: {
			k: k,
			inpValue: 0,
			inpDeci: 0,
		},
		s: {
			"#value-inp": {
				"change": event => {self.f.inpValue = event.target.value}
			},
			"#deci-inp": {
				"change": event => {self.f.inpDeci = event.target.value}
			},
			"#value-set": {
				"click": ()=>{ k.set(self.f.inpValue, {from: Session.currAccount}); },
			},
			"#deci-set": { 
				"click": ()=>{ k.setDecimal(self.f.inpDeci, {from: Session.currAccount}); },
			},			
		}
	}
	return self;
}

const value = {
	minimal: (k) => {
		return {
			w: `{>(regBase.minimal(@k))}`,
			f: {
				k: k,
			},
		}
	},

	basic: (k) => {
		return {
			w: `<div class="tplt" id="{$@id}">
					{>(regBase.basic(@k))}
					{$@value}
				</div>
				`,
			f: {
				k: k,
				id: `value-${k.address}.bas`,
				decimals() { return k.decimals().toNumber()},
				value() {return k.value().div(10**k.decimals()).toNumber()},
			}			
		}
	},

	advanced: (k) => {
		const self = new Tilux({
			w: `
				<div id="{$@id}">
					<div>
						{>(regBase.advanced(@k))}
					</div>
					<h3 class="ss-title">Current Value</h3>
					<div>
						<h2>{$@value} {$@units}</h2>
						<label class="evnt-label">decimals</label>{$@decimals}
						{>(valueOwner(@k), @isOwner)}
					</div>
					{>(events(@k, formatValueEvents))}

				</div>`,
	
			f: {
				k: k,
				id: `value-${k.address}.adv`,
				get decimals() { return k.decimals().toNumber()},
				get value() { return k.value().div(10**k.decimals()).toNumber(); },
				get units() { return 'units' in k ? utf8(k.units()) : ''},
				get isOwner() { return k.owner() === Session.currAccount; },
			},
			s: {
			}
		}, CACHE);
		return self;
	}
}


resources["Value v0.4.0"] = {
	template: value,
	interface: ValueContract,
	docPath: "docs/ValueAPI.md"
}

resources["ValueFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/ValueAPI.md"
}

console.log("ran Value.js");
