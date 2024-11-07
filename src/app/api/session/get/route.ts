import { APIResponse, SessionItem } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { GetCommand } from '@aws-sdk/lib-dynamodb';

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<SessionItem>>> {
    try {
        const key = request.nextUrl.searchParams.get('key');
        const response = await dynamodb.send(
            new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    PK: "SESSION",
                    SK: key
                }
            })
        );
    
        const data = response.Item as SessionItem;

        if (!data) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 });
    }
}
