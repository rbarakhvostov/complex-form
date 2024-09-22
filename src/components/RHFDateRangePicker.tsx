import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Typography } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFDateRangePicker<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Typography>{label}</Typography>
          <DateRangePicker
            {...restField}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
}
