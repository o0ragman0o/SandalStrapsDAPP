const OwningABI = [{"constant":false,"inputs":[{"name":"_kAddr","type":"address"}],"name":"receiveOwnershipOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kAddr","type":"address"},{"name":"_owner","type":"address"}],"name":"changeOwnerOf","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"}],"name":"ReceivedOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_kAddr","type":"address"},{"indexed":true,"name":"_owner","type":"address"}],"name":"ChangeOwnerOf","type":"event"}];
const OwningContract = web3.eth.contract(OwningABI);

// $import('js/apis/OwningAPI.js');

const owning = (k) => {
	let self = new Tilux({
		w:`
			<h3 class="ss-title">Owner</h3>
			<div>
				<div>
					{>(ethAddrInp("offerOwnerAddr", "Propsed owner address"))}
					<button id="offerOwnership-btn">Offer Ownership To...</button>
				</div>
				<div>			
					{>(ethAddrInp("receiveKOwnership", "Contract address to own"))}
					<button id="acceptOwnership-btn">Receive Ownership Of...</button>
				</div>
			</div>
		`,
		f: {
			k: k,
		},
		s: {

		}
	})

}