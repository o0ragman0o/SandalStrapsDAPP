const blockModal = (blockNum) => {

	const self = new Tilux({
		w: `
			<div id="{$@id}">
				<h1><i class="fas fa-fw fa-cubes"></i> Block {$@block.number}</h1>
				<div class="modal-content fs08">
					<label>Block Number</label><span id="prevBlk">&lt;</span><a class="mono" href="http://etherscan.io/block/{$@block.number}" target="_">{$@block.number}</a><span id="nextBlk">&gt;</span><br>
					<label>Time Stamp</label><span class="mono">{$ new Date(@block.timestamp * 1000).toLocaleString()}</span><br>
					<label>Block Hash</label><span class="mono">{$@block.hash}</span><br>
					<label>Parent Hash</label>{>(blockLink(@block.parentHash))}<br>
					<label>Size</label><span class="mono">{$@block.size} kb</span><br>
					<label>Hash Rate</label><span class="mono">{$@rate}</span><br>
					<label>Difficulty</label><span class="mono">{$@block.difficulty}</span><br>
					<label>Nonce</label><span class="mono">{$@block.nonce}</span><br>
					<label>Miner</label>{>(addrLink(@block.miner))}<br>
					<label>Gas Limit</label><span class="mono">{$@block.gasLimit}</span><br>
					<label>Gas Used</label><span class="mono">{$@block.gasUsed}</span><br>
					<label>Extra Data</label><span class="mono">{$@block.extraData}</span><br>
				</div>
			</div>
		`,
		f: {
			id: `mod-block`,
			blockNum: blockNum,
			block: web3.eth.getBlock(blockNum),
			get getBlock() {this.block = web3.eth.getBlock(this.blockNum)},
		},
		s: {
			'prevBlk': {
				click() {
					self.f.blockNum--;
				}
			},
			'nextBlk': {
				click() {
					self.f.blockNum++;
				}
			},
		}
	}, CACHE);

	return self;
}



// {
//   difficulty: 131072,
//   extraData: "0xd583010703846765746885676f312e39856c696e7578",
//   gasLimit: 4000000,
//   gasUsed: 0,
//   hash: "0x410e0c734058ac3b51a2da4f4a50d35b2c17ed0f1f60933ede0dd393ba86cf12",
//   logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
//   miner: "0x3a98a42756a7e08d29809b2a3fefe0e80abaff36",
//   mixHash: "0xc3e7cf715a9f19e574f31d6152a9e0d227bccee295a2ce1c4c2095d467a3f0bf",
//   nonce: "0x1b90fe3398352ccf",
//   number: 1,
//   parentHash: "0xacc106b094fe90b6ea7da3791988bd97dd241d75bb769cc2ca3d2ae40c4269f8",
//   receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
//   sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
//   size: 533,
//   stateRoot: "0xcfc955b1e0591c3d828a907d0cf524cbb33f4fdcc6aa1004f73ebc2bafe0a9e8",
//   timestamp: 1523097016,
//   totalDifficulty: 132096,
//   transactions: [],
//   transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
//   uncles: []
// }
