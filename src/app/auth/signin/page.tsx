export default function SignInForm() {
    return (
        <>
            <form action="/api/auth/signin" method="post" className="max-w-sm mx-auto w-full">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">No. Telepon</label>
                    <input type="email" name="phone" autoFocus className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input type="password" name="password" className="input rounded-md bg-white/50 border-white/40 hover:border-white/45  hover:shadow-outline hover:outline-none active:border-white/50 focus:border-white/50 focus:outline-none focus:shadow-outline focus-within:border-white/50 in-focus:border-white/50" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="block w-full bg-fuchsia-800 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                </div>
            </form>
        </>
    );
}