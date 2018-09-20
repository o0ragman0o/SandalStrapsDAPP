const ValueABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_resource",
				"type": "bytes32"
			}
		],
		"name": "changeResource",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "regName",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "resource",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "value",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "units",
		"outputs": [
			{
				"name": "",
				"type": "bytes31"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_decimals",
				"type": "uint8"
			},
			{
				"name": "_units",
				"type": "bytes32"
			}
		],
		"name": "setAll",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "VERSION",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_creator",
				"type": "address"
			},
			{
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_decimals",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "_units",
				"type": "bytes32"
			}
		],
		"name": "Set",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_resource",
				"type": "bytes32"
			}
		],
		"name": "ChangedResource",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "ChangeOwnerTo",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "ChangedOwner",
		"type": "event"
	}];
const ValueContract = web3.eth.contract(ValueABI);

// $import ("js/apis/ValueAPI.js");

const formatValueEvents = (log) => {
	switch (log.event) {
		case 'Set': return Tilux.l(`
				<h4>Set</h4>
				<label class="evnt-label">Value</label> ${log.args._value/10**log.args._decimals}<br>
				<label class="evnt-label">Decimals</label> ${log.args._decimals}<br>
				<label class="evnt-label">Units</label> ${utf8(log.args._units)}<br>
			`);
			break;
		default: return formatRegBaseEvents(log);
	}
}

const valueForm = (k) => {
	const self = new Tilux({
		w: `
			<div id={$@id}>
				<h3 class="ss-title">Current Value | {$@value} {$@units}</h3>
				<div>
					<label class="evnt-label">decimals</label>{$@decimals}
				</div>
				<div class="{>('', @isOwner,'hidden')}"> 	
					<h3 class="ss-title">Set Value</h3>
					<div>
						<div class="{$!@showSetAll}">
							{>(decInp('setVal'))}
							<button id="value-set">Set Value</button>
						</div>
						<div class="{$@showSetAll}">
							<div class="{>('', @hasDecimals)}, 'hidden'">
								{>(decInp('setDec','Set decimal places (0 to 77)'))}
							</div>
							<div class="{>('', @hasUnits, 'hidden')}">
								{>(txtInp('setUnits','Set units'))}
							</div>
							<button id="all-set">Set All</button>
						</div>
						<div class="notice">
							Value precission for 'Set' is to be entered according to the 'decimals' as read from the contract<br>
							<span class="{>('', @hasUnits, 'hidden')}">
								Value precission for 'Set All' is to be entered according 
								to the decimal places entered in the decimal places field
							</span>
						</div>
					</div>
				</div>
			</div>
		`,
		f: {
			k: k,
			id: `valForm-${k.address}`,
			get hasDecimals() { return 'decimals' in k; },
			get hasUnits() { return 'units' in k; },
			get decimals() { return this.hasDecimals ? k.decimals().toNumber() : 0},
			get value() { return k.value().div(10**this.decimals); },
			get units() { return this.hasUnits ? utf8(k.units()) : ''},
			get isOwner() {return k.owner() === Session.currAccount;},
			get showSetAll() { return `setAll` in k ? '' : 'hidden'; }
		},
		s: {
			"#value-set": {
				"click": ()=>{ k.set(Session.setVal*10**self.f.decimals, {from: Session.currAccount}); },
			},
			"#all-set": { 
				"click": ()=>{ k.setAll(Session.setVal*10**Session.setDec, Session.setDec, Session.setUnits,{from: Session.currAccount}); },
			},			
		}
	}, CACHE);
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
					{>(regBase.advanced(@k))}
					{>(valueForm(@k))}
					{>(events(@k, formatValueEvents))}
				</div>`,
	
			f: {
				id: `value-${k.address}-adv`,
				k: k,
			},
			s: {
			},
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

resources["Value v0.4.3"] = {
	template: value,
	interface: ValueContract,
	docPath: "docs/ValueAPI.md"
}

resources["ValueFactory v0.4.3"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/ValueAPI.md"
}

console.log("ran Value.js");
