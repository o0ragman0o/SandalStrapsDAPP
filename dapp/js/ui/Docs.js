
const mdConverter = new showdown.Converter();
const mdToHtml = mdConverter.makeHtml;

function getDoc(path) {

	$getFile(path,
		(mdText)=>{
			let htmlDoc = mdConverter.makeHtml(mdText);
			modal.show(`<div class="modal-content fs08">${htmlDoc}</div>`);
		}
	);
}