# 📡 SurfWave API Reference

Complete API documentation for the SurfWave platform.

## 🔐 Authentication APIs

### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "message": "Login successful",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Sets: auth_token cookie (HTTP-only)
```

### Get Current User

```
GET /api/auth/me
Cookie: auth_token=...

Response (200):
{
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Logout

```
POST /api/auth/logout
Cookie: auth_token=...

Response (200):
{
  "message": "Logout successful"
}

Clears: auth_token cookie
```

## 🚤 Boat APIs

### Get All Boats (with Filters)

```
GET /api/boats?search=&minPrice=&maxPrice=&category=&type=&page=1&limit=12

Query Parameters:
- search (string): Search boat title (case-insensitive)
- minPrice (number): Minimum price filter
- maxPrice (number): Maximum price filter
- category (string): Filter by category
  Options: "Luxury", "Fishing", "Speed Boat", "Family", "Adventure"
- type (string): Filter by type
  Options: "rent", "sale"
- page (number): Page number (default: 1)
- limit (number): Items per page (default: 12)

Response (200):
{
  "boats": [
    {
      "_id": "boatId",
      "title": "Luxury Sunset Cruiser",
      "description": "...",
      "category": "Luxury",
      "type": "rent",
      "pricePerHour": 75,
      "price": null,
      "finalPrice": 63.75,
      "discountPercentage": 15,
      "images": ["url1", "url2"],
      "location": "Pottuvil Arugambe Beach",
      "available": true,
      "createdAt": "2024-05-05T..."
    }
  ],
  "total": 50,
  "page": 1,
  "pages": 5
}
```

### Get Boat Details

```
GET /api/boats/[id]

Response (200):
{
  "boat": {
    "_id": "boatId",
    "title": "Luxury Sunset Cruiser",
    "description": "...",
    "category": "Luxury",
    "type": "rent",
    "pricePerHour": 75,
    "finalPrice": 63.75,
    "discountPercentage": 15,
    "discountStartDate": "2024-05-01",
    "discountEndDate": "2024-06-05",
    "images": ["url1", "url2"],
    "location": "Pottuvil Arugambe Beach",
    "available": true,
    "createdBy": {...},
    "createdAt": "2024-05-05T..."
  }
}

Response (404):
{
  "error": "Boat not found"
}
```

### Create Boat (Admin Only)

```
POST /api/boats
Authorization: Required (Admin role)
Content-Type: application/json

{
  "title": "Luxury Sunset Cruiser",
  "description": "Premium boat with full amenities",
  "category": "Luxury",
  "type": "rent",
  "pricePerHour": 75,
  "images": ["url1", "url2"],
  "location": "Pottuvil Arugambe Beach"
}

Response (201):
{
  "message": "Boat created successfully",
  "boat": { ...boat object }
}

Response (401):
{
  "error": "Not authorized"
}
```

### Update Boat (Admin Only)

```
PUT /api/boats/[id]
Authorization: Required (Admin role)
Content-Type: application/json

{
  "title": "Updated Title",
  "discountPercentage": 20,
  "discountStartDate": "2024-05-01",
  "discountEndDate": "2024-06-01"
}

Response (200):
{
  "message": "Boat updated successfully",
  "boat": { ...updated boat }
}
```

### Delete Boat (Admin Only)

```
DELETE /api/boats/[id]
Authorization: Required (Admin role)

Response (200):
{
  "message": "Boat deleted successfully"
}
```

### Bulk Update Boats (Admin Only)

```
POST /api/boats/bulk-update
Authorization: Required (Admin role)
Content-Type: application/json

{
  "ids": ["boatId1", "boatId2", "boatId3"],
  "updateData": {
    "discountPercentage": 15,
    "category": "Luxury",
    "available": true
  }
}

Response (200):
{
  "message": "Updated 3 boats successfully",
  "modifiedCount": 3
}

Example: Apply 15% discount to multiple boats
```

## 📅 Booking APIs

### Get User's Bookings

```
GET /api/bookings?page=1&limit=10
Authorization: Required
Cookie: auth_token=...

Response (200):
{
  "bookings": [
    {
      "_id": "bookingId",
      "userId": {
        "_id": "userId",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "boatId": {
        "_id": "boatId",
        "title": "Luxury Sunset Cruiser",
        "images": ["url1"],
        "type": "rent",
        "pricePerHour": 75,
        "price": null
      },
      "date": "2024-05-15",
      "time": "10:00",
      "duration": 3,
      "totalPrice": 225,
      "status": "pending",
      "createdAt": "2024-05-05T..."
    }
  ],
  "total": 5,
  "page": 1,
  "pages": 1
}

Note: Admin sees all bookings, users see only their own
```

### Get Booking Details

```
GET /api/bookings/[id]
Authorization: Required
Cookie: auth_token=...

Response (200):
{
  "booking": { ...booking object }
}

Response (401):
{
  "error": "Not authorized"
}
```

### Create Booking

```
POST /api/bookings
Authorization: Required
Content-Type: application/json

{
  "boatId": "boatId",
  "date": "2024-05-15",
  "time": "10:00",
  "duration": 3
}

Rules:
- Boat must exist
- Boat type must be "rent"
- Duration must be >= 1 hour
- Auto-calculates totalPrice with discount if applicable

Response (201):
{
  "message": "Booking created successfully",
  "booking": {
    "_id": "bookingId",
    "userId": "userId",
    "boatId": "boatId",
    "date": "2024-05-15",
    "time": "10:00",
    "duration": 3,
    "totalPrice": 225,
    "status": "pending",
    "createdAt": "2024-05-05T..."
  }
}

Response (400):
{
  "error": "This boat is for sale, not rent"
}
```

### Update Booking (Cancel/Confirm)

```
PUT /api/bookings/[id]
Authorization: Required
Content-Type: application/json

{
  "status": "confirmed"  // or "cancelled"
}

Rules:
- Users can only update their own bookings
- Only admin can change status
- Users can update other fields

Response (200):
{
  "message": "Booking updated successfully",
  "booking": { ...updated booking }
}
```

## 📬 Contact API

### Submit Contact Form

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "subject": "Boat Inquiry",
  "message": "I'm interested in renting a boat"
}

