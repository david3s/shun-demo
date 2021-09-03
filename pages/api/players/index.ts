// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import csv from 'csv-parser'
import fs from 'fs'

export interface Player {
  nameGiven?: string
  height?: string
  weight?: string
  debut?: string
  birthCity?: string
  birthState?: string
}
let results: Player[] = [];

const loadPlayers = async () => {
  const results: Player[] = [];

  return new Promise<Player[]>(function(resolve, reject) {
    fs.createReadStream('Player.csv')
      .pipe(csv())
      .on('data', (data) => {
        const player: Player = {
          nameGiven: data.nameGiven,
          height: data.height,
          weight: data.weight,
          debut: data.debut,
          birthCity: data.birthCity,
          birthState: data.birthState
        }
        results.push(player)
      })
      .on('end', () => {
        resolve(results)
      })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[]>
) {
  if (results.length <= 0) {
    results = await loadPlayers();
  }
  res.status(200).json(results)
}

