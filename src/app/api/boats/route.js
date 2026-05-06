import { connectDB } from '@/lib/db';
import { Boat } from '@/models/Boat';
import { requireAuth, requireAdmin, handleResponse, handleError } from '@/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const category = url.searchParams.get('category');
    const type = url.searchParams.get('type');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '12');

    // Build query
    let query = { available: true };

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    // Price filtering logic
    if (type === 'rent' || !type) {
      if (minPrice || maxPrice) {
        query.pricePerHour = {};
        if (minPrice) query.pricePerHour.$gte = parseFloat(minPrice);
        if (maxPrice) query.pricePerHour.$lte = parseFloat(maxPrice);
      }
    }

    if (type === 'sale' || !type) {
      if (minPrice || maxPrice) {
        if (query.price) {
          // Handle mixed type query
          query.$or = [
            { type: 'sale', price: { $gte: minPrice ? parseFloat(minPrice) : 0, $lte: maxPrice ? parseFloat(maxPrice) : Infinity } },
            { type: 'rent', pricePerHour: { $gte: minPrice ? parseFloat(minPrice) : 0, $lte: maxPrice ? parseFloat(maxPrice) : Infinity } },
          ];
          delete query.pricePerHour;
          delete query.price;
        } else if (query.type !== 'rent') {
          query.price = {};
          if (minPrice) query.price.$gte = parseFloat(minPrice);
          if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
      }
    }

    const skip = (page - 1) * limit;

    const boats = await Boat.find(query)
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Boat.countDocuments(query);

    // Add final price to each boat
    const boatsWithPrice = boats.map((boat) => ({
      ...boat.toObject(),
      finalPrice: calculateFinalPrice(boat),
    }));

    return handleResponse({
      boats: boatsWithPrice,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get boats error:', error);
    return handleError('Failed to fetch boats', 500);
  }
}

export async function POST(request) {
  try {
    const user = await requireAdmin(request);
    if (!user) {
      return handleError('Not authorized', 401);
    }

    await connectDB();

    const data = await request.json();
    const { title, description, category, type, pricePerHour, price, images, location, capacity } = data;

    // Validation
    if (!title || !description || !category || !type || !location || !capacity) {
      return handleError('Please provide all required fields', 400);
    }

    if (type === 'rent' && !pricePerHour) {
      return handleError('Please provide pricePerHour for rent boats', 400);
    }

    if (type === 'sale' && !price) {
      return handleError('Please provide price for sale boats', 400);
    }

    const boat = await Boat.create({
      title,
      description,
      category,
      type,
      pricePerHour: type === 'rent' ? pricePerHour : null,
      price: type === 'sale' ? price : null,
      images: images || [],
      location,
      capacity,
      createdBy: user._id,
    });

    return handleResponse(
      {
        message: 'Boat created successfully',
        boat: { ...boat.toObject(), finalPrice: calculateFinalPrice(boat) },
      },
      201
    );
  } catch (error) {
    console.error('Create boat error:', error);
    return handleError('Failed to create boat', 500);
  }
}

function calculateFinalPrice(boat) {
  const basePrice = boat.type === 'rent' ? boat.pricePerHour : boat.price;
  if (!basePrice) return basePrice;

  const now = new Date();
  const isDiscountValid =
    boat.discountPercentage > 0 &&
    boat.discountStartDate &&
    boat.discountEndDate &&
    now >= boat.discountStartDate &&
    now <= boat.discountEndDate;

  if (isDiscountValid) {
    return basePrice - (basePrice * boat.discountPercentage) / 100;
  }

  return basePrice;
}
