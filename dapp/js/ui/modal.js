const modal = new Tilux({
	w: `
		<div id="{$@id}" class="{$@display}">
			<div class="modal">
				<div class="modal-inner">
					{>(@candle)}
					<div class="">
						<button id="ok-btn" class="js-end">Ok</button>
						<button id="cancel-btn" class="js-end">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	`,
	f: {
		id: "ss-modal",
		candle: '',
		display: 'hidden',
		onOk: '',
	},
	s: {
		"#ok-btn": {
			click: ()=>{modal.f.onOk(modal.f.candle);},
		},
		"#cancel-btn": {
			click: ()=>{modal.hide();},
		},
	},
}, CACHE);

modal.show = (candle, onOkCb) => {
	modal.f.candle = candle;
	modal.f.display = 'block';
	modal.f.onOk = onOkCb || modal.hide ;
}

modal.hide = () => {
	modal.f.candle = '';
	modal.f.display = 'hidden';
}