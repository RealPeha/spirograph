let examples = [
`/**
 Circle({x: centerX, y: centerY, parent: circles[i], r: 150, speed: 0.05, deg: 0}, {x: funcX, y: funcY})
 
 * @defaults funcX = 'centerX - sin(deg) * r'
 *           funcY = 'centerY + cos(deg) * r'
 *           startDeg = 0
**/`,
`circles[0][0] = new Circle({x: 200, y: 200, r: 120, speed: 0.05})
circles[0][1] = new Circle({x: 200, y: 200, r: 90, speed: -0.1})
circles[0][2] = new Circle({x: 200, y: 200, r: 50, speed: -0.07})`,
`circles[0][0] = new Circle({x: 200, y: 200, r: 150, speed: 0.05}, {
    x: 'centerX - sin(deg) * r / 3'
})
circles[0][1] = new Circle({x: 200, y: 200, r: 120, speed: 0.05})
circles[0][2] = new Circle({parent: circles[0][0], r: 90, speed: -0.1})
circles[0][3] = new Circle({x: 200, y: 200, r: 50, speed: -0.1})`,
`circles[0][0] = new Circle({x: 200, y: 200, r: 120, speed: 0.05, hide: true})
circles[0][1] = new Circle({x: 200, y: 200, r: 90, speed: 0.05, hide: true})
circles[1][0] = new Circle({parent: circles[0][0], speed: -0.1, r: 50})
circles[2][0] = new Circle({r: 60, speed: 0.15, parent: circles[0][1]}, {
   y: 'centerY + cos(deg) * r'
})`,
`circles[0][0] = new Circle({x: 200, y: 250, r: 40, speed: -0.2})
circles[0][1] = new Circle({x: 200, y: 250, r: 130, speed: 0.05})
circles[0][2] = new Circle({parent: circles[0][1], r: 55, speed: -0.1, deg: 180})
circles[0][3] = new Circle({parent: circles[0][1], r: 75, speed: 1, deg: 180}, {
    x: 'centerX + sin(deg) * PI / r',
    y: 'centerY + cos(deg) * PI'
})`
]
const example = document.querySelectorAll('#examples > button')
const code = get('#logic')
for (let i = 0; i < example.length; i++) {
    example[i].addEventListener('click',() => {
        code.value = examples[i]
    })
}
example[0].click()