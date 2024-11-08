import { NextRequest, NextResponse } from 'next/server';
import { SearchPlaceIndexForPositionCommand, SearchPlaceIndexForPositionResponse } from '@aws-sdk/client-location';

import { APIResponse } from '@/types';
import locationClient from '@/services/location';

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<SearchPlaceIndexForPositionResponse>>> {
    try {
        const lat = request.nextUrl.searchParams.get('lat') as string;
        const lng = request.nextUrl.searchParams.get('lng') as string;
        const response = await locationClient.send(
            new SearchPlaceIndexForPositionCommand({
                IndexName: 'PlaceIndexEsri',
                Position: [parseFloat(lng), parseFloat(lat)],
                MaxResults: 1
            })
        );
    
        const data = response;

        if (!data) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 });
    }
}
