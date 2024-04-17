import Link from "next/link";

export default function DashboardCard({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="outline outline-white-100 p-3">
        <h1>{title}</h1>
      </div>
    </Link>
  );
}
