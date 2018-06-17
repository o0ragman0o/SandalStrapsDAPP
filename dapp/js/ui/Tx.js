function toTx(k, func, data, txObj = {}) {	
	if(!txObj.from) txObj.from = currAccountLux.address;
	if(!txObj.to) txObj.to = k.address;
	if(!txObj.value) txObj.value = 0;
	if(!txObj.data) txObj.data = k[func].getData(data);
	if(!txObj.gasPrice) txObj.gasPrice = web3.eth.gasPrice;
	if(!txObj.gas) txObj.gas = web3.eth.estimateGas(txObj);
	modal.show(txForm(txObj));
	return txObj;
}


const txForm = (txObj = {}) => {
	if(!txObj.from) txObj.from = currAccountLux.address;
	if(!txObj.to) txObj.to = null;
	if(!txObj.value) txObj.value = 0;
	if(!txObj.gasPrice) txObj.gasPrice = web3.eth.gasPrice;
	if(!txObj.gas) txObj.gas = 90000;
	let self = new Tilux({
		w: `
			<div id="txForm">
				<h1><i class="fa fa-paper-plane" aria-hidden="true"></i> Send Transaction</h1>
				<div class="modal-content">
					<label>From</label><input id="tx-from" placeholder="To Address" value="{$@from}"></input><br />
					<label>To</label><input id="tx-to" placeholder="To Address" value="{$@to}"></input><br />
					<label>Value</label><input id="tx-val" type="number" placeholder="Ether value to send" value="{$@value}"></input><br />
					<label>Gas</label><input id="tx-gas" type="number" placeholder="Maximum gas" value="{$@gas}"></input><br />
					<label>Gas Price</label><input id="tx-gas-price" type="number" placeholder="Gas price" value="{$@gasPrice}"></input><br />
					<label>Data</label><textarea id="tx-data" placeholder="Enter TX data (0x...)">{$@data}</textarea>
				</div>
				<button id="send-btn">Send</button>
			</div>
		`,
		f: {
			txObj: txObj,
			cb: txObj.cb,
			get from() { return txObj.from || currAccountLux.address },
			get value() { return web3.fromWei(txObj.value) },
			get gas() { return txObj.gas },
			get gasPrice() { return txObj.gasPrice || web3.eth.gasPrice },
			get to() { return txObj.to || ''},
			get data() {return txObj.data || ''},
		},
		s:{

			"#tx-to": {
				change: (event) => { self.f.txObj.to = event.target.value; } 
			},
			"#tx-val": {
				change: (event) => { self.f.txObj.value = web3.toWei(event.target.value); } 
			},
			"#tx-gas": {
				change: (event) => { self.f.txObj.gas = web3.toWei(event.target.value); } 
			},
			"#tx-gas-price": {
				change: (event) => {
					self.f.txObj.gasPrice = web3.toWei(event.target.value); } 
			},
			"#to-data": {
				change: (event) => { self.f.txObj.data = event.target.value; } 
			},
			"#to-nonce": {
				change: (event) => { self.f.txObj.nonce = event.target.value; } 
			},
			"#tx-send-btn": {
				click: (event) => {
					self.f.txObj.from = self.f.from;
					return web3.eth.sendTransaction(self.f.txObj, self.f.cb);
				}
			}
		}
	});

	return self;
}

const txHashModal = (txHash) => {
	let tx = web3.eth.getTransaction(txHash);
	let txr = web3.eth.getTransactionReceipt(txHash);
	if(!tx) return `No transaction found.`

	return {
		w: `
			<div id="tx-receipt">
				<h1><i class="fa fa-paper-plane" aria-hidden="true"></i> Transaction</h1>
				<div class="modal-content fs08">
					<label>TX Hash</label><a class="mono" href="http://etherscan.io/tx/{$@txr.transactionHash}" target="_">{$@txr.transactionHash}</a><br />
					<label>Block Hash</label>{>(blockLink(@txr.blockHash))}<br />
					<label>Block Number</label>{>(blockLink(@txr.blockNumber))}<br />
					<label>From</label>{>(addrLink(@txr.from))}<br />
					<label>To</label>{>(addrLink(@txr.to))}<br />
					<label>Nonce</label><span class="mono">{$@tx.nonce}</span><br />

					<label>Gas Provided</label><span class="mono">{$@tx.gas}</span><br />
					<label>Gas Used</label><span class="mono">{$@txr.gasUsed}</span><br />
					<label>Gas Price</label><span class="mono">{$@tx.gasPrice}</span><br />
					<label>Status</label><span class="mono">{$@txr.status}</span><br />
					<label>r</label><span class="mono">{$@tx.r}</span><br />
					<label>s</label><span class="mono">{$@tx.s}</span><br />
					<label>v</label><span class="mono">{$@tx.v}</span><br />
					<label>Input</label><span class="mono">{$@tx.input}</span><br />
				</div>
			</div>
		`,
		f: {
			tx: tx,
			txr: txr
		}		
	}
}