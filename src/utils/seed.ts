import { db } from "./db"

export async function resetDb(){
    await db.category.deleteMany()
    await db.language.deleteMany()
    await db.translation.deleteMany()
    await db.user.deleteMany()
    await db.word.deleteMany()
    await db.wordAttempt.deleteMany()

    createUsers()
    createLanguages()
    const categoryIds = await createCategories()
    const wordsId = await createWords(categoryIds)
    // createTranslations(wordsId)  
}

//Creates 5 users who have:
// name: useri  password: 1  email: useri@gmail.com  lannguage: spanish
async function createUsers(){
    for (let i = 1; i < 6; i++) {
        await db.user.create({
            data: {
                name: "user" + i,
                password: String(i),
                email: "user"+i+"@gmail.com",
                language: "spanish"
            }
        })
    }

    await db.user.update({
        where: {email: "user1@gmail.com"},
        data: {
            isAdmin: true
        }
    })
}

async function createLanguages(){
    await db.language.createMany(
        {
            data: [{name: 'spanish'}, {name: "italian"}]
        }
    )
}

async function createCategories() {

    const home = await db.category.create({
        data: {name: "home"}
    })
    const school = await db.category.create({
        data: {name: "school"}
    })

    return [home.id, school.id]
}


async function createWords(categoryIds: number[]){
    const wordsId = []

    wordsId.push(await db.word.create({data: {inEnglish: "chair", categoryId: categoryIds[0]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "bathroom", categoryId: categoryIds[0]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "desk", categoryId: categoryIds[0]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "window", categoryId: categoryIds[0]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "door", categoryId: categoryIds[0]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "pencil", categoryId: categoryIds[1]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "blackboard", categoryId: categoryIds[1]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "teacher", categoryId: categoryIds[1]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "student", categoryId: categoryIds[1]}}))
    wordsId.push(await db.word.create({data: {inEnglish: "schoolbag", categoryId: categoryIds[1]}}))

    return wordsId.map((word) => word.id)
}

