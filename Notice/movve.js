// Notice ページ専用JavaScript

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

    // 通知アイコンの特別なアニメーション
    animateNotificationIcon();

    // reveal-on-scroll アニメーション
    setupRevealAnimations();

    // タイムラインアイテムのアニメーション
    animateTimelineItems();

    // カードのホバーエフェクト
    setupCardHoverEffects();

    // 重要な通知の強調表示
    highlightImportantNotification();
});

// 通知アイコンのアニメーション
function animateNotificationIcon() {
    const notificationIcon = document.querySelector('.notification-icon .icon');
    if (notificationIcon) {
        // 初期状態を設定
        notificationIcon.style.opacity = '0';
        notificationIcon.style.transform = 'scale(0.5) rotate(-180deg)';
        
        // ページ読み込み後にアニメーション開始
        setTimeout(() => {
            notificationIcon.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            notificationIcon.style.opacity = '1';
            notificationIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }
}

// reveal-on-scroll アニメーションの設定
function setupRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 特別なアニメーションを追加
                if (entry.target.classList.contains('notification-hero')) {
                    animateNotificationHero(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 通知ヒーローセクションの特別なアニメーション
function animateNotificationHero(heroElement) {
    const title = heroElement.querySelector('.notification-title');
    const badge = heroElement.querySelector('.notification-badge');
    const lead = heroElement.querySelector('.notification-lead');
    const date = heroElement.querySelector('.notification-date');
    
    // タイトルのアニメーション
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // バッジのアニメーション
    if (badge) {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 400);
    }
    
    // リード文のアニメーション
    if (lead) {
        lead.style.opacity = '0';
        lead.style.transform = 'translateY(20px)';
        setTimeout(() => {
            lead.style.transition = 'all 0.8s ease';
            lead.style.opacity = '1';
            lead.style.transform = 'translateY(0)';
        }, 600);
    }
    
    // 日付のアニメーション
    if (date) {
        date.style.opacity = '0';
        setTimeout(() => {
            date.style.transition = 'opacity 0.6s ease';
            date.style.opacity = '1';
        }, 800);
    }
}

// タイムラインアイテムのアニメーション
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const marker = item.querySelector('.timeline-marker');
                const content = item.querySelector('.timeline-content');
                
                // マーカーのアニメーション
                if (marker) {
                    marker.style.opacity = '0';
                    marker.style.transform = 'scale(0)';
                    setTimeout(() => {
                        marker.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        marker.style.opacity = '1';
                        marker.style.transform = 'scale(1)';
                    }, index * 200);
                }
                
                // コンテンツのアニメーション
                if (content) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateX(-30px)';
                    setTimeout(() => {
                        content.style.transition = 'all 0.8s ease';
                        content.style.opacity = '1';
                        content.style.transform = 'translateX(0)';
                    }, index * 200 + 300);
                }
                
                timelineObserver.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));
}

// カードのホバーエフェクト
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.detail-card, .alternative-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });
    });
}

// 重要な通知の強調表示
function highlightImportantNotification() {
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        // 定期的にパルスアニメーションを追加
        setInterval(() => {
            notificationBadge.style.animation = 'none';
            setTimeout(() => {
                notificationBadge.style.animation = 'pulse 1s ease-in-out';
            }, 10);
        }, 5000);
    }
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

// スムーズスクロールの設定
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// リンクのホバーエフェクト
function setupLinkHoverEffects() {
    const links = document.querySelectorAll('.download-link, .web-link, .contact-email, .contact-form');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ページ読み込み完了時の処理
window.addEventListener('load', function() {
    // 通知の重要度を視覚的に強調
    const notificationSection = document.querySelector('.notification-hero');
    if (notificationSection) {
        // 背景に微細なアニメーションを追加
        notificationSection.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24, #ff6b6b)';
        notificationSection.style.backgroundSize = '200% 200%';
        notificationSection.style.animation = 'gradientShift 3s ease-in-out infinite';
    }
});

// グラデーションシフトアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScroll();
    setupLinkHoverEffects();
});

// ページの可視性が変更された時の処理
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // ページが再び表示された時にアニメーションを再開
        const notificationIcon = document.querySelector('.notification-icon .icon');
        if (notificationIcon) {
            notificationIcon.style.animation = 'pulse 2s infinite';
        }
    }
});
