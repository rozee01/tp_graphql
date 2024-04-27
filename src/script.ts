// 1
import { PrismaClient, Role } from '@prisma/client'
import { connect } from 'http2'
 
// 2
export const prisma = new PrismaClient()
 
// 3
async function main() {
    
    const newUser = await prisma.user.create({
        data: {
            id:'22',
            name: 'Arij',
            email: 'arij@gmail.com',
            role: Role.USER,
        },
    })
    const newSkill1 = await prisma.skill.create({
        data: {
            id:'55',
            designation: 'JavaScript',
        },
    })
    const newSkill2 = await prisma.skill.create({
        data: {
            id:'66',
            designation: 'React',
        },
    })
    
    const newSkillCv = await prisma.skillCV.create({
        data: {
            id:'77',
            skillId: newSkill1.id
        },    
    })
    const newSkillCv2 = await prisma.skillCV.create({
        data: {
            id:'88',
            skillId: newSkill2.id
        },    
    })
    const newCV = await prisma.cV.create({
        data: {
            id:'33',
            name: 'FullStack',
            age: 41,
            job: 'Freelancer',
            owner: 
                {connect: { id: '1' }},
            skills: { 
               connect: [{ id : '1'},{ id : '2' }],
            },
        },
    
    })
    const allCvs = await prisma.cV.findMany()
    console.log(allCvs)
}
 
// 4
//main()
  // 5
  //.finally(async () => {
    //await prisma.$disconnect()
  //})