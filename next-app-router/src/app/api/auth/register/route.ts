
import { register } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req = await request.json();
    console.log("test =", req);
    const res = await register(req);
    return NextResponse.json(
        {status: res.status, statusCode: res.statusCode, message: res.message},
        {status: res.statusCode},
    );
}
