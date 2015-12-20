function initShaders () {
	var fragSh = initFragSh();
	var vertSh = initVertSh();

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertSh);
	gl.attachShader(shaderProgram, fragSh);
	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);
	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  	gl.enableVertexAttribArray(vertexPositionAttribute);
}

function initFragSh () {
	var fragShCode = [
		"void main(void){",
		"gl_FragColor = Vec4(1.0, 1.0, 1.0, 1.0);}"
	].join('\n');	

	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, fragShCode);
	gl.compileShader(shader);
	return shader;
}

function initVertSh () {
	var vertShCode = [
		"attribute vec3 aVertexPosition;",
		"uniform mat4 uMVMatrix;",
		"uniform mat4 uPMatrix;",

		"void main(void){",
		"gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);}"
	].join('\n');		

	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, vertShCode);
	gl.compileShader(shader);
	return shader;	
}

