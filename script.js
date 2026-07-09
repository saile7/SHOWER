/*====================================================
=                CONFIGURACIÓN
====================================================*/

// Fecha del evento
const eventDate = new Date("August 15, 2026 14:00:00").getTime();

// Tu voto (se utilizará en el formulario)
let selectedVote = null;

// Porcentajes ficticios iniciales
let girlVotes = 55;
let boyVotes = 45;


/*====================================================
=             ELEMENTOS DEL DOM
====================================================*/

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const girlBtn = document.getElementById("girlBtn");
const boyBtn = document.getElementById("boyBtn");

const voteMessage = document.getElementById("voteMessage");

const girlBar = document.getElementById("girlBar");
const boyBar = document.getElementById("boyBar");


/*====================================================
=             CUENTA REGRESIVA
====================================================*/

function updateCountdown() {

    const now = new Date().getTime();

    const distance = eventDate - now;

    if (distance <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    daysElement.textContent = days.toString().padStart(2, "0");
    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/*====================================================
=          ACTUALIZAR BARRAS
====================================================*/

function updateVoteBars() {

    girlBar.style.width = girlVotes + "%";
    girlBar.textContent = girlVotes + "%";

    boyBar.style.width = boyVotes + "%";
    boyBar.textContent = boyVotes + "%";

}


/*====================================================
=          MENSAJE DE VOTACIÓN
====================================================*/

function showVoteMessage(message) {

    voteMessage.textContent = message;

    voteMessage.style.opacity = "0";

    voteMessage.style.transform = "translateY(20px)";

    setTimeout(() => {

        voteMessage.style.transition = ".4s";

        voteMessage.style.opacity = "1";

        voteMessage.style.transform = "translateY(0px)";

    }, 100);

}


/*====================================================
=             VOTAR NIÑA
====================================================*/

girlBtn.addEventListener("click", () => {

    selectedVote = "Niña";

    girlVotes++;

    boyVotes--;

    if (boyVotes < 0) {

        boyVotes = 0;

    }

    updateVoteBars();

    showVoteMessage(
        "💗 ¡Tu voto por NIÑA ha sido registrado!"
    );

    girlBtn.classList.add("selected");

    boyBtn.classList.remove("selected");

});


/*====================================================
=             VOTAR NIÑO
====================================================*/

boyBtn.addEventListener("click", () => {

    selectedVote = "Niño";

    boyVotes++;

    girlVotes--;

    if (girlVotes < 0) {

        girlVotes = 0;

    }

    updateVoteBars();

    showVoteMessage(
        "💙 ¡Tu voto por NIÑO ha sido registrado!"
    );

    boyBtn.classList.add("selected");

    girlBtn.classList.remove("selected");

});


/*====================================================
=       ACTUALIZAR AL CARGAR
====================================================*/

updateVoteBars();


/*====================================================
=         EFECTO HOVER EXTRA BOTONES
====================================================*/

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


/*====================================================
=         SCROLL SUAVE EN BOTONES
====================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const destino = document.querySelector(
            this.getAttribute("href")
        );

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});
 /*====================================================
=              FORMULARIO RSVP
====================================================*/

const rsvpForm = document.getElementById("rsvpForm");

const nameInput = document.getElementById("name");
const attendanceInput = document.getElementById("attendance");
const guestsInput = document.getElementById("guests");
const commentsInput = document.getElementById("comments");


/*====================================================
=            CONFIGURAR WHATSAPP
====================================================*/

// Cambia este número por el de los organizadores
// Formato internacional sin +, espacios ni guiones.
// Ejemplo Ecuador: 593999123456

const phoneNumber = "593968010658";


/*====================================================
=             VALIDAR FORMULARIO
====================================================*/

function validateForm() {

    const name = nameInput.value.trim();

    if (name === "") {

        alert("Por favor escribe tu nombre.");

        nameInput.focus();

        return false;

    }

    if (selectedVote === null) {

        alert("Antes de confirmar debes votar por Niño o Niña.");

        return false;

    }

    return true;

}


/*====================================================
=         CREAR MENSAJE DE WHATSAPP
====================================================*/

function createWhatsappMessage() {

    const name = nameInput.value.trim();

    const attendance = attendanceInput.value;

    const guests = guestsInput.value || 0;

    const comments = commentsInput.value.trim() || "Sin comentarios";

    const message =

`🎉 *CONFIRMACIÓN Al BABYSHOWER* 🎉

👤 *Nombre:*
${name}

📅 *Asistencia:*
${attendance}

👥 *Acompañantes:*
${guests}

💙💗 *Mi apuesta es:*
${selectedVote}

📝 *Comentarios:*
${comments}

¡Nos vemos pronto! 🎈`;

    return encodeURIComponent(message);

}


/*====================================================
=        ABRIR WHATSAPP
====================================================*/

function sendWhatsapp() {

    const message = createWhatsappMessage();

    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, "_blank");

}


/*====================================================
=            ENVIAR FORMULARIO
====================================================*/

rsvpForm.addEventListener("submit", function(e){

    e.preventDefault();

    if(!validateForm()){

        return;

    }

    const confirmSend = confirm(
        "¿Deseas enviar tu confirmación por WhatsApp?"
    );

    if(!confirmSend){

        return;

    }

    sendWhatsapp();

});


/*====================================================
=        EFECTO EN INPUTS
====================================================*/

const inputs = document.querySelectorAll(

    "input, textarea, select"

);

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.parentElement.classList.add("active");

    });

    input.addEventListener("blur",()=>{

        input.parentElement.classList.remove("active");

    });

});


