import React, {Component} from 'react'
import styled from 'react-emotion'

window.px = window.py = 10
window.gs = window.tc = 20
window.ax = window.ay = 15
window.xv = window.yv = 0

window.trail = []
window.tail = 5

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function update() {
  requestAnimationFrame(async () => {
    await delay(29.97)

    px += xv
    py += yv

    if (px < 0) {
      px = tc - 1
    }

    if (px > tc - 1) {
      px = 0
    }

    if (py < 0) {
      py = tc - 1
    }

    if (py > tc - 1) {
      py = 0
    }

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'orange'

    // Draw the snake's trail
    trail.forEach(block => {
      ctx.fillRect(block.x * gs, block.y * gs, gs - 2, gs - 2)

      if (block.x == px && block.y == py) {
        tail = 5
      }
    })

    trail.push({x: px, y: py})

    while (trail.length > tail) {
      trail.shift()
    }

    if (ax == px && ay == py) {
      tail++
      ax = Math.floor(Math.random() * tc)
      ay = Math.floor(Math.random() * tc)
    }

    ctx.fillStyle = 'palevioletred'
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2)

    update()
  })
}

function handleInput(e) {
  console.log(e.key)

  switch (e.key) {
    case 'ArrowLeft':
      xv = -1
      yv = 0
      break
    case 'ArrowUp':
      xv = 0
      yv = -1
      break
    case 'ArrowRight':
      xv = 1
      yv = 0
      break
    case 'ArrowDown':
      xv = 0
      yv = 1
      break
  }
}

const Canvas = styled.canvas`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 25px;
  align-self: center;
`

export default class Snake extends Component {
  componentDidMount() {
    console.log(this.c)

    window.canvas = this.c
    window.ctx = this.c.getContext('2d')

    document.addEventListener('keydown', handleInput)

    update()
  }

  render = () => (
    <Canvas width={500} height={500} innerRef={c => (this.c = c)} />
  )
}
