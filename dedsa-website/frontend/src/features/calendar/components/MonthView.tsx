'use client';
import { safeFilter } from '@/utils/safeFilter';


import type { CalendarEvent } from '@/core/types/pages/calendar';
import { motion } from 'framer-motion';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

export default function MonthView({ currentDate, events }: MonthViewProps) {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const prevMonth = new Date(year, month - 1, 0);
  const daysFromPrevMonth = startingDayOfWeek;

  const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
  const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth;

  const getDayEvents = (date: Date) =>
    safeFilter(events, 
      (event) =>
        new Date(event.startDate).toDateString() === date.toDateString()
    );

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = daysFromPrevMonth; i > 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, prevMonth.getDate() - i + 1),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  for (let day = 1; day <= daysFromNextMonth; day++) {
    calendarDays.push({
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
    });
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-semibold text-dsa-black bg-gray-50"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getDayEvents(date);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`min-h-[120px] border-b border-r border-gray-200 p-2 ${
                !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
              } ${isToday(date) ? 'bg-blue-50' : ''}`}
            >
              <div
                className={`text-sm font-semibold mb-2 ${
                  !isCurrentMonth
                    ? 'text-dsa-black'
                    : isToday(date)
                      ? 'text-blue-600'
                      : 'text-dsa-black'
                }`}
              >
                {date.getDate()}
                {isToday(date) && (
                  <span className="ml-1 w-2 h-2 bg-blue-600 rounded-full inline-block" />
                )}
              </div>

              {dayEvents.length > 0 && (
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded bg-dsa-red text-white truncate cursor-pointer hover:bg-red-700 transition-colors"
                      title={event.title}
                    >
                      {event.startTime && (
                        <span className="opacity-75">
                          {new Date(
                            `2000-01-01T${event.startTime}`
                          ).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      )}
                      <span className="block">{event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-dsa-black font-medium">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
