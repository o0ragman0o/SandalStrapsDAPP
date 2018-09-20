const InvoicesABI = [
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
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "etherBalanceOf",
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
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "remove",
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
		"inputs": [
			{
				"name": "_regName",
				"type": "bytes32"
			}
		],
		"name": "addressByName",
		"outputs": [
			{
				"name": "kAddr_",
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
		"constant": false,
		"inputs": [
			{
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"name": "_resource",
				"type": "bytes32"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_refundTo",
				"type": "address"
			}
		],
		"name": "newInvoice",
		"outputs": [
			{
				"name": "kAddr_",
				"type": "address"
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
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "register",
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
				"name": "_isPublic",
				"type": "bool"
			}
		],
		"name": "setPublic",
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
		"constant": false,
		"inputs": [
			{
				"name": "_kAddr",
				"type": "address"
			},
			{
				"name": "_resource",
				"type": "bytes32"
			}
		],
		"name": "changeResourceOf",
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
		"name": "withdrawAll",
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
		"name": "size",
		"outputs": [
			{
				"name": "",
				"type": "uint128"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "indexByAddress",
		"outputs": [
			{
				"name": "idx_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "commissionWallet",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "indexByName",
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
		"inputs": [
			{
				"name": "_idx",
				"type": "uint256"
			}
		],
		"name": "nameByIndex",
		"outputs": [
			{
				"name": "regName_",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addressByIndex",
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
		"name": "isPublic",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "cancelInvoice",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_kAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_refundTo",
				"type": "address"
			}
		],
		"name": "NewInvoice",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_address",
				"type": "address"
			}
		],
		"name": "Registered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_address",
				"type": "address"
			}
		],
		"name": "Removed",
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
	}
];
const InvoicesContract = web3.eth.contract(InvoicesABI);

const InvoiceABI = [
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
		"name": "amountDue",
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
		"constant": false,
		"inputs": [],
		"name": "destroy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawAll",
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
		"name": "refundTo",
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
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "changeRefundTo",
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
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"name": "_resource",
				"type": "bytes32"
			},
			{
				"name": "_value",
				"type": "uint256"
			},
			{
				"name": "_refundTo",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	}
];
const InvoiceContract = web3.eth.contract(InvoiceABI);

// $import ("js/apis/InvoicesAPI.js");

