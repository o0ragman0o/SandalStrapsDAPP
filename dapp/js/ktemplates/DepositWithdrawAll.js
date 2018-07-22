
/* API */
const DepositWithdrawAllABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_forwardTo","type":"address"}],"name":"changeForwardTo","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"forwardTo","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"}],"name":"ForwardingTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const DepositWithdrawAllContract = web3.eth.contract(DepositWithdrawAllABI);

/* Event formating template */
const formatDepositWithdrawAllEvents = (log, k) => {
	switch (log.event) {
		case 'ForwardingTo': return Tilux.l(`
				<h4>Forward To</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._to}'))}
				`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}

/* Owner specific template */
const depositWithdrawAllOwner = (k) => {
	let self = {
		w: `
			<h3 class="ss-title">Change Forwarding Address</h3>
			<div>
				<input id="fAddr-inp" placeholder="Forwarding Address" value="{$@fAddr}"></input>
				<button id="fwrd-btn">Set Address</button>
			</div>
		`,
		f: {
			k: k,
			fAddr: '',
		},
		s: {
			"#fAddr-inp": {
				'change': (event)=>{self.f.fAddr = event.target.value},
			},
			"#fwrd-btn": {
				'click': ()=>{if(isAddr(self.f.fAddr)) self.f.k.changeForwardTo(self.f.fAddr,{from:Session.currAccount})},
			}
		}
	}
	return self;
}

/* Template */
const depositWithdrawAll = {

	minimal: (k) => {
		return {
			w: `{>(regBase.minimal(@k))}
			`,
			f: {
				k: k
			},
		}
	},

	basic: (k) => {
		return {
			w: `<div id="{$@id}>
					{>(regBase.basic(k))}
				</div>`,
			f: {
				k: k
			},
		}
	},

	advanced: (k) => {
		let self = new Tilux({
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<h3 class="ss-title">Forwarding to</h3>
					<div>
						{>(addrLink(@forwardTo))}
					</div>
				{>(depositWithdrawAllOwner(@k), @isOwner)}
				{>(events(@k, formatDepositWithdrawAllEvents))}
				</div>
				`,
			f: {
				id: `depositWithdrawAll-${k.address}-adv`,
				k: k,
				get forwardTo() { return k.forwardTo();},
				get isOwner() {return k.owner() === Session.currAccount;},
			}
		}, CACHE);

		return self;
	}
}


resources["DepositWithdrawAll v0.4.1"] = {
	template: depositWithdrawAll,
	interface: DepositWithdrawAllContract,
	docPath: "docs/DepositWithdrawAllAPI.md"
}

resources["DepositWithdrawAllFactory v0.4.1"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/DepositWithdrawAllAPI.md"
}


console.log("ran DepositWithdrawAll.js");
