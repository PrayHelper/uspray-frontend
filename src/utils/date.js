export const getFormattedDate = (date) => {
  date = new Date(date);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

/** 오늘로부터 diff일 뒤의 date 값 */
export const getCalculatedDate = (diff) => {
  const today = new Date();

  return new Date(today.getTime() + diff * 24 * 60 * 60 * 1000);
};

/** 오늘로부터 date까지 며칠 차이나는지 */
export const getCalculatedDiff = (date) => {
  date = new Date(date);
  const today = new Date();

  return Math.ceil((date - today) / (24 * 60 * 60 * 1000));
};

export const getDDayLabel = (date) => {
  const diff = getCalculatedDiff(date);
  return `D+${Math.abs(diff)}`;
};
