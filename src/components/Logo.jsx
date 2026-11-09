export function Logo({ onClick, tone = "light" }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag className={`logo logo-${tone}`} onClick={onClick} type={onClick ? "button" : undefined}>
      <span className="logo-mark" aria-hidden="true">
        K
      </span>
      <span className="logo-type">
        <strong>MR. K</strong>
        <em>RAMEN</em>
      </span>
    </Tag>
  );
}
