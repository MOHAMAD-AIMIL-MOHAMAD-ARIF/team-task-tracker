import type { ReactNode } from "react";
import "./SectionHeader.css";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

function SectionHeader({ title, subtitle, actions }: SectionHeaderProps) {
  return (
    <header className="ui-section-header">
      <div>
        <h1 className="ui-section-header__title">{title}</h1>
        {subtitle ? (
          <p className="ui-section-header__subtitle">{subtitle}</p>
        ) : null}
      </div>

      {actions ? <div className="ui-section-header__actions">{actions}</div> : null}
    </header>
  );
}

export default SectionHeader;