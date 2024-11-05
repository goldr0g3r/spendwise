import React from "react";

const HeaderBox = ({
  //   type = "title",
  //   title,
  //   subtext,
  //   user,
  route,
}: HeaderBoxProps) => {
  if (route === "home") {
    route = "Overview";
  }
  return (
    <div className="header-box">
      <div className="header-title-section">
        <div className="header-title ">{route}</div>
      </div>
      <div className="header-search-section">Search</div>
      <div className="header-account-section">
        <div className="account-section-settings"></div>
        <div className="account-section-notification"></div>
        <div className="account-section-avatar"></div>
      </div>
    </div>
  );
};

export default HeaderBox;
