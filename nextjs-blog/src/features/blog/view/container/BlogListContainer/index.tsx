import React from "react";
import { IArticle, IListResponse } from "@/core/types";
import ArticlesDataFrame from "@/features/blog/view/components/ArticlesDataFrame";

import styles from "./BlogListContainer.module.scss";

interface IOwnProps {
  dataFrames: Array<IListResponse<IArticle>>;
}

const BlogListContainer: React.FC<IOwnProps> = (props) => {
  const { dataFrames } = props;

  const normalizedDataFrames = React.useMemo(() => {
    return Array.isArray(dataFrames) ? dataFrames : [dataFrames];
  }, [dataFrames]);

  return (
    <div className={styles.BlogListContainer}>
      {normalizedDataFrames.map((dataFrame) => (
        <ArticlesDataFrame
          key={`frame-${dataFrame.page}`}
          dataFrameResponse={dataFrame}
        />
      ))}
    </div>
  );
};

export default BlogListContainer;