const invoice = {

	minimal: (k) => {
		return {
			w: `{>(regBase.minimal(@k))}
			`,
			f: {
				k: k,
			},			
		}
	},

	basic: (k) => {
		return {
			w: `{>(regBase.basic(@k))}
			`,
			f: {
				k: k,
			},			
		}
	},

	advanced: (k) => {
		const self = new Tilux({
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<h3 class="ss-title">Invoice</h3>
					<div>
						<label>Amount Due</label>{>(ethVal(@amountDue))}<br />
						<label>Refund Address</label>{>(ethAddrSml(@refundTo))}<br />
						<label>Resource</label>{$@resource}<br />
					</div>
					<div class="{>('',@isOwnerOfOwner,'hidden')}">
						<h3 class="ss-title">Change Resource</h3>
						<div>
							{>(ethHexInp('changeInvRes', "Resource Hash"))}
							<button id="change-res-btn">Change Resource</button>
						</div>
					</div>
					<div class="{>('',@isRefundee,'hidden')}">
						<h3 class="ss-title">Change Refund Address</h3>
						<div>
							{>(ethAddrInp('invNewRefAddr', "New refund address"))}
							<button id="refundee-btn">Change Refund Address</button>
						</div>
					</div>
					{>(events(@k, formatWithdrawableEvents))}
				</div>`,
			f: {
				id: `invoice-${k.address}-adv`,
				k: k,
				kAddr: checksumAddr(k.address),
				regName: utf8(k.regName()),
				version: utf8(k.VERSION()),
				owner: k.owner(),
				ownerOfOwner: contracts[k.owner()].owner(),
				get refundTo() {return k.refundTo();},
				get isOwnerOfOwner() {return this.ownerOfOwner === Session.currAccount;},
				get isRefundee() {return this.refundTo === Session.currAccount;},
				get resource() { return k.resource()},
				get amountDue() {return k.amountDue()},
			},
			s: {
				"#refundee-btn": {
					click: () => {
						k.changeRefundTo(Session.invNewRefAddr, {from: Session.currAccount, gas: 100000});
					},
				},
				"change-res-btn": {
					click: () => {
						contracts[k.address].changeResourceOf(k.address, Session.changeInvRes, {from: Session.currAccount, gas: 100000});
					},
				},
			}
		}, CACHE);

		return self;
	}
}


const formatInvoicesEvents = (log, k) => {
	switch (log.event) {
		case 'NewInvoice': return Tilux.l(`
			<h4>New Invoice</h4>
			<label>Address</label>{>(ethAddrSml('${log.args._kAddr}'))}<br />
			<label>Amount Payable</label>{>(ethVal('${log.args._value}'))}<br />
			<label>Refund Address</label>{>(ethAddrSml('${log.args._refundTo}'))}<br />
			`);
			break;
		case 'Removed': return Tilux.l(`
			<h4>Removed '${utf8(log.args._regName)}'</h4>
			<label>Address</label>{>(ethAddrSml('${log.args._address}'))}
			`);
			break;
		default: return formatRegistrarEvents(log, k);						
	}
}


const invoices = {

	minimal: (k) => {
		return {
			w: `{>(regBase.minimal(@k))}
			`,
			f: {
				k: k,
			},			
		}
	},

	basic: (k) => {
		return {
			w: `{>(regBase.basic(@k))}
			`,
			f: {
				k: k,
			},			
		}
	},

	advanced: (k) => {
		const self = new Tilux({
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<div class="{>('', @isOwner, 'hidden')}">
						<h3 class="ss-title">Create Invoice</h3>
						<div>
							{>(txtInp('invName', "Invoice Name"))}<br />
							{>(ethHexInp('resHash', "Resource Hash"))}<br />
							{>(ethValInp('invValue', "Invoice Value"))}<br />
							{>(ethAddrInp('invRefAddr', "Refund Address"))}<br />
							<button id="btn-crt-inv">Create New</button>
						</div>
						<h3 class="ss-title">Invoices</h3>
						<div class="ss-flex-container">
							{#(@invoices)}
						</div>
					</div>
					{>(events(@k, formatInvoicesEvents))}
				</div>`,
			f: {
				id: `invoices-${k.address}-adv`,
				k: k,
				get isOwner() {return k.owner() === Session.currAccount;},
				get invoices() {
					return invoices.getInvoices(k).map(addr=>Tilux.l(kCandles[addr].minimal));
				},
			},
			s: {
				"#btn-crt-inv": {
					click: ()=>{
						self.f.k.newInvoice(
							Session.invName,
							Session.resHash || '',
							toWei(Session.invValue),
							Session.invRefAddr,
							{from: Session.currAccount, gas:600000}
						);
					}
				}
			}
		}, CACHE);

		return self;
	}
}


invoices.getInvoices = function(k) {
	let n = invoices.getNames(k);
	let r = [];
	for(let i = 0; i < n.length; i++) {
		r.push(k.addressByName(n[i]));
	}
	return r;
}


invoices.getNames = function(k) {
	let i = 1;
	let s = k.size().toNumber();
	let n = [];
	for(i; i <= s; i++) {
		let name = web3.toUtf8(k.nameByIndex(i));
		if(name) n.push(name);
	}
	return n.sort();
}


resources["Invoice v0.4.0"] = {
	template: invoice,
	interface: InvoiceContract,
	docPath: "docs/InvoicesAPI.md"
}

resources["Invoices v0.4.0"] = {
	template: invoices,
	interface: InvoicesContract,
	docPath: "docs/InvoicesAPI.md"
}

resources["InvoicesFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/InvoicesAPI.md"
}

resources["Invoice v0.4.3"] = {
	template: invoice,
	interface: InvoiceContract,
	docPath: "docs/InvoicesAPI.md"
}

resources["Invoices v0.4.3"] = {
	template: invoices,
	interface: InvoicesContract,
	docPath: "docs/InvoicesAPI.md"
}

resources["InvoicesFactory v0.4.3"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/InvoicesAPI.md"
}


console.log("ran Invoices.js");

