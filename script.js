document.addEventListener('DOMContentLoaded', function () {
  // Set footer year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block: 'start'});
    });
  });

  // Email obfuscation
  const user = 'harinimurugesan'; // Replace username
  const domain = 'example.com';    // Replace domain
  const revealBtn = document.getElementById('reveal-email');
  const emailMask = document.getElementById('email-mask');
  function showEmailAndCopy() {
    const email = user + '@' + domain;
    emailMask.textContent = email;
    navigator.clipboard && navigator.clipboard.writeText(email).then(()=> {
      revealBtn.textContent = 'Copied ✓';
      setTimeout(()=> revealBtn.textContent = 'Reveal & copy', 1800);
    });
    window.location.href = 'mailto:' + email;
  }
  if (revealBtn) {
    revealBtn.addEventListener('click', showEmailAndCopy);
    revealBtn.addEventListener('keydown', e => { if(e.key === 'Enter') showEmailAndCopy(); });
  }

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {threshold: 0.15});
  fadeEls.forEach(el=>observer.observe(el));

  // Scroll progress bar
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // Animated counters
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / 60; // ~1s animation
        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, {threshold: 0.5});
  counters.forEach(c=>counterObserver.observe(c));

  // Modal pop-ups for project details
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.modal-close');
  document.querySelectorAll('.view-details').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault();
      const modalId = btn.dataset.modal;
      document.getElementById(modalId).style.display = 'block';
    });
  });
  closeBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.closest('.modal').style.display = 'none';
    });
  });
  window.addEventListener('click', e=>{
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});
