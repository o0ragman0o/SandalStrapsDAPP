Session.navPathItems = [];

const navPath = new Tilux({
		w: `
			<div id="{$@id}" class="nav-path js-start">
			{#(@path)}
			</div>
		`,
		f: {
			id: "nav-path",
			bind: "navSelected",
			get path() {
				return Session.navPathItems.length > 0 ? Session.navPathItems.map((kAddr, i) => {return Tilux.l(pathItem(kAddr, i))}) : ['No path items...'];
			}
		}
	});

navPath.push = (kAddr) => {
	Session.navPathItems = Session.navPathItems.slice(0, 1 + Session.navSelected);
	Session.navPathItems.push(kAddr);
	Session.navSelected = Session.navPathItems.length - 1;
	Session.currKAddr = kAddr;
}

const pathItem = (kAddr,i) => {
	return {
		w: `
			<div id="nav-${kAddr}" class="path-item {>("active", @active)}" onclick="Session.navSelected = ${i}; Session.currKAddr='${kAddr}';">${getRegName(kAddr)}</div>
		`,
		f: {
			id: `nav-${kAddr}`,
			kAddr: kAddr,
			get active() { return i === Session.navSelected; },
		},
		s: {
			[`nav-${kAddr}`]: {
				click() {
					Session.navSelected = i;
					Session.currKAddr = kAddr;
				},
			},
		}
	}
}

console.log("ran navPath.js");
