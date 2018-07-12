const SandalStrapsABI = [{"constant":true,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_kAddr","type":"address"}],"name":"nameByAddressFrom","outputs":[{"name":"regName_","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"},{"name":"_value","type":"uint256"}],"name":"setValueOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_kAddr","type":"address"}],"name":"removeFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCommissionDivisor","outputs":[{"name":"div_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"}],"name":"receiveOwnershipOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_kAddr","type":"address"}],"name":"indexByAddressFrom","outputs":[{"name":"idx_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"_init1","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"reservedNames","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRegisterFactoryFee","outputs":[{"name":"fee_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"metaRegistrar","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_idx","type":"uint256"}],"name":"nameByIndexFrom","outputs":[{"name":"regName_","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"_init2","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_kAddr","type":"address"}],"name":"registerIn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_factory","type":"bytes32"},{"name":"_regName","type":"bytes32"},{"name":"_prodOwner","type":"address"}],"name":"newProduct","outputs":[{"name":"kAddr_","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"}],"name":"registerFactory","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"},{"name":"_resource","type":"bytes32"}],"name":"changeResourceOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"},{"name":"_callData","type":"bytes"}],"name":"callAsContract","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_factory","type":"bytes32"}],"name":"getProductPrice","outputs":[{"name":"price_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_regName","type":"bytes32"}],"name":"indexByNameFrom","outputs":[{"name":"idx_","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"__initFuse","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_registrar","type":"bytes32"},{"name":"_regName","type":"bytes32"}],"name":"addressByNameFrom","outputs":[{"name":"kAddr_","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_regNames","type":"bytes32[]"},{"name":"_reserved","type":"bool[]"}],"name":"reserveNames","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"},{"name":"_owner","type":"address"}],"name":"changeOwnerOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"bootstrap","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_by","type":"address"},{"indexed":true,"name":"_factoryName","type":"bytes32"},{"indexed":true,"name":"_regName","type":"bytes32"},{"indexed":false,"name":"_kAddr","type":"address"}],"name":"ProductCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_registrar","type":"bytes32"},{"indexed":true,"name":"_kAddr","type":"address"}],"name":"RegistrarRegister","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_registrar","type":"bytes32"},{"indexed":true,"name":"_kAddr","type":"address"}],"name":"RegistrarRemove","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"ReceivedOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"},{"indexed":true,"name":"_owner","type":"address"}],"name":"ChangeOwnerOf","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const SandalStrapsContract = web3.eth.contract(SandalStrapsABI);

// $import ("js/apis/SandalStrapsAPI.js");

const alphaStrapsAddr = {
	1: "0x4CfD8a09A3C88d20A5B166f86a9DfcB48eB464aF",
	108: "0xC81eAd39FB82Cd54c819bb4cC542eD1Ac97b378A",
	}[Session.network.network];


