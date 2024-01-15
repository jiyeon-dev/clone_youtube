/**
 * ISO_8601 시간 타입 변경
 * @param {ISO8601} duration
 * @returns HH:MM:SS
 */
type ISO8601 = string; // PT#H#M#S
export const formatDuration = (duration: ISO8601): string => {
  if (!duration) return '';
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    return '잘못된 형식입니다.';
  }

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseInt(matches[3]) || 0;

  // 시간, 분, 초를 두 자리 숫자로 포맷팅
  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  // if (!duration) return '';
  // return duration.replace(/[PTS]/g, '').replace(/[HM]/g, ':');
};

/**
 * 조회수 단위 변경
 * @param {number} count 숫자
 * @returns 천, 만, 억
 */
export const formatViewCount = (count: number): string => {
  return `${
    Intl.NumberFormat('ko-KR', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(count) || 0
  }`;
};

/**
 * 숫자에 3자리마다 콤마 생성
 * @param {number} num 숫자
 * @returns 문자
 */
export const formatComma = (num: number): string => {
  try {
    return Number(num).toLocaleString('en-US');
  } catch (e) {
    return '잘못된 형식입니다.';
  }
};

/**
 * 방금전, X일, X달, X년 전 등으로 형식 변경
 *
 * @param {Date} dt 예) "2006-06-12T12:03:23Z"
 * @returns X일, X달, X년 전
 */
export const formatDate = (dt: Date): string => {
  const currentDate: Date = new Date();
  const inputDateTime: Date = new Date(dt);
  const timeDiff = currentDate.valueOf() - inputDateTime.valueOf();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
};

/**
 * Date 형식을 yyyy. mm. dd. 로 변경
 * @param {Date} date 예) "2006-06-12T12:03:23Z"
 * @returns yyyy. mm. dd.
 */
export const formatDate2 = (dt: Date): string => {
  const datetime: Date = new Date(dt);

  const y = datetime.getFullYear();
  const m = datetime.getMonth() + 1;
  const d = datetime.getDate();

  return `${y}. ${m}. ${d}.`;
};

/**
 * X 일전 날짜를 RFC 3339 형식(1970-01-01T00:00:00Z)으로 반환
 * 최근 업로드된 동영상 조회 시 사용
 *
 * @param num 일
 * @returns 1970-01-01T00:00:00Z
 */
export const getISODate = (num: number): string => {
  if (!num) return '잘못된 형식입니다.';
  const today = new Date();
  const newDate = new Date(today.setDate(today.getDate() + num));
  return new Date(newDate).toISOString();
};
