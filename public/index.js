const formDiv = document.querySelector('.contact-form-div');
const button = document.querySelector('.button-contact-me');
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

button.addEventListener('click', hideShow, false);
form.addEventListener('submit', hideShow, true);

function hideShow() {
  formDiv.style.display = 'block';
  this.style.display = 'none';
}

const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarNav')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false})
navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() });
});

const formEvent = form.addEventListener("submit", (e) => {
  e.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });

  form.reset();
};
