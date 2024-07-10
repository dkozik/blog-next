import React from "react";
import { NextPage, NextPageContext } from "next";
import Error from "next/error";
import Api from "@/api";
import useSWR, { unstable_serialize } from "swr";
import { useParams, useSearchParams } from "next/navigation";
import BlogPostContainer from "@/features/blog/view/container/BlogPostContainer";
import Layout from "@/components/Layout";
import Head from "next/head";

const queryKey = "/article";
const getKey = (id: string) => {
  return [`${queryKey}/${id}`, id];
};

const ArticlePage: NextPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isValidating } = useSWR(getKey(id), {
    fetcher: async ([, id]) => await Api.instance.article.loadArticle(id),
    revalidateAll: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlogPostContainer article={data} />
    </Layout>
  );
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export const maxDuration = 5

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query as { id: string };

  const article = await Api.instance.article.loadArticle(id);

  return {
    props: {
      fallback: {
        [unstable_serialize(getKey(id))]: article,
      },
    },
  };
}

export default ArticlePage;
