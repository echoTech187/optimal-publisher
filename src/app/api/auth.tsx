const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function signInAction(data: any) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        const res = await result.original;
        if (res?.code === 200) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));
            const exp = Date.now() + res.expires_in;
            localStorage.setItem("expires_in", exp);
            return { status: 200, message: 'Selamat Datang ' + res.user.full_name + ' di Optimal Penerbit' };
        } else {
            return { status: 400, message: res.message };
        }
    } catch (error: any) {
        return { status: 400, message: error.message };
    }
}
export { signInAction };