const currAccountLux = new Lux({address:web3.eth.accounts[0], balance:new web3.BigNumber(0)});

const accountBalTplt = new Tilux({

	w:`
		<span id="{$@id}" class="balance">
		{>(ethVal(balance(currAccountLux.address)))}
		</span>
	`,
	f: {
		id: 'accBal',
	}
})

const accountsTplt = new Tilux({
	w:`
		<div id="{$@id}" class="js-end">
			<span id="send-tx">
				<i class="fa fa-paper-plane" aria-hidden="true"></i>
			</span>
			<span>
			{>(accountBalTplt)}
			</span>
			<img class="idicon-sml input-icon" src="{$blockieSml(@account)}" />
			{>(selectInput('acc-sel', @accounts))}
			<span id="search">
				<i class="fas fa-search"></i> 
			</span>
		</div>
	`,
	f: {
		id: "accounts",
		get accounts() { return accounts(); },
		get account() { return currAccountLux.address; }
	},
	s: {
		"#send-tx": {
			click() { modal.show(txForm()) }
		},
		"#search": {
			click() { modal.show(searchForm()) }
		},
		"#acc-sel": {
			change(event) {
				currAccountLux.address = event.target.value; }
		},
	}
})

accountsTplt.gaze(currAccountLux);

console.log("ran Accounts.js");

