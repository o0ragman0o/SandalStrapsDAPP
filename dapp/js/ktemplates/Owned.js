const OwnedABI = [{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const OwnedContract = web3.eth.contract(OwnedABI);

// $import('js/apis/OwnedAPI.js');

const owned = (k) => {

	let self = new Tilux({
		w: `
			<div id="{$@id}" class="ss-panel">
				{>(ethAddrInp("new_owner_inp","New owner address"))}
				<button id="change-owner-btn">Change Owner</button><br>
			</div>
		`,
		f: {
			id: `owned-${k.address}`,
			k: k,
			ownsOwner: () => { return contracts[k.owner()].owner() === currendAccountLux.address; },
			newOwner: '',
			res: web3.toHex(k.resource()),
		},
		s: {
			'#new_owner_inp': {
				change: (event) => { self.f.newOwner = event.target.value; },
			},
			'#change-owner-btn': {
				click: () => { toTx(self.f.k, 'changeOwner', self.f.newOwner); },
				// click: () => { regBase.changeOwner(k.address, self.f.newOwner); },
			},
		},
	})

	return self;
}

const newOwner = (k) => {
	return {
		w: '<button id="acc-owner-btn">Accept Ownership</button></br>',
		f: {

		},
		s: {
			'#acc-owner-btn': {
				click: () => { k.acceptOwnership(); },
			},
		},
	}
}
