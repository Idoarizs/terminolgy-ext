// react
import React from "react";

// markdown renderer
import ReactMarkdown from "react-markdown";

// markdown plugins
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface AIResponsesProps {
  response: string;
}

const AIResponses: React.FC<AIResponsesProps> = ({ response }) => {
  return (
    <div className="overflow-auto p-3 rounded-lg text-black text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponses;