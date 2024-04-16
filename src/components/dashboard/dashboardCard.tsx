export default function DashboardCard({ title }: { title: string }) {
    return (
        <div className="outline p-3">
            <a>{title}</a>
        </div>
    )
}