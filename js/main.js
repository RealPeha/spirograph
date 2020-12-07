const canva = document.getElementById("canva"),
      ctx   = canva.getContext("2d")

const circles = [],
      pointX = [], pointY = []

let a = 0,
    astep = 0.1

function init() {
    for (var i = 0; i <  10; i++) {
        pointX[i] = []
        pointY[i] = []
        circles[i] = []
    }
}
init()

var timer,
    speed = 20,
    visual = false

canva.width = 400;
canva.height = 400;

function Circle(center, func) {
    if (center.parent) {
        this.parent = center.parent
    }
    this.deg = (center.deg * PI / 180) || 0
    var funcX = func ? (func.x ? func.x : 'centerX - sin(deg) * r') : 'centerX - sin(deg) * r',
        funcY = func ? (func.y ? func.y : 'centerY + cos(deg) * r') : 'centerY + cos(deg) * r'
    funcX = parse(funcX)
    funcY = parse(funcY)
    this.center = center
    this.hide = center.hide || false
    this.centerX = center.x || center.parent.centerX
    this.centerY = center.y || center.parent.centerY || round(canva.height / 2)
    this.r = center.r || center.parent.r
    this.stepradius = 0
    this.upradius = 0
    if (Array.isArray(center.r)) {
        this.r = center.r[0]
        this.stepradius = (center.r[1] - center.r[0]) / (2 * PI)
    }
    this.speed = center.speed || center.parent.speed
    this.x = 0
    this.y = 0
    this.draw = function() {
        this.x = eval(funcX)
        this.y = eval(funcY)
        if (visual) {
            ctx.strokeStyle = 'rgba(244, 67, 54, .6)'
            ctx.fillStyle = 'rgba(244, 67, 54, .6)'
            ctx.beginPath()
            ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * PI, true)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc(this.x, this.y, 3, 0, 2 * PI, true)
            ctx.fill()
        }
        ctx.strokeStyle = 'rgba(0, 0, 0, .3)'
    }
}

function stepCircles() {
    for (var i = 0; i <  circles.length; i++) {
        for (var j = 0; j <  circles[i].length; j++) {
            circles[i][j].deg += circles[i][j].speed
            if (circles[i][j].stepradius != 0) {
                if (circles[i][j].r > circles[i][j].center.r[1] || circles[i][j].r < circles[i][j].center.r[0]) {
                    circles[i][j].stepradius = -circles[i][j].stepradius
                }
                circles[i][j].r += circles[i][j].stepradius
                if ((circles[i][j].deg % (2 * PI)).toFixed(1) == 0) {
                    console.log(circles[i][j].deg)
                    circles[i][j].r = circles[i][j].center.r[0]
                }
            }

            let parent = circles[i][j].parent
            circles[i][j].centerX = parent ? parent.x : circles[i][j].centerX
            circles[i][j].centerY = parent ? parent.y : circles[i][j].centerY
            circles[i][j].draw()
            if (!circles[i][j].hide) {
                pointX[i].push(circles[i][j].x)
                pointY[i].push(circles[i][j].y)
            }
        }
    }
}

function step() {
    ctx.clearRect(0, 0, canva.width, canva.height);
    stepCircles()
    a += astep
    for (var i = 0; i < pointX.length; i++) {
        for (var j = 0; j < pointX[i].length - 1; j++) {
            ctx.beginPath()
            ctx.moveTo(pointX[i][j], pointY[i][j])
            ctx.lineTo(pointX[i][j+1], pointY[i][j+1])
            ctx.stroke()
        }
        ctx.closePath()
    }
}

let drawing = false
const get = (e) => { return document.querySelector(e) }
get('#start').addEventListener('click',() => {
    if (!drawing) {
        if (circles[0][0]) {
            drawing = true
            timer = setInterval(step, speed)
        } else {
            speed = 20
            eval(document.getElementById('logic').value);
            eval(document.getElementById('global-var').value);
            timer = setInterval(step, speed)
            drawing = true
        }
    }
})

get('#stop').addEventListener('click', () => {
    clearInterval(timer)
    drawing = false
})

get('#erase').addEventListener('click', () => {
    clearInterval(timer)
    drawing = false
    ctx.clearRect(0, 0, canva.width,canva.height)
    init()
})

get('#reverse').addEventListener('click', () => {
    for (var i = 0; i <  circles.length; i++) {
        for (var j = 0; j <  circles[i].length; j++) {
            circles[i][j].speed = -circles[i][j].speed
        }
    }
})

const parse = input => {
    let output = input;
    output = output.replace(/centerX/g, 'this.centerX')
    output = output.replace(/centerY/g, 'this.centerY')
    output = output.replace(/deg/g, 'this.deg')
    output = output.replace(/\sr/g, 'this.r')
    return output
}