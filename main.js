// FAQ 아코디언
document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      item.classList.toggle('active');
    });
});

// 모바일 메뉴 내 anchor 클릭 시 이동+닫힘
document.querySelectorAll('.mobile-menu nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
      }
      closeMobileMenu();
    });
});

// 메뉴 열기
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.mobile-menu-overlay').classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  });
// 메뉴 닫기 (X 버튼)
document.querySelector('.close-menu').addEventListener('click', closeMobileMenu);
// 메뉴 닫기 (오버레이 클릭)
document.querySelector('.mobile-menu-backdrop').addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.classList.remove('menu-open');
    setTimeout(function() {
      document.body.style.overflow = '';
    }, 350);
  }

// 헤더 로고 클릭 시 페이지 상단으로 부드럽게 이동
document.querySelector('.logo a')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 강제 가로 스크롤 방지
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});