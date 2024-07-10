import React from "react";
import { IArticle, IListResponse } from "@/core/types";
import ArticlesDataFrame from "@/features/blog/view/components/ArticlesDataFrame";

import styles from "./BlogListContainer.module.scss";

interface IOwnProps {
  dataFrames: Array<IListResponse<IArticle>>;
  onShowMoreClicked(): void;
}

const BlogListContainer: React.FC<IOwnProps> = (props) => {
  const { dataFrames, onShowMoreClicked } = props;

  const normalizedDataFrames = React.useMemo(() => {
    return Array.isArray(dataFrames) ? dataFrames : [dataFrames];
  }, [dataFrames]);

  const handleShowMoreClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onShowMoreClicked();
    },
    [onShowMoreClicked],
  );

  return (
    <div className={styles.BlogListContainer}>
      {normalizedDataFrames.map((dataFrame) => (
        <ArticlesDataFrame
          key={`frame-${dataFrame.page}`}
          dataFrameResponse={dataFrame}
        />
      ))}
      <div className={styles.MoreButton}>
        <a href="" onClick={handleShowMoreClick}>
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogListContainer;
