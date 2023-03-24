# E-Commerce Backend

Authentication API endpoint:

POST /api/auth/login
POST /api/auth/register
POST /api/auth/forgot_password
POST /api/auth/reset_password

User Profile API endpoint:

GET /api/user/profile
PUT /api/user/profile

Product Catalog API endpoint:

GET /api/products
GET /api/products/{productId}

Cart API endpoint:

GET /api/cart
POST /api/cart/add
PUT /api/cart/update
DELETE /api/cart/remove/{productId}

Checkout API endpoint:

POST /api/checkout
Order API endpoint:

GET /api/orders
GET /api/orders/{orderId}

Search API endpoint:

GET /api/search

Review API endpoint:

POST /api/reviews

Payment API endpoint:

POST /api/payments

Admin API endpoint:

GET /api/admin/products
POST /api/admin/products
PUT /api/admin/products/{productId}
DELETE /api/admin/products/{productId}
GET /api/admin/orders
PUT /api/admin/orders/{orderId}
