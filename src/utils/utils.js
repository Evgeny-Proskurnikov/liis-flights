import { MONTHS } from "./constants";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthName = MONTHS.find((item, index) => index === month);
  const formatedDate = `${day} ${monthName}, ${year}`;
  return formatedDate;
}

function formatTitle(cards) {
  let amount = cards.length;
  if (amount > 20) {
    const ten = Math.floor(amount/10)*10;
    amount = amount - ten;
  }

  let str = '';
  switch (amount) {
    case 0: 
      str = `нет сохранённых статей`;
      break;
    case 1: 
      str = `${cards.length} сохранённая статья`;
      break;
    case 2:
    case 3: 
    case 4: 
      str = `${cards.length} сохранённые статьи`;
      break;
    case amount: 
      str = `${cards.length} сохранённых статей`;
      break;
    default:
      break;
  }
  return str;
}

function formatKeywords(cards) {
  const keywordsArr = cards.map(el => el.keyword);

  const amounts = {};
  keywordsArr.forEach(el => {
    amounts[el] = (amounts[el] || 0) + 1;
  });

  const sortableKeys = Object.entries(amounts);
  const sorted = sortableKeys.sort((a, b) => b[1] - a[1]);
  const keys = sorted.map(el => el.shift());

  return keys;
}

export { formatDate, formatTitle, formatKeywords };
