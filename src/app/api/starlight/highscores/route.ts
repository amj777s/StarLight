
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
import { RankedScoreData} from "@/app/types";
import { NextRequest } from "next/server";

export async function GET(
    req: Request, // Has to be included to access params
) {
    const highscores: RankedScoreData[] = await prisma.$queryRaw`SELECT id,username,score,created,Rank() OVER(ORDER BY score desc) rank from starlight_highscores LIMIT 100`;
   
    // Used to convert BigInt into Int as json.stringify() throws an error
    const revisedHighscores = highscores.map(score=> {
        return {...score, rank: parseInt(score.rank)}
    })
    
    return NextResponse.json(
        revisedHighscores,
        { status: 200 }
    )
};  

export async function POST(
    req: NextRequest
) {
    const { user, score} = await req.json();
    const created = new Date();
    
    //check to see if a user has the same score already in db to prevent duplicates
    const duplicateSCore: {username: string, score: number}[] = await prisma.$queryRaw`SELECT username, score from starlight_highscores WHERE username = ${user} AND score = ${score}`;
    
    
    if(duplicateSCore.length > 0){
        return NextResponse.json({status: 200});
    }
    
    // Update highscores with round info
    await prisma.$executeRaw`INSERT INTO starlight_highscores (score, username, created) VALUES(${score}, ${user}, ${created})`;


    return NextResponse.json({status: 200});

}