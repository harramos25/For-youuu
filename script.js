const state = {
    currentScreen: 1,
    currentLine: 0,
    lines: [
        "Hi, Amoure.",
        "Honestly… hanggang ngayon medyo hindi pa rin ako makapaniwala na I’m actually writing something like this.",
        "If you knew me before, you’d know na hindi talaga ako yung type na nagsusulat ng ganito, lalo na letters.",
        "Gosh, ang drama ko na ata 😭 but here I am, coding a whole website just because of you.",
        "Funny kasi hindi naman talaga kasama sa plano ko to.",
        "I was so sure before na focus lang ako sa goals ko — work, school, matapos tong last year, earn money, be responsible, be serious.",
        "Love life wasn’t even on the list. Alam ng friends ko yan.",
        "Tapos bigla ka lang dumating.",
        "And somehow, slowly… quietly… you changed the routine I thought I already settled into.",
        "At first, I really saw you as a friend. Someone I wanted to comfort, someone I wanted to make feel okay.",
        "Hindi ko napansin na habang nakikinig ako sa voice messages mo, habang paulit-ulit kong pinapakinggan yung boses mo (yes, guilty ako dun), something was already changing (Ginayuma mo ata ako eh).",
        "Your voice became familiar.",
        "Your messages became something I look forward to.",
        "Your name appearing on my notifications started making me smile without me realizing it.",
        "And somewhere along the way, hindi ko napansin na I was already liking you.",
        "Hindi siya biglang moment. Hindi dramatic realization.",
        "Parang… one day I just noticed that my days felt lighter when you were there.",
        "You broke that “sad and boring plan” I made for myself and surprisingly, I’m not even mad about it.",
        "I love how you tell me random things about your day.",
        "I love how clingy you get kahit minsan nagtatampo ka pa.",
        "I love how you send voice messages out of nowhere.",
        "And yes… I love your voice more than I probably should admit.",
        "And honestly? I didn’t expect to say “I love you” this soon in my life again.",
        "Kasi totoo lang, I rarely say those words.",
        "The only people I’ve ever said it to are my mama and my closest friends and usually during special moments or occasions.",
        "Of course I love them, but in a different way.",
        "I guess I always treated “I love you” as something big. For me, it’s not just a sweet phrase.",
        "It means commitment. It means choosing to stay, even when things aren’t exciting anymore.",
        "It means not running away just because things become ordinary or hard.",
        "So when I said it to you, it didn’t feel forced or scary. It felt calm. Natural.",
        "Like something my heart already knew before my brain even caught up.",
        "Ang OA pakinggan, pero totoo.",
        "I don’t love you because everything is perfect.",
        "I love you because even in ordinary moments; late replies, random chismis, sleepy conversations — I feel comfortable being myself with you.",
        "And I want you to know something important:",
        "I’m not here because of a moment.",
        "I’m here because I choose you in the quiet days, the normal days, and even the messy ones.",
        "So this little website, this letter, and the flower you’ll see next… it’s just my small way of saying:",
        "I’m happy you came into my life.",
        "I’m happy it’s you.",
        "And if you’ll allow me…",
        "I want to keep choosing you — today, tomorrow, the day after tomorrow, the days after that, the days after the days after that, and all the after-afters that come next."
    ],
    isTyping: false
};

// Cinematic Screen Transitions
function transitionTo(screenNumber) {
    const current = document.getElementById(`screen-${state.currentScreen}`);
    const next = document.getElementById(`screen-${screenNumber}`);

    if (current) current.classList.remove('active');

    // Reset "No" button position whenever we transition
    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
        noBtn.style.removeProperty('position');
        noBtn.style.removeProperty('left');
        noBtn.style.removeProperty('top');
        noBtn.style.removeProperty('z-index');
        noBtn.style.position = ''; // Explicitly clear for flex flow
    }

    setTimeout(() => {
        if (next) {
            next.classList.add('active');
            state.currentScreen = screenNumber;

            // Reset letter if going forward to Screen 3
            if (screenNumber === 3) {
                setupLetter();
            }

            if (screenNumber === 4) {
                setTimeout(() => {
                    document.body.classList.remove('not-loaded');
                }, 500);
            }
        }
    }, 1200);
}

// Letter Sequential Reveal
function setupLetter() {
    const container = document.getElementById('letter-content');
    container.innerHTML = '';

    state.lines.forEach((text, index) => {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `<p class="line-text">${text}</p>`;
        container.appendChild(line);
    });

    state.lineElements = document.querySelectorAll('.line');
    state.currentLine = 0;

    // Reset buttons and signature
    document.getElementById('btn-next-line').style.display = 'inline-block';
    document.getElementById('btn-open-flower').classList.add('hidden');
    document.getElementById('signature').classList.add('hidden');
}

