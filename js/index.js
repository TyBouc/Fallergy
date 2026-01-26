const featuredList = document.getElementById('featured-list');
const API_URL = 'https://opensheet.elk.sh/1bJ-3R5M-enmK4LKZ042DHpYqI7WfmML66aBFG_qnmNs/FeaturedProducts';

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        //Clear loading state
        featuredList.innerHTML = '';

        // Loop through dta and create HTML

        data.forEach(product => {
            // Link Creation
            const link = document.createElement('a');
            link.href = product.link || '#';  // Use product.link from your sheet
            link.target = '_blank';           // opens in new tab
            link.classList.add('featured-link');
            link.style.textDecoration = 'none';
            link.style.color = 'inherit';

            // Card Creation
            const card = document.createElement('div');
            card.classList.add('featured-card');

            // We match the keys EXACTLY to JSON: company, name, price, image
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="card-content" style="padding: 10px;">
                    <p style="color: #C8742D; font-size: 0.8rem; margin: 0;">${product.company}</p>
                    <h3 style="margin: 5px 0; font-size: 1.1rem;">${product.name}</h3>
                    <p style="font-weight: bold; margin: 0;">$${product.price}</p>
                </div>
            `;
            featuredList.appendChild(link);
            link.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Failed to load products</p>';
    }
}
loadProducts();