

function $import(file, async = false) {
    // DOM: Create the script element
    let jsElm = document.createElement("script");
    jsElm.type = "application/javascript";
    jsElm.src = file;
    jsElm.async = async;
	jsElm.onload = ()=>(console.log("loaded element", jsElm));
    document.head.appendChild(jsElm);
	console.log("created", file);
}

// function $loadFile(filePath, cd) {
// 	let file = new FileReader();
// 	file.onload = cb;
// }

function $getFile(filePath, cb) {
	let file = new XMLHttpRequest();
	file.onreadystatechange = function(){
 		// Makes sure the document exists and is ready to parse.
 		switch (file.readyState) {
 			case 0: console.log("Request unsent."); break;
 			case 1: console.log("Request opened."); break;
 			case 2: console.log("Request headers received."); break;
 			case 3: console.log("Request loading."); break;
 			case 4: {
 				console.log("Request done.");
		 		if (file.readyState === 4 && file.status === 200)
		 			cb(file.responseText);
		 	}
 			break;
 		}
	}
	file.onload = function(){
		cb(file.responseText)
	};
	file.open("GET", filePath, true);
	file.send();
	console.log(file);
}

function $(selector, parent = document) {
	return Array.prototype.slice.call(parent.querySelectorAll(selector),0);
}

function $$(selector, parent) {
	return $(selector)[0];
}

function $id(domId, parent = document) {
	return parent.getElementById(domId);
}

function $tag(tag, ns) {
	let e;
	if (ns) {
		e = document.createElementNS(ns, tag);
	} else {
		e = document.createElement(tag);
	}
	return e;
}

console.log("ran Domtools.js");
