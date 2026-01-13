import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "processing" | "done";
}

const DashboardUpload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...uploadedFiles]);

    // Simulate upload progress
    uploadedFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "processing" } : f
          )
        );
      }, 1000 + index * 500);

      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "done" } : f
          )
        );
      }, 2500 + index * 500);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const allDone = files.length > 0 && files.every((f) => f.status === "done");

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Загрузить документы</h1>
          <p className="text-muted-foreground">
            Загрузите файлы для конвертации в XML
          </p>
        </div>

        {/* Upload area */}
        <Card>
          <CardContent className="p-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg font-medium mb-1">
                  Перетащите файлы сюда
                </p>
                <p className="text-muted-foreground mb-4">
                  или нажмите для выбора
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.xlsx,.doc,.xls"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileSelect}
                />
                <Button variant="outline" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Выбрать файлы
                  </label>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Поддерживаемые форматы: PDF, DOCX, XLSX
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded files */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Загруженные файлы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "uploading" && (
                      <span className="text-sm text-muted-foreground">
                        Загрузка...
                      </span>
                    )}
                    {file.status === "processing" && (
                      <span className="text-sm text-primary">Обработка...</span>
                    )}
                    {file.status === "done" && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {allDone && (
                <div className="pt-4 flex justify-end">
                  <Button onClick={() => navigate("/dashboard/documents")}>
                    Перейти к документам
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUpload;
