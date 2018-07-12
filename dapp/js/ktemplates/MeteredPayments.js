const MeteredPaymentsABI = [{"constant":false,"inputs":[{"name":"_resource","type":"bytes32"}],"name":"changeResource","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"COMMISION_DIV","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_lock","type":"bool"}],"name":"lock","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"etherBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payoutRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resource","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dailyOutgoing","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paidOut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"committedTime","outputs":[{"name":"","type":"uint40"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"commissionWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_startTime","type":"uint40"},{"name":"_period","type":"uint40"}],"name":"changePayment","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"committedPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recipients","outputs":[{"name":"period","type":"uint40"},{"name":"lastWithdrawal","type":"uint40"},{"name":"locked","type":"bool"},{"name":"rate","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"}],"name":"withdrawAllFor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_old","type":"address"},{"name":"_new","type":"address"}],"name":"changeAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_creator","type":"address"},{"name":"_regName","type":"bytes32"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_old","type":"address"},{"indexed":true,"name":"_new","type":"address"}],"name":"RecipientChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_addr","type":"address"},{"indexed":true,"name":"_value","type":"uint256"},{"indexed":true,"name":"_startDate","type":"uint40"},{"indexed":false,"name":"_rate","type":"uint256"}],"name":"PaymentsChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_resource","type":"bytes32"}],"name":"ChangedResource","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangeOwnerTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_oldOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"ChangedOwner","type":"event"}];
const MeteredPaymentsContract = web3.eth.contract(MeteredPaymentsABI);


const formatMeteredPaymentsEvents = (log) => {
	switch (log.event) {
		case 'PaymentsChanged': return Tilux.l(`
			<h4>Payment Changed</h4>
			<label>Address</label> {>(ethAddrSml('${log.args._addr}'))}<br />
			<label>Start Date</label> ${new Date(log.args._startDate * 1000)}<br />
			<label>Total</label> {>(ethVal(${log.args._value}))}<br />
			<label>Rate</label> {>(ethVal(${log.args._rate.mul(3600)}))}/hr<br />
			`);
			break;
		case 'RecipientChanged': return Tilux.l(`
			<h4>Recipient Changed</h4>
			<label>Old Address</label> {>(ethAddrSml('${log.args._old}'))}<br />
			<label>New Address</label> {>(ethAddrSml('${log.args._new}'))}<br />
			`);
			break;
		default: return formatWithdrawableEvents(log);						
	}
}


const recipient = (k, addr) => {
	let recip = k.recipients(addr);
	return {
		w: `
			<div>
				<label>Locked</label>{$@locked}<br />
				<label>Last Withdrawal</label>{$@lastWithdrawal}<br />
				<label>Period Remaining</label>{$@period} hours<br />
				<label>Payment Rate</label>{>(ethVal(@rate))}/hr<br />
				<label>Available</label>{>(ethVal(@balAvailable))}
			</div>
		`,
		f: {
			period: recip[0].div(3600),
			lastWithdrawal: new Date(recip[1] * 1000),
			locked: recip[2],
			rate: recip[3].mul(3600),
			balAvailable: k.etherBalanceOf(addr),
		},
	}
}

