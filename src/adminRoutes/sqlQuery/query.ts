const addItem = (name: string, quantity: string, unit: "KG" | "NOS" ) => {
    const query =
    `INSERT INTO grocery (name, quantity, unit) VALUES ('${name}', '${quantity}', '${unit}')`
    return query
}

const deleteItem = (name: string) => {
    const query =
    `DELETE FROM grocery WHERE name = '${name}'`
    return query
}

const updateItem = (name: string, quantity: string, unit: "KG" | "NOS") => {
    const query =
    `UPDATE grocery SET quantity = '${quantity}', unit = '${unit}' WHERE name = '${name}'`
    return query
}

const getItems = (name?: string) => {
    if(name){
        const query =
        `SELECT * FROM grocery WHERE name = '${name}'`
        return query
    }
    else{
        const query = 
        `SELECT * FROM grocery`
        return query
    }
}

export { addItem, deleteItem, updateItem, getItems }