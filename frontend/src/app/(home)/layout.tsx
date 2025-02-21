'use client'

const HomePageLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="relative h-full">
      <Head>
        <title>Naiscorp</title>
        <meta name="description" content="This is introduction to Naiscorp." />
      </Head>
      <main className="h-full">
        {children}
      </main>
    </div>
   );
}
 
export default HomePageLayout;


