import React from "react";
import { NextPage } from "next";

const ArticlePage: NextPage = () => {
  return <div>ARTICLE PAGE</div>;
};

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const dynamic = 'auto'
// export const dynamicParams = true
// export const revalidate = false
// export const fetchCache = 'auto'
// export const runtime = 'nodejs'
// export const preferredRegion = 'auto'
// export const maxDuration = 5

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default ArticlePage;
