'use client';
import { safeFilter } from '@/utils/safeFilter';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  startDate: string;
  location: string;
  isVirtual: boolean;
}

interface CustomMonthViewProps {
  events: Event[];
  currentDate?: Date;
}

export default function CustomMonthView({
  events,
  currentDate = new Date(),
}: CustomMonthViewProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const getDayEvents = (date: Date) =>
    safeFilter(events, (event) => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString();
    });

  const calendarDays = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    calendarDays.push({ date, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({ date, isCurrentMonth: true });
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {}
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

      {}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getDayEvents(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`min-h-[120px] border-b border-r border-gray-200 p-2 ${
                !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
              } ${isToday ? 'bg-blue-50' : ''}`}
            >
              <div
                className={`text-sm font-semibold mb-2 ${
                  !isCurrentMonth
                    ? 'text-dsa-black'
                    : isToday
                      ? 'text-blue-600'
                      : 'text-dsa-black'
                }`}
              >
                {date.getDate()}
                {isToday && (
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
                      <div className="truncate">{event.title}</div>
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
