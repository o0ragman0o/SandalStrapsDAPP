
/* API */
const DisownableABI = [{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_safePhrase","type":"bytes32"}],"name":"burnOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const DisownableContract = web3.eth.contract(DisownableABI);

/* Template */
const disownable = (k) => {
	self = new Tilux({
		w: `
			<h3 class="ss-title">Disown (burn) ownership</h3>
			<div>
				Enter the burn phrase: "This contract is to be disowned."
				{>(txtInp('burnphrase'))}
				<button id="disown-btn">Disown</button>
			</div>
		`,
		f: {
			k: k,
			phrase: '',
		},
		s: {
			"#disown-inp" : {
				change: (event) => { self.f.phrase = event.target.value; },
			},
			"#disown-btn": {
				click: () => { k.disown(self.f.phrase, )},
			}
		}
	})

	return self;
}