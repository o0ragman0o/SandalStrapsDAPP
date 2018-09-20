const SandalStrapsABI = [
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
	},
	{
		"constant": false,
		"inputs": [],
		"name": "_init",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_by",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_factoryName",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "ProductCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "RegistrarRegister",
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
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "RegistrarRemove",
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
				"name": "_kAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "ChangeOwnerOf",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "ReceivedOwnership",
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
		"constant": false,
		"inputs": [
			{
				"name": "_kAddr",
				"type": "address"
			},
			{
				"name": "_callData",
				"type": "bytes"
			}
		],
		"name": "callAsContract",
		"outputs": [
			{
				"name": "success_",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
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
				"name": "_kAddr",
				"type": "address"
			},
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "changeOwnerOf",
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
				"name": "_factory",
				"type": "bytes32"
			},
			{
				"name": "_regName",
				"type": "bytes32"
			},
			{
				"name": "_prodOwner",
				"type": "address"
			}
		],
		"name": "newProduct",
		"outputs": [
			{
				"name": "kAddr_",
				"type": "address"
			}
		],
		"payable": true,
		"stateMutability": "payable",
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
		"name": "receiveOwnershipOf",
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
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "registerFactory",
		"outputs": [
			{
				"name": "success_",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "registerIn",
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
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "removeFrom",
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
				"name": "_regNames",
				"type": "bytes32[]"
			},
			{
				"name": "_reserved",
				"type": "bool[]"
			}
		],
		"name": "reserveNames",
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
				"name": "_kAddr",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "setValueOf",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
		"constant": true,
		"inputs": [],
		"name": "__initFuse",
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
		"inputs": [
			{
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_regName",
				"type": "bytes32"
			}
		],
		"name": "addressByNameFrom",
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
		"name": "bootstrap",
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
		"name": "creator",
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
		"name": "getCommissionDivisor",
		"outputs": [
			{
				"name": "div_",
				"type": "uint256"
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
				"name": "_factory",
				"type": "bytes32"
			}
		],
		"name": "getProductPrice",
		"outputs": [
			{
				"name": "price_",
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
		"name": "getRegisterFactoryFee",
		"outputs": [
			{
				"name": "fee_",
				"type": "uint256"
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
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "indexByAddressFrom",
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
		"inputs": [
			{
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_regName",
				"type": "bytes32"
			}
		],
		"name": "indexByNameFrom",
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
		"name": "metaRegistrar",
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
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_kAddr",
				"type": "address"
			}
		],
		"name": "nameByAddressFrom",
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
				"name": "_registrar",
				"type": "bytes32"
			},
			{
				"name": "_idx",
				"type": "uint256"
			}
		],
		"name": "nameByIndexFrom",
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
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "reservedNames",
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
	}
];
const SandalStrapsContract = web3.eth.contract(SandalStrapsABI);

// $import ("js/apis/SandalStrapsAPI.js");

const alphaStrapsAddr = {
	1: "0x4CfD8a09A3C88d20A5B166f86a9DfcB48eB464aF",
	108: "0x5f84f8c8473cc57222a03ee4659425068359a221", //"0xa152a8090e0ca8d8529d7a53cdcfc7876f7e487b",//"0x20fA3ea7819099D59C567a88d7055E52Ff4BDFB1", //"0xC81eAd39FB82Cd54c819bb4cC542eD1Ac97b378A",
	}[Session.network.network];


