import { NextResponse } from 'next/server';
import { serviceLocations } from '@/lib/locations';

export const runtime = 'edge'; // Use Edge for faster response times

type RequestBody = {
  city?: string;
  postalCode?: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { city } = body;

    if (!city) {
      return NextResponse.json({ 
        inServiceArea: false, 
        message: 'City is required' 
      }, { status: 400 });
    }
    
    // Normalize city name: lowercase, trim spaces
    const normalizedCity = city.toLowerCase().trim();
    
    // Check if the city is in our service locations
    const matchedLocation = serviceLocations.find(location => 
      location.name.toLowerCase() === normalizedCity ||
      location.slug === normalizedCity
    );
    
    if (matchedLocation) {
      return NextResponse.json({ 
        inServiceArea: true, 
        location: matchedLocation,
        message: `Great news! We service ${matchedLocation.name}.`
      });
    }
    
    return NextResponse.json({ 
      inServiceArea: false, 
      message: `Sorry, we don't currently service ${city}. Please contact us to check if we can make an exception.`
    });
  } catch (error) {
    console.error('Service area check error:', error);
    return NextResponse.json({ 
      inServiceArea: false, 
      message: 'Error checking service area'
    }, { status: 500 });
  }
}
