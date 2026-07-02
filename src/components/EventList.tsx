"use client";

import { Delete, Edit, EventAvailable } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import {
  importanceColors,
  importanceLabels,
  type PlannerEvent,
} from "@/types/event";

type EventListProps = {
  events: PlannerEvent[];
  onEdit: (event: PlannerEvent) => void;
  onDelete: (event: PlannerEvent) => void;
};

export function EventList({ events, onDelete, onEdit }: EventListProps) {
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
            Список событий
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.25 }}>
            {events.length ? `Найдено: ${events.length}` : "Событий пока нет"}
          </Typography>
        </Box>
      </Stack>

      {events.length === 0 ? (
        <Stack
          spacing={1}
          sx={{
            minHeight: 220,
            alignItems: "center",
            border: "1px dashed #CBD5E1",
            borderRadius: "16px",
            bgcolor: "#FAFBFC",
            color: "text.secondary",
            justifyContent: "center",
            px: 2,
            textAlign: "center",
          }}
        >
          <EventAvailable color="secondary" />
          <Typography>Создайте первое событие или измените фильтры.</Typography>
        </Stack>
      ) : (
        <List disablePadding>
          {events.map((event) => (
            <ListItem
              key={event.id}
              divider
              alignItems="flex-start"
              sx={{
                px: 0,
                py: 2,
                gap: 1.5,
                borderColor: "#EEF2F6",
                transition: "background-color 180ms ease-out",
                "&:hover": {
                  bgcolor: "#FAFBFC",
                },
              }}
              secondaryAction={
                <Stack direction="row" spacing={0.5}>
                  <Tooltip title="Редактировать">
                    <IconButton edge="end" aria-label="Редактировать" onClick={() => onEdit(event)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Удалить">
                    <IconButton edge="end" aria-label="Удалить" color="error" onClick={() => onDelete(event)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            >
              <ListItemText
                disableTypography
                primary={
                  <Stack direction="row" spacing={1} sx={{ pr: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>{event.title}</Typography>
                    <Chip
                      size="small"
                      color={importanceColors[event.importance]}
                      label={importanceLabels[event.importance]}
                    />
                  </Stack>
                }
                secondary={
                  <Stack spacing={0.7} sx={{ mt: 0.8, pr: 8 }}>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {format(event.dateTime, "d MMMM yyyy, HH:mm", { locale: ru })}
                    </Typography>
                    {event.description ? (
                      <Typography component="span" variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    ) : null}
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
