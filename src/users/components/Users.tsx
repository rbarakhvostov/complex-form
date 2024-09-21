import { TextField, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { RHFAutocomplete } from "../../components/RHFAutocomplete";
import { useEffect } from "react";
import { useGenders, useLanguages, useStates } from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFTRadioGroup } from "../../components/RHFRadioGroup";

export function Users() {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>();

  useEffect(() => {
    const { unsubscribe } = watch((value) => console.log(value));

    return () => unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={statesQuery.data}
      />
      <RHFToggleButtonGroup<Schema>
        name="languages"
        options={languagesQuery.data}
      />
      <RHFTRadioGroup<Schema>
        name="gender"
        options={gendersQuery.data}
        label="Gender"
      />
    </Stack>
  );
}
