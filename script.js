document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        body.style.overflow = isActive ? 'hidden' : '';

        // Update Icon
        const icon = menuToggle.querySelector('i');
        if (isActive) {
            menuToggle.innerHTML = '<i data-lucide="x" size="28"></i>';
        } else {
            menuToggle.innerHTML = '<i data-lucide="menu" size="28"></i>';
        }
        lucide.createIcons();
    });

    // Smooth scroll with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                
                // 关闭移动端菜单
                navLinks.classList.remove('active');
                body.style.overflow = '';
                menuToggle.innerHTML = '<i data-lucide="menu" size="28"></i>';
                lucide.createIcons();
                
                // 计算目标位置，考虑固定导航栏高度
                const navHeight = nav.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal implementation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .time-item, .price-card, .sec-header, .content-category, .team-card, .kpi-card');

    animateElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
        // Staggered delay for grid items
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        revealOnScroll.observe(el);
    });
});

// Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function copyEmail() {
    const email = '340058663@qq.com';
    const contactItems = document.querySelectorAll('.contact-item');
    const emailAddress = contactItems[1].querySelector('.email-address');
    const originalText = emailAddress.textContent;

    navigator.clipboard.writeText(email).then(() => {
        emailAddress.textContent = '已复制！';
        emailAddress.style.color = '#10b981';

        setTimeout(() => {
            emailAddress.textContent = originalText;
            emailAddress.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        emailAddress.textContent = '已复制！';
        emailAddress.style.color = '#10b981';

        setTimeout(() => {
            emailAddress.textContent = originalText;
            emailAddress.style.color = '';
        }, 2000);
    });
}

function copyWechatId() {
    const wechatId = 'acfunc';
    navigator.clipboard.writeText(wechatId).then(() => {
        // 显示复制成功提示
        const contactSub = document.querySelector('.contact-sub');
        const originalHTML = contactSub.innerHTML;
        contactSub.innerHTML = '微信号: acfunc <span style="color: #10b981;">✓ 已复制！</span>';
        contactSub.style.color = '#10b981';

        setTimeout(() => {
            contactSub.innerHTML = originalHTML;
            contactSub.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = wechatId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const contactSub = document.querySelector('.contact-sub');
        const originalHTML = contactSub.innerHTML;
        contactSub.innerHTML = '微信号: acfunc <span style="color: #10b981;">✓ 已复制！</span>';
        contactSub.style.color = '#10b981';

        setTimeout(() => {
            contactSub.innerHTML = originalHTML;
            contactSub.style.color = '';
        }, 2000);
    });
}
