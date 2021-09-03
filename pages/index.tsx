import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr';

interface Person {
  name: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {
  const { data, mutate } = useSWR<Person>('/api/hello', fetcher);

  const personBit = (data) ? <p>{data.name}</p> : <p>LOADING...</p>;

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
      <main className="flex justify-center p-3">
        <article>
          <section className="flex justify-center p-3">
            {personBit}
          </section>
        </article>
      </main>
    </>
  )
}

export default Home
