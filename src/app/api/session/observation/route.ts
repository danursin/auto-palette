import { APIResponse, Color, SessionItem } from '@/types';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { NextResponse } from 'next/server';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';

export interface ObservationPostRequest {
    key: string;
    color: Color;
}

export async function POST(request: Request): Promise<NextResponse<APIResponse<SessionItem>>> {
    try {
        const { color, key } = await request.json() as ObservationPostRequest;
        
        const response = await dynamodb.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: {
                PK: 'SESSION',
                SK: key
            },
            UpdateExpression: 'ADD #ColorMap.#Color :one, #Counts :one',
            ExpressionAttributeNames: {
                '#ColorMap': 'ColorMap',
                '#Color': color,
                '#Counts': 'ObservationCount'
            },
            ExpressionAttributeValues: {
                ':one': 1
            },
            ReturnValues: "ALL_NEW"
        }));

        return NextResponse.json({ data: response.Attributes as SessionItem });
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
