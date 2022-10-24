import { fetchEntries } from "utils";
import Link from "next/link";
import { NavBar } from "components";

export default function NotFound({ pages, siteIdentity }) {
  return (
    <>
      <NavBar {...{ pages, siteIdentity }} />
      <div className="page-wrapper">
        <section className="banner-base">
          <h1>{`We're sorry, that page could not be found.`}</h1>
          <Link href="/">Return home</Link>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pages = await fetchEntries({ content_type: "page" });
  const siteIdentity = await fetchEntries({ content_type: "siteIdentity" });

  return {
    props: {
      pages,
      siteIdentity,
    },
  };
}
