import React from "react";
import { IArticleWithComments } from "@/core/types";
import SingleArticle from "@/features/blog/view/components/SingleArticle";
import ArticleComments from "@/features/blog/view/components/ArticleComments";
import PostCommentForm from "@/features/blog/view/components/PostCommentForm";
import { IPostCommentForm } from "@/features/namespace";
import Api from "@/api";
import useSWR from "swr";

import styles from "./BlogPostContainer.module.scss";

interface IOwnProps {
  article: IArticleWithComments;
}

const BlogPostContainer: React.FC<IOwnProps> = (props) => {
  const { article } = props;

  const { data: articleComments, mutate } = useSWR(
    [`/article/${article.id}/comments`],
    async () => {
      return await Api.instance.article.loadArticleComments(article.id);
    },
    {
      revalidateAll: false,
      // revalidateOnFocus: false,
      // revalidateFirstPage: false,
      // revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  );

  const submit = React.useCallback(
    async (values: IPostCommentForm) => {
      await Api.instance.article.postComment(article.id, {
        body: values.message,
      });
      await mutate();
    },
    [article.id],
  );

  return (
    <div className={styles.BlogPostContainer}>
      <div className={styles.Content}>
        <SingleArticle article={article} />
        <hr />
        <ArticleComments comments={articleComments} />
        <div>
          <PostCommentForm onSubmit={submit} />
        </div>
      </div>
    </div>
  );
};
export default BlogPostContainer;
