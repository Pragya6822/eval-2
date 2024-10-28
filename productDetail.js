let Products = [];
let Reviews = [];

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        Products = data.Product;
        Reviews = data.Review;
 
        const product = Products.find(p => p.id == productId);
        if (product) {
            displayProductDetails(product);
        } else {
            document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        }
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <div class="images">
            ${renderImages(product.images)}
        </div>
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <div id="reviews-container"></div>
    `;
    displayReviews(product.id);
}

function displayReviews(productId) {
    const reviewsContainer = document.getElementById('reviews-container');
    const productReviews = Reviews.filter(review => review.productId == productId);

    if (productReviews.length === 0) {
        reviewsContainer.innerHTML = '<p>No reviews for this product.</p>';
    } else {
        let reviewsHTML = '<h3>Customer Reviews:</h3>';
        productReviews.forEach(review => {
            reviewsHTML += `
                <div class="review">
                    <p>Rating: ${review.rating}/5</p>
                    <p>${review.content}</p>
                </div>
            `;
        });
        reviewsContainer.innerHTML = reviewsHTML;
    }
}

function renderImages(images) {
    return images.map(image => `<img src="${image}" alt="Product Image" class="product-image" />`).join('');
}
