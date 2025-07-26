
// サブメニューのアニメーション表示
document.addEventListener('DOMContentLoaded', function() {
    const submenuParent = document.querySelector('.has-submenu');
    const submenu = document.querySelector('.submenu');
    if (!submenuParent || !submenu) return;

    // 初期状態
    submenu.style.display = 'none';
    submenu.style.opacity = 0;
    submenu.style.transform = 'translateY(-10px)';
    submenu.style.transition = 'opacity 0.3s, transform 0.3s';

    // マウスが乗ったとき
    submenuParent.addEventListener('mouseenter', function() {
        submenu.style.display = 'block';
        setTimeout(function() {
            submenu.style.opacity = 1;
            submenu.style.transform = 'translateY(0)';
        }, 10);
    });

    // マウスが離れたとき
    submenuParent.addEventListener('mouseleave', function() {
        submenu.style.opacity = 0;
        submenu.style.transform = 'translateY(-10px)';
        setTimeout(function() {
            submenu.style.display = 'none';
        }, 300);
    });
});
