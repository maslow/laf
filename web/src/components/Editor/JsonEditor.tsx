import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import "./userWorker";

monaco?.editor.defineTheme("JsonEditorTheme", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editorLineNumber.foreground": "#aaa",
    "editorOverviewRuler.border": "#fff",
    "editor.lineHighlightBackground": "#fff",
    "scrollbarSlider.background": "#E8EAEC",
    "editorIndentGuide.activeBackground": "#ddd",
    "editorIndentGuide.background": "#eee",
  },
});

function JsonEditor(props: { value: string; onChange?: (value: string | undefined) => void }) {
  const { value, onChange } = props;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>();
  const subscriptionRef = useRef<monaco.IDisposable | undefined>(undefined);
  const monacoEl = useRef(null);

  // onChange
  useEffect(() => {
    subscriptionRef.current?.dispose();

    if (onChange) {
      subscriptionRef.current = editorRef.current?.onDidChangeModelContent((event) => {
        onChange(editorRef.current?.getValue());
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (monacoEl && editorRef.current && value !== editorRef.current?.getValue()) {
      editorRef.current?.getModel()?.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (monacoEl && !editorRef.current) {
      editorRef.current = monaco.editor.create(monacoEl.current!, {
        lineNumbers: "off",
        guides: {
          indentation: false,
        },
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 0,
          alwaysConsumeMouseWheel: false,
        },
        lineNumbersMinChars: 0,
        fontSize: 14,
        scrollBeyondLastLine: false,
        folding: false,
        overviewRulerBorder: false,
        theme: "JsonEditorTheme",
        tabSize: 2, // tab 缩进长度
        model: monaco.editor.createModel(value, "json"),
      });
    }

    return () => {};
  }, [value]);

  return <div style={{ height: "95%", width: "100%" }} ref={monacoEl}></div>;
}

export default JsonEditor;