Response (201):
{
  "message": "Contact message sent successfully. We will get back to you soon!",
  "contact": {
    "_id": "contactId",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789",
    "subject": "Boat Inquiry",
    "message": "I'm interested in renting a boat",
    "createdAt": "2024-05-05T..."
  }
}
```

## 🔑 Authentication

### Cookie-Based JWT

- Token stored in HTTP-only cookie `auth_token`
- Expires in 7 days
- Automatically included in requests
- Secure in production

### Usage in Frontend

```javascript
// Auth is handled automatically via cookies
// Just make requests normally
const response = await fetch("/api/auth/me");
if (response.ok) {
  const user = await response.json();
}
```

## 📊 Error Responses

### 400 Bad Request

```json
{
  "error": "Please provide all required fields"
}
```

### 401 Unauthorized

```json
{
  "error": "Not authenticated"
}
```

### 403 Forbidden

```json
{
  "error": "Not authorized"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Operation failed"
}
```

## 🎯 Common Workflows

### Register and Book a Boat

```
1. POST /api/auth/register
   ↓ Creates user account
2. POST /api/auth/login
   ↓ Sets auth cookie
3. GET /api/boats
   ↓ Browse boats
4. GET /api/boats/[id]
   ↓ View details
5. POST /api/bookings
   ↓ Creates booking
6. GET /api/bookings
   ↓ View bookings
```

### Admin Manages Boats

```
1. POST /api/auth/login (with admin account)
   ↓ Sets auth cookie
2. POST /api/boats
   ↓ Creates new boat
3. PUT /api/boats/[id]
   ↓ Updates boat
4. POST /api/boats/bulk-update
   ↓ Applies discount to multiple boats
5. DELETE /api/boats/[id]
   ↓ Removes boat
```

### Admin Manages Bookings

```
1. GET /api/bookings
   ↓ View all bookings
2. GET /api/bookings/[id]
   ↓ View booking details
3. PUT /api/bookings/[id]
   ↓ Update booking status
```

## 💡 Tips

- **Pagination**: Always use pagination for large datasets
- **Filtering**: Combine multiple filters for precise results
- **Discounts**: Automatically calculated based on dates
- **Images**: Multiple images per boat supported
- **Timestamps**: All in ISO format (UTC)
- **Errors**: Always check response status and error field

## 🔒 Security

- JWT authentication on all protected routes
- Password hashing with bcryptjs
- HTTP-only cookies for tokens
- Admin role verification
- Input validation on all endpoints

---

For setup help: See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
For quick start: See [QUICKSTART.md](./QUICKSTART.md)
