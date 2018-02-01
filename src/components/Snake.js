import React, {Component} from 'react'
import styled from 'react-emotion'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const Canvas = styled.canvas`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 25px;
  align-self: center;
`

export default class Snake extends Component {
  px = 10
  py = 10

  gs = 20
  tc = 20

  ax = 15
  ay = 15

  xv = 0
  yv = 0

  trail = []
  tail = 5

  componentDidMount() {
    document.addEventListener('keydown', this.handleInput)
    this.update()
  }

  update = () => {
    const canvas = this.c
    const ctx = this.c.getContext('2d')

    requestAnimationFrame(async () => {
      await delay(29.97)

      this.px += this.xv
      this.py += this.yv

      if (this.px < 0) {
        this.px = this.tc - 1
      }

      if (this.px > this.tc - 1) {
        this.px = 0
      }

      if (this.py < 0) {
        this.py = this.tc - 1
      }

      if (this.py > this.tc - 1) {
        this.py = 0
      }

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'orange'

      // Draw the snake's trail
      this.trail.forEach(block => {
        ctx.fillRect(
          block.x * this.gs,
          block.y * this.gs,
          this.gs - 2,
          this.gs - 2,
        )

        if (block.x === this.px && block.y === this.py) {
          this.tail = 5
        }
      })

      this.trail.push({x: this.px, y: this.py})

      while (this.trail.length > this.tail) {
        this.trail.shift()
      }

      if (this.ax === this.px && this.ay === this.py) {
        this.tail++
        this.ax = Math.floor(Math.random() * this.tc)
        this.ay = Math.floor(Math.random() * this.tc)
      }

      ctx.fillStyle = 'palevioletred'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.fillRect(
        this.ax * this.gs,
        this.ay * this.gs,
        this.gs - 2,
        this.gs - 2,
      )

      this.update()
    })
  }

  handleInput = e => {
    switch (e.key) {
      case 'ArrowLeft':
        this.xv = -1
        this.yv = 0
        break
      case 'ArrowUp':
        this.xv = 0
        this.yv = -1
        break
      case 'ArrowRight':
        this.xv = 1
        this.yv = 0
        break
      case 'ArrowDown':
        this.xv = 0
        this.yv = 1
        break
    }
  }

  render = () => (
    <Canvas width={500} height={500} innerRef={c => (this.c = c)} />
  )
}
