const setOrder = (username: string, itemname: string, quantity: number) => {
    const query = 
    `
    INSERT INTO orders (user_id, item_id, quantity) VALUES (
        (SELECT id FROM auth WHERE name =  '${username}'),
        (SELECT id FROM grocery WHERE name = '${itemname}'),
        '${quantity}'
    )`
    return query
}

const viewGrocery = () => {
    const query =
    `
    SELECT name FROM grocery
    `
    return query
}

export { setOrder, viewGrocery }