import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OfferSectionProps {
  offerAccepted: boolean;
  offerDetails?: {
    acceptedAt: string;
    version: string;
    method: string;
    ip?: string;
  };
  onAcceptOffer: (method: string, phone?: string) => void;
}

const OFFER_TEXT = `ПУБЛИЧНАЯ ОФЕРТА
на предоставление услуг по формированию XML-документов

1. ОБЩИЕ ПОЛОЖЕНИЯ

1.1. Настоящая публичная оферта (далее — «Оферта») является официальным предложением ООО «XML Expert» (далее — «Исполнитель») адресованным неопределённому кругу лиц заключить договор возмездного оказания услуг на условиях, изложенных в настоящей Оферте.

1.2. Публикация настоящей Оферты на официальном сайте Исполнителя по адресу xmlpro.ru является официальной публичной офертой.

1.3. Полным и безоговорочным акцептом настоящей Оферты является совершение Заказчиком любого из следующих действий:
- Оплата услуг Исполнителя;
- Регистрация на сайте и подтверждение акцепта Оферты с использованием SMS-кода;
- Проставление отметки о принятии условий Оферты в личном кабинете.

2. ПРЕДМЕТ ОФЕРТЫ

2.1. Исполнитель обязуется оказывать Заказчику услуги по формированию машиночитаемых XML-документов в соответствии с требованиями Министерства строительства и жилищно-коммунального хозяйства Российской Федерации.

2.2. Результатом оказания услуг является XML-файл, соответствующий действующим XSD-схемам Минстроя России.

3. ПОРЯДОК ОКАЗАНИЯ УСЛУГ

3.1. Заказчик загружает исходные документы в личном кабинете на сайте Исполнителя.

3.2. Исполнитель формирует XML-документ на основании загруженных данных.

3.3. Заказчик получает возможность скачать готовый XML-документ в личном кабинете.

4. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЁТОВ

4.1. Стоимость услуг определяется в соответствии с действующими тарифами, опубликованными на сайте Исполнителя.

4.2. Оплата услуг производится в безналичном порядке путём перечисления денежных средств на расчётный счёт Исполнителя или с использованием банковских карт.

4.3. Услуга считается оказанной с момента предоставления Заказчику возможности скачать сформированный XML-документ.

5. ОТВЕТСТВЕННОСТЬ СТОРОН

5.1. Исполнитель гарантирует соответствие формируемых XML-документов действующим требованиям XSD-схем Минстроя России на момент формирования документа.

5.2. Исполнитель не несёт ответственности за содержание исходных данных, предоставленных Заказчиком.

5.3. Исполнитель не несёт ответственности за изменения в требованиях Минстроя России, произошедшие после формирования XML-документа.

6. КОНФИДЕНЦИАЛЬНОСТЬ

6.1. Исполнитель обязуется не передавать третьим лицам информацию, полученную от Заказчика, за исключением случаев, предусмотренных законодательством Российской Федерации.

6.2. Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».

7. ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ

7.1. Все споры и разногласия разрешаются путём переговоров.

7.2. При невозможности достижения согласия путём переговоров споры подлежат рассмотрению в Арбитражном суде г. Москвы.

8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ

8.1. Настоящая Оферта вступает в силу с момента её публикации на сайте Исполнителя и действует до момента её отзыва Исполнителем.

8.2. Исполнитель оставляет за собой право вносить изменения в условия Оферты. Изменения вступают в силу с момента публикации новой редакции Оферты на сайте.

8.3. Продолжение использования услуг после внесения изменений означает согласие Заказчика с новой редакцией Оферты.

Редакция от 15.01.2025
Версия 1.0

ООО «XML Expert»
ИНН: 7707123456
ОГРН: 1234567890123`;

const OfferSection = ({ offerAccepted, offerDetails, onAcceptOffer }: OfferSectionProps) => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [phone, setPhone] = useState("");

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (isAtBottom) {
      setScrolledToBottom(true);
    }
  };

  const handleConfirm = () => {
    setShowSmsVerification(true);
  };

  const handleSmsConfirm = () => {
    if (smsCode === "1234") {
      onAcceptOffer("sms", phone);
      setDialogOpen(false);
      setShowSmsVerification(false);
      setSmsCode("");
      setCheckboxChecked(false);
      setScrolledToBottom(false);
    } else {
      toast({
        title: "Неверный код",
        description: "Введите корректный SMS-код",
        variant: "destructive",
      });
    }
  };

  const handleSkipSms = () => {
    onAcceptOffer("checkbox");
    setDialogOpen(false);
    setShowSmsVerification(false);
    setCheckboxChecked(false);
    setScrolledToBottom(false);
  };

  const canConfirm = scrolledToBottom && checkboxChecked;

  if (offerAccepted && offerDetails) {
    return (
      <Card className="border-success/30">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-medium text-sm">Оферта принята</p>
                <p className="text-xs text-muted-foreground">
                  {offerDetails.acceptedAt} • v{offerDetails.version} • {
                    offerDetails.method === 'sms' ? 'SMS' :
                    offerDetails.method === 'payment' ? 'Оплата' : 'ЛК'
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setDialogOpen(true)}>
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              Открыть
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="font-medium text-sm text-warning">Оферта не принята</p>
                <p className="text-xs text-muted-foreground">
                  Для активации тарифа необходимо принять оферту
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Открыть
              </Button>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                Принять
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Публичная оферта</DialogTitle>
            <DialogDescription>
              Пожалуйста, ознакомьтесь с условиями публичной оферты
            </DialogDescription>
          </DialogHeader>

          {!showSmsVerification ? (
            <>
              <ScrollArea 
                className="h-[400px] rounded-md border p-4"
                onScrollCapture={handleScroll}
              >
                <div className="whitespace-pre-wrap text-sm">
                  {OFFER_TEXT}
                </div>
              </ScrollArea>

              {!scrolledToBottom && (
                <p className="text-sm text-muted-foreground text-center">
                  ↓ Прокрутите до конца документа
                </p>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="accept"
                  checked={checkboxChecked}
                  onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
                  disabled={!scrolledToBottom}
                />
                <Label
                  htmlFor="accept"
                  className={`text-sm ${!scrolledToBottom ? 'text-muted-foreground' : ''}`}
                >
                  Я принимаю условия публичной оферты
                </Label>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleConfirm} disabled={!canConfirm}>
                  Подтвердить
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Для подтверждения принятия оферты введите код из SMS
                </p>
                <div className="space-y-2">
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-code">Код из SMS</Label>
                  <Input
                    id="sms-code"
                    placeholder="Введите код"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    maxLength={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Демо-режим: используйте код 1234
                  </p>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="ghost" onClick={handleSkipSms} className="sm:mr-auto">
                  Принять без SMS
                </Button>
                <Button variant="outline" onClick={() => setShowSmsVerification(false)}>
                  Назад
                </Button>
                <Button onClick={handleSmsConfirm}>
                  Подтвердить
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfferSection;
