// Static mock data for projects (Личный кабинет ядро)
export type ProjectStatus =
  | "draft"
  | "files_uploaded"
  | "ocr"
  | "extracting"
  | "needs_user_action"
  | "xml_generated"
  | "in_review"
  | "ready"
  | "error"
  | "expired";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Черновик",
  files_uploaded: "Файлы загружены",
  ocr: "OCR",
  extracting: "Извлечение данных",
  needs_user_action: "Ожидает действий",
  xml_generated: "XML сгенерирован",
  in_review: "На проверке",
  ready: "Готово",
  error: "Ошибка",
  expired: "Истёк черновик",
};

export const PROJECT_STATUS_TONE: Record<
  ProjectStatus,
  "neutral" | "info" | "warning" | "success" | "danger"
> = {
  draft: "neutral",
  files_uploaded: "neutral",
  ocr: "info",
  extracting: "info",
  needs_user_action: "warning",
  xml_generated: "info",
  in_review: "info",
  ready: "success",
  error: "danger",
  expired: "neutral",
};

export interface Project {
  id: string;
  name: string;
  documentType: "design_assignment" | "explanatory_note";
  documentTypeLabel: string;
  objectType: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  versions: number;
  errorsCount: number;
  warningsCount: number;
  xsdVersion: string;
  files: { id: string; name: string; size: string; kind: string }[];
  history: { id: string; date: string; actor: string; text: string }[];
  xmlVersions: {
    id: string;
    version: string;
    date: string;
    author: string;
    xsdPassed: boolean;
    checksum: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "p-1024",
    name: "ЖК «Северный квартал», корпус 3",
    documentType: "explanatory_note",
    documentTypeLabel: "Пояснительная записка",
    objectType: "Жилой",
    status: "ready",
    createdAt: "12.04.2026",
    updatedAt: "14.04.2026",
    versions: 3,
    errorsCount: 0,
    warningsCount: 1,
    xsdVersion: "minstroyPZ_v2.1",
    files: [
      { id: "f1", name: "ПЗ_корпус_3.pdf", size: "8.4 МБ", kind: "PDF" },
      { id: "f2", name: "Приложения.zip", size: "21.1 МБ", kind: "ZIP" },
      { id: "f3", name: "ПЗ_корпус_3.sig", size: "2 КБ", kind: "Подпись" },
    ],
    history: [
      { id: "h1", date: "14.04.2026 11:42", actor: "Система", text: "Архив сформирован" },
      { id: "h2", date: "14.04.2026 11:40", actor: "Система", text: "XML прошёл XSD-проверку" },
      { id: "h3", date: "14.04.2026 11:30", actor: "Иван Иванов", text: "Запущена генерация" },
    ],
    xmlVersions: [
      { id: "v3", version: "v3", date: "14.04.2026", author: "Иван Иванов", xsdPassed: true, checksum: "8af3…b21c" },
      { id: "v2", version: "v2", date: "13.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "1cd9…0e44" },
      { id: "v1", version: "v1", date: "12.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "77ab…a901" },
    ],
  },
  {
    id: "p-1023",
    name: "Логистический центр, склад А",
    documentType: "design_assignment",
    documentTypeLabel: "Задание на проектирование",
    objectType: "Нежилой",
    status: "needs_user_action",
    createdAt: "10.04.2026",
    updatedAt: "13.04.2026",
    versions: 1,
    errorsCount: 0,
    warningsCount: 4,
    xsdVersion: "minstroyZP_v1.3",
    files: [
      { id: "f1", name: "ЗнП_склад.docx", size: "1.2 МБ", kind: "DOCX" },
    ],
    history: [
      { id: "h1", date: "13.04.2026 09:12", actor: "Система", text: "Найдены поля с низкой уверенностью" },
      { id: "h2", date: "10.04.2026 16:00", actor: "Анна Петрова", text: "Проект создан" },
    ],
    xmlVersions: [
      { id: "v1", version: "v1", date: "13.04.2026", author: "Анна Петрова", xsdPassed: false, checksum: "e431…aa10" },
    ],
  },
  {
    id: "p-1022",
    name: "Реконструкция школы №15",
    documentType: "explanatory_note",
    documentTypeLabel: "Пояснительная записка",
    objectType: "Нежилой",
    status: "error",
    createdAt: "08.04.2026",
    updatedAt: "08.04.2026",
    versions: 1,
    errorsCount: 3,
    warningsCount: 0,
    xsdVersion: "minstroyPZ_v2.1",
    files: [
      { id: "f1", name: "ПЗ_школа_15.pdf", size: "4.0 МБ", kind: "PDF" },
    ],
    history: [
      { id: "h1", date: "08.04.2026 14:22", actor: "Система", text: "XML не прошёл XSD-проверку" },
    ],
    xmlVersions: [
      { id: "v1", version: "v1", date: "08.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "0099…ffaa" },
    ],
  },
  {
    id: "p-1021",
    name: "Линейный объект — ВОЛС",
    documentType: "design_assignment",
    documentTypeLabel: "Задание на проектирование",
    objectType: "Линейный",
    status: "draft",
    createdAt: "05.04.2026",
    updatedAt: "05.04.2026",
    versions: 0,
    errorsCount: 0,
    warningsCount: 0,
    xsdVersion: "minstroyZP_v1.3",
    files: [],
    history: [
      { id: "h1", date: "05.04.2026 10:00", actor: "Иван Иванов", text: "Проект создан как черновик" },
    ],
    xmlVersions: [],
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
