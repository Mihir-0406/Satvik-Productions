/* ============================================
   SATVIK PRODUCTION — Portfolio Filtering
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPortfolioFilters();
});

function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    // Force a re-flow for animation
                    item.style.animation = 'none';
                    item.offsetHeight; // trigger reflow
                    item.style.animation = '';
                    item.classList.add('reveal', 'revealed');
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('reveal', 'revealed');
                }
            });
        });
    });
}
