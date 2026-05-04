/* ============================================
   SATVIK PRODUCTION — Contact Form Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simple validation feedback logic (demo purposes)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Real network request to the backend
        fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    submitBtn.innerHTML = 'Message Sent! ✅';
                    submitBtn.style.background = '#34D399'; // Emerald
                    contactForm.reset();
                } else {
                    submitBtn.innerHTML = 'Failed ❌';
                    submitBtn.style.background = '#E8634F'; // Red
                }

                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .catch(err => {
                console.error('Error:', err);
                submitBtn.innerHTML = 'Error ❌';
                submitBtn.style.background = '#E8634F'; // Red

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
}