/*====================================================
=       CONTADOR DE CARACTERES
====================================================*/

const maxCharacters = 250;

commentsInput.addEventListener("input",()=>{

    if(commentsInput.value.length>maxCharacters){

        commentsInput.value = commentsInput.value.substring(
            0,
            maxCharacters
        );

    }

});


/*====================================================
=        ANIMACIÓN BOTÓN ENVIAR
====================================================*/

const confirmButton = document.querySelector(".confirm-btn");

confirmButton.addEventListener("mouseenter",()=>{

    confirmButton.style.transform="translateY(-4px) scale(1.02)";

});

confirmButton.addEventListener("mouseleave",()=>{

    confirmButton.style.transform="";

});


/*====================================================
=         MENSAJE DE BIENVENIDA
====================================================*/

window.addEventListener("load",()=>{

    console.log("Invitación cargada correctamente.");

});


/*====================================================
=      EVITAR NÚMEROS NEGATIVOS
====================================================*/

guestsInput.addEventListener("change",()=>{

    if(guestsInput.value<0){

        guestsInput.value=0;

    }

});


/*====================================================
=         GUARDAR BORRADOR
====================================================*/

nameInput.addEventListener("input",()=>{

    localStorage.setItem(
        "guest_name",
        nameInput.value
    );

});

commentsInput.addEventListener("input",()=>{

    localStorage.setItem(
        "guest_comments",
        commentsInput.value
    );

});


attendanceInput.addEventListener("change",()=>{

    localStorage.setItem(
        "guest_attendance",
        attendanceInput.value
    );

});


guestsInput.addEventListener("input",()=>{

    localStorage.setItem(
        "guest_guests",
        guestsInput.value
    );

});


/*====================================================
=      RECUPERAR BORRADOR
====================================================*/

window.addEventListener("DOMContentLoaded",()=>{

    if(localStorage.getItem("guest_name")){

        nameInput.value=localStorage.getItem("guest_name");

    }

    if(localStorage.getItem("guest_comments")){

        commentsInput.value=localStorage.getItem("guest_comments");

    }

    if(localStorage.getItem("guest_attendance")){

        attendanceInput.value=localStorage.getItem("guest_attendance");

    }

    if(localStorage.getItem("guest_guests")){

        guestsInput.value=localStorage.getItem("guest_guests");

    }

});

/*====================================================
=              CONFETTI
====================================================*/

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let confettiPieces = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function randomColor() {

    const colors = [
        "#F8BBD9",
        "#F48FB1",
        "#A7D8F5",
        "#6EC1F5",
        "#D4AF37",
        "#FFD54F"
    ];

    return colors[Math.floor(Math.random() * colors.length)];

}

