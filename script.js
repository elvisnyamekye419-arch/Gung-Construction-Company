// Shrink navbar slightly after scrolling
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  toTop.classList.toggle('show', window.scrollY > 500); // back-to-top appears after 500px
};
window.addEventListener('scroll', onScroll); onScroll();

// Close mobile menu after choosing a link
document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => {
  const m = document.getElementById('menu');
  if (m.classList.contains('show')) bootstrap.Collapse.getInstance(m)?.hide();
}));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: sends the message to the company's WhatsApp number
// Number in international format, no + or spaces (Ghana 0243503620 -> 233243503620)
const WHATSAPP_NUMBER = '233243503620';

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const note = document.getElementById('formNote');
  if (!v('name') || !v('phone') || !v('message')) {
    note.textContent = 'Please fill in your name, phone number and project details.';
    return;
  }
  const text = `Hello Gung Construction, I would like to make an enquiry.\n\n*Name:* ${v('name')}\n*Phone:* ${v('phone')}\n*Service:* ${v('service')}\n*Project details:* ${v('message')}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  // Open WhatsApp with the message ready to send; fall back to the same tab if a pop-up is blocked
  const win = window.open(url, '_blank', 'noopener');
  if (!win) window.location.href = url;
  note.textContent = 'Opening WhatsApp. Tap send to deliver your message.';
  e.target.reset();
});

// Respect visitors who prefer reduced motion: pause the hero video
const heroVideo = document.querySelector('.hero video');
if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) heroVideo.pause();