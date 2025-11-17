// script.js - PeakWebDev Cleaned & Optimized Version
const FORM_SELECTOR = '#orderForm';
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbyvxMqAbqoKnf6Ai5tWAtFfpA-rFW_navh3FLgl_e8ee5iuEOJyeZeUmayRO3gu1YDWcg/exec';

// === INIT ON PAGE LOAD ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 PeakWebDev initialized');
  initMobileMenu();
  initSmoothScroll();
  initNavbarShadow();
  initFAQ();
  initFormHandler();
  initAutoSelectPackage();
  initAOS();
});

// === Navbar scroll effect ===
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// --- Navbar ---
function initMobileMenu() {
  const btn = document.getElementById('navToggle'); // sesuai HTML
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    btn.classList.toggle('open'); // optional for hamburger animation
  });

  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.classList.remove('open');
    })
  );
}

// --- Smooth Scroll (Logo + Anchor Links) ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll ke hero section jika klik logo
  const logoLink = document.querySelector('.nav-logo');
  const heroSection = document.querySelector('#hero');
  if (logoLink && heroSection) {
    logoLink.addEventListener('click', e => {
      e.preventDefault();
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

function initNavbarShadow() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// --- FAQ ---
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      item.classList.toggle('active');
    });
  });
}

// === Initialize AOS Animations ===
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: false,
      duration: 1000,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }
}

// --- FORM HANDLER ---
function initFormHandler() {
  const form = document.querySelector(FORM_SELECTOR);
  const successMessage = document.getElementById('successMessage');
  if (!form) return console.error('Form tidak ditemukan.');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.businessName || !data.whatsapp || !data.email || !data.package) {
      showToast('Harap isi semua field wajib.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim & Mulai Pembuatan';
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(data).forEach(key => formDataToSend.append(key, data[key]));

      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: formDataToSend
      });


      if (!res.ok) throw new Error(`Status: ${res.status}`);

      const result = await res.json();
      if (result.status === 'success') {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        showToast('Data berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');

        const waMsg = `
Halo PeakWebDev! Saya ingin order website:
- Nama Bisnis: ${data.businessName}
- Jenis Website: ${data.websiteType}
- Paket: ${data.package}
- WhatsApp: ${data.whatsapp}
- Email: ${data.email}`;
        window.open(`https://wa.me/6283153113448?text=${encodeURIComponent(waMsg)}`, '_blank');
      } else throw new Error(result.message || 'Gagal menyimpan data');
    } catch (err) {
      console.error('Error submit:', err);
      showToast('Server tidak merespons, data dikirim via WhatsApp.', 'warning');
      const waMsg = `
Halo PeakWebDev! Saya ingin order website:
- Nama Bisnis: ${data.businessName}
- Jenis Website: ${data.websiteType}
- Paket: ${data.package}
- WhatsApp: ${data.whatsapp}
- Email: ${data.email}`;
      window.open(`https://wa.me/6283153113448?text=${encodeURIComponent(waMsg)}`, '_blank');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim & Mulai Pembuatan';
    }
  });
}

function initAutoSelectPackage() {
  const buttons = document.querySelectorAll(".choose-package");
  const packageInput = document.querySelector("#package");

  if (!buttons.length || !packageInput) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.getAttribute("data-package");
      packageInput.value = selected;
    });
  });
}

// --- TOAST NOTIFICATION ---
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Minimal CSS for toast
const style = document.createElement('style');
style.textContent = `
.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #1E3A8A;
  color: #fff;
  padding: 14px 22px;
  border-radius: 8px;
  opacity: 0;
  font-weight: 500;
  transition: all .3s ease;
  z-index: 9999;
}
.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
.toast.success { background: #16a34a; }
.toast.error { background: #dc2626; }
.toast.warning { background: #f59e0b; }
`;
document.head.appendChild(style);

// === Portfolio Carousel Auto Scroll ===
const track = document.querySelector('.portfolio-track');
if (track) {
  let offset = 0;
  let autoScroll;

  const scrollCarousel = () => {
    offset -= 1.2;
    if (Math.abs(offset) > track.scrollWidth / 2) offset = 0;
    track.style.transform = `translateX(${offset}px)`;
  };

  const startCarousel = () => {
    if (!autoScroll) autoScroll = setInterval(scrollCarousel, 50);
  };
  const stopCarousel = () => {
    clearInterval(autoScroll);
    autoScroll = null;
  };

  track.addEventListener('mouseenter', stopCarousel);
  track.addEventListener('mouseleave', startCarousel);
  startCarousel();
}

// === Modal Demo Preview ===
const modal = document.getElementById('demoModal');
const modalImg = document.getElementById('demoImage');
const modalTitle = document.getElementById('demoTitle');
const closeModal = document.getElementById('closeDemoModal');

document.querySelectorAll('.portfolio-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const imgSrc = link.getAttribute('data-image');
    const title = link.getAttribute('data-title');
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

[closeModal, modal].forEach(el =>
  el.addEventListener('click', e => {
    if (e.target === closeModal || e.target.classList.contains('demo-overlay')) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  })
)