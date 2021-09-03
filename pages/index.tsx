import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr';
import {Player} from "./api/players";
import { FixedSizeList as List } from 'react-window';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {
  const { data, mutate } = useSWR<Player[]>('/api/players', fetcher);

  const personBit = (data) ? <p>{data[0].nameGiven}</p> : <p>LOADING...</p>;

  const Row = ({ index, style }) => {
    if (!data) return null;
    const player = data[index];
    return (
      <div style={style}>
        {player.nameGiven}
        &nbsp;-&nbsp;
        {player.height}
        &nbsp;-&nbsp;
        {player.weight}
        &nbsp;-&nbsp;
        {player.debut}
        &nbsp;-&nbsp;
        {player.birthCity}
        &nbsp;-&nbsp;
        {player.birthState}
      </div>
    )
  }

  const playerList = (data) ?
    <List
      height={600}
      itemCount={data.length}
      itemSize={25}
      width={800}
    >
      {Row}
    </List> : <p>LOADING...</p>;

  return (
    <>
      <Head>
        <title>Shun Demo</title>
        <meta name="description" content="Shun Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-3">
        <h1 className="text-center text-5xl font-bold">
          Shun Demo
        </h1>
      </header>
      <main>
        <article>
          <section className="flex justify-center p-3">
            {/*{personBit}*/}
            {playerList}
          </section>
        </article>
      </main>
    </>
  )
}

export default Home
