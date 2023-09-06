export const mockUser = {
    id: "no_id",
    dateOfCreation: 12345678,
    avatar: "avtrurl",
    name: "abc",
    kaggleID: "abcdef",
    rollNo: "105",
    email: "abc@gmail.com",
    rank: 9,
    competitions: [{
      competition_id: 1223,
      rank: 9,
      score: 1300,
      scoreWeightages: {
        ML : 0.3,
        NLP: 0.7
      },
    }],
    score : {
      total : 0,
      split : {
        CV: 0.7,
        ML: 0.3
      }
    },
    phoneNo: "9876543210",
  };
  
export const mockCompetition = {
    title: "",
    competition_id: 12234,
    register_url: "www.",
    leaderboard_url: "",
    startDate: '',
    endDate: '',
    tabs: [
      {
        tab_name: "",
        content: "",
      },
    ],
    tagWeightages: [
      {
        tagName: "NLP",
        weightage: 0.7,
      },
    ],
    scoringRule: [{
      rank: 1,
      score: 200
    },
  {
    rank: 'others',
    score: 20
  }],
    ranks:[
      {
        rank: 1,
        teamName: 'something',
        teamMembers: ['kID_A','kID_B']
      },
    ]
  };
  
  
export const mockAnnoucement = {
    title: '',
    date: '',
    content: '',
    display: true
  }
  