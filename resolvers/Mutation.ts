import { prisma } from "../src/script";
import { mock_database } from "../src/tables";
import { CV } from "../src/tables";
import { v4 as uuidv4 } from "uuid";
export const Mutation = {
  addCV: (parent, args, context): CV => {
    const newCV: CV = {
      id: uuidv4(),
      name: args.input.name,
      age: args.input.age,
      job: args.input.job,
      ownerId: args.input.ownerId,
      skillIds: args.input.skillIds,
    };

    mock_database.cvs.push(newCV);
    console.log(mock_database.cvs);
    return newCV;
  },

  updateCV: (parent, args, context): CV | null => {
    const id = args.input.id;
    const existingCVIndex = mock_database.cvs.findIndex((cv) => cv.id === id);

    if (existingCVIndex === -1) {
      throw new Error("CV not found.");
    }

    // Check if the user exists
    const userExists = mock_database.users.some(
      (user) => user.id === args.input.ownerId
    );
    if (!userExists) {
      throw new Error("The specified user does not exist.");
    }
    const skillIds = args.input.skillIds;
    // Check if each skill exists
    const skillsExist = skillIds.every((skillId) =>
      mock_database.skills.some((skill) => skill.id === skillId)
    );
    if (!skillsExist) {
      throw new Error("Some specified skills do not exist.");
    }
    const updateCV = {
      ...mock_database.cvs[existingCVIndex],
      ...args.input,
    };

    mock_database.cvs[existingCVIndex] = updateCV;

    return mock_database.cvs[existingCVIndex];
  },

  deleteCV: ({ id }: { id: string }): string => {
    const existingCVIndex = mock_database.cvs.findIndex((cv) => cv.id === id);

    if (existingCVIndex === -1) {
      throw new Error("CV not found.");
    }

    mock_database.cvs.splice(existingCVIndex, 1);
    return id;
  },
  addCVPrisma: async (parent, args, context): Promise<String> => {
    try {
      const createdCv = await prisma.cV.create({
        data: {
          id: uuidv4(),
          name: args.input.name,
          age: args.input.age,
          job: args.input.job,
          owner: {
            connect: { id: args.input.ownerId },
          },
          skills: {
            create: args.input.skillIds.map((skillId) => ({
              id: uuidv4(),
              skill: { connect: { id: skillId } },
            })),
          },
        },
      });
      return createdCv.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  deleteCVPrisma: async (parent, args, context): Promise<String> => {
    try {
      const deleteRelations = await prisma.skillCV.deleteMany({
        where: {
          cvId: args.id,
        },
      });
      const deletedCv = await prisma.cV.delete({
        where: {
          id: args.id,
        },
      });
      return deletedCv.id+ " deleted";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
};
