// script.js
const FORM_SELECTOR = '#orderForm';
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzwtOCh0TwbrX73QXmfg3t6c4oCxLZogbEf6J7n5jLMi2bL3zYVGmIE6pxlBhwmFuHc/exec'; // Ganti dengan URL dari Apps Script deployment

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector(FORM_SELECTOR);
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Mengirim...';
    }

    const data = Object.fromEntries(new FormData(form).entries());
    data.timestamp = new Date().toISOString();

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const result = await res.json();
      if (result.status === 'success') {
        alert('Terima kasih! Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda via WhatsApp.');
        form.reset();
      } else {
        throw new Error('Response tidak valid');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengirim. Silakan coba lagi.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Kirim & Mulai Pembuatan';
      }
    }
  });
});
