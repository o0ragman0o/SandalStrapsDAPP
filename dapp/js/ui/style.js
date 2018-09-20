let ss_style = new Tilux({
		f: {
			id: 'ss-style',
			hue: 200,
			sat: 100,
			lit: 81,
			get darkest() {return  `hsl(${this.hue}, ${this.sat + (100 - this.sat) * 0.1}%, ${this.lit * 0.3}%)`},
			get dark() {return  `hsl(${this.hue}, ${this.sat + (100 - this.sat) * 0.05}%, ${this.lit * 0.7}%)`},
			get base() {return `hsl(${this.hue}, ${this.sat}%, ${this.lit}%)`},
			get light() {return  `hsl(${this.hue}, ${this.sat - this.sat * 0.05}%, ${this.lit + (100 - this.lit) * 0.3}%)`},
			get lightest() {return  `hsl(${this.hue}, ${this.sat - this.sat * 0.1}%, ${this.lit + (100 - this.lit) * 0.9}%)`},
			get compliment() {return  `hsl(${(this.hue + 180) % 360}, ${this.sat}%, ${this.lit}%)`},
			get invalid() {return `hsl(5, ${this.sat}%, ${this.lit}%)`},
			get valid() {return `hsl(130, ${this.sat}%, ${this.lit * 0.9}%)`},
			trans: `0.00s`,
		},

		w: `
		<style id="{$@id}">

			* {
				box-sizing: border-box;
			}

			html {
			    height: 100%;
			    width: 100%;
			}

			body, .body {
			    margin: 0px;
			    padding: 0px;
			    font-size: 16px;
				font-family: Roboto, sans-serif;
				height: 100%;
				width: 100%;
			    transition-duration: {$@trans};
				background-color: {$@compliment};
			}

			article {
			    height: 100%;
			    display: grid;
			    grid-template-rows: 64px 1fr 64px;
			    grid-template-columns: 100%;
			}

			div {
			}

			h1 {
				color: {$@base};
			}

			h3 {
				font-weight: 300;
			}

			hr {
				border-top: 1px solid {$@dark};
			}

			label {
				display: inline-block;
				font-weight: 600;
				width: 130px;
			}

			.row {
				display: grid;
				grid-auto-flow: column;
				justify-items: stretch;
			}

			.column {
				display: grid;
				grid-auto-flow: row;
				justify-items: center;
			}

			.as-start {
				align-self: start;
			}
			
			.as-center {
				align-self: center;
			}
			
			.as-end {
				align-self: end;
			}
			
			.js-start {
				justify-self: start;
			}

			.js-stretch {
				justify-self: stretch;
			}

			.js-center {
				justify-self: center;
			}

			.js-end {
				justify-self: end;
			}

			.ai-center {
				display: flex
				align-items: center;
			}

			.hidden {
				display: none;
			}

			.layout {
				height: 100%
				display: grid;
				grid-template-rows: 64px 1fr 64px;
			}

			.banner {
				top: 0px;
				background-color: {$@darkest};
				color: {$@lightest};
			}

			.main{
				width: 90%;
				max-width: 1080px;
				height: 100%;
			}

			.nav-tree {
				font-size: 0.8em;
				color: {$@darkest};
				text-transform: uppercase;
			}

			.nav-path {
				font-size: 1em;
				top: 64px;
				color: {$@darkest};
				text-transform: uppercase;
				background-color: {$@compliment};
			}

			.contract {
			    color: {$@darkest};
			    background-color: {$@light};
				font-size: 1.0em;
				box-shadow: 0px 0px 5px -1px {$@darkest};
				height: calc(100% - (16px + 1em));
				overflow: auto;
			}

			.footer-row {
				display: grid;
				bottom: 0px; 
				grid-auto-flow: column;
				color: {$@lightest};
				background-color: {$@darkest};
			}

			.net {
				font-size: 0.8rem;
			}

			.soc {
				font-size: 1.6rem;
			}
			
			.path-item {
				display: inline-block;
				padding: 8px;
				cursor: pointer;
			}

			.path-item:hover {
				color: {$@lightest};
				background-color: {$@base};
				box-shadow: 0px -3px 3px{$@darkest};
			}

			.path-item + .active {
				color: {$@darkest};
				background-color: {$@light};
				box-shadow: 0px -3px 3px {$@darkest};
				text-shadow: 0.5px 0.5px 2px {$@lightest};
			}

			a:link {
				text-decoration: none;
			}

			a:hover {
				text-shadow: 0px 0px 2px {$@base};	
			}

			a:active {

			}

			.regbase-adv {
				display: grid;
				margin: 16px;
				grid-template-rows: 1.6em 1.2em 1.2em auto;
				grid-template-columns: 70px 350px auto;
				grid-template-areas:
					"idicon title title"
					"idicon addr bal"
					"idicon owner bal"
					"ext ext ext"
			}

			.docs-link {
				cursor: pointer;
			}

			.rb-idicon {
				grid-area: idicon;
			}

			.rb-title {
				grid-area: title;
			}

			.rb-regname {
				font-size: 1.4em;
				text-transform: uppercase;
				color: {$@darkest};
				text-shadow: 0.5px 0.5px 2px {$@dark};			
			}

			.rb-regname-sml {
				font-size: 1.0em;
				text-transform: uppercase;
				color: {$@darkest};
				text-shadow: 0.5px 0.5px 2px {$@dark};			
			}

			.rb-version {
				justify-self: end;
				font-size: 1.2em;
			}

			.rb-version-sml {
				justify-self: end;
				font-size: 0.8em;
			}

			.rb-addr {
				grid-area: addr;
			}

			.rb-owner {
				grid-area: owner;
			}

			.rb-bal {
				grid-area: bal;
				font-size: 1.6em;
			}

			.rb-ext {
				grid-area: ext;
			}

			.layer {
				padding: 13px 15.6px;
				border-width: 0 0 4px 0;
				border-style: solid;
				border-color: {$@compliment};
				box-shadow: 0px 0px 5px -1px {$@darkest};
			}

			.inline {
				display: inline-block;
			}

			.darkest {
				color: {$@darkest};
			}

			.dark {
				color: {$@darkest};
			}

			.base {
				color: {$@base};
			}

			.light {
				color: {$@light};
			}

			.lightest {
				color: {$@lightest};
			}

			.compliment {
				color: {$@compliment};
			}

			ul, ol,
			.ss-list {
				list-style: none;
			}

			.fs08 {
				font-size: 0.8rem;
			}

			.fs09 {
				font-size: 0.9rem;
			}

			.fs10 {
				font-size: 1.0rem;
			}

			.fs11 {
				font-size: 1.1rem;
			}

			.fs12 {
				font-size: 1.2rem;
			}

			.fs14 {
				font-size: 1.4rem;
			}

			.fs16 {
				font-size: 1.6rem;
			}

			.mono,
			.ss-val,
			.ss-addr,
			.ss-addr-sml
			{
				font-family: monospace;
				cursor: pointer;
			}

			.ss-addr-sml {
				font-size: 0.8em;
			}

			.ss-addr-inp {
				width: 372px;
			}

			.ss-bytes32 {
				width: 570px;				
			}


			.upper {
				text-transform: uppercase;
			}

			select,
			option,
			ss-select
			{
				color: {$@darkest};
			    transition-duration: {$@trans};
			}

			button,
			input,
			textarea,
			.ss-button,
			.rb-button,
			.ss-input,
			.ss-select,
			.ss-row
			{
				cursor: pointer;
				border-width: 1.4px;
				border-style: solid;
				padding: 13px 15.6px;
				margin: 9px;
			    transition-duration: 0.3s;
			    align-items: center;
				border-radius: 4px;
				border-color: {$@lightest};
				background-color: {$@light};
			}

			button,
			.rb-button
			.ss-button
			{
				color: {$@darkest};
				text-transform: uppercase;
			}

			.rb-button
			{
				display: flex;
			    vertical-align: middle;
				width: 300px;
			}

			.ss-input,
			.ss-select
			{
				width: 372px;
				cursor: pointer;
				display: inline-block;
			}

			input,
			select,
			textarea
			{
				cursor: pointer;
				width: 372px
				color: {$@darkest};
				box-shadow: 0.5px 0.5px 5px {$@darkest} inset;
			}

			textarea
			{
				cursor: pointer;
				width: 90%;
				min-height: 5rem;
			}

			input:hover,
			select:hover,
			textarea:hover,
			input:focus,
			select:focus
			{
				border-width: 1.4px;
				border-style: solid;
				border-color: {$@light};
				background-color: {$@base};
				box-shadow: 0.5px 0.5px 2px {$@darkest} inset;
			}

			input:invalid
			{
				background-color: {$@invalid};
			}

			input:valid
			{
/*				background-color: {$@valid};				*/
			}

			button:hover,
			.ss-button:hover,
			.rb-button:hover
			{
				border-color: {$@light};
			    background-color: {$@base};
				box-shadow: 0.5px 0.5px 5px {$@darkest};	
			}

			.ss-flex-container {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				flex-direction: row;
			}

			.ss-flex {
				display: inline-flex;
			}

			.ss-panel {
				border-width: 1.4px;
				border-style: solid;				
				border-radius: 4px;
				margin: 12px;
				/*padding: 6px;*/
				border-color: {$@lightest};
			}

			.ss-panel h3 {
				margin-top: 0px;
				padding: 6px;
				border-radius: 4px 4px 0px 0px;
				font-size: 0.9rem;
				text-transform: uppercase;
				background-color: {$@darkest};
				color: {$@lightest};
			}


			h3.ss-title {
				margin: 0px 16px;
				padding: 6px;
				border-radius: 4px 4px 0px 0px;
				font-size: 0.9rem;
				text-transform: uppercase;
				background-color: {$@darkest};
				color: {$@lightest};
			}

			h3.ss-title.important {
				color: {$@darkest};
				background-color: {$@invalid};				
			}

			.ss-title + div {
				margin: 0px 16px 16px 16px;
				border-width: 0 1.4px 1.4px 1.4px;
				border-style: solid;
				border-radius: 4px;
				border-radius: 0px 0px 4px 4px;
				padding: 0px 6px;
				border-color: {$@lightest};
			}

			.ss-title + div > .notice {
				background-color: {$@dark};
				padding: 6px;
				border-radius: 0px 0px 4px 4px;
			}

			.ss-title + div > .important {
				background-color: {$@invalid};
				padding: 6px;
				border-radius: 0px 0px 4px 4px;
			}

			.ss-title + div > h2 {
				margin-top: 0px;
				padding-top: 19px;
			}

			.idicon {
				display: inline-block;
				border-width: 2.2px;
				border-style: solid;
				border-radius: 100%;
				width: auto;
			    vertical-align: middle;
				border-color: {$@lightest};
			}

			.idicon-sml {
				border-width: 1.6px;

			}

			.idicon-tny {
				border-width: 1px;
			}

			button + input,
			select + input
			{
				display: inline-block;
			}

			.modal {
				position: fixed;
				display: grid;
				z-index: 1;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.4);
			}

			.modal-inner {
				font-size: 1.4em;
				margin: 100px;
				padding: 20px;
				height: calc(100% - 200px);
				background-color:{$@lightest};				
			}

			.modal-content {
				overflow-y: auto;
				overflow-wrap: break-word;
				width: 90%;
				max-width: 90%;
				/*height: calc(100% - 64px);*/
			}

			.evnt-label {
				display: inline-block;
				width: 130px;
			}

			.inp-icon {
				display: inline-flex;
				width: 35px;
				justify-content: center;
			}

			code {
				padding: 2px;
				background-color:{$@light};
			}

			pre {
				max-width: 90%;
				padding: 6px;
				overflow: scroll;
				background-color:{$@light};
				box-shadow: 0.5px 0.5px 5px {$@dark} inset;	
			}

		</style>
		`,
	}, CACHE
)
