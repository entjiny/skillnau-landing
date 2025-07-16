// 모바일 메뉴 열기/닫기
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');

function openMenu() {
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
  document.body.classList.add('menu-open');
}
function closeMenu() {
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

// 네비게이션 스크롤 이동 (헤더 높이 보정)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const header = document.querySelector('.header');
      const offset = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu();
    }
  });
}); 