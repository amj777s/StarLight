import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prisma";
import { ScoreData } from "@/app/types";


/**
 * 
 * @param req - Request object containing username
 * @returns - Returns an object containing an array of scores and the respective data
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {

  // Will return an empty array if no errors are thrown
  const scores: ScoreData[] = await prisma.$queryRaw` SELECT *  from starlight_highscores WHERE username=${params.user}`;
  const avgScore: { avg_score: number }[] = await prisma.$queryRaw`SELECT ROUND(AVG(score),1) AS avg_score from starlight_highscores where username=${params.user}`;
  const rank: {username: string, pos: string}[] = await prisma.$queryRaw`with ranks AS (Select username,score, Rank() OVER(ORDER BY score desc) rank from starlight_highscores) SELECT username, Min(rank) as pos from ranks Group by 1 having username=${params.user}`;
  const intialValue:number = 0;
  const totalScore: number = scores.reduce((accumulator, currentScoreData) => accumulator + currentScoreData.score, intialValue);

  return NextResponse.json({
    scores,
    avgScore: avgScore[0].avg_score,
    rank: parseInt(rank[0].pos),
    totalScore
  },
    {
      status: 200
    })

}