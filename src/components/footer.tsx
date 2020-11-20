import React from "react";
import { OutboundLink } from "gatsby-plugin-gtag";

import style from "../styles/footer.module.css";

type Props = {
  copyrights?: string;
};

const Footer = ({ copyrights }: Props) => (
  <footer className={style.footer}>
    {copyrights ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    ) : (
      <>

      </>
    )}
  </footer>
);

export default Footer;
