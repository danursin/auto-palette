import { NextRequest, NextResponse } from 'next/server';
import dynamodb, {TABLE_NAME} from '@/db/dynamodb';

import { APIResponse } from '@/types';
import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

export async function DELETE(request: NextRequest): Promise<NextResponse<APIResponse<boolean>>> {
    try {
        const key = request.nextUrl.searchParams.get('key');
        await dynamodb.send(
            new DeleteCommand({
                TableName: TABLE_NAME,
                Key: {
                    PK: "SESSION",
                    SK: key
                }
            })
        );

        return NextResponse.json({ data: true });
    } catch (error) {
        console.error('Failed to delete data', error);
        return NextResponse.json({ error: 'Failed to delete key' }, { status: 500 });
    }
}
