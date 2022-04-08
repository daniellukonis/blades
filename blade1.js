console.log('connected')

const canvasRatio = 0.90

function resizeCanvas(percentage){
    const canvas = document.querySelector('canvas')
    canvas.width = Math.floor(window.innerWidth * percentage)
    canvas.height = Math.floor(window.innerHeight * percentage)
}

resizeCanvas(canvasRatio)

class Blade{
    constructor(){
        this.canvas = document.querySelector('canvas')
        this.context = this.canvas.getContext('2d')

        this.bladeRadius = 70
        this.x = 200
        this.y = 200
        
        this.startLineWidth = 1
        this.endLineWidth = this.bladeRadius / 2
        this.currentLineWidth = this.startLineWidth
        
        this.currentAngle = 0
        this.angleVelocity = 0.001
                
        this.angleSteps = Math.PI * 2 / this.angleVelocity
        this.lineSteps = (this.endLineWidth - this.startLineWidth) / this.angleSteps 
        
        
        console.log(this.angleSteps,this.lineSteps)
    }

    rotateBlade(){
        this.currentLineWidth += this.lineSteps
        this.currentAngle += this.angleVelocity
    }

    drawBlade({context} = this){
        context.save()
        context.strokeStyle = this.currentColor
        context.lineWidth = this.currentLineWidth
        context.translate(this.x,this.y)
        context.beginPath()
        context.arc(0,0,this.bladeRadius,this.currentAngle - this.angleVelocity,this.currentAngle)
        context.stroke()
        context.restore()
    }

    fillBlade(){
        for(let i = 0; i < this.angleSteps; i++){
 
            this.drawBlade()
            this.rotateBlade()

        }
    }
}

const blade1 = new Blade()
blade1.fillBlade()