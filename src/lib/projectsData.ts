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

export type DocumentKind = "design_assignment" | "explanatory_note";

export const DOCUMENT_KIND_LABEL: Record<DocumentKind, string> = {
  design_assignment: "Задание на проектирование",
  explanatory_note: "Пояснительная записка",
};

export interface ProjectDocument {
  id: string;
  kind: DocumentKind;
  kindLabel: string;
  status: ProjectStatus;
  updatedAt: string;
  versions: number;
  errorsCount: number;
  xsdVersion: string;
  files: { id: string; name: string; size: string; kind: string }[];
  xmlVersions: {
    id: string;
    version: string;
    date: string;
    author: string;
    xsdPassed: boolean;
    checksum: string;
    note?: string;
    errorsCount?: number;
    sizeKb?: number;
  }[];
}

export interface Project {
  id: string;
  name: string;
  /** @deprecated Use `documents[0].kind` — kept for backward compatibility */
  documentType: DocumentKind;
  /** @deprecated Use `documents[0].kindLabel` */
  documentTypeLabel: string;
  objectType: string;
  workType?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  versions: number;
  errorsCount: number;
  warningsCount: number;
  xsdVersion: string;
  /** Aggregated files across documents (for backward compat) */
  files: { id: string; name: string; size: string; kind: string }[];
  history: { id: string; date: string; actor: string; text: string }[];
  /** Aggregated XML versions across documents (for backward compat) */
  xmlVersions: ProjectDocument["xmlVersions"];
  /** Multiple documents per project (PZ + ZnP etc.) */
  documents: ProjectDocument[];
}

export const PROJECTS: Project[] = [
  {
    id: "p-1024",
    name: "ЖК «Северный квартал», корпус 3",
    documentType: "explanatory_note",
    documentTypeLabel: "Пояснительная записка",
    objectType: "Жилой",
    workType: "Строительство",
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
      { id: "h1", date: "14.04.2026 11:42", actor: "Система", text: "Архив ПЗ сформирован" },
      { id: "h2", date: "14.04.2026 11:40", actor: "Система", text: "XML ПЗ прошёл XSD-проверку" },
      { id: "h3", date: "13.04.2026 15:10", actor: "Иван Иванов", text: "Добавлен документ ЗнП" },
      { id: "h4", date: "12.04.2026 11:30", actor: "Иван Иванов", text: "Запущена генерация ПЗ" },
    ],
    xmlVersions: [
      { id: "v3", version: "v3", date: "14.04.2026", author: "Иван Иванов", xsdPassed: true, checksum: "8af3…b21c", note: "Финальная сборка после правок раздела «Технические решения»", errorsCount: 0, sizeKb: 184 },
      { id: "v2", version: "v2", date: "13.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "1cd9…0e44", note: "Не прошёл XSD: пустые даты приложений", errorsCount: 4, sizeKb: 178 },
      { id: "v1", version: "v1", date: "12.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "77ab…a901", note: "Первая автосборка", errorsCount: 7, sizeKb: 172 },
    ],
    documents: [
      {
        id: "d-pz",
        kind: "explanatory_note",
        kindLabel: "Пояснительная записка",
        status: "ready",
        updatedAt: "14.04.2026",
        versions: 3,
        errorsCount: 0,
        xsdVersion: "minstroyPZ_v2.1",
        files: [
          { id: "f1", name: "ПЗ_корпус_3.pdf", size: "8.4 МБ", kind: "PDF" },
          { id: "f2", name: "Приложения.zip", size: "21.1 МБ", kind: "ZIP" },
        ],
        xmlVersions: [
          { id: "v3", version: "v3", date: "14.04.2026", author: "Иван Иванов", xsdPassed: true, checksum: "8af3…b21c", errorsCount: 0, sizeKb: 184 },
          { id: "v2", version: "v2", date: "13.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "1cd9…0e44", errorsCount: 4, sizeKb: 178 },
          { id: "v1", version: "v1", date: "12.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "77ab…a901", errorsCount: 7, sizeKb: 172 },
        ],
      },
      {
        id: "d-znp",
        kind: "design_assignment",
        kindLabel: "Задание на проектирование",
        status: "xml_generated",
        updatedAt: "13.04.2026",
        versions: 1,
        errorsCount: 0,
        xsdVersion: "minstroyZP_v1.3",
        files: [
          { id: "f4", name: "ЗнП_корпус_3.docx", size: "1.4 МБ", kind: "DOCX" },
        ],
        xmlVersions: [
          { id: "v1", version: "v1", date: "13.04.2026", author: "Иван Иванов", xsdPassed: true, checksum: "abcd…1234", errorsCount: 0, sizeKb: 92 },
        ],
      },
    ],
  },
  {
    id: "p-1023",
    name: "Логистический центр, склад А",
    documentType: "design_assignment",
    documentTypeLabel: "Задание на проектирование",
    objectType: "Нежилой",
    workType: "Строительство",
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
      { id: "v1", version: "v1", date: "13.04.2026", author: "Анна Петрова", xsdPassed: false, checksum: "e431…aa10", note: "Поля с низкой уверенностью OCR", errorsCount: 0, sizeKb: 96 },
    ],
    documents: [
      {
        id: "d-znp",
        kind: "design_assignment",
        kindLabel: "Задание на проектирование",
        status: "needs_user_action",
        updatedAt: "13.04.2026",
        versions: 1,
        errorsCount: 0,
        xsdVersion: "minstroyZP_v1.3",
        files: [{ id: "f1", name: "ЗнП_склад.docx", size: "1.2 МБ", kind: "DOCX" }],
        xmlVersions: [
          { id: "v1", version: "v1", date: "13.04.2026", author: "Анна Петрова", xsdPassed: false, checksum: "e431…aa10", errorsCount: 0, sizeKb: 96 },
        ],
      },
    ],
  },
  {
    id: "p-1022",
    name: "Реконструкция школы №15",
    documentType: "explanatory_note",
    documentTypeLabel: "Пояснительная записка",
    objectType: "Нежилой",
    workType: "Реконструкция",
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
      { id: "v1", version: "v1", date: "08.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "0099…ffaa", note: "XSD: 3 ошибки в разделе «Объект»", errorsCount: 3, sizeKb: 142 },
    ],
    documents: [
      {
        id: "d-pz",
        kind: "explanatory_note",
        kindLabel: "Пояснительная записка",
        status: "error",
        updatedAt: "08.04.2026",
        versions: 1,
        errorsCount: 3,
        xsdVersion: "minstroyPZ_v2.1",
        files: [{ id: "f1", name: "ПЗ_школа_15.pdf", size: "4.0 МБ", kind: "PDF" }],
        xmlVersions: [
          { id: "v1", version: "v1", date: "08.04.2026", author: "Иван Иванов", xsdPassed: false, checksum: "0099…ffaa", errorsCount: 3, sizeKb: 142 },
        ],
      },
    ],
  },
  {
    id: "p-1021",
    name: "Линейный объект — ВОЛС",
    documentType: "design_assignment",
    documentTypeLabel: "Задание на проектирование",
    objectType: "Линейный",
    workType: "Строительство",
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
    documents: [],
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
