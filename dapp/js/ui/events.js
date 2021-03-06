
// Event log template
const eventInfo = (log) => {
	return Tilux.l(`
			<div class="ss-addr-sml">
				<span>BLOCK&nbsp;${blockLink(log.blockNumber)}</span> |
				<span>${(new Date(block(log.blockNumber).timestamp * 1000)).toLocaleString()}</span> |
				<span>TX&nbsp;${txHashLink(log.transactionHash)}</span>
			</div>
			<hr>
		`)
}


const formatUnknownEvents = (log, k) => {
	return Tilux.l({
		w: `
			<h4>${log.event}</h4>
			{#(@args)}
			`,
		f: {
			args: Object.keys(log.args).map((k)=>{return `<label>${k}</label><span class="mono">${log.args[k]}</span><br />`}),
		}
	});
}

const events = (k, evTmplt) => {
	let self = new Tilux({
		w: `
			<div id="{$@id}">
				<h3 class="ss-title">Events</h3>
				<div>
					{>(txtInp("evntFilter", "Filter (TODO)"))}
					{#(@events)}
				</div>
			</div>
		`,
		f: {
			id: 'k-events',
			k: k,
			evTmplt: evTmplt,
			events: [['Waiting for events logs...']],
		},
	}, CACHE);

	cache['k-events'] = self;

    k.events.get(
		(err, logs)=>{
			if(logs) {
				self.f.events = logs.reverse().map(
					log => {return evTmplt(log, k) + eventInfo(log)}
				)
    		}
    	}
    );

    return self;
}
