import { APIResponse, SessionItem } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { QueryCommand } from '@aws-sdk/lib-dynamodb';

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse<SessionItem[]>>> {
    try {
        const take = +(request.nextUrl.searchParams.get('take') ?? 10);
        const from = request.nextUrl.searchParams.get('from') ?? undefined;
        const response = await dynamodb.send(
            new QueryCommand({
                TableName: TABLE_NAME,
                KeyConditionExpression: 'PK = :PK',
                ExpressionAttributeValues: {
                    ':PK': 'SESSION'
                },
                Limit: take,
                ScanIndexForward: false,
                ExclusiveStartKey: from ? {
                    PK: 'SESSION',
                    SK: from
                } : undefined
            })
        );
    
        const data = response.Items as SessionItem[];
        return NextResponse.json({ data });
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 });
    }
}
