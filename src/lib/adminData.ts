// Mock data for /admin (engineering back-office)

export type TicketStage =
  | "queued"
  | "precheck"
  | "ocr"
  | "extracting"
  | "validating"
  | "needs_clarification"
  | "manual"
  | "qa"
  | "publishing"
  | "published";

export const TICKET_STAGE_LABELS: Record<TicketStage, string> = {
  queued: "В очереди",
  precheck: "Precheck",
  ocr: "OCR",
  extracting: "LLM extraction",
  validating: "XSD + бизнес-валидация",
  needs_clarification: "Нужны уточнения",
  manual: "Manual queue",
  qa: "QA",
  publishing: "Публикация",
  published: "Опубликовано",
};

export const TICKET_STAGE_TONE: Record<
  TicketStage,
  "neutral" | "info" | "warning" | "success" | "danger"
> = {
  queued: "neutral",
  precheck: "info",
  ocr: "info",
  extracting: "info",
  validating: "info",
  needs_clarification: "warning",
  manual: "warning",
  qa: "info",
  publishing: "info",
  published: "success",
};

export type TicketPriority = "low" | "normal" | "high" | "urgent";

export interface AdminTicket {
  id: string;
  projectName: string;
  customer: string;
  documentType: string;
  stage: TicketStage;
  priority: TicketPriority;
  assignee: string | null;
  slaHours: number;
  createdAt: string;
  updatedAt: string;
  errorsCount: number;
  manualReason?: string;
}

export const ADMIN_TICKETS: AdminTicket[] = [
  {
    id: "T-2041",
    projectName: "ЖК «Северный квартал», корпус 3",
    customer: "ООО «СтройПроект»",
    documentType: "Пояснительная записка",
    stage: "qa",
    priority: "high",
    assignee: "А. Петров",
    slaHours: 4,
    createdAt: "28.04.2026 09:12",
    updatedAt: "28.04.2026 11:40",
    errorsCount: 0,
  },
  {
    id: "T-2040",
    projectName: "Логистический центр, склад А",
    customer: "АО «ЛогистикГрупп»",
    documentType: "Задание на проектирование",
    stage: "manual",
    priority: "urgent",
    assignee: "С. Иванов",
    slaHours: 2,
    createdAt: "28.04.2026 08:30",
    updatedAt: "28.04.2026 10:18",
    errorsCount: 5,
    manualReason: "XSD не прошёл, нестандартная структура раздела 3",
  },
  {
    id: "T-2039",
    projectName: "Реконструкция школы №15",
    customer: "МБУ «Школа №15»",
    documentType: "Пояснительная записка",
    stage: "needs_clarification",
    priority: "normal",
    assignee: null,
    slaHours: 12,
    createdAt: "27.04.2026 18:02",
    updatedAt: "28.04.2026 09:00",
    errorsCount: 0,
  },
  {
    id: "T-2038",
    projectName: "Линейный объект — ВОЛС",
    customer: "ООО «ТелекомСтрой»",
    documentType: "Задание на проектирование",
    stage: "validating",
    priority: "normal",
    assignee: null,
    slaHours: 8,
    createdAt: "27.04.2026 14:55",
    updatedAt: "27.04.2026 16:11",
    errorsCount: 0,
  },
  {
    id: "T-2037",
    projectName: "Гостиница «Прибрежная»",
    customer: "ООО «Прибрежье-Девелопмент»",
    documentType: "Пояснительная записка",
    stage: "ocr",
    priority: "low",
    assignee: null,
    slaHours: 24,
    createdAt: "27.04.2026 12:10",
    updatedAt: "27.04.2026 12:33",
    errorsCount: 0,
  },
  {
    id: "T-2036",
    projectName: "Производственный цех №2",
    customer: "АО «ПромМаш»",
    documentType: "Пояснительная записка",
    stage: "published",
    priority: "normal",
    assignee: "А. Петров",
    slaHours: 0,
    createdAt: "26.04.2026 10:00",
    updatedAt: "26.04.2026 17:45",
    errorsCount: 0,
  },
];

export interface ManualTicket extends AdminTicket {
  reason: string;
  steps: { id: string; label: string; done: boolean }[];
}

export const MANUAL_QUEUE: ManualTicket[] = [
  {
    ...ADMIN_TICKETS[1],
    reason: "XSD не прошёл, нестандартная структура раздела 3",
    steps: [
      { id: "s1", label: "Зафиксировать причину ухода в manual", done: true },
      { id: "s2", label: "Назначить инженера", done: true },
      { id: "s3", label: "Ручная сборка в схемном редакторе", done: false },
      { id: "s4", label: "Повторная XSD + бизнес-валидация", done: false },
      { id: "s5", label: "Передать в QA", done: false },
    ],
  },
  {
    id: "T-2034",
    projectName: "Складской комплекс «Восток»",
    customer: "ООО «ВостокЛогистика»",
    documentType: "Задание на проектирование",
    stage: "manual",
    priority: "high",
    assignee: "С. Иванов",
    slaHours: 6,
    createdAt: "25.04.2026 15:20",
    updatedAt: "26.04.2026 09:05",
    errorsCount: 3,
    reason: "Сканы низкого качества, OCR confidence < 0.6",
    steps: [
      { id: "s1", label: "Зафиксировать причину ухода в manual", done: true },
      { id: "s2", label: "Назначить инженера", done: true },
      { id: "s3", label: "Ручная сборка в схемном редакторе", done: true },
      { id: "s4", label: "Повторная XSD + бизнес-валидация", done: false },
      { id: "s5", label: "Передать в QA", done: false },
    ],
  },
];

