require.config({
	paths: {
		"three": "../../bower_components/three.js/three"
	}
});

require(["Main"], function(Main) {
	Main.Start();
});