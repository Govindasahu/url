import React, { useState } from "react";
import cls from "./Shortener.module.css";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";

const Shortener = () => {
  const [input, setInput] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${input}`);
      setShortenedLink(res.data.result.full_short_link);
    } catch (e) {
      console.log(e);
    }
  };

  const copiedLink = () => {
    setCopiedUrl("Link is copied !");
  };

  return (
    <div className={cls.shortener}>
      <div className={cls.container}>
        <h1>URL SHORTENER</h1>

        <div className={cls.formContainer}>
          <input
            type="text"
            placeholder="Enter the link here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={fetchData}>Shorten URL</button>
        </div>

        <div className={cls.url}>
          <p>{shortenedLink}</p>
          <CopyToClipboard text={shortenedLink}>
            <button onClick={copiedLink}>Copy URL to Clipboard</button>
          </CopyToClipboard>
        </div>
        <p>{copiedUrl}</p>
      </div>
    </div>
  );
};

export default Shortener;
