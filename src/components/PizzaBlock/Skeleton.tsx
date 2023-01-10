import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="134" cy="136" r="125" />
      <rect x="0" y="282" rx="6" ry="6" width="280" height="19" />
      <rect x="1" y="322" rx="6" ry="6" width="280" height="88" />
      <rect x="0" y="430" rx="5" ry="5" width="75" height="29" />
      <rect x="155" y="424" rx="6" ry="6" width="125" height="35" />
    </ContentLoader>
  </div>
);

