

const searchForm = (searchFor = '') => {
	const self = new Tilux({
		w: `
			<div id='{$@id}'>
				<h1><i class="fas fa-search"> </i>Search</h1>
				<p>Search by block number, address or TX hash</p>
				<input id="search-inp" class="mono" value="{$@value}" autofocus></input>
				<div id="result">
					{$@result}
				</div>
			</div>
		`,
		f: {
			value: searchFor,
			result: '',
		},
		s: {
			'#search-inp': {
				change: (event)=>{
					let searchFor = event.target.value;
					self.f.value = searchFor;
					if(!!web3.eth.getBlock(searchFor)) self.f.result = Tilux.l(`Block: {>(blockLink(${searchFor}))}`);
					else if(isAddr(searchFor)) self.f.result = Tilux.l(`Address: {>(ethAddrSml(${searchFor}))`);
					else if(!!web3.eth.getTransaction(searchFor)) self.f.result = Tilux.l(`Transaction: {>(txLink(${searchFor}))}`);
					else self.f.result = `Found nothing for:<span class="mono">${searchFor}</span>`;

				},
			},
		},
	}, CACHE);

	return self;
}

