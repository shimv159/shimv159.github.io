// I was drawn into this code simply because of how simple yet interactive it is. The interaction is minimal: tear the cloth with your mouse and drag to cut. The “cloth” is also just a grid. However, the nuances and physics applied to the cloth make this interaction feel believable and real. By dissecting the code, I hope to learn how this interaction was achieved. It’s a complicated code, especially for me as a beginner. Therefore, I hope to gain more general knowledge of how to write JS and organize it properly.


// refers to the open window, the requestAnimationFrame is to call a function to update an animation
window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1e3 / 60)
  }

// declares a variable and sets values
let accuracy = 5
let gravity = 400
let clothY = 28
let clothX = 54
let spacing = 8
let tearDist = 60
let friction = 0.99
let bounce = 0.5


// defines a function for the "canvas" id, getContext() returns the drawing context, which is an object containing the drawing properties
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

// defines canvas size based on viewport
canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = '#555'

// defines mouse function, sets values
let mouse = {
  cut: 8,
  influence: 26,
  down: false,
  button: 1,
  x: 0,
  y: 0,
  px: 0,
  py: 0
}


//creates object?
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.px = x
    this.py = y
    this.vx = 0
    this.vy = 0
    this.pinX = null
    this.pinY = null

    this.constraints = []
  }

  update (delta) {
    if (this.pinX && this.pinY) return this

    if (mouse.down) {
      let dx = this.x - mouse.x
      let dy = this.y - mouse.y
      let dist = Math.sqrt(dx * dx + dy * dy)

      if (mouse.button === 1 && dist < mouse.influence) {
        this.px = this.x - (mouse.x - mouse.px)
        this.py = this.y - (mouse.y - mouse.py)
      } else if (dist < mouse.cut) {
        this.constraints = []
      }
    }
// adds physics to the cloth/net
    this.addForce(0, gravity)

    let nx = this.x + (this.x - this.px) * friction + this.vx * delta
    let ny = this.y + (this.y - this.py) * friction + this.vy * delta

    this.px = this.x
    this.py = this.y

    this.x = nx
    this.y = ny

    this.vy = this.vx = 0

// if this.x is bigger or equal than canvas.width, then this.px would bounce according to the formula (i think this bit just sets up the behavior of the cloth)
    if (this.x >= canvas.width) {
      this.px = canvas.width + (canvas.width - this.px) * bounce
      this.x = canvas.width
    } else if (this.x <= 0) {
      this.px *= -1 * bounce
      this.x = 0
    }

    if (this.y >= canvas.height) {
      this.py = canvas.height + (canvas.height - this.py) * bounce
      this.y = canvas.height
    } else if (this.y <= 0) {
      this.py *= -1 * bounce
      this.y = 0
    }

    return this
  }

// calls draw function
  draw () {
    let i = this.constraints.length
    while (i--) this.constraints[i].draw()
  }

  resolve () {
    if (this.pinX && this.pinY) {
      this.x = this.pinX
      this.y = this.pinY
      return
    }

    this.constraints.forEach((constraint) => constraint.resolve())
  }

  attach (point) {
    this.constraints.push(new Constraint(this, point))
  }

  free (constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1)
  }

  addForce (x, y) {
    this.vx += x
    this.vy += y
  }

  pin (pinx, piny) {
    this.pinX = pinx
    this.pinY = piny
  }
}

// defines the Constraint class, constructor is a special method of class in order to create and initialize object of that class.
class Constraint {
  constructor (p1, p2) {
    this.p1 = p1
    this.p2 = p2
    this.length = spacing
  }

  resolve () {
    let dx = this.p1.x - this.p2.x
    let dy = this.p1.y - this.p2.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < this.length) return

    let diff = (this.length - dist) / dist

    if (dist > tearDist) this.p1.free(this)

    let mul = diff * 0.5 * (1 - this.length / dist)

    let px = dx * mul
    let py = dy * mul

    !this.p1.pinX && (this.p1.x += px)
    !this.p1.pinY && (this.p1.y += py)
    !this.p2.pinX && (this.p2.x -= px)
    !this.p2.pinY && (this.p2.y -= py)

    return this
  }

  draw () {
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
  }
}

class Cloth {
  constructor () {
    this.points = []

    let startX = canvas.width / 2 - clothX * spacing / 2

    for (let y = 0; y <= clothY; y++) {
      for (let x = 0; x <= clothX; x++) {
        let point = new Point(startX + x * spacing, 20 + y * spacing)
        y === 0 && point.pin(point.x, point.y)
        x !== 0 && point.attach(this.points[this.points.length - 1])
        y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)])

        this.points.push(point)
      }
    }
  }

  update (delta) {
    let i = accuracy

    while (i--) {
      this.points.forEach((point) => {
        point.resolve()
      })
    }

    ctx.beginPath()
    this.points.forEach((point) => {
      point.update(delta * delta).draw()
    })
    ctx.stroke()
  }
}

function setMouse (e) {
  let rect = canvas.getBoundingClientRect()
  mouse.px = mouse.x
  mouse.py = mouse.y
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

canvas.onmousedown = (e) => {
  mouse.button = e.which
  mouse.down = true
  setMouse(e)
}

canvas.onmousemove = setMouse

canvas.onmouseup = () => (mouse.down = false)

canvas.oncontextmenu = (e) => e.preventDefault()

let cloth = new Cloth()

;(function update (time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  cloth.update(0.016)

  window.requestAnimFrame(update)
})(0)