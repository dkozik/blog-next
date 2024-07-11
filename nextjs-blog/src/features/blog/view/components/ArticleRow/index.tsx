import React from "react";
import { IArticle } from "@/core/types";
import ArticlePlate from "@/components/ArticlePlate";

import styles from "./ArticleRow.module.scss";

interface IOwnProps {
  article: IArticle;
}

const ArticleRow: React.FC<IOwnProps> = (props) => {
  const { article } = props;
  return (
    <div className={styles.ArticleRow}>
      <ArticlePlate article={article} />
    </div>
  );
};

export default ArticleRow;
