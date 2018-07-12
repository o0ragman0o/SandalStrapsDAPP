const RegistrarABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"remove","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_regName","type":"bytes32"}],"name":"addressByName","outputs":[{"name":"kAddr_","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"indexByAddress","outputs":[{"name":"idx_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"indexByName","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_idx","type":"uint256"}],"name":"nameByIndex","outputs":[{"name":"regName_","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addressByIndex","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_regName","type":"bytes32"},{"indexed":true,"name":"_address","type":"address"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_regName","type":"bytes32"},{"indexed":true,"name":"_address","type":"address"}],"name":"Removed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const RegistrarContract = web3.eth.contract(RegistrarABI);

// $import ("js/apis/RegistrarAPI.js");

const formatRegistrarEvents = (log, k) => {
	switch (log.event) {
		case 'Registered': return Tilux.l(`
			<h4>Registered '${utf8(log.args._regName)}'</h4>
			<label>Address</label>{>(ethAddrSml('${log.args._address}'))}
			`);
			break;
		case 'Removed': return Tilux.l(`
			<h4>Removed '${utf8(log.args._regName)}'</h4>
			<label>Address</label>{>(ethAddrSml('${log.args._address}'))}
			`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}

const registrar = {

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
			w: `
				<div class="" id="{$@id}">
					{>(regBase.basic(@k))}
					<input type="checkbox" />
					<ul>{#(['li'], @registered)}</ul>
				</div>
			`,
			f: {
				id: `registrar-${k.address}-bas`,
				k: k,
				get registered() {
					var seen = new WeakSet();
					return registrar.getRegistered(k).map(addr=>{
						if (!seen.has(addr)) return kCandles[addr].minimal;
					})
				},
			}
		}
	},

	advanced: (k) => {
		const self = new Tilux({
			w: `
				<div class="" id="{$@id}">
					{>(regBase.advanced(@k))}
					<div class="layer">
						{>(ethAddrInp('newRegAddr', 'Contract Address'))}
						<button id="register-btn">Register Contract</button><br />
						* Note: This is an owned public registrar.<br />  
						Anyone can register a contract and remove their own registered contract.<br />
						The registrar owner may remove or replace any registered contract.
					</div>
					<div class="layer ss-flex-container">
						{#(@registered)}
					</div>
					{>(events(@k, formatRegistrarEvents))}
				</div>
			`,
			f: {
				id: `registrar-${k.address}-adv`,
				k: k,
				rAddr: '',
				get registered () {
					return registrar.getRegistered(k).map(addr=>Tilux.l(kCandles[addr].minimal));
				},
			},
			s: {
				"#register-inp": {
					"change": (event) => {self.f.rAddr = event.target.value;},
				},
				"#register-btn": {
					"click": () => { self.f.k.register(self.f.rAddr,{from: currAccount, gas: 100000}); },
				},
			}
		})
		return self;
	},
}

registrar.getRegistered = function(k) {
	let n = registrar.getNames(k);
	let r = [];
	for(let i = 0; i < n.length; i++) {
		let addr = k.addressByName(n[i]);
		if(addr) r.push(addr);
	}
	return r;
}


registrar.getNames = function(k) {
	let i = 1;
	let s = k.size().toNumber();
	let n = [];
	for(i; i <= s; i++) {
		let name = web3.toUtf8(k.nameByIndex(i));
		if(name) n.push(name);
	}
	return n.sort();
}

resources["Registrar v0.4.0"] = {
	template: registrar,
	interface: RegistrarContract,
	docPath: "docs/RegistrarAPI.md"
}

resources["RegistrarFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/RegistrarAPI.md"
}

console.log("ran Registrar.js");