function revealNextLine() {
    if (state.currentLine < state.lineElements.length) {
        state.lineElements[state.currentLine].classList.add('revealed');

        const stationeryBox = document.querySelector('.stationery');
        if (stationeryBox) {
            // Smoothly scroll down over the duration of the line expansion
            let scrollCount = 0;
            const scrollInterval = setInterval(() => {
                stationeryBox.scrollTo({
                    top: stationeryBox.scrollHeight,
                    behavior: 'smooth'
                });
                scrollCount++;
                if (scrollCount >= 10) clearInterval(scrollInterval);
            }, 100);
        }

        const hint = document.getElementById('letter-hint');
        if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => hint.classList.add('hidden'), 500);
        }

        state.currentLine++;

        // Show signature on last line
        if (state.currentLine === state.lineElements.length) {
            setTimeout(() => {
                const signature = document.getElementById('signature');
                if (signature) signature.classList.remove('hidden');

                document.getElementById('btn-next-line').style.display = 'none';
                const openFlowerBtn = document.getElementById('btn-open-flower');
                if (openFlowerBtn) {
                    openFlowerBtn.classList.remove('hidden');
                    openFlowerBtn.style.display = 'inline-block';
                }
            }, 600);
        }
    }
}

// Star Generation Logic
function initStars() {
    const container = document.getElementById('star-container');
    if (!container) return;

    container.innerHTML = '';
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random sizes between 1px and 3px
        const sizeValue = Math.random() * 3 + 1;
        const size = sizeValue + 'px';
        star.style.width = size;
        star.style.height = size;

        // Random positions
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';

        // Random twinkle speed
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');

        container.appendChild(star);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initStars();

    // Button interactions
    const enterBtn = document.getElementById('btn-enter');
    if (enterBtn) enterBtn.addEventListener('click', () => transitionTo(2));

    const yesBtn = document.getElementById('btn-yes');
    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            const questionContent = document.querySelector('.question-content');
            const successMessage = document.getElementById('success-message');
            if (questionContent) questionContent.classList.add('hidden');
            if (successMessage) successMessage.classList.remove('hidden');
        });
    }

    const toLetterBtn = document.getElementById('btn-to-letter');
    if (toLetterBtn) toLetterBtn.addEventListener('click', () => transitionTo(3));

    const backLetterBtn = document.getElementById('btn-back-letter');
    if (backLetterBtn) {
        backLetterBtn.addEventListener('click', () => transitionTo(2));
    }

    const toFlowersBtn = document.getElementById('btn-to-flowers');
    if (toFlowersBtn) toFlowersBtn.addEventListener('click', () => {
        transitionTo(4);
        initBubbleHearts();
    });

    const backFlowersBtn = document.getElementById('btn-back-flowers');
    if (backFlowersBtn) {
        backFlowersBtn.addEventListener('click', () => transitionTo(2));
    }

    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
        const happyGif = document.getElementById('gif-happy');
        const cryGif = document.getElementById('gif-cry');

        const moveNoBtn = () => {
            // Only move if we are on Screen 2 and active (added safety)
            if (!document.getElementById('screen-2').classList.contains('active')) return;

            // Change GIF to Cry
            if (happyGif) happyGif.classList.add('hidden');
            if (cryGif) cryGif.classList.remove('hidden');

            const x = Math.random() * (window.innerWidth - 100);
            const y = Math.random() * (window.innerHeight - 50);
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${x}px`;
            noBtn.style.top = `${y}px`;
            noBtn.style.zIndex = '1000';
        };

        // Standard listeners
        noBtn.addEventListener('mouseover', moveNoBtn);
        noBtn.addEventListener('touchstart', (e) => {
            // Check if it's already in its "fixed" evasive state to prevent double-firing
            if (noBtn.style.position === 'fixed') {
                moveNoBtn();
                e.preventDefault();
            } else {
                // If it's the very first touch, let it evade
                moveNoBtn();
                e.preventDefault();
            }
        });

        noBtn.addEventListener('mouseleave', () => {
            // Change GIF back to Happy
            if (happyGif) happyGif.classList.remove('hidden');
            if (cryGif) cryGif.classList.add('hidden');
        });
    }

    const nextLineBtn = document.getElementById('btn-next-line');
    if (nextLineBtn) nextLineBtn.addEventListener('click', revealNextLine);

    const openFlowerBtn = document.getElementById('btn-open-flower');
    if (openFlowerBtn) {
        openFlowerBtn.addEventListener('click', () => {
            transitionTo(4);
            initBubbleHearts();
        });
    }

    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('hidden');
            const letterContainer = document.getElementById('letter-container');
            if (letterContainer) {
                letterContainer.classList.remove('hidden');
                letterContainer.classList.add('reveal-text');
                revealNextLine();
            }
        });
    }
});

function initBubbleHearts() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'bubble-heart';
        heart.innerHTML = '❤';

        const startX = Math.random() * 100;
        const speed = 4 + Math.random() * 4;
        const drift = (Math.random() - 0.5) * 200;
        const size = 0.8 + Math.random() * 1.5;

        heart.style.left = `${startX}%`;
        heart.style.setProperty('--speed', `${speed}s`);
        heart.style.setProperty('--drift', `${drift}px`);
        heart.style.fontSize = `${size}rem`;

        container.appendChild(heart);

        // Cleanup
        setTimeout(() => heart.remove(), speed * 1000);
    }, 400);
}
