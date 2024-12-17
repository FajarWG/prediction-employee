import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Employee Promotion Prediction
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

