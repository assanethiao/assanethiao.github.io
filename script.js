/* ============================================================
   TYPING ANIMATION
   ============================================================ */
const typingEl = document.getElementById('typingText');
const words = [
    'Étudiant Ingénieur',
    'Ingénierie IA',
    'Télécommunications & Réseaux',
    'Data Science'
];
let wIdx = 0, cIdx = 0, deleting = false;

function type() {
    const word = words[wIdx];
    typingEl.textContent = deleting
        ? word.slice(0, cIdx - 1)
        : word.slice(0, cIdx + 1);
    deleting ? cIdx-- : cIdx++;

    if (!deleting && cIdx === word.length) {
        setTimeout(() => { deleting = true; }, 2000);
    } else if (deleting && cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
    }
    setTimeout(type, deleting ? 45 : 95);
}
setTimeout(type, 900);

/* ============================================================
   NAVBAR — scroll effect + active link
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    /* Scrolled class */
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    /* Active link */
    let cur = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 220) cur = sec.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const menuBtn = document.getElementById('mobileMenuBtn');
const navList = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuBtn.classList.toggle('active');
});
navLinks.forEach(l => l.addEventListener('click', () => {
    navList.classList.remove('open');
    menuBtn.classList.remove('active');
}));

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger cards in the same parent
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
            const delay = siblings.indexOf(entry.target) * 120;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

/* ============================================================
   SKILL BARS
   ============================================================ */
const bars = document.querySelectorAll('.bar-fill');
let barsTriggered = false;
const barsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !barsTriggered) {
            barsTriggered = true;
            bars.forEach((b, i) => {
                setTimeout(() => {
                    b.style.width = b.dataset.progress + '%';
                }, i * 80);
            });
            barsObs.disconnect();
        }
    });
}, { threshold: 0.2 });
const skillsSection = document.getElementById('skills');
if (skillsSection) barsObs.observe(skillsSection);

/* ============================================================
   STATS COUNTER
   ============================================================ */
const statNums = document.querySelectorAll('.stat-num[data-target]');
let statsTriggered = false;
const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsTriggered) {
            statsTriggered = true;
            statNums.forEach(el => {
                const target = parseInt(el.dataset.target);
                let count = 0;
                const step = target / 60;
                const tick = () => {
                    count = Math.min(count + step, target);
                    if (!isNaN(target)) {
                        el.textContent = Math.ceil(count) + '+';
                    } else {
                        el.textContent = el.dataset.target;
                    }
                    
                    if (count < target) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            statsObs.disconnect();
        }
    });
}, { threshold: 0.1 });
const aboutSection = document.getElementById('about');
if (aboutSection) statsObs.observe(aboutSection);

/* ============================================================
   PROFILE IMAGE SUBTLE PARALLAX
   ============================================================ */
const profileImg = document.getElementById('profileImg');
if (profileImg) {
    window.addEventListener('mousemove', e => {
        const rx = (e.clientX / window.innerWidth - .5) * 10;
        const ry = (e.clientY / window.innerHeight - .5) * 10;
        profileImg.style.transform = `translate(${rx * .4}px, ${ry * .4}px)`;
    });
}

/* ============================================================
   CONSOLE EASTER EGG
   ============================================================ */
console.log('%c👋 Salut ! Tu inspectes mon code ?', 'color:#4F6EF7;font-size:18px;font-weight:bold;');
console.log('%cContacte-moi : thiaoassanethiao@gmail.com', 'color:#7C5CBF;font-size:13px;');