import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  title,
  description,
  image,
  author,
  children,
}) => {
  return (
    <>
      <Head>
        {/* title */}
        <title>{title}</title>
        {/* meta-description */}
        <meta name="description" content={description} />
        {/* author from config.json */}
        <meta name="author" content={author} />
        {/* og-image */}
        <meta property="og:image" content={image} />

      </Head>
      <Header />
      <main className='wrapper'>
        {children}
      </main>
      <Footer />
      </>
  );
};

export default Layout;

