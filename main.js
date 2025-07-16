document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.parentElement;
      item.classList.toggle('active');
    });
  });
  
  // 햄버거 메뉴 열기
  document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.mobile-menu-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // X 버튼 클릭 시 닫기
  document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // 오버레이(배경) 클릭 시 닫기
  document.querySelector('.mobile-menu-backdrop').addEventListener('click', function() {
    document.querySelector('.mobile-menu-overlay').classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // 모바일 메뉴 내 anchor 클릭 시 이동+닫힘
  // (서비스소개, 진행방법, 고객사례)
  document.querySelectorAll('.mobile-menu nav a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (this.hash && document.querySelector(this.hash)) {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.mobile-menu-overlay').classList.remove('active');
        document.body.style.overflow = '';
      } else {
        // 외부 링크(새창 등)는 그냥 닫기만
        document.querySelector('.mobile-menu-overlay').classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // 헤더 로고 클릭 시 페이지 상단으로 부드럽게 이동
  document.querySelector('.logo a')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
  });

  