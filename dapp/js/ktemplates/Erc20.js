
/* API */
const Erc20ABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"}];
const Erc20Contract = web3.eth.contract(Erc20ABI);

/* Event format template */
const formatErc20Events = (log, k) => {
	let dec = k.decimals().toNumber();
	switch (log.event) {
		case 'Transfer': return Tilux.l(`
				<h4>Transfer</h4>
				<label>From</label> {>(ethAddrSml('${log.args._from}'))}<br />
				<label>To</label> {>(ethAddrSml('${log.args._to}'))}<br />
				<label>Amount</label> {>(tokVal(${log.args._value}, ${dec}))}<br />
				`);
			break;
		case 'Approval': return Tilux.l(`
				<h4>Approval</h4>
				<label>Holder</label> {>(ethAddrSml('${log.args._owner}'))}<br />
				<label>Spender</label> {>(ethAddrSml('${log.args._spender}'))}<br />
				<label>Amount</label> {>(tokVal(${log.args._value}, ${dec}))}<br />
				`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}

/* Form Temaplate */
const erc20Form = (k) => {
	const self = {
		w: `
		<div>
			<h3 class="ss-title">ERC20 {$@name} {$@symbol}</h3>
			<div>
				<h2>{>(tokVal(@supply, @decimals))} Total Supply</h2>
			</div>
			<h3 class="ss-title">Transfer</h3>
			<div>
				{>(ethAddrInp('erc20ToAddr', 'To address...'))}<br />
				{>(tokValInp('erc20ToVal', 'Tokens to send...'))}<br />
				<button id="transfer-btn">Transfer</button>
			</div>
			<h3 class="ss-title">Transfer From</h3>
			<div>
				{>(ethAddrInp('erc20FromAddr', 'From address...'))}<br />
				{>(ethAddrInp('erc20FromToAddr', 'To address...'))}<br />
				{>(tokValInp('erc20FromVal', @allowance))}<br />
				<button id="transferFrom-btn">Transfer</button>
			</div>
			<h3 class="ss-title">Approve</h3>
			<div>
				{>(ethAddrInp('erc20ApprAddr', 'Approve address...'))}<br />
				{>(tokValInp('erc20ApprVal', 'Tokens approved to send...'))}<br />
				<button id="approve-btn">Approve</button>
			</div>
		</div>
		`,
		f: {
			k: k,
			name: utf8(k.name()),
			symbol: utf8(k.symbol()),
			decimals: k.decimals().toNumber(),
			get supply() { return k.totalSupply(); },
			get tokBal() { return k.balanceOf(Session.currAccount); },
			get allowFrom() { return Session.erc20FromAddr || '0x0'; },
			get allowance() { return isAddr(Session.erc20FromAddr) ? k.allowance(Session.erc20FromAddr, Session.currAccount) : 'Tokens to send...'; },
		},
		s: {
			'#transfer-btn': {
				click: () => {
					if(isAddr(Session.erc20ToAddr) && Session.erc20ToVal >= 0)
						self.f.k.transfer(Session.erc20ToAddr, fromDecimal(Session.erc20ToVal, self.f.decimals), {from: Session.currAccount, gas:200000});
				},
			},
			'#transferFrom-btn': {
				click: () => {
					if(isAddr(Session.erc20FromAddr) && isAddr(Session.erc20FromTo) && Session.erc20FromVal >= 0)
						self.f.k.transferFrom(Session.erc20FromAddr, Session.erc20FromTo, toWei(Session.erc20FromVal), {from: Session.currAccount, gas:200000});
				},
			},
			'approve-btn': {
				click: () => {
					if(isAddr(Session.erc20ApprAddr) && Session.erc20ApprVal >= 0)
						self.f.k.approve(Session.erc20ApprAddr, Session.erc20ApprVal, toWei(Session.erc20ApprVal), {from: Session.currAccount, gas:200000});
				},
			},
		},
	};

	return self;
}

/* Template */
const erc20 = {

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
			w: `<div id="{$@id}>"
					{>(regBase.advanced(@k))}
					<h3 class="ss-title">Account Balance</h3>
					<div>
						{>(ethAddrInp("percBalLU", "{$Session.currAccount}"))}
						<h2>{>(tokVal(@tokBal, @decimals))}</h2>
					</div>
					{>(erc20Form(@k))}
					{>(events(@k, formatErc20Events))}
				</div>`,
			f: {
				k: k,
			}
		}, CACHE);
		return self;
	}
}


resources["Erc20"] = {
	template: erc20,
	interface: Erc20Contract,
	docPath: "docs/Erc20API.md"
}



console.log("ran Erc20.js");
