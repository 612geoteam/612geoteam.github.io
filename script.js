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
        link.addEventListener('click', function (e) {
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

// Consultation Modal Functions
var CONSULT_API_URL = 'https://godance.cloverphp.top/wp-json/geo612/v1/consultation';

function openConsultModal(planName) {
    var modal = document.getElementById('consultModal');
    document.getElementById('consultPlan').value = planName;
    document.getElementById('consultPlanName').textContent = '咨询方案：' + planName;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeConsultModal(event) {
    if (event && event.target !== event.currentTarget) return;
    var modal = document.getElementById('consultModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('consultForm').reset();
    var btn = document.getElementById('consultSubmitBtn');
    btn.textContent = '提交咨询';
    btn.disabled = false;
}

function submitConsultForm(event) {
    event.preventDefault();
    var btn = document.getElementById('consultSubmitBtn');
    btn.textContent = '提交中...';
    btn.disabled = true;

    var data = {
        plan: document.getElementById('consultPlan').value,
        name: document.getElementById('consultName').value.trim(),
        wechat: document.getElementById('consultWechat').value.trim(),
        phone: document.getElementById('consultPhone').value.trim(),
        message: document.getElementById('consultMessage').value.trim()
    };

    fetch(CONSULT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(function (res) {
            if (!res.ok) throw new Error('提交失败');
            return res.json();
        })
        .then(function () {
            btn.textContent = '提交成功';
            btn.style.background = '#10b981';
            setTimeout(function () {
                closeConsultModal();
                btn.style.background = '';
            }, 1500);
        })
        .catch(function () {
            btn.textContent = '提交失败，请重试';
            btn.style.background = '#ef4444';
            setTimeout(function () {
                btn.textContent = '提交咨询';
                btn.style.background = '';
                btn.disabled = false;
            }, 2000);
        });
}

function copyWechatId() {
    const wechatId = '340058663';
    navigator.clipboard.writeText(wechatId).then(() => {
        // 显示复制成功提示
        const contactSub = document.querySelector('.contact-sub');
        const originalHTML = contactSub.innerHTML;
        contactSub.innerHTML = '微信号: 340058663 <span style="color: #10b981;">✓ 已复制！</span>';
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
        contactSub.innerHTML = '微信号: 340058663 <span style="color: #10b981;">✓ 已复制！</span>';
        contactSub.style.color = '#10b981';

        setTimeout(() => {
            contactSub.innerHTML = originalHTML;
            contactSub.style.color = '';
        }, 2000);
    });
}
