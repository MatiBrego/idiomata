import { connect } from "http2"
import { db } from "./db"

export async function resetDb(){
    await db.category.deleteMany()
    await db.language.deleteMany()
    await db.translation.deleteMany()
    await db.user.deleteMany()
    await db.word.deleteMany()
    await db.wordAttempt.deleteMany()

    const languagesId = await createLanguages()
    createUsers()
    const categoryIds = await createCategories()
    const wordsId = await createWords(categoryIds)
    createTranslations(wordsId, languagesId)  
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
                language: {connect: {name: "spanish"}}
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
    const languagesId = [] 

    languagesId.push((await db.language.create({data: {name: 'spanish'}})).id)
    languagesId.push((await db.language.create({data: {name: 'italian'}})).id)

    return languagesId
}

async function createCategories() {

    const home = await db.category.create({
        data: {name: "home", imgPath: ""}
    })
    const school = await db.category.create({
        data: {name: "school", imgPath:""}
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

async function createTranslations(wordsId: number[], languagesId: number[]) {
    await db.translation.create({data: {wordId: wordsId[0], translated: "silla", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[0], translated: "sedia", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[1], translated: "baño", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[1], translated: "bagno", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[2], translated: "escritorio", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[2], translated: "scrivania", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[3], translated: "ventana", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[3], translated: "finestra", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[4], translated: "puerta", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[4], translated: "porta", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[5], translated: "lápiz", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[5], translated: "matita", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[6], translated: "pizarra", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[6], translated: "lavagna", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[7], translated: "profesor", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[7], translated: "insegnante", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[8], translated: "estudiante", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[8], translated: "studente", languageId: languagesId[1], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[9], translated: "mochila", languageId: languagesId[0], difficulty: "EASY"}})
    await db.translation.create({data: {wordId: wordsId[9], translated: "zaino", languageId: languagesId[1], difficulty: "EASY"}})
}

