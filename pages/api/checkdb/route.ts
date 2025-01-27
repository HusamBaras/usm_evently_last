import {  connectMongoDB  } from '../../../lib/mongodb'
import {  NextResponse  } from 'next/server'

export async function POST() {
    const con = await connectMongoDB();
    return new NextResponse('connected');
}