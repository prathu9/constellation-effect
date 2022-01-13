const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ParticlesArray = [];

let mouse = {
    x: undefined,
    y: undefined,
    radius: canvas.width*(10/100)
}

class Particle{
    constructor(){
        this.size = Math.random()*5 + 3;
        this.x = Math.random()*(canvas.width - 50) + (this.size + 10);
        this.y = Math.random()*(canvas.height - 50) + (this.size + 10);
        this.directionX = Math.random()*5 -2.5;
        this.directionY = Math.random()*5 -2.5;
        this.color = `#00ffff`;
    }

    update(){
        this.x -= this.directionX;
        this.y -= this.directionY;

        if(this.x - this.size < 0 || this.x + this.size > canvas.width){
            this.directionX = -this.directionX;
        }

        if(this.y - this.size < 0 || this.y + this.size > canvas.height){
            this.directionY = -this.directionY;
        }

        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < this.size + mouse.radius){
            if(this.x < mouse.x && this.x > this.size + 10){
                this.x -= 10;
            }

            if(this.x > mouse.x && this.x < canvas.width - (this.size + 10)){
                this.x += 10;
            }

            if(this.y < mouse.y && this.y > this.size + 10){
                this.y -= 10;
            }

            if(this.y > mouse.y && this.y < canvas.height - (this.size +10)){
                this.y += 10;
            }
        }
        
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

const init = () => {
    ParticlesArray = [];
    let noOfParticle = (canvas.width * canvas.height)/3000;
    for(let i=0; i < noOfParticle; i++){
        ParticlesArray.push(new Particle());
    }
}

init();

const animate = () => {
    let lineOpacity = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i < ParticlesArray.length; i++){
        for(let j=i; j < ParticlesArray.length; j++){
            let dx = ParticlesArray[j].x - ParticlesArray[i].x;
            let dy = ParticlesArray[j].y - ParticlesArray[i].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            lineOpacity = 1 - distance/100;
            if(distance < 100){
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = `rgba(0,255,255,${lineOpacity})`;
                ctx.moveTo(ParticlesArray[j].x, ParticlesArray[j].y);
                ctx.lineTo(ParticlesArray[i].x, ParticlesArray[i].y);
                ctx.stroke();
            }
        }
        ParticlesArray[i].update();
        ParticlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

canvas.addEventListener("mouseout", () => {
    mouse.x = undefined;
    mouse.y = undefined;
})