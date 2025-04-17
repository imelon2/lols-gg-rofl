import JSONPretty from "react-json-pretty";
import { Metadata } from "rofl-parser.js";
import "./JsonBox.css";
import { useState } from "react";
import { Message } from "rsuite";

interface Props {
  data: any;
}

export const JsonBox = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      // 2초 뒤에 "Copied!" 표시 제거
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };
  return (
    <>
      {copied && (
        <div className="copyIndicator">
          <Message>
            <strong>Info!</strong> Success Copy Json!
          </Message>
        </div>
      )}
      <div className="jsonForm">
        <JSONPretty
          onClick={handleCopy}
          id="json-pretty"
          data={data}
        ></JSONPretty>
      </div>
    </>
  );
};