export interface QAItem {
  id: string;
  ticketId: string;
  projectName: string;
  builtBy: string;
  receivedAt: string;
  xsdPassed: boolean;
  businessRulesPassed: boolean;
  reviewer: string | null;
}

export const QA_QUEUE: QAItem[] = [
  {
    id: "QA-118",
    ticketId: "T-2041",
    projectName: "ЖК «Северный квартал», корпус 3",
    builtBy: "А. Петров",
    receivedAt: "28.04.2026 11:40",
    xsdPassed: true,
    businessRulesPassed: true,
    reviewer: null,
  },
  {
    id: "QA-117",
    ticketId: "T-2030",
    projectName: "Бизнес-центр «Меридиан»",
    builtBy: "С. Иванов",
    receivedAt: "28.04.2026 10:05",
    xsdPassed: true,
    businessRulesPassed: false,
    reviewer: "М. Соколова",
  },
];

export interface PublishItem {
  id: string;
  ticketId: string;
  projectName: string;
  customer: string;
  approvedBy: string;
  approvedAt: string;
  archiveSize: string;
}

export const PUBLISH_QUEUE: PublishItem[] = [
  {
    id: "PUB-204",
    ticketId: "T-2036",
    projectName: "Производственный цех №2",
    customer: "АО «ПромМаш»",
    approvedBy: "М. Соколова",
    approvedAt: "26.04.2026 17:30",
    archiveSize: "12.4 МБ",
  },
  {
    id: "PUB-203",
    ticketId: "T-2032",
    projectName: "ТРЦ «Радуга»",
    customer: "ООО «Радуга-Инвест»",
    approvedBy: "М. Соколова",
    approvedAt: "26.04.2026 12:11",
    archiveSize: "8.1 МБ",
  },
];

export type BugSeverity = "low" | "medium" | "high" | "critical";
export type BugStatus = "new" | "in_progress" | "resolved" | "wontfix";

export const BUG_STATUS_LABELS: Record<BugStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  resolved: "Решён",
  wontfix: "Не будет исправлено",
};

export interface BugItem {
  id: string;
  title: string;
  ticketId?: string;
  severity: BugSeverity;
  status: BugStatus;
  reporter: string;
  assignee: string | null;
  createdAt: string;
  category: "ocr" | "extraction" | "xsd" | "business_rules" | "ui" | "other";
}

export const BUGS: BugItem[] = [
  {
    id: "BUG-512",
    title: "OCR теряет таблицы при повороте 270°",
    ticketId: "T-2034",
    severity: "high",
    status: "in_progress",
    reporter: "С. Иванов",
    assignee: "Команда OCR",
    createdAt: "26.04.2026",
    category: "ocr",
  },
  {
    id: "BUG-511",
    title: "Бизнес-правило: дублирование ОКПО для линейных объектов",
    ticketId: "T-2038",
    severity: "medium",
    status: "new",
    reporter: "А. Петров",
    assignee: null,
    createdAt: "27.04.2026",
    category: "business_rules",
  },
  {
    id: "BUG-510",
    title: "Схемный редактор: пропадает фокус при добавлении вложенного элемента",
    severity: "low",
    status: "new",
    reporter: "М. Соколова",
    assignee: null,
    createdAt: "27.04.2026",
    category: "ui",
  },
  {
    id: "BUG-509",
    title: "XSD validator: неинформативная ошибка для пустых date-полей",
    ticketId: "T-2040",
    severity: "critical",
    status: "in_progress",
    reporter: "С. Иванов",
    assignee: "Команда XML",
    createdAt: "26.04.2026",
    category: "xsd",
  },
];

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    category: "Загрузка документов",
    question: "Какие форматы документов поддерживаются?",
    answer:
      "Принимаются PDF, DOCX, сканы (JPG/PNG/TIFF) и архивы ZIP с приложениями. Один файл — до 50 МБ, проект — до 500 МБ.",
  },
  {
    id: "f2",
    category: "Загрузка документов",
    question: "Что делать, если скан низкого качества?",
    answer:
      "Система автоматически прогонит OCR. Если уверенность распознавания низкая, мы пометим поля и попросим вас уточнить значения вручную.",
  },
  {
    id: "f3",
    category: "Генерация XML",
    question: "Сколько времени занимает формирование XML?",
    answer:
      "Стандартное задание — 5–15 минут. Большие пояснительные записки с приложениями могут обрабатываться до 1 часа.",
  },
  {
    id: "f4",
    category: "Генерация XML",
    question: "Можно ли отредактировать XML перед отправкой?",
    answer:
      "Да. На шаге предпросмотра доступен безопасный текстовый редактор и схемный редактор для точечных правок.",
  },
  {
    id: "f5",
    category: "Тарифы и оплата",
    question: "Что значит «оплата за генерацию»?",
    answer:
      "Вы платите фиксированную сумму за каждый успешно сформированный документ. Повторная генерация после правок оплачивается отдельно.",
  },
  {
    id: "f6",
    category: "Тарифы и оплата",
    question: "Чем отличается тариф «Без лимитов»?",
    answer:
      "Подходит экспертным организациям: до 12 000 пояснительных записок в месяц без доплат за каждую генерацию.",
  },
  {
    id: "f7",
    category: "Безопасность",
    question: "Как защищены загруженные документы?",
    answer:
      "Все файлы хранятся в зашифрованном виде. Доступ — только у участников вашей организации. Документы автоматически удаляются через 90 дней после завершения проекта.",
  },
  {
    id: "f8",
    category: "Документы и закрывающие",
    question: "Как получить счёт и акт?",
    answer:
      "Счета и закрывающие документы доступны в разделе «Биллинг и документы» сразу после оплаты. Можно скачать PDF или подписанный электронной подписью комплект.",
  },
];
