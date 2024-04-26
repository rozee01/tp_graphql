import { mock_database } from "../src/tables";
import { CV as CVType, Skill, User } from "../src/tables";
export const Query = {
    getAllCVs: (): CVType[] => {
        return mock_database.cvs;
      },
    
      getCVById: (parent,args): CVType | undefined => {
        return mock_database.cvs.find(cv => cv.id === args.id);
      },
    
      /*CV: {
        skills: (parent: CV): Skill[] => {
          return parent.skillIds.map(skillId => mock_database.skills.find(skill => skill.id === skillId)!);
        },
        owner: (parent: CV): User | undefined => {
          return mock_database.users.find(user => user.id === parent.ownerId);
        }
      }*/
}
export const CV= {
    skills: (parent): Skill[] => {
      // Récupérer les compétences associées à ce CV à partir de la base de données
            //return parent.skillIds.map(skillId => mock_database.skills.find(skill => skill.id === skillId)!);
        return mock_database.skills.filter(skill => parent.skillIds.includes(skill.id));
    },
    user: (parent): User | undefined => {
      // Récupérer l'utilisateur associé à ce CV à partir de la base de données
      return mock_database.users.find(user => user.id === parent.ownerId);
    }
  };