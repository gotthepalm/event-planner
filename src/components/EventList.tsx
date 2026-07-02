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
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, border: "1px solid rgba(23,32,42,0.08)" }}>
      <Stack direction="row" sx={{ mb: 2, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h2">Список событий</Typography>
          <Typography color="text.secondary" variant="body2">
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
            border: "1px dashed rgba(23,32,42,0.18)",
            borderRadius: 2,
            color: "text.secondary",
            justifyContent: "center",
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
              sx={{ px: 0, gap: 1.5 }}
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
                    <Typography sx={{ fontWeight: 800 }}>{event.title}</Typography>
                    <Chip
                      size="small"
                      color={importanceColors[event.importance]}
                      label={importanceLabels[event.importance]}
                      variant={event.importance === "normal" ? "outlined" : "filled"}
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