const changePayments = (k) => {
	let d = new Date();
	const self =  {
		w: `
			<div class="layer">
				<h3>New or Change Payment</h3>
				{>(ethAddrInp("rAddr-inp", @rAddr, "Payment address"))}Recipient address<br />
				{>(datePicker("startDate_inp", @startDate.value))} Date Start<br />
				{>(datePicker("endDate_inp", @endDate.value))} Date Complete<br />
				{>(ethValInp("pmtValue-inp", @pmtValue, "Total Payment"))}Total Payment<br />
				{>(txButton("meteredPayments_btn", "Commit Payment"))}
			</div>
		`,
		// w: `
		// 	<div class="layer">
		// 		<h3>New or Change Payment</h3>
		// 		{>(ethAddrInp("rAddr-inp", @rAddr, "Payment address"))}Recipient address<br />
		// 		<input id="rAddr-inp" type="text" placeholder="Payment address" value="{$@rAddr}"/>Recipient address<br />
		// 		<input id="startDate-inp" type="date" value="{$@startDate.value}"/>Date Start<br />
		// 		<input id="endDate-inp" type="date" value="{$@endDate.value}"/>Date Complete<br />
		// 		{>(ethValInp("pmtValue-inp", "Total Payment"))}Total Payment<br />
		// 		<button id="meteredPayments-btn">Commit Payment</button>
		// 	</div>
		// `,
		f: {
			rAddr: '',
			startDate: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
			endDate:  `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,
			pmtValue: 0,
		},
		s: {
			"#rAddr-inp": {
				"change": (event) => {self.f.rAddr = event.target.value;},
			},
			"#startDate-inp": {
				"change": (event) => {
					let d = event.target;
					self.f.startDate = d;
					if (self.f.endDate.valueAsNumber < self.f.startDate.valueAsNumber) self.f.endDate = self.f.startDate;
				},
			},
			"#endDate-inp": {
				"change": (event) => {
					let d = event.target;
					self.f.endDate = d;
					if (self.f.endDate.valueAsNumber < self.f.startDate.valueAsNumber) self.f.startDate = self.f.endDate;
				},
			},
			"#pmtValue-inp": {
				"change": (event) => {self.f.pmtValue = event.target.value;},
			},
			"#meteredPayments_btn": {
				"click": () => {
					let startTime = self.f.startDate.valueAsNumber / 1000;
					let period = (self.f.endDate.valueAsNumber - self.f.startDate.valueAsNumber) / 1000;
					self.f.k.changePayment(self.f.rAddr, startTime, period, {from: Session.currAccount, value: toWei(self.f.pmtValue), gas: 200000});
				},
			},		
		}
	}
	return self;

}

const meteredPayments = {

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
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<div class="layer">
						<div>
							<label>Paid Out</label>{>(ethVal(@totalPaid))}<br />
							<label>Escrowed Ether</label>{>(ethVal(@commPayments))}<br />
							<label>Committed Time</label>{$@commTime} hours<br />
						</div>
					</div>
					{>(changePayments(@k), @isOwner)}
					<div class="layer">
						<h3>Recipient Lookup</h3>
						{>(ethAddrInp("recipLU", @luAddr, "Lookup Recipient Address "))}
						{>(recipient(@k, @luAddr))}
					</div>
					{>(events(@k, formatMeteredPaymentsEvents))}
				</div>`,
			f: {
				id: `meteredPayments-${k.address}-adv`,
				k: k,
				luAddr: Session.currAccount,
				get totalPaid() {return k.paidOut()},
				get commTime() {return k.committedTime().div(3600)},
				get commPayments() {return k.committedPayments()},
				get isOwner() {return k.owner() === Session.currAccount;},
				get registered() {
					return meteredPayments.getRegistered(k).map(addr=>Tilux.l(kCandles[addr].minimal));
				},
			},
			s: {
				"#recipLU": {
					"change": (event) => {self.f.luAddr = event.target.value;},
				},
			}
		});

		return self;
	}
}


resources["MeteredPayments v0.4.1"] = {
	template: meteredPayments,
	interface: MeteredPaymentsContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}

resources["MeteredPaymentsFactory v0.4.1"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}

resources["MeteredPayments v0.4.2"] = {
	template: meteredPayments,
	interface: MeteredPaymentsContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}

resources["MeteredPaymentsFactory v0.4.2"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}

resources["MeteredPaymentFactory v0.4.2"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}

resources["MeteredPaymentFactory v0.4.1"] = {
	template: factory,
	interface: FactoryContract,
	docPath: "docs/MeteredPaymentsAPI.md"
}


console.log("ran MeteredPayments.js");

