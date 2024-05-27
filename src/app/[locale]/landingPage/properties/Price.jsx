import { useLocale, useTranslations } from "next-intl";
import Typography from "../../components/Shared/Typography";

function Price({ price, period, paymentType }) {
  const t = useTranslations("Properties.Price")
  const locale = useLocale()
  return (
    (period && price) ? <>
      <div className={`flex ${locale === "ar" && "flex-row-reverse"} gap-x-1 items-end`}>
        {price && <Typography
          variant="body-2xl-extrabold"
          as="p"
          className="tracking-tightest text-main-yellow-600"
        >
          {t('KWD')} {price}
        </Typography>}
        {period && <span> / </span>}
        {paymentType === "rent" && <Typography variant="body-md-medium" as="p" className="text-gray-400">
          {period && `${t(period)}`}
        </Typography>}
      </div>
    </>
      :
      <Typography variant="body-md-medium" as="p" className="text-gray-400">
        {t("no-price")}
      </Typography>
  );
}

export default Price;
