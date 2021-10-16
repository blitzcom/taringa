import Head from 'next/head';

import Content from 'ui/content';
import Feed from 'ui/feed';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taringa! • Inteligencia Colectiva</title>
        <meta name="description" content="Taringa! Community App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content>
        <Feed />
      </Content>
    </div>
  );
}
