
function start() {

	Tilux.render("#ss-style", ss_style);
	Tilux.render("#accounts", accountsTplt);
	Tilux.render("#nav-path", navPath);
	Tilux.render("#footer-tplt", footer);
	Tilux.render("#ss-modal", modal);

	navPath.push(alphaStrapsAddr);
}


var mainTplt = new Tilux({
	w: `<div id="{$@id}"  class="contract">
			{>(@template)}
		</div>
	`,
	f: {
		id: "contract-tplt",
		bind: "currKAddr",
		get template() {
			return !kCandles[Session[this.bind]] ? `<p>SandalStraps contract not found.</p>` : kCandles[Session[this.bind]].advanced;
		},
	}
})


console.log("ran main.js");