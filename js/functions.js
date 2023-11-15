/* Напишите функцию, которая принимает время начала и конца рабочего дня,
а также время старта и продолжительность встречи в минутах и возвращает true,
если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты.
Для указания часов и минут могут использоваться как две цифры, так и одна.
Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день,
и встреча укладываются в одни календарные сутки. */

const isOvertime = (startWorkDay, endWorkDay, startMeeting, meetingLength) => {
  const [startDayHour, startDayMins] = startWorkDay.split(':');
  const [endDayHour, endDayMins] = endWorkDay.split(':');
  const [startMeetingHour, startMeetingMins] = startMeeting.split(':');

  const startMeetingTotal = startMeetingHour * 60 + +startMeetingMins;
  const startWorkDayTotal = startDayHour * 60 + +startDayMins;
  const endWorkDayTotal = endDayHour * 60 + +endDayMins;

  console.log(
    startMeetingTotal - startWorkDayTotal < endWorkDayTotal &&
      endWorkDayTotal - startMeetingTotal >= meetingLength &&
      startMeetingTotal >= startWorkDayTotal &&
      meetingLength <= endWorkDayTotal - startWorkDayTotal
  );
};

isOvertime('08:00', '17:30', '14:00', 90); // true
isOvertime('8:0', '10:0', '8:0', 120); // true
isOvertime('08:00', '14:30', '14:00', 90); // false
isOvertime('14:00', '17:30', '08:0', 90); // false
isOvertime('8:00', '17:30', '08:00', 900); // false
