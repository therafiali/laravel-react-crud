import { useTranslation } from "react-i18next";

export default function LangChange() {
  const { t, i18n } = useTranslation();

  return (
    <div className="my-4">
      <h1>{t("title")}</h1>
      <p>{t("message")}</p>

      <button className="bg-blue-500 text-white py-1 px-4" onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button className="bg-teal-500 text-white py-1 px-4" onClick={() => i18n.changeLanguage("ur")}>UR</button>
    </div>
  );
}
