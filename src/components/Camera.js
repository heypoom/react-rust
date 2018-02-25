import React, {Component} from 'react'
import styled from 'react-emotion'

import wasm from '../main.rs'

const Canvas = styled.canvas`
  width: 512px;
  height: 512px;
`

const width = 512
const height = 512

export default class Camera extends Component {
  module = {}

  async componentDidMount() {
    // Initialize Wasm Module
    const module = await wasm
    this.module = module

    this.draw()
    module.process()

    console.log('Module', module)
    console.log('Instance Exports', module.instance())

    const stream = await navigator.mediaDevices.getUserMedia({video: true})

    console.log(stream)
  }

  draw = () => {
    const module = this.module
    const canvas = this.canvas
    const {memory} = module.instance()

    const ctx = canvas.getContext('2d')

    const byteSize = width * height * 4
    const pointer = module.malloc(byteSize)

    const usub = new Uint8ClampedArray(memory.buffer, pointer, byteSize)
    const img = new ImageData(usub, width, height)

    let start = null

    function step(timestamp) {
      let progress

      if (start === null) {
        start = timestamp
      }

      progress = timestamp - start

      if (progress > 15) {
        module.fill(pointer, width, height, timestamp)
        start = timestamp

        window.requestAnimationFrame(draw)
      } else {
        window.requestAnimationFrame(step)
      }
    }

    function draw() {
      ctx.putImageData(img, 0, 0)
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  render = () => (
    <Canvas
      innerRef={ref => (this.canvas = ref)}
      width={width}
      height={height}
    />
  )
}
