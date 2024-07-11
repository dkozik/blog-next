import React from "react";
import { IArticleWithComments } from "@/core/types";
import htmlToReact from "html-to-react";

import styles from "./SingleArticle.module.scss";

interface IOwnProps {
  article: IArticleWithComments;
}

const SingleArticle: React.FC<IOwnProps> = (props) => {
  const { article } = props;

  const memoizedBody = React.useMemo(() => {
    const parser = htmlToReact.Parser({});
    return parser.parse(article.body);
  }, [article.body]);

  return (
    <div className={styles.SingleArticle}>
      <div className={styles.Image}>
        <img src={article.imageSrc} />
      </div>
      <h2 className={styles.Title}>{article.title}</h2>
      <div className={styles.Content}>{memoizedBody}</div>
    </div>
  );
};

export default SingleArticle;
