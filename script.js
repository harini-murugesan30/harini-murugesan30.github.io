// script.js
// Small interactive bits: email obfuscation, current year, smooth scroll
document.addEventListener('DOMContentLoaded', function () {
  // 1) Set year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2) Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block: 'start'});
    });
  });

  // 3) Email obfuscation - modify parts below to your real email username & domain
  // For privacy, we store parts and assemble only on user action (helps reduce scraping).
  const user = 'harini.mk30'; // <-- replace username (no @)
  const domain = 'gmail.com';    // <-- replace domain
  const revealBtn = document.getElementById('reveal-email');
  const emailMask = document.getElementById('email-mask');

  function showEmailAndCopy() {
    const email = user + '@' + domain;
    // Update UI
    emailMask.textContent = email;
    // copy to clipboard
    navigator.clipboard && navigator.clipboard.writeText(email).then(()=> {
      revealBtn.textContent = 'Copied ✓';
      setTimeout(()=> revealBtn.textContent = 'Reveal & copy', 1800);
    }).catch(()=> {
      revealBtn.textContent = 'Reveal';
    });
    // open mail client
    window.location.href = 'mailto:' + email;
  }

  if (revealBtn) {
    revealBtn.addEventListener('click', showEmailAndCopy);
  }

  // accessibility: allow Enter key on reveal button
  if (revealBtn) {
    revealBtn.addEventListener('keydown', function(e){ if(e.key === 'Enter') showEmailAndCopy(); });
  }
});
