import BaseLayout from "../layout/BaseLayout";
import JsonToTS from "json-to-ts";
import { useCallback, useEffect, useState } from "react";
import TextArea from "../components/TextArea";
const JsonToTs = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleParsing = useCallback(() => {
    try {
      if (inputArea.trim().length < 1) {
        return;
      }
      const obj = JSON.parse(inputArea.trim());
      const tsObj = JsonToTS(obj);
      setoutputArea(tsObj.join("\n\n"));
    } catch (error) {
      console.error(error);
    }
  }, [inputArea]);

  useEffect(() => {
    handleParsing();
  }, [inputArea, handleParsing]);

  return (
    <BaseLayout
      showBackButton
      title="JSON to Typescript"
      desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere deserunt quis assumenda beatae placeat dolores, voluptas consequatur sunt totam ut error cum veniam vel,
          impedit recusandae ducimus nihil? Voluptate, quidem? Incidunt quae autem velit esse placeat, in voluptatum nihil corporis nulla recusandae labore deserunt, hic earum.
          Dolorum rerum earum nobis blanditiis eveniet! Ipsam, dolorum obcaecati nulla vero autem corporis commodi? Mollitia fugiat saepe eius ut. Minus iste, accusamus corporis"
    >
      <div className="px-20 h-full ">
        <div className="flex gap-x-2 h-1/2">
          <TextArea value={inputArea} setValue={setinputArea} />
          <TextArea readOnly value={outputArea} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default JsonToTs;
