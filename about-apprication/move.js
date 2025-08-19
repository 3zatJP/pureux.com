// ページ内スクロール（アンカーリンク）
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').replace('#','');
      const target = document.getElementById(targetId) || document.querySelector(`[id='${targetId}']`);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
      }
    });
  });

  // フィードバックリンクのクリック時にアニメーション
  const feedbackLink = document.querySelector('.feedback-link');
  if (feedbackLink) {
    feedbackLink.addEventListener('click', function() {
      feedbackLink.style.background = '#fffde7';
      setTimeout(() => { feedbackLink.style.background = ''; }, 300);
    });
  }

  // reveal-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// ローディングアニメーション
window.addEventListener('DOMContentLoaded', function() {
  var loader = document.getElementById('loader');
  if (loader) {
    loader.innerHTML = '<div class="spinner"></div>';
  }
});
window.addEventListener('load', function() {
  var loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hide');
    setTimeout(function() { loader.style.display = 'none'; }, 600);
  }
});

// ハンバーガーメニュー開閉
window.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', false);
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }
});
