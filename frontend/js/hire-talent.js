/* ============================================
   SATVIK PRODUCTION — Talent Filtering
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initTalentFilters();
});

function initTalentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const talentCards = document.querySelectorAll('.talent-card');

    if (!filterButtons.length || !talentCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            talentCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                    // Force a re-flow for animation
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = '';
                    card.classList.add('reveal', 'revealed');
                    card.style.display = 'block'; // Ensure block display
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('reveal', 'revealed');
                    card.style.display = 'none'; // Ensure none display
                }
            });
        });
    });
}
