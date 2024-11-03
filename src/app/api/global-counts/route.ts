import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { GlobalCountItem } from '@/types';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await dynamodb.send(
            new GetCommand({
                TableName: TABLE_NAME,
                Key: {
                    PK: "GLOBAL#COUNTS",
                    SK: "GLOBAL#COUNTS"
                }
            })
        );
    
        const data = response.Item as GlobalCountItem;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch counts' }, { status: 500 });
    }
}
