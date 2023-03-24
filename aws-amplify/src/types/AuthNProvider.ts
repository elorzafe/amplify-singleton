interface SignIn { ({username, password}: {username: string, password: string}): Promise<void> };
interface SignOut { (): Promise<void> };

export type { SignIn, SignOut };