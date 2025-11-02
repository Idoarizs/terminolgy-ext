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
    <div className="overflow-y-auto max-h-60  p-3 rounded-lg text-black text-sm prose prose-invert">
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
