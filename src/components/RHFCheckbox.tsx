import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/option";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

export function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.includes(option.id)}
                    onChange={() => {
                      if (value.includes(option.id)) {
                        onChange(
                          (value as string[]).filter(
                            (item) => item !== option.id
                          )
                        );
                      } else {
                        onChange([...value, option.id]);
                      }
                    }}
                  />
                }
                key={option.id}
                label={option.label}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}
