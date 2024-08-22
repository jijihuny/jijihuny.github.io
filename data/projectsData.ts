interface Project {
  title: string,
  description: string,
  href?: string,
  imgSrc?: string,
}

const projectsData: Project[] = [
  {
    title: '어디갈래',
    description: `여행 경로를 기록하는 것을 목표로 기획한 서비스 '어디갈래'`,
    href: 'https://github.com/boostcampwm2023/iOS03-TravelShare',
  },
  {
    title: '2024 인하 인공지능 챌린지',
    description: `2024 인하 인공지능 챌린지에서 경제 관련 질의응답을 위한 LLM을
    개발하고 대상을 수상하였습니다.`,
    href: 'https://dacon.io/competitions/official/236291/overview/description',
  },
]

export default projectsData
