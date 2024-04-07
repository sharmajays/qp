import { app } from "./app"
import { dbCon } from "./db/dbCon"

const PORT = 3000

app.listen(PORT, () => {

    console.log(`NeedFulls is running at http://localhost:${PORT}`);

    dbCon.connect(function(err: any) {
        if (err) throw err;
        console.log("DB Connected Successfully!");
    });

});