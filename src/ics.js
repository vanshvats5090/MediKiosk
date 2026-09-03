export function medicationsToICS(medications, start = new Date()) {
  const stamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const day = (date) => date.toISOString().slice(0, 10).replace(/-/g, '');
  const doseTimes = { morning: '080000', afternoon: '130000', evening: '190000', night: '210000' };
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MediKiosk//Medication Alarms//EN', 'CALSCALE:GREGORIAN'];
  medications.forEach((med, index) => {
    const times = med.times?.length ? med.times : ['morning'];
    times.forEach((time, occurrence) => lines.push('BEGIN:VEVENT', `UID:medikiosk-${index}-${occurrence}-${Date.now()}@medikiosk.local`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${day(start)}T${doseTimes[time] || '080000'}`, 'RRULE:FREQ=DAILY', `SUMMARY:Take ${med.name}`, `DESCRIPTION:${med.dose || ''} ${med.instructions || ''}`.trim(), 'BEGIN:VALARM', 'TRIGGER:-PT5M', 'ACTION:DISPLAY', `DESCRIPTION:Time to take ${med.name}`, 'END:VALARM', 'END:VEVENT'));
  });
  return `${lines.concat('END:VCALENDAR').join('\r\n')}\r\n`;
}

export function downloadMedicationAlarms(medications) {
  const blob = new Blob([medicationsToICS(medications)], { type: 'text/calendar;charset=utf-8' });
  const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'medikiosk-medication-alarms.ics' });
  link.click(); URL.revokeObjectURL(link.href);
}
