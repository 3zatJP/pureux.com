// app-pending ページ専用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ページ内スクロール（アンカーリンク）
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#','');
            const target = document.getElementById(targetId) || document.querySelector(`[id='${targetId}']`);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 40,
                    behavior: 'smooth'
                });
            }
        });
    });

    // フィードバックリンクのクリック時にアニメーション
    const feedbackLink = document.querySelector('.feedback-link');
    if (feedbackLink) {
        feedbackLink.addEventListener('click', function() {
            feedbackLink.style.background = '#fffde7';
            setTimeout(() => {
                feedbackLink.style.background = '';
            }, 300);
        });
    }

    // reveal-on-scroll アニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // プログレスバーのアニメーション
    animateProgressBars();

    // タイムラインアイテムのアニメーション
    animateTimelineItems();

    // カードのホバーエフェクト
    setupCardHoverEffects();
});

// プログレスバーのアニメーション
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // 初期状態を0%に設定
                progressBar.style.width = '0%';
                
                // 少し遅延してからアニメーション開始
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.setProperty('--progress-width', width);
                }, 500);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// タイムラインアイテムのアニメーション
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.style.opacity = '0';
                item.style.transform = 'translateX(-50px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 200);
                
                timelineObserver.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

// カードのホバーエフェクト
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.status-card, .beta-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

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
        setTimeout(function() {
            loader.style.display = 'none';
        }, 600);
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
        
        // メニュー内リンククリックで自動的に閉じる
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', false);
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }
});

// ステータスバッジのアニメーション
function animateStatusBadges() {
    const badges = document.querySelectorAll('.status-badge');
    
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badge = entry.target;
                badge.style.opacity = '0';
                badge.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                }, 300);
                
                badgeObserver.unobserve(badge);
            }
        });
    }, { threshold: 0.5 });

    badges.forEach(badge => badgeObserver.observe(badge));
}

// ページ読み込み完了時にステータスバッジのアニメーションを開始
window.addEventListener('load', function() {
    animateStatusBadges();
});

// スムーズスクロールの設定
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // ヘッダーの高さを考慮
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScroll();
});
