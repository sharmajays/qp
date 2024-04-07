const login = (name: string, password: string, type: "admin" | "user" ) => {
    const query =
    `SELECT * FROM auth WHERE NAME = '${name}' AND PASSWORD = '${password}' AND TYPE = '${type}'`
    return query
}

export { login }