import React from "react";
import Head from "next/head";
import { BlogListContainer } from "@/features/blog";
import Api from "@/api";
import useSWRInfinite, {
  unstable_serialize as infinite_unstable_serialize,
} from "swr/infinite";
import Layout from "@/components/Layout";

const queryKey = "/article/list";
const defaultPageSize = 5;

const getKey = (page: number, pageSize: number) => {
  return `${queryKey}?page=${page}&pageSize=${pageSize}`;
};
export default function Home() {
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const { data, size, setSize, error, isLoading, mutate } = useSWRInfinite(
    (page) => {
      const finalPage = page + 1;

      return [getKey(finalPage, pageSize), finalPage, pageSize];
    },
    async ([, page, pageSize]) => Api.instance.article.loadList(page, pageSize),
    {
      revalidateAll: false,
      // revalidateOnFocus: false,
      // revalidateFirstPage: false,
      // revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  );

  const showMoreClicked = React.useCallback(() => {
    setSize(size + 1);
  }, [size, setSize]);

  return (
    <div>
      <Head>
        <title>Next Blog application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <BlogListContainer
          dataFrames={data}
          onShowMoreClicked={showMoreClicked}
        />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const articles = await Api.instance.article.loadList(1, defaultPageSize);

  const seriKey = infinite_unstable_serialize((page) => {
    const finalPage = page + 1;
    return [getKey(finalPage, defaultPageSize), finalPage, defaultPageSize];
  });

  return {
    props: {
      fallback: {
        [seriKey]: articles,
      },
    },
  };
}
