import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { BlogListContainer } from "@/features/blog";
import { IArticle } from "@/core/types";
import Api from "@/api";
import useSWRInfinite, {
  unstable_serialize as infinite_unstable_serialize,
} from "swr/infinite";

interface IIndexPageProps {
  articles: IArticle[];
}
const queryKey = "/article/list";
const defaultPageSize = 10;

const getKey = (page: number, pageSize: number) => {
  return `${queryKey}?page=${page}&pageSize=${pageSize}`;
};

export default function Home() {
  // const { data } = useSWR(queryKey, 1, 10, Api.instance.article.loadList);
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogListContainer dataFrames={data} />

      <button onClick={() => setSize(size + 1)}>Read more</button>
    </div>
  );
}

export async function getServerSideProps() {
  const articles = await Api.instance.article.loadList();

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
