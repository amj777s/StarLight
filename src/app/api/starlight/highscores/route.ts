
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { ScoreData } from "@/app/types";
import { NextRequest } from "next/server";

export async function GET(
    req: Request, // Has to be included to access params
) {


    const highscores: ScoreData[] = await prisma.$queryRaw`SELECT * from starlight_highscores ORDER BY score DESC LIMIT 100`;
    return NextResponse.json(
        highscores,
        { status: 200 }
    )
};  

export async function POST(
    req: NextRequest
) {
    const { username, score} = await req.json();
    const created = new Date();
    
    //check to see if a user has the same score already in db to prevent duplicates
    const duplicateSCore: {username: string, score: number}[] = await prisma.$queryRaw`SELECT username, score from starlight_highscores WHERE username = ${username} AND score = ${score}`;
    
    
    if(duplicateSCore.length > 0){
        return NextResponse.json({status: 200});
    }
    
    // Update highscores with round info
    await prisma.$executeRaw`INSERT INTO starlight_highscores (score, username, created) VALUES(${score}, ${username}, ${created})`;


    return NextResponse.json({status: 200});

}