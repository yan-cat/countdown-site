document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const detail = document.querySelector('.detail');
    if (!hero || !detail) return;

    let isAnimating = false;
    const duration = 500; // 滑动耗时（毫秒）。觉得快了就改成 1000 或 1200

    // 自定义缓动滚动函数（带减速效果）
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let start;

        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const time = timestamp - start;
            let percent = Math.min(time / duration, 1);

            // easeInOutQuad：先加速后减速，这就是阻尼感的来源
            percent = percent < 0.5 ? 2 * percent * percent : 1 - Math.pow(-2 * percent + 2, 2) / 2;

            window.scrollTo(0, startY + diff * percent);

            if (time < duration) {
                window.requestAnimationFrame(step);
            } else {
                isAnimating = false; // 动画结束，解锁
            }
        });
    }

    window.addEventListener('wheel', (e) => {
        // 如果正在滑动，直接拦截所有滚轮，防止乱滚
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        // 当前滚动位置
        const scrollTop = window.scrollY;
        // 判断是否还在第一屏（留 50px 容差）
        const isInHero = scrollTop < hero.offsetHeight - 50;
        // 判断是否在第二屏顶部（准备往上滑回第一屏）
        const isAtDetailTop = scrollTop >= hero.offsetHeight - 50 && scrollTop < detail.offsetTop + 50;

        if (e.deltaY > 0 && isInHero) {
            // 向下滚，且在第一屏：强行滑到第二屏
            e.preventDefault();
            isAnimating = true;
            smoothScrollTo(detail.offsetTop, duration);
        } else if (e.deltaY < 0 && isAtDetailTop) {
            // 向上滚，且在第二屏顶部：平滑滑回第一屏
            e.preventDefault();
            isAnimating = true;
            smoothScrollTo(0, duration);
        }
    }, { passive: false });
});
