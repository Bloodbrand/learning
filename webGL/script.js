var gl, horizAspect, canvas;

(function start() {
  canvas = document.getElementById("glcanvas");
  horizAspect = canvas.height / canvas.width;
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  initBuffers();
}())

function initBuffers () {
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
	    1.0,  1.0,  0.0,
	    -1.0, 1.0,  0.0,
	    1.0,  -1.0, 0.0,
	    -1.0, -1.0, 0.0
  	];

  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function drawScene () {	
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //perspectiveMatrix = makePerspective(45, canvas.width/canvas.height, 0.1, 100.0);
  //loadIdentity();
  //mvTranslate([-0.0, 0.0, -6.0]);


}