function createConfetti() {

    confettiPieces = [];

    for (let i = 0; i < 180; i++) {

        confettiPieces.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height - canvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 3 + 2,

            angle: Math.random() * Math.PI * 2,

            rotation: Math.random() * 360,

            color: randomColor()

        });

    }

}

function drawConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(piece => {

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(piece.rotation);

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size
        );

        ctx.restore();

        piece.y += piece.speed;
        piece.rotation += 0.05;

    });

    confettiPieces = confettiPieces.filter(
        piece => piece.y < canvas.height + 20
    );

    if (confettiPieces.length > 0) {

        requestAnimationFrame(drawConfetti);

    } else {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

}

function launchConfetti() {

    createConfetti();

    drawConfetti();

}


/*====================================================
=          CONFETTI AL VOTAR
====================================================*/

girlBtn.addEventListener("click", launchConfetti);

boyBtn.addEventListener("click", launchConfetti);


/*====================================================
=      CONFETTI AL CONFIRMAR
====================================================*/

rsvpForm.addEventListener("submit", () => {

    setTimeout(() => {

        launchConfetti();

    }, 300);

});


/*====================================================
=      OBSERVER PARA ANIMACIONES
====================================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(

    ".card, .photo, .result-box, #rsvpForm, .time-box"

).forEach(element => {

    observer.observe(element);

});


/*====================================================
=      VOTOS SIMULADOS
====================================================*/

function simulateVotes() {

    const vote = Math.random();

    if (vote > 0.5) {

        if (girlVotes < 80) {

            girlVotes++;

            boyVotes--;

        }

    } else {

        if (boyVotes < 80) {

            boyVotes++;

            girlVotes--;

        }

    }

    if (girlVotes < 20) girlVotes = 20;

    if (boyVotes < 20) boyVotes = 20;

    updateVoteBars();

}

setInterval(simulateVotes, 7000);


/*====================================================
=       EFECTO ESCRITURA HERO
====================================================*/

const heroTitle = document.querySelector(".hero h1");

const originalText = heroTitle.textContent;

heroTitle.textContent = "";

let index = 0;

function typeWriter() {

    if (index < originalText.length) {

        heroTitle.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeWriter, 45);

    }

}

window.addEventListener("load", typeWriter);


/*====================================================
=      BOTÓN VOLVER ARRIBA
====================================================*/

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topButton";

document.body.appendChild(topButton);

Object.assign(topButton.style, {

    position: "fixed",

    bottom: "25px",

    right: "25px",

    width: "55px",

    height: "55px",

    borderRadius: "50%",

    border: "none",

    cursor: "pointer",

    fontSize: "22px",

    color: "#fff",

    background: "linear-gradient(45deg,#F8BBD9,#A7D8F5)",

    boxShadow: "0 10px 20px rgba(0,0,0,.2)",

    display: "none",

    zIndex: "999"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*====================================================
=        MENSAJE FINAL
====================================================*/

function showThankYouMessage() {

    const modal = document.createElement("div");

    modal.innerHTML = `

        <div style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.55);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:10000;
        ">

            <div style="
                background:white;
                padding:40px;
                border-radius:25px;
                text-align:center;
                max-width:400px;
                font-family:Poppins;
            ">

                <h2 style="color:#D4AF37;">
                    ¡Gracias!
                </h2>

                <p style="margin:20px 0;">
                    Tu respuesta está lista para enviarse por WhatsApp.
                </p>

                <button id="closeModal"
                style="
                    padding:15px 30px;
                    border:none;
                    border-radius:50px;
                    background:#F48FB1;
                    color:white;
                    cursor:pointer;
                ">
                    Continuar
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    document
        .getElementById("closeModal")
        .addEventListener("click", () => {

            modal.remove();

        });

}


/*====================================================
=      MEJORA DEL ENVÍO
====================================================*/

const oldSendWhatsapp = sendWhatsapp;

sendWhatsapp = function () {

    showThankYouMessage();

    setTimeout(() => {

        oldSendWhatsapp();

    }, 1200);

};


/*====================================================
=            FIN DEL SCRIPT
====================================================*/

console.log(
    "%c🎉 Gender Reveal listo",
    "color:#D4AF37;font-size:18px;font-weight:bold;"
);