const formatSandalStrapsEvents = (log, k) => {
	switch (log.event) {
		case 'ProductCreated': return Tilux.l(`
				<h4>'${utf8(log.args._regName)}' Created from Factory '${utf8(log.args._factoryName)}'</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._kAddr}'))}<br />
				<label>Created By</label> {>(ethAddrSml('${log.args._by}'))}<br />
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
			<div class="layer">
				<h3>SandalStraps Owner Functions</h3>
				<div class="ss-panel">
					{>(selectInp('regInReg', @rr_n))}<br />
					{>(ethAddrInp('regRegAddr'))}<br />
					<button id="btn-reg-in">Register In...</button>
				</div>
				<div class="ss-panel">
					{>(selectInp('remFmReg', @rr_n))}<br />
					{>(ethAddrInp('remFmRegAddr'))}<br />
					<button id="btn-reg-rem">Remove From...</button>
				</div>
				<div class="ss-panel">
					{>(ethAddrInp('chgOwnK', "Contract Address"))}<br />
					{>(ethAddrInp('chgOwnO', "New Owner Address"))}<br />
					<button id="btn-chg-owner">Change Owner Of...</button>
				</div>
				<div class="ss-panel">
					{>(ethAddrInp('chgResK',"Contract Address"))}<br />
					{>(ethHexInp('chgResV', "Resource"))}<br />
					<button id="btn-chg-res">Change Resource Of...</button>
				</div>
				<div class="ss-panel">
					{>(ethAddrInp('setValK', "Contract Address"))}<br />
					{>(decInp('setValV', "Value"))}<br />
					{>(decInp('setValD', "Decimals"))}<br />
					<button id="btn-set-val">Set Value Of...</button>
				</div>
				<div class="ss-panel">
					<textarea id="rsv-names" class="ss-input" placeholder='Reserved Names JSON, e.g.[{name:"reservethisname", reserved:"true"},{name:"clearthisname", reserved:"false"},...]'></textarea>
					<button id="btn-rsv-names">Reserve Names</button>
				</div>
				<div class="ss-panel">
					{>(ethAddrInp('pxyCallK', "Contract address..."))}
					{>(textAreaInp('pxyCallD', "TX call data..."))}
					<button id="btn-pxy-call">Call Contract By Proxy</button>
				</div>
			</div>
		`,
		f: {
			k: k,
			rr_n: [''].concat(registrar.getNames(regReg)),
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
				'click': () => self.f.k.registerIn(self.f.regInName, self.f.regKAddr, {from: Session.currAccount}),
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
		let metaReg = contracts[k.metaRegistrar()];
		let factReg = contracts[metaReg.addressByName('factories')];
		const self = new Tilux({
			w: `
			<div class="" id="{$@id}">
				{>(regBase.advanced(@k))}
				{>(kCandles[@metaReg.address].minimal)}
				{>(sandalStrapsOwner(@k), @isOwner)}
				<div class="layer">
					<h3>User Functions</h3>
					<div class="ss-panel">
						<h3>Create a <strong>{$@crtProdFact}</strong> contract for  {>(ethVal(@crtProdPrice))}</h3>
						{>(selectInp('factory_sel', @fc_n))} <br />
						{>(txtInp('newProdName', 'New contract name...'))} <br />
						{>(ethAddrInp('newProOwnerAddr', 'Owner address (optional)'))} <br />
						<button id="btn-crt-prod">Create New...</button> <br />
						{>(@selFact)}
					</div>
					<div class="ss-panel">
						<h3>Add a factory</h3>
						{>(ethAddrInp('newFactAddr', 'Factory address...'))}  <br />
						<button id="add-factory-btn">Add Factory</button>  <br />
						{>(@addFact)}
					</div>
				</div>
				{>(events(@k, formatSandalStrapsEvents))}					
			</div>
			`,
			f: {
				id: `sandalstraps-${k.address}-adv`,
				k: k,
				kAddr: k.address,
				metaReg: metaReg,
				factReg: factReg,
				fc_n: [''].concat(registrar.getNames(factReg)),
				addFactAddr: '',
				crtProdFact: '',
				crtProdName: '',
				crtProdOwner: '',
				crtProdPrice: new BigNumber(0),
				get isOwner() {return k.owner() === Session.currAccount;},
				get selFactAddr() {return !Session.fc_n ? '' : this.factReg.addressByName(Session.fc_n)},
				get selFact() { return this.selFactAddr ? kCandles[this.selFactAddr].minimal : ''; },
				get addFact() { return Session.newFactAddr ? kCandles[Session.newFactAddr].minimal : ''; },
			},
			s: {
				'#add-factory-inp': {
					change: (event)=>{
						let kAddr = event.target.value;
						self.f.addFactAddr = kAddr;
						if (isAddr(kAddr) && !!contracts[kAddr]) {
							self.f.s_addFact.f.c = regBase.minimal(contracts[kAddr]);
							console.log(self.f.addFactAddr);
						}
					},
				},
				'#add-factory-btn': {
					click: ()=>{
						if(!!contracts[self.f.addFactAddr]) {
							k.registerFactory(self.f.addFactAddr, {from: Session.currAccount, gas:500000})
						}
					},
				},
				'#factory_sel': {
					change: (event)=>{
						let fName = event.target.value;
						self.f.factAddr = self.f.factReg.addressByName(fName);
						self.f.crtProdFact = fName;
						self.f.crtProdPrice = self.f.k.getProductPrice(fName);
					},
				},
				'#crt-prod-name': {
					change: event => self.f.crtProdName = event.target.value,
				},
				'#crt-prod-owner': {
					change: event => self.f.crtProdOwner = event.target.value,
				},
				'#btn-crt-prod': {
					click: () => self.f.k.newProduct(self.f.crtProdFact, self.f.crtProdName, self.f.crtProdOwner,
						{from: Session.currAccount, value: self.f.crtProdPrice, gas: 3000000}),
				},
			},
		});

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

console.log("ran SandalStraps.js");
