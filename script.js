//Movement Animation to happen
const card = document.querySelector('.card');
const container = document.querySelector('.container');

//Items
const title = document.querySelector('.titulo'); 
const producto = document.querySelector('.producto img');
const compra = document.querySelector('.comprar button');
const descripcion = document.querySelector('.info h3');
const tamaños = document.querySelector('.tamaños');
const audio = document.querySelector('.info audio');
const circulo = document.querySelector('.circulo');

//Moving Animation Event
container.addEventListener('mousemove', (e) =>
{
    let xAxis = (window.innerWidth / 2 - e.pageX) / 12;
    let yAxis = (window.innerHeight / 2 -e.pageY) / 12;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

//Animate in
container.addEventListener('mouseenter', (e) =>
{
    card.style.transition = "none";
    title.style.transform = "translateZ(46px)";
    producto.style.transform = "translateZ(20px)";
    compra.style.transform = "translateZ(40px)";
    descripcion.style.transform = "translateZ(30px)";
    tamaños.style.transform = "translateZ(40px)";
    audio.style.transform = "translateZ(36px)";
})
//Animate out

container.addEventListener('mouseleave', (e) =>
{
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    title.style.transform = "translateZ(0px)";
    producto.style.transform = "translateZ(0px)";
    compra.style.transform = "translateZ(0px)";
    descripcion.style.transform = "translateZ(0px)";
    tamaños.style.transform = "translateZ(0px)";
    audio.style.transform = "translateZ(0px)";
});

//Particles
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

const mouse =
{
    x: undefined,
    y: undefined,
}

//Animate Logo(Reproducir musica)
circulo.addEventListener('click', (e) =>
{
    audio.play();
})


//Particles al hacer click
canvas.addEventListener('click', function(event)
{
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<5; i++)
    {
        particlesArray.push(new Particle());
    }
});

class Particle
{
    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() *3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%, 50%';
    }

    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2)
        {
            this.size -= 0.1;
        }
    }

    draw()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles()
{
    for(let i=0; i<particlesArray.length; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j= i; j < particlesArray.length; j++)
        {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].x;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100)
            {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size / 10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
            if(particlesArray[i].size <= 0.2)
            {
                particlesArray.splice(i, 1);
                i--;
            }
    }
}

function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue = Math.random() * 255;
    requestAnimationFrame(animate);
}
animate();
