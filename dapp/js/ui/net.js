Session.block = web3.eth.getBlock('latest');
Session.sync = web3.eth.syncing;
Session.network = web3.version;


const netStats = new Tilux({
	w: `
		<div id='{$@id}'>
			<i class="fas fa-fw fa-share-alt"></i> {$Session.network.network} {$@netName}<br>
			<i class="fas fa-fw fa-cubes"></i> {$Session.block.number} / {$Session.sync.highestBlock || "sync'd"}<br>
			<i class="fas fa-fw fa-users"></i> {$web3.net.peerCount}
		 </div>
	`,
	f:{
		id: 'net-stats',
		get netName() {return {0:'Olympic',1:'Main Net',2:'Mordon',3:'Ropsten',4:'Rinkeby',42:'Kovan',77:'Sokol',99:'Core'}[Session.network.network] || `Private`;},
	},
}, CACHE);

const network = new Tilux({
	w: `
		<div id={$@id} class="net">
		{>(netStats, @isConnected, {w:'Offline',f:{}})}
		</div>
	`,
	f: {
		id: "network-tplt",
		get isConnected() { return web3.isConnected() },
	}
}, CACHE);

netStats.gaze(Session.block);
netStats.gaze(Session.network);
network.gaze(Session.network);

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
