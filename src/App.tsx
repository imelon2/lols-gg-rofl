import { useState } from "react";
import { Metadata, ROFLReader } from "rofl-parser.js";
import "./App.css";
import { Uploader } from "rsuite";
import { JsonBox } from "./component/JsonBox";

function App() {
  const [meta, setMeta] = useState<Metadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleChange = async (fileList: any[]) => {
    setError(null);
    setMeta(null);

    if (!fileList.length) return;
    // rsuite FileItem 객체의 blobFile 에 실제 File이 들어있다
    const file: File = fileList[0].blobFile;

    try {
      // 1) File → ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      // 2) ArrayBuffer → Node Buffer
      const buffer = Buffer.from(arrayBuffer);

      // 3) ROFLReader에 Buffer 전달
      const reader = new ROFLReader(buffer);
      // 4) 메타데이터 파싱
      const metadata = reader.getMetadata();

      setMeta(metadata);
    } catch (err: any) {
      setError(err.message || "메타데이터 추출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div style={{
        display:"flex",
        justifyContent:"center"
      }}>
        <Uploader
          action={""}
          autoUpload={false} // 자동 업로드 비활성화
          onChange={handleChange} // 파일 선택 시 처리
          fileList={[]} // 업로드 리스트를 표시하지 않음
          draggable
        >
          <div
            style={{
              height: 200,
              width: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Click or Drag .rofl file to this area to upload</span>
          </div>
        </Uploader>
      </div>
      <JsonBox data={meta} />
      {/* {meta != null ? <JsonBox data={meta} /> : <></>} */}
    </div>
  );
}

export default App;
