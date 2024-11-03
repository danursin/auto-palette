import { Color, ObservationItem } from '@/types';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { NextResponse } from 'next/server';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

export interface ObservationPostRequest {
    color: Color;
    location: {
        latitude: number;
        longitude: number;
    }
}

export async function POST(request: Request) {
    try {
        const { color, location } = await request.json() as ObservationPostRequest;
        
        const ObservationItem: ObservationItem = {
            PK: 'OBSERVATION',
            SK: `${new Date().toISOString()}#${color}`,
            Type: 'Observation',
            Color: color,
            Date: new Date().toISOString(),
            Location: location
        };

        await dynamodb.send(new TransactWriteCommand({
            TransactItems: [
                {
                    Put: {
                        TableName: TABLE_NAME,
                        Item: ObservationItem
                    }
                },
                {
                    Update: {
                        TableName: TABLE_NAME,
                        Key: {
                            PK: 'GLOBAL#COUNTS',
                            SK: 'GLOBAL#COUNTS'
                        },
                        UpdateExpression: 'ADD #Counts.#Color :one',
                        ExpressionAttributeNames: {
                            '#Counts': 'Counts',
                            '#Color': color
                        },
                        ExpressionAttributeValues: {
                            ':one': 1
                        }
                    }
                }
            ]
        }));

        return NextResponse.json(ObservationItem);
    } catch (error) {
        console.error('Failed to save data', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
