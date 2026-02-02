const featuredList = document.getElementById('featured-list');
const API_URL = 'https://opensheet.elk.sh/1bJ-3R5M-enmK4LKZ042DHpYqI7WfmML66aBFG_qnmNs/FeaturedProducts';
const JSON_PHOTO_PATH = '../Images/InstaScrollable/instaScrollable.json';

/**
 * Gets all photos from the json file and calls loadPhotos to put them into a scrollable list
 */
async function loadInstaPhotos() {
    try {
        const response = await fetch(JSON_PHOTO_PATH);
        const data = await response.json();
        loadPhotos(data, 'insta-list'); // pass container ID
    } catch (error) {
        console.error('Error loading Instagram photos:', error);
    }
}

/**
 * Dynamically load photos into a container
 * @param {Array} data - Array of objects with { url, alt }
 * @param {string} containerId - The ID of the container to append cards
 */
async function loadPhotos(data, containerId) {
    const container = document.getElementById(containerId);
        if (!container || !data) return;
    // Clear container
    container.innerHTML = '';
    data.forEach(photo => {
        //card creation
        const card = document.createElement('div');
        card.classList.add('featured-card');

        //image creation
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.alt || 'Featured Photo';


        card.appendChild(img);
        container.appendChild(card);

    });
}

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
            link.appendChild(card);
            featuredList.appendChild(link);
            
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        featuredList.innerHTML = '<p>Failed to load products</p>';
    }
}
loadProducts();
loadInstaPhotos();