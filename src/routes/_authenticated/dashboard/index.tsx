import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/dashboard/")({
    component: DashboardPage,
})

function DashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Blogs</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
                </div>
            </div>
        </div>
    )
}
