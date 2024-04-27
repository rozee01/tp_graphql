//definition des types 
export interface Skill {
    id: string;
    designation: string;
  }
export interface User {
  id: string;
  name: string;
  email: string;
  role: role
}
export enum role{
  user,
  admin
}
  export interface CV {
    id: string;
    name: string;
    age: number;
    job: string;
    ownerId: string;
    skillIds: string[]; // Référence aux IDs des skills
  }
  
  export interface Database {
    users: User[];
    cvs: CV[];
    skills: Skill[];
  }

  //instanciation
  const user1 : User = {
    id: "1", name: "arij", email: "arij@gmail.com", role : role.user
  }
  const user2 : User ={ 
    id: "2", name: "John", email: "john@example.com" , role : role.user}
  const user3 : User ={
    id: "3", name: "amine", email: "amine@gmail.com", role : role.user
  }

  const skill1 : Skill = {
    id: "1", designation: "JavaScript" 
  }
  const skill2 : Skill = {
    id: "2", designation: "React" 
  }
  const skill3 : Skill = {
    id: "3", designation: "ma9rouna" 
  }
  const skill4 : Skill = {
    id: "4", designation: "kosksi" 
  }
  
  const cv1 : CV ={ 
    id: "12345", name: "FullStack", age: 41, job: "Freelancer", ownerId: user1.id, skillIds: [skill1.id,skill2.id] 
  }
  const cv2 : CV ={ 
    id: "123456", name: "chef", age: 41, job: "private chef", ownerId: user2.id, skillIds: [skill4.id] 
  }

  export const mock_database: Database = {
    users: [
      user1,
      user2,
      user3
    ],
    cvs: [
      cv1,
      cv2
    ],
    skills: [
      skill1,
      skill2,
      skill3,
      skill4
    ],
  };
  

  

    /*getUserById(userId: string): User | undefined {
      return this.data.users.find(user => user.id === userId);
    }
  
    getCVById(cvId: string): CV | undefined {
      return this.data.cvs.find(cv => cv.id === cvId);
    }
  
    getCVsByUserId(userId: string): CV[] {
      return this.data.cvs.filter(cv => cv.ownerId === userId);
    }
  
    getSkillsByCVId(cvId: string): Skill[] {
      const cv = this.getCVById(cvId);
      if (cv) {
        return this.data.skills.filter(skill => cv.skillIds.includes(skill.id));
      }
      return [];
    }*/
  
  
  
  // Obtenir les compétences d'un CV par son ID
  //const cvSkills = context.getSkillsByCVId("12345");
  //console.log(cvSkills);
  