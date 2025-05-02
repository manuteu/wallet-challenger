import PrivateRoute from "@/shared/components/private-route"

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div>
        Dashboard
      </div>
    </PrivateRoute>
  )
}