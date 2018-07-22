// const currAccountLux = new Lux({address:web3.eth.accounts[0], balance:new web3.BigNumber(0)});
Session.currAccount = web3.eth.accounts[0];
Session.accounts = web3.eth.accounts;

const accountsTplt = new Tilux({
		w:`
			<div id="{$@id}" class="js-end">
				{>(accountSelect('currAccount'))}
				<span id="send-tx" class="inp-icon"><i class="fa fa-paper-plane" aria-hidden="true"></i></span>
				<span id="search" class="inp-icon"><i class="fas fa-search"></i></span>
			</div>
		`,
		f: {
			id: newId("accTplt_"),
		},
		s: {
			"#send-tx": {
				click() { modal.show(txForm()) }
			},
			"#search": {
				click() { modal.show(searchForm()) }
			},
		}
	}, CACHE);

// accountsTplt.gaze(currAccountLux);

console.log("ran Accounts.js");

