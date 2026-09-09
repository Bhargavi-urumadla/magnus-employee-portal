import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

interface UploadedImage {
  id: number;
  fileName: string;
  displayName: string;
  preview: string;
}

const ImagesPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileName, setFileName] = useState("");

  const [images, setImages] = useState<UploadedImage[]>([
    {
      id: 1,
      fileName: "api's participation.jpg",
      displayName: "api",
      preview: "",
    },
  ]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    setFileName(file.name);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const previewUrl = URL.createObjectURL(
      selectedFile
    );

    const newImage: UploadedImage = {
      id: Date.now(),
      fileName: selectedFile.name,
      displayName:
        fileName.trim() || selectedFile.name,
      preview: previewUrl,
    };

    setImages((currentImages) => [
      ...currentImages,
      newImage,
    ]);

    setSelectedFile(null);
    setFileName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: number) => {
    setImages((currentImages) =>
      currentImages.filter(
        (image) => image.id !== id
      )
    );
  };

  return (
    <div className="magnus-page images-page">

      {/* PAGE TITLE */}

      <div className="images-page-header">

        <h1>
          Uploading/Downloading Image
        </h1>

        <div className="images-breadcrumb">

          <span className="breadcrumb-home">
            ♟
          </span>

          <span>
            Home
          </span>

          <span className="breadcrumb-separator">
            &gt;
          </span>

          <span>
            More
          </span>

          <span className="breadcrumb-separator">
            &gt;
          </span>

          <span>
            Uploading/Downloading Image
          </span>

        </div>

      </div>

      {/* PAGE CONTENT */}

      <div className="images-page-content">

        {/* UPLOAD SECTION */}

        <div className="images-upload-row">

          {/* FILE */}

          <div className="images-file-group">

            <label htmlFor="image-file">
              Select File :
            </label>

            <input
              ref={fileInputRef}
              id="image-file"
              type="file"
              onChange={handleFileChange}
            />

          </div>

          {/* FILE NAME */}

          <div className="images-name-group">

            <label htmlFor="image-name">
              File Name :
            </label>

            <input
              id="image-name"
              type="text"
              placeholder="File Name"
              value={fileName}
              onChange={(event) =>
                setFileName(event.target.value)
              }
            />

          </div>

          {/* UPLOAD */}

          <button
            type="button"
            className="images-upload-button"
            onClick={handleUpload}
          >
            Upload
          </button>

        </div>

        {/* LIST TITLE */}

        <h2 className="images-list-heading">
          List Of Images :
        </h2>

        {/* IMAGE CARDS */}

        <div className="images-list">

          {images.map((image) => (
            <div
              className="images-card"
              key={image.id}
            >

              <div className="images-card-header">

                <span className="images-card-name">
                  {image.fileName}
                </span>

                <button
                  type="button"
                  className="images-delete"
                  onClick={() =>
                    handleDelete(image.id)
                  }
                  aria-label="Delete image"
                >
                  ×
                </button>

              </div>

              <div className="images-card-body">

                {image.preview ? (
                  <img
                    src={image.preview}
                    alt={image.displayName}
                  />
                ) : (
                  <div className="reference-image">

                    <div className="broken-image">
                      <span>
                        🖼
                      </span>
                    </div>

                    <a
                      href="#"
                      onClick={(event) =>
                        event.preventDefault()
                      }
                    >
                      {image.displayName}
                    </a>

                  </div>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default ImagesPage;