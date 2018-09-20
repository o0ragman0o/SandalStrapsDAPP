const OwnedABI = [{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const OwnedContract = web3.eth.contract(OwnedABI);

// $import('js/apis/OwnedAPI.js');

const owned = (k) => {

	let self = new Tilux({
		w: `
			<div id="{$@id}">
				<div class="{>('', @isOwner, 'hidden')}">
					<h3 class="ss-title">Change Owner</h3>
					<div>
						{>(ethAddrInp("new_owner_inp", "New owner address"))}
						<button id="change-owner-btn">Change Owner</button>
					</div>
				</div>
				<div class="{>('', @isNewOwner, 'hidden')}">
					<h3 class="ss-title">Accept Ownership</h3>
					<div>
						<button id="acc-owner-btn">Accept Ownership</button>
					</div>
				</div>
			</div>
		`,
		f: {
			id: `owned-${k.address}`,
			k: k,
			get isOwner() { return 'owner' in k ? Session.currentAccount == k.owner() : false; },
			get isNewOwner() { return 'newOwner' in k ? Session.currentAccount == k.newOwner() : false; },
		},
		s: {
			'#change-owner-btn': {
				click: () => { regBase.changeOwner(Session.new_owner_inp, {from: Session.currentAccount, gas: 100000}); },
			},
			'#acc-owner-btn': {
				click: () => { regBase.changeOwner({from: Session.currentAccount, gas: 100000}); },
			},
		},
	})

	return self;
}