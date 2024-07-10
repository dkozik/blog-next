import React, { ReactNode } from "react";

import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.Layout}>
      <div className={styles.Content}>{children}</div>
    </div>
  );
};

export default Layout;
