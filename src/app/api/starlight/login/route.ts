import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { checkPassword } from "@/app/utils/signupHelper";



/**
 * 
 * @param req - Request object containing sign up JSON data {username, password}
 * @returns - Returns a status of 201 if sucessful and an empty body
 */
export async function POST(
    req: NextRequest
) {
    try {
        const { username, password }: {username: string, password: string} = await req.json();
        // should only return an array with one or zero objects since each username is a unique value
        const queryResults: { hash: string }[] = await prisma.$queryRaw`SELECT hash from starlight_users WHERE username = ${username}`;
       
        if (queryResults.length === 0) {
            return NextResponse.json({ loginAccepted: false }, { status: 200 });
        }
    
        
    
        const hash = queryResults[0].hash;
    
        // Keeps throwing error when checkPassword (which implements bcrypt.compare) returns false 
        // solved by catching the value as the error and passing that as body in the response
        const loginAccepted= await checkPassword(password, hash);  
       
    
        return NextResponse.json({loginAccepted: loginAccepted}, {status: 200});
    
    } catch (error) {
        return NextResponse.json({loginAccepted: error}, {status: 200});
    }

}