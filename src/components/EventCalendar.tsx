"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { useMemo, useState } from "react";

import {
  importanceColors,
  importanceLabels,
  type PlannerEvent,
} from "@/types/event";

type EventCalendarProps = {
  events: PlannerEvent[];
  onSelectEvent: (event: PlannerEvent) => void;
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export function EventCalendar({ events, onSelectEvent }: EventCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("sm"));

  const days = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const monthEnd = endOfMonth(visibleMonth);

    return eachDayOfInterval({
      start: startOfWeek(monthStart, { weekStartsOn: 1 }),
      end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
    });
  }, [visibleMonth]);

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, border: "1px solid rgba(23,32,42,0.08)" }}>
      <Stack direction="row" sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h2">Календарь</Typography>
          <Typography color="text.secondary" variant="body2">
            {format(visibleMonth, "LLLL yyyy", { locale: ru })}
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Предыдущий месяц">
            <IconButton onClick={() => setVisibleMonth((month) => subMonths(month, 1))}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>
          <Tooltip title="Следующий месяц">
            <IconButton onClick={() => setVisibleMonth((month) => addMonths(month, 1))}>
              <ChevronRight />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 0.75,
        }}
      >
        {weekDays.map((day) => (
          <Typography
            key={day}
            variant="caption"
            color="text.secondary"
            sx={{ py: 0.75, fontWeight: 800, textAlign: "center" }}
          >
            {day}
          </Typography>
        ))}

        {days.map((day) => {
          const dayEvents = events.filter((event) => isSameDay(event.dateTime, day));
          const muted = !isSameMonth(day, visibleMonth);

          return (
            <Box
              key={day.toISOString()}
              sx={{
                minHeight: { xs: 82, sm: 118 },
                p: 1,
                borderRadius: 1,
                border: "1px solid rgba(23,32,42,0.08)",
                bgcolor: muted ? "rgba(23,32,42,0.025)" : "#fff",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="caption"
                color={muted ? "text.disabled" : "text.secondary"}
                sx={{ fontWeight: 800 }}
              >
                {format(day, "d")}
              </Typography>
              <Stack spacing={0.6} sx={{ mt: 0.75 }}>
                {dayEvents.slice(0, compact ? 2 : 3).map((event) => (
                  <Chip
                    key={event.id}
                    label={`${format(event.dateTime, "HH:mm")} ${event.title}`}
                    size="small"
                    color={importanceColors[event.importance]}
                    variant={event.importance === "normal" ? "outlined" : "filled"}
                    onClick={() => onSelectEvent(event)}
                    sx={{
                      maxWidth: "100%",
                      justifyContent: "flex-start",
                      "& .MuiChip-label": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                ))}
                {dayEvents.length > (compact ? 2 : 3) ? (
                  <Tooltip title={dayEvents.map((event) => `${event.title} - ${importanceLabels[event.importance]}`).join(", ")}>
                    <Typography variant="caption" color="text.secondary">
                      еще {dayEvents.length - (compact ? 2 : 3)}
                    </Typography>
                  </Tooltip>
                ) : null}
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
