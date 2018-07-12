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


const deposit = (k) => {
	const self = {
		w: `<div>
				{>(ethValInp('depositVal', 'Deposit value...'))}
				<button id="deposit-btn">Deposit</button>
			</div>`,
		f: {
			value: 0,
		},
		s: {
			"#deposit-inp": {
				change: event => self.f.value = event.target.value,
			},
			"#deposit-btn": {
				click: () => web3.eth.sendTransaction({from: Session.currAccount, to:k.address, value: self.f.value * 1e18, gas: 100000}),
			},
		},
	}

	return self;
}


const withdrawAll = (k) => {
	return {
		w: `<div>
				{>(ethVal(@ethBal))}
				<button id="waAll-btn">Withdraw All</button>
			</div>`,
		f: {
			get ethBal() {
				if(k.hasOwnProperty('etherBalanceOf')) {
					return k.etherBalanceOf(Session.currAccount);
				} else {
					return balance(k.address);
				}
			}
		},
		s: {
			"#waAll-btn": {
				click: () => k.withdrawAll({from: currAccount, gas: 100000}),
			},
		},
	}
}


const withdrawAllFor = (k) => {
	const self = {
		w: `{>(ethAddrInp('wdaf', "array of addresses to withdraw for..."))}
			<button id="wdAllFor-btn">Withdraw All For</button>`,
		f: {
			wdAllAddrs: '',
		},
		s: {
			"#wdAllFor-inp": {
				change: event => {if (isAddr(event.target.value)) self.f.addr = event.target.value},
			},
			"#wdAllFor-btn": {
				click: () => {
					let addrs = self.wdAllAddrs.split(',');
					addrs = addrs.map(addr=>{if(isAddr(addr)) return addr; });
					if (isAddr(self.f.addr)) k.withdrawAllFor([self.f.addr], {from: Session.currAccount, gas: 100000})},
			},
		},
	}

	return self;
}


const withdrawable = (k) => {
	const self = {
		w: `
			<div id="{$@id}">
				{>(deposit(@k), @canDeposit)}
				{>(withdrawAll(@k), @isWithdraw)}
				{>(withdrawAllFor(@k), @isWithdrawFor)}
			</div>
		`,
		f: {
			id: `withdrawable-${k.address}`,
			k: k,
			balance: balance(k.address),
			get ethBalanceOf() { if('ethBalanceOf' in k) return k.ethBalanceOf(k.address);},

			withdrawForAddr: '',
			isWithdraw: 'withdrawAll' in k,
			isWithdrawFor: 'withdrawAllFor' in k,
			get canDeposit() {
				let i=-1;
				while(++i < k.abi.length) {
					if(k.abi[i].type == 'fallback')
						return k.abi[i].payable;
				}
				return false;
			},
		},
	}

	return self;
}


console.log("ran Withdrawable.js");
