const YankABI = [{"constant":false,"inputs":[{"name":"_kAddrs","type":"address[]"},{"name":"_addrs","type":"address[]"}],"name":"yank","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"regName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"WithdrawnAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"},{"indexed":true,"name":"_for","type":"address"}],"name":"WithdrawnAllFor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"},{"indexed":true,"name":"_for","type":"address"}],"name":"Failed","type":"event"}];
const YankContract = web3.eth.contract(YankABI);

// $import ("js/apis/YankAPI.js");

const formatYankEvents = (log, k) => {
	switch (log.event) {
		case 'Failed': return Tilux.l(`
				<h4>Failed</h4>
				<label>Contract</label> {>(ethAddrSml('${log.args._kAddr}'))}
				<label>Account</label> {>(ethAddrSml('${log.args._for}'))}
				`);
			break;
		default: return formatWithdrawableEvents(log, k);						
	}
}


const yank = {

	minimal: (k)=>{
		const self = new Tilux({
			w: `{>(regBase.minimal(@k))}
			`,
			f: {
				k: k,
			},
			s: {

			}
		})

		return self;
	},
	basic: (k)=>{
		const self = new Tilux({
			w: `
			`,
			f: {

			},
			s: {

			}
		})

		return self;
	},
	advanced: (k)=>{
		const self = new Tilux({
			w: `<div id="{$@id}">
					{>(regBase.advanced(@k))}
					<div class="layer">
					{>(ethAddrInput)}
					</div>
					{>(events(@k, formatYankEvents))}
				</div>`,
			f: {
				k: k,
			},
			s: {

			}
		})

		return self;
	},
}


resources["Yank v0.4.2"] = {
	template: yank,
	interface: YankContract,
	docPath: "docs/YankAPI.md"
}


console.log("ran yank.js");
