const addressModal = (addr) => {

	return {
		w: `
			<div id="{$@id}">
				<h1>{>(idicon(@addr,4,"idicon-sml"))} Account</h1>
				<div class="modal-content fs08">
					<label>Address</label><a class="ss-addr" href="http://etherscan.io/address/{$@addr}" target="_">{$@addr}</a><br >
					<label>Balance</label>{>(ethVal(@bal))}<br >
					<label>TX Count</label><span class="mono">{$@nonce}</span><br >
					<label>Code</label><span class="mono">{$@code}</span><br >
				</div>
			</div>
		`,
		f: {
			addr: addr,
			get bal(){ return web3.eth.getBalance(addr) },
			get nonce(){ return web3.eth.getTransactionCount(addr) },
			get code(){ return web3.eth.getCode(addr) },
		}
	};
}

