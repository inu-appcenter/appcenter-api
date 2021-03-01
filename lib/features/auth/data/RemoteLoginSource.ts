interface RemoteLoginSource {
    tryLogin(id: string, password: string): Promise<boolean>
}
