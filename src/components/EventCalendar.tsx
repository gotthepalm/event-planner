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
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { useMemo, useState } from "react";

import {
  importanceColors,
  importanceLabels,
  type EventImportance,
  type PlannerEvent,
} from "@/types/event";

type EventCalendarProps = {
  events: PlannerEvent[];
  onSelectEvent: (event: PlannerEvent) => void;
};

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const eventStyles: Record<EventImportance, { backgroundColor: string; color: string; shadow: string }> = {
  normal: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    shadow: "rgba(37,99,235,.14)",
  },
  important: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
    shadow: "rgba(217,119,6,.16)",
  },
  critical: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
    shadow: "rgba(220,38,38,.16)",
  },
};

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
    <Paper
      className="w-full"
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: "20px",
        border: "1px solid #E8EDF3",
        boxShadow: "0 8px 32px rgba(15,23,42,.06)",
        bgcolor: "#FFFFFF",
      }}
    >
      <Stack direction="row" sx={{ mb: 3, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700 }}>
            Календарь
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.25 }}>
            {format(visibleMonth, "LLLL yyyy", { locale: ru })}
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Предыдущий месяц">
            <IconButton
              onClick={() => setVisibleMonth((month) => subMonths(month, 1))}
              sx={{ width: 36, height: 36 }}
            >
              <ChevronLeft />
            </IconButton>
          </Tooltip>
          <Tooltip title="Следующий месяц">
            <IconButton
              onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
              sx={{ width: 36, height: 36 }}
            >
              <ChevronRight />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: { xs: 0.75, sm: 1 },
        }}
      >
        {weekDays.map((day) => (
          <Typography
            key={day}
            variant="caption"
            color="text.secondary"
            sx={{ py: 0.75, fontWeight: 700, textAlign: "center", color: "#64748B" }}
          >
            {day}
          </Typography>
        ))}

        {days.map((day) => {
          const dayEvents = events.filter((event) => isSameDay(event.dateTime, day));
          const muted = !isSameMonth(day, visibleMonth);
          const today = isToday(day);

          return (
            <Box
              key={day.toISOString()}
              sx={{
                minHeight: { xs: 92, sm: 132 },
                p: { xs: 1, sm: 1.25 },
                borderRadius: "14px",
                border: "1px solid #EEF2F6",
                bgcolor: today ? "#EFF6FF" : muted ? "#FAFBFC" : "#FFFFFF",
                overflow: "hidden",
                transition: "background-color 180ms ease-out, border-color 180ms ease-out",
                "&:hover": {
                  bgcolor: today ? "#EFF6FF" : "#FAFBFC",
                  borderColor: "#E2E8F0",
                },
              }}
            >
              <Typography
                variant="caption"
                color={today ? "secondary.main" : muted ? "text.disabled" : "text.secondary"}
                sx={{ fontWeight: today ? 800 : 700 }}
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
                    onClick={() => onSelectEvent(event)}
                    sx={{
                      minHeight: 28,
                      maxWidth: "100%",
                      borderRadius: "12px",
                      bgcolor: eventStyles[event.importance].backgroundColor,
                      color: eventStyles[event.importance].color,
                      boxShadow: "inset 0 1px rgba(255,255,255,.4)",
                      fontSize: 13,
                      fontWeight: 500,
                      justifyContent: "flex-start",
                      transition: "transform 180ms ease-out, box-shadow 180ms ease-out",
                      "&:hover": {
                        bgcolor: eventStyles[event.importance].backgroundColor,
                        boxShadow: `inset 0 1px rgba(255,255,255,.4), 0 4px 12px ${eventStyles[event.importance].shadow}`,
                        transform: "translateY(-1px)",
                      },
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
