const footer = new Tilux({
	w: `
		<footer id="footer-tplt" class="footer-row">
			{>(network)}
			{>(socLinks)}
		</footer>
		`,
	f: {}
}, CACHE)


console.log("ran footer.js");
