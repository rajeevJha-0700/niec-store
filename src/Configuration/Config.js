const config = {
    Url: String(import.meta.env.VITE_URL),
    PublicKeyCredential: String(import.meta.env.VITE_PUBLIC_KEY),
    project : String(import.meta.env.VITE_PROJECT)
}

export default config;