const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ParticlesArray = [];

class Particle{
    constructor(){
        this.size = Math.random()*15 + 5;
        this.x = Math.random()*(canvas.width - 50) + (this.size + 10);
        this.y = Math.random()*(canvas.height - 50) + (this.size + 10);
        this.directionX = Math.random()*3 - 1.5;
        this.directionY = Math.random()*3 - 1.5;
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
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

const init = () => {
    const noOfParticles = (canvas.width * canvas.height)/3000;
    ParticlesArray = [];
    for(let i = 0; i < noOfParticles; i++){
        ParticlesArray.push(new Particle());
    }
}

init();


const animate = () => {
    let lineOpacity = 1;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i=0; i < ParticlesArray.length; i++){
        for(let j=i+1; j<ParticlesArray.length; j++){
            let dx = ParticlesArray[j].x - ParticlesArray[i].x;
            let dy = ParticlesArray[j].y - ParticlesArray[i].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100){
                lineOpacity = 1 - (distance/100);
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = `rgba(255,255,255,${lineOpacity})`;
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