const formatSandalStrapsEvents = (log, k) => {
	switch (log.event) {
		case 'ProductCreated': return Tilux.l(`
				<h4>'${utf8(log.args._regName)}' Created from Factory '${utf8(log.args._factoryName)}'</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._kAddr}'))}<br>
				<label>Created By</label> {>(ethAddrSml('${log.args._by}'))}<br>
				`);
			break;
		case 'RegistrarRegister': return Tilux.l(`
				<h4>Registered in '${utf8(log.args._registrar)}'</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._kAddr}'))}
			`);
			break;
		case 'RegistrarRemove': return Tilux.l(`
				<h4>Deregistered from '${utf8(log.args._registrar)}'</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._kAddr}'))}
			`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}


const fromFactoryPrice = (k) => {
	return {
		w: `
			<span id='{$@id}'><b class="upper">{$@name}</b> for {>(ethVal(@price))}</span>
		`,
		f: {
			id: "factory-price",
			name: "...",
			price: '0.0',
		}
	}
}
 

const sandalStrapsOwner = (k) => {
	let metaReg = contracts[k.metaRegistrar()];
	let regReg = contracts[metaReg.addressByName('registrar')];
	const self = {
		w: `
			<h3 class="ss-title">Register Contract in Selected Registrar</h3>
			<div>
				<span class="inp-icon fa-14"><i class="fas fa-th"></i></span>
				{>(selectInp('regInRegName', @rr_n))}<br>
				{>(ethAddrInp('regInRegAddr'))}<br>
				<button id="btn-reg-in">Register</button>
			</div>
			<h3 class="ss-title">Remove Registration from Selected Registrar</h3>
			<div>
				<span class="inp-icon fa-14"><i class="fas fa-th"></i></span>
				{>(selectInp('remFmReg', @rr_n))}<br>
				{>(ethAddrInp('remFmRegAddr'))}<br>
				<button id="btn-reg-rem">Remove</button>
			</div>
			<h3 class="ss-title">Change The Owner of a SandalStraps Owned Contract</h3>
			<div>
				{>(ethAddrInp('chgOwnK', "Contract Address"))}<br>
				{>(ethAddrInp('chgOwnO', "New Owner Address"))}<br>
				<button id="btn-chg-owner">Change Owner</button>
			</div>
			<h3 class="ss-title">Change Resource of a SandalStraps Owned Contract</h3>
			<div>
				{>(ethAddrInp('chgResK',"Contract Address"))}<br>
				{>(ethHexInp('chgResV', "Resource"))}<br>
				<button id="btn-chg-res">Change Resource</button>
			</div>
			<h3 class="ss-title">Set Value of a Contract Owned by SandalStraps</h3>
			<div>
				{>(ethAddrInp('setValK', "Contract Address"))}<br>
				{>(decInp('setValV', "Value"))}<br>
				{>(decInp('setValD', "Decimals"))}<br>
				<button id="btn-set-val">Set Value Of...</button>
			</div>
			<h3 class="ss-title">Reserve a Name</h3>
			<div>
				<textarea id="rsv-names" class="ss-input" placeholder='Reserved Names JSON, e.g.[{name:"reservethisname", reserved:"true"},{name:"clearthisname", reserved:"false"},...]'></textarea>
				<button id="btn-rsv-names">Reserve Names</button>
			</div>
			<h3 class="ss-title">Call a Contract Owned by SandalStraps</h3>
			<div>
				{>(ethAddrInp('pxyCallK', "Contract address..."))}<br>
				{>(textAreaInp('pxyCallD', "TX call data..."))}<br>
				<button id="btn-pxy-call">Call</button>
			</div>
		`,
		f: {
			k: k,
			rr_n: [''].concat(registrar.getNames(metaReg)),
			regInName: '',
			regInKAddr: '',
			regRemName: '',
			regRemKAddr: '',
			chgOwnerKAddr: '',
			chgOwnerOAddr: '',
			chgResKAddr: '',
			chgResVal: '',
			setValKAddr: '',
			setValVal: 0,
			rsvNames: '',
			pxyCallKAddr: '',
			pxyCallData: ''
		},
		s: {
			"#reg-in-name": {
				'change': event => self.f.regInName = event.target.value,
			},
			"#reg-in-kaddr": {
				'change': event => self.f.regInKAddr = event.target.value,
			},
			"#btn-reg-in": {
				'click': () => self.f.k.registerIn(Session.regInRegName, Session.regInRegAddr, {from: Session.currAccount}),
			},

			"#reg-rem-name": {
				'change': event => self.f.regRemName = event.target.value,
			},
			"#reg-rem-kaddr": {
				'change': event => self.f.regRemKAddr = event.target.value,
			},
			"#btn-reg-rem": {
				'click': () => self.f.k.removeFromIn(self.f.regRemName, self.f.regRemKAddr, {from: Session.currAccount}),
			},

			"#chg-owner-kaddr": {
				'change': event => self.f.chgOwnerKAddr = event.target.value,
			},
			"#chg-owner-oaddr": {
				'change': event => self.f.chgOwnerOAddr = event.target.value,
			},
			"#btn-chg-owner": {
				'click': () => self.f.k.changeOwnerOf(self.f.chgOwnerKAddr, self.f.chgOwnerOAddr, {from: Session.currAccount}),
			},

			"#chg-res-kaddr": {
				'change': event => self.f.chgResKAddr = event.target.value,
			},
			"#chg-res-val": {
				'change': event => self.f.chgResVal= event.target.value,
			},
			"#btn-chg-res": {
				'click': () => self.f.k.changeResourceOf(self.f.chgResKAddr, self.f.chgResVal, {from: Session.currAccount}),
			},

			"#set-val-kaddr": {
				'change': event => self.f.setValKAddr = event.target.value,
			},
			"#set-val-val": {
				'change': event => self.f.setValVal= event.target.value,
			},
			"#btn-set-val": {
				'click': () => {
					let decimals = 0;
					let vk = contracts[self.f.setValKAddr];
					if('decimals' in vk) decimals = contracts[self.f.setValKAddr].decimals();
					self.f.k.setValueOf(self.f.setValKAddr, self.f.setValVal*10**decimals, {from: Session.currAccount});
				},
			},

			"#rsv-names": {
				'change': event => self.f.rsvNames = event.target.value,
			},
			"#btn-rsv-names": {
				'click': () => self.f.k.reserveNames(self.f.regName, self.f.regKAddr, {from: Session.currAccount}),
			},

			"#pxy-call-kaddr": {
				'change': event => self.f.pxyCallKAddr = event.target.value,
			},
			"#pxy-call-data": {
				'change': event => self.f.pxyCallData = event.target.value,
			},
			"#btn-pxy-call": {
				'click': () => self.f.k.callAsContract(self.f.pxyCallKAddr, self.f.pxyCallData, {from: Session.currAccount}),
			},
		}
	}

	return self;
}

const ssBody = (k) => {
	let metaReg = contracts[k.metaRegistrar()];
	let factReg = contracts[metaReg.addressByName('factories')];
	const self = new Tilux({
		w: `
			<div id="{$@id}">
				{>(regInit(@k), @reqInit && @isOwner)}
				{>(sandalStrapsOwner(@k), !@reqInit && @isOwner)}
				<h3 class="ss-title">Core Contracts</h3>
				<div>
					<div class="ss-flex-container">
						{#(@registered)}
					</div>
				</div>
				<h3 class="ss-title">Create a <strong>{$@crtProdFact}</strong> contract for  {>(ethVal(@crtProdPrice))}</h3>
				<div id="selFactory">
					<span class="inp-icon"><i class="fas fa-industry"></i></span>
					{>(selectInp('factorySel', @factNames))}<br>
					{>(txtInp('newProdName', 'New contract name...'))} <br>
					{>(ethAddrInp('newProOwnerAddr', 'Owner address (optional)'))}
					<button id="btn-crt-prod">Create New...</button>
					<div class="ss-flex-container {$@isSelFact}">{>(@selFact)}</div>
					<div class="notice">
						A product contract created here will be registered in the SandalStraps organisation
						and be owned by the owner address or the creating account if no owner assress is provided.
					</div>
				</div>
				<h3 class="ss-title">Add a factory</h3>
				<div>
					{>(ethAddrInp('addFactAddr', 'Factory address...'))} <button id="add-factory-btn">Add Factory</button>
					<div class="ss-flex-container {$@isAddFact}">{>(@addFact)}</div>
					<div class="notice">
						Registering a factory will also create and register a Registrar contract for the factory's products.
					</div>
				</div>
			</div>
		`,
		f: {
			id: `sandalstraps-${k.address}-body`,
			k: k,
			bind: 'factorySel addFactAddr',
			metaReg: metaReg,
			factReg: factReg,
			factNames: [''].concat(registrar.getNames(factReg)),
			addFactAddr: '',
			crtProdFact: '',
			crtProdName: '',
			crtProdOwner: '',
			crtProdPrice: new BigNumber(0),
			get reqInit() { return k.__initFuse().toNumber(); },
			get isOwner() {return k.owner() === Session.currAccount;},
			get selFactAddr() {return !Session.factorySel ? '' : this.factReg.addressByName(Session.factorySel)},
			get selFact() { return this.selFactAddr ? kCandles[this.selFactAddr].minimal : ''; },
			get isSelFact() { return isFactory(this.selFact) ? '' : 'hidden'; },
			get addFact() { return isAddr(Session.addFactAddr) ? kCandles[Session.addFactAddr].minimal : ''; },
			get isAddFact() { return isFactory(this.addFact) ? '' : 'hidden'; },
			get registered () {
				return registrar.getRegistered(metaReg).map(addr=>Tilux.l(kCandles[addr].minimal));
			},
		},
		s:{
			'#add-factory-btn': {
				click: ()=>{
					if(self.f.isAddFact) {
						k.registerFactory(Session.addFactAddr, {from: Session.currAccount, gas:1500000})
					}
				},
			},
			'#btn-crt-prod': {
				click: () => self.f.k.newProduct(Session.factorySel, Session.newProdName, Session.newProdOwnerAddr || '',
					{from: Session.currAccount, value: self.f.crtProdPrice, gas: 6000000}),
			},
		}
	});
	return self;
}

const sandalStraps = {
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
			w: `{>(regBase.basic(@k))}`,
			f: {
				k: k,
			}
		}
	},
	
	advanced: (k) => {
		const self = new Tilux({
			w: `
			<div class="" id="{$@id}" bind="factory_sel">
				{>(regBase.advanced(@k))}
				{>(ssBody(@k), @isInit,'<h3 class="ss-title important">Contract is not initialized</h3><div></div>')}
				{>(events(@k, formatSandalStrapsEvents))}
			</div>
			`,
			f: {
				id: `sandalstraps-${k.address}-adv`,
				k: k,
				kAddr: k.address,
				get initFuse() { return k.__initFuse().toNumber()},
				get isInit() { return !this.initFuse; },
			},
			s: {
			},
		}, CACHE);

		return self;
	},
}



resources["SandalStraps v0.4.0"] = {
	template: sandalStraps,
	interface: SandalStrapsContract,
	docPath: "docs/SandalStrapsAPI.md"
}

resources["SandalStrapsFactory v0.4.0"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/SandalStrapsAPI.md"
}

resources["SandalStraps v0.4.1"] = {
	template: sandalStraps,
	interface: SandalStrapsContract,
	docPath: "docs/SandalStrapsAPI.md"
}

resources["SandalStrapsFactory v0.4.1"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/SandalStrapsAPI.md"
}

resources["SandalStraps v0.4.3"] = {
	template: sandalStraps,
	interface: SandalStrapsContract,
	docPath: "docs/SandalStrapsAPI.md"
}

resources["SandalStrapsFactory v0.4.3"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/SandalStrapsAPI.md"
}

console.log("ran SandalStraps.js");
