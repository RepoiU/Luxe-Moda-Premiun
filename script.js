document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    // Auth Tabs
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginTab && registerTab) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerTab.addEventListener('click', () => {
            registerTab.classList.add('active');
            loginTab.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    // Favorites Logic
    const favoriteBtns = document.querySelectorAll('.btn-favorite');

    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Initialize button states
    favoriteBtns.forEach(btn => {
        const card = btn.closest('.product-card');
        if (card) {
            const id = card.dataset.id;
            if (favorites.includes(id)) {
                const icon = btn.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--primary-gold)';
            }
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const id = card.dataset.id;
            const icon = btn.querySelector('i');

            if (favorites.includes(id)) {
                // Remove from favorites
                favorites = favorites.filter(favId => favId !== id);
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            } else {
                // Add to favorites
                favorites.push(id);
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--primary-gold)';
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    // Cart/Wishlist Remove Logic (Visual only for now)
    // Assuming we might add remove buttons in checkout/profile later
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const item = btn.closest('.summary-item') || btn.closest('.order-item');
            if (item) {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                    // Recalculate total if needed (future implementation)
                }, 300);
            }
        });
    });
});
