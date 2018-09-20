// import * from "DappResources.js";

const RegBaseABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"ReceivedOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"}];
const RegBaseContract = web3.eth.contract(RegBaseABI);

// $import('js/apis/RegBaseAPI.js');

const isRegBase = (k) => {
	return !!k
		&& 'regName' in k
		&& 'VERSION' in k
}

const formatRegBaseEvents = (log) => {
	switch (log.event) {
		case 'ChangeResource': return Tilux.l(`
				<h4>Changed Resource</h4>
				Resource: ${utf8(log.args._resource)}<br>
				`);
			break;
		case 'ChangedOwner': return Tilux.l(`
				<h4>Changed Owner</h4>
				<label class="evnt-label">Old Owner</label> {>(ethAddrSml('${log.args._oldOwner}'))}<br>
				<label class="evnt-label">New Owner</label> {>(ethAddrSml('${log.args._newOwner}'))}<br>
			`);
			break;
		case 'ChangeOwnerTo': return Tilux.l(`
				<h4>Change Owner To</h4>
				<label class="evnt-label">Offered To</label> {>(ethAddrSml('${log.args._newOwner}'))}
			`);
			break;
		case 'ReceivedOwnership': return Tilux.l(`
				<h4>Received Ownership Of</h4>
				<label class="evnt-label">Address</label> {>(ethAddrSml('${log.args._kAddr}'))}
			`);
			break;
		default: return formatUnknownEvents(log);
	}
}

const regInit = (k) => {
	const self = new Tilux({
		w: `
			<div id="{$@id}">
				<h3 class="important ss-title">Initialize Contract!</h3>
				<div>
					<button id="init">Init level {$@initFuse}</button>
				</div>
			</div>
		`,
		f: {
			id: `reg-${k.address}-init`,
			k: k,
			get initFuse() { return k.__initFuse().toNumber()}
		},
		s: {
			'#init': {
				click: () => self.f.k._init({from: Session.currAccount, gas: 3000000}),
			},
		}
	});
	return self;
}


const regBase = {
	minimal: (k)=>{
		if(k) return {
			w: `
				<div id="{$@id}" class="rb-button" onclick="{$@click}('{$@kAddr}')">
					{>(idicon(@kAddr))}
					<div class="inline">
						<div class="rb-regname-sml">{$@regName}</div>
						<div class="rb-version-sml darkest">{$@version}</div>
						<div class="ss-addr-sml">{$shortenAddr(@kAddr)}</div>
					</div>
				</div>
			`,
			f: {
				id: `regBase-${k.address}-min`,
				k: k,
				get kAddr() { return checksumAddr(k.address)},
				get regName() { return utf8(k.regName())},
				get version() { return utf8(k.VERSION())},
				click: 'navPath.push',
			},
			s: {

			}
		}
	},

	basic: (k) => {
		if(k) return {
			w: `
				<div id="{$@id}" class="ss-button" onclick="{$@click}('{$@kAddr}')">
					<div calss="inline">{>(idicon(@kAddr))</div>
					<div class="inline">
						<div class="rb-regname-sml">{$@k.regname}</div>
						<div class="rb-version-sml darkest">{$@k.version}</div>
						<div class="ss-addr-sml">{$@kAddr}</div>
					</div>
				</div>
			`,
			f: {
				id: `regBase-${k.address}-bas`,
				k: k,
				get kAddr() { return checksumAddr(k.address)},
				get regName() { return utf8(k.regName())},
				get version() { return utf8(k.VERSION())},
				click: 'navPath.push',
			},
		}
	},

	advanced: (k) => {
		if(k) {
			const self = new Tilux({
				w: `<div id="{$@id}" class="-layer" >
						<div class="regBase-adv">
							{>(idicon(@kAddr, 7, 'rb-idicon'))}
							<div class="rb-title"><span class="rb-regname">{$@regName}</span>
								<span class="rb-version">{$@version}</span>
								<span id="docsLink" class="docs-link"><i class="far fa-question-circle"></i></span>
							</div>
							<div class="rb-addr ss-addr-sml k-addr"><i class="fas fa-fw fa-file-alt"></i> {>(addrLink(@kAddr))}</div>
							<div class="rb-owner ss-addr-sml u-addr"><i class="fas fa-fw fa-user"></i> {>(addrLink(@owner))}</div>
							<div class="rb-bal js-end as-end">{>(ethVal(@ethBal))}</div>
						</div>
						{>(withdrawable(@k))}
						{>(owned(@k), @isOwner)}
						{>(owning(@k))}
						<div class="{>('', @isOwner, 'hidden')}">
							<h3 class="ss-title">Change Resource</h3>
							<div>
								{>(ethHexInp("chng-res-inp"))} <button id="change-res-btn">Change Resource</button><br>
							</div>
							<h3 class="ss-title">Destroy Contract</h3>
							<div>
								<button id="destroy-btn">Destroy</button>
								<div class="notice important">This action will cause the contract to self destruct and no longer be available to the blockchain.<br>
									WARNING! This operation may cause the loss of control and or correct operation of any contract or interface dependant upon this contract instance.
								</div> 
							</div>
						</div>
					</div>
					`,
				f: {
					id: `regBase-${k.address}-adv`,
					k: k,
					get kAddr() { return checksumAddr(k.address)},
					get regName() { return 'regName' in k ? utf8(k.regName()) : 'Contract is not SandalStraps compliant'; },
					get version() { return 'VERSION' in k ? utf8(k.VERSION()) : 'No version found'; },
					get ethBal() { return balance(k.address); },
					get owner() { return 'owner' in k ? checksumAddr(k.owner()) : 'Contract is not ownable'},
					get isOwner() { return 'owner' in k ? k.owner() === Session.currAccount : false;},
					get resource() { return 'resource' in k ? k.resource() : 'Contract has no resource field'; },
					get docsPath() { return resources[this.version].docPath; }
				},
				s: {
					"#docsLink": {
						click() {
							getDoc(resources[self.f.version].docPath);
						},
					},
					"change-res-btn": {
						click: () => {
							k.changeResource(Session.chng-res-inp, {from: Session.currentAccount, gas: 100000});
						},
					},
					"destroy-btn": {
						click: ()=>{
							k.destroy({from: Session.currAccount, gas: 100000});
						},
					},
				}
			}, CACHE);
			return self;
		}
	},
}

resources["RegBase v0.4.0"] = {
	template: regBase,
	interface: RegBaseContract,
	docPath: "docs/RegBaseAPI.md"
}


console.log("ran RegBase.js");


