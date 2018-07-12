// resources["SandalStrapsFactory v0.4.0"] = {
// 	template: factory,
// 	interface: FactoryContract,
// 	docPath: "docs/SandalStrapsAPI.md"
// 	url: "",
// 	bzz: "",
// 	ipfs: "",
// }

const resources = new Proxy(
	{},
	{
		get: (target, key) => { 
			if (key in target) return target[key]
			$import(`kTemplates\\${key.split(' ')[0]}.js`, ()=>{return target[key]}) || target['DefaultResource']; }
	}
);

const contracts = new Proxy(new Map(),
	{
		get: (target, kAddr) => {
			kAddr = kAddr.toLowerCase();
			if (!web3.isAddress(kAddr)) return undefined;
			if (!(target.has(kAddr))) {
				let regName = getRegName(kAddr);
				let ver = getKVersion(kAddr);
				if(ver && regName) {
					k = resources[ver].interface.at(kAddr);
					k.events = k.allEvents({fromBlock:0, toBlock:'latest'});
					target.set(kAddr, k);
				} else {
					return undefined;
				}
			}
			return target.get(kAddr);
		},
	}
);

const kCandles = new Proxy(new Map(),
	{
		get: (target, kAddr) => {
			kAddr = kAddr.toLowerCase();
			if (!web3.isAddress(kAddr)) return undefined;
			if (!(target.has(kAddr))) {
				let k = contracts[kAddr];
				if(!k) return undefined;
				let template = resources[utf8(k.VERSION())].template;
				target.set(kAddr, {
					minimal: template.minimal(k),
					basic: template.basic(k),
					advanced: template.advanced(k),
				})
				target.get(kAddr).advanced.watch(Session, 'currAccount');
				target.get(kAddr).advanced.watch(Session, 'block');
				// target.get(kAddr).advanced.gaze(currAccountLux);
				// target.get(kAddr).advanced.gaze(blockLux);
			}
			return target.get(kAddr);		
		},
	}
);

function getRegName(kAddr) { return utf8(RegBaseContract.at(kAddr).regName()); }
function getKVersion(kAddr) { return utf8(RegBaseContract.at(kAddr).VERSION()); }


console.log("ran DappResources.js");
