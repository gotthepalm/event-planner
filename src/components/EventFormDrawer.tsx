"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close, Save } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { getUserFriendlyError } from "@/lib/errorMessages";
import { eventSchema } from "@/lib/validation";
import {
  importanceLabels,
  importanceLevels,
  type EventFormValues,
  type PlannerEvent,
} from "@/types/event";

type EventFormDrawerProps = {
  open: boolean;
  event: PlannerEvent | null;
  onClose: () => void;
  onSubmit: (values: EventFormValues) => Promise<void>;
};

type EventSchemaValues = z.infer<typeof eventSchema>;

const emptyValues: EventFormValues = {
  title: "",
  dateTime: new Date(),
  description: "",
  importance: "normal",
};

export function EventFormDrawer({ event, onClose, onSubmit, open }: EventFormDrawerProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const defaultValues = useMemo<EventFormValues>(
    () =>
      event
        ? {
            title: event.title,
            dateTime: event.dateTime,
            description: event.description,
            importance: event.importance,
          }
        : emptyValues,
    [event],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventSchemaValues>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [defaultValues, open, reset]);

  const submit = handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      await onSubmit(values);
      onClose();
    } catch (error) {
      setSubmitError(getUserFriendlyError(error, "Не удалось сохранить событие. Попробуйте еще раз."));
    }
  });

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 480 },
            borderTopLeftRadius: { xs: 0, sm: 20 },
            borderBottomLeftRadius: { xs: 0, sm: 20 },
            bgcolor: "#FFFFFF",
          },
        },
      }}
    >
      <Box component="form" onSubmit={submit} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Stack
          direction="row"
          sx={{ px: { xs: 2.5, sm: 4 }, py: 3, alignItems: "center", justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 700 }}>
              {event ? "Редактировать событие" : "Новое событие"}
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
              Заполните основные детали события.
            </Typography>
          </Box>
          <IconButton aria-label="Закрыть" onClick={onClose} disabled={isSubmitting} sx={{ width: 40, height: 40 }}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />

        <Stack spacing={2} sx={{ p: { xs: 2.5, sm: 4 }, flex: 1, overflowY: "auto" }}>
          {submitError ? <Alert severity="error">{submitError}</Alert> : null}

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Название"
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="dateTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="Дата и время"
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(errors.dateTime),
                    helperText: errors.dateTime?.message,
                  },
                }}
              />
            )}
          />

          <Controller
            name="importance"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={Boolean(errors.importance)}
                sx={{
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
                <InputLabel id="importance-label">Важность</InputLabel>
                <Select {...field} labelId="importance-label" label="Важность">
                  {importanceLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {importanceLabels[level]}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.importance?.message}</FormHelperText>
              </FormControl>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Описание"
                multiline
                minRows={5}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />
        </Stack>

        <Divider />
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ p: { xs: 2, sm: 2.5 }, bgcolor: "#FAFBFC", justifyContent: "flex-end" }}
        >
          <Button onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting} startIcon={<Save />}>
            Сохранить
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
