import React from "react";

const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <li key={link}>
            <a href="/">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;
