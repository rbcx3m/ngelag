import db from '@/lib/db';
import ImageFallback from '@/lib/ImageFallback';
import Layout from '@/components/Layout';

export default function Home({ data }) {

return(
  <Layout title={data.title} description={data.desc}>
    <h1>{data.title}</h1>
      {data.img && (
          <ImageFallback
             className='cover' 
             src={data.img} 
             alt={data.title} 
             width={0}
             height={0}
             sizes="100vw"
             loading="eager"
          />
      )}
    <article dangerouslySetInnerHTML={{ __html: data.content }} />
    <span className="item-name"><a href={`/admin/${data.slug}`}>Edit Post {data.title}</a></span>
  </Layout>
)
}
export const getStaticPaths = async () => {
    const data = db.prepare('SELECT slug FROM posts ORDER BY id DESC').all();
    const paths = data.map((post) => ({ params: post, }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
      const { slug } = params;
    try {
       const [ data ] = db.prepare('SELECT * FROM posts WHERE slug = ?').all(slug);
    return {
      props: {
        data,
      },
      revalidate: 3600, 
    };
  } catch (error) {
    console.error('Database fetch failed:', error);
    return {
      notFound: true,
    };
  }
}