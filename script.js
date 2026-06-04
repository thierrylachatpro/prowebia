// ===== EmailJS init (doit être hors DOMContentLoaded) =====
emailjs.init({ publicKey: "9cAhnLmP5LNeBLdII" });

document.addEventListener('DOMContentLoaded', () => {

  // Header scrolled state
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger menu mobile
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.card, .service, .timeline__item, .expertise__col');
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(progress * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ===== Formulaire contact =====
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.className = 'form__status';
      status.textContent = '';

      const name    = (form.name.value || '').trim();
      const email   = (form.email.value || '').trim();
      const type    = (form.type.value || '').trim();
      const message = (form.message.value || '').trim();

      if (!name || !email || !type || !message) {
        status.classList.add('is-error');
        status.textContent = 'Merci de remplir tous les champs.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.classList.add('is-error');
        status.textContent = 'Adresse email invalide.';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';

      emailjs.sendForm('service_eln7o86', 'template_nyito7j', form)
        .then(() => {
          status.classList.add('is-success');
          status.textContent = 'Merci ! Votre message a bien été envoyé. Nous vous répondons sous 48h.';
          form.reset();
          btn.disabled = false;
          btn.textContent = 'Envoyer ma demande';
        })
        .catch((error) => {
          console.error('EmailJS error:', error);
          status.classList.add('is-error');
          status.textContent = 'Une erreur est survenue. Merci de réessayer ou de nous contacter directement sur LinkedIn.';
          btn.disabled = false;
          btn.textContent = 'Envoyer ma demande';
        });
    });
  }

}); // fin DOMContentLoaded
