import { request } from '../lib/datocms';

const HOMEPAGE_QUERY = `query {
  article {
    dupa
  }
}`;
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}
