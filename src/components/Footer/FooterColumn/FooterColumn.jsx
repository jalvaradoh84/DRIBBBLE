import React from "react";

const FooterColumn = ({ links, title }) => {
  return (
    <div className="footer_column">
      <h4 className="font-semibold text-[16px] leading-[24px] text-black">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal mt-4">
        {links.map((link) => (
          <li key={link}>
            <a href="/" className="text-gray-100 hover:text-black transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterColumn;