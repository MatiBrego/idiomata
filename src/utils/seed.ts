import { connect } from "http2"
import { db } from "./db"

export async function resetDb(){
    await db.category.deleteMany()
    await db.language.deleteMany()
    await db.translation.deleteMany()
    await db.user.deleteMany()
    await db.word.deleteMany()
    await db.wordAttempt.deleteMany()
    await db.sentence.deleteMany()

    const languagesId = await createLanguages()
    createUsers()
    await createCategories()
}

//Creates 5 users who have:
// name: useri  password: i  email: useri@gmail.com  lannguage: spanish
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
    languagesId.push((await db.language.create({data: {name: 'french'}})).id)

    return languagesId
}

async function createCategories() {

    await db.category.create({
        data: {name: "home"}
    })
    await db.category.create({
        data: {name: "school"}
    })
    await db.category.create({
        data: {name: "food"}
    })
    await db.category.create({
        data: {name: "vehicle"}
    })
    await db.category.create({
        data: {name: "technology"}
    })
    await db.category.create({
        data: {name: "music"}
    })
    await db.category.create({
        data: {name: "kitchen"}
    })
    await db.category.create({
        data: {name: "clothing"}
    })
    await db.category.create({
        data: {name: "nature"}
    })
    await db.category.create({
        data: {name: "celestial"}
    })
    await db.category.create({
        data: {name: "communication"}
    })
    await db.category.create({
        data: {name: "sports"}
    })
    await db.category.create({
        data: {name: "flower"}
    })
    await db.category.create({
        data: {name: "furniture"}
    })
    await db.category.create({
        data: {name: "geography"}
    })
    await db.category.create({
        data: {name: "animal"}
    })
    await db.category.create({
        data: {name: "movie"}
    })
    await db.category.create({
        data: {name: "beverage"}
    })
}

