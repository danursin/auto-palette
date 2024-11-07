import { APIResponse, SessionItem } from '@/types';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { NextResponse } from 'next/server';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

export type CreateSessionRequest = Pick<SessionItem, "Description" | "FriendlyName" | "Location">;

export async function POST(request: Request): Promise<NextResponse<APIResponse<SessionItem>>> {
    try {
        const { Description, FriendlyName, Location } = await request.json() as CreateSessionRequest;
        
        const now = new Date().toISOString();
        const item: SessionItem = {
            PK: 'SESSION',
            SK: `SESSION#${now}`,
            Type: 'SESSION',
            Description,
            Date: now,
            FriendlyName,
            Location,
            ColorMap: {}
        };

        await dynamodb.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: item
        }));

        return NextResponse.json({ data: item });
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
