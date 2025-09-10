// v2.js 또는 main.js 어딘가에
document.querySelectorAll('.pf-card[href="#"]').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// /js/v2.js
(() => {
  function initReviewSlider(root) {
    const viewport = root.querySelector('.slider-viewport');
    const track    = root.querySelector('.slider-track');
    if (!viewport || !track) return;

    let isDown = false, startX = 0, startT = 0, current = 0;

    const bounds = () => {
      const vw = viewport.clientWidth;
      const tw = track.scrollWidth;
      const min = Math.min(vw - tw, 0); // 트랙이 더 길면 음수(왼쪽 끝), 짧으면 0
      return { min, max: 0 };
    };

    const setX = (x, withTransition = false) => {
      const { min, max } = bounds();
      current = Math.max(min, Math.min(max, x));
      track.style.transition = withTransition ? 'transform .25s ease' : 'none';
      track.style.transform  = `translate3d(${current}px,0,0)`;
    };

    const clientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const onDown = (e) => {
      isDown = true;
      startX = clientX(e);
      const t = getComputedStyle(track).transform;
      startT = (t && t !== 'none') ? parseFloat(t.split(',')[4]) : 0; // matrix tx
      viewport.classList.add('dragging');
      track.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = clientX(e);
      setX(startT + (x - startX));
      if (e.cancelable) e.preventDefault(); // 수평 드래그 중 페이지 스크롤 방지
    };

    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      viewport.classList.remove('dragging');
      track.style.cursor = 'grab';
      setX(current, true);
    };

    track.style.cursor = 'grab';
    track.addEventListener('mousedown', onDown);
    track.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    viewport.addEventListener('mouseleave', onUp);
    window.addEventListener('resize', () => setX(current, true));

    // 좌측 spacer가 있으므로 0이 초기 보기 포지션
    setX(0, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // ✅ 여기서 v2 가드
    const isV2 = document.body.classList.contains('v2');
    if (!isV2) {
      console.log('v2.js: body에 .v2가 없어 슬라이더 초기화를 건너뜀');
      return;
    }

    // v2 전용 CTA 트래킹
    document.querySelectorAll('.cta-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.gtag?.('event', 'lead_submit', { section: 'hero_v2' });
      });
    });

    // 리뷰 슬라이더 초기화
    document.querySelectorAll('.review-slider').forEach(initReviewSlider);

    console.log('v2.js loaded ✅');
  });
})();
