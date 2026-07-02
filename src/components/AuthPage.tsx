"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Google, Login, PersonAdd } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { getUserFriendlyError } from "@/lib/errorMessages";
import { authSchema } from "@/lib/validation";
import { useAuth } from "@/providers/AuthProvider";

type AuthValues = z.infer<typeof authSchema>;

type AuthPageProps = {
  mode: "login" | "register";
};

export function AuthPage({ mode }: AuthPageProps) {
  const { signIn, signInWithGoogle, signUp } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isRegister = mode === "register";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      if (isRegister) {
        await signUp(values.email, values.password);
      } else {
        await signIn(values.email, values.password);
      }

      router.replace("/");
    } catch (error) {
      setSubmitError(getUserFriendlyError(error, "Не удалось выполнить действие. Попробуйте еще раз."));
    }
  });

  const handleGoogle = async () => {
    setSubmitError(null);

    try {
      await signInWithGoogle();
      router.replace("/");
    } catch (error) {
      setSubmitError(getUserFriendlyError(error, "Google вход не выполнен. Попробуйте еще раз."));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
        background:
          "linear-gradient(135deg, rgba(86, 208, 106, 0.16), rgba(89, 168, 228, 0.18) 52%, #f6f8fb)",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 460 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography component="p" color="secondary.dark" sx={{ mb: 1, fontWeight: 800 }}>
                Event Planner
              </Typography>
              <Typography component="h1" variant="h1">
                {isRegister ? "Создайте аккаунт" : "Войдите в аккаунт"}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {isRegister
                  ? "Сохраняйте личные события и управляйте расписанием."
                  : "Продолжите планирование своих событий."}
              </Typography>
            </Box>

            {submitError ? <Alert severity="error">{submitError}</Alert> : null}

            <Stack component="form" spacing={2} onSubmit={onSubmit}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    autoComplete="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Пароль"
                    type="password"
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    fullWidth
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={isRegister ? <PersonAdd /> : <Login />}
              >
                {isRegister ? "Зарегистрироваться" : "Войти"}
              </Button>
            </Stack>

            <Divider>или</Divider>

            <Button variant="outlined" size="large" onClick={handleGoogle} startIcon={<Google />}>
              Войти через Google
            </Button>

            <Typography color="text.secondary" sx={{ textAlign: "center" }}>
              {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
              <Link href={isRegister ? "/login" : "/register"}>
                {isRegister ? "Войти" : "Зарегистрироваться"}
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
