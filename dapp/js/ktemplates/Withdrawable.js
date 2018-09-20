const WithdrawableABI = [{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"etherBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"withdrawTo","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"withdrawFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_values","type":"uint256[]"}],"name":"withdrawFor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"}],"name":"withdrawAllFor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"}],"name":"withdrawAllFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"}];
const WithdrawableContract = web3.eth.contract(WithdrawableABI);

const WithdrawableMinABI = [{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"}];
const WithdrawableMinContract = web3.eth.contract(WithdrawableMinABI);

// $import('js/apis/WithdrawableAPI.js');

const formatWithdrawableEvents = (log, k) => {
	switch (log.event) {
		case 'Deposit': return Tilux.l(`
				<h4>Deposit</h4>
				<label>From</label> {>(ethAddrSml('${log.args._from}'))}<br />
				<label>Value</label> {>(ethVal('${log.args._value}'))}<br />
				`);
			break;
		case 'Withdrawal': return Tilux.l(`
				<h4>Withdrawal</h4>
				<label>From / By</label> {>(ethAddrSml('${log.args._from || log.args._by}'))}<br />
				<label>To</label> {>(ethAddrSml('${log.args._to}'))}<br />
				<label>Value</label> {>(ethVal('${log.args._value}'))}<br />
				`);
			break;
		default: return formatRegBaseEvents(log, k);						
	}
}


const withdrawable = (k) => {
	const self = {
		w: `
			<div class="{>('', @canDeposit || @isWithdraw || @isWithdrawFor, 'hidden')}">
				<h3 class="ss-title">Deposit / Withdraw Functions</h3> <div>
				<div class="{>('', @canDeposit, 'hidden')}">
					{>(ethValInp('depositVal', 'Deposit value...'))}
					<button id="deposit-btn">Deposit</button>
				</div>
				<div class="{>('', @isWithdrawFor, 'hidden')}">
					{>(textAreaInp('wdaf', "Comma separated list of addresses to withdraw for..."))}
					<button id="wdAllFor-btn">Withdraw For</button>
				</div>
				<div class="{>('', @isWithdraw, 'hidden')}">
					<button id="waAll-btn">Withdraw All</button>
					{>(ethVal(@ethBal))}
				</div>
			</div>
		`,
		f: {
			id: `withdrawable-${k.address}`,
			k: k,
			isWithdraw: 'withdrawAll' in k,
			isWithdrawFor: 'withdrawAllFor' in k,
			get ethBal() { return 'etherBalanceOf' in k ? k.etherBalanceOf(Session.currAccount) : balance(k.address);},
			get canDeposit() {
				let i=-1;
				while(++i < k.abi.length) {
					if(k.abi[i].type == 'fallback')
						return k.abi[i].payable;
				}
				return false;
			},
		},
		s: {
			"#deposit-btn": {
				click: () => web3.eth.sendTransaction({from: Session.currAccount, to:k.address, value: toWei(Session.depositVal), gas: 100000}),
			},			
			"#waAll-btn": {
				click: () => k.withdrawAll({from: Session.currAccount, gas: 200000}),
			},
			"#wdAllFor-btn": {
				click: () => {
					let addrs = Session.wdaf.split(',');
					addrs = addrs.map(addr=>{if(isAddr(addr)) return addr; });
					k.withdrawAllFor(addrs, {from: Session.currAccount, gas: 1000000})},
			},
		}
	}

	return self;
}


console.log("ran Withdrawable.js");
