import SignInForm from "./SignInForm"

const Page = () => {

    return (
        <div className="min-h-screen grid grid-cols-2">
            {/* Left side - Form */}

            <div className="w-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
                <div className="h-full bg-black bg-opacity-30 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">
                        Welcome to link up
                    </h3>
                    <p className="mt-2  text-white">
                        Join thousands of users who trust us for their business needs.
                    </p>
                </div>
            </div>

            {/* Right side form  */}

            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Login to your account
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Welcome back, lets get started again
                        </p>
                    </div>
                    <SignInForm />

                </div>
            </div>
        </div>


    )
}

export default Page