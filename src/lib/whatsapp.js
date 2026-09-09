// WhatsApp utility function to generate contact links
// Configure your WhatsApp number here
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94727578276'; // Format: country code + number without + or spaces

export function generateWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function generateBuyMessage(boatTitle, boatId, price) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `*PURCHASE INQUIRY*

Board: ${boatTitle}
Price: $${price}

${baseUrl}/boats/${boatId}

Please provide payment options and delivery details.`;
}

export function generateInquiryMessage(boatTitle, boatId, type, price) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const action = type === 'rent' ? 'rent' : 'buy';
  const priceText = type === 'rent' ? `$${price}/hour` : `$${price}`;

  return `Hello, I am interested in this board.\n\nBoard: ${boatTitle}\nRequest: ${action}\nPrice: ${priceText}\n\n${baseUrl}/boats/${boatId}\n\nPlease confirm availability and next steps.`;
}

export function generateRentMessage(boatTitle, boatId, rentalDate, hours, quantity) {
  const formattedDate = new Date(rentalDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `*RENTAL INQUIRY*

Board: ${boatTitle}
Date: ${formattedDate}
Duration: ${hours} hour${hours > 1 ? 's' : ''}
Quantity: ${quantity} board${quantity > 1 ? 's' : ''}

${baseUrl}/boats/${boatId}

Please confirm availability and provide total rental cost.`;
}
