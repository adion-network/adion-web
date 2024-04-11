// components/RainbowBg.js
import React, { useEffect, useRef } from "react"

const RainbowBg = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas: any = canvasRef.current
    const gl = canvas.getContext("webgl")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var ut: any,
      st = Date.now()

    function initShaders(gl: any) {
      var vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(
        vertexShader,
        `attribute vec4 vPosition;
      void main (void) {
          gl_Position = vPosition;
      }`
      )
      gl.compileShader(vertexShader)

      if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        debugger
      }

      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(
        fragmentShader,
        `precision mediump float;

      uniform float time;
      uniform vec2 resolution;

      void main(void) {
          vec2 q = gl_FragCoord.xy / resolution.xy;
          vec2 p = -0.0 + 2.0 * q;
          p.x *= resolution.x / resolution.y;

          float v = p.x + cos(time + p.y);
          vec3 col = vec3(0.1 * max(0.0, p.y), 0.1 * max(0.0, p.x), 0.2 * max(0.0, p.x)) / abs(v * 2.0);
          gl_FragColor = vec4(col, 1.0);
      }`
      )
      gl.compileShader(fragmentShader)

      if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        debugger
      }

      var program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      gl.useProgram(program)

      return program
    }

    function render() {
      var width = canvas.width
      var height = canvas.height
      gl.viewport(0, 0, width, height)

      var program = initShaders(gl)
      var buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, -1, 1, 1]), gl.STATIC_DRAW)

      var vPosition = gl.getAttribLocation(program, "vPosition")
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(vPosition)

      ut = gl.getUniformLocation(program, "time")
      var resolution = new Float32Array([canvas.width, canvas.height])
      gl.uniform2fv(gl.getUniformLocation(program, "resolution"), resolution)

      gl.uniform1f(ut, (Date.now() - st) / 1000)
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
      requestAnimationFrame(render)
    }
    render()
  }, [])

  return <canvas ref={canvasRef} />
}

export default RainbowBg
