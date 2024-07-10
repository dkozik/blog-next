import React from "react";
import { IArticleWithComments } from "@/core/types";

import styles from "./SingleArticle.module.scss";

interface IOwnProps {
  article: IArticleWithComments;
}

const SingleArticle: React.FC<IOwnProps> = (props) => {
  const { article } = props;

  return (
    <div className={styles.SingleArticle}>
      <div>
        <img src={article.imageSrc} />
      </div>
      <h2 className={styles.Title}>{article.title}</h2>
      <div className={styles.Content}>{article.body}</div>
    </div>
  );
};

export default SingleArticle;
