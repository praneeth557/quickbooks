import { useEffect, useState } from "react";
import "./Template.css";

const Template = () => {
  const [templates, setTemplates] = useState<any>({});

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const response = await fetch(
      "https://8ff3-67-169-154-142.ngrok-free.app/template"
    );
    const data = await response.json();
    setTemplates(() => data);
  };

  const getTemplateName = (str: string) => {
    return str
      .split("")
      .map(function (word, index) {
        if (index === 0) {
          return word.toUpperCase();
        }
        return word.toLowerCase();
      })
      .join("");
  };

  const getImgUrl = (name: string) => {
    return `${name}.png`;
  };

  const onTemplateOpen = (url: any) => {
    window.open(url, "_blank");
  };

  return (
    <div className="templates">
      <h2 className="templates-header">Choose your template</h2>
      {Object.keys(templates).map((template: any, idx: number) => {
        return (
          <div className="template" key={idx}>
            <h3 className="template-header">{getTemplateName(template)}</h3>
            <div className="template-links">
              {templates[template].map((data: any, templateIdx: number) => {
                return (
                  <button
                    key={templateIdx}
                    className="logo-btn"
                    onClick={() => onTemplateOpen(data.url)}
                  >
                    <img
                      src={getImgUrl(data.name)}
                      alt={data.name}
                      width="150"
                      height="60"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Template;
