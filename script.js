// CONFIGURATION
const REVEAL_MESSAGE = "Happy Valentine’s Day my SPECIAL mistah meerkat, zoozi loves you and cant wait to adventure together and touch ur nips";
const PASSCODE = "zara";
const DELAY_MS = 2500;

// DOM ELEMENTS
const hotelView = document.getElementById('hotel-view');
const hackOverlay = document.getElementById('hack-overlay');
const continueBtn = document.getElementById('continue-btn');

const passcodeOverlay = document.getElementById('passcode-overlay');
const passcodeInput = document.getElementById('passcode-input');
const submitPasscodeBtn = document.getElementById('submit-passcode');
const passcodeError = document.getElementById('passcode-error');

const revealOverlay = document.getElementById('reveal-overlay');
const revealMessage = document.getElementById('reveal-message');
const backToHotelBtn = document.getElementById('back-to-hotel');
const confettiCanvas = document.getElementById('confetti-canvas');

// STATE
let hackTimer = null;
let audioCtx = null;

// INIT
window.addEventListener('DOMContentLoaded', () => {
    // Start the prank timer
    hackTimer = setTimeout(triggerHack, DELAY_MS);

    // Set the reveal message text immediately
    revealMessage.innerText = REVEAL_MESSAGE;
});

// EVENT LISTENERS
continueBtn.addEventListener('click', () => {
    hackOverlay.classList.add('hidden');
    passcodeOverlay.classList.remove('hidden');
    passcodeInput.focus();

    // Initialize audio context on first user interaction if needed
    initAudio();
});

submitPasscodeBtn.addEventListener('click', checkPasscode);
passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPasscode();
});

backToHotelBtn.addEventListener('click', () => {
    revealOverlay.classList.add('hidden');
    // Ensure timer doesn't restart
    if (hackTimer) clearTimeout(hackTimer);
});


// FUNCTIONS
function triggerHack() {
    hackOverlay.classList.remove('hidden');
    try {
        playAlertSound();
    } catch (e) {
        console.log("Autoplay prevented, sound will play on interaction.");
    }
}

function checkPasscode() {
    const input = passcodeInput.value.trim().toLowerCase();

    if (input === PASSCODE) {
        // Success
        passcodeOverlay.classList.add('hidden');
        revealOverlay.classList.remove('hidden');
        playSuccessSound();
        startConfetti();
    } else {
        // Fail
        passcodeInput.classList.add('shake');
        passcodeError.classList.remove('hidden');
        playErrorSound();

        setTimeout(() => {
            passcodeInput.classList.remove('shake');
        }, 500);
    }
}


// AUDIO UTILS (Simple Oscillators)
function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playAlertSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
}

function playErrorSound() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

function playSuccessSound() {
    initAudio();
    const now = audioCtx.currentTime;

    // Play a nice major chord (C Major: C, E, G)
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

    notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (i * 0.1));

        gain.gain.setValueAtTime(0, now + (i * 0.1));
        gain.gain.linearRampToValueAtTime(0.3, now + (i * 0.1) + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.1) + 1.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + (i * 0.1));
        osc.stop(now + (i * 0.1) + 1.5);
    });
}


// CONFETTI LOGIC
function startConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a18cd1', '#ff6b6b'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 5 + 2, // density
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngle: 0,
            tiltAngleIncremental: (Math.random() * 0.07) + 0.05
        });
    }

    let animationId;

    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            ctx.beginPath();
            ctx.lineWidth = p.r / 2;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
            ctx.stroke();

            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.x += Math.sin(p.tiltAngle) * 2;
            p.tilt = Math.sin(p.tiltAngle) * 15;

            // Reset particles that fall off screen
            if (p.y > confettiCanvas.height) {
                p.x = Math.random() * confettiCanvas.width;
                p.y = -10;
                p.tilt = Math.floor(Math.random() * 10) - 10;
            }
        }

        animationId = requestAnimationFrame(draw);
    }

    draw();

    // Handle resize
    window.addEventListener('resize', () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });

    // Stop after 10 seconds to save battery? Or just let it run.
    // Let it run for the vibe.
}
