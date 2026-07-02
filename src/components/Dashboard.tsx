"use client";

import { Add, Logout, Search } from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { AuthGuard } from "@/components/AuthGuard";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EventCalendar } from "@/components/EventCalendar";
import { EventFormDrawer } from "@/components/EventFormDrawer";
import { EventList } from "@/components/EventList";
import { getUserFriendlyError } from "@/lib/errorMessages";
import { createEvent, deleteEvent, subscribeToUserEvents, updateEvent } from "@/lib/events";
import { useAuth } from "@/providers/AuthProvider";
import {
  importanceLabels,
  importanceLevels,
  type EventFormValues,
  type EventImportance,
  type PlannerEvent,
} from "@/types/event";

type ImportanceFilter = EventImportance | "all";

function DashboardContent() {
  const { logout, user } = useAuth();
  const [events, setEvents] = useState<PlannerEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [importance, setImportance] = useState<ImportanceFilter>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<PlannerEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<PlannerEvent | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    return subscribeToUserEvents(
      user.uid,
      (nextEvents) => {
        setEvents(nextEvents);
        setLoadingEvents(false);
      },
      (error) => {
        setEventsError(getUserFriendlyError(error, "Не удалось загрузить события. Попробуйте еще раз."));
        setLoadingEvents(false);
      },
    );
  }, [user]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events.filter((event) => {
      const matchesImportance = importance === "all" || event.importance === importance;
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.description.toLowerCase().includes(normalizedSearch);

      return matchesImportance && matchesSearch;
    });
  }, [events, importance, search]);

  const openCreate = () => {
    setEditingEvent(null);
    setDrawerOpen(true);
  };

  const openEdit = (event: PlannerEvent) => {
    setEditingEvent(event);
    setDrawerOpen(true);
  };

  const handleSubmitEvent = async (values: EventFormValues) => {
    if (!user) {
      throw new Error("Пользователь не авторизован.");
    }

    if (editingEvent) {
      await updateEvent(editingEvent.id, values);
      return;
    }

    await createEvent(user.uid, values);
  };

  const handleDelete = async () => {
    if (!deletingEvent) {
      return;
    }

    setDeleting(true);

    try {
      await deleteEvent(deletingEvent.id);
      setDeletingEvent(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box className="min-h-dvh" sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,.86)",
          borderBottom: "1px solid #EEF2F6",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h3"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: { xs: 20, md: 24 },
                fontWeight: 800,
              }}
            >
              Event Planner
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="p"
              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
              {user?.email ?? "Личные события"}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<Add />} onClick={openCreate} sx={{ height: 44, px: 2.5 }}>
            Событие
          </Button>
          <Button color="inherit" startIcon={<Logout />} onClick={logout} sx={{ height: 44 }}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 5 } }}>
        <Stack spacing={{ xs: 2.5, md: 4 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { xs: "stretch", md: "center" } }}
          >
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Поиск по названию или описанию"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#94A3B8" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl
              sx={{
                minWidth: { xs: "100%", md: 240 },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2563EB",
                },
                "& .MuiInputBase-root.Mui-focused": {
                  boxShadow: "0 0 0 4px rgba(37,99,235,.15)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#2563EB",
                },
              }}
            >
              <InputLabel id="importance-filter-label">Важность</InputLabel>
              <Select
                labelId="importance-filter-label"
                label="Важность"
                value={importance}
                onChange={(event) => setImportance(event.target.value as ImportanceFilter)}
              >
                <MenuItem value="all">Все уровни</MenuItem>
                {importanceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {importanceLabels[level]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
            <Chip label={`Всего: ${events.length}`} />
            <Chip color="secondary" label={`Показано: ${filteredEvents.length}`} />
            <Chip color="primary" label="Данные только текущего пользователя" />
          </Stack>

          {eventsError ? <Alert severity="error">{eventsError}</Alert> : null}

          {loadingEvents ? (
            <Box sx={{ minHeight: 420, display: "grid", placeItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={{ xs: 2.5, md: 5 }}>
              <EventCalendar events={filteredEvents} onSelectEvent={openEdit} />
              <EventList events={filteredEvents} onEdit={openEdit} onDelete={setDeletingEvent} />
            </Stack>
          )}
        </Stack>
      </Container>

      <EventFormDrawer
        key={editingEvent?.id ?? "new"}
        open={drawerOpen}
        event={editingEvent}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmitEvent}
      />
      <ConfirmDialog
        open={Boolean(deletingEvent)}
        title="Удалить событие?"
        description={
          deletingEvent
            ? `Событие "${deletingEvent.title}" будет удалено без возможности восстановления.`
            : ""
        }
        confirmText="Удалить"
        loading={deleting}
        onClose={() => setDeletingEvent(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}

export function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
