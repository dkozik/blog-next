import React from "react";
import { IArticle, IListResponse } from "@/core/types";
import ArticleRow from "@/features/blog/view/components/ArticleRow";

import styles from "./ArticlesDataFrame.module.scss";

interface IOwnProps {
  dataFrameResponse: IListResponse<IArticle>;
}

const ArticlesDataFrame: React.FC<IOwnProps> = (props) => {
  const { dataFrameResponse } = props;
  return (
    <div className={styles.ArticlesDataFrame}>
      {dataFrameResponse.data.map((row) => (
        <ArticleRow key={row.id} article={row} />
      ))}
    </div>
  );
};

export default ArticlesDataFrame;
