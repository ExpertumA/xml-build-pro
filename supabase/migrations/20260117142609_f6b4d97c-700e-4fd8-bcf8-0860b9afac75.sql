-- Update plans table to match the new package structure (START, PRO, EXPERT)
-- First, delete old plans
DELETE FROM public.plans;

-- Insert new generation packages
INSERT INTO public.plans (id, name, description, price_monthly, credits_monthly, max_documents, max_file_size_mb, is_active, features) VALUES
  (gen_random_uuid(), 'START', 'Базовый пакет для начала работы', 15000, 10, NULL, 100, true, 
   '["Задание на проектирование", "Пояснительная записка", "Конъюнктурный анализ"]'::jsonb),
  (gen_random_uuid(), 'PRO', 'Оптимальный пакет для активной работы', 39000, 30, NULL, 100, true, 
   '["Все документы START", "Ведомость объёмов работ", "XML-схема заключения экспертизы"]'::jsonb),
  (gen_random_uuid(), 'EXPERT', 'Максимальный пакет с приоритетной обработкой', 69000, 60, NULL, 500, true, 
   '["Все типы документов", "Приоритетная обработка"]'::jsonb),
  (gen_random_uuid(), 'TEST', 'Тестовый пакет для ознакомления с сервисом', 0, 3, NULL, 50, true, 
   '["Задание на проектирование", "Пояснительная записка"]'::jsonb);

-- Add package_type to company_subscriptions to track which package tier
ALTER TABLE public.company_subscriptions 
ADD COLUMN IF NOT EXISTS package_name TEXT;