'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { showSuccess } from '../Toasts/Toast';
// import { showSuccess } from 'elements/Toasts/toastActions';

export default function CodeHighlighter({ code, language }: { code: string; language: string }) {
  return (
    <div className="code-highlighter">
      <div className="code-highlighter--header">
        <span>{language}</span>
        <div
          onClick={() => {
            copy(code);
            showSuccess('Copied to clipboard');
          }}
        >
          Copy
        </div>
      </div>
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers wrapLines>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
