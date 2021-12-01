import { Suspense } from "react";
import Footer from "../../components/footer.client";
// Client Components
import Page from "../../components/page.client";
// Server Components
import SystemInfo from "../../components/server-info.server";
// Shared Components
import Spinner from "../../components/spinner";
import Story from "../../components/story.client";
// Utils
import fetchData from "../../lib/fetch-data";
import { transform } from "../../lib/get-item";
import useData from "../../lib/use-data";

function StoryWithData({ id }) {
  const data = useData(`s-${id}`, () =>
    fetchData(`item/${id}`).then(transform)
  );
  return <Story {...data} />;
}

function NewsWithData() {
  const storyIds = useData("top", () => fetchData("topstories"));
  return (
    <>
      {storyIds.slice(0, 30).map((id) => {
        return (
          <Suspense fallback={<Spinner />} key={id}>
            <StoryWithData id={id} />
          </Suspense>
        );
      })}
    </>
  );
}

export default function News() {
  return (
    <Page>
      <Suspense fallback={<Spinner />}>
        <NewsWithData />
      </Suspense>
      <Footer />
      <SystemInfo />
    </Page>
  );
}
