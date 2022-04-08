function resizeCanvas(ratio){
    const canvas = document.querySelector('canvas')
    if(window.innerWidth > window.innerHeight){
        canvas.width = window.innerHeight * ratio
        canvas.height = window.innerHeight * ratio
    }
    else{
        canvas.width = window.innerWidth * ratio
        canvas.height = window.innerWidth * ratio
    }
    return canvas.width
}
let canvasWidth = resizeCanvas(0.90)

class Blade{
    constructor(){
        this.canvas = document.querySelector('canvas')
        this.context = this.canvas.getContext('2d')

        this.canvasCenterX = Math.round(this.canvas.width / 2)
        this.canvasCenterY = Math.round(this.canvas.height / 2)

        this.x = this.canvasCenterX
        this.y = this.canvasCenterY

        this.radius = this.canvas.width/2 * 0.8
        this.currentRadius = this.radius
        this.omega = 1
        this.rotations = this.radius

        this.angle = 0

        this.spiralAngle = 0
        this.spiralOmega = Math.random() * 2
    
        this.rgba = [0,0,0,0.5]
    }

    randomShape(){
        this.spiralOmega = fxrand() * 2
    }

    swapAlpha(){
        if(this.rgba[0] === 0){
            this.rgba = [255,255,255,0.5]
            return
        }
        this.rgba = [0,0,0,0.5]
    }

    moveBlade(x,y){
        this.context.translate(x,y)
    }

    rotateBlade(angle){
        this.context.rotate(angle)
    }

    drawBlade({rgba : c} = this){
        this.context.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`
        this.context.beginPath()   
        this.context.moveTo(this.radius * Math.cos(0),this.radius * Math.sin(0))
        for(let i = 0; i < this.rotations; i++){
            this.currentRadius += this.omega
            this.angle += (Math.PI * 2) / this.rotations
            let x = this.currentRadius * Math.cos(this.angle)
            let y = this.currentRadius * Math.sin(this.angle)
            this.context.lineTo(x,y)

        }
        this.context.lineWidth = 1
        this.context.stroke()
        this.currentRadius = this.radius
    }

    animateBlade(){
        this.context.save()
        this.spiralAngle -= this.spiralOmega
        this.moveBlade(this.x, this.y)
        this.rotateBlade(this.spiralAngle)
        this.drawBlade()
        this.context.restore()
    }
}

const blade1 = new Blade()

let loopCount = 0
const loopMax = canvasWidth * 3
// const loopMax = 1000

function loop(){
    if(loopCount > loopMax){
        blade1.swapAlpha()
        loopCount = 0
        blade1.randomShape()
        return
    }
    blade1.animateBlade()
    requestAnimationFrame(loop)
    loopCount++
}

loop()