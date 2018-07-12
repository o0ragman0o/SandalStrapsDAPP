const FactoryABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_price","type":"uint256"}],"name":"set","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"createNew","outputs":[{"name":"kAddr_","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_creator","type":"address"},{"indexed":true,"name":"_regName","type":"bytes32"},{"indexed":true,"name":"_kAddr","type":"address"}],"name":"Created","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_by","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"ReceivedOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"}];
const FactoryContract = web3.eth.contract(FactoryABI);
// $import ("js/apis/FactoryAPI.js");
    

const formatFactoryEvents = (log) => {
	switch (log.event) {
		case 'Created': return Tilux.l(`
				<h4>Created '${utf8(log.args._regName)}'</h4>
				<label>Address</label> {>(ethAddrSml('${log.args._kAddr}'))}<br />
				<label>Creator</label> {>(ethAddrSml('${log.args._creator}'))}<br />
				`);
			break;
		default: return formatWithdrawableEvents(log);						
	}
}

const factory = {
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
				<div>Price <i class="fab fa-fw fa-ethereum"></i>{$@price}</div>
				</div>
			`,
			f: {
				k: k,
				id: `factory-${k.address}-bas`,
				price: toEther(k.value()),
			},
		}
	},

	advanced: (k) => {
		const self = new Tilux({
			w: `<div id="{$@id}">
				{>(regBase.advanced(@k))}
				<div class="layer" id="{$@id}">
					<h2>Create a {$@regName} contract for <i class="fab fa-fw fa-ethereum"></i>{$@prodPrice}</h2>
					<div class="ss-panel">
						<input id="prod-name" class="ss-input" type="text" placeholder="New Contract Name"></input>
						<input id="prod-owner" class="ss-input ss-addr" type="text" placeholder="Owner Address"></input>
						<button id="btn-prod-crt" Create">Create</button>
					</div>
					<p>* Note: Contracts created directly by a factory are not registered in a registrar. If the product contract is required to be a registered 
					component of a SandalStraps organisation, then it should be created using 'Create New' in the organisation's SandalsStraps contract.
					</p>
					<p>* If no owner address is given, the product contract owner defaults to the creating accounts address
					</p>
				</div>
				{>(events(@k, formatFactoryEvents))}
			</div>`,
			f: {
				id: `factory-${k.address}-adv`,
				k: k,
				kAddr: k.address,
				regName: utf8(k.regName()),
				prodPrice: toEther(k.value()),
				prodName: '',
				// forOwner: currAccountLux.value,
			},
			s: {
				"#prod-name": {
					change: event => self.f.prodName = event.target.value,
				},
				"#prod-owner": {
					change: event => self.f.prodOwner = event.target.value,					
				},
				"#btn-prod-crt": {
					'click': () => {
						self.f.k.createNew(self.f.prodName, self.f.prodOwner, {from: Session.currAccount, gas: 3000000, value: self.f.k.value()})
					},
				},
			}
		});

		return self;
	},
}

console.log("ran Factory.js");
