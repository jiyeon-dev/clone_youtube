/**
 * 한 줄에 생성되는 Card 수 반환
 * @returns {number} 카드 수
 */
export const getCardsPerRow = (): number => {
  const winWidth: number = window.innerWidth;

  if (winWidth >= 1750) return 5;
  else if (winWidth >= 1190) return 4;
  else if (winWidth >= 900) return 3;
  else if (winWidth >= 700) return 2;
  else return 1;
};
