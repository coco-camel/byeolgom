export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const year = date.getFullYear();

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export function formatTime(dateString: Date) {
  const date = new Date(dateString);

  let hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, '0');
  const ampm: string = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours || 12;
  const formattedHours: string = hours.toString().padStart(2, '0');

  return `${ampm} ${formattedHours}:${minutes}`;
}
