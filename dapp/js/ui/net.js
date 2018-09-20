Session.block = web3.eth.getBlock('latest');
Session.sync = web3.eth.syncing;
Session.network = web3.version;


const network = new Tilux({
	w: `
		<div id='{$@id}'>
			<i class="fas fa-fw fa-share-alt"></i> {$Session.network.network} {$@netName}<br>
			<i class="fas fa-fw fa-cubes"></i> {$@blockNum} / {$@highestBlock}<br>
			<i class="fas fa-fw fa-users"></i> {$@peers}
		 </div>
	`,
	f:{
		id: 'net-stats',
		bind: 'block network',
		get blockNum() { return Session.block.number; },
		get highestBlock() { return Session.sync.highestBlock || "sync'd"; },
		get peers() { return web3.net.peerCount; },
		get netName() {return {0:'Olympic',1:'Main Net',2:'Mordon',3:'Ropsten',4:'Rinkeby',42:'Kovan',77:'Sokol',99:'Core'}[Session.network.network] || `Private`;},
	},
}, CACHE);

// const network = new Tilux({
// 	w: `
// 		<div id={$@id} class="net">
// 		{>(netStats, @isConnected, {w:'Offline',f:{}})}
// 		</div>
// 	`,
// 	f: {
// 		id: "network-tplt",
// 		get isConnected() { return web3.isConnected() },
// 	}
// }, CACHE);

// network.gaze(Session.block);
// netStats.gaze(Session.block);
// netStats.gaze(Session.network);
// network.gaze(Session.network);

const BlockFilter = web3.eth.filter('latest');

BlockFilter.watch((err, res) => {
	if (err) {
		console.log(`Watch error: ${err}`);
	} else {
		web3.eth.getBlock('latest',
			(err, block)=>{
				if(!err) Session.block = block;
			}
		);
	}
});


console.log("ran net.js");
