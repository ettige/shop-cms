
export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {

    console.log(params.storeId)
    return (
        <div>
            {children}
        </div>
    )
}