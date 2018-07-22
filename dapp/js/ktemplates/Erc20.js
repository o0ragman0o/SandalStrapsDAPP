
/* API */
const Erc20ABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"}];
const Erc20Contract = web3.eth.contract(Erc20ABI);

/* Event format template */
const formatErc20Events = (log, k) => {
	switch (log.event) {
		case 'Transfer': return Tilux.l(`
				<h4>Transfer</h4>
				<label>From</label> {>(ethAddrSml('${log.args._from}'))}<br />
				<label>To</label> {>(ethAddrSml('${log.args._to}'))}<br />
				<label>Amount</label><i class="fas fa-fw fa-dot-circle"></i> ${log.args._value}<br />
				`);
			break;
		case 'Approval': return Tilux.l(`
				<h4>Approval</h4>
				<label>Holder</label> {>(ethAddrSml('${log.args._owner}'))}<br />
				<label>Spender</label> {>(ethAddrSml('${log.args._spender}'))}<br />
				<label>Amount</label><i class="fas fa-fw fa-dot-circle"></i> ${log.args._value}<br />
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
			<h3 class="ss-title">ERC20</h3>
			<div>
				<h2>{$@name} {$@symbol}</h2>
				<h2><span class="inp-icon"><i class="fas fa-fw fa-dot-circle"></i></span>{$@tokBal}</h2>
				<i class="fas fa-fw fa-dot-circle"></i>{$@supply} Total Supply
			</div>
			<h3 class="ss-title">Transfer</h3>
			<div>
				{>(ethAddrInp('erc20ToAddr', 'To address...'))}<br />
				{>(ethValInp('erc20ToVal', 'Value in ether...'))}<br />
				<button id="transfer-btn">Transfer</button>
			</div>
			<h3 class="ss-title">Transfer From</h3>
			<div>
				<p><i class="fas fa-fw fa-dot-circle"></i>{$@allowance(@allowFrom)} Approved from {$@allowFrom}</p>
				{>(ethAddrInp('erc20FromAddr', 'From address...'))}<br />
				{>(ethAddrInp('erc20FromToAddr', 'To address...'))}<br />
				{>(ethValInp('erc20AllowedVal', 'Value in ether...'))}<br />
				<button id="transferFrom-btn">Transfer</button>
			</div>
			<h3 class="ss-title">Approve</h3>
			<div>
				{>(ethAddrInp('erc20ApprAddr', 'To address...'))}<br />
				{>(ethValInp('erc20ApprVal', 'Value in ether...'))}<br />
				<button id="approve-btn">Approve</button>
			</div>
		</div>
		`,
		f: {
			k: k,
			name: utf8(k.name()),
			symbol: utf8(k.symbol()),
			supply: k.totalSupply().div(10**k.decimals()),
			decimals: k.decimals().toNumber(),
			tokBal: k.balanceOf(Session.currAccount).div(10**k.decimals().toNumber()),
			toAddr: '',
			toAmnt: '',
			allowFrom: '',
			allowTo: '',
			allowAmnt: '',
			apprAddr: '',
			apprAmnt: '',
			allowance: (frm)=>{return toDecimal(k.allowance(frm, Session.currAccount), self.f.decimals)},
		},
		s: {
			'#toAddr-inp': {
				change: event => {self.f.toAddr = event.target.value},
			},
			'#toAmnt-inp': {
				change: event => {self.f.toAmnt = event.target.value},
			},
			'#transfer-btn': {
				click: () => {
					if(isAddr(self.f.toAddr) && self.f.toAmnt >= 0)
						self.f.k.transfer(self.f.toAddr, self.f.toAmnt * 10**self.f.decimals, {from: Session.currAccount, gas:200000});
				},
			},
			'#allowFrom-inp': {
				change: event => {self.f.allowFrom = event.target.value},
			},
			'#allowTo-inp': {
				change: event => {self.f.allowTo = event.target.value},
			},
			'#allowAmnt-inp': {
				change: event => {self.f.allowAmnt = event.target.value},
			},
			'#transferFrom-btn': {
				click: () => {
					if(isAddr(self.f.allowFrom) && isAddr(self.f.allowTo) && self.f.allowAmnt >= 0)
						self.f.k.transferFrom(self.f.allowFrom, self.f.allowTo, toWei(self.f.toAmnt), {from: Session.currAccount, gas:200000});
				},
			},
			'#approveAddr-inp': {
				change: event => {self.f.approveAddr = event.target.value},
			},
			'#approveAmnt-inp': {
				change: event => {self.f.approveAmnt = event.target.value},
			},
			'approve-btn': {
				click: () => {
					if(isAddr(self.f.apprAddr) && self.f.apprAmnt >= 0)
						self.f.k.approve(self.f.apprAddr, self.f.apprAmnt, toWei(self.f.toAmnt), {from: Session.currAccount, gas:200000});
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
